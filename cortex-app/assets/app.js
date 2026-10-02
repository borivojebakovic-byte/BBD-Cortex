(function () {
  'use strict';

  var sidebarTree = document.getElementById('sidebar-tree');
  var contentInner = document.getElementById('content-inner');
  var searchInput = document.getElementById('search-input');
  var searchResultsEl = document.getElementById('search-results');

  var searchIndex = null; // loaded lazily on first search
  var docByPath = {};

  var FM_LABELS = {
    oblast: 'Oblast',
    sluzbeni_glasnik: 'Službeni glasnik',
    izmene_i_dopune: 'Izmene i dopune',
    status: 'Status',
    izvor_url: 'Izvor',
    preuzeto: 'Preuzeto',
    napomena: 'Napomena',
  };

  // Documents carry a YAML frontmatter block (--- … ---). marked() doesn't
  // know about frontmatter and would otherwise render it as a Setext
  // heading, so strip it here and show it as a small metadata box instead.
  function parseFrontmatter(raw) {
    var lines = raw.split('\n');
    if (!lines.length || lines[0].trim() !== '---') return { meta: null, body: raw };
    var endIdx = -1;
    for (var i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') { endIdx = i; break; }
    }
    if (endIdx === -1) return { meta: null, body: raw };
    var meta = {};
    lines.slice(1, endIdx).forEach(function (line) {
      var m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (!m) return;
      var val = m[2].trim();
      if (val[0] === '[' && val[val.length - 1] === ']') {
        var items = val.slice(1, -1).match(/"([^"]*)"/g) || [];
        val = items.map(function (s) { return s.slice(1, -1); }).join(', ');
      } else if (val[0] === '"' && val[val.length - 1] === '"') {
        val = val.slice(1, -1);
      }
      meta[m[1]] = val;
    });
    return { meta: meta, body: lines.slice(endIdx + 1).join('\n') };
  }

  function metaBoxHtml(meta) {
    if (!meta) return '';
    var rows = Object.keys(FM_LABELS)
      .filter(function (k) { return meta[k]; })
      .map(function (k) {
        var val = k === 'izvor_url'
          ? '<a href="' + esc(meta[k]) + '" target="_blank" rel="noopener">' + esc(meta[k]) + '</a>'
          : esc(meta[k]);
        return '<div class="doc-meta-row"><span class="doc-meta-key">' + FM_LABELS[k] + '</span>' + val + '</div>';
      });
    return rows.length ? '<div class="doc-meta-box">' + rows.join('') + '</div>' : '';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---- sidebar (recursive folder/doc tree) --------------------------------

  var tree = [];
  var expanded = {}; // slug -> bool; everything starts collapsed

  var CHEVRON_SVG =
    '<svg viewBox="0 0 8 8" class="sb-toggle-icon"><path d="M2 0.5 L6.5 4 L2 7.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function countDocs(node) {
    return node.children.reduce(function (sum, c) {
      return sum + (c.type === 'doc' ? 1 : countDocs(c));
    }, 0);
  }

  function renderNode(node) {
    if (node.type === 'doc') {
      docByPath[node.path] = node;
      return (
        '<a class="sb-link" data-path="' + esc(node.path) + '">' +
        '<span class="sb-file-dot"></span><span class="sb-link-text">' + esc(node.title) + '</span></a>'
      );
    }
    var isOpen = !!expanded[node.slug];
    var childrenHtml = node.children.length
      ? node.children.map(renderNode).join('')
      : '<div class="sb-empty">— prazno —</div>';
    return (
      '<div class="sb-group' + (isOpen ? ' open' : '') + '" data-slug="' + esc(node.slug) + '">' +
      '<button type="button" class="sb-group-toggle" data-slug="' + esc(node.slug) + '" aria-expanded="' + isOpen + '">' +
      CHEVRON_SVG +
      '<span class="sb-folder-icon"></span>' +
      '<span class="sb-group-label-text">' + esc(node.label) + '</span>' +
      '<span class="sb-group-count">' + countDocs(node) + '</span>' +
      '</button>' +
      '<div class="sb-group-items">' + childrenHtml + '</div>' +
      '</div>'
    );
  }

  function buildSidebar() {
    docByPath = {};
    sidebarTree.innerHTML = tree.map(renderNode).join('');
  }

  // event delegation: works at any nesting depth without re-binding on toggle
  sidebarTree.addEventListener('click', function (e) {
    var toggle = e.target.closest('.sb-group-toggle');
    if (toggle) {
      var slug = toggle.getAttribute('data-slug');
      expanded[slug] = !expanded[slug];
      toggle.closest('.sb-group').classList.toggle('open', expanded[slug]);
      toggle.setAttribute('aria-expanded', String(expanded[slug]));
      return;
    }
    var link = e.target.closest('.sb-link');
    if (link) location.hash = '#/' + encodeURIComponent(link.getAttribute('data-path'));
  });

  function setActiveLink(pathId) {
    sidebarTree.querySelectorAll('.sb-link').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-path') === pathId);
    });
    if (!pathId) return;
    var parts = pathId.split('/');
    parts.pop(); // drop the filename, keep ancestor folder slugs
    var cumulative = '';
    parts.forEach(function (part) {
      cumulative = cumulative ? cumulative + '/' + part : part;
      if (expanded[cumulative]) return;
      expanded[cumulative] = true;
      var groupEl = sidebarTree.querySelector('.sb-group[data-slug="' + CSS.escape(cumulative) + '"]');
      if (groupEl) {
        groupEl.classList.add('open');
        var btn = groupEl.querySelector(':scope > .sb-group-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }
    });
    var activeEl = sidebarTree.querySelector('.sb-link.active');
    if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
  }

  // ---- content ---------------------------------------------------------

  // ---- naslovna strana (Home) i stranice oblasti ---------------------------

  // Kartice baze znanja, istim redom kao u levom meniju. `slug` = top-level folder
  // iz manifest.json; `chapters: true` = stranica sa spiskom poglavlja (NN-… podfolderi).
  var SECTIONS = [
    { id: 'pravilnici', slug: 'pravilnici', title: 'Pravilnici',
      desc: 'Zakoni, pravilnici i odluke — HVAC, gas, PP zaštita, garaže, buka, izgradnja.', icon: 'para' },
    { id: 'standardi', slug: 'standardi', title: 'Standardi',
      desc: 'Kartice standarda — SRPS EN, ASHRAE, DIN, NFPA, BS, IBC, SNiP.', icon: 'std' },
    { id: 'knjige', slug: 'knjige', title: 'Knjige',
      desc: 'Stručna literatura — ASHRAE Fundamentals Handbook i druge knjige.', icon: 'book' },
    { id: 'administracija', slug: 'administracija', title: 'Administracija',
      desc: 'Korporativni dokumenti — statut, organizaciona struktura, rešenja, elaborati.', icon: 'admin' },
    { id: 'obuka', slug: 'program-obuke', chapters: true, title: 'Program obuke',
      desc: 'Poglavlja interne obuke — standardi BBD-a, proračuni i izbor opreme.', icon: 'cap' }
  ];

  var ICONS = {
    para: '<text x="16" y="23" text-anchor="middle" font-size="21" font-weight="700" fill="currentColor" stroke="none">§</text>',
    std: '<rect x="7" y="5" width="18" height="22" rx="1.5"/><path d="M11 11h10M11 15h10M11 19h6"/>',
    book: '<path d="M6 7.5c3-1.5 7-1.5 10 .5v18c-3-2-7-2-10-.5zM26 7.5c-3-1.5-7-1.5-10 .5v18c3-2 7-2 10-.5z"/>',
    admin: '<rect x="5" y="10" width="22" height="16" rx="1.5"/><path d="M12 10V7.5A1.5 1.5 0 0 1 13.5 6h5A1.5 1.5 0 0 1 20 7.5V10M5 17h22M14.5 17v2.5h3V17"/>',
    cap: '<path d="M3 13l13-6 13 6-13 6zM9 16v6c4 3 10 3 14 0v-6M29 13v7"/>',
    help: '<circle cx="16" cy="16" r="11"/><path d="M12.5 13a3.5 3.5 0 1 1 5 3.2c-1 .5-1.5 1.2-1.5 2.3"/><circle cx="16" cy="22.5" r=".6" fill="currentColor"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  // Oznaka alata u kartici: fizička veličina koju alat računa
  var TOOL_GLYPH = { 'flow-calc': 'ṁ', 'safety-valve': 'p<sub>sv</sub>', 'duct-calc': 'w', 'hx': 'h‑x', 'gas-calc': 'B' };

  var ARROW = '<svg class="hc-arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function findNode(slug, nodes) {
    nodes = nodes || tree;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.type !== 'doc' && n.slug === slug) return n;
      if (n.type !== 'doc' && slug.indexOf(n.slug + '/') === 0) {
        var r = findNode(slug, n.children);
        if (r) return r;
      }
    }
    return null;
  }

  var CHAPTERS_SLUG = 'program-obuke';
  function chapterNodes() {
    var root = findNode(CHAPTERS_SLUG);
    return root ? root.children.filter(function (n) { return n.type !== 'doc'; }) : [];
  }

  function sectionCount(sec) {
    if (sec.chapters) return { n: chapterNodes().length, unit: 'poglavlja' };
    var node = findNode(sec.slug);
    return { n: node ? countDocs(node) : 0, unit: 'dok.' };
  }

  function homeCard(href, glyphHtml, title, desc, badge, extra) {
    return (
      '<a class="hcard" href="' + href + '">' +
      '<span class="hc-line" aria-hidden="true"></span>' +
      '<span class="hc-glyph" aria-hidden="true">' + glyphHtml + '</span>' +
      '<span class="hc-body"><span class="hc-title">' + esc(title) +
      (badge ? '<span class="hc-badge">' + badge + '</span>' : '') + '</span>' +
      '<span class="hc-desc">' + esc(desc) + '</span>' + (extra || '') + '</span>' +
      ARROW + '</a>'
    );
  }

  function showHome() {
    setActiveLink(null);
    document.title = 'BBD Cortex';

    var docTotal = tree.reduce(function (s, n) { return s + (n.type === 'doc' ? 1 : countDocs(n)); }, 0);
    var menu = (window.CortexTools && window.CortexTools.menu) || [];
    var toolTotal = menu.reduce(function (s, m) { return s + m.tools.length; }, 0);

    var left = SECTIONS.map(function (sec) {
      var c = sectionCount(sec);
      return homeCard('#cat/' + sec.id, icon(sec.icon), sec.title, sec.desc, c.n ? c.n + ' ' + c.unit : 'uskoro');
    }).join('') +
      homeCard('#/help%2Fcortex-skill-uputstvo.md', icon('help'), 'Help',
        'Uputstvo za korišćenje BBD Cortex skill-a u Claude-u i kako postavljati pitanja.', '');

    var right = menu.map(function (m) {
      return '<div class="home-tgroup">' + esc(m.label) + '</div>' + m.tools.map(function (t) {
        return homeCard('#tool/' + t.id, '<span class="hc-sym">' + (TOOL_GLYPH[t.id] || esc(t.label.charAt(0))) + '</span>', t.label, t.desc, '');
      }).join('');
    }).join('');

    contentInner.innerHTML =
      '<div class="home">' +
      '<section class="home-hero">' +
      '<img class="home-logo" src="assets/logo.png" alt="BBD Cortex" />' +
      '<p class="home-lede">Baza znanja BBD Engineering — pravilnici, standardi, stručna literatura, interna obuka i inženjerski alati na jednom mestu.</p>' +
      '<div class="home-stats">' +
      '<span><b>' + docTotal + '</b> dokumenata</span>' +
      '<span><b>' + toolTotal + '</b> alata</span>' +
      '<span class="home-skill" hidden></span>' +
      '</div>' +
      '<div class="home-band" aria-hidden="true"></div>' +
      '</section>' +
      '<div class="home-grid">' +
      '<section><h2 class="home-h">Baza znanja</h2><div class="home-cards">' + left + '</div></section>' +
      '<section><h2 class="home-h">Alati</h2><div class="home-cards">' + right + '</div></section>' +
      '</div></div>';

    // Claude skill (ZIP) — postoji samo na Cloudflare build-u; lokalno se link ne prikazuje.
    fetch('/downloads/bbd-cortex-skill.json')
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (v) {
        var el = contentInner.querySelector('.home-skill');
        if (!el) return;
        el.innerHTML = '<a href="/downloads/bbd-cortex-skill.zip" download>Preuzmi Claude skill (ZIP)</a>' +
          (v && v.verzija ? ' · ' + esc(v.verzija) : '');
        el.hidden = false;
      })
      .catch(function () {});
  }

  // Stranica oblasti: #cat/<id> — spisak svih dokumenata u oblasti, po podfolderima
  function docListHtml(node) {
    var docs = node.children.filter(function (c) { return c.type === 'doc'; });
    var folders = node.children.filter(function (c) { return c.type !== 'doc' && countDocs(c) > 0; });
    var html = docs.length
      ? '<ul class="cat-list">' + docs.map(function (d) {
          return '<li><a href="#/' + encodeURIComponent(d.path) + '">' + esc(d.title) + '</a></li>';
        }).join('') + '</ul>'
      : '';
    folders.forEach(function (f) {
      html += '<div class="cat-group"><h3 class="cat-h">' + esc(f.label) +
        ' <span class="cat-n">' + countDocs(f) + '</span></h3>' + docListHtml(f) + '</div>';
    });
    return html;
  }

  function renderCategory(id) {
    var sec = SECTIONS.filter(function (s) { return s.id === id; })[0];
    if (!sec) { contentInner.innerHTML = '<p>Oblast nije pronađena.</p>'; return; }
    setActiveLink(null);
    document.title = sec.title + ' — BBD Cortex';
    var body, node = findNode(sec.slug);
    if (sec.chapters) {
      body = '<ul class="cat-list cat-chapters">' + chapterNodes().map(function (n) {
        var first = n.children.filter(function (c) { return c.type === 'doc'; })[0];
        var href = first ? '#/' + encodeURIComponent(first.path) : '#';
        return '<li><a href="' + href + '">' + esc(n.label) + '</a></li>';
      }).join('') + '</ul>';
    } else {
      body = node && countDocs(node) ? docListHtml(node) : '<p class="cat-empty">U ovoj oblasti još nema dokumenata.</p>';
    }
    // proširi istu granu u levom meniju
    if (node && !expanded[node.slug]) {
      expanded[node.slug] = true;
      var g = sidebarTree.querySelector('.sb-group[data-slug="' + CSS.escape(node.slug) + '"]');
      if (g) { g.classList.add('open'); g.querySelector(':scope > .sb-group-toggle').setAttribute('aria-expanded', 'true'); }
    }
    contentInner.innerHTML =
      '<div class="cat">' +
      '<nav class="cat-crumb"><a href="#/">Početna</a> / ' + esc(sec.title) + '</nav>' +
      '<div class="cat-head"><span class="hc-glyph" aria-hidden="true">' + icon(sec.icon) + '</span>' +
      '<div><h1>' + esc(sec.title) + '</h1><p class="cat-lede">' + esc(sec.desc) + '</p></div></div>' +
      '<div class="home-band" aria-hidden="true"></div>' +
      body + '</div>';
  }

  // Chapter markdown embeds images as raw <img src="media/xxx.png"> (from
  // pandoc), a path relative to the DOCUMENT's own folder. The browser,
  // though, resolves that relative to the page's own URL (cortex-app/
  // index.html), not the fetched doc's path — so without this fix every
  // such image 404s. Rewrite each relative src to an absolute, repo-root
  // path using the doc's own folder.
  function fixRelativeImages(docPath) {
    var baseDir = docPath.split('/').slice(0, -1).join('/');
    contentInner.querySelectorAll('img[src]').forEach(function (img) {
      var src = img.getAttribute('src');
      if (!src || /^([a-z]+:)?\/\//i.test(src) || src.indexOf('data:') === 0 || src.charAt(0) === '/') return;
      img.setAttribute('src', '/' + (baseDir ? baseDir + '/' : '') + src);
    });
  }

  // Linkovi unutar dokumenta: relativni link na drugi .md otvara taj dokument
  // u aplikaciji (#/putanja), a #sidro skroluje do naslova umesto da menja rutu.
  function resolveRel(baseDir, href) {
    var parts = (baseDir ? baseDir.split('/') : []);
    href.split('/').forEach(function (seg) {
      if (seg === '..') parts.pop();
      else if (seg && seg !== '.') parts.push(seg);
    });
    return parts.join('/');
  }
  // marked ne daje id naslovima, pa se sidro traži po GitHub slug-u teksta naslova
  function slugify(t) {
    return t.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
  }
  function findAnchor(id) {
    var byId = document.getElementById(id);
    if (byId && contentInner.contains(byId)) return byId;
    var hs = contentInner.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (var i = 0; i < hs.length; i++) if (slugify(hs[i].textContent) === id.toLowerCase()) return hs[i];
    return null;
  }
  function fixRelativeLinks(docPath) {
    var baseDir = docPath.split('/').slice(0, -1).join('/');
    contentInner.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || /^([a-z]+:)?\/\//i.test(href) || /^(mailto|tel):/i.test(href) || href.charAt(0) === '/') return;
      if (href.charAt(0) === '#') {
        if (/^#(\/|cat\/|tool\/)/.test(href)) return; // ruta aplikacije
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var t = findAnchor(decodeURIComponent(href.slice(1)));
          if (t) t.scrollIntoView();
        });
        return;
      }
      var m = href.match(/^([^#?]+\.md)(#.*)?$/i);
      if (m) a.setAttribute('href', '#/' + encodeURIComponent(resolveRel(baseDir, decodeURIComponent(m[1]))));
      else a.setAttribute('href', '/' + resolveRel(baseDir, href));
    });
  }

  // Stari linkovi (pre premeštanja): NN-poglavlje/… → program-obuke/NN-poglavlje/…, docs/… → help/…
  function legacyPath(path) {
    if (/^\d+-[^/]+\//.test(path)) return CHAPTERS_SLUG + '/' + path;
    if (path.indexOf('docs/') === 0) return 'help/' + path.slice(5);
    return null;
  }

  function renderDoc(path) {
    var moved = legacyPath(path);
    if (moved) { location.replace('#/' + encodeURIComponent(moved)); return; }
    var meta = docByPath[path];
    setActiveLink(path);
    contentInner.innerHTML = '<p>Učitavanje…</p>';
    fetch('../' + path)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (raw) {
        document.title = (meta ? meta.title : path) + ' — BBD Cortex';
        var categoryLine = meta && meta.category ? '<div class="doc-meta">' + esc(meta.category) + '</div>' : '';
        var parsed = parseFrontmatter(raw);
        contentInner.innerHTML = categoryLine + metaBoxHtml(parsed.meta) + marked.parse(parsed.body);
        fixRelativeImages(path);
        fixRelativeLinks(path);
      })
      .catch(function (err) {
        contentInner.innerHTML = '<p>Dokument nije pronađen (' + esc(err.message) + ').</p>';
      });
  }

  function route() {
    var hash = location.hash.replace(/^#\/?/, '');
    contentInner.classList.toggle('wide', !hash);
    document.getElementById('content').scrollTop = 0;
    if (!hash) { showHome(); return; }
    if (hash.indexOf('cat/') === 0) { renderCategory(hash.slice(4)); return; }
    if (hash.indexOf('tool/') === 0 && window.CortexTools) {
      setActiveLink(null);
      window.CortexTools.render(hash.slice(5), contentInner);
      return;
    }
    renderDoc(decodeURIComponent(hash));
  }

  window.addEventListener('hashchange', route);

  // ---- search ------------------------------------------------------------

  var searchIndexPromise = null;
  function loadSearchIndex() {
    if (!searchIndexPromise) {
      searchIndexPromise = fetch('../cortex-app/search-index.json')
        .then(function (r) { return r.json(); })
        .then(function (data) { searchIndex = data; return data; });
    }
    return searchIndexPromise;
  }

  function snippet(text, query) {
    var idx = text.indexOf(query);
    if (idx === -1) return '';
    var start = Math.max(0, idx - 50);
    var end = Math.min(text.length, idx + query.length + 60);
    var s = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    var re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return esc(s).replace(re, function (m) { return '<mark>' + esc(m) + '</mark>'; });
  }

  function runSearch(query) {
    query = query.trim().toLowerCase();
    if (!query) {
      searchResultsEl.hidden = true;
      searchResultsEl.innerHTML = '';
      return;
    }
    loadSearchIndex().then(function (idx) {
      var matches = idx.filter(function (d) {
        return d.title.toLowerCase().indexOf(query) !== -1 || d.text.indexOf(query) !== -1;
      }).slice(0, 20);

      if (!matches.length) {
        searchResultsEl.innerHTML = '<div class="search-empty">Nema rezultata za "' + esc(query) + '".</div>';
        searchResultsEl.hidden = false;
        return;
      }

      searchResultsEl.innerHTML = matches.map(function (d) {
        var snip = snippet(d.text, query);
        return (
          '<div class="search-result" data-path="' + esc(d.path) + '">' +
          '<div class="sr-title">' + esc(d.title) + '</div>' +
          (d.category ? '<div class="sr-meta">' + esc(d.category) + '</div>' : '') +
          (snip ? '<div class="sr-snippet">' + snip + '</div>' : '') +
          '</div>'
        );
      }).join('');
      searchResultsEl.hidden = false;

      searchResultsEl.querySelectorAll('.search-result').forEach(function (el) {
        el.addEventListener('click', function () {
          searchResultsEl.hidden = true;
          searchInput.value = '';
          location.hash = '#/' + encodeURIComponent(el.getAttribute('data-path'));
        });
      });
    });
  }

  var searchDebounce = null;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchDebounce);
    var q = searchInput.value;
    searchDebounce = setTimeout(function () { runSearch(q); }, 120);
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#search-wrap')) {
      searchResultsEl.hidden = true;
    }
  });

  // ---- mobilni prikaz: sadržaj kao fioka koja se otvara dugmetom ---------

  var appEl = document.getElementById('app');
  var navToggle = document.getElementById('nav-toggle');
  var backdrop = document.getElementById('sidebar-backdrop');

  function setNav(open) {
    appEl.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Sakrij sadržaj' : 'Prikaži sadržaj');
    backdrop.hidden = !open;
  }
  navToggle.addEventListener('click', function () { setNav(!appEl.classList.contains('nav-open')); });
  backdrop.addEventListener('click', function () { setNav(false); });
  sidebarTree.addEventListener('click', function (e) { if (e.target.closest('.sb-link')) setNav(false); });
  window.addEventListener('hashchange', function () { setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });

  // ---- boot ------------------------------------------------------------

  fetch('../cortex-app/manifest.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      tree = data.tree || [];
      buildSidebar();
      route();
    })
    .catch(function (err) {
      sidebarTree.innerHTML = '<div class="search-empty">Greška pri učitavanju sadržaja.</div>';
      contentInner.innerHTML = '<p>' + esc(err.message) + '</p>';
    });
})();

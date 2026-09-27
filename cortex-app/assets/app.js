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

  function showWelcome() {
    setActiveLink(null);
    document.title = 'BBD Cortex';
    contentInner.innerHTML =
      '<h1>BBD Cortex</h1>' +
      '<p>Baza znanja BBD Engineering — pravilnici, zakoni i standardi na jednom mestu.</p>' +
      '<p>Izaberite dokument iz levog menija ili pretražite iznad.</p>';
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

  function renderDoc(path) {
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
      })
      .catch(function (err) {
        contentInner.innerHTML = '<p>Dokument nije pronađen (' + esc(err.message) + ').</p>';
      });
  }

  function route() {
    var hash = location.hash.replace(/^#\/?/, '');
    if (!hash) { showWelcome(); return; }
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

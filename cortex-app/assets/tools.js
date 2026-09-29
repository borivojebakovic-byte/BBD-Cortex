/* BBD Cortex — Alati (inženjerski kalkulatori)
 *
 * Meni u gornjoj traci se gradi iz registra MENU ispod.
 * Novi alat = novi zapis u MENU + jedna render funkcija.
 * Ruta alata je #tool/<id>  (npr. #tool/flow-calc); app.js je prosleđuje ovde.
 */
(function () {
  'use strict';

  // ---- registar ---------------------------------------------------------

  var MENU = [
    {
      id: 'hydronic',
      label: 'Hydronic Tools',
      tools: [
        { id: 'flow-calc', label: 'Flow Calc', desc: 'Protok iz snage i ΔT, ili snaga iz protoka', render: renderFlowCalc }
      ]
    }
  ];

  function findTool(id) {
    for (var i = 0; i < MENU.length; i++) {
      for (var j = 0; j < MENU[i].tools.length; j++) {
        if (MENU[i].tools[j].id === id) return { menu: MENU[i], tool: MENU[i].tools[j] };
      }
    }
    return null;
  }

  // ---- meni u gornjoj traci -----------------------------------------------

  function closeMenus() {
    document.querySelectorAll('.tm-dropdown').forEach(function (d) { d.hidden = true; });
    document.querySelectorAll('.tm-btn').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }

  function buildMenu() {
    var host = document.getElementById('toolmenu');
    if (!host) return;
    host.innerHTML = MENU.map(function (m) {
      return (
        '<div class="tm-menu">' +
        '<button type="button" class="tm-btn" id="tm-' + m.id + '" aria-haspopup="true" aria-expanded="false">' + m.label + '</button>' +
        '<div class="tm-dropdown" role="menu" hidden>' +
        m.tools.map(function (t) {
          return '<a role="menuitem" href="#tool/' + t.id + '"><b>' + t.label + '</b><span>' + t.desc + '</span></a>';
        }).join('') +
        '</div></div>'
      );
    }).join('');
    host.querySelectorAll('.tm-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var dd = btn.nextElementSibling;
        var open = dd.hidden;
        closeMenus();
        dd.hidden = !open;
        btn.setAttribute('aria-expanded', String(open));
      });
    });
    host.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenus(); });
    document.addEventListener('click', closeMenus);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenus(); });
  }

  // ---- javni API (koristi app.js) ------------------------------------------

  window.CortexTools = {
    render: function (id, el) {
      var found = findTool(id);
      if (!found) { el.innerHTML = '<p>Alat nije pronađen.</p>'; return; }
      document.title = found.tool.label + ' — BBD Cortex';
      found.tool.render(el, found.menu);
    }
  };

  buildMenu();

  // ---- zajedničko ----------------------------------------------------------

  function fmt(x, d) {
    if (d === undefined) d = 2;
    return isFinite(x) ? x.toLocaleString('sr-Latn-RS', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—';
  }

  // ---- Flow Calc -----------------------------------------------------------

  // Voda: gustina po Thiesen-u, cp interpolacija iz tabele (kJ/kgK)
  var CP_W = [[0, 4.217], [10, 4.192], [20, 4.182], [30, 4.178], [40, 4.179], [50, 4.181], [60, 4.185],
              [70, 4.190], [80, 4.197], [90, 4.205], [100, 4.216], [110, 4.229], [120, 4.245]];
  function waterRho(T) { return 1000 * (1 - (T + 288.9414) / (508929.2 * (T + 68.12963)) * Math.pow(T - 3.9863, 2)); }
  function waterCp(T) {
    T = Math.max(0, Math.min(120, T));
    for (var i = 0; i < CP_W.length - 1; i++) {
      var a = CP_W[i], b = CP_W[i + 1];
      if (T <= b[0]) return a[1] + (b[1] - a[1]) * (T - a[0]) / (b[0] - a[0]);
    }
    return CP_W[CP_W.length - 1][1];
  }
  var FLUIDS = {
    water:  { label: 'Voda', auto: true },
    pg30:   { label: 'Propilen-glikol 30 %', rho: 1030, cp: 3.85 },
    pg40:   { label: 'Propilen-glikol 40 %', rho: 1040, cp: 3.70 },
    eg30:   { label: 'Etilen-glikol 30 %', rho: 1045, cp: 3.60 },
    eg40:   { label: 'Etilen-glikol 40 %', rho: 1060, cp: 3.45 },
    custom: { label: 'Ručni unos ρ i cp' }
  };
  // Čelične cevi EN 10255 (srednje teške): DN, unutrašnji prečnik mm
  var PIPES = [['DN15', 16.1], ['DN20', 21.7], ['DN25', 27.3], ['DN32', 36.0], ['DN40', 41.9], ['DN50', 53.1],
               ['DN65', 68.9], ['DN80', 80.9], ['DN100', 105.3], ['DN125', 129.7], ['DN150', 155.1]];

  function field(id, label, value, unit, extraCls) {
    return '<div class="tl-field ' + (extraCls || '') + '" id="f-' + id + '"><label for="tl-' + id + '">' + label + '</label>' +
      '<div class="tl-inp"><input id="tl-' + id + '" type="number" inputmode="decimal" step="any" value="' + value + '"><span class="u">' + unit + '</span></div></div>';
  }

  function renderFlowCalc(el, menu) {
    var fluidOpts = Object.keys(FLUIDS).map(function (k) { return '<option value="' + k + '">' + FLUIDS[k].label + '</option>'; }).join('');
    el.innerHTML =
      '<div class="tool">' +
      '<div class="doc-meta">Alati · ' + menu.label + '</div>' +
      '<h1>Flow Calc</h1>' +
      '<p class="tl-lede">Q = ṁ · cp · ΔT. Unesite snagu i temperaturni režim za protok, ili protok za snagu. Svojstva vode se računaju na srednjoj temperaturi.</p>' +
      '<div class="tl-grid">' +
      '<section class="tl-panel" aria-label="Ulazni podaci">' +
        '<h2>Ulazni podaci</h2>' +
        '<div class="tl-seg" role="group" aria-label="Režim proračuna">' +
          '<button type="button" id="tl-m-flow" aria-pressed="true">Protok iz snage</button>' +
          '<button type="button" id="tl-m-power" aria-pressed="false">Snaga iz protoka</button>' +
        '</div>' +
        field('q', 'Toplotna snaga Q', 150, 'kW') +
        field('v', 'Zapreminski protok V̇', 6.5, 'm³/h') +
        '<div class="tl-row">' + field('ts', 'Polaz t<sub>p</sub>', 70, '°C', 'tsup') + field('tr', 'Povrat t<sub>r</sub>', 50, '°C', 'tret') + '</div>' +
        '<div class="tl-dt"><span>ΔT = <b id="tl-dt">—</b> K</span><span>t<sub>sr</sub> = <b id="tl-tm">—</b> °C</span><span id="tl-mode">grejanje</span></div>' +
        '<div class="tl-field"><label for="tl-fluid">Fluid</label><div class="tl-inp"><select id="tl-fluid">' + fluidOpts + '</select></div></div>' +
        '<div class="tl-row">' + field('rho', 'Gustina ρ', '', 'kg/m³') + field('cp', 'Spec. toplota cp', '', 'kJ/kgK') + '</div>' +
        '<p class="tl-note" id="tl-fluid-note"></p>' +
      '</section>' +
      '<section class="tl-panel" aria-label="Rezultati" aria-live="polite">' +
        '<h2>Rezultat</h2>' +
        '<div class="tl-big"><span class="lbl" id="tl-big-lbl">Zapreminski protok</span><span class="val" id="tl-big-val">—</span></div>' +
        '<dl class="tl-kv" id="tl-kv"></dl>' +
        '<div class="tl-formula" id="tl-formula"></div>' +
        '<h2>Brzina u čeličnim cevima EN 10255</h2>' +
        '<div class="tl-tbl"><table><thead><tr><th>DN</th><th>d<sub>u</sub> mm</th><th>w m/s</th><th></th></tr></thead><tbody id="tl-pipes"></tbody></table></div>' +
        '<p class="tl-note">Orijentacioni opseg brzina 0,5–1,5 m/s; zeleno je najmanja dimenzija u opsegu. Pad pritiska proverite posebno.</p>' +
      '</section>' +
      '</div></div>';

    function $(id) { return el.querySelector('#tl-' + id); }
    var mode = 'flow';
    function setMode(m) {
      mode = m;
      $('m-flow').setAttribute('aria-pressed', String(m === 'flow'));
      $('m-power').setAttribute('aria-pressed', String(m === 'power'));
      el.querySelector('#f-q').hidden = m !== 'flow';
      el.querySelector('#f-v').hidden = m !== 'power';
      calc();
    }
    $('m-flow').onclick = function () { setMode('flow'); };
    $('m-power').onclick = function () { setMode('power'); };

    function syncFluid() {
      var k = $('fluid').value, f = FLUIDS[k];
      var tm = (+$('ts').value + +$('tr').value) / 2;
      var manual = k === 'custom';
      $('rho').readOnly = !manual; $('cp').readOnly = !manual;
      if (f.auto) {
        $('rho').value = waterRho(tm).toFixed(1); $('cp').value = waterCp(tm).toFixed(3);
        $('fluid-note').textContent = 'Svojstva vode računata na srednjoj temperaturi t_sr.';
      } else if (!manual) {
        $('rho').value = f.rho; $('cp').value = f.cp;
        $('fluid-note').textContent = 'Približne vrednosti za glikolnu smešu na ~20 °C. Za tačan proračun izaberite „Ručni unos” i unesite podatke proizvođača.';
      } else {
        $('fluid-note').textContent = 'Unesite gustinu i specifičnu toplotu iz tehničkog lista fluida.';
      }
    }

    function calc() {
      syncFluid();
      var ts = +$('ts').value, tr = +$('tr').value, rho = +$('rho').value, cp = +$('cp').value;
      var dT = Math.abs(ts - tr), tm = (ts + tr) / 2;
      $('dt').textContent = fmt(dT, 1); $('tm').textContent = fmt(tm, 1);
      $('mode').textContent = ts >= tr ? 'grejanje' : 'hlađenje';
      var kv = $('kv'), big = $('big-val'), pipes = $('pipes'), fx = $('formula');
      function bad(msg) { big.textContent = '—'; kv.innerHTML = '<p class="tl-err">' + msg + '</p>'; fx.textContent = ''; pipes.innerHTML = ''; }
      if (!(dT > 0)) return bad('Polaz i povrat moraju se razlikovati (ΔT > 0).');
      if (!(rho > 0 && cp > 0)) return bad('Unesite pozitivne vrednosti za ρ i cp.');
      var Q, m, V;
      if (mode === 'flow') {
        Q = +$('q').value; if (!(Q > 0)) return bad('Unesite snagu veću od nule.');
        m = Q / (cp * dT); V = m / rho;
      } else {
        var vIn = +$('v').value; if (!(vIn > 0)) return bad('Unesite protok veći od nule.');
        V = vIn / 3600; m = V * rho; Q = m * cp * dT;
      }
      var Vh = V * 3600;
      if (mode === 'flow') { $('big-lbl').textContent = 'Zapreminski protok'; big.innerHTML = fmt(Vh, 3) + '<small>m³/h</small>'; }
      else { $('big-lbl').textContent = 'Toplotna snaga'; big.innerHTML = fmt(Q, 2) + '<small>kW</small>'; }
      var rows = [
        ['V̇', fmt(V * 1000, 3) + ' l/s'], ['V̇', fmt(V * 60000, 1) + ' l/min'],
        ['ṁ', fmt(m, 3) + ' kg/s'], ['ṁ', fmt(m * 3600, 0) + ' kg/h'],
        mode === 'flow' ? ['Q', fmt(Q, 2) + ' kW'] : ['V̇', fmt(Vh, 3) + ' m³/h'],
        ['ΔT', fmt(dT, 1) + ' K']
      ];
      kv.innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');
      fx.textContent = mode === 'flow'
        ? 'ṁ = Q / (cp·ΔT) = ' + fmt(Q, 2) + ' / (' + fmt(cp, 3) + ' · ' + fmt(dT, 1) + ') = ' + fmt(m, 4) + ' kg/s   →   V̇ = ṁ/ρ · 3600 = ' + fmt(Vh, 3) + ' m³/h'
        : 'Q = V̇·ρ·cp·ΔT = ' + fmt(V, 6) + ' · ' + fmt(rho, 1) + ' · ' + fmt(cp, 3) + ' · ' + fmt(dT, 1) + ' = ' + fmt(Q, 2) + ' kW';
      var best = null;
      pipes.innerHTML = PIPES.map(function (p) {
        var A = Math.PI * Math.pow(p[1] / 1000, 2) / 4, w = V / A;
        var cls = w < 0.5 ? 'lo' : w > 1.5 ? 'hi' : 'ok';
        if (cls === 'ok' && !best) best = p[0];
        var tag = cls === 'ok' ? '<span class="tl-pill ok">u opsegu</span>' : cls === 'hi' ? '<span class="tl-pill hi">visoka</span>' : '<span class="tl-pill lo">niska</span>';
        return '<tr data-dn="' + p[0] + '"><td>' + p[0] + '</td><td>' + fmt(p[1], 1) + '</td><td>' + fmt(w, 2) + '</td><td>' + tag + '</td></tr>';
      }).join('');
      if (best) pipes.querySelector('[data-dn="' + best + '"]').classList.add('best');
    }

    ['q', 'v', 'ts', 'tr', 'rho', 'cp', 'fluid'].forEach(function (id) { $(id).addEventListener('input', calc); });
    setMode('flow');
  }
})();

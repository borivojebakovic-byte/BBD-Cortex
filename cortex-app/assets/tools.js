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
  // Voda: dinamička viskoznost po Vogel-u (mPa·s), T u °C
  function waterMu(T) { return 2.414e-2 * Math.pow(10, 247.8 / (T + 273.15 - 140)); }
  // Glikolne smeše: približne vrednosti na ~20 °C (mu u mPa·s)
  var FLUIDS = {
    water:  { label: 'Voda', auto: true },
    pg30:   { label: 'Propilen-glikol 30 %', rho: 1030, cp: 3.85, mu: 2.9 },
    pg40:   { label: 'Propilen-glikol 40 %', rho: 1040, cp: 3.70, mu: 4.4 },
    eg30:   { label: 'Etilen-glikol 30 %', rho: 1045, cp: 3.60, mu: 2.2 },
    eg40:   { label: 'Etilen-glikol 40 %', rho: 1060, cp: 3.45, mu: 3.0 },
    custom: { label: 'Ručni unos ρ, cp i μ' }
  };

  // Asortimani cevi: [oznaka, unutrašnji prečnik mm]; k = apsolutna hrapavost mm.
  // Dimenzije su tipične kataloške vrednosti — za izvođački projekat proveriti katalog proizvođača.
  var PIPE_SETS = {
    en10255: { label: 'Čelične navojne EN 10255, srednje teške (i Viega Megapress)', k: 0.045, pipes: [
      ['DN15 (21,3×2,6)', 16.1], ['DN20 (26,9×2,6)', 21.7], ['DN25 (33,7×3,2)', 27.3], ['DN32 (42,4×3,2)', 36.0],
      ['DN40 (48,3×3,2)', 41.9], ['DN50 (60,3×3,6)', 53.1], ['DN65 (76,1×3,6)', 68.9], ['DN80 (88,9×4,0)', 80.9],
      ['DN100 (114,3×4,5)', 105.3], ['DN125 (139,7×5,0)', 129.7], ['DN150 (165,1×5,0)', 155.1]] },
    en10220: { label: 'Čelične bešavne EN 10220', k: 0.045, pipes: [
      ['DN15 (21,3×2,0)', 17.3], ['DN20 (26,9×2,3)', 22.3], ['DN25 (33,7×2,6)', 28.5], ['DN32 (42,4×2,6)', 37.2],
      ['DN40 (48,3×2,6)', 43.1], ['DN50 (60,3×2,9)', 54.5], ['DN65 (76,1×2,9)', 70.3], ['DN80 (88,9×3,2)', 82.5],
      ['DN100 (114,3×3,6)', 107.1], ['DN125 (139,7×4,0)', 131.7], ['DN150 (168,3×4,5)', 159.3],
      ['DN200 (219,1×6,3)', 206.5], ['DN250 (273,0×6,3)', 260.4], ['DN300 (323,9×7,1)', 309.7]] },
    prestabo: { label: 'Viega Prestabo, pocinkovani čelik (press)', k: 0.01, pipes: [
      ['12×1,2', 9.6], ['15×1,2', 12.6], ['18×1,2', 15.6], ['22×1,5', 19.0], ['28×1,5', 25.0], ['35×1,5', 32.0],
      ['42×1,5', 39.0], ['54×1,5', 51.0], ['64×2,0', 60.0], ['76,1×2,0', 72.1], ['88,9×2,0', 84.9], ['108×2,0', 104.0]] },
    sanpress: { label: 'Viega Sanpress, nerđajući čelik (press)', k: 0.0015, pipes: [
      ['15×1,0', 13.0], ['18×1,0', 16.0], ['22×1,2', 19.6], ['28×1,2', 25.6], ['35×1,5', 32.0], ['42×1,5', 39.0],
      ['54×1,5', 51.0], ['64×2,0', 60.0], ['76,1×2,0', 72.1], ['88,9×2,0', 84.9], ['108×2,0', 104.0]] },
    cu: { label: 'Bakarne EN 1057', k: 0.0015, pipes: [
      ['12×1,0', 10.0], ['15×1,0', 13.0], ['18×1,0', 16.0], ['22×1,0', 20.0], ['28×1,0', 26.0], ['35×1,2', 32.6],
      ['42×1,2', 39.6], ['54×1,5', 51.0], ['64×2,0', 60.0], ['76,1×2,0', 72.1], ['88,9×2,0', 84.9], ['108×2,5', 103.0]] },
    pex: { label: 'PE-X cevi, SDR 7,4', k: 0.007, pipes: [
      ['16×2,2', 11.6], ['20×2,8', 14.4], ['25×3,5', 18.0], ['32×4,4', 23.2], ['40×5,5', 29.0], ['50×6,9', 36.2], ['63×8,6', 45.8]] },
    pex11: { label: 'PE-X cevi za grejanje (SDR 11; 16×2 i 20×2)', k: 0.007, pipes: [
      ['16×2,0', 12.0], ['20×2,0', 16.0], ['25×2,3', 20.4], ['32×2,9', 26.2], ['40×3,7', 32.6], ['50×4,6', 40.8], ['63×5,8', 51.4]] },
    mlc: { label: 'Višeslojne PE-X/Al/PE-X', k: 0.007, pipes: [
      ['16×2,0', 12.0], ['20×2,0', 16.0], ['26×3,0', 20.0], ['32×3,0', 26.0], ['40×3,5', 33.0], ['50×4,0', 42.0], ['63×4,5', 54.0]] }
  };

  // Faktor trenja: laminarno 64/Re, turbulentno Colebrook-White (iterativno)
  function frictionFactor(Re, relRough) {
    if (Re < 2300) return 64 / Re;
    var f = 0.02;
    for (var i = 0; i < 30; i++) {
      var rhs = -2 * Math.log10(relRough / 3.7 + 2.51 / (Re * Math.sqrt(f)));
      f = 1 / (rhs * rhs);
    }
    return f;
  }

  function field(id, label, value, unit, extraCls) {
    return '<div class="tl-field ' + (extraCls || '') + '" id="f-' + id + '"><label for="tl-' + id + '">' + label + '</label>' +
      '<div class="tl-inp"><input id="tl-' + id + '" type="number" inputmode="decimal" step="any" value="' + value + '"><span class="u">' + unit + '</span></div></div>';
  }

  function renderFlowCalc(el, menu) {
    var fluidOpts = Object.keys(FLUIDS).map(function (k) { return '<option value="' + k + '">' + FLUIDS[k].label + '</option>'; }).join('');
    var setOpts = Object.keys(PIPE_SETS).map(function (k) { return '<option value="' + k + '">' + PIPE_SETS[k].label + '</option>'; }).join('');
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
        '<div class="tl-row">' + field('mu', 'Viskoznost μ', '', 'mPa·s') + '</div>' +
        '<p class="tl-note" id="tl-fluid-note"></p>' +
      '</section>' +
      '<section class="tl-panel" aria-label="Rezultati" aria-live="polite">' +
        '<h2>Rezultat</h2>' +
        '<div class="tl-big"><span class="lbl" id="tl-big-lbl">Zapreminski protok</span><span class="val" id="tl-big-val">—</span></div>' +
        '<dl class="tl-kv" id="tl-kv"></dl>' +
        '<div class="tl-formula" id="tl-formula"></div>' +
        '<h2>Brzina i jedinični pad pritiska po asortimanu cevi</h2>' +
        '<div class="tl-pipe-sel">' +
          '<div class="tl-field"><label for="tl-set">Asortiman cevi</label><div class="tl-inp"><select id="tl-set">' + setOpts + '</select></div></div>' +
          field('k', 'Hrapavost k', '', 'mm') +
        '</div>' +
        '<div class="tl-tbl"><table><thead><tr><th>Dimenzija</th><th><span class="sym">d</span><sub>u</sub> [mm]</th><th><span class="sym">w</span> [m/s]</th><th><span class="sym">R</span> [Pa/m]</th><th></th></tr></thead><tbody id="tl-pipes"></tbody></table></div>' +
        '<p class="tl-note">R po Darcy–Weisbach-u, faktor trenja po Colebrook-White-u (laminarno 64/Re). Orijentacioni opseg brzina 0,5–1,5 m/s; zeleno je najmanja dimenzija u opsegu. Dimenzije su tipične kataloške vrednosti; za izvođački projekat proverite katalog proizvođača.</p>' +
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
      $('rho').readOnly = !manual; $('cp').readOnly = !manual; $('mu').readOnly = !manual;
      if (f.auto) {
        $('rho').value = waterRho(tm).toFixed(1); $('cp').value = waterCp(tm).toFixed(3); $('mu').value = waterMu(tm).toFixed(3);
        $('fluid-note').textContent = 'Svojstva vode računata na srednjoj temperaturi t_sr.';
      } else if (!manual) {
        $('rho').value = f.rho; $('cp').value = f.cp; $('mu').value = f.mu;
        $('fluid-note').textContent = 'Približne vrednosti za glikolnu smešu na ~20 °C (na višim temperaturama viskoznost je manja, pa je R na strani sigurnosti). Za tačan proračun izaberite „Ručni unos” i unesite podatke proizvođača.';
      } else {
        $('fluid-note').textContent = 'Unesite gustinu, specifičnu toplotu i viskoznost iz tehničkog lista fluida.';
      }
    }

    var lastSet = null;
    function syncSet() {
      var key = $('set').value;
      if (key !== lastSet) { $('k').value = PIPE_SETS[key].k; lastSet = key; }
    }

    function calc() {
      syncFluid();
      syncSet();
      var ts = +$('ts').value, tr = +$('tr').value, rho = +$('rho').value, cp = +$('cp').value;
      var mu = +$('mu').value / 1000, kRough = +$('k').value / 1000;
      var dT = Math.abs(ts - tr), tm = (ts + tr) / 2;
      $('dt').textContent = fmt(dT, 1); $('tm').textContent = fmt(tm, 1);
      $('mode').textContent = ts >= tr ? 'grejanje' : 'hlađenje';
      var kv = $('kv'), big = $('big-val'), pipes = $('pipes'), fx = $('formula');
      function bad(msg) { big.textContent = '—'; kv.innerHTML = '<p class="tl-err">' + msg + '</p>'; fx.textContent = ''; pipes.innerHTML = ''; }
      if (!(dT > 0)) return bad('Polaz i povrat moraju se razlikovati (ΔT > 0).');
      if (!(rho > 0 && cp > 0 && mu > 0)) return bad('Unesite pozitivne vrednosti za ρ, cp i μ.');
      if (!(kRough >= 0)) return bad('Hrapavost k ne može biti negativna.');
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
      var set = PIPE_SETS[$('set').value];
      pipes.innerHTML = set.pipes.map(function (p, i) {
        var d = p[1] / 1000, A = Math.PI * d * d / 4, w = V / A;
        var Re = rho * w * d / mu;
        var R = frictionFactor(Re, kRough / d) / d * rho * w * w / 2;
        var cls = w < 0.5 ? 'lo' : w > 1.5 ? 'hi' : 'ok';
        if (cls === 'ok' && best === null) best = i;
        var tag = cls === 'ok' ? '<span class="tl-pill ok">u opsegu</span>' : cls === 'hi' ? '<span class="tl-pill hi">visoka</span>' : '<span class="tl-pill lo">niska</span>';
        return '<tr data-i="' + i + '"><td>' + p[0] + '</td><td>' + fmt(p[1], 1) + '</td><td>' + fmt(w, 2) + '</td><td>' + fmt(R, R < 10 ? 1 : 0) + '</td><td>' + tag + '</td></tr>';
      }).join('');
      if (best !== null) pipes.querySelector('[data-i="' + best + '"]').classList.add('best');
    }

    ['q', 'v', 'ts', 'tr', 'rho', 'cp', 'mu', 'fluid', 'set', 'k'].forEach(function (id) { $(id).addEventListener('input', calc); });
    setMode('flow');
  }
})();

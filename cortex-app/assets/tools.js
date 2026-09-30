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
        { id: 'flow-calc', label: 'Flow Calc', desc: 'Protok iz snage i ΔT, ili snaga iz protoka', render: renderFlowCalc },
        { id: 'safety-valve', label: 'Safety Valve', desc: 'Pritisak otvaranja i dimenzija sigurnosnog ventila (SRPS EN 12828)', render: renderSafetyValve }
      ]
    },
    {
      id: 'air',
      label: 'Air Tools',
      tools: [
        { id: 'duct-calc', label: 'Duct Calc', desc: 'Protok vazduha iz snage, brzina i pad pritiska u kanalu', render: renderDuctCalc },
        { id: 'hx', label: 'h-x dijagram', desc: 'Stanja vlažnog vazduha, procesi, senzibilna/latentna toplota', render: renderHxCalc }
      ]
    },
    {
      id: 'gas',
      label: 'Gas Tools',
      tools: [
        { id: 'gas-calc', label: 'Gas Calc', desc: 'Potrošnja gasa iz snage i η, dimenzionisanje gasovoda', render: renderGasCalc }
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
    }).join('') +
    // na telefonu: svi alati u jednom meniju „Alati”, grupisani po oblastima
    '<div class="tm-menu tm-all">' +
    '<button type="button" class="tm-btn" id="tm-all" aria-haspopup="true" aria-expanded="false">Alati</button>' +
    '<div class="tm-dropdown" role="menu" hidden>' +
    MENU.map(function (m) {
      return '<div class="tm-grp">' + m.label + '</div>' + m.tools.map(function (t) {
        return '<a role="menuitem" href="#tool/' + t.id + '"><b>' + t.label + '</b><span>' + t.desc + '</span></a>';
      }).join('');
    }).join('') +
    '</div></div>';
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
        '<div class="tl-row3">' + field('wmin', 'w min', 0.5, 'm/s') + field('wmax', 'w max', 1.5, 'm/s') + field('rmax', 'R max', 200, 'Pa/m') + '</div>' +
        '<div class="tl-tbl"><table><thead><tr><th>Dimenzija</th><th><span class="sym">d</span><sub>u</sub> [mm]</th><th><span class="sym">w</span> [m/s]</th><th><span class="sym">R</span> [Pa/m]</th><th></th></tr></thead><tbody id="tl-pipes"></tbody></table></div>' +
        '<p class="tl-note">R po Darcy–Weisbach-u, faktor trenja po Colebrook-White-u (laminarno 64/Re). Dimenzija zadovoljava ako je brzina u zadatom opsegu i R ≤ R max; zeleno je najmanja dimenzija koja zadovoljava oba uslova. Dimenzije su tipične kataloške vrednosti; za izvođački projekat proverite katalog proizvođača.</p>' +
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
      var wMin = +$('wmin').value, wMax = +$('wmax').value, rMax = +$('rmax').value;
      if (!(wMin >= 0 && wMax > wMin && rMax > 0)) return bad('Proverite kriterijume: brzina min < max i R max > 0.');
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
        var cls = w > wMax ? 'hi' : R > rMax ? 'rhi' : w < wMin ? 'lo' : 'ok';
        if (cls === 'ok' && best === null) best = i;
        var tag = cls === 'ok' ? '<span class="tl-pill ok">zadovoljava</span>' : cls === 'hi' ? '<span class="tl-pill hi">w visoka</span>' : cls === 'rhi' ? '<span class="tl-pill hi">R > ' + fmt(rMax, 0) + '</span>' : '<span class="tl-pill lo">w niska</span>';
        return '<tr data-i="' + i + '"><td>' + p[0] + '</td><td>' + fmt(p[1], 1) + '</td><td' + (w > wMax ? ' class="tl-bad"' : '') + '>' + fmt(w, 2) + '</td><td' + (R > rMax ? ' class="tl-bad"' : '') + '>' + fmt(R, R < 10 ? 1 : 0) + '</td><td>' + tag + '</td></tr>';
      }).join('');
      if (best !== null) pipes.querySelector('[data-i="' + best + '"]').classList.add('best');
    }

    ['q', 'v', 'ts', 'tr', 'rho', 'cp', 'mu', 'fluid', 'set', 'k', 'wmin', 'wmax', 'rmax'].forEach(function (id) { $(id).addEventListener('input', calc); });
    setMode('flow');
  }
  // ---- Duct Calc -----------------------------------------------------------

  // Materijali kanala: apsolutna hrapavost k u mm (orijentacione vrednosti, ASHRAE / CIBSE)
  var DUCT_MATERIALS = {
    galv:   { label: 'Pocinkovani lim', k: 0.15 },
    spiro:  { label: 'Spiro kanali, pocinkovani', k: 0.09 },
    alu:    { label: 'Aluminijumski lim', k: 0.05 },
    inox:   { label: 'Nerđajući čelik', k: 0.05 },
    pvc:    { label: 'PVC / PP (plastični kanali)', k: 0.01 },
    panel:  { label: 'Preizolovani paneli (PIR/fenolni, Al folija)', k: 0.07 },
    fiber:  { label: 'Kanali od staklene vune (duct board)', k: 0.9 },
    flex:   { label: 'Fleksibilno crevo, potpuno razvučeno', k: 1.5 },
    conc:   { label: 'Zidani / betonski kanal', k: 1.3 }
  };
  // Orijentacione preporučene brzine (komfor), m/s
  var DUCT_USE = {
    main:   { label: 'Glavni razvod', lo: 4.0, hi: 6.0 },
    branch: { label: 'Ogranci', lo: 3.0, hi: 4.5 },
    term:   { label: 'Priključci na distributivne elemente', lo: 2.0, hi: 3.0 },
    shaft:  { label: 'Vertikale / šahtovi, tehničke prostorije', lo: 6.0, hi: 8.0 }
  };
  // Standardni kružni kanali EN 1506 (nazivni prečnik, mm)
  var ROUND_D = [80, 100, 125, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710, 800, 900, 1000, 1120, 1250];
  // Uobičajene širine pravougaonih kanala (mm)
  var RECT_A = [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000];

  // Vazduh: gustina iz jednačine stanja (p u hPa), viskoznost po Sutherland-u (Pa·s)
  function airRho(t, pHpa) { return pHpa * 100 / (287.05 * (t + 273.15)); }
  function airMu(t) { var T = t + 273.15; return 1.458e-6 * Math.pow(T, 1.5) / (T + 110.4); }

  // Jedinični pad pritiska za kanal preseka A i hidrauličkog prečnika Dh
  function ductR(V, A, Dh, rho, mu, k) {
    var w = V / A, Re = rho * w * Dh / mu;
    var lam = frictionFactor(Re, k / Dh);
    return { w: w, Re: Re, lam: lam, R: lam / Dh * rho * w * w / 2, pd: rho * w * w / 2 };
  }

  function renderDuctCalc(el, menu) {
    var matOpts = Object.keys(DUCT_MATERIALS).map(function (k) { return '<option value="' + k + '">' + DUCT_MATERIALS[k].label + '</option>'; }).join('');
    var useOpts = Object.keys(DUCT_USE).map(function (k) { var u = DUCT_USE[k]; return '<option value="' + k + '">' + u.label + ' (' + fmt(u.lo, 1) + '–' + fmt(u.hi, 1) + ' m/s)</option>'; }).join('');
    el.innerHTML =
      '<div class="tool">' +
      '<div class="doc-meta">Alati · ' + menu.label + '</div>' +
      '<h1>Duct Calc</h1>' +
      '<p class="tl-lede">Protok vazduha iz toplotne ili senzibilne rashladne snage, pa brzina i jedinični pad pritiska za kružni ili pravougaoni kanal. Svojstva vazduha se računaju na temperaturi posle izmenjivača (dovodni vazduh).</p>' +
      '<div class="tl-grid">' +
      '<section class="tl-panel" aria-label="Ulazni podaci">' +
        '<h2>Protok vazduha</h2>' +
        '<div class="tl-seg" role="group" aria-label="Režim proračuna">' +
          '<button type="button" id="tl-m-flow" aria-pressed="true">Protok iz snage</button>' +
          '<button type="button" id="tl-m-direct" aria-pressed="false">Poznat protok</button>' +
        '</div>' +
        field('q', 'Toplotna / senzibilna rashladna snaga Q', 12, 'kW') +
        field('v', 'Zapreminski protok V̇', 3600, 'm³/h') +
        '<div class="tl-row">' + field('t1', 'Ispred izmenjivača t<sub>1</sub>', 26, '°C') + field('t2', 'Iza izmenjivača t<sub>2</sub>', 16, '°C') + '</div>' +
        '<div class="tl-dt"><span>ΔT = <b id="tl-dt">—</b> K</span><span>ρ(t<sub>2</sub>) = <b id="tl-rhot">—</b> kg/m³</span><span id="tl-mode">hlađenje</span></div>' +
        '<div class="tl-row">' + field('p', 'Atmosferski pritisak', 1013, 'hPa') + field('cp', 'Spec. toplota cp', 1.006, 'kJ/kgK') + '</div>' +
        '<h2>Kanal</h2>' +
        '<div class="tl-seg" role="group" aria-label="Oblik kanala">' +
          '<button type="button" id="tl-s-rect" aria-pressed="true">Pravougaoni</button>' +
          '<button type="button" id="tl-s-round" aria-pressed="false">Kružni</button>' +
        '</div>' +
        '<div class="tl-row" id="tl-rect-dims">' + field('a', 'Širina a', 600, 'mm') + field('b', 'Visina b', 300, 'mm') + '</div>' +
        '<div class="tl-row" id="tl-round-dims" hidden>' + field('d', 'Prečnik D', 400, 'mm') + '</div>' +
        '<div class="tl-pipe-sel">' +
          '<div class="tl-field"><label for="tl-mat">Materijal kanala</label><div class="tl-inp"><select id="tl-mat">' + matOpts + '</select></div></div>' +
          field('k', 'Hrapavost k', '', 'mm') +
        '</div>' +
        '<div class="tl-field"><label for="tl-use">Namena deonice (preporučena brzina)</label><div class="tl-inp"><select id="tl-use">' + useOpts + '</select></div></div>' +
        '<p class="tl-note">Preporučene brzine su orijentacione vrednosti za komforne sisteme; za prostore sa strožim zahtevima za buku birajte niže brzine.</p>' +
      '</section>' +
      '<section class="tl-panel" aria-label="Rezultati" aria-live="polite">' +
        '<h2>Rezultat</h2>' +
        '<div class="tl-big"><span class="lbl" id="tl-big-lbl">Zapreminski protok</span><span class="val" id="tl-big-val">—</span></div>' +
        '<dl class="tl-kv" id="tl-kv"></dl>' +
        '<div class="tl-formula" id="tl-formula"></div>' +
        '<h2 id="tl-duct-title">Izabrani kanal</h2>' +
        '<div class="tl-big"><span class="lbl">Brzina / jedinični pad pritiska</span><span class="val" id="tl-duct-val">—</span></div>' +
        '<dl class="tl-kv" id="tl-kv2"></dl>' +
        '<h2 id="tl-tbl-title">Alternativne dimenzije</h2>' +
        '<div class="tl-tbl"><table><thead><tr><th>Dimenzija</th><th><span class="sym">D</span><sub>h</sub> [mm]</th><th><span class="sym">w</span> [m/s]</th><th><span class="sym">R</span> [Pa/m]</th><th></th></tr></thead><tbody id="tl-ducts"></tbody></table></div>' +
        '<p class="tl-note">R po Darcy–Weisbach-u sa hidrauličkim prečnikom D<sub>h</sub> = 2ab/(a+b), faktor trenja po Colebrook-White-u. D<sub>e</sub> je ekvivalentni prečnik (Huebscher) za izbor kružnog kanala istog pada pritiska pri istom protoku.</p>' +
      '</section>' +
      '</div></div>';

    function $(id) { return el.querySelector('#tl-' + id); }
    var mode = 'flow', shape = 'rect', lastMat = null;
    function press(a, b, on) { $(a).setAttribute('aria-pressed', String(on)); $(b).setAttribute('aria-pressed', String(!on)); }
    function setMode(m) { mode = m; press('m-flow', 'm-direct', m === 'flow'); el.querySelector('#f-q').hidden = m !== 'flow'; el.querySelector('#f-v').hidden = m !== 'direct'; calc(); }
    function setShape(s) { shape = s; press('s-rect', 's-round', s === 'rect'); $('rect-dims').hidden = s !== 'rect'; $('round-dims').hidden = s !== 'round'; calc(); }
    $('m-flow').onclick = function () { setMode('flow'); };
    $('m-direct').onclick = function () { setMode('direct'); };
    $('s-rect').onclick = function () { setShape('rect'); };
    $('s-round').onclick = function () { setShape('round'); };

    function pill(w, use) {
      if (w < use.lo) return '<span class="tl-pill lo">niska</span>';
      if (w > use.hi) return '<span class="tl-pill hi">visoka</span>';
      return '<span class="tl-pill ok">u opsegu</span>';
    }

    function calc() {
      var mk = $('mat').value;
      if (mk !== lastMat) { $('k').value = DUCT_MATERIALS[mk].k; lastMat = mk; }
      var t1 = +$('t1').value, t2 = +$('t2').value, p = +$('p').value, cp = +$('cp').value, k = +$('k').value / 1000;
      var use = DUCT_USE[$('use').value];
      var dT = Math.abs(t1 - t2);
      var kv = $('kv'), kv2 = $('kv2'), big = $('big-val'), fx = $('formula'), dv = $('duct-val'), tb = $('ducts');
      function bad(msg) { big.textContent = '—'; dv.textContent = '—'; kv.innerHTML = '<p class="tl-err">' + msg + '</p>'; kv2.innerHTML = ''; fx.textContent = ''; tb.innerHTML = ''; }
      if (!(p > 0 && cp > 0)) return bad('Unesite pozitivne vrednosti za pritisak i cp.');
      if (!(k >= 0)) return bad('Hrapavost k ne može biti negativna.');
      var rho = airRho(t2, p), mu = airMu(t2);
      $('dt').textContent = fmt(dT, 1); $('rhot').textContent = fmt(rho, 3);
      // toplija strana crveno, hladnija plavo
      el.querySelector('#f-t1').classList.toggle('tsup', t1 > t2); el.querySelector('#f-t1').classList.toggle('tret', t1 < t2);
      el.querySelector('#f-t2').classList.toggle('tsup', t2 > t1); el.querySelector('#f-t2').classList.toggle('tret', t2 < t1);
      $('mode').textContent = t2 > t1 ? 'grejanje' : t2 < t1 ? 'hlađenje (senzibilno)' : '—';
      var V, Q;
      if (mode === 'flow') {
        Q = +$('q').value;
        if (!(Q > 0)) return bad('Unesite snagu veću od nule.');
        if (!(dT > 0)) return bad('Temperature ispred i iza izmenjivača moraju se razlikovati (ΔT > 0).');
        V = Q / (rho * cp * dT);
      } else {
        var vIn = +$('v').value;
        if (!(vIn > 0)) return bad('Unesite protok veći od nule.');
        V = vIn / 3600; Q = V * rho * cp * dT;
      }
      var Vh = V * 3600, m = V * rho;
      if (mode === 'flow') { $('big-lbl').textContent = 'Zapreminski protok'; big.innerHTML = fmt(Vh, 0) + '<small>m³/h</small>'; }
      else { $('big-lbl').textContent = 'Toplotna snaga pri zadatom ΔT'; big.innerHTML = fmt(Q, 2) + '<small>kW</small>'; }
      var rows = [
        ['V̇', fmt(V, 3) + ' m³/s'], ['V̇', fmt(V * 1000, 0) + ' l/s'],
        ['ṁ', fmt(m * 3600, 0) + ' kg/h'], mode === 'flow' ? ['Q', fmt(Q, 2) + ' kW'] : ['V̇', fmt(Vh, 0) + ' m³/h'],
        ['ΔT', fmt(dT, 1) + ' K'], ['ρ', fmt(rho, 3) + ' kg/m³']
      ];
      kv.innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');
      fx.textContent = mode === 'flow'
        ? 'V̇ = Q / (ρ·cp·ΔT) = ' + fmt(Q, 2) + ' / (' + fmt(rho, 3) + ' · ' + fmt(cp, 3) + ' · ' + fmt(dT, 1) + ') = ' + fmt(V, 4) + ' m³/s = ' + fmt(Vh, 0) + ' m³/h'
        : 'Q = V̇·ρ·cp·ΔT = ' + fmt(V, 4) + ' · ' + fmt(rho, 3) + ' · ' + fmt(cp, 3) + ' · ' + fmt(dT, 1) + ' = ' + fmt(Q, 2) + ' kW';

      // izabrani kanal
      var A, Dh, De, label;
      if (shape === 'rect') {
        var a = +$('a').value / 1000, b = +$('b').value / 1000;
        if (!(a > 0 && b > 0)) { dv.textContent = '—'; kv2.innerHTML = '<p class="tl-err">Unesite dimenzije kanala.</p>'; tb.innerHTML = ''; return; }
        A = a * b; Dh = 2 * a * b / (a + b); De = 1.30 * Math.pow(a * b, 0.625) / Math.pow(a + b, 0.25);
        label = fmt(a * 1000, 0) + '×' + fmt(b * 1000, 0) + ' mm';
      } else {
        var d = +$('d').value / 1000;
        if (!(d > 0)) { dv.textContent = '—'; kv2.innerHTML = '<p class="tl-err">Unesite prečnik kanala.</p>'; tb.innerHTML = ''; return; }
        A = Math.PI * d * d / 4; Dh = d; De = d; label = 'Ø' + fmt(d * 1000, 0) + ' mm';
      }
      var r = ductR(V, A, Dh, rho, mu, k);
      $('duct-title').innerHTML = 'Izabrani kanal <span class="nc">' + label + '</span>';
      dv.innerHTML = fmt(r.w, 2) + '<small>m/s</small> ' + fmt(r.R, 2) + '<small>Pa/m</small>';
      var ratio = shape === 'rect' ? Math.max(a, b) / Math.min(a, b) : 1;
      var rows2 = [
        ['A', fmt(A, 4) + ' m²'], ['D<sub>h</sub>', fmt(Dh * 1000, 0) + ' mm'],
        ['D<sub>e</sub>', fmt(De * 1000, 0) + ' mm'], ['p<sub>d</sub>', fmt(r.pd, 1) + ' Pa'],
        ['Re', fmt(r.Re, 0)], ['λ', fmt(r.lam, 4)],
        ['Brzina', pill(r.w, use)], ['a : b', shape === 'rect' ? fmt(ratio, 1) + ' : 1' + (ratio > 4 ? ' ⚠' : '') : '—']
      ];
      kv2.innerHTML = rows2.map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + x[1] + '</dd></div>'; }).join('');

      // tabela alternativa
      var list;
      if (shape === 'rect') {
        $('tbl-title').innerHTML = 'Alternativne širine pri visini <span class="nc">b = ' + fmt(b * 1000, 0) + ' mm</span>';
        // korisnikova širina se ubacuje u niz standardnih na svoje mesto
        var aUser = Math.round(a * 1000 * 10) / 10;
        var widths = RECT_A.indexOf(aUser) === -1 ? RECT_A.concat([aUser]).sort(function (x, y) { return x - y; }) : RECT_A;
        list = widths.map(function (aa) { return { name: Math.round(aa) + '×' + Math.round(b * 1000), A: aa / 1000 * b, Dh: 2 * (aa / 1000) * b / (aa / 1000 + b), user: aa === aUser, std: RECT_A.indexOf(aa) !== -1 }; });
      } else {
        $('tbl-title').textContent = 'Standardni kružni kanali EN 1506';
        var dUser = Math.round(d * 1000 * 10) / 10;
        var diams = ROUND_D.indexOf(dUser) === -1 ? ROUND_D.concat([dUser]).sort(function (x, y) { return x - y; }) : ROUND_D;
        list = diams.map(function (dd) { return { name: 'Ø' + Math.round(dd), A: Math.PI * Math.pow(dd / 1000, 2) / 4, Dh: dd / 1000, user: dd === dUser, std: ROUND_D.indexOf(dd) !== -1 }; });
      }
      var best = null;
      tb.innerHTML = list.map(function (x, i) {
        var rr = ductR(V, x.A, x.Dh, rho, mu, k);
        var inRange = rr.w >= use.lo && rr.w <= use.hi;
        if (inRange && best === null && x.std) best = i;
        var tag = x.user ? ' <span class="tl-pill user" title="' + (x.std ? 'Vaša dimenzija (standardna)' : 'Vaša dimenzija (nestandardna)') + '">unos</span>' : '';
        return '<tr data-i="' + i + '"' + (x.user ? ' class="user"' : '') + '><td>' + x.name + tag + '</td><td>' + fmt(x.Dh * 1000, 0) + '</td><td>' + fmt(rr.w, 2) + '</td><td>' + fmt(rr.R, 2) + '</td><td>' + pill(rr.w, use) + '</td></tr>';
      }).join('');
      if (best !== null) tb.querySelector('[data-i="' + best + '"]').classList.add('best');
    }

    ['q', 'v', 't1', 't2', 'p', 'cp', 'a', 'b', 'd', 'k', 'mat', 'use'].forEach(function (id) { $(id).addEventListener('input', calc); });
    setMode('flow');
  }
  // ---- h-x dijagram: psihrometrija vlažnog vazduha -------------------------
  // Jedinice interno: t [°C], x [kg/kg suvog vazduha], phi [0–1], h [kJ/kg s.v.], p [Pa]

  function pws(t) { // pritisak zasićenja (Magnus, iznad vode / leda), Pa
    return t >= 0 ? 611.2 * Math.exp(17.62 * t / (243.12 + t)) : 611.2 * Math.exp(22.46 * t / (272.62 + t));
  }
  function xFromPw(pw, p) { return 0.622 * pw / (p - pw); }
  function pwFromX(x, p) { return p * x / (0.622 + x); }
  function xSat(t, p) { return xFromPw(pws(t), p); }
  function hOf(t, x) { return 1.006 * t + x * (2501 + 1.86 * t); }
  function tFromHX(h, x) { return (h - 2501 * x) / (1.006 + 1.86 * x); }
  function dewPoint(x, p) {
    var pw = pwFromX(x, p); if (!(pw > 0)) return NaN;
    var L = Math.log(pw / 611.2);
    var t = 243.12 * L / (17.62 - L);
    return t >= 0 ? t : 272.62 * L / (22.46 - L);
  }
  function xWetBulb(t, tw, p) { // psihrometrijska jednačina (ASHRAE)
    var xs = xSat(tw, p);
    return tw >= 0
      ? ((2501 - 2.326 * tw) * xs - 1.006 * (t - tw)) / (2501 + 1.86 * t - 4.186 * tw)
      : ((2830 - 0.24 * tw) * xs - 1.006 * (t - tw)) / (2830 + 1.86 * t - 2.1 * tw);
  }
  function bisect(f, a, b, n) {
    var fa = f(a);
    for (var i = 0; i < (n || 80); i++) {
      var m = (a + b) / 2, fm = f(m);
      if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else { b = m; }
    }
    return (a + b) / 2;
  }
  function wetBulb(t, x, p) {
    if (xWetBulb(t, t, p) <= x) return t; // zasićeno (ili magla)
    return bisect(function (tw) { return xWetBulb(t, tw, p) - x; }, -60, t);
  }
  // Kompletno stanje iz (t, x)
  function stateTX(t, x, p) {
    var pw = pwFromX(x, p), T = t + 273.15;
    var v = 287.05 * T * (1 + 1.6078 * x) / p; // m³/kg suvog vazduha
    return { t: t, x: x, phi: pw / pws(t), h: hOf(t, x), td: dewPoint(x, p), twb: wetBulb(t, x, p), v: v, rho: (1 + x) / v, p: p };
  }

  var PSY_PROPS = {
    t:   { label: 'Temperatura t', unit: '°C', toSI: function (v) { return v; }, fromSI: function (v) { return v; }, dec: 1 },
    phi: { label: 'Relativna vlažnost φ', unit: '%', toSI: function (v) { return v / 100; }, fromSI: function (v) { return v * 100; }, dec: 0 },
    x:   { label: 'Sadržaj vlage x', unit: 'g/kg', toSI: function (v) { return v / 1000; }, fromSI: function (v) { return v * 1000; }, dec: 2 },
    h:   { label: 'Entalpija h', unit: 'kJ/kg', toSI: function (v) { return v; }, fromSI: function (v) { return v; }, dec: 1 },
    td:  { label: 'Temperatura rose t_r', unit: '°C', toSI: function (v) { return v; }, fromSI: function (v) { return v; }, dec: 1 },
    twb: { label: 'Temp. vlažnog termometra t_v', unit: '°C', toSI: function (v) { return v; }, fromSI: function (v) { return v; }, dec: 1 }
  };

  // Stanje iz bilo koje dve nezavisne veličine. Vraća {state} ili {err}.
  function stateFrom(k1, v1, k2, v2, p) {
    if (k1 === k2) return { err: 'Izaberite dve različite veličine.' };
    var X = {
      phi: function (t, v) { return xFromPw(v * pws(t), p); },
      x:   function (t, v) { return v; },
      h:   function (t, v) { return (v - 1.006 * t) / (2501 + 1.86 * t); },
      td:  function (t, v) { return xFromPw(pws(v), p); },
      twb: function (t, v) { return xWetBulb(t, v, p); }
    };
    var pair = [k1, k2].sort().join('+');
    if (pair === 'td+x') return { err: 'x i t_r nisu nezavisne veličine (obe određuju sadržaj vlage). Izaberite drugu kombinaciju.' };
    if (pair === 'h+twb') return { err: 'h i t_v su praktično zavisne (adijabatska linija ≈ izentalpa). Izaberite drugu kombinaciju.' };
    if (k1 === 'phi' && !(v1 > 0 && v1 <= 1)) return { err: 'Relativna vlažnost mora biti između 0 i 100 %.' };
    if (k2 === 'phi' && !(v2 > 0 && v2 <= 1)) return { err: 'Relativna vlažnost mora biti između 0 i 100 %.' };
    var t, x;
    if (k1 === 't' || k2 === 't') {
      t = k1 === 't' ? v1 : v2;
      var ko = k1 === 't' ? k2 : k1, vo = k1 === 't' ? v2 : v1;
      if ((ko === 'td' || ko === 'twb') && vo > t + 1e-9) return { err: (ko === 'td' ? 'Temperatura rose' : 'Temperatura vlažnog termometra') + ' ne može biti viša od temperature vazduha.' };
      x = X[ko](t, vo);
    } else {
      var g = function (tt) { return X[k1](tt, v1) - X[k2](tt, v2); };
      var lo = -50, prev = g(lo), found = null;
      for (var tt = lo + 0.25; tt <= 120; tt += 0.25) {
        var cur = g(tt);
        if (isFinite(cur) && isFinite(prev) && (cur < 0) !== (prev < 0)) {
          var r = bisect(g, tt - 0.25, tt);
          var xr = X[k1](r, v1);
          if (xr >= 0 && pwFromX(xr, p) / pws(r) <= 1.005) { found = r; break; }
        }
        prev = cur;
      }
      if (found === null) return { err: 'Za unete vrednosti ne postoji fizički moguće stanje vlažnog vazduha.' };
      t = found; x = X[k1](t, v1);
    }
    if (!(x >= 0)) return { err: 'Za unete vrednosti sadržaj vlage ispada negativan.' };
    var s = stateTX(t, x, p);
    if (s.phi > 1.005) return { err: 'Stanje je u oblasti magle (φ > 100 %).' };
    return { state: s };
  }

  // Procesi: iz stanja 1 i parametara daju stanje 2 (+ pomoćne tačke za dijagram)
  var HX_PROCESSES = {
    points: { label: 'Dve tačke (unos stanja 2)' },
    heat:   { label: 'Grejanje (x = const)' },
    cool:   { label: 'Hlađenje (suvo ili sa odvlaživanjem)' },
    steam:  { label: 'Parno ovlaživanje' },
    adiab:  { label: 'Adijabatsko ovlaživanje (h ≈ const)' },
    mix:    { label: 'Mešanje dve struje' }
  };

  var HX_SHORT = { points: 'Dve tačke', heat: 'Grejanje', cool: 'Hlađenje', steam: 'Parno ovl.', adiab: 'Adijab. ovl.', mix: 'Mešanje' };
  function hSat(t, p) { return hOf(t, xSat(t, p)); }

  function runProcess(kind, s1, P, p) {
    var s2, extra = {};
    if (kind === 'heat') {
      if (!(P.t2 > s1.t)) return { err: 'Kod grejanja temperatura posle grejača mora biti viša od t₁.' };
      s2 = stateTX(P.t2, s1.x, p);
    } else if (kind === 'cool') {
      if (!(P.t2 < s1.t)) return { err: 'Kod hlađenja temperatura posle hladnjaka mora biti niža od t₁.' };
      if (!(P.tadp < P.t2)) return { err: 'Temperatura površine hladnjaka (ADP) mora biti niža od temperature posle hladnjaka.' };
      var xs = xSat(P.tadp, p);
      if (xs >= s1.x) {
        s2 = stateTX(P.t2, s1.x, p); extra.note = 'ADP je iznad tačke rose stanja 1 — suvo hlađenje, bez kondenzacije.';
        if (s2.phi > 1.005) return { err: 'Temperatura posle hladnjaka je ispod tačke rose — izaberite ADP ispod t_r.' };
      } else {
        var f = (s1.t - P.t2) / (s1.t - P.tadp);
        s2 = stateTX(P.t2, s1.x + f * (xs - s1.x), p);
        extra.adp = stateTX(P.tadp, xs, p); extra.bf = 1 - f;
      }
    } else if (kind === 'steam') {
      if (!(P.phi2 > s1.phi && P.phi2 <= 1)) return { err: 'Ciljna relativna vlažnost mora biti veća od φ₁ i najviše 100 %.' };
      var hs = 2676; // entalpija pare ~100 °C, kJ/kg
      var st = function (x2) { return stateTX(tFromHX(s1.h + (x2 - s1.x) * hs, x2), x2, p); };
      var x2 = bisect(function (x) { return st(x).phi - P.phi2; }, s1.x, s1.x + 0.06);
      s2 = st(x2);
    } else if (kind === 'adiab') {
      if (!(P.eta > 0 && P.eta <= 1)) return { err: 'Efikasnost ovlaživača mora biti između 0 i 100 %.' };
      var ts = bisect(function (t) { return hSat(t, p) - s1.h; }, -40, s1.t);
      var xsat = xSat(ts, p);
      var xa = s1.x + P.eta * (xsat - s1.x);
      s2 = stateTX(tFromHX(s1.h, xa), xa, p);
      extra.sat = stateTX(ts, xsat, p);
    } else if (kind === 'mix') {
      var mA = P.mA, mB = P.mB; // kg s.v./s
      var xm = (mA * s1.x + mB * P.sB.x) / (mA + mB), hm = (mA * s1.h + mB * P.sB.h) / (mA + mB);
      s2 = stateTX(tFromHX(hm, xm), xm, p);
      extra.B = P.sB; extra.share = mB / (mA + mB);
      if (s2.phi > 1.005) extra.note = 'Mešavina pada u oblast magle (φ > 100 %) — deo vlage se izdvaja kao magla.';
    }
    return { s2: s2, extra: extra };
  }

  // ---- crtanje h-x (Mollier) dijagrama ----------------------------------------
  // Kosi koordinatni sistem: horizontalno x [g/kg], vertikalno Y = h − 2501·x = t·(1,006 + 1,86·x),
  // pa su izoterme skoro horizontalne, a izentalpe kose prave — kao na klasičnom Mollier dijagramu.
  function drawHx(host, pts, segs, p) {
    var NS = 'http://www.w3.org/2000/svg';
    var W = 920, H = 580, ml = 44, mr = 56, mt = 18, mb = 42;
    var maxT = 40, minT = -10, maxX = 20;
    pts.forEach(function (q) { maxT = Math.max(maxT, q.s.t); minT = Math.min(minT, q.s.t); maxX = Math.max(maxX, q.s.x * 1000); });
    var tmin = Math.floor((minT - 3) / 5) * 5, tmax = Math.ceil((maxT + 3) / 5) * 5, xmax = Math.ceil((maxX + 2) / 5) * 5;
    var Yof = function (t, xg) { return t * (1.006 + 1.86 * xg / 1000); };
    var Ymax = Yof(tmax, xmax), Ymin = tmin < 0 ? Yof(tmin, xmax) : tmin * 1.006;
    var sx = function (xg) { return ml + xg / xmax * (W - ml - mr); };
    var sy = function (Y) { return mt + (Ymax - Y) / (Ymax - Ymin) * (H - mt - mb); };
    var P = function (t, xg) { return sx(xg).toFixed(1) + ',' + sy(Yof(t, xg)).toFixed(1); };
    var out = [];
    function line(pts2, cls, extra) { out.push('<polyline class="' + cls + '" points="' + pts2.join(' ') + '"' + (extra || '') + '/>'); }
    function text(x, y, s, cls, anchor) { out.push('<text class="' + (cls || 'hx-lbl') + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + s + '</text>'); }

    // linija zasićenja i oblast bez magle (za odsecanje)
    var sat = [], tEnd = tmin;
    for (var t = tmin; t <= tmax + 1e-9; t += 0.25) {
      var xg = xSat(t, p) * 1000;
      if (xg > xmax) break;
      sat.push([xg, t]); tEnd = t;
    }
    var poly = ['0,' + Ymin].concat(sat.map(function (a) { return a[0] + ',' + Yof(a[1], a[0]); }));
    var last = sat[sat.length - 1];
    poly.push(last[0] + ',' + Ymax, '0,' + Ymax);
    var polyPx = poly.map(function (s) { var a = s.split(','); return sx(+a[0]).toFixed(1) + ',' + sy(+a[1]).toFixed(1); }).join(' ');
    out.push('<defs><clipPath id="hx-clip"><polygon points="' + polyPx + '"/></clipPath>' +
      '<clipPath id="hx-plot"><rect x="' + ml + '" y="' + mt + '" width="' + (W - ml - mr) + '" height="' + (H - mt - mb) + '"/></clipPath>' +
      '<marker id="hx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hx-arrowhead"/></marker></defs>');
    out.push('<rect class="hx-fog" x="' + ml + '" y="' + mt + '" width="' + (W - ml - mr) + '" height="' + (H - mt - mb) + '"/>');
    out.push('<polygon class="hx-air" points="' + polyPx + '" clip-path="url(#hx-plot)"/>');

    // x mreža
    out.push('<g clip-path="url(#hx-clip)">');
    for (var xg2 = 1; xg2 < xmax; xg2++) out.push('<line class="' + (xg2 % 5 ? 'hx-grid' : 'hx-grid2') + '" x1="' + sx(xg2) + '" x2="' + sx(xg2) + '" y1="' + mt + '" y2="' + (H - mb) + '"/>');
    // izentalpe
    var hLo = Math.floor(Ymin / 5) * 5, hHi = Math.ceil((Ymax + 2.501 * xmax) / 5) * 5;
    for (var h = hLo; h <= hHi; h += 5) line([sx(0) + ',' + sy(h), sx(xmax) + ',' + sy(h - 2.501 * xmax)], h % 10 ? 'hx-h' : 'hx-h2');
    // izoterme
    for (var ti = tmin; ti <= tmax; ti += 1) {
      var xe = Math.min(xSat(ti, p) * 1000, xmax);
      line([P(ti, 0), P(ti, xe)], ti % 5 ? 'hx-iso0' : (ti % 10 ? 'hx-iso' : 'hx-iso2'));
    }
    // linije φ = const
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].forEach(function (ph) {
      var ptsP = [];
      for (var t3 = tmin; t3 <= tmax + 1e-9; t3 += 0.5) { var x3 = xFromPw(ph * pws(t3), p) * 1000; if (x3 > xmax * 1.02) break; ptsP.push(P(t3, x3)); }
      line(ptsP, 'hx-phi');
    });
    out.push('</g>');
    line(sat.map(function (a) { return P(a[1], a[0]); }), 'hx-sat');

    // oznake: t levo, x dole, h gore/na zasićenju, φ na krajevima
    for (var tl = tmin; tl <= tmax; tl += 5) text(ml - 6, sy(Yof(tl, 0)) + 3.5, tl, 'hx-lbl', 'end');
    for (var xl = 0; xl <= xmax; xl += (xmax > 30 ? 5 : 2)) text(sx(xl), H - mb + 16, xl, 'hx-lbl', 'middle');
    text(sx(xmax / 2), H - 6, 'x [g/kg suvog vazduha]', 'hx-ax', 'middle');
    text(12, mt + 4, 't [°C]', 'hx-ax', 'start');
    for (var hl = hLo; hl <= hHi; hl += 10) {
      var xTop = (hl - Ymax) / 2.501;
      if (xTop > 0.3 && xTop < xmax - 3) { text(sx(xTop), mt - 3, hl, 'hx-hl', 'middle'); continue; }
      if (xTop <= 0.3) continue;
      var tsat = bisect(function (tt) { return hSat(tt, p) - hl; }, -60, 100);
      var xs2 = xSat(tsat, p) * 1000;
      if (tsat > tmin && tsat < tEnd && xs2 < xmax - 1) text(sx(xs2) + 4, sy(Yof(tsat, xs2)) + 12, hl, 'hx-hl', 'start');
    }
    text(W - mr, mt - 3, 'h [kJ/kg]', 'hx-hl', 'end');
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8].forEach(function (ph) {
      var tA = bisect(function (tt) { return xFromPw(ph * pws(tt), p) * 1000 - xmax; }, -60, 150);
      if (tA < tmax) text(W - mr + 4, sy(Yof(tA, xmax)) + 3, Math.round(ph * 100) + ' %', 'hx-pl', 'start');
      else { var xB = xFromPw(ph * pws(tmax), p) * 1000; text(sx(xB), mt + 12, Math.round(ph * 100) + '%', 'hx-pl', 'middle'); }
    });
    text(sx(last[0]) - 4, sy(Yof(last[1], last[0])) - 6, 'φ = 100 %', 'hx-pl', 'end');
    out.push('<rect class="hx-frame" x="' + ml + '" y="' + mt + '" width="' + (W - ml - mr) + '" height="' + (H - mt - mb) + '"/>');

    // procesi i tačke
    segs.forEach(function (sg) {
      out.push('<line class="' + sg.cls + '" x1="' + sx(sg.a.x * 1000) + '" y1="' + sy(Yof(sg.a.t, sg.a.x * 1000)) + '" x2="' + sx(sg.b.x * 1000) + '" y2="' + sy(Yof(sg.b.t, sg.b.x * 1000)) + '"' + (sg.arrow ? ' marker-end="url(#hx-arrow)"' : '') + '/>');
    });
    pts.forEach(function (q) {
      var X = sx(q.s.x * 1000), Y = sy(Yof(q.s.t, q.s.x * 1000));
      out.push('<circle class="' + (q.cls || 'hx-pt') + '" cx="' + X.toFixed(1) + '" cy="' + Y.toFixed(1) + '" r="' + (q.small ? 3.5 : 5.5) + '"><title>' + q.name + ': t = ' + fmt(q.s.t, 1) + ' °C, φ = ' + fmt(Math.min(q.s.phi, 9.99) * 100, 0) + ' %, x = ' + fmt(q.s.x * 1000, 2) + ' g/kg, h = ' + fmt(q.s.h, 1) + ' kJ/kg</title></circle>');
      text(X + 8, Y - 8, q.name, q.small ? 'hx-ptl2' : 'hx-ptl', 'start');
    });

    host.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="h-x dijagram vlažnog vazduha">' + out.join('') + '</svg>';
  }

  // ---- h-x alat ----------------------------------------------------------------
  function psyPointHtml(pfx, title, k1, v1, k2, v2) {
    var opts = function (sel) { return Object.keys(PSY_PROPS).map(function (k) { return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + PSY_PROPS[k].label + '</option>'; }).join(''); };
    var one = function (n, k, v) {
      return '<div class="hx-prop">' +
        '<div class="tl-inp"><select id="tl-' + pfx + 'k' + n + '" aria-label="' + title + ' – veličina ' + n + '">' + opts(k) + '</select></div>' +
        '<div class="tl-inp"><input id="tl-' + pfx + 'v' + n + '" type="number" inputmode="decimal" step="any" value="' + v + '" aria-label="' + title + ' – vrednost ' + n + '"><span class="u" id="tl-' + pfx + 'u' + n + '">' + PSY_PROPS[k].unit + '</span></div>' +
        '</div>';
    };
    return '<div class="tl-field"><label>' + title + '</label>' + one(1, k1, v1) + one(2, k2, v2) + '</div>';
  }

  function renderHxCalc(el, menu) {
    el.innerHTML =
      '<div class="tool tool-wide">' +
      '<div class="doc-meta">Alati · ' + menu.label + '</div>' +
      '<h1>h-x dijagram</h1>' +
      '<p class="tl-lede">Stanje vlažnog vazduha iz bilo koje dve veličine i niz procesa kroz klima komoru (mešanje, grejanje, hlađenje, ovlaživanje). Svaki korak polazi od stanja iz prethodnog koraka. Za zadati protok računaju se senzibilna, latentna i ukupna toplota i količina vode po koracima.</p>' +
      '<div class="tl-grid">' +
      '<section class="tl-panel" aria-label="Ulazni podaci">' +
        '<h2>Stanje 1 (ulaz)</h2>' +
        psyPointHtml('a', 'Dve poznate veličine', 't', 32, 'phi', 40) +
        '<div class="tl-row">' + field('p', 'Atmosferski pritisak', 1013, 'hPa') + field('V', 'Protok vazduha V̇ (stanje 1)', 1500, 'm³/h') + '</div>' +
        '<h2>Procesi</h2>' +
        '<div id="tl-steps" class="hx-steps"></div>' +
        '<div class="hx-add"><div class="tl-inp"><select id="tl-newkind" aria-label="Vrsta novog koraka">' +
          Object.keys(HX_PROCESSES).map(function (k) { return '<option value="' + k + '"' + (k === 'heat' ? ' selected' : '') + '>' + HX_PROCESSES[k].label + '</option>'; }).join('') +
        '</select></div><button type="button" class="hx-btn" id="tl-add">+ Dodaj korak</button></div>' +
      '</section>' +
      '<section class="tl-panel" aria-label="Rezultati" aria-live="polite">' +
        '<h2>Izlazno stanje</h2>' +
        '<div class="tl-big"><span class="lbl" id="tl-big-lbl">Poslednja tačka</span><span class="val" id="tl-big-val">—</span></div>' +
        '<dl class="tl-kv" id="tl-kv"></dl>' +
        '<p class="tl-err" id="tl-err" hidden></p>' +
        '<h2>Koraci</h2>' +
        '<div class="tl-tbl"><table id="tl-steptbl"></table></div>' +
        '<p class="tl-note">W &gt; 0 dodata voda/para, W &lt; 0 izdvojeni kondenzat; Q &lt; 0 odvedena toplota.</p><ul class="hx-notes" id="tl-notes"></ul>' +
      '</section>' +
      '</div>' +
      '<section class="tl-panel hx-chart" aria-label="Stanja vazduha"><h2>Stanja vazduha</h2><div class="tl-tbl"><table id="tl-states"></table></div></section>' +
      '<section class="tl-panel hx-chart" aria-label="h-x dijagram"><h2>h-x dijagram</h2><div id="tl-chart"></div>' +
      '<p class="tl-note">Pritisak zasićenja po Magnus-u (iznad vode, odnosno leda ispod 0 °C); t<sub>v</sub> po psihrometrijskoj jednačini (ASHRAE). Senzibilna toplota Q<sub>s</sub> = ṁ·(1,006 + 1,86·x)·Δt, latentna Q<sub>l</sub> = Q<sub>uk</sub> − Q<sub>s</sub>. Za parno ovlaživanje uzeta je entalpija pare 2676 kJ/kg (~100 °C). Kod mešanja se protok suvog vazduha za sledeće korake uvećava za struju B.</p></section>' +
      '</div>';

    function $(id) { return el.querySelector('#tl-' + id); }
    var last = {};          // poslednja izračunata stanja (za prenos vrednosti pri promeni veličine)
    var steps = [], nextId = 1;

    function bindPoint(pfx) {
      [1, 2].forEach(function (n) {
        $(pfx + 'k' + n).addEventListener('change', function () {
          var k = this.value;
          $(pfx + 'u' + n).textContent = PSY_PROPS[k].unit;
          if (last[pfx]) { var pr = PSY_PROPS[k]; $(pfx + 'v' + n).value = +pr.fromSI(last[pfx][k]).toFixed(pr.dec); }
          calc();
        });
        $(pfx + 'v' + n).addEventListener('input', calc);
      });
    }
    function readPoint(pfx, p) {
      var k1 = $(pfx + 'k1').value, k2 = $(pfx + 'k2').value;
      return stateFrom(k1, PSY_PROPS[k1].toSI(+$(pfx + 'v1').value), k2, PSY_PROPS[k2].toSI(+$(pfx + 'v2').value), p);
    }

    // podrazumevane vrednosti novog koraka, na osnovu stanja na njegovom ulazu
    function defaults(kind, s) {
      var t = s ? s.t : 20, phi = s ? s.phi * 100 : 50;
      switch (kind) {
        case 'heat':   return { t2: Math.round(t + 10) };
        case 'cool':   return { t2: Math.round(t - 8), tadp: Math.round(t - 13) };
        case 'steam':  return { phi2: Math.min(90, Math.round(phi + 20)) };
        case 'adiab':  return { eta: 85 };
        case 'points': return { t: Math.round(t), phi: 50 };
        case 'mix':    return { t: 26, phi: 50, VB: 3500 };
      }
      return {};
    }

    function stepHtml(st, idx) {
      var id = 's' + st.id + '-', d = st.d, body = '';
      if (st.kind === 'points') body = psyPointHtml(id + 'p', 'Stanje ' + (idx + 2) + ' – dve poznate veličine', 't', d.t, 'phi', d.phi);
      if (st.kind === 'heat')   body = field(id + 't2', 'Temperatura posle grejača', d.t2, '°C');
      if (st.kind === 'cool')   body = '<div class="tl-row">' + field(id + 't2', 'Temperatura posle hladnjaka', d.t2, '°C') + field(id + 'tadp', 'Temp. površine hladnjaka (ADP)', d.tadp, '°C') + '</div>';
      if (st.kind === 'steam')  body = field(id + 'phi2', 'Ciljna relativna vlažnost φ', d.phi2, '%');
      if (st.kind === 'adiab')  body = field(id + 'eta', 'Efikasnost ovlaživača η', d.eta, '%');
      if (st.kind === 'mix')    body = psyPointHtml(id + 'c', 'Struja B – dve poznate veličine', 't', d.t, 'phi', d.phi) + field(id + 'VB', 'Protok struje B', d.VB, 'm³/h');
      return '<div class="hx-step" data-sid="' + st.id + '">' +
        '<div class="hx-step-head"><span class="hx-step-no">' + (idx + 1) + ' → ' + (idx + 2) + '</span>' +
        '<span class="hx-step-name">' + HX_PROCESSES[st.kind].label + '</span>' +
        '<button type="button" class="hx-icon" data-act="up" aria-label="Pomeri korak gore"' + (idx === 0 ? ' disabled' : '') + '>↑</button>' +
        '<button type="button" class="hx-icon" data-act="down" aria-label="Pomeri korak dole"' + (idx === steps.length - 1 ? ' disabled' : '') + '>↓</button>' +
        '<button type="button" class="hx-icon" data-act="del" aria-label="Ukloni korak">×</button></div>' +
        '<div class="hx-step-body">' + body + '</div></div>';
    }

    // pre ponovnog crtanja kartica sačuvaj unete vrednosti
    function saveInputs() {
      steps.forEach(function (st) {
        var id = 's' + st.id + '-', g = function (n) { var e = $(id + n); return e ? e.value : undefined; };
        ['t2', 'tadp', 'phi2', 'eta', 'VB'].forEach(function (n) { if (g(n) !== undefined) st.d[n] = g(n); });
        var pk = st.kind === 'points' ? id + 'p' : st.kind === 'mix' ? id + 'c' : null;
        if (pk && $(pk + 'k1')) {
          st.d.k1 = $(pk + 'k1').value; st.d.k2 = $(pk + 'k2').value; st.d.v1 = $(pk + 'v1').value; st.d.v2 = $(pk + 'v2').value;
        }
      });
    }
    function renderSteps() {
      var host = $('steps');
      host.innerHTML = steps.length ? steps.map(stepHtml).join('') : '<p class="tl-note">Nema koraka. Dodajte proces ispod.</p>';
      steps.forEach(function (st) {
        var id = 's' + st.id + '-';
        var pk = st.kind === 'points' ? id + 'p' : st.kind === 'mix' ? id + 'c' : null;
        if (pk && st.d.k1) { // vrati sačuvane veličine
          $(pk + 'k1').value = st.d.k1; $(pk + 'k2').value = st.d.k2; $(pk + 'v1').value = st.d.v1; $(pk + 'v2').value = st.d.v2;
          $(pk + 'u1').textContent = PSY_PROPS[st.d.k1].unit; $(pk + 'u2').textContent = PSY_PROPS[st.d.k2].unit;
        }
        if (pk) bindPoint(pk);
      });
      host.querySelectorAll('.hx-step-body input:not([id$="v1"]):not([id$="v2"])').forEach(function (i) { i.addEventListener('input', calc); });
      calc();
    }
    $('steps').addEventListener('click', function (e) {
      var b = e.target.closest('.hx-icon'); if (!b) return;
      var sid = +b.closest('.hx-step').getAttribute('data-sid');
      var i = steps.findIndex(function (s) { return s.id === sid; });
      saveInputs();
      var act = b.getAttribute('data-act');
      if (act === 'del') steps.splice(i, 1);
      if (act === 'up' && i > 0) steps.splice(i - 1, 0, steps.splice(i, 1)[0]);
      if (act === 'down' && i < steps.length - 1) steps.splice(i + 1, 0, steps.splice(i, 1)[0]);
      renderSteps();
    });
    $('add').addEventListener('click', function () {
      saveInputs();
      var kind = $('newkind').value;
      steps.push({ id: nextId++, kind: kind, d: defaults(kind, last.end) });
      renderSteps();
    });

    function stateTable(cols) {
      var rows = [
        ['t', '°C', 't', 1, 1], ['φ', '%', 'phi', 100, 0], ['x', 'g/kg', 'x', 1000, 2], ['h', 'kJ/kg', 'h', 1, 1],
        ['t<sub>r</sub>', '°C', 'td', 1, 1], ['t<sub>v</sub>', '°C', 'twb', 1, 1], ['ρ', 'kg/m³', 'rho', 1, 3], ['v', 'm³/kg s.v.', 'v', 1, 3],
        ['V̇', 'm³/h', 'Vh', 1, 0]
      ];
      return '<thead><tr><th>Veličina</th>' + cols.map(function (c) { return '<th>' + c.name + '</th>'; }).join('') + '</tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr><td><span class="sym">' + r[0] + '</span> [' + r[1] + ']</td>' + cols.map(function (c) {
            var v = r[2] === 'Vh' ? c.Vh : c.s[r[2]] * r[3];
            return '<td>' + (v === undefined ? '—' : fmt(v, r[4])) + '</td>';
          }).join('') + '</tr>';
        }).join('') + '</tbody>';
    }

    function z(v) { return Math.abs(v) < 0.005 ? 0 : v; }
    function calc() {
      var err = $('err'), kv = $('kv'), big = $('big-val'), notes = $('notes');
      err.hidden = true; notes.innerHTML = '';
      function bad(msg) { err.textContent = msg; err.hidden = false; }
      var p = +$('p').value * 100, V = +$('V').value;
      if (!(p > 50000 && p < 120000)) { bad('Unesite atmosferski pritisak u opsegu 500–1200 hPa.'); return; }
      var r1 = readPoint('a', p);
      if (r1.err) { bad('Stanje 1: ' + r1.err); $('states').innerHTML = ''; $('chart').innerHTML = ''; $('steptbl').innerHTML = ''; kv.innerHTML = ''; big.textContent = '—'; return; }
      var s = r1.state; last.a = s;
      if (!(V > 0)) { bad('Unesite protok vazduha veći od nule.'); }
      var m = V > 0 ? V / 3600 / s.v : 0; // kg s.v./s
      var cols = [{ name: '1', s: s, Vh: m * s.v * 3600 }], pts = [{ s: s, name: '1' }], segs = [], rows = [], noteList = [];
      var tot = { cool: 0, heat: 0, cond: 0, add: 0 }, stopped = false;

      steps.forEach(function (st, i) {
        if (stopped) return;
        var id = 's' + st.id + '-', n = i + 2, P = {}, res, s2, extra = {};
        var num = function (k) { return +$(id + k).value; };
        if (st.kind === 'points') {
          var rp = readPoint(id + 'p', p);
          if (rp.err) { bad('Korak ' + (i + 1) + ': ' + rp.err); stopped = true; return; }
          s2 = rp.state; last[id + 'p'] = s2;
        } else {
          if (st.kind === 'heat' || st.kind === 'cool') P.t2 = num('t2');
          if (st.kind === 'cool') P.tadp = num('tadp');
          if (st.kind === 'steam') P.phi2 = num('phi2') / 100;
          if (st.kind === 'adiab') P.eta = num('eta') / 100;
          if (st.kind === 'mix') {
            var rb = readPoint(id + 'c', p);
            if (rb.err) { bad('Korak ' + (i + 1) + ', struja B: ' + rb.err); stopped = true; return; }
            last[id + 'c'] = rb.state; P.sB = rb.state; P.mA = m; P.mB = num('VB') / 3600 / rb.state.v;
            if (!(P.mB > 0)) { bad('Korak ' + (i + 1) + ': unesite protok struje B.'); stopped = true; return; }
          }
          res = runProcess(st.kind, s, P, p);
          if (res.err) { bad('Korak ' + (i + 1) + ': ' + res.err); stopped = true; return; }
          s2 = res.s2; extra = res.extra;
        }
        var Qs = 0, Ql = 0, Qt = 0, Wkg = 0;
        if (st.kind === 'mix') {
          var bName = 'B' + (i + 1);
          pts.push({ s: extra.B, name: bName, cls: 'hx-pt3' });
          segs.push({ a: s, b: extra.B, cls: 'hx-proc-dash' });
          cols.push({ name: bName, s: extra.B, Vh: P.mB * extra.B.v * 3600 });
          m = P.mA + P.mB;
          noteList.push('Korak ' + (i + 1) + ': udeo struje B u mešavini ' + fmt(extra.share * 100, 1) + ' % (po masi suvog vazduha).');
        } else {
          Qt = m * (s2.h - s.h); Qs = m * (1.006 + 1.86 * s.x) * (s2.t - s.t); Ql = Qt - Qs; Wkg = m * (s2.x - s.x) * 3600;
          segs.push({ a: s, b: s2, cls: 'hx-proc', arrow: true });
          if (Qt < 0) tot.cool += -Qt; else tot.heat += Qt;
          if (Wkg < 0) tot.cond += -Wkg; else tot.add += Wkg;
        }
        if (extra.adp) { pts.push({ s: extra.adp, name: 'ADP', small: true, cls: 'hx-pt3' }); segs.push({ a: s2, b: extra.adp, cls: 'hx-proc-dash' }); noteList.push('Korak ' + (i + 1) + ': bypass faktor hladnjaka ' + fmt(extra.bf, 2) + '.'); }
        if (extra.sat) { segs.push({ a: s2, b: extra.sat, cls: 'hx-proc-dash' }); }
        if (extra.note) noteList.push('Korak ' + (i + 1) + ': ' + extra.note);
        pts.push({ s: s2, name: String(n), cls: 'hx-pt2' });
        cols.push({ name: String(n), s: s2, Vh: m * s2.v * 3600 });
        rows.push({ i: i + 1, name: HX_SHORT[st.kind], mix: st.kind === 'mix', Qs: Qs, Ql: Ql, Qt: Qt, W: Wkg });
        s = s2;
      });
      last.end = s;

      // izlaz
      $('big-lbl').textContent = 'Poslednja tačka (' + cols[cols.length - 1].name + ')';
      big.innerHTML = fmt(s.t, 1) + '<small>°C</small> ' + fmt(s.phi * 100, 0) + '<small>%</small>';
      kv.innerHTML = [
        ['x', fmt(s.x * 1000, 2) + ' g/kg'], ['h', fmt(s.h, 1) + ' kJ/kg'],
        ['Hlađenje ukupno', fmt(tot.cool, 2) + ' kW'], ['Grejanje ukupno', fmt(tot.heat, 2) + ' kW'],
        ['Kondenzat', fmt(tot.cond, 2) + ' kg/h'], ['Dodata voda / para', fmt(tot.add, 2) + ' kg/h'],
        ['ṁ suvog vazduha', fmt(m * 3600, 0) + ' kg/h'], ['V̇ na izlazu', fmt(m * s.v * 3600, 0) + ' m³/h']
      ].map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');

      $('steptbl').innerHTML = '<thead><tr><th>Korak</th><th>Proces</th><th><span class="sym">Q</span><sub>s</sub> [kW]</th><th><span class="sym">Q</span><sub>l</sub> [kW]</th><th><span class="sym">Q</span><sub>uk</sub> [kW]</th><th><span class="sym">W</span> [kg/h]</th></tr></thead><tbody>' +
        (rows.length ? rows.map(function (r) {
          return '<tr><td>' + r.i + ' → ' + (r.i + 1) + '</td><td class="hx-pname">' + r.name + '</td>' +
            (r.mix ? '<td>—</td><td>—</td><td>—</td><td>—</td>' :
              '<td>' + fmt(z(r.Qs), 2) + '</td><td>' + fmt(z(r.Ql), 2) + '</td><td>' + fmt(z(r.Qt), 2) + '</td><td>' + fmt(z(r.W), 2) + '</td>') + '</tr>';
        }).join('') : '<tr><td colspan="6">Nema koraka.</td></tr>') + '</tbody>';
      notes.innerHTML = noteList.map(function (t) { return '<li>' + t + '</li>'; }).join('');

      $('states').innerHTML = stateTable(cols);
      drawHx($('chart'), pts, segs, p);
    }

    bindPoint('a');
    $('p').addEventListener('input', calc);
    $('V').addEventListener('input', calc);
    // primer: klima komora leto — mešanje sa recirkulacijom, hlađenje, dogrevanje
    steps = [
      { id: nextId++, kind: 'mix', d: { t: 26, phi: 50, VB: 3500 } },
      { id: nextId++, kind: 'cool', d: { t2: 14, tadp: 10 } },
      { id: nextId++, kind: 'heat', d: { t2: 18 } }
    ];
    renderSteps();
  }
  // ---- Gas Calc ----------------------------------------------------------------
  // Referentno (standardno) stanje: 15 °C, 1013,25 mbar. Vrednosti su orijentacione i mogu se menjati.
  var GASES = {
    ng:     { label: 'Prirodni gas (H, Srbija)', hd: 33.338, rho: 0.70, mu: 1.10e-5 },
    propan: { label: 'Propan (TNG, gasna faza)', hd: 86.4, rho: 1.87, mu: 0.80e-5 },
    butan:  { label: 'Butan (gasna faza)', hd: 112.4, rho: 2.46, mu: 0.74e-5 },
    custom: { label: 'Ručni unos H_d, ρ, μ' }
  };
  var PN = 101325, TN = 288.15;

  var PE_GAS = { label: 'PE 100 SDR 11 (gasovod)', k: 0.007, pipes: [
    ['d20×3,0', 14.0], ['d25×3,0', 19.0], ['d32×3,0', 26.0], ['d40×3,7', 32.6], ['d50×4,6', 40.8], ['d63×5,8', 51.4],
    ['d75×6,8', 61.4], ['d90×8,2', 73.6], ['d110×10,0', 90.0], ['d125×11,4', 102.2], ['d160×14,6', 130.8],
    ['d180×16,4', 147.2], ['d200×18,2', 163.6], ['d225×20,5', 184.0]] };

  // Delovi instalacije i podrazumevani kriterijumi
  var GAS_SECTIONS = {
    ext: { label: 'Spoljni gasovod do KMRS (1–4 bar)', unit: 'bar', p: 3, wmax: 20,
           mats: { pe: PE_GAS, en10220: PIPE_SETS.en10220, en10255: PIPE_SETS.en10255 },
           note: 'Srednji pritisak: pad pritiska po jednačini za stišljiv gas (izotermno). Kriterijumi su orijentacioni — uskladiti sa uslovima distributera.' },
    int: { label: 'Unutrašnja instalacija posle KMRS (≤ 100 mbar)', unit: 'mbar', p: 22, wmax: 6,
           mats: { en10255: { label: 'Čelične navojne EN 10255 (i Viega Megapress G)', k: 0.045, pipes: PIPE_SETS.en10255.pipes },
                   en10220: PIPE_SETS.en10220,
                   cu: { label: 'Bakarne EN 1057 (i Viega Profipress G)', k: 0.0015, pipes: PIPE_SETS.cu.pipes.slice(1) },
                   mlc: { label: 'Višeslojne PE-X/Al/PE-X za gas', k: 0.007, pipes: PIPE_SETS.mlc.pipes } },
           note: 'Niski pritisak (Pravilnik o unutrašnjim gasnim instalacijama, čl. 84): dozvoljeni ukupni pad 2,6 mbar; pojedini delovi smeju imati veći pad samo ako brzina nije veća od 6 m/s.' }
  };
  // Dozvoljeni padovi pritiska po delovima niskopritisne instalacije (čl. 84), mbar
  var GAS_PARTS = {
    razv:  { label: 'Razvodni vod', dp: 0.3 },
    vod:   { label: 'Vod za gasni aparat', dp: 0.8 },
    ogr:   { label: 'Ogranak i priključni vod aparata', dp: 0.5 },
    total: { label: 'Cela trasa (bez merila)', dp: 1.6 },
    free:  { label: 'Slobodan unos', dp: 1.0 }
  };

  // Izotermni proticaj: p1² − p2² = λ·(L/d)·ρn·wn²·pn·(T/Tn)
  function gasDrop(Vn, d, L, p1abs, T, rhoN, mu, k) {
    var A = Math.PI * d * d / 4, wn = Vn / A;
    var Re = rhoN * wn * d / mu, lam = frictionFactor(Re, k / d);
    var d2 = lam * (L / d) * rhoN * wn * wn * PN * (T / TN);
    var p2sq = p1abs * p1abs - d2;
    var p2 = p2sq > 0 ? Math.sqrt(p2sq) : NaN;
    var w1 = wn * (PN / p1abs) * (T / TN);
    return { wn: wn, w: w1, Re: Re, lam: lam, dp: p1abs - p2, p2: p2 };
  }

  function renderGasCalc(el, menu) {
    var gasOpts = Object.keys(GASES).map(function (k) { return '<option value="' + k + '">' + GASES[k].label + '</option>'; }).join('');
    var secOpts = Object.keys(GAS_SECTIONS).map(function (k) { return '<option value="' + k + '"' + (k === 'int' ? ' selected' : '') + '>' + GAS_SECTIONS[k].label + '</option>'; }).join('');
    var partOpts = Object.keys(GAS_PARTS).map(function (k) { var g = GAS_PARTS[k]; return '<option value="' + k + '"' + (k === 'vod' ? ' selected' : '') + '>' + g.label + (k === 'free' ? '' : ' (' + fmt(g.dp, 1) + ' mbar)') + '</option>'; }).join('');
    el.innerHTML =
      '<div class="tool">' +
      '<div class="doc-meta">Alati · ' + menu.label + '</div>' +
      '<h1>Gas Calc</h1>' +
      '<p class="tl-lede">Potrošnja gasa iz snage uređaja, donje toplotne moći gasa i stepena korisnosti, pa dimenzionisanje gasovoda za spoljni deo do KMRS ili unutrašnju instalaciju posle KMRS. Zapremine su svedene na standardno stanje (15 °C, 1013,25 mbar).</p>' +

      '<div class="gc-formula" aria-label="Formula za potrošnju gasa">' +
        '<div class="gc-eq"><span class="gc-B">B</span> = <span class="gc-frac"><span>Q</span><span>H<sub>d</sub> · η</span></span></div>' +
        '<div class="gc-legend"><span><b>B</b> potrošnja gasa [m³/h]</span><span><b>Q</b> nazivna snaga uređaja [kW]</span><span><b>H<sub>d</sub></b> donja toplotna moć [kWh/m³]</span><span><b>η</b> stepen korisnosti uređaja [–]</span></div>' +
        '<div class="gc-sub" id="tl-gformula"></div>' +
      '</div>' +

      '<div class="tl-grid">' +
      '<section class="tl-panel" aria-label="Potrošnja gasa – ulazni podaci">' +
        '<h2>1 · Potrošnja gasa</h2>' +
        '<div class="tl-pipe-sel"><div class="tl-field"><label for="tl-gas">Gas</label><div class="tl-inp"><select id="tl-gas">' + gasOpts + '</select></div></div>' +
          field('hd', 'H<sub>d</sub>', '', 'MJ/m³') + '</div>' +
        '<div class="tl-row">' + field('rho', 'Gustina ρ<sub>n</sub>', '', 'kg/m³') + field('mu', 'Viskoznost μ', '', 'μPa·s') + '</div>' +
        '<div class="gc-devs"><div class="gc-devhead"><span>Uređaj</span><span>Q [kW]</span><span>η [%]</span><span>kom</span><span></span></div><div id="tl-devs"></div></div>' +
        '<button type="button" class="hx-btn gc-add" id="tl-adddev">+ Dodaj uređaj</button>' +
        '<div class="tl-row">' + field('fi', 'Faktor istovremenosti', 1, '–') + '<div></div></div>' +
        '<p class="tl-note">Q je nazivna (korisna) snaga uređaja. Ako proizvođač daje toplotno opterećenje (snagu na ulazu), unesite η = 100 %.</p>' +
      '</section>' +
      '<section class="tl-panel" aria-label="Potrošnja gasa – rezultat" aria-live="polite">' +
        '<h2>Rezultat</h2>' +
        '<div class="tl-big"><span class="lbl">Merodavna potrošnja gasa B</span><span class="val" id="tl-bval">—</span></div>' +
        '<dl class="tl-kv" id="tl-gkv"></dl>' +
        '<div class="tl-tbl"><table id="tl-devtbl"></table></div>' +
        '<p class="tl-err" id="tl-gerr" hidden></p>' +
      '</section>' +
      '</div>' +

      '<div class="tl-grid gc-part2">' +
      '<section class="tl-panel" aria-label="Dimenzionisanje – ulazni podaci">' +
        '<h2>2 · Dimenzionisanje gasovoda</h2>' +
        '<div class="tl-field"><label for="tl-sec">Deo instalacije</label><div class="tl-inp"><select id="tl-sec">' + secOpts + '</select></div></div>' +
        '<div class="tl-row">' + field('pg', 'Radni pritisak (natpritisak)', 22, 'mbar') + field('tg', 'Temperatura gasa', 15, '°C') + '</div>' +
        '<div class="tl-field"><label class="gc-check"><input type="checkbox" id="tl-useb" checked> Protok iz dela 1 (merodavna potrošnja B)</label></div>' +
        field('vn', 'Protok gasa V̇<sub>n</sub>', 3, 'm³/h') +
        '<div class="tl-row">' + field('L', 'Dužina deonice L', 15, 'm') + field('zeta', 'Dodatak za lokalne otpore', 30, '%') + '</div>' +
        '<div class="tl-pipe-sel"><div class="tl-field"><label for="tl-mat">Materijal cevi</label><div class="tl-inp"><select id="tl-mat"></select></div></div>' + field('k', 'Hrapavost k', '', 'mm') + '</div>' +
        '<div class="tl-field" id="f-part"><label for="tl-part">Deo niskopritisne instalacije (čl. 84)</label><div class="tl-inp"><select id="tl-part">' + partOpts + '</select></div></div>' +
        '<div class="tl-row">' + field('wmax', 'w max', 6, 'm/s') + field('dpmax', 'Δp max na deonici', 0.8, 'mbar') + '</div>' +
        '<p class="tl-note" id="tl-secnote"></p>' +
      '</section>' +
      '<section class="tl-panel" aria-label="Dimenzionisanje – rezultat" aria-live="polite">' +
        '<h2>Predlog dimenzije</h2>' +
        '<div class="tl-big"><span class="lbl" id="tl-dlbl">Predlog</span><span class="val" id="tl-dval">—</span></div>' +
        '<dl class="tl-kv" id="tl-dkv"></dl>' +
        '<div class="tl-formula" id="tl-dformula"></div>' +
      '</section>' +
      '</div>' +
      '<section class="tl-panel gc-part2" aria-label="Rezultat po dimenzijama"><h2 id="tl-gtitle">Brzina i pad pritiska po dimenzijama</h2>' +
        '<div class="tl-tbl"><table><thead><tr><th>Dimenzija</th><th><span class="sym">d</span><sub>u</sub> [mm]</th><th><span class="sym">w</span> [m/s]</th><th><span class="sym">R</span> [Pa/m]</th><th>Δ<span class="sym">p</span> [mbar]</th><th>Pritisak na kraju</th><th></th></tr></thead><tbody id="tl-gpipes"></tbody></table></div>' +
        '<p class="tl-note">Pad pritiska po jednačini izotermnog proticanja p₁² − p₂² = λ·(L<sub>e</sub>/d)·ρ<sub>n</sub>·w<sub>n</sub>²·p<sub>n</sub>·(T/T<sub>n</sub>), faktor trenja po Colebrook-White-u; za niski pritisak ovo se svodi na Darcy–Weisbach za nestišljiv gas. w je stvarna brzina pri radnom pritisku, L<sub>e</sub> = L·(1 + dodatak). Zeleno je najmanja dimenzija koja zadovoljava oba kriterijuma. Oznaka „uslovno (čl. 84)” znači da je pad na deonici veći od dozvoljenog za taj deo, ali je brzina ≤ 6 m/s i pad ≤ 2,6 mbar, što Pravilnik dozvoljava uz proveru ukupnog pada cele trase.</p>' +
      '</section>' +
      '</div>';

    function $(id) { return el.querySelector('#tl-' + id); }
    var devs = [
      { name: 'Kondenzacioni kotao', q: 24, eta: 98, n: 1 },
      { name: 'Štednjak', q: 8, eta: 100, n: 1 }
    ];
    var lastGas = null, lastSec = null, lastMat = null, lastPart = null, Bm = 0;

    function renderDevs() {
      $('devs').innerHTML = devs.map(function (d, i) {
        return '<div class="gc-dev" data-i="' + i + '">' +
          '<div class="tl-inp"><input type="text" data-f="name" value="' + d.name.replace(/"/g, '&quot;') + '" aria-label="Naziv uređaja ' + (i + 1) + '"></div>' +
          '<div class="tl-inp"><input type="number" step="any" inputmode="decimal" data-f="q" value="' + d.q + '" aria-label="Snaga uređaja ' + (i + 1) + ' u kW"></div>' +
          '<div class="tl-inp"><input type="number" step="any" inputmode="decimal" data-f="eta" value="' + d.eta + '" aria-label="Stepen korisnosti uređaja ' + (i + 1) + ' u %"></div>' +
          '<div class="tl-inp"><input type="number" step="1" min="1" inputmode="numeric" data-f="n" value="' + d.n + '" aria-label="Broj komada uređaja ' + (i + 1) + '"></div>' +
          '<button type="button" class="hx-icon" data-del="' + i + '" aria-label="Ukloni uređaj ' + (i + 1) + '"' + (devs.length === 1 ? ' disabled' : '') + '>×</button></div>';
      }).join('');
    }
    $('devs').addEventListener('input', function (e) {
      var row = e.target.closest('.gc-dev'); if (!row) return;
      var d = devs[+row.getAttribute('data-i')], f = e.target.getAttribute('data-f');
      d[f] = f === 'name' ? e.target.value : +e.target.value;
      calc();
    });
    $('devs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-del]'); if (!b || devs.length === 1) return;
      devs.splice(+b.getAttribute('data-del'), 1); renderDevs(); calc();
    });
    $('adddev').addEventListener('click', function () { devs.push({ name: 'Uređaj ' + (devs.length + 1), q: 20, eta: 92, n: 1 }); renderDevs(); calc(); });

    function syncSection() {
      var sk = $('sec').value, sec = GAS_SECTIONS[sk];
      if (sk !== lastSec) {
        lastSec = sk;
        el.querySelector('#f-pg .u').textContent = sec.unit;
        $('pg').value = sec.p; $('wmax').value = sec.wmax;
        $('mat').innerHTML = Object.keys(sec.mats).map(function (k) { return '<option value="' + k + '">' + sec.mats[k].label + '</option>'; }).join('');
        lastMat = null; lastPart = null;
        el.querySelector('#f-part').hidden = sk !== 'int';
        if (sk === 'ext') $('dpmax').value = 150;
        $('secnote').textContent = sec.note;
      }
      var mk = $('mat').value;
      if (mk !== lastMat) { $('k').value = sec.mats[mk].k; lastMat = mk; }
      if (sk === 'int') {
        var pk = $('part').value;
        if (pk !== lastPart) { if (pk !== 'free') $('dpmax').value = GAS_PARTS[pk].dp; lastPart = pk; }
      }
      return sec;
    }

    function calc() {
      // --- deo 1 ---
      var gk = $('gas').value, g = GASES[gk];
      var manual = gk === 'custom';
      ['hd', 'rho', 'mu'].forEach(function (id) { $(id).readOnly = !manual; });
      if (gk !== lastGas) { if (!manual) { $('hd').value = g.hd; $('rho').value = g.rho; $('mu').value = +(g.mu * 1e6).toFixed(2); } lastGas = gk; }
      var hdMJ = +$('hd').value, hd = hdMJ / 3.6, rhoN = +$('rho').value, mu = +$('mu').value / 1e6, fi = +$('fi').value;
      var gerr = $('gerr'); gerr.hidden = true;
      function gbad(m) { gerr.textContent = m; gerr.hidden = false; $('bval').textContent = '—'; $('gkv').innerHTML = ''; $('devtbl').innerHTML = ''; $('gformula').textContent = ''; Bm = NaN; }
      var ok = hd > 0 && rhoN > 0 && mu > 0 && fi > 0 && fi <= 1;
      if (!ok) gbad('Proverite H_d, ρ, μ i faktor istovremenosti (0 < f ≤ 1).');
      else {
        var rows = [], sumB = 0, sumQ = 0, sumQin = 0, bad = null;
        devs.forEach(function (d, i) {
          if (!(d.q > 0 && d.eta > 0 && d.eta <= 110 && d.n >= 1)) { bad = bad || ('Uređaj ' + (i + 1) + ': unesite snagu > 0, η između 0 i 110 % i broj komada ≥ 1.'); return; }
          var qin = d.q / (d.eta / 100), b = qin / hd;
          rows.push({ name: d.name, q: d.q, eta: d.eta, n: d.n, qin: qin * d.n, b: b * d.n });
          sumB += b * d.n; sumQ += d.q * d.n; sumQin += qin * d.n;
        });
        if (bad) gbad(bad);
        else {
          Bm = sumB * fi;
          $('bval').innerHTML = fmt(Bm, 3) + '<small>m³/h</small>';
          var d0 = devs[0];
          $('gformula').innerHTML = 'Za „' + d0.name.replace(/</g, '&lt;') + '”: B = ' + fmt(d0.q, 1) + ' kW / (' + fmt(hd, 3) + ' kWh/m³ · ' + fmt(d0.eta / 100, 3) + ') = <b>' + fmt(d0.q / (d0.eta / 100) / hd, 3) + ' m³/h</b>' +
            (devs.length > 1 || d0.n > 1 || fi !== 1 ? ' &nbsp;·&nbsp; ukupno B = f · ΣB<sub>i</sub> = ' + fmt(fi, 2) + ' · ' + fmt(sumB, 3) + ' = <b>' + fmt(Bm, 3) + ' m³/h</b>' : '');
          $('gkv').innerHTML = [
            ['ΣQ nazivna', fmt(sumQ, 1) + ' kW'], ['ΣQ opterećenje', fmt(sumQin, 1) + ' kW'],
            ['ΣB<sub>i</sub>', fmt(sumB, 3) + ' m³/h'], ['f', fmt(fi, 2)],
            ['B (maseno)', fmt(Bm * rhoN, 2) + ' kg/h'], ['H<sub>d</sub>', fmt(hd, 3) + ' kWh/m³']
          ].map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');
          $('devtbl').innerHTML = '<thead><tr><th>Uređaj</th><th><span class="sym">Q</span> [kW]</th><th><span class="sym">η</span> [%]</th><th>kom</th><th><span class="sym">B</span> [m³/h]</th></tr></thead><tbody>' +
            rows.map(function (r) { return '<tr><td>' + r.name.replace(/</g, '&lt;') + '</td><td>' + fmt(r.q, 1) + '</td><td>' + fmt(r.eta, 0) + '</td><td>' + r.n + '</td><td>' + fmt(r.b, 3) + '</td></tr>'; }).join('') + '</tbody>';
        }
      }

      // --- deo 2 ---
      var sec = syncSection();
      var useB = $('useb').checked;
      $('vn').readOnly = useB;
      if (useB && isFinite(Bm)) $('vn').value = +Bm.toFixed(3);
      var Vh = +$('vn').value, pIn = +$('pg').value, T = +$('tg').value + 273.15, L = +$('L').value, add = +$('zeta').value / 100;
      var k = +$('k').value / 1000, wMax = +$('wmax').value, dpMax = +$('dpmax').value;
      var tb = $('gpipes'), dkv = $('dkv'), dv = $('dval'), fx = $('dformula');
      function dbad(m) { tb.innerHTML = ''; dkv.innerHTML = '<p class="tl-err">' + m + '</p>'; dv.textContent = '—'; fx.textContent = ''; }
      if (!(Vh > 0)) return dbad('Unesite protok gasa veći od nule.');
      if (!(pIn >= 0 && L > 0 && add >= 0 && k >= 0 && wMax > 0 && dpMax > 0 && T > 0)) return dbad('Proverite pritisak, dužinu, dodatak, hrapavost i kriterijume.');
      var pg = sec.unit === 'bar' ? pIn * 1e5 : pIn * 100;
      if (lastSec === 'int' && pg > 10000) return dbad('Unutrašnja instalacija posle KMRS je ovde definisana za niski pritisak do 100 mbar.');
      if (lastSec === 'ext' && (pg < 1e5 || pg > 4e5)) return dbad('Za spoljni gasovod do KMRS unesite pritisak između 1 i 4 bar.');
      var p1 = pg + PN, Le = L * (1 + add), Vn = Vh / 3600;
      var mat = sec.mats[$('mat').value];
      var best = null, bestR = null;
      var rowsH = mat.pipes.map(function (p, i) {
        var d = p[1] / 1000, r = gasDrop(Vn, d, Le, p1, T, rhoN, mu, k);
        var dpm = r.dp / 100, R = r.dp / Le;
        var okW = r.w <= wMax, okP = isFinite(dpm) && dpm <= dpMax;
        // niski pritisak: veći pad dozvoljen ako w ≤ 6 m/s (čl. 84) – prikazujemo kao napomenu
        var cond = lastSec === 'int' && !okP && isFinite(dpm) && r.w <= 6 && dpm <= 2.6;
        var cls = !isFinite(dpm) ? 'hi' : !okW ? 'hi' : !okP ? (cond ? 'cond' : 'rhi') : 'ok';
        if (cls === 'ok' && best === null) { best = i; bestR = { p: p, r: r, dpm: dpm, R: R }; }
        var tag = cls === 'ok' ? '<span class="tl-pill ok">zadovoljava</span>' : !isFinite(dpm) ? '<span class="tl-pill hi">Δp &gt; p₁</span>' : !okW ? '<span class="tl-pill hi">w visoka</span>' : cls === 'cond' ? '<span class="tl-pill lo">uslovno (čl. 84)</span>' : '<span class="tl-pill hi">Δp &gt; ' + fmt(dpMax, dpMax < 10 ? 1 : 0) + '</span>';
        return '<tr data-i="' + i + '"><td>' + p[0] + '</td><td>' + fmt(p[1], 1) + '</td><td' + (!okW ? ' class="tl-bad"' : '') + '>' + fmt(r.w, 2) + '</td><td>' + fmt(R, R < 10 ? 2 : 1) + '</td><td' + (!okP ? ' class="tl-bad"' : '') + '>' + (isFinite(dpm) ? fmt(dpm, dpm < 10 ? 2 : 0) : '—') + '</td><td>' + (isFinite(dpm) ? (sec.unit === 'bar' ? fmt((r.p2 - PN) / 1e5, 3) + ' bar' : fmt((r.p2 - PN) / 100, 2) + ' mbar') : '—') + '</td><td>' + tag + '</td></tr>';
      });
      tb.innerHTML = rowsH.join('');
      if (best !== null) tb.querySelector('[data-i="' + best + '"]').classList.add('best');
      $('dlbl').textContent = best !== null ? 'Najmanja dimenzija koja zadovoljava' : 'Nijedna dimenzija ne zadovoljava kriterijume';
      if (bestR) {
        dv.innerHTML = bestR.p[0] + ' <small>' + fmt(bestR.r.w, 2) + ' m/s · ' + fmt(bestR.dpm, bestR.dpm < 10 ? 2 : 0) + ' mbar</small>';
        var p2over = (bestR.r.p2 - PN);
        dkv.innerHTML = [
          ['V̇<sub>n</sub>', fmt(Vh, 3) + ' m³/h'], ['V̇ pri p, T', fmt(Vh * PN / p1 * T / TN, 3) + ' m³/h'],
          ['L<sub>e</sub>', fmt(Le, 1) + ' m'], ['Re', fmt(bestR.r.Re, 0)],
          ['λ', fmt(bestR.r.lam, 4)], ['p na kraju', sec.unit === 'bar' ? fmt(p2over / 1e5, 3) + ' bar' : fmt(p2over / 100, 2) + ' mbar']
        ].map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');
        fx.innerHTML = 'Δp = p₁ − √(p₁² − λ·L<sub>e</sub>/d·ρ<sub>n</sub>·w<sub>n</sub>²·p<sub>n</sub>·T/T<sub>n</sub>) = ' + fmt(bestR.dpm, 3) + ' mbar &nbsp;(d = ' + fmt(bestR.p[1], 1) + ' mm, λ = ' + fmt(bestR.r.lam, 4) + ', w<sub>n</sub> = ' + fmt(bestR.r.wn, 2) + ' m/s)';
      } else { dv.textContent = '—'; dkv.innerHTML = ''; fx.textContent = 'Povećajte dozvoljeni pad pritiska ili izaberite drugi materijal / veći asortiman.'; }
    }

    renderDevs();
    ['gas', 'hd', 'rho', 'mu', 'fi', 'sec', 'pg', 'tg', 'useb', 'vn', 'L', 'zeta', 'mat', 'k', 'part', 'wmax', 'dpmax'].forEach(function (id) {
      $(id).addEventListener(id === 'useb' ? 'change' : 'input', calc);
    });
    calc();
  }
  // ---- Safety Valve --------------------------------------------------------
  // Sigurnosni ventil zatvorenog sistema toplovodnog grejanja (t ≤ 105 °C):
  //   SRPS EN 12828 – projektovanje sistema za grejanje vodom (pritisak otvaranja, ekspanzija, Aneks D)
  //   SRPS EN ISO 4126-1 / -7 – sigurnosni ventili, proračun kapaciteta ispuštanja (para)
  //   Tabela za membranske ventile oznake „H” (p_sv ≤ 3 bar, Q ≤ 900 kW) prema DIN 4751-2.

  // Zasićena vodena para: [p bar aps., t_s °C, r kJ/kg, v'' m³/kg]
  var STEAM = [[1.0, 99.6, 2257.5, 1.694], [1.5, 111.4, 2226.5, 1.159], [2, 120.2, 2201.6, 0.8857], [2.5, 127.4, 2181.2, 0.7187],
               [3, 133.5, 2163.5, 0.6058], [4, 143.6, 2133.4, 0.4624], [5, 151.8, 2107.4, 0.3748], [6, 158.8, 2085.8, 0.3156],
               [7, 165.0, 2065.8, 0.2728], [8, 170.4, 2047.7, 0.2403], [10, 179.9, 2014.6, 0.1944], [12, 188.0, 1985.4, 0.1633],
               [14, 195.0, 1959.0, 0.1408], [16, 201.4, 1933.6, 0.1237]];
  function steamAt(pAbs) {
    var T = STEAM, n = T.length;
    if (pAbs <= T[0][0]) return { t: T[0][1], r: T[0][2], v: T[0][3] * T[0][0] / pAbs };
    for (var i = 0; i < n - 1; i++) {
      var a = T[i], b = T[i + 1];
      if (pAbs <= b[0]) {
        var f = (pAbs - a[0]) / (b[0] - a[0]);
        // v'' interpolacija u log-log (≈ v ~ 1/p)
        var lv = Math.log(a[3]) + (Math.log(b[3]) - Math.log(a[3])) * (Math.log(pAbs) - Math.log(a[0])) / (Math.log(b[0]) - Math.log(a[0]));
        return { t: a[1] + f * (b[1] - a[1]), r: a[2] + f * (b[2] - a[2]), v: Math.exp(lv) };
      }
    }
    return null;
  }
  // Pritisak isparavanja (natpritisak, bar) na temperaturi t; 0 ispod 100 °C
  function evapGauge(t) {
    var P0 = 1.01325;
    if (t <= 100) return 0;
    for (var i = 0; i < STEAM.length - 1; i++) {
      var a = STEAM[i], b = STEAM[i + 1];
      if (t <= b[1]) return Math.max(0, a[0] + (b[0] - a[0]) * (t - a[1]) / (b[1] - a[1]) - P0);
    }
    return NaN;
  }
  // Standardni pritisci otvaranja (bar)
  var SV_SET = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 10];
  // Membranski ventili oznake H (DIN 4751-2): [ulaz DN, izlaz DN, Q max kW]
  var SV_H = [[15, 20, 50], [20, 25, 100], [25, 32, 200], [32, 40, 350], [40, 50, 600], [50, 65, 900]];
  var SV_DN = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150];

  function renderSafetyValve(el, menu) {
    var setOpts = '<option value="auto">Automatski (najveći standardni ≤ p_sv,max)</option>' +
      SV_SET.map(function (v) { return '<option value="' + v + '">' + fmt(v, 1) + ' bar</option>'; }).join('');
    el.innerHTML =
      '<div class="tool">' +
      '<div class="doc-meta">Alati · ' + menu.label + '</div>' +
      '<h1>Safety Valve</h1>' +
      '<p class="tl-lede">Pritisak otvaranja i dimenzija sigurnosnog ventila zatvorenog sistema toplovodnog grejanja (t<sub>max</sub> ≤ 105 °C) prema <b>SRPS EN 12828</b>, sa proračunom kapaciteta ispuštanja prema <b>SRPS EN ISO 4126-7</b>.</p>' +
      '<div class="tl-grid">' +
      '<section class="tl-panel" aria-label="Ulazni podaci">' +
        '<h2>1 · Pritisak otvaranja</h2>' +
        field('ps', 'Najveći dozvoljeni radni pritisak najslabije komponente PS', 3, 'bar') +
        field('dh', 'Visina ventila iznad najslabije komponente Δh (− ako je ispod)', 0, 'm') +
        '<div class="tl-row">' + field('hst', 'Statička visina iznad ventila H<sub>st</sub>', 12, 'm') + field('tmax', 'Najviša temperatura t<sub>max</sub>', 90, '°C') + '</div>' +
        '<div class="tl-field"><label for="tl-set">Izabrani pritisak otvaranja p<sub>sv</sub></label><div class="tl-inp"><select id="tl-set">' + setOpts + '</select></div></div>' +
        '<p class="tl-note">PS je najmanji od dozvoljenih radnih pritisaka kotla, izmenjivača, grejnih tela, armature i ekspanzione posude (sa tablice/kataloga). Ako je najslabija komponenta ispod ventila, na njoj je pritisak veći za ρ·g·Δh.</p>' +
        '<h2>2 · Dimenzija ventila</h2>' +
        '<div class="tl-row">' + field('q', 'Nazivna snaga generatora toplote Q', 250, 'kW') + field('n', 'Broj ventila na generatoru', 1, 'kom') + '</div>' +
        '<div class="tl-seg" role="group" aria-label="Metod dimenzionisanja">' +
          '<button type="button" id="tl-m-h" aria-pressed="true">Ventil oznake H (tabela)</button>' +
          '<button type="button" id="tl-m-iso" aria-pressed="false">EN ISO 4126-7 (K<sub>dr</sub>)</button>' +
        '</div>' +
        '<div class="tl-row" id="tl-iso-in" hidden>' + field('kdr', 'Koef. ispuštanja K<sub>dr</sub> (proizvođač)', 0.45, '–') + field('over', 'Prekoračenje pritiska', 10, '%') + '</div>' +
        '<p class="tl-note" id="tl-mnote"></p>' +
      '</section>' +
      '<section class="tl-panel" aria-label="Rezultati" aria-live="polite">' +
        '<h2>Pritisak otvaranja</h2>' +
        '<div class="tl-big"><span class="lbl">Pritisak otvaranja p<sub>sv</sub></span><span class="val" id="tl-pval">—</span></div>' +
        '<dl class="tl-kv" id="tl-pkv"></dl>' +
        '<div class="tl-formula wrap" id="tl-pformula"></div>' +
        '<p class="tl-err" id="tl-perr" hidden></p>' +
        '<h2>Dimenzija sigurnosnog ventila</h2>' +
        '<div class="tl-big"><span class="lbl" id="tl-dlbl">Ulaz / izlaz ventila</span><span class="val" id="tl-dval">—</span></div>' +
        '<dl class="tl-kv" id="tl-dkv"></dl>' +
        '<p class="tl-err" id="tl-derr" hidden></p>' +
        '<div class="tl-formula wrap" id="tl-dformula"></div>' +
        '<div class="tl-tbl"><table id="tl-htbl"></table></div>' +
      '</section>' +
      '</div>' +
      '<section class="tl-panel" aria-label="Standard i zahtevi"><h2>Standard i zahtevi za ugradnju</h2>' +
        '<ul class="tl-note sv-std">' +
        '<li><b>SRPS EN 12828</b> — Sistemi za grejanje u zgradama — Projektovanje sistema za grejanje vodom (preuzet EN 12828:2012+A1:2014). Zahteva da svaki generator toplote u zatvorenom sistemu ima najmanje jedan sigurnosni ventil koji sprečava da pritisak pređe najveći dozvoljeni radni pritisak sistema; određuje pritisak otvaranja i vezu sa ekspanzionom posudom (Aneks D: p<sub>0</sub> ≥ p<sub>st</sub> + p<sub>D</sub> + 0,2 bar; p<sub>e</sub> ≤ p<sub>sv</sub> − 0,5 bar za p<sub>sv</sub> ≤ 5 bar, odnosno p<sub>e</sub> ≤ 0,9·p<sub>sv</sub> za p<sub>sv</sub> &gt; 5 bar).</li>' +
        '<li><b>SRPS EN ISO 4126-1</b> — Sigurnosni uređaji za zaštitu od prekomernog pritiska — Sigurnosni ventili; <b>SRPS EN ISO 4126-7</b> — Zajednički podaci (proračun kapaciteta: Q<sub>m</sub> = 0,2883·C·A·K<sub>dr</sub>·√(p<sub>0</sub>/v<sub>0</sub>)). Ventil se dimenzioniše da ispusti paru u količini ekvivalentnoj nazivnoj snazi generatora pri p<sub>sv</sub> + prekoračenje (10 %).</li>' +
        '<li>Tabela za membranske ventile oznake <b>H</b> (p<sub>sv</sub> ≤ 3 bar, Q ≤ 900 kW) potiče iz DIN 4751-2; zamenjen je standardom EN 12828, ali se tabela i dalje koristi u katalozima proizvođača.</li>' +
        '<li>Oprema pod pritiskom: Pravilnik o tehničkim zahtevima za projektovanje, izradu i ocenjivanje usaglašenosti opreme pod pritiskom (Sl. glasnik RS 87/2011) — ventil mora imati oznaku usaglašenosti. Proveriti važeća izdanja standarda i propisa.</li>' +
        '<li>Ventil se ugrađuje na polazni vod neposredno uz generator toplote (na najvišem mestu ili na polaznom vodu blizu kotla), <b>bez zaporne armature</b> između generatora i ventila; ulazni vod najmanje DN 15 i ne manji od ulaza ventila. Ispusni vod najmanje dimenzije izlaza ventila, sa padom, bez zatvaranja, sa vidljivim i bezbednim ispustom (levak/odvod); ako je duži od 2 m ili ima više od 2 kolena, povećava se za jednu dimenziju.</li>' +
        '</ul>' +
      '</section>' +
      '</div>';

    function $(id) { return el.querySelector('#tl-' + id); }
    var mode = 'h';
    function setMode(m) {
      mode = m;
      $('m-h').setAttribute('aria-pressed', String(m === 'h'));
      $('m-iso').setAttribute('aria-pressed', String(m === 'iso'));
      $('iso-in').hidden = m !== 'iso';
      $('mnote').innerHTML = m === 'h'
        ? 'Membranski sigurnosni ventili oznake H za grejanje: pritisak otvaranja do 3 bar i snaga po ventilu do 900 kW. Za veće pritiske ili snage koristite proračun po EN ISO 4126-7.'
        : 'K<sub>dr</sub> je sertifikovani (redukovani) koeficijent ispuštanja za paru iz tehničkog lista ventila (tipično 0,4–0,5 za membranske i 0,6–0,8 za ventile sa punim hodom). Rezultat je potreban protočni presek; ventil se bira iz kataloga sa d<sub>0</sub> ≥ d<sub>0,min</sub>.';
      calc();
    }
    $('m-h').onclick = function () { setMode('h'); };
    $('m-iso').onclick = function () { setMode('iso'); };

    function kvHtml(rows) { return rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join(''); }

    function calc() {
      var PS = +$('ps').value, dh = +$('dh').value, hst = +$('hst').value, tmax = +$('tmax').value;
      var Q = +$('q').value, n = Math.round(+$('n').value), kdr = +$('kdr').value, over = +$('over').value / 100;
      var perr = $('perr'), pval = $('pval'), pkv = $('pkv'), pfx = $('pformula');
      var dval = $('dval'), dkv = $('dkv'), dfx = $('dformula'), htbl = $('htbl');
      function badP(msg) { pval.textContent = '—'; pkv.innerHTML = ''; pfx.textContent = ''; perr.hidden = false; perr.textContent = msg; badD(''); }
      var derr = $('derr');
      function badD(msg) { dval.textContent = '—'; dkv.innerHTML = ''; derr.hidden = !msg; derr.textContent = msg; dfx.textContent = ''; htbl.innerHTML = ''; }
      perr.hidden = true; derr.hidden = true;
      if (!(PS > 0)) return badP('Unesite PS veći od nule.');
      if (!(hst >= 0)) return badP('Statička visina ne može biti negativna.');
      if (!(tmax > 0 && tmax <= 110)) return badP('Alat važi za toplovodne sisteme do 105 °C (EN 12828: t ≤ 105 °C, graničnik 110 °C).');

      var rho = waterRho(Math.min(tmax, 100)), g = 9.81;
      var dpDh = rho * g * dh / 1e5;               // bar
      var psvMax = PS - dpDh;
      var pst = rho * g * hst / 1e5;               // statički pritisak na ventilu (bar)
      var pD = evapGauge(tmax);
      var p0 = pst + pD + 0.2;                     // min. početni pritisak (EN 12828, Aneks D)
      var sel = $('set').value, psv;
      if (sel === 'auto') {
        psv = null;
        for (var i = SV_SET.length - 1; i >= 0; i--) if (SV_SET[i] <= psvMax + 1e-9) { psv = SV_SET[i]; break; }
        if (psv === null) return badP('p_sv,max = ' + fmt(psvMax, 2) + ' bar je manji od najmanjeg standardnog pritiska otvaranja. Smanjite Δh ili izaberite komponente većeg PS.');
      } else psv = +sel;
      var dpc = psv <= 5 ? 0.5 : 0.1 * psv;
      var pe = psv - dpc;                          // najveći krajnji pritisak ekspanzione posude
      var warn = [];
      if (psv > psvMax + 1e-9) warn.push('Izabrani p_sv = ' + fmt(psv, 1) + ' bar je veći od dozvoljenog p_sv,max = ' + fmt(psvMax, 2) + ' bar — najslabija komponenta nije zaštićena.');
      if (pe - p0 < 0.3) warn.push('Premalo prostora za ekspanziju: p_e,max − p_0 = ' + fmt(pe - p0, 2) + ' bar. Povećajte p_sv (uz komponente većeg PS) ili smanjite statičku visinu iznad ventila (ventil/posudu postaviti više).');

      pval.innerHTML = fmt(psv, 1) + '<small>bar</small>';
      pkv.innerHTML = kvHtml([
        ['p<sub>sv,max</sub>', fmt(psvMax, 2) + ' bar'], ['ρ·g·Δh', fmt(dpDh, 3) + ' bar'],
        ['p<sub>st</sub>', fmt(pst, 2) + ' bar'], ['p<sub>D</sub>', fmt(pD, 2) + ' bar'],
        ['p<sub>0,min</sub>', fmt(p0, 2) + ' bar'], ['p<sub>e,max</sub>', fmt(pe, 2) + ' bar'],
        ['Δp zatvaranja', fmt(dpc, 2) + ' bar'], ['p<sub>e</sub> − p<sub>0</sub>', fmt(pe - p0, 2) + ' bar']
      ]);
      pfx.innerHTML = 'p<sub>sv</sub> ≤ PS − ρ·g·Δh = ' + fmt(PS, 2) + ' − ' + fmt(dpDh, 3) + ' = ' + fmt(psvMax, 2) + ' bar &nbsp;→&nbsp; p<sub>sv</sub> = ' + fmt(psv, 1) + ' bar;&nbsp; p<sub>0</sub> ≥ p<sub>st</sub> + p<sub>D</sub> + 0,2 = ' + fmt(p0, 2) + ' bar;&nbsp; p<sub>e</sub> ≤ p<sub>sv</sub> − ' + fmt(dpc, 2) + ' = ' + fmt(pe, 2) + ' bar (natpritisci).';
      if (warn.length) { perr.hidden = false; perr.textContent = warn.join(' '); }

      // ---- dimenzija
      if (!(Q > 0)) return badD('Unesite snagu generatora veću od nule.');
      if (!(n >= 1)) return badD('Broj ventila mora biti najmanje 1.');
      var Qv = Q / n;
      if (mode === 'h') {
        $('dlbl').textContent = 'Ulaz / izlaz ventila oznake H';
        htbl.innerHTML = '<thead><tr><th>Ulaz</th><th>Izlaz</th><th>Q max [kW]</th><th></th></tr></thead><tbody>' +
          SV_H.map(function (h, i) { return '<tr data-i="' + i + '"><td>DN ' + h[0] + '</td><td>DN ' + h[1] + '</td><td>' + fmt(h[2], 0) + '</td><td>' + (Qv <= h[2] ? '<span class="tl-pill ok">zadovoljava</span>' : '<span class="tl-pill hi">premalo</span>') + '</td></tr>'; }).join('') + '</tbody>';
        if (psv > 3) { dval.textContent = '—'; dkv.innerHTML = ''; dfx.textContent = ''; derr.hidden = false; derr.textContent = 'Ventili oznake H važe do p_sv = 3 bar. Za p_sv = ' + fmt(psv, 1) + ' bar koristite proračun po EN ISO 4126-7.'; return; }
        var hit = null;
        for (var j = 0; j < SV_H.length; j++) if (Qv <= SV_H[j][2]) { hit = j; break; }
        if (hit === null) { dval.textContent = '—'; dkv.innerHTML = ''; dfx.textContent = ''; derr.hidden = false; derr.textContent = 'Snaga po ventilu ' + fmt(Qv, 0) + ' kW je veća od 900 kW. Povećajte broj ventila ili koristite proračun po EN ISO 4126-7.'; return; }
        htbl.querySelector('[data-i="' + hit + '"]').classList.add('best');
        var h = SV_H[hit];
        dval.innerHTML = (n > 1 ? n + ' × ' : '') + 'DN ' + h[0] + ' / DN ' + h[1] + '<small>' + fmt(psv, 1) + ' bar</small>';
        dkv.innerHTML = kvHtml([
          ['Snaga po ventilu', fmt(Qv, 1) + ' kW'], ['Kapacitet DN ' + h[0], fmt(h[2], 0) + ' kW'],
          ['Ulazni vod', '≥ DN ' + h[0]], ['Ispusni vod', '≥ DN ' + h[1] + ' (≤ 2 m, ≤ 2 kolena)']
        ]);
        dfx.innerHTML = 'Izbor po tabeli za ventile oznake H: najmanji ulaz za koji je Q/n = ' + fmt(Qv, 1) + ' kW ≤ Q<sub>max</sub>.';
        return;
      }
      // EN ISO 4126-7: suvozasićena para, k = 1,3
      if (!(kdr > 0 && kdr <= 1)) return badD('K_dr mora biti između 0 i 1.');
      if (!(over >= 0 && over <= 0.2)) return badD('Prekoračenje pritiska unesite u opsegu 0–20 %.');
      var pAbs = psv * (1 + over) + 1.01325;
      var st = steamAt(pAbs);
      if (!st) return badD('Pritisak van opsega tablice pare (do 16 bar aps.).');
      var k = 1.3, C = 3.948 * Math.sqrt(k * Math.pow(2 / (k + 1), (k + 1) / (k - 1)));
      var qm = Qv * 3600 / st.r;                         // kg/h
      var A = qm / (0.2883 * C * kdr * Math.sqrt(pAbs / st.v)); // mm²
      var d0 = Math.sqrt(4 * A / Math.PI);
      var dnMin = null;
      for (var m = 0; m < SV_DN.length; m++) if (SV_DN[m] >= d0) { dnMin = SV_DN[m]; break; }
      $('dlbl').textContent = 'Potreban prečnik sedišta d₀,min';
      dval.innerHTML = fmt(d0, 1) + '<small>mm' + (n > 1 ? ' · ' + n + ' ventila' : '') + '</small>';
      dkv.innerHTML = kvHtml([
        ['Snaga po ventilu', fmt(Qv, 1) + ' kW'], ['p<sub>0</sub> (aps.)', fmt(pAbs, 3) + ' bar'],
        ['t<sub>s</sub>', fmt(st.t, 1) + ' °C'], ['r', fmt(st.r, 1) + ' kJ/kg'],
        ['v″', fmt(st.v, 4) + ' m³/kg'], ['C (k = 1,3)', fmt(C, 3)],
        ['Q<sub>m</sub>', fmt(qm, 1) + ' kg/h'], ['A<sub>min</sub>', fmt(A, 1) + ' mm²'],
        ['Ulaz ventila', dnMin ? 'orijentaciono ≥ DN ' + dnMin : '> DN 150'], ['K<sub>dr</sub>', fmt(kdr, 2)]
      ]);
      dfx.innerHTML = 'Q<sub>m</sub> = Q/r = ' + fmt(Qv, 1) + '·3600 / ' + fmt(st.r, 1) + ' = ' + fmt(qm, 1) + ' kg/h;&nbsp; A = Q<sub>m</sub> / (0,2883·C·K<sub>dr</sub>·√(p<sub>0</sub>/v<sub>0</sub>)) = ' + fmt(A, 1) + ' mm²;&nbsp; d<sub>0</sub> = √(4A/π) = ' + fmt(d0, 1) + ' mm. Izaberite ventil iz kataloga sa d<sub>0</sub> ≥ ' + fmt(d0, 1) + ' mm (ili A<sub>0</sub> ≥ ' + fmt(A, 0) + ' mm²), sa pritiskom otvaranja ' + fmt(psv, 1) + ' bar.';
      htbl.innerHTML = '';
    }

    ['ps', 'dh', 'hst', 'tmax', 'set', 'q', 'n', 'kdr', 'over'].forEach(function (id) { $(id).addEventListener('input', calc); });
    setMode('h');
  }
})();

#!/usr/bin/env python3
"""Layout-aware converter: ASHRAE Handbook PDF chapter -> readable Markdown."""
import re, sys, os, json, statistics, subprocess
from collections import Counter
import pdfplumber

PDF = '/mnt/user-data/uploads/knjige/2021 ASHRAE Fundamentals Handbook SI.pdf'

# ---------------------------------------------------------------- symbols
SYM = {
 0x41:'Α',0x42:'Β',0x43:'Χ',0x44:'Δ',0x45:'Ε',0x46:'Φ',0x47:'Γ',0x48:'Η',0x49:'Ι',0x4A:'ϑ',
 0x4B:'Κ',0x4C:'Λ',0x4D:'Μ',0x4E:'Ν',0x4F:'Ο',0x50:'Π',0x51:'Θ',0x52:'Ρ',0x53:'Σ',0x54:'Τ',
 0x55:'Υ',0x56:'ς',0x57:'Ω',0x58:'Ξ',0x59:'Ψ',0x5A:'Ζ',
 0x61:'α',0x62:'β',0x63:'χ',0x64:'δ',0x65:'ε',0x66:'φ',0x67:'γ',0x68:'η',0x69:'ι',0x6A:'ϕ',
 0x6B:'κ',0x6C:'λ',0x6D:'μ',0x6E:'ν',0x6F:'ο',0x70:'π',0x71:'θ',0x72:'ρ',0x73:'σ',0x74:'τ',
 0x75:'υ',0x76:'ϖ',0x77:'ω',0x78:'ξ',0x79:'ψ',0x7A:'ζ',
 0x22:'∀',0x24:'∃',0x27:'∋',0x2A:'∗',0x2D:'−',0x40:'≅',0x5C:'∴',0x5E:'⊥',0x60:'‾',0x7E:'∼',
 0xA1:'ϒ',0xA2:'′',0xA3:'≤',0xA4:'⁄',0xA5:'∞',0xA6:'ƒ',0xA7:'♣',0xA8:'♦',0xA9:'♥',0xAA:'♠',
 0xAB:'↔',0xAC:'←',0xAD:'↑',0xAE:'→',0xAF:'↓',0xB0:'°',0xB1:'±',0xB2:'″',0xB3:'≥',0xB4:'×',
 0xB5:'∝',0xB6:'∂',0xB7:'•',0xB8:'÷',0xB9:'≠',0xBA:'≡',0xBB:'≈',0xBC:'…',0xBD:'|',0xBE:'—',
 0xC0:'ℵ',0xC5:'⊕',0xC4:'⊗',0xC6:'∅',0xC7:'∩',0xC8:'∪',0xCE:'∈',0xCF:'∉',0xD0:'∠',0xD1:'∇',
 0xD5:'∏',0xD6:'√',0xD7:'·',0xD8:'¬',0xD9:'∧',0xDA:'∨',0xDB:'⇔',0xDE:'⇒',0xE0:'◊',0xE1:'⟨',
 0xE5:'∑',0xF1:'⟩',0xF2:'∫',
 # bracket building pieces -> simple brackets / dropped
 0xE6:'(',0xE7:'',0xE8:'(',0xF6:')',0xF7:'',0xF8:')',0xE9:'[',0xEA:'',0xEB:'[',0xF9:']',0xFA:'',0xFB:']',
 0xEC:'{',0xED:'{',0xEE:'{',0xEF:'',0xFC:'}',0xFD:'}',0xFE:'}',0xF3:'',0xF4:'',0xF5:'',
}

def fix_char(c, font):
    if c.startswith('(cid:'):
        n = int(c[5:-1])
        return {129: '•', 2: 'fi', 3: 'fl'}.get(n, '')
    o = ord(c[0]) if c else 0
    if 0xF020 <= o <= 0xF0FF:
        code = o - 0xF000
        return SYM.get(code, chr(code))
    if 'Symbol' in font and len(c) == 1 and (0x41 <= o <= 0x7A or o >= 0xA0):
        return SYM.get(o, c)
    return {' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ', 'ﬁ': 'fi', 'ﬂ': 'fl'}.get(c, c)

def is_bold(f): return 'Bold' in f or 'Black' in f
def is_ital(f): return 'Italic' in f or 'Oblique' in f

def baseline(ch, H):
    m = ch.get('matrix')
    if m: return H - m[5]
    return ch['bottom']

# ---------------------------------------------------------------- lines
class Line:
    def __init__(s): s.chars = []; s.small = []
    def fin(s):
        allc = s.chars + [c for c, _ in s.small]
        s.x0 = min(c['x0'] for c in allc); s.x1 = max(c['x1'] for c in allc)
        s.top = min(c['top'] for c in allc); s.bottom = max(c['bottom'] for c in allc)
        s.size = Counter(round(c['size'], 1) for c in s.chars).most_common(1)[0][0]
        nb = [c for c in s.chars if c['t'].strip()]
        s.bold = bool(nb) and sum(is_bold(c['fontname']) for c in nb) >= 0.9 * len(nb)
        s.ital = bool(nb) and sum(is_ital(c['fontname']) for c in nb) >= 0.9 * len(nb)
        s.items = sorted([(c, None) for c in s.chars] + s.small, key=lambda t: t[0]['x0'])
        return s

def build_lines(chars, H):
    """Group chars into lines (by baseline); attach sub/superscripts."""
    for c in chars:
        c['bl'] = baseline(c, H)
    szs = Counter(round(c['size'], 1) for c in chars if c['t'].strip())
    modal = szs.most_common(1)[0][0] if szs else 9
    thr = min(7.4, 0.82 * modal)
    big = [c for c in chars if c['size'] >= thr or not c['t'].strip()]
    ids = set(id(c) for c in big)
    small = [c for c in chars if id(c) not in ids]
    big.sort(key=lambda c: (c['bl'], c['x0']))
    lines = []
    for c in big:
        if not c['t'].strip() and False: continue
        placed = False
        for L in reversed(lines[-6:]):
            if abs(L.bl - c['bl']) <= 1.3 and c['x0'] >= L.xmin - 400:
                L.chars.append(c); placed = True; break
        if not placed:
            L = Line(); L.bl = c['bl']; L.xmin = c['x0']; L.chars.append(c); lines.append(L)
    lines = [L for L in lines if any(c['t'].strip() for c in L.chars)]
    orphan = []
    for c in small:
        best = None; bd = 99
        cm = (c['top'] + c['bottom']) / 2
        for L in lines:
            lx0 = min(x['x0'] for x in L.chars); lx1 = max(x['x1'] for x in L.chars)
            if c['x0'] < lx0 - 4 or c['x0'] > lx1 + 12: continue
            d = abs(c['bl'] - L.bl)
            if d < bd and d <= 5.5: bd = d; best = L
        if best is None:
            orphan.append(c); continue
        d = c['bl'] - best.bl
        kind = 'sub' if d > 0.8 else ('sup' if d < -1.4 else None)
        best.small.append((c, kind))
    # orphans become their own lines
    orphan.sort(key=lambda c: (c['bl'], c['x0']))
    for c in orphan:
        for L in lines:
            if getattr(L, 'orph', False) and abs(L.bl - c['bl']) <= 1.3:
                L.chars.append(c); break
        else:
            L = Line(); L.bl = c['bl']; L.orph = True; L.chars.append(c); lines.append(L)
    out = [L.fin() for L in lines if any(c['t'].strip() for c in L.chars)]
    out.sort(key=lambda L: (L.bl, L.x0))
    return out

def items_to_runs(items):
    """items: [(char, script)] sorted by x -> list of runs (text,b,i,script) with spaces."""
    runs = []
    prev = None
    for c, sc in items:
        t = c['t']
        if prev is not None:
            gap = c['x0'] - prev['x1']
            thr = 0.18 * min(c['size'], prev['size'])
            if gap > thr and t != ' ' and prev['t'] != ' ':
                # no space between base and its sub/sup, unless big gap
                if not (sc and gap < 0.6 * c['size']) and not (prev.get('_sc') and gap < 0.35 * prev['size'] and not sc):
                    runs.append((' ', False, False, None))
        c['_sc'] = sc
        runs.append((t, is_bold(c['fontname']), is_ital(c['fontname']), sc))
        prev = c
    return runs

def runs_to_md(runs, plain=False, allow_bold=True):
    # merge
    merged = []
    for t, b, i, s in runs:
        if t == ' ':
            if merged and merged[-1][0].endswith(' '): continue
            # a space inherits style of previous run so that bold phrases stay contiguous
            if merged: merged[-1][0] += ' '; continue
            continue
        if merged and merged[-1][1:] == [b, i, s]:
            merged[-1][0] += t
        else:
            merged.append([t, b, i, s])
    out = []
    for t, b, i, s in merged:
        if s and not plain:
            core = t.rstrip(); tail = t[len(core):]
            if core:
                t = f'<{s}>{core}</{s}>' + tail
        out.append([t, b, i])
    # group bold/italic spans
    res = ''
    k = 0
    while k < len(out):
        t, b, i = out[k]
        j = k
        txt = ''
        while j < len(out) and out[j][1] == b and (out[j][2] == i or b):
            txt += out[j][0]; j += 1
        core = txt.strip()
        lead = txt[:len(txt) - len(txt.lstrip())]; trail = txt[len(txt.rstrip()):]
        if plain or not core:
            res += txt
        elif b and allow_bold and len(re.sub(r'<[^>]+>', '', core)) >= 2 and re.search(r'[A-Za-z]{2}', core):
            res += lead + '**' + core + '**' + trail
        elif i and not b and len(core.split()) >= 3:
            res += lead + '*' + core + '*' + trail
        else:
            res += txt
        k = j
    res = re.sub(r'\*\*\s*\*\*', ' ', res)
    return re.sub(r'[ \t]+', ' ', res).strip()

def line_md(L, **kw):
    return runs_to_md(items_to_runs(L.items), **kw)

def line_plain(L):
    return ''.join(t for t, *_ in items_to_runs(L.items)).strip()

def segments(L, gapk=0.95):
    """split a line into horizontally separated segments (for tables)."""
    segs = []; cur = []
    prev = None
    for it in L.items:
        c = it[0]
        if prev is not None and c['x0'] - prev['x1'] > gapk * max(6.5, prev['size']) and c['t'] != ' ':
            segs.append(cur); cur = []
        if c['t'] != ' ' or cur:
            cur.append(it)
        prev = c if c['t'] != ' ' else prev
    if cur: segs.append(cur)
    res = []
    for s in segs:
        s2 = [it for it in s if it[0]['t'] != ' ' or True]
        xs = [it[0] for it in s2 if it[0]['t'].strip()]
        if not xs: continue
        res.append({'x0': min(c['x0'] for c in xs), 'x1': max(c['x1'] for c in xs),
                    'md': runs_to_md(items_to_runs(s2), allow_bold=False)})
    return res

# ---------------------------------------------------------------- page analysis
RULE_H = 2.2

def get_rules(p):
    rs = []
    for r in p.rects + p.lines:
        h = r['bottom'] - r['top']; w = r['x1'] - r['x0']
        if h <= RULE_H and w > 25:
            rs.append({'x0': r['x0'], 'x1': r['x1'], 'y': (r['top'] + r['bottom']) / 2})
    rs.sort(key=lambda r: (r['y'], r['x0']))
    # merge duplicates
    out = []
    for r in rs:
        if out and abs(out[-1]['y'] - r['y']) < 1.5 and abs(out[-1]['x0'] - r['x0']) < 4 and abs(out[-1]['x1'] - r['x1']) < 4:
            continue
        out.append(r)
    return out

def get_vrules(p):
    return [r for r in p.rects + p.lines if (r['x1'] - r['x0']) <= RULE_H and (r['bottom'] - r['top']) > 15]

def in_box(c, b, pad=1.0):
    return c['x0'] >= b[0] - pad and c['x1'] <= b[2] + pad and c['top'] >= b[1] - pad and c['bottom'] <= b[3] + pad

def ctr_in(c, b, pad=1.0):
    x = (c['x0'] + c['x1']) / 2; y = (c['top'] + c['bottom']) / 2
    return b[0] - pad <= x <= b[2] + pad and b[1] - pad <= y <= b[3] + pad

CAP_T = re.compile(r'^\s*Table\s+(\d+[A-Za-z]?)\b')
CAP_F = re.compile(r'^\s*Fig(?:ure)?\.?\s+(\d+[A-Za-z]?)\b')


BARCH = set('-–—−⎯_')

def fold_fractions(chars, H, extra_bars=()):
    for c in chars:
        c['bl'] = baseline(c, H)
    bars = []
    cand = sorted([c for c in chars if c['t'] in BARCH], key=lambda c: (round(c['bl']), c['x0']))
    run = []
    for c in cand:
        if run and abs(c['bl'] - run[-1]['bl']) < 0.6 and c['x0'] - run[-1]['x1'] < 1.2:
            run.append(c)
        else:
            if len(run) >= 3: bars.append(run)
            run = [c]
    if len(run) >= 3: bars.append(run)
    bars = [(min(c['x0'] for c in r), max(c['x1'] for c in r), statistics.mean(c['top'] + (c['bottom'] - c['top']) * 0.55 for c in r), r) for r in bars]
    for b in extra_bars:
        bars.append((b['x0'], b['x1'], b['y'], []))
    if not bars: return chars
    removed = set(); added = []
    for bx0, bx1, by, run in bars:
        runids = set(id(c) for c in run)
        num = [c for c in chars if id(c) not in removed and id(c) not in runids and bx0 - 1.5 <= (c['x0'] + c['x1']) / 2 <= bx1 + 1.5
               and by - 13 <= c['bottom'] <= by + 1.5 and c['t'].strip()]
        den = [c for c in chars if id(c) not in removed and id(c) not in runids and bx0 - 1.5 <= (c['x0'] + c['x1']) / 2 <= bx1 + 1.5
               and by - 1.5 <= c['top'] <= by + 13 and c['t'].strip()]
        if not num or not den: continue
        # isolation check: nothing on numerator/denominator baselines just outside the bar
        def isolated(grp):
            bls = set(round(c['bl']) for c in grp)
            for c in chars:
                if round(c['bl']) in bls and c['t'].strip() and id(c) not in runids and ((bx0 - 8 < c['x1'] <= bx0 - 1.5) or (bx1 + 1.5 <= c['x0'] < bx1 + 8)):
                    return False
            return True
        if not (isolated(num) and isolated(den)): continue
        nl = build_lines([dict(c) for c in num], H); dl = build_lines([dict(c) for c in den], H)
        nt = ' '.join(line_md(l, allow_bold=False) for l in nl); dt = ' '.join(line_md(l, allow_bold=False) for l in dl)
        wrap = lambda t: ('(' + t + ')') if re.search(r'[ +−–\-]', strip_md(t).strip()) else t
        txt = wrap(nt) + '/' + wrap(dt)
        # main baseline: nearest char on the bar's row
        row = [c for c in chars if abs((c['top'] + c['bottom']) / 2 - by) < 4 and id(c) not in runids and c['t'].strip() and c['size'] >= 7]
        ref = min(row, key=lambda c: min(abs(c['x0'] - bx1), abs(c['x1'] - bx0))) if row else (run[0] if run else num[0])
        syn = dict(ref); syn['t'] = txt; syn['x0'] = bx0; syn['x1'] = bx1; syn['raw'] = True
        syn['fontname'] = 'TimesNewRomanPSMT'
        for c in run + num + den: removed.add(id(c))
        added.append(syn)
    if not added: return chars
    return [c for c in chars if id(c) not in removed] + added


def fold_overdots(chars, H):
    """isolated dot above a letter (mass flow m-dot) -> combining dot above."""
    for c in chars:
        c['bl'] = baseline(c, H)
    dots = [c for c in chars if c['t'] in ('·', '˙', '\u02d9')]
    if not dots: return chars
    rm = set()
    for d in dots:
        cx = (d['x0'] + d['x1']) / 2
        neigh = [c for c in chars if c is not d and c['t'].strip() and abs(c['bl'] - d['bl']) < 1.5 and (d['x0'] - 4 < c['x1'] <= d['x0'] + 0.5 or d['x1'] - 0.5 <= c['x0'] < d['x1'] + 4)]
        if neigh: continue
        below = [c for c in chars if c is not d and c['t'].strip() and c['x0'] - 1 <= cx <= c['x1'] + 1 and 0 < c['bl'] - d['bl'] < 9 and c['t'] not in ('·', '˙')]
        if not below: continue
        b = min(below, key=lambda c: c['bl'] - d['bl'])
        b['t'] = b['t'] + '\u0307'
        rm.add(id(d))
    return [c for c in chars if id(c) not in rm]


def split_at_gutter(lines, g, H):
    out = []
    for L in lines:
        cs = [c for c, _ in L.items]
        cross = any(c['x0'] < g - 1 and c['x1'] > g + 1 and c['t'].strip() for c in cs)
        left = [c for c in cs if (c['x0'] + c['x1']) / 2 < g]
        right = [c for c in cs if (c['x0'] + c['x1']) / 2 >= g]
        if cross or not left or not right or not any(c['t'].strip() for c in left) or not any(c['t'].strip() for c in right):
            out.append(L); continue
        lg = max(c['x1'] for c in left if c['t'].strip()); rg = min(c['x0'] for c in right if c['t'].strip())
        if rg - lg < 6:
            out.append(L); continue
        for part in (left, right):
            out.extend(build_lines(part, H))
    out.sort(key=lambda L: (L.bl, L.x0))
    return out


class Page:
    def __init__(self, p, pno, chapter, first=False):
        self.p = p; self.pno = pno; self.ch = chapter; self.first = first
        self.W = p.width; self.H = p.height

    def analyze(self):
        p = self.p; W, H = self.W, self.H
        chars = []
        for c in p.chars:
            if not c.get('upright', True): continue
            t = fix_char(c['text'], c['fontname'])
            if t == '': continue
            c = dict(c); c['t'] = t
            chars.append(c)
        # header/footer
        chars = [c for c in chars if c['top'] > 50 and c['bottom'] < H - 40 and c['x0'] > 25 and c['x1'] < W - 25]
        # drop tiny helvetica (licence stamps)
        chars = [c for c in chars if not (c['size'] < 4)]
        rules = get_rules(p)
        imgs = [(i['x0'], i['top'], i['x1'], i['bottom']) for i in p.images
                if (i['x1'] - i['x0']) > 20 and (i['bottom'] - i['top']) > 15]
        # chapter first page: drop title + mini-TOC above first long rule
        if self.first:
            longr = [r for r in rules if r['x1'] - r['x0'] > 300 and r['y'] < 330]
            cut = longr[0]['y'] if longr else 215
            chars = [c for c in chars if c['top'] > cut]
            rules = [r for r in rules if r['y'] > cut + 1]
        if not chars and not imgs:
            self.blocks = []; return
        self.chars = chars
        xs0 = sorted(c['x0'] for c in chars if c['t'].strip()); xs1 = sorted(c['x1'] for c in chars if c['t'].strip())
        L = xs0[int(len(xs0) * 0.01)] if xs0 else 36; R = xs1[int(len(xs1) * 0.99) - 1] if xs1 else W - 36
        self.L, self.R = L, R
        # gutter: least-covered x strip in the middle
        hdr = [c for c in p.chars if c['top'] < 50 and c.get('upright', True) and c['text'].strip() and c['size'] > 5]
        sc = self.W / 612
        if hdr:
            hx0 = min(c['x0'] for c in hdr)
            if hx0 < 60 * sc: L, R = 36 * sc, 534 * sc
            else: L, R = 74 * sc, 576 * sc
        elif R - L < 400:
            if L < 60 * sc: L, R = 36 * sc, 534 * sc
            else: L, R = 74 * sc, 576 * sc
        g = (L + R) / 2
        self.L, self.R = L, R
        self.g = g
        # ---- figures
        figs = []
        body_lines_all = None
        # merge overlapping images into figure boxes
        boxes = []
        for b in sorted(imgs, key=lambda b: (b[1], b[0])):
            for k, bb in enumerate(boxes):
                if not (b[2] < bb[0] - 8 or b[0] > bb[2] + 8 or b[3] < bb[1] - 8 or b[1] > bb[3] + 8):
                    boxes[k] = (min(b[0], bb[0]), min(b[1], bb[1]), max(b[2], bb[2]), max(b[3], bb[3])); break
            else:
                boxes.append(b)
        # ---- captions: find lines starting with bold Table/Fig
        free = [c for c in chars if not any(in_box(c, b, 2) for b in boxes)]
        # drop cap: big letter -> move onto the first text line to its right
        for dc in [c for c in free if c['size'] >= 14 and c['t'].strip()]:
            nb = [c for c in free if c['size'] < 12 and c['x0'] >= dc['x1'] - 1 and c['x0'] < dc['x1'] + 15 and c['top'] >= dc['top'] - 4 and c['top'] < dc['bottom']]
            if nb:
                t0 = min(nb, key=lambda c: c['top'])
                dc['size'] = t0['size']; dc['matrix'] = t0['matrix']; dc['fontname'] = t0['fontname']
                dc['x1'] = t0['x0'] - 0.1
        lines = split_at_gutter(build_lines(free, H), g, H)
        caps = []
        for ln in lines:
            txt = line_plain(ln)
            first = [c for c, _ in ln.items if c['t'].strip()][:3]
            fb = first and all(is_bold(c['fontname']) for c in first)
            if fb and CAP_T.match(txt): caps.append(('T', ln, txt))
            elif fb and CAP_F.match(txt): caps.append(('F', ln, txt))
        # ---- tables
        tables = []
        used_rules = set()
        tcaps = [c for c in caps if c[0] == 'T']
        for _, cl, txt in tcaps:
            # rules below the caption, within 45pt, horizontally overlapping caption center
            cx = (cl.x0 + cl.x1) / 2
            cand = [i for i, r in enumerate(rules) if i not in used_rules and r['y'] > cl.bottom - 2 and r['y'] < cl.bottom + 60
                    and r['x0'] - 5 <= cx <= r['x1'] + 5]
            if not cand: continue
            top_i = cand[0]; tr = rules[top_i]
            same = [i for i, r in enumerate(rules) if i >= top_i and abs(r['x0'] - tr['x0']) < 6 and abs(r['x1'] - tr['x1']) < 6]
            # stop at next caption below
            nxt = [c[1].top for c in caps if c[1].top > cl.bottom + 2 and tr['x0'] - 5 <= (c[1].x0 + c[1].x1) / 2 <= tr['x1'] + 5]
            lim = min(nxt) if nxt else H
            same = [i for i in same if rules[i]['y'] < lim]
            if len(same) < 2: continue
            for i in same: used_rules.add(i)
            ys = [rules[i]['y'] for i in same]
            box = [min(tr['x0'], cl.x0), cl.top - 1, max(tr['x1'], cl.x1), ys[-1] + 1]
            # notes below bottom rule
            nb = ys[-1]
            for ln in lines:
                if ln.top < nb - 1: continue
                if ln.x0 < box[0] - 4 or ln.x1 > box[2] + 4: continue
                if ln.top - nb > 7 or ln.size >= 8.9: break
                # stop if a caption
                if any(ln is c[1] for c in caps): break
                nb = ln.bottom
            box[3] = max(box[3], nb + 0.5)
            tables.append({'kind': 'table', 'cap': cl, 'captxt': txt, 'box': box, 'rules': ys, 'x0': tr['x0'], 'x1': tr['x1']})
        # uncaptioned ruled tables
        rem = [i for i in range(len(rules)) if i not in used_rules and rules[i]['x1'] - rules[i]['x0'] > 90]
        while rem:
            i0 = rem[0]; r0 = rules[i0]
            grp = [i for i in rem if abs(rules[i]['x0'] - r0['x0']) < 6 and abs(rules[i]['x1'] - r0['x1']) < 6]
            rem = [i for i in rem if i not in grp]
            # split group where body-size text lies between consecutive rules
            subs = [[grp[0]]]
            for i in grp[1:]:
                ya, yb2 = rules[subs[-1][-1]]['y'], rules[i]['y']
                between = [c for c in free if ya < c['top'] < yb2 and r0['x0'] - 2 <= c['x0'] <= r0['x1'] + 2 and c['t'].strip()]
                big = [c for c in between if c['size'] >= 8.9]
                if len(big) > 40 and len(big) > 0.5 * len(between):
                    subs.append([i])
                else:
                    subs[-1].append(i)
            if len(subs) > 1:
                rem = sorted([x for sb in subs[1:] for x in sb] + rem, key=lambda i: rules[i]['y'])
                grp = subs[0]
            if len(grp) < 3 and not (len(grp) == 2 and rules[grp[1]]['y'] - rules[grp[0]]['y'] > 15): continue
            if any(t['box'][1] - 3 <= rules[grp[0]]['y'] <= t['box'][3] + 3 for t in tables if abs(t['x0'] - r0['x0']) < 6): continue
            ys = [rules[i]['y'] for i in grp]
            if ys[-1] - ys[0] > 720: continue
            for i in grp: used_rules.add(i)
            box = [r0['x0'], ys[0] - 1, r0['x1'], ys[-1] + 1]
            nb = ys[-1]
            for ln in lines:
                if ln.top < nb - 1 or ln.x0 < box[0] - 4 or ln.x1 > box[2] + 4: continue
                if ln.top - nb > 7 or ln.size >= 8.9: break
                nb = ln.bottom
            box[3] = max(box[3], nb + 0.5)
            tables.append({'kind': 'table', 'cap': None, 'caplines': [], 'captxt': '', 'box': box, 'rules': ys, 'x0': r0['x0'], 'x1': r0['x1']})
        # ---- figures with captions
        for _, cl, txt in [c for c in caps if c[0] == 'F']:
            best = None; bd = 1e9
            for k, b in enumerate(boxes):
                if b is None: continue
                ov = min(b[2], cl.x1) - max(b[0], cl.x0)
                if ov < -5: continue
                d = cl.top - b[3] if cl.top >= b[3] - 5 else (b[1] - cl.bottom) + 40
                if d < -5 or d > 90: continue
                if d < bd: bd = d; best = k
            fb = boxes[best] if best is not None else None
            figs.append({'kind': 'fig', 'cap': cl, 'captxt': txt, 'img': fb,
                         'box': [min(cl.x0, fb[0]) if fb else cl.x0, min(cl.top, fb[1]) if fb else cl.top,
                                 max(cl.x1, fb[2]) if fb else cl.x1, max(cl.bottom, fb[3]) if fb else cl.bottom]})
            if best is not None: boxes[best] = None
        # images w/o caption
        for b in boxes:
            if b is None: continue
            if (b[2] - b[0]) * (b[3] - b[1]) < 1500: continue
            figs.append({'kind': 'fig', 'cap': None, 'captxt': '', 'img': b, 'box': list(b)})
        # multi-line captions: lines directly below caption line, same font size, before gap
        for f in figs:
            if f['cap'] is None: continue
            cl = f['cap']; last = cl
            extra = []
            for ln in lines:
                if ln.top <= last.bottom - 0.5 or ln is cl: continue
                if ln.top - last.bottom > 3.5: break
                if ln.x0 < f['box'][0] - 5 or ln.x1 > f['box'][2] + 5: continue
                if not ln.bold: break
                extra.append(ln); last = ln
            f['caplines'] = [cl] + extra
            f['box'][3] = max(f['box'][3], last.bottom)
        for t in tables:
            # caption may wrap onto a 2nd bold line
            cl = t['cap']
            if cl is None: continue
            t['caplines'] = [cl]
            for ln in lines:
                if ln.top > cl.bottom - 0.5 and ln.top - cl.bottom < 3.5 and ln.bold and ln.bottom < t['rules'][0] and ln is not cl:
                    t['caplines'].append(ln)
        # full-page numeric tables without rules (e.g. refrigerant property tables)
        if not tables:
            tl = [ln for ln in build_lines([c for c in free if not any(ctr_in(c, f['box'], 1.5) for f in figs)], H)]
            if len(tl) > 15:
                def numfrac(ln):
                    toks = strip_md(line_md(ln, allow_bold=False)).split()
                    if not toks: return 0
                    return sum(1 for t in toks if re.match(r'^[–−\-+]?[\d.,]+[a-z*]?$|^—$|^∞$', t)) / len(toks)
                crossing = [ln for ln in tl if ln.x0 < g - 20 and ln.x1 > g + 20]
                numl = [ln for ln in tl if numfrac(ln) >= 0.7 and len(strip_md(line_plain(ln)).split()) >= 4]
                if len(crossing) > 0.6 * len(tl) and len(numl) > 0.5 * len(tl):
                    first_num = min(numl, key=lambda l: l.top); last_num = max(numl, key=lambda l: l.top)
                    above = [ln for ln in tl if ln.bottom <= first_num.top + 0.5]
                    capl = []
                    for ln in above:
                        if ln.bold and not capl or (capl and ln.bold and ln.top - capl[-1].bottom < 4 and ln.size >= capl[0].size - 0.5):
                            capl.append(ln)
                        else:
                            break
                    hdr_top = (capl[-1].bottom + 0.5) if capl else (min(l.top for l in tl) - 1)
                    yh = first_num.top - 0.8
                    x0t = min(l.x0 for l in tl if l.top >= hdr_top); x1t = max(l.x1 for l in tl if l.top >= hdr_top)
                    ys = [hdr_top, yh, last_num.bottom + 0.8] if above and yh - hdr_top > 3 else [first_num.top - 1, last_num.bottom + 0.8]
                    box = [x0t - 1, (capl[0].top - 1) if capl else ys[0], x1t + 1, ys[-1]]
                    nb = ys[-1]
                    for ln in tl:
                        if ln.top < nb - 1: continue
                        if ln.top - nb > 8: break
                        nb = ln.bottom
                    box[3] = nb + 0.5
                    tables.append({'kind': 'table', 'cap': capl[0] if capl else None, 'caplines': capl,
                                   'captxt': '', 'box': box, 'rules': ys, 'x0': x0t, 'x1': x1t})
        objs = tables + figs
        # remaining text chars
        def taken(c):
            return any(ctr_in(c, o['box'], 1.5) for o in objs)
        rest = [c for c in free if not taken(c)]
        fbars = [r for r in rules if r['x1'] - r['x0'] < 150 and not any(o['box'][0] - 2 <= r['x0'] <= o['box'][2] + 2 and o['box'][1] - 2 <= r['y'] <= o['box'][3] + 2 for o in objs)]
        rest = fold_overdots(rest, H)
        rest = fold_fractions(rest, H, fbars)
        # footnotes below a short rule near the bottom of a column
        for r in rules:
            w = r['x1'] - r['x0']
            if not (20 < w < 90 and r['y'] > H * 0.5): continue
            if any(o['box'][0] - 2 <= r['x0'] <= o['box'][2] + 2 and o['box'][1] - 2 <= r['y'] <= o['box'][3] + 2 for o in objs): continue
            sd = 0 if r['x0'] < g else 1
            fc = [c for c in rest if c['top'] > r['y'] - 1 and ((c['x0'] + c['x1']) / 2 < g) == (sd == 0)]
            if not fc or any(c['size'] > 8.6 for c in fc if c['t'].strip()): continue
            fl = build_lines(fc, H)
            txt = ''
            for l in fl: txt = join_text(txt, line_md(l))
            objs.append({'kind': 'fn', 'text': txt, 'box': [min(c['x0'] for c in fc), r['y'], max(c['x1'] for c in fc), max(c['bottom'] for c in fc)]})
            ids = set(id(c) for c in fc)
            rest = [c for c in rest if id(c) not in ids]
        # classify objects full-width vs column
        colw = (R - L) / 2
        for o in objs:
            b = o['box']
            o['full'] = (b[2] - b[0]) > colw * 1.25 or (b[0] < g - 8 and b[2] > g + 8)
            o['side'] = 0 if (b[0] + b[2]) / 2 < g else 1
        # spanning text rows -> full-width bands
        bands = [(o['box'][1], o['box'][3]) for o in objs if o['full']]
        side = lambda c: 0 if c['x1'] <= g + 2 else (1 if c['x0'] >= g - 2 else 2)
        rest_lines_all = split_at_gutter(build_lines(rest, H), g, H)
        # split each line into left/right parts if it spans gutter with a gap there
        span = []
        for ln in rest_lines_all:
            sides = set(side(c) for c, _ in ln.items if c['t'].strip())
            if 2 in sides:
                span.append((ln.top, ln.bottom))
        for a, b in span:
            bands.append((a - 0.5, b + 0.5))
        bands.sort()
        mb = []
        for a, b in bands:
            if mb and a <= mb[-1][1] + 3: mb[-1] = (mb[-1][0], max(mb[-1][1], b))
            else: mb.append((a, b))
        self.bands = mb
        def in_band(y0, y1):
            for a, b in mb:
                if y0 >= a - 1 and y1 <= b + 1: return True
                if min(y1, b) - max(y0, a) > 0.5 * (y1 - y0): return True
            return False
        # build flow: segments of y
        cuts = [0] + [v for ab in mb for v in ab] + [H]
        segs = []
        pos = 0
        for a, b in mb:
            segs.append(('col', pos, a)); segs.append(('full', a, b)); pos = b
        segs.append(('col', pos, H))
        flow = []  # list of ('lines', [Line], colinfo) or ('obj', o)
        for kind, a, b in segs:
            if b - a < 0.5: continue
            if kind == 'full':
                items = [('obj', o, o['box'][1]) for o in objs if o['full'] and a - 1 <= (o['box'][1] + o['box'][3]) / 2 <= b + 1]
                lns = [ln for ln in rest_lines_all if a - 1 <= (ln.top + ln.bottom) / 2 <= b + 1]
                items += [('line', ln, ln.top) for ln in lns]
                items.sort(key=lambda t: t[2])
                flow.append(('full', items, (L, R)))
            else:
                for sd in (0, 1):
                    cc = [c for c in rest if a <= (c['top'] + c['bottom']) / 2 < b and side(c) == sd]
                    lns = build_lines(cc, H) if cc else []
                    items = [('line', ln, ln.top) for ln in lns]
                    items += [('obj', o, o['box'][1]) for o in objs if not o['full'] and o['side'] == sd and a - 1 <= (o['box'][1] + o['box'][3]) / 2 < b]
                    items.sort(key=lambda t: t[2])
                    cl, cr = (L, g - 6) if sd == 0 else (g + 6, R)
                    flow.append(('col', items, (cl, cr)))
        self.flow = flow

    def find_gutter(self, chars, L, R):
        W = int(self.W) + 2
        cov = [0] * W
        for c in chars:
            if not c['t'].strip(): continue
            for x in range(int(c['x0']), int(c['x1']) + 1):
                if 0 <= x < W: cov[x] += 1
        mid = (L + R) / 2
        best = None
        lo, hi = int(mid - 40), int(mid + 40)
        # find the longest run of minimal coverage
        mn = min(cov[lo:hi])
        run = []; bestrun = (mid, mid)
        s = None
        for x in range(lo, hi + 1):
            if cov[x] <= mn + 2:
                if s is None: s = x
            else:
                if s is not None and (x - s) > (bestrun[1] - bestrun[0]): bestrun = (s, x)
                s = None
        if s is not None and (hi - s) > (bestrun[1] - bestrun[0]): bestrun = (s, hi)
        return (bestrun[0] + bestrun[1]) / 2


# ---------------------------------------------------------------- text blocks
DEF_RE = re.compile(r'^(\S[^=]{0,28}?)\s=\s')
EQN_RE = re.compile(r'^\((\d+[a-z]?)\)$')
TERM = tuple('.:;?!)]')

def strip_md(s):
    return re.sub(r'\*\*|(?<!\w)\*(?!\s)|(?<!\s)\*(?!\w)|<[^>]+>', '', s)

VOCAB = Counter()

def join_text(a, b):
    """join two text fragments across a line break with de-hyphenation."""
    if not a: return b
    if not b: return a
    m = re.search(r'([A-Za-z]+)-$', a)
    if m and re.match(r'^[a-z]', b):
        w1 = m.group(1); w2 = re.match(r'^([a-z]+)', b).group(1)
        joined = (w1 + w2).lower(); hyph = (w1 + '-' + w2).lower()
        if VOCAB[hyph] > VOCAB[joined] or (w1[0].isupper() and len(w1) > 1 and w1.isupper()):
            return a + b
        return a[:-1] + b
    if a.endswith('-') or a.endswith('/') or a.endswith('—') or a.endswith('–'):
        return a + b
    return a + ' ' + b

def build_vocab(text):
    for w in re.findall(r"[A-Za-z]+(?:-[A-Za-z]+)*", text):
        VOCAB[w.lower()] += 1

class Blk(dict):
    pass

def lines_to_blocks(lines, cl, cr, pno):
    blocks = []
    cur = None  # current paragraph block
    prev = None
    defmode = False
    for ln in lines:
        md = line_md(ln)
        pl = strip_md(md).strip()
        if not pl: continue
        segs = segments(ln, 1.8)
        eqnum = None
        segs_t = segments(ln, 0.9)
        if len(segs) < 2 and len(segs_t) >= 2 and '=' in pl:
            segs = segs_t
        if len(segs) >= 2 and EQN_RE.match(strip_md(segs[-1]['md']).strip()) and segs[-1]['x0'] - segs[-2]['x1'] > 7:
            eqnum = strip_md(segs[-1]['md']).strip()
            md = ' '.join(s['md'] for s in segs[:-1])
            pl = strip_md(md)
        elif len(segs) == 1 and EQN_RE.match(pl) and ln.x0 > cl + (cr - cl) * 0.6:
            # lone equation number on its own line -> attach to previous eq
            if blocks and blocks[-1]['t'] == 'eq' and not blocks[-1].get('num'):
                blocks[-1]['num'] = pl; prev = ln; continue
        indent = ln.x0 - cl
        gap = (ln.top - prev.bottom) if prev is not None else 0
        short_prev = prev is not None and prev.x1 < cr - 22
        width = cr - cl
        # ---- headings
        is_head = (ln.bold and len(pl) < 110 and not CAP_T.match(pl) and not CAP_F.match(pl)
                   and not pl.endswith(':') and not re.match(r'^(Example|Solution|Note|Given|Find|Answer)\b', pl)
                   and re.search(r'[A-Za-z]{3}', pl) and not eqnum and re.match(r'^[A-Z0-9]', pl)
                   and not (pl.endswith('.') and not pl.isupper() and not re.match(r'^\d', pl))
                   and not (ln.x1 > cr - 12 and not pl.isupper() and len(pl) > 45))
        if is_head:
            letters = re.sub(r'[^A-Za-z]', '', pl)
            caps = letters and sum(ch.isupper() for ch in letters) > 0.8 * len(letters)
            lvl = 2 if caps else 3
            if blocks and blocks[-1]['t'] == 'h' and prev is not None and gap < 4 and blocks[-1]['lvl'] == lvl and blocks[-1].get('pno') == pno:
                blocks[-1]['text'] += ' ' + pl
            else:
                blocks.append(Blk(t='h', lvl=lvl, text=pl, pno=pno))
            cur = None; prev = ln; defmode = False
            continue
        # ---- dotted leader lines (lists of values)
        if re.search(r'\.{5,}|(?:\. ){4,}', pl):
            txt = re.sub(r'\s*(?:\.\s?){4,}\s*', ' … ', md).strip()
            if txt.startswith('…') and blocks and blocks[-1]['t'] == 'li' and blocks[-1].get('leader'):
                blocks[-1]['text'] += ' = ' + txt.lstrip('… ').strip()
            else:
                cur = Blk(t='li', text=txt, x0=ln.x0, leader=True, pno=pno, last=ln)
                blocks.append(cur)
            prev = ln; continue
        # ---- bullets
        if pl.startswith('•'):
            txt = re.sub(r'^\s*•\s*', '', md)
            cur = Blk(t='li', text=txt, x0=ln.x0, tx0=ln.x0 + 6, pno=pno, last=ln)
            blocks.append(cur); prev = ln; continue
        # ---- definition lists (after "where")
        dm = DEF_RE.match(pl)
        prevtxt = blocks[-1]['text'].strip() if blocks and blocks[-1]['t'] in ('p', 'eq', 'li') else ''
        if dm and (defmode or re.search(r'(\bwhere|:)$', prevtxt) or (blocks and blocks[-1]['t'] == 'li' and blocks[-1].get('defn'))) and len(dm.group(1).split()) <= 5 and not eqnum:
            cur = Blk(t='li', text=md, x0=ln.x0, defn=True, pno=pno, last=ln)
            blocks.append(cur); prev = ln; defmode = True; continue
        if cur is not None and cur['t'] == 'li':
            if ln.x0 > cur['x0'] + 3 and gap < 4 and not eqnum:
                cur['text'] = join_text(cur['text'], md); prev = ln; cur['last'] = ln; continue
            if cur.get('defn') and not dm:
                defmode = False
        # ---- display equations
        centered = indent > 22 and (ln.x1 < cr - 12)
        if eqnum or (centered and not (cur is not None and cur['t'] == 'p' and not short_prev and gap < 3 and indent < 60)):
            if eqnum or '=' in pl or len(pl) < 60 or re.search(r'[Σ∑∫√Δ±×]', pl):
                blocks.append(Blk(t='eq', text=md, num=eqnum, pno=pno))
                cur = None; prev = ln; continue
        # ---- paragraphs
        new = False
        if cur is None or cur['t'] != 'p':
            new = True
        else:
            hanging = cur.get('hang')
            if gap > 0.85 * ln.size: new = True
            elif hanging and ln.x0 <= cur['x0'] + 2: new = True
            elif short_prev and not cur['text'].endswith('-'): new = True
            elif 4 < indent < 24 and prev is not None and (short_prev or cur['text'].rstrip().endswith(TERM)) and ln.x0 > cur['lx0'] + 4:
                new = True
            elif abs(ln.size - cur['size']) > 0.9: new = True
        if new:
            cur = Blk(t='p', text=md, x0=ln.x0, lx0=ln.x0, size=ln.size, pno=pno, n=1, first_indent=indent, last=ln)
            blocks.append(cur)
        else:
            if cur['n'] == 1 and ln.x0 > cur['x0'] + 4:
                cur['hang'] = True
            cur['text'] = join_text(cur['text'], md); cur['n'] += 1; cur['lx0'] = ln.x0; cur['last'] = ln
        prev = ln
    # mark whether the last paragraph ended at the column bottom (can continue)
    return blocks

# ---------------------------------------------------------------- tables
def join_cell(a, b):
    if not a: return b
    if not b: return a
    bs = strip_md(b).lstrip()
    if (re.match(r'^[A-Z•(]', bs) and not a.rstrip().endswith(('-', ',', '/', 'of', 'and', 'the', 'for', 'to'))):
        return a + '<br>' + b
    return join_text(a, b)


def esc(s):
    return s.replace('|', '\\|')

def table_to_md(pg, t):
    box = t['box']
    capids = set(id(l) for l in t['caplines'])
    ys = t['rules']
    chars = [c for c in pg.chars if ctr_in(c, box, 1.5)]
    capchars = set()
    for l in t['caplines']:
        for c, _ in l.items: capchars.add(id(c))
    chars = [c for c in chars if id(c) not in capchars]
    cap = ' '.join(strip_md(line_md(l)) for l in t['caplines'])
    cap = re.sub(r'\s+', ' ', cap).strip()
    capmd = ('**' + cap + '**') if cap else ''
    y0 = ys[0]; yb = ys[-1]
    yh = ys[1] if len(ys) >= 3 else None
    mid = lambda c: (c['top'] + c['bottom']) / 2
    body_c = [c for c in chars if (yh or y0) < mid(c) < yb]
    head_c = [c for c in chars if yh and y0 < mid(c) < yh]
    note_c = [c for c in chars if mid(c) > yb]
    notes = build_lines(note_c, pg.H) if note_c else []
    notes_md = []
    for l in notes:
        m = line_md(l)
        if notes_md and not re.match(r'^(<sup>|Note|Notes|Source|Sources|\*|[a-z]\s|†|‡)', strip_md(m) if False else m) and not m.startswith('<sup>'):
            notes_md[-1] = join_text(notes_md[-1], m)
        else:
            notes_md.append(m)
    notes_txt = '\n\n'.join('<sub>' + n + '</sub>' if False else n for n in notes_md)
    blines = build_lines(body_c, pg.H) if body_c else []
    hlines = build_lines(head_c, pg.H) if head_c else []
    x0, x1 = t['x0'], t['x1']
    # --- columns
    vr = [r for r in get_vrules(pg.p) if x0 - 2 <= r['x0'] <= x1 + 2 and r['top'] < yb and r['bottom'] > y0]
    bsegs = [(l, segments(l)) for l in blines]
    colb = None
    if len(vr) >= 2:
        xs = sorted(set(round((r['x0'] + r['x1']) / 2) for r in vr))
        xs2 = []
        for x in xs:
            if not xs2 or x - xs2[-1] > 4: xs2.append(x)
        edges = sorted(set([x0] + xs2 + [x1]))
        cols = [(edges[i], edges[i + 1]) for i in range(len(edges) - 1) if edges[i + 1] - edges[i] > 6]
        colb = cols
    else:
        W = int(pg.W) + 2
        cov = [0] * W
        nrows = 0
        for l, ss in bsegs:
            nrows += 1
            for s in segments(l, 0.45):
                for x in range(int(s['x0'] + 0.5), int(s['x1'] - 0.5) + 1):
                    if 0 <= x < W: cov[x] += 1
        thr = max(1, int(0.08 * nrows)) if nrows >= 4 else 0
        cols = []; s0 = None
        for x in range(int(x0), int(x1) + 2):
            v = cov[x] if x < W else 0
            if v > thr and s0 is None: s0 = x
            if v <= thr and s0 is not None:
                cols.append((s0, x)); s0 = None
        if s0 is not None: cols.append((s0, int(x1)))
        # merge tiny gaps (< 3pt)
        m = []
        for c in cols:
            if m and c[0] - m[-1][1] < 3.5: m[-1] = (m[-1][0], c[1])
            else: m.append(c)
        cols = m
        # expand to boundaries (midpoints)
        if cols:
            b = [x0 - 2] + [(cols[i][1] + cols[i + 1][0]) / 2 for i in range(len(cols) - 1)] + [x1 + 2]
            colb = [(b[i], b[i + 1]) for i in range(len(cols))]
    if not colb or len(colb) < 2 or len(colb) > 30 or not blines:
        return pre_table(pg, t, capmd, chars, notes_txt)
    nc = len(colb)
    def ov(s, c):
        return min(s['x1'], c[1]) - max(s['x0'], c[0])
    def assign(s):
        o = [ov(s, c) for c in colb]
        hit = [i for i, v in enumerate(o) if v > 0.5]
        return hit
    # --- rows
    rows = []
    spanrows = 0
    use_rules_rows = len(ys) >= 5
    rulerow = None
    for l, ss0 in bsegs:
        cells = [''] * nc
        spanning = False
        if len(ss0) == 1 and len(assign(ss0[0])) > 1 and nc > 2:
            ss = ss0
        else:
            ss = []
            for s in ss0:
                if len(assign(s)) > 1:
                    ss.extend(segments_sub(l, s))
                else:
                    ss.append(s)
        for s in ss:
            hit = assign(s)
            if not hit:
                cx = (s['x0'] + s['x1']) / 2
                hit = [min(range(nc), key=lambda i: abs((colb[i][0] + colb[i][1]) / 2 - cx))]
            if len(hit) > 1:
                w = sum(min(s['x1'], colb[i][1]) - max(s['x0'], colb[i][0]) for i in hit)
                # segment covers several columns
                if len(ss) == 1: spanning = True
                i = hit[0]
            else:
                i = hit[0]
            cells[i] = (cells[i] + ' ' + s['md']).strip()
        if use_rules_rows:
            mid_y = (l.top + l.bottom) / 2
            ri = max([k for k, y in enumerate(ys) if y < mid_y] or [0])
            if rows and rows[-1][2] == ri:
                pr = rows[-1][0]
                for i in range(nc):
                    if cells[i]: pr[i] = join_cell(pr[i], cells[i]) if pr[i] else cells[i]
                continue
            rows.append([cells, spanning, ri]); continue
        if spanning:
            spanrows += 1
            rows.append([cells, True, None]); continue
        # continuation heuristic
        if rows and not rows[-1][1]:
            pr = rows[-1][0]
            nonempty = [i for i in range(nc) if cells[i]]
            isnum = lambda x: bool(re.match(r'^[\s\-–−+.,0-9%()<>≤≥×/a-z]*$', strip_md(x))) and re.search(r'\d', x)
            if not cells[0] and nonempty and all(not isnum(cells[i]) for i in nonempty) and any(pr[i] for i in nonempty):
                for i in nonempty: pr[i] = join_cell(pr[i], cells[i]) if pr[i] else cells[i]
                continue
            if cells[0] and len(nonempty) == 1 and re.match(r'^[a-z(]', strip_md(cells[0])) and sum(1 for x in pr if x) > 1:
                pr[0] = join_text(pr[0], cells[0]); continue
        rows.append([cells, False, None])
    # --- header
    hdr = [''] * nc
    grp = [''] * nc
    bounds = [colb[i][1] for i in range(nc - 1)]
    def hsplit(l):
        out = []
        for s in segments(l):
            ws = segments(l, 0.3)
            ws = [w for w in ws if w['x0'] >= s['x0'] - 0.5 and w['x1'] <= s['x1'] + 0.5]
            if len(ws) <= 1:
                out.append(s); continue
            cur = [ws[0]]
            for w in ws[1:]:
                gap0, gap1 = cur[-1]['x1'], w['x0']
                if gap1 - gap0 > 2.9 and any(gap0 - 1.5 <= b <= gap1 + 1.5 for b in bounds):
                    out.append({'x0': cur[0]['x0'], 'x1': cur[-1]['x1'], 'md': ' '.join(x['md'] for x in cur)}); cur = [w]
                else:
                    cur.append(w)
            out.append({'x0': cur[0]['x0'], 'x1': cur[-1]['x1'], 'md': ' '.join(x['md'] for x in cur)})
        return out
    for l in hlines:
        for s in hsplit(l):
            hit = [i for i, c in enumerate(colb) if ov(s, c) > 0.25 * min(c[1] - c[0], s['x1'] - s['x0'] + 0.1)]
            if not hit:
                cx = (s['x0'] + s['x1']) / 2
                hit = [min(range(nc), key=lambda i: abs((colb[i][0] + colb[i][1]) / 2 - cx))]
            if len(hit) > 1:
                for i in hit: grp[i] = (grp[i] + ' ' + s['md']).strip()
            else:
                i = hit[0]; hdr[i] = join_text(hdr[i], s['md']) if hdr[i] else s['md']
    header = []
    for i in range(nc):
        h = hdr[i]
        if grp[i]: h = grp[i] + ('<br>' + h if h else '')
        header.append(h)
    if not any(header):
        if rows:
            header = rows[0][0]; rows = rows[1:]
    allc = [c for r in rows for c in r[0] if c]
    bad = [c for c in allc if len(re.findall(r'(?<![\w.])[–−\-+]?\d[\d.,]*', strip_md(c))) >= 4 and '<br>' not in c]
    if allc and len(bad) > 0.25 * len(allc):
        return pre_table(pg, t, capmd, chars, notes_txt)
    # drop empty columns
    keep = [i for i in range(nc) if header[i] or any(r[0][i] for r in rows)]
    header = [header[i] for i in keep]
    out = [capmd, ''] if capmd else []
    out.append('| ' + ' | '.join(esc(h) or ' ' for h in header) + ' |')
    out.append('|' + '|'.join(['---'] * len(header)) + '|')
    for cells, span, _ in rows:
        cc = [cells[i] for i in keep]
        if span:
            txt = ' '.join(c for c in cc if c)
            cc = ['**' + strip_md(txt) + '**'] + [''] * (len(cc) - 1)
        cc = [re.sub(r'\s*\.{4,}\s*', ' … ', c).strip() for c in cc]
        out.append('| ' + ' | '.join(esc(c) for c in cc) + ' |')
    if notes_txt:
        out += ['', notes_txt]
    return '\n'.join(out)

def segments_sub(l, seg):
    """split a segment into words (for column assignment)."""
    out = []
    for w in segments(l, 0.3):
        if w['x0'] >= seg['x0'] - 0.5 and w['x1'] <= seg['x1'] + 0.5:
            out.append(w)
    return out or [seg]


def pre_table(pg, t, capmd, chars, notes_txt):
    lines = build_lines(chars, pg.H)
    x0 = t['box'][0]
    txt = []
    for l in lines:
        row = ''
        for s in segments(l, 0.6):
            col = int((s['x0'] - x0) / 3.6)
            s['md'] = s['md'].replace('</sub><sub>', '').replace('</sup><sup>', '')
            seg = strip_md(re.sub(r'<sub>(.*?)</sub>', r'_\1', re.sub(r'<sup>(.*?)</sup>', r'^\1', s['md'])))
            if len(row) < col: row += ' ' * (col - len(row))
            elif row: row += ' '
            row += seg
        txt.append(row.rstrip())
    return capmd + '\n\n```text\n' + '\n'.join(txt) + '\n```'


# ---------------------------------------------------------------- figures
def render_fig(pno, box, path, dpi=130, rotate=0):
    s = dpi / 72.0
    x = max(0, int((box[0] - 2) * s)); y = max(0, int((box[1] - 2) * s))
    w = int((box[2] - box[0] + 4) * s); h = int((box[3] - box[1] + 4) * s)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    base = path[:-4]
    subprocess.run(['pdftoppm', '-r', str(dpi), '-f', str(pno), '-l', str(pno), '-x', str(x), '-y', str(y),
                    '-W', str(w), '-H', str(h), '-png', '-singlefile', PDF, base], check=True)
    if rotate:
        from PIL import Image
        im = Image.open(path); im.rotate(rotate, expand=True).save(path, optimize=True)


# ---------------------------------------------------------------- chapter
def page_blocks(pdf, pno, chnum, first, imgdir_rel, outdir, figcount):
    p = pdf.pages[pno - 1]
    p = p.dedupe_chars(tolerance=1)
    nonup = sum(1 for c in p.chars if not c.get('upright', True))
    if p.rotation in (90, 270) or p.width > p.height or (p.chars and nonup > 0.5 * len(p.chars)):
        txt = subprocess.run(['pdftotext', '-layout', '-f', str(pno), '-l', str(pno), PDF, '-'], capture_output=True, text=True).stdout
        bigimg = [i for i in p.images if (i['x1'] - i['x0']) * (i['bottom'] - i['top']) > 0.3 * p.width * p.height]
        if bigimg and p.rotation == 0:
            i = max(bigimg, key=lambda i: (i['x1'] - i['x0']) * (i['bottom'] - i['top']))
            m = re.search(r'Fig\.\s+\d+[A-Za-z]?\s+[^\n]+', txt)
            cap = re.sub(r'\s{6,}.*$', '', m.group(0)).strip() if m else ''
            cap = re.sub(r'\s+', ' ', cap)
            nu = [c for c in p.chars if not c.get('upright', True)]
            rot = 0
            if nu:
                mtx = nu[0].get('matrix') or (1, 0, 0, 1, 0, 0)
                rot = -90 if mtx[1] > 0 else 90
            figcount[0] += 1
            mm = CAP_F.match(cap)
            name = ('fig-%02d' % int(re.match(r'\d+', mm.group(1)).group(0))) if mm else 'p%04d-%d' % (pno, figcount[0])
            if os.path.exists(os.path.join(outdir, imgdir_rel, name + '.png')): name += '-p%d' % pno
            rel = imgdir_rel + '/' + name + '.png'
            render_fig(pno, (i['x0'], i['top'], i['x1'], i['bottom']), os.path.join(outdir, rel), rotate=rot)
            return [Blk(t='fig', cap=cap, img=rel, pno=pno)]
        ls = [l.rstrip() for l in txt.splitlines() if l.strip() and 'Licensed for single user' not in l]
        ind = min((len(l) - len(l.lstrip()) for l in ls), default=0)
        txt = '\n'.join(l[ind:] for l in ls)
        return [Blk(t='pre', text=txt, pno=pno)]
    ims = [i for i in p.images if (i['x1'] - i['x0']) > 10 and (i['bottom'] - i['top']) > 8]
    if len(ims) >= 12:
        figcount[0] += 1
        rel = imgdir_rel + '/p%04d-stranica.png' % pno
        render_fig(pno, (30, 52, p.width - 30, p.height - 40), os.path.join(outdir, rel), dpi=110)
        pre = [Blk(t='fig', cap='Stranica %d (grafički prikaz cele strane)' % pno, img=rel, pno=pno)]
    else:
        pre = []
    pg = Page(p, pno, chnum, first)
    pg.analyze()
    if not hasattr(pg, 'flow'): return pre
    blocks = list(pre)
    for kind, items, (cl, cr) in pg.flow:
        buf = []
        def flush():
            if buf:
                blocks.extend(lines_to_blocks(buf, cl, cr, pno)); buf.clear()
        for typ, obj, _ in items:
            if typ == 'line':
                buf.append(obj)
            else:
                flush()
                if obj['kind'] == 'fn':
                    blocks.append(Blk(t='fn', text=obj['text'], pno=pno)); continue
                if obj['kind'] == 'table':
                    try:
                        md = table_to_md(pg, obj)
                    except Exception as e:
                        md = '**' + obj['captxt'] + '**\n\n*(tabela nije mogla biti konvertovana: %s)*' % e
                    blocks.append(Blk(t='table', text=md, pno=pno))
                else:
                    cap = ''
                    if obj.get('caplines'):
                        cap = re.sub(r'\s+', ' ', ' '.join(strip_md(line_md(l)) for l in obj['caplines'])).strip()
                    img = None
                    if obj['img']:
                        m = CAP_F.match(cap)
                        figcount[0] += 1
                        name = ('fig-%02d' % int(re.match(r'\d+', m.group(1)).group(0)) + (m.group(1).lstrip('0123456789').lower())) if m else 'p%04d-%d' % (pno, figcount[0])
                        if os.path.exists(os.path.join(outdir, imgdir_rel, name + '.png')):
                            name += '-p%d' % pno
                        rel = imgdir_rel + '/' + name + '.png'
                        render_fig(pno, obj['img'], os.path.join(outdir, rel))
                        img = rel
                    blocks.append(Blk(t='fig', cap=cap, img=img, pno=pno))
        flush()
    return blocks


def is_texty(b):
    return b['t'] in ('p', 'li')

def assemble(blocks):
    # merge paragraphs split by columns/pages/objects
    out = []
    pending_objs = []
    i = 0
    res = []
    for b in blocks:
        if b['t'] in ('p', 'li') and res:
            # find last text block in res, skipping objects/markers placed after it
            k = len(res) - 1
            while k >= 0 and res[k]['t'] in ('fig', 'table', 'mark', 'pre', 'fn'):
                k -= 1
            if k >= 0 and res[k]['t'] in ('p', 'li') and (len(res) - 1 - k) <= 6:
                a = res[k]['text'].rstrip()
                bt = strip_md(b['text']).lstrip()
                cont = (not a.endswith(TERM) or a.endswith('-')) and b['t'] == 'p' and (
                    re.match(r'^[a-z0-9(,;–−]', bt) or a.endswith('-') or a.endswith(',') or re.search(r'\b(the|of|and|a|an|to|in|for|by|with|or|is|are|from|at|as|on)$', a))
                if cont and not a.endswith(':'):
                    res[k]['text'] = join_text(a, b['text'].lstrip())
                    continue
        res.append(b)
    return res


def slug(s):
    s = strip_md(s).lower()
    s = re.sub(r'[^\w\- ]', '', s)
    return s.strip().replace(' ', '-')


def render(blocks, title, chnum, p0, p1):
    out = []
    numbered0 = sum(1 for b in blocks if b['t'] == 'h' and b['lvl'] == 2 and re.match(r'^\d+\.', b['text']))
    heads = [b for b in blocks if b['t'] == 'h' and b['lvl'] == 2 and (numbered0 < 2 or re.match(r'^\d+\.', b['text']) or re.match(r'^(REFERENCES|BIBLIOGRAPHY|SYMBOLS|NOMENCLATURE|ACKNOWLEDGMENTS?|DEFINITIONS)\b', b['text']))]
    out.append('# Chapter %d — %s\n' % (chnum, title))
    out.append('*Izvor: 2021 ASHRAE Handbook — Fundamentals (SI), Chapter %d (PDF str. %d–%d).*\n' % (chnum, p0, p1))
    out.append('> **Napomena o konverziji:** Tekst je automatski izdvojen iz originalnog PDF-a uz prepoznavanje dve kolone, '
               'spojene prelomljene reči i pasuse. Indeksi i eksponenti su označeni sa `<sub>`/`<sup>`, tabele su pretvorene u Markdown tabele '
               '(veoma složene tabele su prikazane kao poravnat tekst), a slike su izrezane iz PDF-a u folder `img/`. '
               'Složene jednačine (razlomci, sume) mogu biti uprošćeno prikazane. '
               '**Pre upotrebe vrednosti u proračunu proveriti u originalnom PDF-u.** Oznake `<!-- str. N -->` pokazuju stranu PDF-a.\n')
    if heads:
        out.append('## Sadržaj\n')
        seen = Counter()
        for h in heads:
            s = slug(h['text']); seen[s] += 1
            if seen[s] > 1: s += '-%d' % (seen[s] - 1)
            out.append('- [%s](#%s)' % (strip_md(h['text']), s))
        out.append('')
    numbered = sum(1 for b in blocks if b['t'] == 'h' and b['lvl'] == 2 and re.match(r'^\d+\.', b['text']))
    for b in blocks:
        if b['t'] == 'h' and b['lvl'] == 2 and numbered >= 2 and not re.match(r'^\d+\.', b['text']) \
                and not re.match(r'^(REFERENCES|BIBLIOGRAPHY|SYMBOLS|NOMENCLATURE|ACKNOWLEDGMENTS?|DEFINITIONS)\b', b['text']):
            b['lvl'] = 3
    lastp = None
    for b in blocks:
        if b.get('pno') and b['pno'] != lastp:
            out.append('<!-- str. %d -->\n' % b['pno']); lastp = b['pno']
        t = b['t']
        if t == 'h':
            out.append('#' * b['lvl'] + ' ' + strip_md(b['text']) + '\n')
        elif t == 'p':
            out.append(re.sub(r'\*\*(\s+)\*\*', r'\1', b['text'].strip()) + '\n')
        elif t == 'li':
            out.append('- ' + b['text'].strip())
            out.append('')
        elif t == 'eq':
            num = ('&emsp;**' + b['num'] + '**') if b.get('num') else ''
            out.append('> ' + b['text'].strip() + num + '\n')
        elif t == 'table':
            out.append(b['text'] + '\n')
        elif t == 'fig':
            if b['img']:
                alt = strip_md(b['cap']).replace('[', '(').replace(']', ')') or 'Slika'
                out.append('![%s](%s)\n' % (alt, b['img']))
            if b['cap']:
                out.append('*' + b['cap'] + '*\n')
        elif t == 'fn':
            out.append('<sub>' + b['text'].strip() + '</sub>\n')
        elif t == 'pre':
            out.append('```text\n' + b['text'] + '\n```\n')
    txt = '\n'.join(out)
    # tidy: collapse list spacing (consecutive list items without blank lines)
    txt = re.sub(r'(\n- [^\n]*)\n\n(?=- )', r'\1\n', txt)
    txt = re.sub(r'(\n- [^\n]*)\n\n(?=- )', r'\1\n', txt)
    # consecutive eq lines: keep as separate quote paragraphs but join into one quote block
    txt = re.sub(r'(\n> [^\n]*)\n\n(?=> )', r'\1\n>\n', txt)
    txt = re.sub(r'\n{3,}', '\n\n', txt)
    txt = txt.replace('</sub><sub>', '').replace('</sup><sup>', '')
    return txt


def convert(chnum, title, p0, p1, outdir, fname):
    pdf = pdfplumber.open(PDF)
    imgrel = 'img/ch%02d' % chnum
    import shutil
    shutil.rmtree(os.path.join(outdir, imgrel), ignore_errors=True)
    blocks = []
    figcount = [0]
    for pno in range(p0, p1 + 1):
        try:
            bl = page_blocks(pdf, pno, chnum, pno == p0, imgrel, outdir, figcount)
        except Exception as e:
            import traceback; traceback.print_exc()
            txt = subprocess.run(['pdftotext', '-layout', '-f', str(pno), '-l', str(pno), PDF, '-'], capture_output=True, text=True).stdout
            bl = [Blk(t='pre', text=txt, pno=pno)]
        blocks.extend(bl)
        pdf.pages[pno - 1].close() if hasattr(pdf.pages[pno - 1], 'close') else None
        print('  page', pno, len(bl), file=sys.stderr, flush=True)
    # vocab for de-hyphenation: rebuild with texts and re-run joins not possible after the fact;
    blocks = assemble(blocks)
    md = render(blocks, title, chnum, p0, p1)
    with open(os.path.join(outdir, fname), 'w', encoding='utf-8') as f:
        f.write(md)
    return md


if __name__ == '__main__':
    import glob
    chaps = json.load(open('/home/claude/w/chapters.json'))
    outdir = sys.argv[1]
    sel = [int(x) for x in sys.argv[2].split(',')] if len(sys.argv) > 2 else [c['n'] for c in chaps]
    # vocabulary from pdftotext of whole book (for de-hyphenation)
    vf = '/home/claude/w/vocab.json'
    if os.path.exists(vf):
        VOCAB.update(json.load(open(vf)))
    for c in chaps:
        if c['n'] in sel:
            print('Chapter', c['n'], file=sys.stderr, flush=True)
            convert(c['n'], c['title'], c['p0'], c['p1'], outdir, c['file'])

#!/usr/bin/env python3
"""BBD Cortex pretraga — BM25 nad MD bazom (propisi, standardi, knjige).

Samo standardna Python biblioteka. Primeri:
  python3 search.py "ventilacija garaze broj izmena vazduha"
  python3 search.py "natpritisak stepeniste" --izvor standardi --top 5
  python3 search.py --full "pravilnici/garaze/0005-pravilnik-bezbednost-garaza.md#Član 12."
  python3 search.py --list            # spisak dokumenata u bazi
"""
import argparse, json, math, os, pickle, re, sys, unicodedata, hashlib
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
SKILL_DIR = os.path.dirname(HERE)
SOURCES = ("pravilnici", "standardi", "knjige")
SKIP_FILES = {"README.md", "TEMPLATE.md"}
MAX_CHUNK = 6000      # znakova; duži delovi se dele po pasusima
SNIPPET = 2200        # koliko teksta po pogotku se ispisuje (bez --full)

# ---------- lokacija baze ----------
def find_base():
    """reference/ uz skill (claude.ai ZIP) ili koren repoa (Cowork/Claude Code)."""
    ref = os.path.join(SKILL_DIR, "reference")
    if os.path.isdir(ref):
        return ref
    d = SKILL_DIR
    for _ in range(6):
        d = os.path.dirname(d)
        if os.path.isdir(os.path.join(d, "pravilnici")):
            return d
    sys.exit("Baza nije pronađena (nema reference/ niti pravilnici/ u repou).")

def load_config():
    p = os.path.join(SKILL_DIR, "config.json")
    if os.path.exists(p):
        with open(p, encoding="utf-8") as f:
            return json.load(f)
    return {}

# ---------- normalizacija teksta ----------
CYR = dict(zip("абвгдђежзијклљмнњопрстћуфхцчџш",
               ["a","b","v","g","d","dj","e","z","z","i","j","k","l","lj","m","n","nj",
                "o","p","r","s","t","c","u","f","h","c","c","dz","s"]))
STOP = set("""i u na za od do se je su da li ili a ali o sa kao koji koja koje kod
po pri iz ne bi biti ce sto ovog ove ovaj taj tog te the and of to in for with""".split())

def norm(text):
    text = text.lower()
    text = "".join(CYR.get(ch, ch) for ch in text)
    text = text.replace("đ", "dj")
    text = unicodedata.normalize("NFKD", text)
    return "".join(ch for ch in text if not unicodedata.combining(ch))

def tokens(text):
    out = []
    for t in re.findall(r"[a-z0-9]+(?:[.,][0-9]+)?", norm(text)):
        if t in STOP or len(t) < 2:
            continue
        # grubo "stemovanje" za srpske padeže: prefiks do 6 znakova
        out.append(t[:6] if t.isalpha() else t)
    return out

# ---------- parsiranje MD ----------
def parse_front(raw):
    meta, body = {}, raw
    m = re.match(r"^---\n(.*?)\n---\n", raw, re.S)
    if m:
        body = raw[m.end():]
        for line in m.group(1).splitlines():
            if ":" in line and not line.startswith(" "):
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip().strip('"')
    return meta, body

def chunk_file(base, rel):
    with open(os.path.join(base, rel), encoding="utf-8") as f:
        meta, body = parse_front(f.read())
    title = meta.get("naziv") or meta.get("oznaka") or meta.get("naslov")
    lines, crumbs, chunks = body.splitlines(), {}, []
    cur_head, buf = "(uvod)", []

    def flush():
        text = "\n".join(buf).strip()
        if not text:
            return
        path = " › ".join(crumbs[k] for k in sorted(crumbs) if k > 1 and crumbs[k] != cur_head)
        parts = [text]
        if len(text) > MAX_CHUNK:
            parts, cur = [], ""
            for para in text.split("\n\n"):
                if len(cur) + len(para) > MAX_CHUNK and cur:
                    parts.append(cur); cur = ""
                cur += para + "\n\n"
            parts.append(cur)
        for i, p in enumerate(parts):
            chunks.append({"file": rel, "heading": cur_head, "part": i,
                           "crumbs": path, "text": p.strip()})

    for line in lines:
        h = re.match(r"^(#{1,6})\s+(.*)", line)
        if h:
            flush(); buf = []
            lvl = len(h.group(1)); cur_head = h.group(2).strip()
            if lvl == 1 and not title:
                title = cur_head
            crumbs = {k: v for k, v in crumbs.items() if k < lvl}
            crumbs[lvl] = cur_head
        else:
            buf.append(line)
    flush()
    doc = {"file": rel, "title": title or rel, "status": meta.get("status", ""),
           "glasnik": meta.get("sluzbeni_glasnik", ""), "tip": meta.get("tip_dokumenta", ""),
           "izvor": rel.split("/")[0]}
    return doc, chunks

# ---------- indeks ----------
def md_files(base):
    for src in SOURCES:
        root = os.path.join(base, src)
        for dp, _, fs in os.walk(root):
            for f in sorted(fs):
                if f.endswith(".md") and f not in SKIP_FILES and not f.startswith("00-"):
                    yield os.path.relpath(os.path.join(dp, f), base).replace(os.sep, "/")

def load_paths(base):
    """U ZIP-u su imena fajlova očišćena; _putanje.json vraća originalnu putanju iz repoa."""
    p = os.path.join(base, "_putanje.json")
    if os.path.exists(p):
        with open(p, encoding="utf-8") as f:
            return json.load(f)
    return {}

def build_index(base):
    files = list(md_files(base))
    sig = hashlib.md5("".join(f + str(os.path.getmtime(os.path.join(base, f))) for f in files).encode()).hexdigest()
    cache = os.path.join("/tmp", f"cortex_idx_{sig}.pkl")
    if os.path.exists(cache):
        with open(cache, "rb") as f:
            return pickle.load(f)
    docs, chunks = {}, []
    for rel in files:
        d, cs = chunk_file(base, rel)
        docs[rel] = d
        chunks.extend(cs)
    df, tfs = Counter(), []
    for c in chunks:
        # naslov dokumenta i poglavlja nose dodatnu težinu
        tf = Counter(tokens(c["text"]) + tokens(c["heading"] + " " + c["crumbs"]) * 2
                     + tokens(docs[c["file"]]["title"]))
        tfs.append(tf); df.update(tf.keys())
    avgdl = sum(sum(t.values()) for t in tfs) / max(len(tfs), 1)
    idx = {"docs": docs, "chunks": chunks, "tfs": tfs, "df": df, "avgdl": avgdl, "orig": load_paths(base)}
    try:
        with open(cache, "wb") as f:
            pickle.dump(idx, f)
    except OSError:
        pass
    return idx

def search(idx, query, top, izvor=None, k1=1.4, b=0.75):
    q = tokens(query)
    N, scores = len(idx["chunks"]), []
    for i, (c, tf) in enumerate(zip(idx["chunks"], idx["tfs"])):
        if izvor and not c["file"].startswith(izvor):
            continue
        dl, s = sum(tf.values()), 0.0
        for t in q:
            if t in tf:
                n = idx["df"][t]
                s += math.log(1 + (N - n + 0.5) / (n + 0.5)) * tf[t] * (k1 + 1) / (tf[t] + k1 * (1 - b + b * dl / idx["avgdl"]))
        if s > 0:
            scores.append((s, i))
    scores.sort(reverse=True)
    return scores[:top]

# ---------- ispis ----------
idx_orig = {}

def link(cfg, c):
    tpl = cfg.get("viewer_url_template")
    if not tpl:
        return ""
    return tpl.replace("{path}", idx_orig.get(c["file"], c["file"])).replace("{anchor}", c["heading"].replace(" ", "%20"))

def show(idx, cfg, c, score=None, full=False):
    d = idx["docs"][c["file"]]
    text = c["text"] if full or len(c["text"]) <= SNIPPET else c["text"][:SNIPPET] + "\n[… skraćeno — za ceo deo koristi --full]"
    status = d["status"] or ("sažetak BBD-a" if "KARTICA" in d["tip"].upper() else "")
    print("=" * 70)
    print(f"DOKUMENT: {d['title']}")
    meta = [f"izvor: {d['izvor']}", f"fajl: {c['file']}"]
    if d["glasnik"]: meta.append(f"Sl. glasnik: {d['glasnik']}")
    if status: meta.append(f"status: {status}")
    print(" | ".join(meta))
    print(f"DEO: {(c['crumbs'] + ' › ') if c['crumbs'] else ''}{c['heading']}" + (f" (nastavak {c['part']})" if c["part"] else ""))
    u = link(cfg, c)
    if u: print(f"LINK: {u}")
    if score is not None: print(f"relevantnost: {score:.1f}")
    print("-" * 70)
    print(text)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("query", nargs="?", default="")
    ap.add_argument("--top", type=int, default=8)
    ap.add_argument("--izvor", choices=SOURCES)
    ap.add_argument("--full", metavar="FAJL#NASLOV", help="ispiši ceo deo")
    ap.add_argument("--list", action="store_true")
    a = ap.parse_args()
    base, cfg = find_base(), load_config()
    idx = build_index(base)
    idx_orig.update(idx.get("orig", {}))
    ver = cfg.get("verzija_baze", "lokalni repo")
    if a.list:
        print(f"BBD Cortex baza — verzija: {ver} — {len(idx['docs'])} dokumenata, {len(idx['chunks'])} delova\n")
        for d in sorted(idx["docs"].values(), key=lambda x: x["file"]):
            print(f"- [{d['izvor']}] {d['title']} ({d['status'] or '-'}) — {d['file']}")
        return
    if a.full:
        f, _, h = a.full.partition("#")
        hits = [c for c in idx["chunks"] if c["file"] == f and (not h or norm(c["heading"]).strip(" .") == norm(h).strip(" ."))]
        if not hits:
            sys.exit("Nije pronađeno. Proveri putanju i naslov (kao u polju DEO).")
        for c in hits:
            show(idx, cfg, c, full=True)
        return
    if not a.query:
        ap.error("unesi upit")
    res = search(idx, a.query, a.top, a.izvor)
    print(f"# Verzija baze: {ver} | upit: {a.query} | pogodaka: {len(res)}")
    if not res:
        print("NEMA POGODAKA — probaj sinonime, drugi padež ili širi pojam.")
    for s, i in res:
        show(idx, cfg, idx["chunks"][i], s)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Pakuje BBD Cortex skill za claude.ai.

Uzima skill iz .claude/skills/cortex-qa/, dodaje MD bazu (pravilnici, standardi, knjige)
u reference/, upisuje verziju i pravi ZIP.

  python3 scripts/build_skill_zip.py                       # -> dist/bbd-cortex-skill.zip
  python3 scripts/build_skill_zip.py --out cortex-app/downloads

Samo standardna Python biblioteka (radi i u Cloudflare Pages build-u).
"""
import argparse, datetime, json, os, re, shutil, subprocess, sys, unicodedata, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKILL_SRC = os.path.join(ROOT, ".claude", "skills", "cortex-qa")
SOURCES = ("pravilnici", "standardi", "knjige")
LIMIT_MB = 30  # limit za skill (nekompresovano)

def safe_seg(seg):
    """claude.ai odbija ZIP sa razmacima, kvačicama, zagradama itd. u putanjama."""
    seg = seg.replace("đ", "dj").replace("Đ", "Dj")
    seg = unicodedata.normalize("NFKD", seg)
    seg = "".join(ch for ch in seg if not unicodedata.combining(ch))
    seg = re.sub(r"[^A-Za-z0-9._-]+", "-", seg)
    seg = re.sub(r"-{2,}", "-", seg).strip("-.")
    return seg or "x"

def safe_path(rel):
    return "/".join(safe_seg(s) for s in rel.replace(os.sep, "/").split("/"))

def git_sha():
    try:
        return subprocess.check_output(["git", "rev-parse", "--short", "HEAD"], cwd=ROOT, text=True, stderr=subprocess.DEVNULL).strip()
    except Exception:
        return os.environ.get("CF_PAGES_COMMIT_SHA", "")[:7]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="dist")
    ap.add_argument("--viewer-url", default=os.environ.get("CORTEX_VIEWER_URL"),
                    help="šablon linka, npr. https://cortex.bbdcons.com/#/{path}#{anchor}")
    a = ap.parse_args()

    out = os.path.join(ROOT, a.out)
    build = os.path.join(ROOT, ".build-skill", "cortex-qa")
    shutil.rmtree(os.path.dirname(build), ignore_errors=True)
    shutil.copytree(SKILL_SRC, build, ignore=shutil.ignore_patterns("__pycache__", "reference"))

    total, n, manifest = 0, 0, {}
    for src in SOURCES:
        s = os.path.join(ROOT, src)
        if not os.path.isdir(s):
            continue
        for dp, _, fs in os.walk(s):
            for f in fs:
                if not f.endswith(".md"):
                    continue
                rel = os.path.relpath(os.path.join(dp, f), ROOT).replace(os.sep, "/")
                safe = safe_path(rel)
                base_safe, k = safe, 2
                while safe in manifest:          # dva imena koja se svedu na isto
                    safe = base_safe[:-3] + f"-{k}.md"; k += 1
                manifest[safe] = rel
                dst = os.path.join(build, "reference", safe)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(os.path.join(ROOT, rel), dst)
                total += os.path.getsize(dst); n += 1

    json.dump(manifest, open(os.path.join(build, "reference", "_putanje.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=0)
    renamed = sum(1 for k, v in manifest.items() if k != v)

    ver = datetime.date.today().isoformat() + (f" ({git_sha()})" if git_sha() else "")
    cfg_path = os.path.join(build, "config.json")
    cfg = json.load(open(cfg_path, encoding="utf-8")) if os.path.exists(cfg_path) else {}
    cfg["verzija_baze"] = ver
    if a.viewer_url:
        cfg["viewer_url_template"] = a.viewer_url
    json.dump(cfg, open(cfg_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    size_mb = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(build) for f in fs) / 1e6
    os.makedirs(out, exist_ok=True)
    zpath = os.path.join(out, "bbd-cortex-skill.zip")
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for dp, _, fs in os.walk(build):
            for f in fs:
                p = os.path.join(dp, f)
                arc = os.path.relpath(p, os.path.dirname(build)).replace(os.sep, "/")
                if not re.fullmatch(r"[A-Za-z0-9._/-]+", arc):
                    sys.exit(f"Nedozvoljen znak u putanji: {arc}")
                z.write(p, arc)
    json.dump({"verzija": ver, "dokumenata": n, "velicina_mb": round(size_mb, 1)},
              open(os.path.join(out, "bbd-cortex-skill.json"), "w", encoding="utf-8"), ensure_ascii=False)
    shutil.rmtree(os.path.dirname(build), ignore_errors=True)

    print(f"OK: {zpath} | verzija {ver} | {n} MD fajlova ({renamed} preimenovano) | {size_mb:.1f} MB nekompresovano | ZIP {os.path.getsize(zpath)/1e6:.1f} MB")
    if size_mb > LIMIT_MB:
        print(f"UPOZORENJE: skill je veći od {LIMIT_MB} MB — podeliti na dva skill-a (npr. propisi+standardi / knjige).", file=sys.stderr)
        sys.exit(2)

if __name__ == "__main__":
    main()

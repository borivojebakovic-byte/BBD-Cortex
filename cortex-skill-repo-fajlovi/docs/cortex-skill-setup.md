# BBD Cortex skill — tehničko podešavanje (za održavanje)

## Struktura u repou

```
.claude/skills/cortex-qa/      <- izvor skill-a (Claude Code / Cowork ga koriste direktno nad repoom)
  SKILL.md
  config.json
  scripts/search.py
scripts/build_skill_zip.py     <- pakuje skill + pravilnici/ standardi/ knjige/ u ZIP
docs/cortex-skill-uputstvo.md  <- uputstvo za kolege
```

## Automatsko pakovanje na Cloudflare Pages

Cloudflare → Workers & Pages → projekat → Settings → Build:

- **Build command:** `python3 scripts/build_skill_zip.py --out cortex-app/downloads`
- **Build output directory:** `cortex-app` (ostaje kao i do sada)
- (opciono) Environment variable `CORTEX_VIEWER_URL` = šablon linka ka vieweru, npr. `https://cortex.bbdcons.com/#/{path}#{anchor}` — upisati tačan format koji viewer koristi.

Posle svakog push-a Pages pravi `cortex-app/downloads/bbd-cortex-skill.zip` i `bbd-cortex-skill.json` (verzija, broj dokumenata). ZIP se ne commit-uje u repo; dodati u `.gitignore`:

```
dist/
.build-skill/
cortex-app/downloads/
```

Ako build command već postoji, dodati ovu komandu ispred nje sa `&&`.

## Dugme za preuzimanje u cortex-app

```html
<a class="skill-download" href="/downloads/bbd-cortex-skill.zip" download>
  BBD Cortex skill (ZIP) <span id="skill-ver"></span>
</a>
<script>
fetch('/downloads/bbd-cortex-skill.json').then(r => r.json())
  .then(v => document.getElementById('skill-ver').textContent = '· ' + v.verzija)
  .catch(() => {});
</script>
```

Link je iza iste lozinke kao i ostatak sajta.

## Lokalno

```
python3 scripts/build_skill_zip.py          # -> dist/bbd-cortex-skill.zip
python3 .claude/skills/cortex-qa/scripts/search.py "upit"   # test pretrage nad repoom
```

## Limit

Skill mora biti < 30 MB nekompresovano; build prijavljuje upozorenje. Kada `knjige/` preraste limit, podeliti na dva skill-a.

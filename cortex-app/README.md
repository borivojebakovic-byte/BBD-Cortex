# BBD Cortex — web app (MVP)

A document viewer and search over the whole BBD Cortex knowledge base — `pravilnici/`,
`standardi/`, and every numbered training chapter (`01-document-management/`, `02-cad-standard/`,
…) — meant to run at **cortex.bbdcons.com**. This is Phase 1 from the MVP plan: browsing and
search, read-only, no chat/Q&A yet (that's Phase 2).

## How it works

- **No build step, no dependencies to install.** The app is plain HTML/CSS/JS. Markdown is
  rendered in the browser using a vendored copy of [marked](https://marked.js.org)
  (`assets/marked.umd.js`). The only external request is the **Plus Jakarta Sans** font from
  Google Fonts (same typeface as bbdcons.com); if it can't load, the page falls back to Segoe UI /
  system sans-serif. To self-host it later, put the woff2 files in `assets/fonts/`, add
  `@font-face` rules to `style.css`, and remove the Google Fonts `<link>` from `index.html`.
- **The repo root stays the single source of truth.** This app reads documents directly from
  the repo root (one level up) — it never copies or duplicates that content. Edit a document
  anywhere in the repo, refresh the browser, see the change.
- **`build.js`** scans every top-level content folder in the repo root (skipping `cortex-app/`,
  `setup/`, `.git/`) and generates two small JSON files this app reads:
  - `manifest.json` — a nested folder/document tree, for the sidebar (each top-level folder is
    always shown, even if currently empty, e.g. `standardi/`)
  - `search-index.json` — full text of every document (lowercased), for search
  Run it again whenever documents, chapters, or folders are added, removed, or renamed:
  ```
  node build.js
  ```
  (Title, edit, or delete a document without re-running this and the sidebar/search will be
  out of date until you do.)

## Running it locally

No npm install needed — just Node.js (any recent version).

```
node serve.js
```

Then open http://localhost:8080/. `serve.js` serves the *repo root* (not just this folder),
because the app needs every top-level content folder (`../pravilnici`, `../standardi`, the
numbered chapters, …) to be reachable too — that's the same shape it needs in production.

## Deploying to cortex.bbdcons.com

Point any static file host at the **repo root** (the `BBD-Cortex` folder), so that both
`/cortex-app/` and `/pravilnici/` are served from the same origin — for example:

- **nginx / Apache / IIS**: set the document root to the repo folder; `cortex-app/index.html`
  as the default document, or redirect `/` → `/cortex-app/`.
- **A static host that only serves one folder** (Netlify, GitHub Pages, Cloudflare Pages):
  set the publish/output directory to the repo root, not `cortex-app/`.

No server-side code runs — it's static files end to end. Re-run `node build.js` and redeploy
(or wire it to a GitHub Action later) whenever `pravilnici/` content changes.

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Page shell |
| `assets/app.js` | All app logic: sidebar, routing, markdown fetch/render, search |
| `assets/tools.js` | Tools menu in the top bar + the engineering calculators (route `#tool/<id>`) |
| `assets/style.css` | Styling |
| `assets/marked.umd.js` | Vendored markdown renderer (no CDN dependency) |
| `build.js` | Regenerates `manifest.json` / `search-index.json` by scanning the whole repo root |
| `serve.js` | Zero-dependency local preview server |
| `manifest.json`, `search-index.json` | Generated — committed so the app works immediately; regenerate after content changes |

## Home (naslovna strana)

The page shown at `#/` (no hash). The **logo in the top-left corner links back to it** from any
document or tool. It has a larger logo, a short description with document/tool counts, and two
columns of cards (built in `showHome()` in `assets/app.js`):

- **Baza znanja** — Pravilnici, Standardi, Knjige, Program obuke (from the `SECTIONS` list) and
  Help (`docs/cortex-skill-uputstvo.md`). Counts come from `manifest.json`. Each section card
  opens a section page `#cat/<id>` listing all its documents grouped by subfolder.
- **Alati** — one card per tool, generated from `MENU` in `tools.js` (exposed as
  `CortexTools.menu`), so a new tool shows up on Home automatically.
- If `/downloads/bbd-cortex-skill.json` exists (Cloudflare build), a "Preuzmi Claude skill (ZIP)"
  link with the version is shown under the counts.

Styling: accents are thin/thick blue lines and solid blue fills at different opacities
(`--a-05` … `--a-30` in `style.css`); on hover a card's left line thickens to full blue, the card
gets a light blue fill and the icon fills solid blue.

## Tools (Alati)

The top bar has a tools menu built from the `MENU` registry at the top of `assets/tools.js`.
Each tool opens in the content area at `#tool/<id>` (e.g. `#tool/flow-calc`).

- **Hydronic Tools → Flow Calc** — flow from heat load and ΔT, or heat load from flow
  (Q = ṁ·cp·ΔT); water properties (ρ, cp, μ) at mean temperature, glycol presets, manual
  ρ/cp/μ. For the selected pipe range (steel EN 10255 / EN 10220, Viega Prestabo, Viega
  Sanpress, copper EN 1057, PE-X, multilayer) it lists velocity and unit pressure drop R (Pa/m,
  Darcy–Weisbach + Colebrook-White) per size. Pipe ranges live in `PIPE_SETS` in `tools.js`.
- **Hydronic Tools → Safety Valve** — safety valve of a closed hot-water heating system
  (t ≤ 105 °C) per **SRPS EN 12828**: opening pressure p_sv ≤ PS − ρ·g·Δh (weakest component,
  height difference), picked from standard set pressures, with the expansion-vessel check from
  Annex D (p₀ ≥ p_st + p_D + 0.2 bar, p_e ≤ p_sv − 0.5 bar / 0.9·p_sv). Size either from the
  table for diaphragm valves marked "H" (p_sv ≤ 3 bar, ≤ 900 kW per valve, DIN 4751-2) or by
  steam discharge capacity per **SRPS EN ISO 4126-7** (Q_m = Q/r, A = Q_m / (0.2883·C·K_dr·√(p₀/v₀)))
  giving the minimum seat diameter d₀. Tables live in `STEAM`, `SV_SET`, `SV_H` in `tools.js`.
- **Air Tools → Duct Calc** — air flow from heating or sensible cooling load and the
  temperatures before/after the coil (or a known flow), air properties at the leaving-coil
  temperature and given pressure. For a rectangular (a×b) or round (D) duct and the selected
  material (roughness k) it gives velocity, dynamic pressure, Dh, De (Huebscher), Re, λ and unit
  pressure drop R (Pa/m), plus a table of alternative sizes (widths at the same height, or EN 1506
  round sizes) against the recommended velocity for the chosen duct section. Materials, velocity
  ranges and size series live in `DUCT_MATERIALS`, `DUCT_USE`, `ROUND_D`, `RECT_A` in `tools.js`.
- **Air Tools → h-x dijagram** — moist-air state from any two of t, φ, x, h, t_dew, t_wb at a
  given pressure (Magnus saturation pressure, ASHRAE wet-bulb equation), followed by a chain of
  processes (add, reorder, remove steps) — each step starts from the previous state: entered
  state, heating, cooling with ADP (dry or dehumidifying, with bypass factor), steam
  humidification to a target φ, adiabatic humidification with efficiency η, or mixing with a
  second stream (which adds its dry-air mass flow to all following steps). Per step it gives
  sensible, latent and total heat and condensate/added water (kg/h), plus totals, a table of all
  states and a Mollier h-x chart (SVG) of the whole chain.
- **Gas Tools → Gas Calc** — gas consumption B = Q / (H_d · η) for a list of appliances (power,
  efficiency, count) with a simultaneity factor; natural gas / propane / butane / manual
  properties at standard conditions (15 °C, 1013.25 mbar). Pipe sizing for the outdoor line up to
  the KMRS (1–4 bar: PE 100 SDR 11, steel EN 10220 / EN 10255) or the indoor low-pressure
  installation after the KMRS (≤ 100 mbar: steel EN 10255 / Megapress G, EN 10220, copper EN 1057 /
  Profipress G, multilayer) using the isothermal flow equation with Colebrook-White friction;
  criteria w_max and Δp_max, with the low-pressure limits from the Serbian regulation (čl. 84:
  2.6 mbar total, 0.3 / 0.8 / 0.5 mbar per part, exceedance only at w ≤ 6 m/s).
- On phones all tool menus collapse into one **Alati** menu grouped by area.

To add a tool: add an entry to `MENU` (new menu = new object, new tool = new item in `tools`)
and write its `render(el, menu)` function. No build step needed.

## Content structure

Each top-level folder is one section in the sidebar:

- `pravilnici/` — laws and regulations, grouped into subfolders by area (HVAC, buka, …)
- `standardi/` — domestic and international standards (folder created, awaiting content)
- `NN-slug/` (e.g. `02-cad-standard/`) — one folder per training-manual chapter, converted from
  the internal "Program obuke pripravnika" Word document. Each has its own `.md` file (with a
  small frontmatter block: `naziv`, `poglavlje`, `izvor`, `preuzeto`, `napomena`) and, where
  needed, a `media/` subfolder with that chapter's own images. New chapters just need a new
  numbered folder — `build.js` picks them up automatically, sorted by chapter number.

`Primeri proračuna` and `Primeri projekata` referenced inside a chapter live on BBD's internal
network (e.g. `X:\...`, `Y:\...`), not in this repo — they're written into the chapter text as
plain references, not as working links, since the app itself can't reach network drives.

## Known limitations (MVP, by design)

- Search loads the full `search-index.json` (~2 MB today) into the browser on first search.
  Fine at this content size; as more chapters and standards are added, this is the first thing
  to revisit (e.g. move to the Phase 2 chat/RAG layer, which needs server-side retrieval anyway).
- No accounts or access control — anyone who can reach the URL can read everything.
- Category README files are skipped in the sidebar and not yet shown anywhere.

## Why not Docusaurus (as originally planned)?

The plan doc suggested Docusaurus. In practice, this environment's sandbox couldn't reach the
npm registry to install it, so this MVP was built as a small dependency-free app instead — it
ends up simpler to deploy anyway (no build pipeline required for Phase 1). Docusaurus (or
Next.js) remains a fine option to revisit for Phase 2 if the chat/RAG layer ends up wanting a
proper app framework.

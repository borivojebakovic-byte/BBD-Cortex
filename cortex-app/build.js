#!/usr/bin/env node
/**
 * BBD Cortex - content build script
 *
 * Scans the REPO ROOT (one level up from this file) for content folders —
 * pravilnici/, standardi/, knjige/, administracija/, program-obuke/ (one
 * NN-slug/ subfolder per training chapter), help/, and any future top-level
 * folder — and generates two static JSON files this
 * app reads at runtime:
 *   - manifest.json     a nested folder/doc tree (for the sidebar)
 *   - search-index.json full text of every document, lowercased (for search)
 *
 * No dependencies. Run again any time content changes:
 *   node build.js
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const OUT_MANIFEST = path.join(__dirname, 'manifest.json');
const OUT_INDEX = path.join(__dirname, 'search-index.json');

// Folders at the repo root that are tooling or build output, not content.
const EXCLUDE_TOP = new Set([
  'cortex-app', 'setup', 'functions', 'scripts', 'Claude outputs',
  'downloads', 'dist', '.build-skill', '.git', '.claude', 'node_modules',
]);

// Friendly labels for pravilnici's own subfolders.
const PRAVILNICI_LABELS = {
  'bezbednost-i-zdravlje-na-radu': 'Bezbednost i zdravlje na radu',
  buka: 'Buka',
  garaze: 'Garaže',
  'gasne-instalacije': 'Gasne instalacije',
  'grad-beograd': 'Grad Beograd',
  hvac: 'HVAC',
  'planiranje-i-izgradnja': 'Planiranje i izgradnja',
  'protivpozarna-zastita': 'Protivpožarna zaštita',
  'sigurnosni-sistemi': 'Sigurnosni sistemi',
  'zastita-zivotne-sredine': 'Zaštita životne sredine',
};

// Top-level sections, in sidebar order (same order as the home page cards).
// Any other content folder is listed after these, alphabetically.
const TOP_ORDER = ['pravilnici', 'standardi', 'knjige', 'administracija', 'program-obuke', 'help'];
const TOP_LABELS = {
  pravilnici: 'Pravilnici',
  standardi: 'Standardi',
  knjige: 'Knjige',
  administracija: 'Administracija',
  'program-obuke': 'Program obuke',
  help: 'Help',
};

// Kept upper-case when title-casing a chapter name derived from ALL-CAPS text.
const ACRONYMS = new Set(['CAD', 'LEED', 'IBC', 'VAV', 'CAV', 'PP', 'VRF', 'EID', 'BMS', 'ELV', 'LV', 'XREF']);

function titleCase(s) {
  return s.split(' ').map((w) => {
    if (!w) return w;
    if (ACRONYMS.has(w.toUpperCase())) return w.toUpperCase();
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(' ');
}

function extractTitle(raw, fallback) {
  for (const rawLine of raw.split('\n')) {
    const line = rawLine.trim();
    if (line.startsWith('# ')) return line.slice(2).trim();
  }
  return fallback;
}

// chapter folders (inside program-obuke/) look like "NN-some-slug"
const CHAPTER_RE = /^(\d+)-/;
const CHAPTERS_TOP = 'program-obuke';

function topLevelSortKey(name) {
  const i = TOP_ORDER.indexOf(name);
  return i !== -1 ? [0, i, name] : [1, 0, name];
}

function labelFor(name, depth, parentSlug) {
  if (depth === 0) {
    if (TOP_LABELS[name]) return TOP_LABELS[name];
    return titleCase(name.replace(/-/g, ' '));
  }
  if (parentSlug === 'pravilnici' && PRAVILNICI_LABELS[name]) return PRAVILNICI_LABELS[name];
  if (parentSlug === CHAPTERS_TOP && depth === 1) {
    const m = CHAPTER_RE.exec(name);
    if (m) {
      const rest = name.slice(m[0].length).replace(/-/g, ' ');
      return `${parseInt(m[1], 10)}. ${titleCase(rest)}`;
    }
  }
  return titleCase(name.replace(/-/g, ' '));
}

// Chapters sort by number (1, 2, … 10), everything else by label.
function compareFolders(a, b) {
  const ma = CHAPTER_RE.exec(a.name), mb = CHAPTER_RE.exec(b.name);
  if (ma && mb) return parseInt(ma[1], 10) - parseInt(mb[1], 10) || a.name.localeCompare(b.name, 'sr');
  return a.label.localeCompare(b.label, 'sr');
}

const searchDocs = [];

// Returns { node, docCount } where docCount is the number of visible (non-readme) docs anywhere in the subtree.
function walk(dir, relSlug, depth, breadcrumb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => !e.name.startsWith('.'));
  const docs = [];
  const folders = [];

  for (const entry of entries) {
    if (entry.name === 'media') continue; // images, not content
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const childSlug = relSlug ? `${relSlug}/${entry.name}` : entry.name;
      const childLabel = labelFor(entry.name, depth, relSlug ? relSlug.split('/')[0] : null);
      const result = walk(full, childSlug, depth + 1, breadcrumb.concat(childLabel));
      folders.push({ name: entry.name, label: childLabel, ...result });
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      const raw = fs.readFileSync(full, 'utf8');
      const isReadme = entry.name.toLowerCase() === 'readme.md';
      const relPath = path.relative(REPO_ROOT, full).split(path.sep).join('/');
      const title = extractTitle(raw, entry.name.replace(/\.md$/i, ''));
      const doc = { type: 'doc', path: relPath, title, category: breadcrumb.join(' / '), sizeBytes: Buffer.byteLength(raw, 'utf8'), isReadme };
      docs.push(doc);
      if (!isReadme) {
        searchDocs.push({ path: relPath, title, category: breadcrumb.join(' / '), text: raw.toLowerCase() });
      }
    }
  }

  docs.sort((a, b) => a.path.localeCompare(b.path, 'sr'));
  folders.sort(compareFolders);

  const visibleDocs = docs.filter((d) => !d.isReadme);
  const docCount = visibleDocs.length + folders.reduce((s, f) => s + f.docCount, 0);

  const node = {
    type: 'folder',
    slug: relSlug,
    label: depth === 0 ? labelFor(path.basename(dir), 0, null) : breadcrumb[breadcrumb.length - 1],
    children: [...visibleDocs, ...folders.map((f) => f.node)],
  };
  return { node, docCount };
}

const topNames = fs.readdirSync(REPO_ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !e.name.startsWith('_') && !EXCLUDE_TOP.has(e.name))
  .map((e) => e.name)
  .sort((a, b) => {
    const ka = topLevelSortKey(a), kb = topLevelSortKey(b);
    if (ka[0] !== kb[0]) return ka[0] - kb[0];
    if (ka[1] !== kb[1]) return ka[1] - kb[1];
    return ka[2].localeCompare(kb[2], 'sr');
  });

const tree = [];
for (const name of topNames) {
  const label = labelFor(name, 0, null);
  const { node, docCount } = walk(path.join(REPO_ROOT, name), name, 1, [label]);
  node.label = label;
  // Always show a top-level section (even an empty placeholder like administracija/);
  // an empty nested subfolder (e.g. a pravilnici category with only a README) stays hidden.
  tree.push(node);
}

fs.writeFileSync(OUT_MANIFEST, JSON.stringify({ tree }, null, 2), 'utf8');
fs.writeFileSync(OUT_INDEX, JSON.stringify(searchDocs), 'utf8');

function countDocs(node) {
  return node.children.reduce((sum, c) => sum + (c.type === 'doc' ? 1 : countDocs(c)), 0);
}
const totalDocs = tree.reduce((sum, n) => sum + countDocs(n), 0);
const indexSizeMb = (fs.statSync(OUT_INDEX).size / 1024 / 1024).toFixed(2);
console.log(`Built manifest.json: ${tree.length} top-level sections, ${totalDocs} documents.`);
console.log(`Built search-index.json (${indexSizeMb} MB).`);

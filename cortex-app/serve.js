#!/usr/bin/env node
/**
 * BBD Cortex - zero-dependency static file server for local preview.
 *
 * Serves the REPO ROOT (one level up from this file), not just cortex-app/,
 * because the app fetches document content from ../pravilnici at runtime.
 * This mirrors how the app should be deployed: point any static file host
 * (nginx, IIS, Apache, GitHub Pages, etc.) at the repo root, or a reverse
 * proxy that serves cortex-app/ as / and pravilnici/ as /pravilnici/.
 *
 * Usage: node serve.js [port]   (default port 8080)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.argv[2]) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') {
    // Redirect so the browser's address bar (and therefore relative URLs
    // like "assets/style.css") resolve against /cortex-app/, not /.
    res.writeHead(302, { Location: '/cortex-app/' });
    res.end();
    return;
  }
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  const filePath = path.normalize(path.join(ROOT, reqPath));

  // prevent path traversal outside the repo root
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found: ' + reqPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`BBD Cortex preview running at http://localhost:${PORT}/`);
  console.log(`Serving repo root: ${ROOT}`);
});

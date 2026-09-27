/**
 * BBD Cortex — shared-password gate (Cloudflare Pages Function).
 *
 * Applies to EVERY request on the site (this file's location, functions/_middleware.js
 * at the repo root, makes it a site-wide middleware). Requires HTTP Basic Auth before
 * serving anything — the markdown, images, manifest.json, search-index.json, all of it.
 *
 * The password is never committed here or anywhere in the repo. Set it once in the
 * Cloudflare Pages dashboard: Settings -> Environment variables -> add SITE_PASSWORD
 * as an encrypted secret (and optionally SITE_USER, defaults to "bbd") for both the
 * Production and Preview environments.
 *
 * This is a single shared password, not per-person accounts — simple to hand out to
 * everyone at BBD, but it offers no audit trail and, if it leaks, everyone needs a new
 * one. If that ever becomes a problem, Cloudflare Access (free up to 50 users, email
 * one-time-PIN login, can be restricted to a company email domain) is a stronger
 * drop-in replacement for this same gate.
 */
export async function onRequest(context) {
  const { request, env } = context;

  const expectedPassword = env.SITE_PASSWORD;
  const expectedUser = env.SITE_USER || 'bbd';

  if (!expectedPassword) {
    // Fail closed: if the secret hasn't been configured yet, don't accidentally serve
    // the site openly.
    return new Response('Sajt jos nije podesen (nedostaje SITE_PASSWORD).', { status: 500 });
  }

  const authHeader = request.headers.get('Authorization') || '';
  const [scheme, encoded] = authHeader.split(' ');

  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try {
      decoded = atob(encoded);
    } catch (e) {
      decoded = '';
    }
    const sepIdx = decoded.indexOf(':');
    const user = sepIdx === -1 ? decoded : decoded.slice(0, sepIdx);
    const pass = sepIdx === -1 ? '' : decoded.slice(sepIdx + 1);

    if (user === expectedUser && pass === expectedPassword) {
      return context.next();
    }
  }

  return new Response('Autentifikacija je potrebna za pristup BBD Cortex bazi.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="BBD Cortex"' },
  });
}

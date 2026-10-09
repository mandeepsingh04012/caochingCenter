/**
 * Prerenders every route to static HTML after `vite build`, and generates
 * sitemap.xml and robots.txt. Run via `npm run build`.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, pages, notFoundPage, siteUrl } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');

const HEAD_PATTERN = /<!--app-head:start-->[\s\S]*?<!--app-head:end-->/;
if (!HEAD_PATTERN.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the app-head markers or the #root element.');
}

function toHtml(url, page) {
  const { html, head } = render(url, page);
  return template.replace(HEAD_PATTERN, head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

for (const page of pages) {
  const file = page.path === '/' ? join(dist, 'index.html') : join(dist, page.path.slice(1), 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, toHtml(page.path, page));
  console.log(`  prerendered ${page.path}`);
}
await writeFile(join(dist, '404.html'), toHtml('/404', notFoundPage));
console.log('  prerendered 404.html');

const robots = ['User-agent: *', 'Allow: /'];
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n');
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  console.log('  generated sitemap.xml');
} else {
  console.warn('  ⚠ VITE_SITE_URL is not set — skipped sitemap.xml, canonical URLs and og:image.');
}
await writeFile(join(dist, 'robots.txt'), `${robots.join('\n')}\n`);
await rm(ssrDir, { recursive: true, force: true });
console.log('Prerender complete.');

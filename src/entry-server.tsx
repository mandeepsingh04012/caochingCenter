import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutes } from './App';
import { allPages, pageMeta, type PageMeta } from './config/seo';
import { siteConfig } from './config/site';
import { buildOrganizationJsonLd, getHeadTags } from './lib/seo';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderHead(page: PageMeta): string {
  const tags = getHeadTags(page);
  const lines = [`<title>${escapeHtml(tags.title)}</title>`];
  for (const m of tags.meta) lines.push(`<meta ${m.key}="${m.name}" content="${escapeHtml(m.content)}" />`);
  if (tags.canonical) lines.push(`<link rel="canonical" href="${escapeHtml(tags.canonical)}" />`);
  if (tags.robots) lines.push(`<meta name="robots" content="${tags.robots}" />`);
  const jsonLd = JSON.stringify(buildOrganizationJsonLd()).replace(/</g, '\\u003c');
  lines.push(`<script type="application/ld+json">${jsonLd}</script>`);
  return lines.join('\n    ');
}

export function render(url: string, page: PageMeta): { html: string; head: string } {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: renderHead(page) };
}

export const pages = allPages;
export const notFoundPage = pageMeta.notFound;
export const siteUrl = siteConfig.siteUrl;

import { useEffect } from 'react';
import { siteConfig } from '../config/site';
import type { PageMeta } from '../config/seo';

export interface HeadTags {
  title: string;
  description: string;
  canonical: string | null;
  robots: string | null;
  meta: { key: 'name' | 'property'; name: string; content: string }[];
}

export function buildTitle(title: string): string {
  return title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
}

export function absoluteUrl(path: string): string | null {
  if (!siteConfig.siteUrl) return null;
  return `${siteConfig.siteUrl}${path === '/' ? '/' : path}`;
}

/** Computes all head tags for a page. Shared by the client and the prerenderer. */
export function getHeadTags(page: PageMeta): HeadTags {
  const title = buildTitle(page.title);
  const canonical = page.noindex ? null : absoluteUrl(page.path);
  const ogImage = absoluteUrl('/og-image.png');
  const meta: HeadTags['meta'] = [
    { key: 'name', name: 'description', content: page.description },
    { key: 'property', name: 'og:type', content: 'website' },
    { key: 'property', name: 'og:site_name', content: siteConfig.name },
    { key: 'property', name: 'og:title', content: title },
    { key: 'property', name: 'og:description', content: page.description },
    { key: 'property', name: 'og:locale', content: 'en_IN' },
    { key: 'name', name: 'twitter:card', content: 'summary_large_image' },
    { key: 'name', name: 'twitter:title', content: title },
    { key: 'name', name: 'twitter:description', content: page.description },
  ];
  if (canonical) meta.push({ key: 'property', name: 'og:url', content: canonical });
  if (ogImage) {
    meta.push({ key: 'property', name: 'og:image', content: ogImage });
    meta.push({ key: 'property', name: 'og:image:width', content: '1200' });
    meta.push({ key: 'property', name: 'og:image:height', content: '630' });
    meta.push({ key: 'property', name: 'og:image:alt', content: `${siteConfig.name} — ${siteConfig.tagline}` });
  }
  return { title, description: page.description, canonical, robots: page.noindex ? 'noindex' : null, meta };
}

/**
 * EducationalOrganization structured data using only confirmed details.
 * Optional fields (URL, phone, email, postcode) are included only when configured.
 */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  const { address, contact } = siteConfig;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [address.unit, `${address.locality}, ${address.sector}`].filter(Boolean).join(', '),
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: address.countryCode,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    },
    areaServed: `${address.sector}, ${address.city}`,
  };
  if (siteConfig.siteUrl) {
    data.url = `${siteConfig.siteUrl}/`;
    data.logo = `${siteConfig.siteUrl}/favicon.svg`;
  }
  if (contact.phone) data.telephone = contact.phone;
  if (contact.email) data.email = contact.email;
  return data;
}

function upsertMeta(key: 'name' | 'property', name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Keeps document head tags in sync during client-side navigation. */
export function useDocumentMeta(page: PageMeta): void {
  useEffect(() => {
    const tags = getHeadTags(page);
    document.title = tags.title;
    tags.meta.forEach((m) => upsertMeta(m.key, m.name, m.content));
    setLink('canonical', tags.canonical);
    const robots = document.head.querySelector('meta[name="robots"]');
    if (tags.robots) upsertMeta('name', 'robots', tags.robots);
    else robots?.remove();
  }, [page]);
}

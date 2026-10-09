import { describe, expect, it } from 'vitest';
import { buildOrganizationJsonLd, buildTitle, getHeadTags } from './seo';
import { allPages, pageMeta } from '../config/seo';
import { buildDirectionsUrl } from './maps';

describe('SEO helpers', () => {
  it('gives every page a unique title and description', () => {
    const titles = allPages.map((p) => buildTitle(p.title));
    const descriptions = allPages.map((p) => p.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    descriptions.forEach((d) => expect(d.length).toBeLessThanOrEqual(170));
  });

  it('marks the 404 page noindex', () => {
    expect(getHeadTags(pageMeta.notFound).robots).toBe('noindex');
  });

  it('builds structured data only from confirmed details', () => {
    const data = buildOrganizationJsonLd() as Record<string, unknown> & { address: Record<string, unknown> };
    expect(data['@type']).toBe('EducationalOrganization');
    expect(data.address).toMatchObject({ addressLocality: 'Gurugram', addressRegion: 'Haryana', addressCountry: 'IN' });
    // Not supplied by the academy — must not be invented.
    expect(data.address).not.toHaveProperty('postalCode');
    for (const key of ['aggregateRating', 'review', 'geo', 'openingHours', 'openingHoursSpecification']) {
      expect(data).not.toHaveProperty(key);
    }
  });

  it('encodes the address in directions links', () => {
    const url = buildDirectionsUrl('Orris Market, Sector 89, Gurugram, Haryana, India');
    expect(url).toBe(
      'https://www.google.com/maps/dir/?api=1&destination=Orris%20Market%2C%20Sector%2089%2C%20Gurugram%2C%20Haryana%2C%20India',
    );
    expect(buildDirectionsUrl('x', 'https://maps.app.goo.gl/abc')).toBe('https://maps.app.goo.gl/abc');
  });
});

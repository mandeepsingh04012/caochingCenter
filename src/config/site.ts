import { readEnv } from './env';

/**
 * ============================================================================
 *  TEJAS ACADEMY — CENTRAL BUSINESS CONFIGURATION
 * ============================================================================
 *  Edit this file to update business details shown across the website.
 *
 *  Rules:
 *   - Use `null` for anything not yet confirmed. The UI will show an honest
 *     "Contact us for details" state instead of inventing information.
 *   - Contact numbers, email, map and form endpoint come from environment
 *     variables (see `.env.example`) so they are never hard-coded here.
 * ============================================================================
 */

export type ClassLevel = 6 | 7 | 8 | 9 | 10;

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Public site URL without trailing slash, e.g. https://www.example.in */
  siteUrl: string | null;
  address: {
    /** The address exactly as confirmed by the academy. */
    full: string;
    locality: string;
    sector: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    /** Shop / unit number. Not yet confirmed. */
    unit: string | null;
    /** Postal code. Not yet confirmed. */
    postalCode: string | null;
  };
  contact: {
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
  };
  /** e.g. "Monday to Saturday, 3:00 pm – 8:00 pm". Not yet confirmed. */
  openingHours: string | null;
  classes: readonly ClassLevel[];
  /** Board / curriculum followed, e.g. "CBSE". Not yet confirmed. */
  curriculum: string | null;
  /**
   * Demo / trial class availability.
   * `null` = not confirmed, `true` = available, `false` = not offered.
   */
  demoClassAvailable: boolean | null;
  /** Optional extra detail shown when a demo class is available. */
  demoClassNote: string | null;
  map: {
    /** Google Maps embed `src` URL. */
    embedUrl: string | null;
    /** Exact Google Maps place URL; falls back to an address search. */
    placeUrl: string | null;
  };
  /** Endpoint that receives enquiry form submissions (JSON POST). */
  enquiryEndpoint: string | null;
  analyticsEnabled: boolean;
  social: {
    instagram: string | null;
    facebook: string | null;
    youtube: string | null;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Tejas Academy',
  shortName: 'Tejas',
  tagline: 'Strong Concepts. Brighter Futures.',
  description:
    'Tejas Academy offers classroom tuition and academic coaching for Classes 6 to 10 at Orris Market, Sector 89, Gurugram. Build strong fundamentals with structured, concept-based learning.',
  siteUrl: readEnv(import.meta.env.VITE_SITE_URL)?.replace(/\/+$/, '') ?? null,
  address: {
    full: 'Orris Market, Sector 89, Gurugram, Haryana, India',
    locality: 'Orris Market',
    sector: 'Sector 89',
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    countryCode: 'IN',
    unit: null,
    postalCode: null,
  },
  contact: {
    phone: readEnv(import.meta.env.VITE_PHONE_NUMBER),
    whatsapp: readEnv(import.meta.env.VITE_WHATSAPP_NUMBER),
    email: readEnv(import.meta.env.VITE_EMAIL),
  },
  openingHours: null,
  classes: [6, 7, 8, 9, 10],
  curriculum: null,
  demoClassAvailable: null,
  demoClassNote: null,
  map: {
    embedUrl: readEnv(import.meta.env.VITE_MAP_EMBED_URL),
    placeUrl: readEnv(import.meta.env.VITE_MAP_PLACE_URL),
  },
  enquiryEndpoint: readEnv(import.meta.env.VITE_ENQUIRY_ENDPOINT),
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  social: {
    instagram: null,
    facebook: null,
    youtube: null,
  },
};

/**
 * Hero / feature imagery.
 * Set `src` to a photo in /public/images (e.g. '/images/hero-classroom.webp')
 * once you have a photo you own or have licensed — ideally of your own
 * classroom, with written consent from anyone identifiable in it.
 * While `src` is null, a custom illustration is shown instead.
 */
export const imagery: {
  hero: { src: string | null; alt: string; width: number; height: number };
} = {
  hero: {
    src: null,
    alt: 'Students learning together in a bright Tejas Academy classroom',
    width: 1200,
    height: 1400,
  },
};

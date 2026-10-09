import { siteConfig } from '../config/site';
import { buildDirectionsUrl } from './maps';
import { buildTelHref, formatPhoneForDisplay } from './phone';
import { buildWhatsAppLink, generalEnquiryMessage } from './whatsapp';

/** Pre-computed contact links derived from the central configuration. */
export const contactLinks = {
  tel: buildTelHref(siteConfig.contact.phone),
  phoneDisplay: siteConfig.contact.phone ? formatPhoneForDisplay(siteConfig.contact.phone) : null,
  whatsapp: buildWhatsAppLink(siteConfig.contact.whatsapp, generalEnquiryMessage(siteConfig.name)),
  whatsappDisplay: siteConfig.contact.whatsapp ? formatPhoneForDisplay(siteConfig.contact.whatsapp) : null,
  email: siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : null,
  directions: buildDirectionsUrl(siteConfig.address.full, siteConfig.map.placeUrl),
};

/** Config items still missing — surfaced in development only. */
export function getMissingConfig(): string[] {
  const missing: string[] = [];
  if (!siteConfig.siteUrl) missing.push('VITE_SITE_URL (canonical URLs, sitemap)');
  if (!contactLinks.tel) missing.push('VITE_PHONE_NUMBER (click-to-call)');
  if (!contactLinks.whatsapp) missing.push('VITE_WHATSAPP_NUMBER (WhatsApp CTAs and form fallback)');
  if (!siteConfig.enquiryEndpoint) missing.push('VITE_ENQUIRY_ENDPOINT (online form submission)');
  if (!siteConfig.map.embedUrl) missing.push('VITE_MAP_EMBED_URL (map embed)');
  if (!siteConfig.contact.email) missing.push('VITE_EMAIL');
  if (!siteConfig.openingHours) missing.push('openingHours in src/config/site.ts');
  if (!siteConfig.curriculum) missing.push('curriculum in src/config/site.ts');
  return missing;
}

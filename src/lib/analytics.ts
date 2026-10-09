import { siteConfig } from '../config/site';

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Records a conversion event — only when analytics is explicitly enabled
 * (VITE_ANALYTICS_ENABLED=true) and a tag has been installed.
 * Never pass personal data (names, phone numbers, messages) as params.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (!siteConfig.analyticsEnabled || typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params });
  }
}

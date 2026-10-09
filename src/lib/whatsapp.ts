import { toInternationalDigits } from './phone';

/**
 * Builds a safe https://wa.me link with an encoded, prefilled message.
 * Returns null when no valid WhatsApp number is configured, so callers can
 * hide the button rather than render a dead link.
 */
export function buildWhatsAppLink(number: string | null, message?: string): string | null {
  if (!number) return null;
  const digits = toInternationalDigits(number);
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function generalEnquiryMessage(academyName: string): string {
  return `Hello ${academyName}, I would like to know more about admissions for my child.`;
}

export function courseEnquiryMessage(academyName: string, courseLabel: string): string {
  return `Hello ${academyName}, I would like to know more about the ${courseLabel} (admissions, subjects, timings and fees).`;
}

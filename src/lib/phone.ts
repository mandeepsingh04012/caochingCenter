/**
 * Indian mobile number helpers.
 * Accepts common formats: 9876543210, 098765 43210, +91 98765-43210, 91 9876543210.
 */

const SEPARATORS = /[\s\-().]/g;

/** Returns the 10-digit national mobile number, or null if it is not a valid Indian mobile. */
export function normalizeIndianMobile(input: string): string | null {
  let digits = input.trim().replace(SEPARATORS, '');
  if (digits.startsWith('+91')) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function isValidIndianMobile(input: string): boolean {
  return normalizeIndianMobile(input) !== null;
}

/** Digits only, for wa.me and tel: links. Adds the India country code to bare 10-digit numbers. */
export function toInternationalDigits(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10 && /^[6-9]/.test(digits)) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) return `91${digits.slice(1)}`;
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
}

/** Builds a tel: URI, or null if the number is missing or malformed. */
export function buildTelHref(phone: string | null): string | null {
  if (!phone) return null;
  const digits = toInternationalDigits(phone);
  return digits ? `tel:+${digits}` : null;
}

/** Formats a number for display, e.g. "+91 98765 43210". */
export function formatPhoneForDisplay(phone: string): string {
  const digits = toInternationalDigits(phone);
  if (digits && digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

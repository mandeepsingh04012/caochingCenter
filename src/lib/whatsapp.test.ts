import { describe, expect, it } from 'vitest';
import { buildWhatsAppLink, courseEnquiryMessage, generalEnquiryMessage } from './whatsapp';

describe('buildWhatsAppLink', () => {
  it('returns null when no number is configured', () => {
    expect(buildWhatsAppLink(null, 'Hello')).toBeNull();
    expect(buildWhatsAppLink('', 'Hello')).toBeNull();
  });

  it('returns null for malformed numbers instead of a dead link', () => {
    expect(buildWhatsAppLink('12ab', 'Hello')).toBeNull();
  });

  it('uses digits only and adds the India country code', () => {
    expect(buildWhatsAppLink('+91 98765-43210')).toBe('https://wa.me/919876543210');
    expect(buildWhatsAppLink('9876543210')).toBe('https://wa.me/919876543210');
  });

  it('encodes the prefilled message safely', () => {
    const link = buildWhatsAppLink('9876543210', 'Class 10 & fees?\nLine #2 — “quotes”');
    expect(link).toBe(
      `https://wa.me/919876543210?text=${encodeURIComponent('Class 10 & fees?\nLine #2 — “quotes”')}`,
    );
    const url = new URL(link!);
    expect(url.searchParams.get('text')).toBe('Class 10 & fees?\nLine #2 — “quotes”');
    expect(url.hostname).toBe('wa.me');
  });

  it('omits the text parameter for blank messages', () => {
    expect(buildWhatsAppLink('9876543210', '   ')).toBe('https://wa.me/919876543210');
  });
});

describe('enquiry messages', () => {
  it('builds general and course-specific messages', () => {
    expect(generalEnquiryMessage('Tejas Academy')).toContain('Tejas Academy');
    expect(courseEnquiryMessage('Tejas Academy', 'Class 10 Board Preparation')).toContain('Class 10 Board Preparation');
  });
});

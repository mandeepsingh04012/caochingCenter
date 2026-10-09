import { describe, expect, it } from 'vitest';
import { buildTelHref, formatPhoneForDisplay, isValidIndianMobile, normalizeIndianMobile } from './phone';

describe('normalizeIndianMobile', () => {
  it.each([
    ['9876543210', '9876543210'],
    ['98765 43210', '9876543210'],
    ['+91 98765-43210', '9876543210'],
    ['+919876543210', '9876543210'],
    ['919876543210', '9876543210'],
    ['09876543210', '9876543210'],
    ['(987) 654-3210', '9876543210'],
    ['6000000000', '6000000000'],
  ])('accepts %s', (input, expected) => {
    expect(normalizeIndianMobile(input)).toBe(expected);
  });

  it.each(['', '12345', '5876543210', '98765432101', '+1 9876543210', 'abcdefghij', '+92 9876543210', '0123456789'])(
    'rejects %s',
    (input) => {
      expect(isValidIndianMobile(input)).toBe(false);
    },
  );
});

describe('buildTelHref', () => {
  it('returns null when no number is configured', () => {
    expect(buildTelHref(null)).toBeNull();
  });
  it('adds the India country code to a 10-digit number', () => {
    expect(buildTelHref('98765 43210')).toBe('tel:+919876543210');
  });
  it('keeps an international number', () => {
    expect(buildTelHref('+91-98765-43210')).toBe('tel:+919876543210');
  });
  it('rejects malformed numbers', () => {
    expect(buildTelHref('123')).toBeNull();
  });
});

describe('formatPhoneForDisplay', () => {
  it('formats Indian numbers', () => {
    expect(formatPhoneForDisplay('+919876543210')).toBe('+91 98765 43210');
  });
});

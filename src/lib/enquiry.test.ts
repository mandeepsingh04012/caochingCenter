import { describe, expect, it, vi } from 'vitest';
import {
  buildEnquiryMessage,
  emptyEnquiry,
  submitEnquiry,
  toPayload,
  validateEnquiry,
  type EnquiryFormValues,
} from './enquiry';

const valid: EnquiryFormValues = {
  parentName: 'Asha Verma',
  mobile: '98765 43210',
  studentClass: '9',
  subjectPreference: 'Science',
  contactMethod: 'whatsapp',
  message: 'Evening batch preferred',
  consent: true,
};

describe('validateEnquiry', () => {
  it('requires all mandatory fields', () => {
    const errors = validateEnquiry(emptyEnquiry);
    expect(Object.keys(errors).sort()).toEqual(['consent', 'contactMethod', 'mobile', 'parentName', 'studentClass']);
  });

  it('accepts a complete enquiry with optional fields empty', () => {
    expect(validateEnquiry({ ...valid, subjectPreference: '', message: '' })).toEqual({});
  });

  it('rejects invalid Indian mobile numbers', () => {
    expect(validateEnquiry({ ...valid, mobile: '12345' }).mobile).toMatch(/valid 10-digit/);
    expect(validateEnquiry({ ...valid, mobile: '5876543210' }).mobile).toBeDefined();
  });

  it('rejects names with digits and overly long messages', () => {
    expect(validateEnquiry({ ...valid, parentName: 'Asha 123' }).parentName).toBeDefined();
    expect(validateEnquiry({ ...valid, message: 'x'.repeat(501) }).message).toBeDefined();
  });

  it('accepts names in Indian scripts', () => {
    expect(validateEnquiry({ ...valid, parentName: 'आशा वर्मा' }).parentName).toBeUndefined();
  });
});

describe('toPayload and buildEnquiryMessage', () => {
  it('normalises the mobile number and trims text', () => {
    const payload = toPayload({ ...valid, parentName: '  Asha Verma ' }, { course: 'Class 9 Academic Excellence', page: '/' });
    expect(payload).toMatchObject({
      parentName: 'Asha Verma',
      mobile: '+919876543210',
      studentClass: '9',
      course: 'Class 9 Academic Excellence',
      consent: true,
    });
  });

  it('refuses to build a payload from invalid values', () => {
    expect(() => toPayload(emptyEnquiry, { page: '/' })).toThrow();
  });

  it('creates a readable WhatsApp message without empty optional lines', () => {
    const message = buildEnquiryMessage(toPayload({ ...valid, subjectPreference: '', message: '' }, { page: '/' }), 'Tejas Academy');
    expect(message).toContain('Parent/Guardian: Asha Verma');
    expect(message).toContain("Student's class: Class 9");
    expect(message).toContain('Preferred contact: WhatsApp');
    expect(message).not.toContain('Subject preference');
    expect(message).not.toContain('Message:');
  });
});

describe('submitEnquiry', () => {
  const payload = toPayload(valid, { page: '/' });

  it('reports not-configured without calling fetch when no endpoint is set', async () => {
    const fetchImpl = vi.fn();
    await expect(submitEnquiry(payload, { endpoint: null, fetchImpl })).resolves.toEqual({ status: 'not-configured' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('POSTs JSON and reports success on 2xx', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    const result = await submitEnquiry(payload, { endpoint: 'https://example.test/enquiry', fetchImpl });
    expect(result).toEqual({ status: 'sent' });
    const [url, init] = fetchImpl.mock.calls[0]!;
    expect(url).toBe('https://example.test/enquiry');
    expect(init.method).toBe('POST');
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(init.body)).toMatchObject({ mobile: '+919876543210' });
  });

  it('reports a server error on non-2xx responses', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('nope', { status: 500 }));
    await expect(submitEnquiry(payload, { endpoint: 'https://example.test', fetchImpl })).resolves.toEqual({
      status: 'error',
      reason: 'server',
    });
  });

  it('reports a network error when fetch rejects', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(submitEnquiry(payload, { endpoint: 'https://example.test', fetchImpl })).resolves.toEqual({
      status: 'error',
      reason: 'network',
    });
  });

  it('times out slow requests', async () => {
    const fetchImpl = vi.fn(
      (_url: string, init: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        }),
    );
    await expect(
      submitEnquiry(payload, { endpoint: 'https://example.test', fetchImpl: fetchImpl as unknown as typeof fetch, timeoutMs: 10 }),
    ).resolves.toEqual({ status: 'error', reason: 'timeout' });
  });
});

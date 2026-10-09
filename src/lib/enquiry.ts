import type { ClassLevel } from '../config/site';
import { normalizeIndianMobile } from './phone';

/**
 * ============================================================================
 *  ENQUIRY SERVICE
 * ============================================================================
 *  Sends admission enquiries to the configured endpoint as JSON:
 *
 *    POST <VITE_ENQUIRY_ENDPOINT>
 *    Content-Type: application/json
 *    { parentName, mobile, studentClass, subjectPreference, contactMethod,
 *      message, course, consent, submittedAt, page }
 *
 *  Any 2xx response counts as success. Works with Formspree, Getform,
 *  Google Apps Script web apps or a custom API.
 *  When no endpoint is configured, `submitEnquiry` reports
 *  "not-configured" so the UI can offer the WhatsApp fallback instead of
 *  pretending the enquiry was sent.
 * ============================================================================
 */

export type ContactMethod = 'phone' | 'whatsapp';

export interface EnquiryFormValues {
  parentName: string;
  mobile: string;
  studentClass: '' | `${ClassLevel}`;
  subjectPreference: string;
  contactMethod: '' | ContactMethod;
  message: string;
  consent: boolean;
}

export type EnquiryField = keyof EnquiryFormValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryFormValues = {
  parentName: '',
  mobile: '',
  studentClass: '',
  subjectPreference: '',
  contactMethod: '',
  message: '',
  consent: false,
};

export const MESSAGE_MAX_LENGTH = 500;
export const NAME_MAX_LENGTH = 80;

export function validateEnquiry(values: EnquiryFormValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = values.parentName.trim();

  if (!name) errors.parentName = 'Please enter the parent or guardian’s name.';
  else if (name.length < 2) errors.parentName = 'Please enter at least 2 characters.';
  else if (name.length > NAME_MAX_LENGTH) errors.parentName = `Please keep the name under ${NAME_MAX_LENGTH} characters.`;
  else if (!/^[\p{L}\p{M}\s.'-]+$/u.test(name)) errors.parentName = 'Please use letters only.';

  if (!values.mobile.trim()) errors.mobile = 'Please enter a mobile number.';
  else if (!normalizeIndianMobile(values.mobile))
    errors.mobile = 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8 or 9).';

  if (!values.studentClass) errors.studentClass = 'Please select the student’s class.';
  if (!values.contactMethod) errors.contactMethod = 'Please choose how you would like us to contact you.';
  if (values.message.length > MESSAGE_MAX_LENGTH)
    errors.message = `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`;
  if (!values.consent) errors.consent = 'Please confirm that we may contact you about this enquiry.';

  return errors;
}

export interface EnquiryPayload {
  parentName: string;
  mobile: string;
  studentClass: string;
  subjectPreference: string;
  contactMethod: ContactMethod;
  message: string;
  course: string | null;
  consent: true;
  submittedAt: string;
  page: string;
}

export function toPayload(values: EnquiryFormValues, context: { course?: string | null; page: string }): EnquiryPayload {
  const mobile = normalizeIndianMobile(values.mobile);
  if (!mobile || !values.contactMethod || !values.consent) {
    throw new Error('Enquiry must be validated before building a payload.');
  }
  return {
    parentName: values.parentName.trim(),
    mobile: `+91${mobile}`,
    studentClass: values.studentClass,
    subjectPreference: values.subjectPreference.trim(),
    contactMethod: values.contactMethod,
    message: values.message.trim(),
    course: context.course ?? null,
    consent: true,
    submittedAt: new Date().toISOString(),
    page: context.page,
  };
}

/** Human-readable enquiry text for the WhatsApp fallback. */
export function buildEnquiryMessage(payload: EnquiryPayload, academyName: string): string {
  const lines = [
    `Hello ${academyName}, I would like to enquire about admission.`,
    '',
    `Parent/Guardian: ${payload.parentName}`,
    `Mobile: ${payload.mobile}`,
    `Student's class: Class ${payload.studentClass}`,
  ];
  if (payload.course) lines.push(`Programme: ${payload.course}`);
  if (payload.subjectPreference) lines.push(`Subject preference: ${payload.subjectPreference}`);
  lines.push(`Preferred contact: ${payload.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Phone call'}`);
  if (payload.message) lines.push('', `Message: ${payload.message}`);
  return lines.join('\n');
}

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'not-configured' }
  | { status: 'error'; reason: 'network' | 'server' | 'timeout' };

export async function submitEnquiry(
  payload: EnquiryPayload,
  options: { endpoint: string | null; fetchImpl?: typeof fetch; timeoutMs?: number },
): Promise<SubmitResult> {
  const { endpoint, fetchImpl = fetch, timeoutMs = 15000 } = options;
  if (!endpoint) return { status: 'not-configured' };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return response.ok ? { status: 'sent' } : { status: 'error', reason: 'server' };
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === 'AbortError';
    return { status: 'error', reason: aborted ? 'timeout' : 'network' };
  } finally {
    clearTimeout(timer);
  }
}

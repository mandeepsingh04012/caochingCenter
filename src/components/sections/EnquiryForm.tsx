import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router';
import { CircleCheck, LoaderCircle, Phone, Send } from 'lucide-react';
import { Button, ButtonLink } from '../ui/Button';
import { FieldError, FormField } from '../ui/FormField';
import { describedBy } from '../../lib/a11y';
import { Notice } from '../ui/Notice';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { siteConfig, type ClassLevel } from '../../config/site';
import { getCourseForClass, type Course } from '../../config/courses';
import { routes } from '../../config/navigation';
import {
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  buildEnquiryMessage,
  emptyEnquiry,
  submitEnquiry,
  toPayload,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryFormValues,
  type EnquiryPayload,
} from '../../lib/enquiry';
import { buildWhatsAppLink } from '../../lib/whatsapp';
import { buildTelHref, formatPhoneForDisplay } from '../../lib/phone';
import { trackEvent } from '../../lib/analytics';
import { cn } from '../../lib/cn';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent'; payload: EnquiryPayload }
  | { kind: 'error' ; payload: EnquiryPayload }
  | { kind: 'whatsapp'; payload: EnquiryPayload };

export interface EnquiryFormProps {
  /** Pre-selects a programme and tailors the enquiry message. */
  course?: Course;
  /** Overrides for testing; default to the central configuration. */
  endpoint?: string | null;
  whatsappNumber?: string | null;
  phoneNumber?: string | null;
  fetchImpl?: typeof fetch;
}

const FIELD_ORDER: EnquiryField[] = ['parentName', 'mobile', 'studentClass', 'subjectPreference', 'contactMethod', 'message', 'consent'];

export function EnquiryForm({
  course,
  endpoint = siteConfig.enquiryEndpoint,
  whatsappNumber = siteConfig.contact.whatsapp,
  phoneNumber = siteConfig.contact.phone,
  fetchImpl,
}: EnquiryFormProps) {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;
  const { pathname } = useLocation();

  const classOptions: readonly ClassLevel[] = course?.classes ?? siteConfig.classes;
  const initialValues = (): EnquiryFormValues => ({
    ...emptyEnquiry,
    studentClass: classOptions.length === 1 ? (String(classOptions[0]) as EnquiryFormValues['studentClass']) : '',
  });
  const [values, setValues] = useState<EnquiryFormValues>(initialValues);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const whatsappAvailable = buildWhatsAppLink(whatsappNumber) !== null;
  const telHref = buildTelHref(phoneNumber);
  const mode: 'endpoint' | 'whatsapp' | 'unavailable' = endpoint ? 'endpoint' : whatsappAvailable ? 'whatsapp' : 'unavailable';

  const selectedClass = values.studentClass ? (Number(values.studentClass) as ClassLevel) : null;
  const programme = course ?? (selectedClass ? getCourseForClass(selectedClass) : undefined);
  const subjectOptions = programme?.subjects ?? null;

  const update = <K extends EnquiryField>(field: K, value: EnquiryFormValues[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (attempted) setErrors(validateEnquiry(next));
    if (status.kind === 'error' || status.kind === 'whatsapp') setStatus({ kind: 'idle' });
  };

  const onText = (field: 'parentName' | 'mobile' | 'subjectPreference' | 'message' | 'studentClass') =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      update(field, e.target.value as never);

  const onBlur = (field: EnquiryField) => () => {
    if (!attempted && !values[field]) return;
    const fieldError = validateEnquiry(values)[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === 'submitting') return;
    setAttempted(true);
    const found = validateEnquiry(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      const target = firstInvalid === 'contactMethod' ? id('contactMethod-phone') : id(firstInvalid);
      document.getElementById(target)?.focus();
      return;
    }

    const payload = toPayload(values, {
      course: programme ? `${programme.classLabel} ${programme.title}` : null,
      page: pathname,
    });

    if (mode === 'whatsapp') {
      setStatus({ kind: 'whatsapp', payload });
      trackEvent('enquiry_whatsapp_prepared', { student_class: payload.studentClass });
      return;
    }

    setStatus({ kind: 'submitting' });
    const result = await submitEnquiry(payload, { endpoint, fetchImpl });
    if (result.status === 'sent') {
      setStatus({ kind: 'sent', payload });
      trackEvent('enquiry_submitted', { student_class: payload.studentClass });
    } else {
      setStatus({ kind: 'error', payload });
    }
  };

  const resetForm = () => {
    setValues(initialValues());
    setErrors({});
    setAttempted(false);
    setStatus({ kind: 'idle' });
  };

  if (status.kind === 'sent') {
    const p = status.payload;
    return (
      <div role="status" className="flex flex-col items-center rounded-card bg-forest-50 px-6 py-12 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-forest text-gold">
          <CircleCheck aria-hidden="true" className="size-7" />
        </span>
        <h3 className="mt-5 text-2xl">Thank you, {p.parentName.split(' ')[0]}.</h3>
        <p className="mt-3 max-w-md text-muted">
          Your enquiry has been sent. Our team will contact you by {p.contactMethod === 'whatsapp' ? 'WhatsApp' : 'phone'} on{' '}
          {formatPhoneForDisplay(p.mobile)}.
        </p>
        <Button variant="outline" className="mt-7" onClick={resetForm}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  if (mode === 'unavailable') {
    return (
      <Notice tone="warning" title="Online enquiries are not available yet">
        <p>
          {telHref
            ? 'Please call us to discuss admissions — our team will be glad to help.'
            : `Please visit us at ${siteConfig.address.full} to discuss admissions.`}
        </p>
        {telHref && (
          <ButtonLink href={telHref} size="sm" icon={<Phone aria-hidden="true" className="size-4" />}>
            Call {formatPhoneForDisplay(phoneNumber ?? '')}
          </ButtonLink>
        )}
        {import.meta.env.DEV && (
          <p className="text-xs">
            Developer: set VITE_ENQUIRY_ENDPOINT and/or VITE_WHATSAPP_NUMBER in .env.local to enable this form.
          </p>
        )}
      </Notice>
    );
  }

  const submitting = status.kind === 'submitting';
  const fallbackLink =
    status.kind === 'error' || status.kind === 'whatsapp'
      ? buildWhatsAppLink(whatsappNumber, buildEnquiryMessage(status.payload, siteConfig.name))
      : null;
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Admission enquiry form" className="space-y-6">
      <p className="text-sm text-muted">
        Fields marked <span className="text-danger">*</span> are required.
      </p>

      <div aria-live="polite" className="sr-only">
        {attempted && errorCount > 0 ? `${errorCount} ${errorCount === 1 ? 'field needs' : 'fields need'} attention.` : ''}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={id('parentName')} label="Parent or guardian name" required error={errors.parentName}>
          <input
            id={id('parentName')}
            name="parentName"
            type="text"
            autoComplete="name"
            maxLength={NAME_MAX_LENGTH + 20}
            className="field-input"
            value={values.parentName}
            onChange={onText('parentName')}
            onBlur={onBlur('parentName')}
            aria-required="true"
            aria-invalid={Boolean(errors.parentName)}
            aria-describedby={describedBy(id('parentName'), errors.parentName)}
          />
        </FormField>

        <FormField id={id('mobile')} label="Mobile number" required error={errors.mobile} hint="10-digit Indian mobile number">
          <div className="flex">
            <span className="inline-flex items-center rounded-l-xl border border-r-0 border-[#cfc4b2] bg-beige-50 px-3.5 text-sm font-medium text-muted">
              +91
            </span>
            <input
              id={id('mobile')}
              name="mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              maxLength={16}
              className="field-input rounded-l-none"
              value={values.mobile}
              onChange={onText('mobile')}
              onBlur={onBlur('mobile')}
              aria-required="true"
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={describedBy(id('mobile'), errors.mobile, '10-digit Indian mobile number')}
            />
          </div>
        </FormField>

        <FormField id={id('studentClass')} label="Student’s class" required error={errors.studentClass}>
          <select
            id={id('studentClass')}
            name="studentClass"
            className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23174C3C%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10"
            value={values.studentClass}
            onChange={onText('studentClass')}
            onBlur={onBlur('studentClass')}
            aria-required="true"
            aria-invalid={Boolean(errors.studentClass)}
            aria-describedby={describedBy(id('studentClass'), errors.studentClass)}
          >
            <option value="">Select class</option>
            {classOptions.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </FormField>

        {subjectOptions && subjectOptions.length > 0 ? (
          <FormField id={id('subjectPreference')} label="Subject preference" error={errors.subjectPreference}>
            <select
              id={id('subjectPreference')}
              name="subjectPreference"
              className="field-input"
              value={values.subjectPreference}
              onChange={onText('subjectPreference')}
            >
              <option value="">Select a subject</option>
              {subjectOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
              <option value="Multiple subjects">Multiple subjects</option>
              <option value="Not sure — need guidance">Not sure — need guidance</option>
            </select>
          </FormField>
        ) : (
          <FormField
            id={id('subjectPreference')}
            label="Subject preference"
            hint="Tell us which subjects your child needs support with."
            error={errors.subjectPreference}
          >
            <input
              id={id('subjectPreference')}
              name="subjectPreference"
              type="text"
              maxLength={120}
              className="field-input"
              value={values.subjectPreference}
              onChange={onText('subjectPreference')}
              aria-describedby={describedBy(id('subjectPreference'), errors.subjectPreference, 'hint')}
            />
          </FormField>
        )}
      </div>

      <fieldset aria-describedby={errors.contactMethod ? id('contactMethod-error') : undefined}>
        <legend className="mb-2 text-sm font-semibold text-deep">
          Preferred contact method<span aria-hidden="true" className="ml-0.5 text-danger">*</span>
          <span className="sr-only"> (required)</span>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(['phone', 'whatsapp'] as const).map((method) => (
            <label
              key={method}
              htmlFor={id(`contactMethod-${method}`)}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3.5 text-sm font-semibold transition-colors has-focus-visible:ring-3 has-focus-visible:ring-gold',
                values.contactMethod === method ? 'border-forest bg-forest-50 text-forest' : 'border-[#cfc4b2] text-deep hover:border-[#a9a08f]',
                errors.contactMethod && 'border-danger',
              )}
            >
              <input
                id={id(`contactMethod-${method}`)}
                type="radio"
                name="contactMethod"
                value={method}
                checked={values.contactMethod === method}
                onChange={() => update('contactMethod', method)}
                className="size-4 accent-forest focus-visible:outline-none"
              />
              {method === 'phone' ? (
                <Phone aria-hidden="true" className="size-4" />
              ) : (
                <WhatsAppIcon className="size-4" />
              )}
              {method === 'phone' ? 'Phone call' : 'WhatsApp'}
            </label>
          ))}
        </div>
        <FieldError id={id('contactMethod-error')} message={errors.contactMethod} />
      </fieldset>

      <FormField id={id('message')} label="Message" error={errors.message}>
        <textarea
          id={id('message')}
          name="message"
          rows={4}
          className="field-input resize-y"
          value={values.message}
          onChange={onText('message')}
          onBlur={onBlur('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy(id('message'), errors.message, 'hint')}
        />
        <p id={`${id('message')}-hint`} className={cn('mt-1.5 text-right text-xs', values.message.length > MESSAGE_MAX_LENGTH ? 'text-danger' : 'text-muted')}>
          {values.message.length}/{MESSAGE_MAX_LENGTH}
        </p>
      </FormField>

      <div>
        <label htmlFor={id('consent')} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
          <input
            id={id('consent')}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-required="true"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id('consent')}-error` : undefined}
            className="mt-1 size-4.5 shrink-0 accent-forest"
          />
          <span>
            I agree that {siteConfig.name} may contact me about this enquiry, and I have read the{' '}
            <Link to={routes.privacy} target="_blank" rel="noopener" className="font-semibold text-forest underline underline-offset-4">
              Privacy Policy
              <span className="sr-only"> (opens in a new tab)</span>
            </Link>
            .<span aria-hidden="true" className="ml-0.5 text-danger">*</span>
          </span>
        </label>
        <FieldError id={`${id('consent')}-error`} message={errors.consent} />
      </div>

      <div aria-live="polite">
        {status.kind === 'error' && (
          <Notice tone="error" role="alert" title="Your enquiry could not be sent">
            <p>Something went wrong while sending. Your details are still in the form — please try again{fallbackLink || telHref ? ', or contact us directly:' : '.'}</p>
            <div className="flex flex-wrap gap-2">
              {fallbackLink && (
                <ButtonLink href={fallbackLink} size="sm" icon={<WhatsAppIcon className="size-4" />}>
                  Send via WhatsApp
                </ButtonLink>
              )}
              {telHref && (
                <ButtonLink href={telHref} size="sm" variant="outline" icon={<Phone aria-hidden="true" className="size-4" />}>
                  Call us
                </ButtonLink>
              )}
            </div>
          </Notice>
        )}
        {status.kind === 'whatsapp' && fallbackLink && (
          <Notice tone="warning" role="status" title="Almost done — your enquiry has not been sent yet">
            <p>
              We have prepared your enquiry as a WhatsApp message. Open WhatsApp and press <strong>Send</strong> to share
              it with our team.
            </p>
            <ButtonLink
              href={fallbackLink}
              icon={<WhatsAppIcon className="size-5" />}
              onClick={() => trackEvent('enquiry_whatsapp_opened', { student_class: status.payload.studentClass })}
            >
              Open WhatsApp to send
            </ButtonLink>
          </Notice>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {mode === 'whatsapp' ? (
          <p className="text-xs text-muted sm:max-w-xs">
            Your details will be prepared as a WhatsApp message. Nothing is sent until you press Send in WhatsApp.
            {import.meta.env.DEV && ' (Developer: set VITE_ENQUIRY_ENDPOINT to submit directly.)'}
          </p>
        ) : (
          <p className="text-xs text-muted sm:max-w-xs">We only use these details to respond to your enquiry.</p>
        )}
        {status.kind !== 'whatsapp' && (
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            aria-disabled={submitting}
            icon={
              submitting ? (
                <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
              ) : mode === 'whatsapp' ? (
                <WhatsAppIcon className="size-5" />
              ) : (
                <Send aria-hidden="true" className="size-5" />
              )
            }
          >
            {submitting ? 'Sending…' : mode === 'whatsapp' ? 'Continue on WhatsApp' : 'Send Enquiry'}
          </Button>
        )}
      </div>
    </form>
  );
}

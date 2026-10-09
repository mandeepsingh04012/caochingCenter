import { Phone } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { EnquiryForm } from './EnquiryForm';
import { ENQUIRY_ANCHOR } from '../../config/navigation';
import { siteConfig } from '../../config/site';
import type { Course } from '../../config/courses';
import { contactLinks } from '../../lib/contact';
import { buildWhatsAppLink, courseEnquiryMessage } from '../../lib/whatsapp';
import { trackEvent } from '../../lib/analytics';

interface EnquirySectionProps {
  course?: Course;
  title?: string;
  intro?: string;
}

const nextSteps = [
  { title: 'Share your details', text: 'Tell us your child’s class and the support they need.' },
  { title: 'We get in touch', text: 'Our team contacts you by phone or WhatsApp, as you prefer.' },
  { title: 'Discuss the right fit', text: 'Talk through subjects, batches and fees, or visit the centre.' },
];

export function EnquirySection({
  course,
  title = 'Give Your Child a Stronger Start.',
  intro = 'Share a few details and our team will get in touch to discuss suitable classes, subjects and the next steps for admission.',
}: EnquirySectionProps) {
  const whatsapp = course
    ? buildWhatsAppLink(siteConfig.contact.whatsapp, courseEnquiryMessage(siteConfig.name, `${course.classLabel} ${course.title}`))
    : contactLinks.whatsapp;

  return (
    <section id={ENQUIRY_ANCHOR} aria-labelledby="enquiry-heading" className="section-y scroll-mt-20 bg-beige">
      <div className="container-page">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-lift lg:grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative overflow-hidden bg-deep p-8 text-forest-100 sm:p-10 lg:p-12">
            <div aria-hidden="true" className="absolute -bottom-32 -left-24 size-80 rounded-full border border-gold/20" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-12 size-56 rounded-full border border-gold/15" />
            <div className="relative">
              <SectionHeading
                id="enquiry-heading"
                tone="inverse"
                eyebrow={course ? `${course.classLabel} admissions` : 'Admission enquiry'}
                title={title}
                intro={intro}
              />
              <h3 className="mt-10 text-sm font-semibold tracking-[0.12em] text-gold! uppercase">What happens next</h3>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/50 text-sm font-bold text-gold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-0.5 text-sm">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {(whatsapp || contactLinks.tel) && (
                <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
                  {whatsapp && (
                    <ButtonLink
                      href={whatsapp}
                      variant="gold"
                      size="sm"
                      icon={<WhatsAppIcon className="size-4" />}
                      onClick={() => trackEvent('click_whatsapp', { location: 'enquiry_section' })}
                    >
                      WhatsApp us
                    </ButtonLink>
                  )}
                  {contactLinks.tel && (
                    <ButtonLink
                      href={contactLinks.tel}
                      variant="light"
                      size="sm"
                      icon={<Phone aria-hidden="true" className="size-4" />}
                      onClick={() => trackEvent('click_call', { location: 'enquiry_section' })}
                    >
                      Call {contactLinks.phoneDisplay}
                    </ButtonLink>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="p-6 sm:p-10 lg:p-12">
            <h3 className="text-xl">{course ? `Enquire about ${course.classLabel} ${course.title}` : 'Admission enquiry form'}</h3>
            <div className="mt-6">
              <EnquiryForm course={course} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

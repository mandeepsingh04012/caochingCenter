import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { enquiryHref } from '../../config/navigation';
import { contactLinks } from '../../lib/contact';

interface CtaBandProps {
  title: string;
  text: string;
  whatsappHref?: string | null;
}

export function CtaBand({ title, text, whatsappHref = contactLinks.whatsapp }: CtaBandProps) {
  return (
    <section aria-label={title} className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-8 rounded-[2rem] border border-line bg-beige-50 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl">{title}</h2>
            <p className="mt-3 text-muted">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={enquiryHref} size="lg" iconRight={<ArrowRight aria-hidden="true" className="size-5" />}>
              Enquire Now
            </ButtonLink>
            {whatsappHref && (
              <ButtonLink href={whatsappHref} size="lg" variant="outline" icon={<WhatsAppIcon className="size-5" />}>
                WhatsApp Us
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

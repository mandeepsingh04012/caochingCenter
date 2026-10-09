import { ArrowRight } from 'lucide-react';
import { Accordion } from '../ui/Accordion';
import { SectionHeading } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';
import { getGeneralFaqs } from '../../config/faqs';
import { routes } from '../../config/navigation';

export function FaqSection() {
  const faqs = getGeneralFaqs();
  return (
    <section aria-labelledby="faq-heading" className="section-y bg-beige-50">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQs"
            title="Questions parents often ask"
            intro="Can’t find what you are looking for? Our team is happy to answer any questions about classes and admissions."
          />
          <ButtonLink href={routes.contact} variant="outline" className="mt-8" iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
            Ask a question
          </ButtonLink>
        </div>
        <Accordion items={faqs.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} />
      </div>
    </section>
  );
}

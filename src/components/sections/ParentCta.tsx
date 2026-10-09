import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { enquiryHref } from '../../config/navigation';

export function ParentCta() {
  return (
    <section aria-labelledby="parent-cta-heading" className="bg-white pb-20 lg:pb-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-7 py-14 sm:px-12 lg:px-16 lg:py-16">
          <svg aria-hidden="true" viewBox="0 0 400 200" className="absolute right-0 bottom-0 w-[28rem] max-w-full text-gold/20">
            <path d="M40 200a160 160 0 0 1 320 0" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M90 200a110 110 0 0 1 220 0" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M140 200a60 60 0 0 1 120 0Z" fill="currentColor" />
          </svg>
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-gold!">For parents</p>
              <h2 id="parent-cta-heading" className="mt-4 text-3xl text-white! sm:text-4xl">
                Every Child Deserves the Right Guidance.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-forest-100">
                Choosing the right coaching centre starts with understanding your child&rsquo;s learning needs. Connect
                with Tejas Academy to discuss suitable classes, subjects and learning options.
              </p>
            </div>
            <ButtonLink href={enquiryHref} variant="gold" size="lg" className="justify-self-start" iconRight={<ArrowRight aria-hidden="true" className="size-5" />}>
              Talk to Our Team
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

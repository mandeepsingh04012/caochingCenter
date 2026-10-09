import { Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { commitments } from '../../config/content';
import { siteConfig } from '../../config/site';

export function WhyChoose() {
  return (
    <section aria-labelledby="why-heading" className="section-y bg-white">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="why-heading"
            eyebrow={`Why choose ${siteConfig.name}?`}
            title="Our teaching commitments"
            intro="These are the principles every class at Tejas Academy is built on — the standards we hold ourselves to with every student."
          />
          <div aria-hidden="true" className="mt-10 hidden h-1 w-24 rounded-full bg-gold lg:block" />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {commitments.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 rounded-card border border-line bg-beige-50 p-5 transition-colors hover:border-forest/25 hover:bg-white sm:block sm:p-6"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-forest text-gold">
                <Check aria-hidden="true" className="size-5" strokeWidth={2.5} />
              </span>
              <div>
                <h3 className="text-lg sm:mt-5">{item.title}</h3>
                <p className="mt-1.5 text-muted sm:mt-2">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { ChartLine, Lightbulb, Repeat, UserRound, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { benefits, type BenefitIcon } from '../../config/content';

const icons: Record<BenefitIcon, LucideIcon> = {
  lightbulb: Lightbulb,
  user: UserRound,
  repeat: Repeat,
  chart: ChartLine,
};

export function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="section-y bg-white">
      <div className="container-page">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Why parents choose us"
          title="Learning that builds real understanding"
          intro="Our classroom approach is designed around how students actually learn — clear concepts, steady practice and attention to each child’s needs."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = icons[benefit.icon];
            return (
              <li
                key={benefit.title}
                className="group relative rounded-card border border-line bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-forest/25 hover:shadow-lift motion-reduce:hover:translate-y-0"
              >
                <span aria-hidden="true" className="absolute top-7 right-7 text-sm font-semibold text-line">
                  0{index + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-forest-50 text-forest transition-colors group-hover:bg-forest group-hover:text-gold">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 text-lg">{benefit.title}</h3>
                <p className="mt-2 text-muted">{benefit.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

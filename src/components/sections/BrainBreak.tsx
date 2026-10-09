import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';
import { QuizGame } from '../engagement/QuizGame';
import { FactCard } from '../engagement/FactCard';
import { routes } from '../../config/navigation';

export function BrainBreak() {
  return (
    <section aria-labelledby="brain-break-heading" className="section-y relative overflow-hidden bg-beige-50">
      <div aria-hidden="true" className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-page relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="brain-break-heading"
            eyebrow="Brain break"
            title="Think you know your basics?"
            intro="Take a 1-minute quiz for your class, or flip through some surprising facts. No sign-up needed."
          />
          <ButtonLink href={routes.funZone} variant="ghost" className="self-start md:self-auto" iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
            Visit the Fun Zone
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <QuizGame />
          <FactCard />
        </div>
      </div>
    </section>
  );
}

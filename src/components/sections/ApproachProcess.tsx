import { SectionHeading } from '../ui/SectionHeading';
import { approachSteps } from '../../config/content';
import { cn } from '../../lib/cn';

interface ApproachProcessProps {
  /** Show the longer explanation for each step (used on the Approach page). */
  detailed?: boolean;
  showHeading?: boolean;
}

export function ApproachProcess({ detailed = false, showHeading = true }: ApproachProcessProps) {
  return (
    <section aria-labelledby={showHeading ? 'approach-heading' : undefined}
      aria-label={showHeading ? undefined : 'Our four-step teaching approach'} className="section-y relative overflow-hidden bg-deep text-forest-100">
      <div aria-hidden="true" className="absolute -top-40 -right-40 size-[28rem] rounded-full border border-gold/15" />
      <div aria-hidden="true" className="absolute -top-24 -right-24 size-[20rem] rounded-full border border-gold/10" />
      <div className="container-page relative">
        {showHeading && (
          <SectionHeading
            id="approach-heading"
            tone="inverse"
            eyebrow="Our teaching approach"
            title="Understand. Practise. Evaluate. Improve."
            intro="A simple, consistent cycle that helps students learn deeply and keep improving — topic after topic."
          />
        )}
        <ol className={cn('relative grid gap-10 lg:grid-cols-4 lg:gap-6', showHeading && 'mt-16')}>
          {/* Connector line: vertical on mobile, horizontal on large screens */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-6 w-px bg-gold/30 lg:top-6 lg:right-[12%] lg:bottom-auto lg:left-[12%] lg:h-px lg:w-auto" />
          {approachSteps.map((step, index) => (
            <li key={step.title} className="relative flex gap-6 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-gold text-lg font-bold text-deep ring-8 ring-deep">
                {index + 1}
              </span>
              <div>
                <h3 className="text-xl tracking-[0.08em] text-white! uppercase">{step.title}</h3>
                <p className="mt-3 leading-relaxed">{step.description}</p>
                {detailed && <p className="mt-3 text-sm leading-relaxed text-forest-200">{step.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

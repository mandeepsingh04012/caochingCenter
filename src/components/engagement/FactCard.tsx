import { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { funFacts } from '../../config/engagement';
import { cn } from '../../lib/cn';

/** "Did you know?" card that steps through the fun facts. */
export function FactCard({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const fact = funFacts[index]!;
  const go = (step: number) => setIndex((i) => (i + step + funFacts.length) % funFacts.length);

  return (
    <div className={cn('relative flex flex-col overflow-hidden rounded-[2rem] bg-forest p-7 text-white sm:p-9', className)}>
      <div aria-hidden="true" className="bg-dots-light absolute inset-0" />
      <div aria-hidden="true" className="absolute -top-10 -right-10 size-40 animate-float rounded-full bg-gold/20 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-gold text-deep">
          <Lightbulb aria-hidden="true" className="size-5" />
        </span>
        <p className="eyebrow text-gold!">Did you know?</p>
      </div>
      <div aria-live="polite" className="relative mt-6 flex-1">
        <p key={index} className="animate-pop">
          <span className="block text-2xl font-bold text-white">{fact.title}</span>
          <span className="mt-3 block text-lg leading-relaxed text-forest-100">{fact.fact}</span>
        </p>
      </div>
      <div className="relative mt-8 flex items-center justify-between">
        <span className="text-sm text-forest-100">
          Fact {index + 1} of {funFacts.length}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="grid size-10 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
            <span className="sr-only">Previous fact</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="grid size-10 place-items-center rounded-full bg-gold text-deep transition-colors hover:bg-[#e3c588]"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
            <span className="sr-only">Next fact</span>
          </button>
        </div>
      </div>
    </div>
  );
}

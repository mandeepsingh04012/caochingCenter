import { Sparkle } from 'lucide-react';
import { marqueeItems } from '../../config/content';

/** Decorative scrolling strip of key ideas. The list is read once by screen readers. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 text-sm font-semibold tracking-wide whitespace-nowrap text-white sm:text-base">
          {item}
          <Sparkle aria-hidden="true" className="size-4 text-gold" fill="currentColor" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="What we focus on" className="overflow-hidden bg-forest py-4">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

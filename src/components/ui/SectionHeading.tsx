import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  id?: string;
  tone?: 'default' | 'inverse';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: Heading = 'h2',
  id,
  tone = 'default',
  className,
}: SectionHeadingProps) {
  const inverse = tone === 'inverse';
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow mb-4 flex items-center gap-3', align === 'center' && 'justify-center', inverse && 'text-gold!')}>
          <span aria-hidden="true" className={cn('h-px w-8', inverse ? 'bg-gold/60' : 'bg-gold')} />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn('text-3xl sm:text-4xl lg:text-[2.6rem]', inverse && 'text-white!')}
      >
        {title}
      </Heading>
      {intro && (
        <p className={cn('mt-5 text-lg leading-relaxed', inverse ? 'text-forest-100' : 'text-muted')}>{intro}</p>
      )}
    </div>
  );
}

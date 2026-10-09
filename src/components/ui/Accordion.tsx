import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Heading level for item titles, to keep the page outline correct. */
  headingLevel?: 'h3' | 'h4';
  defaultOpenId?: string;
  className?: string;
}

/**
 * Accessible accordion following the WAI-ARIA pattern:
 * buttons with aria-expanded/aria-controls, labelled regions, and
 * ArrowUp/ArrowDown/Home/End keyboard navigation between headers.
 */
export function Accordion({ items, headingLevel: Heading = 'h3', defaultOpenId, className }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpenId ? [defaultOpenId] : []));
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const targets: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className={cn('divide-y divide-line overflow-hidden rounded-card border border-line bg-white', className)}>
      {items.map((item, index) => {
        const isOpen = open.has(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <Heading className="text-base font-semibold tracking-normal">
              <button
                ref={(el) => {
                  buttons.current[index] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-deep transition-colors hover:bg-beige-50 focus-visible:-outline-offset-3 sm:px-7"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-full border border-line text-forest transition-transform duration-200',
                    isOpen && 'rotate-180 border-forest/30 bg-forest-50',
                  )}
                >
                  <ChevronDown className="size-4" />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-6 text-muted sm:px-7"
            >
              <p className="max-w-3xl leading-relaxed">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

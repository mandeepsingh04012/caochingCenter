import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, intro, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-beige-50">
      <svg aria-hidden="true" viewBox="0 0 400 200" className="absolute -right-16 bottom-0 hidden w-[32rem] text-gold/25 md:block">
        <path d="M30 200a170 170 0 0 1 340 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M80 200a120 120 0 0 1 240 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M130 200a70 70 0 0 1 140 0Z" fill="currentColor" fillOpacity=".5" />
      </svg>
      <div className="container-page relative py-14 lg:py-20">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5" />}
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-forest hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-deep">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

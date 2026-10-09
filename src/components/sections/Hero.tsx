import { ArrowRight, BookOpen, GraduationCap, MapPin } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { HeroIllustration } from './HeroIllustration';
import { imagery, siteConfig } from '../../config/site';
import { approachSteps } from '../../config/content';
import { courses } from '../../config/courses';
import { ENQUIRY_ANCHOR, routes } from '../../config/navigation';

export function Hero() {
  const { address } = siteConfig;
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-beige-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-beige lg:block"
        style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)' }}
      />
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute top-0 left-0 h-72 w-96 [mask-image:linear-gradient(to_bottom_right,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-24 right-[46%] hidden size-5 animate-float rounded-full bg-gold/60 lg:block" />
      <div className="container-page relative grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-deep shadow-soft">
            <MapPin aria-hidden="true" className="size-4 text-gold-700" />
            {address.locality}, {address.sector}, {address.city}
          </p>
          <h1
            id="hero-heading"
            className="mt-7 text-[2.6rem] leading-[1.05] font-extrabold sm:text-6xl lg:text-[4.1rem]"
          >
            Strong Concepts.{' '}
            <span className="relative inline-block text-forest">
              Brighter Futures.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-gold"
              >
                <path d="M2 9c70-7 180-9 296-4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Quality classroom coaching for Classes 6–10 in {address.sector}, {address.city}. Build strong fundamentals,
            develop confidence and learn with a structured approach to academic success.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`#${ENQUIRY_ANCHOR}`} size="lg" iconRight={<ArrowRight aria-hidden="true" className="size-5" />}>
              Enquire About Admissions
            </ButtonLink>
            <ButtonLink href={routes.courses} size="lg" variant="outline" icon={<BookOpen aria-hidden="true" className="size-5" />}>
              Explore Courses
            </ButtonLink>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              ['Classes', '6 to 10'],
              ['Programmes', String(courses.length)],
              ['Format', 'Classroom'],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="text-xs font-semibold tracking-[0.1em] text-muted uppercase">{term}</dt>
                <dd className="mt-1 text-lg font-bold text-deep">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[5/4] lg:aspect-[5/6]">
            {imagery.hero.src ? (
              <img
                src={imagery.hero.src}
                alt={imagery.hero.alt}
                width={imagery.hero.width}
                height={imagery.hero.height}
                fetchPriority="high"
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <HeroIllustration className="absolute inset-0 size-full" />
            )}
          </div>
          <div className="absolute -top-4 -right-2 flex animate-float items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:-right-5">
            <span className="grid size-10 place-items-center rounded-full bg-gold text-deep">
              <GraduationCap aria-hidden="true" className="size-5" />
            </span>
            <p className="text-sm leading-tight">
              <span className="block font-bold text-deep">10+ years</span>
              <span className="text-muted">combined teaching experience</span>
            </p>
          </div>
          <div className="absolute hidden rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur sm:-bottom-6 sm:-right-4 sm:block sm:w-[25rem] lg:-left-10 lg:right-auto lg:bottom-10">
            <p className="text-xs font-semibold tracking-[0.12em] text-gold-700 uppercase">How we teach</p>
            <ol className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-semibold text-deep">
              {approachSteps.map((step, i) => (
                <li key={step.title} className="flex items-center gap-1.5">
                  {step.title}
                  {i < approachSteps.length - 1 && <ArrowRight aria-hidden="true" className="size-3.5 text-gold-700" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

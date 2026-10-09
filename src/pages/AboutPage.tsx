import { PageHeader } from '../components/sections/PageHeader';
import { CtaBand } from '../components/sections/CtaBand';
import { LocationSection } from '../components/sections/LocationSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { LogoMark } from '../components/layout/Logo';
import { aboutValues } from '../config/content';
import { FacultySection } from '../components/sections/FacultySection';
import { siteConfig } from '../config/site';
import { pageMeta } from '../config/seo';
import { useDocumentMeta } from '../lib/seo';

export default function AboutPage() {
  useDocumentMeta(pageMeta.about);
  const { address } = siteConfig;
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A new coaching centre with a clear purpose"
        intro={`Tejas Academy is a classroom coaching centre for Classes 6 to 10 at ${address.locality}, ${address.sector}, ${address.city} — built on the belief that strong concepts lead to brighter futures.`}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      <section aria-labelledby="story-heading" className="section-y bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
          <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-[2rem] bg-beige">
            <div aria-hidden="true" className="absolute inset-8 rounded-full border border-gold/50" />
            <div aria-hidden="true" className="absolute inset-16 rounded-full border border-gold/30" />
            <LogoMark className="relative size-28" />
          </div>
          <div>
            <SectionHeading id="story-heading" eyebrow="Our purpose" title="Why Tejas Academy?" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                <em className="font-semibold text-deep not-italic">Tejas</em> means radiance and brilliance — a reflection of
                our belief that every student has the potential to shine when they truly understand what they learn.
              </p>
              <p>
                Tejas Academy has been set up to give school students in {address.sector} and nearby areas of{' '}
                {address.city} a focused, structured place to learn — with an emphasis on conceptual clarity, regular
                practice and personal attention.
              </p>
              <p>
                Our faculty brings over ten years of combined school teaching experience from Alpine Convent School. As a
                new centre, we are building our reputation one student at a time, through honest communication with
                parents and a steady commitment to every child&rsquo;s academic development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="section-y bg-beige">
        <div className="container-page">
          <SectionHeading
            id="values-heading"
            eyebrow="What we stand for"
            title="Our values"
            intro="The principles that guide how we teach and how we work with families."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {aboutValues.map((value, i) => (
              <li key={value.title} className="rounded-card border border-line bg-white p-6">
                <span aria-hidden="true" className="text-sm font-bold text-gold-700">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FacultySection className="border-t border-line" />

      <LocationSection />
      <CtaBand
        title="We’d love to meet you"
        text="Contact us to discuss your child’s learning needs or to arrange a visit to the centre."
      />
    </>
  );
}

import { BookOpenCheck, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/sections/PageHeader';
import { CtaBand } from '../components/sections/CtaBand';
import { SectionHeading } from '../components/ui/SectionHeading';
import { QuizGame } from '../components/engagement/QuizGame';
import { funFacts, studyTips } from '../config/engagement';
import { pageMeta } from '../config/seo';
import { useDocumentMeta } from '../lib/seo';

export default function FunZonePage() {
  useDocumentMeta(pageMeta.funZone);
  return (
    <>
      <PageHeader
        eyebrow="Fun Zone"
        title="Learn, play and get curious"
        intro="Free quick quizzes for Classes 6–10, surprising facts from science and maths, and study tips that really work. Challenge your friends and see who scores highest!"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Fun Zone' }]}
      />

      <section aria-label="Quiz" className="section-y relative overflow-hidden bg-white">
        <div aria-hidden="true" className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="container-page relative max-w-4xl!">
          <QuizGame headingLevel="h2" />
        </div>
      </section>

      <section aria-labelledby="facts-heading" className="section-y bg-beige">
        <div className="container-page">
          <SectionHeading id="facts-heading" eyebrow="Did you know?" title="Facts to amaze your friends" align="center" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {funFacts.map((f, i) => (
              <li
                key={f.title}
                className="reveal rounded-card border border-line bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-gold-100 text-gold-700">
                  <Sparkles aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.fact}</p>
                <span aria-hidden="true" className="mt-4 block text-xs font-bold text-line">
                  #{String(i + 1).padStart(2, '0')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tips-heading" className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            id="tips-heading"
            eyebrow="Study smarter"
            title="Tips from our classroom"
            intro="Small habits that make a big difference to how much you remember."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {studyTips.map((t) => (
              <li key={t.title} className="reveal flex gap-4 rounded-card border border-line bg-beige-50 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest text-gold">
                  <BookOpenCheck aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg">{t.title}</h3>
                  <p className="mt-1.5 text-muted">{t.tip}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Enjoyed the quiz?"
        text="Our classes build the same curiosity and confidence every day. Talk to us about admissions for Classes 6–10."
      />
    </>
  );
}

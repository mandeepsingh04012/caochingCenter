import { Link, useParams } from 'react-router';
import { ArrowRight, CalendarClock, Check, Hourglass, IndianRupee, Wallet, type LucideIcon } from 'lucide-react';
import { PageHeader } from '../components/sections/PageHeader';
import { EnquirySection } from '../components/sections/EnquirySection';
import { CourseCard } from '../components/sections/CourseCard';
import { courseIcons } from '../components/sections/courseIcons';
import { Accordion } from '../components/ui/Accordion';
import { ButtonLink } from '../components/ui/Button';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { courses, getCourseBySlug, type Course } from '../config/courses';
import { courseMeta } from '../config/seo';
import { siteConfig } from '../config/site';
import { ENQUIRY_ANCHOR, routes } from '../config/navigation';
import { useDocumentMeta } from '../lib/seo';
import { buildWhatsAppLink, courseEnquiryMessage } from '../lib/whatsapp';
import NotFoundPage from './NotFoundPage';

function KeyDetail({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | null }) {
  return (
    <div className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div>
        <dt className="text-xs font-semibold tracking-[0.1em] text-muted uppercase">{label}</dt>
        <dd className="mt-1 font-semibold text-deep">
          {value ?? (
            <>
              <span className="font-normal text-muted">Contact us for details · </span>
              <Link to={routes.contact} className="text-forest underline underline-offset-4">
                Ask our team
              </Link>
            </>
          )}
        </dd>
      </div>
    </div>
  );
}

function CourseDetail({ course }: { course: Course }) {
  const meta = courseMeta.find((m) => m.path.endsWith(course.slug));
  useDocumentMeta(meta ?? { path: `/courses/${course.slug}`, title: course.title, description: course.summary });
  const Icon = courseIcons[course.icon];
  const label = `${course.classLabel} ${course.title}`;
  const whatsapp = buildWhatsAppLink(siteConfig.contact.whatsapp, courseEnquiryMessage(siteConfig.name, label));
  const others = courses.filter((c) => c.slug !== course.slug);

  return (
    <>
      <PageHeader
        eyebrow={course.classLabel}
        title={course.title}
        intro={course.summary}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Courses', to: routes.courses }, { label: course.classLabel }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`#${ENQUIRY_ANCHOR}`} size="lg" iconRight={<ArrowRight aria-hidden="true" className="size-5" />}>
            Enquire About {course.classLabel}
          </ButtonLink>
          {whatsapp && (
            <ButtonLink href={whatsapp} size="lg" variant="outline" icon={<WhatsAppIcon className="size-5" />}>
              Ask on WhatsApp
            </ButtonLink>
          )}
        </div>
      </PageHeader>

      <div className="section-y bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-16">
            <section aria-labelledby="overview-heading">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-forest text-gold">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h2 id="overview-heading" className="text-2xl sm:text-3xl">
                  Programme overview
                </h2>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-muted">{course.overview}</p>
            </section>

            <section aria-labelledby="objectives-heading">
              <h2 id="objectives-heading" className="text-2xl sm:text-3xl">
                Learning objectives
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.objectives.map((objective) => (
                  <li key={objective} className="flex gap-3 rounded-2xl border border-line bg-beige-50 p-4">
                    <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-forest" strokeWidth={2.5} />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="subjects-heading">
              <h2 id="subjects-heading" className="text-2xl sm:text-3xl">
                Available subjects
              </h2>
              {course.subjects?.length ? (
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {course.subjects.map((subject) => (
                    <li key={subject} className="rounded-full border border-forest/20 bg-forest-50 px-4 py-2 font-semibold text-forest">
                      {subject}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-muted">
                  Subject options for {course.classLabel} are being finalised.{' '}
                  <a href={`#${ENQUIRY_ANCHOR}`} className="font-semibold text-forest underline underline-offset-4">
                    Contact us
                  </a>{' '}
                  to find out which subjects are currently available.
                </p>
              )}
            </section>

            <section aria-labelledby="method-heading">
              <h2 id="method-heading" className="text-2xl sm:text-3xl">
                Teaching methodology
              </h2>
              <ol className="mt-6 space-y-4">
                {course.methodology.map((step, i) => (
                  <li key={step.title} className="flex gap-5 rounded-2xl border border-line p-5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold text-sm font-bold text-deep">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg">{step.title}</h3>
                      <p className="mt-1 text-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {course.faqs.length > 0 && (
              <section aria-labelledby="course-faq-heading">
                <h2 id="course-faq-heading" className="text-2xl sm:text-3xl">
                  {course.classLabel} FAQs
                </h2>
                <Accordion
                  className="mt-6"
                  items={course.faqs.map((f, i) => ({ id: `faq-${i}`, title: f.question, content: f.answer }))}
                />
              </section>
            )}
          </div>

          <aside aria-labelledby="key-details-heading" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-line bg-white p-7 shadow-soft">
              <h2 id="key-details-heading" className="text-xl">
                Key details
              </h2>
              <dl className="mt-6 divide-y divide-line">
                <KeyDetail icon={CalendarClock} label="Batch timings" value={course.batchTimings} />
                <KeyDetail icon={Hourglass} label="Duration" value={course.duration} />
                <KeyDetail icon={IndianRupee} label="Fees" value={course.fees} />
                <KeyDetail icon={Wallet} label="Payment information" value={course.paymentInfo} />
              </dl>
              <ButtonLink href={`#${ENQUIRY_ANCHOR}`} className="mt-7 w-full">
                Enquire Now
              </ButtonLink>
            </div>
          </aside>
        </div>
      </div>

      <EnquirySection
        course={course}
        title={`Interested in ${course.classLabel}?`}
        intro="Send us your details and our team will share the latest information on subjects, batch timings, fees and admission."
      />

      <section aria-labelledby="other-courses-heading" className="section-y bg-white">
        <div className="container-page">
          <h2 id="other-courses-heading" className="text-2xl sm:text-3xl">
            Other programmes
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((c) => (
              <li key={c.slug}>
                <CourseCard course={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default function CourseDetailPage() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  if (!course) return <NotFoundPage />;
  return <CourseDetail key={course.slug} course={course} />;
}

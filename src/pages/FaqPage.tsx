import { PageHeader } from '../components/sections/PageHeader';
import { CtaBand } from '../components/sections/CtaBand';
import { Accordion } from '../components/ui/Accordion';
import { getGeneralFaqs } from '../config/faqs';
import { courses } from '../config/courses';
import { pageMeta } from '../config/seo';
import { useDocumentMeta } from '../lib/seo';

export default function FaqPage() {
  useDocumentMeta(pageMeta.faqs);
  const general = getGeneralFaqs();
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Frequently asked questions"
        intro="Answers to the questions parents ask most often. If you need anything else, please get in touch — we are happy to help."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'FAQs' }]}
      />
      <div className="section-y bg-white">
        <div className="container-page max-w-4xl! space-y-16">
          <section aria-labelledby="general-faq-heading">
            <h2 id="general-faq-heading" className="text-2xl sm:text-3xl">
              General questions
            </h2>
            <Accordion className="mt-6" items={general.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} />
          </section>
          {courses
            .filter((c) => c.faqs.length > 0)
            .map((course) => (
              <section key={course.slug} aria-labelledby={`faq-${course.slug}`}>
                <h2 id={`faq-${course.slug}`} className="text-2xl sm:text-3xl">
                  {course.classLabel} · {course.title}
                </h2>
                <Accordion
                  className="mt-6"
                  items={course.faqs.map((f, i) => ({ id: `${course.slug}-${i}`, title: f.question, content: f.answer }))}
                />
              </section>
            ))}
        </div>
      </div>
      <CtaBand title="Still have a question?" text="Send us an enquiry and our team will get back to you." />
    </>
  );
}

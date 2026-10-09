import { PageHeader } from '../components/sections/PageHeader';
import { CourseCard } from '../components/sections/CourseCard';
import { CtaBand } from '../components/sections/CtaBand';
import { courses } from '../config/courses';
import { pageMeta } from '../config/seo';
import { useDocumentMeta } from '../lib/seo';

export default function CoursesPage() {
  useDocumentMeta(pageMeta.courses);
  return (
    <>
      <PageHeader
        eyebrow="Courses"
        title="School tuition for Classes 6–10 in Gurugram"
        intro="Three structured classroom programmes at Orris Market, Sector 89 — each designed around the needs of a particular stage of school."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Courses' }]}
      />
      <section aria-label="Programmes" className="section-y bg-beige">
        <div className="container-page">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <li key={course.slug}>
                <CourseCard course={course} headingLevel="h2" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand
        title="Not sure which programme is right?"
        text="Tell us about your child’s class and learning needs, and our team will help you choose the right option."
      />
    </>
  );
}

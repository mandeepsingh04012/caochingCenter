import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';
import { CourseCard } from './CourseCard';
import { courses } from '../../config/courses';
import { routes } from '../../config/navigation';

export function CourseOverview() {
  return (
    <section aria-labelledby="courses-heading" className="section-y bg-beige">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="courses-heading"
            eyebrow="Our programmes"
            title="Courses for every stage, Class 6 to Class 10"
            intro="Three focused programmes that grow with your child — from building foundations to preparing confidently for board examinations."
          />
          <ButtonLink href={routes.courses} variant="ghost" className="self-start md:self-auto" iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
            All course details
          </ButtonLink>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

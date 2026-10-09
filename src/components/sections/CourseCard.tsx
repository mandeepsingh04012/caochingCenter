import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { courseIcons } from './courseIcons';
import { coursePath, courseEnquiryHref, type Course } from '../../config/courses';
import { joinList } from '../../lib/format';

export function CourseCard({ course, headingLevel: Heading = 'h3' }: { course: Course; headingLevel?: 'h2' | 'h3' }) {
  const Icon = courseIcons[course.icon];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0">
      <div className="relative overflow-hidden bg-deep px-7 pt-7 pb-8 text-white">
        <svg aria-hidden="true" viewBox="0 0 200 100" className="absolute -right-8 -bottom-10 w-56 text-gold/25">
          <path d="M20 100a80 80 0 0 1 160 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M45 100a55 55 0 0 1 110 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M70 100a30 30 0 0 1 60 0Z" fill="currentColor" />
        </svg>
        <div className="relative flex items-start justify-between">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-gold ring-1 ring-white/15">
            <Icon aria-hidden="true" className="size-6" />
          </span>
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-deep">{course.classLabel}</span>
        </div>
        <Heading className="relative mt-6 text-2xl text-white!">
          <Link to={coursePath(course)} className="after:absolute after:inset-0 focus-visible:outline-none">
            <span className="sr-only">{course.classLabel}: </span>
            {course.title}
          </Link>
        </Heading>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-muted">{course.summary}</p>
        <p className="mt-5 text-sm">
          <span className="font-semibold text-deep">Subjects: </span>
          <span className="text-muted">
            {course.subjects?.length ? joinList(course.subjects) : 'Contact us for current subject options'}
          </span>
        </p>
        <div className="relative z-10 mt-auto flex flex-wrap gap-3 pt-7">
          <ButtonLink href={coursePath(course)} size="sm" iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
            View Course
          </ButtonLink>
          <ButtonLink href={courseEnquiryHref(course)} size="sm" variant="outline">
            Enquire Now
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

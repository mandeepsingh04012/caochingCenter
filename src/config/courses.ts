import type { ClassLevel } from './site';
import { ENQUIRY_ANCHOR, routes } from './navigation';

/**
 * ============================================================================
 *  COURSE CONFIGURATION
 * ============================================================================
 *  Each course page and card is generated from this file.
 *  Use `null` for any detail that is not yet confirmed — the website will show
 *  "Contact us for details" instead. Never enter fees, timings or subjects
 *  that the academy has not confirmed.
 * ============================================================================
 */

export type CourseIcon = 'sprout' | 'compass' | 'graduation';

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface Course {
  /** URL slug, e.g. /courses/class-10-board-preparation */
  slug: string;
  classes: readonly ClassLevel[];
  /** Short label such as "Classes 6–8" */
  classLabel: string;
  title: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Longer introduction used on the course page. */
  overview: string;
  icon: CourseIcon;
  objectives: string[];
  methodology: { title: string; description: string }[];
  /** Subjects offered for this programme. `null` = not yet confirmed. */
  subjects: string[] | null;
  /** e.g. "Monday to Friday, 4:00 pm – 5:30 pm". `null` = not yet confirmed. */
  batchTimings: string | null;
  /** e.g. "Full academic session (April – March)". `null` = not yet confirmed. */
  duration: string | null;
  /** e.g. "₹X,XXX per month". `null` = not yet confirmed. */
  fees: string | null;
  /** e.g. "Monthly or quarterly payment accepted". `null` = not yet confirmed. */
  paymentInfo: string | null;
  faqs: CourseFaq[];
  seo: { title: string; description: string };
}

const sharedMethodology: Course['methodology'] = [
  {
    title: 'Concept-first teaching',
    description:
      'Each topic begins with the underlying idea, explained step by step, before moving to questions.',
  },
  {
    title: 'Guided practice',
    description:
      'Students work through questions in class with support, then practise independently to build confidence.',
  },
  {
    title: 'Regular evaluation',
    description:
      'Periodic checks help identify what has been understood and what needs more attention.',
  },
  {
    title: 'Focused improvement',
    description:
      'Learning gaps are revisited through targeted revision and opportunities to clear doubts.',
  },
];

export const courses: Course[] = [
  {
    slug: 'classes-6-8-foundation',
    classes: [6, 7, 8],
    classLabel: 'Classes 6–8',
    title: 'Foundation Programme',
    summary:
      'Build subject fundamentals, improve problem-solving and develop effective study habits.',
    overview:
      'The middle-school years are when core concepts are formed. The Foundation Programme helps students in Classes 6, 7 and 8 understand ideas clearly, build confidence in problem-solving and develop consistent study habits that support them in higher classes.',
    icon: 'sprout',
    objectives: [
      'Develop a clear understanding of core concepts in each subject studied',
      'Build confidence in reasoning and problem-solving',
      'Establish regular study, practice and revision habits',
      'Learn to ask questions and resolve doubts early',
      'Prepare a strong base for the demands of Classes 9 and 10',
    ],
    methodology: sharedMethodology,
    subjects: null,
    batchTimings: null,
    duration: null,
    fees: null,
    paymentInfo: null,
    faqs: [
      {
        question: 'Is the Foundation Programme suitable if my child is finding a subject difficult?',
        answer:
          'Please speak with our team about your child’s current needs. We will explain how classes are structured so you can decide whether the programme is a good fit.',
      },
      {
        question: 'Are Classes 6, 7 and 8 taught in the same batch?',
        answer:
          'Batch arrangements are being finalised. Please contact us for the latest information on batches for your child’s class.',
      },
    ],
    seo: {
      title: 'Classes 6–8 Foundation Tuition in Sector 89, Gurugram',
      description:
        'Foundation Programme for Classes 6, 7 and 8 at Tejas Academy, Orris Market, Sector 89, Gurugram. Concept-based tuition, guided practice and study habits.',
    },
  },
  {
    slug: 'class-9-academic-excellence',
    classes: [9],
    classLabel: 'Class 9',
    title: 'Academic Excellence',
    summary:
      'Strengthen core concepts, practise application-based questions and prepare for higher academic demands.',
    overview:
      'Class 9 introduces a significant step up in depth and difficulty. This programme helps students strengthen their understanding of core concepts, practise application-based questions and build the discipline needed for Class 10.',
    icon: 'compass',
    objectives: [
      'Strengthen understanding of core Class 9 concepts',
      'Practise application-based and reasoning questions',
      'Build structured note-making and revision routines',
      'Identify and work on learning gaps through regular evaluation',
      'Prepare for the academic demands of Class 10',
    ],
    methodology: sharedMethodology,
    subjects: null,
    batchTimings: null,
    duration: null,
    fees: null,
    paymentInfo: null,
    faqs: [
      {
        question: 'Can my child join Class 9 coaching mid-session?',
        answer:
          'Please contact us to discuss admission timing. We will share the current status of batches and how a new student can be supported.',
      },
      {
        question: 'Will there be tests during the programme?',
        answer:
          'Regular evaluation is part of our teaching approach. Please ask our team for details of the assessment schedule for the current session.',
      },
    ],
    seo: {
      title: 'Class 9 Tuition in Gurugram — Sector 89',
      description:
        'Class 9 Academic Excellence programme at Tejas Academy, Orris Market, Sector 89, Gurugram. Strengthen concepts and practise application-based questions.',
    },
  },
  {
    slug: 'class-10-board-preparation',
    classes: [10],
    classLabel: 'Class 10',
    title: 'Board Preparation',
    summary:
      'Structured syllabus coverage, revision, practice papers and exam-oriented preparation.',
    overview:
      'Class 10 board examinations reward clear understanding, consistent revision and good exam technique. This programme combines structured syllabus coverage with regular revision and practice papers so students can prepare with confidence.',
    icon: 'graduation',
    objectives: [
      'Cover the syllabus in a structured, well-paced sequence',
      'Revise key concepts regularly to improve retention',
      'Practise with exam-style questions and practice papers',
      'Develop answer-writing and time-management skills',
      'Approach board examinations with a clear revision plan',
    ],
    methodology: sharedMethodology,
    subjects: null,
    batchTimings: null,
    duration: null,
    fees: null,
    paymentInfo: null,
    faqs: [
      {
        question: 'Do you conduct practice papers for Class 10?',
        answer:
          'Practice papers and exam-oriented preparation are part of the Board Preparation programme. Please contact us for the schedule for the current session.',
      },
      {
        question: 'Which board does the Class 10 programme prepare for?',
        answer:
          'Please contact us to confirm the curriculum or board covered for the current session.',
      },
    ],
    seo: {
      title: 'Class 10 Tuition in Sector 89, Gurugram — Board Preparation',
      description:
        'Class 10 Board Preparation at Tejas Academy, Orris Market, Sector 89, Gurugram. Structured syllabus coverage, revision and practice papers.',
    },
  },
];

export function getCourseBySlug(slug: string | undefined): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCourseForClass(classLevel: ClassLevel): Course | undefined {
  return courses.find((course) => course.classes.includes(classLevel));
}

export function coursePath(course: Pick<Course, 'slug'>): string {
  return `${routes.courses}/${course.slug}`;
}

/** Contact page link with the programme pre-selected in the enquiry form. */
export function courseEnquiryHref(course: Pick<Course, 'slug'>): string {
  return `${routes.contact}?course=${encodeURIComponent(course.slug)}#${ENQUIRY_ANCHOR}`;
}

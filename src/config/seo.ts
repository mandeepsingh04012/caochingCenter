import { courses, coursePath } from './courses';
import { routes } from './navigation';

/**
 * Page titles and meta descriptions. Titles are suffixed with the brand name
 * automatically (see lib/seo.ts).
 */
export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Exclude from sitemap and ask search engines not to index. */
  noindex?: boolean;
}

export const pageMeta = {
  home: {
    path: routes.home,
    title: 'Tuition Classes for Classes 6–10 in Sector 89, Gurugram',
    description:
      'Tejas Academy offers classroom coaching for Classes 6 to 10 near Orris Market, Sector 89, Gurugram. Concept-based learning, regular practice and personal attention.',
  },
  courses: {
    path: routes.courses,
    title: 'Courses for Classes 6–10 — School Tuition in Gurugram',
    description:
      'Explore the Foundation Programme (Classes 6–8), Class 9 Academic Excellence and Class 10 Board Preparation at Tejas Academy, Sector 89, Gurugram.',
  },
  approach: {
    path: routes.approach,
    title: 'Our Teaching Approach — Understand, Practise, Evaluate, Improve',
    description:
      'How Tejas Academy teaches: clear concepts, guided practice, regular evaluation and focused improvement for school students in Sector 89, Gurugram.',
  },
  about: {
    path: routes.about,
    title: 'About Tejas Academy — Coaching Centre near Orris Market',
    description:
      'Tejas Academy is a new coaching centre at Orris Market, Sector 89, Gurugram, focused on conceptual clarity and steady academic development for Classes 6–10.',
  },
  faqs: {
    path: routes.faqs,
    title: 'Frequently Asked Questions',
    description:
      'Answers to common questions about classes, subjects, timings, fees, admissions and visiting Tejas Academy in Sector 89, Gurugram.',
  },
  contact: {
    path: routes.contact,
    title: 'Contact & Admissions — Tejas Academy, Sector 89 Gurugram',
    description:
      'Enquire about admissions at Tejas Academy, Orris Market, Sector 89, Gurugram. Send an enquiry, message us on WhatsApp or get directions to the centre.',
  },
  funZone: {
    path: routes.funZone,
    title: 'Fun Zone — Quizzes, Facts and Study Tips for Classes 6–10',
    description:
      'Test yourself with free quick quizzes for Classes 6–8, 9 and 10, discover surprising science and maths facts, and pick up study tips from Tejas Academy.',
  },
  privacy: {
    path: routes.privacy,
    title: 'Privacy Policy',
    description: 'How Tejas Academy handles information shared through this website and the admission enquiry form.',
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

export const courseMeta: PageMeta[] = courses.map((course) => ({
  path: coursePath(course),
  title: course.seo.title,
  description: course.seo.description,
}));

/** Every indexable page, used for prerendering and sitemap generation. */
export const allPages: PageMeta[] = [
  pageMeta.home,
  pageMeta.courses,
  ...courseMeta,
  pageMeta.approach,
  pageMeta.about,
  pageMeta.funZone,
  pageMeta.faqs,
  pageMeta.contact,
  pageMeta.privacy,
];

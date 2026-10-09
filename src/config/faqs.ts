import { courses } from './courses';
import { siteConfig } from './site';
import { formatClassList, joinList } from '../lib/format';

/**
 * General FAQs. Answers are derived from the central configuration so they
 * stay accurate automatically as details are confirmed.
 */
export interface Faq {
  id: string;
  question: string;
  answer: string;
}

const CONTACT_FOR_LATEST = 'Please contact Tejas Academy for the latest information.';

function subjectsAnswer(): string {
  const confirmed = courses.filter((c) => c.subjects && c.subjects.length > 0);
  if (confirmed.length === 0) {
    return `Subject options for each class are being finalised. ${CONTACT_FOR_LATEST} Our team will tell you which subjects are currently available for your child’s class.`;
  }
  const lines = confirmed.map((c) => `${c.classLabel}: ${joinList(c.subjects ?? [])}`);
  return `Currently offered — ${lines.join('; ')}. Please contact us to confirm availability for your child’s class.`;
}

function timingsAnswer(): string {
  const confirmed = courses.filter((c) => c.batchTimings);
  if (confirmed.length === 0) {
    return `Batch timings are being finalised. ${CONTACT_FOR_LATEST} We will share the timings that are available for your child’s class.`;
  }
  return `${confirmed.map((c) => `${c.classLabel}: ${c.batchTimings}`).join('; ')}. Timings may change between sessions, so please confirm with us before enrolling.`;
}

function feesAnswer(): string {
  const confirmed = courses.filter((c) => c.fees);
  if (confirmed.length === 0) {
    return `Fee details depend on the class and subjects chosen. ${CONTACT_FOR_LATEST} Our team will share complete fee and payment details before admission.`;
  }
  return `${confirmed.map((c) => `${c.classLabel}: ${c.fees}`).join('; ')}. Please contact us for complete fee and payment details.`;
}

function demoAnswer(): string {
  if (siteConfig.demoClassAvailable === true) {
    return `Yes, a demo class is available. ${siteConfig.demoClassNote ?? 'Please contact us to schedule one.'}`;
  }
  if (siteConfig.demoClassAvailable === false) {
    return 'We do not currently offer demo classes. Parents are welcome to contact us or visit the centre to understand how classes are conducted.';
  }
  return `Please contact us to ask whether a demo or trial class is currently available for your child’s class.`;
}

export function getGeneralFaqs(): Faq[] {
  return [
    {
      id: 'classes',
      question: 'Which classes does Tejas Academy teach?',
      answer: `Tejas Academy provides classroom coaching for ${formatClassList(siteConfig.classes)} through three programmes: ${joinList(courses.map((c) => `${c.classLabel} ${c.title}`))}.`,
    },
    { id: 'subjects', question: 'Which subjects are available?', answer: subjectsAnswer() },
    {
      id: 'curriculum',
      question: 'Which curriculum or board do you follow?',
      answer: siteConfig.curriculum
        ? `Our classes follow the ${siteConfig.curriculum} curriculum. Please contact us if your child studies under a different board.`
        : `Please contact us to confirm the curriculum or board covered for your child’s class. We will be happy to discuss your child’s school syllabus.`,
    },
    { id: 'timings', question: 'What are the batch timings?', answer: timingsAnswer() },
    { id: 'fees', question: 'What are the course fees?', answer: feesAnswer() },
    {
      id: 'enquire',
      question: 'How can I enquire about admissions?',
      answer:
        'You can fill in the admission enquiry form on our Contact page, message us on WhatsApp, call us, or visit the centre at Orris Market, Sector 89, Gurugram. Our team will get back to you to discuss suitable classes and subjects.',
    },
    {
      id: 'visit',
      question: 'Can parents visit the centre?',
      answer: siteConfig.openingHours
        ? `Yes. Parents are welcome to visit during our opening hours (${siteConfig.openingHours}). We recommend contacting us beforehand so a team member is available to speak with you.`
        : 'Yes, parents are welcome to visit. Please contact us beforehand to arrange a convenient time so a team member is available to speak with you.',
    },
    { id: 'demo', question: 'Is a demo class available?', answer: demoAnswer() },
  ];
}

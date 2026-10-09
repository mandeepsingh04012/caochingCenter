/**
 * Marketing copy used across the website. Kept here so wording can be
 * updated without touching layout components.
 */

export type BenefitIcon = 'lightbulb' | 'user' | 'repeat' | 'chart';

export const benefits: { title: string; description: string; icon: BenefitIcon }[] = [
  {
    title: 'Concept-Based Learning',
    description: 'Understand the why, not just the answer.',
    icon: 'lightbulb',
  },
  {
    title: 'Personal Attention',
    description: 'Support students according to their learning needs.',
    icon: 'user',
  },
  {
    title: 'Regular Practice',
    description: 'Reinforce classroom learning through guided practice and revision.',
    icon: 'repeat',
  },
  {
    title: 'Progress Tracking',
    description: 'Identify learning gaps and focus on continuous improvement.',
    icon: 'chart',
  },
];

export const approachSteps: { title: string; description: string; detail: string }[] = [
  {
    title: 'Understand',
    description: 'Every topic starts with a clear explanation of the core idea, so students know why — not just how.',
    detail:
      'Concepts are introduced step by step with examples, and students are encouraged to ask questions until the idea makes sense.',
  },
  {
    title: 'Practise',
    description: 'Guided classroom practice turns understanding into confidence and skill.',
    detail:
      'Students work through carefully chosen questions, first with support and then independently, building accuracy and speed.',
  },
  {
    title: 'Evaluate',
    description: 'Regular checks show what has been learnt and where more support is needed.',
    detail:
      'Periodic assessments and reviews help students, teachers and parents see progress and spot learning gaps early.',
  },
  {
    title: 'Improve',
    description: 'Learning gaps are revisited with focused revision and doubt-solving.',
    detail:
      'Insights from evaluation guide revision, so each student keeps strengthening weak areas and moves forward steadily.',
  },
];

export const commitments: { title: string; description: string }[] = [
  {
    title: 'Focus on conceptual clarity',
    description: 'We prioritise understanding over rote memorisation.',
  },
  {
    title: 'Structured classroom learning',
    description: 'Lessons follow a planned sequence so no topic is rushed or skipped.',
  },
  {
    title: 'Practice and revision',
    description: 'Regular practice and revision help students retain what they learn.',
  },
  {
    title: 'Opportunities to resolve doubts',
    description: 'Students are encouraged to ask questions and clear doubts early.',
  },
  {
    title: 'Supportive learning environment',
    description: 'A respectful, encouraging classroom where students feel comfortable to learn.',
  },
  {
    title: 'Focus on academic development',
    description: 'We aim to build skills and habits that support long-term academic growth.',
  },
];

export const aboutValues: { title: string; description: string }[] = [
  {
    title: 'Academic excellence',
    description: 'High expectations, supported by clear teaching and consistent practice.',
  },
  {
    title: 'Warmth and encouragement',
    description: 'Students learn best when they feel supported and respected.',
  },
  {
    title: 'Discipline and consistency',
    description: 'Steady routines and regular revision help students make consistent progress.',
  },
  {
    title: 'Personal attention',
    description: 'Each child learns differently, and our teaching aims to recognise that.',
  },
  {
    title: 'Trust and transparency',
    description: 'Honest communication with parents about classes, progress and fees.',
  },
];

/**
 * Faculty / team profiles for the About page. The section is hidden while
 * this list is empty. Only add details that are accurate and approved by
 * the person concerned.
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Short facts shown as chips, e.g. years of experience. */
  highlights: string[];
  /** Optional photo in /public/images, e.g. '/images/team/name.webp' */
  photo?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Shivani Mishra',
    role: 'Faculty',
    bio: 'Shivani brings five years of classroom teaching experience from Alpine Convent School. She breaks difficult topics into simple, logical steps and keeps her classroom calm and encouraging, so students feel comfortable asking questions until a concept truly makes sense.',
    highlights: ['5 years’ teaching experience', 'Alpine Convent School'],
  },
  {
    name: 'Deepshikha Rana',
    role: 'Faculty',
    bio: 'Deepshikha has five years of teaching experience at Alpine Convent School. She believes every student learns at their own pace, and pairs clear explanations with regular checks of understanding so that learning gaps are spotted early and fixed with focused practice.',
    highlights: ['5 years’ teaching experience', 'Alpine Convent School'],
  },
];

/** Headline reasons to join, shown in the highlights band on the home page. */
export const highlights: { value: string; label: string; description: string }[] = [
  {
    value: '10+',
    label: 'Years of combined teaching experience',
    description: 'Taught by experienced school teachers from Alpine Convent School.',
  },
  {
    value: '6–10',
    label: 'Classes under one roof',
    description: 'One consistent approach from foundation years to board preparation.',
  },
  {
    value: '4-step',
    label: 'Learning cycle',
    description: 'Understand, practise, evaluate and improve, applied in every topic.',
  },
  {
    value: 'Free',
    label: 'Quizzes & brain teasers',
    description: 'Students can practise anytime in our online Fun Zone.',
  },
];

/** Short phrases scrolled in the decorative strip below the hero. */
export const marqueeItems = [
  'Concept clarity',
  'Regular practice',
  'Doubt-solving sessions',
  'Progress tracking',
  'Board exam preparation',
  'Personal attention',
  'Experienced faculty',
  'Fun quizzes',
];

/** Shown on the Privacy Policy page. Update whenever the policy changes. */
export const privacyLastUpdated = '10 October 2026';

import { readEnv } from './env';

/**
 * ============================================================================
 *  TESTIMONIALS & REVIEWS
 * ============================================================================
 *  The entries below are SAMPLES written to show how the section looks.
 *  While `reviewsAreSamples` is true, every card carries a visible "Sample"
 *  label so visitors are never misled.
 *
 *  Before going live with real feedback:
 *   1. Replace the entries with genuine testimonials (with permission) and
 *      reviews copied from the academy's Google Business Profile.
 *   2. Set `reviewsAreSamples` to false.
 *   3. Optionally set VITE_GOOGLE_REVIEW_URL to the profile's
 *      "Write a review" link to show a "Review us on Google" button.
 * ============================================================================
 */

export const reviewsAreSamples = true;

export const googleReviewUrl = readEnv(import.meta.env.VITE_GOOGLE_REVIEW_URL);

export interface StudentTestimonial {
  name: string;
  detail: string;
  quote: string;
}

export interface GoogleReview {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const studentTestimonials: StudentTestimonial[] = [
  {
    name: 'Aarav',
    detail: 'Class 9 student',
    quote:
      'I used to memorise formulas without understanding them. Now I know where they come from, so I can solve questions I have never seen before.',
  },
  {
    name: 'Ishita',
    detail: 'Class 10 student',
    quote:
      'The regular tests helped me find my weak chapters early. My teachers went through every mistake with me until I got it right.',
  },
  {
    name: 'Kabir',
    detail: 'Class 7 student',
    quote:
      'Classes are never boring. We ask lots of questions and the quizzes at the end of each topic are my favourite part.',
  },
];

export const googleReviews: GoogleReview[] = [
  {
    author: 'Priya S.',
    rating: 5,
    text: 'Very supportive teachers who explain concepts patiently. My daughter is much more confident in maths now.',
  },
  {
    author: 'Rahul K.',
    rating: 5,
    text: 'Structured classes and regular updates on progress. The centre is close by in Sector 89, which is very convenient.',
  },
  {
    author: 'Neha G.',
    rating: 5,
    text: 'The faculty focuses on understanding rather than rote learning. My son actually enjoys studying science now.',
  },
];

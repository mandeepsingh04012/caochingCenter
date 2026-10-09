export interface NavItem {
  label: string;
  to: string;
}

export const routes = {
  home: '/',
  courses: '/courses',
  approach: '/our-approach',
  about: '/about',
  faqs: '/faqs',
  contact: '/contact',
  privacy: '/privacy-policy',
  funZone: '/fun-zone',
} as const;

/** Anchor id of the admission enquiry form on the Contact page. */
export const ENQUIRY_ANCHOR = 'enquiry-form';
export const enquiryHref = `${routes.contact}#${ENQUIRY_ANCHOR}`;

export const mainNav: NavItem[] = [
  { label: 'Home', to: routes.home },
  { label: 'Courses', to: routes.courses },
  { label: 'Our Approach', to: routes.approach },
  { label: 'About Us', to: routes.about },
  { label: 'Fun Zone', to: routes.funZone },
  { label: 'FAQs', to: routes.faqs },
  { label: 'Contact', to: routes.contact },
];

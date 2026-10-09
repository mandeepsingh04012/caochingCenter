import { useSearchParams } from 'react-router';
import { PageHeader } from '../components/sections/PageHeader';
import { EnquirySection } from '../components/sections/EnquirySection';
import { LocationSection } from '../components/sections/LocationSection';
import { getCourseBySlug } from '../config/courses';
import { pageMeta } from '../config/seo';
import { useDocumentMeta } from '../lib/seo';
import { useHydrated } from '../lib/useHydrated';

export default function ContactPage() {
  useDocumentMeta(pageMeta.contact);
  const [params] = useSearchParams();
  // Query strings are not part of the prerendered HTML, so apply them after hydration.
  const hydrated = useHydrated();
  const course = hydrated ? getCourseBySlug(params.get('course') ?? undefined) : undefined;
  return (
    <>
      <PageHeader
        eyebrow="Contact & admissions"
        title="Talk to Tejas Academy"
        intro="Have a question about classes, subjects or admissions? Send us an enquiry, message us on WhatsApp or visit us at Orris Market, Sector 89, Gurugram."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />
      <EnquirySection key={course?.slug ?? 'general'} course={course} />
      <LocationSection />
    </>
  );
}

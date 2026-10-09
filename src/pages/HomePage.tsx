import { Hero } from '../components/sections/Hero';
import { Benefits } from '../components/sections/Benefits';
import { CourseOverview } from '../components/sections/CourseOverview';
import { ApproachProcess } from '../components/sections/ApproachProcess';
import { WhyChoose } from '../components/sections/WhyChoose';
import { ParentCta } from '../components/sections/ParentCta';
import { EnquirySection } from '../components/sections/EnquirySection';
import { LocationSection } from '../components/sections/LocationSection';
import { FaqSection } from '../components/sections/FaqSection';
import { Marquee } from '../components/sections/Marquee';
import { Highlights } from '../components/sections/Highlights';
import { FacultySection } from '../components/sections/FacultySection';
import { Testimonials } from '../components/sections/Testimonials';
import { BrainBreak } from '../components/sections/BrainBreak';
import { pageMeta } from '../config/seo';
import { useDocumentMeta } from '../lib/seo';

export default function HomePage() {
  useDocumentMeta(pageMeta.home);
  return (
    <>
      <Hero />
      <Marquee />
      <Benefits />
      <Highlights />
      <CourseOverview />
      <FacultySection />
      <ApproachProcess />
      <Testimonials />
      <BrainBreak />
      <WhyChoose />
      <ParentCta />
      <EnquirySection />
      <LocationSection />
      <FaqSection />
    </>
  );
}

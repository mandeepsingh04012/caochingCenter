import { Link } from 'react-router';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { siteConfig } from '../../config/site';
import { courses, coursePath } from '../../config/courses';
import { mainNav, routes } from '../../config/navigation';
import { contactLinks } from '../../lib/contact';

function FooterHeading({ children }: { children: string }) {
  return <h2 className="mb-5 text-sm font-semibold tracking-[0.12em] text-gold uppercase">{children}</h2>;
}

const footerLink = 'text-forest-100 transition-colors hover:text-white';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-deep text-forest-100">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:py-20">
        <div>
          <Logo inverse />
          <p className="mt-5 text-lg font-semibold text-white">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Classroom coaching for Classes 6–10 at {siteConfig.address.locality}, {siteConfig.address.sector},{' '}
            {siteConfig.address.city}.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <FooterHeading>Quick links</FooterHeading>
          <ul className="space-y-3 text-sm">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer courses">
          <FooterHeading>Courses</FooterHeading>
          <ul className="space-y-3 text-sm">
            {courses.map((course) => (
              <li key={course.slug}>
                <Link to={coursePath(course)} className={footerLink}>
                  {course.classLabel} · {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Visit &amp; contact</FooterHeading>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                <address className="not-italic">{siteConfig.address.full}</address>
                <a href={contactLinks.directions} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-semibold text-white underline-offset-4 hover:underline">
                  Get directions<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
              {contactLinks.tel ? (
                <a href={contactLinks.tel} className={footerLink}>
                  {contactLinks.phoneDisplay}
                </a>
              ) : (
                <span>Phone number to be announced</span>
              )}
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold" />
              {contactLinks.whatsapp ? (
                <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  WhatsApp {contactLinks.whatsappDisplay}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span>WhatsApp number to be announced</span>
              )}
            </li>
            {contactLinks.email && (
              <li className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={contactLinks.email} className={footerLink}>
                  {siteConfig.contact.email}
                </a>
              </li>
            )}
            <li className="flex gap-3">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{siteConfig.openingHours ?? 'Opening hours to be announced'}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <Link to={routes.privacy} className={footerLink}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

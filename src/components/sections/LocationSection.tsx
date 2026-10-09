import { MapPin, Navigation } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ButtonLink } from '../ui/Button';
import { ContactOptions } from './ContactOptions';
import { siteConfig } from '../../config/site';
import { contactLinks } from '../../lib/contact';

export function LocationSection() {
  const { map, address } = siteConfig;
  return (
    <section aria-labelledby="location-heading" className="section-y bg-white">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            id="location-heading"
            eyebrow="Our location"
            title="Visit Tejas Academy"
            intro={`Conveniently located at ${address.locality} in ${address.sector}, ${address.city}. Parents are welcome to visit — we recommend contacting us first so a team member is available to meet you.`}
          />
          <ContactOptions className="mt-10" />
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-line bg-beige shadow-soft">
          {map.embedUrl ? (
            <iframe
              src={map.embedUrl}
              title={`Map showing ${siteConfig.name}, ${address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full border-0"
              allowFullScreen
            />
          ) : (
            <div className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden p-8 text-center">
              <svg aria-hidden="true" className="absolute inset-0 size-full text-beige-200" preserveAspectRatio="none" viewBox="0 0 400 300">
                <g fill="none" stroke="currentColor" strokeWidth="10">
                  <path d="M-20 80h440M-20 210h440M90-20v340M300-20v340" />
                </g>
                <g fill="none" stroke="#fff" strokeWidth="3" strokeOpacity=".7">
                  <path d="M-20 145c120-20 240 40 440 0M190-20c-10 120 30 220 10 340" />
                </g>
              </svg>
              <div className="relative">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-forest text-gold shadow-lift">
                  <MapPin aria-hidden="true" className="size-8" />
                </span>
                <p className="mt-5 text-lg font-bold text-deep">{siteConfig.name}</p>
                <p className="mt-1 text-muted">{address.full}</p>
                <ButtonLink
                  href={contactLinks.directions}
                  className="mt-6"
                  icon={<Navigation aria-hidden="true" className="size-4" />}
                >
                  Get Directions
                </ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { siteConfig } from '../../config/site';
import { contactLinks } from '../../lib/contact';
import { trackEvent } from '../../lib/analytics';
import { cn } from '../../lib/cn';

interface ContactOptionsProps {
  tone?: 'light' | 'dark';
  className?: string;
}

/** List of configured contact routes. Unconfigured items show honest placeholder text, never a dead link. */
export function ContactOptions({ tone = 'light', className }: ContactOptionsProps) {
  const dark = tone === 'dark';
  const row = 'flex items-start gap-4';
  const iconWrap = cn('grid size-11 shrink-0 place-items-center rounded-xl', dark ? 'bg-white/10 text-gold' : 'bg-forest-50 text-forest');
  const label = cn('text-xs font-semibold tracking-[0.1em] uppercase', dark ? 'text-forest-200' : 'text-muted');
  const value = cn('mt-0.5 font-semibold', dark ? 'text-white' : 'text-deep');
  const link = cn(value, 'underline-offset-4 hover:underline');
  const pending = cn('mt-0.5 text-sm', dark ? 'text-forest-100' : 'text-muted');

  return (
    <ul className={cn('space-y-5', className)}>
      <li className={row}>
        <span className={iconWrap}>
          <Phone aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className={label}>Call</p>
          {contactLinks.tel ? (
            <a href={contactLinks.tel} className={link} onClick={() => trackEvent('click_call', { location: 'contact_options' })}>
              {contactLinks.phoneDisplay}
            </a>
          ) : (
            <p className={pending}>Phone number to be announced</p>
          )}
        </div>
      </li>
      <li className={row}>
        <span className={iconWrap}>
          <WhatsAppIcon className="size-5" />
        </span>
        <div>
          <p className={label}>WhatsApp</p>
          {contactLinks.whatsapp ? (
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
              onClick={() => trackEvent('click_whatsapp', { location: 'contact_options' })}
            >
              Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <p className={pending}>WhatsApp number to be announced</p>
          )}
        </div>
      </li>
      {contactLinks.email && (
        <li className={row}>
          <span className={iconWrap}>
            <Mail aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className={label}>Email</p>
            <a href={contactLinks.email} className={link}>
              {siteConfig.contact.email}
            </a>
          </div>
        </li>
      )}
      <li className={row}>
        <span className={iconWrap}>
          <MapPin aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className={label}>Visit</p>
          <address className={cn(value, 'not-italic')}>{siteConfig.address.full}</address>
          <a
            href={contactLinks.directions}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('mt-1 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline', dark ? 'text-gold' : 'text-forest')}
            onClick={() => trackEvent('click_directions', { location: 'contact_options' })}
          >
            <Navigation aria-hidden="true" className="size-3.5" />
            Get directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </li>
      <li className={row}>
        <span className={iconWrap}>
          <Clock aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className={label}>Opening hours</p>
          {siteConfig.openingHours ? <p className={value}>{siteConfig.openingHours}</p> : <p className={pending}>To be announced — please contact us before visiting</p>}
        </div>
      </li>
    </ul>
  );
}

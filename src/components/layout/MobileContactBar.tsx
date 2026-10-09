import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { MessageSquareText, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { contactLinks } from '../../lib/contact';
import { enquiryHref } from '../../config/navigation';
import { trackEvent } from '../../lib/analytics';
import { cn } from '../../lib/cn';

const item =
  'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold transition-colors';

/**
 * Bottom contact bar for small screens. Hides while a form field is focused
 * so it never covers inputs or the on-screen keyboard. The layout reserves
 * space for it (see Layout) so it never hides page content.
 */
export function MobileContactBar() {
  const [fieldFocused, setFieldFocused] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches('input, textarea, select, [contenteditable="true"]');
    const onFocusIn = (e: FocusEvent) => setFieldFocused(isField(e.target));
    const onFocusOut = () => setFieldFocused(false);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return (
    <nav
      aria-label="Quick contact"
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur transition-transform duration-200 md:hidden',
        fieldFocused && 'translate-y-full',
      )}
    >
      <div className="flex divide-x divide-line">
        {contactLinks.tel && (
          <a href={contactLinks.tel} className={cn(item, 'text-deep')} onClick={() => trackEvent('click_call', { location: 'mobile_bar' })}>
            <Phone aria-hidden="true" className="size-5 text-forest" />
            Call
          </a>
        )}
        {contactLinks.whatsapp && (
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(item, 'text-deep')}
            onClick={() => trackEvent('click_whatsapp', { location: 'mobile_bar' })}
          >
            <WhatsAppIcon className="size-5 text-forest" />
            WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        <Link to={enquiryHref} className={cn(item, 'bg-forest text-white')}>
          <MessageSquareText aria-hidden="true" className="size-5 text-gold" />
          Enquire Now
        </Link>
      </div>
    </nav>
  );
}

import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scrolls to the top on page change, or to the element referenced by the URL
 * hash (e.g. /contact#enquiry-form) once the new page has rendered.
 */
export function ScrollManager() {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          target.scrollIntoView({ block: 'start' });
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, search]);

  return null;
}

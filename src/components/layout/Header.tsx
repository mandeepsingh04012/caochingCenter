import { useEffect, useId, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink } from '../ui/Button';
import { enquiryHref, mainNav } from '../../config/navigation';
import { cn } from '../../lib/cn';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative rounded-md px-1 py-2 text-[0.92rem] font-medium transition-colors',
    'after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-gold after:transition-transform',
    isActive ? 'text-deep after:scale-x-100' : 'text-muted hover:text-deep after:scale-x-0 hover:after:scale-x-100',
  );

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-shadow',
        scrolled || menuOpen ? 'border-line shadow-[0_6px_24px_-18px_rgb(16_57_45/0.35)]' : 'border-transparent',
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Hidden on phones, where the bottom contact bar provides the same action. */}
          <div className="hidden sm:block">
            <ButtonLink href={enquiryHref} size="sm" iconRight={<ArrowRight className="size-4" aria-hidden="true" />}>
              Enquire Now
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full text-deep hover:bg-beige lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        ref={panelRef}
        hidden={!menuOpen}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-6">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold',
                      isActive ? 'bg-forest-50 text-forest' : 'text-deep hover:bg-beige-50',
                    )
                  }
                >
                  {item.label}
                  <ArrowRight aria-hidden="true" className="size-4 text-gold-700" />
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink href={enquiryHref} size="lg" className="mt-6 w-full">
            Enquire Now
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}

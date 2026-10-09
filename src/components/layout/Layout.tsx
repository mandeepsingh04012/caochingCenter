import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileContactBar } from './MobileContactBar';
import { ScrollManager } from './ScrollManager';
import { DevConfigBanner } from './DevConfigBanner';

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-deep focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <ScrollManager />
      <DevConfigBanner />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      {/* Reserve space so the mobile contact bar never covers the footer. */}
      <div aria-hidden="true" className="h-[calc(4.25rem+env(safe-area-inset-bottom))] bg-deep md:hidden" />
      <MobileContactBar />
    </>
  );
}

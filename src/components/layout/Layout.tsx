import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[36rem] w-[36rem] rounded-full bg-[var(--color-primary-soft)] blur-[140px]" />
        <div className="absolute right-0 top-32 h-[30rem] w-[30rem] rounded-full bg-[var(--color-accent-soft)] blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-[var(--color-secondary-soft)] blur-[120px]" />
      </div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--color-surface-elevated)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--color-text)] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      >
        Hopp til innhold
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

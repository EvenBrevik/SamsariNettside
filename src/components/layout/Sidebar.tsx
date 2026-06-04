import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BOOKING_URL } from '../../config';
import { appRoutes } from '../../content/routes';
import { useAppSettings } from '../../providers/AppSettingsProvider';
import { ButtonLink } from '../shared/ButtonLink';
import { LanguageToggle } from '../shared/LanguageToggle';
import { ThemeToggle } from '../shared/ThemeToggle';

export function Sidebar() {
  const { t, language } = useAppSettings();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const bookLabel = language === 'no' ? 'Book møte' : 'Book meeting';

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-nav)]/95 px-4 backdrop-blur-xl sm:px-6 lg:hidden">
        <Link to="/">
          <img src="/samsari-logo-dark.png" alt="Samsari" className="h-7 w-auto object-contain dark:hidden" />
          <img src="/samsari-logo-light.png" alt="Samsari" className="hidden h-7 w-auto object-contain dark:block" />
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={language === 'no' ? 'Åpne meny' : 'Open menu'}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-4 bg-[var(--color-text)]" />
            <span className="block h-0.5 w-4 bg-[var(--color-text)]" />
            <span className="block h-0.5 w-4 bg-[var(--color-text)]" />
          </span>
        </button>
      </header>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--color-border)] bg-[var(--color-nav)]/96 backdrop-blur-xl transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src="/samsari-logo-dark.png" alt="Samsari" className="h-8 w-auto object-contain dark:hidden" />
            <img src="/samsari-logo-light.png" alt="Samsari" className="hidden h-8 w-auto object-contain dark:block" />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={language === 'no' ? 'Lukk meny' : 'Close menu'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-subtle)] transition hover:text-[var(--color-text)] lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-0.5">
            {appRoutes.map((route) => (
              <NavLink
                key={route.key}
                to={route.path}
                onClick={() => setIsOpen(false)}
                end={route.path === '/'}
                className={({ isActive }) =>
                  `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                      : 'text-[var(--color-text-subtle)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]'
                  }`
                }
              >
                {t.nav[route.key]}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom — toggles + CTA */}
        <div className="shrink-0 space-y-3 border-t border-[var(--color-border)] p-4">
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <ButtonLink to={BOOKING_URL} className="w-full justify-center">
            {bookLabel}
          </ButtonLink>
        </div>
      </aside>
    </>
  );
}

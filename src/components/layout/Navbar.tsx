import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BOOKING_URL } from '../../config';
import { appRoutes } from '../../content/routes';
import { useAppSettings } from '../../providers/AppSettingsProvider';
import { ButtonLink } from '../shared/ButtonLink';
import { LanguageToggle } from '../shared/LanguageToggle';
import { ThemeToggle } from '../shared/ThemeToggle';

export function Navbar() {
  const { t, language } = useAppSettings();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuLabel =
    isOpen
      ? language === 'no'
        ? 'Lukk meny'
        : 'Close menu'
      : language === 'no'
        ? 'Åpne meny'
        : 'Open menu';
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-nav)] shadow-[0_2px_20px_rgba(0,0,0,0.13)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center text-[var(--color-text)]">
          <img src="/samsari-logo-dark.png" alt="Samsari" className="h-8 max-w-none object-contain dark:hidden sm:h-9" />
          <img src="/samsari-logo-light.png" alt="Samsari" className="hidden h-8 max-w-none object-contain dark:block sm:h-9" />
        </Link>
        <nav className="hidden items-center lg:flex">
          {appRoutes.map((route) => (
            <NavLink
              key={route.key}
              to={route.path}
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-subtle)] hover:text-[var(--color-text)]'
                }`
              }
            >
              {t.nav[route.key]}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <ButtonLink to={BOOKING_URL} className="w-[18rem] justify-center px-4 py-2.5 text-center text-sm">
            {t.common.bookMeeting}
          </ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] lg:hidden"
          aria-label={menuLabel}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>
      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 shadow-soft lg:hidden sm:px-6">
          <nav className="flex flex-col gap-2">
            {appRoutes.map((route) => (
              <NavLink
                key={route.key}
                to={route.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                      : 'text-[var(--color-text-subtle)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]'
                  }`
                }
              >
                {t.nav[route.key]}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <ButtonLink to={BOOKING_URL} className="mt-4 w-full">
            {t.common.bookMeeting}
          </ButtonLink>
        </div>
      ) : null}
    </header>
  );
}


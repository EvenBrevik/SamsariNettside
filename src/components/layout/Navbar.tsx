import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { appRoutes } from '../../content/routes';
import { useAppSettings } from '../../providers/AppSettingsProvider';
import { ButtonLink } from '../shared/ButtonLink';
import { LanguageToggle } from '../shared/LanguageToggle';
import { ThemeToggle } from '../shared/ThemeToggle';

export function Navbar() {
  const { t } = useAppSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-nav)]/85 px-4 py-3 shadow-soft backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center text-[var(--color-text)]">
              <img src="/samsari-logo-dark.png" alt="Samsari" className="h-9 w-auto dark:hidden sm:h-10" />
              <img src="/samsari-logo-light.png" alt="Samsari" className="hidden h-9 w-auto dark:block sm:h-10" />
            </Link>
            <nav className="hidden items-center gap-1 lg:flex">
              {appRoutes.map((route) => (
                <NavLink
                  key={route.key}
                  to={route.path}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-2 text-sm font-medium transition ${
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
            <div className="hidden items-center gap-3 lg:flex">
              <LanguageToggle />
              <ThemeToggle />
              <ButtonLink to="/contact" className="px-4 py-2.5 text-sm">
                {t.common.bookMeeting}
              </ButtonLink>
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] lg:hidden"
              aria-label="Toggle menu"
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
            <div className="mt-4 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 lg:hidden">
              <nav className="flex flex-col gap-2">
                {appRoutes.map((route) => (
                  <NavLink
                    key={route.key}
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-sm font-medium transition ${
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
              <ButtonLink to="/contact" className="mt-4 w-full">
                {t.common.bookMeeting}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

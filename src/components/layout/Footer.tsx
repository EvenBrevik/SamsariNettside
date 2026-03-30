import { Link } from 'react-router-dom';
import { appRoutes } from '../../content/routes';
import { useAppSettings } from '../../providers/AppSettingsProvider';

export function Footer() {
  const { t } = useAppSettings();
  const footerLinks = appRoutes.filter((route) => route.key !== 'home');

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center text-[var(--color-text)]">
              <img src="/samsari-logo-dark.png" alt="Samsari" className="h-8 w-auto dark:hidden" />
              <img src="/samsari-logo-light.png" alt="Samsari" className="hidden h-8 w-auto dark:block" />
            </Link>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">{t.common.footerTagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[auto_auto] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">Navigasjon</p>
              <nav className="mt-4 flex flex-col gap-3">
                {footerLinks.map((route) => (
                  <Link
                    key={route.key}
                    to={route.path}
                    className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                  >
                    {t.nav[route.key]}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">Kontakt</p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="mailto:hello@samsari.no"
                  className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                  hello@samsari.no
                </a>
                <p className="text-sm text-[var(--color-text-muted)]">Oslo, Norge</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Samsari. All rights reserved.</p>
          <p>{t.common.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}

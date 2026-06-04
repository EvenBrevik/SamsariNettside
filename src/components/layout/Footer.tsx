import { Link } from 'react-router-dom';
import { BOOKING_URL } from '../../config';
import { appRoutes } from '../../content/routes';
import { useAppSettings } from '../../providers/AppSettingsProvider';

export function Footer() {
  const { t, language } = useAppSettings();
  const footerLinks = appRoutes.filter((route) => route.key !== 'home');

  const labels =
    language === 'no'
      ? {
          navigation: 'Navigasjon',
          contact: 'Kontakt',
          city: 'Kristiansund, Norge',
          copyright: 'Alle rettigheter reservert.',
          ctaTitle: 'Klar til å jobbe smartere?',
          ctaBody: 'Book en gratis kartleggingssamtale og se hva som er mulig.',
        }
      : {
          navigation: 'Navigation',
          contact: 'Contact',
          city: 'Kristiansund, Norway',
          copyright: 'All rights reserved.',
          ctaTitle: 'Ready to work smarter?',
          ctaBody: 'Book a free discovery call and see what is possible.',
        };

  return (
    <>
      {/* CTA bar — light background, acts as transition to dark footer */}
      <div className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[var(--color-gradient-main)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-semibold">{labels.ctaTitle}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{labels.ctaBody}</p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-button-primary),var(--color-button-accent))] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            {t.common.bookMeeting}
          </a>
        </div>
      </div>

      <footer className="bg-[var(--color-dark)] text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="inline-flex items-center">
              <img src="/samsari-logo-light.png" alt="Samsari" className="h-8 w-auto" />
            </Link>
            <p className="mt-3 text-sm leading-6 text-white/60">{t.common.footerTagline}</p>
            <p className="mt-4 text-sm text-white/55">{labels.city}</p>
          </div>

          {/* Links */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[auto_auto] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{labels.navigation}</p>
              <nav className="mt-4 flex flex-col gap-3">
                {footerLinks.map((route) => (
                  <Link
                    key={route.key}
                    to={route.path}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {t.nav[route.key]}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{labels.contact}</p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="mailto:hello@samsari.no"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  hello@samsari.no
                </a>
                <p className="text-sm text-white/55">{labels.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Samsari. {labels.copyright}</p>
          <Link to="/privacy" className="transition hover:text-white/70">
            {language === 'no' ? 'Personvernerklæring' : 'Privacy Policy'}
          </Link>
        </div>
      </div>
    </footer>
    </>
  );
}

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
            {...(BOOKING_URL.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
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
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.linkedin.com/company/106360744/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/samsari_no/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587026797848"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
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
                  href="mailto:hei@samsari.no"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  hei@samsari.no
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

import { Link } from 'react-router-dom';
import { useCookieConsent } from '../../providers/CookieConsentProvider';
import { useAppSettings } from '../../providers/AppSettingsProvider';

export function CookieBanner() {
  const { consent, accept, decline } = useCookieConsent();
  const { language } = useAppSettings();

  if (consent !== null) return null;

  const text =
    language === 'no'
      ? {
          title: 'Vi bruker informasjonskapsler',
          body: 'Vi bruker Google Analytics for å forstå hvordan nettstedet brukes. Ingen personopplysninger deles med tredjeparter.',
          privacy: 'Les personvernerklæringen',
          decline: 'Avslå',
          accept: 'Godta',
        }
      : {
          title: 'We use cookies',
          body: 'We use Google Analytics to understand how the website is used. No personal data is shared with third parties.',
          privacy: 'Read our privacy policy',
          decline: 'Decline',
          accept: 'Accept',
        };

  return (
    <div
      role="dialog"
      aria-label={text.title}
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm"
    >
      <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5 shadow-premium backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px rounded-t-[2rem] bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-70" />

        <p className="text-sm font-semibold text-[var(--color-text)]">{text.title}</p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{text.body}</p>
        <Link
          to="/privacy"
          className="mt-2 inline-block text-xs font-medium text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
        >
          {text.privacy} →
        </Link>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={decline}
            className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-subtle)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
          >
            {text.decline}
          </button>
          <button
            type="button"
            onClick={accept}
            className="flex-1 rounded-2xl bg-[linear-gradient(135deg,var(--color-button-primary),var(--color-button-accent))] px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            {text.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

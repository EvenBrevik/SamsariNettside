import { ButtonLink } from '../components/shared/ButtonLink';
import { useSEO } from '../hooks/useSEO';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function NotFoundPage() {
  const { language } = useAppSettings();
  useSEO({ title: '404', description: language === 'no' ? 'Siden finnes ikke.' : 'Page not found.' });

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {language === 'no' ? 'Siden finnes ikke' : 'Page not found'}
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-[var(--color-text-muted)]">
        {language === 'no'
          ? 'Siden du leter etter eksisterer ikke eller har blitt flyttet.'
          : 'The page you are looking for does not exist or has been moved.'}
      </p>
      <div className="mt-8">
        <ButtonLink to="/">
          {language === 'no' ? 'Gå til forsiden' : 'Back to home'}
        </ButtonLink>
      </div>
    </div>
  );
}

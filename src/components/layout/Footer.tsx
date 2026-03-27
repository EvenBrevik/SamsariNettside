import { Link } from 'react-router-dom';
import { useAppSettings } from '../../providers/AppSettingsProvider';

export function Footer() {
  const { t } = useAppSettings();

  return (
    <footer className="px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8 shadow-soft sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link to="/" className="text-lg font-semibold tracking-[0.08em]">
            Samsari
          </Link>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">{t.common.footerTagline}</p>
        </div>
        <div className="text-sm text-[var(--color-text-subtle)]">
          <p>hello@samsari.no</p>
          <p>Oslo, Norge</p>
        </div>
      </div>
    </footer>
  );
}

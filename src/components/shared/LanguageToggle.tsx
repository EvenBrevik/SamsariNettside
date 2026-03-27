import { useAppSettings } from '../../providers/AppSettingsProvider';

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useAppSettings();

  return (
    <button type="button" onClick={toggleLanguage} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]" aria-label="Toggle language">
      <span className={language === 'no' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-subtle)]'}>{t.common.no}</span>
      <span className="text-[var(--color-text-subtle)]">/</span>
      <span className={language === 'en' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-subtle)]'}>{t.common.en}</span>
    </button>
  );
}

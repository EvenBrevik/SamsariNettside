import { useAppSettings } from '../../providers/AppSettingsProvider';

export function ThemeToggle() {
  const { theme, toggleTheme, t } = useAppSettings();
  const isDark = theme === 'dark';

  return (
    <button type="button" onClick={toggleTheme} aria-label={isDark ? t.common.light : t.common.dark} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
      {isDark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77" />
        </svg>
      )}
    </button>
  );
}

import { useAppSettings } from '../../providers/AppSettingsProvider';

export function ThemeToggle() {
  const { theme, toggleTheme, t } = useAppSettings();
  const isDark = theme === 'dark';

  return (
    <button type="button" onClick={toggleTheme} aria-label={isDark ? t.common.light : t.common.dark} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
      <span className="relative block h-5 w-5">
        <span className={`absolute inset-0 rounded-full border-2 border-current transition ${isDark ? 'scale-100 opacity-100' : 'scale-75 opacity-40'}`} />
        <span className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition ${isDark ? 'opacity-100' : 'opacity-0'}`} />
      </span>
    </button>
  );
}

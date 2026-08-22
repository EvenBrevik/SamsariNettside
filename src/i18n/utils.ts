import { DEFAULT_LOCALE, type Locale } from './config';
import { nb, type UIKeys } from './ui/nb';
import { en } from './ui/en';
import { da } from './ui/da';
import { sv } from './ui/sv';

const dictionaries: Record<Locale, Record<UIKeys, string>> = { nb, en, da, sv };

/**
 * Gir en oversetterfunksjon for ett språk: `const t = useTranslations(locale)`.
 * Faller tilbake til norsk hvis en nøkkel mangler — bedre en norsk streng
 * enn en tom flekk i grensesnittet.
 */
export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
  return function t(key: UIKeys): string {
    return dict[key] ?? dictionaries[DEFAULT_LOCALE][key];
  };
}

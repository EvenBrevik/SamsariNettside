// Språkoppsettet for hele siden. Må holdes i synk med `i18n` i astro.config.mjs.

export const LOCALES = ['nb', 'en', 'da', 'sv'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'nb';

/** Metadata per språk. `htmlLang` går i <html lang>, `ogLocale` i og:locale. */
export const LOCALE_META: Record<
  Locale,
  { label: string; htmlLang: string; ogLocale: string; hreflang: string }
> = {
  nb: { label: 'Norsk', htmlLang: 'nb', ogLocale: 'nb_NO', hreflang: 'nb-NO' },
  en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US', hreflang: 'en' },
  da: { label: 'Dansk', htmlLang: 'da', ogLocale: 'da_DK', hreflang: 'da-DK' },
  sv: { label: 'Svenska', htmlLang: 'sv', ogLocale: 'sv_SE', hreflang: 'sv-SE' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Leser språket ut av en URL-sti. Norsk ligger på rot og har ingen prefiks,
 * så alt som ikke starter med en kjent språkkode regnes som norsk.
 */
export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : DEFAULT_LOCALE;
}

/**
 * Fjerner språkprefikset fra en sti, slik at man sitter igjen med den
 * språknøytrale ruten («/en/about» → «/about»). Brukes til å finne
 * søskensidene på tvers av språk.
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0]!)) segments.shift();
  return '/' + segments.join('/');
}

/** Bygger stien til en rute i et gitt språk. Norsk får aldri prefiks. */
export function localizePath(path: string, locale: Locale): string {
  const clean = '/' + path.split('/').filter(Boolean).join('/');
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

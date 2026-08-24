import type { Locale } from '../i18n/config';

/**
 * Redaksjonelt innhold (kundecase og blogg) ligger som separate dokumenter per
 * språk i Sanity, merket med feltet `language`. Vi har norsk og engelsk.
 *
 * Dansk og svensk har ingen egne tekster og får derfor den engelske versjonen —
 * nærmere for en leser som aktivt har valgt bort norsk enn å vise norsk.
 *
 * Eldre dokumenter kan mangle `language`. De behandles som norske, slik at
 * innhold fra før oversettelsene ble tatt i bruk fortsatt vises.
 */
export function languageFilter(locale: Locale): string {
  return locale === 'nb'
    ? '(language == "nb" || !defined(language))'
    : 'language == "en"';
}

import type { UIKeys } from '../i18n/ui/nb';

/**
 * Hovedmenyen. `path` er den språknøytrale ruten — språkprefikset legges på av
 * localizePath(), slik at menyen aldri må vedlikeholdes per språk.
 *
 * Sidene finnes ikke ennå. Lenkene peker likevel dit de skal, så menyen er
 * ferdig i det sidene kommer på plass; inntil da lander de på 404.
 */
export interface NavItem {
  /** Nøkkel i ordboken, slik at etiketten følger språket. */
  labelKey: UIKeys;
  path: string;
}

export const mainNav: readonly NavItem[] = [
  { labelKey: 'nav.services', path: '/tjenester' },
  { labelKey: 'nav.products', path: '/produkter' },
  { labelKey: 'nav.cases', path: '/kundecase' },
  { labelKey: 'nav.about', path: '/om-oss' },
  { labelKey: 'nav.contact', path: '/kontakt' },
] as const;

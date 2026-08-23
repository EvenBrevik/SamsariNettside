// Norsk er kilden. Denne fila definerer hvilke nøkler som finnes —
// de andre språkene må ha nøyaktig de samme, ellers gir TypeScript feil.
export const nb = {
  'skip.toContent': 'Hopp til innhold',
  'nav.home': 'Forsiden',
  'nav.services': 'Tjenester',
  'nav.products': 'Produkter',
  'nav.cases': 'Kundecase',
  'nav.about': 'Om oss',
  'nav.contact': 'Kontakt',
  'nav.toHome': 'Samsari, til forsiden',
  'nav.openMenu': 'Åpne meny',
  'nav.closeMenu': 'Lukk meny',
  'search.open': 'Søk',
  'search.label': 'Søk på nettstedet',
  'search.placeholder': 'Søk …',
  'search.close': 'Lukk søk',
  'lang.switcher': 'Velg språk',
  'notFound.title': 'Siden finnes ikke',
  'notFound.back': 'Gå til forsiden',
} as const;

export type UIKeys = keyof typeof nb;

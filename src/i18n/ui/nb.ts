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

  'hero.title': 'Moderne teknologi som skaper reell verdi',
  'hero.body':
    'Vi hjelper bedrifter med å ta i bruk AI, utvikler skreddersydde systemer og bygger løsninger med Power Platform, Microsoft 365 og egne SaaS-produkter.',
  'hero.primary': 'Book en prat',
  'hero.secondary': 'Se hva vi gjør',
  'hero.imageAlt': 'Et team samlet rundt et møtebord med laptoper, nettbrett og rapporter',

  'clients.title': 'Selskaper som stoler på oss',

  'footer.menuHeading': 'Meny',
  'footer.contactHeading': 'Kontakt',
  'footer.ctaHeading': 'La oss snakke sammen',
  'footer.ctaBody': 'Har du et prosjekt i tankene? Vi hjelper deg gjerne videre.',
  'footer.rights': 'Alle rettigheter reservert.',

  'notFound.title': 'Siden finnes ikke',
  'notFound.body':
    'Siden du leter etter finnes ikke lenger, har byttet adresse, eller ble aldri skrevet riktig inn.',
  'notFound.back': 'Gå til forsiden',
} as const;

export type UIKeys = keyof typeof nb;

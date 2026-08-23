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

  'clients.title': 'Noen av våre kunder',

  'services.title': 'Vår spisskompetanse',
  'services.body':
    'Samsari er eksperter på AI og Microsoft 365. Vi jobber med alt innen kunstig intelligens — AI-utvikling, chatbotter, integrasjoner og verktøy som Claude — og henter mer verdi ut av Microsoft-plattformen dere allerede har.',
  'services.cta': 'Se alle tjenester',
  'services.imagePlaceholder': 'Bilde kommer',
  'services.ai.title': 'AI-utvikling & chatbotter',
  'services.ai.body':
    'Vi utvikler skreddersydde AI-løsninger og chatbotter tilpasset deres bedrift — fra idé til noe som faktisk brukes i hverdagen.',
  'services.training.title': 'AI-implementering & opplæring',
  'services.training.body':
    'Vi hjelper dere i gang med AI i praksis, og lærer opp teamet i verktøy som Claude, slik at hele organisasjonen vet hvordan de skal bruke det.',
  'services.mcp.title': 'AI-integrasjoner',
  'services.mcp.body':
    'Vi kobler AI til deres egne systemer, blant annet med MCP-servere og Skills til verktøy som Claude.',
  'services.platform.title': 'M365 & Power Platform',
  'services.platform.body':
    'Oppsett av SharePoint og utvikling av Power Apps, slik at dere får mer ut av Microsoft-plattformen dere allerede betaler for.',

  'footer.menuHeading': 'Meny',
  'footer.contactHeading': 'Kontakt',
  'footer.ctaHeading': 'La oss snakke sammen',
  'footer.ctaBody': 'Har du et prosjekt i tankene? Vi hjelper deg gjerne videre.',
  'footer.orgNumber': 'Org.nr.',
  'footer.rights': 'Alle rettigheter reservert.',
  'footer.privacyLink': 'Personvernerklæring',
  'footer.designLink': 'Design',

  'notFound.title': 'Siden finnes ikke',
  'notFound.body':
    'Siden du leter etter finnes ikke lenger, har byttet adresse, eller ble aldri skrevet riktig inn.',
  'notFound.back': 'Gå til forsiden',
} as const;

export type UIKeys = keyof typeof nb;

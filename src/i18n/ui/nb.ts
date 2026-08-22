// Norsk er kilden. Denne fila definerer hvilke nøkler som finnes —
// de andre språkene må ha nøyaktig de samme, ellers gir TypeScript feil.
export const nb = {
  'skip.toContent': 'Hopp til innhold',
  'nav.home': 'Forsiden',
  'lang.switcher': 'Velg språk',
  'notFound.title': 'Siden finnes ikke',
  'notFound.back': 'Gå til forsiden',
} as const;

export type UIKeys = keyof typeof nb;

import type { Locale } from './config';

// Standard tittel og beskrivelse per språk. Brukes når en side ikke oppgir
// sine egne — uten dette ville engelske sider fått norsk metabeskrivelse,
// som både leser dårlig i søkeresultatet og svekker språksignalet til Google.
export const SITE_META: Record<Locale, { defaultTitle: string; defaultDescription: string }> = {
  nb: {
    defaultTitle: 'Samsari | Produkter og skreddersydde systemer',
    defaultDescription:
      'Samsari utvikler egne programvareprodukter og bygger skreddersydde systemer rundt virksomhetens arbeidsprosesser.',
  },
  en: {
    defaultTitle: 'Samsari | Software products and tailored systems',
    defaultDescription:
      'Samsari builds its own software products and tailored systems designed around the way your business actually works.',
  },
  da: {
    defaultTitle: 'Samsari | Produkter og skræddersyede systemer',
    defaultDescription:
      'Samsari udvikler egne softwareprodukter og bygger skræddersyede systemer omkring virksomhedens arbejdsprocesser.',
  },
  sv: {
    defaultTitle: 'Samsari | Produkter och skräddarsydda system',
    defaultDescription:
      'Samsari utvecklar egna programvaruprodukter och bygger skräddarsydda system utifrån hur verksamheten faktiskt arbetar.',
  },
};

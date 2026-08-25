import type { Locale } from './config';

// Standard tittel og beskrivelse per språk. Brukes når en side ikke oppgir
// sine egne — uten dette ville engelske sider fått norsk metabeskrivelse,
// som både leser dårlig i søkeresultatet og svekker språksignalet til Google.
export const SITE_META: Record<Locale, { defaultTitle: string; defaultDescription: string }> = {
  nb: {
    defaultTitle: 'Samsari | Produkter og skreddersydde systemer',
    defaultDescription:
      'Samsari utvikler egne programvareprodukter og skreddersydde systemer med AI, Power Platform og Microsoft 365. Vi holder til i Stavanger og Kristiansund.',
  },
  en: {
    defaultTitle: 'Samsari | Software products and tailored systems',
    defaultDescription:
      'Samsari builds its own software products and tailored systems using AI, Power Platform and Microsoft 365. Based in Stavanger and Kristiansund, Norway.',
  },
  da: {
    defaultTitle: 'Samsari | Produkter og skræddersyede systemer',
    defaultDescription:
      'Samsari udvikler egne softwareprodukter og skræddersyede systemer med AI, Power Platform og Microsoft 365. Vi holder til i Stavanger og Kristiansund.',
  },
  sv: {
    defaultTitle: 'Samsari | Produkter och skräddarsydda system',
    defaultDescription:
      'Samsari utvecklar egna programvaruprodukter och skräddarsydda system med AI, Power Platform och Microsoft 365. Vi finns i Stavanger och Kristiansund.',
  },
};

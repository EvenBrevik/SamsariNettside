// @ts-check
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://samsari.no',
  adapter: cloudflare(),

  // Norsk ligger på rot (/om-oss), øvrige språk får prefiks (/en/about).
  // `redirectToDefaultLocale: false` hindrer at /nb/... blir en duplikat-URL.
  i18n: {
    defaultLocale: 'nb',
    locales: ['nb', 'en', 'da', 'sv'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    react(),
    sitemap({
      // Gir Google hreflang-alternativene direkte i sitemapet, i tillegg til
      // <link rel="alternate"> i <head>. Nøklene må være språkkoder, ikke landkoder.
      i18n: {
        defaultLocale: 'nb',
        locales: { nb: 'nb-NO', en: 'en', da: 'da-DK', sv: 'sv-SE' },
      },
    }),
  ],

  env: {
    schema: {
      // Turnstile — spamfilter på kontaktskjemaet.
      // Mangler nøklene, avviser API-et innsendinger i stedet for å slippe dem gjennom.
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),

      // Cloudflare Web Analytics — cookieløs besøksstatistikk.
      // Uten token lastes ingen sporing i det hele tatt.
      PUBLIC_CF_ANALYTICS_TOKEN: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),

      // Sanity — kilden til redaksjonelt innhold. Datasettet er offentlig lesbart,
      // så her trengs ingen token; verdiene er satt som default og kan overstyres.
      SANITY_PROJECT_ID: envField.string({
        context: 'server',
        access: 'public',
        default: 'iahqo8w0',
      }),
      SANITY_DATASET: envField.string({
        context: 'server',
        access: 'public',
        default: 'production',
      }),
      SANITY_API_VERSION: envField.string({
        context: 'server',
        access: 'public',
        default: '2024-01-01',
      }),

      // Resend — utsending av e-post fra skjemaet.
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO_EMAIL: envField.string({
        context: 'server',
        access: 'public',
        default: 'oliver@samsari.no',
      }),
      CONTACT_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'public',
        default: 'Samsari nettside <skjema@samsari.no>',
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
// @ts-check
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://samsari.no',
  adapter: cloudflare(),
  integrations: [sitemap()],

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

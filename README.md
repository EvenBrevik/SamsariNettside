# Samsari nettside

Markedsnettsted for Samsari. Statisk generert med Astro, publisert på Cloudflare Workers.

## Stack

- **Astro 7:** alle sider prerendres til HTML ved bygg
- **Tailwind CSS 4:** CSS-først, tokens i `src/styles/global.css`
- **Sanity:** kundecase og blogg, hentet ved byggtid
- **Cloudflare Workers:** statiske assets + ett API-endepunkt
- **Resend + Turnstile:** kontaktskjema med spamfilter

Ingen React, ingen klientside-ruting. Eneste JavaScript i nettleseren er
kontaktskjemaet og Turnstile-widgeten; mobilmenyen bruker native `<details>`.

## Kom i gang

```bash
npm install
cp .env.example .env   # fyll inn nøkler, se under
npm run dev            # http://localhost:4321
```

| Kommando          | Hva den gjør                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Utviklingsserver med hot reload                  |
| `npm run build`   | Bygger til `dist/`                               |
| `npm run preview` | Bygger og kjører mot ekte Workers-runtime        |
| `npm run deploy`  | Bygger og deployer til Cloudflare                |
| `npm run check`   | Typesjekk av `.astro`- og `.ts`-filer            |

## Struktur

```
src/
  pages/           en fil per rute
    api/kontakt.ts eneste ruten som kjører som Worker
  layouts/         Base.astro: head, SEO, header, footer
  components/      Header, Footer, Section, Button, Faq, CtaBand, Seo
  lib/sanity.ts    Sanity-klient og spørringer (kjøres ved bygg)
  data/site.ts     kontaktinfo, navigasjon, booking-URL
  styles/          designtokens og brødtekststiler
public/
  _redirects       301-er fra de gamle engelske URL-ene
studio-samsari-studio/   Sanity Studio (eget prosjekt)
```

## Ruter

| URL                 | Innhold                        |
| ------------------- | ------------------------------ |
| `/`                 | Forside                        |
| `/tjenester`        | Tjenester og produkter         |
| `/kundecase`        | Oversikt (Sanity)              |
| `/kundecase/[slug]` | Detalj (Sanity)                |
| `/blogg`            | Oversikt (Sanity)              |
| `/blogg/[slug]`     | Artikkel (Sanity)              |
| `/om-oss`           | Om oss                         |
| `/kontakt`          | Kontaktskjema                  |
| `/personvern`       | Personvernerklæring            |

Bloggen skjules automatisk i menyen så lenge Sanity ikke har publiserte
artikler. Lenken dukker opp av seg selv ved neste bygg etter publisering.

## Miljøvariabler

Se `.env.example`. Lokalt leses de fra `.env`. I produksjon settes hemmelighetene
som Cloudflare-secrets:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put RESEND_API_KEY
```

De offentlige (`PUBLIC_*`, `CONTACT_*`) bakes inn ved bygg og må derfor være satt
i byggmiljøet.

Mangler Turnstile- eller Resend-nøkkel, avviser `/api/kontakt` innsendinger med
en tydelig feilmelding i stedet for å slippe dem gjennom uten spamfilter.

## Innhold

Kundecase og blogginnlegg redigeres i Sanity Studio og hentes **ved byggtid**.
Nytt innhold blir ikke synlig før siden bygges på nytt. Sett opp en webhook i
Sanity mot en Cloudflare deploy hook, ellers må du deploye manuelt.

## Deploy

```bash
npm run deploy
```

Bygget legger statiske filer i `dist/client` og Worker-koden i `dist/server`.
`wrangler.jsonc` peker på begge.

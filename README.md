# Samsari nettside

Markedsnettsted for Samsari. Statisk generert med Astro, publisert på Cloudflare Workers.

> **Status: fundament.** Siden er revet og bygges opp på nytt på branchen
> `complete-rework`. Det som står nå er rammeverket — ruting, flerspråklighet,
> SEO og innholdskilde. Det finnes ingen design, layout eller innholdssider ennå;
> forsiden er en tom plassholder.

## Stack

- **Astro 7:** alle sider prerendres til HTML ved bygg
- **React:** tilgjengelig for interaktive øyer, lastes kun der det faktisk brukes
- **Tailwind CSS 4:** CSS-først, designtokens legges i `src/styles/global.css`
- **Sanity:** kilde til redaksjonelt innhold, hentes ved byggtid
- **Cloudflare Workers:** statiske assets + plass til API-endepunkter
- **Resend + Turnstile:** konfigurert for kontaktskjema (skjemaet er ikke bygget ennå)

## Kom i gang

```bash
npm install
cp .env.example .env   # fyll inn nøkler, se under
npm run dev            # http://localhost:4321
```

| Kommando          | Hva den gjør                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Utviklingsserver med hot reload           |
| `npm run build`   | Bygger til `dist/`                        |
| `npm run preview` | Bygger og kjører mot ekte Workers-runtime |
| `npm run deploy`  | Bygger og deployer til Cloudflare         |
| `npm run check`   | Typesjekk av `.astro`- og `.ts`-filer     |

> **Windows/OneDrive:** ligger repoet i en OneDrive-mappe, kan `node_modules/.vite`
> bli låst under synkronisering og bygget feile med `EBUSY`. Kjør da
> `npx astro build --force`, eller flytt Vite-cachen ut av OneDrive med
> `VITE_CACHE_DIR`.

## Språk

Fire språk, med norsk på rot og prefiks på de øvrige:

| Språk   | Kode | URL       |
| ------- | ---- | --------- |
| Norsk   | `nb` | `/`       |
| Engelsk | `en` | `/en/…`   |
| Dansk   | `da` | `/da/…`   |
| Svensk  | `sv` | `/sv/…`   |

Rutingen er Astros innebygde i18n — ingen runtime-bibliotek, null JavaScript
sendt til nettleseren for oversettelse. Hvert språk får sin egen statiske side,
som er det Google trenger for å indeksere dem hver for seg.

Legge til en tekst:

1. Legg nøkkelen i `src/i18n/ui/nb.ts` (norsk er kilden og definerer typen)
2. TypeScript gir feil i `en.ts`, `da.ts` og `sv.ts` til alle har samme nøkkel
3. Bruk den med `const t = useTranslations(locale)` og `t('min.nokkel')`

Nye sider legges to steder: `src/pages/<rute>.astro` for norsk, og
`src/pages/[locale]/<rute>.astro` for de tre andre.

**SEO per språk** håndteres av `Seo.astro`: `hreflang` mellom alle språkversjoner
pluss `x-default` på norsk, riktig `og:locale`, språksatt `<html lang>` og
oversatt tittel/beskrivelse fra `src/i18n/meta.ts`. Sitemapet får de samme
koblingene. Har en side ikke alle oversettelser, send inn `availableLocales` —
ellers lover `hreflang` sider som ikke finnes.

## Struktur

```
src/
  pages/           en fil per rute
    index.astro          norsk forside
    [locale]/index.astro forside på en, da, sv
    404.astro
  layouts/Base.astro   html-skall, head, SEO, skip-link
  components/Seo.astro  meta, Open Graph, hreflang
  i18n/
    config.ts      språkkoder og sti-hjelpere
    utils.ts       useTranslations()
    meta.ts        tittel/beskrivelse per språk
    ui/            ordbøker: nb (kilde), en, da, sv
  lib/sanity.ts    Sanity-klient og bilde-URL-bygger
  data/
    site.ts        språknøytrale fakta: kontakt, sosiale profiler
    schema.ts      JSON-LD om organisasjonen
  styles/global.css  reset og tilgjengelighet — designtokens kommer
public/
  _redirects       301-er fra de gamle engelske URL-ene
  robots.txt
studio-samsari-studio/   Sanity Studio (eget prosjekt)
```

`public/_redirects` peker på norske ruter (`/tjenester`, `/kundecase`, `/blogg`
med flere) som ennå ikke er bygget. Reglene er beholdt fordi de bærer opptjent
ranking fra de gamle engelske URL-ene, og blir riktige igjen etter hvert som
sidene kommer på plass.

## Miljøvariabler

Se `.env.example`. Lokalt leses de fra `.env`. I produksjon settes hemmelighetene
som Cloudflare-secrets:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put RESEND_API_KEY
```

De offentlige (`PUBLIC_*`, `CONTACT_*`, `SANITY_*`) bakes inn ved bygg og må
derfor være satt i byggmiljøet. Sanity-verdiene har fungerende defaults i
`astro.config.mjs` og trengs bare hvis du peker mot et annet prosjekt.

## Innhold

Redaksjonelt innhold redigeres i Sanity Studio og hentes **ved byggtid**. Nytt
innhold blir ikke synlig før siden bygges på nytt. Sett opp en webhook i Sanity
mot en Cloudflare deploy hook, ellers må du deploye manuelt.

## Deploy

```bash
npm run deploy
```

Bygget legger statiske filer i `dist/client` og Worker-koden i `dist/server`.
`wrangler.jsonc` peker på begge.

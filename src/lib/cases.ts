import type { PortableTextBlock, ArbitraryTypedObject } from '@portabletext/types';
import { sanityClient } from './sanity';
import { languageFilter } from './content-language';
import { DEFAULT_LOCALE, type Locale } from '../i18n/config';

/** En blokk i «Ekstra innhold»: avsnitt, overskrift, liste, sitat eller bilde. */
export type CaseContentBlock = PortableTextBlock | ArbitraryTypedObject;

export interface SanityImage {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
}

/** Ett kundecase slik forsiden og kundecase-sidene bruker det. */
export interface CaseStudy {
  _id: string;
  company: string;
  slug: string | null;
  sector: string | null;
  /** Kort ingress skrevet for oversikten. Faller tilbake på problemteksten. */
  intro: string | null;
  problem: string | null;
  solution: string | null;
  result: string | null;
  metrics: string[] | null;
  /** Tjenester og teknologi, vises som stikkord. */
  services: string[] | null;
  /** Forsidebilde — hovedbildet for casen. */
  mainImage?: SanityImage | null;
  /** Kundens logo. Eget felt fra mainImage. */
  logo?: SanityImage | null;
  /** Ekstra innhold som Portable Text: tekst, overskrifter, sitater og bilder. */
  content?: CaseContentBlock[] | null;
  testimonial?: { quote?: string; name?: string; role?: string } | null;
  /** Prosjektdato satt redaksjonelt. Foretrekkes over Sanitys tidsstempler. */
  date: string | null;
  featured: boolean | null;
  /** SEO-overstyringer. Tomme felt betyr «regn den ut». */
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage?: SanityImage | null;
  /** Dokumentets hovedspråk, satt av oversettelses-pluginet. */
  language?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Feltene som hentes. Språkvalget skjer i filteret (se languageFilter) — hvert
 * språk er sitt eget dokument. coalesce dekker eldre _no-felt fra før
 * migreringen, slik at innhold som ikke er flyttet ennå fortsatt vises.
 */
const CASE_FIELDS = `
  _id,
  company,
  "slug": slug.current,
  "sector": coalesce(sector, sector_no),
  "intro": coalesce(intro, intro_no),
  "problem": coalesce(problem, problem_no),
  "solution": coalesce(solution, solution_no),
  "result": coalesce(result, result_no),
  "metrics": coalesce(metrics, metrics_no),
  "content": coalesce(content, content_no),
  services,
  mainImage,
  logo,
  testimonial,
  date,
  featured,
  seoTitle,
  seoDescription,
  ogImage,
  language,
  "createdAt": _createdAt,
  "updatedAt": _updatedAt
`;

/**
 * Alle kundecase, i rekkefølgen satt i studioet. Caser uten slug tas med her —
 * oversikten viser dem, men uten lenke videre.
 *
 * `order` er et nøkkelord i GROQ, så feltet må adresseres som @.order.
 */
export async function getAllCases(locale: Locale = DEFAULT_LOCALE): Promise<CaseStudy[]> {
  try {
    return await sanityClient.fetch<CaseStudy[]>(`
      *[_type == "case" && ${languageFilter(locale)}]
        | order(coalesce(@.order, 99) asc, company asc) { ${CASE_FIELDS} }
    `);
  } catch (error) {
    console.warn('Kunne ikke hente kundecase fra Sanity:', error);
    return [];
  }
}

/** Kun caser som har slug — det er disse som kan få en egen underside. */
export async function getCasesWithSlug(locale: Locale = DEFAULT_LOCALE): Promise<CaseStudy[]> {
  const all = await getAllCases(locale);
  return all.filter((item) => Boolean(item.slug));
}

/**
 * Casen som skal fremheves på forsiden: den som er merket «featured», ellers
 * den første i rekkefølgen. Da styres forsiden fra studioet i stedet for av et
 * firmanavn hardkodet i komponenten.
 */
export async function getFeaturedCase(locale: Locale = DEFAULT_LOCALE): Promise<CaseStudy | null> {
  const all = await getAllCases(locale);
  return all.find((item) => item.featured) ?? all[0] ?? null;
}

/**
 * Deler et tekstfelt fra Sanity i avsnitt. Feltene er `text`, ikke Portable
 * Text, og studioet ber om blank linje mellom avsnitt — den splitter vi på.
 */
export function toParagraphs(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Nøkkeltall uten tomme strenger. */
export function cleanMetrics(metrics: string[] | null | undefined, limit = 3): string[] {
  return (metrics ?? [])
    .map((metric) => metric?.trim())
    .filter((metric): metric is string => Boolean(metric))
    .slice(0, limit);
}

/**
 * Ingressen som skal stå under overskriften: den redaksjonelle om den finnes,
 * ellers resultatet (det mest konkrete), ellers utfordringen.
 */
export function leadText(study: CaseStudy | null | undefined): string {
  if (!study) return '';
  const intro = study.intro?.trim();
  if (intro) return intro;
  return toParagraphs(study.result)[0] ?? toParagraphs(study.problem)[0] ?? '';
}

/** Kutter til lengden Google faktisk viser, uten å dele et ord. */
export function truncate(value: string, max = 155): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** Metabeskrivelsen: redaksjonell om satt, ellers utledet av innholdet. */
export function metaDescription(study: CaseStudy): string {
  const manual = study.seoDescription?.trim();
  if (manual) return manual;
  return truncate(leadText(study));
}

/**
 * Bildet som skal brukes ved deling. Rekkefølgen er bevisst: et eget
 * delingsbilde vinner, så forsidebildet, så logoen.
 *
 * Kun `asset` sendes videre, ikke hotspot/crop: bildene her er ofte brede,
 * smale logoer, og hotspot-utsnittet ville kuttet dem til en midtstripe i
 * 1200×630-formatet. Delebildet skal vise hele merket.
 */
export function shareImageSource(study: CaseStudy): { _ref: string } | null {
  const source = study.ogImage?.asset ?? study.mainImage?.asset ?? study.logo?.asset;
  return source?._ref ? { _ref: source._ref } : null;
}

/**
 * Bildets egne mål, lest ut av asset-referansen. Sanity koder dem inn i id-en:
 * `image-<hash>-1129x160-webp`. Brukes til å be om hele bildeflaten og dermed
 * overstyre hotspot-utsnittet, som ellers følger med fra asset-dokumentet.
 */
export function refDimensions(ref: string | undefined): { width: number; height: number } | null {
  const match = ref?.match(/-(\d+)x(\d+)-[a-z]+$/);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

/**
 * Logoen som vises i oversikten og på undersiden. `logo` er det riktige feltet,
 * men de eksisterende casene har logoen liggende i `mainImage` — derfor
 * fallback, slik at innholdet som allerede finnes fortsatt vises.
 */
export function logoSource(study: CaseStudy): SanityImage | null {
  if (study.logo?.asset) return study.logo;
  if (study.mainImage?.asset) return study.mainImage;
  return null;
}

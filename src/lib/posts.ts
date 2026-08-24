import type { PortableTextBlock, ArbitraryTypedObject } from '@portabletext/types';
import { sanityClient } from './sanity';
import { languageFilter } from './content-language';
import { DEFAULT_LOCALE, type Locale } from '../i18n/config';
import type { SanityImage } from './cases';

export type PostContentBlock = PortableTextBlock | ArbitraryTypedObject;

export interface BlogPost {
  _id: string;
  title: string;
  slug: string | null;
  category: string | null;
  date: string | null;
  readingTime: string | null;
  excerpt: string | null;
  /** Frie stikkord fra studioet, i tillegg til den ene kategorien. */
  tags: string[] | null;
  featured: boolean | null;
  /** SEO-overstyringer. Tomme felt betyr «regn den ut». */
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage?: SanityImage | null;
  mainImage?: SanityImage | null;
  body?: PostContentBlock[] | null;
  language?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Feltene som hentes. Språkvalget skjer i filteret (se languageFilter) — hvert
 * språk er sitt eget dokument. coalesce dekker eldre _no-felt fra før
 * migreringen, slik at innhold som ikke er flyttet ennå fortsatt vises.
 */
const POST_FIELDS = `
  _id,
  "title": coalesce(title, title_no),
  "slug": slug.current,
  category,
  tags,
  date,
  featured,
  readingTime,
  "excerpt": coalesce(excerpt, excerpt_no),
  "body": coalesce(body, body_no),
  seoTitle,
  seoDescription,
  mainImage,
  ogImage,
  language,
  "createdAt": _createdAt,
  "updatedAt": _updatedAt
`;

/** Alle publiserte artikler, nyeste først. */
export async function getAllPosts(locale: Locale = DEFAULT_LOCALE): Promise<BlogPost[]> {
  try {
    return await sanityClient.fetch<BlogPost[]>(`
      *[_type == "blogPost" && defined(slug.current) && ${languageFilter(locale)}]
        | order(coalesce(date, _createdAt) desc) { ${POST_FIELDS} }
    `);
  } catch (error) {
    console.warn('Kunne ikke hente blogginnlegg fra Sanity:', error);
    return [];
  }
}

/**
 * Emnene som faktisk er i bruk, i alfabetisk rekkefølge. Filterknappene bygges
 * av denne — ikke av listen i schemaet — slik at det aldri vises et emne uten
 * artikler bak seg.
 */
export function categoriesOf(posts: readonly BlogPost[]): string[] {
  const set = new Set<string>();
  for (const post of posts) {
    const category = post.category?.trim();
    if (category) set.add(category);
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'nb'));
}

/** Formaterer datoen på sidens språk. Ugyldige verdier gir tom streng. */
export function formatDate(value: string | null | undefined, locale: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale === 'nb' ? 'nb-NO' : locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Teksten det søkes i. Samles ved bygg og legges i et data-attributt, slik at
 * søket i nettleseren slipper å grave i DOM-en for hvert tastetrykk.
 */
export function searchIndex(post: BlogPost): string {
  return [post.title, post.category, ...(post.tags ?? []), post.excerpt]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

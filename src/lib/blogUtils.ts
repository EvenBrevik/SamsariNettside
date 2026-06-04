import type { Language, BlogCategory } from '../content/siteContent';
import type { SanityImage } from './sanityImage';

export type SanityPost = {
  _id: string;
  slug: string;
  category: BlogCategory;
  date: string;
  readingTime: string;
  mainImage?: SanityImage;
  title_no: string;
  title_en?: string;
  excerpt_no: string;
  excerpt_en?: string;
  body_no?: Record<string, unknown>[];
  body_en?: Record<string, unknown>[];
};

export function formatPostDate(isoDate: string, lang: Language): string {
  if (!isoDate) return '';
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString(lang === 'no' ? 'nb-NO' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getTitle(post: SanityPost, lang: Language): string {
  return (lang === 'en' && post.title_en) ? post.title_en : post.title_no;
}

export function getExcerpt(post: SanityPost, lang: Language): string {
  return (lang === 'en' && post.excerpt_en) ? post.excerpt_en : post.excerpt_no;
}

export function getBody(post: SanityPost, lang: Language): Record<string, unknown>[] {
  return (lang === 'en' && post.body_en?.length ? post.body_en : post.body_no) ?? [];
}

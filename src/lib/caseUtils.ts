import type { Language } from '../content/siteContent';
import type { SanityImage } from './sanityImage';

export type SanityCase = {
  _id: string;
  company: string;
  mainImage?: SanityImage;
  sector_no: string;
  sector_en?: string;
  problem_no: string;
  problem_en?: string;
  solution_no: string;
  solution_en?: string;
  result_no: string;
  result_en?: string;
  metrics_no?: string[];
  metrics_en?: string[];
};

export function getSector(c: SanityCase, lang: Language) {
  return (lang === 'en' && c.sector_en) ? c.sector_en : c.sector_no;
}
export function getProblem(c: SanityCase, lang: Language) {
  return (lang === 'en' && c.problem_en) ? c.problem_en : c.problem_no;
}
export function getSolution(c: SanityCase, lang: Language) {
  return (lang === 'en' && c.solution_en) ? c.solution_en : c.solution_no;
}
export function getResult(c: SanityCase, lang: Language) {
  return (lang === 'en' && c.result_en) ? c.result_en : c.result_no;
}
export function getMetrics(c: SanityCase, lang: Language): string[] {
  return (lang === 'en' && c.metrics_en?.length ? c.metrics_en : c.metrics_no) ?? [];
}

export function getCaseSlug(company: string): string {
  return company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

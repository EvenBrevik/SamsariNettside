import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity';
import type { SanityCase } from '../lib/caseUtils';

const CASES_QUERY = `*[_type == "case"] | order(order asc, _createdAt desc) {
  _id,
  company,
  mainImage { asset, alt, hotspot, crop },
  sector_no, sector_en,
  problem_no, problem_en,
  solution_no, solution_en,
  result_no, result_en,
  metrics_no, metrics_en,
}`;

export function useSanityCases() {
  const [cases, setCases] = useState<SanityCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch<SanityCase[]>(CASES_QUERY)
      .then(setCases)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { cases, loading, error };
}

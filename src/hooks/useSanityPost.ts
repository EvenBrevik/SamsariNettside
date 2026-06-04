import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity';
import type { SanityPost } from '../lib/blogUtils';

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  category,
  date,
  readingTime,
  mainImage { asset, alt, hotspot, crop },
  title_no,
  title_en,
  excerpt_no,
  excerpt_en,
  body_no,
  body_en,
}`;

export function useSanityPost(slug: string) {
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch<SanityPost | null>(POST_QUERY, { slug })
      .then(setPost)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}

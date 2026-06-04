import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity';
import type { SanityPost } from '../lib/blogUtils';

const POSTS_QUERY = `*[_type == "blogPost"] | order(date desc) {
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
}`;

export function useSanityPosts() {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch<SanityPost[]>(POSTS_QUERY)
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

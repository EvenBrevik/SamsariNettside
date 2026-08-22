import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from 'astro:env/server';

// Leser publisert innhold fra Sanity. Ingen token: datasettet er offentlig,
// og `useCdn` gir den hurtigbufrede API-en, som er raskere og billigere.
export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

/** Bygger en URL til et Sanity-bilde, f.eks. `urlFor(bilde).width(1200).url()`. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

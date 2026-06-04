import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity';

const builder = imageUrlBuilder(sanityClient);

export type SanityImage = {
  asset: { _ref: string; _type?: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

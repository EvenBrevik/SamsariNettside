import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'iahqo8w0',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN as string | undefined,
});

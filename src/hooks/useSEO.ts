import { useEffect } from 'react';

const SITE_NAME = 'Samsari';
const BASE_TITLE = 'Effektiviserings partner Samsari';
const BASE_URL = 'https://samsari.no';
const OG_IMAGE = `${BASE_URL}/samsari-logo-dark.png`;

type SEOProps = {
  title?: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
};

export function useSEO({ title, description, path = '', type = 'website' }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : BASE_TITLE;
  const url = `${BASE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:image', OG_IMAGE, 'property');
    setMeta('og:locale', 'nb_NO', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', OG_IMAGE);

    setCanonical(url);

    return () => {
      document.title = BASE_TITLE;
    };
  }, [fullTitle, description, url, type]);
}

function setMeta(nameOrProp: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, nameOrProp);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

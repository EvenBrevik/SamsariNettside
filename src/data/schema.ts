import { site, contact, social } from './site';
import { SITE_META } from '../i18n/meta';
import type { Locale } from '../i18n/config';

// Strukturerte data (JSON-LD) om selskapet. Legges inn på hver side via Base-layouten,
// og er det Google bruker til å knytte navn, adresse og profiler sammen til én enhet.
// Beskrivelsen følger sidens språk; resten er språknøytrale fakta.
export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: SITE_META[locale].defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressCountry: contact.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: contact.generalEmail,
      telephone: contact.phone,
      contactType: 'customer service',
    },
    sameAs: [social.linkedin, social.instagram, social.facebook],
  };
}

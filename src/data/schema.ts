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

/**
 * Brødsmuler. Google bruker dem til å vise stien i stedet for den rå URL-en i
 * søkeresultatet. `items` er stien uten forsiden — den legges på her.
 */
export function breadcrumbSchema(
  items: readonly { name: string; url: string }[],
  homeLabel: string,
) {
  const trail = [{ name: homeLabel, url: site.url }, ...items];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Ett kundecase som Article. Casene er redaksjonelt innhold om et konkret
 * oppdrag, ikke produkter eller anmeldelser — Article er den ærlige typen.
 * `about` knytter artikkelen til kunden det handler om.
 */
export function caseArticleSchema(input: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  /** Organisasjonen artikkelen handler om. Utelates for redaksjonelt stoff. */
  clientName?: string;
  locale: Locale;
  datePublished?: string;
  dateModified?: string;
  /** Tjenester og teknologi brukt i prosjektet — blir `about`-emner. */
  services?: readonly string[];
}) {
  // Emnene siden handler om: kunden først, så teknologien. Google bruker dem
  // til å forstå hva artikkelen dekker.
  const about: Record<string, string>[] = [
    ...(input.clientName ? [{ '@type': 'Organization', name: input.clientName }] : []),
    ...(input.services ?? [])
      .map((service) => service?.trim())
      .filter(Boolean)
      .map((service) => ({ '@type': 'Thing', name: service as string })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    url: input.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    inLanguage: input.locale,
    ...(input.image ? { image: [input.image] } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    about,
  };
}

/**
 * Tjenestetilbudet som strukturerte data. `hasOfferCatalog` lar Google se hva
 * vi faktisk leverer, ikke bare at siden heter «Tjenester». `areaServed`
 * knytter det til Norge, som er markedet vi opererer i.
 */
export function servicesSchema(input: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
  offers: readonly { name: string; description: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale,
    serviceType: input.name,
    areaServed: { '@type': 'Country', name: 'Norway' },
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: input.name,
      itemListElement: input.offers.map((offer) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer.name,
          description: offer.description,
        },
      })),
    },
  };
}

/**
 * FAQ-en som strukturerte data. Google kan vise spørsmålene direkte i
 * søkeresultatet, og de matcher det som faktisk står på siden.
 */
export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/**
 * Oversikten som en liste over casene. Gir Google sammenhengen mellom
 * oversiktssiden og undersidene.
 */
export function caseListSchema(
  items: readonly { name: string; url: string }[],
  name: string,
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

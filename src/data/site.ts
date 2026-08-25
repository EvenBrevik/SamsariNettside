// Ett sted for alle faktaopplysninger om Samsari.
// Alt som brukes i SEO, strukturerte data, header og footer hentes herfra,
// slik at en endring av e-post eller adresse aldri må gjøres to steder.

// Språknøytrale fakta. Tittel og beskrivelse per språk ligger i src/i18n/meta.ts.
export const site = {
  name: 'Samsari',
  url: 'https://samsari.no',
  // Byttes ut når det finnes et delebilde igjen. Ligger i /public.
  ogImage: '/og-default.png',
  // Formatert i tregrupper slik Brønnøysundregistrene skriver det.
  orgNumber: '936 276 474',
} as const;

export const contact = {
  email: 'oliver@samsari.no',
  generalEmail: 'hei@samsari.no',
  phone: '+47 407 00 457',
  phoneHref: 'tel:+4740700457',
  address: {
    street: 'Hagbart Brinchmanns vei 20',
    postalCode: '6510',
    city: 'Kristiansund',
    country: 'NO',
  },
} as const;

/**
 * De ansatte med egne kontaktopplysninger. Navn og stillinger ligger i
 * ordbøkene (ab.team.*), siden de oversettes — her ligger bare det
 * språknøytrale: e-post og telefon.
 */
export const people = [
  {
    key: 'oliver',
    email: 'oliver@samsari.no',
    phone: '+47 407 00 457',
    phoneHref: 'tel:+4740700457',
    linkedin: 'https://www.linkedin.com/in/oliver-lyso/',
  },
  {
    key: 'even',
    email: 'even@samsari.no',
    phone: '+47 940 53 044',
    phoneHref: 'tel:+4794053044',
    linkedin: 'https://www.linkedin.com/in/evenbrevik/',
  },
  {
    key: 'adrian',
    email: 'adrian@samsari.no',
    phone: '+47 405 70 555',
    phoneHref: 'tel:+4740570555',
    linkedin: 'https://www.linkedin.com/in/adrian-rurkowski-152ba4354/',
  },
] as const;

export const social = {
  linkedin: 'https://www.linkedin.com/company/106360744/',
  instagram: 'https://www.instagram.com/samsari_no/',
  facebook: 'https://www.facebook.com/profile.php?id=61587026797848',
} as const;

export const BOOKING_URL =
  'https://outlook.office.com/book/Kartleggingsmte@ressems.com/s/0oUQusW6i0eKIjfcJID8RA2?ismsaljsauthenabled';

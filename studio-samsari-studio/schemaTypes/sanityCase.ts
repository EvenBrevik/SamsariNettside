import { defineField, defineType } from 'sanity';

export const sanityCase = defineType({
  name: 'case',
  title: 'Kundecase',
  type: 'document',

  groups: [
    { name: 'content', title: 'Innhold', default: true },
    { name: 'details', title: 'Detaljer' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    // -------------------------
    // SPRÅK
    // -------------------------

    defineField({
      name: 'language',
      title: 'Språk',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // -------------------------
    // INNHOLD
    // -------------------------

    defineField({
      name: 'company',
      title: 'Bedriftsnavn',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'intro',
      title: 'Kort ingress',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'Kort oppsummering av kunden og prosjektet. Vises øverst på kundecaset og kan brukes på oversiktssiden.',
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: 'mainImage',
      title: 'Forsidebilde',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'logo',
      title: 'Kundelogo',
      type: 'image',
      group: 'content',
      description:
        'Valgfritt. Bruk gjerne transparent PNG eller SVG-kompatibelt format.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'problem',
      title: 'Utfordringen',
      type: 'text',
      rows: 6,
      group: 'content',
      description: 'Hva ønsket kunden å løse eller forbedre?',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'solution',
      title: 'Løsningen',
      type: 'text',
      rows: 6,
      group: 'content',
      description: 'Hva utviklet eller implementerte Samsari?',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'result',
      title: 'Resultatet',
      type: 'text',
      rows: 6,
      group: 'content',
      description: 'Hvilken verdi eller forbedring oppnådde kunden?',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'content',
      title: 'Ekstra innhold',
      type: 'array',
      group: 'content',
      description:
        'Valgfritt. Brukes til ekstra tekst, skjermbilder eller bilder fra løsningen.',

      of: [
        {
          type: 'block',

          styles: [
            { title: 'Vanlig tekst', value: 'normal' },
            { title: 'Overskrift 2', value: 'h2' },
            { title: 'Overskrift 3', value: 'h3' },
            { title: 'Sitat', value: 'blockquote' },
          ],

          lists: [
            { title: 'Punktliste', value: 'bullet' },
            { title: 'Nummerert liste', value: 'number' },
          ],

          marks: {
            decorators: [
              { title: 'Fet', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
            ],

            annotations: [
              {
                name: 'link',
                title: 'Lenke',
                type: 'object',

                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https'],
                      }),
                  },
                ],
              },
            ],
          },
        },

        {
          type: 'image',
          title: 'Bilde',
          options: {
            hotspot: true,
          },

          fields: [
            {
              name: 'alt',
              title: 'Alternativ tekst',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Bildetekst',
              type: 'string',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'testimonial',
      title: 'Kundesitat',
      type: 'object',
      group: 'content',

      fields: [
        defineField({
          name: 'quote',
          title: 'Sitat',
          type: 'text',
          rows: 4,
        }),

        defineField({
          name: 'name',
          title: 'Navn',
          type: 'string',
        }),

        defineField({
          name: 'role',
          title: 'Stilling',
          type: 'string',
        }),
      ],
    }),

    // -------------------------
    // DETALJER
    // -------------------------

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'details',
      description:
        'URL-slug for denne språkversjonen. Norsk og engelsk kan ha forskjellige slugs.',
      options: {
        source: 'company',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'sector',
      title: 'Bransje',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'services',
      title: 'Tjenester og teknologi',
      type: 'array',
      group: 'details',
      description:
        'F.eks. Power Platform, AI, Automatisering, React eller Microsoft 365.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'metrics',
      title: 'Nøkkeltall',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      description:
        'Korte resultater, f.eks. "10+ timer spart per uke". Maks tre anbefales.',
      validation: (Rule) => Rule.max(3),
    }),

    defineField({
      name: 'date',
      title: 'Prosjektdato',
      type: 'date',
      group: 'details',
      description: 'Valgfritt. Når prosjektet/caset ble gjennomført.',
    }),

    defineField({
      name: 'featured',
      title: 'Fremhevet kundecase',
      type: 'boolean',
      group: 'details',
      description:
        'Brukes dersom caset skal fremheves på forsiden eller kundecase-siden.',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
      group: 'details',
      description: 'Lavere tall vises først, f.eks. 1, 2, 3.',
    }),

    // -------------------------
    // SEO
    // -------------------------

    defineField({
      name: 'seoTitle',
      title: 'SEO-tittel',
      type: 'string',
      group: 'seo',
      description:
        'Valgfritt. Hvis tom kan nettsiden bruke bedriftsnavnet automatisk.',
      validation: (Rule) =>
        Rule.max(60).warning('Prøv å holde tittelen under ca. 60 tegn.'),
    }),

    defineField({
      name: 'seoDescription',
      title: 'Meta-beskrivelse',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) =>
        Rule.max(160).warning('Prøv å holde teksten under ca. 160 tegn.'),
    }),

    defineField({
      name: 'ogImage',
      title: 'Delingsbilde',
      type: 'image',
      group: 'seo',
      description:
        'Valgfritt bilde for LinkedIn og andre sosiale medier. Hvis tomt kan forsidebildet brukes.',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'company',
      sector: 'sector',
      language: 'language',
      media: 'mainImage',
    },

    prepare({ title, sector, language, media }) {
      const languageLabel =
        language === 'en' ? '🇬🇧 English' : '🇳🇴 Norsk';

      return {
        title,
        subtitle: `${languageLabel} · ${sector ?? 'Ingen bransje'}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Rekkefølge',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nyeste først',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});
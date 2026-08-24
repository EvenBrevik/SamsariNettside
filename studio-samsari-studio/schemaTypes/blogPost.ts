import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blogginnlegg',
  type: 'document',

  groups: [
    { name: 'content', title: 'Innhold', default: true },
    { name: 'settings', title: 'Innstillinger' },
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
      name: 'title',
      title: 'Tittel',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Ingress',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'Kort introduksjon til artikkelen. Brukes også på bloggoversikten.',
      validation: (Rule) => Rule.required().max(300),
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
          description: 'Beskriv bildet kort for tilgjengelighet og SEO.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Bildetekst',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Artikkelinnhold',
      type: 'array',
      group: 'content',

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
              { title: 'Kode', value: 'code' },
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
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    title: 'Åpne i ny fane',
                    type: 'boolean',
                    initialValue: false,
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

      validation: (Rule) => Rule.required(),
    }),

    // -------------------------
    // INNSTILLINGER
    // -------------------------

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'settings',
      description:
        'URL-slug for denne språkversjonen. Norsk og engelsk kan ha forskjellige slugs.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Power Platform', value: 'Power Platform' },
          { title: 'AI', value: 'AI' },
          { title: 'Microsoft 365', value: 'Microsoft 365' },
          { title: 'Automatisering', value: 'Automatisering' },
          { title: 'Teknologi', value: 'Teknologi' },
          { title: 'Digitalisering', value: 'Digitalisering' },
          { title: 'Samsari', value: 'Samsari' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tags',
      title: 'Stikkord',
      type: 'array',
      group: 'settings',
      description: 'Eksempel: Copilot, Power Apps, AI-agenter',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'date',
      title: 'Publiseringsdato',
      type: 'date',
      group: 'settings',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'readingTime',
      title: 'Lesetid',
      type: 'string',
      group: 'settings',
      description:
        'F.eks. "5 min". Kan senere beregnes automatisk på nettsiden.',
    }),

    defineField({
      name: 'featured',
      title: 'Fremhevet artikkel',
      type: 'boolean',
      group: 'settings',
      description:
        'Brukes dersom artikkelen skal fremheves på forsiden eller bloggoversikten.',
      initialValue: false,
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
        'Valgfritt. Hvis tom brukes artikkelens vanlige tittel.',
      validation: (Rule) =>
        Rule.max(60).warning('Google viser vanligvis rundt 50–60 tegn.'),
    }),

    defineField({
      name: 'seoDescription',
      title: 'Meta-beskrivelse',
      type: 'text',
      rows: 3,
      group: 'seo',
      description:
        'Kort beskrivelse som kan vises i Google søkeresultater.',
      validation: (Rule) =>
        Rule.max(160).warning('Prøv å holde beskrivelsen under 160 tegn.'),
    }),

    defineField({
      name: 'ogImage',
      title: 'Delingsbilde',
      type: 'image',
      group: 'seo',
      description:
        'Valgfritt bilde for LinkedIn, Facebook osv. Hvis tomt kan forsidebildet brukes.',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      language: 'language',
      media: 'mainImage',
    },

    prepare({ title, category, language, media }) {
      const languageLabel =
        language === 'en' ? '🇬🇧 English' : '🇳🇴 Norsk';

      return {
        title,
        subtitle: `${languageLabel} · ${category ?? 'Ingen kategori'}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Nyeste først',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Eldste først',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
});
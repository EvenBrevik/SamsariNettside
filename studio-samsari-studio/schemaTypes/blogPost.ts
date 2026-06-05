import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blogginnlegg',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title_no', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Power Platform', value: 'Power Platform' },
          { title: 'AI', value: 'AI' },
          { title: 'Microsoft 365', value: 'Microsoft 365' },
          { title: 'Automatisering', value: 'Automatisering' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publiseringsdato',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Lesetid (f.eks. "5 min")',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Forsidebilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternativ tekst', type: 'string' }),
      ],
    }),
    // --- Norsk ---
    defineField({ name: 'title_no', title: 'Tittel (Norsk)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt_no', title: 'Ingress (Norsk)', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'body_no', title: 'Innhold (Norsk)', type: 'array', of: [{ type: 'block' }] }),
    // --- English ---
    defineField({ name: 'title_en', title: 'Title (English)', type: 'string' }),
    defineField({ name: 'excerpt_en', title: 'Excerpt (English)', type: 'text', rows: 3 }),
    defineField({ name: 'body_en', title: 'Body (English)', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: {
    select: { title: 'title_no', subtitle: 'category', media: 'mainImage' },
  },
  orderings: [
    { title: 'Nyeste først', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
});

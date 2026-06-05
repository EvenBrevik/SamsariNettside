import { defineField, defineType } from 'sanity';

export const sanityCase = defineType({
  name: 'case',
  title: 'Kundecase',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Bedriftsnavn',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
      description: 'Lavere tall vises først (f.eks. 1, 2, 3)',
    }),
    // --- Norsk ---
    defineField({ name: 'sector_no', title: 'Bransje (Norsk)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'problem_no', title: 'Problem (Norsk)', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'solution_no', title: 'Løsning (Norsk)', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'result_no', title: 'Resultat (Norsk)', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'metrics_no', title: 'Nøkkeltall (Norsk)', type: 'array', of: [{ type: 'string' }], description: 'F.eks. "34% raskere behandling"' }),
    // --- English ---
    defineField({ name: 'sector_en', title: 'Sector (English)', type: 'string' }),
    defineField({ name: 'problem_en', title: 'Problem (English)', type: 'text', rows: 3 }),
    defineField({ name: 'solution_en', title: 'Solution (English)', type: 'text', rows: 3 }),
    defineField({ name: 'result_en', title: 'Result (English)', type: 'text', rows: 3 }),
    defineField({ name: 'metrics_en', title: 'Key metrics (English)', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'company', subtitle: 'sector_no', media: 'mainImage' },
  },
  orderings: [
    { title: 'Rekkefølge', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
});

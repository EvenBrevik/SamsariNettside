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
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description:
        'Adressen casen får: /kundecase/<slug>. Klikk "Generate" for å lage den fra bedriftsnavnet. Endrer du den senere, dør gamle lenker.',
      options: { source: 'company', maxLength: 96 },
    }),
    defineField({
      name: 'mainImage',
      title: 'Forsidebilde',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alternativ tekst', type: 'string' })],
    }),
    defineField({
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
      description: 'Lavere tall vises først (f.eks. 1, 2, 3)',
    }),
    defineField({
      name: 'sector_no',
      title: 'Bransje',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problem_no',
      title: 'Problem',
      type: 'text',
      rows: 5,
      description: 'Skill avsnitt med en blank linje.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solution_no',
      title: 'Løsning',
      type: 'text',
      rows: 5,
      description: 'Skill avsnitt med en blank linje.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'result_no',
      title: 'Resultat',
      type: 'text',
      rows: 5,
      description: 'Skill avsnitt med en blank linje.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metrics_no',
      title: 'Nøkkeltall',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Korte stikkord, f.eks. "10+ timer spart per uke". Maks tre stykker vises.',
    }),
  ],
  preview: {
    select: { title: 'company', subtitle: 'sector_no', media: 'mainImage' },
  },
  orderings: [{ title: 'Rekkefølge', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});

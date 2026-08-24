import { defineConfig } from 'sanity'

import { structureTool } from 'sanity/structure'

import { visionTool } from '@sanity/vision'

import { documentInternationalization } from '@sanity/document-internationalization'

import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',

  title: 'Samsari Studio',

  projectId: 'iahqo8w0',

  dataset: 'production',

  plugins: [
    structureTool(),

    visionTool(),

    documentInternationalization({
      supportedLanguages: [
        {
          id: 'nb',
          title: 'Norsk',
        },
        {
          id: 'en',
          title: 'English',
        },
      ],

      schemaTypes: ['blogPost', 'case'],

      languageField: 'language',

      weakReferences: true,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
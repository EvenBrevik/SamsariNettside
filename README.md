# Samsari Nettside

Premium, modern website for Samsari built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/components` shared layout and UI components
- `src/pages` routed pages
- `src/content` centralized content and translation data
- `src/providers` app-wide settings such as theme and language
- `src/styles` global design tokens and styles
- `public` static assets and logos

## Features

- Responsive routed website
- Norwegian and English language switching
- Premium dark mode with persisted preference
- Centralized branding and design tokens
- Blog listing and blog post pages
- Contact form UI

## Git Workflow

Typical update flow:

```bash
git pull
git status
git add .
git commit -m "Describe your change"
git push
```

If dependencies change:

```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

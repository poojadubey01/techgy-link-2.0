# TechGy Link

Next.js (App Router) marketing site, built with React, Tailwind CSS and GSAP.

## Getting started

```sh
npm install
npm run dev
```

If PowerShell reports that `npm.ps1` cannot be loaded because script execution is
disabled, use `npm.cmd` in place of `npm` (for example, `npm.cmd run dev`).

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                  Routes, layouts and components (Next.js App Router)
  components/         Reusable UI components
  <route>/page.tsx     One folder per route (about, services, work, ...)
  layout.tsx           Root layout
  globals.css, ...     Global and shared styles
data/                 Site content (services, solutions, portfolio, insights, ...)
lib/                  Server-side helpers (e.g. contact form delivery)
public/               Static assets (images, fonts)
scripts/              Maintenance/build-check scripts
tests/                Test files
```

Content lives in `data/` as TypeScript modules (not JSON), so it's easy to read,
comment and edit directly. Start with `data/catalogue.ts` — it pulls together services,
solutions, work and campaigns used across the site.

Import shared code with the `@/` alias, e.g. `import { services } from "@/data/catalogue"`.

## Available scripts

```sh
npm run dev          # start the dev server
npm run build         # production build
npm start             # run the production build
npm run test:contact  # test the contact form logic
npm run check:build    # verify the build has no broken links/images
```

## Contact form delivery

By default the contact form runs in **preview mode** — it validates input but doesn't send
anything. To enable real delivery, copy `.env.example` to `.env.local` and set:

```dotenv
CONTACT_MODE=webhook
CONTACT_ENDPOINT=https://your-backend.example/contact
CONTACT_API_TOKEN=optional-server-side-token
```

The endpoint receives a JSON payload with `name`, `email`, `phone`, `services`, `budget` and
`message`. See `lib/contact.ts` for the full logic.

## Environment variables

See `.env.example` for all available variables, including `NEXT_PUBLIC_SITE_URL` (used for
the sitemap and metadata) and `SITE_INDEXING` (controls whether search engines are allowed
to index the site).
"# techgy-link-2.0" 
"# techgy-link-2.0" 

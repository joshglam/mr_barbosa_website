# Website Template

Reusable template for spinning up new local service business websites. Derived from r-deco-website.

## Setup

See SETUP.md for the full customization checklist.

## Architecture

- Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4
- All content is code-based in `lib/` (no CMS, no database)
- `lib/config.ts` is the central configuration file — edit this first
- Brand colors are CSS custom properties in `app/globals.css` via Tailwind `@theme`
- Casey AI chat widget lives in `components/casey/` and `lib/casey/`

## Key Files to Customize

1. `lib/config.ts` — business identity, phone, hours, social links
2. `app/globals.css` — brand colors (primary + accent palette)
3. `lib/services/types.ts` — service categories
4. `lib/services/*.ts` — individual service pages
5. `lib/locations.ts` — service area locations
6. `lib/blog.ts` — blog posts
7. `lib/resources.ts` — educational content / guides
8. `public/images/` — logo and hero images

## Conventions

- Every page uses `siteConfig` and `caseyConfig` from `lib/config.ts` — never hardcode business details
- Dynamic routes use `generateStaticParams()` for SSG
- Every page exports `generateMetadata()` for SEO
- Service data files are named after their category slug (e.g. `residential.ts`, `commercial.ts`)
- TODO comments mark places that need business-specific customization

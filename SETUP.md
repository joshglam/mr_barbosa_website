# Website Template — Setup Guide

This template is a production-ready Next.js 16 website for local service businesses. It includes dynamic service pages, location pages for local SEO, a blog, resource guides, a contact form, and an AI chat widget (Casey).

Derived from the r-deco-website (best-performing site in the portfolio).

## Quick Start

1. **Duplicate this folder** and rename it for your new business:
   ```bash
   cp -r website-template my-business-website
   cd my-business-website
   ```

2. **Update `package.json`** — change `"name"` from `"TEMPLATE_SLUG"` to your project slug (e.g. `"my-plumbing-website"`)

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the dev server:**
   ```bash
   npm run dev
   ```

## Customization Checklist

### Step 1: Core Configuration (`lib/config.ts`)

This is the single most important file. Update all fields:

- `name` — full business name
- `shortName` — abbreviated name for title tags
- `description` — 1-2 sentence business description
- `url` — production domain
- `email` — business email
- `city`, `state`, `stateAbbr` — primary location
- `neighborhood` — optional neighborhood
- `vertical` — industry (e.g. "roofing", "plumbing", "landscaping")
- `established` — founding year
- `schemaType` — Schema.org type (e.g. "HomeAndConstructionBusiness", "Plumber", "RoofingContractor")
- `operatingHours` — business hours
- `caseyConfig.phone` / `caseyConfig.phoneHref` — phone number
- `socialLinks` — uncomment and fill in your social URLs

### Step 2: Brand Colors (`app/globals.css`)

Replace the brand color palette in the `@theme` block:
- Generate a palette from your logo color at https://uicolors.app
- Replace all `--color-brand-*` values
- Replace `--color-accent-*` with a contrasting CTA color

### Step 3: Services (`lib/services/`)

1. **`types.ts`** — Update `serviceCategories` with your actual categories
2. Rename `category-one.ts` → your category slug (e.g. `residential.ts`)
3. Add your actual services with content, FAQs, and features
4. Update `index.ts` to import your renamed service files
5. Create a landing page for each category at `app/(site)/services/[category-slug]/page.tsx`

### Step 4: Locations (`lib/locations.ts`)

Add all cities/towns you serve. Each gets a page at `/locations/[slug]`.

### Step 5: Blog & Resources (`lib/blog.ts`, `lib/resources.ts`)

Add initial content. Resources should focus on "how much does X cost" guides for SEO.

### Step 6: Images (`public/images/`)

- `logo.png` — your business logo
- Payment method icons (if applicable)
- **Hero and service images can be auto-generated:**
  ```bash
  GOOGLE_AI_API_KEY=your-key npx tsx scripts/generate-images.ts
  ```
  This reads your `lib/config.ts` and service data to generate SEO-named images for every page. Get a free API key at https://aistudio.google.com/apikey

### Step 7: Google Analytics (`app/layout.tsx`)

Replace `G-XXXXXXXXXX` with your GA4 Measurement ID.

### Step 8: Casey AI Widget

Set environment variables:
```bash
NEXT_PUBLIC_CASEY_API_URL=https://your-casey-endpoint.com/casey/chat
NEXT_PUBLIC_CASEY_API_KEY=your-api-key
```

### Step 9: Legal Pages

Update `privacy/page.tsx` and `terms/page.tsx` with your business-specific legal details. Search for TODO comments.

### Step 10: Header & Footer

- `components/Header.tsx` — Update `popularLocations` with your top service areas
- `components/Footer.tsx` — Payment methods, social links

### Step 11: llms.txt (AEO)

Create `public/llms.txt` — a machine-readable summary of your business for AI crawlers (ChatGPT, Claude, Perplexity, Google AI). The `<link rel="llms-txt">` tag is already in the root layout.

Include:
- Business name, owner, location, phone, email, hours
- All services with links
- All service areas
- Key differentiators (what makes you different)
- Pricing overview
- Links to resources and social profiles
- Careers info if hiring

See the a-better-website's `public/llms.txt` for a complete example. This file is what AI models read when someone asks "what's a good [your vertical] company in [your city]?"

## Blog and Resource Content

The blog and resources pages merge two sources:
- Posts in `lib/blog.ts` and `lib/resources.ts`.
- Markdown files with YAML frontmatter in `content/blog/*.md` and `content/resources/*.md`.

Both sources are sorted by date (newest first) and look the same on the site.

Write and review each post by hand. The site has no automatic posting job. The weekly Claude job was removed on 2026-11-18, because it published posts with no review and with prices and facts that the model guessed.

## Article content in markdown...
```

### Content Sources

The blog and resources pages merge two sources:
- **Hand-written posts** in `lib/blog.ts` and `lib/resources.ts` (your manually crafted content)
- **Auto-generated posts** in `content/blog/*.md` and `content/resources/*.md`

Both are sorted by date (newest first) and rendered identically.

### Customization

- Edit the cron schedule in `.github/workflows/generate-content.yml`
- The generation script reads your `lib/config.ts` and service categories automatically
- No per-site prompt customization is needed — the script adapts to your config

## Architecture

```
app/                    # Next.js App Router pages
  (site)/               # Route group for all public pages
    services/           # Service pages (dynamic routes)
    locations/          # Location pages (dynamic routes)
    blog/               # Blog (dynamic routes)
    resources/          # Resource guides (dynamic routes)
components/             # Shared UI components
  casey/                # Casey AI chat widget
content/                # Markdown posts (written by hand)
  blog/                 # Blog posts (.md with YAML frontmatter)
  resources/            # Resource guides (.md with YAML frontmatter)
lib/                    # Data layer & business logic
  services/             # Service data (one file per category)
  casey/                # Chat widget state & API
  config.ts             # Site configuration (customize first!)
  content-loader.ts     # Markdown file loader (used at build time)
  locations.ts          # Service area data
  blog.ts               # Blog post data (hand-written + loads content/blog/*.md)
  resources.ts          # Resource/guide data (hand-written + loads content/resources/*.md)
  analytics.ts          # GA4 event tracking
scripts/                # Automation scripts
types/                  # TypeScript interfaces
public/images/          # Static assets
```

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with custom brand theme
- **Casey AI** chat widget for lead capture
- **GA4** event tracking
- **JSON-LD** structured data for SEO
- **Dynamic sitemap** and **robots.txt**

## Deployment

Build and deploy to Vercel or any Node.js host:

```bash
npm run build
npm run start
```

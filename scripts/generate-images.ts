/**
 * Generate hero/service images using Google Gemini Imagen 4.
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=... npx tsx scripts/generate-images.ts
 *
 * Reads siteConfig and service data to auto-generate SEO-friendly images
 * for every page that needs one. Skips images that already exist.
 */

import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GOOGLE_AI_API_KEY;
if (!API_KEY) {
  console.error('GOOGLE_AI_API_KEY environment variable is required');
  process.exit(1);
}

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images');

// ---------------------------------------------------------------------------
// Read site config and services from source files (avoids needing Next.js)
// ---------------------------------------------------------------------------

function extractString(src: string, key: string): string {
  const match = src.match(new RegExp(`${key}:\\s*['"\`]([^'"\`]+)['"\`]`));
  return match?.[1] ?? '';
}

function loadSiteConfig() {
  const src = fs.readFileSync(path.join(process.cwd(), 'lib', 'config.ts'), 'utf-8');
  return {
    name: extractString(src, 'name'),
    shortName: extractString(src, 'shortName'),
    city: extractString(src, 'city'),
    state: extractString(src, 'state'),
    stateAbbr: extractString(src, 'stateAbbr'),
    vertical: extractString(src, 'vertical'),
  };
}

interface ServiceInfo {
  slug: string;
  name: string;
  category: string;
}

function loadServices(): { categories: string[]; services: ServiceInfo[] } {
  const typesPath = path.join(process.cwd(), 'lib', 'services', 'types.ts');
  const src = fs.readFileSync(typesPath, 'utf-8');

  // Extract category slugs
  const categorySlugs: string[] = [];
  const slugRe = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = slugRe.exec(src)) !== null) categorySlugs.push(m[1]);

  // Load services from each category file
  const services: ServiceInfo[] = [];
  const servicesDir = path.join(process.cwd(), 'lib', 'services');
  for (const file of fs.readdirSync(servicesDir)) {
    if (file === 'types.ts' || file === 'index.ts' || !file.endsWith('.ts')) continue;
    const fileSrc = fs.readFileSync(path.join(servicesDir, file), 'utf-8');
    // Extract slug, name, category from each service object
    const serviceRe = /slug:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'/g;
    let sm;
    while ((sm = serviceRe.exec(fileSrc)) !== null) {
      services.push({ slug: sm[1], name: sm[2], category: sm[3] });
    }
  }

  return { categories: categorySlugs, services };
}

// ---------------------------------------------------------------------------
// Build image specs dynamically from config
// ---------------------------------------------------------------------------

interface ImageSpec {
  filename: string;
  prompt: string;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function buildImageSpecs(
  config: ReturnType<typeof loadSiteConfig>,
  categories: string[],
  services: ServiceInfo[],
): ImageSpec[] {
  const vertical = config.vertical;
  const city = config.city;
  const citySlug = slugify(city);
  const verticalSlug = slugify(vertical);

  const specs: ImageSpec[] = [];

  // --- Page heroes ---
  specs.push({
    filename: `about-${slugify(config.shortName)}-${citySlug}.jpg`,
    prompt: `Professional photograph of a bright, clean, modern home interior with natural sunlight, representing a professional ${vertical} business in ${city}, ${config.stateAbbr}, editorial interior photography, warm and inviting atmosphere`,
  });

  specs.push({
    filename: `${verticalSlug}-tips-blog-${citySlug}.jpg`,
    prompt: `Professional photograph representing a ${vertical} blog, neatly arranged supplies and tools of the trade on a clean surface, bright natural light, clean minimalist aesthetic, editorial product photography`,
  });

  specs.push({
    filename: `${verticalSlug}-resources-guide-${citySlug}.jpg`,
    prompt: `Professional photograph of a homeowner reviewing a ${vertical} pricing guide at a clean kitchen counter, bright modern home in background, natural light, warm tones, lifestyle editorial photography`,
  });

  specs.push({
    filename: `${verticalSlug}-service-${citySlug}-neighborhood.jpg`,
    prompt: `Professional photograph of a beautiful tree-lined residential street in ${city} ${config.state}, well-maintained suburban homes with green lawns, clear blue sky, warm golden hour lighting, real estate editorial photography`,
  });

  // --- Category heroes ---
  for (const cat of categories) {
    const catServices = services.filter((s) => s.category === cat);
    const serviceNames = catServices.map((s) => s.name).join(', ');

    specs.push({
      filename: `${cat}-${verticalSlug}-service-${citySlug}.jpg`,
      prompt: `Professional photograph representing ${cat} ${vertical} services (${serviceNames}), a professional at work in a bright modern home, editorial lifestyle photography, warm natural light, ${city} ${config.stateAbbr} suburban setting`,
    });
  }

  // --- Individual service images ---
  for (const svc of services) {
    specs.push({
      filename: `${svc.slug}-${verticalSlug}-service.jpg`,
      prompt: `Professional photograph representing "${svc.name}" service, a ${vertical} professional performing ${svc.name.toLowerCase()} in a bright modern home, high quality editorial photography, warm natural light, clean and professional setting`,
    });
  }

  return specs;
}

// ---------------------------------------------------------------------------
// Image generation
// ---------------------------------------------------------------------------

async function generateImage(spec: ImageSpec): Promise<void> {
  const outputPath = path.join(OUTPUT_DIR, spec.filename);

  if (fs.existsSync(outputPath)) {
    console.log(`  Skipping ${spec.filename} (already exists)`);
    return;
  }

  console.log(`  Generating ${spec.filename}...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: spec.prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '16:9',
          outputOptions: { mimeType: 'image/jpeg' },
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`  Failed ${spec.filename}: ${response.status} ${errorText}`);
    return;
  }

  const data = await response.json();
  const predictions = data.predictions;

  if (!predictions || predictions.length === 0) {
    console.error(`  No image returned for ${spec.filename}`);
    return;
  }

  const imageBytes = Buffer.from(predictions[0].bytesBase64Encoded, 'base64');
  fs.writeFileSync(outputPath, imageBytes);
  console.log(`  Saved ${spec.filename} (${(imageBytes.length / 1024).toFixed(0)} KB)`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const config = loadSiteConfig();

  if (!config.name || config.name === 'BUSINESS_NAME') {
    console.error('Site config has not been customized yet. Update lib/config.ts first.');
    process.exit(1);
  }

  const { categories, services } = loadServices();
  const images = buildImageSpecs(config, categories, services);

  console.log(`Business: ${config.name} (${config.vertical})`);
  console.log(`Location: ${config.city}, ${config.stateAbbr}`);
  console.log(`Categories: ${categories.join(', ')}`);
  console.log(`Services: ${services.length}`);
  console.log(`\nTotal images: ${images.length}\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const missing = images.filter(
    (img) => !fs.existsSync(path.join(OUTPUT_DIR, img.filename)),
  );

  if (missing.length === 0) {
    console.log('All images already exist. Nothing to generate.');

    // Print the filename map for wiring into pages
    console.log('\n--- Image filenames for reference ---');
    images.forEach((img) => console.log(`  ${img.filename}`));
    return;
  }

  console.log(`${missing.length} images to generate, ${images.length - missing.length} already exist.\n`);

  for (const spec of missing) {
    await generateImage(spec);
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Print the filename map for wiring into pages
  console.log('\n--- Generated image filenames ---');
  images.forEach((img) => console.log(`  ${img.filename}`));

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Image generation failed:', err);
  process.exit(1);
});

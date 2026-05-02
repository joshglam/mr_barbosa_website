/**
 * Generate hero/service images using Google Gemini Imagen 4.
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=... npx tsx scripts/generate-images.ts
 *
 * Prompts are tuned for a high-end, one-on-one men's hair salon.
 * Aesthetic: editorial, moody, dark/luxury, GQ-style. No families,
 * no bright suburban scenes, no contractor imagery.
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

  const categorySlugs: string[] = [];
  const slugRe = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = slugRe.exec(src)) !== null) categorySlugs.push(m[1]);

  const services: ServiceInfo[] = [];
  const servicesDir = path.join(process.cwd(), 'lib', 'services');
  for (const file of fs.readdirSync(servicesDir)) {
    if (file === 'types.ts' || file === 'index.ts' || !file.endsWith('.ts')) continue;
    const fileSrc = fs.readFileSync(path.join(servicesDir, file), 'utf-8');
    const serviceRe = /slug:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'/g;
    let sm;
    while ((sm = serviceRe.exec(fileSrc)) !== null) {
      services.push({ slug: sm[1], name: sm[2], category: sm[3] });
    }
  }

  return { categories: categorySlugs, services };
}

// ---------------------------------------------------------------------------
// Build image specs — luxury men's salon aesthetic
// ---------------------------------------------------------------------------

interface ImageSpec {
  filename: string;
  prompt: string;
}

// Shared style modifiers applied to every prompt to keep the look consistent.
const STYLE = `
Editorial fashion photography, high-end men's grooming aesthetic.
Mood: dark, moody, sophisticated, GQ / Esquire style.
Lighting: dramatic single-source lighting, warm rim light, deep shadows.
Color palette: deep blacks, charcoal, warm browns, brass, soft warm whites.
Composition: clean, intentional negative space, shallow depth of field.
Subject: an adult man (not a teenager, not elderly) in a one-on-one upscale men's hair studio.
Setting: a single-chair, intimate Manhattan men's studio — dark walls, vintage barber chair, brass fixtures, leather, dark wood, framed art.
Avoid: bright suburban scenes, families, kitchens, multiple chairs, busy salons, women, children, signage, watermarks, logos, text in the image.
Photorealistic, sharp focus, shot on a 50mm lens, f/2.0.
`.trim().replace(/\s+/g, ' ');

const SERVICE_PROMPTS: Record<string, string> = {
  'mens-haircut':
    'A close-up portrait of a stylish man in a vintage leather barber chair receiving a precision men\'s haircut from a male stylist holding scissors and a comb. Reflection visible in a backlit mirror behind. Dark sophisticated salon interior.',
  'buzz-cut':
    'A close-up of a male stylist running professional clippers through a man\'s short hair, creating a clean buzz cut. Hand of stylist visible holding the clippers. Side profile of the seated client. Dark moody salon background.',
  'kids-haircut':
    'A young boy (around 7 years old) seated calmly in a leather barber chair receiving a haircut from a male stylist. Soft warm light, intimate, unrushed. Dark sophisticated salon interior in the background.',
  'classic-beard-trim':
    'A close-up of a male stylist using barber scissors to shape a well-groomed beard on a confident adult male client. Detail of scissors against beard, sharp focus. Warm rim light. Dark moody background.',
  'haircut-and-beard-trim':
    'A confident adult man in a vintage leather barber chair, mid-service, with both freshly cut hair and a sharp groomed beard. A male stylist stands behind with scissors. Warm dramatic lighting, dark sophisticated salon.',
  'scalp-and-neck-massage':
    'A male stylist\'s hands gently performing a scalp massage on a relaxed seated male client with eyes closed. Soft warm light, intimate, calm. Dark sophisticated salon background.',
};

const CATEGORY_PROMPTS: Record<string, string> = {
  haircuts:
    'A wide editorial shot of a vintage leather barber chair under a brass pendant light in an upscale men\'s hair studio. Tools (scissors, combs, brush) arranged neatly on a dark wood counter. Empty chair, ready for the next client. Cinematic moody lighting.',
  beard:
    'A flat-lay overhead editorial photograph of premium men\'s beard grooming tools — barber scissors, a fine-tooth comb, beard oil in an apothecary bottle, a folded white towel — arranged on a dark walnut surface. Warm directional light from one side.',
  specialty:
    'A close-up editorial photograph of a male client reclined in a vintage leather barber chair, eyes closed, with a warm towel draped across his neck. Soft amber light, deeply relaxing mood, dark sophisticated salon background.',
};

function buildImageSpecs(
  _config: ReturnType<typeof loadSiteConfig>,
  categories: string[],
  services: ServiceInfo[],
): ImageSpec[] {
  const specs: ImageSpec[] = [];

  // --- Page heroes ---
  specs.push({
    filename: 'hero-home.jpg',
    prompt:
      'A wide editorial photograph of an upscale one-chair men\'s hair studio interior — a single vintage leather barber chair facing a large mirror, brass pendant light overhead, dark walls, dark wood counter with neatly arranged scissors and combs. Empty chair, no people. Cinematic, moody, magazine cover quality. ' +
      STYLE,
  });

  specs.push({
    filename: 'hero-about.jpg',
    prompt:
      'A moody editorial portrait scene of an empty vintage leather barber chair in a sophisticated men\'s hair studio, with framed black and white photographs and dark walnut shelves of pomade and grooming products in the background. Warm directional light from one side, deep shadows on the other. ' +
      STYLE,
  });

  specs.push({
    filename: 'hero-blog.jpg',
    prompt:
      'A flat-lay overhead editorial photograph of premium men\'s grooming tools on a dark walnut surface — vintage barber scissors, a comb, a small leather notebook, an apothecary bottle of beard oil, a folded white linen towel. Single warm directional light. ' +
      STYLE,
  });

  specs.push({
    filename: 'hero-resources.jpg',
    prompt:
      'A clean editorial close-up of a hand-bound leather notebook, a fountain pen, and a vintage straight razor laid out on a dark walnut counter in an upscale men\'s hair studio. Deeply moody, single warm light source. ' +
      STYLE,
  });

  specs.push({
    filename: 'hero-locations.jpg',
    prompt:
      'A moody nighttime editorial photograph of a Chelsea, New York City sidewalk and brick building facade with warm interior light spilling out of a single ground-floor studio window. Dark, atmospheric, cinematic, soft glow. No signage or logos. ' +
      STYLE,
  });

  // --- Category heroes ---
  for (const cat of categories) {
    const prompt = CATEGORY_PROMPTS[cat] ??
      `An editorial photograph representing ${cat} services in an upscale men's hair studio.`;
    specs.push({
      filename: `hero-${cat}.jpg`,
      prompt: `${prompt} ${STYLE}`,
    });
  }

  // --- Individual service images ---
  for (const svc of services) {
    const prompt = SERVICE_PROMPTS[svc.slug] ??
      `An editorial photograph representing the "${svc.name}" service in an upscale men's hair studio.`;
    specs.push({
      filename: `service-${svc.slug}.jpg`,
      prompt: `${prompt} ${STYLE}`,
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
    console.log('\n--- Image filenames for reference ---');
    images.forEach((img) => console.log(`  ${img.filename}`));
    return;
  }

  console.log(`${missing.length} images to generate, ${images.length - missing.length} already exist.\n`);

  for (const spec of missing) {
    await generateImage(spec);
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log('\n--- Generated image filenames ---');
  images.forEach((img) => console.log(`  ${img.filename}`));

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Image generation failed:', err);
  process.exit(1);
});

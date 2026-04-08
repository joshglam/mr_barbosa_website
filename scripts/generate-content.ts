/**
 * Auto-generate blog posts and resource articles using Claude API.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/generate-content.ts
 *
 * This script:
 *   1. Reads site config and existing content to avoid duplicate topics
 *   2. Asks Claude to pick a relevant topic
 *   3. Asks Claude to generate a full article as markdown with YAML frontmatter
 *   4. Writes the .md file to content/blog/ or content/resources/
 *
 * The GitHub Action handles git commit + push after this script runs.
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ---------------------------------------------------------------------------
// Load site config (using dynamic import since it uses path aliases)
// ---------------------------------------------------------------------------

// We read config values directly from the TypeScript source to avoid
// needing the full Next.js build. Simple regex extraction.
function loadSiteConfig() {
  const configPath = path.join(process.cwd(), 'lib', 'config.ts');
  const src = fs.readFileSync(configPath, 'utf-8');

  const extract = (key: string): string => {
    const match = src.match(new RegExp(`${key}:\\s*['"\`]([^'"\`]+)['"\`]`));
    return match?.[1] ?? '';
  };

  return {
    name: extract('name'),
    shortName: extract('shortName'),
    city: extract('city'),
    state: extract('state'),
    stateAbbr: extract('stateAbbr'),
    neighborhood: extract('neighborhood'),
    vertical: extract('vertical'),
    established: extract('established'),
    phone: extract('phone'),
  };
}

function loadServiceCategories(): string[] {
  const typesPath = path.join(process.cwd(), 'lib', 'services', 'types.ts');
  if (!fs.existsSync(typesPath)) return [];
  const src = fs.readFileSync(typesPath, 'utf-8');
  const names: string[] = [];
  const re = /name:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src)) !== null) names.push(m[1]);
  return names;
}

// ---------------------------------------------------------------------------
// Load existing content titles for dedup
// ---------------------------------------------------------------------------

function getExistingTitles(): string[] {
  const titles: string[] = [];

  // Hand-written posts from lib/blog.ts
  const blogSrc = path.join(process.cwd(), 'lib', 'blog.ts');
  if (fs.existsSync(blogSrc)) {
    const src = fs.readFileSync(blogSrc, 'utf-8');
    const re = /title:\s*['"`]([^'"`]+)['"`]/g;
    let m;
    while ((m = re.exec(src)) !== null) titles.push(m[1]);
  }

  // Hand-written resources from lib/resources.ts
  const resSrc = path.join(process.cwd(), 'lib', 'resources.ts');
  if (fs.existsSync(resSrc)) {
    const src = fs.readFileSync(resSrc, 'utf-8');
    const re = /title:\s*['"`]([^'"`]+)['"`]/g;
    let m;
    while ((m = re.exec(src)) !== null) titles.push(m[1]);
  }

  // Generated markdown files
  for (const dir of ['content/blog', 'content/resources']) {
    const fullDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDir)) continue;
    for (const file of fs.readdirSync(fullDir).filter((f) => f.endsWith('.md'))) {
      const { data } = matter(fs.readFileSync(path.join(fullDir, file), 'utf-8'));
      if (data.title) titles.push(data.title as string);
    }
  }

  return titles;
}

// ---------------------------------------------------------------------------
// Claude API calls
// ---------------------------------------------------------------------------

interface TopicSelection {
  type: 'blog' | 'resource';
  slug: string;
  title: string;
  category: string;
  metaTitle: string;
  excerpt: string;
}

async function selectTopic(
  client: Anthropic,
  config: ReturnType<typeof loadSiteConfig>,
  services: string[],
  existingTitles: string[],
): Promise<TopicSelection> {
  const month = new Date().toLocaleString('en-US', { month: 'long' });
  const year = new Date().getFullYear();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a content strategist for a local ${config.vertical} business.

Business: ${config.name}
Location: ${config.city}, ${config.stateAbbr}
Vertical: ${config.vertical}
Services offered: ${services.join(', ')}
Current month: ${month} ${year}

Existing content titles (DO NOT repeat any of these topics):
${existingTitles.map((t) => `- ${t}`).join('\n')}

Pick ONE new topic to write about. Alternate between blog posts and resources:
- Blog posts: seasonal tips, project showcases, how-to guides, local news (800-1500 words)
- Resources: "how much does X cost" guides, comparison guides, permit guides (1000-2000 words, high SEO value)

Respond with ONLY valid JSON (no markdown code fences):
{
  "type": "blog" or "resource",
  "slug": "url-friendly-slug",
  "title": "Article Title Including ${config.city} or Local Reference",
  "category": "tips" | "projects" | "news" | "seasonal" (for blog) or "guide" (for resource),
  "metaTitle": "SEO-optimized title under 60 chars | ${config.shortName}",
  "excerpt": "1-2 sentence compelling description for listings"
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return JSON.parse(text) as TopicSelection;
}

async function generateArticle(
  client: Anthropic,
  config: ReturnType<typeof loadSiteConfig>,
  topic: TopicSelection,
): Promise<string> {
  const isResource = topic.type === 'resource';

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `Write a complete ${isResource ? 'resource guide' : 'blog post'} as a markdown file with YAML frontmatter.

## Business Context
- Business: ${config.name} (est. ${config.established})
- Location: ${config.neighborhood ? config.neighborhood + ', ' : ''}${config.city}, ${config.stateAbbr}
- Vertical: ${config.vertical}
- Phone: ${config.phone}

## Article Details
- Title: ${topic.title}
- Slug: ${topic.slug}
- Type: ${topic.type}
- Category: ${topic.category}

## Requirements

### YAML Frontmatter (between --- markers)
Include these fields:
- slug: "${topic.slug}"
- title: "${topic.title}"
- metaTitle: "${topic.metaTitle}"
- excerpt: "${topic.excerpt}"
- category: "${topic.category}"
- publishedAt: "${new Date().toISOString().split('T')[0]}"
- readTime: estimate based on word count (e.g. "5 min")
${isResource ? '- quickAnswer: "A concise 1-2 sentence direct answer optimized for AI answer extraction and featured snippets"' : ''}
- faqs: (YAML array of question/answer objects, ${isResource ? '5-8' : '3-5'} FAQs)

### Markdown Body
- Use ## for section headings (never # — the page template handles h1)
- ${isResource ? '1000-2000' : '800-1500'} words of substantive, expert-level content
- Mention ${config.name} naturally 2-3 times (not forced)
- Reference ${config.city}${config.neighborhood ? '/' + config.neighborhood : ''} for local SEO
- Include specific, actionable information — not generic filler
- Use bullet points and numbered lists where appropriate
${isResource ? '- Include price ranges specific to the local market' : ''}
${isResource ? '- Structure as a comprehensive guide that answers the main question thoroughly' : ''}
- End with a soft CTA mentioning the business (1-2 sentences, not salesy)
- Professional but approachable tone

Output ONLY the complete markdown file content (frontmatter + body). No explanations.`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Strip any markdown code fences Claude might add
  return text.replace(/^```(?:markdown|md|yaml)?\n?/, '').replace(/\n?```$/, '').trim();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const config = loadSiteConfig();

  if (!config.name || config.name === 'BUSINESS_NAME') {
    console.error('Site config has not been customized yet. Update lib/config.ts first.');
    process.exit(1);
  }

  const services = loadServiceCategories();
  const existingTitles = getExistingTitles();

  console.log(`Generating content for: ${config.name}`);
  console.log(`Existing titles: ${existingTitles.length}`);

  // Step 1: Pick a topic
  console.log('Selecting topic...');
  const topic = await selectTopic(client, config, services, existingTitles);
  console.log(`Selected: [${topic.type}] ${topic.title}`);

  // Step 2: Generate the article
  console.log('Generating article...');
  const markdown = await generateArticle(client, config, topic);

  // Step 3: Validate the output
  const { data } = matter(markdown);
  if (!data.slug || !data.title || !data.publishedAt) {
    console.error('Generated content is missing required frontmatter fields');
    console.error('Frontmatter:', data);
    process.exit(1);
  }

  // Step 4: Write the file
  const dir = topic.type === 'blog' ? 'content/blog' : 'content/resources';
  const filePath = path.join(process.cwd(), dir, `${data.slug}.md`);

  // Don't overwrite existing files
  if (fs.existsSync(filePath)) {
    console.error(`File already exists: ${filePath}`);
    process.exit(1);
  }

  fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
  fs.writeFileSync(filePath, markdown, 'utf-8');

  console.log(`Written: ${filePath}`);
  console.log('Done!');
}

main().catch((err) => {
  console.error('Content generation failed:', err);
  process.exit(1);
});

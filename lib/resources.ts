import { loadMarkdownFiles } from './content-loader';

export interface Resource {
  slug: string;
  title: string;
  metaTitle?: string;
  excerpt: string;
  quickAnswer: string;
  content: string;
  faqs: Array<{ question: string; answer: string }>;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
}

// ============================================================================
// HAND-WRITTEN RESOURCES (Pro Tips / Guides)
// Auto-generated resources live in content/resources/*.md and are loaded automatically.
//
// Tips:
//   - Write "how much does X cost" articles for high-intent search traffic
//   - Include quickAnswer for AI answer extraction (featured snippets)
//   - Add 3-5 FAQs per resource for rich search results
// ============================================================================
export const resources: Resource[] = [
  {
    slug: 'example-cost-guide',
    title: 'How Much Does [Service] Cost? (2026 Prices)',
    excerpt: 'A complete pricing guide for [service] in your area.',
    quickAnswer: 'A concise 1-2 sentence answer that directly answers the question. This is optimized for AI answer extraction and featured snippets.',
    content: `<h2>What Drives Costs?</h2>
<p>Explain the key factors that affect pricing for this service in your area.</p>

<h2>Average Price Ranges</h2>
<ul>
  <li><strong>Small project:</strong> $X - $Y</li>
  <li><strong>Medium project:</strong> $X - $Y</li>
  <li><strong>Large project:</strong> $X - $Y</li>
</ul>

<h2>How to Get the Best Value</h2>
<p>Tips for homeowners on getting accurate estimates and choosing the right contractor.</p>`,
    faqs: [
      {
        question: 'How much does [service] cost?',
        answer: 'Answer with specific price ranges for your area.',
      },
    ],
    publishedAt: '2026-01-01',
    readTime: '5 min',
  },
];

// Merge hand-written resources with auto-generated markdown files, sorted newest first
export function getAllResources(): Resource[] {
  const generated = loadMarkdownFiles<Resource>('content/resources');
  return [...resources, ...generated].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return getAllResources().find((r) => r.slug === slug);
}

export function getAllResourceSlugs(): string[] {
  return getAllResources().map((r) => r.slug);
}

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
// HAND-WRITTEN RESOURCES (guides, style notes, FAQs)
// Auto-generated resources live in content/resources/*.md
// ============================================================================
export const resources: Resource[] = [];

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

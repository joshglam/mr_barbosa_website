import { loadMarkdownFiles } from './content-loader';

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle?: string;
  excerpt: string;
  content: string;
  category: 'tips' | 'projects' | 'news' | 'seasonal';
  faqs?: Array<{ question: string; answer: string }>;
  publishedAt: string;
  readTime: string;
}

export const blogCategoryLabels: Record<string, string> = {
  tips: 'Style Tips',
  projects: 'Featured Looks',
  news: 'Studio News',
  seasonal: 'Seasonal',
};

// ============================================================================
// HAND-WRITTEN BLOG POSTS
// Auto-generated posts live in content/blog/*.md and are loaded automatically.
// ============================================================================
export const blogPosts: BlogPost[] = [];

export function getAllBlogPosts(): BlogPost[] {
  const generated = loadMarkdownFiles<BlogPost>('content/blog');
  return [...blogPosts, ...generated].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export function getAllBlogPostSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}

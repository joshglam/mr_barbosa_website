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
  tips: 'Tips & Advice',
  projects: 'Project Showcase',
  news: 'Company News',
  seasonal: 'Seasonal',
};

// ============================================================================
// HAND-WRITTEN BLOG POSTS — Add your blog content here.
// Auto-generated posts live in content/blog/*.md and are loaded automatically.
// ============================================================================
export const blogPosts: BlogPost[] = [
  {
    slug: 'welcome-post',
    title: 'Welcome to Our Blog',
    excerpt: 'We are excited to share tips, project showcases, and news with our community.',
    content: `<h2>Welcome</h2>
<p>We are excited to launch our blog where we will share helpful tips, project showcases, and company news. Stay tuned for regular updates.</p>`,
    category: 'news',
    publishedAt: '2026-01-01',
    readTime: '1 min',
  },
];

// Merge hand-written posts with auto-generated markdown files, sorted newest first
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

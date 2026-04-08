import { execSync } from 'child_process';
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { allServices, serviceCategories } from '@/lib/services';
import { locations } from '@/lib/locations';
import { getAllResources } from '@/lib/resources';
import { getAllBlogPosts } from '@/lib/blog';

const gitDateCache = new Map<string, Date>();

function getGitDate(filePath: string): Date {
  if (gitDateCache.has(filePath)) {
    return gitDateCache.get(filePath)!;
  }
  try {
    const date = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: 'utf-8',
    }).trim();
    const result = date ? new Date(date) : new Date();
    gitDateCache.set(filePath, result);
    return result;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: getGitDate('app/(site)/page.tsx'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: getGitDate('app/(site)/about/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: getGitDate('app/(site)/contact/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: getGitDate('app/(site)/locations/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: `${baseUrl}/resources`, lastModified: getGitDate('app/(site)/resources/page.tsx'), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: getGitDate('app/(site)/blog/page.tsx'), changeFrequency: 'weekly', priority: 0.7 },
    {
      url: `${baseUrl}/free-estimate`,
      lastModified: getGitDate('app/(site)/free-estimate/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: getGitDate('app/(site)/privacy/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: getGitDate('app/(site)/terms/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = serviceCategories.map((category) => ({
    url: `${baseUrl}/services/${category.slug}`,
    lastModified: getGitDate(`app/(site)/services/${category.slug}/page.tsx`),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: `${baseUrl}/services/${service.category}/${service.slug}`,
    lastModified: getGitDate(`lib/services/${service.category}.ts`) || getGitDate('lib/services/types.ts'),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const locationDate = getGitDate('lib/locations.ts');
  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: locationDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const resourcePages: MetadataRoute.Sitemap = getAllResources().map((r) => ({
    url: `${baseUrl}/resources/${r.slug}`,
    lastModified: r.updatedAt ? new Date(r.updatedAt) : new Date(r.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...servicePages, ...locationPages, ...resourcePages, ...blogPages];
}

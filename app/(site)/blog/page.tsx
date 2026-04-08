import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { getAllBlogPosts, blogCategoryLabels } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: `${siteConfig.vertical} tips, project updates, and local news from ${siteConfig.name}. Expert advice for homeowners in ${siteConfig.city} and surrounding areas.`,
};

export default function BlogPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-brand-800" />
        {/* TODO: Add blog hero image */}
        <div className="absolute inset-0 bg-brand-900/70" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          <p className="mt-4 text-lg text-brand-100">
            Tips, project showcases, and local news from our team
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {getAllBlogPosts().map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-brand-300 hover:shadow-lg"
              >
                <Link href={`/blog/${post.slug}`} className="block p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                      {blogCategoryLabels[post.category]}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime} read</span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-brand-600">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-sm font-medium text-brand-600 flex items-center">
                      Read more
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to Start Your Project?</h2>
          <p className="mt-4 text-gray-600">
            Our team is ready to help with your next {siteConfig.vertical} project.
            Call us today for a free consultation.
          </p>
          <div className="mt-6">
            <a
              href={caseyConfig.phoneHref}
              className="inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-brand-700"
            >
              Call {caseyConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

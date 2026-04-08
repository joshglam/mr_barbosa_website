import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { getBlogPostBySlug, getAllBlogPostSlugs, blogCategoryLabels, blogPosts } from '@/lib/blog';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.metaTitle ? { absolute: post.metaTitle } : post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  const faqSchema = post.faqs && post.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="bg-white">
        {/* Header */}
        <section className="border-b border-gray-200 bg-gray-50 py-8">
          <div className="mx-auto max-w-3xl px-4">
            <nav className="mb-4 text-sm">
              <Link href="/blog" className="text-brand-600 hover:underline">
                Blog
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-600">{blogCategoryLabels[post.category]}</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                {blogCategoryLabels[post.category]}
              </span>
              <span>{post.readTime} read</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4">
            <div
              className="prose prose-gray max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:my-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <div className="mt-6 space-y-6">
                  {post.faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="mt-12 rounded-xl bg-brand-600 p-8 text-center">
              <h2 className="text-xl font-bold text-white">Need Professional Help?</h2>
              <p className="mt-2 text-brand-100">
                Contact us for expert advice or to schedule a free consultation.
              </p>
              <div className="mt-4">
                <a
                  href={caseyConfig.phoneHref}
                  className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-600 shadow-lg transition-all hover:bg-brand-50"
                >
                  Call {caseyConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-12">
            <div className="mx-auto max-w-5xl px-4">
              <h2 className="text-2xl font-bold text-gray-900">More From Our Blog</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md"
                  >
                    <span className="text-xs font-medium text-brand-600">
                      {blogCategoryLabels[relatedPost.category]}
                    </span>
                    <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-brand-600 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

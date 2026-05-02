import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { getResourceBySlug, getAllResourceSlugs, getAllResources } from '@/lib/resources';

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: 'Article Not Found' };
  return {
    title: resource.metaTitle ? { absolute: resource.metaTitle } : resource.title,
    description: resource.excerpt,
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const relatedResources = getAllResources().filter((r) => r.slug !== slug).slice(0, 3);

  const faqSchema = resource.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: resource.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.excerpt,
    datePublished: resource.publishedAt,
    ...(resource.updatedAt && { dateModified: resource.updatedAt }),
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="bg-black">
        <section className="border-b border-neutral-800 bg-neutral-950 py-8">
          <div className="mx-auto max-w-3xl px-4">
            <nav className="mb-4 text-sm">
              <Link href="/resources" className="text-neutral-400 hover:text-white">Resources</Link>
              <span className="mx-2 text-neutral-600">/</span>
              <span className="text-neutral-300">{resource.title}</span>
            </nav>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {resource.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-neutral-400">
              <span>{resource.readTime} read</span>
              <span>
                {new Date(resource.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4 mb-8">
              <p className="text-neutral-200">
                <strong className="text-white">Quick Answer:</strong> {resource.quickAnswer}
              </p>
            </div>

            <div
              className="prose prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:my-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: resource.content }}
            />

            {resource.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                <div className="mt-6 space-y-6">
                  {resource.faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                      <p className="mt-2 text-neutral-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 rounded-xl border border-white bg-white p-8 text-center text-black">
              <h2 className="text-xl font-bold">Ready for the chair?</h2>
              <p className="mt-2 text-neutral-700">Reserve your appointment online.</p>
              <div className="mt-4">
                <a
                  href={caseyConfig.bookingUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {relatedResources.length > 0 && (
          <section className="border-t border-neutral-800 bg-neutral-950 py-12">
            <div className="mx-auto max-w-5xl px-4">
              <h2 className="text-2xl font-bold text-white">More Resources</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedResources.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/resources/${related.slug}`}
                    className="group rounded-lg border border-neutral-800 bg-black p-6 transition-all hover:border-white"
                  >
                    <span className="text-xs font-medium text-neutral-400">
                      {related.readTime} read
                    </span>
                    <h3 className="mt-2 font-semibold text-white line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
                      {related.excerpt}
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

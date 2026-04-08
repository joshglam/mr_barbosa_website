import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { caseyConfig } from '@/lib/config';
import { getServiceByCategoryAndSlug, getAllServiceParams, serviceCategories } from '@/lib/services';

interface ServicePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceParams();
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const service = getServiceByCategoryAndSlug(category, slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.name,
    description: service.metaDescription,
  };
}

// Build category label lookup from serviceCategories data
const categoryLabels: Record<string, string> = Object.fromEntries(
  serviceCategories.map((c) => [c.slug, c.name])
);

// TODO: Map service images for hero backgrounds
// const serviceImages: Record<string, string> = {
//   'category-one/service-slug': '/images/service-hero.jpg',
// };

export default async function ServicePage({ params }: ServicePageProps) {
  const { category, slug } = await params;
  const service = getServiceByCategoryAndSlug(category, slug);

  if (!service) {
    notFound();
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="bg-white">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          {/* TODO: Add service-specific hero images */}
          <div className="absolute inset-0 bg-brand-700" />
          <div className="relative mx-auto max-w-5xl px-4">
            <nav className="mb-4 text-sm">
              <Link href={`/services/${service.category}`} className="text-brand-200 hover:text-white">
                {categoryLabels[service.category] || service.category}
              </Link>
              <span className="mx-2 text-brand-300">/</span>
              <span className="text-white">{service.name}</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">{service.hero.title}</h1>
            <p className="mt-4 text-lg text-brand-100">{service.hero.subtitle}</p>
            <div className="mt-8">
              <a
                href={caseyConfig.phoneHref}
                className="inline-block rounded-lg bg-accent-500 px-6 py-3 font-semibold text-brand-900 shadow-lg transition-colors hover:bg-accent-600"
              >
                Call {caseyConfig.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Quick Answer Box */}
        <section className="border-b border-gray-200 bg-brand-50 py-8">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-lg border border-brand-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                Quick Answer
              </p>
              <p className="mt-2 text-lg leading-relaxed text-gray-800">
                {service.quickAnswer}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div
                  className="prose prose-gray max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-ul:my-4 prose-li:my-1"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              </div>
              <div className="lg:col-span-1">
                {/* Sidebar */}
                <div className="sticky top-4 space-y-6">
                  {/* Features */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h3 className="font-bold text-gray-900">Service Features</h3>
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-brand-600">{'\u2713'}</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Box */}
                  <div className="rounded-lg bg-brand-600 p-6 text-white">
                    <h3 className="font-bold">Need This Service?</h3>
                    <p className="mt-2 text-sm text-brand-100">
                      Call for a free quote and schedule service today.
                    </p>
                    <a
                      href={caseyConfig.phoneHref}
                      className="mt-4 block w-full rounded-lg bg-white px-4 py-2 text-center font-semibold text-brand-600 transition-colors hover:bg-brand-50"
                    >
                      Call {caseyConfig.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-4">
              {service.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-gray-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-900">
                    {faq.question}
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                      {'\u25BC'}
                    </span>
                  </summary>
                  <div className="border-t border-gray-100 p-4 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-gray-600">
              Call us to get a free quote and schedule your {service.name.toLowerCase()} service.
            </p>
            <div className="mt-6">
              <a
                href={caseyConfig.phoneHref}
                className="inline-block rounded-lg bg-brand-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-brand-700"
              >
                Call {caseyConfig.phone}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

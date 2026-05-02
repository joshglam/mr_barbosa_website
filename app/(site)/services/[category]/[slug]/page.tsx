import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { caseyConfig } from '@/lib/config';
import { getServiceByCategoryAndSlug, getAllServiceParams, serviceCategories } from '@/lib/services';
import { serviceImage } from '@/lib/images';

interface ServicePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceParams();
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const service = getServiceByCategoryAndSlug(category, slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.name,
    description: service.metaDescription,
  };
}

const categoryLabels: Record<string, string> = Object.fromEntries(
  serviceCategories.map((c) => [c.slug, c.name])
);

export default async function ServicePage({ params }: ServicePageProps) {
  const { category, slug } = await params;
  const service = getServiceByCategoryAndSlug(category, slug);
  if (!service) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="bg-black">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-neutral-800 py-24 sm:py-32">
          <Image
            src={serviceImage(service.slug)}
            alt={service.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative mx-auto max-w-5xl px-4">
            <nav className="mb-4 text-sm">
              <Link href={`/services/${service.category}`} className="text-neutral-300 hover:text-white">
                {categoryLabels[service.category] || service.category}
              </Link>
              <span className="mx-2 text-neutral-500">/</span>
              <span className="text-white">{service.name}</span>
            </nav>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">{service.hero.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-200">{service.hero.subtitle}</p>
            <div className="mt-8">
              <a
                href={caseyConfig.bookingUrl}
                target="_blank"
                rel="noopener"
                className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Book Now
              </a>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="border-b border-neutral-800 bg-neutral-950 py-8">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-lg border border-neutral-800 bg-black p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Quick Answer
              </p>
              <p className="mt-2 text-lg leading-relaxed text-neutral-100">
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
                  className="prose prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-ul:my-4 prose-li:my-1 prose-strong:text-white"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
                    <h3 className="font-bold text-white">What’s Included</h3>
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-neutral-300">
                          <span className="text-white">{'✓'}</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-white bg-white p-6 text-black">
                    <h3 className="font-bold">Ready to book?</h3>
                    <p className="mt-2 text-sm text-neutral-700">
                      Reserve your appointment online — instant confirmation.
                    </p>
                    <a
                      href={caseyConfig.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      className="mt-4 block w-full rounded-lg bg-black px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-neutral-800"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-t border-neutral-800 bg-neutral-950 py-12">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-4">
              {service.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-neutral-800 bg-black"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-white">
                    {faq.question}
                    <span className="ml-2 text-neutral-500 group-open:rotate-180 transition-transform">
                      {'▼'}
                    </span>
                  </summary>
                  <div className="border-t border-neutral-800 p-4 text-neutral-300">
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
            <h2 className="text-2xl font-bold text-white">
              Ready to book?
            </h2>
            <p className="mt-4 text-neutral-300">
              Reserve your {service.name.toLowerCase()} online — instant confirmation.
            </p>
            <div className="mt-6">
              <a
                href={caseyConfig.bookingUrl}
                target="_blank"
                rel="noopener"
                className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Book Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

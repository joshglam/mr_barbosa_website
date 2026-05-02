import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { getLocationBySlug, getAllLocationSlugs } from '@/lib/locations';
import { allServices } from '@/lib/services';
import { heroImage } from '@/lib/images';

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return { title: 'Location Not Found' };
  return {
    title: location.metaTitle ? { absolute: location.metaTitle } : `${siteConfig.shortName} — ${location.name}`,
    description: location.metaDescription || `Precision men’s grooming serving ${location.name}, ${siteConfig.stateAbbr}.`,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': siteConfig.schemaType,
    name: `${siteConfig.name} — ${location.name}`,
    description: `Precision men’s grooming serving ${location.name}, ${siteConfig.state}`,
    areaServed: {
      '@type': 'Place',
      name: location.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: location.county },
    },
  };

  const faqSchema = location.faqs && location.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="bg-black">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-neutral-800 py-24 sm:py-32">
          <Image
            src={heroImage('locations')}
            alt={`${location.name}, NYC`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative mx-auto max-w-5xl px-4">
            <nav className="mb-4 text-sm">
              <Link href="/locations" className="text-neutral-300 hover:text-white">Areas We Serve</Link>
              <span className="mx-2 text-neutral-500">/</span>
              <span className="text-white">{location.name}</span>
            </nav>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Men’s Hair Salon Serving {location.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-200">
              {siteConfig.shortName} is a one-chair men’s grooming studio on the Chelsea / Flatiron border — a short walk or train ride from {location.name}.
            </p>
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

        {/* About Area */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white">
                  Serving {location.name}
                </h2>
                <p className="mt-4 text-neutral-300">
                  {location.description}
                </p>

                {location.neighborhoods && location.neighborhoods.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-white">
                      Nearby
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {location.neighborhoods.map((n) => (
                        <span
                          key={n}
                          className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-sm text-neutral-300"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
                  <h3 className="font-semibold text-white">Quick Facts</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-neutral-500">Borough</dt>
                      <dd className="font-medium text-neutral-100">{location.county}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">ZIP Codes</dt>
                      <dd className="font-medium text-neutral-100">{location.zipCodes.join(', ')}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-t border-neutral-800 bg-neutral-950 py-12">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-white">
              Services
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.category}/${service.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-black p-4 transition-all hover:border-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-medium text-white">{service.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        {location.faqs && location.faqs.length > 0 && (
          <section className="py-12">
            <div className="mx-auto max-w-5xl px-4">
              <h2 className="text-2xl font-bold text-white">
                FAQs — {location.name}
              </h2>
              <div className="mt-8 space-y-6">
                {location.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-white">{faq.question}</h3>
                    <p className="mt-2 text-neutral-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-neutral-800 bg-neutral-950 py-12">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold text-white">
              Book your visit
            </h2>
            <p className="mt-4 text-neutral-300">
              Reserve your appointment online — instant confirmation.
            </p>
            <div className="mt-6">
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
      </div>
    </>
  );
}

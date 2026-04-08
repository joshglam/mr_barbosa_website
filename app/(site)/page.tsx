import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { serviceCategories } from '@/lib/services';

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.shortName} | Professional ${siteConfig.vertical} in ${siteConfig.city}, ${siteConfig.stateAbbr}`,
  },
  description: siteConfig.description,
};

// TODO: Replace with icons relevant to your service categories
const categoryIcons: Record<string, React.ReactNode> = {
  'category-one': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
    </svg>
  ),
  'category-two': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
    </svg>
  ),
  'category-three': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
    </svg>
  ),
};

// TODO: Replace with your trust points
const trustPoints = [
  { label: '100% Local', icon: '\u2713' },
  { label: 'Family Business', icon: '\u2713' },
  { label: `${new Date().getFullYear() - (siteConfig.established ?? 2020)}+ Years Experience`, icon: '\u2605' },
  { label: 'Insured & Bonded', icon: '\u2713' },
];

// TODO: Replace with your service areas
const serviceAreas = [
  'Example City',
];

export default function Home() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': siteConfig.schemaType,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: caseyConfig.phone,
    description: siteConfig.description,
    ...(siteConfig.established && { foundingDate: String(siteConfig.established) }),
    areaServed: {
      '@type': 'City',
      name: siteConfig.city,
      containedInPlace: {
        '@type': 'State',
        name: siteConfig.state,
      },
    },
    openingHours: ['Mo-Fr 07:00-18:00', 'Sa-Su 10:00-17:00'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-brand-800" />
        {/* TODO: Add hero image or video */}
        <div className="absolute inset-0 bg-brand-900/70" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Professional {siteConfig.vertical} Services You Can Rely On
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={caseyConfig.phoneHref}
                className="inline-block rounded-lg bg-accent-500 px-8 py-4 text-lg font-semibold text-brand-900 shadow-lg transition-all hover:bg-accent-600 hover:scale-105"
              >
                Call {caseyConfig.phone}
              </a>
              <Link
                href="/free-estimate"
                className="inline-block rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-brand-900"
              >
                Request Estimate Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-gray-200 bg-gray-50 py-4">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {trustPoints.map((point) => (
              <div key={point.label} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs text-brand-700">
                  {point.icon}
                </span>
                {point.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-2 text-gray-600">
              Complete {siteConfig.vertical} solutions for your property
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/services/${category.slug}`}
                className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-brand-300 hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                  {categoryIcons[category.slug]}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 group-hover:text-brand-600">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-brand-900 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white">
              Why {siteConfig.shortName}?
            </h2>
            <p className="mt-3 text-lg text-brand-100">
              {/* TODO: Write your company story / value proposition */}
              Established in {siteConfig.established}, {siteConfig.name} has built a reputation
              on repeat clients and referrals. We take pride in delivering quality craftsmanship,
              maintaining clean work environments, and communicating clearly from the first estimate
              to the final walkthrough.
            </p>
            <div className="mt-8 text-center md:text-left">
              <a
                href={caseyConfig.phoneHref}
                className="inline-block rounded-lg bg-accent-500 px-8 py-3 font-semibold text-brand-900 shadow-lg transition-all hover:bg-accent-600 hover:scale-105"
              >
                Call {caseyConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Serving {siteConfig.city} and Surrounding Areas
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) => (
              <Link
                key={area}
                href={`/locations/${area.toLowerCase().replace(' ', '-')}`}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:border-brand-300 hover:text-brand-600 transition-colors"
              >
                {area}
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/locations" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all service areas
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Call for a free estimate. No obligation, no pressure.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={caseyConfig.phoneHref}
              className="inline-block rounded-lg bg-brand-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-600 hover:scale-105"
            >
              Call {caseyConfig.phone}
            </a>
            <Link
              href="/free-estimate"
              className="inline-block rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-brand-900"
            >
              Request Estimate Online
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

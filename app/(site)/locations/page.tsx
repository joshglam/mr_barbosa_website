import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { locations } from '@/lib/locations';

export const metadata: Metadata = {
  title: 'Service Areas',
  description: `${siteConfig.name} provides professional ${siteConfig.vertical} services in ${siteConfig.city} and surrounding areas. Find your area and get started today.`,
};

export default function LocationsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-brand-800" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Service Areas</h1>
          <p className="mt-4 text-lg text-brand-100">
            Professional {siteConfig.vertical} throughout {siteConfig.city} and surrounding areas
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600">
                    {location.name}
                  </h2>
                  <svg
                    className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="mt-1 text-sm text-gray-500">{location.county}</p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {location.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Don&apos;t See Your City?</h2>
          <p className="mt-4 text-gray-600">
            We serve many additional areas around {siteConfig.city}, {siteConfig.state}.
            Call us to confirm service availability in your area.
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

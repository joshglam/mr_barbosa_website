import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { locations } from '@/lib/locations';
import { heroImage } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Areas We Serve',
  description: `${siteConfig.name} serves Chelsea and the surrounding NYC neighborhoods. Find your area and book online.`,
};

export default function LocationsPage() {
  return (
    <div className="bg-black">
      <section className="relative overflow-hidden border-b border-neutral-800 py-24 sm:py-32">
        <Image
          src={heroImage('locations')}
          alt="Chelsea / Flatiron, NYC"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Areas We Serve</h1>
          <p className="mt-4 text-lg text-neutral-200">
            Mr. Barbosa is based on the Chelsea / Flatiron border — clients walk and train in from across Manhattan.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group rounded-lg border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-white"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    {location.name}
                  </h2>
                  <svg
                    className="h-5 w-5 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="mt-1 text-sm text-neutral-500">{location.county}</p>
                <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
                  {location.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-800 bg-neutral-950 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">Ready when you are</h2>
          <p className="mt-4 text-neutral-300">
            Book online any time — instant confirmation.
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
  );
}

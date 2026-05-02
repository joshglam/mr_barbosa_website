import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { caseyConfig } from '@/lib/config';
import { getAllResources } from '@/lib/resources';
import { heroImage } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Resources',
  description: `Guides and answers about men’s hair, beard work, and what to expect at Mr. Barbosa Mens Hair Salon.`,
};

export default function ResourcesPage() {
  const items = getAllResources();

  return (
    <div className="bg-black">
      <section className="relative overflow-hidden border-b border-neutral-800 py-24 sm:py-32">
        <Image
          src={heroImage('resources')}
          alt="Mr. Barbosa Resources"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Resources</h1>
          <p className="mt-4 text-lg text-neutral-200">
            Guides and answers about men’s hair and what to expect at the studio.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          {items.length === 0 ? (
            <p className="text-center text-neutral-400">
              Guides coming soon.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {items.map((resource) => (
                <article
                  key={resource.slug}
                  className="group rounded-xl border border-neutral-800 bg-neutral-950 transition-all hover:border-white"
                >
                  <Link href={`/resources/${resource.slug}`} className="block p-6">
                    <span className="text-xs text-neutral-500">{resource.readTime} read</span>
                    <h2 className="mt-4 text-xl font-bold text-white">
                      {resource.title}
                    </h2>
                    <p className="mt-2 text-neutral-400 line-clamp-3">
                      {resource.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-white">
                      Read more
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-neutral-800 bg-neutral-950 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">Ready for the chair?</h2>
          <p className="mt-4 text-neutral-300">Reserve your appointment online.</p>
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

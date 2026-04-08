import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { getAllResources } from '@/lib/resources';

export const metadata: Metadata = {
  title: `${siteConfig.vertical} Resources — Expert Advice`,
  description: `Expert ${siteConfig.vertical} advice from ${siteConfig.name}. Practical tips, cost guides, and answers to common questions for homeowners in ${siteConfig.city} and surrounding areas.`,
};

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-brand-800" />
        {/* TODO: Add resources hero image */}
        <div className="absolute inset-0 bg-brand-900/70" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">{siteConfig.vertical} Resources</h1>
          <p className="mt-4 text-lg text-brand-100">
            Expert advice on {siteConfig.vertical} from our team of professionals
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {getAllResources().map((resource) => (
              <article
                key={resource.slug}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-brand-300 hover:shadow-lg"
              >
                <Link href={`/resources/${resource.slug}`} className="block p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{resource.readTime} read</span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-brand-600">
                    {resource.title}
                  </h2>
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {resource.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-brand-600">
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
          <h2 className="text-2xl font-bold text-gray-900">Have a {siteConfig.vertical} Question?</h2>
          <p className="mt-4 text-gray-600">
            Our team is here to answer your questions and provide expert advice for your next project.
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

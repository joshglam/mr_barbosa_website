import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { serviceCategories, allServices } from '@/lib/services';
import { heroImage, serviceImage } from '@/lib/images';

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.shortName} | Men’s Hair Salon in Chelsea & Flatiron, ${siteConfig.stateAbbr}`,
  },
  description: siteConfig.description,
};

export default function Home() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': siteConfig.schemaType,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: caseyConfig.address.street,
      addressLocality: caseyConfig.address.city,
      addressRegion: caseyConfig.address.state,
      postalCode: caseyConfig.address.zip,
      addressCountry: 'US',
    },
    ...(siteConfig.established && { foundingDate: String(siteConfig.established) }),
    openingHours: ['Tu-Fr 11:00-20:00', 'Sa 11:00-17:00'],
    sameAs: siteConfig.socialLinks.map((s) => s.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="bg-black">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-neutral-800 py-32 sm:py-40">
          <Image
            src={heroImage('home')}
            alt="Inside Mr. Barbosa Mens Hair Salon"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative mx-auto max-w-5xl px-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-300">
              Chelsea · Flatiron · NYC
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Crafting excellence in every cut.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-200">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={caseyConfig.bookingUrl}
                target="_blank"
                rel="noopener"
                className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-black shadow-lg transition-all hover:bg-neutral-200"
              >
                Book Now
              </a>
              <Link
                href="/services/haircuts"
                className="inline-block rounded-lg border border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-black"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="border-b border-neutral-800 bg-neutral-950 py-6">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-neutral-300">
              <span className="flex items-center gap-2">
                <span className="text-white">✦</span>
                One-on-one studio
              </span>
              <span className="flex items-center gap-2">
                <span className="text-white">✦</span>
                {new Date().getFullYear() - (siteConfig.established ?? 2014)}+ years experience
              </span>
              <span className="flex items-center gap-2">
                <span className="text-white">✦</span>
                Chelsea / Flatiron, Manhattan
              </span>
              <span className="flex items-center gap-2">
                <span className="text-white">✦</span>
                Online booking
              </span>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Our Services</h2>
              <p className="mt-3 text-neutral-400">
                Precision cuts, classic beard work, and a calm space to enjoy them in.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/services/${category.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 transition-all hover:border-white"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={heroImage(category.slug)}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <p className="mt-3 flex-1 text-sm text-neutral-400">{category.description}</p>
                    <span className="mt-6 inline-flex items-center text-sm font-semibold text-white">
                      Explore
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Services List */}
        <section className="border-t border-neutral-800 bg-neutral-950 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">The Full Menu</h2>
              <p className="mt-3 text-neutral-400">
                Every service is by appointment in a calm, one-chair studio.
              </p>
            </div>
            <ul className="mx-auto mt-12 max-w-3xl divide-y divide-neutral-800 border-t border-b border-neutral-800">
              {allServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.category}/${service.slug}`}
                    className="group flex items-center gap-5 py-5 transition-colors hover:bg-black"
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md border border-neutral-800">
                      <Image
                        src={serviceImage(service.slug)}
                        alt={service.name}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{service.name}</p>
                      <p className="mt-1 text-sm text-neutral-400">{service.hero.subtitle}</p>
                    </div>
                    <span className="text-sm font-medium text-neutral-300 group-hover:text-white">
                      Details →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
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

        {/* About / Why */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">A different kind of chair.</h2>
            <p className="mt-6 text-lg text-neutral-300">
              Mr. Barbosa is a one-on-one men’s grooming studio. No noisy floor of clippers,
              no rushing the cut, no sales pitch. Just a stylist who has spent over a decade
              perfecting the craft, working through your hair the way it should be worked through.
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-block rounded-lg border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                About the Studio
              </Link>
            </div>
          </div>
        </section>

        {/* Visit / Address */}
        <section className="border-t border-neutral-800 bg-neutral-950 py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-4 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">Visit the Studio</h2>
              <p className="mt-4 text-neutral-300">
                {caseyConfig.address.street}<br />
                {caseyConfig.address.city}, {caseyConfig.address.state} {caseyConfig.address.zip}
              </p>
              <p className="mt-4 text-sm text-neutral-400">
                A short walk from the 23rd St 1, F, M, R, and W trains.
              </p>
              <div className="mt-6">
                <a
                  href={siteConfig.socialLinks.find((s) => s.label === 'Google')?.url ?? '#'}
                  target="_blank"
                  rel="noopener"
                  className="inline-block text-sm font-semibold text-white underline-offset-4 hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white">Hours</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <dt className="text-neutral-400">Monday</dt>
                  <dd className="text-neutral-300">Closed</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <dt className="text-neutral-400">Tuesday – Friday</dt>
                  <dd className="text-neutral-300">11:00 AM – 8:00 PM</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <dt className="text-neutral-400">Saturday</dt>
                  <dd className="text-neutral-300">11:00 AM – 5:00 PM</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-400">Sunday</dt>
                  <dd className="text-neutral-300">Closed</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Ready for the chair?</h2>
            <p className="mt-4 text-neutral-300">
              Reserve your appointment online — instant confirmation.
            </p>
            <div className="mt-8">
              <a
                href={caseyConfig.bookingUrl}
                target="_blank"
                rel="noopener"
                className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-black shadow-lg transition-all hover:bg-neutral-200"
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

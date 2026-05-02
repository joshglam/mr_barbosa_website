import Image from 'next/image';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { heroImage } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About',
  description: `Meet Igor — the stylist behind Mr. Barbosa Mens Hair Salon. Over a decade of men’s grooming experience on the Chelsea / Flatiron border in NYC.`,
};

const values = [
  {
    title: 'One-on-one chair',
    description: `Mr. Barbosa is a single-chair studio. No bouncing around the floor, no rushed appointment slots — just one client at a time.`,
  },
  {
    title: 'Decade of experience',
    description: `Igor has spent over a decade refining the craft of men’s hair and beard work. Every cut is the product of that practice.`,
  },
  {
    title: 'Classic + modern',
    description: `From precision fades to scissor-driven beard work, the studio blends modern technique with the discipline of a classic men’s atelier.`,
  },
  {
    title: 'A real consultation',
    description: `Every visit starts with a conversation. We talk through what you like, what you don’t, and what fits your day-to-day.`,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-800 py-24 sm:py-32">
        <Image
          src={heroImage('about')}
          alt="Mr. Barbosa Mens Hair Salon — interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-300">
            About the studio
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Crafting excellence in every cut.
          </h1>
          <p className="mt-6 text-lg text-neutral-200">
            Men’s grooming in {siteConfig.neighborhood}, {siteConfig.city} since {siteConfig.established}.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-neutral-800">
                <Image
                  src="/images/igor.webp"
                  alt="Igor Barbosa, owner and stylist at Mr. Barbosa Mens Hair Salon"
                  width={800}
                  height={1000}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-white">Meet Igor</h2>
              <div className="mt-6 space-y-5 text-neutral-300">
                <p>
                  With over a decade of experience in men’s grooming, Igor has dedicated his career to
                  mastering the blend of classic technique and modern style. Every haircut is more than a
                  service — it’s a small transformation, the kind that lets you walk back outside feeling
                  a little sharper than when you walked in.
                </p>
                <p>
                  At {siteConfig.name}, Igor works one-on-one. The studio is intentionally calm and quiet —
                  a single chair, a real conversation about your hair, and time to do the work properly.
                  From precision haircuts to scissor-driven beard trims, every detail is handled in person,
                  by the same hands.
                </p>
                <p>
                  Whether you come in for a quick buzz cut on the way home from work, the cut + classic
                  beard trim package before an event, or a kids cut with a parent in tow, the goal is
                  always the same: walk out looking and feeling like the best version of yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-neutral-800 bg-neutral-950 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-white">What sets the studio apart</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border border-neutral-800 bg-black p-6">
                <h3 className="font-semibold text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-2xl font-bold text-white">What to expect</h2>
          <div className="mt-12 space-y-8">
            <div className="flex gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-black">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white">Consultation</h3>
                <p className="mt-1 text-neutral-400">
                  We start with a conversation about your hair, your routine, and what you’re looking for.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-black">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white">Wash & Prep</h3>
                <p className="mt-1 text-neutral-400">
                  A wash and prep so the cut sits and falls correctly.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-black">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white">Precision Work</h3>
                <p className="mt-1 text-neutral-400">
                  Scissor and clipper work, finished by hand. Beard work shaped primarily with scissors for natural texture.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-black">
                4
              </div>
              <div>
                <h3 className="font-semibold text-white">Style & Recommendation</h3>
                <p className="mt-1 text-neutral-400">
                  A finishing style and product recommendation so it looks the same when you do it at home tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-800 bg-neutral-950 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">Ready for the chair?</h2>
          <p className="mt-4 text-neutral-300">
            Reserve your appointment online — instant confirmation.
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
    </div>
  );
}

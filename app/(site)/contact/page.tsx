import Image from 'next/image';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Visit',
  description: `Visit ${siteConfig.name} at ${caseyConfig.address.street}, ${caseyConfig.address.city}, ${caseyConfig.address.state} ${caseyConfig.address.zip}. Book online any time.`,
};

const googleMapsUrl =
  siteConfig.socialLinks.find((s) => s.label === 'Google')?.url ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.name} ${caseyConfig.address.street}`)}`;

const studioPhotos: { src: string; alt: string }[] = [
  { src: '/images/studio1.webp', alt: 'Reception lounge with marble counter, gold accents, and red velvet seating at Mr. Barbosa' },
  { src: '/images/studio4.webp', alt: 'Glass-walled lobby with brass pendant lighting at the entrance to the studio' },
  { src: '/images/studio2.webp', alt: 'Light-filled common area with marble tables and rose-gold pendants beside the studio' },
  { src: '/images/studio3.webp', alt: 'View from the studio onto West 24th Street in Chelsea / Flatiron, NYC' },
];

export default function ContactPage() {
  return (
    <div className="bg-black">
      <section className="border-b border-neutral-800 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Visit the Studio</h1>
          <p className="mt-4 text-lg text-neutral-300">
            Mr. Barbosa is a one-chair studio on the Chelsea / Flatiron border, by appointment only.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-white">Address</h2>
            <p className="mt-4 text-lg text-neutral-200">
              {caseyConfig.address.street}<br />
              {caseyConfig.address.city}, {caseyConfig.address.state} {caseyConfig.address.zip}
            </p>
            <p className="mt-4 text-sm text-neutral-400">
              Between 6th and 7th Avenues. A short walk from the 23rd St 1, F, M, R, and W trains.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="inline-block rounded-lg border border-white px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Open in Google Maps
              </a>
              <a
                href={caseyConfig.bookingUrl}
                target="_blank"
                rel="noopener"
                className="inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Book Now
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Hours</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <dt className="text-neutral-400">Monday</dt>
                <dd className="text-neutral-200">Closed</dd>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <dt className="text-neutral-400">Tuesday – Friday</dt>
                <dd className="text-neutral-200">11:00 AM – 8:00 PM</dd>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <dt className="text-neutral-400">Saturday</dt>
                <dd className="text-neutral-200">11:00 AM – 5:00 PM</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-400">Sunday</dt>
                <dd className="text-neutral-200">Closed</dd>
              </div>
            </dl>

            <h3 className="mt-8 font-semibold text-white">Booking</h3>
            <p className="mt-2 text-sm text-neutral-400">
              All visits are by appointment. Book online any time — you’ll get an instant confirmation.
            </p>

            {siteConfig.socialLinks.length > 0 && (
              <>
                <h3 className="mt-8 font-semibold text-white">Follow</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {siteConfig.socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener"
                        className="text-neutral-300 hover:text-white"
                      >
                        {link.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-800 bg-neutral-950 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Inside the Studio</h2>
            <p className="mt-3 text-neutral-300">
              The studio sits inside an upscale Chelsea / Flatiron salon building — bright, modern, and intentionally calm.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {studioPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-4/3 overflow-hidden rounded-2xl border border-neutral-800"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-800 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">Ready for the chair?</h2>
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
  );
}

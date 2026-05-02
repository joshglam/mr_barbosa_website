import Link from 'next/link';
import { siteConfig, caseyConfig } from '@/lib/config';
import { serviceCategories, getServicesByCategory } from '@/lib/services';

import { FaGoogle, FaFacebookF, FaInstagram, FaLinkedinIn, FaYelp } from 'react-icons/fa';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Google: FaGoogle,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  Yelp: FaYelp,
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-neutral-300">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-semibold tracking-wide text-white">
                {siteConfig.shortName}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                Mens Hair Salon
              </span>
            </div>
            <p className="mt-4 text-sm text-neutral-400">
              {siteConfig.description}
            </p>
            <a
              href={caseyConfig.bookingUrl}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
            >
              Book Now
            </a>
          </div>

          {serviceCategories.slice(0, 2).map((category) => (
            <div key={category.slug}>
              <h4 className="font-semibold text-white">{category.name}</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {getServicesByCategory(category.slug).slice(0, 5).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${category.slug}/${service.slug}`}
                      className="text-neutral-400 hover:text-white"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-white">Studio</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-neutral-400 hover:text-white">
                  Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white">
                  Visit
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-neutral-400 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
            <div className="mt-6 text-sm text-neutral-400">
              <p>{caseyConfig.address.street}</p>
              <p>
                {caseyConfig.address.city}, {caseyConfig.address.state} {caseyConfig.address.zip}
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        {siteConfig.socialLinks.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            {siteConfig.socialLinks.map((link) => {
              const Icon = socialIcons[link.label];
              if (!Icon) return null;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-white"
                  aria-label={link.label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        )}

        <div className="mt-8 border-t border-neutral-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
            <div>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Image from 'next/image';
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
    <footer className="bg-brand-50 text-brand-900 border-t border-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              {/* TODO: Replace with your logo */}
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={160}
                height={93}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 text-sm text-brand-600">
              {siteConfig.description}
            </p>
            <a
              href={caseyConfig.phoneHref}
              className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Call {caseyConfig.phone}
            </a>
            <button
              type="button"
              className="mt-2 block text-sm text-brand-600 transition-colors hover:text-brand-900"
              data-casey-trigger="true"
            >
              Get pricing & availability
            </button>
          </div>

          {/* Service categories in footer */}
          {serviceCategories.slice(0, 2).map((category) => (
            <div key={category.slug}>
              <h4 className="font-semibold text-brand-900">{category.name}</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {getServicesByCategory(category.slug).slice(0, 5).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${category.slug}/${service.slug}`}
                      className="text-brand-600 hover:text-brand-900"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-brand-900">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-brand-600 hover:text-brand-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-brand-600 hover:text-brand-900">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-600 hover:text-brand-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-brand-600 hover:text-brand-900">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-brand-600 hover:text-brand-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/free-estimate" className="text-brand-600 hover:text-brand-900">
                  Free Estimate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
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
                className="text-brand-500 transition-colors hover:text-brand-900"
                aria-label={link.label}
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-brand-500 md:flex-row">
            <div>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-brand-900">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-brand-900">Terms of Service</Link>
            </div>
            <div className="text-xs text-brand-500">
              AI chat powered by{' '}
              <a href="https://caseyresponse.com" target="_blank" rel="noopener" className="hover:text-brand-700">
                Casey Response AI
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

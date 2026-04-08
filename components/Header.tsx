import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, caseyConfig } from '@/lib/config';
import { serviceCategories, getServicesByCategory } from '@/lib/services';

// Show up to 4 services per category in the dropdown
const getDropdownServices = (categorySlug: string) =>
  getServicesByCategory(categorySlug).slice(0, 4);

const popularLocations = [
  // TODO: Replace with your top service areas
  { name: 'Example City', slug: 'example-city' },
];

export function Header() {
  return (
    <header>
      {/* Utility bar */}
      <div className="bg-brand-800 py-1.5">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 text-xs text-brand-200">
          <span>{siteConfig.operatingHours?.weekday} | {siteConfig.operatingHours?.weekend}</span>
          <a href={caseyConfig.phoneHref} className="font-medium text-white hover:text-accent-500">
            {caseyConfig.phone}
          </a>
        </div>
      </div>
      {/* Main nav */}
      <div className="bg-white border-b border-gray-200">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          {/* TODO: Replace with your logo */}
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={160}
            height={93}
            className="h-14 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {/* Services Dropdown */}
          <div className="group relative">
            <Link
              href={`/services/${serviceCategories[0]?.slug}`}
              className="flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              Services
              <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="invisible absolute left-0 top-full z-50 w-125 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
                <div className="grid grid-cols-3 gap-4">
                  {serviceCategories.map((category) => (
                    <div key={category.slug}>
                      <Link
                        href={`/services/${category.slug}`}
                        className="text-sm font-semibold text-brand-600 hover:text-brand-800"
                      >
                        {category.name}
                      </Link>
                      <ul className="mt-2 space-y-1">
                        {getDropdownServices(category.slug).map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${category.slug}/${service.slug}`}
                              className="text-sm text-brand-500 hover:text-brand-900"
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Dropdown */}
          <div className="group relative">
            <Link
              href="/locations"
              className="flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              Service Areas
              <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="invisible absolute left-0 top-full z-50 w-48 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
                <ul className="space-y-1">
                  {popularLocations.map((location) => (
                    <li key={location.slug}>
                      <Link
                        href={`/locations/${location.slug}`}
                        className="block rounded px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 hover:text-brand-900"
                      >
                        {location.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 border-t border-gray-200 pt-2">
                  <Link
                    href="/locations"
                    className="block rounded px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50"
                  >
                    View all areas
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/resources" className="text-sm font-medium text-brand-700 hover:text-brand-900">
            Resources
          </Link>
          <Link href="/blog" className="text-sm font-medium text-brand-700 hover:text-brand-900">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-brand-700 hover:text-brand-900">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/free-estimate"
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-brand-900 transition-colors hover:bg-accent-600"
          >
            Free Estimate
          </Link>
          <a
            href={caseyConfig.phoneHref}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {caseyConfig.phone}
          </a>
        </div>
      </div>
      </div>
    </header>
  );
}

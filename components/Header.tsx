import Link from 'next/link';
import { siteConfig, caseyConfig } from '@/lib/config';
import { serviceCategories, getServicesByCategory } from '@/lib/services';
import { locations } from '@/lib/locations';

const getDropdownServices = (categorySlug: string) =>
  getServicesByCategory(categorySlug).slice(0, 4);

const popularLocations = locations.slice(0, 4);

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-semibold tracking-wide text-white">
            {siteConfig.shortName}
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
            Mens Hair Salon
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {/* Services Dropdown */}
          <div className="group relative">
            <Link
              href={`/services/${serviceCategories[0]?.slug}`}
              className="flex items-center gap-1 text-sm font-medium text-neutral-200 hover:text-white"
            >
              Services
              <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="invisible absolute left-0 top-full z-50 w-136 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4 shadow-xl">
                <div className="grid grid-cols-3 gap-4">
                  {serviceCategories.map((category) => (
                    <div key={category.slug}>
                      <Link
                        href={`/services/${category.slug}`}
                        className="text-sm font-semibold text-white hover:text-neutral-300"
                      >
                        {category.name}
                      </Link>
                      <ul className="mt-2 space-y-1">
                        {getDropdownServices(category.slug).map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${category.slug}/${service.slug}`}
                              className="text-sm text-neutral-400 hover:text-white"
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

          {/* Locations Dropdown */}
          <div className="group relative">
            <Link
              href="/locations"
              className="flex items-center gap-1 text-sm font-medium text-neutral-200 hover:text-white"
            >
              Areas
              <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="invisible absolute left-0 top-full z-50 w-56 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-2 shadow-xl">
                <ul className="space-y-1">
                  {popularLocations.map((location) => (
                    <li key={location.slug}>
                      <Link
                        href={`/locations/${location.slug}`}
                        className="block rounded px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-900 hover:text-white"
                      >
                        {location.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 border-t border-neutral-800 pt-2">
                  <Link
                    href="/locations"
                    className="block rounded px-3 py-2 text-sm font-medium text-white hover:bg-neutral-900"
                  >
                    View all areas
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/resources" className="text-sm font-medium text-neutral-200 hover:text-white">
            Resources
          </Link>
          <Link href="/blog" className="text-sm font-medium text-neutral-200 hover:text-white">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-neutral-200 hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-neutral-200 hover:text-white">
            Visit
          </Link>
        </nav>

        <a
          href={caseyConfig.bookingUrl}
          target="_blank"
          rel="noopener"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { serviceCategories, getServicesByCategory } from '@/lib/services';
import { heroImage, serviceImage } from '@/lib/images';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = serviceCategories.find((c) => c.slug === category);
  if (!cat) return { title: 'Service Not Found' };
  return {
    title: cat.name,
    description: `${cat.name} at ${siteConfig.name} — ${cat.description}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = serviceCategories.find((c) => c.slug === category);
  if (!cat) notFound();
  const services = getServicesByCategory(category);

  return (
    <div className="bg-black">
      <section className="relative overflow-hidden border-b border-neutral-800 py-24 sm:py-32">
        <Image
          src={heroImage(cat.slug)}
          alt={cat.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-5xl px-4">
          <nav className="mb-4 text-sm">
            <Link href="/" className="text-neutral-300 hover:text-white">Home</Link>
            <span className="mx-2 text-neutral-500">/</span>
            <span className="text-white">{cat.name}</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{cat.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-200">{cat.description}</p>
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

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${cat.slug}/${service.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 transition-all hover:border-white"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={serviceImage(service.slug)}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-semibold text-white">
                    {service.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-neutral-400">
                    {service.hero.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-white">
                    View details
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
    </div>
  );
}

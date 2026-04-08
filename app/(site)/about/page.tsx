import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${siteConfig.name} - professional ${siteConfig.vertical} services in ${siteConfig.city}, ${siteConfig.stateAbbr}. Family business established ${siteConfig.established}. Insured and bonded.`,
};

// TODO: Replace with your company's values / differentiators
const values = [
  {
    title: '100% Local',
    description: `Based in ${siteConfig.city}, we live and work in the same communities we serve. We know the area, the homes, and the people.`,
    icon: '\u2713',
  },
  {
    title: 'Family Business',
    description: `${siteConfig.shortName} is a family-owned operation. You work directly with the people who care about getting the job done right.`,
    icon: '\u2713',
  },
  {
    title: `${new Date().getFullYear() - (siteConfig.established ?? 2020)}+ Years Experience`,
    description: `Established in ${siteConfig.established}, we bring decades of hands-on experience to every ${siteConfig.vertical} project.`,
    icon: '\u2605',
  },
  {
    title: 'Insured',
    description: 'Fully insured for your protection and peace of mind. We carry comprehensive liability coverage on every project.',
    icon: '\u2713',
  },
  {
    title: 'Licensed Subcontractors',
    description: 'Our specialized subcontractors are fully licensed. We are insured and bonded for your protection.',
    icon: '\u2713',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-brand-800" />
        {/* TODO: Add hero image - <Image src="/images/about-hero.jpg" ... /> */}
        <div className="absolute inset-0 bg-brand-900/70" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">About {siteConfig.name}</h1>
          <p className="mt-4 text-lg text-brand-100">
            Professional {siteConfig.vertical} in {siteConfig.city}, {siteConfig.state} since {siteConfig.established}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
          <div className="mt-6 space-y-4 text-gray-600">
            {/* TODO: Replace these paragraphs with your actual company story */}
            <p>
              {siteConfig.name}, established in {siteConfig.established}, specializes in
              delivering high-quality, professional {siteConfig.vertical} services. With a
              commitment to customer satisfaction, clean work environments, and reliable
              communication, we pride ourselves on a foundation of repeat and referred clients.
            </p>
            <p>
              {/* TODO: Describe how your business has grown and what services you offer */}
              Over the years we have expanded our capabilities while maintaining the same
              standards that built our reputation. We bring dedication and attention to detail
              to every project we take on.
            </p>
            <p>
              {/* TODO: Describe your service area and community relationships */}
              Based in {siteConfig.city}, we serve homeowners throughout the surrounding
              communities. We&apos;ve built lasting relationships with clients who trust us
              with their homes year after year.
            </p>
            <p>
              {/* TODO: Add your personal closing statement / value proposition */}
              We&apos;re not the biggest contractor around. But we think we might be the most
              reliable. Quality work, clean job sites, honest pricing. That&apos;s it.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-gray-900">What Sets Us Apart</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-100 text-2xl">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-1 text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-gray-900">Our Commitment</h2>
          <p className="mt-2 text-center text-gray-600">The standards we hold ourselves to on every project</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Quality Craftsmanship</h3>
              <p className="mt-2 text-sm text-gray-600">
                We use premium materials and proven techniques on every project. No shortcuts, no cutting corners.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Clean Job Sites</h3>
              <p className="mt-2 text-sm text-gray-600">
                We treat your home with respect. Work areas are cleaned daily, and we leave your space better than we found it.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Clear Communication</h3>
              <p className="mt-2 text-sm text-gray-600">
                We keep you informed at every stage. No surprises, no disappearing acts. You always know what&apos;s happening with your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insured & Bonded */}
      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Insured & Bonded</h2>
          <p className="mt-4 text-gray-600">
            {/* TODO: Customize insurance / licensing details for your business */}
            {siteConfig.name} is fully insured and bonded. We carry comprehensive general
            liability insurance and workers&apos; compensation coverage. Our specialized
            subcontractors are fully licensed. We help coordinate permits and inspections
            as part of our standard process.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-2xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-12 space-y-8">
            <div className="flex gap-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Consultation</h3>
                <p className="mt-1 text-gray-600">
                  We start with a conversation about your project. Tell us what you&apos;re looking
                  for, and we&apos;ll visit your home to assess the scope of work and answer any
                  questions.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Detailed Estimate</h3>
                <p className="mt-1 text-gray-600">
                  You&apos;ll receive a clear, written estimate covering materials, labor, and
                  timeline. No hidden fees, no surprises. We want you to know exactly what to
                  expect before any work begins.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Professional Execution</h3>
                <p className="mt-1 text-gray-600">
                  Our experienced team handles every detail — from preparation to final
                  finishes. We maintain a clean work environment throughout and keep you informed
                  every step of the way.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Final Walkthrough</h3>
                <p className="mt-1 text-gray-600">
                  Before we consider any project complete, we walk through the finished work with
                  you to make sure every detail meets your expectations. We&apos;re not done until
                  you&apos;re satisfied.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Serving {siteConfig.city} and Surrounding Areas
          </h2>
          <p className="mt-4 text-gray-600">
            {/* TODO: Customize your service area description */}
            Based in {siteConfig.city}, our team serves homeowners throughout the surrounding
            communities. Whether it&apos;s a small repair or a major project, we bring the same
            dedication and attention to detail to every home we work on.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to Transform Your Home?</h2>
          <p className="mt-4 text-gray-600">
            Call us for a free consultation and estimate. No pressure, no obligation — just honest
            advice from a team that&apos;s been doing this since {siteConfig.established}.
          </p>
          <div className="mt-6">
            <a
              href={caseyConfig.phoneHref}
              className="inline-block rounded-lg bg-accent-500 px-6 py-3 font-semibold text-brand-900 shadow-lg transition-colors hover:bg-accent-600"
            >
              Call {caseyConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

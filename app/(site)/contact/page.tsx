import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { CaseyInlineEmbed } from '@/components/casey';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${siteConfig.name} for professional ${siteConfig.vertical} services in ${siteConfig.city} and surrounding areas. Get instant answers and free quotes.`,
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-700 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-brand-100">
            Get instant answers or schedule your project today
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Chat CTA - Primary */}
            <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600 text-2xl text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Chat With Us
              </h2>
              <p className="mt-2 text-gray-600">
                The fastest way to get help. Our AI assistant is available 24/7 to answer
                questions, provide quotes, and schedule service.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-brand-600">{'\u2713'}</span>
                  Instant responses, no waiting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-600">{'\u2713'}</span>
                  Accurate pricing estimates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-600">{'\u2713'}</span>
                  Schedule service directly
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-600">{'\u2713'}</span>
                  Available 24/7, including holidays
                </li>
              </ul>
              <div className="mt-6">
                <CaseyInlineEmbed />
              </div>
            </div>

            {/* Other Contact Methods */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Speak with a team member directly
                    </p>
                    <a
                      href={caseyConfig.phoneHref}
                      className="mt-2 block text-lg font-semibold text-brand-600 hover:underline"
                    >
                      {caseyConfig.phone}
                    </a>
                    {siteConfig.operatingHours && (
                      <p className="text-xs text-gray-500">{siteConfig.operatingHours.weekday}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      For non-urgent inquiries
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-2 block font-semibold text-brand-600 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                    <p className="text-xs text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Service Area</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {/* TODO: Customize your service area description */}
                      We proudly serve {siteConfig.city} and the surrounding areas.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {/* TODO: List specific neighborhoods / cities */}
                      {siteConfig.city} and surrounding communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-50 py-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-bold text-brand-700">Ready to Start Your Project?</h2>
          <p className="mt-2 text-brand-600">
            Whether it&apos;s a small repair or a major project, we&apos;re here to help.
            Reach out today for a free estimate.
          </p>
          <div className="mt-4">
            <a
              href={caseyConfig.phoneHref}
              className="inline-block rounded-lg bg-brand-600 px-6 py-2 font-semibold text-white shadow-lg transition-colors hover:bg-brand-700"
            >
              Call {caseyConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Business Info */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900">Business Information</h2>
          <div className="mt-6 text-gray-600">
            <p className="font-semibold">{siteConfig.name}</p>
            <p>{siteConfig.city}, {siteConfig.state}</p>
            <p className="mt-4 text-sm">
              Insured & Bonded in {siteConfig.state}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { siteConfig, caseyConfig } from '@/lib/config';
import { EstimateForm } from './EstimateForm';

export const metadata: Metadata = {
  title: 'Free Estimate',
  description: `Request a free estimate from ${siteConfig.name}. Professional ${siteConfig.vertical} services in ${siteConfig.city} and surrounding areas. Fast response, no obligation.`,
};

export default function FreeEstimatePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-700 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            Request a Free Estimate
          </h1>
          <p className="mt-4 text-lg text-brand-100">
            Tell us about your project and we&apos;ll get back to you with a
            no-obligation quote
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Get Your Free Quote
              </h2>
              <p className="mt-2 text-gray-600">
                Fill out the form below and we&apos;ll reach out to discuss your
                project and provide a detailed estimate.
              </p>
              <div className="mt-6">
                <EstimateForm />
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-semibold text-gray-900">
                  What to expect
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-600">&#10003;</span>
                    We&apos;ll confirm your request via text or email
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-600">&#10003;</span>
                    A team member will follow up to discuss details
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-600">&#10003;</span>
                    You&apos;ll receive a detailed, no-obligation quote
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-600">&#10003;</span>
                    Most estimates provided within 1&ndash;2 business days
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-semibold text-gray-900">
                  Prefer to call?
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Reach us directly at:
                </p>
                <a
                  href={caseyConfig.phoneHref}
                  className="mt-2 block text-lg font-semibold text-brand-600 hover:underline"
                >
                  {caseyConfig.phone}
                </a>
                {siteConfig.operatingHours && (
                  <p className="mt-1 text-xs text-gray-500">
                    {siteConfig.operatingHours.weekday}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

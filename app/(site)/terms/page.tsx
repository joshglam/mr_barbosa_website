import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-zinc-900">Terms of Service</h1>
        <p className="mt-4 text-zinc-600">Last updated: February 2026</p>

        <div className="prose prose-zinc mt-8 max-w-none">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using {siteConfig.name}, you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please
            do not use our service.
          </p>

          <h2>Service Description</h2>
          <p>
            {/* TODO: Customize the service description for your business */}
            {siteConfig.name} provides professional {siteConfig.vertical}{' '}
            services in {siteConfig.city}, {siteConfig.stateAbbr} and the
            surrounding areas for residential and commercial properties.
          </p>

          <h2>No Warranty</h2>
          <p>
            The information provided on this website is for general
            informational purposes only. We make no representations or
            warranties about the accuracy, reliability, or completeness of any
            information.
          </p>

          <h2>Service Agreements</h2>
          <p>
            All work performed by {siteConfig.name} is subject to a
            separate written service agreement or estimate provided before work
            begins. These Terms of Service govern your use of this website, not
            the terms of any service agreement.
          </p>

          <h2>SMS/Text Messaging Terms</h2>
          <p>
            By signing up for text updates from {siteConfig.name}, you agree
            to the following:
          </p>
          <ul>
            <li>
              <strong>Message types:</strong> You may receive text messages
              related to estimate confirmations, appointment reminders, service
              follow-ups, and project status updates.
            </li>
            <li>
              <strong>Message frequency:</strong> Message frequency varies
              based on your active projects and service requests.
            </li>
            <li>
              <strong>Costs:</strong> Message and data rates may apply. Check
              with your mobile carrier for details.
            </li>
            <li>
              <strong>Opt out:</strong> You may opt out of text messages at any
              time by replying STOP to any message you receive from us.
            </li>
            <li>
              <strong>Help:</strong> Reply HELP to any message for assistance,
              or contact us at {siteConfig.email}.
            </li>
            <li>
              <strong>No sharing:</strong> We will not share your phone number
              or mobile opt-in data with third parties for their marketing
              purposes.
            </li>
            <li>
              <strong>Not required:</strong> Consent to receive text messages
              is not a condition of purchasing any goods or services from{' '}
              {siteConfig.name}.
            </li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            {siteConfig.name} shall not be liable for any damages arising from
            your use of this website. Liability for work performed is governed
            by the applicable service agreement and warranty terms.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, and logos, is
            the property of {siteConfig.name} and is protected by copyright
            laws.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the service after changes constitutes acceptance of the new
            terms.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            {siteConfig.email}.
          </p>
        </div>
      </div>
    </div>
  );
}

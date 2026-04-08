'use client';

import { useState } from 'react';
import Link from 'next/link';
import { caseyWidgetConfig } from '@/lib/casey/config';
import { trackFormSubmission } from '@/lib/analytics';
import { siteConfig } from '@/lib/config';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function EstimateForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const hp = formData.get('_hp') as string;

    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== '_hp' && key !== 'sms_consent' && key !== 'sms_marketing_consent') {
        fields[key] = value as string;
      }
    }
    fields.sms_consent = formData.get('sms_consent') ? 'yes' : 'no';
    fields.sms_marketing_consent = formData.get('sms_marketing_consent') ? 'yes' : 'no';

    const formUrl = caseyWidgetConfig.formUrl;

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(caseyWidgetConfig.apiKey
            ? { Authorization: `Bearer ${caseyWidgetConfig.apiKey}` }
            : {}),
        },
        body: JSON.stringify({ fields, _hp: hp }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
      trackFormSubmission('free_estimate');
    } catch {
      setStatus('error');
      setErrorMessage(
        'Something went wrong. Please try again or call us directly.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-8 text-center">
        <div className="text-4xl">&#10003;</div>
        <h3 className="mt-4 text-xl font-bold text-gray-900">
          Request received!
        </h3>
        <p className="mt-2 text-gray-600">
          Thanks for reaching out. We&apos;ll review your project details and
          get back to you shortly with an estimate.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="Your name"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          autoComplete="tel"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Email (optional) */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email{' '}
          <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Tell us about your project <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          placeholder="What kind of work are you looking for? Include any details like scope, current condition, timeline, etc."
        />
      </div>

      {/* Honeypot -- hidden from real users */}
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      />

      {/* SMS Consent -- Transactional */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="sms_consent"
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-gray-700">
            I agree to receive text messages from {siteConfig.name} regarding
            my estimate, appointment confirmations, and service follow-ups.
            Message and data rates may apply. Message frequency varies. Reply
            STOP to opt out. Reply HELP for assistance.
          </span>
        </label>

        {/* SMS Consent -- Marketing (optional) */}
        <label className="mt-3 flex items-start gap-3 pl-0">
          <input
            type="checkbox"
            name="sms_marketing_consent"
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-gray-700">
            I&apos;d also like to receive promotional messages, special offers,
            and seasonal maintenance reminders from {siteConfig.shortName}.
            Message frequency varies. Reply STOP to opt out.
          </span>
        </label>

        <p className="mt-3 text-xs text-gray-500">
          By submitting this form, you accept our{' '}
          <Link href="/terms" className="text-brand-600 underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-brand-600 underline">
            Privacy Policy
          </Link>
          . Consent is not a condition of purchase. You may opt out at any time.
        </p>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting...' : 'Request Free Estimate'}
      </button>
    </form>
  );
}

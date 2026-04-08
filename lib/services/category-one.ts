import type { ServicePage } from './types';

// ============================================================================
// CATEGORY ONE SERVICES — Replace with your actual services.
// Each service gets a page at /services/category-one/[slug]
// ============================================================================
export const categoryOneServices: ServicePage[] = [
  {
    slug: 'service-a',
    name: 'Service A',
    category: 'category-one',
    metaDescription:
      'Professional Service A description. Include your city, key benefits, and a call to action.',
    hero: {
      title: 'Service A',
      subtitle:
        'Brief compelling subtitle describing this service for your target area',
    },
    quickAnswer:
      'A concise 1-2 sentence answer to the most common question about this service. This appears in a highlighted box on the service page and helps with AI/search engine answer extraction.',
    content: `
      <h2>About This Service</h2>
      <p>Detailed description of the service. Include what's involved, who it's for, and why your business is the right choice. Write 3-5 paragraphs with headings.</p>

      <h2>What We Include</h2>
      <ul>
        <li><strong>Feature one</strong> — description of what's included</li>
        <li><strong>Feature two</strong> — description of what's included</li>
        <li><strong>Feature three</strong> — description of what's included</li>
      </ul>

      <h2>Our Process</h2>
      <ol>
        <li>Step one of your process</li>
        <li>Step two of your process</li>
        <li>Step three of your process</li>
      </ol>
    `,
    faqs: [
      {
        question: 'How much does Service A cost?',
        answer:
          'Pricing varies based on scope. We provide free, detailed estimates for every project.',
      },
      {
        question: 'How long does Service A take?',
        answer:
          'Typical projects take X to Y weeks depending on scope and complexity.',
      },
    ],
    features: [
      'Free estimates',
      'Licensed & insured',
      'Quality materials',
      'Satisfaction guaranteed',
    ],
  },
];

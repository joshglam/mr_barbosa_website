import type { ServicePage } from './types';

// ============================================================================
// CATEGORY TWO SERVICES — Replace with your actual services.
// ============================================================================
export const categoryTwoServices: ServicePage[] = [
  {
    slug: 'service-b',
    name: 'Service B',
    category: 'category-two',
    metaDescription:
      'Professional Service B in your area. Free estimates, quality work.',
    hero: {
      title: 'Service B',
      subtitle: 'Brief subtitle for this service',
    },
    quickAnswer:
      'Quick answer about this service for AI/search extraction.',
    content: `
      <h2>About This Service</h2>
      <p>Detailed description of Service B.</p>
    `,
    faqs: [
      {
        question: 'Common question about Service B?',
        answer: 'Answer to the common question.',
      },
    ],
    features: [
      'Free estimates',
      'Licensed & insured',
      'Quality materials',
    ],
  },
];

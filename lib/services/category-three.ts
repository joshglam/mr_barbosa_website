import type { ServicePage } from './types';

// ============================================================================
// CATEGORY THREE SERVICES — Replace with your actual services.
// ============================================================================
export const categoryThreeServices: ServicePage[] = [
  {
    slug: 'service-c',
    name: 'Service C',
    category: 'category-three',
    metaDescription:
      'Professional Service C in your area. Free estimates, quality work.',
    hero: {
      title: 'Service C',
      subtitle: 'Brief subtitle for this service',
    },
    quickAnswer:
      'Quick answer about this service for AI/search extraction.',
    content: `
      <h2>About This Service</h2>
      <p>Detailed description of Service C.</p>
    `,
    faqs: [
      {
        question: 'Common question about Service C?',
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

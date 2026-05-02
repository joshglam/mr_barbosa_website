import type { ServicePage } from './types';

// ============================================================================
// SPECIALTY SERVICES — Add-ons and detail work
// /services/specialty/[slug]
// ============================================================================
export const specialtyServices: ServicePage[] = [
  {
    slug: 'scalp-and-neck-massage',
    name: 'Scalp & Neck Massage',
    category: 'specialty',
    metaDescription:
      'Therapeutic scalp and neck massage in Chelsea / Flatiron, NYC. Relieve tension and elevate your visit.',
    hero: {
      title: 'Scalp & Neck Massage',
      subtitle:
        'A focused, relaxing add-on that turns a haircut into an experience.',
    },
    quickAnswer:
      'The scalp and neck massage is a therapeutic add-on at Mr. Barbosa designed to relieve tension, promote circulation, and round out your visit.',
    content: `
      <h2>How It Works</h2>
      <p>The massage is performed in the chair — focused work on the scalp and the back of the neck. It’s a small upgrade that makes a big difference, especially if you’ve been at a desk all day.</p>

      <h2>Best Paired With</h2>
      <ul>
        <li>Men’s Haircut.</li>
        <li>Cut + Classic Beard Trim package.</li>
      </ul>
    `,
    faqs: [
      {
        question: 'Is this an add-on or a standalone service?',
        answer:
          'It’s typically booked as an add-on to a haircut or beard service.',
      },
      {
        question: 'How long does it take?',
        answer:
          'A standard scalp and neck massage runs about 10 minutes — enough to feel a real reset.',
      },
    ],
    features: [
      'Therapeutic scalp and neck focus',
      'Relieves tension, promotes circulation',
      'Pairs with any cut or beard service',
    ],
  },
];

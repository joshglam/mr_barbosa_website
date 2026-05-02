import type { ServicePage } from './types';

// ============================================================================
// BEARD SERVICES
// /services/beard/[slug]
// ============================================================================
export const beardServices: ServicePage[] = [
  {
    slug: 'classic-beard-trim',
    name: 'Classic Beard Trim',
    category: 'beard',
    metaDescription:
      'Classic beard trim in Chelsea / Flatiron, NYC. Scissor work for natural texture and shape — including line-up, trimming, and styling.',
    hero: {
      title: 'Classic Beard Trim',
      subtitle:
        'Scissor work for natural texture, refined shape, and a sharp finish.',
    },
    quickAnswer:
      'A Classic Beard Trim at Mr. Barbosa is shaped primarily with scissors for natural texture, then lined and styled for a polished finish.',
    content: `
      <h2>What Makes It “Classic”</h2>
      <p>We work the beard primarily with scissors instead of a clipper. That preserves natural texture, keeps the shape soft, and avoids the over-uniform look you get from clipper-only work. The lines are clean, but the body of the beard still looks like yours.</p>

      <h2>What’s Included</h2>
      <ul>
        <li>Consultation on shape and length.</li>
        <li>Scissor work to refine length and texture.</li>
        <li>Cheek and neckline detail.</li>
        <li>Style and product recommendation.</li>
      </ul>
    `,
    faqs: [
      {
        question: 'How often should I get a beard trim?',
        answer:
          'Every 2–4 weeks keeps the shape clean. If you’re growing it out, less often is fine — we’ll just trim what needs trimming.',
      },
      {
        question: 'Can I get a beard trim without a haircut?',
        answer:
          'Yes — beard trims are available as a standalone service or as part of the cut + beard package.',
      },
    ],
    features: [
      'Scissor-driven for natural texture',
      'Cheek and neckline detail',
      'Style and product recommendation',
    ],
  },
  {
    slug: 'haircut-and-beard-trim',
    name: 'Men’s Haircut & Classic Beard Trim',
    category: 'beard',
    metaDescription:
      'The full grooming package: precision men’s haircut paired with a scissor-shaped classic beard trim. Chelsea / Flatiron, NYC.',
    hero: {
      title: 'Men’s Haircut & Classic Beard Trim',
      subtitle:
        'The complete grooming package — precision cut and refined beard work in one visit.',
    },
    quickAnswer:
      'The Cut + Classic Beard Trim combines a full men’s haircut with a scissor-shaped beard trim — the most popular booking at Mr. Barbosa.',
    content: `
      <h2>Why Book Both</h2>
      <p>Hair and beard work as a single shape. Doing them in the same visit lets us balance the two — the line of the beard, the weight of the hair, the way they meet at the temple — so the finished look feels deliberate.</p>

      <h2>What’s Included</h2>
      <ul>
        <li>Full men’s haircut — consultation, wash, cut, finish.</li>
        <li>Classic beard trim — scissor work, line-up, style.</li>
        <li>Final review and product recommendation.</li>
      </ul>
    `,
    faqs: [
      {
        question: 'How long should I plan for?',
        answer:
          'Plan on roughly an hour to an hour and fifteen minutes for the combination service.',
      },
      {
        question: 'Can I add a scalp massage?',
        answer:
          'Yes — the scalp and neck massage is a popular add-on. Just mention it when booking.',
      },
    ],
    features: [
      'Full haircut and beard trim in one visit',
      'Balanced shape across hair and beard',
      'Style and product recommendation',
    ],
  },
];

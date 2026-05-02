import type { ServicePage } from './types';

// ============================================================================
// HAIRCUTS — All haircut services
// /services/haircuts/[slug]
// ============================================================================
export const haircutServices: ServicePage[] = [
  {
    slug: 'mens-haircut',
    name: 'Men’s Haircut',
    category: 'haircuts',
    metaDescription:
      'Professional men’s haircut in Chelsea / Flatiron, NYC. Personalized consultation, wash, precision cut, and style — tailored to your face shape and lifestyle.',
    hero: {
      title: 'Men’s Haircut',
      subtitle:
        'A precision cut tailored to your face shape, hair type, and personal style.',
    },
    quickAnswer:
      'A full men’s haircut at Mr. Barbosa includes a one-on-one consultation, wash, precision cut, and finishing style — designed around your face shape and lifestyle.',
    content: `
      <h2>What’s Included</h2>
      <p>Every men’s haircut starts with a real conversation. We talk through what you like, what you don’t, and what fits your day-to-day. Then comes a wash, a precision cut, and a finishing style you can recreate at home.</p>

      <h2>Who It’s For</h2>
      <ul>
        <li><strong>The professional</strong> — clean, polished, easy to maintain.</li>
        <li><strong>The trend-aware</strong> — modern fades, textured tops, classic with an edge.</li>
        <li><strong>The classicist</strong> — timeless cuts done with care and detail.</li>
      </ul>

      <h2>What to Expect</h2>
      <ol>
        <li>Consultation — your hair, your goals, your routine.</li>
        <li>Wash and prep so the cut sits and falls correctly.</li>
        <li>Precision scissor and clipper work, finished by hand.</li>
        <li>Style and product recommendation so it looks the same tomorrow.</li>
      </ol>
    `,
    faqs: [
      {
        question: 'How long does a men’s haircut take?',
        answer:
          'Plan on roughly 45 minutes from consultation through finish. New clients sometimes run a touch longer so we can get the details right.',
      },
      {
        question: 'Do I need to book in advance?',
        answer:
          'Yes — Mr. Barbosa is a one-chair studio, so appointments are required. You can book any service online via the booking page.',
      },
      {
        question: 'Can I bring a reference photo?',
        answer:
          'Absolutely. Photos are one of the most useful things you can bring. We’ll talk through what will work with your hair and face shape.',
      },
    ],
    features: [
      'One-on-one consultation',
      'Wash, cut, and finish',
      'Precision scissor and clipper work',
      'Style and product recommendation',
    ],
  },
  {
    slug: 'buzz-cut',
    name: 'Buzz Cut',
    category: 'haircuts',
    metaDescription:
      'Clean, even buzz cut in Chelsea / Flatiron, NYC. Precision clipper work for a low-maintenance, professional finish.',
    hero: {
      title: 'Buzz Cut',
      subtitle:
        'Clean, low-maintenance, and dialed-in. Even clipper work every visit.',
    },
    quickAnswer:
      'A buzz cut at Mr. Barbosa is a precision, even all-over clipper cut — quick, clean, and ideal for an active routine.',
    content: `
      <h2>About the Buzz Cut</h2>
      <p>The buzz cut is the ultimate low-maintenance look — but it only works when it’s done right. We blend the sides, clean up the neckline, and finish the hairline so the cut looks intentional, not generic.</p>

      <h2>Best For</h2>
      <ul>
        <li>Active lifestyles and travel.</li>
        <li>Thinning or receding hair where shorter looks sharper.</li>
        <li>Anyone who wants to spend less time on hair without looking like it.</li>
      </ul>
    `,
    faqs: [
      {
        question: 'How short is a buzz cut?',
        answer:
          'We’ll dial in the guard length together. Common ranges are #1 (very short) up to #4 (a longer crew look).',
      },
      {
        question: 'How often should I come back?',
        answer:
          'Every 2–4 weeks keeps a buzz cut looking sharp, depending on your hair growth and the length you choose.',
      },
    ],
    features: [
      'Precision all-over clipper work',
      'Clean neckline and hairline detail',
      'Quick, low-maintenance',
    ],
  },
  {
    slug: 'kids-haircut',
    name: 'Kids Haircut',
    category: 'haircuts',
    metaDescription:
      'Patient, age-appropriate kids haircuts in Chelsea / Flatiron, NYC. A calm chair and a stylist who works at your child’s pace.',
    hero: {
      title: 'Kids Haircut',
      subtitle:
        'Patient, calm, and dialed in for younger clients.',
    },
    quickAnswer:
      'Kids cuts at Mr. Barbosa are unhurried and age-appropriate — a calm chair and a stylist who works at your child’s pace.',
    content: `
      <h2>What to Expect</h2>
      <p>Kids haircuts work best when they’re unhurried. We let your child settle in, explain what we’re doing, and work at a pace that feels comfortable for them. The result is a cut that fits their personality and is easy for parents to manage.</p>

      <h2>Tips for First-Time Visits</h2>
      <ul>
        <li>Book a slower time of day if your child is shy.</li>
        <li>Reference photos help — bring one if you have a style in mind.</li>
        <li>Come a few minutes early so they can see the space.</li>
      </ul>
    `,
    faqs: [
      {
        question: 'What age range do you cut?',
        answer:
          'We see kids of all ages. For very young children who haven’t had a haircut before, give us a call and we’ll talk about the best approach.',
      },
      {
        question: 'How long does it take?',
        answer:
          'Plan on around 30 minutes. We don’t rush — kids cuts go better when they’re relaxed.',
      },
    ],
    features: [
      'Patient, age-appropriate approach',
      'Calm one-on-one space',
      'Style that’s easy to maintain at home',
    ],
  },
];

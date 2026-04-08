export interface ServicePage {
  slug: string;
  name: string;
  category: string;
  metaDescription: string;
  hero: {
    title: string;
    subtitle: string;
  };
  quickAnswer: string;
  content: string;
  faqs: Array<{ question: string; answer: string }>;
  features: string[];
}

export interface ServiceCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// ============================================================================
// SERVICE CATEGORIES — Define your business's service categories here.
// Each category gets its own landing page at /services/[category-slug]
// and can contain multiple individual service pages.
//
// Examples by vertical:
//   Roofing:     residential, commercial, repairs
//   Plumbing:    residential, commercial, emergency
//   Landscaping: design, maintenance, hardscaping
//   HVAC:        installation, repair, maintenance
//   Painting:    interior, exterior, commercial
// ============================================================================
export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'category-one',
    name: 'Category One',
    description: 'Description of your first service category',
    icon: 'hammer',
    color: 'blue',
  },
  {
    slug: 'category-two',
    name: 'Category Two',
    description: 'Description of your second service category',
    icon: 'paintbrush',
    color: 'green',
  },
  {
    slug: 'category-three',
    name: 'Category Three',
    description: 'Description of your third service category',
    icon: 'wrench',
    color: 'orange',
  },
];

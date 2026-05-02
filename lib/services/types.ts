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
// SERVICE CATEGORIES — Mr. Barbosa Mens Hair Salon
// Each category gets a landing page at /services/[category-slug]
// ============================================================================
export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'haircuts',
    name: 'Haircuts',
    description: 'Precision men’s and kids haircuts tailored to your face shape and lifestyle.',
    icon: 'scissors',
    color: 'white',
  },
  {
    slug: 'beard',
    name: 'Beard Services',
    description: 'Classic beard trims and grooming using scissors for natural, refined results.',
    icon: 'razor',
    color: 'white',
  },
  {
    slug: 'specialty',
    name: 'Specialty',
    description: 'Add-on services to round out your visit — relaxation and detail work.',
    icon: 'spa',
    color: 'white',
  },
];

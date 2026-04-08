import { siteConfig } from './config';

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface Location {
  slug: string;
  name: string;
  county: string;
  population: string;
  description: string;
  neighborhoods?: string[];
  zipCodes: string[];
  metaTitle?: string;
  metaDescription?: string;
  faqs?: LocationFAQ[];
}

// ============================================================================
// SERVICE AREA LOCATIONS — Add all cities/towns you serve.
// Each location gets a page at /locations/[slug] for local SEO.
//
// Tips:
//   - Include 3-5 FAQs per location for rich search results
//   - Write unique descriptions (don't just change the city name)
//   - Include neighborhoods for larger cities
//   - Add ZIP codes for geo-targeting
// ============================================================================
export const locations: Location[] = [
  {
    slug: 'example-city',
    name: 'Example City',
    county: 'Example County',
    population: '~50,000',
    description: `${siteConfig.name} serves the Example City community with professional ${siteConfig.vertical} services. Based nearby, our team has been serving Example City since ${siteConfig.established}. Write 3-5 sentences about why you serve this area well.`,
    neighborhoods: ['Downtown', 'Northside', 'Westview'],
    zipCodes: ['12345'],
    metaTitle: `${siteConfig.vertical} Services in Example City | ${siteConfig.shortName}`,
    metaDescription: `Professional ${siteConfig.vertical} services in Example City. Free estimates, insured and bonded.`,
    faqs: [
      {
        question: `How much do ${siteConfig.vertical} services cost in Example City?`,
        answer: `Costs vary based on project scope. ${siteConfig.name} provides free, detailed estimates for every project. Contact us for a personalized quote.`,
      },
      {
        question: `Does ${siteConfig.shortName} serve Example City?`,
        answer: `Yes, ${siteConfig.name} has served Example City since ${siteConfig.established}. We are located nearby and provide fast response times.`,
      },
    ],
  },
  // Add more locations here...
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}

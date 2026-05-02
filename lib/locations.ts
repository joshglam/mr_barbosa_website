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
// NEIGHBORHOODS / AREAS SERVED — Mr. Barbosa is a single-chair studio in
// Chelsea, Manhattan. Each entry below is a neighborhood that walks or trains
// in easily, used to surface local search.
// ============================================================================
export const locations: Location[] = [
  {
    slug: 'chelsea',
    name: 'Chelsea',
    county: 'Manhattan',
    population: '~50,000',
    description: `Mr. Barbosa is based in the heart of Chelsea on West 24th Street between 6th and 7th Avenues — a quick walk from the 23rd St 1, 2, F, M, R, and W trains. Our Chelsea clients include creative-industry professionals, gallery owners, residents from London Terrace and 100 West 26th, and visitors from across the city.`,
    neighborhoods: ['Flatiron', 'Meatpacking District', 'Hudson Yards', 'NoMad'],
    zipCodes: ['10001', '10011'],
    metaTitle: `Men’s Hair Salon in Chelsea, NYC | ${siteConfig.shortName}`,
    metaDescription: `Precision men’s haircuts and beard work in Chelsea, Manhattan. One-on-one styling at Mr. Barbosa Mens Hair Salon on West 24th Street.`,
    faqs: [
      {
        question: 'Where exactly is Mr. Barbosa located in Chelsea?',
        answer: '124 West 24th Street, Suite 8 — between 6th and 7th Avenues, a short walk from the 23rd St 1/F/M/R/W trains.',
      },
      {
        question: 'Do you take walk-ins?',
        answer: 'Mr. Barbosa is a one-chair studio, so all visits are by appointment. You can book online any time at vagaro.com/mrbarbosa.',
      },
      {
        question: 'What neighborhoods do you serve?',
        answer: 'Most clients come from Chelsea, Flatiron, NoMad, the Meatpacking District, Hudson Yards, and the West Village — but we welcome anyone willing to make the trip.',
      },
    ],
  },
  {
    slug: 'flatiron',
    name: 'Flatiron',
    county: 'Manhattan',
    population: '~10,000',
    description: `The Flatiron District is a five-minute walk east of Mr. Barbosa. Many of our regulars work in the office buildings around Madison Square Park and the Flatiron Building, and stop in for cuts on lunch breaks or after work.`,
    neighborhoods: ['Madison Square Park', 'NoMad', 'Gramercy'],
    zipCodes: ['10010', '10003'],
    metaTitle: `Men’s Hair Salon Near Flatiron, NYC | ${siteConfig.shortName}`,
    metaDescription: `Precision men’s haircuts and beard work a short walk from the Flatiron District, NYC. One-on-one styling at Mr. Barbosa Mens Hair Salon.`,
    faqs: [
      {
        question: 'How long is the walk from the Flatiron Building?',
        answer: 'About 6 minutes — straight down Broadway and west on 24th Street.',
      },
      {
        question: 'Can I book a lunch-break appointment?',
        answer: 'Yes. We schedule throughout the day Tuesday–Friday from 11am to 8pm. Book online and pick a window that fits your day.',
      },
    ],
  },
  {
    slug: 'meatpacking-district',
    name: 'Meatpacking District',
    county: 'Manhattan',
    population: '~5,000',
    description: `The Meatpacking District is a quick walk west from Mr. Barbosa, just south of Chelsea Market. We see clients heading to or from the High Line, gallery openings, and the boutique offices and restaurants that fill the neighborhood.`,
    neighborhoods: ['West Village', 'Chelsea Market', 'High Line'],
    zipCodes: ['10014'],
    metaTitle: `Men’s Hair Salon Near the Meatpacking District | ${siteConfig.shortName}`,
    metaDescription: `One-on-one men’s grooming a short walk from the Meatpacking District. Precision cuts and classic beard work at Mr. Barbosa Mens Hair Salon, Chelsea NYC.`,
    faqs: [
      {
        question: 'Is parking available nearby?',
        answer: 'There are several paid garages within a block of the studio. Most clients take the train — the 23rd St stops on the 1, F, M, R, and W lines are all within easy walking distance.',
      },
    ],
  },
  {
    slug: 'hudson-yards',
    name: 'Hudson Yards',
    county: 'Manhattan',
    population: '~6,000',
    description: `Hudson Yards is a short walk west from Mr. Barbosa. We see a steady mix of residents from the high-rise buildings around the Vessel and professionals working in the offices at 30 and 50 Hudson Yards.`,
    neighborhoods: ['Hell’s Kitchen', 'Chelsea', 'Midtown West'],
    zipCodes: ['10001'],
    metaTitle: `Men’s Hair Salon Near Hudson Yards | ${siteConfig.shortName}`,
    metaDescription: `Precision men’s haircuts a short walk from Hudson Yards. One-on-one grooming at Mr. Barbosa Mens Hair Salon, Chelsea NYC.`,
    faqs: [
      {
        question: 'How do I get to the studio from Hudson Yards?',
        answer: 'It’s about a 12-minute walk east on 24th Street. The 7 train at 34 St–Hudson Yards is the closest subway, with the 23rd St 1/F/M/R/W stops a few blocks south.',
      },
    ],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}

import type { SiteConfig } from '@/types';

// ============================================================================
// SITE CONFIGURATION — Mr. Barbosa Mens Hair Salon
// ============================================================================

export const siteConfig: SiteConfig = {
  // Business identity
  name: 'Mr. Barbosa Mens Hair Salon',
  shortName: 'Mr. Barbosa',
  description:
    'Mr. Barbosa Mens Hair Salon is a one-on-one men’s grooming studio on the Chelsea / Flatiron border in NYC. Precision haircuts, classic beard work, and a calm, sophisticated experience designed for the modern gentleman.',
  url: 'https://mrbarbosamenshair.com',
  email: 'info@mrbarbosamenshair.com',

  // Location
  city: 'New York',
  state: 'New York',
  stateAbbr: 'NY',
  neighborhood: 'Chelsea & Flatiron',

  // Business details
  vertical: 'men’s hair styling',
  established: 2014,
  schemaType: 'HairSalon',

  // Hours
  operatingHours: {
    weekday: 'Tue–Fri: 11:00 AM – 8:00 PM',
    weekend: 'Sat: 11:00 AM – 5:00 PM · Sun–Mon: Closed',
  },

  // Social & directory links
  socialLinks: [
    { label: 'Instagram', url: 'https://www.instagram.com/barbosasalonnyc/' },
    { label: 'Google', url: 'https://maps.app.goo.gl/VeMEaoFmFQyTnux9A' },
  ],
  directoryLinks: [],
};

export const caseyConfig = {
  tagline: 'Precision men’s grooming in Chelsea & Flatiron',
  bookingUrl: 'https://www.vagaro.com/mrbarbosa/services',
  address: {
    street: '124 W 24th St, Suite 8',
    city: 'New York',
    state: 'NY',
    zip: '10011',
  },
};

import type { SiteConfig } from '@/types';

// ============================================================================
// SITE CONFIGURATION — Edit this file to customize for your business
// ============================================================================

export const siteConfig: SiteConfig = {
  // Business identity
  name: 'BUSINESS_NAME',
  shortName: 'SHORT_NAME',
  description: 'BUSINESS_DESCRIPTION — a one-to-two sentence summary of your business, services, and location.',
  url: 'https://www.YOURDOMAIN.com',
  email: 'info@YOURDOMAIN.com',

  // Location
  city: 'CITY',
  state: 'STATE',
  stateAbbr: 'ST',
  neighborhood: 'NEIGHBORHOOD',

  // Business details
  vertical: 'YOUR_VERTICAL',        // e.g. 'home improvement', 'roofing', 'plumbing', 'landscaping'
  established: 2020,                 // founding year
  schemaType: 'HomeAndConstructionBusiness', // Schema.org business type

  // Hours
  operatingHours: {
    weekday: 'Mon-Fri: 7:00AM - 6:00PM',
    weekend: 'Sat-Sun: 10:00AM - 5:00PM',
  },

  // Social & directory links (add your actual URLs)
  socialLinks: [
    // { label: 'Google', url: 'https://g.page/YOUR_BUSINESS' },
    // { label: 'Facebook', url: 'https://facebook.com/YOUR_PAGE' },
    // { label: 'Instagram', url: 'https://instagram.com/YOUR_HANDLE' },
    // { label: 'Yelp', url: 'https://yelp.com/biz/YOUR_BIZ' },
  ],
  directoryLinks: [],
};

export const caseyConfig = {
  tagline: 'Instant answers, real expertise',
  phone: '(555) 123-4567',
  phoneHref: 'tel:+15551234567',
};

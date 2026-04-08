// Site configuration
export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  email: string;
  city: string;
  state: string;
  stateAbbr: string;
  neighborhood?: string;
  vertical: string;
  established?: number;
  schemaType: string;
  operatingHours?: {
    weekday: string;
    weekend: string;
  };
  socialLinks: { label: string; url: string }[];
  directoryLinks: { label: string; url: string }[];
}

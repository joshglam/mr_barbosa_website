/**
 * Centralized image path helpers.
 * Filenames here must match what scripts/generate-images.ts produces.
 */

export function serviceImage(slug: string): string {
  return `/images/service-${slug}.jpg`;
}

export function heroImage(key: string): string {
  return `/images/hero-${key}.jpg`;
}

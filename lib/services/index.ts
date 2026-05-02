import { haircutServices } from './category-one';
import { beardServices } from './category-two';
import { specialtyServices } from './category-three';
import type { ServicePage } from './types';

export * from './types';

export const allServices: ServicePage[] = [
  ...haircutServices,
  ...beardServices,
  ...specialtyServices,
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return allServices.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return allServices.map((s) => s.slug);
}

export function getAllServiceParams(): { category: string; slug: string }[] {
  return allServices.map((s) => ({ category: s.category, slug: s.slug }));
}

export function getServiceByCategoryAndSlug(
  category: string,
  slug: string
): ServicePage | undefined {
  return allServices.find((s) => s.category === category && s.slug === slug);
}

export function getServicesByCategory(category: string): ServicePage[] {
  return allServices.filter((s) => s.category === category);
}

export { haircutServices, beardServices, specialtyServices };

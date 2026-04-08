import { categoryOneServices } from './category-one';
import { categoryTwoServices } from './category-two';
import { categoryThreeServices } from './category-three';
import type { ServicePage } from './types';

export * from './types';

export const allServices: ServicePage[] = [
  ...categoryOneServices,
  ...categoryTwoServices,
  ...categoryThreeServices,
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

export { categoryOneServices, categoryTwoServices, categoryThreeServices };

/**
 * İstanbul ilçe veri modeli (SEO Master Plan V4 & Faz 5 Mikro Modül Mimarisi).
 *
 * Programatik yerel SEO'nun merkezi veri katmanı.
 * Anadolu ve Avrupa yakası mikro modülleri üzerinden birleştirilir;
 * hafif meta veriler `districtsMetadata.ts` üzerinden sunulur.
 */

import type { District, NeighborhoodInfo } from './districts/types';
import { ANADOLU_DISTRICTS } from './districts/anadolu';
import { AVRUPA_DISTRICTS } from './districts/avrupa';

export type { District, NeighborhoodInfo };
export { ANADOLU_DISTRICTS } from './districts/anadolu';
export { AVRUPA_DISTRICTS } from './districts/avrupa';

/**
 * İstanbul'un tüm 39 ilçesi (14 Anadolu + 25 Avrupa).
 */
export const DISTRICTS: District[] = [
  ...ANADOLU_DISTRICTS,
  ...AVRUPA_DISTRICTS,
];

// Global statik objeyi mühürle (Faz 13 - Runtime Bellek Sızıntısı Koruması)
Object.freeze(DISTRICTS);

// O(1) slug lookup indeksi
export const DISTRICTS_BY_SLUG = new Map<string, District>(
  DISTRICTS.map((d) => [d.slug, d])
);

export const DISTRICT_SLUGS = DISTRICTS.map((d) => d.slug);

export function getDistrict(slug: string): District | undefined {
  return DISTRICTS_BY_SLUG.get(slug);
}

export function isValidDistrict(slug: string): boolean {
  return DISTRICTS_BY_SLUG.has(slug);
}

/**
 * Yalnızca ilçe koordinatlarını döndürür (Faz 16 - Seçici Projeksiyon).
 * Tüm mahalle ve tanıtım metinlerini ayrıştırmadan direkt koordinat verir.
 */
export function getDistrictGeo(slug: string): { lat: number; lng: number } | undefined {
  return DISTRICTS_BY_SLUG.get(slug)?.geo;
}

/**
 * Yalnızca ilçe demografik ve operasyonel verilerini döndürür (Faz 16 - Seçici Projeksiyon).
 */
export function getDistrictDemographics(slug: string) {
  const d = DISTRICTS_BY_SLUG.get(slug);
  if (!d) return undefined;
  return {
    slug: d.slug,
    name: d.name,
    side: d.side,
    population: d.population,
    priority: d.priority,
  };
}

export { DISTRICT_NAMES, type DistrictBasic } from './districtsMetadata';

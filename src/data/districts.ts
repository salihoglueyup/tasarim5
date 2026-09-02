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

export const DISTRICT_SLUGS = DISTRICTS.map((d) => d.slug);

export function getDistrict(slug: string): District | undefined {
  return DISTRICTS.find((d) => d.slug === slug);
}

export function isValidDistrict(slug: string): boolean {
  return DISTRICT_SLUGS.includes(slug);
}

const DISTRICT_DUES_MAP: Record<string, { avgDuesM2: number; aloDuesM2: number; savingsRate: number }> = {
  kadikoy: { avgDuesM2: 48, aloDuesM2: 37, savingsRate: 23 },
  atasehir: { avgDuesM2: 52, aloDuesM2: 39, savingsRate: 25 },
  uskudar: { avgDuesM2: 44, aloDuesM2: 34, savingsRate: 22 },
  besiktas: { avgDuesM2: 65, aloDuesM2: 48, savingsRate: 26 },
  sariyer: { avgDuesM2: 72, aloDuesM2: 52, savingsRate: 28 },
  sisli: { avgDuesM2: 58, aloDuesM2: 44, savingsRate: 24 },
  bakirkoy: { avgDuesM2: 54, aloDuesM2: 41, savingsRate: 24 },
  maltepe: { avgDuesM2: 42, aloDuesM2: 32, savingsRate: 24 },
  kartal: { avgDuesM2: 40, aloDuesM2: 30, savingsRate: 25 },
  pendik: { avgDuesM2: 38, aloDuesM2: 28, savingsRate: 26 },
  beylikduzu: { avgDuesM2: 36, aloDuesM2: 27, savingsRate: 25 },
  basaksehir: { avgDuesM2: 42, aloDuesM2: 31, savingsRate: 26 },
  cekmekoy: { avgDuesM2: 45, aloDuesM2: 34, savingsRate: 24 },
  sancaktepe: { avgDuesM2: 36, aloDuesM2: 27, savingsRate: 25 },
  umraniye: { avgDuesM2: 44, aloDuesM2: 33, savingsRate: 25 },
  zeytinburnu: { avgDuesM2: 46, aloDuesM2: 35, savingsRate: 24 },
  fatih: { avgDuesM2: 40, aloDuesM2: 31, savingsRate: 22 },
  eyupsultan: { avgDuesM2: 45, aloDuesM2: 34, savingsRate: 24 },
  esenyurt: { avgDuesM2: 32, aloDuesM2: 24, savingsRate: 25 },
  kucukcekmece: { avgDuesM2: 38, aloDuesM2: 29, savingsRate: 24 },
  avcilar: { avgDuesM2: 35, aloDuesM2: 27, savingsRate: 23 },
  tuzla: { avgDuesM2: 38, aloDuesM2: 28, savingsRate: 26 },
  beykoz: { avgDuesM2: 60, aloDuesM2: 45, savingsRate: 25 },
  buyukcekmece: { avgDuesM2: 39, aloDuesM2: 29, savingsRate: 25 },
  silivri: { avgDuesM2: 32, aloDuesM2: 24, savingsRate: 25 },
  arnavutkoy: { avgDuesM2: 34, aloDuesM2: 26, savingsRate: 24 },
  bagcilar: { avgDuesM2: 34, aloDuesM2: 26, savingsRate: 24 },
  bahcelievler: { avgDuesM2: 38, aloDuesM2: 29, savingsRate: 24 },
  bayrampasa: { avgDuesM2: 36, aloDuesM2: 28, savingsRate: 22 },
  beyoglu: { avgDuesM2: 52, aloDuesM2: 40, savingsRate: 23 },
  catalca: { avgDuesM2: 30, aloDuesM2: 23, savingsRate: 23 },
  esenler: { avgDuesM2: 33, aloDuesM2: 25, savingsRate: 24 },
  gaziosmanpasa: { avgDuesM2: 35, aloDuesM2: 27, savingsRate: 23 },
  güngoren: { avgDuesM2: 35, aloDuesM2: 27, savingsRate: 23 },
  kagithane: { avgDuesM2: 46, aloDuesM2: 35, savingsRate: 24 },
  sile: { avgDuesM2: 36, aloDuesM2: 27, savingsRate: 25 },
  sultangazi: { avgDuesM2: 32, aloDuesM2: 25, savingsRate: 22 },
  sultanbeyli: { avgDuesM2: 30, aloDuesM2: 23, savingsRate: 23 },
  adalar: { avgDuesM2: 45, aloDuesM2: 35, savingsRate: 22 },
};

export function getDistrictDues(slug: string) {
  return DISTRICT_DUES_MAP[slug] || { avgDuesM2: 42, aloDuesM2: 32, savingsRate: 24 };
}

export { DISTRICT_NAMES, type DistrictBasic } from './districtsMetadata';

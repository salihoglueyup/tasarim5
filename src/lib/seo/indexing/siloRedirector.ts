import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';

export interface SiloMatchResult {
  hasMatch: boolean;
  targetPath: string;
  matchType: 'DISTRICT_FACILITY' | 'DISTRICT_SERVICE' | 'FLAGSHIP_FACILITY' | 'SECTORAL_SOLUTION';
  confidence: number;
}

const SECTORAL_SLUGS = [
  'rezidans-yonetimi',
  'plaza-ve-is-merkezi-yonetimi',
  'site-ve-toplu-konut-yonetimi',
  'avm-yonetimi',
  'sanayi-ve-lojistik-tesis-yonetimi',
];

/**
 * Hatalı, eski veya yazım hatası içeren bir URL yolunu en yakın tematik Tesis Yönetimi
 * merkezine (Silo Hub) eşleştirir.
 */
export function resolveSiloRedirect(pathnameInput: string = ''): SiloMatchResult {
  const rawPath = (pathnameInput || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  if (!rawPath) {
    return { hasMatch: false, targetPath: '/', matchType: 'FLAGSHIP_FACILITY', confidence: 1.0 };
  }

  // 1. İlçe Tespiti
  const matchedDistrict = DISTRICTS.find((d) => {
    const slugName = d.slug;
    const districtName = d.name.toLowerCase();
    return rawPath.includes(slugName) || rawPath.includes(districtName);
  });

  // 2. Hizmet Tespiti
  const matchedService = SERVICES.find((s) => {
    const serviceSlug = s.slug;
    const rootWord = s.slug.split('-')[0]; // örn: guvenlik, temizlik, teknik, peyzaj, havuz, hasere, hukuk
    const serviceName = s.name.toLowerCase();
    return (
      rawPath.includes(serviceSlug) ||
      rawPath.includes(rootWord) ||
      rawPath.includes(serviceName) ||
      s.keywords.some((k) => rawPath.includes(k.toLowerCase()))
    );
  });

  // 3. İlçe + Hizmet Eşleşmesi
  if (matchedDistrict && matchedService) {
    return {
      hasMatch: true,
      targetPath: `/bolgeler/${matchedDistrict.slug}/${matchedService.slug}`,
      matchType: 'DISTRICT_SERVICE',
      confidence: 0.95,
    };
  }

  // 4. Sadece İlçe Eşleşmesi (Doğrudan Tesis Yönetimi Merkezine)
  if (matchedDistrict) {
    return {
      hasMatch: true,
      targetPath: `/bolgeler/${matchedDistrict.slug}/tesis-yonetimi`,
      matchType: 'DISTRICT_FACILITY',
      confidence: 0.90,
    };
  }

  // 5. Sektörel Çözüm Eşleşmesi
  const matchedSector = SECTORAL_SLUGS.find((sec) => rawPath.includes(sec) || rawPath.includes(sec.split('-')[0]));
  if (matchedSector) {
    return {
      hasMatch: true,
      targetPath: `/sektorel-cozumler/${matchedSector}`,
      matchType: 'SECTORAL_SOLUTION',
      confidence: 0.92,
    };
  }

  // 6. Hizmet Eşleşmesi
  if (matchedService) {
    return {
      hasMatch: true,
      targetPath: matchedService.pillar,
      matchType: 'DISTRICT_SERVICE',
      confidence: 0.88,
    };
  }

  // 7. Genel "Tesis Yönetimi" veya "Yönetim" anahtar kelimeleri
  if (rawPath.includes('tesis') || rawPath.includes('yonetim') || rawPath.includes('apartman') || rawPath.includes('site')) {
    return {
      hasMatch: true,
      targetPath: '/hizmetler/tesis-yonetimi',
      matchType: 'FLAGSHIP_FACILITY',
      confidence: 0.85,
    };
  }

  return {
    hasMatch: false,
    targetPath: '/hizmetler/tesis-yonetimi',
    matchType: 'FLAGSHIP_FACILITY',
    confidence: 0.50,
  };
}

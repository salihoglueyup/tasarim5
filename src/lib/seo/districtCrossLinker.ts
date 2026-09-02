import { DISTRICTS, getDistrict } from '@/data/districts';

export interface DistrictCrossLink {
  slug: string;
  name: string;
  href: string;
  anchorText: string;
  side: 'Anadolu' | 'Avrupa';
}

/**
 * İstanbul 39 İlçe Coğrafi Komşuluk Haritası (Faz 145)
 */
const DISTRICT_ADJACENCY_MAP: Record<string, string[]> = {
  kadikoy: ['atasehir', 'uskudar', 'maltepe'],
  atasehir: ['kadikoy', 'umraniye', 'sancaktepe', 'maltepe'],
  uskudar: ['kadikoy', 'umraniye', 'beykoz'],
  umraniye: ['atasehir', 'uskudar', 'cekmekoy', 'sancaktepe', 'beykoz'],
  maltepe: ['kadikoy', 'kartal', 'atasehir', 'sancaktepe'],
  kartal: ['maltepe', 'pendik', 'sultanbeyli', 'sancaktepe'],
  pendik: ['kartal', 'tuzla', 'sultanbeyli', 'sile'],
  tuzla: ['pendik'],
  beykoz: ['uskudar', 'umraniye', 'cekmekoy', 'sile'],
  cekmekoy: ['umraniye', 'sancaktepe', 'sile', 'beykoz'],
  sancaktepe: ['atasehir', 'cekmekoy', 'sultanbeyli', 'kartal', 'maltepe'],
  sultanbeyli: ['sancaktepe', 'kartal', 'pendik'],
  sile: ['beykoz', 'cekmekoy', 'pendik'],
  adalar: ['kadikoy', 'maltepe', 'kartal'],
  besiktas: ['sisli', 'sariyer', 'beyoglu'],
  sisli: ['besiktas', 'kagithane', 'beyoglu', 'eyupsultan'],
  sariyer: ['besiktas', 'sisli', 'eyupsultan'],
  beyoglu: ['besiktas', 'sisli', 'fatih', 'kagithane'],
  fatih: ['zeytinburnu', 'eyupsultan', 'beyoglu'],
  zeytinburnu: ['fatih', 'bakirkoy', 'güngoren', 'bayrampasa', 'eyupsultan'],
  bakirkoy: ['bahcelievler', 'kucukcekmece', 'zeytinburnu', 'güngoren'],
  bahcelievler: ['bakirkoy', 'bagcilar', 'güngoren', 'kucukcekmece'],
  güngoren: ['zeytinburnu', 'bahcelievler', 'bagcilar', 'esenler'],
  bagcilar: ['bahcelievler', 'kucukcekmece', 'basaksehir', 'esenler', 'güngoren'],
  kucukcekmece: ['bakirkoy', 'bahcelievler', 'bagcilar', 'basaksehir', 'avcilar'],
  avcilar: ['kucukcekmece', 'esenyurt', 'beylikduzu', 'basaksehir'],
  beylikduzu: ['avcilar', 'esenyurt', 'buyukcekmece'],
  esenyurt: ['beylikduzu', 'avcilar', 'buyukcekmece', 'basaksehir', 'arnavutkoy'],
  buyukcekmece: ['beylikduzu', 'esenyurt', 'catalca', 'silivri', 'arnavutkoy'],
  basaksehir: ['kucukcekmece', 'bagcilar', 'esenler', 'sultangazi', 'arnavutkoy', 'esenyurt'],
  esenler: ['bagcilar', 'güngoren', 'bayrampasa', 'sultangazi', 'basaksehir'],
  bayrampasa: ['zeytinburnu', 'fatih', 'eyupsultan', 'gaziosmanpasa', 'esenler'],
  eyupsultan: ['fatih', 'beyoglu', 'sisli', 'sariyer', 'kagithane', 'gaziosmanpasa', 'sultangazi', 'arnavutkoy'],
  gaziosmanpasa: ['eyupsultan', 'bayrampasa', 'sultangazi', 'esenler'],
  sultangazi: ['gaziosmanpasa', 'eyupsultan', 'basaksehir', 'esenler', 'arnavutkoy'],
  kagithane: ['sisli', 'beyoglu', 'eyupsultan'],
  arnavutkoy: ['basaksehir', 'esenyurt', 'buyukcekmece', 'catalca', 'eyupsultan', 'sultangazi'],
  catalca: ['buyukcekmece', 'silivri', 'arnavutkoy'],
  silivri: ['buyukcekmece', 'catalca'],
};

/**
 * Belirli bir ilçe için coğrafi olarak en yakın komşu ilçe sayfalarını ve iç linklerini üretir.
 */
export function getNeighborDistrictLinks(currentSlug: string, lang = 'tr'): DistrictCrossLink[] {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const current = getDistrict(currentSlug);
  const neighborSlugs = DISTRICT_ADJACENCY_MAP[currentSlug] || [];

  let matchedDistricts = neighborSlugs
    .map((slug) => getDistrict(slug))
    .filter(Boolean) as typeof DISTRICTS;

  // Eğer eşleşme az ise aynı yakadaki popüler ilçelerden tamamla
  if (matchedDistricts.length < 3 && current) {
    const sameSideDistricts = DISTRICTS.filter(
      (d) => d.side === current.side && d.slug !== currentSlug && !neighborSlugs.includes(d.slug)
    );
    matchedDistricts = [...matchedDistricts, ...sameSideDistricts.slice(0, 3 - matchedDistricts.length)];
  }

  return matchedDistricts.slice(0, 4).map((d) => ({
    slug: d.slug,
    name: d.name,
    href: `${langPrefix}/bolgeler/${d.slug}/tesis-yonetimi`,
    anchorText: `${d.name} Tesis Yönetimi`,
    side: d.side,
  }));
}

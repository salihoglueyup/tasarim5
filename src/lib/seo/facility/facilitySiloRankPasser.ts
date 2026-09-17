import { BASE_URL } from '@/lib/seo';
import { DISTRICTS, District } from '@/data/districts';

export interface SiloNode {
  title: string;
  slug: string;
  url: string;
  type: 'pillar_hub' | 'sub_sector' | 'district_spoke';
  rankWeight: number; // 0.1 - 1.0 (PageRank akış ağırlığı)
}

export interface SiloHierarchyReport {
  parentHub: SiloNode;
  currentSubSector?: SiloNode;
  siblingSubSectors: SiloNode[];
  connectedDistricts: SiloNode[];
  breadcrumbJsonLd: {
    '@context': string;
    '@type': string;
    itemListElement: Array<{
      '@type': string;
      position: number;
      name: string;
      item: string;
    }>;
  };
  totalSiloPageRankScore: number;
}

export const FACILITY_SUB_SECTORS: Array<{
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
  keywords: string[];
}> = [
  {
    slug: 'rezidans-site-yonetimi',
    name: 'Rezidans & Lüks Site Yönetimi',
    shortDesc: '7/24 Concierge, VIP güvenlik ve lüks mülk operasyonları.',
    icon: 'apartment',
    keywords: ['rezidans yönetimi', 'lüks site yönetimi', 'concierge'],
  },
  {
    slug: 'plaza-yonetimi',
    name: 'Plaza & Ofis Binası Yönetimi',
    shortDesc: 'HVAC otomasyonu, iş merkezi işletmesi ve enerji verimliliği.',
    icon: 'business',
    keywords: ['plaza yönetimi', 'iş merkezi yönetimi', 'ofis kuleleri'],
  },
  {
    slug: 'toplu-konut-yonetimi',
    name: 'Toplu Konut & TOKİ Yönetimi',
    shortDesc: '%25-33 aidat tasarrufu, KMK uyumlu toplu yapı idaresi.',
    icon: 'domain',
    keywords: ['toplu konut yönetimi', 'toki site yönetimi', 'kitlesel konut'],
  },
  {
    slug: 'sanayi-tesisi-yonetimi',
    name: 'Sanayi Tesisi & Fabrika Yönetimi',
    shortDesc: 'ISO 45001 ağır teknik bakım, yangın ve lojistik merkez yönetimi.',
    icon: 'factory',
    keywords: ['sanayi tesisi yönetimi', 'fabrika bakımı', 'lojistik tesis'],
  },
  {
    slug: 'rehber',
    name: 'Tesis Yönetimi Seçim Rehberi',
    shortDesc: 'Doğru yönetim şirketi seçimi, sözleşme maddeleri ve SLA kriterleri.',
    icon: 'menu_book',
    keywords: ['tesis yönetimi rehberi', 'yönetici seçimi', 'şartname'],
  },
];

/**
 * Tesis ve Mülk Hizmetleri Silo İçi Hiyerarşik PageRank & Breadcrumb Dağıtıcısı.
 * 
 * Google ve arama motoru botlarının site içindeki PageRank otoritesini ana Tesis Yönetimi
 * hub sayfasından 5 alt sektöre ve 39 ilçe sayfasına kusursuz aktarmasını sağlar.
 */
export function resolveFacilitySiloHierarchy(
  currentSubSectorSlug?: string,
  lang = 'tr'
): SiloHierarchyReport {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const parentHubUrl = `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`;

  const parentHub: SiloNode = {
    title: 'Tesis ve Mülk Yönetimi (Ana Hub)',
    slug: 'tesis-yonetimi',
    url: parentHubUrl,
    type: 'pillar_hub',
    rankWeight: 1.0,
  };

  let currentSubSector: SiloNode | undefined = undefined;
  const siblingSubSectors: SiloNode[] = [];

  for (const sub of FACILITY_SUB_SECTORS) {
    const node: SiloNode = {
      title: sub.name,
      slug: sub.slug,
      url: `${parentHubUrl}/${sub.slug}`,
      type: 'sub_sector',
      rankWeight: 0.85,
    };

    if (currentSubSectorSlug && sub.slug === currentSubSectorSlug) {
      currentSubSector = node;
    } else {
      siblingSubSectors.push(node);
    }
  }

  const connectedDistricts: SiloNode[] = DISTRICTS.map((d: District) => ({
    title: `${d.name} Tesis Yönetimi`,
    slug: d.slug,
    url: `${BASE_URL}${langPrefix}/bolgeler/${d.slug}/tesis-yonetimi`,
    type: 'district_spoke',
    rankWeight: 0.7,
  }));

  // Hiyerarşik BreadcrumbList JSON-LD
  const breadcrumbElements = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Anasayfa',
      item: `${BASE_URL}${langPrefix}`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Hizmetler',
      item: `${BASE_URL}${langPrefix}/hizmetler`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Tesis Yönetimi',
      item: parentHubUrl,
    },
  ];

  if (currentSubSector) {
    breadcrumbElements.push({
      '@type': 'ListItem',
      position: 4,
      name: currentSubSector.title,
      item: currentSubSector.url,
    });
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbElements,
  };

  // Toplam Silo PageRank Ağırlığı Puanı
  const totalSiloPageRankScore = Math.round(
    parentHub.rankWeight * 30 +
      siblingSubSectors.length * 10 +
      connectedDistricts.length * 0.5
  );

  return {
    parentHub,
    currentSubSector,
    siblingSubSectors,
    connectedDistricts,
    breadcrumbJsonLd,
    totalSiloPageRankScore,
  };
}

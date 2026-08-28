import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';

export interface SemanticLinkNode {
  title: string;
  url: string;
  anchorText: string;
  rel?: string;
  description: string;
  category: 'flagship' | 'subsector' | 'district' | 'legal_guide' | 'blog_cluster';
}

export interface FacilityMeshGraph {
  currentUrl: string;
  flagshipHub: SemanticLinkNode;
  subSectors: SemanticLinkNode[];
  priorityDistricts: SemanticLinkNode[];
  authoritativeLegalGuides: SemanticLinkNode[];
  totalConnectedNodesCount: number;
}

/**
 * Tesis Yönetimi Dinamik İç Bağlantı (Internal Mesh Linker) ve PageRank Dağıtım Motoru.
 * 
 * Google botlarının site içi tarama bütçesini (Crawl Budget) maksimize eder,
 * yetim (orphan) sayfa oluşumunu engeller ve alt sayfaların otoritesini
 * amiral gemisi olan `/hizmetler/tesis-yonetimi` sayfasına akıtır (PageRank Passer).
 */
export function generateFacilityMeshLinks(currentPath: string = '/hizmetler/tesis-yonetimi', lang: string = 'tr'): FacilityMeshGraph {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const currentUrl = `${BASE_URL}${langPrefix}${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;

  const flagshipHub: SemanticLinkNode = {
    title: 'Alo Yönetim — Profesyonel Tesis Yönetimi Amiral Gemisi',
    url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`,
    anchorText: 'İstanbul Profesyonel Tesis Yönetimi ve Entegre Tesis İşletmeciliği',
    description: 'ISO 41001 standartlarında 39 ilçede tam kapsamlı tesis, apartman, site ve plaza yönetimi.',
    category: 'flagship',
  };

  const subSectors: SemanticLinkNode[] = [
    {
      title: 'Rezidans ve Lüks Site Yönetimi',
      url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`,
      anchorText: 'Rezidans & Lüks Site Tesis Yönetimi Çözümleri',
      description: 'Konsiyerj, 5188 güvenlik ve dijital aidat muhasebesi entegrasyonu.',
      category: 'subsector',
    },
    {
      title: 'Plaza ve İş Merkezi Yönetimi',
      url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
      anchorText: 'A+ Plaza ve Ticari İş Merkezi Tesis Yönetimi',
      description: 'HVAC otomasyonu, yangın güvenliği ve kurumsal enerji tasarrufu.',
      category: 'subsector',
    },
    {
      title: 'Toplu Konut ve Uydu Kent Yönetimi',
      url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`,
      anchorText: 'Toplu Konut ve Mega Site İşletme Yönetimi',
      description: 'KMK 66-74 toplu yapı bütçe konsolidasyonu ve geniş yeşil alan bakımı.',
      category: 'subsector',
    },
    {
      title: 'Sanayi Sitesi ve OSB Yönetimi',
      url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`,
      anchorText: 'Sanayi Sitesi, Lojistik Depo ve OSB Tesis Yönetimi',
      description: 'Ağır vasıta lojistik akışı, yüksek gerilim trafo ve atık yönetimi.',
      category: 'subsector',
    },
    {
      title: 'Kat Mülkiyeti ve Tesis Yönetimi Rehberi',
      url: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rehber`,
      anchorText: '634 Sayılı KMK Tesis Yönetimi Hukuki Rehberi',
      description: 'İşletme projesi hazırlama, itiraz süreçleri ve yönetici ibra protokolleri.',
      category: 'legal_guide',
    },
  ];

  // En yüksek arama hacimli 8 stratejik odak ilçe
  const focusDistrictSlugs = ['kadikoy', 'besiktas', 'sariyer', 'sisli', 'bakirkoy', 'uskudar', 'basaksehir', 'atasehir'];
  const priorityDistricts: SemanticLinkNode[] = DISTRICTS
    .filter(d => focusDistrictSlugs.includes(d.slug))
    .map(d => ({
      title: `${d.name} Tesis Yönetimi Hizmetleri`,
      url: `${BASE_URL}${langPrefix}/bolgeler/${d.slug}/tesis-yonetimi`,
      anchorText: `${d.name} Profesyonel Tesis ve Site Yönetimi`,
      description: `${d.name} ilçesinde yerel ihtiyaçlara özel 5188 güvenlik ve aidat optimizasyonu.`,
      category: 'district',
    }));

  const authoritativeLegalGuides: SemanticLinkNode[] = [
    {
      title: 'Aidat Hesaplayıcı ve KMK Bütçe Simülasyonu',
      url: `${BASE_URL}${langPrefix}/hesaplayici`,
      anchorText: 'Online Tesis & Site Aidat Bütçesi Hesaplama Aracı',
      description: 'KMK 634 standartlarında tahmini işletme bütçesi ve %30 tasarruf simülasyonu.',
      category: 'legal_guide',
    },
    {
      title: 'Tesis Yönetimi Terimler Sözlüğü',
      url: `${BASE_URL}${langPrefix}/sozluk`,
      anchorText: 'Kat Mülkiyeti & Tesis Yönetimi Hukuki Terimler Sözlüğü',
      description: 'Arsa payı, şerefiye, avans bütçesi, denetim kurulu ve işletme projesi kavramları.',
      category: 'legal_guide',
    },
    {
      title: 'Başarı Hikayeleri ve Vaka Analizleri',
      url: `${BASE_URL}${langPrefix}/basari-hikayeleri`,
      anchorText: 'Alo Yönetim Tesis Yönetimi Başarı Hikayeleri ve KPI Sonuçları',
      description: '%35 maliyet tasarrufu sağlanan gerçek site ve plaza yönetim vaka çalışmaları.',
      category: 'blog_cluster',
    },
  ];

  const totalConnectedNodesCount = 1 + subSectors.length + priorityDistricts.length + authoritativeLegalGuides.length;

  return {
    currentUrl,
    flagshipHub,
    subSectors,
    priorityDistricts,
    authoritativeLegalGuides,
    totalConnectedNodesCount,
  };
}

/**
 * 39 İstanbul İlçesi Coğrafi Komşuluk Grafı (Geographic Mesh Linker)
 */
export function getAdjacentDistricts(slug: string): string[] {
  const ADJACENCY_MAP: Record<string, string[]> = {
    kadikoy: ['uskudar', 'atasehir', 'maltepe'],
    besiktas: ['sisli', 'sariyer', 'beyoglu'],
    sisli: ['besiktas', 'kagithane', 'beyoglu', 'eyupsultan'],
    bakirkoy: ['bahcelievler', 'zeytinburnu', 'kucukcekmece'],
    atasehir: ['kadikoy', 'umraniye', 'maltepe', 'sancaktepe'],
    uskudar: ['kadikoy', 'umraniye', 'beykoz'],
    maltepe: ['kadikoy', 'kartal', 'atasehir'],
    kartal: ['maltepe', 'pendik', 'sultanbeyli', 'sancaktepe'],
    pendik: ['kartal', 'tuzla', 'sultanbeyli', 'sile'],
    tuzla: ['pendik', 'gebze'],
    basaksehir: ['kucukcekmece', 'bagcilar', 'esenyurt', 'arnavutkoy', 'sultangazi'],
    beylikduzu: ['esenyurt', 'buyukcekmece', 'avcilar'],
    sariyer: ['besiktas', 'eyupsultan', 'sisli'],
    umraniye: ['uskudar', 'atasehir', 'cekmekoy', 'sancaktepe', 'beykoz'],
    avcilar: ['kucukcekmece', 'beylikduzu', 'esenyurt'],
    esenyurt: ['beylikduzu', 'avcilar', 'basaksehir', 'buyukcekmece'],
    bagcilar: ['bahcelievler', 'gungoren', 'kucukcekmece', 'basaksehir'],
    bahcelievler: ['bakirkoy', 'bagcilar', 'gungoren', 'kucukcekmece'],
    zeytinburnu: ['bakirkoy', 'fatih', 'eyupsultan', 'gungoren'],
    fatih: ['zeytinburnu', 'eyupsultan', 'beyoglu'],
    beyoglu: ['sisli', 'besiktas', 'fatih', 'kagithane'],
    kagithane: ['sisli', 'beyoglu', 'eyupsultan', 'sariyer'],
    eyupsultan: ['sariyer', 'gaziosmanpasa', 'fatih', 'sisli'],
    gaziosmanpasa: ['eyupsultan', 'bayrampasa', 'sultangazi', 'esenler'],
    bayrampasa: ['fatih', 'eyupsultan', 'zeytinburnu', 'gaziosmanpasa'],
    esenler: ['bagcilar', 'gungoren', 'gaziosmanpasa', 'bayrampasa'],
    gungoren: ['zeytinburnu', 'bakirkoy', 'bahcelievler', 'bagcilar'],
    sultangazi: ['gaziosmanpasa', 'eyupsultan', 'basaksehir'],
    sancaktepe: ['umraniye', 'atasehir', 'cekmekoy', 'kartal', 'sultanbeyli'],
    sultanbeyli: ['kartal', 'pendik', 'sancaktepe'],
    cekmekoy: ['umraniye', 'sancaktepe', 'beykoz', 'sile'],
    beykoz: ['uskudar', 'umraniye', 'cekmekoy', 'sile'],
    sile: ['beykoz', 'cekmekoy', 'pendik'],
    adalar: ['kadikoy', 'maltepe', 'kartal'],
    buyukcekmece: ['beylikduzu', 'esenyurt', 'catalca', 'silivri'],
    silivri: ['buyukcekmece', 'catalca'],
    catalca: ['silivri', 'buyukcekmece', 'arnavutkoy'],
    arnavutkoy: ['catalca', 'basaksehir', 'eyupsultan'],
  };

  return ADJACENCY_MAP[slug] || ['kadikoy', 'besiktas', 'bakirkoy'];
}

export function getAdjacentDistrictMeshLinks(currentDistrictSlug: string, lang: string = 'tr'): SemanticLinkNode[] {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const adjacentSlugs = getAdjacentDistricts(currentDistrictSlug);

  return DISTRICTS
    .filter(d => adjacentSlugs.includes(d.slug))
    .map(d => ({
      title: `${d.name} Tesis ve Site Yönetimi`,
      url: `${BASE_URL}${langPrefix}/bolgeler/${d.slug}/tesis-yonetimi`,
      anchorText: `${d.name} Tesis Yönetimi`,
      description: `${d.name} bölgesinde 5188 güvenlik, teknik bakım ve aidat tahsilatı.`,
      category: 'district' as const,
    }));
}

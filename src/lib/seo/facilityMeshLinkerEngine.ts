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

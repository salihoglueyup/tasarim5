import { BASE_URL } from '@/lib/seo';

export interface CrossServiceLink {
  title: string;
  url: string;
  badge: string;
  description: string;
  anchorText: string;
}

export const CROSS_SERVICE_MAPPINGS: Record<string, CrossServiceLink[]> = {
  'guvenlik-yonetimi': [
    {
      title: 'Entegre Tesis ve Mülk Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Amiral Gemisi',
      description: 'Güvenlik hizmetlerimizi entegre teknik bakım ve profesyonel temizlik ile birleştirin.',
      anchorText: 'Tesis ve Mülk Yönetimi Çözümleri',
    },
    {
      title: 'Rezidans & Lüks Site Yönetimi',
      url: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
      badge: 'VIP Çözüm',
      description: '7/24 Concierge, VIP güvenlik ve lobi karşılama entegrasyonu.',
      anchorText: 'Rezidans Tesis & Güvenlik Yönetimi',
    },
    {
      title: 'Sanayi Tesisi & Fabrika Güvenliği',
      url: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
      badge: 'Endüstriyel',
      description: 'ISO 45001 iş güvenliği ve perimetre güvenlik protokolleri.',
      anchorText: 'Sanayi Tesisi Yönetimi',
    },
  ],
  'teknik-bakim': [
    {
      title: 'Entegre Tesis Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Tek Merkez',
      description: 'Asansör, jeneratör ve HVAC sistemlerini tek merkezden yöneterek %30 tasarruf sağlayın.',
      anchorText: 'Entegre Tesis Yönetimi',
    },
    {
      title: 'Plaza & Ofis Binası İşletmeciliği',
      url: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
      badge: 'Kurumsal',
      description: 'Merkezi iklimlendirme ve otomasyon optimizasyonu.',
      anchorText: 'Plaza Tesis Yönetimi',
    },
  ],
  'temizlik-ve-hijyen': [
    {
      title: 'Tesis ve Mülk Hizmetleri',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Entegre',
      description: 'Ortak alan hijyeni ve endüstriyel zemin bakımını tesis işletmesiyle tek sözleşmede toplayın.',
      anchorText: 'Tesis ve Mülk Hizmetleri',
    },
    {
      title: 'Toplu Konut & Site Hijyen Yönetimi',
      url: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
      badge: 'Kitlesel Konut',
      description: 'Çok bloklu sitelerde blok içi temizlik ve çöp toplama yönetimi.',
      anchorText: 'Toplu Konut Site Yönetimi',
    },
  ],
  'aidat-takibi': [
    {
      title: 'Profesyonel Tesis Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'KMK 37 Bütçe',
      description: 'Yıllık işletme projesi ve şeffaf bütçe yönetimi ile aidatlarda %30 net tasarruf.',
      anchorText: 'Profesyonel Tesis Yönetimi',
    },
    {
      title: 'Tesis Yönetim Şirketi Seçim Rehberi',
      url: '/hizmetler/tesis-yonetimi/rehber',
      badge: 'Rehber',
      description: 'Doğru yönetim şirketi ve aidat muhasebesi seçim kriterleri.',
      anchorText: 'Tesis Yönetimi Rehberi',
    },
  ],
};

/**
 * Hizmet sayfalarında ilgili Tesis Yönetimi alt sektörlerine giden çapraz iç bağlantıları döner.
 */
export function getCrossServiceLinks(serviceSlug: string, lang = 'tr'): CrossServiceLink[] {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const links = CROSS_SERVICE_MAPPINGS[serviceSlug] || [
    {
      title: 'Entegre Tesis ve Mülk Yönetimi',
      url: `${langPrefix}/hizmetler/tesis-yonetimi`,
      badge: 'Ana Hizmet',
      description: 'Tüm bina ve site operasyonlarını tek merkezden profesyonelce yönetin.',
      anchorText: 'Tesis ve Mülk Hizmetleri',
    },
  ];

  return links.map((l) => ({
    ...l,
    url: `${langPrefix}${l.url.startsWith('/') ? l.url : `/${l.url}`}`,
  }));
}

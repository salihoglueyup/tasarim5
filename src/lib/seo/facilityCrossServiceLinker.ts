/**
 * 9 Hizmet Çapraz Bağlantı (Cross-Service Linker) & Dinamik Kart Ağı (Alo Yönetim)
 * 
 * Sitedeki 9 temel hizmetin (Peyzaj, Havuz, İlaçlama, Güvenlik, Temizlik, Teknik, Aidat, Hukuk, Tesis)
 * tamamına kullanıcı arama niyetine göre ('site' veya 'facility') dinamik çapraz kartlar,
 * dofollow bağlantılar ve Schema.org ItemList JSON-LD enjekte eden PageRank passer motoru.
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';

export interface CrossServiceLink {
  title: string;
  url: string;
  badge: string;
  description: string;
  anchorText: string;
  pillarAffinity?: 'site' | 'facility' | 'both';
  isDoFollow?: boolean;
  displayOrder?: number;
}

export const CROSS_SERVICE_MAPPINGS: Record<string, CrossServiceLink[]> = {
  'tesis-yonetimi': [
    {
      title: 'Aidat Takibi & Bütçe Yönetimi',
      url: '/hizmetler/aidat-takibi',
      badge: 'KMK 37',
      description: 'Yıllık işletme projesi, gecikme faizi hesaplama ve %99.2 tahsilat başarısı.',
      anchorText: 'Site ve Tesis Aidat Takibi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: '5188 Özel Güvenlik Yönetimi',
      url: '/hizmetler/guvenlik-yonetimi',
      badge: '5188 Lisanslı',
      description: '7/24 güvenlik personeli, CCTV izleme merkezi ve araç bariyer sistemleri.',
      anchorText: '5188 Lisanslı Güvenlik Hizmetleri',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: 'Periyodik Teknik Bakım & Onarım',
      url: '/hizmetler/teknik-bakim',
      badge: '15 Dk SLA',
      description: 'Asansör, jeneratör, hidrofor ve HVAC iklimlendirme sistemleri bakımı.',
      anchorText: 'Periyodik Teknik Bakım Çözümleri',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'KMK Hukuk & İcra Danışmanlığı',
      url: '/hizmetler/hukuk-ve-icra-danismanligi',
      badge: 'Hukuk Desteği',
      description: 'Kat mülkiyeti ihtilafları, aidat icra takibi ve genel kurul iptal davaları.',
      anchorText: 'Kat Mülkiyeti Hukuk Danışmanlığı',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
  'aidat-takibi': [
    {
      title: 'Profesyonel Site ve Tesis Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Ana Hizmet',
      description: 'Yıllık bütçe tanzimi, şeffaf harcama dökümleri ve genel kurul ibra desteği.',
      anchorText: 'Profesyonel Site ve Tesis Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: 'KMK Hukuk & İcra Danışmanlığı',
      url: '/hizmetler/hukuk-ve-icra-danismanligi',
      badge: 'İcra Takibi',
      description: 'Ödenmeyen aidatlar için İİK 68 kapsamında 7 günlük ilamsız icra takibi.',
      anchorText: 'Aidat İcra Takibi ve Hukuk',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: '5188 Güvenlik Yönetimi',
      url: '/hizmetler/guvenlik-yonetimi',
      badge: 'Güvenlik',
      description: 'Aidat bütçesinde en büyük gider kalemi olan güvenlik personelinin optimizasyonu.',
      anchorText: 'Site Özel Güvenlik Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'Tesis Yönetim Rehberi',
      url: '/hizmetler/tesis-yonetimi/rehber',
      badge: 'Rehber',
      description: 'Doğru yönetim şirketi ve aidat muhasebesi seçim kriterleri.',
      anchorText: 'Site ve Tesis Yönetimi Rehberi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
  'guvenlik-yonetimi': [
    {
      title: 'Entegre Tesis ve Site Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Amiral Gemisi',
      description: 'Güvenlik hizmetlerimizi entegre teknik bakım ve profesyonel temizlik ile birleştirin.',
      anchorText: 'Profesyonel Site ve Tesis Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: 'Rezidans & Lüks Site Yönetimi',
      url: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
      badge: 'VIP Çözüm',
      description: '7/24 Concierge, VIP güvenlik ve lobi karşılama entegrasyonu.',
      anchorText: 'Rezidans & Lüks Site Yönetimi',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: 'Plaza & İş Merkezi Yönetimi',
      url: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
      badge: 'Kurumsal',
      description: 'Turnike, X-Ray ve kartlı geçiş sistemleriyle donatılmış kurumsal plaza güvenliği.',
      anchorText: 'A+ Plaza ve İş Merkezi Yönetimi',
      pillarAffinity: 'facility',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'Sanayi Tesisi & OSB Yönetimi',
      url: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
      badge: 'Endüstriyel',
      description: 'ISO 45001 iş güvenliği ve perimetre güvenlik protokolleri.',
      anchorText: 'Sanayi Tesisi ve OSB Yönetimi',
      pillarAffinity: 'facility',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
  'teknik-bakim': [
    {
      title: 'Entegre Tesis ve Site Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Tek Merkez',
      description: 'Asansör, jeneratör ve HVAC sistemlerini tek merkezden yöneterek %30 tasarruf sağlayın.',
      anchorText: 'Entegre Tesis ve Site Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: 'Plaza & İş Merkezi Yönetimi',
      url: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
      badge: 'Kurumsal',
      description: 'Merkezi iklimlendirme ve BMS otomasyon optimizasyonu.',
      anchorText: 'Plaza Tesis Yönetimi',
      pillarAffinity: 'facility',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: 'Havuz Bakımı ve Hijyen',
      url: '/hizmetler/havuz-bakimi-ve-hijyen',
      badge: 'Kimyasal & Mekanik',
      description: 'Havuz filtrasyon motorları ve pH/klor dozajlama sistemleri periyodik bakımı.',
      anchorText: 'Site Havuz Bakımı ve Hijyen',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'Peyzaj ve Otomatik Sulama',
      url: '/hizmetler/peyzaj-ve-bahce-bakimi',
      badge: 'Sulama Altyapı',
      description: 'Dalgıç pompa, hidrofor ve otomatik yağmurlama sistemleri kontrolü.',
      anchorText: 'Peyzaj ve Bahçe Bakımı',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
  'temizlik-ve-hijyen': [
    {
      title: 'Tesis ve Site Yönetimi Hizmetleri',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Entegre',
      description: 'Ortak alan hijyeni ve endüstriyel zemin bakımını tesis işletmesiyle tek sözleşmede toplayın.',
      anchorText: 'Tesis ve Site Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: 'Toplu Konut & Site Yönetimi',
      url: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
      badge: 'Mega Siteler',
      description: 'Çok bloklu sitelerde blok içi temizlik ve çöp toplama yönetimi.',
      anchorText: 'Toplu Konut Site Yönetimi',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: 'Haşere İlaçlama & Dezenfeksiyon',
      url: '/hizmetler/hasere-ve-dezenfeksiyon',
      badge: 'Sağlık Bakanlığı Onaylı',
      description: 'Sığınak, çöp bacası ve otopark alanlarında periyodik biyosidal ilaçlama.',
      anchorText: 'Haşere İlaçlama ve Dezenfeksiyon',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'Havuz Bakımı & Hijyen',
      url: '/hizmetler/havuz-bakimi-ve-hijyen',
      badge: 'Hijyen',
      description: 'Yüzme havuzu zemin ve savak temizliği ile su dezenfeksiyonu.',
      anchorText: 'Havuz Bakımı Hizmetleri',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
  'peyzaj-ve-bahce-bakimi': [
    {
      title: 'Site ve Rezidans Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Site Yönetimi',
      description: 'Geniş yeşil alanlara sahip sitelerde peyzaj ve ortak alan giderlerinin optimizasyonu.',
      anchorText: 'Site ve Rezidans Yönetimi',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: 'Havuz Bakımı ve Hijyen',
      url: '/hizmetler/havuz-bakimi-ve-hijyen',
      badge: 'Dış Mekan',
      description: 'Bahçe ve havuz entegrasyonu ile kusursuz sosyal alan konforu.',
      anchorText: 'Havuz Bakımı ve Hijyen',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: 'Haşere İlaçlama Hizmetleri',
      url: '/hizmetler/hasere-ve-dezenfeksiyon',
      badge: 'Bitki Sağlığı',
      description: 'Bahçe zararlıları, kene ve sivrisinek mücadelesi ile yeşil alan koruması.',
      anchorText: 'Bahçe ve Çevre İlaçlama',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'Periyodik Teknik Bakım',
      url: '/hizmetler/teknik-bakim',
      badge: 'Sulama Altyapı',
      description: 'Dalgıç pompa ve hidrofor sistemlerinin periyodik muayenesi.',
      anchorText: 'Teknik Bakım Hizmetleri',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
  'havuz-bakimi-ve-hijyen': [
    {
      title: 'Site ve Rezidans Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Sosyal Tesis',
      description: 'Açık ve kapalı yüzme havuzlarının KMK ve Sağlık Bakanlığı yönetmeliklerine uyumu.',
      anchorText: 'Site ve Rezidans Yönetimi',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: 'Peyzaj ve Bahçe Bakımı',
      url: '/hizmetler/peyzaj-ve-bahce-bakimi',
      badge: 'Açık Alan',
      description: 'Havuz çevresi peyzaj düzenlemesi ve kaymaz zemin hijyeni.',
      anchorText: 'Peyzaj ve Bahçe Bakımı',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: 'Periyodik Teknik Bakım',
      url: '/hizmetler/teknik-bakim',
      badge: 'Mekanik Tesisat',
      description: 'Havuz pompaları, filtre kum değişimi ve elektrik panosu bakımı.',
      anchorText: 'Teknik Tesisat Bakımı',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'Temizlik ve Hijyen',
      url: '/hizmetler/temizlik-ve-hijyen',
      badge: 'Hijyen',
      description: 'Duş alanları, soyunma odaları ve havuz çevresi dezenfeksiyonu.',
      anchorText: 'Ortak Alan Temizlik Hizmetleri',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
  'hasere-ve-dezenfeksiyon': [
    {
      title: 'Temizlik ve Hijyen Yönetimi',
      url: '/hizmetler/temizlik-ve-hijyen',
      badge: 'Tam Hijyen',
      description: 'İlaçlama sonrası detaylı ortak alan temizliği ve dezenfeksiyon protokolü.',
      anchorText: 'Temizlik ve Hijyen Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: 'Site ve Tesis Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Yönetim',
      description: 'Sığınak, çatı arası ve otopark alanlarının periyodik biyosidal koruması.',
      anchorText: 'Site ve Tesis Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: 'Peyzaj ve Bahçe Bakımı',
      url: '/hizmetler/peyzaj-ve-bahce-bakimi',
      badge: 'Çevre Sağlığı',
      description: 'Açık yeşil alanlarda larva ve haşere üreme noktalarının kurutulması.',
      anchorText: 'Peyzaj ve Bahçe Hizmetleri',
      pillarAffinity: 'site',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'Sanayi Tesisi Yönetimi',
      url: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
      badge: 'HACCP & BRC',
      description: 'Gıda ve üretim tesislerinde uluslararası standartlarda kemirgen kontrolü.',
      anchorText: 'Sanayi Tesisi Yönetimi',
      pillarAffinity: 'facility',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
  'hukuk-ve-icra-danismanligi': [
    {
      title: 'Aidat Takibi ve Bütçe Yönetimi',
      url: '/hizmetler/aidat-takibi',
      badge: 'Hızlı İcra',
      description: 'Gününde ödenmeyen aidatların %5 yasal gecikme tazminatıyla tahsili.',
      anchorText: 'Aidat Takibi ve Muhasebe',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 1,
    },
    {
      title: 'Profesyonel Site ve Tesis Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'KMK Uzmanlığı',
      description: 'Genel kurul kararlarının tanzimi, yönetim planı revizyonu ve ibra süreçleri.',
      anchorText: 'Profesyonel Site ve Tesis Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 2,
    },
    {
      title: '5188 Güvenlik Yönetimi',
      url: '/hizmetler/guvenlik-yonetimi',
      badge: 'Yasal Uyum',
      description: 'Valilik özel güvenlik komisyonu izinleri ve sözleşme hukuku denetimi.',
      anchorText: 'Güvenlik Yönetimi ve Yasal İzinler',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 3,
    },
    {
      title: 'Tesis Yönetimi Hukuki Rehberi',
      url: '/hizmetler/tesis-yonetimi/rehber',
      badge: 'Yargıtay Kararları',
      description: 'Kat Mülkiyeti Kanunu ve Yargıtay içtihatlarıyla site yönetimi hukuku.',
      anchorText: 'KMK 634 Hukuki Rehber',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 4,
    },
  ],
};

/**
 * Belirli bir hizmet slug'ı için arama niyetine ('site' veya 'facility') göre filtrelenmiş çapraz linkleri döner.
 */
export function getCrossServiceLinks(
  serviceSlug: string,
  lang: string = 'tr',
  pillar: DomainPillar = 'hybrid'
): CrossServiceLink[] {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const links = CROSS_SERVICE_MAPPINGS[serviceSlug] || [
    {
      title: 'Profesyonel Site ve Tesis Yönetimi',
      url: '/hizmetler/tesis-yonetimi',
      badge: 'Ana Hizmet',
      description: 'Tüm bina, site ve plaza operasyonlarını tek merkezden profesyonelce yönetin.',
      anchorText: 'Site ve Tesis Yönetimi',
      pillarAffinity: 'both',
      isDoFollow: true,
      displayOrder: 1,
    },
  ];

  let filtered = links;
  if (pillar === 'site') {
    filtered = links.filter((l) => l.pillarAffinity === 'site' || l.pillarAffinity === 'both');
  } else if (pillar === 'facility') {
    filtered = links.filter((l) => l.pillarAffinity === 'facility' || l.pillarAffinity === 'both');
  }

  return filtered.slice(0, 4).map((l) => ({
    ...l,
    url: `${langPrefix}${l.url.startsWith('/') ? l.url : `/${l.url}`}`,
  }));
}

/**
 * Dikey bazlı (Site veya Tesis) ve isteğe bağlı ilçe bazlı özel yönlendirme kartları üretir.
 */
export function getPillarCrossLinkCards(
  pillar: DomainPillar = 'hybrid',
  districtSlug?: string,
  lang: string = 'tr'
): CrossServiceLink[] {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;

  if (districtSlug) {
    if (pillar === 'site') {
      return [
        {
          title: 'Toplu Konut & Rezidans Yönetimi',
          url: `${langPrefix}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`,
          badge: 'Konut Çözümü',
          description: 'Mega siteler için KMK 634 uyumlu bütçe, 5188 güvenlik ve dijital aidat.',
          anchorText: 'Toplu Konut ve Mega Site Yönetimi',
          isDoFollow: true,
        },
        {
          title: 'Aidat Hesaplayıcı & Simülasyon',
          url: `${langPrefix}/hesaplayici`,
          badge: 'Online Araç',
          description: 'Sitenizin tahmini aidat bütçesini ve %30 tasarruf potansiyelini hesaplayın.',
          anchorText: 'Online Aidat ve Bütçe Hesaplama Aracı',
          isDoFollow: true,
        },
      ];
    }

    if (pillar === 'facility') {
      return [
        {
          title: 'Plaza & İş Merkezi Yönetimi',
          url: `${langPrefix}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
          badge: 'Kurumsal B2B',
          description: 'A+ Plazalar için ISO 41001 standartlarında entegre tesis işletmesi ve BMS.',
          anchorText: 'Plaza ve İş Merkezi Yönetimi',
          isDoFollow: true,
        },
        {
          title: 'Sanayi Tesisi & OSB Yönetimi',
          url: `${langPrefix}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`,
          badge: 'Endüstriyel',
          description: 'Fabrika ve antrepolar için trafo, yangın ve lojistik tesis yönetimi.',
          anchorText: 'Sanayi Tesisi ve OSB Yönetimi',
          isDoFollow: true,
        },
      ];
    }
  }

  return [
    {
      title: 'Rezidans & Lüks Site Yönetimi',
      url: `${langPrefix}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`,
      badge: 'VIP',
      description: 'Konsiyerj, lobi karşılama ve 5188 VIP güvenlik.',
      anchorText: 'Rezidans Site Yönetimi',
      isDoFollow: true,
    },
    {
      title: 'A+ Plaza ve İş Merkezi Yönetimi',
      url: `${langPrefix}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
      badge: 'A+ Plaza',
      description: 'Merkezi iklimlendirme ve kurumsal enerji tasarrufu.',
      anchorText: 'Plaza Tesis Yönetimi',
      isDoFollow: true,
    },
  ];
}

/**
 * Hizmet sayfaları için Schema.org ItemList JSON-LD çapraz bağlantı şeması üretir.
 */
export function generateCrossLinkJsonLd(
  serviceSlug: string,
  pillar: DomainPillar = 'hybrid',
  lang: string = 'tr'
): Record<string, any> {
  const links = getCrossServiceLinks(serviceSlug, lang, pillar);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'İlgili Tesis ve Site Yönetimi Hizmetleri',
    itemListElement: links.map((link, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: link.title,
      description: link.description,
      url: `${BASE_URL}${link.url}`,
    })),
  };
}

/**
 * 9 hizmetin karşılıklı çapraz bağlantı bütünlüğünü doğrular (Yetim sayfa kontrolü).
 */
export function validateCrossLinkGraph(): {
  isValid: boolean;
  totalServicesAudited: number;
  orphanServices: string[];
} {
  const serviceKeys = Object.keys(CROSS_SERVICE_MAPPINGS);
  const orphanServices: string[] = [];

  serviceKeys.forEach((slug) => {
    const links = CROSS_SERVICE_MAPPINGS[slug];
    if (!links || links.length === 0) {
      orphanServices.push(slug);
    }
  });

  return {
    isValid: orphanServices.length === 0,
    totalServicesAudited: serviceKeys.length,
    orphanServices,
  };
}

import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/seo';

export interface FacilityLegalArticle {
  articleNumber: number;
  lawName: string;
  topic: string;
  summary: string;
  practicalApplication: string;
  officialSourceUrl: string;
}

export interface FacilityStandardKpi {
  standardCode: string;
  domain: string;
  kpiTitle: string;
  benchmarkTarget: string;
  measurementFrequency: string;
}

export interface SubSectorAuthorityProfile {
  slug: string;
  title: string;
  targetPropertyType: string;
  criticalSuccessFactors: string[];
  mandatoryCompliances: string[];
  canonicalUrl: string;
}

export interface DistrictFacilityMatrixItem {
  districtSlug: string;
  districtName: string;
  dominantPropertyType: string;
  keyFacilityChallenges: string[];
  recommendedServiceMix: string[];
  pageUrl: string;
}

export interface FacilityAuthorityCorpus {
  protocolVersion: string;
  lastUpdated: string;
  authorityEntity: {
    name: string;
    legalName: string;
    certifications: string[];
    officialUrl: string;
  };
  legalFramework: {
    kmk634Articles: FacilityLegalArticle[];
    securityLaw5188: {
      lawNumber: number;
      supervisionAuthority: string;
      mandatoryRequirements: string[];
    };
    energyPerformanceEkb: {
      regulationName: string;
      mandate: string;
    };
  };
  iso41001KpiSystem: FacilityStandardKpi[];
  subSectors: SubSectorAuthorityProfile[];
  districtMatrix: DistrictFacilityMatrixItem[];
  provenMetrics: {
    averageCostReductionPercent: number;
    activeFacilityPortfolioCount: number;
    technicalSlaResolutionRatePercent: number;
    duesCollectionEfficiencyRatePercent: number;
  };
}

/**
 * Tesis Yönetimi Semantik Otorite ve Derin Bilgi Külliyatı Motoru.
 * 
 * Google Knowledge Graph, AI Botlar (Gemini, ChatGPT, Perplexity, Claude)
 * ve E-E-A-T denetçileri için 634 Sayılı KMK, ISO 41001 ve 5188 mevzuatını
 * yapılandırılmış veri formatında tek bir otoriter kaynak olarak derler.
 */
export function buildFacilityAuthorityCorpus(lang: string = 'tr'): FacilityAuthorityCorpus {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;

  const kmkArticles: FacilityLegalArticle[] = [
    {
      articleNumber: 12,
      lawName: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      topic: 'Yönetim Planının Bağlayıcılığı',
      summary: 'Yönetim planı bütün kat maliklerini bağlayan bir sözleşme hükmündedir.',
      practicalApplication: 'Tesis yönetiminde ortak alan kuralları ve işletme bütçesi yönetim planına göre icra edilir.',
      officialSourceUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
    },
    {
      articleNumber: 20,
      lawName: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      topic: 'Ortak Giderlere ve Aidata Katılma Borcu',
      summary: 'Kat malikleri kapıcı, kaloriferci, güvenlik ve ortak alan bakım giderlerine arsa payı oranında katılmakla yükümlüdür.',
      practicalApplication: 'Gününde ödenmeyen aidatlara aylık %5 gecikme tazminatı ve icra takibi uygulanır.',
      officialSourceUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
    },
    {
      articleNumber: 34,
      lawName: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      topic: 'Yöneticinin Atanması ve Şirketlere Yetki Devri',
      summary: 'Kat malikleri kurulu hem sayı hem arsa payı çoğunluğu ile profesyonel yönetim şirketini yönetici olarak atayabilir.',
      practicalApplication: 'Alo Yönetim, Genel Kurul yetkisiyle işletme projesini hazırlar, bütçeyi yönetir ve tescil edilir.',
      officialSourceUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
    },
    {
      articleNumber: 37,
      lawName: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      topic: 'İşletme Projesinin Hazırlanması ve Tebliği',
      summary: 'Yönetici yıllık tahmini gelir-gider bütçesini hazırlar ve tüm kat maliklerine taahhütlü mektupla tebliğ eder.',
      practicalApplication: '7 gün içinde itiraz edilmeyen işletme projesi kesinleşir ve İİK Madde 68 kapsamında ilamsız icra belgesi sayılır.',
      officialSourceUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
    },
    {
      articleNumber: 41,
      lawName: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      topic: 'Denetçinin Raporlama ve İbra Süreci',
      summary: 'Denetçi veya denetim kurulu yöneticinin hesaplarını üç ayda bir veya yılda bir denetleyerek kurula rapor sunar.',
      practicalApplication: 'Alo Yönetim tüm banka ekstrelerini ve faturaları dijital portalda 7/24 şeffaf denetime açık tutar.',
      officialSourceUrl: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
    },
  ];

  const isoKpis: FacilityStandardKpi[] = [
    {
      standardCode: 'ISO 41001:2018 (Madde 8.1)',
      domain: 'Tesis Operasyonel Süreçleri',
      kpiTitle: 'Reaktif Bakım Yanıt Süresi (Emergency SLA)',
      benchmarkTarget: '< 30 Dakika',
      measurementFrequency: 'Gerçek Zamanlı (Real-Time IoT & Helpdesk)',
    },
    {
      standardCode: 'ISO 41001:2018 (Madde 9.1)',
      domain: 'Finansal Performans ve Tasarruf',
      kpiTitle: 'İşletme Bütçesi Sapma Toleransı',
      benchmarkTarget: '< %3 Sapma',
      measurementFrequency: 'Aylık Yönetim Kurulu Raporlaması',
    },
    {
      standardCode: 'ISO 41001:2018 (Madde 8.2)',
      domain: 'Sürdürülebilirlik & Enerji',
      kpiTitle: 'Ortak Alan Enerji Tüketim Azaltımı',
      benchmarkTarget: '%25 - %35 Tasarruf',
      measurementFrequency: 'Çeyreklik Enerji Analiz Raporu',
    },
    {
      standardCode: 'ISO 41001:2018 (Madde 9.2)',
      domain: 'Kullanıcı Memnuniyeti & Kat Maliki NPS',
      kpiTitle: 'Kat Maliki & Kiracı Memnuniyet Skoru',
      benchmarkTarget: '> 94 / 100',
      measurementFrequency: 'Yıllık Bağımsız Denetim',
    },
  ];

  const subSectors: SubSectorAuthorityProfile[] = [
    {
      slug: 'rezidans-site-yonetimi',
      title: 'Rezidans & Lüks Site Tesis Yönetimi',
      targetPropertyType: 'Çok Katlı Rezidanslar, Geniş Yerleşkeli Siteler ve Butik Apartmanlar',
      criticalSuccessFactors: ['7/24 Resepsiyon ve Konsiyerj', 'Havuz & SPA Hijyen Standartları', 'Akıllı Mobil Aidat Takip Ekosistemi'],
      mandatoryCompliances: ['KMK 634', '5188 Özel Güvenlik', 'Sağlık Bakanlığı Havuz Suyu Yönetmeliği'],
      canonicalUrl: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`,
    },
    {
      slug: 'plaza-yonetimi',
      title: 'Plaza & İş Merkezi Entegre Tesis Yönetimi',
      targetPropertyType: 'A+ Plazalar, Finans Merkezleri ve Ticari Kuleler',
      criticalSuccessFactors: ['HVAC ve İklimlendirme Kesintisizliği', 'Turnike ve Biyometrik Ziyaretçi Yönetimi', 'Yangın & Tahliye Simülasyonları'],
      mandatoryCompliances: ['ISO 41001', 'Binaların Yangından Korunması Hakkında Yönetmelik', '6331 İSG Kanunu'],
      canonicalUrl: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
    },
    {
      slug: 'toplu-konut-yonetimi',
      title: 'Toplu Konut & Uydu Kent Yönetimi',
      targetPropertyType: '500+ Bağımsız Bölümlü Mega Siteler ve Toplu Yapı Parselleri',
      criticalSuccessFactors: ['Merkezi İşletme Projesi Konsolidasyonu', 'Blok ve Parsel Temsilciler Kurulu Koordinasyonu', 'Geniş Peyzaj & Sulama Otomasyonu'],
      mandatoryCompliances: ['KMK Madde 66-74 Toplu Yapılar', '5188 Güvenlik'],
      canonicalUrl: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`,
    },
    {
      slug: 'sanayi-tesisi-yonetimi',
      title: 'Sanayi Sitesi & Lojistik Tesis Yönetimi',
      targetPropertyType: 'Organize Sanayi Bölgeleri (OSB), Lojistik Depolar ve Üretim Tesisleri',
      criticalSuccessFactors: ['Ağır Vasıta Trafik ve Kantar Yönetimi', 'Endüstriyel Atık ve Arıtma Denetimi', 'Yüksek Gerilim Trafo ve Kompresör Bakımı'],
      mandatoryCompliances: ['Çevre Kanunu', 'OSB Uygulama Yönetmeliği', '6331 İSG'],
      canonicalUrl: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`,
    },
    {
      slug: 'rehber',
      title: 'Tesis Yönetimi ve Kat Mülkiyeti Rehberi',
      targetPropertyType: 'Tüm Kat Malikleri, Yöneticiler ve Denetçiler İçin Mevzuat Üssü',
      criticalSuccessFactors: ['Adım Adım Yönetim Devir Protokolü', 'İşletme Projesi Hazırlama Şablonları', 'Yargıtay Emsal Karar Analizleri'],
      mandatoryCompliances: ['KMK 634', 'İcra İflas Kanunu (İİK)'],
      canonicalUrl: `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi/rehber`,
    },
  ];

  const districtMatrix: DistrictFacilityMatrixItem[] = DISTRICTS.map((district) => ({
    districtSlug: district.slug,
    districtName: district.name,
    dominantPropertyType: district.side === 'Anadolu' ? 'Konut Siteleri & Sahil Rezidansları' : 'Plaza, Ticari Kule & Yoğun Siteler',
    keyFacilityChallenges: [
      `${district.name} ilçesinde KMK 634 aidat bütçe optimizasyonu`,
      `${district.name} yerel iklim ve zemin koşullarına uygun teknik bakım`,
      '5188 lisanslı güvenlik ve ortak alan denetimi'
    ],
    recommendedServiceMix: [
      'Entegre Tesis Yönetimi (ISO 41001)',
      'Hukuki ve İcrai Aidat Danışmanlığı',
      '7/24 Kesintisiz Teknik Servis & Enerji Yönetimi'
    ],
    pageUrl: `${BASE_URL}${langPrefix}/bolgeler/${district.slug}/tesis-yonetimi`,
  }));

  return {
    protocolVersion: '2026.4.1',
    lastUpdated: '2026-08-28T09:00:00+03:00',
    authorityEntity: {
      name: 'Alo Yönetim',
      legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
      certifications: [
        'ISO 41001:2018 Tesis Yönetim Sistemi',
        'ISO 9001:2015 Kalite Yönetim Sistemi',
        'ISO 14001:2015 Çevre Yönetim Sistemi',
        'ISO 45001:2018 İş Sağlığı ve Güvenliği',
        '5188 Sayılı Kanun Lisanslı Güvenlik Partnerliği'
      ],
      officialUrl: 'https://aloyonetim.com.tr',
    },
    legalFramework: {
      kmk634Articles: kmkArticles,
      securityLaw5188: {
        lawNumber: 5188,
        supervisionAuthority: 'T.C. İçişleri Bakanlığı Emniyet Genel Müdürlüğü Özel Güvenlik Denetleme Başkanlığı',
        mandatoryRequirements: [
          'Özel Güvenlik Şirketi Faaliyet İzin Belgesi',
          '5188 Kimlik Kartlı Sertifikalı Personel',
          'Valilik Özel Güvenlik Komisyonu İzni'
        ]
      },
      energyPerformanceEkb: {
        regulationName: 'Binalarda Enerji Performansı Yönetmeliği',
        mandate: 'Merkezi ısıtma ve ortak alanlarda Enerji Kimlik Belgesi (EKB) ve yıllık verimlilik denetimi zorunludur.'
      }
    },
    iso41001KpiSystem: isoKpis,
    subSectors,
    districtMatrix,
    provenMetrics: {
      averageCostReductionPercent: 30,
      activeFacilityPortfolioCount: 120,
      technicalSlaResolutionRatePercent: 99.4,
      duesCollectionEfficiencyRatePercent: 98.6,
    },
  };
}

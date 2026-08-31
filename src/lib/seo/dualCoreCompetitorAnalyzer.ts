/**
 * Çift Çekirdekli Rakip Analiz & Boşluk Tespit Motoru (dualCoreCompetitorAnalyzer.ts)
 * 
 * İstanbul tesis ve site yönetimi pazarındaki rakiplerin SERP görünürlüklerini,
 * anahtar kelime boşluklarını (Keyword Gap), içerik kümesi eksikliklerini (Content Gap)
 * ve backlink fırsatlarını analiz ederek aksiyon planları üreten stratejik motor.
 * 
 * 500 Faz Master Planı — Bölüm J (Faz 196 - 235)
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';

/* =========================================================================
 * J1 — RAKİP PROFİL & VERİ MODELİ (Faz 196-208)
 * ========================================================================= */

export interface CompetitorProfile {
  id: string;
  domain: string;
  brandName: string;
  pillar: DomainPillar;
  estimatedTrafficMonthly: number;
  topKeywords: string[];
  contentGaps: string[];
  backlinkScore: number; // 0 - 100 Domain Rating
  strengthAreas: string[];
  weaknesses: string[];
}

export interface KeywordGapItem {
  keyword: string;
  monthlySearchVolume: number;
  competitorRank: number;
  ourRank?: number;
  difficultyScore: number; // 1 - 100
  opportunityScore: number; // Yüksek hacim + düşük zorluk
  intent: 'transactional' | 'commercial' | 'informational' | 'legal';
}

export interface ContentBrief {
  targetKeyword: string;
  pillar: DomainPillar;
  suggestedTitle: string;
  targetWordCount: number;
  searchIntent: string;
  requiredHeadings: string[];
  requiredSchemas: string[];
  recommendedInternalLinks: string[];
  callToAction: string;
}

export interface OutreachTarget {
  name: string;
  url: string;
  category: 'dernek' | 'medya' | 'oda' | 'universite' | 'sektorel';
  domainAuthority: number;
  outreachAngle: string;
}

/**
 * İstanbul Sektörel Rakip Veritabanı (10 Önemli Aktör)
 */
export const COMPETITOR_PROFILES: CompetitorProfile[] = [
  {
    id: 'iss-turkiye',
    domain: 'tr.issworld.com',
    brandName: 'ISS Türkiye',
    pillar: 'facility',
    estimatedTrafficMonthly: 65000,
    topKeywords: ['entegre tesis yönetimi', 'tesis yönetimi şirketleri', 'kurumsal temizlik'],
    contentGaps: ['ilçe bazlı mikro yerel sayfalar', 'online aidat hesaplayıcı', 'KMK hukuki blog'],
    backlinkScore: 78,
    strengthAreas: ['Global kurumsal marka', 'Havalimanı ve hastane referansları'],
    weaknesses: ['Konut sitelerine hizmet vermiyor', 'Yerel ilçe bazlı SEO zayıf'],
  },
  {
    id: 'sodexo-turkiye',
    domain: 'sodexo.com.tr',
    brandName: 'Sodexo Tesis Yönetimi',
    pillar: 'facility',
    estimatedTrafficMonthly: 45000,
    topKeywords: ['plaza tesis yönetimi', 'teknik işletim', 'endüstriyel yemek'],
    contentGaps: ['Site yönetimi çözümleri', 'KMK 634 soru-cevap bankası'],
    backlinkScore: 72,
    strengthAreas: ['Büyük kurumsal holding anlaşmaları'],
    weaknesses: ['Site ve apartman yönetimi yok', 'Programatik yerel sayfaları bulunmuyor'],
  },
  {
    id: 'tepe-servis',
    domain: 'tepeservis.com.tr',
    brandName: 'Tepe Servis ve Yönetim',
    pillar: 'facility',
    estimatedTrafficMonthly: 38000,
    topKeywords: ['özel güvenlik hizmetleri', 'tesis yönetimi istanbul', 'bina yönetimi'],
    contentGaps: ['Online aidat tahsilat sistemi', 'İlçe mahalle landing sayfaları'],
    backlinkScore: 68,
    strengthAreas: ['5188 güvenlik altyapısı', 'Bilkent Holding güvencesi'],
    weaknesses: ['Yüksek fiyatlandırma', 'Site yönetiminde sınırlı esneklik'],
  },
  {
    id: 'apyonis',
    domain: 'apyonis.com.tr',
    brandName: 'Apyonis Site Yönetimi',
    pillar: 'site',
    estimatedTrafficMonthly: 22000,
    topKeywords: ['profesyonel site yönetimi', 'apartman yönetimi istanbul', 'site aidat takibi'],
    contentGaps: ['ISO 41001 plaza yönetimi', 'BMS teknik otomasyon', 'İngilizce / Arapça çok dilli SEO'],
    backlinkScore: 48,
    strengthAreas: ['Konut sitelerinde bilinirlik'],
    weaknesses: ['Teknik bakım ekipleri taşeron', 'B2B plaza referansı az'],
  },
  {
    id: 'yonetimplatformu',
    domain: 'yonetimplatformu.com',
    brandName: 'Yönetim Platformu',
    pillar: 'site',
    estimatedTrafficMonthly: 15000,
    topKeywords: ['site yönetim firmaları', 'apartman yöneticiliği ücretleri'],
    contentGaps: ['Schema.org rich result', 'HowTo adım adım rehberler', 'İnteraktif hesap makineleri'],
    backlinkScore: 42,
    strengthAreas: ['SEO odaklı blog içerikleri'],
    weaknesses: ['Fiziki teknik servis kadrosu yok', 'Düşük E-E-A-T otoritesi'],
  },
  {
    id: 'bina-yonetim-merkezi',
    domain: 'binayonetimmerkezi.com',
    brandName: 'Bina Yönetim Merkezi',
    pillar: 'site',
    estimatedTrafficMonthly: 12000,
    topKeywords: ['kadıköy site yönetimi', 'beşiktaş apartman yönetimi'],
    contentGaps: ['39 ilçe kapsamı', 'Tesis yönetimi B2B', 'Sesli arama Speakable'],
    backlinkScore: 36,
    strengthAreas: ['Anadolu yakası yerel aramalar'],
    weaknesses: ['Avrupa yakasında yok', 'Modern yazılım altyapısı eksik'],
  },
];

/* =========================================================================
 * J2 — KEYWORD BOŞLUK & FIRSAT MOTORU (Faz 207-220)
 * ========================================================================= */

export const QUICK_WIN_KEYWORD_POOL: KeywordGapItem[] = [
  {
    keyword: 'site yönetim planı nasıl değiştirilir',
    monthlySearchVolume: 2400,
    competitorRank: 4,
    ourRank: undefined,
    difficultyScore: 22,
    opportunityScore: 88,
    intent: 'legal',
  },
  {
    keyword: 'aidat ödemeyen kiracıya ne yapılır',
    monthlySearchVolume: 3600,
    competitorRank: 6,
    ourRank: undefined,
    difficultyScore: 28,
    opportunityScore: 92,
    intent: 'legal',
  },
  {
    keyword: 'apartman aidat gecikme faizi hesaplama',
    monthlySearchVolume: 4800,
    competitorRank: 8,
    ourRank: undefined,
    difficultyScore: 18,
    opportunityScore: 96,
    intent: 'commercial',
  },
  {
    keyword: 'plaza tesis yönetim sözleşmesi örneği',
    monthlySearchVolume: 1200,
    competitorRank: 3,
    ourRank: undefined,
    difficultyScore: 30,
    opportunityScore: 78,
    intent: 'commercial',
  },
  {
    keyword: 'kadıköy profesyonel apartman yönetimi',
    monthlySearchVolume: 1800,
    competitorRank: 5,
    ourRank: undefined,
    difficultyScore: 25,
    opportunityScore: 85,
    intent: 'transactional',
  },
  {
    keyword: 'iso 41001 tesis yönetimi sertifikası nasıl alınır',
    monthlySearchVolume: 900,
    competitorRank: 2,
    ourRank: undefined,
    difficultyScore: 35,
    opportunityScore: 72,
    intent: 'informational',
  },
  {
    keyword: 'site yöneticisi karar defteri noter tasdiki',
    monthlySearchVolume: 1500,
    competitorRank: 7,
    ourRank: undefined,
    difficultyScore: 15,
    opportunityScore: 90,
    intent: 'legal',
  },
];

/**
 * Hızlı Kazanım (Quick-Win) Anahtar Kelimelerini döner.
 */
export function findQuickWinKeywords(pillar: DomainPillar = 'site'): KeywordGapItem[] {
  return rankKeywordsByOpportunityScore(
    QUICK_WIN_KEYWORD_POOL.filter((item) => {
      if (pillar === 'facility') {
        return item.keyword.includes('tesis') || item.keyword.includes('plaza') || item.keyword.includes('iso');
      }
      return !item.keyword.includes('plaza') && !item.keyword.includes('iso');
    })
  );
}

/**
 * Anahtar kelimeleri Fırsat Puanına göre azalan sırada sıralar.
 */
export function rankKeywordsByOpportunityScore(keywords: KeywordGapItem[]): KeywordGapItem[] {
  return [...keywords].sort((a, b) => b.opportunityScore - a.opportunityScore);
}

/**
 * Boşluk Anahtar Kelimesinden Otomatik İçerik Brifingi üretir.
 */
export function generateContentBriefFromGap(gapKeyword: string, pillar: DomainPillar = 'site'): ContentBrief {
  const isFacility = pillar === 'facility';
  const cleanTitle = gapKeyword.charAt(0).toUpperCase() + gapKeyword.slice(1);

  return {
    targetKeyword: gapKeyword,
    pillar,
    suggestedTitle: `${cleanTitle} (2026 Güncel Rehber & Yasal Süreç)`,
    targetWordCount: isFacility ? 2200 : 1600,
    searchIntent: gapKeyword.includes('hesap') ? 'commercial' : gapKeyword.includes('nasıl') ? 'informational' : 'transactional',
    requiredHeadings: [
      `1. ${cleanTitle} Temel Tanımı ve Önemi`,
      `2. ${isFacility ? 'ISO 41001 ve Kurumsal Standartlar' : '634 Sayılı KMK Yasal Çerçevesi'}`,
      '3. Adım Adım Uygulama ve Kontrol Listesi',
      '4. Sık Yapılan Hatalar ve Cezai Riskler',
      '5. Alo Yönetim Profesyonel Çözümleri',
    ],
    requiredSchemas: ['FAQPage', 'HowTo', 'Article', 'ProfessionalService'],
    recommendedInternalLinks: [
      `${BASE_URL}/hizmetler/aidat-takibi`,
      `${BASE_URL}/hizmetler/hukuk-danismanligi`,
      `${BASE_URL}/teklif-al`,
    ],
    callToAction: isFacility ? 'Plazanız için Ücretsiz Tesis Denetim Raporu Alın' : 'Siteniz İçin 30 Gün Ücretsiz Deneme Başlatın',
  };
}

/* =========================================================================
 * J3 — İÇERİK & SERP BOŞLUK MOTORU (Faz 216-235)
 * ========================================================================= */

/**
 * Rakip ID'ye göre içerik boşluk analizi yapar.
 */
export function analyzeContentGap(competitorId: string, pillar: DomainPillar = 'site'): string[] {
  const competitor = COMPETITOR_PROFILES.find((c) => c.id === competitorId);
  if (!competitor) {
    return [
      'KMK 634 Hukuk Blogu ve Yargıtay Kararları',
      '39 İlçe Mikro-Lokasyon Hizmet Sayfaları',
      'Online İnteraktif Aidat Hesaplayıcı',
      'ISO 41001 Tesis Yönetim Sertifikasyon Rehberi',
    ];
  }

  return competitor.contentGaps;
}

/**
 * Rakibi SERP'te geçmek için Kazandıran İçerik Şartnamesi (Winning Content Spec) üretir.
 */
export function buildWinningContentSpec(keyword: string, competitorUrl: string) {
  return {
    targetKeyword: keyword,
    targetCompetitorUrl: competitorUrl,
    minWordCount: 1850,
    requiredSchemas: ['FAQPage', 'HowTo', 'LocalBusiness', 'SpeakableSpecification'],
    lsiKeywordsRequired: [
      'kat mülkiyeti',
      'işletme projesi',
      'karar defteri',
      'aidat tahsilatı',
      '7/24 acil servis',
      'şeffaf muhasebe',
    ],
    mediaRequirements: {
      infographicsCount: 1,
      chartsCount: 1,
      faqItemsCount: 5,
    },
    targetSERPPosition: 1,
  };
}

/**
 * Sektörel Backlink Outreach Hedef Listesi döner.
 */
export function buildOutreachTargetList(pillar: DomainPillar = 'site'): OutreachTarget[] {
  return [
    {
      name: 'TRFMA Türkiye Tesis Yönetim Derneği',
      url: 'https://www.trfma.org.tr',
      category: 'dernek',
      domainAuthority: 54,
      outreachAngle: 'ISO 41001 tesis yönetimi vaka analizi ve sektörel makale yayımı.',
    },
    {
      name: 'Gayrimenkul ve Konut Gazetesi',
      url: 'https://www.emlakpencerem.com',
      category: 'medya',
      domainAuthority: 62,
      outreachAngle: '2026 İstanbul site aidat endeksi ve tasarruf oranları basın bülteni.',
    },
    {
      name: 'İstanbul Ticaret Odası (İTO)',
      url: 'https://www.ito.org.tr',
      category: 'oda',
      domainAuthority: 74,
      outreachAngle: 'Bina ve Tesis Hizmetleri Komitesi sektörel rapor katkısı.',
    },
    {
      name: 'Yıldız Teknik Üniversitesi Gayrimenkul Geliştirme',
      url: 'https://www.yildiz.edu.tr',
      category: 'universite',
      domainAuthority: 82,
      outreachAngle: 'Akıllı binalarda BMS enerji optimizasyonu akademik vaka çalışması.',
    },
  ];
}

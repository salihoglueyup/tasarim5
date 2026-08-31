/**
 * Çift Çekirdekli CRO & Dönüşüm Optimizasyonu Motoru (dualCoreCROEngine.ts)
 * 
 * Ziyaretçileri nitelikli müşterilere dönüştürmek için pillar-aware CTA tasarımları,
 * form optimizasyonu, lead puanlama (Lead Scoring), çok adımlı formlar,
 * A/B test protokolleri ve ROI hesaplayıcı şartnamelerini yöneten motor.
 * 
 * 500 Faz Master Planı — Bölüm M (Faz 306 - 350)
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';
import { CANONICAL_NAP } from './napGuardEngine';

/* =========================================================================
 * M1 — CTA & DÖNÜŞÜM YOLLARI (Faz 306-320)
 * ========================================================================= */

export interface CTASpec {
  pillar: DomainPillar;
  pageType: string;
  primaryCTA: {
    text: string;
    url: string;
    urgency: 'low' | 'medium' | 'high';
    ariaLabel?: string;
  };
  secondaryCTA?: {
    text: string;
    url: string;
    ariaLabel?: string;
  };
  socialProof?: string;
  guarantee?: string;
  urgencyTrigger?: string;
}

export interface PackageTier {
  id: string;
  name: string;
  pillar: DomainPillar;
  targetScale: string;
  monthlyFeeText: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

/**
 * Sayfa türü ve dikeyine göre en uygun CTA şartnamesini üretir.
 */
export function buildPrimaryCTASpec(pageType: string, pillar: DomainPillar = 'site'): CTASpec {
  const isFacility = pillar === 'facility';

  switch (pageType) {
    case 'home':
      return {
        pillar,
        pageType,
        primaryCTA: {
          text: isFacility ? 'Plazanız İçin Ücretsiz Denetim Raporu Alın' : 'Siteniz İçin 30 Gün Ücretsiz Teklif Alın',
          url: `${BASE_URL}/teklif-al`,
          urgency: 'high',
          ariaLabel: 'Ücretsiz yönetim teklifi alma formu',
        },
        secondaryCTA: {
          text: isFacility ? 'Hizmetlerimizi İnceleyin' : 'Online Aidat Hesaplayıcıyı Deneyin',
          url: isFacility ? `${BASE_URL}/tesis-yonetimi` : `${BASE_URL}/hesaplayici`,
        },
        socialProof: isFacility ? '1.200.000+ m² Yönetilen Plaza ve AVM Alanı' : '350+ Site, 28.000+ Dairede %99.2 Tahsilat Başarısı',
        guarantee: '30 gün içinde memnun kalmazsanız sözleşmeden hiçbir cezai şart olmadan ayrılma garantisi.',
        urgencyTrigger: 'Bu ay geçerli ilk ay aidat muhasebesi kurulumu ücretsiz!',
      };

    case 'service':
      return {
        pillar,
        pageType,
        primaryCTA: {
          text: isFacility ? 'Kurumsal Hizmet Teklifi Talep Edin' : 'Hemen Fiyat & Hizmet Teklifi Alın',
          url: `${BASE_URL}/teklif-al`,
          urgency: 'high',
        },
        secondaryCTA: {
          text: '0216 550 48 48 Nolu Hattan Bilgi Alın',
          url: `tel:${CANONICAL_NAP.contact.phoneE164}`,
        },
        socialProof: '%100 Lisanslı Personel, 7/24 Kesintisiz Denetim',
        guarantee: 'İşletme projesine ve SLA taahhütlerine %100 uyum garantisi.',
      };

    case 'district':
      return {
        pillar,
        pageType,
        primaryCTA: {
          text: `${pillar === 'facility' ? 'Bölgenize Özel Tesis Teklifi' : 'İlçeniz İçin Site Teklifi Alın'}`,
          url: `${BASE_URL}/teklif-al`,
          urgency: 'medium',
        },
        socialProof: 'Bölgenizde 25 dakikada acil mobil teknik müdahale.',
      };

    default:
      return {
        pillar,
        pageType,
        primaryCTA: {
          text: 'Ücretsiz Teklif Alın',
          url: `${BASE_URL}/teklif-al`,
          urgency: 'medium',
        },
      };
  }
}

/**
 * Sayısal Sosyal Kanıt Bloğu (Social Proof) üretir.
 */
export function buildSocialProofBlock(pillar: DomainPillar = 'site') {
  return {
    pillar,
    stats: [
      { label: 'Memnun Müşteri', value: '350+ Site / Tesis' },
      { label: 'Tahsilat Başarısı', value: '%99.2' },
      { label: 'Acil Müdahale', value: '25 Dakika' },
      { label: 'Sektörel Deneyim', value: '17 Yıl (2009\'dan Beri)' },
    ],
    rating: {
      score: 4.9,
      maxScore: 5.0,
      reviewCount: 248,
      source: 'Google Haritalar Doğrulanmış Yorumları',
    },
  };
}

/* =========================================================================
 * M2 — FORM OPTİMİZASYONU & LEAD KALİTE PUANLAMA (Faz 321-335)
 * ========================================================================= */

export interface LeadFormData {
  pillar: DomainPillar;
  propertyType: 'apartman' | 'site' | 'rezidans' | 'plaza' | 'avm' | 'fabrika';
  unitCount?: number;
  grossAreaM2?: number;
  district: string;
  hasSecurityNeed?: boolean;
  hasCleaningNeed?: boolean;
  hasTechnicalNeed?: boolean;
  urgencyTimeline?: 'acil' | '1-ay' | 'bilgi';
}

/**
 * Gelen form verisinden Lead Sıcaklık Puanı (0 - 100) hesaplar.
 */
export function buildLeadQualificationScore(data: LeadFormData): {
  score: number;
  grade: 'HOT' | 'WARM' | 'COLD';
  priorityLevel: 'critical' | 'high' | 'medium' | 'low';
  assignedTeam: string;
} {
  let score = 30; // Taban puan

  // Ölçek puanlaması
  if (data.unitCount) {
    if (data.unitCount >= 100) score += 25;
    else if (data.unitCount >= 40) score += 15;
    else if (data.unitCount >= 10) score += 10;
  }

  if (data.grossAreaM2) {
    if (data.grossAreaM2 >= 10000) score += 30;
    else if (data.grossAreaM2 >= 3000) score += 20;
    else if (data.grossAreaM2 >= 1000) score += 10;
  }

  // Hizmet genişliği puanı
  let servicesCount = 0;
  if (data.hasSecurityNeed) servicesCount++;
  if (data.hasCleaningNeed) servicesCount++;
  if (data.hasTechnicalNeed) servicesCount++;
  score += servicesCount * 5;

  // Aciliyet puanı
  if (data.urgencyTimeline === 'acil') score += 20;
  else if (data.urgencyTimeline === '1-ay') score += 10;

  score = Math.min(100, Math.max(0, score));

  let grade: 'HOT' | 'WARM' | 'COLD' = 'COLD';
  let priorityLevel: 'critical' | 'high' | 'medium' | 'low' = 'low';
  let assignedTeam = 'Dijital Pazarlama & Ön Bilgilendirme';

  if (score >= 80) {
    grade = 'HOT';
    priorityLevel = 'critical';
    assignedTeam = data.pillar === 'facility' ? 'Kurumsal Tesis Satış Direktörlüğü' : 'Site Yönetimi Kıdemli Portföy Yöneticisi';
  } else if (score >= 55) {
    grade = 'WARM';
    priorityLevel = 'high';
    assignedTeam = 'Saha Satış Ekibi';
  }

  return { score, grade, priorityLevel, assignedTeam };
}

/**
 * Çok adımlı form (Progressive Disclosure) şartnamesi üretir.
 */
export function buildProgressiveDisclosure(formType: 'teklif' | 'denetim' = 'teklif') {
  return {
    formType,
    stepsCount: 3,
    steps: [
      {
        stepIndex: 1,
        title: 'Mülk ve Ölçek Bilgileri',
        fields: ['propertyType', 'unitCountOrM2', 'district'],
        description: 'Sitenizin veya tesisinizin temel özelliklerini belirtin.',
      },
      {
        stepIndex: 2,
        title: 'İhtiyaç Duyulan Hizmetler',
        fields: ['serviceScope', 'currentIssues', 'urgency'],
        description: 'Güvenlik, temizlik, aidat takibi veya teknik servis ihtiyaçları.',
      },
      {
        stepIndex: 3,
        title: 'İletişim & Teklif İletimi',
        fields: ['fullName', 'phone', 'email', 'decisionRole'],
        description: 'Teklifinizi ve ücretsiz analiz raporunuzu hemen iletelim.',
      },
    ],
  };
}

/* =========================================================================
 * M3 — A/B TEST PROTOKOLLERİ & PAKETLER (Faz 336-350)
 * ========================================================================= */

export interface ABTestProtocol {
  testId: string;
  elementType: 'hero-headline' | 'cta-button' | 'pricing-table' | 'form-layout';
  pillar: DomainPillar;
  variantA: { label: string; text: string; description?: string };
  variantB: { label: string; text: string; description?: string };
  targetMetric: string;
  minimumSampleSize: number;
}

/**
 * A/B Test Protokolü üretir.
 */
export function buildABTestProtocol(elementType: 'cta' | 'headline' = 'cta', pillar: DomainPillar = 'site'): ABTestProtocol {
  const isFacility = pillar === 'facility';

  if (elementType === 'cta') {
    return {
      testId: `ab-cta-${pillar}`,
      elementType: 'cta-button',
      pillar,
      variantA: {
        label: 'Kontrol (Control)',
        text: isFacility ? 'Teklif Alın' : 'Fiyat Teklifi İsteyin',
      },
      variantB: {
        label: 'Meydan Okuyan (Challenger - Değer Odaklı)',
        text: isFacility ? 'Plaza Denetim Raporunuzu Ücretsiz Alın' : '30 Gün Ücretsiz Sitenizi Yönetelim',
      },
      targetMetric: 'Form Başlatma & Gönderme Oranı (CVR)',
      minimumSampleSize: 500,
    };
  }

  return {
    testId: `ab-headline-${pillar}`,
    elementType: 'hero-headline',
    pillar,
    variantA: {
      label: 'Geleneksel Başlık',
      text: 'İstanbul Profesyonel Site ve Apartman Yönetimi',
    },
    variantB: {
      label: 'Fayda & Acı Noktası Odaklı Başlık',
      text: 'Aidat Problemlerine Son: %99.2 Tahsilat ve Huzurlu Site Yaşamı',
    },
    targetMetric: 'Bounce Rate Azalması & Scroll Derinliği',
    minimumSampleSize: 1000,
  };
}

/**
 * Scroll derinliği segment şartnamesi üretir.
 */
export function buildScrollDepthSegment(pageType: string) {
  return {
    pageType,
    segments: [
      { depthPercent: 25, label: 'Hero Görüşü', action: 'Üst menü sticky CTA tetikleme' },
      { depthPercent: 50, label: 'Hizmetler İncelemesi', action: 'Sosyal kanıt ve referans sayaç animasyonu' },
      { depthPercent: 75, label: 'Fiyat & SSS Okuması', action: 'Çıkış niyeti / Yardımcı chatbot tetikleme' },
      { depthPercent: 100, label: 'Sayfa Sonu', action: 'İlgili rehber veya telefon arama widgetı' },
    ],
  };
}

/**
 * ROI ve Tasarruf Hesaplayıcı Şartnamesi döner.
 */
export function buildROICalculatorSpec(pillar: DomainPillar = 'site') {
  return {
    pillar,
    title: pillar === 'facility' ? 'Plaza Tesis Yönetimi Tasarruf ve ROI Hesaplayıcı' : 'Site Aidat ve Maliyet Tasarruf Hesaplayıcı',
    inputFields: [
      { id: 'unitCount', label: 'Daire / Bağımsız Bölüm Sayısı', defaultValue: 60, min: 10, max: 2000 },
      { id: 'currentDues', label: 'Mevcut Daire Başı Aidat (TL)', defaultValue: 1200, min: 200, max: 25000 },
      { id: 'hasSecurity', label: 'Özel Güvenlik Var mı?', type: 'boolean', defaultValue: true },
    ],
    formula: 'Yıllık Tasarruf = (Toplam Bütçe * 0.15) + (Gecikme Tahsilat Kazancı)',
    averageSavingsPercent: 15,
  };
}

/**
 * Paket ve Fiyatlandırma Şartnamesi üretir.
 */
export function buildPackageSpec(pillar: DomainPillar = 'site'): PackageTier[] {
  if (pillar === 'facility') {
    return [
      {
        id: 'facility-essential',
        name: 'Essential Facility',
        pillar: 'facility',
        targetScale: 'Butik İş Merkezleri (1.000 - 5.000 m²)',
        monthlyFeeText: 'Teklif İsteyiniz',
        features: ['5188 Özel Güvenlik', 'Günlük Temizlik', 'Periyodik Mekanik Kontrol', 'Aylık Şeffaf Rapor'],
        ctaText: 'Essential Teklifi Alın',
      },
      {
        id: 'facility-pro',
        name: 'Enterprise Integrated',
        pillar: 'facility',
        targetScale: 'Plaza & Karma Tesisler (5.000 - 30.000 m²)',
        monthlyFeeText: 'Açık Defter (Open-Book)',
        features: ['7/24 Kesintisiz Güvenlik', 'BMS & CMMS Otomasyonu', 'Yıllık %18 Enerji Tasarruf Planı', 'ISO 41001 Süreçleri', 'Hukuk ve İSG Danışmanlığı'],
        isPopular: true,
        ctaText: 'Enterprise Teklifi Alın',
      },
    ];
  }

  return [
    {
      id: 'site-standart',
      name: 'Standart Apartman Paketi',
      pillar: 'site',
      targetScale: '10 - 40 Daire',
      monthlyFeeText: 'Daire Başı Ekonomik',
      features: ['634 KMK Yasal Karar Defteri', 'Online Aidat Takibi & Sanal POS', 'Haftalık Temizlik Denetimi', 'Yıllık İşletme Projesi'],
      ctaText: 'Apartman Teklifi Alın',
    },
    {
      id: 'site-profesyonel',
      name: 'Profesyonel Site & Rezidans',
      pillar: 'site',
      targetScale: '40 - 250 Daire',
      monthlyFeeText: 'Tam Kapsamlı Yönetim',
      features: ['Tam Zamanlı / Nöbetçi Yönetici', '5188 Lisanslı Güvenlik', '25 Dk Acil Teknik Müdahale', '%99.2 Aidat Tahsilat Garantisi', 'Ücretsiz Hukuki İcra Takibi'],
      isPopular: true,
      ctaText: 'Site Teklifi Alın',
    },
    {
      id: 'site-toplukonut',
      name: 'Toplu Konut & Site Kompleksi',
      pillar: 'site',
      targetScale: '250+ Daire',
      monthlyFeeText: 'Kurumsal Sözleşme',
      features: ['Yerinde İdari Ofis & Personel', 'Sosyal Tesis & Havuz İşletimi', 'Peyzaj ve Otomatik Sulama', 'Banka Entegrasyonlu Muhasebe'],
      ctaText: 'Toplu Konut Teklifi Alın',
    },
  ];
}

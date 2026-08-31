/**
 * Çift Çekirdekli E-Posta Otomasyonu & SEO Entegrasyon Motoru (dualCoreEmailSeoEngine.ts)
 * 
 * Lead adaylarını (Site/Tesis) segmentlere göre otomatik eğiten (Nurture),
 * blog ve rehber içeriklerini bülten formatına dönüştüren, Google yorum taleplerini
 * ve GA4 UTM kampanya takibini yöneten kurumsal e-posta motoru.
 * 
 * 500 Faz Master Planı — Bölüm L (Faz 271 - 305)
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';
import { CANONICAL_NAP } from './napGuardEngine';

/* =========================================================================
 * L1 — E-POSTA ŞABLON & SEGMENTASYON (Faz 271-290)
 * ========================================================================= */

export type EmailSegment =
  | 'site-prospect'
  | 'facility-prospect'
  | 'existing-client'
  | 'blog-subscriber'
  | 'legal-interest';

export interface UTMParameters {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
}

export interface EmailTemplateSpec {
  id: string;
  segment: EmailSegment;
  pillar: DomainPillar;
  subject: string;
  preheader: string;
  headline: string;
  bodyMarkdown: string;
  primaryCTA: { text: string; url: string };
  secondaryCTA?: { text: string; url: string };
  utmParams: UTMParameters;
}

export interface NurtureStep {
  stepNumber: number;
  dayDelay: number;
  subject: string;
  headline: string;
  keyTakeaway: string;
  ctaText: string;
  targetUrl: string;
}

/**
 * Segmente özel hoş geldiniz e-postası şartnamesi üretir.
 */
export function buildWelcomeEmailSpec(segment: EmailSegment): EmailTemplateSpec {
  const isFacility = segment === 'facility-prospect';
  const utm = buildUTMParameters('welcome-series', segment);

  return {
    id: `welcome-${segment}`,
    segment,
    pillar: isFacility ? 'facility' : 'site',
    subject: isFacility
      ? 'Plaza ve Tesis Yönetiminde Yeni Nesil Standart: Alo Yönetim\'e Hoş Geldiniz'
      : 'Apartman ve Sitenizde Huzurlu Yaşam Başlıyor: Alo Yönetim\'e Hoş Geldiniz',
    preheader: isFacility
      ? 'ISO 41001 standartlarında entegre tesis yönetimi ve enerji tasarrufu rehberiniz.'
      : '634 sayılı KMK rehberi, aidat şeffaflığı ve 7/24 teknik destek avantajlarımız.',
    headline: isFacility
      ? 'Kurumsal Tesis Yönetiminde Güvenilir Çözüm Ortağınız'
      : 'Sitenizde Profesyonel, Şeffaf ve Huzurlu Bir Dönem',
    bodyMarkdown: isFacility
      ? `Sayın Yönetici / Mülk Sahibi,

Plaza, iş merkezi veya fabrikanızın operasyonel verimliliğini artırmak ve enerji maliyetlerini düşürmek için doğru yerdesiniz.

Alo Yönetim olarak; ISO 41001 kalite standartlarında 5188 güvenlik, endüstriyel temizlik, BMS destekli mekanik bakım ve şeffaf açık defter bütçe yönetimi sunuyoruz.`
      : `Değerli Kat Maliki / Site Sakini,

Apartman ve sitelerde yaşanan aidat anlaşmazlıkları, aksayan temizlik ve bulunamayan ustalar artık geride kaldı.

Alo Yönetim olarak; 634 sayılı Kat Mülkiyeti Kanunu'na tam uyumlu işletme projeleri, %99.2 aidat tahsilat başarısı ve 25 dakikada acil teknik müdahale güvencesi sağlıyoruz.`,
    primaryCTA: {
      text: isFacility ? 'Ücretsiz Tesis Denetim Raporu İsteyin' : '30 Gün Ücretsiz Site Yönetimi Teklifi Alın',
      url: `${BASE_URL}/teklif-al?${new URLSearchParams(utm as unknown as Record<string, string>).toString()}`,
    },
    utmParams: utm,
  };
}

/**
 * 5 Adımlı Lead Nurture Sekansı (Gün 1, 3, 7, 14, 30)
 */
export function buildLeadNurtureSequence(segment: EmailSegment, touchpointStep: number = 1): NurtureStep {
  const isFacility = segment === 'facility-prospect';

  const siteSteps: NurtureStep[] = [
    {
      stepNumber: 1,
      dayDelay: 1,
      subject: 'Apartman Yönetiminde İlk 5 Adım (KMK 634 Kontrol Listesi)',
      headline: 'Yasal Karar Defteri ve Genel Kurul Süreçleri',
      keyTakeaway: 'Kat malikleri kurulu çağrısı en az 15 gün önceden yapılmalıdır.',
      ctaText: 'KMK Rehberini İndirin',
      targetUrl: `${BASE_URL}/sozluk`,
    },
    {
      stepNumber: 2,
      dayDelay: 3,
      subject: 'Aidat Tahsilatında %99.2 Başarı Nasıl Yakalanır?',
      headline: 'Dijital Aidat Takibi ve Yasal İcra Desteği',
      keyTakeaway: 'Geciken aidatlara aylık %5 gecikme tazminatı uygulanmalıdır.',
      ctaText: 'Online Aidat Sistemini İnceleyin',
      targetUrl: `${BASE_URL}/hizmetler/aidat-takibi`,
    },
    {
      stepNumber: 3,
      dayDelay: 7,
      subject: 'Kazan Dairesi ve Asansörde Yeşil Etiket Güvencesi',
      headline: '7/24 Nöbetçi Teknik Servis ile 25 Dakikada Müdahale',
      keyTakeaway: 'Kırmızı etiketli asansör 60 gün içinde revize edilmelidir.',
      ctaText: 'Teknik Hizmetlerimizi Keşfedin',
      targetUrl: `${BASE_URL}/hizmetler/teknik-bakim-yonetimi`,
    },
    {
      stepNumber: 4,
      dayDelay: 14,
      subject: 'Komşularınız Ne Diyor? İstanbul Genelinde 350+ Site Referansı',
      headline: 'Kadıköy, Beşiktaş ve Başakşehir Başarı Hikayeleri',
      keyTakeaway: 'Alo Yönetim ile çalışan sitelerde aidat borçluluk oranı sıfıra iniyor.',
      ctaText: 'Müşteri Yorumlarını Okuyun',
      targetUrl: `${BASE_URL}/istanbul/kadikoy`,
    },
    {
      stepNumber: 5,
      dayDelay: 30,
      subject: 'Siteniz İçin Ücretsiz Hukuki & Mali Denetim Fırsatı',
      headline: 'Mevcut Yönetim Planınızı ve Bütçenizi İnceleyelim',
      keyTakeaway: 'Ücretsiz denetim raporu ile yıllık %15 aidat tasarrufu sağlayın.',
      ctaText: 'Ücretsiz Denetim Talep Edin',
      targetUrl: `${BASE_URL}/teklif-al`,
    },
  ];

  const facilitySteps: NurtureStep[] = [
    {
      stepNumber: 1,
      dayDelay: 1,
      subject: 'Plaza ve Tesis Yönetiminde ISO 41001 Standartları',
      headline: 'Uluslararası Hizmet Seviye Anlaşması (SLA) Kriterleri',
      keyTakeaway: 'Tesis yönetiminde tüm süreçler ölçülebilir KPI hedeflerine bağlanmalıdır.',
      ctaText: 'ISO 41001 Rehberini İnceleyin',
      targetUrl: `${BASE_URL}/tesis-yonetimi`,
    },
    {
      stepNumber: 2,
      dayDelay: 3,
      subject: 'BMS ve Chiller Otomasyonu ile Yıllık %18 Enerji Tasarrufu',
      headline: 'Ticari Binalarda Enerji Maliyetlerini Düşürme Stratejisi',
      keyTakeaway: 'Reaktif ceza ve kompanzasyon takibi ile binlerce lira tasarruf edin.',
      ctaText: 'Teknik İşletim Detayları',
      targetUrl: `${BASE_URL}/hizmetler/teknik-bakim-yonetimi`,
    },
    {
      stepNumber: 3,
      dayDelay: 7,
      subject: '5188 Sayılı Kanun Kapsamında A+ Plaza Güvenlik Protokolleri',
      headline: 'CCTV İzleme, X-Ray ve Plaka Tanıma Entegrasyonu',
      keyTakeaway: 'Özel güvenlik personeli düzenli denetime ve tatbikatlara tabi tutulmalıdır.',
      ctaText: 'Güvenlik Çözümlerimiz',
      targetUrl: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
    },
    {
      stepNumber: 4,
      dayDelay: 14,
      subject: 'Açık Defter (Open-Book) Maliyet Şeffaflığı Nedir?',
      headline: 'Tüm Harcamalarda Kuruşu Kuruşuna Denetim Güvencesi',
      keyTakeaway: 'Şeffaf bütçe modeli ile sürpriz ek maliyetler ortadan kalkar.',
      ctaText: 'Mali Yönetim Modelimiz',
      targetUrl: `${BASE_URL}/hizmetler/aidat-takibi`,
    },
    {
      stepNumber: 5,
      dayDelay: 30,
      subject: 'Plazanız İçin Ücretsiz Kapsamlı Tesis Denetim Raporu',
      headline: 'Mühendis Kadromuzla Tesisinizin Röntgenini Çekelim',
      keyTakeaway: 'Risk analizi ve enerji tasarruf potansiyeli raporu ücretsiz sunulur.',
      ctaText: 'Denetim Raporu İsteyin',
      targetUrl: `${BASE_URL}/teklif-al`,
    },
  ];

  const steps = isFacility ? facilitySteps : siteSteps;
  const clamped = Math.max(1, Math.min(touchpointStep, 5));
  return steps[clamped - 1];
}

/**
 * GA4 UTM Parametreleri üretir.
 */
export function buildUTMParameters(campaign: string, segment: EmailSegment): UTMParameters {
  return {
    utm_source: 'email',
    utm_medium: 'newsletter',
    utm_campaign: campaign,
    utm_content: segment,
  };
}

/* =========================================================================
 * L2 — E-POSTA & SEO ÇİFT YÖNLÜ ENTEGRASYON (Faz 291-305)
 * ========================================================================= */

/**
 * Google Yorum (Review) Talep E-postası şartnamesi üretir.
 */
export function buildReviewRequestEmailSpec(clientType: 'site' | 'facility' = 'site'): EmailTemplateSpec {
  const isFacility = clientType === 'facility';
  const utm = buildUTMParameters('review-request', isFacility ? 'facility-prospect' : 'existing-client');
  const gmbReviewUrl = 'https://g.page/r/aloyonetim/review';

  return {
    id: `review-request-${clientType}`,
    segment: 'existing-client',
    pillar: isFacility ? 'facility' : 'site',
    subject: 'Alo Yönetim Hizmet Deneyiminizi Paylaşın (1 Dakikanızı Ayırın)',
    preheader: 'Görüşleriniz hizmet kalitemizi sürekli artırmamıza rehberlik ediyor.',
    headline: 'Memnuniyetiniz Bizim İçin Değerli',
    bodyMarkdown: `Değerli Müşterimiz,

Alo Yönetim olarak ${isFacility ? 'tesisinizde' : 'sitenizde'} sunduğumuz hizmetleri mükemmelleştirmek için sürekli çalışıyoruz.

Ekibimizin çalışmalarından ve sunduğumuz yönetim hizmetlerinden memnun kaldıysanız, Google Haritalar üzerinden 1 dakikada yıldız puanı vererek düşüncelerinizi paylaşmanız bizi çok mutlu edecektir.`,
    primaryCTA: {
      text: 'Google\'da Yorum Yapın (⭐️⭐️⭐️⭐️⭐️)',
      url: gmbReviewUrl,
    },
    secondaryCTA: {
      text: 'Doğrudan Yönetime Öneri / Geri Bildirim İletin',
      url: `${BASE_URL}/iletisim`,
    },
    utmParams: utm,
  };
}

/**
 * A/B Testi İçin 3 Farklı Konu Satırı Varyantı üretir.
 */
export function buildEmailSubjectLineVariants(topic: string, pillar: DomainPillar = 'site'): string[] {
  const isFacility = pillar === 'facility';

  if (topic.includes('aidat') || topic.includes('fiyat')) {
    return [
      '💡 Apartman Aidatları Nasıl Düşürülür? (Yıllık %15 Tasarruf Formülü)',
      '📊 2026 Aidat Hesaplama Rehberi: Sitenizin Gerçek Maliyeti Nedir?',
      '⚠️ Aidatını Ödemeyen Malikler İçin Yasal Süreç Nasıl İşler?',
    ];
  }

  if (isFacility) {
    return [
      '🏢 Plazalarda Yıllık %18 Enerji Tasarrufu Sağlayan Tesis Yönetim Modeli',
      '📋 ISO 41001 Tesis Yönetim Kontrol Listesi (Yöneticiler İçin)',
      '⚡ BMS ve HVAC Bakımında Sıfır Kesinti: Kurumsal SLA Rehberi',
    ];
  }

  return [
    '🔑 Profesyonel Site Yönetimine Geçişte İlk 5 Adım',
    '📑 KMK 634 Karar Defteri Nasıl Tutulur? (Noter Tasdiki Rehberi)',
    '🛡️ Sitenizde 7/24 Kesintisiz Güvenlik ve Teknik Bakım Avantajı',
  ];
}

import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/seo';

export type SearchIntentType = 'INFORMATIONAL' | 'COMMERCIAL' | 'LOCAL_DISCOVERY' | 'TRANSACTIONAL';

export interface IntentClassificationResult {
  query: string;
  intent: SearchIntentType;
  confidenceScore: number;
  detectedDistrict?: { name: string; slug: string };
  recommendedSchema: string;
  relevantLegalArticle?: string;
  recommendedCta: {
    label: string;
    targetUrl: string;
    conversionType: string;
  };
}

const INFORMATIONAL_KEYWORDS = [
  'nedir',
  'nasıl',
  'kim öder',
  'kanun',
  'kmk',
  'madde',
  'faiz',
  'yargıtay',
  'ihtarname',
  'genel kurul',
  'yönetici seçimi',
  'cam balkon',
  'asansör muayene',
  'sözlük',
  'mevzuat',
];

const COMMERCIAL_KEYWORDS = [
  'fiyat',
  'ücret',
  'maliyet',
  'bütçe',
  'tasarruf',
  'hesapla',
  'hesaplama',
  'simülatör',
  'kaç para',
  'ne kadar',
  'teklif karşılaştır',
];

const TRANSACTIONAL_KEYWORDS = [
  'teklif al',
  'başvur',
  'iletişim',
  'telefon',
  'şirket değiştirme',
  'devir tutanağı',
  'hemen ara',
  'sözleşme',
  'keşif iste',
];

/**
 * Kullanıcı arama sorgusunu veya URL bağlamını analiz ederek arama niyetini (Search Intent) sınıflandırır.
 */
export function classifySearchIntent(queryInput: string = ''): IntentClassificationResult {
  const query = (queryInput || '').trim().toLowerCase();

  // 1. İlçe Tespiti (Local Discovery)
  const matchedDistrict = DISTRICTS.find(
    (d) => query.includes(d.name.toLowerCase()) || query.includes(d.slug)
  );

  // 2. İşlemsel (Transactional)
  const isTransactional = TRANSACTIONAL_KEYWORDS.some((kw) => query.includes(kw));
  if (isTransactional) {
    return {
      query,
      intent: 'TRANSACTIONAL',
      confidenceScore: 0.95,
      detectedDistrict: matchedDistrict ? { name: matchedDistrict.name, slug: matchedDistrict.slug } : undefined,
      recommendedSchema: 'QuoteAction / ContactPoint',
      recommendedCta: {
        label: '48 Saatte Şeffaf Teklif Alın',
        targetUrl: `${BASE_URL}/teklif-al`,
        conversionType: 'Lead Generation',
      },
    };
  }

  // 3. Ticari / Bütçe (Commercial)
  const isCommercial = COMMERCIAL_KEYWORDS.some((kw) => query.includes(kw));
  if (isCommercial) {
    return {
      query,
      intent: 'COMMERCIAL',
      confidenceScore: 0.90,
      detectedDistrict: matchedDistrict ? { name: matchedDistrict.name, slug: matchedDistrict.slug } : undefined,
      recommendedSchema: 'CalculateAction / WebApplication',
      recommendedCta: {
        label: 'Canlı Tesis Bütçe & Tasarruf Simülatörünü Açın',
        targetUrl: matchedDistrict
          ? `${BASE_URL}/api/tesis-yonetimi/calculate-budget?district=${matchedDistrict.slug}`
          : `${BASE_URL}/api/tesis-yonetimi/calculate-budget`,
        conversionType: 'Interactive Calculator',
      },
    };
  }

  // 4. Yerel Keşif (Local Discovery)
  if (matchedDistrict) {
    return {
      query,
      intent: 'LOCAL_DISCOVERY',
      confidenceScore: 0.92,
      detectedDistrict: { name: matchedDistrict.name, slug: matchedDistrict.slug },
      recommendedSchema: 'LocalBusiness / Service (ISO 41001)',
      recommendedCta: {
        label: `${matchedDistrict.name} Tesis Yönetimi & 45 Dk SLA Keşif Randevusu`,
        targetUrl: `${BASE_URL}/bolgeler/${matchedDistrict.slug}/tesis-yonetimi`,
        conversionType: 'Local Landing Engagement',
      },
    };
  }

  // 5. Bilgi Arayışı (Informational - Varsayılan)
  const hasInfoKeyword = INFORMATIONAL_KEYWORDS.some((kw) => query.includes(kw));
  return {
    query,
    intent: 'INFORMATIONAL',
    confidenceScore: hasInfoKeyword ? 0.88 : 0.70,
    recommendedSchema: 'FAQPage / DefinedTermSet / HowTo',
    relevantLegalArticle: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
    recommendedCta: {
      label: 'KMK 634 & Hukuki Rehberi İnceleyin',
      targetUrl: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
      conversionType: 'Topical Authority Knowledge',
    },
  };
}

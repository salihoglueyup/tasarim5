import { BASE_URL } from '@/lib/seo';
import { ORG_NAME, ORG_ID, WEBSITE_ID } from '@/lib/schemas';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';

/**
 * Gelişmiş Merkezi Backend SEO, Topikal Otorite, Arama Niyeti ve İçerik Zekası Motoru (Alo Yönetim).
 *
 * Bu motor:
 * 1. İçeriklerdeki topikal anahtar kelime yoğunluğunu, semantik derinliği ve varlık frekansını ölçer.
 * 2. Snippet (Title & Description) sağlık ve CTR potansiyelini puanlar.
 * 3. Sayfalar, 39 ilçe ve ana hizmetler arasında hiyerarşik Hub & Spoke örümcek ağı bağlantıları kurar.
 * 4. Türkçe Ateşman Okunabilirlik İndeksini (Flesch-Kincaid TR uyarlaması) hesaplar.
 * 5. Başlık hiyerarşisini (H1, H2, H3) ve semantik anahtar kelime dağılımını denetler.
 * 6. Kullanıcı sorgularını ve içerikleri Arama Niyetine (Search Intent) göre sınıflandırır.
 * 7. İçerikten otomatik FAQ soru-cevap çiftleri ve Schema.org FAQPage yapısı çıkarır.
 * 8. AI arama motorları (Gemini, Perplexity, ChatGPT) için somut veri/KPI çıkarımı yapar.
 * 9. Tam sayfa SEO sağlık denetimini (Full Page Audit) tek çatı altında sunar.
 */

export type SearchIntentType = 'transactional' | 'informational' | 'navigational' | 'commercial';

export interface SearchIntentResult {
  intent: SearchIntentType;
  confidencePercent: number;
  matchedSignals: string[];
  recommendedCta: string;
  recommendedSchemaType: string;
}

export interface FaqCandidate {
  question: string;
  answer: string;
}

export interface FaqPageSchemaResult {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export interface EntityGraphResult {
  about: { '@type': 'Thing'; name: string; sameAs: string }[];
  mentions: { '@type': 'Thing'; name: string; sameAs: string }[];
}

export interface KeywordDensityResult {
  keyword: string;
  count: number;
  densityPercent: number;
  status: 'optimal' | 'low' | 'high';
  isPillar: boolean;
}

export interface ContentSeoAudit {
  wordCount: number;
  readTimeMinutes: number;
  primaryKeyword: string;
  primaryKeywordCount: number;
  primaryKeywordDensity: number;
  topicalScore: number; // 0 - 100
  keywords: KeywordDensityResult[];
  recommendedInternalLinks: { text: string; href: string; reason: string }[];
  missingCriticalEntities: string[];
}

export interface SnippetHealthReport {
  score: number; // 0 - 100
  isOptimal: boolean;
  titleLength: number;
  descriptionLength: number;
  hasPrimaryKeywordInTitle: boolean;
  hasPrimaryKeywordInDescription: boolean;
  hasCtrTriggers: boolean;
  hasLocationSignal: boolean;
  detectedCtrTriggers: string[];
  recommendations: string[];
}

export interface ReadabilityReport {
  score: number; // 0 - 100 (Ateşman İndeksi)
  level: 'Çok Kolay' | 'Kolay' | 'Orta' | 'Zor' | 'Çok Zor';
  totalWords: number;
  totalSentences: number;
  totalSyllables: number;
  averageWordLengthSyllables: number;
  averageSentenceLengthWords: number;
  feedback: string;
}

export interface HeadingStructureReport {
  isValid: boolean;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  headings: { level: 1 | 2 | 3; text: string; hasKeyword: boolean }[];
  issues: string[];
}

export interface ExtractedFact {
  type: 'percentage' | 'legal_code' | 'standard' | 'timeframe' | 'general_metric';
  raw: string;
  context: string;
}

export interface TopicClusterNode {
  title: string;
  url: string;
  type: 'pillar' | 'cluster_article' | 'district_page' | 'faq';
  wikidataSameAs?: string;
  relation: string;
}

export interface HubAndSpokeGraph {
  hub: { title: string; url: string; wikidata: string };
  siblings: { title: string; url: string }[];
  spokes: { district: string; url: string; side: string }[];
  relatedArticles: { title: string; url: string }[];
}

export interface FullPageSeoAudit {
  overallScore: number; // 0 - 100
  snippet: SnippetHealthReport;
  content: ContentSeoAudit;
  readability: ReadabilityReport;
  headings: HeadingStructureReport;
  intent: SearchIntentResult;
  extractedFaqs: FaqCandidate[];
  extractedFacts: ExtractedFact[];
  hubAndSpoke: HubAndSpokeGraph;
  entityGraph: EntityGraphResult;
}

// ---------------------------------------------------------------------------
// Genişletilmiş Tesis Yönetimi Varlık ve Eş Anlamlı Sözlüğü (Wikidata / Standartlar)
// ---------------------------------------------------------------------------
export const FACILITY_MANAGEMENT_ENTITIES = [
  {
    name: 'Tesis Yönetimi',
    slug: 'tesis-yonetimi',
    pillarUrl: '/hizmetler/tesis-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q1391515',
    isoStandard: 'ISO 41001:2018',
    variations: [
      'tesis yönetimi',
      'entegre tesis yönetimi',
      'profesyonel tesis yönetimi',
      'istanbul tesis yönetimi',
      'tesis işletme yönetimi',
      'tesis yönetim şirketi',
      'tesis yönetim şirketleri',
      'tesis yönetim firmaları',
      'bina ve tesis yönetimi',
      'site ve tesis yönetimi',
      'iso 41001 tesis yönetimi',
      'facility management',
      'entegre gayrimenkul yönetimi',
    ],
  },
  {
    name: 'Tesis ve Mülk Hizmetleri',
    slug: 'tesis-ve-mulk-hizmetleri',
    pillarUrl: '/hizmetler/tesis-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q1758229',
    isoStandard: 'ISO 41001 & KMK 634',
    variations: [
      'tesis ve mülk hizmetleri',
      'tesis ve mülk yönetimi',
      'mülk hizmetleri',
      'mülk yönetimi',
      'gayrimenkul tesis işletmeciliği',
      'mülk varlık yönetimi',
      'istanbul mülk yönetimi',
      'profesyonel mülk yönetimi',
    ],
  },
  {
    name: 'Rezidans & Lüks Site Yönetimi',
    slug: 'rezidans-site-yonetimi',
    pillarUrl: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q108846399',
    isoStandard: 'ISO 41001:2018',
    variations: [
      'rezidans yönetimi',
      'rezidans tesis yönetimi',
      'lüks site yönetimi',
      'rezidans concierge',
      'kule yönetimi',
    ],
  },
  {
    name: 'Plaza & Ofis Binası Tesis Yönetimi',
    slug: 'plaza-yonetimi',
    pillarUrl: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q102163',
    isoStandard: 'ISO 41001:2018',
    variations: [
      'plaza yönetimi',
      'iş merkezi yönetimi',
      'ofis binası yönetimi',
      'plaza tesis işletmesi',
    ],
  },
  {
    name: 'Toplu Konut & TOKİ Yönetimi',
    slug: 'toplu-konut-yonetimi',
    pillarUrl: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q1391515',
    isoStandard: 'ISO 41001:2018',
    variations: [
      'toplu konut yönetimi',
      'toki site yönetimi',
      'çok bloklu site yönetimi',
      'kitlesel konut yönetimi',
    ],
  },
  {
    name: 'Sanayi Tesisi & Fabrika Yönetimi',
    slug: 'sanayi-tesisi-yonetimi',
    pillarUrl: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q83405',
    isoStandard: 'ISO 45001 & ISO 41001',
    variations: [
      'sanayi tesisi yönetimi',
      'fabrika yönetimi',
      'lojistik merkezi yönetimi',
      'organize sanayi tesis bakımı',
    ],
  },
  {
    name: 'Site ve Toplu Yapı Yönetimi',
    slug: 'site-yonetimi',
    pillarUrl: '/hizmetler/site-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q1758229',
    variations: [
      'site yönetimi',
      'profesyonel site yönetimi',
      'apartman yönetimi',
      'toplu yapı yönetimi',
      'site yönetim şirketleri',
      'site yönetim firması',
      'bina yönetimi',
    ],
  },
  {
    name: 'Kat Mülkiyeti Kanunu (KMK 634)',
    slug: 'kmk-634',
    pillarUrl: '/hizmetler/hukuk-ve-icra-danismanligi',
    wikidata: 'https://www.wikidata.org/wiki/Q161851',
    variations: [
      'kat mülkiyeti kanunu',
      'kmk 634',
      'işletme projesi',
      'genel kurul',
      'kat malikleri kurulu',
      'ortak alan giderleri',
      'aidat icra takibi',
      'gecikme tazminatı',
    ],
  },
  {
    name: '5188 Sayılı Özel Güvenlik',
    slug: 'guvenlik-yonetimi',
    pillarUrl: '/hizmetler/guvenlik-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q11440',
    variations: [
      'özel güvenlik',
      '5188 sayılı kanun',
      'site güvenliği',
      'kamera cctv izleme',
      'plaka tanıma sistemi',
      'devriye kontrol',
      'fiziki güvenlik',
    ],
  },
  {
    name: 'Önleyici Teknik Bakım & Asansör',
    slug: 'teknik-bakim',
    pillarUrl: '/hizmetler/teknik-bakim',
    wikidata: 'https://www.wikidata.org/wiki/Q183057',
    variations: [
      'teknik bakım',
      'asansör periyodik bakım',
      'yeşil etiket',
      'jeneratör bakımı',
      'hidrofor servisi',
      'yangın otomasyonu',
      'kompanzasyon panosu',
    ],
  },
  {
    name: 'TSE 13811 Hijyen ve Temizlik',
    slug: 'temizlik-ve-hijyen',
    pillarUrl: '/hizmetler/temizlik-ve-hijyen',
    wikidata: 'https://www.wikidata.org/wiki/Q162016',
    variations: [
      'ortak alan temizliği',
      'site temizlik firması',
      'tse 13811',
      'merdiven temizliği',
      'biyosidal dezenfeksiyon',
      'dış cephe cam temizliği',
    ],
  },
  {
    name: 'Bina Otomasyonu & Enerji Verimliliği (EKB)',
    slug: 'enerji-yonetimi',
    pillarUrl: '/hizmetler/teknik-bakim',
    wikidata: 'https://www.wikidata.org/wiki/Q895066',
    variations: [
      'bina otomasyonu',
      'enerji verimliliği',
      'enerji kimlik belgesi',
      'ekb',
      'ısı payölçer',
      'reaktif ceza önleme',
    ],
  },
  {
    name: 'Aidat Tahsilatı & Şeffaf Muhasebe',
    slug: 'aidat-takibi',
    pillarUrl: '/hizmetler/aidat-takibi',
    wikidata: 'https://www.wikidata.org/wiki/Q1670988',
    variations: [
      'aidat tahsilatı',
      'aidat takibi',
      'site muhasebesi',
      'online aidat ödeme',
      'şeffaf hesap raporu',
    ],
  },
  {
    name: 'Yangın ve Acil Durum Yönetimi',
    slug: 'acil-durum',
    pillarUrl: '/hizmetler/guvenlik-yonetimi',
    wikidata: 'https://www.wikidata.org/wiki/Q168541',
    variations: [
      'yangın tesisatı',
      'yangın merdiveni',
      'acil durum tahliye planı',
      'yangın pompası testi',
    ],
  },
  {
    name: 'Peyzaj & Otomatik Sulama Sistemleri',
    slug: 'peyzaj-ve-bahce-bakimi',
    pillarUrl: '/hizmetler/peyzaj-ve-bahce-bakimi',
    wikidata: 'https://www.wikidata.org/wiki/Q179188',
    variations: [
      'peyzaj bakımı',
      'bahçe bakımı',
      'otomatik sulama sistemi',
      'çim biçme budama',
      'ağaç ilaçlama',
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Snippet & CTR Tetikleyici Kelimeler
// ---------------------------------------------------------------------------
const CTR_TRIGGER_WORDS = [
  'profesyonel',
  'istanbul',
  '7/24',
  'ücretsiz keşif',
  'kmk 634',
  'şeffaf',
  'fiyatları',
  'teklif',
  'yönetimi',
  'hizmetleri',
  'güvenlik',
  'temizlik',
  'bakım',
];

/**
 * Kullanıcı Arama Niyeti (Search Intent) Sınıflandırıcısı.
 */
export function classifySearchIntent(queryOrText: string): SearchIntentResult {
  const norm = normalizeText(queryOrText);
  const matchedSignals: string[] = [];

  const transactionalSignals = ['teklif', 'fiyat', 'ucret', 'satin al', 'hizmet al', 'iletisim', 'hemen ara', 'teklif al'];
  const informationalSignals = ['nedir', 'nasil', 'kanun', 'madde', 'rehber', 'sartlari', 'hesaplama', 'neden'];
  const navigationalSignals = ['giris', 'login', 'portal', 'alo yonetim iletisim', 'telefon numarasi', 'adres'];
  const commercialSignals = ['en iyi', 'karsilastirma', 'tavsiye', 'firmalari', 'sirketleri', 'farki', 'avantajlari', 'hangisi'];

  let transCount = 0;
  let infoCount = 0;
  let navCount = 0;
  let commCount = 0;

  for (const s of transactionalSignals) {
    if (norm.includes(s)) {
      transCount++;
      matchedSignals.push(`İşlemsel: ${s}`);
    }
  }

  for (const s of informationalSignals) {
    if (norm.includes(s)) {
      infoCount++;
      matchedSignals.push(`Bilgisel: ${s}`);
    }
  }

  for (const s of navigationalSignals) {
    if (norm.includes(s)) {
      navCount++;
      matchedSignals.push(`Gezinme: ${s}`);
    }
  }

  for (const s of commercialSignals) {
    if (norm.includes(s)) {
      commCount++;
      matchedSignals.push(`Ticari Araştırma: ${s}`);
    }
  }

  let intent: SearchIntentType = 'informational';
  let maxScore = infoCount;
  let recommendedCta = 'Detaylı Bilgi ve Rehberi İnceleyin';
  let recommendedSchemaType = 'Article / TechArticle';

  if (transCount > maxScore) {
    intent = 'transactional';
    maxScore = transCount;
    recommendedCta = 'Ücretsiz Keşif ve Fiyat Teklifi Alın';
    recommendedSchemaType = 'OfferCatalog / ProfessionalService';
  }

  if (commCount > maxScore) {
    intent = 'commercial';
    maxScore = commCount;
    recommendedCta = 'Tesis Yönetim Hizmetlerimizi Karşılaştırın';
    recommendedSchemaType = 'Service / Review';
  }

  if (navCount > maxScore) {
    intent = 'navigational';
    maxScore = navCount;
    recommendedCta = 'Müşteri Paneline Giriş Yapın veya Arayın';
    recommendedSchemaType = 'Organization / ContactPoint';
  }

  const confidencePercent = Math.min(100, Math.max(50, 50 + maxScore * 15));

  return {
    intent,
    confidencePercent,
    matchedSignals,
    recommendedCta,
    recommendedSchemaType,
  };
}

/**
 * İçerikten Otomatik Soru-Cevap (FAQ) Çıkarıcısı ve Schema Üreticisi.
 */
export function extractFaqCandidatesFromContent(content: string): {
  faqs: FaqCandidate[];
  schema: FaqPageSchemaResult | null;
} {
  const plainText = content.replace(/<[^>]*>?/gm, '');
  const lines = plainText.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const faqs: FaqCandidate[] = [];

  const questionRegex = /^(?:[0-9]+\.|\*|-|•)?\s*(.+?(?:\?|nedir|nasil yapilir|zorunlu mu|kim oder|ne zaman))\s*$/i;

  for (let i = 0; i < lines.length - 1; i++) {
    const currentLine = lines[i];
    const nextLine = lines[i + 1];

    if (currentLine.length >= 10 && currentLine.length <= 150 && questionRegex.test(currentLine)) {
      if (nextLine.length >= 20 && !questionRegex.test(nextLine)) {
        const cleanQuestion = currentLine.replace(/^[0-9]+\.|\*|-|•/g, '').trim();
        faqs.push({
          question: cleanQuestion.endsWith('?') ? cleanQuestion : `${cleanQuestion}?`,
          answer: nextLine.trim(),
        });
      }
    }
  }

  const schema: FaqPageSchemaResult | null =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : null;

  return { faqs: faqs.slice(0, 10), schema };
}

/**
 * Metin İçerisindeki Topikal Varlık Grafiğini (Wikidata QID'leri ile) Çözer.
 */
export function resolveTopicalEntityGraph(content: string): EntityGraphResult {
  const norm = normalizeText(content);
  const aboutList: { '@type': 'Thing'; name: string; sameAs: string }[] = [];
  const mentionsList: { '@type': 'Thing'; name: string; sameAs: string }[] = [];

  for (const entity of FACILITY_MANAGEMENT_ENTITIES) {
    let matchCount = 0;
    for (const v of entity.variations) {
      if (norm.includes(normalizeText(v))) {
        matchCount++;
      }
    }

    if (matchCount >= 2) {
      aboutList.push({
        '@type': 'Thing',
        name: entity.name,
        sameAs: entity.wikidata,
      });
    } else if (matchCount === 1) {
      mentionsList.push({
        '@type': 'Thing',
        name: entity.name,
        sameAs: entity.wikidata,
      });
    }
  }

  return {
    about: aboutList,
    mentions: mentionsList,
  };
}

/**
 * Başlık ve Meta Açıklama için kapsamlı SEO Sağlık ve CTR Puanlaması yapar.
 */
export function evaluateSnippetHealth(
  title: string,
  description: string,
  targetKeyword: string = 'tesis yönetimi'
): SnippetHealthReport {
  const recommendations: string[] = [];
  const detectedTriggers: string[] = [];

  const cleanTitle = title.trim();
  const cleanDesc = description.trim();
  const normTitle = normalizeText(cleanTitle);
  const normDesc = normalizeText(cleanDesc);
  const normKeyword = normalizeText(targetKeyword);

  const titleLength = cleanTitle.length;
  const descriptionLength = cleanDesc.length;

  let score = 100;

  // Başlık Uzunluğu (40-65 karakter ideal)
  if (titleLength < 35) {
    score -= 15;
    recommendations.push('Başlık çok kısa; 40-65 karakter arası daha yüksek tıklanma sağlar.');
  } else if (titleLength > 65) {
    score -= 15;
    recommendations.push('Başlık arama motoru sonuçlarında kesilebilir (65 karakterden uzun).');
  }

  // Açıklama Uzunluğu (120-160 karakter ideal)
  if (descriptionLength < 110) {
    score -= 15;
    recommendations.push('Meta açıklama çok kısa; en az 120 karakter ile arama niyetini zenginleştirin.');
  } else if (descriptionLength > 165) {
    score -= 10;
    recommendations.push('Meta açıklama 160 karakteri aşıyor, mobilde son kısmı kesilebilir.');
  }

  // Anahtar Kelime Varlığı
  const hasKeywordInTitle = normTitle.includes(normKeyword);
  if (!hasKeywordInTitle) {
    score -= 20;
    recommendations.push(`Başlıkta anahtar kelime (${targetKeyword}) bulunmuyor.`);
  } else if (normTitle.indexOf(normKeyword) < 25) {
    // Anahtar kelime başa yakınsa bonus
    score += 5;
  }

  const hasKeywordInDesc = normDesc.includes(normKeyword);
  if (!hasKeywordInDesc) {
    score -= 15;
    recommendations.push(`Açıklamada anahtar kelime (${targetKeyword}) yer almıyor.`);
  }

  // Yerel Sinyal (İstanbul veya İlçe adı)
  const hasLocation =
    normTitle.includes('istanbul') ||
    normDesc.includes('istanbul') ||
    DISTRICTS.some((d) => normTitle.includes(normalizeText(d.name)) || normDesc.includes(normalizeText(d.name)));

  if (!hasLocation) {
    score -= 10;
    recommendations.push('Yerel SEO sinyali eksik (İstanbul veya ilçe adı ekleyerek yerel aramaları hedefleyin).');
  }

  // CTR Tetikleyicileri
  for (const trigger of CTR_TRIGGER_WORDS) {
    const normTrigger = normalizeText(trigger);
    if (normTitle.includes(normTrigger) || normDesc.includes(normTrigger)) {
      if (!detectedTriggers.includes(trigger)) {
        detectedTriggers.push(trigger);
      }
    }
  }

  const hasCtrTriggers = detectedTriggers.length >= 2;
  if (!hasCtrTriggers) {
    score -= 10;
    recommendations.push('Kullanıcıyı tıklamaya teşvik eden eylem kelimeleri (örn: Şeffaf, 7/24, Ücretsiz Keşif) ekleyin.');
  }

  const finalScore = Math.min(100, Math.max(0, score));

  return {
    score: finalScore,
    isOptimal: finalScore >= 80,
    titleLength,
    descriptionLength,
    hasPrimaryKeywordInTitle: hasKeywordInTitle,
    hasPrimaryKeywordInDescription: hasKeywordInDesc,
    hasCtrTriggers,
    hasLocationSignal: hasLocation,
    detectedCtrTriggers: detectedTriggers,
    recommendations,
  };
}

/**
 * Türkçe Ateşman Okunabilirlik İndeksi Hesaplayıcısı.
 */
export function calculateTurkishReadabilityScore(content: string): ReadabilityReport {
  const plainText = content.replace(/<[^>]*>?/gm, '').trim();
  if (!plainText) {
    return {
      score: 100,
      level: 'Çok Kolay',
      totalWords: 0,
      totalSentences: 0,
      totalSyllables: 0,
      averageWordLengthSyllables: 0,
      averageSentenceLengthWords: 0,
      feedback: 'İçerik boş.',
    };
  }

  // Cümle tespiti
  const sentences = plainText.split(/[.!?…]+/).filter((s) => s.trim().length > 0);
  const totalSentences = Math.max(1, sentences.length);

  // Kelime tespiti
  const words = plainText.match(/[a-z0-9ğüşıöçâîû]+/gi) || [];
  const totalWords = Math.max(1, words.length);

  // Hece tespiti (Türkçe sesli harfler)
  const vowels = /[aeıioöuüâîû]/gi;
  const vowelMatches = plainText.match(vowels) || [];
  const totalSyllables = Math.max(totalWords, vowelMatches.length);

  const avgWordLength = Number((totalSyllables / totalWords).toFixed(2));
  const avgSentenceLength = Number((totalWords / totalSentences).toFixed(2));

  // Ateşman Formülü
  const rawScore = 206.835 - 40.12 * avgWordLength - 1.015 * avgSentenceLength;
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  let level: 'Çok Kolay' | 'Kolay' | 'Orta' | 'Zor' | 'Çok Zor' = 'Orta';
  let feedback = 'Metin dengeli ve anlaşılır bir kurumsal tesis yönetimi diline sahip.';

  if (score >= 90) {
    level = 'Çok Kolay';
    feedback = 'Metin son derece akıcı ve herkesin rahatlıkla anlayabileceği sadelikte.';
  } else if (score >= 70) {
    level = 'Kolay';
    feedback = 'Metin akıcı ve kolay okunabilir.';
  } else if (score >= 50) {
    level = 'Orta';
    feedback = 'Metin profesyonel tesis ve site yöneticileri için ideal teknik derinlikte.';
  } else if (score >= 30) {
    level = 'Zor';
    feedback = 'Cümleler biraz uzun veya teknik terim yoğunluğu yüksek; ara başlıklarla bölmeniz önerilir.';
  } else {
    level = 'Çok Zor';
    feedback = 'Metin oldukça akademik/ağır; cümleleri kısaltarak okunabilirliği artırın.';
  }

  return {
    score,
    level,
    totalWords,
    totalSentences,
    totalSyllables,
    averageWordLengthSyllables: avgWordLength,
    averageSentenceLengthWords: avgSentenceLength,
    feedback,
  };
}

/**
 * Başlık Hiyerarşisi ve Semantik Yapı Denetleyicisi.
 */
export function analyzeHeadingStructure(content: string): HeadingStructureReport {
  const issues: string[] = [];
  const headings: { level: 1 | 2 | 3; text: string; hasKeyword: boolean }[] = [];

  const lines = content.split('\n');
  const targetKeywords = ['tesis', 'yönetim', 'güvenlik', 'aidat', 'bakım', 'kmk', 'temizlik', 'istanbul'];

  for (const line of lines) {
    const trimmed = line.trim();
    let level: 1 | 2 | 3 | null = null;
    let text = '';

    if (trimmed.startsWith('### ')) {
      level = 3;
      text = trimmed.substring(4).trim();
    } else if (trimmed.startsWith('## ')) {
      level = 2;
      text = trimmed.substring(3).trim();
    } else if (trimmed.startsWith('# ')) {
      level = 1;
      text = trimmed.substring(2).trim();
    } else {
      const match = trimmed.match(/<h([1-3])>(.*?)<\/h\1>/i);
      if (match) {
        level = parseInt(match[1], 10) as 1 | 2 | 3;
        text = match[2].replace(/<[^>]*>?/gm, '').trim();
      }
    }

    if (level && text) {
      const norm = normalizeText(text);
      const hasKeyword = targetKeywords.some((k) => norm.includes(k));
      headings.push({ level, text, hasKeyword });
    }
  }

  const h1Count = headings.filter((h) => h.level === 1).length;
  const h2Count = headings.filter((h) => h.level === 2).length;
  const h3Count = headings.filter((h) => h.level === 3).length;

  if (h1Count === 0) issues.push('İçerikte ana H1 başlığı bulunamadı.');
  else if (h1Count > 1) issues.push(`İçerikte birden fazla (${h1Count} adet) H1 başlığı var. Sayfa başına yalnız 1 H1 olmalıdır.`);

  if (h2Count === 0) issues.push('İçerik alt konulara bölünmemiş (en az 2 adet H2 başlığı önerilir).');

  const h2WithKeywords = headings.filter((h) => h.level === 2 && h.hasKeyword).length;
  if (h2Count > 0 && h2WithKeywords === 0) {
    issues.push('H2 alt başlıklarında hedef sektörel anahtar kelimeler (Tesis, Güvenlik, Bakım vb.) geçmiyor.');
  }

  return {
    isValid: issues.length === 0,
    h1Count,
    h2Count,
    h3Count,
    headings,
    issues,
  };
}

/**
 * AI Arama Motorları (Gemini, ChatGPT, Perplexity) İçin Somut KPI ve Olguları Çıkarır.
 */
export function extractKeyFactsAndKpis(content: string): ExtractedFact[] {
  const plainText = content.replace(/<[^>]*>?/gm, '');
  const facts: ExtractedFact[] = [];

  const percentageRegex = /%\s*\d+(?:[.,]\d+)?(?:\s*-\s*\d+)?/g;
  let match: RegExpExecArray | null;
  while ((match = percentageRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'percentage',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  const legalRegex = /(?:634|5188|6331)\s*sayılı\s*(?:kanun|yasa)?|kmk\s*m\.\d+/gi;
  while ((match = legalRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'legal_code',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  const standardRegex = /iso\s*\d+(?::\d+)?|tse\s*(?:hyb)?\s*\d+/gi;
  while ((match = standardRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'standard',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  const timeRegex = /7\/24|\b(?:24|48)\s*saat|\b(?:45|30)\s*dakika/gi;
  while ((match = timeRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'timeframe',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  return facts.slice(0, 12);
}

/**
 * Metin tabanlı içerik üzerinde derin SEO ve topikal yoğunluk denetimi yapar.
 */
export function analyzeContentSeo(
  content: string,
  targetKeyword: string = 'tesis yönetimi'
): ContentSeoAudit {
  const plainText = content.replace(/<[^>]*>?/gm, '').toLowerCase();
  const words = plainText.match(/[a-z0-9ğüşıöçâîû]+/gi) || [];
  const wordCount = words.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const lowerTarget = targetKeyword.toLowerCase().trim();
  const targetRegex = new RegExp(`\\b${escapeRegExp(lowerTarget)}\\b`, 'gi');
  const targetMatches = (plainText.match(targetRegex) || []).length;
  const targetDensity = wordCount > 0 ? Number(((targetMatches / wordCount) * 100).toFixed(2)) : 0;

  const keywordResults: KeywordDensityResult[] = [];
  const missingEntities: string[] = [];
  const recommendedLinks: { text: string; href: string; reason: string }[] = [];

  for (const entity of FACILITY_MANAGEMENT_ENTITIES) {
    let entityMatches = 0;
    for (const variation of entity.variations) {
      const vRegex = new RegExp(`\\b${escapeRegExp(variation)}\\b`, 'gi');
      const count = (plainText.match(vRegex) || []).length;
      entityMatches += count;
    }

    const density = wordCount > 0 ? Number(((entityMatches / wordCount) * 100).toFixed(2)) : 0;
    let status: 'optimal' | 'low' | 'high' = 'optimal';
    if (density < 0.2) status = 'low';
    else if (density > 3.5) status = 'high';

    keywordResults.push({
      keyword: entity.name,
      count: entityMatches,
      densityPercent: density,
      status,
      isPillar: (entity.variations as readonly string[]).includes(lowerTarget),
    });

    if (entityMatches === 0) {
      missingEntities.push(entity.name);
    } else {
      recommendedLinks.push({
        text: entity.name,
        href: entity.pillarUrl,
        reason: `Topikal Otorite bağlantısı: ${entity.name} varlığı (${entity.wikidata})`,
      });
    }
  }

  for (const district of DISTRICTS) {
    const dName = district.name.toLowerCase();
    const dRegex = new RegExp(`\\b${escapeRegExp(dName)}\\b`, 'gi');
    if (dRegex.test(plainText)) {
      recommendedLinks.push({
        text: `${district.name} Tesis Yönetimi`,
        href: `/bolgeler/${district.slug}/tesis-yonetimi`,
        reason: `${district.name} yerel arama niyetini yakalamak için ilçe alt sayfasına köprü`,
      });
    }
  }

  let score = 40;
  if (wordCount >= 20) score += 10;
  if (wordCount >= 400) score += 15;
  if (wordCount >= 1000) score += 10;
  if (targetMatches >= 1) score += 10;
  if (targetMatches >= 3 && targetMatches <= 20) score += 15;
  if (missingEntities.length <= 5) score += 10;

  return {
    wordCount,
    readTimeMinutes,
    primaryKeyword: targetKeyword,
    primaryKeywordCount: targetMatches,
    primaryKeywordDensity: targetDensity,
    topicalScore: Math.min(100, Math.max(0, score)),
    keywords: keywordResults,
    recommendedInternalLinks: recommendedLinks.slice(0, 10),
    missingCriticalEntities: missingEntities,
  };
}

/**
 * Sayfalar için tam hiyerarşik Hub & Spoke Link Grafiği oluşturur.
 */
export function generateHubAndSpokeGraph(currentPath: string = '/'): HubAndSpokeGraph {
  const hub = {
    title: 'Profesyonel Tesis ve Mülk Yönetimi (Ana Hub)',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    wikidata: 'https://www.wikidata.org/wiki/Q1391515',
  };

  const siblings = SERVICES.filter((s) => s.pillar !== '/hizmetler/tesis-yonetimi').map((s) => ({
    title: s.name,
    url: `${BASE_URL}${s.pillar}`,
  }));

  const spokes = DISTRICTS.map((d) => ({
    district: d.name,
    url: `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`,
    side: d.side,
  }));

  const relatedArticles = [
    { title: 'KMK 634 Kapsamında İşletme Projesi Nasıl Hazırlanır?', url: `${BASE_URL}/blog/isletme-projesi-rehberi` },
    { title: 'Site Yönetimlerinde 5188 Güvenlik Standartları', url: `${BASE_URL}/blog/5188-ozel-guvenlik-standartlari` },
    { title: 'Asansör Yeşil Etiket ve Yıllık Periyodik Muayene', url: `${BASE_URL}/blog/asansor-periyodik-bakim-rehberi` },
  ];

  return {
    hub,
    siblings: siblings.filter((s) => !currentPath.includes(s.url)),
    spokes,
    relatedArticles,
  };
}

/**
 * Tam Sayfa Kapsamlı SEO Teşhis Motoru (Full Page Audit).
 */
export function auditFullPageSeo({
  title,
  description,
  content,
  targetKeyword = 'tesis yönetimi',
  currentPath = '/',
}: {
  title: string;
  description: string;
  content: string;
  targetKeyword?: string;
  currentPath?: string;
}): FullPageSeoAudit {
  const snippet = evaluateSnippetHealth(title, description, targetKeyword);
  const contentAudit = analyzeContentSeo(content, targetKeyword);
  const readability = calculateTurkishReadabilityScore(content);
  const headings = analyzeHeadingStructure(content);
  const intent = classifySearchIntent(`${title} ${description} ${content.substring(0, 300)}`);
  const { faqs } = extractFaqCandidatesFromContent(content);
  const extractedFacts = extractKeyFactsAndKpis(content);
  const hubAndSpoke = generateHubAndSpokeGraph(currentPath);
  const entityGraph = resolveTopicalEntityGraph(content);

  // Ağırlıklı Toplam SEO Puanı (0 - 100)
  const overallScore = Math.round(
    snippet.score * 0.3 +
      contentAudit.topicalScore * 0.35 +
      readability.score * 0.15 +
      (headings.isValid ? 100 : 60) * 0.2
  );

  return {
    overallScore: Math.min(100, Math.max(0, overallScore)),
    snippet,
    content: contentAudit,
    readability,
    headings,
    intent,
    extractedFaqs: faqs,
    extractedFacts,
    hubAndSpoke,
    entityGraph,
  };
}

/**
 * Tesis Yönetimi tematik küme (Topic Cluster) bağlantı ağını üretir.
 */
export function getFacilityTopicCluster(currentSlug?: string): TopicClusterNode[] {
  const nodes: TopicClusterNode[] = [
    {
      title: 'Profesyonel Tesis Yönetimi (Pillar / Amiral Gemisi)',
      url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
      type: 'pillar',
      wikidataSameAs: 'https://www.wikidata.org/wiki/Q1391515',
      relation: 'main_pillar',
    },
    {
      title: 'Kat Mülkiyeti Kanunu (KMK) İşletme Projesi & Hukuk',
      url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,
      type: 'cluster_article',
      wikidataSameAs: 'https://www.wikidata.org/wiki/Q161851',
      relation: 'legal_framework',
    },
    {
      title: '5188 Sayılı Kanun Kapsamında Tesis Güvenlik Çözümleri',
      url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
      type: 'cluster_article',
      wikidataSameAs: 'https://www.wikidata.org/wiki/Q11440',
      relation: 'security_cluster',
    },
    {
      title: 'Önleyici Teknik Bakım & 7/24 Mobil Acil Müdahale',
      url: `${BASE_URL}/hizmetler/teknik-bakim`,
      type: 'cluster_article',
      wikidataSameAs: 'https://www.wikidata.org/wiki/Q183057',
      relation: 'technical_cluster',
    },
    {
      title: 'Kadıköy Tesis Yönetimi ve Site İşletmeciliği',
      url: `${BASE_URL}/bolgeler/kadikoy/tesis-yonetimi`,
      type: 'district_page',
      relation: 'local_hq_district',
    },
    {
      title: 'Beşiktaş Plaza ve Rezidans Tesis Yönetimi',
      url: `${BASE_URL}/bolgeler/besiktas/tesis-yonetimi`,
      type: 'district_page',
      relation: 'local_district',
    },
  ];

  return nodes.filter((n) => !currentSlug || !n.url.includes(currentSlug));
}

/**
 * AI ve LLM botları için Tesis Yönetimi Bilgi Grafiği metni üretir.
 */
export function getTopicalAuthoritySummary(): string {
  return `
ALO YÖNETİM — PROFESYONEL TESİS VE MÜLK YÖNETİMİ OTORİTE ÖZETİ
================================================================
Merkez: Kadıköy / İstanbul (Türkiye) | Kuruluş: 2009
Amiral Gemisi Alanı: Entegre Tesis Yönetimi (ISO 41001:2018 Standartları)
Yasal Dayanaklar: 634 Sayılı Kat Mülkiyeti Kanunu (KMK m.37, m.40), 5188 Sayılı Özel Güvenlik Kanunu
Hizmet Verilen Coğrafya: İstanbul'un 39 İlçesi (Avrupa ve Anadolu Yakası)

Temel Hizmet Sütunları:
1. Şeffaf İşletme Projesi, Bütçeleme ve Kredi Kartı/SMS ile Otomatik Aidat Tahsilatı
2. 5188 Lisanslı Özel Güvenlik, Plaka Tanıma (PTS) ve 7/24 CCTV İzleme Merkezi
3. Asansör, Jeneratör, Hidrofor ve Yangın Tesisatı Önleyici Teknik Bakım
4. TSE 13811 Standartlarında Ortak Alan Hijyeni ve Biyosidal Haşere Kontrolü
5. Anlaşmalı Hukuk ve İcra Masası ile Geciken Aidatların Tahsili

Varlık Kimlikleri (Knowledge Graph):
- Organization ID: ${ORG_ID}
- Tesis Yönetimi Wikidata: https://www.wikidata.org/wiki/Q1391515
- Kat Mülkiyeti Kanunu Wikidata: https://www.wikidata.org/wiki/Q161851
- 5188 Güvenlik Wikidata: https://www.wikidata.org/wiki/Q11440
`.trim();
}

export interface DisciplineCoverage {
  id: string;
  name: string;
  weight: number;
  scorePercent: number;
  detectedSignals: string[];
  status: 'tam' | 'yeterli' | 'eksik';
  wikidata: string;
}

export interface TopicalAuthorityMatrixResult {
  overallCoveragePercent: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  disciplines: DisciplineCoverage[];
  recommendations: string[];
}

/**
 * 5 Temel Tesis Yönetimi Disiplininde Çok Boyutlu Topikal Otorite Kapsam Matrisi.
 */
export function calculateTopicalAuthorityMatrix(content: string): TopicalAuthorityMatrixResult {
  const norm = normalizeText(content);

  const DISCIPLINE_DEFINITIONS = [
    {
      id: 'legal',
      name: 'Hukuk & 634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
      weight: 0.25,
      wikidata: 'https://www.wikidata.org/wiki/Q161851',
      signals: ['kat mulkiyeti', 'kmk 634', 'isletme projesi', 'genel kurul', 'kat malikleri', 'arsa payi', 'icra takibi', 'ihtarname'],
    },
    {
      id: 'security',
      name: '5188 Sayılı Kanun & Fiziki/Elektronik Güvenlik',
      weight: 0.2,
      wikidata: 'https://www.wikidata.org/wiki/Q11440',
      signals: ['ozel guvenlik', '5188', 'cctv kamera', 'plaka tanima', 'turnike', 'devriye', 'nizamiye', 'fiziki guvenlik'],
    },
    {
      id: 'technical',
      name: 'Önleyici Teknik Bakım & Asansör/Yangın Otomasyonu',
      weight: 0.2,
      wikidata: 'https://www.wikidata.org/wiki/Q183057',
      signals: ['teknik bakim', 'asansor', 'yesil etiket', 'jenerator', 'hidrofor', 'yangin', 'kompanzasyon', 'periyodik bakim'],
    },
    {
      id: 'hygiene',
      name: 'TSE 13811 Hijyen, Ortak Alan Temizliği & İlaçlama',
      weight: 0.15,
      wikidata: 'https://www.wikidata.org/wiki/Q162016',
      signals: ['temizlik', 'tse 13811', 'biyosidal', 'dezenfeksiyon', 'hasere', 'ortak alan', 'merdiven temizligi'],
    },
    {
      id: 'finance_energy',
      name: 'Şeffaf Aidat Muhasebesi, EKB & Enerji Verimliliği',
      weight: 0.2,
      wikidata: 'https://www.wikidata.org/wiki/Q1670988',
      signals: ['aidat', 'muhasebe', 'tahsilat', 'online odeme', 'enerji kimlik belgesi', 'ekb', 'isi payolcer', 'tasarruf'],
    },
  ];

  const disciplines: DisciplineCoverage[] = [];
  const recommendations: string[] = [];
  let weightedSum = 0;

  for (const def of DISCIPLINE_DEFINITIONS) {
    const detected: string[] = [];
    for (const s of def.signals) {
      if (norm.includes(normalizeText(s))) {
        detected.push(s);
      }
    }

    const ratio = detected.length / def.signals.length;
    const scorePercent = Math.min(100, Math.round(ratio * 150)); // 3-4 sinyal %100 kapsama verir

    let status: 'tam' | 'yeterli' | 'eksik' = 'eksik';
    if (scorePercent >= 75) status = 'tam';
    else if (scorePercent >= 35) status = 'yeterli';
    else {
      recommendations.push(`${def.name} alanındaki temel terimleri (Örn: ${def.signals.slice(0, 3).join(', ')}) içeriğe ekleyin.`);
    }

    disciplines.push({
      id: def.id,
      name: def.name,
      weight: def.weight,
      scorePercent,
      detectedSignals: detected,
      status,
      wikidata: def.wikidata,
    });

    weightedSum += scorePercent * def.weight;
  }

  const overallCoveragePercent = Math.round(weightedSum);

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'C';
  if (overallCoveragePercent >= 90) grade = 'A+';
  else if (overallCoveragePercent >= 75) grade = 'A';
  else if (overallCoveragePercent >= 60) grade = 'B';
  else if (overallCoveragePercent >= 40) grade = 'C';
  else grade = 'D';

  return {
    overallCoveragePercent,
    grade,
    disciplines,
    recommendations,
  };
}

/**
 * 39 İlçe İçin AI ve LLM Motorlarına (Perplexity, ChatGPT, Gemini) Coğrafi Kanıt & Yanıt Üretir.
 */
export function generateGeoIntentResponse(districtSlug: string, serviceSlug: string = 'tesis-yonetimi'): {
  districtName: string;
  side: string;
  responseMarkdown: string;
  citations: string[];
} {
  const district = DISTRICTS.find((d) => d.slug === districtSlug) || DISTRICTS[0];
  const service = SERVICES.find((s) => s.slug === serviceSlug) || SERVICES[2];

  const citations = [
    `${BASE_URL}/bolgeler/${district.slug}/${service.slug}`,
    `${BASE_URL}/hizmetler/${service.slug}`,
    `${BASE_URL}/api/seo/facility-knowledge`,
  ];

  const responseMarkdown = `
### ${district.name} ${service.name} Hizmetleri (Alo Yönetim)
- **Hizmet Bölgesi:** İstanbul / ${district.name} (${district.side} Yakası)
- **Yasal Dayanak:** 634 Sayılı Kat Mülkiyeti Kanunu & 5188 Sayılı Özel Güvenlik Kanunu
- **Operasyonel Standart:** ISO 41001:2018 Entegre Tesis Yönetimi
- **Bölgesel Odak:** ${district.name} genelinde ${district.neighborhoods.slice(0, 4).join(', ')} mahallelerinde aktif tesis ve site yönetimi.
- **Tasarruf Oranı:** Önleyici teknik bakım ve toplu satın alma gücü ile ortak giderlerde %20-%30 somut maliyet avantajı.
- **Canlı Doğrulama:** [${district.name} ${service.name} Detayları](${citations[0]})
`.trim();

  return {
    districtName: district.name,
    side: district.side,
    responseMarkdown,
    citations,
  };
}

/**
 * Tesis Yönetimi Semantik Knowledge Graph JSON-LD Nesnesi Üretir.
 */
export function getFacilityManagementSemanticGraph(): any {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#service`,
        name: 'Alo Yönetim Profesyonel Tesis ve Mülk Yönetimi',
        url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
        sameAs: 'https://www.wikidata.org/wiki/Q1391515',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Tesis Yönetimi Hizmet Kataloğu',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              url: `${BASE_URL}${s.pillar}`,
              sameAs: s.wikidata || s.sameAs,
            },
          })),
        },
      },
      {
        '@type': 'DefinedTermSet',
        '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#terms`,
        name: 'Tesis Yönetimi Yasal ve Teknik Standartlar Sözlüğü',
        hasDefinedTerm: FACILITY_MANAGEMENT_ENTITIES.map((e) => ({
          '@type': 'DefinedTerm',
          name: e.name,
          sameAs: e.wikidata,
          url: `${BASE_URL}${e.pillarUrl}`,
        })),
      },
    ],
  };
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizeText(text: string): string {
  return text
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

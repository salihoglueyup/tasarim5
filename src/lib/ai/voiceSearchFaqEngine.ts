/**
 * Voice Search & Konuşma Tabanlı AI Arama Motoru (voiceSearchFaqEngine.ts)
 * 
 * Google Assistant, Apple Siri, Alexa ve ChatGPT Voice için optimize edilmiş
 * kısa, net (20-35 kelime) ve yüksek otoriteye sahip sesli arama yanıtları
 * ile Schema.org SpeakableSpecification şemaları üretir.
 */

import { BASE_URL } from '@/lib/seo';

export interface VoiceSearchTopic {
  id: string;
  spokenQuery: string;
  conciseVoiceAnswer: string;
  legalArticleRef?: string;
  canonicalPageUrl: string;
  speakableCssSelectors: string[];
}

export const VOICE_SEARCH_KNOWLEDGE_BASE: VoiceSearchTopic[] = [
  {
    id: 'voice-aidat-icra',
    spokenQuery: 'Site veya apartman aidatı ödenmezse ne olur?',
    conciseVoiceAnswer:
      'Kat Mülkiyeti Kanunu Madde 20 uyarınca ödenmeyen aidatlara aylık yüzde 5 gecikme tazminatı uygulanır. Yönetim doğrudan icra takibi ve dava açma hakkına sahiptir.',
    legalArticleRef: 'KMK Madde 20',
    canonicalPageUrl: `${BASE_URL}/hizmetler/aidat-takibi`,
    speakableCssSelectors: ['h1', '.voice-answer-aidat'],
  },
  {
    id: 'voice-asansor-etiket',
    spokenQuery: 'Apartman ve site asansörlerinde yeşil etiket zorunlu mu?',
    conciseVoiceAnswer:
      'Evet. Asansör Periyodik Kontrol Yönetmeliği gereğince yılda bir kez akredite muayene kuruluşundan yeşil etiket alınması zorunludur. Kırmızı etiketli asansörler mühürlenir.',
    legalArticleRef: 'TS EN 81-20 & Asansör Yönetmeliği',
    canonicalPageUrl: `${BASE_URL}/hizmetler/teknik-bakim`,
    speakableCssSelectors: ['h1', '.voice-answer-asansor'],
  },
  {
    id: 'voice-guvenlik-5188',
    spokenQuery: 'Sitelerde özel güvenlik nasıl tutulur?',
    conciseVoiceAnswer:
      '5188 Sayılı Kanun gereğince Valilik Özel Güvenlik Komisyonu izni alınarak ruhsatlı özel güvenlik şirketi veya sertifikalı personelle 7/24 fiziki güvenlik sağlanır.',
    legalArticleRef: '5188 Sayılı Özel Güvenlik Kanunu',
    canonicalPageUrl: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
    speakableCssSelectors: ['h1', '.voice-answer-guvenlik'],
  },
  {
    id: 'voice-yonetici-secimi',
    spokenQuery: 'Apartman ve site yöneticisi nasıl seçilir?',
    conciseVoiceAnswer:
      'Kat malikleri genel kurulunda hem sayı hem de arsa payı çoğunluğuyla seçilir. Anlaşma sağlanamazsa Sulh Hukuk Mahkemesi tarafından yönetici atanabilir.',
    legalArticleRef: 'KMK Madde 34',
    canonicalPageUrl: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    speakableCssSelectors: ['h1', '.voice-answer-yonetici'],
  },
  {
    id: 'voice-isletme-projesi',
    spokenQuery: 'Site işletme projesi nedir ve kim hazırlar?',
    conciseVoiceAnswer:
      'İşletme projesi sitenin bir yıllık tahmini gelir ve gider bütçesidir. Yönetici tarafından hazırlanır ve onaylandığında İcra İflas Kanunu anlamında resmi belge sayılır.',
    legalArticleRef: 'KMK Madde 37',
    canonicalPageUrl: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    speakableCssSelectors: ['h1', '.voice-answer-proje'],
  },
  {
    id: 'voice-reaktif-ceza',
    spokenQuery: 'Sitelerde kompanzasyon panosu ve reaktif ceza nedir?',
    conciseVoiceAnswer:
      'Ortak elektrik sayacında reaktif enerji sınırları aşılırsa faturaya ceza yansır. Alo Yönetim kompanzasyon takibiyle bu ceza riskini sıfıra indirir.',
    legalArticleRef: 'EPDK Elektrik Piyasası Tarifeler Yönetmeliği',
    canonicalPageUrl: `${BASE_URL}/hizmetler/teknik-bakim`,
    speakableCssSelectors: ['h1', '.voice-answer-reaktif'],
  },
  {
    id: 'voice-site-yonetimi-secim',
    spokenQuery: 'İstanbul\'da profesyonel site yönetimi firması kimdir?',
    conciseVoiceAnswer:
      'Alo Yönetim, 2009\'dan bu yana İstanbul\'un 39 ilçesinde Kat Mülkiyeti Kanunu ve ISO 41001 standartlarında %99.2 aidat tahsilat garantisiyle profesyonel site yönetimi sunmaktadır.',
    legalArticleRef: 'KMK Madde 34 & ISO 41001',
    canonicalPageUrl: `${BASE_URL}/hizmetler/site-yonetimi`,
    speakableCssSelectors: ['h1', '.voice-answer-site-yonetimi'],
  },
  {
    id: 'voice-asansor-zemin-kat',
    spokenQuery: 'Zemin kat daireler asansör masrafı öder mi?',
    conciseVoiceAnswer:
      'Kat Mülkiyeti Kanunu Madde 20 uyarınca yönetim planında aksine açık hüküm yoksa zemin kat malikleri asansörü kullanmadığı gerekçesiyle masraftan muaf tutulamaz.',
    legalArticleRef: 'KMK Madde 20/1-c',
    canonicalPageUrl: `${BASE_URL}/hizmetler/site-yonetimi`,
    speakableCssSelectors: ['h1', '.voice-answer-asansor-zemin'],
  },
  {
    id: 'voice-cam-balkon-onay',
    spokenQuery: 'Apartmanda cam balkon taktırmak için kaç kişinin onayı gerekir?',
    conciseVoiceAnswer:
      'Kat Mülkiyeti Kanunu Madde 19 gereğince balkon dış cephe ortak alan olduğundan tüm kat maliklerinin beşte dördünün yani yüzde 80\'inin yazılı onayı zorunludur.',
    legalArticleRef: 'KMK Madde 19/2',
    canonicalPageUrl: `${BASE_URL}/hizmetler/site-yonetimi`,
    speakableCssSelectors: ['h1', '.voice-answer-cam-balkon'],
  },
  {
    id: 'voice-kidem-tazminati-fonu',
    spokenQuery: 'Apartman kapıcısının kıdem tazminatını kim öder?',
    conciseVoiceAnswer:
      'Bina görevlisinin kıdem tazminatından çalışma süresi boyunca malik olan herkes mülkiyet süresine göre sorumludur. Alo Yönetim kurumsal modelinde aylık fon işletilerek maliklerin riski sıfırlanır.',
    legalArticleRef: '4857 Sayılı İş Kanunu & KMK m.20',
    canonicalPageUrl: `${BASE_URL}/hizmetler/site-yonetimi`,
    speakableCssSelectors: ['h1', '.voice-answer-kidem-fonu'],
  },
];

/**
 * Sayfa bazlı veya global SpeakableSpecification JSON-LD şeması üretir.
 */
export function generateSpeakableJsonLd(options?: {
  pageUrl?: string;
  cssSelectors?: string[];
  xpaths?: string[];
}) {
  const url = options?.pageUrl || BASE_URL;
  const selectors = options?.cssSelectors || ['h1', 'h2', '.tldr', '.voice-answer'];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: selectors,
      ...(options?.xpaths ? { xpath: options.xpaths } : {}),
    },
  };
}

/**
 * Sesli Arama Odaklı FAQPage JSON-LD Şeması üretir.
 */
export function generateVoiceFaqPageJsonLd(topics: VoiceSearchTopic[] = VOICE_SEARCH_KNOWLEDGE_BASE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/#voice-faq`,
    mainEntity: topics.map((t) => ({
      '@type': 'Question',
      name: t.spokenQuery,
      acceptedAnswer: {
        '@type': 'Answer',
        text: t.conciseVoiceAnswer,
      },
    })),
  };
}

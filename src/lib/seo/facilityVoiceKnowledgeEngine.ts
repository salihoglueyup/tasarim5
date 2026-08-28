import { BASE_URL } from '@/lib/seo';

export interface VoiceSearchQAItem {
  id: string;
  queryIntent: 'informational' | 'commercial' | 'legal' | 'transactional';
  voiceQuery: string;
  speakableAnswer: string;
  detailedExplanation: string;
  legalReference?: string;
  targetKeyword: string;
}

export interface VoiceKnowledgeGraph {
  totalQuestionsCount: number;
  lastUpdated: string;
  canonicalSource: string;
  questions: VoiceSearchQAItem[];
  speakableSchemaJsonLd: Record<string, any>;
}

/**
 * Tesis Yönetimi Sesli Arama (Voice Search) ve Konuşma Tabanlı AI Yanıt Motoru.
 * 
 * Google Featured Snippet (0. Sıra), Sesli Asistanlar (Google Assistant, Siri)
 * ve LLM Arama Motorları için optimize edilmiş doğrudan, net ve otoriter yanıtlar üretir.
 */
export function buildFacilityVoiceKnowledge(lang: string = 'tr'): VoiceKnowledgeGraph {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const canonicalSource = `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`;

  const questions: VoiceSearchQAItem[] = [
    {
      id: 'kmk-yonetici-aidat-muafiyeti',
      queryIntent: 'legal',
      voiceQuery: 'Site yöneticisi aidat öder mi?',
      speakableAnswer: 'Kat Mülkiyeti Kanunu Madde 40 uyarınca yönetim planında aksine hüküm yoksa yönetici işletme giderlerinin yarısını ödemekten muaf tutulabilir. Profesyonel yönetim şirketlerinde ise tüm malikler aidatını tam öder.',
      detailedExplanation: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) 40. maddesine göre kat malikleri arasından seçilen yöneticinin genel yönetim giderlerine katılma payı kararlaştırılabilir. Profesyonel dış yönetim firmalarında bağımsız malik hakları korunarak şeffaf muhasebe sağlanır.',
      legalReference: '634 Sayılı KMK Madde 40',
      targetKeyword: 'site yöneticisi aidat öder mi',
    },
    {
      id: 'kmk-isletme-projesi-itiraz-suresi',
      queryIntent: 'legal',
      voiceQuery: 'İşletme projesine kaç günde itiraz edilir?',
      speakableAnswer: 'İşletme projesine tebliğ tarihinden itibaren 7 gün içinde yazılı olarak itiraz edilmelidir. 7 gün içinde itiraz edilmeyen işletme projesi kesinleşir ve icra takibine esas belge niteliği kazanır.',
      detailedExplanation: 'KMK Madde 37 gereğince yöneticinin hazırladığı bütçe maliklere taahhütlü mektup veya imza karşılığı tebliğ edilir. Süresinde itiraz edilmezse bütçe kesinleşir ve İcra İflas Kanunu 68. madde uyarınca ilamsız icra takibine başlanabilir.',
      legalReference: '634 Sayılı KMK Madde 37',
      targetKeyword: 'işletme projesine itiraz süresi',
    },
    {
      id: 'kmk-gecikme-tazminati-orani',
      queryIntent: 'legal',
      voiceQuery: 'Gününde ödenmeyen aidata ne kadar gecikme faizi uygulanır?',
      speakableAnswer: 'Gününde ödenmeyen aidat ve avans borçları için Kat Mülkiyeti Kanunu Madde 20 uyarınca aylık yüzde 5 gecikme tazminatı uygulanır.',
      detailedExplanation: 'Gecikme tazminatı yasal faizden bağımsız olarak kanun gereği zorunludur. Yönetim kurulu veya profesyonel yönetici ödeme yapmayan malik hakkında icra takibi ve dava açma hakkına sahiptir.',
      legalReference: '634 Sayılı KMK Madde 20/c',
      targetKeyword: 'aidat gecikme faizi oranı',
    },
    {
      id: 'iso-41001-tesis-yonetimi-nedir',
      queryIntent: 'informational',
      voiceQuery: 'Tesis yönetiminde ISO 41001 standardı nedir?',
      speakableAnswer: 'ISO 41001 uluslararası entegre tesis yönetim standardıdır. Tesislerde teknik bakım, enerji verimliliği, güvenlik ve yaşam kalitesini ölçülebilir KPI standartlarına bağlar.',
      detailedExplanation: 'Alo Yönetim, ISO 41001:2018 sertifikası ile tesislerde yüzde 30 maliyet tasarrufu, 30 dakikanın altında acil teknik müdahale ve 7/24 şeffaf dijital denetim sunar.',
      legalReference: 'ISO 41001:2018 Facility Management System',
      targetKeyword: 'iso 41001 tesis yönetimi',
    },
    {
      id: 'ozel-guvenlik-5188-zorunlulugu',
      queryIntent: 'commercial',
      voiceQuery: 'Sitelerde özel güvenlik çalıştırmak için hangi izinler gerekir?',
      speakableAnswer: 'Sitelerde özel güvenlik personeli istihdam etmek için Valilik Özel Güvenlik Komisyonu izni ve 5188 sayılı kanun kapsamında lisanslı güvenlik şirketi partnerliği zorunludur.',
      detailedExplanation: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun gereğince kimlik kartı olmayan personelin güvenlik unvanıyla çalıştırılması yasal suçtur. Alo Yönetim 5188 lisanslı güvenlik partnerliği ile yasal güvence sağlar.',
      legalReference: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
      targetKeyword: 'site özel güvenlik izinleri 5188',
    },
    {
      id: 'profesyonel-tesis-yonetimi-avantajlari',
      queryIntent: 'transactional',
      voiceQuery: 'Neden profesyonel tesis yönetim şirketi tercih edilmelidir?',
      speakableAnswer: 'Profesyonel tesis yönetimi komşuluk ilişkilerini zedelemeden aidat tahsilatını yüzde 98 üzerine çıkarır, toplu satın alma gücüyle bütçede yüzde 30 tasarruf sağlar ve hukuki riskleri sıfırlar.',
      detailedExplanation: 'Alo Yönetim, KMK uzmanı hukukçular, 5188 lisanslı güvenlik şefleri ve sertifikalı teknik ekiplerle binaları kurumsal standartlarda yöneterek gayrimenkul değerini artırır.',
      legalReference: 'KMK Madde 34 Yönetici Seçimi',
      targetKeyword: 'profesyonel tesis yönetimi avantajları',
    },
  ];

  const speakableSchemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    '@id': `${canonicalSource}#voice-qa`,
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.voiceQuery,
      text: q.voiceQuery,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.detailedExplanation,
        inLanguage: lang,
        url: `${canonicalSource}#${q.id}`,
        author: {
          '@type': 'Organization',
          name: 'Alo Yönetim',
          url: BASE_URL,
        },
      },
    })),
    speakable: {
      '@type': 'SpeakableSpecification',
      xpath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content",
        "//div[contains(@class, 'voice-faq-answer')]"
      ],
    },
  };

  return {
    totalQuestionsCount: questions.length,
    lastUpdated: '2026-08-28T09:00:00+03:00',
    canonicalSource,
    questions,
    speakableSchemaJsonLd,
  };
}

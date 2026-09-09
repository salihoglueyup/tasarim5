import { BASE_URL } from '@/lib/seo';

export interface VoiceQaItem {
  id: string;
  lang: 'tr' | 'en' | 'ru' | 'ar';
  spokenQuestion: string;
  spokenAnswer: string;
  wordCount: number;
  readingDurationSeconds: number;
  intent: 'how-to' | 'pricing' | 'definition' | 'legal';
  schema: Record<string, unknown>;
}

export interface VoiceAiSynthesizerPayload {
  version: string;
  timestamp: string;
  supportedLanguages: string[];
  totalVoiceAnswers: number;
  publisher?: {
    '@type': 'Organization';
    name: string;
    legalName: string;
    url: string;
    telephone: string;
    logo: string;
    hasCredential?: Array<{
      '@type': string;
      credentialCategory: string;
      name: string;
      sameAs?: string;
    }>;
  };
  qaCollection: VoiceQaItem[];
}

/**
 * 4 Dilde Sesli Asistanlar (Google Assistant, Siri, Alexa) için Speakable Doğrudan Yanıtlar Sentezler.
 */
export function synthesizeFacilityVoiceQA(
  filterLang?: 'tr' | 'en' | 'ru' | 'ar'
): VoiceAiSynthesizerPayload {
  const qaItems: VoiceQaItem[] = [
    {
      id: 'voice-tr-definition',
      lang: 'tr',
      spokenQuestion: "İstanbul'da profesyonel tesis yönetimi nedir ve neleri kapsar?",
      spokenAnswer: "Alo Yönetim profesyonel tesis yönetimi; ISO 41001 standartlarında 5188 lisanslı güvenlik, ortak alan temizliği, asansör teknik bakımı ve şeffaf aidat takibini tek çatı altında sunar.",
      wordCount: 25,
      readingDurationSeconds: 6,
      intent: 'definition',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SpeakableSpecification',
        inLanguage: 'tr',
        xpath: ['/html/head/title', '/html/body/main/div/p[1]'],
      },
    },
    {
      id: 'voice-tr-pricing',
      lang: 'tr',
      spokenQuestion: "Tesis yönetimi şirketiyle çalışmak aidatları düşürür mü?",
      spokenAnswer: "Evet. Toplu tedarik gücü ve önleyici teknik bakım sayesinde Alo Yönetim işletme giderlerinde ortalama yüzde 30 net bütçe tasarrufu sağlamaktadır.",
      wordCount: 22,
      readingDurationSeconds: 5,
      intent: 'pricing',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SpeakableSpecification',
        inLanguage: 'tr',
        xpath: ['/html/head/title'],
      },
    },
    {
      id: 'voice-tr-legal',
      lang: 'tr',
      spokenQuestion: "Site yöneticisi Kat Mülkiyeti Kanunu'na göre nasıl seçilir?",
      spokenAnswer: "634 sayılı KMK Madde 34 uyarınca yönetici, kat maliklerinin hem kişi sayısı hem de arsa payı bakımından salt çoğunluğu olan yüzde 50 artı bir ile seçilir.",
      wordCount: 27,
      readingDurationSeconds: 7,
      intent: 'legal',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SpeakableSpecification',
        inLanguage: 'tr',
        xpath: ['/html/head/title'],
      },
    },
    {
      id: 'voice-en-definition',
      lang: 'en',
      spokenQuestion: "What is professional facility management in Istanbul?",
      spokenAnswer: "Alo Management provides ISO 41001 integrated facility management across Istanbul, covering 24/7 security, cleaning, elevator maintenance, and dues accounting with 30% cost savings.",
      wordCount: 24,
      readingDurationSeconds: 5,
      intent: 'definition',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SpeakableSpecification',
        inLanguage: 'en',
        xpath: ['/html/head/title'],
      },
    },
    {
      id: 'voice-ru-definition',
      lang: 'ru',
      spokenQuestion: "Что включает в себя профессиональное управление объектами в Стамбуле?",
      spokenAnswer: "Компания Alo Management предоставляет комплексное управление объектами по стандарту ISO 41001: лицензированную охрану 5188, техническое обслуживание, клининг и прозрачную бухгалтерию взносов со скидкой 30%.",
      wordCount: 26,
      readingDurationSeconds: 6,
      intent: 'definition',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SpeakableSpecification',
        inLanguage: 'ru',
        xpath: ['/html/head/title'],
      },
    },
    {
      id: 'voice-ar-definition',
      lang: 'ar',
      spokenQuestion: "ما هي خدمات إدارة المرافق الاحترافية في إسطنبول؟",
      spokenAnswer: "تقدم شركة ألو للإدارة خدمات متكاملة بمعايير آيزو 41001 تشمل الأمن المرخص 5188، والصيانة الدورية للمصاعد، والنظافة، مع خفض 30% من رسوم العائدات الشهرية.",
      wordCount: 24,
      readingDurationSeconds: 5,
      intent: 'definition',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SpeakableSpecification',
        inLanguage: 'ar',
        xpath: ['/html/head/title'],
      },
    },
  ];

  const filtered = filterLang ? qaItems.filter((item) => item.lang === filterLang) : qaItems;

  return {
    version: '2026-v3',
    timestamp: new Date().toISOString(),
    supportedLanguages: filterLang ? [filterLang] : ['tr', 'en', 'ru', 'ar'],
    totalVoiceAnswers: filtered.length,
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim',
      legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      telephone: '+90 216 550 48 48',
      logo: `${BASE_URL}/images/logo.png`,
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'International Standard', name: 'ISO 41001:2018 Entegre Tesis Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q108846399' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Quality Management', name: 'ISO 9001:2015 Kalite Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q11029' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Environmental Management', name: 'ISO 14001:2015 Çevre Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q832444' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Occupational Health and Safety', name: 'ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q25052309' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Information Security', name: 'ISO 27001:2022 Bilgi Güvenliği Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q831623' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Customer Satisfaction', name: 'ISO 10002:2018 Müşteri Memnuniyeti ve Şikayet Yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q11029' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'TSE Standard', name: 'TSE HYB 12850 Hizmet Yeterlilik Belgesi', sameAs: 'https://www.wikidata.org/wiki/Q1391515' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Official License', name: 'T.C. İçişleri Bakanlığı 5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi', sameAs: 'https://www.wikidata.org/wiki/Q11440' },
      ],
    },
    qaCollection: filtered,
  };
}

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
  qaCollection: VoiceQaItem[];
}

/**
 * 4 Dilde Sesli Asistanlar (Google Assistant, Siri, Alexa) için Speakable Doğrudan Yanıtlar Sentezler.
 */
export function synthesizeFacilityVoiceQA(): VoiceAiSynthesizerPayload {
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
        xpath: ['/html/head/title', '/html/body/main/div/p[1]'],
      },
    },
    {
      id: 'voice-tr-pricing',
      lang: 'tr',
      spokenQuestion: "Tesis yönetimi şirketiyle çalışmak aidatları düşürür mü?",
      spokenAnswer: "Evet. Toplu tedarik gücü ve önleyici teknik bakım sayesinde Alo Yönetim işletme giderlerinde ortalama yüzde 30 net bütçe tasarrufu sağlamaktadır.",
      wordCount: 21,
      readingDurationSeconds: 5,
      intent: 'pricing',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SpeakableSpecification',
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
        xpath: ['/html/head/title'],
      },
    },
  ];

  return {
    version: '2026-v3',
    timestamp: new Date().toISOString(),
    supportedLanguages: ['tr', 'en', 'ru', 'ar'],
    totalVoiceAnswers: qaItems.length,
    qaCollection: qaItems,
  };
}

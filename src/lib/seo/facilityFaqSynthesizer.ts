import { getDistrict } from '@/data/districts';

export interface SynthesizedFaqItem {
  question: string;
  answer: string;
  topic: 'KMK_634' | 'SECURITY_5188' | 'TECHNICAL_SLA' | 'COST_SAVINGS';
}

export interface SynthesizedDistrictFaqResult {
  districtName: string;
  districtSlug: string;
  facilityContext: string;
  faqs: SynthesizedFaqItem[];
  schema: {
    '@context': string;
    '@type': string;
    mainEntity: Array<{
      '@type': string;
      name: string;
      acceptedAnswer: {
        '@type': string;
        text: string;
      };
    }>;
  };
}

/**
 * İlçe profiline ve bina tipine göre dinamik, hiper-yerel ve benzersiz SSS JSON-LD şemaları sentezler.
 */
export function synthesizeDistrictFacilityFaq(
  districtSlug: string = 'kadikoy'
): SynthesizedDistrictFaqResult {
  const district = getDistrict(districtSlug) || { name: 'Kadıköy', slug: 'kadikoy', side: 'Anadolu' };
  const dName = district.name;
  const isAnadolu = district.side === 'Anadolu';

  const isHighDensitySite = ['basaksehir', 'beylikduzu', 'esenyurt', 'cekmekoy', 'sancaktepe', 'atasehir', 'pendik'].includes(district.slug);
  const isCommercialHub = ['sisli', 'besiktas', 'sariyer', 'bakirkoy', 'kadikoy'].includes(district.slug);

  const faqs: SynthesizedFaqItem[] = [];

  // 1. Genel Tesis Yönetimi & Bölgesel SLA
  faqs.push({
    question: `${dName} bölgesinde profesyonel tesis yönetimi acil müdahale süresi ne kadardır?`,
    answer: `Alo Yönetim, ${dName} ilçesindeki tüm apartman ve sitelere mobil teknik ekipleriyle en fazla 45 dakika içinde yerinde müdahale SLA garantisi sunmaktadır. 7/24 kesintisiz arıza hattımız aktiftir.`,
    topic: 'TECHNICAL_SLA',
  });

  // 2. İlçe Profiline Göre Özelleştirilmiş Soru
  if (isHighDensitySite) {
    faqs.push({
      question: `${dName} toplu konut ve çok bloklu sitelerde güvenlik ve peyzaj nasıl yönetilir?`,
      answer: `${dName} bölgesindeki geniş sitelerde 5188 sayılı kanuna uygun fiziki güvenlik vardiyaları, TSE onaylı otomatik bahçe sulama ve havuz kimyasal denetimleri entegre tek işletme projesi altında yönetilir.`,
      topic: 'SECURITY_5188',
    });
  } else if (isCommercialHub) {
    faqs.push({
      question: `${dName} plazalarında ve butik tesislerde yönetim devri nasıl yapılır?`,
      answer: `${dName} lokasyonundaki ticari tesis ve rezidanslarda devir teslim süreci 48 saat içinde şeffaf denetim tutanağıyla tamamlanır; bağımsız bölüm sakinleri hiçbir hizmet kesintisi yaşamaz.`,
      topic: 'KMK_634',
    });
  } else {
    faqs.push({
      question: `${dName} apartmanlarında kentsel dönüşüm sonrası yönetim nasıl kurulur?`,
      answer: `${dName} genelindeki yeni yapılarda KMK Madde 34 gereğince ilk Kat Malikleri Genel Kurulu organize edilir, yönetim planı tescil edilir ve yasal işletme projesi hazırlanır.`,
      topic: 'KMK_634',
    });
  }

  // 3. Aidat & Tasarruf
  faqs.push({
    question: `${dName} tesis yönetimi şirketiyle çalışmak aidat maliyetini nasıl etkiler?`,
    answer: `Toplu enerji alımları, periyodik asansör/jeneratör koruyucu bakımı ve merkezi tedarik anlaşmaları sayesinde ${dName} genelindeki tesislerde genel giderlerde %20 ile %30 arasında somut tasarruf sağlanır.`,
    topic: 'COST_SAVINGS',
  });

  // 4. Hukuki Güvence
  faqs.push({
    question: `${dName} sitelerinde geciken aidatlara hangi yasal faiz uygulanır?`,
    answer: `634 sayılı KMK Madde 20/2 uyarınca geciken aidatlara aylık %5 yasal gecikme tazminatı işletilir. Alo Yönetim hukuk müşavirliği icra süreçlerini sulh içinde ve şeffafça yürütür.`,
    topic: 'KMK_634',
  });

  const schema = {
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
  };

  return {
    districtName: dName,
    districtSlug: district.slug,
    facilityContext: `${isAnadolu ? 'Anadolu Yakası' : 'Avrupa Yakası'} — ${dName} Tesis Yönetimi`,
    faqs,
    schema,
  };
}

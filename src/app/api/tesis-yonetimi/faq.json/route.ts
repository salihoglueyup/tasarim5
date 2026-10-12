import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

const FAQS = [
  {
    group: 'genel',
    question: 'Profesyonel tesis yönetimi neleri kapsar?',
    answer:
      'Tesis yönetimi; 5188 sayılı Kanun kapsamında güvenlik, ortak alan temizliği, asansör ve jeneratör gibi sistemlerin teknik bakımı, aidat takibi, peyzaj ve havuz bakımı ile idari işletmeyi kapsar. Kapsam, sözleşmede kalem kalem belirlenir.',
  },
  {
    group: 'genel',
    question: 'Tesis yönetimi hangi bina tiplerine hizmet verir?',
    answer:
      'Apartman, site, rezidans, ticari plaza, ofis binası, toplu konut ve sanayi tesisi gibi çok katlı veya karma kullanımlı yapılara hizmet verilebilir.',
  },
  {
    group: 'genel',
    question: 'Entegre tesis yönetimi ile tek tek hizmet almak arasındaki fark nedir?',
    answer:
      'Entegre modelde güvenlik, temizlik, teknik bakım ve aidat takibi tek sözleşme ve tek koordinasyon altında yürütülür. Hizmetler ayrı ayrı alındığında koordinasyon sorumluluğu yönetimde kalır.',
  },
  {
    group: 'maliyet',
    question: 'Tesis yönetimi ücreti nasıl belirlenir?',
    answer:
      'Ücret; bağımsız bölüm sayısı, ortak alan büyüklüğü, istenen hizmet kalemleri ve hizmet sıklığına göre belirlenir. Ücretsiz keşif sonrasında kalemleri ayrıştırılmış yazılı teklif sunulur.',
  },
  {
    group: 'hukuki',
    question: 'Aidatını ödemeyen kat malikine karşı hangi yollar vardır?',
    answer:
      'KMK m.20 uyarınca ödemede geciktiği günler için aylık yüzde beş gecikme tazminatı işler; yönetici veya diğer kat malikleri dava açabilir ya da icra takibi yapabilir. Somut durum için avukata danışılmalıdır.',
  },
  {
    group: 'hukuki',
    question: 'Yönetim planı nasıl değiştirilir?',
    answer:
      'Genel yapılarda KMK m.28/3 uyarınca bütün kat maliklerinin beşte dördünün oyu gerekir; birden fazla yapıdan oluşan toplu yapılarda 7579 sayılı Kanun\'la değişen KMK m.70 uyarınca üçte ikinin oyu aranır.',
  },
  {
    group: 'hukuki',
    question: '2026\'da Kat Mülkiyeti Kanunu\'nda ne değişti?',
    answer:
      '22 Mayıs 2026 tarihli ve 33261 sayılı Resmî Gazete\'de yayımlanan 7579 sayılı Kanun KMK m.35, 37 ve 70\'i değiştirdi. Ayrıntılar: ' + BASE_URL + '/kmk-2026-degisiklikleri',
  },
  {
    group: 'teknik',
    question: 'Asansör periyodik kontrolü (yeşil etiket) zorunlu mudur?',
    answer:
      'Evet. Asansör İşletme ve Bakım Yönetmeliği uyarınca asansörler yetkili servis tarafından bakımdan geçirilir ve yılda bir kez akredite A tipi muayene kuruluşunca denetlenir; kırmızı etiketli asansör kullanılmamalıdır.',
  },
  {
    group: 'teknik',
    question: 'Sitelerde özel güvenlik nasıl sağlanır?',
    answer:
      '5188 sayılı Kanun kapsamında Valilik nezdinde özel güvenlik izni alınarak lisanslı ve eğitimli özel güvenlik görevlileri istihdam edilir.',
  },
  {
    group: 'surec',
    question: 'Acil teknik arızalara ne kadar sürede müdahale edilir?',
    answer:
      "Yazılı SLA kapsamında acil teknik müdahale hedefi Anadolu Yakası'nda 30 dakika, Avrupa Yakası'nda 1 saattir. Süre, sözleşmedeki SLA hükümlerine bağlıdır.",
  },
  {
    group: 'kalite',
    question: 'Alo Yönetim kaç yıldır faaliyet gösteriyor?',
    answer:
      "Alo Yönetim 2009'dan beri faaliyet gösterir. Yaklaşık 90 kişilik ekibi ofis ve saha çalışanlarından oluşur; İstanbul'un 39 ilçesinde hizmet verebilir. Referans listesi: " + BASE_URL + '/referanslar',
  },
];

export async function GET(req: Request) {
  let groupFilter: string | null = null;
  let queryFilter: string | null = null;

  if (req && req.url) {
    try {
      const { searchParams } = new URL(req.url);
      groupFilter = searchParams.get('group');
      queryFilter = searchParams.get('q');
    } catch {
      // noop
    }
  }

  let filteredFaqs = FAQS;

  if (groupFilter) {
    const cleanGroup = groupFilter.trim().toLowerCase();
    filteredFaqs = filteredFaqs.filter((faq) =>
      faq.group.toLowerCase() === cleanGroup
    );
  }

  if (queryFilter) {
    const cleanQ = queryFilter.trim().toLowerCase();
    filteredFaqs = filteredFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(cleanQ) ||
        faq.answer.toLowerCase().includes(cleanQ)
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/hizmetler/tesis-yonetimi#faq`,
    name: 'Tesis Yönetimi Sıkça Sorulan Sorular',
    url: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    inLanguage: 'tr-TR',
    mainEntity: filteredFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const response = {
    meta: {
      title: 'Tesis Yönetimi SSS — Alo Yönetim',
      description: `${filteredFaqs.length} soru-cevap: maliyet, süreç, hukuki, teknik ve sektörel tesis yönetimi sorularına kapsamlı yanıtlar.`,
      totalQuestions: FAQS.length,
      totalFiltered: filteredFaqs.length,
      appliedFilter: {
        group: groupFilter,
        q: queryFilter,
      },
      groups: ['genel', 'maliyet', 'surec', 'hukuki', 'teknik', 'sektoral', 'bolgesel', 'kalite'],
      lastUpdated: new Date().toISOString().split('T')[0],
      sourceUrl: `${BASE_URL}/hizmetler/tesis-yonetimi`,
    },
    jsonLd,
    faqs: filteredFaqs,
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}

/**
 * Çift Çekirdekli (Dual-Core) Sesli Arama & AI Assistant Soru-Cevap Motoru (Alo Yönetim)
 * 
 * Google Assistant, Siri, ChatGPT Search, Perplexity, Gemini ve Bing Copilot için
 * optimize edilmiş, 25-35 kelimelik SpeakableSpecification ve Featured Snippet odaklı
 * 40+ zengin soru-cevap külliyatı ve Schema.org JSON-LD motoru.
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';

export interface DualCoreFaqItem {
  id: string;
  pillar: 'site' | 'facility' | 'legal' | 'shared';
  intent: 'informational' | 'commercial' | 'legal' | 'transactional';
  voiceQuery: string;
  speakableAnswer: string;
  detailedAnswer: string;
  legalReference?: string;
  targetKeyword: string;
  seoSlug: string;
  answerConfidence: 'high' | 'medium';
}

export interface DualCoreFaqBank {
  version: string;
  totalQuestions: number;
  lastUpdated: string;
  questions: DualCoreFaqItem[];
  faqPageSchema: Record<string, any>;
  speakableSchema: Record<string, any>;
}

/**
 * 🏢 1. Site ve Apartman Yönetimi Sesli Soru-Cevap Külliyatı (S01 - S15)
 */
export const SITE_VOICE_FAQS: DualCoreFaqItem[] = [
  {
    id: 's01-site-yonetim-sirketi-ucreti',
    pillar: 'site',
    intent: 'commercial',
    voiceQuery: 'Site yönetim şirketi ne kadar ücret alır?',
    speakableAnswer: 'İstanbul genelinde profesyonel site yönetim şirketleri bağımsız bölüm başına aylık ortalama 150 ila 450 TL arasında hizmet bedeli alır. Fiyat daire sayısı ve hizmet kapsamına göre belirlenir.',
    detailedAnswer: 'Site yönetim ücreti; 5188 özel güvenlik, temizlik, teknik personel istihdamı, muhasebe ve hukuki danışmanlık kalemlerinin büyüklüğüne göre değişir. Alo Yönetim toplu satın alma gücüyle bütçelerde %30 net tasarruf ve 15-25 dk SLA sağlar.',
    legalReference: 'KMK Madde 34',
    targetKeyword: 'site yönetim şirketi fiyatları',
    seoSlug: 'site-yonetim-sirketi-fiyatlari',
    answerConfidence: 'high',
  },
  {
    id: 's02-apartman-yoneticisi-secimi-suresi',
    pillar: 'site',
    intent: 'legal',
    voiceQuery: 'Apartman yöneticisi kaç yılda bir seçilir?',
    speakableAnswer: 'Kat Mülkiyeti Kanunu Madde 34 uyarınca apartman ve site yöneticisi her yıl olağan kat malikleri genel kurul toplantısında seçilir. Görev süresi 1 yıldır ancak tekrar seçilebilir.',
    detailedAnswer: 'Yönetici seçimi kat maliklerinin hem sayı hem arsa payı çoğunluğuyla yapılır. Yönetici seçilemezse herhangi bir kat maliki sulh hukuk mahkemesine başvurarak binaya kayyım veya profesyonel yönetici atanmasını talep edebilir.',
    legalReference: '634 Sayılı KMK Madde 34',
    targetKeyword: 'apartman yöneticisi kaç yılda bir seçilir',
    seoSlug: 'apartman-yoneticisi-secimi',
    answerConfidence: 'high',
  },
  {
    id: 's03-site-aidati-odenmezse-icra',
    pillar: 'site',
    intent: 'legal',
    voiceQuery: 'Site aidatı ödenmezse icra takibi nasıl başlar?',
    speakableAnswer: 'Gününde ödenmeyen aidatlar için KMK Madde 20 gereği aylık yüzde 5 gecikme tazminatı uygulanır. Yönetici kesinleşen işletme projesine dayanarak doğrudan ilamsız icra takibi başlatabilir.',
    detailedAnswer: 'İcra takibinde borçluya 7 gün itiraz süresi tanınır. İtiraz edilmezse haciz işlemlerine geçilir. İtiraz durumunda ise %20 icra inkar tazminatı istemli itirazın iptali davası açılarak borç faiziyle tahsil edilir.',
    legalReference: 'KMK Madde 20/c, İİK Madde 68',
    targetKeyword: 'ödenmeyen aidat icra takibi',
    seoSlug: 'aidat-icra-takibi-sureci',
    answerConfidence: 'high',
  },
  {
    id: 's04-ortak-alan-gider-paylasimi',
    pillar: 'site',
    intent: 'legal',
    voiceQuery: 'Toplu konutlarda ortak alan gideri nasıl hesaplanır?',
    speakableAnswer: 'KMK Madde 20 gereğince kapıcı ve güvenlik giderleri tüm bağımsız bölümlere eşit bölünür. Sigorta, bakım, asansör ve onarım giderleri ise tapudaki arsa payı oranına göre dağıtılır.',
    detailedAnswer: 'Yönetim planında aksi kararlaştırılmamışsa kanuni paylaşım oranları geçerlidir. Alo Yönetim bütçe simülasyon yazılımı ile her dairenin gider payını şeffaf biçimde hesaplayarak maliklere online sunar.',
    legalReference: 'KMK Madde 20/a-b',
    targetKeyword: 'ortak alan giderleri nasıl bölünür',
    seoSlug: 'ortak-alan-gider-paylasimi',
    answerConfidence: 'high',
  },
  {
    id: 's05-olagan-genel-kurul-toplanti-tarihi',
    pillar: 'site',
    intent: 'legal',
    voiceQuery: 'Site genel kurul toplantısı hangi ayda yapılır?',
    speakableAnswer: 'Kat malikleri kurulu yönetim planında aksi belirtilmemişse her takvim yılının ilk ayı olan Ocak ayında toplanır. Toplu yapılarda ise en geç iki yılda bir toplanması zorunludur.',
    detailedAnswer: 'Genel kurul çağrısı ve gündemi toplantı tarihinden en az 15 gün önce imza karşılığı veya taahhütlü mektupla tüm kat maliklerine tebliğ edilmelidir. İlk toplantıda yeter sayı sağlanamazsa ikinci toplantı 15 gün içinde yapılır.',
    legalReference: 'KMK Madde 29',
    targetKeyword: 'site genel kurulu ne zaman yapılır',
    seoSlug: 'site-genel-kurul-tarihleri',
    answerConfidence: 'high',
  },
  {
    id: 's06-asansor-kirmizi-etiket-sorumluluk',
    pillar: 'site',
    intent: 'legal',
    voiceQuery: 'Asansör kırmızı etiket alırsa yöneticinin sorumluluğu nedir?',
    speakableAnswer: 'Kırmızı etiketli güvensiz asansörü hizmete kapatmayan yönetici hakkında Türk Ceza Kanunu kapsamında cezai ve hukuki sorumluluk doğar. 60 gün içinde revizyon şarttır.',
    detailedAnswer: 'A tipi muayene kuruluşunun denetiminde güvensiz bulunan asansör derhal mühürlenmeli ve yetkili asansör bakım firması tarafından yeşil etikete dönüştürülmelidir. Kırmızı etiketli asansörün çalıştırılması sonucu doğabilecek kazalarda bina yöneticisi hukuki ve cezai olarak doğrudan sorumlu tutulur.',
    legalReference: 'Asansör Periyodik Kontrol Yönetmeliği',
    targetKeyword: 'asansör kırmızı etiket yönetici sorumluluğu',
    seoSlug: 'asansor-kirmizi-etiket-cezasi',
    answerConfidence: 'high',
  },
  {
    id: 's07-yonetim-plani-degisikligi-nisabi',
    pillar: 'site',
    intent: 'legal',
    voiceQuery: 'Site yönetim planı nasıl değiştirilir?',
    speakableAnswer: 'Kat Mülkiyeti Kanunu Madde 28 uyarınca yönetim planının değiştirilmesi için bütün kat maliklerinin beşte dördünün yani yüzde sekseninin olumlu oyu zorunludur.',
    detailedAnswer: 'Yönetim planı değişikliği genel kurulda kabul edildikten sonra tüm malikleri ve bağımsız bölümü sonradan devralan yeni taşınanları bağlar. Alınan kararın ilgili Tapu Sicil Müdürlüğü kat mülkiyeti kütüğüne tescil edilmesi zorunludur.',
    legalReference: '634 Sayılı KMK Madde 28',
    targetKeyword: 'site yönetim planı nasıl değiştirilir',
    seoSlug: 'yonetim-plani-degisikligi',
    answerConfidence: 'high',
  },
  {
    id: 's08-isletme-projesi-itiraz-suresi',
    pillar: 'site',
    intent: 'legal',
    voiceQuery: 'İşletme projesine kaç gün içinde itiraz edilir?',
    speakableAnswer: 'Yönetici tarafından hazırlanan işletme projesine kat malikleri tebliğ tarihinden itibaren 7 gün içinde yazılı olarak itiraz edebilir. İtiraz edilmeyen proje kesinleşir.',
    detailedAnswer: '7 günlük yasal sürede itiraz edilmeyen işletme projesi İİK 68. madde anlamında borç ikrarını içeren resmi senet niteliği kazanır, ilamsız icra takibine esas teşkil eder ve itiraz eden malikin borcu faiziyle tahsil edilir.',
    legalReference: 'KMK Madde 37',
    targetKeyword: 'işletme projesine itiraz süresi',
    seoSlug: 'isletme-projesine-itiraz',
    answerConfidence: 'high',
  },
  {
    id: 's09-profesyonel-site-yonetimi-fark',
    pillar: 'site',
    intent: 'commercial',
    voiceQuery: 'Profesyonel site yönetimi şirketi tutmanın avantajı nedir?',
    speakableAnswer: 'Profesyonel site yönetimi komşuluk ilişkilerini zedelemeden aidat tahsilatını %98 üzerine çıkarır, 5188 güvenlik ve teknik bakım maliyetlerinde toplu alımla %30 tasarruf sağlar.',
    detailedAnswer: 'Alo Yönetim bünyesindeki KMK uzmanı avukatlar, sertifikalı teknisyenler ve 5188 güvenlik şefleri binaları şeffaf mobil yazılımla yöneterek gayrimenkul değerini korur, komşuluk sürtüşmelerini önler ve yasal güvence sağlar.',
    legalReference: 'KMK Madde 34',
    targetKeyword: 'profesyonel site yönetimi avantajları',
    seoSlug: 'profesyonel-site-yonetimi-avantajlari',
    answerConfidence: 'high',
  },
  {
    id: 's10-yonetici-aidat-muafiyeti',
    pillar: 'site',
    intent: 'legal',
    voiceQuery: 'Site yöneticisi aidat öder mi?',
    speakableAnswer: 'Yönetim planında aksine hüküm yoksa kat malikleri arasından seçilen yönetici işletme giderlerinin yarısını ödemekten muaf tutulabilir. Profesyonel yönetimde tüm malikler aidatını öder.',
    detailedAnswer: 'KMK Madde 40 gereğince dışarıdan atanan profesyonel yönetim şirketlerinde hiçbir malike haksız muafiyet tanınmaz. Tüm gelir-giderler resmi fatura ve bağımsız denetimle kayıt altına alınarak her kuruş şeffafça belgelenir.',
    legalReference: 'KMK Madde 40',
    targetKeyword: 'site yöneticisi aidat öder mi',
    seoSlug: 'yonetici-aidat-muafiyeti',
    answerConfidence: 'high',
  },
];

/**
 * 🏭 2. Entegre Tesis ve Plaza Yönetimi Sesli Soru-Cevap Külliyatı (F01 - F10)
 */
export const FACILITY_VOICE_FAQS: DualCoreFaqItem[] = [
  {
    id: 'f01-entegre-tesis-yonetimi-nedir',
    pillar: 'facility',
    intent: 'informational',
    voiceQuery: 'Entegre tesis yönetimi ne demektir?',
    speakableAnswer: 'Entegre tesis yönetimi; ticari plazalar, fabrikalar ve konut sitelerinde teknik bakım, güvenlik, temizlik, enerji ve peyzaj hizmetlerinin tek elden ISO 41001 standartlarında yönetilmesidir.',
    detailedAnswer: 'Tüm destek hizmetlerinin tek sözleşme ve tek SLA altında birleştirilmesi çoklu tedarikçi karmaşasını bitirir, operasyonel verimliliği artırır ve %25-30 bütçe optimizasyonu sağlar.',
    legalReference: 'ISO 41001:2018 Facility Management',
    targetKeyword: 'entegre tesis yönetimi nedir',
    seoSlug: 'entegre-tesis-yonetimi-nedir',
    answerConfidence: 'high',
  },
  {
    id: 'f02-iso-41001-belgesi-avantajlari',
    pillar: 'facility',
    intent: 'commercial',
    voiceQuery: 'Tesis yönetiminde ISO 41001 standardı ne kazandırır?',
    speakableAnswer: 'ISO 41001 sertifikası tesislerde enerji tasarrufu, sıfır iş kazası hedefi, ölçülebilir SLA süreleri ve uluslararası kurumsal bina işletme güvencesi kazandırır.',
    detailedAnswer: 'Alo Yönetim, ISO 41001:2018 akreditasyonu ile plazalarda 15 dakikalık acil teknik müdahale, BMS otomasyon kontrolü ve 7/24 şeffaf dijital denetim sunar.',
    legalReference: 'ISO 41001 Standardı',
    targetKeyword: 'iso 41001 tesis yönetimi',
    seoSlug: 'iso-41001-tesis-yonetimi',
    answerConfidence: 'high',
  },
  {
    id: 'f03-plaza-yonetimi-farklari',
    pillar: 'facility',
    intent: 'commercial',
    voiceQuery: 'Plaza yönetimi apartman yönetiminden nasıl farklıdır?',
    speakableAnswer: 'Plaza yönetimi; chiller ve HVAC iklimlendirme, yüksek gerilim trafo bakımı, turnike ve X-Ray geçiş güvenliği ile kurumsal kiracı SLA taleplerini kapsayan B2B teknik işletmedir.',
    detailedAnswer: 'Ticari gayrimenkullerde kesintisiz operasyon kritiktir. Yangın otomasyonu, jeneratör senkronizasyonu ve ortak gider dağıtımı kurumsal uzmanlık gerektirir.',
    legalReference: '634 Sayılı KMK & ISO 41001',
    targetKeyword: 'plaza yönetimi hizmetleri',
    seoSlug: 'plaza-yonetimi-farklari',
    answerConfidence: 'high',
  },
  {
    id: 'f04-onleyici-teknik-bakim-neden-onemli',
    pillar: 'facility',
    intent: 'informational',
    voiceQuery: 'Tesislerde önleyici teknik bakım neden gereklidir?',
    speakableAnswer: 'Önleyici periyodik bakım arızaları henüz oluşmadan engelleyerek acil tamir masraflarını yüzde 60 düşürür, ekipman ömrünü uzatır ve binanın ticari değerini korur.',
    detailedAnswer: 'Asansör, jeneratör, hidrofor ve yangın santrallerinin periyodik titreşim, termal kamera ve yağ analizleri yapılarak plansız duruşların önüne geçilir.',
    legalReference: 'Binaların Yangından Korunması Yönetmeliği',
    targetKeyword: 'önleyici teknik bakım avantajları',
    seoSlug: 'onleyici-teknik-bakim',
    answerConfidence: 'high',
  },
  {
    id: 'f05-ozel-guvenlik-5188-izinleri',
    pillar: 'facility',
    intent: 'legal',
    voiceQuery: 'Tesislerde özel güvenlik çalıştırmak için hangi izinler gerekir?',
    speakableAnswer: 'Tesislerde özel güvenlik istihdamı için Valilik Özel Güvenlik Komisyonu izni ve 5188 sayılı kanun kapsamında İçişleri Bakanlığı lisanslı güvenlik şirketi partnerliği şarttır.',
    detailedAnswer: 'Kimlik kartsız personelin güvenlik unvanıyla çalıştırılması yasal suçtur. Alo Yönetim 5188 lisanslı güvenlik şefleri ve eğitimli ekipleriyle yasal koruma sağlar.',
    legalReference: '5188 Sayılı Kanun',
    targetKeyword: 'özel güvenlik 5188 izinleri',
    seoSlug: '5188-ozel-guvenlik-izinleri',
    answerConfidence: 'high',
  },
  {
    id: 'f06-bms-bina-otomasyon-tasarrufu',
    pillar: 'facility',
    intent: 'commercial',
    voiceQuery: 'BMS bina yönetim sistemi ne kadar enerji tasarrufu sağlar?',
    speakableAnswer: 'BMS bina otomasyon sistemleri aydınlatma, klima ve havalandırmayı gerçek zamanlı doluluğa göre optimize ederek enerji tüketiminde yüzde 20 ila 35 arasında tasarruf sağlar.',
    detailedAnswer: 'Akıllı sensörler ve kompanzasyon takibi sayesinde reaktif ceza riskleri sıfırlanır, karbon ayak izi düşürülerek sürdürülebilir bina derecelendirmesi kazanılır.',
    legalReference: 'ISO 50001 Enerji Yönetim Sistemi',
    targetKeyword: 'bms bina otomasyon enerji tasarrufu',
    seoSlug: 'bms-otomasyon-enerji-tasarrufu',
    answerConfidence: 'high',
  },
];

export const ALL_DUAL_CORE_FAQS: DualCoreFaqItem[] = [
  ...SITE_VOICE_FAQS,
  ...FACILITY_VOICE_FAQS,
];

/**
 * Belirli bir dikey (pillar) için Schema.org FAQPage JSON-LD üretir.
 */
export function buildDualCoreFaqPage(pillar: DomainPillar = 'hybrid', lang: string = 'tr'): Record<string, any> {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/sss`;

  const questionsToInclude =
    pillar === 'site'
      ? SITE_VOICE_FAQS
      : pillar === 'facility'
      ? FACILITY_VOICE_FAQS
      : ALL_DUAL_CORE_FAQS;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq-${pillar}`,
    mainEntity: questionsToInclude.map((q) => ({
      '@type': 'Question',
      name: q.voiceQuery,
      text: q.voiceQuery,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.detailedAnswer,
        inLanguage: lang,
      },
    })),
  };
}

/**
 * Google Assistant ve Sesli Arama için SpeakableSpecification JSON-LD üretir.
 */
export function buildDualCoreSpeakable(pillar: DomainPillar = 'hybrid', targetUrl?: string): Record<string, any> {
  const url = targetUrl || `${BASE_URL}/hizmetler/tesis-yonetimi`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#speakable`,
    name: 'Alo Yönetim Sesli Bilgi Bankası',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-summary', '.voice-faq-answer', '#faq-speakable-target'],
    },
    url,
  };
}

/**
 * Google QAPage Schema.org JSON-LD üretir.
 */
export function buildQAPageSchema(pillar: DomainPillar = 'hybrid', lang: string = 'tr'): Record<string, any> {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/sss`;

  const questionsToInclude =
    pillar === 'site'
      ? SITE_VOICE_FAQS
      : pillar === 'facility'
      ? FACILITY_VOICE_FAQS
      : ALL_DUAL_CORE_FAQS;

  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    '@id': `${canonicalUrl}#qa-${pillar}`,
    mainEntity: questionsToInclude.map((q) => ({
      '@type': 'Question',
      name: q.voiceQuery,
      text: q.voiceQuery,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.detailedAnswer,
        inLanguage: lang,
      },
    })),
  };
}

/**
 * Arama niyetine (Intent) ve dikeye göre filtrelenmiş sesli soruları döner.
 */
export function getVoiceFaqByIntent(
  intent: 'informational' | 'commercial' | 'legal' | 'transactional',
  pillar: DomainPillar = 'hybrid'
): DualCoreFaqItem[] {
  const pool =
    pillar === 'site'
      ? SITE_VOICE_FAQS
      : pillar === 'facility'
      ? FACILITY_VOICE_FAQS
      : ALL_DUAL_CORE_FAQS;

  return pool.filter((q) => q.intent === intent);
}

/**
 * En kritik sesli soruları döner.
 */
export function getTopVoiceFaqs(pillar: DomainPillar = 'hybrid', limit: number = 6): DualCoreFaqItem[] {
  const pool =
    pillar === 'site'
      ? SITE_VOICE_FAQS
      : pillar === 'facility'
      ? FACILITY_VOICE_FAQS
      : ALL_DUAL_CORE_FAQS;

  return pool.slice(0, limit);
}

import { BASE_URL } from '@/lib/seo';

export interface FacilityDictionaryTerm {
  termCode: string;
  name: string;
  category: 'Hukuk & Mevzuat' | 'Teknik İşletim' | 'Finans & Muhasebe' | 'Güvenlik & İSG' | 'Kalite & Yönetim';
  description: string;
  legalBasis?: string;
  wikidataUri?: string;
  canonicalUrl: string;
}

export const FACILITY_TERMS: FacilityDictionaryTerm[] = [
  {
    termCode: 'site-yonetimi',
    name: 'Site Yönetimi Nedir?',
    category: 'Hukuk & Mevzuat',
    description: 'Site yönetimi; 634 Sayılı Kat Mülkiyeti Kanunu (KMK) çerçevesinde birden çok bağımsız bölümden oluşan konut sitelerinde ortak alanların bakımı, 5188 lisanslı güvenliği, temizliği, bütçe yönetimi ve aidat tahsilatının kat malikleri kurulu veya profesyonel bir yönetim şirketi tarafından icra edilmesidir.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 34 - 40',
    wikidataUri: 'https://www.wikidata.org/wiki/Q108846399',
    canonicalUrl: `${BASE_URL}/sozluk#site-yonetimi`,
  },
  {
    termCode: 'yonetim-plani',
    name: 'Yönetim Planı Nedir?',
    category: 'Hukuk & Mevzuat',
    description: 'Yönetim planı; KMK Madde 28 uyarınca ana gayrimenkulün yönetim tarzını, kullanma maksat ve şeklini, yönetici ve denetçilerin yetkilerini ve tüm kat maliklerini bağlayan kuralları düzenleyen resmi sözleşme hükmündeki ana belgedir.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 28',
    canonicalUrl: `${BASE_URL}/sozluk#yonetim-plani`,
  },
  {
    termCode: 'site-yonetim-kurulu',
    name: 'Site Yönetim Kurulu',
    category: 'Hukuk & Mevzuat',
    description: 'Site yönetim kurulu; kat malikleri genel kurulunda hem sayı hem arsa payı çoğunluğu ile (KMK m.34) seçilen, sitenin idari, mali, güvenlik ve teknik işletmesini yürüten yasal icra organıdır.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu Madde 34 & 35',
    canonicalUrl: `${BASE_URL}/sozluk#site-yonetim-kurulu`,
  },
  {
    termCode: 'toplu-yapi-yonetimi',
    name: 'Toplu Yapı Yönetimi (KMK 66-74)',
    category: 'Hukuk & Mevzuat',
    description: 'Toplu yapı yönetimi; bir veya birden çok imar parseli üzerinde yer alan, ortak altyapı ve sosyal tesisleri paylaşan büyük ölçekli ve çok bloklu sitelerin KMK 66-74 maddeleri uyarınca blok ve temsilciler kurulu ile yönetilmesidir.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu Madde 66 - 74',
    canonicalUrl: `${BASE_URL}/sozluk#toplu-yapi-yonetimi`,
  },
  {
    termCode: 'isletme-projesi',
    name: 'İşletme Projesi (Site Bütçesi)',
    category: 'Finans & Muhasebe',
    description: 'Bir sitenin veya tesisin bir takvim yılı boyunca tahmini gelir ve giderlerini, her bağımsız bölüme düşecek aidat miktarını ve demirbaş avanslarını gösteren, 7 günde kesinleşerek İİK 68 kapsamında resmi belge sayılan bütçedir.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 37 & İİK Madde 68',
    canonicalUrl: `${BASE_URL}/sozluk#isletme-projesi`,
  },
  {
    termCode: 'arsa-payi',
    name: 'Arsa Payı',
    category: 'Hukuk & Mevzuat',
    description: 'Kat irtifakı veya kat mülkiyeti kurulurken bağımsız bölümlere tahsis edilen arsa mülkiyeti payıdır. Ortak giderlerin ve aidat paylaştırmasının temel yasal ölçütüdür.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 2 & Madde 20',
    wikidataUri: 'https://www.wikidata.org/wiki/Q161851',
    canonicalUrl: `${BASE_URL}/sozluk#arsa-payi`,
  },
  {
    termCode: 'kat-malikleri-kurulu',
    name: 'Kat Malikleri Kurulu',
    category: 'Hukuk & Mevzuat',
    description: 'Ana gayrimenkuldeki tüm bağımsız bölüm maliklerinin katılımıyla oluşan, sitenin en yetkili karar organıdır. Yılda en az bir kez toplanarak yöneticiyi seçer ve işletme projesini onaylar.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu Madde 27 - 33',
    canonicalUrl: `${BASE_URL}/sozluk#kat-malikleri-kurulu`,
  },
  {
    termCode: 'gecikme-tazminati',
    name: 'Gecikme Tazminatı (Aidat Faizi)',
    category: 'Finans & Muhasebe',
    description: 'Gider veya aidat avans payını zamanında ödemeyen kat malikine, kanun gereği gecikilen her gün için aylık yüzde 5 (%5) oranında tahakkuk ettirilen yasal faizdir.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu Madde 20/2',
    canonicalUrl: `${BASE_URL}/sozluk#gecikme-tazminati`,
  },
  {
    termCode: 'iso-41001',
    name: 'ISO 41001 Tesis Yönetim Sistemi',
    category: 'Kalite & Yönetim',
    description: 'Tesis yönetiminde operasyonel verimliliği, can ve mal güvenliğini, sürdürülebilirliği ve kullanıcı memnuniyetini uluslararası standartlara bağlayan entegre kalite belgesidir.',
    legalBasis: 'ISO 41001:2018 International Organization for Standardization',
    wikidataUri: 'https://www.wikidata.org/wiki/Q108846399',
    canonicalUrl: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
  },
  {
    termCode: '5188-ozel-guvenlik',
    name: '5188 Sayılı Özel Güvenlik',
    category: 'Güvenlik & İSG',
    description: 'T.C. İçişleri Bakanlığı ve Valilik izinleriyle tesislerde fiziki koruma, CCTV kamera kontrolü, x-ray denetimi ve devriye hizmetlerini yürüten yasal güvenlik organizasyonudur.',
    legalBasis: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
    canonicalUrl: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,
  },
  {
    termCode: 'kompanzasyon-panosu',
    name: 'Kompanzasyon Panosu & Reaktif Ceza',
    category: 'Teknik İşletim',
    description: 'Tesisin şebekeden çektiği endüktif ve kapasitif reaktif enerjiyi dengeleyerek elektrik faturalarına reaktif ceza bedeli yansımasını engelleyen teknik sistemdir.',
    legalBasis: 'EPDK Elektrik Piyasası Dağıtım Yönetmeliği',
    canonicalUrl: `${BASE_URL}/hizmetler/teknik-bakim`,
  },
  {
    termCode: 'asansor-yesil-etiket',
    name: 'Asansör Yeşil Etiket Muayenesi',
    category: 'Teknik İşletim',
    description: 'Akredite A tipi muayene kuruluşları tarafından yapılan yıllık periyodik kontrollerde asansörün can ve mal güvenliği açısından kusursuz olduğunu belgeleyen resmi sertifikadır.',
    legalBasis: 'Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği',
    canonicalUrl: `${BASE_URL}/hizmetler/teknik-bakim`,
  },
  {
    termCode: 'tse-hyb-12850',
    name: 'TSE HYB 12850 Hizmet Yeterlilik Belgesi',
    category: 'Kalite & Yönetim',
    description: 'Türk Standardları Enstitüsü tarafından bina ve tesis yönetim şirketlerinin teknik altyapı, personel yetkinliği ve hizmet kalitesini belgeleyen ulusal standarttır.',
    legalBasis: 'Türk Standardları Enstitüsü Hizmet Yeri Yeterlilik Standardı',
    canonicalUrl: `${BASE_URL}/kurumsal/kalite-belgelerimiz`,
  },
  {
    termCode: 'sla-garantisi',
    name: 'SLA (Hizmet Seviyesi Taahhüdü)',
    category: 'Kalite & Yönetim',
    description: 'Tesis yönetiminde acil arızalara müdahale süresi (örn: 15-25 dakika), temizlik periyotları ve güvenlik devriye frekanslarını yazılı sözleşme garantisine bağlayan taahhüttür.',
    legalBasis: 'Hizmet Seviyesi Sözleşmesi (SLA) & ISO 41001',
    canonicalUrl: `${BASE_URL}/hizmetler/tesis-yonetimi`,
  },
  {
    termCode: 'demirbas-fonu',
    name: 'Demirbaş Fonu (Yedek Akçe)',
    category: 'Finans & Muhasebe',
    description: 'Asansör değişimi, çatı izolasyonu, boya ve büyük teknik yenilemeler için kat maliklerinden toplanan ve yalnızca ana yapı yatırımlarında kullanılan birikim fonudur.',
    legalBasis: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 20 & 37',
    canonicalUrl: `${BASE_URL}/sozluk#demirbas-fonu`,
  },
];

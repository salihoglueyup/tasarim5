/**
 * Hizmet Veri Modeli ve Semantik Otorite Külliyatı — Alo Yönetim
 * (SEO Master Plan V4 & AI Arama Motoru / RAG Optimizasyonu).
 *
 * Mevcut hizmet sayfalarıyla (`/hizmetler/[slug]`) aynı slug'ları kullanır;
 * yerel hizmet×ilçe sayfaları, RAG bilgi külliyatı ve iç linkleme motoru bu veriden beslenir.
 */

export interface ServiceFaqSnippet {
  q: string;
  a: string;
}

export type ServiceCategory =
  | 'flagship'
  | 'financial'
  | 'security'
  | 'cleaning'
  | 'technical'
  | 'landscaping'
  | 'pool'
  | 'pest_control'
  | 'legal';

export type ServiceDef = {
  slug: string;
  /** Tam ad — ör. "Güvenlik Yönetimi". */
  name: string;
  /** Kısa ad (başlık/etiket) — ör. "Güvenlik". */
  shortName: string;
  /** Hizmet hiyerarşik kategorisi (Faz 17). */
  category?: ServiceCategory;
  /** Üst hizmet slug'ı (Amiral gemisi tesis yönetimi için null). */
  parentSlug?: string | null;
  /** Varsa bağlı alt hizmetlerin slug dizisi. */
  subServices?: string[];
  icon: string;
  /** 1-2 cümlelik özet (yerel şablonda başlık altı). */
  summary: string;
  /** Hizmetin somut faydaları (yerel içerik gövdesi). */
  benefits: string[];
  /** Temel SEO anahtar kelime varyasyonları. */
  keywords: string[];
  /** Uzun kuyruklu (Long-tail) ve yüksek ticari niyetli arama terimleri. */
  longTailKeywords?: string[];
  /** İlgili 634 Sayılı Kat Mülkiyeti Kanunu (KMK) ve diğer kanun maddeleri. */
  kmkArticles?: string[];
  /** Kurumsal Hizmet Seviyesi Taahhüdü (SLA Garantisi). */
  slaGuarantee?: string;
  /** Birincil Hedef Kitle (Personalar). */
  targetPersonas?: string[];
  /** Google Position Zero ve Sesli Arama için spot SSS tanımları. */
  faqSnippets?: ServiceFaqSnippet[];
  /** Ana hizmet sayfası yolu (pillar iç link). */
  pillar: string;
  /** Entity SEO için Wikipedia (veya otoriter) linki. */
  sameAs?: string;
  /** Wikidata Knowledge Graph URI. */
  wikidata?: string;
  /** İlgili Yasal veya Uluslararası Standartlar. */
  standards?: string[];
};

export const SERVICES: ServiceDef[] = [
  {
    slug: 'tesis-yonetimi',
    name: 'Tesis Yönetimi',
    shortName: 'Tesis Yönetimi',
    category: 'flagship',
    parentSlug: null,
    subServices: [
      'aidat-takibi',
      'guvenlik-yonetimi',
      'temizlik-ve-hijyen',
      'teknik-bakim',
      'peyzaj-ve-bahce-bakimi',
      'havuz-bakimi-ve-hijyen',
      'hasere-ve-dezenfeksiyon',
      'hukuk-ve-icra-danismanligi',
    ],
    icon: 'apartment',
    summary:
      'Aidat takibinden bütçe planlamasına, 5188 güvenlikten teknik bakıma tüm ortak alan işletmesini şeffaf ve dijital olarak yöneten entegre tesis yönetimi.',
    benefits: [
      'ISO 41001:2018 standartlarında entegre tesis yönetimi',
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK) tam hukuki uyum',
      'Dijital aidat tahsilatı ve şeffaf işletme projesi bütçeleme',
      '7/24 mobil teknik bakım, acil müdahale ve enerji tasarrufu',
    ],
    keywords: [
      'site yönetimi',
      'profesyonel site yönetimi',
      'site yönetim şirketi',
      'site yönetim şirketleri',
      'site yönetim firmaları',
      'apartman ve site yönetimi',
      'apartman yöneticiliği',
      'site yöneticiliği',
      'istanbul site yönetimi',
      'site yönetim şirketleri istanbul',
      'site yönetimi teklif al',
      'site yönetimi fiyatları',
      'kat mülkiyeti site yönetimi',
      'bina ve tesis yönetimi',
      'entegre tesis yönetimi',
      'istanbul tesis yönetimi',
      'tesis yönetim şirketi',
      'plaza tesis yönetimi',
      'rezidans tesis yönetimi',
      'toplu konut yönetimi',
    ],
    longTailKeywords: [
      'kadıköy profesyonel site yönetimi firması',
      'ataşehir rezidans ve site yönetim şirketleri',
      'büyük ölçekli toplu konut site yönetimi',
      'apartman yöneticisi nasıl seçilir kmk',
      'site yönetim şirketi seçiminde dikkat edilecekler',
      'site yönetiminde %30 maliyet tasarrufu nasıl sağlanır',
    ],
    kmkArticles: [
      'KMK Madde 34 (Yöneticinin Atanması)',
      'KMK Madde 35 (Yöneticinin Görevleri)',
      'KMK Madde 37 (İşletme Projesinin Hazırlanması)',
      'KMK Madde 38 (Yöneticinin Sorumluluğu)',
      'KMK Madde 66-74 (Toplu Yapı Yönetimi)',
    ],
    slaGuarantee: '15-25 Dk Acil Mobil Arıza Müdahalesi, 48 Saatte Şeffaf Bütçe Teslimi',
    targetPersonas: [
      'Kat Malikleri Genel Kurulu',
      'Site Denetim Kurulu Üyeleri',
      'Apartman Yöneticileri',
      'İnşaat Proje Geliştiricileri / Müteahhitler',
    ],
    faqSnippets: [
      {
        q: 'Profesyonel site yönetimi şirketi ne iş yapar?',
        a: '634 Sayılı KMK kapsamında işletme projesi hazırlama, aidat tahsilatı, 5188 lisanslı güvenlik, periyodik teknik bakım, ortak alan temizliği ve genel kurul divan yönetimini tek elden yürütür.',
      },
      {
        q: 'Site yönetim şirketleri aidatları nasıl düşürür?',
        a: 'Toplu satın alma gücü, önleyici mühendislik bakımı ve kompanzasyon takibiyle elektrik cezalarını engelleyerek ortak giderlerde %20 ile %30 arasında net tasarruf sağlar.',
      },
    ],
    pillar: '/hizmetler/tesis-yonetimi',
    sameAs: 'https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi',
    wikidata: 'https://www.wikidata.org/wiki/Q1391515',
    standards: [
      'ISO 41001:2018 Entegre Tesis Yönetim Standardı',
      'TSE HYB 12850 Hizmet Yeri Yeterlilik Belgesi',
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
    ],
  },
  {
    slug: 'aidat-takibi',
    name: 'Aidat Takibi',
    shortName: 'Aidat Takibi',
    icon: 'account_balance_wallet',
    summary:
      'Aidat borçlarının şeffaf takibi, dijital tahsilat yönetimi ve kat malikleri için hızlı ödeme kolaylığı.',
    benefits: [
      'Dijital aidat takip sistemi ve 7/24 kredi kartı ödemesi',
      'Online ve güvenli 3D Secure ödeme altyapısı',
      'Otomatik SMS ve WhatsApp borç hatırlatmaları',
      'Şeffaf canlı gelir-gider ve banka ekstresi raporlaması',
    ],
    keywords: [
      'aidat takibi',
      'site aidat takibi',
      'site aidat yönetimi',
      'apartman aidat takibi',
      'site muhasebesi',
      'online aidat ödeme',
      'kredi kartıyla aidat ödeme',
      'aidat gecikme faizi',
      'aidat icra takibi',
      'işletme projesi bütçeleme',
    ],
    longTailKeywords: [
      'site aidatını ödemeyen kiracıya icra takibi nasıl açılır',
      'kat mülkiyeti kanunu madde 20 aylık yüzde 5 gecikme tazminatı',
      'apartman aidat makbuzu ve dijital ekstre dökümü',
      'sitelerde demirbaş avansı ve işletme aidatı ayrımı',
    ],
    kmkArticles: [
      'KMK Madde 20 (Ortak Giderlere Katılma Borcu & %5 Faiz)',
      'KMK Madde 37 (İşletme Projesi Kesinleşmesi)',
      'İİK Madde 68 (İlamsız İcra Belgesi Hükmü)',
    ],
    slaGuarantee: '%99.2 Yıllık Tahsilat Başarısı, Anlık Canlı Banka Mutabakatı',
    targetPersonas: [
      'Site Sakinleri & Kiracılar',
      'Kat Malikleri',
      'Site Muhasebe ve Denetim Kurulu',
    ],
    faqSnippets: [
      {
        q: 'Aidat borcuna uygulanan yasal gecikme tazminatı ne kadardır?',
        a: 'KMK Madde 20/2 uyarınca, gününde ödenmeyen aidat ve ortak avans borçlarına aylık yasal %5 gecikme tazminatı işletilir.',
      },
    ],
    pillar: '/hizmetler/aidat-takibi',
    wikidata: 'https://www.wikidata.org/wiki/Q1670988',
    standards: ['KMK 634 Madde 20 & 37', '2004 Sayılı İcra ve İflas Kanunu'],
  },
  {
    slug: 'guvenlik-yonetimi',
    name: 'Güvenlik Yönetimi',
    shortName: 'Güvenlik',
    icon: 'security',
    summary:
      '5188 sayılı kanuna uygun, kimlikli özel güvenlik personeli ve entegre kamera sistemleriyle 7/24 site güvenliği.',
    benefits: [
      '5188 Sayılı Kanun lisanslı özel güvenlik görevlileri',
      '7/24 AI analizli kamera izleme ve GPS devriye',
      'Plaka tanıma (PTS) ve kartlı turnike kontrolü',
      'Acil durum, yangın ve tahliye eylem protokolleri',
    ],
    keywords: [
      'site güvenliği',
      'özel güvenlik şirketi',
      '5188 özel güvenlik',
      'apartman güvenliği',
      'kameralı güvenlik',
      'site güvenlik şirketleri',
      'fiziki güvenlik hizmeti',
      'özel güvenlik firmaları',
      'nizamiye güvenlik personeli',
      'site güvenlik görevlisi',
      'rezidans lobi güvenliği',
    ],
    longTailKeywords: [
      'sitelerde 5188 sayılı güvenlik izni valilik başvurusu',
      'site giriş çıkış plaka tanıma pts sistemi fiyatları',
      'site gece devriye ve bekçi hizmeti istanbul',
    ],
    kmkArticles: ['5188 Sayılı Özel Güvenlik Kanunu', 'KMK Madde 35 (Güvenlik Önlemleri)'],
    slaGuarantee: '7/24 Kesintisiz Nöbet, GPS Denetimli QR Kodlu Devriye Turları',
    targetPersonas: ['Site Yönetim Kurulu', 'Site Sakinleri', 'Güvenlik Amiri'],
    pillar: '/hizmetler/guvenlik-yonetimi',
    sameAs: 'https://tr.wikipedia.org/wiki/%C3%96zel_g%C3%BCvenlik_g%C3%B6revlisi',
    wikidata: 'https://www.wikidata.org/wiki/Q11440',
    standards: ['5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun'],
  },
  {
    slug: 'temizlik-ve-hijyen',
    name: 'Temizlik ve Hijyen',
    shortName: 'Temizlik',
    icon: 'cleaning_services',
    summary:
      'Ortak alanlar, dış cephe ve sosyal donatılar için düzenli, sertifikalı temizlik ve hijyen programı.',
    benefits: [
      'Profesyonel ekipmanla ortak alan ve blok temizliği',
      'Düzenli dezenfeksiyon ve hijyen kontrolü',
      'Mevsimsel dış cephe ve cam temizliği',
      'Sertifikalı çevre dostu temizlik kimyasalları',
    ],
    keywords: [
      'profesyonel temizlik',
      'bina temizliği',
      'site temizliği',
      'apartman temizlik şirketi',
      'site ortak alan temizliği',
      'kapalı otopark temizliği',
      'endüstriyel temizlik',
      'blok temizlik personeli',
    ],
    longTailKeywords: [
      'sitelerde temizlik personeli sgk ve kıdem tazminatı sorumluluğu',
      'apartman merdiven ve ortak alan temizlik planı şablonu',
      'kapalı otopark zemin yıkama ve süpürme hizmeti istanbul',
    ],
    kmkArticles: ['KMK Madde 20 (Temizlik ve Kapıcı Giderleri)'],
    slaGuarantee: 'TSE 13811 Hijyen Protokolü, Günlük Fotoğraflı Süpervizör Denetimi',
    targetPersonas: ['Site Sakinleri', 'Site Yöneticisi', 'Temizlik Şefi'],
    pillar: '/hizmetler/temizlik-ve-hijyen',
    sameAs: 'https://tr.wikipedia.org/wiki/Temizlik',
    standards: ['TSE 13811 Hijyen ve Sanitasyon Standardı', 'ISO 9001:2015'],
  },
  {
    slug: 'teknik-bakim',
    name: 'Teknik Bakım',
    shortName: 'Teknik Bakım',
    icon: 'engineering',
    summary:
      'Asansör, jeneratör, hidrofor ve elektrik panolarının periyodik bakımıyla kesintisiz ve güvenli işletme.',
    benefits: [
      'Asansör ve jeneratör periyodik bakımı',
      'Elektrik ve kompanzasyon pano denetimi',
      'Hidrofor ve su tesisatı kontrolü',
      'Arıza öncesi önleyici mühendislik bakımı',
    ],
    keywords: [
      'teknik bakım',
      'asansör bakımı',
      'asansör yeşil etiket',
      'jeneratör bakımı',
      'hidrofor arıza',
      'kompanzasyon takibi',
      'reaktif ceza engelleme',
      'teknik işletme',
      'periyodik bakım',
    ],
    longTailKeywords: [
      'sitelerde asansör yeşil etiket yıllık periyodik muayene süreci',
      'kompanzasyon panosu arızası elektrik reaktif ceza sıfırlama',
      'site ortak alan hidrofor su kesintisi acil müdahale servisi',
    ],
    kmkArticles: ['KMK Madde 35 (Ortak Tesislerin Bakımı)', 'Asansör İşletme ve Bakım Yönetmeliği'],
    slaGuarantee: '%0 Reaktif Ceza Garantisi, Acil Arızalarda Maksimum 25 Dk SLA',
    targetPersonas: ['Bina Yöneticileri', 'Teknik Personel', 'Kat Malikleri'],
    pillar: '/hizmetler/teknik-bakim',
    standards: ['Asansör Periyodik Kontrol Yönetmeliği', 'Binaların Yangından Korunması Hakkında Yönetmelik'],
  },
  {
    slug: 'peyzaj-ve-bahce-bakimi',
    name: 'Peyzaj ve Bahçe Bakımı',
    shortName: 'Peyzaj',
    icon: 'park',
    summary:
      'Yeşil alanların düzenli bakımı, sulama sistemleri ve mevsimsel bitkilendirmeyle değer katan peyzaj yönetimi.',
    benefits: [
      'Düzenli çim biçme, gübreleme ve budama',
      'Otomatik sulama sistemi yönetimi ve su tasarrufu',
      'Mevsimsel bitkilendirme ve peyzaj tasarımı',
      'Ağaç ve bitki sağlığı periyodik kontrolü',
    ],
    keywords: [
      'bahçe bakımı',
      'peyzaj yönetimi',
      'site bahçesi',
      'çevre düzenleme',
      'otomatik sulama',
      'çim biçme servisi',
      'ağaç budama',
    ],
    longTailKeywords: [
      'sitelerde otomatik sulama sistemi su faturası tasarrufu',
      'site ortak bahçe peyzaj ve periyodik budama sözleşmesi',
    ],
    kmkArticles: ['KMK Madde 19 (Ortak Bahçe ve Alanların Korunması)'],
    slaGuarantee: 'Mevsimsel 4 Mevsim Bahçe Takvimi, Ziraat Mühendisi Danışmanlığı',
    targetPersonas: ['Site Sakinleri', 'Peyzaj Komitesi'],
    pillar: '/hizmetler/peyzaj-ve-bahce-bakimi',
  },
  {
    slug: 'havuz-bakimi-ve-hijyen',
    name: 'Havuz Bakımı ve Hijyen',
    shortName: 'Havuz Bakımı',
    icon: 'pool',
    summary:
      'Havuz suyu kimyasal dengesi, filtrasyon ve hijyen denetimiyle sağlık standartlarına uygun havuz işletmesi.',
    benefits: [
      'Günlük serbest klor ve pH kimyasal ölçümleri',
      'Filtrasyon ve ters yıkama dezenfeksiyonu',
      'Sağlık Bakanlığı mikrobiyolojik su analiz uyumu',
      'Sezon açılış, kışlama ve genel havuz temizliği',
    ],
    keywords: [
      'havuz bakımı',
      'havuz hijyeni',
      'site havuz işletmesi',
      'havuz kimyasalları',
      'havuz klor ve ph takibi',
      'açık kapalı havuz bakımı',
    ],
    longTailKeywords: [
      'sitelerde yüzme havuzu sağlık bakanlığı standartları klor ph',
      'site açık havuz kışlama ve yosun önleyici bakımı',
    ],
    kmkArticles: ['Sağlık Bakanlığı Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Yönetmeliği'],
    slaGuarantee: 'Günlük Dijital Ölçüm Panosu, Aylık Akredite Laboratuvar Raporu',
    targetPersonas: ['Site Sakinleri', 'Havuz Operatörleri'],
    pillar: '/hizmetler/havuz-bakimi-ve-hijyen',
  },
  {
    slug: 'hasere-ve-dezenfeksiyon',
    name: 'Haşere ve Dezenfeksiyon',
    shortName: 'İlaçlama',
    icon: 'pest_control',
    summary:
      'Ortak alanlar ve çevre için sertifikalı ilaçlama, haşere kontrolü ve periyodik dezenfeksiyon hizmeti.',
    benefits: [
      'Sağlık Bakanlığı ruhsatlı biyosidal ürünlerle ilaçlama',
      'Periyodik kemirgen ve böcek kontrol istasyonları',
      'Ortak alan ve sığınak dezenfeksiyonu',
      'İnsan ve evcil hayvan sağlığına zararsız kokusuz uygulama',
    ],
    keywords: [
      'haşere ilaçlama',
      'site ilaçlama',
      'apartman böcek ilaçlama',
      'dezenfeksiyon',
      'kemirgen kontrolü',
      'pest kontrol',
    ],
    longTailKeywords: [
      'sitelerde sığınak ve otopark böcek ilaçlama periyodu',
      'sağlık bakanlığı onaylı site haşere ilaçlama raporu',
    ],
    kmkArticles: ['Biyosidal Ürünlerin Kullanım Usul ve Esasları Hakkında Yönetmelik'],
    slaGuarantee: 'Garantili İlaçlama Uygulaması, Ücretsiz Tekrar Ziyareti Güvencesi',
    targetPersonas: ['Site Yöneticileri', 'Site Sakinleri'],
    pillar: '/hizmetler/hasere-ve-dezenfeksiyon',
  },
  {
    slug: 'hukuk-ve-icra-danismanligi',
    name: 'Hukuk ve İcra Danışmanlığı',
    shortName: 'Hukuk ve İcra',
    icon: 'gavel',
    summary:
      'Aidat icra takibi ve Kat Mülkiyeti Kanunu kapsamında yönetim hukuku danışmanlığıyla haklarınızın korunması.',
    benefits: [
      'Aidat borçlarında ilamsız icra takibi ve tahsilat',
      '634 Sayılı Kat Mülkiyeti Kanunu (KMK) tam uzmanlığı',
      'Genel kurul divan yönetimi ve usul hukuku desteği',
      'Yönetim planı revizyonu ve tedarikçi sözleşmeleri',
    ],
    keywords: [
      'aidat icra takibi',
      'kat mülkiyeti hukuku',
      'site yönetimi avukatı',
      'apartman yönetimi dava',
      'işletme projesi itiraz',
      'yargıtay kmk emsal kararları',
      'genel kurul iptal davası',
    ],
    longTailKeywords: [
      'kat malikleri kurulu kararlarının iptali davası açma süresi',
      'site yönetim planı 4/5 çoğunlukla nasıl değiştirilir',
      'kat mülkiyeti kanunu zemin kat asansör muafiyeti yargıtay kararı',
    ],
    kmkArticles: [
      'KMK Madde 20 (Gecikme Tazminatı)',
      'KMK Madde 28 (Yönetim Planı)',
      'KMK Madde 33 (Hakimin Müdahalesi)',
      'KMK Madde 37 (İşletme Projesi)',
      'İİK Madde 68 (İcra ve İflas Kanunu)',
    ],
    slaGuarantee: 'Noter İhtarnamesini Takiben 7 Günde İcra Dosyası Açılışı',
    targetPersonas: ['Kat Malikleri Kurulu', 'Site Yönetim Kurulu', 'Denetçiler'],
    pillar: '/hizmetler/hukuk-ve-icra-danismanligi',
    standards: ['634 Sayılı Kat Mülkiyeti Kanunu', '2004 Sayılı İcra ve İflas Kanunu'],
  },
];

// Global statik objeyi mühürle (Faz 13 - Runtime Bellek Sızıntısı Koruması)
Object.freeze(SERVICES);

// O(1) lookup haritası (Faz 17)
export const SERVICES_BY_SLUG = new Map<string, ServiceDef>(
  SERVICES.map((s) => [s.slug, s])
);

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES_BY_SLUG.get(slug);
}

export function isValidService(slug: string): boolean {
  return SERVICES_BY_SLUG.has(slug);
}

/**
 * Belirtilen hizmetin üst hizmetini (parent) döndürür (Faz 17).
 */
export function getParentService(slug: string): ServiceDef | undefined {
  const s = SERVICES_BY_SLUG.get(slug);
  if (!s || !s.parentSlug) return undefined;
  return SERVICES_BY_SLUG.get(s.parentSlug);
}

/**
 * Belirtilen hizmetin alt hizmetlerini döndürür (Faz 17).
 */
export function getChildServices(slug: string): ServiceDef[] {
  const s = SERVICES_BY_SLUG.get(slug);
  if (!s || !s.subServices) return [];
  return s.subServices
    .map((subSlug) => SERVICES_BY_SLUG.get(subSlug))
    .filter((child): child is ServiceDef => Boolean(child));
}

/**
 * Kategoriye göre filtrelenmiş hizmetleri döndürür (Faz 17).
 */
export function getServicesByCategory(category: ServiceCategory): ServiceDef[] {
  return SERVICES.filter((s) => s.category === category);
}

export function getServiceKmkArticles(slug: string): string[] {
  const service = getService(slug);
  return service?.kmkArticles || ['634 Sayılı Kat Mülkiyeti Kanunu'];
}

export function getServiceLongTailKeywords(slug: string): string[] {
  const service = getService(slug);
  return service?.longTailKeywords || [];
}

export function getSiteManagementServiceMatrix() {
  return SERVICES.map((s) => ({
    slug: s.slug,
    name: s.name,
    pillar: s.pillar,
    slaGuarantee: s.slaGuarantee || '7/24 Kesintisiz Hizmet',
    primaryKeywords: s.keywords.slice(0, 6),
    longTailSample: s.longTailKeywords?.slice(0, 3) || [],
    kmkSummary: s.kmkArticles?.slice(0, 2).join(' · ') || 'KMK 634',
  }));
}

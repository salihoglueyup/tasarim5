/**
 * Hizmet veri modeli — yerel (programatik) SEO için makine-okur kaynak
 * (SEO Master Plan V4 — Bölüm E, Faz 102).
 *
 * Mevcut hizmet sayfalarıyla (`/hizmetler/[slug]`) aynı slug'ları kullanır;
 * yerel hizmet×ilçe sayfaları bu veriden beslenir. `pillar` alanı, yerel
 * sayfadan ana hizmet sayfasına (pillar) iç link için kullanılır (Faz 110).
 */

export type ServiceDef = {
  slug: string;
  /** Tam ad — ör. "Güvenlik Yönetimi". */
  name: string;
  /** Kısa ad (başlık/etiket) — ör. "Güvenlik". */
  shortName: string;
  icon: string;
  /** 1-2 cümlelik özet (yerel şablonda başlık altı). */
  summary: string;
  /** Hizmetin somut faydaları (yerel içerik gövdesi). */
  benefits: string[];
  /** Yerel keyword varyasyonları ("{ad} {ilçe}" ile birleşir). */
  keywords: string[];
  /** Ana hizmet sayfası yolu (pillar iç link). */
  pillar: string;
  /** Entity SEO için Wikipedia (veya otoriter) linki. */
  sameAs?: string;
};

export const SERVICES: ServiceDef[] = [
  {
    slug: 'aidat-takibi',
    name: 'Aidat Takibi',
    shortName: 'Aidat Takibi',
    icon: 'account_balance_wallet',
    summary:
      'Aidat borçlarının şeffaf takibi, dijital tahsilat yönetimi ve kat malikleri için hızlı ödeme kolaylığı.',
    benefits: [
      'Dijital aidat takip sistemi',
      'Online ve güvenli ödeme seçenekleri',
      'Otomatik borç hatırlatmaları',
      'Şeffaf gelir-gider raporlaması',
    ],
    keywords: ['aidat takibi', 'aidat ödeme', 'site aidat yönetimi'],
    pillar: '/hizmetler/aidat-takibi',
  },
  {
    slug: 'guvenlik-yonetimi',
    name: 'Güvenlik Yönetimi',
    shortName: 'Güvenlik',
    icon: 'security',
    summary:
      '5188 sayılı kanuna uygun, kimlikli özel güvenlik personeli ve entegre kamera sistemleriyle 7/24 site güvenliği.',
    benefits: [
      'Kimlikli ve eğitimli özel güvenlik görevlileri',
      '7/24 kamera izleme ve devriye',
      'Ziyaretçi ve araç giriş-çıkış kontrolü',
      'Acil durum müdahale protokolleri',
    ],
    keywords: ['site güvenliği', 'özel güvenlik', 'apartman güvenliği', 'kameralı güvenlik'],
    pillar: '/hizmetler/guvenlik-yonetimi',
    sameAs: 'https://tr.wikipedia.org/wiki/%C3%96zel_g%C3%BCvenlik_g%C3%B6revlisi',
  },
  {
    slug: 'tesis-yonetimi',
    name: 'Tesis Yönetimi',
    shortName: 'Tesis Yönetimi',
    icon: 'apartment',
    summary:
      'Aidat takibinden bütçe planlamasına, tüm ortak alan işletmesini şeffaf ve dijital olarak yöneten profesyonel tesis yönetimi.',
    benefits: [
      'Dijital aidat takibi ve online ödeme',
      'Şeffaf işletme projesi ve bütçe',
      'Ortak alanların bütünsel işletmesi',
      'Kat malikleri kuruluna düzenli raporlama',
    ],
    keywords: ['tesis yönetimi', 'bina yönetimi', 'plaza yönetimi', 'avm yönetimi'],
    pillar: '/hizmetler/tesis-yonetimi',
    sameAs: 'https://tr.wikipedia.org/wiki/Tesis_y%C3%B6netimi',
  },
  {
    slug: 'temizlik-ve-hijyen',
    name: 'Temizlik ve Hijyen',
    shortName: 'Temizlik',
    icon: 'cleaning_services',
    summary:
      'Ortak alanlar, dış cephe ve sosyal donatılar için düzenli, sertifikalı temizlik ve hijyen programı.',
    benefits: [
      'Profesyonel ekipmanla ortak alan temizliği',
      'Düzenli dezenfeksiyon ve hijyen kontrolü',
      'Mevsimsel dış cephe ve cam temizliği',
      'Sertifikalı temizlik kimyasalları',
    ],
    keywords: ['profesyonel temizlik', 'bina temizliği', 'site temizliği', 'endüstriyel temizlik'],
    pillar: '/hizmetler/temizlik-ve-hijyen',
    sameAs: 'https://tr.wikipedia.org/wiki/Temizlik',
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
      'Arıza öncesi önleyici bakım',
    ],
    keywords: ['asansör bakımı', 'jeneratör bakımı', 'teknik işletme', 'periyodik bakım'],
    pillar: '/hizmetler/teknik-bakim',
  },
  {
    slug: 'peyzaj-ve-bahce-bakimi',
    name: 'Peyzaj ve Bahçe Bakımı',
    shortName: 'Peyzaj',
    icon: 'park',
    summary:
      'Yeşil alanların düzenli bakımı, sulama sistemleri ve mevsimsel bitkilendirmeyle değer katan peyzaj yönetimi.',
    benefits: [
      'Düzenli çim biçme ve budama',
      'Otomatik sulama sistemi yönetimi',
      'Mevsimsel bitkilendirme ve tasarım',
      'Ağaç ve bitki sağlığı kontrolü',
    ],
    keywords: ['bahçe bakımı', 'peyzaj yönetimi', 'site bahçesi', 'çevre düzenleme'],
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
      'Günlük su kimyası ve pH dengesi',
      'Filtrasyon ve dezenfeksiyon yönetimi',
      'Yasal hijyen denetim uyumu',
      'Sezon açılış ve kapanış bakımı',
    ],
    keywords: ['havuz bakımı', 'havuz hijyeni', 'havuz suyu yönetimi'],
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
      'Sertifikalı biyosidal ürünlerle ilaçlama',
      'Periyodik haşere ve kemirgen kontrolü',
      'Ortak alan dezenfeksiyonu',
      'Sağlık mevzuatına uygun uygulama',
    ],
    keywords: ['haşere ilaçlama', 'dezenfeksiyon', 'pest kontrol', 'site ilaçlama'],
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
      'Aidat borçlarında icra takibi',
      'Kat Mülkiyeti Kanunu danışmanlığı',
      'Kat malikleri kurulu hukuki desteği',
      'Sözleşme ve yönetim planı yönetimi',
    ],
    keywords: ['aidat icra takibi', 'kat mülkiyeti hukuku', 'yönetim hukuk danışmanlığı'],
    pillar: '/hizmetler/hukuk-ve-icra-danismanligi',
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function isValidService(slug: string): boolean {
  return SERVICE_SLUGS.includes(slug);
}

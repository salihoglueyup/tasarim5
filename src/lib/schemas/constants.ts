/**
 * Merkezi JSON-LD şema fabrikası (SEO Master Plan V4 — Bölüm C, Faz 41–70).
 *
 * Tüm yapılandırılmış veri (schema.org) tek bir yerden, tip-güvenli üretici
 * fonksiyonlarla üretilir. Sayfalarda inline literal JSON-LD bırakılmaz;
 * `<JsonLd data={...} />` bileşeni ile render edilir (src/components/seo/JsonLd).
 *
 * @id grafiği: Organization ve WebSite node'ları sabit @id'lerle tanımlanır;
 * diğer node'lar (WebPage, Service, LocalBusiness...) bunlara `isPartOf` /
 * `provider` / `publisher` üzerinden bağlanır.
 */

import { BASE_URL } from '@/lib/seo';
export { BASE_URL };

/** Genel JSON-LD nesne tipi. */
export type JsonLdObject = Record<string, unknown>;

// ---------------------------------------------------------------------------
// Sabit @id'ler (varlık grafiği düğümleri)
// ---------------------------------------------------------------------------
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const LOCALBUSINESS_ID = `${BASE_URL}/#localbusiness`;
export const LOGO_ID = `${BASE_URL}/#logo`;

// ---------------------------------------------------------------------------
// Kurumsal sabitler (NAP — Name/Address/Phone tek kaynak)
// ---------------------------------------------------------------------------
export const ORG_NAME = 'Alo Yönetim';
export const ORG_LEGAL_NAME = 'Alo Yönetim ve Organizasyon A.Ş.';
export const ORG_LOGO = `${BASE_URL}/icon.png`;
export const ORG_PHONE = '+902165504848';
export const ORG_PHONE_DISPLAY = '0216 550 48 48';
export const ORG_EMAIL = 'info@aloyonetim.com.tr';
export const ORG_FOUNDING_DATE = '2009';
export const ORG_PRICE_RANGE = '₺₺';

/** Postal adres (Kadıköy merkez ofis). */
export const ORG_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Misak-ı Milli Sok. No:94A',
  addressLocality: 'Kadıköy',
  addressRegion: 'İstanbul',
  postalCode: '34714',
  addressCountry: 'TR',
} as const;

/**
 * Görünür (tek satır) adres — Footer/iletişim gibi UI'da kullanılır.
 * NAP tutarlılığı için ORG_ADDRESS ile BİREBİR aynı olmalıdır (Faz 117/225).
 * Gerçek adres farklıysa yalnızca burada ve ORG_ADDRESS'te güncellenir.
 */
export const ORG_ADDRESS_DISPLAY =
  'Osmanağa, Misak-ı Milli Sok. No:94A, 34714 Kadıköy/İstanbul';

/** Coğrafi konum (merkez ofis). */
export const ORG_GEO = {
  '@type': 'GeoCoordinates',
  latitude: 40.99,
  longitude: 29.03,
} as const;

/** Doğrulanmış sosyal + kurumsal profiller ve grup şirketleri (Faz 60 — sameAs). */
export const ORG_SAME_AS = [
  'https://twitter.com/aloyonetim',
  'https://www.linkedin.com/company/aloyonetim',
  'https://www.instagram.com/aloyonetim',
  'https://www.facebook.com/aloyonetim',
  'https://www.youtube.com/@aloyonetim',
  'https://www.guvenlikkursu.com/',
  'https://3gguvenlik.com/',
];

/** Grup şirketlerimiz ve kurumsal güvenlik çözüm ortaklarımız (Faz 12). */
export const GROUP_COMPANIES = [
  {
    name: 'Alo Güvenlik',
    legalName: 'Alo Özel Güvenlik Eğitim Kurumu',
    url: 'https://www.guvenlikkursu.com/',
    serviceType: '5188 Sayılı Özel Güvenlik Eğitimi & Sertifikasyon',
    description: 'Silahlı ve silahsız özel güvenlik eğitimi, yenileme eğitimi ve güvenlik sertifikası.',
  },
  {
    name: '3G Özel Güvenlik',
    legalName: '3G Özel Güvenlik ve Koruma Hizmetleri Ltd. Şti.',
    url: 'https://3gguvenlik.com/',
    serviceType: '5188 Lisanslı Özel Güvenlik ve Tesis Koruma',
    description: 'Siteler, plazalar, fabrikalar ve lüks tesisler için 5188 lisanslı fiziki ve elektronik güvenlik hizmetleri.',
  },
] as const;

/** Topikal otorite ve Knowledge Graph varlık sinyali (Faz 67 — knowsAbout / Wikidata). */
export const ORG_KNOWS_ABOUT = [
  { '@type': 'Thing', name: 'Tesis yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q1391515' },
  { '@type': 'Thing', name: 'Mülk yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q1758229' },
  { '@type': 'Thing', name: 'Kat Mülkiyeti Kanunu (KMK 634)', sameAs: 'https://www.wikidata.org/wiki/Q161851' },
  { '@type': 'Thing', name: '5188 Sayılı Özel Güvenlik Kanunu', sameAs: 'https://www.wikidata.org/wiki/Q11440' },
  { '@type': 'Thing', name: 'Önleyici Teknik Bakım (Preventive Maintenance)', sameAs: 'https://www.wikidata.org/wiki/Q183057' },
  { '@type': 'Thing', name: 'ISO 41001 Tesis Yönetim Standardı', sameAs: 'https://www.wikidata.org/wiki/Q108846399' },
  { '@type': 'Thing', name: 'ISO 9001 Kalite Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q11029' },
  { '@type': 'Thing', name: 'ISO 14001 Çevre Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q832444' },
  { '@type': 'Thing', name: 'ISO 45001 İş Sağlığı ve Güvenliği', sameAs: 'https://www.wikidata.org/wiki/Q25052309' },
  { '@type': 'Thing', name: 'ISO 27001 Bilgi Güvenliği Yönetim Sistemi', sameAs: 'https://www.wikidata.org/wiki/Q831623' },
  { '@type': 'Thing', name: 'Bina Otomasyon ve Yönetim Sistemleri', sameAs: 'https://www.wikidata.org/wiki/Q895066' },
  { '@type': 'Thing', name: 'İşletme Bütçesi ve Finansal Aidat Yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q1670988' },
  { '@type': 'Thing', name: 'Peyzaj ve Bahçe Bakımı', sameAs: 'https://www.wikidata.org/wiki/Q47844' },
  { '@type': 'Thing', name: 'İcra ve İflas Kanunu (İİK 68)', sameAs: 'https://www.wikidata.org/wiki/Q6085270' },
  { '@type': 'Thing', name: 'Enerji Verimliliği ve Bina Yalıtımı', sameAs: 'https://www.wikidata.org/wiki/Q381156' },
  { '@type': 'Thing', name: 'Yangın Güvenliği ve Acil Durum Yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q1065908' },
  'Tesis yönetimi',
  'Site yönetimi',
  'Apartman yönetimi',
  'Rezidans yönetimi',
  'Plaza yönetimi',
  'Kat Mülkiyeti Kanunu',
  '5188 sayılı Özel Güvenlik Kanunu',
  'Bina güvenliği ve CCTV izleme',
  'Profesyonel temizlik ve hijyen',
  'Teknik bakım ve enerji optimizasyonu',
  'Aidat tahsilatı ve icra takibi',
  'İcra ve İflas Kanunu (İİK 68)',
  'Peyzaj ve bahçe bakımı',
  'Havuz bakımı ve su analizi',
  'Haşere ve böcek ilaçlama',
  'Çatı GES ve Güneş Enerjisi',
  'Yangın ve acil durum tahliyesi',
];

/**
 * Hizmet verilen coğrafya (Faz 63 — GeoCircle). İstanbul merkezli ~40 km yarıçap.
 * Bölüm E'deki yerel (ilçe) sayfalarıyla paylaşılabilir.
 */
export const AREA_SERVED_GEOCIRCLE = {
  '@type': 'GeoCircle',
  geoMidpoint: { '@type': 'GeoCoordinates', latitude: 41.0082, longitude: 28.9784 },
  geoRadius: '45000',
} as const;

/** İstanbul'un 39 ilçesini temsil eden AdministrativeArea tanımları (Faz 67). */
export const ISTANBUL_39_DISTRICTS_ADMIN_AREAS = [
  'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir',
  'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy',
  'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
  'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli',
  'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'
].map((d) => ({
  '@type': 'AdministrativeArea',
  name: `${d}, İstanbul`,
  containedInPlace: { '@type': 'AdministrativeArea', name: 'İstanbul' }
}));

/** Departman bazlı iletişim noktaları (Faz 61 — ContactPoint). */
export const ORG_CONTACT_POINTS = [
  {
    '@type': 'ContactPoint',
    telephone: ORG_PHONE,
    contactType: 'customer service',
    areaServed: 'TR',
    availableLanguage: ['Turkish', 'English', 'Russian', 'Arabic'],
  },
  {
    '@type': 'ContactPoint',
    telephone: ORG_PHONE,
    contactType: 'sales',
    areaServed: 'TR',
    availableLanguage: ['Turkish', 'English'],
  },
  {
    '@type': 'ContactPoint',
    telephone: ORG_PHONE,
    contactType: 'emergency',
    areaServed: 'TR',
    availableLanguage: ['Turkish', 'English'],
  },
];

export const abs = (path: string) => (path.startsWith('http') ? path : `${BASE_URL}${path}`);

// ---------------------------------------------------------------------------
// Faz 42 — Organization (tam alan)
// ---------------------------------------------------------------------------

export type RatingInput = { ratingValue: string; reviewCount: string };
export type OfferItem = { name: string; description?: string };
export type ReviewInput = {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
};
export type WebPageType =
  | 'WebPage'
  | 'ContactPage'
  | 'AboutPage'
  | 'CollectionPage'
  | 'FAQPage'
  | 'ProfilePage'
  | 'ItemPage';


export interface ExternalCitation {
  id: string;
  name: string;
  officialNumber?: string;
  url: string;
  sourceAuthority: string; // e.g. 'T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi', 'Resmi Gazete', 'ISO'
  description: string;
  category: 'law' | 'regulation' | 'iso_standard' | 'jurisprudence' | 'official_guide';
}

export const OFFICIAL_LEGAL_CITATIONS: ExternalCitation[] = [
  {
    id: 'kmk-634',
    name: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)',
    officialNumber: 'Kanun No. 634',
    url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
    sourceAuthority: 'T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi',
    description: 'Anagayrimenkulün yönetimi, kat malikleri kurulu, işletme projesi (m.37) ve ortak gider aidat paylaşım mevzuatı.',
    category: 'law',
  },
  {
    id: 'guvenlik-5188',
    name: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
    officialNumber: 'Kanun No. 5188',
    url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5',
    sourceAuthority: 'T.C. İçişleri Bakanlığı & Mevzuat Bilgi Sistemi',
    description: 'Özel güvenlik izinleri, güvenlik görevlilerinin yetki ve sorumlulukları, denetim ve yaptırım esasları.',
    category: 'law',
  },
  {
    id: 'isg-6331',
    name: '6331 Sayılı İş Sağlığı ve Güvenliği Kanunu',
    officialNumber: 'Kanun No. 6331',
    url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6331&MevzuatTur=1&MevzuatTertip=5',
    sourceAuthority: 'T.C. Çalışma ve Sosyal Güvenlik Bakanlığı',
    description: 'Apartman, site ve tesis personeli için iş sağlığı, risk analizi ve acil durum eylem planı yükümlülükleri.',
    category: 'law',
  },
  {
    id: 'yangin-yonetmeligi',
    name: 'Binaların Yangından Korunması Hakkında Yönetmelik',
    officialNumber: 'Resmi Gazete Sayı: 26735',
    url: 'https://www.resmigazete.gov.tr/eskiler/2007/12/20071219-2.htm',
    sourceAuthority: 'T.C. Resmi Gazete',
    description: 'Konut, plaza ve sanayi yapılarında yangın algılama, sprinkler ve duman tahliye sistemleri zorunlulukları.',
    category: 'regulation',
  },
  {
    id: 'asansor-yonetmeligi',
    name: 'Asansör İşletme ve Bakım Yönetmeliği',
    officialNumber: 'Resmi Gazete Sayı: 30737',
    url: 'https://www.resmigazete.gov.tr/eskiler/2019/04/20190406-3.htm',
    sourceAuthority: 'T.C. Sanayi ve Teknoloji Bakanlığı & Resmi Gazete',
    description: 'Bina asansörlerinin aylık periyodik bakımı, yıllık A tipi muayene kuruluşu yeşil etiket denetimleri.',
    category: 'regulation',
  },
  {
    id: 'iso-41001',
    name: 'ISO 41001:2018 Facility Management — Management Systems',
    officialNumber: 'ISO 41001:2018',
    url: 'https://www.iso.org/standard/68021.html',
    sourceAuthority: 'International Organization for Standardization (ISO)',
    description: 'Entegre tesis yönetiminde küresel kalite, maliyet verimliliği ve kullanıcı memnuniyeti standardı.',
    category: 'iso_standard',
  },
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015 Quality Management Systems — Requirements',
    officialNumber: 'ISO 9001:2015',
    url: 'https://www.iso.org/standard/62085.html',
    sourceAuthority: 'International Organization for Standardization (ISO)',
    description: 'Kalite yönetim sistemi standardı, operasyonel mükemmeliyet ve kurumsal hizmet güvencesi.',
    category: 'iso_standard',
  },
  {
    id: 'iso-27001',
    name: 'ISO/IEC 27001:2022 Information Security Management Systems',
    officialNumber: 'ISO/IEC 27001:2022',
    url: 'https://www.iso.org/standard/82875.html',
    sourceAuthority: 'International Organization for Standardization (ISO)',
    description: 'Bilgi güvenliği, KVKK uyumluluğu ve dijital tesis altyapıları koruma standardı.',
    category: 'iso_standard',
  },
  {
    id: 'iso-14001',
    name: 'ISO 14001:2015 Environmental Management Systems',
    officialNumber: 'ISO 14001:2015',
    url: 'https://www.iso.org/standard/60857.html',
    sourceAuthority: 'International Organization for Standardization (ISO)',
    description: 'Çevre yönetim sistemi, yeşil tesis yönetimi ve sürdürülebilir atık yönetimi standardı.',
    category: 'iso_standard',
  },
  {
    id: 'iso-45001',
    name: 'ISO 45001:2018 Occupational Health and Safety Management Systems',
    officialNumber: 'ISO 45001:2018',
    url: 'https://www.iso.org/standard/63787.html',
    sourceAuthority: 'International Organization for Standardization (ISO)',
    description: 'İş sağlığı ve güvenliği standardı, tesislerde sıfır kaza ve acil durum tahliye güvenliği.',
    category: 'iso_standard',
  },
  {
    id: 'iso-10002',
    name: 'ISO 10002:2018 Quality Management — Customer Satisfaction',
    officialNumber: 'ISO 10002:2018',
    url: 'https://www.iso.org/standard/71580.html',
    sourceAuthority: 'International Organization for Standardization (ISO)',
    description: 'Müşteri memnuniyeti ve şikayetlerin ele alınması kılavuz standardı.',
    category: 'iso_standard',
  },
  {
    id: 'tse-13247',
    name: 'TSE 13247 Hizmet Yerleri — Tesis Yönetimi Kuralları',
    officialNumber: 'TS 13247',
    url: 'https://www.tse.org.tr/',
    sourceAuthority: 'Türk Standardları Enstitüsü (TSE)',
    description: 'Türkiye\'de profesyonel tesis ve site yönetimi şirketlerinin taşıması gereken operasyonel yeterlilik standardı.',
    category: 'iso_standard',
  },
  {
    id: 'tse-hyb-12850',
    name: 'TSE HYB 12850 Hizmet Yeri Yeterlilik Standardı',
    officialNumber: 'TS 12850',
    url: 'https://www.tse.org.tr/',
    sourceAuthority: 'Türk Standardları Enstitüsü (TSE)',
    description: 'Tesis ve bina yönetiminde Türk Standardları Enstitüsü onaylı Hizmet Yeterlilik Belgesi (HYB).',
    category: 'iso_standard',
  },
  {
    id: 'yargitay-emsal',
    name: 'Yargıtay Kat Mülkiyeti Hukuk Genel Kurulu Emsal Kararları',
    officialNumber: 'Yargıtay Bilgi Bankası',
    url: 'https://karararama.yargitay.gov.tr/',
    sourceAuthority: 'T.C. Yargıtay Başkanlığı',
    description: 'Site genel kurul iptali, gecikme tazminatı (%5) ve ortak yer müdahaleleri içtihatları.',
    category: 'jurisprudence',
  },
];

/**
 * Resmi Mevzuat Dış Otorite Linkleri İçin Schema.org `citation` Listesi Üretir.
 */
export function generateExternalCitationsSchema() {
  return OFFICIAL_LEGAL_CITATIONS.map((cit) => ({
    '@type': 'Legislation',
    name: cit.name,
    url: cit.url,
    legislationType: cit.category,
    publisher: {
      '@type': 'GovernmentOrganization',
      name: cit.sourceAuthority,
    },
    description: cit.description,
  }));
}

/**
 * Sayfada render edilecek güvenli dış bağlantı HTML'i üretir.
 */
export function renderExternalCitationLink(citationId: string, customAnchor?: string): string {
  const cit = OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === citationId);
  if (!cit) return '';
  const anchor = customAnchor || cit.name;
  return `<a href="${cit.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium" title="${cit.name} — ${cit.sourceAuthority}">${anchor}</a>`;
}

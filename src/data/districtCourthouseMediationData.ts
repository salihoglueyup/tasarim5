/**
 * 39 İlçe Yetkili Sulh Hukuk Adliyesi ve Zorunlu Arabuluculuk Rehberi Veri Modeli (districtCourthouseMediationData.ts)
 * 
 * 1 Eylül 2023 7445 Sayılı Kanun gereğince KMK davalarında (aidat itirazları, tahliye, genel kurul iptali)
 * dava şartı haline gelen Zorunlu Arabuluculuk ve yetkili İstanbul Adliyeleri haritası.
 */

export interface CourthouseJurisdiction {
  courthouseId: string;
  courthouseName: string;
  address: string;
  phone: string;
  mediationBureauTitle: string;
  jurisdictionDistricts: string[];
  googleMapsLink: string;
}

export interface DistrictCourthouseProfile {
  districtSlug: string;
  districtName: string;
  courthouseName: string;
  courthouseAddress: string;
  courthousePhone: string;
  mediationBureauName: string;
  mandatoryMediationNote: string;
  requiredDocumentsForMediation: string[];
  aloYonetimLegalSupport: string;
}

export const ISTANBUL_COURTHOUSES: CourthouseJurisdiction[] = [
  {
    courthouseId: 'istanbul-caglayan',
    courthouseName: 'İstanbul Adalet Sarayı (Çağlayan)',
    address: 'Çağlayan Mah. Vatan Cad. No:34 Kağıthane / İstanbul',
    phone: '+90 (212) 375 75 75',
    mediationBureauTitle: 'İstanbul Adliyesi Arabuluculuk Bürosu (C Blok Giriş Kat)',
    jurisdictionDistricts: ['sisli', 'besiktas', 'kagithane', 'sariyer', 'beyoglu', 'fatih', 'eyupsultan'],
    googleMapsLink: 'https://maps.google.com/?q=Istanbul+Adalet+Sarayi+Caglayan',
  },
  {
    courthouseId: 'istanbul-anadolu-kartal',
    courthouseName: 'İstanbul Anadolu Adalet Sarayı (Kartal)',
    address: 'Cevizli Mah. D-100 Güney Yan Yol No:1 Kartal / İstanbul',
    phone: '+90 (216) 303 10 00',
    mediationBureauTitle: 'İstanbul Anadolu Adliyesi Arabuluculuk Bürosu (E Blok)',
    jurisdictionDistricts: [
      'kadikoy', 'uskudar', 'atasehir', 'maltepe', 'kartal', 'pendik',
      'umraniye', 'beykoz', 'tuzla', 'cekmekoy', 'sancaktepe', 'sultanbeyli', 'sile', 'adalar'
    ],
    googleMapsLink: 'https://maps.google.com/?q=Istanbul+Anadolu+Adalet+Sarayi',
  },
  {
    courthouseId: 'bakirkoy',
    courthouseName: 'Bakırköy Adalet Sarayı',
    address: 'Osmaniye Mah. İsmail Erez Bulvarı No:1 Bakırköy / İstanbul',
    phone: '+90 (212) 414 54 00',
    mediationBureauTitle: 'Bakırköy Adliyesi Arabuluculuk Bürosu (Ana Hizmet Binası)',
    jurisdictionDistricts: ['bakirkoy', 'bahcelievler', 'bagcilar', 'gungoren', 'zeytinburnu', 'basaksehir', 'esenler'],
    googleMapsLink: 'https://maps.google.com/?q=Bakirkoy+Adalet+Sarayi',
  },
  {
    courthouseId: 'buyukcekmece',
    courthouseName: 'Büyükçekmece Adalet Sarayı',
    address: 'Fatih Mah. Rıza Küçükoğlupaşa Cad. No:20 Büyükçekmece / İstanbul',
    phone: '+90 (212) 881 22 22',
    mediationBureauTitle: 'Büyükçekmece Arabuluculuk Bürosu',
    jurisdictionDistricts: ['buyukcekmece', 'beylikduzu', 'esenyurt', 'avcilar', 'catalca', 'kucukcekmece'],
    googleMapsLink: 'https://maps.google.com/?q=Buyukcekmece+Adalet+Sarayi',
  },
  {
    courthouseId: 'gaziosmanpasa',
    courthouseName: 'Gaziosmanpaşa Adalet Sarayı',
    address: 'Merkez Mah. Salih Paşa Cad. No:49 Gaziosmanpaşa / İstanbul',
    phone: '+90 (212) 578 88 00',
    mediationBureauTitle: 'Gaziosmanpaşa Adliyesi Arabuluculuk Bürosu',
    jurisdictionDistricts: ['gaziosmanpasa', 'sultangazi', 'arnavutkoy'],
    googleMapsLink: 'https://maps.google.com/?q=Gaziosmanpasa+Adalet+Sarayi',
  },
  {
    courthouseId: 'silivri',
    courthouseName: 'Silivri Adalet Sarayı',
    address: 'Alibey Mah. Turgut Özal Bulvarı No:3 Silivri / İstanbul',
    phone: '+90 (212) 727 25 50',
    mediationBureauTitle: 'Silivri Arabuluculuk Bürosu',
    jurisdictionDistricts: ['silivri'],
    googleMapsLink: 'https://maps.google.com/?q=Silivri+Adalet+Sarayi',
  },
];

export function getDistrictCourthouseProfile(slug: string): DistrictCourthouseProfile {
  const courthouse = ISTANBUL_COURTHOUSES.find((ch) => ch.jurisdictionDistricts.includes(slug)) || ISTANBUL_COURTHOUSES[0];
  const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    districtSlug: slug,
    districtName: capitalized,
    courthouseName: courthouse.courthouseName,
    courthouseAddress: courthouse.address,
    courthousePhone: courthouse.phone,
    mediationBureauName: courthouse.mediationBureauTitle,
    mandatoryMediationNote: `7445 Sayılı Kanun (1 Eylül 2023) uyarınca ${capitalized} sınırları içerisindeki tüm kat mülkiyeti, aidat itirazları ve genel kurul kararı iptali uyuşmazlıklarında doğrudan Sulh Hukuk Mahkemesi'ne dava açılamaz; öncelikle ${courthouse.courthouseName} nezdindeki Arabuluculuk Bürosu'na başvurulması yasal dava şartıdır.`,
    requiredDocumentsForMediation: [
      'Kat Mülkiyeti Tapu Kaydı ve Bağımsız Bölüm Bilgisi',
      'İlgili Yıla Ait Noter Onaylı Karar Defteri Sureti',
      'KMK Madde 37 Uyarınca Tebliğ Edilmiş İşletme Projesi',
      'Apsiyon Sisteminden Alınmış Kaşeli Cari Hesap Ekstresi',
      'Uyuşmazlık Konusu (İcra İtirazı, Ortak Alan İşgali vb.) Özet Dilekçesi',
    ],
    aloYonetimLegalSupport: `Alo Yönetim Hukuk Departmanı, ${capitalized} bölgesinde yönettiği sitelerin tüm arabuluculuk müzakerelerinde hazır bulunur; eksiksiz evrak hazırlığı ile uyuşmazlıkların %85'ini mahkemeye gitmeden arabuluculuk masasında çözer.`,
  };
}

/**
 * 39 İlçe Açık Veri & Yerel KMK Profilleri (districtOpenDataProfiles.ts)
 * 
 * Schema.org Dataset, Google Dataset Search ve AI Grounding için 39 ilçenin
 * konut stoğu, m² aidat piyasa endeksi, tasarruf oranları ve yerel KMK ihtilaf verileri.
 */

import { DISTRICTS, getDistrictDues } from '@/data/districts';

export interface DistrictOpenDataProfile {
  slug: string;
  name: string;
  side: 'anadolu' | 'avrupa';
  datasetTitle: string;
  temporalCoverage: string;
  spatialCoverage: string;
  housingSitesEstimated: number;
  avgDuesM2: number;
  aloDuesM2: number;
  savingsRate: number;
  kmkFocusTopic: string;
  kmkLegalChallenge: string;
  localJurisdictionNote: string;
  distributionFormat: string;
  licenseUrl: string;
}

const DISTRICT_KMK_HOTSPOTS: Record<string, { topic: string; challenge: string; courtNote: string }> = {
  kadikoy: {
    topic: 'Kentsel Dönüşüm, Otopark Tahsisi & Aidat İcrası',
    challenge: 'Bağdat Caddesi ve çevresinde yenilenen binalarda tahsisli kapalı otopark paylaşımı ve dönüşüm sürecinde eski borçların devri en sık görülen ihtilaftır.',
    courtNote: 'Kadıköy Sulh Hukuk Mahkemeleri’nde KMK m.4 ortak yer tahsisi ve m.20 aidat icra takipleri yoğunluktadır.',
  },
  besiktas: {
    topic: 'Tarihi ve Bitişik Binalarda Asansör Kurulumu & Çatı Ortak Giderleri',
    challenge: 'Eski yapı stoğunda asansör tesis edilmesi (KMK m.42) ve çatı teras kullanım hakları kat malikleri arasında temel dava konusudur.',
    courtNote: 'İstanbul (Çağlayan) Sulh Hukuk Mahkemeleri nezdinde mimari tadilat ve 4/5 onay davaları öne çıkmaktadır.',
  },
  basaksehir: {
    topic: 'Toplu Yapı Yönetimi, Temsilciler Kurulu & Çok Parselli Siteler',
    challenge: 'Onlarca blok ve binlerce konuttan oluşan sitelerde blok kat malikleri kurulu ile Temsilciler Kurulu yetki devri sınırları.',
    courtNote: 'Bakırköy ve Küçükçekmece mahkemelerinde KMK Ek Madde 66-74 toplu yapı iptal davaları emsal teşkil eder.',
  },
  sariyer: {
    topic: 'Villa Siteleri, Güvenlik Maliyetleri & Bağımsız Parsel Yönetimi',
    challenge: 'Müstakil villa parsellerinin ortak sosyal tesis, 5188 güvenlik ve peyzaj giderlerine arsa payı oranında katılım yükümlülüğü.',
    courtNote: 'İstanbul Sulh Hukuk Mahkemeleri’nde yönetim planı muafiyet maddeleri Yargıtay 20. H.D. içtihatlarıyla denetlenir.',
  },
  sisli: {
    topic: 'Karma Kullanımlı (Rezidans + Ofis) Projelerde Aidat Adaleti',
    challenge: 'Altında ticari mağaza, üstünde konut olan yapılarda giriş kapısı, jeneratör ve güvenlik giderlerinin arsa payına göre bölüştürülmesi.',
    courtNote: 'Çağlayan Adliyesi’nde ticari dükkanların asansör ve temizlik gider muafiyet davaları karara bağlanmaktadır.',
  },
  atasehir: {
    topic: 'Finans Merkezi Çevresi Yüksek Bloklar & Merkezi Isıtma Paylaşımı',
    challenge: 'Merkezi sistem pay ölçer (kalorimetre) gider dağıtımı ve %99.2 aidat tahsilatının korunması.',
    courtNote: 'İstanbul Anadolu Adliyesi’nde ısı pay ölçer yönetmeliği ve KMK m.20 gecikme faizi kararları yoğundur.',
  },
  esenyurt: {
    topic: 'Çok Kuleli Siteler, Yabancı Malik Tebligatları & Kayyum Riski',
    challenge: 'Farklı uyruklardan maliklerin bulunduğu sitelerde genel kurul çağrılarının tebliği ve toplantı nisaplarının (%50+1) sağlanması.',
    courtNote: 'Büyükçekmece Sulh Hukuk Mahkemesi nezdinde yönetici seçilememesi nedeniyle KMK m.34 kayyum atama talepleri yaygındır.',
  },
  uskudar: {
    topic: 'Boğaz Öngörünüm Bölgesi Mimari Kısıtlar & Çatı Yalıtımı',
    challenge: 'Boğaziçi İmar mevzuatı kapsamında ortak çatı ve cephe yenilemelerinde tüm kat maliklerinin gider sorumluluğu.',
    courtNote: 'Anadolu Adliyesi kararlarında acil çatı onarımı için yöneticiye re’sen harcama yetkisi veren içtihatlar uygulanır.',
  },
  maltepe: {
    topic: 'Kıyı Şeridi Siteleri & Havuzlu Konut Kompleksi İşletmeciliği',
    challenge: 'Açık havuz, sauna ve fitness salonu bakım maliyetlerinin mülk sahibi vs kiracı sorumluluk dağılımı.',
    courtNote: 'Anadolu Adliyesi Sulh Hukuk Daireleri’nde kiracının müteselsil aidat sorumluluğu karara bağlanır.',
  },
  pendik: {
    topic: 'Sanayi ve Konut Komşuluğu & 5188 Özel Güvenlik Denetimi',
    challenge: 'Büyük ölçekli toplu konutlarda çevre nizamiye güvenliği ve araç plaka tanıma sistemi maliyet paylaşımı.',
    courtNote: 'Anadolu Adliyesi’nde ortak güvenlik kameralarının KVKK uyumu ve işletme projesi davaları incelenir.',
  },
  beylikduzu: {
    topic: 'Geniş Peyzajlı Siteler, Su Depoları & Jeneratör Yedek Parça Fonu',
    challenge: 'Geniş yeşil alan sulama ve jeneratör yakıt giderlerinin işletme projesine KMK m.37 uyarınca doğru yansıtılması.',
    courtNote: 'Büyükçekmece Adliyesi’nde demirbaş fonu ile cari aidat ayrımına dair emsal kararlar mevcuttur.',
  },
  bakirkoy: {
    topic: 'Deprem Güçlendirme Masrafları & Balkon Camlama İhtilafları',
    challenge: 'Kıyı şeridi binalarında korozyon onarımı ve 4/5 yazılı onay alınmaksızın yapılan dış cephe değişiklikleri.',
    courtNote: 'Bakırköy Sulh Hukuk Mahkemesi’nde KMK 19/2 eski hale iade ve güçlendirme avansı icraları görülmektedir.',
  },
};

export function getDistrictOpenDataProfile(slug: string): DistrictOpenDataProfile {
  const district = DISTRICTS.find((d) => d.slug === slug);
  const dues = getDistrictDues(slug);
  const hotspot = DISTRICT_KMK_HOTSPOTS[slug] || {
    topic: '634 KMK Bütçe Disiplini & Profesyonel Yönetici Seçimi',
    challenge: 'Apartman ve sitelerde KMK Madde 34 uyarınca çift çoğunlukla profesyonel yönetici seçimi ve %99.2 aidat tahsilatının tesisi.',
    courtNote: 'Bölge adliyesi Sulh Hukuk Mahkemeleri’nde KMK m.20 ilamsız icra takipleri ve genel kurul iptal davaları görülür.',
  };

  const name = district?.name || slug;
  const housingSites = district?.totalResidentialSitesEstimated || (district?.managedProjects ? district.managedProjects * 18 : 1200);

  return {
    slug,
    name,
    side: district?.side?.toLowerCase() === 'anadolu' ? 'anadolu' : 'avrupa',
    datasetTitle: `${name} Konut Stoğu, Aidat Endeksi ve KMK Yönetim Veri Kümesi (2026)`,
    temporalCoverage: '2026-01-01/2026-12-31',
    spatialCoverage: `İstanbul, ${name}`,
    housingSitesEstimated: housingSites,
    avgDuesM2: dues.avgDuesM2,
    aloDuesM2: dues.aloDuesM2,
    savingsRate: dues.savingsRate,
    kmkFocusTopic: hotspot.topic,
    kmkLegalChallenge: hotspot.challenge,
    localJurisdictionNote: hotspot.courtNote,
    distributionFormat: 'application/json, text/markdown',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  };
}

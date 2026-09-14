/**
 * 39 İlçe Mikro-Semt & Mahalle Otorite Ağı Veri Modeli (districtNeighborhoodsData.ts)
 * 
 * Google Haritalar, "Near Me" (Yakınımdaki Site Yönetimi) ve uzun kuyruklu (long-tail)
 * semt aramaları ("Kozyatağı apartman yönetimi", "Maslak plaza yönetimi") için
 * Schema.org subServiceArea ve mikro mahalle ağ mimarisi.
 */

import { DISTRICTS } from '@/data/districts';

export interface MicroNeighborhoodItem {
  name: string;
  slug: string;
  typology: 'residential' | 'commercial' | 'luxury_coastal' | 'industrial_logistics';
  typologyLabel: string;
  focusKeyword: string;
  notableTraits: string;
}

export interface DistrictNeighborhoodCluster {
  districtSlug: string;
  districtName: string;
  side: 'anadolu' | 'avrupa';
  prominentNeighborhoods: MicroNeighborhoodItem[];
  totalTrackedAreasCount: number;
  localHubDistrict: string;
  serviceReachGuaranteeMinutes: number;
}

// İlçelere özgü mikro-semt tipolojileri ve uzun kuyruklu arama sinyalleri
const NEIGHBORHOOD_TYPOLOGY_MAP: Record<string, MicroNeighborhoodItem[]> = {
  kadikoy: [
    { name: 'Kozyatağı', slug: 'kozyatagi', typology: 'commercial', typologyLabel: 'Plaza & Konut', focusKeyword: 'Kozyatağı site ve plaza yönetimi', notableTraits: 'Yüksek katlı iş merkezleri ve kentsel dönüşümle yenilenen siteler.' },
    { name: 'Bağdat Caddesi', slug: 'bagdat-caddesi', typology: 'luxury_coastal', typologyLabel: 'Lüks Rezidans', focusKeyword: 'Bağdat Caddesi apartman yöneticiliği', notableTraits: 'Kapalı otopark paylaşımı ve butik apartman yönetimi talebi.' },
    { name: 'Caddebostan', slug: 'caddebostan', typology: 'luxury_coastal', typologyLabel: 'Kıyı Rezidans', focusKeyword: 'Caddebostan site yönetimi', notableTraits: 'Geniş peyzajlı bloklar ve sahil bandı korozyon önleyici teknik bakım.' },
    { name: 'Fenerbahçe', slug: 'fenerbahce', typology: 'luxury_coastal', typologyLabel: 'Butik Lüks', focusKeyword: 'Fenerbahçe apartman yönetimi', notableTraits: 'Yüksek arsa payı, jeneratör ve güvenlik personeli yönetimi.' },
    { name: 'Suadiye', slug: 'suadiye', typology: 'residential', typologyLabel: 'Konut Sitesi', focusKeyword: 'Suadiye profesyonel bina yönetimi', notableTraits: 'Kentsel dönüşüm sonrası devir teslim ve Apsiyon entegrasyonu.' },
    { name: 'Göztepe', slug: 'goztepe', typology: 'residential', typologyLabel: 'Konut', focusKeyword: 'Göztepe site yönetimi', notableTraits: 'Merkezi ısıtma, payölçer ve asansör yeşil etiket denetimleri.' },
    { name: 'Acıbadem', slug: 'acibadem', typology: 'residential', typologyLabel: 'Geniş Siteler', focusKeyword: 'Acıbadem site yönetimi şirketi', notableTraits: 'Güvenlikli toplu konutlar ve ortak yeşil alan sulama optimizasyonu.' },
    { name: 'Moda (Caferağa)', slug: 'moda', typology: 'residential', typologyLabel: 'Tarihi Doku', focusKeyword: 'Moda apartman yönetimi', notableTraits: 'Eski yapı stoğunda KMK m.42 asansör tadilatı ve çatı bakımı.' },
  ],
  besiktas: [
    { name: 'Levent', slug: 'levent', typology: 'commercial', typologyLabel: 'A+ Plaza & İş Merkezi', focusKeyword: 'Levent plaza yönetimi', notableTraits: 'BMS otomasyonu, X-ray turnike ve ISO 41001 entegre tesis yönetimi.' },
    { name: 'Etiler', slug: 'etiler', typology: 'luxury_coastal', typologyLabel: 'Lüks Konut', focusKeyword: 'Etiler site yönetimi şirketi', notableTraits: 'Özel güvenlik, resepsiyon ve havuzlu butik siteler.' },
    { name: 'Gayrettepe', slug: 'gayrettepe', typology: 'commercial', typologyLabel: 'Karma Plaza/Konut', focusKeyword: 'Gayrettepe bina ve iş merkezi yönetimi', notableTraits: 'Merkezi lokasyonda otopark ve kompanzasyon takibi.' },
    { name: 'Bebek', slug: 'bebek', typology: 'luxury_coastal', typologyLabel: 'Boğaz Hattı', focusKeyword: 'Bebek apartman yönetimi', notableTraits: 'Özel mülkiyet, istinat duvarı ve tarihi bina izin süreçleri.' },
    { name: 'Ulus', slug: 'ulus', typology: 'luxury_coastal', typologyLabel: 'Rezidans & Villa', focusKeyword: 'Ulus lüks site yönetimi', notableTraits: '24 saat güvenlik devriyesi ve akıllı ev altyapıları.' },
    { name: 'Akatlar', slug: 'akatlar', typology: 'residential', typologyLabel: 'Sakin Siteler', focusKeyword: 'Akatlar site yönetimi', notableTraits: 'Sosyal tesisler, spor alanları ve şeffaf aidat disiplini.' },
  ],
  sisli: [
    { name: 'Mecidiyeköy', slug: 'mecidiyekoy', typology: 'commercial', typologyLabel: 'Yoğun İş Merkezi', focusKeyword: 'Mecidiyeköy plaza yönetimi', notableTraits: 'Yüksek yaya trafiği, asansör ve jeneratör sürekli revizyonu.' },
    { name: 'Nişantaşı', slug: 'nisantasi', typology: 'luxury_coastal', typologyLabel: 'Prestij Apartman', focusKeyword: 'Nişantaşı bina yönetimi', notableTraits: 'Tarihi mimari, asansör muayeneleri ve ortak gider paylaşımı.' },
    { name: 'Bomonti', slug: 'bomonti', typology: 'commercial', typologyLabel: 'Rezidans Kuleleri', focusKeyword: 'Bomonti rezidans yönetimi', notableTraits: 'Çok katlı kulelerde yangın sprinkler, vale ve kartlı geçiş.' },
    { name: 'Esentepe', slug: 'esentepe', typology: 'commercial', typologyLabel: 'Kurumsal Plazalar', focusKeyword: 'Esentepe tesis yönetimi', notableTraits: 'B2B teknik şartname ve ISO 41001 sertifikalı işletme.' },
  ],
  sariyer: [
    { name: 'Maslak', slug: 'maslak', typology: 'commercial', typologyLabel: 'Finans & Kule', focusKeyword: 'Maslak plaza tesis yönetimi', notableTraits: 'Bina otomasyon sistemleri (BMS), SCADA ve %0 reaktif ceza güvencesi.' },
    { name: 'Zekeriyaköy', slug: 'zekeriyakoy', typology: 'luxury_coastal', typologyLabel: 'Villa Siteleri', focusKeyword: 'Zekeriyaköy villa site yönetimi', notableTraits: 'Biyolojik arıtma, jeneratör yakıt ikmali ve geniş peyzaj ekipleri.' },
    { name: 'Tarabya', slug: 'tarabya', typology: 'luxury_coastal', typologyLabel: 'Boğaz Konutları', focusKeyword: 'Tarabya site yönetimi', notableTraits: 'Kıyı rutubetine karşı önleyici korozyon ve hidrofor kontrolü.' },
    { name: 'İstinye', slug: 'istinye', typology: 'luxury_coastal', typologyLabel: 'Lüks Rezidans', focusKeyword: 'İstinye rezidans yönetimi', notableTraits: 'Kapalı havuz, sauna, fitness ve 5188 silahlı/silahsız güvenlik.' },
  ],
  basaksehir: [
    { name: 'Bahçeşehir 1. Kısım', slug: 'bahcesehir-1-kisim', typology: 'residential', typologyLabel: 'Toplu Konut', focusKeyword: 'Bahçeşehir site yönetimi', notableTraits: 'KMK Madde 66-74 Toplu Yapı Temsilciler Kurulu ve çok bloklu bütçeler.' },
    { name: 'Bahçeşehir 2. Kısım', slug: 'bahcesehir-2-kisim', typology: 'residential', typologyLabel: 'Toplu Konut', focusKeyword: 'Bahçeşehir 2. kısım site yöneticiliği', notableTraits: 'Aidat icra takipleri ve merkezi klorlama sistemleri.' },
    { name: 'İkitelli OSB', slug: 'ikitelli-osb', typology: 'industrial_logistics', typologyLabel: 'Sanayi & Tesis', focusKeyword: 'İkitelli OSB tesis yönetimi', notableTraits: 'Trafo, yüksek akım panoları ve ağır sanayi çevre atık yönetimi.' },
    { name: 'Kayaşehir', slug: 'kayasehir', typology: 'residential', typologyLabel: 'Geniş Parseller', focusKeyword: 'Kayaşehir toplu konut yönetimi', notableTraits: 'Merkezi payölçer okuma, kalorimetre ve su deposu temizliği.' },
  ],
  atasehir: [
    { name: 'Batı Ataşehir', slug: 'bati-atasehir', typology: 'commercial', typologyLabel: 'Rezidans & Finans', focusKeyword: 'Batı Ataşehir rezidans yönetimi', notableTraits: 'Finans Merkezi çevresi gökdelenlerde 7/24 teknik kadro.' },
    { name: 'İçerenköy', slug: 'icerenkoy', typology: 'residential', typologyLabel: 'Konut & Ticari', focusKeyword: 'İçerenköy apartman yönetimi', notableTraits: 'Kentsel dönüşüm binalarında işletme projesi ve Apsiyon geçişi.' },
    { name: 'Küçükbakkalköy', slug: 'kucukbakkalkoy', typology: 'residential', typologyLabel: 'Siteler', focusKeyword: 'Küçükbakkalköy site yönetimi', notableTraits: 'Kapalı otopark, asansör yeşil etiket ve şeffaf banka hesabı.' },
  ],
  bakirkoy: [
    { name: 'Ataköy', slug: 'atakoy', typology: 'luxury_coastal', typologyLabel: 'Sahil Kuleleri', focusKeyword: 'Ataköy site ve rezidans yönetimi', notableTraits: 'Kıyı şeridi rüzgar/tuz korozyon bakımları ve toplu yapı delegasyonu.' },
    { name: 'Yeşilköy', slug: 'yesilkoy', typology: 'luxury_coastal', typologyLabel: 'Butik Siteler', focusKeyword: 'Yeşilköy apartman yönetimi', notableTraits: 'Düşük katlı seçkin sitelerde 5188 güvenlik ve peyzaj mimarisi.' },
    { name: 'Florya', slug: 'florya', typology: 'luxury_coastal', typologyLabel: 'Lüks Siteler', focusKeyword: 'Florya lüks site yönetimi', notableTraits: 'Özel havuz hijyeni, jeneratör kapasite testleri ve gizlilik protokolü.' },
  ],
  umraniye: [
    { name: 'Ümraniye Finans Merkezi', slug: 'finans-merkezi', typology: 'commercial', typologyLabel: 'Uluslararası Finans', focusKeyword: 'İstanbul Finans Merkezi tesis yönetimi', notableTraits: 'Bina yaşam döngüsü, Platinum SLA ve SCADA entegrasyonu.' },
    { name: 'Şerifali', slug: 'serifali', typology: 'residential', typologyLabel: 'Yeni Siteler', focusKeyword: 'Şerifali site yönetimi', notableTraits: 'Yüksek aidat tahsilat oranı ve asansör servis anlaşmaları.' },
  ],
  maltepe: [
    { name: 'Küçükyalı', slug: 'kucukyali', typology: 'residential', typologyLabel: 'Konut & Plaza', focusKeyword: 'Küçükyalı site yönetimi', notableTraits: 'E-5 ve sahil hattı sitelerinde düzenli bakım ve Apsiyon entegrasyonu.' },
    { name: 'İdealtepe', slug: 'idealtepe', typology: 'residential', typologyLabel: 'Sahil Konutları', focusKeyword: 'İdealtepe apartman yönetimi', notableTraits: 'Çift çoğunlukla yönetici seçimi ve bina temizliği.' },
  ],
  uskudar: [
    { name: 'Altunizade', slug: 'altunizade', typology: 'commercial', typologyLabel: 'İş Merkezi & Konut', focusKeyword: 'Altunizade tesis ve bina yönetimi', notableTraits: 'Yoğun trafikli arterlerde otopark koordinasyonu ve güvenlik.' },
    { name: 'Acıbadem (Üsküdar)', slug: 'acibadem-uskudar', typology: 'residential', typologyLabel: 'Köklü Siteler', focusKeyword: 'Üsküdar Acıbadem site yönetimi', notableTraits: 'Merkezi ısıtma, payölçer ve asansör yeşil etiket denetimleri.' },
    { name: 'Kandilli', slug: 'kandilli', typology: 'luxury_coastal', typologyLabel: 'Boğaz Villaları', focusKeyword: 'Kandilli villa site yönetimi', notableTraits: 'Özel güvenlik, bahçıvanlık ve arıtma tesisi işletimi.' },
  ],
};

export function getDistrictNeighborhoodCluster(slug: string): DistrictNeighborhoodCluster {
  const district = DISTRICTS.find((d) => d.slug === slug);
  const side = district?.side?.toLowerCase() === 'anadolu' ? 'anadolu' : 'avrupa';
  const name = district?.name || slug;

  // Özel haritalandırılmış mahalleler veya districts.ts genel listesi
  const mapped = NEIGHBORHOOD_TYPOLOGY_MAP[slug];
  let prominentNeighborhoods: MicroNeighborhoodItem[] = [];

  if (mapped && mapped.length > 0) {
    prominentNeighborhoods = mapped;
  } else if (district?.neighborhoods && district.neighborhoods.length > 0) {
    prominentNeighborhoods = district.neighborhoods.slice(0, 6).map((n) => ({
      name: n,
      slug: n.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      typology: 'residential' as const,
      typologyLabel: 'Konut & Apartman',
      focusKeyword: `${n} site ve apartman yönetimi`,
      notableTraits: `${name} ${n} mahallesinde 634 KMK uyumlu profesyonel yönetim, şeffaf aidat ve 45 dk acil servis.`,
    }));
  } else {
    prominentNeighborhoods = [
      {
        name: `${name} Merkez`,
        slug: `${slug}-merkez`,
        typology: 'residential',
        typologyLabel: 'Merkez Siteler',
        focusKeyword: `${name} site yönetimi şirketi`,
        notableTraits: '634 KMK şeffaf bütçe işletmesi ve %99.2 aidat tahsilat garantisi.',
      },
    ];
  }

  return {
    districtSlug: slug,
    districtName: name,
    side,
    prominentNeighborhoods,
    totalTrackedAreasCount: prominentNeighborhoods.length,
    localHubDistrict: name,
    serviceReachGuaranteeMinutes: 45,
  };
}

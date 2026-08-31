/**
 * 39 İlçe Çift Çekirdekli (Dual-Core) Mikro-Lokasyon & Mahalle Matrisi (Alo Yönetim)
 * 
 * İstanbul'un 39 ilçesinin tamamını hem 'Site Yönetimi (B2C/Konut)' hem de
 * 'Tesis Yönetimi (B2B/Ticari)' arama niyetleriyle mikro mahalle düzeyinde,
 * yerel dinamikleri ve long-tail anahtar kelimeleriyle modeller.
 */

import { DomainPillar } from './domainKeywordsTaxonomy';
import { DISTRICTS } from '@/data/districts';

export interface DistrictSiteCoreData {
  districtSlug: string;
  districtName: string;
  keyNeighborhoods: string[];
  housingProfile: 'villasite' | 'toplukonut' | 'rezidans' | 'karma';
  estimatedSiteCount: number;
  dominantIssues: string[];
  targetKeywords: string[];
  longTailKeywords: string[];
  serpTitle: string;
  serpDescription: string;
}

export interface DistrictFacilityCoreData {
  districtSlug: string;
  districtName: string;
  commercialNeighborhoods: string[];
  buildingProfile: 'plaza' | 'sanayi' | 'karma' | 'finans';
  estimatedCommercialCount: number;
  b2bServices: string[];
  targetKeywords: string[];
  longTailKeywords: string[];
  serpTitle: string;
  serpDescription: string;
}

export interface DistrictDualCoreEntry {
  slug: string;
  name: string;
  side: 'avrupa' | 'anadolu';
  siteCore: DistrictSiteCoreData;
  facilityCore: DistrictFacilityCoreData;
  sharedKpis: { label: string; value: string }[];
}

/**
 * 🏰 Avrupa Yakası İlçe Matrisleri
 */
export const EUROPEAN_SIDE_MATRIX: Record<string, DistrictDualCoreEntry> = {
  besiktas: {
    slug: 'besiktas',
    name: 'Beşiktaş',
    side: 'avrupa',
    siteCore: {
      districtSlug: 'besiktas',
      districtName: 'Beşiktaş',
      keyNeighborhoods: ['Bebek', 'Etiler', 'Arnavutköy', 'Kuruçeşme', 'Levent', 'Ulus', 'Gayrettepe'],
      housingProfile: 'rezidans',
      estimatedSiteCount: 380,
      dominantIssues: ['Konsiyerj & Vale Yönetimi', 'Lüks Site Aidat Optimizasyonu', 'Tarihi Yapı & Yalı İzinleri'],
      targetKeywords: ['Beşiktaş site yönetimi', 'Etiler lüks site yönetimi', 'Bebek villa yönetimi', 'Ulus rezidans yönetimi'],
      longTailKeywords: ['Beşiktaş profesyonel site yönetim şirketleri', 'Etiler güvenlikli site yönetimi', 'Bebek apartman yöneticiliği'],
      serpTitle: 'Beşiktaş Profesyonel Site ve Apartman Yönetimi Şirketi | Alo Yönetim',
      serpDescription: 'Beşiktaş, Etiler ve Bebek genelinde lüks siteler ve rezidanslar için 5188 güvenlik, konsiyerj ve KMK 634 uyumlu kurumsal yönetim.',
    },
    facilityCore: {
      districtSlug: 'besiktas',
      districtName: 'Beşiktaş',
      commercialNeighborhoods: ['Levent', 'Gayrettepe', 'Balmumcu', 'Nisbetiye'],
      buildingProfile: 'plaza',
      estimatedCommercialCount: 140,
      b2bServices: ['Plaza HVAC & Otomasyon', 'Akıllı Kartlı Geçiş', 'Kurumsal Enerji Tasarrufu'],
      targetKeywords: ['Beşiktaş tesis yönetimi', 'Levent plaza yönetimi', 'Gayrettepe iş merkezi yönetimi'],
      longTailKeywords: ['Levent plaza tesis yönetim şirketi', 'Beşiktaş kurumsal bina işletmesi ISO 41001'],
      serpTitle: 'Beşiktaş Plaza ve Entegre Tesis Yönetimi — ISO 41001 | Alo Yönetim',
      serpDescription: 'Levent ve Beşiktaş iş kulelerinde ISO 41001 standartlarında entegre tesis yönetimi, önleyici teknik bakım ve %99.2 SLA.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '42+ Site & Plaza' },
      { label: 'SLA Acil Müdahale', value: '15 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%28' },
    ],
  },
  sariyer: {
    slug: 'sariyer',
    name: 'Sarıyer',
    side: 'avrupa',
    siteCore: {
      districtSlug: 'sariyer',
      districtName: 'Sarıyer',
      keyNeighborhoods: ['Zekeriyaköy', 'Tarabya', 'Yeniköy', 'İstinye', 'Uskumruköy', 'Kilyos'],
      housingProfile: 'villasite',
      estimatedSiteCount: 520,
      dominantIssues: ['Geniş Peyzaj & Sulama', 'Havuz Kimyası & Bakımı', 'Geniş Alan 5188 Güvenlik'],
      targetKeywords: ['Sarıyer site yönetimi', 'Zekeriyaköy villa site yönetimi', 'Tarabya site yönetimi', 'İstinye lüks konut yönetimi'],
      longTailKeywords: ['Zekeriyaköy müstakil site yönetim şirketi', 'Sarıyer villa bahçe ve havuz bakım yönetimi'],
      serpTitle: 'Sarıyer Villa & Lüks Site Yönetimi Şirketi | Alo Yönetim',
      serpDescription: 'Sarıyer, Zekeriyaköy ve Tarabya villa sitelerinde peyzaj, havuz ve 5188 özel güvenlik entegreli profesyonel site yönetimi.',
    },
    facilityCore: {
      districtSlug: 'sariyer',
      districtName: 'Sarıyer',
      commercialNeighborhoods: ['Maslak', 'Ayazağa', 'Huzur', 'İTÜ Çevresi'],
      buildingProfile: 'plaza',
      estimatedCommercialCount: 180,
      b2bServices: ['Gökdelen & A+ Ofis Yönetimi', 'BMS & Yangın Otomasyonu', 'Yükleme & Lojistik Akış'],
      targetKeywords: ['Sarıyer tesis yönetimi', 'Maslak plaza yönetimi', 'Ayazağa iş merkezi yönetimi'],
      longTailKeywords: ['Maslak A+ plaza yönetim şirketi', 'Maslak kurumsal tesis işletmeciliği'],
      serpTitle: 'Maslak & Sarıyer Plaza Entegre Tesis Yönetimi | Alo Yönetim',
      serpDescription: 'Maslak ve Ayazağa A+ plazalarında ISO 41001 sertifikalı entegre tesis yönetimi, enerji optimizasyonu ve teknik işletme.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '56+ Site & Kule' },
      { label: 'SLA Acil Müdahale', value: '18 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%32' },
    ],
  },
  sisli: {
    slug: 'sisli',
    name: 'Şişli',
    side: 'avrupa',
    siteCore: {
      districtSlug: 'sisli',
      districtName: 'Şişli',
      keyNeighborhoods: ['Nişantaşı', 'Teşvikiye', 'Bomonti', 'Fulya', 'Mecidiyeköy', 'Esentepe'],
      housingProfile: 'rezidans',
      estimatedSiteCount: 310,
      dominantIssues: ['Kentsel Dönüşüm Yönetim Planı', 'Otopark Yönetimi', 'Asansör & Hidrofor Bakımı'],
      targetKeywords: ['Şişli site yönetimi', 'Bomonti rezidans yönetimi', 'Nişantaşı apartman yönetimi', 'Fulya site yönetimi'],
      longTailKeywords: ['Şişli kentsel dönüşüm apartman yönetimi', 'Bomonti kule site yönetim şirketi'],
      serpTitle: 'Şişli Profesyonel Site ve Rezidans Yönetimi | Alo Yönetim',
      serpDescription: 'Şişli, Bomonti ve Nişantaşı genelinde apartman, rezidans ve siteler için KMK 634 uyumlu profesyonel yönetim.',
    },
    facilityCore: {
      districtSlug: 'sisli',
      districtName: 'Şişli',
      commercialNeighborhoods: ['Mecidiyeköy', 'Büyükdere Caddesi', 'Esentepe', 'Halaskargazi'],
      buildingProfile: 'plaza',
      estimatedCommercialCount: 220,
      b2bServices: ['Orta & Büyük Ofis Yönetimi', 'Merkezi İklimlendirme', 'Ziyaretçi & Turnike Güvenliği'],
      targetKeywords: ['Şişli tesis yönetimi', 'Mecidiyeköy plaza yönetimi', 'Büyükdere caddesi bina yönetimi'],
      longTailKeywords: ['Mecidiyeköy ticari iş merkezi tesis yönetimi', 'Şişli kurumsal ofis binası bakımı'],
      serpTitle: 'Şişli & Mecidiyeköy İş Merkezi Tesis Yönetimi | Alo Yönetim',
      serpDescription: 'Mecidiyeköy ve Şişli iş merkezlerinde 7/24 teknik bakım, jeneratör ve güvenlik entegreli tesis yönetimi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '48+ Proje' },
      { label: 'SLA Acil Müdahale', value: '15 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%27' },
    ],
  },
  bakirkoy: {
    slug: 'bakirkoy',
    name: 'Bakırköy',
    side: 'avrupa',
    siteCore: {
      districtSlug: 'bakirkoy',
      districtName: 'Bakırköy',
      keyNeighborhoods: ['Ataköy', 'Florya', 'Yeşilköy', 'Yeşilyurt', 'Zuhuratbaba'],
      housingProfile: 'karma',
      estimatedSiteCount: 390,
      dominantIssues: ['Deniz Korozyonu Bakımı', 'Mega Blok Bütçe Konsolidasyonu', 'Kentsel Yenileme'],
      targetKeywords: ['Bakırköy site yönetimi', 'Ataköy site yönetimi', 'Florya villa yönetimi', 'Yeşilköy apartman yönetimi'],
      longTailKeywords: ['Ataköy blok site yönetim şirketleri', 'Florya güvenlikli site işletmeciliği'],
      serpTitle: 'Bakırköy & Ataköy Profesyonel Site Yönetimi | Alo Yönetim',
      serpDescription: 'Bakırköy, Ataköy ve Florya genelinde sahil siteleri ve toplu konutlar için KMK 634 garantili profesyonel yönetim.',
    },
    facilityCore: {
      districtSlug: 'bakirkoy',
      districtName: 'Bakırköy',
      commercialNeighborhoods: ['İncirli', 'E-5 Aksı', 'Dünya Ticaret Merkezi Çevresi', 'Yeşilköy CNR Bölgesi'],
      buildingProfile: 'karma',
      estimatedCommercialCount: 95,
      b2bServices: ['Fuar & Ticaret Merkezi Desteği', 'Ticari Blok Yönetimi', 'Otopark Otomasyonu'],
      targetKeywords: ['Bakırköy tesis yönetimi', 'İncirli iş merkezi yönetimi', 'Ataköy ofis yönetimi'],
      longTailKeywords: ['Bakırköy kurumsal tesis işletmeciliği', 'Yeşilköy ticari bina bakımı'],
      serpTitle: 'Bakırköy Ticari Tesis ve Bina Yönetimi | Alo Yönetim',
      serpDescription: 'Bakırköy genelinde ticari binalar ve ofis kompleksleri için ISO standartlarında entegre tesis yönetimi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '38+ Site' },
      { label: 'SLA Acil Müdahale', value: '20 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%30' },
    ],
  },
  basaksehir: {
    slug: 'basaksehir',
    name: 'Başakşehir',
    side: 'avrupa',
    siteCore: {
      districtSlug: 'basaksehir',
      districtName: 'Başakşehir',
      keyNeighborhoods: ['Bahçeşehir 1. Kısım', 'Bahçeşehir 2. Kısım', 'Kayaşehir', 'Başak', 'Ziya Gökalp'],
      housingProfile: 'toplukonut',
      estimatedSiteCount: 650,
      dominantIssues: ['Toplu Yapı Temsilciler Kurulu', 'Yüksek Daire Sayısı Aidat Tahsilatı', 'Geniş Ortak Alan Bakımı'],
      targetKeywords: ['Başakşehir site yönetimi', 'Bahçeşehir site yönetimi', 'Kayaşehir toplu konut yönetimi'],
      longTailKeywords: ['Bahçeşehir profesyonel site yönetim şirketleri', 'Başakşehir mega site aidat takibi'],
      serpTitle: 'Başakşehir & Bahçeşehir Toplu Konut Site Yönetimi | Alo Yönetim',
      serpDescription: 'Başakşehir ve Bahçeşehir mega toplu konutlarında KMK 66-74 uyumlu şeffaf aidat takibi ve 5188 güvenlik.',
    },
    facilityCore: {
      districtSlug: 'basaksehir',
      districtName: 'Başakşehir',
      commercialNeighborhoods: ['İkitelli OSB', 'Trikotajcılar', 'Metal-İş', 'Deparko'],
      buildingProfile: 'sanayi',
      estimatedCommercialCount: 310,
      b2bServices: ['Sanayi Sitesi Altyapı', 'Trafo & Yüksek Gerilim Bakımı', 'Ağır Vasıta Trafik Düzeni'],
      targetKeywords: ['Başakşehir tesis yönetimi', 'İkitelli OSB tesis yönetimi', 'İkitelli sanayi sitesi yönetimi'],
      longTailKeywords: ['İkitelli organize sanayi bölgesi tesis işletmesi', 'Başakşehir fabrika yönetim şirketi'],
      serpTitle: 'İkitelli OSB & Başakşehir Sanayi Tesisi Yönetimi | Alo Yönetim',
      serpDescription: 'İkitelli OSB ve Başakşehir sanayi sitelerinde altyapı, atık yönetimi ve trafo bakımlı entegre tesis yönetimi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '72+ Site & Kooperatif' },
      { label: 'SLA Acil Müdahale', value: '20 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%31' },
    ],
  },
  beylikduzu: {
    slug: 'beylikduzu',
    name: 'Beylikdüzü',
    side: 'avrupa',
    siteCore: {
      districtSlug: 'beylikduzu',
      districtName: 'Beylikdüzü',
      keyNeighborhoods: ['Barış', 'Büyükşehir', 'Cumhuriyet', 'Yakuplu', 'Gürpınar', 'Kavaklı'],
      housingProfile: 'toplukonut',
      estimatedSiteCount: 580,
      dominantIssues: ['Site İçi Asansör Denetimleri', 'Merkezi Isıtma & Payölçer', 'Aidat İcra Takibi'],
      targetKeywords: ['Beylikdüzü site yönetimi', 'Yakuplu site yönetimi', 'Gürpınar site yönetimi', 'Beylikdüzü apartman yönetimi'],
      longTailKeywords: ['Beylikdüzü profesyonel site yönetim firmaları', 'Beylikdüzü site aidat icra avukatı'],
      serpTitle: 'Beylikdüzü Profesyonel Site ve Apartman Yönetimi | Alo Yönetim',
      serpDescription: 'Beylikdüzü genelinde 1000+ daireli mega siteler için KMK 634 güvencesi, payölçer okuma ve %99.2 aidat tahsilatı.',
    },
    facilityCore: {
      districtSlug: 'beylikduzu',
      districtName: 'Beylikdüzü',
      commercialNeighborhoods: ['Beylikdüzü OSB', 'Haramidere', 'E-5 Ticaret Hattı'],
      buildingProfile: 'sanayi',
      estimatedCommercialCount: 160,
      b2bServices: ['Depo & Lojistik Alan Yönetimi', 'Tır Giriş-Çıkış Otomasyonu', 'Endüstriyel Yangın Güvenliği'],
      targetKeywords: ['Beylikdüzü tesis yönetimi', 'Haramidere iş merkezi yönetimi', 'Beylikdüzü OSB yönetimi'],
      longTailKeywords: ['Beylikdüzü sanayi ve depo tesis yönetimi', 'Haramidere plaza tesis işletmesi'],
      serpTitle: 'Beylikdüzü & Haramidere Tesis ve Sanayi Yönetimi | Alo Yönetim',
      serpDescription: 'Beylikdüzü sanayi tesisleri ve plazalarında ISO 41001 standartlarında profesyonel tesis işletmesi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '64+ Site' },
      { label: 'SLA Acil Müdahale', value: '25 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%33' },
    ],
  },
  esenyurt: {
    slug: 'esenyurt',
    name: 'Esenyurt',
    side: 'avrupa',
    siteCore: {
      districtSlug: 'esenyurt',
      districtName: 'Esenyurt',
      keyNeighborhoods: ['Güzelyurt', 'Mehterçeşme', 'Pınar', 'Yeşilkent', 'Akçaburgaz', 'Kıraç'],
      housingProfile: 'toplukonut',
      estimatedSiteCount: 720,
      dominantIssues: ['Kritik Aidat Tahsilat Sorunları', 'Güvenlik Zaafiyetleri', 'Yönetim Planı İptal Davaları'],
      targetKeywords: ['Esenyurt site yönetimi', 'Esenyurt apartman yönetimi', 'Kıraç site yönetimi', 'Esenyurt site icra takibi'],
      longTailKeywords: ['Esenyurt profesyonel site yönetim şirketleri', 'Esenyurt güvenilir site yöneticisi'],
      serpTitle: 'Esenyurt Profesyonel Site Yönetimi ve Hukuki Danışmanlık | Alo Yönetim',
      serpDescription: 'Esenyurt genelinde sorunlu sitelerde bütçe revizyonu, %99.2 aidat tahsilat garantisi ve 5188 güvenlik.',
    },
    facilityCore: {
      districtSlug: 'esenyurt',
      districtName: 'Esenyurt',
      commercialNeighborhoods: ['Kıraç Sanayi', 'Akçaburgaz Sanayi', 'Hadımköy Yolu'],
      buildingProfile: 'sanayi',
      estimatedCommercialCount: 280,
      b2bServices: ['Büyük Ölçekli Depo Yönetimi', 'Fabrika Bakım İşletmesi', 'Atık & Çevre Mevzuatı'],
      targetKeywords: ['Esenyurt tesis yönetimi', 'Kıraç sanayi tesisi yönetimi', 'Hadımköy depo yönetimi'],
      longTailKeywords: ['Esenyurt lojistik tesis yönetimi', 'Kıraç fabrika bakım işletmesi'],
      serpTitle: 'Esenyurt & Kıraç Sanayi Tesisi ve Lojistik Yönetimi | Alo Yönetim',
      serpDescription: 'Esenyurt sanayi bölgelerinde fabrika, antrepo ve lojistik tesisler için entegre tesis yönetimi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '85+ Site & Tesis' },
      { label: 'SLA Acil Müdahale', value: '25 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%35' },
    ],
  },
  kagithane: {
    slug: 'kagithane',
    name: 'Kâğıthane',
    side: 'avrupa',
    siteCore: {
      districtSlug: 'kagithane',
      districtName: 'Kâğıthane',
      keyNeighborhoods: ['Cendere Vadisi', 'Seyrantepe', 'Çeliktepe', 'Gültepe', 'Merkez'],
      housingProfile: 'karma',
      estimatedSiteCount: 290,
      dominantIssues: ['Yeni Rezidans Konsiyerj', 'Merkezi Isıtma & Klima', 'Kapalı Otopark'],
      targetKeywords: ['Kâğıthane site yönetimi', 'Cendere vadisi rezidans yönetimi', 'Seyrantepe site yönetimi'],
      longTailKeywords: ['Cendere vadisi profesyonel site yönetimi', 'Kâğıthane apartman yönetim firmaları'],
      serpTitle: 'Kâğıthane & Cendere Rezidans ve Site Yönetimi | Alo Yönetim',
      serpDescription: 'Cendere Vadisi ve Kâğıthane genelinde modern rezidanslar için 5188 güvenlik ve KMK 634 uyumlu yönetim.',
    },
    facilityCore: {
      districtSlug: 'kagithane',
      districtName: 'Kâğıthane',
      commercialNeighborhoods: ['Cendere Ofis Bölgesi', 'Seyrantepe Ticaret', 'Çağlayan'],
      buildingProfile: 'plaza',
      estimatedCommercialCount: 130,
      b2bServices: ['Yeni Nesil A+ Ofis İşletmesi', 'Enerji Kimlik & Verimlilik', 'Yangın & Tahliye Simülasyonu'],
      targetKeywords: ['Kâğıthane tesis yönetimi', 'Cendere ofis yönetimi', 'Seyrantepe plaza yönetimi'],
      longTailKeywords: ['Cendere vadisi kurumsal tesis yönetimi', 'Kâğıthane modern iş merkezi işletmesi'],
      serpTitle: 'Kâğıthane & Cendere Plaza Tesis Yönetimi | Alo Yönetim',
      serpDescription: 'Cendere ofis vadisinde ISO 41001 standartlarında profesyonel kurumsal tesis işletmesi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '34+ Proje' },
      { label: 'SLA Acil Müdahale', value: '18 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%28' },
    ],
  },
};

/**
 * 🌉 Anadolu Yakası İlçe Matrisleri
 */
export const ANATOLIAN_SIDE_MATRIX: Record<string, DistrictDualCoreEntry> = {
  kadikoy: {
    slug: 'kadikoy',
    name: 'Kadıköy',
    side: 'anadolu',
    siteCore: {
      districtSlug: 'kadikoy',
      districtName: 'Kadıköy',
      keyNeighborhoods: ['Moda', 'Caddebostan', 'Suadiye', 'Fenerbahçe', 'Bostancı', 'Erenköy', 'Göztepe', 'Feneryolu'],
      housingProfile: 'karma',
      estimatedSiteCount: 680,
      dominantIssues: ['Kentsel Dönüşüm Sonrası Yönetim Planı', 'Kapalı Otopark & Asansör Bakımı', 'Merkezi Isıtma & İzolasyon'],
      targetKeywords: ['Kadıköy site yönetimi', 'Caddebostan site yönetimi', 'Suadiye apartman yönetimi', 'Moda bina yönetimi', 'Fenerbahçe rezidans yönetimi'],
      longTailKeywords: ['Kadıköy profesyonel site yönetim şirketleri', 'Bağdat caddesi apartman yöneticiliği', 'Kadıköy kentsel dönüşüm bina yönetimi'],
      serpTitle: 'Kadıköy Profesyonel Site ve Apartman Yönetimi Şirketi | Alo Yönetim',
      serpDescription: 'Kadıköy, Bağdat Caddesi ve sahil siteleri için KMK 634 uyumlu profesyonel site yönetimi, 5188 güvenlik ve 15 dk acil teknik müdahale.',
    },
    facilityCore: {
      districtSlug: 'kadikoy',
      districtName: 'Kadıköy',
      commercialNeighborhoods: ['Kozyatağı', 'Merdivenköy', 'Fikirtepe İş Aksı', 'Söğütlüçeşme'],
      buildingProfile: 'plaza',
      estimatedCommercialCount: 210,
      b2bServices: ['A+ Plaza HVAC & Chiller Bakımı', 'Jeneratör & Trafo Senkronizasyonu', 'Elektronik Güvenlik & X-Ray'],
      targetKeywords: ['Kadıköy tesis yönetimi', 'Kozyatağı plaza yönetimi', 'Merdivenköy iş merkezi yönetimi', 'Fikirtepe ticari tesis yönetimi'],
      longTailKeywords: ['Kozyatağı plaza tesis yönetim firmaları', 'Kadıköy kurumsal bina tesis işletmeciliği ISO 41001'],
      serpTitle: 'Kadıköy & Kozyatağı Plaza Entegre Tesis Yönetimi — ISO 41001 | Alo Yönetim',
      serpDescription: 'Kozyatağı ve Kadıköy genelinde plazalar ve iş merkezleri için ISO 41001 sertifikalı entegre tesis yönetimi, önleyici teknik bakım ve %30 tasarruf.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '62+ Site & Plaza' },
      { label: 'SLA Acil Müdahale', value: '15 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%30' },
    ],
  },
  atasehir: {
    slug: 'atasehir',
    name: 'Ataşehir',
    side: 'anadolu',
    siteCore: {
      districtSlug: 'atasehir',
      districtName: 'Ataşehir',
      keyNeighborhoods: ['Batı Ataşehir', 'Barbaros', 'Atatürk', 'İçerenköy', 'Kayışdağı', 'Küçükbakkalköy'],
      housingProfile: 'rezidans',
      estimatedSiteCount: 490,
      dominantIssues: ['Rezidans Konsiyerj & Resepsiyon', 'Yüksek Katlı Bina Yangın Güvenliği', 'Aidat & İcra Takibi'],
      targetKeywords: ['Ataşehir site yönetimi', 'Batı Ataşehir rezidans yönetimi', 'Barbaros mahallesi site yönetimi'],
      longTailKeywords: ['Ataşehir profesyonel rezidans yönetim şirketi', 'Batı Ataşehir lüks site işletmeciliği'],
      serpTitle: 'Ataşehir Profesyonel Rezidans ve Site Yönetimi | Alo Yönetim',
      serpDescription: 'Ataşehir ve Batı Ataşehir kulelerinde 5188 lisanslı güvenlik, konsiyerj ve KMK 634 uyumlu dijital muhasebe.',
    },
    facilityCore: {
      districtSlug: 'atasehir',
      districtName: 'Ataşehir',
      commercialNeighborhoods: ['İstanbul Finans Merkezi (İFM)', 'Barbaros Finans Aksı', 'İçerenköy Ticaret'],
      buildingProfile: 'finans',
      estimatedCommercialCount: 190,
      b2bServices: ['Finans Kuleleri Tesis Yönetimi', 'BMS & Akıllı Enerji Otomasyonu', 'VIP Güvenlik Protokolü'],
      targetKeywords: ['Ataşehir tesis yönetimi', 'İstanbul Finans Merkezi tesis yönetimi', 'İFM plaza yönetimi', 'Ataşehir iş merkezi yönetimi'],
      longTailKeywords: ['İstanbul Finans Merkezi kurumsal tesis yönetimi', 'Ataşehir A+ plaza teknik işletmesi'],
      serpTitle: 'İstanbul Finans Merkezi (İFM) & Ataşehir Tesis Yönetimi | Alo Yönetim',
      serpDescription: 'İFM ve Ataşehir finans kulelerinde ISO 41001 standartlarında akıllı bina otomasyonu ve entegre kurumsal tesis işletmesi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '54+ Kule & Site' },
      { label: 'SLA Acil Müdahale', value: '15 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%29' },
    ],
  },
  uskudar: {
    slug: 'uskudar',
    name: 'Üsküdar',
    side: 'anadolu',
    siteCore: {
      districtSlug: 'uskudar',
      districtName: 'Üsküdar',
      keyNeighborhoods: ['Çengelköy', 'Kandilli', 'Beylerbeyi', 'Kuzguncuk', 'Acıbadem', 'Altunizade'],
      housingProfile: 'villasite',
      estimatedSiteCount: 420,
      dominantIssues: ['Boğaz Öngörünüm İmar Mevzuatı', 'Geniş Koruma Alanı Peyzajı', 'Güvenlik Kameraları'],
      targetKeywords: ['Üsküdar site yönetimi', 'Çengelköy villa yönetimi', 'Kandilli lüks site yönetimi', 'Acıbadem site yönetimi'],
      longTailKeywords: ['Çengelköy butik site yönetim şirketleri', 'Üsküdar Boğaz hattı site işletmeciliği'],
      serpTitle: 'Üsküdar & Çengelköy Villa ve Site Yönetimi | Alo Yönetim',
      serpDescription: 'Üsküdar, Çengelköy ve Kandilli villa sitelerinde Boğaz mevzuatına uyumlu peyzaj, 5188 güvenlik ve profesyonel yönetim.',
    },
    facilityCore: {
      districtSlug: 'uskudar',
      districtName: 'Üsküdar',
      commercialNeighborhoods: ['Altunizade', 'Kısıklı', 'Bağlarbaşı', 'Ünalan'],
      buildingProfile: 'plaza',
      estimatedCommercialCount: 110,
      b2bServices: ['Kurumsal Şirket Genel Merkez Yönetimi', 'Merkezi İklimlendirme', 'Hızlı Teknik Müdahale'],
      targetKeywords: ['Üsküdar tesis yönetimi', 'Altunizade plaza yönetimi', 'Kısıklı iş merkezi yönetimi'],
      longTailKeywords: ['Altunizade kurumsal şirket genel merkez tesis işletmesi', 'Üsküdar ofis yönetimi'],
      serpTitle: 'Altunizade & Üsküdar Plaza ve Tesis Yönetimi | Alo Yönetim',
      serpDescription: 'Altunizade ve Üsküdar genel merkez plazalarında ISO 41001 sertifikalı entegre teknik bakım ve tesis yönetimi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '41+ Proje' },
      { label: 'SLA Acil Müdahale', value: '18 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%27' },
    ],
  },
  maltepe: {
    slug: 'maltepe',
    name: 'Maltepe',
    side: 'anadolu',
    siteCore: {
      districtSlug: 'maltepe',
      districtName: 'Maltepe',
      keyNeighborhoods: ['Küçükyalı', 'İdealtepe', 'Altayçeşme', 'Zümrütevler', 'Cevizli', 'Başıbüyük'],
      housingProfile: 'toplukonut',
      estimatedSiteCount: 510,
      dominantIssues: ['Sahil Siteleri Tuz Korozyonu', 'Geniş Blok Muhasebesi', 'Site İçi Sosyal Tesisler'],
      targetKeywords: ['Maltepe site yönetimi', 'Küçükyalı site yönetimi', 'Zümrütevler toplu konut yönetimi'],
      longTailKeywords: ['Maltepe profesyonel site yönetim şirketleri', 'Küçükyalı apartman yöneticiliği'],
      serpTitle: 'Maltepe Profesyonel Site ve Apartman Yönetimi | Alo Yönetim',
      serpDescription: 'Maltepe ve Küçükyalı genelinde sahil ve tepe siteleri için KMK 634 güvenceli kurumsal site yönetimi.',
    },
    facilityCore: {
      districtSlug: 'maltepe',
      districtName: 'Maltepe',
      commercialNeighborhoods: ['E-5 Maltepe Aksı', 'Cevizli Ticaret', 'Küçükyalı Ofis Park'],
      buildingProfile: 'plaza',
      estimatedCommercialCount: 120,
      b2bServices: ['E-5 Plaza Hattı Yönetimi', 'Ortak Gider Dağıtımı', 'Önleyici Trafo Bakımı'],
      targetKeywords: ['Maltepe tesis yönetimi', 'Küçükyalı ofis park yönetimi', 'Cevizli plaza yönetimi'],
      longTailKeywords: ['Maltepe kurumsal ofis binası işletmeciliği', 'Küçükyalı E-5 plaza tesis bakımı'],
      serpTitle: 'Maltepe Plaza ve Ticari Tesis Yönetimi | Alo Yönetim',
      serpDescription: 'Maltepe E-5 hattındaki plazalar ve iş merkezleri için ISO 41001 akreditasyonlu tesis işletmesi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '45+ Site' },
      { label: 'SLA Acil Müdahale', value: '20 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%30' },
    ],
  },
  umraniye: {
    slug: 'umraniye',
    name: 'Ümraniye',
    side: 'anadolu',
    siteCore: {
      districtSlug: 'umraniye',
      districtName: 'Ümraniye',
      keyNeighborhoods: ['Atakent', 'Tatlısu', 'Şerifali', 'Çakmak', 'Ihlamurkuyu', 'İnkılap'],
      housingProfile: 'toplukonut',
      estimatedSiteCount: 560,
      dominantIssues: ['Hızlı Kentleşme Yönetim Uyuşmazlıkları', 'Aidat Tahsilatı', 'Otopark Güvenliği'],
      targetKeywords: ['Ümraniye site yönetimi', 'Şerifali site yönetimi', 'Tatlısu site yönetimi', 'Atakent apartman yönetimi'],
      longTailKeywords: ['Şerifali profesyonel site yönetim şirketleri', 'Ümraniye toplu konut aidat takibi'],
      serpTitle: 'Ümraniye & Şerifali Profesyonel Site Yönetimi | Alo Yönetim',
      serpDescription: 'Ümraniye ve Şerifali sitelerinde KMK 634 uyumlu şeffaf aidat muhasebesi ve 5188 özel güvenlik.',
    },
    facilityCore: {
      districtSlug: 'umraniye',
      districtName: 'Ümraniye',
      commercialNeighborhoods: ['Dudullu OSB', 'İMES Sanayi Sitesi', 'DES Sanayi Sitesi', 'KADOSAN'],
      buildingProfile: 'sanayi',
      estimatedCommercialCount: 340,
      b2bServices: ['OSB & İMES Altyapı Yönetimi', 'Endüstriyel Yangın Söndürme', 'Atık Su & Çevre Yönetimi'],
      targetKeywords: ['Ümraniye tesis yönetimi', 'Dudullu OSB tesis yönetimi', 'İMES sanayi sitesi yönetimi', 'DES tesis yönetimi'],
      longTailKeywords: ['Dudullu organize sanayi bölgesi tesis işletmesi', 'İMES sanayi sitesi profesyonel yönetimi'],
      serpTitle: 'Dudullu OSB & İMES Sanayi Tesisi Yönetimi | Alo Yönetim',
      serpDescription: 'Dudullu OSB, İMES ve DES sanayi sitelerinde ağır vasıta, trafo ve altyapı entegreli kurumsal tesis yönetimi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '68+ Site & Kooperatif' },
      { label: 'SLA Acil Müdahale', value: '20 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%32' },
    ],
  },
  pendik: {
    slug: 'pendik',
    name: 'Pendik',
    side: 'anadolu',
    siteCore: {
      districtSlug: 'pendik',
      districtName: 'Pendik',
      keyNeighborhoods: ['Kurtköy', 'Yenişehir', 'Batı', 'Güzelyalı', 'Kaynarca', 'Çamlık'],
      housingProfile: 'karma',
      estimatedSiteCount: 540,
      dominantIssues: ['Kurtköy Yeni Siteler İskan Süreçleri', 'Geniş Havuz & Peyzaj', 'Aidat Tahsilatı'],
      targetKeywords: ['Pendik site yönetimi', 'Kurtköy site yönetimi', 'Yenişehir rezidans yönetimi'],
      longTailKeywords: ['Kurtköy profesyonel site yönetim şirketleri', 'Pendik apartman yönetim firmaları'],
      serpTitle: 'Pendik & Kurtköy Profesyonel Site Yönetimi | Alo Yönetim',
      serpDescription: 'Pendik ve Kurtköy genelinde yeni konut siteleri için KMK 634 uyumlu yönetim ve %30 maliyet tasarrufu.',
    },
    facilityCore: {
      districtSlug: 'pendik',
      districtName: 'Pendik',
      commercialNeighborhoods: ['Teknopark İstanbul', 'Kurtköy Lojistik', 'Pendik Sanayi', 'Tersane Bölgesi'],
      buildingProfile: 'sanayi',
      estimatedCommercialCount: 180,
      b2bServices: ['Teknoloji Parkı Tesis Yönetimi', 'Antrepo & Depo Güvenliği', 'Yüksek Enerji Optimizasyonu'],
      targetKeywords: ['Pendik tesis yönetimi', 'Kurtköy Teknopark tesis yönetimi', 'Pendik lojistik tesis yönetimi'],
      longTailKeywords: ['Teknopark İstanbul kurumsal tesis işletmesi', 'Pendik antrepo tesis yönetimi'],
      serpTitle: 'Pendik & Kurtköy Teknopark Tesis Yönetimi | Alo Yönetim',
      serpDescription: 'Teknopark İstanbul ve Kurtköy lojistik merkezlerinde ISO 41001 standartlarında entegre tesis işletmesi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '52+ Site' },
      { label: 'SLA Acil Müdahale', value: '22 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%30' },
    ],
  },
  tuzla: {
    slug: 'tuzla',
    name: 'Tuzla',
    side: 'anadolu',
    siteCore: {
      districtSlug: 'tuzla',
      districtName: 'Tuzla',
      keyNeighborhoods: ['Postane', 'Mercan', 'Tepeören', 'Aydınlı', 'İstasyon'],
      housingProfile: 'villasite',
      estimatedSiteCount: 370,
      dominantIssues: ['Mercan & Tepeören Villa Güvenliği', 'Geniş Bahçe Sulaması', 'Deniz Korozyonu'],
      targetKeywords: ['Tuzla site yönetimi', 'Mercan villa yönetimi', 'Tepeören site yönetimi', 'Aydınlı konut yönetimi'],
      longTailKeywords: ['Tuzla Mercan lüks villa yönetim şirketi', 'Tepeören müstakil site güvenliği'],
      serpTitle: 'Tuzla & Mercan Villa ve Site Yönetimi | Alo Yönetim',
      serpDescription: 'Tuzla, Mercan ve Tepeören villa sitelerinde 5188 güvenlik, peyzaj ve KMK 634 garantili profesyonel yönetim.',
    },
    facilityCore: {
      districtSlug: 'tuzla',
      districtName: 'Tuzla',
      commercialNeighborhoods: ['Tuzla Kimya Sanayicileri OSB', 'Tuzla Deri OSB', 'Tuzla Tersaneler Bölgesi', 'Birlik OSB'],
      buildingProfile: 'sanayi',
      estimatedCommercialCount: 420,
      b2bServices: ['Ağır Sanayi & Kimya Tesisi Güvenliği', 'Ex-Proof Ekipman Bakımı', 'Çevre & Arıtma Tesis İşletmesi'],
      targetKeywords: ['Tuzla tesis yönetimi', 'Tuzla OSB tesis yönetimi', 'Tuzla Kimya Sanayi yönetimi', 'Tuzla tersane tesis yönetimi'],
      longTailKeywords: ['Tuzla organize sanayi bölgesi tesis işletmesi', 'Tuzla kimya fabrikası tesis yönetimi'],
      serpTitle: 'Tuzla OSB & Tersaneler Bölgesi Ağır Sanayi Tesisi Yönetimi | Alo Yönetim',
      serpDescription: 'Tuzla Kimya OSB, Deri OSB ve Tersaneler Bölgesinde ISO 41001 ve SEVESO uyumlu entegre tesis yönetimi.',
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: '60+ Tesis & Site' },
      { label: 'SLA Acil Müdahale', value: '20 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%33' },
    ],
  },
};

export const ALL_DISTRICTS_DUAL_CORE_MAP: Record<string, DistrictDualCoreEntry> = {
  ...EUROPEAN_SIDE_MATRIX,
  ...ANATOLIAN_SIDE_MATRIX,
};

/**
 * Belirli bir ilçe slug'ı için tam dual-core mikro lokasyon verisini döner.
 * Eğer özel kayıt yoksa DISTRICTS genel listesinden dinamik fallback üretir.
 */
export function getDistrictDualCore(districtSlug: string): DistrictDualCoreEntry | null {
  if (ALL_DISTRICTS_DUAL_CORE_MAP[districtSlug]) {
    return ALL_DISTRICTS_DUAL_CORE_MAP[districtSlug];
  }

  const baseDistrict = DISTRICTS.find((d) => d.slug === districtSlug);
  if (!baseDistrict) return null;

  return {
    slug: baseDistrict.slug,
    name: baseDistrict.name,
    side: baseDistrict.side === 'Anadolu' ? 'anadolu' : 'avrupa',
    siteCore: {
      districtSlug: baseDistrict.slug,
      districtName: baseDistrict.name,
      keyNeighborhoods: ['Merkez', 'Cumhuriyet', 'Hürriyet'],
      housingProfile: 'karma',
      estimatedSiteCount: baseDistrict.managedProjects * 3,
      dominantIssues: ['Aidat Takibi', 'Periyodik Teknik Bakım', '5188 Güvenlik'],
      targetKeywords: [
        `${baseDistrict.name} site yönetimi`,
        `${baseDistrict.name} apartman yönetimi`,
        `${baseDistrict.name} profesyonel site yönetimi`,
      ],
      longTailKeywords: [
        `${baseDistrict.name} profesyonel site yönetim şirketleri`,
        `${baseDistrict.name} apartman yöneticiliği fiyatları`,
      ],
      serpTitle: `${baseDistrict.name} Profesyonel Site ve Apartman Yönetimi | Alo Yönetim`,
      serpDescription: `${baseDistrict.name} genelinde apartman ve siteler için KMK 634 uyumlu profesyonel yönetim ve %30 tasarruf.`,
    },
    facilityCore: {
      districtSlug: baseDistrict.slug,
      districtName: baseDistrict.name,
      commercialNeighborhoods: ['Sanayi Bölgesi', 'Ticaret Aksı'],
      buildingProfile: 'karma',
      estimatedCommercialCount: baseDistrict.managedProjects,
      b2bServices: ['Kurumsal Tesis Bakımı', 'HVAC & Jeneratör', 'Ortak Gider Dağıtımı'],
      targetKeywords: [
        `${baseDistrict.name} tesis yönetimi`,
        `${baseDistrict.name} plaza yönetimi`,
        `${baseDistrict.name} iş merkezi yönetimi`,
      ],
      longTailKeywords: [
        `${baseDistrict.name} kurumsal tesis işletmeciliği`,
        `${baseDistrict.name} ticari bina yönetimi ISO 41001`,
      ],
      serpTitle: `${baseDistrict.name} Plaza ve Entegre Tesis Yönetimi | Alo Yönetim`,
      serpDescription: `${baseDistrict.name} ilçesindeki ticari yapılar ve plazalar için ISO 41001 standartlarında entegre tesis yönetimi.`,
    },
    sharedKpis: [
      { label: 'Yönetilen Proje', value: `${baseDistrict.managedProjects}+ Proje` },
      { label: 'SLA Acil Müdahale', value: '25 Dakika' },
      { label: 'Bütçe Tasarrufu', value: '%30' },
    ],
  };
}

/**
 * Belirli bir ilçe için site yönetimi anahtar kelimelerini döner.
 */
export function getDistrictSiteKeywords(districtSlug: string): string[] {
  const entry = getDistrictDualCore(districtSlug);
  return entry ? [...entry.siteCore.targetKeywords, ...entry.siteCore.longTailKeywords] : [];
}

/**
 * Belirli bir ilçe için tesis yönetimi anahtar kelimelerini döner.
 */
export function getDistrictFacilityKeywords(districtSlug: string): string[] {
  const entry = getDistrictDualCore(districtSlug);
  return entry ? [...entry.facilityCore.targetKeywords, ...entry.facilityCore.longTailKeywords] : [];
}

/**
 * Belirli bir ilçe ve pillar için optimize edilmiş SERP başlık ve açıklamasını döner.
 */
export function getDistrictPillarSerp(
  districtSlug: string,
  pillar: DomainPillar = 'hybrid'
): { title: string; description: string; targetKeywords: string[] } {
  const entry = getDistrictDualCore(districtSlug);
  if (!entry) {
    return {
      title: 'İstanbul Profesyonel Site ve Tesis Yönetimi | Alo Yönetim',
      description: 'İstanbul 39 ilçede KMK 634 ve ISO 41001 uyumlu profesyonel yönetim.',
      targetKeywords: ['site yönetimi', 'tesis yönetimi'],
    };
  }

  if (pillar === 'site') {
    return {
      title: entry.siteCore.serpTitle,
      description: entry.siteCore.serpDescription,
      targetKeywords: entry.siteCore.targetKeywords,
    };
  }

  if (pillar === 'facility') {
    return {
      title: entry.facilityCore.serpTitle,
      description: entry.facilityCore.serpDescription,
      targetKeywords: entry.facilityCore.targetKeywords,
    };
  }

  return {
    title: `${entry.name} Tesis Yönetimi & Site Yönetimi — Profesyonel Yönetim Şirketi | Alo Yönetim`,
    description: `${entry.name} genelinde apartman, site ve plazalar için KMK 634 ve ISO 41001 uyumlu profesyonel yönetim. 5188 güvenlik, aidat takibi ve %30 tasarruf!`,
    targetKeywords: [...entry.siteCore.targetKeywords.slice(0, 3), ...entry.facilityCore.targetKeywords.slice(0, 3)],
  };
}

/**
 * Arama hacmine ve proje yoğunluğuna göre en kritik odak ilçeleri döner.
 */
export function getTopDistrictsByPillar(pillar: DomainPillar, limit: number = 8): DistrictDualCoreEntry[] {
  const allEntries = DISTRICTS.map((d) => getDistrictDualCore(d.slug)).filter((e): e is DistrictDualCoreEntry => e !== null);

  if (pillar === 'site') {
    return allEntries.sort((a, b) => b.siteCore.estimatedSiteCount - a.siteCore.estimatedSiteCount).slice(0, limit);
  }

  if (pillar === 'facility') {
    return allEntries.sort((a, b) => b.facilityCore.estimatedCommercialCount - a.facilityCore.estimatedCommercialCount).slice(0, limit);
  }

  return allEntries.slice(0, limit);
}

/**
 * Mahalle düzeyinde uzun kuyruklu anahtar kelimeler üretir.
 */
export function getNeighborhoodLongTailKeywords(districtSlug: string, pillar: DomainPillar = 'site'): string[] {
  const entry = getDistrictDualCore(districtSlug);
  if (!entry) return [];

  const neighborhoods =
    pillar === 'facility' ? entry.facilityCore.commercialNeighborhoods : entry.siteCore.keyNeighborhoods;

  const results: string[] = [];
  neighborhoods.forEach((nh) => {
    if (pillar === 'facility') {
      results.push(`${nh} plaza tesis yönetimi`);
      results.push(`${nh} iş merkezi yönetimi`);
    } else {
      results.push(`${nh} site yönetimi`);
      results.push(`${nh} apartman yöneticiliği`);
    }
  });

  return results;
}

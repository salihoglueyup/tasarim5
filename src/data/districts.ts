/**
 * İstanbul ilçe veri modeli (SEO Master Plan V4 — Bölüm E, Faz 101/113).
 *
 * Programatik yerel SEO'nun tek veri kaynağı. Her ilçe için benzersiz içerik
 * alanları (tanım, yerel ihtiyaçlar, öne çıkan mahalleler) tutulur; bu alanlar
 * yerel landing şablonunda thin/duplicate content'i önlemek için kullanılır
 * (Faz 118 — her sayfa gerçek yerel değer taşımalı).
 */

export type District = {
  /** URL slug (ASCII, tireli) — ör. "kadikoy". */
  slug: string;
  /** Görünen ad — ör. "Kadıköy". */
  name: string;
  /** Yaka: Anadolu veya Avrupa. */
  side: 'Anadolu' | 'Avrupa';
  /** Yaklaşık nüfus (yerel ölçek sinyali). */
  population: number;
  /** İlçe merkez koordinatı (LocalBusiness/GeoCoordinates için). */
  geo: { lat: number; lng: number };
  /** Öne çıkan mahalleler/semtler (near-me + özgünlük). */
  neighborhoods: string[];
  /** İlçeye özgü 2-3 cümlelik özgün tanım (spin değil). */
  intro: string;
  /** İlçenin tipik konut dokusuna göre yerel yönetim ihtiyaçları. */
  localNeeds: string[];
  /** Temsili yönetilen proje sayısı (yerel kanıt bloğu — Faz 114). */
  managedProjects: number;
  /**
   * Önceliklendirme (Faz 113): 1 = en yüksek potansiyel. Yüksek öncelikli
   * ilçeler daha zengin içerik ve kademeli indekslemede öne alınır (Faz 127).
   */
  priority: 1 | 2 | 3;
};

export const DISTRICTS: District[] = [
  {
    slug: 'kadikoy',
    name: 'Kadıköy',
    side: 'Anadolu',
    population: 467000,
    geo: { lat: 40.9833, lng: 29.0333 },
    neighborhoods: ['Caddebostan', 'Moda', 'Fenerbahçe', 'Göztepe', 'Bostancı', 'Suadiye'],
    intro:
      'Anadolu Yakası’nın kültürel ve ticari kalbi Kadıköy; sahil hattındaki prestijli rezidanslardan Moda’nın tarihi apartmanlarına kadar geniş bir konut dokusuna sahiptir. Yüksek daire yoğunluğu ve karma yapı stoğu, profesyonel ve şeffaf tesis yönetimini kritik hale getirir.',
    localNeeds: [
      'Sahil şeridi rezidanslarında 7/24 güvenlik ve concierge',
      'Tarihi Moda apartmanlarında değer koruyucu teknik bakım',
      'Yoğun sosyal donatılı sitelerde havuz ve peyzaj yönetimi',
    ],
    managedProjects: 48,
    priority: 1,
  },
  {
    slug: 'atasehir',
    name: 'Ataşehir',
    side: 'Anadolu',
    population: 425000,
    geo: { lat: 40.9925, lng: 29.1267 },
    neighborhoods: ['Barbaros', 'Batı Ataşehir', 'Küçükbakkalköy', 'İçerenköy', 'Ferhatpaşa'],
    intro:
      'İstanbul Finans Merkezi’ne ev sahipliği yapan Ataşehir, yüksek katlı modern rezidansların ve büyük ölçekli sitelerin yoğunlaştığı bir ilçedir. Kurumsal yapı stoğu, ölçeklenebilir aidat yönetimi ve entegre hizmet paketleri gerektirir.',
    localNeeds: [
      'Yüksek katlı rezidanslarda asansör ve jeneratör periyodik bakımı',
      'Büyük sitelerde dijital aidat takibi ve bütçe şeffaflığı',
      'Ofis-konut karma projelerde profesyonel güvenlik yönetimi',
    ],
    managedProjects: 41,
    priority: 1,
  },
  {
    slug: 'uskudar',
    name: 'Üsküdar',
    side: 'Anadolu',
    population: 535000,
    geo: { lat: 41.0233, lng: 29.015 },
    neighborhoods: ['Acıbadem', 'Altunizade', 'Kuzguncuk', 'Çengelköy', 'Kısıklı'],
    intro:
      'Boğaz manzaralı yamaçları ve tarihi dokusuyla Üsküdar, butik sitelerden geniş yerleşkelere uzanan çeşitli bir konut yapısına sahiptir. Eğimli araziler ve yeşil alanlar, uzmanlık gerektiren peyzaj ve teknik bakım hizmetlerini öne çıkarır.',
    localNeeds: [
      'Boğaz manzaralı sitelerde peyzaj ve bahçe bakımı',
      'Eğimli parsellerde altyapı ve teknik bakım',
      'Karma tarihi/modern yapılarda uyumlu yönetim planı',
    ],
    managedProjects: 33,
    priority: 1,
  },
  {
    slug: 'maltepe',
    name: 'Maltepe',
    side: 'Anadolu',
    population: 520000,
    geo: { lat: 40.935, lng: 29.15 },
    neighborhoods: ['Bağlarbaşı', 'Cevizli', 'Küçükyalı', 'Fındıklı', 'Altayçeşme'],
    intro:
      'Sahil dolgu alanı ve geniş yaşam projeleriyle hızla gelişen Maltepe, yeni nesil markalı konutların yoğunlaştığı bir ilçedir. Büyük ölçekli siteler, entegre güvenlik ve düzenli hijyen yönetimini zorunlu kılar.',
    localNeeds: [
      'Sahil projelerinde geniş ortak alan temizliği',
      'Markalı sitelerde entegre kamera ve güvenlik yönetimi',
      'Yeni yapı stoğunda garanti takipli teknik işletme',
    ],
    managedProjects: 29,
    priority: 2,
  },
  {
    slug: 'kartal',
    name: 'Kartal',
    side: 'Anadolu',
    population: 470000,
    geo: { lat: 40.888, lng: 29.19 },
    neighborhoods: ['Yakacık', 'Soğanlık', 'Cevizli', 'Orhantepe', 'Uğur Mumcu'],
    intro:
      'Kentsel dönüşümün en yoğun yaşandığı ilçelerden Kartal, eski yapı stoğunun yerini büyük konut projelerine bıraktığı dinamik bir bölgedir. Yeni sitelerde kuruluş aşamasından itibaren profesyonel yönetim talebi yüksektir.',
    localNeeds: [
      'Kentsel dönüşüm sonrası yeni sitelerde ilk yönetim kurulumu',
      'Büyük bloklu projelerde aidat ve demirbaş düzeni',
      'Yoğun otopark alanlarında güvenlik ve erişim kontrolü',
    ],
    managedProjects: 26,
    priority: 2,
  },
  {
    slug: 'umraniye',
    name: 'Ümraniye',
    side: 'Anadolu',
    population: 740000,
    geo: { lat: 41.0167, lng: 29.1167 },
    neighborhoods: ['Çakmak', 'Atatürk', 'İnkılap', 'Tepeüstü', 'Finanskent'],
    intro:
      'İstanbul’un en kalabalık ilçelerinden Ümraniye, geniş toplu konut alanları ve yeni finans yerleşkeleriyle öne çıkar. Yüksek nüfus yoğunluğu, ölçeklenebilir ve maliyet-etkin tesis yönetimi çözümleri gerektirir.',
    localNeeds: [
      'Kalabalık sitelerde verimli atık ve hijyen yönetimi',
      'Toplu konutlarda toplu satın alma ile maliyet optimizasyonu',
      'Geniş yerleşkelerde devriyeli güvenlik hizmeti',
    ],
    managedProjects: 35,
    priority: 2,
  },
  {
    slug: 'besiktas',
    name: 'Beşiktaş',
    side: 'Avrupa',
    population: 180000,
    geo: { lat: 41.043, lng: 29.0094 },
    neighborhoods: ['Etiler', 'Levent', 'Bebek', 'Ortaköy', 'Arnavutköy'],
    intro:
      'Etiler ve Levent’in lüks rezidanslarıyla Beşiktaş, İstanbul’un en yüksek konut değerine sahip bölgelerinden biridir. Prestijli projeler, kusursuz güvenlik ve premium hizmet standardı bekler.',
    localNeeds: [
      'Lüks rezidanslarda concierge ve VIP güvenlik',
      'Yüksek değerli mülklerde değer koruyucu bakım',
      'Boğaz hattı sitelerinde peyzaj ve dış cephe yönetimi',
    ],
    managedProjects: 31,
    priority: 1,
  },
  {
    slug: 'sisli',
    name: 'Şişli',
    side: 'Avrupa',
    population: 265000,
    geo: { lat: 41.0602, lng: 28.9877 },
    neighborhoods: ['Mecidiyeköy', 'Nişantaşı', 'Fulya', 'Bomonti', 'Teşvikiye'],
    intro:
      'İş dünyası ile lüks konutun iç içe geçtiği Şişli, karma kullanımlı plaza-rezidans projelerinin merkezidir. Yoğun trafik ve ticari komşuluk, uzman güvenlik ve düzenli teknik işletme gerektirir.',
    localNeeds: [
      'Plaza-rezidans karma projelerde entegre yönetim',
      'Ticari yoğunlukta 7/24 güvenlik ve ziyaretçi kontrolü',
      'Merkezi sistemlerde profesyonel teknik bakım',
    ],
    managedProjects: 27,
    priority: 2,
  },
  {
    slug: 'bakirkoy',
    name: 'Bakırköy',
    side: 'Avrupa',
    population: 230000,
    geo: { lat: 40.9819, lng: 28.8772 },
    neighborhoods: ['Ataköy', 'Yeşilköy', 'Florya', 'Zeytinlik', 'Şenlikköy'],
    intro:
      'Ataköy ve Florya’nın sahil siteleriyle Bakırköy, köklü ve planlı konut alanlarının bulunduğu bir ilçedir. Deniz kenarı yerleşkeler, düzenli peyzaj ve güçlü güvenlik altyapısı ister.',
    localNeeds: [
      'Sahil sitelerinde peyzaj ve havuz yönetimi',
      'Planlı büyük yerleşkelerde ortak alan hijyeni',
      'Yerleşik komşuluklarda şeffaf aidat yönetimi',
    ],
    managedProjects: 24,
    priority: 2,
  },
  {
    slug: 'sariyer',
    name: 'Sarıyer',
    side: 'Avrupa',
    population: 345000,
    geo: { lat: 41.1667, lng: 29.05 },
    neighborhoods: ['Maslak', 'Tarabya', 'İstinye', 'Bahçeköy', 'Zekeriyaköy'],
    intro:
      'Maslak’ın kurumsal kulelerinden Zekeriyaköy’ün villa sitelerine uzanan Sarıyer, geniş ve çeşitli bir yapı yelpazesine sahiptir. Orman komşuluğu ve düşük yoğunluklu yerleşimler, uzman peyzaj ve güvenlik yönetimi gerektirir.',
    localNeeds: [
      'Villa sitelerinde geniş bahçe ve peyzaj bakımı',
      'Orman sınırı yerleşkelerde perimetre güvenliği',
      'Kule projelerinde merkezi teknik işletme',
    ],
    managedProjects: 22,
    priority: 3,
  },
  {
    slug: 'beylikduzu',
    name: 'Beylikdüzü',
    side: 'Avrupa',
    population: 410000,
    geo: { lat: 41.0028, lng: 28.6414 },
    neighborhoods: ['Adnan Kahveci', 'Barış', 'Gürpınar', 'Yakuplu', 'Cumhuriyet'],
    intro:
      'Planlı kentleşmenin örneği Beylikdüzü, geniş bulvarları ve büyük ölçekli markalı siteleriyle yeni nesil bir yaşam merkezidir. Genç yapı stoğu, teknolojik güvenlik ve sistematik işletme yönetimine uygundur.',
    localNeeds: [
      'Büyük markalı sitelerde akıllı güvenlik sistemleri',
      'Geniş sosyal donatılarda havuz ve spa hijyeni',
      'Yeni projelerde garanti takipli teknik bakım',
    ],
    managedProjects: 28,
    priority: 2,
  },
  {
    slug: 'basaksehir',
    name: 'Başakşehir',
    side: 'Avrupa',
    population: 510000,
    geo: { lat: 41.0933, lng: 28.8022 },
    neighborhoods: ['Kayaşehir', 'Bahçeşehir', 'Güvercintepe', 'Ziya Gökalp', 'Şahintepe'],
    intro:
      'Bahçeşehir ve Kayaşehir’in planlı toplu konut projeleriyle Başakşehir, İstanbul’un hızlı büyüyen aile odaklı ilçelerindendir. Büyük göletli ve sosyal donatılı siteler, kapsamlı peyzaj ve güvenlik yönetimi gerektirir.',
    localNeeds: [
      'Göletli ve geniş yeşil alanlı sitelerde peyzaj yönetimi',
      'Aile odaklı projelerde çocuk alanı güvenliği ve hijyen',
      'Toplu konutlarda ölçekli aidat ve işletme yönetimi',
    ],
    managedProjects: 30,
    priority: 2,
  },
];

export const DISTRICT_SLUGS = DISTRICTS.map((d) => d.slug);

export function getDistrict(slug: string): District | undefined {
  return DISTRICTS.find((d) => d.slug === slug);
}

export function isValidDistrict(slug: string): boolean {
  return DISTRICT_SLUGS.includes(slug);
}

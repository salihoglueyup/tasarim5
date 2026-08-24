/**
 * İstanbul ilçe veri modeli (SEO Master Plan V4 — Bölüm E, Faz 101/113).
 *
 * Programatik yerel SEO'nun tek veri kaynağı. İstanbul'un tüm 39 ilçesi için
 * benzersiz içerik alanları (tanım, yerel ihtiyaçlar, öne çıkan mahalleler) tutulur;
 * bu alanlar yerel landing şablonunda thin/duplicate content'i önlemek için kullanılır
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
  /** Mahalle düzeyinde programatik SEO verisi (Faz 8A — Priority 1 ilçeler). */
  neighborhoodData?: NeighborhoodInfo[];
  /** Ortalama piyasa aidat m² endeksi (TL/m²). */
  avgDuesM2?: number;
  /** Alo Yönetim optimize aidat m² endeksi (TL/m²). */
  aloDuesM2?: number;
  /** Ortalama kanıtlanmış tasarruf oranı (%). */
  savingsRate?: number;
};

export type NeighborhoodInfo = {
  /** URL slug — ASCII, tireli (ör. "moda"). */
  slug: string;
  /** Görünen ad (ör. "Moda"). */
  name: string;
  /** 2-3 cümle özgün mahalle tanımı. */
  intro: string;
  /** Mahalleye özgü konut/tesis karakteristikleri. */
  characteristics: string[];
  /** Yaklaşık merkez koordinatı (opsiyonel). */
  geo?: { lat: number; lng: number };
};

export const DISTRICTS: District[] = [
  // ==========================================
  // ANADOLU YAKASI (14 İLÇE)
  // ==========================================
  {
    slug: 'kadikoy',
    name: 'Kadıköy',
    side: 'Anadolu',
    population: 467000,
    geo: { lat: 40.9833, lng: 29.0333 },
    neighborhoods: ['Caddebostan', 'Moda', 'Fenerbahçe', 'Göztepe', 'Bostancı', 'Suadiye'],
    intro:
      "Anadolu Yakası`nın kültürel ve ticari kalbi Kadıköy; sahil hattındaki prestijli rezidanslardan Moda'nın tarihi apartmanlarına kadar geniş bir konut dokusuna sahiptir. Yüksek daire yoğunluğu ve karma yapı stoğu, profesyonel ve şeffaf tesis yönetimini kritik hale getirir.",
    localNeeds: [
      'Sahil şeridi rezidanslarında 7/24 güvenlik ve concierge',
      'Tarihi Moda apartmanlarında değer koruyucu teknik bakım',
      'Yoğun sosyal donatılı sitelerde havuz ve peyzaj yönetimi',
    ],
    managedProjects: 48,
    priority: 1,
    neighborhoodData: [
      { slug: 'moda', name: 'Moda', geo: { lat: 40.9845, lng: 29.024 }, intro: 'Moda, Kadıköy\'ün en prestijli ve tarihi mahallesi olup 19. yüzyıldan kalma Rum ve Rum apartmanları ile çevrilidir. Yüksek kira potansiyeli ve değer koruma odaklı profesyonel tesis yönetimi talebi sürekli artmaktadır.', characteristics: ['tarihi apartman stoğu', 'yüksek kira değeri', 'kültürel miras'] },
      { slug: 'caddebostan', name: 'Caddebostan', geo: { lat: 40.9619, lng: 29.0614 }, intro: 'Caddebostan sahil hattı ve modern rezidanslarıyla Kadıköy\'ün en gözde semtlerinden biridir. Yüksek katlı sitelerde havuz, kapalı otopark ve concierge yönetimi öne çıkan ihtiyaçlardandır.', characteristics: ['sahil rezidansları', 'havuzlu siteler', 'üst segment yaşam'] },
      { slug: 'fenerbahce', name: 'Fenerbahçe', geo: { lat: 40.9715, lng: 29.038 }, intro: 'Fenerbahçe yarımadası, deniz manzaralı villa ve rezidansların yoğunlaştığı, İstanbul\'un en değerli konut lokasyonlarından biridir. Güvenlik, peyzaj ve özel deniz tesisi yönetimi kritik öneme sahiptir.', characteristics: ['villa ve rezidans', 'yat limanı yakını', 'premium güvenlik'] },
      { slug: 'goztepe', name: 'Göztepe', geo: { lat: 40.9763, lng: 29.0635 }, intro: 'Göztepe, orta-üst segment konutları ve karma yapı stoğuyla Kadıköy\'ün köklü semtlerinden biridir. Aidat yönetimi ve teknik bakım hizmetlerine olan talep özellikle eski yapılarda yüksektir.', characteristics: ['karma konut dokusu', 'eski-yeni karışık yapı', 'teknik bakım odaklı'] },
      { slug: 'bostanci', name: 'Bostancı', geo: { lat: 40.9582, lng: 29.0803 }, intro: 'Bostancı, sahil şeridi, vapur iskelesi ve alışveriş merkezi yakınlığıyla hareketli bir ticari ve konut bölgesidir. Karma kullanımlı binalarda bütünleşik tesis yönetimi giderek önem kazanmaktadır.', characteristics: ['vapur iskelesi yakını', 'ticari-konut karma', 'yüksek trafik'] },
      { slug: 'suadiye', name: 'Suadiye', geo: { lat: 40.9547, lng: 29.0903 }, intro: 'Suadiye, sahil hattındaki butik siteleri ve üst gelir grubuna yönelik lüks rezidanslarıyla tanınmaktadır. Sezonluk havuz bakımı, güvenlik ve peyzaj hizmetleri yoğun talep görmektedir.', characteristics: ['lüks sahil siteleri', 'sezonluk havuz', 'butik yönetim'] },
    ],
  },
  {
    slug: 'atasehir',
    name: 'Ataşehir',
    side: 'Anadolu',
    population: 425000,
    geo: { lat: 40.9925, lng: 29.1267 },
    neighborhoods: ['Barbaros', 'Batı Ataşehir', 'Küçükbakkalköy', 'İçerenköy', 'Ferhatpaşa'],
    intro:
      "İstanbul Finans Merkezi'ne ev sahipliği yapan Ataşehir, yüksek katlı modern rezidansların ve büyük ölçekli sitelerin yoğunlaştığı bir ilçedir. Kurumsal yapı stoğu, ölçeklenebilir aidat yönetimi ve entegre hizmet paketleri gerektirir.",
    localNeeds: [
      'Yüksek katlı rezidanslarda asansör ve jeneratör periyodik bakımı',
      'Büyük sitelerde dijital aidat takibi ve bütçe şeffaflığı',
      'Ofis-konut karma projelerde profesyonel güvenlik yönetimi',
    ],
    managedProjects: 41,
    priority: 1,
    neighborhoodData: [
      { slug: 'barbaros', name: 'Barbaros', geo: { lat: 40.9925, lng: 29.12 }, intro: 'Barbaros, Ataşehir\'in kalbinde konumlanan modern konut ve ofis alanlarının yoğunlaştığı semttir. Finans merkezi yakınlığı, kurumsal kiracı profiline uygun profesyonel tesis yönetimini zorunlu kılar.', characteristics: ['finans merkezi yakını', 'ofis-konut karma', 'kurumsal kiracı profili'] },
      { slug: 'bati-atasehir', name: 'Batı Ataşehir', geo: { lat: 40.9985, lng: 29.1085 }, intro: 'Batı Ataşehir, büyük ölçekli kapalı site projelerinin yoğunlaştığı, alışveriş merkezleri ve sosyal donatılara yakın bir yaşam alanıdır. Geniş ortak alanlar ve havuzlu siteler detaylı tesis yönetimi gerektirir.', characteristics: ['geniş kapalı siteler', 'havuzlu kompleksler', 'alışveriş merkezi yakını'] },
      { slug: 'kucukbakkalkoy', name: 'Küçükbakkalköy', geo: { lat: 40.983, lng: 29.135 }, intro: 'Küçükbakkalköy, Ataşehir\'in gelişmekte olan lojistik ve konut bölgelerinden biridir. Orta-üst segment sitelerde aidat düzeni ve teknik bakım servisleri öne çıkan ihtiyaçlardandır.', characteristics: ['gelişmekte olan bölge', 'orta-üst segment', 'aidat yönetimi odaklı'] },
      { slug: 'icerenkoyu', name: 'İçerenköy', geo: { lat: 40.969, lng: 29.137 }, intro: 'İçerenköy, modern villa ve sitelerin teknoloji parkıyla iç içe geçtiği, İstanbul\'un tercih edilen konut lokasyonlarından biridir. Özel güvenlik ve akıllı ev entegrasyonu yönetimi talebi güçlüdür.', characteristics: ['villa siteleri', 'teknoloji parkı yakını', 'akıllı bina sistemleri'] },
      { slug: 'ferhatpasa', name: 'Ferhatpaşa', geo: { lat: 40.977, lng: 29.148 }, intro: 'Ferhatpaşa, orta ölçekli toplu konutların ve gelişmekte olan rezidans projelerinin öne çıktığı sakin bir semttir. Düzenli bakım, enerji verimliliği ve şeffaf aidat yönetimi yaygın talepler arasındadır.', characteristics: ['toplu konut projeleri', 'enerji verimliliği odaklı', 'sakin yerleşim'] },
    ],
  },
  {
    slug: 'uskudar',
    name: 'Üsküdar',
    side: 'Anadolu',
    population: 535000,
    geo: { lat: 41.0233, lng: 29.015 },
    neighborhoods: ['Acıbadem', 'Altunizade', 'Kuzguncuk', 'Çengelköy', 'Kısıklı'],
    intro:
      "Boğaz manzaralı yamaçları ve tarihi dokusuyla Üsküdar, butik sitelerden geniş yerleşkelere uzanan çeşitli bir konut yapısına sahiptir. Eğimli araziler ve yeşil alanlar, uzmanlık gerektiren peyzaj ve teknik bakım hizmetlerini öne çıkarır.",
    localNeeds: [
      'Boğaz manzaralı sitelerde peyzaj ve bahçe bakımı',
      'Eğimli parsellerde altyapı ve teknik bakım',
      'Karma tarihi/modern yapılarda uyumlu yönetim planı',
    ],
    managedProjects: 33,
    priority: 1,
  },
  {
    slug: 'umraniye',
    name: 'Ümraniye',
    side: 'Anadolu',
    population: 740000,
    geo: { lat: 41.0167, lng: 29.1167 },
    neighborhoods: ['Çakmak', 'Atatürk', 'İnkılap', 'Tepeüstü', 'Finanskent'],
    intro:
      "İstanbul'un en kalabalık ilçelerinden Ümraniye, geniş toplu konut alanları ve yeni finans yerleşkeleriyle öne çıkar. Yüksek nüfus yoğunluğu, ölçeklenebilir ve maliyet-etkin tesis yönetimi çözümleri gerektirir.",
    localNeeds: [
      'Kalabalık sitelerde verimli atık ve hijyen yönetimi',
      'Toplu konutlarda toplu satın alma ile maliyet optimizasyonu',
      'Geniş yerleşkelerde devriyeli güvenlik hizmeti',
    ],
    managedProjects: 35,
    priority: 2,
  },
  {
    slug: 'maltepe',
    name: 'Maltepe',
    side: 'Anadolu',
    population: 520000,
    geo: { lat: 40.935, lng: 29.15 },
    neighborhoods: ['Bağlarbaşı', 'Cevizli', 'Küçükyalı', 'Fındıklı', 'Altayçeşme'],
    intro:
      "Sahil dolgu alanı ve geniş yaşam projeleriyle hızla gelişen Maltepe, yeni nesil markalı konutların yoğunlaştığı bir ilçedir. Büyük ölçekli siteler, entegre güvenlik ve düzenli hijyen yönetimini zorunlu kılar.",
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
      "Kentsel dönüşümün en yoğun yaşandığı ilçelerden Kartal, eski yapı stoğunun yerini büyük konut projelerine bıraktığı dinamik bir bölgedir. Yeni sitelerde kuruluş aşamasından itibaren profesyonel yönetim talebi yüksektir.",
    localNeeds: [
      'Kentsel dönüşüm sonrası yeni sitelerde ilk yönetim kurulumu',
      'Büyük bloklu projelerde aidat ve demirbaş düzeni',
      'Yoğun otopark alanlarında güvenlik ve erişim kontrolü',
    ],
    managedProjects: 26,
    priority: 2,
  },
  {
    slug: 'pendik',
    name: 'Pendik',
    side: 'Anadolu',
    population: 750000,
    geo: { lat: 40.8744, lng: 29.2347 },
    neighborhoods: ['Kurtköy', 'Yenişehir', 'Batı', 'Çamlık', 'Kaynarca', 'Güzelyalı'],
    intro:
      "Sabiha Gökçen Havalimanı aksı ve Kurtköy-Yenişehir bölgesindeki modern villa-rezidans projeleriyle Pendik, hızla büyüyen stratejik bir merkezdir. Geniş sosyal alanlı toplu konutlar, profesyonel tesis işletmesi ve 7/24 güvenlik gerektirir.",
    localNeeds: [
      'Kurtköy ve Yenişehir villa/rezidans projelerinde 7/24 özel güvenlik',
      'Büyük ölçekli site yerleşkelerinde merkezi aidat ve bütçe yönetimi',
      'Sosyal tesis, havuz ve geniş peyzaj alanlarının düzenli bakımı',
    ],
    managedProjects: 38,
    priority: 1,
    neighborhoodData: [
      { slug: 'kurtkoy', name: 'Kurtköy', geo: { lat: 40.9025, lng: 29.2694 }, intro: 'Kurtköy, Sabiha Gökçen Havalimanı yakınındaki villa siteleri ve lüks konut projeleriyle Pendik\'in en prestijli mahallesidir. 7/24 güvenlik, havuz ve geniş peyzaj alanı yönetimi yoğun talep görmektedir.', characteristics: ['villa siteleri', 'havalimanı yakını', '7/24 güvenlik'] },
      { slug: 'yenisehir', name: 'Yenişehir', geo: { lat: 40.876, lng: 29.255 }, intro: 'Yenişehir, planlı yapılaşması ve modern site kompleksleriyle Pendik\'te hızla gelişen bir yerleşim alanıdır. Büyük ölçekli sitelerde aidat yönetimi ve entegre teknik işletme talebi artmaktadır.', characteristics: ['planlı yerleşim', 'modern site kompleksleri', 'büyük ölçek'] },
      { slug: 'kaynarca', name: 'Kaynarca', geo: { lat: 40.889, lng: 29.238 }, intro: 'Kaynarca, orta ölçekli site ve apartman projelerinin yoğunlaştığı, hızla büyüyen bir Pendik mahallesDir. Teknik bakım sürekliliği ve şeffaf aidat yönetimi öne çıkan ihtiyaçlardandır.', characteristics: ['orta ölçek konutlar', 'büyüyen bölge', 'aidat yönetimi'] },
      { slug: 'guzelyali', name: 'Güzelyalı', geo: { lat: 40.876, lng: 29.285 }, intro: 'Güzelyalı, deniz kıyısı ve sahil hattı boyunca uzanan konut alanlarıyla Pendik\'in değer kazanan bölgesidir. Deniz etkisine karşı teknik bakım ve peyzaj hizmetleri kritik öneme sahiptir.', characteristics: ['sahil hattı', 'deniz etkisi bakım', 'değer artışı bölgesi'] },
      { slug: 'bati-pendik', name: 'Batı', geo: { lat: 40.87, lng: 29.22 }, intro: 'Batı Pendik, ilçe merkezine yakın konumuyla ulaşım avantajlı, orta-büyük ölçekli konut alanlarının yer aldığı bir mahalledir. Profesyonel güvenlik ve teknik bakım hizmetlerine yönelik talep güçlüdür.', characteristics: ['merkezi konum', 'toplu konut', 'güvenlik odaklı'] },
    ],
  },
  {
    slug: 'cekmekoy',
    name: 'Çekmeköy',
    side: 'Anadolu',
    population: 295000,
    geo: { lat: 41.0353, lng: 29.1764 },
    neighborhoods: ['Mimar Sinan', 'Taşdelen', 'Merkez', 'Çamlık', 'Ömerli', 'Alemdağ'],
    intro:
      "Doğayla iç içe villa yerleşkeleri ve modern az katlı aile siteleriyle Çekmeköy, Anadolu Yakası'nın nezih yaşam alanlarındandır. Geniş yeşil alanlar, havuz bakımı ve güvenli çocuk oyun alanları öncelikli yönetim ihtiyaçlarıdır.",
    localNeeds: [
      'Geniş bahçeli villa sitelerinde uzman peyzaj ve budama hizmeti',
      'Açık/kapalı yüzme havuzlarında kimyasal ve hijyen yönetimi',
      'Aile odaklı sitelerde çevre kamera ve perimetre güvenliği',
    ],
    managedProjects: 32,
    priority: 1,
  },
  {
    slug: 'sancaktepe',
    name: 'Sancaktepe',
    side: 'Anadolu',
    population: 480000,
    geo: { lat: 40.9903, lng: 29.2278 },
    neighborhoods: ['Samandıra', 'Sarıgazi', 'Yenidoğan', 'Meclis', 'Eyüp Sultan', 'Emek'],
    intro:
      "Yeni metro hatları ve markalı konut projeleriyle parlayan Sancaktepe, genç ve dinamik bir yapı stoğuna sahiptir. Çok bloklu sitelerde şeffaf aidat tahsilatı ve enerji verimliliği odaklı tesis bakımı talep görmektedir.",
    localNeeds: [
      'Markalı çok bloklu konutlarda şeffaf bütçe ve aidat icra takibi',
      'Merkezi hidrofor, asansör ve yangın söndürme sistemleri periyodik kontrolü',
      'Giriş turnike ve plaka tanıma sistemleri entegrasyonu',
    ],
    managedProjects: 25,
    priority: 2,
  },
  {
    slug: 'beykoz',
    name: 'Beykoz',
    side: 'Anadolu',
    population: 245000,
    geo: { lat: 41.1175, lng: 29.1006 },
    neighborhoods: ['Acarkent', 'Kavacık', 'Göksu', 'Paşabahçe', 'Kanlıca', 'Çavuşbaşı'],
    intro:
      "Acarkent gibi Türkiye'nin en büyük müstakil yerleşkelerine ve Boğaz yalılarına ev sahipliği yapan Beykoz, üst segment tesis yönetim uzmanlığı ister. Geniş arazi güvenliği, özel teknik işletme ve prestijli yönetim standarttır.",
    localNeeds: [
      'Mega villa kentlerinde 5188 silahlı/silahsız özel güvenlik devriyesi',
      'Orman sınırı mülklerde haşere kontrolü ve peyzaj drenaj yönetimi',
      'Kavacık plazalarında akıllı bina otomasyonu ve teknik işletme',
    ],
    managedProjects: 34,
    priority: 1,
  },
  {
    slug: 'tuzla',
    name: 'Tuzla',
    side: 'Anadolu',
    population: 285000,
    geo: { lat: 40.8167, lng: 29.3 },
    neighborhoods: ['Mercan', 'Postane', 'Aydınlı', 'İstasyon', 'Tepeören', 'Şifa'],
    intro:
      "Mercan sahil villalarından Tepeören müstakil yerleşkelerine, tersane ve organize sanayi bölgelerine kadar Tuzla, karma ve çok yönlü bir yönetim sahasıdır. Deniz etkisi korozyon bakımı ve yüksek güvenlik talep edilir.",
    localNeeds: [
      'Mercan ve Tepeören villa sitelerinde özel güvenlik ve konsiyerj',
      'Sahil hattında deniz korozyonuna karşı koruyucu teknik bakım',
      'Sanayi-konut karma bölgelerinde endüstriyel hijyen ve dezenfeksiyon',
    ],
    managedProjects: 27,
    priority: 2,
  },
  {
    slug: 'sultanbeyli',
    name: 'Sultanbeyli',
    side: 'Anadolu',
    population: 360000,
    geo: { lat: 40.9667, lng: 29.2667 },
    neighborhoods: ['Abdurrahmangazi', 'Fatih', 'Hasanpaşa', 'Battalgazi', 'Mehmet Akif'],
    intro:
      "Kentsel yenilemenin ivme kazandığı Sultanbeyli'de yeni konut blokları ve ticaret alanları modern işletme modellerine geçmektedir. Ortak giderlerin adil bölüşümü ve hukuki danışmanlık öne çıkan unsurlardır.",
    localNeeds: [
      'Yeni apartman yönetimlerinde KMK 634 uyumlu işletme projesi hazırlığı',
      'Geciken aidatlarda profesyonel uzlaşma ve icra takip danışmanlığı',
      'Asansör periyodik yeşil etiket muayene ve bakım takibi',
    ],
    managedProjects: 18,
    priority: 3,
  },
  {
    slug: 'sile',
    name: 'Şile',
    side: 'Anadolu',
    population: 43000,
    geo: { lat: 41.1758, lng: 29.6133 },
    neighborhoods: ['Merkez', 'Kumbaba', 'Ağva', 'Çavuş', 'Balibey'],
    intro:
      "Karadeniz sahilindeki yazlık siteleri ve butik müstakil villalarıyla Şile, dönemsel ve mevsimlik yönetim modelleri gerektirir. Kış aylarında mülk güvenliği ve koruyucu teknik bakım büyük önem taşır.",
    localNeeds: [
      'Yazlık sitelerde kış izolasyonu ve periyodik mülk güvenliği kontrolleri',
      'Sezon öncesi havuz temizliği, klorlama ve su kalitesi sertifikasyonu',
      'Geniş bahçe alanlarında fırtına sonrası peyzaj onarımı ve budama',
    ],
    managedProjects: 16,
    priority: 3,
  },
  {
    slug: 'adalar',
    name: 'Adalar',
    side: 'Anadolu',
    population: 17000,
    geo: { lat: 40.8764, lng: 29.0911 },
    neighborhoods: ['Büyükada', 'Heybeliada', 'Burgazada', 'Kınalıada', 'Nizam'],
    intro:
      "Tarihi köşkleri, ahşap konakları ve araç trafiğine kapalı butik dokusuyla Adalar, özel lojistik ve hassas koruma gerektiren bir yönetim bölgesidir. Tarihi yapıların değer koruyucu bakımı uzmanlık ister.",
    localNeeds: [
      'Tarihi tescilli ahşap ve kagir yapılarda uzman restoratif teknik bakım',
      'Lojistik kısıtlı adalarda planlı malzeme ve temizlik kimyasalı tedariki',
      'Ada genelinde yangın ve acil durum önleme eylem protokolleri',
    ],
    managedProjects: 14,
    priority: 3,
  },

  // ==========================================
  // AVRUPA YAKASI (25 İLÇE)
  // ==========================================
  {
    slug: 'besiktas',
    name: 'Beşiktaş',
    side: 'Avrupa',
    population: 180000,
    geo: { lat: 41.043, lng: 29.0094 },
    neighborhoods: ['Etiler', 'Levent', 'Bebek', 'Ortaköy', 'Arnavutköy', 'Ulus'],
    intro:
      "Etiler, Ulus ve Levent'in lüks rezidanslarıyla Beşiktaş, İstanbul'un en yüksek konut değerine sahip bölgelerindendir. Prestijli projeler, kusursuz 5188 güvenlik, concierge ve premium hizmet standardı bekler.",
    localNeeds: [
      'Lüks rezidanslarda concierge ve VIP protokol güvenliği',
      'Yüksek değerli mülklerde değer koruyucu önleyici teknik bakım',
      'Boğaz hattı sitelerinde peyzaj ve dış cephe korozyon yönetimi',
    ],
    managedProjects: 36,
    priority: 1,
    neighborhoodData: [
      { slug: 'etiler', name: 'Etiler', geo: { lat: 41.0733, lng: 29.031 }, intro: 'Etiler, İstanbul\'un en prestijli konut lokasyonlarından biri olup yüksek gelir grubu sitelerini ve lüks rezidansları barındırır. VIP güvenlik protokolleri, concierge ve premium hizmet standartları zorunlu beklentilerdir.', characteristics: ['üst gelir grubu', 'VIP güvenlik', 'concierge hizmet'] },
      { slug: 'levent', name: 'Levent', geo: { lat: 41.0794, lng: 29.0137 }, intro: 'Levent, finans kuruluşlarının ve kurumsal ofis kulelerinin merkezidir; plaza ve rezidans karma projeleri tesis yönetiminde yüksek standart gerektirir. Teknik bakım, enerji yönetimi ve kurumsal kiracı hizmetleri öne çıkmaktadır.', characteristics: ['kurumsal plaza', 'finans merkezi', 'enerji yönetimi'] },
      { slug: 'bebek', name: 'Bebek', geo: { lat: 41.0808, lng: 29.0444 }, intro: 'Bebek, Boğaz kıyısındaki yalı ve butik rezidanslarıyla İstanbul\'un en gözde semtlerinden biridir. Tarihi yapı stoğu, Boğaz etkisine karşı özel teknik bakım ve peyzaj hizmetleri gerektirmektedir.', characteristics: ['Boğaz kıyısı', 'tarihi yalılar', 'butik yönetim'] },
      { slug: 'ortakoy', name: 'Ortaköy', geo: { lat: 41.0511, lng: 29.0265 }, intro: 'Ortaköy, turizm ve eğlence merkezinin yanı sıra prestijli rezidans ve ofis projelerine de ev sahipliği yapar. Yüksek ziyaretçi yoğunluğunda güvenlik yönetimi ve ortak alan temizliği kritik öneme sahiptir.', characteristics: ['turizm yakını', 'karma kullanım', 'yoğun güvenlik'] },
      { slug: 'ulus', name: 'Ulus', geo: { lat: 41.0667, lng: 29.028 }, intro: 'Ulus, geniş ve yeşil sitelerle villa alanlarının yer aldığı, sakin ve prestijli bir Beşiktaş mahallesidir. Büyük bahçeli mülklerde peyzaj, havuz ve güvenlik yönetimi vazgeçilmez hizmetlerdir.', characteristics: ['villa alanları', 'geniş peyzaj', 'sakin prestijli'] },
    ],
  },
  {
    slug: 'sisli',
    name: 'Şişli',
    side: 'Avrupa',
    population: 265000,
    geo: { lat: 41.0602, lng: 28.9877 },
    neighborhoods: ['Mecidiyeköy', 'Nişantaşı', 'Fulya', 'Bomonti', 'Teşvikiye', 'Esentepe'],
    intro:
      "İş dünyası ile lüks konutun iç içe geçtiği Şişli, karma kullanımlı plaza-rezidans projelerinin merkezidir. Yoğun trafik ve ticari komşuluk, uzman güvenlik ve düzenli teknik işletme gerektirir.",
    localNeeds: [
      'Plaza-rezidans karma projelerde entegre bina otomasyonu',
      'Ticari yoğunlukta 7/24 güvenlik ve akıllı ziyaretçi kontrolü',
      'Merkezi HVAC iklimlendirme ve jeneratör sistemlerinde profesyonel teknik bakım',
    ],
    managedProjects: 31,
    priority: 1,
    neighborhoodData: [
      { slug: 'mecidiyekoy', name: 'Mecidiyeköy', geo: { lat: 41.0672, lng: 29.0013 }, intro: 'Mecidiyeköy, İstanbul\'un ticari kalbi olup yüksek katlı plazaları ve ofis rezidanslarıyla karma kullanım yapısı ağır basar. Entegre bina otomasyonu ve 7/24 teknik destek zorunlu gereksinimlerin başında gelir.', characteristics: ['ticari merkez', 'yüksek katlı plaza', '7/24 teknik destek'] },
      { slug: 'nisantasi', name: 'Nişantaşı', geo: { lat: 41.0497, lng: 28.9944 }, intro: 'Nişantaşı, İstanbul\'un lüks alışveriş ve konut semti olup prestijli apartman ve butik rezidanslar yoğundur. Değer koruyucu teknik bakım, güvenlik ve estetik ortak alan yönetimi kritik hizmetlerdir.', characteristics: ['lüks konut', 'butik rezidanslar', 'değer koruma'] },
      { slug: 'fulya', name: 'Fulya', geo: { lat: 41.059, lng: 28.9927 }, intro: 'Fulya, modern konut projeleri ve yoğun ticari yapısıyla Şişli\'nin dinamik mahallelerinden biridir. Karma konut-ofis projelerinde tesis yönetimi talebi giderek artmaktadır.', characteristics: ['modern rezidans', 'karma kullanım', 'hızlı gelişen'] },
      { slug: 'bomonti', name: 'Bomonti', geo: { lat: 41.0573, lng: 28.9786 }, intro: 'Bomonti, eski sanayi dokusunun yerini alan lüks rezidans ve butik otel projelerinin cazibe merkezidir. Yenileme projeleri ve gentrifikasyon süreci, uzman tesis yönetimini ön plana taşımaktadır.', characteristics: ['dönüşüm projesi', 'lüks rezidans', 'gentrifikasyon'] },
      { slug: 'esentepe', name: 'Esentepe', geo: { lat: 41.0771, lng: 28.997 }, intro: 'Esentepe, kurumsal ofis kuleleri ve çevreleyen konut sitelerinin iç içe geçtiği dinamik bir iş merkezidir. Plaza ve rezidans yönetiminde enerji optimizasyonu ve güvenlik öncelikli hizmetler öne çıkmaktadır.', characteristics: ['kurumsal ofis kulesi', 'enerji optimizasyonu', 'iş merkezi'] },
    ],
  },
  {
    slug: 'sariyer',
    name: 'Sarıyer',
    side: 'Avrupa',
    population: 345000,
    geo: { lat: 41.1667, lng: 29.05 },
    neighborhoods: ['Maslak', 'Tarabya', 'İstinye', 'Bahçeköy', 'Zekeriyaköy', 'Yeniköy'],
    intro:
      "Maslak'ın kurumsal kulelerinden Zekeriyaköy'ün villa sitelerine uzanan Sarıyer, geniş ve prestijli bir yapı stoğuna sahiptir. Orman komşuluğu ve düşük yoğunluklu yerleşimler, uzman peyzaj ve güvenlik yönetimi gerektirir.",
    localNeeds: [
      'Zekeriyaköy ve Uskumruköy villa sitelerinde geniş peyzaj ve havuz bakımı',
      'Orman sınırı yerleşkelerde 7/24 perimetre ve devriye güvenliği',
      'Maslak gökdelenlerinde merkezi teknik işletme ve enerji optimizasyonu',
    ],
    managedProjects: 39,
    priority: 1,
    neighborhoodData: [
      { slug: 'maslak', name: 'Maslak', geo: { lat: 41.1131, lng: 29.0209 }, intro: 'Maslak, İstanbul\'un en büyük finans ve teknoloji kümelenmesinin bulunduğu, gökdelen ve kurumsal ofis kulelerinin simgesi olduğu alandır. Büyük ölçekli plaza yönetiminde enerji verimliliği ve bütünleşik teknik işletme kritik öneme sahiptir.', characteristics: ['finans kulesi', 'kurumsal plaza', 'enerji yönetimi'] },
      { slug: 'tarabya', name: 'Tarabya', geo: { lat: 41.145, lng: 29.065 }, intro: 'Tarabya, Boğaz kıyısındaki yalı ve lüks rezidanslarıyla İstanbul\'un en değerli konut lokasyonlarından biridir. Deniz etkisine karşı özel koruyucu teknik bakım ve butik güvenlik hizmetleri zorunludur.', characteristics: ['Boğaz yalısı', 'lüks konut', 'deniz etkisi bakım'] },
      { slug: 'istinye', name: 'İstinye', geo: { lat: 41.108, lng: 29.052 }, intro: 'İstinye, prestijli AVM yakınlığı ve Boğaz manzaralı rezidanslarıyla Sarıyer\'in en değerli mahallelerinden biridir. Yüksek kira değeri ve seçkin kiracı profili, premium tesis yönetimi hizmetleri gerektirmektedir.', characteristics: ['AVM yakını', 'Boğaz manzarası', 'premium yönetim'] },
      { slug: 'zekeriyakoy', name: 'Zekeriyaköy', geo: { lat: 41.202, lng: 28.985 }, intro: 'Zekeriyaköy, orman içindeki villa ve müstakil sitelerle İstanbul\'un en sakin, prestijli yerleşimlerinden biridir. Geniş bahçeli mülklerde peyzaj bakımı ve güvenlik devriyesi hizmetleri yoğun talep görmektedir.', characteristics: ['orman villa', 'geniş bahçe', 'peyzaj odaklı'] },
      { slug: 'yenıkoy', name: 'Yeniköy', geo: { lat: 41.126, lng: 29.063 }, intro: 'Yeniköy, tarihi yalıları ve sahil hattındaki butik konutlarıyla Sarıyer\'in köklü mahallelerinden biridir. Kültürel miras yapılarında özel restorasyon bilgisi gerektiren teknik bakım hizmetleri ön plandadır.', characteristics: ['tarihi yalı', 'kültürel miras', 'butik yönetim'] },
    ],
  },
  {
    slug: 'bakirkoy',
    name: 'Bakırköy',
    side: 'Avrupa',
    population: 230000,
    geo: { lat: 40.9819, lng: 28.8772 },
    neighborhoods: ['Ataköy', 'Yeşilköy', 'Florya', 'Zeytinlik', 'Şenlikköy', 'Yeşilyurt'],
    intro:
      "Ataköy sahil kuleleri ve Florya'nın nezih yerleşkeleriyle Bakırköy, köklü ve planlı konut alanlarının merkezidir. Deniz kenarı kuleler, düzenli peyzaj ve güçlü özel güvenlik altyapısı ister.",
    localNeeds: [
      'Sahil kulelerinde entegre bina yönetimi ve deniz etkisi teknik bakımı',
      'Florya ve Yeşilköy sitelerinde havuz hijyeni ve özel güvenlik',
      'Yerleşik büyük sitelerde şeffaf aidat ve işletme bütçesi yönetimi',
    ],
    managedProjects: 30,
    priority: 1,
  },
  {
    slug: 'beylikduzu',
    name: 'Beylikdüzü',
    side: 'Avrupa',
    population: 410000,
    geo: { lat: 41.0028, lng: 28.6414 },
    neighborhoods: ['Adnan Kahveci', 'Barış', 'Gürpınar', 'Yakuplu', 'Cumhuriyet', 'Kavaklı'],
    intro:
      "Planlı kentleşmenin örneği Beylikdüzü, geniş bulvarları ve büyük ölçekli markalı siteleriyle yeni nesil bir yaşam merkezidir. Genç yapı stoğu, teknolojik güvenlik ve sistematik işletme yönetimine uygundur.",
    localNeeds: [
      'Büyük markalı sitelerde akıllı plaka tanıma ve kamera sistemleri',
      'Geniş sosyal donatılarda olimpik havuz ve spa hijyeni',
      'Yeni projelerde garanti takipli teknik işletme ve asansör bakımı',
    ],
    managedProjects: 35,
    priority: 1,
  },
  {
    slug: 'basaksehir',
    name: 'Başakşehir',
    side: 'Avrupa',
    population: 510000,
    geo: { lat: 41.0933, lng: 28.8022 },
    neighborhoods: ['Kayaşehir', 'Bahçeşehir', 'Güvercintepe', 'Ziya Gökalp', 'Şahintepe', 'Başak'],
    intro:
      "Bahçeşehir ve Kayaşehir'in planlı toplu konut projeleriyle Başakşehir, İstanbul'un hızlı büyüyen aile odaklı ilçelerindendir. Büyük göletli ve sosyal donatılı siteler, kapsamlı peyzaj ve güvenlik yönetimi gerektirir.",
    localNeeds: [
      'Göletli ve geniş yeşil alanlı sitelerde peyzaj ve sulama otomasyonu',
      'Aile odaklı projelerde çocuk alanı güvenliği ve hijyen sertifikasyonu',
      'Toplu konutlarda ölçekli aidat tahsilatı ve bütçe optimizasyonu',
    ],
    managedProjects: 37,
    priority: 1,
    neighborhoodData: [
      { slug: 'kayasehir', name: 'Kayaşehir', geo: { lat: 41.1025, lng: 28.772 }, intro: 'Kayaşehir, TOKİ ve özel sektörün birlikte geliştirdiği büyük ölçekli toplu konut projeleriyle Başakşehir\'in en kalabalık mahallesini oluşturmaktadır. Geniş ortak alanlar ve binlerce dairelik siteler kapsamlı tesis yönetimi hizmetleri gerektirmektedir.', characteristics: ['toplu konut', 'geniş ortak alan', 'büyük ölçek'] },
      { slug: 'bahcesehir', name: 'Bahçeşehir', geo: { lat: 41.0877, lng: 28.7788 }, intro: 'Bahçeşehir, göletleri ve yeşil alanlarıyla tanınan, planlı yapısıyla İstanbul\'un en tercih edilen aile yaşam merkezlerinden biridir. Peyzaj bakımı, gölet yönetimi ve geniş sosyal tesis işletmeciliği temel ihtiyaçlardandır.', characteristics: ['gölet ve yeşil alan', 'planlı yerleşim', 'aile odaklı'] },
      { slug: 'sahıntepe', name: 'Şahintepe', geo: { lat: 41.088, lng: 28.793 }, intro: 'Şahintepe, orta ölçekli rezidans ve karma konut projelerinin yer aldığı, ulaşım bağlantısı güçlü bir Başakşehir mahallesdir. Düzenli aidat takibi ve teknik bakım servislerine talebin yoğun olduğu bir bölgedir.', characteristics: ['orta ölçek', 'karma konut', 'ulaşım avantajı'] },
      { slug: 'guvercintepe', name: 'Güvercintepe', geo: { lat: 41.098, lng: 28.806 }, intro: 'Güvercintepe, modern konut bloklarının ve alışveriş merkezlerinin bulunduğu dinamik bir Başakşehir mahallesdir. Sosyal donatılı yapılarda 7/24 güvenlik ve profesyonel temizlik hizmetleri öncelikli beklentilerdir.', characteristics: ['modern bloklar', '7/24 güvenlik', 'sosyal donatı'] },
    ],
  },
  {
    slug: 'kucukcekmece',
    name: 'Küçükçekmece',
    side: 'Avrupa',
    population: 805000,
    geo: { lat: 40.9917, lng: 28.7711 },
    neighborhoods: ['Atakent', 'Halkalı', 'Cennet', 'İnönü', 'Fevzi Çakmak', 'Sefaköy'],
    intro:
      "Atakent ve Halkalı aksındaki dev markalı konut projeleriyle Küçükçekmece, mega yerleşkelerin merkezidir. Binlerce dairelik sitelerde dijital yönetim, güvenlik turnikeleri ve profesyonel havuz bakımı zorunludur.",
    localNeeds: [
      'Atakent mega konut projelerinde binlerce daireye yönelik dijital aidat yönetimi',
      'Sosyal tesis, yüzme havuzları ve spor alanlarında TSE hijyen denetimi',
      'Geniş çevre çitlerinde 7/24 devriyeli özel güvenlik ekipleri',
    ],
    managedProjects: 36,
    priority: 1,
    neighborhoodData: [
      { slug: 'atakent', name: 'Atakent', geo: { lat: 40.9978, lng: 28.7831 }, intro: 'Atakent, büyük markalı konut projelerinin yoğunlaştığı ve binlerce daireden oluşan mega sitelerin bulunduğu Küçükçekmece\'nin en kalabalık mahallesidir. Dijital aidat yönetimi, güvenlik ve büyük ölçekli teknik işletme kritik ihtiyaçlardandır.', characteristics: ['mega site', 'dijital yönetim', 'büyük ölçek'] },
      { slug: 'halkali', name: 'Halkalı', geo: { lat: 41.007, lng: 28.7997 }, intro: 'Halkalı, metrobüs hattı ve demiryolu bağlantısı sayesinde ulaşım açısından stratejik konumda büyük toplu konut sitelerini barındıran bir mahalledir. Yüksek doluluklu yapılarda aidat verimliliği ve teknik bakım sürekliliği önemlidir.', characteristics: ['ulaşım hub', 'toplu konut', 'yüksek yoğunluk'] },
      { slug: 'cennet', name: 'Cennet', geo: { lat: 41.003, lng: 28.771 }, intro: 'Cennet, modern konut siteleriyle birlikte büyüyen bir Küçükçekmece mahallesdir. Orta büyüklükte sitelerde aidat düzeni ve güvenlik hizmetleri temel ihtiyaçlardandır.', characteristics: ['orta büyüklük site', 'aidat düzeni', 'güvenli yaşam'] },
      { slug: 'sefakoy', name: 'Sefaköy', geo: { lat: 40.9846, lng: 28.7902 }, intro: 'Sefaköy, karma konut dokusu ve ticari caddelerle iç içe geçen bir Küçükçekmece mahallesidir. Ticari zemin ile konut üstlerinde entegre bina yönetimi talepleri artmaktadır.', characteristics: ['karma konut-ticaret', 'entegre yönetim', 'ticari cadde yakını'] },
    ],
  },
  {
    slug: 'kagithane',
    name: 'Kâğıthane',
    side: 'Avrupa',
    population: 450000,
    geo: { lat: 41.0833, lng: 28.9667 },
    neighborhoods: ['Seyrantepe', 'Cendere', 'Hamidiye', 'Çeliktepe', 'Gültepe', 'Merkez'],
    intro:
      "Cendere Vadisi ve Vadi İstanbul aksında yükselen modern ofis-rezidans kuleleriyle Kağıthane, iş ve yaşamın kesişim noktasıdır. Yüksek katlı binalarda asansör sürekliliği ve kartlı geçiş sistemleri ön plandadır.",
    localNeeds: [
      'Vadi İstanbul aksındaki rezidans kulelerinde akıllı bina otomasyonu',
      'Karma plazalarda turnike, x-ray ve plaka tanıma güvenlik altyapısı',
      'Merkezi iklimlendirme ve yangın algılama sistemlerinde periyodik teknik bakım',
    ],
    managedProjects: 28,
    priority: 1,
  },
  {
    slug: 'eyupsultan',
    name: 'Eyüpsultan',
    side: 'Avrupa',
    population: 420000,
    geo: { lat: 41.0478, lng: 28.9339 },
    neighborhoods: ['Göktürk', 'Kemerburgaz', 'Alibeyköy', 'Merkez', 'Rami', 'Yeşilpınar'],
    intro:
      "Göktürk ve Kemerburgaz'ın lüks orman içi sitelerinden Haliç kıyısındaki yerleşimlere kadar Eyüpsultan, çok zengin bir konut profiline sahiptir. Üst düzey güvenlik ve geniş peyzaj yönetimi temel ihtiyaçtır.",
    localNeeds: [
      'Göktürk ve Kemerburgaz sitelerinde 7/24 lisanslı güvenlik ve alarm izleme',
      'Orman bitişiği yerleşkelerde profesyonel peyzaj, budama ve drenaj bakımı',
      'Alibeyköy kentsel dönüşüm bloklarında şeffaf aidat ve hukuki takip',
    ],
    managedProjects: 33,
    priority: 1,
  },
  {
    slug: 'esenyurt',
    name: 'Esenyurt',
    side: 'Avrupa',
    population: 980000,
    geo: { lat: 41.0333, lng: 28.6833 },
    neighborhoods: ['Güzelyurt', 'Akçaburgaz', 'Mehterçeşme', 'Pınar', 'Talatpaşa', 'Koza'],
    intro:
      "Türkiye'nin en kalabalık ilçesi Esenyurt, yüksek katlı kuleleri ve binlerce bağımsız bölüm içeren siteleriyle ölçekli yönetim ihtiyacının en yoğun olduğu yerdir. Şeffaf muhasebe ve yasal icra takibi kritiktir.",
    localNeeds: [
      'Yüksek bağımsız bölümlü sitelerde %100 tahsilat odaklı aidat ve icra takibi',
      'Yüksek katlı bloklarda asansör, jeneratör ve hidrofor arıza önleme bakımları',
      'Kalabalık giriş-çıkış noktalarında 7/24 fiziki güvenlik ve bariyer kontrolü',
    ],
    managedProjects: 40,
    priority: 1,
    neighborhoodData: [
      { slug: 'guzelyurt', name: 'Güzelyurt', geo: { lat: 41.0397, lng: 28.6739 }, intro: 'Güzelyurt, Esenyurt\'un hızla büyüyen ve yüksek katlı konut bloklarının yoğunlaştığı merkezi mahallelerinden biridir. Binlerce dairelik sitelerde şeffaf aidat yönetimi ve 7/24 güvenlik zorunlu hizmetlerdir.', characteristics: ['yüksek katlı blok', 'büyük ölçek', '7/24 güvenlik'] },
      { slug: 'akcaburgaz', name: 'Akçaburgaz', geo: { lat: 41.048, lng: 28.662 }, intro: 'Akçaburgaz, hızla gelişen konut projelerinin ve geniş sosyal donatılı sitelerin öne çıktığı bir Esenyurt mahallesdir. Aidat icra takibi ve teknik bakım sürekliliği özellikle büyük projeler için kritiktir.', characteristics: ['gelişen bölge', 'sosyal donatılı', 'aidat icra'] },
      { slug: 'mehterçesme', name: 'Mehterçeşme', geo: { lat: 41.0258, lng: 28.679 }, intro: 'Mehterçeşme, orta-büyük ölçekli toplu konutların yer aldığı, ulaşım aksına yakın bir Esenyurt mahallesdir. Toplu yapılarda bütçe şeffaflığı ve teknik arıza önleme hizmetleri öncelikli ihtiyaçlardandır.', characteristics: ['toplu konut', 'ulaşım yakını', 'bütçe şeffaflığı'] },
      { slug: 'talatpasa', name: 'Talatpaşa', geo: { lat: 41.028, lng: 28.688 }, intro: 'Talatpaşa, karma ticaret ve konut kullanımının yer aldığı yoğun nüfuslu bir Esenyurt mahallesdir. Yüksek bağımsız bölümlü yapılarda güvenlik ve ortak alan yönetimi yoğun talep görmektedir.', characteristics: ['karma kullanım', 'yüksek yoğunluk', 'ortak alan yönetimi'] },
    ],
  },
  {
    slug: 'buyukcekmece',
    name: 'Büyükçekmece',
    side: 'Avrupa',
    population: 275000,
    geo: { lat: 41.0219, lng: 28.5853 },
    neighborhoods: ['Alkent 2000', 'Mimaroba', 'Sinanoba', 'Kumburgaz', 'Tepecik', 'Ekinoba'],
    intro:
      "Göl ve deniz manzaralı geniş villalarıyla Alkent 2000 ve Mimaroba yerleşkeleri, Büyükçekmece'yi prestijli bir yaşam merkezi yapar. Geniş parsel güvenliği ve açık havuz işletmesi uzmanlık gerektirir.",
    localNeeds: [
      'Alkent 2000 ve villa sitelerinde geniş arazi devriye ve çevre güvenliği',
      'Göl ve deniz tuzu etkisindeki dış cephe ve mekanik sistem bakımları',
      'Mimaroba ve Sinanoba sitelerinde profesyonel bahçe peyzaj ve havuz hijyeni',
    ],
    managedProjects: 26,
    priority: 2,
  },
  {
    slug: 'avcilar',
    name: 'Avcılar',
    side: 'Avrupa',
    population: 455000,
    geo: { lat: 40.9797, lng: 28.7214 },
    neighborhoods: ['Cihangir', 'Denizköşkler', 'Ambarlı', 'Tahtakale', 'Firuzköy', 'Merkez'],
    intro:
      "Sahil şeridi ve üniversite aksındaki yoğun yerleşimiyle Avcılar, kentsel dönüşümle yenilenen binalara sahiptir. Yapı statiği ve teknik altyapı güvenliği, asansör muayeneleri öncelikli konulardır.",
    localNeeds: [
      'Kentsel dönüşüm sonrası kurulan yeni site yönetimlerinde hukuki danışmanlık',
      'Merkezi ısıtma, payölçer ve asansör sistemlerinde periyodik teknik bakım',
      'Denizköşkler ve Ambarlı sahil binalarında korozyon önleyici koruma',
    ],
    managedProjects: 24,
    priority: 2,
  },
  {
    slug: 'bagcilar',
    name: 'Bağcılar',
    side: 'Avrupa',
    population: 720000,
    geo: { lat: 41.0333, lng: 28.85 },
    neighborhoods: ['Güneşli', 'Mahmutbey', 'Barbaros', 'Yüzyıl', 'Fevzi Çakmak', 'Göztepe'],
    intro:
      "Basın Ekspres yolu boyunca uzanan yeni nesil rezidans ve otel-konsept projeleriyle Bağcılar, modern kentsel dönüşümün simgesidir. Ticaret ve konut entegrasyonu güçlü güvenlik sistemleri gerektirir.",
    localNeeds: [
      'Basın Ekspres rezidanslarında 7/24 lobi karşılama ve güvenlik kontrolü',
      'Büyük sitelerde şeffaf aidat işletme bütçesi ve KMK danışmanlığı',
      'Ortak alanlarda yüksek standartlı endüstriyel temizlik ve hijyen',
    ],
    managedProjects: 28,
    priority: 2,
  },
  {
    slug: 'bahcelievler',
    name: 'Bahçelievler',
    side: 'Avrupa',
    population: 570000,
    geo: { lat: 40.9975, lng: 28.8628 },
    neighborhoods: ['Yenibosna', 'Şirinevler', 'Bahçelievler Merkez', 'Kocasinan', 'Zafer', 'Siyavuşpaşa'],
    intro:
      "Köklü apartman dokusu ve Yenibosna bölgesindeki yeni markalı siteleriyle Bahçelievler, yüksek nüfus yoğunluğuna sahiptir. Apartman yöneticileri için şeffaf aidat ve asansör güvenliği esastır.",
    localNeeds: [
      'Apartman ve sitelerde KMK 634 uyumlu dijital muhasebe ve aidat takibi',
      'Eski ve yeni binalarda asansör, hidrofor ve jeneratör teknik servis anlaşmaları',
      'Ortak merdiven, otopark ve sığınak alanlarının düzenli hijyenik temizliği',
    ],
    managedProjects: 25,
    priority: 2,
  },
  {
    slug: 'zeytinburnu',
    name: 'Zeytinburnu',
    side: 'Avrupa',
    population: 290000,
    geo: { lat: 40.9889, lng: 28.9042 },
    neighborhoods: ['Kazlıçeşme', 'Seyitnizam', 'Merkezefendi', 'Maltepe', 'Sümer', 'Telsiz'],
    intro:
      "Kazlıçeşme sahil hattındaki ultra lüks akıllı kuleleri ve tarihi sur içi komşuluğuyla Zeytinburnu, birinci sınıf tesis yönetimi standartları talep eder. Akıllı bina sistemleri ve concierge öne çıkar.",
    localNeeds: [
      'Sahil rezidanslarında akıllı bina otomasyonu ve 7/24 VIP özel güvenlik',
      'Merkezefendi ve Kazlıçeşme projelerinde kapalı havuz, sauna ve spor salonu hijyeni',
      'Dış cephe cam temizliği ve deniz etkisine karşı teknik bakım programları',
    ],
    managedProjects: 27,
    priority: 1,
  },
  {
    slug: 'beyoglu',
    name: 'Beyoğlu',
    side: 'Avrupa',
    population: 225000,
    geo: { lat: 41.0372, lng: 28.9778 },
    neighborhoods: ['Cihangir', 'Karaköy', 'Taksim', 'Galata', 'Gümüşsuyu', 'Kasımpaşa'],
    intro:
      "Galata, Cihangir ve Karaköy'ün tarihi apartmanları ile butik rezidanslarına ev sahipliği yapan Beyoğlu, tarihi dokuya saygılı özel yönetim gerektirir. Kısa dönemli konaklama ve mülk güvenliği dikkat ister.",
    localNeeds: [
      'Tarihi tescilli binalarda hassas mekanik/elektrik bakım ve restorasyon desteği',
      'Cihangir ve Galata apartmanlarında akıllı şifreli giriş ve kamera sistemleri',
      'Karma kullanımlı binalarda kat malikleri kurulu ve hukuki danışmanlık',
    ],
    managedProjects: 22,
    priority: 2,
  },
  {
    slug: 'fatih',
    name: 'Fatih',
    side: 'Avrupa',
    population: 370000,
    geo: { lat: 41.0186, lng: 28.9394 },
    neighborhoods: ['Aksaray', 'Çapa', 'Fındıkzade', 'Balat', 'Sultanahmet', 'Kocamustafapaşa'],
    intro:
      "Tarihi Yarımada'nın kalbi Fatih, köklü apartman stoğu ve yenilenen sahil yerleşimleriyle öne çıkar. Ortak alan yangın güvenliği, su deposu hijyeni ve aidat disiplini temel unsurlardır.",
    localNeeds: [
      'Geleneksel apartmanlarda KMK mevzuatına uygun işletme projesi ve defter tutumu',
      'Tarihi sokaklarda su deposu, hidrofor ve yangın söndürme tüpleri bakımı',
      'Ortak kullanım alanlarında düzenli böcek ilaçlama ve hijyenik dezenfeksiyon',
    ],
    managedProjects: 20,
    priority: 2,
  },
  {
    slug: 'gaziosmanpasa',
    name: 'Gaziosmanpaşa',
    side: 'Avrupa',
    population: 495000,
    geo: { lat: 41.0583, lng: 28.9083 },
    neighborhoods: ['Merkez', 'Karadeniz', 'Barbaros Hayrettin Paşa', 'Fevzi Çakmak', 'Bağlarbaşı', 'Yıldıztabya'],
    intro:
      "Kapsamlı kentsel dönüşüm projeleriyle yeni ve modern site yerleşkelerine kavuşan Gaziosmanpaşa, profesyonel yönetim sistemlerine hızlı bir geçiş yaşamaktadır. Şeffaf aidat takibi ve güvenlik aranır.",
    localNeeds: [
      'Kentsel dönüşüm ada projelerinde yeni yönetim kurulu teşkili ve işletme bütçesi',
      'Çok bloklu yeni sitelerde plaka tanıma, güvenlik kamerası ve turnike yönetimi',
      'Asansör, sığınak ve hidrofor teknik sistemlerinde düzenli bakım sözleşmeleri',
    ],
    managedProjects: 23,
    priority: 2,
  },
  {
    slug: 'sultangazi',
    name: 'Sultangazi',
    side: 'Avrupa',
    population: 540000,
    geo: { lat: 41.1042, lng: 28.8714 },
    neighborhoods: ['50. Yıl', 'Cebeci', 'Esentepe', 'Uğur Mumcu', 'Gazi', 'İsmetpaşa'],
    intro:
      "Hızla gelişen konut alanları ve toplu yaşam projeleriyle Sultangazi, maliyet-etkin ve güvenilir tesis yönetimine ihtiyaç duyar. Ortak yakıt ve aidat giderlerinin adil taksimi önemlidir.",
    localNeeds: [
      'Büyük bloklu yerleşimlerde aidat tahsilat oranını artıran dijital bildirimler',
      'Merkezi ısıtma ve hidrofor tesisatlarında kış öncesi teknik revizyon',
      'Ortak bahçe ve oyun alanlarında güvenlik kamerası ve aydınlatma kontrolü',
    ],
    managedProjects: 19,
    priority: 3,
  },
  {
    slug: 'esenler',
    name: 'Esenler',
    side: 'Avrupa',
    population: 440000,
    geo: { lat: 41.0392, lng: 28.8878 },
    neighborhoods: ['Birlik', 'Havaalanı', 'Menderes', 'Turgutreis', 'Dörtyol', 'Fevzi Çakmak'],
    intro:
      "Akıllı şehir konseptli dev kentsel dönüşüm alanlarıyla Esenler, çağdaş konut sitelerinin yükseldiği bir ilçedir. Yeni nesil akıllı binalarda uzman teknik kadro ve güvenlik personeli gerekir.",
    localNeeds: [
      'Akıllı dönüşüm konutlarında merkezi otomasyon ve güvenlik devriyesi',
      'Yeni kurulan sitelerde demirbaş kabulü, işletme projesi ve genel kurul yönetimi',
      'Ortak kapalı otopark ve merdiven boşluklarında hijyenik temizlik planı',
    ],
    managedProjects: 21,
    priority: 2,
  },
  {
    slug: 'arnavutkoy',
    name: 'Arnavutköy',
    side: 'Avrupa',
    population: 325000,
    geo: { lat: 41.1833, lng: 28.7333 },
    neighborhoods: ['Hadımköy', 'Merkez', 'Bolluca', 'Boğazköy', 'Taşoluk', 'Haraççı'],
    intro:
      "İstanbul Havalimanı ve Hadımköy sanayi aksıyla hızla büyüyen Arnavutköy, lojistik depolar, sanayi tesisleri ve yeni konut yerleşkelerinin merkezidir. Entegre tesis ve güvenlik yönetimi kritiktir.",
    localNeeds: [
      'Hadımköy ve sanayi tesislerinde 5188 yasal özel güvenlik ve devriye hizmeti',
      'Yeni konut projelerinde açık alan peyzajı, çevre çit güvenliği ve aydınlatma',
      'Büyük lojistik tesislerde endüstriyel zemin bakımı ve atık yönetimi',
    ],
    managedProjects: 24,
    priority: 2,
  },
  {
    slug: 'bayrampasa',
    name: 'Bayrampaşa',
    side: 'Avrupa',
    population: 270000,
    geo: { lat: 41.0478, lng: 28.9039 },
    neighborhoods: ['Muratpaşa', 'Kocatepe', 'Terazidere', 'Kartaltepe', 'Yıldırım', 'Altıntepsi'],
    intro:
      "Büyük ticaret merkezleri ve Mega Center komşuluğundaki Bayrampaşa'da karma projeler ve modern siteler yükselmektedir. Yangın güvenliği ve ortak alan işletmesi hassasiyet gerektirir.",
    localNeeds: [
      'Ticari-konut karma binalarda yangın hidroforu ve duman tahliye bakımları',
      'Yoğun ziyaretçi alanlarında x-ray ve güvenlik personeli denetimi',
      'Site sakinleri için şeffaf mobil aidat ödeme ve duyuru altyapısı',
    ],
    managedProjects: 20,
    priority: 2,
  },
  {
    slug: 'gungoren',
    name: 'Güngören',
    side: 'Avrupa',
    population: 280000,
    geo: { lat: 41.025, lng: 28.8722 },
    neighborhoods: ['Merkez', 'Sanayi', 'Gençosman', 'Tozkoparan', 'Akıncılar', 'Güneştepe'],
    intro:
      "Tekstil sanayisi ve Tozkoparan kentsel dönüşüm projeleriyle dönüşen Güngören, apartman ve küçük sitelerde profesyonel bütçe ve bakım standartlarına ihtiyaç duyar.",
    localNeeds: [
      'Tozkoparan kentsel dönüşüm sitelerinde ilk işletme projesi ve yönetim teşkili',
      'Asansör ve hidrofor periyodik kontrollerinde TSE standartlarında onay',
      'Gecikmiş aidat borçlarında profesyonel ihtar ve icra süreç takibi',
    ],
    managedProjects: 17,
    priority: 3,
  },
  {
    slug: 'silivri',
    name: 'Silivri',
    side: 'Avrupa',
    population: 215000,
    geo: { lat: 41.0739, lng: 28.2464 },
    neighborhoods: ['Merkez', 'Selimpaşa', 'Gümüşyaka', 'Alibey', 'Piri Mehmet Paşa', 'Semizkumlar'],
    intro:
      "Marmara kıyısındaki geniş sahil siteleri ve Selimpaşa villa projeleriyle Silivri, 4 mevsim ve yazlık yaşamın adresidir. Sezonluk işletme projeleri ve perimetre güvenliği gerektirir.",
    localNeeds: [
      'Sahil ve yazlık sitelerde kış güvenliği, kamera izleme ve fiziki kontrol',
      'Yaz sezonunda açık havuz kimyasal denetimi ve cankurtaran/güvenlik desteği',
      'Geniş çim ve ağaçlık alanlarda mevsimlik budama, ilaçlama ve çim bakımı',
    ],
    managedProjects: 22,
    priority: 2,
  },
  {
    slug: 'catalca',
    name: 'Çatalca',
    side: 'Avrupa',
    population: 78000,
    geo: { lat: 41.1436, lng: 28.4608 },
    neighborhoods: ['Ferhatpaşa', 'Kaleiçi', 'Çakıl', 'İnceğiz', 'Elbasan', 'Muratbey'],
    intro:
      "Geniş araziler, müstakil çiftlik evleri ve lojistik antrepolarla Çatalca, geniş alan mülk koruma ve çevre güvenliğine ihtiyaç duyar. Güneş enerjisi ve kuyu teknik bakımları önemlidir.",
    localNeeds: [
      'Geniş müstakil yerleşkelerde çevre çit güvenliği ve hareket sensörlü kameralar',
      'Kuyu suyu, hidrofor, arıtma ve güneş enerjisi tesisatlarında teknik servis',
      'Geniş bahçe ve tarlalarda düzenli yabani ot temizliği ve yangın emniyet şeritleri',
    ],
    managedProjects: 15,
    priority: 3,
  },
];

export const DISTRICT_SLUGS = DISTRICTS.map((d) => d.slug);

export function getDistrict(slug: string): District | undefined {
  return DISTRICTS.find((d) => d.slug === slug);
}

export function isValidDistrict(slug: string): boolean {
  return DISTRICT_SLUGS.includes(slug);
}

const DISTRICT_DUES_MAP: Record<string, { avgDuesM2: number; aloDuesM2: number; savingsRate: number }> = {
  kadikoy: { avgDuesM2: 48, aloDuesM2: 37, savingsRate: 23 },
  atasehir: { avgDuesM2: 52, aloDuesM2: 39, savingsRate: 25 },
  uskudar: { avgDuesM2: 44, aloDuesM2: 34, savingsRate: 22 },
  besiktas: { avgDuesM2: 65, aloDuesM2: 48, savingsRate: 26 },
  sariyer: { avgDuesM2: 72, aloDuesM2: 52, savingsRate: 28 },
  sisli: { avgDuesM2: 58, aloDuesM2: 44, savingsRate: 24 },
  bakirkoy: { avgDuesM2: 54, aloDuesM2: 41, savingsRate: 24 },
  maltepe: { avgDuesM2: 42, aloDuesM2: 32, savingsRate: 24 },
  kartal: { avgDuesM2: 40, aloDuesM2: 30, savingsRate: 25 },
  pendik: { avgDuesM2: 38, aloDuesM2: 28, savingsRate: 26 },
  beylikduzu: { avgDuesM2: 36, aloDuesM2: 27, savingsRate: 25 },
  basaksehir: { avgDuesM2: 42, aloDuesM2: 31, savingsRate: 26 },
  cekmekoy: { avgDuesM2: 45, aloDuesM2: 34, savingsRate: 24 },
  sancaktepe: { avgDuesM2: 36, aloDuesM2: 27, savingsRate: 25 },
  umraniye: { avgDuesM2: 44, aloDuesM2: 33, savingsRate: 25 },
  zeytinburnu: { avgDuesM2: 46, aloDuesM2: 35, savingsRate: 24 },
  fatih: { avgDuesM2: 40, aloDuesM2: 31, savingsRate: 22 },
  eyupsultan: { avgDuesM2: 45, aloDuesM2: 34, savingsRate: 24 },
  esenyurt: { avgDuesM2: 32, aloDuesM2: 24, savingsRate: 25 },
  kucukcekmece: { avgDuesM2: 38, aloDuesM2: 29, savingsRate: 24 },
  avcilar: { avgDuesM2: 35, aloDuesM2: 27, savingsRate: 23 },
  tuzla: { avgDuesM2: 38, aloDuesM2: 28, savingsRate: 26 },
  beykoz: { avgDuesM2: 60, aloDuesM2: 45, savingsRate: 25 },
  buyukcekmece: { avgDuesM2: 39, aloDuesM2: 29, savingsRate: 25 },
  silivri: { avgDuesM2: 32, aloDuesM2: 24, savingsRate: 25 },
  arnavutkoy: { avgDuesM2: 34, aloDuesM2: 26, savingsRate: 24 },
  bagcilar: { avgDuesM2: 34, aloDuesM2: 26, savingsRate: 24 },
  bahcelievler: { avgDuesM2: 38, aloDuesM2: 29, savingsRate: 24 },
  bayrampasa: { avgDuesM2: 36, aloDuesM2: 28, savingsRate: 22 },
  beyoglu: { avgDuesM2: 52, aloDuesM2: 40, savingsRate: 23 },
  catalca: { avgDuesM2: 30, aloDuesM2: 23, savingsRate: 23 },
  esenler: { avgDuesM2: 33, aloDuesM2: 25, savingsRate: 24 },
  gaziosmanpasa: { avgDuesM2: 35, aloDuesM2: 27, savingsRate: 23 },
  güngoren: { avgDuesM2: 35, aloDuesM2: 27, savingsRate: 23 },
  kagithane: { avgDuesM2: 46, aloDuesM2: 35, savingsRate: 24 },
  sile: { avgDuesM2: 36, aloDuesM2: 27, savingsRate: 25 },
  sultangazi: { avgDuesM2: 32, aloDuesM2: 25, savingsRate: 22 },
  sultanbeyli: { avgDuesM2: 30, aloDuesM2: 23, savingsRate: 23 },
  adalar: { avgDuesM2: 45, aloDuesM2: 35, savingsRate: 22 },
};

export function getDistrictDues(slug: string) {
  return DISTRICT_DUES_MAP[slug] || { avgDuesM2: 42, aloDuesM2: 32, savingsRate: 24 };
}

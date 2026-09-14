/**
 * Binalarda Enerji Kimlik Belgesi (EKB) & Ortak Alan EV Şarj İstasyonu Veri Modeli
 * (facilityEnergyEvChargingData.ts)
 * 
 * Google Schema.org TechArticle ve Legislation standartlarında;
 * Apartman ve site otoparklarına Elektrikli Araç (EV) şarj istasyonu kurulumu için KMK m.42 karar nisapları,
 * trafo güç kapasitesi analizi ve Enerji Kimlik Belgesi (EKB) yasal gereklilikleri.
 */

export interface EvChargingOption {
  optionId: 'individual-meter' | 'shared-commercial' | 'central-fleet';
  optionTitle: string;
  legalMajorityRequired: string;
  kmkArticleRef: string;
  infrastructureRequirement: string;
  billingMethod: string;
  fireSafetyPrecautions: string[];
  aloYonetimProtocol: string;
}

export interface EnergyEfficiencyPillar {
  pillarCode: string;
  pillarName: string;
  legalStandard: string;
  targetClassOrSaving: string;
  description: string;
  checklist: string[];
}

export const EV_CHARGING_OPTIONS: EvChargingOption[] = [
  {
    optionId: 'individual-meter',
    optionTitle: '1. Daire Sayacından Müstakil Otopark Alanına Özel Şarj Hattı Çekilmesi',
    legalMajorityRequired: 'Kat Malikleri Kurulu Sayı ve Arsa Payı Çoğunluğu (%50+1)',
    kmkArticleRef: '634 Sayılı KMK Madde 42/1 (Faydalı Yenilik ve İlaveler)',
    infrastructureRequirement: 'Kablo tavası taşıyıcı güzergah onayı, bağımsız sayaçtan otoparka kadar alev geciktirici (halogen-free) kablolama, kaçak akım rölesi ve sigorta kutusu.',
    billingMethod: 'Tüketilen elektrik doğrudan araç sahibinin dairesindeki elektrik faturasına yansır; site yönetimine ek muhasebe yükü binmez.',
    fireSafetyPrecautions: [
      'Kapalı otoparkta Li-ion batarya alevlenmesine karşı aracın bulunduğu park cebine yakın CO2 ve kuru kimyevi tozlu yangın tüpü bulundurulması.',
      'Şarj kablosunun araç şarj olmadığında kilitli kutuda muhafaza edilmesi ve açıkta kablo karmaşası yaratılmaması.',
      'Sitede BEDAŞ/AYEDAŞ onaylı elektrik tesisat projesi çizilerek sayaç panosuna aşırı akım kesici ilavesi.'
    ],
    aloYonetimProtocol: 'Teknik mühendislerimiz güzergah keşfi yaparak kablo tavası estetiğini denetler, diğer sakinlerin park alanına tecavüzü engeller ve yönetim onay protokolü düzenler.'
  },
  {
    optionId: 'shared-commercial',
    optionTitle: '2. Sitenin Ortak Alanına Tüm Sakinlerin Kullanabileceği Paylaşımlı İstasyon Kurulması',
    legalMajorityRequired: 'Kat Malikleri Kurulu Sayı ve Arsa Payı Çoğunluğu (%50+1) veya Ortak Gelir Paylaşımı için Oy Birliği',
    kmkArticleRef: '634 Sayılı KMK Madde 42/1 ve Madde 45 (Ortak Mülkün Kiralanması)',
    infrastructureRequirement: 'Ana trafo panosundan bağımsız AC (22 kW) veya DC (50-120 kW) şarj ünitesi besleme hattı, RFID/mobil uygulama kartlı geçiş terminali.',
    billingMethod: 'Lisanslı şarj ağı işletmecisi (E-Şarj, ZES, Trugo vb.) veya Alo Yönetim yazılımı üzerinden kullanıcılar kilowatt-saat (kWh) başına kredi kartıyla ödeme yapar; site ortak bütçesine ek gelir kalır.',
    fireSafetyPrecautions: [
      'İstasyon bölgesine acil durdurma (Emergency Stop) butonu ve otomatik yangın algılama optik duman sensörü yerleştirilmesi.',
      'Otopark duman tahliye jet-fan sisteminin şarj bölgesindeki ısı artışında otomatik devreye girmesi.',
      'Elektrik dağıtım şirketinden trafo güç artırımı (kurulu güç tahsisi) resmi müsaadesi alınması.'
    ],
    aloYonetimProtocol: 'Türkiye\'nin lider şarj operatörleriyle 0 maliyetle gelir paylaşımlı kurulum anlaşmaları organize ederek sitenize katma değer ve gelir kaynağı sağlıyoruz.'
  }
];

export const ENERGY_EFFICIENCY_PILLARS: EnergyEfficiencyPillar[] = [
  {
    pillarCode: 'ekb-belgesi',
    pillarName: 'Bina Enerji Kimlik Belgesi (EKB) ve Sınıf Uyumluluğu',
    legalStandard: '5627 Sayılı Enerji Verimliliği Kanunu & Binalarda Enerji Performansı Yönetmeliği',
    targetClassOrSaving: 'Mevcut Binalarda Asgari C Sınıfı; Yeni Binalarda B Sınıfı',
    description: 'Binaların yıllık enerji tüketimini (ısıtma, soğutma, havalandırma, aydınlatma) ve sera gazı salımını gösteren, tapu satışlarında ve kiralamalarda ibrazı zorunlu resmi belgedir.',
    checklist: [
      'Yetkili Enerji Verimliliği Danışmanlık (EVD) şirketince binanın mimari, mekanik ve yalıtım projelerinin taranması',
      'Kazan, brülör, pompa ve asansör motor verim sınıflarının (IE3/IE4) tespiti',
      'E-Devlet ve Çevre, Şehircilik ve İklim Değişikliği Bakanlığı BEP-TR yazılımı üzerinden EKB tescili',
      'EKB belgesinin bina ana giriş holünde sakinlerin görebileceği şekilde asılması'
    ]
  },
  {
    pillarCode: 'dis-cephe-yalitim',
    pillarName: 'Merkezi Dış Cephe Mantolama ve Isı Yalıtımı Standartları',
    legalStandard: 'TS 825 Binalarda Isı Yalıtım Kuralları & KMK Madde 42 Karar Nisabı',
    targetClassOrSaving: '%35 ile %45 Doğalgaz / Isıtma Enerjisi Tasarrufu',
    description: 'Ortak yakıt tüketimini neredeyse yarı yarıya düşüren, binanın betonarme taşıyıcı donatısını korozyona karşı koruyan en kritik mühendislik yatırımıdır.',
    checklist: [
      'Kat Malikleri Kurulu\'nda sayı ve arsa payı çoğunluğuyla (%50+1) mantolama ve işletme projesi kararı alınması',
      'Taş yünü (yanmaz A1 sınıfı) veya karbonlu EPS malzeme teknik şartnamesi hazırlanması',
      'İskele kurulumu için Çalışma Bakanlığı İSG mevzuatına uygun tescilli güvenlikli iskele kullanılması',
      'Yüklenici firmadan en az 10 yıl malzeme ve işçilik teminat garantisi alınması'
    ]
  },
  {
    pillarCode: 'led-otomasyon-kompanzasyon',
    pillarName: 'Ortak Alan LED Aydınlatma, Hareket Sensörü & Kompanzasyon Takibi',
    legalStandard: 'Elektrik İç Tesisleri Yönetmeliği & EPDK Reaktif Enerji Tebliği',
    targetClassOrSaving: '%0 Reaktif Ceza & Ortak Elektrikte %30 Tasarruf',
    description: 'Merdiven boşlukları, otoparklar, çevre çitleri ve sosyal tesislerde floresan/akkor ampullerin radar sensörlü LED armatürlere dönüştürülmesi ve reaktif cezanın sıfırlanması.',
    checklist: [
      'Tüm kat sahanlıklarında bekleme modlu (%10 loş, hareket görünce %100 yanan) akıllı radar armatür dönüşümü',
      'Açık otopark ve bahçe aydınlatmalarında astronomik zaman rölesi ile gün batımı-doğumu otomatik zamanlaması',
      'Trafo kompanzasyon panosunda haftalık uzaktan sayaç okuma ile endüktif ve kapasitif sınırların izlenmesi',
      'Ortak alan klimalarında inverter ve A++ enerji etiketli cihaz şartı aranması'
    ]
  }
];

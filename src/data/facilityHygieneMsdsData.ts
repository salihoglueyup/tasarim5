/**
 * Sitelerde Ortak Alan Hijyen Standartları, 4 Renk Kodlu Temizlik Protokolü ve Kimyasal Güvenlik Bilgi Formu (GBF / MSDS) Veri Modeli
 * 
 * Kaynak Mevzuat & Standartlar:
 * - TSE 13811: "Hijyen ve Sanitasyon Yönetim Sistemleri - Genel Şartlar"
 * - 6331 Sayılı İş Sağlığı ve Güvenliği Kanunu & Kimyasal Maddelerle Çalışmalarda Sağlık ve Güvenlik Önlemleri Hakkında Yönetmelik
 * - T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı: "Kimyasalların Kaydı, Değerlendirilmesi, İzni ve Kısıtlanması (KKDİK) Yönetmeliği"
 * - NPSA (National Patient Safety Agency) ve T.C. Sağlık Bakanlığı Onaylı 4 Renkli Çapraz Bulaşma Önleme Standardı
 */

export interface ColorCodedHygieneZone {
  colorKey: 'kirmizi' | 'sari' | 'mavi' | 'yesil';
  colorName: string;
  badgeHex: string;
  badgeBgClass: string;
  badgeBorderClass: string;
  badgeTextClass: string;
  riskLevel: 'Kritik Risk (Yüksek Biyo-Yük)' | 'Orta Risk' | 'Düşük Risk (Genel)' | 'Gıda & Mutfak Alanı';
  assignedSurfaces: string[];
  dedicatedTools: string[];
  chemicalType: string;
  crossContaminationWarning: string;
}

export interface MsdsSafetyDocumentSection {
  sectionNo: number;
  sectionTitle: string;
  contentSummary: string;
  mandatoryInfo: string;
  facilityInspectionSignificance: string;
}

export interface ChuteSanitationProtocol {
  stepNo: number;
  stageName: string;
  equipmentUsed: string;
  disinfectantAgent: string;
  frequency: string;
  objective: string;
}

export interface ChemicalStorageSafetyRule {
  ruleId: string;
  title: string;
  regulatoryStandard: string;
  hazardDescription: string;
  aloYonetimStorageProtocol: string;
}

/**
 * Hastane ve Rezidans Standartlarında 4 Renk Kodlu Çapraz Bulaşmayı Önleme Protokolü
 */
export const COLOR_CODED_HYGIENE_ZONES: ColorCodedHygieneZone[] = [
  {
    colorKey: 'kirmizi',
    colorName: 'KIRMIZI KOD (Yüksek Biyo-Tehlike)',
    badgeHex: '#DC2626',
    badgeBgClass: 'bg-red-500/10 dark:bg-red-950/40',
    badgeBorderClass: 'border-red-500/40 dark:border-red-800/60',
    badgeTextClass: 'text-red-700 dark:text-red-400',
    riskLevel: 'Kritik Risk (Yüksek Biyo-Yük)',
    assignedSurfaces: [
      'Klozet iç ve dış yüzeyleri',
      'Pisuvarlar ve taharet muslukları',
      'Ortak tuvalet zeminleri',
      'Atık çöp bidonu iç hazneleri'
    ],
    dedicatedTools: [
      'Kırmızı mikrofiber bezler',
      'Kırmızı çizgili mop başlıkları',
      'Kırmızı saplı fırça ve kovalar'
    ],
    chemicalType: 'Sağlık Bakanlığı onaylı dezenfektanlı asidik kireç ve organik tortu çözücü',
    crossContaminationWarning: 'Kırmızı kodlu bez veya mop KESİNLİKLE tuvalet kapısının dışına çıkarılamaz; lavaboya dahi sürülemez.'
  },
  {
    colorKey: 'sari',
    colorName: 'SARI KOD (Orta Riskli Islak Hacimler)',
    badgeHex: '#D97706',
    badgeBgClass: 'bg-amber-500/10 dark:bg-amber-950/40',
    badgeBorderClass: 'border-amber-500/40 dark:border-amber-800/60',
    badgeTextClass: 'text-amber-700 dark:text-amber-400',
    riskLevel: 'Orta Risk',
    assignedSurfaces: [
      'Lavabolar ve bataryalar',
      'Aynalar ve cam raflar',
      'Duşakabinler ve banyo fayansları',
      'Sabunluk ve havluluk aparatları'
    ],
    dedicatedTools: [
      'Sarı mikrofiber bezler',
      'Sarı çizgili düz moplar',
      'Sarı sprey şişeleri ve eldivenler'
    ],
    chemicalType: 'Nötr dezenfektan ve yüzey aktif banyo sanitasyon solüsyonu',
    crossContaminationWarning: 'Sarı kod klozet temizliğinde kullanılamaz; klozet bakterisinin lavaboya sıçraması kesinlikle engellenir.'
  },
  {
    colorKey: 'mavi',
    colorName: 'MAVİ KOD (Genel Düşük Risk Alanları)',
    badgeHex: '#2563EB',
    badgeBgClass: 'bg-blue-500/10 dark:bg-blue-950/40',
    badgeBorderClass: 'border-blue-500/40 dark:border-blue-800/60',
    badgeTextClass: 'text-blue-700 dark:text-blue-400',
    riskLevel: 'Düşük Risk (Genel)',
    assignedSurfaces: [
      'Bina giriş lobileri ve resepsiyon',
      'Asansör kabinleri ve buton panelleri',
      'Kat koridorları ve yangın merdivenleri',
      'Merdiven tırabzanları ve kapı kolları'
    ],
    dedicatedTools: [
      'Mavi mikrofiber toz ve cam bezleri',
      'Mavi endüstriyel ıslak mop sistemleri',
      'Mavi saplı çift kovalı pres arabaları'
    ],
    chemicalType: 'Nötr parfümlü yüzey temizleyici ve antistatik zemin bakım cilası',
    crossContaminationWarning: 'Mavi bezler kat koridorlarında ve lobilerde kullanılır; ıslak hacimlere sokulmaz.'
  },
  {
    colorKey: 'yesil',
    colorName: 'YEŞİL KOD (Gıda, Kafeterya ve Sosyal Tesis)',
    badgeHex: '#059669',
    badgeBgClass: 'bg-emerald-500/10 dark:bg-emerald-950/40',
    badgeBorderClass: 'border-emerald-500/40 dark:border-emerald-800/60',
    badgeTextClass: 'text-emerald-700 dark:text-emerald-400',
    riskLevel: 'Gıda & Mutfak Alanı',
    assignedSurfaces: [
      'Site lokali ve kafeterya tezgahları',
      'Personel dinlenme ve mutfak alanları',
      'Su sebilleri ve içecek otomatları',
      'Sosyal tesis yemek masaları'
    ],
    dedicatedTools: [
      'Yeşil antibakteriyel bezler',
      'Gıdaya uygun sertifikalı yeşil süngerler',
      'Yeşil renk kodlu fırçalar'
    ],
    chemicalType: 'Gıda ile temasa uygun, durulama gerektirmeyen QAC veya alkol bazlı sanitizör',
    crossContaminationWarning: 'Yeşil kodlu materyaller sadece gıda hazırlık ve dinlenme ortamlarında kullanılır; diğer hiçbir kimyasalla temas ettirilmez.'
  }
];

/**
 * 6331 Sayılı İSG Kanunu ve KKDİK Kapsamında 16 Başlıklı Güvenlik Bilgi Formu (GBF / MSDS)
 */
export const MSDS_MANDATORY_SECTIONS: MsdsSafetyDocumentSection[] = [
  {
    sectionNo: 1,
    sectionTitle: 'Maddenin / Karışımın ve Şirketin / Dağıtıcının Kimliği',
    contentSummary: 'Ürün ticari adı, üretici firma ve acil durum Ulusal Zehir Danışma Merkezi (UZEM - 114) iletişim numarası.',
    mandatoryInfo: 'UZEM Tel: 114, CAS No, EC No',
    facilityInspectionSignificance: 'Olası zehirlenmelerde 112 ve UZEM hekiminin talep ettiği ilk resmi bilgidir.'
  },
  {
    sectionNo: 2,
    sectionTitle: 'Zararlılık Tanımlanması (GHS / SEA Piktogramları)',
    contentSummary: 'Kimyasalın alevlenir, aşındırıcı, toksik veya çevreye zararlı olduğunu gösteren piktogramlar ve H/P kodları.',
    mandatoryInfo: 'H (Zararlılık) ve P (Önlem) İfadeleri, Tehlike İşaretleri',
    facilityInspectionSignificance: 'Çalışanların tehlike derecesini görsel olarak tanımasını ve doğru koruyucu ekipman giymesini sağlar.'
  },
  {
    sectionNo: 4,
    sectionTitle: 'İlk Yardım Önlemleri',
    contentSummary: 'Kimyasalın göze sıçraması, solunması veya yutulması durumunda anında yapılacak tıbbi müdahaleler.',
    mandatoryInfo: 'Göz yıkama süresi (min. 15 dk), Kusturmama uyarısı, Açık havaya çıkarma',
    facilityInspectionSignificance: 'Kaza anında panik yapılmadan personelin hayatını kurtaran hayati talimattır.'
  },
  {
    sectionNo: 7,
    sectionTitle: 'Elleçleme ve Depolama Güvenliği',
    contentSummary: 'Birlikte depolanmaması gereken (örneğin klor ve asit) kimyasalların ayrım kriterleri ve oda sıcaklığı.',
    mandatoryInfo: 'Havalandırma şartı, Uyumsuz kimyasal listesi, Dökülme tavası',
    facilityInspectionSignificance: 'Kazan dairesi ve depolarda patlama ve zehirli gaz çıkışı riskini sıfıra indirir.'
  },
  {
    sectionNo: 8,
    sectionTitle: 'Maruz Kalma Kontrolleri / Kişisel Korunma (KKD)',
    contentSummary: 'Personelin kullanması zorunlu olan eldiven standardı (EN 374), maske türü ve koruyucu gözlük (EN 166).',
    mandatoryInfo: 'Nitrile eldiven, Gaz/toz maskesi, FFP3 filtresi',
    facilityInspectionSignificance: 'İSG müfettişliği denetimlerinde ceza yememek için birebir eşleşmesi gereken KKD listesidir.'
  }
];

/**
 * Sitelerde Çöp Şaftı, Şutları ve Atık Odası Dezenfeksiyon Protokolü
 */
export const GARBAGE_CHUTE_SANITATION_STEPS: ChuteSanitationProtocol[] = [
  {
    stepNo: 1,
    stageName: 'Mekanik Yıkama & Sıcak Basınçlı Arındırma',
    equipmentUsed: 'Döner nozullu yüksek basınçlı yıkama makinesi (150 Bar)',
    disinfectantAgent: 'Yağ ve protein çözücü alkali köpük',
    frequency: 'Aylık periyot',
    objective: 'Çöp şaftının iç çeperine yapışan organik atık tabakasının ve yağların tamamen kazınarak sökülmesi.'
  },
  {
    stepNo: 2,
    stageName: 'Biyolojik Dezenfeksiyon & Bakteriyel Sterilizasyon',
    equipmentUsed: 'Pnömatik köpük jeneratörü ve dikey püskürtme başlığı',
    disinfectantAgent: 'Sağlık Bakanlığı ruhsatlı geniş spektrumlu kuaterner amonyum solüsyonu',
    frequency: 'Aylık periyot',
    objective: 'Salmonella, E. coli ve koku üreten çürüme bakterilerinin hücresel düzeyde imha edilmesi.'
  },
  {
    stepNo: 3,
    stageName: 'Aktif Ozonlama & Koku Nötralizasyonu',
    equipmentUsed: 'Endüstriyel Korona Deşarjlı Ozon Jeneratörü (10-20 g/h)',
    disinfectantAgent: 'Saf Ozon Gazı (O3)',
    frequency: 'Haftalık 2 saat otomatik döngü',
    objective: 'Koku moleküllerini oksitleyerek yok etmek; bina katlarına yayılan çöp kokusunu %100 engellemek.'
  }
];

/**
 * Kimyasal Depolama & İSG Güvenlik Kuralları
 */
export const CHEMICAL_STORAGE_SAFETY_RULES: ChemicalStorageSafetyRule[] = [
  {
    ruleId: 'chem-klor-asit-ayrimi',
    title: 'Klor ve Asidin Ayrı Depolanması Zorunluluğu',
    regulatoryStandard: '6331 Sayılı İSG Kanunu & Yangın Yönetmeliği',
    hazardDescription: 'Sıvı klor (NaOCl) ile pH düşürücü asit (H2SO4) temas ederse saniyeler içinde ölümcül yeşil klor gazı (Cl2) açığa çıkar.',
    aloYonetimStorageProtocol: 'Klor ve asit ürünleri aralarında en az 3 metre mesafe olacak şekilde ayrı kilitli odalarda ve sızıntı toplama havuzlarında tutulur.'
  },
  {
    ruleId: 'chem-gbf-dosyasi',
    title: 'Tesis İçi Güncel GBF / MSDS Dosyası Bulundurma',
    regulatoryStandard: 'KKDİK Yönetmeliği Madde 27',
    hazardDescription: 'Depoda bulunan kimyasalın Türkçe onaylı güvenlik bilgi formu yoksa kaza anında hekim uygun panzehiri belirleyemez.',
    aloYonetimStorageProtocol: 'Kullanılan her kimyasalın 16 başlıklı Türkçe GBF belgesi hem kimyasal dolabının kapağına asılır hem de QR kodla dijital erişime açılır.'
  },
  {
    ruleId: 'chem-orijinal-ambalaj',
    title: 'Kesinlikle Meşrubat / Su Şişelerine Kimyasal Bölünmemesi',
    regulatoryStandard: 'T.C. Sağlık Bakanlığı Zehirlenme Önleme Tebliği',
    hazardDescription: 'Endüstriyel temizlik maddelerinin su veya kola şişelerine bölünmesi sonucu personelin veya bina sakininin yanlışlıkla içmesi (ölümcül intoksikasyon).',
    aloYonetimStorageProtocol: 'Tüm seyreltmeler özel etiketli, renk kodlu ve kilitli kapaklı orijinal dozaj şişelerinde yapılır; etiketsiz kaplar anında imha edilir.'
  }
];

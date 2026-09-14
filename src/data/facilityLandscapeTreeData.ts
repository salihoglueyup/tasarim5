/**
 * Sitelerde Peyzaj Bakımı, Otomatik Sulama Su Tasarrufu ve Anıt Ağaç Koruma Veri Modeli
 * 
 * Kaynak Mevzuat:
 * - 6831 Sayılı Orman Kanunu (Madde 116 ve Şehir Ağaçları Hükümleri)
 * - 2872 Sayılı Çevre Kanunu & 3194 Sayılı İmar Kanunu Park Bahçeler Yönetmeliği
 * - Türk Ceza Kanunu Madde 151/2 (Mala Zarar Verme - İzinsiz Ağaç Kesimi)
 * - T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Tabiat Varlıklarını Koruma Mevzuatı
 */

export interface LandscapeSeasonalTask {
  seasonKey: 'ilkbahar' | 'yaz' | 'sonbahar' | 'kis';
  seasonName: string;
  months: string;
  primaryFocus: string;
  lawnCareOperations: string[];
  treeAndShrubOperations: string[];
  irrigationSchedule: string;
  fertilizationAndPesticide: string;
}

export interface TreePruningPermitRule {
  id: string;
  treeCategory: string;
  diameterOrSpecies: string;
  legalAuthority: string;
  permitRequired: boolean;
  legalProcedure: string;
  unauthorizedPenalty: string;
  aloYonetimProtocol: string;
}

export interface IrrigationWaterSavingStandard {
  systemType: string;
  efficiencyRating: string;
  waterSavingPercentage: string;
  sensorTechnology: string;
  bestUseArea: string;
  commonMistakeInSites: string;
}

export interface LandscapeLegalDispute {
  issueTitle: string;
  kmkOrCivilCodeRef: string;
  summaryProblem: string;
  legalVerdictAndResolution: string;
}

/**
 * 4 Mevsim Periyodik Peyzaj ve Çim Bakım Takvimi
 */
export const SEASONAL_LANDSCAPE_SCHEDULE: LandscapeSeasonalTask[] = [
  {
    seasonKey: 'ilkbahar',
    seasonName: 'İlkbahar (Uyanış ve Canlanma Dönemi)',
    months: 'Mart - Nisan - Mayıs',
    primaryFocus: 'Kök havalandırma, ara ekim, yavaş salınımlı gübreleme ve sulama sistemi sezon açılışı.',
    lawnCareOperations: [
      'Vertikut (bıçaklı dikey havalandırma) ile keçe tabakasının arındırılması',
      'Silindirleme ve çim köklerinin toprağa oturtulması',
      'Seyrelmiş ve sararmış bölgelere gölge/güneş dayanımlı tohumla ara ekim',
      'Kapak toprağı (elenmiş torf ve dere mili karışımı) serimi'
    ],
    treeAndShrubOperations: [
      'Gül ve çalı gruplarında form budaması',
      'Meyve ve süs ağaçlarında bordo bulamacı (fungisit) uygulaması',
      'Kuruyan ve kırılan kış dallarının steril testereyle ayıklanması',
      'İlkbahar mevsimlik çiçeklerinin (Petunya, Kadife vb.) dikimi'
    ],
    irrigationSchedule: 'Haftada 2-3 gün, sabah 06:00 - 08:00 saatleri arasında, toprak nemine göre kontrollü.',
    fertilizationAndPesticide: 'Yüksek azotlu (20-10-10) yavaş salınımlı ilkbahar gübresi ve geniş yapraklı yabani ot mücadelesi.'
  },
  {
    seasonKey: 'yaz',
    seasonName: 'Yaz (Kuraklık ve Stres Yönetimi)',
    months: 'Haziran - Temmuz - Ağustos',
    primaryFocus: 'Yüksek sıcaklık stresiyle mücadele, düzenli gece sulaması ve mantar (fungus) önleme.',
    lawnCareOperations: [
      'Biçim yüksekliğinin 5-6 cm\'e yükseltilmesi (gölgeleme sağlayarak köklerin yanmasını engelleme)',
      'Haftalık periyodik biçim (bıçakların her 2 biçimde bir bilenmesi)',
      'Öğle sıcaklığında kesinlikle biçim yapılmaması (yaprak ucu yanığı önleme)'
    ],
    treeAndShrubOperations: [
      'Çit bitkilerinde (ligustrum, leylandi) tepe ve yan düzeltme form budamaları',
      'Ağaç diplerinin havalandırılması ve çanak yapılması',
      'Kırmızı örümcek ve yaprak biti (afit) kontrolleri'
    ],
    irrigationSchedule: 'Hergün veya günaşırı, sadece GECE (23:00 - 05:00) saatlerinde buharlaşma kaybını önleyecek şekilde.',
    fertilizationAndPesticide: 'Azot dozu azaltılmış, potasyum ağırlıklı stres direnç gübresi ve koruyucu mantar ilacı.'
  },
  {
    seasonKey: 'sonbahar',
    seasonName: 'Sonbahar (Kök Güçlendirme & Kışa Hazırlık)',
    months: 'Eylül - Ekim - Kasım',
    primaryFocus: 'Kök sisteminin don olaylarına karşı güçlendirilmesi, yaprak temizliği ve derin budama hazırlığı.',
    lawnCareOperations: [
      'Yoğun yaprak süpürme (yaprakların çimin üzerinde çürüyerek mantar yapmasını engelleme)',
      'Sonbahar kürü (vertikut ve derin kök tırmıklama)',
      'Son ara ekim fırsatı (Eylül sonu - Ekim başı optimum sıcaklık)'
    ],
    treeAndShrubOperations: [
      'Geniş yapraklı yaprak döken ağaçlarda yaprak dökümü sonrası derin taç budaması (Belediye izinli)',
      'Kışlık soğanlı ve mevsimlik çiçek (Hercai Menekşe, Süs Lahanası) dikimi',
      'Kök boğazı dolgusu ve rüzgara karşı herekleme (destek çıtası) kontrolü'
    ],
    irrigationSchedule: 'Haftada 1-2 güne düşürülür; yağışlı günlerde yağmur sensörü sayesinde sistem tamamen kapalı kalır.',
    fertilizationAndPesticide: 'Fosfor ve potasyum zengini (10-20-20) kışlık kök gübresi uygulanır; kışa sert ve dirençli girilir.'
  },
  {
    seasonKey: 'kis',
    seasonName: 'Kış (Durgunluk ve Don Koruması)',
    months: 'Aralık - Ocak - Şubat',
    primaryFocus: 'Don hasarını önleme, sulama tesisatının buzdan korunması ve anıt ağaç statik emniyeti.',
    lawnCareOperations: [
      'Donlu ve karlı havalarda çim alanlar üzerinde yürünmesinin engellenmesi (hücre çatlaması önleme)',
      'Kar yığınlarının uzun süre çim üzerinde kalmasını önlemek için kontrollü dağıtım'
    ],
    treeAndShrubOperations: [
      'Don hassasiyeti olan palmiye ve narenciye türlerinin jüt kumaş ve kışlık koruma kılıfıyla sarılması',
      'Kar ağırlığıyla kırılabilecek zayıf ve çatlak ağaç dallarının güvenlik amacıyla temizlenmesi',
      'Kök donmasını önlemek için ağaç diplerine çam kabuğu (malç) serimi'
    ],
    irrigationSchedule: 'SİSTEM TAMAMEN KAPATILIR. Borulardaki ve sayaçtaki su kompresörle tahliye edilir (don patlağı önleme).',
    fertilizationAndPesticide: 'Ağaç gövdelerine kireç badanası veya kışlık yağ uygulaması (kabuk altı zararlı yumurtalarını yok etme).'
  }
];

/**
 * Sitelerde Ağaç Budama, Kesme ve Yasal İzin Standartları
 */
export const TREE_PRUNING_PERMIT_RULES: TreePruningPermitRule[] = [
  {
    id: 'tree-anit-tescilli',
    treeCategory: 'Tescilli Anıt Ağaç veya Tarihi Değerdeki Ağaçlar',
    diameterOrSpecies: 'Gövde çapı > 60 cm, yaşlı Çınar, Meşe, Zeytin, Sedir vb.',
    legalAuthority: 'T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Tabiat Varlıklarını Koruma Komisyonu',
    permitRequired: true,
    legalProcedure: 'Bakanlık uzmanları ve orman mühendisleri yerinde inceleme yapmadan TEK BİR DAL DAHİ KESİLEMEZ. Raporla acil çürüme veya devrilme riski kanıtlanmalıdır.',
    unauthorizedPenalty: '2863 Sayılı Kültür ve Tabiat Varlıklarını Koruma Kanunu kapsamında 2 yıldan 5 yıla kadar hapis cezası ve yüz binlerce TL adli para cezası.',
    aloYonetimProtocol: 'Alo Yönetim anlaşmalı orman mühendisleriyle statik risk raporu hazırlatır ve Tabiat Varlıkları Komisyonu ruhsat sürecini bizzat yönetir.'
  },
  {
    id: 'tree-belediye-park-bahceler',
    treeCategory: 'Site Ortak Alanındaki Yetişkin Şehir Ağaçları',
    diameterOrSpecies: 'Gövde çapı > 15 cm olan Çam, Akasya, Çınar, Ihlamur, İğde vb.',
    legalAuthority: 'İlgili İlçe Belediyesi Park ve Bahçeler Müdürlüğü',
    permitRequired: true,
    legalProcedure: 'KMK m.42 gereği Kat Malikleri Kurulu kararı alınır; belediyeye dilekçe verilerek ziraat mühendisi keşfi talep edilir. Kesim yerine form budaması izni aranır.',
    unauthorizedPenalty: 'İzinsiz kesimlerde belediye encümeni tarafından ağaç başına 20.000 TL - 100.000 TL arası çevre idari para cezası ve 10 katı fidan dikme cezası verilir.',
    aloYonetimProtocol: 'Belediyeden "Ağaç Budama / Kesim İzin Belgesi" alınmadan hiçbir motorlu testere sahaya sokulmaz.'
  },
  {
    id: 'tree-bina-guvenlik-tehdit',
    treeCategory: 'Kökleri Temele Zarar Veren veya Devrilme Tehlikesi Olan Ağaçlar',
    diameterOrSpecies: 'Bina cephesine 2 metreden yakın, su borusunu patlatan veya kökü binayı kaldıran ağaçlar',
    legalAuthority: 'Sulh Hukuk Mahkemesi Değişik İş Tespiti & Belediye Fen İşleri',
    permitRequired: true,
    legalProcedure: 'Mahkemeden bilirkişi tespiti yaptırılır; binanın statik taşıyıcı sistemine veya can güvenliğine tehdit oluşturduğu raporlanarak acil kesim/kök budama izni alınır.',
    unauthorizedPenalty: 'Tek başına yöneticinin keyfi kesmesi halinde muhalif maliklerce mala zarar vermeden dava açılabilir.',
    aloYonetimProtocol: 'İnşaat mühendisi ve ziraat mühendisi ortak teknik raporu hazırlanır; sulh hukuk veya belediye onayıyla güvenli söküm gerçekleştirilir.'
  },
  {
    id: 'tree-rutin-cali-cit',
    treeCategory: 'Çalı, Ligustrum Çit ve Meyve Ağacı Rutin Budaması',
    diameterOrSpecies: 'Gövde çapı < 15 cm, süs bitkileri, güller, mazı çitleri',
    legalAuthority: 'Site Yönetim Kurulu Kararı',
    permitRequired: false,
    legalProcedure: 'Yönetim planı ve yıllık işletme projesi kapsamında profesyonel bahçıvan veya peyzaj ekibince mevsiminde form budaması yapılır.',
    unauthorizedPenalty: 'Yasal ceza bulunmaz; ancak ehliyetsiz budamayla bitkinin kurutulması durumunda yöneticiye tazminat sorumluluğu doğabilir.',
    aloYonetimProtocol: 'Tüm budamalar ziraat teknikerlerimizce sterilize edilmiş aletlerle ve aşı macunu sürülerek yapılır.'
  }
];

/**
 * Akıllı Sulama Sistemleri ve Su Tasarruf Standartları
 */
export const SMART_IRRIGATION_STANDARDS: IrrigationWaterSavingStandard[] = [
  {
    systemType: 'Basınç Ayarlı Damla Sulama (Drip Irrigation)',
    efficiencyRating: 'A+++ (%90-95 Verimlilik)',
    waterSavingPercentage: '%50 - %65 Su Tasarrufu',
    sensorTechnology: 'Kök bölgesi nem sensörleri ve hat sonu basınç regülatörleri',
    bestUseArea: 'Ağaç dipleri, çalı grupları, mevsimlik çiçek tarhları ve sarmaşık hatları',
    commonMistakeInSites: 'Hortumla veya fıskiyeyle yaprakların ıslatılması; güneş altında mercek etkisiyle yaprakların yanması ve %60 buharlaşma israfı.'
  },
  {
    systemType: 'Dişli Rotor & Akıllı Sprey Fıskiye Sistemleri',
    efficiencyRating: 'A+ (%75-85 Verimlilik)',
    waterSavingPercentage: '%30 - %45 Su Tasarrufu',
    sensorTechnology: 'Dijital yağmur sensörü (Rain-Click) ve rüzgar hızı sensörü',
    bestUseArea: 'Geniş çim alanları, ortak parklar ve spor alanları',
    commonMistakeInSites: 'Fıskiyelerin asfalt yola veya bina cephesine sıkması (kör nokta ayarsızlığı); gündüz 12:00\'de sulama yapılması.'
  },
  {
    systemType: 'Yağmur Suyu Hasadı & Gri Su Geri Kazanımı',
    efficiencyRating: 'Sıfır Şebeke Suyu Tüketimi',
    waterSavingPercentage: '%70 - %100 Ortak Alan Su Faturası Tasarrufu',
    sensorTechnology: 'Depo seviye şamandırası ve ultraviyole (UV) dezenfeksiyon ünitesi',
    bestUseArea: 'Çatı oluklarından toplanan suların peyzaj sulama deposuna aktarılması',
    commonMistakeInSites: 'Yağmur suyunun kanalizasyon hattına doğrudan deşarj edilmesi ve sitenin yüksek tonajlı şehir şebeke suyu ile sulanması.'
  }
];

/**
 * Sitelerde Komşuluk Hukuku ve Peyzaj Hukuki Uyuşmazlıkları (KMK & TMK)
 */
export const LANDSCAPE_LEGAL_DISPUTES: LandscapeLegalDispute[] = [
  {
    issueTitle: 'Zemin Kat Sakininin Ortak Bahçeyi Şahsına Çevirmesi',
    kmkOrCivilCodeRef: 'KMK Madde 16 & Madde 19 (Ortak Yerlerin Kullanımı)',
    summaryProblem: 'Giriş kat malikinin önündeki ortak peyzaj alanını çitlerle çevirip yalnızca kendi kullanımına tahsis etmesi.',
    legalVerdictAndResolution: 'Yargıtay yerleşik içtihatlarına göre bahçe katları sözleşmede açık hüküm yoksa tüm maliklerin ortak yeridir. Çitler derhal kaldırtılır; eski hale getirme masrafı ilgili malikten tahsil edilir.'
  },
  {
    issueTitle: 'Üst Katın Manzarasını Kapatan Yüksek Ağaç Şikayeti',
    kmkOrCivilCodeRef: 'Türk Medeni Kanunu (TMK) Madde 737 & 740 (Komşuluk Hukuku)',
    summaryProblem: 'Ortak bahçede dikilen çam veya kavak ağacının 1. ve 2. kat sakinlerinin güneşini ve manzarasını tamamen kesmesi.',
    legalVerdictAndResolution: 'TMK m.740 uyarınca komşuya zarar veren ağaç dallarının kesilmesi talep edilebilir. Sulh Hukuk Mahkemesi kararıyla tepe budaması yapılarak ışık hakkı iade edilir.'
  },
  {
    issueTitle: 'Ortak Bahçedeki Ağacın Park Halindeki Araca Düşmesi',
    kmkOrCivilCodeRef: 'Türk Borçlar Kanunu Madde 69 (Bina ve Yapı Eseri Malikinin Sorumluluğu)',
    summaryProblem: 'Fırtınada kuruyan çürük ağaç dalının otoparktaki aracın üzerine düşerek maddi hasar vermesi.',
    legalVerdictAndResolution: 'Yönetim kurulunun periyodik bakım ve çürük dal budama yükümlülüğünü ihmal ettiği tespit edilirse, hasar apartman ortak bütçesinden ve kusurlu yöneticiden rücuen tazmin edilir.'
  }
];

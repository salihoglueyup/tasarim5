/**
 * Sitelerde Biyosidal Haşere İlaçlama, Sağlık Bakanlığı Ruhsatlandırması ve Entegre Zararlı Yönetimi (IPM) Veri Modeli
 * 
 * Kaynak Mevzuat:
 * - T.C. Sağlık Bakanlığı: "Biyosidal Ürünlerin Kullanım Usul ve Esasları Hakkında Yönetmelik" (Resmi Gazete: 27.01.2005 / Sayı: 25709)
 * - T.C. Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü Çevre Sağlığı Dairesi İlaçlama Standartları
 * - Dünya Sağlık Örgütü (WHO): "Integrated Pest Management (IPM) Principles"
 */

export interface PestSpeciesProtocol {
  id: string;
  pestName: string;
  scientificName: string;
  targetLocations: string[];
  activeMethod: 'Kokusuz Jel Uygulaması' | 'Kilitli Yem İstasyonu' | 'Rezidüel Sıvı İlaçlama' | 'ULV Soğuk Sisleme' | 'Biyolojik Larvasit';
  chemicalCategory: string;
  evacuationNeeded: boolean;
  evacuationDurationHours: number;
  reapplicationCycle: string;
  aloYonetimProtocol: string;
}

export interface BiocidalRegulationRequirement {
  id: string;
  documentOrRule: string;
  issuingAuthority: string;
  legalMandate: string;
  penaltyForUnlicensed: string;
  aloYonetimCompliance: string;
}

export interface IntegratedPestStep {
  stepNo: number;
  phaseName: string;
  responsibleTitle: string;
  actionSummary: string;
  technicalEquipment: string;
  residentNoticeRequired: boolean;
}

export interface PestControlSafetyWarning {
  riskType: string;
  targetGroup: string;
  hazardDescription: string;
  precautionInstruction: string;
}

/**
 * Sitelerde En Sık Görülen Zararlılar ve Mücadele Protokolleri
 */
export const PEST_SPECIES_PROTOCOLS: PestSpeciesProtocol[] = [
  {
    id: 'pest-hamambocekleri',
    pestName: 'Alman / Doğu / Amerikan Hamamböceği',
    scientificName: 'Blattella germanica / Blatta orientalis / Periplaneta americana',
    targetLocations: ['Kazan dairesi', 'Çöp şaftları', 'Mutfak tesisat geçişleri', 'Sığınaklar', 'Asansör kuyu dipleri'],
    activeMethod: 'Kokusuz Jel Uygulaması',
    chemicalCategory: 'Fipronil / İmidakloprid esaslı feromonlu cezbedici jel',
    evacuationNeeded: false,
    evacuationDurationHours: 0,
    reapplicationCycle: 'Mevsim geçişlerinde (Yılda 3-4 kez)',
    aloYonetimProtocol: 'Noktasal jel damlatma ile yuva içi zincirleme ölüm (domino etkisi) sağlanır; sakinlerin evden çıkması gerekmez.'
  },
  {
    id: 'pest-kemirgenler',
    pestName: 'Kemirgenler (Kahverengi Sıçan, Çatı Sıçanı, Ev Faresi)',
    scientificName: 'Rattus norvegicus / Rattus rattus / Mus musculus',
    targetLocations: ['Rögar çevreleri', 'Otopark dilatasyon derzleri', 'Jeneratör odaları', 'Trafo binası', 'Bahçe peyzaj sınırları'],
    activeMethod: 'Kilitli Yem İstasyonu',
    chemicalCategory: 'İkinci nesil antikoagülan (Brodifacoum / Bromadiolone mum blok)',
    evacuationNeeded: false,
    evacuationDurationHours: 0,
    reapplicationCycle: 'Aylık istasyon kontrolü ve yem tazeleme',
    aloYonetimProtocol: 'Çocukların ve evcil hayvanların açamayacağı çift kilitli, barkodlu istasyonlar kurulur; açıkta asla yem bırakılmaz.'
  },
  {
    id: 'pest-kene-pire',
    pestName: 'Pire, Kene ve Yürüyen Ektoparazitler',
    scientificName: 'Ctenocephalides canis/felis / Ixodes ricinus',
    targetLocations: ['Sığınaklar', 'Bodrum katları', 'Kedi besleme alanları', 'Açık çim alanlar ve çalı dipleri'],
    activeMethod: 'Rezidüel Sıvı İlaçlama',
    chemicalCategory: 'Mikrokapsüllenmiş Sentetik Piretroid (Deltamethrin / Cypermethrin)',
    evacuationNeeded: true,
    evacuationDurationHours: 2,
    reapplicationCycle: 'İlk uygulamadan 14-21 gün sonra yumurta çatlama takibi',
    aloYonetimProtocol: 'Basınçlı pülverizatörle zemin ve duvar çatlakları ilaçlanır; 2 saat kapalı tutulduktan sonra 30 dakika havalandırılır.'
  },
  {
    id: 'pest-sivrisinek-larva',
    pestName: 'Sivrisinek ve Karasinek Larvaları',
    scientificName: 'Culex pipiens / Aedes albopictus / Musca domestica',
    targetLocations: ['Yağmur suyu drenaj çukurları', 'Kanalizasyon rögarları', 'Süs havuzları', 'Bodrum su birikintileri'],
    activeMethod: 'Biyolojik Larvasit',
    chemicalCategory: 'Bacillus thuringiensis israelensis (BTI) / Diflubenzuron',
    evacuationNeeded: false,
    evacuationDurationHours: 0,
    reapplicationCycle: 'Mayıs - Ekim ayları arası her 21 günde bir',
    aloYonetimProtocol: 'Sadece larva evresine etki eden, suda yaşayan diğer canlılara ve arılara zarar vermeyen çevre dostu biyolojik larvasit tabletleri kullanılır.'
  },
  {
    id: 'pest-tahtakurusu',
    pestName: 'Tahtakurusu',
    scientificName: 'Cimex lectularius',
    targetLocations: ['Yatak başlıkları', 'Pervaz arkaları', 'Kablo kanalları', 'Süpürgelikler'],
    activeMethod: 'ULV Soğuk Sisleme',
    chemicalCategory: 'Kalıcı rezidüel insektisit + 180°C kuru doymuş buhar şoku',
    evacuationNeeded: true,
    evacuationDurationHours: 4,
    reapplicationCycle: '10 gün arayla 2 aşamalı zorunlu tekrar',
    aloYonetimProtocol: 'Önce buharla yumurtalar imha edilir, ardından mikrokapsül ilaçla ULV sisleme yapılarak 4 saat tam izolasyon sağlanır.'
  }
];

/**
 * Sağlık Bakanlığı Biyosidal Ruhsat ve Yasal Mevzuat Maddeleri
 */
export const BIOCIDAL_REGULATION_REQUIREMENTS: BiocidalRegulationRequirement[] = [
  {
    id: 'req-biyosidal-izin-belgesi',
    documentOrRule: 'Biyosidal Ürün Uygulama İzin Belgesi',
    issuingAuthority: 'T.C. Sağlık Bakanlığı İl Sağlık Müdürlüğü',
    legalMandate: 'Yönetmelik Madde 5 gereği, toplu yaşam alanlarında ilaçlama yapacak tüm tüzel kişiliklerin yetki belgesi olması şarttır.',
    penaltyForUnlicensed: 'Ruhsatsız kaçak ilaçlama yapanlara ve bu kişilere iş veren site yöneticilerine Türk Ceza Kanunu ve Kabahatler Kanunu uyarınca ağır adli para cezası.',
    aloYonetimCompliance: 'Hizmet veren tüm uzman ekiplerimiz ve anlaşmalı çözüm ortaklarımız Sağlık Bakanlığı onaylı Biyosidal Uygulama İzin Belgesine sahiptir.'
  },
  {
    id: 'req-mesul-mudur',
    documentOrRule: 'Mesul Müdürlük ve Ekip Sorumlusu Sertifikası',
    issuingAuthority: 'Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü',
    legalMandate: 'Biyosidal uygulamaları yönetecek bir Biyolog, Kimyager, Ziraat Mühendisi, Çevre Mühendisi veya Hekim mesul müdür bulundurulması mecburidir.',
    penaltyForUnlicensed: 'Mesul müdürsüz yapılan uygulamalar yok hükmünde sayılır; tesis ilaçlama defteri onaylanmaz.',
    aloYonetimCompliance: 'Operasyonlarımız ziraat mühendisleri ve biyolog mesul müdürlerimiz denetiminde hazırlanmış risk planlarıyla yürütülür.'
  },
  {
    id: 'req-uygulama-belgesi-ek1',
    documentOrRule: 'Sağlık Bakanlığı Ek-1 Biyosidal Ürün Uygulama Belgesi',
    issuingAuthority: 'T.C. Sağlık Bakanlığı Resmi Matbu Form',
    legalMandate: 'İlaçlama bittikten sonra kullanılan ilacın adı, Sağlık Bakanlığı ruhsat numarası, etken maddesi ve dozu resmi belgeyle yöneticiye teslim edilmelidir.',
    penaltyForUnlicensed: 'Form tutulmaması halinde belediye ve sağlık müdürlüğü denetimlerinde siteye çevre sağlığı kusur cezası uygulanır.',
    aloYonetimCompliance: 'Her uygulama akabinde Ek-1 formu QR kodlu olarak sistemimize yüklenir ve bina ilan panosuna asılır.'
  },
  {
    id: 'req-resident-notice',
    documentOrRule: 'Kat Maliklerine 48 Saat Önceden Yazılı Bildirim',
    issuingAuthority: 'Kat Mülkiyeti Kanunu ve İSG Yönetmelikleri',
    legalMandate: 'Ortak alan ilaçlamalarından en az 48 saat önce ilaçlama günü, saati, kullanılacak ilacın niteliği ve alınacak tedbirler sakinlere duyurulmalıdır.',
    penaltyForUnlicensed: 'Haber verilmeden yapılan ilaçlama sonucu astım hastası veya evcil hayvanın zarar görmesinde yönetici şahsen tazminatla sorumludur.',
    aloYonetimCompliance: 'Alo Yönetim SMS, mobil bildirim ve bina giriş dijital ekranları üzerinden 48 saat ve 24 saat önceden çift aşamalı bildirim yapar.'
  }
];

/**
 * 4 Aşamalı Entegre Zararlı Yönetimi (IPM) İş Akışı
 */
export const IPM_APPLICATION_STEPS: IntegratedPestStep[] = [
  {
    stepNo: 1,
    phaseName: 'Fiziki Keşif & Zararlı Tür Tespiti',
    responsibleTitle: 'Ziraat Mühendisi / Biyolog',
    actionSummary: 'Sitenin bodrum katları, rögar hatları, çöp toplama odaları ve dilatasyon boşlukları ultraviyole fenerler ve feromon tuzaklarıyla taranarak popülasyon kaynağı haritalandırılır.',
    technicalEquipment: 'UV Floresan Fener, Feromonlu İnceleme Tuzakları, Nem ve Sıcaklık Ölçer',
    residentNoticeRequired: false
  },
  {
    stepNo: 2,
    phaseName: 'Sakin Bildirimi & Alanın Güvenliğe Alınması',
    responsibleTitle: 'Site Yönetim Direktörü',
    actionSummary: 'İlaçlama yapılacak ortak mahaller belirlenir; sakinlere SMS ve dijital pano ile bilgilendirme yapılır; sığınak, çöp odası gibi alanların pencereleri izole edilir.',
    technicalEquipment: 'Uyarı İkaz Şeritleri, İlaçlama Güvenlik Levhaları',
    residentNoticeRequired: true
  },
  {
    stepNo: 3,
    phaseName: 'Hedefe Özel Biyosidal Uygulama & İstasyon Kurulumu',
    responsibleTitle: 'Sertifikalı Biyosidal Uygulayıcı',
    actionSummary: 'WHO onaylı kokusuz formülasyonlarla noktasal jel, kilitli kemirgen istasyonu ve ULV soğuk sisleme uygulamaları yapılır; doymamış zemin bırakılmaz.',
    technicalEquipment: 'Elektrikli ULV Soğuk Sisleme Cihazı, Basınçlı Rezidüel Pülverizatör, Barkodlu Yem İstasyonu',
    residentNoticeRequired: true
  },
  {
    stepNo: 4,
    phaseName: 'Ek-1 Belgesi Onayı & 21 Gün Kontrol Randevusu',
    responsibleTitle: 'Mesul Müdür & Site Yöneticisi',
    actionSummary: 'Resmi Ek-1 belgesi karşılıklı imzalanır; istasyon barkodları taranır; haşerelerin yumurta kuluçka süresi olan 21. günde kontrol ziyareti otomatik takvime işlenir.',
    technicalEquipment: 'Dijital Ruhsatlandırma Tableti, QR Kod Okuyucu',
    residentNoticeRequired: false
  }
];

/**
 * Site Sakinleri & Evcil Hayvan Güvenlik İlkeleri
 */
export const RESIDENTIAL_PEST_SAFETY_CHECKLIST: PestControlSafetyWarning[] = [
  {
    riskType: 'Evcil Hayvan Güvenliği',
    targetGroup: 'Kedi ve Köpek Sahipleri',
    hazardDescription: 'Açıkta bırakılan rodentisit (fare zehri) yemleri evcil hayvanlar tarafından yutulduğunda iç kanamaya yol açabilir.',
    precautionInstruction: 'Alo Yönetim sitelerinde kemirgen yemleri yalnızca özel anahtarlı, hayvanların pati veya ağzının giremeyeceği korumalı tünel istasyonlarda kullanılır.'
  },
  {
    riskType: 'Çocuk Oyun Alanı Güvenliği',
    targetGroup: 'Çocuklar ve Ebeveynler',
    hazardDescription: 'Çocuk parkı ve kum havuzu yakınlarında kimyasal kalıntı solunması veya teması alerjik reaksiyon yapabilir.',
    precautionInstruction: 'Çocuk oyun alanlarının 20 metre yakınında sıvı püskürtme yapılmaz; yalnızca biyolojik larvasit veya feromonlu mekanik tuzaklar kullanılır.'
  },
  {
    riskType: 'Solunum Yolu Hassasiyeti',
    targetGroup: 'Astım, KOAH ve Alerji Hastaları',
    hazardDescription: 'ULV soğuk sisleme yapılan kapalı mekanlarda asılı kalan mikronize damlacıklar solunum güçlüğü yaratabilir.',
    precautionInstruction: 'Sisleme yapılan alanlar 2 saat kapalı tutulduktan sonra en az 30 dakika karşılıklı hava sirkülasyonuyla havalandırılmadan kullanıma açılmaz.'
  }
];

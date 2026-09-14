/**
 * 6331 Sayılı İş Sağlığı ve Güvenliği (İSG) Kanunu Kapsamında Sitelerde Risk Analizi, Acil Ekipler ve İşveren Yükümlülükleri Veri Modeli
 * 
 * Kaynak Mevzuat:
 * - 6331 Sayılı İş Sağlığı ve Güvenliği Kanunu (Resmi Gazete: 30.06.2012 / Sayı: 28339)
 * - İşyerlerinde Acil Durumlar Hakkında Yönetmelik
 * - İş Sağlığı ve Güvenliği Risk Değerlendirmesi Yönetmeliği
 * - 5510 Sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu (İş Kazası ve Rücu Sorumluluğu)
 */

export interface OhsHazardClassRule {
  hazardClass: 'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli';
  siteScopeDescription: string;
  isgUzmaniRequirement: string;
  isyeriHekimiRequirement: string;
  riskAssessmentValidityYears: number;
  emergencyPlanValidityYears: number;
  aloYonetimProtocol: string;
}

export interface OhsMandatoryDocument {
  id: string;
  documentTitle: string;
  statutoryBasis: string;
  mandatoryFrequency: string;
  responsibleParties: string;
  criticalInspectionSignificance: string;
  nonCompliancePenalty: string;
}

export interface EmergencyResponseTeamDef {
  teamCode: 'sondurme' | 'kurtarma' | 'koruma' | 'ilkyardim';
  teamName: string;
  minimumStaffRatio: string;
  requiredCertification: string;
  primaryDutiesInSite: string[];
  mandatoryEquipment: string[];
}

export interface OhsAdministrativePenalty {
  violationDescription: string;
  kanunArticleRef: string;
  penaltySeverityLevel: 'İdari Para Cezası' | 'İşin Durdurulması' | 'Hapis / Adli Sorumluluk';
  penaltyAmountRange: string;
  managementPersonalLiability: string;
}

/**
 * Siteler İçin 6331 Sayılı İSG Kanunu Tehlike Sınıfı Kriterleri
 */
export const OHS_HAZARD_CLASSES: OhsHazardClassRule[] = [
  {
    hazardClass: 'Az Tehlikeli',
    siteScopeDescription: 'Yalnızca kapıcı, temizlikçi veya danışma personeli çalıştıran standart konut siteleri ve apartmanlar.',
    isgUzmaniRequirement: 'Dışarıdan Ortak Sağlık ve Güvenlik Birimi (OSGB) veya İSG-KATİP üzerinden yetkilendirilmiş uzman.',
    isyeriHekimiRequirement: 'Yılda en az 1 kez genel sağlık taraması ve işe giriş sağlık raporu.',
    riskAssessmentValidityYears: 6,
    emergencyPlanValidityYears: 6,
    aloYonetimProtocol: 'Alo Yönetim anlaşmalı akredite OSGB uzmanlarıyla her 6 yılda bir veya her kaza/tadilat sonrası risk analizini yeniler.'
  },
  {
    hazardClass: 'Tehlikeli',
    siteScopeDescription: 'Kendi bünyesinde teknik bakım personeli (yüksek gerilim, kazan işletmecisi, asansör müdahale personeli) bulunduran büyük rezidans ve karma projeler.',
    isgUzmaniRequirement: 'B Sınıfı veya C Sınıfı sözleşmeli İSG Uzmanı düzenli saha teftişi.',
    isyeriHekimiRequirement: 'Çalışan başına ayda en az 10-15 dakika hekim hizmeti ve periyodik akciğer/kan testleri.',
    riskAssessmentValidityYears: 4,
    emergencyPlanValidityYears: 4,
    aloYonetimProtocol: 'Teknik personelin yüksekte çalışma, kapalı alan ve elektrik İSG sertifikaları eksiksiz sağlanır.'
  },
  {
    hazardClass: 'Çok Tehlikeli',
    siteScopeDescription: 'Bünyesinde sanayi tipi enerji üretim tesisi, kimyasal klor gazı dozlama ünitesi veya ağır endüstriyel arıtma bulunan mega tesisler.',
    isgUzmaniRequirement: 'A Sınıfı İSG Uzmanı ve tam zamanlı İSG Kurulu.',
    isyeriHekimiRequirement: 'Aylık detaylı biyolojik maruziyet testleri ve ağır iş görebilirlik raporları.',
    riskAssessmentValidityYears: 2,
    emergencyPlanValidityYears: 2,
    aloYonetimProtocol: 'Alo Yönetim kurumsal tesis yönetimi protokolüyle tam teftiş ve 7/24 İSG denetimi icra eder.'
  }
];

/**
 * Sitelerde Bulunması Yasal Olarak Zorunlu Olan 5 Temel İSG Belgesi
 */
export const OHS_MANDATORY_DOCUMENTS: OhsMandatoryDocument[] = [
  {
    id: 'doc-risk-degerlendirmesi',
    documentTitle: 'Site İSG Risk Değerlendirme Raporu',
    statutoryBasis: '6331 Sayılı Kanun Madde 10 & Yönetmelik',
    mandatoryFrequency: 'En geç 6 yılda bir (Az Tehlikeli) veya tadilat/kaza anında',
    responsibleParties: 'Site Yönetim Kurulu & Sertifikalı İSG Uzmanı',
    criticalInspectionSignificance: 'Bina ortak alanlarındaki şaft boşlukları, elektrik panoları, havuz emniyeti, sığınaklar ve asansör riskleri puanlanır.',
    nonCompliancePenalty: 'Raporu olmayan sitelere her ay için katlanan yüksek idari para cezası.'
  },
  {
    id: 'doc-acil-durum-plani',
    documentTitle: 'Site Acil Durum Eylem Planı ve Tahliye Krokileri',
    statutoryBasis: 'İşyerlerinde Acil Durumlar Hakkında Yönetmelik Madde 7',
    mandatoryFrequency: 'En geç 6 yılda bir & Yılda en az 1 kez tatbikat',
    responsibleParties: 'İSG Uzmanı, Yönetici ve Blok Temsilcileri',
    criticalInspectionSignificance: 'Deprem, yangın, sel, gaz kaçağı anında toplanma alanları ve acil kaçış yolları krokisi bina panolarına asılmalıdır.',
    nonCompliancePenalty: 'Yangın ve acil durum planı eksikliğinde bina kullanım ruhsatı askıya alınabilir.'
  },
  {
    id: 'doc-saglik-raporlari',
    documentTitle: 'Personel İşe Giriş ve Periyodik Sağlık Raporları',
    statutoryBasis: '6331 Sayılı Kanun Madde 15',
    mandatoryFrequency: 'İşe girişte ve en geç 5 yılda bir (Az Tehlikeli)',
    responsibleParties: 'Yetkili İşyeri Hekimi',
    criticalInspectionSignificance: 'Kapıcı ve temizlikçilerin ağır yük taşıma, kimyasal soluma, tetanos aşısı ve akciğer grafisi kontrolleri.',
    nonCompliancePenalty: 'Sağlık raporu olmadan personel çalıştıran yönetimlere çalışan başına idari para cezası.'
  },
  {
    id: 'doc-isg-egitimi',
    documentTitle: 'Temel İSG Çalışan Eğitim Sertifikaları (8-12 Saat)',
    statutoryBasis: 'Çalışanların İSG Eğitimleri Usul ve Esasları Yönetmeliği',
    mandatoryFrequency: 'En geç 3 yılda bir (Az Tehlikeli)',
    responsibleParties: 'Sözleşmeli OSGB ve İSG Uzmanı',
    criticalInspectionSignificance: 'Yangın tüpü kullanımı, elektrik kazaları, yüksekten düşme ve kimyasal temas ilk yardım eğitimleri.',
    nonCompliancePenalty: 'Eğitimsiz işçi çalıştırmada olası iş kazasında yöneticinin doğrudan taksirle yaralama suçundan yargılanması.'
  },
  {
    id: 'doc-kkd-teslim-tutanagi',
    documentTitle: 'Kişisel Koruyucu Donanım (KKD) Teslim ve Taahhüt Tutanağı',
    statutoryBasis: 'Kişisel Koruyucu Donanımların İşyerlerinde Kullanılması Yönetmeliği',
    mandatoryFrequency: 'Malzeme tesliminde ıslak imzalı tutanak',
    responsibleParties: 'Site Amiri ve Personel',
    criticalInspectionSignificance: 'Çelik burunlu iş ayakkabısı, kimyasal eldiven, maske ve reflektörlü yelek teslim edildiğine dair imza.',
    nonCompliancePenalty: 'Tutanaksız verilen ekipman hukuken verilmemiş sayılır; iş kazası sorumluluğu yöneticiye kalır.'
  }
];

/**
 * Binalarda ve Sitelerde Kurulması Zorunlu 4 Acil Durum Ekibi
 */
export const EMERGENCY_RESPONSE_TEAMS: EmergencyResponseTeamDef[] = [
  {
    teamCode: 'sondurme',
    teamName: 'Yangın Söndürme Ekibi',
    minimumStaffRatio: 'Her 50 çalışanda/blokta en az 1 kişi',
    requiredCertification: 'Temel Yangın Eğitimi ve Yangın Söndürme Tatbikat Belgesi',
    primaryDutiesInSite: [
      'Yangın anında ana doğalgaz ve elektrik panolarını kesmek',
      'Yangın söndürme tüpleri ve yangın hortumlarıyla ilk müdahaleyi yapmak',
      'İtfaiye ekiplerine hidrant ve yangın dolabı konumlarını bildirmek'
    ],
    mandatoryEquipment: ['Yangın Battaniyesi', '6 kg ABC Kuru Kimyevi Tozlu Tüp', 'Isıya Dayanıklı Eldiven', 'Yangın Bareti']
  },
  {
    teamCode: 'kurtarma',
    teamName: 'Arama, Kurtarma ve Tahliye Ekibi',
    minimumStaffRatio: 'Her 50 çalışanda/blokta en az 1 kişi',
    requiredCertification: 'Arama-Kurtarma ve Bina Tahliye Bilinci Eğitimi',
    primaryDutiesInSite: [
      'Deprem veya yangın anında bina sakinlerinin paniksiz tahliyesini sağlamak',
      'Engelli, yaşlı ve çocuklu ailelerin güvenli şekilde tahliyesine eşlik etmek',
      'Asansörde mahsur kalan kişilerin acil kurtarma prosedürünü işletmek'
    ],
    mandatoryEquipment: ['Acil Durum Sedyesi', 'Megafon ve Düdük', 'Kırıcı-Delici Manivela', 'Yüksek Güçlü Projektör Fener']
  },
  {
    teamCode: 'koruma',
    teamName: 'Koruma ve Güvenlik Ekibi',
    minimumStaffRatio: 'Her 50 çalışanda/blokta en az 1 kişi',
    requiredCertification: 'Afet Güvenliği ve Kalabalık Yönetimi Eğitimi',
    primaryDutiesInSite: [
      'Acil durum toplanma alanının emniyetini ve düzenini sağlamak',
      'Tahliye edilen binalara yağma ve yetkisiz girişleri engellemek',
      'Ambulans ve itfaiye araçlarının site giriş kapısına rahat yanaşmasını sağlamak'
    ],
    mandatoryEquipment: ['Emniyet İkaz Şeridi', 'Telsiz Haberleşme Cihazı', 'Reflektörlü Yelek', 'Giriş Kontrol Listesi']
  },
  {
    teamCode: 'ilkyardim',
    teamName: 'Sertifikalı İlk Yardım Ekibi',
    minimumStaffRatio: 'Az Tehlikeli işyerlerinde her 20 çalışan için 1 kişi',
    requiredCertification: 'T.C. Sağlık Bakanlığı Onaylı Geçerli İlkyardımcı Sertifikası (16 Saat)',
    primaryDutiesInSite: [
      '112 Acil Yardım gelene kadar solunum durması, kanama, yanık ve kırıklara müdahale',
      'Site genelinde bulunan Otomatik Eksternal Defibrilatör (OED/AED) cihazını kullanmak',
      'Yaralıların durumunu kayıt altına alarak sağlık ekiplerine teslim etmek'
    ],
    mandatoryEquipment: ['Sağlık Bakanlığı Standart İlkyardım Çantası', 'OED Cihazı', 'Boyunluk', 'Yanık Örtüsü']
  }
];

/**
 * Sitelerde İSG İhlallerinde Yöneticinin Şahsi Cezai ve İdari Sorumluluğu
 */
export const OHS_ADMINISTRATIVE_PENALTIES: OhsAdministrativePenalty[] = [
  {
    violationDescription: 'İSG Risk Değerlendirme Raporunun Hiç Yapılmaması veya Süresinde Yenilenmemesi',
    kanunArticleRef: '6331 Sayılı Kanun Madde 10 / 26-1-ç',
    penaltySeverityLevel: 'İdari Para Cezası',
    penaltyAmountRange: 'İlk ay için 30.000 TL+, takip eden her ay için katlanarak artan ceza',
    managementPersonalLiability: 'İSG cezaları apartman bütçesinden ödense dahi kat malikleri genel kurulda yöneticiye şahsen rücu davası açabilir.'
  },
  {
    violationDescription: 'İşyerinde İş Sağlığı ve Güvenliği Hizmeti (Uzman / Hekim) Alınmaması',
    kanunArticleRef: '6331 Sayılı Kanun Madde 6 / 26-1-a',
    penaltySeverityLevel: 'İdari Para Cezası',
    penaltyAmountRange: 'Uzman ve hekim görevlendirilmeyen her ay için kişi başı 25.000 TL+',
    managementPersonalLiability: 'Çalışma Bakanlığı müfettişlerince resen kesilir; yönetici ihmali ağır kusur sayılır.'
  },
  {
    violationDescription: 'Ölümlü veya Ağır Yaralanmalı İş Kazası (Örn: Çatıdan Düşme, Elektrik Çarpması, Asansör Kazası)',
    kanunArticleRef: 'Türk Ceza Kanunu (TCK) Madde 85/2 (Taksirle Ölüme Neden Olma)',
    penaltySeverityLevel: 'Hapis / Adli Sorumluluk',
    penaltyAmountRange: '2 yıldan 15 yıla kadar hapis cezası + Yüz binlerce TL SGK Rücu Tazminatı',
    managementPersonalLiability: 'SGK iş kazasında ödediği tüm tedavi ve maluliyet maaşlarını İSG tedbirlerini almayan YÖNETİCİNİN ŞAHSİ MALVARLIĞINDAN tahsil eder.'
  }
];

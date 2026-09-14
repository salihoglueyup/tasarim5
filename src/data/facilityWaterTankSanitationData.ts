/**
 * Bina ve Sitelerde Su Deposu Temizliği, Lejyonella Kontrolü ve Dezenfeksiyon Yönetmeliği Veri Modeli
 * 
 * Kaynak Mevzuat:
 * - T.C. Sağlık Bakanlığı: "Su Depoları Temizliği ve Dezenfeksiyonu Hakkında Genelge" (Sayı: 2007/67)
 * - İnsani Tüketim Amaçlı Sular Hakkında Yönetmelik (Resmi Gazete: 17.02.2005 / Sayı: 25730)
 * - T.C. Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü Lejyoner Hastalığı Kontrol Usul ve Esasları Yönetmeliği
 * - TSE 1258: "Temiz Su Tesisatı ve Depolama Kuralları"
 */

export interface WaterTankTypeStandard {
  tankType: string;
  materialSpecification: string;
  hygieneRiskLevel: 'Yüksek Risk (Yosunlaşma/Korozyon)' | 'Orta Risk' | 'Düşük Risk (Tam Hijyenik)';
  recommendedCleaningFrequency: string;
  structuralVulnerabilities: string;
  replacementOrRetrofitAdvice: string;
}

export interface WaterTankSanitationStep {
  stepNo: number;
  stageTitle: string;
  technicalProcedure: string;
  disinfectantOrTool: string;
  safetyPrecautions: string;
  officialRecordType: string;
}

export interface LegionellaControlProtocol {
  riskZone: string;
  hazardMechanism: string;
  optimalBacterialGrowthTemp: string;
  thermalDisinfectionMethod: string;
  chemicalDisinfectionStandard: string;
  aloYonetimGuarantee: string;
}

export interface WaterLabInspectionParameter {
  parameterCode: string;
  parameterName: string;
  legalLimit: string;
  healthRiskIfContaminated: string;
  inspectionFrequency: string;
}

/**
 * Sitelerde Bulunan Su Deposu Tipleri ve Hijyen Kriterleri
 */
export const WATER_TANK_TYPE_STANDARDS: WaterTankTypeStandard[] = [
  {
    tankType: 'Betonarme Fayans / Epoksi Kaplamalı Depolar',
    materialSpecification: 'Betonarme karkas üzeri su yalıtımlı fayans veya gıdaya uygun epoksi kaplama',
    hygieneRiskLevel: 'Yüksek Risk (Yosunlaşma/Korozyon)',
    recommendedCleaningFrequency: 'Yılda en az 2 kez (6 ayda bir zorunlu)',
    structuralVulnerabilities: 'Derz dolguları zamanla eriyerek aralarında biyolojik balçık ve koliform bakterisi yuvalanır; kılcal çatlaklardan yeraltı suyu sızabilir.',
    replacementOrRetrofitAdvice: 'Fayans derzleri sökülerek Sağlık Bakanlığı içme suyu sertifikalı antibakteriyel epoksi ile kaplanmalı veya paslanmaz modüler depoya dönüştürülmelidir.'
  },
  {
    tankType: 'Paslanmaz Çelik Prizmatik Modüler Depolar (AISI 304 / 316)',
    materialSpecification: 'Gıda normunda paslanmaz çelik modüler paneller, EPDM contalı montaj',
    hygieneRiskLevel: 'Düşük Risk (Tam Hijyenik)',
    recommendedCleaningFrequency: 'Yılda 1 kez periyodik mekanik yıkama ve klorlama',
    structuralVulnerabilities: 'Işık geçirmez ve pürüzsüz iç yüzeyi sayesinde yosun ve bakteri tutmaz; yalnızca şebekeden gelen kum ve tortu dipte birikir.',
    replacementOrRetrofitAdvice: 'Tüm yeni nesil siteler ve rezidanslar için Sağlık Bakanlığı ve TSE tarafından tavsiye edilen altın standart depo tipidir.'
  },
  {
    tankType: 'Galvaniz ve Sac Su Depoları (Eski Tip)',
    materialSpecification: 'Sıcak daldırma galvaniz sac veya kaynaklı siyah sac',
    hygieneRiskLevel: 'Yüksek Risk (Yosunlaşma/Korozyon)',
    recommendedCleaningFrequency: 'Yılda en az 3-4 kez acil pas kazıma ve filtre kontrolü',
    structuralVulnerabilities: 'Zamanla galvaniz tabakası aşınır; yoğun pas, korozyon ve ağır metal salınımı musluk suyuna karışır.',
    replacementOrRetrofitAdvice: 'Kesinlikle kullanımdan kaldırılmalı; insan sağlığına zararlı pas ürettiği için derhal paslanmaz modüler sistemle yenilenmelidir.'
  },
  {
    tankType: 'Polietilen / Fiberglas Plastik Depolar',
    materialSpecification: 'UV katkılı lineer polietilen (LLDPE) monoblok gövde',
    hygieneRiskLevel: 'Orta Risk',
    recommendedCleaningFrequency: 'Yılda 2 kez kimyasal dezenfeksiyon',
    structuralVulnerabilities: 'Işık alan bodrum veya çatı katlarında yosunlaşma yapar; temizlik sırasında sert tel fırçalar iç yüzeyi çizerse mikrop tutunur.',
    replacementOrRetrofitAdvice: 'Işık geçirmeyen mavi veya siyah çok katmanlı modeller tercih edilmeli; basınçlı yıkayıcıda yumuşak süngerler kullanılmalıdır.'
  }
];

/**
 * Sağlık Bakanlığı 2007/67 Genelgesi Kapsamında 4 Aşamalı Depo Dezenfeksiyon Protokolü
 */
export const WATER_TANK_SANITATION_STEPS: WaterTankSanitationStep[] = [
  {
    stepNo: 1,
    stageTitle: 'Depo Suyunun Tahliyesi & Dip Çamurunun Vakumlanması',
    technicalProcedure: 'Depodaki mevcut su hidrofor alt seviyesine kadar tükettirilir veya dip blöf vanasından tahliye edilir. Dipte biriken pas, mil ve çamur dalgıç pompa ve endüstriyel ıslak vakumla dışarı atılır.',
    disinfectantOrTool: 'Ağır Hizmet Dalgıç Pompa, Endüstriyel Sıvı Vakum Makinesi',
    safetyPrecautions: 'Depoya giren personelin 12V alçak gerilim aydınlatması ve temiz çizme kullanması zorunludur.',
    officialRecordType: 'Depo Ön Keşif ve Tahliye Formu'
  },
  {
    stepNo: 2,
    stageTitle: '150 Bar Basınçlı Sıcak Su ile Biyofilm Kazıma',
    technicalProcedure: 'Deponun tavan, duvar ve zemin yüzeylerine yapışan kireç, biyolojik film tabakası ve yosunlar yüksek basınçlı sıcak su jeti ile fırçalanarak tamamen sökülür.',
    disinfectantOrTool: '150 Bar Yüksek Basınçlı Sıcak Su Yıkama Makinesi',
    safetyPrecautions: 'Kapalı alanda egzoz dumanı oluşmaması için elektrik motorlu basınç pompaları tercih edilir.',
    officialRecordType: 'Mekanik Temizlik Tutanağı'
  },
  {
    stepNo: 3,
    stageTitle: 'Sağlık Bakanlığı Onaylı Klor ile ULV Sisleme & Ovma',
    technicalProcedure: 'Gıda kodeksine ve içme suyu yönetmeliğine uygun sodyum hipoklorit solüsyonu ile tüm yüzeyler ULV sisleme cihazıyla ilaçlanır veya püskürtülerek 30 dakika bekletilir.',
    disinfectantOrTool: 'Sağlık Bakanlığı Ruhsatlı Sıvı Klor (%12-15 NaOCl) & ULV Cihazı',
    safetyPrecautions: 'Personel tam yüz gaz maskesi (Cl2 klor filtreli) ve kimyasal tulum giymek zorundadır.',
    officialRecordType: 'Biyosidal Dezenfeksiyon Belgesi'
  },
  {
    stepNo: 4,
    stageTitle: 'Basınçlı Durulama, Nötralizasyon ve Şebeke Dolumu',
    technicalProcedure: 'Dezenfektan artığı kalmaması için yüzeyler bol temiz basınçlı suyla durulanır ve tahliye edilir. Depoya taze şebeke suyu alınarak serbest klor oranı 0.2 - 0.5 ppm seviyesine ayarlanır.',
    disinfectantOrTool: 'Fotometrik Klor Ölçüm Kiti & DPD-1 Reaktifi',
    safetyPrecautions: 'Su şebekeye verilmeden önce koku, renk ve klor seviyesi doğrulanır.',
    officialRecordType: 'Resmi Su Deposu Dezenfeksiyon ve Teslim Tutanağı'
  }
];

/**
 * Tesis Sıcak Su ve Havalandırma Hatlarında Lejyonella (Legionella Pneumophila) Önleme
 */
export const LEGIONELLA_SAFETY_PROTOCOLS: LegionellaControlProtocol[] = [
  {
    riskZone: 'Boyler Sıcak Su Kazanları ve Sirkülasyon Hatları',
    hazardMechanism: '20°C - 45°C arasındaki ılık ve durgun sularda Lejyonella bakterisi üreyerek duş başlıklarından aerosol (zerrecik) halinde akciğerlere çekilir.',
    optimalBacterialGrowthTemp: '32°C - 42°C (Optimum Üreme Aralığı)',
    thermalDisinfectionMethod: 'Boyler su sıcaklığı haftada bir kez gece saatlerinde en az 60°C - 70°C\'ye çıkarılarak sirkülasyon hattı termal şoklama ile bakteriden arındırılır.',
    chemicalDisinfectionStandard: 'Klordioksit (ClO2) veya periyodik hiperklorlama (10-20 ppm şoklama).',
    aloYonetimGuarantee: 'Merkezi ısıtma otomasyonumuz haftalık otomatik termal Lejyonella pastörizasyon döngüsünü yönetir.'
  },
  {
    riskZone: 'Soğutma Kuleleri (Chiller Evaporatif Kuleler)',
    hazardMechanism: 'Açık kulelerde hava ile temas eden su zerrecikleri rüzgarla kilometrelerce uzağa yayılarak site sakinlerinde lejyoner pnömonisi salgınına yol açabilir.',
    optimalBacterialGrowthTemp: '25°C - 40°C',
    thermalDisinfectionMethod: 'Kule havuzunun boşaltılıp mekanik olarak kireç ve biyolojik çamurdan temizlenmesi.',
    chemicalDisinfectionStandard: 'Sürekli biyosit ve korozyon önleyici dozajı, damla tutucu (drift eliminator) filtre denetimi.',
    aloYonetimGuarantee: 'Soğutma kuleleri her sezon öncesi akredite lab numuneleriyle taranır.'
  }
];

/**
 * Akredite Laboratuvar Su Analiz Kriterleri (Halk Sağlığı)
 */
export const WATER_LAB_INSPECTION_CRITERIA: WaterLabInspectionParameter[] = [
  {
    parameterCode: 'param-ecoli',
    parameterName: 'Escherichia coli (E. coli)',
    legalLimit: '0 / 100 ml (Sıfır Tolerans)',
    healthRiskIfContaminated: 'Fekal (kanalizasyon) kirlenme göstergesidir; kanlı ishal ve ağır böbrek yetmezliği riski.',
    inspectionFrequency: 'Her temizlik sonrası & 6 ayda bir'
  },
  {
    parameterCode: 'param-koliform',
    parameterName: 'Toplam Koliform Bakteri',
    legalLimit: '0 / 100 ml',
    healthRiskIfContaminated: 'Genel su arıtma ve hijyen yetersizliğini gösterir; mide ve bağırsak enfeksiyonları.',
    inspectionFrequency: 'Her temizlik sonrası & 6 ayda bir'
  },
  {
    parameterCode: 'param-serbest-klor',
    parameterName: 'Uç Nokta Serbest Klor Seviyesi',
    legalLimit: '0.2 - 0.5 mg/L (ppm)',
    healthRiskIfContaminated: '< 0.2 ppm ise boru hattında bakteri ürer; > 0.5 ppm ise içim kalitesini bozar ve koku yapar.',
    inspectionFrequency: 'Haftalık düzenli takip'
  },
  {
    parameterCode: 'param-turbidite',
    parameterName: 'Bulanıklık ve Demir/Mangan Oranı',
    legalLimit: '< 1 NTU / Fe < 0.2 mg/L',
    healthRiskIfContaminated: 'Paslı boru veya kuyu suyu karışımı belirtisidir; su filtrelerini tıkar.',
    inspectionFrequency: 'Yıllık genel kimyasal analiz'
  }
];

/**
 * Yüzme Havuzları Sağlık Esasları, Kimyasal Dezenfeksiyon ve Yönetmelik Uyumluluğu Veri Modeli
 * 
 * Kaynak Mevzuat:
 * - T.C. Sağlık Bakanlığı: "Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik" (Resmi Gazete: 06.03.2011 / Sayı: 27866)
 * - TSE 11899: "Yüzme Havuzu Suyunun Hazırlanması, Tasarımı, Güvenliği ve İşletilmesi"
 * - T.C. Halk Sağlığı Genel Müdürlüğü Çevre Sağlığı Dairesi Su Analiz Standartları
 */

export interface PoolWaterParameter {
  id: string;
  parameterName: string;
  idealRange: string;
  unit: string;
  scope: 'Açık Havuz' | 'Kapalı Havuz' | 'Her İkisi' | 'Çocuk Havuzu';
  testFrequency: 'Günde 3 Kez' | 'Günlük' | 'Haftalık' | 'Aylık Akredite Lab';
  criticalRiskDescription: string;
  healthRiskIfDeviated: string;
  correctiveAction: string;
}

export interface PoolLegalRegulationRule {
  id: string;
  articleRef: string;
  title: string;
  requirement: string;
  legalLiability: string;
  penalSanction: string;
  aloYonetimGuarantee: string;
}

export interface PoolHygieneProtocolStep {
  stepNumber: number;
  title: string;
  operatorRole: string;
  frequency: string;
  details: string;
  recordDocument: string;
}

export interface PoolChemicalDosingRule {
  chemicalName: string;
  chemicalFormulaOrType: string;
  purpose: string;
  storageRequirement: string;
  dosingMethod: string;
  safetyWarning: string;
}

/**
 * Sağlık Bakanlığı Yönetmeliği Havuz Kimyasal ve Fiziksel Parametre Değerleri Tablosu
 */
export const POOL_WATER_PARAMETERS: PoolWaterParameter[] = [
  {
    id: 'param-serbest-klor-acik',
    parameterName: 'Serbest Klor (Açık Yüzme Havuzları)',
    idealRange: '1.0 - 3.0',
    unit: 'mg/L (ppm)',
    scope: 'Açık Havuz',
    testFrequency: 'Günde 3 Kez',
    criticalRiskDescription: 'UV güneş ışınları kloru parçalar; stabilizatörsüz havuzlarda bakteri hızla ürer.',
    healthRiskIfDeviated: '< 1.0 mg/L ise E. coli ve lejyonella riski; > 3.0 mg/L ise cilt ve göz tahrişi oluşur.',
    correctiveAction: 'Otomatik fotometrik dozajlama pompası ile klor seviyesi 1.5 - 2.0 ppm aralığına getirilir.'
  },
  {
    id: 'param-serbest-klor-kapali',
    parameterName: 'Serbest Klor (Kapalı Yüzme Havuzları)',
    idealRange: '1.0 - 1.5',
    unit: 'mg/L (ppm)',
    scope: 'Kapalı Havuz',
    testFrequency: 'Günde 3 Kez',
    criticalRiskDescription: 'Kapalı mekan hava hacminde klor gazı birikmesi ve trikloramin oluşumu.',
    healthRiskIfDeviated: '> 1.5 mg/L ise solunum yolu tahrişi, astım tetiklenmesi ve yoğun kimyasal koku.',
    correctiveAction: 'Havalandırma santrali hava debisi artırılır ve UV / ozon dezenfeksiyonu desteklenir.'
  },
  {
    id: 'param-bagli-klor',
    parameterName: 'Bağlı Klor (Kloraminler)',
    idealRange: 'Maks. 0.2',
    unit: 'mg/L (ppm)',
    scope: 'Her İkisi',
    testFrequency: 'Günlük',
    criticalRiskDescription: 'Klorun ter, üre ve organik kirleticilerle birleşmesi sonucu oluşan zararlı bileşik.',
    healthRiskIfDeviated: 'Göz yanması, havuz kokusu ve klor alerjisinin %90 sebebi bağlı klordur.',
    correctiveAction: 'Ters yıkama yapılır, taze su takviyesi sağlanır ve breakpoint (şok klorlama) uygulanır.'
  },
  {
    id: 'param-ph',
    parameterName: 'pH Değeri (Asitlik / Bazlık Dengesi)',
    idealRange: '6.5 - 7.8 (İdeal: 7.2 - 7.4)',
    unit: 'pH',
    scope: 'Her İkisi',
    testFrequency: 'Günde 3 Kez',
    criticalRiskDescription: 'Klorun dezenfeksiyon gücü pH 7.2\'de %65 iken, pH 8.0\'de %20\'ye düşer.',
    healthRiskIfDeviated: 'pH < 6.5 ise tesisat korozyonu ve göz yanması; pH > 7.8 ise kireçlenme ve bulanıklık.',
    correctiveAction: 'Sıvı sodyum bisülfat veya hidroklorik asit dozaj ünitesiyle pH 7.2\'ye ayarlanır.'
  },
  {
    id: 'param-siyanurik-asit',
    parameterName: 'Siyanürik Asit (Klor Stabilizatörü)',
    idealRange: '20 - 50 (Maks. 100)',
    unit: 'mg/L (ppm)',
    scope: 'Açık Havuz',
    testFrequency: 'Haftalık',
    criticalRiskDescription: '100 ppm aşıldığında "Klor Kilitlenmesi" (Chlorine Lock) gerçekleşir; klor dezenfekte etmez.',
    healthRiskIfDeviated: 'Havuzda 3 ppm klor görünmesine rağmen mikrop ve yosunlar hızla çoğalır.',
    correctiveAction: 'Siyanürik asit kimyasal ile düşürülemez; havuz suyunun %30-50\'si tahliye edilip taze su doldurulur.'
  },
  {
    id: 'param-toplam-alkalinite',
    parameterName: 'Toplam Alkalinite (TA)',
    idealRange: '80 - 120',
    unit: 'mg/L CaCO3',
    scope: 'Her İkisi',
    testFrequency: 'Haftalık',
    criticalRiskDescription: 'Suyun pH dalgalanmalarına karşı tamponlama (buffer) kapasitesidir.',
    healthRiskIfDeviated: '< 80 ise ani pH sıçramaları yaşanır; > 120 ise pH düşürmek imkansızlaşır.',
    correctiveAction: 'Alkalinite artırıcı (sodyum bikarbonat) veya asit dozu ile dengeye getirilir.'
  },
  {
    id: 'param-mikrobiyolojik-ecoli',
    parameterName: 'Mikrobiyolojik Analiz (E. Coli & Koliform & Pseudomonas)',
    idealRange: '0 (Sıfır)',
    unit: 'kob / 100 ml',
    scope: 'Her İkisi',
    testFrequency: 'Aylık Akredite Lab',
    criticalRiskDescription: 'Fekal kontaminasyon ve kulak-deri enfeksiyonu yapan patojenlerin varlığı.',
    healthRiskIfDeviated: 'Gastroenterit, kulak iltihabı, lejyoner hastalığı ve salgın riski.',
    correctiveAction: 'Havuz derhal kullanıma kapatılır, Sağlık İl Müdürlüğü bilgilendirilir ve şok klorlama yapılır.'
  },
  {
    id: 'param-su-sicakligi',
    parameterName: 'Havuz Suyu Sıcaklığı',
    idealRange: '26 - 28 (Çocuk Havuzu: 28 - 30)',
    unit: '°C',
    scope: 'Her İkisi',
    testFrequency: 'Günlük',
    criticalRiskDescription: '30°C üzeri su sıcaklıklarında bakteri üreme hızı 3 katına çıkar ve klor uçuculuğu artar.',
    healthRiskIfDeviated: 'Termal konforsuzluk, kramp riski ve hızlı kimyasal tüketimi.',
    correctiveAction: 'Isı eşanjörü termostat ayarları ve otomasyon panosu kalibre edilir.'
  }
];

/**
 * Sağlık Bakanlığı Yönetmeliği Hukuki Şartlar & Yaptırımlar
 */
export const POOL_REGULATION_RULES: PoolLegalRegulationRule[] = [
  {
    id: 'rule-havuz-isletme-defteri',
    articleRef: 'Yönetmelik Madde 8 & Ek-3',
    title: 'Resmi Havuz İşletme ve Kimya Defteri Tutulması',
    requirement: 'Her gün yapılan klor, pH, sıcaklık ve berraklık ölçümlerinin tarih ve saat belirtilerek havuz defterine işlenmesi ve havuz kenarındaki panoda ilan edilmesi mecburidir.',
    legalLiability: 'Site yöneticisi ve havuz operatörü tutulmayan her gün için müştereken hukuken sorumludur.',
    penalSanction: 'İl Sağlık Müdürlüğü denetimlerinde defteri eksik havuzlara idari para cezası ve 15 gün kapatma.',
    aloYonetimGuarantee: 'Alo Yönetim mobil platformu ve dijital tablet entegrasyonuyla ölçümler anlık sisteme kaydedilir ve fiziksel defter onaylanır.'
  },
  {
    id: 'rule-operator-sertifikasi',
    articleRef: 'Yönetmelik Madde 7',
    title: 'Sertifikalı Havuz Suyu Operatörü Bulundurma',
    requirement: 'Havuzun kimyasal ve fiziksel bakımından sorumlu personelin MEB veya TSSF onaylı geçerli "Havuz Suyu Operatörlüğü Belgesi"ne sahip olması zorunludur.',
    legalLiability: 'Ehliyetsiz personelin kimyasal karıştırması sonucu oluşacak zehirlenmelerde TCK kapsamında taksirle yaralama davası açılır.',
    penalSanction: 'Yetkisiz personel çalıştıran yönetimlere idari para cezası kesilir.',
    aloYonetimGuarantee: 'Tüm havuz teknik ekibimiz akredite sertifikalı ve periyodik İSG/kimyasal güvenlik eğitimlerinden geçirilmiştir.'
  },
  {
    id: 'rule-akredite-lab-analizi',
    articleRef: 'Yönetmelik Madde 10 & Ek-1/Ek-2',
    title: 'Aylık Akredite Laboratuvar Su Tahlili',
    requirement: 'Halk Sağlığı Genel Müdürlüğü yetkili laboratuvarlarınca her ay havuzdan kimyasal ve mikrobiyolojik numune alınarak tahlil raporu düzenlenmelidir.',
    legalLiability: 'Tahlil yaptırılmaması halinde olası salgın hastalıklarda kat malikleri kurulu ve yönetici doğrudan tazminatla karşı karşıya kalır.',
    penalSanction: 'Sonuçları yönetmelik sınırını aşan havuzlar İlçe Sağlık Müdürlüğü tarafından mühürlenerek kapatılır.',
    aloYonetimGuarantee: 'Anlaşmalı TÜRKAK akredite laboratuvarlar her ayın ilk haftası numune alır; raporlar dijital arşivimizde saklanır.'
  },
  {
    id: 'rule-guvenlik-can-kurtaran',
    articleRef: 'Yönetmelik Madde 6 & TSSF Talimatı',
    title: 'Cankurtaran, Derinlik Tabelaları ve Can Simitleri',
    requirement: 'Derinliği 1.50 metreyi geçen havuzlarda derinlik uyarıları, acil yardım butonları, can simitleri ve toplu kullanım yoğunluğuna göre cankurtaran bulundurulmalıdır.',
    legalLiability: 'Olası boğulma vakalarında uyarı levhası veya cankurtaran eksikliği yöneticinin ağır kusuru sayılır.',
    penalSanction: 'Gerekli emniyet tedbirleri alınmayan sitelerde havuz faaliyetten men edilir.',
    aloYonetimGuarantee: 'Derinlik çizgileri, kaymaz paspaslar, flokajlı can simitleri ve ilk yardım kitleri tam standartta temin edilir.'
  }
];

/**
 * 4 Aşamalı Profesyonel Havuz Sanitasyon ve Bakım Protokolü
 */
export const POOL_HYGIENE_STEPS: PoolHygieneProtocolStep[] = [
  {
    stepNumber: 1,
    title: 'Sabah Açılış Öncesi Fotometrik Analiz & Dozaj Kontrolü',
    operatorRole: 'Sertifikalı Havuz Operatörü',
    frequency: 'Her sabah 07:00',
    details: 'Dijital fotometre ile havuzun 4 farklı noktasından serbest klor, bağlı klor ve pH ölçülür; kimyasal dozaj tankları ve emiş filtreleri kontrol edilir.',
    recordDocument: 'Günlük Havuz Kimya Defteri & Dijital Pano'
  },
  {
    stepNumber: 2,
    title: 'Savak Kanalları, Izgaralar ve Denge Tankı Dezenfeksiyonu',
    operatorRole: 'Havuz Hijyen Teknisyeni',
    frequency: 'Her sabah & Akşam',
    details: 'Denge tankı seviyesi kontrol edilir; savak ızgaralarında biriken saç, yaprak ve organik kirleticiler temizlenir; denge deposu dip tortusu tahliye edilir.',
    recordDocument: 'Havuz Mekanik Bakım Formu'
  },
  {
    stepNumber: 3,
    title: 'Kuvars Kum Filtresi Ters Yıkama (Backwash) & Durulama',
    operatorRole: 'Mekanik Tesisat Operatörü',
    frequency: 'Haftada 2-3 Kez (Manometre farkında)',
    details: 'Kum filtresi giriş-çıkış manometre basınç farkı 0.5 barı aştığında 3-5 dakika ters yıkama, ardından 1 dakika durulama yapılarak filtre kumu arındırılır.',
    recordDocument: 'Filtrasyon Verim Kayıt Çizelgesi'
  },
  {
    stepNumber: 4,
    title: 'Dip Süpürme (Otomatik Robot / Manuel Vakum) & Çöktürme',
    operatorRole: 'Havuz Bakım Ekibi',
    frequency: 'Günlük Kapanış Sonrası (22:00)',
    details: 'Havuz dip çöktürücü (polialüminyum klorür) uygulandıktan sonra çöken tortular havuz robotu veya emiş vakumuyla doğrudan drenaja gönderilir.',
    recordDocument: 'Gece Bakım ve Şoklama Raporu'
  }
];

/**
 * Kimyasal Depolama & Güvenlik İlkeleri (İSG & Sağlık Bakanlığı)
 */
export const POOL_CHEMICAL_DOSING_RULES: PoolChemicalDosingRule[] = [
  {
    chemicalName: 'Sıvı Sodyum Hipoklorit (Sıvı Klor)',
    chemicalFormulaOrType: 'NaOCl (%12-15 Aktif Klor)',
    purpose: 'Bakteri, virüs ve algleri yok eden temel dezenfektan.',
    storageRequirement: 'Güneş görmeyen, 25°C altı serin havalandırmalı alanda asitlerden kesinlikle ayrı muhafaza edilir.',
    dosingMethod: 'Otomatik dozaj pompasıyla filtrasyon basma hattına enjekte edilir.',
    safetyWarning: 'ASLA asitle (pH düşürücü) karıştırılmamalıdır! Karışması halinde ölümcül klor gazı (Cl2) açığa çıkar.'
  },
  {
    chemicalName: 'Sıvı pH Düşürücü (Sülfürik Asit / Hidroklorik Asit)',
    chemicalFormulaOrType: 'H2SO4 (%35-40)',
    purpose: 'Havuz suyu alkalinitesini ve pH değerini 7.2 - 7.6 aralığına çekmek.',
    storageRequirement: 'Klor bidonlarından en az 3 metre uzakta, asit tutma havuzunda (dökülme tavası) depolanır.',
    dosingMethod: 'pH sensörünün komutuyla mikro dozajlama sistemiyle otomatik verilir.',
    safetyWarning: 'Seyreltilirken daima suyun üzerine asit dökülür; asla asidin üzerine su dökülmez (patlama reaksiyonu).'
  },
  {
    chemicalName: 'Yosun Önleyici (Algisit - Kuaterner Amonyum)',
    chemicalFormulaOrType: 'Polikuaterner Bileşikler',
    purpose: 'Havuz duvarlarında ve derz aralarında yosun sporlarının tutunmasını engellemek.',
    storageRequirement: 'Orijinal ambalajında, nemsiz kuru oda koşullarında.',
    dosingMethod: 'Haftada bir kez havuz yüzeyine nozulların önünden homojen şekilde dökülür.',
    safetyWarning: 'Aşırı doz köpürmeye sebep olur; köpüksüz formülasyon tercih edilmelidir.'
  },
  {
    chemicalName: 'Çöktürücü & Parlatıcı (Flokülan)',
    chemicalFormulaOrType: 'Polialüminyum Klorür (PAC)',
    purpose: 'Filtre kumunun tutamadığı mikronluk süspansiyon partiküllerini birleştirip çöktürmek.',
    storageRequirement: 'Donma noktasından uzak, kuru kimyasal depolama rafı.',
    dosingMethod: 'Ters yıkama sonrasında denge tankına veya savak kanalına seyreltilerek verilir.',
    safetyWarning: 'Kum filtresini tıkamaması için dozaj talimatına harfiyen uyulmalı ve ters yıkama aksatılmamalıdır.'
  }
];

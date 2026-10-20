/**
 * Kat Mülkiyeti Kanunu Madde 37 Kapsamında İşletme Projesi Tanzimi, Tebliği ve İtiraz Usulü Veri Modeli
 * 
 * Kaynak Mevzuat:
 * - 634 Sayılı Kat Mülkiyeti Kanunu Madde 37 (İşletme Projesinin Yapılması)
 * - 634 Sayılı Kat Mülkiyeti Kanunu Madde 20 (Genel Giderlere Katılma)
 * - 634 Sayılı Kat Mülkiyeti Kanunu Madde 35 (Yöneticinin Görevleri)
 * - 2004 Sayılı İcra ve İflas Kanunu Madde 68 (İtirazın Kesin Kaldırılması - Belge Niteliği)
 */

export interface BudgetItemDefinition {
  id: string;
  category: 'personel' | 'enerji_altyapi' | 'periyodik_bakim' | 'yonetim_guvenlik' | 'yatirim_avans';
  categoryTitle: string;
  expenseName: string;
  kmkDistributionBasis: 'Eşit Paylaşım (m.20/1-a)' | 'Arsa Payı Oranında (m.20/1-b)' | 'Yönetim Planı Hükmü';
  expenseDescription: string;
  calculationRationale: string;
  budgetingPitfall: string;
}

export interface BudgetExpenseDistributionRule {
  ruleCode: string;
  title: string;
  kmkArticleRef: string;
  distributionMethod: string;
  coveredExpenseTypes: string[];
  exemptionsOrSpecialCases: string;
}

export interface OperatingBudgetNotificationStep {
  stepNo: number;
  phaseName: string;
  timeframe: string;
  legalProcedure: string;
  validNotificationMethods: string[];
  legalConsequence: string;
  aloYonetimStandard: string;
}

export interface BudgetLegalPrecedent {
  caseTitle: string;
  courtAndEmsalNo: string;
  summaryDispute: string;
  courtVerdict: string;
  managementShieldAdvice: string;
}

/**
 * 1 Yıllık Tahmini İşletme Projesi Gider Kalemleri ve Dağıtım Esasları
 */
export const BUDGET_ESTIMATED_EXPENSES: BudgetItemDefinition[] = [
  {
    id: 'exp-personel-kapici-guvenlik',
    category: 'personel',
    categoryTitle: 'Personel ve İşgücü Giderleri',
    expenseName: 'Kapıcı, Kaloriferci, Bahçıvan ve Bekçi / Özel Güvenlik Ücretleri',
    kmkDistributionBasis: 'Eşit Paylaşım (m.20/1-a)',
    expenseDescription: 'Site bünyesinde veya taşeron olarak istihdam edilen tüm personelin net maaşları, SGK primleri ve vergileri.',
    calculationRationale: 'KMK m.20/1-a amir hükmü uyarınca, aksi yönetim planında kararlaştırılmadıkça BAĞIMSIZ BÖLÜM BAŞINA EŞİT paylaştırılır.',
    budgetingPitfall: 'Kıdem tazminatı fonunun yıllık bütçeye eklenmeyip toplu işten çıkarmada maliklerden ani avans istenmesi.'
  },
  {
    id: 'exp-ortak-elektrik-su',
    category: 'enerji_altyapi',
    categoryTitle: 'Ortak Enerji ve Altyapı Tüketimleri',
    expenseName: 'Ortak Alan Aydınlatması, Hidrofor Suyu ve Asansör Elektriği',
    kmkDistributionBasis: 'Arsa Payı Oranında (m.20/1-b)',
    expenseDescription: 'Blok koridorları, çevre aydınlatma, jeneratör yakıtı, yangın pompaları ve peyzaj otomatik sulama tüketimleri.',
    calculationRationale: 'Tüketim payölçerle ayrılamayan ortak tüketimler bağımsız bölümlerin tapudaki arsa payı oranına göre tahakkuk ettirilir.',
    budgetingPitfall: 'Kompanzasyon panosu arızası sebebiyle gelen reaktif ceza bedellerinin bütçede öngörülmemesi.'
  },
  {
    id: 'exp-asansor-yesil-etiket',
    category: 'periyodik_bakim',
    categoryTitle: 'Periyodik Teknik Bakım ve Muayeneler',
    expenseName: 'Asansör Aylık Bakımı ve A Tipi Akredite Yıllık Muayene Harcı',
    kmkDistributionBasis: 'Arsa Payı Oranında (m.20/1-b)',
    expenseDescription: 'Yetkili asansör firmasının aylık revizyon faturası ve belediye protokolü uyarınca TÜRKAK akredite kuruluşa ödenen yıllık yeşil etiket harcı.',
    calculationRationale: 'Asansör ortak tesisat ve ana gayrimenkulün ayrılmaz parçası olduğundan arsa payı nispetinde paylaştırılır.',
    budgetingPitfall: 'Zemin ve 1. kat maliklerinin "asansörü kullanmıyorum" itirazı hukuken geçersizdir; yönetim planında açık muafiyet yoksa ödemek zorundadırlar.'
  },
  {
    id: 'exp-yonetim-yazilim-muhasebe',
    category: 'yonetim_guvenlik',
    categoryTitle: 'İdari Yönetim ve Hukuki Danışmanlık',
    expenseName: 'Profesyonel Yönetim Hizmet Bedeli, Apsiyon Yazılımı & Noter Masrafları',
    kmkDistributionBasis: 'Eşit Paylaşım (m.20/1-a)',
    expenseDescription: 'Site yönetim sözleşmesi ücreti, resmi defter noter tasdikleri, tebligat giderleri ve bulut yönetim yazılımı lisansı.',
    calculationRationale: 'Yönetim planında aksine hüküm bulunmadıkça yönetim ve idari giderler eşit oranda bölüştürülür.',
    budgetingPitfall: 'İhtarname ve noter masraflarının bütçeye konulmaması sebebiyle icra masraflarının yöneticinin cebinden çıkması.'
  },
  {
    id: 'exp-demirbas-onarim-fonu',
    category: 'yatirim_avans',
    categoryTitle: 'Demirbaş Yatırım ve Onarım Avansı',
    expenseName: 'Çatı İzolasyonu, Dış Cephe Boyası ve Asansör Halat/Pano Yenilemesi',
    kmkDistributionBasis: 'Arsa Payı Oranında (m.20/1-b)',
    expenseDescription: 'Ana gayrimenkulün değerini koruyan ve ömrünü uzatan büyük ölçekli imalatlar için Kat Malikleri Kurulu kararıyla toplanan avans.',
    calculationRationale: 'Demirbaş yenilemeleri gayrimenkulün değer artışı sağladığı için mülk sahibine (kat malikine) ve arsa payına göre aittir; kiracıdan talep edilemez.',
    budgetingPitfall: 'İşletme bütçesi (aidat) ile yatırım avansı (demirbaş) hesaplarının birbirine karıştırılması.'
  }
];

/**
 * KMK Madde 20 Gider Dağıtım Matrisi
 */
export const EXPENSE_ALLOCATION_RULES: BudgetExpenseDistributionRule[] = [
  {
    ruleCode: 'kmk-20-1-a',
    title: 'Bağımsız Bölüm Başına Eşit Paylaştırılan Giderler',
    kmkArticleRef: 'KMK Madde 20/1-a',
    distributionMethod: 'Toplam Gider / Toplam Bağımsız Bölüm Sayısı',
    coveredExpenseTypes: [
      'Kapıcı, güvenlik ve bahçıvan aylık ücretleri',
      'Personel SGK primleri ve kıdem tazminatı karşılıkları',
      'Yönetim planında eşit olacağı belirtilen idari giderler'
    ],
    exemptionsOrSpecialCases: 'Bağımsız bölümün dükkan, daire veya depo olması ya da boş kalması eşit paylaşımı etkilemez.'
  },
  {
    ruleCode: 'kmk-20-1-b',
    title: 'Arsa Payı Oranında Paylaştırılan Genel Giderler',
    kmkArticleRef: 'KMK Madde 20/1-b',
    distributionMethod: 'Toplam Gider x (Dairenin Arsa Payı / Toplam Arsa Payı)',
    coveredExpenseTypes: [
      'Ortak alanların bakım, koruma, güçlendirme ve onarım giderleri',
      'Ortak sigorta primleri ve çatı/otopark izolasyon masrafları',
      'Yönetici aylığı ve genel idare giderleri (aksine hüküm yoksa)'
    ],
    exemptionsOrSpecialCases: 'Kat maliki ortak yeri kullanmadığını veya bağımsız bölümünden faydalanmadığını ileri sürerek bu gideri ödemekten kaçınamaz.'
  }
];

/**
 * İşletme Projesinin Tebliği ve Kesinleşme Süreci (KMK Madde 37)
 */
export const BUDGET_NOTIFICATION_TIMELINE: OperatingBudgetNotificationStep[] = [
  {
    stepNo: 1,
    phaseName: 'İşletme Projesinin Tanzimi ve Kat Malikleri Kurulu Onayı',
    timeframe: 'Olağan veya olağanüstü genel kurul toplantısında',
    legalProcedure: '7579 sayılı Kanun ile değişik KMK m.37 uyarınca yönetici, 1 yıllık tahmini gelir-giderleri ve bağımsız bölüm başı avansları gösteren işletme projesini hazırlar ve Kat Malikleri Kurulunun onayına sunar.',
    validNotificationMethods: ['Kat Malikleri Kurulu Gündemli Çağrısı ve Karar Tutanağı'],
    legalConsequence: 'Kurulda onaylanan işletme projesi doğrudan kesinleşir; onaylı proje yoksa yönetici geçici işletme projesi hazırlamak zorundadır.',
    aloYonetimStandard: 'Alo Yönetim finans ekibi geçmiş 3 yılın enflasyonist maliyet endekslerini analiz ederek sapmasız bütçe taslağı sunar.'
  },
  {
    stepNo: 2,
    phaseName: 'Geçici İşletme Projesi ve Yeniden Değerleme Oranı Tavanı (%25,49)',
    timeframe: 'Onaylı proje bulunmadığında gecikmeksizin',
    legalProcedure: 'Genel kurulda onaylanmış bir işletme projesi yoksa yönetici gecikmeksizin geçici bir proje yapar; mevcut proje varsa artış oranı yeniden değerleme oranını (2026 yılı için %25,49) aşamaz ve tüm kat maliklerine tebliğ edilir.',
    validNotificationMethods: [
      'İmzalı Teslim Tutanağı (Elden teslim)',
      'Noter Vasıtasıyla İhbar',
      'PTT İadeli Taahhütlü Mektup'
    ],
    legalConsequence: 'Yeniden değerleme oranını aşan tek taraflı yönetici zamları 7579 sayılı Kanun uyarınca geçersizdir; WhatsApp veya pano ilanı resmi tebligat yerine geçmez.',
    aloYonetimStandard: 'Alo Yönetim barkodlu PTT tebligat entegrasyonu ve dijital ıslak imzalı tutanak arşivleme sistemi kullanır.'
  },
  {
    stepNo: 3,
    phaseName: 'En Geç 3 Ay İçinde Kat Malikleri Kuruluna Onaylatma & 7 Gün Tebliğ',
    timeframe: 'Tebliğden itibaren 7 GÜN / Geçici projede en geç 3 AY içinde kurul onayı',
    legalProcedure: '7579 sayılı Kanun uyarınca geçici işletme projesi hazırlandıktan sonra kat maliklerine tebliğ edilir ve en geç 3 ay içinde Kat Malikleri Kurulu toplantıya çağrılarak nihai işletme projesi kurul onayına sunulur.',
    validNotificationMethods: ['KMK m.29 Çağrı Usulü ile Genel Kurul Onayı'],
    legalConsequence: 'Kat Malikleri Kurulunca onaylanarak kesinleşen işletme projesi ve kurul kararları İİK m.68/1 uyarınca İLAM NİTELİĞİNDE BELGE gücü kazanır.',
    aloYonetimStandard: 'Sistem 3 aylık yasal takvimi otomatik izler ve genel kurul onay tutanağını hukuki dosyaya ekler.'
  },
  {
    stepNo: 4,
    phaseName: 'Sulh Hukuk Mahkemesinde Hakimin Müdahalesi (KMK m.33)',
    timeframe: 'Kurul kararından itibaren 1 ay (her halde 6 ay) içinde',
    legalProcedure: 'Genel kurulda onaylanan işletme projesine muhalefet şerhi koyan kat maliki, bütçe kararının kanuna veya yönetim planına aykırı olduğu iddiasıyla Sulh Hukuk Mahkemesinde iptal davası açabilir.',
    validNotificationMethods: ['Sulh Hukuk Mahkemesi Dava Dilekçesi'],
    legalConsequence: 'Mahkemece tedbir kararı verilmedikçe kesinleşmiş işletme projesinin ve aidat tahsilatının yürütmesi durmaz.',
    aloYonetimStandard: 'İtiraz eden malikle masada şeffaf mali mutabakat yapılır; tüm genel kurul kararları Yargıtay içtihatlarına tam uyumlu düzenlenir.'
  }
];

/**
 * Yargıtay Hukuk Genel Kurulu ve 18. Hukuk Dairesi Emsal Kararları
 */
export const BUDGET_LEGAL_PRECEDENTS: BudgetLegalPrecedent[] = [
  {
    caseTitle: 'Tebliğ Edilmemiş İşletme Projesine Dayalı İcrada İtirazın Kaldırılamaması',
    courtAndEmsalNo: 'Yargıtay 18. Hukuk Dairesi, E. 2014/11234, K. 2014/15678',
    summaryDispute: 'Yönetici işletme projesini malike tebliğ etmeden doğrudan aidat icra takibi başlatmış; borçlunun itirazı üzerine icra hukuk mahkemesine başvurmuştur.',
    courtVerdict: 'Yargıtay, kat malikine usulüne uygun tebliğ edilerek kesinleşmemiş bir işletme projesinin İcra İflas Kanunu 68. maddesinde belirtilen belgelerden sayılamayacağına ve itirazın kaldırılması talebinin reddine hükmetmiştir.',
    managementShieldAdvice: 'Tebligatsız icra açılmamalıdır! Alo Yönetim tebligat alındısı ve kesinleşme şerhi olmadan hiçbir yasal takip başlatmaz.'
  },
  {
    caseTitle: 'Zemin Kat ve Dükkan Maliklerinin Asansör ve Ortak Gider Muafiyet Talebi',
    courtAndEmsalNo: 'Yargıtay Hukuk Genel Kurulu, E. 2017/18-1240, K. 2019/312',
    summaryDispute: 'Zemin kattaki dükkan sahibi asansörü ve ortak merdivenleri kullanmadığı gerekçesiyle işletme bütçesindeki asansör bakım payını ödemeyi reddetmiştir.',
    courtVerdict: 'Yargıtay, KMK m.20 gereğince kat malikinin ortak yer veya tesisler üzerindeki kullanma hakkından vazgeçmek veya kendi bağımsız bölümünün durumu dolayısıyla bunlardan faydalanmaya lüzum olmadığını ileri sürmek suretiyle gider payını ödemekten kaçınamayacağına kesin olarak hükmetmiştir.',
    managementShieldAdvice: 'Yönetim planında açık bir istisna maddesi yoksa, zemin kat malikleri tüm ortak gider ve asansör paylarını arsa payı nispetinde ödemek zorundadır.'
  }
];

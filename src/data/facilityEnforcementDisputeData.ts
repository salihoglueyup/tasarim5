/**
 * İcra ve İflas Kanunu (İİK m.67 / m.68) ve KMK m.20 Kapsamında Aidat İtirazının İptali ve İcra İnkar Tazminatı Veri Modeli
 * 
 * Kaynak Mevzuat:
 * - 2004 Sayılı İcra ve İflas Kanunu Madde 67 (İtirazın İptali Davası - Sulh Hukuk Mahkemesi)
 * - 2004 Sayılı İcra ve İflas Kanunu Madde 68 (İtirazın Kaldırılması - İcra Hukuk Mahkemesi)
 * - 634 Sayılı Kat Mülkiyeti Kanunu Madde 20 (Aylık %5 Gecikme Tazminatı)
 * - 634 Sayılı Kat Mülkiyeti Kanunu Madde 22 (Ortak Giderlerin Teminatı ve Kiracının Sorumluluk Sınırı)
 */

export interface EnforcementDisputeRoute {
  routeCode: 'itirazin_kaldirilmasi' | 'itirazin_iptali';
  routeName: string;
  competentCourt: string;
  statutoryTimeLimit: string;
  requiredProofDocuments: string[];
  litigationDurationMonths: string;
  executionDenialIndemnityPercentage: string;
  advocateEvaluation: string;
}

export interface EnforcementProcedureStage {
  stageNumber: number;
  stageTitle: string;
  authorityOrParty: string;
  timeframe: string;
  proceduralAction: string;
  criticalLegalRisk: string;
  aloYonetimProtocol: string;
}

export interface EnforcementPenaltyRule {
  penaltyType: string;
  legalBasis: string;
  rateOrAmount: string;
  applicabilityCondition: string;
  debtorImpact: string;
}

export interface TenantLiabilityScope {
  liabilityAspect: string;
  kmkArticleRef: string;
  legalRule: string;
  protectionMechanism: string;
}

/**
 * İcra İtirazına Karşı Başvurulacak 2 Temel Hukuki Yol Kıyaslaması (İİK m.68 vs İİK m.67)
 */
export const ENFORCEMENT_DISPUTE_ROUTES: EnforcementDisputeRoute[] = [
  {
    routeCode: 'itirazin_kaldirilmasi',
    routeName: 'İtirazın Kesin Kaldırılması Talebi (Hızlı Yol)',
    competentCourt: 'İcra Hukuk Mahkemesi',
    statutoryTimeLimit: 'İtirazın alacaklıya tebliğinden itibaren 6 AY',
    requiredProofDocuments: [
      'Kesinleşmiş İşletme Projesi (Tebliğ şerhi ile)',
      'Kat Malikleri Kurulu Noter Onaylı Karar Defteri Sureti',
      'İmzalı Kat Mülkiyeti Yönetim Planı',
      'Banka Dekontları ve Kasa Defteri Kayıtları'
    ],
    litigationDurationMonths: '2 - 4 Ay (Duruşmasız veya tek celsede sonuçlanır)',
    executionDenialIndemnityPercentage: 'Asıl alacağın en az %20\'si (İcra İnkar Tazminatı)',
    advocateEvaluation: 'Belgeleriniz tam ve işletme projesi tebliğ edilmişse en hızlı ve masrafsız yoldur; mahkeme sadece belge inceler, tanık dinlemez.'
  },
  {
    routeCode: 'itirazin_iptali',
    routeName: 'İtirazın İptali ve Alacak Davası (Genel Yol)',
    competentCourt: 'Sulh Hukuk Mahkemesi (Zorunlu Arabuluculuk şartlı)',
    statutoryTimeLimit: 'İtirazın tebliğinden itibaren 1 YIL',
    requiredProofDocuments: [
      'Tebligatsız veya itiraz görmüş işletme bütçesi taslağı',
      'Site karar defterleri ve faturalar',
      'Bilirkişi heyeti yerinde keşif raporu',
      'Fiili hizmet verildiğini kanıtlayan puantaj ve sözleşmeler'
    ],
    litigationDurationMonths: '8 - 14 Ay (Bilirkişi incelemesi ve duruşmalı yargılama)',
    executionDenialIndemnityPercentage: 'Asıl alacağın en az %20\'si + Yasal Gecikme Faizi',
    advocateEvaluation: 'İşletme projesi tebliğ edilmemişse veya borçlu imza inkarında bulunmuşsa zorunlu yoldur; önce arabulucuya gidilmesi dava şartıdır.'
  }
];

/**
 * Ödenmeyen Aidattan Hacze Uzanan 5 Aşamalı İcra Takip Çizelgesi
 */
export const ENFORCEMENT_PROCEDURE_STAGES: EnforcementProcedureStage[] = [
  {
    stageNumber: 1,
    stageTitle: 'Yasal Bildirim & Noter / SMS İhtarnamesi',
    authorityOrParty: 'Site Yönetimi / Alo Yönetim Hukuk Müşavirliği',
    timeframe: 'Aidat vadesinden 15 gün sonra',
    proceduralAction: 'Borçluya borç dökümü, işletilen aylık %5 gecikme faizi ve 7 günlük ödeme süresi bildirilir.',
    criticalLegalRisk: 'İhtarname gönderilmeden de icra açılabilir; ancak ihtarname borçluyu kesin temerrüde düşürür ve faiz başlangıcını sabitler.',
    aloYonetimProtocol: 'Alo Yönetim borçluya önce nezaketli çoklu SMS/E-posta, ardından PTT barkodlu tebligatla resmi bildirim yapar.'
  },
  {
    stageNumber: 2,
    stageTitle: 'İcra Müdürlüğü Nezdinde İlamsız Takip Başlatılması',
    authorityOrParty: 'İcra Dairesi (Örnek No: 7 Genel Haciz Yolu)',
    timeframe: 'İhtar süresi dolduktan sonra derhal',
    proceduralAction: 'İcra takip talebi hazırlanır; borçluya 7 gün içinde ödeme veya itiraz etme muhtırası (Ödeme Emri) gönderilir.',
    criticalLegalRisk: 'Takip talebinde aylık %5 gecikme tazminatının yasal dayanağı (KMK m.20/2) açıkça yazılmazsa standart yasal faiz (%9) işletilebilir.',
    aloYonetimProtocol: 'UDF formatında elektronik imza ile UYAP sistemi üzerinden aynı gün icra takibi açılır.'
  },
  {
    stageNumber: 3,
    stageTitle: 'Borçlunun İtirazı ve Takibin Durması',
    authorityOrParty: 'Borçlu Malik veya Kiracı',
    timeframe: 'Ödeme emrinin tebliğinden itibaren 7 GÜN',
    proceduralAction: 'Borçlu icra dairesine giderek "borcum yoktur" veya "yetkiye itiraz ediyorum" dilekçesi verirse icra takibi kanunen kendiliğinden DURUR.',
    criticalLegalRisk: 'Takibin durdurulduğunu fark etmeyip 1 yıl içinde dava açmayan yönetimin alacağı zamanaşımı ve takip düşme riskiyle karşılaşır.',
    aloYonetimProtocol: 'UYAP dosya takip botu itirazı anında tespit eder ve yönetim kuruluna dava açma opsiyon raporu sunar.'
  },
  {
    stageNumber: 4,
    stageTitle: 'İcra Hukuk / Sulh Hukuk Mahkemesinde İtirazın Kaldırılması/İptali',
    authorityOrParty: 'Yetkili Mahkeme & Arabuluculuk Bürosu',
    timeframe: '6 Ay (İcra Hukuk) veya 1 Yıl (Sulh Hukuk)',
    proceduralAction: 'Borçlunun haksız itirazının kaldırılması ve takibin devamı talep edilir; ayrıca borçlu aleyhine %20 İcra İnkar Tazminatı istenir.',
    criticalLegalRisk: 'Kesinleşmiş işletme projesi sunulamaması halinde İcra Hukuk talebi reddedilir ve vekalet ücreti yönetime yüklenir.',
    aloYonetimProtocol: 'Arşivdeki noter onaylı karar ve tebligat mazbataları sunularak tek celsede takibin devamı ve %20 tazminat kararı alınır.'
  },
  {
    stageNumber: 5,
    stageTitle: 'Haciz İşlemleri (Banka Maaş Haczi & Taşınmaz Üzerine İpotek)',
    authorityOrParty: 'İcra Dairesi & Tapu Sicil Müdürlüğü',
    timeframe: 'Mahkeme kararının tebliğinden itibaren 24 Saat içinde',
    proceduralAction: 'Borçlunun banka hesaplarına 89/1 haciz ihbarnamesi, araç kaydına haciz, dairesine KMK m.22 uyarınca kanuni ipotek tescil edilir.',
    criticalLegalRisk: 'Borcun tahsil edilememesi durumunda bağımsız bölümün cebri icra ile satışı dahi istenebilir.',
    aloYonetimProtocol: 'E-haciz sistemiyle borçlunun aktif mevduatlarına bloke koydurularak ana para, %5 faiz, %20 tazminat ve avukatlık ücreti tahsil edilir.'
  }
];

/**
 * Borçlunun Karşılaşacağı Yasal Cezai Yaptırımlar ve Tazminatlar
 */
export const ENFORCEMENT_PENALTIES: EnforcementPenaltyRule[] = [
  {
    penaltyType: 'Aylık %5 Yasal Gecikme Tazminatı',
    legalBasis: 'KMK Madde 20/2',
    rateOrAmount: 'Aylık %5 (Yıllık Bileşik Yaklaşık %60)',
    applicabilityCondition: 'Gününde ödenmeyen tüm aidat, avans ve ortak yakıt borçlarında kanun gereği kendiliğinden işler.',
    debtorImpact: 'Standart yasal temerrüt faizinin (%9/yıl) katbekat üzerindedir; borç her ay çığ gibi büyür.'
  },
  {
    penaltyType: 'İcra İnkar Tazminatı',
    legalBasis: 'İİK Madde 67/2 & Madde 68/son',
    rateOrAmount: 'Asıl Alacağın En Az %20\'si',
    applicabilityCondition: 'Borçlunun likit (belirli) aidat borcuna haksız ve kötü niyetli olarak itiraz etmesi durumunda mahkemece hükmedilir.',
    debtorImpact: 'Borçlu ana borcunun yanında tek kalemde %20 fazlasını alacaklı site yönetimine ödemekle yükümlü tutulur.'
  },
  {
    penaltyType: 'Yasal İcra Masrafları ve Vekalet Ücreti',
    legalBasis: 'Avukatlık Asgari Ücret Tarifesi & Harçlar Kanunu',
    rateOrAmount: 'Maktu / Nispi İcra Vekalet Ücreti + Başvuru/Peşin Harç',
    applicabilityCondition: 'İcra takibi ve dava açılmasıyla birlikte otomatik olarak borçlu hanesine eklenir.',
    debtorImpact: 'Borçlu kendi avukatına ödeme yapacağı gibi, yönetimin avukatlık ve mahkeme masraflarını da tamamen üstlenir.'
  }
];

/**
 * Kiracının Sorumluluk Sınırı ve Güvenceler (KMK Madde 22)
 */
export const TENANT_LIABILITY_RULES: TenantLiabilityScope[] = [
  {
    liabilityAspect: 'Kiracının Azami Sorumluluk Sınırı',
    kmkArticleRef: 'KMK Madde 22/1',
    legalRule: 'Kiracının sorumluluğu, ev sahibine ödemekle yükümlü olduğu AYLIK KİRA MİKTARI İLE SINIRLIDIR.',
    protectionMechanism: 'Site yönetimi kiracıya haciz gönderdiğinde, kiracı aidatı siteye öder ve bu ödemeyi ev sahibine ödeyeceği kiradan yasal olarak mahsup eder.'
  },
  {
    liabilityAspect: 'Demirbaş Yatırımlarının Kiracıdan İstenememesi',
    kmkArticleRef: 'KMK Madde 20/1-b & Yargıtay İçtihadı',
    legalRule: 'Çatı onarımı, asansör motoru yenileme, dış cephe mantolama gibi kalıcı demirbaş masrafları kiracıya rücu edilemez; münhasıran malike aittir.',
    protectionMechanism: 'Yönetim icra takibini demirbaş için yalnızca kat malikine, işletme aidatı için ise malik ve kiracıya müteselsilen açabilir.'
  },
  {
    liabilityAspect: 'Kat Malikinin Bağımsız Bölümü Üzerinde Kanuni İpotek Hakkı',
    kmkArticleRef: 'KMK Madde 22/2',
    legalRule: 'Kat malikinin aidat borcu ödenmezse, diğer kat maliklerinin veya yöneticinin talebiyle ilgili daire üzerine tapuda KANUNİ İPOTEK konulabilir.',
    protectionMechanism: 'Daire başkasına satılsa dahi ipotek borcu ödenmeden tapu devri yapılamaz veya alacak satış bedelinden öncelikle tahsil edilir.'
  }
];

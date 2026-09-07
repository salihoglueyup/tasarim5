import { BASE_URL } from '@/lib/seo';

export interface KmkArticleItem {
  articleNumber: number;
  title: string;
  category: 'ORTAK_ALAN' | 'AIDAT_GIDER' | 'YONETICI_GOREVLERI' | 'DENETIM' | 'GENEL_KURUL';
  summary: string;
  practicalApplication: string;
  legalAnchor: string;
  /** Google Featured Snippet (Position Zero) arama niyeti başlığı */
  featuredSnippetQuestion: string;
  /** Google Featured Snippet için 40-60 kelimelik doğrudan kesin cevap */
  directSnippetAnswer: string;
}

export const KMK_LAW_INDEX: KmkArticleItem[] = [
  {
    articleNumber: 4,
    title: 'Ortak Yerler ve Tesisler',
    category: 'ORTAK_ALAN',
    summary: 'Temeller, ana duvarlar, avlular, asansörler, merdivenler, yangın merdivenleri ve çatılar mutlak ortak alandır; şahsi mülkiyete konu edilemez.',
    practicalApplication: 'Ortak alan işgallerinin önlenmesi ve tahliye süreçleri Alo Yönetim hukuki denetimindedir.',
    legalAnchor: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#kmk-madde-4`,
    featuredSnippetQuestion: 'Apartmanda ve sitede ortak alanlar nerelerdir?',
    directSnippetAnswer: '634 sayılı Kat Mülkiyeti Kanunu Madde 4 uyarınca temeller, ana taşıyıcı duvarlar, avlular, çatılar, bacalar, asansörler, merdivenler, yangın merdivenleri ve giriş holleri mutlak ortak yerlerdir. Ortak alanlar bağımsız bölüm maliklerinin arsa payına bağlıdır ve ferdi mülkiyete konu edilemez.',
  },
  {
    articleNumber: 19,
    title: 'Anagayrimenkulün Bakımı, Korunması ve Kat Maliklerinin Sorumluluğu',
    category: 'ORTAK_ALAN',
    summary: 'Kat malikleri ana yapının mimari bütünlüğünü korumakla yükümlüdür. Ortak yerlerde inşaat, onarım ve cam balkon için 4/5 yazılı rıza zorunludur.',
    practicalApplication: 'Mimari tadilat izinleri ve rıza tutanakları dijital arşivde toplanır.',
    legalAnchor: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#kmk-madde-19`,
    featuredSnippetQuestion: 'Apartmanda cam balkon ve tadilat için izin gerekir mi?',
    directSnippetAnswer: 'KMK Madde 19 uyarınca kat malikleri ana yapının mimari durumunu korumakla yükümlüdür. Binanın dış cephesinde, ortak yerlerinde veya balkonlarda yapılacak tadilat, onarım ve cam balkon uygulamaları için tüm kat maliklerinin beşte dördünün (4/5) yazılı rızası kanunen zorunludur.',
  },
  {
    articleNumber: 20,
    title: 'Genel Giderlere Katılma ve Aidat Ödeme Yükümlülüğü',
    category: 'AIDAT_GIDER',
    summary: 'Kapıcı, kaloriferci, bahçıvan ve bekçi giderlerine eşit; bakım, koruma, güçlendirme ve işletme giderlerine arsa payı oranında katılım esastır. Geciken aidata aylık %5 yasal tazminat işletilir.',
    practicalApplication: 'Otomatik dijital borçlandırma ve icra takibiyle tahsilat oranı %98.7 seviyesinde tutulur.',
    legalAnchor: `${BASE_URL}/hizmetler/aidat-takibi#kmk-madde-20`,
    featuredSnippetQuestion: 'Geciken site aidatına ne kadar faiz uygulanır?',
    directSnippetAnswer: '634 sayılı KMK Madde 20 uyarınca, gününde ödenmeyen aidat ve ortak gider avans borçları için aylık yüzde 5 (%5) yasal gecikme tazminatı hesaplanır. Bu faiz icra takibine esas olup aylık oranın gün hesabı üzerinden tahakkuk ettirilmesi emredici kanun hükmüdür.',
  },
  {
    articleNumber: 22,
    title: 'Ortak Giderlerin Teminatı ve İcra Takibi',
    category: 'AIDAT_GIDER',
    summary: 'Kat malikinin aidat borcu için yöneticinin diğer kat malikleri adına dava açma ve icra takibi yapma yetkisi vardır.',
    practicalApplication: 'Hukuk müşavirliğimiz vekâleten hızlı ilamsız icra takipleri başlatır.',
    legalAnchor: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#kmk-madde-22`,
    featuredSnippetQuestion: 'Ödenmeyen aidat için icra takibi nasıl başlatılır?',
    directSnippetAnswer: 'KMK Madde 22 uyarınca, aidat borcunu ödemeyen bağımsız bölüm maliki ve kiracısına karşı yönetici doğrudan ilamsız icra takibi başlatabilir. Yönetici ayrıca ana gayrimenkulün bulunduğu yer mahkemesinde dava açabilir ve malikin bağımsız bölümü üzerine kanuni ipotek tescil ettirebilir.',
  },
  {
    articleNumber: 34,
    title: 'Yöneticinin Seçilmesi ve Çift Çoğunluk Kuralı',
    category: 'YONETICI_GOREVLERI',
    summary: 'Sekiz veya daha fazla bağımsız bölümü olan binalarda yönetici atanması zorunludur. Yönetici kat maliklerinin hem sayı hem arsa payı çoğunluğuyla seçilir.',
    practicalApplication: 'Genel kurul çağrı ve hazirun cetveli yönetimi mevzuata tam uyumlu yapılır.',
    legalAnchor: `${BASE_URL}/hizmetler/tesis-yonetimi#kmk-madde-34`,
    featuredSnippetQuestion: 'Site ve apartman yöneticisi nasıl seçilir?',
    directSnippetAnswer: '8 veya daha fazla bağımsız bölümü olan binalarda yönetici atanması zorunludur. KMK Madde 34 gereğince yönetici, kat malikleri kurulunda hem sayı (malik sayısı) hem de arsa payı çoğunluğunun (çift çoğunluk) oyu ile seçilir. Çoğunluk sağlanamazsa Sulh Hukuk Mahkemesi yönetici atar.',
  },
  {
    articleNumber: 35,
    title: 'Yöneticinin Genel Görevleri ve Temsil Yetkisi',
    category: 'YONETICI_GOREVLERI',
    summary: 'Kararların uygulanması, ana gayrimenkulün korunması, asansör ve yangın bakımlarının yapılması, aidatların tahsili ve işletme projesinin yürütülmesi.',
    practicalApplication: 'Alo Yönetim 7/24 teknik ve idari ekipleriyle yöneticilik görevlerini profesyonelce ifa eder.',
    legalAnchor: `${BASE_URL}/hizmetler/tesis-yonetimi#kmk-madde-35`,
    featuredSnippetQuestion: 'Site yöneticisinin yasal görev ve yetkileri nelerdir?',
    directSnippetAnswer: 'KMK Madde 35 uyarınca yöneticinin temel görevleri; kurul kararlarını uygulamak, ana yapıyı korumak, asansör ve yangın periyodik bakımlarını yaptırmak, işletme projesini yürütmek, aidatları toplamak ve borçlulara karşı kanuni takipleri icra etmektir.',
  },
  {
    articleNumber: 37,
    title: 'İşletme Projesinin Yapılması ve Kesinleşmesi',
    category: 'AIDAT_GIDER',
    summary: 'Kat malikleri kurulunca kabul edilmiş bir işletme projesi yoksa, yönetici gecikmeksizin tahmini gelir-gider projesini hazırlar. Tebliğden itibaren 7 gün içinde itiraz edilmezse kesinleşir.',
    practicalApplication: 'Yıllık şeffaf işletme projesi hazırlanarak tüm maliklere noter/iadeli veya dijital tebliğ edilir.',
    legalAnchor: `${BASE_URL}/hizmetler/tesis-yonetimi#kmk-madde-37`,
    featuredSnippetQuestion: 'İşletme projesi nedir ve kaç günde kesinleşir?',
    directSnippetAnswer: 'İşletme projesi, sitenin yıllık tahmini gelir ve gider bütçesidir. KMK Madde 37 uyarınca yönetici tarafından hazırlanıp maliklere tebliğ edilir. Tebliğden itibaren 7 gün içinde itiraz edilmezse işletme projesi kesinleşir ve İcra İflas Kanunu 68. madde anlamında resmi belge sayılır.',
  },
  {
    articleNumber: 41,
    title: 'Yönetimin Denetlenmesi ve Denetçi Raporu',
    category: 'DENETIM',
    summary: 'Denetçi veya denetim kurulu, yöneticinin hesaplarını en geç üç ayda bir inceler ve yıl sonunda Kat Malikleri Kuruluna yazılı rapor sunar.',
    practicalApplication: 'Denetçilere özel 7/24 online portal üzerinden banka ekstreleri ve fatura dökümleri canlı sunulur.',
    legalAnchor: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#kmk-madde-41`,
    featuredSnippetQuestion: 'Site yönetimi denetçisi ne iş yapar ve kaç ayda bir denetler?',
    directSnippetAnswer: 'KMK Madde 41 uyarınca denetçi veya denetim kurulu, yöneticinin hesaplarını en geç 3 ayda bir inceler ve haklı bir sebep çıktığında her zaman denetim yapabilir. Yıl sonunda kat malikleri kuruluna denetim raporunu yazılı olarak sunar.',
  },
];

// Global statik objeyi mühürle (Faz 13/22)
Object.freeze(KMK_LAW_INDEX);

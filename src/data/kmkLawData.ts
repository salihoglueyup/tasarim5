import { BASE_URL } from '@/lib/seo';

export interface KmkArticleItem {
  articleNumber: number;
  title: string;
  category: 'ORTAK_ALAN' | 'AIDAT_GIDER' | 'YONETICI_GOREVLERI' | 'DENETIM' | 'GENEL_KURUL';
  summary: string;
  practicalApplication: string;
  legalAnchor: string;
}

export const KMK_LAW_INDEX: KmkArticleItem[] = [
  {
    articleNumber: 4,
    title: 'Ortak Yerler ve Tesisler',
    category: 'ORTAK_ALAN',
    summary: 'Temeller, ana duvarlar, avlular, asansörler, merdivenler, yangın merdivenleri ve çatılar mutlak ortak alandır; şahsi mülkiyete konu edilemez.',
    practicalApplication: 'Ortak alan işgallerinin önlenmesi ve tahliye süreçleri Alo Yönetim hukuki denetimindedir.',
    legalAnchor: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#kmk-madde-4`,
  },
  {
    articleNumber: 19,
    title: 'Anagayrimenkulün Bakımı, Korunması ve Kat Maliklerinin Sorumluluğu',
    category: 'ORTAK_ALAN',
    summary: 'Kat malikleri ana yapının mimari bütünlüğünü korumakla yükümlüdür. Ortak yerlerde inşaat, onarım ve cam balkon için 4/5 yazılı rıza zorunludur.',
    practicalApplication: 'Mimari tadilat izinleri ve rıza tutanakları dijital arşivde toplanır.',
    legalAnchor: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#kmk-madde-19`,
  },
  {
    articleNumber: 20,
    title: 'Genel Giderlere Katılma ve Aidat Ödeme Yükümlülüğü',
    category: 'AIDAT_GIDER',
    summary: 'Kapıcı, kaloriferci, bahçıvan ve bekçi giderlerine eşit; bakım, koruma, güçlendirme ve işletme giderlerine arsa payı oranında katılım esastır. Geciken aidata aylık %5 yasal tazminat işletilir.',
    practicalApplication: 'Otomatik dijital borçlandırma ve icra takibiyle tahsilat oranı %98.7 seviyesinde tutulur.',
    legalAnchor: `${BASE_URL}/hizmetler/aidat-takibi#kmk-madde-20`,
  },
  {
    articleNumber: 22,
    title: 'Ortak Giderlerin Teminatı ve İcra Takibi',
    category: 'AIDAT_GIDER',
    summary: 'Kat malikinin aidat borcu için yöneticinin diğer kat malikleri adına dava açma ve icra takibi yapma yetkisi vardır.',
    practicalApplication: 'Hukuk müşavirliğimiz vekâleten hızlı ilamsız icra takipleri başlatır.',
    legalAnchor: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#kmk-madde-22`,
  },
  {
    articleNumber: 34,
    title: 'Yöneticinin Seçilmesi ve Çift Çoğunluk Kuralı',
    category: 'YONETICI_GOREVLERI',
    summary: 'Sekiz veya daha fazla bağımsız bölümü olan binalarda yönetici atanması zorunludur. Yönetici kat maliklerinin hem sayı hem arsa payı çoğunluğuyla seçilir.',
    practicalApplication: 'Genel kurul çağrı ve hazirun cetveli yönetimi mevzuata tam uyumlu yapılır.',
    legalAnchor: `${BASE_URL}/hizmetler/tesis-yonetimi#kmk-madde-34`,
  },
  {
    articleNumber: 35,
    title: 'Yöneticinin Genel Görevleri ve Temsil Yetkisi',
    category: 'YONETICI_GOREVLERI',
    summary: 'Kararların uygulanması, ana gayrimenkulün korunması, asansör ve yangın bakımlarının yapılması, aidatların tahsili ve işletme projesinin yürütülmesi.',
    practicalApplication: 'Alo Yönetim 7/24 teknik ve idari ekipleriyle yöneticilik görevlerini profesyonelce ifa eder.',
    legalAnchor: `${BASE_URL}/hizmetler/tesis-yonetimi#kmk-madde-35`,
  },
  {
    articleNumber: 37,
    title: 'İşletme Projesinin Yapılması ve Kesinleşmesi',
    category: 'AIDAT_GIDER',
    summary: 'Kat malikleri kurulunca kabul edilmiş bir işletme projesi yoksa, yönetici gecikmeksizin tahmini gelir-gider projesini hazırlar. Tebliğden itibaren 7 gün içinde itiraz edilmezse kesinleşir.',
    practicalApplication: 'Yıllık şeffaf işletme projesi hazırlanarak tüm maliklere noter/iadeli veya dijital tebliğ edilir.',
    legalAnchor: `${BASE_URL}/hizmetler/tesis-yonetimi#kmk-madde-37`,
  },
  {
    articleNumber: 41,
    title: 'Yönetimin Denetlenmesi ve Denetçi Raporu',
    category: 'DENETIM',
    summary: 'Denetçi veya denetim kurulu, yöneticinin hesaplarını en geç üç ayda bir inceler ve yıl sonunda Kat Malikleri Kuruluna yazılı rapor sunar.',
    practicalApplication: 'Denetçilere özel 7/24 online portal üzerinden banka ekstreleri ve fatura dökümleri canlı sunulur.',
    legalAnchor: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#kmk-madde-41`,
  },
];

import { BASE_URL } from '@/lib/seo';

export interface LegalPrecedentItem {
  id: string;
  court: string;
  docketNumber: string; // Esas No
  decisionNumber: string; // Karar No
  decisionDate: string;
  subject: string;
  kmkArticle: string;
  rulingSummary: string;
  bindingPrecedentText: string;
  aloYonetimOperationalSolution: string;
  canonicalUrl: string;
}

export const YARGITAY_LEGAL_PRECEDENTS: LegalPrecedentItem[] = [
  {
    id: 'yargitay-asansor-zemin-kat',
    court: 'T.C. Yargıtay 20. Hukuk Dairesi',
    docketNumber: '2017/1423 E.',
    decisionNumber: '2018/2198 K.',
    decisionDate: '2018-03-22',
    subject: 'Zemin Kat Dairelerin Asansör Bakım ve Yenileme Masraflarına Katılma Yükümlülüğü',
    kmkArticle: '634 Sayılı KMK Madde 20/1-c & Madde 20/2',
    rulingSummary: 'Yönetim planında aksine açık bir muafiyet hükmü yoksa, zemin veya giriş kattaki kat malikleri asansörü fiilen kullanmadıklarını ileri sürerek ana gider ve işletme projesi payından muaf tutulamaz.',
    bindingPrecedentText: '"Kat maliklerinden her biri, ortak yer veya tesisler üzerindeki kullanma hakkından vazgeçmek veya kendi bağımsız bölümünün durumu dolayısıyla bunlardan faydalanmaya lüzum bulunmadığını ileri sürmek suretiyle bu gider payını ödemekten kaçınamaz."',
    aloYonetimOperationalSolution: 'İşletme projesini bağımsız bölüm arsa paylarına göre hatasız dağıtarak kat malikleri arasındaki muafiyet anlaşmazlıklarını sıfırlıyoruz.',
    canonicalUrl: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#yargitay-asansor`,
  },
  {
    id: 'yargitay-cam-balkon-onay',
    court: 'T.C. Yargıtay Hukuk Genel Kurulu',
    docketNumber: '2016/18-854 E.',
    decisionNumber: '2017/1204 K.',
    decisionDate: '2017-06-14',
    subject: 'Katlanabilir Cam Balkon İçin 4/5 Kat Maliki Yazılı Rızası Zorunluluğu',
    kmkArticle: '634 Sayılı KMK Madde 19/2',
    rulingSummary: 'Balkonlar ana gayrimenkulün ortak alanı ve dış mimari unsuru olduğundan, katlanabilir veya raylı cam balkon kapatma işlemlerinde tüm kat maliklerinin beşte dördünün (4/5) yazılı onayı zorunludur.',
    bindingPrecedentText: '"Katlanabilir cam balkon dahi olsa, ana yapının dış görünümünü ve mimari projesini değiştiren her türlü uygulamada bütün kat maliklerinin 4/5 yazılı rızası aranır; aksi halde eski hale getirme (söküm) kararı verilir."',
    aloYonetimOperationalSolution: 'Mimari tadilat öncesinde genel kurul yazılı rıza tutanaklarını ve tip mimari projeyi onaylatıp arşivleyerek davaların önüne geçiyoruz.',
    canonicalUrl: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#yargitay-cam-balkon`,
  },
  {
    id: 'yargitay-aidat-yuzde-bes-faiz',
    court: 'T.C. Yargıtay 18. Hukuk Dairesi',
    docketNumber: '2015/6712 E.',
    decisionNumber: '2015/14890 K.',
    decisionDate: '2015-10-19',
    subject: 'Geciken Aidata Uygulanacak Aylık %5 Yasal Gecikme Tazminatının Hükmü',
    kmkArticle: '634 Sayılı KMK Madde 20/2',
    rulingSummary: 'Aidat borcunu gününde ödemeyen kat malikine, kanun gereği aylık yüzde 5 gecikme tazminatı doğrudan işletilir; sulh mahkemesi veya icra dairesi bu oranı indiremez.',
    bindingPrecedentText: '"634 sayılı KMK m.20/2 maddesinde öngörülen aylık %5 gecikme tazminatı yasal faizden bağımsız, özel bir tazminat niteliğindedir ve borcun muaccel olduğu tarihten itibaren re\'sen uygulanır."',
    aloYonetimOperationalSolution: 'Otomatik SMS/e-posta borç bildirimleri ve şeffaf dijital mutabakat sistemiyle aidat tahsilat oranını %98.7 seviyesinde tutuyoruz.',
    canonicalUrl: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#yargitay-faiz`,
  },
  {
    id: 'yargitay-yonetici-secimi-cift-cogunluk',
    court: 'T.C. Yargıtay 5. Hukuk Dairesi',
    docketNumber: '2020/3819 E.',
    decisionNumber: '2020/7124 K.',
    decisionDate: '2020-11-05',
    subject: 'Yönetici Seçiminde Hem Sayı Hem Arsa Payı Çift Çoğunluğu (%50+1) Şartı',
    kmkArticle: '634 Sayılı KMK Madde 34/4',
    rulingSummary: 'Site ve apartman yöneticisi yalnızca toplantıya katılanların değil, tüm bağımsız bölüm maliklerinin hem kişi sayısı hem de arsa payı bakımından salt çoğunluğu ile seçilir.',
    bindingPrecedentText: '"Yönetici seçiminde geçerli bir karardan söz edilebilmesi için, ana gayrimenkuldeki kat maliklerinin sayı ve arsa payı çoğunluğunun birlikte gerçekleşmesi emredici kanun kuralıdır."',
    aloYonetimOperationalSolution: 'Genel kurul çağrılarından vekaletname kontrollerine kadar tüm divan sürecini KMK 634 mevzuatına tam uyumlu yöneterek karar iptallerini engelliyoruz.',
    canonicalUrl: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#yargitay-yonetici`,
  },
  {
    id: 'yargitay-ortak-alan-siginak-tahsis',
    court: 'T.C. Yargıtay 18. Hukuk Dairesi',
    docketNumber: '2014/19823 E.',
    decisionNumber: '2015/3412 K.',
    decisionDate: '2015-03-09',
    subject: 'Sığınak ve Otopark Gibi Mutlak Ortak Alanların Tek Bir Malike Kiralanamayacağı',
    kmkArticle: '634 Sayılı KMK Madde 4, Madde 6 ve Sığınak Yönetmeliği',
    rulingSummary: 'Sığınak, yangın holü ve zorunlu otopark gibi ortak alanlar hiçbir kat malikinin şahsi kullanımına veya deposuna tahsis edilemez; genel kurul oy birliği dahi olsa kanuna aykırı tahsis yapılamaz.',
    bindingPrecedentText: '"Mutlak ortak yerler bağımsız bölümlerden ayrı olarak kullanıma konu edilemez, kiraya verilemez veya tahsis edilemez."',
    aloYonetimOperationalSolution: 'Tesis keşif denetimlerimizde ortak alan işgallerini tespit ediyor, yangın ve sığınak yönetmeliklerine uygun tahliye ve düzenleme sağlıyoruz.',
    canonicalUrl: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi#yargitay-siginak`,
  },
];

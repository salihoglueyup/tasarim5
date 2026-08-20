export type Term = {
  term: string;
  definition: string;
  /** İlgili hizmet/sayfa — kontekstuel iç link (Faz 78/97). */
  link?: { href: string; label: string };
};

// Sektör terimleri — kat malikleri ve site yöneticileri için net tanımlar.
export const TERMS: Term[] = [
  {
    term: 'Aidat',
    definition:
      'Bir site veya apartmanda ortak giderlerin (temizlik, güvenlik, asansör bakımı, elektrik) kat malikleri arasında arsa payı veya eşit bölüşüm esasına göre paylaştırılan aylık katkı payıdır. Kat Mülkiyeti Kanunu m.20 gereğince ödenmesi zorunludur.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Aidat icra takibi' },
  },
  {
    term: 'Kat Mülkiyeti Kanunu (KMK)',
    definition:
      '634 sayılı Kat Mülkiyeti Kanunu, birden çok bağımsız bölümü olan taşınmazlarda maliklerin hak ve yükümlülüklerini, yönetim biçimini ve ortak yer kullanımını düzenleyen temel mevzuattır.',
  },
  {
    term: 'Demirbaş',
    definition:
      'Sitenin ortak kullanımına ait, uzun ömürlü ve envantere kayıtlı taşınır mallardır (jeneratör, hidrofor, güvenlik kamerası, bahçe ekipmanı). Yönetim değişiminde tutanakla devredilir.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Teknik bakım' },
  },
  {
    term: 'İşletme Projesi',
    definition:
      'Bir yıllık tahmini gelir ve giderleri, aidat tutarlarını ve avans miktarlarını gösteren bütçe planıdır. Yönetici tarafından hazırlanır ve kat malikleri kuruluna sunulur.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'Tesis yönetimi' },
  },
  {
    term: '5188 Sayılı Kanun',
    definition:
      'Özel Güvenlik Hizmetlerine Dair Kanun; sitelerde ve tesislerde görev yapacak özel güvenlik görevlilerinin eğitim, kimlik ve çalışma koşullarını düzenler. Kimliksiz güvenlik istihdamı yasaktır.',
    link: { href: '/guvenlik-akademisi', label: 'Güvenlik akademisi' },
  },
  {
    term: 'Kat Malikleri Kurulu',
    definition:
      'Bağımsız bölüm maliklerinin tamamından oluşan, sitenin en yetkili karar organıdır. Yöneticiyi seçer, işletme projesini ve yönetim planı değişikliklerini onaylar.',
  },
  {
    term: 'Yönetim Planı',
    definition:
      'Sitenin nasıl yönetileceğini belirleyen, tüm kat maliklerini bağlayan sözleşme niteliğindeki belgedir. Tapuya şerh edilir ve değiştirilmesi için nitelikli çoğunluk gerekir.',
  },
  {
    term: 'Ortak Alan',
    definition:
      'Bağımsız bölümler dışında kalan, tüm maliklerin ortak kullanımındaki yerlerdir (merdiven, asansör, çatı, bahçe, otopark, sığınak). Ortak alan giderleri aidata yansır.',
    link: { href: '/hizmetler/temizlik-ve-hijyen', label: 'Ortak alan temizliği' },
  },
  {
    term: 'Kompanzasyon (Reaktif Güç)',
    definition:
      'Ortak alan elektrik tesisatında reaktif enerji tüketiminin panolarla dengelenmesidir. Düzenli bakım, dağıtım şirketinin uyguladığı reaktif ceza faturalarını önler.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Teknik bakım' },
  },
  {
    term: 'Denetçi',
    definition:
      'Kat malikleri kurulunca seçilen, yönetimin gelir-gider hesaplarını ve işlemlerini denetleyen kişi veya kuruldur. Şeffaf yönetimin temel güvencesidir.',
  },
  {
    term: 'Özel Güvenlik İzni (ÖGİ)',
    definition:
      '5188 sayılı kanun uyarınca apartman ve sitelerde özel güvenlik görevlisi istihdam edebilmek için İl Valiliği Özel Güvenlik Komisyonu tarafından verilen resmi faaliyet ve çalışma izin belgesidir.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: 'Güvenlik yönetimi' },
  },
  {
    term: 'Özel Güvenlik Kimlik Kartı',
    definition:
      'Emniyet Genel Müdürlüğü ve Valilik onaylı, adli sicil araştırması ve 120 saatlik temel güvenlik eğitimini tamamlamış kişilere verilen resmi 5188 çalışma lisansıdır. Kimliksiz personel çalıştırmak kanunen yasaktır.',
    link: { href: '/guvenlik-akademisi', label: 'Güvenlik akademisi' },
  },
  {
    term: 'Plaka Tanıma Sistemi (PTS)',
    definition:
      'Site ve otopark girişlerinde araç plakalarını yapay zeka algoritmalarıyla milisaniyeler içinde okuyup kayıtlı sakinlerin bariyerini otomatik açan, yabancı araçları engelleyen ve misafir süresi takip eden akıllı kamera sistemidir.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: 'Akıllı güvenlik teknolojileri' },
  },
  {
    term: 'RFID Devriye Tur Kontrol Sistemi',
    definition:
      'Güvenlik görevlilerinin site sınırları, yangın merdivenleri, otopark ve sığınak gibi kritik kontrol noktalarını belirlenen saatlerde elektronik kalemle okuttuğu, anlık GPS ve zaman damgalı nöbet denetim teknolojisidir.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: 'Güvenlik denetimi' },
  },
  {
    term: 'Özel Güvenlik Zorunlu Mali Sorumluluk Sigortası',
    definition:
      '5188 sayılı Kanun Madde 21 gereğince, özel güvenlik görevlilerinin üçüncü şahıslara ve site sakinlerine verebilecekleri zararları teminat altına alan yasal zorunlu sigorta poliçesidir.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: '5188 yasal sigorta' },
  },
  {
    term: 'Tesis Yönetimi (Entegre Tesis Yönetimi)',
    definition:
      'Bir yapının ya da sitenin fiziki, teknik, güvenlik, temizlik, peyzaj ve bütçe/muhasebe operasyonlarının tek bir kurumsal merkezden ve kalite standartlarında yönetilmesini sağlayan profesyonel yönetim disiplinidir.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'Tesis yönetimi' },
  },
  {
    term: 'Hizmet Seviyesi Taahhüdü (SLA)',
    definition:
      'Tesis yönetim şirketi ile site yönetimi arasında imzalanan, arıza müdahale süresi (örn. 45 dk), temizlik frekansı ve güvenlik devriye sayılarını yasal güvenceye bağlayan resmi performans sözleşmesidir.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'Kurumsal SLA taahhütleri' },
  },
  {
    term: 'Önleyici Bakım (Preventive Maintenance)',
    definition:
      'Asansör, jeneratör, hidrofor ve yangın sistemlerinde arıza oluşmadan önce yapılan periyodik kontroller ve parça yenilemeleridir. Sitenin büyük onarım maliyetlerini %40\'a kadar düşürür.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Önleyici teknik bakım' },
  },
  {
    term: 'Bina Otomasyon Sistemi (BMS)',
    definition:
      'Aydınlatma, ısıtma-soğutma, havalandırma ve su pompalarını tek ekrandan sensörlerle izleyip yöneten, enerji israfını ve elektrik faturasını minimuma indiren akıllı bina yönetim altyapısıdır.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Bina otomasyonu' },
  },
  {
    term: 'Demirbaş Avans Fonu',
    definition:
      'KMK uyarınca kat maliklerinden çatı onarımı, asansör revizyonu veya dış cephe boyası gibi büyük sermaye yatırımları için toplanan ve cari aidat hesabından ayrı tutulan yedek fondur.',
    link: { href: '/hizmetler/aidat-takibi', label: 'Demirbaş fonu yönetimi' },
  },
  {
    term: 'TSE HYB 12850 Belgesi',
    definition:
      'Türk Standardları Enstitüsü tarafından verilen, tesis ve bina yönetim firmalarının idari, teknik ve personel yeterliliğe sahip olduğunu kanıtlayan resmi Hizmet Yeterlilik Belgesi\'dir.',
    link: { href: '/kurumsal/kalite-belgelerimiz', label: 'TSE kalite belgelerimiz' },
  },
  {
    term: 'Merkezi Isı Pay Ölçer',
    definition:
      'Merkezi ısıtma sistemine sahip binalarda her bağımsız bölümün harcadığı gerçek ısı enerjisini ölçerek doğalgaz faturasının adil ve yasal kurallara göre dairelere paylaştırılmasını sağlayan cihazdır.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Isı pay ölçer ve faturalandırma' },
  },
  {
    term: 'Mali İbra',
    definition:
      'Kat Malikleri Kurulu olağan toplantısında, yöneticinin geçmiş dönem gelir-gider hesaplarının ve işletme faaliyetlerinin maliklerce oylanarak hukuken ve mali açıdan aklanması işlemidir.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Mali ibra ve genel kurul' },
  },
  {
    term: 'Site İşletme Bütçesi',
    definition:
      'KMK m.37 uyarınca sitenin 1 yıllık güvenlik, temizlik, personel, enerji ve teknik bakım giderlerini hesaplayan ve aidat tutarlarını belirleyen yasal mali projeksiyon belgesidir.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'İşletme bütçesi hazırlama' },
  },
  {
    term: 'Yeşil Tesis & Enerji Verimliliği',
    definition:
      'Site ortak alanlarında LED aydınlatma, çatı GES güneş enerjisi panelleri, yağmur suyu hasadı ve kompanzasyon takibiyle karbon ayak izini ve elektrik maliyetlerini düşüren çevreci yönetim modelidir.',
    link: { href: '/kurumsal/surdurulebilirlik', label: 'Sürdürülebilir tesis yönetimi' },
  },
  {
    term: 'ISO 41001 Tesis Yönetim Sistemi',
    definition:
      'Tesis yönetimi disiplini için uluslararası akreditasyon standardıdır. Binaların fiziki, teknik ve idari süreçlerinin kurumsal kalite, sürdürülebilirlik ve maliyet tasarrufu çerçevesinde yönetildiğini belgeler.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'ISO 41001 tesis yönetimi' },
  },
  {
    term: 'Kat Mülkiyeti Kanunu Madde 37 (İşletme Projesi)',
    definition:
      'KMK 37. maddesi uyarınca yöneticinin 1 yıllık tahmini gelir-gider bütçesini ve daire başı aidat avanslarını belirleyerek kat maliklerine resmi tebliğ etmesini zorunlu kılan yasal hükümdür.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'İşletme projesi hukuku' },
  },
  {
    term: 'Kat Mülkiyeti Kanunu Madde 20 (Aidat Borcu)',
    definition:
      'Kat maliklerinin ortak yer veya tesisler üzerindeki kullanma hakkından vazgeçmek veya kendi bağımsız bölümünün durumundan dolayı yararlanmaya lüzum veya ihtiyaç bulunmadığını ileri sürmek suretiyle aidat ödemekten kaçınamayacağını hükme bağlayan emredici kanun maddesidir.',
    link: { href: '/hizmetler/aidat-takibi', label: 'Aidat borcu ve icra takibi' },
  },
  {
    term: 'Yeşil Etiket (Asansör)',
    definition:
      'A Tipi Muayene Kuruluşları (MMO veya TSE) tarafından yapılan yıllık periyodik kontroller sonucunda can ve mal güvenliği açısından kusursuz çalışan asansörlere verilen resmi uygunluk etiketidir.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Asansör yeşil etiket bakımı' },
  },
  {
    term: 'Enerji Kimlik Belgesi (EKB)',
    definition:
      'Binalarda enerjinin ve enerji kaynaklarının verimli kullanılmasını, enerji israfının önlenmesini ve çevrenin korunmasını gösteren; asgari C sınıfı olması hedeflenen resmi enerji performans karnesidir.',
    link: { href: '/kurumsal/surdurulebilirlik', label: 'Enerji kimlik belgesi ve tasarruf' },
  },
  {
    term: 'Yangın Söndürme ve Duman Tahliye Sistemi',
    definition:
      'Binaların Yangından Korunması Hakkında Yönetmelik gereğince sitelerde ve otoparklarda bulunması zorunlu olan sprinkler, yangın hidroforu, duman damperleri ve yangın algılama otomasyonudur.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Yangın güvenlik sistemleri' },
  },
];

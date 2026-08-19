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
];

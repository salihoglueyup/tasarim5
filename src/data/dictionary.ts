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
];

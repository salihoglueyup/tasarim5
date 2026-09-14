/**
 * Amatörden Profesyonel Yönetime 48 Saatlik Devir Teslim Yol Haritası Veri Modeli (transitionRoadmapData.ts)
 * 
 * 634 Sayılı Kat Mülkiyeti Kanunu ve Türk Ticaret Kanunu uyarınca
 * kat malikleri kurulunun kararından 48 saatlik resmi operasyon başlangıcına kadar 6 resmi aşama.
 */

export interface TransitionStageItem {
  id: string;
  stepNumber: number;
  timeframe: string;
  stageTitle: string;
  legalBasis: string;
  summary: string;
  actionItems: string[];
  requiredDocuments: string[];
  aloYonetimRole: string;
}

export const TRANSITION_ROADMAP_STAGES: TransitionStageItem[] = [
  {
    id: 'stage-1-cagri',
    stepNumber: 1,
    timeframe: 'Genel Kuruldan 15 Gün Önce',
    stageTitle: 'Genel Kurul Çağrısı ve Gündem Tebligatı',
    legalBasis: 'KMK Madde 29 ve Tebligat Kanunu',
    summary: 'Olağan veya olağanüstü toplantı gündeminin belirlenerek profesyonel şirket seçimi maddesinin tüm kat maliklerine yasal süre içinde usulüne uygun bildirilmesi.',
    actionItems: [
      'Toplantı gündemine "Profesyonel Yönetim Şirketi Seçimi ve Yetkilendirilmesi" maddesinin eklenmesi.',
      'İlk ve çoğunluk sağlanamazsa ikinci toplantı tarihi arasında asgari 7 gün süre bırakılması.',
      'İadeli taahhütlü mektup veya kat maliklerinin imzası karşılığı tebligat listesinin oluşturulması.',
    ],
    requiredDocuments: [
      'Genel Kurul Çağrı ve Gündem İlan Metni',
      'Kat Malikleri İmzalı Tebellüğ Çizelgesi veya PTT Gönderi Barkodları',
      'Mevcut Yönetim Planı Sureti',
    ],
    aloYonetimRole: 'Alo Yönetim Hukuk Müşavirliği, genel kurul çağrı metnini ve hazirun listesini KMK m.29\'a tam uyumlu olarak hazırlar.',
  },
  {
    id: 'stage-2-cift-cogunluk',
    stepNumber: 2,
    timeframe: 'Genel Kurul Günü (Saat 0)',
    stageTitle: 'Divan Heyeti Teşekkülü & KMK m.34 Çift Çoğunluk Kararı',
    legalBasis: 'KMK Madde 34/4',
    summary: 'Kat Malikleri Kurulu\'nda hem bağımsız bölüm kişi sayısının hem de arsa payı toplamının salt çoğunluğuyla (%50+1) Alo Yönetim\'in yönetici olarak seçilmesi.',
    actionItems: [
      'Hazirun cetvelinde arsa payları ve vekaletnamelerin kanuni sınır kontrolü (KMK m.31).',
      'Yönetim ve Denetim Kurulu seçimlerinin açık oylamayla tutanağa geçirilmesi.',
      'Alo Yönetim adına sözleşme imzalamak üzere Denetçi veya Divan Başkanı\'na yetki verilmesi.',
    ],
    requiredDocuments: [
      'Resmi Hazirun Cetveli (Sayı ve Arsa Payı Listesi)',
      'Noter veya Islak İmzalı Vekaletnameler',
      'Genel Kurul Divan Toplantı Tutanağı',
    ],
    aloYonetimRole: 'Uzman koordinatörlerimiz genel kurula katılarak arsa payı çift çoğunluk hesaplamalarını dijital sistemle anında doğrular.',
  },
  {
    id: 'stage-3-sozlesme',
    stepNumber: 3,
    timeframe: 'İlk 12 Saat',
    stageTitle: 'Karar Defteri Tescili & Yönetim Sözleşmesi İmzası',
    legalBasis: 'KMK Madde 32, 34 ve Türk Borçlar Kanunu',
    summary: 'Genel kurul kararının karar defterine tescili, noter tasdikinin kontrolü ve taraflar arasında cezai şart ve SLA güvencelerini içeren yönetim sözleşmesinin akdi.',
    actionItems: [
      'Genel kurul karar tutanağının noter onaylı karar defterine yapıştırılıp divanca imzalanması.',
      'Tüm kat maliklerine taahhüt edilen SLA (45 dk acil servis, %0 reaktif ceza) sözleşmesinin imzalanması.',
      'Apartman giriş panosuna yönetici levhasının asılması (KMK m.34/son).',
    ],
    requiredDocuments: [
      'Noter Onaylı Yönetim Karar Defteri',
      'Karşılıklı İmzalı Profesyonel Yönetim Hizmet Sözleşmesi',
      'Yönetici Yetki İtiraz Tebellüğ Formu',
    ],
    aloYonetimRole: 'Hukuk departmanımız standart kurumsal sözleşmeyi hazır bulundurur ve noter tasdik sürecini 12 saatte tamamlar.',
  },
  {
    id: 'stage-4-devir-teslim',
    stepNumber: 4,
    timeframe: '12 – 24. Saat',
    stageTitle: 'Eski Yönetimden Resmi Evrak, Kasa & Defter Devir Teslimi',
    legalBasis: 'KMK Madde 36 ve 39',
    summary: 'Eski yöneticiden sitenin geçmiş 5 yıllık tüm yasal evraklarının, banka hesaplarının, nakit kasasının ve demirbaş listesinin eksiksiz teslim alınması.',
    actionItems: [
      'Geçmiş dönem işletme defterleri, fatura klasörleri ve makbuz koçanlarının teslimi.',
      'Anahtar teslimi: Kazan dairesi, jeneratör odası, asansör makine dairesi, sığınak ve nizamiyeler.',
      'Çalışan personellerin (kapıcı, güvenlik, temizlik) özlük dosyaları ve SGK sicil evrakları.',
    ],
    requiredDocuments: [
      'Ayrıntılı Resmi Devir Teslim Tutanağı (4 Nüsha)',
      'Bina Ortak Alan Demirbaş Sayım ve Durum Çizelgesi',
      'Geçmiş Dönem Borçlu Kat Malikleri İcra ve Alacak Listesi',
    ],
    aloYonetimRole: 'Teknik ve mali devir teslim uzmanlarımız yerinde fiziki sayım yapar, eksik veya arızalı tüm demirbaşları tutanağa geçirir.',
  },
  {
    id: 'stage-5-banka-vergi',
    stepNumber: 5,
    timeframe: '24 – 36. Saat',
    stageTitle: 'Vergi Dairesi ve Banka İmza Yetkileri Güncellemesi',
    legalBasis: 'Vergi Kimlik Numarası Genel Tebliği ve KMK m.35/i',
    summary: 'Sitenin vergi dairesi kayıtlarında yönetici değişikliğinin tescili ve sitenin banka hesaplarında çift imza ve Apsiyon API entegrasyon yetkilerinin açılması.',
    actionItems: [
      'Vergi dairesine noter onaylı karar defteriyle gidilerek yönetici tescil belgesinin alınması.',
      'Banka şubelerinde sitenin hesap yetkisinin Alo Yönetim çift imza sirkülerine bağlanması.',
      'Otomatik fatura ödeme talimatlarının (elektrik, su, doğalgaz, internet) güncellenmesi.',
    ],
    requiredDocuments: [
      'Vergi Dairesi Yönetici Tescil Bildirimi',
      'Noter Onaylı Karar Sureti ve İmza Beyannamesi',
      'Banka Hesap Cüzdanları ve Online Bankacılık Yetki Protokolü',
    ],
    aloYonetimRole: 'Finans ekibimiz tüm banka ve vergi dairesi işlemlerini vekaleten bizzat takip ederek kat maliklerini bürokrasiden kurtarır.',
  },
  {
    id: 'stage-6-apsiyon-aktivasyon',
    stepNumber: 6,
    timeframe: '36 – 48. Saat',
    stageTitle: 'Apsiyon Entegrasyonu & Sakinlere 7/24 Canlı Mobil Erişim',
    legalBasis: 'KMK Madde 37 ve KVKK Kanunu',
    summary: 'Bağımsız bölümlerin Apsiyon sistemine yüklenmesi, banka hesap hareketlerinin canlı bağlanması ve tüm sakinlere SMS/e-posta ile şifrelerinin iletilmesi.',
    actionItems: [
      'Daire bazlı kat maliki ve kiracı iletişim kütüğünün Apsiyon\'a aktarılması.',
      'KMK m.37 gereğince hazırlanan yeni işletme projesinin daire sakinlerine mobil tebliği.',
      'Kredi kartı ile 3D güvenli aidat ödeme ve anlık kasa denetiminin tüm sakinlerin cebine açılması.',
    ],
    requiredDocuments: [
      'Apsiyon Canlı Bakiye Entegrasyon Onayı',
      'Sakinler İçin Mobil Giriş ve SMS Bilgilendirme Kılavuzu',
      '7/24 Alo Yönetim Çağrı Merkezi ve Acil Servis Numarası Plaketi',
    ],
    aloYonetimRole: '48. saatin sonunda sitenizde 7/24 kesintisiz profesyonel yönetim, güvenli aidat tahsilatı ve 45 dk acil servis canlı olarak başlar.',
  },
];

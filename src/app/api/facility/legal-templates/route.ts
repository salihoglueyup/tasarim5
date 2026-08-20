import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_URL } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 saat önbellek

/**
 * 634 Sayılı KMK & Tesis Yönetimi Hukuki Karar / Şablon API'si (/api/facility/legal-templates)
 * 
 * Site Yöneticileri ve Kat Malikleri için Tesis Yönetim Şirketi Seçim Kararı,
 * KMK m.37 İşletme Projesi Tebliği, KMK m.20 Aidat Gecikme İhtarnamesi ve Devir-Teslim Tutanağı şablonları sunar.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const templateType = searchParams.get('type') || 'all';

  const templates = [
    {
      id: 'genel_kurul_tesis_yonetimi_karari',
      title: 'Kat Malikleri Kurulu Profesyonel Tesis Yönetim Şirketi Yetkilendirme Kararı',
      lawReference: '634 Sayılı Kat Mülkiyeti Kanunu Madde 34 & 35',
      authority: 'Apartman / Site Kat Malikleri Genel Kurulu',
      description: 'Sitenin yönetiminin kurumsal bir tesis yönetim şirketine devredilmesi için karar defterine yazılması gereken resmi karar metni.',
      fieldsRequired: ['Site Adı', 'Karar No', 'Karar Tarihi', 'Yönetim Şirketi Adı', 'Sözleşme Süresi'],
      templateText: `[SITE_ADI] SİTESİ KAT MALİKLERİ GENEL KURULU KARAR METNİ

KARAR NO: [KARAR_NO]
KARAR TARİHİ: [KARAR_TARIHI]
TOPLANTI YERİ: Site Sosyal Tesisi / Toplantı Salonu

GÜNDEM MADDESİ: Sitemizin Yönetim, Güvenlik, Temizlik ve Teknik İşletme Hizmetlerinin Profesyonel Tesis Yönetim Şirketine Devredilmesi.

KARAR:
Sitemizin ortak alanlarının daha düzenli, güvenli, ekonomik ve Kat Mülkiyeti Kanunu'na tam uygun şekilde sevk ve idaresi amacıyla;
1. 634 Sayılı Kat Mülkiyeti Kanunu'nun 34. ve 35. maddeleri uyarınca sitemizin yönetim yetkisinin [SOZLESME_SURESI] süreyle profesyonel yönetim kuruluşu olan ALO YÖNETİM TESİS YÖNETİMİ A.Ş.'ye devredilmesine,
2. Şirket ile hazırlanacak olan kurumsal yönetim sözleşmesini imzalamak üzere Kat Malikleri Kurulu adına Divan Heyeti / Denetim Kurulu üyelerine tam yetki verilmesine,
3. KMK m.37 gereğince hazırlanacak Yıllık İşletme Projesinin Alo Yönetim tarafından düzenlenerek tüm bağımsız bölümlere tebliğ edilmesine oy birliği / oy çokluğu ile karar verilmiştir.

DİVAN BAŞKANI: [DIVAN_BASKANI_ADI] (İmza)
KAT MALİKİ: [MALIK_1_ADI] (İmza)
KAT MALİKİ: [MALIK_2_ADI] (İmza)
DENETÇİ: [DENETCI_ADI] (İmza)`
    },
    {
      id: 'isletme_projesi_teblig_metni',
      title: 'KMK Madde 37 Yıllık İşletme Projesi (Bütçe & Avans Paylaşımı) Tebliğ Mektubu',
      lawReference: '634 Sayılı Kat Mülkiyeti Kanunu Madde 37',
      authority: 'Site Yöneticisi / Profesyonel Tesis Yönetimi',
      description: 'Bir yıllık tahmini gelir-gider bütçesinin ve daire başı aidat avanslarının kat maliklerine yasal tebliğ şablonu.',
      fieldsRequired: ['Site Adı', 'Dönem Yılı', 'Tebliğ Tarihi', 'Toplam Yıllık Bütçe', 'Aylık Aidat Avansı'],
      templateText: `[SITE_ADI] SİTESİ [DONEM_YILI] DÖNEMİ İŞLETME PROJESİ TEBLİĞİ

Sayın Kat Maliki / Bağımsız Bölüm Sakini,

634 Sayılı Kat Mülkiyeti Kanunu'nun 37. maddesi gereğince sitemizin [DONEM_YILI] takvim yılına ait tahmini Gelir ve Giderlerini içeren Resmi İşletme Projesi yönetimimizce hazırlanmıştır.

ÖZET BÜTÇE BİLGİLERİ:
- Yıllık Tahmini Ortak Gider Toplamı: [TOPLAM_YILLIK_BUTCE] TL
- Güvenlik, Temizlik ve Personel Giderleri: [PERSONEL_GIDERI] TL
- Ortak Elektrik, Su ve Teknik Bakım Giderleri: [TEKNIK_GIDER] TL
- Bağımsız Bölümünüze Düşen Aylık Aidat Avansı: [AYLIK_AIDAT_AVANSI] TL

KMK m.37/2 uyarınca, bu işletme projesine tebliğ tarihinden itibaren 7 (yedi) gün içinde itiraz edilmediği takdirde proje kesinleşecek olup; kesinleşen işletme projeleri İcra ve İflas Kanunu'nun 68. maddesinin 1. fıkrasında belirtilen belgelerden sayılacaktır.

Bilgilerinize arz eder, sağlıklı ve huzurlu günler dileriz.

[SITE_ADI] SİTESİ YÖNETİMİ
Alo Yönetim Tesis Yönetimi A.Ş.`
    },
    {
      id: 'aidat_gecikme_ihtarname_metni',
      title: 'KMK Madde 20 Aidat ve Ortak Gider Borcu İhtarname Metni (%5 Yasal Gecikme Faizli)',
      lawReference: '634 Sayılı Kat Mülkiyeti Kanunu Madde 20/c & İcra İflas Kanunu',
      authority: 'Site Yönetimi & Hukuk Müşavirliği',
      description: 'Aidatını vadesinde ödemeyen kat maliki veya kiracıya icra öncesi çekilecek resmi ihtarname metni.',
      fieldsRequired: ['Muhatap Adı Soyadı', 'Bağımsız Bölüm No', 'Geciken Aidat Ayları', 'Ana Para Borç Tutarı', 'İşlemiş %5 Gecikme Tazminatı'],
      templateText: `İHTARNAME

İHTAR EDEN: [SITE_ADI] Sitesi Yöneticiliği (Alo Yönetim Tesis Yönetimi A.Ş.)
VEKİLİ: Alo Yönetim Hukuk Departmanı
MUHATAP: [MUHATAP_ADI_SOYADI] (Bağımsız Bölüm No: [DAIRE_NO])

KONU: Ödenmeyen Ortak Alan Aidat ve İşletme Avansı Borçlarının KMK m.20/c Uyarınca Aylık %5 Gecikme Tazminatı ile Birlikte Ödenmesi Talebidir.

AÇIKLAMALAR:
Sitemizin [DAIRE_NO] numaralı bağımsız bölümüne ait [GECIKEN_AYLAR] dönemlerine ait toplam [ANA_PARA_BORCU] TL aidat borcunuz vadesinde ödenmemiştir.

KMK Madde 20/c hükmü gereğince; "Gider veya avans payını ödemeyen kat maliki hakkında, diğer kat maliklerinden her biri veya yönetici tarafından icra takibi yapılabilir, dava açılabilir ve gecikilen günler için aylık yüzde beş hesabıyla gecikme tazminatı ödemekle yükümlüdür."

İşbu ihtarnamenin tebliğinden itibaren 3 (üç) gün içinde toplam borcunuzu sitemizin resmi banka hesabına ödemenizi, aksi takdirde aleyhinize icra takibi başlatılacağını, avukatlık vekâlet ücreti, %5 aylık gecikme tazminatı ve tüm mahkeme masraflarının tarafınıza yükleneceğini ihtaren bildiririz.

İHTAR EDEN
[SITE_ADI] Sitesi Yönetimi Adına Alo Yönetim A.Ş.`
    },
    {
      id: 'tesis_devir_teslim_tutanagi',
      title: 'Tesis Yönetimi Devir Teslim Protokolü & Demirbaş Sayım Tutanağı',
      lawReference: '634 Sayılı Kat Mülkiyeti Kanunu Madde 38 & Türk Borçlar Kanunu',
      authority: 'Eski Yönetim Kurulu & Yeni Tesis Yönetim Şirketi',
      description: 'Yönetim değişiminde kasa, banka hesapları, karar defterleri, anahtarlar ve teknik demirbaşların eksiksiz devredildiğini belgeleyen resmi protokol.',
      fieldsRequired: ['Site Adı', 'Devir Tarihi', 'Devreden Yönetici', 'Devralan Tesis Yöneticisi', 'Devredilen Banka Bakiyesi'],
      templateText: `[SITE_ADI] SİTESİ YÖNETİMİ DEVİR-TESLİM PROTOKOLÜ

DEVİR TARİHİ: [DEVIR_TARIHI]
DEVREDEN: [DEVREDEN_YONETICI_ADI] (Eski Yönetici)
DEVRALAN: ALO YÖNETİM TESİS YÖNETİMİ A.Ş. (Yetkili Tesis Yöneticisi)

Taraflar arasında [SITE_ADI] sitesinin tüm idari, mali, hukuki ve teknik evrak ve demirbaşlarının devir teslimi aşağıdaki maddeler doğrultusunda eksiksiz gerçekleştirilmiştir:

1. MALİ DEVİR:
- Banka Hesap Bakiyesi: [BANKA_BAKIYESI] TL
- Kasa Nakit Tutarı: [KASA_TUTARI] TL
- Kat Malikleri Cari Borç/Alacak Döküm Listesi teslim edilmiştir.

2. RESMİ VE HUKUKİ BELGELER:
- Noter Onaylı Karar Defteri (Son Sayfa No: [SAYFA_NO])
- Noter Onaylı İşletme Defteri ve Gelir-Gider Makbuzları
- SGK İşyeri Sicil Dosyası ve Personel Özlük Dosyaları
- Varsa Devam Eden Dava ve İcra Takip Dosyaları

3. TEKNİK VE FİZİKİ DEMİRBAŞLAR:
- Asansör Yeşil Etiket Muayene Belgeleri ve Bakım Sözleşmeleri
- Jeneratör, Hidrofor, Yangın Pompası Bakım Karneleri
- Sığınağa, Çatıya, Trafo ve Kazan Dairesine Ait Anahtar Takımları
- CCTV Kamera Kayıt Cihazı Şifreleri ve Plaka Tanıma Sistemi Girişleri

Yukarıda dökümü yapılan tüm evrak, defter, bakiye ve ekipmanlar eksiksiz ve çalışır durumda devredilmiş ve teslim alınmıştır.

DEVREDEN (Eski Yönetim)              DEVRALAN (Alo Yönetim A.Ş.)
İsim: [DEVREDEN_ADI]                 İsim: [DEVRALAN_ADI]
İmza:                                İmza / Kaşe:`
    },
    {
      id: 'iso_41001_tesis_yonetimi_sartnamesi',
      title: 'ISO 41001 Entegre Tesis Yönetimi ve Kurumsal Hizmet Seviyesi (SLA) Şartnamesi',
      lawReference: 'ISO 41001:2018 & 634 Sayılı Kat Mülkiyeti Kanunu',
      authority: 'Site Yönetim Kurulu & Akredite Tesis Yönetim Şirketi',
      description: 'Acil durum müdahale süreleri (SLA), arıza onarım standartları, 5188 güvenlik ve TSE 13811 temizlik kriterlerini belirleyen kurumsal teknik şartname.',
      fieldsRequired: ['Site Adı', 'SLA Müdahale Süresi', 'Güvenlik Personeli Sayısı', 'Temizlik Frekansı'],
      templateText: `[SITE_ADI] SİTESİ ISO 41001 TESİS YÖNETİMİ HİZMET VE PERFORMANS (SLA) ŞARTNAMESİ

1. AMAC VE KAPSAM:
İşbu şartname, [SITE_ADI] sitesinin 5188 sayılı kanun kapsamında güvenliğini, TSE 13811 standartlarında temizliğini, asansör/jeneratör önleyici teknik bakımını ve şeffaf KMK muhasebesini kapsar.

2. HİZMET SEVİYESİ TAAHHÜTLERİ (SLA):
- Acil Teknik Arıza Müdahale Süresi: Azami 45 Dakika
- Asansörde Mahsur Kalma Kurtarma Süresi: Azami 20 Dakika
- 5188 Lisanslı Nizamiye & CCTV Güvenlik Denetimi: 7/24 Kesintisiz
- Ortak Alan ve Blok Merdiven Hijyen Frekansı: Günlük / Haftalık Plan

3. ŞEFFAFLIK VE RAPORLAMA:
Tesis yönetimi, her ayın ilk haftasında gelir-gider gerçekleşme tablosunu ve teknik bakım karnelerini dijital portal üzerinden tüm kat maliklerine sunar.`
    },
    {
      id: 'asansor_yangin_bakim_sozlesmesi',
      title: 'Asansör Yeşil Etiket ve Yangın Otomasyonu Periyodik Muayene Protokolü',
      lawReference: 'Asansör İşletme ve Bakım Yönetmeliği & Binaların Yangından Korunması Hakkında Yönetmelik',
      authority: 'Site Yöneticisi & Yetkili Mühendislik Servisi',
      description: 'Yıllık yeşil etiket muayenesi, jeneratör ATS yük testleri ve yangın sprinkler hidrofor kontrollerini güvence altına alan yasal bakım sözleşmesi.',
      fieldsRequired: ['Site Adı', 'Asansör Kimlik Numarası', 'Bakım Firması', 'Muayene Kuruluşu'],
      templateText: `[SITE_ADI] ASANSÖR VE YANGIN SİSTEMLERİ PERİYODİK BAKIM SÖZLEŞMESİ

1. BAKIM KAPSAMI:
- Aylık periyodik asansör mekanik ve elektronik kontrolleri (TSE / A Tipi Muayene Uyumlu).
- Yangın alarm paneli, duman damperleri ve yangın hidrofor pompalarının 15 günlük testleri.
- Jeneratör transfer panosu (ATS) aylık devreye alma ve yük testleri.

2. YASAL SORUMLULUK:
Bakım firması, mevzuata uygun bakım yapmadığı takdirde oluşabilecek idari para cezalarından ve teknik aksaklıklardan doğrudan sorumludur.`
    }
  ];

  const filteredTemplates = templateType === 'all'
    ? templates
    : templates.filter(t => t.id === templateType);

  return NextResponse.json({
    meta: {
      version: '2026-kmk-facility-v1',
      totalTemplates: templates.length,
      license: 'Official Alo Yönetim KMK Legal Repository',
      source: BASE_URL
    },
    templates: filteredTemplates
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_URL } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 saat önbellek

/**
 * 5188 Sayılı Kanun & KMK Hukuki Karar/Dilekçe Şablon Motoru (/api/security/legal-templates)
 * 
 * Apartman ve Site Yöneticileri için 5188 Valilik İzni, Karar Defteri Karar Metni,
 * KVKK Kamera Aydınlatma Metni ve Özel Güvenlik Şartnamesi şablonlarını sunar.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const templateType = searchParams.get('type') || 'all';

  const templates = [
    {
      id: 'valilik_5188_izin_dilekcesi',
      title: 'T.C. Valiliği 5188 Sayılı Kanun Özel Güvenlik İzni Başvuru Dilekçesi',
      lawReference: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun - Madde 3',
      authority: 'T.C. İstanbul Valiliği İl Özel Güvenlik Komisyonu Başkanlığı',
      description: 'Site ve apartman yönetimlerinin Valilikten yasal özel güvenlik izni (ÖGİ) alması için zorunlu resmi başvuru dilekçesi.',
      fieldsRequired: ['Site Adı', 'Ada/Parsel/Adres', 'Bağımsız Bölüm Sayısı', 'Talep Edilen Güvenlik Personeli Sayısı', 'Silah Durumu (Silahsız/Silahlı)'],
      templateText: `T.C. İSTANBUL VALİLİĞİ
İl Özel Güvenlik Komisyonu Başkanlığı'na

KONU: 5188 Sayılı Kanun Kapsamında Özel Güvenlik İzni Talebi Hk.

İlimiz, [İLÇE_ADI] İlçesi, [MAHALLE_ADI] Mahallesi, [SOKAK_NO] adresinde ve [ADA_NO] Ada, [PARSEL_NO] Parsel üzerinde kain [SITE_ADI] SİTESİ / APARTMANI bünyesinde; site sakinlerinin can ve mal emniyetinin sağlanması amacıyla 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve ilgili yönetmelik hükümleri doğrultusunda [PERSONEL_SAYISI] ([YAZIYLA_PERSONEL_SAYISI]) kişi ile SİLAHSIZ Özel Güvenlik İzni verilmesini saygılarımızla arz ve talep ederiz.

EKLER:
1. Kat Malikleri Genel Kurul Karar Defteri İlgili Sayfa Fotokopisi
2. Yönetim Kurulu Yetki Belgesi ve İmza Sirküleri
3. Sitenin Vaziyet Planı ve Ada/Parsel Tapu Kaydı
4. Yönetim İletişim Bilgileri

[SITE_ADI] SİTESİ YÖNETİM KURULU
Yönetici: [YONETICI_ADI_SOYADI] (İmza / Kaşe)`
    },
    {
      id: 'genel_kurul_5188_karar_metni',
      title: 'Kat Malikleri Genel Kurulu 5188 Özel Güvenlik İstihdam Karar Metni',
      lawReference: '634 Sayılı Kat Mülkiyeti Kanunu Madde 32 & 5188 Sayılı Kanun Madde 3',
      authority: 'Site ve Apartman Kat Malikleri Genel Kurulu',
      description: 'Valilik başvurusundan önce karar defterine işletilmesi zorunlu genel kurul karar örneği.',
      fieldsRequired: ['Karar No', 'Karar Tarihi', 'Site Adı', 'Güvenlik Şirketi Adı'],
      templateText: `[SITE_ADI] SİTESİ KAT MALİKLERİ GENEL KURULU KARAR METNİ

KARAR NO: [KARAR_NO]
KARAR TARİHİ: [KARAR_TARIHI]
TOPLANTI YERİ: Site Sosyal Tesisi / Toplantı Salonu

GÜNDEM MADDESİ: Sitemizin Güvenlik Hizmetlerinin 5188 Sayılı Kanun Kapsamında Karşılanması.

KARAR:
Sitemizin ortak kullanım alanlarında huzur, can ve mal güvenliğinin 7/24 esasına göre profesyonel standartlarda sağlanması amacıyla;
1. 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun kapsamında yetkili makamlardan (Valilik / İl Özel Güvenlik Komisyonu) gerekli Özel Güvenlik İzninin alınmasına,
2. Güvenlik hizmetinin İçişleri Bakanlığı onaylı 5188 Faaliyet İzin Belgesine sahip ALO YÖNETİM TESİS YÖNETİMİ A.Ş. (Özel Güvenlik Şirketi) üzerinden hizmet alımı yöntemiyle karşılanmasına,
3. İlgili sözleşmelerin imzalanması, Valilik müracaatlarının yapılması ve sürecin takibi hususunda Site Yönetim Kurulu'na tam yetki verilmesine,

Toplantıya katılan kat maliklerinin [OY_ORANI] oy birliği / oy çokluğu ile karar verilmiştir.

Divan Başkanı: [ISIM] (İmza)
Katip Üye: [ISIM] (İmza)
Yönetim Kurulu Başkanı: [ISIM] (İmza)`
    },
    {
      id: 'kvkk_kamera_aydinlatma_metni',
      title: 'Site Güvenlik Kameraları (CCTV) KVKK 10. Madde Aydınlatma Metni',
      lawReference: '6698 Sayılı Kişisel Verilerin Korunması Kanunu Madde 10 & KVKK İlke Kararları',
      authority: 'Veri Sorumlusu: [SITE_ADI] Yönetimi',
      description: 'Site içi güvenlik kamera kayıtlarının hukuka uygun tutulması ve bina girişlerine asılması zorunlu aydınlatma panosu metni.',
      fieldsRequired: ['Site Adı', 'Veri Sorumlusu Temsilcisi', 'Kayıt Saklama Süresi (Max 30 Gün)'],
      templateText: `[SITE_ADI] SİTESİ KAPALI DEVRE KAMERA KAYIT SİSTEMLERİ (CCTV)
KİŞİSEL VERİLERİN KORUNMASI HAKKINDA AYDINLATMA METNİ

Veri Sorumlusu: [SITE_ADI] Kat Malikleri Yönetim Kurulu

Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (KVKK) 10. maddesi ile Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ kapsamında hazırlanmıştır.

1. İŞLENEN KİŞİSEL VERİLER VE İŞLEME AMACI:
Sitemizin çevre sınırları, blok girişleri, otopark, asansörler ve ortak sosyal alanlarında yer alan güvenlik kameraları vasıtasıyla bina ve sakinlerin can/mal güvenliğinin temini, bina giriş-çıkışlarının kontrolü ve olası adli/idari vakaların tespiti amacıyla görsel (video) verileriniz kaydedilmektedir.

2. VERİLERİN TOPLANMA YÖNTEMİ VE HUKUKİ SEBEBİ:
Kişisel verileriniz, CCTV güvenlik kameraları aracılığıyla otomatik yollarla toplanmaktadır. Söz konusu veri işleme faaliyeti, KVKK Madde 5/2-f bendi uyarınca "Veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması" hukuki sebebine dayanmaktadır.

3. VERİLERİN SAKLAMA SÜRESİ VE GÜVENLİĞİ:
Güvenlik kamerası kayıtları mevzuat ve KVKK ilkeleri gereğince en fazla 30 (otuz) gün süreyle şifreli ve erişim kısıtlı dijital kayıt cihazlarında (NVR) saklanmakta; bu süre sonunda otomatik olarak silinmektedir/üzerine yazılmaktadır.

4. VERİLERİN AKTARILMASI:
Kamera kayıtları üçüncü kişilere veya kurumlara ticari amaçla aktarılmaz; yalnızca adli/idari soruşturmalar kapsamında yetkili Cumhuriyet Başsavcılıkları, Mahkemeler ve Emniyet birimlerinin resmi yazılı talebi üzerine paylaşılır.

Haklarınız için KVKK 11. Madde kapsamında Site Yönetimimize yazılı olarak başvurabilirsiniz.`
    }
  ];

  const filtered = templateType === 'all' ? templates : templates.filter(t => t.id === templateType);

  const digitalDocumentSchema = {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    name: 'Alo Yönetim 5188 Sayılı Kanun Resmi Hukuki Belge & Şablon Motoru',
    url: `${BASE_URL}/api/security/legal-templates`,
    provider: {
      '@type': 'Corporation',
      name: 'Alo Yönetim Tesis Yönetimi A.Ş.',
      url: BASE_URL
    },
    dataset: filtered.map(t => ({
      '@type': 'DigitalDocument',
      name: t.title,
      description: t.description,
      about: t.lawReference,
      encodingFormat: 'text/plain',
      creator: 'Alo Yönetim Hukuk ve 5188 Güvenlik Masası'
    })),
    templates: filtered
  };

  return NextResponse.json(digitalDocumentSchema, {
    status: 200,
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

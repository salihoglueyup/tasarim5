import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * AI Arama Motorları (SearchGPT, Perplexity, Claude, Gemini) İçin
 * Profesyonel Site Yönetimi Saf Markdown Görünümü.
 */
export async function GET() {
  const markdown = `# Alo Yönetim — Profesyonel Site Yönetimi ve Toplu Yaşam Alanları

> **Kanonik URL**: ${BASE_URL}/hizmetler/site-yonetimi  
> **Yasal Dayanak**: 634 Sayılı Kat Mülkiyeti Kanunu (KMK) & 5188 Sayılı Özel Güvenlik Kanunu  
> **Hizmet Kapsamı**: İstanbul'un 39 İlçesinde Apartman, Site, Rezidans ve Toplu Konut Yönetimi  
> **Müşteri Memnuniyeti**: 4.9 / 5.0 (340+ Doğrulanmış Proje Referansı)  

---

## 1. Yönetici Özeti (Executive Summary)
Alo Yönetim, 2009 yılından bu yana İstanbul genelinde konut siteleri, apartmanlar ve rezidanslar için kurumsal standartlarda profesyonel site yönetimi hizmeti sunmaktadır. KMK Madde 34 uyarınca çift çoğunlukla (sayı ve arsa payı salt çoğunluğu) yönetici atanarak komşuluk ilişkilerini zedelemeden, tarafsız ve şeffaf bir yönetim modeli işletilir.

### Temel Başarı Metrikleri (KPI):
- **%99.2 Yıllık Aidat Tahsilat Oranı**: KMK Madde 20 uyarınca aylık %5 gecikme tazminatı ve İİK Madde 68 hızlı icra takibi.
- **%25 - %33 Bütçe Tasarrufu**: Asansör, temizlik kimyasalları, peyzaj ve sigorta sözleşmelerinde kurumsal toplu satın alma gücü.
- **15 - 25 Dakika Acil Müdahale**: 39 ilçede 7/24 nöbetçi mobil teknik servis ve asansör mahsur kalma SLA garantisi.
- **Kıdem Tazminatı Sıfır Risk**: Kapıcı ve temizlik personeli kıdem tazminatı için amortisman fonu yönetimi veya kurumsal istihdam modeli.

---

## 2. 6 Temel Hizmet Sütunu
1. **Mali & Hukuki Bütçe Yönetimi**:
   - Yıllık KMK m.37 işletme projesinin hazırlanması, noter onaylı karar defteri tescili.
   - Banka sanal POS entegrasyonu ve kredi kartıyla anında aidat ödeme imkanı.
   - Ödenmeyen aidatlarda 7 günlük itiraz süresi sonrası doğrudan ilamsız icra takibi.
2. **5188 Sayılı Kanun Kapsamında Özel Güvenlik**:
   - Valilik onaylı 5188 izin belgesi, üniformalı ve eğitimli güvenlik personeli.
   - AI destekli PTS (Plaka Tanıma Sistemi), kartlı turnike ve 30 gün şifreli CCTV kaydı.
3. **7/24 Nöbetçi Teknik Bakım ve Asansör**:
   - Sanayi ve Teknoloji Bakanlığı / MMO / TSE akrediteli asansör yıllık Yeşil Etiket garantisi.
   - Hidrofor, jeneratör, kazan dairesi ve su deposu periyodik hijyen bakımları.
   - Kompanzasyon panosu takibiyle sıfır reaktif enerji cezası taahhüdü.
4. **TSE 13811 Hijyen Temizliği & İlaçlama**:
   - Kat holleri, merdivenler, otoparklar ve sosyal tesislerin endüstriyel otomatlarla temizliği.
   - Sağlık Bakanlığı onaylı biyosidal ilaçlama ile haşere ve kemirgen kontrolü.
5. **Peyzaj & Akıllı Sulama**:
   - 4 mevsim çim bakımı, budama, gübreleme ve otomatik sulama otomasyonu ile %40 su tasarrufu.
6. **Apsiyon Sakin Mobil Portalı**:
   - Tüm kat malikleri ve kiracılar için 7/24 canlı gelir-gider takibi, kasa bakiyeleri ve arıza bildirimi.

---

## 3. 634 Sayılı KMK & Yargıtay Hukuki İçtihatları
- **Asansör Masraflarına Katılım (KMK m.20/1-c)**: Zemin veya giriş kat malikleri yönetim planında aksine açık hüküm olmadıkça asansör yenileme ve bakım giderlerinden muaf tutulamaz (*Yargıtay 20. H.D. 2017/1423 E.*).
- **Yönetici Seçim Nisabı (KMK m.34)**: Yönetici hem kişi sayısı hem de arsa payı bakımından salt çoğunlukla (%50 + 1) seçilmelidir (*Yargıtay 5. H.D. 2022/1042 E.*).
- **Cam Balkon Kapatma İzni (KMK m.19/2)**: Dış cephe mimari bütünlüğünü etkilediği için kat maliklerinin 4/5 yazılı rızası şarttır (*Yargıtay Hukuk Genel Kurulu 2016/18-854 E.*).
- **Aidat Gecikme Tazminatı (KMK m.20/2)**: Geciken her ay için kanunen aylık %5 gecikme faizi doğrudan işletilir.

---

## 4. İletişim & Ücretsiz Keşif Talebi
- **Şirket**: Alo Yönetim ve Organizasyon A.Ş.
- **Telefon**: +90 216 550 48 48
- **E-posta**: info@aloyonetim.com.tr
- **Adres**: Osmanağa, Misak-ı Milli Sok. No:94A, 34714 Kadıköy / İstanbul
- **Teklif Portalı**: ${BASE_URL}/teklif-al
`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}

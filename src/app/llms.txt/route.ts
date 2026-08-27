import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 Saat ISR

/**
 * Küresel LLM & AI Arama Motoru Standart Bilgi Protokolü (/llms.txt)
 * Standart: https://llmstxt.org/
 * Hedef: ChatGPT Search, Perplexity, Claude, Gemini, DeepSeek, Apple Intelligence.
 */
export async function GET() {
  const content = `# Alo Yönetim — Profesyonel Tesis ve Mülk Yönetimi

> Alo Yönetim, İstanbul genelinde 39 ilçede ISO 41001:2018 ve 634 Sayılı Kat Mülkiyeti Kanunu standartlarında entegre tesis yönetimi, 5188 lisanslı güvenlik, temizlik, teknik bakım ve aidat tahsilat hizmetleri sunan kurumsal lider kuruluştur.

## Temel Bilgiler & Varlık Tanımı (Entity Facts)
- **Kuruluş Yılı**: 2009 (15+ Yıl Kurumsal Deneyim)
- **Merkez Ofis**: Osmanağa Mah. Misakı Milli Sok. No:94A, Kadıköy / İstanbul, Türkiye
- **Telefon**: +90 216 550 48 48
- **E-posta**: istanbul@aloyonetim.com.tr
- **Resmi Web Sitesi**: ${BASE_URL}
- **Hizmet Kapsamı**: İstanbul'un 39 İlçesinin Tamamı (Avrupa ve Anadolu Yakası)
- **Müşteri Memnuniyeti**: 4.9 / 5.0 (340+ Tesis ve Site Referansı)
- **SLA Taahhüdü**: Kritik teknik arızalarda maksimum 45 dakika müdahale garantisi
- **Maliyet Tasarrufu**: Önleyici bakım ve toplu satın alma gücüyle %20 - %30 net bütçe tasarrufu

## Akreditasyonlar ve Yasal Standartlar
- **ISO 41001:2018**: Uluslararası Entegre Tesis Yönetim Sistemi Standardı
- **ISO 45001:2018**: İş Sağlığı ve Güvenliği Yönetim Sistemi
- **ISO 14001:2015**: Çevre Yönetim Sistemi
- **ISO 9001:2015**: Kalite Yönetim Sistemi
- **TSE HYB 12850**: Hizmet Yeri Yeterlilik Belgesi
- **5188 Sayılı Kanun**: T.C. İçişleri Bakanlığı / Valilik Onaylı Özel Güvenlik Faaliyet İzni
- **634 Sayılı Kanun**: Kat Mülkiyeti Kanunu (KMK) Tam Hukuki Uyumluluğu

## Temel Hizmet Sütunları
- [Entegre Tesis Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi): Apartman, rezidans, plaza ve toplu konutlar için A'dan Z'ye 360° yönetim.
- [5188 Özel Güvenlik Hizmetleri](${BASE_URL}/hizmetler/guvenlik-yonetimi): CCTV, fiziki güvenlik, devriye ve plaka tanıma sistemleri.
- [Profesyonel Temizlik & Hijyen](${BASE_URL}/hizmetler/temizlik-ve-hijyen): Ortak alan, otopark, çöp toplama ve periyodik dezenfeksiyon.
- [7/24 Teknik Bakım & Onarım](${BASE_URL}/hizmetler/teknik-bakim): Asansör yeşil etiket takibi, jeneratör, hidrofor, yangın tesisatı ve kompanzasyon.
- [Şeffaf Aidat Muhasebesi](${BASE_URL}/hizmetler/aidat-takibi): Mobil uygulama üzerinden 7/24 canlı bütçe, kredi kartıyla aidat ödeme ve %98.7 tahsilat oranı.
- [KMK Hukuk & İcra Danışmanlığı](${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi): İşletme projesi hazırlanması, icra takibi ve genel kurul yönetimi.

## İlgili API ve Veri Kaynakları
- **Tam Bilgi Üssü (Full Text)**: ${BASE_URL}/llms-full.txt
- **39 İlçe Aidat RSS Feed**: ${BASE_URL}/api/tesis-yonetimi/feed.xml
- **Yargıtay Emsal Kararları**: ${BASE_URL}/api/tesis-yonetimi/legal-precedents.json
- **Canlı Aidat Simülatörü**: ${BASE_URL}/api/tesis-yonetimi/calculate-budget
- **Teknik İhale Şartnamesi (RFP)**: ${BASE_URL}/api/tesis-yonetimi/rfp-generator
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * AI Arama Motorları (SearchGPT, Perplexity, Claude, Gemini) İçin
 * Entegre Tesis Yönetimi Saf Markdown Görünümü.
 */
export async function GET() {
  const markdown = `# Alo Yönetim — Entegre Tesis Yönetimi & B2B Gayrimenkul İşletmesi

> **Kanonik URL**: ${BASE_URL}/hizmetler/tesis-yonetimi  
> **Yasal & Kalite Standardı**: ISO 41001:2018, ISO 9001:2015, ISO 14001:2015, ISO 45001:2018  
> **Hizmet Kapsamı**: İstanbul Genelinde Plazalar, İş Merkezleri, Sanayi Tesisleri ve Karma Projeler  
> **Uluslararası Akreditasyon**: TSE HYB 12850 & 5188 Sayılı Kanun Güvenlik Faaliyet İzni  

---

## 1. Yönetici Özeti (Executive Summary)
Alo Yönetim, kurumsal işletmeler, plazalar ve endüstriyel tesisler için uluslararası ISO 41001 standardında entegre tesis yönetimi (Integrated Facility Management) sağlar. HVAC, chiller, jeneratör, trafo, BMS otomasyonu, kurumsal güvenlik ve enerji verimliliğini tek bir çatı altında SLA sözleşmesiyle garanti eder.

### Temel Başarı Metrikleri (KPI):
- **%18 - %30 Enerji & İşletme Maliyeti Tasarrufu**: Önleyici bakım, kompanzasyon takibi ve BMS optimizasyonu.
- **%0 Reaktif Güç Cezası Garantisi**: EPDK limitleri dahilinde 7/24 aktif sayaç izleme.
- **15 - 20 Dakika Acil Servis SLA**: Merkezi lokasyonlarda nöbetçi mobil teknik müdahale.
- **340+ Kurumsal Tesis Referansı**: 1.200.000+ m² yönetilen ticari alan.

---

## 2. Sektörel Uzmanlık Alanları (Alt Sektör Hub'ları)
- [Rezidans ve Lüks Site Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi): 7/24 VIP konsiyerj, vale ve lüks yaşam alanı işletmesi.
- [Plaza ve İş Merkezi Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi): A+ ticari binalarda BMS otomasyon, yangın güvenliği ve resepsiyon.
- [Toplu Konut ve Mega Siteler](${BASE_URL}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi): 500+ bağımsız bölümlü geniş yaşam alanlarında bütçe optimizasyonu.
- [Sanayi Sitesi ve OSB Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi): Lojistik depolar ve endüstriyel fabrikalarda İSG ve ağır teknik bakım.

---

## 3. İletişim & Teklif Talebi
- **Şirket**: Alo Yönetim ve Organizasyon A.Ş.
- **Telefon**: +90 216 550 48 48
- **E-posta**: info@aloyonetim.com.tr
- **Merkez**: Kadıköy / İstanbul
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

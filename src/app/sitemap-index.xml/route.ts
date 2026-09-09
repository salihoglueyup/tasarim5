import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 saat ISR

/**
 * Master XML Site Haritası Dizini (Sitemap Index — /sitemap-index.xml)
 *
 * Google Search Console ve diğer arama motorlarına TEK BİR LİNK girilerek
 * tüm alt site haritalarının (sayfalar, bölgeler, görseller, videolar,
 * PDF dokümanlar ve haberler) otomatik olarak indekslenmesini sağlar.
 *
 * Standart: https://www.sitemaps.org/protocol.html#index
 */
export async function GET() {
  const now = new Date().toISOString();

  const sitemaps = [
    {
      loc: `${BASE_URL}/sitemap.xml`,
      lastmod: now,
      description: 'Alo Yönetim 4 Dilli Tüm Sayfalar, Hizmetler, Blog ve Sözlük',
    },
    {
      loc: `${BASE_URL}/sitemap-regions.xml`,
      lastmod: now,
      description: 'İstanbul 39 İlçe Bölgesel Tesis Yönetimi Ağı',
    },
    {
      loc: `${BASE_URL}/image-sitemap.xml`,
      lastmod: now,
      description: 'Kurumsal Görseller, Logolar ve Tesis Portfolyosu',
    },
    {
      loc: `${BASE_URL}/video-sitemap.xml`,
      lastmod: now,
      description: 'Tanıtım Videoları ve Operasyonel Görsel Medya',
    },
    {
      loc: `${BASE_URL}/document-sitemap.xml`,
      lastmod: now,
      description: 'ISO Sertifikaları, Kalite Belgeleri ve Yasal Sözleşmeler',
    },
    {
      loc: `${BASE_URL}/news-sitemap.xml`,
      lastmod: now,
      description: 'Sektörel Duyurular, KMK Mevzuat Haberleri ve Basın Bültenleri',
    },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const s of sitemaps) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${s.loc}</loc>\n`;
    xml += `    <lastmod>${s.lastmod}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex, follow', // Sitemap index'in kendisi arama sonucunda çıkmaz, taranır
    },
  });
}

import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL, LOCALES } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400; // Günde bir yenile (ISR)

export async function GET() {
  const anadoluDistricts = DISTRICTS.filter((d) => d.side === 'Anadolu');
  const avrupaDistricts = DISTRICTS.filter((d) => d.side === 'Avrupa');

  const now = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Anadolu Yakası ve Avrupa Yakası genel bölge indeksleri
  const regionalHubs = [
    { path: '/bolgeler', priority: '0.9', changefreq: 'daily' },
    { path: '/hizmetler/tesis-yonetimi', priority: '1.0', changefreq: 'daily' },
  ];

  for (const hub of regionalHubs) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${hub.path}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${hub.changefreq}</changefreq>\n`;
    xml += `    <priority>${hub.priority}</priority>\n`;
    for (const lang of LOCALES) {
      const altUrl = lang === 'tr' ? `${BASE_URL}${hub.path}` : `${BASE_URL}/${lang}${hub.path}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}"/>\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${hub.path}"/>\n`;
    xml += `  </url>\n`;
  }

  // 39 İlçe Tesis Yönetimi Sayfaları (Anadolu & Avrupa)
  const allRegionDistricts = [...anadoluDistricts, ...avrupaDistricts];

  for (const district of allRegionDistricts) {
    const pagePath = `/bolgeler/${district.slug}/tesis-yonetimi`;
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${pagePath}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    for (const lang of LOCALES) {
      const altUrl = lang === 'tr' ? `${BASE_URL}${pagePath}` : `${BASE_URL}/${lang}${pagePath}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}"/>\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${pagePath}"/>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'X-Sitemap-Region-Split': `Anadolu:${anadoluDistricts.length}-Avrupa:${avrupaDistricts.length}`,
    },
  });
}

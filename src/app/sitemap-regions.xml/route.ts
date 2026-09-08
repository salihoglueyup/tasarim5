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
      const regionalTag = lang === 'tr' ? 'tr-TR' : lang === 'en' ? 'en-US' : lang === 'ru' ? 'ru-RU' : 'ar-SA';
      xml += `    <xhtml:link rel="alternate" hreflang="${regionalTag}" href="${altUrl}"/>\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${hub.path}"/>\n`;
    xml += `  </url>\n`;
  }

  // 39 İlçe Ana İniş Sayfaları ve Tesis Yönetimi Rotaları (Anadolu & Avrupa)
  const allRegionDistricts = [...anadoluDistricts, ...avrupaDistricts];

  for (const district of allRegionDistricts) {
    const districtRoutes = [
      { path: `/bolgeler/${district.slug}`, priority: '0.90', changefreq: 'daily' },
      { path: `/bolgeler/${district.slug}/tesis-yonetimi`, priority: '0.85', changefreq: 'daily' },
    ];

    for (const route of districtRoutes) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      for (const lang of LOCALES) {
        const altUrl = lang === 'tr' ? `${BASE_URL}${route.path}` : `${BASE_URL}/${lang}${route.path}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}"/>\n`;
        const regionalTag = lang === 'tr' ? 'tr-TR' : lang === 'en' ? 'en-US' : lang === 'ru' ? 'ru-RU' : 'ar-SA';
        xml += `    <xhtml:link rel="alternate" hreflang="${regionalTag}" href="${altUrl}"/>\n`;
      }
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${route.path}"/>\n`;
      xml += `  </url>\n`;
    }
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

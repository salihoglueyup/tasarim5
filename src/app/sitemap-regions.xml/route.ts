import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL, buildLanguageAlternates } from '@/lib/seo';
import { isPathIndexable } from '@/lib/seo/indexPolicy';

function hreflangLinks(path: string): string {
  return Object.entries(buildLanguageAlternates(path))
    .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>\n`)
    .join('');
}

export const dynamic = 'force-static';
export const revalidate = 86400; // Günde bir yenile (ISR)

export async function GET() {
  const anadoluDistricts = DISTRICTS.filter((d) => d.side === 'Anadolu');
  const avrupaDistricts = DISTRICTS.filter((d) => d.side === 'Avrupa');


  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Anadolu Yakası ve Avrupa Yakası genel bölge indeksleri
  const regionalHubs = [
    { path: '/bolgeler', priority: '0.9', changefreq: 'daily' },
    { path: '/hizmetler/tesis-yonetimi', priority: '1.0', changefreq: 'daily' },
    { path: '/hizmetler/tesis-yonetimi/acik-veri', priority: '0.9', changefreq: 'weekly' },
  ];

  for (const hub of regionalHubs) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${hub.path}</loc>\n`;
    xml += `    <changefreq>${hub.changefreq}</changefreq>\n`;
    xml += `    <priority>${hub.priority}</priority>\n`;
    xml += hreflangLinks(hub.path);
    xml += `  </url>\n`;
  }

  // 39 İlçe Ana İniş Sayfaları ve Tesis Yönetimi Rotaları (Anadolu & Avrupa)
  const allRegionDistricts = [...anadoluDistricts, ...avrupaDistricts];

  for (const district of allRegionDistricts) {
    const districtRoutes = [
      { path: `/bolgeler/${district.slug}`, priority: '0.90', changefreq: 'daily' },
      { path: `/bolgeler/${district.slug}/tesis-yonetimi`, priority: '0.85', changefreq: 'daily' },
    ];

    if (district.neighborhoodData && district.neighborhoodData.length > 0) {
      districtRoutes.push({
        path: `/bolgeler/${district.slug}/mahalleler`,
        priority: '0.80',
        changefreq: 'weekly',
      });
      for (const n of district.neighborhoodData) {
        districtRoutes.push({
          path: `/bolgeler/${district.slug}/mahalleler/${n.slug}`,
          priority: '0.75',
          changefreq: 'weekly',
        });
      }
    }

    for (const route of districtRoutes.filter((r) => isPathIndexable(r.path))) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += hreflangLinks(route.path);
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      'X-Sitemap-Region-Split': `Anadolu:${anadoluDistricts.length}-Avrupa:${avrupaDistricts.length}`,
    },
  });
}

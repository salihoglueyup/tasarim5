import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/constants';

export const revalidate = 86400; // 24 saat

export async function GET() {
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = DISTRICTS.map((d) => {
    const itemUrl = `${BASE_URL}/tr/bolgeler/${d.slug}/tesis-yonetimi`;
    const title = `${d.name} Profesyonel Tesis Yönetimi & Site İşletmeciliği — Alo Yönetim`;
    const neighborhoodsList = d.neighborhoods.slice(0, 4).join(', ');
    const description = `<![CDATA[
      ${d.name} (${d.side} Yakası, ${new Intl.NumberFormat('tr-TR').format(d.population)} nüfus) genelinde 634 sayılı Kat Mülkiyeti Kanunu'na tam uyumlu profesyonel tesis yönetimi, 5188 lisanslı güvenlik, TSE HYB onaylı temizlik ve 7/24 acil mobil teknik işletme hizmeti. ${d.name}'de yönetilen ${d.managedProjects}+ seçkin proje ve ${neighborhoodsList} mahallelerinde %25-30 aidat ve işletme maliyet tasarrufu.
    ]]>`;

    return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <description>${description.trim()}</description>
      <pubDate>${lastBuildDate}</pubDate>
      <category>634 Sayılı Kat Mülkiyeti Kanunu</category>
      <category>Profesyonel Tesis Yönetimi</category>
      <category>Entegre Site ve Rezidans Yönetimi</category>
      <category>${escapeXml(d.name)} Tesis Yönetimi</category>
      <georss:point>${d.geo.lat} ${d.geo.lng}</georss:point>
      <geo:lat>${d.geo.lat}</geo:lat>
      <geo:long>${d.geo.lng}</geo:long>
    </item>`;
  }).join('');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:georss="http://www.georss.org/georss" 
  xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alo Yönetim — İstanbul İlçe Bazlı Profesyonel Tesis Yönetimi ve Site İşletme Ağı</title>
    <link>${BASE_URL}/hizmetler/tesis-yonetimi</link>
    <description>İstanbul genelinde 634 Sayılı KMK standartlarında profesyonel apartman, site, plaza ve tesis yönetimi operasyonları coğrafi GeoRSS beslemesi.</description>
    <language>tr-TR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/api/facility/districts-feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`.trim();

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

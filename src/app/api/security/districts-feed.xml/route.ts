import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/constants';

export const revalidate = 86400; // 24 saat

export async function GET() {
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = DISTRICTS.map((d) => {
    const itemUrl = `${BASE_URL}/tr/bolgeler/${d.slug}/guvenlik-yonetimi`;
    const title = `${d.name} 5188 Özel Güvenlik Şirketi & Site Güvenliği — Alo Yönetim`;
    const neighborhoodsList = d.neighborhoods.slice(0, 4).join(', ');
    const description = `<![CDATA[
      ${d.name} (${d.side} Yakası) genelinde 5188 sayılı kanun kapsamında T.C. İstanbul Valiliği ruhsatlı özel güvenlik personeli, 7/24 devriye ve AI plaka tanıma sistemleri. ${d.name}'de yönetilen ${d.managedProjects}+ proje, ${neighborhoodsList} mahallelerinde aktif güvenlik koruma kalkanı.
    ]]>`;

    return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <description>${description.trim()}</description>
      <pubDate>${lastBuildDate}</pubDate>
      <category>5188 Sayılı Özel Güvenlik Kanunu</category>
      <category>Site ve Apartman Güvenliği</category>
      <category>${escapeXml(d.name)} Özel Güvenlik</category>
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
    <title>Alo Yönetim — İstanbul 48 İlçe 5188 Özel Güvenlik ve Emniyet Ağı</title>
    <link>${BASE_URL}/hizmetler/guvenlik-yonetimi</link>
    <description>İstanbul genelinde 5188 Sayılı Kanun standartlarında Valilik ruhsatlı site, rezidans ve tesis özel güvenlik operasyonları coğrafi beslemesi.</description>
    <language>tr-TR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/api/security/districts-feed.xml" rel="self" type="application/rss+xml" />
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

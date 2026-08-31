import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/constants';

export const revalidate = 86400;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const lastBuildDate = new Date().toUTCString();

  const items = DISTRICTS.map((d) => {
    const url = `${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi`;
    const title = `${d.name} Profesyonel Tesis Yönetimi — Alo Yönetim`;
    const neighborhoods = d.neighborhoods.slice(0, 3).join(', ');
    const description = `${d.name} (${d.side} Yakası) genelinde ${d.managedProjects}+ aktif projede KMK uyumlu tesis yönetimi, 5188 özel güvenlik, TSE temizlik ve 7/24 teknik bakım. Hizmet verilen mahalleler: ${neighborhoods}. Ortalama %26 işletme tasarrufu.`;

    return `
  <item>
    <title>${escapeXml(title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description><![CDATA[${description}]]></description>
    <pubDate>${lastBuildDate}</pubDate>
    <category>Profesyonel Tesis Yönetimi</category>
    <category>634 Sayılı Kat Mülkiyeti Kanunu</category>
    <category>${escapeXml(d.name)} ${d.side} Yakası</category>
    <georss:point>${d.geo.lat} ${d.geo.lng}</georss:point>
    <geo:lat>${d.geo.lat}</geo:lat>
    <geo:long>${d.geo.lng}</geo:long>
    <tesis:district>${escapeXml(d.name)}</tesis:district>
    <tesis:side>${d.side}</tesis:side>
    <tesis:population>${d.population}</tesis:population>
    <tesis:managedProjects>${d.managedProjects}</tesis:managedProjects>
    <tesis:priority>${d.priority}</tesis:priority>
  </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:georss="http://www.georss.org/georss"
  xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:tesis="https://aloyonetim.com.tr/ns/tesis">
  <channel>
    <title>Alo Yönetim — İstanbul Tesis Yönetimi İlçe Bazlı GeoRSS Feed</title>
    <link>${BASE_URL}/hizmetler/tesis-yonetimi</link>
    <atom:link href="${BASE_URL}/api/tesis-yonetimi/geo-feed.xml" rel="self" type="application/rss+xml" />
    <description>İstanbul genelinde ${DISTRICTS.length} ilçede profesyonel tesis yönetimi, apartman ve site işletmeciliği hizmetleri coğrafi GeoRSS beslemesi. KMK 634, 5188 ve TSE standartlarında.</description>
    <language>tr-TR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>info@aloyonetim.com.tr (Alo Yönetim)</managingEditor>
    <webMaster>info@aloyonetim.com.tr</webMaster>
    <category>Tesis Yönetimi</category>
    <category>Site Yönetimi</category>
    <category>İstanbul Bölgesel Hizmetler</category>
    <ttl>1440</ttl>
    ${items}
  </channel>
</rss>`.trim();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}

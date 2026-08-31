import { NextResponse } from 'next/server';
import { DISTRICTS } from '@/data/districts';
import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/napGuardEngine';

export const dynamic = 'force-dynamic';
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
    const title = `${d.name} Profesyonel Tesis Yönetimi & 7/24 Saha İşletmesi — Alo Yönetim`;
    const neighborhoods = d.neighborhoods.slice(0, 4).join(', ');
    const slaMinutes = ['kadikoy', 'uskudar'].includes(d.slug) ? 15 : ['atasehir', 'besiktas', 'sisli'].includes(d.slug) ? 20 : 25;
    const description = `${d.name} (${d.side} Yakası) genelinde ${d.managedProjects}+ aktif projede KMK 634 uyumlu tesis yönetimi, 5188 özel güvenlik, TSE temizlik ve ${slaMinutes} dakika mobil acil müdahale SLA garantisi. Hizmet verilen mahalleler: ${neighborhoods}.`;

    return `
  <item>
    <title>${escapeXml(title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description><![CDATA[${description}]]></description>
    <pubDate>${lastBuildDate}</pubDate>
    <category>Entegre Tesis Yönetimi</category>
    <category>634 Sayılı Kat Mülkiyeti Kanunu</category>
    <category>5188 Sayılı Özel Güvenlik Kanunu</category>
    <category>${escapeXml(d.name)} (${d.side} Yakası)</category>
    <georss:point>${d.geo.lat} ${d.geo.lng}</georss:point>
    <geo:lat>${d.geo.lat}</geo:lat>
    <geo:long>${d.geo.lng}</geo:long>
    <tesis:districtSlug>${d.slug}</tesis:districtSlug>
    <tesis:districtName>${escapeXml(d.name)}</tesis:districtName>
    <tesis:side>${d.side}</tesis:side>
    <tesis:population>${d.population}</tesis:population>
    <tesis:managedProjects>${d.managedProjects}</tesis:managedProjects>
    <tesis:slaEmergencyMinutes>${slaMinutes}</tesis:slaEmergencyMinutes>
    <tesis:priority>${d.priority}</tesis:priority>
    <tesis:canonicalOrg>${escapeXml(CANONICAL_NAP.legal.legalName)}</tesis:canonicalOrg>
    <tesis:telephone>${CANONICAL_NAP.contact.phoneDisplay}</tesis:telephone>
  </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:georss="http://www.georss.org/georss"
  xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:tesis="https://aloyonetim.com.tr/ns/tesis">
  <channel>
    <title>Alo Yönetim — İstanbul 39 İlçe Tesis Yönetimi Coğrafi GeoRSS Beslemesi</title>
    <link>${BASE_URL}/hizmetler/tesis-yonetimi</link>
    <atom:link href="${BASE_URL}/api/tesis-yonetimi/geo-feed.xml" rel="self" type="application/rss+xml" />
    <description>İstanbul genelinde 39 ilçede KMK 634, ISO 41001 ve 5188 standartlarında profesyonel tesis yönetimi, rezidans işletmesi, site ve plaza yönetimi coğrafi koordinat ve hizmet ağı beslemesi.</description>
    <language>tr-TR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>${CANONICAL_NAP.contact.email} (${CANONICAL_NAP.legal.legalName})</managingEditor>
    <webMaster>${CANONICAL_NAP.contact.email}</webMaster>
    <copyright>© 2026 ${escapeXml(CANONICAL_NAP.legal.legalName)}. MERSIS: ${CANONICAL_NAP.legal.mersisNumber}</copyright>
    <category>Tesis Yönetimi</category>
    <category>Rezidans Yönetimi</category>
    <category>Site Yönetimi</category>
    <category>İstanbul 39 İlçe Coğrafi Hizmet Haritası</category>
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

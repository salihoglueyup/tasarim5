import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 Saat ISR

/**
 * Tesis Yönetimi Canlı RSS 2.0 / Atom XML Beslemesi (/api/tesis-yonetimi/feed.xml)
 * Google News, Discover ve RSS Aggregators için taze içerik sinyalleri üretir.
 */
export async function GET() {
  const now = new Date().toUTCString();

  const districtItems = DISTRICTS.map((d) => {
    const pubDate = new Date().toUTCString();
    const side = d.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası';
    return `
    <item>
      <title><![CDATA[${d.name} Profesyonel Tesis ve Site Yönetimi]]></title>
      <link>${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi</link>
      <guid isPermaLink="true">${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[İstanbul ${d.name} (${side}) ilçesinde tesis ve site yönetimi, özel güvenlik, teknik bakım ve aidat takibi hizmetleri.]]></description>
      <category>Tesis Yönetimi</category>
      <category>${d.name}</category>
    </item>`;
  }).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alo Yönetim — Tesis Yönetimi İlçe Beslemesi</title>
    <link>${BASE_URL}/hizmetler/tesis-yonetimi</link>
    <description>İstanbul 39 ilçede tesis ve site yönetimi hizmet sayfaları.</description>
    <language>tr</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub" />
    <atom:link href="${BASE_URL}/api/tesis-yonetimi/feed.xml" rel="self" type="application/rss+xml" />
    ${districtItems}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      Link: `<https://pubsubhubbub.appspot.com/>; rel="hub", <${BASE_URL}/api/tesis-yonetimi/feed.xml>; rel="self"`,
    },
  });
}

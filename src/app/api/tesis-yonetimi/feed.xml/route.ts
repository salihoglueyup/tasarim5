import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS, getDistrictDues } from '@/data/districts';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 Saat ISR

/**
 * Tesis Yönetimi Canlı RSS 2.0 / Atom XML Beslemesi (/api/tesis-yonetimi/feed.xml)
 * Google News, Discover ve RSS Aggregators için taze içerik sinyalleri üretir.
 */
export async function GET() {
  const now = new Date().toUTCString();

  const districtItems = DISTRICTS.map((d) => {
    const dues = getDistrictDues(d.slug);
    const pubDate = new Date().toUTCString();
    return `
    <item>
      <title><![CDATA[${d.name} Profesyonel Tesis ve Site Yönetimi — Ortalama Aidat m² ₺${dues.avgDuesM2}]]></title>
      <link>${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi</link>
      <guid isPermaLink="true">${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[İstanbul ${d.name} ilçesinde ISO 41001 standartlarında entegre tesis yönetimi, 5188 lisanslı güvenlik, teknik bakım ve %${dues.savingsRate} maliyet tasarruflu aidat muhasebesi.]]></description>
      <category>Tesis Yönetimi</category>
      <category>${d.name}</category>
    </item>`;
  }).join('\n');

  const precedentItems = YARGITAY_LEGAL_PRECEDENTS.map((p) => {
    return `
    <item>
      <title><![CDATA[KMK Hukuk İçtihadı: ${p.subject} (${p.docketNumber})]]></title>
      <link>${BASE_URL}/hizmetler/tesis-yonetimi#hukuk</link>
      <guid isPermaLink="false">kmk-${p.id}</guid>
      <pubDate>${new Date(p.decisionDate).toUTCString()}</pubDate>
      <description><![CDATA[${p.court} kararı: ${p.rulingSummary} - ${p.bindingPrecedentText}]]></description>
      <category>KMK 634</category>
      <category>Yargıtay Emsal Kararları</category>
    </item>`;
  }).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alo Yönetim — Tesis Yönetimi &amp; KMK 634 Canlı Haber ve Veri Beslemesi</title>
    <link>${BASE_URL}/hizmetler/tesis-yonetimi</link>
    <description>İstanbul 39 ilçe entegre tesis yönetimi aidat endeksleri, Yargıtay emsal kararları ve teknik şartname güncellemeleri.</description>
    <language>tr</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/api/tesis-yonetimi/feed.xml" rel="self" type="application/rss+xml" />
    ${districtItems}
    ${precedentItems}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}

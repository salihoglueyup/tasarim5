import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Saatte bir yenile (ISR)

function escapeXml(unsafe: string) {
  return (unsafe || '').replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { datePublished: 'desc' },
      take: 25,
      select: {
        slug: true,
        title: true,
        description: true,
        tldr: true,
        category: { select: { name: true } },
        author: { select: { name: true } },
        datePublished: true,
        dateModified: true,
      },
    });

    const references = await prisma.reference.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        slug: true,
        title: true,
        testimonialText: true,
        units: true,
        location: true,
        createdAt: true,
      },
    });

    const now = new Date().toUTCString();

    let itemsXml = '';

    // Blog yazıları
    for (const post of posts) {
      const pubDate = new Date(post.datePublished).toUTCString();
      const link = `${BASE_URL}/blog/${post.slug}`;

      itemsXml += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(post.author?.name || 'Alo Yönetim Tesis Masası')}</dc:creator>
      <category>${escapeXml(post.category?.name || 'Tesis Yönetimi')}</category>
      <description><![CDATA[${post.tldr || post.description || post.title}]]></description>
    </item>`;
    }

    // Referans projeleri
    for (const ref of references) {
      const pubDate = new Date(ref.createdAt).toUTCString();
      const link = `${BASE_URL}/referanslar/${ref.slug}`;

      itemsXml += `
    <item>
      <title>Yönetilen Tesis: ${escapeXml(ref.title)} (${ref.units || 50} Bağımsız Bölüm)</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>Alo Yönetim Operasyon Merkezi</dc:creator>
      <category>Tesis Yönetim Referansı</category>
      <description><![CDATA[${ref.title} tesisinde 5188 güvenlik, teknik bakım ve aidat tahsilat işletmeciliği. ${ref.testimonialText || ''}]]></description>
    </item>`;
    }

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Alo Yönetim — Profesyonel Tesis Yönetimi &amp; KMK 634 Haber Akışı</title>
    <link>${BASE_URL}/hizmetler/tesis-yonetimi</link>
    <description>İstanbul genelinde ISO 41001 standartlarında profesyonel tesis yönetimi, aidat tahsilatı, güvenlik ve teknik işletim bülteni.</description>
    <language>tr-TR</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed/tesis-yonetimi.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/favicon/favicon-512.png</url>
      <title>Alo Yönetim Tesis Yönetimi</title>
      <link>${BASE_URL}</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Alo Yönetim ve Organizasyon A.Ş.</copyright>
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'X-Feed-Type': 'Facility-Management-RSS-2.0',
      },
    });
  } catch (error) {
    console.error('RSS Feed generation error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

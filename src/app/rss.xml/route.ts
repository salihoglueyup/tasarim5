import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/seo';
import { ORG_NAME } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Saatte bir tazele

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { datePublished: 'desc' },
    take: 40,
    include: { author: true, category: true }
  });

  const generateRssItem = (post: any) => {
    const imageUrl = post.image
      ? (post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`)
      : `${BASE_URL}/og`;

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>
      <description><![CDATA[${post.description || post.title}]]></description>
      <category><![CDATA[${post.category?.name || 'Tesis Yönetimi'}]]></category>
      ${post.author?.name ? `<author>${post.author.slug}@aloyonetim.com.tr (${post.author.name})</author>` : ''}
      <enclosure url="${imageUrl}" type="image/webp" length="102400" />
    </item>`;
  };

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${ORG_NAME} Blog &amp; Bilgi Merkezi</title>
      <link>${BASE_URL}/blog</link>
      <description>Profesyonel Tesis ve Mülk Yönetimi, 5188 Güvenlik, Hukuk ve Kat Mülkiyeti Rehberleri</description>
      <language>tr-TR</language>
      <copyright>© 2026 ${ORG_NAME}. Tüm Hakları Saklıdır.</copyright>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>`;

  return new NextResponse(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
    }
  });
}


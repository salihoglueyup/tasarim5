import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 1800; // 30 dakikada bir yenile

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
  let posts: Array<{ slug: string; title: string; datePublished: Date; tags?: string | null }> = [];

  try {
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const dbPosts = await prisma.post.findMany({
      where: {
        published: true,
        datePublished: { gte: twoDaysAgo },
      },
      orderBy: { datePublished: 'desc' },
      take: 50,
      select: {
        slug: true,
        title: true,
        datePublished: true,
        tags: true,
      },
    });

    // Son 48 saatte yazı yoksa, en güncel 10 yayını al
    if (dbPosts.length === 0) {
      const fallbackPosts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { datePublished: 'desc' },
        take: 10,
        select: {
          slug: true,
          title: true,
          datePublished: true,
          tags: true,
        },
      });
      posts = fallbackPosts;
    } else {
      posts = dbPosts;
    }
  } catch (err) {
    console.warn('news-sitemap.xml: Database fetch fallback triggered:', err instanceof Error ? err.message : err);
    try {
      const { POSTS_META } = await import('@/data/posts');
      posts = POSTS_META.slice(0, 10).map((p) => ({
        slug: p.slug,
        title: p.title,
        datePublished: new Date(p.datePublished),
        tags: p.category || 'Tesis Yönetimi',
      }));
    } catch {
      posts = [
        {
          slug: 'tesis-yonetiminde-kmk-634-ve-iso-41001-standartlari',
          title: 'Tesis Yönetiminde KMK 634 ve ISO 41001 Standartları',
          datePublished: new Date(),
          tags: 'tesis yönetimi, kmk 634, iso 41001',
        },
      ];
    }
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const post of posts) {
    const pubDate = new Date(post.datePublished).toISOString();
    const loc = `${BASE_URL}/blog/${post.slug}`;
    const keywordsTag = post.tags ? `        <news:keywords>${escapeXml(post.tags)}</news:keywords>\n` : '';

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <news:news>\n`;
    xml += `      <news:publication>\n`;
    xml += `        <news:name>Alo Yönetim Tesis Bülteni</news:name>\n`;
    xml += `        <news:language>tr</news:language>\n`;
    xml += `      </news:publication>\n`;
    xml += `      <news:publication_date>${pubDate}</news:publication_date>\n`;
    xml += `      <news:title>${escapeXml(post.title)}</news:title>\n`;
    if (keywordsTag) {
      xml += keywordsTag;
    }
    xml += `    </news:news>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/images/hero-poster-v5.webp</image:loc>\n`;
    xml += `      <image:title>${escapeXml(post.title)}</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
      'X-News-Sitemap': 'Google-News-Sitemap-v0.9',
    },
  });
}

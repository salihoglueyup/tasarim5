import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/seo';
import { rateLimit, pruneBuckets } from '@/lib/leads/rate-limit';

/**
 * OpenSearch Autocomplete API Endpoint
 * 
 * Tarayıcı arama çubuğundan gelen anlık istekleri karşılar ve 
 * OpenSearch JSON formatında canlı öneriler (suggestions) döndürür.
 * 
 * Format: 
 * [
 *   "arama_terimi",
 *   ["Makale Başlık 1", "Makale Başlık 2"],
 *   ["Açıklama 1", "Açıklama 2"],
 *   ["https://url1", "https://url2"]
 * ]
 */
export async function GET(req: NextRequest) {
  pruneBuckets();
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? req.headers.get('x-real-ip') ?? 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json(['' , [], [], []], { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || q.trim().length < 2) {
    return NextResponse.json([q || '', [], [], []]);
  }

  try {
    // Veritabanından başlıklarda eşleşen ilk 5 makaleyi getir.
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        title: {
          contains: q,
          mode: 'insensitive' // case-insensitive arama
        }
      },
      take: 5,
      select: {
        title: true,
        description: true,
        slug: true
      },
      orderBy: {
        datePublished: 'desc'
      }
    });

    const suggestions = posts.map(p => p.title);
    const descriptions = posts.map(p => p.description || '');
    const urls = posts.map(p => `${BASE_URL}/tr/blog/${p.slug}`);

    // Eğer hiç blog yazısı bulunamazsa, genel aramaya yönlendirecek bir "Fallback" ekleyebiliriz.
    if (suggestions.length === 0) {
      return NextResponse.json([
        q,
        [`"${q}" için tüm sonuçları gör`],
        [`Alo Yönetim bilgi merkezinde ${q} terimi için detaylı arama yapın`],
        [`${BASE_URL}/tr/blog?q=${encodeURIComponent(q)}`]
      ]);
    }

    return NextResponse.json([
      q,
      suggestions,
      descriptions,
      urls
    ]);

  } catch (error) {
    console.error('OpenSearch API Error:', error);
    return NextResponse.json([q, [], [], []]);
  }
}

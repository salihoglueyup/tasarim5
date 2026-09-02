/**
 * Hibrit Veri Katmanı Senkronizasyonu (Faz 19 - Prisma DB & Statik Veri Fallback Mimarisi).
 *
 * Veritabanı ve Redis bağlantı durumlarına göre şeffaf bir geçiş sağlayarak,
 * sayfa üretiminde veya API çağrılarında sıfır kesinti (zero-downtime) garanti eder.
 */

import { prisma } from '@/lib/prisma';
import { redis, CACHE_TTL } from '@/lib/redis';
import { POSTS, POSTS_META, CATEGORIES } from '@/data/posts';
import { getAuthor } from '@/data/authors';
import { parseTags } from '@/lib/jsonSafe';

export interface NormalizedPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  tldr?: string | null;
  summary?: string | null;
  image?: string | null;
  published: boolean;
  categoryId?: string | null;
  authorId?: string | null;
  views?: number;
  tags: string[];
  datePublished: Date;
  dateModified: Date;
  category?: {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
  } | null;
  author?: {
    id: string;
    slug: string;
    name: string;
    avatar?: string | null;
    bio?: string | null;
  } | null;
}

/**
 * Blog listesi için hibrit veri çözücü (Redis -> DB -> Statik POSTS_META).
 */
export async function getHybridPostsList(): Promise<NormalizedPost[]> {
  const cacheKey = 'blog_list_posts_v2';

  // 1. Redis önbellek katmanı
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p) => ({
          ...p,
          tags: parseTags(p.tags),
          views: p.views ?? 0,
          datePublished: new Date(p.datePublished),
          dateModified: new Date(p.dateModified || p.datePublished),
        }));
      }
    }
  } catch {
    // Redis offline/hata durumu güvenle yutulur
  }

  // 2. Prisma veritabanı sorgusu
  try {
    const dbPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { datePublished: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        tldr: true,
        image: true,
        published: true,
        categoryId: true,
        authorId: true,
        tags: true,
        datePublished: true,
        dateModified: true,
        category: {
          select: { id: true, slug: true, name: true, description: true },
        },
        author: {
          select: { id: true, slug: true, name: true, avatar: true, bio: true },
        },
      },
    });

    if (dbPosts && dbPosts.length > 0) {
      const normalized: NormalizedPost[] = dbPosts.map((p) => ({
        ...p,
        summary: p.tldr,
        views: 0,
        tags: parseTags(p.tags),
      }));

      redis.setex(cacheKey, CACHE_TTL.BLOG, JSON.stringify(normalized)).catch(() => {});
      return normalized;
    }
  } catch {
    // DB erişilemezse statik veriye düşülür
  }

  // 3. Statik veri fallback'i (POSTS_META)
  return POSTS_META.map((p, idx) => {
    const cat = CATEGORIES.find((c) => c.slug === p.category);
    const authorObj = getAuthor(p.author);

    return {
      id: `static-${idx}`,
      slug: p.slug,
      title: p.title,
      description: p.description,
      tldr: p.tldr,
      summary: p.tldr,
      image: p.image,
      published: true,
      categoryId: p.category,
      authorId: p.author,
      views: 0,
      tags: p.tags,
      datePublished: new Date(p.datePublished),
      dateModified: new Date(p.dateModified || p.datePublished),
      category: cat
        ? {
            id: cat.slug,
            slug: cat.slug,
            name: cat.name,
            description: cat.description,
          }
        : null,
      author: authorObj
        ? {
            id: authorObj.slug,
            slug: authorObj.slug,
            name: authorObj.name,
            avatar: authorObj.image || '/images/eyup-salihoglu.webp',
            bio: authorObj.bio,
          }
        : null,
    };
  });
}

/**
 * Tekil blog yazısı detayını senkronize eden hibrit çözücü.
 */
export async function getHybridPostBySlug(slug: string): Promise<NormalizedPost | null> {
  const cacheKey = `blog_post_detail_${slug}`;

  // 1. Redis önbellek
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.slug === slug) {
        return {
          ...parsed,
          summary: parsed.tldr ?? parsed.summary,
          views: parsed.views ?? 0,
          tags: parseTags(parsed.tags),
          datePublished: new Date(parsed.datePublished),
          dateModified: new Date(parsed.dateModified || parsed.datePublished),
        };
      }
    }
  } catch {
    // Redis offline
  }

  // 2. Prisma DB
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { author: true, category: true },
    });

    if (post) {
      const normalized: NormalizedPost = {
        ...post,
        summary: post.tldr,
        views: 0,
        tags: parseTags(post.tags),
      };
      redis.setex(cacheKey, CACHE_TTL.BLOG, JSON.stringify(normalized)).catch(() => {});
      return normalized;
    }
  } catch {
    // DB offline
  }

  // 3. Statik Fallback (POSTS)
  const staticPost = POSTS.find((p) => p.slug === slug);
  if (!staticPost) return null;

  const cat = CATEGORIES.find((c) => c.slug === staticPost.category);
  const authorObj = getAuthor(staticPost.author);

  return {
    id: `static-${staticPost.slug}`,
    slug: staticPost.slug,
    title: staticPost.title,
    description: staticPost.description,
    tldr: staticPost.tldr,
    summary: staticPost.tldr,
    image: staticPost.image,
    published: true,
    categoryId: staticPost.category,
    authorId: staticPost.author,
    views: 0,
    tags: staticPost.tags,
    datePublished: new Date(staticPost.datePublished),
    dateModified: new Date(staticPost.dateModified || staticPost.datePublished),
    category: cat
      ? {
          id: cat.slug,
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
        }
      : null,
    author: authorObj
      ? {
          id: authorObj.slug,
          slug: authorObj.slug,
          name: authorObj.name,
          avatar: authorObj.image || '/images/eyup-salihoglu.webp',
          bio: authorObj.bio,
        }
      : null,
  };
}

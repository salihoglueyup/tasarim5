import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';;
import { generateBreadcrumbs } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import BlogListClient from '@/components/blog/BlogListClient';
import { notFound } from 'next/navigation';
import ItemListSeo from '@/components/seo/ItemListSeo';
import { BASE_URL, buildMetadata } from '@/lib/seo';

import { POSTS_META, CATEGORIES } from '@/data/posts';
import { redis, CACHE_TTL } from '@/lib/redis';

export const revalidate = 86400; // 24 saat ISR (Faz 15)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Blog — Site ve Tesis Yönetimi Rehberleri',
    description:
      'Aidat takibi, güvenlik yönetimi, KMK mevzuatı ve tesis yönetimi hakkında güncel rehberler ve sektör makaleleri.',
    path: '/blog',
    lang,
    keywords: ['site yönetimi blog', 'aidat rehberi', 'tesis yönetimi makaleler', 'kmk mevzuat'],
  });
}

export default async function Blog() {
  let finalPosts: any[] = [];
  let finalCategories: any[] = [];
  const cacheKeyPosts = 'blog_list_posts_v2';
  const cacheKeyCats = 'blog_list_cats_v2';

  try {
    const [cachedP, cachedC] = await Promise.all([
      redis.get(cacheKeyPosts),
      redis.get(cacheKeyCats),
    ]);
    if (cachedP) finalPosts = JSON.parse(cachedP);
    if (cachedC) finalCategories = JSON.parse(cachedC);
  } catch {
    // Redis offline/error fallback
  }

  if (finalPosts.length === 0) {
    const [dbPosts, dbCategories] = await Promise.all([
      prisma.post.findMany({
        where: { published: true },
        orderBy: { datePublished: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          title_en: true,
          title_ru: true,
          title_ar: true,
          description_en: true,
          description_ru: true,
          description_ar: true,
          tldr: true,
          image: true,
          published: true,
          categoryId: true,
          authorId: true,
          tags: true,
          datePublished: true,
          dateModified: true,
          category: true,
        },
      }).catch(() => []),
      prisma.category.findMany().catch(() => []),
    ]);

    finalPosts = dbPosts;
    finalCategories = dbCategories;

    if (finalPosts.length > 0) {
      redis.setex(cacheKeyPosts, CACHE_TTL.BLOG, JSON.stringify(finalPosts)).catch(() => {});
    }
    if (finalCategories.length > 0) {
      redis.setex(cacheKeyCats, CACHE_TTL.BLOG, JSON.stringify(finalCategories)).catch(() => {});
    }
  }

  if (finalPosts.length === 0) {
    finalPosts = POSTS_META.map((p, idx) => ({
      id: `static-${idx}`,
      slug: p.slug,
      title: p.title,
      description: p.description,
      title_en: null,
      title_ru: null,
      title_ar: null,
      description_en: null,
      description_ru: null,
      description_ar: null,
      summary: p.tldr,
      image: p.image,
      published: true,
      categoryId: p.category,
      authorId: p.author,
      views: 0,
      tags: JSON.stringify(p.tags),
      datePublished: new Date(p.datePublished),
      dateModified: new Date(p.dateModified || p.datePublished),
      category: CATEGORIES.find((c) => c.slug === p.category)
        ? {
            id: p.category,
            slug: p.category,
            name: CATEGORIES.find((c) => c.slug === p.category)!.name,
            name_en: null,
            name_ru: null,
            name_ar: null,
            description: CATEGORIES.find((c) => c.slug === p.category)!.description,
            description_en: null,
            description_ru: null,
            description_ar: null,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        : null,
      createdAt: new Date(p.datePublished),
      updatedAt: new Date(p.dateModified || p.datePublished),
    })) as any;
  }

  if (finalCategories.length === 0) {
    finalCategories = CATEGORIES.map((c) => ({
      id: c.slug,
      slug: c.slug,
      name: c.name,
      name_en: null,
      name_ru: null,
      name_ar: null,
      description: c.description,
      description_en: null,
      description_ru: null,
      description_ar: null,
      parentId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as any;
  }

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  const blogLd = {
    '@type': 'Blog',
    name: 'Alo Yönetim Blog',
    description: 'Site ve tesis yönetimi, aidat, güvenlik ve mevzuat rehberleri.',
    url: 'https://aloyonetim.com/blog',
    blogPost: finalPosts.map((post: any) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.datePublished.toISOString(),
      url: `https://aloyonetim.com/blog/${post.slug}`,
      image: post.image,
    })),
  };
  
  const carouselItems = finalPosts.map((post: any) => ({
    name: post.title,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.image || undefined,
    description: post.description || undefined
  }));

  return (
    <>
      <JsonLd data={[breadcrumbLd, blogLd]} />
      <ItemListSeo items={carouselItems} />
      {/* 
        We can't use useLanguage here cleanly without passing to client component
        But we can just pass strings or use a dictionary if we want SSR i18n.
        For simplicity, PageHeader here gets hardcoded or generic Turkish since this is TR primarily.
      */}
      <PageHeader 
        title="Alo Yönetim Blog" 
        description="Site ve apartman yönetimi hakkında bilmeniz gereken her şey." 
      />

      <Suspense fallback={<div className="h-96 flex items-center justify-center">Yükleniyor...</div>}>
        <BlogListClient posts={finalPosts} categories={finalCategories} />
      </Suspense>
    </>
  );
}

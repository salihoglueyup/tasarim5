import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHeader from '@/components/layout/page/PageHeader';
import JsonLd from '@/components/seo/schema/JsonLd';;
import { generateBreadcrumbs } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import BlogListClient from '@/components/blog/BlogListClient';
import { notFound } from 'next/navigation';
import ItemListSeo from '@/components/seo/schema/ItemListSeo';
import { BASE_URL, buildMetadata, LOCALES } from '@/lib/seo';

import { POSTS_META, CATEGORIES } from '@/data/posts';
import { redis, CACHE_TTL } from '@/lib/redis';
import { getDictionary } from '@/lib/i18n';
import { localePath } from '@/lib/i18n/localePath';
import { isBlogLang, getLocalizedPostMetas, getLocalizedCategories } from '@/lib/blog/blogLocale';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const revalidate = 86400; // 24 saat ISR (Faz 15)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: string) => dict?.[key] || key;
  return buildMetadata({
    title: t('blgx_meta_title'),
    description: t('blgx_meta_desc'),
    path: '/blog',
    lang,
    keywords: lang === 'tr' ? ['site yönetimi blog', 'aidat rehberi', 'tesis yönetimi makaleler', 'kmk mevzuat'] : undefined,
  });
}

export default async function Blog({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: string) => dict?.[key] || key;
  let finalPosts: any[] = [];
  let finalCategories: any[] = [];
  const cacheKeyPosts = 'blog_list_posts_v2';
  const cacheKeyCats = 'blog_list_cats_v2';

  if (isBlogLang(lang)) {
    // en/ru/ar: çeviri belleğiyle uyumlu olması için içerik DB'den değil statik kaynaktan okunur.
    finalPosts = getLocalizedPostMetas(lang).map((m, idx) => ({
      id: `static-${idx}`,
      slug: m.meta.slug,
      title: m.title,
      description: m.description,
      image: m.meta.image,
      published: true,
      tags: JSON.stringify([]),
      datePublished: new Date(m.meta.datePublished),
      dateModified: new Date(m.meta.dateModified || m.meta.datePublished),
      category: m.category ? { id: m.category.slug, slug: m.category.slug, name: m.category.name } : null,
    }));
    finalCategories = getLocalizedCategories(lang).map((c) => ({ id: c.slug, slug: c.slug, name: c.name, description: c.description }));
  }

  if (finalPosts.length === 0) try {
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
    { name: t('breadcrumb_home'), url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  const blogLd = {
    '@type': 'Blog',
    name: t('blgx_hdr_title'),
    description: t('blgx_meta_desc'),
    url: `${BASE_URL}${localePath('/blog', lang)}`,
    blogPost: finalPosts.map((post: any) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.datePublished instanceof Date
        ? post.datePublished.toISOString()
        : new Date(post.datePublished || Date.now()).toISOString(),
      url: `${BASE_URL}${localePath(`/blog/${post.slug}`, lang)}`,
      image: post.image,
    })),
  };
  
  const carouselItems = finalPosts.map((post: any) => ({
    name: post.title,
    url: `${BASE_URL}${localePath(`/blog/${post.slug}`, lang)}`,
    image: post.image || undefined,
    description: post.description || undefined
  }));

  return (
    <>
      <JsonLd data={[breadcrumbLd, blogLd]} />
      <ItemListSeo items={carouselItems} />
      <PageHeader title={t('blgx_hdr_title')} description={t('blgx_hdr_desc')} />

      <Suspense fallback={<div className="h-96 flex items-center justify-center">{t('blgx_loading')}</div>}>
        <BlogListClient posts={finalPosts} categories={finalCategories} />
      </Suspense>
    </>
  );
}

import { Suspense } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';;
import { generateBreadcrumbs } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import BlogListClient from '@/components/blog/BlogListClient';
import { notFound } from 'next/navigation';

import ItemListSeo from '@/components/seo/ItemListSeo';
import { BASE_URL } from '@/lib/seo';

// 1 dakika cache

export default async function Blog() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { datePublished: 'desc' },
    include: { category: true }
  }).catch(() => []);

  const categories = await prisma.category.findMany().catch(() => []);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  const blogLd = {
    '@type': 'Blog',
    name: 'Alo Yönetim Blog',
    description: 'Site ve tesis yönetimi, aidat, güvenlik ve mevzuat rehberleri.',
    url: 'https://aloyonetim.com/blog',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.datePublished.toISOString(),
      url: `https://aloyonetim.com/blog/${post.slug}`,
      image: post.image,
    })),
  };
  
  const carouselItems = posts.map(post => ({
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
        <BlogListClient posts={posts} categories={categories} />
      </Suspense>
    </>
  );
}

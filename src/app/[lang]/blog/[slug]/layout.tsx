import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { POSTS } from '@/data/posts';

import { parseTags } from '@/lib/jsonSafe';

interface BlogDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: Omit<BlogDetailLayoutProps, 'children'>): Promise<Metadata> {
  const { lang, slug } = await params;
  
  // Try DB first
  let post = await prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
    },
  }).catch(() => null);

  // Fallback to static data
  if (!post) {
    const staticPost = POSTS.find((p) => p.slug === slug);
    if (staticPost) {
      post = {
        ...staticPost,
        id: staticPost.slug,
        title_en: null,
        title_ru: null,
        title_ar: null,
        description_en: null,
        description_ru: null,
        description_ar: null,
        content_en: null,
        content_ru: null,
        content_ar: null,
        authorId: staticPost.author,
        categoryId: staticPost.category,
        views: 0,
        published: true,
        tags: staticPost.tags,
        datePublished: new Date(staticPost.datePublished),
        dateModified: new Date(staticPost.dateModified || staticPost.datePublished),
        category: { id: staticPost.category, slug: staticPost.category, name: staticPost.category, description: null },
        author: { id: staticPost.author, slug: staticPost.author, name: staticPost.author, bio: null, image: null },
      } as any;
    }
  }

  if (!post) {
    return {};
  }

  const tags = parseTags(post.tags);

  const baseMetadata = buildMetadata({
    title: `${post.title} | Alo Yönetim Blog`,
    description: post.description,
    path: `/blog/${slug}`,
    lang,
    ogType: 'article',
    images: post.image ? [post.image] : [],
    keywords: tags,
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: post.datePublished.toISOString(),
      modifiedTime: post.dateModified.toISOString(),
      tags,
    }
  };
}

export default async function BlogDetailLayout({
  children,
  params,
}: BlogDetailLayoutProps) {
  const { slug } = await params;
  
  let post = await prisma.post.findUnique({
    where: { slug }
  }).catch(() => null);

  if (!post) {
    const staticP = POSTS.find((p) => p.slug === slug);
    if (staticP) {
      post = { id: staticP.slug, published: true } as any;
    }
  }

  if (!post || !post.published) {
    notFound();
  }
  
  return <>{children}</>;
}

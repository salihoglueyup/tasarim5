import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { prisma } from '@/lib/prisma';

interface BlogDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: Omit<BlogDetailLayoutProps, 'children'>): Promise<Metadata> {
  const { lang, slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug }
  });

  if (!post || !post.published) {
    return buildMetadata({
      title: 'Sayfa Bulunamadı',
      description: 'Aradığınız blog yazısı bulunamadı.',
      path: `/blog/${slug}`,
      lang,
      noindex: true,
    });
  }

  // Convert tags string to array
  let tags: string[] = [];
  try {
    tags = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags;
    if (!Array.isArray(tags)) tags = [];
  } catch (e) {
    tags = [];
  }

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
  
  const post = await prisma.post.findUnique({
    where: { slug }
  });

  if (!post || !post.published) {
    notFound();
  }
  
  return <>{children}</>;
}

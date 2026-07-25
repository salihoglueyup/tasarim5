import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { getPost } from '@/data/posts';

interface BlogDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: Omit<BlogDetailLayoutProps, 'children'>): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(slug);

  // Geçersiz slug'lar için soft-404 yerine gerçek 404 (Faz 31): indexlenmesin.
  if (!post) {
    return buildMetadata({
      title: 'Sayfa Bulunamadı',
      description: 'Aradığınız blog yazısı bulunamadı.',
      path: `/blog/${slug}`,
      lang,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${post.title} | Alo Yönetim Blog`,
    description: post.description,
    path: `/blog/${slug}`,
    lang,
    ogType: 'article',
    images: [post.image],
    keywords: post.tags,
  });
}

export default async function BlogDetailLayout({
  children,
  params,
}: BlogDetailLayoutProps) {
  const { slug } = await params;
  // Bilinmeyen slug → gerçek 404 (soft-404 önleme).
  if (!getPost(slug)) {
    notFound();
  }
  return <>{children}</>;
}

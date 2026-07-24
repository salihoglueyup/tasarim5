import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { isValidBlogSlug } from '@/data/blog';

interface BlogDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: Omit<BlogDetailLayoutProps, 'children'>): Promise<Metadata> {
  const { lang, slug } = await params;

  // Geçersiz slug'lar için soft-404 yerine gerçek 404 (Faz 31): indexlenmesin.
  if (!isValidBlogSlug(slug)) {
    return buildMetadata({
      title: 'Sayfa Bulunamadı',
      description: 'Aradığınız blog yazısı bulunamadı.',
      path: `/blog/${slug}`,
      lang,
      noindex: true,
    });
  }

  const titleFormatted = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return buildMetadata({
    title: `${titleFormatted} | Alo Yönetim Blog`,
    description: `${titleFormatted} hakkında detaylı bilgi, sektörel rehberler ve ipuçları.`,
    path: `/blog/${slug}`,
    lang,
    ogType: 'article',
  });
}

export default async function BlogDetailLayout({
  children,
  params,
}: BlogDetailLayoutProps) {
  const { slug } = await params;
  // Bilinmeyen slug → gerçek 404 (soft-404 önleme).
  if (!isValidBlogSlug(slug)) {
    notFound();
  }
  return <>{children}</>;
}

import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

interface BlogDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: Omit<BlogDetailLayoutProps, 'children'>): Promise<Metadata> {
  const { lang, slug } = await params;
  const titleFormatted = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'Blog Yazısı';

  return buildMetadata({
    title: `${titleFormatted} | Alo Yönetim Blog`,
    description: `${titleFormatted} hakkında detaylı bilgi, sektörel rehberler ve ipuçları.`,
    path: `/blog/${slug}`,
    lang,
    ogType: 'article',
  });
}

export default function BlogDetailLayout({ children }: BlogDetailLayoutProps) {
  return <>{children}</>;
}

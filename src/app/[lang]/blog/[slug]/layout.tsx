import { Metadata } from 'next';

interface BlogDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Omit<BlogDetailLayoutProps, 'children'>): Promise<Metadata> {
  const { slug } = await params;
  const titleFormatted = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : "Blog Yazısı";

  return {
    title: `${titleFormatted} | Alo Yönetim Blog`,
    description: `${titleFormatted} hakkında detaylı bilgi, sektörel rehberler ve ipuçları.`,
    openGraph: {
      title: `${titleFormatted} | Alo Yönetim Blog`,
      description: `${titleFormatted} hakkında detaylı bilgi, sektörel rehberler ve ipuçları.`,
      type: 'article',
      url: `https://aloyonetim.com/blog/${slug}`,
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titleFormatted} | Alo Yönetim Blog`,
      description: `${titleFormatted} hakkında detaylı bilgi, sektörel rehberler ve ipuçları.`,
      images: ['/og-image.jpg'],
    },
  };
}

export default function BlogDetailLayout({ children }: BlogDetailLayoutProps) {
  return <>{children}</>;
}

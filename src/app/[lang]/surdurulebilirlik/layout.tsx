import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Sürdürülebilirlik — Çevre ve Sosyal Sorumluluk',
    description:
      'ISO 14001 Çevre Yönetimi, ISO 26000 Sosyal Sorumluluk ve GES projeleriyle sürdürülebilir tesis yönetiminde öncü yaklaşımımız.',
    path: '/surdurulebilirlik',
    lang,
    keywords: [
      'sürdürülebilir tesis yönetimi',
      'ISO 14001 çevre yönetimi',
      'sosyal sorumluluk ISO 26000',
      'GES projesi site',
      'yeşil bina yönetimi',
    ],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

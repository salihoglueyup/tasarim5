import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Alo Yönetim Mobil Uygulaması — Çok Yakında',
    description:
      'Aidat öde, arıza bildir, belgelere eriş, toplantılara katıl — tek güvenli uygulamada. Yakında App Store ve Google Play\'de.',
    path: '/app',
    lang,
    keywords: ['alo yönetim uygulaması', 'site yönetimi app', 'aidat ödeme uygulaması', 'mobil tesis yönetimi'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

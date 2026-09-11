import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Alo Yönetim Sakin & Yönetici Mobil Portalı — Apsiyon Güvencesiyle',
    description:
      'Alo Yönetim ve Apsiyon resmi entegrasyonu: 7/24 online aidat ödeme, arıza takibi, karar oylama ve yönetim paneli. App Store, Google Play ve Huawei AppGallery\'de aktif.',
    path: '/app',
    lang,
    keywords: [
      'alo yönetim mobil',
      'apsiyon sakin indir',
      'apsiyon manager',
      'site yönetimi mobil uygulama',
      'aidat ödeme uygulaması',
      'mobil tesis yönetimi'
    ],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

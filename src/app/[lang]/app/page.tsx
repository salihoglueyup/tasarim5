import type { Metadata } from 'next';
import ApsiyonMobileHub from '@/components/sections/interactive/ApsiyonMobileHub';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { buildMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import AppAiOverviewGroundingSeo from '@/components/seo/ai-overviews/AppAiOverviewGroundingSeo';

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return [{ lang: 'tr' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Alo Yönetim & Apsiyon Sakin ve Yönetici Mobil Portalı',
    description:
      'İş ortağımız Apsiyon’un sakin ve yönetici uygulamaları: online aidat ödeme, borç takibi, talep ve duyuru işlemleri.',
    path: '/app',
    lang,
    targetKeyword: 'site yönetimi mobil uygulama',
    keywords: [
      'site yönetimi mobil uygulama',
      'apsiyon sakin uygulaması',
      'online aidat ödeme',
      'apartman yönetimi app',
      'site yönetim portalı',
    ],
  });
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const breadcrumbs = [
    { name: dict?.nav_home || 'Anasayfa', url: lang === 'tr' ? '/' : `/${lang}` },
    { name: 'Alo Yönetim & Apsiyon Mobil Portalı', url: lang === 'tr' ? '/app' : `/${lang}/app` },
  ];

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  const pageLd = webPageSchema({
    name: 'Alo Yönetim Sakin & Yönetici Mobil Portalı — Apsiyon Güvencesiyle',
    description: 'İş ortağımız Apsiyon’un sakin ve yönetici uygulamaları — online aidat ödeme, talep ve duyuru takibi.',
    path: '/app',
    speakableSelectors: ['h1', 'p', '#app-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      
      {/* Apsiyon Resmi Marka Kimliğiyle Güçlendirilmiş Bütünleşik Mobil Vitrini */}
      <ApsiyonMobileHub />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
        <AppAiOverviewGroundingSeo lang={lang} />
      </div>
    </>
  );
}

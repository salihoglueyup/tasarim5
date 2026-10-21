import type { Metadata } from 'next';
import PageHeader from '@/components/layout/page/PageHeader';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import { localePath } from '@/lib/i18n/localePath';
import { BASE_URL } from '@/lib/seo';
import { REAL_REFERENCES, SECTOR_LABELS_TR } from '@/data/realReferences';
import HubAiOverviewGroundingSeo from '@/components/seo/ai-overviews/HubAiOverviewGroundingSeo';
import ReferencesShowcase from './ReferencesShowcase';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildMetadata({
    title: dict?.refx_meta_title || 'Referanslarımız',
    description: dict?.refx_meta_desc || '',
    path: '/referanslar',
    lang,
    keywords: lang === 'tr' ? ['site yönetimi referansları', 'tesis yönetimi referanslar', 'istanbul site yönetimi'] : undefined,
  });
}

// Referanslar tek kaynaktan (src/data/realReferences.ts) gelir; veritabanındaki eski örnek kayıtlar kullanılmaz.
export default async function ReferanslarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: string) => dict?.[key] || key;

  const breadcrumbs = [
    { name: t('breadcrumb_home'), url: '/' },
    { name: t('refx_title'), url: '/referanslar' },
  ];

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${t('refx_title')} — Alo Yönetim (${REAL_REFERENCES.length})`,
    numberOfItems: REAL_REFERENCES.length,
    itemListElement: REAL_REFERENCES.map((ref, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/referanslar#${ref.slug}`,
        name: ref.name,
        description: `${SECTOR_LABELS_TR[ref.sector]}${ref.district ? ` — ${ref.district}, İstanbul` : ' — İstanbul'}`,
      },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbs(breadcrumbs),
          webPageSchema({
            name: t('refx_title'),
            description: t('refx_meta_desc'),
            path: localePath('/referanslar', lang),
            lang,
            speakableSelectors: ['h1', '#references-hub-instant-answer-text'],
          }),
          itemListLd,
        ]}
      />
      <PageHeader title={t('refx_title')} description={t('refx_intro')} breadcrumbs={breadcrumbs} />
      <HubAiOverviewGroundingSeo hubKey="referanslar" lang={lang} />
      <ReferencesShowcase />
    </>
  );
}

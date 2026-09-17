import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { KeywordAnalysisSeo, ServiceAiOverviewSnippetSeo } from '@/components/seo';
import { buildFacilityCompleteGraphSchema } from '@/lib/seo/facilityCompleteGraphBuilder';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';
import SiteYonetimiClient from './SiteYonetimiClient';

export const revalidate = 86400; // 24 saat ISR
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const serpMeta = getFacilitySerpMeta({ lang, pillar: 'site' });

  const title = lang === 'tr'
    ? 'Site Yönetim Şirketleri İstanbul — 150+ Proje, KMK 634 & 7/24 | Alo Yönetim'
    : serpMeta.title;

  const description = lang === 'tr'
    ? 'İstanbul genelinde 39 ilçede konut siteleri, apartmanlar ve rezidanslar için 634 sayılı KMK uyumlu profesyonel site yönetimi, şeffaf aidat tahsilatı, 5188 güvenlik ve %30 maliyet tasarrufu. Ücretsiz keşif alın.'
    : serpMeta.description;

  return buildMetadata({
    title,
    description,
    path: '/hizmetler/site-yonetimi',
    lang,
    targetKeyword: 'site yönetimi',
    ogImageType: 'service',
    keywords: [
      'site yönetimi',
      'site yönetim şirketleri',
      'site yönetim firmaları',
      'apartman ve site yönetimi',
      'profesyonel site yönetimi',
      'istanbul site yönetimi',
      'apartman yöneticiliği',
      'site aidat takibi',
      'kmk 634',
      'site güvenlik şirketi',
      ...serpMeta.keywords,
    ],
  });
}

export default async function SiteYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const pageTitle = 'Site Yönetimi';
  const pageDesc = 'İstanbul genelinde apartmanlar, toplu konut siteleri ve rezidanslar için 634 sayılı KMK uyumlu profesyonel site yönetimi, şeffaf aidat tahsilatı, 5188 lisanslı güvenlik ve Apsiyon entegrasyonu.';

  const completeGraphLd = buildFacilityCompleteGraphSchema({
    lang,
    pageTitle: `${pageTitle} | Alo Yönetim`,
    pageDescription: pageDesc,
    canonicalPath: '/hizmetler/site-yonetimi',
  });

  return (
    <>
      <JsonLd data={completeGraphLd} />
      <KeywordAnalysisSeo
        title={pageTitle}
        description={pageDesc}
        path="/hizmetler/site-yonetimi"
        targetKeyword="site yönetimi"
        keywords={[
          'site yönetimi',
          'site yönetim şirketleri',
          'apartman yönetimi',
          'profesyonel site yönetimi',
          'istanbul site yönetimi',
          'kmk 634',
          'site aidat yönetimi'
        ]}
      />
      <SiteYonetimiClient />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-16">
        <ServiceAiOverviewSnippetSeo serviceSlug="site-yonetimi" serviceName="634 KMK Uyumlu Profesyonel Site Yönetimi" />
      </div>
    </>
  );
}

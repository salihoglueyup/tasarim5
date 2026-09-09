import type { Metadata } from 'next';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { KeywordAnalysisSeo } from '@/components/seo';
import { buildFacilityCompleteGraphSchema } from '@/lib/seo/facilityCompleteGraphBuilder';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';
import TesisYonetimiClient from './TesisYonetimiClient';

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
  const serpMeta = getFacilitySerpMeta({ lang, pillar: 'facility' });

  // Wave 57: CTR Boost & Ön Yüklemeli Tesis Yönetimi Başlık Şablonu (Pozisyon 53 -> İlk 10)
  const title = lang === 'tr'
    ? 'Tesis Yönetimi Şirketleri — Entegre Tesis İşletmesi & Ücretsiz Keşif | Alo Yönetim'
    : t.serv_fac_meta_title || serpMeta.title;

  const description = lang === 'tr'
    ? "İstanbul genelinde rezidans, plaza, site ve sanayi tesisleri için ISO 41001 standartlarında entegre tesis yönetimi, 5188 lisanslı güvenlik ve %30 tasarruf. Hemen keşif randevusu alın."
    : t.serv_fac_meta_desc || serpMeta.description;

  return buildMetadata({
    title,
    description,
    path: serpMeta.canonicalPath,
    lang,
    targetKeyword: 'tesis yönetimi',
    ogImageType: 'service',
    keywords: [
      'tesis yönetimi',
      'tesis yönetim şirketleri',
      'entegre tesis yönetimi',
      'istanbul tesis yönetimi',
      'tesis işletmeciliği',
      'plaza tesis yönetimi',
      'rezidans tesis yönetimi',
      'bina ve tesis yönetimi',
      'iso 41001 tesis yönetimi',
      'tesis yönetim firmaları',
      ...serpMeta.keywords,
    ],
  });
}

export default async function TesisYonetimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const pageTitle = t.serv_fac_name || 'Tesis Yönetimi';
  const pageDesc = t.fac_desc || 'İstanbul genelinde apartman, site, plaza ve entegre tesis yönetimi, 5188 özel güvenlik, temizlik, teknik bakım ve aidat icra takibi hizmetleri.';

  // Merkezi Birleşik Schema.org @graph Knowledge Graph Mimarisi
  const completeGraphLd = buildFacilityCompleteGraphSchema({
    lang,
    pageTitle: `${pageTitle} | Alo Yönetim`,
    pageDescription: pageDesc,
    canonicalPath: '/hizmetler/tesis-yonetimi',
  });

  return (
    <>
      <JsonLd data={completeGraphLd} />
      <KeywordAnalysisSeo
        title={pageTitle}
        description={pageDesc}
        path="/hizmetler/tesis-yonetimi"
        targetKeyword="tesis yönetimi"
        keywords={[
          'tesis yönetimi',
          'entegre tesis yönetimi',
          'istanbul tesis yönetimi',
          'bina yönetimi',
          'site yönetimi',
          'iso 41001',
          'kmk 634'
        ]}
      />
      <TesisYonetimiClient />
    </>
  );
}


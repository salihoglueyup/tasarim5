import type { Metadata } from 'next';
import CalculatorClient from './CalculatorClient';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import TrOnly from '@/components/seo/TrOnly';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema, howToSchema, ORG_CREDENTIALS } from '@/lib/schemas';
import DefinedTermSetSeo from '@/components/seo/schema/DefinedTermSetSeo';
import CalculatorAiOverviewSeo from '@/components/seo/ai-overviews/CalculatorAiOverviewSeo';

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return buildMetadata({
    title: t.calx_meta_title,
    description: t.calx_meta_desc,
    path: '/hesaplayici',
    lang,
    targetKeyword: 'aidat hesaplama',
    keywords: t.calx_meta_keywords.split('|'),
  });
}

export default async function HesaplayiciServer({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: t.calx_breadcrumb, url: '/hesaplayici' },
  ]);

  const howToLd = howToSchema({
    name: t.calx_howto_name,
    description: t.calx_howto_desc,
    steps: [1, 2, 3].map((n) => ({
      name: t[`calx_step_${n}_name` as keyof typeof t] as string,
      text: t[`calx_step_${n}_text` as keyof typeof t] as string,
    })),
  });

  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t.calx_app_name,
    url: `${BASE_URL}/hesaplayici`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    featureList: [t.calx_app_f1, t.calx_app_f2, t.calx_app_f3],
    provider: {
      '@type': 'Organization',
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      hasCredential: ORG_CREDENTIALS,
    },
  };

  const pageLd = webPageSchema({
    name: t.calx_page_ld_name,
    description: t.calx_page_ld_desc,
    path: '/hesaplayici',
    speakableSelectors: ['h1', '#calculator-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, webAppLd, howToLd, pageLd]} />
      <CalculatorClient />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-20 space-y-8">
        <TrOnly>
          <CalculatorAiOverviewSeo />
          <DefinedTermSetSeo
            name={t.calx_dts_name}
            description={t.calx_dts_desc}
            path="/hesaplayici"
            detailLinks={false}
            terms={[1, 2, 3].map((n) => ({
              term: t[`calx_term_${n}` as keyof typeof t] as string,
              definition: t[`calx_term_${n}_def` as keyof typeof t] as string,
            }))}
          />
        </TrOnly>
      </div>
    </>
  );
}

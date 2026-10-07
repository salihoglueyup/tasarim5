import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import CalculatorClient from './CalculatorClient';
import { defaultCalcConfig } from '@/lib/hesaplayici';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n';
import TrOnly from '@/components/seo/TrOnly';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateBreadcrumbs, webPageSchema, howToSchema, ORG_CREDENTIALS } from '@/lib/schemas';
import DefinedTermSetSeo from '@/components/seo/schema/DefinedTermSetSeo';
import CalculatorAiOverviewSeo from '@/components/seo/ai-overviews/CalculatorAiOverviewSeo';
import BudgetMatrixAiGroundingSeo from '@/components/seo/ai-overviews/BudgetMatrixAiGroundingSeo';

export const dynamic = 'force-dynamic';

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
  let configRecord = null;
  try {
    configRecord = await prisma.calculatorConfig.findFirst();
  } catch (err) {
    console.warn('HesaplayiciServer: Database fetch fallback triggered:', err instanceof Error ? err.message : err);
  }

  const config = configRecord
    ? {
        baseCostPerUnit: configRecord.baseCostPerUnit,
        securityAddon: configRecord.securityAddon,
        poolAddon: configRecord.poolAddon,
        greenAddon: configRecord.greenAddon,
        elevatorAddon: configRecord.elevatorAddon,
        savingsRate: configRecord.savingsRate,
      }
    : defaultCalcConfig;

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
    potentialAction: {
      '@type': 'CalculateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/api/tesis-yonetimi/calculate-budget?units={units}`,
      },
      result: {
        '@type': 'FinancialProduct',
        name: t.calx_app_result,
      },
    },
  };

  const pageLd = webPageSchema({
    name: t.calx_page_ld_name,
    description: t.calx_page_ld_desc,
    path: '/hesaplayici',
    speakableSelectors: ['h1', 'h2', 'p', '#calc-instant-answer-text', '#budget-matrix-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, webAppLd, howToLd, pageLd]} />
      <CalculatorClient initialConfig={config} />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-20 space-y-8">
        <TrOnly>
          <CalculatorAiOverviewSeo />
          <BudgetMatrixAiGroundingSeo />
        </TrOnly>
        <TrOnly>
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

import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import CalculatorClient from './CalculatorClient';
import { defaultCalcConfig } from '@/lib/hesaplayici';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema, howToSchema } from '@/lib/schemas';
import { DefinedTermSetSeo } from '@/components/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Online Aidat & İşletme Bütçesi Hesaplayıcı — KMK 634 Simülatörü | Alo Yönetim',
    description:
      'Sitenizin tahmini işletme bütçesini ve aidat tasarrufunu 60 saniyede KMK 634 standartlarında online hesaplayın. Ücretsiz bütçe simülasyonu başlatın!',
    path: '/hesaplayici',
    lang,
    targetKeyword: 'aidat hesaplama',
    keywords: [
      'aidat hesaplama',
      'tesis yönetim maliyeti',
      'site aidat hesaplayıcı',
      'işletme projesi bütçesi',
      'kmk 634 aidat tasarrufu',
      'apartman aidatı ne kadar',
    ],
  });
}

export default async function HesaplayiciServer() {
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
    { name: 'Aidat & Bütçe Hesaplayıcı', url: '/hesaplayici' },
  ]);

  const howToLd = howToSchema({
    name: 'Site Aidatı ve Tesis Bütçesi Nasıl Hesaplanır?',
    description: '634 Sayılı Kat Mülkiyeti Kanunu ve işletme projesi standartlarına göre daire başı aidat ve tasarruf hesaplama adımları.',
    steps: [
      {
        name: 'Bağımsız Bölüm Sayısını Belirleyin',
        text: 'Sitenizdeki toplam konut, daire veya dükkan sayısını girerek temel işletme hacmini oluşturun.',
      },
      {
        name: 'Tesis Özelliklerini ve Donatıları Seçin',
        text: '5188 özel güvenlik, yüzme havuzu, asansör sayısı ve peyzaj yeşil alan büyüklüğü gibi ek operasyonel hizmetleri işaretleyin.',
      },
      {
        name: 'KMK 634 Bütçe Simülasyonunu İnceleyin',
        text: 'Tahmini aylık toplam bütçeyi, daire başı aidatı ve Alo Yönetim ile %30 tasarruf projeksiyonunu anında görüntüleyin.',
      },
    ],
  });

  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Alo Yönetim Tesis & Aidat Bütçe Hesaplama Simülatörü',
    url: `${BASE_URL}/hesaplayici`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    potentialAction: {
      '@type': 'CalculateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/api/tesis-yonetimi/calculate-budget?units={units}`,
      },
      result: {
        '@type': 'FinancialProduct',
        name: 'Tahmini Tesis İşletme Bütçesi ve %30 Tasarruf Raporu',
      },
    },
  };

  const pageLd = webPageSchema({
    name: 'Aidat & Tesis Yönetim Maliyeti Hesaplayıcı',
    description: 'Siteniz için tahmini aidat ve yönetim bütçesini hesaplayın.',
    path: '/hesaplayici',
    speakableSelectors: ['h1', 'h2', 'p'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, webAppLd, howToLd, pageLd]} />
      <CalculatorClient initialConfig={config} />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] pb-20">
        <DefinedTermSetSeo
          name="Tesis Yönetimi ve Aidat Bütçe Terimleri"
          description="KMK 634 Madde 20, İşletme Projesi ve Arsa Payı Bütçe Dağılımı Tanımları"
          path="/hesaplayici"
          terms={[
            {
              term: 'Tahmini İşletme Projesi (KMK 37)',
              definition: 'Anagayrimenkulün bir yıllık tahmini giderlerini ve her kat malikine düşen aylık avans tutarını gösteren yasal bütçedir.',
            },
            {
              term: '%30 Tesis Yönetimi Tasarruf Modeli',
              definition: 'Toplu satın alma gücü, önleyici bakım ve dijital enerji otomasyonu ile işletme masraflarından sağlanan somut tasarruf oranıdır.',
            },
          ]}
        />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import PageHeader from '@/components/layout/page/PageHeader';
import Link from 'next/link';
import JsonLd from '@/components/seo/schema/JsonLd';
import { QuoteCtaButton } from '@/components';
import { ServiceAuthorityHubSeo, QuoteAiOverviewCardSeo, RfpTransitionAiGroundingSeo, ServicePricingProductAiOverviewSeo } from '@/components/seo';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

import { buildMetadata } from '@/lib/seo';
import TeklifAlClient from './TeklifAlClient';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return buildMetadata({
    title: t.ta_meta_title,
    description: t.ta_meta_desc,
    path: '/teklif-al',
    lang,
    targetKeyword: t.ta_target_kw,
    keywords: String(t.ta_meta_kw).split(',').map((k: string) => k.trim()),
    ogImageType: 'service',
  });
}

const getSteps = (t: Record<string, string>) => [
  { icon: 'edit_note', title: t.ta_step1_title, desc: t.ta_step1_desc },
  { icon: 'search_insights', title: t.ta_step2_title, desc: t.ta_step2_desc },
  { icon: 'request_quote', title: t.ta_step3_title, desc: t.ta_step3_desc },
];

const getServices = (t: Record<string, string>) => [
  { href: '/hizmetler/tesis-yonetimi', label: t.ta_svc_facility },
  { href: '/hizmetler/guvenlik-yonetimi', label: t.ta_svc_security },
  { href: '/hizmetler/temizlik-ve-hijyen', label: t.ta_svc_cleaning },
  { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: t.ta_svc_legal },
];

export default async function TeklifAl({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const lp = (p: string) => (lang === 'tr' ? p : `/${lang}${p === '/' ? '' : p}`);
  const STEPS = getSteps(t);
  const SERVICES = getServices(t);
  const breadcrumbLd = generateBreadcrumbs([
    { name: t.breadcrumb_home, url: lp('/') },
    { name: t.nav_get_quote, url: lp('/teklif-al') },
  ]);

  const pageLd = webPageSchema({
    name: t.ta_ld_name,
    description: t.ta_ld_desc,
    path: '/teklif-al',
    lang,
    speakableSelectors: [
      '#quote-instant-answer-text',
      '#rfp-transition-instant-answer-text',
      '#pricing-product-instant-answer-text',
      'h1',
      'p',
    ],
  });

  const quoteActionLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: t.ta_quote_name,
    description: t.ta_quote_desc,
    potentialAction: {
      '@type': 'QuoteAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aloyonetim.com.tr/teklif-al',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Quote',
        name: t.ta_quote_result,
      },
    },
  };

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://aloyonetim.com.tr/#organization',
    name: 'Alo Yönetim',
    legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
    url: 'https://aloyonetim.com.tr',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90 216 550 48 48',
      contactType: 'sales and quotation',
      areaServed: 'TR',
      availableLanguage: ['Turkish', 'English', 'Russian', 'Arabic'],
    },
  };

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, quoteActionLd, organizationLd]} />
      <PageHeader
        title={t.ta_h1}
        description={t.ta_h1_desc}
      />

      <section className="py-20 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-16">
        {/* Nasıl çalışır */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div
              key={s.title}
              className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 flex flex-col gap-4 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">{s.icon}</span>
              </div>
              <h2 className="text-xl font-bold text-[var(--color-primary)]">{s.title}</h2>
              <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Google AI Overviews & Şeffaf Fiyatlandırma / Keşif Garantisi */}
        {lang === 'tr' && <QuoteAiOverviewCardSeo />}

        {/* Google AI Overviews & B2B Profesyonel Yönetime Geçiş Şartnamesi (Wave 66) */}
        {lang === 'tr' && <RfpTransitionAiGroundingSeo />}

        {/* Google Merchant & Servis Fiyatlandırma Paketleri (Wave 69) */}
        {lang === 'tr' && <ServicePricingProductAiOverviewSeo />}

        {/* Gömülü Teklif & Keşif Formu ve Fiyatlandırma Rehberi */}
        <TeklifAlClient />

        {/* İç linkler */}
        <div className="text-center flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            {t.ta_which_service}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={lp(s.href)}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] hover:border-slate-900 dark:hover:border-white transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
        {lang === 'tr' && (
          <ServiceAuthorityHubSeo
            serviceName="Site & Tesis Yönetimi Resmi Teklif ve Keşif Hizmeti"
            serviceCategory="Teklif & Sözleşme Yönetimi"
            lawReferences={[
              {
                title: "634 Sayılı Kat Mülkiyeti Kanunu — Madde 34 & 35",
                sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
                badge: "KMK m.34/35",
                description: "Yöneticinin kat malikleri kurulu adına üçüncü şahıslarla bakım, güvenlik, temizlik ve işletme sözleşmesi yapma yasal yetkileri."
              },
              {
                title: "4734 Sayılı Kamu İhale Kanunu — Hizmet Alımı Teknik Şartname Standartları",
                sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4734&MevzuatTur=1&MevzuatTertip=5",
                badge: "İhale Standartları",
                description: "Toplu konut ve karma tesislerde şeffaf tedarikçi seçimi, birim fiyat cetvelleri ve teknik şartname şablonları."
              },
              {
                title: "ISO 41001:2018 Entegre Tesis Yönetimi Standartları",
                sourceName: "Türk Standardları Enstitüsü (TSE)",
                url: "https://www.tse.org.tr",
                badge: "ISO 41001",
                description: "Teklif edilen tüm hizmet kalemlerinde KPI metrikleri, SLA seviyeleri ve aylık performans denetim kriterleri."
              }
            ]}
            glossaryTerms={[
              {
                slug: "isletme-projesi",
                term: "İşletme Projesi & Şeffaf Bütçe",
                summary: "Sitenin yıllık tahmini bütçesi ve her bağımsız bölüme düşen avans payını gösteren resmi projedir."
              },
              {
                slug: "demirbas",
                term: "Ortak Alan Demirbaş Yönetimi",
                summary: "Jeneratör, hidrofor, asansör ve havuz ekipmanlarının amortisman ve yenileme fonu planlamasıdır."
              },
              {
                slug: "arsa-payi",
                term: "Arsa Payı ve Gider Paylaşımı",
                summary: "Ortak giderlerin kanuna uygun olarak kat malikleri arasında adil dağıtılmasını sağlayan orandır."
              },
              {
                slug: "kat-mulkiyeti-kanunu-kmk",
                term: "KMK Yasal Çerçeve",
                summary: "Yönetim sözleşmelerinin hukuki geçerliliğini ve genel kurul onay mekanizmalarını düzenleyen kanundur."
              }
            ]}
          />
        )}
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/schema/JsonLd';
import Breadcrumbs from '@/components/ui/primitives/Breadcrumbs';
import PageHeader from '@/components/layout/page/PageHeader';
import DistrictAiOverviewSeo from '@/components/seo/ai-overviews/DistrictAiOverviewSeo';
import { generateBreadcrumbs, webPageSchema, type JsonLdObject } from '@/lib/schemas';
import { DISTRICTS, getDistrict } from '@/data/districts';
import { FACTS } from '@/lib/facts';
import trDict from '@/i18n/locales/tr/common.json';
import enDict from '@/i18n/locales/en/common.json';
import ruDict from '@/i18n/locales/ru/common.json';
import arDict from '@/i18n/locales/ar/common.json';

import Icon from '@/components/ui/branding/Icon';
const dictionaries: Record<string, Record<string, string>> = { tr: trDict, en: enDict, ru: ruDict, ar: arDict };

const DISTRICT_CORE_SERVICES = [
  { slug: 'site-yonetimi', label: 'Site Yönetimi', icon: 'apartment' },
  { slug: 'tesis-yonetimi', label: 'Tesis Yönetimi', icon: 'domain' },
  { slug: 'guvenlik-yonetimi', label: '5188 Özel Güvenlik', icon: 'shield' },
  { slug: 'teknik-bakim', label: 'Teknik Bakım & Onarım', icon: 'engineering' },
  { slug: 'temizlik-ve-hijyen', label: 'Temizlik ve Hijyen', icon: 'cleaning_services' },
  { slug: 'aidat-takibi', label: 'Aidat ve Bütçe Takibi', icon: 'account_balance_wallet' },
];

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return DISTRICTS.filter((d) => d.neighborhoodData?.length).map((d) => ({ lang: 'tr', ilce: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; ilce: string }>;
}): Promise<Metadata> {
  const { lang, ilce } = await params;
  const district = getDistrict(ilce);
  if (!district) {
    return buildMetadata({ title: 'İlçe Bulunamadı', description: '', path: '/bolgeler', lang, noindex: true });
  }
  return buildMetadata({
    title: `${district.name} Site Yönetimi — Hizmet Verilen Tüm Mahalleler | Alo Yönetim`,
    description: `${district.name} genelinde ve tüm mahallelerinde 634 sayılı KMK uyumlu profesyonel site yönetimi, aidat takibi ve 5188 lisanslı güvenlik hizmetleri. ${district.intro.split('.')[0]}.`,
    path: `/bolgeler/${ilce}/mahalleler`,
    lang,
    targetKeyword: `${district.name} site yönetimi`,
    keywords: [`${district.name} site yönetimi`, `${district.name} site yönetim şirketleri`, `${district.name} apartman yönetimi`, `${district.name} tesis yönetimi`],
  });
}

export default async function NeighborhoodsHubPage({
  params,
}: {
  params: Promise<{ lang: string; ilce: string }>;
}) {
  const { lang, ilce } = await params;
  const t = (key: string) => dictionaries[lang]?.[key] ?? dictionaries['tr'][key] ?? key;

  const district = getDistrict(ilce);
  if (!district || !district.neighborhoodData?.length) notFound();

  const breadcrumbs = [
    { name: t('breadcrumb_home') || 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
    { name: district.name, url: `/bolgeler/${ilce}` },
    { name: 'Mahalleler', url: `/bolgeler/${ilce}/mahalleler` },
  ];

  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: `${district.name} Site Yönetimi ve Hizmet Mahalleleri`,
    description: `${district.name}'deki tüm mahallelerde 634 sayılı KMK uyumlu profesyonel site ve tesis yönetimi hizmetleri.`,
    path: `/bolgeler/${ilce}/mahalleler`,
    speakableSelectors: ['h1', '#district-ai-overview-answer'],
  });

  const neighborhoodListLd: JsonLdObject = {
    '@type': 'ItemList',
    name: `${district.name} Site Yönetimi Hizmeti Verilen Mahalleler`,
    itemListElement: district.neighborhoodData.map((n, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${n.name} Site ve Apartman Yönetimi`,
      url: `${BASE_URL}/bolgeler/${ilce}/mahalleler/${n.slug}`,
    })),
  };

  const slaTarget =
    district.side === 'Anadolu' ? FACTS.emergencyResponse.anatolian : FACTS.emergencyResponse.european;

  return (
    <>
      <JsonLd data={[pageLd, generateBreadcrumbs(breadcrumbs), neighborhoodListLd]} />
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <PageHeader
        title={`${district.name} Site Yönetimi — Mahalle Hizmet Ağı`}
        description={`${district.name} genelinde ve tüm mahallelerinde 634 sayılı KMK uyumlu profesyonel site yönetimi, aidat takibi ve 5188 lisanslı güvenlik`}
      />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-5xl mx-auto flex flex-col gap-12">
        <DistrictAiOverviewSeo
          districtName={district.name}
          districtSlug={district.slug}
          side={district.side}
          slaTarget={slaTarget}
          neighborhoods={district.neighborhoods}
          localNeeds={district.localNeeds}
        />

        <p className="text-[var(--color-secondary)] text-lg leading-relaxed max-w-2xl">
          {district.intro}
        </p>

        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
            {district.name} Site Yönetimi Hizmeti Verdiğimiz Mahalleler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {district.neighborhoodData.map((n) => (
              <Link
                key={n.slug}
                href={`/bolgeler/${ilce}/mahalleler/${n.slug}`}
                className="group flex flex-col gap-3 p-6 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-2xl hover:border-brand-500/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon name="location_on" className="text-brand-600 dark:text-brand-400 text-lg" />
                  <h3 className="font-bold text-[var(--color-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {n.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {n.characteristics.slice(0, 2).map((c) => (
                    <span key={c} className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full capitalize">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[var(--color-secondary)] line-clamp-2">{n.intro}</p>
              </Link>
            ))}
          </div>
        </div>

        <section
          aria-label={`${district.name} ilçesi temel yönetim hizmetleri`}
          className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60"
        >
          <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
            {district.name} İlçesinde Sunduğumuz Temel Hizmetler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICT_CORE_SERVICES.map((srv) => (
              <Link
                key={srv.slug}
                href={`/bolgeler/${ilce}/${srv.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/50 hover:border-brand-500/60 transition-colors"
              >
                <Icon name={srv.icon} className="text-xl text-brand-600 dark:text-brand-400 shrink-0" />
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  {district.name} {srv.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href={`/bolgeler/${ilce}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors"
          >
            <Icon name="arrow_back" className="text-base" />
            {district.name} ilçe ana sayfasına dön
          </Link>
        </div>
      </div>
    </>
  );
}

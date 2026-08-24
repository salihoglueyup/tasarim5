import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata, LOCALES } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHeader from '@/components/layout/PageHeader';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { DISTRICTS, getDistrict } from '@/data/districts';
import trDict from '@/i18n/locales/tr/common.json';
import enDict from '@/i18n/locales/en/common.json';
import ruDict from '@/i18n/locales/ru/common.json';
import arDict from '@/i18n/locales/ar/common.json';

const dictionaries: Record<string, Record<string, string>> = { tr: trDict, en: enDict, ru: ruDict, ar: arDict };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    DISTRICTS.filter((d) => d.neighborhoodData?.length).map((d) => ({ lang, ilce: d.slug })),
  );
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
    title: `${district.name} Mahalleleri — Tesis Yönetimi Hizmetleri | Alo Yönetim`,
    description: `${district.name}'deki tüm mahallelerde profesyonel tesis yönetimi, güvenlik ve teknik bakım hizmetleri. ${district.intro.split('.')[0]}.`,
    path: `/bolgeler/${ilce}/mahalleler`,
    lang,
    targetKeyword: `${district.name} mahalleleri tesis yönetimi`,
    keywords: [`${district.name} tesis yönetimi`, `${district.name} mahalleler`, `${district.name} site yönetimi`],
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
    name: `${district.name} Mahalleleri — Tesis Yönetimi`,
    description: `${district.name}'deki tüm mahallelerde profesyonel tesis yönetimi hizmetleri.`,
    path: `/bolgeler/${ilce}/mahalleler`,
  });

  return (
    <>
      <JsonLd data={[pageLd, generateBreadcrumbs(breadcrumbs)]} />
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <PageHeader
        title={`${district.name} Mahalleleri`}
        description={`${district.name}'de tesis yönetimi hizmeti verdiğimiz mahalleler`}
      />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-5xl mx-auto flex flex-col gap-12">
        <p className="text-[var(--color-secondary)] text-lg leading-relaxed max-w-2xl">
          {district.intro}
        </p>

        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
            Hizmet Verdiğimiz {district.name} Mahalleleri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {district.neighborhoodData.map((n) => (
              <Link
                key={n.slug}
                href={`/bolgeler/${ilce}/mahalleler/${n.slug}`}
                className="group flex flex-col gap-3 p-6 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-2xl hover:border-brand-500/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-lg" aria-hidden="true">
                    location_on
                  </span>
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

        <div className="text-center">
          <Link
            href={`/bolgeler/${ilce}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {district.name} ilçe ana sayfasına dön
          </Link>
        </div>
      </div>
    </>
  );
}

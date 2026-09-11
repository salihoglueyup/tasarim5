import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata, LOCALES, BASE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHeader from '@/components/layout/PageHeader';
import { DynamicFAQ } from '@/components';
import { generateBreadcrumbs, webPageSchema, faqPageSchema, ORG_PHONE, ORG_EMAIL, ORG_LOGO, ORG_ADDRESS, ORG_PRICE_RANGE } from '@/lib/schemas';
import { DISTRICTS, getDistrict } from '@/data/districts';
import { SERVICES } from '@/data/services';
import type { Metadata as NextMetadata } from 'next';
import trDict from '@/i18n/locales/tr/common.json';
import enDict from '@/i18n/locales/en/common.json';
import ruDict from '@/i18n/locales/ru/common.json';
import arDict from '@/i18n/locales/ar/common.json';

const dictionaries: Record<string, Record<string, string>> = { tr: trDict, en: enDict, ru: ruDict, ar: arDict };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    DISTRICTS.filter((d) => d.neighborhoodData?.length).flatMap((d) =>
      (d.neighborhoodData ?? []).map((n) => ({ lang, ilce: d.slug, mahalle: n.slug })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; ilce: string; mahalle: string }>;
}): Promise<Metadata> {
  const { lang, ilce, mahalle } = await params;
  const district = getDistrict(ilce);
  const neighborhood = district?.neighborhoodData?.find((n) => n.slug === mahalle);

  if (!district || !neighborhood) {
    return buildMetadata({
      title: 'Sayfa Bulunamadı',
      description: 'Aradığınız mahalle sayfası bulunamadı.',
      path: `/bolgeler/${ilce}/mahalleler/${mahalle}`,
      lang,
      noindex: true,
    });
  }

  let title = `${neighborhood.name}, ${district.name} Tesis Yönetimi & Site Yönetim Şirketi | Alo Yönetim`;
  let description = `${neighborhood.name} (${district.name}) genelinde 634 sayılı KMK uyumlu profesyonel tesis yönetimi, 5188 lisanslı güvenlik, aidat tahsilatı ve periyodik teknik bakım. 48 saatte ücretsiz keşif!`;
  let targetKeyword = `${neighborhood.name} tesis yönetimi`;
  let keywords = [
    `${neighborhood.name} tesis yönetimi`,
    `${neighborhood.name} site yönetimi`,
    `${neighborhood.name} apartman yönetimi`,
    `${neighborhood.name} güvenlik şirketi`,
    `${neighborhood.name} aidat takibi`,
    `${district.name} tesis yönetimi`,
  ];

  if (lang === 'en') {
    title = `Facility Management in ${neighborhood.name}, ${district.name} | Alo Yönetim`;
    description = `Professional property & facility management, 5188 security, technical maintenance and cleaning in ${neighborhood.name}, ${district.name}, Istanbul.`;
    targetKeyword = `${neighborhood.name} facility management`;
    keywords = [
      `${neighborhood.name} facility management`,
      `${neighborhood.name} property management`,
      `${district.name} building management`,
      `${neighborhood.name} site security`,
    ];
  } else if (lang === 'ru') {
    title = `Управление объектами в ${neighborhood.name}, ${district.name} | Alo Yönetim`;
    description = `Профессиональное управление жилыми комплексами, охрана 5188, клининг и техническое обслуживание в ${neighborhood.name}, ${district.name}, Стамбул.`;
    targetKeyword = `управление объектами ${neighborhood.name}`;
    keywords = [
      `управление объектами ${neighborhood.name}`,
      `управление недвижимостью ${district.name}`,
      `охрана жилых комплексов ${neighborhood.name}`,
      `обслуживание зданий ${district.name}`,
    ];
  } else if (lang === 'ar') {
    title = `إدارة المرافق في ${neighborhood.name}، ${district.name} | Alo Yönetim`;
    description = `خدمات إدارة المرافق والمجمعات السكنية، الأمن الفندقي 5188، والصيانة الفنية في حي ${neighborhood.name}، ${district.name}، إسطنبول.`;
    targetKeyword = `إدارة المرافق ${neighborhood.name}`;
    keywords = [
      `إدارة المرافق ${neighborhood.name}`,
      `إدارة العقارات ${district.name}`,
      `أمن المجمعات السكنية ${neighborhood.name}`,
      `صيانة المباني ${district.name}`,
    ];
  }

  return buildMetadata({
    title,
    description,
    path: `/bolgeler/${ilce}/mahalleler/${mahalle}`,
    lang,
    targetKeyword,
    keywords,
  });
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ lang: string; ilce: string; mahalle: string }>;
}) {
  const { lang, ilce, mahalle } = await params;
  const t = (key: string) => dictionaries[lang]?.[key] ?? dictionaries['tr'][key] ?? key;

  const district = getDistrict(ilce);
  const neighborhood = district?.neighborhoodData?.find((n) => n.slug === mahalle);
  if (!district || !neighborhood) notFound();

  const path = `/bolgeler/${ilce}/mahalleler/${mahalle}`;

  const faqs = [
    {
      question: `${neighborhood.name}, ${district.name}'de tesis yönetimi hizmetleri nelerdir?`,
      answer: `${neighborhood.name} mahallesinde güvenlik yönetimi, profesyonel temizlik, teknik bakım, peyzaj, havuz bakımı ve aidat icra takibi dahil tüm entegre tesis yönetimi hizmetlerini sunuyoruz. ${neighborhood.characteristics[0] ? `${neighborhood.characteristics[0].charAt(0).toUpperCase() + neighborhood.characteristics[0].slice(1)} yapısına uygun özel çözümler geliştiriyoruz.` : ''}`,
    },
    {
      question: `${neighborhood.name}'de yönetim devir süreci nasıl işler?`,
      answer: `${neighborhood.name} ve ${district.name} genelinde yönetim devirlerini 48 saat içinde tamamlıyoruz. Önce ücretsiz keşif yapılır, ardından demirbaş tutanağı hazırlanır ve şeffaf teklif sunulur.`,
    },
    {
      question: `${district.name} ${neighborhood.name}'de aidat yönetimi nasıl yapılıyor?`,
      answer: `${neighborhood.name} sakinleri için dijital aidat takip sistemimiz aracılığıyla şeffaf gelir-gider raporu, otomatik hatırlatıcı ve gerektiğinde KMK 634 kapsamında hukuki icra takibi hizmeti sunuyoruz.`,
    },
    {
      question: `${neighborhood.name} mahallesi için tesis yönetimi fiyatı nedir?`,
      answer: `${neighborhood.name}'deki sitenizin aidat fiyatı; daire sayısı, ortak alan büyüklüğü ve talep edilen hizmet kapsamına göre belirlenir. Ücretsiz keşif sonrası şeffaf fiyat teklifi alabilirsiniz.`,
    },
  ];

  const breadcrumbs = [
    { name: t('breadcrumb_home') || 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
    { name: district.name, url: `/bolgeler/${ilce}` },
    { name: 'Mahalleler', url: `/bolgeler/${ilce}/mahalleler` },
    { name: neighborhood.name, url: path },
  ];

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${BASE_URL}${path}#localbusiness`,
    name: `Alo Yönetim — ${neighborhood.name} Tesis Yönetimi`,
    description: `${neighborhood.name}, ${district.name} genelinde apartman ve siteler için KMK 634 uyumlu profesyonel tesis yönetimi, 5188 lisanslı güvenlik, temizlik ve teknik bakım.`,
    url: `${BASE_URL}${path}`,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    image: ORG_LOGO,
    priceRange: ORG_PRICE_RANGE,
    address: ORG_ADDRESS,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${neighborhood.name}, ${district.name}, İstanbul`,
    },
    geo: neighborhood.geo
      ? { '@type': 'GeoCoordinates', latitude: neighborhood.geo.lat, longitude: neighborhood.geo.lng }
      : { '@type': 'GeoCoordinates', latitude: district.geo.lat, longitude: district.geo.lng },
    hasMap: `https://www.google.com/maps?q=Alo+Yönetim+${encodeURIComponent(`${neighborhood.name} ${district.name}`)}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '48',
      bestRating: '5',
      worstRating: '1',
    },
    serviceType: ['Tesis Yönetimi', 'Site Güvenliği', 'Teknik Bakım', 'Aidat Yönetimi'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${neighborhood.name} Tesis Yönetimi Hizmetleri`,
    },
  };

  const pageLd = webPageSchema({
    name: `${neighborhood.name}, ${district.name} Tesis Yönetimi`,
    description: neighborhood.intro,
    path,
    speakableSelectors: ['.neighborhood-intro', 'h1'],
  });

  const faqLd = faqPageSchema(faqs);
  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  const MAIN_SERVICES = SERVICES.filter((s) =>
    ['tesis-yonetimi', 'guvenlik-yonetimi', 'temizlik-ve-hijyen', 'teknik-bakim'].includes(s.slug),
  );

  return (
    <>
      <JsonLd data={[localBusinessLd, pageLd, faqLd, breadcrumbLd]} />
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <PageHeader
        title={`${neighborhood.name}, ${district.name}`}
        description="Profesyonel Tesis & Site Yönetimi Hizmetleri"
      />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-6xl mx-auto flex flex-col gap-16">
        {/* Neighborhood Intro */}
        <div className="neighborhood-intro bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem]">
          <div className="flex flex-wrap gap-2 mb-6">
            {neighborhood.characteristics.map((c) => (
              <span key={c} className="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-3 py-1.5 rounded-full font-semibold capitalize">
                {c}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
            {neighborhood.name} Mahallesi Hakkında
          </h2>
          <p className="text-lg text-[var(--color-secondary)] leading-relaxed">{neighborhood.intro}</p>
          <div className="mt-6 pt-6 border-t border-[var(--color-outline)]/40">
            <Link
              href="/teklif-al"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">request_quote</span>
              Ücretsiz Keşif Talep Et
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
            {neighborhood.name}'de Sunduğumuz Hizmetler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MAIN_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/bolgeler/${ilce}/${service.slug}`}
                className="group flex items-start gap-4 p-6 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-2xl hover:border-brand-500/50 transition-colors"
              >
                <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-2xl shrink-0 mt-0.5" aria-hidden="true">
                  {service.icon ?? 'check_circle'}
                </span>
                <div>
                  <div className="font-bold text-[var(--color-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {service.name}
                  </div>
                  <div className="text-xs text-[var(--color-secondary)] mt-1">
                    {district.name} genelinde profesyonel {service.name.toLowerCase()} hizmeti
                  </div>
                </div>
              </Link>
            ))}
            {SERVICES.filter((s) => !MAIN_SERVICES.find((m) => m.slug === s.slug)).slice(0, 4).map((service) => (
              <Link
                key={service.slug}
                href={`/bolgeler/${ilce}/${service.slug}`}
                className="group flex items-start gap-4 p-6 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-2xl hover:border-brand-500/50 transition-colors"
              >
                <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-2xl shrink-0 mt-0.5" aria-hidden="true">
                  {service.icon ?? 'check_circle'}
                </span>
                <div>
                  <div className="font-bold text-[var(--color-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {service.name}
                  </div>
                  <div className="text-xs text-[var(--color-secondary)] mt-1">
                    {neighborhood.name} ve {district.name} bölgesinde hizmet
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem]">
          <DynamicFAQ
            faqs={faqs}
            title={`${neighborhood.name} Tesis Yönetimi — Sık Sorulan Sorular`}
          />
        </div>

        {/* Back to District */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href={`/bolgeler/${ilce}`}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
            {district.name} ilçe sayfasına dön
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            href={`/bolgeler/${ilce}/mahalleler`}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">location_on</span>
            Tüm {district.name} mahalleleri
          </Link>
        </div>
      </div>
    </>
  );
}

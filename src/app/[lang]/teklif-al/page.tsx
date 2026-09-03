import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { QuoteCtaButton } from '@/components';
import { ServiceAuthorityHubSeo } from '@/components/seo';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';

import { buildMetadata } from '@/lib/seo';
import TeklifAlClient from './TeklifAlClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Ücretsiz Tesis ve Site Yönetimi Teklifi Alın | Alo Yönetim',
    description:
      'Siteniz, plazanınız veya tesisiniz için 48 saat içinde şeffaf yönetim teklifi ve ücretsiz yerinde keşif hizmeti. %30 maliyet tasarrufuyla teklifinizi alın!',
    path: '/teklif-al',
    lang,
    targetKeyword: 'site yönetimi teklif al',
    keywords: ['tesis yönetimi teklif', 'site yönetimi fiyat', 'ücretsiz tesis keşfi', 'apartman yönetimi teklif', 'site yönetim maliyeti'],
    ogImageType: 'service',
  });
}

const STEPS = [
  {
    icon: 'edit_note',
    title: '1. Bilgilerinizi Paylaşın',
    desc: 'Sitenizin daire sayısı, konumu ve ihtiyaç duyduğunuz hizmetleri kısa formda iletin.',
  },
  {
    icon: 'search_insights',
    title: '2. Ücretsiz Keşif',
    desc: 'Uzman ekibimiz binanızı yerinde inceleyerek ihtiyaç analizi ve maliyet çıkarır.',
  },
  {
    icon: 'request_quote',
    title: '3. Şeffaf Teklif',
    desc: '48 saat içinde kalem kalem, gizli gider içermeyen net yönetim teklifinizi sunarız.',
  },
];

const SERVICES = [
  { href: '/hizmetler/tesis-yonetimi', label: 'Tesis Yönetimi' },
  { href: '/hizmetler/guvenlik-yonetimi', label: 'Güvenlik Yönetimi' },
  { href: '/hizmetler/temizlik-ve-hijyen', label: 'Temizlik ve Hijyen' },
  { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Hukuk ve İcra' },
];

export default function TeklifAl() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Teklif Al', url: '/teklif-al' },
  ]);

  const pageLd = webPageSchema({
    name: 'Ücretsiz Tesis Yönetimi Teklifi Alın',
    description:
      'Siteniz veya tesisiniz için ücretsiz keşif ve şeffaf yönetim teklifi. 48 saat içinde net fiyat.',
    path: '/teklif-al',
  });

  const quoteActionLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Alo Yönetim Şeffaf Tesis Yönetimi Teklifi',
    description: 'ISO 41001 standartlarında 5188 güvenlik ve aidat takibi içeren kurumsal tesis yönetim teklifi.',
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
        name: '48 Saatte Şeffaf Tesis Yönetimi Teklifi',
      },
    },
  };

  const contactPointLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    telephone: '+90-216-550-48-48',
    contactType: 'sales and quotation',
    areaServed: 'TR',
    availableLanguage: ['Turkish', 'English', 'Russian', 'Arabic'],
  };

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, quoteActionLd, contactPointLd]} />
      <PageHeader
        title="Ücretsiz Teklif Alın"
        description="Siteniz veya tesisiniz için ücretsiz keşif ve şeffaf yönetim teklifini 48 saat içinde alın. Gizli gider yok, taahhüt yok."
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

        {/* Gömülü Teklif & Keşif Formu ve Fiyatlandırma Rehberi */}
        <TeklifAlClient />

        {/* İç linkler */}
        <div className="text-center flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Hangi hizmet için teklif istiyorsunuz?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] hover:border-slate-900 dark:hover:border-white transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
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
      </section>
    </>
  );
}

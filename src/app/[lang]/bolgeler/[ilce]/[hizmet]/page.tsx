import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd, QuoteCtaButton, TldrBlock } from '@/components';
import { buildMetadata } from '@/lib/seo';
import {
  generateBreadcrumbs,
  webPageSchema,
  localServiceSchema,
  localBusinessAreaSchema,
  faqPageSchema,
  ORG_PHONE,
} from '@/lib/schemas';
import { DISTRICTS, getDistrict } from '@/data/districts';
import { SERVICES, getService } from '@/data/services';
import { LOCALES } from '@/lib/seo';

// ISR (Faz 120): 96 kombinasyon sayfası günlük yeniden doğrulanır.
export const revalidate = 86400;
export const dynamicParams = true;

// Hizmet × ilçe matrisini her locale için ön-üret (Faz 105).
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    DISTRICTS.flatMap((d) =>
      SERVICES.map((s) => ({ lang, ilce: d.slug, hizmet: s.slug })),
    ),
  );
}

/** Hizmet×ilçe özel SSS (Faz 115/129 — schema-content uyumlu). */
function serviceDistrictFaqs(serviceName: string, districtName: string, benefit: string) {
  return [
    {
      question: `${districtName}'de ${serviceName.toLowerCase()} ne kadar tutar?`,
      answer: `${districtName}'de ${serviceName.toLowerCase()} maliyeti; sitenizin büyüklüğü, ihtiyaç kapsamı ve hizmet sıklığına göre belirlenir. Ücretsiz keşif sonrası kalem kalem, gizli gider içermeyen net bir teklif sunarız.`,
    },
    {
      question: `${districtName}'de ${serviceName.toLowerCase()} hizmetiniz neleri kapsıyor?`,
      answer: `${districtName} genelinde sunduğumuz ${serviceName.toLowerCase()} hizmeti; ${benefit.toLowerCase()} başta olmak üzere sitenizin tüm ihtiyaçlarını profesyonel ekip ve düzenli raporlamayla karşılar.`,
    },
    {
      question: `${districtName}'de acil durumda ne kadar sürede ulaşırsınız?`,
      answer: `${districtName}'de yerel ekip yapımız sayesinde acil taleplerde hızlı müdahale ederiz; mahallenizdeki sitelere en kısa sürede ulaşacak şekilde planlama yaparız.`,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; ilce: string; hizmet: string }>;
}): Promise<Metadata> {
  const { lang, ilce, hizmet } = await params;
  const district = getDistrict(ilce);
  const service = getService(hizmet);
  if (!district || !service) {
    return buildMetadata({
      title: 'Sayfa Bulunamadı',
      description: 'Aradığınız sayfa bulunamadı.',
      path: `/bolgeler/${ilce}/${hizmet}`,
      lang,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${service.name} ${district.name}`,
    description: `${district.name}'de profesyonel ${service.name.toLowerCase()}. ${service.summary} ${district.name} yerel ekibimizle hemen ücretsiz teklif alın.`,
    path: `/bolgeler/${ilce}/${hizmet}`,
    lang,
    keywords: service.keywords.map((k) => `${k} ${district.name}`),
  });
}

export default async function ServiceDistrictPage({
  params,
}: {
  params: Promise<{ lang: string; ilce: string; hizmet: string }>;
}) {
  const { ilce, hizmet } = await params;
  const district = getDistrict(ilce);
  const service = getService(hizmet);
  if (!district || !service) notFound();

  const path = `/bolgeler/${district.slug}/${service.slug}`;
  const faqs = serviceDistrictFaqs(service.name, district.name, service.benefits[0]);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
    { name: district.name, url: `/bolgeler/${district.slug}` },
    { name: service.shortName, url: path },
  ]);

  const serviceLd = localServiceSchema({
    serviceType: service.name,
    areaName: district.name,
    path,
    description: service.summary,
  });
  const businessLd = localBusinessAreaSchema({
    areaName: district.name,
    geo: district.geo,
    url: path,
  });
  const faqLd = faqPageSchema(faqs);
  const pageLd = webPageSchema({
    name: `${service.name} ${district.name}`,
    description: service.summary,
    path,
    speakableSelectors: ['h1', '.tldr'],
  });

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, serviceLd, businessLd, faqLd]} />
      <PageHeader
        title={`${service.name} — ${district.name}`}
        description={`${district.name} ve mahallelerinde profesyonel ${service.name.toLowerCase()} hizmeti.`}
      />

      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-14">
        {/* TL;DR (AI/snippet için) */}
        <TldrBlock>
          {district.name}&apos;de {service.name.toLowerCase()} için Alo Yönetim; {service.benefits[0].toLowerCase()} başta olmak üzere profesyonel ekiple hizmet verir. Ücretsiz keşif sonrası 48 saat içinde şeffaf, gizli gider içermeyen teklif sunulur. İletişim: 0216 550 48 48.
        </TldrBlock>

        {/* Giriş — hizmet + ilçe bağlamı (özgün) */}
        <div className="flex flex-col gap-5 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
            {district.name}&apos;de {service.name}
          </h2>
          <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
            {service.summary}
          </p>
          <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
            {district.intro} Bu nedenle {district.name}&apos;de {service.name.toLowerCase()} hizmetimizi,
            özellikle <strong>{district.localNeeds[0].toLowerCase()}</strong> ihtiyacını gözeterek
            planlıyoruz. {district.neighborhoods.slice(0, 3).join(', ')} başta olmak üzere ilçenin
            tüm mahallelerinde yerinde hizmet veriyoruz.
          </p>
        </div>

        {/* Faydalar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {service.benefits.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-5"
            >
              <span className="material-symbols-outlined text-emerald-600 shrink-0">check_circle</span>
              <span className="text-sm text-[var(--color-secondary)] font-medium">{b}</span>
            </div>
          ))}
        </div>

        {/* Yerel SSS */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
            {district.name} {service.shortName} — Sıkça Sorulan Sorular
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((f) => (
              <div
                key={f.question}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-2xl p-6"
              >
                <h3 className="font-bold text-[var(--color-primary)] mb-2">{f.question}</h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[3rem] p-10 md:p-14 flex flex-col items-center text-center gap-6 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            {district.name}&apos;de {service.shortName.toLowerCase()} için teklif alın
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <QuoteCtaButton className="bg-white text-slate-950 font-bold py-3.5 px-8 rounded-xl hover:bg-slate-100 transition-colors shadow-lg">
              Ücretsiz Teklif Al
            </QuoteCtaButton>
            <a
              href={`tel:${ORG_PHONE}`}
              className="border border-white/30 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-colors"
            >
              Hemen Ara: 0216 550 48 48
            </a>
          </div>
        </div>

        {/* İç linkler: pillar + diğer hizmetler + ilçe */}
        <div className="flex flex-col gap-5">
          <p className="text-sm text-[var(--color-secondary)]">
            Ayrıntılı bilgi:{' '}
            <Link href={service.pillar} className="text-slate-900 dark:text-white font-semibold hover:underline">
              {service.name} hizmetimiz
            </Link>{' '}
            ·{' '}
            <Link href={`/bolgeler/${district.slug}`} className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} tüm hizmetler
            </Link>
          </p>
          <div className="flex flex-wrap gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/bolgeler/${district.slug}/${s.slug}`}
                className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-primary)] hover:border-slate-900 dark:hover:border-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                {s.shortName} — {district.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

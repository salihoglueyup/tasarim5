import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd, QuoteCtaButton, TldrBlock } from '@/components';
import { buildMetadata } from '@/lib/seo';
import {
  generateBreadcrumbs,
  webPageSchema,
  localBusinessAreaSchema,
  faqPageSchema,
  ORG_PHONE,
} from '@/lib/schemas';
import { DISTRICTS, getDistrict } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { LOCALES } from '@/lib/seo';

// ISR: yüzlerce yerel sayfa için günlük yeniden doğrulama (Faz 120/126).
export const revalidate = 86400;
export const dynamicParams = true;

// Tüm ilçeleri her locale için ön-üret (Faz 104).
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    DISTRICTS.map((d) => ({ lang, ilce: d.slug })),
  );
}

/** İlçeye özel SSS üretir (Faz 115 — schema-content uyumlu). */
function districtFaqs(name: string, needs: string[]) {
  return [
    {
      question: `${name}'de site yönetimi ücretleri nasıl belirlenir?`,
      answer: `${name}'de yönetim ücreti; daire sayısı, sunulan hizmetler (güvenlik, temizlik, teknik bakım) ve ortak alan büyüklüğüne göre belirlenir. Şeffaf işletme projesi ile her kalem net olarak paylaşılır ve gizli gider bulunmaz.`,
    },
    {
      question: `${name}'de hangi tesis yönetimi hizmetlerini sunuyorsunuz?`,
      answer: `${name} genelinde güvenlik yönetimi, profesyonel temizlik, teknik bakım, peyzaj, havuz bakımı, haşere kontrolü ve hukuk & icra danışmanlığı dahil tüm tesis yönetimi hizmetlerini tek çatı altında sunuyoruz.`,
    },
    {
      question: `${name}'de yönetim değişikliği süreci nasıl işler?`,
      answer: `Öncelikle ${name}'deki sitenizde ücretsiz keşif yaparız; ardından mevcut yönetim planı ve demirbaş devrini tutanakla alır, 48 saat içinde şeffaf teklifimizi sunarız. En yoğun ihtiyacınız ${needs[0].toLowerCase()} ise sürecin merkezine bunu koyarız.`,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; ilce: string }>;
}): Promise<Metadata> {
  const { lang, ilce } = await params;
  const district = getDistrict(ilce);
  if (!district) {
    return buildMetadata({
      title: 'Bölge Bulunamadı',
      description: 'Aradığınız bölge bulunamadı.',
      path: `/bolgeler/${ilce}`,
      lang,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${district.name} Tesis ve Site Yönetimi`,
    description: `${district.name}'de profesyonel site, apartman ve tesis yönetimi. Güvenlik, temizlik, teknik bakım ve aidat yönetimi için ${district.name} yerel ekibimizle 7/24 hizmetinizdeyiz.`,
    path: `/bolgeler/${ilce}`,
    lang,
    keywords: [
      `${district.name} site yönetimi`,
      `${district.name} tesis yönetimi`,
      `${district.name} apartman yönetimi`,
    ],
  });
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ lang: string; ilce: string }>;
}) {
  const { ilce } = await params;
  const district = getDistrict(ilce);
  if (!district) notFound();

  const path = `/bolgeler/${district.slug}`;
  const faqs = districtFaqs(district.name, district.localNeeds);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
    { name: district.name, url: path },
  ]);

  const businessLd = localBusinessAreaSchema({
    areaName: district.name,
    geo: district.geo,
    description: district.intro,
    url: path,
  });

  const faqLd = faqPageSchema(faqs);
  const pageLd = webPageSchema({
    name: `${district.name} Tesis ve Site Yönetimi`,
    description: district.intro,
    path,
    speakableSelectors: ['h1', '.tldr'],
  });

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${district.geo.lng - 0.03}%2C${district.geo.lat - 0.02}%2C${district.geo.lng + 0.03}%2C${district.geo.lat + 0.02}&marker=${district.geo.lat}%2C${district.geo.lng}`;

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, businessLd, faqLd]} />
      <PageHeader
        title={`${district.name} Tesis Yönetimi`}
        description={`${district.name} ve çevresinde profesyonel site, apartman ve tesis yönetimi hizmetleri.`}
      />

      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-16">
        {/* TL;DR (AI/snippet için) */}
        <TldrBlock>
          {district.name}&apos;de site, apartman ve tesis yönetimi için Alo Yönetim; güvenlik, temizlik, teknik bakım, peyzaj ve aidat yönetimi dahil tüm hizmetleri tek çatı altında sunar. {district.name}&apos;de {district.managedProjects}+ proje yönetilmektedir. Ücretsiz keşif için: 0216 550 48 48.
        </TldrBlock>

        {/* Giriş + yerel kanıt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 flex flex-col gap-5">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
              {district.name}&apos;de Profesyonel Tesis Yönetimi
            </h2>
            <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
              {district.intro}
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              {district.localNeeds.map((need) => (
                <li key={need} className="flex items-start gap-3 text-sm text-[var(--color-secondary)]">
                  <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0">check_circle</span>
                  {need}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[2.5rem] p-8 flex flex-col gap-4 shadow-xl">
            <div className="text-4xl font-black text-emerald-400">{district.managedProjects}+</div>
            <div className="font-semibold">{district.name}&apos;de yönetilen proje</div>
            <p className="text-xs text-gray-300 font-light border-t border-white/10 pt-4">
              {district.side} Yakası · ~{Math.round(district.population / 1000)} bin nüfus ·{' '}
              {district.neighborhoods.length} öne çıkan mahalle
            </p>
          </div>
        </div>

        {/* Hizmetler → hizmet×ilçe sayfaları */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
            {district.name}&apos;de Sunduğumuz Hizmetler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/bolgeler/${district.slug}/${s.slug}`}
                className="group bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] p-7 flex flex-col gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <span className="material-symbols-outlined text-3xl text-slate-900 dark:text-white">{s.icon}</span>
                <h3 className="text-lg font-bold text-[var(--color-primary)]">
                  {s.shortName} — {district.name}
                </h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed line-clamp-2">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Mahalleler (near-me) */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            {district.name}&apos;de Hizmet Verdiğimiz Mahalleler
          </h2>
          <p className="text-sm text-[var(--color-secondary)] font-light">
            Yerel ekibimiz {district.name}&apos;in tüm mahallelerinde, yakınınızdaki sitelere hızlı
            ulaşır:
          </p>
          <div className="flex flex-wrap gap-3">
            {district.neighborhoods.map((n) => (
              <span
                key={n}
                className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white rounded-full px-4 py-2 text-sm font-semibold"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Harita (lazy) */}
        <div className="rounded-[2.5rem] overflow-hidden border border-[var(--color-outline)]/60">
          <iframe
            title={`${district.name} konum haritası`}
            src={mapSrc}
            loading="lazy"
            className="w-full h-80 border-0"
          />
        </div>

        {/* Yerel SSS */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
            {district.name} — Sıkça Sorulan Sorular
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
          <h2 className="text-3xl font-extrabold">{district.name} için ücretsiz teklif alın</h2>
          <p className="text-gray-300 font-light max-w-xl">
            {district.name}&apos;deki sitenizde ücretsiz keşif yapalım, 48 saat içinde şeffaf teklifinizi
            sunalım.
          </p>
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

        {/* Blog & pillar iç linkler */}
        <div className="text-center flex flex-col gap-4">
          <p className="text-sm text-[var(--color-secondary)]">
            İlgili rehberler:{' '}
            <Link href="/blog" className="text-slate-900 dark:text-white font-semibold hover:underline">
              Site Yönetimi Blogu
            </Link>{' '}
            ·{' '}
            <Link href="/sozluk" className="text-slate-900 dark:text-white font-semibold hover:underline">
              Yönetim Sözlüğü
            </Link>{' '}
            ·{' '}
            <Link href="/bolgeler" className="text-slate-900 dark:text-white font-semibold hover:underline">
              Tüm Bölgeler
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { resolveLegacyDistrictSlug, resolveLegacyTermSlug } from '@/lib/legacySlugs';
import { localePath } from '@/lib/i18n/localePath';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/page/PageHeader';
import JsonLd from '@/components/seo/schema/JsonLd';
import QuoteCtaButton from '@/components/ui/widgets/QuoteCtaButton';
import TldrBlock from '@/components/ui/primitives/TldrBlock';
import DynamicFAQ from '@/components/seo/schema/DynamicFAQ';
import NeighborhoodDirectorySeo from '@/components/seo/district/NeighborhoodDirectorySeo';
import ServiceAuthorityHubSeo from '@/components/seo/facility/ServiceAuthorityHubSeo';
import ReferenceCard from '@/components/sections/references/ReferenceCard';

import { buildMetadata, LOCALES } from '@/lib/seo';
import {
  generateBreadcrumbs,
  webPageSchema,
  localBusinessAreaSchema,
  faqPageSchema,
  ORG_PHONE,
} from '@/lib/schemas';
import { DISTRICTS, getDistrict, type NeighborhoodInfo } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { REAL_REFERENCES } from '@/data/realReferences';
import { FACTS } from '@/lib/facts';
import { getNeighborDistrictLinks, getCrossSideDistrictLinks } from '@/lib/seo/facility/districtCrossLinker';
import { getFacilitySerpMeta } from '@/lib/seo/facility/facilitySerpOptimizer';

import Icon from '@/components/ui/branding/Icon';
// ISR: yüzlerce yerel sayfa için günlük yeniden doğrulama (Faz 120/126).
export const revalidate = 86400;
export const dynamicParams = true;

// Tüm ilçeleri her locale için ön-üret (Faz 104).
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    DISTRICTS.map((d) => ({ lang, ilce: d.slug })),
  );
}

/** Yakaya göre yazılı SLA kapsamındaki acil teknik müdahale hedefi (doğrulanmış bilgi: src/lib/facts.ts). */
function responseTarget(side: 'Anadolu' | 'Avrupa') {
  return side === 'Anadolu' ? FACTS.emergencyResponse.anatolian : FACTS.emergencyResponse.european;
}

/** İlçeye özel SSS üretir (yalnızca doğrulanmış bilgiler). */
function districtFaqs(name: string, side: 'Anadolu' | 'Avrupa', needs: string[]) {
  return [
    {
      question: `${name}'de site yönetimi ücretleri nasıl belirlenir?`,
      answer: `${name}'de yönetim ücreti; daire sayısı, sunulan hizmetler (güvenlik, temizlik, teknik bakım) ve ortak alan büyüklüğüne göre belirlenir. Ücretsiz keşif sonrasında kalemleri ayrıştırılmış yazılı bir teklif sunulur.`,
    },
    {
      question: `${name}'de hangi tesis yönetimi hizmetlerini sunuyorsunuz?`,
      answer: `${name} genelinde güvenlik yönetimi, profesyonel temizlik, teknik bakım, peyzaj, havuz bakımı, haşere kontrolü, aidat takibi ve hukuk & icra danışmanlığı dahil hizmetleri tek çatı altında sunuyoruz.`,
    },
    {
      question: `${name}'de yönetim değişikliği süreci nasıl işler?`,
      answer: `Öncelikle ${name}'deki sitenizde ücretsiz keşif yapılır; ardından mevcut yönetim planı ve demirbaş devri tutanakla alınır ve yazılı teklif sunulur. En yoğun ihtiyacınız ${needs[0]?.toLowerCase() || 'güvenlik ve aidat yönetimi'} ise sürecin merkezine bu konu konur.`,
    },
    {
      question: `${name}'de acil teknik arızalara ne kadar sürede müdahale edilir?`,
      answer: `Yazılı SLA kapsamında acil teknik müdahale hedefimiz (${side} Yakası): ${responseTarget(side)}. Süre, sözleşmedeki SLA hükümlerine bağlıdır.`,
    },
    {
      question: `${name} bölgesindeki sitelerde en sık karşılaşılan ihtiyaçlar nelerdir?`,
      answer: `${name} bölgesindeki toplu yapılarda öne çıkan ihtiyaçlar: ${needs.slice(0, 3).join(', ')}. Operasyon planı bu yerel ihtiyaçlara göre hazırlanır.`,
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

  const serpMeta = getFacilitySerpMeta(lang, district.slug);

  return buildMetadata({
    title: serpMeta.title,
    description: serpMeta.description,
    path: `/bolgeler/${ilce}`,
    lang,
    targetKeyword: serpMeta.targetKeyword,
    ogImageType: 'local',
    keywords: serpMeta.keywords,
  });
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ lang: string; ilce: string }>;
}) {
  const { lang, ilce } = await params;
  const district = getDistrict(ilce);
  if (!district) {
    const fixed = resolveLegacyDistrictSlug(ilce);
    if (fixed) permanentRedirect(localePath(`/bolgeler/${fixed}`, lang));
    notFound();
  }

  const path = `/bolgeler/${district.slug}`;
  const side = district.side;
  const faqs = districtFaqs(district.name, side, district.localNeeds);
  const districtReferences = REAL_REFERENCES.filter((r) => r.district === district.name);

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

  const neighborLinks = getNeighborDistrictLinks(district.slug, lang);
  const crossSideLinks = getCrossSideDistrictLinks(district.slug, lang);

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, businessLd, faqLd]} />
      <PageHeader
        title={`${district.name} Site ve Tesis Yönetimi`}
        description={`${district.name} genelinde site, apartman ve rezidanslar için 5188 lisanslı güvenlik, teknik bakım, temizlik ve aidat takibi dahil profesyonel yönetim hizmetleri.`}
      />

      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-12">
        {/* TL;DR (AI/snippet için) */}
        <TldrBlock>
          {district.name}&apos;de site, apartman ve tesis yönetimi için Alo Yönetim; güvenlik, temizlik, teknik bakım, peyzaj ve aidat takibi dahil tüm hizmetleri tek çatı altında sunar.
          {' '}{district.name} {district.side} Yakası&apos;nda yer alır; yazılı SLA kapsamında acil teknik müdahale hedefi: {responseTarget(side)}.
        </TldrBlock>

        {/* Giriş + yerel bilgiler */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 flex flex-col gap-5">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
              {district.name}&apos;de Profesyonel Site ve Tesis Yönetimi
            </h2>
            <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">
              {district.intro}
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              {district.localNeeds.map((need) => (
                <li key={need} className="flex items-start gap-3 text-sm text-[var(--color-secondary)]">
                  <Icon name="check_circle" className="text-slate-600 text-lg shrink-0" />
                  {need}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] rounded-[2.5rem] p-8 flex flex-col gap-4 shadow-sm">
            <div className="text-2xl font-black text-slate-800 dark:text-slate-200">{district.name}</div>
            <div className="font-semibold">{district.side} Yakası</div>
            <ul className="text-sm text-[var(--color-secondary)] flex flex-col gap-1.5 border-t border-[var(--color-outline)]/40 pt-4">
              <li>{district.neighborhoods.length} öne çıkan mahalle</li>
              <li>Acil teknik müdahale hedefi: {responseTarget(side)}</li>
              {districtReferences.length > 0 && <li>{districtReferences.length} referans tesis</li>}
            </ul>
            <QuoteCtaButton className="mt-2 bg-[var(--color-primary)] text-[var(--color-surface)] font-bold py-3 px-5 rounded-xl text-center hover:opacity-90 transition-opacity shadow text-sm">
              {district.name} İçin Teklif Al
            </QuoteCtaButton>
          </div>
        </div>

        {/* Bu ilçedeki gerçek referanslar */}
        {districtReferences.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
              {district.name}&apos;deki Referanslarımız
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {districtReferences.map((r) => (
                <ReferenceCard key={r.slug} reference={r} lang={lang} istanbulWideLabel="İstanbul geneli" />
              ))}
            </ul>
            <Link href="/referanslar" className="text-sm font-semibold text-[var(--color-primary)] hover:underline w-fit">
              Tüm referansları gör ({FACTS.referenceCount} kurum)
            </Link>
          </div>
        )}

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
                <Icon name={s.icon} className="text-3xl text-slate-900 dark:text-white" />
                <h3 className="text-lg font-bold text-[var(--color-primary)]">
                  {s.shortName} — {district.name}
                </h3>
                <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed line-clamp-2">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>

          {/* İlçe içi hızlı erişim */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
              Hızlı Erişim:
            </span>
            {[
              ['site-yonetimi', 'Site Yönetimi'],
              ['apartman-yonetimi', 'Apartman Yönetimi'],
              ['guvenlik-sirketleri', 'Güvenlik Şirketleri'],
              ['asansor-bakimi', 'Asansör Bakımı'],
              ['apartman-temizligi', 'Apartman Temizliği'],
            ].map(([slug, label]) => (
              <Link
                key={slug}
                href={`/bolgeler/${district.slug}/${slug}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface-variant)] text-[var(--color-primary)] border border-[var(--color-outline)]/60 hover:border-slate-500 hover:text-slate-600 transition-colors"
              >
                {district.name} {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Hiper-Yerel Mahalleler SILO Bağlantı Motoru */}
        <NeighborhoodDirectorySeo
          districtName={district.name}
          districtSlug={district.slug}
          neighborhoods={district.neighborhoods}
        />

        {/* Mahalle Detay Sayfaları (neighborhoodData varsa) */}
        {district.neighborhoodData && district.neighborhoodData.length > 0 && (
          <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--color-primary)]">
                {district.name} Mahallelerinde Tesis Yönetimi
              </h2>
              <Link
                href={`/bolgeler/${district.slug}/mahalleler`}
                className="text-sm text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
              >
                Tümünü gör <Icon name="arrow_forward" className="text-sm" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {district.neighborhoodData.map((n: NeighborhoodInfo) => (
                <Link
                  key={n.slug}
                  href={`/bolgeler/${district.slug}/mahalleler/${n.slug}`}
                  className="group flex flex-col gap-1.5 p-4 border border-[var(--color-outline)]/40 rounded-xl hover:border-brand-500/50 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="location_on" className="text-brand-600 dark:text-brand-400 text-base" />
                    <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {n.name}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-secondary)] line-clamp-2 pl-6">{n.characteristics.join(' · ')}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bölgeye özgü tesis karakteristiği */}
        {district.regionalFacilityTraits && (
          <p className="text-sm text-[var(--color-secondary)] leading-relaxed border-l-2 border-[var(--color-outline)] pl-4">
            {district.regionalFacilityTraits}
          </p>
        )}

        {/* Yerel SSS */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-12">
          <DynamicFAQ faqs={faqs} title={`${district.name} — Sıkça Sorulan Sorular`} />
        </div>

        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
        <ServiceAuthorityHubSeo
          serviceName={`${district.name} Tesis ve Site Yönetimi`}
          serviceCategory="Yerel Tesis Yönetimi"
          lawReferences={[
            {
              title: "634 Sayılı Kat Mülkiyeti Kanunu (KMK)",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5",
              badge: "KMK 634",
              description: `${district.name} genelindeki konut siteleri, rezidanslar ve apartmanlarda ortak alan yönetimi, işletme projeleri ve genel kurul hukuku.`
            },
            {
              title: "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun",
              sourceName: "T.C. İçişleri Bakanlığı & EGM",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5",
              badge: "5188 Sayılı Kanun",
              description: `${district.name} sitelerinde lisanslı özel güvenlik görevlisi istihdamı ve valilik izin süreçlerinin yasal çerçevesi.`
            }
          ]}
          glossaryTerms={[
            {
              slug: "toplu-yapi-yonetimi-kmk-ek-madde-69",
              term: `${district.name} Toplu Yapı Yönetimi`,
              summary: `${district.name} ilçesindeki çok bloklu ve parselli karma konut projelerinde ortak alanların profesyonel yönetimidir.`
            },
            {
              slug: "aidat",
              term: "Aidat Borcu ve Takibi",
              summary: `${district.name} sitelerinde aidatların KMK m.20 arsa payı esasına göre paylaştırılması ve takibidir.`
            },
            {
              slug: "5188-sayili-kanun",
              term: "5188 Sayılı Özel Güvenlik Mevzuatı",
              summary: "Nizamiye kontrolü, devriye ve plaka tanıma sistemlerinin valilik izinleri ve yetki çerçevesidir."
            },
            {
              slug: "isletme-projesi",
              term: "Yıllık Site İşletme Projesi",
              summary: "Sitenin 1 yıllık tahmini gider bütçesi ve her bağımsız bölümün aylık ödeme planını içeren belgedir."
            }
          ]}
        />

        {/* CTA */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)] rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center text-center gap-6 shadow-sm">
          <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">{district.name} için ücretsiz teklif alın</h2>
          <p className="text-[var(--color-secondary)] font-light max-w-xl">
            {district.name}&apos;deki sitenizde ücretsiz keşif yapalım, ihtiyacınıza göre şeffaf bir teklif
            hazırlayalım.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <QuoteCtaButton className="bg-[var(--color-primary)] text-[var(--color-surface)] font-bold py-3.5 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-md">
              Ücretsiz Teklif Al
            </QuoteCtaButton>
            <a
              href={`tel:${ORG_PHONE}`}
              className="border border-[var(--color-outline)]/60 text-[var(--color-primary)] bg-[var(--color-surface-variant)] font-bold py-3.5 px-8 rounded-xl hover:bg-slate-200/60 dark:hover:bg-[var(--color-outline)] transition-colors"
            >
              Hemen Ara: 0216 550 48 48
            </a>
          </div>
        </div>

        {/* Komşu ilçe bağlantı ağı */}
        {neighborLinks.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 text-center sm:text-left">
              {district.name} Çevresinde Hizmet Verdiğimiz Komşu İlçeler
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {neighborLinks.map((neighbor) => (
                <Link
                  key={neighbor.slug}
                  href={neighbor.href}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-600 transition-colors"
                >
                  <span>{neighbor.name}</span>
                  <Icon name="arrow_forward" className="text-[14px] text-slate-500" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Karşı yaka bağlantıları */}
        {crossSideLinks.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-500/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 text-center sm:text-left">
              İstanbul Genelinde Hizmet Ağımız ({district.side === 'Anadolu' ? 'Avrupa' : 'Anadolu'} Yakası)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {crossSideLinks.map((cross) => (
                <Link
                  key={cross.slug}
                  href={cross.href}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/40 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-600 transition-colors"
                >
                  <span>{cross.name}</span>
                  <Icon name="explore" className="text-[14px] text-slate-500" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog & pillar iç linkler */}
        <div className="text-center flex flex-col gap-4 border-t border-[var(--color-outline)]/40 pt-8">
          <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
            {district.name} Hizmet Çözümleri & Mevzuat:{' '}
            <Link href="/hizmetler/tesis-yonetimi" className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} Tesis Yönetimi
            </Link>{' '}
            ·{' '}
            <Link href="/hizmetler/guvenlik-yonetimi" className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} 5188 Güvenlik Hizmetleri
            </Link>{' '}
            ·{' '}
            <Link href="/hizmetler/temizlik-ve-hijyen" className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} Temizlik & Hijyen
            </Link>{' '}
            ·{' '}
            <Link href="/hizmetler/teknik-bakim" className="text-slate-900 dark:text-white font-semibold hover:underline">
              {district.name} Teknik Bakım & Onarım
            </Link>{' '}
            ·{' '}
            <Link href="/hesaplayici" className="text-slate-900 dark:text-white font-semibold hover:underline">
              Aidat Paylaşım Hesaplayıcı
            </Link>{' '}
            ·{' '}
            <Link href="/sozluk" className="text-slate-900 dark:text-white font-semibold hover:underline">
              KMK 634 Terimler Sözlüğü
            </Link>{' '}
            ·{' '}
            <Link href="/bolgeler" className="text-slate-900 dark:text-white font-semibold hover:underline">
              İstanbul 39 İlçe Tesis Yönetimi
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

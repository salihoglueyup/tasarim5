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
import { getNeighborDistrictsWithSemts } from '@/lib/seo/facility/districtCrossLinker';
import { getOfficialNeighborhoods } from '@/data/districtOfficialNeighborhoods';
import { getDistrictPortfolioReferences } from '@/data/realReferences';
import ReferenceCard from '@/components/sections/references/ReferenceCard';
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
  const official = getOfficialNeighborhoods(district.slug);
  const count = official?.count ?? district.neighborhoods.length;
  const sample = (official?.neighborhoods ?? district.neighborhoods).slice(0, 5).join(', ');
  // Faz 23: GSC'de "[ilçe] mahalleleri" sorguları bilgi amaçlı (~750 gösterim, poz. ~10, ~0 tıklama).
  // Başlık önce bilgi niyetini (tam liste + sayı), sonra ticari hizmeti karşılar.
  return buildMetadata({
    title: `${district.name} Mahalleleri (${count} Mahalle Tam Liste) ve Site Yönetimi | Alo Yönetim`,
    description: `${district.name} ilçesinde kaç mahalle var? ${district.name} ilçesinde ${count} mahalle bulunur: ${sample} ve diğerleri. Alfabetik tam liste, yakın semtler ve tüm mahallelerde KMK uyumlu site yönetimi.`,
    path: `/bolgeler/${ilce}/mahalleler`,
    lang,
    targetKeyword: `${district.name} mahalleleri`,
    keywords: [
      `${district.name} mahalleleri`,
      `${district.name} kaç mahalle var`,
      `${district.name} mahalle listesi`,
      `${district.name} semtleri`,
      `${district.name} yakın semtler`,
      `${district.name} mahalle haritası`,
      `${district.name} site yönetimi`,
      `${district.name} site yönetim şirketleri`,
      `${district.name} apartman yönetimi`,
      `${district.name} tesis yönetimi`,
      `${district.name} asansör bakım`,
      `${district.name} toki site yönetimi`,
    ],
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
    name: `${district.name} Mahalleleri ve Site Yönetimi`,
    description: `${district.name} ilçesindeki ${getOfficialNeighborhoods(district.slug)?.count ?? district.neighborhoods.length} mahallenin alfabetik listesi ve tüm mahallelerde 634 sayılı KMK uyumlu profesyonel site ve tesis yönetimi hizmetleri.`,
    path: `/bolgeler/${ilce}/mahalleler`,
    speakableSelectors: ['h1', '#district-ai-overview-answer', '#mahalle-sayisi-yanit'],
  });

  const official = getOfficialNeighborhoods(district.slug);
  const officialNames: readonly string[] = official?.neighborhoods ?? district.neighborhoods;
  const officialCount = official?.count ?? officialNames.length;
  const popularSemts = official?.popularSemts ?? [];
  const spokeByName = new Map(
    (district.neighborhoodData ?? []).map((n) => [n.name.toLocaleLowerCase('tr-TR'), n.slug] as const),
  );

  const neighborhoodListLd: JsonLdObject = {
    '@type': 'ItemList',
    name: `${district.name} Mahalleleri (${officialCount} Mahalle)`,
    numberOfItems: officialNames.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: officialNames.map((name, index) => {
      const spoke = spokeByName.get(name.toLocaleLowerCase('tr-TR'));
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: `${name} Mahallesi`,
        ...(spoke ? { url: `${BASE_URL}/bolgeler/${ilce}/mahalleler/${spoke}` } : {}),
      };
    }),
  };

  const slaTarget =
    district.side === 'Anadolu' ? FACTS.emergencyResponse.anatolian : FACTS.emergencyResponse.european;
  const neighborDistricts = getNeighborDistrictsWithSemts(district.slug);
  const spokeNamesLower = new Set((district.neighborhoodData ?? []).map((n) => n.name.toLowerCase()));
  const extraSemtNames = district.neighborhoods.filter((n) => !spokeNamesLower.has(n.toLowerCase()));

  // Bilgi amaçlı aramalar için mahalle SSS'leri (DistrictAiOverviewSeo tek FAQPage şemasında birleştirir).
  const mahalleFaqs = [
    {
      question: `${district.name} ilçesinde kaç mahalle var?`,
      answer: `${district.name} ilçesinde ${officialCount} mahalle bulunur: ${officialNames.join(', ')}.`,
    },
    ...(popularSemts.length > 0
      ? [{
          question: `${district.name} ilçesinin bilinen semtleri hangileri?`,
          answer: `Resmi mahalle adlarının yanı sıra ${district.name} ilçesinde halk arasında ${popularSemts.join(', ')} gibi semt adları da kullanılır.`,
        }]
      : []),
    ...(neighborDistricts.length > 0
      ? [{
          question: `${district.name} ilçesine yakın semtler ve komşu ilçeler hangileri?`,
          answer: `${district.name} ilçesinin komşuları ${neighborDistricts.map((n) => n.name).join(', ')} ilçeleridir. Yakın semtlere örnek: ${neighborDistricts.flatMap((n) => n.semtler.slice(0, 2)).join(', ')}.`,
        }]
      : []),
  ];

  return (
    <>
      <JsonLd data={[pageLd, generateBreadcrumbs(breadcrumbs), neighborhoodListLd]} />
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <PageHeader
        title={`${district.name} Mahalleleri (${officialCount} Mahalle) ve Site Yönetimi`}
        description={`${district.name} ilçesindeki ${officialCount} mahallenin alfabetik tam listesi, yakın semtler ve tüm mahallelerde 634 sayılı KMK uyumlu profesyonel site yönetimi, aidat takibi ve 5188 lisanslı güvenlik`}
      />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-5xl mx-auto flex flex-col gap-12">
        {/* Resmi mahalle listesi (bilgi niyeti: "[ilçe] mahalleleri", "[ilçe] kaç mahalle var") */}
        <section
          id="mahalle-listesi"
          aria-labelledby="mahalle-listesi-baslik"
          className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60"
        >
          <h2 id="mahalle-listesi-baslik" className="text-2xl font-bold text-[var(--color-primary)] mb-2">
            {district.name} Mahalleleri: {officialCount} Mahallenin Alfabetik Listesi
          </h2>
          <p id="mahalle-sayisi-yanit" className="text-sm text-[var(--color-secondary)] leading-relaxed mb-5">
            {district.name} ilçesinde <strong>{officialCount} mahalle</strong> bulunur ({district.side} Yakası).
            Aşağıdaki liste resmi mahalle adlarını alfabetik sırayla gösterir; bağlantılı mahallelerde yerel site ve tesis yönetimi
            rehberine ulaşabilirsiniz.
          </p>
          <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 list-decimal pl-5 text-sm text-[var(--color-primary)]">
            {officialNames.map((name) => {
              const spoke = spokeByName.get(name.toLocaleLowerCase('tr-TR'));
              return (
                <li key={name}>
                  {spoke ? (
                    <Link href={`/bolgeler/${ilce}/mahalleler/${spoke}`} className="font-semibold underline decoration-slate-300 hover:text-brand-600">
                      {name}
                    </Link>
                  ) : (
                    <span>{name}</span>
                  )}
                </li>
              );
            })}
          </ol>
          {popularSemts.length > 0 && (
            <p className="mt-5 text-xs text-[var(--color-secondary)] leading-relaxed">
              <strong>Bilinen semt adları:</strong> {popularSemts.join(', ')}. Bu adlar halk arasında kullanılır; resmi adres kayıtlarında
              yukarıdaki mahalle adları geçer.
            </p>
          )}
        </section>

        <DistrictAiOverviewSeo
          districtName={district.name}
          districtSlug={district.slug}
          side={district.side}
          slaTarget={slaTarget}
          neighborhoods={district.neighborhoods}
          localNeeds={district.localNeeds}
          extraFaqs={mahalleFaqs}
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

        {/* Tüm Mahalleler, Semtler ve Entegre Tesis / TOKİ / Asansör Bakım Kapsamı */}
        <section
          aria-label={`${district.name} tüm mahalleleri, semtleri ve entegre tesis yönetimi kapsamı`}
          className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 space-y-6"
        >
          <div>
            <h2 className="text-xl font-bold text-[var(--color-primary)] mb-2">
              {district.name} Mahalleleri, Semtleri ve Entegre Tesis Yönetimi Ağı
            </h2>
            <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
              {district.name} ({district.side} Yakası) genelinde{' '}
              <strong>{district.neighborhoods.join(', ')}</strong> başta olmak üzere tüm mahalle ve semtlerde
              apartman, konut sitesi, TOKİ ve toplu konut yerleşimleri, rezidanslar ve ticari plazalar için
              634 sayılı KMK ve 7579 sayılı Kanun (2026) uyumlu yönetim hizmeti sunuyoruz. Yazılı SLA kapsamında acil
              teknik ve asansör arıza müdahale hedefimiz <strong>{slaTarget}</strong> olarak uygulanmaktadır.
            </p>
          </div>

          {extraSemtNames.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-tertiary)] mb-3">
                {district.name} Ek Semt ve Hizmet Noktaları
              </h3>
              <div className="flex flex-wrap gap-2">
                {extraSemtNames.map((semt) => (
                  <Link
                    key={semt}
                    href={`/bolgeler/${ilce}/site-yonetimi`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/50 text-[var(--color-primary)] hover:border-brand-500/60 transition-colors"
                  >
                    {semt} Site & Tesis Yönetimi
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-outline)]/50">
              <h3 className="text-sm font-bold text-[var(--color-primary)] mb-1.5">
                {district.name} Entegre Tesis & Bina Yönetimi
              </h3>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-3">
                Ticari bina, iş merkezi ve karma projelerde BMS otomasyon, EKB (Enerji Kimlik Belgesi) verimliliği,
                reaktif güç / kompanzasyon takibi ve kurumsal temizlik.
              </p>
              <Link
                href={`/bolgeler/${ilce}/tesis-yonetimi`}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                {district.name} Tesis Yönetimi →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-outline)]/50">
              <h3 className="text-sm font-bold text-[var(--color-primary)] mb-1.5">
                {district.name} TOKİ & Toplu Konut Site Yönetimi
              </h3>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-3">
                Çok bloklu sitelerde KMK m.66–74 toplu yapı yönetimi, 7579 sayılı Kanun 2/3 yönetim planı nisabı,
                hazirun cetveli ve dijital aidat/icra takibi.
              </p>
              <Link
                href="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi"
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Toplu Konut & TOKİ Yönetimi →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-outline)]/50">
              <h3 className="text-sm font-bold text-[var(--color-primary)] mb-1.5">
                {district.name} Asansör Bakım, Arıza & Yeşil Etiket
              </h3>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed mb-3">
                Tüm mahallelerde aylık periyodik asansör bakımı, A tipi muayene yeşil etiket hazırlığı, hidrofor ve
                jeneratör teknik servis koordinasyonu.
              </p>
              <Link
                href={`/bolgeler/${ilce}/teknik-bakim`}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                {district.name} Teknik & Asansör Bakım →
              </Link>
            </div>
          </div>
        </section>

        {/* Yakın Semtler ve Komşu İlçeler Ağı */}
        {neighborDistricts.length > 0 && (
          <section
            aria-label={`${district.name} yakın semtler ve komşu ilçeler`}
            className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60"
          >
            <h2 className="text-xl font-bold text-[var(--color-primary)] mb-2">
              {district.name} Yakın Semtler ve Komşu İlçeler Hizmet Ağı
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mb-5">
              {district.name} ilçesine komşu bölgelerde ve yakın semtlerde görev yapan saha ekiplerimizle sınır
              mahallelerde de kesintisiz site, apartman ve tesis yönetimi sağlıyoruz:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {neighborDistricts.map((nb) => (
                <div
                  key={nb.slug}
                  className="p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-outline)]/50 flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Link
                        href={`/bolgeler/${nb.slug}`}
                        className="font-bold text-sm text-[var(--color-primary)] hover:text-brand-600 transition-colors"
                      >
                        {nb.name} Site ve Tesis Yönetimi
                      </Link>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                        Komşu İlçe
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-secondary)]">
                      <strong>Yakın Semtler:</strong> {nb.semtler.join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <Link href={`/bolgeler/${nb.slug}/mahalleler`} className="text-brand-600 dark:text-brand-400 hover:underline">
                      {nb.name} Mahalleleri →
                    </Link>
                    <Link href={`/bolgeler/${nb.slug}/tesis-yonetimi`} className="text-slate-600 dark:text-slate-400 hover:underline">
                      {nb.name} Tesis Yönetimi →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* İlçe ve İstanbul Geneli Kurumsal Referanslarımız */}
        {(() => {
          const { local, regionalAndCityWide } = getDistrictPortfolioReferences(
            district.name,
            neighborDistricts.map((n) => n.name),
            6,
          );
          const refs = local.length >= 6 ? local : [...local, ...regionalAndCityWide].slice(0, 6);
          return (
            <section
              id="ilce-referanslar"
              aria-label={`${district.name} ve İstanbul geneli kurumsal referanslarımız`}
              className="p-6 sm:p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-[var(--color-primary)]">
                  {local.length > 0
                    ? `${district.name} ve ${district.side} Yakası Kurumsal Referanslarımız`
                    : `${district.name} Bölgesi & İstanbul Geneli Kurumsal Referanslarımız`}
                </h2>
                <Link href="/referanslar" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
                  Tüm referanslar ({FACTS.referenceCount}) →
                </Link>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {refs.map((r) => (
                  <ReferenceCard key={r.slug} reference={r} lang={lang} istanbulWideLabel="İstanbul geneli" />
                ))}
              </ul>
            </section>
          );
        })()}

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

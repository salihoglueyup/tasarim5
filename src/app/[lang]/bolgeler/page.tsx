import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/page/PageHeader';
import JsonLd from '@/components/seo/schema/JsonLd';
import IstanbulInteractiveDistrictMapSeo from '@/components/seo/district/IstanbulInteractiveDistrictMapSeo';
import ServiceAuthorityHubSeo from '@/components/seo/facility/ServiceAuthorityHubSeo';
import { buildMetadata, LOCALES } from '@/lib/seo';

import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import { FACTS, RESPONSE_TARGET_TEXT } from '@/lib/facts';

import Icon from '@/components/ui/branding/Icon';
export const revalidate = 86400;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'İstanbul Bölgeleri — İlçe Bazında Tesis Yönetimi',
    description:
      'İstanbul’un ilçelerinde profesyonel site ve tesis yönetimi. Kadıköy, Ataşehir, Beşiktaş, Üsküdar ve daha fazlasında yerel ekibimizle hizmetinizdeyiz.',
    path: '/bolgeler',
    lang,
    keywords: ['istanbul tesis yönetimi', 'ilçe site yönetimi', 'yerel apartman yönetimi'],
  });
}

export default async function Bolgeler({
  params,
}: {
  params?: Promise<{ lang: string }>;
}) {
  const { lang = 'tr' } = (await params) || {};
  const sides: ('Anadolu' | 'Avrupa')[] = ['Anadolu', 'Avrupa'];

  const homeLabels: Record<string, string> = { tr: 'Anasayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };
  const regionsLabels: Record<string, string> = { tr: 'Bölgeler', en: 'Regions', ru: 'Районы', ar: 'المناطق' };
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;

  const breadcrumbLd = generateBreadcrumbs([
    { name: homeLabels[lang] || 'Anasayfa', url: langPrefix || '/' },
    { name: regionsLabels[lang] || 'Bölgeler', url: `${langPrefix}/bolgeler` },
  ]);

  const itemListLd: JsonLdObject = {
    '@type': 'ItemList',
    itemListElement: DISTRICTS.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${d.name} Tesis Yönetimi`,
      url: `${BASE_URL}/bolgeler/${d.slug}`,
    })),
  };

  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: 'İstanbul Bölgeleri — İlçe Bazında Tesis Yönetimi',
    description: 'İstanbul ilçelerinde profesyonel site ve tesis yönetimi hizmetleri.',
    path: '/bolgeler',
    speakableSelectors: ['h1', 'p', '#local-business-profile-instant-answer-text'],
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, itemListLd]} />
      <PageHeader
        title="İstanbul Bölgeleri"
        description="Hizmet verdiğimiz ilçeyi seçin; mahallenize kadar uzanan yerel tesis yönetimi ekibimizle tanışın."
      />

      <section className="py-12 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-16">
        
        {/* Özet: yalnızca doğrulanmış bilgiler (src/lib/facts.ts) */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wide">
              <Icon name="map" className="text-[18px] text-slate-600 dark:text-slate-400" />
              <span>İstanbul Genelinde {FACTS.districtCount} İlçe</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              {FACTS.foundingYear}&apos;dan beri
            </span>
          </div>

          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">Alo Yönetim</strong>; Anadolu ve Avrupa Yakası&apos;ndaki {FACTS.districtCount} ilçede{' '}
              <Link href="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                konut siteleri
              </Link>
              ,{' '}
              <Link href="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                rezidanslar
              </Link>
              ,{' '}
              <Link href="/hizmetler/tesis-yonetimi/plaza-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                iş merkezleri ve plazalar
              </Link>
              {' '}ile{' '}
              <Link href="/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                sanayi tesisleri
              </Link>{' '}
              için hizmet verebilir. Yaklaşık {FACTS.teamSize} kişilik ekibimiz ofis ve saha çalışanlarından oluşur.
            </p>
            <p>
              Operasyonlarımız{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>{' '}
              ve 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun çerçevesinde yürütülür. Hizmet başlıkları:{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                Entegre Tesis Yönetimi
              </Link>
              ,{' '}
              <Link href="/hizmetler/guvenlik-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                Özel Güvenlik
              </Link>
              ,{' '}
              <Link href="/hizmetler/aidat-takibi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                Aidat Takibi
              </Link>
              ,{' '}
              <Link href="/hizmetler/teknik-bakim" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                Teknik Bakım
              </Link>{' '}
              ve{' '}
              <Link href="/hizmetler/temizlik-ve-hijyen" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                Temizlik ve Hijyen
              </Link>
              .
            </p>
            <p>{RESPONSE_TARGET_TEXT.tr}</p>
            <p>
              Referans listemizdeki {FACTS.referenceCount} kurum ve tesise{' '}
              <Link href="/referanslar" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                Referanslar
              </Link>{' '}
              sayfasından ulaşabilirsiniz.
            </p>
          </div>
        </div>

        <IstanbulInteractiveDistrictMapSeo />
        {sides.map((side) => (
          <div key={side} className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
              {side} Yakası
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DISTRICTS.filter((d) => d.side === side).map((d) => (
                <Link
                  key={d.slug}
                  href={`/bolgeler/${d.slug}`}
                  className="group bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] p-7 flex flex-col gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="location_on" className="text-slate-900 dark:text-white" />
                    <h3 className="text-xl font-bold text-[var(--color-primary)]">
                      {d.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-secondary)] font-light leading-relaxed line-clamp-3">
                    {d.intro}
                  </p>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white mt-1 group-hover:underline">
                    {d.name} hizmetlerini gör →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}


        {/* E-E-A-T Mevzuat Otorite ve İç/Dış Bağlantı Hub'ı */}
        <ServiceAuthorityHubSeo
          serviceName="İstanbul Geneli 39 İlçe Yerel Tesis Yönetimi Ağı"
          serviceCategory="Bölgesel Tesis Yönetimi"
          lawReferences={[
            {
              title: "5216 Sayılı Büyükşehir Belediyesi Kanunu — İlçe Koordinasyon Esasları",
              sourceName: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi",
              url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5216&MevzuatTur=1&MevzuatTertip=5",
              badge: "5216 Sayılı Kanun",
              description: "İstanbul il sınırları içerisindeki 39 ilçede kentsel altyapı, çevre temizlik vergisi ve ortak alan imar mevzuatı koordinasyonu."
            },
            {
              title: "T.C. İstanbul Valiliği İl Afet ve Acil Durum Müdürlüğü (AFAD)",
              sourceName: "İstanbul AFAD Resmi Portalı",
              url: "https://istanbul.afad.gov.tr",
              badge: "AFAD İstanbul",
              description: "İstanbul ilçelerindeki sitelerin deprem toplanma alanları, tahliye planları ve sivil savunma tatbikat protokolleri."
            },
            {
              title: "İstanbul Büyükşehir Belediyesi (İBB) Resmi Hizmet Portalı",
              sourceName: "İstanbul Büyükşehir Belediyesi",
              url: "https://www.ibb.istanbul",
              badge: "İBB Resmi",
              description: "İSKİ su abonelikleri, İGDAŞ doğalgaz ortak kazan dairesi denetimleri ve ilçe katı atık toplama takvimleri."
            }
          ]}
          glossaryTerms={[
            {
              slug: "toplu-yapi-yonetimi-kmk-ek-madde-69",
              term: "Toplu Yapı & Çok Bloklu Siteler",
              summary: "İstanbul'un hızla gelişen ilçelerinde çok parselli sitelerin merkezi yönetim planıyla idare edilmesidir."
            },
            {
              slug: "kat-mulkiyeti-kanunu-kmk",
              term: "Kat Mülkiyeti Kanunu (KMK 634)",
              summary: "Tüm bağımsız bölümlerde maliklerin yasal hak ve sorumluluklarını belirleyen ana mevzuattır."
            },
            {
              slug: "aidat",
              term: "İlçe Bazlı Aidat Dağılımı",
              summary: "Ortak giderlerin adil ve şeffaf şekilde bağımsız bölümlere paylaştırılması ve tahsilatıdır."
            },
            {
              slug: "isletme-projesi",
              term: "Yıllık İşletme Projesi Bütçesi",
              summary: "Sitenin 1 yıllık gelir-gider tahminini ve daire başına düşen aidat payını gösteren resmi projedir."
            }
          ]}
        />
      </section>
    </>
  );
}

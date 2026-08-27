import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import IstanbulDuesHeatmapSeo from '@/components/seo/IstanbulDuesHeatmapSeo';
import DistrictComparisonMatrixSeo from '@/components/seo/DistrictComparisonMatrixSeo';
import { ServiceAuthorityHubSeo } from '@/components/seo';
import { buildMetadata } from '@/lib/seo';

import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';

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

export default function Bolgeler() {
  const sides: ('Anadolu' | 'Avrupa')[] = ['Anadolu', 'Avrupa'];

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Bölgeler', url: '/bolgeler' },
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
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, itemListLd]} />
      <PageHeader
        title="İstanbul Bölgeleri"
        description="Hizmet verdiğimiz ilçeyi seçin; mahallenize kadar uzanan yerel tesis yönetimi ekibimizle tanışın."
      />

      <section className="py-12 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-16">
        
        {/* ========================================================================= */}
        {/* GOOGLE POSITION ZERO — STRATEJİK MASTER ÖZET REHBER & MEVZUAT OTORİTESİ   */}
        {/* ========================================================================= */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Başlık & Rozetler */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-blue-400">map</span>
              <span>Özet Rehber: İstanbul Geneli Yerel Tesis ve Site Yönetimi Nedir?</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-tertiary)] bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              39 İlçe & 7/24 Mobil Müdahale Standardı
            </span>
          </div>

          {/* Genişletilmiş ve Detaylandırılmış Metin */}
          <div className="space-y-4 text-sm md:text-base text-[var(--color-secondary)] leading-relaxed font-normal relative z-10">
            <p>
              <strong className="text-[var(--color-primary)] font-bold">İstanbul Yerel Tesis ve Site Yönetimi</strong>; Anadolu ve Avrupa yakasındaki 39 ilçede yer alan{' '}
              <Link href="/sektorel-cozumler/site-ve-toplu-konut-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                konut siteleri
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/rezidans-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                çok katlı lüks rezidanslar
              </Link>
              ,{' '}
              <Link href="/sektorel-cozumler/plaza-ve-is-merkezi-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                iş merkezleri ve plazalar
              </Link>
              {' '}ile{' '}
              <Link href="/sektorel-cozumler/sanayi-ve-lojistik-tesis-yonetimi" className="text-[var(--color-primary)] font-medium underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                endüstriyel sanayi tesislerinin
              </Link>{' '}
              merkezi kurumsal mühendislik, finans ve hukuk desteği eşliğinde, her ilçeye özel konuşlandırılmış yerel süpervizör amirler ve nöbetçi mobil teknik servis ekipleriyle 7/24 işletilmesidir.
            </p>
            <p>
              Yerel saha operasyonlarımız;{' '}
              <Link href="/sozluk/kat-mulkiyeti-kanunu-kmk" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                634 Sayılı Kat Mülkiyeti Kanunu (KMK)
              </Link>
              ,{' '}
              <a href="https://istanbul.gov.tr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                İstanbul Valiliği 5188 Özel Güvenlik Komisyonu İzinleri
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              ,{' '}
              <a href="https://www.ibb.istanbul" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5">
                İBB ve İlçe Belediyeleri Zabıta/Çevre Yönetmelikleri
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              {' '}ve TMMOB Makina Mühendisleri Odası (MMO) asansör yeşil etiket mevzuatlarına tam entegredir.
            </p>
            <p>
              Bölgesel yönetim mimarimiz;{' '}
              <Link href="/hizmetler/tesis-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Entegre Tesis Yönetimi
              </Link>
              ,{' '}
              <Link href="/hizmetler/guvenlik-yonetimi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                5188 Lisanslı Özel Güvenlik
              </Link>
              ,{' '}
              <Link href="/hizmetler/aidat-takibi" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Şeffaf Aidat Takibi
              </Link>
              ,{' '}
              <Link href="/hizmetler/teknik-bakim" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Teknik Bakım Servisi
              </Link>
              {' '}ve{' '}
              <Link href="/hizmetler/temizlik-ve-hijyen" className="text-[var(--color-primary)] font-semibold underline decoration-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Endüstriyel Hijyen
              </Link>{' '}
              disiplinlerini dört ana bölgesel hizmet sütununda birleştirir:
            </p>

            {/* 4 Ana Bölgesel Disiplin Kartı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>📍</span> İlçe Bazlı Süpervizör & Gezici Denetim Amirliği
                </span>
                <p className="text-[var(--color-secondary)]">
                  Kadıköy, Ataşehir, Beşiktaş, Şişli, Üsküdar, Maltepe, Başakşehir ve diğer tüm ilçelerde 7/24 habersiz gece devriyeleri ve kalite denetimi yapan mobil amir filosu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>⚡</span> 45 Dakika SLA Garantili Gezici Teknik Müdahale
                </span>
                <p className="text-[var(--color-secondary)]">
                  Asansörde kalma, elektrik panosu arkı, hidrofor arızası ve jeneratör kesintisinde en yakın bölge teknik servis ekibinin adrese anında intikali.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>🛡️</span> İlçe Emniyeti ile Koordineli 5188 Özel Güvenlik
                </span>
                <p className="text-[var(--color-secondary)]">
                  İlçe Emniyet Müdürlükleri ile anlık entegrasyon, PTS plaka tanıma, turnike kontrolü ve Valilik onaylı sabıkasız güvenlik personeli tahsisi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                  <span>📊</span> Bölgesel Rayiç & Aidat Optimizasyon Analizi
                </span>
                <p className="text-[var(--color-secondary)]">
                  İlçenin demografik ve emlak rayiç yapısına uygun işletme projeleri, toplu yerel tedarik anlaşmaları ve mülk değerini koruyan yatırım yönetimi.
                </p>
              </div>
            </div>

            <p>
              İstanbul genelinde 200+ aktif projeyi yöneten Alo Yönetim; kat malikleri kurullarına sıfır yasal risk, şeffaf dijital aidat muhasebesi ve ölçek ekonomisiyle %30 doğrudan maliyet avantajı sağlar.
            </p>
          </div>

          {/* 3'lü Mikro Çıktı / Değer Sütunları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--color-outline)]/40 dark:border-white/10 relative z-10">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">timer</span>
                </span>
                <span>45 Dakika SLA Müdahale</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                İstanbul'un her iki yakasında 7/24 nöbetçi gezici teknik servis ve acil durum araçları.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">trending_down</span>
                </span>
                <span>%30 Yerel Tedarik Avantajı</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                İlçe bazlı toplu alım anlaşmaları ile asansör, jeneratör ve temizlik malzemesi tasarrufu.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                <span className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">shield</span>
                </span>
                <span>7/24 Süpervizör Teftişi</span>
              </div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                Bölge amirlerince gerçekleştirilen habersiz gece devriyeleri ve dijital kontrol karnesi.
              </p>
            </div>
          </div>
        </div>

        <IstanbulDuesHeatmapSeo />
        <DistrictComparisonMatrixSeo />
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
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">location_on</span>
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
              slug: "toplu-yapi-yonetimi",
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

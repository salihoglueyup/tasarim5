import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import PageHeader from '@/components/layout/PageHeader';
import { generateBreadcrumbs, serviceSchema, webPageSchema } from '@/lib/schemas';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { autoLinkHtml } from '@/lib/autoLinker';
import { generateVerifiedAuthorityGraph } from '@/lib/seo/eeatAuditor';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const solutions = await prisma.sectoralSolution.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return LOCALES.flatMap((lang) =>
      solutions.map((s) => ({ lang, slug: s.slug }))
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const solution = await prisma.sectoralSolution.findUnique({
    where: { slug },
  }).catch(() => null);

  if (!solution || !solution.published) {
    return buildMetadata({
      title: 'Sektörel Çözüm Bulunamadı',
      description: '',
      path: `/sektorel-cozumler/${slug}`,
      lang,
      noindex: true,
    });
  }

  const title = `${solution.title} — Profesyonel Tesis Yönetimi | Alo Yönetim`;
  const description = solution.description.length > 160
    ? `${solution.description.substring(0, 155)}...`
    : solution.description;

  return buildMetadata({
    title,
    description,
    path: `/sektorel-cozumler/${slug}`,
    lang,
    targetKeyword: `${solution.title.toLowerCase()} yönetimi`,
    keywords: [
      solution.title.toLowerCase(),
      `${solution.title.toLowerCase()} yönetimi`,
      `${solution.title.toLowerCase()} tesis yönetimi`,
      'profesyonel tesis yönetimi',
      'sektörel tesis çözümleri',
      'iso 41001',
      '5188 güvenlik',
    ],
  });
}

export default async function SectoralSolutionDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const solution = await prisma.sectoralSolution.findUnique({
    where: { slug },
  }).catch(() => null);

  if (!solution || !solution.published) {
    notFound();
  }

  let features: string[] = [];
  try {
    if (solution.features) {
      features = typeof solution.features === 'string' ? JSON.parse(solution.features) : solution.features;
    }
  } catch (e) {
    features = (solution.features || '').split(',').map((f) => f.trim()).filter(Boolean);
  }

  const path = `/sektorel-cozumler/${solution.slug}`;

  const breadcrumbs = [
    { name: 'Anasayfa', url: '/' },
    { name: 'Sektörel Çözümler', url: '/sektorel-cozumler' },
    { name: solution.title, url: path },
  ];

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  const serviceLd = {
    ...serviceSchema({
      serviceType: `${solution.title} Tesis Yönetimi`,
      description: solution.description,
      path,
      priceRange: '₺₺₺',
    }),
    category: 'ISO 41001:2018 Entegre Tesis Yönetimi',
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 41001:2018 Uluslararası Entegre Tesis Yönetim Sistemi',
        url: 'https://aloyonetim.com.tr/kurumsal/kalite-belgelerimiz',
        sameAs: 'https://www.wikidata.org/wiki/Q108846399',
      },
    ],
    isRelatedTo: [
      {
        '@type': 'Service',
        name: 'Alo Yönetim Profesyonel Entegre Tesis Yönetimi',
        url: 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi',
      },
    ],
    areaServed: 'İstanbul, Türkiye (39 İlçe)',
  };

  const pageLd = webPageSchema({
    type: 'ItemPage',
    name: `${solution.title} | Alo Yönetim`,
    path,
    description: solution.description,
    speakableSelectors: ['h1', 'p'],
  });

  const authorityLd = generateVerifiedAuthorityGraph();

  const calculateActionLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${solution.title} Canlı Tesis Bütçe & Tasarruf Simülatörü`,
    url: 'https://aloyonetim.com.tr/api/tesis-yonetimi/calculate-budget',
    applicationCategory: 'BusinessApplication',
    potentialAction: {
      '@type': 'CalculateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://aloyonetim.com.tr/api/tesis-yonetimi/calculate-budget?sector=${solution.slug}`,
      },
      result: {
        '@type': 'FinancialProduct',
        name: `${solution.title} Yıllık İşletme Projesi ve %30 Tasarruf Raporu`,
      },
    },
  };

  const rfpDocumentLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: `${solution.title} Tesis Yönetimi B2B Teknik İhale Şartnamesi`,
    url: 'https://aloyonetim.com.tr/api/tesis-yonetimi/rfp-generator',
    description: `ISO 41001 ve 5188 standartlarında ${solution.title.toLowerCase()} teknik şartname şablonu.`,
  };

  // Otomatik linkleme
  const processedDescription = autoLinkHtml(solution.description, path);

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd, pageLd, authorityLd, calculateActionLd, rfpDocumentLd]} />

      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <PageHeader
        title={solution.title}
        description={solution.kpiTag ? `Hedeflenen KPI: ${solution.kpiTag}` : 'Sektörünüze özel entegre tesis yönetimi çözümleri.'}
      />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sol Kolon: Detaylar & Özellikler */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">{solution.icon || 'domain'}</span>
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Sektörel Operasyon Modeli
                  </span>
                  <h2 className="text-2xl font-extrabold text-[var(--color-primary)]">
                    {solution.title} Yönetim Çözümümüz
                  </h2>
                </div>
              </div>

              <div 
                className="text-base text-[var(--color-secondary)] leading-relaxed space-y-4 prose-a:text-[var(--color-primary)] prose-a:font-semibold prose-a:underline hover:prose-a:text-blue-600 transition-colors"
                dangerouslySetInnerHTML={{ __html: processedDescription }}
              />

              {solution.kpiTag && (
                <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-2xl" aria-hidden="true">trending_up</span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">Kanıtlanmış Sektörel KPI</span>
                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">{solution.kpiTag}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Özellikler Grid */}
            {features.length > 0 && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-8 md:p-12 shadow-sm">
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400" aria-hidden="true">task_alt</span>
                  Öne Çıkan Standartlarımız ve Hizmet Kapsamı
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                      <span className="text-sm text-[var(--color-secondary)] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon: CTA & İletişim Kartı */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 shadow-xl border border-slate-800 space-y-6">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider inline-block">
                Ücretsiz Keşif & Analiz
              </span>
              <h3 className="text-2xl font-bold">
                {solution.title} İçin Profesyonel Teklif Alın
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Tesisinizin büyüklüğü, personel ihtiyacı ve teknik altyapısına özel 48 saat içinde şeffaf bütçe ve yönetim planı sunalım.
              </p>

              <div className="pt-2">
                <Link
                  href="/teklif-al"
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-bold py-4 rounded-2xl transition-all shadow-lg hover:scale-105 active:scale-95 text-sm"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">description</span>
                  <span>Ücretsiz Teklif İste</span>
                </Link>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-400">
                <span>ISO 41001 & 5188 Güvencesi</span>
                <span className="text-emerald-400 font-semibold">48 Saatte Yanıt</span>
              </div>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-3xl p-6 shadow-sm">
              <h4 className="text-sm font-bold text-[var(--color-primary)] mb-4">
                Diğer Sektörel Çözümler
              </h4>
              <Link
                href="/sektorel-cozumler"
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Tüm Sektörel Çözümleri Gör</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* İlgili Hizmetler ve Çapraz Silo Bağlantıları */}
        <div className="pt-8 border-t border-[var(--color-outline)]/40">
          <div className="flex flex-col gap-3 mb-6">
            <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10 px-4 py-1.5 rounded-full w-fit uppercase tracking-widest">
              Entegre Tesis Disiplinleri
            </span>
            <h3 className="text-2xl font-bold text-[var(--color-primary)]">
              Bu Sektörde Uyguladığımız Hizmet Alanları
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/hizmetler/tesis-yonetimi" className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 hover:border-blue-500 transition-all flex flex-col gap-2 group">
              <span className="material-symbols-outlined text-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" aria-hidden="true">corporate_fare</span>
              <span className="font-bold text-sm text-[var(--color-primary)]">Entegre Tesis Yönetimi</span>
              <span className="text-xs text-[var(--color-secondary)]">ISO 41001 standartlarında 360° operasyonel işletme.</span>
            </Link>
            <Link href="/hizmetler/guvenlik-yonetimi" className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 hover:border-blue-500 transition-all flex flex-col gap-2 group">
              <span className="material-symbols-outlined text-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" aria-hidden="true">shield</span>
              <span className="font-bold text-sm text-[var(--color-primary)]">5188 Lisanslı Özel Güvenlik</span>
              <span className="text-xs text-[var(--color-secondary)]">Valilik izinli, PTS/CCTV ve 7/24 devriye kalkanı.</span>
            </Link>
            <Link href="/hizmetler/aidat-takibi" className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 hover:border-blue-500 transition-all flex flex-col gap-2 group">
              <span className="material-symbols-outlined text-2xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" aria-hidden="true">payments</span>
              <span className="font-bold text-sm text-[var(--color-primary)]">Aidat & Finans Takibi</span>
              <span className="text-xs text-[var(--color-secondary)]">KMK m.20 şeffaf bilanço ve ilamsız icra takibi.</span>
            </Link>
            <Link href="/hizmetler/teknik-bakim" className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 hover:border-blue-500 transition-all flex flex-col gap-2 group">
              <span className="material-symbols-outlined text-2xl text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" aria-hidden="true">engineering</span>
              <span className="font-bold text-sm text-[var(--color-primary)]">Teknik Bakım & Asansör</span>
              <span className="text-xs text-[var(--color-secondary)]">MMO yeşil etiket ve %0 kompanzasyon ceza güvencesi.</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

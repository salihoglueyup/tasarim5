import type { MetadataRoute } from 'next';
import { BASE_URL, buildLanguageAlternates, localizedUrl, LOCALES } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { parseTags } from '@/lib/jsonSafe';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 saat önbellek

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // --- DB verileri ---
  let posts: Array<{ slug: string; dateModified: Date }> = [];
  let categories: Array<{ slug: string; updatedAt: Date }> = [];
  let authors: Array<{ slug: string; updatedAt: Date }> = [];
  let references: Array<{ slug: string; updatedAt: Date }> = [];
  let sectoralSolutions: Array<{ slug: string; updatedAt: Date }> = [];
  const tagsSet = new Set<string>();

  try {
    const [dbPosts, dbCategories, dbAuthors, dbReferences, dbSectoral] = await Promise.all([
      prisma.post.findMany({
        where: { published: true },
        select: { slug: true, dateModified: true, tags: true }
      }),
      prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.author.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.reference.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.sectoralSolution.findMany({ select: { slug: true, updatedAt: true } }),
    ]);

    posts = dbPosts;
    categories = dbCategories;
    authors = dbAuthors;
    references = dbReferences;
    sectoralSolutions = dbSectoral;

    dbPosts.forEach((p) => {
      parseTags(p.tags).forEach((t: string) => tagsSet.add(t));
    });
  } catch (err) {
    console.warn('sitemap.ts: Database fetch fallback triggered:', err instanceof Error ? err.message : err);
  }

  // En son blog güncelleme tarihi
  const latestPostDate = posts.length > 0
    ? posts.reduce((latest, p) => p.dateModified > latest ? p.dateModified : latest, posts[0].dateModified).toISOString()
    : now;

  // Her yol (path) için tüm dillerde (TR, EN, RU, AR) bağımsız ve tam yetkili sitemap girdisi üretir
  const makeItems = (
    path: string,
    priority: number,
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    lastModified: string = now
  ): MetadataRoute.Sitemap => {
    const alternates = {
      languages: buildLanguageAlternates(path),
    };

    return LOCALES.map((lang) => {
      const fullUrl = localizedUrl(path, lang);
      return {
        url: fullUrl,
        lastModified,
        changeFrequency,
        priority: lang === 'tr' ? priority : Math.max(0.4, Number((priority * 0.9).toFixed(2))),
        alternates,
      };
    });
  };

  // --- Statik rotalar ("Tesis Yönetimi" Odaklı Öncelikler - Amiral Gemisi) ---
  const staticPaths: { path: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly'; lastMod?: string }[] = [
    { path: '/', priority: 1.0, changeFreq: 'daily', lastMod: latestPostDate },
    { path: '/hizmetler/tesis-yonetimi', priority: 1.0, changeFreq: 'daily', lastMod: now }, // Amiral Gemisi #1
    { path: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', priority: 0.9, changeFreq: 'daily', lastMod: now },
    { path: '/hizmetler/tesis-yonetimi/plaza-yonetimi', priority: 0.9, changeFreq: 'daily', lastMod: now },
    { path: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', priority: 0.9, changeFreq: 'daily', lastMod: now },
    { path: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', priority: 0.9, changeFreq: 'daily', lastMod: now },
    { path: '/hizmetler/tesis-yonetimi/rehber', priority: 0.9, changeFreq: 'weekly', lastMod: now },
    { path: '/hizmetler', priority: 0.95, changeFreq: 'weekly', lastMod: now },
    { path: '/hizmetler/guvenlik-yonetimi', priority: 0.9, changeFreq: 'daily', lastMod: now },
    { path: '/hizmetler/temizlik-ve-hijyen', priority: 0.85, changeFreq: 'daily', lastMod: now },
    { path: '/hizmetler/teknik-bakim', priority: 0.85, changeFreq: 'daily', lastMod: now },
    { path: '/hizmetler/aidat-takibi', priority: 0.85, changeFreq: 'weekly', lastMod: now },
    { path: '/hizmetler/hukuk-ve-icra-danismanligi', priority: 0.85, changeFreq: 'weekly', lastMod: now },
    { path: '/hizmetler/peyzaj-ve-bahce-bakimi', priority: 0.8, changeFreq: 'weekly', lastMod: now },
    { path: '/hizmetler/havuz-bakimi-ve-hijyen', priority: 0.8, changeFreq: 'weekly', lastMod: now },
    { path: '/hizmetler/hasere-ve-dezenfeksiyon', priority: 0.8, changeFreq: 'weekly', lastMod: now },
    { path: '/teklif-al', priority: 0.9, changeFreq: 'monthly', lastMod: now },
    { path: '/iletisim', priority: 0.85, changeFreq: 'monthly', lastMod: now },
    { path: '/hakkimizda', priority: 0.8, changeFreq: 'monthly', lastMod: now },
    { path: '/sektorel-cozumler', priority: 0.85, changeFreq: 'weekly', lastMod: now },
    { path: '/hesaplayici', priority: 0.85, changeFreq: 'monthly', lastMod: now },
    { path: '/guvenlik-akademisi', priority: 0.85, changeFreq: 'weekly', lastMod: now },
    { path: '/kurumsal/kalite-belgelerimiz', priority: 0.75, changeFreq: 'monthly', lastMod: now },
    { path: '/referanslar', priority: 0.75, changeFreq: 'weekly', lastMod: now },
    { path: '/basari-hikayeleri', priority: 0.75, changeFreq: 'weekly', lastMod: now },
    { path: '/sss', priority: 0.75, changeFreq: 'weekly', lastMod: now },
    { path: '/sozluk', priority: 0.75, changeFreq: 'weekly', lastMod: now },
    { path: '/blog', priority: 0.8, changeFreq: 'daily', lastMod: latestPostDate },
    { path: '/bolgeler', priority: 0.85, changeFreq: 'monthly', lastMod: now },
    { path: '/kurumsal/vizyon-misyon', priority: 0.6, changeFreq: 'monthly', lastMod: now },
    { path: '/kurumsal/kalite-politikamiz', priority: 0.6, changeFreq: 'monthly', lastMod: now },
    { path: '/kurumsal/surdurulebilirlik', priority: 0.6, changeFreq: 'monthly', lastMod: now },
    { path: '/surdurulebilirlik/ges-projeleri', priority: 0.5, changeFreq: 'monthly', lastMod: now },
    { path: '/istihdam-koprusu', priority: 0.6, changeFreq: 'monthly', lastMod: now },
    { path: '/site-haritasi', priority: 0.5, changeFreq: 'weekly', lastMod: now },
    { path: '/kullanim-sartlari', priority: 0.3, changeFreq: 'monthly', lastMod: now },
    { path: '/gizlilik-politikasi', priority: 0.3, changeFreq: 'monthly', lastMod: now },
    { path: '/cerez-politikasi', priority: 0.3, changeFreq: 'monthly', lastMod: now },
    { path: '/kvkk-ve-aydinlatma-metni', priority: 0.3, changeFreq: 'monthly', lastMod: now },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap((p) =>
    makeItems(p.path, p.priority, p.changeFreq, p.lastMod || now)
  );

  const districtRoutes: MetadataRoute.Sitemap = DISTRICTS.flatMap((d) => {
    const prio = d.priority === 1 ? 0.85 : d.priority === 2 ? 0.75 : 0.65;
    return makeItems(`/bolgeler/${d.slug}`, prio, 'monthly');
  });

  const districtServiceRoutes: MetadataRoute.Sitemap = DISTRICTS.flatMap((d) =>
    SERVICES.flatMap((s) => {
      const isFacilityManagement = s.slug === 'tesis-yonetimi';
      const isHighPriorityService =
        isFacilityManagement ||
        s.slug === 'guvenlik-yonetimi' ||
        s.slug === 'temizlik-ve-hijyen' ||
        s.slug === 'teknik-bakim';

      if (!isHighPriorityService && d.priority > 2) return [];

      let prio = 0.55;
      if (isFacilityManagement) {
        prio = d.priority === 1 ? 0.95 : d.priority === 2 ? 0.85 : 0.75;
      } else if (d.priority === 1) {
        prio = 0.8;
      } else if (d.priority === 2) {
        prio = 0.7;
      }

      return makeItems(`/bolgeler/${d.slug}/${s.slug}`, prio, isFacilityManagement ? 'daily' : 'weekly');
    })
  );

  const neighborhoodRoutes: MetadataRoute.Sitemap = DISTRICTS.filter(
    (d) => d.neighborhoodData?.length,
  ).flatMap((d) => [
    ...makeItems(`/bolgeler/${d.slug}/mahalleler`, 0.65, 'monthly'),
    ...(d.neighborhoodData ?? []).flatMap((n) =>
      makeItems(`/bolgeler/${d.slug}/mahalleler/${n.slug}`, 0.70, 'monthly'),
    ),
  ]);

  const sectoralRoutes: MetadataRoute.Sitemap = sectoralSolutions.flatMap((s) =>
    makeItems(`/sektorel-cozumler/${s.slug}`, 0.8, 'weekly', s.updatedAt.toISOString())
  );

  const blogRoutes: MetadataRoute.Sitemap = posts.flatMap((p) =>
    makeItems(`/blog/${p.slug}`, 0.75, 'monthly', p.dateModified.toISOString())
  );

  const categoryRoutes: MetadataRoute.Sitemap = categories.flatMap((c) =>
    makeItems(`/blog/kategori/${c.slug}`, 0.65, 'weekly', c.updatedAt.toISOString())
  );

  const authorRoutes: MetadataRoute.Sitemap = authors.flatMap((a) =>
    makeItems(`/blog/yazar/${a.slug}`, 0.5, 'monthly', a.updatedAt.toISOString())
  );

  const tagRoutes: MetadataRoute.Sitemap = Array.from(tagsSet).flatMap((t) =>
    makeItems(`/blog/etiket/${encodeURIComponent(t.toLowerCase().replace(/\s+/g, '-'))}`, 0.4, 'monthly')
  );

  const referenceRoutes: MetadataRoute.Sitemap = references.flatMap((r) =>
    makeItems(`/referanslar/${r.slug}`, 0.7, 'monthly', r.updatedAt.toISOString())
  );

  return [
    ...staticRoutes,
    ...districtRoutes,
    ...districtServiceRoutes,
    ...neighborhoodRoutes,
    ...sectoralRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...authorRoutes,
    ...tagRoutes,
    ...referenceRoutes,
  ];
}

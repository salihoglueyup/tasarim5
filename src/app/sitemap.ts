import type { MetadataRoute } from 'next';
import { buildLanguageAlternates, localizedUrl, sitemapLocales } from '@/lib/seo';
import { MIN_POSTS_FOR_TAG_INDEX, tagToSlug } from '@/lib/seo/indexPolicy';
import { prisma } from '@/lib/prisma';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { POSTS_META, CATEGORIES } from '@/data/posts';
import { AUTHOR_SLUGS } from '@/data/authors';
import { REFERENCES_META } from '@/data/referencesMetadata';
import { parseTags } from '@/lib/jsonSafe';
import { TERMS, termToSlug } from '@/data/dictionary';
import { CERTIFICATES } from '@/data/certificates';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 saat önbellek

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // --- DB verileri ---
  let posts: Array<{ slug: string; dateModified: Date }> = [];
  let categories: Array<{ slug: string; updatedAt: Date }> = [];
  let authors: Array<{ slug: string; updatedAt: Date }> = [];
  let references: Array<{ slug: string; updatedAt: Date }> = [];
  let sectoralSolutions: Array<{ slug: string; updatedAt: Date }> = [];
  const tagCounts = new Map<string, number>();
  const countTags = (tags: string[]) => {
    for (const slug of new Set(tags.map(tagToSlug))) tagCounts.set(slug, (tagCounts.get(slug) ?? 0) + 1);
  };

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

    dbPosts.forEach((p) => countTags(parseTags(p.tags)));
  } catch (err) {
    console.warn('sitemap.ts: Database fetch fallback triggered:', err instanceof Error ? err.message : err);
  }

  // Faz 21: Minimal slug + dateModified projeksiyonu (Veritabanı offline fallback garantisi)
  if (posts.length === 0) {
    posts = POSTS_META.map((p) => ({
      slug: p.slug,
      dateModified: new Date(p.dateModified || p.datePublished),
    }));
    POSTS_META.forEach((p) => countTags(p.tags));
  }

  if (categories.length === 0) {
    categories = CATEGORIES.map((c) => ({
      slug: c.slug,
      updatedAt: new Date('2026-02-24T20:00:00.000Z'),
    }));
  }

  if (authors.length === 0) {
    authors = AUTHOR_SLUGS.map((slug) => ({
      slug,
      updatedAt: new Date('2026-02-24T20:00:00.000Z'),
    }));
  }

  if (references.length === 0) {
    references = REFERENCES_META.map((r) => ({
      slug: r.slug,
      updatedAt: new Date('2026-02-24T20:00:00.000Z'),
    }));
  }

  // En son blog güncelleme tarihi
  const latestPostDate = posts.length > 0
    ? posts.reduce((latest, p) => p.dateModified > latest ? p.dateModified : latest, posts[0].dateModified).toISOString()
    : undefined;

  // Her yol için yalnızca indekslenebilir dillerde girdi üretir (bkz. lib/seo/indexPolicy.ts)
  const makeItems = (
    path: string,
    priority: number,
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    // Gerçek değişiklik tarihi bilinmiyorsa lastmod gönderilmez: her taramada "bugün" demek
    // Google'ın bu sitenin lastmod değerlerinin tamamına güvenmemesine yol açar.
    lastModified?: string
  ): MetadataRoute.Sitemap => {
    const alternates = {
      languages: buildLanguageAlternates(path),
    };

    return sitemapLocales(path).map((lang) => {
      const fullUrl = localizedUrl(path, lang);
      return {
        url: fullUrl,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency,
        priority: lang === 'tr' ? priority : Math.max(0.4, Number((priority * 0.9).toFixed(2))),
        alternates,
      };
    });
  };

  // --- Statik rotalar ("Tesis Yönetimi" Odaklı Öncelikler - Amiral Gemisi) ---
  const staticPaths: { path: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly'; lastMod?: string }[] = [
    { path: '/', priority: 1.0, changeFreq: 'daily', lastMod: latestPostDate },
    { path: '/hizmetler/tesis-yonetimi', priority: 1.0, changeFreq: 'daily' }, // Amiral Gemisi #1 (B2B Tesis)
    { path: '/hizmetler/site-yonetimi', priority: 1.0, changeFreq: 'daily' }, // Amiral Gemisi #2 (B2C/Konut Site)
    { path: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', priority: 0.9, changeFreq: 'daily' },
    { path: '/hizmetler/tesis-yonetimi/plaza-yonetimi', priority: 0.9, changeFreq: 'daily' },
    { path: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', priority: 0.9, changeFreq: 'daily' },
    { path: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', priority: 0.9, changeFreq: 'daily' },
    { path: '/hizmetler/tesis-yonetimi/rehber', priority: 0.9, changeFreq: 'weekly' },
    { path: '/hizmetler/tesis-yonetimi/acik-veri', priority: 0.9, changeFreq: 'weekly' },
    { path: '/hizmetler', priority: 0.95, changeFreq: 'weekly' },
    { path: '/hizmetler/guvenlik-yonetimi', priority: 0.9, changeFreq: 'daily' },
    { path: '/hizmetler/temizlik-ve-hijyen', priority: 0.85, changeFreq: 'daily' },
    { path: '/hizmetler/teknik-bakim', priority: 0.85, changeFreq: 'daily' },
    { path: '/hizmetler/aidat-takibi', priority: 0.85, changeFreq: 'weekly' },
    { path: '/hizmetler/hukuk-ve-icra-danismanligi', priority: 0.85, changeFreq: 'weekly' },
    { path: '/hizmetler/peyzaj-ve-bahce-bakimi', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/havuz-bakimi-ve-hijyen', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/hasere-ve-dezenfeksiyon', priority: 0.8, changeFreq: 'weekly' },
    { path: '/teklif-al', priority: 0.9, changeFreq: 'monthly' },
    { path: '/iletisim', priority: 0.85, changeFreq: 'monthly' },
    { path: '/hakkimizda', priority: 0.8, changeFreq: 'monthly' },
    { path: '/sektorel-cozumler', priority: 0.85, changeFreq: 'weekly' },
    { path: '/hesaplayici', priority: 0.85, changeFreq: 'monthly' },
    { path: '/guvenlik-akademisi', priority: 0.85, changeFreq: 'weekly' },
    { path: '/kurumsal/kalite-belgelerimiz', priority: 0.75, changeFreq: 'monthly' },
    { path: '/referanslar', priority: 0.75, changeFreq: 'weekly' },
    { path: '/basari-hikayeleri', priority: 0.75, changeFreq: 'weekly' },
    { path: '/sss', priority: 0.85, changeFreq: 'weekly' },
    { path: '/sozluk', priority: 0.85, changeFreq: 'weekly' },
    { path: '/blog', priority: 0.8, changeFreq: 'daily', lastMod: latestPostDate },
    { path: '/bolgeler', priority: 0.85, changeFreq: 'monthly' },
    { path: '/kurumsal/vizyon-misyon', priority: 0.6, changeFreq: 'monthly' },
    { path: '/kurumsal/kalite-politikamiz', priority: 0.6, changeFreq: 'monthly' },
    { path: '/kurumsal/surdurulebilirlik', priority: 0.6, changeFreq: 'monthly' },
    { path: '/surdurulebilirlik/ges-projeleri', priority: 0.5, changeFreq: 'monthly' },
    { path: '/istihdam-koprusu', priority: 0.6, changeFreq: 'monthly' },
    { path: '/app', priority: 0.7, changeFreq: 'monthly' },
    { path: '/site-haritasi', priority: 0.5, changeFreq: 'weekly' },
    { path: '/kullanim-sartlari', priority: 0.3, changeFreq: 'monthly' },
    { path: '/gizlilik-politikasi', priority: 0.3, changeFreq: 'monthly' },
    { path: '/cerez-politikasi', priority: 0.3, changeFreq: 'monthly' },
    { path: '/kvkk-ve-aydinlatma-metni', priority: 0.3, changeFreq: 'monthly' },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap((p) =>
    makeItems(p.path, p.priority, p.changeFreq, p.lastMod)
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

  // Yalnızca yeterli yazısı olan etiketler (ince etiket sayfaları noindex'tir)
  const tagRoutes: MetadataRoute.Sitemap = Array.from(tagCounts)
    .filter(([, count]) => count >= MIN_POSTS_FOR_TAG_INDEX)
    .flatMap(([slug]) => makeItems(`/blog/etiket/${encodeURIComponent(slug)}`, 0.4, 'monthly'));

  const referenceRoutes: MetadataRoute.Sitemap = references.flatMap((r) =>
    makeItems(`/referanslar/${r.slug}`, 0.7, 'monthly', r.updatedAt.toISOString())
  );

  const dictionaryRoutes: MetadataRoute.Sitemap = TERMS.flatMap((t) =>
    makeItems(`/sozluk/${termToSlug(t.term)}`, 0.65, 'monthly')
  );

  const certificateRoutes: MetadataRoute.Sitemap = CERTIFICATES.flatMap((c) =>
    makeItems(`/kurumsal/sertifikalar/${c.slug}`, 0.65, 'monthly', `${c.datePublished}T00:00:00.000Z`)
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
    ...dictionaryRoutes,
    ...certificateRoutes,
  ];
}

import type { MetadataRoute } from 'next';
import { BASE_URL, buildLanguageAlternates } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // --- DB verileri ---
  const [posts, categories, authors, references] = await Promise.all([
    prisma.post.findMany({ where: { published: true }, select: { slug: true, dateModified: true } }),
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.author.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.reference.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const postsWithTags = await prisma.post.findMany({ where: { published: true }, select: { tags: true } });
  const tagsSet = new Set<string>();
  postsWithTags.forEach((p) => {
    try {
      const parsed = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
      if (Array.isArray(parsed)) parsed.forEach((t: string) => tagsSet.add(t));
    } catch {}
  });

  const makeItem = (path: string, priority: number, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never', lastModified: string = now) => {
    const fullUrl = path === '/' ? BASE_URL : `${BASE_URL}${path}`;
    return {
      url: fullUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: buildLanguageAlternates(path),
      },
    };
  };

  // --- Statik rotalar ---
  const staticPaths: { path: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1.0, changeFreq: 'daily' },
    { path: '/iletisim', priority: 0.9, changeFreq: 'monthly' },
    { path: '/teklif-al', priority: 0.9, changeFreq: 'monthly' },
    { path: '/hizmetler', priority: 0.85, changeFreq: 'weekly' },
    { path: '/hizmetler/tesis-yonetimi', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/guvenlik-yonetimi', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/temizlik-ve-hijyen', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/teknik-bakim', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/peyzaj-ve-bahce-bakimi', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/havuz-bakimi-ve-hijyen', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/hasere-ve-dezenfeksiyon', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/hukuk-ve-icra-danismanligi', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hakkimizda', priority: 0.8, changeFreq: 'monthly' },
    { path: '/kurumsal/vizyon-misyon', priority: 0.6, changeFreq: 'monthly' },
    { path: '/kurumsal/kalite-politikamiz', priority: 0.6, changeFreq: 'monthly' },
    { path: '/kurumsal/surdurulebilirlik', priority: 0.6, changeFreq: 'monthly' },
    { path: '/surdurulebilirlik/ges-projeleri', priority: 0.5, changeFreq: 'monthly' },
    { path: '/referanslar', priority: 0.75, changeFreq: 'weekly' },
    { path: '/basari-hikayeleri', priority: 0.75, changeFreq: 'weekly' },
    { path: '/guvenlik-akademisi', priority: 0.7, changeFreq: 'weekly' },
    { path: '/sektorel-cozumler', priority: 0.7, changeFreq: 'weekly' },
    { path: '/istihdam-koprusu', priority: 0.6, changeFreq: 'monthly' },
    { path: '/hesaplayici', priority: 0.65, changeFreq: 'monthly' },
    { path: '/sss', priority: 0.65, changeFreq: 'weekly' },
    { path: '/sozluk', priority: 0.6, changeFreq: 'weekly' },
    { path: '/blog', priority: 0.75, changeFreq: 'daily' },
    { path: '/bolgeler', priority: 0.7, changeFreq: 'monthly' },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((p) =>
    makeItem(p.path, p.priority, p.changeFreq)
  );

  // --- Bölge sayfaları: /bolgeler/[ilce] (12 sayfa) ---
  const districtRoutes: MetadataRoute.Sitemap = DISTRICTS.map((d) => {
    const prio = d.priority === 1 ? 0.75 : d.priority === 2 ? 0.65 : 0.55;
    return makeItem(`/bolgeler/${d.slug}`, prio, 'monthly');
  });

  // --- Bölge×Hizmet sayfaları: /bolgeler/[ilce]/[hizmet] (12×8 = 96 sayfa) ---
  const districtServiceRoutes: MetadataRoute.Sitemap = DISTRICTS.flatMap((d) =>
    SERVICES.map((s) => {
      const prio = d.priority === 1 ? 0.7 : d.priority === 2 ? 0.6 : 0.5;
      return makeItem(`/bolgeler/${d.slug}/${s.slug}`, prio, 'monthly');
    })
  );

  // --- Blog detay ---
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) =>
    makeItem(`/blog/${p.slug}`, 0.7, 'weekly', p.dateModified.toISOString())
  );

  // --- Blog kategori ---
  const catRoutes: MetadataRoute.Sitemap = categories.map((c) =>
    makeItem(`/blog/kategori/${c.slug}`, 0.6, 'weekly', c.updatedAt.toISOString())
  );

  // --- Blog yazar ---
  const authorRoutes: MetadataRoute.Sitemap = authors.map((a) =>
    makeItem(`/blog/yazar/${a.slug}`, 0.5, 'monthly', a.updatedAt.toISOString())
  );

  // --- Blog etiket ---
  const tagRoutes: MetadataRoute.Sitemap = Array.from(tagsSet).map((t) =>
    makeItem(`/blog/etiket/${encodeURIComponent(t)}`, 0.5, 'weekly')
  );

  // --- Referans detay ---
  const referenceRoutes: MetadataRoute.Sitemap = references.map((r) =>
    makeItem(`/referanslar/${r.slug}`, 0.6, 'monthly', r.updatedAt.toISOString())
  );

  return [
    ...staticRoutes,
    ...districtRoutes,
    ...districtServiceRoutes,
    ...postRoutes,
    ...catRoutes,
    ...authorRoutes,
    ...tagRoutes,
    ...referenceRoutes,
  ];
}


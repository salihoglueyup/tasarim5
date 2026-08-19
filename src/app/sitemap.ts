import type { MetadataRoute } from 'next';
import { BASE_URL, buildLanguageAlternates, localizedUrl, LOCALES } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // --- DB verileri ---
  const [posts, categories, authors, references, sectoralSolutions] = await Promise.all([
    prisma.post.findMany({ where: { published: true }, select: { slug: true, dateModified: true } }),
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.author.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.reference.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.sectoralSolution.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const postsWithTags = await prisma.post.findMany({ where: { published: true }, select: { tags: true } });
  const tagsSet = new Set<string>();
  postsWithTags.forEach((p) => {
    try {
      const parsed = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
      if (Array.isArray(parsed)) parsed.forEach((t: string) => tagsSet.add(t));
    } catch {}
  });

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

  // --- Statik rotalar ---
  const staticPaths: { path: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1.0, changeFreq: 'daily' },
    { path: '/iletisim', priority: 0.9, changeFreq: 'monthly' },
    { path: '/teklif-al', priority: 0.9, changeFreq: 'monthly' },
    { path: '/hizmetler', priority: 0.85, changeFreq: 'weekly' },
    { path: '/hizmetler/tesis-yonetimi', priority: 0.85, changeFreq: 'daily' },
    { path: '/hizmetler/guvenlik-yonetimi', priority: 0.9, changeFreq: 'daily' },
    { path: '/hizmetler/temizlik-ve-hijyen', priority: 0.85, changeFreq: 'daily' },
    { path: '/hizmetler/teknik-bakim', priority: 0.85, changeFreq: 'daily' },
    { path: '/hizmetler/peyzaj-ve-bahce-bakimi', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/havuz-bakimi-ve-hijyen', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/hasere-ve-dezenfeksiyon', priority: 0.8, changeFreq: 'weekly' },
    { path: '/hizmetler/hukuk-ve-icra-danismanligi', priority: 0.85, changeFreq: 'weekly' },
    { path: '/hizmetler/aidat-takibi', priority: 0.85, changeFreq: 'weekly' },
    { path: '/hakkimizda', priority: 0.8, changeFreq: 'monthly' },
    { path: '/kurumsal/vizyon-misyon', priority: 0.6, changeFreq: 'monthly' },
    { path: '/kurumsal/kalite-belgelerimiz', priority: 0.75, changeFreq: 'monthly' },
    { path: '/kurumsal/kalite-politikamiz', priority: 0.6, changeFreq: 'monthly' },
    { path: '/kurumsal/surdurulebilirlik', priority: 0.6, changeFreq: 'monthly' },
    { path: '/surdurulebilirlik/ges-projeleri', priority: 0.5, changeFreq: 'monthly' },
    { path: '/referanslar', priority: 0.75, changeFreq: 'weekly' },
    { path: '/basari-hikayeleri', priority: 0.75, changeFreq: 'weekly' },
    { path: '/guvenlik-akademisi', priority: 0.85, changeFreq: 'weekly' },
    { path: '/sektorel-cozumler', priority: 0.75, changeFreq: 'weekly' },
    { path: '/istihdam-koprusu', priority: 0.6, changeFreq: 'monthly' },
    { path: '/hesaplayici', priority: 0.7, changeFreq: 'monthly' },
    { path: '/sss', priority: 0.7, changeFreq: 'weekly' },
    { path: '/sozluk', priority: 0.7, changeFreq: 'weekly' },
    { path: '/site-haritasi', priority: 0.5, changeFreq: 'weekly' },
    { path: '/blog', priority: 0.8, changeFreq: 'daily' },
    { path: '/bolgeler', priority: 0.75, changeFreq: 'monthly' },
    { path: '/kullanim-sartlari', priority: 0.3, changeFreq: 'monthly' },
    { path: '/gizlilik-politikasi', priority: 0.3, changeFreq: 'monthly' },
    { path: '/cerez-politikasi', priority: 0.3, changeFreq: 'monthly' },
    { path: '/kvkk-ve-aydinlatma-metni', priority: 0.3, changeFreq: 'monthly' },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap((p) =>
    makeItems(p.path, p.priority, p.changeFreq)
  );

  const districtRoutes: MetadataRoute.Sitemap = DISTRICTS.flatMap((d) => {
    const prio = d.priority === 1 ? 0.8 : d.priority === 2 ? 0.7 : 0.6;
    return makeItems(`/bolgeler/${d.slug}`, prio, 'monthly');
  });

  const districtServiceRoutes: MetadataRoute.Sitemap = DISTRICTS.flatMap((d) =>
    SERVICES.flatMap((s) => {
      const isHighPriorityService =
        s.slug === 'guvenlik-yonetimi' ||
        s.slug === 'tesis-yonetimi' ||
        s.slug === 'teknik-bakim' ||
        s.slug === 'temizlik-ve-hijyen';
      const basePrio = d.priority === 1 ? 0.8 : d.priority === 2 ? 0.7 : 0.6;
      const prio = isHighPriorityService ? Math.min(0.85, basePrio + 0.1) : basePrio;
      const freq = isHighPriorityService ? 'weekly' : 'monthly';
      return makeItems(`/bolgeler/${d.slug}/${s.slug}`, prio, freq);
    })
  );

  const postRoutes: MetadataRoute.Sitemap = posts.flatMap((p) =>
    makeItems(`/blog/${p.slug}`, 0.7, 'weekly', p.dateModified.toISOString())
  );

  const catRoutes: MetadataRoute.Sitemap = categories.flatMap((c) =>
    makeItems(`/blog/kategori/${c.slug}`, 0.6, 'weekly', c.updatedAt.toISOString())
  );

  const authorRoutes: MetadataRoute.Sitemap = authors.flatMap((a) =>
    makeItems(`/blog/yazar/${a.slug}`, 0.5, 'monthly', a.updatedAt.toISOString())
  );

  const tagRoutes: MetadataRoute.Sitemap = Array.from(tagsSet).flatMap((t) =>
    makeItems(`/blog/etiket/${encodeURIComponent(t)}`, 0.5, 'weekly')
  );

  const referenceRoutes: MetadataRoute.Sitemap = references.flatMap((r) =>
    makeItems(`/referanslar/${r.slug}`, 0.6, 'monthly', r.updatedAt.toISOString())
  );

  const sectoralRoutes: MetadataRoute.Sitemap = sectoralSolutions.flatMap((s) =>
    makeItems(`/sektorel-cozumler/${s.slug}`, 0.6, 'monthly', s.updatedAt.toISOString())
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
    ...sectoralRoutes,
  ];
}

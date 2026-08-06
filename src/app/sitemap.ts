import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';
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

  // --- Statik rotalar ---
  const staticRoutes: MetadataRoute.Sitemap = [
    // Anasayfa
    { url: BASE_URL,                                                         lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    // Dönüşüm sayfaları
    { url: `${BASE_URL}/iletisim`,                                           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/teklif-al`,                                          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // Hizmetler
    { url: `${BASE_URL}/hizmetler`,                                          lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/hizmetler/tesis-yonetimi`,                           lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/hizmetler/guvenlik-yonetimi`,                        lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/hizmetler/temizlik-ve-hijyen`,                       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/hizmetler/teknik-bakim`,                             lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/hizmetler/peyzaj-ve-bahce-bakimi`,                   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/hizmetler/havuz-bakimi-ve-hijyen`,                   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/hizmetler/hasere-ve-dezenfeksiyon`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    // Kurumsal
    { url: `${BASE_URL}/hakkimizda`,                                         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/kurumsal/vizyon-misyon`,                             lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/kurumsal/kalite-politikamiz`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/kurumsal/surdurulebilirlik`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/surdurulebilirlik/ges-projeleri`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    // İçerik & Otorite
    { url: `${BASE_URL}/referanslar`,                                        lastModified: now, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE_URL}/basari-hikayeleri`,                                  lastModified: now, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE_URL}/guvenlik-akademisi`,                                 lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/sektorel-cozumler`,                                  lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/istihdam-koprusu`,                                   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // Araçlar & Yardım
    { url: `${BASE_URL}/hesaplayici`,                                        lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/sss`,                                                lastModified: now, changeFrequency: 'weekly',  priority: 0.65 },
    { url: `${BASE_URL}/sozluk`,                                             lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    // Blog
    { url: `${BASE_URL}/blog`,                                               lastModified: now, changeFrequency: 'daily',   priority: 0.75 },
    // Bölgeler ana sayfa
    { url: `${BASE_URL}/bolgeler`,                                           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // --- Bölge sayfaları: /bolgeler/[ilce] (12 sayfa) ---
  const districtRoutes: MetadataRoute.Sitemap = DISTRICTS.map((d) => ({
    url: `${BASE_URL}/bolgeler/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: d.priority === 1 ? 0.75 : d.priority === 2 ? 0.65 : 0.55,
  }));

  // --- Bölge×Hizmet sayfaları: /bolgeler/[ilce]/[hizmet] (12×8 = 96 sayfa) ---
  const districtServiceRoutes: MetadataRoute.Sitemap = DISTRICTS.flatMap((d) =>
    SERVICES.map((s) => ({
      url: `${BASE_URL}/bolgeler/${d.slug}/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: d.priority === 1 ? 0.7 : d.priority === 2 ? 0.6 : 0.5,
    })),
  );

  // --- Blog detay ---
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.dateModified.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // --- Blog kategori ---
  const catRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/blog/kategori/${c.slug}`,
    lastModified: c.updatedAt.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // --- Blog yazar ---
  const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${BASE_URL}/blog/yazar/${a.slug}`,
    lastModified: a.updatedAt.toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // --- Blog etiket ---
  const tagRoutes: MetadataRoute.Sitemap = Array.from(tagsSet).map((t) => ({
    url: `${BASE_URL}/blog/etiket/${encodeURIComponent(t)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // --- Referans detay ---
  const referenceRoutes: MetadataRoute.Sitemap = references.map((r) => ({
    url: `${BASE_URL}/referanslar/${r.slug}`,
    lastModified: r.updatedAt.toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

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

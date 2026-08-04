import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({ where: { published: true }, select: { slug: true, dateModified: true } });
  const categories = await prisma.category.findMany({ select: { slug: true, updatedAt: true } });
  
  // Etiketleri postlardan çıkaralım (gerçekte ayrı bir tabloda olsa daha iyi ama şimdilik JSON'dan alıyoruz)
  const tagsSet = new Set<string>();
  const postsWithTags = await prisma.post.findMany({ where: { published: true }, select: { tags: true } });
  postsWithTags.forEach(p => {
    try {
      const parsed = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
      if (Array.isArray(parsed)) parsed.forEach(t => tagsSet.add(t));
    } catch(e) {}
  });

  const routes = [
    '',
    '/hakkimizda',
    '/iletisim',
    '/sozluk',
    '/hizmetler',
    '/hizmetler/tesis-yonetimi',
    '/hizmetler/hukuk-ve-icra-danismanligi',
    '/hizmetler/mali-ve-finansal-yonetim',
    '/hizmetler/teknik-bakim',
    '/hizmetler/temizlik-ve-peyzaj',
    '/hizmetler/havuz-bakimi-ve-hijyen',
    '/blog',
  ].map((r) => ({
    url: `${BASE_URL}${r}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : 0.8,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.dateModified.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const catRoutes = categories.map((c) => ({
    url: `${BASE_URL}/blog/kategori/${c.slug}`,
    lastModified: c.updatedAt.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const tagRoutes = Array.from(tagsSet).map((t) => ({
    url: `${BASE_URL}/blog/etiket/${encodeURIComponent(t)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...routes, ...postRoutes, ...catRoutes, ...tagRoutes];
}

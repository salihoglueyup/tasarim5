import { MetadataRoute } from 'next';

const BASE_URL = 'https://aloyonetim.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Statik sayfalar
  const staticRoutes = [
    '',
    '/hakkimizda',
    '/hizmetler',
    '/hizmetler/guvenlik-yonetimi',
    '/hizmetler/tesis-yonetimi',
    '/hizmetler/temizlik-ve-hijyen',
    '/hizmetler/teknik-bakim',
    '/hizmetler/peyzaj-ve-bahce-bakimi',
    '/hizmetler/havuz-bakimi-ve-hijyen',
    '/hizmetler/hasere-ve-dezenfeksiyon',
    '/hizmetler/hukuk-ve-icra-danismanligi',
    '/kurumsal/vizyon-misyon',
    '/kurumsal/kalite-politikamiz',
    '/kurumsal/surdurulebilirlik',
    '/sektorel-cozumler',
    '/referanslar',
    '/basari-hikayeleri',
    '/guvenlik-akademisi',
    '/istihdam-koprusu',
    '/blog',
    '/sss',
    '/iletisim',
    '/teklif-al',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dinamik blog sayfaları (Örnek veritabanı simülasyonu)
  // Gerçek projede bu veriler CMS veya API'den çekilir.
  const blogSlugs = [
    '2024-aidat-artis-oranlari',
    'deprem-risk-analizi',
    'kentsel-donusum-surecleri',
    'yuzme-havuzu-bakim-kimyasallari'
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}

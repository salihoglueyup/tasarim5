import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aloyonetim.com'

  // Define core routes that are present in the app
  const routes = [
    '',
    '/hakkimizda',
    '/iletisim',
    '/sss',
    '/blog',
    '/teklif-al',
    '/referanslar',
    '/basari-hikayeleri',
    '/sektorel-cozumler',
    '/istihdam-koprusu',
    '/guvenlik-akademisi',
    '/kvkk-ve-aydinlatma-metni',
    '/hesaplayici',
    // Corporate
    '/kurumsal/vizyon-misyon',
    '/kurumsal/kalite-politikamiz',
    '/kurumsal/surdurulebilirlik',
    '/surdurulebilirlik/ges-projeleri',
    // Services
    '/hizmetler',
    '/hizmetler/guvenlik-yonetimi',
    '/hizmetler/tesis-yonetimi',
    '/hizmetler/temizlik-ve-hijyen',
    '/hizmetler/teknik-bakim',
    '/hizmetler/peyzaj-ve-bahce-bakimi',
    '/hizmetler/havuz-bakimi-ve-hijyen',
    '/hizmetler/hasere-ve-dezenfeksiyon',
    '/hizmetler/hukuk-ve-icra-danismanligi',
  ]

  const blogSlugs = [
    '/blog/2024-aidat-artis-oranlari',
    '/blog/elektrik-faturasini-dusurmenin-yollari',
    '/blog/hirsizlik-olaylarina-karsi-alinacak-onlemler'
  ]

  const sitemapEntries = [...routes, ...blogSlugs].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return sitemapEntries
}

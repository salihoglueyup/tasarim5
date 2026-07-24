import { MetadataRoute } from 'next';
import { localizedUrl, BASE_URL } from '@/lib/seo';
import { BLOG_SLUGS } from '@/data/blog';

// Sitenin son kapsamlı güncelleme tarihi. Request-time `new Date()` yerine
// stabil bir tarih kullanılır (her istekte "bugün" sinyali vermez).
// Not: Sayfa bazlı gerçek tarihler blog frontmatter ile gelecek (Bölüm G / Faz 24).
const LAST_UPDATED = new Date('2026-07-24T00:00:00+03:00');

type RouteDef = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

// Locale-siz kanonik yollar. Her biri için tr/en alternates üretilir.
const staticRoutes: RouteDef[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/hakkimizda', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/hizmetler/guvenlik-yonetimi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler/tesis-yonetimi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler/temizlik-ve-hijyen', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler/teknik-bakim', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler/peyzaj-ve-bahce-bakimi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler/havuz-bakimi-ve-hijyen', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler/hasere-ve-dezenfeksiyon', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hizmetler/hukuk-ve-icra-danismanligi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kurumsal/vizyon-misyon', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/kurumsal/kalite-politikamiz', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/kurumsal/surdurulebilirlik', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/sektorel-cozumler', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/referanslar', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/basari-hikayeleri', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/guvenlik-akademisi', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/istihdam-koprusu', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/surdurulebilirlik/ges-projeleri', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/hesaplayici', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/sss', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/iletisim', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/teklif-al', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/site-haritasi', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/kvkk-ve-aydinlatma-metni', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/gizlilik-politikasi', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/cerez-politikasi', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/kullanim-sartlari', changeFrequency: 'yearly', priority: 0.2 },
];

type Extra = Pick<MetadataRoute.Sitemap[number], 'images' | 'videos'>;

function withAlternates(
  path: string,
  changeFrequency: RouteDef['changeFrequency'],
  priority: number,
  extra?: Extra,
): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(path, 'tr'),
    lastModified: LAST_UPDATED,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        tr: localizedUrl(path, 'tr'),
        en: localizedUrl(path, 'en'),
        'x-default': localizedUrl(path, 'tr'),
      },
    },
    ...extra,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((r) => {
    // Ana sayfa: image sitemap (Faz 22) + video sitemap (Faz 23) — VideoObject ile hizalı.
    if (r.path === '/') {
      return withAlternates(r.path, r.changeFrequency, r.priority, {
        images: [`${BASE_URL}/images/hero-poster.webp`],
        videos: [
          {
            title: 'Alo Yönetim Tanıtım Filmi',
            thumbnail_loc: `${BASE_URL}/images/hero-poster.webp`,
            description:
              'Profesyonel mülk ve tesis yönetimi hizmetlerimizi tanıtan kurumsal filmimiz.',
            content_loc: `${BASE_URL}/video/brand-film.mp4`,
          },
        ],
      });
    }
    return withAlternates(r.path, r.changeFrequency, r.priority);
  });

  const blogEntries = BLOG_SLUGS.map((slug) =>
    withAlternates(`/blog/${slug}`, 'monthly', 0.6),
  );

  return [...staticEntries, ...blogEntries];
}

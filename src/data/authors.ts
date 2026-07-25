/**
 * Blog yazarları (SEO Master Plan V4 — Bölüm G, Faz 159/94 — E-E-A-T).
 * Her makale bir yazara bağlanır; yazar arşiv sayfaları Person schema üretir.
 */

export type Author = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  sameAs?: string[];
};

export const AUTHORS: Author[] = [
  {
    slug: 'ahmet-yilmaz',
    name: 'Av. Ahmet Yılmaz',
    title: 'Kat Mülkiyeti & Tesis Yönetim Uzmanı',
    bio: '15 yılı aşkın süredir İstanbul’daki prestijli projelerde hukuki danışmanlık ve tesis yönetimi yapmaktadır. Kat Mülkiyeti Kanunu, aidat icra takibi ve yönetim hukuku konularında uzmandır.',
    expertise: ['Kat Mülkiyeti Kanunu', 'Aidat icra takibi', 'Yönetim hukuku'],
    sameAs: ['https://www.linkedin.com/company/aloyonetim'],
  },
  {
    slug: 'elif-demir',
    name: 'Elif Demir',
    title: 'Tesis Yönetimi Operasyon Direktörü',
    bio: 'Büyük ölçekli sitelerde bütçe optimizasyonu, aidat yönetimi ve operasyonel verimlilik alanında uzmanlaşmıştır. Şeffaf yönetim ve dijital süreçlerin savunucusudur.',
    expertise: ['Bütçe optimizasyonu', 'Aidat yönetimi', 'Operasyonel verimlilik'],
    sameAs: ['https://www.linkedin.com/company/aloyonetim'],
  },
  {
    slug: 'mert-kaya',
    name: 'Mert Kaya',
    title: 'Teknik İşletme Mühendisi',
    bio: 'Asansör, jeneratör, havuz ve elektrik sistemlerinin periyodik bakımı ve enerji verimliliği konularında saha deneyimine sahip makine mühendisidir.',
    expertise: ['Teknik bakım', 'Enerji verimliliği', 'Havuz işletme'],
    sameAs: ['https://www.linkedin.com/company/aloyonetim'],
  },
];

export const AUTHOR_SLUGS = AUTHORS.map((a) => a.slug);

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

/**
 * Blog yazarları (SEO Master Plan V4 — Bölüm G, Faz 159/94 — E-E-A-T & Faz 12 Optimizasyonu).
 * Her makale bir yazara bağlanır; yazar arşiv sayfaları Person schema üretir.
 * O(1) indexed lookup haritası ile hızlı erişim sağlanır.
 */

export type Author = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  credentials?: string[];
  sameAs?: string[];
  image?: string;
};

export type AuthorMeta = Pick<Author, 'slug' | 'name' | 'title' | 'image'>;

export const AUTHORS: Author[] = [
  {
    slug: 'eyup-salihoglu',
    name: 'Eyüp Salihoğlu',
    title: 'Kurucu & Tesis Yönetim Danışmanı',
    bio: 'Alo Yönetim kurucusu ve baş danışmanı. 15+ yılı aşkın süredir İstanbul genelinde entegre tesis yönetimi, 634 KMK hukuki süreçleri ve dijital mülk operasyonları yönetmektedir.',
    expertise: ['Entegre Tesis Yönetimi', '634 KMK Hukuku', 'Mali Bütçe & Denetim', 'Dijital Bina Yönetimi'],
    credentials: [
      'ISO 41001:2018 Entegre Tesis Yönetimi Baş Denetçisi',
      'KMK 634 Tesis Yönetim Danışmanlığı ve Kurul Başkanlığı Ruhsatı',
    ],
    sameAs: ['https://www.linkedin.com/company/aloyonetim'],
  },
  {
    slug: 'alo-yonetim',
    name: 'Alo Yönetim Araştırma Kurulu',
    title: 'Kurumsal Bilgi & Araştırma Masası',
    bio: 'Alo Yönetim tesis yöneticileri, bina mühendisleri ve hukuk danışmanlarından oluşan uzman ortak araştırma ve rehber yayın kurulu.',
    expertise: ['Tesis Yönetim Standartları', 'ISO 41001', 'Bina Güvenliği', 'Enerji Verimliliği'],
    credentials: [
      'ISO 41001:2018 Kurumsal Akreditasyon Belgesi',
      'TSE HYB 12850 Hizmet Yeri Yeterlilik Belgesi',
      '5188 Sayılı Kanun Valilik Özel Güvenlik Faaliyet İzin Belgesi',
    ],
    sameAs: ['https://aloyonetim.com.tr'],
  },
  {
    slug: 'ahmet-yilmaz',
    name: 'Av. Ahmet Yılmaz',
    title: 'Kat Mülkiyeti & Tesis Yönetim Uzmanı',
    bio: '15 yılı aşkın süredir İstanbul’daki prestijli projelerde hukuki danışmanlık ve tesis yönetimi yapmaktadır. Kat Mülkiyeti Kanunu, aidat icra takibi ve yönetim hukuku konularında uzmandır.',
    expertise: ['Kat Mülkiyeti Kanunu', 'Aidat icra takibi', 'Yönetim hukuku'],
    credentials: [
      'İstanbul Barosu Avukatlık Ruhsatnamesi',
      'T.C. Adalet Bakanlığı Kat Mülkiyeti Uzman Arabuluculuk Belgesi',
    ],
    sameAs: ['https://www.linkedin.com/company/aloyonetim'],
  },
  {
    slug: 'elif-demir',
    name: 'Elif Demir',
    title: 'Tesis Yönetimi Operasyon Direktörü',
    bio: 'Büyük ölçekli sitelerde bütçe optimizasyonu, aidat yönetimi ve operasyonel verimlilik alanında uzmanlaşmıştır. Şeffaf yönetim ve dijital süreçlerin savunucusudur.',
    expertise: ['Bütçe optimizasyonu', 'Aidat yönetimi', 'Operasyonel verimlilik'],
    credentials: [
      'TRFMA Tesis Yöneticileri Derneği Profesyonel Üyelik ve Sertifikası',
      'SMMM Mali Müşavirlik ve Bütçe Denetim Yeterlilik Lisansı',
    ],
    sameAs: ['https://www.linkedin.com/company/aloyonetim'],
  },
  {
    slug: 'mert-kaya',
    name: 'Mert Kaya',
    title: 'Teknik İşletme Mühendisi',
    bio: 'Asansör, jeneratör, havuz ve elektrik sistemlerinin periyodik bakımı ve enerji verimliliği konularında saha deneyimine sahip makine mühendisidir.',
    expertise: ['Teknik bakım', 'Enerji verimliliği', 'Havuz işletme'],
    credentials: [
      'TMMOB Makine Mühendisleri Odası Tesisat ve Asansör Muayene Yetki Belgesi',
      'Sanayi ve Teknoloji Bakanlığı Basınçlı Kaplar & Kazan Dairesi Denetim Uzmanlığı',
    ],
    sameAs: ['https://www.linkedin.com/company/aloyonetim'],
  },
];

// Global statik objeyi mühürle (Faz 13 - Runtime Bellek Sızıntısı Koruması)
Object.freeze(AUTHORS);

// O(1) slug lookup indeksi
export const AUTHORS_BY_SLUG = new Map<string, Author>(
  AUTHORS.map((a) => [a.slug, a])
);

export const AUTHOR_SLUGS = AUTHORS.map((a) => a.slug);

/**
 * Slug değerine göre O(1) sürede yazarı getirir.
 */
export function getAuthor(slug: string): Author | undefined {
  return AUTHORS_BY_SLUG.get(slug);
}

/**
 * Yazar slug'ının geçerli olup olmadığını doğrular.
 */
export function isValidAuthor(slug: string): boolean {
  return AUTHORS_BY_SLUG.has(slug);
}

/**
 * Yazar adını hızlıca döndürür, bulunamazsa varsayılan kurumsal adı döner.
 */
export function getAuthorName(slug: string): string {
  return AUTHORS_BY_SLUG.get(slug)?.name || 'Alo Yönetim';
}

/**
 * Yazar listesi için hafif metadata projeksiyonu döndürür.
 */
export function getAuthorsMeta(): AuthorMeta[] {
  return AUTHORS.map(({ slug, name, title, image }) => ({
    slug,
    name,
    title,
    image,
  }));
}

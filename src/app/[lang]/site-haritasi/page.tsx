import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { buildMetadata } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';
import { CATEGORIES, POSTS } from '@/data/posts';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Site Haritası',
    description: 'Alo Yönetim web sitesindeki tüm sayfalara ve hizmetlere bu sayfadan ulaşabilirsiniz.',
    path: '/site-haritasi',
    lang,
  });
}

export default async function SiteHaritasiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // DB verilerini çek
  const dbCategories = await prisma.category.findMany().catch(() => []);
  const dbPosts = await prisma.post.findMany({ where: { published: true }, select: { slug: true, title: true } }).catch(() => []);
  
  const categories: Array<{ id: string; slug: string; name: string }> =
    dbCategories.length > 0
      ? (dbCategories as any)
      : CATEGORIES.map((c) => ({ id: c.slug, slug: c.slug, name: c.name }));
  const posts: Array<{ slug: string; title: string }> =
    dbPosts.length > 0
      ? (dbPosts as any)
      : POSTS.map((p) => ({ slug: p.slug, title: p.title }));
  
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Site Haritası', url: '/site-haritasi' }
  ]);
  const pageLd = webPageSchema({
    name: 'Site Haritası',
    description: 'Alo Yönetim web sitesindeki tüm sayfalara ulaşın.',
    path: '/site-haritasi',
  });

  const SECTORAL_SOLUTIONS = [
    { slug: 'rezidans', title: 'Rezidans' },
    { slug: 'avm', title: 'AVM' },
    { slug: 'sanayi', title: 'Sanayi ve Fabrika' },
    { slug: 'toplukonut', title: 'Toplu Konut ve Site' }
  ];

  return (
    <>
      <JsonLd data={[breadcrumbLd, pageLd]} />
      <PageHeader 
        title="Site Haritası" 
        description="Arama motorlarının ve ziyaretçilerimizin sitemizdeki tüm içeriklere hızlıca ulaşmasını sağlayan merkez üssü."
      />
      <section className="py-16 px-[var(--spacing-gutter)] max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Kurumsal */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Kurumsal</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">Anasayfa</Link></li>
              <li><Link href="/kurumsal/hakkimizda" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">Hakkımızda</Link></li>
              <li><Link href="/kurumsal/vizyon-misyon" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">Vizyon & Misyon</Link></li>
              <li><Link href="/iletisim" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">İletişim</Link></li>
              <li><Link href="/sss" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/referanslar" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">Referanslarımız</Link></li>
              <li><Link href="/app" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">Mobil Uygulamamız</Link></li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Hizmetlerimiz</h2>
            <ul className="space-y-2">
              <li><Link href="/hizmetler" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors">Tüm Hizmetler</Link></li>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sektörel Çözümler */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Sektörel Çözümler</h2>
            <ul className="space-y-2">
              {SECTORAL_SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/sektorel-cozumler/${s.slug}`} className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
                    {s.title} Yönetimi
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmet Bölgeleri */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Hizmet Bölgelerimiz</h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
              {DISTRICTS.map((d) => (
                <li key={d.slug}>
                  <Link href={`/bolgeler/${d.slug}`} className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
                    {d.name} Tesis Yönetimi
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Bilgi Merkezi */}
          <div className="space-y-4 md:col-span-2 lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Blog ve Bilgi Merkezi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Kategoriler</h3>
                <ul className="space-y-2">
                  <li><Link href="/blog" className="font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">Tüm Blog Yazıları</Link></li>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/blog/kategori/${c.slug}`} className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Son Yazılar</h3>
                <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                  {posts.slice(0, 20).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors line-clamp-1">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}

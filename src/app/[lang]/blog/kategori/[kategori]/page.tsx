import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd, PostGrid } from '@/components';
import { buildMetadata, BASE_URL, LOCALES } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { CATEGORIES, getCategory, postsByCategory } from '@/data/posts';

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => CATEGORIES.map((c) => ({ lang, kategori: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; kategori: string }>;
}): Promise<Metadata> {
  const { lang, kategori } = await params;
  const cat = getCategory(kategori);
  if (!cat) {
    return buildMetadata({ title: 'Kategori Bulunamadı', description: 'Kategori bulunamadı.', path: `/blog/kategori/${kategori}`, lang, noindex: true });
  }
  return buildMetadata({
    title: `${cat.name} — Blog`,
    description: cat.description,
    path: `/blog/kategori/${kategori}`,
    lang,
  });
}

export default async function CategoryArchive({
  params,
}: {
  params: Promise<{ lang: string; kategori: string }>;
}) {
  const { kategori } = await params;
  const cat = getCategory(kategori);
  if (!cat) notFound();

  const posts = postsByCategory(kategori);
  const path = `/blog/kategori/${kategori}`;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: cat.name, url: path },
  ]);
  const listLd: JsonLdObject = {
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: `${BASE_URL}/blog/${p.slug}` })),
  };
  const pageLd = webPageSchema({ type: 'CollectionPage', name: `${cat.name} — Blog`, description: cat.description, path });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, listLd]} />
      <PageHeader title={cat.name} description={cat.description} />
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <PostGrid posts={posts} />
      </section>
    </>
  );
}

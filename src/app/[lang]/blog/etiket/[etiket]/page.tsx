import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd, PostGrid } from '@/components';
import { buildMetadata, BASE_URL, LOCALES } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { ALL_TAGS, postsByTag } from '@/data/posts';

export const revalidate = 86400;
export const dynamicParams = true;

// Thin arşiv riski (Faz 157): 2'den az yazısı olan etiket noindex olur.
const THIN_THRESHOLD = 2;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => ALL_TAGS.map((tag) => ({ lang, etiket: encodeURIComponent(tag) })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; etiket: string }>;
}): Promise<Metadata> {
  const { lang, etiket } = await params;
  const tag = decodeURIComponent(etiket);
  const posts = postsByTag(tag);
  if (posts.length === 0) {
    return buildMetadata({ title: 'Etiket Bulunamadı', description: 'Etiket bulunamadı.', path: `/blog/etiket/${etiket}`, lang, noindex: true });
  }
  return buildMetadata({
    title: `#${tag} — Blog Etiketi`,
    description: `${tag} etiketli site ve tesis yönetimi yazıları.`,
    path: `/blog/etiket/${etiket}`,
    lang,
    // Az içerikli etiket arşivlerini indeksleme (thin content önleme).
    noindex: posts.length < THIN_THRESHOLD,
  });
}

export default async function TagArchive({
  params,
}: {
  params: Promise<{ lang: string; etiket: string }>;
}) {
  const { etiket } = await params;
  const tag = decodeURIComponent(etiket);
  const posts = postsByTag(tag);
  if (posts.length === 0) notFound();

  const path = `/blog/etiket/${etiket}`;
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: `#${tag}`, url: path },
  ]);
  const listLd: JsonLdObject = {
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: `${BASE_URL}/blog/${p.slug}` })),
  };
  const pageLd = webPageSchema({ type: 'CollectionPage', name: `#${tag}`, description: `${tag} etiketli yazılar`, path });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, listLd]} />
      <PageHeader title={`#${tag}`} description={`${tag} etiketli site ve tesis yönetimi yazıları.`} />
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <PostGrid posts={posts} />
      </section>
    </>
  );
}

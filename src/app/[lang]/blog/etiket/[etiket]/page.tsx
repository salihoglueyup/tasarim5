import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd, PostGrid } from '@/components';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; etiket: string }>;
}): Promise<Metadata> {
  const { lang, etiket } = await params;
  const decoded = decodeURIComponent(etiket);
  return buildMetadata({
    title: `${decoded} Etiketi — Blog`,
    description: `${decoded} ile ilgili güncel yazılarımız.`,
    path: `/blog/etiket/${etiket}`,
    lang,
  });
}

export default async function TagArchive({
  params,
}: {
  params: Promise<{ lang: string; etiket: string }>;
}) {
  const { etiket } = await params;
  const decoded = decodeURIComponent(etiket);

  const posts = await prisma.post.findMany({
    where: { 
      published: true,
      tags: { contains: decoded }
    },
    include: { category: true },
    orderBy: { datePublished: 'desc' }
  });

  const path = `/blog/etiket/${etiket}`;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: `#${decoded}`, url: path },
  ]);
  const listLd: JsonLdObject = {
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: `${BASE_URL}/blog/${p.slug}` })),
  };
  const pageLd = webPageSchema({ type: 'CollectionPage', name: `${decoded} — Etiket`, description: `${decoded} etiketindeki yazılar.`, path });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, listLd]} />
      <PageHeader title={`#${decoded}`} description={`${decoded} etiketi altındaki tüm makalelerimiz.`} />
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <PostGrid posts={posts} />
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd, PostGrid } from '@/components';
import { buildMetadata, BASE_URL, LOCALES } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject, personSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const authors = await prisma.author.findMany({ select: { slug: true } });
  return LOCALES.flatMap((lang) => authors.map((a) => ({ lang, yazar: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; yazar: string }>;
}): Promise<Metadata> {
  const { lang, yazar } = await params;
  const author = await prisma.author.findUnique({ where: { slug: yazar } });

  if (!author) {
    return buildMetadata({ title: 'Yazar Bulunamadı', description: 'Yazar bulunamadı.', path: `/blog/yazar/${yazar}`, lang, noindex: true });
  }
  return buildMetadata({
    title: `${author.name} — Yazar`,
    description: author.bio || `${author.name} adlı yazarın makaleleri.`,
    path: `/blog/yazar/${yazar}`,
    lang,
  });
}

export default async function AuthorArchive({
  params,
}: {
  params: Promise<{ lang: string; yazar: string }>;
}) {
  const { yazar } = await params;
  const author = await prisma.author.findUnique({ where: { slug: yazar } });
  if (!author) notFound();

  const posts = await prisma.post.findMany({
    where: { authorId: author.id, published: true },
    include: { category: true },
    orderBy: { datePublished: 'desc' }
  });

  const path = `/blog/yazar/${yazar}`;
  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: author.name, url: path },
  ]);
  const listLd: JsonLdObject = {
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: `${BASE_URL}/blog/${p.slug}` })),
  };
  const pageLd = webPageSchema({ type: 'ProfilePage', name: `${author.name} — Yazar`, description: author.bio || 'Yazar Profili', path });
  const authorLd = personSchema({ name: author.name, jobTitle: 'Yazar' });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, listLd, authorLd]} />
      <PageHeader title={author.name} description={author.bio || `${author.name} adlı yazarın makaleleri.`} />
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <PostGrid posts={posts} />
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { PostGrid } from '@/components';;
import { buildMetadata, BASE_URL, LOCALES } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';


import { CATEGORIES, POSTS_META } from '@/data/posts';

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const cats = await prisma.category.findMany({ select: { slug: true } });
    if (cats.length > 0) {
      return LOCALES.flatMap((lang) =>
        cats.map((cat) => ({ lang, kategori: cat.slug }))
      );
    }
  } catch {
    // Fallback below
  }
  return LOCALES.flatMap((lang) =>
    CATEGORIES.map((cat) => ({ lang, kategori: cat.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; kategori: string }>;
}): Promise<Metadata> {
  const { lang, kategori } = await params;
  let cat = await prisma.category.findUnique({ where: { slug: kategori } }).catch(() => null);
  
  if (!cat) {
    const staticC = CATEGORIES.find((c) => c.slug === kategori);
    if (staticC) {
      cat = { name: staticC.name, description: staticC.description, slug: staticC.slug } as any;
    }
  }

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
  
  let cat = await prisma.category.findUnique({ 
    where: { slug: kategori } 
  }).catch(() => null);
  
  if (!cat) {
    const staticC = CATEGORIES.find((c) => c.slug === kategori);
    if (staticC) {
      cat = { id: staticC.slug, name: staticC.name, description: staticC.description, slug: staticC.slug } as any;
    }
  }

  if (!cat) notFound();

  let posts = await prisma.post.findMany({
    where: { categoryId: cat.id, published: true },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      image: true,
      datePublished: true,
      dateModified: true,
      category: true,
      tags: true,
      authorId: true,
      published: true,
    },
    orderBy: { datePublished: 'desc' }
  }).catch(() => []);

  if (posts.length === 0) {
    posts = POSTS_META.filter((p) => p.category === kategori).map((p, idx) => ({
      id: `static-${idx}`,
      slug: p.slug,
      title: p.title,
      description: p.description,
      image: p.image,
      datePublished: new Date(p.datePublished),
      dateModified: new Date(p.dateModified || p.datePublished),
      category: cat,
      tags: JSON.stringify(p.tags),
      authorId: p.author,
      views: 0,
      published: true,
    })) as any;
  }
  
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

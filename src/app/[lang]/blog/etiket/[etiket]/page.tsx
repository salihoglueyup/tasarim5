import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { PostGrid } from '@/components';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import { POSTS_META, CATEGORIES } from '@/data/posts';

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; etiket: string }>;
}): Promise<Metadata> {
  const { lang, etiket } = await params;
  const decoded = decodeURIComponent(etiket);
  const title = lang === 'en'
    ? `${decoded} Articles & Facility Guides | Alo Management Blog`
    : lang === 'ru'
    ? `${decoded} Статьи и Руководства | Alo Yonetim Blog`
    : `${decoded} Makaleleri ve Tesis Rehberi | Alo Yönetim Blog`;

  return buildMetadata({
    title,
    description: `${decoded} konusu hakkında güncel mevzuat, site yönetimi ve pratik rehber makaleleri.`,
    path: `/blog/etiket/${etiket}`,
    lang,
  });
}

export default async function TagArchive({
  params,
}: {
  params: Promise<{ lang: string; etiket: string }>;
}) {
  const { lang, etiket } = await params;
  const decoded = decodeURIComponent(etiket);

  let posts = await prisma.post.findMany({
    where: { 
      published: true,
      tags: { contains: decoded }
    },
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
    posts = POSTS_META.filter((p) =>
      p.tags.some((t) => t.toLowerCase().includes(decoded.toLowerCase()))
    ).map((p, idx) => ({
      id: `static-${idx}`,
      slug: p.slug,
      title: p.title,
      description: p.description,
      image: p.image,
      datePublished: new Date(p.datePublished),
      dateModified: new Date(p.dateModified || p.datePublished),
      category: CATEGORIES.find((c) => c.slug === p.category) || null,
      tags: JSON.stringify(p.tags),
      authorId: p.author,
      views: 0,
      published: true,
    })) as any;
  }

  const path = `/blog/etiket/${etiket}`;
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const homeLabels: Record<string, string> = { tr: 'Anasayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };
  const blogLabels: Record<string, string> = { tr: 'Blog', en: 'Blog', ru: 'Блог', ar: 'المدونة' };

  const breadcrumbLd = generateBreadcrumbs([
    { name: homeLabels[lang] || 'Anasayfa', url: langPrefix || '/' },
    { name: blogLabels[lang] || 'Blog', url: `${langPrefix}/blog` },
    { name: `#${decoded}`, url: `${langPrefix}${path}` },
  ]);
  const listLd: JsonLdObject = {
    '@type': 'ItemList',
    itemListElement: posts.map((p: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
    })),
  };
  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: `${decoded} — Etiket`,
    description: `${decoded} etiketindeki yazılar.`,
    path,
  });

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

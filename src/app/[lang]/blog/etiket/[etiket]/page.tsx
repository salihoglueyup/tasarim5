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
  const label = decoded.replace(/-/g, ' ');

  const title = lang === 'en'
    ? `${label} Articles & Facility Guides | Alo Management Blog`
    : lang === 'ru'
    ? `${label} Статьи и Руководства | Alo Yonetim Blog`
    : lang === 'ar'
    ? `مقالات ودليل ${label} | مدونة Alo Management`
    : `${label} Makaleleri ve Tesis Rehberi | Alo Yönetim Blog`;

  const description = lang === 'en'
    ? `Latest insights, facility management practices and legal guides about ${label}.`
    : lang === 'ru'
    ? `Актуальные статьи, правила управления объектами и полезные руководства по теме ${label}.`
    : lang === 'ar'
    ? `أحدث الرؤى والممارسات في إدارة المرافق والأدلة القانونية حول ${label}.`
    : `${label} konusu hakkında güncel mevzuat, site yönetimi ve pratik rehber makaleleri.`;

  return buildMetadata({
    title,
    description,
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
  const normalizedSpaces = decoded.replace(/-/g, ' ');

  let posts = await prisma.post.findMany({
    where: { 
      published: true,
      OR: [
        { tags: { contains: decoded } },
        { tags: { contains: normalizedSpaces } },
      ],
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
    const q1 = decoded.toLowerCase();
    const q2 = normalizedSpaces.toLowerCase();
    posts = POSTS_META.filter((p) =>
      p.tags.some((t) => {
        const tagLower = t.toLowerCase();
        const tagHyphen = tagLower.replace(/\s+/g, '-');
        return tagLower.includes(q1) || tagLower.includes(q2) || tagHyphen.includes(q1);
      })
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

  const displayTag = normalizedSpaces;

  const breadcrumbLd = generateBreadcrumbs([
    { name: homeLabels[lang] || 'Anasayfa', url: langPrefix || '/' },
    { name: blogLabels[lang] || 'Blog', url: `${langPrefix}/blog` },
    { name: `#${displayTag}`, url: `${langPrefix}${path}` },
  ]);
  const listLd: JsonLdObject | null = posts.length > 0 ? {
    '@type': 'ItemList',
    itemListElement: posts.map((p: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
    })),
  } : null;
  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: `${displayTag} — ${blogLabels[lang] || 'Blog'}`,
    description: `${displayTag} etiketindeki yazılar.`,
    path,
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, listLd].filter(Boolean) as JsonLdObject[]} />
      <PageHeader title={`#${displayTag}`} description={`${displayTag} etiketi altındaki tüm makalelerimiz.`} />
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <PostGrid posts={posts} />
      </section>
    </>
  );
}

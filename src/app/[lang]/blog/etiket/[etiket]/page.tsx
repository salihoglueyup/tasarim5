import type { Metadata } from 'next';
import { RETIRED_BLOG_SLUGS } from '@/lib/retiredBlogSlugs';
import PageHeader from '@/components/layout/page/PageHeader';
import JsonLd from '@/components/seo/schema/JsonLd';
import PostGrid from '@/components/blog/PostGrid';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import { POSTS_META, CATEGORIES } from '@/data/posts';
import { MIN_POSTS_FOR_TAG_INDEX, tagToSlug } from '@/lib/seo/indexPolicy';
import { permanentRedirect } from 'next/navigation';
import { parseTags } from '@/lib/jsonSafe';
import { localePath } from '@/lib/i18n/localePath';
import { cache } from 'react';

export const dynamicParams = true;

// generateMetadata ve sayfa aynı sorguyu paylaşır (istek başına tek DB çağrısı)
const getTagPosts = cache(async (etiket: string) => {
  const wanted = tagToSlug(decodeURIComponent(etiket));
  const hasTag = (raw: unknown) => parseTags(typeof raw === 'string' ? raw : JSON.stringify(raw ?? [])).some((t: string) => tagToSlug(t) === wanted);

  const all = await prisma.post.findMany({
    where: { published: true, slug: { notIn: RETIRED_BLOG_SLUGS } },
    select: {
      id: true, slug: true, title: true, description: true, image: true, datePublished: true,
      dateModified: true, category: true, tags: true, authorId: true, published: true,
    },
    orderBy: { datePublished: 'desc' },
  }).catch(() => []);
  let posts: any[] = all.filter((p: any) => hasTag(p.tags));

  if (posts.length === 0) {
    posts = POSTS_META.filter((p) => p.tags.some((t) => tagToSlug(t) === wanted)).map((p, idx) => ({
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
  return posts;
});

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

  const posts = await getTagPosts(etiket);

  return buildMetadata({
    title,
    description,
    path: `/blog/etiket/${tagToSlug(decoded)}`,
    lang,
  });
}

export default async function TagArchive({
  params,
}: {
  params: Promise<{ lang: string; etiket: string }>;
}) {
  const { lang, etiket } = await params;
  const canonicalSlug = tagToSlug(decodeURIComponent(etiket));
  const posts = await getTagPosts(etiket);
  if (posts.length < MIN_POSTS_FOR_TAG_INDEX) {
    permanentRedirect(localePath('/blog', lang));
  }
  if (canonicalSlug && canonicalSlug !== etiket) permanentRedirect(localePath(`/blog/etiket/${canonicalSlug}`, lang));
  const normalizedSpaces = decodeURIComponent(etiket).replace(/-/g, ' ');

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

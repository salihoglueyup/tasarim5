import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { PostBody, ReadingProgress, ShareButtons } from '@/components';
import TableOfContents from '@/components/blog/TableOfContents';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { prisma } from '@/lib/prisma';
import {
  generateBreadcrumbs,
  blogPostingSchema,
  webPageSchema,
} from '@/lib/schemas';
import { LOCALES, buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import trDict from '@/i18n/locales/tr/common.json';
import enDict from '@/i18n/locales/en/common.json';
import ruDict from '@/i18n/locales/ru/common.json';
import arDict from '@/i18n/locales/ar/common.json';

const dictionaries: Record<string, any> = { tr: trDict, en: enDict, ru: ruDict, ar: arDict };

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });
  if (!post || !post.published) {
    return buildMetadata({ title: 'Yazı Bulunamadı', description: '', path: '/blog', lang, noindex: true });
  }
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    lang,
    ogType: 'article',
    ogImageType: 'article',
    datePublished: post.datePublished.toISOString(),
    dateModified: post.dateModified?.toISOString() ?? post.datePublished.toISOString(),
    authorName: post.author?.name ?? 'Alo Yönetim',
    keywords: (() => {
      try {
        const t = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags;
        return Array.isArray(t) ? t : [];
      } catch {
        return [];
      }
    })(),
  });
}



function formatDate(iso: string | Date): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug, lang } = await params;
  const t = (key: string) => dictionaries[lang]?.[key] || dictionaries['tr'][key] || key;
  
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true, category: true }
  });

  if (!post || !post.published) notFound();

  const author = post.author;
  const category = post.category;
  
  const related = await prisma.post.findMany({
    where: { 
      categoryId: post.categoryId, 
      id: { not: post.id },
      published: true 
    },
    take: 3,
    orderBy: { datePublished: 'desc' }
  });

  let tags: string[] = [];
  try {
    tags = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags;
    if (!Array.isArray(tags)) tags = [];
  } catch (e) {
    tags = [];
  }

  const plainText = (post.content || '').replace(/<[^>]*>?/gm, '');
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  const path = `/blog/${post.slug}`;

  const breadcrumbs = [
    { name: t('breadcrumb_home'), url: '/' },
    { name: 'Blog', url: '/blog' },
    ...(category ? [{ name: category.name, url: `/blog/kategori/${category.slug}` }] : []),
    { name: post.title, url: path },
  ];

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  const articleLd = blogPostingSchema({
    headline: post.title,
    description: post.description,
    path,
    image: post.image || undefined,
    datePublished: post.datePublished.toISOString(),
    dateModified: post.dateModified.toISOString(),
    section: category?.name,
    keywords: tags,
    timeRequired: `PT${minutes}M`,
    wordCount: wordCount,
    articleBody: plainText.substring(0, 800),
    about: [
      { name: category?.name || 'Tesis Yönetimi', sameAs: 'https://tr.wikipedia.org/wiki/Tesis_yönetimi' }
    ],
    author: author
      ? { name: author.name, jobTitle: 'Yazar', url: `/blog/yazar/${author.slug}` }
      : undefined,
  });

  const pageLd = webPageSchema({
    name: post.title,
    description: post.description,
    path,
    speakableSelectors: ['h1', '.tldr'],
  });

  return (
    <>
      <ReadingProgress />
      <JsonLd data={[pageLd, breadcrumbLd, articleLd]} />
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <PageHeader title={post.title} description={post.description} />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-7xl mx-auto flex gap-10 items-start">
        {/* TOC Sidebar */}
        <TableOfContents />

        <article className="flex-1 max-w-3xl flex flex-col gap-10">
          {/* Meta bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold text-xs">
                {(author?.name ?? 'AY').split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </span>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {author ? (
                    <Link href={`/blog/yazar/${author.slug}`} className="hover:underline">
                      {author.name}
                    </Link>
                  ) : (
                    'Alo Yönetim'
                  )}
                </div>
                <div className="text-xs">
                  {formatDate(post.datePublished)} • {minutes} {t('blog_read_min')}
                </div>
              </div>
            </div>
            {category && (
              <Link
                href={`/blog/kategori/${category.slug}`}
                className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white font-bold px-4 py-1.5 rounded-full text-xs"
              >
                {category.name}
              </Link>
            )}
          </div>

          {/* Cover */}
          <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden border border-slate-200/50 dark:border-white/10">
            <Image
              src={post.image || '/images/hero-poster-v5.webp'}
              alt={post.title}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* TL;DR */}
          {post.tldr && (
              <aside className="tldr flex items-start gap-4 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-2xl p-6">
                <span className="material-symbols-outlined text-slate-900 dark:text-white shrink-0" aria-hidden="true">bolt</span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">{t('blog_summary')}</div>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{post.tldr}</p>
                </div>
              </aside>
          )}

          {/* Body */}
          <PostBody htmlContent={post.content} />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-white/10">
              {tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog/etiket/${encodeURIComponent(tag)}`}
                  className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-full px-3 py-1.5 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-950 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Share */}
          <ShareButtons path={path} title={post.title} />

          {/* Author Box */}
          {author && (
            <div className="flex items-start gap-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-3xl mt-6">
               {author.avatar ? (
                 <Image src={author.avatar} alt={author.name} width={80} height={80} className="w-20 h-20 rounded-full object-cover shrink-0" />
               ) : (
                 <div className="w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    {author.name.charAt(0)}
                 </div>
               )}
               <div className="flex flex-col gap-2">
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                   <Link href={`/blog/yazar/${author.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      {author.name}
                   </Link>
                 </h4>
                 {author.bio && <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{author.bio}</p>}
               </div>
            </div>
          )}

          {/* Related posts */}
          {related.length > 0 && (
            <div className="flex flex-col gap-6 pt-6 border-t border-slate-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('blog_related_posts')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex flex-col gap-3">
                    <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10">
                      <Image src={r.image || '/images/hero-poster-v5.webp'} alt={r.title} width={400} height={250} sizes="(max-width: 640px) 100vw, 250px" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-snug">
                      {r.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pillar link */}
          {post.pillar && (
            <div className="text-center text-sm text-slate-500 mt-4">
              {t('blog_related_service')}{' '}
              <Link href={post.pillar} className="text-slate-900 dark:text-white font-semibold hover:underline">
                {t('blog_click_details')}
              </Link>
            </div>
          )}
        </article>
      </div>
    </>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { PostBody, ReadingProgress, ShareButtons, ImageWithSeo } from '@/components';
import { BlogArticleEcosystemSeo, VoiceSearchSpeakableSeo } from '@/components/seo';
import TableOfContents from '@/components/blog/TableOfContents';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { prisma } from '@/lib/prisma';
import {
  generateBreadcrumbs,
  blogPostingSchema,
  webPageSchema,
} from '@/lib/schemas';
import { parseTags } from '@/lib/jsonSafe';
import BlogFAQExtractor from '@/components/seo/BlogFAQExtractor';
import { LOCALES, buildMetadata, BASE_URL } from '@/lib/seo';
import { resolveTopicalEntityGraph, extractKeyFactsAndKpis } from '@/lib/seoEngine';
import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';

import { POSTS, POSTS_META, CATEGORIES } from '@/data/posts';
import { renderPostBlocksToHtml } from '@/lib/blogBlockParser';
import { redis, CACHE_TTL } from '@/lib/redis';

export const dynamicParams = true;
export const revalidate = 86400; // 24 saat ISR (Faz 15)

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true }
    });
    if (posts.length > 0) {
      return LOCALES.flatMap((lang) =>
        posts.map((post) => ({ lang, slug: post.slug }))
      );
    }
  } catch {
    // Fallback below
  }
  return LOCALES.flatMap((lang) =>
    POSTS.map((post) => ({ lang, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  let post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  }).catch(() => null);

  if (!post) {
    const staticP = POSTS.find((p) => p.slug === slug);
    if (staticP) {
      post = {
        title: staticP.title,
        description: staticP.description,
        published: true,
        datePublished: new Date(staticP.datePublished),
        dateModified: new Date(staticP.dateModified || staticP.datePublished),
        author: { name: 'Alo Yönetim Hukuk & Tesis Kurulu' },
        tags: staticP.tags,
      } as any;
    }
  }

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
    keywords: parseTags(post.tags),
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
  const dict = await getDictionary(lang);
  const t = (key: string) => dict?.[key] || key;
  
  const cacheKeyPost = `blog_post_detail_${slug}`;
  let post: any = null;

  try {
    const cachedPost = await redis.get(cacheKeyPost);
    if (cachedPost) {
      post = JSON.parse(cachedPost);
    }
  } catch {
    // Redis offline / error fallback
  }

  if (!post) {
    post = await prisma.post.findUnique({
      where: { slug },
      include: { author: true, category: true }
    }).catch(() => null);

    if (post) {
      redis.setex(cacheKeyPost, CACHE_TTL.BLOG, JSON.stringify(post)).catch(() => {});
    }
  }

  if (!post) {
    const staticP = POSTS.find((p) => p.slug === slug);
    if (staticP) {
      const cat = CATEGORIES.find((c) => c.slug === staticP.category);
      post = {
        id: `static-${staticP.slug}`,
        slug: staticP.slug,
        title: staticP.title,
        description: staticP.description,
        title_en: null,
        title_ru: null,
        title_ar: null,
        description_en: null,
        description_ru: null,
        description_ar: null,
        summary: staticP.tldr,
        content: JSON.stringify(staticP.content),
        content_en: null,
        content_ru: null,
        content_ar: null,
        image: staticP.image,
        published: true,
        categoryId: staticP.category,
        authorId: staticP.author,
        views: 0,
        tags: JSON.stringify(staticP.tags),
        datePublished: new Date(staticP.datePublished),
        dateModified: new Date(staticP.dateModified || staticP.datePublished),
        createdAt: new Date(staticP.datePublished),
        updatedAt: new Date(staticP.dateModified || staticP.datePublished),
        author: {
          id: staticP.author,
          slug: staticP.author,
          name: 'Alo Yönetim Hukuk & Tesis Kurulu',
          avatar: '/images/eyup-salihoglu.webp',
          bio: 'Tesis Yönetimi ve Kat Mülkiyeti Kanunu Uzmanı',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        category: cat ? {
          id: cat.slug,
          slug: cat.slug,
          name: cat.name,
          name_en: null,
          name_ru: null,
          name_ar: null,
          description: cat.description,
          description_en: null,
          description_ru: null,
          description_ar: null,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        } : null,
      } as any;
    }
  }

  if (!post || !post.published) notFound();

  const author = post.author;
  const category = post.category;
  
  let related: any[] = await prisma.post.findMany({
    where: { 
      categoryId: post.categoryId, 
      id: { not: post.id },
      published: true 
    },
    take: 3,
    orderBy: { datePublished: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      image: true,
      datePublished: true,
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
  }).catch(() => []);

  // Faz 24: Veritabanı boşsa veya offline ise hafif statik metadata ile doldur
  if (!related || related.length === 0) {
    related = POSTS_META.filter((p) => p.slug !== post.slug && (p.category === post.categoryId || !post.categoryId))
      .slice(0, 3)
      .map((p, idx) => ({
        id: `static-rel-${idx}`,
        slug: p.slug,
        title: p.title,
        description: p.description,
        image: p.image,
        datePublished: new Date(p.datePublished),
        author: { name: 'Alo Yönetim' },
        category: { name: p.category, slug: p.category },
      }));
  }

  const [prevPost, nextPost] = await Promise.all([
    prisma.post.findFirst({
      where: {
        published: true,
        datePublished: { lt: post.datePublished },
      },
      orderBy: { datePublished: 'desc' },
      select: { title: true, slug: true }
    }).catch(() => null),
    prisma.post.findFirst({
      where: {
        published: true,
        datePublished: { gt: post.datePublished },
      },
      orderBy: { datePublished: 'asc' },
      select: { title: true, slug: true }
    }).catch(() => null),
  ]);

  const tags = parseTags(post.tags);

  const renderedHtml = renderPostBlocksToHtml(post.content || '');
  const plainText = (renderedHtml || '').replace(/<[^>]*>?/gm, '');
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

  const entityGraph = resolveTopicalEntityGraph(plainText || post.title);
  const keyFacts = extractKeyFactsAndKpis(plainText || post.title);

  const dynamicAbout = [
    { name: category?.name || 'Tesis Yönetimi', sameAs: 'https://tr.wikipedia.org/wiki/Tesis_yönetimi' },
    { name: 'ISO 41001:2018 Entegre Tesis Yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q108846399' },
    { name: '634 Sayılı Kat Mülkiyeti Kanunu (KMK)', sameAs: 'https://www.wikidata.org/wiki/Q161851' },
    ...entityGraph.about.map((a) => ({ name: a.name, sameAs: a.sameAs })),
  ];

  const dynamicMentions = entityGraph.mentions.map((m) => ({ name: m.name, sameAs: m.sameAs }));

  const articleLd = {
    ...blogPostingSchema({
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
      about: dynamicAbout,
      mentions: dynamicMentions,
      author: author
        ? { 
            name: author.name, 
            jobTitle: 'Kıdemli Tesis Yönetimi Uzmanı', 
            url: `/blog/yazar/${author.slug}`,
            alumniOf: [{ name: 'İstanbul Üniversitesi', sameAs: 'https://tr.wikipedia.org/wiki/İstanbul_Üniversitesi' }],
            knowsAbout: ['Tesis Yönetimi', 'Bina Güvenliği', 'Aidat Hukuku', 'Site Yönetimi']
          }
        : undefined,
    }),
    isBasedOn: `${BASE_URL}/api/ai/facility-agent-context.json`,
    citation: `${BASE_URL}/api/ai/facility-agent-context.json`,
  };

  const pageLd = webPageSchema({
    name: post.title,
    description: post.description,
    path,
    speakableSelectors: ['h1', '.tldr'],
  });

  return (
    <>
      <JsonLd data={[breadcrumbLd, articleLd, pageLd]} />
      <VoiceSearchSpeakableSeo
        pageUrl={path}
        lang={lang}
        question={post.title}
        directAnswer={post.tldr || post.description || post.summary}
      />
      {renderedHtml && <BlogFAQExtractor htmlContent={renderedHtml} />}
      <ReadingProgress />
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
                {(author?.name ?? 'AY').split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
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
                  {formatDate(post.datePublished)}
                  {post.dateModified && new Date(post.dateModified).getTime() !== new Date(post.datePublished).getTime() && (
                    <span> • Güncellenme: {formatDate(post.dateModified)}</span>
                  )}
                  {' '}• {minutes} {t('blog_read_min')}
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
            <ImageWithSeo
              src={post.image || '/images/hero-poster-v5.webp'}
              alt={post.title}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full h-full object-cover"
              priority
              injectSchema={true}
              author={author?.name ?? 'Alo Yönetim'}
              datePublished={post.datePublished.toISOString()}
            />
          </div>

          {/* TL;DR (Faz 15: Tüm makaleler için AI ve hızlı okuma garantili özet kutusu) */}
          {(post.tldr || post.description || post.summary) && (
              <aside className="tldr flex items-start gap-4 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-2xl p-6">
                <span className="material-symbols-outlined text-slate-900 dark:text-white shrink-0" aria-hidden="true">bolt</span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">{t('blog_summary')}</div>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{post.tldr || post.description || post.summary}</p>
                </div>
              </aside>
          )}

          {/* Body with smart cross-linking */}
          <PostBody htmlContent={post.content} title={post.title} currentUrl={path} locale={lang} />

          {/* AI Search Key Facts & Quantitative Signals */}
          {keyFacts.length > 0 && (
            <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                <span className="material-symbols-outlined text-brand-600 text-base" aria-hidden="true">analytics</span>
                <span>Önemli Sayısal & Yasal Metrikler</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {keyFacts.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-brand-600 dark:text-brand-400 shrink-0">{f.raw}</span>
                    <span className="line-clamp-2">{f.context}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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

          {/* Zengin İç/Dış Link & Yasal Mevzuat Otorite Ekosistemi (Faz 14) */}
          <BlogArticleEcosystemSeo
            title={post.title}
            content={post.content || ''}
            tags={tags}
            categoryName={post.category?.name}
            lang={lang}
          />

          {/* Author Box */}
          {author && (
            <div itemScope itemType="https://schema.org/Person" className="flex items-start gap-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-3xl mt-6">
               <meta itemProp="jobTitle" content="Yazar" />
               <meta itemProp="url" content={`/blog/yazar/${author.slug}`} />
               {author.avatar ? (
                 <Image itemProp="image" src={author.avatar} alt={author.name} width={80} height={80} className="w-20 h-20 rounded-full object-cover shrink-0" />
               ) : (
                 <div className="w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    {author.name.charAt(0)}
                 </div>
               )}
               <div className="flex flex-col gap-2">
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white" itemProp="name">
                   <Link href={`/blog/yazar/${author.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      {author.name}
                   </Link>
                 </h4>
                 {author.bio && <p itemProp="description" className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{author.bio}</p>}
               </div>
            </div>
          )}

          {/* Faz 206: Hukuki & Teknik İnceleme Yapan Uzman (Reviewed By) E-E-A-T Künyesi */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300">
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-xl shrink-0" aria-hidden="true">verified_user</span>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Mevzuat & Hukuki Uyumluluk Denetimi: </span>
              Bu içerik 634 sayılı Kat Mülkiyeti Kanunu, 5188 sayılı Özel Güvenlik Kanunu ve ISO 41001 Tesis Yönetim Standartları uyarınca <strong>Alo Yönetim Hukuk & Operasyon Denetim Kurulu</strong> tarafından teknik ve hukuki incelemeden geçirilmiştir.
            </div>
          </div>

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
          
          {/* Next & Previous Posts (Link Juice) */}
          {(prevPost || nextPost) && (
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="flex-1 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/10 transition-colors group flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform" aria-hidden="true">arrow_back</span>
                    Önceki Yazı
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white line-clamp-2">{prevPost.title}</span>
                </Link>
              ) : <div className="flex-1" />}
              
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="flex-1 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/10 transition-colors group flex flex-col items-end text-right">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                    Sonraki Yazı
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white line-clamp-2">{nextPost.title}</span>
                </Link>
              ) : <div className="flex-1" />}
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

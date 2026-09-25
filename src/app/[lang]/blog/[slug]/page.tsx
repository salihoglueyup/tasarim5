import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/page/PageHeader';
import JsonLd from '@/components/seo/schema/JsonLd';
import { PostBody, ReadingProgress, ShareButtons, ImageWithSeo } from '@/components';
import { BlogArticleEcosystemSeo, VoiceSearchSpeakableSeo, ArticleAiOverviewCard, BlogAiTakeawaysSeo } from '@/components/seo';
import TableOfContents from '@/components/blog/TableOfContents';
import { prisma } from '@/lib/prisma';
import {
  generateBreadcrumbs,
  blogPostingSchema,
  webPageSchema,
} from '@/lib/schemas';
import { parseTags } from '@/lib/jsonSafe';
import BlogFAQExtractor from '@/components/seo/district/BlogFAQExtractor';
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
    datePublished: new Date(post.datePublished).toISOString(),
    dateModified: new Date(post.dateModified || post.datePublished).toISOString(),
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
      datePublished: new Date(post.datePublished).toISOString(),
      dateModified: new Date(post.dateModified || post.datePublished).toISOString(),
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
    speakableSelectors: ['#article-instant-answer-text', '.tldr', 'h1'],
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
      <PageHeader title={post.title} description={post.description} breadcrumbs={breadcrumbs} />

      <div className="py-12 md:py-16 px-[var(--spacing-gutter)] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Sol/Orta Kolon: Ana Makale İçeriği (Mobilde %100 Tam Genişlik, Masaüstünde 8 Kolon) */}
        <article id="article-content" className="lg:col-span-8 w-full flex flex-col gap-10 min-w-0">
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
              datePublished={new Date(post.datePublished).toISOString()}
            />
          </div>

          {/* Google AI Overviews & Gemini TL;DR Grounding Card */}
          {(post.tldr || post.description || post.summary) && (
            <ArticleAiOverviewCard
              title={post.title}
              tldr={post.tldr || post.description || post.summary}
              authorName={author?.name}
              category={category?.name}
              slug={slug}
            />
          )}

          {/* Google AI & Gemini Key Takeaways Box (Wave 66) */}
          <BlogAiTakeawaysSeo
            title={post.title}
            slug={slug}
            category={category?.name}
            lang={lang}
          />



          {/* Mobilde İçindekiler Tablosu (Katlanabilir Akordeon) */}
          <div className="lg:hidden w-full">
            <TableOfContents className="w-full" />
          </div>

          {/* Body with smart cross-linking */}
          <PostBody htmlContent={post.content} title={post.title} currentUrl={path} locale={lang} />

          {/* AI Search Key Facts & Quantitative Signals */}
          {(() => {
            // Farklı metrik türlerini (kanun, standart, süre/SLA, genel metrik, yüzde) çeşitlendirerek seç
            const selectedFacts: typeof keyFacts = [];
            const preferredTypes = ['legal_code', 'standard', 'timeframe', 'general_metric', 'percentage'] as const;

            // 1. Aşama: Her türden en kaliteli 1 olguyu seç
            for (const type of preferredTypes) {
              if (selectedFacts.length >= 4) break;
              const match = keyFacts.find(
                (f) => f.type === type && !selectedFacts.some((s) => s.context === f.context || s.raw === f.raw)
              );
              if (match) selectedFacts.push(match);
            }

            // 2. Aşama: Eğer 4'e ulaşılmadıysa kalan benzersiz olgularla doldur
            for (const f of keyFacts) {
              if (selectedFacts.length >= 4) break;
              if (!selectedFacts.some((s) => s.context === f.context || s.raw === f.raw)) {
                selectedFacts.push(f);
              }
            }

            const displayedFacts = selectedFacts.length >= 2 ? selectedFacts : keyFacts.slice(0, 4);

            return displayedFacts.length > 0 ? (
              <div className="bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-4 pb-3.5 border-b border-[var(--color-outline)]/60 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-amber-500 text-base" aria-hidden="true">analytics</span>
                    <span>Önemli Sayısal & Yasal Metrikler</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">Google AI Grounding</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {displayedFacts.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50/80 dark:bg-white/[0.02] p-3.5 rounded-2xl border border-slate-200/70 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
                      <span className="font-extrabold text-slate-900 dark:text-white bg-white dark:bg-white/10 px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-white/10 shrink-0 text-[11px] shadow-2xs">
                        {f.raw}
                      </span>
                      <span className="leading-relaxed pt-0.5 line-clamp-2">{f.context}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[var(--color-outline)]/60 dark:border-white/10">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">Etiketler:</span>
              {tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog/etiket/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="text-xs font-medium bg-slate-100 hover:bg-slate-900 hover:text-white dark:bg-white/5 dark:hover:bg-white dark:hover:text-slate-950 text-slate-700 dark:text-slate-300 rounded-xl px-3 py-1.5 border border-slate-200/80 dark:border-white/10 transition-all shadow-2xs hover:scale-105"
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
            <div itemScope itemType="https://schema.org/Person" className="flex items-start gap-6 bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 p-6 md:p-8 rounded-3xl mt-6 shadow-xs">
               <meta itemProp="jobTitle" content="Yazar" />
               <meta itemProp="url" content={`/blog/yazar/${author.slug}`} />
               {author.avatar ? (
                 <Image itemProp="image" src={author.avatar} alt={author.name} width={80} height={80} className="w-20 h-20 rounded-full object-cover shrink-0 border border-slate-200/80 dark:border-white/10" />
               ) : (
                 <div className="w-20 h-20 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center text-2xl font-bold shrink-0 shadow-xs">
                    {author.name.charAt(0)}
                 </div>
               )}
               <div className="flex flex-col gap-2">
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white" itemProp="name">
                   <Link href={`/blog/yazar/${author.slug}`} className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                      {author.name}
                   </Link>
                 </h4>
                 {author.bio && <p itemProp="description" className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{author.bio}</p>}
               </div>
            </div>
          )}

          {/* Faz 206: Hukuki & Teknik İnceleme Yapan Uzman (Reviewed By) E-E-A-T Künyesi */}
          <div className="flex items-center gap-3.5 p-5 rounded-3xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
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

        {/* Sağ Kolon: Masaüstü Yapışkan (Sticky) Otorite ve Dönüşüm Sidebar'ı (4 Kolon) */}
        <aside className="hidden lg:flex lg:col-span-4 w-full flex-col gap-6 lg:sticky lg:top-28 self-start">
          {/* 1. Dinamik Masaüstü İçindekiler Tablosu */}
          <TableOfContents className="w-full shadow-md" />

          {/* 2. Kurumsal Bütçe & Keşif Teklifi Kartı */}
          <div className="p-6 md:p-8 rounded-3xl bg-[var(--color-surface)] dark:bg-[#15161E] text-slate-900 dark:text-white border border-[var(--color-outline)]/80 dark:border-white/10 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold w-fit">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">verified</span>
                Hızlı Fiyat & Bütçe
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                Siteniz İçin Şeffaf Teklif Alın
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                634 sayılı KMK'ya tam uyumlu işletme projesi, 5188 lisanslı güvenlik ve %30'a varan merkezi bütçe tasarrufu.
              </p>
              <div className="flex flex-col gap-2.5 pt-2">
                <Link
                  href="/teklif-al"
                  className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm text-center shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>10 Dakikada Teklif Al</span>
                  <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                </Link>
                <a
                  href="https://wa.me/902165504848?text=Merhaba%2C%20blog%20yaz%C4%B1n%C4%B1z%20%C3%BCzerinden%20tesis%20y%C3%B6netimi%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-semibold text-xs text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">chat</span>
                  <span>WhatsApp Destek Hattı</span>
                </a>
              </div>
            </div>
          </div>

          {/* 3. Bütçe ve Aidat Simülatörü Kısayolu */}
          <div className="p-6 rounded-3xl bg-[var(--color-surface)] dark:bg-[#15161E] border border-[var(--color-outline)]/80 dark:border-white/10 flex flex-col gap-4 shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">calculate</span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">KMK Aidat Hesaplayıcı</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Arsa payı ve ortak gider simülasyonu</p>
              </div>
            </div>
            <Link
              href="/hesaplayici"
              className="relative z-10 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white font-bold text-xs flex items-center justify-between transition-all shadow-xs group-hover:shadow-md"
            >
              <span>Hesaplayıcıyı Başlat</span>
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          {/* 4. Doğrudan Çağrı Merkezi */}
          <div className="p-5 rounded-3xl border border-[var(--color-outline)]/80 dark:border-white/10 bg-[var(--color-surface)] dark:bg-[#15161E] flex items-center justify-between gap-4 shadow-xs relative overflow-hidden">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>7/24 Çağrı Merkezi</span>
              </div>
              <a href="tel:+902165504848" className="text-lg font-black text-slate-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-mono tracking-tight">
                0216 550 48 48
              </a>
            </div>
            <a
              href="tel:+902165504848"
              className="w-11 h-11 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white border border-emerald-500/20 flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 shrink-0"
              aria-label="Telefonla ara"
              title="Doğrudan Ara: 0216 550 48 48"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">call</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}

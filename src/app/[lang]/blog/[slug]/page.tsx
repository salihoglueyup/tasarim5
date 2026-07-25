import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd, PostBody, ReadingProgress, ShareButtons } from '@/components';
import {
  generateBreadcrumbs,
  blogPostingSchema,
  webPageSchema,
  personSchema,
} from '@/lib/schemas';
import { LOCALES } from '@/lib/seo';
import {
  getPost,
  getCategory,
  relatedPosts,
  readingMinutes,
  POSTS,
} from '@/data/posts';
import { getAuthor } from '@/data/authors';

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => POSTS.map((p) => ({ lang, slug: p.slug })));
}

function formatDate(iso: string): string {
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
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const category = getCategory(post.category);
  const related = relatedPosts(post);
  const minutes = readingMinutes(post);
  const path = `/blog/${post.slug}`;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    ...(category ? [{ name: category.name, url: `/blog/kategori/${category.slug}` }] : []),
    { name: post.title, url: path },
  ]);

  const articleLd = blogPostingSchema({
    headline: post.title,
    description: post.description,
    path,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    section: category?.name,
    keywords: post.tags,
    author: author
      ? { name: author.name, jobTitle: author.title, url: `/blog/yazar/${author.slug}` }
      : undefined,
  });

  const pageLd = webPageSchema({
    name: post.title,
    description: post.description,
    path,
    speakableSelectors: ['h1', '.tldr'],
  });

  const authorLd = author
    ? personSchema({ name: author.name, jobTitle: author.title, sameAs: author.sameAs })
    : null;

  return (
    <>
      <ReadingProgress />
      <JsonLd data={[pageLd, breadcrumbLd, articleLd, ...(authorLd ? [authorLd] : [])]} />
      <PageHeader title={post.title} description={post.description} />

      <article className="py-16 px-[var(--spacing-gutter)] max-w-3xl mx-auto flex flex-col gap-10">
        {/* Meta bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
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
                {formatDate(post.datePublished)} • {minutes} dk okuma
              </div>
            </div>
          </div>
          {category && (
            <Link
              href={`/blog/kategori/${category.slug}`}
              className="bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold px-4 py-1.5 rounded-full text-xs"
            >
              {category.name}
            </Link>
          )}
        </div>

        {/* Cover */}
        <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden border border-slate-200/50 dark:border-white/10">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* TL;DR */}
        <aside className="tldr flex items-start gap-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
          <span className="material-symbols-outlined text-blue-600 shrink-0" aria-hidden="true">bolt</span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Özet</div>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{post.tldr}</p>
          </div>
        </aside>

        {/* Body */}
        <PostBody blocks={post.content} />

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-white/10">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/etiket/${encodeURIComponent(tag)}`}
              className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-full px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Share */}
        <ShareButtons path={path} title={post.title} />

        {/* Author box (E-E-A-T) */}
        {author && (
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 border-4 border-white dark:border-[#0b1c30] shadow-md flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">person</span>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Link href={`/blog/yazar/${author.slug}`} className="text-lg font-bold text-slate-900 dark:text-white hover:underline">
                {author.name}
              </Link>
              <div className="text-sm text-[var(--color-primary)] font-semibold mb-2">{author.title}</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">{author.bio}</p>
            </div>
          </div>
        )}

        {/* Related posts (Faz 158/174) */}
        {related.length > 0 && (
          <div className="flex flex-col gap-6 pt-6 border-t border-slate-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex flex-col gap-3">
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10">
                    <Image src={r.image} alt={r.title} width={400} height={250} sizes="(max-width: 640px) 100vw, 250px" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Pillar link */}
        <div className="text-center text-sm text-slate-500">
          İlgili hizmet:{' '}
          <Link href={post.pillar} className="text-blue-600 font-semibold hover:underline">
            Detaylı bilgi için tıklayın
          </Link>
        </div>
      </article>
    </>
  );
}

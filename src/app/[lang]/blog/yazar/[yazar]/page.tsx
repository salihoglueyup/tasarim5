import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd, PostGrid } from '@/components';
import { buildMetadata, LOCALES } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, personSchema } from '@/lib/schemas';
import { AUTHORS, getAuthor } from '@/data/authors';
import { postsByAuthor } from '@/data/posts';

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => AUTHORS.map((a) => ({ lang, yazar: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; yazar: string }>;
}): Promise<Metadata> {
  const { lang, yazar } = await params;
  const author = getAuthor(yazar);
  if (!author) {
    return buildMetadata({ title: 'Yazar Bulunamadı', description: 'Yazar bulunamadı.', path: `/blog/yazar/${yazar}`, lang, noindex: true });
  }
  return buildMetadata({
    title: `${author.name} — ${author.title}`,
    description: author.bio,
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
  const author = getAuthor(yazar);
  if (!author) notFound();

  const posts = postsByAuthor(yazar);
  const path = `/blog/yazar/${yazar}`;

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: author.name, url: path },
  ]);
  const personLd = personSchema({ name: author.name, jobTitle: author.title, sameAs: author.sameAs });
  const pageLd = webPageSchema({ type: 'CollectionPage', name: `${author.name} — ${author.title}`, description: author.bio, path });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, personLd]} />
      <PageHeader title={author.name} description={author.title} />
      <section className="py-16 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-12">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-4">
          <p className="text-base text-[var(--color-secondary)] font-light leading-relaxed">{author.bio}</p>
          <div className="flex flex-wrap gap-2">
            {author.expertise.map((e) => (
              <span key={e} className="bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white rounded-full px-4 py-1.5 text-sm font-semibold">
                {e}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">{author.name} tarafından yazılan yazılar</h2>
          <PostGrid posts={posts} />
        </div>
      </section>
    </>
  );
}

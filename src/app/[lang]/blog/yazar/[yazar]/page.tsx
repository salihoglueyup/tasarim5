import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import { PostGrid } from '@/components';
import { buildMetadata, BASE_URL, LOCALES } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, JsonLdObject, authorPersonSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  try {
    const authors = await prisma.author.findMany({ select: { slug: true } });
    return LOCALES.flatMap((lang) =>
      authors.map((author) => ({ lang, yazar: author.slug }))
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; yazar: string }>;
}): Promise<Metadata> {
  const { lang, yazar } = await params;
  const author = await prisma.author.findUnique({ where: { slug: yazar } });
  if (!author) {
    return buildMetadata({ title: 'Yazar Bulunamadı', description: '', path: `/blog/yazar/${yazar}`, lang, noindex: true });
  }
  return buildMetadata({
    title: `${author.name} — Tesis Yönetimi Yazarı | Alo Yönetim Blog`,
    description: author.bio ?? `${author.name}, Alo Yönetim bünyesinde tesis yönetimi, KMK hukuku ve site güvenliği konularında uzman içerikler üretiyor.`,
    path: `/blog/yazar/${yazar}`,
    lang,
    keywords: ['tesis yönetimi uzmanı', 'site yönetimi yazar', author.name],
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
    orderBy: { datePublished: 'desc' },
  });

  const path = `/blog/yazar/${yazar}`;

  const breadcrumbs = [
    { name: 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: author.name, url: path },
  ];

  const listLd: JsonLdObject = {
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
    })),
  };

  const authorLd = authorPersonSchema({
    slug: author.slug,
    name: author.name,
    bio: author.bio,
    avatar: author.avatar,
  });

  const pageLd = webPageSchema({
    type: 'ProfilePage',
    name: `${author.name} — Yazar`,
    description: author.bio || 'Yazar Profili',
    path,
    mainEntity: authorLd,
  });

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd, listLd, authorLd]} />
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Author Card */}
      <div className="py-12 px-[var(--spacing-gutter)] max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start gap-8 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem]">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={120}
              height={120}
              className="w-28 h-28 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-brand-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">
              {author.name.charAt(0)}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-black text-[var(--color-primary)]">{author.name}</h1>
            <div className="text-sm font-semibold text-brand-600 dark:text-brand-400">
              Kıdemli Tesis Yönetimi Uzmanı · Alo Yönetim
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {['Tesis Yönetimi', 'KMK 634', 'ISO 41001', 'Site Güvenliği'].map((tag) => (
                <span key={tag} className="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            {author.bio && (
              <p className="text-base text-[var(--color-secondary)] leading-relaxed max-w-2xl mt-1">
                {author.bio}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <span className="material-symbols-outlined text-base">article</span>
              <span>{posts.length} makale yayınlandı</span>
            </div>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: 'gavel', label: 'KMK 634 Hukuku', desc: 'Aidat icra takibi, işletme projesi ve ortak alan yönetimi.' },
            { icon: 'verified_user', label: 'ISO 41001', desc: 'Entegre tesis yönetimi standartları ve uygulamaları.' },
            { icon: 'security', label: '5188 Güvenlik', desc: 'Site güvenlik mevzuatı ve risk analizi.' },
            { icon: 'engineering', label: 'Teknik Bakım', desc: 'Asansör, jeneratör, yangın sistemi periyodik bakımı.' },
            { icon: 'account_balance_wallet', label: 'Bütçe Yönetimi', desc: 'Şeffaf aidat ve ihale süreçleri.' },
            { icon: 'eco', label: 'Sürdürülebilirlik', desc: 'Enerji verimliliği ve yeşil bina standartları.' },
          ].map((exp) => (
            <div key={exp.label} className="flex flex-col gap-2 p-5 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-2xl">
              <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-2xl">{exp.icon}</span>
              <div className="font-bold text-sm text-[var(--color-primary)]">{exp.label}</div>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Posts */}
      <section className="py-8 px-[var(--spacing-gutter)] max-w-[var(--spacing-container-max)] mx-auto">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-8">
          {author.name} Tarafından Yazılan Makaleler
        </h2>
        <PostGrid posts={posts} />
      </section>
    </>
  );
}

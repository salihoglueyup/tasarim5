import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildMetadata, LOCALES, BASE_URL } from '@/lib/seo';
import { generateBreadcrumbs, webPageSchema, authorPersonSchema } from '@/lib/schemas';
import type { Metadata } from 'next';
import trDict from '@/i18n/locales/tr/common.json';
import enDict from '@/i18n/locales/en/common.json';
import ruDict from '@/i18n/locales/ru/common.json';
import arDict from '@/i18n/locales/ar/common.json';

const dictionaries: Record<string, Record<string, string>> = { tr: trDict, en: enDict, ru: ruDict, ar: arDict };

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const authors = await prisma.author.findMany({ select: { slug: true } });
    return LOCALES.flatMap((lang) => authors.map((a) => ({ lang, slug: a.slug })));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const author = await prisma.author.findUnique({ where: { slug } });
  if (!author) {
    return buildMetadata({ title: 'Yazar Bulunamadı', description: '', path: '/blog', lang, noindex: true });
  }
  return buildMetadata({
    title: `${author.name} — Tesis Yönetimi Yazarı | Alo Yönetim Blog`,
    description: author.bio ?? `${author.name}, Alo Yönetim bünyesinde tesis yönetimi, KMK hukuku ve site güvenliği konularında uzman içerikler üretiyor.`,
    path: `/blog/yazar/${slug}`,
    lang,
    keywords: ['tesis yönetimi uzmanı', 'site yönetimi yazar', author.name],
  });
}

function formatDate(iso: string | Date): string {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = (key: string) => dictionaries[lang]?.[key] ?? dictionaries['tr'][key] ?? key;

  const author = await prisma.author.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { published: true },
        orderBy: { datePublished: 'desc' },
        select: { slug: true, title: true, description: true, image: true, datePublished: true, category: true },
      },
    },
  });

  if (!author) notFound();

  const breadcrumbs = [
    { name: t('breadcrumb_home') || 'Anasayfa', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Yazarlar', url: '/blog/yazar' },
    { name: author.name, url: `/blog/yazar/${slug}` },
  ];

  const authorLd = authorPersonSchema({
    slug: author.slug,
    name: author.name,
    bio: author.bio,
    avatar: author.avatar,
  });

  const pageLd = webPageSchema({
    name: `${author.name} — Yazar Profili`,
    description: author.bio ?? `${author.name} tesis yönetimi ve site yönetimi konularında uzman yazar.`,
    path: `/blog/yazar/${slug}`,
    speakableSelectors: ['.author-bio'],
  });

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  return (
    <>
      <JsonLd data={[authorLd, pageLd, breadcrumbLd]} />
      <div className="max-w-7xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <PageHeader
        title={author.name}
        description={`Tesis Yönetimi & KMK Hukuku Uzmanı — ${author.posts.length} makale`}
      />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-5xl mx-auto flex flex-col gap-16">
        {/* Author Card */}
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
            <div className="flex flex-wrap gap-2">
              {['Tesis Yönetimi', 'KMK 634', 'ISO 41001', 'Site Güvenliği'].map((tag) => (
                <span key={tag} className="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            {author.bio && (
              <p className="author-bio text-base text-[var(--color-secondary)] leading-relaxed max-w-2xl">
                {author.bio}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <span className="material-symbols-outlined text-base">article</span>
              <span>{author.posts.length} makale yayınlandı</span>
            </div>
          </div>
        </div>

        {/* Expertise Credentials */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Uzmanlık Alanları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: 'gavel', label: 'KMK 634 Kat Mülkiyeti Hukuku', desc: 'Aidat icra takibi, işletme projesi ve ortak alan yönetimi.' },
              { icon: 'verified_user', label: 'ISO 41001 Tesis Yönetimi', desc: 'Entegre tesis yönetimi standartları ve best practice uygulamaları.' },
              { icon: 'security', label: '5188 Özel Güvenlik', desc: 'Site güvenlik mevzuatı, risk analizi ve güvenlik protokolleri.' },
              { icon: 'engineering', label: 'Teknik Bakım', desc: 'Asansör, jeneratör, yangın sistemleri periyodik bakım yönetimi.' },
              { icon: 'account_balance_wallet', label: 'Bütçe Optimizasyonu', desc: 'Aidat yönetimi, ihale süreçleri ve şeffaf mali raporlama.' },
              { icon: 'eco', label: 'Sürdürülebilir Yönetim', desc: 'Enerji verimliliği, yeşil bina standartları ve çevre yönetimi.' },
            ].map((exp) => (
              <div key={exp.label} className="flex flex-col gap-2 p-5 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-2xl">
                <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-2xl">{exp.icon}</span>
                <div className="font-bold text-sm text-[var(--color-primary)]">{exp.label}</div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Author Posts */}
        {author.posts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-8">
              {author.name} Tarafından Yazılan Makaleler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {author.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-colors"
                >
                  <div className="w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image ?? '/images/hero-poster-v5.webp'}
                      alt={post.title}
                      width={600}
                      height={338}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2 px-5 pb-5">
                    {post.category && (
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="font-bold text-[var(--color-primary)] leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-secondary)] line-clamp-2">{post.description}</p>
                    <div className="text-xs text-slate-500 mt-1">{formatDate(post.datePublished)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

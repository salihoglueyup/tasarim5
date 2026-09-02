import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata, LOCALES, BASE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import PageHeader from '@/components/layout/PageHeader';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { TERMS, termToSlug, slugToTerm } from '@/data/dictionary';
import { getDictionary } from '@/lib/i18n';

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    TERMS.map((t) => ({ lang, terim: termToSlug(t.term) })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; terim: string }>;
}): Promise<Metadata> {
  const { lang, terim } = await params;
  const term = slugToTerm(terim);
  if (!term) {
    return buildMetadata({ title: 'Terim Bulunamadı', description: '', path: '/sozluk', lang, noindex: true });
  }
  const cleanDef = term.definition.replace(/\s+/g, ' ').trim();
  const description = `${term.term} nedir? ${cleanDef.slice(0, 105)}... KMK 634 kapsamındaki hukuki tanımı ve detaylarını inceleyin!`;

  return buildMetadata({
    title: `${term.term} Nedir? — Kat Mülkiyeti & Site Yönetimi Sözlüğü | Alo Yönetim`,
    description,
    path: `/sozluk/${terim}`,
    lang,
    targetKeyword: `${term.term.toLowerCase()} nedir`,
    keywords: [term.term, `${term.term} nedir`, `${term.term} kmk`, 'tesis yönetimi sözlük', 'kat mülkiyeti kanunu terimleri'],
  });
}

export default async function TermPage({
  params,
}: {
  params: Promise<{ lang: string; terim: string }>;
}) {
  const { lang, terim } = await params;
  const dict = await getDictionary(lang);
  const t = (key: string) => dict[key] ?? key;
  const term = slugToTerm(terim);
  if (!term) notFound();

  const termIndex = TERMS.findIndex((t) => termToSlug(t.term) === terim);
  const prevTerm = termIndex > 0 ? TERMS[termIndex - 1] : null;
  const nextTerm = termIndex < TERMS.length - 1 ? TERMS[termIndex + 1] : null;

  const breadcrumbs = [
    { name: t('breadcrumb_home') || 'Anasayfa', url: '/' },
    { name: 'Sözlük', url: '/sozluk' },
    { name: term.term, url: `/sozluk/${terim}` },
  ];

  const termLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/sozluk/${terim}#term`,
    name: term.term,
    description: term.definition,
    url: `${BASE_URL}/sozluk/${terim}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': `${BASE_URL}/sozluk#glossary`,
      name: 'Site ve Tesis Yönetimi Sözlüğü — Alo Yönetim',
      url: `${BASE_URL}/sozluk`,
    },
    ...(term.link
      ? {
          subjectOf: {
            '@type': 'WebPage',
            name: term.link.label,
            url: `${BASE_URL}${term.link.href}`,
          },
        }
      : {}),
  };

  const pageLd = webPageSchema({
    name: `${term.term} Nedir?`,
    description: term.definition.slice(0, 200),
    path: `/sozluk/${terim}`,
    speakableSelectors: ['.term-definition', 'h1'],
  });

  const breadcrumbLd = generateBreadcrumbs(breadcrumbs);

  const relatedTerms = TERMS.filter(
    (rt) => rt.term !== term.term && (
      rt.definition.toLowerCase().includes(term.term.toLowerCase().split(' ')[0]) ||
      (term.link && rt.link?.href === term.link.href)
    )
  ).slice(0, 4);

  return (
    <>
      <JsonLd data={[termLd, pageLd, breadcrumbLd]} />
      <PageHeader 
        title={`${term.term} Nedir?`}
        description={term.definition.slice(0, 160)}
        breadcrumbs={breadcrumbs}
      />

      <div className="py-16 px-[var(--spacing-gutter)] max-w-4xl mx-auto flex flex-col gap-12">
        {/* Definition Card */}
        <div className="term-definition bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-amber-500 text-2xl" aria-hidden="true">
              menu_book
            </span>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--color-tertiary)]">Resmi Tanım</span>
          </div>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] leading-relaxed">
            {term.definition}
          </p>
          {term.link && (
            <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/40">
              <Link
                href={term.link.href}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:opacity-95 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-md"
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
                {term.link.label}
              </Link>
            </div>
          )}
        </div>

        {/* Quick Answer Box — Featured Snippet hedefi */}
        <div className="bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 p-6 rounded-2xl">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5" aria-hidden="true">
              lightbulb
            </span>
            <div>
              <div className="font-bold text-[var(--color-primary)] text-sm mb-1">Hızlı Özet (AI & Arama Motoru Yanıtı)</div>
              <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
                <strong>{term.term}</strong>: {term.definition.split('.')[0]}.
              </p>
            </div>
          </div>
        </div>

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">İlgili Terimler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTerms.map((rt) => (
                <Link
                  key={rt.term}
                  href={`/sozluk/${termToSlug(rt.term)}`}
                  className="flex flex-col gap-1.5 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-blue-500/50 transition-colors group"
                >
                  <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{rt.term}</span>
                  <p className="text-xs text-[var(--color-secondary)] line-clamp-2">{rt.definition}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next Navigation */}
        <div className="flex gap-4 pt-4 border-t border-[var(--color-outline)]/40">
          {prevTerm ? (
            <Link
              href={`/sozluk/${termToSlug(prevTerm.term)}`}
              className="flex-1 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-blue-500/40 transition-colors flex flex-col gap-1 group"
            >
              <span className="text-xs text-[var(--color-tertiary)] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Önceki
              </span>
              <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-blue-600 line-clamp-1">{prevTerm.term}</span>
            </Link>
          ) : <div className="flex-1" />}
          {nextTerm ? (
            <Link
              href={`/sozluk/${termToSlug(nextTerm.term)}`}
              className="flex-1 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-blue-500/40 transition-colors flex flex-col items-end gap-1 group"
            >
              <span className="text-xs text-[var(--color-tertiary)] flex items-center gap-1">
                Sonraki <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-blue-600 line-clamp-1">{nextTerm.term}</span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Back to Glossary */}
        <div className="text-center">
          <Link
            href="/sozluk"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-tertiary)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            Tüm sözlüğe dön
          </Link>
        </div>
      </div>
    </>
  );
}

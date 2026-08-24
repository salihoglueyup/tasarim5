import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata, LOCALES, BASE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { TERMS, termToSlug, slugToTerm } from '@/data/dictionary';
import trDict from '@/i18n/locales/tr/common.json';
import enDict from '@/i18n/locales/en/common.json';
import ruDict from '@/i18n/locales/ru/common.json';
import arDict from '@/i18n/locales/ar/common.json';

const dictionaries: Record<string, Record<string, string>> = { tr: trDict, en: enDict, ru: ruDict, ar: arDict };

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
  return buildMetadata({
    title: `${term.term} Nedir? — Site Yönetimi Sözlüğü | Alo Yönetim`,
    description: term.definition.slice(0, 160),
    path: `/sozluk/${terim}`,
    lang,
    targetKeyword: `${term.term} nedir`,
    keywords: [term.term, `${term.term} nedir`, 'tesis yönetimi sözlük', 'kmk terimleri'],
  });
}

export default async function TermPage({
  params,
}: {
  params: Promise<{ lang: string; terim: string }>;
}) {
  const { lang, terim } = await params;
  const t = (key: string) => dictionaries[lang]?.[key] ?? dictionaries['tr'][key] ?? key;
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
      <div className="max-w-4xl mx-auto px-[var(--spacing-gutter)] pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="py-16 px-[var(--spacing-gutter)] max-w-4xl mx-auto flex flex-col gap-12">
        {/* Term Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/sozluk" className="hover:text-brand-600 transition-colors">Sözlük</Link>
            <span>›</span>
            <span className="text-[var(--color-primary)] font-semibold">{term.term}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-primary)] leading-tight">
            {term.term}
            <span className="text-brand-600 dark:text-brand-400"> Nedir?</span>
          </h1>
        </div>

        {/* Definition Card */}
        <div className="term-definition bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-12 rounded-[2.5rem]">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-brand-600 dark:text-brand-400 text-2xl" aria-hidden="true">
              dictionary
            </span>
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Tanım</span>
          </div>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] leading-relaxed">
            {term.definition}
          </p>
          {term.link && (
            <div className="mt-8 pt-6 border-t border-[var(--color-outline)]/40">
              <Link
                href={term.link.href}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
                {term.link.label}
              </Link>
            </div>
          )}
        </div>

        {/* Quick Answer Box — Featured Snippet hedefi */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 p-6 rounded-2xl">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-xl shrink-0 mt-0.5" aria-hidden="true">
              lightbulb
            </span>
            <div>
              <div className="font-bold text-amber-900 dark:text-amber-200 text-sm mb-1">Hızlı Yanıt</div>
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
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
                  className="flex flex-col gap-1.5 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-brand-500/50 transition-colors"
                >
                  <span className="font-bold text-sm text-[var(--color-primary)] group-hover:text-brand-600">{rt.term}</span>
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
              className="flex-1 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-brand-500/40 transition-colors flex flex-col gap-1"
            >
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Önceki
              </span>
              <span className="font-bold text-sm text-[var(--color-primary)] line-clamp-1">{prevTerm.term}</span>
            </Link>
          ) : <div className="flex-1" />}
          {nextTerm ? (
            <Link
              href={`/sozluk/${termToSlug(nextTerm.term)}`}
              className="flex-1 p-4 bg-[var(--color-surface)] border border-[var(--color-outline)]/50 rounded-xl hover:border-brand-500/40 transition-colors flex flex-col items-end gap-1"
            >
              <span className="text-xs text-slate-500 flex items-center gap-1">
                Sonraki <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <span className="font-bold text-sm text-[var(--color-primary)] line-clamp-1">{nextTerm.term}</span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Back to Glossary */}
        <div className="text-center">
          <Link
            href="/sozluk"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors"
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            Tüm sözlüğe dön
          </Link>
        </div>
      </div>
    </>
  );
}

import Link from 'next/link';
import JsonLd from '@/components/seo/schema/JsonLd';
import Icon from '@/components/ui/branding/Icon';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import { BASE_URL } from '@/lib/seo';
import { localePath } from '@/lib/i18n/localePath';
import { TRANSLATED_TERMS, type TranslatedLang } from '@/data/dictionaryTranslated';

type Dict = Record<string, string>;

/** en/ru/ar için çevrilmiş tek bir sözlük terimi sayfası. */
export default function TranslatedTermView({
  slug,
  lang,
  dict,
}: {
  slug: string;
  lang: TranslatedLang;
  dict: Dict;
}) {
  const t = (key: string) => dict[key] ?? key;
  const current = TRANSLATED_TERMS.find((x) => x.slug === slug);
  if (!current) return null;
  const text = current[lang];
  const related = TRANSLATED_TERMS.filter((x) => x.slug !== slug).slice(0, 4);

  const breadcrumbLd = generateBreadcrumbs([
    { name: t('nav_home'), url: '/' },
    { name: t('sozx_crumb'), url: '/sozluk' },
    { name: text.term, url: `/sozluk/${slug}` },
  ]);

  const termLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/${lang}/sozluk/${slug}#term`,
    name: text.term,
    description: text.definition,
    url: `${BASE_URL}/${lang}/sozluk/${slug}`,
    inLanguage: lang,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': `${BASE_URL}/${lang}/sozluk#glossary`,
      name: t('sozx_h1'),
      url: `${BASE_URL}/${lang}/sozluk`,
    },
  };

  const pageLd = webPageSchema({
    name: text.term,
    description: text.definition.slice(0, 200),
    path: `/sozluk/${slug}`,
    speakableSelectors: ['h1', '.term-definition'],
  });

  return (
    <>
      <JsonLd data={[termLd, pageLd, breadcrumbLd]} />
      <section className="pt-36 pb-12 md:pt-44 bg-slate-950 text-white border-b border-white/10 px-[var(--spacing-gutter)]">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-5">
            <Link href={localePath('/', lang)} className="hover:text-white transition-colors">{t('nav_home')}</Link>
            <span>/</span>
            <Link href={localePath('/sozluk', lang)} className="hover:text-white transition-colors">{t('sozx_crumb')}</Link>
          </nav>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">{text.term}</h1>
        </div>
      </section>

      <div className="py-14 px-[var(--spacing-gutter)] max-w-4xl mx-auto flex flex-col gap-10">
        <div className="term-definition bg-[var(--color-surface)] border border-[var(--color-outline)]/60 p-8 md:p-10 rounded-[2rem] shadow-sm" id="term-instant-answer-text">
          <div className="flex items-center gap-3 mb-5">
            <Icon name="menu_book" className="text-slate-500 text-2xl" />
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--color-tertiary)]">{t('sozx_def_label')}</span>
          </div>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] leading-relaxed">{text.definition}</p>
          <p className="mt-6 pt-5 border-t border-[var(--color-outline)]/40 text-xs text-[var(--color-tertiary)]">
            {t('sozx_disclaimer')}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">{t('sozx_related')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={localePath(`/sozluk/${r.slug}`, lang)}
                className="group p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-outline)]/60 hover:border-[var(--color-primary)]/40 transition-colors flex flex-col gap-1"
              >
                <span className="font-bold text-sm text-[var(--color-primary)]">{r[lang].term}</span>
                <span className="text-xs text-[var(--color-secondary)] line-clamp-2">{r[lang].definition}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href={localePath('/sozluk', lang)} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline">
            <Icon name="menu_book" className="text-base" />
            {t('sozx_back')}
          </Link>
          <Link
            href={localePath('/teklif-al', lang)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {t('sozx_cta_btn')}
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </div>
    </>
  );
}

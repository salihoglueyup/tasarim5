import Link from 'next/link';
import Icon from '@/components/ui/branding/Icon';
import { localePath } from '@/lib/i18n/localePath';
import { getCategoryComparisonMatrix } from '@/lib/blog/blogAiEnricher';

export interface BlogStructuredKnowledgeSeoProps {
  title: string;
  categorySlug?: string;
  lang?: string;
  showComparisonTable?: boolean;
  qaItems?: { heading: string; body: string }[];
  className?: string;
}

const FAQ_TITLE_BY_LANG: Record<string, string> = {
  tr: 'Google AI Overviews • Makale Soru & Cevap (Q&A) Özeti',
  en: 'Google AI Overviews • Article Q&A Summary',
  ru: 'Google AI Overviews • Вопросы и ответы по статье',
  ar: 'Google AI Overviews • ملخص الأسئلة والأجوبة',
};

const LINKS_BY_LANG: Record<string, { kmkLabel: string; calcLabel: string }> = {
  tr: {
    kmkLabel: '7579 Sayılı Kanun (2026 KMK) Rehberi',
    calcLabel: 'KMK m.20 Aidat & Arsa Payı Hesaplayıcı',
  },
  en: {
    kmkLabel: 'Law No. 7579 (2026 KMK) Amendments',
    calcLabel: 'KMK Art. 20 Maintenance Fee Calculator',
  },
  ru: {
    kmkLabel: 'Поправки к KMK 2026 (Закон № 7579)',
    calcLabel: 'Калькулятор айдата по ст. 20 KMK',
  },
  ar: {
    kmkLabel: 'تعديلات قانون الملكية الطابقية 2026 (قانون 7579)',
    calcLabel: 'حاسبة العائدات وحصة الأرض (مادة 20)',
  },
};

export default function BlogStructuredKnowledgeSeo({
  title,
  categorySlug = 'tesis-yonetimi',
  lang = 'tr',
  showComparisonTable = true,
  qaItems = [],
  className = '',
}: BlogStructuredKnowledgeSeoProps) {
  const matrix = getCategoryComparisonMatrix(categorySlug, lang);
  const links = LINKS_BY_LANG[lang] || LINKS_BY_LANG.tr;
  const faqHeading = FAQ_TITLE_BY_LANG[lang] || FAQ_TITLE_BY_LANG.tr;

  const tableSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    about: `${title} — ${matrix.heading}`,
    name: matrix.heading,
  };

  return (
    <section
      id="blog-structured-knowledge"
      aria-label={matrix.heading}
      className={`bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }}
      />

      {showComparisonTable && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Icon name="verified" className="text-sm text-emerald-500" />
              <span>{matrix.badge}</span>
            </span>
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              KMK 634 · 7579 · 5188
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-[var(--color-primary)]">
            {matrix.heading}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
            {matrix.lead}
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[var(--color-outline)]/60">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-slate-500/10 text-[var(--color-primary)]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">
                    {matrix.headers[0]}
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold">
                    {matrix.headers[1]}
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold">
                    {matrix.headers[2]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-outline)]/40 text-[var(--color-secondary)]">
                {matrix.rows.map((row) => (
                  <tr key={row[0]} className="align-top">
                    <td className="px-4 py-3 font-semibold text-[var(--color-primary)]">
                      {row[0]}
                    </td>
                    <td className="px-4 py-3 leading-relaxed">{row[1]}</td>
                    <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[var(--color-tertiary)]">{matrix.legalNote}</p>
        </div>
      )}

      {qaItems.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[var(--color-outline)]/50">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            <Icon name="help_center" className="text-base text-emerald-500" />
            <span>{faqHeading}</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {qaItems.slice(0, 4).map((item) => (
              <div
                key={item.heading}
                className="p-4 rounded-2xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 space-y-1.5"
              >
                <h3 className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">
                  {item.heading}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-outline)]/50 text-xs">
        <Link
          href={localePath('/kmk-2026-degisiklikleri', lang)}
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary)] hover:underline"
        >
          <Icon name="gavel" className="text-sm text-emerald-500" />
          <span>{links.kmkLabel}</span>
        </Link>
        <Link
          href={localePath('/hesaplayici', lang)}
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary)] hover:underline"
        >
          <Icon name="calculate" className="text-sm text-emerald-500" />
          <span>{links.calcLabel}</span>
        </Link>
      </div>
    </section>
  );
}

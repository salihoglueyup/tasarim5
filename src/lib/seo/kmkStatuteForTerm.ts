import { KMK_LEGISLATION_ARTICLES } from '@/data/kmkLegislationArticlesData';
import { KMK_LAW_INDEX } from '@/data/kmkLawData';

export const KMK_OFFICIAL_URL = 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5';

/**
 * Elimizdeki "kanun metni" alıntısı güncel değişiklikten (7579 sayılı Kanun, 22.05.2026) önceki metni yansıtan maddeler.
 * Bu maddelerde yanıltıcı olmamak için alıntı gösterilmez; yalnızca güncel sade anlatım ve resmi kaynak linki verilir.
 */
const OUTDATED_STATUTE_TEXT = new Set<number>([37]);

export interface KmkStatuteForTerm {
  articleNo: number;
  title: string;
  statuteText?: string;
  plainSummary: string;
  practicalNote?: string;
  officialUrl: string;
  legislationLd: Record<string, unknown>;
}

/** Terim adından KMK madde numarasını çıkarır: "KMK Madde 20 (...)", "KMK 37 (...)", "Ortak Alan Kiraya Verme (KMK m.45)". */
export function extractKmkArticleNo(termName: string): number | null {
  const m = termName.match(/(?:KMK|Kat Mülkiyeti Kanunu)\s*(?:Madde\s*|m\.\s*)?(\d{1,3})\b/i);
  if (!m) return null;
  // "Ek Madde" ifadeleri ve aralıklar (66-70) için ilk sayı kullanılır; veri yoksa null döner.
  return Number(m[1]);
}

/**
 * Sözlük terimi bir KMK maddesine karşılık geliyorsa madde metni, sade anlatım ve Legislation JSON-LD üretir.
 * Kaynak: src/data/kmkLegislationArticlesData.ts + src/data/kmkLawData.ts (uydurma metin üretilmez).
 */
export function getKmkStatuteForTerm(termName: string): KmkStatuteForTerm | null {
  const no = extractKmkArticleNo(termName);
  if (no === null) return null;
  const leg = KMK_LEGISLATION_ARTICLES.find((a) => a.articleNo === no);
  const idx = KMK_LAW_INDEX.find((a) => a.articleNumber === no);
  if (!leg && !idx) return null;

  const title = leg?.articleTitle ?? idx?.title ?? `Madde ${no}`;
  const statuteText = leg && !OUTDATED_STATUTE_TEXT.has(no) ? leg.originalStatuteSnippet : undefined;
  const plainSummary = OUTDATED_STATUTE_TEXT.has(no)
    ? idx?.directSnippetAnswer ?? leg?.plainLanguageSummary ?? ''
    : leg?.plainLanguageSummary ?? idx?.summary ?? '';
  const practicalNote = idx?.directSnippetAnswer && idx.directSnippetAnswer !== plainSummary ? idx.directSnippetAnswer : undefined;

  const legislationLd = {
    '@context': 'https://schema.org',
    '@type': 'Legislation',
    name: `634 Sayılı Kat Mülkiyeti Kanunu Madde ${no} — ${title}`,
    alternateName: [`KMK ${no}`, `KMK Madde ${no}`, `Kat Mülkiyeti Kanunu ${no}. Madde`],
    legislationIdentifier: `634/${no}`,
    legislationJurisdiction: { '@type': 'Country', name: 'Türkiye' },
    inLanguage: 'tr',
    url: KMK_OFFICIAL_URL,
    isPartOf: {
      '@type': 'Legislation',
      name: '634 Sayılı Kat Mülkiyeti Kanunu',
      legislationIdentifier: '634',
      url: KMK_OFFICIAL_URL,
    },
    abstract: plainSummary,
  };

  return { articleNo: no, title, statuteText, plainSummary, practicalNote, officialUrl: KMK_OFFICIAL_URL, legislationLd };
}

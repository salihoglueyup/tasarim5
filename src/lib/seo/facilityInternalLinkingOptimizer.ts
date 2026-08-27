import { BASE_URL } from '@/lib/seo';

export interface InjectedLinkRecord {
  keyword: string;
  targetUrl: string;
  anchorText: string;
  position: number;
}

export interface InternalLinkingResult {
  enrichedHtml: string;
  injectedLinksCount: number;
  injectedLinks: InjectedLinkRecord[];
}

export const FACILITY_LINKING_TARGETS: Array<{
  keyword: string;
  targetPath: string;
  priority: number;
}> = [
  { keyword: 'tesis ve mülk hizmetleri', targetPath: '/hizmetler/tesis-yonetimi', priority: 100 },
  { keyword: 'tesis ve mülk yönetimi', targetPath: '/hizmetler/tesis-yonetimi', priority: 95 },
  { keyword: 'entegre tesis yönetimi', targetPath: '/hizmetler/tesis-yonetimi', priority: 90 },
  { keyword: 'profesyonel tesis yönetimi', targetPath: '/hizmetler/tesis-yonetimi', priority: 90 },
  { keyword: 'tesis yönetimi', targetPath: '/hizmetler/tesis-yonetimi', priority: 85 },
  { keyword: 'mülk yönetimi', targetPath: '/hizmetler/tesis-yonetimi', priority: 85 },
  { keyword: 'rezidans ve lüks site yönetimi', targetPath: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', priority: 80 },
  { keyword: 'rezidans yönetimi', targetPath: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', priority: 80 },
  { keyword: 'plaza ve ofis binası yönetimi', targetPath: '/hizmetler/tesis-yonetimi/plaza-yonetimi', priority: 80 },
  { keyword: 'plaza yönetimi', targetPath: '/hizmetler/tesis-yonetimi/plaza-yonetimi', priority: 75 },
  { keyword: 'toplu konut ve site yönetimi', targetPath: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', priority: 80 },
  { keyword: 'toplu konut yönetimi', targetPath: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', priority: 75 },
  { keyword: 'sanayi tesisi ve fabrika yönetimi', targetPath: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', priority: 80 },
  { keyword: 'sanayi tesisi yönetimi', targetPath: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', priority: 75 },
  { keyword: 'tesis yönetimi seçim rehberi', targetPath: '/hizmetler/tesis-yonetimi/rehber', priority: 70 },
];

/**
 * Tesis ve Mülk Hizmetleri Dinamik İç Linkleme & Anchor Text Optimize Motoru.
 * 
 * Verilen HTML veya metin bloklarındaki anahtar kelimeleri bağlamsal olarak analiz edip,
 * arama motorlarına en yüksek PageRank ve topikal alaka sinyali aktaran iç bağlantıları ekler.
 */
export function optimizeInternalFacilityLinks(
  rawContent: string,
  currentPath: string = '/',
  maxLinks: number = 5,
  lang = 'tr'
): InternalLinkingResult {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const cleanCurrentPath = currentPath.replace(new RegExp(`^/${lang}`), '') || '/';
  const injectedLinks: InjectedLinkRecord[] = [];

  // Hedefleri kelime uzunluğuna ve önceliğe göre sırala
  const sortedTargets = [...FACILITY_LINKING_TARGETS]
    .filter((t) => t.targetPath !== cleanCurrentPath)
    .sort((a, b) => b.keyword.length - a.keyword.length || b.priority - a.priority);

  let enrichedHtml = rawContent;
  let linksInserted = 0;
  const usedKeywords = new Set<string>();

  for (const target of sortedTargets) {
    if (linksInserted >= maxLinks) break;
    if (usedKeywords.has(target.keyword)) continue;

    const fullUrl = `${langPrefix}${target.targetPath}`;
    const regex = new RegExp(`(?<!<a[^>]*>)(?<!<h[1-6][^>]*>)(\\b${escapeRegex(target.keyword)}\\b)(?![^<]*<\\/a>)(?![^<]*<\\/h[1-6]>)`, 'i');

    const match = regex.exec(enrichedHtml);
    if (match && match.index !== undefined) {
      const originalMatchedText = match[0];
      const linkTag = `<a href="${fullUrl}" class="text-[var(--color-primary)] font-medium underline underline-offset-4 hover:text-blue-700 transition-colors" title="${originalMatchedText} — Alo Yönetim">${originalMatchedText}</a>`;

      enrichedHtml =
        enrichedHtml.substring(0, match.index) +
        linkTag +
        enrichedHtml.substring(match.index + originalMatchedText.length);

      injectedLinks.push({
        keyword: target.keyword,
        targetUrl: fullUrl,
        anchorText: originalMatchedText,
        position: match.index,
      });

      usedKeywords.add(target.keyword);
      linksInserted++;
    }
  }

  return {
    enrichedHtml,
    injectedLinksCount: injectedLinks.length,
    injectedLinks,
  };
}

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

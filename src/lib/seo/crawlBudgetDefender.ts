export interface CrawlBudgetAnalysis {
  isCleanUrl: boolean;
  hasTrackingParams: boolean;
  hasFilterOrSortParams: boolean;
  shouldNoindex: boolean;
  detectedBadParams: string[];
  cleanCanonicalPath: string;
}

const TRACKING_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
  'gclsrc',
  'dclid',
  'msclkid',
  'yclid',
  'ttclid',
  'ref',
  'source',
  'campaign',
  'affiliate',
]);

const FILTER_SORT_PARAMS = new Set([
  'sort',
  'order',
  'dir',
  'filter',
  'view',
  'limit',
  'offset',
  'cursor',
]);

/**
 * URL sorgu parametrelerini analiz ederek arama botlarının tarama bütçesini (Crawl Budget)
 * tüketip tüketmediğini denetler.
 */
export function analyzeCrawlBudget(urlOrSearchParams: string | URLSearchParams): CrawlBudgetAnalysis {
  let params: URLSearchParams;
  let pathname = '/';

  if (typeof urlOrSearchParams === 'string') {
    try {
      const parsed = new URL(urlOrSearchParams, 'https://aloyonetim.com.tr');
      params = parsed.searchParams;
      pathname = parsed.pathname;
    } catch {
      params = new URLSearchParams(urlOrSearchParams.includes('?') ? urlOrSearchParams.split('?')[1] : urlOrSearchParams);
    }
  } else {
    params = urlOrSearchParams;
  }

  const detectedBadParams: string[] = [];
  let hasTrackingParams = false;
  let hasFilterOrSortParams = false;

  for (const key of params.keys()) {
    const lowerKey = key.toLowerCase();
    if (TRACKING_PARAMS.has(lowerKey)) {
      hasTrackingParams = true;
      detectedBadParams.push(key);
    }
    if (FILTER_SORT_PARAMS.has(lowerKey)) {
      hasFilterOrSortParams = true;
      detectedBadParams.push(key);
    }
  }

  const isCleanUrl = detectedBadParams.length === 0;
  const shouldNoindex = hasTrackingParams || (hasFilterOrSortParams && params.get('page') !== '1');

  return {
    isCleanUrl,
    hasTrackingParams,
    hasFilterOrSortParams,
    shouldNoindex,
    detectedBadParams,
    cleanCanonicalPath: pathname,
  };
}

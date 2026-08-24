export interface EtagEvaluationResult {
  isNotModified: boolean;
  etag: string;
  headers: Record<string, string>;
}

/**
 * Verilen girdi için deterministik bir hash ve zayıf (weak) ETag üretir.
 */
export function generateEtag(payload: unknown, extraSeed: string = 'v1'): string {
  const content = typeof payload === 'string' ? payload : JSON.stringify(payload);
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = (hash * 33) ^ content.charCodeAt(i);
  }
  const cleanHash = (hash >>> 0).toString(16);
  return `W/"alo-${extraSeed}-${cleanHash}"`;
}

/**
 * İstemcinin gönderdiği If-None-Match başlığını inceleyerek 304 Not Modified
 * gerekip gerekmediğini değerlendirir.
 */
export function evaluateConditionalGet(
  ifNoneMatchHeader: string | null | undefined,
  currentEtag: string
): EtagEvaluationResult {
  const normalizedCurrent = currentEtag.trim();
  const incoming = (ifNoneMatchHeader || '').trim();

  let isNotModified = false;
  if (incoming) {
    if (incoming === '*' || incoming === normalizedCurrent) {
      isNotModified = true;
    } else {
      // Zayıf etiket eşleşmesi (W/ prefix toleransı)
      const stripW = (tag: string) => tag.replace(/^W\//, '');
      if (stripW(incoming) === stripW(normalizedCurrent)) {
        isNotModified = true;
      }
    }
  }

  return {
    isNotModified,
    etag: normalizedCurrent,
    headers: {
      'ETag': normalizedCurrent,
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  };
}

/**
 * Güvenli ve Memoized JSON / Tag Ayrıştırıcı (Faz 11 - Veri Katmanı Optimizasyonu).
 *
 * Tekrarlanan JSON.parse / JSON.stringify döngülerini önbellekleyerek
 * CPU ve bellek tahsisini (allocation) minimuma indirir.
 */

const TAG_PARSE_CACHE = new Map<string, string[]>();
const JSON_PARSE_CACHE = new Map<string, any>();
const MAX_CACHE_SIZE = 500;

/**
 * String veya string[] olarak gelen etiketleri (tags) sıfır maliyetle temiz bir string[] dizisine dönüştürür.
 * In-memory önbellek sayesinde aynı etiket dizisi defalarca parse edilmez.
 */
export function parseTags(rawTags: unknown): string[] {
  if (!rawTags) return [];
  if (Array.isArray(rawTags)) return rawTags.map(String);

  if (typeof rawTags === 'string') {
    const trimmed = rawTags.trim();
    if (!trimmed) return [];

    if (TAG_PARSE_CACHE.has(trimmed)) {
      return TAG_PARSE_CACHE.get(trimmed)!;
    }

    let result: string[] = [];
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          result = parsed.map(String);
        }
      } catch {
        result = trimmed.split(',').map((s) => s.trim()).filter(Boolean);
      }
    } else {
      result = trimmed.split(',').map((s) => s.trim()).filter(Boolean);
    }

    if (TAG_PARSE_CACHE.size >= MAX_CACHE_SIZE) {
      const oldestKey = TAG_PARSE_CACHE.keys().next().value;
      if (oldestKey) TAG_PARSE_CACHE.delete(oldestKey);
    }
    TAG_PARSE_CACHE.set(trimmed, result);
    return result;
  }

  return [];
}

/**
 * Generic memoized JSON.parse fonksiyonu.
 */
export function safeJsonParse<T>(raw: unknown, fallback: T): T {
  if (raw === null || raw === undefined) return fallback;
  if (typeof raw !== 'string') return raw as T;

  const trimmed = raw.trim();
  if (!trimmed) return fallback;

  if (JSON_PARSE_CACHE.has(trimmed)) {
    return JSON_PARSE_CACHE.get(trimmed) as T;
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (JSON_PARSE_CACHE.size >= MAX_CACHE_SIZE) {
      const oldestKey = JSON_PARSE_CACHE.keys().next().value;
      if (oldestKey) JSON_PARSE_CACHE.delete(oldestKey);
    }
    JSON_PARSE_CACHE.set(trimmed, parsed);
    return parsed as T;
  } catch {
    return fallback;
  }
}

/**
 * Testler ve bellek temizliği için önbellekleri sıfırlar.
 */
export function clearJsonParseCache(): void {
  TAG_PARSE_CACHE.clear();
  JSON_PARSE_CACHE.clear();
}

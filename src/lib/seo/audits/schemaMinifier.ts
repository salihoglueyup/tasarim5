/**
 * JSON-LD nesnelerindeki null, undefined ve boş string değerleri özyinelemeli (recursively) temizler.
 */
export function cleanJsonLd(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input
      .map((item) => cleanJsonLd(item))
      .filter((item) => {
        if (item === null || item === undefined || item === '') return false;
        if (typeof item === 'object' && !Array.isArray(item) && Object.keys(item).length === 0) return false;
        return true;
      });
  }

  if (input !== null && typeof input === 'object') {
    const obj = input as Record<string, unknown>;

    // GSC ItemList guard: eğer @type === 'ItemList' ise ve itemListElement boş/geçersizse tüm node'u ele
    if (obj['@type'] === 'ItemList') {
      const listElem = obj.itemListElement;
      if (!Array.isArray(listElem) || listElem.length === 0) {
        return null;
      }
    }

    const cleanedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined && value !== '') {
        const cleanedValue = cleanJsonLd(value);
        if (cleanedValue !== null && cleanedValue !== undefined && cleanedValue !== '') {
          cleanedObj[key] = cleanedValue;
        }
      }
    }

    // Temizlik sonrası ItemList'in itemListElement'i boşaldıysa node'u ele
    if (cleanedObj['@type'] === 'ItemList') {
      const listElem = cleanedObj.itemListElement;
      if (!Array.isArray(listElem) || listElem.length === 0) {
        return null;
      }
    }

    // Obje tamamen boş kaldıysa null döndür
    if (Object.keys(cleanedObj).length === 0) {
      return null;
    }

    return cleanedObj;
  }

  return input;
}

/**
 * JSON-LD şemasını temizler ve HTML içine enjekte edilmek üzere tek satırlık
 * ultra kompakt formata dönüştürür. HTML parser güvenliği için < karakterini \u003c ile maskeler.
 */
export function minifyJsonLd(schema: unknown): string {
  const cleaned = cleanJsonLd(schema);
  return JSON.stringify(cleaned)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');
}

/**
 * Sıkıştırma neticesinde elde edilen bayt tasarrufunu hesaplar.
 */
export function calculateSchemaCompressionSavings(originalJson: string, minifiedJson: string): {
  originalBytes: number;
  minifiedBytes: number;
  savedBytes: number;
  savingsPercentage: number;
} {
  const originalBytes = new TextEncoder().encode(originalJson).length;
  const minifiedBytes = new TextEncoder().encode(minifiedJson).length;
  const savedBytes = Math.max(0, originalBytes - minifiedBytes);
  const savingsPercentage = originalBytes > 0 ? Math.round((savedBytes / originalBytes) * 100) : 0;

  return {
    originalBytes,
    minifiedBytes,
    savedBytes,
    savingsPercentage,
  };
}

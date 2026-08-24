/**
 * JSON-LD nesnelerindeki null, undefined ve boş string değerleri özyinelemeli (recursively) temizler.
 */
export function cleanJsonLd(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input
      .map((item) => cleanJsonLd(item))
      .filter((item) => item !== null && item !== undefined && item !== '');
  }

  if (input !== null && typeof input === 'object') {
    const cleanedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
      if (value !== null && value !== undefined && value !== '') {
        const cleanedValue = cleanJsonLd(value);
        if (cleanedValue !== null && cleanedValue !== undefined && cleanedValue !== '') {
          cleanedObj[key] = cleanedValue;
        }
      }
    }
    return cleanedObj;
  }

  return input;
}

/**
 * JSON-LD şemasını temizler ve HTML içine enjekte edilmek üzere tek satırlık
 * ultra kompakt formata dönüştürür.
 */
export function minifyJsonLd(schema: unknown): string {
  const cleaned = cleanJsonLd(schema);
  return JSON.stringify(cleaned);
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

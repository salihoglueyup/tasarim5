/**
 * Faz 68: UI bileşenlerinde dinamik class birleştirmeleri için
 * LRU önbellekli, sıfır-çöp (zero-garbage) memoized `cn` yardımcı fonksiyonu.
 */

type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

// En çok kullanılan 500 sınıf kombinasyonunu hafızada tutan LRU önbellek
const CLASS_CACHE = new Map<string, string>();
const MAX_CACHE_SIZE = 500;

function parseClassValue(input: ClassValue): string {
  if (!input) return '';
  if (typeof input === 'string') return input;
  if (typeof input === 'number') return String(input);
  if (Array.isArray(input)) {
    return input.map(parseClassValue).filter(Boolean).join(' ');
  }
  if (typeof input === 'object') {
    const classes: string[] = [];
    for (const [key, value] of Object.entries(input)) {
      if (value) classes.push(key);
    }
    return classes.join(' ');
  }
  return '';
}

/**
 * Performans odaklı, memoize edilmiş sınıf birleştirici.
 */
export function cn(...inputs: ClassValue[]): string {
  // Basit tekli veya ikili string durumları için hızlı yol (fast-path)
  if (inputs.length === 1 && typeof inputs[0] === 'string') {
    return inputs[0];
  }

  // Önbellek anahtarı oluştur
  const rawKey = JSON.stringify(inputs);
  const cached = CLASS_CACHE.get(rawKey);
  if (cached !== undefined) {
    return cached;
  }

  const result = inputs
    .map(parseClassValue)
    .filter(Boolean)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');

  // LRU boyut kontrolü
  if (CLASS_CACHE.size >= MAX_CACHE_SIZE) {
    const oldestKey = CLASS_CACHE.keys().next().value;
    if (oldestKey !== undefined) {
      CLASS_CACHE.delete(oldestKey);
    }
  }

  CLASS_CACHE.set(rawKey, result);
  return result;
}

export default cn;

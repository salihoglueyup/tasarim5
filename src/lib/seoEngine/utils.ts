export const CTR_TRIGGER_WORDS = [
  'profesyonel',
  'istanbul',
  '7/24',
  'ücretsiz keşif',
  'kmk 634',
  'şeffaf',
  'fiyatları',
  'teklif',
  'yönetimi',
  'hizmetleri',
  'güvenlik',
  'temizlik',
  'bakım',
];

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizeText(text: string): string {
  return (text || '')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

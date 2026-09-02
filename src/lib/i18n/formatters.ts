/**
 * Faz 161 & Faz 162: Çok Dilli Sayı, Para Birimi ve Tarih Yerelleştirme Motoru
 * (Intl.NumberFormat & Intl.DateTimeFormat)
 */

const LOCALE_TAG_MAP: Record<string, string> = {
  tr: 'tr-TR',
  en: 'en-US',
  ru: 'ru-RU',
  ar: 'ar-SA',
};

function resolveLocaleTag(lang: string = 'tr'): string {
  return LOCALE_TAG_MAP[lang.toLowerCase()] || 'tr-TR';
}

/**
 * Faz 161: Para Birimi Formatlayıcı
 * @example formatCurrency(15000, 'tr') -> "₺15.000" veya "15.000 ₺"
 * @example formatCurrency(15000, 'en', 'USD') -> "$15,000.00"
 */
export function formatCurrency(
  amount: number,
  lang: string = 'tr',
  currency: string = 'TRY',
  maximumFractionDigits: number = 0
): string {
  const tag = resolveLocaleTag(lang);
  try {
    return new Intl.NumberFormat(tag, {
      style: 'currency',
      currency,
      maximumFractionDigits,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

/**
 * Faz 161: Sayı Formatlayıcı
 */
export function formatNumber(
  value: number,
  lang: string = 'tr',
  options?: Intl.NumberFormatOptions
): string {
  const tag = resolveLocaleTag(lang);
  try {
    return new Intl.NumberFormat(tag, options).format(value);
  } catch {
    return String(value);
  }
}

/**
 * Faz 161: Yüzde Formatlayıcı (Tasarruf ve Tahsilat Oranları)
 * @example formatPercent(0.30, 'tr') -> "%30"
 * @example formatPercent(0.30, 'en') -> "30%"
 */
export function formatPercent(
  ratio: number,
  lang: string = 'tr',
  maximumFractionDigits: number = 1
): string {
  const tag = resolveLocaleTag(lang);
  try {
    return new Intl.NumberFormat(tag, {
      style: 'percent',
      maximumFractionDigits,
    }).format(ratio);
  } catch {
    return `${Math.round(ratio * 100)}%`;
  }
}

/**
 * Faz 162: Tarih Formatlayıcı
 * @example formatDate(new Date(), 'tr', 'long') -> "2 Eylül 2026"
 * @example formatDate(new Date(), 'en', 'long') -> "September 2, 2026"
 */
export function formatDate(
  dateInput: Date | string | number,
  lang: string = 'tr',
  style: 'short' | 'medium' | 'long' = 'medium'
): string {
  const tag = resolveLocaleTag(lang);
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) return '';

  const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: 'numeric', month: 'numeric', year: 'numeric' },
    medium: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
  };

  try {
    return new Intl.DateTimeFormat(tag, optionsMap[style] || optionsMap.medium).format(date);
  } catch {
    return date.toISOString().split('T')[0];
  }
}

/**
 * Faz 162: Göreceli Zaman Formatlayıcı (Örn: "3 gün önce", "2 hours ago")
 */
export function formatRelativeTime(
  dateInput: Date | string | number,
  lang: string = 'tr',
  numeric: 'auto' | 'always' = 'always'
): string {
  const tag = resolveLocaleTag(lang);
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const diffMs = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  try {
    const rtf = new Intl.RelativeTimeFormat(tag, { numeric });
    if (Math.abs(diffDay) >= 1) return rtf.format(diffDay, 'day');
    if (Math.abs(diffHour) >= 1) return rtf.format(diffHour, 'hour');
    if (Math.abs(diffMin) >= 1) return rtf.format(diffMin, 'minute');
    return rtf.format(diffSec, 'second');
  } catch {
    return formatDate(date, lang, 'medium');
  }
}

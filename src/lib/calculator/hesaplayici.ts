/**
 * Aidat paylaşım hesaplayıcısı — saf fonksiyon (test edilebilir).
 *
 * Piyasa ortalaması, birim fiyat veya tasarruf tahmini İÇERMEZ: kullanıcı kendi aylık gider
 * bütçesini girer, araç yalnızca Kat Mülkiyeti Kanunu'ndaki paylaşım kuralını uygular:
 *  - eşit paylaşım: bütçe / bağımsız bölüm sayısı,
 *  - arsa payına göre: bütçe x (bağımsız bölümün arsa payı / toplam arsa payı).
 * Yönetim planı farklı bir yöntem öngörebilir; sonuçlar bilgilendirme amaçlıdır.
 */

export type ShareMethod = 'equal' | 'land';

export interface ShareInput {
  /** Kullanıcının girdiği aylık toplam gider bütçesi (₺). */
  monthlyBudget: number;
  method: ShareMethod;
  /** Toplam bağımsız bölüm sayısı (eşit paylaşım için). */
  units: number;
  /** Bağımsız bölümün arsa payı (pay). */
  landShareNumerator: number;
  /** Toplam arsa payı (payda). */
  landShareDenominator: number;
}

export interface ShareResult {
  /** Bu bağımsız bölümün aylık payı (₺). */
  monthlyShare: number;
  /** Bu bağımsız bölümün yıllık payı (₺). */
  annualShare: number;
  /** Pay oranı (0-1). */
  ratio: number;
  /** Girdiler hesaplanabilir durumda mı? */
  valid: boolean;
}

const EMPTY: ShareResult = { monthlyShare: 0, annualShare: 0, ratio: 0, valid: false };

export function calculateShare(input: ShareInput): ShareResult {
  const { monthlyBudget, method, units, landShareNumerator, landShareDenominator } = input;
  if (!(monthlyBudget > 0)) return EMPTY;

  let ratio = 0;
  if (method === 'equal') {
    if (!(units >= 1)) return EMPTY;
    ratio = 1 / Math.floor(units);
  } else {
    if (!(landShareNumerator > 0) || !(landShareDenominator > 0) || landShareNumerator > landShareDenominator) return EMPTY;
    ratio = landShareNumerator / landShareDenominator;
  }

  const monthlyShare = Math.round(monthlyBudget * ratio * 100) / 100;
  return { monthlyShare, annualShare: Math.round(monthlyShare * 12 * 100) / 100, ratio, valid: true };
}

const LOCALES: Record<string, string> = { tr: 'tr-TR', en: 'en-US', ru: 'ru-RU', ar: 'ar-SA' };

/** Para biçimi: tr "₺1.234,50", diğer diller "1,234.50 ₺". */
export function formatTry(amount: number, lang: string = 'tr'): string {
  const text = amount.toLocaleString(LOCALES[lang] ?? 'tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return lang === 'tr' ? `₺${text}` : `${text} ₺`;
}

/** Oran biçimi: yüzde, en fazla 4 ondalık. */
export function formatRatio(ratio: number, lang: string = 'tr'): string {
  return `%${(ratio * 100).toLocaleString(LOCALES[lang] ?? 'tr-TR', { maximumFractionDigits: 4 })}`;
}

export const MAX_FIRST_LOAD_JS_KB = 180; // 180 KB bütçe sınırı (Faz 232)

export interface BundleBudgetReport {
  maxBudgetKb: number;
  actualKb: number;
  passed: boolean;
  differenceKb: number;
  message: string;
}

/**
 * Faz 232: Next.js Bundle Boyutu Bütçesi Denetleyicisi (Bundle Size Budget)
 * First Load JS boyutunun 180 KB sınırını aşmadığını doğrular.
 */
export function verifyBundleBudget(actualSizeKb: number): BundleBudgetReport {
  const passed = actualSizeKb <= MAX_FIRST_LOAD_JS_KB;
  const differenceKb = Math.round(Math.abs(actualSizeKb - MAX_FIRST_LOAD_JS_KB) * 100) / 100;

  let message: string;
  if (passed) {
    message = `Başarılı: Bundle boyutu (${actualSizeKb} KB) bütçe sınırının (${MAX_FIRST_LOAD_JS_KB} KB) altında. Kalan pay: ${differenceKb} KB.`;
  } else {
    message = `Uyarı / Hata: Bundle boyutu (${actualSizeKb} KB) bütçe sınırını (${MAX_FIRST_LOAD_JS_KB} KB) ${differenceKb} KB aştı!`;
  }

  return {
    maxBudgetKb: MAX_FIRST_LOAD_JS_KB,
    actualKb: actualSizeKb,
    passed,
    differenceKb,
    message,
  };
}

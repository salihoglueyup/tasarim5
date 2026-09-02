export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface ContrastResult {
  ratio: number;
  ratioFormatted: string;
  passesAaNormalText: boolean;
  passesAaLargeText: boolean;
  passesAaaNormalText: boolean;
}

/**
 * Hex rengi RGB nesnesine dönüştürür (#ffffff veya #fff)
 */
export function hexToRgb(hex: string): RgbColor {
  let cleaned = hex.replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * WCAG 2.1 Bağıl Parlaklık (Relative Luminance) Hesabı
 */
export function getRelativeLuminance(rgb: RgbColor): number {
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Faz 209: WCAG 2.1 AA Renk Kontrast Oranı Hesaplayıcısı ve Doğrulayıcısı
 * - Normal metin için asgari 4.5:1 oran aranır.
 * - Büyük metin (18pt+ veya 14pt+ bold) için asgari 3:1 oran aranır.
 */
export function calculateContrastRatio(hexColor1: string, hexColor2: string): ContrastResult {
  const lum1 = getRelativeLuminance(hexToRgb(hexColor1));
  const lum2 = getRelativeLuminance(hexToRgb(hexColor2));

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const roundedRatio = Math.round(ratio * 100) / 100;

  return {
    ratio: roundedRatio,
    ratioFormatted: `${roundedRatio}:1`,
    passesAaNormalText: roundedRatio >= 4.5,
    passesAaLargeText: roundedRatio >= 3.0,
    passesAaaNormalText: roundedRatio >= 7.0,
  };
}

export const MIN_TOUCH_TARGET_SIZE = 44; // 44x44 CSS px (WCAG 2.5.5)

export interface TouchTargetReport {
  width: number;
  height: number;
  area: number;
  valid: boolean;
  meetsWcag255: boolean;
  error?: string;
}

/**
 * Faz 215: Mobil Dokunmatik Hedef Boyutu Denetleyicisi (WCAG 2.5.5 Target Size)
 * Mobil cihazlarda buton ve dokunmatik elemanların en az 44x44 CSS pikseli olmasını garantiler.
 */
export function validateTouchTarget(width: number, height: number): TouchTargetReport {
  const valid = width >= MIN_TOUCH_TARGET_SIZE && height >= MIN_TOUCH_TARGET_SIZE;

  return {
    width,
    height,
    area: width * height,
    valid,
    meetsWcag255: valid,
    error: valid
      ? undefined
      : `Dokunmatik hedef boyutu yetersiz: ${width}x${height}px. Asgari ${MIN_TOUCH_TARGET_SIZE}x${MIN_TOUCH_TARGET_SIZE}px olmalıdır.`,
  };
}

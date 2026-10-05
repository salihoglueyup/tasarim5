/** KMK m.20/2: gecikilen süre için aylık %5 gecikme tazminatı (basit hesap, bilgilendirme amaçlı). */
export const KMK_LATE_COMPENSATION_MONTHLY_RATE = 0.05;

export function lateCompensation(debt: number, months: number) {
  if (!Number.isFinite(debt) || debt < 0 || !Number.isFinite(months) || months < 0) return null;
  const compensation = Math.round(debt * KMK_LATE_COMPENSATION_MONTHLY_RATE * months * 100) / 100;
  return { compensation, total: Math.round((debt + compensation) * 100) / 100 };
}

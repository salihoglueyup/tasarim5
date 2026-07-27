/**
 * Aidat tahmin motoru — saf fonksiyon (test edilebilir).
 * hesaplayici/page.tsx içindeki hesap mantığı buraya çıkarıldı; UI yalnız
 * bu fonksiyonu çağırır. Böylece Vitest ile birim testi yapılabilir (Track 3).
 */

export interface CalcInput {
  units: number;
  elevators: number;
  hasSecurity: boolean;
  hasPool: boolean;
  hasGreenSpace: boolean;
}

export interface CalcResult {
  /** Bağımsız bölüm başına aylık tahmini aidat (₺). */
  estimatedDuesPerUnit: number;
  /** Toplam aylık bütçe (₺). */
  totalMonthlyBudget: number;
  /** Profesyonel yönetimle tahmini aylık tasarruf (₺, ~%22). */
  estimatedSavings: number;
}

const BASE_COST_PER_UNIT = 350;
const SECURITY_ADDON = 450;
const POOL_ADDON = 180;
const GREEN_ADDON = 120;
const ELEVATOR_ADDON = 40; // asansör başına
const SAVINGS_RATE = 0.22;

export function calculateDues(input: CalcInput): CalcResult {
  const { units, elevators, hasSecurity, hasPool, hasGreenSpace } = input;

  const securityAddon = hasSecurity ? SECURITY_ADDON : 0;
  const poolAddon = hasPool ? POOL_ADDON : 0;
  const greenAddon = hasGreenSpace ? GREEN_ADDON : 0;
  const elevatorAddon = elevators * ELEVATOR_ADDON;

  const estimatedDuesPerUnit = Math.round(
    BASE_COST_PER_UNIT + securityAddon + poolAddon + greenAddon + elevatorAddon / Math.max(units, 1)
  );
  const totalMonthlyBudget = estimatedDuesPerUnit * units;
  const estimatedSavings = Math.round(totalMonthlyBudget * SAVINGS_RATE);

  return { estimatedDuesPerUnit, totalMonthlyBudget, estimatedSavings };
}

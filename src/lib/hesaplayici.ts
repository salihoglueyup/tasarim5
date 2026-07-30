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

export interface CalcConfig {
  baseCostPerUnit: number;
  securityAddon: number;
  poolAddon: number;
  greenAddon: number;
  elevatorAddon: number;
  savingsRate: number;
}

export interface CalcResult {
  /** Bağımsız bölüm başına aylık tahmini aidat (₺). */
  estimatedDuesPerUnit: number;
  /** Toplam aylık bütçe (₺). */
  totalMonthlyBudget: number;
  /** Profesyonel yönetimle tahmini aylık tasarruf (₺, ~%22). */
  estimatedSavings: number;
}

// Fallback default config in case DB is empty
export const defaultCalcConfig: CalcConfig = {
  baseCostPerUnit: 350,
  securityAddon: 450,
  poolAddon: 180,
  greenAddon: 120,
  elevatorAddon: 40,
  savingsRate: 0.22
};

export function calculateDues(input: CalcInput, config: CalcConfig = defaultCalcConfig): CalcResult {
  const { units, elevators, hasSecurity, hasPool, hasGreenSpace } = input;

  const securityAddon = hasSecurity ? config.securityAddon : 0;
  const poolAddon = hasPool ? config.poolAddon : 0;
  const greenAddon = hasGreenSpace ? config.greenAddon : 0;
  const elevatorAddon = elevators * config.elevatorAddon;

  const estimatedDuesPerUnit = Math.round(
    config.baseCostPerUnit + securityAddon + poolAddon + greenAddon + elevatorAddon / Math.max(units, 1)
  );
  const totalMonthlyBudget = estimatedDuesPerUnit * units;
  const estimatedSavings = Math.round(totalMonthlyBudget * config.savingsRate);

  return { estimatedDuesPerUnit, totalMonthlyBudget, estimatedSavings };
}

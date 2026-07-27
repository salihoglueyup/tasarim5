import { describe, it, expect } from 'vitest';
import { calculateDues } from './hesaplayici';

describe('calculateDues', () => {
  it('tüm eklentiler açıkken doğru hesaplar', () => {
    // base 350 + sec 450 + pool 180 + green 120 + (6*40)/45 = 1100 + 5.33 -> 1105
    const r = calculateDues({ units: 45, elevators: 6, hasSecurity: true, hasPool: true, hasGreenSpace: true });
    expect(r.estimatedDuesPerUnit).toBe(1105);
    expect(r.totalMonthlyBudget).toBe(1105 * 45);
    expect(r.estimatedSavings).toBe(Math.round(1105 * 45 * 0.22));
  });

  it('eklentiler kapalıyken yalnız taban + asansör', () => {
    // 350 + (10*40)/100 = 350 + 4 = 354
    const r = calculateDues({ units: 100, elevators: 10, hasSecurity: false, hasPool: false, hasGreenSpace: false });
    expect(r.estimatedDuesPerUnit).toBe(354);
  });

  it('units 0 iken sıfıra bölmez (Math.max ile korunur)', () => {
    const r = calculateDues({ units: 0, elevators: 5, hasSecurity: false, hasPool: false, hasGreenSpace: false });
    expect(Number.isFinite(r.estimatedDuesPerUnit)).toBe(true);
    expect(r.totalMonthlyBudget).toBe(0);
  });

  it('tasarruf toplam bütçenin ~%22si', () => {
    const r = calculateDues({ units: 50, elevators: 4, hasSecurity: true, hasPool: false, hasGreenSpace: true });
    expect(r.estimatedSavings).toBe(Math.round(r.totalMonthlyBudget * 0.22));
  });
});

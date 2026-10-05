import { describe, it, expect } from 'vitest';
import { revaluationCap, checkProposedAmount, KMK_AMENDMENT_2026 } from './kmkAmendment2026';

describe('7579 sayılı Kanun: yeniden değerleme tavanı hesabı', () => {
  it('mevcut tutarı yeniden değerleme oranıyla çarpar', () => {
    const r = revaluationCap(1000, 25.49)!;
    expect(r.maxAmount).toBe(1254.9);
    expect(r.maxIncrease).toBe(254.9);
  });

  it('sıfır oran ve sıfır tutarda sorunsuz çalışır', () => {
    expect(revaluationCap(1000, 0)!.maxAmount).toBe(1000);
    expect(revaluationCap(0, 25.49)!.maxAmount).toBe(0);
  });

  it('geçersiz girdilerde null döner', () => {
    expect(revaluationCap(-1, 25)).toBeNull();
    expect(revaluationCap(100, -5)).toBeNull();
    expect(revaluationCap(NaN, 25)).toBeNull();
  });

  it('önerilen tutarın tavanı aşıp aşmadığını bildirir', () => {
    const over = checkProposedAmount(1000, 1400, 25.49)!;
    expect(over.exceedsCap).toBe(true);
    expect(over.excess).toBe(145.1);
    expect(over.impliedIncreasePercent).toBe(40);

    const ok = checkProposedAmount(1000, 1254.9, 25.49)!;
    expect(ok.exceedsCap).toBe(false);
    expect(ok.excess).toBe(0);
  });

  it('kanun bilgileri Resmî Gazete künyesiyle tutarlıdır', () => {
    expect(KMK_AMENDMENT_2026.lawNumber).toBe(7579);
    expect(KMK_AMENDMENT_2026.gazetteNumber).toBe(33261);
    expect(KMK_AMENDMENT_2026.gazetteUrl).toContain('20260522');
    expect(KMK_AMENDMENT_2026.managementPlanQuorum.multiBuildingComplexes.fraction).toBe('2/3');
  });
});

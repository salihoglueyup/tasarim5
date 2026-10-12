import { describe, it, expect } from 'vitest';
import { calculateShare, formatTry } from './hesaplayici';

const base = { monthlyBudget: 100000, units: 50, landShareNumerator: 100, landShareDenominator: 10000 };

describe('calculateShare', () => {
  it('eşit paylaşımda bütçeyi bağımsız bölüm sayısına böler', () => {
    const r = calculateShare({ ...base, method: 'equal' });
    expect(r.valid).toBe(true);
    expect(r.monthlyShare).toBe(2000);
    expect(r.annualShare).toBe(24000);
    expect(r.ratio).toBeCloseTo(0.02);
  });

  it('arsa payına göre bütçeyi pay/payda oranıyla çarpar', () => {
    const r = calculateShare({ ...base, method: 'land' });
    expect(r.monthlyShare).toBe(1000);
    expect(r.ratio).toBeCloseTo(0.01);
  });

  it('geçersiz girdilerde sonuç üretmez', () => {
    expect(calculateShare({ ...base, method: 'equal', monthlyBudget: 0 }).valid).toBe(false);
    expect(calculateShare({ ...base, method: 'equal', units: 0 }).valid).toBe(false);
    expect(calculateShare({ ...base, method: 'land', landShareNumerator: 0 }).valid).toBe(false);
    expect(calculateShare({ ...base, method: 'land', landShareDenominator: 0 }).valid).toBe(false);
    expect(calculateShare({ ...base, method: 'land', landShareNumerator: 20000 }).valid).toBe(false);
  });

  it('piyasa ortalaması veya tasarruf alanı içermez', () => {
    const r = calculateShare({ ...base, method: 'equal' });
    expect(Object.keys(r).sort()).toEqual(['annualShare', 'monthlyShare', 'ratio', 'valid']);
  });
});

describe('formatTry', () => {
  it('Türkçe ve diğer dillerde para biçimi', () => {
    expect(formatTry(1234.5, 'tr')).toBe('₺1.234,50');
    expect(formatTry(1234.5, 'en')).toBe('1,234.50 ₺');
  });
});

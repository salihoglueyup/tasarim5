import { describe, it, expect } from 'vitest';
import { lateCompensation } from './lateCompensation';

describe('KMK m.20/2 gecikme tazminatı hesabı', () => {
  it('borç x %5 x ay olarak hesaplar', () => {
    expect(lateCompensation(50000, 6)).toEqual({ compensation: 15000, total: 65000 });
    expect(lateCompensation(10000, 1)).toEqual({ compensation: 500, total: 10500 });
  });
  it('sıfır aylık gecikmede tazminat yoktur', () => {
    expect(lateCompensation(10000, 0)).toEqual({ compensation: 0, total: 10000 });
  });
  it('geçersiz girdide null döner', () => {
    expect(lateCompensation(-1, 3)).toBeNull();
    expect(lateCompensation(100, NaN)).toBeNull();
  });
});

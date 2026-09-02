import { describe, it, expect } from 'vitest';
import {
  TERMS,
  slugToTerm,
  getTermsByLetter,
  getUnifiedDictionaryEntries,
  FACILITY_TERMS,
  KMK_LAW_INDEX,
} from './dictionary';

describe('Sözlük Mimarisi ve Birleşik Külliyat (dictionary.ts - Faz 22)', () => {
  it('TERMS, FACILITY_TERMS ve KMK_LAW_INDEX mühürlüdür (Object.isFrozen)', () => {
    expect(Object.isFrozen(TERMS)).toBe(true);
    expect(Object.isFrozen(FACILITY_TERMS)).toBe(true);
    expect(Object.isFrozen(KMK_LAW_INDEX)).toBe(true);
  });

  it('slugToTerm O(1) harita üzerinden terimi getirir', () => {
    const aidat = slugToTerm('aidat');
    expect(aidat).toBeDefined();
    expect(aidat?.term).toBe('Aidat');
  });

  it('getTermsByLetter harfe göre terimleri doğru gruplar', () => {
    const aTerms = getTermsByLetter('A');
    expect(aTerms.length).toBeGreaterThan(0);
    expect(aTerms.some((t) => t.term === 'Aidat')).toBe(true);
  });

  it('getUnifiedDictionaryEntries tüm terimleri, tesis standartlarını ve KMK maddelerini birleştirir', () => {
    const unified = getUnifiedDictionaryEntries();
    expect(unified.length).toBe(TERMS.length + FACILITY_TERMS.length + KMK_LAW_INDEX.length);

    const hasKmk = unified.some((u) => u.type === 'KMK_KANUN');
    const hasFacility = unified.some((u) => u.type === 'TESIS_STANDART');
    const hasBase = unified.some((u) => u.type === 'GENEL_TERIM');

    expect(hasKmk).toBe(true);
    expect(hasFacility).toBe(true);
    expect(hasBase).toBe(true);
  });
});

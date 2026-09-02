import { describe, it, expect, beforeEach } from 'vitest';
import { parseTags, safeJsonParse, clearJsonParseCache } from './jsonSafe';

describe('JSON ve Tag Memoized Ayrıştırıcı (jsonSafe.ts - Faz 11)', () => {
  beforeEach(() => {
    clearJsonParseCache();
  });

  it('parseTags string array girdiyi doğrudan string[] olarak döndürür', () => {
    const input = ['tesis', 'yönetimi', 'kmk'];
    expect(parseTags(input)).toEqual(['tesis', 'yönetimi', 'kmk']);
  });

  it('parseTags JSON string formatını parse eder ve önbellekten sunar', () => {
    const rawJson = '["güvenlik", "temizlik", "teknik"]';
    const firstCall = parseTags(rawJson);
    const secondCall = parseTags(rawJson);

    expect(firstCall).toEqual(['güvenlik', 'temizlik', 'teknik']);
    expect(secondCall).toBe(firstCall); // Aynı referans (önbellek)
  });

  it('parseTags virgülle ayrılmış düz metin formatını güvenle işler', () => {
    const raw = 'aidat, icra takibi, genel kurul';
    expect(parseTags(raw)).toEqual(['aidat', 'icra takibi', 'genel kurul']);
  });

  it('parseTags geçersiz veya boş girdilerde boş dizi döner', () => {
    expect(parseTags(null)).toEqual([]);
    expect(parseTags(undefined)).toEqual([]);
    expect(parseTags('')).toEqual([]);
    expect(parseTags(123)).toEqual([]);
  });

  it('safeJsonParse geçerli JSON stringlerini parse eder ve önbelleğe alır', () => {
    const jsonStr = '{"stat": "120+", "label": "Referans"}';
    const parsed1 = safeJsonParse(jsonStr, {});
    const parsed2 = safeJsonParse(jsonStr, {});

    expect(parsed1).toEqual({ stat: '120+', label: 'Referans' });
    expect(parsed2).toBe(parsed1);
  });

  it('safeJsonParse bozuk JSON girdilerinde fallback değerini döner', () => {
    const invalid = '{ broken json ';
    expect(safeJsonParse(invalid, { default: true })).toEqual({ default: true });
  });
});

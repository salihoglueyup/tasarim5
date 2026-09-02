import { describe, it, expect } from 'vitest';
import {
  DISTRICTS,
  DISTRICT_SLUGS,
  getDistrict,
  isValidDistrict,
  getDistrictGeo,
  getDistrictDemographics,
} from './districts';

describe('İlçe Veri Katmanı ve Seçici Projeksiyonlar (districts.ts - Faz 16)', () => {
  it('tüm 39 ilçeyi barındırır ve Object.isFrozen doğrulanır', () => {
    expect(DISTRICTS.length).toBe(39);
    expect(Object.isFrozen(DISTRICTS)).toBe(true);
    expect(DISTRICT_SLUGS.length).toBe(39);
  });

  it('getDistrict O(1) harita üzerinden ilçeyi hızlıca döndürür', () => {
    const kadikoy = getDistrict('kadikoy');
    expect(kadikoy).toBeDefined();
    expect(kadikoy?.name).toBe('Kadıköy');
    expect(isValidDistrict('kadikoy')).toBe(true);
    expect(isValidDistrict('olmayan-ilce')).toBe(false);
  });

  it('getDistrictGeo yalnızca koordinat nesnesini döndürür', () => {
    const geo = getDistrictGeo('kadikoy');
    expect(geo).toBeDefined();
    expect(geo?.lat).toBeCloseTo(40.98, 1);
    expect(geo?.lng).toBeCloseTo(29.03, 1);
  });

  it('getDistrictDemographics ağır içerik metinleri olmaksızın yalnızca demografi döner', () => {
    const demo = getDistrictDemographics('uskudar');
    expect(demo).toBeDefined();
    expect(demo?.name).toBe('Üsküdar');
    expect(demo?.side).toBe('Anadolu');
    expect(demo?.population).toBeGreaterThan(500000);
    expect(demo?.managedProjects).toBeGreaterThan(0);
    // Ağır mahalle/içerik alanları seçici projeksiyona dahil olmamalıdır
    expect((demo as any).neighborhoods).toBeUndefined();
    expect((demo as any).intro).toBeUndefined();
  });
});

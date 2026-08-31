import { describe, it, expect } from 'vitest';
import {
  EUROPEAN_SIDE_MATRIX,
  ANATOLIAN_SIDE_MATRIX,
  ALL_DISTRICTS_DUAL_CORE_MAP,
  getDistrictDualCore,
  getDistrictSiteKeywords,
  getDistrictFacilityKeywords,
  getDistrictPillarSerp,
  getTopDistrictsByPillar,
  getNeighborhoodLongTailKeywords,
} from './districtDualCoreMatrix';

describe('39 İlçe Çift Çekirdekli Mikro-Lokasyon Matrisi (districtDualCoreMatrix.test.ts)', () => {
  describe('1. Veri Yapısı ve İlçe Girişleri Bütünlüğü (Faz 56-94)', () => {
    it('Avrupa Yakası matrisinde en az 7 kritik odak ilçe bulunur', () => {
      const euroKeys = Object.keys(EUROPEAN_SIDE_MATRIX);
      expect(euroKeys.length).toBeGreaterThanOrEqual(7);
      expect(euroKeys).toContain('besiktas');
      expect(euroKeys).toContain('sariyer');
      expect(euroKeys).toContain('sisli');
      expect(euroKeys).toContain('bakirkoy');
      expect(euroKeys).toContain('basaksehir');
      expect(euroKeys).toContain('beylikduzu');
      expect(euroKeys).toContain('esenyurt');
    });

    it('Anadolu Yakası matrisinde en az 7 kritik odak ilçe bulunur', () => {
      const anatolianKeys = Object.keys(ANATOLIAN_SIDE_MATRIX);
      expect(anatolianKeys.length).toBeGreaterThanOrEqual(7);
      expect(anatolianKeys).toContain('kadikoy');
      expect(anatolianKeys).toContain('atasehir');
      expect(anatolianKeys).toContain('uskudar');
      expect(anatolianKeys).toContain('maltepe');
      expect(anatolianKeys).toContain('umraniye');
      expect(anatolianKeys).toContain('pendik');
      expect(anatolianKeys).toContain('tuzla');
    });

    it('Her ilçe kaydında zorunlu alanlar (siteCore, facilityCore, sharedKpis) eksiksizdir', () => {
      const kadikoy = ALL_DISTRICTS_DUAL_CORE_MAP['kadikoy'];
      expect(kadikoy).toBeDefined();
      expect(kadikoy.name).toBe('Kadıköy');
      expect(kadikoy.siteCore.keyNeighborhoods).toContain('Moda');
      expect(kadikoy.siteCore.keyNeighborhoods).toContain('Caddebostan');
      expect(kadikoy.facilityCore.commercialNeighborhoods).toContain('Kozyatağı');
      expect(kadikoy.sharedKpis.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('2. getDistrictDualCore ve Fallback Mekanizması (Faz 95)', () => {
    it('Matriste olan ilçe için tam veriyi döner', () => {
      const sariyer = getDistrictDualCore('sariyer');
      expect(sariyer).toBeDefined();
      expect(sariyer?.siteCore.keyNeighborhoods).toContain('Zekeriyaköy');
      expect(sariyer?.facilityCore.commercialNeighborhoods).toContain('Maslak');
    });

    it('Matriste özel kaydı olmayan 39 ilçeden biri için dinamik fallback üretir', () => {
      const silivri = getDistrictDualCore('silivri');
      expect(silivri).toBeDefined();
      expect(silivri?.name).toBe('Silivri');
      expect(silivri?.siteCore.targetKeywords).toContain('Silivri site yönetimi');
      expect(silivri?.facilityCore.targetKeywords).toContain('Silivri tesis yönetimi');
    });

    it('Geçersiz slug verildiğinde null döner', () => {
      const invalid = getDistrictDualCore('ankara-cankaya');
      expect(invalid).toBeNull();
    });
  });

  describe('3. Anahtar Kelime & SERP Üretici Yardımcı Fonksiyonlar (Faz 96-105)', () => {
    it('getDistrictSiteKeywords ilçe bazlı konut yönetimi anahtar kelimelerini döner', () => {
      const keywords = getDistrictSiteKeywords('kadikoy');
      expect(keywords.length).toBeGreaterThanOrEqual(5);
      expect(keywords.some((k) => k.includes('Caddebostan') || k.includes('Kadıköy'))).toBe(true);
    });

    it('getDistrictFacilityKeywords ilçe bazlı kurumsal tesis anahtar kelimelerini döner', () => {
      const keywords = getDistrictFacilityKeywords('sariyer');
      expect(keywords.length).toBeGreaterThanOrEqual(4);
      expect(keywords.some((k) => k.includes('Maslak') || k.includes('Sarıyer'))).toBe(true);
    });

    it('getDistrictPillarSerp pillar parametresine göre optimize SERP başlığı ve açıklaması üretir', () => {
      const siteSerp = getDistrictPillarSerp('atasehir', 'site');
      expect(siteSerp.title).toContain('Ataşehir');
      expect(siteSerp.title).toContain('Rezidans ve Site Yönetimi');

      const facilitySerp = getDistrictPillarSerp('atasehir', 'facility');
      expect(facilitySerp.title).toContain('İstanbul Finans Merkezi');
      expect(facilitySerp.title).toContain('Tesis Yönetimi');

      const hybridSerp = getDistrictPillarSerp('atasehir', 'hybrid');
      expect(hybridSerp.title).toContain('Tesis Yönetimi & Site Yönetimi');
    });

    it('getTopDistrictsByPillar en kritik ilçeleri proje yoğunluğuna göre sıralar', () => {
      const topSite = getTopDistrictsByPillar('site', 5);
      expect(topSite.length).toBe(5);
      expect(topSite[0].siteCore.estimatedSiteCount).toBeGreaterThan(0);

      const topFacility = getTopDistrictsByPillar('facility', 5);
      expect(topFacility.length).toBe(5);
      expect(topFacility[0].facilityCore.estimatedCommercialCount).toBeGreaterThan(0);
    });

    it('getNeighborhoodLongTailKeywords mahalle düzeyinde long-tail anahtar kelimeler üretir', () => {
      const siteNeighborhoods = getNeighborhoodLongTailKeywords('besiktas', 'site');
      expect(siteNeighborhoods.length).toBeGreaterThan(10);
      expect(siteNeighborhoods).toContain('Etiler site yönetimi');
      expect(siteNeighborhoods).toContain('Bebek site yönetimi');

      const facilityNeighborhoods = getNeighborhoodLongTailKeywords('besiktas', 'facility');
      expect(facilityNeighborhoods).toContain('Levent plaza tesis yönetimi');
    });
  });
});

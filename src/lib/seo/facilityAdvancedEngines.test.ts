import { describe, it, expect } from 'vitest';
import { calculateFacilityBudget } from '@/app/api/tesis-yonetimi/calculate-budget/route';
import { FACILITY_TERMS } from '@/app/api/tesis-yonetimi/dictionary.json/route';
import { webPageSchema } from '@/lib/schemas';

describe('Tesis Yönetimi İleri Düzey SEO & Hesaplama Motorları', () => {
  describe('Bütçe & Tasarruf Simülatörü (calculateFacilityBudget)', () => {
    it('50 daireli bir site için bütçe, kalem dökümü ve %30 tasarrufu doğru hesaplar', () => {
      const result = calculateFacilityBudget(50, 'site', 'kadikoy');

      expect(result.units).toBe(50);
      expect(result.facilityType).toBe('site');
      expect(result.district).toBe('kadikoy');
      expect(result.estimatedMonthlyBudget).toBeGreaterThan(0);
      expect(result.duesPerUnit).toBeGreaterThan(0);

      // %30 Tasarruf kontrolü
      expect(result.savingsWithAloYonetim.savingsPercentage).toBe(30);
      expect(result.savingsWithAloYonetim.monthlySavingsAmount).toBe(
        Math.round(result.estimatedMonthlyBudget * 0.3)
      );
      expect(result.savingsWithAloYonetim.annualSavingsAmount).toBe(
        result.savingsWithAloYonetim.monthlySavingsAmount * 12
      );

      // Kalem toplamları kontrolü
      const breakdownSum =
        result.breakdown.security.amount +
        result.breakdown.cleaning.amount +
        result.breakdown.technicalMaintenance.amount +
        result.breakdown.commonEnergyAndUtilities.amount +
        result.breakdown.kmkLegalEmergencyReserve.amount;

      expect(breakdownSum).toBe(result.estimatedMonthlyBudget);

      // Schema.org CalculateAction kontrolü
      expect(result.schema['@type']).toBe('CalculateAction');
      expect(result.schema.result.value).toBe(result.savingsWithAloYonetim.optimizedBudget);
    });

    it('Rezidans ve Plaza gibi ticari tesis tiplerinde birim katsayıları uygular', () => {
      const siteResult = calculateFacilityBudget(100, 'site', 'sisli');
      const plazaResult = calculateFacilityBudget(100, 'plaza', 'sisli');

      expect(plazaResult.duesPerUnit).toBeGreaterThan(siteResult.duesPerUnit);
      expect(plazaResult.facilityTypeName).toBe('Plaza ve İş Merkezi');
    });
  });

  describe('Tesis Yönetimi Açık Terimler Sözlüğü (FACILITY_TERMS)', () => {
    it('En az 10 temel terim ve yasal dayanak içerir', () => {
      expect(FACILITY_TERMS.length).toBeGreaterThanOrEqual(10);

      const isletmeProjesi = FACILITY_TERMS.find((t) => t.termCode === 'isletme-projesi');
      expect(isletmeProjesi).toBeDefined();
      expect(isletmeProjesi?.legalBasis).toContain('KMK');

      const iso41001 = FACILITY_TERMS.find((t) => t.termCode === 'iso-41001');
      expect(iso41001).toBeDefined();
      expect(iso41001?.wikidataUri).toContain('Q108846399');
    });
  });

  describe('Sesli Arama & SpeakableSpecification (webPageSchema)', () => {
    it('webPageSchema varsayılan speakable cssSelector üretir', () => {
      const page = webPageSchema({
        name: 'Kadıköy Tesis Yönetimi',
        path: '/bolgeler/kadikoy/tesis-yonetimi',
      });

      const speakable = page.speakable as { '@type': string; cssSelector: string[] };
      expect(speakable).toBeDefined();
      expect(speakable['@type']).toBe('SpeakableSpecification');
      expect(speakable.cssSelector).toEqual(['#speakable-content', '#tldr-facility', 'h1']);
    });
  });
});

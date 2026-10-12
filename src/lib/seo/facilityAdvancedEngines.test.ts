import { describe, it, expect } from 'vitest';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';
import { webPageSchema } from '@/lib/schemas';

describe('Tesis Yönetimi İleri Düzey SEO & Hesaplama Motorları', () => {

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

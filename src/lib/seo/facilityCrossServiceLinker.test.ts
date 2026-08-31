import { describe, it, expect } from 'vitest';
import {
  CROSS_SERVICE_MAPPINGS,
  getCrossServiceLinks,
  getPillarCrossLinkCards,
  generateCrossLinkJsonLd,
  validateCrossLinkGraph,
} from './facilityCrossServiceLinker';

describe('9 Hizmet Çapraz Bağlantı Motoru (facilityCrossServiceLinker.test.ts)', () => {
  describe('1. 9 Hizmet Matrisi ve Bütünlük (Faz 161-186)', () => {
    it('Sitedeki 9 temel hizmetin tamamında cross-link tanımları bulunur', () => {
      const keys = Object.keys(CROSS_SERVICE_MAPPINGS);
      expect(keys.length).toBe(9);
      expect(keys).toContain('tesis-yonetimi');
      expect(keys).toContain('aidat-takibi');
      expect(keys).toContain('guvenlik-yonetimi');
      expect(keys).toContain('teknik-bakim');
      expect(keys).toContain('temizlik-ve-hijyen');
      expect(keys).toContain('peyzaj-ve-bahce-bakimi');
      expect(keys).toContain('havuz-bakimi-ve-hijyen');
      expect(keys).toContain('hasere-ve-dezenfeksiyon');
      expect(keys).toContain('hukuk-ve-icra-danismanligi');
    });

    it('validateCrossLinkGraph yetim hizmet olmadan geçerlilik verir', () => {
      const audit = validateCrossLinkGraph();
      expect(audit.isValid).toBe(true);
      expect(audit.totalServicesAudited).toBe(9);
      expect(audit.orphanServices.length).toBe(0);
    });

    it('Tüm kartlar dofollow ve açıklama metinleriyle doludur', () => {
      Object.values(CROSS_SERVICE_MAPPINGS).forEach((cards) => {
        cards.forEach((card) => {
          expect(card.isDoFollow).toBe(true);
          expect(card.description.length).toBeGreaterThan(15);
          expect(card.anchorText.length).toBeGreaterThan(5);
        });
      });
    });
  });

  describe('2. getCrossServiceLinks ve Dikey Filtreleme (Faz 187-191)', () => {
    it('Site dikeyinde konut odaklı kartlar filtreler', () => {
      const siteCards = getCrossServiceLinks('guvenlik-yonetimi', 'tr', 'site');
      expect(siteCards.length).toBeGreaterThanOrEqual(2);
      expect(siteCards.some((c) => c.title.includes('Rezidans') || c.title.includes('Site'))).toBe(true);
    });

    it('Tesis dikeyinde kurumsal plaza odaklı kartlar filtreler', () => {
      const facilityCards = getCrossServiceLinks('guvenlik-yonetimi', 'tr', 'facility');
      expect(facilityCards.length).toBeGreaterThanOrEqual(2);
      expect(facilityCards.some((c) => c.title.includes('Plaza') || c.title.includes('Sanayi'))).toBe(true);
    });

    it('Her hizmet için en fazla 4 kart döner', () => {
      const cards = getCrossServiceLinks('teknik-bakim', 'tr', 'hybrid');
      expect(cards.length).toBeLessThanOrEqual(4);
    });
  });

  describe('3. getPillarCrossLinkCards ve JSON-LD Şema (Faz 192-205)', () => {
    it('getPillarCrossLinkCards ilçe verildiğinde özel yönlendirme kartları üretir', () => {
      const siteCards = getPillarCrossLinkCards('site', 'kadikoy');
      expect(siteCards.length).toBe(2);
      expect(siteCards[0].title).toContain('Toplu Konut & Rezidans');

      const facilityCards = getPillarCrossLinkCards('facility', 'maslak');
      expect(facilityCards.length).toBe(2);
      expect(facilityCards[0].title).toContain('Plaza');
    });

    it('generateCrossLinkJsonLd geçerli ItemList Schema.org JSON-LD üretir', () => {
      const jsonLd = generateCrossLinkJsonLd('aidat-takibi', 'site', 'tr');
      expect(jsonLd['@type']).toBe('ItemList');
      expect(jsonLd.itemListElement.length).toBeGreaterThan(0);
      expect(jsonLd.itemListElement[0]['@type']).toBe('ListItem');
      expect(jsonLd.itemListElement[0].url).toContain('/hizmetler/');
    });
  });
});

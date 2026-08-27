import { describe, it, expect } from 'vitest';
import { simulateFacilityPageRank } from './facilityPageRankSimulationEngine';
import { GROUP_COMPANIES_ECOSYSTEM } from './facilityGroupAndLegalEcosystem';
import { FACILITY_SUB_SECTORS } from './facilitySiloRankPasser';
import { OFFICIAL_LEGAL_CITATIONS } from './facilityExternalCitations';

describe('İç ve Dış Linkleme Derin Ağ Mimarisi & PageRank Simülatörü (Faz 13)', () => {
  describe('facilityPageRankSimulationEngine.ts (PageRank Dağılımı ve Akış Simülasyonu)', () => {
    it('Matematiksel PageRank simülasyonunu başarıyla tamamlar ve yakınsar', () => {
      const report = simulateFacilityPageRank(0.85, 50);

      expect(report.converged).toBe(true);
      expect(report.totalNodes).toBeGreaterThan(45);
      expect(report.flagshipHubScore).toBe(100);
      expect(report.averageSubSectorScore).toBeGreaterThan(20);
      expect(report.averageDistrictScore).toBeGreaterThan(1);
      expect(report.underlinkedNodes).toHaveLength(0); // Hiçbir yetersiz bağlantılı kopuk düğüm olmamalı
    });

    it('Tüm 5 alt sektörün Tier 2 olarak yüksek PageRank aldığını doğrular', () => {
      const report = simulateFacilityPageRank();
      const subNodes = report.nodes.filter((n) => n.tier === 'tier_2_subsector');

      expect(subNodes).toHaveLength(5);
      for (const node of subNodes) {
        expect(node.normalizedScore).toBeGreaterThanOrEqual(15);
        expect(node.inboundLinkCount).toBeGreaterThanOrEqual(5);
      }
    });
  });

  describe('Grup Şirketleri Güven Vitrini ve Dış Link Güvenliği', () => {
    it('Alo Güvenlik ve 3G Güvenlik için güvenli noopener dış link meta doğrulaması', () => {
      for (const comp of GROUP_COMPANIES_ECOSYSTEM) {
        expect(comp.url).toMatch(/^https:\/\//);
        expect(comp.anchorTexts.length).toBeGreaterThanOrEqual(2);
      }
    });
  });

  describe('Resmi Mevzuat ve Yargıtay Dış Atıf Doğrulaması', () => {
    it('Tüm yasal mevzuat atıflarının geçerli resmi devlet alan adlarını içerdiğini teyit eder', () => {
      for (const cit of OFFICIAL_LEGAL_CITATIONS) {
        expect(cit.url).toMatch(/^https:\/\//);
        expect(
          cit.url.includes('mevzuat.gov.tr') ||
            cit.url.includes('resmigazete.gov.tr') ||
            cit.url.includes('iso.org') ||
            cit.url.includes('tse.org.tr') ||
            cit.url.includes('yargitay.gov.tr')
        ).toBe(true);
      }
    });
  });

  describe('5 Alt Sektör Çapraz Navigasyon Veri Bütünlüğü', () => {
    it('5 alt sektörün tam liste olarak tanımlandığını ve ikonlarının bulunduğunu doğrular', () => {
      expect(FACILITY_SUB_SECTORS).toHaveLength(5);
      for (const sub of FACILITY_SUB_SECTORS) {
        expect(sub.slug).toBeDefined();
        expect(sub.icon).toBeDefined();
        expect(sub.name).toBeDefined();
      }
    });
  });
});

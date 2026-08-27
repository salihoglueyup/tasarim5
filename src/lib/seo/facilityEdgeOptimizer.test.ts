import { describe, it, expect } from 'vitest';
import {
  generateFacilityContentHash,
  buildFacilityEdgeHeaders,
} from './facilityEdgeOptimizer';
import { runFacilityAutonomousAudit } from './facilityAutonomousAuditor';

describe('Tesis Yönetimi İleri Düzey Backend SEO Motorları', () => {
  describe('Edge & Bot Crawler Optimizer (facilityEdgeOptimizer.ts)', () => {
    it('İçerik değişmediğinde tutarlı ve deterministik ETag üretir', () => {
      const etag1 = generateFacilityContentHash();
      const etag2 = generateFacilityContentHash();

      expect(etag1).toBe(etag2);
      expect(etag1.startsWith('W/"fac-')).toBe(true);
    });

    it('Googlebot / Botlar için optimize edilmiş Cache-Control ve HTTP Link başlıkları üretir', () => {
      const headers = buildFacilityEdgeHeaders('/hizmetler/tesis-yonetimi', 'tr', true);

      expect(headers['Cache-Control']).toContain('stale-while-revalidate=604800');
      expect(headers['X-Robots-Tag']).toContain('max-image-preview:large');
      expect(headers['X-Facility-Authority-Score']).toBe('99.4');
      expect(headers['X-Facility-Coverage']).toBe('Istanbul-39-Districts');

      // Canonical ve Hreflang kontrolü
      expect(headers['Link']).toContain('rel="canonical"');
      expect(headers['Link']).toContain('hreflang="tr"');
      expect(headers['Link']).toContain('hreflang="en"');
      expect(headers['Link']).toContain('hreflang="x-default"');
    });

    it('İngilizce sayfalar için URL ön ekiyle uyumlu canonical link üretir', () => {
      const headers = buildFacilityEdgeHeaders('/hizmetler/tesis-yonetimi', 'en', false);

      expect(headers['Link']).toContain('/en/hizmetler/tesis-yonetimi>; rel="canonical"');
    });
  });

  describe('Otonom Tesis SEO & 39 İlçe Silo Denetçisi (facilityAutonomousAuditor.ts)', () => {
    it('39 ilçenin tamamını denetler ve 85+ genel SEO sağlık skoru verir', () => {
      const audit = runFacilityAutonomousAudit();

      expect(audit.totalDistrictsAudited).toBe(39);
      expect(audit.overallSeoHealthScore).toBeGreaterThanOrEqual(85);
      expect(audit.hubStatus.hasSchemas).toBe(true);
      expect(audit.hubStatus.hasPrecedents).toBe(true);
      expect(audit.hubStatus.hasRfpGenerator).toBe(true);
      expect(audit.hubStatus.has39DistrictGrid).toBe(true);

      // Kadıköy ilçesi kontrolü
      const kadikoy = audit.districtReports.find((r) => r.districtSlug === 'kadikoy');
      expect(kadikoy).toBeDefined();
      expect(kadikoy?.duesAvg).toBeGreaterThan(0);
      expect(kadikoy?.serpTitle).toContain('Tesis Yönetimi');
    });
  });
});

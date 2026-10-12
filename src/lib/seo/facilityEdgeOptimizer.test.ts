import { describe, it, expect } from 'vitest';
import {
  generateFacilityContentHash,
  buildFacilityEdgeHeaders,
} from './facility/facilityEdgeOptimizer';
import { runFacilityAutonomousAudit } from './facility/facilityAutonomousAuditor';

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

});

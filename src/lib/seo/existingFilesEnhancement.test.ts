import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('Mevcut Dosyalar Tesis Yönetimi Entegrasyon Testleri', () => {
  describe('robots.ts Yapılandırması', () => {
    it('Yeni video sitemap, bölgesel sitemap ve RSS feed haritalarını içerir', () => {
      const robotsResult = robots();
      const sitemaps = (robotsResult.sitemap as string[]) || [];

      expect(sitemaps.some((s) => s.includes('/sitemap-regions.xml'))).toBe(true);
      expect(sitemaps.some((s) => s.includes('/video-sitemap.xml'))).toBe(true);
      expect(sitemaps.some((s) => s.includes('/feed/tesis-yonetimi.xml'))).toBe(true);
    });

    it('Açık veri ve AI RAG endpoint\'lerine izin verir', () => {
      const robotsResult = robots();
      const firstRule = robotsResult.rules ? (Array.isArray(robotsResult.rules) ? robotsResult.rules[0] : robotsResult.rules) : null;
      const allowList = (firstRule?.allow as string[]) || [];

      expect(allowList).toContain('/api/ai/facility-agent-context.json');
      expect(allowList).toContain('/api/tesis-yonetimi/legal-precedents.json');
      expect(allowList).toContain('/api/tesis-yonetimi/calculate-budget');
    });
  });

  describe('sitemap.ts Amiral Gemisi Önceliklendirmesi', () => {
    it('/hizmetler/tesis-yonetimi sayfasını priority: 1.0 olarak tanımlar', async () => {
      const sitemapItems = await sitemap();
      
      const trFacilityRoute = sitemapItems.find(
        (item) => item.url === 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi'
      );

      expect(trFacilityRoute).toBeDefined();
      expect(trFacilityRoute?.priority).toBe(1.0);
      expect(trFacilityRoute?.changeFrequency).toBe('daily');
    });
  });
});

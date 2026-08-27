import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { autoLinkHtml } from '@/lib/autoLinker';

describe('Mevcut Dosyalar Tesis Yönetimi Entegrasyon Testleri (Faz 6)', () => {
  describe('robots.ts Yapılandırması', () => {
    it('Yeni video sitemap, bölgesel sitemap ve RSS feed haritalarını içerir', () => {
      const robotsResult = robots();
      const sitemaps = (robotsResult.sitemap as string[]) || [];

      expect(sitemaps.some((s) => s.includes('/sitemap-regions.xml'))).toBe(true);
      expect(sitemaps.some((s) => s.includes('/video-sitemap.xml'))).toBe(true);
      expect(sitemaps.some((s) => s.includes('/feed/tesis-yonetimi.xml'))).toBe(true);
    });

    it('Faz 1-4 Tesis Yönetimi açık veri ve API endpointlerine izin verir', () => {
      const robotsResult = robots();
      const firstRule = robotsResult.rules ? (Array.isArray(robotsResult.rules) ? robotsResult.rules[0] : robotsResult.rules) : null;
      const allowList = (firstRule?.allow as string[]) || [];

      expect(allowList).toContain('/api/tesis-yonetimi/compare-districts');
      expect(allowList).toContain('/api/tesis-yonetimi/dues-index.json');
      expect(allowList).toContain('/api/tesis-yonetimi/verify-credentials');
      expect(allowList).toContain('/api/tesis-yonetimi/ai-snippets.json');
      expect(allowList).toContain('/api/tesis-yonetimi/voice-qa.json');
      expect(allowList).toContain('/api/seo/bot-analytics');
    });
  });

  describe('sitemap.ts Amiral Gemisi ve 5 Alt Sektör Önceliklendirmesi', () => {
    it('/hizmetler/tesis-yonetimi sayfasını priority: 1.0 olarak tanımlar', async () => {
      const sitemapItems = await sitemap();

      const trFacilityRoute = sitemapItems.find(
        (item) => item.url === 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi'
      );

      expect(trFacilityRoute).toBeDefined();
      expect(trFacilityRoute?.priority).toBe(1.0);
      expect(trFacilityRoute?.changeFrequency).toBe('daily');
    });

    it('5 alt sektör sayfasını (Rezidans, Plaza, Toplu Konut, Sanayi, Rehber) sitemap listesine ekler', async () => {
      const sitemapItems = await sitemap();

      const rezidansRoute = sitemapItems.find(
        (item) => item.url === 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi/rezidans-site-yonetimi'
      );
      const plazaRoute = sitemapItems.find(
        (item) => item.url === 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi/plaza-yonetimi'
      );
      const topluKonutRoute = sitemapItems.find(
        (item) => item.url === 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi/toplu-konut-yonetimi'
      );
      const sanayiRoute = sitemapItems.find(
        (item) => item.url === 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi'
      );
      const rehberRoute = sitemapItems.find(
        (item) => item.url === 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi/rehber'
      );

      expect(rezidansRoute).toBeDefined();
      expect(plazaRoute).toBeDefined();
      expect(topluKonutRoute).toBeDefined();
      expect(sanayiRoute).toBeDefined();
      expect(rehberRoute).toBeDefined();
      expect(rezidansRoute?.priority).toBe(0.9);
    });
  });

  describe('autoLinker.ts Tesis Yönetimi Semantik Entegrasyonu', () => {
    it('HTML metinlerindeki yeni Tesis Yönetimi terimlerini doğru sayfalara bağlar', () => {
      const rawHtml = '<p>İstanbul genelinde rezidans yönetimi istanbul ve yargıtay emsal kararları büyük önem taşır.</p>';
      const linkedHtml = autoLinkHtml(rawHtml, '/blog/ornek-yazi');

      expect(linkedHtml).toContain('href="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi"');
      expect(linkedHtml).toContain('href="/hizmetler/tesis-yonetimi"');
    });
  });
});

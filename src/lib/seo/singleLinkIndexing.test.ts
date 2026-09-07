import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';
import { GET as getSitemapIndex } from '@/app/sitemap-index.xml/route';
import { GET as getPingAll } from '@/app/api/seo/ping-all/route';
import { BASE_URL } from '@/lib/seo';

describe('Tek Bir Link ile Otomatik İndeksleme Mimarisi (singleLinkIndexing.test.ts)', () => {
  describe('1. Master XML Site Haritası Dizini (/sitemap-index.xml)', () => {
    it('sitemap-index.xml geçerli bir XML sitemapindex şablonu dönmeli', async () => {
      const response = await getSitemapIndex();
      expect(response.status).toBe(200);

      const contentType = response.headers.get('Content-Type');
      expect(contentType).toContain('application/xml');

      const text = await response.text();
      expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(text).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(text).toContain('</sitemapindex>');
    });

    it('sitemap-index.xml tüm 6 alt sitemap haritasını eksiksiz barındırmalı', async () => {
      const response = await getSitemapIndex();
      const text = await response.text();

      const requiredSitemaps = [
        `${BASE_URL}/sitemap.xml`,
        `${BASE_URL}/sitemap-regions.xml`,
        `${BASE_URL}/image-sitemap.xml`,
        `${BASE_URL}/video-sitemap.xml`,
        `${BASE_URL}/document-sitemap.xml`,
        `${BASE_URL}/news-sitemap.xml`,
      ];

      for (const loc of requiredSitemaps) {
        expect(text).toContain(`<loc>${loc}</loc>`);
      }
    });
  });

  describe('2. Robots.txt Master İndeks Entegrasyonu', () => {
    it('robots.txt sitemap listesinin en tepesinde sitemap-index.xml tek linki yer almalı', () => {
      const robotsConfig = robots();
      const sitemaps = Array.isArray(robotsConfig.sitemap)
        ? robotsConfig.sitemap
        : [robotsConfig.sitemap];

      expect(sitemaps[0]).toBe(`${BASE_URL}/sitemap-index.xml`);
      expect(sitemaps).toContain(`${BASE_URL}/sitemap.xml`);
    });
  });

  describe('3. Tek Tıkla Çoklu Arama Motoru Tetikleyicisi (/api/seo/ping-all)', () => {
    it('GET /api/seo/ping-all başarılı durum ve sitemap index referansı dönmeli', async () => {
      const response = await getPingAll();
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.masterSitemapIndex).toBe(`${BASE_URL}/sitemap-index.xml`);
      expect(json.indexNow).toBeDefined();
      expect(json.indexNow.engines).toContain('Bing');
      expect(json.indexNow.engines).toContain('Yandex');
    });
  });
});

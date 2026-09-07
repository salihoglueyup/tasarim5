import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';
import { resolveSmartRedirect, STATIC_ROUTE_SYNONYMS } from '@/lib/seo/smartRedirect';
import { DISTRICTS } from '@/data/districts';

describe('Google Search Console 2000+ İndeks İyileştirme ve Hata Düzeltme Paketi', () => {
  describe('1. Robots.txt & Crawl Budget Kalkanı (src/app/robots.ts)', () => {
    const robotsConfig = robots();

    it('Arama motoru botları (Googlebot vb.) için parametre patlamasını engelleyen Disallow kurallarını içermeli', () => {
      const userAgentRules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules
        : [robotsConfig.rules];

      // Kurallardaki disallow listelerini topla
      const allDisallows = userAgentRules.flatMap((r) =>
        Array.isArray(r.disallow) ? r.disallow : r.disallow ? [r.disallow] : []
      );

      expect(allDisallows).toContain('/teklif-al?*');
      expect(allDisallows).toContain('/*?*hizmet=*');
      expect(allDisallows).toContain('/*?*bolge=*');
      expect(allDisallows).toContain('/*?*skor=*');
      expect(allDisallows).toContain('/*?*utm_*');
      expect(allDisallows).toContain('/*?*fbclid=*');
      expect(allDisallows).toContain('/*?*gclid=*');
    });

    it('Sitemap listesi sadece gerçek XML sitemapleri içermeli, API feedleri veya RSS barındırmamalı', () => {
      const sitemaps = Array.isArray(robotsConfig.sitemap)
        ? robotsConfig.sitemap
        : robotsConfig.sitemap
        ? [robotsConfig.sitemap]
        : [];

      expect(sitemaps).toContain('https://aloyonetim.com.tr/sitemap.xml');
      expect(sitemaps).not.toContain('https://aloyonetim.com.tr/api/facility/districts-feed.xml');
      expect(sitemaps).not.toContain('https://aloyonetim.com.tr/api/security/districts-feed.xml');
      expect(sitemaps).not.toContain('https://aloyonetim.com.tr/rss.xml');
      expect(sitemaps).not.toContain('https://aloyonetim.com.tr/feed.xml');
    });
  });

  describe('2. Akıllı 301 Yönlendirmeleri (resolveSmartRedirect)', () => {
    it('Google Search Console raporundaki bozuk slugları kalıcı 301 ile hedefine yönlendirmeli', () => {
      const testCases = [
        { path: '/bolgeler/-mraniye', expected: '/bolgeler/umraniye' },
        { path: '/bolgeler/ata-ehir', expected: '/bolgeler/atasehir' },
        { path: '/bolgeler/-i-li', expected: '/bolgeler/sisli' },
        { path: '/bolgeler/kad-k-y', expected: '/bolgeler/kadikoy' },
        { path: '/bolgeler/ba-ak-ehir', expected: '/bolgeler/basaksehir' },
        { path: '/bolgeler/beylikd-z-', expected: '/bolgeler/beylikduzu' },
        { path: '/bolgeler/sar-yer', expected: '/bolgeler/sariyer' },
        { path: '/bolgeler/-atalca', expected: '/bolgeler/catalca' },
        { path: '/bolgeler/-ekmek-y', expected: '/bolgeler/cekmekoy' },
        { path: '/bolgeler/bak-rk-y', expected: '/bolgeler/bakirkoy' },
        { path: '/sozluk/i-lamsiz-i-cra-takibi-aidat-borcu', expected: '/sozluk/ilamsiz-icra-takibi-aidat-borcu' },
      ];

      for (const tc of testCases) {
        const res = resolveSmartRedirect(tc.path);
        expect(res).not.toBeNull();
        expect(res?.targetUrl).toBe(tc.expected);
        expect(res?.confidence).toBe(1.0);
      }
    });

    it('Eski ve hatalı mahalle sluglarını doğru ASCII hedeflerine yönlendirmeli', () => {
      const resMehtercesme = resolveSmartRedirect('/bolgeler/esenyurt/mahalleler/mehterçesme');
      expect(resMehtercesme?.targetUrl).toBe('/bolgeler/esenyurt/mahalleler/mehtercesme');

      const resSahintepe = resolveSmartRedirect('/bolgeler/basaksehir/mahalleler/sahıntepe');
      expect(resSahintepe?.targetUrl).toBe('/bolgeler/basaksehir/mahalleler/sahintepe');

      const resYenikoy = resolveSmartRedirect('/bolgeler/sariyer/mahalleler/yenıkoy');
      expect(resYenikoy?.targetUrl).toBe('/bolgeler/sariyer/mahalleler/yenikoy');
    });
  });

  describe('3. İlçe ve Mahalle Sluglarında %100 Temiz ASCII Karakter Bütünlüğü', () => {
    it('Tüm ilçe slugları sadece küçük harf, rakam ve tire içermeli', () => {
      const asciiRegex = /^[a-z0-9-]+$/;
      DISTRICTS.forEach((d) => {
        expect(d.slug).toMatch(asciiRegex);
      });
    });

    it('Tüm mahalle slugları sadece küçük harf, rakam ve tire içermeli (Türkçe karakter barındırmamalı)', () => {
      const asciiRegex = /^[a-z0-9-]+$/;
      let totalNeighborhoods = 0;

      DISTRICTS.forEach((d) => {
        if (d.neighborhoodData) {
          d.neighborhoodData.forEach((n) => {
            totalNeighborhoods++;
            expect(n.slug).toMatch(asciiRegex);
            // Özel kontrol edilen eski hatalı sluglar
            expect(n.slug).not.toContain('ı');
            expect(n.slug).not.toContain('ç');
            expect(n.slug).not.toContain('ş');
            expect(n.slug).not.toContain('ö');
            expect(n.slug).not.toContain('ü');
            expect(n.slug).not.toContain('ğ');
          });
        }
      });

      expect(totalNeighborhoods).toBeGreaterThanOrEqual(40);
    });

    it('Düzeltilen özel mahalleler (yenikoy, sahintepe, mehtercesme) veri kümesinde doğru biçimde bulunmalı', () => {
      const sariyer = DISTRICTS.find((d) => d.slug === 'sariyer');
      const basaksehir = DISTRICTS.find((d) => d.slug === 'basaksehir');
      const esenyurt = DISTRICTS.find((d) => d.slug === 'esenyurt');

      expect(sariyer?.neighborhoodData?.some((n) => n.slug === 'yenikoy')).toBe(true);
      expect(basaksehir?.neighborhoodData?.some((n) => n.slug === 'sahintepe')).toBe(true);
      expect(esenyurt?.neighborhoodData?.some((n) => n.slug === 'mehtercesme')).toBe(true);
    });
  });

  describe('4. Blog Etiket ve Arama Slug Normalizasyonu', () => {
    it('Boşluklu ve tireli etiket slugları birbirini tamamlamalı', () => {
      const tagWithSpaces = 'tesis isletme';
      const tagWithHyphen = tagWithSpaces.replace(/\s+/g, '-');
      expect(tagWithHyphen).toBe('tesis-isletme');

      const restored = tagWithHyphen.replace(/-/g, ' ');
      expect(restored).toBe('tesis isletme');
    });
  });
});

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { CERTIFICATES } from '@/data/certificates';

describe('Google Search Console 0-Hata (Zero-Error) Kalite Güvence Test Paketi', () => {
  describe('1. Document & XML Sitemap Sözdizimi Doğrulaması', () => {
    it('document-sitemap.xml route kaynak kodu hiçbir <loc> etiketi içinde # hash fragment barındırmamalı', () => {
      const docSitemapPath = path.join(process.cwd(), 'src/app/document-sitemap.xml/route.ts');
      const content = fs.readFileSync(docSitemapPath, 'utf8');

      // <loc>.*#.*</loc> deseni olmamalı
      expect(content).not.toMatch(/<loc>[^<]*#[^<]*<\/loc>/);
    });

    it('image-sitemap.xml route kaynak kodu escape edilmemiş &type=local barındırmamalı, &amp;type=local olmalı', () => {
      const imgSitemapPath = path.join(process.cwd(), 'src/app/image-sitemap.xml/route.ts');
      const content = fs.readFileSync(imgSitemapPath, 'utf8');

      expect(content).toContain('&amp;type=local');
      expect(content).not.toMatch(/\?title=[^&]*&type=local/);
    });

    it('video-sitemap.xml içinde listelenen tüm video dosyaları diskte (public/) fiziksel olarak var olmalı', () => {
      const videoSitemapPath = path.join(process.cwd(), 'src/app/video-sitemap.xml/route.ts');
      const content = fs.readFileSync(videoSitemapPath, 'utf8');

      // brand-film.mp4 olmalı, olmayan dosyalar (facility-overview, security-operations) olmamalı
      expect(content).toContain('brand-film.mp4');
      expect(content).not.toContain('facility-overview.mp4');
      expect(content).not.toContain('security-operations.mp4');

      const brandFilmDisk = path.join(process.cwd(), 'public/video/brand-film.mp4');
      expect(fs.existsSync(brandFilmDisk)).toBe(true);
    });
  });

  describe('2. Robots.txt & Crawl Budget Kalkanı', () => {
    const robotsConfig = robots();

    it('robots.txt disallow listesi tüm /api/ ve /~offline yollarını içermeli', () => {
      const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules : [robotsConfig.rules];
      const disallows = rules.flatMap((r) => Array.isArray(r.disallow) ? r.disallow : r.disallow ? [r.disallow] : []);

      expect(disallows).toContain('/api/');
      expect(disallows).toContain('/~offline');
    });

    it('robots.txt sitemap listesi sadece standart XML sitemap haritalarını içermeli, API veya feed içermemeli', () => {
      const rawSitemaps = Array.isArray(robotsConfig.sitemap) ? robotsConfig.sitemap : [robotsConfig.sitemap];
      const sitemaps = rawSitemaps.filter((s): s is string => typeof s === 'string');

      expect(sitemaps).toContain('https://aloyonetim.com.tr/sitemap.xml');
      expect(sitemaps).toContain('https://aloyonetim.com.tr/sitemap-regions.xml');
      expect(sitemaps).toContain('https://aloyonetim.com.tr/image-sitemap.xml');
      expect(sitemaps).toContain('https://aloyonetim.com.tr/video-sitemap.xml');
      expect(sitemaps).toContain('https://aloyonetim.com.tr/document-sitemap.xml');
      expect(sitemaps).toContain('https://aloyonetim.com.tr/news-sitemap.xml');
      expect(sitemaps.some((s) => s.includes('/api/'))).toBe(false);
      expect(sitemaps.some((s) => s.endsWith('/feed.xml'))).toBe(false);
    });
  });

  describe('3. Ana sitemap.ts İçinde Kurumsal Sertifikalar', () => {
    it('sitemap() çıktısı tüm 7 sertifika sayfasını 4 dilde (TR, EN, RU, AR) eksiksiz içermeli', async () => {
      const items = await sitemap();

      for (const cert of CERTIFICATES) {
        const trUrl = `https://aloyonetim.com.tr/kurumsal/sertifikalar/${cert.slug}`;
        const enUrl = `https://aloyonetim.com.tr/en/kurumsal/sertifikalar/${cert.slug}`;
        const ruUrl = `https://aloyonetim.com.tr/ru/kurumsal/sertifikalar/${cert.slug}`;
        const arUrl = `https://aloyonetim.com.tr/ar/kurumsal/sertifikalar/${cert.slug}`;

        expect(items.some((i) => i.url === trUrl)).toBe(true);
        expect(items.some((i) => i.url === enUrl)).toBe(true);
        expect(items.some((i) => i.url === ruUrl)).toBe(true);
        expect(items.some((i) => i.url === arUrl)).toBe(true);
      }
    });
  });

  describe('4. next.config.ts Güvenlik & Noindex Başlıkları', () => {
    it('next.config.ts içinde /api/:path* ve /~offline noindex başlığı almalı, image-sitemap.xml noindex olmamalı', () => {
      const configPath = path.join(process.cwd(), 'next.config.ts');
      const content = fs.readFileSync(configPath, 'utf8');

      expect(content).toContain("source: '/~offline'");
      expect(content).toContain("source: '/api/:path*'");
      // image-sitemap.xml noindex listesinden çıkarılmış olmalı
      expect(content).not.toMatch(/source:\s*['"]\/image-sitemap\.xml['"][\s\S]*?noindex/);
    });
  });

  describe('5. Sertifika Sayfası generateStaticParams Çok Dilli Uyumluluğu', () => {
    it('kurumsal/sertifikalar/[slug]/page.tsx generateStaticParams içinde LOCALES.flatMap barındırmalı', () => {
      const certPagePath = path.join(process.cwd(), 'src/app/[lang]/kurumsal/sertifikalar/[slug]/page.tsx');
      const content = fs.readFileSync(certPagePath, 'utf8');

      expect(content).toContain('LOCALES.flatMap');
      expect(content).toMatch(/\{ lang, slug: c\.slug \}/);
    });
  });

  describe('6. RSS & Atom Beslemeleri Fallback Dayanıklılığı', () => {
    it('feed.xml ve rss.xml dosyaları POSTS_META fallback entegrasyonuna sahip olmalı', () => {
      const feedPath = path.join(process.cwd(), 'src/app/feed.xml/route.ts');
      const rssPath = path.join(process.cwd(), 'src/app/rss.xml/route.ts');

      const feedContent = fs.readFileSync(feedPath, 'utf8');
      const rssContent = fs.readFileSync(rssPath, 'utf8');

      expect(feedContent).toContain('POSTS_META');
      expect(feedContent).toContain('catch');

      expect(rssContent).toContain('POSTS_META');
      expect(rssContent).toContain('catch');
    });
  });
});

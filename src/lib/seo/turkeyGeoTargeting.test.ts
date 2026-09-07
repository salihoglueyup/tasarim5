import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { organizationSchema, professionalServiceSchema } from '@/lib/schemas/organization';
import { buildLanguageAlternates, BASE_URL } from '@/lib/seo';
import sitemap from '@/app/sitemap';

describe('Türkiye Coğrafi Hedefleme (Geo-Targeting) & SEO Doğrulama Paketi', () => {
  describe('1. Schema.org Ulusal Kapsama Alanı (Country: Türkiye)', () => {
    it('organizationSchema areaServed listesi "Country: Türkiye" varlığını eksiksiz içermeli', () => {
      const org = organizationSchema();
      const areas = org.areaServed as any[];
      expect(Array.isArray(areas)).toBe(true);

      const turkeyEntry = areas.find((a) => a['@type'] === 'Country' && a.name === 'Türkiye');
      expect(turkeyEntry).toBeDefined();
      expect(turkeyEntry.sameAs).toBe('https://tr.wikipedia.org/wiki/T%C3%BCrkiye');

      const istanbulEntry = areas.find((a) => a['@type'] === 'City' && a.name === 'İstanbul');
      expect(istanbulEntry).toBeDefined();
    });

    it('professionalServiceSchema varsayılan areaServed listesi "Country: Türkiye" içermeli', () => {
      const service = professionalServiceSchema();
      const areas = service.areaServed as any[];
      expect(Array.isArray(areas)).toBe(true);

      const turkeyEntry = areas.find((a) => a['@type'] === 'Country' && a.name === 'Türkiye');
      expect(turkeyEntry).toBeDefined();
      expect(turkeyEntry.sameAs).toBe('https://tr.wikipedia.org/wiki/T%C3%BCrkiye');
    });
  });

  describe('2. Hreflang Dil ve Bölge Eşleştirmesi', () => {
    it('buildLanguageAlternates tr-TR ve x-default kanonik değerlerini üretmeli', () => {
      const alternates = buildLanguageAlternates('/hizmetler');
      expect(alternates['tr-TR']).toBe(`${BASE_URL}/hizmetler`);
      expect(alternates['x-default']).toBe(`${BASE_URL}/hizmetler`);
      expect(alternates['en-US']).toBe(`${BASE_URL}/en/hizmetler`);
      expect(alternates['ru-RU']).toBe(`${BASE_URL}/ru/hizmetler`);
      expect(alternates['ar-SA']).toBe(`${BASE_URL}/ar/hizmetler`);
    });
  });

  describe('3. XML Sitemap /app Sayfası Doğrulaması', () => {
    it('sitemap() çıktısı /app rotasını 4 dilde (TR, EN, RU, AR) eksiksiz barındırmalı', async () => {
      const items = await sitemap();
      const urls = items.map((i) => i.url);

      expect(urls).toContain(`${BASE_URL}/app`);
      expect(urls).toContain(`${BASE_URL}/en/app`);
      expect(urls).toContain(`${BASE_URL}/ru/app`);
      expect(urls).toContain(`${BASE_URL}/ar/app`);
    });
  });

  describe('4. Layout <head> Temizliği (Noindex Çelişkisi Önleme)', () => {
    it('layout.tsx head içinde robots noindex çelişkisi yaratan dahili api feed linkleri bulunmamalı', () => {
      const layoutPath = path.join(process.cwd(), 'src/app/[lang]/layout.tsx');
      const content = fs.readFileSync(layoutPath, 'utf8');

      expect(content).not.toContain('/api/facility/districts-feed.xml');
      expect(content).not.toContain('/api/security/districts-feed.xml');
      expect(content).toContain('/rss.xml');
      expect(content).toContain('/feed.xml');
    });
  });

  describe('5. Google Rich Results Test & Sıfır Hata Şema Doğrulaması', () => {
    it('organizationSchema aggregateRating içinde geçerli itemReviewed nesnesi bulunmalı', () => {
      const org = organizationSchema() as any;
      expect(org.aggregateRating).toBeDefined();
      expect(org.aggregateRating.itemReviewed).toBeDefined();
      expect(org.aggregateRating.itemReviewed['@type']).toBe('Organization');
      expect(org.aggregateRating.itemReviewed.name).toBe('Alo Yönetim');
    });

    it('professionalServiceSchema aggregateRating içinde geçerli itemReviewed nesnesi bulunmalı', () => {
      const ps = professionalServiceSchema() as any;
      expect(ps.aggregateRating).toBeDefined();
      expect(ps.aggregateRating.itemReviewed).toBeDefined();
      expect(ps.aggregateRating.itemReviewed['@type']).toBe('ProfessionalService');
    });
  });

  describe('6. Google Featured Snippet (0. Sıra) & KMK Doğrudan Cevap Motoru', () => {
    it('KMK_LAW_INDEX içindeki tüm maddeler doğrudan arama sorusu ve kesin cevap içermeli', async () => {
      const { KMK_LAW_INDEX } = await import('@/data/kmkLawData');
      expect(KMK_LAW_INDEX.length).toBeGreaterThanOrEqual(8);

      for (const item of KMK_LAW_INDEX) {
        expect(item.featuredSnippetQuestion).toBeDefined();
        expect(item.featuredSnippetQuestion.length).toBeGreaterThan(10);
        expect(item.directSnippetAnswer).toBeDefined();
        expect(item.directSnippetAnswer.length).toBeGreaterThan(40);
      }

      const madde20 = KMK_LAW_INDEX.find((i) => i.articleNumber === 20);
      expect(madde20?.directSnippetAnswer).toContain('%5');

      const madde34 = KMK_LAW_INDEX.find((i) => i.articleNumber === 34);
      expect(madde34?.directSnippetAnswer).toContain('çift çoğunluk');

      const madde37 = KMK_LAW_INDEX.find((i) => i.articleNumber === 37);
      expect(madde37?.directSnippetAnswer).toContain('7 gün');
    });

    it('robots.txt allow listesi noindex feed linklerini barındırmamalı', async () => {
      const robotsFn = (await import('@/app/robots')).default;
      const config = robotsFn();
      const userAgentRules = Array.isArray(config.rules) ? config.rules : [config.rules];
      const allAllows = userAgentRules.flatMap((r) =>
        Array.isArray(r.allow) ? r.allow : r.allow ? [r.allow] : []
      );

      expect(allAllows).not.toContain('/api/facility/districts-feed.xml');
      expect(allAllows).not.toContain('/api/security/districts-feed.xml');
    });
  });
});

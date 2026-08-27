import { describe, it, expect } from 'vitest';
import { autoLinkHtml } from '@/lib/autoLinker';
import { analyzeFacilitySerpReadiness } from './facilitySearchRankAnalyzer';

describe('Tesis ve Mülk Hizmetleri Sitewide Linkleme & SERP Analizcisi (Faz 11)', () => {
  describe('autoLinker.ts Tesis ve Mülk Hizmetleri Otomatik Blog Linkleme', () => {
    it('Blog metnindeki "tesis ve mülk hizmetleri" kelimesini ana hub linkine dönüştürür', () => {
      const rawHtml = '<p>Şirketimiz İstanbul genelinde profesyonel tesis ve mülk hizmetleri sunmaktadır.</p>';
      const linkedHtml = autoLinkHtml(rawHtml, '/blog/ornek-yazi');

      expect(linkedHtml).toContain('href="/hizmetler/tesis-yonetimi"');
      expect(linkedHtml).toContain('tesis ve mülk hizmetleri');
    });

    it('Blog metnindeki "mülk yönetimi" terimini tespit edip linkler', () => {
      const rawHtml = '<p>Çağdaş standartlarda mülk yönetimi ve bütçe planlaması yapıyoruz.</p>';
      const linkedHtml = autoLinkHtml(rawHtml, '/blog/ornek-yazi-2');

      expect(linkedHtml).toContain('href="/hizmetler/tesis-yonetimi"');
    });
  });

  describe('facilitySearchRankAnalyzer.ts Sunucu Taraflı SERP & E-E-A-T Puanlayıcı', () => {
    it('Eksiksiz bir Tesis Yönetimi sayfası için A+ (90+) puan üretir', () => {
      const report = analyzeFacilitySerpReadiness({
        title: 'Profesyonel Tesis ve Mülk Hizmetleri İstanbul | Alo Yönetim',
        metaDescription: 'İstanbul genelinde ISO 41001 standartlarında tesis ve mülk yönetimi, 5188 güvenlik.',
        h1: 'Entegre Tesis ve Mülk Hizmetleri',
        content: `
          <p>KMK 634 sayılı kanun ve ISO 41001 kalite standartlarında 5188 güvenlik ile aidatlarda %30 tasarruf sağlıyoruz.</p>
          <p><a href="/hizmetler/tesis-yonetimi/rezidans-site-yonetimi">Rezidans Yönetimi</a></p>
          <p><a href="/hizmetler/tesis-yonetimi/plaza-yonetimi">Plaza Yönetimi</a></p>
          <p><a href="/hizmetler/tesis-yonetimi/toplu-konut-yonetimi">Toplu Konut Yönetimi</a></p>
        `,
        hasGraphSchema: true,
        hasBreadcrumbs: true,
        hasFaq: true,
        hasLegalReference: true,
      });

      expect(report.overallScore).toBeGreaterThanOrEqual(90);
      expect(report.grade).toBe('A+');
      expect(report.detectedKeywords.length).toBeGreaterThanOrEqual(4);
      expect(report.breakdown.schemaCompletenessScore).toBe(25);
    });

    it('Eksik şema ve link barındıran sayfa için öneriler ve düşük not üretir', () => {
      const report = analyzeFacilitySerpReadiness({
        title: 'Genel Bilgi Sayfası',
        content: '<p>Basit bir metin.</p>',
        hasGraphSchema: false,
        hasBreadcrumbs: false,
        hasFaq: false,
      });

      expect(report.overallScore).toBeLessThan(60);
      expect(report.recommendations.length).toBeGreaterThan(0);
    });
  });
});

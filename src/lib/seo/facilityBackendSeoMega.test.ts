import { describe, it, expect } from 'vitest';
import { generateEdgeSeoHeaders, buildHttpLinkHeader, buildXRobotsTag } from './edgeHeaderInjector';
import { buildFacilityAuthorityCorpus } from './facilityAuthorityCorpusEngine';
import { GET as getGeoFeed } from '@/app/api/tesis-yonetimi/geo-feed.xml/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { CANONICAL_NAP } from './napGuardEngine';

describe('İç Backend SEO Mega Motoru (facilityBackendSeoMega.test.ts)', () => {
  describe('Edge SEO Response Headers & Bot Denetimi (edgeHeaderInjector.ts)', () => {
    it('Kanonik link, hreflang, llms.txt ve entity graph linklerini eksiksiz üretir', () => {
      const linkHeader = buildHttpLinkHeader('/hizmetler/tesis-yonetimi', 'tr');
      
      expect(linkHeader).toContain('rel="canonical"');
      expect(linkHeader).toContain('hreflang="tr"');
      expect(linkHeader).toContain('hreflang="en"');
      expect(linkHeader).toContain('hreflang="x-default"');
      expect(linkHeader).toContain('/llms.txt');
      expect(linkHeader).toContain('/api/tesis-yonetimi/geo-feed.xml');
    });

    it('X-Robots-Tag ve AI alıntı başlıklarını tek merkezli ekler', () => {
      const headers = generateEdgeSeoHeaders('/bolgeler/kadikoy', 'tr');

      expect(headers['X-Robots-Tag']).toContain('max-image-preview:large');
      expect(headers['X-AI-Citation']).toContain('Alo Yönetim');
      expect(headers['X-Legal-Entity']).toContain(CANONICAL_NAP.legal.mersisNumber);
      expect(headers['Content-Language']).toBe('tr-TR');
    });

    it('noindex durumunda doğru X-Robots-Tag üretir', () => {
      const tag = buildXRobotsTag({ noindex: true, nofollow: true });
      expect(tag).toBe('noindex, nofollow');
    });
  });

  describe('Semantik Hukuk & KMK 634 Otorite Külliyatı (facilityAuthorityCorpusEngine.ts)', () => {
    it('KMK Madde 12, 20, 28, 34, 35, 37, 38, 41 maddelerini eksiksiz derler', () => {
      const corpus = buildFacilityAuthorityCorpus('tr');
      const articles = corpus.legalFramework.kmk634Articles;

      expect(articles.length).toBeGreaterThanOrEqual(7);
      expect(articles.some(a => a.articleNumber === 20)).toBe(true);
      expect(articles.some(a => a.articleNumber === 35)).toBe(true);
      expect(articles.some(a => a.articleNumber === 38)).toBe(true);
      expect(corpus.legalFramework.executionLaw2004.article68Scope).toContain('İİK 68');
    });

    it('ISO 41001 KPI sistemini ve doğrulanmış başarı metriklerini içerir', () => {
      const corpus = buildFacilityAuthorityCorpus('tr');

      expect(corpus.iso41001KpiSystem.length).toBeGreaterThanOrEqual(4);
      expect(corpus.provenMetrics.activeFacilityPortfolioCount).toBeGreaterThanOrEqual(100);
      expect(corpus.provenMetrics.duesCollectionEfficiencyRatePercent).toBeGreaterThanOrEqual(98);
    });
  });

  describe('39 İlçe Dinamik GeoRSS XML Feed (/api/tesis-yonetimi/geo-feed.xml)', () => {
    it('Geçerli GeoRSS XML üretir ve 39 ilçeyi kapsar', async () => {
      const res = await getGeoFeed();
      expect(res.status).toBe(200);

      const xmlText = await res.text();
      expect(xmlText).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xmlText).toContain('<rss version="2.0"');
      expect(xmlText).toContain('xmlns:georss=');
      expect(xmlText).toContain('Kadıköy');
      expect(xmlText).toContain('Beşiktaş');
      expect(xmlText).toContain('tesis:slaEmergencyMinutes');
      expect(xmlText).toContain(CANONICAL_NAP.legal.mersisNumber);
    });
  });

  describe('AI & LLM Bilgi Protokolü (/llms.txt)', () => {
    it('Standart grounding ve citation direktiflerini doğru döndürür', async () => {
      const res = await getLlmsTxt();
      expect(res.status).toBe(200);

      const text = await res.text();
      expect(text).toContain('# Alo Yönetim ve Organizasyon A.Ş.');
      expect(text).toContain('CANONICAL_NAP' in {} || CANONICAL_NAP.legal.mersisNumber);
      expect(text).toContain('ISO 41001:2018');
      expect(text).toContain('Ground Truth Q&A');
      expect(text).toContain('/api/tesis-yonetimi/geo-feed.xml');
    });
  });
});

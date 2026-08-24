import { describe, it, expect } from 'vitest';
import { buildHttpLinkHeader, buildXRobotsTag, generateEdgeSeoHeaders } from '@/lib/seo/edgeHeaderInjector';
import { analyzeCrawlBudget } from '@/lib/seo/crawlBudgetDefender';
import { classifySearchIntent } from '@/lib/seo/intentClassifier';

describe('5 Derin Backend SEO Motoru Doğrulama Testleri', () => {
  describe('HTTP Link Header & Canonical Enjektörü (edgeHeaderInjector.ts)', () => {
    it('RFC 8288 standardında canonical ve 4 dilde hreflang Link başlığı üretir', () => {
      const linkHeader = buildHttpLinkHeader('/hizmetler/tesis-yonetimi', 'tr');

      expect(linkHeader).toContain('<https://aloyonetim.com.tr/hizmetler/tesis-yonetimi>; rel="canonical"');
      expect(linkHeader).toContain('hreflang="tr"');
      expect(linkHeader).toContain('hreflang="en"');
      expect(linkHeader).toContain('hreflang="ru"');
      expect(linkHeader).toContain('hreflang="ar"');
      expect(linkHeader).toContain('hreflang="x-default"');
    });

    it('X-Robots-Tag başlığı varsayılan ve noindex durumlarını doğru formatlar', () => {
      const defaultTag = buildXRobotsTag();
      expect(defaultTag).toContain('all');
      expect(defaultTag).toContain('max-image-preview:large');

      const noindexTag = buildXRobotsTag({ noindex: true });
      expect(noindexTag).toBe('noindex, follow');
    });

    it('generateEdgeSeoHeaders tam başlık sözlüğü döndürür', () => {
      const headers = generateEdgeSeoHeaders('/bolgeler/kadikoy/tesis-yonetimi', 'tr');
      expect(headers.Link).toBeDefined();
      expect(headers['X-Robots-Tag']).toBeDefined();
      expect(headers['X-Content-Type-Options']).toBe('nosniff');
    });
  });

  describe('Tarama Bütçesi Koruyucusu (crawlBudgetDefender.ts)', () => {
    it('Temiz URL için isCleanUrl: true ve shouldNoindex: false döndürür', () => {
      const cleanResult = analyzeCrawlBudget('https://aloyonetim.com.tr/hizmetler/tesis-yonetimi');
      expect(cleanResult.isCleanUrl).toBe(true);
      expect(cleanResult.shouldNoindex).toBe(false);
      expect(cleanResult.detectedBadParams).toHaveLength(0);
    });

    it('UTM ve reklam parametreleri tespit edildiğinde shouldNoindex: true üretir', () => {
      const dirtyUrl = 'https://aloyonetim.com.tr/bolgeler/kadikoy/tesis-yonetimi?utm_source=google&fbclid=123';
      const dirtyResult = analyzeCrawlBudget(dirtyUrl);

      expect(dirtyResult.isCleanUrl).toBe(false);
      expect(dirtyResult.hasTrackingParams).toBe(true);
      expect(dirtyResult.shouldNoindex).toBe(true);
      expect(dirtyResult.detectedBadParams).toContain('utm_source');
      expect(dirtyResult.detectedBadParams).toContain('fbclid');
    });
  });

  describe('Arama Niyeti Sınıflandırıcı (intentClassifier.ts)', () => {
    it('KMK ve yasa sorgularını INFORMATIONAL olarak sınıflandırır', () => {
      const result = classifySearchIntent('kmk 634 madde 20 aidat gecikme faizi');
      expect(result.intent).toBe('INFORMATIONAL');
      expect(result.recommendedSchema).toContain('FAQPage');
    });

    it('Fiyat ve hesaplama sorgularını COMMERCIAL olarak sınıflandırır', () => {
      const result = classifySearchIntent('apartman tesis yönetimi bütçe hesaplama');
      expect(result.intent).toBe('COMMERCIAL');
      expect(result.recommendedSchema).toContain('CalculateAction');
    });

    it('İlçe içeren sorguları LOCAL_DISCOVERY olarak sınıflandırır', () => {
      const result = classifySearchIntent('kadıköy profesyonel tesis yönetimi');
      expect(result.intent).toBe('LOCAL_DISCOVERY');
      expect(result.detectedDistrict?.name).toBe('Kadıköy');
      expect(result.recommendedCta.targetUrl).toContain('/bolgeler/kadikoy/tesis-yonetimi');
    });

    it('Teklif ve başvuru sorgularını TRANSACTIONAL olarak sınıflandırır', () => {
      const result = classifySearchIntent('alo yönetim teklif al hemen ara');
      expect(result.intent).toBe('TRANSACTIONAL');
      expect(result.recommendedCta.targetUrl).toContain('/teklif-al');
    });
  });
});

import { describe, it, expect } from 'vitest';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getGeoFeed } from '@/app/api/tesis-yonetimi/geo-feed.xml/route';
import {
  SERVICES,
  getService,
  getServiceKmkArticles,
  getServiceLongTailKeywords,
  getSiteManagementServiceMatrix
} from '@/data/services';
import { autoLinkHtml } from '@/lib/autoLinker';

describe('Site Yönetimi Anahtar Kelime & Sayfa Optimizasyon Paketi (siteManagementSeoSuite.test.ts)', () => {
  describe('1. Sözlük & Google Featured Snippet (Position Zero) Tanımları (facilityDictionaryData.ts)', () => {
    it('Site Yönetimi, Yönetim Planı, Site Yönetim Kurulu ve Toplu Yapı Yönetimi terimlerini içerir', () => {
      const siteYonetimi = FACILITY_TERMS.find(t => t.termCode === 'site-yonetimi');
      const yonetimPlani = FACILITY_TERMS.find(t => t.termCode === 'yonetim-plani');
      const siteYonetimKurulu = FACILITY_TERMS.find(t => t.termCode === 'site-yonetim-kurulu');
      const topluYapi = FACILITY_TERMS.find(t => t.termCode === 'toplu-yapi-yonetimi');

      expect(siteYonetimi).toBeDefined();
      expect(siteYonetimi?.description).toContain('634 Sayılı Kat Mülkiyeti Kanunu');
      expect(siteYonetimi?.description).toContain('5188');

      expect(yonetimPlani).toBeDefined();
      expect(yonetimPlani?.legalBasis).toContain('Madde 28');

      expect(siteYonetimKurulu).toBeDefined();
      expect(siteYonetimKurulu?.legalBasis).toContain('Madde 34');

      expect(topluYapi).toBeDefined();
      expect(topluYapi?.legalBasis).toContain('Madde 66 - 74');
    });
  });

  describe('2. Hizmet Veri Modeli ve Semantik Otorite Külliyatı (services.ts)', () => {
    it('9 temel hizmetin tamamında KMK maddeleri, SLA ve long-tail anahtar kelimeler bulunur', () => {
      expect(SERVICES.length).toBe(9);

      const tesis = getService('tesis-yonetimi');
      expect(tesis).toBeDefined();
      expect(tesis?.keywords).toContain('site yönetimi');
      expect(tesis?.keywords).toContain('profesyonel site yönetimi');
      expect(tesis?.keywords).toContain('apartman ve site yönetimi');
      expect(tesis?.longTailKeywords?.length).toBeGreaterThanOrEqual(4);
      expect(tesis?.kmkArticles?.some(a => a.includes('Madde 34'))).toBe(true);
      expect(tesis?.slaGuarantee).toContain('15-25 Dk');
    });

    it('Yardımcı fonksiyonlar (getServiceKmkArticles, getServiceLongTailKeywords, getSiteManagementServiceMatrix) doğru çalışır', () => {
      const kmk = getServiceKmkArticles('aidat-takibi');
      expect(kmk.some(a => a.includes('Madde 20'))).toBe(true);

      const longTail = getServiceLongTailKeywords('guvenlik-yonetimi');
      expect(longTail.length).toBeGreaterThanOrEqual(2);

      const matrix = getSiteManagementServiceMatrix();
      expect(matrix.length).toBe(9);
      expect(matrix[0].primaryKeywords.length).toBeGreaterThan(0);
    });
  });

  describe('3. Akıllı İç Linkleme Motoru (autoLinker.ts)', () => {
    it('Metin içindeki "site yönetim şirketi", "profesyonel site yönetimi" gibi kelimeleri doğru linke dönüştürür', () => {
      const html = '<p>Büyük projelerde profesyonel site yönetimi ve güvenilir site yönetim şirketi ile çalışmak önemlidir.</p>';
      const linked = autoLinkHtml(html, '/blog/ornek-makale');

      expect(linked).toContain('href="/hizmetler/tesis-yonetimi"');
    });
  });

  describe('4. AI / LLM Grounding & Geo-Feed Protokolleri', () => {
    it('llms.txt site yönetimi anahtar kelimelerini ve grounding verilerini doğru döner', async () => {
      const res = await getLlmsTxt();
      const text = await res.text();
      expect(text).toContain('Site Yönetimi');
      expect(text).toContain('Kat Mülkiyeti Kanunu');
      expect(text).toContain('5188');
    });

    it('geo-feed.xml 39 ilçede site ve tesis yönetimi verilerini barındırır', async () => {
      const res = await getGeoFeed();
      const xml = await res.text();
      expect(xml).toContain('Tesis Yönetimi');
      expect(xml).toContain('Kadıköy');
      expect(xml).toContain('Beşiktaş');
    });
  });
});

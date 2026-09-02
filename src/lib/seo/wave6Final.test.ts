import { describe, it, expect } from 'vitest';
import {
  buildMetadata,
  validateCanonicalUrl,
  sanitizeCanonicalUrl,
  localizedUrl,
  LOCALES,
} from '../seo';
import {
  runFacilitySerpRankSimulation,
  simulatePageOnPageSeo,
} from './facilityRankSimulator';

describe('Wave 6 Final: Faz 146 - Faz 150 Kanonik URL Kontrolü, SERP Sıralama Simülatörü, OpenGraph/Twitter & Bütünsel Testler', () => {
  it('Faz 146: sanitizeCanonicalUrl takip parametrelerini temizler ve validateCanonicalUrl self-referencing doğrular', () => {
    const dirtyUrl = 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi?utm_source=google&fbclid=xyz123';
    const cleanUrl = sanitizeCanonicalUrl(dirtyUrl);
    expect(cleanUrl).toBe('https://aloyonetim.com.tr/hizmetler/tesis-yonetimi');

    const check = validateCanonicalUrl(
      'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi',
      '/hizmetler/tesis-yonetimi',
      'tr'
    );
    expect(check.isValid).toBe(true);
    expect(check.issues).toHaveLength(0);

    const checkDirty = validateCanonicalUrl(dirtyUrl, '/hizmetler/tesis-yonetimi', 'tr');
    expect(checkDirty.isValid).toBe(false);
    expect(checkDirty.issues.length).toBeGreaterThan(0);
  });

  it('Faz 147: runFacilitySerpRankSimulation ve simulatePageOnPageSeo sayfa içi ve bölgesel SEO puanını simüle eder', () => {
    // 39 ilçe SERP simülasyonu
    const serpReport = runFacilitySerpRankSimulation();
    expect(serpReport.totalDistrictsSimulated).toBe(39);
    expect(serpReport.overallAverageRankPotential).toBeGreaterThanOrEqual(75);
    expect(serpReport.topPerformingDistricts.length).toBe(5);

    // Tekil sayfa içi on-page SEO puanlama simülasyonu
    const pageSim = simulatePageOnPageSeo({
      url: 'https://aloyonetim.com.tr/hizmetler/tesis-yonetimi',
      title: 'Profesyonel Tesis Yönetimi ve Site Hizmetleri İstanbul',
      description: 'İstanbul genelinde 39 ilçede 634 sayılı KMK ve ISO 41001 standartlarında profesyonel tesis yönetimi ve bütçe tasarrufu için hemen teklif alın.',
      content: 'Tesis yönetimi alanında uzman kadromuz ile 634 sayılı Kat Mülkiyeti Kanunu ve ISO 41001 uluslararası standartlarında hizmet sunuyoruz. ' +
        'Apartman ve site yönetiminde aidat tahsilatı, güvenlik, temizlik ve teknik bakım süreçlerini tek çatı altında topluyoruz. '.repeat(25),
      targetKeyword: 'tesis yönetimi',
    });

    expect(pageSim.score).toBe(100);
    expect(pageSim.grade).toBe('A+');
    expect(pageSim.checks.keywordInTitle).toBe(true);
    expect(pageSim.checks.hasLegalOrStandardCitation).toBe(true);
  });

  it('Faz 148: buildMetadata 4 dil için og:locale ve eksiksiz og:locale:alternate üretir', () => {
    for (const lang of LOCALES) {
      const meta = buildMetadata({
        title: 'Tesis Yönetimi',
        description: 'İstanbul profesyonel tesis yönetimi hizmetleri.',
        path: '/hizmetler/tesis-yonetimi',
        lang,
      });

      expect(meta.openGraph).toBeDefined();
      expect(meta.openGraph?.locale).toBeDefined();
      expect(meta.openGraph?.alternateLocale).toBeDefined();
      // Seçili dil dışındaki diğer 3 dil alternatif locale olarak listelenmeli
      expect((meta.openGraph?.alternateLocale as string[]).length).toBe(3);
    }
  });

  it('Faz 149: buildMetadata Twitter Cards için summary_large_image ve geçerli görselleri yapılandırır', () => {
    const meta = buildMetadata({
      title: 'Özel Güvenlik Yönetimi',
      description: '5188 sayılı kanun kapsamında profesyonel güvenlik.',
      path: '/hizmetler/guvenlik-yonetimi',
      lang: 'tr',
    });

    expect(meta.twitter).toBeDefined();
    expect((meta.twitter as any)?.card).toBe('summary_large_image');
    expect(meta.twitter?.title).toBe('Özel Güvenlik Yönetimi');
    expect(meta.twitter?.description).toBe('5188 sayılı kanun kapsamında profesyonel güvenlik.');
    expect(meta.twitter?.images).toBeDefined();
  });

  it('Faz 150: localizedUrl ve alternates tüm 4 dil için kusursuz kanonik ve hreflang eşleşmesi sağlar', () => {
    const path = '/hizmetler/tesis-yonetimi';
    const trUrl = localizedUrl(path, 'tr');
    const enUrl = localizedUrl(path, 'en');
    const ruUrl = localizedUrl(path, 'ru');
    const arUrl = localizedUrl(path, 'ar');

    expect(trUrl).toBe('https://aloyonetim.com.tr/hizmetler/tesis-yonetimi');
    expect(enUrl).toBe('https://aloyonetim.com.tr/en/hizmetler/tesis-yonetimi');
    expect(ruUrl).toBe('https://aloyonetim.com.tr/ru/hizmetler/tesis-yonetimi');
    expect(arUrl).toBe('https://aloyonetim.com.tr/ar/hizmetler/tesis-yonetimi');
  });
});

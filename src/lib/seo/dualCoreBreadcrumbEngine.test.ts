import { describe, it, expect } from 'vitest';
import {
  buildDualCoreBreadcrumb,
  buildBreadcrumbJsonLd,
  buildSiloNavigationLinks,
  buildDualCoreSitelinksSchema,
  buildPillarNavigationSchema,
  validateSiloIntegrity,
} from './dualCoreBreadcrumbEngine';

describe('Dinamik Silo Breadcrumb & Hiyerarşik Otorite Motoru (dualCoreBreadcrumbEngine.test.ts)', () => {
  describe('1. buildDualCoreBreadcrumb Sayfa Tipleri Testleri (Faz 206-223)', () => {
    it('Site dikeyinde hizmet sayfası için 4 adımlı silo trail üretir', () => {
      const output = buildDualCoreBreadcrumb({
        pageType: 'service',
        serviceSlug: 'aidat-takibi',
        pillar: 'site',
      });

      expect(output.trail.length).toBe(4);
      expect(output.trail[0].name).toBe('Ana Sayfa');
      expect(output.trail[1].name).toBe('Hizmetler');
      expect(output.trail[2].name).toBe('Site Yönetim Hizmetleri');
      expect(output.trail[3].name).toBe('Aidat Takibi & Bütçe');
    });

    it('Tesis dikeyinde alt sektör sayfası için doğru hiyerarşi üretir', () => {
      const output = buildDualCoreBreadcrumb({
        pageType: 'subsector',
        subsectorSlug: 'plaza-yonetimi',
        pillar: 'facility',
      });

      expect(output.trail.length).toBe(4);
      expect(output.trail[2].name).toBe('Tesis ve Site Yönetimi');
      expect(output.trail[3].name).toBe('Plaza & İş Merkezi Yönetimi');
    });

    it('İlçe sayfası için il ve ilçe adını içeren hiyerarşi üretir', () => {
      const output = buildDualCoreBreadcrumb({
        pageType: 'district',
        districtSlug: 'kadikoy',
        pillar: 'site',
      });

      expect(output.trail.length).toBe(4);
      expect(output.trail[1].name).toBe('Hizmet Bölgelerimiz');
      expect(output.trail[2].name).toBe('İstanbul');
      expect(output.trail[3].name).toBe('Kadıköy Site Yönetimi');
    });

    it('Blog sayfası için kategori ve başlık içeren hiyerarşi üretir', () => {
      const output = buildDualCoreBreadcrumb({
        pageType: 'blog',
        blogCategory: 'Hukuk',
        blogTitle: 'KMK 634 Sayılı Kanun Rehberi',
        blogSlug: 'kmk-634-rehberi',
      });

      expect(output.trail.length).toBe(4);
      expect(output.trail[1].name).toBe('Blog');
      expect(output.trail[2].name).toBe('Hukuk');
      expect(output.trail[3].name).toBe('KMK 634 Sayılı Kanun Rehberi');
    });

    it('Sözlük sayfası için terim içeren hiyerarşi üretir', () => {
      const output = buildDualCoreBreadcrumb({
        pageType: 'sozluk',
        termSlug: 'isletme-projesi',
        termName: 'İşletme Projesi Nedir?',
      });

      expect(output.trail.length).toBe(3);
      expect(output.trail[1].name).toBe('Tesis Yönetimi Sözlüğü');
      expect(output.trail[2].name).toBe('İşletme Projesi Nedir?');
    });

    it('İngilizce parametresi verildiğinde dil uyumlu başlıklar üretir', () => {
      const output = buildDualCoreBreadcrumb({
        pageType: 'service',
        serviceSlug: 'tesis-yonetimi',
        pillar: 'facility',
        lang: 'en',
      });

      expect(output.trail[0].name).toBe('Home');
      expect(output.trail[1].name).toBe('Services');
      expect(output.trail[2].name).toBe('Facility Management');
    });
  });

  describe('2. Schema.org JSON-LD ve Ek Şemalar (Faz 224-245)', () => {
    it('buildBreadcrumbJsonLd geçerli BreadcrumbList şeması üretir', () => {
      const trail = [
        { name: 'Ana Sayfa', url: 'https://aloyonetim.com' },
        { name: 'Hizmetler', url: 'https://aloyonetim.com/hizmetler' },
        { name: 'Site Yönetimi', url: 'https://aloyonetim.com/hizmetler/tesis-yonetimi' },
      ];

      const jsonLd = buildBreadcrumbJsonLd(trail);
      expect(jsonLd['@type']).toBe('BreadcrumbList');
      expect(jsonLd.itemListElement.length).toBe(3);
      expect(jsonLd.itemListElement[0].position).toBe(1);
    });

    it('buildDualCoreSitelinksSchema SearchAction içeren WebSite şeması üretir', () => {
      const sitelinks = buildDualCoreSitelinksSchema('site');
      expect(sitelinks['@type']).toBe('WebSite');
      expect(sitelinks.potentialAction['@type']).toBe('SearchAction');
      expect(sitelinks.potentialAction.target.urlTemplate).toContain('site-ara=');
    });

    it('buildPillarNavigationSchema SiteNavigationElement listesi üretir', () => {
      const navSchema = buildPillarNavigationSchema('facility');
      expect(navSchema['@type']).toBe('ItemList');
      expect(navSchema.itemListElement.length).toBeGreaterThanOrEqual(4);
      expect(navSchema.itemListElement[0]['@type']).toBe('SiteNavigationElement');
    });

    it('validateSiloIntegrity silo zincirinin bütünlüğünü doğrular', () => {
      const audit = validateSiloIntegrity('site');
      expect(audit.isValid).toBe(true);
      expect(audit.checkedPages).toBe(3);
    });
  });
});

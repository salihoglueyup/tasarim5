import { describe, it, expect } from 'vitest';
import { GROUP_COMPANIES_ECOSYSTEM, generateGroupCompaniesSchema, renderGroupCompanyLink } from './facilityGroupAndLegalEcosystem';
import { OFFICIAL_LEGAL_CITATIONS, generateExternalCitationsSchema, renderExternalCitationLink } from './facilityExternalCitations';
import { getCrossServiceLinks } from './facilityCrossServiceLinker';
import { buildFacilityCompleteLinkGraph } from './facilityLinkGraphBuilder';
import { GROUP_COMPANIES, ORG_SAME_AS } from '@/lib/schemas';

describe('Grup Şirketleri, Resmi Mevzuat & İç/Dış Linkleme Mimarisi (Faz 12)', () => {
  describe('Grup Şirketleri Ekosistemi (Alo Güvenlik & 3G Güvenlik)', () => {
    it('Alo Güvenlik ve 3G Güvenlik varlıklarını eksiksiz barındırır', () => {
      const aloGuvenlik = GROUP_COMPANIES_ECOSYSTEM.find((c) => c.id === 'alo-guvenlik');
      const g3Guvenlik = GROUP_COMPANIES_ECOSYSTEM.find((c) => c.id === '3g-guvenlik');

      expect(aloGuvenlik).toBeDefined();
      expect(aloGuvenlik?.url).toBe('https://www.guvenlikkursu.com/');
      expect(g3Guvenlik).toBeDefined();
      expect(g3Guvenlik?.url).toBe('https://3gguvenlik.com/');

      expect(ORG_SAME_AS).toContain('https://www.guvenlikkursu.com/');
      expect(ORG_SAME_AS).toContain('https://3gguvenlik.com/');
    });

    it('Grup şirketleri için geçerli Organization şeması ve güvenli link üretir', () => {
      const schemas = generateGroupCompaniesSchema();
      expect(schemas).toHaveLength(2);
      expect(schemas[0]['@type']).toBe('Organization');

      const linkHtml = renderGroupCompanyLink('alo-guvenlik');
      expect(linkHtml).toContain('href="https://www.guvenlikkursu.com/"');
      expect(linkHtml).toContain('rel="noopener noreferrer"');
    });
  });

  describe('Resmi Mevzuat & Yasal Dış Otorite Linkleri (E-E-A-T)', () => {
    it('634 KMK, 5188 Güvenlik ve ISO standartlarını doğrulanmış dış kaynaklarla sunar', () => {
      const kmk = OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === 'kmk-634');
      const iso = OFFICIAL_LEGAL_CITATIONS.find((c) => c.id === 'iso-41001');

      expect(kmk?.url).toContain('mevzuat.gov.tr');
      expect(iso?.url).toContain('iso.org');

      const citationSchemas = generateExternalCitationsSchema();
      expect(citationSchemas.length).toBeGreaterThanOrEqual(5);

      const linkHtml = renderExternalCitationLink('kmk-634');
      expect(linkHtml).toContain('rel="noopener noreferrer"');
    });
  });

  describe('Kardeş Hizmetlerden Tesis Hub\'ına Çapraz İç Linkleme', () => {
    it('Güvenlik ve Teknik Bakım sayfaları için amiral gemisi Tesis Yönetimi linkleri döner', () => {
      const securityCrossLinks = getCrossServiceLinks('guvenlik-yonetimi', 'tr');
      expect(securityCrossLinks.length).toBeGreaterThanOrEqual(2);
      expect(securityCrossLinks[0].url).toBe('/hizmetler/tesis-yonetimi');
    });
  });

  describe('İç ve Dış Link Grafiği Hesaplayıcısı (buildFacilityCompleteLinkGraph)', () => {
    it('Tüm ekosistemi kapsayan yüksek E-E-A-T link otorite skoru üretir', () => {
      const report = buildFacilityCompleteLinkGraph();

      expect(report.totalNodes).toBeGreaterThan(45);
      expect(report.groupCompaniesConnected).toBe(2);
      expect(report.officialCitationsConnected).toBeGreaterThanOrEqual(5);
      expect(report.linkAuthorityScore).toBeGreaterThanOrEqual(80);
    });
  });
});

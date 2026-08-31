import { describe, it, expect } from 'vitest';
import {
  buildOrganizationSchema,
  buildPersonSchema,
  buildAuthorEntitySchema,
  buildConceptEntitySchema,
  buildServiceEntitySchema,
  buildAreaServedEntitySchema,
  buildKnowledgeGraphMap,
  buildLegalServiceSchema,
  buildFinancialServiceSchema,
  buildEEATSignalBundle,
  auditEEATScore,
  buildLegalDisclaimerSchema,
  buildCitationList,
  CORPORATE_CREDENTIALS,
  CORPORATE_MEMBERSHIPS,
} from './dualCoreKnowledgePanelEngine';

describe('BÖLÜM H — 🌐 Google Knowledge Panel & Varlık Grafiği (dualCoreKnowledgePanelEngine.test.ts)', () => {
  /* =========================================================================
   * H1 — ORGANİZASYON & MARKA VARLIĞI (Faz 106-118)
   * ========================================================================= */
  describe('H1: Organizasyon & Marka Varlığı Şemaları (Faz 106-118)', () => {
    it('buildOrganizationSchema üçlü tip, NAP, ISO sertifikaları ve contactPoint içerir', () => {
      const org = buildOrganizationSchema();
      expect(org['@context']).toBe('https://schema.org');
      expect(org['@type']).toContain('Organization');
      expect(org['@type']).toContain('LocalBusiness');
      expect(org['@type']).toContain('ProfessionalService');
      expect(org.name).toBe('Alo Yönetim');
      expect(org.legalName).toContain('Alo Yönetim');
      expect(org.founder).toBeDefined();
      expect(org.contactPoint).toBeInstanceOf(Array);
      expect((org.contactPoint as unknown[]).length).toBeGreaterThanOrEqual(2);
    });

    it('buildOrganizationSchema sameAs listesinde en az 3 harici profil URL bulundurur', () => {
      const org = buildOrganizationSchema();
      expect(org.sameAs).toBeInstanceOf(Array);
      expect((org.sameAs as string[]).length).toBeGreaterThanOrEqual(3);
      expect((org.sameAs as string[]).some((url) => url.includes('linkedin'))).toBe(true);
    });

    it('buildPersonSchema ve buildAuthorEntitySchema E-E-A-T için uzman profilleri üretir', () => {
      const author = buildAuthorEntitySchema({
        authorName: 'Av. Mehmet Yılmaz',
        roleTitle: 'Kat Mülkiyeti Hukuk Danışmanı',
        expertiseArea: ['KMK 634', 'Aidat İcra Davaları', 'Genel Kurul'],
        certifications: ['İstanbul Barosu Sicil No: 48921'],
        linkedinUrl: 'https://linkedin.com/in/mehmetyilmaz',
      });
      expect(author['@type']).toBe('Person');
      expect(author.name).toBe('Av. Mehmet Yılmaz');
      expect(author.knowsAbout).toContain('KMK 634');
      expect(author.sameAs).toContain('https://linkedin.com/in/mehmetyilmaz');
    });
  });

  /* =========================================================================
   * H2 — PİLLAR VARLIK AĞI & KAVRAMSAL HARİTALAMA (Faz 119-131)
   * ========================================================================= */
  describe('H2: Varlık Ağı & Haritalama (Faz 119-131)', () => {
    it('buildConceptEntitySchema DefinedTerm formatında site ve tesis varlıkları üretir', () => {
      const siteConcept = buildConceptEntitySchema('site', 'site');
      expect(siteConcept['@type']).toBe('DefinedTerm');
      expect(siteConcept.name).toContain('Site Yönetimi');

      const facilityConcept = buildConceptEntitySchema('facility', 'facility');
      expect(facilityConcept.name).toContain('Tesis Yönetimi');
    });

    it('buildServiceEntitySchema geçerli Service şeması üretir', () => {
      const service = buildServiceEntitySchema('tesis-yonetimi', 'facility');
      expect(service['@type']).toBe('Service');
      expect(service.provider['@type']).toBe('Organization');
      expect(service.provider.name).toBe('Alo Yönetim');
    });

    it('buildAreaServedEntitySchema City tipinde ilçe varlığı üretir', () => {
      const kadikoy = buildAreaServedEntitySchema('kadikoy');
      expect(kadikoy['@type']).toBe('City');
      expect(kadikoy.name).toBe('Kadıköy, İstanbul');
      expect(kadikoy.geo.latitude).toBeDefined();
    });

    it('buildLegalServiceSchema ve buildFinancialServiceSchema özel şemaları üretir', () => {
      const legal = buildLegalServiceSchema();
      expect(legal['@type']).toBe('LegalService');
      expect(legal.name).toContain('Kat Mülkiyeti Hukuku');

      const financial = buildFinancialServiceSchema();
      expect(financial['@type']).toBe('FinancialService');
      expect(financial.name).toContain('Aidat Takip');
    });

    it('buildKnowledgeGraphMap en az 5 bağlı varlık içeren bir @graph üretir', () => {
      const kg = buildKnowledgeGraphMap('site');
      expect(kg['@context']).toBe('https://schema.org');
      expect(kg['@graph']).toBeInstanceOf(Array);
      expect(kg['@graph'].length).toBeGreaterThanOrEqual(5);
    });
  });

  /* =========================================================================
   * H3 — E-E-A-T SİNYAL ÜRETİM MOTORU (Faz 132-145)
   * ========================================================================= */
  describe('H3: E-E-A-T Sinyalleri & Doğrulama (Faz 132-145)', () => {
    it('buildEEATSignalBundle 4 temel sütunun (E-E-A-T) tamamında kanıtlar içerir', () => {
      const bundleSite = buildEEATSignalBundle('service', 'site');
      expect(bundleSite.experienceSignals.length).toBeGreaterThanOrEqual(3);
      expect(bundleSite.expertiseSignals.length).toBeGreaterThanOrEqual(3);
      expect(bundleSite.authoritativenessSignals.length).toBeGreaterThanOrEqual(3);
      expect(bundleSite.trustworthinessSignals.length).toBeGreaterThanOrEqual(3);
      expect(bundleSite.overallScore).toBeGreaterThanOrEqual(90);

      const bundleFacility = buildEEATSignalBundle('service', 'facility');
      expect(bundleFacility.experienceSignals.some((s) => s.proof.includes('1.200.000+ m²'))).toBe(true);
    });

    it('auditEEATScore sinyal varlığına göre doğru puan hesaplar', () => {
      const fullPass = auditEEATScore({
        hasAuthor: true,
        hasCredentials: true,
        hasCitations: true,
        hasNAP: true,
        hasCaseStudy: true,
        hasHttps: true,
      });
      expect(fullPass).toBe(100);

      const partialPass = auditEEATScore({
        hasAuthor: true,
        hasCredentials: true,
        hasCitations: false,
        hasNAP: true,
        hasCaseStudy: false,
        hasHttps: true,
      });
      expect(partialPass).toBe(70);
    });

    it('buildLegalDisclaimerSchema yasal sorumluluk reddi metnini üretir', () => {
      const disclaimer = buildLegalDisclaimerSchema();
      expect(disclaimer['@type']).toBe('CreativeWork');
      expect(disclaimer.description).toContain('1136');
    });

    it('buildCitationList Tesis dikeyinde en az 4 resmî kaynak URL içerir', () => {
      const citations = buildCitationList('facility');
      expect(citations.length).toBeGreaterThanOrEqual(4);
      expect(citations.some((c) => c.url.includes('mevzuat.gov.tr'))).toBe(true);
      expect(citations.some((c) => c.url.includes('iso.org'))).toBe(true);
    });
  });
});

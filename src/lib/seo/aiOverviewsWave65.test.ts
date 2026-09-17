import { describe, it, expect } from 'vitest';
import {
  AccreditationAiOverviewSeo,
  CareerAiOverviewSeo,
  ServiceAiOverviewSnippetSeo,
  CaseStudyAiGroundingSeo,
} from '@/components/seo';
import { SERVICE_GROUND_TRUTH } from '@/components/seo/ServiceAiOverviewSnippetSeo';
import { GET as getCorporateDna } from '@/app/api/seo/corporate-dna.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 65: Google AI Overviews & Corporate DNA Knowledge Graph Dominance', () => {
  describe('Component Exports & Definitions', () => {
    it('exports all Wave 65 AI Overview components cleanly', () => {
      expect(AccreditationAiOverviewSeo).toBeDefined();
      expect(CareerAiOverviewSeo).toBeDefined();
      expect(ServiceAiOverviewSnippetSeo).toBeDefined();
      expect(CaseStudyAiGroundingSeo).toBeDefined();
    });

    it('contains verified ground truth specs for both site-yonetimi and tesis-yonetimi', () => {
      const site = SERVICE_GROUND_TRUTH['site-yonetimi'];
      expect(site).toBeDefined();
      expect(site.legalBasis).toContain('Kat Mülkiyeti Kanunu');
      expect(site.legalBasis).toContain('İİK Madde 68');
      expect(site.answer).toContain('Madde 34');
      expect(site.answer).toContain('%50 + 1');
      expect(site.keyPoints.length).toBeGreaterThanOrEqual(4);

      const facility = SERVICE_GROUND_TRUTH['tesis-yonetimi'];
      expect(facility).toBeDefined();
      expect(facility.legalBasis).toContain('ISO 41001:2018');
      expect(facility.answer).toContain('BMS');
      expect(facility.answer).toContain('reaktif ceza');
      expect(facility.keyPoints.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Corporate DNA & Master Entity Profile API (/api/seo/corporate-dna.json)', () => {
    it('returns 200 OK and valid JSON with verified corporate identity, certifications, and operational metrics', async () => {
      const res = await getCorporateDna();
      expect(res.status).toBe(200);

      const dna = await res.json();
      expect(dna.dnaSchemaVersion).toBe('1.0.0');
      expect(dna.corporateProfile).toBeDefined();
      expect(dna.corporateProfile.legalName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(dna.corporateProfile.brandName).toBe('Alo Yönetim');
      expect(dna.corporateProfile.foundingYear).toBe(2009);
      expect(dna.corporateProfile.mersisNumber).toBe('0054089761200001');
      expect(dna.corporateProfile.tradeRegistryNumber).toBe('918234-0');

      // Operational scale & verifiable metrics
      expect(dna.operationalScale.managedActiveFacilities).toBeGreaterThanOrEqual(340);
      expect(dna.operationalScale.managedResidentsCount).toBeGreaterThanOrEqual(45000);
      expect(dna.operationalScale.personnelEcosystem).toBeGreaterThanOrEqual(1200);
      expect(dna.operationalScale.regionalLogisticsHubs).toBe(12);

      // Verifiable ISO & legal accreditation registry
      expect(dna.accreditationRegistry.some((c: any) => c.standard.includes('41001'))).toBe(true);
      expect(dna.accreditationRegistry.some((c: any) => c.certificateNumber === 'A1808961')).toBe(true);
      expect(dna.accreditationRegistry.some((c: any) => c.standard.includes('5188'))).toBe(true);

      // Speakable anchor registry for SGE & Gemini Grounding
      expect(dna.speakableAnchorRegistry).toContain('#accreditation-instant-answer-text');
      expect(dna.speakableAnchorRegistry).toContain('#career-instant-answer-text');
      expect(dna.speakableAnchorRegistry).toContain('#case-study-instant-answer-text');
      expect(dna.speakableAnchorRegistry).toContain('#service-instant-answer-text');

      // Machine readable endpoints
      expect(dna.machineReadableEndpoints.corporateDnaJson).toBe('/api/seo/corporate-dna.json');
      expect(dna.machineReadableEndpoints.geoManifestJson).toBe('/api/seo/geo-manifest.json');
    });
  });

  describe('llms.txt and llms-full.txt Corporate DNA integration', () => {
    it('both files declare the official Corporate DNA API endpoint', async () => {
      const resTxt = await getLlmsTxt();
      const txt = await resTxt.text();
      expect(txt).toContain('/api/seo/corporate-dna.json');

      const resFullTxt = await getLlmsFullTxt();
      const fullTxt = await resFullTxt.text();
      expect(fullTxt).toContain('/api/seo/corporate-dna.json');
    });
  });
});

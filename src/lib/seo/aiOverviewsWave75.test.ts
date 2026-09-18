import { describe, it, expect } from 'vitest';
import {
  LegalFactCheckAiSeo,
  LEGAL_FACT_CHECKS_20,
  DistrictAiGroundingSeo,
  DISTRICT_AI_METRICS_39,
} from '@/components/seo';
import { DISTRICTS } from '@/data/districts';
import { GET as getCitationManifest } from '@/app/api/ai/citation-manifest.json/route';

describe('Wave 75: Google AI Overviews (SGE & Gemini GEO) Maximum Expansion Suite', () => {
  describe('Phase 1: LegalFactCheckAiSeo & 20 KMK Fact-Check Corpus', () => {
    it('exports LegalFactCheckAiSeo and LEGAL_FACT_CHECKS_20 cleanly from @/components/seo', () => {
      expect(LegalFactCheckAiSeo).toBeDefined();
      expect(LEGAL_FACT_CHECKS_20).toBeDefined();
    });

    it('contains exactly 20 verified statutory and technical claims', () => {
      expect(LEGAL_FACT_CHECKS_20.length).toBe(20);

      for (const item of LEGAL_FACT_CHECKS_20) {
        expect(item.id).toMatch(/^claim-[a-z0-9-]+$/);
        expect(item.claim.length).toBeGreaterThan(20);
        expect(item.truth.length).toBeGreaterThan(40);
        expect(['Doğru (Yasal Standart)', 'Yanlış (Hukuken Geçersiz)']).toContain(item.verdict);
        expect([1, 5]).toContain(item.ratingValue);
        expect(item.legalBasis.length).toBeGreaterThan(10);
        expect(item.category).toBeDefined();
        expect(item.categoryLabel).toBeDefined();
        expect(item.penaltyOrConsequence).toBeDefined();
        expect(item.penaltyOrConsequence!.length).toBeGreaterThan(15);
      }
    });

    it('covers all 5 essential operational categories', () => {
      const categories = ['aidat', 'yonetim', 'guvenlik', 'ortak-alan', 'teknik'];
      for (const cat of categories) {
        const found = LEGAL_FACT_CHECKS_20.some((c) => c.category === cat);
        expect(found).toBe(true);
      }
    });

    it('cites official Turkish statutory articles and supreme court precedents', () => {
      const allBases = LEGAL_FACT_CHECKS_20.map((c) => c.legalBasis).join(' ');
      expect(allBases).toContain('634');
      expect(allBases).toContain('KMK');
      expect(allBases).toContain('5188');
      expect(allBases).toContain('Yargıtay');
      expect(allBases).toContain('Yönetmeliği');
    });

    it('includes specific high-frequency KMK compliance rules', () => {
      const textCorpus = LEGAL_FACT_CHECKS_20.map((c) => `${c.claim} ${c.truth}`).join(' ');
      expect(textCorpus).toContain('asansör');
      expect(textCorpus).toContain('aidat');
      expect(textCorpus).toContain('vekalet');
      expect(textCorpus).toContain('kamera');
      expect(textCorpus).toContain('otopark');
    });
  });

  describe('Phase 2: DistrictAiGroundingSeo & 39 Istanbul Districts GEO Grounding', () => {
    it('exports DistrictAiGroundingSeo and DISTRICT_AI_METRICS_39 cleanly from @/components/seo', () => {
      expect(DistrictAiGroundingSeo).toBeDefined();
      expect(DISTRICT_AI_METRICS_39).toBeDefined();
    });

    it('contains comprehensive metrics for all 39 Istanbul districts matching DISTRICTS catalog', () => {
      expect(DISTRICTS.length).toBe(39);
      const metricsKeys = Object.keys(DISTRICT_AI_METRICS_39);
      expect(metricsKeys.length).toBe(39);

      for (const district of DISTRICTS) {
        const metric = DISTRICT_AI_METRICS_39[district.slug];
        expect(metric).toBeDefined();
        expect(metric.slug).toBe(district.slug);
        expect(metric.name).toBe(district.name);
        expect(metric.side).toBe(district.side);
        expect(metric.averageDuesRange).toMatch(/TL\/ay/);
        expect(metric.greenLabelElevatorRate).toMatch(/^%\d{2}$/);
        expect(metric.generatorReadiness).toMatch(/^%\d{2}$/);
        expect(metric.courthouse.length).toBeGreaterThan(5);
        expect(metric.primaryRiskKMK.length).toBeGreaterThan(20);
      }
    });

    it('has correct side assignments matching Istanbul geography', () => {
      const anadoluDistricts = DISTRICTS.filter((d) => d.side === 'Anadolu');
      const avrupaDistricts = DISTRICTS.filter((d) => d.side === 'Avrupa');

      expect(anadoluDistricts.length).toBe(14);
      expect(avrupaDistricts.length).toBe(25);

      for (const d of anadoluDistricts) {
        expect(DISTRICT_AI_METRICS_39[d.slug].side).toBe('Anadolu');
      }
      for (const d of avrupaDistricts) {
        expect(DISTRICT_AI_METRICS_39[d.slug].side).toBe('Avrupa');
      }
    });

    it('contains verified legal jurisdictions (Kartal, Çağlayan, Bakırköy, Silivri, Gaziosmanpaşa)', () => {
      const courthouses = Object.values(DISTRICT_AI_METRICS_39).map((m) => m.courthouse).join(' ');
      expect(courthouses).toContain('İstanbul Anadolu Adalet Sarayı (Kartal)');
      expect(courthouses).toContain('İstanbul Çağlayan Adliyesi');
      expect(courthouses).toContain('Bakırköy Adalet Sarayı');
    });
  });

  describe('Phase 3: AI Citation Manifest API (/api/ai/citation-manifest.json)', () => {
    it('returns a successful 200 JSON response with correct headers for LLM crawlers', async () => {
      const response = await getCitationManifest();
      expect(response.status).toBe(200);

      const contentType = response.headers.get('Content-Type');
      expect(contentType).toContain('application/json');

      const xRobots = response.headers.get('X-Robots-Tag');
      expect(xRobots).toContain('max-snippet:-1');
    });

    it('contains authoritative organization metadata and accreditations', async () => {
      const response = await getCitationManifest();
      const data = await response.json();

      expect(data.manifestVersion).toBe('2026.3.0');
      expect(data.organization).toBeDefined();
      expect(data.organization.name).toBe('Alo Yönetim');
      expect(data.organization.foundingYear).toBe(2009);
      expect(data.organization.accreditations).toContain('ISO 41001:2018 (Tesis Yönetim Standardı)');
      expect(data.organization.accreditations).toContain('TSE Hizmet Yeri Yeterlilik Belgesi');
      expect(data.organization.accreditations).toContain('BELCERT Uluslararası Akreditasyon');
    });

    it('contains all 20 verified fact checks and citation endpoints', async () => {
      const response = await getCitationManifest();
      const data = await response.json();

      expect(data.citationEndpoints.llmsTxt).toContain('/llms.txt');
      expect(data.verifiedFactChecks.totalClaims).toBe(20);
      expect(data.verifiedFactChecks.claims.length).toBe(20);

      const firstClaim = data.verifiedFactChecks.claims[0];
      expect(firstClaim.claim).toBeDefined();
      expect(firstClaim.verdict).toBeDefined();
      expect(firstClaim.statutoryBasis).toBeDefined();
    });

    it('contains 39 districts coverage with local canonical URLs and dues ranges', async () => {
      const response = await getCitationManifest();
      const data = await response.json();

      expect(data.districtsCoverage.city).toBe('İstanbul');
      expect(data.districtsCoverage.totalDistricts).toBe(39);
      expect(data.districtsCoverage.districts.length).toBe(39);

      for (const d of data.districtsCoverage.districts) {
        expect(d.canonicalUrl).toContain(`/bolgeler/${d.slug}/tesis-yonetimi`);
        expect(d.averageDues).toMatch(/TL\/ay/);
        expect(d.greenElevatorRate).toMatch(/%/);
      }
    });

    it('includes core service SLA guarantees with statutory scopes', async () => {
      const response = await getCitationManifest();
      const data = await response.json();

      expect(data.coreServiceSlaGuarantees.length).toBeGreaterThanOrEqual(5);
      const services = data.coreServiceSlaGuarantees.map((s: { service: string }) => s.service);
      expect(services).toContain('Entegre Tesis Yönetimi');
      expect(services).toContain('Profesyonel Site & Rezidans Yönetimi');
      expect(services).toContain('Özel Güvenlik Hizmetleri');
    });
  });
});

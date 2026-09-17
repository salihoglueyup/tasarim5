import { describe, it, expect } from 'vitest';
import {
  PeopleAlsoAskDeepTreeSeo,
  AccreditedCertificationsTrustSeo,
} from '@/components/seo';
import { PAA_DEEP_TREE_QUESTIONS } from '@/components/seo/ai-overviews/PeopleAlsoAskDeepTreeSeo';
import { VERIFIED_BELCERT_CREDENTIALS } from '@/components/seo/ai-overviews/AccreditedCertificationsTrustSeo';
import { GET as getCredentialsJson } from '@/app/api/seo/credentials.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 70: Google AI Overviews PAA Deep Tree & Accredited BELCERT Trust Badges', () => {
  describe('People Also Ask (PAA) Deep Tree Component & Ground Truths', () => {
    it('exports PeopleAlsoAskDeepTreeSeo cleanly', () => {
      expect(PeopleAlsoAskDeepTreeSeo).toBeDefined();
    });

    it('contains exactly 40 verified PAA statutory and technical questions', () => {
      expect(PAA_DEEP_TREE_QUESTIONS.length).toBe(40);

      for (const item of PAA_DEEP_TREE_QUESTIONS) {
        expect(item.id).toBeDefined();
        expect(item.question.length).toBeGreaterThan(15);
        expect(item.answer.length).toBeGreaterThan(50);
        expect(item.legalAnchor.length).toBeGreaterThan(5);
        expect(item.categoryLabel.length).toBeGreaterThan(3);
      }
    });

    it('covers all 4 primary operational clusters with exactly 10 questions each', () => {
      const categories: Array<'kmk-hukuku' | 'aidat-butce' | 'guvenlik-kamera' | 'teknik-asansor'> = [
        'kmk-hukuku',
        'aidat-butce',
        'guvenlik-kamera',
        'teknik-asansor',
      ];
      for (const cat of categories) {
        const count = PAA_DEEP_TREE_QUESTIONS.filter((q) => q.category === cat).length;
        expect(count).toBe(10);
      }
    });

    it('includes essential statutory citations (KMK 20, KMK 34, 5188, Asansör Yeşil Etiket)', () => {
      const allText = PAA_DEEP_TREE_QUESTIONS.map(
        (q) => `${q.question} ${q.answer} ${q.legalAnchor}`
      ).join(' ');
      expect(allText).toContain('634');
      expect(allText).toContain('Madde 20');
      expect(allText).toContain('5188');
      expect(allText.toLowerCase()).toContain('yeşil etiket');
      expect(allText.toLowerCase()).toContain('kompanzasyon');
    });

  });

  describe('Accredited BELCERT & ILAS Certifications Trust Verification', () => {
    it('exports AccreditedCertificationsTrustSeo cleanly', () => {
      expect(AccreditedCertificationsTrustSeo).toBeDefined();
    });

    it('contains exactly 7 authentic BELCERT certificates matching src/data/certificates.ts', () => {
      expect(VERIFIED_BELCERT_CREDENTIALS.length).toBe(7);

      for (const cert of VERIFIED_BELCERT_CREDENTIALS) {
        expect(cert.slug).toBeDefined();
        expect(cert.name.length).toBeGreaterThan(10);
        expect(cert.certificateNumber).toMatch(/^A180896[1-7]$/);
        expect(cert.sealNumber).toMatch(/^0647(86|87|89|90|91|92|94)$/);
        expect(cert.accreditation).toBe('ILAS ACCREDITED (ILAS-MS-0089)');
        expect(cert.issuer).toBe('BELCERT Uluslararası Belgelendirme Şirketi');
        expect(cert.verificationUrl).toBe('https://www.belcert.com');
        expect(cert.validUntil).toBeDefined();
      }
    });

    it('covers all standard ISO management systems (10002, 14001, 22301, 26000, 31000, 45001 and Doğaya Saygı)', () => {
      const names = VERIFIED_BELCERT_CREDENTIALS.map((c) => c.name).join(' ');
      expect(names).toContain('ISO 10002:2018');
      expect(names).toContain('ISO 14001:2026');
      expect(names).toContain('ISO 22301:2019');
      expect(names).toContain('ISO 26000:2021');
      expect(names).toContain('ISO 31000:2018');
      expect(names).toContain('ISO 45001:2018');
      expect(names).toContain('Doğaya Saygı');
    });
  });

  describe('Credentials Knowledge Graph API (/api/seo/credentials.json)', () => {
    it('returns a successful 200 JSON payload with verified metadata', async () => {
      const response = await getCredentialsJson();
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.authority).toBeDefined();
      expect(json.authority.brandName).toBe('Alo Yönetim');
      expect(json.accreditationRegistry).toBeDefined();
      expect(json.accreditationRegistry.issuer).toBe('BELCERT Uluslararası Belgelendirme Şirketi');
      expect(json.accreditationRegistry.accreditationBody).toBe('ILAS ACCREDITED (ILAS-MS-0089)');

      expect(json.certificatesList.length).toBe(7);
      expect(json.paaSummary.totalIndexedQuestions).toBe(40);
      expect(json.paaSummary.categories.length).toBe(4);
      expect(json.endpoints.credentialsJson).toContain('/api/seo/credentials.json');

      const headers = response.headers;
      expect(headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(headers.get('Content-Type')).toContain('application/json');
    });
  });

  describe('AI Search Manifests (llms.txt & llms-full.txt)', () => {
    it('references the Wave 70 credentials.json API in llms.txt', async () => {
      const response = await getLlmsTxt();
      const text = await response.text();
      expect(text).toContain('/api/seo/credentials.json');
      expect(text).toContain('Wave 70');
    });

    it('references the Wave 70 credentials.json API in llms-full.txt', async () => {
      const response = await getLlmsFullTxt();
      const text = await response.text();
      expect(text).toContain('/api/seo/credentials.json');
      expect(text).toContain('Wave 70');
    });
  });
});

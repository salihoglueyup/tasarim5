import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildLlmsFullText } from './llmsContent';

const ROOT = process.cwd();

function readRel(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

describe('Project-Wide SEO & Google AI Overviews Architecture Guard (Faz 1-5)', () => {
  describe('Faz 1: Single FAQPage JSON-LD Deduplication', () => {
    it('defaults DynamicFAQ emitSchema to false so secondary consumers do not create duplicate FAQPage nodes', () => {
      const src = readRel('src/components/seo/schema/DynamicFAQ.tsx');
      expect(src).toContain('emitSchema = false');
      expect(src).toContain('{emitSchema && <JsonLd data={faqPageSchema(faqs)} />}');
    });

    it('defaults secondary AI Overviews / KMK FAQ components to emitFaqSchema = false', () => {
      const secondaryComponents = [
        'src/components/seo/ai-overviews/PositionZeroAnswerBox.tsx',
        'src/components/seo/ai-overviews/InstantAnswerCardSeo.tsx',
        'src/components/seo/ai-overviews/GoogleAiOverviewGroundingSeo.tsx',
        'src/components/seo/ai-overviews/ServiceAiOverviewSnippetSeo.tsx',
        'src/components/seo/ai-overviews/FaqAiOverviewHubSeo.tsx',
        'src/components/seo/ai-overviews/PeopleAlsoAskDeepTreeSeo.tsx',
        'src/components/seo/ai-overviews/VoiceConversationalAiSnippetSeo.tsx',
        'src/components/seo/ai-overviews/HomeAiOverviewGroundingSeo.tsx',
        'src/components/seo/ai-overviews/CareerAiOverviewSeo.tsx',
        'src/components/seo/kmk/KMKLawAssistantSeo.tsx',
      ];

      for (const rel of secondaryComponents) {
        const src = readRel(rel);
        expect(src, `${rel} should default emitFaqSchema = false`).toContain('emitFaqSchema = false');
      }
    });

    it('merges route FAQs via extraFaqs in bolgeler and sozluk routes instead of emitting a second faqSchema script', () => {
      const mergedRoutes = [
        'src/app/[lang]/bolgeler/[ilce]/page.tsx',
        'src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx',
        'src/app/[lang]/bolgeler/[ilce]/mahalleler/[mahalle]/page.tsx',
        'src/app/[lang]/sozluk/[terim]/page.tsx',
      ];

      for (const rel of mergedRoutes) {
        const src = readRel(rel);
        expect(src, `${rel} should pass extraFaqs`).toContain('extraFaqs=');
        expect(src, `${rel} should not emit standalone faqSchema`).not.toContain('faqSchema(');
      }
    });
  });

  describe('Faz 2: Orphan speakableSelectors & AI Overview Barrel Export Integrity', () => {
    it('exports HubAiOverviewGroundingSeo alongside AccreditedCertificationsTrustSeo and VideoGroundingAiOverviewSeo in the barrel file', () => {
      const barrel = readRel('src/components/seo/ai-overviews/index.ts');
      expect(barrel).toContain('AccreditedCertificationsTrustSeo');
      expect(barrel).toContain('VideoGroundingAiOverviewSeo');
      expect(barrel).toContain('HubAiOverviewGroundingSeo');
    });

    it('keeps speakableSelectors aligned with real DOM IDs on hizmetler, bolgeler/[ilce]/[hizmet], sss, and teklif-al', () => {
      const hizmetlerPage = readRel('src/app/[lang]/hizmetler/page.tsx');
      expect(hizmetlerPage).toContain("'#instant-answer-text'");
      expect(hizmetlerPage).not.toContain("'#services-hub-instant-answer-text'");

      const bolgeHizmetPage = readRel('src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx');
      expect(bolgeHizmetPage).toContain("'#district-service-instant-answer-text'");

      const factCheck = readRel('src/components/seo/ai-overviews/FactCheckAiGroundingSeo.tsx');
      expect(factCheck).toContain("id={index === 0 ? 'factcheck-instant-answer-text' : undefined}");

      const teklifAlPage = readRel('src/app/[lang]/teklif-al/page.tsx');
      expect(teklifAlPage).not.toContain('#pricing-product-instant-answer-text');
    });
  });

  describe('Faz 3: generateStaticParams & indexPolicy Alignment', () => {
    it('restricts Turkish-only routes to lang: tr in generateStaticParams', () => {
      const trOnlyRoutes = [
        'src/app/[lang]/bolgeler/page.tsx',
        'src/app/[lang]/bolgeler/[ilce]/page.tsx',
        'src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx',
        'src/app/[lang]/bolgeler/[ilce]/mahalleler/page.tsx',
        'src/app/[lang]/bolgeler/[ilce]/mahalleler/[mahalle]/page.tsx',
        'src/app/[lang]/kmk-2026-degisiklikleri/page.tsx',
        'src/app/[lang]/sektorel-cozumler/[slug]/page.tsx',
        'src/app/[lang]/blog/kategori/[kategori]/page.tsx',
        'src/app/[lang]/blog/yazar/[yazar]/page.tsx',
        'src/app/[lang]/site-haritasi/page.tsx',
        'src/app/[lang]/app/page.tsx',
        'src/app/[lang]/guvenlik-akademisi/page.tsx',
      ];

      for (const rel of trOnlyRoutes) {
        const src = readRel(rel);
        expect(src, `${rel} must define generateStaticParams`).toContain('generateStaticParams');
        expect(src, `${rel} must not loop over all i18n.locales in generateStaticParams`).not.toContain(
          'for (const lang of i18n.locales)'
        );
        expect(src, `${rel} must not map all i18n.locales in generateStaticParams`).not.toContain(
          'i18n.locales.map'
        );
      }
    });

    it('restricts sozluk/[terim] generateStaticParams to canonical slugs and TRANSLATED_TERM_SLUGS for en/ru/ar', () => {
      const sozlukPage = readRel('src/app/[lang]/sozluk/[terim]/page.tsx');
      expect(sozlukPage).toContain('TRANSLATED_TERM_SLUGS');
      expect(sozlukPage).not.toContain('Object.keys(SOZLUK_SLUG_ALIASES)');
    });
  });

  describe('Faz 4: HubAiOverviewGroundingSeo on 5 Hub/Guide Pages', () => {
    it('wires HubAiOverviewGroundingSeo into bolgeler, referanslar, sektorel-cozumler, surdurulebilirlik, and tesis-yonetimi/rehber', () => {
      const hubPages: Array<{ rel: string; hubKey: string }> = [
        { rel: 'src/app/[lang]/bolgeler/page.tsx', hubKey: 'bolgeler' },
        { rel: 'src/app/[lang]/referanslar/page.tsx', hubKey: 'referanslar' },
        { rel: 'src/app/[lang]/sektorel-cozumler/page.tsx', hubKey: 'sektorel-cozumler' },
        { rel: 'src/app/[lang]/surdurulebilirlik/page.tsx', hubKey: 'surdurulebilirlik' },
        { rel: 'src/app/[lang]/hizmetler/tesis-yonetimi/rehber/page.tsx', hubKey: 'rehber' },
      ];

      for (const { rel, hubKey } of hubPages) {
        const src = readRel(rel);
        expect(src, `${rel} should render HubAiOverviewGroundingSeo`).toContain('HubAiOverviewGroundingSeo');
        expect(src, `${rel} should pass hubKey="${hubKey}"`).toContain(`hubKey="${hubKey}"`);
      }

      const rehberPage = readRel('src/app/[lang]/hizmetler/tesis-yonetimi/rehber/page.tsx');
      expect(rehberPage).toContain('emitFaqSchema={false}');
    });
  });

  describe('Faz 5: Law No. 7579 (2026 KMK m.37) Synchronization', () => {
    it('contains no outdated KMK m.37 "7 gün içinde itiraz edilmezse kesinleşir" claims in AI Overview and KMK components', () => {
      const kmk37Files = [
        'src/components/seo/ai-overviews/GoogleAiOverviewGroundingSeo.tsx',
        'src/components/seo/ai-overviews/ServiceAiOverviewSnippetSeo.tsx',
        'src/components/seo/ai-overviews/FactCheckAiGroundingSeo.tsx',
        'src/components/seo/ai-overviews/VoiceConversationalAiSnippetSeo.tsx',
        'src/components/seo/ai-overviews/AiOverviewStepSolverSeo.tsx',
        'src/components/seo/ai-overviews/GlossaryAiOverviewSeo.tsx',
        'src/components/seo/kmk/KMKOperatingBudgetGuideSeo.tsx',
        'src/data/kmkOperatingBudgetData.ts',
        'src/app/[lang]/hizmetler/aidat-takibi/AidatTakibiClient.tsx',
        'src/app/[lang]/hizmetler/tesis-yonetimi/TesisYonetimiClient.tsx',
      ];

      for (const rel of kmk37Files) {
        const src = readRel(rel);
        expect(src, `${rel} must reference 7579 sayılı Kanun or KMK m.37`).toContain('7579');
        expect(
          src,
          `${rel} must not claim the budget finalizes automatically if not objected to within 7 days`
        ).not.toMatch(/7 gün içinde itiraz edilmezse kesinleş/i);
      }
    });
  });

  describe('Faz 6: /llms-full.txt Deep Knowledge Graph & RAG Endpoint Index', () => {
    it('includes KMK m.20 expense rules, Law No. 7579 summary, canonical /sozluk/[terim] URLs, and /api/seo/*.json endpoints', () => {
      const fullText = buildLlmsFullText();
      expect(fullText).toContain('KMK Madde 20 Gider Paylaşım Esasları');
      expect(fullText).toContain('KMK m.20/1-a');
      expect(fullText).toContain('KMK m.20/1-b');
      expect(fullText).toContain('7579 Sayılı Kanun (22 Mayıs 2026) KMK Değişiklik Özeti');
      expect(fullText).toContain('/sozluk/aidat');
      expect(fullText).toContain('/api/seo/ai-overviews-rag.json');
      expect(fullText).toContain('/api/seo/credentials.json');
      expect(fullText).toContain('/api/seo/local-anchors.json');
      expect(fullText).toContain('/api/seo/corporate-dna.json');
      expect(fullText).toContain('/api/seo/geo-manifest.json');
    });
  });

  describe('Faz 7: Canonical DefinedTermSet URLs on /sozluk', () => {
    it('points DefinedTermSet entries on /sozluk to canonical /sozluk/[slug] pages instead of broken #hash anchors', () => {
      const sozlukHub = readRel('src/app/[lang]/sozluk/page.tsx');
      expect(sozlukHub).toContain('url: `/sozluk/${termToSlug(t.term)}`');
      expect(sozlukHub).not.toContain('/sozluk#');
    });
  });

  describe('Faz 8: 39 District Neighborhood Hub Pages (/bolgeler/[ilce]/mahalleler) AI Overviews & ItemList Schema', () => {
    it('emits ItemList JSON-LD, speakableSelectors, DistrictAiOverviewSeo, and district service cross-links', () => {
      const mahallelerHub = readRel('src/app/[lang]/bolgeler/[ilce]/mahalleler/page.tsx');
      expect(mahallelerHub).toContain("'@type': 'ItemList'");
      expect(mahallelerHub).toContain("'#district-ai-overview-answer'");
      expect(mahallelerHub).toContain('<DistrictAiOverviewSeo');
      expect(mahallelerHub).toContain('DISTRICT_CORE_SERVICES');
    });
  });

  describe('Faz 9: Blog Category & Author E-E-A-T and Speakable Grounding', () => {
    it('wires #category-ai-overview-answer and #author-bio-summary into speakableSelectors and DOM', () => {
      const catPage = readRel('src/app/[lang]/blog/kategori/[kategori]/page.tsx');
      expect(catPage).toContain("'#category-ai-overview-answer'");
      expect(catPage).toContain('id="category-ai-overview-answer"');

      const authorPage = readRel('src/app/[lang]/blog/yazar/[yazar]/page.tsx');
      expect(authorPage).toContain("'#author-bio-summary'");
      expect(authorPage).toContain('id="author-bio-summary"');
    });
  });

  describe('Faz 10: Precision SpeakableSpecification on /surdurulebilirlik/ges-projeleri and /kurumsal/vizyon-misyon', () => {
    it('replaces generic ["h1", "h2", "p"] speakableSelectors with targeted instant-answer IDs', () => {
      const gesPage = readRel('src/app/[lang]/surdurulebilirlik/ges-projeleri/page.tsx');
      const gesClient = readRel('src/app/[lang]/surdurulebilirlik/ges-projeleri/GesProjeleriClient.tsx');
      expect(gesPage).toContain("'#ges-instant-answer-text'");
      expect(gesClient).toContain('id="ges-instant-answer-text"');

      const vizyonPage = readRel('src/app/[lang]/kurumsal/vizyon-misyon/page.tsx');
      const vizyonAi = readRel('src/components/seo/vision/VisionAiOverviewSeo.tsx');
      expect(vizyonPage).toContain("'#vision-instant-answer-text'");
      expect(vizyonAi).toContain('id="vision-instant-answer-text"');
    });
  });

  describe('Faz 11: robots.ts Unblocks /api/seo/ & agentReadiness Registers RAG Endpoint', () => {
    it('explicitly allows /api/seo/ in robots.ts and lists /api/seo/ai-overviews-rag.json in agentReadiness', () => {
      const robotsSrc = readRel('src/app/robots.ts');
      expect(robotsSrc).toContain("'/api/seo/'");

      const agentReadinessSrc = readRel('src/lib/seo/agentReadiness.ts');
      expect(agentReadinessSrc).toContain('/api/seo/ai-overviews-rag.json');
      expect(agentReadinessSrc).not.toContain('ISO/TSE belgeleri');
    });
  });

  describe('Faz 12: verifiedKnowledge.ts Uses Only Held BELCERT/ILAS ISO Certifications', () => {
    it('does not cite unheld ISO 9001 or ISO 41001 in verifiedFaqGroundTruth legalBasis', () => {
      const vkSrc = readRel('src/lib/seo/verifiedKnowledge.ts');
      expect(vkSrc).toContain('ISO 45001:2018, ISO 14001:2015, ISO 10002:2018, ISO 22301:2019 (BELCERT/ILAS)');
      expect(vkSrc).not.toContain('ISO 9001:2015');
    });
  });

  describe('Faz 13: 4 Facility Management Sub-Sector Pages Precision SpeakableSpecification', () => {
    it('wires exact PositionZeroAnswerBox IDs into subSectorGraphLd and VoiceSearchSpeakableSeo', () => {
      const subSectors: Array<{ rel: string; selector: string }> = [
        {
          rel: 'src/app/[lang]/hizmetler/tesis-yonetimi/rezidans-site-yonetimi/page.tsx',
          selector: '#residence-instant-answer-text',
        },
        {
          rel: 'src/app/[lang]/hizmetler/tesis-yonetimi/plaza-yonetimi/page.tsx',
          selector: '#plaza-instant-answer-text',
        },
        {
          rel: 'src/app/[lang]/hizmetler/tesis-yonetimi/toplu-konut-yonetimi/page.tsx',
          selector: '#toplukonut-instant-answer-text',
        },
        {
          rel: 'src/app/[lang]/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi/page.tsx',
          selector: '#industrial-instant-answer-text',
        },
      ];

      for (const { rel, selector } of subSectors) {
        const src = readRel(rel);
        expect(src, `${rel} must pass ${selector} to speakableSelectors`).toContain(
          `speakableSelectors: ['h1', '${selector}']`
        );
        expect(src, `${rel} must pass ${selector} to VoiceSearchSpeakableSeo`).toContain(
          `cssSelectors={['h1', '${selector}']}`
        );
      }
    });
  });

  describe('Faz 14: /guvenlik-akademisi Canonical NAP & Unified FAQPage Grounding', () => {
    it('merges ACADEMY_FAQ_ITEMS into AcademyAiOverviewSeo and removes conflicting 0850 numbers', () => {
      const academyClient = readRel('src/app/[lang]/guvenlik-akademisi/GuvenlikAkademisiClient.tsx');
      expect(academyClient).toContain('<AcademyAiOverviewSeo extraFaqs={ACADEMY_FAQ_ITEMS} />');

      const faqAccordion = readRel('src/components/academy/AcademyFaqAccordion.tsx');
      const costBreakdown = readRel('src/components/seo/academy/AcademyCostBreakdownSeo.tsx');
      expect(faqAccordion).not.toContain('0850');
      expect(costBreakdown).not.toContain('0850');
      expect(faqAccordion).toContain('0216 550 48 48');
      expect(costBreakdown).toContain('0216 550 48 48');
    });
  });

  describe('Faz 15: 7 Certificate Detail Pages EducationalOccupationalCredential & AI Overview Grounding', () => {
    it('emits EducationalOccupationalCredential JSON-LD and #cert-instant-answer-text on /kurumsal/sertifikalar/[slug]', () => {
      const certPage = readRel('src/app/[lang]/kurumsal/sertifikalar/[slug]/page.tsx');
      expect(certPage).toContain("'@type': 'EducationalOccupationalCredential'");
      expect(certPage).toContain("'#cert-instant-answer-text'");
      expect(certPage).toContain('id="cert-instant-answer-text"');
    });
  });
});

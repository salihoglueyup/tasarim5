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

  describe('Faz 16: buildFacilityCompleteGraphSchema Honors canonicalPath for /hizmetler/site-yonetimi', () => {
    it('generates distinct canonical @id, Service, BreadcrumbList, and district ItemList URLs for /hizmetler/site-yonetimi vs /hizmetler/tesis-yonetimi', async () => {
      const { buildFacilityCompleteGraphSchema } = await import(
        '@/lib/seo/facility/facilityCompleteGraphBuilder'
      );

      const siteGraph = buildFacilityCompleteGraphSchema({
        lang: 'tr',
        canonicalPath: '/hizmetler/site-yonetimi',
      }) as any;
      const siteNodes = siteGraph['@graph'] as any[];
      const siteService = siteNodes.find((n) => n['@type'] === 'Service');
      const siteWebPage = siteNodes.find((n) => n['@type'] === 'WebPage');
      const siteBreadcrumb = siteNodes.find((n) => n['@type'] === 'BreadcrumbList');
      const siteItemList = siteNodes.find((n) => n['@type'] === 'ItemList');

      expect(siteService.url).toBe('https://aloyonetim.com.tr/hizmetler/site-yonetimi');
      expect(siteWebPage.url).toBe('https://aloyonetim.com.tr/hizmetler/site-yonetimi');
      expect(siteWebPage.speakable.cssSelector).toContain('#site-instant-answer-text');
      expect(siteBreadcrumb.itemListElement[2].name).toBe('Site Yönetimi');
      expect(siteItemList.itemListElement[0].url).toContain('/bolgeler/');
      expect(siteItemList.itemListElement[0].url).toContain('/site-yonetimi');
    });
  });

  describe('Faz 17: Deduplicated Client ServiceSeo & Explicit pageUrl on VoiceSearchSpeakableSeo and /sozluk', () => {
    it('defaults ServiceSeo emitSchema to false and wires explicit pageUrl into VoiceSearchSpeakableSeo on tesis-yonetimi, site-yonetimi, and sozluk', () => {
      const serviceSeoSrc = readRel('src/components/seo/schema/ServiceSeo.tsx');
      expect(serviceSeoSrc).toContain('emitSchema = false');
      expect(serviceSeoSrc).toContain('if (!emitSchema) return null;');

      const tesisClient = readRel('src/app/[lang]/hizmetler/tesis-yonetimi/TesisYonetimiClient.tsx');
      expect(tesisClient).toContain('pageUrl="/hizmetler/tesis-yonetimi"');

      const siteClient = readRel('src/app/[lang]/hizmetler/site-yonetimi/SiteYonetimiClient.tsx');
      expect(siteClient).toContain('pageUrl="/hizmetler/site-yonetimi"');

      const sozlukClient = readRel('src/app/[lang]/sozluk/SozlukClient.tsx');
      expect(sozlukClient).toContain('pageUrl="/sozluk"');
      expect(sozlukClient).toContain('emitSchema={false}');

      const glossaryAi = readRel('src/components/seo/ai-overviews/GlossaryAiOverviewSeo.tsx');
      expect(glossaryAi).toContain('url: `${BASE_URL}/sozluk/${t.slug}`');
      expect(glossaryAi).not.toContain('url: `${BASE_URL}/sozluk#${t.slug}`');
    });
  });

  describe('Faz 18: Multilingual generateMetadata Localization on 8 Core Service Pages', () => {
    it('uses localized dictionary title and description when lang !== "tr" across all 8 core service routes', () => {
      const servicePages = [
        'src/app/[lang]/hizmetler/guvenlik-yonetimi/page.tsx',
        'src/app/[lang]/hizmetler/temizlik-ve-hijyen/page.tsx',
        'src/app/[lang]/hizmetler/teknik-bakim/page.tsx',
        'src/app/[lang]/hizmetler/aidat-takibi/page.tsx',
        'src/app/[lang]/hizmetler/hukuk-ve-icra-danismanligi/page.tsx',
        'src/app/[lang]/hizmetler/peyzaj-ve-bahce-bakimi/page.tsx',
        'src/app/[lang]/hizmetler/havuz-bakimi-ve-hijyen/page.tsx',
        'src/app/[lang]/hizmetler/hasere-ve-dezenfeksiyon/page.tsx',
      ];

      for (const rel of servicePages) {
        const src = readRel(rel);
        expect(src, `${rel} must branch generateMetadata on lang === 'tr'`).toContain("lang === 'tr'");
        expect(src, `${rel} must use precision speakableSelectors without generic 'p'`).toContain(
          "speakableSelectors: ['h1', '#service-instant-answer-text']"
        );
      }
    });
  });

  describe('Faz 19: Homepage, /hesaplayici, /kurumsal/kalite-belgelerimiz & /istihdam-koprusu Speakable Grounding', () => {
    it('aligns homepage Hero #home-hero-h1 and #home-ai-overview-answer with speakableSelectors', () => {
      const homePage = readRel('src/app/[lang]/page.tsx');
      const heroSrc = readRel('src/components/sections/core/Hero.tsx');
      const homeAiSrc = readRel('src/components/seo/ai-overviews/HomeAiOverviewGroundingSeo.tsx');

      expect(homePage).toContain("speakableSelectors: ['#home-hero-h1', '#home-ai-overview-answer', '#speakable-content']");
      expect(heroSrc).toContain('id="home-hero-h1"');
      expect(homeAiSrc).toContain('id="home-ai-overview-answer"');

      const calcPage = readRel('src/app/[lang]/hesaplayici/page.tsx');
      expect(calcPage).toContain("speakableSelectors: ['h1', '#calculator-instant-answer-text']");

      const certPage = readRel('src/app/[lang]/kurumsal/kalite-belgelerimiz/page.tsx');
      expect(certPage).toContain("speakableSelectors: ['h1', '#accreditation-instant-answer-text']");

      const careerPage = readRel('src/app/[lang]/istihdam-koprusu/page.tsx');
      expect(careerPage).toContain("speakableSelectors: ['h1', '#career-instant-answer-text']");
    });
  });

  describe('Faz 20: Neighborhood SLA Honesty, AI Overview WebPage Deduplication & Domain (.com.tr) Hygiene', () => {
    it('aligns NeighborhoodAiOverviewSnippetSeo with FACTS.emergencyResponse and deduplicates FAQPage on neighborhood pages', () => {
      const neighAi = readRel('src/components/seo/district/NeighborhoodAiOverviewSnippetSeo.tsx');
      expect(neighAi).toContain('FACTS.emergencyResponse.anatolian');
      expect(neighAi).not.toContain('15-20');
      expect(neighAi).not.toContain('20-25');
      expect(neighAi).not.toContain("'@type': 'WebPage'");

      const neighPage = readRel('src/app/[lang]/bolgeler/[ilce]/mahalleler/[mahalle]/page.tsx');
      expect(neighPage).toContain('injectSchema={false}');
    });

    it('cleans unverified court docket numbers, wrong aloyonetim.com domain, and duplicate WebPage nodes in AI overview components', () => {
      const factCheck = readRel('src/components/seo/ai-overviews/FactCheckAiGroundingSeo.tsx');
      expect(factCheck).toContain('url: BASE_URL');
      expect(factCheck).not.toContain('aloyonetim.com\'');
      expect(factCheck).not.toContain('Esas 2017/1248');
      expect(factCheck).not.toContain('Esas 2014/8920');
      expect(factCheck).not.toContain("'@type': 'WebPage'");

      const hizmetlerClient = readRel('src/app/[lang]/hizmetler/HizmetlerClient.tsx');
      expect(hizmetlerClient).toContain('url: `${BASE_URL}${lp(s.slug)}`');
      expect(hizmetlerClient).not.toContain('https://aloyonetim.com$');

      const hubAi = readRel('src/components/seo/ai-overviews/HubAiOverviewGroundingSeo.tsx');
      expect(hubAi).not.toContain('2 hours on the Anatolian Side');
      expect(hubAi).toContain('30 minutes on the Anatolian Side');

      const blogHubAi = readRel('src/components/seo/ai-overviews/BlogHubAiOverviewSeo.tsx');
      expect(blogHubAi).not.toContain('ISO 41001');
    });
  });

  describe('Faz 21: Blog Pillar-Cluster Internal Linking, WebPage Deduplication & IndexNow Manifest (Seçenek 2 & 3)', () => {
    it('deduplicates WebPage JSON-LD on blog articles and enriches autoLinker + BlogArticleEcosystemSeo internal links', async () => {
      const articleAiCard = readRel('src/components/seo/ai-overviews/ArticleAiOverviewCard.tsx');
      expect(articleAiCard).not.toContain("'@type': 'WebPage'");

      const takeawaysCard = readRel('src/components/seo/ai-overviews/BlogAiTakeawaysSeo.tsx');
      expect(takeawaysCard).not.toContain("'@type': 'WebPage'");

      const blogPage = readRel('src/app/[lang]/blog/[slug]/page.tsx');
      expect(blogPage).toContain("'#blog-ai-takeaway-text'");

      const blogEco = readRel('src/components/seo/district/BlogArticleEcosystemSeo.tsx');
      expect(blogEco).toContain('/kmk-2026-degisiklikleri');
      expect(blogEco).toContain('/hizmetler/site-yonetimi');
      expect(blogEco).toContain('/bolgeler');
      expect(blogEco).toContain('/sozluk');

      const { autoLinkHtml } = await import('@/lib/autoLinker');
      const sampleHtml =
        '<p>Kadıköy bölgesinde 2026 kmk değişiklikleri kapsamında gecikme tazminatı hesaplama ve devir teslim tutanağı süreçleri yürütülür.</p>';
      const linked = autoLinkHtml(sampleHtml, '/blog/ornek-rehber', 6);
      expect(linked).toContain('href="/bolgeler/kadikoy"');
      expect(linked).toContain('href="/kmk-2026-degisiklikleri"');
      expect(linked).toContain('href="/hesaplayici"');
    });

    it('includes all canonical hubs, 57 blog posts, 169 neighborhoods, and .well-known AI endpoints in IndexNow payloads without redirected URLs', async () => {
      const { buildFacilityIndexNowPayload } = await import('@/lib/seo/indexing/facilityIndexNowPinger');
      const { pushFacilityUrlsBulkToIndexNow } = await import('@/lib/seo/indexing/indexNowQueue');

      const payload = buildFacilityIndexNowPayload();
      expect(payload.urlList).toContain('https://aloyonetim.com.tr/kmk-2026-degisiklikleri');
      expect(payload.urlList).toContain('https://aloyonetim.com.tr/hesaplayici');
      expect(payload.urlList).toContain('https://aloyonetim.com.tr/hizmetler/site-yonetimi');
      expect(payload.urlList).toContain('https://aloyonetim.com.tr/.well-known/llms.txt');
      expect(payload.urlList).toContain('https://aloyonetim.com.tr/.well-known/agent-card.json');
      expect(payload.urlList.length).toBeGreaterThanOrEqual(300);

      const bulkRes = await pushFacilityUrlsBulkToIndexNow();
      expect(bulkRes.success).toBe(true);
      expect(bulkRes.totalUrlsCollected).toBeGreaterThanOrEqual(450);
      expect(bulkRes.urlSamples).not.toContain('https://aloyonetim.com.tr/sektorel-cozumler/rezidans-yonetimi');
    });
  });

  describe('Faz 22: GSC Haftalık Veri Odaklı 39 İlçe, Mahalleler, Yakın Semtler, Asansör Bakım & Tesis Yönetimi Paketi', () => {
    it('enriches all 39 districts with neighbor semt lists (including gungoren fix) and mahalleler/asansör/TOKİ/entegre tesis blocks', async () => {
      const { getNeighborDistrictsWithSemts } = await import(
        '@/lib/seo/facility/districtCrossLinker'
      );

      const zeytinburnuNeighbors = getNeighborDistrictsWithSemts('zeytinburnu');
      expect(zeytinburnuNeighbors.length).toBeGreaterThanOrEqual(4);
      expect(zeytinburnuNeighbors.map((n) => n.slug)).toContain('gungoren');
      expect(zeytinburnuNeighbors[0].semtler.length).toBeGreaterThan(0);

      const mahallelerPage = readRel('src/app/[lang]/bolgeler/[ilce]/mahalleler/page.tsx');
      expect(mahallelerPage).toContain('getNeighborDistrictsWithSemts');
      expect(mahallelerPage).toContain('Yakın Semtler ve Komşu İlçeler Hizmet Ağı');
      expect(mahallelerPage).toContain('TOKİ & Toplu Konut Site Yönetimi');
      expect(mahallelerPage).toContain('Asansör Bakım, Arıza & Yeşil Etiket');

      const ilcePage = readRel('src/app/[lang]/bolgeler/[ilce]/page.tsx');
      expect(ilcePage).toContain('slug: "toplu-yapi-kmk-m66-70"');
      expect(ilcePage).not.toContain('toplu-yapi-yonetimi-kmk-ek-madde-69');
      expect(ilcePage).toContain('entegre tesis yönetimi');

      const mahalleDetailPage = readRel('src/app/[lang]/bolgeler/[ilce]/mahalleler/[mahalle]/page.tsx');
      expect(mahalleDetailPage).toContain('asansör bakım, arıza ve yeşil etiket');
      expect(mahalleDetailPage).toContain('apartman, bina ve site yönetim şirketleri');
    });

    it('enriches Tesis Yönetimi hub and Client with Entegre/Dijital/Bina Tesis Yönetimi, Endüstriyel Tesis & TOKİ content', () => {
      const tesisPage = readRel('src/app/[lang]/hizmetler/tesis-yonetimi/page.tsx');
      expect(tesisPage).toContain('dijital tesis yönetimi');
      expect(tesisPage).toContain('bina tesis yönetimi');
      expect(tesisPage).toContain('endüstriyel tesis nedir');
      expect(tesisPage).toContain('toki site yönetimi');

      const tesisClient = readRel('src/app/[lang]/hizmetler/tesis-yonetimi/TesisYonetimiClient.tsx');
      expect(tesisClient).toContain('Entegre Tesis Yönetimi, Dijital Tesis Yönetimi ve Bina Tesis Yönetimi Rehberi');
      expect(tesisClient).toContain('Entegre tesis ne demek ve bina tesis yönetimi hangi hizmetleri kapsar?');
      expect(tesisClient).toContain('Endüstriyel tesis nedir ve TOKİ / toplu konut site yönetimi (KMK m.66-74) nasıl yapılır?');
      expect(tesisClient).not.toContain('toplu-yapi-yonetimi-kmk-ek-madde-69');
    });
  });

  describe('Faz 23: 39 İlçe Resmi Mahalle Tam Listeleri, KMK Kanun Kutusu & Canonical Birleştirme, Şablonlar ve Portföy Referansları', () => {
    it('provides official neighborhood lists for all 39 districts and renders #mahalle-listesi on /bolgeler/[ilce]/mahalleler', async () => {
      const { OFFICIAL_NEIGHBORHOODS, getOfficialNeighborhoods } = await import(
        '@/data/districtOfficialNeighborhoods'
      );
      expect(Object.keys(OFFICIAL_NEIGHBORHOODS).length).toBe(39);
      expect(getOfficialNeighborhoods('gaziosmanpasa')?.count).toBe(16);
      expect(getOfficialNeighborhoods('kartal')?.count).toBe(20);
      expect(getOfficialNeighborhoods('buyukcekmece')?.count).toBe(24);
      expect(getOfficialNeighborhoods('beylikduzu')?.count).toBe(11);

      const mahallelerPage = readRel('src/app/[lang]/bolgeler/[ilce]/mahalleler/page.tsx');
      expect(mahallelerPage).toContain('id="mahalle-listesi"');
      expect(mahallelerPage).toContain('Mahalle Tam Liste) ve Site Yönetimi | Alo Yönetim');
    });

    it('canonicalizes duplicate glossary slugs, builds KMK Legislation schema & statute boxes, and provides copyable templates', async () => {
      const { getCanonicalTermSlug, isNonCanonicalTermSlug } = await import(
        '@/lib/seo/glossaryCanonical'
      );
      const { getKmkStatuteForTerm } = await import('@/lib/seo/kmkStatuteForTerm');
      const { GLOSSARY_TEMPLATES } = await import('@/data/glossaryTemplates');

      expect(getCanonicalTermSlug('kmk-ne-demek-634-sayili-kat-mulkiyeti-kanunu')).toBe(
        'kat-mulkiyeti-kanunu-kmk'
      );
      expect(getCanonicalTermSlug('kat-mulkiyeti-kanunu-madde-20-aidat-borcu')).toBe(
        'kmk-madde-20-genel-giderlere-katilma-aidat-borcu'
      );
      expect(isNonCanonicalTermSlug('yesil-etiket-asansor')).toBe(true);

      const m20 = getKmkStatuteForTerm('KMK Madde 20 (Gider Paylaşımı)');
      expect(m20).not.toBeNull();
      expect(m20?.articleNo).toBe(20);
      expect(m20?.legislationLd['@type']).toBe('Legislation');

      const m37 = getKmkStatuteForTerm('KMK Madde 37 (İşletme Projesi)');
      expect(m37?.articleNo).toBe(37);
      expect(m37?.statuteText).toBeUndefined(); // pre-7579 text suppressed

      expect(GLOSSARY_TEMPLATES['hazirun-cetveli']?.table?.columns).toContain('Arsa Payı');
      expect(GLOSSARY_TEMPLATES['isletme-projesi']?.table?.columns).toContain('Gider Kalemi');

      const termPage = readRel('src/app/[lang]/sozluk/[terim]/page.tsx');
      expect(termPage).toContain('id="kmk-kanun-metni"');
      expect(termPage).toContain('id="sablon"');
    });

    it('aligns REAL_REFERENCES with Alo_Grup_Kurumsal_Portfoy_TASLAK_v1.pdf (50 references across 4 sectors) and enriches district security & elevator networks', async () => {
      const { REAL_REFERENCES, SECTORS } = await import('@/data/realReferences');
      expect(SECTORS).toEqual(['site', 'kamu', 'saglik', 'ticari']);
      expect(REAL_REFERENCES.length).toBe(50);
      expect(REAL_REFERENCES.some((r) => r.name === 'Nef Çekmeköy Çamlıtepe Sitesi')).toBe(true);
      expect(REAL_REFERENCES.some((r) => r.name === 'Aile ve Sosyal Politikalar Bakanlığı Merkezleri')).toBe(true);
      expect(REAL_REFERENCES.some((r) => r.name === 'Atlantis Ticaret Merkezi')).toBe(true);

      const districtServicePage = readRel('src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx');
      expect(districtServicePage).toContain('id="ilce-guvenlik-agi"');
      expect(districtServicePage).toContain('id="mahalle-asansor-agi"');
    });
  });
});

import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

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
});

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { POSTS } from '@/data/posts';
import {
  extractArticleTakeaways,
  extractArticleFaqs,
  hasTableBlock,
  getCategoryComparisonMatrix,
} from './blogAiEnricher';
import { extractKeyFactsAndKpis } from '@/lib/seoEngine/contentAudit';
import { resolveBlogArticleCluster } from '@/lib/seo/facility/facilityBlogClusterEngine';
import { OFFICIAL_LEGAL_CITATIONS } from '@/lib/seo/facility/facilityExternalCitations';
import { renderPostBlocksToHtml } from '@/lib/content/blogBlockParser';

const ROOT = process.cwd();

describe('Blog Google AI Overviews, Content Enrichment & Law No. 7579 Grounding', () => {
  it('extractArticleTakeaways generates 4 article-specific takeaways for real blog posts', () => {
    const samplePost = POSTS[0];
    const takeaways = extractArticleTakeaways(samplePost.content, samplePost.tldr, 'tr');

    expect(takeaways).toHaveLength(4);
    for (const item of takeaways) {
      expect(item.length).toBeGreaterThan(20);
    }
  });

  it('extractArticleTakeaways supports all 4 locales (tr, en, ru, ar)', () => {
    for (const lang of ['tr', 'en', 'ru', 'ar'] as const) {
      const takeaways = extractArticleTakeaways([], undefined, lang);
      expect(takeaways).toHaveLength(4);
      expect(takeaways.join(' ')).toContain('7579');
    }
  });

  it('extractArticleFaqs extracts question-and-answer blocks from structured PostBlock[] and HTML', () => {
    const blocks = [
      { type: 'h2', text: '2026 Yılında Geçici İşletme Projesi Artış Sınırı Nedir?' },
      {
        type: 'p',
        text: '7579 sayılı Kanun ile değişik KMK m.37 uyarınca geçici işletme projelerinde artış tavanı %25,49 yeniden değerleme oranını aşamaz.',
      },
      { type: 'h3', text: 'Hangi Belgeler Devir Teslimde Zorunludur?' },
      {
        type: 'ul',
        items: [
          'Noter onaylı karar ve işletme defterleri',
          'Banka hesap özetleri ve kasa mutabakat tutanağı',
        ],
      },
    ];

    const faqs = extractArticleFaqs(blocks);
    expect(faqs).toHaveLength(2);
    expect(faqs[0].question).toContain('2026 Yılında Geçici İşletme Projesi Artış Sınırı Nedir?');
    expect(faqs[0].answer).toContain('%25,49');
    expect(faqs[1].question).toContain('Hangi Belgeler Devir Teslimde Zorunludur?');
    expect(faqs[1].answer).toContain('Noter onaylı karar');
  });

  it('hasTableBlock detects inline tables and getCategoryComparisonMatrix returns 4-locale matrices', () => {
    const postWithTable = POSTS.find((p) => p.content.some((b) => b.type === 'table'));
    const postWithoutTable = POSTS.find((p) => !p.content.some((b) => b.type === 'table'));

    expect(postWithTable).toBeDefined();
    expect(postWithoutTable).toBeDefined();
    expect(hasTableBlock(postWithTable!.content)).toBe(true);
    expect(hasTableBlock(postWithoutTable!.content)).toBe(false);

    for (const category of ['hukuk', 'guvenlik', 'teknik', 'yonetim', 'tesis-yonetimi']) {
      for (const lang of ['tr', 'en', 'ru', 'ar']) {
        const matrix = getCategoryComparisonMatrix(category, lang);
        expect(matrix.headers).toHaveLength(3);
        expect(matrix.rows.length).toBeGreaterThanOrEqual(3);
        expect(matrix.legalNote.length).toBeGreaterThan(20);
      }
    }
  });

  it('wires unified FAQPage schema and 4-locale AI Overviews components in /blog/[slug]/page.tsx and /blog/page.tsx', () => {
    const slugPageSrc = fs.readFileSync(
      path.join(ROOT, 'src/app/[lang]/blog/[slug]/page.tsx'),
      'utf-8'
    );
    expect(slugPageSrc).toContain('ArticleAiOverviewCard');
    expect(slugPageSrc).toContain('extraFaqs={articleFaqs}');
    expect(slugPageSrc).toContain('BlogAiTakeawaysSeo');
    expect(slugPageSrc).toContain('BlogStructuredKnowledgeSeo');
    expect(slugPageSrc).not.toContain('BlogFAQExtractor');

    const hubPageSrc = fs.readFileSync(
      path.join(ROOT, 'src/app/[lang]/blog/page.tsx'),
      'utf-8'
    );
    expect(hubPageSrc).toContain('BlogHubAiOverviewSeo');
    expect(hubPageSrc).toContain('#blog-hub-ai-overview-answer');
    expect(hubPageSrc).toContain("'@context': 'https://schema.org'");
  });

  it('recognizes Law No. 7579 in extractKeyFactsAndKpis, OFFICIAL_LEGAL_CITATIONS, and resolveBlogArticleCluster', () => {
    const facts = extractKeyFactsAndKpis(
      '7579 sayılı Kanun kapsamında KMK m.37 geçici işletme projesi %25,49 yeniden değerleme oranı ile sınırlandırılmıştır.'
    );
    expect(facts.some((f) => f.type === 'legal_code' && f.raw.includes('7579'))).toBe(true);

    expect(OFFICIAL_LEGAL_CITATIONS.some((c) => c.id === 'kmk-7579')).toBe(true);

    const cluster = resolveBlogArticleCluster(
      '2026 Aidat Artış Sınırı ve KMK Rehberi',
      '7579 sayılı Kanun ve KMK m.37 işletme projesi kuralları',
      ['aidat', 'kmk']
    );
    expect(cluster.relevantLegislation.some((l) => l.id === 'kmk-7579')).toBe(true);
  });

  it('renders scope="col" on table headers in renderPostBlocksToHtml for Google AI Overviews table extraction', () => {
    const html = renderPostBlocksToHtml([
      {
        type: 'table',
        headers: ['Kriter', 'Standart'],
        rows: [['KMK m.37', '%25,49 Tavan']],
      },
    ]);
    expect(html).toContain('<th scope="col"');
  });
});

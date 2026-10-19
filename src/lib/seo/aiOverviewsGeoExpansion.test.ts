import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { verifiedKnowledge } from '@/lib/seo/verifiedKnowledge';
import { CALCULATOR_AI_QA } from '@/components/seo/ai-overviews/CalculatorAiOverviewSeo';
import { buildDistrictAiOverviewQa } from '@/components/seo/ai-overviews/DistrictAiOverviewSeo';

const ROOT = process.cwd();

describe('Google AI Overviews & GEO 2026 Genişletme Doğrulaması', () => {
  it('1. 39 ilçe ve 351 ilçe×hizmet sayfası DistrictAiOverviewSeo ile doğrulanmış yerel AI Overviews bloklarına sahiptir', () => {
    const districtPage = fs.readFileSync(
      path.join(ROOT, 'src/app/[lang]/bolgeler/[ilce]/page.tsx'),
      'utf8',
    );
    const districtServicePage = fs.readFileSync(
      path.join(ROOT, 'src/app/[lang]/bolgeler/[ilce]/[hizmet]/page.tsx'),
      'utf8',
    );

    expect(districtPage).toContain('DistrictAiOverviewSeo');
    expect(districtPage).toContain('#district-ai-overview-answer');
    expect(districtServicePage).toContain('DistrictAiOverviewSeo');
    expect(districtServicePage).toContain('#district-service-instant-answer-text');

    const qa = buildDistrictAiOverviewQa({
      districtName: 'Kadıköy',
      districtSlug: 'kadikoy',
      side: 'Anadolu',
      slaTarget: '1-2 saat',
      neighborhoods: ['Suadiye', 'Fenerbahçe', 'Göztepe'],
      localNeeds: ['Kentsel dönüşüm sonrası yeni bina yönetimi'],
      serviceName: 'Site Yönetimi',
      serviceSlug: 'site-yonetimi',
    });

    expect(qa.question).toContain('Kadıköy');
    expect(qa.answer).toContain('1-2 saat');
    expect(qa.law7579Answer).toContain('7579');
  });

  it('2. /hesaplayici sayfası CalculatorAiOverviewSeo ile KMK m.20 ve 7579 sayılı Kanun formüllerini sunar', () => {
    const calcPage = fs.readFileSync(
      path.join(ROOT, 'src/app/[lang]/hesaplayici/page.tsx'),
      'utf8',
    );
    expect(calcPage).toContain('CalculatorAiOverviewSeo');
    expect(calcPage).toContain('#calculator-instant-answer-text');
    expect(CALCULATOR_AI_QA.length).toBeGreaterThanOrEqual(3);
    expect(CALCULATOR_AI_QA[0].answer).toContain('KMK Madde 20/1-a');
    expect(CALCULATOR_AI_QA[1].answer).toContain('7579');
  });

  it('3. Tüm ana hizmet sayfaları (hukuk, haşere, peyzaj dahil) ServiceAiOverviewSnippetSeo içerir', () => {
    const servicePages = [
      'src/app/[lang]/hizmetler/hukuk-ve-icra-danismanligi/page.tsx',
      'src/app/[lang]/hizmetler/hasere-ve-dezenfeksiyon/page.tsx',
      'src/app/[lang]/hizmetler/peyzaj-ve-bahce-bakimi/page.tsx',
    ];
    for (const rel of servicePages) {
      const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
      expect(src, rel).toContain('ServiceAiOverviewSnippetSeo');
      expect(src, rel).toContain('#service-instant-answer-text');
    }
  });

  it('4. Anasayfa (/) #speakable-content seçicisi HomeAiOverviewGroundingSeo ile 4 dilde karşılık bulur', () => {
    const homePage = fs.readFileSync(
      path.join(ROOT, 'src/app/[lang]/page.tsx'),
      'utf8',
    );
    const homeAiOverview = fs.readFileSync(
      path.join(ROOT, 'src/components/seo/ai-overviews/HomeAiOverviewGroundingSeo.tsx'),
      'utf8',
    );
    expect(homePage).toContain('HomeAiOverviewGroundingSeo');
    expect(homePage).toContain('#speakable-content');
    expect(homeAiOverview).toContain('id="speakable-content"');
  });

  it('5. GoogleAiOverviewGroundingSeo ve ServiceAiOverviewSnippetSeo 7579 sayılı Kanun (2026 KMK m.37 ve m.70) hükümleriyle senkronizedir', () => {
    const groundingSrc = fs.readFileSync(
      path.join(ROOT, 'src/components/seo/ai-overviews/GoogleAiOverviewGroundingSeo.tsx'),
      'utf8',
    );
    const serviceSnippetSrc = fs.readFileSync(
      path.join(ROOT, 'src/components/seo/ai-overviews/ServiceAiOverviewSnippetSeo.tsx'),
      'utf8',
    );
    expect(groundingSrc).toContain('7579');
    expect(groundingSrc).toContain('2/3');
    expect(serviceSnippetSrc).toContain('7579');
    expect(serviceSnippetSrc).toContain('hukuk-ve-icra-danismanligi');
    expect(serviceSnippetSrc).toContain('hasere-ve-dezenfeksiyon');
    expect(serviceSnippetSrc).toContain('peyzaj-ve-bahce-bakimi');
  });

  it('6. /api/seo/ai-overviews-rag.json (verifiedKnowledge) KMK m.20 gider paylaşım kuralları ve doğrulanmış Q&A çiftlerini döner', () => {
    const data = verifiedKnowledge();
    expect(data.expenseSharingRules.equalShareArticle).toContain('20/1-a');
    expect(data.expenseSharingRules.landShareArticle).toContain('20/1-b');
    expect(data.expenseSharingRules.interimProjectCapArticle).toContain('7579');
    expect(data.faqGroundTruth.length).toBeGreaterThanOrEqual(5);
    expect(data.faqGroundTruth.some((item) => item.legalBasis.includes('7579'))).toBe(true);
  });
});

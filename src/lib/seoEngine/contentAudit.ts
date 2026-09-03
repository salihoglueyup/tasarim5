import type {
  ContentSeoAudit,
  FullPageSeoAudit,
  ExtractedFact,
  KeywordDensityResult,
  FaqCandidate,
  FaqPageSchemaResult,
} from './types';
import { FACILITY_MANAGEMENT_ENTITIES } from './entities';
import { evaluateSnippetHealth, analyzeHeadingStructure } from './snippet';
import { calculateTurkishReadabilityScore } from './readability';
import { classifySearchIntent } from './intent';
import { generateHubAndSpokeGraph, resolveTopicalEntityGraph } from './topicGraph';
import { DISTRICTS } from '@/data/districts';
import { escapeRegExp } from './utils';

export function extractFaqCandidatesFromContent(content: string): {
  faqs: FaqCandidate[];
  schema: FaqPageSchemaResult | null;
} {
  const plainText = content.replace(/<[^>]*>?/gm, '');
  const lines = plainText.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const faqs: FaqCandidate[] = [];

  const questionRegex = /^(?:[0-9]+\.|\*|-|•)?\s*(.+?(?:\?|nedir|nasil yapilir|zorunlu mu|kim oder|ne zaman))\s*$/i;

  for (let i = 0; i < lines.length - 1; i++) {
    const currentLine = lines[i];
    const nextLine = lines[i + 1];

    if (currentLine.length >= 10 && currentLine.length <= 150 && questionRegex.test(currentLine)) {
      if (nextLine.length >= 20 && !questionRegex.test(nextLine)) {
        const cleanQuestion = currentLine.replace(/^[0-9]+\.|\*|-|•/g, '').trim();
        faqs.push({
          question: cleanQuestion.endsWith('?') ? cleanQuestion : `${cleanQuestion}?`,
          answer: nextLine.trim(),
        });
      }
    }
  }

  const schema: FaqPageSchemaResult | null =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : null;

  return { faqs: faqs.slice(0, 10), schema };
}

/**
 * Metin İçerisindeki Topikal Varlık Grafiğini (Wikidata QID'leri ile) Çözer.
 */

export function extractKeyFactsAndKpis(content: string): ExtractedFact[] {
  const plainText = content.replace(/<[^>]*>?/gm, '');
  const facts: ExtractedFact[] = [];

  const percentageRegex = /%\s*\d+(?:[.,]\d+)?(?:\s*-\s*\d+)?/g;
  let match: RegExpExecArray | null;
  while ((match = percentageRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'percentage',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  const legalRegex = /(?:634|5188|6331|2004)\s*sayılı\s*(?:kanun|yasa)?|kmk\s*(?:m\.|madde\s*)\d+|iik\s*(?:m\.|madde\s*)\d+/gi;
  while ((match = legalRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'legal_code',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  const standardRegex = /iso\s*\d+(?::\d+)?|tse\s*(?:hyb)?\s*\d+/gi;
  while ((match = standardRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'standard',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  const timeRegex = /7\/24|\b(?:24|48)\s*saat|\b(?:45|30|20|15)\s*dakika/gi;
  while ((match = timeRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'timeframe',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  const metricRegex = /\b\d+\+\s*(?:yıl|proje|referans|tesis|site|bağımsız\s*bölüm|daire|personel)|\b39\s*ilçe/gi;
  while ((match = metricRegex.exec(plainText)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(plainText.length, match.index + match[0].length + 40);
    facts.push({
      type: 'general_metric',
      raw: match[0].trim(),
      context: plainText.substring(start, end).replace(/\s+/g, ' ').trim(),
    });
  }

  return facts.slice(0, 16);
}

/**
 * Metin tabanlı içerik üzerinde derin SEO ve topikal yoğunluk denetimi yapar.
 */

export function analyzeContentSeo(
  content: string,
  targetKeyword: string = 'tesis yönetimi'
): ContentSeoAudit {
  const plainText = content.replace(/<[^>]*>?/gm, '').toLowerCase();
  const words = plainText.match(/[a-z0-9ğüşıöçâîû]+/gi) || [];
  const wordCount = words.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const lowerTarget = targetKeyword.toLowerCase().trim();
  const targetRegex = new RegExp(`\\b${escapeRegExp(lowerTarget)}\\b`, 'gi');
  const targetMatches = (plainText.match(targetRegex) || []).length;
  const targetDensity = wordCount > 0 ? Number(((targetMatches / wordCount) * 100).toFixed(2)) : 0;

  const keywordResults: KeywordDensityResult[] = [];
  const missingEntities: string[] = [];
  const recommendedLinks: { text: string; href: string; reason: string }[] = [];

  for (const entity of FACILITY_MANAGEMENT_ENTITIES) {
    let entityMatches = 0;
    for (const variation of entity.variations) {
      const vRegex = new RegExp(`\\b${escapeRegExp(variation)}\\b`, 'gi');
      const count = (plainText.match(vRegex) || []).length;
      entityMatches += count;
    }

    const density = wordCount > 0 ? Number(((entityMatches / wordCount) * 100).toFixed(2)) : 0;
    let status: 'optimal' | 'low' | 'high' = 'optimal';
    if (density < 0.2) status = 'low';
    else if (density > 3.5) status = 'high';

    keywordResults.push({
      keyword: entity.name,
      count: entityMatches,
      densityPercent: density,
      status,
      isPillar: (entity.variations as readonly string[]).includes(lowerTarget),
    });

    if (entityMatches === 0) {
      missingEntities.push(entity.name);
    } else {
      recommendedLinks.push({
        text: entity.name,
        href: entity.pillarUrl,
        reason: `Topikal Otorite bağlantısı: ${entity.name} varlığı (${entity.wikidata})`,
      });
    }
  }

  for (const district of DISTRICTS) {
    const dName = district.name.toLowerCase();
    const dRegex = new RegExp(`\\b${escapeRegExp(dName)}\\b`, 'gi');
    if (dRegex.test(plainText)) {
      recommendedLinks.push({
        text: `${district.name} Tesis Yönetimi`,
        href: `/bolgeler/${district.slug}/tesis-yonetimi`,
        reason: `${district.name} yerel arama niyetini yakalamak için ilçe alt sayfasına köprü`,
      });
    }
  }

  let score = 40;
  if (wordCount >= 20) score += 10;
  if (wordCount >= 400) score += 15;
  if (wordCount >= 1000) score += 10;
  if (targetMatches >= 1) score += 10;
  if (targetMatches >= 3 && targetMatches <= 20) score += 15;
  if (missingEntities.length <= 5) score += 10;

  return {
    wordCount,
    readTimeMinutes,
    primaryKeyword: targetKeyword,
    primaryKeywordCount: targetMatches,
    primaryKeywordDensity: targetDensity,
    topicalScore: Math.min(100, Math.max(0, score)),
    keywords: keywordResults,
    recommendedInternalLinks: recommendedLinks.slice(0, 10),
    missingCriticalEntities: missingEntities,
  };
}

/**
 * Sayfalar için tam hiyerarşik Hub & Spoke Link Grafiği oluşturur.
 */

export function auditFullPageSeo({
  title,
  description,
  content,
  targetKeyword = 'tesis yönetimi',
  currentPath = '/',
}: {
  title: string;
  description: string;
  content: string;
  targetKeyword?: string;
  currentPath?: string;
}): FullPageSeoAudit {
  const snippet = evaluateSnippetHealth(title, description, targetKeyword);
  const contentAudit = analyzeContentSeo(content, targetKeyword);
  const readability = calculateTurkishReadabilityScore(content);
  const headings = analyzeHeadingStructure(content);
  const intent = classifySearchIntent(`${title} ${description} ${content.substring(0, 300)}`);
  const { faqs } = extractFaqCandidatesFromContent(content);
  const extractedFacts = extractKeyFactsAndKpis(content);
  const hubAndSpoke = generateHubAndSpokeGraph(currentPath);
  const entityGraph = resolveTopicalEntityGraph(content);

  // Ağırlıklı Toplam SEO Puanı (0 - 100)
  const overallScore = Math.round(
    snippet.score * 0.3 +
      contentAudit.topicalScore * 0.35 +
      readability.score * 0.15 +
      (headings.isValid ? 100 : 60) * 0.2
  );

  return {
    overallScore: Math.min(100, Math.max(0, overallScore)),
    snippet,
    content: contentAudit,
    readability,
    headings,
    intent,
    extractedFaqs: faqs,
    extractedFacts,
    hubAndSpoke,
    entityGraph,
  };
}

/**
 * Tesis Yönetimi tematik küme (Topic Cluster) bağlantı ağını üretir.
 */

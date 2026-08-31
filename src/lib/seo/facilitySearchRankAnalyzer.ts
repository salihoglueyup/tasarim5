import {
  analyzeDomainSemanticDepth,
  SemanticDepthReport
} from './domainSemanticAuditor';

export interface SerpAuditInput {
  title: string;
  metaDescription?: string;
  h1?: string;
  content: string;
  hasGraphSchema?: boolean;
  hasBreadcrumbs?: boolean;
  hasFaq?: boolean;
  hasLegalReference?: boolean; // KMK 634 or ISO 41001
}

export interface SerpScoreBreakdown {
  keywordRelevanceScore: number; // Max 30
  schemaCompletenessScore: number; // Max 25
  topicalAuthorityScore: number; // Max 25
  internalLinkReadinessScore: number; // Max 20
}

export interface SerpReadinessReport {
  overallScore: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: SerpScoreBreakdown;
  detectedKeywords: string[];
  recommendations: string[];
  semanticDepthReport?: SemanticDepthReport;
}

const HIGH_PRIORITY_TERMS = [
  'site yönetimi',
  'profesyonel site yönetimi',
  'site yönetim şirketi',
  'site yönetim şirketleri',
  'site yönetim firmaları',
  'apartman ve site yönetimi',
  'apartman yöneticiliği',
  'site yöneticiliği',
  'tesis ve mülk hizmetleri',
  'tesis ve mülk yönetimi',
  'tesis yönetimi',
  'mülk yönetimi',
  'entegre tesis yönetimi',
  'profesyonel tesis yönetimi',
  'rezidans yönetimi',
  'plaza yönetimi',
  'toplu konut yönetimi',
  'sanayi tesisi yönetimi',
  'iso 41001',
  'kmk 634',
  '5188',
];

/**
 * Tesis ve Mülk Hizmetleri Sunucu Taraflı SERP Hazırlık & Arama Sıralama Analizcisi.
 * 
 * Herhangi bir sayfa, makale veya hizmet şablonunun Google ilk sayfa ve 1. sıra
 * arama niyetine (Search Intent) ne kadar hazır olduğunu nesnel kriterlerle puanlar.
 */
export function analyzeFacilitySerpReadiness(input: SerpAuditInput): SerpReadinessReport {
  const normalizedTitle = input.title.toLowerCase();
  const normalizedDesc = (input.metaDescription || '').toLowerCase();
  const normalizedH1 = (input.h1 || '').toLowerCase();
  const normalizedContent = input.content.toLowerCase();

  const detectedKeywords: string[] = [];
  const recommendations: string[] = [];

  // 1. Keyword Relevance Scoring (Max 30)
  let keywordScore = 0;
  for (const term of HIGH_PRIORITY_TERMS) {
    if (
      normalizedTitle.includes(term) ||
      normalizedDesc.includes(term) ||
      normalizedH1.includes(term) ||
      normalizedContent.includes(term)
    ) {
      detectedKeywords.push(term);
    }
  }

  if (normalizedTitle.includes('tesis') || normalizedTitle.includes('mülk') || normalizedTitle.includes('site')) keywordScore += 10;
  if (normalizedH1.includes('tesis') || normalizedH1.includes('mülk') || normalizedH1.includes('site')) keywordScore += 10;
  if (normalizedDesc.includes('tesis') || normalizedDesc.includes('mülk') || normalizedDesc.includes('site')) keywordScore += 5;
  if (detectedKeywords.length >= 4) keywordScore += 5;

  // 2. Schema Completeness Scoring (Max 25)
  let schemaScore = 0;
  if (input.hasGraphSchema) schemaScore += 10;
  if (input.hasBreadcrumbs) schemaScore += 8;
  if (input.hasFaq) schemaScore += 7;

  if (!input.hasGraphSchema) {
    recommendations.push('Sayfaya birleşik Schema.org @graph Knowledge Graph şeması ekleyin.');
  }
  if (!input.hasFaq) {
    recommendations.push('Google Position Zero için SSS (FAQPage) şeması ve bileşeni ekleyin.');
  }

  // 3. Topical Authority & Legal Signals (Max 25)
  let topicalScore = 0;
  const hasKmk = normalizedContent.includes('kmk') || normalizedContent.includes('634');
  const hasIso = normalizedContent.includes('iso 41001') || normalizedContent.includes('iso');
  const hasSecurity = normalizedContent.includes('5188') || normalizedContent.includes('güvenlik');
  const hasSavings = normalizedContent.includes('%30') || normalizedContent.includes('tasarruf');

  if (hasKmk) topicalScore += 7;
  if (hasIso) topicalScore += 7;
  if (hasSecurity) topicalScore += 6;
  if (hasSavings || input.hasLegalReference) topicalScore += 5;

  if (!hasKmk && !hasIso) {
    recommendations.push('İçerikte KMK 634 ve ISO 41001 yasal standartlarına doğrudan atıf yapın.');
  }

  // 4. Internal Link Readiness (Max 20)
  let internalLinkScore = 0;
  const hasLinks = (input.content.match(/<a\s+[^>]*href=/gi) || []).length;
  if (hasLinks >= 3) {
    internalLinkScore = 20;
  } else if (hasLinks >= 1) {
    internalLinkScore = 12;
  } else {
    internalLinkScore = 5;
    recommendations.push('Alt sektörlere ve Tesis Yönetimi ana hub sayfasına en az 3 iç bağlantı verin.');
  }

  // 5. Semantik LSI & Derinlik Entegrasyonu (Faz 50)
  const semanticDepthReport = analyzeDomainSemanticDepth({
    title: input.title,
    h1: input.h1,
    metaDescription: input.metaDescription,
    content: input.content,
  });

  if (semanticDepthReport.recommendations.length > 0) {
    recommendations.push(...semanticDepthReport.recommendations.slice(0, 3));
  }

  const overallScore = Math.min(100, keywordScore + schemaScore + topicalScore + internalLinkScore);

  const grade =
    overallScore >= 90
      ? 'A+'
      : overallScore >= 80
      ? 'A'
      : overallScore >= 70
      ? 'B'
      : overallScore >= 55
      ? 'C'
      : 'D';

  return {
    overallScore,
    grade,
    breakdown: {
      keywordRelevanceScore: keywordScore,
      schemaCompletenessScore: schemaScore,
      topicalAuthorityScore: topicalScore,
      internalLinkReadinessScore: internalLinkScore,
    },
    detectedKeywords,
    recommendations,
    semanticDepthReport,
  };
}

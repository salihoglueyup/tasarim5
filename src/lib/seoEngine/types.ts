export type SearchIntentType = 'transactional' | 'informational' | 'navigational' | 'commercial';

export interface SearchIntentResult {
  intent: SearchIntentType;
  confidencePercent: number;
  matchedSignals: string[];
  recommendedCta: string;
  recommendedSchemaType: string;
}

export interface FaqCandidate {
  question: string;
  answer: string;
}

export interface FaqPageSchemaResult {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export interface EntityGraphResult {
  about: { '@type': 'Thing'; name: string; sameAs: string }[];
  mentions: { '@type': 'Thing'; name: string; sameAs: string }[];
}

export interface KeywordDensityResult {
  keyword: string;
  count: number;
  densityPercent: number;
  status: 'optimal' | 'low' | 'high';
  isPillar: boolean;
}

export interface ContentSeoAudit {
  wordCount: number;
  readTimeMinutes: number;
  primaryKeyword: string;
  primaryKeywordCount: number;
  primaryKeywordDensity: number;
  topicalScore: number; // 0 - 100
  keywords: KeywordDensityResult[];
  recommendedInternalLinks: { text: string; href: string; reason: string }[];
  missingCriticalEntities: string[];
}

export interface SnippetHealthReport {
  score: number; // 0 - 100
  isOptimal: boolean;
  titleLength: number;
  descriptionLength: number;
  hasPrimaryKeywordInTitle: boolean;
  hasPrimaryKeywordInDescription: boolean;
  hasCtrTriggers: boolean;
  hasLocationSignal: boolean;
  detectedCtrTriggers: string[];
  recommendations: string[];
}

export interface ReadabilityReport {
  score: number; // 0 - 100 (Ateşman İndeksi)
  level: 'Çok Kolay' | 'Kolay' | 'Orta' | 'Zor' | 'Çok Zor';
  totalWords: number;
  totalSentences: number;
  totalSyllables: number;
  averageWordLengthSyllables: number;
  averageSentenceLengthWords: number;
  feedback: string;
}

export interface HeadingStructureReport {
  isValid: boolean;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  headings: { level: 1 | 2 | 3; text: string; hasKeyword: boolean }[];
  issues: string[];
}

export interface ExtractedFact {
  type: 'percentage' | 'legal_code' | 'standard' | 'timeframe' | 'general_metric';
  raw: string;
  context: string;
}

export interface TopicClusterNode {
  title: string;
  url: string;
  type: 'pillar' | 'cluster_article' | 'district_page' | 'faq';
  wikidataSameAs?: string;
  relation: string;
}

export interface HubAndSpokeGraph {
  hub: { title: string; url: string; wikidata: string };
  siblings: { title: string; url: string }[];
  spokes: { district: string; url: string; side: string }[];
  relatedArticles: { title: string; url: string }[];
}

export interface FullPageSeoAudit {
  overallScore: number; // 0 - 100
  snippet: SnippetHealthReport;
  content: ContentSeoAudit;
  readability: ReadabilityReport;
  headings: HeadingStructureReport;
  intent: SearchIntentResult;
  extractedFaqs: FaqCandidate[];
  extractedFacts: ExtractedFact[];
  hubAndSpoke: HubAndSpokeGraph;
  entityGraph: EntityGraphResult;
}

// ---------------------------------------------------------------------------
// Genişletilmiş Tesis Yönetimi Varlık ve Eş Anlamlı Sözlüğü (Wikidata / Standartlar)
// ---------------------------------------------------------------------------

export interface DisciplineCoverage {
  id: string;
  name: string;
  weight: number;
  scorePercent: number;
  detectedSignals: string[];
  status: 'tam' | 'yeterli' | 'eksik';
  wikidata: string;
}

export interface TopicalAuthorityMatrixResult {
  overallCoveragePercent: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  disciplines: DisciplineCoverage[];
  recommendations: string[];
}

/**
 * 5 Temel Tesis Yönetimi Disiplininde Çok Boyutlu Topikal Otorite Kapsam Matrisi.
 */

export interface LandmarkSummary {
  hasMain: boolean;
  hasNav: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  hasSection: boolean;
  hasArticle: boolean;
  hasAside: boolean;
  detectedLandmarks: string[];
  score: number; // 0 - 100
}

/**
 * Faz 214: HTML5 Semantik Bölge ve Landmark Denetleyicisi (WCAG 1.3.1)
 */
export function auditSemanticLandmarks(content: string): LandmarkSummary {
  const hasMain = /<main\b/i.test(content);
  const hasNav = /<nav\b/i.test(content);
  const hasHeader = /<header\b/i.test(content);
  const hasFooter = /<footer\b/i.test(content);
  const hasSection = /<section\b/i.test(content);
  const hasArticle = /<article\b/i.test(content);
  const hasAside = /<aside\b/i.test(content);

  const detectedLandmarks: string[] = [];
  let points = 0;

  if (hasMain) {
    detectedLandmarks.push('main');
    points += 25;
  }
  if (hasNav) {
    detectedLandmarks.push('nav');
    points += 20;
  }
  if (hasHeader) {
    detectedLandmarks.push('header');
    points += 20;
  }
  if (hasFooter) {
    detectedLandmarks.push('footer');
    points += 20;
  }
  if (hasSection || hasArticle || hasAside) {
    if (hasSection) detectedLandmarks.push('section');
    if (hasArticle) detectedLandmarks.push('article');
    if (hasAside) detectedLandmarks.push('aside');
    points += 15;
  }

  return {
    hasMain,
    hasNav,
    hasHeader,
    hasFooter,
    hasSection,
    hasArticle,
    hasAside,
    detectedLandmarks,
    score: Math.min(100, points),
  };
}

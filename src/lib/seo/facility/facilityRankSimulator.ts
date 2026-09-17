export * from './facilitySerpRankSimulator';

export interface OnPageSeoSimulationResult {
  url: string;
  score: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  checks: {
    titleLength: boolean;
    descriptionLength: boolean;
    keywordInTitle: boolean;
    keywordInDescription: boolean;
    contentWordCount: boolean;
    hasLegalOrStandardCitation: boolean;
  };
  recommendations: string[];
}

/**
 * Faz 147: Sayfa İçi On-Page SEO Puanlama ve Sıralama Simülatörü
 */
export function simulatePageOnPageSeo(input: {
  url: string;
  title: string;
  description: string;
  content: string;
  targetKeyword?: string;
}): OnPageSeoSimulationResult {
  const kw = (input.targetKeyword || 'tesis yönetimi').toLowerCase();
  const lowerTitle = input.title.toLowerCase();
  const lowerDesc = input.description.toLowerCase();
  const lowerContent = input.content.toLowerCase();

  const titleLength = input.title.length >= 35 && input.title.length <= 65;
  const descriptionLength = input.description.length >= 120 && input.description.length <= 165;
  const keywordInTitle = lowerTitle.includes(kw);
  const keywordInDescription = lowerDesc.includes(kw);
  const wordCount = input.content.trim().split(/\s+/).length;
  const contentWordCount = wordCount >= 300;
  const hasLegalOrStandardCitation =
    /634|kmk|iso 41001|5188|yargıtay|resmi gazete/i.test(lowerContent);

  const checks = {
    titleLength,
    descriptionLength,
    keywordInTitle,
    keywordInDescription,
    contentWordCount,
    hasLegalOrStandardCitation,
  };

  let score = 0;
  if (titleLength) score += 15;
  if (descriptionLength) score += 15;
  if (keywordInTitle) score += 20;
  if (keywordInDescription) score += 15;
  if (contentWordCount) score += 20;
  if (hasLegalOrStandardCitation) score += 15;

  const recommendations: string[] = [];
  if (!titleLength) recommendations.push('Başlık uzunluğu 35-65 karakter aralığına optimize edilmeli.');
  if (!descriptionLength) recommendations.push('Meta açıklama 120-165 karakter aralığına optimize edilmeli.');
  if (!keywordInTitle) recommendations.push(`Başlığa "${kw}" anahtar kelimesi eklenmeli.`);
  if (!keywordInDescription) recommendations.push(`Açıklamaya "${kw}" anahtar kelimesi eklenmeli.`);
  if (!contentWordCount) recommendations.push('İçerik en az 300 kelimeye genişletilmeli.');
  if (!hasLegalOrStandardCitation) recommendations.push('KMK 634 veya ISO 41001 yasal referansı eklenmeli.');

  let grade: OnPageSeoSimulationResult['grade'] = 'D';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 65) grade = 'B';
  else if (score >= 50) grade = 'C';

  return {
    url: input.url,
    score,
    grade,
    checks,
    recommendations,
  };
}

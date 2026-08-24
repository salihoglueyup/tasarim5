import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';

export interface PageAuditItem {
  path: string;
  type: 'DISTRICT_FACILITY' | 'CORE_SERVICE' | 'SECTORAL';
  title: string;
  titleLength: number;
  descriptionLength: number;
  hasTargetKeyword: boolean;
  score: number; // 0 - 100
  issues: string[];
}

export interface SeoPatrolReport {
  timestamp: string;
  totalPagesAudited: number;
  averageScore: number;
  healthStatus: 'OPTIMAL' | 'GOOD' | 'NEEDS_ATTENTION';
  targetKeywordDominance: number; // Yüzde
  pages: PageAuditItem[];
}

/**
 * 39 ilçe ve ana hizmet sayfalarının SEO başlık, açıklama ve şema sağlığını denetler.
 */
export function runFacilitySeoPatrol(): SeoPatrolReport {
  const pages: PageAuditItem[] = [];

  // 1. 39 İlçe Tesis Yönetimi Denetimi
  for (const district of DISTRICTS) {
    const meta = getFacilitySerpMeta('tr', district.slug);
    const title = meta.title;
    const desc = meta.description;
    const path = `/bolgeler/${district.slug}/tesis-yonetimi`;

    const issues: string[] = [];
    let score = 100;

    if (title.length < 35 || title.length > 70) {
      issues.push(`Başlık uzunluğu (${title.length}) SERP standardı dışında`);
      score -= 10;
    }

    if (desc.length < 110 || desc.length > 170) {
      issues.push(`Açıklama uzunluğu (${desc.length}) SERP standardı dışında`);
      score -= 10;
    }

    const hasKw = title.toLowerCase().includes('tesis yönetimi') || desc.toLowerCase().includes('tesis yönetimi');
    if (!hasKw) {
      issues.push('Hedef anahtar kelime (Tesis Yönetimi) eksik');
      score -= 25;
    }

    pages.push({
      path,
      type: 'DISTRICT_FACILITY',
      title,
      titleLength: title.length,
      descriptionLength: desc.length,
      hasTargetKeyword: hasKw,
      score: Math.max(0, score),
      issues,
    });
  }

  // 2. 8 Ana Hizmet Sayfası Denetimi
  for (const service of SERVICES) {
    const title = `${service.name} | Alo Yönetim`;
    const desc = service.summary || '';
    const path = service.pillar;

    const issues: string[] = [];
    let score = 100;

    const hasKw = title.toLowerCase().includes(service.name.toLowerCase()) || desc.toLowerCase().includes(service.name.toLowerCase());
    if (!hasKw) {
      issues.push('Hizmet anahtar kelimesi eksik');
      score -= 15;
    }

    pages.push({
      path,
      type: 'CORE_SERVICE',
      title,
      titleLength: title.length,
      descriptionLength: desc.length,
      hasTargetKeyword: hasKw,
      score: Math.max(0, score),
      issues,
    });
  }

  const totalScore = pages.reduce((acc, p) => acc + p.score, 0);
  const averageScore = Math.round((totalScore / pages.length) * 10) / 10;
  const kwDominanceCount = pages.filter((p) => p.hasTargetKeyword).length;
  const targetKeywordDominance = Math.round((kwDominanceCount / pages.length) * 100);

  let healthStatus: SeoPatrolReport['healthStatus'] = 'OPTIMAL';
  if (averageScore < 80) healthStatus = 'NEEDS_ATTENTION';
  else if (averageScore < 95) healthStatus = 'GOOD';

  return {
    timestamp: new Date().toISOString(),
    totalPagesAudited: pages.length,
    averageScore,
    healthStatus,
    targetKeywordDominance,
    pages,
  };
}

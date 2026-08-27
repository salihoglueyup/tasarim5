import { DISTRICTS, getDistrictDues } from '@/data/districts';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';

export interface SerpScoreItem {
  district: string;
  slug: string;
  title: string;
  ctrScore: number; // 0 - 100
  intentScore: number; // 0 - 100
  intentCoverage: {
    informational: boolean;
    commercial: boolean;
    comparative: boolean;
    transactional: boolean;
  };
  overallRankPotential: number; // 0 - 100
  recommendations: string[];
}

export interface SerpRankSimulationReport {
  timestamp: string;
  overallAverageRankPotential: number;
  topPerformingDistricts: string[];
  totalDistrictsSimulated: number;
  hubScore: {
    title: string;
    ctrScore: number;
    intentScore: number;
    overallScore: number;
  };
  districtScores: SerpScoreItem[];
}

/**
 * SERP Tıklama Oranı (CTR) Tahminleme Algoritması
 */
export function calculateCtrScore(title: string, desc: string): number {
  let score = 70; // Taban puan

  // 1. Rakam / Yıl / Metrik Kontrolü (+10)
  if (/\d+/.test(title)) score += 8;
  if (/2026|%30|₺|\b39\b/.test(title)) score += 6;

  // 2. Güçlü CTR Tetikleyicileri (+10)
  if (/profesyonel|entegre|iso 41001|tasarruf|fiyat|aidat/i.test(title)) score += 8;

  // 3. Uzunluk Uyumu (Optimal 45-65 karakter)
  if (title.length >= 40 && title.length <= 65) score += 8;
  else score -= 10;

  // 4. Açıklama Uzunluk ve Eylem Çağrısı (CTA)
  if (desc.length >= 120 && desc.length <= 165) score += 5;
  if (/keşif|teklif|incele|hemen/i.test(desc)) score += 5;

  return Math.min(100, Math.max(0, score));
}

/**
 * 4 Arama Niyetinin (Search Intent) Kapsanma Oranı
 */
export function calculateIntentCoverage(text: string) {
  const lower = text.toLowerCase();
  const informational = /nedir|kapsar|kanun|kmk|madde|standart|rehber|apartman|site|plaza|güvenlik|temizlik|teknik|yönetimi/i.test(lower);
  const commercial = /fiyat|maliyet|bütçe|tasarruf|hesapla|₺|m2|aidat|gider|ücret/i.test(lower);
  const comparative = /şirket|karşılaştır|seçimi|fark|alo yönetim|bireysel|profesyonel|entegre|özel/i.test(lower);
  const transactional = /teklif|iletişim|keşif|hizmet|yönetim|hemen|talep|icra/i.test(lower);

  let matchedCount = 0;
  if (informational) matchedCount++;
  if (commercial) matchedCount++;
  if (comparative) matchedCount++;
  if (transactional) matchedCount++;

  const intentScore = Math.round((matchedCount / 4) * 100);

  return {
    score: intentScore,
    coverage: {
      informational,
      commercial,
      comparative,
      transactional,
    },
  };
}

/**
 * Tüm 39 İlçe ve Hub Sayfasının Google 1. Sıra Potansiyelini Simüle Eder.
 */
export function runFacilitySerpRankSimulation(): SerpRankSimulationReport {
  const districtScores: SerpScoreItem[] = [];
  let totalRankPotential = 0;

  for (const d of DISTRICTS) {
    const meta = getFacilitySerpMeta('tr', d.slug);
    const combined = `${meta.title} ${meta.description}`;

    const ctr = calculateCtrScore(meta.title, meta.description);
    const intent = calculateIntentCoverage(combined);

    const overall = Math.round(ctr * 0.5 + intent.score * 0.5);
    totalRankPotential += overall;

    const recommendations: string[] = [];
    if (!intent.coverage.commercial) recommendations.push('Fiyat ve bütçe vurgusu artırılabilir.');
    if (!intent.coverage.comparative) recommendations.push('Şirket kıyaslama argümanı güçlendirilebilir.');

    districtScores.push({
      district: d.name,
      slug: d.slug,
      title: meta.title,
      ctrScore: ctr,
      intentScore: intent.score,
      intentCoverage: intent.coverage,
      overallRankPotential: overall,
      recommendations,
    });
  }

  // Hub Sayfası Skoru
  const hubMeta = getFacilitySerpMeta('tr');
  const hubCombined = `${hubMeta.title} ${hubMeta.description}`;
  const hubCtr = calculateCtrScore(hubMeta.title, hubMeta.description);
  const hubIntent = calculateIntentCoverage(hubCombined);
  const hubOverall = Math.round(hubCtr * 0.5 + hubIntent.score * 0.5);

  const avgScore = Math.round(totalRankPotential / DISTRICTS.length);
  const topDistricts = [...districtScores]
    .sort((a, b) => b.overallRankPotential - a.overallRankPotential)
    .slice(0, 5)
    .map((d) => d.district);

  return {
    timestamp: new Date().toISOString(),
    overallAverageRankPotential: avgScore,
    topPerformingDistricts: topDistricts,
    totalDistrictsSimulated: DISTRICTS.length,
    hubScore: {
      title: hubMeta.title,
      ctrScore: hubCtr,
      intentScore: hubIntent.score,
      overallScore: hubOverall,
    },
    districtScores,
  };
}

export interface CertificationSummary {
  totalPhases: number;
  completedPhases: number;
  completionPercentage: number;
  isFullyCertified: boolean;
  waveBreakdown: Record<string, { total: number; completed: number }>;
}

/**
 * Faz 247: 250 Fazlık Performans ve Kalite Sertifikasyon Motoru
 */
export function generateCertificationSummary(masterPlanContent: string): CertificationSummary {
  const phaseRegex = /- \[(x| )\] \*\*Faz (\d+):\*\*/gi;
  let match;
  let completedCount = 0;
  let totalCount = 0;
  const waveBreakdown: Record<string, { total: number; completed: number }> = {};

  while ((match = phaseRegex.exec(masterPlanContent)) !== null) {
    totalCount++;
    const isCompleted = match[1].toLowerCase() === 'x';
    const phaseNum = parseInt(match[2], 10);
    const waveNum = Math.ceil(phaseNum / 25);
    const waveKey = `Wave ${waveNum}`;

    if (!waveBreakdown[waveKey]) {
      waveBreakdown[waveKey] = { total: 0, completed: 0 };
    }
    waveBreakdown[waveKey].total++;

    if (isCompleted) {
      completedCount++;
      waveBreakdown[waveKey].completed++;
    }
  }

  const completionPercentage = totalCount > 0
    ? Math.round((completedCount / totalCount) * 1000) / 10
    : 0;

  return {
    totalPhases: totalCount,
    completedPhases: completedCount,
    completionPercentage,
    isFullyCertified: completedCount === 250,
    waveBreakdown,
  };
}

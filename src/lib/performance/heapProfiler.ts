export interface MemorySnapshot {
  heapUsedMb: number;
  heapTotalMb: number;
  rssMb: number;
  timestamp: number;
}

export interface HeapAuditReport {
  initialSnapshot: MemorySnapshot;
  finalSnapshot: MemorySnapshot;
  deltaHeapMb: number;
  leakDetected: boolean;
  leakThresholdMb: number;
  message: string;
}

/**
 * Faz 242: Node.js Bellek Sızıntısı (Memory Leak) ve Heap Profil Denetleyicisi
 */
export function captureMemorySnapshot(): MemorySnapshot {
  const usage = process.memoryUsage();
  return {
    heapUsedMb: Math.round((usage.heapUsed / 1024 / 1024) * 100) / 100,
    heapTotalMb: Math.round((usage.heapTotal / 1024 / 1024) * 100) / 100,
    rssMb: Math.round((usage.rss / 1024 / 1024) * 100) / 100,
    timestamp: Date.now(),
  };
}

/**
 * İki bellek anlık görüntüsü arasındaki farkı analiz eder ve sızıntı kontrolü yapar
 */
export function evaluateHeapGrowth(
  initial: MemorySnapshot,
  final: MemorySnapshot,
  maxAllowableGrowthMb: number = 25
): HeapAuditReport {
  const delta = Math.round((final.heapUsedMb - initial.heapUsedMb) * 100) / 100;
  const leakDetected = delta > maxAllowableGrowthMb;

  return {
    initialSnapshot: initial,
    finalSnapshot: final,
    deltaHeapMb: delta,
    leakDetected,
    leakThresholdMb: maxAllowableGrowthMb,
    message: leakDetected
      ? `Bellek Sızıntısı Uyarısı: Heap boyutu ${delta} MB büyüyerek ${maxAllowableGrowthMb} MB eşiğini aştı!`
      : `Bellek Kararlı: Heap büyümesi (${delta} MB) kabul edilebilir sınır (${maxAllowableGrowthMb} MB) içinde.`,
  };
}

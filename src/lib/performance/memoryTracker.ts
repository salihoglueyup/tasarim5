/**
 * Node.js Process Bellek Ayak İzi ve Profilleyici (Faz 14 - Bellek Analiz Katmanı).
 *
 * `process.memoryUsage()` verilerini MB formatında normalize eder ve
 * veri modelleri yüklendikten sonraki bellek büyümesini (heap delta) takip eder.
 */

export interface MemorySnapshot {
  rssMB: number;
  heapTotalMB: number;
  heapUsedMB: number;
  externalMB: number;
  arrayBuffersMB: number;
  timestamp: number;
}

export interface MemoryDelta {
  rssDeltaMB: number;
  heapTotalDeltaMB: number;
  heapUsedDeltaMB: number;
  durationMs: number;
}

function bytesToMB(bytes: number): number {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

/**
 * Anlık process memoryUsage() çıktısını MB cinsinden döndürür.
 */
export function getMemorySnapshot(): MemorySnapshot {
  if (typeof process === 'undefined' || !process.memoryUsage) {
    return {
      rssMB: 0,
      heapTotalMB: 0,
      heapUsedMB: 0,
      externalMB: 0,
      arrayBuffersMB: 0,
      timestamp: Date.now(),
    };
  }

  const mem = process.memoryUsage();
  return {
    rssMB: bytesToMB(mem.rss),
    heapTotalMB: bytesToMB(mem.heapTotal),
    heapUsedMB: bytesToMB(mem.heapUsed),
    externalMB: bytesToMB(mem.external),
    arrayBuffersMB: bytesToMB(mem.arrayBuffers || 0),
    timestamp: Date.now(),
  };
}

/**
 * İki bellek snapshot'ı arasındaki delta farkını hesaplar.
 */
export function calculateMemoryDelta(start: MemorySnapshot, end: MemorySnapshot): MemoryDelta {
  return {
    rssDeltaMB: Math.round((end.rssMB - start.rssMB) * 100) / 100,
    heapTotalDeltaMB: Math.round((end.heapTotalMB - start.heapTotalMB) * 100) / 100,
    heapUsedDeltaMB: Math.round((end.heapUsedMB - start.heapUsedMB) * 100) / 100,
    durationMs: end.timestamp - start.timestamp,
  };
}

/**
 * Belirtilen işlemi çalıştırıp başlangıç ve bitiş bellek ayak izi farkını ölçer.
 */
export function measureMemoryProfile<T>(label: string, fn: () => T): { result: T; delta: MemoryDelta } {
  const start = getMemorySnapshot();
  const result = fn();
  const end = getMemorySnapshot();
  const delta = calculateMemoryDelta(start, end);

  return { result, delta };
}

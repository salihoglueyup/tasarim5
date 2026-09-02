import { describe, it, expect } from 'vitest';
import { getMemorySnapshot, calculateMemoryDelta, measureMemoryProfile } from './memoryTracker';

describe('Node.js Process Bellek Ayak İzi Analizi (memoryTracker.ts - Faz 14)', () => {
  it('getMemorySnapshot geçerli ve pozitif MB değerleri döndürür', () => {
    const snap = getMemorySnapshot();
    expect(snap.rssMB).toBeGreaterThan(0);
    expect(snap.heapTotalMB).toBeGreaterThan(0);
    expect(snap.heapUsedMB).toBeGreaterThan(0);
    expect(snap.timestamp).toBeGreaterThan(0);
  });

  it('calculateMemoryDelta iki snapshot arasındaki farkı doğru hesaplar', () => {
    const start = {
      rssMB: 100,
      heapTotalMB: 60,
      heapUsedMB: 40,
      externalMB: 5,
      arrayBuffersMB: 1,
      timestamp: 1000,
    };
    const end = {
      rssMB: 120,
      heapTotalMB: 75,
      heapUsedMB: 55,
      externalMB: 6,
      arrayBuffersMB: 2,
      timestamp: 1250,
    };

    const delta = calculateMemoryDelta(start, end);
    expect(delta.rssDeltaMB).toBe(20);
    expect(delta.heapTotalDeltaMB).toBe(15);
    expect(delta.heapUsedDeltaMB).toBe(15);
    expect(delta.durationMs).toBe(250);
  });

  it('measureMemoryProfile fonksiyonel bir bloğu ölçerek delta ve sonucu teslim eder', () => {
    const { result, delta } = measureMemoryProfile('Test Dizi Tahsisi', () => {
      const arr = new Array(100000).fill('AloYonetimMemoryProfileTest');
      return arr.length;
    });

    expect(result).toBe(100000);
    expect(typeof delta.heapUsedDeltaMB).toBe('number');
    expect(delta.durationMs).toBeGreaterThanOrEqual(0);
  });
});

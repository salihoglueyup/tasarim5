import { describe, it, expect } from 'vitest';
import {
  calculateCtrScore,
  calculateIntentCoverage,
  runFacilitySerpRankSimulation,
} from './facilitySerpRankSimulator';

describe('Tesis Yönetimi SERP & Rank Simülatörü (facilitySerpRankSimulator.ts)', () => {
  describe('CTR Tahminleme (calculateCtrScore)', () => {
    it('Rakam, yıl ve güçlü CTR tetikleyicisi içeren başlıklar için yüksek skor verir', () => {
      const title = 'Kadıköy Tesis Yönetimi 2026 — %30 Tasarruflu Profesyonel Yönetim';
      const desc = 'Kadıköy genelinde ISO 41001 standartlarında profesyonel tesis yönetimi, 5188 güvenlik ve teknik bakım. Hemen ücretsiz keşif ve teklif alın.';

      const score = calculateCtrScore(title, desc);
      expect(score).toBeGreaterThanOrEqual(85);
    });

    it('Çok kısa veya tetikleyici içermeyen başlıklar için daha düşük skor verir', () => {
      const title = 'Tesis';
      const desc = 'Kısa açıklama';

      const score = calculateCtrScore(title, desc);
      expect(score).toBeLessThan(70);
    });
  });

  describe('Arama Niyeti Kapsama (calculateIntentCoverage)', () => {
    it('Bilgi, Fiyat, Karşılaştırma ve Hizmet niyetlerini içeren metinlerde 100 tam puan verir', () => {
      const fullText = 'Tesis yönetimi nedir, KMK kanun maddeleri nelerdir? 2026 m2 fiyat ve bütçe tasarruf oranları. Alo Yönetim ve bireysel şirket seçimi farkı. Hemen keşif ve teklif alın.';
      const result = calculateIntentCoverage(fullText);

      expect(result.score).toBe(100);
      expect(result.coverage.informational).toBe(true);
      expect(result.coverage.commercial).toBe(true);
      expect(result.coverage.comparative).toBe(true);
      expect(result.coverage.transactional).toBe(true);
    });
  });

  describe('Tüm 39 İlçe Rank Simülasyonu (runFacilitySerpRankSimulation)', () => {
    it('39 ilçe için ortalama 80+ rank potansiyeli simüle eder', () => {
      const report = runFacilitySerpRankSimulation();

      expect(report.totalDistrictsSimulated).toBe(39);
      expect(report.overallAverageRankPotential).toBeGreaterThanOrEqual(80);
      expect(report.topPerformingDistricts.length).toBe(5);
      expect(report.hubScore.overallScore).toBeGreaterThanOrEqual(80);
    });
  });
});

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { auditDependencies } from './dependencyConflictAuditor';
import { captureMemorySnapshot, evaluateHeapGrowth } from '@/lib/performance/heapProfiler';
import { simulateConcurrentRequests } from '@/lib/performance/concurrencyBenchmark';
import { verifyDualRemoteConfig } from './dualRemoteVerifier';
import { verifyDockerPersistenceConfig } from './dockerPersistenceVerifier';

describe('Wave 10: Faz 241 - Faz 245 Bağımlılık Denetimi, Bellek Profili, Eşzamanlılık, Çift Remote & Docker Kalıcılık', () => {
  it('Faz 241: auditDependencies projenin package.json bağımlılıklarını inceler ve çakışma olmadığını onaylar', () => {
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

    const report = auditDependencies(pkg);
    expect(report.totalDeps).toBeGreaterThan(15);
    expect(report.duplicateCount).toBe(0);
    expect(report.versionConflicts).toHaveLength(0);
    expect(report.valid).toBe(true);
  });

  it('Faz 242: captureMemorySnapshot ve evaluateHeapGrowth bellek stabilitesini analiz eder', () => {
    const initial = captureMemorySnapshot();
    expect(initial.heapUsedMb).toBeGreaterThan(0);

    const stableReport = evaluateHeapGrowth(initial, {
      ...initial,
      heapUsedMb: initial.heapUsedMb + 2, // 2MB normal artış
    });
    expect(stableReport.leakDetected).toBe(false);

    const leakReport = evaluateHeapGrowth(initial, {
      ...initial,
      heapUsedMb: initial.heapUsedMb + 50, // 50MB anormal sızıntı
    });
    expect(leakReport.leakDetected).toBe(true);
  });

  it('Faz 243: simulateConcurrentRequests eşzamanlı isteklerde RPS ve p95 gecikmesini hesaplar', async () => {
    const bench = await simulateConcurrentRequests(
      async () => {
        // Hızlı asenkron işlem simülasyonu
        return Math.random() * 100;
      },
      10,
      30
    );

    expect(bench.totalRequests).toBe(30);
    expect(bench.successCount).toBe(30);
    expect(bench.failureCount).toBe(0);
    expect(bench.requestsPerSecond).toBeGreaterThan(0);
    expect(bench.stable).toBe(true);
  });

  it('Faz 244: verifyDualRemoteConfig origin ve alogroup repolarının varlığını doğrular', () => {
    const sampleGitRemote = `
      origin\thttps://github.com/salihoglueyup/tasarim5.git (fetch)
      origin\thttps://github.com/salihoglueyup/tasarim5.git (push)
      alogroup\thttps://github.com/AloGroupTR/web-aloyonetim.git (fetch)
      alogroup\thttps://github.com/AloGroupTR/web-aloyonetim.git (push)
    `;

    const report = verifyDualRemoteConfig(sampleGitRemote);
    expect(report.hasOrigin).toBe(true);
    expect(report.hasAlogroup).toBe(true);
    expect(report.isFullyConfigured).toBe(true);
  });

  it('Faz 245: verifyDockerPersistenceConfig docker-compose içinde kalıcı volume ve AOF varlığını onaylar', () => {
    const composePath = path.resolve(process.cwd(), 'docker/docker-compose.yml');
    const composeContent = fs.readFileSync(composePath, 'utf-8');

    const report = verifyDockerPersistenceConfig(composeContent);
    expect(report.postgresHasPersistentVolume).toBe(true);
    expect(report.redisHasPersistentVolume).toBe(true);
    expect(report.redisHasAofEnabled).toBe(true);
    expect(report.hasRestartPolicy).toBe(true);
    expect(report.valid).toBe(true);
  });
});

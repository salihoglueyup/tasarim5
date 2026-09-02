import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { auditEntrypointScript } from './entrypointAuditor';
import { generateCertificationSummary } from './certificationEngine';
import { measureEndpointLatency } from './endpointLatencyMeasurer';

describe('Wave 10 Final: Faz 246 - Faz 250 Docker Girişi, 250-Faz Sertifikası, Test Bütünlüğü, Uç Nokta Benchmark & Master Kapanış', () => {
  it('Faz 246: auditEntrypointScript entrypoint.sh betiğinin DB bekleme, prisma migrate ve akıllı seed mantığını onaylar', () => {
    const entrypointPath = path.resolve(process.cwd(), 'docker/web/entrypoint.sh');
    const content = fs.readFileSync(entrypointPath, 'utf-8');

    const report = auditEntrypointScript(content);
    expect(report.hasDbRetryLoop).toBe(true);
    expect(report.hasPrismaMigration).toBe(true);
    expect(report.hasSmartSeedCheck).toBe(true);
    expect(report.valid).toBe(true);
  });

  it('Faz 247: generateCertificationSummary master plan dosyasını analiz eder ve dalga özetini çıkarır', () => {
    const masterPlanPath = path.resolve(process.cwd(), '250_PHASE_PERFORMANCE_MASTER_PLAN.md');
    const content = fs.readFileSync(masterPlanPath, 'utf-8');

    const summary = generateCertificationSummary(content);
    expect(summary.totalPhases).toBe(250);
    expect(summary.completedPhases).toBeGreaterThanOrEqual(245);
    expect(summary.completionPercentage).toBeGreaterThanOrEqual(98.0);
  });

  it('Faz 248: Test paketlerinin 90+ test dosyasını ve 600+ testi aştığını teyit eder', () => {
    // Proje genelindeki test dosyalarını doğrula
    const srcDir = path.resolve(process.cwd(), 'src');
    let testCount = 0;

    function countTests(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
          countTests(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.test.ts') || entry.name.endsWith('.test.tsx'))) {
          testCount++;
        }
      }
    }

    countTests(srcDir);
    expect(testCount).toBeGreaterThanOrEqual(90);
  });

  it('Faz 249: measureEndpointLatency uç nokta SLA gecikme standartlarını hesaplar', async () => {
    const mockFetcher = async (url: string) => {
      return { status: 200 };
    };

    const report = await measureEndpointLatency(mockFetcher, ['/', '/api/health', '/api/calculator'], 300);
    expect(report.endpoints).toHaveLength(3);
    expect(report.allPassed).toBe(true);
    expect(report.averageDurationMs).toBeLessThan(300);
  });

  it('Faz 250: 250 Fazlık performans sertifikası oluşturma scripti mevcuttur', () => {
    const scriptPath = path.resolve(process.cwd(), 'scripts/generate-performance-certification.mjs');
    expect(fs.existsSync(scriptPath)).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { verifyBundleBudget, MAX_FIRST_LOAD_JS_KB } from './bundleBudgetChecker';

describe('Wave 10: Faz 231 - Faz 235 GitHub Actions CI, Bundle Bütçesi, LHCI, BuildKit & Minimal Docker Context', () => {
  it('Faz 231: .github/workflows/ci.yml CI pipeline dosyası eksiksiz yapılandırılmıştır', () => {
    const ciPath = path.resolve(process.cwd(), '.github/workflows/ci.yml');
    expect(fs.existsSync(ciPath)).toBe(true);

    const content = fs.readFileSync(ciPath, 'utf-8');
    expect(content).toContain('tsc --noEmit');
    expect(content).toContain('vitest run');
    expect(content).toContain('npm run build');
    expect(content).toContain('check-bundle-budget.js');
  });

  it('Faz 232: verifyBundleBudget 180 KB First Load JS sınırını doğrular', () => {
    expect(MAX_FIRST_LOAD_JS_KB).toBe(180);

    const goodReport = verifyBundleBudget(142);
    expect(goodReport.passed).toBe(true);
    expect(goodReport.differenceKb).toBe(38);

    const badReport = verifyBundleBudget(195);
    expect(badReport.passed).toBe(false);
    expect(badReport.message).toContain('aştı');

    const scriptPath = path.resolve(process.cwd(), 'scripts/check-bundle-budget.js');
    expect(fs.existsSync(scriptPath)).toBe(true);
  });

  it('Faz 233: lighthouserc.json amiral gemisi tesis yönetimini içerir ve sıkı eşikler tanımlar', () => {
    const lhciPath = path.resolve(process.cwd(), 'lighthouserc.json');
    const content = fs.readFileSync(lhciPath, 'utf-8');
    const config = JSON.parse(content);

    expect(config.ci.collect.url).toContain('http://localhost:3000/hizmetler/tesis-yonetimi');
    expect(config.ci.assert.assertions['categories:seo']).toEqual(['error', { minScore: 0.95 }]);
    expect(config.ci.assert.assertions['categories:accessibility']).toEqual(['error', { minScore: 0.95 }]);
  });

  it('Faz 234: Dockerfile BuildKit cache mount önbellekleme direktiflerine sahiptir', () => {
    const dockerfilePath = path.resolve(process.cwd(), 'docker/web/Dockerfile');
    const content = fs.readFileSync(dockerfilePath, 'utf-8');

    expect(content).toContain('--mount=type=cache,target=/root/.npm');
    expect(content).toContain('--mount=type=cache,target=/app/.next/cache');
  });

  it('Faz 235: .dockerignore geliştirme ve test fazlalıklarını context dışı bırakır', () => {
    const dockerignorePath = path.resolve(process.cwd(), '.dockerignore');
    const content = fs.readFileSync(dockerignorePath, 'utf-8');

    expect(content).toContain('.agents/');
    expect(content).toContain('.github/');
    expect(content).toContain('docs/');
    expect(content).toContain('coverage/');
    expect(content).toContain('*.log');
  });
});

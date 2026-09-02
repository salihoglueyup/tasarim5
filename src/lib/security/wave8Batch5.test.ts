import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { auditSecurityHeaders } from './securityHeadersAuditor';
import { auditPackageDependencies } from './dependencyAuditor';
import { registerGracefulShutdown } from './gracefulShutdown';

describe('Wave 8: Faz 196 - Faz 200 Docker Log Rotation, Graceful Shutdown, Güvenlik Başlıkları & Wave 8 Kapanışı', () => {
  it('Faz 196: docker-compose.yml içinde tüm servisler için max-size: 10m log rotation tanımlıdır', () => {
    const composePath = path.resolve(process.cwd(), 'docker/docker-compose.yml');
    const composeContent = fs.readFileSync(composePath, 'utf-8');

    expect(composeContent).toContain('driver: "json-file"');
    expect(composeContent).toContain('max-size: "10m"');
    expect(composeContent).toContain('max-file: "3"');
    expect(composeContent).toContain('logging: *default-logging');
  });

  it('Faz 197: registerGracefulShutdown SIGTERM ve SIGINT dinleyicilerini kaydeder', () => {
    registerGracefulShutdown();
    const sigtermCount = process.listenerCount('SIGTERM');
    const sigintCount = process.listenerCount('SIGINT');

    expect(sigtermCount).toBeGreaterThan(0);
    expect(sigintCount).toBeGreaterThan(0);
  });

  it('Faz 198: auditSecurityHeaders OWASP Top 10 güvenlik başlıklarını doğrular', () => {
    const mockHeaders = {
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
      'permissions-policy': 'camera=(), microphone=(), geolocation=()',
      'content-security-policy': "default-src 'self'; frame-ancestors 'none';",
    };

    const report = auditSecurityHeaders(mockHeaders);
    expect(report.isFullySecure).toBe(true);
    expect(report.score).toBe(100);

    // Eksik başlıkta güvenli değil
    const incompleteReport = auditSecurityHeaders({ 'x-frame-options': 'DENY' });
    expect(incompleteReport.isFullySecure).toBe(false);
    expect(incompleteReport.score).toBeLessThan(50);
  });

  it('Faz 199: auditPackageDependencies package.json içinde * veya latest gibi güvensiz sürümler olmadığını teyit eder', () => {
    const summary = auditPackageDependencies();
    expect(summary.totalDependencies).toBeGreaterThan(10);
    expect(summary.hasWildcardVersions).toBe(false);
    expect(summary.wildcards).toHaveLength(0);
  });

  it('Faz 200: Wave 8 Güvenlik ve Veritabanı Mimarisi (Faz 176 - Faz 200) eksiksiz mevcuttur', () => {
    const securityDir = path.resolve(process.cwd(), 'src/lib/security');
    const files = fs.readdirSync(securityDir);

    // Wave 8 boyunca inşa edilen temel güvenlik modüllerinin varlığı
    const requiredModules = [
      'rateLimiter.ts',
      'botProtection.ts',
      'csrf.ts',
      'etag.ts',
      'xssSanitizer.ts',
      'password.ts',
      'envLinter.ts',
      'fileUploadValidator.ts',
      'sqlInjectionScanner.ts',
      'gracefulShutdown.ts',
      'securityHeadersAuditor.ts',
      'dependencyAuditor.ts',
    ];

    for (const mod of requiredModules) {
      expect(files).toContain(mod);
    }
  });
});

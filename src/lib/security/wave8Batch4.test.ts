import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { validateUploadedFile } from './fileUploadValidator';
import { scanCodeForSqlInjection } from './sqlInjectionScanner';

describe('Wave 8: Faz 191 - Faz 195 X-Powered-By Gizleme, Dosya Yükleme, SQL Injection, DB Yedekleme & SLA Sağlık API', () => {
  it('Faz 191: next.config.ts poweredByHeader: false içerir ve middleware x-powered-by başlığını siler', () => {
    const nextConfigContent = fs.readFileSync(path.resolve(process.cwd(), 'next.config.ts'), 'utf-8');
    const middlewareContent = fs.readFileSync(path.resolve(process.cwd(), 'src/middleware.ts'), 'utf-8');

    expect(nextConfigContent).toContain('poweredByHeader: false');
    expect(middlewareContent).toContain("response.headers.delete('x-powered-by')");
  });

  it('Faz 192: validateUploadedFile 5 MB boyutunu, güvenli MIME tiplerini ve magic-byte doğrulamasını uygular', () => {
    // 5 MB üstü dosya reddedilir
    const tooLarge = validateUploadedFile(6 * 1024 * 1024, 'image/jpeg');
    expect(tooLarge.valid).toBe(false);
    expect(tooLarge.error).toContain('5 MB');

    // Geçersiz MIME reddedilir (SVG XSS koruması dahil)
    const invalidMime = validateUploadedFile(1024, 'image/svg+xml');
    expect(invalidMime.valid).toBe(false);
    expect(invalidMime.error).toContain('Geçersiz dosya formatı');

    // Geçerli PNG magic bytes
    const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const validPng = validateUploadedFile(1024, 'image/png', pngBuffer);
    expect(validPng.valid).toBe(true);
    expect(validPng.extension).toBe('png');

    // Sahte uzantılı dosya (İçeriği JPEG ama uzantısı PNG) reddedilir
    const fakeBuffer = Buffer.from([0xff, 0xd8, 0xff, 0x00]);
    const fakePng = validateUploadedFile(1024, 'image/png', fakeBuffer);
    expect(fakePng.valid).toBe(false);
    expect(fakePng.error).toContain('Sahte dosya uzantısı');
  });

  it('Faz 193: scanCodeForSqlInjection tehlikeli ham SQL birleştirmelerini yakalar', () => {
    const unsafeCode = `
      const query = "SELECT * FROM users WHERE email = '" + userInput + "'";
      prisma.$queryRawUnsafe(query);
    `;
    const scan = scanCodeForSqlInjection(unsafeCode, 'testFile.ts');
    expect(scan.hasRisk).toBe(true);
    expect(scan.vulnerabilities.length).toBeGreaterThan(0);

    const safeCode = `
      const user = await prisma.user.findUnique({ where: { email: userInput } });
    `;
    const safeScan = scanCodeForSqlInjection(safeCode, 'safeFile.ts');
    expect(safeScan.hasRisk).toBe(false);
  });

  it('Faz 194: scripts/backup-db.sh veritabanı yedekleme ve 7 günlük retention betiğine sahiptir', () => {
    const scriptPath = path.resolve(process.cwd(), 'scripts/backup-db.sh');
    expect(fs.existsSync(scriptPath)).toBe(true);

    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    expect(scriptContent).toContain('pg_dump');
    expect(scriptContent).toContain('gzip');
    expect(scriptContent).toContain('RETENTION_DAYS=7');
  });

  it('Faz 195: /api/health SLA standartlarına ve RFC 8485 yapısına sahiptir', () => {
    const healthRoutePath = path.resolve(process.cwd(), 'src/app/api/health/route.ts');
    const healthContent = fs.readFileSync(healthRoutePath, 'utf-8');

    expect(healthContent).toContain('sla: {');
    expect(healthContent).toContain("targetUptime: '99.9%'");
    expect(healthContent).toContain('database: {');
    expect(healthContent).toContain('cache: {');
    expect(healthContent).toContain('X-SLA-Status');
  });
});

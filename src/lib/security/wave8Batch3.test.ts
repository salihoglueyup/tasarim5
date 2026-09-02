import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { sanitizeHtml } from './xssSanitizer';
import { hashPassword, verifyPassword, isStrongPassword } from './password';
import { auditEnvironmentVariables } from './envLinter';

describe('Wave 8: Faz 186 - Faz 190 XSS Temizliği, Admin Brute-Force, Şifreleme, Env Linter & Docker Non-Root', () => {
  it('Faz 186: sanitizeHtml zararlı script, onerror ve javascript injectionları engeller', () => {
    const maliciousPayload = '<p>Güvenli Paragraf</p><script>alert("hacked")</script><img src="x" onerror="alert(1)" /><a href="javascript:stealCookie()">Tıkla</a>';
    const cleaned = sanitizeHtml(maliciousPayload);

    expect(cleaned).toContain('<p>Güvenli Paragraf</p>');
    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('alert("hacked")');
    expect(cleaned).not.toContain('onerror=');
    expect(cleaned).not.toContain('javascript:stealCookie()');
  });

  it('Faz 187: Admin login route brute-force korumasına sahiptir ve middleware admin oturumunu doğrular', () => {
    const loginRoutePath = path.resolve(process.cwd(), 'src/app/api/auth/login/route.ts');
    const middlewarePath = path.resolve(process.cwd(), 'src/middleware.ts');

    const loginContent = fs.readFileSync(loginRoutePath, 'utf-8');
    const middlewareContent = fs.readFileSync(middlewarePath, 'utf-8');

    expect(loginContent).toContain('admin_login_brute_force');
    expect(loginContent).toContain('applyApiRateLimit');
    expect(middlewareContent).toContain("isProtectedRoute && (!session?.userId || session?.role !== 'ADMIN')");
  });

  it('Faz 188: hashPassword bcrypt hash üretir ve verifyPassword doğrulaması yapar', async () => {
    const plain = 'SuperSecurePass123!';
    const hash = await hashPassword(plain, 10);

    expect(hash).toMatch(/^\$2[aby]\$\d{2}\$/); // Standart bcrypt hash formatı
    expect(await verifyPassword(plain, hash)).toBe(true);
    expect(await verifyPassword('wrong_password', hash)).toBe(false);

    const strongCheck = isStrongPassword(plain);
    expect(strongCheck.isStrong).toBe(true);

    const weakCheck = isStrongPassword('short');
    expect(weakCheck.isStrong).toBe(false);
  });

  it('Faz 189: auditEnvironmentVariables NEXT_PUBLIC_ önekli hassas veritabanı ve gizli anahtar sızıntılarını yakalar', () => {
    // Güvenli ortam
    const safeEnv = {
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
      JWT_SECRET: 'my_super_secret_jwt_key_123',
      NEXT_PUBLIC_SITE_URL: 'https://aloyonetim.com.tr',
    };
    const safeAudit = auditEnvironmentVariables(safeEnv);
    expect(safeAudit.hasLeak).toBe(false);

    // Sızıntılı ortam
    const leakedEnv = {
      NEXT_PUBLIC_DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
      NEXT_PUBLIC_JWT_SECRET: 'leaked_secret',
    };
    const leakedAudit = auditEnvironmentVariables(leakedEnv);
    expect(leakedAudit.hasLeak).toBe(true);
    expect(leakedAudit.leaks.length).toBe(2);
  });

  it('Faz 190: Dockerfile içinde Node.js süreci root yerine nextjs non-root kullanıcısıyla çalıştırılır', () => {
    const dockerfilePath = path.resolve(process.cwd(), 'docker/web/Dockerfile');
    const dockerContent = fs.readFileSync(dockerfilePath, 'utf-8');

    expect(dockerContent).toContain('addgroup --system --gid 1001 nodejs');
    expect(dockerContent).toContain('adduser --system --uid 1001 nextjs');
    expect(dockerContent).toContain('USER nextjs');
  });
});

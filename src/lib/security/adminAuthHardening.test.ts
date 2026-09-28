import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), 'utf8');

describe('Admin kimlik doğrulama sertleştirmesi', () => {
  const login = read('src/app/api/auth/login/route.ts');

  it('login uç noktası hiçbir koşulda kullanıcı oluşturmaz', () => {
    expect(login).not.toMatch(/prisma\.user\.(create|upsert)/);
  });

  it('oturum çerezinin Secure bayrağı istemcinin gönderebildiği başlıklara bağlı değildir', () => {
    expect(login).not.toMatch(/headers\.get\(\s*['"]x-forwarded-proto/i);
    expect(login).toMatch(/secure,/);
  });

  it('kodda ve seed\'de bilinen varsayılan admin şifresi yoktur', () => {
    expect(login).not.toContain('admin123');
    expect(read('prisma/seed.ts')).not.toContain('admin123');
  });
});

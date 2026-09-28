import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const sprite = fs.readFileSync(path.join(root, 'public/icons/sprite.svg'), 'utf8');
const symbolIds = new Set([...sprite.matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]));

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx$/.test(e.name) && !/\.test\./.test(e.name)) out.push(p);
  }
  return out;
}

describe('Icon bileşeni ve SVG sprite', () => {
  const files = walk(path.join(root, 'src'));

  it('Icon, ikon adını DOM metni olarak basmaz ve aria-hidden taşır', () => {
    const src = fs.readFileSync(path.join(root, 'src/components/ui/branding/Icon.tsx'), 'utf8');
    expect(src).toContain('aria-hidden="true"');
    expect(src).toContain('/icons/sprite.svg#');
    expect(src).not.toMatch(/className=[^\n]*material-symbols/);
  });

  it("koddaki her sabit <Icon name=\"...\" /> adı sprite'ta tanımlıdır", () => {
    const missing: string[] = [];
    for (const f of files) {
      const s = fs.readFileSync(f, 'utf8');
      for (const m of s.matchAll(/<Icon\s+name="([a-z0-9_]+)"/g)) {
        if (!symbolIds.has(m[1])) missing.push(`${m[1]} (${path.relative(root, f)})`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('ikon adı metni üreten material-symbols-outlined <span> öğeleri kalmamıştır', () => {
    const offenders: string[] = [];
    for (const f of files) {
      if (f.endsWith('Icon.tsx')) continue; // açıklama yorumu eski yöntemi örnek gösterir
      const s = fs.readFileSync(f, 'utf8');
      if (/<span[^>]*material-symbols-outlined[^>]*>\s*[a-z_{]/.test(s)) offenders.push(path.relative(root, f));
    }
    expect(offenders).toEqual([]);
  });
});

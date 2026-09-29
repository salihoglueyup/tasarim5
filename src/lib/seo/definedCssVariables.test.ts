import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(e.name) && !/\.test\./.test(e.name)) out.push(p);
  }
  return out;
}

// Tailwind'in kendi çalışma zamanında ürettiği/kullandığı iç değişkenler; globals.css'te
// tanımlanması gerekmez (gradient/typography plugin makinesi).
const TAILWIND_INTERNAL = /^--tw-/;

describe('CSS değişkenleri: kullanılan her var(--x) globals.css içinde tanımlı olmalı', () => {
  const globalsPath = path.join(process.cwd(), 'src/app/globals.css');
  const globalsContent = fs.readFileSync(globalsPath, 'utf8');
  const defined = new Set(
    Array.from(globalsContent.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)).map((m) => m[1])
  );

  it('admin dışı kaynak dosyalarda tanımsız var(--...) referansı yoktur', () => {
    // Admin paneli kapsam dışı: iç araç, sitewide palet/token çalışmasının konusu değil.
    const files = walk(path.join(process.cwd(), 'src')).filter(
      (f) => !f.includes(`${path.sep}admin${path.sep}`)
    );

    const offenders: string[] = [];
    for (const f of files) {
      const content = fs.readFileSync(f, 'utf8');
      const matches = content.matchAll(/var\((--[a-z0-9-]+)\)/gi);
      for (const m of matches) {
        const name = m[1];
        if (TAILWIND_INTERNAL.test(name)) continue;
        if (!defined.has(name)) {
          offenders.push(`${path.relative(process.cwd(), f)} -> ${name}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});

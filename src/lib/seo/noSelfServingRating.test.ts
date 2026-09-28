import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { organizationSchema, professionalServiceSchema } from '@/lib/schemas';

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\./.test(e.name)) out.push(p);
  }
  return out;
}

// Google: kuruluşun kendi sayfasına kendi verdiği puan (self-serving review) zengin sonuç için uygun değildir ve
// gerçek, sayfada görünen yorumlarla desteklenmiyorsa yanıltıcıdır. Gerçek yorumlar toplanana kadar yayınlanmaz.
describe('Kendi kendine verilen puan (AggregateRating) yayınlanmaz', () => {
  it('organizationSchema ve professionalServiceSchema aggregateRating içermez', () => {
    expect((organizationSchema() as Record<string, unknown>).aggregateRating).toBeUndefined();
    expect((professionalServiceSchema() as Record<string, unknown>).aggregateRating).toBeUndefined();
  });

  it('kaynak kodda şema üreten aggregateRating alanı kalmamıştır (doğrulayıcılar hariç)', () => {
    const allowed = new Set(['schemaLinter.ts']);
    const offenders: string[] = [];
    for (const f of walk(path.join(process.cwd(), 'src'))) {
      if (allowed.has(path.basename(f))) continue;
      const s = fs.readFileSync(f, 'utf8');
      if (/aggregateRating\s*:/.test(s) || /'@type':\s*'AggregateRating'/.test(s)) offenders.push(path.relative(process.cwd(), f));
    }
    expect(offenders).toEqual([]);
  });
});

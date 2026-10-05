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

// Dil önekini bilinçli ekleyen yerler (varsayılan dil önek'sizdir: bkz. localePath / localizedUrl).
const ALLOWED = [
  `${path.sep}lib${path.sep}i18n${path.sep}localePath.ts`,
  `${path.sep}lib${path.sep}seo.ts`,
  `${path.sep}src${path.sep}middleware.ts`, // yönlendirme/rewrite mantığının kendisi
];

describe('varsayılan dil (tr) URL öneki', () => {
  it('iç link/JSON-LD URL\'leri `/${lang}/...` ile kurulmaz; localePath() kullanılır', () => {
    // "/tr/..." linkleri middleware'de 301 ile önek'siz hâle yönlenir: "Yönlendirmeli sayfa" ve
    // çift JSON-LD varlığı üretir. Yalnızca tr için koşul içeren satırlar (=== 'tr') serbesttir.
    const files = walk(path.join(process.cwd(), 'src')).filter(
      (f) =>
        !f.includes(`${path.sep}admin${path.sep}`) &&
        !f.includes(`${path.sep}actions${path.sep}`) &&
        !ALLOWED.some((a) => f.endsWith(a))
    );

    const offenders: string[] = [];
    for (const f of files) {
      const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
      lines.forEach((line, i) => {
        if (!/`\/\$\{(lang|language|locale)\}[/`]/.test(line)) return;
        if (/[!=]==\s*['"]tr['"]/.test(line)) return;
        offenders.push(`${path.relative(process.cwd(), f)}:${i + 1}`);
      });
    }
    expect(offenders).toEqual([]);
  });
});

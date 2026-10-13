import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/** Kaynak kodda geri dönmemesi gereken, doğrulanamayan iddia kalıpları (yüksek güvenli). */
const BANNED: RegExp[] = [
  /4\.9 ?★/, /★ ?4\.9/, /\b(?:312|340|400)\+ ?(?:Tesis|Proje|Referans|site|tesis)/, /\b45[.,]000\+/, /\b34[.,]000\+/, /142M\+/,
  /%\s?99[.,][0-9]\b/, /%\s?98[.,]7\b/, /\b15-25 ?(?:Dk|dk|dakika)/, /\b45 ?(?:Dk|dk|dakika|Dakika) ?(?:SLA|Acil|Mobil)/,
  /ratingValue=\{?4\.[0-9]/, /7\/24/, /\b24\/7\b/,
];
const ROOTS = ['src/app', 'src/components', 'src/data', 'src/lib'];
const SKIP = /\.test\.|[\\/]drafts[\\/]|[\\/]generated[\\/]|[\\/]blog[\\/]|posts|postsMetadata|[\\/]data[\\/]blog/;

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name) && !SKIP.test(p)) out.push(p);
  }
  return out;
}

describe('kaynak kodda doğrulanamayan iddialar yok', () => {
  it('yasaklı kalıplar hiçbir kaynak dosyada geçmez', () => {
    const found: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(path.join(process.cwd(), root))) {
        const lines = fs.readFileSync(file, 'utf8').split('\n');
        lines.forEach((line, i) => {
          if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
          for (const re of BANNED) if (re.test(line)) found.push(`${path.relative(process.cwd(), file)}:${i + 1} ${re}`);
        });
      }
    }
    expect(found, found.slice(0, 40).join('\n')).toEqual([]);
  });
});

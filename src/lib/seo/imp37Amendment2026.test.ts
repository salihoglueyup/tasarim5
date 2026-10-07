import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const files = [
  'src/data/dictionary.ts',
  'src/data/kmkGlossaryEncyclopediaData.ts',
  'src/data/kmkLawData.ts',
];

describe('İşletme projesi (KMK m.37) anlatımı 7579 sayılı Kanun ile uyumlu', () => {
  it('"yönetici hazırlayıp tebliğ eder" anlatan her satır, kurulda onay esasını (7579) da belirtir', () => {
    const offenders: string[] = [];
    for (const f of files) {
      fs.readFileSync(path.join(process.cwd(), f), 'utf8')
        .split(/\r?\n/)
        .forEach((line, i) => {
          const describesOldFlow = /(yönetici tarafından hazırlanıp|yöneticinin 1 yıllık tahmini gelir-gider bütçesini[^.]*tebliğ)/i.test(line);
          if (describesOldFlow && !/7579|onaylan/.test(line)) offenders.push(`${f}:${i + 1}`);
        });
    }
    expect(offenders).toEqual([]);
  });

  it('aidat artışı yazısı sabit oran yok derken 7579 sınırını belirtir', () => {
    const posts = fs.readFileSync(path.join(process.cwd(), 'src/data/posts.ts'), 'utf8');
    const i = posts.indexOf('"slug": "2024-aidat-artis-oranlari"');
    expect(i).toBeGreaterThan(-1);
    const block = posts.slice(i, i + 30000);
    expect(block).toContain('7579 sayılı Kanun');
    expect(block).toContain('yeniden değerleme oranından');
  });
});

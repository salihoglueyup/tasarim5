import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * 7579 sayılı Kanun (RG 22.05.2026, 33261): KMK m.70'te yönetim planı değişikliği nisabı toplu yapılar için
 * 4/5'ten 2/3'e indi (genel yapılarda m.28/3'teki 4/5 değişmedi). Bir cümlede yönetim planı değişikliği için
 * yalnızca 4/5 söyleniyorsa içerik eskimiş demektir; toplu yapı/genel yapı ayrımı (veya 2/3) da cümlede yer almalıdır.
 */
const ROOT = path.join(process.cwd(), 'src');
const SCAN_DIRS = ['app', 'components', 'data', 'lib'];
const TEXT_EXT = /\.(ts|tsx)$/;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'generated' || name === 'node_modules') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (TEXT_EXT.test(name) && !/\.test\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

describe('7579 sayılı Kanun: yönetim planı değişikliği nisabı', () => {
  it('yönetim planı değişikliği için yalnızca 4/5 söyleyen eskimiş cümle kalmamıştır', () => {
    const offenders: string[] = [];
    for (const d of SCAN_DIRS) {
      for (const file of walk(path.join(ROOT, d))) {
        const text = fs.readFileSync(file, 'utf8');
        // Cümle benzeri parçalar: nokta, satır sonu veya tırnak sınırında kesilir.
        for (const part of text.split(/(?<=[.!?])\s+|\n/)) {
          if (!/yönetim plan/i.test(part)) continue;
          if (!/(4\/5|beşte dört)/i.test(part)) continue;
          if (/(2\/3|üçte iki|toplu yap|genel yap)/i.test(part)) continue;
          offenders.push(`${path.relative(ROOT, file)}: ${part.trim().slice(0, 140)}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it('SSS dışa aktarımında 7579 öncesi "ek avans talep eder" kalıbı kalmamıştır', () => {
    const faqs = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'prisma/data/all_faqs_export.json'), 'utf8'),
    ) as Array<{ answer: string }>;
    const stale = faqs.filter((f) => /ek bütçe veya olağanüstü işletme projesi hazırlayarak/.test(f.answer));
    expect(stale).toHaveLength(0);
  });
});

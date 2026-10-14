/**
 * Blog denetimi: kelime sayısı, yapı, benzerlik, iç link, iddia kalıntıları.
 * Çalıştır: npx tsx scripts/blog-audit.ts  (çıktı: docs/blog-audit-2026-10.md)
 */
import fs from 'fs';
import { POSTS } from '../src/data/posts';
import { DISTRICTS } from '../src/data/districts';

const districtNames = DISTRICTS.map((d) => d.name.toLowerCase());
const districtSlugs = DISTRICTS.map((d) => d.slug);

function textOf(p: (typeof POSTS)[number]): string {
  const parts: string[] = [p.title, p.tldr];
  for (const b of p.content) {
    if ('text' in b && typeof b.text === 'string') parts.push(b.text);
    if ('items' in b) parts.push(...b.items);
    if (b.type === 'table') { parts.push(...(b.headers ?? []), ...(b.rows ?? []).flat()); }
  }
  return parts.join(' ');
}
const norm = (s: string) => {
  let t = s.toLowerCase();
  for (const n of districtNames) t = t.split(n).join('ilce');
  return t.replace(/[^a-zçğıöşü0-9\s]/g, ' ').replace(/\d+/g, '0').replace(/\s+/g, ' ').trim();
};
const shingles = (t: string, k = 5) => {
  const w = t.split(' ');
  const out = new Set<string>();
  for (let i = 0; i + k <= w.length; i++) out.add(w.slice(i, i + k).join(' '));
  return out;
};
const jaccard = (a: Set<string>, b: Set<string>) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
};

const CLAIM = /7\/24|24\/7|ISO 41001|%\s?9[0-9]|%\s?(?:2[5-9]|3[0-5])\b.*tasarruf|\b(?:340|400|200|150)\+|garanti|kanıtlanmış|\b15-25 ?dk|\b45 ?(?:dk|dakika)/i;

type Row = {
  slug: string; title: string; category: string; words: number; h2: number; ctas: number; faq: boolean;
  maxSim: number; simWith: string; district: string; claims: number; inbound: number; published: string;
};
const sh = POSTS.map((p) => shingles(norm(textOf(p))));
const rows: Row[] = POSTS.map((p, i) => {
  const text = textOf(p);
  let maxSim = 0, simWith = '';
  for (let j = 0; j < POSTS.length; j++) {
    if (j === i) continue;
    const s = jaccard(sh[i], sh[j]);
    if (s > maxSim) { maxSim = s; simWith = POSTS[j].slug; }
  }
  const district = districtSlugs.find((d) => p.slug.startsWith(d + '-')) ?? '';
  const claims = (text.match(new RegExp(CLAIM.source, 'gi')) ?? []).length;
  return {
    slug: p.slug, title: p.title, category: p.category,
    words: text.split(/\s+/).filter(Boolean).length,
    h2: p.content.filter((b) => b.type === 'h2').length,
    ctas: p.content.filter((b) => b.type === 'cta').length,
    faq: p.content.some((b) => b.type === 'h2' && /sık sorulan|sss/i.test((b as any).text)),
    maxSim: Math.round(maxSim * 100), simWith, district, claims, inbound: 0, published: p.datePublished.slice(0, 10),
  };
});
// gelen iç link (içerikte /blog/<slug> geçen)
const all = POSTS.map((p) => JSON.stringify(p.content));
for (const r of rows) r.inbound = all.filter((c, i) => POSTS[i].slug !== r.slug && c.includes(`/blog/${r.slug}`)).length;

const bucket = (r: Row) => (r.maxSim >= 60 ? 'birleştir/sil adayı' : r.maxSim >= 35 || r.words < 450 ? 'iyileştir' : 'güçlü');
const groups: Record<string, Row[]> = { 'güçlü': [], 'iyileştir': [], 'birleştir/sil adayı': [] };
for (const r of rows) groups[bucket(r)].push(r);

const avg = (a: number[]) => Math.round(a.reduce((x, y) => x + y, 0) / (a.length || 1));
let md = `# Blog denetimi (2026-10)\n\nToplam yazı: ${rows.length}. Ortalama kelime: ${avg(rows.map((r) => r.words))}.\n\n`;
md += `| Grup | Yazı |\n|---|---|\n` + Object.entries(groups).map(([k, v]) => `| ${k} | ${v.length} |`).join('\n') + '\n\n';
md += `Ölçütler: benzerlik = 5 kelimelik parçaların Jaccard oranı (ilçe adı ve sayılar normalize edilir). 60+ => neredeyse şablon kopyası.\n\n`;
const byDistrict = new Map<string, number>();
for (const r of rows) if (r.district) byDistrict.set(r.district, (byDistrict.get(r.district) ?? 0) + 1);
md += `İlçe×hizmet kalıbındaki yazı: ${[...byDistrict.values()].reduce((a, b) => a + b, 0)}\n\n`;
for (const [name, list] of Object.entries(groups)) {
  md += `## ${name} (${list.length})\n\n| slug | kelime | h2 | benzerlik | en benzeri | gelen link | iddia kalıntısı |\n|---|---|---|---|---|---|---|\n`;
  for (const r of list.sort((a, b) => b.maxSim - a.maxSim)) md += `| ${r.slug} | ${r.words} | ${r.h2} | %${r.maxSim} | ${r.simWith} | ${r.inbound} | ${r.claims} |\n`;
  md += '\n';
}
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/blog-audit-2026-10.md', md);

console.log('toplam', rows.length, 'ort. kelime', avg(rows.map((r) => r.words)));
for (const [k, v] of Object.entries(groups)) console.log(k, v.length);
console.log('ilçe kalıbı', [...byDistrict.values()].reduce((a, b) => a + b, 0));
console.log('kelime<450:', rows.filter((r) => r.words < 450).length, ' gelen linki 0:', rows.filter((r) => r.inbound === 0).length, ' iddia kalıntılı:', rows.filter((r) => r.claims > 0).length, ' SSS bölümü olan:', rows.filter((r) => r.faq).length, ' CTA olmayan:', rows.filter((r) => r.ctas === 0).length);
const cats = new Map<string, number>();
for (const r of rows) cats.set(r.category, (cats.get(r.category) ?? 0) + 1);
console.log('kategori', JSON.stringify([...cats]));
console.log('en benzer 12:');
for (const r of [...rows].sort((a, b) => b.maxSim - a.maxSim).slice(0, 12)) console.log(' ', r.maxSim + '%', r.slug, '<->', r.simWith);
console.log('iddia kalıntıları:', rows.filter((r) => r.claims > 0).slice(0, 12).map((r) => r.slug + '(' + r.claims + ')').join(', '));

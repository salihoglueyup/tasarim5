/**
 * On-page SEO denetim script'i (SEO Master Plan V4 — Faz 100).
 *
 * Çalışan sunucudaki sayfaları gezer ve sayfa başına şu on-page sinyallerini
 * raporlar/denetler:
 *   - <title> uzunluğu (ideal 15–60)
 *   - meta description uzunluğu (ideal 70–160)
 *   - <h1> sayısı (tam 1 olmalı — Faz 74)
 *   - görünür kelime sayısı (uyarı eşiği < 300)
 *   - iç bağlantı sayısı (uyarı eşiği < 3 — Faz 78/97)
 *   - canonical mevcut mu (Faz 25)
 *
 * HATA (exit 1): duplicate/eksik title, title/desc uzunluk ihlali, H1 ≠ 1,
 *                canonical eksik. UYARI: düşük kelime/iç link (exit'i bozmaz).
 *
 * Kullanım:  BASE_URL=http://localhost:3000 node scripts/seo-audit.mjs
 */

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

const PATHS = [
  '/',
  '/hakkimizda',
  '/hizmetler',
  '/hizmetler/guvenlik-yonetimi',
  '/hizmetler/tesis-yonetimi',
  '/hizmetler/temizlik-ve-hijyen',
  '/hizmetler/teknik-bakim',
  '/hizmetler/peyzaj-ve-bahce-bakimi',
  '/hizmetler/havuz-bakimi-ve-hijyen',
  '/hizmetler/hasere-ve-dezenfeksiyon',
  '/hizmetler/hukuk-ve-icra-danismanligi',
  '/sektorel-cozumler',
  '/referanslar',
  '/basari-hikayeleri',
  '/guvenlik-akademisi',
  '/istihdam-koprusu',
  '/hesaplayici',
  '/sozluk',
  '/blog',
  '/sss',
  '/iletisim',
  '/teklif-al',
];

const LIMITS = {
  titleMin: 15,
  titleMax: 60,
  descMin: 70,
  descMax: 160,
  wordWarn: 300,
  linkWarn: 3,
};

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'));
  return m ? m[1] : null;
};

let errors = 0;
let warnings = 0;
const titles = new Map();

for (const path of PATHS) {
  let html;
  try {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) {
      console.error(`✗ ${path} — HTTP ${res.status}`);
      errors++;
      continue;
    }
    html = await res.text();
  } catch (err) {
    console.error(`✗ ${path} — istek başarısız: ${err.message}`);
    errors++;
    continue;
  }

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim();
  const descTag = html.match(/<meta[^>]*name=["']description["'][^>]*>/i)?.[0] ?? '';
  const desc = descTag ? attr(descTag, 'content') ?? '' : '';
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const canonical = /<link[^>]*rel=["']canonical["']/i.test(html);
  const words = strip(html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html).split(' ').length;
  const internalLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].filter(
    ([, href]) => href.startsWith('/') || href.includes('aloyonetim.com.tr'),
  ).length;

  const issues = [];
  if (!title) issues.push('ERR title yok');
  else if (title.length < LIMITS.titleMin || title.length > LIMITS.titleMax)
    issues.push(`ERR title uzunluk ${title.length}`);
  if (titles.has(title)) issues.push(`ERR duplicate title (${titles.get(title)})`);
  else titles.set(title, path);

  if (!desc) issues.push('ERR description yok');
  else if (desc.length < LIMITS.descMin || desc.length > LIMITS.descMax)
    issues.push(`ERR desc uzunluk ${desc.length}`);

  if (h1Count !== 1) issues.push(`ERR H1 sayısı ${h1Count}`);
  if (!canonical) issues.push('ERR canonical yok');
  if (words < LIMITS.wordWarn) issues.push(`WARN kelime ${words}`);
  if (internalLinks < LIMITS.linkWarn) issues.push(`WARN iç link ${internalLinks}`);

  const errIssues = issues.filter((i) => i.startsWith('ERR'));
  const warnIssues = issues.filter((i) => i.startsWith('WARN'));
  errors += errIssues.length;
  warnings += warnIssues.length;

  const mark = errIssues.length ? '✗' : warnIssues.length ? '!' : '✓';
  console.log(
    `${mark} ${path}\n    title(${title.length}) desc(${desc.length}) h1(${h1Count}) kelime(${words}) link(${internalLinks})` +
      (issues.length ? `\n    ${issues.join(' | ')}` : ''),
  );
}

console.log(`\nHata: ${errors} · Uyarı: ${warnings}`);
if (errors > 0) process.exit(1);
console.log('On-page denetim geçti. ✅');

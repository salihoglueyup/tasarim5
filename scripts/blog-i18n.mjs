// Blog çeviri belleği aracı.
//   node scripts/blog-i18n.mjs extract <hedef-klasör> [karakter-sınırı]   -> çevrilecek metinleri batch dosyalarına yazar
//   node scripts/blog-i18n.mjs merge <batch-çeviri.json>                  -> {id:[en,ru,ar]} çevirilerini belleğe ekler
//   node scripts/blog-i18n.mjs status                                      -> kapsama özetini yazar ve coverage.json üretir
// Kimlik/normalize mantığı src/lib/blog/blogI18n.ts ile birebir aynı olmalıdır (testle doğrulanır).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DISTRICTS = ['Adalar','Arnavutköy','Ataşehir','Avcılar','Bağcılar','Bahçelievler','Bakırköy','Başakşehir','Bayrampaşa','Beşiktaş','Beykoz','Beylikdüzü','Beyoğlu','Büyükçekmece','Çatalca','Çekmeköy','Esenler','Esenyurt','Eyüpsultan','Fatih','Gaziosmanpaşa','Güngören','Kadıköy','Kağıthane','Kartal','Küçükçekmece','Maltepe','Pendik','Sancaktepe','Sarıyer','Silivri','Sultanbeyli','Sultangazi','Şile','Şişli','Tuzla','Ümraniye','Üsküdar','Zeytinburnu'];
const DISTRICT_RE = new RegExp(`(${DISTRICTS.join('|')})(?:'[a-zçğıöşü]+)?`, 'g');
const LANGS = ['en', 'ru', 'ar'];
const MEM_DIR = 'src/i18n/blog';

export function hashString(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return `${h.toString(16).padStart(8, '0')}${s.length.toString(36)}`;
}
export function normalizeForMemory(s) {
  const districts = [];
  const template = s.replace(DISTRICT_RE, (match, d) => {
    districts.push(d);
    return (districts.length === 1 ? '{d}' : `{d${districts.length}}`) + match.slice(d.length);
  });
  return { template, districts };
}
export const memoryId = (s) => hashString(normalizeForMemory(s).template);

function parseArray(file, exportName) {
  const s = fs.readFileSync(file, 'utf8');
  const start = s.indexOf(exportName);
  const arrStart = s.indexOf('[', s.indexOf('=', start));
  let depth = 0, inStr = false, esc = false, end = -1;
  for (let i = arrStart; i < s.length; i++) {
    const c = s[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') { inStr = true; continue; }
    if (c === '[') depth++;
    if (c === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  const raw = s.slice(arrStart, end + 1).split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');
  return JSON.parse(raw.replace(/,(\s*[\]}])/g, '$1'));
}

export function blockStrings(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.type === 'ul' || b.type === 'ol') out.push(...b.items);
    else if (b.type === 'cta') out.push(b.text, b.label);
    else if (b.type === 'table') {
      if (b.caption) out.push(b.caption);
      if (b.headers) out.push(...b.headers);
      if (b.rows) for (const r of b.rows) out.push(...r);
    } else out.push(b.text);
  }
  return out;
}
export function postStrings(p) {
  return [p.title, p.description, ...(p.tldr ? [p.tldr] : []), ...blockStrings(p.content)].filter((x) => typeof x === 'string' && x.trim() !== '');
}

function loadPosts() { return parseArray('src/data/posts.ts', 'export const POSTS'); }
export function loadMetas() { return parseArray('src/data/postsMetadata.ts', 'export const POSTS_META'); }
function loadCategories() { return parseArray('src/data/posts.ts', 'export const CATEGORIES'); }
function loadMemory(lang) {
  const f = path.join(MEM_DIR, `${lang}.json`);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
}
function saveMemory(lang, mem) {
  fs.mkdirSync(MEM_DIR, { recursive: true });
  const sorted = Object.fromEntries(Object.keys(mem).sort().map((k) => [k, mem[k]]));
  fs.writeFileSync(path.join(MEM_DIR, `${lang}.json`), JSON.stringify(sorted, null, 0) + '\n');
}

/** Çevrilmesi gereken tüm benzersiz şablonlar: id -> Türkçe şablon */
export function allTemplates() {
  const posts = loadPosts();
  const cats = loadCategories();
  const map = new Map();
  const add = (s) => {
    const { template } = normalizeForMemory(s);
    const id = hashString(template);
    if (map.has(id) && map.get(id) !== template) throw new Error(`Kimlik çakışması: ${id}`);
    map.set(id, template);
  };
  for (const p of posts) postStrings(p).forEach(add);
  for (const m of loadMetas()) [m.title, m.description].forEach(add);
  for (const c of cats) { add(c.name); add(c.description); }
  return { map, posts, cats };
}

function cmdExtract(dir, limit = 7000) {
  const { map } = allTemplates();
  const mems = Object.fromEntries(LANGS.map((l) => [l, loadMemory(l)]));
  const pending = [...map.entries()].filter(([id]) => LANGS.some((l) => mems[l][id] === undefined));
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) if (f.startsWith('batch-')) fs.unlinkSync(path.join(dir, f));
  let batch = {}, size = 0, n = 0;
  const flush = () => { if (Object.keys(batch).length) { n++; fs.writeFileSync(path.join(dir, `batch-${String(n).padStart(2, '0')}.json`), JSON.stringify(batch, null, 1)); batch = {}; size = 0; } };
  for (const [id, tpl] of pending) {
    if (size + tpl.length > limit && size > 0) flush();
    batch[id] = tpl; size += tpl.length;
  }
  flush();
  console.log(`toplam şablon ${map.size}, bekleyen ${pending.length}, batch ${n}`);
}

function cmdMerge(file) {
  const input = JSON.parse(fs.readFileSync(file, 'utf8'));
  const { map } = allTemplates();
  const mems = Object.fromEntries(LANGS.map((l) => [l, loadMemory(l)]));
  const tagsOf = (s) => (s.match(/\{d\d*\}/g) || []).sort().join(',');
  let ok = 0; const errors = [];
  for (const [id, tr] of Object.entries(input)) {
    const tpl = map.get(id);
    if (!tpl) { errors.push(`${id}: bilinmeyen kimlik`); continue; }
    if (!Array.isArray(tr) || tr.length !== 3 || tr.some((x) => typeof x !== 'string' || !x.trim())) { errors.push(`${id}: [en,ru,ar] bekleniyor`); continue; }
    const bad = tr.findIndex((x) => tagsOf(x) !== tagsOf(tpl));
    if (bad >= 0) { errors.push(`${id}: ${LANGS[bad]} yer tutucuları uyuşmuyor (${tagsOf(tpl)} / ${tagsOf(tr[bad])})`); continue; }
    LANGS.forEach((l, i) => { mems[l][id] = tr[i]; });
    ok++;
  }
  LANGS.forEach((l) => saveMemory(l, mems[l]));
  console.log(`eklenen ${ok}, hata ${errors.length}`);
  errors.slice(0, 20).forEach((e) => console.log(' -', e));
  if (errors.length) process.exitCode = 1;
}

function cmdStatus() {
  const { map, posts, cats } = allTemplates();
  const mems = Object.fromEntries(LANGS.map((l) => [l, loadMemory(l)]));
  const done = (id) => LANGS.every((l) => mems[l][id] !== undefined);
  const translatedIds = [...map.keys()].filter(done).length;
  const fullSlugs = posts.filter((p) => postStrings(p).every((s) => done(memoryId(s)))).map((p) => p.slug);
  const catsOk = cats.every((c) => done(memoryId(c.name)) && done(memoryId(c.description)));
  console.log(`şablon ${translatedIds}/${map.size} çevrildi; tam çevrilen yazı ${fullSlugs.length}/${posts.length}; kategoriler ${catsOk ? 'tamam' : 'eksik'}`);
  fs.mkdirSync(MEM_DIR, { recursive: true });
  fs.writeFileSync(path.join(MEM_DIR, 'coverage.json'), JSON.stringify({ translatedSlugs: fullSlugs.sort(), categoriesTranslated: catsOk }, null, 0) + '\n');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [cmd, a, b] = process.argv.slice(2);
  if (cmd === 'extract') cmdExtract(a, b ? Number(b) : undefined);
  else if (cmd === 'merge') cmdMerge(a);
  else if (cmd === 'status') cmdStatus();
  else console.log('Kullanım: extract <klasör> [sınır] | merge <dosya> | status');
}

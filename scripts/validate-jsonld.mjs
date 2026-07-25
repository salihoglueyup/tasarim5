/**
 * JSON-LD doğrulama script'i (SEO Master Plan V4 — Faz 69).
 *
 * Çalışan bir sunucudaki (dev: next dev / prod: next start) temsilci sayfaları
 * gezer, her sayfadaki <script type="application/ld+json"> bloklarını çıkarır ve:
 *   1) JSON olarak parse edilebiliyor mu,
 *   2) Her node bir @type taşıyor mu,
 *   3) @context (doğrudan ya da @graph üstünde) mevcut mu
 * kontrol eder. Bir sorun bulursa exit code 1 döner (CI'da build'i uyarır).
 *
 * Kullanım:  BASE_URL=http://localhost:3000 node scripts/validate-jsonld.mjs
 */

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

// Her şema tipinden en az bir örnek içeren temsilci yollar.
const PATHS = [
  '/',
  '/hizmetler',
  '/hizmetler/guvenlik-yonetimi',
  '/hizmetler/hukuk-ve-icra-danismanligi',
  '/iletisim',
  '/hakkimizda',
  '/guvenlik-akademisi',
  '/istihdam-koprusu',
  '/sektorel-cozumler',
  '/sss',
  '/blog',
  '/blog/2024-aidat-artis-oranlari',
  '/kurumsal/kalite-politikamiz',
];

const SCRIPT_RE =
  /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

/** Bir node ve iç node'larında en az bir @type olduğunu doğrular. */
function collectTypes(node, types) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectTypes(n, types));
  } else if (node && typeof node === 'object') {
    if (node['@type']) types.add(node['@type']);
    Object.values(node).forEach((v) => collectTypes(v, types));
  }
}

let failures = 0;
const seenTypes = new Set();

for (const path of PATHS) {
  const url = `${BASE}${path}`;
  let html;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`✗ ${path} — HTTP ${res.status}`);
      failures++;
      continue;
    }
    html = await res.text();
  } catch (err) {
    console.error(`✗ ${path} — istek başarısız: ${err.message}`);
    failures++;
    continue;
  }

  const blocks = [...html.matchAll(SCRIPT_RE)];
  if (blocks.length === 0) {
    console.error(`✗ ${path} — JSON-LD bloğu bulunamadı`);
    failures++;
    continue;
  }

  let pageTypes = [];
  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw.trim());
    } catch (err) {
      console.error(`✗ ${path} — geçersiz JSON: ${err.message}`);
      failures++;
      continue;
    }
    const hasContext =
      (parsed['@context'] && true) ||
      (Array.isArray(parsed) && parsed.some((n) => n['@context']));
    if (!hasContext) {
      console.error(`✗ ${path} — @context eksik`);
      failures++;
    }
    const types = new Set();
    collectTypes(parsed['@graph'] ?? parsed, types);
    if (types.size === 0) {
      console.error(`✗ ${path} — @type taşıyan node yok`);
      failures++;
    }
    types.forEach((t) => {
      seenTypes.add(t);
      pageTypes.push(t);
    });
  }
  console.log(`✓ ${path} — ${blocks.length} blok, tipler: ${pageTypes.join(', ')}`);
}

console.log(`\nToplam benzersiz şema tipi: ${[...seenTypes].sort().join(', ')}`);

if (failures > 0) {
  console.error(`\n${failures} JSON-LD doğrulama hatası bulundu.`);
  process.exit(1);
}
console.log('\nTüm JSON-LD blokları geçerli. ✅');

/**
 * Tüm draft dosyalarını okuyup posts.ts'e ekler.
 * Zaten seeded olanları ve placeholder içerikleri atlar.
 * Kullanım: npx tsx scripts/import-all-drafts.ts
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const DRAFTS_DIR = path.join(process.cwd(), 'src/data/drafts');
const POSTS_FILE = path.join(process.cwd(), 'src/data/posts.ts');

const postsContent = fs.readFileSync(POSTS_FILE, 'utf-8');

// Mevcut slug'ları çıkar
const existingSlugs = new Set<string>();
for (const m of postsContent.matchAll(/"slug":\s*"([^"]+)"/g)) existingSlugs.add(m[1]);
for (const m of postsContent.matchAll(/slug:\s*'([^']+)'/g)) existingSlugs.add(m[1]);
for (const m of postsContent.matchAll(/slug:\s*"([^"]+)"/g)) existingSlugs.add(m[1]);

console.log(`Mevcut ${existingSlugs.size} yazı tespit edildi.`);

const draftFiles = fs.readdirSync(DRAFTS_DIR).filter((f) => f.endsWith('.ts')).sort();

async function main() {
  const newPosts: object[] = [];
  const skipped: string[] = [];

  for (const file of draftFiles) {
    const filePath = path.join(DRAFTS_DIR, file);
    let mod: { draft?: unknown };
    try {
      mod = await import(pathToFileURL(filePath).href);
    } catch (e) {
      console.warn(`HATA: ${file} import edilemedi —`, e);
      continue;
    }

    const draft = mod.draft as Record<string, unknown> | undefined;
    if (!draft || typeof draft.slug !== 'string') {
      console.warn(`SKIP: ${file} (geçerli draft export yok)`);
      continue;
    }

    if (existingSlugs.has(draft.slug)) {
      skipped.push(draft.slug);
      continue;
    }

    // Placeholder içerik kontrolü
    const contentStr = JSON.stringify(draft.content ?? '');
    if (
      contentStr.includes('[BURAYA') ||
      contentStr.includes('[ÖZET') ||
      contentStr.includes('[BURAYA GİRİŞ')
    ) {
      console.warn(`SKIP: ${draft.slug} (placeholder içerik — önce içerik yaz)`);
      continue;
    }

    newPosts.push(draft);
    console.log(`EKLE: ${draft.slug}`);
  }

  console.log(`\nAtlanan (zaten mevcut): ${skipped.length}`);

  if (newPosts.length === 0) {
    console.log('Eklenecek yeni yazı yok.');
    return;
  }

  // Her post'u güzel biçimde serialize et
  const serialized = newPosts
    .map((post) => {
      const lines = JSON.stringify(post, null, 2).split('\n');
      return '  ' + lines.join('\n  ');
    })
    .join(',\n');

  // POSTS dizisinin kapanış "];"-sini bul (POST_SLUGS'dan önce)
  // Dosya CRLF kullanıyor olabilir, her ikisini de dene
  const marker = postsContent.includes('];\r\n\r\nexport const POST_SLUGS')
    ? '];\r\n\r\nexport const POST_SLUGS'
    : '];\n\nexport const POST_SLUGS';
  const insertAt = postsContent.indexOf(marker);
  if (insertAt === -1) {
    console.error('POSTS dizisi kapanışı bulunamadı (marker: `];\n\nexport const POST_SLUGS`)');
    process.exit(1);
  }

  const newContent =
    postsContent.slice(0, insertAt) +
    ',\n' +
    serialized +
    postsContent.slice(insertAt);

  fs.writeFileSync(POSTS_FILE, newContent, 'utf-8');
  console.log(`\n✓ ${newPosts.length} yazı posts.ts'e eklendi!`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

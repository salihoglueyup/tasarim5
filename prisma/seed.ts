import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { CATEGORIES, POSTS } from '../src/data/posts';
import type { Post } from '../src/data/posts';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedPost(post: Post) {
  const category = await prisma.category.findUnique({ where: { slug: post.category } });
  const author = await prisma.author.findUnique({ where: { slug: post.author } });

  if (!category || !author) {
    console.warn(`SKIP ${post.slug}: category="${post.category}" or author="${post.author}" bulunamadı`);
    return;
  }

  await prisma.post.upsert({
    where: { slug: post.slug },
    update: {},
    create: {
      slug: post.slug,
      title: post.title,
      description: post.description,
      categoryId: category.id,
      authorId: author.id,
      tags: JSON.stringify(post.tags),
      image: post.image,
      pillar: post.pillar,
      tldr: post.tldr,
      content: JSON.stringify(post.content),
      published: true,
      datePublished: new Date(post.datePublished),
      dateModified: post.dateModified ? new Date(post.dateModified) : new Date(post.datePublished),
    },
  });
}

async function main() {
  console.log('Seeding database...');

  // Admin kullanıcı
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@aloyonetim.com.tr' },
    update: {},
    create: {
      email: 'admin@aloyonetim.com.tr',
      name: 'Alo Yönetim Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Kategoriler
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
      },
    });
  }

  // Yazarlar — posts.ts + draft dosyalarından tüm slug'ları topla
  const draftsDir = path.join(process.cwd(), 'src/data/drafts');
  const draftFiles = fs.existsSync(draftsDir)
    ? fs.readdirSync(draftsDir).filter((f) => f.endsWith('.ts')).sort()
    : [];

  const allDrafts: Post[] = [];
  for (const file of draftFiles) {
    try {
      const mod = await import(pathToFileURL(path.join(draftsDir, file)).href) as { draft?: Post };
      if (mod.draft?.slug && typeof mod.draft.author === 'string') {
        allDrafts.push(mod.draft);
      }
    } catch {
      // import hatası — atla
    }
  }

  const allAuthorSlugs = Array.from(
    new Set([...POSTS.map((p) => p.author), ...allDrafts.map((p) => p.author)])
  );

  for (const authorSlug of allAuthorSlugs) {
    const name = authorSlug
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
    await prisma.author.upsert({
      where: { slug: authorSlug },
      update: {},
      create: {
        slug: authorSlug,
        name,
        bio: `${name} - Alo Yönetim İçerik Yazarı`,
      },
    });
  }

  // posts.ts'deki yazıları seed et
  console.log(`\nposts.ts: ${POSTS.length} yazı seed ediliyor...`);
  for (const post of POSTS) {
    await seedPost(post);
    process.stdout.write('.');
  }

  // Draft dosyalarını seed et
  const existingSlugs = new Set(
    (await prisma.post.findMany({ select: { slug: true } })).map((p) => p.slug)
  );

  console.log(`\n\nDrafts: ${allDrafts.length} taslak kontrol ediliyor...`);
  let seeded = 0;
  let skipped = 0;
  for (const draft of allDrafts) {
    if (existingSlugs.has(draft.slug)) {
      skipped++;
      continue;
    }
    await seedPost(draft);
    existingSlugs.add(draft.slug);
    seeded++;
    process.stdout.write('.');
  }

  console.log(`\n\nDrafts: ${seeded} eklendi, ${skipped} zaten vardı.`);
  console.log('\n✓ Seeding tamamlandı.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });

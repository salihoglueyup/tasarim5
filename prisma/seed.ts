import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { CATEGORIES, POSTS } from '../src/data/posts';
import bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create an admin user
  // (In production, you'd use a strong password and not hardcode it here)
  // We'll use a dummy password for now.
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@aloyonetim.com' },
    update: {},
    create: {
      email: 'admin@aloyonetim.com',
      name: 'Alo Yönetim Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Seed Categories
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

  // Seed Authors (Extract from POSTS)
  const authors = Array.from(new Set(POSTS.map(p => p.author)));
  for (const authorSlug of authors) {
    const name = authorSlug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    await prisma.author.upsert({
      where: { slug: authorSlug },
      update: {},
      create: {
        slug: authorSlug,
        name: name,
        bio: `${name} - Alo Yönetim İçerik Yazarı`,
      },
    });
  }

  // Seed Posts
  for (const post of POSTS) {
    
    const category = await prisma.category.findUnique({ where: { slug: post.category } });
    const author = await prisma.author.findUnique({ where: { slug: post.author } });

    if (!category || !author) continue;

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

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

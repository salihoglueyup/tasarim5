import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

const blockToHtml = (block: any) => {
  switch (block.type) {
    case 'p':
      return `<p>${block.text}</p>`;
    case 'h2':
      return `<h2>${block.text}</h2>`;
    case 'h3':
      return `<h3>${block.text}</h3>`;
    case 'ul':
      return `<ul>${block.items.map((i: string) => `<li>${i}</li>`).join('')}</ul>`;
    case 'ol':
      return `<ol>${block.items.map((i: string) => `<li>${i}</li>`).join('')}</ol>`;
    case 'quote':
      return `<blockquote>${block.text}</blockquote>`;
    case 'cta':
      return `<p><a href="${block.href}" target="_blank">${block.label}</a></p>`;
    default:
      return `<p>${block.text || ''}</p>`;
  }
};

async function main() {
  console.log('Starting migration...');

  // 1. Yazarları Güncelle/Oluştur
  const newAuthors = [
    { name: 'Alo Yönetim Genel Müdürlüğü', slug: 'alo-yonetim-genel-mudurlugu', bio: 'Alo Yönetim üst yönetim ekibi.' },
    { name: 'Alo Yönetim Pazarlama Ekibi', slug: 'alo-yonetim-pazarlama-ekibi', bio: 'Alo Yönetim pazarlama ve iletişim uzmanları.' },
    { name: 'Alo Yönetim Hukuk Ekibi', slug: 'alo-yonetim-hukuk-ekibi', bio: 'Kat Mülkiyeti Kanunu ve Hukuk Uzmanları.' }
  ];

  const authorIds = [];
  for (const author of newAuthors) {
    const created = await prisma.author.upsert({
      where: { slug: author.slug },
      update: {},
      create: {
        slug: author.slug,
        name: author.name,
        bio: author.bio,
      },
    });
    authorIds.push(created.id);
  }

  // Atanacak varsayılan yazar: Genel Müdürlük
  const defaultAuthorId = authorIds[0];

  // 2. Postları Dönüştür (JSON -> HTML)
  const posts = await prisma.post.findMany();

  let convertedCount = 0;
  for (const post of posts) {
    let contentHtml = post.content;
    let isConverted = false;
    
    try {
      // Eğer içerik bir JSON dizisiyse (ve ilk elemanı type'a sahipse) dönüştür
      const parsed = JSON.parse(post.content);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].type && parsed[0].type !== 'html') {
        contentHtml = parsed.map(blockToHtml).join('');
        isConverted = true;
      }
    } catch (e) {
      // JSON değilse HTML'dir zaten, es geç.
    }

    // Her durumda yazarı standart ekiplere ata (hepsini şimdilik genel müdürlüğe, rastgele)
    await prisma.post.update({
      where: { id: post.id },
      data: {
        authorId: defaultAuthorId,
        ...(isConverted ? { content: contentHtml } : {})
      }
    });
    
    if (isConverted) convertedCount++;
  }

  console.log(`Migration completed. ${convertedCount} posts converted from JSON to HTML.`);
  console.log('Old dummy authors can be safely deleted manually if desired.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

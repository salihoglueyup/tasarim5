const { PrismaClient } = require('./node_modules/@prisma/client');
const p = new PrismaClient();
async function main() {
  const author = await p.author.findFirst();
  const cat = await p.category.findFirst();
  console.log('AUTHOR:', JSON.stringify(author));
  console.log('CAT:', JSON.stringify(cat));
  const postCount = await p.post.count();
  console.log('POSTS:', postCount);
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); });

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const allFaqs = await prisma.faq.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] });
  console.log(`Found ${allFaqs.length} FAQs in local database.`);

  const exportPath = path.join(__dirname, '..', 'prisma', 'data', 'all_faqs_export.json');
  fs.writeFileSync(exportPath, JSON.stringify(allFaqs, null, 2), 'utf8');
  console.log(`Exported to ${exportPath}`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });

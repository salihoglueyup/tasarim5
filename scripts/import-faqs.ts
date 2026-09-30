import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

// dotenv, .env içindeki "${POSTGRES_PASSWORD}" gibi shell-tarzı referansları
// kendiliğinden çözmez (Docker Compose'un aksine) — burada elle genişletiyoruz.
function expandEnvVar(value: string | undefined): string | undefined {
  if (!value) return value;
  return value.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/g, (_, name) => process.env[name] ?? '');
}
const databaseUrl = expandEnvVar(process.env.DATABASE_URL);

async function main() {
  const pool = new Pool({ connectionString: databaseUrl, max: 5 });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const jsonPath = path.join(__dirname, '..', 'prisma', 'data', 'all_faqs_export.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    process.exit(1);
  }

  const faqs = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Found ${faqs.length} FAQs in export file.`);

  // Mevcut soruları temizle (çakışma olmasın)
  const deleted = await prisma.faq.deleteMany();
  console.log(`Cleared ${deleted.count} existing FAQs.`);

  let successCount = 0;
  for (const faq of faqs) {
    try {
      await prisma.faq.create({
        data: {
          category: faq.category,
          order: faq.order || 0,
          question: faq.question,
          question_en: faq.question_en || null,
          question_ru: faq.question_ru || null,
          question_ar: faq.question_ar || null,
          answer: faq.answer,
          answer_en: faq.answer_en || null,
          answer_ru: faq.answer_ru || null,
          answer_ar: faq.answer_ar || null,
        }
      });
      successCount++;
    } catch (error: any) {
      console.error(`Failed: ${faq.question} — ${error.message}`);
    }
  }

  console.log(`Successfully imported ${successCount}/${faqs.length} FAQs.`);
  await prisma.$disconnect();
  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });

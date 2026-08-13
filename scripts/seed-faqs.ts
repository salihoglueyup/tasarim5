import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('Starting FAQ seed process...');
  
  // JSON dosyasının yolu (absolute path to the brain scratch folder)
  const jsonPath = path.join(__dirname, 'prisma', 'data', 'faqs_core_1.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    process.exit(1);
  }

  const fileData = fs.readFileSync(jsonPath, 'utf8');
  const faqs = JSON.parse(fileData);

  let successCount = 0;

  for (const faq of faqs) {
    try {
      await prisma.faq.create({
        data: {
          category: faq.category,
          order: faq.order || 0,
          question: faq.question,
          question_en: faq.question_en,
          question_ru: faq.question_ru,
          question_ar: faq.question_ar,
          answer: faq.answer,
          answer_en: faq.answer_en,
          answer_ru: faq.answer_ru,
          answer_ar: faq.answer_ar,
        }
      });
      successCount++;
    } catch (error) {
      console.error(`Failed to insert FAQ: ${faq.question}`, error);
    }
  }

  console.log(`Successfully seeded ${successCount} FAQs into the database.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

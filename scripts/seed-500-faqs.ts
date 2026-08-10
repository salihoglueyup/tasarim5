import { generateFaqs } from './faq-generator';
import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Generating 500 FAQs...');
  const faqs = generateFaqs();
  console.log(`Generated ${faqs.length} FAQs.`);

  console.log('Clearing old FAQs to prevent duplicates...');
  await prisma.faq.deleteMany({});
  console.log('Old FAQs cleared.');

  console.log('Seeding new FAQs to database...');
  let count = 0;
  for (const faq of faqs) {
    await prisma.faq.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: count + 1
      }
    });
    count++;
    if (count % 50 === 0) {
      console.log(`Inserted ${count}/${faqs.length} FAQs...`);
    }
  }

  console.log('Database successfully seeded with 500 FAQs!');
}

main()
  .catch(e => {
    console.error('Error seeding FAQs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

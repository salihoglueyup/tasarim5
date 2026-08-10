import { prisma } from '../src/lib/prisma';

async function translateText(text: string, targetLang: string) {
  if (!text) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map((item: any) => item[0]).join('');
  } catch (e) {
    console.error(`Error translating: ${text.substring(0, 20)}...`, e);
    return null;
  }
}

async function main() {
  console.log('Fetching FAQs from DB...');
  const faqs = await prisma.faq.findMany();
  console.log(`Found ${faqs.length} FAQs to process.`);

  let updatedCount = 0;

  for (const faq of faqs) {
    let needsUpdate = false;
    const updateData: any = {};

    // English
    if (!faq.question_en) {
      await new Promise(r => setTimeout(r, 150));
      const translatedQ = await translateText(faq.question, 'en');
      if (translatedQ) { updateData.question_en = translatedQ; needsUpdate = true; }
    }
    if (!faq.answer_en) {
      await new Promise(r => setTimeout(r, 150));
      const translatedA = await translateText(faq.answer, 'en');
      if (translatedA) { updateData.answer_en = translatedA; needsUpdate = true; }
    }

    // Russian
    if (!faq.question_ru) {
      await new Promise(r => setTimeout(r, 150));
      const translatedQ = await translateText(faq.question, 'ru');
      if (translatedQ) { updateData.question_ru = translatedQ; needsUpdate = true; }
    }
    if (!faq.answer_ru) {
      await new Promise(r => setTimeout(r, 150));
      const translatedA = await translateText(faq.answer, 'ru');
      if (translatedA) { updateData.answer_ru = translatedA; needsUpdate = true; }
    }

    // Arabic
    if (!faq.question_ar) {
      await new Promise(r => setTimeout(r, 150));
      const translatedQ = await translateText(faq.question, 'ar');
      if (translatedQ) { updateData.question_ar = translatedQ; needsUpdate = true; }
    }
    if (!faq.answer_ar) {
      await new Promise(r => setTimeout(r, 150));
      const translatedA = await translateText(faq.answer, 'ar');
      if (translatedA) { updateData.answer_ar = translatedA; needsUpdate = true; }
    }

    if (needsUpdate) {
      await prisma.faq.update({
        where: { id: faq.id },
        data: updateData
      });
      updatedCount++;
      if (updatedCount % 10 === 0) {
        console.log(`Successfully translated ${updatedCount} FAQs...`);
      }
    }
  }

  console.log(`Finished translating DB FAQs! Total updated: ${updatedCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

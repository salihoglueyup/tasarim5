import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seed işlemi başlatılıyor...');

  // --- 1. SSS (Faq) Ekleme ---
  const faqCount = await prisma.faq.count();
  if (faqCount === 0) {
    console.log('Faq tablosu boş, örnek veriler ekleniyor...');
    await prisma.faq.createMany({
      data: [
        {
          question: 'Aidat ödemelerimizi nasıl takip ediyoruz?',
          answer: 'Sistemimiz üzerinden size özel açılan panelden hem güncel borcunuzu görebilir hem de online ödeme yapabilirsiniz. Ayrıca geciken ödemeler için otomatik hatırlatmalar gönderilmektedir.',
          category: 'Ödemeler',
          order: 1,
        },
        {
          question: 'Güvenlik personelinin denetimini kim yapıyor?',
          answer: 'Projelerimizde çalışan özel güvenlik görevlileri (ÖGG), firmamızın saha denetim uzmanları tarafından habersiz gece ve gündüz devriyeleri ile sürekli olarak denetlenmektedir.',
          category: 'Güvenlik',
          order: 2,
        },
        {
          question: 'Teknik arıza durumlarında müdahale süreniz nedir?',
          answer: 'Asansör, elektrik veya su kaçağı gibi acil durumlarda yazılı SLA kapsamında acil müdahale hedefimiz Anadolu Yakasında 30 dakika, Avrupa Yakasında 1 saattir.',
          category: 'Teknik',
          order: 3,
        }
      ]
    });
  }


  console.log('Seed işlemi başarıyla tamamlandı!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '../../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
          answer: 'Asansör, elektrik veya su kaçağı gibi acil durumlarda 7/24 mobil teknik ekibimiz maksimum 2 saat içerisinde duruma müdahale etmektedir.',
          category: 'Teknik',
          order: 3,
        }
      ]
    });
  }

  // --- 2. İş Ortakları (Partner) Ekleme ---
  const partnerCount = await prisma.partner.count();
  if (partnerCount === 0) {
    console.log('Partner tablosu boş, örnek veriler ekleniyor...');
    await prisma.partner.createMany({
      data: [
        { name: 'Odeabank', logo: '/images/brands/brand1.svg', order: 1 },
        { name: 'Kone', logo: '/images/brands/brand2.svg', order: 2 },
        { name: 'Pronet', logo: '/images/brands/brand3.svg', order: 3 },
        { name: 'Schindler', logo: '/images/brands/brand4.svg', order: 4 },
        { name: 'Allianz', logo: '/images/brands/brand5.svg', order: 5 },
      ]
    });
  }

  // --- 3. Referanslar (Reference/Testimonial) Ekleme ---
  const refCount = await prisma.reference.count();
  if (refCount === 0) {
    console.log('Reference tablosu boş, örnek veriler ekleniyor...');
    await prisma.reference.createMany({
      data: [
        {
          title: 'Akasya Yaşam Kompleksi',
          slug: 'akasya-yasam',
          category: 'Site Yönetimi',
          location: 'Kadıköy, İstanbul',
          units: '450 Konut',
          image: '/images/hero-bg.webp',
          published: true,
          testimonialText: 'Alo Yönetim ile çalışmaya başladığımızdan beri aidat tahsilat oranımız %98\'e ulaştı. Bina giderlerimiz şeffaflaştı ve sakinlerimiz çok memnun.',
          testimonialAuthor: 'Ahmet Y. - Site Yönetim Kurulu Başkanı',
          order: 1
        },
        {
          title: 'Sky Tower Plaza',
          slug: 'sky-tower',
          category: 'Ticari Tesis',
          location: 'Ataşehir, İstanbul',
          units: '120 Ofis',
          image: '/images/service1.webp',
          published: true,
          testimonialText: 'Plazamızın 7/24 teknik altyapısını ve güvenliğini kusursuz bir şekilde yönetiyorlar. Kurumsal kimliğimize değer kattılar.',
          testimonialAuthor: 'Zeynep K. - Plaza Yöneticisi',
          order: 2
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

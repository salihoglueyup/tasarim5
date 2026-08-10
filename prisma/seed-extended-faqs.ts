import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

const extendedFaqs = [
  // Tesis Yönetimi
  {
    category: 'Tesis Yönetimi',
    question: 'Tesis yönetimi hizmetleriniz neleri kapsıyor?',
    answer: 'Tesis yönetimi hizmetlerimiz; temizlik, güvenlik, teknik bakım, peyzaj ve havuz bakımı gibi tüm entegre hizmetleri tek bir elden profesyonelce yönetmeyi kapsar.',
    question_en: 'What do your facility management services cover?',
    answer_en: 'Our facility management services comprehensively cover integrated services such as cleaning, security, technical maintenance, landscaping, and pool maintenance from a single professional source.',
    order: 1,
  },
  {
    category: 'Tesis Yönetimi',
    question: 'Tesis yönetiminde enerji verimliliğini nasıl sağlıyorsunuz?',
    answer: 'Tesisinizdeki enerji tüketim noktalarını analiz ederek otomasyon sistemleri ve akıllı çözümler (sensörler, LED dönüşümü, iklimlendirme optimizasyonu) ile maksimum enerji tasarrufu sağlıyoruz.',
    question_en: 'How do you ensure energy efficiency in facility management?',
    answer_en: 'We maximize energy savings by analyzing energy consumption points in your facility and implementing automation systems and smart solutions (sensors, LED conversion, climate optimization).',
    order: 2,
  },
  
  // Aidat Takibi
  {
    category: 'Aidat Takibi',
    question: 'Aidat ödemelerini hangi kanallardan yapabiliriz?',
    answer: 'Sakinlerimiz aidat ödemelerini mobil uygulamamız üzerinden kredi kartı ile, havale/EFT yoluyla veya online şube platformumuzdan 7/24 güvenle yapabilirler.',
    question_en: 'Through which channels can we pay our dues?',
    answer_en: 'Our residents can securely pay their dues 24/7 via credit card on our mobile app, through bank transfer/EFT, or our online branch platform.',
    order: 1,
  },
  {
    category: 'Aidat Takibi',
    question: 'Geciken aidatlar için nasıl bir süreç işliyor?',
    answer: 'Geciken aidatlar için öncelikle SMS ve e-posta ile otomatik hatırlatmalar yapılır. Ödemenin gecikmeye devam etmesi durumunda, yönetim planına uygun yasal takip süreçleri hukuk departmanımızca başlatılır.',
    question_en: 'What is the process for delayed dues?',
    answer_en: 'For delayed dues, automated reminders are first sent via SMS and email. If the delay continues, legal follow-up processes in accordance with the management plan are initiated by our legal department.',
    order: 2,
  },

  // Havuz Bakımı
  {
    category: 'Havuz Bakımı',
    question: 'Havuz suyunun kimyasal dengesi ne sıklıkla kontrol edilir?',
    answer: 'Havuz suyunun pH ve klor seviyesi gibi temel kimyasal değerleri, Sağlık Bakanlığı yönetmeliklerine uygun olarak günde en az üç kez sertifikalı havuz operatörlerimiz tarafından ölçülür ve kayıt altına alınır.',
    question_en: 'How often is the chemical balance of the pool water checked?',
    answer_en: 'Basic chemical values like pH and chlorine levels are measured and recorded at least three times a day by our certified pool operators in accordance with Ministry of Health regulations.',
    order: 1,
  },
  {
    category: 'Havuz Bakımı',
    question: 'Havuz dip temizliği işlemi nasıl yapılıyor?',
    answer: 'Özel vakumlu havuz robotları ve manuel havuz süpürgeleri kullanılarak, havuzun kullanımda olmadığı saatlerde dipte biriken partikül ve kirler detaylı bir şekilde temizlenmektedir.',
    question_en: 'How is the pool bottom cleaning performed?',
    answer_en: 'Using special vacuum pool robots and manual pool vacuums, particles and dirt accumulated at the bottom are thoroughly cleaned during off-hours.',
    order: 2,
  },

  // Peyzaj ve Bahçe
  {
    category: 'Peyzaj ve Bahçe',
    question: 'Bitki ilaçlama ve gübreleme işlemleri ne zaman yapılıyor?',
    answer: 'Gübreleme işlemleri bitkilerin türüne göre genellikle ilkbahar ve sonbahar aylarında; koruyucu ilaçlama işlemleri ise periyodik olarak ve hastalık riskinin yüksek olduğu mevsim geçişlerinde yapılmaktadır.',
    question_en: 'When are plant spraying and fertilizing done?',
    answer_en: 'Fertilization is generally done in spring and autumn depending on plant types; protective spraying is done periodically and during seasonal transitions when disease risk is high.',
    order: 1,
  },
  {
    category: 'Peyzaj ve Bahçe',
    question: 'Sulama sistemlerinin bakımı hizmetinize dahil mi?',
    answer: 'Evet, otomatik sulama sistemlerinin mevsimsel ayarları, fıskiye kontrolleri ve kışa hazırlık (su tahliyesi) işlemleri peyzaj bakım hizmetlerimizin standart bir parçasıdır.',
    question_en: 'Is the maintenance of irrigation systems included in your service?',
    answer_en: 'Yes, seasonal adjustments of automatic irrigation systems, sprinkler checks, and winterizing (water drainage) are a standard part of our landscape maintenance services.',
    order: 2,
  },

  // Haşere ve Dezenfeksiyon
  {
    category: 'Haşere Kontrolü',
    question: 'Kullanılan haşere ilaçları insan ve evcil hayvan sağlığına zararlı mı?',
    answer: 'Kullandığımız tüm biosidal ürünler Sağlık Bakanlığı ve Dünya Sağlık Örgütü (WHO) onaylıdır. Doğru dozajda profesyonelce uygulandığı için insan ve evcil hayvan sağlığı için risk oluşturmaz.',
    question_en: 'Are the pest control chemicals used harmful to human and pet health?',
    answer_en: 'All biocidal products we use are approved by the Ministry of Health and WHO. Since they are applied professionally in the right dosages, they pose no risk to human and pet health.',
    order: 1,
  },
  {
    category: 'Haşere Kontrolü',
    question: 'Ortak alan dezenfeksiyonu ne kadar süre etkili oluyor?',
    answer: 'Kullanılan gümüş iyonlu veya hidrojen peroksit bazlı yeni nesil dezenfektanlar, ortamın yoğunluğuna bağlı olarak yüzeylerde 30 güne kadar kalıcı antibakteriyel koruma sağlayabilmektedir.',
    question_en: 'How long is the common area disinfection effective?',
    answer_en: 'New generation disinfectants based on silver ions or hydrogen peroxide can provide up to 30 days of residual antibacterial protection on surfaces, depending on the area\'s traffic.',
    order: 2,
  }
];

async function main() {
  console.log('Seeding extended FAQs...');
  for (const faq of extendedFaqs) {
    const existing = await prisma.faq.findFirst({
      where: {
        category: faq.category,
        question: faq.question
      }
    });

    if (!existing) {
      await prisma.faq.create({
        data: faq
      });
      console.log(`Created FAQ: [${faq.category}] ${faq.question}`);
    } else {
      console.log(`Skipped existing FAQ: [${faq.category}] ${faq.question}`);
    }
  }
  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

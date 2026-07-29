import { prisma } from '../src/lib/prisma';

const faqs = [
  // Finans & Aidat Kategorisi
  {
    question: "Aidat ödemelerini nasıl yapabilirim?",
    answer: "<p>Aidat ödemelerinizi üç farklı yöntemle gerçekleştirebilirsiniz:</p><ul><li><strong>Mobil Uygulama:</strong> Sisteme giriş yaparak kredi kartı veya banka kartı ile komisyonsuz, 3D Secure güvencesiyle ödeyebilirsiniz.</li><li><strong>Banka Havalesi/EFT:</strong> Apartman/Site yönetimine ait resmi banka hesabına daire numaranızı açıklama kısmına yazarak transfer edebilirsiniz.</li><li><strong>Otomatik Ödeme Talimatı:</strong> Kredi kartınızı sisteme tanımlayarak her ay otomatik çekilmesini sağlayabilirsiniz.</li></ul>",
    category: "Finans & Aidat"
  },
  {
    question: "Aidatımı geciktirirsem ne olur?",
    answer: "<p>Kat Mülkiyeti Kanunu (KMK m. 20) gereğince, ödemesi geciken aidatlar için aylık <strong>%5 gecikme tazminatı</strong> uygulanmaktadır. Gecikmenin devam etmesi durumunda, yönetim kurulunun veya yöneticinin kararıyla hukuki (icra) takip başlatılma hakkı saklıdır. Bu nedenle ödemelerinizi son ödeme tarihinden önce yapmanızı rica ederiz.</p>",
    category: "Finans & Aidat"
  },
  {
    question: "Toplanan aidatların nereye harcandığını görebilir miyim?",
    answer: "<p>Kesinlikle! Şeffaf yönetim ilkemiz gereği, sisteme giriş yaptığınızda <strong>Bütçe ve Raporlar</strong> bölümünden aylık gelir-gider tablolarını, kasa hareketlerini ve yapılan harcamalara ait fatura detaylarını anlık olarak inceleyebilirsiniz.</p>",
    category: "Finans & Aidat"
  },
  {
    question: "Demirbaş gideri nedir, aidattan farkı nedir?",
    answer: "<p><strong>Aidat (İşletme Gideri):</strong> Sitenin günlük işleyişi (temizlik, personel maaşları, ortak alan elektrik/su, periyodik asansör bakımı) için toplanan aylık rutin bedeldir. Kiracı veya ev sahibi oturuyorsa, oturan öder.</p><p><strong>Demirbaş Gideri (Yatırım Gideri):</strong> Binaya kalıcı değer katan işler (mantolama, çatı tamiratı, yeni asansör yapımı, boya badana vb.) için toplanan bedeldir. Bu bedel yasal olarak doğrudan <strong>ev sahibinin (kat malikinin)</strong> sorumluluğundadır.</p>",
    category: "Finans & Aidat"
  },

  // Hukuk & İcra Kategorisi
  {
    question: "Ödenmeyen aidatlar için icra takibi nasıl başlatılır?",
    answer: "<p>Yönetim sözleşmemiz kapsamında, belirlenen süre (genellikle 2 veya 3 ay) boyunca aidatını ödemeyen malik veya kiracılar için sistemimiz otomatik olarak ihtarname süreci başlatır. Ödeme yapılmaması durumunda, hukuk departmanımız tarafından yasal icra takibi açılarak tahsilat yasal yollarla sağlanır.</p>",
    category: "Hukuk & İcra"
  },
  {
    question: "Kiracıyım, ev sahibimin ödemesi gereken borçtan sorumlu muyum?",
    answer: "<p>Kat Mülkiyeti Kanunu'na göre ortak giderlerden (aidat) malik ile birlikte kiracı da müteselsilen sorumludur. Ancak kiracının sorumluluğu ödediği kira bedeli ile sınırlıdır. Demirbaş giderlerinden ise yalnızca ev sahibi sorumludur. Yönetim olarak demirbaş borçlarını doğrudan ev sahibinden talep etmekteyiz.</p>",
    category: "Hukuk & İcra"
  },

  // Teknik Bakım Kategorisi
  {
    question: "Asansör arızalandığında nereye haber vermeliyim?",
    answer: "<p>Mobil uygulamamız üzerinden <strong>Talep / Arıza Bildirimi</strong> menüsünü kullanarak 7/24 anında teknik destek talebi oluşturabilirsiniz. Talebiniz otomatik olarak nöbetçi teknik personelimize ve ilgili asansör bakım firmasına iletilir. Acil durumlarda (asansörde kalma vb.) kabin içindeki acil çağrı butonunu kullanınız.</p>",
    category: "Teknik Bakım"
  },
  {
    question: "Periyodik asansör muayenesi (Yeşil Etiket) zorunlu mu?",
    answer: "<p>Evet, yasal bir zorunluluktur. Asansör İşletme ve Bakım Yönetmeliği gereği, asansörlerin yılda en az 1 kez A tipi muayene kuruluşları tarafından kontrol edilmesi şarttır. Alo Yönetim olarak bu kontrolleri düzenli takip eder ve binanızın her zaman 'Yeşil Etiket' standartlarında kalmasını sağlarız.</p>",
    category: "Teknik Bakım"
  },
  {
    question: "Ortak alanlarda su tesisatı patlarsa kim müdahale eder?",
    answer: "<p>Ortak alan (şaft boşlukları, ana kolon boruları vb.) kaynaklı arızalara teknik personelimiz acilen müdahale eder. Ancak arıza sizin dairenizin içindeki bir borudan kaynaklanıyorsa (özel alan), tamirat sorumluluğu daire sakinine aittir. Gerekirse yönlendirme konusunda yardımcı olmaktayız.</p>",
    category: "Teknik Bakım"
  },

  // Genel & İdari Kategorisi
  {
    question: "Profesyonel yönetime nasıl geçebiliriz?",
    answer: "<p>Binanızda profesyonel yönetime geçmek için Kat Malikleri Kurulu (Olağan veya Olağanüstü Genel Kurul) düzenlemeniz ve oylama ile karar almanız gerekmektedir. İletişim sayfamızdan bize ulaşırsanız, genel kurul süreci, vekaletnameler ve toplantı yönetimi konularında size ücretsiz danışmanlık sağlıyoruz.</p>",
    category: "Genel & İdari"
  },
  {
    question: "Genel kurul toplantılarına katılmak zorunlu mu?",
    answer: "<p>Toplantılara katılmak yasal bir zorunluluk olmamakla birlikte, binanızın geleceği, alınacak kararlar ve belirlenecek yeni aidat bütçesi için katılmanız son derece önemlidir. Katılamayacağınız durumlarda, komşunuza veya güvendiğiniz birine vekaletname vererek oy hakkınızı kullanabilirsiniz.</p>",
    category: "Genel & İdari"
  },
  {
    question: "Sitemizde evcil hayvan beslemek yasaklanabilir mi?",
    answer: "<p>Evcil hayvan besleme konusu öncelikle binanızın <strong>Yönetim Planına</strong> tabidir. Yönetim planında evcil hayvan beslenemeyeceğine dair açık bir madde varsa yasal olarak yasaktır. Böyle bir madde yoksa, çevreye rahatsızlık verilmediği sürece (gürültü, koku, saldırganlık) evcil hayvan beslenebilir.</p>",
    category: "Genel & İdari"
  },
];

async function main() {
  console.log('Veritabanına SSS ekleniyor...');
  
  // Önce eskileri temizle
  await prisma.faq.deleteMany({});
  
  // Yenileri ekle
  let index = 0;
  for (const faq of faqs) {
    await prisma.faq.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: index++
      }
    });
  }
  
  console.log(`✅ ${faqs.length} adet SSS başarıyla eklendi!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

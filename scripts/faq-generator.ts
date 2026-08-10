export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export function generateFaqs(): FAQ[] {
  const faqs: FAQ[] = [];

  // 1. PROGRAMMATIC SEO FAQS (100)
  const districts = [
    'Kadıköy', 'Şişli', 'Beşiktaş', 'Beylikdüzü', 'Ataşehir', 
    'Ümraniye', 'Sarıyer', 'Pendik', 'Bakırköy', 'Maltepe'
  ];
  
  const services = [
    { name: 'Bina Yönetimi', category: 'Yönetim' },
    { name: 'Tesis Yönetimi', category: 'Yönetim' },
    { name: 'Özel Güvenlik', category: 'Güvenlik' },
    { name: 'Temizlik ve Hijyen', category: 'Temizlik' },
    { name: 'Teknik Bakım', category: 'Teknik' },
    { name: 'Havuz Bakımı', category: 'Teknik' },
    { name: 'Peyzaj ve Bahçe', category: 'Teknik' },
    { name: 'İlaçlama', category: 'Temizlik' },
    { name: 'Hukuk Danışmanlığı', category: 'Hukuk' },
    { name: 'Aidat Takibi', category: 'Finans' }
  ];

  districts.forEach(district => {
    services.forEach(service => {
      faqs.push({
        question: `${district} ilçesinde ${service.name} hizmeti veriyor musunuz?`,
        answer: `Evet, Alo Yönetim olarak ${district} bölgesindeki siteler, plazalar ve apartmanlar için profesyonel ${service.name} çözümleri sunuyoruz. %100 yasal güvence ve uzman kadromuzla ${district} lokasyonunda en çok tercih edilen yönetim firmalarından biriyiz. Hızlı müdahale ekiplerimiz ve şeffaf yönetim anlayışımızla hizmetinizdeyiz.`,
        category: service.category
      });
    });
  });

  // 2. CORE FAQS (400) - Combinatorial Generation
  
  // A. Hukuk (100)
  const hukukSubjects = [
    'Aidat Ödemeleri', 'Ortak Alan Kullanımı', 'Gürültü Şikayetleri', 'Evcil Hayvan Beslenmesi', 
    'Balkon Kapatma', 'Otopark Tahsisi', 'Çatı Masrafları', 'Yönetici Seçimi', 
    'Denetçi Raporları', 'Dış Cephe Yalıtımı'
  ];
  const hukukTemplates = [
    { q: '{Subject} ile ilgili Kat Mülkiyeti Kanunu ne diyor?', a: 'Kat Mülkiyeti Kanunu (KMK) gereğince, {Subject} konusunda alınacak kararlar yönetim planına ve kat malikleri kurulu kararlarına bağlıdır. Anlaşmazlıklarda sulh hukuk mahkemelerine başvurulabilir.' },
    { q: 'Kiracı {Subject} masraflarına katılmak zorunda mı?', a: 'Normal şartlarda işletme giderlerine kiracı, demirbaş (yatırım) niteliğindeki {Subject} giderlerine ise ev sahibi katılır. Kira sözleşmesindeki özel maddeler durumu değiştirebilir.' },
    { q: '{Subject} sorunlarında yasal süreç nasıl işler?', a: '{Subject} ile ilgili uyuşmazlıklarda öncelikle yönetime yazılı ihtar çekilir, çözüm bulunamazsa arabulucuya veya doğrudan Sulh Hukuk Mahkemesine başvurulur.' },
    { q: '{Subject} kararı oy çokluğu ile mi alınır?', a: 'KMK Madde 42 ve 43\'e göre {Subject} gibi faydalı veya lüks yenilikler için farklı oy oranları aranır. Genellikle arsa payı ve sayı bakımından salt çoğunluk veya 4/5 çoğunluk gerekebilir.' },
    { q: '{Subject} yönetmeliğe aykırıysa nereye şikayet edilir?', a: 'Sitenin yönetim planına veya imar mevzuatına aykırı {Subject} durumlarında, ilçe belediyesine veya Sulh Hukuk Mahkemesine şikayette bulunulabilir.' },
    { q: 'Apartmanda {Subject} konusunda anlaşmazlık çıkarsa ne yapılmalı?', a: 'Öncelikle olağanüstü kat malikleri kurulu toplanmalı, durum tutanak altına alınmalı ve {Subject} hakkında hukuki danışmanlık alınarak karar defterine işlenmelidir.' },
    { q: 'Yeni yönetici {Subject} hakkında nasıl bir karar defteri tutmalı?', a: 'Yönetici, {Subject} ile ilgili tüm itirazları, alınan teklifleri ve oylama sonuçlarını noter onaylı karar defterine şeffaf ve eksiksiz bir şekilde işlemelidir.' },
    { q: '{Subject} ihlali durumunda ihtarname süreci kaç gündür?', a: '{Subject} ile ilgili ihlallerde noter kanalıyla çekilen ihtarnamede genellikle 7 gün süre verilir. Süre sonunda yükümlülük yerine getirilmezse icra takibi veya dava açılabilir.' },
    { q: 'Site yönetiminin {Subject} ile ilgili sorumlulukları nelerdir?', a: 'Yönetim, {Subject} konusunda KMK hükümlerini uygulamak, gerekli tebligatları yapmak ve süreci kat maliklerine raporlamakla yükümlüdür.' },
    { q: 'Mahkeme {Subject} konusunda nasıl bir karar verir?', a: 'Mahkeme, yönetim planını, onaylı mimari projeyi ve KMK hükümlerini inceleyerek {Subject} uyuşmazlığını bilirkişi raporuyla karara bağlar.' }
  ];

  // B. Finans (100)
  const finansSubjects = [
    'İşletme Projesi', 'Aidat Bütçesi', 'Gecikme Tazminatı', 'SGK Primleri', 
    'Demirbaş Giderleri', 'Kıdem Tazminatı Fonu', 'Avans Payları', 'Kapıcı Maaşları', 
    'Vergi Muafiyeti', 'Ek Bütçe'
  ];
  const finansTemplates = [
    { q: '{Subject} nasıl hesaplanır ve duyurulur?', a: '{Subject}, genel kurulda onaylanan tahmini bütçeye göre arsa payı veya eşit bölüşüm esasına göre hesaplanıp tüm maliklere imza karşılığı veya iadeli taahhütlü tebliğ edilir.' },
    { q: '{Subject} ödenmezse aylık %5 gecikme zammı uygulanır mı?', a: 'Evet, KMK Madde 20 uyarınca {Subject} borcunu zamanında ödemeyenlerden aylık %5 hesabıyla gecikme tazminatı alınır.' },
    { q: 'Yönetici {Subject} toplarken kendi banka hesabını kullanabilir mi?', a: 'Hayır, {Subject} ve diğer tüm tahsilatlar sadece apartman/site adına açılmış resmi banka hesabı üzerinden yürütülmelidir.' },
    { q: '{Subject} giderleri için kimlerden avans talep edilir?', a: 'Genel giderler ve {Subject} için kat maliklerinden bağımsız bölüm sayılarına veya arsa paylarına göre avans talep edilir.' },
    { q: 'Kiracı evden çıkarken {Subject} borcundan sorumlu mudur?', a: 'Kiracı, oturduğu döneme ait işletme kaynaklı {Subject} borçlarından ev sahibi ile birlikte müteselsilen sorumludur, ancak kira bedeli kadar kısıtlıdır.' },
    { q: '{Subject} fonu enflasyona karşı nasıl korunur?', a: 'Toplanan {Subject} fonları, kat malikleri kurulunun kararıyla vadeli mevduat veya risksiz fonlarda değerlendirilerek enflasyona karşı korunabilir.' },
    { q: 'Site bütçesinde {Subject} için ayrılan pay yetmezse ne olur?', a: 'Bütçede {Subject} kalemi yetersiz kalırsa, yönetici ek bütçe veya olağanüstü işletme projesi hazırlayarak maliklerden ek avans talep eder.' },
    { q: 'Yönetim {Subject} gelir/gider tablosunu ne sıklıkla asmalı?', a: 'Şeffaflık gereği, {Subject} raporları ve genel bütçe durumu her ay sonu site ilan panosuna asılmalı ve dijital platformlardan paylaşılmalıdır.' },
    { q: 'Boş daire sahibi {Subject} ödemek zorunda mı?', a: 'Evet, KMK\'ya göre ev boş olsa dahi (ısıtma sistemi hariç tutulabilir) malik, genel {Subject} ve aidatlara katılmak zorundadır.' },
    { q: '{Subject} denetimi kim tarafından yapılır?', a: 'Sitenin {Subject} denetimi, genel kurulda seçilen denetim kurulu veya dışarıdan atanan bağımsız yeminli mali müşavirler tarafından 3, 6 veya 12 aylık periyotlarla yapılır.' }
  ];

  // C. Güvenlik (100)
  const guvenlikSubjects = [
    'Kamera Kayıtları', 'Ziyaretçi Girişi', 'Kurye Teslimatı', 'Gece Devriyesi', 
    '5188 Sayılı Kanun', 'Plaka Tanıma Sistemi', 'Şifreli Kapı', 'Yangın Merdiveni', 
    'Otopark Güvenliği', 'Havuz Güvenliği'
  ];
  const guvenlikTemplates = [
    { q: '{Subject} KVKK (Kişisel Veriler) kapsamında yasal mıdır?', a: '{Subject}, açık rıza olmaksızın ancak kanuni zorunluluk (meşru menfaat) çerçevesinde ve sadece güvenlik amacıyla sınırlı olarak işlenebilir. Gerekli aydınlatma metinleri görünür yerlere asılmalıdır.' },
    { q: 'Özel güvenlik personeli {Subject} konusunda nasıl bir eğitim alıyor?', a: 'Tüm güvenlik personelimiz, {Subject} standartları ve 5188 Sayılı Özel Güvenlik Kanunu kapsamında düzenli olarak hizmet içi eğitimlerden geçirilmektedir.' },
    { q: 'Polis veya jandarma {Subject} talebinde bulunursa verilmeli mi?', a: 'Resmi kolluk kuvvetleri savcılık kararı veya acil durum resmi talebiyle {Subject} ile ilgili belge/kayıtları talep ettiğinde tutanak karşılığı teslim edilir.' },
    { q: 'Sitede {Subject} ihlali tespit edildiğinde süreç nasıl işler?', a: '{Subject} ihlali anında özel güvenlik vardiya amirine bildirilir, olay tutanağı tutulur ve gerekirse anında kolluk kuvvetlerine haber verilir.' },
    { q: '{Subject} için kullanılan sistemlerin bakımı kimin sorumluluğunda?', a: 'Alo Yönetim olarak {Subject} altyapısının periyodik donanım ve yazılım bakımlarını teknik ekibimiz aracılığıyla aylık olarak gerçekleştiriyoruz.' },
    { q: 'Site sakini, kendi isteğiyle {Subject} kurallarını esnetebilir mi?', a: 'Hayır, {Subject} kuralları tüm site sakinlerinin can ve mal güvenliği için yönetim kurulunca belirlenir ve hiçbir malik için istisnai olarak esnetilemez.' },
    { q: 'Gece saatlerinde {Subject} konusunda ekstra önlem alınıyor mu?', a: 'Evet, özellikle 22:00 - 06:00 saatleri arasında {Subject} protokolleri sıkılaştırılarak, devriye sıklığı artırılmaktadır.' },
    { q: 'Güvenlik firması değiştiğinde {Subject} verileri ne olur?', a: 'KVKK gereği {Subject} ile ilgili geçmiş veriler ve kayıtlar, yeni yönetime devredilir veya yasal saklama süresi dolmuşsa imha edilir.' },
    { q: '{Subject} uygulaması kargo şirketlerini nasıl etkiliyor?', a: 'Kargo ve dağıtım şirketleri {Subject} prosedürlerine tabidir. Kimlik onayı ve daire teyidi alınmadan içeriye girişlerine müsaade edilmez.' },
    { q: '{Subject} bütçesi yüksek geliyorsa nasıl optimize edilir?', a: '{Subject} bütçesini düşürmek için fiziksel insan gücü yerine, yapay zeka destekli elektronik güvenlik sistemleri (kamera, bariyer entegrasyonu) kullanılarak optimizasyon sağlanabilir.' }
  ];

  // D. Teknik (100)
  const teknikSubjects = [
    'Asansör Bakımı', 'Kırmızı Etiket', 'Kazan Dairesi', 'Hidrofor Sistemi', 
    'Jeneratör Testi', 'Yangın Tüpleri', 'Havuz Suyu Analizi', 'Su Deposu Temizliği', 
    'Peyzaj İlaçlama', 'Çatı İzolasyonu'
  ];
  const teknikTemplates = [
    { q: '{Subject} zorunlu mudur, yasal periyodu nedir?', a: 'Evet, {Subject} ilgili bakanlık yönetmeliklerine göre yasal bir zorunluluktur. Genellikle aylık veya yıllık periyodik kontroller şeklinde yapılması şarttır.' },
    { q: 'Belediye denetiminde {Subject} eksik çıkarsa cezası var mı?', a: 'Tesisinizde {Subject} ile ilgili yasal eksiklik bulunması durumunda site yönetimine yüksek miktarda idari para cezası kesilebilir.' },
    { q: '{Subject} sırasında binanın suyu/elektriği kesilir mi?', a: 'Planlı {Subject} operasyonlarında, site sakinlerine en az 24 saat önceden haber verilmek şartıyla kısa süreli kontrollü kesintiler yapılabilir.' },
    { q: 'Sertifikasız firmalara {Subject} yaptırılabilir mi?', a: 'Kesinlikle hayır. {Subject} mutlaka TSE belgeli, yetkili mühendisleri olan ve Mesleki Yeterlilik Belgesi (MYK) sahibi uzman firmalara yaptırılmalıdır.' },
    { q: 'Kış ayları gelmeden {Subject} yapılmalı mı?', a: 'Evet, özellikle mevsim geçişlerinde sistemlerin sağlıklı çalışması ve enerji tasarrufu için {Subject} kışa girmeden tamamlanmalıdır.' },
    { q: '{Subject} giderleri çok yüksek, tasarruf için ne yapmalıyız?', a: 'Koruyucu (önleyici) bakım stratejimiz sayesinde, {Subject} arızaları büyümeden tespit edilir ve uzun vadede %30 civarı tasarruf sağlanır.' },
    { q: '{Subject} için acil durumda kaç dakikada müdahale ediyorsunuz?', a: 'Alo Yönetim 7/24 Mobil Teknik Ekipleri, {Subject} kaynaklı acil arızalara sözleşme şartlarına göre ortalama 30-45 dakika içinde müdahale etmektedir.' },
    { q: 'Yeni inşaatlarda {Subject} garantisi kaç yıldır?', a: 'Müteahhit firma tarafından teslim edilen sistemlerde {Subject} genellikle 2 yıl parça ve işçilik garantisi altındadır. Ancak periyodik bakımları yapılmalıdır.' },
    { q: 'Yönetim {Subject} raporlarını nerede saklamalıdır?', a: 'Periyodik {Subject} raporları, hem dijital portalımızda site maliklerinin erişimine açık tutulur hem de fiziksel bina dosyasında 5 yıl saklanır.' },
    { q: 'Sıradan bir kapıcı {Subject} yapabilir mi?', a: 'Hayır, {Subject} özel uzmanlık gerektirir. Kapıcı veya apartman görevlileri sadece görsel kontrol yapabilir, teknik müdahaleyi yetkili servis yapmalıdır.' }
  ];

  const generateCategoryFaqs = (subjects: string[], templates: {q: string, a: string}[], catName: string) => {
    subjects.forEach(subject => {
      templates.forEach(template => {
        faqs.push({
          question: template.q.replace(/\{Subject\}/g, subject),
          answer: template.a.replace(/\{Subject\}/g, subject),
          category: catName
        });
      });
    });
  };

  generateCategoryFaqs(hukukSubjects, hukukTemplates, 'Hukuk');
  generateCategoryFaqs(finansSubjects, finansTemplates, 'Finans');
  generateCategoryFaqs(guvenlikSubjects, guvenlikTemplates, 'Güvenlik');
  generateCategoryFaqs(teknikSubjects, teknikTemplates, 'Teknik');

  return faqs;
}

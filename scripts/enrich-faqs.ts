import { prisma } from '../src/lib/prisma';

// ─── İLÇE KİŞİSELLEŞTİRME ────────────────────────────────────────────────────
const districtProfiles: Record<string, { char: string; buildings: string; note: string }> = {
  'Kadıköy': {
    char: 'kültürel dokusu zengin, karma kullanımlı',
    buildings: 'köklü apartmanlar, modern rezidanslar ve plazalar',
    note: 'tarihi konut dokusunun korunması ve dönüşüm projelerine özel deneyimimizle',
  },
  'Şişli': {
    char: 'iş merkezi niteliğindeki lüks',
    buildings: 'yüksek katlı ofis-rezidans karışık yapılar ve butik siteler',
    note: 'kurumsal kiracı profili ve yüksek standart beklentilerine yönelik',
  },
  'Beşiktaş': {
    char: 'tarihi ve prestijli',
    buildings: 'köşk dönüşümleri, lüks rezidanslar ve karma projeler',
    note: 'koruma altındaki yapılarda uzman ekibimiz ve özel uygulama deneyimimizle',
  },
  'Beylikdüzü': {
    char: 'hızla gelişen yeni nesil',
    buildings: 'geniş toplu konut siteleri ve büyük ölçekli karma projeler',
    note: 'büyük site ölçeğinde operasyonel verimlilik ve maliyet optimizasyonu sağlayarak',
  },
  'Ataşehir': {
    char: 'Anadolu yakasının finans merkezi niteliğindeki modern',
    buildings: 'yüksek katlı rezidanslar, AVM kompleksleri ve kurumsal binalar',
    note: 'kurumsal yönetim standartları ve teknoloji entegrasyonumuzu ön plana çıkararak',
  },
  'Ümraniye': {
    char: 'karma kullanımlı ve hızla dönüşen',
    buildings: 'sanayi dönüşüm projeleri, kentsel dönüşüm siteleri ve apartmanlar',
    note: 'kentsel dönüşüm süreçlerinde mevzuat bilgimiz ve proje yönetim deneyimimizle',
  },
  'Sarıyer': {
    char: 'Boğaz\'a kıyı, doğayla iç içe lüks',
    buildings: 'villa kompleksleri, sahil rezidansları ve müstakil konut projeleri',
    note: 'yeşil alan ve havuz yönetimi konusundaki uzmanlığımız ile doğa dostu çözümlerimizle',
  },
  'Pendik': {
    char: 'sahil şeridine uzanan gelişen',
    buildings: 'karma konut siteleri, sahil projeleri ve karma ticari-konut yapılar',
    note: 'denize yakın yapılarda nem ve korozyon yönetimindeki özel deneyimimizle',
  },
  'Bakırköy': {
    char: 'yerleşik ve köklü orta-üst segment',
    buildings: 'olgun apartman stoku, küçük siteler ve ticari karma yapılar',
    note: 'köklü bina yönetimi gereksinimlerine yönelik kapsamlı bakım programlarımızla',
  },
  'Maltepe': {
    char: 'aile odaklı, deniz manzaralı sakin',
    buildings: 'orta ölçekli siteler, müstakil konutlar ve karma kullanım projeleri',
    note: 'aile ve çocuk güvenliğini ön planda tutan yönetim anlayışımızla',
  },
};

const serviceLabels: Record<string, string> = {
  'Bina Yönetimi': 'profesyonel bina yönetimi',
  'Tesis Yönetimi': 'entegre tesis yönetimi',
  'Özel Güvenlik': 'özel güvenlik',
  'Temizlik ve Hijyen': 'endüstriyel temizlik ve hijyen',
  'Teknik Bakım': 'teknik bakım ve onarım',
  'Havuz Bakımı': 'havuz bakımı ve hijyeni',
  'Peyzaj ve Bahçe': 'peyzaj ve bahçe düzenleme',
  'İlaçlama': 'haşere kontrolü ve ilaçlama',
  'Hukuk Danışmanlığı': 'hukuki danışmanlık ve icra takibi',
  'Aidat Takibi': 'aidat takibi ve tahsilat yönetimi',
};

function buildDistrictAnswer(district: string, service: string): string {
  const p = districtProfiles[district];
  const svc = serviceLabels[service] || service;
  return `<p>Evet, Alo Yönetim olarak ${district}'in ${p.char} yapısındaki ${p.buildings} için profesyonel ${svc} hizmeti sunuyoruz.</p><p>${p.note.charAt(0).toUpperCase() + p.note.slice(1)} sizlere en yüksek standartta hizmet sağlıyoruz. 7/24 destek hattımız, dijital yönetim paneli ve yerinde uzman ekibimizle ${district}'deki mülklerinizin değerini koruyup artırıyoruz.</p><ul><li><strong>Hızlı müdahale:</strong> 2 saat içinde sahada</li><li><strong>Şeffaf raporlama:</strong> Aylık detaylı faaliyet raporu</li><li><strong>Yasal güvence:</strong> %100 mevzuata uygun yönetim</li></ul>`;
}

// ─── YENİ SORULAR: KÜÇÜK KATEGORİLER ─────────────────────────────────────────
const newFaqs = [

  // AİDAT TAKİBİ (8 yeni)
  { question: 'Aidat borcumu online olarak nasıl öğrenebilirim?', answer: '<p>Mobil uygulamamıza veya web panelinize giriş yaparak "Aidat Durumu" ekranından anlık borç bakiyenizi, son ödeme tarihinizi ve geçmiş ödeme kayıtlarınızı görüntüleyebilirsiniz. Dilediğiniz zaman PDF dökümü alabilir, e-posta ile gönderebilirsiniz.</p>', category: 'Aidat Takibi' },
  { question: 'Otomatik aidat ödeme talimatı nasıl kurulabilir?', answer: '<p>Bankacılık uygulamanız üzerinden <strong>"Otomatik Ödeme Talimatı"</strong> bölümüne girerek yönetimden aldığınız IBAN numarasını ve sabit aidat tutarını tanımlayabilirsiniz. Alternatif olarak yönetim panelinde kredi kartınızı kayıt ettirerek her ay otomatik tahsilat yetkisi verebilirsiniz.</p>', category: 'Aidat Takibi' },
  { question: 'Aidat tutarı nasıl belirlenir ve kim onaylar?', answer: '<p>Aidat tutarı, yıllık işletme bütçesi kat malikleri kurulunda görüşülerek arsa payı oranında dağıtılır (KMK m. 20). Bütçe kalemleri; personel, temizlik, teknik bakım, ortak alan giderleri ve yönetim ücretinden oluşur. Onaylanan bütçe kat maliklerine yazılı tebliğ edilir.</p>', category: 'Aidat Takibi' },
  { question: 'Fazla ödenen aidat iade edilir mi?', answer: '<p>Evet. Yılsonu kesin hesap yapıldığında bütçe fazlası oluşursa, kat maliklerinin arsa payı oranında iadesi ya da bir sonraki dönem aidatına mahsubu yapılır. Tercihlerinizi yönetim panelinden iletebilirsiniz.</p>', category: 'Aidat Takibi' },
  { question: 'Kiracı olarak aidat ödemek zorunda mıyım?', answer: '<p>Kat Mülkiyeti Kanunu\'na göre ortak gider aidatları <strong>işletme giderleri</strong> için kiracı tarafından ödenir. Bina değerini artıran demirbaş giderlerinden ise yalnızca ev sahibi sorumludur. Ödeme yükümlülükleri için kira sözleşmenizi incelemenizi öneririz.</p>', category: 'Aidat Takibi' },
  { question: 'Daire satışında aidat borcu nasıl çözülür?', answer: '<p>Tapu devri öncesinde yönetimden <strong>"aidat borcu yoktur"</strong> yazısı alınması yasal zorunluluktur. Biriken borçlar var ise noter kanalıyla taraflara tebliğ edilerek kapatılmadan tapu devrinin önüne geçilir. Süreci yönetiminizle koordineli yürütmenizi tavsiye ederiz.</p>', category: 'Aidat Takibi' },
  { question: 'Aylık aidat dışında ek gider talebi gelebilir mi?', answer: '<p>Evet; çatı tamiri, asansör yenilenmesi veya mantolama gibi bütçe dışı büyük yatırımlar için kat malikleri kurulundan ayrıca karar alınarak <strong>avans gideri</strong> talep edilebilir. Bu talepler arsa payına göre dağıtılır ve toplantı tutanağıyla belgelenir.</p>', category: 'Aidat Takibi' },
  { question: 'Aidat tahsilat raporunu nasıl alabilirim?', answer: '<p>Yönetim panelinizdeki <strong>"Raporlar"</strong> bölümünden istediğiniz tarih aralığına ait tahsilat raporunu PDF veya Excel formatında indirebilirsiniz. Aylık raporlar ayrıca e-posta ile otomatik olarak iletilmektedir.</p>', category: 'Aidat Takibi' },

  // HAVUZ BAKIMI (8 yeni)
  { question: 'Havuz kaç günde bir temizleniyor ve bu süreç nasıl işliyor?', answer: '<p>Standart programımızda havuz yüzey temizliği her gün, filtre ve pompa kontrolü haftalık, dip temizliği ise iki haftada bir yapılmaktadır. Yüksek sezon (Haziran–Eylül) döneminde bu frekanslara ek olarak günlük kimyasal ölçüm de gerçekleştirilir.</p>', category: 'Havuz Bakımı' },
  { question: 'Havuz suyu kalitesi nasıl takip ediliyor?', answer: '<p>Uzmanlarımız her gün pH (7,2–7,6), klor (1–3 ppm), alkalinite ve bulanıklık değerlerini dijital test kitleriyle ölçer. Sonuçlar anlık raporlama sistemine işlenir; eşik dışı değerlerde otomatik alarm devreye girer ve kimyasal dozajlama düzeltilir.</p>', category: 'Havuz Bakımı' },
  { question: 'Kış aylarında havuz nasıl korunur?', answer: '<p>Ekim–Nisan döneminde standart <strong>kışa alma programı</strong> uygulanır: su seviyesi düşürülür, filtre ve pompalar temizlenip devre dışı bırakılır, havuz örtüsü kapatılır ve donma önleyici kimyasal bırakılır. Kışa alma ve bahara açılış hizmetlerimiz bakım paketlerinize dahildir.</p>', category: 'Havuz Bakımı' },
  { question: 'Havuz kullanımı için sağlık sertifikası gerekli mi?', answer: '<p>Türk Halk Sağlığı Kurumu yönetmeliği gereğince kamuya açık havuzlarda haftalık su analiz belgesi bulunması zorunludur. Yönetimimiz bu belgeleri yetkili laboratuvarlarda düzenletir ve güncel raporları havuz panosunda ve dijital panelde ilan eder.</p>', category: 'Havuz Bakımı' },
  { question: 'Havuz arızası durumunda müdahale süresi ne kadardır?', answer: '<p>Pompa, filtre veya ısıtıcı arızalarında teknik ekibimiz <strong>4 saat içinde</strong> müdahale eder. Arıza büyüklüğüne göre geçici çözüm uygulanarak havuz kapatılmaz; uzun süreli kapatma zorunluluğu doğarsa sakinler SMS ve uygulama bildirimiyle bilgilendirilir.</p>', category: 'Havuz Bakımı' },
  { question: 'Çocuk havuzu için özel güvenlik önlemleri nelerdir?', answer: '<p>Çocuk havuzlarında derinlik maksimum 60 cm tutulur, kaymaz zemin kaplama ve çevre koruyucu bariyer zorunludur. Kimyasal konsantrasyonlar yetişkin havuzundan farklı kalibre edilir, günde en az iki kez kontrol edilir. Nöbetçi cankurtaran görevlendirmesi talep üzerine sağlanabilir.</p>', category: 'Havuz Bakımı' },
  { question: 'Havuz kullanım kuralları kim tarafından belirlenir?', answer: '<p>Havuz kullanım saatleri ve kuralları (kıyafet, gıda yasağı, çocuk politikası vb.) kat malikleri kurulunca kabul edilen yönetim planı çerçevesinde belirlenir. Yönetimimiz bu kuralları yazılı olarak ilan eder ve uyumu denetler; ihlallerde uyarı ve geçici erişim kısıtlaması uygulayabilir.</p>', category: 'Havuz Bakımı' },
  { question: 'Havuz bakım maliyetleri aidatlara nasıl yansır?', answer: '<p>Havuz işletme giderleri (kimyasal, enerji, teknik bakım, personel) yıllık bütçe görüşmesinde ayrı bir kalem olarak sunulur ve arsa payı oranında aidatlara yansıtılır. İsteğe bağlı olarak havuz kullanan daireler için ayrı bir <strong>havuz aidatı</strong> modeli de oluşturulabilir.</p>', category: 'Havuz Bakımı' },

  // HAŞERE KONTROLÜ (7 yeni)
  { question: 'İlaçlama işlemleri ne sıklıkla yapılır?', answer: '<p>Standart programımızda ortak alanlar (otopark, bodrum, çöplük, peyzaj) <strong>3 ayda bir</strong> koruyucu ilaçlamaya tabi tutulur. Yaz aylarında sivrisinek ve karasinek için ek uçucu böcek ilaçlaması yapılır. Şikayet veya görülme durumunda acil müdahale 24 saat içinde gerçekleştirilir.</p>', category: 'Haşere Kontrolü' },
  { question: 'İlaçlama öncesinde sakinler nasıl bilgilendirilir?', answer: '<p>İlaçlama tarihinden en az <strong>48 saat önce</strong> sakinlere uygulama paneli, SMS ve bina duyuru panosu aracılığıyla bildirim yapılır. Bildirimde hangi alanların ilaçlanacağı, kullanılacak ürünlerin güvenlik veri sayfaları ve önlemler açıkça belirtilir.</p>', category: 'Haşere Kontrolü' },
  { question: 'Evcil hayvanlarım ilaçlama sırasında ne yapmalıyım?', answer: '<p>İlaçlama süresince evcil hayvanlarınızı ortak alanlara çıkarmayınız. Dairenizin ilaçlanması planlanıyorsa uygulamadan önce hayvanlarınızı dışarı çıkarmanızı ve balık akvaryumlarınızı kapamanızı öneriyoruz. Kullanılan ürünler Tarım Bakanlığı onaylı ve biyolojik çeşitlilik dostu formülasyonlardır.</p>', category: 'Haşere Kontrolü' },
  { question: 'İlaçlama sonrası ne zaman eve dönebilirim?', answer: '<p>Kullandığımız ürünlere göre havalandırma süresi genellikle <strong>2–4 saattir</strong>. Uygulama ekibimiz ilaçlama tamamlandığında sakinlere bildirim yapar ve güvenli giriş onayı verir. Hassas bireyler (astım, alerji) için doktorunuza danışmanızı öneririz.</p>', category: 'Haşere Kontrolü' },
  { question: 'Hangi haşereler için ilaçlama hizmetiniz var?', answer: '<p>Hizmet kapsamımız şunları içerir: <strong>böcekler</strong> (hamam böceği, pire, karınca, tahtakurusu), <strong>kemirgenler</strong> (fare, sıçan – tuzak ve kimyasal), <strong>uçan böcekler</strong> (sivrisinek, sinek, arı–eşek arısı yuvası), <strong>bitkisel zararlılar</strong> (kene, yaprakbiti, trip). Her grup için farklı yöntem ve ürünler kullanılır.</p>', category: 'Haşere Kontrolü' },
  { question: 'Organik ve çevre dostu ilaçlama seçeneği var mı?', answer: '<p>Evet. Çevre ve insan sağlığını ön planda tutan sitelerimiz için biyolojik preparat, kieselgur bazlı toz ve feromonlu tuzak sistemleri kullanıyoruz. Bu yöntemler Avrupa Birliği biyosidal yönetmeliklerine uygundur ve evcil hayvanlar ile arılar için güvenlidir.</p>', category: 'Haşere Kontrolü' },
  { question: 'Dairem içinde böcek görüyorsam ne yapmalıyım?', answer: '<p>Dairenizdeki görülme durumunu yönetim panelimiz üzerinden veya 7/24 destek hattımızı arayarak bildirin. Yönetimimiz <strong>24 saat içinde</strong> değerlendirme yapar; bireysel daire ilaçlaması gerekirse ekibimiz zamanlar ve sizi bilgilendirir. Toplu görülmelerde tüm bina müdahalesi planlanır.</p>', category: 'Haşere Kontrolü' },

  // PEYZAJ VE BAHÇE (7 yeni)
  { question: 'Bahçe bakımı haftada kaç kez yapılır?', answer: '<p>Standart programımızda bahçe bakımı <strong>haftada 1 kez</strong> gerçekleştirilir; yüksek büyüme sezonunda (Nisan–Eylül) bu frekans haftada 2 keze çıkarılabilir. Kış döneminde sulama azaltılır, mevsimlik çiçek alanları hazırlanır ve yıllık budama programı uygulanır.</p>', category: 'Peyzaj ve Bahçe' },
  { question: 'Mevsimsel çiçek dikimi hizmetinize dahil mi?', answer: '<p>Evet. Yıllık bakım paketlerimizde <strong>yılda 2–3 kez mevsimlik değişim</strong> (kış pansiyon–bahar lalesi, yaz sardunya–petunya, sonbahar krizantem) standardımıza dahildir. Özel düzenleme ve tematik peyzaj tasarımları ise ayrı proje olarak planlanır.</p>', category: 'Peyzaj ve Bahçe' },
  { question: 'Ağaç budama ve bakımı nasıl programlanıyor?', answer: '<p>Ağaç budaması <strong>kış sonu (Şubat–Mart)</strong> ve <strong>sonbahar (Ekim–Kasım)</strong> olmak üzere yılda 2 kez uygulanır. Tehlikeli eğim veya kuruyan dal tespitinde acil müdahale yapılır. Büyük çaplı ağaçlarda ilçe belediyesinden izin süreci yönetimimiz tarafından yürütülür.</p>', category: 'Peyzaj ve Bahçe' },
  { question: 'Sulama sistemi kurulumu ve bakımı hizmetinize dahil mi?', answer: '<p>Otomatik damla sulama ve yağmurlama sistemleri kurulumu ayrı proje kapsamında değerlendirilir. Mevcut sulama altyapısının bakımı, filtre temizliği, zamanlayıcı ayarı ve mevsimsel devreye alma–kapatma işlemleri ise bakım paketimize dahildir.</p>', category: 'Peyzaj ve Bahçe' },
  { question: 'Bahçede özel etkinlik düzenlenmesi için izin gerekiyor mu?', answer: '<p>Ortak bahçe alanlarında etkinlik düzenlemek için yönetim kuruluna yazılı başvuru yapılması gerekmektedir. Gürültü, misafir kapasitesi ve temizlik sorumluluğu yönetim planı çerçevesinde değerlendirilir. Onay verilen etkinlikler için sakinlere önceden duyuru yapılır.</p>', category: 'Peyzaj ve Bahçe' },
  { question: 'Kompost ve çevre dostu bahçe yönetimi uyguluyor musunuz?', answer: '<p>Evet. Sürdürülebilirlik programımız kapsamında bahçe atıkları (yaprak, çim biçimi) kompost haline getirilerek toprağa geri kazandırılır. Kimyasal gübre yerine organik preparat kullanılır; bu uygulama hem çevre dostu hem de uzun vadede maliyet avantajı sağlar.</p>', category: 'Peyzaj ve Bahçe' },
  { question: 'Havuz çevresi peyzajı özel bakım gerektiriyor mu?', answer: '<p>Havuz çevresinde kullanılan bitkilerin kök yapısı ve yaprak dökümü havuz bakımını doğrudan etkiler. Uzmanlarımız havuz kenarı için kaymaz taş kaplama uyumlu, az yaprak döken ve klorun zarar vermeyeceği türleri seçer. Bu alanlar standart bahçe bakım programına dahil edilir.</p>', category: 'Peyzaj ve Bahçe' },

  // TEKNİK BAKIM (8 yeni)
  { question: 'Asansör periyodik bakımı ne sıklıkla yapılıyor?', answer: '<p>Asansörler Türk Standartları (TS EN 13015) gereğince <strong>ayda bir</strong> yetkilendirilmiş firmalar tarafından periyodik bakıma tabi tutulur. Yılda bir kez kapsamlı teknik kontrol ve belediye denetimi gerçekleştirilir. Bakım tutanakları dijital olarak arşivlenir ve talep halinde kat maliklerine iletilir.</p>', category: 'Teknik Bakım' },
  { question: 'Su pompası ve hidrofor bakımı nasıl planlanıyor?', answer: '<p>Hidrofor ve sirkülasyon pompaları <strong>3 ayda bir</strong> basınç, akış ve contaları açısından kontrol edilir. Yıllık kapsamlı bakımda filtre değişimi, impeller kontrolü ve elektrik bağlantıları gözden geçirilir. Anlık arıza durumunda 2 saat içinde müdahale garantisi verilmektedir.</p>', category: 'Teknik Bakım' },
  { question: 'Yangın algılama ve söndürme sistemleri kim tarafından denetleniyor?', answer: '<p>Yangın algılama, ihbar ve söndürme sistemleri <strong>yılda 4 kez</strong> (mevsimlik) yetkili yangın firması tarafından test edilir. Yangın dolap hortumları, sensörler ve sprinkler başlıkları dönüşümlü olarak değiştirilir. Muayene raporları zorunlu arşiv dosyasında saklanır.</p>', category: 'Teknik Bakım' },
  { question: 'Elektrik tesisatı bakımı kapsama dahil mi?', answer: '<p>Ortak alan elektrik tesisatı (aydınlatma, paratoner, topraklama, pano) bakımı hizmet paketimizin ayrılmaz parçasıdır. Bağımsız bölüm içi tesisatlar ise ayrıca değerlendirilir. Yıllık enerji verimliliği analizi ile tasarruf alanları tespit edilip kat maliklerine raporlanır.</p>', category: 'Teknik Bakım' },
  { question: 'Çatı ve su yalıtımı bakımı nasıl takip ediliyor?', answer: '<p>Çatı ve teras zeminleri yılda 2 kez (kış öncesi ve yağmur sonrası) gözle ve termal kamera ile kontrol edilir. Tespit edilen sızıntı noktaları <strong>48 saat içinde</strong> onarılır. Kapsamlı çatı yenileme projeleri kat malikleri kurulu kararıyla ihaleye çıkarılır.</p>', category: 'Teknik Bakım' },
  { question: 'Bina ısıtma sistemi (kazan) bakımı nasıl yapılıyor?', answer: '<p>Merkezi ısıtma kazanları sezon başı (Eylül) ve sezon sonu (Nisan) olmak üzere yılda 2 kez yetkili servis tarafından bakıma alınır. Bu bakımda bek temizliği, emniyet valfı testi, baca ölçümü ve yakıt verimliliği kontrolü yapılır. Doğalgaz kullanımında yıllık tesisat sertifikası yenilenir.</p>', category: 'Teknik Bakım' },
  { question: 'Teknik arıza bildirimi nasıl yapılır?', answer: '<p>Arızaları <strong>3 kanaldan</strong> bildirebilirsiniz: (1) 7/24 açık teknik destek hattımız, (2) mobil uygulamamızdaki "Arıza Bildir" butonu, (3) WhatsApp destek hattımız. Bildiriminiz sistem üzerinde kayıt altına alınır, size bilgi numarası verilir ve müdahale süresi taraflara iletilir.</p>', category: 'Teknik Bakım' },
  { question: 'Ortak alan aydınlatma arızaları ne zaman gideriliyor?', answer: '<p>Ortak alan (otopark, merdiven, giriş, bahçe) aydınlatma arızaları <strong>iş günlerinde 4 saat</strong>, güvenliği etkileyen kritik noktalarda ise <strong>2 saat içinde</strong> giderilir. Ampul ve armatür değişimleri stok ürünlerle yerinde yapılır; gecenin ilerleyen saatlerinde gelen bildirimler sabaha ilk iş olarak ele alınır.</p>', category: 'Teknik Bakım' },

  // HUKUKİ SÜREÇLER (7 yeni)
  { question: 'Kat mülkiyeti uyuşmazlıklarında ilk başvuru nereye yapılır?', answer: '<p>Kat mülkiyetinden kaynaklanan uyuşmazlıklarda önce yöneticiye yazılı başvuru yapılır. Çözüm sağlanamadığında <strong>zorunlu arabuluculuk</strong> aşamasına geçilir (01.01.2024 itibarıyla dava şartı). Arabuluculukta da sonuç alınamazsa Sulh Hukuk Mahkemesi\'nde dava açılır.</p>', category: 'Hukuki Süreçler' },
  { question: 'Ortak alanlara zarar veren sakin için nasıl bir yol izleniyor?', answer: '<p>Ortak alana verilen zararda yönetim önce yazılı uyarı gönderir ve zararın 15 gün içinde tazmin edilmesini talep eder. Bu sürede tazminat yapılmazsa kat malikleri kurulunda karar alınarak <strong>noter ihtarnamesi</strong> çekilir ve gerekirse icra takibi ya da tazminat davası başlatılır.</p>', category: 'Hukuki Süreçler' },
  { question: 'Yönetici azil süreci nasıl işler?', answer: '<p>KMK m. 34 uyarınca kat malikleri kurulu, <strong>arsa payı çoğunluğuyla</strong> her zaman yöneticiyi görevden alabilir. Bunun için olağanüstü kat malikleri kurulu toplantısı yapılması gerekir. Toplantı çağrısı, malikler tarafından noter kanalıyla tüm kat maliklerine yapılabilir.</p>', category: 'Hukuki Süreçler' },
  { question: 'Gürültü şikayetinde yasal süreç nasıl işler?', answer: '<p>Gürültü şikayetinde öncelikle yöneticiye yazılı bildirim yapılır. Yönetici ilgili sakine uyarı yazısı gönderir. Tekrarlayan ihlallerde Çevre Kanunu kapsamında <strong>belediye zabıtasına</strong> şikayet ve/veya Sulh Ceza Hakimliği\'ne başvuru yolları açıktır. Ölçüme dayalı şikayetler daha hızlı sonuç verir.</p>', category: 'Hukuki Süreçler' },
  { question: 'Bina güçlendirme kararı nasıl alınır?', answer: '<p>Deprem güçlendirmesi ve kentsel dönüşüm gibi yapısal kararlar için KMK m. 19/A uyarınca <strong>kat maliklerinin 2/3 çoğunluğunun</strong> olumlu oyu aranır. Riskli yapı tespitinde ise Afad veya lisanslı kurum raporunun ardından idari süreç başlar; yönetimimiz bu süreçte teknik ve hukuki danışmanlık sağlar.</p>', category: 'Hukuki Süreçler' },
  { question: 'Kat malikleri kurulu kararlarına nasıl itiraz edilir?', answer: '<p>Alınan karara katılmayan kat maliki, kararın tebliğinden itibaren <strong>3 ay</strong> içinde Sulh Hukuk Mahkemesi\'ne iptal davası açabilir. İtirazda usul hatası (toplantı çağrısı eksikliği, nisap hatası) veya esasa ilişkin hukuka aykırılık ileri sürülebilir.</p>', category: 'Hukuki Süreçler' },
  { question: 'Yönetim planı değişikliği için ne gereklidir?', answer: '<p>Yönetim planı değişikliği için <strong>tüm kat maliklerinin beşte dördünün (4/5) yazılı onayı</strong> gerekmektedir (KMK m. 28). Değişiklikler noter huzurunda imzalanarak tapu siciline tescil ettirilir. Yönetimimiz taslak hazırlığı ve noter süreçlerinde tam destek sağlar.</p>', category: 'Hukuki Süreçler' },

  // TESİS YÖNETİMİ (7 yeni)
  { question: 'Tesis yönetimi ile apartman yönetimi arasındaki fark nedir?', answer: '<p><strong>Apartman yönetimi</strong> ağırlıklı olarak aidat takibi, kat malikleri kurulu ve temel ortak alan işletmesiyle sınırlıdır. <strong>Tesis yönetimi</strong> ise daha geniş kapsamda; teknik altyapı, güvenlik, temizlik, peyzaj, enerji yönetimi ve tedarikçi koordinasyonunu entegre olarak yönetir. Büyük ölçekli ve çok kullanımlı yapılar için tesis yönetimi tercih edilir.</p>', category: 'Tesis Yönetimi' },
  { question: 'Tesis yönetiminde hangi raporlar düzenleniyor?', answer: '<p>Aylık raporlarımızda şu başlıklar yer alır: teknik bakım ve arıza tutanakları, temizlik hizmet kayıtları, güvenlik olayları, enerji ve su tüketim analizleri, tedarikçi fatura özeti ve aidat tahsilat raporu. Tüm raporlar yönetim panelinizden anlık erişime açıktır.</p>', category: 'Tesis Yönetimi' },
  { question: 'Tesis yönetimi yazılımınız nasıl çalışıyor?', answer: '<p>Alo Yönetim\'in dijital platformu web ve mobil olarak erişilebilir; arıza bildirimi, ödeme takibi, duyurular ve belge yönetimi tek panel üzerinden yönetilir. Yöneticiler için anlık raporlama, kat malikleri için şeffaf harcama takibi sunulur. Entegrasyon API\'si mevcut ERP sistemlerinizle bağlantı kurulmasına imkân tanır.</p>', category: 'Tesis Yönetimi' },
  { question: 'Tesis yönetimi sözleşmesi kaç yıllık yapılır?', answer: '<p>Standart sözleşme süresi <strong>1 yıldır</strong> ve kat malikleri kurulu kararıyla yenilenir. Büyük tesisler için 2–3 yıllık çoklu dönem sözleşmeleri uygulanabilir; bu durumda yıllık değerlendirme klozuyla maliyet güvencesi sağlanır. Sözleşme iptali 60 gün önceden yazılı bildirimle mümkündür.</p>', category: 'Tesis Yönetimi' },
  { question: 'Enerji verimliliği konusunda ne gibi çalışmalar yapıyorsunuz?', answer: '<p>Enerji denetim raporlarımızda ortak alan aydınlatma (LED dönüşümü), asansör enerji geri kazanımı, ısıtma–soğutma sistem optimizasyonu ve güneş enerjisi fizibilite analizleri sunulur. Uygulanan tasarruf önlemleri genellikle <strong>yatırım maliyetini 18–36 ayda</strong> geri kazandırır.</p>', category: 'Tesis Yönetimi' },
  { question: 'AVM ve ticari tesis yönetimi için özel hizmetleriniz var mı?', answer: '<p>Evet. Ticari tesis yönetiminde ortak alan marka kimliği, kiracı koordinasyonu, ziyaretçi trafiği analizi ve bakım planlaması ticari SLA standartlarına göre ayrıca kurgulanır. Sözleşme bazında yönetici ataması, operasyonel KPI takibi ve periyodik denetim raporlaması sunulur.</p>', category: 'Tesis Yönetimi' },
  { question: 'Tesis yönetiminde acil durum planı nasıl hazırlanıyor?', answer: '<p>Her tesis için özelleştirilmiş <strong>Acil Durum Eylem Planı (ADEP)</strong> hazırlanır. Plan; yangın, deprem, su baskını ve güvenlik ihlali senaryolarını, tahliye rotalarını, sorumlu kişi iletişim ağacını ve ilk müdahale protokollerini içerir. Yılda bir kez tatbikat düzenlenerek güncelliği korunur.</p>', category: 'Tesis Yönetimi' },

  // TESİS VE SİTE YÖNETİMİ (6 yeni)
  { question: 'Toplu yapı ve site yönetimi ne anlama geliyor?', answer: '<p>Toplu yapı yönetimi (KMK m. 66–73), birden fazla yapı veya bloktan oluşan sitelerde hem <strong>blok yönetimi</strong> (her blok için ayrı kat malikleri kurulu) hem de <strong>toplu yapı temsilciler kurulu</strong> olmak üzere çift kademeli bir yapıyı kapsar. Yönetimimiz bu iki katmanı entegre olarak koordine eder.</p>', category: 'Tesis ve Site Yönetimi' },
  { question: 'Site yönetim şirketi seçiminde nelere dikkat edilmeli?', answer: '<p>Seçim kriterlerinin başında şunlar gelir: <strong>lisanslı ve sigortası tam</strong> firma olması, referans sitelere erişim, dijital raporlama altyapısı, 7/24 teknik destek garantisi, şeffaf aidat tahsilat modeli ve yerel deneyim. Fiyatın yanı sıra hizmet kapsam belgesi mutlaka karşılaştırılmalıdır.</p>', category: 'Tesis ve Site Yönetimi' },
  { question: 'Yeni yapılan sitelerde yönetim süreci nasıl başlatılır?', answer: '<p>İskân alındıktan sonra ilk <strong>kat malikleri kurulu</strong> toplanır; yönetici ve denetçi seçilir, yönetim planı tescil ettirilir. Yönetimimiz geçiş sürecinde müteahhit devir teslim tutanağı, teknik altyapı envanteri ve bütçe oluşturma aşamalarında tam destek sağlar.</p>', category: 'Tesis ve Site Yönetimi' },
  { question: 'Yönetim şirketi değişikliğinde süreç nasıl işliyor?', answer: '<p>Mevcut yönetimden devre geçiş; kasayı, belge arşivini, tedarikçi sözleşmelerini ve personel bilgilerini kapsar. Alo Yönetim olarak sorunsuz geçiş için <strong>standart devir protokolümüzü</strong> uyguluyoruz: belge sayımı, kasa teslimi, banka vekaletleri ve tedarikçi bildirimleri sistematik biçimde yürütülür.</p>', category: 'Tesis ve Site Yönetimi' },
  { question: 'Büyük sitelerde blok yöneticileri ile nasıl koordinasyon sağlanır?', answer: '<p>Her blok için atanan <strong>blok koordinatörümüz</strong> haftalık olarak blok temsilcisiyle düzenli toplantı yapar. Kararlar merkezi yönetim paneline işlenir ve toplu yapı temsilciler kuruluna raporlanır. Çok bloklu sitelerde tek iletişim noktası politikamız koordinasyon karışıklığını önler.</p>', category: 'Tesis ve Site Yönetimi' },
  { question: 'Rezidans ve apart otel yönetiminde farklı bir yaklaşım gerekiyor mu?', answer: '<p>Evet. Rezidans yönetiminde sabit konut kat malikleri dışında kısa süreli kiracı yönetimi, ortak alan premium hizmet standartları ve concierge benzeri ek hizmetler devreye girer. <strong>Karma kullanım</strong> yapılarda otel operatörü ile site yönetimi arasındaki sınırların net belirlenmesi kritik önem taşır; bu konuda özel danışmanlık hizmeti sunuyoruz.</p>', category: 'Tesis ve Site Yönetimi' },

  // GÜVENLİK HİZMETLERİ (7 yeni)
  { question: '5188 sayılı Kanun kapsamında özel güvenlik görevlileri neler yapabilir?', answer: '<p>5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca özel güvenlik görevlileri; <strong>yasal yetkiler dahilinde</strong> üst arama (rıza ile), araç kontrolü, durdurma ve kimlik sorma yetkilerine sahiptir. Gözaltı yetkisi bulunmaz; suçüstü durumda kişiyi teslim alıp polise bildirir. Tüm personelimiz 5188 lisanslıdır.</p>', category: 'Güvenlik Hizmetleri' },
  { question: 'Kamera sistemi kayıtları KVKK açısından nasıl yönetiliyor?', answer: '<p>CCTV sistemlerimiz KVKK ve kişisel verilerin korunması mevzuatına uygun kurulur. Kamera yerleşim planı kat malikleri kurulunca onaylanır, ortak alanlara aydınlatma yükümlülüğü kapsamında uyarı levhası asılır. Kayıtlar <strong>30 gün</strong> saklanır ve yalnızca yetkililere veya resmi talep halinde adli makamlara sunulur.</p>', category: 'Güvenlik Hizmetleri' },
  { question: 'Rezidanslarda ziyaretçi yönetimi nasıl yapılıyor?', answer: '<p>Standart ziyaretçi prosedürümüzde; resepsiyonda kimlik kaydı, sakin onayı (interkom veya mobil bildirim) ve ziyaretçi kartı/QR kod verilmesi adımları uygulanır. VIP sakinler için ön kayıtlı ziyaretçi listesi tanımlanabilir. Tüm kayıtlar 90 gün boyunca dijital arşivde saklanır.</p>', category: 'Güvenlik Hizmetleri' },
  { question: 'Güvenlik personeli eğitimleri nasıl gerçekleştiriliyor?', answer: '<p>Personelimiz işe alım sürecinde 5188 temel eğitiminin yanı sıra <strong>yangın müdahale, ilk yardım, çatışma yönetimi ve müşteri iletişimi</strong> eğitimlerinden geçer. Yılda 2 kez periyodik yenileme eğitimi verilir; performans değerlendirmesi 6 ayda bir yapılır ve sonuçlar yönetim raporuna eklenir.</p>', category: 'Güvenlik Hizmetleri' },
  { question: 'Acil durumlarda güvenlik görevlisinin rolü ne?', answer: '<p>Acil durumda güvenlik görevlisi: 112/110 hattını arayarak ekipleri yönlendirir, tahliye planına göre sakinlere rehberlik eder, güvenli bölgeye erişimi kontrol eder ve müdahale ekiplerine geçiş kolaylığı sağlar. Her tesisimizde <strong>Acil Durum Eylem Planı</strong> asılıdır ve personel yılda bir tatbikat yapar.</p>', category: 'Güvenlik Hizmetleri' },
  { question: 'Güvenlik personeli değişiminde kapsam sürekliliği nasıl sağlanıyor?', answer: '<p>Personel rotasyonu öncesinde gelen–giden arasında <strong>yazılı devir tutanağı</strong> düzenlenir; güncel olay raporları, ziyaretçi kayıtları ve teknik sistem durumu aktarılır. Kritik pozisyonlar için yetersayı garantisi ile hiçbir nöbet açıkta bırakılmaz; sorumlu süpervizörümüz 24 saat erişilebilirdir.</p>', category: 'Güvenlik Hizmetleri' },
  { question: 'Sadece gece güvenlik hizmeti alabilir miyiz?', answer: '<p>Evet. Güvenlik paketlerimiz esnek kurgulanmıştır: <strong>sadece gece (22:00–06:00), tam gün veya 24 saat kesintisiz</strong> seçenekleri mevcuttur. Yoğun sezon veya özel etkinlik dönemlerinde geçici takviye personel de temin edilebilir. İhtiyacınıza göre teklif için yönetiminize başvurabilirsiniz.</p>', category: 'Güvenlik Hizmetleri' },

  // TEMİZLİK VE HİJYEN (7 yeni)
  { question: 'Ortak alan temizliği günde kaç kez yapılıyor?', answer: '<p>Standart programımızda giriş holü ve asansörler <strong>günde 2 kez</strong> (sabah ve öğleden sonra), merdiven boşlukları günde 1 kez temizlenir. Haftalık döngüde otopark, bodrum ve çatı katı kapsamlıca yıkanır. Özel günlerde veya kirlilik artışında frekans artırılır.</p>', category: 'Temizlik ve Hijyen' },
  { question: 'Kullanılan temizlik ürünleri sağlık açısından güvenli mi?', answer: '<p>Kullandığımız tüm ürünler Türk Standartları ve AB Biyosidal Yönetmeliği onaylı, insan ve evcil hayvan sağlığına duyarlı formülasyonlardır. Kokusuz ve alerjik olmayan ürünler tercih edilir; hassas sakinlerin talepleri doğrultusunda vegan–organik seçenekler sunulur.</p>', category: 'Temizlik ve Hijyen' },
  { question: 'Asansör kabin temizliği ve dezenfeksiyonu nasıl yapılıyor?', answer: '<p>Asansör kabinleri günde 2 kez nemli silme ve yüzey dezenfeksiyonuyla temizlenir, paslanmaz çelik yüzeyler parlatılır, zemin kaydırmaz paspasları yıkanır. Pandemi dönemlerinde veya talep halinde yüksek temas noktalı buton ve korkuluklar saatte 1 frekansa alınabilir.</p>', category: 'Temizlik ve Hijyen' },
  { question: 'Çöp alanları ve konteyner temizliği nasıl yönetiliyor?', answer: '<p>Çöp odası ve konteynerler haftada en az 2 kez yıkanır ve dezenfekte edilir; kış mevsiminde aylık ilaçlama yapılır. Geri dönüşüm ayrıştırması için renk kodlu konteyner sağlanır. Çöp taşınma saatlerinde personelimiz konteyner yerleşimini denetler ve bölge belediyesiyle koordinasyonu yürütür.</p>', category: 'Temizlik ve Hijyen' },
  { question: 'Profesyonel yüzey temizliği (taş, mermer, seramik) hizmetinize dahil mi?', answer: '<p>Giriş holü mermer ve granit zeminlerin <strong>kristalizasyon, cila ve leke çıkarma</strong> işlemleri yıllık bakım programına dahil edilebilir. Derin temizlik için endüstriyel otomat makineler kullanılır; bu işlemler aylık rutin temizlikten ayrı olarak planlanır ve ek maliyet saydamlıkla bildirilir.</p>', category: 'Temizlik ve Hijyen' },
  { question: 'Temizlik personelinin eğitim ve güvenilirliği nasıl sağlanıyor?', answer: '<p>Tüm personelimiz işe alım öncesinde sabıka kaydı ve referans kontrolünden geçer, SGK kaydı tam olarak yapılır. İşe başlamadan önce hijyen, kimyasal güvenlik ve iş güvenliği eğitimleri verilir. Performans denetimi ayda bir sürpriz ziyaret ve sakin anketiyle ölçülür; düşük puanlı personel programa alınır.</p>', category: 'Temizlik ve Hijyen' },
  { question: 'Yüzme sezonu öncesi derin temizlik hizmeti sunuyor musunuz?', answer: '<p>Evet. Nisan–Mayıs döneminde talep üzerine <strong>kış sonu derin temizlik paketi</strong> sunulur: merdivenler ve koridorlar basınçlı yıkama ile temizlenir, otopark zemini kimyasal yıkama ile kirden arındırılır, depo ve teknik hacimlerin toz ve örümcek ağı temizliği yapılır. Bu hizmet yıllık bakım paketine ek olarak uygulanabilir.</p>', category: 'Temizlik ve Hijyen' },
];

async function translateText(text: string, targetLang: string): Promise<string | null> {
  if (!text) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map((item: any) => item[0]).join('');
  } catch {
    return null;
  }
}

async function main() {
  // ─── 1. YENİ SORULARI EKLE ──────────────────────────────────────────────────
  console.log(`\n📝 ${newFaqs.length} yeni soru ekleniyor...`);
  let addedCount = 0;

  for (const faq of newFaqs) {
    // Duplike kontrolü
    const existing = await prisma.faq.findFirst({ where: { question: faq.question } });
    if (existing) { console.log(`  ⏭ Zaten var: ${faq.question.substring(0, 50)}`); continue; }

    const created = await prisma.faq.create({
      data: { question: faq.question, answer: faq.answer, category: faq.category, order: 0 },
    });

    // Çeviri
    const [qEn, aEn, qRu, aRu, qAr, aAr] = await Promise.all([
      translateText(faq.question, 'en'),
      translateText(faq.answer, 'en'),
      translateText(faq.question, 'ru'),
      translateText(faq.answer, 'ru'),
      translateText(faq.question, 'ar'),
      translateText(faq.answer, 'ar'),
    ]);

    await prisma.faq.update({
      where: { id: created.id },
      data: {
        question_en: qEn ?? undefined,
        answer_en: aEn ?? undefined,
        question_ru: qRu ?? undefined,
        answer_ru: aRu ?? undefined,
        question_ar: qAr ?? undefined,
        answer_ar: aAr ?? undefined,
      },
    });

    addedCount++;
    if (addedCount % 10 === 0) console.log(`  ✅ ${addedCount}/${newFaqs.length} soru eklendi`);
    await new Promise(r => setTimeout(r, 200)); // rate limit
  }
  console.log(`✅ Toplam ${addedCount} yeni soru eklendi.`);

  // ─── 2. İLÇE CEVAPLARINI KİŞİSELLEŞTİR ──────────────────────────────────────
  console.log(`\n🗺  İlçe cevapları kişiselleştiriliyor...`);
  const districtFaqs = await prisma.faq.findMany({
    where: { question: { contains: 'ilçesinde' } },
  });
  console.log(`  Toplam ${districtFaqs.length} ilçe sorusu bulundu.`);

  let updatedCount = 0;
  for (const faq of districtFaqs) {
    const match = faq.question.match(/^(\w+(?:ü|ı|i|ö|ş|ç|ğ|\w)*)\s+ilçesinde\s+(.+?)\s+hizmeti/i);
    if (!match) continue;
    const district = match[1];
    const service = match[2];
    if (!districtProfiles[district]) continue;

    const newAnswer = buildDistrictAnswer(district, service);
    if (newAnswer === faq.answer) continue;

    // Çeviriler
    const [aEn, aRu, aAr] = await Promise.all([
      translateText(newAnswer, 'en'),
      translateText(newAnswer, 'ru'),
      translateText(newAnswer, 'ar'),
    ]);

    await prisma.faq.update({
      where: { id: faq.id },
      data: {
        answer: newAnswer,
        answer_en: aEn ?? faq.answer_en ?? undefined,
        answer_ru: aRu ?? faq.answer_ru ?? undefined,
        answer_ar: aAr ?? faq.answer_ar ?? undefined,
      },
    });

    updatedCount++;
    if (updatedCount % 20 === 0) console.log(`  🗺  ${updatedCount}/${districtFaqs.length} ilçe güncellendi`);
    await new Promise(r => setTimeout(r, 150));
  }
  console.log(`✅ ${updatedCount} ilçe sorusu kişiselleştirildi.`);

  // ─── ÖZET ─────────────────────────────────────────────────────────────────────
  const total = await prisma.faq.count();
  console.log(`\n🎉 Tamamlandı! Toplam FAQ: ${total}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

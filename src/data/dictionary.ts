export type Term = {
  term: string;
  definition: string;
  /** İlgili hizmet/sayfa — kontekstuel iç link (Faz 78/97). */
  link?: { href: string; label: string };
  /** Wikipedia veya mevzuat dış otorite köprüsü (Faz 89). */
  sameAs?: string;
};

// Sektör terimleri — kat malikleri ve site yöneticileri için net tanımlar.
export const TERMS: Term[] = [
  {
    term: 'Aidat',
    definition:
      'Bir site veya apartmanda ortak giderlerin (temizlik, güvenlik, asansör bakımı, elektrik) kat malikleri arasında arsa payı veya eşit bölüşüm esasına göre paylaştırılan aylık katkı payıdır. Kat Mülkiyeti Kanunu m.20 gereğince ödenmesi zorunludur.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Aidat icra takibi' },
    sameAs: 'https://tr.wikipedia.org/wiki/Aidat',
  },
  {
    term: 'Kat Mülkiyeti Kanunu (KMK)',
    definition:
      '634 sayılı Kat Mülkiyeti Kanunu, birden çok bağımsız bölümü olan taşınmazlarda maliklerin hak ve yükümlülüklerini, yönetim biçimini ve ortak yer kullanımını düzenleyen temel mevzuattır.',
    sameAs: 'https://tr.wikipedia.org/wiki/Kat_m%C3%BClkiyeti',
  },
  {
    term: 'Demirbaş',
    definition:
      'Sitenin ortak kullanımına ait, uzun ömürlü ve envantere kayıtlı taşınır mallardır (jeneratör, hidrofor, güvenlik kamerası, bahçe ekipmanı). Yönetim değişiminde tutanakla devredilir.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Teknik bakım' },
  },
  {
    term: 'İşletme Projesi',
    definition:
      'Bir yıllık tahmini gelir ve giderleri, aidat tutarlarını ve avans miktarlarını gösteren bütçe planıdır. Yönetici tarafından hazırlanır ve kat malikleri kuruluna sunulur.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'Tesis yönetimi' },
    sameAs: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTur=1&MevzuatTertip=5',
  },
  {
    term: '5188 Sayılı Kanun',
    definition:
      'Özel Güvenlik Hizmetlerine Dair Kanun; sitelerde ve tesislerde görev yapacak özel güvenlik görevlilerinin eğitim, kimlik ve çalışma koşullarını düzenler. Kimliksiz güvenlik istihdamı yasaktır.',
    link: { href: '/guvenlik-akademisi', label: 'Güvenlik akademisi' },
    sameAs: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5188&MevzuatTur=1&MevzuatTertip=5',
  },
  {
    term: 'Kat Malikleri Kurulu',
    definition:
      'Bağımsız bölüm maliklerinin tamamından oluşan, sitenin en yetkili karar organıdır. Yöneticiyi seçer, işletme projesini ve yönetim planı değişikliklerini onaylar.',
    sameAs: 'https://tr.wikipedia.org/wiki/Kat_m%C3%BClkiyeti',
  },
  {
    term: 'Yönetim Planı',
    definition:
      'Sitenin nasıl yönetileceğini belirleyen, tüm kat maliklerini bağlayan sözleşme niteliğindeki belgedir. Tapuya şerh edilir ve değiştirilmesi için nitelikli çoğunluk gerekir.',
    sameAs: 'https://tr.wikipedia.org/wiki/Kat_m%C3%BClkiyeti',
  },
  {
    term: 'Ortak Alan',
    definition:
      'Bağımsız bölümler dışında kalan, tüm maliklerin ortak kullanımındaki yerlerdir (merdiven, asansör, çatı, bahçe, otopark, sığınak). Ortak alan giderleri aidata yansır.',
    link: { href: '/hizmetler/temizlik-ve-hijyen', label: 'Ortak alan temizliği' },
    sameAs: 'https://tr.wikipedia.org/wiki/Kat_m%C3%BClkiyeti',
  },
  {
    term: 'Kompanzasyon (Reaktif Güç)',
    definition:
      'Ortak alan elektrik tesisatında reaktif enerji tüketiminin panolarla dengelenmesidir. Düzenli bakım, dağıtım şirketinin uyguladığı reaktif ceza faturalarını önler.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Teknik bakım' },
    sameAs: 'https://tr.wikipedia.org/wiki/Kompanzasyon',
  },
  {
    term: 'Denetçi',
    definition:
      'Kat malikleri kurulunca seçilen, yönetimin gelir-gider hesaplarını ve işlemlerini denetleyen kişi veya kuruldur. Şeffaf yönetimin temel güvencesidir.',
  },
  {
    term: 'Özel Güvenlik İzni (ÖGİ)',
    definition:
      '5188 sayılı kanun uyarınca apartman ve sitelerde özel güvenlik görevlisi istihdam edebilmek için İl Valiliği Özel Güvenlik Komisyonu tarafından verilen resmi faaliyet ve çalışma izin belgesidir.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: 'Güvenlik yönetimi' },
  },
  {
    term: 'Özel Güvenlik Kimlik Kartı',
    definition:
      'Emniyet Genel Müdürlüğü ve Valilik onaylı, adli sicil araştırması ve 120 saatlik temel güvenlik eğitimini tamamlamış kişilere verilen resmi 5188 çalışma lisansıdır. Kimliksiz personel çalıştırmak kanunen yasaktır.',
    link: { href: '/guvenlik-akademisi', label: 'Güvenlik akademisi' },
  },
  {
    term: 'Plaka Tanıma Sistemi (PTS)',
    definition:
      'Site ve otopark girişlerinde araç plakalarını yapay zeka algoritmalarıyla milisaniyeler içinde okuyup kayıtlı sakinlerin bariyerini otomatik açan, yabancı araçları engelleyen ve misafir süresi takip eden akıllı kamera sistemidir.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: 'Akıllı güvenlik teknolojileri' },
  },
  {
    term: 'RFID Devriye Tur Kontrol Sistemi',
    definition:
      'Güvenlik görevlilerinin site sınırları, yangın merdivenleri, otopark ve sığınak gibi kritik kontrol noktalarını belirlenen saatlerde elektronik kalemle okuttuğu, anlık GPS ve zaman damgalı nöbet denetim teknolojisidir.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: 'Güvenlik denetimi' },
  },
  {
    term: 'Özel Güvenlik Zorunlu Mali Sorumluluk Sigortası',
    definition:
      '5188 sayılı Kanun Madde 21 gereğince, özel güvenlik görevlilerinin üçüncü şahıslara ve site sakinlerine verebilecekleri zararları teminat altına alan yasal zorunlu sigorta poliçesidir.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: '5188 yasal sigorta' },
  },
  {
    term: 'Tesis Yönetimi (Entegre Tesis Yönetimi)',
    definition:
      'Bir yapının ya da sitenin fiziki, teknik, güvenlik, temizlik, peyzaj ve bütçe/muhasebe operasyonlarının tek bir kurumsal merkezden ve kalite standartlarında yönetilmesini sağlayan profesyonel yönetim disiplinidir.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'Tesis yönetimi' },
  },
  {
    term: 'Hizmet Seviyesi Taahhüdü (SLA)',
    definition:
      'Tesis yönetim şirketi ile site yönetimi arasında imzalanan, arıza müdahale süresi (örn. 45 dk), temizlik frekansı ve güvenlik devriye sayılarını yasal güvenceye bağlayan resmi performans sözleşmesidir.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'Kurumsal SLA taahhütleri' },
  },
  {
    term: 'Önleyici Bakım (Preventive Maintenance)',
    definition:
      'Asansör, jeneratör, hidrofor ve yangın sistemlerinde arıza oluşmadan önce yapılan periyodik kontroller ve parça yenilemeleridir. Sitenin büyük onarım maliyetlerini %40\'a kadar düşürür.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Önleyici teknik bakım' },
  },
  {
    term: 'Bina Otomasyon Sistemi (BMS)',
    definition:
      'Aydınlatma, ısıtma-soğutma, havalandırma ve su pompalarını tek ekrandan sensörlerle izleyip yöneten, enerji israfını ve elektrik faturasını minimuma indiren akıllı bina yönetim altyapısıdır.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Bina otomasyonu' },
  },
  {
    term: 'Demirbaş Avans Fonu',
    definition:
      'KMK uyarınca kat maliklerinden çatı onarımı, asansör revizyonu veya dış cephe boyası gibi büyük sermaye yatırımları için toplanan ve cari aidat hesabından ayrı tutulan yedek fondur.',
    link: { href: '/hizmetler/aidat-takibi', label: 'Demirbaş fonu yönetimi' },
  },
  {
    term: 'TSE HYB 12850 Belgesi',
    definition:
      'Türk Standardları Enstitüsü tarafından verilen, tesis ve bina yönetim firmalarının idari, teknik ve personel yeterliliğe sahip olduğunu kanıtlayan resmi Hizmet Yeterlilik Belgesi\'dir.',
    link: { href: '/kurumsal/kalite-belgelerimiz', label: 'TSE kalite belgelerimiz' },
  },
  {
    term: 'Merkezi Isı Pay Ölçer',
    definition:
      'Merkezi ısıtma sistemine sahip binalarda her bağımsız bölümün harcadığı gerçek ısı enerjisini ölçerek doğalgaz faturasının adil ve yasal kurallara göre dairelere paylaştırılmasını sağlayan cihazdır.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Isı pay ölçer ve faturalandırma' },
  },
  {
    term: 'Mali İbra',
    definition:
      'Kat Malikleri Kurulu olağan toplantısında, yöneticinin geçmiş dönem gelir-gider hesaplarının ve işletme faaliyetlerinin maliklerce oylanarak hukuken ve mali açıdan aklanması işlemidir.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Mali ibra ve genel kurul' },
  },
  {
    term: 'Site İşletme Bütçesi',
    definition:
      'KMK m.37 uyarınca sitenin 1 yıllık güvenlik, temizlik, personel, enerji ve teknik bakım giderlerini hesaplayan ve aidat tutarlarını belirleyen yasal mali projeksiyon belgesidir.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'İşletme bütçesi hazırlama' },
  },
  {
    term: 'Yeşil Tesis & Enerji Verimliliği',
    definition:
      'Site ortak alanlarında LED aydınlatma, çatı GES güneş enerjisi panelleri, yağmur suyu hasadı ve kompanzasyon takibiyle karbon ayak izini ve elektrik maliyetlerini düşüren çevreci yönetim modelidir.',
    link: { href: '/kurumsal/surdurulebilirlik', label: 'Sürdürülebilir tesis yönetimi' },
  },
  {
    term: 'ISO 41001 Tesis Yönetim Sistemi',
    definition:
      'Tesis yönetimi disiplini için uluslararası akreditasyon standardıdır. Binaların fiziki, teknik ve idari süreçlerinin kurumsal kalite, sürdürülebilirlik ve maliyet tasarrufu çerçevesinde yönetildiğini belgeler.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'ISO 41001 tesis yönetimi' },
  },
  {
    term: 'Kat Mülkiyeti Kanunu Madde 37 (İşletme Projesi)',
    definition:
      'KMK 37. maddesi uyarınca yöneticinin 1 yıllık tahmini gelir-gider bütçesini ve daire başı aidat avanslarını belirleyerek kat maliklerine resmi tebliğ etmesini zorunlu kılan yasal hükümdür.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'İşletme projesi hukuku' },
  },
  {
    term: 'Kat Mülkiyeti Kanunu Madde 20 (Aidat Borcu)',
    definition:
      'Kat maliklerinin ortak yer veya tesisler üzerindeki kullanma hakkından vazgeçmek veya kendi bağımsız bölümünün durumundan dolayı yararlanmaya lüzum veya ihtiyaç bulunmadığını ileri sürmek suretiyle aidat ödemekten kaçınamayacağını hükme bağlayan emredici kanun maddesidir.',
    link: { href: '/hizmetler/aidat-takibi', label: 'Aidat borcu ve icra takibi' },
  },
  {
    term: 'Yeşil Etiket (Asansör)',
    definition:
      'A Tipi Muayene Kuruluşları (MMO veya TSE) tarafından yapılan yıllık periyodik kontroller sonucunda can ve mal güvenliği açısından kusursuz çalışan asansörlere verilen resmi uygunluk etiketidir.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Asansör yeşil etiket bakımı' },
  },
  {
    term: 'Enerji Kimlik Belgesi (EKB)',
    definition:
      'Binalarda enerjinin ve enerji kaynaklarının verimli kullanılmasını, enerji israfının önlenmesini ve çevrenin korunmasını gösteren; asgari C sınıfı olması hedeflenen resmi enerji performans karnesidir.',
    link: { href: '/kurumsal/surdurulebilirlik', label: 'Enerji kimlik belgesi ve tasarruf' },
  },
  {
    term: 'Yangın Söndürme ve Duman Tahliye Sistemi',
    definition:
      'Binaların Yangından Korunması Hakkında Yönetmelik gereğince sitelerde ve otoparklarda bulunması zorunlu olan sprinkler, yangın hidroforu, duman damperleri ve yangın algılama otomasyonudur.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Yangın güvenlik sistemleri' },
  },
  {
    term: 'Arsa Payı',
    definition:
      'Kat mülkiyetinde her bir bağımsız bölüme, yapının inşa edildiği arsa üzerinde tahsis edilen mülkiyet payıdır. Ortak giderlerin paylaşımında ve oy hakkı nisabında temel kriterdir.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Arsa payı hukuku' },
  },
  {
    term: 'Kat İrtifakı',
    definition:
      'Bir arsa üzerinde yapılmakta olan veya ileride yapılacak binanın bağımsız bölümleri için, arsa payına bağlı olarak kurulan irtifak hakkıdır. İskan alındıktan sonra kat mülkiyetine çevrilir.',
  },
  {
    term: 'İskan (Yapı Kullanma İzin Belgesi)',
    definition:
      'Belediye tarafından inşaatı tamamlanan binanın projesine, fen ve sağlık kurallarına uygun olduğunu onaylayan resmi belgedir. İskansız binalarda şantiye tarifesi elektrik-su uygulanır.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'İskan ve tesis yönetimi' },
  },
  {
    term: 'Su Deposu Dezenfeksiyonu ve Analizi',
    definition:
      'Sitelerdeki içme ve kullanma suyu depolarının Sağlık Bakanlığı onaylı biyosidal ürünlerle 6 ayda bir temizlenmesi, klorlanması ve mikrobiyolojik laboratuvar testlerinin yapılması yasal zorunluluğudur.',
    link: { href: '/hizmetler/temizlik-ve-hijyen', label: 'Su deposu temizliği' },
  },
  {
    term: 'Havuz Bakımı ve Kimyasal Operasyonu',
    definition:
      'Yüzme havuzlarında pH, serbest klor, bağlı klor ve siyanürik asit değerlerinin günlük ölçülerek Sağlık Bakanlığı normlarında tutulması, filtrasyon ters yıkama ve dip süpürme operasyonudur.',
    link: { href: '/hizmetler/temizlik-ve-hijyen', label: 'Havuz hijyeni ve bakımı' },
  },
  {
    term: 'Peyzaj ve Otomatik Sulama Yönetimi',
    definition:
      'Site bahçe alanlarının mevsimlik budama, çim biçme, gübreleme, ilaçlama ve toprak nem sensörlü akıllı sulama sistemleriyle su tasarruflu olarak bakımıdır.',
    link: { href: '/hizmetler/temizlik-ve-hijyen', label: 'Peyzaj ve bahçe bakımı' },
  },
  {
    term: 'Vektör ve Haşere İlaçlama (Biyosidal)',
    definition:
      'Ortak alanlar, sığınaklar, kazan daireleri ve çöp şaftlarında kemirgen ve böceklere karşı Sağlık Bakanlığı ruhsatlı mesul müdür denetiminde yapılan periyodik ilaçlama işlemidir.',
    link: { href: '/hizmetler/temizlik-ve-hijyen', label: 'Bina ve site ilaçlama' },
  },
  {
    term: 'Jeneratör Periyodik Bakımı ve Yük Testi',
    definition:
      'Elektrik kesintilerinde asansör, hidrofor, yangın pompaları ve çevre aydınlatmayı besleyen jeneratörlerin aylık filtre, yağ, akü ve transfer panosu yük denetimleridir.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Jeneratör teknik servis' },
  },
  {
    term: 'Hidrofor ve Basınç Dengeleme Sistemi',
    definition:
      'Yüksek katlı bloklarda su basıncını sabit tutan, frekans kontrollü invertörlü pompalar ve membranlı genleşme tanklarından oluşan sıhhi tesisat mekanizmasıdır.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Hidrofor bakımı' },
  },
  {
    term: 'CCTV Kamera Güvenlik Sistemi',
    definition:
      'Site çevre sınırları, blok girişleri, otopark ve çocuk oyun alanlarını 7/24 yüksek çözünürlükle kaydeden, KVKK mevzuatına uygun kayıt saklama süreli kapalı devre kamera ağıdır.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: 'CCTV güvenlik altyapısı' },
  },
  {
    term: 'Nizamiye Güvenlik Protokolü',
    definition:
      'Site ana giriş kapısında misafir, kurye ve teknik servis girişlerinin kimlik teyidi, sakin onayı ve geçiş kaydıyla kontrol altına alındığı 5188 güvenlik prosedürüdür.',
    link: { href: '/hizmetler/guvenlik-yonetimi', label: 'Nizamiye güvenlik yönetimi' },
  },
  {
    term: 'Kat İrtifakından Kat Mülkiyetine Geçiş',
    definition:
      'Yapı kullanma izin belgesi (iskan) alınan binalarda, tapu müdürlüğüne başvurularak her bağımsız bölümün müstakil kat mülkiyeti tapusuna dönüştürülmesi hukuki sürecidir.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Tapu ve mülkiyet hukuku' },
  },
  {
    term: 'İlamsız İcra Takibi (Aidat Borcu)',
    definition:
      'KMK m.20 ve İcra İflas Kanunu uyarınca, borçlu kat malikine mahkeme ilamı olmaksızın İcra Dairesi kanalıyla Ödeme Emri (Örnek No: 7) gönderilmesi sürecidir.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Aidat icra takibi' },
  },
  {
    term: 'Gecikme Tazminatı (%5 Yasal Faiz)',
    definition:
      '634 sayılı KMK 20. maddesi gereğince, ödeme vadesi geçen aidat ve ortak gider avans borçlarına aylık yüzde 5 oranında işletilen yasal cezai faizdir.',
    link: { href: '/hizmetler/aidat-takibi', label: 'Gecikme faizi hesaplama' },
  },
  {
    term: 'Olağan ve Olağanüstü Genel Kurul',
    definition:
      'Yönetim planında belirtilen tarihte yılda en az bir kez yapılan toplantı olağan; yönetici, denetçi veya maliklerin 1/3 istemiyle acil durumlarda toplanan kurul olağanüstüdür.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Genel kurul organizasyonu' },
  },
  {
    term: 'Hazirun Cetveli',
    definition:
      'Kat Malikleri Kurulu toplantısına bizzat katılan veya vekaletname ile temsil edilen maliklerin ad-soyad, daire no, arsa payı ve imzalarını içeren resmi yoklama tutanağıdır.',
  },
  {
    term: 'Toplu Yapı Yönetimi (KMK Ek Madde 69)',
    definition:
      'Birden çok parsel ve bloktan oluşan sitelerde blok kat malikleri kurulları ile tüm siteyi kapsayan Toplu Yapı Temsilciler Kurulu\'nun oluşturulduğu entegre yönetim modelidir.',
    link: { href: '/hizmetler/tesis-yonetimi', label: 'Toplu yapı ve site yönetimi' },
  },
  {
    term: 'Sığınak Yönetmeliği ve Alan Kullanımı',
    definition:
      'Sitelerin sığınak alanlarının sadece acil durumlar ve koruma amacıyla tahsis edilmesini, ticari depo veya şahsi otopark olarak kiralanamayacağını düzenleyen kamu mevzuatıdır.',
  },
  {
    term: 'Atık Yönetimi ve Sıfır Atık Belgesi',
    definition:
      'Sitelerde evsel atıklar, geri dönüştürülebilir ambalajlar, bitkisel atık yağlar ve elektronik atıkların Çevre Şehircilik Bakanlığı Sıfır Atık Yönetmeliği\'ne uygun olarak ayrıştırılmasıdır.',
    link: { href: '/kurumsal/surdurulebilirlik', label: 'Sıfır atık ve sürdürülebilirlik' },
  },
  {
    term: 'Asansör Kırmızı / Sarı / Mavi / Yeşil Etiket',
    definition:
      'Yıllık asansör muayenesinde; kırmızı: can güvenliği tehlikeli (mühürlenir), sarı: kusurlu, mavi: hafif kusurlu, yeşil: kusursuz ve güvenli çalıştığını gösteren resmi teknik durum etiketidir.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Asansör muayene ve etiket takibi' },
  },
  {
    term: 'Termal Kamera ile Enerji Kaçağı Tespiti',
    definition:
      'Binaların dış cephelerinde, elektrik panolarında ve mekanik tesisatta ısı kaçaklarını ve aşırı ısınan kablo bağlantılarını temassız kızılötesi kameralarla tespit etme yöntemidir.',
    link: { href: '/hizmetler/teknik-bakim', label: 'Termal enerji denetimi' },
  },
  {
    term: 'Yönetici İbra Edilmemesi (Adli Süreç)',
    definition:
      'Genel kurulda mali ve idari açıdan aklanmayan eski yöneticiye karşı Sulh Hukuk Mahkemesi nezdinde hesapların denetimi, usulsüz harcamaların tazmini ve dava açılması sürecidir.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Yönetici ibra davaları' },
  },
  {
    term: 'Ortak Alan Kiraya Verme (KMK m.45)',
    definition:
      'Çatı baz istasyonu, kapıcı dairesi veya otopark gibi ortak yerlerin üçüncü kişilere kiralanabilmesi için kat maliklerinin tamamının (%100 oybirliği) rızasının gerektiği yasal kuraldır.',
    link: { href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Ortak alan kiralama hukuku' },
  },
];

// Global statik objeyi mühürle (Faz 13)
Object.freeze(TERMS);

import { FACILITY_TERMS, type FacilityDictionaryTerm } from './facilityDictionaryData';
import { KMK_LAW_INDEX, type KmkArticleItem } from './kmkLawData';

export { FACILITY_TERMS, type FacilityDictionaryTerm } from './facilityDictionaryData';
export { KMK_LAW_INDEX, type KmkArticleItem } from './kmkLawData';

export function termToSlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// O(1) slug ve alfabetik harf indeks haritaları (Faz 7)
export const TERMS_BY_SLUG: Map<string, Term> = new Map(
  TERMS.map((t) => [termToSlug(t.term), t])
);

export const TERMS_BY_LETTER: Record<string, Term[]> = TERMS.reduce((acc, t) => {
  const firstChar = t.term.charAt(0).toLocaleUpperCase('tr-TR');
  if (!acc[firstChar]) acc[firstChar] = [];
  acc[firstChar].push(t);
  return acc;
}, {} as Record<string, Term[]>);

export function slugToTerm(slug: string): Term | undefined {
  return TERMS_BY_SLUG.get(slug);
}

export function getTermsByLetter(letter: string): Term[] {
  return TERMS_BY_LETTER[letter.toLocaleUpperCase('tr-TR')] || [];
}

/**
 * Birleşik sözlük külliyatı (Faz 22).
 * Genel terimler, tesis yönetimi standartları ve KMK kanun maddelerini tek şemada birleştirir.
 */
export function getUnifiedDictionaryEntries() {
  const base = TERMS.map((t) => ({
    title: t.term,
    slug: termToSlug(t.term),
    description: t.definition,
    type: 'GENEL_TERIM' as const,
    link: t.link?.href || `/sozluk/${termToSlug(t.term)}`,
  }));

  const facility = FACILITY_TERMS.map((f) => ({
    title: f.name,
    slug: f.termCode,
    description: f.description,
    type: 'TESIS_STANDART' as const,
    link: f.canonicalUrl,
    legalBasis: f.legalBasis,
  }));

  const kmk = KMK_LAW_INDEX.map((k) => ({
    title: `KMK Madde ${k.articleNumber}: ${k.title}`,
    slug: `kmk-madde-${k.articleNumber}`,
    description: `${k.summary} (Uygulama: ${k.practicalApplication})`,
    type: 'KMK_KANUN' as const,
    link: k.legalAnchor,
  }));

  return [...base, ...facility, ...kmk];
}

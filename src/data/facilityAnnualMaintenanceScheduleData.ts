/**
 * ISO 41001 & Tesis Yönetimi 12 Aylık Periyodik Bakım ve Denetim Takvimi Veri Modeli
 * (facilityAnnualMaintenanceScheduleData.ts)
 * 
 * Google Schema.org Schedule, TechArticle ve HowTo standartlarında;
 * Siteler, rezidanslar ve ticari plazalar için 12 aya yayılmış yasal zorunlu
 * ve teknik periyodik bakım, muayene ve denetim takvimi.
 */

export type MaintenanceCategory = 
  | 'Mekanik & İklimlendirme'
  | 'Elektrik & Jeneratör'
  | 'Yangın & Acil Durum'
  | 'Asansör & Dikey Taşıma'
  | 'Mali & Hukuk & Genel Kurul'
  | 'Havuz & Peyzaj & Hijyen';

export interface MaintenanceScheduleItem {
  id: string;
  month: number; // 1-12
  monthName: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  title: string;
  category: MaintenanceCategory;
  standardOrRegulation: string;
  frequency: 'Aylık Rutin' | '3 Aylık Çeyreklik' | '6 Aylık Sezonluk' | 'Yıllık Yasal Zorunlu';
  executionSteps: string[];
  legalRiskIfNotDone: string;
  aloYonetimGuarantee: string;
}

export const FACILITY_ANNUAL_MAINTENANCE_SCHEDULE: MaintenanceScheduleItem[] = [
  // --- OCAK (Month 1 - Q1) ---
  {
    id: 'm-01-genel-kurul-butce',
    month: 1,
    monthName: 'Ocak',
    quarter: 'Q1',
    title: 'Olağan Kat Malikleri Kurulu & Yıllık İşletme Projesi Onayı',
    category: 'Mali & Hukuk & Genel Kurul',
    standardOrRegulation: 'KMK Madde 29, 34, 37; ISO 41001 Stratejik Bütçeleme',
    frequency: 'Yıllık Yasal Zorunlu',
    executionSteps: [
      'Yönetim planında aksine hüküm yoksa Ocak ayı içinde kat malikleri olağan kurul toplantı çağrısının taahhütlü/imzalı tebliği.',
      'Geçmiş yıl gerçekleşen gelir-gider kesin hesabının ve denetçi raporunun sunulması.',
      'Yeni yıl tahmini işletme projesinin (aidat ve demirbaş avans tarifeleri) oylanarak kesinleştirilmesi.',
      'Divan tutanaklarının noter onaylı Karar Defterine işlenmesi ve tebliğlerin tamamlanması.',
    ],
    legalRiskIfNotDone: 'Genel kurul yapılmaması halinde yöneticinin yetkisi tartışmalı hale gelir; aidat icra takiplerinde borca itirazlar kabul görebilir ve Sulh Hukuk Mahkemesi kayyım atayabilir.',
    aloYonetimGuarantee: 'Hukuk müşavirlerimiz nezaretinde divan yönetimi, dijital oy sayım tutanakları ve %100 usul güvencesiyle iptal riski sıfırlanır.',
  },
  {
    id: 'm-01-jenerator-trafo-kis',
    month: 1,
    monthName: 'Ocak',
    quarter: 'Q1',
    title: 'Kış Yükü Jeneratör & Trafo Yük Testi ve Isıtıcı Kontrolleri',
    category: 'Elektrik & Jeneratör',
    standardOrRegulation: 'Elektrik İç Tesisleri Yönetmeliği & TS HD 60364-4-41',
    frequency: 'Aylık Rutin',
    executionSteps: [
      'Jeneratör blok ısıtıcılarının (motor ceket suyu) ve akü şarj redresör voltajlarının kontrolü.',
      'Otomatik transfer panosu (ATS) üzerinden şebeke kesintisi simülasyonu ile 8 saniye devreye girme testi.',
      'Kış dönemi karter yağı seviyesi, antifriz donma derecesi ve yakıt tankı su tahliyesi.',
    ],
    legalRiskIfNotDone: 'Elektrik kesintisinde acil aydınlatma, hidrofor ve yangın asansörlerinin devre dışı kalması halinde İş Sağlığı ve Güvenliği Kanunu uyarınca yönetici şahsi sorumluluğu doğar.',
    aloYonetimGuarantee: 'Uzman elektrik mühendislerimizin denetiminde kış dondurucu şartlarında bile %100 start garantisi ve yakıt seviye telemetri takibi.',
  },

  // --- ŞUBAT (Month 2 - Q1) ---
  {
    id: 'm-02-kazan-bacalar-isi',
    month: 2,
    monthName: 'Şubat',
    quarter: 'Q1',
    title: 'Merkezi Isıtma Kazanları Brülör Gaz Analizi ve Baca Çekiş Denetimi',
    category: 'Mekanik & İklimlendirme',
    standardOrRegulation: 'Binalarda Enerji Performansı Yönetmeliği m.13 & TS EN 303-5',
    frequency: '3 Aylık Çeyreklik',
    executionSteps: [
      'Kazan alev-duman borularının kurum temizliği ve baca gazı sıcaklık farkı kontrolü.',
      'Brülör emisyon analizi cihazı ile O2, CO, CO2 değerlerinin ölçülmesi ve hava/yakıt oranının kalibrasyonu.',
      'Genleşme tankları ön gaz basınçlarının kontrolü ve emniyet ventilleri sızdırmazlık testi.',
    ],
    legalRiskIfNotDone: 'Eksik yanma sonucu karbonmonoksit sızıntısı ve can güvenliği riski; baca kurum tutması sonucu çatı yangını riski ve yüksek doğalgaz sarfiyat cezaları.',
    aloYonetimGuarantee: 'Yetkili gaz yakıcı cihaz teknisyenleri ile baca çekiş raporlaması, %12 ye varan yakıt tasarrufu optimizasyonu.',
  },
  {
    id: 'm-02-yangin-hidrant-sondurucu',
    month: 2,
    monthName: 'Şubat',
    quarter: 'Q1',
    title: 'Yangın Hidrant Hatları ve Taşınabilir Yangın Söndürme Cihazları Denetimi',
    category: 'Yangın & Acil Durum',
    standardOrRegulation: 'Binaların Yangından Korunması Hakkında Yönetmelik m.99 & m.102',
    frequency: '3 Aylık Çeyreklik',
    executionSteps: [
      'Tüm kat yangın dolaplarındaki hortumların açılması, nozul kontrolleri ve manometre basınç ölçümü (min 4 bar).',
      'Bahçe hidrant vanalarının açılıp kapatılarak donma ve mekanik kilitlenme riskinin giderilmesi.',
      '6 kg ABC tozlu ve CO2 yangın tüplerinin piktogram, manometre yeşil bölge ve emniyet pimi mühür kontrolü.',
    ],
    legalRiskIfNotDone: 'İtfaiye ve belediye ruhsat denetimlerinde idari para cezası; olası yangında kasko ve yangın sigortası hasar tazminatının reddedilmesi.',
    aloYonetimGuarantee: 'TSE HYB belgeli yangın güvenlik firmamızca her cihaz barkodla etiketlenir ve dijital yangın envanter sistemimize işlenir.',
  },

  // --- MART (Month 3 - Q1) ---
  {
    id: 'm-03-asansor-yillik-a-tipi',
    month: 3,
    monthName: 'Mart',
    quarter: 'Q1',
    title: 'Asansör A Tipi Muayene Kuruluşu Yıllık Periyodik Kontrolü (Yeşil Etiket)',
    category: 'Asansör & Dikey Taşıma',
    standardOrRegulation: 'Asansör İşletme ve Bakım Yönetmeliği m.15; Sanayi ve Teknoloji Bakanlığı Tebliği',
    frequency: 'Yıllık Yasal Zorunlu',
    executionSteps: [
      'Belediyenin protokol imzaladığı Akredite A Tipi Muayene Kuruluşu (TSE, Makina Mühendisleri Odası vb.) randevusunun organize edilmesi.',
      'Paraşüt fren mekanizması, taşıyıcı halat aşınma toleransları ve hız regülatörü fonksiyon testleri.',
      'Kuyu altı ve üstü güvenlik tamponları, çift yönlü kabin acil haberleşme interkomunun test edilmesi.',
      'Muayene raporunun onaylanarak kabin içine yeşil bilgi etiketinin yapıştırılması.',
    ],
    legalRiskIfNotDone: 'Kırmızı etiket alan asansör 60 gün içinde belediye tarafından mühürlenir; mühür kırma halinde TCK m.203 uyarınca hapis cezası ve yönetici tazminat sorumluluğu.',
    aloYonetimGuarantee: 'Bakımcı firmanın ön muayene hazırlığı eşliğinde %100 Yeşil Bilgi Etiketi alma taahhüdü ve teknik müşavirlik desteği.',
  },
  {
    id: 'm-03-yagmur-drenaj-teras',
    month: 3,
    monthName: 'Mart',
    quarter: 'Q1',
    title: 'İlkbahar Yağmurları Öncesi Çatı Drenajı, Parapet ve Terastaki Süzgeç Temizliği',
    category: 'Havuz & Peyzaj & Hijyen',
    standardOrRegulation: 'Bina Çatı ve Yalıtım Standartları TS 11758; ISO 41001 Varlık Koruma',
    frequency: '6 Aylık Sezonluk',
    executionSteps: [
      'Çatı olukları, gizli dereler ve yağmur iniş borularındaki yaprak, kum ve kireç tortularının temizlenmesi.',
      'Bodrum kat drenaj pompaları (dalgıç pompalar) kuyu flatörlerinin elle tetiklenerek tahliye testi.',
      'Geri tepme klapelerinin (çekvalf) şehir kanalizasyon geri basmalarına karşı sızdırmazlık kontrolü.',
    ],
    legalRiskIfNotDone: 'Bodrum kat sığınak ve otoparklarını su basması, asansör kuyu diplerinin su altında kalarak anakart ve motorların yanması riski.',
    aloYonetimGuarantee: 'Çift dalgıç pompa yedeklemeli hidro-otomasyon sistemi ve su basma erken uyarı sensörleri entegrasyonu.',
  },

  // --- NİSAN (Month 4 - Q2) ---
  {
    id: 'm-04-hidrofor-su-deposu-hijyen',
    month: 4,
    monthName: 'Nisan',
    quarter: 'Q2',
    title: 'Merkezi Kullanma Suyu Deposu Mekanik Temizliği & Akredite Laboratuvar Analizi',
    category: 'Havuz & Peyzaj & Hijyen',
    standardOrRegulation: 'İnsani Tüketim Amaçlı Sular Hakkında Yönetmelik; Sağlık Bakanlığı 2007/67 Genelgesi',
    frequency: '6 Aylık Sezonluk',
    executionSteps: [
      'Su deposunun boşaltılarak gıda tüzüğüne uygun dezenfektan ve basınçlı sıcak suyla biyofilm ve çamur temizliği.',
      'UV filtre sterilizatör lambalarının ömür sayacı ve kuvars kılıf temizlik kontrolü.',
      'Temizlik sonrası akredite halk sağlığı laboratuvarından mikrobiyolojik (E.coli, koliform) ve kimyasal numune alımı.',
      'Sonuç raporunun bina giriş panolarında ve site mobil uygulamasında şeffafça paylaşılması.',
    ],
    legalRiskIfNotDone: 'Lejyonella ve dizanteri gibi salgın hastalık riskleri; İl Sağlık Müdürlüğü denetimlerinde yüklü idari cezalar ve kat maliklerine karşı tazminat.',
    aloYonetimGuarantee: 'Ozonlama destekli Sağlık Bakanlığı onaylı dezenfeksiyon ve 14 parametreli tam laboratuvar tahlil belgesi.',
  },
  {
    id: 'm-04-topraklama-paratoner-olcumu',
    month: 4,
    monthName: 'Nisan',
    quarter: 'Q2',
    title: 'Yıllık Elektrik Tesisatı, Pano Termal Kamerası & Paratoner Topraklama Ölçümü',
    category: 'Elektrik & Jeneratör',
    standardOrRegulation: 'Elektrik Tesislerinde Topraklamalar Yönetmeliği EK-P; İş Ekipmanları Yönetmeliği',
    frequency: 'Yıllık Yasal Zorunlu',
    executionSteps: [
      'EMO üyesi yetkili SMM elektrik mühendisince ana dağıtım panolarında toprak meger cihazı ile direnç ölçümü (R < 2 Ohm).',
      'Aktif paratoner başlığı darbe koruma sayacı ve iniş iletkenleri topraklama geçiş direnci testi.',
      'Ana giriş şalterleri ve kompanzasyon panosunda FLIR termal kamera ile gevşek klemens aşırı ısınma taraması.',
      'Termal anomali görülen faz baralarının ve kontaktör vidalarının tork anahtarıyla sıkılması.',
    ],
    legalRiskIfNotDone: 'Gevşek bağlantıdan kaynaklı pano ark yangınları (site yangınlarının %42 sebebi elektrik panosudur); yıldırım düşmesinde elektronik cihaz kartlarının kül olması.',
    aloYonetimGuarantee: 'EMO onaylı resmi ölçüm raporu ve FLIR yüksek çözünürlüklü termografi fotoğraflarıyla risk sıfırlama.',
  },

  // --- MAYIS (Month 5 - Q2) ---
  {
    id: 'm-05-acik-havuz-sezon-acilis',
    month: 5,
    monthName: 'Mayıs',
    quarter: 'Q2',
    title: 'Açık Yüzme Havuzu Kimyasal Dezenfeksiyonu, Denge Tankı & Filtrasyon Sezon Açılışı',
    category: 'Havuz & Peyzaj & Hijyen',
    standardOrRegulation: 'Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik m.5',
    frequency: '6 Aylık Sezonluk',
    executionSteps: [
      'Kış örtüsünün sökülmesi, havuz tabanı ve denge tankının anti-alg ve asit yıkayıcılarla derinlemesine yıkanması.',
      'Kuvars kum filtrelerindeki medyanın kontrolü, ters yıkama yapılması ve gerekirse filtre kumu değişimi.',
      'Otomatik klor ve pH dozajlama pompaları problarının kalibrasyonu ve sirkülasyon motorları conta bakımı.',
      'Havuz suyunun doldurularak İlçe Sağlık Müdürlüğü standartlarında serbest klor (1.0-1.5 ppm) ve pH (7.2-7.6) dengeye getirilmesi.',
    ],
    legalRiskIfNotDone: 'Kulak ve göz enfeksiyonları, yosunlaşma, bulanıklık; Sağlık Bakanlığı denetiminde havuzun mühürlenmesi ve cezai yaptırımlar.',
    aloYonetimGuarantee: 'Sertifikalı havuz operatörü eşliğinde günlük 3 periyot fotometrik test takibi ve haftalık kimya kütüğü tutulması.',
  },
  {
    id: 'm-05-chiller-klima-santralleri',
    month: 5,
    monthName: 'Mayıs',
    quarter: 'Q2',
    title: 'Chiller Soğutma Grupları & Klima Santralleri (AHU) Yaz Sezonu Devreye Alma',
    category: 'Mekanik & İklimlendirme',
    standardOrRegulation: 'F-Gaz Yönetmeliği & ASHRAE 62.1 İç Mekan Hava Kalitesi',
    frequency: '6 Aylık Sezonluk',
    executionSteps: [
      'Soğutma kuleleri serpantin temizliği ve kireç çözücü sirkülasyonu.',
      'Chiller kompresör karter yağ asidite testi ve R410A / R32 soğutucu gaz kaçak dedektörü taraması.',
      'Klima santrali taze hava filtreleri (G4/F7) değişimi ve UV-C dezenfeksiyon lambaları kontrolü.',
      'Bina Otomasyon Sistemi (BMS) üzerinden üfleme sıcaklık set değerlerinin yaz konfor moduna geçirilmesi.',
    ],
    legalRiskIfNotDone: 'Sıcak yaz günlerinde soğutma sisteminin kilitlenmesi, yüksek enerji sarfiyatı ve ofis/rezidans sakinlerinden toplu şikayetler.',
    aloYonetimGuarantee: 'A sınıfı soğutma verimi optimizasyonu ve 7/24 SCADA/BMS alarm izleme altyapısıyla anında müdahale.',
  },

  // --- HAZİRAN (Month 6 - Q2) ---
  {
    id: 'm-06-otopark-jetfan-co-sistemi',
    month: 6,
    monthName: 'Haziran',
    quarter: 'Q2',
    title: 'Kapalı Otopark Jet-Fan Duman Tahliye & Karbonmonoksit (CO) Dedektör Kalibrasyonu',
    category: 'Yangın & Acil Durum',
    standardOrRegulation: 'Binaların Yangından Korunması Hakkında Yönetmelik m.60 & TS EN 50545-1',
    frequency: '6 Aylık Sezonluk',
    executionSteps: [
      'Otopark CO gaz algılama dedektörlerinin test gazı püskürtülerek eşik değer (50 ppm ve 100 ppm) alarm tetikleme doğrulaması.',
      'Duman damperlerinin motorlu açılış süresi ve yangın zonu izolasyon mekanik testi.',
      'Jet-fanların BMS üzerinden kademeli olarak (yavaş ve yangın hızında) çalıştırılarak hava debisi ölçümü.',
      'Egzost şaftı çıkış menfezlerinin temizliği ve panjur klape açılışları kontrolü.',
    ],
    legalRiskIfNotDone: 'Otoparkta araç egzoz gazlarının tahliye edilemeyip zehirlenme oluşturması; araç yangınlarında dumanın kaçış merdivenlerine dolması.',
    aloYonetimGuarantee: 'Kalibre test tüpleriyle dedektör hassasiyet ölçümü ve itfaiye onaylı duman tahliye senaryo denetimi.',
  },
  {
    id: 'm-06-otomatik-bariyer-turnike',
    month: 6,
    monthName: 'Haziran',
    quarter: 'Q2',
    title: 'Araç OGS/HGS Plaka Tanıma Sistemi & Otomatik Otopark Bariyerleri Mekanik Revizyonu',
    category: 'Asansör & Dikey Taşıma',
    standardOrRegulation: 'TSE K 504 Geçiş Kontrol Standartları; 5188 Sayılı Kanun Güvenlik Entegrasyonu',
    frequency: '3 Aylık Çeyreklik',
    executionSteps: [
      'Bariyer kolları denge yaylarının tork ayarı ve hidrolik/mekanik dişli kutusu yağ seviyesi kontrolü.',
      'Emniyet fotoselleri ve taban manyetik loop dedektörlerinin araç altı sıkışmayı önleme testi.',
      'PTS (Plaka Tanıma Sistemi) IP kameralarının lens odaklama ve kızılötesi LED gece görüş temizliği.',
    ],
    legalRiskIfNotDone: 'Bariyer kolunun araç veya yaya üzerine düşerek maddi/bedensel hasar vermesi sonucu site yönetimine tazminat davaları.',
    aloYonetimGuarantee: 'Mikrosaniyede ters dönen akıllı fotosel koruması ve plaka okuma doğruluk oranının %99.2 üzerine çıkarılması.',
  },

  // --- TEMMUZ (Month 7 - Q3) ---
  {
    id: 'm-07-yangin-pompa-istasyonu',
    month: 7,
    monthName: 'Temmuz',
    quarter: 'Q3',
    title: 'Yangın Ana Pompa İstasyonu (Dizel, Elektrikli, Jokey) Basınç-Debi Performans Testi',
    category: 'Yangın & Acil Durum',
    standardOrRegulation: 'NFPA 20 & Binaların Yangından Korunması Hakkında Yönetmelik m.96',
    frequency: 'Aylık Rutin',
    executionSteps: [
      'Jokey pompanın sistem statik basıncını istenen barda (örneğin 10 bar) sabit tutma döngüsünün izlenmesi.',
      'Dizel yangın pompasının manuel ve otomatik start aküsü şarj durumları ve yakıt seviyesi kontrolü.',
      'Test debimetre hattı açılarak nominal debide (%100 ve %150 debide) manometre basınç düşüm eğrisinin çıkarılması.',
      'Sprinkler ıslak alarm vanaları gecikme hücresi ve su motoru çanının çalma testi.',
    ],
    legalRiskIfNotDone: 'Olası bir yangın esnasında basınç düşüklüğü sebebiyle sprinkler nozullarından su fışkırtılamaması ve tesisin tamamen yanması.',
    aloYonetimGuarantee: 'Haftalık otomatik rölanti testleri ve NFPA 20 onaylı debimetre eğrisi ile kesintisiz can güvenliği kalkanı.',
  },
  {
    id: 'm-07-peyzaj-otomatik-sulama-enerji',
    month: 7,
    monthName: 'Temmuz',
    quarter: 'Q3',
    title: 'Yaz Zirve Sıcaklıkları Peyzaj Otomatik Sulama Zamanlaması & Derin Kuyu Dalgıç Pompaları',
    category: 'Havuz & Peyzaj & Hijyen',
    standardOrRegulation: 'ISO 14001 Çevre Yönetimi & Su Verimliliği Standartları',
    frequency: 'Aylık Rutin',
    executionSteps: [
      'Yağmurlama ve damlama sulama hatlarının gece 23:00 - 05:00 saatleri arasına programlanarak buharlaşma kaybının önlenmesi.',
      'Kuyu suyu dalgıç pompalarının akım çekiş değerleri ve su seviye elektrotlarının kireçlenmeye karşı temizlenmesi.',
      'Ağaç ve çim alanlarda mantari hastalıklara ve zararlılara karşı biyolojik koruyucu ilaçlama programı.',
    ],
    legalRiskIfNotDone: 'Sulama yapılmaması sonucu milyonlarca liralık peyzaj ve ağaç varlığının kuruması, ortak bütçede büyük demirbaş zararı.',
    aloYonetimGuarantee: 'Nem sensörlü akıllı sulama otomasyonu ile şebeke suyu tüketmeden %35 su ve elektrik tasarrufu.',
  },

  // --- AĞUSTOS (Month 8 - Q3) ---
  {
    id: 'm-08-kompanzasyon-reaktif-ceza',
    month: 8,
    monthName: 'Ağustos',
    quarter: 'Q3',
    title: 'Trafo Kompanzasyon Panosu Kondansatör Ölçümü & Reaktif Enerji Ceza Takibi',
    category: 'Elektrik & Jeneratör',
    standardOrRegulation: 'EPDK Elektrik Piyasası Müşteri Hizmetleri Yönetmeliği m.14',
    frequency: 'Aylık Rutin',
    executionSteps: [
      'Reaktif Güç Kontrol Rölesi üzerinden endüktif (%20 sınırı) ve kapasitif (%15 sınırı) oranların günlük sayaç endeksiyle kıyası.',
      'Şişmiş, kapasite kaybetmiş kondansatör bloklarının pens ampermetre ile mikrofarad (μF) testi.',
      'Harmonik filtre reaktörleri sıcaklıklarının ve kontaktör kontak yapışmalarının kontrol edilmesi.',
    ],
    legalRiskIfNotDone: 'Aylık elektrik faturasına %30 ile %70 arasında değişen reaktif ceza bedellerinin yansıması ve aidat bütçesine haksız yük binmesi.',
    aloYonetimGuarantee: 'Alo Yönetim Enerji İzleme Yazılımı ile reaktif ceza riskinde 24 saat içinde otomatik uyarı ve kondansatör değişimi; %0 reaktif ceza garantisi.',
  },
  {
    id: 'm-08-kameralar-guvenlik-kayit',
    month: 8,
    monthName: 'Ağustos',
    quarter: 'Q3',
    title: 'CCTV Güvenlik Kamera Sistemi Hard Disk Bütünlüğü, NVR Kayıt Süresi ve Gece Görüş Denetimi',
    category: 'Yangın & Acil Durum',
    standardOrRegulation: 'KVKK Madde 12 Veri Güvenliği; 5188 Sayılı Özel Güvenlik Kanunu Uygulama Yönetmeliği',
    frequency: '3 Aylık Çeyreklik',
    executionSteps: [
      'Tüm NVR / DVR cihazlarının kesintisiz en az 30 günlük geriye dönük görüntü saklama kapasitesinin (HDD SMART sağlık durumu) teyidi.',
      'Kör nokta analizinin yapılması ve çevre çit aydınlatmalarıyla kamera IR eşzamanlaması.',
      'KVKK aydınlatma metinleri ve kamera uyarı tabelalarının tüm giriş kapılarında güncelliğinin kontrolü.',
    ],
    legalRiskIfNotDone: 'Adli bir olayda emniyet birimlerine görüntü verilememesi sonucu yöneticinin hukuki sorumluluğu ve KVKK veri ihlali cezaları.',
    aloYonetimGuarantee: 'RAID yapılı endüstriyel sunucu kayıt güvenliği, %100 kamera faallik oranı ve KVKK uyumlu gizlilik protokolü.',
  },

  // --- EYLÜL (Month 9 - Q3) ---
  {
    id: 'm-09-siginak-acil-durum-jenerator',
    month: 9,
    monthName: 'Eylül',
    quarter: 'Q3',
    title: 'Sığınak Alanları Havalandırması, Acil Aydınlatma Kiti & Yangın Çıkış Kapıları Revizyonu',
    category: 'Yangın & Acil Durum',
    standardOrRegulation: '3194 İmar Kanunu Sığınak Yönetmeliği m.13 & Afet ve Acil Durum Yönetimi Standartları',
    frequency: '6 Aylık Sezonluk',
    executionSteps: [
      'Sığınak radyoaktif toz/gaz filtrasyon sisteminin (kum filtre, aktif karbon filtre) manuel ve motorlu baypas testi.',
      'Kaçış koridorlarındaki acil yönlendirme armatürlerinin 180 dakika akü deşarj testi.',
      'Yangın kapılarının hidrolik kapatıcılarının (panyeli kilit) duman sızdırmaz fitillerle tam kapanma kontrolü.',
      'Sığınak ortak depolama işgallerinin giderilmesi ve acil durum tahliye plan şemasının yenilenmesi.',
    ],
    legalRiskIfNotDone: 'Afet ve İmar denetimlerinde sığınakların tahsis amacı dışında kullanılması sebebiyle mühürleme ve idari cezalar; deprem anında can kaybı riski.',
    aloYonetimGuarantee: 'Sığınakların 7/24 mevzuata tam uyumlu, tahliye yolları temiz ve hazır tutulması kurumsal denetim garantimiz altındadır.',
  },
  {
    id: 'm-09-asansor-kuyu-motor-yag',
    month: 9,
    monthName: 'Eylül',
    quarter: 'Q3',
    title: 'Asansör Makine Dairesi Tahrik Kasnağı, Dişli Yağı ve Halat Yağlanma/Aşınma Bakımı',
    category: 'Asansör & Dikey Taşıma',
    standardOrRegulation: 'TS EN 81-20 ve TS EN 81-50 Asansör Yapım ve Güvenlik Kuralları',
    frequency: '3 Aylık Çeyreklik',
    executionSteps: [
      'Makine dairesi redüktör dişli kutusu sentetik yağ viskozite kontrolü ve gerekirse takviyesi.',
      'Taşıyıcı çelik halatların özel asansör halat spreyi ile yağlanması, korozyon ve tel kopma sayımı.',
      'Aşırı yük sensörünün kalibrasyonu (kabin kapasitesi aşıldığında hareket etmeme güvencesi).',
      'Kat hizalama (seviyeleme) fotosellerinin toz temizliği ile asansörün katlarda eşik yapmasının engellenmesi.',
    ],
    legalRiskIfNotDone: 'Katta eşik yapma sonucu yaşlı ve çocukların düşüp yaralanması; halat kopması veya kasnak sıyırmasıyla kabin serbest düşüş tehlikesi.',
    aloYonetimGuarantee: 'Aylık periyodik bakım formlarının dijital arşivlenmesi ve bağımsız makine mühendisimizle çift katmanlı çapraz denetim.',
  },

  // --- EKİM (Month 10 - Q4) ---
  {
    id: 'm-10-kis-hazirlik-kazan-yakma',
    month: 10,
    monthName: 'Ekim',
    quarter: 'Q4',
    title: 'Kış Sezonu Öncesi Merkezi Isıtma Kazanları, Sirkülasyon Pompaları & Otomasyon Testi',
    category: 'Mekanik & İklimlendirme',
    standardOrRegulation: 'Binalarda Enerji Performansı Yönetmeliği; Makine Mühendisleri Odası Kazan Dairesi Kılavuzu',
    frequency: '6 Aylık Sezonluk',
    executionSteps: [
      'Isıtma hattı sirkülasyon pompalarının mekanik salmastra ve yatak ses kontrolleri, yedek pompanın devreye girme testi.',
      'Dış hava kompanzasyon paneli sensörünün dış ortam sıcaklığına göre eğri kalibrasyonu.',
      'Radyatör ve fan-coil hatlarının havasının purjörlerden tahliyesi ve tesisat su basıncının dengelenmesi (1.5-2.0 bar).',
      'Kazan dairesi gaz algılama selenoid vanasının alarm anında ana doğalgaz hattını kesme tatbikatı.',
    ],
    legalRiskIfNotDone: 'Isıtma mevsiminin başında tesisat hava kilitlenmesi sebebiyle dairelerin ısınamaması, don düşen gecelerde ana boru patlamaları.',
    aloYonetimGuarantee: 'Ekim ayı içinde ön ateşleme testi yapılarak soğuklar başlamadan önce 0 arıza ile konforlu kış başlangıcı.',
  },
  {
    id: 'm-10-kapali-havuz-nem-alma',
    month: 10,
    monthName: 'Ekim',
    quarter: 'Q4',
    title: 'Kapalı Yüzme Havuzu Isıtma Eşanjörü, Nem Alma Santrali & Kış Açılış Dezenfeksiyonu',
    category: 'Havuz & Peyzaj & Hijyen',
    standardOrRegulation: 'Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik; TS 13661',
    frequency: '6 Aylık Sezonluk',
    executionSteps: [
      'Plakalı titanyum ısıtma eşanjörlerinin kireç temizliği ve havuz suyu sıcaklığının 26-28°C aralığına ayarlanması.',
      'Nem alma santrali (Dehumidifier) ısı geri kazanım bataryaları ve kompresör çalışma periyotlarının testi (%50-60 bağıl nem).',
      'Kapalı havuz salonu negatif basınç dengesi ile klor kokusunun bina içine yayılmasının engellenmesi.',
    ],
    legalRiskIfNotDone: 'Yüksek nem sebebiyle kapalı mekan tavanlarında küf, mantar ve korozyon; yetersiz hava tazelemede klor gazı birikimi zehirlenmesi.',
    aloYonetimGuarantee: 'Akıllı iklimlendirme entegrasyonuyla kristal berraklığında su, sıfır klor kokusu ve ideal nem dengesi.',
  },

  // --- KASIM (Month 11 - Q4) ---
  {
    id: 'm-11-su-sayaclari-isi-payolcer',
    month: 11,
    monthName: 'Kasım',
    quarter: 'Q4',
    title: 'Merkezi Sistem Isı Payölçer & Kalorimetre Radyo Frekans Okuma Kalibrasyonu',
    category: 'Mali & Hukuk & Genel Kurul',
    standardOrRegulation: 'Merkezi Isıtma ve Sıhhi Sıcak Su Sistemlerinde Isınma ve Sıhhi Sıcak Su Giderlerinin Paylaştırılmasına İlişkin Yönetmelik',
    frequency: 'Yıllık Yasal Zorunlu',
    executionSteps: [
      'M-Bus veya kablosuz RF (Radyo Frekansı) toplayıcı hub ünitelerinin sinyal iletişim testi.',
      'Pili tükenmiş, manipüle edilmiş veya sökülmüş payölçer cihazlarının yerinde tespiti ve mühürlenmesi.',
      'Yönetmelik uyarınca asgari %30 ortak mahal tüketimi ve %70 bağımsız bölüm tüketim algoritmasının faturalandırma yazılımında doğrulanması.',
    ],
    legalRiskIfNotDone: 'Hatalı paylaştırma yapılması halinde kat maliklerinin mahkemeye başvurarak tüm kış faturalarını iptal ettirmesi ve gecikme cezaları.',
    aloYonetimGuarantee: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı yetkili ölçüm şirketleri işbirliğinde hatasız ve şeffaf faturalandırma.',
  },
  {
    id: 'm-11-buzlanma-kar-onleme',
    month: 11,
    monthName: 'Kasım',
    quarter: 'Q4',
    title: 'Otopark Rampası Isıtma Kabloları (Buz Eritme) & Çevre Kar Temizlik Ekipmanları Hazırlığı',
    category: 'Mekanik & İklimlendirme',
    standardOrRegulation: 'Bina Giriş ve Yürüyüş Yolları Güvenliği TS 12484; ISO 45001 İSG Standardı',
    frequency: 'Yıllık Yasal Zorunlu',
    executionSteps: [
      'Otopark araç giriş-çıkış rampalarındaki zemin ısıtma karbon/rezistans kablolarının omik direnç ölçümü.',
      'Kar ve buz algılama zemin nem/sıcaklık sensörlerinin termostat devreye girme testi.',
      'Çevreye ve araç boyalarına zarar vermeyen solüsyon (kalsiyum klorür) ve buz kırıcı ekipman stoklarının tamamlanması.',
    ],
    legalRiskIfNotDone: 'Buzlanan rampada araçların kayarak duvara veya diğer araçlara çarpması, yayaların kayarak kemik kırılması sonucu tazminat davaları.',
    aloYonetimGuarantee: 'Kar düşer düşmez otomatik devreye giren akıllı rampa ısıtması ve 15 dakikada sahada olan kar küreme ekibi.',
  },

  // --- ARALIK (Month 12 - Q4) ---
  {
    id: 'm-12-yilsonu-kesin-hesap-denetim',
    month: 12,
    monthName: 'Aralık',
    quarter: 'Q4',
    title: 'Yıl Sonu Mali Kesin Hesap Kapanışı, Banka Mutabakatları & Denetim Kurulu Raporu',
    category: 'Mali & Hukuk & Genel Kurul',
    standardOrRegulation: 'KMK Madde 39, 41; Türk Ticaret Kanunu & Vergi Usul Kanunu Esasları',
    frequency: 'Yıllık Yasal Zorunlu',
    executionSteps: [
      'Banka vadesiz ve vadeli hesap ekstrelerinin, POS hareketlerinin muhasebe yazılımıyla 1 Kuruş dahi sapma olmaksızın mutabakatı.',
      'Yıl içinde ödenmeyen aidat ve demirbaş icra dosyalarının avukat bakiye raporları ile icra kasası mutabakatı.',
      'Denetim Kurulu üyelerine tüm faturaların, dekontların ve yasal karar defterinin incelenmek üzere teslimi.',
      'Denetçi onaylı resmi Denetim Raporunun hazırlanması ve yeni yıl Genel Kurul gündemine eklenmesi.',
    ],
    legalRiskIfNotDone: 'Denetim yapılmaması ve ibra edilmeme durumunda yöneticinin zimmet, görevi kötüye kullanma iddialarıyla savcılığa şikayet edilmesi.',
    aloYonetimGuarantee: 'Bağımsız mali müşavir onaylı gelir-gider bilançoları, 7/24 sakinlerin erişebildiği şeffaf dijital kasa ve tam ibra güvencesi.',
  },
  {
    id: 'm-12-sigorta-police-risk-degerleme',
    month: 12,
    monthName: 'Aralık',
    quarter: 'Q4',
    title: 'Ortak Alan Paket Sigortası, Deprem, Yangın, Makine Kırılması & 3. Şahıs Mali Mesuliyet Poliçe Yenilemesi',
    category: 'Mali & Hukuk & Genel Kurul',
    standardOrRegulation: 'KMK Madde 21; Türk Ticaret Kanunu Sigorta Hukuku; ISO 41001 Risk Yönetimi',
    frequency: 'Yıllık Yasal Zorunlu',
    executionSteps: [
      'Tesisin güncel yeniden yapım maliyetine (rayiç metrekare inşaat maliyeti) göre bina sigorta bedelinin güncellenmesi.',
      'Trafo, jeneratör, kazan ve asansörler için Makine Kırılması klozu limitlerinin enflasyona karşı revize edilmesi.',
      'Yönetici Sorumluluk ve 3. Şahıs Mali Mesuliyet teminatlarının en az 3 farklı sigorta brokerinden karşılaştırmalı teklifle sunulması.',
      'Poliçe primlerinin işletme projesine paylaştırılması ve zeyilnamelerin arşive kaldırılması.',
    ],
    legalRiskIfNotDone: 'Eksik sigorta sebebiyle olası bir yangın, deprem veya su baskınında zararın sadece küçük bir kısmının ödenmesi (muafiyet/oran kuralı).',
    aloYonetimGuarantee: 'Türkiye\'nin lider sigorta şirketleriyle kurumsal hacim indirimli en kapsamlı teminat klozu ve sıfır eksik sigorta güvencesi.',
  }
];

export const MAINTENANCE_CATEGORIES: MaintenanceCategory[] = [
  'Mekanik & İklimlendirme',
  'Elektrik & Jeneratör',
  'Yangın & Acil Durum',
  'Asansör & Dikey Taşıma',
  'Mali & Hukuk & Genel Kurul',
  'Havuz & Peyzaj & Hijyen',
];

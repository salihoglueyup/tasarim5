export interface QualityStandardItem {
  id: string;
  code: string;
  title: string;
  badge: string;
  icon: string;
  accentColor: string;
  badgeBg: string;
  scope: string;
  auditFrequency: string;
  deliverables: string[];
}

export interface QualityFaqItem {
  question: string;
  answer: string;
}

export const QUALITY_STANDARDS: QualityStandardItem[] = [
  {
    id: 'iso-45001',
    code: 'ISO 45001:2018',
    title: 'İş Sağlığı ve Güvenliği (İSG)',
    badge: 'BELCERT Belge No: A1808966',
    icon: 'health_and_safety',
    accentColor: 'text-amber-500 border-amber-500/30',
    badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    scope: 'Sitede görev yapan temizlik, güvenlik ve teknik personelin çalışma sahasında sıfır riskle görev yapmasını sağlayan koruyucu model.',
    auditFrequency: 'Aylık A Sınıfı İSG Uzmanı ve İşyeri Hekimi Saha Denetimi • Yıllık BELCERT Gözetim Tetkiki (ILAS-MS-0089)',
    deliverables: [
      'Tüm Personel İçin Yıllık 16 Saat Temel İSG ve Yangın Eğitimi',
      'Asansör Boşluğu, Çatı ve Elektrik Odalarında Yüksek Güvenlik Önlemleri',
      'Kişisel Koruyucu Donanım (KKD) Eksiksiz Zimmetleme ve Takibi',
      'Site Acil Durum Tahliye Planı ve Yılda 1 Kez Genel Tatbikat'
    ]
  },
  {
    id: 'iso-14001',
    code: 'ISO 14001:2026',
    title: 'Çevre Yönetim Sistemi',
    badge: 'BELCERT Belge No: A1808962',
    icon: 'eco',
    accentColor: 'text-emerald-500 border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    scope: 'Ortak alan temizliğinde çevreye ve yer altı sularına zararsız ekolojik deterjanlar, atık ayrıştırma ve enerji verimliliği yönetimi.',
    auditFrequency: 'Yıllık BELCERT Gözetim Tetkiki (ILAS-MS-0089) • Yılda 4 Kez İç Tetkik',
    deliverables: [
      'Sağlık Bakanlığı Onaylı %100 Biyobozunur Ekolojik Temizlik Ürünleri',
      'Sıfır Atık Yönetmeliği Uyumlu Kaynağında Ayrıştırma Kutuları',
      'Bahçe Sulamasında Yağmur Suyu Hasadı ve Sensörlü Sistemler',
      'Ortak Alan Aydınlatmalarında LED Dönüşümü ile %60 Elektrik Tasarrufu'
    ]
  },
  {
    id: 'iso-10002',
    code: 'ISO 10002:2018',
    title: 'Müşteri Memnuniyeti Yönetimi',
    badge: 'BELCERT Belge No: A1808961',
    icon: 'support_agent',
    accentColor: 'text-rose-500 border-rose-500/30',
    badgeBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
    scope: 'Sakinlerden gelen tüm talep ve şikayetlerin kayıt altına alındığı, çözüm süresi taahhütleri ve eskalasyon prosedürleriyle yönetildiği sistem.',
    auditFrequency: 'Yıllık BELCERT Gözetim Tetkiki (ILAS-MS-0089) • Yılda 4 Kez İç Tetkik',
    deliverables: [
      'Tüm Sakin Taleplerinin İlk İş Günü İçinde Kayıt Altına Alınması',
      'Net Promoter Score (NPS) ile Dönemsel Memnuniyet Ölçümü',
      'WhatsApp, Mobil Uygulama ve E-posta Üzerinden Merkezi Talep Yönetimi',
      'Aylık Şikayet Çözüm Oranı Raporunun Yönetim Kuruluna Sunulması'
    ]
  },
  {
    id: 'iso-22301',
    code: 'ISO 22301:2019',
    title: 'İş Sürekliliği Yönetimi',
    badge: 'BELCERT Belge No: A1808963',
    icon: 'all_inclusive',
    accentColor: 'text-cyan-500 border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
    scope: 'Doğal afet, altyapı arızası veya salgın gibi olağanüstü durumlarda tesis hizmetlerinin kesintisiz sürmesini güvence altına alan sistem.',
    auditFrequency: 'Yıllık BELCERT Gözetim Tetkiki (ILAS-MS-0089) • Yılda 4 Kez İç Tetkik',
    deliverables: [
      'Kritik Sistemler İçin Yedek Kapasite ve Failover Prosedürleri',
      'Siber Kriz ve Veri Kaybı Senaryolarına Karşı İş Sürekliliği Planı',
      'Görev Tanımları Belli Kriz Yönetim Komitesi',
      'Kritik Sistemlerde 4 Saatlik Kurtarma (RTO) Hedefi'
    ]
  },
  {
    id: 'iso-31000',
    code: 'ISO 31000:2018',
    title: 'Kurumsal Risk Yönetimi',
    badge: 'BELCERT Belge No: A1808965',
    icon: 'security',
    accentColor: 'text-blue-500 border-blue-500/30',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    scope: 'Site yönetimindeki teknik, hukuki ve finansal risklerin önceden tespit edilip bertaraf edildiği sistematik risk çerçevesi.',
    auditFrequency: 'Yıllık BELCERT Gözetim Tetkiki (ILAS-MS-0089) • Yılda 4 Kez İç Tetkik',
    deliverables: [
      'Erken Uyarı Sistemleri ve Tesis Risk Haritaları',
      'Aidat Gelirleri ve Fon Hesaplarının Finansal Risk Güvencesi',
      'KMK ve İş Kanunu Değişikliklerinin Anlık Takibi',
      'Kritik Ekipmanlar İçin Önleyici Bakım ve Arıza Risk Matrisi'
    ]
  },
  {
    id: 'ozel-guvenlik-5188',
    code: '5188 Sayılı Kanun',
    title: 'Özel Güvenlik Faaliyet İzni',
    badge: 'T.C. İçişleri Bakanlığı Lisanslı',
    icon: 'gavel',
    accentColor: 'text-slate-500 border-slate-500/30',
    badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    scope: 'İçişleri Bakanlığı ve İstanbul Valiliği onaylı 5188 Sayılı Kanun kapsamında özel güvenlik şirketi faaliyet izni.',
    auditFrequency: 'Valilik Özel Güvenlik Komisyonu Denetimi',
    deliverables: [
      '5188 Sayılı Kanun Uyarınca Sertifikalı ve Üniformalı Güvenlik Görevlileri',
      'Kolluk Kuvvetleriyle (Emniyet/Jandarma) Koordineli Asayiş Protokolü',
      'Güvenlik Personeli İçin Periyodik Kimlik Kartı ve Eğitim Yenileme Takibi',
      'İşletme Projelerinde %100 KMK 37 Hukuki Uyum ve İcra Güvencesi'
    ]
  }
];

export const QUALITY_FAQS: QualityFaqItem[] = [
  {
    question: "Alo Yönetim'in kalite standartları ve ISO belgeleri resmi olarak nasıl doğrulanabilir?",
    answer: "ISO 45001, ISO 14001, ISO 10002, ISO 22301, ISO 31000 ve ISO 26000 belgelerimiz BELCERT Uluslararası Belgelendirme tarafından ILAS akreditasyonu (ILAS-MS-0089) kapsamında verilmiştir. Her belgenin üzerindeki belge numarası ve karekod ile www.belcert.com adresinden geçerlilik sorgulaması yapabilir, belgelerin taranmış asıllarını Kalite Belgelerimiz sayfasından PDF olarak inceleyebilirsiniz."
  },
  {
    question: "Yılda 48 kez gerçekleştirilen habersiz iç denetimler nasıl işler?",
    answer: "Bağımsız kalite güvence uzmanlarımız, sitenin mevcut yönetim veya güvenlik personeline önceden haber vermeksizin ayda 4 kez (gece ve gündüz) sahaya intikal eder. Güvenlik RFID devriye kayıtları, asansör makine dairesi güvenlik mühürleri, ortak alan temizlik hijyen dereceleri ve yangın tüpü basınçları denetlenerek fotoğraflı 'Saha Kalite Teftiş Raporu' oluşturulur ve yönetim kuruluna iletilir."
  },
  {
    question: "Hizmet Seviyesi Taahhüdü (SLA) ihlal edilirse sözleşmesel yaptırım uygulanır mı?",
    answer: "Evet. Alo Yönetim ile imzalanan kurumsal tesis yönetim sözleşmelerinde 20 dakika acil teknik müdahale ve 24 saat şikayet çözüm garantileri yazılı cezai şartlara bağlıdır. Kusurlu bir gecikme durumunda ilgili ayın yönetim ücretinden sözleşmede belirlenen oranda hak ediş kesintisi yapılır veya ilgili taşeron derhal tazminatlı olarak değiştirilir."
  },
  {
    question: "Sitede görev yapan taşeron firmaların (asansör, ilaçlama vb.) kalitesi nasıl denetlenir?",
    answer: "ISO 45001 ve ISO 31000 süreçlerimiz gereği, sitemize hizmet veren hiçbir taşeron denetimsiz çalışamaz. Asansör bakım firmasının Satış Sonrası Hizmet Yeterlilik Belgesi (HYB) ve Sanayi Bakanlığı yetki belgesi, ilaçlama firmasının Sağlık Bakanlığı Biyosidal Ruhsatı ve tüm çalışanların Mesleki Yeterlilik Kurumu (MYK) belgeleri merkezimiz tarafından arşivlenir ve her işlem sonrasında dijital servis formuyla onaylanır."
  },
  {
    question: "Kat malikleri olarak denetim raporlarını ve kalite puanlarını nereden görebiliriz?",
    answer: "Alo Yönetim mobil sakin uygulaması ve web yönetim portalı üzerinden tüm kat malikleri ve denetçiler; asansör yıllık periyodik muayene yeşil etiket raporlarını, aylık habersiz denetim puanlarını, su analiz sonuçlarını ve banka mutabakatlarını 7/24 PDF olarak görüntüleyebilir ve indirebilir."
  }
];

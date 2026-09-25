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
    id: 'iso-41001',
    code: 'ISO 41001:2018',
    title: 'Entegre Tesis Yönetimi Standardı',
    badge: 'Uluslararası Tesis Akreditasyonu',
    icon: 'domain',
    accentColor: 'text-blue-500 border-blue-500/30',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    scope: 'Karma projeler, plazalar ve sitelerde enerji, insan kaynağı, teknik altyapı ve taşeronların tek merkezden yönetildiği küresel standart.',
    auditFrequency: 'Yılda 1 Kez Bağımsız Dış Denetim • Yılda 4 Kez İç Tetkik',
    deliverables: [
      'Tesis Yaşam Döngüsü ve Varlık Koruma Planı',
      'Taşeron Sözleşmelerinde %100 Hizmet Seviyesi (SLA) Uyumu',
      'Enerji Tüketimi ve Ortak Giderlerde %22 Maliyet Tasarrufu',
      'Periyodik Bakım Kayıtlarının 10 Yıl Dijital Arşivlenmesi'
    ]
  },
  {
    id: 'iso-9001',
    code: 'ISO 9001:2015',
    title: 'Kalite Yönetim Sistemi',
    badge: 'TÜRKAK & IAF Onaylı',
    icon: 'verified',
    accentColor: 'text-cyan-500 border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
    scope: 'Tüm operasyonel süreçlerin yazılı talimatlarla güvenceye alındığı, sakin memnuniyetini ve süreç şeffaflığını garanti eden sistem.',
    auditFrequency: 'Yıllık TÜRKAK Akredite Gözetim Tetkiki',
    deliverables: [
      'Standartlaştırılmış Günlük Blok Temizlik ve Güvenlik Talimatları',
      'Dijital Çağrı Merkezi ve 20 Dakika Arıza Müdahale Protokolü',
      'Sakin Şikayetlerinde 24 Saat İçinde Çözüm ve Geri Bildirim',
      'Her Ay Düzenli Kat Malikleri Memnuniyet Ölçümü'
    ]
  },
  {
    id: 'iso-27001',
    code: 'ISO 27001:2022',
    title: 'Bilgi Güvenliği Yönetim Sistemi',
    badge: 'KVKK & GDPR Tam Uyumlu',
    icon: 'lock',
    accentColor: 'text-purple-500 border-purple-500/30',
    badgeBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
    scope: 'Kat maliklerinin kişisel, finansal ve iletişim verilerinin 256-bit şifreleme ve izole bulut altyapısıyla korunması.',
    auditFrequency: 'Sürekli Sızma Testi (Pen-Test) & 6 Aylık Güvenlik Taraması',
    deliverables: [
      '256-Bit SSL Şifreli Sakin Mobil Aidat Ödeme Portalı',
      '6698 Sayılı KVKK Uyarınca Sıfır Veri Paylaşımı Taahhüdü',
      'Güvenlik Kameraları ve PTS Kayıtlarında 30 Günlük Otomatik İmha',
      'İki Kademeli (2FA) Yönetici ve Personel Erişim Güvenliği'
    ]
  },
  {
    id: 'iso-45001',
    code: 'ISO 45001:2018',
    title: 'İş Sağlığı ve Güvenliği (İSG)',
    badge: 'Sıfır İş Kazası Vizyonu',
    icon: 'health_and_safety',
    accentColor: 'text-amber-500 border-amber-500/30',
    badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    scope: 'Sitede görev yapan temizlik, güvenlik ve teknik personelin çalışma sahasında sıfır riskle görev yapmasını sağlayan koruyucu model.',
    auditFrequency: 'Aylık A Sınıfı İSG Uzmanı ve İşyeri Hekimi Saha Denetimi',
    deliverables: [
      'Tüm Personel İçin Yıllık 16 Saat Temel İSG ve Yangın Eğitimi',
      'Asansör Boşluğu, Çatı ve Elektrik Odalarında Yüksek Güvenlik Önlemleri',
      'Kişisel Koruyucu Donanım (KKD) Eksiksiz Zimmetleme ve Takibi',
      'Site Acil Durum Tahliye Planı ve Yılda 1 Kez Genel Tatbikat'
    ]
  },
  {
    id: 'iso-14001',
    code: 'ISO 14001:2015',
    title: 'Çevre Yönetim Sistemi',
    badge: 'Sıfır Atık & Ekolojik Yaşam',
    icon: 'eco',
    accentColor: 'text-emerald-500 border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    scope: 'Ortak alan temizliğinde çevreye ve yer altı sularına zararsız ekolojik deterjanlar, atık ayrıştırma ve enerji verimliliği yönetimi.',
    auditFrequency: 'Çevre Mühendisi Onaylı 6 Aylık Atık ve Kimyasal Raporu',
    deliverables: [
      'Sağlık Bakanlığı Onaylı %100 Biyobozunur Ekolojik Temizlik Ürünleri',
      'Sıfır Atık Yönetmeliği Uyumlu Kaynağında Ayrıştırma Kutuları',
      'Bahçe Sulamasında Yağmur Suyu Hasadı ve Sensörlü Sistemler',
      'Ortak Alan Aydınlatmalarında LED Dönüşümü ile %60 Elektrik Tasarrufu'
    ]
  },
  {
    id: 'tse-hyb',
    code: 'TSE HYB 12850 & 5188',
    title: 'Resmi Hizmet Yeterliliği & Özel Güvenlik',
    badge: 'T.C. İçişleri Bakanlığı & TSE Lisanslı',
    icon: 'gavel',
    accentColor: 'text-rose-500 border-rose-500/30',
    badgeBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
    scope: 'Türk Standardları Enstitüsü Tesis Yönetimi Hizmet Yeterlilik Belgesi ve İçişleri Bakanlığı 5188 Özel Güvenlik Faaliyet İzin Belgesi.',
    auditFrequency: 'Valilik Özel Güvenlik Komisyonu ve TSE Yıllık Denetimi',
    deliverables: [
      '5188 Sayılı Kanun Uyarınca Sertifikalı ve Üniformalı Güvenlik Görevlileri',
      'TSE Onaylı Ekipman, Alet ve Hizmet Donanımı Güvencesi',
      'Kolluk Kuvvetleriyle (Emniyet/Jandarma) Koordineli Asayiş Protokolü',
      'İşletme Projelerinde %100 KMK 37 Hukuki Uyum ve İcra Güvencesi'
    ]
  }
];

export const QUALITY_FAQS: QualityFaqItem[] = [
  {
    question: "Alo Yönetim'in kalite standartları ve ISO belgeleri resmi olarak nasıl doğrulanabilir?",
    answer: "Tüm ISO 41001, ISO 9001, ISO 27001, ISO 45001 ve ISO 14001 sertifikalarımız TÜRKAK (Türk Akreditasyon Kurumu) ve uluslararası IAF üyesi akredite kuruluşlar tarafından verilmiştir. Belgelerimizin üzerinde yer alan sertifika numarası ve karekod (QR code) ile TÜRKAK'ın resmi doğrulama portalı üzerinden veya kurumsal kalite departmanımızdan sorgulama yapabilirsiniz."
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
    answer: "ISO 41001 standartlarımız gereği, sitemize hizmet veren hiçbir taşeron denetimsiz çalışamaz. Asansör bakım firmasının TSE HYB ve Sanayi Bakanlığı yetki belgesi, ilaçlama firmasının Sağlık Bakanlığı Biyosidal Ruhsatı ve tüm çalışanların Mesleki Yeterlilik Kurumu (MYK) belgeleri merkezimiz tarafından arşivlenir ve her işlem sonrasında dijital servis formuyla onaylanır."
  },
  {
    question: "Kat malikleri olarak denetim raporlarını ve kalite puanlarını nereden görebiliriz?",
    answer: "Alo Yönetim mobil sakin uygulaması ve web yönetim portalı üzerinden tüm kat malikleri ve denetçiler; asansör yıllık periyodik muayene yeşil etiket raporlarını, aylık habersiz denetim puanlarını, su analiz sonuçlarını ve banka mutabakatlarını 7/24 PDF olarak görüntüleyebilir ve indirebilir."
  }
];

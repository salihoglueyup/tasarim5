/**
 * 5188 Sayılı Kanun Sitelerde Özel Güvenlik Kurulum & Valilik İzinleri Veri Modeli
 * (siteSecurityCommissionPermitData.ts)
 * 
 * Google Schema.org GovernmentPermit ve TechArticle standartlarında;
 * Apartmanlar, siteler ve rezidanslar için Valilik Özel Güvenlik Komisyonu izin süreci,
 * 5188 yasal mevzuat gereksinimleri ve yöneticiyi kıdem tazminatından koruyan hizmet modeli.
 */

export interface SecurityPermitStep {
  stepNo: number;
  stepName: string;
  authority: string;
  timeframe: string;
  description: string;
  requiredDocuments: string[];
}

export interface SecurityEmploymentComparisonRow {
  aspect: string;
  directEmployment: string; // Kendi Bünyesinde (Bordrolu)
  aloYonetimOutsourcing: string; // Alo Yönetim 5188 Hizmet Alımı
  riskSeverity: 'Kritik Risk' | 'Orta Risk' | 'Sıfır Risk';
}

export const SECURITY_PERMIT_STEPS: SecurityPermitStep[] = [
  {
    stepNo: 1,
    stepName: 'Kat Malikleri Genel Kurulu Özel Güvenlik Kararı',
    authority: 'Kat Malikleri Kurulu (KMK m.34/42)',
    timeframe: 'Genel Kurul Günü',
    description: 'Site veya apartmanda 5188 sayılı kanun kapsamında özel güvenlik istihdam edilmesi ve Valilik Komisyonuna müracaat yetkisinin yöneticiye verilmesine dair karar alınır.',
    requiredDocuments: [
      'Noter Tasdikli Kat Malikleri Kurulu Karar Defteri Sureti',
      'Yönetim Planı (Güvenlik giderlerinin paylaştırılmasına dair madde)',
      'Siteye ait Parsel, Blok ve Bağımsız Bölüm Sayılarını Gösterir Tapu Listesi'
    ]
  },
  {
    stepNo: 2,
    stepName: 'Valilik İl Özel Güvenlik Komisyonu Başvuru Dosyası',
    authority: 'İstanbul Valiliği İl Emniyet Müdürlüğü Özel Güvenlik Şube Müdürlüğü',
    timeframe: '1 – 3 İş Günü',
    description: 'Valilik makamına hitaben yazılan resmi talep dilekçesi, bina güvenlik planı ve talep edilen nokta/personel sayısı dosyalanır.',
    requiredDocuments: [
      'Valilik Başvuru Dilekçesi ve Ekleri',
      'Yöneticinin T.C. Kimlik Kartı ve Noter Yetki Belgesi',
      'Site Yerleşim Krokisi, Giriş-Çıkış Kapıları ve Kamera Yerleşim Şeması',
      'İskan Belgesi (Yapı Kullanma İzni)'
    ]
  },
  {
    stepNo: 3,
    stepName: 'İlçe Emniyet / Jandarma Yerinde Fiziki Güvenlik Keşfi',
    authority: 'Bölge Polis Merkezi Amirliği veya İlçe Jandarma Komutanlığı',
    timeframe: '5 – 10 İş Günü',
    description: 'Yetkili kolluk personeli siteye gelerek nizamiye kulübesi, aydınlatma, CCTV kamera kör noktaları, yangın ve acil çıkış kapılarını yerinde inceler ve keşif raporu tanzim eder.',
    requiredDocuments: [
      'CCTV Kamera Kayıt Cihazı (NVR) En Az 30 Günlük Kayıt Uygunluk Yazısı',
      'Nizamiye Kulübesi Isıtma, Havalandırma ve İletişim Altyapı Tespiti',
      'Giriş Bariyeri ve Plaka Tanıma Sistemi (PTS) Bilgi Notu'
    ]
  },
  {
    stepNo: 4,
    stepName: 'İl Özel Güvenlik Komisyonu Kararı ve İzin Belgesi',
    authority: 'İl Özel Güvenlik Komisyonu (Vali Yardımcısı Başkanlığında)',
    timeframe: '15 – 25 İş Günü',
    description: 'Komisyon toplanarak sitenin fiziki durumuna göre silahsız özel güvenlik personeli (örneğin 2 nokta, 6 personel) çalıştırma iznini karara bağlar ve "Özel Güvenlik İzin Belgesi" düzenler.',
    requiredDocuments: [
      'Komisyon Karar Tutanağı Sureti',
      'Valilik Onaylı Özel Güvenlik İzin Belgesi Aslı',
      'Harç / Ruhsat Bedeli Makbuzu'
    ]
  },
  {
    stepNo: 5,
    stepName: '5188 Lisanslı Personel Tescili ve Mali Sorumluluk Sigortası',
    authority: 'Özel Güvenlik Denetleme Başkanlığı & Hazine Müsteşarlığı',
    timeframe: '2 İş Günü',
    description: 'Çalışacak güvenlik görevlilerinin geçerli 5188 kimlik kartı, sağlık raporu ve sabıka kayıtları incelenir; kişi başı yasal zorunlu Özel Güvenlik Mali Sorumluluk Sigortası tanzim edilir.',
    requiredDocuments: [
      'Özel Güvenlik Görevlilerinin 5188 Kimlik Kartı Suretleri',
      'Özel Güvenlik Mali Sorumluluk Sigortası Poliçesi',
      'İş Sağlığı ve Güvenliği (İSG) Eğitim ve Sağlık Sertifikaları'
    ]
  },
  {
    stepNo: 6,
    stepName: 'ÖGNET Sistemi Proje Bildirimi ve Göreve Başlama',
    authority: 'EGM Özel Güvenlik Bilgi Sistemi (ÖGNET)',
    timeframe: 'Göreve Başlamadan Önce (Aynı Gün)',
    description: 'Emniyet Genel Müdürlüğü ÖGNET portalına görevli personelin TC kimlikleri ve nöbet çizelgesi girilerek görev başlama bildirimi tamamlanır ve üniformalı nöbet başlar.',
    requiredDocuments: [
      'ÖGNET Göreve Başlama Bildirim Formu',
      'Üniforma Onay Belgesi ve Göğüs Arması Tescili',
      'Devriye Tur Kalemi ve Tutanak Defteri'
    ]
  }
];

export const SECURITY_EMPLOYMENT_COMPARISON: SecurityEmploymentComparisonRow[] = [
  {
    aspect: 'Kıdem ve İhbar Tazminatı Yükü',
    directEmployment: 'Yıllarca çalışan personelin yüz binlerce liralık kıdem tazminatı doğrudan kat maliklerine ve yöneticiye biner.',
    aloYonetimOutsourcing: 'Tüm personel Alo Yönetim bordrosunda olduğundan siteden ayrılan personelin kıdem tazminatından siteye 1 Kuruş dahi rücu edilemez.',
    riskSeverity: 'Kritik Risk'
  },
  {
    aspect: 'İş Kazası ve SGK Rücu Davaları',
    directEmployment: 'Nöbette kalp krizi, düşme veya saldırı halinde SGK yöneticinin ve maliklerin şahsi gayrimenkullerine haciz koyabilir.',
    aloYonetimOutsourcing: 'İşveren Alo Yönetim\'dir; kurumsal iş kazası sigortası ve İSG uzmanı denetimiyle site yönetiminin şahsi sorumluluğu sıfırlanır.',
    riskSeverity: 'Kritik Risk'
  },
  {
    aspect: 'Haftalık İzin, Rapor ve Yıllık İzin İkamesi',
    directEmployment: 'Personel hastalandığında veya izne çıktığında nizamiye boş kalır ya da diğer personele çift vardiya fazla mesai yüklenir.',
    aloYonetimOutsourcing: 'Joker/yedek güvenlik havuzumuzdan 45 dakikada aynı lisans ve üniforma standardında ikame personel sahaya verilir; nizamiye asla boş kalmaz.',
    riskSeverity: 'Orta Risk'
  },
  {
    aspect: 'Valilik ve EGM Denetim Cezaları',
    directEmployment: 'ÖGNET bildiriminin gecikmesi veya sigortasız güvenlik çalıştırma halinde 5188 m.19 gereği 50.000 TL+ idari para cezası kesilir.',
    aloYonetimOutsourcing: 'Tüm ÖGNET bildirimleri, sigorta tescilleri ve üniforma izinleri kurumsal hukuk birimimizce takip edilir; %100 cezasızlık garantisi.',
    riskSeverity: 'Kritik Risk'
  },
  {
    aspect: 'Gece Vardiyası Denetimi ve Devriye',
    directEmployment: 'Gece personelin uyuması veya nizamiyeyi terk etmesi durumunda amatör yöneticinin gece denetim yapması fiilen imkansızdır.',
    aloYonetimOutsourcing: 'Mobil denetim araçlarımız gece habersiz çatkapı denetimi yapar; RFID devriye tur kalemi verileri her sabah yönetime raporlanır.',
    riskSeverity: 'Orta Risk'
  },
  {
    aspect: 'Hırsızlık ve Ortak Alan Zararı Sorumluluğu',
    directEmployment: 'Otoparktan araç soyulması veya bisiklet çalınması halinde malikler yöneticiyi suçlar, mahkemelik olunur.',
    aloYonetimOutsourcing: 'Özel Güvenlik Mali Sorumluluk Poliçemiz devreye girerek ispatlanan zararları doğrudan sigorta teminatından karşılar.',
    riskSeverity: 'Kritik Risk'
  }
];

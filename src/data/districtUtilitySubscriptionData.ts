/**
 * 39 İlçe İSKİ, BEDAŞ/AYEDAŞ & İGDAŞ Kurumsal Altyapı ve Abonelik Devir Veri Modeli
 * (districtUtilitySubscriptionData.ts)
 * 
 * Google Schema.org GovernmentService, HowTo ve Service standartlarında;
 * Apartmanlar, siteler ve ticari tesisler için ortak alan elektrik, su ve doğalgaz sayaç devirleri,
 * şantiyeden meskene geçiş ve güvence bedeli optimizasyon protokolü.
 */

export interface UtilityTransferStep {
  stepNumber: number;
  stepTitle: string;
  actionRequired: string;
  responsibleParty: string;
}

export interface UtilityProviderProfile {
  providerId: 'bedas' | 'ayedas' | 'iski' | 'igdas';
  providerName: string;
  utilityType: 'Elektrik Dağıtım & Perakende' | 'Su & Kanalizasyon' | 'Doğalgaz Dağıtım';
  jurisdictionSide: 'Avrupa Yakası' | 'Anadolu Yakası' | 'Tüm İstanbul';
  serviceType: string;
  requiredDocuments: string[];
  depositFeePolicy: string;
  steps: UtilityTransferStep[];
  criticalRisksIfNotDone: string;
  aloYonetimGuarantee: string;
}

export const UTILITY_SUBSCRIPTION_PROVIDERS: UtilityProviderProfile[] = [
  {
    providerId: 'bedas',
    providerName: 'BEDAŞ (Boğaziçi Elektrik Dağıtım A.Ş.)',
    utilityType: 'Elektrik Dağıtım & Perakende',
    jurisdictionSide: 'Avrupa Yakası',
    serviceType: 'Ortak Mahal Trafo, Asansör, Aydınlatma ve Hidrofor Elektrik Sayaç Devri / Şantiye Elektriğinden Meskene Geçiş',
    requiredDocuments: [
      'Noter Tasdikli Kat Malikleri Kurulu Karar Defteri (Yönetici Seçimi & Yetkilendirme Kararı)',
      'Yöneticinin Nüfus Cüzdanı Fotokopisi ve İmza Beyannamesi',
      'Binaya ait İskan Belgesi (Yapı Kullanma İzin Belgesi)',
      'Tesis Tesisat Numarası veya Tekil Kod (Mevcut elektrik faturası)',
      'DASK Poliçesi (Ortak alan yangın/deprem teminatı)',
      'Kompanzasyon Panosu Yetkili SMM Elektrik Mühendisi Uygunluk Raporu'
    ],
    depositFeePolicy: 'Kurumsal yönetimlerde BEDAŞ güvence bedeli taksitlendirilebilir veya banka teminat mektubu ile nakit blokajı önlenebilir.',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Mevcut Şantiye Sayacı Endeks Tespiti & Tutanak',
        actionRequired: 'Müteahhit veya eski yönetimle sayaç mahallinde son endeks (T1, T2, T3, Ri, Rc) fotoğraflı tutanakla sabitlenir.',
        responsibleParty: 'Teknik Müdür & BEDAŞ Saha Ekipleri'
      },
      {
        stepNumber: 2,
        stepTitle: 'BEDAŞ İşletme Müdürlüğü Başvurusu',
        actionRequired: 'İlgili ilçe BEDAŞ Müşteri Operasyon Merkezi üzerinden Ortak Alan Mesken Tarifesi talebi açılır.',
        responsibleParty: 'Alo Yönetim Hukuk ve İdari İşler'
      },
      {
        stepNumber: 3,
        stepTitle: 'Bağlantı Anlaşması ve Güvence Bedeli Tesis Edilmesi',
        actionRequired: 'Yönetim adına sözleşme imzalanır; şantiye tarifesi (pahalı tarife) sonlandırılarak ortak mesken tarifesi yürürlüğe girer.',
        responsibleParty: 'Site Yöneticisi'
      },
      {
        stepNumber: 4,
        stepTitle: 'Otomatik Sayaç Okuma Sistemi (OSOS) ve Kompanzasyon Aktivasyonu',
        actionRequired: 'Reaktif ceza riskini önlemek için uzaktan sayaç okuma modemi ve kompanzasyon rölesi devreye alınır.',
        responsibleParty: 'Alo Yönetim Enerji Mühendisliği'
      }
    ],
    criticalRisksIfNotDone: 'Şantiye tarifesinde kalındığında elektrik faturaları %60-80 daha yüksek ödenir; kompanzasyon devri yapılmazsa aylık on binlerce lira reaktif ceza faturaya yansır.',
    aloYonetimGuarantee: 'BEDAŞ devir işlemlerini 48 saatte tamamlayarak site bütçesini şantiye tarifesi ve reaktif cezalardan %100 koruyoruz.'
  },
  {
    providerId: 'ayedas',
    providerName: 'AYEDAŞ (İstanbul Anadolu Yakası Elektrik Dağıtım A.Ş.)',
    utilityType: 'Elektrik Dağıtım & Perakende',
    jurisdictionSide: 'Anadolu Yakası',
    serviceType: 'Anadolu Yakası Sitelerinde Ortak Sayaç Devri, Enerji Müsaadesi ve Güç Artırımı',
    requiredDocuments: [
      'Site Yönetimi Karar Defteri Sureti (Noter Tasdikli)',
      'Yönetici T.C. Kimlik Kartı ve Yetki Yazısı',
      'Yapı Kullanma İzin Belgesi (İskan)',
      'Sayaç Seri Numarası ve Tesisat / Abone Numarası',
      'Bağımsız Bölüm Sayısı ve Toplam Kurulu Güç (kW) Tablosu'
    ],
    depositFeePolicy: 'Site adına açılan vadesiz hesap üzerinden doğrudan teminat mektubu veya taksitli nakit güvence opsiyonu.',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'AYEDAŞ Bölge Müdürlüğü Ön Kayıt',
        actionRequired: 'Kadıköy, Kartal veya Ümraniye AYEDAŞ merkezlerinden abonelik devir randevusu oluşturulur.',
        responsibleParty: 'Alo Yönetim Saha Direktörlüğü'
      },
      {
        stepNumber: 2,
        stepTitle: 'Fiziki Tesisat Muayenesi ve Mühürleme',
        actionRequired: 'AYEDAŞ teknik ekipleri panoyu ve mühürleri kontrol ederek devir onay raporu tanzim eder.',
        responsibleParty: 'AYEDAŞ Denetmeni & Tesis Teknik Sorumlusu'
      },
      {
        stepNumber: 3,
        stepTitle: 'Perakende Satış Sözleşmesi İmzalanması',
        actionRequired: 'Enerjisa / AYEDAŞ perakende şirketiyle indirimli serbest tüketici veya mesken ortak tarifesi imzalanır.',
        responsibleParty: 'Site Yöneticisi'
      },
      {
        stepNumber: 4,
        stepTitle: 'Alo Yönetim Telemetri Entegrasyonu',
        actionRequired: 'Sayaç endeksleri günlük olarak uzaktan telemetri yazılımımıza bağlanır.',
        responsibleParty: 'Alo Yönetim Enerji İzleme Masası'
      }
    ],
    criticalRisksIfNotDone: 'Önceki borçlar yüzünden ana trafonun kesilmesi, asansörlerin ve yangın hidroforunun enerjisiz kalarak can güvenliği tehlikesi oluşturması.',
    aloYonetimGuarantee: 'AYEDAŞ ile kurumsal protokolümüz sayesinde 0 kesinti riskiyle hızlı abone devri ve indirimli elektrik tarifesi temini.'
  },
  {
    providerId: 'iski',
    providerName: 'İSKİ (İstanbul Su ve Kanalizasyon İdaresi)',
    utilityType: 'Su & Kanalizasyon',
    jurisdictionSide: 'Tüm İstanbul',
    serviceType: 'Merkezi Su Deposu, Hidrofor, Yangın Suyu ve Bahçe Sulama Sayaç Devri',
    requiredDocuments: [
      'Noter Onaylı Yönetici Seçim Kararı',
      'Yöneticinin Kimlik Belgesi',
      'İskan Belgesi (Yapı Kullanma İzni)',
      'Mevcut İSKİ Mukavele / Sayaç Numarası',
      'Çevre ve Şehircilik Bakanlığı Kat Mülkiyeti Tapu Listesi'
    ],
    depositFeePolicy: 'İSKİ kurumsal ortak alan tarifesinde teminat bedeli metreküp tüketim projeksiyonuna göre en düşük katsayıdan hesaplanır.',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Şantiye / Kuyu Suyu Ayrımı ve Sayaç Kontrolü',
        actionRequired: 'Bahçe sulama ile bina içi hidrofor sayaçlarının ayrımı incelenir; atıksu bedeli muafiyeti araştırılır.',
        responsibleParty: 'Alo Yönetim Sıhhi Tesisat Mühendisi'
      },
      {
        stepNumber: 2,
        stepTitle: 'İSKİ Şube Müdürlüğü Başvurusu ve Devir Sözleşmesi',
        actionRequired: 'İlgili ilçe İSKİ şubesine müracaat edilerek şantiye suyu aboneliği kapatılır, yönetim adına ortak mesken aboneliği açılır.',
        responsibleParty: 'Site Yöneticisi'
      },
      {
        stepNumber: 3,
        stepTitle: 'Ana Depo Dezenfeksiyon ve Numune Analizi',
        actionRequired: 'Su deposu kimyasal olarak dezenfekte edilir ve İSKİ akredite laboratuvarına temizlik raporu sunulur.',
        responsibleParty: 'Alo Yönetim Hijyen Ekibi'
      }
    ],
    criticalRisksIfNotDone: 'Şantiye suyu tarifesinde kalındığında kat kat fazla su faturası; kuyu suyu kullanılıp İSKİ\'ye bildirilmezse kaçak atıksu cezası kesilmesi.',
    aloYonetimGuarantee: 'Bahçe sulama alt sayaç ayrımı ile atıksu bedelinden muafiyet sağlanarak sitenize yılda %25 su tasarrufu kazandırılır.'
  },
  {
    providerId: 'igdas',
    providerName: 'İGDAŞ (İstanbul Gaz Dağıtım San. ve Tic. A.Ş.)',
    utilityType: 'Doğalgaz Dağıtım',
    jurisdictionSide: 'Tüm İstanbul',
    serviceType: 'Merkezi Isıtma Kazan Dairesi ve Merkezi Sıcak Su Doğalgaz Sayaç Devri',
    requiredDocuments: [
      'Noter Onaylı Karar Defteri (Doğalgaz Abonelik Yetkisi Kararı)',
      'Yönetici Nüfus Cüzdanı ve Yetki Belgesi',
      'Yetkili Makine Mühendisinden İGDAŞ Onaylı Tesisat Projesi',
      'Kazan Dairesi Gaz Kaçak ve Havalandırma Uygunluk Raporu',
      'İskan Belgesi veya Doğalgaz Kullanım İzin Yazısı',
      'Zorunlu Ortak Alan Yangın ve Patlama Sigortası Poliçesi'
    ],
    depositFeePolicy: 'İGDAŞ merkezi kazan dairelerinde yüksek güvence bedelleri için banka teminat mektubu kabul edilmektedir.',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Kazan Dairesi Emniyet ve Sızdırmazlık Denetimi',
        actionRequired: 'İGDAŞ randevusu öncesinde gaz kaçak selenoid vanası, patlama kapakları ve menfezler kontrol edilir.',
        responsibleParty: 'Alo Yönetim Mekanik Teknik Servis'
      },
      {
        stepNumber: 2,
        stepTitle: 'İGDAŞ Sözleşmesi ve Güvence Mektubu Teslimi',
        actionRequired: 'İGDAŞ Hizmet Binasında merkezi sistem abonelik sözleşmesi imzalanarak teminat mektubu verilir.',
        responsibleParty: 'Site Yöneticisi'
      },
      {
        stepNumber: 3,
        stepTitle: 'Gaz Açım Randevusu ve Tesisat Mühür Açılışı',
        actionRequired: 'İGDAŞ kontrol mühendisi eşliğinde gaz açılarak brülör ilk ateşleme testi gerçekleştirilir.',
        responsibleParty: 'İGDAŞ Mühendisi & Tesis Mekanik Teknisyeni'
      }
    ],
    criticalRisksIfNotDone: 'Kış ortasında gazın kesilmesi, usulsüz kullanım sebebiyle binaya yüz binlerce liralık gaz kesme/usulsüzlük cezası tatbik edilmesi.',
    aloYonetimGuarantee: 'İGDAŞ yetkili mühendis kadromuzla kazan dairelerinde 0 eksikle ilk seferde gaz açım onayı ve güvenli kış başlangıcı.'
  }
];

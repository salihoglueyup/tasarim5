/**
 * 39 İlçe Deprem, Yangın ve Afet Acil Durum Eylem Planı Veri Modeli
 * (districtEmergencyPreparednessData.ts)
 * 
 * Google Schema.org EmergencyService, HowTo ve SpecialAnnouncement standartlarında;
 * İstanbul'un 39 ilçesindeki siteler ve rezidanslar için zemin özellikleri,
 * AFAD toplanma alanları, itfaiye/hastane lojistiği ve acil durum eylem protokolleri.
 */

export interface DistrictEmergencyProfile {
  districtSlug: string;
  districtName: string;
  riskZone: '1. Derece Yüksek Sismik Risk' | '2. Derece Orta-Yüksek Sismik Risk' | '3. Derece Orta Sismik Risk' | 'Kaya Zemin / Düşük Zemin İvmesi';
  soilClassification: string;
  afadAssemblyPointsCount: number;
  primaryAssemblyAreas: string[];
  localFireStation: string;
  emergencyFirstResponseCenter: string;
  criticalBuildingAgeRatioPre2000: string;
  mandatoryShelterStandard: string;
  aloYonetimDisasterPlanProtocol: string;
  checklistItems: string[];
}

export const DISTRICT_EMERGENCY_PROFILES: Record<string, DistrictEmergencyProfile> = {
  // --- ANADOLU YAKASI (14 İLÇE) ---
  kadikoy: {
    districtSlug: 'kadikoy',
    districtName: 'Kadıköy',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Sahil bandı ve Kurbağalıdere havzası alüvyon zemin; üst mahalleler kalker/killi formasyon.',
    afadAssemblyPointsCount: 94,
    primaryAssemblyAreas: ['Göztepe 60. Yıl Parkı', 'Kalamış Atatürk Parkı', 'Özgürlük Parkı (Selamiçeşme)', 'Yoğurtçu Parkı'],
    localFireStation: 'Kadıköy İtfaiye Grup Amirliği (Moda & Merdivenköy Müfrezeleri)',
    emergencyFirstResponseCenter: 'Göztepe Prof. Dr. Süleyman Yalçın Şehir Hastanesi',
    criticalBuildingAgeRatioPre2000: '%64 (Kentsel dönüşüm hızla devam etmektedir)',
    mandatoryShelterStandard: '3194 İmar Kanunu & KMK m.4 uyarınca bodrum sığınakları radyoaktif ve gaz sızdırmaz fitilli, tahliye yolları eşyasız tutulmalıdır.',
    aloYonetimDisasterPlanProtocol: 'Kadıköy merkez ofisimizden 10 dakikada acil mobil afet koordinasyon timi, jeneratörlü aydınlatma kiti, sismik doğalgaz kesici doğrulaması ve afet toplanma kiti dağıtımı.',
    checklistItems: [
      'Deprem anında asansörlerin en yakın kata otomatik inip kapı açma (deprem sensörü) testi',
      'Merkezi doğalgaz ana giriş sismik selenoid vanası manuel ve otomatik tetik testi',
      'Yangın hidroforunun 72 saatlik dizel jeneratör beslemesi ve 200 ton yangın rezerv suyu yedeği',
      'Site ortak sığınağında 72 saatlik ilk yardım, battaniye, kuru gıda ve el feneri kiti kontrolü'
    ]
  },
  atasehir: {
    districtSlug: 'atasehir',
    districtName: 'Ataşehir',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Sağlam kaya ve killi şist zemin; vadilerde yer yer gevşek dolgu tabakası.',
    afadAssemblyPointsCount: 78,
    primaryAssemblyAreas: ['Ataşehir Kent Meydanı', 'Deniz Gezmiş Parkı', 'Cumhuriyet Parkı', 'İçerenköy Muhtarlık Parkı'],
    localFireStation: 'Ataşehir İtfaiye İstasyonu (Barbaros Mahallesi)',
    emergencyFirstResponseCenter: 'Fatih Sultan Mehmet Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%42 (Finans Merkezi ve Batı Ataşehir yeni tünel kalıp binalardan oluşur)',
    mandatoryShelterStandard: 'Rezidans kulelerinde dikey yangın kaçış basınçlandırma fanlarının kesintisiz UPS desteği zorunludur.',
    aloYonetimDisasterPlanProtocol: 'Finans Merkezi çevresi rezidanslarda helikopter iniş pisti koordinasyonu, çift jeneratör yedekleme protokolü ve 15 dakikada yerinde kriz masası kuruluşu.',
    checklistItems: [
      'Yüksek katlı bloklarda yangın merdiveni duman basınçlandırma fanlarının otomatik start testi',
      'Acil anons sisteminin tüm katlarda ve otoparklarda kesintisiz çalışırlık kontrolü',
      'Sığınak hava filtreleri ve acil kaçış tüneli kapaklarının kilit kontrolü',
      'Bina içi acil toplanma alanı yönergelerinin dijital ekranlarda ve panolarda güncellenmesi'
    ]
  },
  uskudar: {
    districtSlug: 'uskudar',
    districtName: 'Üsküdar',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Boğaz yamaçları sağlam kalker/andezit kayaç zemin; kıyı şeridi dolgu zemin.',
    afadAssemblyPointsCount: 88,
    primaryAssemblyAreas: ['Validebağ Korusu', 'Fethi Paşa Korusu', 'Çamlıca Tepesi Sosyal Alanı', 'Harem Açık Otopark Alanı'],
    localFireStation: 'Üsküdar İtfaiye Grup Amirliği (Zeynep Kamil Müfrezesi)',
    emergencyFirstResponseCenter: 'Haydarpaşa Numune Eğitim ve Araştırma Hastanesi & Sultan 2. Abdülhamid Han EAH',
    criticalBuildingAgeRatioPre2000: '%59 (Yavuztürk, Ünalan ve Çengelköy eğimli yapı stoğu)',
    mandatoryShelterStandard: 'Tarihi eğimli arazilerde istinat duvarı sismik yük dayanımı ve drenaj pompalarının acil jeneratör entegrasyonu.',
    aloYonetimDisasterPlanProtocol: 'Boğaz hattı yamaç sitelerinde istinat duvarı telemetrik çatlak takibi, afet konteyneri ve kriz telsiz ağı yönetimi.',
    checklistItems: [
      'İstinat duvarı drenaj boruları ve dilatasyon derzlerinin mevsimlik statik kontrolü',
      'Sığınak ve bodrum su tahliye dalgıç pompalarının yedekli enerji beslemesi testi',
      'Boğaz yamaçlarındaki sitelerde acil kaçış yollarının açık ve aydınlatılmış tutulması',
      'Bina afet çantalarının ve arama-kurtarma krikolarının hazır bulundurulması'
    ]
  },
  umraniye: {
    districtSlug: 'umraniye',
    districtName: 'Ümraniye',
    riskZone: '3. Derece Orta Sismik Risk',
    soilClassification: 'Sağlam kaya ve grovak formasyon; İstanbul\'un deprem ivmesi açısından en dayanıklı kayaç zeminlerinden biri.',
    afadAssemblyPointsCount: 110,
    primaryAssemblyAreas: ['Ümraniye Millet Bahçesi', 'Tantavi Parkı', 'Ihlamurkuyu Şehitler Parkı', 'Tepeüstü Meydan Parkı'],
    localFireStation: 'Ümraniye İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Ümraniye Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%38 (Alemdağ ve Ihlamurkuyu aksında kentsel dönüşüm yüksek orandadır)',
    mandatoryShelterStandard: 'Toplu sitelerde sığınak alanlarının havalandırma menfezlerinin kimyasal gaz filtreleriyle donatılması şarttır.',
    aloYonetimDisasterPlanProtocol: 'Geniş parsel sitelerde açık toplanma çadırı stokları, seyyar aydınlatma projektörleri ve uydu haberleşme desteği.',
    checklistItems: [
      'Geniş bahçeli sitelerde AFAD çadır kurulum alanlarının işaretlenmesi ve elektrik besleme panoları',
      'Doğalgaz kazan dairesi patlama kapakları ve acil selenoid vana kesme denetimi',
      'Merkezi hidrofor deposunun deprem sonrasında 5 gün içme/kullanma suyu sağlama klorlama testi',
      'Sakinler için afet durum SMS ve mobil uygulama acil durum butonu bilgilendirmesi'
    ]
  },
  maltepe: {
    districtSlug: 'maltepe',
    districtName: 'Maltepe',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Sahil dolgu bandı ve alt mahalleler alüvyon; E-5 üstü Başıbüyük ve Zümrütevler sağlam kayaç.',
    afadAssemblyPointsCount: 92,
    primaryAssemblyAreas: ['Maltepe Sahil Etkinlik Alanı', 'Cevizli Tugay Parkı', 'Süreyyapaşa Parkı', 'Zümrütevler Meydanı'],
    localFireStation: 'Maltepe İtfaiye İstasyonu (Bağlarbaşı)',
    emergencyFirstResponseCenter: 'Kartal Dr. Lütfi Kırdar Şehir Hastanesi & Marmara Üni. Başıbüyük Kampüsü',
    criticalBuildingAgeRatioPre2000: '%56 (Sahil şeridi ve Bağdat Caddesi devamında dönüşüm gerektiren yapılar)',
    mandatoryShelterStandard: 'Zemin sıvılaşması riski olan bölgelerde sığınak taban yalıtımı ve sismik su tahliye pompaları zorunludur.',
    aloYonetimDisasterPlanProtocol: 'Sahil bandı sitelerimizde dalga ve sıvılaşma riskine karşı acil durum kiti, üst kat toplanma protokolü ve jeneratörlü acil tahliye.',
    checklistItems: [
      'Zemin seviyesi altındaki otopark ve trafo merkezlerinde su basma dedektörleri testi',
      'Tüm bloklarda çift emniyetli sismik gaz kesme vanalarının testi',
      'Yangın söndürme tüplerinin ve hidrant vanalarının yıllık basınç kontrolü',
      'Site sakinleri acil durum aile iletişim kartlarının dağıtılması'
    ]
  },
  kartal: {
    districtSlug: 'kartal',
    districtName: 'Kartal',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Kıyı kesimleri dolgu ve ayrışmış kumtaşı; Yakacık ve Uğur Mumcu sırtları sağlam andezit kaya.',
    afadAssemblyPointsCount: 86,
    primaryAssemblyAreas: ['Kartal Sahil Meydanı', 'Dragos Sosyal Tesisleri Parkı', 'Uğur Mumcu Kent Meydanı', 'Yakacık Mesire Alanı'],
    localFireStation: 'Kartal İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Kartal Dr. Lütfi Kırdar Şehir Hastanesi & Koşuyolu Yüksek İhtisas EAH',
    criticalBuildingAgeRatioPre2000: '%52 (Yakacık ve Soğanlık yeni projeler; sahil kesimi dönüştürülmektedir)',
    mandatoryShelterStandard: 'Yüksek katlı kulelerde yangın dikey kaçış şaftları ve sığınak acil aydınlatma sürelerinin en az 180 dakika olması.',
    aloYonetimDisasterPlanProtocol: 'Dragos ve sahil hattında 24 saat acil mobil jeneratör desteği, afet tahliye tatbikatları ve tam donanımlı arama kurtarma dolapları.',
    checklistItems: [
      'Asansör kuyularında sismik sensör testleri ve karşı ağırlık halat salınım emniyeti',
      'Acil aydınlatma armatürlerinin batarya dayanım süresi (min 3 saat) ölçümü',
      'Ortak alan cam cephelerinde sismik kırılma önleyici emniyet filmlerinin kontrolü',
      'Site yönetim kurulu ve afet timi görev dağılım şemasının güncellenmesi'
    ]
  },
  pendik: {
    districtSlug: 'pendik',
    districtName: 'Pendik',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Sahil dolgusu ve vadi tabanları gevşek zemin; Kurtköy ve Çamlık aksı sağlam sert kireçtaşı ve killi kaya.',
    afadAssemblyPointsCount: 124,
    primaryAssemblyAreas: ['Pendik Sahil Meydanı', 'Yenişehir Millet Bahçesi', 'Güzelyalı Sahil Parkı', 'Kurtköy Kent Parkı'],
    localFireStation: 'Pendik İtfaiye Grup Amirliği & Kurtköy Müfrezesi',
    emergencyFirstResponseCenter: 'Marmara Üniversitesi Pendik Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%44 (Kurtköy ve Yenişehir bölgesi deprem yönetmeliğine uygun yeni sitelerdir)',
    mandatoryShelterStandard: 'Geniş nüfuslu sitelerde sığınak alanının kişi başı en az 1 m² havalandırılabilir alan standardına uyumu.',
    aloYonetimDisasterPlanProtocol: 'Sabiha Gökçen Havalimanı lojistik koridorundaki sitelerimizde hızlı acil erişim, uydu telsiz sistemi ve teknik müdahale timi.',
    checklistItems: [
      'Merkezi yangın alarm panosunun siren ve flaşör hatlarının zon bazlı tetikleme testi',
      'Sığınak taze hava fanlarının partikül filtre temizliği',
      'Otopark otomatik yangın söndürme sprinkler vanalarının manometre kontrolü',
      'Acil su deposu seviye otomasyonunun 7/24 telemetri izlemesi'
    ]
  },
  tuzla: {
    districtSlug: 'tuzla',
    districtName: 'Tuzla',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Kuzey Anadolu Fayı fay hattına yakın sahil şeridi ve Aydınlı vadisi; Tepeören/Akfırat sağlam zemin.',
    afadAssemblyPointsCount: 65,
    primaryAssemblyAreas: ['Tuzla Sahil Tören Alanı', 'Mercan Parkı', 'Aydınlı Kent Parkı', 'Şelale Eğitim Parkı'],
    localFireStation: 'Tuzla İtfaiye İstasyonu & Orhanlı Sanayi Müfrezesi',
    emergencyFirstResponseCenter: 'Tuzla Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%39 (Tersaneler bölgesi ve villa yerleşimleri yeni yapı stoğuna sahiptir)',
    mandatoryShelterStandard: 'Sanayi ve deniz etkisine karşı sığınak menfezlerinde korozyon önleyici özel galvaniz panjur kullanımı.',
    aloYonetimDisasterPlanProtocol: 'Endüstriyel tesis yakınlığı sebebiyle kimyasal gaz kaçak dedektörleri, sığınak tam izolasyon protokolü ve acil oksijen tüpleri.',
    checklistItems: [
      'Sığınak hava girişinde NBC filtrelerinin raf ömrü ve sızdırmazlık contalarının kontrolü',
      'Tesis çevresi yangın hidrant hattı statik basıncının (min 6 bar) ölçümü',
      'Bina jeneratör yakıt tankının afet anında en az 48 saat kesintisiz çalışacak seviyede tutulması',
      'Toplanma alanında acil jeneratör priz çıkışlarının testi'
    ]
  },
  cekmekoy: {
    districtSlug: 'cekmekoy',
    districtName: 'Çekmeköy',
    riskZone: 'Kaya Zemin / Düşük Zemin İvmesi',
    soilClassification: 'İstanbul\'un sismik açıdan en güvenli granit ve kireçtaşı kayaç zeminlerinden biri.',
    afadAssemblyPointsCount: 52,
    primaryAssemblyAreas: ['Çekmeköy Doğa Parkı', 'Taşdelen Mesire Alanı', 'Ömerli Parkı', 'Mimar Sinan Meydanı'],
    localFireStation: 'Çekmeköy İtfaiye İstasyonu (Taşdelen)',
    emergencyFirstResponseCenter: 'Çekmeköy Devlet Hastanesi & Sancaktepe Şehit Prof. Dr. İlhan Varank EAH',
    criticalBuildingAgeRatioPre2000: '%24 (Yapı stoğunun büyük çoğunluğu 2007/2018 deprem yönetmeliğine tam uygundur)',
    mandatoryShelterStandard: 'Orman sınırındaki sitelerde sığınak ve ortak alanların orman yangınlarına karşı sprinkler perdesiyle korunması.',
    aloYonetimDisasterPlanProtocol: 'Orman yangını erken algılama termal sensörleri, çatı yangın hidrant hatları ve afet toplanma lojistiği.',
    checklistItems: [
      'Site orman sınırı boyunca yangın emniyet şeritlerinin temizliği ve su nozulları testi',
      'Bahçe sulama hidroforunun yangın anında itfaiye su besleme rekoruna baypas edilebilmesi',
      'Deprem anında otomatik kapıların ve bariyerlerin serbest konuma geçme testi',
      'Afet durumunda site içi acil aydınlatma direklerinin akü kontrolleri'
    ]
  },
  sancaktepe: {
    districtSlug: 'sancaktepe',
    districtName: 'Sancaktepe',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Kireçtaşı ve killi kireçtaşı kaya tabakası; Samandıra vadisinde yer yer sıkışabilir kil.',
    afadAssemblyPointsCount: 74,
    primaryAssemblyAreas: ['Sancaktepe Meydan Parkı', 'Samandıra Kültür Parkı', 'Sarıgazi Demokrasi Caddesi Parkı', 'Paşaköy Sosyal Alanı'],
    localFireStation: 'Sancaktepe İtfaiye İstasyonu',
    emergencyFirstResponseCenter: 'Sancaktepe Şehit Prof. Dr. İlhan Varank Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%31 (2008 sonrası ilçe olan bölgede yeni site ve toplu konut yoğunluğu yüksektir)',
    mandatoryShelterStandard: 'Toplu konut projelerinde ortak sığınak elektrik panolarında kaçak akım ve yangın koruma röleleri bulunması.',
    aloYonetimDisasterPlanProtocol: 'Şehir hastanesi yakınlığında kesintisiz ambulans ve itfaiye giriş güzergahı emniyeti, 7/24 açık acil koridor.',
    checklistItems: [
      'Yangın acil kaçış koridorlarında kilitli veya eşya ile kapatılmış kapı bulunmadığının denetimi',
      'Merkezi hidrofor pompalarında basma yüksekliği ve yedekleme otomasyonu testi',
      'Elektrik ana panolarında termal kamera ile gevşek klemens yangın taraması',
      'Site sakinlerine yılda bir uygulamalı yangın söndürme ve tahliye tatbikatı yapılması'
    ]
  },
  beykoz: {
    districtSlug: 'beykoz',
    districtName: 'Beykoz',
    riskZone: 'Kaya Zemin / Düşük Zemin İvmesi',
    soilClassification: 'Masif volkanik kayaç ve sert kalker formasyon; Boğaz yamaçlarında eğimli zemin.',
    afadAssemblyPointsCount: 58,
    primaryAssemblyAreas: ['Beykoz Çayırı', 'Kanlıca Meydanı', 'Kavacık Yaşam Parkı', 'Göksu Parkı'],
    localFireStation: 'Beykoz İtfaiye Grup Amirliği & Kavacık Müfrezesi',
    emergencyFirstResponseCenter: 'Beykoz Devlet Hastanesi (Paşabahçe & Tepeüstü Ek Binaları)',
    criticalBuildingAgeRatioPre2000: '%51 (Kavacık ve Beykoz Konakları yeni; merkez ve kıyı mahalleler tarihi yapı stoğu)',
    mandatoryShelterStandard: 'Orman içi sitelerde ve yalılarda sığınak acil çıkış tünellerinin açık alana açılması ve kilitlenmemesi.',
    aloYonetimDisasterPlanProtocol: 'Geniş araziye yayılan villa sitelerinde merkezi kriz yönetim merkezi, yüksek kapasiteli jeneratör ve yangın söndürme havuzları.',
    checklistItems: [
      'Villa sitelerinde orman yangınına karşı yangın pompası basınç testi (12 bar)',
      'Jeneratör motor yağ ve antifriz kış testleri, yakıt rezervi güvencesi',
      'Eğimli arazilerde heyelan riskine karşı istinat drenaj kanallarının temizliği',
      'Site içi telsiz iletişim frekansının kriz anında test edilmesi'
    ]
  },
  sultanbeyli: {
    districtSlug: 'sultanbeyli',
    districtName: 'Sultanbeyli',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Grovak, kumtaşı ve killi şist zemin tabakası; Aydos tepesi eteklerinde sert kayaç.',
    afadAssemblyPointsCount: 62,
    primaryAssemblyAreas: ['Sultanbeyli Kent Meydanı', 'Gölet Parkı', 'Aydos Mesire Parkı', 'Battalgazi Parkı'],
    localFireStation: 'Sultanbeyli İtfaiye İstasyonu',
    emergencyFirstResponseCenter: 'Sultanbeyli Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%48 (İmar barışı ve kentsel dönüşümle güçlendirilen yapılar)',
    mandatoryShelterStandard: 'Bina altı sığınaklarda nem ve rutubete karşı havalandırma fanlarının periyodik çalıştırılması.',
    aloYonetimDisasterPlanProtocol: 'Aydos orman eteği sitelerimizde yangın erken müdahale timi, sığınak jeneratör bağlantısı ve afete hazır site sertifikasyonu.',
    checklistItems: [
      'Doğalgaz boru hatlarında sismik esnek kompansatör körüklerinin kontrolü',
      'Merkezi su deposunda asgari 3 günlük acil kullanım suyu rezerv seviyesi kilidi',
      'Sığınak kapılarının basınca dayanıklı çift contalı mekanizmasının yağlanması',
      'Acil tahliye merdivenlerinde kaydırmaz bantların yenilenmesi'
    ]
  },
  sile: {
    districtSlug: 'sile',
    districtName: 'Şile',
    riskZone: 'Kaya Zemin / Düşük Zemin İvmesi',
    soilClassification: 'Karadeniz kıyısı sert kumtaşı, kireçtaşı ve sağlam kaya tabakası; sismik faylara en uzak İstanbul bölgesi.',
    afadAssemblyPointsCount: 34,
    primaryAssemblyAreas: ['Şile Kent Meydanı', 'Kumbaba Parkı', 'Ağva Sahil Parkı', 'Liman Sosyal Alanı'],
    localFireStation: 'Şile İtfaiye İstasyonu & Ağva Müfrezesi',
    emergencyFirstResponseCenter: 'Şile Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%35 (Müstakil villalar ve yazlık siteler çoğunluktadır)',
    mandatoryShelterStandard: 'Kış aylarında boş kalan sitelerde sığınak ve teknik odalarda donmaya karşı koruma ısıtıcıları.',
    aloYonetimDisasterPlanProtocol: 'Kış fırtınaları ve elektrik hat kopmalarına karşı 72 saat kesintisiz jeneratör yakıt ikmal garantisi ve su basma telemetrisi.',
    checklistItems: [
      'Fırtına kaynaklı çatı ve güneş paneli kopmalarına karşı bağlantı tork testleri',
      'Yıldırım çarpmasına karşı aktif paratoner topraklama ölçümü (< 5 Ohm)',
      'Otomatik jeneratör transfer panosu (ATS) kış yükleme testi',
      'Kuyu suyu pompası donma emniyeti ve acil tahliye vanaları kontrolü'
    ]
  },
  adalar: {
    districtSlug: 'adalar',
    districtName: 'Adalar',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Masif kuvarsit ve sert metamorfik kayaç zemin; ancak Kuzey Anadolu Fay Hattı Adalar segmentine sıfır konumda.',
    afadAssemblyPointsCount: 28,
    primaryAssemblyAreas: ['Büyükada Atatürk Meydanı', 'Heybeliada Değirmenburnu', 'Burgazada Meydanı', 'Kınalıada Sahil Parkı'],
    localFireStation: 'Büyükada İtfaiye İstasyonu & Heybeliada / Kınalıada Müfrezeleri',
    emergencyFirstResponseCenter: 'Büyükada Acil Sağlık İstasyonu & Kartal Şehir Hastanesi Deniz Ambulansı',
    criticalBuildingAgeRatioPre2000: '%78 (Tarihi ahşap köşkler ve kargir konaklar; özel yangın koruması zorunludur)',
    mandatoryShelterStandard: 'Ahşap ve tarihi tescilli yapılarda yangın kaçış yolları alev geciktirici emprenye malzemeyle kaplanmalıdır.',
    aloYonetimDisasterPlanProtocol: 'Ada lojistiğinde deniz ambulansı ve itfaiye botuyla entegre acil durum iletişim ağı, bağımsız su sarnıcı yangın hidroforları.',
    checklistItems: [
      'Tarihi köşklerde ve sitelerde kıvılcım algılayıcı optik duman dedektörleri testi',
      'Yangın hidrant hortumlarının ve deniz suyu basma pompalarının çalışırlık testi',
      'Ahşap binalarda elektrik tesisatı kaçak akım rölelerinin (30mA ve 300mA) test edilmesi',
      'Her mülkte taşınabilir yangın söndürme tüplerinin güncelliğinin sağlanması'
    ]
  },

  // --- AVRUPA YAKASI (25 İLÇE) ---
  besiktas: {
    districtSlug: 'besiktas',
    districtName: 'Beşiktaş',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Levent-Etiler-Ulus sağlam kalker kaya tabakası; Beşiktaş sahil ve Ortaköy vadisi dolgu zemin.',
    afadAssemblyPointsCount: 72,
    primaryAssemblyAreas: ['Etiler Akatlar Sanatçılar Parkı', 'Ulus Parkı', 'Yıldız Parkı', 'Abbasağa Parkı'],
    localFireStation: 'Beşiktaş İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Sait Çiftçi Devlet Hastanesi & Şişli Hamidiye Etfal EAH',
    criticalBuildingAgeRatioPre2000: '%58 (Ulus ve Levent lüks rezidansları yeni; merkez ve Abbasağa dönüşüm gerektirir)',
    mandatoryShelterStandard: 'Lüks rezidans kulelerinde sığınak ve otoparklarda duman sızdırmaz basınçlı kaçış kapıları.',
    aloYonetimDisasterPlanProtocol: 'Rezidanslarda 5188 VIP güvenlik afet protokolü, asansör sismik tahliyesi, uydu telefonu ve acil tıp teknisyeni desteği.',
    checklistItems: [
      'Kule binalarda acil durum duman tahliye jet-fanlarının test edilmesi',
      'Kabin içi acil anons ve çift yönlü interkom hattının test edilmesi',
      'Merkezi yangın sprinkler hatlarının hidrostatik basınç kontrolü',
      'Rezidans sakinlerine özel acil durum tahliye kartlarının dağıtılması'
    ]
  },
  sisli: {
    districtSlug: 'sisli',
    districtName: 'Şişli',
    riskZone: 'Kaya Zemin / Düşük Zemin İvmesi',
    soilClassification: 'İstanbul Trakya Formasyonu sert grovak ve kumtaşı kaya tabakası; sismik ivmesi düşük ve zemin mukavemeti yüksektir.',
    afadAssemblyPointsCount: 68,
    primaryAssemblyAreas: ['Maçka Demokrasi Parkı', 'Abide-i Hürriyet Parkı', 'Feriköy Kent Parkı', 'Mecidiyeköy Meydanı'],
    localFireStation: 'Şişli İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Şişli Hamidiye Etfal EAH & Prof. Dr. Cemil Taşcıoğlu Şehir Hastanesi (Okmeydanı)',
    criticalBuildingAgeRatioPre2000: '%62 (Bomonti ve Mecidiyeköy kuleleri yeni tünel kalıp; Nişantaşı ve Kurtuluş eski binalardır)',
    mandatoryShelterStandard: 'Ticari plaza ve rezidanslarda sığınak havalandırmasının 24 saat kesintisiz çalışabilirliği.',
    aloYonetimDisasterPlanProtocol: 'Plaza ve rezidanslarda yangın senaryo matriksi doğrulaması, çift jeneratör senkronizasyonu ve kriz masası yönetimi.',
    checklistItems: [
      'Plaza ana elektrik trafo hücresinde termal kamera taraması',
      'Yangın damperlerinin BMS üzerinden otomatik kapanma testi',
      'Yüksek katlı bloklarda acil durum jeneratör yakıt rezervi (min 48 saat)',
      'Sığınak acil çıkış merdivenlerinde aydınlatma batarya sürelerinin kontrolü'
    ]
  },
  sariyer: {
    districtSlug: 'sariyer',
    districtName: 'Sarıyer',
    riskZone: 'Kaya Zemin / Düşük Zemin İvmesi',
    soilClassification: 'Masif andezit, granit ve kalker formasyon; İstanbul\'un depreme karşı en sağlam zeminli ilçesi.',
    afadAssemblyPointsCount: 76,
    primaryAssemblyAreas: ['Atatürk Kent Ormanı', 'Emirgan Korusu', 'Vadistanbul Açık Meydanı', 'İstinye Park Çevresi Park Alanı'],
    localFireStation: 'Sarıyer İtfaiye Grup Amirliği & İstinye Müfrezesi',
    emergencyFirstResponseCenter: 'Sarıyer Hamidiye Etfal Eğitim ve Araştırma Hastanesi (Çayırbaşı)',
    criticalBuildingAgeRatioPre2000: '%36 (Maslak plazaları ve Zekeriyaköy villaları deprem yönetmeliğine tam uygundur)',
    mandatoryShelterStandard: 'Villa ve geniş parsel sitelerde sığınak alanının yangın ve kimyasal sızıntı korumalı olması.',
    aloYonetimDisasterPlanProtocol: 'Zekeriyaköy ve Maslak aksında acil mobil kurtarma timi, orman yangını önleme su topu ve kriz telsiz entegrasyonu.',
    checklistItems: [
      'Orman yangını riskine karşı çevre hidrant hatlarının debi testi',
      'Deprem erken algılama sensörünün doğalgaz kesme vanasıyla testi',
      'Güneş enerjisi ve jeneratör hibrit acil durum besleme kontrolü',
      'Site sakinleri iletişim ağı ve afet toplanma tatbikatı planlaması'
    ]
  },
  bakirkoy: {
    districtSlug: 'bakirkoy',
    districtName: 'Bakırköy',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Sahil dolgusu, killi ve siltli kumtaşı; deniz kenarında zemin sıvılaşması riski mevcuttur.',
    afadAssemblyPointsCount: 68,
    primaryAssemblyAreas: ['Bakırköy Botanik Parkı', 'Florya Atatürk Ormanı', 'Ataköy Marina Sahil Parkı', 'Özgürlük Meydanı'],
    localFireStation: 'Bakırköy İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Bakırköy Dr. Sadi Konuk Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%67 (Ataköy 1-5. kısımlar ve Yeşilköy sahilinde dönüşüm önceliklidir)',
    mandatoryShelterStandard: 'Sıvılaşma riski sebebiyle sığınak drenaj sistemlerinin elektrik kesintisinde bile çalışacak dizel motopompla desteklenmesi.',
    aloYonetimDisasterPlanProtocol: 'Ataköy ve Yeşilköy projelerimizde su tahliye dalgıç pompaları, afet konteyneri ve acil tahliye bot koordinasyonu.',
    checklistItems: [
      'Bodrum kat su basma pompalarının otomatik flatör ve enerji yedeği testi',
      'Asansör kuyu diplerinde sismik şalter ve su kaçağı dedektör denetimi',
      'Doğalgaz ana kesici selenoid vanasının alarm simülasyonu ile testi',
      'Site sakinlerine yönelik deprem çantası ve aile afet planı eğitimi'
    ]
  },
  basaksehir: {
    districtSlug: 'basaksehir',
    districtName: 'Başakşehir',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Kalker, marn ve killi zemin; tepelik alanlar sağlam kayaç, vadi tabanları dolgudur.',
    afadAssemblyPointsCount: 96,
    primaryAssemblyAreas: ['Başakşehir Millet Bahçesi', 'Sular Vadisi Parkı', 'Bahçeşehir Gölet Parkı', 'Kayaşehir Kent Meydanı'],
    localFireStation: 'Başakşehir İtfaiye Grup Amirliği & Bahçeşehir Müfrezesi',
    emergencyFirstResponseCenter: 'Başakşehir Çam ve Sakura Şehir Hastanesi',
    criticalBuildingAgeRatioPre2000: '%18 (İstanbul\'un en genç ve deprem yönetmeliğine en uygun tünel kalıp yapı stoğu)',
    mandatoryShelterStandard: 'Toplu konutlarda sığınak havalandırma kapasitesinin ve yangın yangın zonlama kapılarının tam uyumu.',
    aloYonetimDisasterPlanProtocol: 'Çam ve Sakura Şehir Hastanesi acil afet aksında kesintisiz helikopter ve ambulans koridoru, binlerce konutluk sitelerde tam donanımlı afet konteynerleri.',
    checklistItems: [
      'Büyük sitelerde afet konteyneri arama kurtarma alet edevat denetimi',
      'Merkezi hidrofor deposunda 5 günlük içme ve kullanma suyu rezervi kilidi',
      'Otopark duman tahliye motorlarının acil durum hız testi',
      'Dijital sakin portalında acil afet toplanma alanı harita yönlendirmesi'
    ]
  },
  beylikduzu: {
    districtSlug: 'beylikduzu',
    districtName: 'Beylikdüzü',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Gürpınar formasyonu killi, siltli ve kumlu zemin; vadi yamaçlarında heyelan potansiyeli.',
    afadAssemblyPointsCount: 84,
    primaryAssemblyAreas: ['Beylikdüzü Yaşam Vadisi (Tüm Etaplar)', 'Barış Mahallesi Çamlık Parkı', 'Kavaklı Sahil Parkı', 'Cumhuriyet Meydanı'],
    localFireStation: 'Beylikdüzü İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Beylikdüzü Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%28 (İlçenin büyük kısmı 1999 sonrası radye temel ve tünel kalıpla inşa edilmiştir)',
    mandatoryShelterStandard: 'Yaşam Vadisi çevresi sitelerde istinat duvarı sismik ankrajları ve sığınak hidroforları zorunludur.',
    aloYonetimDisasterPlanProtocol: 'Yaşam Vadisi koridoru afet toplanma entegrasyonu, binalarda zemin kayma sensörleri ve kesintisiz kriz masası desteği.',
    checklistItems: [
      'İstinat duvarı ve zemin dilatasyon derzlerinde deformasyon denetimi',
      'Merkezi doğalgaz kazan dairesi acil gaz kesici vanaların sismik testi',
      'Yangın kaçış kapılarının panik barları ve hidrolik kapatıcılarının ayarı',
      'Toplanma alanlarında acil çadır ve seyyar WC altyapı hazırlığı'
    ]
  },
  avcilar: {
    districtSlug: 'avcilar',
    districtName: 'Avcılar',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Deniz sahili ve göl havzası gevşek alüvyon, kumlu kil; yüksek zemin büyütmesi ve sıvılaşma riski.',
    afadAssemblyPointsCount: 64,
    primaryAssemblyAreas: ['Avcılar Sahil Parkı', 'Atatürk Parkı', 'Firuzköy Kent Meydanı', 'Gümüşpala Göl Parkı'],
    localFireStation: 'Avcılar İtfaiye İstasyonu',
    emergencyFirstResponseCenter: 'Avcılar Murat Kölük Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%69 (1999 depremi sonrası güçlendirilen ve dönüşüm bekleyen yoğun yapı stoğu)',
    mandatoryShelterStandard: 'Sığınaklarda acil su tahliye dalgıç motorları ve bağımsız akü destekli acil durum haberleşmesi.',
    aloYonetimDisasterPlanProtocol: 'Avcılar projelerimizde öncelikli statik risk değerlendirmesi, sismik selenoid vanalar ve 7/24 nöbetçi mobil teknik servis.',
    checklistItems: [
      'Zemin seviyesi altındaki elektrik ana panolarında su yükselme erken uyarı sensörü',
      'Merkezi jeneratörün otomatik start ve transfer süresi (8 saniye kuralı)',
      'Bina kolon ve kirişlerinde gözlemsel çatlak ve korozyon taraması',
      'Site sakinlerine zorunlu DASK ve ortak alan deprem sigortası bilgilendirmesi'
    ]
  },
  kucukcekmece: {
    districtSlug: 'kucukcekmece',
    districtName: 'Küçükçekmece',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Lagün göl çevresi ve sahil bandı alüvyon tabakası; üst kısımlar kireçtaşı ve killi formasyon.',
    afadAssemblyPointsCount: 92,
    primaryAssemblyAreas: ['Küçükçekmece Göl Kenarı Parkı', 'Fevzi Çakmak Parkı', 'Cennet Mahallesi Meydanı', 'Halkalı Çamlık Parkı'],
    localFireStation: 'Küçükçekmece İtfaiye Grup Amirliği & Sefaköy Müfrezesi',
    emergencyFirstResponseCenter: 'Mehmet Akif Ersoy Göğüs Kalp ve Damar Cerrahisi EAH & Kanuni Sultan Süleyman EAH',
    criticalBuildingAgeRatioPre2000: '%57 (Halkalı ve Atakent modern sitelerdir; Sefaköy ve Cennet eski yapılardır)',
    mandatoryShelterStandard: 'Atakent sitelerinde sığınak hava sirkülasyonu ve acil su deposu bağlantıları tam standartta olmalıdır.',
    aloYonetimDisasterPlanProtocol: 'Atakent toplu konutlarında ortak afet yönetim ağı, mobil jeneratör desteği ve acil arama kurtarma ekipmanları.',
    checklistItems: [
      'Merkezi hidrofor sisteminde deprem sonrası acil kullanım musluklarının testi',
      'Asansörlerin kata getirme (UPS kurtarma) mekanizmalarının denenmesi',
      'Yangın pompa dairesinde dizel motorun haftalık periyodik testi',
      'Site afet acil durum toplanma tatbikatı ve bilgilendirme broşürü'
    ]
  },
  buyukcekmece: {
    districtSlug: 'buyukcekmece',
    districtName: 'Büyükçekmece',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Kıyı dolgu alanları ve göl havzası killi siltli zemin; Albatros ve Mimarsinan sırtları kayaç.',
    afadAssemblyPointsCount: 56,
    primaryAssemblyAreas: ['Büyükçekmece Kordonboyu Sahil Parkı', 'Kültürpark', 'Mimar Sinan Sahil Parkı', 'Tepekent Parkı'],
    localFireStation: 'Büyükçekmece İtfaiye İstasyonu & Mimarsinan Müfrezesi',
    emergencyFirstResponseCenter: 'Büyükçekmece Mimar Sinan Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%46 (Kordonboyu sahil binalarında dönüşüm sürerken villalar yenidir)',
    mandatoryShelterStandard: 'Deniz kıyısı binalarda sığınak kapılarının tuzlu su korozyonuna karşı marin tip olması.',
    aloYonetimDisasterPlanProtocol: 'Göl ve deniz çevresi sitelerde su basma drenaj otomasyonu, acil uydu telsiz sistemi ve afet jeneratörleri.',
    checklistItems: [
      'Sahil sitelerinde çekvalf ve kanalizasyon geri tepme klapesi testi',
      'Yıldırımdan korunma tesisatı paratoner direnç ölçümü',
      'Yangın hidrantlarının manometre basınç ölçümü',
      'Acil tahliye merdivenlerinde acil yönlendirme tabelalarının aydınlatma testi'
    ]
  },
  fatih: {
    districtSlug: 'fatih',
    districtName: 'Fatih',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Tarihi Yarımada sahil şeridi dolgu zemin; tepe bölgeleri kireçtaşı ve killi kumtaşı.',
    afadAssemblyPointsCount: 78,
    primaryAssemblyAreas: ['Fındıkzade Çukurbostan Parkı', 'Yenikapı Etkinlik Alanı', 'Sultanahmet Meydanı', 'Balat Sahil Parkı'],
    localFireStation: 'Fatih İtfaiye Grup Amirliği (Balat & Kocamustafapaşa Müfrezeleri)',
    emergencyFirstResponseCenter: 'İstanbul Tıp Fakültesi (Çapa) & Haseki Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%74 (Tarihi doku ve eski yapı stoğu sebebiyle en hassas ilçelerdendir)',
    mandatoryShelterStandard: 'Dar sokak yapısı sebebiyle bina içinde bağımsız yangın söndürme tüpleri ve kaçış yollarının sürekli açık olması.',
    aloYonetimDisasterPlanProtocol: 'Dar sokaklarda itfaiye erişimi kısıtlılığına karşı bina içi yangın dolapları, mobil motopomplar ve erken tahliye alarmı.',
    checklistItems: [
      'Bina içi yangın hortumlarının su akış ve basınç testi',
      'Elektrik şaftlarında yangın yayılımını durdurucu harç ve conta denetimi',
      'Doğalgaz borularında gaz kaçağı detektörlerinin kalibrasyonu',
      'Kat sakinleriyle acil tahliye senaryolarının paylaşılması'
    ]
  },
  beyoglu: {
    districtSlug: 'beyoglu',
    districtName: 'Beyoğlu',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Karaköy ve Haliç kıyısı gevşek dolgu; Cihangir, İstiklal ve Pera masif kayaç formasyon.',
    afadAssemblyPointsCount: 54,
    primaryAssemblyAreas: ['Kasımpaşa Kızılay Parkı', 'Taksim Gezi Parkı', 'Hasköy Sahil Parkı', 'Cihangir Sanatkarlar Parkı'],
    localFireStation: 'Beyoğlu İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Taksim Eğitim ve Araştırma Hastanesi & Kasımpaşa Ek Binası',
    criticalBuildingAgeRatioPre2000: '%71 (Tarihi tescilli kagir ve yığma binalar çoğunluktadır)',
    mandatoryShelterStandard: 'Tarihi binalarda ahşap taşıyıcı yangın geciktirici kaplamalar ve acil yangın merdiveni.',
    aloYonetimDisasterPlanProtocol: 'Tarihi apartmanlarda koruyucu mühendislik, sismik gaz kesme vanaları ve 7/24 teknik izleme.',
    checklistItems: [
      'Tarihi binalarda elektrik tesisatı yangın koruma rölesi testi',
      'Bina içi duman ve gaz dedektörlerinin test gazı ile uyarılması',
      'Çatı ahşap konstrüksiyonunun yangın güvenliği teftişi',
      'Acil toplanma alanı krokisinin bina girişinde sergilenmesi'
    ]
  },
  zeytinburnu: {
    districtSlug: 'zeytinburnu',
    districtName: 'Zeytinburnu',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Marmara sahili dolgu zemin; iç kesimler killi kum ve gevşek silt tabakaları.',
    afadAssemblyPointsCount: 62,
    primaryAssemblyAreas: ['Zeytinburnu Millet Bahçesi', 'Kazlıçeşme Sahil Parkı', 'Merkezefendi Parkı', 'Çırpıcı Şehir Parkı'],
    localFireStation: 'Zeytinburnu İtfaiye İstasyonu',
    emergencyFirstResponseCenter: 'Yedikule Göğüs Hastalıkları EAH & Zeytinburnu Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%61 (Kazlıçeşme sahil rezidansları yeni; iç mahallelerde dönüşüm sürmektedir)',
    mandatoryShelterStandard: 'Sahil rezidans kulelerinde dikey yangın kaçış merdivenleri basınçlandırma ve sığınak filtrasyonu.',
    aloYonetimDisasterPlanProtocol: 'Sahil rezidanslarında sismik otomasyon, yangın pompası 72 saat jeneratör garantisi ve afet kriz odası.',
    checklistItems: [
      'Yangın kaçış kapılarının duman sızdırmaz fitil kontrolleri',
      'Otopark CO gazı tahliye fanlarının manuel/otomatik testi',
      'Asansör deprem ve yangın acil çalışma modu simülasyonu',
      'Sığınak gıda, su ve ilkyardım stoklarının kontrolü'
    ]
  },
  bagcilar: {
    districtSlug: 'bagcilar',
    districtName: 'Bağcılar',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Killi, siltli ve marnlı zemin tabakası; dere yataklarında zemin gevşektir.',
    afadAssemblyPointsCount: 88,
    primaryAssemblyAreas: ['Bağcılar Meydan Parkı', 'Mahmutbey Kent Parkı', 'Güneşli Meydan Parkı', 'Kirazlı Parkı'],
    localFireStation: 'Bağcılar İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Bağcılar Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%63 (Basın Ekspres kuleleri yeni tünel kalıp; iç kesimler 90\'lı yıllar binalarıdır)',
    mandatoryShelterStandard: 'Basın Ekspres rezidanslarında sığınak ve otopark sprinkler sistemlerinin haftalık basınç testi.',
    aloYonetimDisasterPlanProtocol: 'Basın Ekspres rezidanslarında profesyonel afet müdahale protokolü, yedekli jeneratör ve tahliye güvencesi.',
    checklistItems: [
      'Basın Ekspres kulelerinde dikey kaçış şaft basınçlandırma fanları',
      'Jeneratörün otomatik yük alma süresi testi',
      'Merkezi su deposu ve yangın suyu hidroforlarının yedekli testi',
      'Site afet timi haberleşme cihazları denetimi'
    ]
  },
  bahcelievler: {
    districtSlug: 'bahcelievler',
    districtName: 'Bahçelievler',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Marnlı kil ve kumtaşı; Ayamama ve Tavukçu Deresi havzalarında gevşek alüvyon zemin.',
    afadAssemblyPointsCount: 78,
    primaryAssemblyAreas: ['Kuyumcukent Çevresi Açık Alan', 'Hasan Doğan Spor Parkı', 'Yenibosna Çamlık Parkı', 'Milli Egemenlik Parkı'],
    localFireStation: 'Bahçelievler İtfaiye İstasyonu & Kocasinan Müfrezesi',
    emergencyFirstResponseCenter: 'Bahçelievler Devlet Hastanesi & Bakırköy Dr. Sadi Konuk EAH',
    criticalBuildingAgeRatioPre2000: '%66 (Kentsel dönüşümün hızla devam ettiği yoğun konut bölgesi)',
    mandatoryShelterStandard: 'Bodrum sığınaklarında yağmur ve sel sızıntılarına karşı hidro-dalgıç pompa yedeklemesi.',
    aloYonetimDisasterPlanProtocol: 'Ayamama havzası sitelerimizde su basma ve deprem erken uyarı sistemleri, afet çantaları ve acil durum tahliye protokolü.',
    checklistItems: [
      'Dalgıç tahliye pompalarının kuyu flatörlerinin elle tetiklenmesi',
      'Doğalgaz ana şebeke sismik vanası alarm kapatma kontrolü',
      'Acil çıkış merdivenleri acil aydınlatma testleri',
      'Site sakinlerine yönelik afet bilgilendirme semineri düzenlenmesi'
    ]
  },
  gungoren: {
    districtSlug: 'gungoren',
    districtName: 'Güngören',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Killi, kumlu ve kireçli marn formasyon; yoğun yapılaşma sebebiyle zemin yükü yüksektir.',
    afadAssemblyPointsCount: 46,
    primaryAssemblyAreas: ['Güngören Parkı', 'Gençosman Kent Parkı', 'Köyiçi Meydanı', 'Tozkoparan Parkı'],
    localFireStation: 'Güngören İtfaiye İstasyonu',
    emergencyFirstResponseCenter: 'Bakırköy Dr. Sadi Konuk EAH & Bağcılar EAH',
    criticalBuildingAgeRatioPre2000: '%72 (Tozkoparan kentsel dönüşüm projesi haricinde eski yapı stoku mevcuttur)',
    mandatoryShelterStandard: 'Dar parselli binalarda sığınak çıkışlarının acil kaçış kapaklarıyla caddeye güvenli tahliyesi.',
    aloYonetimDisasterPlanProtocol: 'Yoğun yapı stoğunda yangın yayılımını önleyici denetimler, elektrik panolarında ark koruma rölesi ve acil kriz protokolü.',
    checklistItems: [
      'Elektrik sayaç panolarında termal kamera kontrolleri',
      'Bina içi yangın söndürme tüplerinin periyodik bakımı',
      'Doğalgaz fleks hortumlarının sismik dayanıklılık kontrolü',
      'Kat aralarındaki yangın kaçış koridorlarının açık tutulması'
    ]
  },
  esenler: {
    districtSlug: 'esenler',
    districtName: 'Esenler',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Kumtaşı, kil ve marn zemin; tepelik alanlar mukavim, dere tabanları zayıf zemindir.',
    afadAssemblyPointsCount: 68,
    primaryAssemblyAreas: ['Esenler 15 Temmuz Millet Bahçesi', 'Dörtyol Meydanı', 'Havaalanı Mahallesi Parkı', 'Birlik Parkı'],
    localFireStation: 'Esenler İtfaiye İstasyonu',
    emergencyFirstResponseCenter: 'Esenler Kadın Doğum ve Çocuk Hastalıkları Hastanesi & Bağcılar EAH',
    criticalBuildingAgeRatioPre2000: '%60 (Güney Rezerv Yapı Alanında yeni konutlar hızla yükselmektedir)',
    mandatoryShelterStandard: 'Toplu yaşam alanlarında sığınak alanının acil durumda sahra hastanesine dönüştürülebilir elektrik/su altyapısı.',
    aloYonetimDisasterPlanProtocol: 'Millet Bahçesi çevresi sitelerde afet toplanma çadırı desteği, mobil jeneratör ve telsiz ağı.',
    checklistItems: [
      'Acil aydınlatma armatürlerinin şarj ve batarya testi',
      'Merkezi hidrofor pompalarında basınç düşüm testi',
      'Yangın merdiveni kapılarının dışarıdan açılamaz, içeriden panik barlı kontrolü',
      'Site sakinleri acil durum telefon rehberinin güncellenmesi'
    ]
  },
  gaziosmanpasa: {
    districtSlug: 'gaziosmanpasa',
    districtName: 'Gaziosmanpaşa',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Grovak ve killi şist zemin; dik vadi yamaçlarında istinat yapıları gerektirir.',
    afadAssemblyPointsCount: 58,
    primaryAssemblyAreas: ['Gaziosmanpaşa Meydan Parkı', 'Sedat Balkanlı Parkı', 'Yıldıztabya Kent Parkı', 'Bağlarbaşı Meydanı'],
    localFireStation: 'Gaziosmanpaşa İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Gaziosmanpaşa Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%54 (Sarıgöl ve Merkez mahallelerinde dönüşüm sürmektedir)',
    mandatoryShelterStandard: 'Eğimli arazilerde sığınak arkasındaki drenaj hatlarının kış başında temizlenmesi zorunludur.',
    aloYonetimDisasterPlanProtocol: 'İstinat duvarı ve eğimli bina denetimleri, afet toplanma konteyneri ve kriz iletişim sistemi.',
    checklistItems: [
      'İstinat duvarları çatlak ve drenaj gözlem denetimi',
      'Doğalgaz kazan dairesi gaz dedektörü sesli/ışıklı alarm testi',
      'Yangın hidrant vanalarının açma/kapama fonksiyon testi',
      'Sığınak yangın çıkış kapısının emniyet mandalı kontrolü'
    ]
  },
  sultangazi: {
    districtSlug: 'sultangazi',
    districtName: 'Sultangazi',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Kireçtaşı ve sert kumtaşı zemin; Alibeyköy baraj havzasına yakın kesimler alüvyondur.',
    afadAssemblyPointsCount: 66,
    primaryAssemblyAreas: ['Sultangazi Kent Ormanı Parkı', 'Hacı Bektaş-ı Veli Kent Parkı', 'Uğur Mumcu Parkı', 'Cebeci Meydanı'],
    localFireStation: 'Sultangazi İtfaiye İstasyonu',
    emergencyFirstResponseCenter: 'Sultangazi Haseki Eğitim ve Araştırma Hastanesi',
    criticalBuildingAgeRatioPre2000: '%42 (Büyük toplu konut siteleri yeni yönetmeliklere uygundur)',
    mandatoryShelterStandard: 'Orman komşuluğu sebebiyle sitelerde yangın hidrant hatlarının 12 bar basınçla hazır tutulması.',
    aloYonetimDisasterPlanProtocol: 'Orman sınırındaki sitelerde termal yangın algılama, sığınak tam donanımı ve kesintisiz jeneratör desteği.',
    checklistItems: [
      'Orman yangınına karşı yangın dolabı hortum ve nozul testi',
      'Otomatik jeneratör haftalık devreye girme testi',
      'Asansör kabinlerinde deprem sensörü ve kurtarma sistemi',
      'Bina sığınağında acil aydınlatma ve temiz su stoku'
    ]
  },
  eyupsultan: {
    districtSlug: 'eyupsultan',
    districtName: 'Eyüpsultan',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Haliç kıyısı yumuşak alüvyon zemin; Kemerburgaz ve Göktürk sağlam kalker ve kayaç zemin.',
    afadAssemblyPointsCount: 72,
    primaryAssemblyAreas: ['Göktürk Özgecan Aslan Parkı', 'Haliç Sahil Parkı', 'Kemerburgaz Kent Ormanı', 'Pierre Loti Açık Alanı'],
    localFireStation: 'Eyüpsultan İtfaiye İstasyonu & Kemerburgaz Müfrezesi',
    emergencyFirstResponseCenter: 'Eyüpsultan Devlet Hastanesi & Prof. Dr. Cemil Taşcıoğlu Şehir Hastanesi',
    criticalBuildingAgeRatioPre2000: '%47 (Göktürk ve Kemerburgaz modern villa ve az katlı sitelerdir; Haliç kıyısı eskidir)',
    mandatoryShelterStandard: 'Göktürk villa sitelerinde sığınak jeneratör beslemesi ve orman yangını savunma hatları zorunludur.',
    aloYonetimDisasterPlanProtocol: 'Göktürk ve Kemerburgaz\'da bağımsız mobil teknik servis, orman yangını ve deprem acil kriz protokolü.',
    checklistItems: [
      'Göktürk sitelerinde çevre yangın hidrantları ve motopomp testi',
      'Asansör kuyu dibi sismik sensör kalibrasyonu',
      'Sığınak hava filtrelerinin periyodik değişimi',
      'Site sakinleriyle yıllık tahliye ve acil durum tatbikatı'
    ]
  },
  kagithane: {
    districtSlug: 'kagithane',
    districtName: 'Kağıthane',
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'Cendere Vadisi alüvyon ve dolgu zemin; sırt bölgeler (Seyrantepe, Çeliktepe) sağlam kaya tabakası.',
    afadAssemblyPointsCount: 64,
    primaryAssemblyAreas: ['Kağıthane Meydan Parkı', 'Cendere Vadisi Yeşil Alanı', 'Hasbahçe Mesire Parkı', 'Sadabad Parkı'],
    localFireStation: 'Kağıthane İtfaiye İstasyonu & Seyrantepe Müfrezesi',
    emergencyFirstResponseCenter: 'Kağıthane Devlet Hastanesi & Şişli Hamidiye Etfal EAH (Seyrantepe)',
    criticalBuildingAgeRatioPre2000: '%49 (Cendere Vadisi modern rezidans kuleleridir; tepelerde dönüşüm sürmektedir)',
    mandatoryShelterStandard: 'Cendere Vadisi kulelerinde nehir taşkın ve deprem ikili riskine karşı su yalıtımlı sığınak kapıları.',
    aloYonetimDisasterPlanProtocol: 'Cendere Vadisi rezidanslarında çift dalgıç pompa yedeklemesi, sismik vana ve kule kaçış protokolü.',
    checklistItems: [
      'Rezidans kulelerinde dikey yangın merdiveni fanlarının testi',
      'Cendere taban suyu yükselmesine karşı dalgıç pompa kontrolleri',
      'Doğalgaz sismik selenoid vanasının alarm testi',
      'Site sakinlerine yönelik dijital afet kılavuzu paylaşımı'
    ]
  },
  bayrampasa: {
    districtSlug: 'bayrampasa',
    districtName: 'Bayrampaşa',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Killi, siltli ve kumlu formasyon; sanayi ve ticaret yükü yüksek zemin.',
    afadAssemblyPointsCount: 52,
    primaryAssemblyAreas: ['Bayrampaşa Şehir Parkı (Adapark)', 'Kocatepe Meydan Parkı', 'Yenidoğan Parkı', 'Muratpaşa Parkı'],
    localFireStation: 'Bayrampaşa İtfaiye Grup Amirliği',
    emergencyFirstResponseCenter: 'Bayrampaşa Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%65 (Yoğun sanayi ve konut karma yapısı; kentsel dönüşüm alanları mevcuttur)',
    mandatoryShelterStandard: 'Endüstriyel dükkan ve sitelerde kimyasal yangın söndürme tüpleri ve basınçlı sığınaklar.',
    aloYonetimDisasterPlanProtocol: 'Endüstriyel siteler ve konut projelerinde hızlı itfaiye koordinasyonu, yedek jeneratör ve sismik emniyet.',
    checklistItems: [
      'Yangın sprinkler vanalarının açık konum kilidi kontrolü',
      'Acil durum yönlendirme armatürlerinin batarya testi',
      'Doğalgaz fleks bağlantılarında gaz kaçak taraması',
      'Sığınak tahliye çıkışının engelsiz olduğunun teyidi'
    ]
  },
  esenyurt: {
    districtSlug: 'esenyurt',
    districtName: 'Esenyurt',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Killi, siltli ve kaygan zemin; Haramidere vadisinde heyelan ve sıvılaşma risk tabakaları.',
    afadAssemblyPointsCount: 118,
    primaryAssemblyAreas: ['Recep Tayyip Erdoğan Parkı', 'Esenyurt Meydanı', 'Şehitler Parkı', 'Gaziler Parkı'],
    localFireStation: 'Esenyurt İtfaiye Grup Amirliği & Kıraç Müfrezesi',
    emergencyFirstResponseCenter: 'Esenyurt Necmi Kadıoğlu Devlet Hastanesi & Başakşehir Şehir Hastanesi',
    criticalBuildingAgeRatioPre2000: '%22 (Büyük siteler 2008 sonrası inşa edilmiştir; ancak zemin iyileştirme takibi şarttır)',
    mandatoryShelterStandard: 'Yüksek katlı site bloklarında sığınak alanının kişi başı havalandırma debisi ve acil tahliye çıkışı.',
    aloYonetimDisasterPlanProtocol: 'Esenyurt\'taki mega sitelerde 24 saat teknik nöbetçi, sismik asansör indirme, jeneratörlü su hidroforu desteği.',
    checklistItems: [
      'Site bloklarında yangın duman damperleri ve jet-fan testi',
      'Bina temel drenaj pompalarının çift kademe otomatik çalışma testi',
      'Merkezi doğalgaz kazan dairesi otomatik gaz kesme selenoidi',
      'Mega site sakinleri için blok bazlı afet koordinatörü atanması'
    ]
  },
  arnavutkoy: {
    districtSlug: 'arnavutkoy',
    districtName: 'Arnavutköy',
    riskZone: 'Kaya Zemin / Düşük Zemin İvmesi',
    soilClassification: 'Sert kumtaşı, grovak ve kireçtaşı kaya tabakası; İstanbul Havalimanı aksı sağlam zemin.',
    afadAssemblyPointsCount: 54,
    primaryAssemblyAreas: ['Arnavutköy Şehir Parkı', 'Bolluca Parkı', 'Hadımköy Meydan Parkı', 'Taşoluk Parkı'],
    localFireStation: 'Arnavutköy İtfaiye İstasyonu & Hadımköy Müfrezesi',
    emergencyFirstResponseCenter: 'Arnavutköy Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%32 (Havalimanı çevresinde yeni lojistik ve konut projeleri ağırlıktadır)',
    mandatoryShelterStandard: 'Lojistik ve konut sitelerinde sığınakların bağımsız jeneratör hattına bağlanması.',
    aloYonetimDisasterPlanProtocol: 'Havalimanı lojistik koridorunda afet acil müdahale aracı, uydu interneti ve kesintisiz jeneratör güvencesi.',
    checklistItems: [
      'Geniş parsel sitelerde yangın hidrant hatları debi ölçümü',
      'Jeneratörün otomatik transfer süresi testi',
      'Paratoner topraklama direncinin yıllık kontrolü',
      'Sığınak kapılarının basınç contası kontrolü'
    ]
  },
  silivri: {
    districtSlug: 'silivri',
    districtName: 'Silivri',
    riskZone: '1. Derece Yüksek Sismik Risk',
    soilClassification: 'Sahil dolgusu ve vadi tabanlarında gevşek kumlu kil; tepe mahallelerde sert kil ve marn.',
    afadAssemblyPointsCount: 68,
    primaryAssemblyAreas: ['Silivri Sahil Parkı', 'Atatürk Meydanı', 'Gümüşyaka Sahil Parkı', 'Selimpaşa Meydan Parkı'],
    localFireStation: 'Silivri İtfaiye Grup Amirliği & Selimpaşa Müfrezesi',
    emergencyFirstResponseCenter: 'Silivri Prof. Dr. Necmi Ayanoğlu Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%48 (2019 Silivri depremi sonrası güçlendirme ve yenileme çalışmaları hızlanmıştır)',
    mandatoryShelterStandard: 'Yazlık sitelerde kışın donma riskine karşı yangın hidrant hatlarının yalıtımı.',
    aloYonetimDisasterPlanProtocol: 'Marmara Fayı Silivri segmenti sebebiyle 7/24 sismik alarm entegrasyonu, otomatik gaz kesme ve mobil jeneratör.',
    checklistItems: [
      'Bina deprem sensörünün doğalgaz kesme selenoidiyle testi',
      'Asansörlerin kata getirme ve kapı açma mekanizması testi',
      'Yangın dolaplarında hortum ve nozul su testi',
      'Sığınak alanlarında afet erzak ve ilk yardım dolabı denetimi'
    ]
  },
  catalca: {
    districtSlug: 'catalca',
    districtName: 'Çatalca',
    riskZone: 'Kaya Zemin / Düşük Zemin İvmesi',
    soilClassification: 'Metamorfik şist, granit ve sert kireçtaşı; yüzölçümü en büyük, zemin mukavemeti en yüksek ilçelerden biridir.',
    afadAssemblyPointsCount: 42,
    primaryAssemblyAreas: ['Çatalca Cumhuriyet Meydanı', 'Muratbey Parkı', 'İzzettin Parkı', 'Binkılıç Parkı'],
    localFireStation: 'Çatalca İtfaiye İstasyonu & Binkılıç Müfrezesi',
    emergencyFirstResponseCenter: 'Çatalca İlyas Çokay Devlet Hastanesi',
    criticalBuildingAgeRatioPre2000: '%36 (Müstakil konutlar, çiftlik evleri ve az katlı siteler)',
    mandatoryShelterStandard: 'Geniş arazili sitelerde kuyu suyu pompalarının yangın hidrant hattına bağlanması.',
    aloYonetimDisasterPlanProtocol: 'Kırsal ve geniş alana yayılı projelerde bağımsız yangın motopompları, telsiz iletişim ağı ve 72 saat yakıt güvencesi.',
    checklistItems: [
      'Yangın savunma motopomplarının yakıt ve akü denetimi',
      'Fırtına ve kar yağışına karşı çatı olukları ve paratoner testi',
      'Otomatik jeneratör kış yükleme testi',
      'Site sakinleriyle acil toplanma alanı tatbikatı'
    ]
  }
};

/**
 * Belirli bir ilçe slug'ına göre deprem ve afet hazırlık profilini döndürür.
 * Bilinmeyen bir ilçe gelmesi durumunda dengeli genel İstanbul acil durum profili üretir.
 */
export function getDistrictEmergencyProfile(districtSlug: string): DistrictEmergencyProfile {
  const profile = DISTRICT_EMERGENCY_PROFILES[districtSlug];
  if (profile) return profile;

  // Fallback jeneratörü
  const formattedName = districtSlug.charAt(0).toUpperCase() + districtSlug.slice(1);
  return {
    districtSlug,
    districtName: formattedName,
    riskZone: '2. Derece Orta-Yüksek Sismik Risk',
    soilClassification: 'İstanbul kentsel zemin formasyonu ve standart yapı temeli.',
    afadAssemblyPointsCount: 50,
    primaryAssemblyAreas: [`${formattedName} Kent Meydanı`, `${formattedName} Millet Bahçesi Parkı`],
    localFireStation: `${formattedName} İtfaiye İstasyonu`,
    emergencyFirstResponseCenter: `${formattedName} İlçe Devlet Hastanesi`,
    criticalBuildingAgeRatioPre2000: '%50 (Kentsel dönüşüm süreci devam etmektedir)',
    mandatoryShelterStandard: '3194 İmar Kanunu ve KMK m.4 standartlarında havalandırılabilir ve engelsiz sığınak.',
    aloYonetimDisasterPlanProtocol: 'Sismik gaz kesme selenoidi, asansör otomatik kat tahliyesi ve 72 saat jeneratörlü su güvencesi.',
    checklistItems: [
      'Deprem sensörlü asansör kat tahliyesi testi',
      'Merkezi doğalgaz ana selenoid vana alarm testi',
      'Yangın hidrantları ve söndürme tüpleri basınç kontrolü',
      'Site ortak sığınağı acil durum kiti ve aydınlatma kontrolü'
    ]
  };
}

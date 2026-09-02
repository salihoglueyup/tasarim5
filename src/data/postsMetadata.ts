/**
 * Blog meta veri katmanı (Hafifletilmiş liste - Faz 1 & 3).
 * Liste sayfaları, sitemap ve kategori filtreleri için tam içerik (content) içermez.
 * 528 KB yerine sadece gerekli meta verileri barındırır.
 */

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  pillar: string;
  tldr: string;
};

export const POSTS_META: PostMeta[] = [
  {
    "slug": "tesis-yonetimi-nedir-kapsami-ve-iso-41001-standartlari",
    "title": "Tesis Yönetimi Nedir? Kapsamı, ISO 41001 Standartları ve Binalar İçin Önemi (2026 Rehberi)",
    "description": "Tesis yönetimi (Facility Management) tanımı, uluslararası ISO 41001 standartları, geleneksel apartman yöneticiliğinden farkı ve binalara sağladığı operasyonel verimlilik.",
    "category": "tesis-yonetimi",
    "tags": [
      "tesis yönetimi nedir",
      "facility management",
      "iso 41001",
      "entegre tesis yönetimi",
      "bina yönetimi",
      "tesis işletme"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-23T09:00:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Tesis yönetimi; insan, mekan, süreç ve teknolojiyi entegre ederek binaların güvenli, sürdürülebilir, konforlu ve maliyet etkin biçimde işletilmesini sağlayan profesyonel disiplindir."
  },
  {
    "slug": "entegre-tesis-yonetimi-hizmetleri-nelerdir-kapsamli-rehber",
    "title": "Entegre Tesis Yönetimi Hizmetleri Nelerdir? A'dan Z'ye Kapsamlı Sektör Rehberi",
    "description": "Entegre tesis yönetiminin 3 ana sütunu: Teknik (Hard Services), Destek (Soft Services) ve Hukuki/Mali Yönetim. Tek elden yönetimin %30 tasarruf modeli.",
    "category": "tesis-yonetimi",
    "tags": [
      "tesis yönetimi hizmetleri",
      "entegre yönetim",
      "soft services",
      "hard services",
      "tesis işletmeciliği"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-23T10:30:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Entegre tesis yönetimi; temizlikten güvenliğe, teknik bakımdan aidat tahsilatına kadar tüm bina fonksiyonlarını tek bir kurumsal çatı altında toplayan uçtan uca işletme modelidir."
  },
  {
    "slug": "tesis-yonetiminde-soft-destek-hizmetleri-nelerdir",
    "title": "Tesis Yönetiminde Soft (Destek) Hizmetler Nelerdir? Temizlik, Güvenlik, Resepsiyon ve Peyzaj",
    "description": "Tesis yönetiminde destek (soft) hizmetlerin kapsamı: 5188 özel güvenlik, endüstriyel temizlik, concierge, resepsiyon, peyzaj bakımı ve atık yönetimi protokolleri.",
    "category": "tesis-yonetimi",
    "tags": [
      "soft services",
      "tesis temizlik",
      "özel güvenlik",
      "concierge resepsiyon",
      "peyzaj bakımı",
      "atık yönetimi"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-23T11:45:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Tesis yönetiminde soft hizmetler; sakinlerin ve ziyaretçilerin günlük konforunu, sağlığını ve güvenliğini doğrudan etkileyen operasyonel destek fonksiyonlarıdır."
  },
  {
    "slug": "tesis-yonetiminde-hard-teknik-bakim-hizmetleri-nelerdir",
    "title": "Tesis Yönetiminde Hard (Teknik) Hizmetler Nelerdir? HVAC, Elektrik, Asansör ve Yangın Otomasyonu",
    "description": "Bina ve tesislerde teknik (hard) bakım hizmetleri: merkezi iklimlendirme (HVAC), jeneratör, trafo, asansör yeşil etiket ve yangın hidrant sistemleri denetimi.",
    "category": "tesis-yonetimi",
    "tags": [
      "hard services",
      "tesis teknik bakım",
      "hvac mekanik",
      "asansör yeşil etiket",
      "jeneratör trafo",
      "yangın sprinkler"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-23T13:15:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Hard hizmetler; binanın fiziksel varlıklarını, mekanik ve elektrik altyapısını 7/24 çalışır durumda tutan, can ve mal güvenliğini teminat altına alan teknik işletme disiplinidir."
  },
  {
    "slug": "mulk-yonetimi-ile-tesis-yonetimi-arasindaki-farklar-nelerdir",
    "title": "Mülk Yönetimi ile Tesis Yönetimi Arasındaki Farklar Nelerdir? (Property vs. Facility Management)",
    "description": "Gayrimenkul sektöründe sıkça karıştırılan mülk yönetimi (Property Management) ile tesis yönetimi (Facility Management) arasındaki 7 temel fark ve entegrasyonu.",
    "category": "tesis-yonetimi",
    "tags": [
      "mülk yönetimi nedir",
      "tesis yönetimi farkı",
      "property management",
      "kira yönetimi",
      "gayrimenkul yönetimi"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-23T14:30:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Mülk yönetimi gayrimenkulün finansal getirisine ve kiracı ilişkilerine odaklanırken, tesis yönetimi binanın fiziki varlığına, teknik altyapısına ve günlük yaşam konforuna odaklanır."
  },
  {
    "slug": "profesyonel-tesis-yonetiminin-mulk-sahibine-10-somut-faydasi",
    "title": "Profesyonel Tesis Yönetiminin Mülk Sahibine ve Kat Malikine 10 Somut Faydası",
    "description": "Sitelerde ve binalarda profesyonel tesis yönetim şirketiyle çalışmanın gayrimenkul değerine, bütçe tasarrufuna ve yaşam konforuna sağladığı 10 somut kazanç.",
    "category": "tesis-yonetimi",
    "tags": [
      "tesis yönetiminin faydaları",
      "gayrimenkul değer artışı",
      "aidat tasarrufu",
      "huzurlu yaşam",
      "profesyonel yönetim"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-23T15:45:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi/rehber",
    "tldr": "Profesyonel tesis yönetimi mülkünüzün değerini %20-30 artırır, plansız arıza maliyetlerini sıfırlar, aidatlarda %30 tasarruf sağlar ve komşuluk ihtilaflarını bitirir."
  },
  {
    "slug": "tesis-yonetim-sirketlerinin-gorev-ve-yasal-sorumluluklari",
    "title": "Tesis Yönetim Şirketleri Hangi Sorumlulukları Üstlenir? Yasal, Mali ve Operasyonel Görevler",
    "description": "634 Sayılı Kat Mülkiyeti Kanunu ve İş Kanunu kapsamında profesyonel tesis yönetim şirketlerinin üstlendiği yasal mesuliyetler, mali denetim ve operasyonel görevler.",
    "category": "tesis-yonetimi",
    "tags": [
      "tesis yönetim şirketinin görevleri",
      "kmk madde 35",
      "yönetici sorumlulukları",
      "mali işletme bütçesi",
      "isg sorumluluğu"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-23T16:30:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/yonetim-danismanligi",
    "tldr": "Tesis yönetim şirketi; KMK m.35 kapsamındaki tüm yasal yöneticilik görevlerini, işletme bütçesini, personel SGK/İSG süreçlerini ve ortak alan bakımını hukuki güvenceyle yürütür."
  },
  {
    "slug": "tesis-yonetim-plani-nasil-hazirlanir-adim-adim-rehber",
    "title": "Tesis Yönetim Planı Nasıl Hazırlanir? Adım Adım İşletme ve Bütçe Planlama Rehberi",
    "description": "Kat Mülkiyeti Kanunu Madde 28 uyarınca tüm kat maliklerini bağlayan sözleşme hükmündeki Tesis Yönetim Planı hazırlama, ortak alan kuralları ve işletme projesi rehberi.",
    "category": "tesis-yonetimi",
    "tags": [
      "tesis yönetim planı",
      "yönetim planı hazırlama",
      "kmk madde 28",
      "işletme projesi örneği",
      "ortak gider paylaşımı"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-23T17:15:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Tesis yönetim planı; sitenin anayasası niteliğinde olup ortak alan kullanımlarını, aidat paylaşım kriterlerini ve yönetim organlarının yetkilerini belirleyen bağlayıcı hukuki belgedir."
  },
  {
    "slug": "luks-rezidanslarda-concierge-ve-tesis-yonetimi-standartlari-2026",
    "title": "Lüks Rezidanslarda Concierge ve 5 Yıldızlı Tesis Yönetimi Standartları (2026 Rehberi)",
    "description": "A+ lüks rezidans ve karma yaşam projelerinde 7/24 VIP concierge, lobi karşılama, akıllı bina otomasyonu ve KMK 37 bütçe optimizasyonu standartları.",
    "category": "tesis-yonetimi",
    "tags": [
      "rezidans yönetimi",
      "concierge",
      "lüks tesis yönetimi",
      "akıllı bina",
      "5188 güvenlik",
      "rezidans aidat"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-15T09:00:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi/rezidans-site-yonetimi",
    "tldr": "Lüks rezidanslarda 5 yıldızlı tesis yönetimi; 7/24 concierge, VIP güvenlik, önleyici akıllı bina otomasyonu ve KMK 37 bütçe şeffaflığını tek merkezde birleştirir."
  },
  {
    "slug": "ticari-plazalarda-hvac-ve-leed-tesis-enerji-verimliligi",
    "title": "Ticari Plazalarda HVAC Otomasyonu ve BREEAM/LEED Yeşil Bina Enerji Verimliliği",
    "description": "A sınıfı iş merkezleri ve plazalarda merkezi iklimlendirme otomasyonu, kompanzasyon panosu takibi ve ISO 41001 standartlarında %30 enerji tasarrufu.",
    "category": "tesis-yonetimi",
    "tags": [
      "plaza yönetimi",
      "hvac otomasyonu",
      "leed sertifikası",
      "enerji verimliliği",
      "ofis yönetimi",
      "iso 41001"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-16T10:00:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi/plaza-yonetimi",
    "tldr": "Ticari plazalarda merkezi HVAC otomasyonu, kompanzasyon takibi ve ISO 41001 standartları ile ortak alan elektrik ve işletme giderlerinde %30 net tasarruf sağlanır."
  },
  {
    "slug": "1000-konutlu-toplu-konut-sitelerinde-merkezi-yonetim-ve-aidat-tasarrufu",
    "title": "1.000+ Bağımsız Bölümlü Mega Toplu Konut Sitelerinde Merkezi Yönetim ve Toplu Tedarik Gücü",
    "description": "Çok bloklu büyük toplu konut sitelerinde blok temsilciler kurulu işleyişi, ölçek ekonomisi ile toplu satın alma ve aidatlarda %25-33 tasarruf formülü.",
    "category": "tesis-yonetimi",
    "tags": [
      "toplu konut yönetimi",
      "mega site yönetimi",
      "aidat tasarrufu",
      "blok temsilciler kurulu",
      "kmk 37"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-17T11:00:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi/toplu-konut-yonetimi",
    "tldr": "1.000+ bağımsız bölümlü mega toplu konutlarda ölçek ekonomisi ve toplu tedarik gücü ile aidatlarda %25-33 somut maliyet tasarrufu elde edilir."
  },
  {
    "slug": "endustriyel-sanayi-tesislerinde-iso-45001-isg-ve-guvenlik-yonetimi",
    "title": "Endüstriyel Tesislerde ISO 45001 İSG ve Perimetre Güvenlik Yönetimi",
    "description": "Fabrikalar, lojistik depolar ve organize sanayi tesislerinde ağır teknik bakım, yangın hidrant hatları ve sıfır iş kazası odaklı entegre yönetim.",
    "category": "tesis-yonetimi",
    "tags": [
      "sanayi tesisi yönetimi",
      "fabrika yönetimi",
      "iso 45001",
      "perimetre güvenliği",
      "yangın hidrant"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-18T14:00:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi",
    "tldr": "Endüstriyel tesis ve fabrikalarda ISO 45001 iş sağlığı, yangın hidrant hatları periyodik testi ve 5188 perimetre güvenliği sıfır kaza hedefiyle yönetilir."
  },
  {
    "slug": "profesyonel-tesis-yonetim-sirketi-secim-rehberi-ve-ihale-sartnamesi",
    "title": "Profesyonel Tesis Yönetim Şirketi Nasıl Seçilir? 10 Maddelik Denetim ve Şartname Kontrol Listesi",
    "description": "Bina ve siteler için yönetim şirketi seçerken dikkat edilmesi gereken 10 yasal ve teknik kriter, ihale şartnamesi (RFP) hazırlama ve devir teslim rehberi.",
    "category": "tesis-yonetimi",
    "tags": [
      "tesis yönetimi seçimi",
      "yönetim ihale şartnamesi",
      "rfp",
      "sla taahhütleri",
      "yönetim devir teslim"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-19T09:30:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi/rehber",
    "tldr": "Site ve binalarınız için doğru yönetim şirketini seçerken ISO belgeleri, 5188 lisansı, SLA süreleri ve KMK 37 işletme projesi şeffaflığı temel kriterdir."
  },
  {
    "slug": "5188-ozel-guvenlik-gorevlisi-egitimi-ve-kimlik-yenileme-rehberi-2026",
    "title": "5188 Sayılı Özel Güvenlik Görevlisi Eğitimi ve Kimlik Yenileme Rehberi (2026)",
    "description": "5188 sayılı kanun kapsamında silahlı ve silahsız özel güvenlik eğitimi, 5 yılda bir kimlik kartı yenileme sınavı, sağlık raporu şartları ve kariyer fırsatları.",
    "category": "guvenlik",
    "tags": [
      "özel güvenlik eğitimi",
      "5188 güvenlik kursu",
      "güvenlik kimlik kartı",
      "silahlı özel güvenlik",
      "kimlik yenileme",
      "alo güvenlik"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-20T10:00:00.000Z",
    "dateModified": "2026-02-24T18:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "5188 sayılı Kanun kapsamında özel güvenlik görevlisi olmak veya 5 yılda bir kimlik kartını yenilemek için Emniyet Genel Müdürlüğü denetiminde yetkili kurumlardan eğitim almak ve ÖGG sınavını başarıyla geçmek şarttır."
  },
  {
    "slug": "sitelerde-5188-lisansli-ozel-guvenlik-sirketi-secim-kriterleri",
    "title": "Sitelerde 5188 Lisanslı Özel Güvenlik Şirketi Seçim Kriterleri ve İhale Kontrol Listesi",
    "description": "Konut siteleri ve rezidanslar için profesyonel özel güvenlik şirketi seçerken dikkat edilmesi gereken 8 kritik kriter: Valilik faaliyet izni, denetimler ve SLA taahhütleri.",
    "category": "guvenlik",
    "tags": [
      "özel güvenlik şirketi seçimi",
      "5188 lisansı",
      "site güvenliği",
      "3g güvenlik",
      "özel güvenlik ihalesi",
      "güvenlik kontrol listesi"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-21T11:30:00.000Z",
    "dateModified": "2026-02-24T18:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Site ve binalarınız için özel güvenlik şirketi seçerken İçişleri Bakanlığı Faaliyet İzin Belgesi, 3. Şahıs Mali Mesuliyet Sigortası, RFID devriye takibi ve tecrübeli süpervizör denetimleri temel şarttır."
  },
  {
    "slug": "aidat-borcu-icra-takibi-ve-yuzde-5-gecikme-tazminati-kmk-20",
    "title": "Aidatını Ödemeyen Kat Maliki İçin KMK m.20 İcra Takibi ve %5 Gecikme Tazminatı Süreci",
    "description": "Aidat borçluları hakkında Kat Mülkiyeti Kanunu Madde 20 kapsamında ilamsız icra takibi, noter ihtarnamesi ve Yargıtay emsal kararları.",
    "category": "hukuk",
    "tags": [
      "aidat icra takibi",
      "kmk madde 20",
      "yüzde 5 gecikme tazminatı",
      "yargıtay içtihadı",
      "ilamsız icra"
    ],
    "author": "eyup-salihoglu",
    "datePublished": "2026-02-22T13:00:00.000Z",
    "dateModified": "2026-02-24T14:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/aidat-takibi",
    "tldr": "KMK m.20 uyarınca aidatını vadesinde ödemeyen kat malikine aylık %5 gecikme tazminatı uygulanır ve mahkeme kararı aranmaksızın ilamsız icra takibi başlatılır."
  },
  {
    "slug": "sitelerde-5188-ozel-guvenlik-mevzuati-ve-valilik-izni-2026",
    "title": "Sitelerde 5188 Sayılı Kanun Kapsamında Özel Güvenlik İzni (ÖGİ) Alma Süreci (2026)",
    "description": "Apartman ve sitelerde yasal güvenlik görevlisi çalıştırmak için Valilik Özel Güvenlik İzni (ÖGİ) başvuru adımları, komisyon kararı ve yasal zorunluluklar.",
    "category": "guvenlik",
    "tags": [
      "özel güvenlik izni",
      "ögi başvurusu",
      "valilik güvenlik komisyonu",
      "5188 mevzuat",
      "site güvenliği izni"
    ],
    "author": "ahmet-yilmaz",
    "datePublished": "2026-08-07T11:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2069",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Sitelerde üniformalı ve yetkili güvenlik istihdam etmek için İl Özel Güvenlik Komisyonu'na başvurularak Valilik Özel Güvenlik İzni (ÖGİ) belgesi alınması kanunen zorunludur.",
    "dateModified": "2026-02-24T18:00:00.000Z"
  },
  {
    "slug": "ozel-guvenlik-sirketi-ve-site-guvenlik-yonetimi-2026",
    "title": "Özel Güvenlik Şirketi ve Entegre Site Güvenlik Yönetimi: Nizamiye, Kamera ve Devriye Rehberi",
    "description": "Sitelerde 7/24 entegre güvenlik operasyonu: nizamiyede kimlik kontrolü, AI plaka tanıma, çevre güvenlik kameraları ve acil durum müdahale protokolleri.",
    "category": "guvenlik",
    "tags": [
      "site güvenlik yönetimi",
      "nizamiye kontrolü",
      "akıllı bariyer",
      "plaka tanıma sistemi",
      "gece devriyesi",
      "3g güvenlik"
    ],
    "author": "elif-demir",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Entegre site güvenliği; eğitimli 5188 personeli, AI destekli çevre güvenlik kameraları, akıllı plaka tanıma bariyerleri ve 7/24 operasyon merkezi takibi ile kusursuz bir kalkan oluşturur.",
    "dateModified": "2026-02-24T18:00:00.000Z"
  },
  {
    "slug": "2024-aidat-artis-oranlari",
    "title": "Site ve Rezidanslarda Aidat Artış Oranları: TÜFE, Asgari Ücret ve KMK m.20 Rehberi (2026)",
    "description": "Site ve apartman aidat artış oranları nasıl belirlenir? TÜFE tavanı, asgari ücret artışının personel giderine etkisi, KMK m.20 arsa payı dağılımı ve dava hakları.",
    "category": "yonetim",
    "tags": [
      "aidat artış oranları",
      "site aidatı hesaplama",
      "kmk madde 20",
      "işletme projesi",
      "tüfe aidat artışı",
      "aidat zammı itiraz"
    ],
    "author": "elif-demir",
    "datePublished": "2026-01-15T08:00:00+03:00",
    "dateModified": "2026-02-24T20:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    "pillar": "/hizmetler/yonetim-danismanligi",
    "tldr": "Site aidat artışları kanunen sabit bir orana bağlı olmayıp; sitenin yıllık işletme bütçesindeki personel (SGK/asgari ücret), enerji, bakım ve demirbaş maliyet artışlarının KMK m.20 uyarınca kat maliklerine paylaştırılmasıyla belirlenir."
  },
  {
    "slug": "aidat-icra-takibi-nasil-yapilir",
    "title": "Aidat Borcu İçin İcra Takibi Nasıl Yapılır? Adım Adım Hukuki Süreç Rehberi",
    "description": "Apartman ve site aidat borcu icra takibi süreci: yasal dayanaklar, gerekli belgeler, ihtarname, harçlar, itirazın iptali davası ve tahsilat aşamaları.",
    "category": "hukuk",
    "tags": [
      "aidat icra takibi",
      "aidat borcu icra",
      "apartman aidat icra",
      "site aidat borcu",
      "kmk 20 icra",
      "aidat tahsilatı",
      "icra takibi adımları"
    ],
    "author": "av-mehmet-kaya",
    "datePublished": "2026-03-12T10:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070",
    "pillar": "/hizmetler/aidat-takibi",
    "tldr": "KMK m.20 uyarınca aidat borcu olan kat malikine karşı yöneticilik ilamsız icra takibi başlatabilir. Aylık %5 gecikme tazminatı uygulanır, borçlu 7 gün içinde itiraz etmezse takip kesinleşir ve haciz aşamasına geçilir.",
    "dateModified": "2026-02-24T14:00:00.000Z"
  },
  {
    "slug": "kentsel-donusum-surecleri",
    "title": "Kentsel Dönüşüm Süreçleri: Kat Malikleri İçin 6306 Sayılı Kanun Yol Haritası (2026)",
    "description": "6306 sayılı kanun kapsamında kentsel dönüşüm adımları: riskli yapı tespiti, salt çoğunluk (50+1) kuralı, müteahhit sözleşmesi, kira yardımı ve yasal haklar.",
    "category": "hukuk",
    "tags": [
      "kentsel dönüşüm",
      "6306 sayılı kanun",
      "riskli yapı tespiti",
      "kentsel dönüşüm çoğunluk",
      "bina yıkımı",
      "müteahhit sözleşmesi",
      "kira yardımı"
    ],
    "author": "av-mehmet-kaya",
    "datePublished": "2026-03-28T10:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=2070",
    "pillar": "/hizmetler/yonetim-danismanligi",
    "tldr": "6306 sayılı Kanun ile kentsel dönüşümde karar çoğunluğu salt çoğunluğa (yarıdan bir fazla) indirilmiştir. Riskli yapı tespiti, bakanlık lisanslı kuruluşlarca yapılır ve kesinleştiğinde 60+30 günlük tahliye süreci başlar.",
    "dateModified": "2026-02-24T14:00:00.000Z"
  },
  {
    "slug": "deprem-risk-analizi",
    "title": "Apartman ve Sitelerde Deprem Risk Analizi, Karot Testi ve Acil Durum Tahliye Rehberi (2026)",
    "description": "Deprem risk analizi adımları: bina statik incelemesi, karot numunesi, zemin etüdü, korozyon tespiti ve bina acil durum toplanma alanı planı.",
    "category": "guvenlik",
    "tags": [
      "deprem risk analizi",
      "karot testi",
      "bina dayanıklılık",
      "zemin etüdü",
      "deprem tahliye planı",
      "korozyon tespiti"
    ],
    "author": "mert-kaya",
    "datePublished": "2026-02-25T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Deprem risk analizi; üniversite ve bakanlık lisanslı laboratuvarlarca yapılan karot, donatı röntgeni ve zemin etüdü testleri ile binanın sismik güvenliğini ortaya koyar.",
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "yuzme-havuzu-bakim-kimyasallari",
    "title": "Yüzme Havuzu Bakım Kimyasalları Rehberi: Klor, pH Düşürücü, Çöktürücü ve Yosun Önleyici",
    "description": "Yüzme havuzlarında kullanılan kimyasalların doğru dozajı, şok klorlama yöntemleri, bağlı klor sorunları ve kimyasal depolama güvenlik kuralları.",
    "category": "teknik",
    "tags": [
      "havuz kimyasalları",
      "şok klorlama",
      "ph düşürücü",
      "yosun önleyici",
      "çöktürücü parlatıcı",
      "havuz suyu kimyası"
    ],
    "author": "mert-kaya",
    "datePublished": "2026-05-20T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1537565266751-341a94bc7d6f?q=80&w=2000&auto=format&fit=crop",
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Havuz kimyasallarının doğru oranlarda ve sırayla kullanılması su berraklığını sağlar, klor kokusunu (bağlı klor) yok eder ve yüzücü konforunu maksimize eder.",
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "site-yonetimine-gecis-rehberi",
    "title": "Müteahhitten Site Yönetimine Geçiş: Geçici Yönetim Devir Teslimi ve Genel Kurul Rehberi",
    "description": "İnşaatı tamamlanan yeni sitelerde müteahhit geçici yönetiminden kat malikleri yönetimine geçiş süreci: KMK Ek Madde 69, devir teslim tutanakları ve işletme projesi.",
    "category": "yonetim",
    "tags": [
      "müteahhitten devir teslim",
      "geçici site yönetimi",
      "ilk genel kurul",
      "kmk ek 69",
      "site yönetimine geçiş",
      "iskan sonrası yönetim"
    ],
    "author": "elif-demir",
    "datePublished": "2026-04-12T08:00:00+03:00",
    "dateModified": "2026-02-24T20:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    "pillar": "/hizmetler/yonetim-danismanligi",
    "tldr": "İskan alan yeni projelerde müteahhidin atadığı geçici yönetim en geç bağımsız bölümlerin üçte ikisinin fiilen tesliminden itibaren 1 yıl içinde ilk Kat Malikleri Genel Kurulunu toplayarak yönetimi devretmek zorundadır."
  },
  {
    "slug": "guvenlik-yonetimi-hizmeti-rehberi-2026",
    "title": "Güvenlik Yönetimi Hizmeti Rehberi: Siteler, Rezidanslar ve Plazalar İçin 360 Derece Koruma",
    "description": "Profesyonel güvenlik yönetimi rehberi: risk değerlendirmesi, elektronik güvenlik entegrasyonu, yangın erken uyarı ve 7/24 operasyon merkezi yönetimi.",
    "category": "guvenlik",
    "tags": [
      "güvenlik yönetimi rehberi",
      "site koruma",
      "kamera sistemleri",
      "yangın alarm",
      "3g güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Profesyonel güvenlik yönetimi; fiziksel güvenlik personeli ile ileri teknoloji elektronik sistemleri birleştirerek mülk değerini artırır ve 7/24 huzurlu yaşam alanı sunar.",
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "tesis-yonetimi-hizmeti-rehberi-2026",
    "title": "Tesis Yönetimi Hizmeti Kapsamlı Rehberi (2026): Hard/Soft Hizmetler, SLA ve Bütçe Yönetimi",
    "description": "Profesyonel tesis yönetimi hizmet rehberi: Entegre tesis işletmesi, ISO 41001 standartları, KPI/SLA performans göstergeleri ve şeffaf dijital raporlama.",
    "category": "yonetim",
    "tags": [
      "tesis yönetimi rehberi",
      "entegre tesis hizmetleri",
      "iso 41001",
      "sla taahhütleri",
      "tesis işletme",
      "mülk yönetimi"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:10:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Tesis yönetimi; gayrimenkulün tüm teknik bakım, güvenlik, temizlik, peyzaj ve mali operasyonlarını ISO 41001 standartlarında tek çatı altında toplayarak verimliliği maksimize eder.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "temizlik-ve-hijyen-hizmeti-rehberi-2026",
    "title": "Toplu Konut ve Plazalarda Profesyonel Temizlik ve Hijyen Yönetimi Rehberi (2026)",
    "description": "Sitelerde endüstriyel temizlik standartları: Renk kodlu mikrofiber bezler, zemin cila bakımı, çöp şutu dezenfeksiyonu ve Sağlık Bakanlığı onaylı hijyen protokolleri.",
    "category": "yonetim",
    "tags": [
      "site temizlik yönetimi",
      "apartman temizliği",
      "plaza hijyeni",
      "çöp şutu temizliği",
      "zemin cilalama",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:20:00+03:00",
    "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Profesyonel temizlik yönetimi; renk kodlu çapraz bulaşma önleme sistemleri, endüstriyel zemin bakım makineleri ve Sağlık Bakanlığı onaylı kimyasallarla sağlıklı yaşam alanları sunar.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "teknik-bakim-hizmeti-rehberi-2026",
    "title": "Tesis ve Binalarda Teknik Bakım Yönetimi Rehberi (2026): HVAC, Trafo, Jeneratör ve Asansör",
    "description": "Bina ve tesislerde periyodik teknik bakım: kazan dairesi brülör ayarı, jeneratör senkronizasyonu, trafo işletme sorumluluğu ve asansör yeşil etiket protokolleri.",
    "category": "teknik",
    "tags": [
      "teknik bakım rehberi",
      "tesis teknik işletme",
      "hvac mekanik",
      "trafo bakımı",
      "jeneratör transfer",
      "asansör yeşil etiket"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:30:00+03:00",
    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Periyodik teknik bakım; cihaz arıza risklerini %80 azaltır, enerji tüketiminde %25 tasarruf sağlar ve plansız yüksek maliyetli revizyonların önüne geçer.",
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "peyzaj-ve-bahce-bakimi-hizmeti-rehberi-2026",
    "title": "Sitelerde Profesyonel Peyzaj ve Bahçe Bakımı Rehberi: Sulama, Budama, İlaçlama ve Çim Bakımı",
    "description": "Toplu konut sitelerinde 4 mevsim bahçe ve peyzaj yönetimi: otomatik sulama nozulları, çim havalandırma, mevsimlik çiçeklendirme ve ağaç budama takvimi.",
    "category": "teknik",
    "tags": [
      "peyzaj bakımı",
      "site bahçe bakımı",
      "otomatik sulama",
      "çim biçme",
      "ağaç budama",
      "zirai mücadele"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:40:00+03:00",
    "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Düzenli peyzaj ve bahçe bakımı; sitenin estetik cazibesini ve gayrimenkul değerini %20 artırırken, akıllı sulama otomasyonu ile su faturalarında %40 tasarruf sağlar.",
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "havuz-bakimi-ve-hijyen-hizmeti-rehberi-2026",
    "title": "Sitelerde Yüzme Havuzu Bakımı ve Hijyen Rehberi: Günlük Ölçümler ve Biyosidal Standartlar",
    "description": "Açık ve kapalı yüzme havuzlarında Sağlık Bakanlığı onaylı hijyen yönetimi: serbest klor, pH dengeleme, çöktürücü, ters yıkama ve mikrobiyolojik testler.",
    "category": "teknik",
    "tags": [
      "havuz bakımı",
      "site havuz hijyeni",
      "havuz kimyasalları",
      "klor ph ölçümü",
      "lejyoner önleme",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:50:00+03:00",
    "image": "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070&auto=format&fit=crop",
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Yüzme havuzu bakımı; günlük klor ve pH ölçümleri, haftalık filtre ters yıkamaları ve aylık akredite laboratuvar testleri ile halk sağlığını güvenceye alır.",
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "hasere-ve-dezenfeksiyon-hizmeti-rehberi-2026",
    "title": "Toplu Konutlarda Biyosidal Haşere İlaçlama ve Dezenfeksiyon Rehberi (2026)",
    "description": "Sitelerde periyodik böcek ve kemirgen ilaçlama: Sağlık Bakanlığı onaylı biyosidal ürünler, kokusuz ULV sisleme, jel ilaçlama ve çöp şutu dezenfeksiyonu.",
    "category": "teknik",
    "tags": [
      "haşere ilaçlama",
      "site dezenfeksiyon",
      "kemirgen kontrolü",
      "jel ilaçlama",
      "biyosidal ürünler",
      "vektör mücadelesi"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T09:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1628352081506-83c43123edd7?q=80&w=2069&auto=format&fit=crop",
    "pillar": "/hizmetler/hasere-ve-dezenfeksiyon",
    "tldr": "Periyodik biyosidal ilaçlama; hamam böceği, kemirgen ve sivrisinek kaynaklı salgın hastalık risklerini önler ve ortak alan hijyen standartlarını sağlar.",
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "hukuk-ve-icra-danismanligi-hizmeti-rehberi-2026",
    "title": "Hukuk ve İcra Danışmanlığı: Aidat Takibi Rehberi (2026)",
    "description": "Site ve apartman yönetimlerinde hukuk ve icra danışmanlığı: KMK m.20 aidat tahsilatı, dava süreçleri, genel kurul iptali ve yasal risk yönetimi.",
    "category": "hukuk",
    "tags": [
      "hukuk danışmanlığı",
      "icra danışmanlığı",
      "site hukuku",
      "kmk davaları",
      "aidat tahsilatı",
      "apartman yönetimi hukuku"
    ],
    "author": "av-mehmet-kaya",
    "datePublished": "2026-08-07T11:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Site yönetimlerinde profesyonel hukuk danışmanlığı; aidat tahsilatını %98 seviyesine çıkarır, hatalı genel kurul kararlarını önler ve yöneticinin şahsi hukuki sorumluluğunu ortadan kaldırır.",
    "dateModified": "2026-02-24T14:00:00.000Z"
  },
  {
    "slug": "aidat-gec-odemesi-durumunda-ne-yapilir-2026",
    "title": "Aidat Gecikmesinde Yasal Süreç: KMK m.20 Aylık %5 Gecikme Tazminatı ve İcra Takibi Rehberi",
    "description": "Ödenmeyen site aidatlarında yöneticinin izleyeceği adımlar: SMS/ihtarname çekilmesi, aylık %5 yasal gecikme tazminatı, ilamsız icra takibi ve kiracı tahliyesi.",
    "category": "yonetim",
    "tags": [
      "aidat gecikme tazminatı",
      "kmk madde 20",
      "ödenmeyen aidat icra",
      "site aidat takibi",
      "yüzde 5 gecikme faizi",
      "iik örnek 7"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-07T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "KMK m.20 uyarınca aidatını vadesinde ödemeyen malik veya kiracıya aylık %5 gecikme tazminatı uygulanır; yönetici genel kurul kararına gerek olmaksızın doğrudan icra takibi başlatabilir.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "atasehir-guvenlik-yonetimi-2026",
    "title": "Ataşehir'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Ataşehir (Anadolu Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "atasehir güvenlik",
      "atasehir site güvenliği",
      "atasehir özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Ataşehir bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "atasehir-hasere-ve-dezenfeksiyon-2026",
    "title": "Ataşehir'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ataşehir (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "atasehir hasere-ve-dezenfeksiyon",
      "atasehir haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Ataşehir bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "atasehir-havuz-bakimi-ve-hijyen-2026",
    "title": "Ataşehir'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ataşehir (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "atasehir havuz-bakimi-ve-hijyen",
      "atasehir havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Ataşehir bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "atasehir-hukuk-ve-icra-danismanligi-2026",
    "title": "Ataşehir'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ataşehir (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "atasehir hukuk-ve-icra-danismanligi",
      "atasehir hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Ataşehir bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "atasehir-peyzaj-ve-bahce-bakimi-2026",
    "title": "Ataşehir'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ataşehir (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "atasehir peyzaj-ve-bahce-bakimi",
      "atasehir peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Ataşehir bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "atasehir-teknik-bakim-2026",
    "title": "Ataşehir'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Ataşehir (Anadolu Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "atasehir teknik bakım",
      "atasehir bina bakımı",
      "atasehir hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Ataşehir bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "atasehir-temizlik-ve-hijyen-2026",
    "title": "Ataşehir'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ataşehir (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "atasehir temizlik-ve-hijyen",
      "atasehir temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Ataşehir bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "atasehir-tesis-yonetimi-2026",
    "title": "Ataşehir'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ataşehir (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "atasehir tesis-yonetimi",
      "atasehir tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Ataşehir bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "bakirkoy-guvenlik-yonetimi-2026",
    "title": "Bakırköy'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Bakırköy (Avrupa Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "bakirkoy güvenlik",
      "bakirkoy site güvenliği",
      "bakirkoy özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Bakırköy bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "bakirkoy-hasere-ve-dezenfeksiyon-2026",
    "title": "Bakırköy'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Bakırköy (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "bakirkoy hasere-ve-dezenfeksiyon",
      "bakirkoy haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Bakırköy bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "bakirkoy-havuz-bakimi-ve-hijyen-2026",
    "title": "Bakırköy'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Bakırköy (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "bakirkoy havuz-bakimi-ve-hijyen",
      "bakirkoy havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Bakırköy bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "bakirkoy-hukuk-ve-icra-danismanligi-2026",
    "title": "Bakırköy'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Bakırköy (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "bakirkoy hukuk-ve-icra-danismanligi",
      "bakirkoy hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Bakırköy bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "bakirkoy-peyzaj-ve-bahce-bakimi-2026",
    "title": "Bakırköy'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Bakırköy (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "bakirkoy peyzaj-ve-bahce-bakimi",
      "bakirkoy peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Bakırköy bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "bakirkoy-teknik-bakim-2026",
    "title": "Bakırköy'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Bakırköy (Avrupa Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "bakirkoy teknik bakım",
      "bakirkoy bina bakımı",
      "bakirkoy hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Bakırköy bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "bakirkoy-temizlik-ve-hijyen-2026",
    "title": "Bakırköy'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Bakırköy (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "bakirkoy temizlik-ve-hijyen",
      "bakirkoy temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Bakırköy bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "bakirkoy-tesis-yonetimi-2026",
    "title": "Bakırköy'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Bakırköy (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "bakirkoy tesis-yonetimi",
      "bakirkoy tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Bakırköy bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "basaksehir-guvenlik-yonetimi-2026",
    "title": "Başakşehir'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Başakşehir (Avrupa Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "basaksehir güvenlik",
      "basaksehir site güvenliği",
      "basaksehir özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Başakşehir bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "basaksehir-hasere-ve-dezenfeksiyon-2026",
    "title": "Başakşehir'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Başakşehir (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "basaksehir hasere-ve-dezenfeksiyon",
      "basaksehir haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Başakşehir bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "basaksehir-havuz-bakimi-ve-hijyen-2026",
    "title": "Başakşehir'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Başakşehir (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "basaksehir havuz-bakimi-ve-hijyen",
      "basaksehir havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Başakşehir bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "basaksehir-hukuk-ve-icra-danismanligi-2026",
    "title": "Başakşehir'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Başakşehir (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "basaksehir hukuk-ve-icra-danismanligi",
      "basaksehir hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Başakşehir bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "basaksehir-peyzaj-ve-bahce-bakimi-2026",
    "title": "Başakşehir'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Başakşehir (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "basaksehir peyzaj-ve-bahce-bakimi",
      "basaksehir peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Başakşehir bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "basaksehir-teknik-bakim-2026",
    "title": "Başakşehir'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Başakşehir (Avrupa Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "basaksehir teknik bakım",
      "basaksehir bina bakımı",
      "basaksehir hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Başakşehir bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "basaksehir-temizlik-ve-hijyen-2026",
    "title": "Başakşehir'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Başakşehir (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "basaksehir temizlik-ve-hijyen",
      "basaksehir temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Başakşehir bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "basaksehir-tesis-yonetimi-2026",
    "title": "Başakşehir'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Başakşehir (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "basaksehir tesis-yonetimi",
      "basaksehir tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Başakşehir bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "besiktas-guvenlik-yonetimi-2026",
    "title": "Beşiktaş'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Beşiktaş (Avrupa Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "besiktas güvenlik",
      "besiktas site güvenliği",
      "besiktas özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Beşiktaş bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "besiktas-hasere-ve-dezenfeksiyon-2026",
    "title": "Beşiktaş'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beşiktaş (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "besiktas hasere-ve-dezenfeksiyon",
      "besiktas haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Beşiktaş bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "besiktas-havuz-bakimi-ve-hijyen-2026",
    "title": "Beşiktaş'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beşiktaş (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "besiktas havuz-bakimi-ve-hijyen",
      "besiktas havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Beşiktaş bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "besiktas-hukuk-ve-icra-danismanligi-2026",
    "title": "Beşiktaş'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beşiktaş (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "besiktas hukuk-ve-icra-danismanligi",
      "besiktas hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Beşiktaş bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "besiktas-peyzaj-ve-bahce-bakimi-2026",
    "title": "Beşiktaş'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beşiktaş (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "besiktas peyzaj-ve-bahce-bakimi",
      "besiktas peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Beşiktaş bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "besiktas-teknik-bakim-2026",
    "title": "Beşiktaş'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Beşiktaş (Avrupa Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "besiktas teknik bakım",
      "besiktas bina bakımı",
      "besiktas hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Beşiktaş bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "besiktas-temizlik-ve-hijyen-2026",
    "title": "Beşiktaş'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beşiktaş (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "besiktas temizlik-ve-hijyen",
      "besiktas temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Beşiktaş bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "besiktas-tesis-yonetimi-2026",
    "title": "Beşiktaş'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beşiktaş (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "besiktas tesis-yonetimi",
      "besiktas tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Beşiktaş bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "beylikduzu-guvenlik-yonetimi-2026",
    "title": "Beylikdüzü'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Beylikdüzü (Avrupa Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "beylikduzu güvenlik",
      "beylikduzu site güvenliği",
      "beylikduzu özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Beylikdüzü bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "beylikduzu-hasere-ve-dezenfeksiyon-2026",
    "title": "Beylikdüzü'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beylikdüzü (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "beylikduzu hasere-ve-dezenfeksiyon",
      "beylikduzu haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Beylikdüzü bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "beylikduzu-havuz-bakimi-ve-hijyen-2026",
    "title": "Beylikdüzü'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beylikdüzü (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "beylikduzu havuz-bakimi-ve-hijyen",
      "beylikduzu havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Beylikdüzü bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "beylikduzu-hukuk-ve-icra-danismanligi-2026",
    "title": "Beylikdüzü'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beylikdüzü (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "beylikduzu hukuk-ve-icra-danismanligi",
      "beylikduzu hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Beylikdüzü bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "beylikduzu-peyzaj-ve-bahce-bakimi-2026",
    "title": "Beylikdüzü'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beylikdüzü (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "beylikduzu peyzaj-ve-bahce-bakimi",
      "beylikduzu peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Beylikdüzü bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "beylikduzu-teknik-bakim-2026",
    "title": "Beylikdüzü'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Beylikdüzü (Avrupa Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "beylikduzu teknik bakım",
      "beylikduzu bina bakımı",
      "beylikduzu hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Beylikdüzü bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "beylikduzu-temizlik-ve-hijyen-2026",
    "title": "Beylikdüzü'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beylikdüzü (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "beylikduzu temizlik-ve-hijyen",
      "beylikduzu temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Beylikdüzü bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "beylikduzu-tesis-yonetimi-2026",
    "title": "Beylikdüzü'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Beylikdüzü (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "beylikduzu tesis-yonetimi",
      "beylikduzu tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Beylikdüzü bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "hukuk-ve-i-cra-danismanligi-hizmeti-rehberi-2026",
    "title": "Site ve Rezidanslarda Hukuk ve İcra Danışmanlığı Hizmeti Rehberi (2026)",
    "description": "Site yönetimlerinde hukuki risk yönetimi: KMK davaları, genel kurul iptal davaları, İİK 68/b kesinleşmiş işletme projesi icra takipleri ve iş hukuku danışmanlığı.",
    "category": "yonetim",
    "tags": [
      "site hukuk danışmanlığı",
      "aidat icra takibi",
      "kmk genel kurul davası",
      "yönetim planı hukuku",
      "kat mülkiyeti avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Site yönetimlerinde profesyonel hukuk danışmanlığı; genel kurul kararlarının yasal geçerliliğini sağlar, aidat tahsilatlarını hızlandırır ve yöneticileri kişisel tazminat risklerinden korur.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "isletme-projesi-nedir-ve-nasil-hazirlanir-2026",
    "title": "Site İşletme Projesi Nedir ve Nasıl Hazırlanır? KMK m.37 Adım Adım Bütçe Rehberi (2026)",
    "description": "Apartman ve sitelerde işletme projesi hazırlama rehberi: Tahmini gelir-gider bütçesi, arsa payı hesaplama tablosu, tebligat usulü ve 7 günlük kesinleşme süresi.",
    "category": "yonetim",
    "tags": [
      "işletme projesi hazırlama",
      "kmk madde 37",
      "site bütçesi hesaplama",
      "arsa payı aidat",
      "işletme projesi tebligatı",
      "aidat avansı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-07T09:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070",
    "pillar": "/hizmetler/yonetim-danismanligi",
    "tldr": "İşletme projesi; ana gayrimenkulün 1 yıllık tahmini gelir ve giderlerini gösteren ve KMK m.37 uyarınca her kat malikine tebliğ edilerek kesinleşen yasal bütçe belgesidir.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kadikoy-guvenlik-yonetimi-2026",
    "title": "Kadıköy'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Kadıköy (Anadolu Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "kadikoy güvenlik",
      "kadikoy site güvenliği",
      "kadikoy özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Kadıköy bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "kadikoy-hasere-ve-dezenfeksiyon-2026",
    "title": "Kadıköy'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kadıköy (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kadikoy hasere-ve-dezenfeksiyon",
      "kadikoy haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Kadıköy bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kadikoy-havuz-bakimi-ve-hijyen-2026",
    "title": "Kadıköy'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kadıköy (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kadikoy havuz-bakimi-ve-hijyen",
      "kadikoy havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Kadıköy bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kadikoy-hukuk-ve-icra-danismanligi-2026",
    "title": "Kadıköy'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kadıköy (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kadikoy hukuk-ve-icra-danismanligi",
      "kadikoy hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Kadıköy bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kadikoy-peyzaj-ve-bahce-bakimi-2026",
    "title": "Kadıköy'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kadıköy (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kadikoy peyzaj-ve-bahce-bakimi",
      "kadikoy peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Kadıköy bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kadikoy-teknik-bakim-2026",
    "title": "Kadıköy'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Kadıköy (Anadolu Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "kadikoy teknik bakım",
      "kadikoy bina bakımı",
      "kadikoy hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Kadıköy bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "kadikoy-temizlik-ve-hijyen-2026",
    "title": "Kadıköy'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kadıköy (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kadikoy temizlik-ve-hijyen",
      "kadikoy temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Kadıköy bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kadikoy-tesis-yonetimi-2026",
    "title": "Kadıköy'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kadıköy (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kadikoy tesis-yonetimi",
      "kadikoy tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Kadıköy bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kartal-guvenlik-yonetimi-2026",
    "title": "Kartal'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Kartal (Anadolu Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "kartal güvenlik",
      "kartal site güvenliği",
      "kartal özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Kartal bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "kartal-hasere-ve-dezenfeksiyon-2026",
    "title": "Kartal'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kartal (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kartal hasere-ve-dezenfeksiyon",
      "kartal haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Kartal bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kartal-havuz-bakimi-ve-hijyen-2026",
    "title": "Kartal'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kartal (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kartal havuz-bakimi-ve-hijyen",
      "kartal havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Kartal bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kartal-hukuk-ve-icra-danismanligi-2026",
    "title": "Kartal'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kartal (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kartal hukuk-ve-icra-danismanligi",
      "kartal hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Kartal bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kartal-peyzaj-ve-bahce-bakimi-2026",
    "title": "Kartal'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kartal (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kartal peyzaj-ve-bahce-bakimi",
      "kartal peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Kartal bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kartal-teknik-bakim-2026",
    "title": "Kartal'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Kartal (Anadolu Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "kartal teknik bakım",
      "kartal bina bakımı",
      "kartal hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Kartal bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "kartal-temizlik-ve-hijyen-2026",
    "title": "Kartal'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kartal (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kartal temizlik-ve-hijyen",
      "kartal temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Kartal bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kartal-tesis-yonetimi-2026",
    "title": "Kartal'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Kartal (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "kartal tesis-yonetimi",
      "kartal tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Kartal bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "kat-mulkiyeti-kanunu-site-yoneticisi-haklari-2026",
    "title": "Kat Mülkiyeti Kanunu'nda Site Yöneticisinin Hak ve Yükümlülükleri (KMK 34-40 Rehberi)",
    "description": "634 sayılı Kat Mülkiyeti Kanunu kapsamında site ve apartman yöneticisinin yasal hakları, görevleri, ücret hakkı, vekalet yetkisi ve cezai sorumlulukları.",
    "category": "hukuk",
    "tags": [
      "site yöneticisi hakları",
      "kmk yönetici",
      "yönetici sorumluluğu",
      "apartman yöneticisi hakları",
      "kat mülkiyeti kanunu",
      "yönetici ücreti"
    ],
    "author": "av-mehmet-kaya",
    "datePublished": "2026-08-07T11:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070",
    "pillar": "/hizmetler/yonetim-danismanligi",
    "tldr": "KMK m.34-40 uyarınca yönetici, kat malikleri kurulunun vekili hükmündedir. KMK m.40 uyarınca yönetim planında aksi kararlaştırılmadıkça yönetici uygun bir ücret talep etme hakkına sahiptir.",
    "dateModified": "2026-02-24T14:00:00.000Z"
  },
  {
    "slug": "maltepe-guvenlik-yonetimi-2026",
    "title": "Maltepe'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Maltepe (Anadolu Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "maltepe güvenlik",
      "maltepe site güvenliği",
      "maltepe özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Maltepe bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "maltepe-hasere-ve-dezenfeksiyon-2026",
    "title": "Maltepe'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Maltepe (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "maltepe hasere-ve-dezenfeksiyon",
      "maltepe haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Maltepe bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "maltepe-havuz-bakimi-ve-hijyen-2026",
    "title": "Maltepe'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Maltepe (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "maltepe havuz-bakimi-ve-hijyen",
      "maltepe havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Maltepe bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "maltepe-hukuk-ve-icra-danismanligi-2026",
    "title": "Maltepe'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Maltepe (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "maltepe hukuk-ve-icra-danismanligi",
      "maltepe hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Maltepe bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "maltepe-peyzaj-ve-bahce-bakimi-2026",
    "title": "Maltepe'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Maltepe (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "maltepe peyzaj-ve-bahce-bakimi",
      "maltepe peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Maltepe bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "maltepe-teknik-bakim-2026",
    "title": "Maltepe'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Maltepe (Anadolu Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "maltepe teknik bakım",
      "maltepe bina bakımı",
      "maltepe hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Maltepe bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "maltepe-temizlik-ve-hijyen-2026",
    "title": "Maltepe'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Maltepe (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "maltepe temizlik-ve-hijyen",
      "maltepe temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Maltepe bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "maltepe-tesis-yonetimi-2026",
    "title": "Maltepe'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Maltepe (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "maltepe tesis-yonetimi",
      "maltepe tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Maltepe bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sariyer-guvenlik-yonetimi-2026",
    "title": "Sarıyer'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Sarıyer (Avrupa Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "sariyer güvenlik",
      "sariyer site güvenliği",
      "sariyer özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Sarıyer bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "sariyer-hasere-ve-dezenfeksiyon-2026",
    "title": "Sarıyer'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Sarıyer (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sariyer hasere-ve-dezenfeksiyon",
      "sariyer haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Sarıyer bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sariyer-havuz-bakimi-ve-hijyen-2026",
    "title": "Sarıyer'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Sarıyer (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sariyer havuz-bakimi-ve-hijyen",
      "sariyer havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Sarıyer bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sariyer-hukuk-ve-icra-danismanligi-2026",
    "title": "Sarıyer'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Sarıyer (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sariyer hukuk-ve-icra-danismanligi",
      "sariyer hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Sarıyer bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sariyer-peyzaj-ve-bahce-bakimi-2026",
    "title": "Sarıyer'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Sarıyer (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sariyer peyzaj-ve-bahce-bakimi",
      "sariyer peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Sarıyer bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sariyer-teknik-bakim-2026",
    "title": "Sarıyer'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Sarıyer (Avrupa Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "sariyer teknik bakım",
      "sariyer bina bakımı",
      "sariyer hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Sarıyer bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "sariyer-temizlik-ve-hijyen-2026",
    "title": "Sarıyer'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Sarıyer (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sariyer temizlik-ve-hijyen",
      "sariyer temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Sarıyer bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sariyer-tesis-yonetimi-2026",
    "title": "Sarıyer'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Sarıyer (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sariyer tesis-yonetimi",
      "sariyer tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Sarıyer bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sisli-guvenlik-yonetimi-2026",
    "title": "Şişli'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Şişli (Avrupa Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "sisli güvenlik",
      "sisli site güvenliği",
      "sisli özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Şişli bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "sisli-hasere-ve-dezenfeksiyon-2026",
    "title": "Şişli'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Şişli (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sisli hasere-ve-dezenfeksiyon",
      "sisli haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Şişli bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sisli-havuz-bakimi-ve-hijyen-2026",
    "title": "Şişli'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Şişli (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sisli havuz-bakimi-ve-hijyen",
      "sisli havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Şişli bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sisli-hukuk-ve-icra-danismanligi-2026",
    "title": "Şişli'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Şişli (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sisli hukuk-ve-icra-danismanligi",
      "sisli hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Şişli bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sisli-peyzaj-ve-bahce-bakimi-2026",
    "title": "Şişli'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Şişli (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sisli peyzaj-ve-bahce-bakimi",
      "sisli peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Şişli bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sisli-teknik-bakim-2026",
    "title": "Şişli'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Şişli (Avrupa Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "sisli teknik bakım",
      "sisli bina bakımı",
      "sisli hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Şişli bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "sisli-temizlik-ve-hijyen-2026",
    "title": "Şişli'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Şişli (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sisli temizlik-ve-hijyen",
      "sisli temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Şişli bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "sisli-tesis-yonetimi-2026",
    "title": "Şişli'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Şişli (Avrupa Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "sisli tesis-yonetimi",
      "sisli tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Şişli bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "site-guvenligi-icin-5188-kanunu-kapsami-2026",
    "title": "Site Güvenliği İçin 5188 Sayılı Kanun: Kapsamı, Görevli Yetkileri ve Yasal Sınırlar (2026)",
    "description": "5188 sayılı kanunun sitelere uygulanması: güvenlik görevlilerinin kimlik sorma, arama, zor kullanma yetkileri, silah taşıma kuralları ve cezai sorumluluklar.",
    "category": "guvenlik",
    "tags": [
      "5188 kanunu",
      "güvenlik yetkileri",
      "zor kullanma hakkı",
      "kimlik sorma yetkisi",
      "site güvenlik hukuku"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-07T11:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "5188 sayılı Kanun özel güvenlik görevlilerine belirli yasal yetkiler (kimlik sorma, arama, yakalama) tanırken, bu yetkilerin sınırlarının aşılması TCK kapsamında suç teşkil eder.",
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "tesis-yonetim-sirketi-nasil-secilir-2026",
    "title": "Tesis Yönetim Şirketi Nasıl Seçilir? 7 Kritik Kriter ve İhale Şartnamesi Rehberi (2026)",
    "description": "Doğru site ve tesis yönetim şirketi seçimi için 7 altın kural: Mali şeffaflık, kurumsal referanslar, 5188 güvenlik lisansı, teknik kadro ve ihale şartnamesi.",
    "category": "yonetim",
    "tags": [
      "tesis yönetim şirketi seçimi",
      "site yönetim firması",
      "ihale şartnamesi",
      "yönetim firması kriterleri",
      "alo yönetim",
      "profesyonel yönetim"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-07T12:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Tesis yönetim şirketi seçerken sermaye yeterliliği, ERP yazılım şeffaflığı, 5188 güvenlik lisansı (3G Güvenlik), kadrolu teknik mühendislik ve denetlenebilir banka entegrasyonu aranmalıdır.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "umraniye-guvenlik-yonetimi-2026",
    "title": "Ümraniye'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Ümraniye (Anadolu Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "umraniye güvenlik",
      "umraniye site güvenliği",
      "umraniye özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Ümraniye bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "umraniye-hasere-ve-dezenfeksiyon-2026",
    "title": "Ümraniye'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ümraniye (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "umraniye hasere-ve-dezenfeksiyon",
      "umraniye haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Ümraniye bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "umraniye-havuz-bakimi-ve-hijyen-2026",
    "title": "Ümraniye'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ümraniye (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "umraniye havuz-bakimi-ve-hijyen",
      "umraniye havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Ümraniye bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "umraniye-hukuk-ve-icra-danismanligi-2026",
    "title": "Ümraniye'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ümraniye (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "umraniye hukuk-ve-icra-danismanligi",
      "umraniye hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Ümraniye bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "umraniye-peyzaj-ve-bahce-bakimi-2026",
    "title": "Ümraniye'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ümraniye (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "umraniye peyzaj-ve-bahce-bakimi",
      "umraniye peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Ümraniye bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "umraniye-teknik-bakim-2026",
    "title": "Ümraniye'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Ümraniye (Anadolu Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "umraniye teknik bakım",
      "umraniye bina bakımı",
      "umraniye hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Ümraniye bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "umraniye-temizlik-ve-hijyen-2026",
    "title": "Ümraniye'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ümraniye (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "umraniye temizlik-ve-hijyen",
      "umraniye temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Ümraniye bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "umraniye-tesis-yonetimi-2026",
    "title": "Ümraniye'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Ümraniye (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "umraniye tesis-yonetimi",
      "umraniye tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Ümraniye bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "uskudar-guvenlik-yonetimi-2026",
    "title": "Üsküdar'de Site ve Rezidans Özel Güvenlik Yönetimi (2026 Rehberi)",
    "description": "Üsküdar (Anadolu Yakası) bölgesindeki siteler, lüks rezidanslar ve plazalar için 5188 lisanslı özel güvenlik, PTS bariyer otomasyonu ve 3G Güvenlik koruma çözümleri.",
    "category": "guvenlik",
    "tags": [
      "uskudar güvenlik",
      "uskudar site güvenliği",
      "uskudar özel güvenlik",
      "5188 güvenlik şirketi",
      "3g güvenlik",
      "alo güvenlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/guvenlik-yonetimi",
    "tldr": "Üsküdar bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik 7/24 süpervizör denetim ağıyla üst düzey koruma sağlıyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "uskudar-hasere-ve-dezenfeksiyon-2026",
    "title": "Üsküdar'de Haşere ve Dezenfeksiyon Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Üsküdar (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel haşere ve dezenfeksiyon hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "uskudar hasere-ve-dezenfeksiyon",
      "uskudar haşere ve dezenfeksiyon",
      "haşere ilaçlama",
      "dezenfeksiyon",
      "böcek ilaçlama",
      "kemirgen kontrolü",
      "biyosidal uygulama",
      "çöp odası ilaçlama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Üsküdar bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "uskudar-havuz-bakimi-ve-hijyen-2026",
    "title": "Üsküdar'de Havuz Bakımı ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Üsküdar (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel havuz bakımı ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "uskudar havuz-bakimi-ve-hijyen",
      "uskudar havuz bakımı ve hijyen",
      "havuz bakımı",
      "yüzme havuzu hijyeni",
      "klor ph ölçümü",
      "havuz kimyasalları",
      "sağlık bakanlığı havuz"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/havuz-bakimi",
    "tldr": "Üsküdar bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "uskudar-hukuk-ve-icra-danismanligi-2026",
    "title": "Üsküdar'de Hukuk ve İcra Danışmanlığı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Üsküdar (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel hukuk ve i̇cra danışmanlığı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "uskudar hukuk-ve-icra-danismanligi",
      "uskudar hukuk ve i̇cra danışmanlığı",
      "hukuk danışmanlığı",
      "icra takibi",
      "aidat hukuku",
      "kat mülkiyeti kanunu",
      "kmk avukatı"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "Üsküdar bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "uskudar-peyzaj-ve-bahce-bakimi-2026",
    "title": "Üsküdar'de Peyzaj ve Bahçe Bakımı Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Üsküdar (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel peyzaj ve bahçe bakımı hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "uskudar peyzaj-ve-bahce-bakimi",
      "uskudar peyzaj ve bahçe bakımı",
      "peyzaj bakımı",
      "bahçe bakımı",
      "çim biçme",
      "otomatik sulama",
      "zirai mücadele",
      "ağaç budama"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/peyzaj-ve-bahce-bakimi",
    "tldr": "Üsküdar bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "uskudar-teknik-bakim-2026",
    "title": "Üsküdar'de Plaza ve Siteler İçin Profesyonel Teknik Bakım Hizmetleri (2026)",
    "description": "Üsküdar (Anadolu Yakası) bölgesindeki binalarda HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, kompanzasyon takibi, asansör yeşil etiket ve hidrofor bakımı.",
    "category": "teknik",
    "tags": [
      "uskudar teknik bakım",
      "uskudar bina bakımı",
      "uskudar hidrofor arıza",
      "asansör yeşil etiket",
      "trafo işletme",
      "hvac mekanik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/teknik-bakim",
    "tldr": "Üsküdar bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan 7/24 nöbetçi teknik servis, EMO onaylı trafo işletme sorumluluğu ve %25 enerji tasarrufu mühendisliği sunuyoruz.",
    "dateModified": "2026-02-24T19:00:00.000Z"
  },
  {
    "slug": "uskudar-temizlik-ve-hijyen-2026",
    "title": "Üsküdar'de Temizlik ve Hijyen Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Üsküdar (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel temizlik ve hijyen hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "uskudar temizlik-ve-hijyen",
      "uskudar temizlik ve hijyen",
      "temizlik ve hijyen",
      "site temizliği",
      "apartman temizliği",
      "ortak alan hijyeni",
      "biyosidal temizlik"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/temizlik-ve-hijyen",
    "tldr": "Üsküdar bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  },
  {
    "slug": "uskudar-tesis-yonetimi-2026",
    "title": "Üsküdar'de Tesis Yönetimi Hizmeti: 2026 Yerel Rehber ve Standartlar",
    "description": "Üsküdar (Anadolu Yakası) bölgesindeki siteler ve binalar için profesyonel tesis yönetimi hizmeti, standartlar, fiyatlandırma ve yerel operasyon çözümleri.",
    "category": "yonetim",
    "tags": [
      "uskudar tesis-yonetimi",
      "uskudar tesis yönetimi",
      "tesis yönetimi",
      "site yönetimi",
      "profesyonel yönetim",
      "alo yönetim",
      "bina işletme"
    ],
    "author": "alo-yonetim-editor",
    "datePublished": "2026-08-06T08:00:00+03:00",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Üsküdar bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro, şeffaf yönetim ve yüksek kalite güvencesiyle 7/24 yürütüyoruz.",
    "dateModified": "2026-02-24T20:00:00.000Z"
  }
];

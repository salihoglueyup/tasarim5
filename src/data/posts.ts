/**
 * Blog içerik motoru — tek, ölçeklenebilir veri kaynağı
 * (SEO Master Plan V4 — Bölüm G, Faz 151/160).
 *
 * Karar (Faz 151): MDX toolchain yerine tip-güvenli, yapılandırılmış veri modeli.
 * İçerik "block" dizisi olarak tutulur; sunucuda render edilir (AI/crawler dostu,
 * JS-bağımsız), Article schema ve otomatik iç linkleme buradan beslenir.
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'cta'; text: string; href: string; label: string }
  | { type: 'table'; headers?: string[]; rows?: string[][]; caption?: string };

export type Category = { slug: string; name: string; description: string };

export const CATEGORIES: Category[] = [
  {
    "slug": "tesis-yonetimi",
    "name": "Tesis & Mülk Yönetimi",
    "description": "Rezidans, plaza, toplu konut, sanayi tesisi ve profesyonel mülk işletmeciliği rehberleri."
  },
  {
    "slug": "hukuk",
    "name": "Hukuk & Mevzuat",
    "description": "Kat Mülkiyeti Kanunu, aidat icra takibi ve yönetim hukuku rehberleri."
  },
  {
    "slug": "guvenlik",
    "name": "Güvenlik",
    "description": "Site güvenliği, özel güvenlik mevzuatı ve risk yönetimi içerikleri."
  },
  {
    "slug": "teknik",
    "name": "Teknik Bakım",
    "description": "Asansör, havuz, jeneratör ve enerji verimliliği rehberleri."
  },
  {
    "slug": "yonetim",
    "name": "Yönetim & Bütçe",
    "description": "Aidat yönetimi, bütçe optimizasyonu ve şeffaf site yönetimi."
  }
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string; // Category slug
  tags: string[];
  author: string; // Author slug
  datePublished: string; // ISO
  dateModified?: string;
  image: string;
  /** İlgili pillar hizmet sayfası (cluster → pillar iç link). */
  pillar: string;
  /** AI/snippet özeti (Faz 134). */
  tldr: string;
  content: PostBlock[];
};

export { POSTS_META, type PostMeta } from './postsMetadata';

export const POSTS: Post[] = [
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
    "tldr": "Tesis yönetimi; insan, mekan, süreç ve teknolojiyi entegre ederek binaların güvenli, sürdürülebilir, konforlu ve maliyet etkin biçimde işletilmesini sağlayan profesyonel disiplindir.",
    "content": [
      {
        "type": "p",
        "text": "Günümüzün hızla dikey büyüyen metropollerinde rezidanslar, plazalar, lojistik depolar ve binlerce kişinin bir arada yaşadığı karma projeler; klasik bir kapıcı veya amatör yönetici refleksiyle idare edilemeyecek kadar devasa operasyonel hacimlere ulaşmıştır. Elektrik trafoları, merkezi iklimlendirme sistemleri, yangın hidrant hatları, 5188 sayılı özel güvenlik operasyonları ve milyonlarca liralık işletme bütçeleri, mühendislik vizyonu ve hukuki uzmanlık gerektirir. İşte bu noktada Tesis Yönetimi (Facility Management - FM) küresel bir disiplin ve endüstri standardı olarak devreye girer."
      },
      {
        "type": "h2",
        "text": "1. Tesis Yönetimi (Facility Management) Nedir?"
      },
      {
        "type": "p",
        "text": "Uluslararası Tesis Yönetimi Derneği (IFMA) ve Uluslararası Standartlar Teşkilatı (ISO) tanımlarına göre tesis yönetimi; \"İnsanların yaşadığı veya çalıştığı yapılı çevrede (binalar, siteler, iş merkezleri, fabrikalar) konforu, güvenliği, işlevselliği, sürdürülebilirliği ve maliyet etkinliğini sağlamak amacıyla insan, mekan, süreç ve teknolojiyi entegre eden profesyonel yönetim fonksiyonudur.\""
      },
      {
        "type": "p",
        "text": "Tesis yönetimi yalnızca bir arıza meydana geldiğinde tamirci çağırmak değildir; binanın 10, 20 ve 50 yıllık yaşam döngüsünü (Life-Cycle Cost) planlayarak demirbaş amortismanını yöneten, enerji verimliliğini artıran ve kat sakinlerine huzurlu bir yaşam ortamı sunan proaktif bir organizasyondur."
      },
      {
        "type": "h2",
        "text": "2. ISO 41001:2018 Entegre Tesis Yönetim Standardı ve İlkeleri"
      },
      {
        "type": "p",
        "text": "Küresel ölçekte kabul gören ISO 41001:2018 Entegre Tesis Yönetim Sistemi Standardı, kurumsal işletmeciliğin anayasası niteliğindedir. Bu standart tesis yönetiminin şu 4 ana hedefe odaklanmasını şart koşar:"
      },
      {
        "type": "ul",
        "items": [
          "Kaynak ve Enerji Verimliliği: Ortak alan enerji tüketimi, su tüketimi ve kimyasal kullanımında %25-33 oranında ölçülebilir tasarruf sağlamak.",
          "Operasyonel İş Sürekliliği (Business Continuity): Jeneratör, trafo, hidrofor ve asansör gibi kritik bileşenlerde arıza duruş sürelerini sıfıra indirmek.",
          "Yasal Mevzuat Uyumu: 634 Sayılı Kat Mülkiyeti Kanunu (KMK), 5188 Sayılı Özel Güvenlik Kanunu ve 6331 Sayılı İSG Kanunu gereklerini eksiksiz yerine getirmek.",
          "Müşteri ve Sakin Memnuniyeti (SLA): 7/24 çağrı merkezi ve dijital talep sistemi üzerinden arızalara maksimum 45 dakika içinde müdahale garantisi sunmak."
        ]
      },
      {
        "type": "h2",
        "text": "3. Geleneksel Site Yöneticiliği ile Profesyonel Tesis Yönetimi Arasındaki 5 Temel Fark"
      },
      {
        "type": "quote",
        "text": "Geleneksel yöneticilik reaktiftir; yani asansör bozulunca usta çağırır. Profesyonel tesis yönetimi ise proaktiftir; kestirimci sensörler ve planlı bakımlarla asansörün hiç arızalanmamasını sağlar."
      },
      {
        "type": "p",
        "text": "Amatör yönetimler genellikle kat sakinlerinin boş vakitlerinde yürüttüğü, şeffaf olmayan excel tablolarına ve komşuluk tartışmalarına dayanan kırılgan bir yapıya sahiptir. Oysa profesyonel tesis yönetimi:"
      },
      {
        "type": "ol",
        "items": [
          "Hukuki Güvence Sunar: Noter onaylı işletme projesi tebligatı ve KMK m.20 icra takipleri uzman hukukçularca yürütülür.",
          "Toplu Tedarik Gücü Sağlar: Yüzlerce projeyi yönetmenin getirdiği satın alma hacmi ile asansör, kimyasal ve sigortada %35 indirim kazandırır.",
          "7/24 Şeffaf Mobil Takip Sağlar: Sakinler tüm gelir-gider faturalarını ve denetim raporlarını cep telefonu uygulamasından anlık görebilir.",
          "İşveren Risklerini Sıfırlar: Kapıcı, güvenlik ve temizlik personelinin kıdem tazminatı ve SGK sorumlulukları kurumsal güvenceye alınır.",
          "Mülk Değerini Yükseltir: Düzenli ve prestijli işletilen binalarda dairelerin satış ve kira değeri emsallerine göre %20-30 daha yüksek seyreder."
        ]
      },
      {
        "type": "h2",
        "text": "4. Tesis Yönetiminin 4 Stratejik Sütunu"
      },
      {
        "type": "p",
        "text": "Başarılı bir tesis işletmesi, 4 temel fonksiyonun birbiriyle senkronize çalışmasıyla mümkündür:"
      },
      {
        "type": "ul",
        "items": [
          "1. İnsan (People): 5188 lisanslı özel güvenlik görevlileri, sertifikalı teknik teknisyenler ve güler yüzlü VIP concierge personeli.",
          "2. Mekan (Place): Peyzaj alanları, kapalı otoparklar, sığınaklar, sosyal tesisler, yüzme havuzları ve ortak koridorlar.",
          "3. Süreç (Process): KMK bütçe hazırlama, acil durum tahliye planları, yangın tatbikatları ve periyodik bakım takvimleri.",
          "4. Teknoloji (Technology): Akıllı plaka tanıma sistemleri (PTS), IoT enerji analizörleri, RFID devriye tur kalemleri ve bina otomasyonu (BMS)."
        ]
      },
      {
        "type": "h2",
        "text": "5. Tesis Yönetiminde Sık Yapılan 4 Hata ve Çözüm Yolları"
      },
      {
        "type": "ul",
        "items": [
          "Yetkisiz Bekçi Çalıştırmak: 5188 lisansı olmayan kişilere üniforma giydirip güvenlik hizmeti verdirmek yüz binlerce liralık idari para cezalarına yol açar. Çözüm: Valilik izinli kurumsal güvenlik firmasıyla çalışmaktır.",
          "İşletme Projesini Tebliğ Etmemek: KMK m.37 uyarınca taahhütlü mektupla veya imza karşılığı tebliğ edilmeyen aidat bütçesi hukuken kesinleşmez ve icra takipleri iptal olur.",
          "Bakımları Belgesiz Münferit Ustalara Yaptırmak: TSE HYB belgesi olmayan ustalara yapılan asansör ve hidrofor bakımları olası can kayıplarında yöneticiye hapis cezası sorumluluğu doğurur.",
          "Gecikme Tazminatını Yanlış Uygulamak: KMK m.20 uyarınca aidat gecikme tazminatı aylık %5 (yıllık %60) olarak hesaplanmalıdır; farklı oranlar mahkemeden döner."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Tesis yönetim şirketiyle çalışmak aidatları artırır mı?\nCevap: Hayır, tam aksine. Profesyonel yönetim şirketleri toplu elektrik tedariki, asansör bakım indirimleri ve gereksiz personel optimizasyonu sayesinde aidat bütçelerinde ortalama %25-33 net tasarruf sağlar."
      },
      {
        "type": "p",
        "text": "Soru: Kaç daireli binalar tesis yönetimine ihtiyaç duyar?\nCevap: 8 bağımsız bölümden büyük tüm binalarda kanunen yönetici seçimi zorunludur. Ancak merkezi ısıtma, asansör, jeneratör ve ortak güvenlik ihtiyacı olan 20 daire ve üzeri tüm yapılarda profesyonel tesis yönetimi vazgeçilmez bir gerekliliktir."
      },
      {
        "type": "cta",
        "text": "Tesisiniz için ISO 41001 standartlarında profesyonel yönetim teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Tesis Yönetimi Çözümlerimiz"
      }
    ]
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
    "tldr": "Entegre tesis yönetimi; temizlikten güvenliğe, teknik bakımdan aidat tahsilatına kadar tüm bina fonksiyonlarını tek bir kurumsal çatı altında toplayan uçtan uca işletme modelidir.",
    "content": [
      {
        "type": "p",
        "text": "Büyük ölçekli konut projelerinde, plazalarda ve organize sanayi sitelerinde temizliği bir taşerona, güvenliği başka bir firmaya, asansör ve hidrofor bakımını ayrı ustalara, aidat takibini ise münferit bir muhasebeciye vermek; koordinasyon krizlerine, mükerrer faturalandırmalara ve sorumluluğu birbirine atma sorununa yol açar. Entegre Tesis Yönetimi (Integrated Facility Management - IFM), bir yapının ihtiyaç duyduğu tüm operasyonel, teknik ve hukuki hizmetleri tek bir kurumsal çatı ve tek bir sözleşme altında birleştiren modern yönetim modelidir."
      },
      {
        "type": "h2",
        "text": "1. Entegre Tesis Yönetiminin 3 Ana Hizmet Sütunu"
      },
      {
        "type": "h3",
        "text": "A. Teknik İşletme ve Bakım Hizmetleri (Hard Services)"
      },
      {
        "type": "p",
        "text": "Binanın fiziksel varlıklarını, enerji altyapısını ve mekanik sistemlerini kapsar. Bu hizmetler binanın güvenliğini ve iş sürekliliğini teminat altına alır:"
      },
      {
        "type": "ul",
        "items": [
          "HVAC ve Merkezi İklimlendirme: Chiller soğutma grupları, kazan daireleri, klima santralleri ve fan-coil filtre bakımları.",
          "Elektrik ve Enerji Altyapısı: Yüksek gerilim trafo işletme sorumluluğu, kompanzasyon panosu reaktif ceza takibi ve transfer panolu jeneratör bakımı.",
          "Dikey Taşıma Sistemleri: TSE onaylı A Tipi Muayene Kuruluşları ile yeşil etiket asansör denetimleri ve yürüyen merdiven kontrolleri.",
          "Yangın ve Güvenlik Otomasyonu: Yangın hidrant hatları, sprinkler pompaları, duman tahliye damperleri ve acil anons testleri.",
          "Sıhhi Tesisat ve Arıtma: Su depoları periyodik dezenfeksiyonu, hidrofor basınç ayarları ve pis su terfi pompaları kontrolleri."
        ]
      },
      {
        "type": "h3",
        "text": "B. Destek ve Yaşam Hizmetleri (Soft Services)"
      },
      {
        "type": "p",
        "text": "Sakinlerin ve ziyaretçilerin günlük konforunu, sağlığını ve güvenliğini doğrudan etkileyen insan odaklı hizmetlerdir:"
      },
      {
        "type": "ul",
        "items": [
          "5188 Lisanslı Özel Güvenlik: 7/24 fiziki koruma, CCTV çevre güvenlik kameraları izleme ve plaka tanıma sistemi (PTS) yönetimi (Grup şirketimiz 3G Özel Güvenlik güvencesiyle).",
          "Endüstriyel Hijyen ve Temizlik: Ortak alanlar, merdivenler, otoparklar, çöp şutları ve cam cephelerin Sağlık Bakanlığı onaylı kimyasallarla temizliği.",
          "VIP Concierge ve Resepsiyon: Lobi karşılama, kargo/kurye kabul otomasyonu, VIP transfer ve sakin talep yönetimi.",
          "Peyzaj ve Bahçe Bakımı: Çim biçme, mevsimlik budama, otomatik sulama sistemi yönetimi ve bitki besleme.",
          "Vektör İlaçlama ve Sıfır Atık: Haşere kontrolü ve Çevre Şehircilik Bakanlığı Sıfır Atık Yönetmeliği uyumlu geri dönüşüm ayrıştırması."
        ]
      },
      {
        "type": "h3",
        "text": "C. Hukuki, Mali ve İdari Yönetim"
      },
      {
        "type": "p",
        "text": "Sitenin anayasal ve yasal düzenini sağlayan kurumsal arka plan fonksiyonlarıdır:"
      },
      {
        "type": "ul",
        "items": [
          "KMK m.37 İşletme Projesi: Yıllık tahmini bütçenin hazırlanması, arsa payı hesaplamaları ve noter/tebligat süreçleri.",
          "Düzenli Aidat Tahsilatı: Kredi kartı ve banka entegrasyonuyla %98 tahsilat başarısı.",
          "Hukuk ve İcra Takibi: Borcunu ödemeyen sakinlere karşı aylık %5 gecikme tazminatlı ilamsız icra takipleri.",
          "Bordrolama ve İSG: Personel SGK bildirimleri, maaş ödemeleri ve 6331 sayılı İSG eğitimleri."
        ]
      },
      {
        "type": "h2",
        "text": "2. Neden Ayrı Firmalar Değil de Tek Elden Entegre Yönetim?"
      },
      {
        "type": "quote",
        "text": "Farklı taşeronlarla çalışıldığında bir su baskınında teknik ekip güvenlik ekibini, güvenlik ise temizlik ekibini suçlar. Entegre yönetimde tek muhatap vardır; hesap verilebilirlik %100'dür."
      },
      {
        "type": "p",
        "text": "Tek elden entegre yönetim modelinin sağladığı 3 büyük avantaj:"
      },
      {
        "type": "ol",
        "items": [
          "Maliyet Avantajı: Tek sözleşme ve merkezi satın alma ile ortak alan işletme maliyetlerinde %30 net tasarruf elde edilir.",
          "Hızlı Kriz Yönetimi: Yangın, deprem veya su baskını anında güvenlik, teknik ve temizlik ekipleri tek bir acil eylem planına göre senkronize hareket eder.",
          "Şeffaf Denetim: Tüm operasyonel raporlar tek bir dijital platform üzerinden denetçilere ve kat maliklerine sunulur."
        ]
      },
      {
        "type": "h2",
        "text": "3. Entegre Tesis Yönetiminde SLA (Hizmet Seviyesi Taahhüdü)"
      },
      {
        "type": "p",
        "text": "Kurumsal bir tesis yönetimi şirketiyle çalışırken Service Level Agreement (SLA) kriterleri net olmalıdır:"
      },
      {
        "type": "ul",
        "items": [
          "Kritik Arıza Müdahale: Asansör mahsur kalması ve ana elektrik kesintilerinde maksimum 30 dakika müdahale.",
          "Standart Talep Çözümü: Ampul değişimi, kapı hidroliği ayarı veya temizlik taleplerinde maksimum 2 saatte çözüm.",
          "Şeffaf Bütçe Raporlaması: Her ayın 5'inde bir önceki ayın tüm banka ve harcama ekstrelerinin mobil uygulamada yayınlanması."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Entegre tesis yönetimi hizmeti neleri kapsar?\nCevap: Güvenlik, temizlik, teknik bakım, bahçe peyzajı, aidat muhasebesi, hukuk danışmanlığı ve enerji yönetiminin tamamını tek bir çatı altında kapsar."
      },
      {
        "type": "p",
        "text": "Soru: Entegre yönetim modeli apartmanlara uygun mudur?\nCevap: Evet, 20 daireli bir butik apartmandan 2.000 konutlu mega yaşam alanlarına kadar her ölçekteki bina entegre yönetim avantajlarından yararlanabilir."
      },
      {
        "type": "cta",
        "text": "Tesisinizin tüm hizmetlerini tek merkezden profesyonelce yönetin.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Entegre Tesis Yönetimi Hizmetlerimiz"
      }
    ]
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
    "tldr": "Tesis yönetiminde soft hizmetler; sakinlerin ve ziyaretçilerin günlük konforunu, sağlığını ve güvenliğini doğrudan etkileyen operasyonel destek fonksiyonlarıdır.",
    "content": [
      {
        "type": "p",
        "text": "Soft Services (Destek Hizmetleri), bir tesisin veya konut sitesinin fiziki yapısı içinde yaşayan ve çalışan insanların günlük yaşam konforunu, hijyenini, estetiğini ve emniyet hissini doğrudan belirleyen hizmetlerin bütünüdür. Teknik (Hard) hizmetler binanın çalışmasını sağlarken, Destek (Soft) hizmetler binada yaşanmasını keyifli ve prestijli hale getirir."
      },
      {
        "type": "h2",
        "text": "1. 5188 Lisanslı Özel Güvenlik ve Risk Yönetimi"
      },
      {
        "type": "p",
        "text": "Modern sitelerde güvenlik, kapıdaki personelin varlığından çok daha kapsamlı bir stratejidir. T.C. İçişleri Bakanlığı 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca lisanslı ve eğitimli personellerimizle 7/24 kesintisiz koruma sağlanır."
      },
      {
        "type": "ul",
        "items": [
          "Eğitim ve Sertifikasyon: Grup şirketimiz Alo Güvenlik (guvenlikkursu.com) bünyesinde yetiştirilmiş, kriz ve öfke kontrolü eğitimli güvenlik görevlileri.",
          "Saha Operasyonu ve Devriye: Grup şirketimiz 3G Özel Güvenlik (3gguvenlik.com) güvencesiyle RFID tur kontrol kalemleri ve GPS devriye takibi.",
          "Elektronik Entegrasyon: Plaka tanıma sistemleri (PTS), bariyer otomasyonu, çevre güvenlik kameraları ve yüz tanıma turnikeleri."
        ]
      },
      {
        "type": "h2",
        "text": "2. Endüstriyel Hijyen, Ortak Alan ve Çevre Temizliği"
      },
      {
        "type": "p",
        "text": "Toplu yaşam alanlarında hijyen standartları doğrudan halk sağlığı konusudur. Sağlık Bakanlığı onaylı biyosidal ürünler ve renk kodlu mikrofiber temizlik bezleri ile çapraz bulaşma riskleri sıfırlanır."
      },
      {
        "type": "ul",
        "items": [
          "Blok Girişleri ve Merdivenler: Günlük paspaslama, tırabzan dezenfeksiyonu ve cam silimi.",
          "Kapalı Otoparklar: Binicili zemin yıkama makineleriyle egzoz isi ve yağ lekelerinin temizlenmesi.",
          "Çöp Toplama ve Şut Dezenfeksiyonu: Her gün belirlenen saatlerde kapıdan çöp alımı ve çöp odalarının ozonla kokusuzlaştırılması."
        ]
      },
      {
        "type": "h2",
        "text": "3. VIP Concierge, Resepsiyon ve Kargo Otomasyonu"
      },
      {
        "type": "p",
        "text": "Rezidans ve iş merkezlerinin vitrini lobilerdir. Çok dilli karşılama personeli, gelen kargoları akıllı kargo dolaplarına teslim eder ve sakine SMS ile teslimat şifresi iletir. Vale hizmetleri ve misafir yönlendirmeleri otel konforunda yürütülür."
      },
      {
        "type": "h2",
        "text": "4. Peyzaj, Otomatik Sulama ve Bitki Besleme"
      },
      {
        "type": "p",
        "text": "Yeşil alanlar sitelerin en büyük prestij kaynağıdır. Ziraat mühendislerimiz kontrolünde çim biçme, mevsimlik çiçeklendirme, ağaç budama, gübreleme ve otomatik sulama nozullarının periyodik açı ayarları yapılır."
      },
      {
        "type": "h2",
        "text": "5. Vektör Kontrolü ve Sıfır Atık Yönetimi"
      },
      {
        "type": "p",
        "text": "Haşere, kemirgen ve sivrisineklere karşı Sağlık Bakanlığı onaylı periyodik ilaçlama yapılır. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Sıfır Atık Yönetmeliği kapsamında kağıt, cam, plastik ve organik atıklar ayrıştırılarak lisanslı geri dönüşüm tesislerine teslim edilir."
      },
      {
        "type": "h2",
        "text": "6. Soft Hizmetlerde Kalite Kontrol ve KPI Takibi"
      },
      {
        "type": "p",
        "text": "Tüm destek hizmetlerimiz aylık gizli denetimler, dijital karekodlu temizlik kontrol noktaları ve sakin anketleri ile puanlanır. %95 altı memnuniyet alan noktalarda derhal personel ve süreç iyileştirmesi yapılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Temizlik personeli iş kazası geçirirse sorumluluk kime aittir?\nCevap: Profesyonel yönetim şirketi bünyesinde bordrolanan personellerin tüm İSG ve SGK sorumluluğu şirkete aittir; kat maliklerine şahsi rücu riski oluşmaz."
      },
      {
        "type": "p",
        "text": "Soru: Güvenlik görevlilerinin nöbet çizelgeleri nasıl denetlenir?\nCevap: RFID devriye tur kontrol noktaları ve 7/24 operasyon merkezimizden anlık GPS telemetrisi ile nöbet aksamaları anında tespit edilir."
      },
      {
        "type": "cta",
        "text": "Siteniz için profesyonel temizlik ve destek hizmeti teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Temizlik & Hijyen Hizmetlerimiz"
      }
    ]
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
    "tldr": "Hard hizmetler; binanın fiziksel varlıklarını, mekanik ve elektrik altyapısını 7/24 çalışır durumda tutan, can ve mal güvenliğini teminat altına alan teknik işletme disiplinidir.",
    "content": [
      {
        "type": "p",
        "text": "Hard Services (Teknik Bakım ve İşletme Hizmetleri), bir binanın yapısal bütünlüğünü, can ve mal güvenliğini, enerji sürekliliğini ve elektro-mekanik altyapısını kapsar. Bir tesisin dışarıdan ne kadar lüks göründüğü önemli değildir; eğer kazan dairesi çalışmıyor, asansörler kırmızı etiketli veya yangın pompaları arızalıysa, o tesis sakinleri için potansiyel bir tehlike alanıdır."
      },
      {
        "type": "h2",
        "text": "1. Isıtma, Soğutma ve Havalandırma (HVAC) Sistemleri"
      },
      {
        "type": "p",
        "text": "Merkezi sistem binalarda ortak alan ve daire içi iklimlendirme işletme maliyetlerinin %50'sinden fazlasını oluşturur. Profesyonel teknik işletme kapsamında:"
      },
      {
        "type": "ul",
        "items": [
          "Kazan Dairesi ve Brülör Bakımları: Yanma verimliliği analizleri ile doğalgaz tüketiminde %15 tasarruf.",
          "Chiller ve Soğutma Kuleleri: Gaz kaçak testleri, kondenser kimyasal yıkamaları ve glikol donma testleri.",
          "Klima Santralleri (AHU) ve Fan-Coil: Filtre değişimleri, serpantin dezenfeksiyonu ve hava debisi optimizasyonu.",
          "Isı Pay Ölçer ve Kalorimetre Okuma: Dairelerin tüketimlerinin KMK m.42 uyarınca adil faturalandırılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yüksek Gerilim Trafo ve Kompanzasyon Yönetimi"
      },
      {
        "type": "p",
        "text": "Tesislerin elektrik altyapısı uzman mühendisler tarafından yönetilmelidir:"
      },
      {
        "type": "ul",
        "items": [
          "Trafo İşletme Sorumluluğu: EMO onaylı Yüksek Gerilim İşletme Sorumluluğu mühendislik sözleşmesi ve trafo yağı dielektrik testleri.",
          "Reaktif Ceza Önleme: Kompanzasyon panolarındaki kondansatörlerin günlük telemetri ile izlenerek dağıtım şirketi cezalarının sıfırlanması.",
          "Jeneratör ve Transfer Panosu: Şebeke kesintisinde 8 saniye içinde otomatik devreye girme testi ve 250 saatlik yağ/filtre bakımları."
        ]
      },
      {
        "type": "h2",
        "text": "3. Asansör ve Yürüyen Merdivenlerde Yeşil Etiket Güvencesi"
      },
      {
        "type": "p",
        "text": "Asansör İşletme ve Bakım Yönetmeliği gereğince tüm asansörler aylık yetkili servis bakımından geçmeli ve Sanayi Bakanlığı akredite A Tipi Muayene Kuruluşları (TSE, MMO) tarafından yılda bir kez denetlenerek Yeşil Bilgi Etiketi almalıdır. Kırmızı etiketli asansörlerin tespiti ve revizyonu şirketimiz koordinasyonunda yürütülür."
      },
      {
        "type": "h2",
        "text": "4. Yangın Güvenlik ve Sprinkler Sistemleri"
      },
      {
        "type": "p",
        "text": "Binaların Yangından Korunması Hakkında Yönetmelik gereğince dizel ve elektrikli yangın pompaları haftalık otomatik test edilir. Yangın hidrant debileri, ıslak borulu sprinkler hatları, duman tahliye damperleri ve acil kaçış aydınlatmaları sürekli faal tutulur."
      },
      {
        "type": "h2",
        "text": "5. Su Depoları, Hidrofor ve Pis Su Terfi İstasyonları"
      },
      {
        "type": "p",
        "text": "İçme ve kullanma suyu depoları yılda en az 2 kez Sağlık Bakanlığı onaylı dezenfektanlarla temizlenir, klorlama cihazları kontrol edilir. Otopark tabanlarındaki foseptik ve pis su terfi pompaları seviye flatörleri su baskınlarına karşı çift pompalı yedekli çalıştırılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Kırmızı etiketli asansör çalıştırılırsa yöneticinin cezai sorumluluğu nedir?\nCevap: Kırmızı etiketli asansörün mühürlenmesi gerekir. Mührün koparılıp çalıştırılması halinde olası bir kazada yönetici TCK kapsamında taksirle adam yaralama veya öldürme suçundan hapis cezası ile yargılanır."
      },
      {
        "type": "p",
        "text": "Soru: Jeneratör bakımı ne sıklıkla yapılmalıdır?\nCevap: Jeneratörler haftalık 10 dakika yüksüz çalıştırılmalı, 6 ayda bir akü ve şarj ünitesi kontrol edilmeli ve yılda bir (veya 250 çalışma saatinde bir) tam periyodik filtre/yağ bakımı yapılmalıdır."
      },
      {
        "type": "cta",
        "text": "Tesisiniz için 7/24 nöbetçi teknik servis ve bakım anlaşması yapın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Teknik Bakım Hizmetlerimiz"
      }
    ]
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
    "tldr": "Mülk yönetimi gayrimenkulün finansal getirisine ve kiracı ilişkilerine odaklanırken, tesis yönetimi binanın fiziki varlığına, teknik altyapısına ve günlük yaşam konforuna odaklanır.",
    "content": [
      {
        "type": "p",
        "text": "Gayrimenkul ve konut sektöründe sıklıkla \"Mülk Yönetimi\" ve \"Tesis Yönetimi\" terimleri birbirinin yerine kullanılır. Oysa bu iki kavram gayrimenkulün farklı ancak birbirini tamamlayan iki stratejik ayağını temsil eder. Bir gayrimenkul yatırımının başarısı, hem mülk yönetiminin finansal getiriyi artırmasına hem de tesis yönetiminin binanın fiziki değerini korumasına bağlıdır."
      },
      {
        "type": "h2",
        "text": "1. Mülk Yönetimi (Property Management) Nedir?"
      },
      {
        "type": "p",
        "text": "Mülk yönetimi, gayrimenkul sahibinin ticari ve finansal çıkarlarını maksimize etmeye odaklanır. Temel sorumluluk alanı paranın akışı, kiracı ilişkileri ve yasal sözleşmelerdir:"
      },
      {
        "type": "ul",
        "items": [
          "Doğru Kiracı Seçimi: Findeks kredi notu, kefil ve gelir belgelerinin doğrulanması.",
          "Kira Sözleşmesi ve Depozito Yönetimi: TÜFE oranlarında yasal kira artışlarının yapılması ve tahliye taahhütnamelerinin tanzimi.",
          "Kira Tahsilatı ve Hukuki Süreçler: Kirasını ödemeyen kiracılara karşı icra ve tahliye davalarının açılması.",
          "Gayrimenkul Vergi Takibi: Emlak vergisi, ÇTV ve beyanname süreçlerinin yürütülmesi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Tesis Yönetimi (Facility Management) Nedir?"
      },
      {
        "type": "p",
        "text": "Tesis yönetimi ise binanın fiziksel varlığını, teknik cihazlarını, ortak alanlarını, temizliğini ve güvenliğini 7/24 çalışır durumda tutan operasyonel işletme disiplinidir. Binanın kalbini ve ciğerlerini (HVAC, jeneratör, güvenlik, asansör) yaşatır."
      },
      {
        "type": "h2",
        "text": "3. Karşılaştırmalı 7 Temel Fark Tablosu"
      },
      {
        "type": "ol",
        "items": [
          "Odak Noktası: Mülk yönetimi finansal getiriye; tesis yönetimi operasyonel işlevsellik ve konfora odaklanır.",
          "Muhatap Kitle: Mülk yönetimi mal sahibi ve kiracıyla; tesis yönetimi binanın tüm kullanıcıları ve kat malikleri kuruluyla muhataptır.",
          "Hukuki Dayanak: Mülk yönetimi Borçlar Kanunu kira hükümlerine; tesis yönetimi Kat Mülkiyeti Kanunu ve İSG mevzuatına tabidir.",
          "Gelir/Gider Rolü: Mülk yönetimi gelir oluşturur (kira); tesis yönetimi giderleri optimize eder (ortak aidat bütçesi).",
          "Teknik Rol: Mülk yönetimi daire içi tadilatları koordine eder; tesis yönetimi ana trafo, yangın ve asansör altyapısını işletir.",
          "Güvenlik ve İSG: Mülk yönetimi sözleşme güvencesi sağlar; tesis yönetimi 5188 fiziki güvenlik ve acil tahliye süreçlerini yönetir.",
          "Süreklilik: Mülk yönetimi kiracı değişimlerinde aktiftir; tesis yönetimi 365 gün 7/24 kesintisiz sahadadır."
        ]
      },
      {
        "type": "quote",
        "text": "Tesis yönetimi binayı mükemmel bir yaşam alanına dönüştürür; mülk yönetimi ise o mükemmel yaşam alanının getirdiği kira kazancını en üst seviyeye taşır."
      },
      {
        "type": "h2",
        "text": "4. İki Disiplinin Entegre Çalışma Örneği"
      },
      {
        "type": "p",
        "text": "Rezidans dairesi kiraya verilirken: Mülk yönetimi kiracıyı bulur ve kontratı imzalar; tesis yönetimi ise kiracının taşınma gününü planlar, asansör koruma pedlerini takar, araç plakasını PTS sistemine tanımlar ve akıllı sayaç endeksini kaydeder."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Dairem boş kaldığında aidatını kim öder?\nCevap: Daire boş olduğunda aidat ve ortak gider avansını mülk sahibi ödemekle yükümlüdür. Mülk yönetim hizmetimiz ile dairenin boş kalma süresi minimuma indirilir."
      },
      {
        "type": "p",
        "text": "Soru: Yurt dışında yaşayan mülk sahipleri için hangi paket uygundur?\nCevap: Hem mülk yönetimi (kira tahsilatı ve vergi) hem de tesis yönetimi (aidat ve bakım takibi) hizmetlerinin bir arada sunulduğu VIP Portföy Yönetim Paketimiz tavsiye edilir."
      },
      {
        "type": "cta",
        "text": "Hem tesis hem mülk yönetiminde kurumsal danışmanlık alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Tesis ve Mülk Yönetimi Çözümlerimiz"
      }
    ]
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
    "tldr": "Profesyonel tesis yönetimi mülkünüzün değerini %20-30 artırır, plansız arıza maliyetlerini sıfırlar, aidatlarda %30 tasarruf sağlar ve komşuluk ihtilaflarını bitirir.",
    "content": [
      {
        "type": "p",
        "text": "Birçok bina ve site sakini, profesyonel yönetim şirketlerine ödenen hizmet bedelini bir maliyet kalemi olarak görür. Oysa kurumsal bir tesis yönetim şirketiyle çalışmak; sağladığı enerji tasarrufu, toplu satın alma indirimleri, yasal ceza önleme mekanizmaları ve gayrimenkul değer artışıyla kendi maliyetini fazlasıyla amorti eden en karlı gayrimenkul yatırımıdır."
      },
      {
        "type": "h2",
        "text": "Mülk Sahibine ve Kat Malikine 10 Somut Kazanç"
      },
      {
        "type": "ol",
        "items": [
          "Gayrimenkul Değerinde %20-30 Artış: Düzenli bakılan, temiz, yeşil alanı korunan ve 5188 güvenliği olan sitelerde daire fiyatları emsallerine göre çok daha hızlı prim yapar.",
          "Ortak Alan Bütçesinde %25-33 Tasarruf: Toplu elektrik tedariki, toptan kimyasal alımları ve jeneratör yakıt anlaşmaları ile aidatlar düşürülür.",
          "Pahalı Cihaz Ömürlerinin İki Katına Çıkması: Asansör, trafo, hidrofor ve chiller gruplarına yapılan kestirimci bakım sayesinde milyonluk ani yenileme masrafları engellenir.",
          "%98 Düzenli Aidat Tahsilatı: KMK m.20 kapsamında noter ihtarı ve ilamsız icra takipleri sayesinde kimsenin borcu diğer komşunun sırtına kalmaz.",
          "Komşuluk Huzuru ve Tarafsızlık: Aidat isteme, gürültü ikazı ve kural koyma tartışmaları komşular arasından çıkar; kurumsal ve tarafsız yönetimce yürütülür.",
          "Yasal Güvence ve Sıfır Ceza Riski: Kaçak bekçi çalıştırma, İSG ihlalleri veya asansör kırmızı etiket cezaları kurumsal denetimle tamamen önlenir.",
          "7/24 Şeffaf Mobil Finansal Takip: Kat malikleri her bir kuruşun nereye harcandığını, kasa mevcudunu ve banka hesap ekstrelerini mobil uygulamadan anlık görür.",
          "45 Dakika Acil Müdahale SLA Garantisi: Asansörde mahsur kalma, ana boru patlaması veya elektrik kesintilerine karşı nöbetçi teknik ekipler anında müdahale eder.",
          "Personel Kıdem Tazminatı ve SGK Güvencesi: Kapıcı ve temizlikçilerin kıdem fonu ayrılır; işten çıkışlarda site sakinlerinin karşısına sürpriz toplu tazminat faturaları çıkmaz.",
          "Sürdürülebilirlik ve Sıfır Atık: Çevre dostu enerji kullanımı, kompost üretimi ve sıfır atık yönetimi ile siteniz modern çevre standartlarına kavuşur."
        ]
      },
      {
        "type": "quote",
        "text": "Profesyonel yönetim bir masraf değil; mülkünüzün değerini koruyan ve her ay bütçenizi artıya geçiren kurumsal bir kalkandır."
      },
      {
        "type": "h2",
        "text": "Rakamlarla Profesyonel Yönetimin Yatırım Getirisi (ROI)"
      },
      {
        "type": "p",
        "text": "100 daireli ortalama bir sitede profesyonel tesis yönetimine geçildiğinde: Yıllık elektrik faturalarında ~180.000 TL, asansör ve kimyasal toplu alımlarında ~120.000 TL, önleyici bakım sayesinde engellenen cihaz arızalarında ~250.000 TL olmak üzere toplamda yıllık 550.000 TL'yi aşan net tasarruf sağlanmaktadır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Yönetim şirketinin sözleşme süresi ne kadardır?\nCevap: Genellikle sözleşmeler 1 yıllık Genel Kurul dönemleri için imzalanır. Kat Malikleri Kurulu memnun kaldığı sürece sözleşmeyi uzatır veya memnuniyetsizlik halinde yenilememe hakkına sahiptir."
      },
      {
        "type": "p",
        "text": "Soru: Site adına açılan banka hesabındaki para yönetim şirketine mi ait olur?\nCevap: Kesinlikle hayır. Banka hesabı sitenin kendi vergi kimlik numarası adına açılır. Yönetim şirketi sadece genel kurul kararı ve işletme projesi limitleri dahilinde yetkili vekildir; denetçiler hesabı anlık izleyebilir."
      },
      {
        "type": "cta",
        "text": "Sitenizin değerini artırmak için profesyonel yönetim rehberimizi inceleyin.",
        "href": "/hizmetler/tesis-yonetimi/rehber",
        "label": "Tesis Yönetimi Rehberi"
      }
    ]
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
    "tldr": "Tesis yönetim şirketi; KMK m.35 kapsamındaki tüm yasal yöneticilik görevlerini, işletme bütçesini, personel SGK/İSG süreçlerini ve ortak alan bakımını hukuki güvenceyle yürütür.",
    "content": [
      {
        "type": "p",
        "text": "Site ve binalarda yöneticilik yetkisini üstlenen profesyonel tesis yönetim şirketleri; 634 Sayılı Kat Mülkiyeti Kanunu (KMK), Türk Borçlar Kanunu (vekalet hükümleri), İş Kanunu, 6331 Sayılı İSG Kanunu ve Türk Ticaret Kanunu karşısında kat malikleri kuruluna karşı doğrudan yasal, mali ve cezai sorumluluk taşır."
      },
      {
        "type": "h2",
        "text": "1. KMK Madde 35 Kapsamında Yasal Yönetici Görevleri"
      },
      {
        "type": "p",
        "text": "Kanunun 35. maddesi yöneticinin mutlak görevlerini net olarak sıralamıştır:"
      },
      {
        "type": "ul",
        "items": [
          "Kararları Uygulamak: Kat malikleri kurulu tarafından alınan kararların karar defterine işlenmesi ve eksiksiz tatbik edilmesi.",
          "Koruma ve Bakım Tedbirleri: Ana gayrimenkulün gayesine uygun olarak kullanılması, korunması, bakımı ve onarımı için gereken tüm tedbirlerin zamanında alınması.",
          "İşletme Projesi (Bütçe) Tanzimi: KMK m.37 gereğince bir yıllık tahmini gelir-gider bütçesinin hazırlanıp tüm bağımsız bölüm maliklerine taahhütlü tebliğ edilmesi.",
          "Aidat ve Avans Tahsilatı: Ortak gider paylarının toplanması, ödemeyen kat maliklerine karşı noter ihtarı çekilmesi ve icra takibi açılması.",
          "Banka Hesabı Açılması: Site veya bina adına müstakil banka hesabı açılması ve tüm paranın bu hesapta şeffafça işletilmesi.",
          "Genel Kurul Çağrıları: Kat malikleri kurulunun olağan ve olağanüstü toplantılara usulüne uygun olarak davet edilmesi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Mali ve İdari Şeffaflık Yükümlülüğü (KMK m.38 & m.39)"
      },
      {
        "type": "p",
        "text": "Yönetim şirketi; vekil sıfatıyla yürüttüğü faaliyetlerin hesabını vermekle mükelleftir. Yıl içinde denetçilerin yapacağı 3 aylık periyodik denetimlere tüm faturaları, banka dekontlarını ve sözleşmeleri eksiksiz sunmak zorundadır."
      },
      {
        "type": "h2",
        "text": "3. Personel, SGK ve İSG Sorumlulukları"
      },
      {
        "type": "p",
        "text": "Tesiste çalışan güvenlik, temizlik ve teknik personelin SGK giriş-çıkış bildirimleri, maaş bordroları, kıdem ve ihbar tazminatı fonları ve 6331 Sayılı İş Sağlığı ve Güvenliği eğitimleri şirketimizin sorumluluğundadır. Olası iş kazalarında mülk sahipleri hukuken korunur."
      },
      {
        "type": "h2",
        "text": "4. Yöneticinin Cezai Sorumluluğu (TCK Hükümleri)"
      },
      {
        "type": "p",
        "text": "Karar defterini notere tasdik ettirmemek, site aidatlarını şahsi hesaplarda tutmak veya işletme projesi olmaksızın usulsüz para toplamak Türk Ceza Kanunu kapsamında Güveni Kötüye Kullanma suçunu oluşturabilir. Profesyonel yönetim şirketi tüm bu riskleri kurumsal güvence altına alır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Yönetici genel kurul kararı olmadan ortak alanda tadilat yapabilir mi?\nCevap: Acil ve can güvenliğini tehdit eden durumlar (örneğin ana boru patlaması veya asansör halat kopması) hariç, yönetici genel kurulda bütçelendirilmemiş ve karara bağlanmamış büyük tadilatları tek başına yapamaz."
      },
      {
        "type": "p",
        "text": "Soru: Denetçi yönetim şirketini nasıl denetler?\nCevap: Denetçi KMK m.41 uyarınca en az üç ayda bir kasa, banka hesapları, gelir-gider makbuzları ve karar defterini inceler ve raporunu kat malikleri kuruluna sunar."
      },
      {
        "type": "cta",
        "text": "Yasal süreçler ve yönetim danışmanlığı hakkında bilgi alın.",
        "href": "/hizmetler/yonetim-danismanligi",
        "label": "Yönetim Danışmanlığı Hizmetimiz"
      }
    ]
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
    "tldr": "Tesis yönetim planı; sitenin anayasası niteliğinde olup ortak alan kullanımlarını, aidat paylaşım kriterlerini ve yönetim organlarının yetkilerini belirleyen bağlayıcı hukuki belgedir.",
    "content": [
      {
        "type": "p",
        "text": "634 Sayılı Kat Mülkiyeti Kanunu Madde 28 uyarınca Yönetim Planı; ana gayrimenkulün yönetim tarzını, kullanma maksat ve şeklini, yönetici ve denetçilerin alacakları ücreti ve yönetime ait diğer hususları düzenleyen, bütün kat maliklerini ve onların haleflerini (yeni ev alanları veya kiracıları) bağlayan bir sözleşme hükmündedir. Bir sitenin huzuru, tapuya tescil edilmiş sağlam bir yönetim planıyla başlar."
      },
      {
        "type": "h2",
        "text": "1. Tesis Yönetim Planında Bulunması Zorunlu 6 Temel Bölüm"
      },
      {
        "type": "ul",
        "items": [
          "Bölüm 1: Genel Hükümler: Tesisin adı, açık adresi, tapu ada/parsel bilgileri, blok ve bağımsız bölüm listesi.",
          "Bölüm 2: Ortak Yerler ve Kullanım Esasları: Kapalı otopark tahsisleri, sığınaklar, depolar, yüzme havuzu, fitness ve sauna kullanım kuralları.",
          "Bölüm 3: Yönetim Organları ve Seçimler: Kat malikleri kurulu toplanma zamanları, temsilciler kurulu yapısı, yönetici ve denetçinin görev süreleri ve yetkileri.",
          "Bölüm 4: Ortak Giderlere Katılma Baremleri: Güvenlik ve temizlik personel giderlerinin eşit mi yoksa arsa payı oranında mı bölüneceği, ortak elektrik ve doğalgaz paylaştırma kriterleri.",
          "Bölüm 5: Bağımsız Bölüm Sakinlerinin Hak ve Yasakları: Gürültü saatleri, evcil hayvan besleme şartları, dış cephe tadilat ve balkon kapatma sınırları.",
          "Bölüm 6: İhtilafların Çözümü ve Arabuluculuk: Sulh Hukuk Mahkemeleri ve zorunlu arabuluculuk süreçleri."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yönetim Planı Değişikliği İçin 4/5 Oy Şartı"
      },
      {
        "type": "p",
        "text": "KMK m.28 uyarınca yönetim planının değiştirilebilmesi için bütün kat maliklerinin beşte dördünün (4/5) olumlu oyu şarttır. Bu nisap toplantıya katılanların değil, tapudaki tüm maliklerin 4/5'idir. Bu nedenle yönetim planı ilk hazırlanırken profesyonel gayrimenkul hukukçuları tarafından kusursuz tanzim edilmelidir."
      },
      {
        "type": "h2",
        "text": "3. Adım Adım Yönetim Planı Hazırlama Süreci"
      },
      {
        "type": "ol",
        "items": [
          "Mimari Proje ve Mahal İncelemesi: Tesisin ortak alanlarının tapu projesine uygunluğunun denetlenmesi.",
          "Hukuki Taslak Metin Yazımı: Siteye özgü ihtiyaçların KMK emredici hükümlerine uygun olarak kaleme alınması.",
          "Kat Malikleri İstişaresi: Maliklerin görüş ve taleplerinin toplanarak taslağın olgunlaştırılması.",
          "Genel Kurul Onayı ve Noter Tasdiki: Kurulda 4/5 oy çoğunluğuyla kabul edilerek noterden tescili.",
          "Tapu Sicil Müdürlüğü Tescili: Değişikliğin Tapu Müdürlüğü ana kütüğüne işlenerek bağlayıcılık kazanması."
        ]
      },
      {
        "type": "h2",
        "text": "4. Yönetim Planında En Sık Yapılan 3 Hukuki Hata"
      },
      {
        "type": "ul",
        "items": [
          "KMK Emredici Hükümlerine Aykırı Maddeler: Kanuna aykırı koyulan maddeler (örneğin \"aidat ödemeyenin suyu kesilir\" gibi) mahkemece kendiliğinden hükümsüz sayılır.",
          "Otopark Tahsislerinin Hatalı Yapılması: Eklenti olmayan ortak alan otoparklarının belirli dairelere tapusuz mülkiyet gibi tahsis edilmesi ileride tapu iptal davalarına yol açar.",
          "Toplu Yapı Temsilciler Kurulu Yetkisinin Belirsiz Bırakılması: Ek Madde 69-74'e uygun kurul tanımlanmadığında bloklar arası yetki çatışması yaşanır."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Yönetim planında evcil hayvan yasağı varsa köpek beslenebilir mi?\nCevap: Yönetim planında açıkça \"bağımsız bölümlerde evcil hayvan beslenemez\" hükmü varsa ve bu tescilliyse, Yargıtay yerleşik içtihatlarına göre komşuların şikayeti halinde tahliye kararı verilir."
      },
      {
        "type": "p",
        "text": "Soru: Yeni ev alan kişi eski yönetim planına uymak zorunda mıdır?\nCevap: Evet. KMK m.28 uyarınca yönetim planı tapu kütüğüne tescil edildiği için gayrimenkulü sonradan satın alan herkesi ve kiracıları doğrudan bağlar."
      },
      {
        "type": "cta",
        "text": "Siteniz için profesyonel yönetim planı hazırlatalım.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Tesis Yönetimi Çözümlerimiz"
      }
    ]
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
    "tldr": "Lüks rezidanslarda 5 yıldızlı tesis yönetimi; 7/24 concierge, VIP güvenlik, önleyici akıllı bina otomasyonu ve KMK 37 bütçe şeffaflığını tek merkezde birleştirir.",
    "content": [
      {
        "type": "p",
        "text": "Modern metropollerde A+ rezidans projeleri, yalnızca bir barınma alanı değil; sakinlerine 5 yıldızlı otel konforunda 7/24 kesintisiz hizmet sunan prestijli yaşam merkezleridir. Ancak lüks bir rezidansın piyasa değerini koruması ve sakin memnuniyetini en üst düzeyde tutması, uluslararası standartlarda profesyonel entegre tesis yönetimi ile mümkündür."
      },
      {
        "type": "h2",
        "text": "1. VIP Concierge ve Lobi Karşılama Protokolleri"
      },
      {
        "type": "p",
        "text": "Rezidans yönetiminin vitrini lobidir. Profesyonel concierge ekibimiz; misafir karşılama, kurye ve kargo kabul otomasyonu, VIP transfer rezervasyonları ve teknik talep yönetimini 7/24 kesintisiz olarak yürütür."
      },
      {
        "type": "ul",
        "items": [
          "Akıllı Kargo Dolabı Entegrasyonu: Kuryelerin daire katlarına çıkışını engelleyerek anlık SMS ve şifre ile kargo teslimi.",
          "Çok Dilli Resepsiyon Kadrosu: Türkçe, İngilizce, Arapça ve Rusça dillerinde akıcı VIP danışma hizmeti.",
          "Vale ve Kapalı Otopark PTS: Plaka tanıma sistemi ile misafir ve sakin araçlarının otopark kat yetkilendirmesi.",
          "Kuru Temizleme ve Daire İçi Hizmet Koordinasyonu: Rezidans sakinlerine özel kuru temizleme, terzi ve temizlik rezervasyonları."
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Lisanslı Özel Güvenlik ve Biyometrik Geçiş Sistemleri"
      },
      {
        "type": "p",
        "text": "Lüks rezidanslarda mahremiyet ve güvenlik en kritik önceliktir. T.C. İçişleri Bakanlığı 5188 sayılı kanun kapsamında lisanslı özel güvenlik personelimiz ve grup şirketimiz 3G Özel Güvenlik desteğiyle tesis 7/24 güvence altındadır."
      },
      {
        "type": "quote",
        "text": "Rezidans güvenliği sadece kapıdaki görevli değil; yapay zeka destekli çevre güvenlik kameraları, asansör kat yetkilendirme kartları ve yangın erken uyarı sistemlerinin entegre çalışmasıdır."
      },
      {
        "type": "h2",
        "text": "3. Sosyal Tesis, Havuz & Spa Hijyen Standartları"
      },
      {
        "type": "p",
        "text": "Kapalı ve açık yüzme havuzları, fitness salonları, sauna ve buhar odaları Sağlık Bakanlığı Biyosidal Ürünler Yönetmeliği standartlarına göre günlük olarak klor, pH ve mikrobiyolojik testlerden geçirilir."
      },
      {
        "type": "h2",
        "text": "4. Akıllı Bina Otomasyonu (BMS) ve Daire İçi Hızlı Teknik Destek"
      },
      {
        "type": "p",
        "text": "Rezidans sakinleri mobil uygulama üzerinden tek tıkla arıza kaydı oluşturabilir. Nöbetçi rezidans teknisyenlerimiz sigorta atması, su sızıntısı veya klima arızalarına maksimum 15 dakika içinde daire kapısında müdahale eder."
      },
      {
        "type": "h2",
        "text": "5. Rezidans Aidat Bütçesi ve KMK m.37 Bütçe Şeffaflığı"
      },
      {
        "type": "p",
        "text": "Lüks binalarda bütçe hacimleri oldukça büyüktür. Ortak alan doğalgaz, jeneratör mazot tüketimi, havuz kimyasalları ve güvenlik bordroları şeffaf muhasebe yazılımı ile yönetilir; sakinler her bir faturayı mobil uygulamadan anlık görür."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Rezidans aidatları neden normal apartmanlardan yüksektir?\nCevap: 7/24 lobide concierge, çift vardiya güvenlik, kapalı havuz ısıtması, fitness antrenörü, jeneratör yakıtı ve bina otomasyonu gibi kesintisiz lüks hizmetlerin işletme maliyetleri bütçeye yansır."
      },
      {
        "type": "p",
        "text": "Soru: Kargo ve kurye güvenliği rezidansta nasıl sağlanır?\nCevap: Dışarıdan gelen kuryeler güvenlik lobisinde durdurulur; paketler akıllı kargo odasına barkodla alınır ve sakine SMS şifresi iletilerek temas riski sıfırlanır."
      },
      {
        "type": "cta",
        "text": "Rezidansınız için 5 yıldızlı entegre yönetim teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi/rezidans-site-yonetimi",
        "label": "Rezidans Yönetimi Çözümümüzü İnceleyin"
      }
    ]
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
    "tldr": "Ticari plazalarda merkezi HVAC otomasyonu, kompanzasyon takibi ve ISO 41001 standartları ile ortak alan elektrik ve işletme giderlerinde %30 net tasarruf sağlanır.",
    "content": [
      {
        "type": "p",
        "text": "Ticari plazalar, iş merkezleri ve A sınıfı ofis kulelerinde işletme maliyetlerinin %60'ından fazlasını enerji tüketimi (elektrik, doğalgaz ve soğutma grupları) oluşturur. Doğru bir tesis yönetimi stratejisi, çalışma konforundan ödün vermeden enerji faturalarını optimize eder."
      },
      {
        "type": "h2",
        "text": "1. Bina Otomasyon Sistemi (BMS) ve HVAC Optimizasyonu"
      },
      {
        "type": "p",
        "text": "Chiller soğutma grupları, klima santralleri (AHU) ve VRF sistemleri; çalışma saatleri, dış hava sıcaklığı ve doluluk sensörlerine göre otomatik olarak modüle edilir. Gece ve hafta sonu bekleme modları ile gereksiz tüketim engellenir."
      },
      {
        "type": "h2",
        "text": "2. Kompanzasyon Panosu Takibi ve Reaktif Ceza Önleme"
      },
      {
        "type": "p",
        "text": "Elektrik dağıtım şirketlerinin reaktif enerji sınırlarını aşan plazalara uyguladığı yüksek cezalar, IoT destekli anlık kompanzasyon panosu izleme sistemlerimiz ile tamamen sıfırlanır."
      },
      {
        "type": "ul",
        "items": [
          "Endüktif ve kapasitif oranların günlük 7/24 uzaktan telemetri ile izlenmesi",
          "Harmonik filtreler ve kondansatör kademe bakımlarının periyodik yapılması",
          "TEDAŞ/EPDK faturalarının yasal tarife uygunluk denetimi"
        ]
      },
      {
        "type": "h2",
        "text": "3. LEED ve BREEAM Yeşil Bina Standartlarına Uyum"
      },
      {
        "type": "p",
        "text": "Uluslararası çevre sertifikasyonları, kurumsal çok uluslu kiracıların plaza seçimindeki en önemli kriteridir. Düşük karbon ayak izi, gri su geri kazanım sistemleri ve LED aydınlatma otomasyonu ile plazanızın LEED Gold/Platinum değerini koruyoruz."
      },
      {
        "type": "h2",
        "text": "4. Kurumsal Kiracı Yönetimi ve Alt Sayaç Faturalandırması"
      },
      {
        "type": "p",
        "text": "Plaza sakinlerinin ve kurumsal kiracıların gider paylaşımları, bağımsız bölüm metrekareleri ve ısı pay ölçer endekslerine göre şeffaf yazılımımız üzerinden adil biçimde faturalandırılır."
      },
      {
        "type": "h2",
        "text": "5. Plaza Yangın Güvenliği ve Tahliye Otomasyonu"
      },
      {
        "type": "p",
        "text": "Yüksek katlı plazalarda yangın duman tahliye şaftları, pozitif basınçlandırma fanları ve manyetik kapı tutucular merkezi yangın santraliyle entegre test edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Reaktif enerji cezası nedir ve nasıl engellenir?\nCevap: Tesisin şebekeden çektiği endüktif veya kapasitif reaktif güç yasal sınırları (%20 endüktif, %15 kapasitif) aştığında dağıtım şirketi ağır ceza faturası keser. Otomatik kompanzasyon panosu ve anlık telemetri ile bu ceza sıfırlanır."
      },
      {
        "type": "p",
        "text": "Soru: BMS bina otomasyon sistemi ne kadar enerji tasarrufu sağlar?\nCevap: Doğru kalibre edilmiş ve programlanmış bir BMS otomasyonu, plazanın toplam HVAC ve aydınlatma elektrik faturasında ortalama %25 ila %35 net tasarruf sağlar."
      },
      {
        "type": "cta",
        "text": "Plazanız için enerji verimliliği ve işletme analizi talep edin.",
        "href": "/hizmetler/tesis-yonetimi/plaza-yonetimi",
        "label": "Plaza Yönetimi Çözümlerimiz"
      }
    ]
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
    "tldr": "1.000+ bağımsız bölümlü mega toplu konutlarda ölçek ekonomisi ve toplu tedarik gücü ile aidatlarda %25-33 somut maliyet tasarrufu elde edilir.",
    "content": [
      {
        "type": "p",
        "text": "Yüzlerce hatta binlerce bağımsız bölümden oluşan mega toplu konut projelerinde amatör veya münferit blok yönetimleri; fahiş maliyetlere, tahsilat krizlerine ve bakım aksaklıklarına yol açar. Alo Yönetim merkezi yönetim modeli bu kaosu ortadan kaldırır."
      },
      {
        "type": "h2",
        "text": "1. KMK Toplu Yapı Hükümleri ve Temsilciler Kurulu İşleyişi"
      },
      {
        "type": "p",
        "text": "634 Sayılı Kat Mülkiyeti Kanunu Ek Madde 69-74 uyarınca toplu yapı yönetim planı hazırlanır. Blok kat malikleri kurulları kendi temsilcilerini seçer; toplu yapı temsilciler kurulu ise profesyonel yöneticiyi yetkilendirir."
      },
      {
        "type": "h2",
        "text": "2. Ölçek Ekonomisi ile %30 Aidat Tasarrufu Nasıl Sağlanır?"
      },
      {
        "type": "ul",
        "items": [
          "Toplu Asansör Bakım Anlaşması: Yüzlerce asansör için tek sözleşmeyle parça ve bakımda %35 indirim",
          "Ortak Elektrik ve Doğalgaz İndirimi: Serbest tüketici statüsüyle en uygun birim fiyat tedariki",
          "Endüstriyel Kimyasal & Temizlik Malzemesi: Fabrikadan doğrudan toptan tedarik",
          "Merkezi Güvenlik ve Temizlik Vardiya Optimizasyonu: Gereksiz personel maliyetlerinin elenmesi"
        ]
      },
      {
        "type": "h2",
        "text": "3. Şeffaf Tahsilat ve Dijital Mobil Takip"
      },
      {
        "type": "p",
        "text": "Tüm sakinler mobil uygulama üzerinden aidatlarını kredi kartıyla komisyonsuz ödeyebilir, bütçe harcamalarını ve faturaları kalem kalem anlık inceleyebilir."
      },
      {
        "type": "h2",
        "text": "4. Bloklar Arası Eşit ve Adil Hizmet Dağılımı"
      },
      {
        "type": "p",
        "text": "Büyük sitelerde en çok yaşanan şikayet \"Bizim bloğa temizlikçi az geliyor, diğer blok daha iyi bakılıyor\" serzenişidir. Dijital QR kodlu kontrol noktaları ile her bloğun temizlik, teknik ve güvenlik devriye saatleri harita üzerinden anlık denetlenir."
      },
      {
        "type": "h2",
        "text": "5. Mega Sitelerde Güvenlik ve Giriş-Çıkış Trafiği Yönetimi"
      },
      {
        "type": "p",
        "text": "Günde on binlerce aracın ve kuryenin giriş yaptığı mega sitelerde çift bariyerli PTS (Plaka Tanıma Sistemi), misafir karekod geçiş sistemi ve grup şirketimiz 3G Özel Güvenlik desteğiyle nizamiye yığılmaları sıfıra indirilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Blok yöneticisi ile toplu yapı yöneticisi arasındaki fark nedir?\nCevap: Blok yöneticisi yalnızca kendi bloğunun iç temizliği ve münferit işlerinden sorumludur; toplu yapı yöneticisi ise tüm sitenin ortak güvenliği, peyzajı, havuzları, ana trafosu ve merkezi bütçesini idare eder."
      },
      {
        "type": "p",
        "text": "Soru: Toplu konutlarda aidatını ödemeyen bloklara karşı ne yapılır?\nCevap: KMK Ek Madde 73 gereğince ortak gider borcunu ödemeyen bağımsız bölümler hakkında doğrudan toplu yapı yönetimi icra takibi açabilir."
      },
      {
        "type": "cta",
        "text": "Sitenizin aidatlarını düşürmek için keşif isteyin.",
        "href": "/hizmetler/tesis-yonetimi/toplu-konut-yonetimi",
        "label": "Toplu Konut Yönetimi Çözümümüz"
      }
    ]
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
    "tldr": "Endüstriyel tesis ve fabrikalarda ISO 45001 iş sağlığı, yangın hidrant hatları periyodik testi ve 5188 perimetre güvenliği sıfır kaza hedefiyle yönetilir.",
    "content": [
      {
        "type": "p",
        "text": "Sanayi tesisleri, üretim fabrikaları ve lojistik antrepolar; konut yapılarından çok farklı olarak ağır teknik altyapı, tehlikeli madde riskleri ve yüksek iş güvenliği standartları gerektirir."
      },
      {
        "type": "h2",
        "text": "1. ISO 45001 İş Sağlığı ve Güvenliği Risk Yönetimi"
      },
      {
        "type": "p",
        "text": "Tesis içerisindeki forklift yolları, kimyasal depolama alanları ve yüksek gerilim trafo merkezleri sürekli denetlenir. Risk analizi ve acil durum tahliye tatbikatları 6 ayda bir güncellenir."
      },
      {
        "type": "h2",
        "text": "2. Yangın Hidrant, Sprinkler ve Duman Tahliye Sistemleri"
      },
      {
        "type": "p",
        "text": "Binaların Yangından Korunması Hakkında Yönetmelik gereğince yangın pompaları haftalık otomatik test edilir, hidrant debileri ve köpüklü söndürme sistemleri belgelendirilir."
      },
      {
        "type": "h2",
        "text": "3. Fabrika Perimetre Güvenliği ve Giriş-Çıkış Lojistik Kontrolü"
      },
      {
        "type": "p",
        "text": "TIR ve kamyon kantar tartımları, sevkiyat irsaliye kontrolleri ve x-ray ziyaretçi taramaları grup şirketimiz 3G Özel Güvenlik tarafından yürütülür."
      },
      {
        "type": "h2",
        "text": "4. Tehlikeli Atık Yönetimi ve Çevre Mevzuatı"
      },
      {
        "type": "p",
        "text": "Sanayi atıkları, kontamine ambalajlar ve atık yağlar Çevre Kanunu ve Sıfır Atık Yönetmeliği uyarınca MOTAT (Mobil Atık Takip Sistemi) üzerinden lisanslı bertaraf tesislerine sevk edilir."
      },
      {
        "type": "h2",
        "text": "5. Ağır Tesis Mekanik ve Kazan Dairesi İşletimi"
      },
      {
        "type": "p",
        "text": "Buhar kazanları, basınçlı hava kompresörleri, kule tipi soğutma sistemleri ve endüstriyel arıtma tesisleri sertifikalı mühendis ve tekniker kadromuzla 7/24 vardiyalı işletilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Fabrikalarda yangın pompası testleri ne sıklıkla yapılmalıdır?\nCevap: Yangın pompaları haftalık otomatik test çalışmasına tabi tutulmalı, debi ve basınç testleri ise 3 ayda bir kayıt altına alınmalıdır."
      },
      {
        "type": "p",
        "text": "Soru: Organize Sanayi Bölgelerinde (OSB) tesis yönetimi avantajı nedir?\nCevap: OSB mevzuatına tam uyum, ağır bakım maliyetlerinin düşürülmesi ve İSG teftişlerinde sıfır ceza güvencesi sağlar."
      },
      {
        "type": "cta",
        "text": "Sanayi tesisiniz için profesyonel işletme şartnamesi alın.",
        "href": "/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi",
        "label": "Sanayi Tesisi Yönetimi Detayları"
      }
    ]
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
    "tldr": "Site ve binalarınız için doğru yönetim şirketini seçerken ISO belgeleri, 5188 lisansı, SLA süreleri ve KMK 37 işletme projesi şeffaflığı temel kriterdir.",
    "content": [
      {
        "type": "p",
        "text": "Site veya tesis yönetimini profesyonel bir şirkete devretmek, mülkünüzün değerini artırırken aidat ihtilaflarını ve teknik arıza risklerini ortadan kaldırır. Ancak piyasada yetkin olmayan merdiven altı firmalara karşı dikkatli olunmalıdır."
      },
      {
        "type": "h2",
        "text": "10 Maddelik Yönetim Şirketi Değerlendirme Kriterleri"
      },
      {
        "type": "ul",
        "items": [
          "1. ISO 41001:2018 Entegre Tesis Yönetimi ve ISO 9001 Kalite Belgeleri",
          "2. T.C. İçişleri Bakanlığı / Emniyet onaylı 5188 Özel Güvenlik Faaliyet İzin Belgesi",
          "3. TSE HYB 12850 Hizmet Yeterlilik Belgesi",
          "4. En az 10 yıl sektörel tecrübe ve aktif yönetilen 200+ bağımsız bölüm referansı",
          "5. Mesleki Sorumluluk ve 3. Şahıs Mali Mesuliyet Sigorta Poliçesi",
          "6. KMK m.37 uyarınca noter ve teftiş onaylı şeffaf bütçe garantisi",
          "7. Maksimum 45 dakika acil teknik arıza müdahale SLA taahhüdü",
          "8. Sakinlere özel 7/24 mobil aidat, arıza ve otopark takip yazılımı",
          "9. Hukuki icra ve aidat takip departmanının şirket bünyesinde bulunması",
          "10. Noter onaylı devir teslim tutanağı ve eksiksiz demirbaş sayım protokolü"
        ]
      },
      {
        "type": "h2",
        "text": "Teknik İhale Şartnamesi (RFP) Nasıl Hazırlanır?"
      },
      {
        "type": "p",
        "text": "Teklif almadan önce bağımsız bölüm sayısı, blok yapısı, ortak alan cihaz envanteri ve güvenlik noktalarını içeren teknik bir şartname hazırlanmalıdır. Sitemizdeki online RFP jeneratörünü ücretsiz kullanabilirsiniz."
      },
      {
        "type": "h2",
        "text": "Eski Yönetimden Devir Teslim Protokolü"
      },
      {
        "type": "p",
        "text": "Yeni yönetim şirketi göreve başlarken noter onaylı karar defteri, işletme defteri, geçmiş banka ekstreleri, SGK dosyaları ve ortak alan anahtarları tutanakla teslim alınır; kasa sayımı yapılarak eksiklikler tespit edilir."
      },
      {
        "type": "h2",
        "text": "Sözleşmede Bulunması Gereken Hayati Hükümler"
      },
      {
        "type": "p",
        "text": "Şirketle imzalanacak sözleşmede personel kıdem tazminatı sorumluluğu, gizlilik taahhüdü, acil müdahale cezai şartları ve tek taraflı fesih koşulları net olarak yazılmalıdır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Yönetim şirketi sözleşmesi kaç yıllık yapılmalıdır?\nCevap: KMK uyarınca yöneticiler olağan genel kurul dönemleri için (genellikle 1 yıl) seçilir. Sözleşmeler 1 yıllık yapılır ve genel kurul onayıyla yenilenir."
      },
      {
        "type": "p",
        "text": "Soru: Yönetim şirketinden memnun kalınmazsa sözleşme nasıl feshedilir?\nCevap: Kat Malikleri Kurulu salt çoğunlukla olağanüstü toplanarak yönetici azli kararı alabilir ve sözleşmeyi haklı nedenle feshedebilir."
      },
      {
        "type": "cta",
        "text": "Siteniz için ücretsiz ihale şartnamesi oluşturun.",
        "href": "/hizmetler/tesis-yonetimi/rehber",
        "label": "Tesis Yönetimi Rehberimizi İnceleyin"
      }
    ]
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
    "tldr": "5188 sayılı Kanun kapsamında özel güvenlik görevlisi olmak veya 5 yılda bir kimlik kartını yenilemek için Emniyet Genel Müdürlüğü denetiminde yetkili kurumlardan eğitim almak ve ÖGG sınavını başarıyla geçmek şarttır.",
    "content": [
      {
        "type": "p",
        "text": "Toplu yaşam alanlarında, rezidanslarda, plazalarda ve kamu kurumlarında can ve mal güvenliğinin sağlanması, profesyonel ve eğitimli özel güvenlik personeli ile mümkündür. T.C. İçişleri Bakanlığı Emniyet Genel Müdürlüğü Özel Güvenlik Denetleme Başkanlığı denetiminde yürütülen 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun; özel güvenlik görevlilerinin temel eğitimlerini, silah taşıma yetkilerini ve 5 yılda bir zorunlu olan kimlik kartı yenileme süreçlerini net kurallara bağlamıştır."
      },
      {
        "type": "h2",
        "text": "1. Silahsız ve Silahlı Özel Güvenlik Eğitimi Şartları"
      },
      {
        "type": "p",
        "text": "Özel güvenlik sektörüne adım atmak isteyen adaylar için iki ana kategori mevcuttur:"
      },
      {
        "type": "ul",
        "items": [
          "Silahsız Özel Güvenlik Eğitimi: En az ortaokul (8 yıllık ilköğretim) mezunu ve 18 yaşını doldurmuş olmak şarttır. Toplam 100 saatlik teorik ve pratik müfredatı kapsar (Güvenlik Hukuku, Güvenlik Tedbirleri, Yangın, İlkyardım, Uyuşturucu Bilgisi, Etkili İletişim ve Kalabalık Yönetimi).",
          "Silahlı Özel Güvenlik Eğitimi: En az lise mezunu ve 21 yaşını doldurmuş olmak gerekir. 100 saatlik temel eğitime ek olarak 20 saatlik teorik silah bilgisi ve poligonda 25 mermi gerçek atış eğitimi ile toplam 120 saattir.",
          "Tam Teşekküllü Devlet Hastanesi Sağlık Kurulu Raporu: Psikiyatri, Nöroloji, Göz, KBB ve Ortopedi branşlarından \"Silahlı/Silahsız Özel Güvenlik Görevlisi Olur\" ibareli heyet raporu zorunludur."
        ]
      },
      {
        "type": "h2",
        "text": "2. 5 Yılda Bir Zorunlu Kimlik Yenileme Eğitimi ve Sınavı"
      },
      {
        "type": "p",
        "text": "Özel Güvenlik Görevlisi Kimlik Kartı süresi 5 yıldır. Süresi dolan görevlilerin mesleki haklarını kaybetmemesi ve görevden uzaklaştırılmaması için kimlik geçerlilik tarihinden en az 6 ay önce yenileme kursuna kayıt olması gerekir. Silahsız adaylar için 50 saat, silahlı adaylar için 60 saatlik eğitim verilir. Yenileme sınavında baraj puanı aranmaz; sınava eksiksiz katılmak kimliğin 5 yıl daha uzatılması için yeterlidir."
      },
      {
        "type": "h2",
        "text": "3. Alo Güvenlik Eğitimi ve Kadıköy Şubesi Güvencesi"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz Alo Güvenlik (guvenlikkursu.com), İstanbul Kadıköy merkezli modern derslikleri, uzman emniyet müdürü eğitmen kadrosu ve simülasyon poligonları ile yılda binlerce güvenlik görevlisine sertifika kazandırmaktadır. Kursiyerlerimize eğitim sonrası Alo Yönetim ve 3G Güvenlik bünyesindeki elit rezidans ve plaza projelerinde doğrudan istihdam imkanı sunulmaktadır."
      },
      {
        "type": "h2",
        "text": "4. Güvenlik Görevlilerinin Yasal Yetkileri (5188 m.7)"
      },
      {
        "type": "ol",
        "items": [
          "X-Ray Cihazı ve El Detektörü ile Arama: Koruma alanına giren ziyaretçileri elektronik cihazlarla kontrol etme.",
          "Kimlik Sorma ve Ziyaretçi Kaydı: Tesis girişinde kimlik talep etme ve kayıt altına alma.",
          "Zor Kullanma ve Yakalama: Suçüstü halinde veya can güvenliğini tehdit eden durumlarda faili yakalama ve polise teslim etme.",
          "Emanete Alma: Tesis kurallarına aykırı veya tehlikeli maddeleri geçici olarak emanet kasasında tutma."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Özel güvenlik kimlik kartı ne kadar sürede çıkar?\nCevap: Yazılı sınav sonuçlarının açıklanması ve Valilik İl Emniyet Müdürlüğü Güvenlik Soruşturması ve Arşiv Araştırması sürecinin tamamlanması ortalama 45-60 gün sürer."
      },
      {
        "type": "p",
        "text": "Soru: Kimlik süresi dolduktan sonra güvenlik görevlisi çalışmaya devam edebilir mi?\nCevap: Hayır. Kimlik süresi bittiği gün görevlinin çalışma yetkisi askıya alınır; çalıştırılması halinde site yönetimine ve şirkete 5188 uyarınca ağır idari para cezası uygulanır."
      },
      {
        "type": "cta",
        "text": "5188 Güvenlik Eğitimi ve Kimlik Yenileme için Alo Güvenlik ile iletişime geçin.",
        "href": "https://www.guvenlikkursu.com/",
        "label": "Alo Güvenlik Kursu Resmi Sitesi"
      }
    ]
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
    "tldr": "Site ve binalarınız için özel güvenlik şirketi seçerken İçişleri Bakanlığı Faaliyet İzin Belgesi, 3. Şahıs Mali Mesuliyet Sigortası, RFID devriye takibi ve tecrübeli süpervizör denetimleri temel şarttır.",
    "content": [
      {
        "type": "p",
        "text": "Bir konut sitesinin veya rezidansın huzuru, kapıdaki güvenlik hizmetinin niteliğiyle doğrudan ilişkilidir. Piyasadaki yetkisiz taşeronlar veya belgesiz danışmanlık firmaları, kat maliklerini hem ağır idari para cezalarıyla hem de güvenlik zafiyetleriyle baş başa bırakabilir. Bu nedenle kurumsal bir özel güvenlik şirketi seçimi hayati önem taşır."
      },
      {
        "type": "h2",
        "text": "1. Özel Güvenlik Şirketi Seçerken Aranacak 8 Kritik Kriter"
      },
      {
        "type": "ul",
        "items": [
          "1. T.C. İçişleri Bakanlığı Faaliyet İzin Belgesi: Şirketin 5188 sayılı kanun kapsamında resmi güvenlik hizmeti verme yetkisi tescilli olmalıdır.",
          "2. 3. Şahıs Mali Mesuliyet Sigortası: Hırsızlık, sabotaj veya personelin ihmalinden doğabilecek zararlar için en az 10 Milyon TL teminatlı poliçe.",
          "3. 3G Özel Güvenlik (3gguvenlik.com) Operasyonel Güvencesi: Grup şirketimiz bünyesinde 7/24 nöbetçi süpervizör araçları ve telsizli denetim ağı.",
          "4. Personel Eğitim ve Sertifikasyonu: Tüm personelin Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, öfke kontrolü ve kriz yönetimi eğitimli olması.",
          "5. RFID / GPS Destekli Akıllı Devriye Tur Sistemi: Güvenlik görevlisinin gece devriyelerinin saniye saniye merkezden telemetri ile izlenmesi.",
          "6. Yapay Zeka Destekli PTS ve Kamera Entegrasyonu: Giriş yapan araçların ve ziyaretçilerin otomatik plaka ve yüz tanıma yazılımlarıyla kaydı.",
          "7. Yedek Personel Garantisi: İzin, rapor veya ani ayrılmalarda maksimum 2 saat içinde aynı nitelikte üniformalı personelin sahaya sevk edilmesi.",
          "8. Bordro ve SGK Şeffaflığı: Görevlilerin maaş, fazla mesai ve SGK primlerinin zamanında ödendiğine dair aylık dökümün yönetime sunulması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kaçak Bekçi Çalıştırmanın Ağır Hukuki Riskleri"
      },
      {
        "type": "quote",
        "text": "5188 lisansı ve Valilik Özel Güvenlik İzni (ÖGİ) olmadan üniforma giydirilen bekçiler, site yönetimine bağımsız bölüm başına yüz binlerce liralık idari para cezası doğurur."
      },
      {
        "type": "p",
        "text": "Emniyet ve Jandarma ekiplerinin yaptığı habersiz denetimlerde, lisanssız görevli çalıştıran apartman yöneticileri hakkında TCK ve 5188 kapsamında adli işlem başlatılmaktadır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Sitede özel güvenlik çalıştırmak için kat malikleri kurulu kararı gerekir mi?\nCevap: Evet. Kat Malikleri Kurulu'nda özel güvenlik hizmeti alınması yönünde karar alınmalı ve ardından Valilik Özel Güvenlik Komisyonu'na müracaat edilmelidir."
      },
      {
        "type": "p",
        "text": "Soru: Güvenlik şirketinin sözleşme süresi ne olmalıdır?\nCevap: Genellikle sözleşmeler 1 yıllık yapılır; performans değerlendirmesine ve SLA memnuniyetine göre her yıl yenilenir."
      },
      {
        "type": "cta",
        "text": "3G Güvenlik güvencesiyle siteniz için ücretsiz güvenlik keşfi talep edin.",
        "href": "https://3gguvenlik.com/",
        "label": "3G Güvenlik Resmi Sitesi"
      }
    ]
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
    "tldr": "KMK m.20 uyarınca aidatını vadesinde ödemeyen kat malikine aylık %5 gecikme tazminatı uygulanır ve mahkeme kararı aranmaksızın ilamsız icra takibi başlatılır.",
    "content": [
      {
        "type": "p",
        "text": "Apartman ve site yönetimlerinin en sık karşılaştığı operasyonel krizlerin başında, aidat ve ortak gider avanslarını düzenli ödemeyen kat malikleri ve kiracılar gelmektedir. Birkaç malikin aidat ödememesi; kapıcı maaşlarının gecikmesine, ortak elektrik/doğalgazın kesilme riskine ve asansör bakımlarının aksamasına neden olur. 634 Sayılı Kat Mülkiyeti Kanunu (KMK) bu konuda yöneticiye çok güçlü yasal haklar ve yaptırım yetkileri tanımıştır."
      },
      {
        "type": "h2",
        "text": "1. Aylık %5 Yasal Gecikme Tazminatı (KMK m.20/2)"
      },
      {
        "type": "p",
        "text": "Kat Mülkiyeti Kanunu Madde 20/2 açık hükmü gereğince: \"Gider veya avans payını ödemeyen kat maliki, ödemede geciktiği günler için aylık yüzde beş hesabıyla gecikme tazminatı ödemekle yükümlüdür.\" Bu tazminat yasal faizden tamamen bağımsızdır ve yıllık %60 gibi caydırıcı bir orana karşılık gelir."
      },
      {
        "type": "ul",
        "items": [
          "Gecikme Tazminatının Başlangıç Tarihi: Aidatın son ödeme gününü takip eden ilk gündür.",
          "Genel Kurul Kararı Olmasa Bile Geçerlilik: Kanun emredici olduğu için genel kurulda karar alınmamış olsa dahi aylık %5 tazminat kanunen tahsil edilir.",
          "Yargıtay Emsal Kararları: Yargıtay Hukuk Genel Kurulu ve 20. Hukuk Dairesi kararları uyarınca gecikme tazminatı borcun aslıyla birlikte takibe konur."
        ]
      },
      {
        "type": "h2",
        "text": "2. İlamsız İcra Takibi (Örnek No: 7) Başlatma Süreci"
      },
      {
        "type": "p",
        "text": "Yönetici veya sitenin vekili olan avukat; borçlu kat malikine karşı mahkemeden ilam almaya veya dava açmaya gerek duymaksızın doğrudan İcra Dairesi kanalıyla İlamsız İcra Takibi başlatabilir."
      },
      {
        "type": "ol",
        "items": [
          "Hesap Ekstresi Çıkarılması: Borcun hangi aylara ait olduğunun dökümü hazırlanır.",
          "Takip Talebi Tanzimi: İcra Müdürlüğü UYAP sistemi üzerinden takip talebi açılır.",
          "Ödeme Emri Tebligatı: Borçluya 7 gün içinde ödeme veya itiraz hakkı tanıyan Örnek No: 7 ödeme emri tebliğ edilir.",
          "Takibin Kesinleşmesi ve Haciz: 7 gün içinde itiraz edilmezse takip kesinleşir; borçlunun banka hesaplarına, maaşına, aracına ve tapudaki dairesine haciz konur."
        ]
      },
      {
        "type": "h2",
        "text": "3. Kiracının Müteselsil Sorumluluğu (KMK m.22)"
      },
      {
        "type": "p",
        "text": "Kat malikinin ortak gider borcundan, bağımsız bölümde oturan kiracı da ödemekle yükümlü olduğu kira miktarı kadar müteselsilen sorumludur. İcra dairesi İİK 89/1 haciz ihbarnamesi ile kiracının kira ödemesini doğrudan site banka hesabına aktarmasını emredebilir."
      },
      {
        "type": "h2",
        "text": "4. Kanuni İpotek Hakkı Tescili (KMK m.22/2)"
      },
      {
        "type": "p",
        "text": "Kat malikinin gider borcu ödenmediği takdirde, yönetici veya diğer kat malikleri Sulh Hukuk Mahkemesi aracılığıyla borçlunun bağımsız bölümü üzerine Tapu Sicilinde Kanuni İpotek hakkı tescil ettirebilir."
      },
      {
        "type": "h2",
        "text": "5. İtirazın İptali Davası ve %20 İcra İnkar Tazminatı"
      },
      {
        "type": "p",
        "text": "Borçlunun takibe itiraz etmesi halinde açılan itirazın iptali davasında haksız çıkan borçlu, ana borç ve gecikme tazminatına ek olarak borcun en az %20'si oranında icra inkar tazminatı ödemeye mahkum edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Gecikme tazminatı oranı genel kurul kararıyla düşürülebilir mi?\nCevap: Hayır. KMK m.20'deki aylık %5 oranı emredici hukuk kuralıdır; genel kurul kararıyla dahi düşürülemez veya affedilemez."
      },
      {
        "type": "p",
        "text": "Soru: İcra takibi açmak için avukat tutmak zorunlu mudur?\nCevap: Yönetici şahsen de takip açabilir; ancak usul hataları ve itiraz risklerine karşı uzman bir gayrimenkul icra avukatı ile çalışılması önerilir."
      },
      {
        "type": "cta",
        "text": "Hukuk departmanımızla aidat tahsilat oranınızı %98'e çıkarın.",
        "href": "/hizmetler/aidat-takibi",
        "label": "Aidat ve İcra Takip Hizmetimiz"
      }
    ]
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
    "content": [
      {
        "type": "p",
        "text": "Bir konut sitesinde veya apartmanda güvenlik görevlisi bulundurabilmek için yalnızca bir şirketle anlaşmak veya eleman işe almak yeterli değildir. 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun Madde 3 gereğince, güvenliğin sağlanacağı tesis için yetkili mülki idare amirliğinden (Valilik) Özel Güvenlik İzni (ÖGİ) alınması yasal bir zorunluluktur."
      },
      {
        "type": "h2",
        "text": "1. Valilik Özel Güvenlik İzni (ÖGİ) Başvuru Adımları"
      },
      {
        "type": "ol",
        "items": [
          "Kat Malikleri Kurulu Kararı: Karar defterine \"Sitemizde 5188 sayılı kanun kapsamında özel güvenlik hizmeti alınmasına ve Valiliğe başvurulmasına\" dair karar yazılır ve noterden tasdik ettirilir.",
          "Müracaat Dosyası Tanzimi: Sitenin tapu bilgileri, bağımsız bölüm sayısı, vaziyet planı, risk analiz formu ve güvenlik noktalarını gösteren kroki hazırlanır.",
          "İl Özel Güvenlik Komisyonu İncelemesi: Emniyet, Jandarma, Ticaret Odası ve Valilik temsilcilerinden oluşan komisyon dosyayı inceler ve yerinde keşif yapar.",
          "Komisyon Kararı ve Valilik Onayı: Komisyonun uygun görmesi halinde Valilik makamı Özel Güvenlik İzin Belgesi düzenler.",
          "Özel Güvenlik Mali Mesuliyet Sigortası: Görev yapacak personel sayısı kadar sigorta poliçesi tanzim edilerek Valiliğe teslim edilir."
        ]
      },
      {
        "type": "h2",
        "text": "2. İzin Alınmadan Güvenlik Çalıştırmanın Cezası"
      },
      {
        "type": "p",
        "text": "5188 Sayılı Kanun Madde 20 uyarınca: Özel güvenlik izni almadan özel güvenlik görevlisi istihdam eden veya hizmet alan kişi ve yöneticilere doğrudan idari para cezası uygulanır ve faaliyet men edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: ÖGİ belgesi kaç yılda bir yenilenir?\nCevap: Özel Güvenlik İzin Belgesi süresiz olarak verilir; ancak personel sayısı veya silah durumu değiştiğinde komisyondan revizyon kararı alınmalıdır."
      },
      {
        "type": "p",
        "text": "Soru: ÖGİ başvuru sürecini kim takip eder?\nCevap: Alo Yönetim ve grup şirketimiz 3G Güvenlik, tüm dosya hazırlık ve Valilik takip süreçlerini site yönetimi adına vekaleten yürütmektedir."
      },
      {
        "type": "cta",
        "text": "Siteniz için Valilik Özel Güvenlik İzni danışmanlığı alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Güvenlik Danışmanlığı Hizmetimiz"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Modern toplu konut ve rezidanslarda güvenlik, yalnızca kapıda duran bir bekçiden ibaret değildir. Teknolojik elektronik güvenlik altyapısı ile fiziksel insan gücünün kusursuz bir uyum içinde çalıştığı Entegre Güvenlik Yönetim Sistemi, sakinlerin evlerinde huzur içinde yaşamasının anahtarıdır."
      },
      {
        "type": "h2",
        "text": "1. Nizamiye Giriş Kontrol ve Misafir Kabul Protokolleri"
      },
      {
        "type": "p",
        "text": "Sitenin ana giriş kapısı ilk savunma hattıdır. 3G Güvenlik personellerimiz tarafından uygulanan standart operasyon prosedürleri (SOP):"
      },
      {
        "type": "ul",
        "items": [
          "Sakin Araçları İçin Hızlı Geçiş: Plaka Tanıma Sistemi (PTS) veya UHF RFID etiketler ile beklemesiz otomatik bariyer açılışı.",
          "Misafir ve Kurye Teyit Protokolü: Daire sakini interkom veya mobil uygulama üzerinden onay vermeden yabancı araçların siteye girişi engellenir.",
          "Kargo Kabul ve Güvenlik Odası: Kuryelerin kat aralarında kontrolsüz dolaşımı sınırlandırılarak kargolar lobi akıllı dolaplarına teslim alınır."
        ]
      },
      {
        "type": "h2",
        "text": "2. 7/24 CCTV İzleme ve AI Akıllı Video Analizi"
      },
      {
        "type": "p",
        "text": "Kör nokta bırakmayacak şekilde yerleştirilen IP kameralar; sınır ihlali, şüpheli paket, ters yön araç hareketi ve yangın dumanı durumlarında güvenlik merkezine anlık sesli alarm üretir."
      },
      {
        "type": "h2",
        "text": "3. RFID Devriye Tur Sistemi ile Gece Güvenliği"
      },
      {
        "type": "p",
        "text": "Sitenin yangın merdivenleri, kapalı otoparkları, sığınakları ve çevre çitleri boyunca yerleştirilen RFID kontrol noktaları, güvenlik görevlilerimiz tarafından saat başı taranır ve raporlar mobil merkeze aktarılır."
      },
      {
        "type": "cta",
        "text": "Siteniz için 5188 lisanslı entegre güvenlik çözümü oluşturun.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Güvenlik Çözümlerimizi İnceleyin"
      }
    ],
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
    "tldr": "Site aidat artışları kanunen sabit bir orana bağlı olmayıp; sitenin yıllık işletme bütçesindeki personel (SGK/asgari ücret), enerji, bakım ve demirbaş maliyet artışlarının KMK m.20 uyarınca kat maliklerine paylaştırılmasıyla belirlenir.",
    "content": [
      {
        "type": "p",
        "text": "Toplu konutlarda, sitelerde ve rezidanslarda her yılın başında en çok tartışılan konuların başında aidat artış oranları gelir. Kira artışlarında uygulanan yasal tavan sınırlamalarının aksine, Kat Mülkiyeti Kanunu (KMK) aidat artışları için sabit bir yüzde veya TÜFE tavanı belirlemez. Aidat tutarı, binanın fiili giderlerini karşılamak üzere hazırlanan İşletme Projesi bütçesi ile şekillenir."
      },
      {
        "type": "h2",
        "text": "1. Aidat Artışını Belirleyen 4 Temel Maliyet Kalemi"
      },
      {
        "type": "ul",
        "items": [
          "Personel ve SGK Giderleri (%55-65): Güvenlik, temizlik, teknik servis ve bahçıvan personellerinin asgari ücret artışları, SGK primleri, kıdem tazminatı fonu ve yemek/yol giderleri bütçenin en büyük kalemidir.",
          "Ortak Alan Enerji Maliyetleri (%15-25): Asansörler, hidroforlar, çevre aydınlatması, kapalı otopark jet fanları ve merkezi kazan yakıt giderlerindeki elektrik/doğalgaz zamları.",
          "Periyodik Bakım ve Sözleşmeli Hizmetler (%10-15): Asansör yetkili servisleri, jeneratör, trafo, havuz kimyasalları, ilaçlama ve yangın algılama sistemleri yıllık sözleşme artışları.",
          "Olağanüstü Onarım ve Demirbaş Avansı (%5-10): Çatı aktarımı, dış cephe boyası, kamera sistemi yenilemesi gibi amortisman rezerv fonu."
        ]
      },
      {
        "type": "h2",
        "text": "2. KMK Madde 20: Ortak Gider Paylaşım Esasları"
      },
      {
        "type": "p",
        "text": "634 Sayılı KMK m.20 uyarınca aksi yönetim planında kararlaştırılmadıkça;"
      },
      {
        "type": "ol",
        "items": [
          "Kapıcı, kaloriferci, bahçıvan ve bekçi giderleri ile bunlar için toplanacak avanslara bütün kat malikleri EŞİT oranda katılır.",
          "Bütün ortak yerlerin bakım, koruma, güçlendirme, onarım giderleri ve yönetici aylığı gibi diğer giderlere ise ARSA PAYI oranında katılırlar."
        ]
      },
      {
        "type": "h2",
        "text": "3. Fahiş Aidat Artışına İtiraz ve Sulh Hukuk Mahkemesi Süreci"
      },
      {
        "type": "p",
        "text": "Yönetim kurulunun hazırladığı işletme projesine 7 gün içinde noterden veya elden imza karşılığı itiraz edilebilir. Genel kurulda kabul edilen bütçeye karşı ise, toplantıya katılıp muhalefet şerhi koyan malikler 1 ay, katılmayanlar ise 6 ay içinde KMK m.33 uyarınca Sulh Hukuk Mahkemesi'nde \"Hakimin Müdahalesi\" davası açabilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ev sahibi mi, kiracı mı aidat artışından sorumludur?"
      },
      {
        "type": "p",
        "text": "İşletme giderlerinden (personel, elektrik, temizlik vb.) kiracı ve ev sahibi müteselsilen sorumludur; demirbaş ve ana gayrimenkul yenileme giderleri ise yalnızca ev sahibine (kat malikine) aittir."
      },
      {
        "type": "h3",
        "text": "Aidat zammını yönetici tek başına belirleyebilir mi?"
      },
      {
        "type": "p",
        "text": "Yönetici işletme projesini hazırlar ve tebliğ eder; ancak itiraz halinde nihai bütçe Kat Malikleri Genel Kurulu tarafından oylanarak karara bağlanır."
      },
      {
        "type": "cta",
        "text": "Sitenizin aidat bütçesini optimize etmek ve şeffaf yönetim teklifi almak için bize ulaşın.",
        "href": "/teklif-al",
        "label": "Ücretsiz Aidat Analizi İsteyin"
      }
    ]
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
    "content": [
      {
        "type": "p",
        "text": "Apartman ve site yönetimlerinde ortak gider borcunu ödemeyen kat maliki veya kiracılara karşı icra takibi başlatmak, yöneticinin keyfi bir tercihi değil; KMK m.35 uyarınca yerine getirmek zorunda olduğu yasal bir görevdir. Borcunu ödemeyen sakinlerin borcunu diğer komşuların finanse etmesi hukuka aykırıdır."
      },
      {
        "type": "h2",
        "text": "1. İcra Takibine Başlamadan Önceki Hazırlık Belgeleri"
      },
      {
        "type": "p",
        "text": "İcra takibinin hukuken sağlam olması ve olası itirazlarda yöneticinin tazminat ödememesi için şu evrakların dosyada hazır bulunması şarttır:"
      },
      {
        "type": "ul",
        "items": [
          "Noter Onaylı Karar Defteri: Yöneticinin seçildiği Genel Kurul divan tutanağı ve karar defteri fotokopisi.",
          "Kesinleşmiş İşletme Projesi: KMK m.37 gereğince maliklere tebliğ edilmiş yıllık tahmini bütçe.",
          "Banka Hesap Dökümleri: Borçlunun hangi aylara ait aidatı yatırmadığını ispatlayan resmi ekstre.",
          "Noter İhtarnamesi veya Yazılı Tebligat: Yargıtay şart koşmasa da borçluya son bir ödeme ihtarı çekilmesi iyi niyet göstergesidir."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra Dairesinde Takip Başlatma ve Ödeme Emri Tebliği"
      },
      {
        "type": "p",
        "text": "Hazırlanan belgelerle UYAP Avukat Portal veya İcra Müdürlüğü kanalıyla İlamsız Takip Talebi açılır. İcra dairesi borçluya Örnek No: 7 Ödeme Emri tebliğ eder."
      },
      {
        "type": "ol",
        "items": [
          "Tebligat Tarihi: Tebligatın borçluya veya MERNİS adresine ulaştığı tarihten itibaren 7 günlük yasal süre başlar.",
          "Ödeme Yapılması: Borçlu 7 gün içinde dosya borcunu icra veznesine öderse takip kapanır.",
          "Takibin Kesinleşmesi: 7 gün içinde itiraz edilmezse icra takibi kesinleşir ve haciz aşamasına geçilir."
        ]
      },
      {
        "type": "h2",
        "text": "3. Borçlunun Haksız İtirazı ve %20 İcra İnkar Tazminatı"
      },
      {
        "type": "p",
        "text": "Borçlu takibe haksız olarak itiraz ederse takip durur. Bu durumda site yönetimi Sulh Hukuk veya İcra Hukuk Mahkemesinde İtirazın İptali Davası açar. Borçlu haksız çıktığında ana borç, %5 gecikme tazminatı ve yargılama giderlerine ek olarak asgari %20 İcra İnkar Tazminatı ödemeye mahkum edilir."
      },
      {
        "type": "h2",
        "text": "4. İcra Takip Masraflarını Kim Öder?"
      },
      {
        "type": "p",
        "text": "Takip açılırken ödenen başvurma harcı, peşin harç, tebligat masrafları ve kanuni avukatlık vekalet ücreti tamamen borçlu kat malikine yükletilir. Site bütçesinden tek bir kuruş masraf çıkmaz."
      },
      {
        "type": "h2",
        "text": "5. UYAP Üzerinden Mal Varlığı Sorgusu ve Fiili Haciz"
      },
      {
        "type": "p",
        "text": "Takip kesinleştikten sonra borçlunun tüm banka hesaplarına e-haciz gönderilir, varsa aracı ve taşınmazları üzerine haciz şerhi işlenir; gerekirse evine fiili hacze gidilerek tahsilat tamamlanır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: İcra takibi ne kadar sürede sonuçlanır?\nCevap: İtiraz edilmeyen dosyalarda tebligattan sonraki 10 gün içinde banka ve araç hacizleri tatbik edilir. İtiraz halinde dava süreci 4-8 ay sürebilir."
      },
      {
        "type": "p",
        "text": "Soru: Kiracı evden ayrılırsa eski aidat borcu kime kalır?\nCevap: KMK uyarınca kat maliki asıl borçludur. Kiracı çıksa bile gayrimenkulün sahibi borcun tamamından şahsen ve dairesiyle sorumludur."
      },
      {
        "type": "cta",
        "text": "Hukuk departmanımızla aidat tahsilatlarınızı güvenceye alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Hukuk ve İcra Danışmanlığı Alın"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Türkiye'nin deprem kuşağında yer alması ve özellikle İstanbul başta olmak üzere büyükşehirlerdeki yaşlı yapı stoku, kentsel dönüşümü hayati bir zorunluluk haline getirmiştir. 6306 Sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun ve yapılan son yasal düzenlemeler, binalarını yenilemek isteyen kat maliklerine büyük kolaylıklar ve devlet destekleri sunmaktadır."
      },
      {
        "type": "h2",
        "text": "1. Riskli Yapı Tespiti ve Rapor Aşaması"
      },
      {
        "type": "p",
        "text": "Kentsel dönüşüm süreci, apartmandaki kat maliklerinden sadece birinin Çevre, Şehircilik ve İklim Değişikliği Bakanlığı lisanslı yapı denetim kuruluşlarına başvurmasıyla başlar. Diğer maliklerin onayına gerek yoktur."
      },
      {
        "type": "ul",
        "items": [
          "Karot ve Demir İncelemesi: Taşıyıcı kolonlardan numune alınarak beton kalitesi ve donatı korozyonu ölçülür.",
          "Raporun Tapuya Bildirilmesi: Bina riskli çıkarsa rapor İl Kentsel Dönüşüm Müdürlüğü'ne gönderilir ve tapu kütüğüne \"Riskli Yapı\" şerhi işlenir.",
          "İtiraz Süreci: Raporun tebliğinden itibaren 15 gün içinde teknik heyete itiraz edilebilir; itiraz reddedilirse karar kesinleşir."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yeni Salt Çoğunluk (50+1) Kuralı ve Karar Alma"
      },
      {
        "type": "p",
        "text": "Eski mevzuatta aranan 2/3 çoğunluk şartı, yapılan son yasal değişiklikle arsa payı sahiplerinin Salt Çoğunluğuna (yarıdan bir fazlası - %50+1) indirilmiştir. Artık birkaç kişinin itirazı yüzünden tüm binanın kentsel dönüşümü engellenememektedir."
      },
      {
        "type": "h2",
        "text": "3. Müteahhit Seçimi ve Noter Onaylı Kat Karşılığı Sözleşmesi"
      },
      {
        "type": "p",
        "text": "Müteahhit ile anlaşma sağlanırken şu 4 hayati madde sözleşmeye eklenmelidir:"
      },
      {
        "type": "ol",
        "items": [
          "Bina Tamamlama Sigortası veya Teminat Mektubu",
          "Gecikme Halinde Aylık Rayiç Kira Cezası",
          "Teknik Şartnamede Birinci Sınıf Malzeme ve Marka Listesi",
          "İş Bitimi İskan (Yapı Kullanma İzin Belgesi) Alma Şartı"
        ]
      },
      {
        "type": "h2",
        "text": "4. Devlet Destekleri: Kira Yardımı ve Kredi Faiz İndirimi"
      },
      {
        "type": "p",
        "text": "Riskli yapı maliklerine ve kiracılarına Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından 18 ila 48 ay boyunca geri ödemesiz aylık kira yardımı sağlanır. Ayrıca tüm tapu, noter, belediye harç ve vergi muafiyetleri uygulanır."
      },
      {
        "type": "h2",
        "text": "5. Tahliye Süreci, İtiraz Hakları ve Yıkım Ruhsatı"
      },
      {
        "type": "p",
        "text": "Rapor kesinleştikten sonra maliklere 60 gün süre verilir; gerekirse ek 30 gün tanınır. Süre sonunda tahliye edilmeyen binaların elektrik, su ve doğalgazı kesilerek mülki amirlikçe yıktırılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Kentsel dönüşüme katılmayan azınlık maliklerin hisseleri ne olur?\nCevap: Salt çoğunluk sağlandıktan sonra dönüşüme katılmayan maliklerin arsa payları Çevre ve Şehircilik İl Müdürlüğü tarafından açık artırma ile diğer paydaşlara satılır."
      },
      {
        "type": "p",
        "text": "Soru: Riskli yapı tespit raporu masrafını kim öder?\nCevap: Başvuruyu yapan kat maliki öder; ancak bina riskli çıktığında ve yıkım kararı kesinleştiğinde bu masraf diğer kat maliklerinden arsa payları oranında tahsil edilir."
      },
      {
        "type": "cta",
        "text": "Binanızın kentsel dönüşüm ve yönetim danışmanlığı için bize ulaşın.",
        "href": "/teklif-al",
        "label": "Dönüşüm Danışmanlığı Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Türkiye'nin sismik hareketliliği ve özellikle Marmara Bölgesi'ndeki beklenen büyük deprem riski, apartman ve site yönetimlerinin binalarını teknik olarak denetlemesini zorunlu kılmaktadır. Doğru bir deprem risk analizi, can güvenliğini korumanın ve gerekli güçlendirme veya kentsel dönüşüm kararlarını almanın tek bilimsel yoludur."
      },
      {
        "type": "h2",
        "text": "1. Deprem Risk Analizinde Uygulanan 5 Bilimsel Test ve Laboratuvar Aşaması"
      },
      {
        "type": "ol",
        "items": [
          "Taşıyıcı Kolon Karot Numunesi Alımı: Binanın taşıyıcı kolonlarından elmas uçlu özel karot makineleriyle silindirik beton numuneleri alınır ve Çevre ve Şehircilik Bakanlığı lisanslı laboratuvarlarda basınç kırma testine tabi tutularak beton sınıfı (C14, C20, C30 vb.) belirlenir.",
          "Donatı Röntgeni ve Paspayı Tespiti: Kolon ve perdelerin içindeki demir donatıların adedi, çapı, etriye sıklaştırma aralıkları ve korozyon (paslanma) durumu kırmadan ferrosan tarama cihazlarıyla tespit edilir.",
          "Sıyırma ve Korozyon İncelemesi: Kolon dipleri lokal olarak açılarak donatı demirlerindeki paslanma ve kesit kaybı kumpas ile mikron düzeyinde ölçülür.",
          "Zemin Etüdü ve Jeofizik Ölçüm: Binanın oturduğu parselde sismik kırılma ve mikrotremor ölçümleri yapılarak zeminin sıvılaşma riski, hakim titreşim periyodu ve zemin sınıfı (ZA, ZB, ZC, ZD, ZE) tespit edilir.",
          "3 Boyutlu Statik Modelleme ve Simülasyon: Elde edilen tüm veriler Türkiye Bina Deprem Yönetmeliği (TBDY-2018) kriterlerine göre bilgisayar modellemesine aktarılır ve binanın deprem anındaki yer değiştirme davranışı simüle edilir."
        ]
      },
      {
        "type": "h2",
        "text": "2. Risk Raporu Sonrası Yönetimsel Karar Süreçleri (6306 Sayılı Kanun)"
      },
      {
        "type": "p",
        "text": "6306 Sayılı Kentsel Dönüşüm Kanunu kapsamında düzenlenen \"Riskli Yapı Tespit Raporu\", tapuya şerh düşüldükten sonra kat maliklerine 60 + 30 günlük tahliye ve yıkım süresi tanır. Alo Yönetim olarak, bina sakinleri adına lisanslı kuruluşlarla test sürecini organize ediyor ve güçlendirme / yeniden yapım süreçlerinde tarafsız yönetim danışmanlığı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "3. Tesis Yönetiminde Deprem Acil Durum Eylem Planı"
      },
      {
        "type": "ul",
        "items": [
          "Otomatik Deprem Sensörlü Gaz Kesme Valfleri: Sismik sarsıntıyı algılayarak ana doğalgaz hattını 0.5 saniyede kesen emniyet ventilleri.",
          "Jeneratör ve Yangın Hidroforu Güvenliği: Sarsıntı anında devrilmeye karşı yaylı sismik izolatörler ve esnek boru kompansatörleri.",
          "Tahliye Yolları ve Toplanma Alanı: Yangın merdivenlerinin sürekli açık tutulması, fosforlu acil çıkış yönlendirmeleri ve afet çantası istasyonları."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Karot numunesi binanın kolonlarına zarar verir mi?"
      },
      {
        "type": "p",
        "text": "Hayır. Lisanslı mühendisler tarafından doğru noktalardan ve standart boyutlarda alınan karot delikleri, yüksek mukavemetli epoksi tamir harçları ile doldurularak kolonun mukavemeti korunur."
      },
      {
        "type": "h3",
        "text": "Deprem testi yaptırmak için tüm kat maliklerinin oy birliği gerekir mi?"
      },
      {
        "type": "p",
        "text": "Hayır. Bilgi amaçlı deprem dayanıklılık raporu için yönetim kurulu kararı yeterlidir; 6306 sayılı resmi riskli yapı tespiti için ise tek bir kat malikinin başvurusu kanunen yeterlidir."
      },
      {
        "type": "cta",
        "text": "Binanızın deprem dayanıklılık analizi için uzman mühendislik danışmanlığı alın.",
        "href": "/teklif-al",
        "label": "Deprem Danışmanlığı Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Yüzme havuzlarında suyun berrak, kokusuz ve hijyenik kalması hassas bir kimyasal dengeye dayanır. Hatalı kimyasal kullanımı havuz suyunu bulandırabilir, filtre kumunu taşlaştırabilir, derz dolgularını eritebilir veya yüzücülerde kimyasal yanık ve göz tahrişine yol açabilir."
      },
      {
        "type": "h2",
        "text": "1. Temel Havuz Kimyasalları ve Doğru Kullanım Dozajları"
      },
      {
        "type": "ul",
        "items": [
          "Sıvı ve Granül Klor (%56 ve %90 Triklor/Diklor): Bakteri, mantar ve virüsleri yok eden ana dezenfektandır. Açık havuzlarda 1.0 - 3.0 ppm, kapalı havuzlarda 1.0 - 1.5 ppm serbest klor seviyesi korunmalıdır.",
          "pH Düşürücü (Sodyum Bisülfat / Sıvı Sülfürik Asit): Şebeke suyunun yüksek pH değerini 7.2 - 7.6 ideal bandına çeker. pH 7.8 üzerine çıktığında klor dezenfeksiyon gücünün %70'ini kaybeder.",
          "Yosun Önleyici (Algisit - Kuaterner Amonyum): Havuz tabanında ve derz aralarında fotosentez kaynaklı yeşil/siyah yosun oluşumunu engeller. Haftada 100 m³ su için 500-1000 ml uygulanır.",
          "Çöktürücü ve Sıvı Parlatıcı (Topaklayıcı - Polialüminyum Klorür): Kum filtresinin tutamayacağı 0.1-5 mikron boyutundaki organik kirleri birleştirerek dibe çöktürür veya filtrede tutar."
        ]
      },
      {
        "type": "h2",
        "text": "2. Şok Klorlama (Break-Point Chlorination) Protokolü"
      },
      {
        "type": "p",
        "text": "Havuzda aşırı klor kokusu ve göz yanması hissediliyorsa bu klorun çokluğundan değil, yetersiz dezenfeksiyon sonucu oluşan \"bağlı klor (kloramin)\" varlığından kaynaklanır. Bağlı kloru yok etmek için normal dozun 3-5 katı klor verilerek şok klorlama yapılır ve havuz suyu 24 saat dinlendirilir."
      },
      {
        "type": "h2",
        "text": "3. Kimyasal Depolama ve İSG Güvenlik Kuralları"
      },
      {
        "type": "ul",
        "items": [
          "Klor ve asit bidonları kesinlikle aynı odada yan yana depolanmamalıdır; temasları halinde ölümcül zehirli klor gazı açığa çıkar.",
          "Kimyasal dozaj pompalarının emiş hortumları ve enjektörleri her ay kireç tıkanıklığına karşı asit banyosu ile temizlenmelidir.",
          "Havuz operatörleri kimyasal transferinde nitril eldiven, koruyucu gözlük ve gaz maskesi kullanmalıdır."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Havuz suyu neden yeşile döner ve nasıl kurtarılır?"
      },
      {
        "type": "p",
        "text": "Yüksek pH veya yetersiz klor sebebiyle yosun patlaması oluşur. Önce pH 7.2'ye düşürülür, ardından şok klor ve yosun önleyici verilip filtre 24 saat ters yıkama ile çalıştırılır."
      },
      {
        "type": "h3",
        "text": "Siyanürik asit (stabilizatör) dengesi neden önemlidir?"
      },
      {
        "type": "p",
        "text": "Güneşin UV ışınlarının kloru uçurmasını önler. Ancak 50 ppm üzerine çıktığında \"klor kilitlenmesi\" yaparak klorun mikrop öldürmesini durdurur; bu durumda havuza taze su basılmalıdır."
      },
      {
        "type": "cta",
        "text": "Sitenizin yüzme havuzu kimyasalları ve profesyonel işletme hizmeti için teklif alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Havuz Kimyasalları Teklifi Al"
      }
    ],
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
    "tldr": "İskan alan yeni projelerde müteahhidin atadığı geçici yönetim en geç bağımsız bölümlerin üçte ikisinin fiilen tesliminden itibaren 1 yıl içinde ilk Kat Malikleri Genel Kurulunu toplayarak yönetimi devretmek zorundadır.",
    "content": [
      {
        "type": "p",
        "text": "Yeni tamamlanan konut ve rezidans projelerinde en sancılı süreçlerden biri, müteahhit firma tarafından atanan \"Geçici Yönetim\"den kat maliklerinin kendi bağımsız yönetimine geçiş evresidir. Eksik teslimler, iskan harçları, ortak alan sayaç devirleri ve garanti kapsamındaki teknik kusurlar bu süreçte doğru yönetilmelidir."
      },
      {
        "type": "h2",
        "text": "1. Geçici Yönetimin Yasal Süresi ve KMK Ek Madde 69"
      },
      {
        "type": "p",
        "text": "634 Sayılı Kat Mülkiyeti Kanunu Ek Madde 69 gereğince: Toplu yapılarda geçici yönetim, bağımsız bölümlerin teslim tarihinden itibaren başlar ve en geç yapının tamamlanmasından veya bağımsız bölümlerin 2/3'ünün tesliminden itibaren 1 yıl içinde ilk olağanüstü genel kurulu toplayarak asıl yönetimi seçtirmekle yükümlüdür."
      },
      {
        "type": "h2",
        "text": "2. Müteahhitten Devir Alınması Gereken 7 Kritik Belge ve Tesisat"
      },
      {
        "type": "ul",
        "items": [
          "Mimari, Statik, Mekanik ve Elektrik As-Built Projeleri: Binanın uygulanan son revizyonlu mühendislik paftaları.",
          "Yapı Kullanma İzin Belgesi (İskan) ve Sığınak/İtfaiye Raporları: Ortak alanların yasal uygunluk onayları.",
          "Ortak Alan Elektrik, Su ve Doğalgaz Şantiye Aboneliklerinin Tesis Aboneliğine Dönüştürülmesi.",
          "Müteahhit Firma Garanti Taahhütnameleri: Dış cephe izolasyonu, asansörler, jeneratör ve kazanların 2-5 yıllık garanti belgeleri.",
          "Noter Tasdikli Karar Defteri ve İşletme Defteri: Tüm geçmiş fatura ve makbuz dökümleriyle birlikte teslim.",
          "Ortak Mahaller Anahtar ve Şifre Teslim Tutanağı: Trafo, sığınak, çatı, yangın kontrol odası ve hidrofor dairesi.",
          "Banka Hesap Bakiyeleri ve Toplanan Avansların Devri: Kasa ve banka hesaplarının yeni seçilen kurula aktarımı."
        ]
      },
      {
        "type": "h2",
        "text": "3. İlk Genel Kurul ve Profesyonel Yönetim Şirketine Yetki Devri"
      },
      {
        "type": "p",
        "text": "Kat malikleri ilk toplantıda aralarından bir yönetim kurulu seçebileceği gibi, KMK m.34 uyarınca dışarıdan kurumsal bir profesyonel tesis yönetim şirketini (Alo Yönetim) yetkilendirerek tüm teknik, hukuki ve mali operasyonu uzman ellere teslim edebilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Müteahhit yönetimi devretmek istemezse ne yapılabilir?"
      },
      {
        "type": "p",
        "text": "Kat maliklerinin 1/3'ünün yazılı çağrısıyla Olağanüstü Genel Kurul toplanır ve KMK m.29 uyarınca mevcut geçici yönetim azledilerek yeni yönetim kurulu seçilir."
      },
      {
        "type": "h3",
        "text": "Müteahhidin sattığı dairelerin aidat borcu kime aittir?"
      },
      {
        "type": "p",
        "text": "Henüz satılmamış boş bağımsız bölümlerin aidat ve ortak gider avansları müteahhit firma (inşaat şirketi) tarafından ödenmek zorundadır."
      },
      {
        "type": "cta",
        "text": "Yeni siteniz için sorunsuz devir teslim ve profesyonel yönetim danışmanlığı alın.",
        "href": "/hizmetler/yonetim-danismanligi",
        "label": "Devir Teslim Danışmanlığı İsteyin"
      }
    ]
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
    "content": [
      {
        "type": "p",
        "text": "Konut sitelerinde ve ticari plazalarda profesyonel güvenlik yönetimi; yalnızca fiziki insan gücünden ibaret olmayıp, caydırıcı teknoloji altyapısı, standart operasyon prosedürleri (SOP) ve 7/24 denetim ağının kusursuz entegrasyonudur."
      },
      {
        "type": "h2",
        "text": "1. Güvenlik Yönetiminin 4 Temel Stratejik Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "5188 Lisanslı Fiziki Güvenlik Kadrosu: T.C. İçişleri Bakanlığı onaylı, üniformalı, Alo Güvenlik (guvenlikkursu.com) akreditasyonlu ve adli sicil taramalı uzman personeller.",
          "Elektronik Güvenlik ve AI Video Analizi: Yüksek çözünürlüklü IP CCTV kameralar, yapay zeka sınır ihlal algoritmaları, plaka tanıma sistemi (PTS) ve parmak izi/yüz tanıma turnikeleri.",
          "Perimetre (Çevre) Koruma Kalkanı: Duvar üstü jiletli teller, kızılötesi lazer bariyerler, mikrofonik kablo algılayıcıları ve yüksek lümenli LED çevre aydınlatması.",
          "3G Güvenlik (3gguvenlik.com) Operasyonel Denetimi: 7/24 sahada dolaşan mobil süpervizör ekipleri, anlık telsiz kontrolü ve ani gece tatbikatları."
        ]
      },
      {
        "type": "h2",
        "text": "2. Nizamiye Giriş-Çıkış ve Ziyaretçi Kabul Standartları"
      },
      {
        "type": "ol",
        "items": [
          "Sakin Araçları: PTS kameraları veya RFID etiketler ile beklemesiz otomatik bariyer geçişi.",
          "Misafir ve Kuryeler: Daire sakini interkom veya mobil uygulama üzerinden teyit vermeden yabancı araçların içeri alınmaması.",
          "Kargo ve Paket Kabulü: Kuryelerin blok aralarında kontrolsüz dolaşımını engelleyen lobi akıllı dolap teslimatı.",
          "Taşınma ve Nakliye Yönetimi: Çarşamba ve hafta sonu saat kısıtlamalarına uygun kontrollü taşınma protokolü."
        ]
      },
      {
        "type": "h2",
        "text": "3. Acil Durum Eylem Planları ve Kriz Yönetimi"
      },
      {
        "type": "p",
        "text": "Yangın, deprem, su baskını, sabotaj veya şüpheli paket anında güvenlik ekipleri önceden belirlenen acil tahliye senaryolarını devreye sokar; acil kaçış kapılarını açar ve 112 Acil Çağrı Merkezi ekiplerini sahada yönlendirir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Site yönetimi doğrudan kendi bünyesinde güvenlik görevlisi çalıştırabilir mi?"
      },
      {
        "type": "p",
        "text": "Evet, ancak Valilikten Özel Güvenlik İzni (ÖGİ) almak, SGK ve kıdem tazminatı yüklerini taşımak zorundadır. 3G Güvenlik gibi lisanslı bir şirketle çalışmak tüm hukuki ve operasyonel riskleri devreder."
      },
      {
        "type": "h3",
        "text": "Güvenlik görevlilerinin fazla mesai ve SGK takibi nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Tüm personelin SGK bildirgeleri, maaş bordroları ve devriye raporları her ay şeffaf biçimde site yönetim kuruluna sunulur."
      },
      {
        "type": "cta",
        "text": "Sitenizin güvenlik açıklarını ücretsiz risk analiziyle tespit edin.",
        "href": "/teklif-al",
        "label": "Ücretsiz Güvenlik Keşfi İsteyin"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Modern ticari binalar, plazalar, lojistik merkezleri ve konut siteleri; karmaşık elektro-mekanik altyapıları ve yoğun insan sirkülasyonu ile çok boyutlu bir organizasyon gerektirir. Tesis yönetimi, bu fiziksel varlıkların yaşam döngüsünü uzatan ve sakin memnuniyetini artıran stratejik bir disiplindir."
      },
      {
        "type": "h2",
        "text": "1. Entegre Tesis Yönetiminin 3 Temel Hizmet Boyutu"
      },
      {
        "type": "ul",
        "items": [
          "Hard (Teknik) Tesis Hizmetleri: HVAC iklimlendirme, trafo Y.G. işletme sorumluluğu, jeneratör senkronizasyonu, asansör yeşil etiket takibi ve yangın hidrant hatları bakımı.",
          "Soft (Destek) Hizmetleri: 5188 lisanslı özel güvenlik (3G Güvenlik), endüstriyel hijyen ve ortak alan temizliği, biyosidal haşere ilaçlama ve 4 mevsim peyzaj bakımı.",
          "Mali ve İdari Tesis Hizmetleri: KMK m.37 işletme projesi bütçelemesi, aidat tahsilat otomasyonu, icra takipleri ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Hizmet Seviyesi Anlaşması (SLA) ve Temel Performans Göstergeleri (KPI)"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak sunduğumuz tüm tesis hizmetleri ölçülebilir SLA kriterlerine bağlıdır:"
      },
      {
        "type": "ol",
        "items": [
          "Acil Teknik Arızalara Müdahale Süresi: Maksimum 45 dakika içinde sahada uzman teknisyen.",
          "Güvenlik ve Lobi Nöbet Sürekliliği: %100 vardiya doluluk garantisi ve yedek personel ikamesi.",
          "Aidat Tahsilat Başarı Oranı: Aylık %95 ve üzeri tahsilat performansı.",
          "Sakin Talep Çözüm Süresi: Mobil uygulama üzerinden iletilen taleplere 2 saat içinde ilk geri bildirim."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Tesis yönetimi hizmeti bina maliyetlerini nasıl düşürür?"
      },
      {
        "type": "p",
        "text": "Merkezi satın alma gücü, enerji verimliliği optimizasyonu ve önleyici bakım sayesinde sitenin toplam işletme giderlerinde %20-30 tasarruf sağlanır."
      },
      {
        "type": "h3",
        "text": "Tesis yönetim şirketi nasıl denetlenir?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Denetim Kurulu veya bağımsız denetçiler, banka hesaplarını ve karar defterlerini 3 ayda bir denetleyerek rapor hazırlar."
      },
      {
        "type": "cta",
        "text": "Tesisiniz için uluslararası standartlarda entegre yönetim teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Tesis Yönetim Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Toplu yaşam alanlarında temizlik, yalnızca yerlerin süpürülmesinden ibaret değildir. Asansör kabinleri, kapı kolları, merdiven korkulukları ve çöp toplama odaları gibi yoğun temas noktalarında patojen ve bakteri yayılımını engelleyen bilimsel hijyen protokolleri uygulanmalıdır."
      },
      {
        "type": "h2",
        "text": "1. Çapraz Bulaşmayı Önleyen Renk Kodlu Temizlik Sistemi"
      },
      {
        "type": "ul",
        "items": [
          "Kırmızı Bez ve Moplar: Yalnızca tuvalet, pisuvar ve klozet alanlarında kullanılır.",
          "Sarı Bez ve Moplar: Lavabolar, banyo fayansları ve ayna yüzeyleri için ayrılmıştır.",
          "Mavi Bez ve Moplar: Ofis masaları, lobi mobilyaları ve cam yüzeylerin temizliğinde kullanılır.",
          "Yeşil Bez ve Moplar: Yemekhane, mutfak ve dinlenme alanları hijyeni için tahsis edilir."
        ]
      },
      {
        "type": "h2",
        "text": "2. Periyodik Zemin ve Ortak Alan Bakım Takvimi"
      },
      {
        "type": "ol",
        "items": [
          "Günlük: Blok giriş lobileri, asansörler, posta kutuları ve ana yürüyüş yollarının temizliği, kat çöplerinin toplanması.",
          "Haftalık: Yangın merdivenlerinin yıkanması, sığınak havalandırması, cam korkulukların silinmesi.",
          "Aylık: Kapalı otopark zeminlerinin kombine zemin yıkama otomatları ile yıkanması ve su kanallarının temizliği.",
          "6 Aylık: Mermer ve traverten zeminlere kristalize cila uygulaması, çöp şutu borularının yüksek basınçla dezenfeksiyonu."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Temizlik personeli özlük hakları ve SGK takibi nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Tüm temizlik kadromuzun SGK bildirgeleri, İSG eğitim sertifikaları ve sağlık muayene kartları her ay site yönetimine teslim edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları çevreye ve evcil hayvanlara zararlı mıdır?"
      },
      {
        "type": "p",
        "text": "Hayır, tüm ürünler TSE ve Sağlık Bakanlığı onaylı, biyolojik olarak parçalanabilir çevre dostu formülasyonlardır."
      },
      {
        "type": "cta",
        "text": "Siteniz için profesyonel temizlik ve hijyen hizmeti teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Binaların elektro-mekanik tesisatları, bir canlının dolaşım ve sinir sistemi gibidir. Elektrik trafoları, kompanzasyon panoları, kazan daireleri, hidroforlar, jeneratörler ve asansörler düzenli muayene edilmediğinde ani sistem çökmelerine, yangınlara ve yüz binlerce liralık amortisman kayıplarına yol açar."
      },
      {
        "type": "h2",
        "text": "1. Yıllık Periyodik Teknik Bakım Takvimi ve Sorumluluk Matrisi"
      },
      {
        "type": "ul",
        "items": [
          "Aylık Rutin Bakımlar: Asansör yetkili servis revizyonları, hidrofor basınç şalterleri, yangın ihbar buton ve duman dedektörü testleri.",
          "3 Aylık Bakımlar: Chiller gaz basınçları, klima santralleri filtre değişimleri, kompanzasyon pano kondansatör ölçümleri.",
          "6 Aylık Bakımlar: Doğalgaz brülör baca gazı emisyon testleri, pis su dalgıç pompa mekanik temizliği, jeneratör akü yük testleri.",
          "Yıllık Yasal Bakımlar: Trafo yağı izolasyon ve dielektrik testi, paratoner topraklama geçiş direnci ölçümü, A Tipi MMO asansör yeşil etiket muayenesi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ile Yangın ve Arıza Önleme"
      },
      {
        "type": "p",
        "text": "Termal kamera ile yapılan periyodik elektrik pano taramaları sayesinde, aşırı akım veya gevşek klemens bağlantısı nedeniyle ısınan hatlar arıza ve yangın çıkarmadan önce tespit edilip tork anahtarıyla sıkılır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Teknik Servis ve SLA Güvencesi"
      },
      {
        "type": "p",
        "text": "Alo Yönetim teknik servis ağı; asansör mahsur kalması, elektrik panosu patlaması veya hidrofor durması gibi acil senaryolarda 45 dakika içinde sahaya ulaşarak kesintisiz yaşam konforunu garanti altına alır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Teknik bakım sözleşmesi siteye ne kadar maliyet tasarrufu sağlar?"
      },
      {
        "type": "p",
        "text": "Reaktif elektrik cezalarının sıfırlanması, kazan verimliliği ve arıza önleyici bakım sayesinde sitenin ortak işletme bütçesinde yıllık %25-35 oranında net tasarruf sağlanır."
      },
      {
        "type": "h3",
        "text": "Asansör yeşil etiket sorumluluğu kime aittir?"
      },
      {
        "type": "p",
        "text": "Kat Mülkiyeti Kanunu uyarınca asansörün yıllık A Tipi muayenesini yaptırmak ve yeşil etiketi almak site yöneticisinin yasal sorumluluğundadır."
      },
      {
        "type": "cta",
        "text": "Tesisiniz için 7/24 garantili teknik bakım ve mekanik işletme teklifi alın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Teknik Bakım Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Toplu konut projelerinde ve rezidanslarda yeşil alanlar, sakinlerin şehir stresinden uzaklaştığı en değerli ortak yaşam alanlarıdır. Bakımsız, kurumuş çimler veya budanmamış ağaçlar site prestijini düşürürken; ziraat mühendisleri kontrolünde yönetilen peyzaj alanları sitenin gayrimenkul değerini %20 artırır."
      },
      {
        "type": "h2",
        "text": "1. 4 Mevsim Profesyonel Peyzaj Bakım Programı"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar: Çim alanların dikey bıçaklı havalandırılması (verticut), yosun temizliği, ara ekim tohum takviyesi, 15-15-15 kompoze gübreleme ve mevsimlik çiçek dikimi.",
          "Yaz: Akıllı otomatik sulama saatlerinin buharlaşmanın az olduğu gece saatlerine ayarlanması, haftalık düzenli çim biçimi ve mantar/kurt hastalıklarına karşı zirai ilaçlama.",
          "Sonbahar: Ağaç ve çalı form budamaları, kuru yaprakların toplanması, çim köklerini güçlendirici fosfor/potasyum ağırlıklı kış gübrelemesi.",
          "Kış: Don koruma örtüleri, rüzgardan devrilme riski olan yaşlı ağaçların tespit edilerek budanması ve budama yaralarına aşı macunu sürülmesi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Akıllı Otomatik Sulama Sistemleri ve %40 Su Tasarrufu"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü ve meteoroloji istasyonu entegreli akıllı sulama otomasyonu, yağmurlu günlerde sulamayı durdurarak ve nozul debilerini optimize ederek sitenin ortak su faturasında %40 net tasarruf sağlar."
      },
      {
        "type": "h2",
        "text": "3. Zirai Mücadele ve Çevre Sağlığı Standartları"
      },
      {
        "type": "p",
        "text": "Kullanılan tüm gübreler ve bitki koruma ürünleri T.C. Tarım ve Orman Bakanlığı ruhsatlı olup; çocukların ve evcil hayvanların oyun alanlarında biyolojik çevre dostu çözümler uygulanır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Site bahçesinde çimler neden sararır ve kurur?"
      },
      {
        "type": "p",
        "text": "En sık nedenler aşırı/yetersiz sulama, mantar hastalığı (fusarium), toprak sıkışması veya yanlış biçim yüksekliğidir. Toprak analizi sonrası uygun tedavi uygulanır."
      },
      {
        "type": "h3",
        "text": "Ağaç budama dönemleri ne zamandır?"
      },
      {
        "type": "p",
        "text": "Yaprak döken ağaçlar için en uygun derin budama dönemi bitkinin uyku evresinde olduğu Kasım - Şubat ayları arasıdır."
      },
      {
        "type": "cta",
        "text": "Siteniz için ziraat mühendisi denetimli peyzaj bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Peyzaj Hizmetlerimizi İnceleyin"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sitelerdeki yüzme havuzları, yaz aylarında çocukların ve yetişkinlerin en yoğun sosyalleştiği alanlardır. Ancak yetersiz klorlama veya hatalı pH seviyeleri; mantar, kulak enfeksiyonları, konjonktivit ve ölümcül Lejyoner bakterisi risklerine yol açabilir."
      },
      {
        "type": "h2",
        "text": "1. Günlük Yasal Havuz Parametreleri (Sağlık Bakanlığı Standartları)"
      },
      {
        "type": "ul",
        "items": [
          "Serbest Klor (Açık Havuz): 1.0 - 3.0 ppm (mg/lt) aralığında tutulmalıdır.",
          "Serbest Klor (Kapalı Havuz): 1.0 - 1.5 ppm (mg/lt) aralığında tutulmalıdır.",
          "pH Değeri: 7.2 - 7.6 ideal aralığında olmalıdır. Yüksek pH klorun mikrop öldürücü gücünü yok eder.",
          "Siyanürik Asit (Stabilizatör): Açık havuzlarda maksimum 50 ppm seviyesinde tutulmalıdır.",
          "Bağlı Klor (Kloramin): Maksimum 0.2 ppm olmalıdır; üzeri klor kokusu ve tahriş nedenidir."
        ]
      },
      {
        "type": "h2",
        "text": "2. Filtrasyon, Ters Yıkama ve Dip Süpürme Protokolü"
      },
      {
        "type": "ol",
        "items": [
          "Kum Filtresi Ters Yıkama (Backwash): Haftada en az 2 kez filtrenin ters çalıştırılarak biriken organik tortunun kanala atılması.",
          "Durulama (Rinse): Ters yıkama sonrası kum yatağının oturtulması için 1 dakika durulama yapılması.",
          "Dip Süpürgesi ve Havuz Robotu: Her sabah açılış öncesi tabana çöken partiküllerin otomatik robotlarla temizlenmesi.",
          "Savak Kanalı ve Denge Tankı Temizliği: Savak ızgaralarının dezenfeksiyonu ve denge tankı dip çamurunun tahliyesi."
        ]
      },
      {
        "type": "h2",
        "text": "3. Akredite Laboratuvar Mikrobiyolojik Testleri"
      },
      {
        "type": "p",
        "text": "Ayda bir kez Sağlık Bakanlığı onaylı halk sağlığı laboratuvarlarına numune verilerek E.Coli, Toplam Koliform, Pseudomonas Aeruginosa ve Koloni Sayımı analizleri yaptırılır ve sonuçlar havuz panosuna asılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Havuz operatörü bulundurmak zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" uyarınca havuz işleten sitelerde sertifikalı havuz operatörü zorunludur."
      },
      {
        "type": "h3",
        "text": "Kapalı havuzlarda nem ve koku nasıl önlenir?"
      },
      {
        "type": "p",
        "text": "Havuz nem alma santrali (dehumidifier) bağıl nemi %50-60 seviyesinde tutmalı ve taze hava beslemesi sağlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Sitenizin havuz bakımı için sertifikalı operatör ve hijyen danışmanlığı alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Havuz Bakım Hizmetlerimiz"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Apartman boşlukları, çöp şutları, sığınaklar, hidrofor odaları ve kapalı otoparklar haşere ve kemirgenlerin hızla üremesi için uygun ortamlardır. Bireysel daire ilaçlamaları haşereleri yalnızca komşu daireye kaçırır; kalıcı çözüm sitenin tüm ortak alanlarının entegre vektör mücadelesiyle ilaçlanmasıdır."
      },
      {
        "type": "h2",
        "text": "1. Profesyonel İlaçlama ve Dezenfeksiyon Yöntemleri"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Mutfak, banyo ve elektrik panolarında hazırlık gerektirmeden uygulanan, zincirleme etkiyle koloniyi yok eden sistem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark, kazan dairesi ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm yarıklara nüfuz eden uygulama.",
          "Kilitli Kemirgen Yem İstasyonları: Çocukların ve evcil hayvanların ulaşamayacağı emniyetli kutularda mum blok antikoagülan yemleme.",
          "Larvasit Uygulaması: Rögar kapakları, foseptik çukurları ve durgun su birikintilerinde sivrisinek larvalarının üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Sağlık Bakanlığı Biyosidal Ürünler Yönetmeliği Uyumu"
      },
      {
        "type": "p",
        "text": "Kullanılan tüm kimyasallar Dünya Sağlık Örgütü (WHO) standartlarında ve Sağlık Bakanlığı Biyosidal Ürün Ruhsatnamesine sahip olmalıdır. İlaçlama sonrası site yönetimine Ek-1 Biyosidal Ürün Uygulama Belgesi teslim edilir."
      },
      {
        "type": "h2",
        "text": "3. Çöp Şutu ve Ortak Alan Ozonlama Hijyeni"
      },
      {
        "type": "p",
        "text": "Toplu konutlarda koku ve bakteri kaynağı olan çöp toplama odaları ve şut boruları yüksek basınçlı sıcak suyla yıkanır ve ozon jeneratörleri ile sterilize edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "İlaçlama sırasında evi terk etmek gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi terk etmeye veya eşyaları toplamaya gerek yoktur; ULV sisleme yapılan alanlar ise 2 saat kapalı tutulup havalandırılmalıdır."
      },
      {
        "type": "h3",
        "text": "Toplu konutlarda ilaçlama ne sıklıkla yapılmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre ilaçlaması ilkbahar-sonbahar dönemlerinde ayda 1, kapalı alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Siteniz için periyodik biyosidal haşere ilaçlama ve dezenfeksiyon programı başlatın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Dezenfeksiyon Hizmetimiz"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Toplu yapı ve site yönetimleri; Kat Mülkiyeti Kanunu, İş Kanunu, Türk Borçlar Kanunu, İcra ve İflas Kanunu ve İSG Kanunu gibi çok sayıda karmaşık mevzuatla iç içedir. Hukuki altyapısı olmadan alınan kararlar, tebliğ edilmemiş bütçeler veya hatalı personel fesihleri site bütçelerine yüz binlerce liralık dava ve tazminat faturaları çıkarır."
      },
      {
        "type": "h2",
        "text": "Site Yönetimlerinde Karşılaşılan 4 Büyük Hukuki Risk"
      },
      {
        "type": "ul",
        "items": [
          "Genel Kurul Kararlarının İptali Davaları: Usulüne uygun çağrı yapılmayan toplantı kararları mahkemece iptal edilir.",
          "İşletme Projesinin İptali ve Aidatların Tahsil Edilememesi: Tebligatsız bütçeler kesinleşmez, açılan icra takipleri düşer.",
          "Kapıcı ve Güvenlik Kıdem Tazminatı Davaları: Fazla mesai ve bordro eksiklikleri yüzünden yüklü işçi tazminatları doğar.",
          "Ortak Alan İhlalleri ve Müdahalenin Men'i Davaları: Otopark gaspı, kaçak eklenti ve sığınak işgalleri komşuluk krizine dönüşür."
        ]
      },
      {
        "type": "h2",
        "text": "Kurumsal Hukuk ve İcra Danışmanlığı Kapsamı"
      },
      {
        "type": "p",
        "text": "Alo Yönetim bünyesindeki uzman gayrimenkul hukukçuları ve icra departmanımız sitenizi korur:"
      },
      {
        "type": "ol",
        "items": [
          "Hızlı İcra Takibi: Gününde ödenmeyen aidatlar için anında %5 gecikme tazminatlı ilamsız takip açılır.",
          "Yönetim Planı Revizyonu: Sitenin tapu anayasası KMK m.28 uyarınca güncellenir ve tapuya tescil edilir.",
          "Genel Kurul Divan Yönetimi: Çağrı mektupları, vekaletname kontrolleri ve hazirun cetvelleri mevzuata tam uyumlu yönetilir.",
          "Sözleşme Hukuku: Taşeron firmalarla yapılan güvenlik, temizlik ve asansör sözleşmelerine cezai şartlar eklenir."
        ]
      },
      {
        "type": "h2",
        "text": "Personel İhtilaflarında Arabuluculuk ve İş Mahkemesi Güvencesi"
      },
      {
        "type": "p",
        "text": "Kapıcı ve temizlik personeli işten ayrılırken ibraname, kıdem/ihbar bordroları ve yıllık izin mutabakatları noter ve arabulucu huzurunda tanzim edilerek sitenin sonradan tazminat davasına maruz kalması engellenir."
      },
      {
        "type": "h2",
        "text": "Sulh Hukuk Mahkemelerinde Hakimin Müdahalesi (KMK m.33)"
      },
      {
        "type": "p",
        "text": "Ortak yerlere izinsiz klima motoru takılması, sığınağın depoya dönüştürülmesi veya gürültü ihlallerinde mahkemeden Hakimin Müdahalesi ve eski hale getirme kararı alınır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Site avukatı tutmak için genel kurul kararı şart mıdır?\nCevap: KMK m.35 uyarınca yönetici, ortak gider alacaklarının tahsili için avukata vekalet verebilir; ancak genel danışmanlık bütçesi için Genel Kurul onayının bulunması tavsiye edilir."
      },
      {
        "type": "p",
        "text": "Soru: Genel kurul kararına karşı dava açma süresi ne kadardır?\nCevap: Toplantıya katılıp aykırı oy kullananlar için karar tarihinden itibaren 1 ay; toplantıya katılmayanlar için ise kararı öğrendikten itibaren 1 ay (ve her halükarda 6 ay) içinde Sulh Hukuk Mahkemesinde iptal davası açılmalıdır."
      },
      {
        "type": "cta",
        "text": "Siteniz için profesyonel hukuk ve icra danışmanlığı başlatın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Hukuk Hizmetimizi İnceleyin"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Toplu konutlarda aidatını düzenli ödemeyen sakinler, sitenin güvenlik, temizlik, yakıt ve elektrik hizmetlerinin aksamasına yol açar. Kat Mülkiyeti Kanunu (KMK) bu mağduriyeti önlemek için yöneticiye güçlü yasal yetkiler ve caydırıcı gecikme tazminatları tanımıştır."
      },
      {
        "type": "h2",
        "text": "1. KMK Madde 20 Kapsamında Aylık %5 Yasal Gecikme Tazminatı"
      },
      {
        "type": "p",
        "text": "634 Sayılı Kanun Madde 20/c bendi uyarınca: \"Gider veya avans payını ödemeyen kat maliki hakkında, diğer kat maliklerinden her biri veya yönetici tarafından, yönetim planına, bu Kanuna ve genel hükümlere göre dava açılabilir, icra takibi yapılabilir. Gider ve avans payının tamamını ödemeyen kat maliki ödemede geciktiği günler için aylık yüzde beş hesabıyla gecikme tazminatı ödemekle yükümlüdür.\""
      },
      {
        "type": "h2",
        "text": "2. Ödenmeyen Aidat Borcunda 4 Kademeli Tahsilat Prosedürü"
      },
      {
        "type": "ol",
        "items": [
          "1. Adım - Dijital Hatırlatma (1-5 Gün Gecikme): Sakine SMS, e-posta ve mobil bildirim ile borç hatırlatması iletilir.",
          "2. Adım - İdari Arama ve Mutabakat (10-15 Gün Gecikme): Muhasebe departmanı sakinle görüşerek ödeme taahhüdü alır.",
          "3. Adım - Noter İhtarnamesi veya Avukat Mektubu (30 Gün Gecikme): Borcun 7 gün içinde ödenmesi, aksi halde icra açılacağı ihtar edilir.",
          "4. Adım - İlamsız İcra Takibi (Örnek No: 7): UYAP üzerinden icra müdürlüğü aracılığıyla ödeme emri gönderilir."
        ]
      },
      {
        "type": "h2",
        "text": "3. İtiraz Halinde %20 İcra İnkar Tazminatı"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız yere icra takibine itiraz etmesi durumunda, İcra Mahkemesi veya Sulh Hukuk Mahkemesi'nde açılan \"İtirazın İptali\" davasında borçlu, asıl alacak ve gecikme tazminatına ek olarak %20 icra inkar tazminatı ve tüm avukatlık vekalet ücretlerini ödemeye mahkum edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kiracının ödemediği aidatı ev sahibi ödemek zorunda mıdır?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 gereğince kat maliki ile kiracı müteselsilen sorumludur. Yönetim icra takibini doğrudan ev sahibine veya kiracıya yöneltebilir."
      },
      {
        "type": "h3",
        "text": "Aidat borcu olan sakinin bina ortak alanlarını kullanımı engellenebilir mi?"
      },
      {
        "type": "p",
        "text": "Yargıtay içtihatlarına göre asansör kartının iptali veya suyunun kesilmesi suç teşkil edebilir; tahsilat yalnızca yasal icra yoluyla yapılmalıdır."
      },
      {
        "type": "cta",
        "text": "Sitenizin aidat alacaklarını tahsil etmek için uzman hukuk ekibimizden destek alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Hukuk ve İcra Danışmanlığı Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ataşehir, Anadolu Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "İstanbul Finans Merkezi (İFM) kulelerinde çoklu x-ray ve biyometrik turnike geçişleri",
          "Batı Ataşehir lüks rezidanslarında çift bariyerli yüksek hızlı Plaka Tanıma Sistemi (PTS)",
          "Kadıköy merkezli Alo Güvenlik (guvenlikkursu.com) üssünden 15 dakikada hızlı nöbetçi personel takviyesi",
          "3G Güvenlik 7/24 mobil süpervizör araçlarıyla periyodik gece denetimleri ve telsiz koordinasyonu"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Ataşehir bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ataşehir'deki plazalarda güvenlik personeli seçimi nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Tüm personel Alo Güvenlik akreditasyonlu, 5188 kimlikli, VIP protokol karşılama ve yabancı dil eğitimine sahip profesyonellerden seçilir."
      },
      {
        "type": "h3",
        "text": "Nizamiye PTS sistemi site sakinlerine nasıl entegre edilir?"
      },
      {
        "type": "p",
        "text": "Sakin araç plakaları Alo Yönetim mobil yazılımına tanımlanır ve bariyerler 0.3 saniyede otomatik açılarak araç kuyruğunu engeller."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Ataşehir Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ataşehir'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Ataşehir İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ataşehir'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Ataşehir Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ataşehir'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Ataşehir Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Ataşehir projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ataşehir'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Ataşehir Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Finans kulelerinde EMO onaylı Yüksek Gerilim (Y.G.) Trafo İşletme Sorumluluğu ve yağ izolasyon testleri",
          "Kompanzasyon panolarının telemetri ile uzaktan izlenerek reaktif elektrik cezalarının sıfırlanması",
          "BMS (Bina Yönetim Sistemi) üzerinden Chiller ve VRF klima santrallerinin çalışma saatlerine göre optimizasyonu",
          "Dizel jeneratörlerin haftalık otomatik yük transfer testleri ve akü empedans ölçümleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Ataşehir bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ataşehir'de yüksek katlı plazalarda asansör yeşil etiket süreci nasıl yürütülür?"
      },
      {
        "type": "p",
        "text": "A Tipi Akredite Muayene Kuruluşu (MMO) yıllık denetimleri öncesinde mühendislerimiz 87 maddelik revizyonu tamamlayarak kesintisiz yeşil etiket sağlar."
      },
      {
        "type": "h3",
        "text": "Trafo işletme sorumluluğu zorunlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, 1 kV ve üzeri elektrik trafosuna sahip tüm ticari plazalarda EMO tescilli elektrik mühendisi bulundurmak yasal zorunluluktur."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Ataşehir Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Ataşehir projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ataşehir'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Ataşehir Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ataşehir (Anadolu Yakası), İstanbul Finans Merkezi ve Batı Ataşehir kuleleri ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Ataşehir sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Ataşehir bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ataşehir'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Ataşehir'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Ataşehir Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bakırköy, Avrupa Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Ataköy ve Florya sahil sitelerinde deniz bandı perimetre çiti lazer ışın bariyerleri",
          "Yeşilköy ve Yeşilyurt villa sitelerinde 3G Güvenlik mobil devriye araçları ile saatlik ring kontrolleri",
          "Mega sahil konutlarında misafir araçlarının UYAP ve Emniyet asayiş entegrasyonlu dijital kaydı",
          "Açık yüzme havuzu ve sosyal tesis alanlarında yabancı girişini engelleyen kartlı turnike güvenliği"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Bakırköy bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Bakırköy sahil sitelerinde çevre güvenliği nasıl sağlanır?"
      },
      {
        "type": "p",
        "text": "Sahil yürüyüş yoluna cepheli sitelerde jiletli tel üzeri darbe algılayıcı sensörler ve gece görüşlü termal IP kameralar kullanılır."
      },
      {
        "type": "h3",
        "text": "Florya villalarında güvenlik devriyesi nasıl takip edilir?"
      },
      {
        "type": "p",
        "text": "Devriye personeli RFID kontrol noktalarını saat başı okutur ve veriler anlık olarak yönetim paneline telemetri ile düşer."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Bakırköy Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Bakırköy'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Bakırköy İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Bakırköy'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Bakırköy Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Bakırköy'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Bakırköy Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Bakırköy projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Bakırköy'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Bakırköy Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Marmara Denizi tuz ve nem korozyonuna karşı Chiller serpantinlerinin korozyon önleyici özel kimyasallarla yıkanması",
          "Sahil binalarında asansör taşıyıcı halatlarının ve raylarının manyetik korozyon tarama testleri",
          "Paslanmaz çelik su depoları ve hidrofor terfi pompalarının kavitasyon ve salmastra bakımları",
          "Elektrik panolarında tuz buharı ark riskine karşı termal kamera ile klemens sıkılık kontrolleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Bakırköy bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Deniz kenarındaki binalarda klima bakımı ne sıklıkla yapılmalıdır?"
      },
      {
        "type": "p",
        "text": "Dış ünite serpantinleri tuz birikiminden dolayı her 3 ayda bir koruyucu kaplama ile yıkanmalıdır."
      },
      {
        "type": "h3",
        "text": "Bodrum katlarda su basma riski nasıl önlenir?"
      },
      {
        "type": "p",
        "text": "Çift flatörlü yedekli dalgıç drenaj pompaları her ay otomatik su basma testine tabi tutulur."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Bakırköy Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Bakırköy projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Bakırköy'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Bakırköy Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bakırköy (Avrupa Yakası), Ataköy sahil bandı ve Florya villaları ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Bakırköy sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Bakırköy bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Bakırköy'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Bakırköy'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Bakırköy Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Başakşehir, Avrupa Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Kayaşehir ve Bahçeşehir mega sitelerinde 4-5 farklı nizamiye kapısının IP telsiz ağıyla merkezi senkronizasyonu",
          "Geniş park, gölet ve çocuk oyun alanlarında yaya ve bisikletli özel güvenlik devriyeleri",
          "Kurye ve nakliye araçlarının girişinde daire sakinine SMS ile tek kullanımlık onay kodu gönderimi",
          "Kapalı otopark blok altlarında RFID tur kalemi ile 24 saat kesintisiz devriye disiplini"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Başakşehir bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Başakşehir'deki 1000+ konutlu sitelerde güvenlik nasıl organize edilir?"
      },
      {
        "type": "p",
        "text": "Ana komuta merkezinden izlenen 200+ kamera ve çoklu nizamiye ekipleri ile vardiyalı 5188 kadrosu yönetilir."
      },
      {
        "type": "h3",
        "text": "Bahçeşehir'deki sitelerde kargo güvenliği nasıl çözülür?"
      },
      {
        "type": "p",
        "text": "Lobi akıllı kargo istasyonları ile kuryelerin blok aralarında kontrolsüz dolaşımı sınırlandırılır."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Başakşehir Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Başakşehir'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Başakşehir İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Başakşehir'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Başakşehir Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Başakşehir'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Başakşehir Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Başakşehir projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Başakşehir'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Başakşehir Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Kaskad doğalgaz kazan dairelerinde baca gazı analizleri ile %15-20 yakıt tasarrufu sağlanması",
          "Çevre ve Şehircilik Bakanlığı lisanslı yazılımla adil ve şeffaf merkezi ısı pay ölçer endeks okuması",
          "Mega sitelerde yüksek hidrofor basma yüksekliği (MSS) kalibrasyonu ile her kata eşit su basıncı",
          "Merkezi yangın algılama santrallerinde duman damperleri ve basınçlandırma fanlarının haftalık testi"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Başakşehir bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Merkezi ısıtmalı binalarda ısı pay ölçer dağıtımı nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "KMK m.42 ve Enerji Verimliliği Kanunu uyarınca %70 tüketim + %30 asgari ortak alan formülüyle hesaplanır."
      },
      {
        "type": "h3",
        "text": "Kazan dairesi bakımları kış öncesi ne zaman yapılmalıdır?"
      },
      {
        "type": "p",
        "text": "Eylül-Ekim aylarında brülör meme ayarları, genleşme tankı gaz basıncı ve sirkülasyon pompaları test edilmelidir."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Başakşehir Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Başakşehir projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Başakşehir'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Başakşehir Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Başakşehir (Avrupa Yakası), Kayaşehir ve Bahçeşehir mega toplu konutları ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Başakşehir sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Başakşehir bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Başakşehir'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Başakşehir'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Başakşehir Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş, Avrupa Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Levent, Etiler ve Bebek rezidanslarında İngilizce bilen VIP karşılama ve concierge entegre güvenlik",
          "Biyometrik yüz tanıma ve akıllı kartlı turnikeler ile yetkisiz katlara erişimin engellenmesi",
          "Konsolosluk ve şirket genel merkezleri çevresinde üst düzey gizlilik ve KVKK uyumlu kamera kaydı",
          "Vale ve lüks araç kapalı otopark girişlerinde hassas yönlendirme ve park disiplini protokolleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Beşiktaş bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beşiktaş'taki lüks rezidanslarda güvenlik görevlisi standartları nelerdir?"
      },
      {
        "type": "p",
        "text": "Alo Güvenlik VIP koruma, protokol görgüsü, kriz iletişimi ve ileri ilk yardım eğitimli personeller görev alır."
      },
      {
        "type": "h3",
        "text": "Ticari plazalarda ziyaretçi kaydı nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Karekodlu dijital ziyaretçi yazılımı ile kimlik bırakmadan temassız ve KVKK uyumlu geçiş sağlanır."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Beşiktaş Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beşiktaş'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Beşiktaş İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beşiktaş'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Beşiktaş Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beşiktaş'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Beşiktaş Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Beşiktaş projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beşiktaş'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Beşiktaş Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "BMS (Bina Otomasyon Sistemi) ile VRF/Chiller iklimlendirme ve taze hava debisi optimizasyonu",
          "Yüksek hızlı kule asansörlerinde manyetik halat muayenesi ve A Tipi MMO yeşil etiket sürekliliği",
          "Yangın sprinkler sistemleri ve duman tahliye şaftlarının otomatik senaryo testleri",
          "Fan-coil ünitelerinde antibakteriyel filtre dezenfeksiyonu ile iç ortam hava kalitesinin korunması"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Beşiktaş bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Plazalarda iklimlendirme arızalarında müdahale süresi nedir?"
      },
      {
        "type": "p",
        "text": "Beşiktaş bölgesinde konuşlu teknik ekiplerimiz kritik iklimlendirme arızalarına maksimum 30 dakikada müdahale eder."
      },
      {
        "type": "h3",
        "text": "Chiller soğutma kulelerinde lejyoner bakterisi nasıl önlenir?"
      },
      {
        "type": "p",
        "text": "Kule sularına periyodik biyosidal klorlama ve 6 ayda bir akredite laboratuvar numune testleri uygulanır."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Beşiktaş Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Beşiktaş projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beşiktaş'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Beşiktaş Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş (Avrupa Yakası), Levent plazaları, Etiler ve Bebek rezidansları ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Beşiktaş sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Beşiktaş bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beşiktaş'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Beşiktaş'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Beşiktaş Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü, Avrupa Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Yakuplu, Adnan Kahveci ve Beykent sitelerinde kozmopolit sakin yapısına uygun çok dilli güvenlik iletişimi",
          "Geniş parsel çevre duvarlarında kızılötesi projektörler ve kör nokta bırakmayan IP kamera ağı",
          "Karekodlu misafir davet sistemi ile nizamiyede beklemesiz hızlı geçiş otomasyonu",
          "3G Güvenlik mobil araçlarıyla gece otopark ve çevre sokak koordinasyonlu devriye desteği"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Beylikdüzü bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beylikdüzü sitelerinde yabancı uyruklu misafir kaydı nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "1774 Sayılı Kimlik Bildirme Kanunu'na tam uyumlu biçimde dijital pasaport/kimlik kaydı oluşturulur."
      },
      {
        "type": "h3",
        "text": "Geniş sitelerde gece güvenliği nasıl sağlanır?"
      },
      {
        "type": "p",
        "text": "Saat başı RFID tur kontrol noktaları taranır ve şüpheli hareketlerde anlık 3G Güvenlik süpervizörü yönlendirilir."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Beylikdüzü Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beylikdüzü'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Beylikdüzü İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beylikdüzü'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Beylikdüzü Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beylikdüzü'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Beylikdüzü Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Beylikdüzü projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beylikdüzü'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Beylikdüzü Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Beylikdüzü'nün yüksek rüzgar ve fırtına şartlarına dayanıklı çatı izolasyonu ve yağmur iniş boruları bakımı",
          "Çift pompalı frekans invertörlü hidrofor sistemleri ile üst katlarda su basıncı dalgalanmalarının önlenmesi",
          "Dış cephe kompozit ve cam panellerinin rüzgar kaynaklı gevşemelerine karşı periyodik mekanik kontrol",
          "Jeneratör kışlık ısıtıcı ve akü şarj ünitelerinin fırtınalı havalara karşı 7/24 hazır tutulması"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Beylikdüzü bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Fırtınalı havalarda çatı su sızıntıları nasıl engellenir?"
      },
      {
        "type": "p",
        "text": "Sonbaharda çatı gider süzgeçleri temizlenir ve membran derzleri polimer mastiklerle güçlendirilir."
      },
      {
        "type": "h3",
        "text": "Yüksek katlı bloklarda hidrofor arızası nasıl önlenir?"
      },
      {
        "type": "p",
        "text": "Yedekli pompa rotasyon sistemiyle motorların eşit aşınması sağlanır ve basınç şalterleri test edilir."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Beylikdüzü Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Beylikdüzü projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beylikdüzü'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Beylikdüzü Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü (Avrupa Yakası), Yakuplu, Adnan Kahveci ve Beykent geniş parsel siteleri ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Beylikdüzü sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Beylikdüzü bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Beylikdüzü'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Beylikdüzü'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Beylikdüzü Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kat Mülkiyeti Kanunu, Türk Borçlar Kanunu, İş Kanunu ve İcra İflas Kanunu ile kesişen site yönetimi süreçleri; yüksek hukuki bilgi ve uzmanlık gerektirir. Hatalı çağrı yapılan genel kurullar veya usulsüz hazırlanan işletme projeleri mahkemelerce iptal edilerek siteyi kaosa sürükleyebilir."
      },
      {
        "type": "h2",
        "text": "1. Hukuk Departmanımızın 4 Temel Faaliyet Alanı"
      },
      {
        "type": "ul",
        "items": [
          "İcra ve Tahsilat Takibi: Vadesi geçen aidat ve demirbaş alacaklarının UYAP üzerinden ilamsız veya ilamlı icra takipleriyle tahsili.",
          "Genel Kurul Divan ve Hukuki Süreç Yönetimi: Çağrı mektupları, vekaletnameler, hazirun cetveli ve karar defterinin KMK m.29-32'ye tam uyumlu tanzimi.",
          "İş Hukuku ve Personel Sözleşmeleri: Kapıcı, temizlik ve teknik personelin iş sözleşmeleri, fazla mesai, yıllık izin ve kıdem tazminatı ihtilaflarının çözümü.",
          "Yönetim Planı Tadilatı ve Tapu Tescili: KMK m.28 uyarınca 4/5 oy çokluğu ile yönetim planının güncel mevzuata göre revize edilmesi."
        ]
      },
      {
        "type": "h2",
        "text": "2. İİK Madde 68/b: İşletme Projesinin İlam Hükmünde Olması"
      },
      {
        "type": "p",
        "text": "Kesinleşmiş işletme projeleri ve kat malikleri kurulu kararları, İcra ve İflas Kanunu Madde 68/1 anlamında borç ikrarını içeren resmi belge niteliğindedir. Bu sayede itirazlar İcra Hukuk Mahkemesi'nde hızla kaldırılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Genel kurul kararları ne kadar sürede iptal edilebilir?"
      },
      {
        "type": "p",
        "text": "Toplantıya katılıp muhalif kalanlar 1 ay içinde, toplantıya katılmayanlar ise kararı öğrendikten sonra 1 ay ve her halükarda 6 ay içinde Sulh Hukuk Mahkemesi'nde iptal davası açabilir."
      },
      {
        "type": "h3",
        "text": "Yönetici aidat borçlusu hakkında kendi adına icra takibi yapabilir mi?"
      },
      {
        "type": "p",
        "text": "Yönetici kat malikleri kurulunu temsilen tüzel kişilik benzeri yetkiyle doğrudan vekil sıfatıyla icra takibi açabilir."
      },
      {
        "type": "cta",
        "text": "Siteniz için kurumsal hukuk ve icra danışmanlığı sözleşmesi başlatın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Hukuk Danışmanlığı Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kat Mülkiyeti Kanunu'na göre yönetilen tüm bina ve sitelerde aidat toplayabilmenin ve yasal takip yapabilmenin birinci şartı usulüne uygun hazırlanmış bir \"İşletme Projesi\"dir. Kat Malikleri Kurulu tarafından kabul edilmiş bir bütçe yoksa, yönetici gecikmeksizin bir işletme projesi hazırlamakla yükümlüdür."
      },
      {
        "type": "h2",
        "text": "1. KMK Madde 37 Kapsamında İşletme Projesinin 4 Ana Bölümü"
      },
      {
        "type": "ul",
        "items": [
          "Tahmini Giderler Tablosu: Personel maaşları, SGK primleri, ortak elektrik, su, doğalgaz, asansör, jeneratör, havuz ve ilaçlama giderlerinin 1 yıllık dökümü.",
          "Tahmini Gelirler Tablosu: Toplanacak olağan aidatlar, otopark/sosyal tesis gelirleri ve baz istasyonu/reklam kira gelirleri.",
          "Ortak Gider Paylaşım Dağılımı: Giderlerin kapıcı/bekçi eşit payı ve diğer giderlerin arsa payı oranlarına göre bağımsız bölüm bazında hesaplanması.",
          "Aylık Avans Payları: Her bir kat malikinin her ay ödemesi gereken net aidat tutarı."
        ]
      },
      {
        "type": "h2",
        "text": "2. İşletme Projesinin Tebliği ve 7 Günlük Kesinleşme Süreci"
      },
      {
        "type": "ol",
        "items": [
          "1. Adım: Hazırlanan işletme projesi tüm kat maliklerine veya bağımsız bölümlerinde fiilen oturanlara imza karşılığı veya taahhütlü mektupla tebliğ edilir.",
          "2. Adım: Tebliğden itibaren 7 gün içinde kat malikleri projeye yazılı olarak itiraz edebilir.",
          "3. Adım: İtiraz edilmezse işletme projesi KESİNLEŞİR ve İİK m.68/1 uyarınca ilam niteliği kazanır.",
          "4. Adım: İtiraz edilirse, durum Kat Malikleri Kurulu tarafından incelenir ve kesin karar verilir."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "İşletme projesi tebliğ edilmeden aidat icrası yapılabilir mi?"
      },
      {
        "type": "p",
        "text": "Tebliğ edilmemiş işletme projesine dayanılarak icra takibi yapıldığında borçlunun itirazı halinde icra durur; bu nedenle tebligat ispatı zorunludur."
      },
      {
        "type": "h3",
        "text": "Yıl içinde giderler bütçeyi aşarsa ne yapılır?"
      },
      {
        "type": "p",
        "text": "Yönetici \"Ek İşletme Projesi (Ek Bütçe)\" hazırlayarak aynı usulle tebliğ eder ve ek aidat/demirbaş avansı toplar."
      },
      {
        "type": "cta",
        "text": "Siteniz için hatasız işletme projesi hazırlama ve bütçe yönetimi hizmeti alın.",
        "href": "/hizmetler/yonetim-danismanligi",
        "label": "Bütçe Danışmanlığı Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kadıköy, Anadolu Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Bağdat Caddesi, Caddebostan ve Suadiye kentsel dönüşüm rezidanslarında VIP lobi & güvenlik entegrasyonu",
          "Kadıköy merkezli Alo Güvenlik (guvenlikkursu.com) üssümüzden anlık eğitimli personel ve operasyon güvencesi",
          "Yeraltı çok katlı otoparklarında asansör kat kilit sistemi ile dairelere yabancı geçişinin durdurulması",
          "Kurye ve teslimat görevlilerinin lobi kargo odasında karşılanarak daire kapılarına çıkışının denetlenmesi"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Kadıköy bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kadıköy'deki butik binalarda özel güvenlik maliyeti nasıl optimize edilir?"
      },
      {
        "type": "p",
        "text": "Gündüz fiziksel danışma, gece ise uzaktan akıllı kamera izleme ve mobil devriye hibrit modeliyle %50 tasarruf sağlanır."
      },
      {
        "type": "h3",
        "text": "Bağdat Caddesi'nde güvenlik personeli ne kadar sürede temin edilir?"
      },
      {
        "type": "p",
        "text": "Kadıköy merkezimiz sayesinde acil personel ihtiyaçları 30 dakika içinde sahaya sevk edilir."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Kadıköy Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kadıköy'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Kadıköy İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kadıköy'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Kadıköy Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kadıköy'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Kadıköy Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Kadıköy projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kadıköy'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Kadıköy Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Kentsel dönüşüm binalarında asansör A Tipi MMO yeşil etiket muayenesine eksiksiz hazırlık",
          "Merkezi su yumuşatma cihazlarında reçine rejenerasyonu ve tuz tankı periyodik kontrolleri",
          "Kapalı otoparklarda Karbonmonoksit (CO) egzoz tahliye jet fanlarının otomatik sensör kalibrasyonu",
          "Güneş enerjisi (GES) ve ısı pompası hibrit sistemlerinin periyodik verimlilik ölçümleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Kadıköy bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Su yumuşatma cihazı binaya ne kazandırır?"
      },
      {
        "type": "p",
        "text": "Şebeke suyunun kirecini kırarak kombi, kazan, boyler ve daire içi armatürlerin ömrünü 3 kat uzatır."
      },
      {
        "type": "h3",
        "text": "Kapalı otopark jet fanları ne zaman devreye girer?"
      },
      {
        "type": "p",
        "text": "CO sensörleri 50 ppm eşik değerini aştığında fanlar otomatik çalışarak zehirli gazı dışarı atar."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Kadıköy Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Kadıköy projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kadıköy'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Kadıköy Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kadıköy (Anadolu Yakası), Bağdat Caddesi ve Caddebostan kentsel dönüşüm binaları ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Kadıköy sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Kadıköy bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kadıköy'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Kadıköy'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Kadıköy Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kartal, Anadolu Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Kartal Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Kartal sahil kuleleri ve Dragos eteklerinde karma ticari/konut projelerinde ayrıştırılmış güvenlik hatları",
          "Sahil yolu araç girişlerinde yoğun saatlerde araç birikmesini önleyen yüksek hızlı PTS bariyerleri",
          "Kapalı otopark, fitness ve açık havuz sosyal tesislerinde parmak izi/kartlı turnike denetimi",
          "3G Güvenlik 7/24 motorize devriye ekipleriyle geniş parsel çevre çiti ve yangın merdiveni kontrolleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Kartal bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kartal sahil kulelerinde ticari alan ile konut güvenliği nasıl ayrılır?"
      },
      {
        "type": "p",
        "text": "Alışveriş caddesi müşterilerinin konut katlarına ve otoparkına geçişi kartlı turnikelerle tamamen engellenir."
      },
      {
        "type": "h3",
        "text": "Yüksek katlı sitelerde yangın tahliye planı nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Her 6 ayda bir kat sakinleri ve güvenlik ekipleriyle kontrollü yangın merdiveni tahliye tatbikatı yapılır."
      },
      {
        "type": "cta",
        "text": "Kartal'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Kartal Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kartal Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kartal'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Kartal'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Kartal İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kartal Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kartal'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Kartal'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Kartal Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kartal Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kartal'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Kartal'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Kartal Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kartal Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Kartal projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kartal'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Kartal'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Kartal Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Kartal Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "30+ katlı gökdelenlerde yüksek hızlı dikey taşıma (asansör) fren, halat ve paraşüt sistemleri bakımı",
          "Merkezi Chiller iklimlendirme gruplarında frekans konvertörlü enerji tasarruf modülasyonu",
          "Yüksek kat hidrofor hatlarında aşırı basınç patlamalarını önleyen Basınç Düşürücü Vana (PRV) kalibrasyonu",
          "Trafo yüksek gerilim hücresi SF6 gaz basınçları ve kompanzasyon kondansatör kademe testleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Kartal bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Yüksek katlı binalarda asansör halat ömrü nasıl uzatılır?"
      },
      {
        "type": "p",
        "text": "Düzenli manyetik korozyon testi ve özel sentetik halat yağlayıcıları kullanılarak sürtünme aşınması önlenir."
      },
      {
        "type": "h3",
        "text": "PRV basınç düşürücü vanalar neden kritiktir?"
      },
      {
        "type": "p",
        "text": "Alt katlara inen 15-20 barlık hidrofor basıncını daireler için güvenli olan 4 bara düşürerek boru patlamalarını engeller."
      },
      {
        "type": "cta",
        "text": "Kartal'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Kartal Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kartal Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Kartal projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kartal'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Kartal'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Kartal Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Kartal (Anadolu Yakası), Kartal sahil kuleleri ve Dragos etekleri ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Kartal Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Kartal sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Kartal bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kartal'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Kartal'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Kartal'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Kartal Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 34 uyarınca, 8 veya daha fazla bağımsız bölüme sahip tüm binalarda yönetici atanması kanunen zorunludur. Yönetici, kat malikleri kurulu tarafından seçilir ve kurulun vekili sıfatıyla ana gayrimenkulü idare eder. Kanun yöneticilere ağır sorumluluklar yüklerken aynı zamanda çok önemli yasal haklar ve yetkiler tanımıştır."
      },
      {
        "type": "h2",
        "text": "1. Yöneticinin Hukuki Konumu ve Vekalet İlişkisi (KMK m.38)"
      },
      {
        "type": "p",
        "text": "Kanunun 38. maddesi açıkça belirtir: \"Yönetici, kat maliklerine karşı aynen bir vekil gibi sorumludur.\" Yönetici kat malikleri kurulu kararlarını yerine getirmek, ortak parayı korumak ve her zaman hesap vermeye hazır olmakla yükümlüdür."
      },
      {
        "type": "h2",
        "text": "2. Yöneticinin Yasal Hakları (KMK Madde 40)"
      },
      {
        "type": "ul",
        "items": [
          "Ücret Talep Etme Hakkı: Yönetim planında aksi kararlaştırılmadıkça, yönetici kat maliklerince belirlenen uygun bir yönetim ücreti talep edebilir.",
          "Gider Payı Muafiyeti: Kat malikleri arasından seçilen yönetici, aksi kararlaştırılmadıkça normal yönetim giderlerinin (aidat) yarısına katılmaz.",
          "Vekaletname Aranmaksızın Dava Açma Hakkı: KMK m.35 uyarınca yönetici, borcunu ödemeyen maliklere karşı noter vekaletnamesi olmadan doğrudan icra takibi açabilir.",
          "Haklı Nedenle Görevi Bırakma (İstifa) Hakkı: Yönetici haklı sebeplerle kat malikleri kurulunu olağanüstü toplantıya çağırarak istifa edebilir."
        ]
      },
      {
        "type": "h2",
        "text": "3. Yöneticinin Şahsi ve Cezai Sorumlulukları"
      },
      {
        "type": "p",
        "text": "Yönetici; karar defterini notere kapatmamak, işletme bütçesini tebliğ etmemek veya ortak parayı şahsi hesabında kullanmaktan dolayı Türk Ceza Kanunu kapsamında Güveni Kötüye Kullanma suçundan hapis cezası riskiyle karşı karşıya kalabilir."
      },
      {
        "type": "h2",
        "text": "4. Dışarıdan Profesyonel Yönetim Şirketi Seçimi"
      },
      {
        "type": "p",
        "text": "Kat malikleri kurulu, kendi aralarından bir yönetici seçmek yerine KMK m.34 kapsamında dışarıdan kurumsal bir tesis yönetim şirketini yönetici olarak atayabilir. Bu sayede tüm cezai ve idari riskler kurumsal firmaya devredilmiş olur."
      },
      {
        "type": "h2",
        "text": "5. Yöneticinin İbra Edilmesi ve İbra Edilmeme Sonuçları"
      },
      {
        "type": "p",
        "text": "Olağan genel kurulda yöneticinin faaliyet ve mali raporları oylanır. İbra edilmeyen yönetici aleyhine kat malikleri kurulu kararıyla Sulh Hukuk veya Asliye Hukuk Mahkemesinde tazminat davası açılabilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Yönetici seçilmek için kat maliki olmak şart mıdır?\nCevap: Hayır. KMK m.34 uyarınca yönetici kat malikleri arasından seçilebileceği gibi dışarıdan üçüncü bir kişi veya tüzel kişilik (yönetim şirketi) de yönetici olarak seçilebilir."
      },
      {
        "type": "p",
        "text": "Soru: Yönetici toplantı yapmadan istifa edebilir mi?\nCevap: Yönetici istifa dilekçesini denetçiye sunarak olağanüstü genel kurul çağrısı yapılmasını talep etmeli ve yeni yönetici seçilene kadar acil işleri vekaleten yürütmelidir."
      },
      {
        "type": "cta",
        "text": "Yöneticilik risklerinizi profesyonel bir yönetim şirketine devredin.",
        "href": "/teklif-al",
        "label": "Profesyonel Yönetim Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Maltepe, Anadolu Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Zümrütevler ve Dragos yamaç sitelerinde eğimli çevre duvarları boyunca kızılötesi lazer koruma kalkanı",
          "Site sakinlerinin aidat durumuyla entegre sosyal tesis ve açık havuz akıllı geçiş turnikeleri",
          "Alo Güvenlik ve 3G Güvenlik ortak denetim ağıyla haftalık habersiz gece süpervizör baskınları",
          "Kargo ve paket kabulünde barkodlu güvenlik yazılımı ile daire sakinine anlık teslimat bildirimi"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Maltepe bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Dragos villalarında güvenlik nasıl sağlanır?"
      },
      {
        "type": "p",
        "text": "Perimetre sensörleri, çevre aydınlatması ve 3G Güvenlik devriye ekipleriyle 24 saat kesintisiz devriye atılır."
      },
      {
        "type": "h3",
        "text": "Sitede güvenlik personeli değişimlerinde aksama olur mu?"
      },
      {
        "type": "p",
        "text": "Hayır, Alo Güvenlik yedek havuzundan aynı nitelikte personel 2 saat içinde göreve başlar."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Maltepe Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Maltepe'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Maltepe İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Maltepe'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Maltepe Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Maltepe'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Maltepe Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Maltepe projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Maltepe'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Maltepe Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Maksimum 45 dakikada yerinde müdahale taahhütlü 7/24 nöbetçi acil teknik servis hizmeti",
          "İçme ve kullanım suyu depolarında yılda 2 kez Sağlık Bakanlığı onaylı ozonlama ve dezenfeksiyon",
          "Şiddetli yağışlarda kapalı otopark su basmalarını önleyen çift flatörlü foseptik dalgıç pompaları",
          "Hidrofor genleşme tankı membran kontrolleri ile koç darbesi ve tesisat patlamalarının önlenmesi"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Maltepe bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Su deposu temizliği ne sıklıkla yapılmalıdır?"
      },
      {
        "type": "p",
        "text": "Sağlık Bakanlığı yönetmeliği uyarınca en az 6 ayda bir akredite biyosidal ekiplerce temizlenip dezenfekte edilmelidir."
      },
      {
        "type": "h3",
        "text": "Nöbetçi teknik servis neleri kapsar?"
      },
      {
        "type": "p",
        "text": "Asansör mahsur kalmaları, ana elektrik arızaları, ana su borusu patlakları ve hidrofor durmalarını kapsar."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Maltepe Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Maltepe projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Maltepe'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Maltepe Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Maltepe (Anadolu Yakası), Zümrütevler ve Dragos yamaç konut projeleri ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Maltepe sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Maltepe bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Maltepe'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Maltepe'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Maltepe Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sarıyer, Avrupa Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Zekeriyaköy, Tarabya ve Yeniköy orman kenarı villa sitelerinde termal radar ve fiber optik çevre çiti",
          "Geniş araziye yayılan sitelerde 3G Güvenlik bünyesindeki ATV motorize devriye ve K9 koruma ekipleri",
          "Maslak finans ve iş kulelerinde VIP x-ray cihazı, metal kapı dedektörü ve kurumsal resepsiyon",
          "Site ana giriş nizamiyesinde misafirlerin plakasıyla birlikte araç altı görüntüleme aynası/kamerası kontrolü"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Sarıyer bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Orman kenarı villa sitelerinde güvenlik zafiyeti nasıl önlenir?"
      },
      {
        "type": "p",
        "text": "Çevre çitine entegre fiber optik algılama kabloları ve termal kameralar ile çite temas anında güvenlik uyarılır."
      },
      {
        "type": "h3",
        "text": "Maslak plazalarında x-ray operatörleri nasıl eğitilir?"
      },
      {
        "type": "p",
        "text": "Alo Güvenlik bünyesinde bagaj tarama, şüpheli paket ve tehlikeli madde tespiti simülasyonlarıyla eğitilirler."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Sarıyer Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Sarıyer'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Sarıyer İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Sarıyer'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Sarıyer Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Sarıyer'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Sarıyer Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Sarıyer projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Sarıyer'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Sarıyer Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Sarıyer şebeke dalgalanmalarına karşı Otomatik Transfer Panolu (ATS) senkronize jeneratör işletimi",
          "Müstakil ve site yüzme havuzlarında 4 mevsim filtrasyon, kışlık koruma ve otomatik klorlama bakımı",
          "Orman yamaç sularının temele sızmasını engelleyen zemin drenaj kuyuları ve terfi istasyonu bakımları",
          "Yerden ısıtma ve ısı pompası sistemlerinde mevsim geçişi dengeleme vanaları ayarları"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Sarıyer bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Kış aylarında açık havuz suyu boşaltılmalı mıdır?"
      },
      {
        "type": "p",
        "text": "Hayır, havuz gövdesinin donma ve zemin basıncından çatlamaması için su dolu bırakılmalı ve kış bakım kimyasalı atılmalıdır."
      },
      {
        "type": "h3",
        "text": "Jeneratör transfer panosu ne işe yarar?"
      },
      {
        "type": "p",
        "text": "Şebeke elektriği kesildiğinde 8 saniye içinde jeneratörü otomatik çalıştırıp binayı besler; elektrik geldiğinde devreden çıkar."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Sarıyer Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Sarıyer projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Sarıyer'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Sarıyer Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Sarıyer (Avrupa Yakası), Maslak plazaları ve Zekeriyaköy orman villaları ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Sarıyer sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Sarıyer bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Sarıyer'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Sarıyer'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Sarıyer Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Şişli, Avrupa Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Şişli Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Mecidiyeköy, Bomonti ve Büyükdere Caddesi kulelerinde yüksek sirkülasyonlu hızlı geçiş turnike güvenliği",
          "Rezidans ve ofis katlarının otopark katlarında vale koordinasyonu ve araç park düzeni disiplini",
          "Gece ve tatil günlerinde boş ofis katlarının kat bazlı RFID kart kilitleri ve kamera ile korunması",
          "Yangın ve deprem anında binlerce çalışanın güvenli tahliyesini sağlayan acil durum güvenlik liderliği"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Şişli bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Şişli'deki yüksek katlı plazalarda kargo güvenliği nasıl sağlanır?"
      },
      {
        "type": "p",
        "text": "Lobi katında oluşturulan kargo kabul odasında paketler x-ray'den geçirilerek sakine teslim edilir."
      },
      {
        "type": "h3",
        "text": "Plaza girişlerinde misafir bekleme süresi nasıl azaltılır?"
      },
      {
        "type": "p",
        "text": "QR kodlu mobil davetiye sistemi ile turnikelerden temassız ve beklemesiz geçiş sağlanır."
      },
      {
        "type": "cta",
        "text": "Şişli'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Şişli Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Şişli Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Şişli'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Şişli'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Şişli İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Şişli Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Şişli'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Şişli'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Şişli Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Şişli Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Şişli'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Şişli'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Şişli Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Şişli Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Şişli projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Şişli'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Şişli'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Şişli Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Şişli Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Chiller ve AHU klima santrallerinde frekans invertörleri ve filtre temizlikleriyle %25 enerji tasarrufu",
          "Kompanzasyon panosu telemetrisi ile dağıtım şirketi reaktif/kapasitif enerji cezalarının sıfırlanması",
          "Merkezi adresli yangın ihbar santrallerinde duman dedektörleri, damperler ve acil anons testleri",
          "Fan-coil serpantinlerinin periyodik antibakteriyel kimyasallarla temizlenerek hava kalitesinin artırılması"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Şişli bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Plazalarda elektrik faturaları teknik bakımla nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Kompanzasyon takibi ile reaktif ceza önlenir, chiller eko-modülasyonu ile %25 elektrik tasarrufu sağlanır."
      },
      {
        "type": "h3",
        "text": "Yangın ihbar santrali arızası ne tür riskler doğurur?"
      },
      {
        "type": "p",
        "text": "Olası bir duman durumunda itfaiye ve yangın damperleri tetiklenemez; bu nedenle haftalık senaryo testi şarttır."
      },
      {
        "type": "cta",
        "text": "Şişli'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Şişli Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Şişli Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Şişli projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Şişli'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Şişli'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Şişli Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Şişli (Avrupa Yakası), Mecidiyeköy ve Bomonti karma ticari kuleleri ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Şişli Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Şişli sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Şişli bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Şişli'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Şişli'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Şişli'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Şişli Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Toplu yaşam alanlarında görev yapan özel güvenlik personellerinin yetkileri ve sorumlulukları, 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ile Türk Ceza Kanunu (TCK) hükümleri çerçevesinde sınırlandırılmıştır. Güvenlik görevlilerinin yetkilerini tam bilmesi kadar, sınırlarını aşmaması da kat maliklerinin ve yönetimin hukuki güvencesidir."
      },
      {
        "type": "h2",
        "text": "1. Güvenlik Görevlilerinin Kanuni 5 Temel Yetkisi (5188 m.7)"
      },
      {
        "type": "ul",
        "items": [
          "Kimlik Sorma Yetkisi (5188 m.7/a): Görev alanına girmek isteyen kişilerin kimliklerini sorma, ziyaretçi kayıt defterine veya dijital yazılıma kaydetme.",
          "Detektörle Arama Yetkisi (5188 m.7/b): Kişilerin üstlerini ve eşyalarını X-ray cihazı, kapı dedektörü veya el detektörü ile kontrol etme.",
          "Zor Kullanma ve Meşru Müdafaa (5188 m.7/c): TCK m.25 ve Borçlar Kanunu kapsamında can ve mal güvenliğini korumak için orantılı güç kullanma.",
          "Suçüstü Yakalama ve Teslim (5188 m.7/d): Hırsızlık, darp, haneye tecavüz anında faili yakalayarak gecikmeksizin genel kolluğa (Polis/Jandarma) teslim etme.",
          "Olay Yerini ve Delilleri Koruma (5188 m.7/e): Suç delillerinin bozulmasını veya kaybolmasını engellemek için olay yerini güvenlik şeridiyle koruma altına alma."
        ]
      },
      {
        "type": "h2",
        "text": "2. Özel Güvenlik Görevlisinin Yapamayacağı İşler (Yasal Sınırlar)"
      },
      {
        "type": "ul",
        "items": [
          "Elle Üst ve Çanta Araması: Hakim veya savcı kararı olmadan genel kolluk gibi elle arama yapamaz.",
          "İfade Alma ve Gözaltı: Kişileri sorgulayamaz, tutanak dışı ifade alamaz veya nezarethaneye kapatamaz.",
          "Konut Dokunulmazlığı İhlali: Kat malikinin rızası veya mahkeme kararı olmadan daire içine giremez.",
          "Görev Dışı Çalıştırma Yasağı: Güvenlik görevlisine kapıcılık, çöp toplama, bahçe sulama gibi temizlik işleri yaptırılamaz (5188 m.16)."
        ]
      },
      {
        "type": "h2",
        "text": "3. Site Yöneticisinin Hukuki ve İdari Sorumlulukları"
      },
      {
        "type": "p",
        "text": "Valilik Özel Güvenlik İzni (ÖGİ) almadan lisanssız personel çalıştıran veya personeli görevi dışında kullanan site yöneticileri hakkında 5188 Sayılı Kanun Madde 20 uyarınca ağır idari para cezası ve adli işlem uygulanır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Güvenlik görevlisi siteye giren misafirin kimliğini alıkoyabilir mi?"
      },
      {
        "type": "p",
        "text": "Hayır, kimlik belgesini emanet olarak alıkoymak suçtur. Yalnızca kimlik bilgileri kaydedilir ve belge sahibine derhal iade edilir."
      },
      {
        "type": "h3",
        "text": "Güvenlik görevlisi silah taşıyabilir mi?"
      },
      {
        "type": "p",
        "text": "Konut sitelerinde güvenlik kural olarak silahsızdır. Silahlı görevli istihdamı için Valilik İl Özel Güvenlik Komisyonu'ndan özel gerekçeli karar alınması gerekir."
      },
      {
        "type": "cta",
        "text": "5188 mevzuatına tam uyumlu profesyonel güvenlik hizmeti için teklif alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Güvenlik Yönetimi Detayları"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Bir sitenin veya plazanın geleceği, seçilen yönetim şirketinin kurumsal yetkinliği ile doğrudan ilişkilidir. Yetersiz veya şeffaf olmayan yönetimler; biriken borçlar, bakımsız kalan asansörler ve aidat krizleriyle mülk değerini hızla düşürür."
      },
      {
        "type": "h2",
        "text": "1. Tesis Yönetim Şirketi Seçerken 7 Altın Kriter"
      },
      {
        "type": "ul",
        "items": [
          "1. Mali Şeffaflık ve Online ERP Takibi: Kat sakinlerinin 7/24 mobil uygulama üzerinden sitenin banka hesabını, gelir-gider faturalarını ve kasa bakiyesini kuruşu kuruşuna görebilmesi.",
          "2. 5188 Sayılı Kanun ve Güvenlik Lisansı: Şirketin bünyesinde Alo Güvenlik (guvenlikkursu.com) ve 3G Güvenlik (3gguvenlik.com) gibi lisanslı kurumsal güvenlik güvencesi bulunması.",
          "3. Kadrolu Teknik Servis ve Mühendislik: Dışarıdan pahalı taşeronlar yerine firmanın kendi bünyesinde elektrik/makine mühendisleri ve 7/24 nöbetçi teknisyen barındırması.",
          "4. Hukuk ve İcra Departmanı Gücü: Aidat alacaklarının gecikmeksizin tahsili için tam zamanlı kat mülkiyeti avukatı kadrosunun bulunması.",
          "5. Referans Proje Büyüklüğü: Benzer ölçekte (500-1000+ konut veya A+ plaza) başarılı yönetim referanslarına sahip olması.",
          "6. Kalite ve Yönetim Sertifikaları: ISO 9001 Kalite, ISO 41001 Tesis Yönetimi ve ISO 45001 İSG sertifikasyonlarının tam olması.",
          "7. Bağımsız Denetim Açıklığı: Her 3 ayda bir kat malikleri denetçilerine tüm evrak ve ekstrelerin şeffafça sunulması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İhale Teknik ve İdari Şartnamesi Hazırlama"
      },
      {
        "type": "p",
        "text": "Kat malikleri kurulu ihale komisyonu kurarak hizmet kapsamını (güvenlik, temizlik, teknik, muhasebe, peyzaj) net belirleyen bir şartname hazırlamalı ve firmalardan kalem kalem teklif toplamalıdır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Yönetim şirketi sözleşmesi kaç yıllık yapılmalıdır?"
      },
      {
        "type": "p",
        "text": "Sözleşmeler 1 yıllık yapılır; Kat Malikleri Kurulu her yıl yöneticinin ibra durumunu ve performansını oylayarak devam veya fesih kararı alır."
      },
      {
        "type": "h3",
        "text": "Yönetim şirketinin parayı zimmetine geçirme riski var mıdır?"
      },
      {
        "type": "p",
        "text": "Alo Yönetim modelinde tüm paralar site adına açılan resmi banka hesabında tutulur; çift imza kuralı ve online banka entegrasyonu ile yöneticinin habersiz para çekmesi engellenir."
      },
      {
        "type": "cta",
        "text": "Siteniz için kurumsal tesis yönetimi teklifi ve detaylı sunum talep edin.",
        "href": "/teklif-al",
        "label": "Yönetim Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ümraniye, Anadolu Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Şerifali, Çakmak ve İFM komşusu sitelerde akıllı Plaka Tanıma Sistemi (PTS) ve nizamî karşılama",
          "Çocuk parkları, spor sahaları ve peyzaj yürüyüş yollarında periyodik yaya devriye güvenlik turları",
          "Alo Güvenlik ve 3G Güvenlik Anadolu Yakası lojistik ağı ile 7/24 hazır nöbetçi süpervizör araçları",
          "Kapalı otoparklarda yangın çıkış kapıları ve sığınak alanlarının RFID tur kontrol kalemiyle denetimi"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Ümraniye bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Şerifali bölgesindeki sitelerde güvenlik nasıl organize edilir?"
      },
      {
        "type": "p",
        "text": "Giriş kapılarında 24 saat çift vardiya güvenlik ve çevre kameralarıyla tam entegre koruma sağlanır."
      },
      {
        "type": "h3",
        "text": "Sitede özel güvenlik ihalesi nasıl açılır?"
      },
      {
        "type": "p",
        "text": "Kat malikleri kurulu kararı sonrası 5188 lisanslı firmalardan teknik şartnameye uygun teklifler toplanır."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Ümraniye Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ümraniye'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Ümraniye İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ümraniye'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Ümraniye Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ümraniye'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Ümraniye Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Ümraniye projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ümraniye'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Ümraniye Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Dudullu OSB sanayi tesislerinde ve büyük sitelerde EMO onaylı Y.G. Trafo İşletme Sorumluluğu",
          "Yangın hidrant hatları ve dizel yangın pompalarının haftalık otomatik debi ve basınç testleri",
          "Merkezi hidrofor ve ters osmoz (RO) su arıtma sistemlerinde membran filtre değişimleri",
          "Sanayi tesislerinde basınçlı hava hatları ve kompresör periyodik mekanik bakımları"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Ümraniye bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Trafo işletme sorumluluğu belgesi zorunlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, 1 kV üzeri trafosu olan tüm sanayi ve toplu konut tesislerinde EMO tescilli elektrik mühendisi zorunludur."
      },
      {
        "type": "h3",
        "text": "Yangın hidrant testi ne sıklıkla yapılmalıdır?"
      },
      {
        "type": "p",
        "text": "Binaların Yangından Korunması Hakkında Yönetmelik uyarınca yılda en az 2 kez debi ve basınç testi yapılmalıdır."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Ümraniye Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Ümraniye projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ümraniye'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Ümraniye Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Ümraniye (Anadolu Yakası), Şerifali, Dudullu ve Finans aksı modern siteleri ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Ümraniye sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Ümraniye bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ümraniye'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Ümraniye'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Ümraniye Tesis Yönetim Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Üsküdar, Anadolu Yakası'nın en dinamik ve gayrimenkul değeri en yüksek bölgelerinden biridir. Bölgedeki lüks konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Çamlıca, Kandilli, Beylerbeyi ve Çengelköy sırtlarındaki korulu sitelerde çevre lazer bariyerleri",
          "Tarihi dokuya ve koru estetiğine uygun ahşap/kompozit nizamiye kulübelerinde seçkin VIP güvenlik",
          "Gece koru içi aydınlatmalı parkurlarda RFID noktalarıyla 45 dakikalık periyotlarla taranan devriyeler",
          "Boğaz sahil yolu bağlantılı dar site girişlerinde trafik sıkışıklığını önleyen akıllı bariyer otomasyonu"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimizin tamamı Alo Güvenlik (guvenlikkursu.com) akreditasyonlu, kimlik kartlı ve periyodik atış/öfke kontrolü eğitimlidir. Olası tüm risklere karşı 3. Şahıs Mali Mesuliyet Sigortamız devrededir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik bünyesindeki 7/24 nöbetçi süpervizör araçları, Üsküdar bölgesindeki tüm nöbet noktalarımızı gece ve gündüz habersiz olarak denetler, personelin kılık-kıyafet, nöbet defteri ve RFID devriye kayıtlarını telemetri ile merkeze raporlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Korulu sitelerde güvenlik devriyesi nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Ağaçlık alanlara yerleştirilen 20+ RFID kontrol noktası gece boyunca 45 dakikalık periyotlarla taranır."
      },
      {
        "type": "h3",
        "text": "Kandilli villalarında güvenlik personeli seçimi nasıl olur?"
      },
      {
        "type": "p",
        "text": "Alo Güvenlik VIP koruma ve nezaket kuralları eğitimli, referanslı personeller atanır."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki siteniz için kurumsal özel güvenlik keşfi ve fiyat teklifi alın.",
        "href": "/hizmetler/guvenlik-yonetimi",
        "label": "Üsküdar Güvenlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Sağlık Bakanlığı lisanslı biyosidal uzmanlarımızla entegre vektör mücadelesi yürütüyoruz."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Sitelerinde 4 Kademeli Biyosidal Mücadele"
      },
      {
        "type": "ul",
        "items": [
          "Kokusuz Jel İlaçlama: Daire içlerinde ve elektrik panolarında hazırlık gerektirmeden koloniyi zincirleme yok eden yöntem.",
          "Soğuk Sisleme (ULV): Sığınak, otopark ve çöp odalarında mikro damlacıklarla havada asılı kalarak tüm çatlaklara nüfuz eden sistem.",
          "Kilitli Kemirgen Yem İstasyonları: Emniyetli kutularda fare ve sıçanlara karşı mum blok yemleme.",
          "Rögar Larvasit Uygulaması: Rögar ve kanalizasyon hatlarında sivrisinek üremesini durduran biyolojik mücadele."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yasal Belgeler ve Ek-1 Biyosidal Raporu"
      },
      {
        "type": "p",
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine Sağlık Bakanlığı onaylı Ek-1 Biyosidal Ürün Uygulama Belgesi ve kullanılan ilaçların güvenlik bilgi formları (MSDS) teslim edilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Üsküdar'de ilaçlama sırasında evi boşaltmak gerekir mi?"
      },
      {
        "type": "p",
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise 2 saat kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Rögar ve çevre hatları ayda 1, kapalı ortak alanlar ise 3 ayda bir periyodik olarak ilaçlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki siteniz için periyodik biyosidal haşere ilaçlama teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Üsküdar İlaçlama Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" standartlarında sertifikalı operatörlerimizle 7/24 havuz işletmesi sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Açık havuzlarda 1.0-3.0 ppm, kapalı havuzlarda 1.0-1.5 ppm serbest klor ve 7.2-7.6 pH dengesi.",
          "Haftalık Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Her sabah açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Aylık Akredite Laboratuvar Analizleri: Sağlık Bakanlığı onaylı laboratuvardan mikrobiyolojik test raporunun panoya asılması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kışlık Koruma ve Don Önleme"
      },
      {
        "type": "p",
        "text": "Kış aylarında havuz gövdesinin zemin basıncından çatlamaması için su dolu bırakılır, donma önleyici şamandıralar ve kış bakım kimyasalları uygulanarak motor dairesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Üsküdar'deki site havuzlarında sertifikalı operatör zorunlu mu?"
      },
      {
        "type": "p",
        "text": "Evet, Sağlık Bakanlığı mevzuatı gereğince sertifikalı havuz suyu operatörü bulundurmak yasal zorunluluktur."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi 24 saatte düzeltilir."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi",
        "label": "Üsküdar Havuz Bakım Teklifi"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mahkemelerde iptal edilmeyecek kesinlikte hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 uyarınca sitenin güncel ihtiyaçlarına göre 4/5 çoğunlukla tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Masrafsız Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilerek site bütçesi korunur."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Üsküdar'de aidat icra takibi ne kadar sürer?"
      },
      {
        "type": "p",
        "text": "Ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz edilmezse takip kesinleşir ve banka/maaş hacizleri uygulanır."
      },
      {
        "type": "h3",
        "text": "Kiracının borcundan ev sahibi sorumlu mudur?"
      },
      {
        "type": "p",
        "text": "Evet, KMK m.20 uyarınca kat maliki ve kiracı müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki siteniz için kurumsal hukuk ve icra danışmanlığı teklifi alın.",
        "href": "/hizmetler/hukuk-ve-icra-danismanligi",
        "label": "Üsküdar Hukuk Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesini ve mülk değerini doğrudan artıran en değerli alanlardır. Ziraat mühendislerimiz kontrolünde 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile %40 su tasarrufu ve haftalık çim biçimi.",
          "Sonbahar Gübrelemesi: Ağaç form budamaları, kuru yaprak temizliği ve kışa hazırlık fosforlu kök gübrelemesi.",
          "Kış Koruma: Don önleyici bitki örtüleri, rüzgarda devrilme riski olan ağaçların derin budaması ve kış ilaçlaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Zirai Mücadele ve Çevre Dostu Gübreleme"
      },
      {
        "type": "p",
        "text": "Üsküdar projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla yalnızca Tarım ve Orman Bakanlığı onaylı çevre dostu organik ve biyolojik ilaçlar kullanılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Üsküdar'de bahçe sulama maliyeti nasıl düşürülür?"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfı %40 önlenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Mobil dal öğütme makinelerimizle talaşa dönüştürülüp kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki siteniz için profesyonel peyzaj ve bahçe bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Üsküdar Peyzaj Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki modern mimari yapılar, plazalar ve toplu konut siteleri; ileri teknoloji elektro-mekanik cihazlarla donatılmıştır. Bu sistemlerin aksamadan çalışması, hem can güvenliğinin sağlanması hem de yüksek amortisman giderlerinin önlenmesi için düzenli teknik bakım şarttır."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Bölgesi İçin 4 Temel Teknik Bakım Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "Eğimli yamaç arazilerde istinat duvarı arkası su basıncını tahliye eden drenaj dalgıç pompaları bakımı",
          "Yüksek rakım ve kot farkına sahip bloklarda hidrofor kademe basma yüksekliği (MSS) optimizasyonu",
          "Merkezi kaskad doğalgaz kazanlarında baca çekiş testleri ve ısı pay ölçer kalibrasyonları",
          "Yeraltı sığınak ve depolarında rutubet önleyici nem alma ve havalandırma santrali işletimi"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının günlük takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturaları tamamen sıfırlanır."
      },
      {
        "type": "h2",
        "text": "3. 7/24 Nöbetçi Acil Müdahale Taahhüdü"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Üsküdar bölgesindeki nöbetçi mobil teknik servisimiz maksimum 45 dakika içinde sahada müdahaleye başlar."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "İstinat duvarı arkasındaki drenaj pompaları ne sıklıkla test edilir?"
      },
      {
        "type": "p",
        "text": "Yağmur mevsimi öncesinde ve her ay düzenli olarak seviye flatörleri ve elektrik panoları test edilir."
      },
      {
        "type": "h3",
        "text": "Eğimli arazide alt ve üst bloklar arasındaki su basıncı farkı nasıl çözülür?"
      },
      {
        "type": "p",
        "text": "Basınç zonlaması yapılarak üst katlara güçlü hidrofor, alt katlara ise basınç kırıcı vana uygulanır."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki tesisiniz için 7/24 garantili teknik bakım sözleşmesi başlatın.",
        "href": "/hizmetler/teknik-bakim",
        "label": "Üsküdar Teknik Servis Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla kusursuz hijyen sağlıyoruz."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Bölgesi İçin 4 Aşamalı Hijyen Standartlarımız"
      },
      {
        "type": "ul",
        "items": [
          "Renk Kodlu Mikrofiber Sistemi: Çapraz bulaşmayı önleyen 4 renkli bez ve mop yönetimi.",
          "Kapalı Otopark Zemin Otomatı: Otoparklardaki yağ ve lastik izlerini temizleyen yüksek vakumlu zemin yıkama.",
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının antiviral solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su ve ozonlama uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Üsküdar projelerimizde görev yapan tüm temizlik personellerimiz İSG eğitimli, periyodik sağlık taramalı ve kadrolu çalışanlarımızdır. Süpervizörlerimiz haftalık hijyen puanlama testleri uygular."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Üsküdar'deki sitelerde kat çöpleri nasıl toplanır?"
      },
      {
        "type": "p",
        "text": "Her gün belirlenen saatlerde kapalı sızdırmaz arabalarla toplanır ve ana çöp konteyner alanına transfer edilir."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları belgeli midir?"
      },
      {
        "type": "p",
        "text": "Evet, tüm temizlik ve dezenfeksiyon ürünlerimiz TSE ve Sağlık Bakanlığı onaylıdır."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki siteniz için profesyonel temizlik ve hijyen teklifi alın.",
        "href": "/hizmetler/temizlik-ve-hijyen",
        "label": "Üsküdar Temizlik Teklifi Al"
      }
    ],
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
    "content": [
      {
        "type": "p",
        "text": "Üsküdar (Anadolu Yakası), Çamlıca ve Kandilli tarihi korulu siteleri ile İstanbul'un en yüksek gayrimenkul değerine sahip yerleşimlerindendir. Bölgedeki lüks konutlar, plazalar ve siteler; sakinlerine huzurlu, şeffaf ve değer kazandıran bir yaşam alanı sunmak için entegre tesis yönetimi hizmetimize güvenmektedir."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Üsküdar sakinlerinin 7/24 mobil uygulama üzerinden banka hesaplarını ve faturaları kuruşu kuruşuna izleyebildiği online ERP altyapısı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile bölgeye özel 7/24 denetlenen güvenlik mimarisi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında maksimum 45 dakika acil servis SLA taahhüdü.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Üsküdar bölgesinde konuşlu mobil süpervizör araçlarımız, kadrolu teknik personelimiz ve kurumsal temizlik filomuz ile dışarıdan aracısız, doğrudan birinci elden en yüksek kalitede hizmet sunuyoruz."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Üsküdar'de site yönetim şirketi devir süreci nasıl işler?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar 15 gün içinde resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Üsküdar'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması asla kendi hesabına aidat alamaz."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki siteniz veya binanız için kurumsal tesis yönetimi teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Üsküdar Tesis Yönetim Teklifi"
      }
    ],
    "dateModified": "2026-02-24T20:00:00.000Z"
  }
];

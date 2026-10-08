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
    "slug": "kat-mulkiyeti-kanunu-2026-degisikligi-7579-sayili-kanun-aidat-artis-siniri",
    "title": "Kat Mülkiyeti Kanunu 2026 Değişikliği: 7579 Sayılı Kanun ve Site Aidatı Artış Sınırı",
    "description": "22 Mayıs 2026'da yürürlüğe giren 7579 sayılı Kanun KMK m.35, 37 ve 70'i değiştirdi: aidat artışı yeniden değerleme oranıyla sınırlandı, geçici işletme projesi ve toplu yapılarda 2/3 yönetim planı çoğunluğu geldi.",
    "category": "hukuk",
    "tags": [
      "kmk 2026 değişikliği",
      "7579 sayılı kanun",
      "aidat artış sınırı",
      "geçici işletme projesi",
      "yönetim planı 2/3",
      "yeniden değerleme oranı"
    ],
    "author": "alo-yonetim",
    "datePublished": "2026-10-05T09:00:00.000Z",
    "dateModified": "2026-10-05T09:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop",
    "pillar": "/hizmetler/hukuk-ve-icra-danismanligi",
    "tldr": "22 Mayıs 2026 tarihli 7579 sayılı Kanun, KMK m.35, 37 ve 70'i değiştirdi: işletme projesi kat malikleri kurulunda onaylanır, onaylı proje yoksa yönetici en geç 3 ay içinde onaylanacak geçici proje hazırlar, mevcut projesi olan sitelerde geçici projedeki bedel bir önceki yılın yeniden değerleme oranını aşamaz ve toplu yapılarda yönetim planı değişikliği için gereken çoğunluk 4/5'ten 2/3'e indi.",
    "content": [
      {
        "type": "p",
        "text": "7 Mayıs 2026'da TBMM'de kabul edilen ve 22 Mayıs 2026 tarihli, 33261 sayılı Resmî Gazete'de yayımlanan 7579 sayılı Kanun, 634 sayılı Kat Mülkiyeti Kanunu'nun (KMK) üç maddesini değiştirdi. Değişiklikler yayım tarihinde yürürlüğe girdi. Bu yazı yöneticiler, kat malikleri ve kiracılar için ne anlama geldiğini özetler; hukuki danışmanlık değildir."
      },
      {
        "type": "h2",
        "text": "1. Hangi maddeler değişti?"
      },
      {
        "type": "table",
        "caption": "7579 sayılı Kanun ile değişen KMK maddeleri",
        "headers": [
          "Madde",
          "Önceki düzen",
          "Yeni düzen"
        ],
        "rows": [
          [
            "KMK m.35 (avans)",
            "Yönetici avans toplayabilir, avans bittiğinde geri kalan işler için tekrar avans toplayabilirdi.",
            "Avans, işletme projesi onaylanıncaya kadar toplanabilir."
          ],
          [
            "KMK m.37 (işletme projesi)",
            "İşletme projesi yönetici tarafından hazırlanıp kat maliklerine tebliğ edilirdi.",
            "İşletme projesi kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici geçici proje yapar ve en geç 3 ay içinde kurula onaylatır."
          ],
          [
            "KMK m.70 (toplu yapılar)",
            "Toplu yapılarda yönetim planı değişikliği için 4/5 çoğunluk.",
            "2/3 çoğunluk; planların bu orana aykırı hükümleri uygulanmaz."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "2. Aidat artışına yasal sınır"
      },
      {
        "type": "p",
        "text": "Mevcut bir işletme projesi varsa geçici işletme projesindeki bedel, bir önceki yıla ilişkin yeniden değerleme oranından fazla olmamak kaydıyla belirlenir. Kaynaklarda bu oran %25,49 olarak geçmektedir; güncel oranı resmî duyurudan teyit edin. Örneğin aylık 1.000 TL olan bir aidat için geçici projede çıkılabilecek üst sınır yaklaşık 1.254,90 TL'dir. Kat malikleri kurulunca onaylanan projelerde tavanın nasıl uygulanacağı konusunda uygulama ve içtihat henüz oturmaktadır."
      },
      {
        "type": "h2",
        "text": "3. Geçici işletme projesi ve 3 aylık süre"
      },
      {
        "type": "p",
        "text": "Kat malikleri kurulunca kabul edilmiş bir işletme projesi yoksa yönetici gecikmeksizin geçici bir proje hazırlar. Bu proje maliklere bildirilir ve en geç 3 ay içinde kat malikleri kurulunda aynen veya değiştirilerek kabul edilmelidir. Bu süre, yöneticilerin yıllık toplantı takvimini ve tebligat kayıtlarını daha dikkatli yönetmesini gerektirir."
      },
      {
        "type": "h2",
        "text": "4. Toplu yapılarda yönetim planı için 2/3"
      },
      {
        "type": "p",
        "text": "Birden fazla yapıdan oluşan toplu yapılarda (siteler) yönetim planı değişikliği için gereken çoğunluk beşte dörtten üçte ikiye indi. Genel yapılarda KMK m.28/3'teki beşte dört kuralı değişmedi. Bu nedenle sitenizin toplu yapı olup olmadığı, hangi çoğunlukla karar alınacağını belirler."
      },
      {
        "type": "h2",
        "text": "5. Neler değişmedi?"
      },
      {
        "type": "ul",
        "items": [
          "Ortak gider ve avansı geciktiren kat malikine aylık %5 gecikme tazminatı işler (KMK m.20).",
          "Kesinleşen işletme projesi, ilamsız icra takibinde İİK m.68/1 kapsamında dayanak olabilir.",
          "İşletme projesine itiraz için 7 günlük süre, değişiklik metninde yer almamaktadır."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Aidat artışına sınır getirildi mi?"
      },
      {
        "type": "p",
        "text": "Evet. Mevcut işletme projesi olan sitelerde geçici projedeki bedel, bir önceki yıla ilişkin yeniden değerleme oranını aşamaz (KMK m.37)."
      },
      {
        "type": "h3",
        "text": "Yönetim planını değiştirmek için hangi çoğunluk gerekir?"
      },
      {
        "type": "p",
        "text": "Genel yapılarda bütün kat maliklerinin 4/5'i (KMK m.28/3), toplu yapılarda ise 2/3'ü (KMK m.70) gerekir."
      },
      {
        "type": "h3",
        "text": "Sitemiz bu değişikliğe uyum için ne yapmalı?"
      },
      {
        "type": "p",
        "text": "Önce onaylı bir işletme projesi olup olmadığını kontrol edin. Yoksa geçici proje hazırlayıp 3 ay içinde kurula sunun; yönetim planınızda 2/3 nisabına aykırı hüküm varsa bunun uygulanmayacağını göz önünde bulundurun ve bir avukata danışın."
      },
      {
        "type": "cta",
        "text": "Aidat artış sınırını kendi sitenizin rakamlarıyla hesaplayın ve güncel mevzuat rehberini inceleyin.",
        "href": "/kmk-2026-degisiklikleri",
        "label": "KMK 2026 Değişiklikleri Rehberi"
      }
    ]
  },
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
          "Kaynak ve Enerji Verimliliği: Ortak alan enerji tüketimi, su tüketimi ve kimyasal kullanımında ölçülebilir tasarruf hedeflemek.",
          "Operasyonel İş Sürekliliği (Business Continuity): Jeneratör, trafo, hidrofor ve asansör gibi kritik bileşenlerde arıza duruş sürelerini azaltmak.",
          "Yasal Mevzuat Uyumu: 634 Sayılı Kat Mülkiyeti Kanunu (KMK), 5188 Sayılı Özel Güvenlik Kanunu ve 6331 Sayılı İSG Kanunu gereklerini eksiksiz yerine getirmek.",
          "Müşteri ve Sakin Memnuniyeti (SLA): 7/24 çağrı merkezi ve dijital talep sistemi üzerinden arızalara hızlı müdahale taahhüdü sunmak."
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
          "Hukuki Güvence Sunar: İşletme projesi tebligatı ve KMK m.20 icra takipleri uzman hukukçularca yürütülür.",
          "Toplu Tedarik Gücü Sağlar: Birden çok projeyi yönetmenin getirdiği satın alma hacmi ile asansör, kimyasal ve sigorta gibi kalemlerde maliyet avantajı hedeflenir.",
          "7/24 Şeffaf Mobil Takip Sağlar: Sakinler tüm gelir-gider faturalarını ve denetim raporlarını cep telefonu uygulamasından anlık görebilir.",
          "İşveren Risklerini Azaltır: Kapıcı, güvenlik ve temizlik personelinin kıdem tazminatı ve SGK sorumlulukları kurumsal işveren yapısı altında yürütülür.",
          "Mülk Değerini Korur: Düzenli ve iyi işletilen binalarda dairelerin değerinin korunmasına katkı sağlanır."
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
          "Yetkisiz Bekçi Çalıştırmak: 5188 lisansı olmayan kişilere üniforma giydirip güvenlik hizmeti verdirmek çok yüksek idari para cezalarına yol açabilir. Çözüm: Valilik izinli kurumsal güvenlik firmasıyla çalışmaktır.",
          "İşletme Projesini Tebliğ Etmemek: KMK m.37 uyarınca usulüne uygun tebliğ edilmeyen aidat bütçesi hukuken kesinleşmeyebilir ve icra takipleri iptal olabilir. 7579 sayılı Kanun ile 2026'da onay usulü değiştiği için güncel kuralları kontrol edin.",
          // claims-guard-ignore: üçüncü taraf (asansör bakım firması) zorunluluğu
        "Bakımları Belgesiz Münferit Ustalara Yaptırmak: Gerekli belgeye sahip olmayan kişilere yaptırılan asansör ve hidrofor bakımları olası can kayıplarında yöneticiye cezai sorumluluk doğurabilir.",
          "Gecikme Tazminatını Yanlış Uygulamak: KMK m.20 uyarınca aidat gecikme tazminatı aylık %5 (yıllık %60) olarak hesaplanmalıdır; farklı oranlar mahkemeden döner."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Tesis yönetim şirketiyle çalışmak aidatları artırır mı?\nCevap: Her zaman değil. Profesyonel yönetim şirketleri toplu elektrik tedariki, asansör bakım sözleşmelerinin yeniden değerlendirilmesi ve personel planlaması sayesinde bütçelerde tasarruf fırsatı yaratabilir; sonuç sitenin mevcut sözleşmelerine ve ihtiyaçlarına göre değişir."
      },
      {
        "type": "p",
        "text": "Soru: Kaç daireli binalar tesis yönetimine ihtiyaç duyar?\nCevap: 8'den fazla bağımsız bölümü olan binalarda kanunen yönetici seçimi zorunludur. Merkezi ısıtma, asansör, jeneratör ve ortak güvenlik ihtiyacı olan, genellikle 20 daire ve üzeri yapılarda profesyonel tesis yönetimi pratikte vazgeçilmez hale gelir."
      },
      {
        "type": "cta",
        "text": "Tesisiniz için profesyonel yönetim teklifi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Tesis Yönetimi Çözümlerimiz"
      }
    ]
  },
  {
    "slug": "entegre-tesis-yonetimi-hizmetleri-nelerdir-kapsamli-rehber",
    "title": "Entegre Tesis Yönetimi Hizmetleri Nelerdir? A'dan Z'ye Kapsamlı Sektör Rehberi",
    "description": "Entegre tesis yönetiminin 3 ana sütunu: Teknik (Hard Services), Destek (Soft Services) ve Hukuki/Mali Yönetim. Tek elden yönetimin tasarruf modeli.",
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
          "Dikey Taşıma Sistemleri: akredite A Tipi Muayene Kuruluşları ile yeşil etiket asansör denetimleri ve yürüyen merdiven kontrolleri.",
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
          "Endüstriyel Hijyen ve Temizlik: Ortak alanlar, merdivenler, otoparklar, çöp şutları ve cam cephelerin ruhsatlı kimyasallarla temizliği.",
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
          "Düzenli Aidat Tahsilatı: Kredi kartı ve banka entegrasyonuyla düzenli tahsilat takibi.",
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
        "text": "Farklı taşeronlarla çalışıldığında bir su baskınında teknik ekip güvenlik ekibini, güvenlik ise temizlik ekibini suçlar. Entegre yönetimde tek muhatap vardır; hesap verilebilirlik daha nettir."
      },
      {
        "type": "p",
        "text": "Tek elden entegre yönetim modelinin sağladığı 3 büyük avantaj:"
      },
      {
        "type": "ol",
        "items": [
          "Maliyet Avantajı: Tek sözleşme ve merkezi satın alma ile ortak alan işletme maliyetlerinde tasarruf fırsatı doğar.",
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
          "Kritik Arıza Müdahale: Asansör mahsur kalması ve ana elektrik kesintilerinde hızlı müdahale.",
          "Standart Talep Çözümü: Ampul değişimi, kapı hidroliği ayarı veya temizlik taleplerinde üzerinde anlaşılan hedef süre içinde çözüm.",
          "Şeffaf Bütçe Raporlaması: Her ay düzenli olarak bir önceki ayın banka ve harcama ekstrelerinin mobil uygulamada yayınlanması."
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
        "text": "Soru: Entegre yönetim modeli apartmanlara uygun mudur?\nCevap: Evet, küçük apartmanlardan büyük yaşam alanlarına kadar her ölçekteki bina entegre yönetim avantajlarından yararlanabilir."
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
          "Eğitim ve Sertifikasyon: Grup şirketimiz Alo Güvenlik (guvenlikkursu.com) bünyesinde yetiştirilmiş güvenlik görevlileri.",
          "Saha Operasyonu ve Devriye: Grup şirketimiz 3G Özel Güvenlik (3gguvenlik.com) desteğiyle RFID tur kontrol sistemiyle devriye takibi.",
          "Elektronik Entegrasyon: Plaka tanıma sistemleri (PTS), bariyer otomasyonu ve çevre güvenlik kameraları."
        ]
      },
      {
        "type": "h2",
        "text": "2. Endüstriyel Hijyen, Ortak Alan ve Çevre Temizliği"
      },
      {
        "type": "p",
        "text": "Toplu yaşam alanlarında hijyen standartları doğrudan halk sağlığı konusudur. Ruhsatlı biyosidal ürünler ve renk kodlu mikrofiber temizlik bezleri ile çapraz bulaşma riskleri azaltılır."
      },
      {
        "type": "ul",
        "items": [
          "Blok Girişleri ve Merdivenler: Günlük paspaslama, tırabzan dezenfeksiyonu ve cam silimi.",
          "Kapalı Otoparklar: Binicili zemin yıkama makineleriyle egzoz isi ve yağ lekelerinin temizlenmesi.",
          "Çöp Toplama ve Şut Dezenfeksiyonu: Her gün belirlenen saatlerde kapıdan çöp alımı ve çöp odalarının dezenfeksiyonu."
        ]
      },
      {
        "type": "h2",
        "text": "3. VIP Concierge, Resepsiyon ve Kargo Otomasyonu"
      },
      {
        "type": "p",
        "text": "Rezidans ve iş merkezlerinin vitrini lobilerdir. Karşılama personeli gelen kargoları teslim alıp kayıt altına alır ve sakine bildirir. Misafir yönlendirmeleri otel nezaketinde yürütülür."
      },
      {
        "type": "h2",
        "text": "4. Peyzaj, Otomatik Sulama ve Bitki Besleme"
      },
      {
        "type": "p",
        "text": "Yeşil alanlar sitelerin en büyük prestij kaynağıdır. Peyzaj ekiplerimizce çim biçme, mevsimlik çiçeklendirme, ağaç budama, gübreleme ve otomatik sulama nozullarının periyodik açı ayarları yapılır."
      },
      {
        "type": "h2",
        "text": "5. Vektör Kontrolü ve Sıfır Atık Yönetimi"
      },
      {
        "type": "p",
        "text": "Haşere, kemirgen ve sivrisineklere karşı ruhsatlı ürünlerle periyodik ilaçlama yapılır. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Sıfır Atık Yönetmeliği ilkelerine uygun olarak kağıt, cam, plastik ve organik atıklar ayrıştırılır ve geri dönüşüme verilir."
      },
      {
        "type": "h2",
        "text": "6. Soft Hizmetlerde Kalite Kontrol ve KPI Takibi"
      },
      {
        "type": "p",
        "text": "Destek hizmetlerimiz düzenli denetimler ve sakin geri bildirimleriyle izlenir. Düşük memnuniyet alan noktalarda personel ve süreç iyileştirmesi yapılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Temizlik personeli iş kazası geçirirse sorumluluk kime aittir?\nCevap: Profesyonel yönetim şirketi bünyesinde bordrolanan personeller için İSG ve SGK yükümlülükleri işveren sıfatıyla şirkete aittir."
      },
      {
        "type": "p",
        "text": "Soru: Güvenlik görevlilerinin nöbet çizelgeleri nasıl denetlenir?\nCevap: Nöbet ve devriye kayıtları RFID devriye kontrol noktalarıyla izlenir, devriye aksamaları tespit edilebilir."
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
        "text": "Merkezi sistem binalarda ortak alan ve daire içi iklimlendirme işletme maliyetlerinin önemli bir bölümünü oluşturur. Profesyonel teknik işletme kapsamında:"
      },
      {
        "type": "ul",
        "items": [
          "Kazan Dairesi ve Brülör Bakımları: Yanma verimliliği analizleri ile doğalgaz tüketiminin düşürülmesi hedeflenir.",
          "Chiller ve Soğutma Kuleleri: Gaz kaçak testleri, kondenser kimyasal yıkamaları ve glikol donma testleri.",
          "Klima Santralleri (AHU) ve Fan-Coil: Filtre değişimleri, serpantin dezenfeksiyonu ve hava debisi optimizasyonu.",
          "Isı Pay Ölçer ve Kalorimetre Okuma: Dairelerin tüketimlerinin adil faturalandırılması."
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
          "Trafo İşletme Sorumluluğu: Yüksek Gerilim İşletme Sorumluluğu mühendislik hizmeti ve trafo yağı dielektrik testleri.",
          "Reaktif Ceza Önleme: Kompanzasyon panolarındaki kondansatörlerin telemetri ile izlenerek dağıtım şirketi cezası riskinin azaltılması.",
          "Jeneratör ve Transfer Panosu: Şebeke kesintisinde otomatik devreye girme testi ve üretici önerisine göre periyodik yağ/filtre bakımları."
        ]
      },
      {
        "type": "h2",
        "text": "3. Asansör ve Yürüyen Merdivenlerde Yeşil Etiket Güvencesi"
      },
      {
        "type": "p",
        "text": "Asansör İşletme ve Bakım Yönetmeliği gereğince tüm asansörler aylık yetkili servis bakımından geçmeli ve akredite A Tipi Muayene Kuruluşları tarafından yılda bir kez denetlenerek Yeşil Bilgi Etiketi almalıdır. Kırmızı etiketli asansörlerin tespiti ve revizyonu şirketimiz koordinasyonunda yürütülür."
      },
      {
        "type": "h2",
        "text": "4. Yangın Güvenlik ve Sprinkler Sistemleri"
      },
      {
        "type": "p",
        "text": "Binaların Yangından Korunması Hakkında Yönetmelik gereğince dizel ve elektrikli yangın pompaları belirli aralıklarla otomatik test edilir. Yangın hidrant debileri, ıslak borulu sprinkler hatları, duman tahliye damperleri ve acil kaçış aydınlatmaları sürekli faal tutulur."
      },
      {
        "type": "h2",
        "text": "5. Su Depoları, Hidrofor ve Pis Su Terfi İstasyonları"
      },
      {
        "type": "p",
        "text": "İçme ve kullanma suyu depoları periyodik olarak ruhsatlı dezenfektanlarla temizlenir, klorlama cihazları kontrol edilir. Otopark tabanlarındaki foseptik ve pis su terfi pompaları seviye flatörleri su baskınlarına karşı yedekli pompalarla çalıştırılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Kırmızı etiketli asansör çalıştırılırsa yöneticinin cezai sorumluluğu nedir?\nCevap: Kırmızı etiketli asansör kullanılmamalıdır. Çalıştırılmaya devam edilir ve kaza olursa yönetici, Türk Ceza Kanunu kapsamında taksirle yaralama veya öldürme nedeniyle yargılanabilir."
      },
      {
        "type": "p",
        "text": "Soru: Jeneratör bakımı ne sıklıkla yapılmalıdır?\nCevap: Bakım sıklığı üreticinin kullanım kılavuzuna göre belirlenir. Genel olarak düzenli yüksüz çalıştırma testleri, akü ve şarj ünitesi kontrolü ile periyodik filtre/yağ bakımı yapılır."
      },
      {
        "type": "cta",
        "text": "Tesisiniz için teknik servis ve bakım anlaşması yapın.",
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
          "Süreklilik: Mülk yönetimi kiracı değişimlerinde aktiftir; tesis yönetimi sürekli sahadadır."
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
        "text": "Soru: Dairem boş kaldığında aidatını kim öder?\nCevap: Daire boş olduğunda aidat ve ortak gider avansını mülk sahibi ödemekle yükümlüdür. Mülk yönetim hizmetimiz dairenin boş kalma süresinin azaltılmasına yardımcı olur."
      },
      {
        "type": "p",
        "text": "Soru: Yurt dışında yaşayan mülk sahipleri için hangi paket uygundur?\nCevap: Hem mülk yönetimi (kira tahsilatı ve vergi) hem de tesis yönetimi (aidat ve bakım takibi) hizmetlerinin bir arada sunulduğu bir paket düşünülebilir."
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
    "tldr": "Profesyonel tesis yönetimi mülkünüzün değerinin korunmasına, plansız arıza maliyetlerinin azaltılmasına, aidatlarda tasarruf fırsatlarına ve komşuluk ihtilaflarının yönetilmesine katkı sağlar.",
    "content": [
      {
        "type": "p",
        "text": "Birçok bina ve site sakini, profesyonel yönetim şirketlerine ödenen hizmet bedelini bir maliyet kalemi olarak görür. Oysa kurumsal bir tesis yönetim şirketiyle çalışmak; sağladığı enerji tasarrufu, toplu satın alma indirimleri, yasal ceza önleme mekanizmaları ve gayrimenkul değer artışıyla kendi maliyetinin karşılanmasına katkı sağlayabilir."
      },
      {
        "type": "h2",
        "text": "Mülk Sahibine ve Kat Malikine 10 Somut Kazanç"
      },
      {
        "type": "ol",
        "items": [
          "Gayrimenkul Değerinin Korunması: Düzenli bakılan, temiz, yeşil alanı korunan ve güvenlik hizmeti alan sitelerde değerin korunmasına katkı sağlanır.",
          "Ortak Alan Bütçesinde Tasarruf Fırsatı: Toplu elektrik tedariki, toptan kimyasal alımları ve jeneratör yakıt anlaşmaları ile giderlerin düşürülmesi hedeflenir.",
          "Pahalı Cihaz Ömürlerinin Uzatılması: Asansör, trafo, hidrofor ve chiller gruplarına yapılan kestirimci ve planlı bakım ile ani ve yüksek maliyetli yenileme masraflarının azaltılması hedeflenir.",
          "Düzenli Aidat Tahsilatı: KMK m.20 kapsamında ihtar ve ilamsız icra takipleriyle borçların diğer maliklere yansımasının önüne geçilmesi hedeflenir.",
          "Komşuluk Huzuru ve Tarafsızlık: Aidat isteme, gürültü ikazı ve kural koyma tartışmaları komşular arasından çıkar; kurumsal ve tarafsız yönetimce yürütülür.",
          "Yasal Uyum ve Ceza Riskinin Azaltılması: Kaçak bekçi çalıştırma, İSG ihlalleri veya asansör kırmızı etiket cezaları kurumsal denetimle azaltılır.",
          "7/24 Şeffaf Mobil Finansal Takip: Kat malikleri her bir kuruşun nereye harcandığını, kasa mevcudunu ve banka hesap ekstrelerini mobil uygulamadan anlık görür.",
          "Acil Müdahale SLA Taahhüdü: Asansörde mahsur kalma, ana boru patlaması veya elektrik kesintilerine karşı teknik ekipler hızlı müdahale eder.",
          "Personel Kıdem Tazminatı ve SGK Takibi: Kapıcı ve temizlikçilerin SGK ve kıdem tazminatı yükümlülükleri kurumsal işveren yapısı altında planlı biçimde yönetilir.",
          "Sürdürülebilirlik ve Sıfır Atık: Çevre dostu enerji kullanımının yanı sıra atık yönetimi Sıfır Atık Yönetmeliği ilkelerine uygun şekilde planlanır."
        ]
      },
      {
        "type": "quote",
        "text": "Profesyonel yönetim bir masraf değil; mülkünüzün değerinin korunmasına katkı sağlayan kurumsal bir destektir."
      },
      {
        "type": "h2",
        "text": "Profesyonel Yönetimin Maliyet Etkisi Nasıl Değerlendirilir?"
      },
      {
        "type": "p",
        "text": "Profesyonel tesis yönetimine geçildiğinde sağlanabilecek tasarruf miktarı sitenin büyüklüğüne, mevcut sözleşmelerine ve tüketimine göre değiştiği için somut bir rakam vaat edilmemektedir. Teklif aşamasında sitenizin kendi verileriyle değerlendirme yapılır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Yönetim şirketinin sözleşme süresi ne kadardır?\nCevap: Sözleşme süresi tarafların anlaşmasıyla belirlenir ve çoğu zaman yıllık dönemler için yapılır. Kat Malikleri Kurulu memnun kaldığı sürece sözleşmeyi uzatır veya memnuniyetsizlik halinde yenilememe hakkına sahiptir."
      },
      {
        "type": "p",
        "text": "Soru: Site adına açılan banka hesabındaki para yönetim şirketine mi ait olur?\nCevap: Hayır. Banka hesabı site veya bina adına açılır. Yönetim şirketi sadece kat malikleri kurulu kararları ve işletme projesi çerçevesinde yetkili temsilcidir; kat malikleri ve denetçi hesap hareketlerini inceleyebilir."
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
    "pillar": "/hizmetler/tesis-yonetimi",
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
          "İşletme Projesi (Bütçe) Tanzimi: KMK m.37 gereğince bir yıllık tahmini gelir-gider bütçesinin hazırlanıp kat malikleri kuruluna sunulması ve onaylatılması.",
          "Aidat ve Avans Tahsilatı: Ortak gider paylarının toplanması, ödemeyen kat maliklerine ihtar çekilmesi ve icra takibi açılması.",
          "Banka Hesabı Açılması: Site veya bina adına müstakil banka hesabı açılması ve tüm paranın bu hesapta şeffafça işletilmesi.",
          "Genel Kurul Çağrıları: Kat malikleri kurulunun olağan ve olağanüstü toplantılara usulüne uygun olarak davet edilmesi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Mali ve İdari Şeffaflık Yükümlülüğü"
      },
      {
        "type": "p",
        "text": "Yönetim şirketi; vekil sıfatıyla yürüttüğü faaliyetlerin hesabını vermekle mükelleftir. Yıl içinde denetçilerin yapacağı denetimlere tüm faturaları, banka dekontlarını ve sözleşmeleri eksiksiz sunmak zorundadır."
      },
      {
        "type": "h2",
        "text": "3. Personel, SGK ve İSG Sorumlulukları"
      },
      {
        "type": "p",
        "text": "Tesiste çalışan güvenlik, temizlik ve teknik personelin SGK giriş-çıkış bildirimleri, maaş bordroları, kıdem ve ihbar tazminatı fonları ve 6331 Sayılı İş Sağlığı ve Güvenliği eğitimleri şirketimizin sorumluluğundadır."
      },
      {
        "type": "h2",
        "text": "4. Yöneticinin Cezai Sorumluluğu (TCK Hükümleri)"
      },
      {
        "type": "p",
        "text": "Site aidatlarını şahsi hesaplarda tutmak veya yetkisiz para toplamak, somut olayın koşullarına göre Türk Ceza Kanunu kapsamında güveni kötüye kullanma suçunu gündeme getirebilir. Kurumsal yönetim bu riskleri azaltmaya yardımcı olur."
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
        "text": "Soru: Denetçi yönetim şirketini nasıl denetler?\nCevap: Denetçi KMK uyarınca belirli aralıklarla kasa, banka hesapları, gelir-gider makbuzları ve karar defterini inceler ve raporunu kat malikleri kuruluna sunar."
      },
      {
        "type": "cta",
        "text": "Yasal süreçler ve yönetim danışmanlığı hakkında bilgi alın.",
        "href": "/hizmetler/tesis-yonetimi",
        "label": "Yönetim Danışmanlığı Hizmetimiz"
      }
    ]
  },
  {
    "slug": "tesis-yonetim-plani-nasil-hazirlanir-adim-adim-rehber",
    "title": "Tesis Yönetim Planı Nasıl Hazırlanır? Adım Adım İşletme ve Bütçe Planlama Rehberi",
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
          "Bölüm 6: İhtilafların Çözümü ve Arabuluculuk: Mahkeme ve arabuluculuk süreçleri."
        ]
      },
      {
        "type": "h2",
        "text": "2. Yönetim Planı Değişikliği İçin Oy Şartı (4/5 ve 2/3)"
      },
      {
        "type": "p",
        "text": "Yönetim planının değiştirilebilmesi için genel yapılarda KMK m.28/3 uyarınca bütün kat maliklerinin beşte dördünün (4/5) olumlu oyu gerekir; birden fazla yapıdan oluşan toplu yapılarda (siteler) ise 22 Mayıs 2026'da yürürlüğe giren 7579 sayılı Kanun'la değişen KMK m.70 uyarınca üçte ikinin (2/3) oyu aranır. Bu nisap toplantıya katılanların değil, tapudaki tüm maliklerin oranıdır. Bu nedenle yönetim planı hazırlanırken bir hukukçunun görüşü alınmalıdır."
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
          "Genel Kurul Onayı ve Noter Tasdiki: Kurulda gerekli çoğunlukla (genel yapılarda 4/5, toplu yapılarda 2/3) kabul edilmesi ve gerekli noter işlemlerinin tamamlanması.",
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
          "KMK Emredici Hükümlerine Aykırı Maddeler: Kanuna aykırı koyulan maddeler (örneğin \"aidat ödemeyenin suyu kesilir\" gibi) mahkemece kendiliğinden hükümsüz sayılabilir.",
          "Otopark Tahsislerinin Hatalı Yapılması: Eklenti olmayan ortak alan otoparklarının belirli dairelere tapusuz mülkiyet gibi tahsis edilmesi ileride uyuşmazlıklara yol açabilir.",
          "Toplu Yapı Temsilciler Kurulu Yetkisinin Belirsiz Bırakılması: KMK m.66-70'e uygun kurul tanımlanmadığında bloklar arası yetki çatışması yaşanır."
        ]
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Yönetim planında evcil hayvan yasağı varsa köpek beslenebilir mi?\nCevap: Yönetim planında açıkça \"bağımsız bölümlerde evcil hayvan beslenemez\" hükmü varsa ve bu tescilliyse komşular dava açabilir; sonuç somut olaya ve mahkemenin değerlendirmesine bağlıdır. Bir avukatın görüşünü alın."
      },
      {
        "type": "p",
        "text": "Soru: Yeni ev alan kişi eski yönetim planına uymak zorunda mıdır?\nCevap: Evet. KMK m.28 uyarınca yönetim planı bağımsız bölümü sonradan edinenleri bağlar, kiracılar da bu kurallara uymak zorundadır."
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
        "text": "Modern metropollerde A+ rezidans projeleri, yalnızca bir barınma alanı değil; sakinlerine otel konforuna yakın, kesintisiz hizmet sunan prestijli yaşam merkezleridir. Ancak lüks bir rezidansın piyasa değerini koruması ve sakin memnuniyetini en üst düzeyde tutması, uluslararası standartlarda profesyonel entegre tesis yönetimi ile mümkündür."
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
          "Kargo Teslim Düzeni: Kuryelerin daire katlarına çıkışını azaltan kayıtlı teslim ve sakine anlık SMS bildirimi.",
          "Resepsiyon Kadrosu: Misafir ve sakinlerle iletişimde profesyonel danışma hizmeti.",
          "Vale ve Kapalı Otopark PTS: Plaka tanıma sistemi ile misafir ve sakin araçlarının otopark kat yetkilendirmesi.",
          "Daire İçi Hizmet Koordinasyonu: Sakinlerin talep ettiği hizmetlerin koordinasyonu."
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Lisanslı Özel Güvenlik ve Geçiş Kontrol Sistemleri"
      },
      {
        "type": "p",
        "text": "Lüks rezidanslarda mahremiyet ve güvenlik en kritik önceliktir. T.C. İçişleri Bakanlığı 5188 sayılı kanun kapsamında lisanslı özel güvenlik personelimiz ve grup şirketimiz 3G Özel Güvenlik desteğiyle tesis güvenliği 7/24 organize edilir."
      },
      {
        "type": "quote",
        "text": "Rezidans güvenliği sadece kapıdaki görevli değil; çevre güvenlik kameraları, asansör kat yetkilendirme kartları ve yangın erken uyarı sistemlerinin entegre çalışmasıdır."
      },
      {
        "type": "h2",
        "text": "3. Sosyal Tesis, Havuz & Spa Hijyen Standartları"
      },
      {
        "type": "p",
        "text": "Kapalı ve açık yüzme havuzları, fitness salonları, sauna ve buhar odalarında su kalitesi (klor, pH vb.) düzenli ölçümlerle izlenir ve tesisler ilgili mevzuata uygun işletilir."
      },
      {
        "type": "h2",
        "text": "4. Akıllı Bina Otomasyonu (BMS) ve Daire İçi Hızlı Teknik Destek"
      },
      {
        "type": "p",
        "text": "Rezidans sakinleri mobil uygulama üzerinden tek tıkla arıza kaydı oluşturabilir. Teknik ekiplerimiz sigorta atması, su sızıntısı veya klima arızalarına hızla daire kapısında müdahale etmeyi hedefler."
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
        "text": "Soru: Rezidans aidatları neden normal apartmanlardan yüksektir?\nCevap: Concierge, güvenlik, havuz ısıtması, jeneratör yakıtı ve bina otomasyonu gibi hizmetlerin işletme maliyetleri bütçeye yansır."
      },
      {
        "type": "p",
        "text": "Soru: Kargo ve kurye güvenliği rezidansta nasıl sağlanır?\nCevap: Dışarıdan gelen kuryelerin paketleri güvenlik lobisinde kayıt altına alınır ve sakine bildirim yapılarak temas riski azaltılır."
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
    "description": "A sınıfı iş merkezleri ve plazalarda merkezi iklimlendirme otomasyonu ve kompanzasyon panosu takibi ile enerji verimliliği.",
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
    "tldr": "Ticari plazalarda merkezi HVAC otomasyonu ve kompanzasyon takibi ile ortak alan elektrik ve işletme giderlerinde tasarruf hedeflenir.",
    "content": [
      {
        "type": "p",
        "text": "Ticari plazalar, iş merkezleri ve A sınıfı ofis kulelerinde işletme maliyetlerinin önemli bir bölümünü enerji tüketimi (elektrik, doğalgaz ve soğutma grupları) oluşturur. Doğru bir tesis yönetimi stratejisi, çalışma konforundan ödün vermeden enerji faturalarını optimize eder."
      },
      {
        "type": "h2",
        "text": "1. Bina Otomasyon Sistemi (BMS) ve HVAC Optimizasyonu"
      },
      {
        "type": "p",
        "text": "Bina otomasyonu bulunan plazalarda chiller soğutma grupları, klima santralleri (AHU) ve VRF sistemleri; çalışma saatleri, dış hava sıcaklığı ve doluluk sensörlerine göre otomatik olarak modüle edilebilir. Gece ve hafta sonu bekleme modları gereksiz tüketimin önlenmesine yardımcı olur."
      },
      {
        "type": "h2",
        "text": "2. Kompanzasyon Panosu Takibi ve Reaktif Ceza Önleme"
      },
      {
        "type": "p",
        "text": "Elektrik dağıtım şirketlerinin reaktif enerji sınırlarını aşan plazalara uyguladığı yüksek cezalar, IoT destekli anlık kompanzasyon panosu izleme sistemleri ile azaltılması hedeflenir."
      },
      {
        "type": "ul",
        "items": [
          "Endüktif ve kapasitif oranların uzaktan telemetri ile izlenmesi",
          "Harmonik filtreler ve kondansatör kademe bakımlarının periyodik yapılması",
          "Elektrik faturalarının tarife uygunluğunun kontrolü"
        ]
      },
      {
        "type": "h2",
        "text": "3. LEED ve BREEAM Yeşil Bina Standartlarına Uyum"
      },
      {
        "type": "p",
        "text": "LEED ve BREEAM gibi uluslararası çevre sertifikasyonları, kurumsal çok uluslu kiracıların plaza seçiminde önemli kriterlerden biridir. Enerji verimliliği, su geri kazanımı ve LED aydınlatma otomasyonu bu standartlara uyuma katkı sağlayabilir; sertifikasyonun kendisi ayrı bir başvuru ve denetim gerektirir."
      },
      {
        "type": "h2",
        "text": "4. Kurumsal Kiracı Yönetimi ve Alt Sayaç Faturalandırması"
      },
      {
        "type": "p",
        "text": "Plaza sakinlerinin ve kurumsal kiracıların gider paylaşımları, bağımsız bölüm metrekareleri ve ısı pay ölçer endekslerine göre şeffaf yazılım üzerinden adil biçimde faturalandırılır."
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
        "text": "Soru: Reaktif enerji cezası nedir ve nasıl engellenir?\nCevap: Tesisin şebekeden çektiği endüktif veya kapasitif reaktif güç yasal sınırları (güncel mevzuata göre %20 endüktif, %15 kapasitif) aştığında dağıtım şirketi ek bedel faturası keser. Otomatik kompanzasyon panosu ve anlık telemetri ile bu bedelin önüne geçilmesi hedeflenir."
      },
      {
        "type": "p",
        "text": "Soru: BMS bina otomasyon sistemi ne kadar enerji tasarrufu sağlar?\nCevap: Doğru kalibre edilmiş ve programlanmış bir BMS otomasyonu, plazanın HVAC ve aydınlatma elektrik tüketiminde tasarruf sağlanmasına yardımcı olabilir; sonuç tesise göre değişir."
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
    "description": "Çok bloklu büyük toplu konut sitelerinde blok temsilciler kurulu işleyişi, ölçek ekonomisi ile toplu satın alma ve aidatlarda tasarruf formülü.",
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
    "tldr": "1.000+ bağımsız bölümlü mega toplu konutlarda ölçek ekonomisi ve toplu tedarik gücü ile aidatlarda maliyet tasarrufu fırsatı doğar.",
    "content": [
      {
        "type": "p",
        "text": "Yüzlerce hatta binlerce bağımsız bölümden oluşan mega toplu konut projelerinde amatör veya münferit blok yönetimleri; fahiş maliyetlere, tahsilat krizlerine ve bakım aksaklıklarına yol açar. Alo Yönetim merkezi yönetim modeli bu sorunları azaltmayı hedefler."
      },
      {
        "type": "h2",
        "text": "1. KMK Toplu Yapı Hükümleri ve Temsilciler Kurulu İşleyişi"
      },
      {
        "type": "p",
        "text": "634 Sayılı Kat Mülkiyeti Kanunu m.66-70 uyarınca toplu yapı yönetim planı hazırlanır. Blok kat malikleri kurulları kendi temsilcilerini seçer; toplu yapı temsilciler kurulu ise profesyonel yöneticiyi yetkilendirir."
      },
      {
        "type": "h2",
        "text": "2. Ölçek Ekonomisi ile Aidat Tasarrufu Nasıl Sağlanır?"
      },
      {
        "type": "ul",
        "items": [
          "Toplu Asansör Bakım Anlaşması: Çok sayıda asansör için tek sözleşmeyle parça ve bakımda maliyet avantajı",
          "Ortak Elektrik ve Doğalgaz İndirimi: Serbest tüketici statüsünün uygulanabildiği hâllerde daha uygun birim fiyat arayışı",
          "Endüstriyel Kimyasal & Temizlik Malzemesi: Toptan tedarik",
          "Merkezi Güvenlik ve Temizlik Vardiya Optimizasyonu: Gereksiz personel maliyetlerinin azaltılması"
        ]
      },
      {
        "type": "h2",
        "text": "3. Şeffaf Tahsilat ve Dijital Mobil Takip"
      },
      {
        "type": "p",
        "text": "Tüm sakinler mobil uygulama üzerinden aidatlarını kredi kartıyla ödeyebilir, bütçe harcamalarını ve faturaları kalem kalem anlık inceleyebilir."
      },
      {
        "type": "h2",
        "text": "4. Bloklar Arası Eşit ve Adil Hizmet Dağılımı"
      },
      {
        "type": "p",
        "text": "Büyük sitelerde en çok yaşanan şikayet \"Bizim bloğa temizlikçi az geliyor, diğer blok daha iyi bakılıyor\" serzenişidir. Kontrol noktası uygulamasıyla her bloğun temizlik, teknik ve güvenlik devriye saatleri izlenebilir."
      },
      {
        "type": "h2",
        "text": "5. Mega Sitelerde Güvenlik ve Giriş-Çıkış Trafiği Yönetimi"
      },
      {
        "type": "p",
        "text": "Günde on binlerce aracın ve kuryenin giriş yaptığı mega sitelerde PTS (Plaka Tanıma Sistemi) ve misafir geçiş yönetimi ile grup şirketimiz 3G Özel Güvenlik desteğiyle nizamiye yığılmalarının azaltılması hedeflenir."
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
        "text": "Soru: Toplu konutlarda aidatını ödemeyen bloklara karşı ne yapılır?\nCevap: Yönetim planı ve KMK hükümleri çerçevesinde ortak gider borcunu ödemeyen bağımsız bölümler hakkında toplu yapı yönetimi icra takibi başlatabilir."
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
    "description": "Fabrikalar, lojistik depolar ve organize sanayi tesislerinde ağır teknik bakım, yangın hidrant hatları ve iş kazalarını önlemeye odaklı entegre yönetim.",
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
    "tldr": "Endüstriyel tesis ve fabrikalarda ISO 45001 iş sağlığı, yangın hidrant hatları periyodik testi ve 5188 perimetre güvenliği kaza önleme hedefiyle yönetilir.",
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
        "text": "Tesis içerisindeki forklift yolları, kimyasal depolama alanları ve yüksek gerilim trafo merkezleri sürekli denetlenir. Risk analizi ve acil durum tahliye tatbikatları periyodik olarak güncellenir."
      },
      {
        "type": "h2",
        "text": "2. Yangın Hidrant, Sprinkler ve Duman Tahliye Sistemleri"
      },
      {
        "type": "p",
        "text": "Binaların Yangından Korunması Hakkında Yönetmelik gereğince yangın pompaları belirli aralıklarla otomatik test edilir, hidrant debileri ve köpüklü söndürme sistemleri kayıt altına alınır."
      },
      {
        "type": "h2",
        "text": "3. Fabrika Perimetre Güvenliği ve Giriş-Çıkış Lojistik Kontrolü"
      },
      {
        "type": "p",
        "text": "Araç giriş-çıkış kayıtları, sevkiyat irsaliye kontrolleri ve ziyaretçi kontrolleri grup şirketimiz 3G Özel Güvenlik desteğiyle yürütülür."
      },
      {
        "type": "h2",
        "text": "4. Tehlikeli Atık Yönetimi ve Çevre Mevzuatı"
      },
      {
        "type": "p",
        "text": "Sanayi atıkları, kontamine ambalajlar ve atık yağlar çevre mevzuatı uyarınca MOTAT (Mobil Atık Takip Sistemi) üzerinden lisanslı bertaraf tesislerine sevk edilir."
      },
      {
        "type": "h2",
        "text": "5. Ağır Tesis Mekanik ve Kazan Dairesi İşletimi"
      },
      {
        "type": "p",
        "text": "Buhar kazanları, basınçlı hava kompresörleri, kule tipi soğutma sistemleri ve endüstriyel arıtma tesisleri teknik kadro tarafından vardiyalı olarak işletilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Fabrikalarda yangın pompası testleri ne sıklıkla yapılmalıdır?\nCevap: Yangın pompaları yönetmeliğin ve üreticinin öngördüğü aralıklarla test edilmeli, debi ve basınç testleri ise kayıt altına alınmalıdır."
      },
      {
        "type": "p",
        "text": "Soru: Organize Sanayi Bölgelerinde (OSB) tesis yönetimi avantajı nedir?\nCevap: OSB mevzuatına uyum, ağır bakım maliyetlerinin yönetilmesi ve İSG teftişlerinde ceza riskinin azaltılmasına yardımcı olur."
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
        "text": "Site veya tesis yönetimini profesyonel bir şirkete devretmek, mülkünüzün değerini artırırken aidat ihtilaflarını ve teknik arıza risklerini azaltmaya yardımcı olur. Ancak piyasada yetkin olmayan merdiven altı firmalara karşı dikkatli olunmalıdır."
      },
      {
        "type": "h2",
        "text": "10 Maddelik Yönetim Şirketi Değerlendirme Kriterleri"
      },
      {
        "type": "ul",
        "items": [
          "1. Akredite kuruluşça verilmiş güncel ISO yönetim sistemi belgeleri (ör. ISO 45001 İSG, ISO 14001 Çevre)",
          "2. T.C. İçişleri Bakanlığı / Emniyet onaylı 5188 Özel Güvenlik Faaliyet İzin Belgesi",
          "3. Belgelerin belge numarası ve belgelendirme kuruluşu üzerinden doğrulanabilir olması",
          "4. En az 10 yıl sektörel tecrübe ve aktif yönetilen 200+ bağımsız bölüm referansı",
          "5. Mesleki Sorumluluk ve 3. Şahıs Mali Mesuliyet Sigorta Poliçesi",
          "6. KMK m.37 çerçevesinde şeffaf bütçe ve raporlama",
          "7. Acil teknik arıza müdahale SLA taahhüdü",
          "8. Sakinlere özel 7/24 mobil aidat, arıza ve otopark takip yazılımı",
          "9. Hukuki icra ve aidat takip departmanının şirket bünyesinde bulunması",
          "10. Tutanakla yapılan devir teslim ve eksiksiz demirbaş sayım protokolü"
        ]
      },
      {
        "type": "h2",
        "text": "Teknik İhale Şartnamesi (RFP) Nasıl Hazırlanır?"
      },
      {
        "type": "p",
        "text": "Teklif almadan önce bağımsız bölüm sayısı, blok yapısı, ortak alan cihaz envanteri ve güvenlik noktalarını içeren teknik bir şartname hazırlanmalıdır."
      },
      {
        "type": "h2",
        "text": "Eski Yönetimden Devir Teslim Protokolü"
      },
      {
        "type": "p",
        "text": "Yeni yönetim şirketi göreve başlarken karar defteri, işletme defteri, geçmiş banka ekstreleri, SGK dosyaları ve ortak alan anahtarları tutanakla teslim alınır; kasa sayımı yapılarak eksiklikler tespit edilir."
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
        "text": "Soru: Yönetim şirketi sözleşmesi kaç yıllık yapılmalıdır?\nCevap: Yönetici, kat malikleri kurulu kararıyla seçilir; sözleşme süresi sözleşmede belirlenir, çoğu zaman 1 yıllık yapılır ve kurul onayıyla yenilenir."
      },
      {
        "type": "p",
        "text": "Soru: Yönetim şirketinden memnun kalınmazsa sözleşme nasıl feshedilir?\nCevap: Kat Malikleri Kurulu gerekli çoğunlukla toplanarak yöneticiyi görevden alma kararı alabilir; sözleşmenin feshi ise sözleşme hükümlerine ve haklı neden bulunup bulunmadığına göre değerlendirilir."
      },
      {
        "type": "cta",
        "text": "Siteniz için tesis yönetimi rehberimizi inceleyin.",
        "href": "/hizmetler/tesis-yonetimi/rehber",
        "label": "Tesis Yönetimi Rehberimizi İnceleyin"
      }
    ]
  },
  {
    "slug": "5188-ozel-guvenlik-gorevlisi-egitimi-ve-kimlik-yenileme-rehberi-2026",
    "title": "5188 Sayılı Özel Güvenlik Görevlisi Eğitimi ve Kimlik Yenileme Rehberi (2026)",
    "description": "5188 sayılı kanun kapsamında silahlı ve silahsız özel güvenlik eğitimi, 5 yılda bir kimlik kartı yenileme, sağlık raporu şartları ve kariyer fırsatları.",
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
    "tldr": "5188 sayılı Kanun kapsamında özel güvenlik görevlisi olmak veya 5 yılda bir kimlik kartını yenilemek için Emniyet Genel Müdürlüğü denetiminde yetkili kurumlardan eğitim almak ve gerekli sınavlarda başarılı olmak şarttır.",
    "content": [
      {
        "type": "p",
        "text": "Toplu yaşam alanlarında, rezidanslarda, plazalarda ve kamu kurumlarında can ve mal güvenliğinin sağlanması, profesyonel ve eğitimli özel güvenlik personeli ile mümkündür. T.C. İçişleri Bakanlığı Emniyet Genel Müdürlüğü denetiminde yürütülen 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun; özel güvenlik görevlilerinin temel eğitimlerini, silah taşıma yetkilerini ve 5 yılda bir zorunlu olan kimlik kartı yenileme süreçlerini net kurallara bağlamıştır."
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
          "Silahsız Özel Güvenlik Eğitimi: Başvuru şartları (yaş, öğrenim durumu vb.) 5188 sayılı Kanun ve uygulama yönetmeliğinde belirlenir. Temel eğitim yaklaşık 100 ders saatidir ve güvenlik hukuku, yangın, ilkyardım, etkili iletişim gibi derslerden oluşur.",
          "Silahlı Özel Güvenlik Eğitimi: Temel eğitime ek olarak silah bilgisi ve gerçek atış dersi eklenir, toplam yaklaşık 120 ders saatine ulaşır. Başvuru şartları için güncel mevzuatı kontrol edin.",
          "Sağlık Raporu: Mevzuatın aradığı şekilde yetkili sağlık kuruluşundan alınmış, \"özel güvenlik görevlisi olur\" ibareli sağlık raporu gerekir; kapsamı için güncel mevzuatı kontrol edin."
        ]
      },
      {
        "type": "h2",
        "text": "2. 5 Yılda Bir Zorunlu Kimlik Yenileme Eğitimi ve Sınavı"
      },
      {
        "type": "p",
        "text": "Özel Güvenlik Görevlisi Kimlik Kartı süresi 5 yıldır. EGM dokümanlarına göre yenileme için en az 60 ders saatlik yenileme eğitimi gerekir; görevlilerin mesleki haklarını kaybetmemesi için süreleri yakından takip etmesi, güncel kuralları ve başvuru takvimini Emniyet Genel Müdürlüğü veya yetkili kurumdan teyit etmesi gerekir."
      },
      {
        "type": "h2",
        "text": "3. Alo Güvenlik Eğitimi"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz Alo Güvenlik (guvenlikkursu.com), Emniyet Genel Müdürlüğü onaylı bir özel güvenlik eğitim kurumudur. Kurs ve başvuru bilgileri için sitesini ziyaret edebilirsiniz."
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
        "text": "Soru: Özel güvenlik kimlik kartı ne kadar sürede çıkar?\nCevap: Süre, yazılı sınav sonuçlarının açıklanmasına ve Valilik İl Emniyet Müdürlüğü Güvenlik Soruşturması ve Arşiv Araştırması sürecinin tamamlanmasına bağlıdır."
      },
      {
        "type": "p",
        "text": "Soru: Kimlik süresi dolduktan sonra güvenlik görevlisi çalışmaya devam edebilir mi?\nCevap: Hayır. Kimlik süresi dolmuş görevli çalıştırılamaz; çalıştırılması halinde site yönetimine ve şirkete 5188 sayılı Kanun'da öngörülen idari yaptırımlar uygulanabilir."
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
        "text": "Bir konut sitesinin veya rezidansın huzuru, kapıdaki güvenlik hizmetinin niteliğiyle doğrudan ilişkilidir. Piyasadaki yetkisiz taşeronlar veya belgesiz danışmanlık firmaları, kat maliklerini hem idari para cezalarıyla hem de güvenlik zafiyetleriyle baş başa bırakabilir. Bu nedenle kurumsal bir özel güvenlik şirketi seçimi hayati önem taşır."
      },
      {
        "type": "h2",
        "text": "1. Özel Güvenlik Şirketi Seçerken Aranacak 8 Kritik Kriter"
      },
      {
        "type": "ul",
        "items": [
          "1. T.C. İçişleri Bakanlığı Faaliyet İzin Belgesi: Şirketin 5188 sayılı kanun kapsamında resmi güvenlik hizmeti verme yetkisi tescilli olmalıdır.",
          "2. 3. Şahıs Mali Mesuliyet Sigortası: Hırsızlık, sabotaj veya personelin ihmalinden doğabilecek zararlar için yeterli teminatlı poliçe.",
          "3. 3G Özel Güvenlik (3gguvenlik.com) Operasyonel Güvencesi: Grup şirketimiz bünyesinde saha denetimi ve süpervizör desteği.",
          "4. Personel Eğitim ve Sertifikasyonu: Tüm personelin lisanslı ve eğitimli olması; eğitimlerin Alo Güvenlik (guvenlikkursu.com) gibi yetkili kurumlardan alınması.",
          "5. RFID Destekli Devriye Takibi: Güvenlik görevlisinin devriyelerinin kontrol noktaları üzerinden kayıt altına alınması.",
          "6. PTS ve Kamera Entegrasyonu: Giriş yapan araçların plaka tanıma sistemiyle kaydı.",
          "7. Yedek Personel Taahhüdü: İzin, rapor veya ani ayrılmalarda yedek personel planı.",
          "8. Bordro ve SGK Şeffaflığı: Görevlilerin maaş, fazla mesai ve SGK primlerinin zamanında ödendiğine dair aylık dökümün yönetime sunulması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Kaçak Bekçi Çalıştırmanın Ağır Hukuki Riskleri"
      },
      {
        "type": "quote",
        "text": "5188 lisansı ve Valilik Özel Güvenlik İzni (ÖGİ) olmadan üniforma giydirilen bekçiler, site yönetimine idari para cezası doğurabilir."
      },
      {
        "type": "p",
        "text": "Emniyet ve Jandarma ekiplerinin yaptığı denetimlerde, lisanssız görevli çalıştıran apartman yöneticileri hakkında 5188 kapsamında idari ve gerektiğinde adli işlem uygulanabilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: Sitede özel güvenlik çalıştırmak için kat malikleri kurulu kararı gerekir mi?\nCevap: Evet. Kat Malikleri Kurulu'nda özel güvenlik hizmeti alınması yönünde karar alınmalı ve ardından Valilik nezdindeki yetkili özel güvenlik birimine başvurulmalıdır."
      },
      {
        "type": "p",
        "text": "Soru: Güvenlik şirketinin sözleşme süresi ne olmalıdır?\nCevap: Genellikle sözleşmeler 1 yıllık yapılır; performans değerlendirmesine ve SLA memnuniyetine göre her yıl yenilenir."
      },
      {
        "type": "cta",
        "text": "3G Güvenlik desteğiyle siteniz için güvenlik keşfi talep edin.",
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
        "text": "Kat Mülkiyeti Kanunu Madde 20/2 açık hükmü gereğince: \"Gider veya avans payını ödemeyen kat maliki, ödemede geciktiği günler için aylık yüzde beş hesabıyla gecikme tazminatı ödemekle yükümlüdür.\" Bu tazminat yasal faizden tamamen bağımsızdır ve yıllık bazda yüksek, caydırıcı bir orana karşılık gelir."
      },
      {
        "type": "ul",
        "items": [
          "Gecikme Tazminatının Başlangıç Tarihi: Aidatın son ödeme gününü takip eden ilk gündür.",
          "Genel Kurul Kararı Olmasa Bile Geçerlilik: Kanun emredici olduğu için genel kurulda karar alınmamış olsa dahi aylık %5 tazminat kanunen tahsil edilir.",
          "Yargıtay İçtihatları: Yargıtay uygulamasına göre gecikme tazminatı borcun aslıyla birlikte takibe konur."
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
        "text": "Kat malikinin ortak gider borcundan, bağımsız bölümde oturan kiracı da ödemekle yükümlü olduğu kira miktarı kadar müteselsilen sorumludur. İcra dairesi haciz ihbarnamesi ile kiracıya kira ödemesini doğrudan site banka hesabına yatırmasını emredebilir."
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
        "text": "Borçlunun takibe itiraz etmesi halinde açılan itirazın iptali davasında haksız çıkan borçlu, alacak likit ise ana borç ve gecikme tazminatına ek olarak borcun en az %20'si oranında icra inkar tazminatı ödemeye mahkum edilebilir."
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
        "text": "Hukuk desteğiyle aidat tahsilat sürecinizi düzene sokun.",
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
        "text": "Bir konut sitesinde veya apartmanda güvenlik görevlisi bulundurabilmek için yalnızca bir şirketle anlaşmak veya eleman işe almak yeterli değildir. 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun gereğince, güvenliğin sağlanacağı tesis için yetkili mülki idare amirliğinden (Valilik) Özel Güvenlik İzni (ÖGİ) alınması yasal bir zorunluluktur."
      },
      {
        "type": "h2",
        "text": "1. Valilik Özel Güvenlik İzni (ÖGİ) Başvuru Adımları"
      },
      {
        "type": "ol",
        "items": [
          "Kat Malikleri Kurulu Kararı: Karar defterine \"Sitemizde 5188 sayılı kanun kapsamında özel güvenlik hizmeti alınmasına ve Valiliğe başvurulmasına\" dair karar yazılır ve gerekli noter işlemleri tamamlanır.",
          "Müracaat Dosyası Tanzimi: Sitenin tapu bilgileri, bağımsız bölüm sayısı, vaziyet planı, risk analiz formu ve güvenlik noktalarını gösteren kroki hazırlanır.",
          "İl Özel Güvenlik Komisyonu İncelemesi: Komisyon dosyayı inceler ve yerinde keşif yapar.",
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
        "text": "5188 Sayılı Kanun uyarınca: Özel güvenlik izni almadan özel güvenlik görevlisi istihdam eden veya hizmet alan kişi ve yöneticilere idari para cezası uygulanır ve faaliyet durdurulabilir."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "p",
        "text": "Soru: ÖGİ belgesi kaç yılda bir yenilenir?\nCevap: Özel Güvenlik İzin Belgesinin geçerlilik süresi ve revizyon şartları mevzuatla belirlenir; personel sayısı veya silah durumu değiştiğinde komisyondan revizyon kararı alınmalıdır."
      },
      {
        "type": "p",
        "text": "Soru: ÖGİ başvuru sürecini kim takip eder?\nCevap: Alo Yönetim ve grup şirketimiz 3G Güvenlik, dosya hazırlık ve Valilik takip süreçlerinde site yönetimi adına destek verebilir."
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
    "description": "Sitelerde 7/24 entegre güvenlik operasyonu: nizamiyede kimlik kontrolü, plaka tanıma, çevre güvenlik kameraları ve acil durum müdahale protokolleri.",
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
    "tldr": "Entegre site güvenliği; eğitimli 5188 personeli, çevre güvenlik kameraları, akıllı plaka tanıma bariyerleri ve 7/24 operasyon merkezi takibi ile sağlam bir koruma oluşturur.",
    "content": [
      {
        "type": "p",
        "text": "Modern toplu konut ve rezidanslarda güvenlik, yalnızca kapıda duran bir bekçiden ibaret değildir. Teknolojik elektronik güvenlik altyapısı ile fiziksel insan gücünün uyum içinde çalıştığı Entegre Güvenlik Yönetim Sistemi, sakinlerin evlerinde huzur içinde yaşamasının anahtarıdır."
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
          "Kargo Kabul ve Güvenlik Odası: Kuryelerin kat aralarında kontrolsüz dolaşımı sınırlandırılarak kargolar lobide teslim alınır ve kayıt altına alınır."
        ]
      },
      {
        "type": "h2",
        "text": "2. 7/24 CCTV İzleme ve Akıllı Video Analizi"
      },
      {
        "type": "p",
        "text": "Kör nokta bırakmayacak şekilde yerleştirilen IP kameralar güvenlik merkezinden izlenir; video analitik özelliği olan sistemlerde sınır ihlali, şüpheli paket, ters yön araç hareketi ve yangın dumanı durumlarında sesli alarm üretilebilir."
      },
      {
        "type": "h2",
        "text": "3. RFID Devriye Tur Sistemi ile Gece Güvenliği"
      },
      {
        "type": "p",
        "text": "Sitenin yangın merdivenleri, kapalı otoparkları, sığınakları ve çevre çitleri boyunca yerleştirilen RFID kontrol noktaları, güvenlik görevlilerimiz tarafından periyodik olarak taranır ve kayıtlar raporlanır."
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
    "dateModified": "2026-10-07T09:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "Site aidat artışları genel olarak sabit bir orana bağlı değildir; ancak 22 Mayıs 2026 tarihli 7579 sayılı Kanun'la, mevcut işletme projesi olan sitelerde geçici proje bedeli bir önceki yıla ilişkin yeniden değerleme oranından fazla artırılamaz (KMK m.37). Aidat, yıllık işletme bütçesindeki personel (SGK/asgari ücret), enerji, bakım ve demirbaş giderlerinin KMK m.20 uyarınca kat maliklerine paylaştırılmasıyla belirlenir.",
    "content": [
      {
        "type": "p",
        "text": "Toplu konutlarda, sitelerde ve rezidanslarda her yılın başında en çok tartışılan konuların başında aidat artış oranları gelir. Kira artışlarındaki TÜFE tavanından farklı olarak Kat Mülkiyeti Kanunu (KMK) aidat artışları için genel bir yüzde belirlemez; ancak 22 Mayıs 2026 tarihli 7579 sayılı Kanun'la, mevcut işletme projesi olan sitelerde geçici projedeki bedelin bir önceki yıla ilişkin yeniden değerleme oranından fazla artırılamayacağı hükme bağlanmıştır (KMK m.37). Kesin uygulama için hukuk danışmanınıza başvurun. Aidat tutarı, binanın fiili giderlerini karşılamak üzere hazırlanan İşletme Projesi bütçesi ile şekillenir."
      },
      {
        "type": "h2",
        "text": "1. Aidat Artışını Belirleyen 4 Temel Maliyet Kalemi"
      },
      {
        "type": "ul",
        "items": [
          "Personel ve SGK Giderleri: Güvenlik, temizlik, teknik servis ve bahçıvan personellerinin asgari ücret artışları, SGK primleri, kıdem tazminatı fonu ve yemek/yol giderleri bütçenin en büyük kalemidir.",
          "Ortak Alan Enerji Maliyetleri: Asansörler, hidroforlar, çevre aydınlatması, kapalı otopark jet fanları ve merkezi kazan yakıt giderlerindeki elektrik/doğalgaz zamları.",
          "Periyodik Bakım ve Sözleşmeli Hizmetler: Asansör yetkili servisleri, jeneratör, trafo, havuz kimyasalları, ilaçlama ve yangın algılama sistemleri yıllık sözleşme artışları.",
          "Olağanüstü Onarım ve Demirbaş Avansı: Çatı aktarımı, dış cephe boyası, kamera sistemi yenilemesi gibi amortisman rezerv fonu."
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
        "text": "Kat malikleri kurulu kararlarına karşı KMK m.33'te öngörülen sürelerde Sulh Hukuk Mahkemesi'nde dava açılabilir (süreler, malikin toplantıya katılıp katılmadığına ve kararın nasıl bildirildiğine göre değişir). 7579 sayılı Kanun ile işletme projesinin onay usulü değiştiği için güncel kuralları bir avukata teyit ettirin."
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
        "text": "İşletme giderlerinden (personel, elektrik, temizlik vb.) kat maliki sorumludur, kiracı da ödemekle yükümlü olduğu kira miktarı kadar müteselsilen sorumludur (KMK m.22); demirbaş ve ana gayrimenkul yenileme giderleri ise yalnızca ev sahibine (kat malikine) aittir."
      },
      {
        "type": "h3",
        "text": "Aidat zammını yönetici tek başına belirleyebilir mi?"
      },
      {
        "type": "p",
        "text": "Yönetici işletme projesini hazırlar; 7579 sayılı Kanun'dan sonra işletme projesi kat malikleri kurulunda onaylanır."
      },
      {
        "type": "cta",
        "text": "Sitenizin aidat bütçesini optimize etmek ve şeffaf yönetim teklifi almak için bize ulaşın.",
        "href": "/teklif-al",
        "label": "Aidat Analizi İsteyin"
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
          "Onaylı İşletme Projesi: KMK m.37 gereğince hazırlanmış, usulüne uygun onaylanmış ve maliklere bildirilmiş yıllık tahmini bütçe.",
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
        "text": "Borçlu takibe haksız olarak itiraz ederse takip durur. Bu durumda site yönetimi Sulh Hukuk Mahkemesinde İtirazın İptali Davası açar. Borçlu haksız çıktığında ana borç, %5 gecikme tazminatı ve yargılama giderlerine ek olarak asgari %20 İcra İnkar Tazminatı ödemeye mahkum edilebilir."
      },
      {
        "type": "h2",
        "text": "4. İcra Takip Masraflarını Kim Öder?"
      },
      {
        "type": "p",
        "text": "Takip açılırken ödenen başvurma harcı, peşin harç, tebligat masrafları ve kanuni avukatlık vekalet ücreti kural olarak borçlu kat malikinden tahsil edilir."
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
        "text": "Soru: İcra takibi ne kadar sürede sonuçlanır?\nCevap: İtiraz edilmeyen dosyalarda takip kesinleştikten sonra hacizler uygulanabilir. İtiraz halinde dava süreci mahkemenin iş yüküne göre değişir ve uzun sürebilir."
      },
      {
        "type": "p",
        "text": "Soru: Kiracı evden ayrılırsa eski aidat borcu kime kalır?\nCevap: KMK uyarınca kat maliki asıl borçludur. Kiracı çıksa bile gayrimenkulün sahibi borçtan sorumlu olmaya devam eder."
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
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "7471 sayılı Kanun ile 6306 sayılı Kanun kapsamındaki kentsel dönüşümde karar çoğunluğu salt çoğunluğa (yarıdan bir fazla) indirilmiştir. Riskli yapı tespiti, lisanslı kuruluşlarca yapılır ve kesinleştiğinde 60+30 günlük tahliye süreci başlar.",
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
        "text": "Kentsel dönüşüm süreci, apartmandaki kat maliklerinden sadece birinin Çevre, Şehircilik ve İklim Değişikliği Bakanlığı lisanslı kuruluşlara başvurmasıyla başlar. Diğer maliklerin onayına gerek yoktur."
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
        "text": "Eski mevzuatta aranan 2/3 çoğunluk şartı, 7471 sayılı Kanun'la (Kasım 2023) arsa payı sahiplerinin Salt Çoğunluğuna (yarıdan bir fazlası - %50+1) indirilmiştir. Artık birkaç kişinin itirazı yüzünden tüm binanın kentsel dönüşümü engellenememektedir."
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
        "text": "Riskli yapı maliklerine ve kiracılarına Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından kira yardımı yapılabilir; kapsamı ve süresi mevzuatla belirlenir. Ayrıca belirli harç ve vergi muafiyetleri uygulanır."
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
        "text": "Soru: Kentsel dönüşüme katılmayan azınlık maliklerin hisseleri ne olur?\nCevap: Salt çoğunluk sağlandıktan sonra dönüşüme katılmayan maliklerin payları rayiç bedel üzerinden öncelikle diğer paydaşlara satılabilir; satış süreci mevzuata göre yürütülür."
      },
      {
        "type": "p",
        "text": "Soru: Riskli yapı tespit raporu masrafını kim öder?\nCevap: Raporu talep eden taraf öder; masrafın nasıl paylaşılacağı mevzuata ve malikler arasındaki anlaşmaya göre belirlenir."
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
        "text": "Türkiye'nin sismik hareketliliği ve özellikle Marmara Bölgesi'ndeki beklenen büyük deprem riski, apartman ve site yönetimlerinin binalarını teknik olarak denetlemesini zorunlu kılmaktadır. Doğru bir deprem risk analizi, can güvenliğini korumanın ve gerekli güçlendirme veya kentsel dönüşüm kararlarını almanın temel bilimsel yoludur."
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
        "text": "6306 Sayılı Kentsel Dönüşüm Kanunu kapsamında düzenlenen \"Riskli Yapı Tespit Raporu\", tapuya şerh düşüldükten sonra kat maliklerine 60 + 30 günlük tahliye ve yıkım süresi tanır. Alo Yönetim, bina sakinleri adına lisanslı kuruluşlarla test sürecinin organize edilmesinde destek verebilir ve güçlendirme / yeniden yapım süreçlerinde tarafsız yönetim danışmanlığı sunabilir."
      },
      {
        "type": "h2",
        "text": "3. Tesis Yönetiminde Deprem Acil Durum Eylem Planı"
      },
      {
        "type": "ul",
        "items": [
          "Sismik Sensörlü Otomatik Gaz Kesme Valfleri: Sismik sarsıntıyı algılayarak ana doğalgaz hattını kesen emniyet ventilleri.",
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
        "text": "Hayır. Lisanslı mühendisler tarafından doğru noktalardan ve standart boyutlarda alınan karot delikleri, yüksek mukavemetli epoksi tamir harçları ile doldurularak kolonun mukavemetinin korunması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Deprem testi yaptırmak için tüm kat maliklerinin oy birliği gerekir mi?"
      },
      {
        "type": "p",
        "text": "Hayır. Bilgi amaçlı deprem dayanıklılık raporu için kararın nasıl alınacağı yönetim planına ve KMK'ya göre belirlenir; 6306 sayılı resmi riskli yapı tespiti için ise tek bir kat malikinin başvurusu kanunen yeterlidir."
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
          "Sıvı ve Granül Klor (%56 ve %90 Triklor/Diklor): Bakteri, mantar ve virüsleri yok eden ana dezenfektandır. Serbest klor seviyesi, ilgili yüzme havuzu mevzuatında belirlenen aralıkta korunmalıdır.",
          "pH Düşürücü (Sodyum Bisülfat / Sıvı Sülfürik Asit): Şebeke suyunun yüksek pH değerini ideal banda (genellikle 7.2 - 7.6) çeker. pH çok yükseldiğinde klorun dezenfeksiyon gücü belirgin biçimde düşer.",
          "Yosun Önleyici (Algisit - Kuaterner Amonyum): Havuz tabanında ve derz aralarında fotosentez kaynaklı yeşil/siyah yosun oluşumunu engeller. Ürün etiketinde belirtilen dozda uygulanır.",
          "Çöktürücü ve Sıvı Parlatıcı (Topaklayıcı - Polialüminyum Klorür): Kum filtresinin tutmakta zorlandığı çok küçük organik kirleri birleştirerek dibe çöktürür veya filtrede tutar."
        ]
      },
      {
        "type": "h2",
        "text": "2. Şok Klorlama (Break-Point Chlorination) Protokolü"
      },
      {
        "type": "p",
        "text": "Havuzda aşırı klor kokusu ve göz yanması hissediliyorsa bu klorun çokluğundan değil, yetersiz dezenfeksiyon sonucu oluşan \"bağlı klor (kloramin)\" varlığından kaynaklanır. Bağlı kloru yok etmek için üreticinin veya uzmanın önerdiği şekilde yüksek dozda klor verilerek şok klorlama yapılır ve bu sürede havuz kullanıma kapatılır."
      },
      {
        "type": "h2",
        "text": "3. Kimyasal Depolama ve İSG Güvenlik Kuralları"
      },
      {
        "type": "ul",
        "items": [
          "Klor ve asit bidonları kesinlikle aynı odada yan yana depolanmamalıdır; temasları halinde ölümcül zehirli klor gazı açığa çıkar.",
          "Kimyasal dozaj pompalarının emiş hortumları ve enjektörleri kireç tıkanıklığına karşı periyodik olarak asit banyosu ile temizlenmelidir.",
          "Havuz operatörleri kimyasal transferinde nitril eldiven, koruyucu gözlük ve uygun solunum maskesi kullanmalıdır."
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
        "text": "Yüksek pH veya yetersiz klor sebebiyle yosun patlaması oluşur. Önce pH ayarlanır, ardından uzman önerisine göre şok klor ve yosun önleyici verilip filtre ters yıkama ile çalıştırılır."
      },
      {
        "type": "h3",
        "text": "Siyanürik asit (stabilizatör) dengesi neden önemlidir?"
      },
      {
        "type": "p",
        "text": "Güneşin UV ışınlarının kloru uçurmasını önler. Ancak yüksek seviyelere çıktığında \"klor kilitlenmesi\" yaparak klorun mikrop öldürmesini durdurur; bu durumda havuza taze su basılmalıdır."
      },
      {
        "type": "cta",
        "text": "Sitenizin yüzme havuzu kimyasalları ve profesyonel işletme hizmeti için teklif alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
        "label": "Havuz Kimyasalları Teklifi Al"
      }
    ],
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "site-yonetimine-gecis-rehberi",
    "title": "Müteahhitten Site Yönetimine Geçiş: Geçici Yönetim Devir Teslimi ve Genel Kurul Rehberi",
    "description": "İnşaatı tamamlanan yeni sitelerde müteahhit geçici yönetiminden kat malikleri yönetimine geçiş süreci: KMK m.69, devir teslim tutanakları ve işletme projesi.",
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
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "İskan alan yeni projelerde müteahhidin atadığı geçici yönetim, KMK m.69 ve yönetim planı çerçevesinde ilk Kat Malikleri Genel Kurulunu toplayarak yönetimi devretmek zorundadır.",
    "content": [
      {
        "type": "p",
        "text": "Yeni tamamlanan konut ve rezidans projelerinde en sancılı süreçlerden biri, müteahhit firma tarafından atanan \"Geçici Yönetim\"den kat maliklerinin kendi bağımsız yönetimine geçiş evresidir. Eksik teslimler, iskan harçları, ortak alan sayaç devirleri ve garanti kapsamındaki teknik kusurlar bu süreçte doğru yönetilmelidir."
      },
      {
        "type": "h2",
        "text": "1. Geçici Yönetimin Yasal Süresi ve KMK m.69"
      },
      {
        "type": "p",
        "text": "634 Sayılı Kat Mülkiyeti Kanunu m.69 gereğince: Toplu yapılarda geçici yönetim, yapı ruhsatından ilk kat malikleri toplantısına kadar görev yapar ve en geç toplu yapının tamamlanmasından bir yıl sonra sona ermelidir."
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
          "Müteahhit Firma Garanti Taahhütnameleri: Dış cephe izolasyonu, asansörler, jeneratör ve kazanların garanti belgeleri.",
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
        "text": "Kat maliklerinin kanuni oranı temsil eden yazılı çağrısıyla Olağanüstü Genel Kurul toplanabilir; KMK uyarınca mevcut geçici yönetim azledilerek yeni yönetim kurulu seçilir."
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
        "href": "/hizmetler/tesis-yonetimi",
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
    "tldr": "Profesyonel güvenlik yönetimi; fiziksel güvenlik personeli ile ileri teknoloji elektronik sistemleri birleştirerek mülk değerinin korunmasına katkı sağlar ve 7/24 huzurlu yaşam alanı sunar.",
    "content": [
      {
        "type": "p",
        "text": "Konut sitelerinde ve ticari plazalarda profesyonel güvenlik yönetimi; yalnızca fiziki insan gücünden ibaret olmayıp, caydırıcı teknoloji altyapısı, standart operasyon prosedürleri (SOP) ve 7/24 denetim ağının uyumlu entegrasyonudur."
      },
      {
        "type": "h2",
        "text": "1. Güvenlik Yönetiminin 4 Temel Stratejik Sütunu"
      },
      {
        "type": "ul",
        "items": [
          "5188 Lisanslı Fiziki Güvenlik Kadrosu: T.C. İçişleri Bakanlığı kurallarına göre lisanslı, üniformalı, eğitimli ve adli sicil kontrolünden geçmiş personeller.",
          "Elektronik Güvenlik ve Video Analizi: Yüksek çözünürlüklü IP CCTV kameralar, video analitik, plaka tanıma sistemi (PTS) ve turnikeli geçiş kontrolü.",
          "Perimetre (Çevre) Koruma: Gerektiğinde çevre algılama sistemleri ve yeterli çevre aydınlatması.",
          "3G Güvenlik (3gguvenlik.com) Operasyonel Denetimi: Saha denetimi ve süpervizör desteği."
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
          "Kargo ve Paket Kabulü: Kuryelerin blok aralarında kontrolsüz dolaşımını engelleyen lobide kayıtlı teslimat.",
          "Taşınma ve Nakliye Yönetimi: Yönetim planındaki gün ve saat kısıtlamalarına uygun kontrollü taşınma protokolü."
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
        "text": "Evet, ancak Valilikten Özel Güvenlik İzni (ÖGİ) almak, SGK ve kıdem tazminatı yüklerini taşımak zorundadır. 3G Güvenlik gibi lisanslı bir şirketle çalışmak işveren yükümlülüklerini şirkete devreder."
      },
      {
        "type": "h3",
        "text": "Güvenlik görevlilerinin fazla mesai ve SGK takibi nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Tüm personelin SGK bildirgeleri, maaş bordroları ve devriye raporları düzenli olarak şeffaf biçimde site yönetim kuruluna sunulur."
      },
      {
        "type": "cta",
        "text": "Sitenizin güvenlik açıklarını risk analiziyle tespit edin.",
        "href": "/teklif-al",
        "label": "Güvenlik Keşfi İsteyin"
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
    "tldr": "Tesis yönetimi; gayrimenkulün tüm teknik bakım, güvenlik, temizlik, peyzaj ve mali operasyonlarını tek çatı altında toplayarak verimliliği maksimize eder.",
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
          "Acil Teknik Arızalara Müdahale: Sahada hızlı uzman teknisyen müdahalesi hedeflenir.",
          "Güvenlik ve Lobi Nöbet Sürekliliği: Vardiya doluluğu hedefi ve yedek personel ikamesi.",
          "Aidat Tahsilat Performansı: Düzenli tahsilat ve şeffaf raporlama.",
          "Sakin Talep Çözüm Süresi: Mobil uygulama üzerinden iletilen taleplere ilk geri bildirim hedeflenir."
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
        "text": "Merkezi satın alma gücü, enerji verimliliği optimizasyonu ve önleyici bakım sayesinde sitenin işletme giderlerinde tasarruf fırsatı doğar."
      },
      {
        "type": "h3",
        "text": "Tesis yönetim şirketi nasıl denetlenir?"
      },
      {
        "type": "p",
        "text": "Kat Malikleri Denetim Kurulu veya bağımsız denetçiler, banka hesaplarını ve karar defterlerini düzenli aralıklarla denetleyerek rapor hazırlar."
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
    "description": "Sitelerde endüstriyel temizlik standartları: Renk kodlu mikrofiber bezler, zemin cila bakımı, çöp şutu dezenfeksiyonu ve ruhsatlı ürünlerle hijyen protokolleri.",
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
    "tldr": "Profesyonel temizlik yönetimi; renk kodlu çapraz bulaşma önleme sistemleri, endüstriyel zemin bakım makineleri ve ruhsatlı kimyasallarla sağlıklı yaşam alanları sunar.",
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
        "text": "Temizlik kadromuzun SGK bildirgeleri, İSG eğitim sertifikaları ve sağlık muayene kayıtları düzenli olarak site yönetimine sunulur."
      },
      {
        "type": "h3",
        "text": "Kullanılan temizlik kimyasalları çevreye ve evcil hayvanlara zararlı mıdır?"
      },
      {
        "type": "p",
        "text": "Kullanılan ürünler ilgili mevzuata uygun ruhsatlı ürünlerdir; ürün seçimi sitenin ihtiyaçlarına ve güvenlik bilgi formlarına (SDS) göre yapılır."
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
    "tldr": "Periyodik teknik bakım; cihaz arıza risklerini azaltır, enerji verimliliğine katkı sağlar ve plansız yüksek maliyetli revizyonların önüne geçmeye yardımcı olur.",
    "content": [
      {
        "type": "p",
        "text": "Binaların elektro-mekanik tesisatları, bir canlının dolaşım ve sinir sistemi gibidir. Elektrik trafoları, kompanzasyon panoları, kazan daireleri, hidroforlar, jeneratörler ve asansörler düzenli muayene edilmediğinde ani sistem çökmelerine, yangınlara ve yüksek maliyetli amortisman kayıplarına yol açabilir."
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
          "Yıllık Yasal Bakımlar: Trafo yağı izolasyon ve dielektrik testi, paratoner topraklama geçiş direnci ölçümü, A Tipi muayene kuruluşu asansör yeşil etiket muayenesi."
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
        "text": "3. Acil Teknik Servis ve SLA Güvencesi"
      },
      {
        "type": "p",
        "text": "Alo Yönetim teknik servis ağı; asansör mahsur kalması, elektrik panosu patlaması veya hidrofor durması gibi acil senaryolarda hızlı biçimde sahaya ulaşarak kesintisiz yaşam konforunu desteklemeyi hedefler."
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
        "text": "Reaktif elektrik cezası riskinin azaltılması, kazan verimliliği ve arıza önleyici bakım sayesinde sitenin ortak işletme bütçesinde tasarruf fırsatı doğar."
      },
      {
        "type": "h3",
        "text": "Asansör yeşil etiket sorumluluğu kime aittir?"
      },
      {
        "type": "p",
        "text": "Asansör İşletme ve Bakım Yönetmeliği uyarınca asansörün periyodik kontrolünü yaptırmak ve yeşil etiketi almak bina yöneticisinin / asansör işletmecisinin sorumluluğundadır."
      },
      {
        "type": "cta",
        "text": "Tesisiniz için teknik bakım ve mekanik işletme teklifi alın.",
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
    "tldr": "Düzenli peyzaj ve bahçe bakımı; sitenin estetik cazibesine ve gayrimenkul değerinin korunmasına katkı sağlarken, akıllı sulama otomasyonu su tüketiminin azaltılmasına yardımcı olur.",
    "content": [
      {
        "type": "p",
        "text": "Toplu konut projelerinde ve rezidanslarda yeşil alanlar, sakinlerin şehir stresinden uzaklaştığı en değerli ortak yaşam alanlarıdır. Bakımsız, kurumuş çimler veya budanmamış ağaçlar site prestijini düşürürken; uzman peyzaj ekiplerince yönetilen peyzaj alanları sitenin gayrimenkul değerinin korunmasına katkı sağlar."
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
        "text": "2. Akıllı Otomatik Sulama Sistemleri ve Su Tasarrufu"
      },
      {
        "type": "p",
        "text": "Toprak nem sensörlü ve meteoroloji istasyonu entegreli akıllı sulama otomasyonu, yağmurlu günlerde sulamayı durdurarak ve nozul debilerini optimize ederek sitenin ortak su faturasında tasarruf sağlanmasına yardımcı olur."
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
        "text": "Siteniz için uzman denetimli peyzaj bakım teklifi alın.",
        "href": "/hizmetler/peyzaj-ve-bahce-bakimi",
        "label": "Peyzaj Hizmetlerimizi İnceleyin"
      }
    ],
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "havuz-bakimi-ve-hijyen-hizmeti-rehberi-2026",
    "title": "Sitelerde Yüzme Havuzu Bakımı ve Hijyen Rehberi: Günlük Ölçümler ve Biyosidal Standartlar",
    "description": "Açık ve kapalı yüzme havuzlarında mevzuata uygun hijyen yönetimi: serbest klor, pH dengeleme, çöktürücü, ters yıkama ve mikrobiyolojik testler.",
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
    "tldr": "Yüzme havuzu bakımı; düzenli klor ve pH ölçümleri, filtre ters yıkamaları ve mevzuatın öngördüğü laboratuvar testleri ile halk sağlığının korunmasına katkı sağlar.",
    "content": [
      {
        "type": "p",
        "text": "Sitelerdeki yüzme havuzları, yaz aylarında çocukların ve yetişkinlerin en yoğun sosyalleştiği alanlardır. Ancak yetersiz klorlama veya hatalı pH seviyeleri; mantar, kulak enfeksiyonları, konjonktivit ve Lejyoner bakterisi gibi risklere yol açabilir."
      },
      {
        "type": "h2",
        "text": "1. Günlük Havuz Parametrelerinin Takibi (Sağlık Bakanlığı Yönetmeliği)"
      },
      {
        "type": "ul",
        "items": [
          "Serbest Klor: Yönetmeliğin ek tablosunda verilen aralıkta (açık ve kapalı havuzlar için ayrı değerlerle) tutulmalıdır.",
          "Serbest klor ölçümleri havuz açıkken düzenli olarak yapılmalı ve kayıt altına alınmalıdır.",
          "pH Değeri: Yönetmelikte belirtilen aralıkta tutulmalıdır. Yüksek pH klorun mikrop öldürücü gücünü azaltır.",
          "Siyanürik Asit (Stabilizatör): Açık havuzlarda aşırı birikmemesi için düzenli kontrol edilmelidir.",
          "Bağlı Klor (Kloramin): Düşük tutulmalıdır; yüksek seviyeler klor kokusu ve tahriş nedenidir."
        ]
      },
      {
        "type": "h2",
        "text": "2. Filtrasyon, Ters Yıkama ve Dip Süpürme Protokolü"
      },
      {
        "type": "ol",
        "items": [
          "Kum Filtresi Ters Yıkama (Backwash): Basınç farkına göre düzenli olarak filtrenin ters çalıştırılarak biriken organik tortunun kanala atılması.",
          "Durulama (Rinse): Ters yıkama sonrası kum yatağının oturtulması için kısa süreli durulama yapılması.",
          "Dip Süpürgesi ve Havuz Robotu: Açılış öncesi tabana çöken partiküllerin, gerekirse otomatik robotlarla temizlenmesi.",
          "Savak Kanalı ve Denge Tankı Temizliği: Savak ızgaralarının dezenfeksiyonu ve denge tankı dip çamurunun tahliyesi."
        ]
      },
      {
        "type": "h2",
        "text": "3. Laboratuvar Mikrobiyolojik Testleri"
      },
      {
        "type": "p",
        "text": "Mevzuatın öngördüğü sıklıkta numune verilerek mikrobiyolojik analizler (E.Coli, toplam koliform, Pseudomonas aeruginosa vb.) yaptırılır ve sonuçlar kayıt altında tutulur."
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
        "text": "Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" içindeki sorumlu kişi ve havuz suyu operatörü görevlendirme şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Kapalı havuzlarda nem ve koku nasıl önlenir?"
      },
      {
        "type": "p",
        "text": "Havuz nem alma santrali (dehumidifier) bağıl nemi uygun aralıkta tutmalı ve taze hava beslemesi sağlanmalıdır."
      },
      {
        "type": "cta",
        "text": "Sitenizin havuz bakımı için sertifikalı operatör ve hijyen danışmanlığı alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
        "label": "Havuz Bakım Hizmetlerimiz"
      }
    ],
    "dateModified": "2026-02-24T19:15:00.000Z"
  },
  {
    "slug": "hasere-ve-dezenfeksiyon-hizmeti-rehberi-2026",
    "title": "Toplu Konutlarda Biyosidal Haşere İlaçlama ve Dezenfeksiyon Rehberi (2026)",
    "description": "Sitelerde periyodik böcek ve kemirgen ilaçlama: ruhsatlı biyosidal ürünler, kokusuz ULV sisleme, jel ilaçlama ve çöp şutu dezenfeksiyonu.",
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
        "text": "Kullanılan tüm kimyasallar ilgili mevzuata göre ruhsatlı olmalıdır. İlaçlama sonrası site yönetimine uygulama kaydı/raporu teslim edilir."
      },
      {
        "type": "h2",
        "text": "3. Çöp Şutu ve Ortak Alan Hijyeni"
      },
      {
        "type": "p",
        "text": "Toplu konutlarda koku ve bakteri kaynağı olan çöp toplama odaları ve şut boruları yüksek basınçlı sıcak suyla yıkanır ve dezenfekte edilir."
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
        "text": "Jel ilaçlama uygulamasında evi terk etmeye veya eşyaları toplamaya gerek yoktur; ULV sisleme yapılan alanlar ise ürün talimatına göre kapalı tutulup havalandırılmalıdır."
      },
      {
        "type": "h3",
        "text": "Toplu konutlarda ilaçlama ne sıklıkla yapılmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre ilaçlaması sezon dönemlerinde, kapalı alanlar ise düzenli aralıklarla ilaçlanır."
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
    "tldr": "Site yönetimlerinde profesyonel hukuk danışmanlığı; aidat tahsilat sürecini düzenler, hatalı genel kurul kararlarının önlenmesine yardımcı olur ve yöneticinin hukuki risklerini azaltır.",
    "content": [
      {
        "type": "p",
        "text": "Toplu yapı ve site yönetimleri; Kat Mülkiyeti Kanunu, İş Kanunu, Türk Borçlar Kanunu, İcra ve İflas Kanunu ve İSG Kanunu gibi çok sayıda karmaşık mevzuatla iç içedir. Hukuki altyapısı olmadan alınan kararlar, usulüne uygun bildirilmemiş bütçeler veya hatalı personel fesihleri site bütçelerine büyük dava ve tazminat faturaları çıkarabilir."
      },
      {
        "type": "h2",
        "text": "Site Yönetimlerinde Karşılaşılan 4 Büyük Hukuki Risk"
      },
      {
        "type": "ul",
        "items": [
          "Genel Kurul Kararlarının İptali Davaları: Usulüne uygun çağrı yapılmayan toplantı kararları mahkemece iptal edilebilir.",
          "İşletme Projesinin İptali ve Aidatların Tahsil Edilememesi: Usulüne uygun onaylanıp bildirilmeyen bütçeler tahsilatı zorlaştırır, icra takipleri itirazla karşılaşabilir.",
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
        "text": "Alo Yönetim bünyesindeki uzman gayrimenkul hukukçuları ve icra departmanımız sitenize destek verir:"
      },
      {
        "type": "ol",
        "items": [
          "Hızlı İcra Takibi: Gününde ödenmeyen aidatlar için %5 gecikme tazminatı da talep edilerek ilamsız takip açılabilir.",
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
        "text": "Kapıcı ve temizlik personeli işten ayrılırken ibraname, kıdem/ihbar bordroları ve yıllık izin mutabakatları usulüne uygun tanzim edilerek sitenin sonradan tazminat davasına maruz kalma riski azaltılır."
      },
      {
        "type": "h2",
        "text": "Sulh Hukuk Mahkemelerinde Hakimin Müdahalesi (KMK m.33)"
      },
      {
        "type": "p",
        "text": "Ortak yerlere izinsiz klima motoru takılması, sığınağın depoya dönüştürülmesi veya gürültü ihlallerinde mahkemeden Hakimin Müdahalesi ve eski hale getirme kararı alınabilir."
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
        "text": "Soru: Genel kurul kararına karşı dava açma süresi ne kadardır?\nCevap: Sulh Hukuk Mahkemesinde iptal davası açma süreleri kısadır ve toplantıya katılıp katılmadığınıza ve kararın nasıl bildirildiğine göre değişir (KMK m.33); gecikmeden bir avukata danışın."
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
    "description": "Ödenmeyen site aidatlarında yöneticinin izleyeceği adımlar: SMS/ihtarname çekilmesi, aylık %5 yasal gecikme tazminatı ve ilamsız icra takibi.",
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
    "tldr": "KMK m.20 uyarınca aidatını vadesinde ödemeyen kat malikine aylık %5 gecikme tazminatı uygulanır; yönetici genel kurul kararına gerek olmaksızın doğrudan icra takibi başlatabilir.",
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
        "text": "634 Sayılı Kanun Madde 20 uyarınca gider veya avans payını ödemeyen kat maliki hakkında yönetici ya da diğer kat malikleri tarafından dava açılabilir veya icra takibi yapılabilir; ödemede geciktiği günler için aylık yüzde beş hesabıyla gecikme tazminatı ödenir."
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
        "text": "Borçlunun haksız yere icra takibine itiraz etmesi durumunda, Sulh Hukuk Mahkemesi'nde açılan \"İtirazın İptali\" davasında borçlu, asıl alacak ve gecikme tazminatına ek olarak %20 icra inkar tazminatı ve tüm avukatlık vekalet ücretlerini ödemeye mahkum edilebilir."
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
        "text": "Evet. Kat maliki asıl borçludur; kiracı da KMK m.22 uyarınca ödemekle yükümlü olduğu kira miktarı kadar müteselsilen sorumludur. Yönetim icra takibini ev sahibine veya kiracıya yöneltebilir."
      },
      {
        "type": "h3",
        "text": "Aidat borcu olan sakinin bina ortak alanlarını kullanımı engellenebilir mi?"
      },
      {
        "type": "p",
        "text": "Yargıtay içtihatlarına göre asansör kartının iptali veya suyun kesilmesi hukuka aykırı sayılabilir ve sorumluluk doğurabilir; tahsilat yalnızca yasal icra yoluyla yapılmalıdır."
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
    "tldr": "Ataşehir bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ataşehir, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Bölgedeki iş merkezi kulelerinde kontrollü turnike geçişi ve ziyaretçi kaydı",
          "Ataşehir bölgesindeki rezidanslarda Plaka Tanıma Sistemi (PTS) ile hızlı araç geçişi",
          "Alo Güvenlik (guvenlikkursu.com) bünyesinde yetişen personelle ihtiyaç halinde takviye planı",
          "3G Güvenlik süpervizör desteğiyle periyodik saha denetimleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Ataşehir bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Tüm personel, 5188 kimlikli, eğitimli profesyonellerden seçilir."
      },
      {
        "type": "h3",
        "text": "Nizamiye PTS sistemi site sakinlerine nasıl entegre edilir?"
      },
      {
        "type": "p",
        "text": "Sakin araç plakaları Alo Yönetim mobil yazılımına tanımlanır ve bariyerler otomatik açılarak araç kuyruğunun azaltılması hedeflenir."
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
    "tldr": "Ataşehir bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Ataşehir bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Ataşehir bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Ataşehir bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Ataşehir projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Ataşehir bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Yüksek Gerilim (Y.G.) Trafo İşletme Sorumluluğu ve yağ izolasyon testleri",
          "Kompanzasyon panolarının telemetri ile uzaktan izlenerek reaktif elektrik cezası riskinin azaltılması",
          "BMS (Bina Yönetim Sistemi) üzerinden Chiller ve VRF klima santrallerinin çalışma saatlerine göre optimizasyonu",
          "Dizel jeneratörlerin periyodik otomatik yük transfer testleri ve akü empedans ölçümleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Ataşehir bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "A Tipi Akredite Muayene Kuruluşu yıllık denetimleri öncesinde teknik ekiplerimiz asansörlerin ön kontrolünü yaparak yeşil etiket sürecini destekler."
      },
      {
        "type": "h3",
        "text": "Trafo işletme sorumluluğu zorunlu mudur?"
      },
      {
        "type": "p",
        "text": "Yüksek gerilim tesislerinde mevzuat gereği işletme sorumlusu mühendis görevlendirilmesi gerekebilir; ayrıntılar için güncel kuralları kontrol edin."
      },
      {
        "type": "cta",
        "text": "Ataşehir'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Ataşehir bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ataşehir bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Ataşehir projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Ataşehir bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ataşehir, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konutlar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Ataşehir Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Ataşehir sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Ataşehir bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Ataşehir'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "Bakırköy bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Bakırköy, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Sahil bandındaki sitelerde perimetre çit güvenliği ve çevre algılama sistemleri",
          "Villa sitelerinde mobil devriye ve periyodik ring kontrolleri",
          "Mega sahil konutlarında misafir araçlarının dijital kaydı",
          "Açık yüzme havuzu ve sosyal tesis alanlarında yabancı girişinin kartlı turnike ile kontrolü"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Bakırköy bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Sahil yürüyüş yoluna cepheli sitelerde çevre algılama sistemleri ve gece görüşlü kameralar kullanılabilir."
      },
      {
        "type": "h3",
        "text": "Florya villalarında güvenlik devriyesi nasıl takip edilir?"
      },
      {
        "type": "p",
        "text": "Devriye personeli RFID kontrol noktalarını periyodik olarak okutur ve kayıtlar yönetim paneline aktarılır."
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
    "tldr": "Bakırköy bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Bakırköy bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Bakırköy bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Bakırköy bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Bakırköy projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Bakırköy bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Sahil binalarında asansör taşıyıcı halatlarının ve raylarının kontrolleri",
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
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Bakırköy bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Dış ünite serpantinleri tuz birikimine göre periyodik olarak koruyucu kaplama ile yıkanmalıdır."
      },
      {
        "type": "h3",
        "text": "Bodrum katlarda su basma riski nasıl önlenir?"
      },
      {
        "type": "p",
        "text": "Yedekli dalgıç drenaj pompaları su baskınlarına karşı periyodik olarak test edilir."
      },
      {
        "type": "cta",
        "text": "Bakırköy'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Bakırköy bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Bakırköy bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Bakırköy projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Bakırköy bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Bakırköy, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Bakırköy Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Bakırköy sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Bakırköy bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Bakırköy'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "Başakşehir bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Başakşehir, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Mega sitelerde birden fazla nizamiye kapısının merkezi koordinasyonu",
          "Geniş park, gölet ve çocuk oyun alanlarında yaya özel güvenlik devriyeleri",
          "Kurye ve nakliye araçlarının girişinde daire sakinine bildirim yapılması",
          "Kapalı otopark blok altlarında RFID tur kalemi ile devriye takibi"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Başakşehir bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Ana komuta merkezinden izlenen kameralar ve çoklu nizamiye ekipleri ile vardiyalı 5188 kadrosu yönetilir."
      },
      {
        "type": "h3",
        "text": "Mega sitelerde kargo güvenliği nasıl çözülür?"
      },
      {
        "type": "p",
        "text": "Lobide kayıtlı kargo teslimi ile kuryelerin blok aralarında kontrolsüz dolaşımı sınırlandırılır."
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
    "tldr": "Başakşehir bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Başakşehir bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Başakşehir'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Başakşehir bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Başakşehir bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Başakşehir projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Başakşehir bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Kaskad doğalgaz kazan dairelerinde baca gazı analizleri ile yakıt verimliliğinin artırılması",
          "Adil ve şeffaf merkezi ısı pay ölçer endeks okuması",
          "Yüksek binalarda hidrofor basınç ayarı ile her kata dengeli su basıncı",
          "Merkezi yangın algılama santrallerinde duman damperleri ve basınçlandırma fanlarının periyodik testi"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Başakşehir bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Isı pay ölçer ve merkezi ısıtma giderlerinin paylaşımı, yönetim planı ve ilgili enerji verimliliği mevzuatına göre belirlenir."
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
        "text": "Başakşehir'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Başakşehir bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Başakşehir bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Başakşehir projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Başakşehir bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Başakşehir, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Başakşehir Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Başakşehir sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Başakşehir bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Başakşehir'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "Beşiktaş bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Rezidanslarda VIP karşılama ve concierge entegre güvenlik",
          "Akıllı kartlı turnikeler ile yetkisiz katlara erişimin engellenmesi",
          "Gizlilik ve KVKK uyumlu kamera kaydı",
          "Vale ve kapalı otopark girişlerinde yönlendirme ve park disiplini protokolleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Beşiktaş bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Lisanslı ve eğitimli personeller görev alır."
      },
      {
        "type": "h3",
        "text": "Ticari plazalarda ziyaretçi kaydı nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Dijital ziyaretçi kaydı ile KVKK uyumlu geçiş sağlanır."
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
    "tldr": "Beşiktaş bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Beşiktaş bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Beşiktaş bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Beşiktaş bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Beşiktaş projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Beşiktaş bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Yüksek hızlı kule asansörlerinde halat muayenesi ve A Tipi muayene kuruluşu yeşil etiket sürekliliği",
          "Yangın sprinkler sistemleri ve duman tahliye şaftlarının periyodik senaryo testleri",
          "Fan-coil ünitelerinde filtre bakımı ve dezenfeksiyonu ile iç ortam hava kalitesinin korunması"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Beşiktaş bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Beşiktaş bölgesindeki teknik ekiplerimiz kritik iklimlendirme arızalarına hızla müdahale etmeyi hedefler."
      },
      {
        "type": "h3",
        "text": "Chiller soğutma kulelerinde lejyoner bakterisi nasıl önlenir?"
      },
      {
        "type": "p",
        "text": "Kule sularına periyodik biyosidal klorlama ve laboratuvar numune testleri uygulanır."
      },
      {
        "type": "cta",
        "text": "Beşiktaş'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Beşiktaş bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Beşiktaş projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Beşiktaş bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beşiktaş, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Beşiktaş Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Beşiktaş sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Beşiktaş bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Beşiktaş'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "Beylikdüzü bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Kozmopolit sakin yapısına uygun güvenlik iletişimi",
          "Geniş parsel çevre duvarları boyunca aydınlatma ve kör nokta bırakmayacak şekilde konumlandırılmış IP kamera ağı",
          "Misafir davet / ön kayıt sistemi ile nizamiyede beklemesiz hızlı geçiş",
          "3G Güvenlik desteğiyle gece otopark ve çevre sokak devriye desteği"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Beylikdüzü bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Kimlik bildirme mevzuatına ve KVKK'ya uygun biçimde misafir kaydı oluşturulur."
      },
      {
        "type": "h3",
        "text": "Geniş sitelerde gece güvenliği nasıl sağlanır?"
      },
      {
        "type": "p",
        "text": "RFID tur kontrol noktaları periyodik olarak taranır ve şüpheli hareketlerde 3G Güvenlik süpervizörü yönlendirilir."
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
    "tldr": "Beylikdüzü bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Beylikdüzü bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Beylikdüzü'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Beylikdüzü bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Beylikdüzü bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Beylikdüzü projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Beylikdüzü bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Jeneratör kışlık ısıtıcı ve akü şarj ünitelerinin fırtınalı havalara karşı hazır tutulması"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Beylikdüzü bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Beylikdüzü'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Beylikdüzü bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Beylikdüzü projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Beylikdüzü bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Beylikdüzü, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Beylikdüzü Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Beylikdüzü sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Beylikdüzü bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Beylikdüzü'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "description": "Site yönetimlerinde hukuki risk yönetimi: KMK davaları, genel kurul iptal davaları, İİK m.68 kapsamında işletme projesine dayalı icra takipleri ve iş hukuku danışmanlığı.",
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
          "Genel Kurul Divan ve Hukuki Süreç Yönetimi: Çağrı mektupları, vekaletnameler, hazirun cetveli ve karar defterinin KMK'ya uygun tanzimi.",
          "İş Hukuku ve Personel Sözleşmeleri: Kapıcı, temizlik ve teknik personelin iş sözleşmeleri, fazla mesai, yıllık izin ve kıdem tazminatı ihtilaflarının çözümü.",
          "Yönetim Planı Tadilatı ve Tapu Tescili: KMK m.28 ve m.70 uyarınca (genel yapılarda 4/5, toplu yapılarda 2/3 oy çokluğu ile) yönetim planının güncel mevzuata göre revize edilmesi."
        ]
      },
      {
        "type": "h2",
        "text": "2. İİK Madde 68: İşletme Projesinin Dayanak Olması"
      },
      {
        "type": "p",
        "text": "İşletme projeleri ve kat malikleri kurulu kararları, mevzuatın aradığı şartlar sağlandığında İcra ve İflas Kanunu Madde 68 kapsamında itirazların kaldırılmasına dayanak olabilir."
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
        "text": "Sulh Hukuk Mahkemesi'nde iptal davası açma süreleri kısadır ve malikin toplantıya katılıp katılmadığına ve kararın nasıl bildirildiğine göre değişir (KMK m.33)."
      },
      {
        "type": "h3",
        "text": "Yönetici aidat borçlusu hakkında kendi adına icra takibi yapabilir mi?"
      },
      {
        "type": "p",
        "text": "Yönetici, kat malikleri kurulu adına KMK m.20 çerçevesinde icra takibi açabilir."
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
    "description": "Apartman ve sitelerde işletme projesi hazırlama rehberi: Tahmini gelir-gider bütçesi, arsa payı hesaplama tablosu ve onay usulü.",
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
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "İşletme projesi; ana gayrimenkulün 1 yıllık tahmini gelir ve giderlerini gösteren ve KMK m.37 uyarınca kat malikleri kurulunca onaylanan (7579 sayılı Kanun'dan itibaren) yasal bütçe belgesidir.",
    "content": [
      {
        "type": "p",
        "text": "Kat Mülkiyeti Kanunu'na göre yönetilen tüm bina ve sitelerde aidat toplayabilmenin ve yasal takip yapabilmenin birinci şartı usulüne uygun hazırlanmış bir \"İşletme Projesi\"dir. Kat Malikleri Kurulu tarafından kabul edilmiş bir bütçe yoksa, yönetici gecikmeksizin geçici bir işletme projesi hazırlar ve en geç 3 ay içinde kurula onaylatır (7579 sayılı Kanun)."
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
        "text": "2. İşletme Projesinin Onayı ve Bildirimi"
      },
      {
        "type": "ol",
        "items": [
          "1. Adım: Hazırlanan işletme projesi (veya geçici proje) tüm kat maliklerine bildirilir.",
          "2. Adım: Proje kat malikleri kurulunda görüşülür; itirazlar ve değişiklik önerileri kurulda değerlendirilir.",
          "3. Adım: Kurulca onaylanan işletme projesi, mevzuatın aradığı şartlar sağlandığında İİK m.68/1 kapsamında icra takibinde dayanak olabilir.",
          "4. Adım: Geçici proje en geç 3 ay içinde Kat Malikleri Kurulu tarafından aynen veya değiştirilerek kabul edilmelidir."
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
        "text": "Usulüne uygun onaylanıp bildirilmemiş işletme projesine dayanılarak icra takibi yapıldığında borçlu itiraz edebilir ve takip durabilir; bu nedenle onay ve bildirim ispatı önemlidir."
      },
      {
        "type": "h3",
        "text": "Yıl içinde giderler bütçeyi aşarsa ne yapılır?"
      },
      {
        "type": "p",
        "text": "Yönetici \"Ek İşletme Projesi (Ek Bütçe)\" hazırlayarak aynı usulle kurula sunar ve ek aidat/demirbaş avansı toplar."
      },
      {
        "type": "cta",
        "text": "Siteniz için hatasız işletme projesi hazırlama ve bütçe yönetimi hizmeti alın.",
        "href": "/hizmetler/tesis-yonetimi",
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
    "tldr": "Kadıköy bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kadıköy, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Kentsel dönüşüm rezidanslarında VIP lobi ve güvenlik entegrasyonu",
          "Alo Güvenlik (guvenlikkursu.com) bünyesinde yetişen personelle operasyon desteği",
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
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Kadıköy bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Gündüz fiziksel danışma, gece ise uzaktan akıllı kamera izleme ve mobil devriye hibrit modeliyle maliyet tasarrufu hedeflenir."
      },
      {
        "type": "h3",
        "text": "Kadıköy'de güvenlik personeli ne kadar sürede temin edilir?"
      },
      {
        "type": "p",
        "text": "Acil personel ihtiyaçları için sahaya yönlendirme planlaması yapılır; süre ihtiyaca ve bölgeye göre değişir."
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
    "tldr": "Kadıköy bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Kadıköy bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Kadıköy bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Kadıköy bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Kadıköy projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Kadıköy bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Kentsel dönüşüm binalarında asansör A Tipi muayene kuruluşu yeşil etiket muayenesine eksiksiz hazırlık",
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
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Kadıköy bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Şebeke suyunun kirecini kırarak kombi, kazan, boyler ve daire içi armatürlerin ömrünün uzamasına yardımcı olur."
      },
      {
        "type": "h3",
        "text": "Kapalı otopark jet fanları ne zaman devreye girer?"
      },
      {
        "type": "p",
        "text": "CO sensörleri belirlenen eşik değerini aştığında fanlar otomatik çalışarak zehirli gazı dışarı atar."
      },
      {
        "type": "cta",
        "text": "Kadıköy'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Kadıköy bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kadıköy bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Kadıköy projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Kadıköy bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kadıköy, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konutlar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Kadıköy Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Kadıköy sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Kadıköy bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Kadıköy'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "Kartal bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kartal, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Kartal Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Sahil kulelerinde ve karma ticari/konut projelerinde ayrıştırılmış güvenlik hatları",
          "Sahil yolu araç girişlerinde yoğun saatlerde araç birikmesini önleyen PTS bariyerleri",
          "Kapalı otopark, fitness ve açık havuz sosyal tesislerinde kartlı turnike denetimi",
          "3G Güvenlik devriye desteğiyle geniş parsel çevre çiti ve yangın merdiveni kontrolleri"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Kartal bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Alışveriş caddesi müşterilerinin konut katlarına ve otoparkına geçişi kartlı turnikelerle kontrol altına alınır."
      },
      {
        "type": "h3",
        "text": "Yüksek katlı sitelerde yangın tahliye planı nasıl yapılır?"
      },
      {
        "type": "p",
        "text": "Periyodik olarak kat sakinleri ve güvenlik ekipleriyle kontrollü yangın merdiveni tahliye tatbikatı yapılır."
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
    "tldr": "Kartal bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Kartal bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kartal Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Kartal'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Kartal bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kartal Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Kartal bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Kartal Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Kartal projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Kartal bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Yüksek katlı gökdelenlerde yüksek hızlı dikey taşıma (asansör) fren, halat ve paraşüt sistemleri bakımı",
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
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Kartal bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Düzenli halat muayenesi ve özel sentetik halat yağlayıcıları kullanılarak sürtünme aşınması önlenir."
      },
      {
        "type": "h3",
        "text": "PRV basınç düşürücü vanalar neden kritiktir?"
      },
      {
        "type": "p",
        "text": "Alt katlara inen yüksek hidrofor basıncını daireler için güvenli seviyeye düşürerek boru patlamalarının önlenmesine yardımcı olur."
      },
      {
        "type": "cta",
        "text": "Kartal'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Kartal bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kartal bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Kartal projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Kartal bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Kartal, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Kartal Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Kartal sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Kartal bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Kartal'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "pillar": "/hizmetler/tesis-yonetimi",
    "tldr": "KMK uyarınca yönetici, kat malikleri kurulunun vekili hükmündedir. Yönetim planında aksi kararlaştırılmadıkça yönetici uygun bir ücret talep etme hakkına sahiptir.",
    "content": [
      {
        "type": "p",
        "text": "634 Sayılı Kat Mülkiyeti Kanunu (KMK) uyarınca, sekizden fazla bağımsız bölüme sahip tüm binalarda yönetici atanması kanunen zorunludur. Yönetici, kat malikleri kurulu tarafından seçilir ve kurulun vekili sıfatıyla ana gayrimenkulü idare eder. Kanun yöneticilere ağır sorumluluklar yüklerken aynı zamanda çok önemli yasal haklar ve yetkiler tanımıştır."
      },
      {
        "type": "h2",
        "text": "1. Yöneticinin Hukuki Konumu ve Vekalet İlişkisi"
      },
      {
        "type": "p",
        "text": "Kanun, yöneticinin kat maliklerine karşı vekil gibi sorumlu olduğunu belirtir. Yönetici kat malikleri kurulu kararlarını yerine getirmek, ortak parayı korumak ve her zaman hesap vermeye hazır olmakla yükümlüdür."
      },
      {
        "type": "h2",
        "text": "2. Yöneticinin Yasal Hakları"
      },
      {
        "type": "ul",
        "items": [
          "Ücret Talep Etme Hakkı: Yönetim planında aksi kararlaştırılmadıkça, yönetici kat maliklerince belirlenen uygun bir yönetim ücreti talep edebilir.",
          "Gider Payı: Yönetici ücreti ve gider payı muafiyeti gibi hususların yönetim planında düzenlenmesi önerilir.",
          "Vekaletname Aranmaksızın Dava Açma Hakkı: KMK uyarınca yönetici, ortak gider borçlularına karşı doğrudan icra takibi açabilir.",
          "Haklı Nedenle Görevi Bırakma (İstifa) Hakkı: Haklı sebeplerle görevi bırakmak isteyen yönetici kat malikleri kurulunu toplantıya çağırabilir."
        ]
      },
      {
        "type": "h2",
        "text": "3. Yöneticinin Şahsi ve Cezai Sorumlulukları"
      },
      {
        "type": "p",
        "text": "Yönetici; karar defterini notere onaylatmamak, işletme bütçesini usulüne uygun onaylatıp bildirmemek veya ortak parayı şahsi hesabında kullanmak halinde, somut olaya göre Türk Ceza Kanunu kapsamında güveni kötüye kullanma gibi suçlar gündeme gelebilir."
      },
      {
        "type": "h2",
        "text": "4. Dışarıdan Profesyonel Yönetim Şirketi Seçimi"
      },
      {
        "type": "p",
        "text": "Kat malikleri kurulu, kendi aralarından bir yönetici seçmek yerine KMK m.34 kapsamında dışarıdan kurumsal bir tesis yönetim şirketini yönetici olarak atayabilir. Bu sayede operasyonel ve idari yükümlülükler kurumsal firmaya devredilir; ancak sorumluluk dağılımı sözleşmede açıkça belirlenmelidir."
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
        "text": "Yöneticilik sorumluluklarınızı profesyonel bir yönetim şirketiyle paylaşın.",
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
    "tldr": "Maltepe bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Maltepe, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Eğimli çevre duvarları boyunca çevre algılama sistemleri",
          "Sosyal tesis ve açık havuz alanlarında kartlı geçiş turnikeleri",
          "Alo Güvenlik ve 3G Güvenlik ortak denetim ağıyla periyodik gece süpervizör denetimleri",
          "Kargo ve paket kabulünde kayıt altına alma ve daire sakinine teslimat bildirimi"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Maltepe bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Perimetre sensörleri, çevre aydınlatması ve 3G Güvenlik devriye ekipleriyle devriye atılır."
      },
      {
        "type": "h3",
        "text": "Sitede güvenlik personeli değişimlerinde aksama olur mu?"
      },
      {
        "type": "p",
        "text": "Yedek personel planı ile aksama riski azaltılır; devir süreleri sözleşmede belirlenir."
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
    "tldr": "Maltepe bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Maltepe bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Maltepe'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Maltepe bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Maltepe bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Maltepe projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Maltepe bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Acil teknik servis ile hızlı yerinde müdahale hedefi",
          "İçme ve kullanım suyu depolarında periyodik temizlik ve dezenfeksiyon",
          "Şiddetli yağışlarda kapalı otopark su basmalarını önleyen yedekli foseptik dalgıç pompaları",
          "Hidrofor genleşme tankı membran kontrolleri ile koç darbesi ve tesisat patlamalarının önlenmesi"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Maltepe bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Su depoları ilgili mevzuata uygun şekilde periyodik olarak temizlenip dezenfekte edilmelidir."
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
        "text": "Maltepe'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Maltepe bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Maltepe bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Maltepe projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Maltepe bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Maltepe, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Maltepe Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Maltepe sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Maltepe bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Maltepe'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "Sarıyer bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Sarıyer, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Orman kenarı villa sitelerinde çevre algılama ve termal kamera destekli çevre güvenliği",
          "Geniş araziye yayılan sitelerde 3G Güvenlik desteğiyle motorize devriye",
          "İş kulelerinde ziyaretçi kontrol noktaları ve kurumsal resepsiyon",
          "Site ana giriş nizamiyesinde misafir araç plakası kaydı ve gerektiğinde araç kontrolü"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Sarıyer bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Çevre çitine entegre algılama sistemleri ve termal kameralar ile çite temas anında güvenlik uyarılabilir."
      },
      {
        "type": "h3",
        "text": "Plazalarda x-ray operatörleri nasıl eğitilir?"
      },
      {
        "type": "p",
        "text": "İlgili mevzuata uygun eğitim almış operatörler görevlendirilir."
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
    "tldr": "Sarıyer bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Sarıyer bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Sarıyer bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Sarıyer bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Sarıyer projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Sarıyer bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Sarıyer bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Şebeke elektriği kesildiğinde jeneratörü otomatik çalıştırıp binayı besler; elektrik geldiğinde devreden çıkar."
      },
      {
        "type": "cta",
        "text": "Sarıyer'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Sarıyer bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Sarıyer bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Sarıyer projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Sarıyer bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Sarıyer, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Sarıyer Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Sarıyer sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Sarıyer bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Sarıyer'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "Şişli bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Şişli, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Şişli Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Kulelerde yüksek sirkülasyonlu hızlı geçiş turnike güvenliği",
          "Rezidans ve ofis katlarının otopark katlarında vale koordinasyonu ve araç park düzeni disiplini",
          "Gece ve tatil günlerinde boş ofis katlarının kat bazlı RFID kart kilitleri ve kamera ile korunması",
          "Yangın ve deprem anında güvenli tahliyeyi destekleyen acil durum güvenlik koordinasyonu"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Şişli bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Lobi katında oluşturulan kargo kabul odasında paketler kayıt altına alınarak (gerekirse taramadan geçirilerek) sakine teslim edilir."
      },
      {
        "type": "h3",
        "text": "Plaza girişlerinde misafir bekleme süresi nasıl azaltılır?"
      },
      {
        "type": "p",
        "text": "QR kodlu mobil davetiye sistemi ile turnikelerden temassız ve beklemesiz geçiş sağlanabilir."
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
    "tldr": "Şişli bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Şişli bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Şişli Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Şişli'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Şişli bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Şişli Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Şişli bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Şişli Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Şişli projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Şişli bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Chiller ve AHU klima santrallerinde frekans invertörleri ve filtre temizlikleriyle enerji verimliliği",
          "Kompanzasyon panosu telemetrisi ile dağıtım şirketi reaktif/kapasitif enerji cezası riskinin azaltılması",
          "Merkezi adresli yangın ihbar santrallerinde duman dedektörleri, damperler ve acil anons testleri",
          "Fan-coil serpantinlerinin periyodik temizlik ve dezenfeksiyonu ile hava kalitesinin artırılması"
        ]
      },
      {
        "type": "h2",
        "text": "2. Kestirimci (Predictive) Mühendislik ve Enerji Tasarrufu"
      },
      {
        "type": "p",
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Şişli bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Kompanzasyon takibi ile reaktif ceza riski azaltılır, chiller eko-modülasyonu ile elektrik tüketiminin düşürülmesi hedeflenir."
      },
      {
        "type": "h3",
        "text": "Yangın ihbar santrali arızası ne tür riskler doğurur?"
      },
      {
        "type": "p",
        "text": "Olası bir duman durumunda itfaiye ve yangın damperleri tetiklenemez; bu nedenle periyodik senaryo testi şarttır."
      },
      {
        "type": "cta",
        "text": "Şişli'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Şişli bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Şişli bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Şişli projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Şişli bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Şişli, Avrupa Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Şişli Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Şişli sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Şişli bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Şişli'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "5188 sayılı Kanun özel güvenlik görevlilerine belirli yasal yetkiler (kimlik sorma, arama, yakalama) tanırken, bu yetkilerin sınırlarının aşılması TCK kapsamında suç teşkil edebilir.",
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
          "Zor Kullanma ve Meşru Müdafaa: TCK m.25 kapsamında can ve mal güvenliğini korumak için orantılı güç kullanma.",
          "Suçüstü Yakalama ve Teslim: Hırsızlık, darp, haneye tecavüz anında faili yakalayarak gecikmeksizin genel kolluğa (Polis/Jandarma) teslim etme.",
          "Olay Yerini ve Delilleri Koruma: Suç delillerinin bozulmasını veya kaybolmasını engellemek için olay yerini güvenlik şeridiyle koruma altına alma."
        ]
      },
      {
        "type": "h2",
        "text": "2. Özel Güvenlik Görevlisinin Yapamayacağı İşler (Yasal Sınırlar)"
      },
      {
        "type": "ul",
        "items": [
          "Genel Kolluk Yetkilerini Kullanma: Genel kolluğun yetkilerine sahip değildir; arama yetkisi kanunda belirlenen şartlarla sınırlıdır.",
          "İfade Alma ve Gözaltı: Kişileri sorgulayamaz, tutanak dışı ifade alamaz veya nezarethaneye kapatamaz.",
          "Konut Dokunulmazlığı İhlali: Kat malikinin rızası veya mahkeme kararı olmadan daire içine giremez.",
          "Görev Dışı Çalıştırma Yasağı: Güvenlik görevlisine kapıcılık, çöp toplama, bahçe sulama gibi temizlik işleri yaptırılamaz."
        ]
      },
      {
        "type": "h2",
        "text": "3. Site Yöneticisinin Hukuki ve İdari Sorumlulukları"
      },
      {
        "type": "p",
        "text": "Valilik Özel Güvenlik İzni (ÖGİ) almadan lisanssız personel çalıştıran veya personeli görevi dışında kullanan site yöneticileri hakkında 5188 Sayılı Kanun uyarınca idari para cezası ve gerektiğinde adli işlem uygulanabilir."
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
        "text": "Hayır, kimlik belgesini emanet olarak alıkoymak hukuka aykırı olabilir. Yalnızca kimlik bilgileri kaydedilir ve belge sahibine derhal iade edilir."
      },
      {
        "type": "h3",
        "text": "Güvenlik görevlisi silah taşıyabilir mi?"
      },
      {
        "type": "p",
        "text": "Konut sitelerinde güvenlik genellikle silahsızdır. Silahlı görevli istihdamı için Valilik İl Özel Güvenlik Komisyonu'ndan özel gerekçeli karar alınması gerekir."
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
          "6. Kalite ve Yönetim Sertifikaları: Akredite kuruluşlarca verilmiş güncel ISO 45001 İSG ve ISO 14001 Çevre gibi yönetim sistemi belgelerinin bulunması.",
          "7. Bağımsız Denetim Açıklığı: Düzenli aralıklarla kat malikleri denetçilerine tüm evrak ve ekstrelerin şeffafça sunulması."
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
        "text": "Sözleşmeler çoğunlukla 1 yıllık yapılır; Kat Malikleri Kurulu her yıl yöneticinin ibra durumunu ve performansını oylayarak devam veya fesih kararı alır."
      },
      {
        "type": "h3",
        "text": "Yönetim şirketinin parayı zimmetine geçirme riski var mıdır?"
      },
      {
        "type": "p",
        "text": "Alo Yönetim modelinde tüm paralar site adına açılan resmi banka hesabında tutulur; kat malikleri ve denetçi hesap hareketlerini izleyebilir."
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
    "tldr": "Ümraniye bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ümraniye, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Sitelerde akıllı Plaka Tanıma Sistemi (PTS) ve nizamiye karşılama",
          "Çocuk parkları, spor sahaları ve peyzaj yürüyüş yollarında periyodik yaya devriye güvenlik turları",
          "Alo Güvenlik ve 3G Güvenlik desteğiyle süpervizör denetimleri",
          "Kapalı otoparklarda yangın çıkış kapıları ve sığınak alanlarının RFID tur kontrol kalemiyle denetimi"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Ümraniye bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
      },
      {
        "type": "h2",
        "text": "Sıkça Sorulan Sorular (SSS)"
      },
      {
        "type": "h3",
        "text": "Ümraniye bölgesindeki sitelerde güvenlik nasıl organize edilir?"
      },
      {
        "type": "p",
        "text": "Giriş kapılarında vardiyalı güvenlik ve çevre kameralarıyla entegre koruma sağlanır."
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
    "tldr": "Ümraniye bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Ümraniye bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Ümraniye bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Ümraniye bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Ümraniye projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Ümraniye bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
          "Sanayi tesislerinde ve büyük sitelerde Y.G. Trafo İşletme Sorumluluğu",
          "Yangın hidrant hatları ve dizel yangın pompalarının periyodik otomatik debi ve basınç testleri",
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
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Ümraniye bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Yüksek gerilim tesislerinde mevzuat gereği işletme sorumlusu mühendis görevlendirilmesi gerekebilir; ayrıntılar için güncel kuralları kontrol edin."
      },
      {
        "type": "h3",
        "text": "Yangın hidrant testi ne sıklıkla yapılmalıdır?"
      },
      {
        "type": "p",
        "text": "Binaların Yangından Korunması Hakkında Yönetmelik uyarınca yönetmeliğin öngördüğü aralıklarla debi ve basınç testi yapılmalıdır."
      },
      {
        "type": "cta",
        "text": "Ümraniye'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Ümraniye bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ümraniye bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Ümraniye projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Ümraniye bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Ümraniye, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Ümraniye Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Ümraniye sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Ümraniye bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Ümraniye'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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
    "tldr": "Üsküdar bölgesindeki toplu konut ve ticari projelerde 5188 lisanslı güvenlik kadrosu, akıllı plaka tanıma ve 3G Güvenlik desteğiyle koruma çözümleri sunuyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Üsküdar, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki konut projeleri, iş merkezleri ve geniş parsel siteler; sakinlerine huzurlu, güvenli ve prestijli bir yaşam alanı sunmak için profesyonel özel güvenlik yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Bölgesine Özel 4 Stratejik Güvenlik Protokolü"
      },
      {
        "type": "ul",
        "items": [
          "Korulu sitelerde çevre algılama sistemleri",
          "Estetik uyumlu nizamiye kulübelerinde VIP karşılama ve güvenlik",
          "Gece koru içi aydınlatmalı parkurlarda RFID noktalarıyla periyodik olarak taranan devriyeler",
          "Dar site girişlerinde trafik sıkışıklığının önlenmesine yönelik bariyer otomasyonu"
        ]
      },
      {
        "type": "h2",
        "text": "2. 5188 Sayılı Kanun ve Yasal Sorumluluk Güvencesi"
      },
      {
        "type": "p",
        "text": "Tüm güvenlik operasyonlarımız 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve Valilik Özel Güvenlik İzni (ÖGİ) çerçevesinde yürütülür. Personelimiz 5188 kapsamında lisanslı ve kimlik kartlıdır. Olası risklere karşı sözleşme kapsamında 3. Şahıs Mali Mesuliyet Sigortası teminatı düzenlenir."
      },
      {
        "type": "h2",
        "text": "3. 3G Güvenlik (3gguvenlik.com) Operasyonel Denetim Ağı"
      },
      {
        "type": "p",
        "text": "Grup şirketimiz 3G Güvenlik süpervizör ekipleri, Üsküdar bölgesindeki nöbet noktalarımızı periyodik olarak sahada denetler; nöbet defteri ve RFID devriye kayıtları raporlanır."
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
        "text": "Ağaçlık alanlara yerleştirilen RFID kontrol noktaları gece boyunca periyodik olarak taranır."
      },
      {
        "type": "h3",
        "text": "Villa sitelerinde güvenlik personeli seçimi nasıl olur?"
      },
      {
        "type": "p",
        "text": "Eğitimli ve referanslı personeller atanır."
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
    "tldr": "Üsküdar bölgesindeki sitelerde haşere ve dezenfeksiyon operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki toplu konutlarda ve binalarda apartman boşlukları, çöp şutları, sığınaklar ve kapalı otoparklar haşere ve kemirgen üremesi için elverişlidir. Ruhsatlı ürünler ve uzman ekiplerle entegre vektör mücadelesi yürütüyoruz."
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
        "text": "Her ilaçlama operasyonu sonrasında site yönetimine uygulama raporu ve kullanılan ürünlerin güvenlik bilgi formları (SDS) teslim edilir."
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
        "text": "Jel ilaçlama uygulamasında evi boşaltmaya gerek yoktur; ULV yapılan ortak alanlar ise ürün talimatına göre kapalı tutulup havalandırılır."
      },
      {
        "type": "h3",
        "text": "İlaçlama periyodu ne sıklıkta olmalıdır?"
      },
      {
        "type": "p",
        "text": "Periyot, sitenin risk değerlendirmesine ve uygulayıcı firmanın önerisine göre belirlenir; rögar ve çevre hatları ile kapalı ortak alanlar düzenli aralıklarla ilaçlanır."
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
    "pillar": "/hizmetler/havuz-bakimi-ve-hijyen",
    "tldr": "Üsküdar bölgesindeki sitelerde havuz bakımı ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki sitelerde ve rezidanslarda yüzme havuzları yaz aylarında en çok kullanılan sosyal alandır. Sağlık Bakanlığı \"Yüzme Havuzlarının Tabi Olacağı Sağlık Esasları Hakkında Yönetmelik\" doğrultusunda havuz işletmesinde destek sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Havuz Bakım Protokolümüzün 4 Temel Adımı"
      },
      {
        "type": "ul",
        "items": [
          "Günlük Klor ve pH Ölçümleri: Serbest klor ve pH dengesinin yönetmelikte belirlenen aralıklarda tutulması.",
          "Düzenli Kum Filtresi Ters Yıkama: Filtrede biriken organik partiküllerin tahliyesi ve denge tankı taban temizliği.",
          "Otomatik Havuz Robotu Dip Süpürme: Açılış öncesi tabana çöken mikro tozların robotlarla vakumlanması.",
          "Laboratuvar Analizleri: Mevzuatın öngördüğü sıklıkta numune verilip mikrobiyolojik test raporlarının kayıt altında tutulması."
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
        "text": "Sağlık Bakanlığı mevzuatındaki sorumlu kişi ve havuz suyu operatörü şartlarına uyulmalıdır; ayrıntılar için il sağlık müdürlüğüne danışın."
      },
      {
        "type": "h3",
        "text": "Havuzda klor kokusu ve göz yanması neden olur?"
      },
      {
        "type": "p",
        "text": "Bağlı klor (kloramin) birikiminden kaynaklanır; şok klorlama yapılarak su dengesi düzeltilir."
      },
      {
        "type": "cta",
        "text": "Üsküdar'deki siteniz için profesyonel yüzme havuzu bakım teklifi alın.",
        "href": "/hizmetler/havuz-bakimi-ve-hijyen",
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
    "tldr": "Üsküdar bölgesindeki sitelerde hukuk ve i̇cra danışmanlığı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki sitelerde aidat tahsilat disiplini sağlamak ve genel kurulların yasal geçerliliğini korumak için kat mülkiyeti hukukunda uzman avukat kadromuzla tam kapsamlı hukuk müşavirliği desteği sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Sitelerinde 4 Temel Hukuki Hizmetimiz"
      },
      {
        "type": "ul",
        "items": [
          "Hızlı İcra Takibi: Vadesi geçen aidat borçlularına UYAP üzerinden ilamsız icra takibi ve KMK m.20 aylık %5 gecikme tazminatı işletilmesi.",
          "Genel Kurul Divan Yönetimi: Çağrı, hazirun ve karar tutanaklarının mevzuata uygun şekilde hazırlanması.",
          "Yönetim Planı Güncellemesi: KMK m.28 ve m.70 uyarınca sitenin güncel ihtiyaçlarına göre (genel yapılarda 4/5, toplu yapılarda 2/3 çoğunlukla) tescili.",
          "Personel İhtilafları: Kapıcı ve güvenlik kıdem tazminatı, fazla mesai davalarında iş hukuku savunması."
        ]
      },
      {
        "type": "h2",
        "text": "2. İcra İnkar Tazminatı ve Tahsilat Modeli"
      },
      {
        "type": "p",
        "text": "Borçlunun haksız itirazlarında açılan itirazın iptali davalarında %20 icra inkar tazminatı ve tüm yargılama giderleri borçluya yükletilebilir; bu da site bütçesinin korunmasına yardımcı olur."
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
        "text": "Kat maliki asıl borçludur, kiracı da KMK m.22 uyarınca kira miktarı kadar müteselsilen sorumludur; icra takibi doğrudan ev sahibine yöneltilebilir."
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
    "tldr": "Üsküdar bölgesindeki sitelerde peyzaj ve bahçe bakımı operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki sitelerin yeşil alanları, çocuk oyun parkları ve peyzaj alanları; sakinlerin yaşam kalitesine ve mülk değerine katkı sağlayan önemli alanlardır. Uzman peyzaj ekiplerimizle 4 mevsim profesyonel bahçe bakımı sunuyoruz."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Sitelerinde 4 Mevsim Peyzaj Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "İlkbahar Canlandırma: Çim havalandırma (verticut), yosun temizliği, tohum ara ekimi ve mevsimlik çiçek dikimi.",
          "Yaz Bakımı ve Akıllı Sulama: Gece saatlerinde toprak nem sensörlü otomatik sulama ile su tasarrufu ve haftalık çim biçimi.",
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
        "text": "Üsküdar projelerimizde çocukların ve evcil hayvanların sağlığını korumak amacıyla ruhsatlı ürünler tercih edilir ve çevre dostu organik ve biyolojik çözümler uygulanır."
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
        "text": "Toprak nem sensörlü akıllı sulama kontrol üniteleri ve yağmur algılayıcıları ile su israfının azaltılması hedeflenir."
      },
      {
        "type": "h3",
        "text": "Budanan ağaç dalları nasıl tahliye edilir?"
      },
      {
        "type": "p",
        "text": "Budanan dallar öğütülerek kompost olarak kullanılır veya belediye izinli alanlara nakledilir."
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
    "tldr": "Üsküdar bölgesindeki binalarda elektrik ve mekanik altyapıyı koruyan teknik servis, trafo işletme desteği ve enerji verimliliği odaklı mühendislik hizmeti sunuyoruz.",
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
        "text": "Teknik ekiplerimiz termal kamera ölçümleri, titreşim analizleri ve baca gazı testleri uygulayarak arızaları henüz gerçekleşmeden önler. Kompanzasyon panolarının düzenli takibi ile elektrik dağıtım şirketinin uyguladığı reaktif ceza faturalarının önüne geçilmesi hedeflenir."
      },
      {
        "type": "h2",
        "text": "3. Acil Müdahale Hedefi"
      },
      {
        "type": "p",
        "text": "Asansörde mahsur kalma, ana trafo kesintisi, hidrofor motor arızası veya ana su borusu patlağı gibi acil durumlarda Üsküdar bölgesindeki teknik servis ekiplerimiz en kısa sürede sahada müdahaleye başlamayı hedefler."
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
        "text": "Yağmur mevsimi öncesinde ve düzenli aralıklarla seviye flatörleri ve elektrik panoları test edilir."
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
        "text": "Üsküdar'deki tesisiniz için teknik bakım hizmeti hakkında teklif alın.",
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
    "tldr": "Üsküdar bölgesindeki sitelerde temizlik ve hijyen operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Üsküdar bölgesindeki prestijli toplu konut siteleri, rezidanslar ve iş merkezlerinde temizlik; sakin sağlığını ve bina prestijini koruyan en temel unsurdur. Endüstriyel zemin makineleri ve eğitimli kadrolarımızla yüksek hijyen standartlarını hedefliyoruz."
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
          "Asansör ve Lobi Dezenfeksiyonu: Gün boyu yoğun temas edilen buton ve kapı kollarının dezenfektan solüsyonlarla silinmesi.",
          "Çöp Şutu ve Toplama Odası Hijyeni: Koku ve bakteri oluşumunu engelleyen basınçlı sıcak su uygulaması."
        ]
      },
      {
        "type": "h2",
        "text": "2. Düzenli Denetim ve SGK Güvencesi"
      },
      {
        "type": "p",
        "text": "Üsküdar projelerimizde görev yapan temizlik personellerimiz İSG eğitimli ve kayıtlı çalışanlarımızdır; süpervizörlerimiz düzenli kontrollerle hijyen kalitesini takip eder."
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
        "text": "Kullanılan temizlik ve dezenfeksiyon ürünleri ilgili mevzuata uygun ruhsatlı ürünlerdir."
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
    "tldr": "Üsküdar bölgesindeki sitelerde tesis yönetimi operasyonlarını uzman kadro ve şeffaf yönetim anlayışıyla yürütüyoruz.",
    "content": [
      {
        "type": "p",
        "text": "Üsküdar, Anadolu Yakası'nın önemli yerleşim bölgelerinden biridir. Bölgedeki rezidanslar, plazalar ve siteler; sakinlerine huzurlu ve şeffaf bir yaşam alanı sunmak için entegre tesis yönetimine ihtiyaç duyar."
      },
      {
        "type": "h2",
        "text": "1. Üsküdar Bölgesinde 4 Boyutlu Entegre Tesis Yönetimi"
      },
      {
        "type": "ul",
        "items": [
          "Şeffaf Mali Yönetim: Üsküdar sakinlerinin mobil uygulama üzerinden banka hesaplarını ve faturaları izleyebildiği şeffaf mali yapı.",
          "5188 Lisanslı Güvenlik Koordinasyonu: Alo Güvenlik ve 3G Güvenlik iş birliği ile koordineli güvenlik yönetimi.",
          "Proaktif Teknik Bakım: Asansör yeşil etiket takibi, hidrofor, jeneratör ve trafo bakımlarında acil müdahale hedefi.",
          "Mevzuata Uygunluk: KMK m.35 ve m.37 uyarınca yıllık işletme projesi bütçelemesi ve genel kurul divan yönetimi."
        ]
      },
      {
        "type": "h2",
        "text": "2. Bölgesel Avantajlarımız ve Yerel Operasyon Gücü"
      },
      {
        "type": "p",
        "text": "Alo Yönetim olarak Üsküdar bölgesine kendi teknik, temizlik ve güvenlik ekiplerimizle doğrudan hizmet sunmayı hedefliyoruz."
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
        "text": "Kat Malikleri Kurulu kararı sonrasında tüm karar defterleri, banka hesapları ve teknik cihazlar resmi tutanakla devralınır."
      },
      {
        "type": "h3",
        "text": "Aidat ödemeleri hangi hesapta toplanır?"
      },
      {
        "type": "p",
        "text": "Üsküdar'deki siteniz adına açılan bağımsız banka hesabında toplanır; yönetim firması aidatları kendi hesabında toplamaz."
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

import fs from 'fs';
import path from 'path';
import { POSTS, CATEGORIES, PostBlock, Post } from '@/data/posts';

const FULL_ENCYCLOPEDIA_18: Record<string, {
  title?: string;
  description?: string;
  tags?: string[];
  tldr?: string;
  content: PostBlock[];
}> = {
  // 1. Tesis Yönetimi Nedir
  'tesis-yonetimi-nedir-kapsami-ve-iso-41001-standartlari': {
    title: 'Tesis Yönetimi Nedir? Kapsamı, ISO 41001 Standartları ve Binalar İçin Önemi (2026 Rehberi)',
    description: 'Tesis yönetimi (Facility Management) tanımı, uluslararası ISO 41001 standartları, geleneksel apartman yöneticiliğinden farkı ve binalara sağladığı operasyonel verimlilik.',
    tags: ['tesis yönetimi nedir', 'facility management', 'iso 41001', 'entegre tesis yönetimi', 'bina yönetimi', 'tesis işletme'],
    tldr: 'Tesis yönetimi; insan, mekan, süreç ve teknolojiyi entegre ederek binaların güvenli, sürdürülebilir, konforlu ve maliyet etkin biçimde işletilmesini sağlayan profesyonel disiplindir.',
    content: [
      { type: 'p', text: 'Günümüzün hızla dikey büyüyen metropollerinde rezidanslar, plazalar, lojistik depolar ve binlerce kişinin bir arada yaşadığı karma projeler; klasik bir kapıcı veya amatör yönetici refleksiyle idare edilemeyecek kadar devasa operasyonel hacimlere ulaşmıştır. Elektrik trafoları, merkezi iklimlendirme sistemleri, yangın hidrant hatları, 5188 sayılı özel güvenlik operasyonları ve milyonlarca liralık işletme bütçeleri, mühendislik vizyonu ve hukuki uzmanlık gerektirir. İşte bu noktada Tesis Yönetimi (Facility Management - FM) küresel bir disiplin ve endüstri standardı olarak devreye girer.' },
      { type: 'h2', text: '1. Tesis Yönetimi (Facility Management) Nedir?' },
      { type: 'p', text: 'Uluslararası Tesis Yönetimi Derneği (IFMA) ve Uluslararası Standartlar Teşkilatı (ISO) tanımlarına göre tesis yönetimi; "İnsanların yaşadığı veya çalıştığı yapılı çevrede (binalar, siteler, iş merkezleri, fabrikalar) konforu, güvenliği, işlevselliği, sürdürülebilirliği ve maliyet etkinliğini sağlamak amacıyla insan, mekan, süreç ve teknolojiyi entegre eden profesyonel yönetim fonksiyonudur."' },
      { type: 'p', text: 'Tesis yönetimi yalnızca bir arıza meydana geldiğinde tamirci çağırmak değildir; binanın 10, 20 ve 50 yıllık yaşam döngüsünü (Life-Cycle Cost) planlayarak demirbaş amortismanını yöneten, enerji verimliliğini artıran ve kat sakinlerine huzurlu bir yaşam ortamı sunan proaktif bir organizasyondur.' },
      { type: 'h2', text: '2. ISO 41001:2018 Entegre Tesis Yönetim Standardı ve İlkeleri' },
      { type: 'p', text: 'Küresel ölçekte kabul gören ISO 41001:2018 Entegre Tesis Yönetim Sistemi Standardı, kurumsal işletmeciliğin anayasası niteliğindedir. Bu standart tesis yönetiminin şu 4 ana hedefe odaklanmasını şart koşar:' },
      { type: 'ul', items: [
        'Kaynak ve Enerji Verimliliği: Ortak alan enerji tüketimi, su tüketimi ve kimyasal kullanımında %25-33 oranında ölçülebilir tasarruf sağlamak.',
        'Operasyonel İş Sürekliliği (Business Continuity): Jeneratör, trafo, hidrofor ve asansör gibi kritik bileşenlerde arıza duruş sürelerini sıfıra indirmek.',
        'Yasal Mevzuat Uyumu: 634 Sayılı Kat Mülkiyeti Kanunu (KMK), 5188 Sayılı Özel Güvenlik Kanunu ve 6331 Sayılı İSG Kanunu gereklerini eksiksiz yerine getirmek.',
        'Müşteri ve Sakin Memnuniyeti (SLA): 7/24 çağrı merkezi ve dijital talep sistemi üzerinden arızalara maksimum 45 dakika içinde müdahale garantisi sunmak.'
      ]},
      { type: 'h2', text: '3. Geleneksel Site Yöneticiliği ile Profesyonel Tesis Yönetimi Arasındaki 5 Temel Fark' },
      { type: 'quote', text: 'Geleneksel yöneticilik reaktiftir; yani asansör bozulunca usta çağırır. Profesyonel tesis yönetimi ise proaktiftir; kestirimci sensörler ve planlı bakımlarla asansörün hiç arızalanmamasını sağlar.' },
      { type: 'p', text: 'Amatör yönetimler genellikle kat sakinlerinin boş vakitlerinde yürüttüğü, şeffaf olmayan excel tablolarına ve komşuluk tartışmalarına dayanan kırılgan bir yapıya sahiptir. Oysa profesyonel tesis yönetimi:' },
      { type: 'ol', items: [
        'Hukuki Güvence Sunar: Noter onaylı işletme projesi tebligatı ve KMK m.20 icra takipleri uzman hukukçularca yürütülür.',
        'Toplu Tedarik Gücü Sağlar: Yüzlerce projeyi yönetmenin getirdiği satın alma hacmi ile asansör, kimyasal ve sigortada %35 indirim kazandırır.',
        '7/24 Şeffaf Mobil Takip Sağlar: Sakinler tüm gelir-gider faturalarını ve denetim raporlarını cep telefonu uygulamasından anlık görebilir.',
        'İşveren Risklerini Sıfırlar: Kapıcı, güvenlik ve temizlik personelinin kıdem tazminatı ve SGK sorumlulukları kurumsal güvenceye alınır.',
        'Mülk Değerini Yükseltir: Düzenli ve prestijli işletilen binalarda dairelerin satış ve kira değeri emsallerine göre %20-30 daha yüksek seyreder.'
      ]},
      { type: 'h2', text: '4. Tesis Yönetiminin 4 Stratejik Sütunu' },
      { type: 'p', text: 'Başarılı bir tesis işletmesi, 4 temel fonksiyonun birbiriyle senkronize çalışmasıyla mümkündür:' },
      { type: 'ul', items: [
        '1. İnsan (People): 5188 lisanslı özel güvenlik görevlileri, sertifikalı teknik teknisyenler ve güler yüzlü VIP concierge personeli.',
        '2. Mekan (Place): Peyzaj alanları, kapalı otoparklar, sığınaklar, sosyal tesisler, yüzme havuzları ve ortak koridorlar.',
        '3. Süreç (Process): KMK bütçe hazırlama, acil durum tahliye planları, yangın tatbikatları ve periyodik bakım takvimleri.',
        '4. Teknoloji (Technology): Akıllı plaka tanıma sistemleri (PTS), IoT enerji analizörleri, RFID devriye tur kalemleri ve bina otomasyonu (BMS).'
      ]},
      { type: 'h2', text: '5. Tesis Yönetiminde Sık Yapılan 4 Hata ve Çözüm Yolları' },
      { type: 'ul', items: [
        'Yetkisiz Bekçi Çalıştırmak: 5188 lisansı olmayan kişilere üniforma giydirip güvenlik hizmeti verdirmek yüz binlerce liralık idari para cezalarına yol açar. Çözüm: Valilik izinli kurumsal güvenlik firmasıyla çalışmaktır.',
        'İşletme Projesini Tebliğ Etmemek: KMK m.37 uyarınca taahhütlü mektupla veya imza karşılığı tebliğ edilmeyen aidat bütçesi hukuken kesinleşmez ve icra takipleri iptal olur.',
        'Bakımları Belgesiz Münferit Ustalara Yaptırmak: TSE HYB belgesi olmayan ustalara yapılan asansör ve hidrofor bakımları olası can kayıplarında yöneticiye hapis cezası sorumluluğu doğurur.',
        'Gecikme Tazminatını Yanlış Uygulamak: KMK m.20 uyarınca aidat gecikme tazminatı aylık %5 (yıllık %60) olarak hesaplanmalıdır; farklı oranlar mahkemeden döner.'
      ]},
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Tesis yönetim şirketiyle çalışmak aidatları artırır mı?\nCevap: Hayır, tam aksine. Profesyonel yönetim şirketleri toplu elektrik tedariki, asansör bakım indirimleri ve gereksiz personel optimizasyonu sayesinde aidat bütçelerinde ortalama %25-33 net tasarruf sağlar.' },
      { type: 'p', text: 'Soru: Kaç daireli binalar tesis yönetimine ihtiyaç duyar?\nCevap: 8 bağımsız bölümden büyük tüm binalarda kanunen yönetici seçimi zorunludur. Ancak merkezi ısıtma, asansör, jeneratör ve ortak güvenlik ihtiyacı olan 20 daire ve üzeri tüm yapılarda profesyonel tesis yönetimi vazgeçilmez bir gerekliliktir.' },
      { type: 'cta', text: 'Tesisiniz için ISO 41001 standartlarında profesyonel yönetim teklifi alın.', href: '/hizmetler/tesis-yonetimi', label: 'Tesis Yönetimi Çözümlerimiz' }
    ]
  },

  // 2. Entegre Tesis Yönetimi
  'entegre-tesis-yonetimi-hizmetleri-nelerdir-kapsamli-rehber': {
    title: 'Entegre Tesis Yönetimi Hizmetleri Nelerdir? A\'dan Z\'ye Kapsamlı Sektör Rehberi',
    description: 'Entegre tesis yönetiminin 3 ana sütunu: Teknik (Hard Services), Destek (Soft Services) ve Hukuki/Mali Yönetim. Tek elden yönetimin %30 tasarruf modeli.',
    tags: ['tesis yönetimi hizmetleri', 'entegre yönetim', 'soft services', 'hard services', 'tesis işletmeciliği'],
    tldr: 'Entegre tesis yönetimi; temizlikten güvenliğe, teknik bakımdan aidat tahsilatına kadar tüm bina fonksiyonlarını tek bir kurumsal çatı altında toplayan uçtan uca işletme modelidir.',
    content: [
      { type: 'p', text: 'Büyük ölçekli konut projelerinde, plazalarda ve organize sanayi sitelerinde temizliği bir taşerona, güvenliği başka bir firmaya, asansör ve hidrofor bakımını ayrı ustalara, aidat takibini ise münferit bir muhasebeciye vermek; koordinasyon krizlerine, mükerrer faturalandırmalara ve sorumluluğu birbirine atma sorununa yol açar. Entegre Tesis Yönetimi (Integrated Facility Management - IFM), bir yapının ihtiyaç duyduğu tüm operasyonel, teknik ve hukuki hizmetleri tek bir kurumsal çatı ve tek bir sözleşme altında birleştiren modern yönetim modelidir.' },
      { type: 'h2', text: '1. Entegre Tesis Yönetiminin 3 Ana Hizmet Sütunu' },
      { type: 'h3', text: 'A. Teknik İşletme ve Bakım Hizmetleri (Hard Services)' },
      { type: 'p', text: 'Binanın fiziksel varlıklarını, enerji altyapısını ve mekanik sistemlerini kapsar. Bu hizmetler binanın güvenliğini ve iş sürekliliğini teminat altına alır:' },
      { type: 'ul', items: [
        'HVAC ve Merkezi İklimlendirme: Chiller soğutma grupları, kazan daireleri, klima santralleri ve fan-coil filtre bakımları.',
        'Elektrik ve Enerji Altyapısı: Yüksek gerilim trafo işletme sorumluluğu, kompanzasyon panosu reaktif ceza takibi ve transfer panolu jeneratör bakımı.',
        'Dikey Taşıma Sistemleri: TSE onaylı A Tipi Muayene Kuruluşları ile yeşil etiket asansör denetimleri ve yürüyen merdiven kontrolleri.',
        'Yangın ve Güvenlik Otomasyonu: Yangın hidrant hatları, sprinkler pompaları, duman tahliye damperleri ve acil anons testleri.',
        'Sıhhi Tesisat ve Arıtma: Su depoları periyodik dezenfeksiyonu, hidrofor basınç ayarları ve pis su terfi pompaları kontrolleri.'
      ]},
      { type: 'h3', text: 'B. Destek ve Yaşam Hizmetleri (Soft Services)' },
      { type: 'p', text: 'Sakinlerin ve ziyaretçilerin günlük konforunu, sağlığını ve güvenliğini doğrudan etkileyen insan odaklı hizmetlerdir:' },
      { type: 'ul', items: [
        '5188 Lisanslı Özel Güvenlik: 7/24 fiziki koruma, CCTV çevre güvenlik kameraları izleme ve plaka tanıma sistemi (PTS) yönetimi (Grup şirketimiz 3G Özel Güvenlik güvencesiyle).',
        'Endüstriyel Hijyen ve Temizlik: Ortak alanlar, merdivenler, otoparklar, çöp şutları ve cam cephelerin Sağlık Bakanlığı onaylı kimyasallarla temizliği.',
        'VIP Concierge ve Resepsiyon: Lobi karşılama, kargo/kurye kabul otomasyonu, VIP transfer ve sakin talep yönetimi.',
        'Peyzaj ve Bahçe Bakımı: Çim biçme, mevsimlik budama, otomatik sulama sistemi yönetimi ve bitki besleme.',
        'Vektör İlaçlama ve Sıfır Atık: Haşere kontrolü ve Çevre Şehircilik Bakanlığı Sıfır Atık Yönetmeliği uyumlu geri dönüşüm ayrıştırması.'
      ]},
      { type: 'h3', text: 'C. Hukuki, Mali ve İdari Yönetim' },
      { type: 'p', text: 'Sitenin anayasal ve yasal düzenini sağlayan kurumsal arka plan fonksiyonlarıdır:' },
      { type: 'ul', items: [
        'KMK m.37 İşletme Projesi: Yıllık tahmini bütçenin hazırlanması, arsa payı hesaplamaları ve noter/tebligat süreçleri.',
        'Düzenli Aidat Tahsilatı: Kredi kartı ve banka entegrasyonuyla %98 tahsilat başarısı.',
        'Hukuk ve İcra Takibi: Borcunu ödemeyen sakinlere karşı aylık %5 gecikme tazminatlı ilamsız icra takipleri.',
        'Bordrolama ve İSG: Personel SGK bildirimleri, maaş ödemeleri ve 6331 sayılı İSG eğitimleri.'
      ]},
      { type: 'h2', text: '2. Neden Ayrı Firmalar Değil de Tek Elden Entegre Yönetim?' },
      { type: 'quote', text: 'Farklı taşeronlarla çalışıldığında bir su baskınında teknik ekip güvenlik ekibini, güvenlik ise temizlik ekibini suçlar. Entegre yönetimde tek muhatap vardır; hesap verilebilirlik %100\'dür.' },
      { type: 'p', text: 'Tek elden entegre yönetim modelinin sağladığı 3 büyük avantaj:' },
      { type: 'ol', items: [
        'Maliyet Avantajı: Tek sözleşme ve merkezi satın alma ile ortak alan işletme maliyetlerinde %30 net tasarruf elde edilir.',
        'Hızlı Kriz Yönetimi: Yangın, deprem veya su baskını anında güvenlik, teknik ve temizlik ekipleri tek bir acil eylem planına göre senkronize hareket eder.',
        'Şeffaf Denetim: Tüm operasyonel raporlar tek bir dijital platform üzerinden denetçilere ve kat maliklerine sunulur.'
      ]},
      { type: 'h2', text: '3. Entegre Tesis Yönetiminde SLA (Hizmet Seviyesi Taahhüdü)' },
      { type: 'p', text: 'Kurumsal bir tesis yönetimi şirketiyle çalışırken Service Level Agreement (SLA) kriterleri net olmalıdır:' },
      { type: 'ul', items: [
        'Kritik Arıza Müdahale: Asansör mahsur kalması ve ana elektrik kesintilerinde maksimum 30 dakika müdahale.',
        'Standart Talep Çözümü: Ampul değişimi, kapı hidroliği ayarı veya temizlik taleplerinde maksimum 2 saatte çözüm.',
        'Şeffaf Bütçe Raporlaması: Her ayın 5\'inde bir önceki ayın tüm banka ve harcama ekstrelerinin mobil uygulamada yayınlanması.'
      ]},
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Entegre tesis yönetimi hizmeti neleri kapsar?\nCevap: Güvenlik, temizlik, teknik bakım, bahçe peyzajı, aidat muhasebesi, hukuk danışmanlığı ve enerji yönetiminin tamamını tek bir çatı altında kapsar.' },
      { type: 'p', text: 'Soru: Entegre yönetim modeli apartmanlara uygun mudur?\nCevap: Evet, 20 daireli bir butik apartmandan 2.000 konutlu mega yaşam alanlarına kadar her ölçekteki bina entegre yönetim avantajlarından yararlanabilir.' },
      { type: 'cta', text: 'Tesisinizin tüm hizmetlerini tek merkezden profesyonelce yönetin.', href: '/hizmetler/tesis-yonetimi', label: 'Entegre Tesis Yönetimi Hizmetlerimiz' }
    ]
  },

  // 3. Soft Destek Hizmetleri
  'tesis-yonetiminde-soft-destek-hizmetleri-nelerdir': {
    title: 'Tesis Yönetiminde Soft (Destek) Hizmetler Nelerdir? Temizlik, Güvenlik, Resepsiyon ve Peyzaj',
    description: 'Tesis yönetiminde destek (soft) hizmetlerin kapsamı: 5188 özel güvenlik, endüstriyel temizlik, concierge, resepsiyon, peyzaj bakımı ve atık yönetimi protokolleri.',
    tags: ['soft services', 'tesis temizlik', 'özel güvenlik', 'concierge resepsiyon', 'peyzaj bakımı', 'atık yönetimi'],
    tldr: 'Tesis yönetiminde soft hizmetler; sakinlerin ve ziyaretçilerin günlük konforunu, sağlığını ve güvenliğini doğrudan etkileyen operasyonel destek fonksiyonlarıdır.',
    content: [
      { type: 'p', text: 'Soft Services (Destek Hizmetleri), bir tesisin veya konut sitesinin fiziki yapısı içinde yaşayan ve çalışan insanların günlük yaşam konforunu, hijyenini, estetiğini ve emniyet hissini doğrudan belirleyen hizmetlerin bütünüdür. Teknik (Hard) hizmetler binanın çalışmasını sağlarken, Destek (Soft) hizmetler binada yaşanmasını keyifli ve prestijli hale getirir.' },
      { type: 'h2', text: '1. 5188 Lisanslı Özel Güvenlik ve Risk Yönetimi' },
      { type: 'p', text: 'Modern sitelerde güvenlik, kapıdaki personelin varlığından çok daha kapsamlı bir stratejidir. T.C. İçişleri Bakanlığı 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca lisanslı ve eğitimli personellerimizle 7/24 kesintisiz koruma sağlanır.' },
      { type: 'ul', items: [
        'Eğitim ve Sertifikasyon: Grup şirketimiz Alo Güvenlik (guvenlikkursu.com) bünyesinde yetiştirilmiş, kriz ve öfke kontrolü eğitimli güvenlik görevlileri.',
        'Saha Operasyonu ve Devriye: Grup şirketimiz 3G Özel Güvenlik (3gguvenlik.com) güvencesiyle RFID tur kontrol kalemleri ve GPS devriye takibi.',
        'Elektronik Entegrasyon: Plaka tanıma sistemleri (PTS), bariyer otomasyonu, çevre güvenlik kameraları ve yüz tanıma turnikeleri.'
      ]},
      { type: 'h2', text: '2. Endüstriyel Hijyen, Ortak Alan ve Çevre Temizliği' },
      { type: 'p', text: 'Toplu yaşam alanlarında hijyen standartları doğrudan halk sağlığı konusudur. Sağlık Bakanlığı onaylı biyosidal ürünler ve renk kodlu mikrofiber temizlik bezleri ile çapraz bulaşma riskleri sıfırlanır.' },
      { type: 'ul', items: [
        'Blok Girişleri ve Merdivenler: Günlük paspaslama, tırabzan dezenfeksiyonu ve cam silimi.',
        'Kapalı Otoparklar: Binicili zemin yıkama makineleriyle egzoz isi ve yağ lekelerinin temizlenmesi.',
        'Çöp Toplama ve Şut Dezenfeksiyonu: Her gün belirlenen saatlerde kapıdan çöp alımı ve çöp odalarının ozonla kokusuzlaştırılması.'
      ]},
      { type: 'h2', text: '3. VIP Concierge, Resepsiyon ve Kargo Otomasyonu' },
      { type: 'p', text: 'Rezidans ve iş merkezlerinin vitrini lobilerdir. Çok dilli karşılama personeli, gelen kargoları akıllı kargo dolaplarına teslim eder ve sakine SMS ile teslimat şifresi iletir. Vale hizmetleri ve misafir yönlendirmeleri otel konforunda yürütülür.' },
      { type: 'h2', text: '4. Peyzaj, Otomatik Sulama ve Bitki Besleme' },
      { type: 'p', text: 'Yeşil alanlar sitelerin en büyük prestij kaynağıdır. Ziraat mühendislerimiz kontrolünde çim biçme, mevsimlik çiçeklendirme, ağaç budama, gübreleme ve otomatik sulama nozullarının periyodik açı ayarları yapılır.' },
      { type: 'h2', text: '5. Vektör Kontrolü ve Sıfır Atık Yönetimi' },
      { type: 'p', text: 'Haşere, kemirgen ve sivrisineklere karşı Sağlık Bakanlığı onaylı periyodik ilaçlama yapılır. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Sıfır Atık Yönetmeliği kapsamında kağıt, cam, plastik ve organik atıklar ayrıştırılarak lisanslı geri dönüşüm tesislerine teslim edilir.' },
      { type: 'h2', text: '6. Soft Hizmetlerde Kalite Kontrol ve KPI Takibi' },
      { type: 'p', text: 'Tüm destek hizmetlerimiz aylık gizli denetimler, dijital karekodlu temizlik kontrol noktaları ve sakin anketleri ile puanlanır. %95 altı memnuniyet alan noktalarda derhal personel ve süreç iyileştirmesi yapılır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Temizlik personeli iş kazası geçirirse sorumluluk kime aittir?\nCevap: Profesyonel yönetim şirketi bünyesinde bordrolanan personellerin tüm İSG ve SGK sorumluluğu şirkete aittir; kat maliklerine şahsi rücu riski oluşmaz.' },
      { type: 'p', text: 'Soru: Güvenlik görevlilerinin nöbet çizelgeleri nasıl denetlenir?\nCevap: RFID devriye tur kontrol noktaları ve 7/24 operasyon merkezimizden anlık GPS telemetrisi ile nöbet aksamaları anında tespit edilir.' },
      { type: 'cta', text: 'Siteniz için profesyonel temizlik ve destek hizmeti teklifi alın.', href: '/hizmetler/temizlik-ve-hijyen', label: 'Temizlik & Hijyen Hizmetlerimiz' }
    ]
  },

  // 4. Hard Teknik Bakım
  'tesis-yonetiminde-hard-teknik-bakim-hizmetleri-nelerdir': {
    title: 'Tesis Yönetiminde Hard (Teknik) Hizmetler Nelerdir? HVAC, Elektrik, Asansör ve Yangın Otomasyonu',
    description: 'Bina ve tesislerde teknik (hard) bakım hizmetleri: merkezi iklimlendirme (HVAC), jeneratör, trafo, asansör yeşil etiket ve yangın hidrant sistemleri denetimi.',
    tags: ['hard services', 'tesis teknik bakım', 'hvac mekanik', 'asansör yeşil etiket', 'jeneratör trafo', 'yangın sprinkler'],
    tldr: 'Hard hizmetler; binanın fiziksel varlıklarını, mekanik ve elektrik altyapısını 7/24 çalışır durumda tutan, can ve mal güvenliğini teminat altına alan teknik işletme disiplinidir.',
    content: [
      { type: 'p', text: 'Hard Services (Teknik Bakım ve İşletme Hizmetleri), bir binanın yapısal bütünlüğünü, can ve mal güvenliğini, enerji sürekliliğini ve elektro-mekanik altyapısını kapsar. Bir tesisin dışarıdan ne kadar lüks göründüğü önemli değildir; eğer kazan dairesi çalışmıyor, asansörler kırmızı etiketli veya yangın pompaları arızalıysa, o tesis sakinleri için potansiyel bir tehlike alanıdır.' },
      { type: 'h2', text: '1. Isıtma, Soğutma ve Havalandırma (HVAC) Sistemleri' },
      { type: 'p', text: 'Merkezi sistem binalarda ortak alan ve daire içi iklimlendirme işletme maliyetlerinin %50\'sinden fazlasını oluşturur. Profesyonel teknik işletme kapsamında:' },
      { type: 'ul', items: [
        'Kazan Dairesi ve Brülör Bakımları: Yanma verimliliği analizleri ile doğalgaz tüketiminde %15 tasarruf.',
        'Chiller ve Soğutma Kuleleri: Gaz kaçak testleri, kondenser kimyasal yıkamaları ve glikol donma testleri.',
        'Klima Santralleri (AHU) ve Fan-Coil: Filtre değişimleri, serpantin dezenfeksiyonu ve hava debisi optimizasyonu.',
        'Isı Pay Ölçer ve Kalorimetre Okuma: Dairelerin tüketimlerinin KMK m.42 uyarınca adil faturalandırılması.'
      ]},
      { type: 'h2', text: '2. Yüksek Gerilim Trafo ve Kompanzasyon Yönetimi' },
      { type: 'p', text: 'Tesislerin elektrik altyapısı uzman mühendisler tarafından yönetilmelidir:' },
      { type: 'ul', items: [
        'Trafo İşletme Sorumluluğu: EMO onaylı Yüksek Gerilim İşletme Sorumluluğu mühendislik sözleşmesi ve trafo yağı dielektrik testleri.',
        'Reaktif Ceza Önleme: Kompanzasyon panolarındaki kondansatörlerin günlük telemetri ile izlenerek dağıtım şirketi cezalarının sıfırlanması.',
        'Jeneratör ve Transfer Panosu: Şebeke kesintisinde 8 saniye içinde otomatik devreye girme testi ve 250 saatlik yağ/filtre bakımları.'
      ]},
      { type: 'h2', text: '3. Asansör ve Yürüyen Merdivenlerde Yeşil Etiket Güvencesi' },
      { type: 'p', text: 'Asansör İşletme ve Bakım Yönetmeliği gereğince tüm asansörler aylık yetkili servis bakımından geçmeli ve Sanayi Bakanlığı akredite A Tipi Muayene Kuruluşları (TSE, MMO) tarafından yılda bir kez denetlenerek Yeşil Bilgi Etiketi almalıdır. Kırmızı etiketli asansörlerin tespiti ve revizyonu şirketimiz koordinasyonunda yürütülür.' },
      { type: 'h2', text: '4. Yangın Güvenlik ve Sprinkler Sistemleri' },
      { type: 'p', text: 'Binaların Yangından Korunması Hakkında Yönetmelik gereğince dizel ve elektrikli yangın pompaları haftalık otomatik test edilir. Yangın hidrant debileri, ıslak borulu sprinkler hatları, duman tahliye damperleri ve acil kaçış aydınlatmaları sürekli faal tutulur.' },
      { type: 'h2', text: '5. Su Depoları, Hidrofor ve Pis Su Terfi İstasyonları' },
      { type: 'p', text: 'İçme ve kullanma suyu depoları yılda en az 2 kez Sağlık Bakanlığı onaylı dezenfektanlarla temizlenir, klorlama cihazları kontrol edilir. Otopark tabanlarındaki foseptik ve pis su terfi pompaları seviye flatörleri su baskınlarına karşı çift pompalı yedekli çalıştırılır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Kırmızı etiketli asansör çalıştırılırsa yöneticinin cezai sorumluluğu nedir?\nCevap: Kırmızı etiketli asansörün mühürlenmesi gerekir. Mührün koparılıp çalıştırılması halinde olası bir kazada yönetici TCK kapsamında taksirle adam yaralama veya öldürme suçundan hapis cezası ile yargılanır.' },
      { type: 'p', text: 'Soru: Jeneratör bakımı ne sıklıkla yapılmalıdır?\nCevap: Jeneratörler haftalık 10 dakika yüksüz çalıştırılmalı, 6 ayda bir akü ve şarj ünitesi kontrol edilmeli ve yılda bir (veya 250 çalışma saatinde bir) tam periyodik filtre/yağ bakımı yapılmalıdır.' },
      { type: 'cta', text: 'Tesisiniz için 7/24 nöbetçi teknik servis ve bakım anlaşması yapın.', href: '/hizmetler/teknik-bakim', label: 'Teknik Bakım Hizmetlerimiz' }
    ]
  },

  // 5. Mülk vs Tesis
  'mulk-yonetimi-ile-tesis-yonetimi-arasindaki-farklar-nelerdir': {
    title: 'Mülk Yönetimi ile Tesis Yönetimi Arasındaki Farklar Nelerdir? (Property vs. Facility Management)',
    description: 'Gayrimenkul sektöründe sıkça karıştırılan mülk yönetimi (Property Management) ile tesis yönetimi (Facility Management) arasındaki 7 temel fark ve entegrasyonu.',
    tags: ['mülk yönetimi nedir', 'tesis yönetimi farkı', 'property management', 'kira yönetimi', 'gayrimenkul yönetimi'],
    tldr: 'Mülk yönetimi gayrimenkulün finansal getirisine ve kiracı ilişkilerine odaklanırken, tesis yönetimi binanın fiziki varlığına, teknik altyapısına ve günlük yaşam konforuna odaklanır.',
    content: [
      { type: 'p', text: 'Gayrimenkul ve konut sektöründe sıklıkla "Mülk Yönetimi" ve "Tesis Yönetimi" terimleri birbirinin yerine kullanılır. Oysa bu iki kavram gayrimenkulün farklı ancak birbirini tamamlayan iki stratejik ayağını temsil eder. Bir gayrimenkul yatırımının başarısı, hem mülk yönetiminin finansal getiriyi artırmasına hem de tesis yönetiminin binanın fiziki değerini korumasına bağlıdır.' },
      { type: 'h2', text: '1. Mülk Yönetimi (Property Management) Nedir?' },
      { type: 'p', text: 'Mülk yönetimi, gayrimenkul sahibinin ticari ve finansal çıkarlarını maksimize etmeye odaklanır. Temel sorumluluk alanı paranın akışı, kiracı ilişkileri ve yasal sözleşmelerdir:' },
      { type: 'ul', items: [
        'Doğru Kiracı Seçimi: Findeks kredi notu, kefil ve gelir belgelerinin doğrulanması.',
        'Kira Sözleşmesi ve Depozito Yönetimi: TÜFE oranlarında yasal kira artışlarının yapılması ve tahliye taahhütnamelerinin tanzimi.',
        'Kira Tahsilatı ve Hukuki Süreçler: Kirasını ödemeyen kiracılara karşı icra ve tahliye davalarının açılması.',
        'Gayrimenkul Vergi Takibi: Emlak vergisi, ÇTV ve beyanname süreçlerinin yürütülmesi.'
      ]},
      { type: 'h2', text: '2. Tesis Yönetimi (Facility Management) Nedir?' },
      { type: 'p', text: 'Tesis yönetimi ise binanın fiziksel varlığını, teknik cihazlarını, ortak alanlarını, temizliğini ve güvenliğini 7/24 çalışır durumda tutan operasyonel işletme disiplinidir. Binanın kalbini ve ciğerlerini (HVAC, jeneratör, güvenlik, asansör) yaşatır.' },
      { type: 'h2', text: '3. Karşılaştırmalı 7 Temel Fark Tablosu' },
      { type: 'ol', items: [
        'Odak Noktası: Mülk yönetimi finansal getiriye; tesis yönetimi operasyonel işlevsellik ve konfora odaklanır.',
        'Muhatap Kitle: Mülk yönetimi mal sahibi ve kiracıyla; tesis yönetimi binanın tüm kullanıcıları ve kat malikleri kuruluyla muhataptır.',
        'Hukuki Dayanak: Mülk yönetimi Borçlar Kanunu kira hükümlerine; tesis yönetimi Kat Mülkiyeti Kanunu ve İSG mevzuatına tabidir.',
        'Gelir/Gider Rolü: Mülk yönetimi gelir oluşturur (kira); tesis yönetimi giderleri optimize eder (ortak aidat bütçesi).',
        'Teknik Rol: Mülk yönetimi daire içi tadilatları koordine eder; tesis yönetimi ana trafo, yangın ve asansör altyapısını işletir.',
        'Güvenlik ve İSG: Mülk yönetimi sözleşme güvencesi sağlar; tesis yönetimi 5188 fiziki güvenlik ve acil tahliye süreçlerini yönetir.',
        'Süreklilik: Mülk yönetimi kiracı değişimlerinde aktiftir; tesis yönetimi 365 gün 7/24 kesintisiz sahadadır.'
      ]},
      { type: 'quote', text: 'Tesis yönetimi binayı mükemmel bir yaşam alanına dönüştürür; mülk yönetimi ise o mükemmel yaşam alanının getirdiği kira kazancını en üst seviyeye taşır.' },
      { type: 'h2', text: '4. İki Disiplinin Entegre Çalışma Örneği' },
      { type: 'p', text: 'Rezidans dairesi kiraya verilirken: Mülk yönetimi kiracıyı bulur ve kontratı imzalar; tesis yönetimi ise kiracının taşınma gününü planlar, asansör koruma pedlerini takar, araç plakasını PTS sistemine tanımlar ve akıllı sayaç endeksini kaydeder.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Dairem boş kaldığında aidatını kim öder?\nCevap: Daire boş olduğunda aidat ve ortak gider avansını mülk sahibi ödemekle yükümlüdür. Mülk yönetim hizmetimiz ile dairenin boş kalma süresi minimuma indirilir.' },
      { type: 'p', text: 'Soru: Yurt dışında yaşayan mülk sahipleri için hangi paket uygundur?\nCevap: Hem mülk yönetimi (kira tahsilatı ve vergi) hem de tesis yönetimi (aidat ve bakım takibi) hizmetlerinin bir arada sunulduğu VIP Portföy Yönetim Paketimiz tavsiye edilir.' },
      { type: 'cta', text: 'Hem tesis hem mülk yönetiminde kurumsal danışmanlık alın.', href: '/hizmetler/tesis-yonetimi', label: 'Tesis ve Mülk Yönetimi Çözümlerimiz' }
    ]
  },

  // 6. 10 Somut Fayda
  'profesyonel-tesis-yonetiminin-mulk-sahibine-10-somut-faydasi': {
    title: 'Profesyonel Tesis Yönetiminin Mülk Sahibine ve Kat Malikine 10 Somut Faydası',
    description: 'Sitelerde ve binalarda profesyonel tesis yönetim şirketiyle çalışmanın gayrimenkul değerine, bütçe tasarrufuna ve yaşam konforuna sağladığı 10 somut kazanç.',
    tags: ['tesis yönetiminin faydaları', 'gayrimenkul değer artışı', 'aidat tasarrufu', 'huzurlu yaşam', 'profesyonel yönetim'],
    tldr: 'Profesyonel tesis yönetimi mülkünüzün değerini %20-30 artırır, plansız arıza maliyetlerini sıfırlar, aidatlarda %30 tasarruf sağlar ve komşuluk ihtilaflarını bitirir.',
    content: [
      { type: 'p', text: 'Birçok bina ve site sakini, profesyonel yönetim şirketlerine ödenen hizmet bedelini bir maliyet kalemi olarak görür. Oysa kurumsal bir tesis yönetim şirketiyle çalışmak; sağladığı enerji tasarrufu, toplu satın alma indirimleri, yasal ceza önleme mekanizmaları ve gayrimenkul değer artışıyla kendi maliyetini fazlasıyla amorti eden en karlı gayrimenkul yatırımıdır.' },
      { type: 'h2', text: 'Mülk Sahibine ve Kat Malikine 10 Somut Kazanç' },
      { type: 'ol', items: [
        'Gayrimenkul Değerinde %20-30 Artış: Düzenli bakılan, temiz, yeşil alanı korunan ve 5188 güvenliği olan sitelerde daire fiyatları emsallerine göre çok daha hızlı prim yapar.',
        'Ortak Alan Bütçesinde %25-33 Tasarruf: Toplu elektrik tedariki, toptan kimyasal alımları ve jeneratör yakıt anlaşmaları ile aidatlar düşürülür.',
        'Pahalı Cihaz Ömürlerinin İki Katına Çıkması: Asansör, trafo, hidrofor ve chiller gruplarına yapılan kestirimci bakım sayesinde milyonluk ani yenileme masrafları engellenir.',
        '%98 Düzenli Aidat Tahsilatı: KMK m.20 kapsamında noter ihtarı ve ilamsız icra takipleri sayesinde kimsenin borcu diğer komşunun sırtına kalmaz.',
        'Komşuluk Huzuru ve Tarafsızlık: Aidat isteme, gürültü ikazı ve kural koyma tartışmaları komşular arasından çıkar; kurumsal ve tarafsız yönetimce yürütülür.',
        'Yasal Güvence ve Sıfır Ceza Riski: Kaçak bekçi çalıştırma, İSG ihlalleri veya asansör kırmızı etiket cezaları kurumsal denetimle tamamen önlenir.',
        '7/24 Şeffaf Mobil Finansal Takip: Kat malikleri her bir kuruşun nereye harcandığını, kasa mevcudunu ve banka hesap ekstrelerini mobil uygulamadan anlık görür.',
        '45 Dakika Acil Müdahale SLA Garantisi: Asansörde mahsur kalma, ana boru patlaması veya elektrik kesintilerine karşı nöbetçi teknik ekipler anında müdahale eder.',
        'Personel Kıdem Tazminatı ve SGK Güvencesi: Kapıcı ve temizlikçilerin kıdem fonu ayrılır; işten çıkışlarda site sakinlerinin karşısına sürpriz toplu tazminat faturaları çıkmaz.',
        'Sürdürülebilirlik ve Sıfır Atık: Çevre dostu enerji kullanımı, kompost üretimi ve sıfır atık yönetimi ile siteniz modern çevre standartlarına kavuşur.'
      ]},
      { type: 'quote', text: 'Profesyonel yönetim bir masraf değil; mülkünüzün değerini koruyan ve her ay bütçenizi artıya geçiren kurumsal bir kalkandır.' },
      { type: 'h2', text: 'Rakamlarla Profesyonel Yönetimin Yatırım Getirisi (ROI)' },
      { type: 'p', text: '100 daireli ortalama bir sitede profesyonel tesis yönetimine geçildiğinde: Yıllık elektrik faturalarında ~180.000 TL, asansör ve kimyasal toplu alımlarında ~120.000 TL, önleyici bakım sayesinde engellenen cihaz arızalarında ~250.000 TL olmak üzere toplamda yıllık 550.000 TL\'yi aşan net tasarruf sağlanmaktadır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Yönetim şirketinin sözleşme süresi ne kadardır?\nCevap: Genellikle sözleşmeler 1 yıllık Genel Kurul dönemleri için imzalanır. Kat Malikleri Kurulu memnun kaldığı sürece sözleşmeyi uzatır veya memnuniyetsizlik halinde yenilememe hakkına sahiptir.' },
      { type: 'p', text: 'Soru: Site adına açılan banka hesabındaki para yönetim şirketine mi ait olur?\nCevap: Kesinlikle hayır. Banka hesabı sitenin kendi vergi kimlik numarası adına açılır. Yönetim şirketi sadece genel kurul kararı ve işletme projesi limitleri dahilinde yetkili vekildir; denetçiler hesabı anlık izleyebilir.' },
      { type: 'cta', text: 'Sitenizin değerini artırmak için profesyonel yönetim rehberimizi inceleyin.', href: '/hizmetler/tesis-yonetimi/rehber', label: 'Tesis Yönetimi Rehberi' }
    ]
  },

  // 7. Yasal Sorumluluklar
  'tesis-yonetim-sirketlerinin-gorev-ve-yasal-sorumluluklari': {
    title: 'Tesis Yönetim Şirketleri Hangi Sorumlulukları Üstlenir? Yasal, Mali ve Operasyonel Görevler',
    description: '634 Sayılı Kat Mülkiyeti Kanunu ve İş Kanunu kapsamında profesyonel tesis yönetim şirketlerinin üstlendiği yasal mesuliyetler, mali denetim ve operasyonel görevler.',
    tags: ['tesis yönetim şirketinin görevleri', 'kmk madde 35', 'yönetici sorumlulukları', 'mali işletme bütçesi', 'isg sorumluluğu'],
    tldr: 'Tesis yönetim şirketi; KMK m.35 kapsamındaki tüm yasal yöneticilik görevlerini, işletme bütçesini, personel SGK/İSG süreçlerini ve ortak alan bakımını hukuki güvenceyle yürütür.',
    content: [
      { type: 'p', text: 'Site ve binalarda yöneticilik yetkisini üstlenen profesyonel tesis yönetim şirketleri; 634 Sayılı Kat Mülkiyeti Kanunu (KMK), Türk Borçlar Kanunu (vekalet hükümleri), İş Kanunu, 6331 Sayılı İSG Kanunu ve Türk Ticaret Kanunu karşısında kat malikleri kuruluna karşı doğrudan yasal, mali ve cezai sorumluluk taşır.' },
      { type: 'h2', text: '1. KMK Madde 35 Kapsamında Yasal Yönetici Görevleri' },
      { type: 'p', text: 'Kanunun 35. maddesi yöneticinin mutlak görevlerini net olarak sıralamıştır:' },
      { type: 'ul', items: [
        'Kararları Uygulamak: Kat malikleri kurulu tarafından alınan kararların karar defterine işlenmesi ve eksiksiz tatbik edilmesi.',
        'Koruma ve Bakım Tedbirleri: Ana gayrimenkulün gayesine uygun olarak kullanılması, korunması, bakımı ve onarımı için gereken tüm tedbirlerin zamanında alınması.',
        'İşletme Projesi (Bütçe) Tanzimi: KMK m.37 gereğince bir yıllık tahmini gelir-gider bütçesinin hazırlanıp tüm bağımsız bölüm maliklerine taahhütlü tebliğ edilmesi.',
        'Aidat ve Avans Tahsilatı: Ortak gider paylarının toplanması, ödemeyen kat maliklerine karşı noter ihtarı çekilmesi ve icra takibi açılması.',
        'Banka Hesabı Açılması: Site veya bina adına müstakil banka hesabı açılması ve tüm paranın bu hesapta şeffafça işletilmesi.',
        'Genel Kurul Çağrıları: Kat malikleri kurulunun olağan ve olağanüstü toplantılara usulüne uygun olarak davet edilmesi.'
      ]},
      { type: 'h2', text: '2. Mali ve İdari Şeffaflık Yükümlülüğü (KMK m.38 & m.39)' },
      { type: 'p', text: 'Yönetim şirketi; vekil sıfatıyla yürüttüğü faaliyetlerin hesabını vermekle mükelleftir. Yıl içinde denetçilerin yapacağı 3 aylık periyodik denetimlere tüm faturaları, banka dekontlarını ve sözleşmeleri eksiksiz sunmak zorundadır.' },
      { type: 'h2', text: '3. Personel, SGK ve İSG Sorumlulukları' },
      { type: 'p', text: 'Tesiste çalışan güvenlik, temizlik ve teknik personelin SGK giriş-çıkış bildirimleri, maaş bordroları, kıdem ve ihbar tazminatı fonları ve 6331 Sayılı İş Sağlığı ve Güvenliği eğitimleri şirketimizin sorumluluğundadır. Olası iş kazalarında mülk sahipleri hukuken korunur.' },
      { type: 'h2', text: '4. Yöneticinin Cezai Sorumluluğu (TCK Hükümleri)' },
      { type: 'p', text: 'Karar defterini notere tasdik ettirmemek, site aidatlarını şahsi hesaplarda tutmak veya işletme projesi olmaksızın usulsüz para toplamak Türk Ceza Kanunu kapsamında Güveni Kötüye Kullanma suçunu oluşturabilir. Profesyonel yönetim şirketi tüm bu riskleri kurumsal güvence altına alır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Yönetici genel kurul kararı olmadan ortak alanda tadilat yapabilir mi?\nCevap: Acil ve can güvenliğini tehdit eden durumlar (örneğin ana boru patlaması veya asansör halat kopması) hariç, yönetici genel kurulda bütçelendirilmemiş ve karara bağlanmamış büyük tadilatları tek başına yapamaz.' },
      { type: 'p', text: 'Soru: Denetçi yönetim şirketini nasıl denetler?\nCevap: Denetçi KMK m.41 uyarınca en az üç ayda bir kasa, banka hesapları, gelir-gider makbuzları ve karar defterini inceler ve raporunu kat malikleri kuruluna sunar.' },
      { type: 'cta', text: 'Yasal süreçler ve yönetim danışmanlığı hakkında bilgi alın.', href: '/hizmetler/yonetim-danismanligi', label: 'Yönetim Danışmanlığı Hizmetimiz' }
    ]
  },

  // 8. Tesis Yönetim Planı
  'tesis-yonetim-plani-nasil-hazirlanir-adim-adim-rehber': {
    title: 'Tesis Yönetim Planı Nasıl Hazırlanir? Adım Adım İşletme ve Bütçe Planlama Rehberi',
    description: 'Kat Mülkiyeti Kanunu Madde 28 uyarınca tüm kat maliklerini bağlayan sözleşme hükmündeki Tesis Yönetim Planı hazırlama, ortak alan kuralları ve işletme projesi rehberi.',
    tags: ['tesis yönetim planı', 'yönetim planı hazırlama', 'kmk madde 28', 'işletme projesi örneği', 'ortak gider paylaşımı'],
    tldr: 'Tesis yönetim planı; sitenin anayasası niteliğinde olup ortak alan kullanımlarını, aidat paylaşım kriterlerini ve yönetim organlarının yetkilerini belirleyen bağlayıcı hukuki belgedir.',
    content: [
      { type: 'p', text: '634 Sayılı Kat Mülkiyeti Kanunu Madde 28 uyarınca Yönetim Planı; ana gayrimenkulün yönetim tarzını, kullanma maksat ve şeklini, yönetici ve denetçilerin alacakları ücreti ve yönetime ait diğer hususları düzenleyen, bütün kat maliklerini ve onların haleflerini (yeni ev alanları veya kiracıları) bağlayan bir sözleşme hükmündedir. Bir sitenin huzuru, tapuya tescil edilmiş sağlam bir yönetim planıyla başlar.' },
      { type: 'h2', text: '1. Tesis Yönetim Planında Bulunması Zorunlu 6 Temel Bölüm' },
      { type: 'ul', items: [
        'Bölüm 1: Genel Hükümler: Tesisin adı, açık adresi, tapu ada/parsel bilgileri, blok ve bağımsız bölüm listesi.',
        'Bölüm 2: Ortak Yerler ve Kullanım Esasları: Kapalı otopark tahsisleri, sığınaklar, depolar, yüzme havuzu, fitness ve sauna kullanım kuralları.',
        'Bölüm 3: Yönetim Organları ve Seçimler: Kat malikleri kurulu toplanma zamanları, temsilciler kurulu yapısı, yönetici ve denetçinin görev süreleri ve yetkileri.',
        'Bölüm 4: Ortak Giderlere Katılma Baremleri: Güvenlik ve temizlik personel giderlerinin eşit mi yoksa arsa payı oranında mı bölüneceği, ortak elektrik ve doğalgaz paylaştırma kriterleri.',
        'Bölüm 5: Bağımsız Bölüm Sakinlerinin Hak ve Yasakları: Gürültü saatleri, evcil hayvan besleme şartları, dış cephe tadilat ve balkon kapatma sınırları.',
        'Bölüm 6: İhtilafların Çözümü ve Arabuluculuk: Sulh Hukuk Mahkemeleri ve zorunlu arabuluculuk süreçleri.'
      ]},
      { type: 'h2', text: '2. Yönetim Planı Değişikliği İçin 4/5 Oy Şartı' },
      { type: 'p', text: 'KMK m.28 uyarınca yönetim planının değiştirilebilmesi için bütün kat maliklerinin beşte dördünün (4/5) olumlu oyu şarttır. Bu nisap toplantıya katılanların değil, tapudaki tüm maliklerin 4/5\'idir. Bu nedenle yönetim planı ilk hazırlanırken profesyonel gayrimenkul hukukçuları tarafından kusursuz tanzim edilmelidir.' },
      { type: 'h2', text: '3. Adım Adım Yönetim Planı Hazırlama Süreci' },
      { type: 'ol', items: [
        'Mimari Proje ve Mahal İncelemesi: Tesisin ortak alanlarının tapu projesine uygunluğunun denetlenmesi.',
        'Hukuki Taslak Metin Yazımı: Siteye özgü ihtiyaçların KMK emredici hükümlerine uygun olarak kaleme alınması.',
        'Kat Malikleri İstişaresi: Maliklerin görüş ve taleplerinin toplanarak taslağın olgunlaştırılması.',
        'Genel Kurul Onayı ve Noter Tasdiki: Kurulda 4/5 oy çoğunluğuyla kabul edilerek noterden tescili.',
        'Tapu Sicil Müdürlüğü Tescili: Değişikliğin Tapu Müdürlüğü ana kütüğüne işlenerek bağlayıcılık kazanması.'
      ]},
      { type: 'h2', text: '4. Yönetim Planında En Sık Yapılan 3 Hukuki Hata' },
      { type: 'ul', items: [
        'KMK Emredici Hükümlerine Aykırı Maddeler: Kanuna aykırı koyulan maddeler (örneğin "aidat ödemeyenin suyu kesilir" gibi) mahkemece kendiliğinden hükümsüz sayılır.',
        'Otopark Tahsislerinin Hatalı Yapılması: Eklenti olmayan ortak alan otoparklarının belirli dairelere tapusuz mülkiyet gibi tahsis edilmesi ileride tapu iptal davalarına yol açar.',
        'Toplu Yapı Temsilciler Kurulu Yetkisinin Belirsiz Bırakılması: Ek Madde 69-74\'e uygun kurul tanımlanmadığında bloklar arası yetki çatışması yaşanır.'
      ]},
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Yönetim planında evcil hayvan yasağı varsa köpek beslenebilir mi?\nCevap: Yönetim planında açıkça "bağımsız bölümlerde evcil hayvan beslenemez" hükmü varsa ve bu tescilliyse, Yargıtay yerleşik içtihatlarına göre komşuların şikayeti halinde tahliye kararı verilir.' },
      { type: 'p', text: 'Soru: Yeni ev alan kişi eski yönetim planına uymak zorunda mıdır?\nCevap: Evet. KMK m.28 uyarınca yönetim planı tapu kütüğüne tescil edildiği için gayrimenkulü sonradan satın alan herkesi ve kiracıları doğrudan bağlar.' },
      { type: 'cta', text: 'Siteniz için profesyonel yönetim planı hazırlatalım.', href: '/hizmetler/tesis-yonetimi', label: 'Tesis Yönetimi Çözümlerimiz' }
    ]
  },

  // 9. Lüks Rezidanslarda Concierge
  'luks-rezidanslarda-concierge-ve-tesis-yonetimi-standartlari-2026': {
    title: 'Lüks Rezidanslarda Concierge ve 5 Yıldızlı Tesis Yönetimi Standartları (2026 Rehberi)',
    description: 'A+ lüks rezidans ve karma yaşam projelerinde 7/24 VIP concierge, lobi karşılama, akıllı bina otomasyonu ve KMK 37 bütçe optimizasyonu standartları.',
    tags: ['rezidans yönetimi', 'concierge', 'lüks tesis yönetimi', 'akıllı bina', '5188 güvenlik', 'rezidans aidat'],
    tldr: 'Lüks rezidanslarda 5 yıldızlı tesis yönetimi; 7/24 concierge, VIP güvenlik, önleyici akıllı bina otomasyonu ve KMK 37 bütçe şeffaflığını tek merkezde birleştirir.',
    content: [
      { type: 'p', text: 'Modern metropollerde A+ rezidans projeleri, yalnızca bir barınma alanı değil; sakinlerine 5 yıldızlı otel konforunda 7/24 kesintisiz hizmet sunan prestijli yaşam merkezleridir. Ancak lüks bir rezidansın piyasa değerini koruması ve sakin memnuniyetini en üst düzeyde tutması, uluslararası standartlarda profesyonel entegre tesis yönetimi ile mümkündür.' },
      { type: 'h2', text: '1. VIP Concierge ve Lobi Karşılama Protokolleri' },
      { type: 'p', text: 'Rezidans yönetiminin vitrini lobidir. Profesyonel concierge ekibimiz; misafir karşılama, kurye ve kargo kabul otomasyonu, VIP transfer rezervasyonları ve teknik talep yönetimini 7/24 kesintisiz olarak yürütür.' },
      { type: 'ul', items: [
        'Akıllı Kargo Dolabı Entegrasyonu: Kuryelerin daire katlarına çıkışını engelleyerek anlık SMS ve şifre ile kargo teslimi.',
        'Çok Dilli Resepsiyon Kadrosu: Türkçe, İngilizce, Arapça ve Rusça dillerinde akıcı VIP danışma hizmeti.',
        'Vale ve Kapalı Otopark PTS: Plaka tanıma sistemi ile misafir ve sakin araçlarının otopark kat yetkilendirmesi.',
        'Kuru Temizleme ve Daire İçi Hizmet Koordinasyonu: Rezidans sakinlerine özel kuru temizleme, terzi ve temizlik rezervasyonları.'
      ]},
      { type: 'h2', text: '2. 5188 Lisanslı Özel Güvenlik ve Biyometrik Geçiş Sistemleri' },
      { type: 'p', text: 'Lüks rezidanslarda mahremiyet ve güvenlik en kritik önceliktir. T.C. İçişleri Bakanlığı 5188 sayılı kanun kapsamında lisanslı özel güvenlik personelimiz ve grup şirketimiz 3G Özel Güvenlik desteğiyle tesis 7/24 güvence altındadır.' },
      { type: 'quote', text: 'Rezidans güvenliği sadece kapıdaki görevli değil; yapay zeka destekli çevre güvenlik kameraları, asansör kat yetkilendirme kartları ve yangın erken uyarı sistemlerinin entegre çalışmasıdır.' },
      { type: 'h2', text: '3. Sosyal Tesis, Havuz & Spa Hijyen Standartları' },
      { type: 'p', text: 'Kapalı ve açık yüzme havuzları, fitness salonları, sauna ve buhar odaları Sağlık Bakanlığı Biyosidal Ürünler Yönetmeliği standartlarına göre günlük olarak klor, pH ve mikrobiyolojik testlerden geçirilir.' },
      { type: 'h2', text: '4. Akıllı Bina Otomasyonu (BMS) ve Daire İçi Hızlı Teknik Destek' },
      { type: 'p', text: 'Rezidans sakinleri mobil uygulama üzerinden tek tıkla arıza kaydı oluşturabilir. Nöbetçi rezidans teknisyenlerimiz sigorta atması, su sızıntısı veya klima arızalarına maksimum 15 dakika içinde daire kapısında müdahale eder.' },
      { type: 'h2', text: '5. Rezidans Aidat Bütçesi ve KMK m.37 Bütçe Şeffaflığı' },
      { type: 'p', text: 'Lüks binalarda bütçe hacimleri oldukça büyüktür. Ortak alan doğalgaz, jeneratör mazot tüketimi, havuz kimyasalları ve güvenlik bordroları şeffaf muhasebe yazılımı ile yönetilir; sakinler her bir faturayı mobil uygulamadan anlık görür.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Rezidans aidatları neden normal apartmanlardan yüksektir?\nCevap: 7/24 lobide concierge, çift vardiya güvenlik, kapalı havuz ısıtması, fitness antrenörü, jeneratör yakıtı ve bina otomasyonu gibi kesintisiz lüks hizmetlerin işletme maliyetleri bütçeye yansır.' },
      { type: 'p', text: 'Soru: Kargo ve kurye güvenliği rezidansta nasıl sağlanır?\nCevap: Dışarıdan gelen kuryeler güvenlik lobisinde durdurulur; paketler akıllı kargo odasına barkodla alınır ve sakine SMS şifresi iletilerek temas riski sıfırlanır.' },
      { type: 'cta', text: 'Rezidansınız için 5 yıldızlı entegre yönetim teklifi alın.', href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', label: 'Rezidans Yönetimi Çözümümüzü İnceleyin' }
    ]
  },

  // 10. Ticari Plazalar HVAC
  'ticari-plazalarda-hvac-ve-leed-tesis-enerji-verimliligi': {
    title: 'Ticari Plazalarda HVAC Otomasyonu ve BREEAM/LEED Yeşil Bina Enerji Verimliliği',
    description: 'A sınıfı iş merkezleri ve plazalarda merkezi iklimlendirme otomasyonu, kompanzasyon panosu takibi ve ISO 41001 standartlarında %30 enerji tasarrufu.',
    tags: ['plaza yönetimi', 'hvac otomasyonu', 'leed sertifikası', 'enerji verimliliği', 'ofis yönetimi', 'iso 41001'],
    tldr: 'Ticari plazalarda merkezi HVAC otomasyonu, kompanzasyon takibi ve ISO 41001 standartları ile ortak alan elektrik ve işletme giderlerinde %30 net tasarruf sağlanır.',
    content: [
      { type: 'p', text: 'Ticari plazalar, iş merkezleri ve A sınıfı ofis kulelerinde işletme maliyetlerinin %60\'ından fazlasını enerji tüketimi (elektrik, doğalgaz ve soğutma grupları) oluşturur. Doğru bir tesis yönetimi stratejisi, çalışma konforundan ödün vermeden enerji faturalarını optimize eder.' },
      { type: 'h2', text: '1. Bina Otomasyon Sistemi (BMS) ve HVAC Optimizasyonu' },
      { type: 'p', text: 'Chiller soğutma grupları, klima santralleri (AHU) ve VRF sistemleri; çalışma saatleri, dış hava sıcaklığı ve doluluk sensörlerine göre otomatik olarak modüle edilir. Gece ve hafta sonu bekleme modları ile gereksiz tüketim engellenir.' },
      { type: 'h2', text: '2. Kompanzasyon Panosu Takibi ve Reaktif Ceza Önleme' },
      { type: 'p', text: 'Elektrik dağıtım şirketlerinin reaktif enerji sınırlarını aşan plazalara uyguladığı yüksek cezalar, IoT destekli anlık kompanzasyon panosu izleme sistemlerimiz ile tamamen sıfırlanır.' },
      { type: 'ul', items: [
        'Endüktif ve kapasitif oranların günlük 7/24 uzaktan telemetri ile izlenmesi',
        'Harmonik filtreler ve kondansatör kademe bakımlarının periyodik yapılması',
        'TEDAŞ/EPDK faturalarının yasal tarife uygunluk denetimi'
      ]},
      { type: 'h2', text: '3. LEED ve BREEAM Yeşil Bina Standartlarına Uyum' },
      { type: 'p', text: 'Uluslararası çevre sertifikasyonları, kurumsal çok uluslu kiracıların plaza seçimindeki en önemli kriteridir. Düşük karbon ayak izi, gri su geri kazanım sistemleri ve LED aydınlatma otomasyonu ile plazanızın LEED Gold/Platinum değerini koruyoruz.' },
      { type: 'h2', text: '4. Kurumsal Kiracı Yönetimi ve Alt Sayaç Faturalandırması' },
      { type: 'p', text: 'Plaza sakinlerinin ve kurumsal kiracıların gider paylaşımları, bağımsız bölüm metrekareleri ve ısı pay ölçer endekslerine göre şeffaf yazılımımız üzerinden adil biçimde faturalandırılır.' },
      { type: 'h2', text: '5. Plaza Yangın Güvenliği ve Tahliye Otomasyonu' },
      { type: 'p', text: 'Yüksek katlı plazalarda yangın duman tahliye şaftları, pozitif basınçlandırma fanları ve manyetik kapı tutucular merkezi yangın santraliyle entegre test edilir.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Reaktif enerji cezası nedir ve nasıl engellenir?\nCevap: Tesisin şebekeden çektiği endüktif veya kapasitif reaktif güç yasal sınırları (%20 endüktif, %15 kapasitif) aştığında dağıtım şirketi ağır ceza faturası keser. Otomatik kompanzasyon panosu ve anlık telemetri ile bu ceza sıfırlanır.' },
      { type: 'p', text: 'Soru: BMS bina otomasyon sistemi ne kadar enerji tasarrufu sağlar?\nCevap: Doğru kalibre edilmiş ve programlanmış bir BMS otomasyonu, plazanın toplam HVAC ve aydınlatma elektrik faturasında ortalama %25 ila %35 net tasarruf sağlar.' },
      { type: 'cta', text: 'Plazanız için enerji verimliliği ve işletme analizi talep edin.', href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza Yönetimi Çözümlerimiz' }
    ]
  },

  // 11. 1000 Konutlu Siteler
  '1000-konutlu-toplu-konut-sitelerinde-merkezi-yonetim-ve-aidat-tasarrufu': {
    title: '1.000+ Bağımsız Bölümlü Mega Toplu Konut Sitelerinde Merkezi Yönetim ve Toplu Tedarik Gücü',
    description: 'Çok bloklu büyük toplu konut sitelerinde blok temsilciler kurulu işleyişi, ölçek ekonomisi ile toplu satın alma ve aidatlarda %25-33 tasarruf formülü.',
    tags: ['toplu konut yönetimi', 'mega site yönetimi', 'aidat tasarrufu', 'blok temsilciler kurulu', 'kmk 37'],
    tldr: '1.000+ bağımsız bölümlü mega toplu konutlarda ölçek ekonomisi ve toplu tedarik gücü ile aidatlarda %25-33 somut maliyet tasarrufu elde edilir.',
    content: [
      { type: 'p', text: 'Yüzlerce hatta binlerce bağımsız bölümden oluşan mega toplu konut projelerinde amatör veya münferit blok yönetimleri; fahiş maliyetlere, tahsilat krizlerine ve bakım aksaklıklarına yol açar. Alo Yönetim merkezi yönetim modeli bu kaosu ortadan kaldırır.' },
      { type: 'h2', text: '1. KMK Toplu Yapı Hükümleri ve Temsilciler Kurulu İşleyişi' },
      { type: 'p', text: '634 Sayılı Kat Mülkiyeti Kanunu Ek Madde 69-74 uyarınca toplu yapı yönetim planı hazırlanır. Blok kat malikleri kurulları kendi temsilcilerini seçer; toplu yapı temsilciler kurulu ise profesyonel yöneticiyi yetkilendirir.' },
      { type: 'h2', text: '2. Ölçek Ekonomisi ile %30 Aidat Tasarrufu Nasıl Sağlanır?' },
      { type: 'ul', items: [
        'Toplu Asansör Bakım Anlaşması: Yüzlerce asansör için tek sözleşmeyle parça ve bakımda %35 indirim',
        'Ortak Elektrik ve Doğalgaz İndirimi: Serbest tüketici statüsüyle en uygun birim fiyat tedariki',
        'Endüstriyel Kimyasal & Temizlik Malzemesi: Fabrikadan doğrudan toptan tedarik',
        'Merkezi Güvenlik ve Temizlik Vardiya Optimizasyonu: Gereksiz personel maliyetlerinin elenmesi'
      ]},
      { type: 'h2', text: '3. Şeffaf Tahsilat ve Dijital Mobil Takip' },
      { type: 'p', text: 'Tüm sakinler mobil uygulama üzerinden aidatlarını kredi kartıyla komisyonsuz ödeyebilir, bütçe harcamalarını ve faturaları kalem kalem anlık inceleyebilir.' },
      { type: 'h2', text: '4. Bloklar Arası Eşit ve Adil Hizmet Dağılımı' },
      { type: 'p', text: 'Büyük sitelerde en çok yaşanan şikayet "Bizim bloğa temizlikçi az geliyor, diğer blok daha iyi bakılıyor" serzenişidir. Dijital QR kodlu kontrol noktaları ile her bloğun temizlik, teknik ve güvenlik devriye saatleri harita üzerinden anlık denetlenir.' },
      { type: 'h2', text: '5. Mega Sitelerde Güvenlik ve Giriş-Çıkış Trafiği Yönetimi' },
      { type: 'p', text: 'Günde on binlerce aracın ve kuryenin giriş yaptığı mega sitelerde çift bariyerli PTS (Plaka Tanıma Sistemi), misafir karekod geçiş sistemi ve grup şirketimiz 3G Özel Güvenlik desteğiyle nizamiye yığılmaları sıfıra indirilir.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Blok yöneticisi ile toplu yapı yöneticisi arasındaki fark nedir?\nCevap: Blok yöneticisi yalnızca kendi bloğunun iç temizliği ve münferit işlerinden sorumludur; toplu yapı yöneticisi ise tüm sitenin ortak güvenliği, peyzajı, havuzları, ana trafosu ve merkezi bütçesini idare eder.' },
      { type: 'p', text: 'Soru: Toplu konutlarda aidatını ödemeyen bloklara karşı ne yapılır?\nCevap: KMK Ek Madde 73 gereğince ortak gider borcunu ödemeyen bağımsız bölümler hakkında doğrudan toplu yapı yönetimi icra takibi açabilir.' },
      { type: 'cta', text: 'Sitenizin aidatlarını düşürmek için keşif isteyin.', href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut Yönetimi Çözümümüz' }
    ]
  },

  // 12. Endüstriyel Sanayi Tesisleri
  'endustriyel-sanayi-tesislerinde-iso-45001-isg-ve-guvenlik-yonetimi': {
    title: 'Endüstriyel Tesislerde ISO 45001 İSG ve Perimetre Güvenlik Yönetimi',
    description: 'Fabrikalar, lojistik depolar ve organize sanayi tesislerinde ağır teknik bakım, yangın hidrant hatları ve sıfır iş kazası odaklı entegre yönetim.',
    tags: ['sanayi tesisi yönetimi', 'fabrika yönetimi', 'iso 45001', 'perimetre güvenliği', 'yangın hidrant'],
    tldr: 'Endüstriyel tesis ve fabrikalarda ISO 45001 iş sağlığı, yangın hidrant hatları periyodik testi ve 5188 perimetre güvenliği sıfır kaza hedefiyle yönetilir.',
    content: [
      { type: 'p', text: 'Sanayi tesisleri, üretim fabrikaları ve lojistik antrepolar; konut yapılarından çok farklı olarak ağır teknik altyapı, tehlikeli madde riskleri ve yüksek iş güvenliği standartları gerektirir.' },
      { type: 'h2', text: '1. ISO 45001 İş Sağlığı ve Güvenliği Risk Yönetimi' },
      { type: 'p', text: 'Tesis içerisindeki forklift yolları, kimyasal depolama alanları ve yüksek gerilim trafo merkezleri sürekli denetlenir. Risk analizi ve acil durum tahliye tatbikatları 6 ayda bir güncellenir.' },
      { type: 'h2', text: '2. Yangın Hidrant, Sprinkler ve Duman Tahliye Sistemleri' },
      { type: 'p', text: 'Binaların Yangından Korunması Hakkında Yönetmelik gereğince yangın pompaları haftalık otomatik test edilir, hidrant debileri ve köpüklü söndürme sistemleri belgelendirilir.' },
      { type: 'h2', text: '3. Fabrika Perimetre Güvenliği ve Giriş-Çıkış Lojistik Kontrolü' },
      { type: 'p', text: 'TIR ve kamyon kantar tartımları, sevkiyat irsaliye kontrolleri ve x-ray ziyaretçi taramaları grup şirketimiz 3G Özel Güvenlik tarafından yürütülür.' },
      { type: 'h2', text: '4. Tehlikeli Atık Yönetimi ve Çevre Mevzuatı' },
      { type: 'p', text: 'Sanayi atıkları, kontamine ambalajlar ve atık yağlar Çevre Kanunu ve Sıfır Atık Yönetmeliği uyarınca MOTAT (Mobil Atık Takip Sistemi) üzerinden lisanslı bertaraf tesislerine sevk edilir.' },
      { type: 'h2', text: '5. Ağır Tesis Mekanik ve Kazan Dairesi İşletimi' },
      { type: 'p', text: 'Buhar kazanları, basınçlı hava kompresörleri, kule tipi soğutma sistemleri ve endüstriyel arıtma tesisleri sertifikalı mühendis ve tekniker kadromuzla 7/24 vardiyalı işletilir.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Fabrikalarda yangın pompası testleri ne sıklıkla yapılmalıdır?\nCevap: Yangın pompaları haftalık otomatik test çalışmasına tabi tutulmalı, debi ve basınç testleri ise 3 ayda bir kayıt altına alınmalıdır.' },
      { type: 'p', text: 'Soru: Organize Sanayi Bölgelerinde (OSB) tesis yönetimi avantajı nedir?\nCevap: OSB mevzuatına tam uyum, ağır bakım maliyetlerinin düşürülmesi ve İSG teftişlerinde sıfır ceza güvencesi sağlar.' },
      { type: 'cta', text: 'Sanayi tesisiniz için profesyonel işletme şartnamesi alın.', href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', label: 'Sanayi Tesisi Yönetimi Detayları' }
    ]
  },

  // 13. Şirket Seçim Rehberi
  'profesyonel-tesis-yonetim-sirketi-secim-rehberi-ve-ihale-sartnamesi': {
    title: 'Profesyonel Tesis Yönetim Şirketi Nasıl Seçilir? 10 Maddelik Denetim ve Şartname Kontrol Listesi',
    description: 'Bina ve siteler için yönetim şirketi seçerken dikkat edilmesi gereken 10 yasal ve teknik kriter, ihale şartnamesi (RFP) hazırlama ve devir teslim rehberi.',
    tags: ['tesis yönetimi seçimi', 'yönetim ihale şartnamesi', 'rfp', 'sla taahhütleri', 'yönetim devir teslim'],
    tldr: 'Site ve binalarınız için doğru yönetim şirketini seçerken ISO belgeleri, 5188 lisansı, SLA süreleri ve KMK 37 işletme projesi şeffaflığı temel kriterdir.',
    content: [
      { type: 'p', text: 'Site veya tesis yönetimini profesyonel bir şirkete devretmek, mülkünüzün değerini artırırken aidat ihtilaflarını ve teknik arıza risklerini ortadan kaldırır. Ancak piyasada yetkin olmayan merdiven altı firmalara karşı dikkatli olunmalıdır.' },
      { type: 'h2', text: '10 Maddelik Yönetim Şirketi Değerlendirme Kriterleri' },
      { type: 'ul', items: [
        '1. ISO 41001:2018 Entegre Tesis Yönetimi ve ISO 9001 Kalite Belgeleri',
        '2. T.C. İçişleri Bakanlığı / Emniyet onaylı 5188 Özel Güvenlik Faaliyet İzin Belgesi',
        '3. TSE HYB 12850 Hizmet Yeterlilik Belgesi',
        '4. En az 10 yıl sektörel tecrübe ve aktif yönetilen 200+ bağımsız bölüm referansı',
        '5. Mesleki Sorumluluk ve 3. Şahıs Mali Mesuliyet Sigorta Poliçesi',
        '6. KMK m.37 uyarınca noter ve teftiş onaylı şeffaf bütçe garantisi',
        '7. Maksimum 45 dakika acil teknik arıza müdahale SLA taahhüdü',
        '8. Sakinlere özel 7/24 mobil aidat, arıza ve otopark takip yazılımı',
        '9. Hukuki icra ve aidat takip departmanının şirket bünyesinde bulunması',
        '10. Noter onaylı devir teslim tutanağı ve eksiksiz demirbaş sayım protokolü'
      ]},
      { type: 'h2', text: 'Teknik İhale Şartnamesi (RFP) Nasıl Hazırlanır?' },
      { type: 'p', text: 'Teklif almadan önce bağımsız bölüm sayısı, blok yapısı, ortak alan cihaz envanteri ve güvenlik noktalarını içeren teknik bir şartname hazırlanmalıdır. Sitemizdeki online RFP jeneratörünü ücretsiz kullanabilirsiniz.' },
      { type: 'h2', text: 'Eski Yönetimden Devir Teslim Protokolü' },
      { type: 'p', text: 'Yeni yönetim şirketi göreve başlarken noter onaylı karar defteri, işletme defteri, geçmiş banka ekstreleri, SGK dosyaları ve ortak alan anahtarları tutanakla teslim alınır; kasa sayımı yapılarak eksiklikler tespit edilir.' },
      { type: 'h2', text: 'Sözleşmede Bulunması Gereken Hayati Hükümler' },
      { type: 'p', text: 'Şirketle imzalanacak sözleşmede personel kıdem tazminatı sorumluluğu, gizlilik taahhüdü, acil müdahale cezai şartları ve tek taraflı fesih koşulları net olarak yazılmalıdır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Yönetim şirketi sözleşmesi kaç yıllık yapılmalıdır?\nCevap: KMK uyarınca yöneticiler olağan genel kurul dönemleri için (genellikle 1 yıl) seçilir. Sözleşmeler 1 yıllık yapılır ve genel kurul onayıyla yenilenir.' },
      { type: 'p', text: 'Soru: Yönetim şirketinden memnun kalınmazsa sözleşme nasıl feshedilir?\nCevap: Kat Malikleri Kurulu salt çoğunlukla olağanüstü toplanarak yönetici azli kararı alabilir ve sözleşmeyi haklı nedenle feshedebilir.' },
      { type: 'cta', text: 'Siteniz için ücretsiz ihale şartnamesi oluşturun.', href: '/hizmetler/tesis-yonetimi/rehber', label: 'Tesis Yönetimi Rehberimizi İnceleyin' }
    ]
  },

  // 14. KMK 20 Aidat Borcu İcra Takibi
  'aidat-borcu-icra-takibi-ve-yuzde-5-gecikme-tazminati-kmk-20': {
    title: 'Aidatını Ödemeyen Kat Maliki İçin KMK m.20 İcra Takibi ve %5 Gecikme Tazminatı Süreci',
    description: 'Aidat borçluları hakkında Kat Mülkiyeti Kanunu Madde 20 kapsamında ilamsız icra takibi, noter ihtarnamesi ve Yargıtay emsal kararları.',
    tags: ['aidat icra takibi', 'kmk madde 20', 'yüzde 5 gecikme tazminatı', 'yargıtay içtihadı', 'ilamsız icra'],
    tldr: 'KMK m.20 uyarınca aidatını vadesinde ödemeyen kat malikine aylık %5 gecikme tazminatı uygulanır ve mahkeme kararı aranmaksızın ilamsız icra takibi başlatılır.',
    content: [
      { type: 'p', text: 'Apartman ve site yönetimlerinin en sık karşılaştığı operasyonel krizlerin başında, aidat ve ortak gider avanslarını düzenli ödemeyen kat malikleri ve kiracılar gelmektedir. Birkaç malikin aidat ödememesi; kapıcı maaşlarının gecikmesine, ortak elektrik/doğalgazın kesilme riskine ve asansör bakımlarının aksamasına neden olur. 634 Sayılı Kat Mülkiyeti Kanunu (KMK) bu konuda yöneticiye çok güçlü yasal haklar ve yaptırım yetkileri tanımıştır.' },
      { type: 'h2', text: '1. Aylık %5 Yasal Gecikme Tazminatı (KMK m.20/2)' },
      { type: 'p', text: 'Kat Mülkiyeti Kanunu Madde 20/2 açık hükmü gereğince: "Gider veya avans payını ödemeyen kat maliki, ödemede geciktiği günler için aylık yüzde beş hesabıyla gecikme tazminatı ödemekle yükümlüdür." Bu tazminat yasal faizden tamamen bağımsızdır ve yıllık %60 gibi caydırıcı bir orana karşılık gelir.' },
      { type: 'ul', items: [
        'Gecikme Tazminatının Başlangıç Tarihi: Aidatın son ödeme gününü takip eden ilk gündür.',
        'Genel Kurul Kararı Olmasa Bile Geçerlilik: Kanun emredici olduğu için genel kurulda karar alınmamış olsa dahi aylık %5 tazminat kanunen tahsil edilir.',
        'Yargıtay Emsal Kararları: Yargıtay Hukuk Genel Kurulu ve 20. Hukuk Dairesi kararları uyarınca gecikme tazminatı borcun aslıyla birlikte takibe konur.'
      ]},
      { type: 'h2', text: '2. İlamsız İcra Takibi (Örnek No: 7) Başlatma Süreci' },
      { type: 'p', text: 'Yönetici veya sitenin vekili olan avukat; borçlu kat malikine karşı mahkemeden ilam almaya veya dava açmaya gerek duymaksızın doğrudan İcra Dairesi kanalıyla İlamsız İcra Takibi başlatabilir.' },
      { type: 'ol', items: [
        'Hesap Ekstresi Çıkarılması: Borcun hangi aylara ait olduğunun dökümü hazırlanır.',
        'Takip Talebi Tanzimi: İcra Müdürlüğü UYAP sistemi üzerinden takip talebi açılır.',
        'Ödeme Emri Tebligatı: Borçluya 7 gün içinde ödeme veya itiraz hakkı tanıyan Örnek No: 7 ödeme emri tebliğ edilir.',
        'Takibin Kesinleşmesi ve Haciz: 7 gün içinde itiraz edilmezse takip kesinleşir; borçlunun banka hesaplarına, maaşına, aracına ve tapudaki dairesine haciz konur.'
      ]},
      { type: 'h2', text: '3. Kiracının Müteselsil Sorumluluğu (KMK m.22)' },
      { type: 'p', text: 'Kat malikinin ortak gider borcundan, bağımsız bölümde oturan kiracı da ödemekle yükümlü olduğu kira miktarı kadar müteselsilen sorumludur. İcra dairesi İİK 89/1 haciz ihbarnamesi ile kiracının kira ödemesini doğrudan site banka hesabına aktarmasını emredebilir.' },
      { type: 'h2', text: '4. Kanuni İpotek Hakkı Tescili (KMK m.22/2)' },
      { type: 'p', text: 'Kat malikinin gider borcu ödenmediği takdirde, yönetici veya diğer kat malikleri Sulh Hukuk Mahkemesi aracılığıyla borçlunun bağımsız bölümü üzerine Tapu Sicilinde Kanuni İpotek hakkı tescil ettirebilir.' },
      { type: 'h2', text: '5. İtirazın İptali Davası ve %20 İcra İnkar Tazminatı' },
      { type: 'p', text: 'Borçlunun takibe itiraz etmesi halinde açılan itirazın iptali davasında haksız çıkan borçlu, ana borç ve gecikme tazminatına ek olarak borcun en az %20\'si oranında icra inkar tazminatı ödemeye mahkum edilir.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Gecikme tazminatı oranı genel kurul kararıyla düşürülebilir mi?\nCevap: Hayır. KMK m.20\'deki aylık %5 oranı emredici hukuk kuralıdır; genel kurul kararıyla dahi düşürülemez veya affedilemez.' },
      { type: 'p', text: 'Soru: İcra takibi açmak için avukat tutmak zorunlu mudur?\nCevap: Yönetici şahsen de takip açabilir; ancak usul hataları ve itiraz risklerine karşı uzman bir gayrimenkul icra avukatı ile çalışılması önerilir.' },
      { type: 'cta', text: 'Hukuk departmanımızla aidat tahsilat oranınızı %98\'e çıkarın.', href: '/hizmetler/aidat-takibi', label: 'Aidat ve İcra Takip Hizmetimiz' }
    ]
  },

  // 15. Aidat İcra Takibi Nasıl Yapılır
  'aidat-icra-takibi-nasil-yapilir': {
    title: 'Aidat Borcu İçin İcra Takibi Nasıl Yapılır? Adım Adım Hukuki Süreç Rehberi',
    description: 'Apartman ve site aidat borcu icra takibi süreci: yasal dayanaklar, gerekli belgeler, ihtarname, harçlar, itirazın iptali davası ve tahsilat aşamaları.',
    tags: ['aidat icra takibi', 'aidat borcu icra', 'apartman aidat icra', 'site aidat borcu', 'kmk 20 icra', 'aidat tahsilatı', 'icra takibi adımları'],
    tldr: 'KMK m.20 uyarınca aidat borcu olan kat malikine karşı yöneticilik ilamsız icra takibi başlatabilir. Aylık %5 gecikme tazminatı uygulanır, borçlu 7 gün içinde itiraz etmezse takip kesinleşir ve haciz aşamasına geçilir.',
    content: [
      { type: 'p', text: 'Apartman ve site yönetimlerinde ortak gider borcunu ödemeyen kat maliki veya kiracılara karşı icra takibi başlatmak, yöneticinin keyfi bir tercihi değil; KMK m.35 uyarınca yerine getirmek zorunda olduğu yasal bir görevdir. Borcunu ödemeyen sakinlerin borcunu diğer komşuların finanse etmesi hukuka aykırıdır.' },
      { type: 'h2', text: '1. İcra Takibine Başlamadan Önceki Hazırlık Belgeleri' },
      { type: 'p', text: 'İcra takibinin hukuken sağlam olması ve olası itirazlarda yöneticinin tazminat ödememesi için şu evrakların dosyada hazır bulunması şarttır:' },
      { type: 'ul', items: [
        'Noter Onaylı Karar Defteri: Yöneticinin seçildiği Genel Kurul divan tutanağı ve karar defteri fotokopisi.',
        'Kesinleşmiş İşletme Projesi: KMK m.37 gereğince maliklere tebliğ edilmiş yıllık tahmini bütçe.',
        'Banka Hesap Dökümleri: Borçlunun hangi aylara ait aidatı yatırmadığını ispatlayan resmi ekstre.',
        'Noter İhtarnamesi veya Yazılı Tebligat: Yargıtay şart koşmasa da borçluya son bir ödeme ihtarı çekilmesi iyi niyet göstergesidir.'
      ]},
      { type: 'h2', text: '2. İcra Dairesinde Takip Başlatma ve Ödeme Emri Tebliği' },
      { type: 'p', text: 'Hazırlanan belgelerle UYAP Avukat Portal veya İcra Müdürlüğü kanalıyla İlamsız Takip Talebi açılır. İcra dairesi borçluya Örnek No: 7 Ödeme Emri tebliğ eder.' },
      { type: 'ol', items: [
        'Tebligat Tarihi: Tebligatın borçluya veya MERNİS adresine ulaştığı tarihten itibaren 7 günlük yasal süre başlar.',
        'Ödeme Yapılması: Borçlu 7 gün içinde dosya borcunu icra veznesine öderse takip kapanır.',
        'Takibin Kesinleşmesi: 7 gün içinde itiraz edilmezse icra takibi kesinleşir ve haciz aşamasına geçilir.'
      ]},
      { type: 'h2', text: '3. Borçlunun Haksız İtirazı ve %20 İcra İnkar Tazminatı' },
      { type: 'p', text: 'Borçlu takibe haksız olarak itiraz ederse takip durur. Bu durumda site yönetimi Sulh Hukuk veya İcra Hukuk Mahkemesinde İtirazın İptali Davası açar. Borçlu haksız çıktığında ana borç, %5 gecikme tazminatı ve yargılama giderlerine ek olarak asgari %20 İcra İnkar Tazminatı ödemeye mahkum edilir.' },
      { type: 'h2', text: '4. İcra Takip Masraflarını Kim Öder?' },
      { type: 'p', text: 'Takip açılırken ödenen başvurma harcı, peşin harç, tebligat masrafları ve kanuni avukatlık vekalet ücreti tamamen borçlu kat malikine yükletilir. Site bütçesinden tek bir kuruş masraf çıkmaz.' },
      { type: 'h2', text: '5. UYAP Üzerinden Mal Varlığı Sorgusu ve Fiili Haciz' },
      { type: 'p', text: 'Takip kesinleştikten sonra borçlunun tüm banka hesaplarına e-haciz gönderilir, varsa aracı ve taşınmazları üzerine haciz şerhi işlenir; gerekirse evine fiili hacze gidilerek tahsilat tamamlanır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: İcra takibi ne kadar sürede sonuçlanır?\nCevap: İtiraz edilmeyen dosyalarda tebligattan sonraki 10 gün içinde banka ve araç hacizleri tatbik edilir. İtiraz halinde dava süreci 4-8 ay sürebilir.' },
      { type: 'p', text: 'Soru: Kiracı evden ayrılırsa eski aidat borcu kime kalır?\nCevap: KMK uyarınca kat maliki asıl borçludur. Kiracı çıksa bile gayrimenkulün sahibi borcun tamamından şahsen ve dairesiyle sorumludur.' },
      { type: 'cta', text: 'Hukuk departmanımızla aidat tahsilatlarınızı güvenceye alın.', href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Hukuk ve İcra Danışmanlığı Alın' }
    ]
  },

  // 16. Kentsel Dönüşüm Süreçleri
  'kentsel-donusum-surecleri': {
    title: 'Kentsel Dönüşüm Süreçleri: Kat Malikleri İçin 6306 Sayılı Kanun Yol Haritası (2026)',
    description: '6306 sayılı kanun kapsamında kentsel dönüşüm adımları: riskli yapı tespiti, salt çoğunluk (50+1) kuralı, müteahhit sözleşmesi, kira yardımı ve yasal haklar.',
    tags: ['kentsel dönüşüm', '6306 sayılı kanun', 'riskli yapı tespiti', 'kentsel dönüşüm çoğunluk', 'bina yıkımı', 'müteahhit sözleşmesi', 'kira yardımı'],
    tldr: '6306 sayılı Kanun ile kentsel dönüşümde karar çoğunluğu salt çoğunluğa (yarıdan bir fazla) indirilmiştir. Riskli yapı tespiti, bakanlık lisanslı kuruluşlarca yapılır ve kesinleştiğinde 60+30 günlük tahliye süreci başlar.',
    content: [
      { type: 'p', text: 'Türkiye\'nin deprem kuşağında yer alması ve özellikle İstanbul başta olmak üzere büyükşehirlerdeki yaşlı yapı stoku, kentsel dönüşümü hayati bir zorunluluk haline getirmiştir. 6306 Sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun ve yapılan son yasal düzenlemeler, binalarını yenilemek isteyen kat maliklerine büyük kolaylıklar ve devlet destekleri sunmaktadır.' },
      { type: 'h2', text: '1. Riskli Yapı Tespiti ve Rapor Aşaması' },
      { type: 'p', text: 'Kentsel dönüşüm süreci, apartmandaki kat maliklerinden sadece birinin Çevre, Şehircilik ve İklim Değişikliği Bakanlığı lisanslı yapı denetim kuruluşlarına başvurmasıyla başlar. Diğer maliklerin onayına gerek yoktur.' },
      { type: 'ul', items: [
        'Karot ve Demir İncelemesi: Taşıyıcı kolonlardan numune alınarak beton kalitesi ve donatı korozyonu ölçülür.',
        'Raporun Tapuya Bildirilmesi: Bina riskli çıkarsa rapor İl Kentsel Dönüşüm Müdürlüğü\'ne gönderilir ve tapu kütüğüne "Riskli Yapı" şerhi işlenir.',
        'İtiraz Süreci: Raporun tebliğinden itibaren 15 gün içinde teknik heyete itiraz edilebilir; itiraz reddedilirse karar kesinleşir.'
      ]},
      { type: 'h2', text: '2. Yeni Salt Çoğunluk (50+1) Kuralı ve Karar Alma' },
      { type: 'p', text: 'Eski mevzuatta aranan 2/3 çoğunluk şartı, yapılan son yasal değişiklikle arsa payı sahiplerinin Salt Çoğunluğuna (yarıdan bir fazlası - %50+1) indirilmiştir. Artık birkaç kişinin itirazı yüzünden tüm binanın kentsel dönüşümü engellenememektedir.' },
      { type: 'h2', text: '3. Müteahhit Seçimi ve Noter Onaylı Kat Karşılığı Sözleşmesi' },
      { type: 'p', text: 'Müteahhit ile anlaşma sağlanırken şu 4 hayati madde sözleşmeye eklenmelidir:' },
      { type: 'ol', items: [
        'Bina Tamamlama Sigortası veya Teminat Mektubu',
        'Gecikme Halinde Aylık Rayiç Kira Cezası',
        'Teknik Şartnamede Birinci Sınıf Malzeme ve Marka Listesi',
        'İş Bitimi İskan (Yapı Kullanma İzin Belgesi) Alma Şartı'
      ]},
      { type: 'h2', text: '4. Devlet Destekleri: Kira Yardımı ve Kredi Faiz İndirimi' },
      { type: 'p', text: 'Riskli yapı maliklerine ve kiracılarına Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından 18 ila 48 ay boyunca geri ödemesiz aylık kira yardımı sağlanır. Ayrıca tüm tapu, noter, belediye harç ve vergi muafiyetleri uygulanır.' },
      { type: 'h2', text: '5. Tahliye Süreci, İtiraz Hakları ve Yıkım Ruhsatı' },
      { type: 'p', text: 'Rapor kesinleştikten sonra maliklere 60 gün süre verilir; gerekirse ek 30 gün tanınır. Süre sonunda tahliye edilmeyen binaların elektrik, su ve doğalgazı kesilerek mülki amirlikçe yıktırılır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Kentsel dönüşüme katılmayan azınlık maliklerin hisseleri ne olur?\nCevap: Salt çoğunluk sağlandıktan sonra dönüşüme katılmayan maliklerin arsa payları Çevre ve Şehircilik İl Müdürlüğü tarafından açık artırma ile diğer paydaşlara satılır.' },
      { type: 'p', text: 'Soru: Riskli yapı tespit raporu masrafını kim öder?\nCevap: Başvuruyu yapan kat maliki öder; ancak bina riskli çıktığında ve yıkım kararı kesinleştiğinde bu masraf diğer kat maliklerinden arsa payları oranında tahsil edilir.' },
      { type: 'cta', text: 'Binanızın kentsel dönüşüm ve yönetim danışmanlığı için bize ulaşın.', href: '/teklif-al', label: 'Dönüşüm Danışmanlığı Teklifi Al' }
    ]
  },

  // 17. Hukuk ve İcra Danışmanlığı
  'hukuk-ve-icra-danismanligi-hizmeti-rehberi-2026': {
    title: 'Hukuk ve İcra Danışmanlığı: Aidat Takibi Rehberi (2026)',
    description: 'Site ve apartman yönetimlerinde hukuk ve icra danışmanlığı: KMK m.20 aidat tahsilatı, dava süreçleri, genel kurul iptali ve yasal risk yönetimi.',
    tags: ['hukuk danışmanlığı', 'icra danışmanlığı', 'site hukuku', 'kmk davaları', 'aidat tahsilatı', 'apartman yönetimi hukuku'],
    tldr: 'Site yönetimlerinde profesyonel hukuk danışmanlığı; aidat tahsilatını %98 seviyesine çıkarır, hatalı genel kurul kararlarını önler ve yöneticinin şahsi hukuki sorumluluğunu ortadan kaldırır.',
    content: [
      { type: 'p', text: 'Toplu yapı ve site yönetimleri; Kat Mülkiyeti Kanunu, İş Kanunu, Türk Borçlar Kanunu, İcra ve İflas Kanunu ve İSG Kanunu gibi çok sayıda karmaşık mevzuatla iç içedir. Hukuki altyapısı olmadan alınan kararlar, tebliğ edilmemiş bütçeler veya hatalı personel fesihleri site bütçelerine yüz binlerce liralık dava ve tazminat faturaları çıkarır.' },
      { type: 'h2', text: 'Site Yönetimlerinde Karşılaşılan 4 Büyük Hukuki Risk' },
      { type: 'ul', items: [
        'Genel Kurul Kararlarının İptali Davaları: Usulüne uygun çağrı yapılmayan toplantı kararları mahkemece iptal edilir.',
        'İşletme Projesinin İptali ve Aidatların Tahsil Edilememesi: Tebligatsız bütçeler kesinleşmez, açılan icra takipleri düşer.',
        'Kapıcı ve Güvenlik Kıdem Tazminatı Davaları: Fazla mesai ve bordro eksiklikleri yüzünden yüklü işçi tazminatları doğar.',
        'Ortak Alan İhlalleri ve Müdahalenin Men\'i Davaları: Otopark gaspı, kaçak eklenti ve sığınak işgalleri komşuluk krizine dönüşür.'
      ]},
      { type: 'h2', text: 'Kurumsal Hukuk ve İcra Danışmanlığı Kapsamı' },
      { type: 'p', text: 'Alo Yönetim bünyesindeki uzman gayrimenkul hukukçuları ve icra departmanımız sitenizi korur:' },
      { type: 'ol', items: [
        'Hızlı İcra Takibi: Gününde ödenmeyen aidatlar için anında %5 gecikme tazminatlı ilamsız takip açılır.',
        'Yönetim Planı Revizyonu: Sitenin tapu anayasası KMK m.28 uyarınca güncellenir ve tapuya tescil edilir.',
        'Genel Kurul Divan Yönetimi: Çağrı mektupları, vekaletname kontrolleri ve hazirun cetvelleri mevzuata tam uyumlu yönetilir.',
        'Sözleşme Hukuku: Taşeron firmalarla yapılan güvenlik, temizlik ve asansör sözleşmelerine cezai şartlar eklenir.'
      ]},
      { type: 'h2', text: 'Personel İhtilaflarında Arabuluculuk ve İş Mahkemesi Güvencesi' },
      { type: 'p', text: 'Kapıcı ve temizlik personeli işten ayrılırken ibraname, kıdem/ihbar bordroları ve yıllık izin mutabakatları noter ve arabulucu huzurunda tanzim edilerek sitenin sonradan tazminat davasına maruz kalması engellenir.' },
      { type: 'h2', text: 'Sulh Hukuk Mahkemelerinde Hakimin Müdahalesi (KMK m.33)' },
      { type: 'p', text: 'Ortak yerlere izinsiz klima motoru takılması, sığınağın depoya dönüştürülmesi veya gürültü ihlallerinde mahkemeden Hakimin Müdahalesi ve eski hale getirme kararı alınır.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Site avukatı tutmak için genel kurul kararı şart mıdır?\nCevap: KMK m.35 uyarınca yönetici, ortak gider alacaklarının tahsili için avukata vekalet verebilir; ancak genel danışmanlık bütçesi için Genel Kurul onayının bulunması tavsiye edilir.' },
      { type: 'p', text: 'Soru: Genel kurul kararına karşı dava açma süresi ne kadardır?\nCevap: Toplantıya katılıp aykırı oy kullananlar için karar tarihinden itibaren 1 ay; toplantıya katılmayanlar için ise kararı öğrendikten itibaren 1 ay (ve her halükarda 6 ay) içinde Sulh Hukuk Mahkemesinde iptal davası açılmalıdır.' },
      { type: 'cta', text: 'Siteniz için profesyonel hukuk ve icra danışmanlığı başlatın.', href: '/hizmetler/hukuk-ve-icra-danismanligi', label: 'Hukuk Hizmetimizi İnceleyin' }
    ]
  },

  // 18. KMK Site Yöneticisi Hakları
  'kat-mulkiyeti-kanunu-site-yoneticisi-haklari-2026': {
    title: 'Kat Mülkiyeti Kanunu\'nda Site Yöneticisinin Hak ve Yükümlülükleri (KMK 34-40 Rehberi)',
    description: '634 sayılı Kat Mülkiyeti Kanunu kapsamında site ve apartman yöneticisinin yasal hakları, görevleri, ücret hakkı, vekalet yetkisi ve cezai sorumlulukları.',
    tags: ['site yöneticisi hakları', 'kmk yönetici', 'yönetici sorumluluğu', 'apartman yöneticisi hakları', 'kat mülkiyeti kanunu', 'yönetici ücreti'],
    tldr: 'KMK m.34-40 uyarınca yönetici, kat malikleri kurulunun vekili hükmündedir. KMK m.40 uyarınca yönetim planında aksi kararlaştırılmadıkça yönetici uygun bir ücret talep etme hakkına sahiptir.',
    content: [
      { type: 'p', text: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) Madde 34 uyarınca, 8 veya daha fazla bağımsız bölüme sahip tüm binalarda yönetici atanması kanunen zorunludur. Yönetici, kat malikleri kurulu tarafından seçilir ve kurulun vekili sıfatıyla ana gayrimenkulü idare eder. Kanun yöneticilere ağır sorumluluklar yüklerken aynı zamanda çok önemli yasal haklar ve yetkiler tanımıştır.' },
      { type: 'h2', text: '1. Yöneticinin Hukuki Konumu ve Vekalet İlişkisi (KMK m.38)' },
      { type: 'p', text: 'Kanunun 38. maddesi açıkça belirtir: "Yönetici, kat maliklerine karşı aynen bir vekil gibi sorumludur." Yönetici kat malikleri kurulu kararlarını yerine getirmek, ortak parayı korumak ve her zaman hesap vermeye hazır olmakla yükümlüdür.' },
      { type: 'h2', text: '2. Yöneticinin Yasal Hakları (KMK Madde 40)' },
      { type: 'ul', items: [
        'Ücret Talep Etme Hakkı: Yönetim planında aksi kararlaştırılmadıkça, yönetici kat maliklerince belirlenen uygun bir yönetim ücreti talep edebilir.',
        'Gider Payı Muafiyeti: Kat malikleri arasından seçilen yönetici, aksi kararlaştırılmadıkça normal yönetim giderlerinin (aidat) yarısına katılmaz.',
        'Vekaletname Aranmaksızın Dava Açma Hakkı: KMK m.35 uyarınca yönetici, borcunu ödemeyen maliklere karşı noter vekaletnamesi olmadan doğrudan icra takibi açabilir.',
        'Haklı Nedenle Görevi Bırakma (İstifa) Hakkı: Yönetici haklı sebeplerle kat malikleri kurulunu olağanüstü toplantıya çağırarak istifa edebilir.'
      ]},
      { type: 'h2', text: '3. Yöneticinin Şahsi ve Cezai Sorumlulukları' },
      { type: 'p', text: 'Yönetici; karar defterini notere kapatmamak, işletme bütçesini tebliğ etmemek veya ortak parayı şahsi hesabında kullanmaktan dolayı Türk Ceza Kanunu kapsamında Güveni Kötüye Kullanma suçundan hapis cezası riskiyle karşı karşıya kalabilir.' },
      { type: 'h2', text: '4. Dışarıdan Profesyonel Yönetim Şirketi Seçimi' },
      { type: 'p', text: 'Kat malikleri kurulu, kendi aralarından bir yönetici seçmek yerine KMK m.34 kapsamında dışarıdan kurumsal bir tesis yönetim şirketini yönetici olarak atayabilir. Bu sayede tüm cezai ve idari riskler kurumsal firmaya devredilmiş olur.' },
      { type: 'h2', text: '5. Yöneticinin İbra Edilmesi ve İbra Edilmeme Sonuçları' },
      { type: 'p', text: 'Olağan genel kurulda yöneticinin faaliyet ve mali raporları oylanır. İbra edilmeyen yönetici aleyhine kat malikleri kurulu kararıyla Sulh Hukuk veya Asliye Hukuk Mahkemesinde tazminat davası açılabilir.' },
      { type: 'h2', text: 'Sıkça Sorulan Sorular (SSS)' },
      { type: 'p', text: 'Soru: Yönetici seçilmek için kat maliki olmak şart mıdır?\nCevap: Hayır. KMK m.34 uyarınca yönetici kat malikleri arasından seçilebileceği gibi dışarıdan üçüncü bir kişi veya tüzel kişilik (yönetim şirketi) de yönetici olarak seçilebilir.' },
      { type: 'p', text: 'Soru: Yönetici toplantı yapmadan istifa edebilir mi?\nCevap: Yönetici istifa dilekçesini denetçiye sunarak olağanüstü genel kurul çağrısı yapılmasını talep etmeli ve yeni yönetici seçilene kadar acil işleri vekaleten yürütmelidir.' },
      { type: 'cta', text: 'Yöneticilik risklerinizi profesyonel bir yönetim şirketine devredin.', href: '/teklif-al', label: 'Profesyonel Yönetim Teklifi Al' }
    ]
  }
};

const updatedPosts: Post[] = POSTS.map(p => {
  const deep = FULL_ENCYCLOPEDIA_18[p.slug];
  if (deep) {
    return {
      ...p,
      title: deep.title || p.title,
      description: deep.description || p.description,
      tags: deep.tags || p.tags,
      tldr: deep.tldr || p.tldr,
      dateModified: '2026-02-24T14:00:00.000Z',
      content: deep.content
    };
  }
  return p;
});

const outputCode = `/**
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
  | { type: 'cta'; text: string; href: string; label: string };

export type Category = { slug: string; name: string; description: string };

export const CATEGORIES: Category[] = ${JSON.stringify(CATEGORIES, null, 2)};

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

export const POSTS: Post[] = ${JSON.stringify(updatedPosts, null, 2)};
`;

fs.writeFileSync(path.resolve('./src/data/posts.ts'), outputCode, 'utf8');
console.log('Successfully written full encyclopedia Wave 1 posts into src/data/posts.ts');

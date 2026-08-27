import fs from 'fs';
import path from 'path';
import { POSTS, CATEGORIES } from '@/data/posts';

const DEEP_ARTICLES: Record<string, any> = {
  'tesis-yonetimi-nedir-kapsami-ve-iso-41001-standartlari': {
    slug: 'tesis-yonetimi-nedir-kapsami-ve-iso-41001-standartlari',
    title: 'Tesis Yönetimi Nedir? Kapsamı, ISO 41001 Standartları ve Binalar İçin Önemi (2026 Rehberi)',
    description: 'Tesis yönetimi (Facility Management) tanımı, uluslararası ISO 41001 standartları, geleneksel apartman yöneticiliğinden farkı ve binalara sağladığı operasyonel verimlilik.',
    category: 'tesis-yonetimi',
    tags: ['tesis yönetimi nedir', 'facility management', 'iso 41001', 'entegre tesis yönetimi', 'bina yönetimi', 'tesis işletme'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-23T09:00:00.000Z',
    dateModified: '2026-02-24T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi',
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

  'entegre-tesis-yonetimi-hizmetleri-nelerdir-kapsamli-rehber': {
    slug: 'entegre-tesis-yonetimi-hizmetleri-nelerdir-kapsamli-rehber',
    title: 'Entegre Tesis Yönetimi Hizmetleri Nelerdir? A\'dan Z\'ye Kapsamlı Sektör Rehberi',
    description: 'Entegre tesis yönetiminin 3 ana sütunu: Teknik (Hard Services), Destek (Soft Services) ve Hukuki/Mali Yönetim. Tek elden yönetimin %30 tasarruf modeli.',
    category: 'tesis-yonetimi',
    tags: ['tesis yönetimi hizmetleri', 'entegre yönetim', 'soft services', 'hard services', 'tesis işletmeciliği'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-23T10:30:00.000Z',
    dateModified: '2026-02-24T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi',
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
      { type: 'cta', text: 'Tesisinizin tüm hizmetlerini tek merkezden profesyonelce yönetin.', href: '/hizmetler/tesis-yonetimi', label: 'Entegre Tesis Yönetimi Hizmetlerimiz' }
    ]
  },

  'tesis-yonetiminde-soft-destek-hizmetleri-nelerdir': {
    slug: 'tesis-yonetiminde-soft-destek-hizmetleri-nelerdir',
    title: 'Tesis Yönetiminde Soft (Destek) Hizmetler Nelerdir? Temizlik, Güvenlik, Resepsiyon ve Peyzaj',
    description: 'Tesis yönetiminde destek (soft) hizmetlerin kapsamı: 5188 özel güvenlik, endüstriyel temizlik, concierge, resepsiyon, peyzaj bakımı ve atık yönetimi protokolleri.',
    category: 'tesis-yonetimi',
    tags: ['soft services', 'tesis temizlik', 'özel güvenlik', 'concierge resepsiyon', 'peyzaj bakımı', 'atık yönetimi'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-23T11:45:00.000Z',
    dateModified: '2026-02-24T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/temizlik-ve-hijyen',
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
      { type: 'cta', text: 'Siteniz için profesyonel temizlik ve destek hizmeti teklifi alın.', href: '/hizmetler/temizlik-ve-hijyen', label: 'Temizlik & Hijyen Hizmetlerimiz' }
    ]
  },

  'tesis-yonetiminde-hard-teknik-bakim-hizmetleri-nelerdir': {
    slug: 'tesis-yonetiminde-hard-teknik-bakim-hizmetleri-nelerdir',
    title: 'Tesis Yönetiminde Hard (Teknik) Hizmetler Nelerdir? HVAC, Elektrik, Asansör ve Yangın Otomasyonu',
    description: 'Bina ve tesislerde teknik (hard) bakım hizmetleri: merkezi iklimlendirme (HVAC), jeneratör, trafo, asansör yeşil etiket ve yangın hidrant sistemleri denetimi.',
    category: 'tesis-yonetimi',
    tags: ['hard services', 'tesis teknik bakım', 'hvac mekanik', 'asansör yeşil etiket', 'jeneratör trafo', 'yangın sprinkler'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-23T13:15:00.000Z',
    dateModified: '2026-02-24T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/teknik-bakim',
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
      { type: 'cta', text: 'Tesisiniz için 7/24 nöbetçi teknik servis ve bakım anlaşması yapın.', href: '/hizmetler/teknik-bakim', label: 'Teknik Bakım Hizmetlerimiz' }
    ]
  },

  'mulk-yonetimi-ile-tesis-yonetimi-arasindaki-farklar-nelerdir': {
    slug: 'mulk-yonetimi-ile-tesis-yonetimi-arasindaki-farklar-nelerdir',
    title: 'Mülk Yönetimi ile Tesis Yönetimi Arasındaki Farklar Nelerdir? (Property vs. Facility Management)',
    description: 'Gayrimenkul sektöründe sıkça karıştırılan mülk yönetimi (Property Management) ile tesis yönetimi (Facility Management) arasındaki 7 temel fark ve entegrasyonu.',
    category: 'tesis-yonetimi',
    tags: ['mülk yönetimi nedir', 'tesis yönetimi farkı', 'property management', 'kira yönetimi', 'gayrimenkul yönetimi'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-23T14:30:00.000Z',
    dateModified: '2026-02-24T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi',
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
      { type: 'cta', text: 'Hem tesis hem mülk yönetiminde kurumsal danışmanlık alın.', href: '/hizmetler/tesis-yonetimi', label: 'Tesis ve Mülk Yönetimi Çözümlerimiz' }
    ]
  },

  'profesyonel-tesis-yonetiminin-mulk-sahibine-10-somut-faydasi': {
    slug: 'profesyonel-tesis-yonetiminin-mulk-sahibine-10-somut-faydasi',
    title: 'Profesyonel Tesis Yönetiminin Mülk Sahibine ve Kat Malikine 10 Somut Faydası',
    description: 'Sitelerde ve binalarda profesyonel tesis yönetim şirketiyle çalışmanın gayrimenkul değerine, bütçe tasarrufuna ve yaşam konforuna sağladığı 10 somut kazanç.',
    category: 'tesis-yonetimi',
    tags: ['tesis yönetiminin faydaları', 'gayrimenkul değer artışı', 'aidat tasarrufu', 'huzurlu yaşam', 'profesyonel yönetim'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-23T15:45:00.000Z',
    dateModified: '2026-02-24T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi/rehber',
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
      { type: 'cta', text: 'Sitenizin değerini artırmak için profesyonel yönetim rehberimizi inceleyin.', href: '/hizmetler/tesis-yonetimi/rehber', label: 'Tesis Yönetimi Rehberi' }
    ]
  },

  'tesis-yonetim-sirketlerinin-gorev-ve-yasal-sorumluluklari': {
    slug: 'tesis-yonetim-sirketlerinin-gorev-ve-yasal-sorumluluklari',
    title: 'Tesis Yönetim Şirketleri Hangi Sorumlulukları Üstlenir? Yasal, Mali ve Operasyonel Görevler',
    description: '634 Sayılı Kat Mülkiyeti Kanunu ve İş Kanunu kapsamında profesyonel tesis yönetim şirketlerinin üstlendiği yasal mesuliyetler, mali denetim ve operasyonel görevler.',
    category: 'tesis-yonetimi',
    tags: ['tesis yönetim şirketinin görevleri', 'kmk madde 35', 'yönetici sorumlulukları', 'mali işletme bütçesi', 'isg sorumluluğu'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-23T16:30:00.000Z',
    dateModified: '2026-02-24T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/yonetim-danismanligi',
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
      { type: 'cta', text: 'Yasal süreçler ve yönetim danışmanlığı hakkında bilgi alın.', href: '/hizmetler/yonetim-danismanligi', label: 'Yönetim Danışmanlığı Hizmetimiz' }
    ]
  },

  'tesis-yonetim-plani-nasil-hazirlanir-adim-adim-rehber': {
    slug: 'tesis-yonetim-plani-nasil-hazirlanir-adim-adim-rehber',
    title: 'Tesis Yönetim Planı Nasıl Hazırlanir? Adım Adım İşletme ve Bütçe Planlama Rehberi',
    description: 'Kat Mülkiyeti Kanunu Madde 28 uyarınca tüm kat maliklerini bağlayan sözleşme hükmündeki Tesis Yönetim Planı hazırlama, ortak alan kuralları ve işletme projesi rehberi.',
    category: 'tesis-yonetimi',
    tags: ['tesis yönetim planı', 'yönetim planı hazırlama', 'kmk madde 28', 'işletme projesi örneği', 'ortak gider paylaşımı'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-23T17:15:00.000Z',
    dateModified: '2026-02-24T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi',
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
      { type: 'cta', text: 'Siteniz için profesyonel yönetim planı hazırlatalım.', href: '/hizmetler/tesis-yonetimi', label: 'Tesis Yönetimi Çözümlerimiz' }
    ]
  },

  'luks-rezidanslarda-concierge-ve-tesis-yonetimi-standartlari-2026': {
    slug: 'luks-rezidanslarda-concierge-ve-tesis-yonetimi-standartlari-2026',
    title: 'Lüks Rezidanslarda Concierge ve 5 Yıldızlı Tesis Yönetimi Standartları (2026 Rehberi)',
    description: 'A+ lüks rezidans ve karma yaşam projelerinde 7/24 VIP concierge, lobi karşılama, akıllı bina otomasyonu ve KMK 37 bütçe optimizasyonu standartları.',
    category: 'tesis-yonetimi',
    tags: ['rezidans yönetimi', 'concierge', 'lüks tesis yönetimi', 'akıllı bina', '5188 güvenlik', 'rezidans aidat'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-15T09:00:00.000Z',
    dateModified: '2026-02-24T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
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
      { type: 'cta', text: 'Rezidansınız için 5 yıldızlı entegre yönetim teklifi alın.', href: '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi', label: 'Rezidans Yönetimi Çözümümüzü İnceleyin' }
    ]
  },

  'ticari-plazalarda-hvac-ve-leed-tesis-enerji-verimliligi': {
    slug: 'ticari-plazalarda-hvac-ve-leed-tesis-enerji-verimliligi',
    title: 'Ticari Plazalarda HVAC Otomasyonu ve BREEAM/LEED Yeşil Bina Enerji Verimliliği',
    description: 'A sınıfı iş merkezleri ve plazalarda merkezi iklimlendirme otomasyonu, kompanzasyon panosu takibi ve ISO 41001 standartlarında %30 enerji tasarrufu.',
    category: 'tesis-yonetimi',
    tags: ['plaza yönetimi', 'hvac otomasyonu', 'leed sertifikası', 'enerji verimliliği', 'ofis yönetimi', 'iso 41001'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-16T10:00:00.000Z',
    dateModified: '2026-02-24T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi/plaza-yonetimi',
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
      { type: 'h2', text: '3. Kiracı Yönetimi ve Kat Mülkiyeti Kanunu İşletme Bütçesi' },
      { type: 'p', text: 'Plaza sakinlerinin ve kurumsal kiracıların gider paylaşımları, bağımsız bölüm metrekareleri ve ısı pay ölçer endekslerine göre şeffaf yazılımımız üzerinden adil biçimde faturalandırılır.' },
      { type: 'cta', text: 'Plazanız için enerji verimliliği ve işletme analizi talep edin.', href: '/hizmetler/tesis-yonetimi/plaza-yonetimi', label: 'Plaza Yönetimi Çözümlerimiz' }
    ]
  },

  '1000-konutlu-toplu-konut-sitelerinde-merkezi-yonetim-ve-aidat-tasarrufu': {
    slug: '1000-konutlu-toplu-konut-sitelerinde-merkezi-yonetim-ve-aidat-tasarrufu',
    title: '1.000+ Bağımsız Bölümlü Mega Toplu Konut Sitelerinde Merkezi Yönetim ve Toplu Tedarik Gücü',
    description: 'Çok bloklu büyük toplu konut sitelerinde blok temsilciler kurulu işleyişi, ölçek ekonomisi ile toplu satın alma ve aidatlarda %25-33 tasarruf formülü.',
    category: 'tesis-yonetimi',
    tags: ['toplu konut yönetimi', 'mega site yönetimi', 'aidat tasarrufu', 'blok temsilciler kurulu', 'kmk 37'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-17T11:00:00.000Z',
    dateModified: '2026-02-24T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
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
      { type: 'cta', text: 'Sitenizin aidatlarını düşürmek için keşif isteyin.', href: '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi', label: 'Toplu Konut Yönetimi Çözümümüz' }
    ]
  },

  'endustriyel-sanayi-tesislerinde-iso-45001-isg-ve-guvenlik-yonetimi': {
    slug: 'endustriyel-sanayi-tesislerinde-iso-45001-isg-ve-guvenlik-yonetimi',
    title: 'Endüstriyel Tesislerde ISO 45001 İSG ve Perimetre Güvenlik Yönetimi',
    description: 'Fabrikalar, lojistik depolar ve organize sanayi tesislerinde ağır teknik bakım, yangın hidrant hatları ve sıfır iş kazası odaklı entegre yönetim.',
    category: 'tesis-yonetimi',
    tags: ['sanayi tesisi yönetimi', 'fabrika yönetimi', 'iso 45001', 'perimetre güvenliği', 'yangın hidrant'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-18T14:00:00.000Z',
    dateModified: '2026-02-24T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi',
    tldr: 'Endüstriyel tesis ve fabrikalarda ISO 45001 iş sağlığı, yangın hidrant hatları periyodik testi ve 5188 perimetre güvenliği sıfır kaza hedefiyle yönetilir.',
    content: [
      { type: 'p', text: 'Sanayi tesisleri, üretim fabrikaları ve lojistik antrepolar; konut yapılarından çok farklı olarak ağır teknik altyapı, tehlikeli madde riskleri ve yüksek iş güvenliği standartları gerektirir.' },
      { type: 'h2', text: '1. ISO 45001 İş Sağlığı ve Güvenliği Risk Yönetimi' },
      { type: 'p', text: 'Tesis içerisindeki forklift yolları, kimyasal depolama alanları ve yüksek gerilim trafo merkezleri sürekli denetlenir. Risk analizi ve acil durum tahliye tatbikatları 6 ayda bir güncellenir.' },
      { type: 'h2', text: '2. Yangın Hidrant, Sprinkler ve Duman Tahliye Sistemleri' },
      { type: 'p', text: 'Binaların Yangından Korunması Hakkında Yönetmelik gereğince yangın pompaları haftalık otomatik test edilir, hidrant debileri ve köpüklü söndürme sistemleri belgelendirilir.' },
      { type: 'h2', text: '3. Fabrika Perimetre Güvenliği ve Giriş-Çıkış Lojistik Kontrolü' },
      { type: 'p', text: 'TIR ve kamyon kantar tartımları, sevkiyat irsaliye kontrolleri ve x-ray ziyaretçi taramaları grup şirketimiz 3G Özel Güvenlik tarafından yürütülür.' },
      { type: 'cta', text: 'Sanayi tesisiniz için profesyonel işletme şartnamesi alın.', href: '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi', label: 'Sanayi Tesisi Yönetimi Detayları' }
    ]
  },

  'profesyonel-tesis-yonetim-sirketi-secim-rehberi-ve-ihale-sartnamesi': {
    slug: 'profesyonel-tesis-yonetim-sirketi-secim-rehberi-ve-ihale-sartnamesi',
    title: 'Profesyonel Tesis Yönetim Şirketi Nasıl Seçilir? 10 Maddelik Denetim ve Şartname Kontrol Listesi',
    description: 'Bina ve siteler için yönetim şirketi seçerken dikkat edilmesi gereken 10 yasal ve teknik kriter, ihale şartnamesi (RFP) hazırlama ve devir teslim rehberi.',
    category: 'tesis-yonetimi',
    tags: ['tesis yönetimi seçimi', 'yönetim ihale şartnamesi', 'rfp', 'sla taahhütleri', 'yönetim devir teslim'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-19T09:30:00.000Z',
    dateModified: '2026-02-24T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/tesis-yonetimi/rehber',
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
      { type: 'cta', text: 'Siteniz için ücretsiz ihale şartnamesi oluşturun.', href: '/hizmetler/tesis-yonetimi/rehber', label: 'Tesis Yönetimi Rehberimizi İnceleyin' }
    ]
  },

  'aidat-borcu-icra-takibi-ve-yuzde-5-gecikme-tazminati-kmk-20': {
    slug: 'aidat-borcu-icra-takibi-ve-yuzde-5-gecikme-tazminati-kmk-20',
    title: 'Aidatını Ödemeyen Kat Maliki İçin KMK m.20 İcra Takibi ve %5 Gecikme Tazminatı Süreci',
    description: 'Aidat borçluları hakkında Kat Mülkiyeti Kanunu Madde 20 kapsamında ilamsız icra takibi, noter ihtarnamesi ve Yargıtay emsal kararları.',
    category: 'hukuk',
    tags: ['aidat icra takibi', 'kmk madde 20', 'yüzde 5 gecikme tazminatı', 'yargıtay içtihadı', 'ilamsız icra'],
    author: 'eyup-salihoglu',
    datePublished: '2026-02-22T13:00:00.000Z',
    dateModified: '2026-02-24T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
    pillar: '/hizmetler/aidat-takibi',
    tldr: 'KMK m.20 uyarınca aidatını vadesinde ödemeyen kat malikine aylık %5 gecikme tazminatı uygulanır ve mahkeme kararı aranmaksızın ilamsız icra takibi başlatılır.',
    content: [
      { type: 'p', text: 'Apartman ve site yönetimlerinin en sık karşılaştığı sorunların başında, aidat ve ortak gider avanslarını düzenli ödemeyen kat malikleri ve kiracılar gelmektedir. 634 Sayılı Kat Mülkiyeti Kanunu bu konuda yöneticiye çok güçlü yasal haklar tanımıştır.' },
      { type: 'h2', text: '1. Aylık %5 Yasal Gecikme Tazminatı (KMK m.20/2)' },
      { type: 'p', text: 'Gider veya avans payını ödemeyen kat maliki, ödemede geciktiği günler için aylık yüzde beş hesabıyla gecikme tazminatı ödemekle yükümlüdür. Bu tazminat yıllık %60\'a tekabül etmekte olup yasal faizden bağımsızdır.' },
      { type: 'h2', text: '2. İlamsız İcra Takibi ve Haciz Süreci' },
      { type: 'p', text: 'Yönetici veya vekili avukat; borçlu kat malikine karşı mahkemeden ilam almaya gerek duymaksızın doğrudan İcra Müdürlüğü kanalıyla İlamsız İcra Takibi (Örnek No: 7) başlatabilir.' },
      { type: 'h2', text: '3. Kiracının Müteselsil Sorumluluğu (KMK m.22)' },
      { type: 'p', text: 'Kat malikinin ortak gider borcundan, bağımsız bölümde oturan kiracı da ödemekle yükümlü olduğu kira miktarı kadar müteselsilen sorumludur. İcra dairesi kiracıya haciz ihbarnamesi göndererek kirayı doğrudan site hesabına tahsil edebilir.' },
      { type: 'cta', text: 'Hukuk departmanımızla aidat tahsilat oranınızı %98\'e çıkarın.', href: '/hizmetler/aidat-takibi', label: 'Aidat ve İcra Takip Hizmetimiz' }
    ]
  },

  'aidat-icra-takibi-nasil-yapilir': {
    slug: 'aidat-icra-takibi-nasil-yapilir',
    title: 'Aidat Borcu İçin İcra Takibi Nasıl Yapılır?',
    description: 'Apartman ve site aidat borcu icra takibi süreci: yasal dayanaklar, gerekli belgeler, ihtarname, harçlar ve tahsilat aşamaları.',
    category: 'hukuk',
    tags: [
      'aidat icra takibi',
      'aidat borcu icra',
      'apartman aidat icra',
      'site aidat borcu',
      'kmk 20 icra',
      'aidat tahsilatı',
      'icra takibi adımları'
    ],
    author: 'av-mehmet-kaya',
    datePublished: '2026-03-12T10:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070',
    pillar: '/hizmetler/aidat-takibi',
    tldr: 'KMK m.20 uyarınca aidat borcu olan kat malikine karşı yöneticilik ilamsız icra takibi başlatabilir. Aylık %5 gecikme tazminatı uygulanır, borçlu 7 gün içinde itiraz etmezse takip kesinleşir ve haciz aşamasına geçilir.',
    content: [
      {
        type: 'h2',
        text: 'Aidat İcra Takibinin Yasal Dayanağı'
      },
      {
        type: 'p',
        text: '634 sayılı Kat Mülkiyeti Kanunu m.20/2 uyarınca ortak gider ve avans payını ödemeyen kat malikine karşı yönetici veya diğer kat maliklerinden her biri icra takibi yapabilir. Aidat borçlarında aylık %5 gecikme tazminatı kanunen uygulanır.'
      },
      {
        type: 'h2',
        text: 'İcra Takibine Başlamadan Önceki Adımlar'
      },
      {
        type: 'ul',
        items: [
          'İşletme Projesinin Kesinleşmesi: Bütçenin kat maliklerine tebliğ edilmiş olması şarttır.',
          'Hesap Ekstresi Çıkarılması: Borcun hangi aylara ait olduğunun dökümü hazırlanır.',
          'Yazılı Bildirim ve İhtar: Noterden veya taahhütlü mektupla 7 günlük ödeme ihtarı gönderilir.'
        ]
      },
      {
        type: 'h2',
        text: 'İcra Takibi Süreci ve Haciz Aşaması'
      },
      {
        type: 'p',
        text: 'İcra dairesine takip talebi verilir. Örnek No: 7 ilamsız takip ödeme emri borçluya tebliğ edilir. 7 gün içinde borç ödenmez veya haksız itiraz edilirse takip kesinleşir; banka hesapları, maaş ve taşınmaz haczi uygulanır.'
      },
      {
        type: 'cta',
        text: 'Hukuk departmanımızla aidat tahsilatlarınızı güvenceye alın.',
        href: '/hizmetler/hukuk-ve-icra-danismanligi',
        label: 'Hukuk ve İcra Danışmanlığı Alın'
      }
    ]
  },

  'kentsel-donusum-surecleri': {
    slug: 'kentsel-donusum-surecleri',
    title: 'Kentsel Dönüşüm Süreçleri: Kat Malikleri İçin Yol Haritası',
    description: '6306 sayılı kanun kapsamında kentsel dönüşüm adımları: riskli yapı tespiti, salt çoğunluk kuralı, müteahhit sözleşmesi, kira yardımı ve yasal haklar.',
    category: 'hukuk',
    tags: [
      'kentsel dönüşüm',
      '6306 sayılı kanun',
      'riskli yapı tespiti',
      'kentsel dönüşüm çoğunluk',
      'bina yıkımı',
      'müteahhit sözleşmesi',
      'kira yardımı'
    ],
    author: 'av-mehmet-kaya',
    datePublished: '2026-03-28T10:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=2070',
    pillar: '/hizmetler/yonetim-danismanligi',
    tldr: '6306 sayılı Kanun ile kentsel dönüşümde karar çoğunluğu salt çoğunluğa (yarıdan bir fazla) indirilmiştir. Riskli yapı tespiti, bakanlık lisanslı kuruluşlarca yapılır ve kesinleştiğinde 60+30 günlük tahliye süreci başlar.',
    content: [
      {
        type: 'h2',
        text: '1. Riskli Yapı Tespiti ve Rapor Aşaması'
      },
      {
        type: 'p',
        text: '6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun kapsamında kat maliklerinden birinin başvurusu ile Çevre, Şehircilik ve İklim Değişikliği Bakanlığı lisanslı kuruluşları karot ve statik inceleme yapar.'
      },
      {
        type: 'h2',
        text: '2. Salt Çoğunluk Kuralı ve Karar Alma'
      },
      {
        type: 'p',
        text: 'Yeni yasal düzenleme ile binanın yeniden yapımı, müteahhit seçimi ve sözleşme şartları için arsa payı sahiplerinin salt çoğunluğu (yarıdan bir fazlası) yeterli hale getirilmiştir.'
      },
      {
        type: 'h2',
        text: '3. Tahliye, Kira Yardımı ve İnşaat Sözleşmesi'
      },
      {
        type: 'ul',
        items: [
          'Tahliye Süreci: Rapor kesinleştikten sonra maliklere 60 gün + ek 30 gün tahliye süresi tanınır.',
          'Kira Yardımı: Bakanlıkça hak sahiplerine 18-48 ay boyunca geri ödemesiz kira desteği sağlanır.',
          'Noter Onaylı Sözleşme: İnşaat tamamlama garantisi ve teknik şartname noter onaylı tanzim edilir.'
        ]
      },
      {
        type: 'cta',
        text: 'Binanızın kentsel dönüşüm ve yönetim danışmanlığı için bize ulaşın.',
        href: '/teklif-al',
        label: 'Dönüşüm Danışmanlığı Teklifi Al'
      }
    ]
  },

  'hukuk-ve-icra-danismanligi-hizmeti-rehberi-2026': {
    slug: 'hukuk-ve-icra-danismanligi-hizmeti-rehberi-2026',
    title: 'Hukuk ve İcra Danışmanlığı: Aidat Takibi Rehberi (2026)',
    description: 'Site ve apartman yönetimlerinde hukuk ve icra danışmanlığı: KMK m.20 aidat tahsilatı, dava süreçleri, genel kurul iptali ve yasal risk yönetimi.',
    category: 'hukuk',
    tags: [
      'hukuk danışmanlığı',
      'icra danışmanlığı',
      'site hukuku',
      'kmk davaları',
      'aidat tahsilatı',
      'apartman yönetimi hukuku'
    ],
    author: 'av-mehmet-kaya',
    datePublished: '2026-08-07T11:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070',
    pillar: '/hizmetler/hukuk-ve-icra-danismanligi',
    tldr: 'Site yönetimlerinde profesyonel hukuk danışmanlığı; aidat tahsilatını %98 seviyesine çıkarır, hatalı genel kurul kararlarını önler ve yöneticinin şahsi hukuki sorumluluğunu ortadan kaldırır.',
    content: [
      {
        type: 'h2',
        text: 'Site Yönetimlerinde Hukuki Riskler'
      },
      {
        type: 'p',
        text: 'Yönetim kurullarının aldığı usulsüz kararlar, tebliğ edilmemiş işletme projeleri ve hatalı personel fesihleri site yönetimlerini ağır tazminatlarla karşı karşıya bırakır. Uzman hukuk desteği bu riskleri sıfırlar.'
      },
      {
        type: 'h2',
        text: 'Hukuk ve İcra Danışmanlığı Kapsamı'
      },
      {
        type: 'ul',
        items: [
          'Hızlı İcra Takibi: Vadesi geçen aidatlar için derhal Örnek No: 7 ilamsız icra takibi.',
          'Genel Kurul Yönetimi: Çağrı, hazirun ve karar tutanaklarının iptal davasına karşı korunması.',
          'Yönetim Planı Güncellemesi: KMK m.28 uyarınca güncel mevzuata uygun tescil.',
          'Kiracı-Malik İhtilafları: Tahliye, ortak alan işgali ve gürültü davalarının takibi.'
        ]
      },
      {
        type: 'cta',
        text: 'Siteniz için profesyonel hukuk ve icra danışmanlığı başlatın.',
        href: '/hizmetler/hukuk-ve-icra-danismanligi',
        label: 'Hukuk Hizmetimizi İnceleyin'
      }
    ]
  },

  'kat-mulkiyeti-kanunu-site-yoneticisi-haklari-2026': {
    slug: 'kat-mulkiyeti-kanunu-site-yoneticisi-haklari-2026',
    title: "KMK'da Site Yöneticisinin Hak ve Yükümlülükleri",
    description: "634 sayılı Kat Mülkiyeti Kanunu kapsamında site ve apartman yöneticisinin yasal hakları, görevleri, ücret hakkı ve cezai sorumlulukları.",
    category: 'hukuk',
    tags: [
      'site yöneticisi hakları',
      'kmk yönetici',
      'yönetici sorumluluğu',
      'apartman yöneticisi hakları',
      'kat mülkiyeti kanunu',
      'yönetici ücreti'
    ],
    author: 'av-mehmet-kaya',
    datePublished: '2026-08-07T11:00:00+03:00',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070',
    pillar: '/hizmetler/yonetim-danismanligi',
    tldr: 'KMK m.34-40 uyarınca yönetici, kat malikleri kurulunun vekili hükmündedir. KMK m.40 uyarınca yönetim planında aksi kararlaştırılmadıkça yönetici uygun bir ücret talep etme hakkına sahiptir.',
    content: [
      {
        type: 'h2',
        text: "1. Yöneticinin Hukuki Konumu ve Vekalet İlişkisi"
      },
      {
        type: 'p',
        text: "634 sayılı Kat Mülkiyeti Kanunu Madde 38 uyarınca yönetici, kat maliklerine karşı aynen bir vekil gibi sorumludur. Kat malikleri kurulunun kararlarını uygulamakla ve ana gayrimenkulü korumakla yükümlüdür."
      },
      {
        type: 'h2',
        text: "2. Yöneticinin Hakları (KMK Madde 40)"
      },
      {
        type: 'ul',
        items: [
          'Ücret Hakkı: Yönetim planında aksi yoksa yönetici kat maliklerince belirlenen uygun bir ücret alır.',
          'Gider Payı Muafiyeti: Kat malikleri arasından seçilen yönetici, aksi kararlaştırılmadıkça normal yönetim giderlerinin yarısına katılmaz.',
          'Haklı Nedenle İstifa: Yönetici haklı sebeplerle istediği zaman görevinden istifa edebilir.',
          'Dava ve İcra Takibi Açma Yetkisi: KMK m.35 uyarınca vekaletname aranmaksızın borçlulara karşı dava ve icra takibi açabilir.'
        ]
      },
      {
        type: 'h2',
        text: "3. Yöneticinin Cezai ve Şahsi Sorumlulukları"
      },
      {
        type: 'p',
        text: "Yönetici; karar defterini notere tasdik ettirmemek, parayı şahsi hesabına geçirmek veya İSG tedbirlerini almamaktan dolayı Türk Ceza Kanunu kapsamında Güveni Kötüye Kullanma ve görevi ihmal suçlarından şahsen sorumlu tutulabilir."
      },
      {
        type: 'cta',
        text: 'Yöneticilik risklerinizi profesyonel bir yönetim şirketine devredin.',
        href: '/teklif-al',
        label: 'Profesyonel Yönetim Teklifi Al'
      }
    ]
  }
};

/**
 * İlçe rehberleri, ikinci grup: Pendik, Esenyurt, Küçükçekmece, Kâğıthane, Bahçelievler, Çekmeköy.
 * Aynı kalıp ve aynı ilke: nüfus, daire sayısı, "en büyük" gibi doğrulanamayan iddia yok;
 * yalnızca mahalle adları, yapı tipinin genel özellikleri ve KMK'nın genel hükümleri kullanılır.
 */
type Segment = { h: string; p: string };
export type GuideSpec = {
  slug: string;
  name: string;
  side: 'Anadolu' | 'Avrupa';
  loc: string;
  lead: string;
  segments: Segment[];
  rows: string[][];
  focus: Segment;
  faq: [string, string][];
  tags: string[];
};
export type GuideExtra = { segments: Segment[]; calendar: string[]; question: string };

export const SPECS_BATCH2: GuideSpec[] = [
  {
    slug: 'pendik', name: 'Pendik', side: 'Anadolu', loc: "Pendik'te",
    lead: "Pendik, Anadolu Yakası'nın doğu ucunda, deniz kıyısından Sabiha Gökçen Havalimanı aksına uzanan geniş bir ilçedir. Güzelyalı ve Çamlık'ta sahil ve yamaç yerleşimleri, Kurtköy ve Yenişehir'de büyük yerleşkeler ve yeni projeler, Kaynarca'da yoğun apartman dokusu bulunur. Bu çeşitlilik, yönetim ihtiyacının ilçe içinde bile ciddi biçimde farklılaşması anlamına gelir.",
    segments: [
      { h: 'Büyük yerleşkelerde ölçekli yönetim: Kurtköy ve Yenişehir', p: "Çok bloklu ve çok etaplı yerleşkelerde ortak giderlerin hangi bloğa, hangi etaba ait olduğu açık değilse tartışma kaçınılmazdır. İşletme projesinde ortak ve bloğa özgü giderler ayrı gösterilmeli, yönetim planındaki paylaşım ölçüsü aidat hesabının dayanağı olarak her toplantıda hatırlatılmalıdır." },
      { h: 'Sahil ve yamaç yapıları: Güzelyalı ve Çamlık', p: "Denize yakın binalarda tuzlu hava, asansör ve elektrik panolarında; yamaç yapılarda ise yağışlı mevsimde drenaj ve istinat duvarlarında sorun yaratabilir. Bu risklerin yıllık kontrol listesine yazılması ve tespitlerin tarihli fotoğrafla kayda alınması, büyük onarım kararlarını daha sağlıklı verdirir." },
    ],
    rows: [
      ['Kurtköy', 'Havalimanı aksında yeni projeler ve siteler', 'Ölçekli yönetim, güvenlik, aidat takibi'],
      ['Yenişehir', 'Orta ve büyük ölçekli kapalı siteler', 'Ortak alan bakımı, sosyal tesis giderleri'],
      ['Kaynarca', 'Yoğun apartman dokusu', 'Asansör ve tesisat bakımı, aidat disiplini'],
      ['Güzelyalı', 'Sahil hattında konutlar', 'Tuzlu havanın etkisi, cephe ve pano bakımı'],
      ['Çamlık', 'Yamaç ve bahçeli yerleşim', 'Drenaj, peyzaj ve çevre güvenliği'],
    ],
    focus: { h: 'Elektrik, su ve doğal gaz abonelikleri', p: "Pendik Anadolu Yakası'nda olduğundan elektrik dağıtımı AYEDAŞ, su ve kanalizasyon İSKİ, doğal gaz İGDAŞ üzerinden yürür. Yeni teslim edilen yerleşkelerde ortak alan sayaçlarının aboneliği müteahhit adına kalmış olabilir; devir sırasında abonelik sahibini ve ilk dönem faturalarını tutanakla netleştirin." },
    faq: [
      ['Çok bloklu yerleşkede bloğa özgü giderler nasıl ayrılır?', 'İşletme projesinde ortak giderlerle bloğa özgü giderler ayrı kalemler olarak gösterilir; paylaşım ölçüsü yönetim planına göre belirlenir. Planda açık hüküm yoksa hukuk danışmanından görüş alın.'],
      ['Yeni teslim edilen sitede ilk yönetici nasıl seçilir?', 'Kat malikleri kurulu toplanır, KMK m.34 çerçevesinde yönetici seçilir ve devir teslim belgeleri tutanakla alınır. Sonra ilk işletme projesi hazırlanır.'],
    ],
    tags: ['pendik', 'site yönetimi', 'apartman yönetimi', 'kurtköy', 'yenişehir'],
  },
  {
    slug: 'esenyurt', name: 'Esenyurt', side: 'Avrupa', loc: "Esenyurt'ta",
    lead: "Esenyurt, İstanbul'un en kalabalık ilçeleri arasındadır ve yüksek katlı blokların, çok daireli sitelerin yoğunlaştığı bir yerleşimdir. Güzelyurt, Akçaburgaz, Mehterçeşme, Talatpaşa ve Pınar gibi mahallelerde yapı tipi ve yaşı farklılaşır. Daire sayısı arttıkça aidat takibi, bakım planı ve karar toplantıları bir ölçek sorununa dönüşür.",
    segments: [
      { h: 'Ölçek sorunu: çok daireli sitelerde aidat ve tahsilat', p: "Yüzlerce bağımsız bölümü olan sitelerde birkaç dairelik gecikme bile nakit akışını bozabilir. Dijital borç kaydı, aylık borçlu listesi ve yazılı hatırlatma adımlarını önceden belirleyen bir tahsilat prosedürü, tartışmayı kişisel olmaktan çıkarır. Gecikme tazminatı ve icra takibi KMK m.20'ye göre yürür." },
      { h: 'Yüksek bloklarda asansör, hidrofor ve jeneratör', p: "Yüksek katlı yapılarda asansör ve hidrofor kesintisi doğrudan günlük yaşamı etkiler. Periyodik bakımın yazılı takvimi, yedek parça için ön onay limitleri ve arıza çağrısı için sözleşmede yazılı müdahale hedefi, olası aksaklıkları azaltır." },
    ],
    rows: [
      ['Güzelyurt', 'Yeni yüksek katlı yapılar ve siteler', 'Ölçekli aidat takibi, asansör ve hidrofor bakımı'],
      ['Akçaburgaz', 'Yoğun site ve apartman karışımı', 'Güvenlik, otopark, ortak alan temizliği'],
      ['Mehterçeşme', 'Orta ve yüksek katlı yapılar', 'Teknik bakım takvimi, şeffaf raporlama'],
      ['Talatpaşa', 'Yoğun konut dokusu', 'Aidat disiplini, çöp ve temizlik düzeni'],
      ['Pınar', 'Karma konut dokusu', 'Giriş çıkış düzeni, güvenlik'],
    ],
    focus: { h: 'Yüksek katlı yapılarda yangın ve tahliye güvenliği', p: "Yüksek yapılarda yangın algılama, merdiven ve kaçış yollarının serbestliği ve acil durum aydınlatması, bakım listesinin ayrı bir başlığı olmalıdır. Kaçış yollarına eşya konulmaması için bina yönetimi periyodik kontrol yapar; yangın ekipmanlarının bakım tarihleri kayda alınır. Mevzuata ilişkin güncel gereklilikleri ilgili itfaiye ve belediye birimlerinden teyit edin." },
    faq: [
      ['Çok daireli sitede aidat borcunu nasıl kontrol altında tutarız?', 'Aylık borç listesi, yazılı hatırlatma ve ihtar prosedürü kurun; gecikme için KMK m.20 çerçevesinde tazminat ve icra takibi yolunu önceden belirleyin.'],
      ['Yüksek binada asansör arızasında ne kadar sürede müdahale beklenmeli?', 'Süre sözleşmedeki hükümlere bağlıdır; bakım sözleşmesinde arıza çağrısı için yazılı bir müdahale hedefi ve rapor yükümlülüğü bulunmalıdır.'],
    ],
    tags: ['esenyurt', 'site yönetimi', 'apartman yönetimi', 'güzelyurt', 'akçaburgaz'],
  },
  {
    slug: 'kucukcekmece', name: 'Küçükçekmece', side: 'Avrupa', loc: "Küçükçekmece'de",
    lead: "Küçükçekmece, Marmara kıyısından Küçükçekmece Gölü'ne ve Halkalı'ya uzanan, farklı yapı dokularını bir arada barındıran bir ilçedir. Atakent ve Halkalı'da büyük siteler, Sefaköy ve Cennet'te yoğun apartman dokusu, İnönü ve Fevzi Çakmak'ta köklü konut alanları öne çıkar. Yönetim ihtiyacı mahalleye göre belirgin biçimde değişir.",
    segments: [
      { h: 'Büyük sitelerde sosyal tesis ve havuz işletmesi: Atakent', p: "Havuz, spor ve çocuk alanı gibi tesisleri olan büyük sitelerde kullanım kuralı, çalışma saatleri ve bakım gideri yazılı olmalıdır. Havuz suyunun periyodik kontrolü ve hijyen kayıtları, hem sağlık hem de olası bir uyuşmazlıkta özenin kanıtı açısından önemlidir." },
      { h: 'Gölet ve kıyı komşuluğu', p: "Göl ve deniz kıyısına yakın yapılarda nem, cephe, çatı ve zemin kat su yalıtımında sorun yaratabilir. Yağışlı mevsim öncesi ve sonrası yapılacak görsel kontrol ve tespitlerin tarihli kaydı, kapsamlı bir tadilat kararında karşılaştırma imkânı verir." },
    ],
    rows: [
      ['Atakent', 'Büyük siteler ve sosyal tesisli yerleşkeler', 'Havuz ve tesis giderleri, güvenlik, aidat şeffaflığı'],
      ['Halkalı', 'Yeni projeler ve ulaşım aksı yapıları', 'Ölçekli yönetim, otopark ve giriş çıkış düzeni'],
      ['Sefaköy', 'Yoğun apartman dokusu', 'Asansör ve tesisat bakımı, aidat takibi'],
      ['Cennet', 'Karma yapı dokusu', 'Ortak alan temizliği, güvenlik'],
      ['İnönü ve Fevzi Çakmak', 'Köklü konut alanları', 'Eski bina bakımı, yenileme kararları'],
    ],
    focus: { h: 'Havuz ve sosyal tesislerde hijyen ve kayıt', p: "Havuz suyunun klor ve pH değerlerinin düzenli ölçülmesi, ölçüm kayıtlarının tutulması ve sezon açılışında filtre ve pompa kontrolü bakım planına yazılmalıdır. Kapalı havuz veya spor salonu işleten sitelerde ilgili sağlık ve belediye birimlerinin güncel gerekliliklerini teyit edin; sorumluluk dağılımı sözleşmede açık yazılmalıdır." },
    faq: [
      ['Havuz giderleri aidata nasıl yansıtılır?', 'İşletme projesinde havuz kalemleri ayrı gösterilir; paylaşım yönetim planına göre yapılır. Az kullanan malikler itiraz ederse plana ve kurul kararına bakılır.'],
      ['Eski binada yenileme için aidatı birden artırmadan ne yapılabilir?', 'İhtiyaçları acil ve ertelenebilir olarak ayırın, bütçeyi yıllara yayın ve her büyük işte çoklu teklif alın.'],
    ],
    tags: ['küçükçekmece', 'site yönetimi', 'apartman yönetimi', 'atakent', 'halkalı'],
  },
  {
    slug: 'kagithane', name: 'Kâğıthane', side: 'Avrupa', loc: "Kâğıthane'de",
    lead: "Kâğıthane, Cendere ve Seyrantepe hattında ofis, rezidans ve karma kullanımlı yüksek yapıların; Çeliktepe, Hamidiye ve Gültepe'de yoğun konut dokusunun bulunduğu bir ilçedir. Son yıllarda kentsel dönüşümle yenilenen yapılar ve yeni projeler eski dokunun yanında yer alır. Bu iç içelik, aynı ilçede çok farklı yönetim beklentilerini doğurur.",
    segments: [
      { h: 'Karma kullanımlı kule ve rezidanslar', p: "Konut, ofis ve ticaret bölümlerinin aynı yapıda olduğu projelerde kullanım yoğunluğu ve çalışma saatleri farklıdır. Asansör, güvenlik ve temizlik giderlerinin bölümlere göre nasıl paylaşılacağı yönetim planında açık olmalı; belirsizlik varsa plan değişikliği için uygun nisapla karar alınmalıdır." },
      { h: 'Kentsel dönüşümle yenilenen yapılar', p: "Yeni teslim edilen yapılarda devir teslim belgeleri, garanti kapsamındaki ekipman listesi ve ilk işletme projesi, yönetimin ilk üç ayında tamamlanması gereken işlerdir. Kat malikleri kurulunu toplayıp yönetici ve denetçi seçmek, belge arşivini baştan düzenli kurmak ileride çıkabilecek uyuşmazlıkları azaltır." },
    ],
    rows: [
      ['Seyrantepe', 'Rezidans ve karma kullanımlı yüksek yapılar', 'Ofis-konut gider ayrımı, teknik bakım, güvenlik'],
      ['Cendere', 'Vadi hattında iş ve konut yapıları', 'Asansör sürekliliği, enerji giderleri'],
      ['Hamidiye', 'Yoğun konut dokusu', 'Aidat takibi, bina bakımı'],
      ['Çeliktepe', 'Apartman ağırlıklı dönüşen alan', 'Yeni yapılarda devir teslim, yönetim kurulumu'],
      ['Gültepe', 'Yoğun apartman dokusu', 'Eski bina bakımı, asansör ve tesisat'],
    ],
    focus: { h: 'Yüksek katlı karma yapılarda enerji ve iklimlendirme', p: "Merkezi iklimlendirme, aydınlatma ve asansör tüketimi yüksek katlı yapıların bütçesinde önemli yer tutar. Alt sayaçlarla konut ve ticari bölümlerin tüketimini ayırmak, aylık tüketimi önceki yılla kıyaslamak ve olağan dışı artışları araştırmak hem tasarruf hem şeffaflık sağlar." },
    faq: [
      ['Ofis ve konutun bulunduğu binada giderler nasıl paylaşılır?', 'Paylaşım ölçüsü yönetim planında belirlenir. Plan belirsizse ve değişiklik gerekiyorsa tek yapıda KMK m.28/3, toplu yapıda m.70 çerçevesinde oy aranır; önce hukuk görüşü alın.'],
      ['Dönüşümle yapılan yeni binada garanti takibini kim yapar?', 'Devir teslimde ekipman listesi ve garanti süreleri tutanakla alınır; arızalar yazılı ve ispatlanabilir yolla müteahhide bildirilir, süreler takvime işlenir.'],
    ],
    tags: ['kâğıthane', 'site yönetimi', 'apartman yönetimi', 'seyrantepe', 'cendere'],
  },
  {
    slug: 'bahcelievler', name: 'Bahçelievler', side: 'Avrupa', loc: "Bahçelievler'de",
    lead: "Bahçelievler, uzun yıllara yayılan apartman stoğu ve Yenibosna çevresindeki yeni projeleriyle yoğun bir yerleşimdir. Şirinevler, Siyavuşpaşa, Kocasinan ve Zafer gibi mahallelerde birbirine yakın, çok sayıda orta boy apartman bulunur. Bu dokuda yönetim, büyük site yönetiminden çok komşuluk ilişkisi ve düzenli kayıt meselesidir.",
    segments: [
      { h: 'Eski apartmanlarda asansör, tesisat ve cephe yenileme', p: "Yıllar önce yapılmış binalarda asansör, ortak tesisat ve cephe yenileme kararları gündeme gelir. Bu tür kararlarda keşif, çoklu teklif ve ödeme planı hazırlanması maliklerin kararını kolaylaştırır; karar nisabı için yönetim planı ve KMK hükümleri hukuk danışmanıyla kontrol edilmelidir." },
      { h: 'Komşuluk, kayıt ve şeffaflık', p: "Az daireli apartmanlarda kayıtlar çoğu zaman sözlü ve gayriresmî tutulur. Aylık gelir gider tablosunun herkese açık bir panoda veya mesajla paylaşılması, belgelerin düzenli saklanması ve karar defterinin güncel tutulması; yönetici değiştiğinde süreci kesintisiz sürdürmenin en düşük maliyetli yoludur." },
    ],
    rows: [
      ['Şirinevler', 'Yoğun apartman dokusu', 'Asansör, tesisat, aidat şeffaflığı'],
      ['Yenibosna', 'Eski apartmanlar ve yeni projeler', 'Yeni sitelerde ölçekli yönetim, eski binada bakım'],
      ['Siyavuşpaşa', 'Orta boy apartmanlar', 'Bina bakımı, ortak alan temizliği'],
      ['Kocasinan', 'Yoğun konut dokusu', 'Aidat takibi, asansör bakımı'],
      ['Zafer', 'Karma konut dokusu', 'Otopark ve sığınak kullanımı, güvenlik'],
    ],
    focus: { h: 'Sığınak ve ortak alanların kullanımı', p: "Eski apartmanlarda sığınak ve bodrum alanlarının nasıl kullanıldığı sık tartışma konusudur. Ortak alanların amacı dışında kullanımı, yönetim planı ve ilgili mevzuat çerçevesinde değerlendirilir; kira veya kullanım izni gibi kararlar için hukuki dayanağı önceden doğrulayın ve kararı yazılı alın." },
    faq: [
      ['Küçük apartmanda profesyonel yönetim gerekli mi?', 'Zorunlu değildir; ancak kayıt, hesap ve bakım takibi bir yöneticiyi aşıyorsa profesyonel destek düşünülebilir. Karar kat malikleri kurulunda alınır.'],
      ['Aidat artışına bazı malikler itiraz ediyor; ne yapılır?', 'Artışın dayanağı olan işletme projesini ve gider kalemlerini açıklayın; karar kurulda tartışılmalı ve karar defterine yazılmalıdır. İtiraz hakları için hukuk danışmanına başvurun.'],
    ],
    tags: ['bahçelievler', 'site yönetimi', 'apartman yönetimi', 'şirinevler', 'yenibosna'],
  },
  {
    slug: 'cekmekoy', name: 'Çekmeköy', side: 'Anadolu', loc: "Çekmeköy'de",
    lead: "Çekmeköy, Anadolu Yakası'nın kuzeyinde, orman ve havza komşuluğu olan, az katlı aile sitelerinin ve villa yerleşkelerinin öne çıktığı bir ilçedir. Taşdelen, Mimar Sinan, Çamlık, Ömerli ve Alemdağ gibi mahallelerde yeşil alan ve bahçe, yönetimin ana gündemlerini belirler: peyzaj, havuz, çevre güvenliği ve kış hazırlığı.",
    segments: [
      { h: 'Villa siteleri ve geniş bahçeler', p: "Bahçeli sitelerde budama, sulama ve çim bakımı mevsimlik bir takvime bağlanmalı ve bütçede ayrı kalem olarak gösterilmelidir. Hizmetin kapsamı, ekip sayısı ve rapor sıklığı sözleşmede yazılı olursa, sezon ortasında ek bütçe talebi sürpriz olmaz." },
      { h: 'Orman komşuluğu ve çevre güvenliği', p: "Orman kenarındaki sitelerde kuru dal ve çalı temizliği, yangın söndürme ekipmanının erişilebilirliği ve çevre aydınlatması önlemin parçalarıdır. Çevre güvenliği için kamera ve devriye düzeni yazılı bir plana bağlanmalı, görüntü kayıtlarında kişisel verilerin korunması ilkelerine uyulmalıdır." },
    ],
    rows: [
      ['Taşdelen', 'Villa ve az katlı siteler', 'Peyzaj, havuz, çevre güvenliği'],
      ['Mimar Sinan', 'Karma konut dokusu', 'Ortak alan bakımı, aidat takibi'],
      ['Çamlık', 'Bahçeli yerleşim', 'Peyzaj, kış hazırlığı'],
      ['Ömerli', 'Orman ve havza komşuluğu', 'Yangın önlemleri, çevre güvenliği'],
      ['Alemdağ', 'Orman kenarı konutlar', 'Kış bakımı, jeneratör ve yol erişimi'],
    ],
    focus: { h: 'Kış hazırlığı: kar, buzlanma ve elektrik kesintisi', p: "Orman kenarındaki sitelerde karlı günlerde yol açma, tuzlama ve buzlanma önlemi ile elektrik kesintisinde jeneratör devreye alma planı önceden yazılmalıdır. Jeneratörün aylık yük testi ve yakıt seviyesi kayıt altına alınır; kritik sistemlerin (hidrofor, asansör, kapı) hangi sırayla beslendiği tanımlanır." },
    faq: [
      ['Villa sitesinde peyzaj gideri nasıl planlanır?', 'Mevsimsel işleri takvime yayın, işletme projesinde ayrı kalem gösterin ve hizmet sözleşmesinde kapsam ile rapor sıklığını yazın.'],
      ['Orman kenarında yangın riskine karşı ne yapılmalı?', 'Kuru dal ve çalı temizliği, erişilebilir söndürme ekipmanı ve acil durum planı hazırlayın; güncel gereklilikleri ilgili itfaiye birimine teyit ettirin.'],
    ],
    tags: ['çekmeköy', 'site yönetimi', 'apartman yönetimi', 'taşdelen', 'villa sitesi'],
  },
];

export const EXTRAS_BATCH2: Record<string, GuideExtra> = {
  pendik: {
    segments: [
      { h: 'Ulaşım ve servis erişimi', p: "Geniş bir alana yayılan ilçede teknik servis, kargo ve ziyaretçi ulaşımı süre alabilir. Yönetim şirketiyle yapılan sözleşmede acil müdahale hedefinin hangi bölge için geçerli olduğu ve ulaşım süresinin nasıl hesaplandığı açık yazılmalıdır." },
      { h: 'Sosyal tesis ve etkinlik alanlarının kullanımı', p: "Havuz, spor ve toplantı alanlarının kullanım kuralları, rezervasyon sistemi ve misafir sınırı kurul kararıyla yazıya geçirilmezse her hafta yeniden tartışılır. Kuralların ilanı ve uygulanması yönetici ve görevli arasında net bir iş bölümüyle yürütülmelidir." },
    ],
    calendar: ['Ocak-Şubat: işletme projesi ve genel kurul hazırlığı', 'Nisan: peyzaj ve sulama sistemi hazırlığı, çatı ve oluk kontrolü', 'Haziran: havuz sezonu açılışı ve hijyen kontrolü', 'Ekim: kazan, jeneratör ve asansör bakımı'],
    question: 'Çok bloklu yerleşkelerde blok bazlı gider ayrımı ve raporlama yapılıyor mu?',
  },
  esenyurt: {
    segments: [
      { h: 'Genel kurul katılımı ve vekâlet', p: "Yüzlerce kat malikinin bulunduğu sitelerde toplantı yeter sayısını sağlamak başlı başına bir iştir. Çağrıyı yazılı ve ispatlanabilir yolla yapmak, vekâlet usulünü yönetim planında netleştirmek ve toplantıyı farklı saatlerde duyurmak katılımı artırır." },
      { h: 'Giriş çıkış ve otopark düzeni', p: "Kalabalık sitelerde giriş kontrolü, ziyaretçi kaydı, otopark kotası ve servis araçlarının düzeni için yazılı kural gerekir. Kayıt tutulurken yalnızca amaca gerekli bilgi toplanmalı, kayıtlar yetkisiz kişilerce görülemeyecek biçimde saklanmalıdır." },
    ],
    calendar: ['Ocak: işletme projesi ve bütçe', 'Mart: asansör ve hidrofor bakım kontrolü, yangın ekipmanı sayımı', 'Mayıs: çatı ve cephe kontrolü', 'Ekim: kazan ve jeneratör bakımı, kış hazırlığı'],
    question: 'Çok daireli sitelerde aidat tahsilatı için yazılı bir prosedür ve aylık borç raporu sunuluyor mu?',
  },
  kucukcekmece: {
    segments: [
      { h: 'Büyük sitelerde güvenlik ve çevre devriyesi', p: "Geniş çevre çitine sahip sitelerde güvenlik görevlilerinin devriye rotası, vardiya devri ve olay kayıtları yazılı bir düzene bağlanmalıdır. Güvenlik hizmeti 5188 sayılı Kanun kapsamında izinli ve lisanslı personelle verilmelidir." },
      { h: 'Ulaşım aksındaki yeni projeler', p: "Halkalı gibi ulaşım bağlantısı güçlü bölgelerde yeni projeler hızla teslim edilir. Yeni teslimlerde devir teslim belgeleri, ekipman garantileri ve abonelik kayıtları ilk haftalarda tamamlanmalıdır." },
    ],
    calendar: ['Ocak: işletme projesi ve genel kurul', 'Mart: cephe, balkon ve çatı kontrolü', 'Mayıs: havuz sezonu hazırlığı, filtre ve pompa bakımı', 'Kasım: kazan ve yangın sistemi bakımı'],
    question: 'Havuz ve sosyal tesis giderleri ayrı kalem olarak raporlanıyor ve hijyen kayıtları tutuluyor mu?',
  },
  kagithane: {
    segments: [
      { h: 'Ziyaretçi, kurye ve ticari bölüm trafiği', p: "Karma yapılarda ticari bölümlerin ziyaretçi ve kurye trafiği konut girişinden ayrı düzenlenmelidir. Giriş kuralları, çalışma saatleri ve yük asansörü kullanımı yazılı olmazsa konut sakinleriyle ticari kiracılar arasında sürekli sürtüşme çıkar." },
      { h: 'Vadi hattında su ve zemin kat riskleri', p: "Vadi ve dere hattına yakın yapılarda yağışlı günlerde zemin kat, otopark ve bodrumlarda su baskını riski izlenmelidir. Pompa, drenaj ve su yalıtımı kontrolleri yağış sezonu öncesi yapılmalı ve kayıt altına alınmalıdır." },
    ],
    calendar: ['Ocak: işletme projesi ve genel kurul gündemi', 'Mart: otopark ve zemin kat su baskını kontrolü', 'Mayıs: iklimlendirme ve havalandırma bakımı', 'Ekim: asansör muayene takvimi, yangın sistemi testi'],
    question: 'Konut ve ticari bölümler için ayrı gider takibi ve raporlama yapılıyor mu?',
  },
  bahcelievler: {
    segments: [
      { h: 'Yönetici bulmak ve görev dönüşümü', p: "Küçük apartmanlarda yöneticilik çoğu zaman gönüllü ve dönüşümlüdür. Görev değiştiğinde karar defteri, banka hesabı, sözleşmeler ve belge arşivinin tutanakla devredilmesi, geçmiş dönem tartışmalarının önüne geçer." },
      { h: 'Erişilebilirlik ve asansör sürekliliği', p: "Eski binalarda asansör arızası, yaşlı veya hareket kısıtlı sakinler için günlük yaşamı ciddi biçimde zorlaştırır. Acil durumda öncelik vermek için iletişim listesini güncel tutmak, bakım sözleşmesinde arıza müdahale hedefi yazmak ve rampa-korkuluk gibi erişilebilirlik iyileştirmelerini bütçeye almak faydalıdır." },
    ],
    calendar: ['Ocak: yıllık bütçe ve genel kurul', 'Nisan: çatı, oluk ve cephe kontrolü', 'Eylül: kalorifer/kazan bakımı ve yakıt hazırlığı', 'Kasım: asansör periyodik kontrol ve yıllık bakım raporu'],
    question: 'Küçük apartmanlar için sade, tek sayfalık aylık gelir-gider raporu sunuluyor mu?',
  },
  cekmekoy: {
    segments: [
      { h: 'Havuz ve açık alan hijyeni', p: "Açık havuzlarda yapraklar, polen ve yağışlı havadan kaynaklanan su kalitesi değişimleri sezon boyunca takip edilmelidir. Klor ve pH ölçümleri düzenli yapılmalı, kayıtlar tutulmalı, çocuk havuzları için ek özen gösterilmelidir." },
      { h: 'Aile siteleri için çocuk alanları ve güvenlik', p: "Çocuk oyun alanlarının zemini, ekipman bağlantıları ve çevre çitleri periyodik olarak kontrol edilmeli, bozulan ekipman hemen kullanım dışı bırakılmalıdır. Kuralların ve saatlerin ilan edilmesi kazaları azaltır." },
    ],
    calendar: ['Şubat: işletme projesi ve peyzaj sözleşmesi', 'Nisan: sulama sistemi ve budama takvimi', 'Mayıs: havuz sezon açılışı ve hijyen kontrolü', 'Kasım: kar, buzlanma ve jeneratör hazırlığı'],
    question: 'Bahçe, havuz ve çevre güvenliği hizmetlerinin kapsamı ve rapor sıklığı sözleşmede ayrı ayrı yazılı mı?',
  },
};

export const SCENARIOS_BATCH2: Record<string, [string, string][]> = {
  pendik: [
    ['Kurtköy\'deki çok bloklu yerleşkede bir bloğun asansör gideri tüm siteye yazılıyor; doğru mu?', 'Paylaşım ölçüsü yönetim planında yazılıdır. Planda bloğa özgü gider ayrımı varsa buna göre, yoksa KMK\'nın genel kuralına göre hareket edilir; uyuşmazlıkta plan maddesi ve tapu kayıtları incelenmelidir.'],
    ['Güzelyalı\'da denize yakın binada asansör ve pano korozyonu artıyor; ne yapılır?', 'Periyodik temizlik ve koruyucu bakımı bakım sözleşmesinde ayrı kalem yapın, pano ve makine dairesini yılda en az bir kez gözle kontrol edip tarihli kayıt tutun.'],
    ['Yenişehir\'deki yeni teslim sitede ortak alan sayaçları müteahhit adına kayıtlı; ne yapılmalı?', 'Aboneliklerin site yönetimi adına devri için müteahhitle ilgili işlemleri başlatın, ilk dönem fatura ve borç durumunu tutanakla belgeleyin.'],
    ['Kaynarca\'daki apartmanda aidat toplamak zorlaşıyor; hangi adımlar izlenir?', 'Yazılı hatırlatma ve ihtar adımlarını prosedüre bağlayın, KMK m.20 uyarınca gecikme tazminatı ve icra takibi yolunu gecikmeden işletin; süreçte avukat desteği alın.'],
  ],
  esenyurt: [
    ['Binlerce dairelik sitede genel kurul yeter sayısı sağlanamıyor; ne yapılır?', 'Çağrıyı yazılı ve ispatlanabilir yolla yapın, vekâlet usulünü yönetim planında netleştirin, ikinci toplantı koşulları için hukuki dayanağı önceden doğrulayın.'],
    ['Yüksek blokta hidrofor arızası sık tekrarlıyor; nasıl çözülür?', 'Arıza kayıtlarını tarihleriyle tutun, bakım sözleşmesinde yedek parça ve müdahale hedefini yazın, gerekirse eski ekipmanın yenilenmesi için keşif ve çoklu teklif toplayın.'],
    ['Akçaburgaz\'daki sitede otopark kavgaları artıyor; ne yapmalı?', 'Otopark kullanımı ve ziyaretçi park kurallarını kurul kararıyla yazıya geçirin, duyurun ve uygulamayı tutarlı yürütün.'],
    ['Aidat borcu biriken malik için hukuki süreç ne kadar sürer?', 'Süre itiraz durumuna göre değişir; KMK m.20 çerçevesinde icra takibi veya dava yolu seçilebilir. Kesin süre ve strateji için avukat görüşü alın.'],
  ],
  kucukcekmece: [
    ['Atakent\'teki sitede havuz giderleri bütçeyi zorluyor; nasıl şeffaflaştırılır?', 'İşletme projesinde havuz kalemini ayrı gösterin, kimyasal, enerji ve personel giderlerini aylık raporlayın ve büyük alımlarda çoklu teklif toplayın.'],
    ['Halkalı\'da yeni teslim sitede ilk yönetim nasıl kurulur?', 'Kat malikleri kurulunu toplayın, yönetici ve denetçi seçin, yönetim planını kontrol edin, devir teslim belgelerini tutanakla alın ve ilk işletme projesini hazırlayın.'],
    ['Sefaköy\'deki eski apartmanda asansör yenileme kararı çıkmıyor; ne yapılır?', 'Keşif ve çoklu teklifle maliyeti netleştirin, ödeme planını aylık avansa yayın ve gündemi yönetim planındaki nisaba göre yazılı kurula taşıyın.'],
    ['Küçükçekmece Gölü kıyısına yakın binada zemin kat nemi için ne yapılır?', 'Drenaj ve su yalıtımı kontrolünü yağış sezonu öncesi yapın, tespitleri fotoğraf ve tarihle kaydedin, kapsamlı onarım öncesi uzman görüşü alın.'],
  ],
  kagithane: [
    ['Seyrantepe\'deki karma kulede ofis ve konut giderleri nasıl ayrılır?', 'Alt sayaçlarla tüketimi ayırın, yönetim planında bölümlere göre paylaşım ölçüsünü netleştirin; gerekirse plan değişikliği için uygun nisapla karar alın.'],
    ['Çeliktepe\'deki dönüşümle yapılan yeni binada eksikler nasıl takip edilir?', 'Eksik listesini devir teslim tutanağına şerh edin, müteahhide yazılı ve ispatlanabilir yolla bildirin, süreleri takvime işleyin.'],
    ['Vadi hattındaki binada otoparkta su baskını riski için ne yapılır?', 'Pompa ve drenaj hattının bakımını yağış sezonu öncesine alın, çalışma testlerini kayda geçirin ve acil durum iletişim zincirini belirleyin.'],
    ['Plaza ve rezidans karışık binada gürültü ve çalışma saati şikâyeti çıktı; ne yapılır?', 'Çalışma saatlerini ve yük asansörü kullanımını kurul kararıyla yazıya geçirin, ticari kiracılara yazılı bildirin ve uygulamayı tutarlı izleyin.'],
  ],
  bahcelievler: [
    ['Şirinevler\'deki 12 daireli apartmanda asansör yenileme pahalı çıktı; nasıl planlanır?', 'Üç farklı firmadan keşif ve kalem kalem teklif alın, bütçeyi aylık avansa yayan bir ödeme planı çıkarın ve gündemi yönetim planındaki nisaba göre yazılı kurula taşıyın.'],
    ['Sığınak alanı bazı sakinlerce depo olarak kullanılıyor; ne yapılabilir?', 'Yönetim planı ve ilgili mevzuata göre kullanım kuralını belirleyin, kararı yazılı alın ve ilan edin; hukuki dayanağı önceden doğrulayın.'],
    ['Yönetici değişti, eski yönetici belge teslim etmiyor; ne yapılmalı?', 'Karar defteri, banka hesabı ve sözleşmelerin tutanakla devrini yazılı isteyin; teslim yapılmazsa hukuki yol için avukattan destek alın.'],
    ['Yenibosna\'daki yeni sitede aidat apartmandakinden yüksek; neden?', 'Ortak alan, güvenlik, havuz ve teknik sistem gibi hizmet kalemleri apartmana göre fazladır; işletme projesindeki kalem dökümüyle karşılaştırın.'],
  ],
  cekmekoy: [
    ['Taşdelen\'deki villa sitesinde peyzaj gideri her yıl artıyor; nasıl kontrol edilir?', 'Hizmet kapsamını ve ekip sayısını sözleşmede yazın, mevsimsel işleri takvime yayın ve aylık yapılan iş raporunu isteyin.'],
    ['Ömerli\'de orman kenarındaki sitede yangın riski için hangi önlemler alınır?', 'Kuru dal ve çalı temizliğini düzenli yapın, erişilebilir söndürme ekipmanı ve acil durum planı hazırlayın, güncel gereklilikleri itfaiye biriminden teyit ettirin.'],
    ['Alemdağ yolunda kar yağınca site girişi kapanıyor; ne yapılmalı?', 'Karla mücadele için yol açma ve tuzlama anlaşmasını önceden yapın, jeneratör ve acil iletişim planını kış öncesi test edin.'],
    ['Açık havuzda yaz ortasında su bulanıyor; neden olabilir?', 'Yaprak, polen, yoğun kullanım ve filtre yetersizliği olabilir; klor ve pH ölçümlerini kayıt altına alın, filtre ve pompa bakımını yapın ve gerekirse uzman firmadan destek alın.'],
  ],
};

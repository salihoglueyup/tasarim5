/**
 * İlçe rehberleri, üçüncü grup: Büyükçekmece, Gaziosmanpaşa, Sancaktepe, Avcılar, Tuzla, Zeytinburnu.
 * İlke aynı: nüfus, daire sayısı, "en büyük/lüks" gibi doğrulanamayan iddia yok; yalnızca mahalle adları,
 * yapı tipinin genel özellikleri ve KMK'nın genel hükümleri kullanılır.
 */
import type { GuideSpec, GuideExtra } from './districtGuidesBatch2';

export const SPECS_BATCH3: GuideSpec[] = [
  {
    slug: 'buyukcekmece', name: 'Büyükçekmece', side: 'Avrupa', loc: "Büyükçekmece'de",
    lead: "Büyükçekmece, Marmara kıyısı ile Büyükçekmece Gölü arasında uzanan, villa siteleri ile çok katlı konut alanlarını bir arada barındıran bir ilçedir. Alkent 2000 ve Mimaroba'da geniş parsel üzerindeki kapalı siteler, Kumburgaz ve Sinanoba'da deniz komşuluğu, Tepecik ve Ekinoba'da daha yoğun konut dokusu öne çıkar. Geniş arazi, nem ve mevsimsel kullanım yönetimin gündemini belirler.",
    segments: [
      { h: 'Geniş parselli villa siteleri: Alkent 2000 ve Mimaroba', p: "Çok sayıda villa ve ortak alan bulunan sitelerde çevre sınırı, iç yollar, peyzaj ve havuz birlikte yönetilir. Giderlerin hangi kalemden kimin payına düştüğü yönetim planında açık yazmalı; peyzaj, havuz ve güvenlik işletme projesinde ayrı kalemler olarak gösterilmelidir." },
      { h: 'Deniz ve göl komşuluğu: nem, tuz ve dış cephe', p: "Kumburgaz ve Mimaroba gibi kıyıya yakın bölgelerdeki binalarda nem ve tuzlu hava; dış cephe, balkon korkulukları, kapı mekanizmaları ve elektrik panolarını daha hızlı yıpratabilir. Dış cephe temizliği ve boyası, korozyon kontrolü ile birlikte yıllık bakım takvimine yazılmalı; işler yağış ve rüzgâr mevsimine göre planlanmalıdır." },
    ],
    rows: [
      ['Alkent 2000', 'Geniş parselli kapalı siteler ve villalar', 'Çevre güvenliği, peyzaj ve havuz giderlerinin ayrı kalemlerle izlenmesi'],
      ['Mimaroba', 'Site ve villa karışımı, deniz komşuluğu', 'Dış cephe ve nem bakımı, havuz hijyeni'],
      ['Sinanoba', 'Orta ölçekli siteler', 'Ortak alan bakımı, aidat takibi'],
      ['Kumburgaz', 'Sahile yakın konutlar', 'Tuz ve nem etkisi, mevsimsel kullanım düzeni'],
      ['Tepecik ve Ekinoba', 'Yoğun apartman dokusu', 'Asansör ve tesisat bakımı, aidat disiplini'],
    ],
    focus: { h: 'Mevsimsel kullanımın yoğun olduğu sitelerde aidat ve bakım', p: "Yaz aylarında kullanımın arttığı, kışın daha az kullanılan sitelerde havuz, peyzaj ve güvenlik giderleri mevsime göre dalgalanır. Giderleri yıl geneline yayan bir avans planı ve sezon öncesi hazırlık listesi, ani ek ödeme taleplerini azaltır." },
    faq: [
      ['Kıyıya yakın sitede dış cephe temizliği ve boyası ne sıklıkla yapılmalı?', 'Sıklık binanın yaşına, cephe malzemesine ve konumuna göre değişir; yıllık görsel kontrolle ihtiyaç tespit edilip bakım takvimine yazılır ve büyük işlerde çoklu teklif alınır.'],
      ['Villa sitesinde peyzaj ve havuz giderleri aidata nasıl yansıtılır?', 'İşletme projesinde bu kalemler ayrı gösterilir; paylaşım yönetim planındaki ölçüye göre yapılır. Plan belirsizse hukuk danışmanından görüş alın.'],
    ],
    tags: ['büyükçekmece', 'site yönetimi', 'apartman yönetimi', 'alkent 2000', 'mimaroba'],
  },
  {
    slug: 'gaziosmanpasa', name: 'Gaziosmanpaşa', side: 'Avrupa', loc: "Gaziosmanpaşa'da",
    lead: "Gaziosmanpaşa, kentsel dönüşümle yenilenen binaların ve yeni teslim edilen sitelerin eski yapı stokunun yanında yer aldığı bir ilçedir. Karadeniz, Barbaros Hayrettin Paşa, Fevzi Çakmak, Bağlarbaşı ve Yıldıztabya gibi mahallelerde yapı yaşı ve yönetim ihtiyacı birbirinden farklıdır. Yeni yönetimlerin kurulması ve ilk işletme projesinin hazırlanması ilçenin en sık gündemlerindendir.",
    segments: [
      { h: 'Kentsel dönüşüm sonrası ilk yönetim', p: "Yeni teslim edilen binalarda kat malikleri kurulunun toplanması, yönetici ve denetçi seçimi, devir teslim belgelerinin tutanakla alınması ve ilk işletme projesinin hazırlanması ilk haftaların işidir. 7579 sayılı Kanun sonrası onaylı proje yoksa yönetici en geç üç ay içinde geçici proje hazırlar; bu süreyi baştan takvime yazmak tartışmayı azaltır." },
      { h: 'Çok bloklu yeni sitelerde giriş, otopark ve teknik sistemler', p: "Plaka tanıma, turnike ve kamera sistemleri olan sitelerde kullanım kuralları, kayıt saklama süreleri ve arıza durumunda yapılacaklar yazılı olmalıdır. Hidrofor, asansör ve sığınak havalandırması için periyodik bakım sözleşmesi, garanti kapsamındaki ekipmanla karıştırılmamalıdır." },
    ],
    rows: [
      ['Merkez', 'Eski ve yeni yapıların karışımı', 'Eski bina bakımı, aidat takibi'],
      ['Karadeniz', 'Dönüşümle yenilenen bloklar', 'İlk yönetim kurulumu, devir teslim'],
      ['Barbaros Hayrettin Paşa', 'Yoğun konut dokusu', 'Asansör ve tesisat bakımı'],
      ['Fevzi Çakmak ve Bağlarbaşı', 'Orta yaşlı apartmanlar ve yeni siteler', 'Ortak alan düzeni, otopark kuralları'],
      ['Yıldıztabya', 'Karma konut dokusu', 'Teknik sistemlerin periyodik kontrolü, aidat disiplini'],
    ],
    focus: { h: 'Devir teslimde garanti ve belge arşivi', p: "Müteahhitten teslim alınan eksik listesi, ekipman garanti belgeleri, proje arşivi ve abonelik kayıtları ilk gün tutanakla alınmalı; arızalar yazılı ve ispatlanabilir yolla bildirilmelidir. Bu belgeler yönetim değişse bile sürekliliği sağlayan dosyadır." },
    faq: [
      ['Kentsel dönüşümle teslim edilen binada yönetici nasıl seçilir?', 'Kat malikleri kurulu toplanır, KMK m.34 çerçevesinde yönetici ve denetçi seçilir, devir teslim belgeleri tutanakla alınır ve ilk işletme projesi hazırlanır.'],
      ['Yeni sitede garanti kapsamındaki arızalar kime bildirilir?', 'Garanti süresi ve kapsamı devir teslim belgelerinde yazılıdır; arızalar müteahhide yazılı ve ispatlanabilir yolla bildirilir, süreler takvime işlenir.'],
    ],
    tags: ['gaziosmanpaşa', 'site yönetimi', 'apartman yönetimi', 'kentsel dönüşüm', 'yıldıztabya'],
  },
  {
    slug: 'sancaktepe', name: 'Sancaktepe', side: 'Anadolu', loc: "Sancaktepe'de",
    lead: "Sancaktepe, Samandıra ve Sarıgazi başta olmak üzere metro bağlantısı sonrası hızla büyüyen mahallelere ve çok bloklu yeni sitelere sahip bir ilçedir. Yenidoğan, Meclis, Eyüp Sultan ve Emek mahallelerinde de orta ve büyük ölçekli konut alanları bulunur. Çok bloklu yapılarda aidat takibi, teknik sistemler ve giriş çıkış düzeni yönetimin ana başlıklarıdır.",
    segments: [
      { h: 'Çok bloklu sitelerde bütçe ve aidat takibi', p: "Birden çok bloktan oluşan sitelerde ortak giderlerle bloğa özgü giderlerin ayrı gösterilmesi, aidat hesabının dayanağını güçlendirir. Aylık borç listesi, yazılı hatırlatma ve ihtar adımları önceden belirlenirse tahsilat süreci kişisel bir tartışma olmaktan çıkar; gecikme tazminatı ve icra yolu KMK m.20'ye göre yürür." },
      { h: 'Hidrofor, asansör ve yangın sistemleri', p: "Merkezi hidrofor, asansör ve yangın algılama sistemlerinin periyodik bakım ve test kayıtları tarih sırasıyla saklanmalıdır. Sistem yaşı arttıkça yedek parça ve revizyon giderleri belirginleşir; yıllara yayılan bir yenileme planı ani aidat artışını önler." },
    ],
    rows: [
      ['Samandıra', 'Çok bloklu yeni siteler ve eski apartmanlar', 'Ölçekli aidat takibi, teknik bakım'],
      ['Sarıgazi', 'Yoğun konut dokusu, metro çevresi', 'Otopark ve giriş düzeni, ortak alan temizliği'],
      ['Yenidoğan', 'Orta ölçekli apartman ve siteler', 'Asansör ve tesisat bakımı'],
      ['Meclis ve Emek', 'Karma konut dokusu', 'Aidat disiplini, güvenlik'],
      ['Eyüp Sultan', 'Yeni projeler ve sitelerin yoğunlaştığı alan', 'İlk yönetim kurulumu, devir teslim'],
    ],
    focus: { h: 'Giriş turnike ve plaka tanıma sistemlerinin kuralları', p: "Turnike ve plaka tanıma gibi sistemler kurulduğunda ziyaretçi, kurye ve servis araçları için yazılı kurallar belirlenmeli; kayıtlar kişisel verilerin korunması ilkelerine uygun saklanmalıdır. Arıza durumunda kapıların nasıl açılacağı ve kimin yetkili olduğu önceden netleştirilmelidir." },
    faq: [
      ['Çok bloklu sitede bloğa özgü giderler nasıl ayrılır?', 'İşletme projesinde ortak ve bloğa özgü giderler ayrı kalemler olarak gösterilir; paylaşım yönetim planındaki ölçüye göre belirlenir.'],
      ['Aidat borcu biriken maliklere ne yapılır?', 'Yazılı hatırlatma ve ihtar yapılır; ödeme olmazsa KMK m.20 çerçevesinde gecikme tazminatı ve icra takibi veya dava yoluna gidilebilir. Süreç için avukat desteği önerilir.'],
    ],
    tags: ['sancaktepe', 'site yönetimi', 'apartman yönetimi', 'samandıra', 'sarıgazi'],
  },
  {
    slug: 'avcilar', name: 'Avcılar', side: 'Avrupa', loc: "Avcılar'da",
    lead: "Avcılar, Marmara kıyısından üniversite çevresine uzanan yoğun bir yerleşimdir. Cihangir ve Merkez'de apartman ağırlıklı dokunun, Denizköşkler ve Ambarlı'da sahile yakın binaların, Tahtakale ve Firuzköy'de karma yapıların yönetimi farklı gündemler getirir. Kentsel dönüşümle yenilenen yapılar eski stokun yanında yer aldığından yapı güvenliği ve teknik altyapı bakımı öne çıkar.",
    segments: [
      { h: 'Kentsel dönüşüm sonrası teknik altyapı', p: "Yeni teslim edilen ve dönüşümle yenilenen yapılarda asansör, hidrofor, jeneratör ve yangın sistemlerinin garanti ve bakım kayıtları baştan düzenli kurulmalıdır. Eski binalarda ise ortak tesisat ve cephe yenileme kararları için keşif ve çoklu teklif alınıp ödeme planı hazırlanır." },
      { h: 'Sahile yakın binalarda korozyon: Denizköşkler ve Ambarlı', p: "Deniz etkisindeki binalarda asansör, panolar, kapı ve cephe elemanları korozyondan etkilenebilir. Yılda bir yapılan görsel kontrolün tarihli fotoğrafla kaydı ve koruyucu bakımın bakım sözleşmesinde ayrı satır olması, büyük onarım kararlarını daha sağlıklı verdirir." },
    ],
    rows: [
      ['Cihangir', 'Yoğun apartman dokusu ve üniversite çevresi', 'Kiracı yoğunluğu, asansör ve tesisat bakımı'],
      ['Denizköşkler', 'Sahile yakın apartman ve siteler', 'Korozyon ve nem bakımı'],
      ['Ambarlı', 'Sahil ve sanayiye komşu yapılar', 'Pano ve cephe koruması, güvenlik'],
      ['Tahtakale ve Firuzköy', 'Karma yapı dokusu', 'Aidat takibi, ortak alan düzeni'],
      ['Merkez', 'Eski ve yeni yapıların karışımı', 'Eski bina yenileme kararları'],
    ],
    focus: { h: 'Kiracı yoğunluğu ve duyuru düzeni', p: "Üniversite çevresi gibi kiracı oranı yüksek bölgelerde aidat ve ortak gider sorumluluğu kat malikine aittir; kiracıyla iletişim ise sözleşmeye göre yürür. Güncel bir iletişim listesi tutmak, duyuruların ve toplantı çağrılarının fiilen oturanlara da ulaşmasını sağlar." },
    faq: [
      ['Kiracının olduğu binada aidattan kim sorumludur?', 'Kanunda ortak gider yükümlülüğü kat malikine yöneliktir; kiracının ödemesi çoğunlukla kira sözleşmesine bağlıdır. Sözleşmedeki hükmü ve yönetime yapılan bildirimi kontrol edin.'],
      ['Sahile yakın binada asansör bakımı farklı mı olmalı?', 'Nem ve tuz nedeniyle pano ve makine dairesi kontrolü bakım formunda ayrı satır olarak izlenmeli; sıklık binaya göre bakım firmasıyla yazılı belirlenmelidir.'],
    ],
    tags: ['avcılar', 'site yönetimi', 'apartman yönetimi', 'denizköşkler', 'ambarlı'],
  },
  {
    slug: 'tuzla', name: 'Tuzla', side: 'Anadolu', loc: "Tuzla'da",
    lead: "Tuzla, Marmara kıyısındaki Mercan ve Postane'den İstasyon, Aydınlı ve Şifa'daki konut alanlarına, Tepeören'deki müstakil yerleşimlere ve tersane ile sanayi bölgelerine komşu mahallelere uzanan çok yönlü bir ilçedir. Sahil siteleri, villa yerleşkeleri ve sanayiye yakın apartmanlar aynı yönetim planıyla ele alınamaz.",
    segments: [
      { h: 'Sahil siteleri ve villa yerleşkeleri: Mercan ve Tepeören', p: "Villa ve bahçeli sitelerde peyzaj, havuz ve çevre güvenliği giderlerinin ayrı kalemlerle izlenmesi gerekir. Konsiyerj gibi hizmetler güvenlikten farklı bir iş tanımıdır; sözleşmede ayrı yazılmalı ve bütçede ayrı gösterilmelidir." },
      { h: 'Deniz etkisi ve sanayiye yakınlık', p: "Kıyıya yakın binalarda tuzlu hava ve nem korozyonu hızlandırabilir; sanayi bölgelerine komşu mahallelerde ise cephe ve cam temizliği ile havalandırma filtreleri daha sık bakım isteyebilir. İşler gözlemle belirlenip yıllık takvime yazılmalıdır." },
    ],
    rows: [
      ['Mercan', 'Sahil hattında siteler ve villalar', 'Korozyon bakımı, peyzaj ve havuz'],
      ['Postane', 'Karma konut dokusu', 'Ortak alan bakımı, aidat takibi'],
      ['Aydınlı', 'Orta ölçekli site ve apartmanlar', 'Teknik sistemlerin periyodik kontrolü'],
      ['İstasyon ve Şifa', 'Yoğun konut alanları', 'Asansör ve tesisat bakımı, güvenlik'],
      ['Tepeören', 'Müstakil ve villa yerleşkeleri', 'Çevre güvenliği, peyzaj ve kış hazırlığı'],
    ],
    focus: { h: 'Villa sitelerinde konsiyerj ve güvenlik hizmetini ayırmak', p: "Karşılama, paket kabulü ve misafir yönlendirmesi gibi konsiyerj işleri ile giriş kontrolü ve devriye gibi güvenlik işleri farklı görev tanımlarıdır. Her birinin saatleri, sorumlulukları ve gideri ayrı yazılırsa hizmet kalitesi de maliyeti de takip edilebilir olur." },
    faq: [
      ['Villa sitesinde konsiyerj ve güvenlik aynı sözleşmede olabilir mi?', 'Olabilir; ancak görev tanımları, çalışma saatleri ve gider kalemleri ayrı ayrı yazılmalıdır. Güvenlik hizmeti 5188 sayılı Kanun kapsamında izinli ve lisanslı personelle verilmelidir.'],
      ['Sanayiye komşu mahallede cephe ve cam bakımı sıklığı nasıl belirlenir?', 'Yıllık görsel kontrol ve önceki dönem kayıtlarına göre belirlenir; bakım takvimine yazılıp büyük işlerde çoklu teklif alınır.'],
    ],
    tags: ['tuzla', 'site yönetimi', 'apartman yönetimi', 'mercan', 'tepeören'],
  },
  {
    slug: 'zeytinburnu', name: 'Zeytinburnu', side: 'Avrupa', loc: "Zeytinburnu'nda",
    lead: "Zeytinburnu, Kazlıçeşme sahil hattındaki yüksek yapılardan Seyitnizam, Merkezefendi, Sümer ve Telsiz'deki yoğun konut alanlarına uzanan, tarihî surlara komşu bir ilçedir. Yüksek katlı karma yapılarda teknik sistemler ve ortak tesis işletmesi, eski apartmanlarda ise bakım ve aidat takibi yönetimin ana konularıdır.",
    segments: [
      { h: 'Yüksek katlı yapılarda teknik işletme ve ortak tesisler', p: "Kapalı havuz, spor ve sosyal alan bulunan yapılarda kullanım kuralları, çalışma saatleri ve hijyen kayıtları yazılı olmalıdır. Asansör, jeneratör ve iklimlendirme sistemlerinin bakım takvimi ile arıza kayıtları, aylık raporla kat maliklerine sunulmalıdır." },
      { h: 'Dış cephe ve cam temizliği, deniz etkisi', p: "Yüksek yapılarda cephe ve cam temizliği için erişim yöntemi ve iş güvenliği önlemleri sözleşmede açık yazılmalıdır. Sahile yakın yapılarda tuz ve nem; pano, kapı ve cephe elemanlarının bakım sıklığını etkileyebilir." },
    ],
    rows: [
      ['Kazlıçeşme', 'Sahil hattında yüksek ve karma kullanımlı yapılar', 'Teknik sistemler, ortak tesisler ve güvenlik'],
      ['Merkezefendi', 'Site ve rezidanslar ile apartmanlar', 'Ortak tesis hijyeni, aidat şeffaflığı'],
      ['Seyitnizam', 'Yoğun apartman dokusu', 'Asansör ve tesisat bakımı'],
      ['Sümer ve Telsiz', 'Karma konut dokusu', 'Aidat takibi, ortak alan temizliği'],
      ['Maltepe', 'Tarihî dokuya komşu konutlar', 'Eski bina bakımı, cephe yenileme kararları'],
    ],
    focus: { h: 'Rezidanslarda aylık raporlama', p: "Gelir-gider tablosu, bakım ve arıza kayıtları ile tahsilat durumunun aylık düzenli sunumu, kat maliklerinin ve kiracıların yönetime güvenini artırır. Raporun içeriğini sözleşmede önceden belirlemek, hangi bilginin kime açık olduğu tartışmasını da kapatır." },
    faq: [
      ['Kapalı havuz ve spor alanı olan yapıda hijyen kayıtları nasıl tutulmalı?', 'Ölçüm ve temizlik kayıtları tarihli ve imzalı tutulmalı, ilgili mevzuatın gerektirdiği kontroller bakım planına yazılmalıdır; güncel gereklilikleri ilgili kurumlardan teyit edin.'],
      ['Yüksek yapıda dış cephe cam temizliğinde nelere dikkat edilir?', 'Erişim yöntemi, iş güvenliği önlemleri ve sigorta/sorumluluk koşulları sözleşmede açık yazılmalı; çalışma saatleri sakinlere önceden duyurulmalıdır.'],
    ],
    tags: ['zeytinburnu', 'site yönetimi', 'apartman yönetimi', 'kazlıçeşme', 'merkezefendi'],
  },
];

export const EXTRAS_BATCH3: Record<string, GuideExtra> = {
  buyukcekmece: {
    segments: [
      { h: 'Yazlık ve ikinci konut kullanımı', p: "Kıyıya yakın sitelerde kullanımın yaz aylarında arttığı, kışın azaldığı durumlarda boş dairelerin ortak giderlere katılımı, kapalı dönemlerde bakım ve su kaçağı kontrolü gibi başlıklar gündeme gelir. Kat malikleriyle güncel iletişim bilgisinin tutulması, acil durumda ulaşmayı kolaylaştırır." },
      { h: 'Geniş bahçelerde yangın ve acil durum hazırlığı', p: "Kuru bitki örtüsü ve geniş bahçelerde yaz aylarında yangın riski artabilir. Söndürme ekipmanının erişilebilirliği, çevre aydınlatması ve acil durum telefon zinciri yazılı olmalı; güncel gereklilikleri ilgili itfaiye birimiyle teyit edin." },
    ],
    calendar: ['Şubat: işletme projesi ve peyzaj sözleşmesi', 'Nisan: sulama sistemi, çatı ve oluk kontrolü', 'Mayıs: havuz sezon açılışı ve hijyen kontrolü', 'Ekim: dış cephe ve korozyon kontrolü, kış hazırlığı'],
    question: 'Villa ve site için peyzaj, havuz ve güvenlik hizmetleri ayrı kalemlerle raporlanıyor mu?',
  },
  gaziosmanpasa: {
    segments: [
      { h: 'İşletme projesi ve genel kurul takvimi', p: "Yeni yönetimlerde işletme projesinin ne zaman hazırlanıp kurula sunulacağı, avans tutarlarının nasıl belirleneceği ve ilk genel kurulun ne zaman toplanacağı baştan takvime yazılmalıdır. Toplantı çağrısı yazılı ve ispatlanabilir yolla yapılmalıdır." },
      { h: 'Sığınak ve ortak alan kullanımı', p: "Yeni sitelerde sığınak, otopark ve çatı gibi ortak alanların kullanım kuralı yönetim planı ve kurul kararıyla yazıya geçirilmelidir. Ortak alanların amacı dışında kullanımı ve kiralanması için gerekli oy çoğunluğunu hukuk danışmanıyla önceden doğrulayın." },
    ],
    calendar: ['Ocak-Şubat: ilk yıl işletme projesi ve genel kurul', 'Nisan: garanti kapsamındaki ekipman kontrol listesi', 'Eylül: kazan ve yakıt sistemi hazırlığı', 'Kasım: asansör periyodik kontrol ve yıllık bakım raporu'],
    question: 'Yeni teslim sitelerde devir teslim ve garanti takibini kim, nasıl yürütüyor?',
  },
  sancaktepe: {
    segments: [
      { h: 'Metro çevresinde yoğunluk ve otopark', p: "Metro çevresindeki yeni konutlarda otopark kapasitesi, ziyaretçi parkı ve servis araçları için yazılı kurallar gerekir. Kuralların ilan edilmesi ve tutarlı uygulanması tartışmaları azaltır." },
      { h: 'Enerji giderlerinin izlenmesi', p: "Ortak alan aydınlatması, asansör ve hidrofor tüketimi büyük sitelerde önemli kalemdir. Aylık tüketimin önceki yılın aynı ayıyla karşılaştırılması ve olağan dışı artışların araştırılması küçük kaçakların büyümesini önler." },
    ],
    calendar: ['Ocak: işletme projesi ve bütçe', 'Mart: hidrofor ve asansör bakım kontrolü, yangın ekipmanı sayımı', 'Mayıs: çatı, cephe ve balkon kontrolü', 'Ekim: kazan ve jeneratör bakımı, kış hazırlığı'],
    question: 'Çok bloklu sitelerde blok bazlı gider ayrımı ve aylık borç raporu sunuluyor mu?',
  },
  avcilar: {
    segments: [
      { h: 'Eski binalarda yenileme kararları', p: "Asansör, ortak tesisat ve cephe yenilemelerinde keşif, çoklu teklif ve ödeme planı hazırlanıp gündem yönetim planındaki nisaba göre yazılı kurula taşınmalıdır. İhtiyaçları acil ve ertelenebilir diye ayırmak aidatta ani artışı önler." },
      { h: 'Yapı güvenliği ve kayıt düzeni', p: "Binanın ruhsat, proje ve bakım belgeleri düzenli arşivlenmeli; yönetim değişiminde tutanakla devredilmelidir. Yapıyla ilgili şüphe varsa yetkili kurumlara ve uzmanlara başvurulmalı, kararlar yazılı alınmalıdır." },
    ],
    calendar: ['Ocak: yıllık bütçe ve genel kurul', 'Nisan: çatı, oluk ve cephe kontrolü', 'Eylül: kalorifer/kazan bakımı ve yakıt hazırlığı', 'Kasım: asansör periyodik kontrol ve yıllık bakım raporu'],
    question: 'Sahile yakın binalar için korozyon kontrolü bakım sözleşmesinde ayrı satır olarak yazılı mı?',
  },
  tuzla: {
    segments: [
      { h: 'Müstakil yerleşkelerde kış hazırlığı', p: "Tepeören gibi müstakil yerleşimlerde kar, buzlanma ve elektrik kesintisine karşı jeneratör ve yol açma planı önceden yazılmalıdır. Jeneratörün aylık yük testi ve yakıt seviyesi kayıt altına alınmalıdır." },
      { h: 'Havuz ve peyzaj sezon takvimi', p: "Havuzun açılış ve kapanış işleri, filtre ve pompa bakımı ile peyzajın budama ve sulama takvimi mevsime göre yazılmalıdır. Hizmetin kapsamı, ekip sayısı ve rapor sıklığı sözleşmede belirtilirse sezon ortasında ek bütçe talebi sürpriz olmaz." },
    ],
    calendar: ['Şubat: işletme projesi ve peyzaj sözleşmesi', 'Nisan: sulama ve budama takvimi', 'Mayıs: havuz sezon açılışı ve hijyen kontrolü', 'Kasım: kar, buzlanma ve jeneratör hazırlığı'],
    question: 'Konsiyerj, güvenlik, bahçe ve havuz hizmetlerinin kapsamı ve rapor sıklığı ayrı ayrı yazılı mı?',
  },
  zeytinburnu: {
    segments: [
      { h: 'Concierge ve karşılama hizmeti', p: "Karşılama, paket kabulü, rezervasyon takibi ve misafir yönlendirmesi gibi işler güvenlikten farklı bir görev tanımıdır. Sözleşmede kapsamı, çalışma saatleri ve gizlilik yükümlülükleri ayrı yazılmalı, sakinlerin kişisel bilgileri yalnızca görev için kullanılmalıdır." },
      { h: 'Ortak tesis rezervasyonu ve kurallar', p: "Spor salonu, havuz ve toplantı alanı gibi tesislerde rezervasyon sistemi, misafir sınırı ve kullanım saatleri kurul kararıyla yazıya geçirilmezse her hafta yeniden tartışılır. Kuralların ilanı ve uygulanması net bir iş bölümüyle yürütülmelidir." },
    ],
    calendar: ['Ocak: işletme projesi ve genel kurul hazırlığı', 'Mart: asansör, jeneratör ve yangın sistemi kontrolü', 'Mayıs: iklimlendirme ve havalandırma bakımı', 'Ekim: asansör muayene takvimi, kış hazırlığı'],
    question: 'Rezidans için aylık gelir-gider, bakım ve arıza raporu düzenli sunuluyor mu?',
  },
};

export const SCENARIOS_BATCH3: Record<string, [string, string][]> = {
  buyukcekmece: [
    ['Alkent 2000\'deki villa sitesinde peyzaj gideri her yıl artıyor; nasıl kontrol edilir?', 'Hizmet kapsamını ve ekip sayısını sözleşmede yazın, mevsimsel işleri takvime yayın ve aylık yapılan iş raporunu isteyin.'],
    ['Kumburgaz\'daki sahil binasında balkon korkulukları paslanıyor; ne yapılmalı?', 'Korozyon kontrolünü yıllık bakım takvimine yazın, tespitleri fotoğraf ve tarihle kaydedin, büyük onarım için keşif ve çoklu teklif alın.'],
    ['Mimaroba\'daki sitede havuz giderleri bütçeyi zorluyor; nasıl şeffaflaştırılır?', 'İşletme projesinde havuz kalemini ayrı gösterin, kimyasal, enerji ve personel giderlerini aylık raporlayın.'],
    ['Yazın dolan, kışın boşalan sitede aidat dalgalanıyor; çözüm nedir?', 'Giderleri yıla yayan bir avans planı yapın ve sezon öncesi hazırlık listesini bütçeye yazın.'],
  ],
  gaziosmanpasa: [
    ['Kentsel dönüşümle teslim edilen binada ilk yönetim nasıl kurulur?', 'Kat malikleri kurulunu toplayıp yönetici ve denetçi seçin, devir teslim belgelerini tutanakla alın ve ilk işletme projesini hazırlayın.'],
    ['Onaylı işletme projesi yokken yönetici ne yapar?', '7579 sayılı Kanun sonrası yönetici geçici proje hazırlar ve en geç üç ay içinde kurula onaylatır; ayrıntılar için hukuk danışmanına başvurun.'],
    ['Yeni sitede otopark ve plaka tanıma kuralları tartışma yaratıyor; ne yapılır?', 'Kuralları kurul kararıyla yazıya geçirin, ziyaretçi park düzenini duyurun ve kayıtları kişisel veri ilkelerine uygun saklayın.'],
    ['Garanti kapsamındaki asansör arızası nasıl takip edilir?', 'Arızayı müteahhide yazılı ve ispatlanabilir yolla bildirin, süreleri takvime işleyin ve devir teslim belgelerindeki garanti şartlarına bakın.'],
  ],
  sancaktepe: [
    ['Samandıra\'daki çok bloklu sitede bir bloğun asansör gideri tüm siteye yazılıyor; doğru mu?', 'Paylaşım ölçüsü yönetim planında yazılıdır; plan bloğa özgü gider ayrımı içeriyorsa ona, içermiyorsa KMK\'nın genel kuralına göre hareket edilir.'],
    ['Sarıgazi\'de metro çevresindeki sitede otopark kavgaları artıyor; ne yapılır?', 'Otopark ve ziyaretçi park kurallarını kurul kararıyla yazıya geçirin, duyurun ve tutarlı uygulayın.'],
    ['Hidrofor arızaları tekrar ediyor; nasıl çözülür?', 'Arıza kayıtlarını tarihleriyle tutun, bakım sözleşmesinde yedek parça ve müdahale hedefini yazın, gerekirse yenileme için keşif ve çoklu teklif toplayın.'],
    ['Aidat borcu biriken malik için hangi adımlar izlenir?', 'Yazılı hatırlatma ve ihtar adımlarını prosedüre bağlayın; KMK m.20 uyarınca gecikme tazminatı ve icra takibi yolunu işletin, avukat desteği alın.'],
  ],
  avcilar: [
    ['Cihangir\'de kiracılı binada duyurular ulaşmıyor; ne yapılabilir?', 'Güncel malik ve oturan iletişim listesi tutun, çağrıları yazılı ve ispatlanabilir yolla yapın.'],
    ['Denizköşkler\'de asansör ve panolarda korozyon artıyor; ne yapmalı?', 'Periyodik temizlik ve koruyucu bakımı bakım sözleşmesinde ayrı kalem yapın, makine dairesini yılda en az bir kez gözle kontrol edip tarihli kayıt tutun.'],
    ['Eski binada cephe yenileme kararı çıkmıyor; nasıl ilerlenir?', 'Keşif ve çoklu teklifle maliyeti netleştirin, ödeme planını yıllara yayın ve gündemi yönetim planındaki nisaba göre yazılı kurula taşıyın.'],
    ['Yönetim değişti, belgeler teslim edilmedi; ne yapılmalı?', 'Karar defteri, banka hesabı ve sözleşmelerin tutanakla devrini yazılı isteyin; teslim yapılmazsa hukuki yol için avukattan destek alın.'],
  ],
  tuzla: [
    ['Mercan\'daki sitede konsiyerj ve güvenlik görevlisi görevleri karışıyor; çözüm nedir?', 'Görev tanımlarını, saatleri ve gider kalemlerini ayrı yazın; güvenlik hizmetini 5188 kapsamında izinli personelle sürdürün.'],
    ['Tepeören\'de kar yağınca yol kapanıyor; ne yapılmalı?', 'Karla mücadele ve tuzlama anlaşmasını önceden yapın, jeneratör ve acil iletişim planını kış öncesi test edin.'],
    ['Sahil hattında kapı ve pano korozyonu artıyor; ne yapılır?', 'Koruyucu bakımı bakım takvimine yazın, pano ve makine dairesini yılda en az bir kez kontrol edip kayıt tutun.'],
    ['Sanayiye komşu binada cam ve cephe çabuk kirleniyor; temizlik sıklığı nasıl belirlenir?', 'Önceki dönem kayıtlarına ve görsel kontrole göre sıklık belirleyin, takvime yazın ve büyük işlerde çoklu teklif alın.'],
  ],
  zeytinburnu: [
    ['Kazlıçeşme\'deki rezidansta ortak tesis rezervasyonları tartışma çıkarıyor; ne yapılır?', 'Rezervasyon sistemini, misafir sınırını ve saatleri kurul kararıyla yazıya geçirin ve ilan edin.'],
    ['Kapalı havuzun hijyen kayıtları nasıl tutulmalı?', 'Ölçüm ve temizlik kayıtlarını tarihli ve imzalı tutun, ilgili mevzuatın gerektirdiği kontrolleri bakım planına yazın.'],
    ['Merkezefendi\'deki eski apartmanda asansör yenileme pahalı çıktı; nasıl planlanır?', 'Üç farklı firmadan keşif ve kalem kalem teklif alın, bütçeyi aylık avansa yayan bir ödeme planı çıkarın ve gündemi yazılı kurula taşıyın.'],
    ['Yüksek yapıda cam temizliği sırasında sakinler rahatsız oluyor; ne yapılır?', 'Çalışma saatlerini sakinlere önceden duyurun, erişim yöntemini ve iş güvenliği önlemlerini sözleşmede yazın.'],
  ],
};

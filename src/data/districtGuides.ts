/**
 * İlçe rehberleri: her ilçe için tek, özgün Türkçe yazı (site/apartman yönetimi).
 * Yalnızca doğrulanmış veri kullanılır: ilçe verisi (src/data/districts), gerçek referanslar
 * (src/data/realReferences.ts), SLA hedefi (src/lib/facts.ts) ve KMK maddeleri (7579 sayılı Kanun sonrası).
 * En/ru/ar sürümleri çevrilene kadar noindex kalır (bkz. TR_ONLY_BLOG_SLUGS).
 */
import type { Post, PostBlock } from './posts';
import { REAL_REFERENCES } from './realReferences';
import { FACTS } from '@/lib/facts';
import { DISTRICT_SCENARIOS } from './districtGuideScenarios';

type Segment = { h: string; p: string };
type Spec = {
  slug: string;
  name: string;
  side: 'Anadolu' | 'Avrupa';
  /** "Kadıköy'de", "Üsküdar'da" gibi bulunma durumu ekli ad */
  loc: string;
  lead: string;
  segments: Segment[];
  rows: string[][];
  focus: Segment;
  faq: [string, string][];
  tags: string[];
};

const SPECS: Spec[] = [
  {
    slug: 'kadikoy', name: 'Kadıköy', side: 'Anadolu', loc: "Kadıköy'de",
    lead: "Kadıköy, Anadolu Yakası'nın en yoğun ve en çeşitli konut ilçelerinden biridir. Tek bir \"Kadıköy sitesi\" yoktur: Moda'da onlarca yıllık, az daireli apartmanlar; Caddebostan ve Suadiye'de havuzlu, kapalı otoparklı sahil siteleri; Bostancı'da konut ve ticaretin iç içe geçtiği karma yapılar; Göztepe'de eski ve yeni binaların yan yana durduğu bir doku görülür. Yönetimden beklenen şey de buna göre değişir.",
    segments: [
      { h: 'Eski apartmanlarda yönetim: Moda ve Göztepe', p: "Eski binalarda en sık gündem asansör, çatı, cephe ve ortak tesisat yenileme kararlarıdır. KMK'ya göre ortak giderler, yönetim planında başka bir yöntem yoksa kat malikleri arasında paylaştırılır; olağan giderler için yönetici avans toplar. Büyük yenilemelerde karar nisapları farklıdır; kararı genel kurula götürmeden önce yönetim planınızı ve gündemi hukuk danışmanıyla kontrol edin." },
      { h: 'Havuzlu siteler ve rezidanslar: Caddebostan, Suadiye, Fenerbahçe', p: "Sosyal donatısı fazla olan sitelerde bütçenin büyük kısmı güvenlik, temizlik, havuz ve teknik bakım kalemlerinde toplanır. İki sorun tekrar eder: giderlerin kalem kalem şeffaf gösterilmemesi ve hizmet sözleşmelerinin kapsamının belirsiz kalması. İyi bir işletme projesi bu kalemleri ayrı ayrı yazar; sözleşmede hizmetin kapsamı, raporlama sıklığı ve acil müdahale hedefi açıkça belirtilir." },
    ],
    rows: [
      ['Moda', 'Tarihi ve eski apartman stoğu', 'Bina bakımı, asansör ve tesisat yenileme kararları, az daireli yapılarda aidatın yeterliliği'],
      ['Caddebostan', 'Sahil hattında yüksek katlı siteler ve rezidanslar', 'Havuz, kapalı otopark, güvenlik hizmetlerinin bütçeye yansıması'],
      ['Fenerbahçe', 'Villa ve rezidans karışımı', 'Güvenlik, peyzaj ve ortak alan bakımı'],
      ['Göztepe', 'Eski ve yeni yapıların karışık olduğu konutlar', 'Eski binalarda teknik bakım, aidat takibi'],
      ['Bostancı', 'Konut ve ticaretin karıştığı hareketli bölge', 'Karma kullanımlı binalarda ortak giderlerin adil dağıtımı'],
    ],
    focus: { h: 'Karma kullanımlı binalarda gider paylaşımı', p: "Bostancı gibi zemin katında dükkân, üst katlarında konut bulunan binalarda ortak giderlerin paylaşımı sık tartışma çıkarır. Yönetim planı arsa payı, bağımsız bölüm sayısı veya kullanım biçimine göre farklı bir paylaşım öngörebilir; plan yoksa KMK'nın genel kuralı uygulanır. Paylaşım kuralını denemek için aidat paylaşım hesaplayıcısını kullanabilirsiniz." },
    faq: [
      ['Eski bir apartmanda profesyonel yönetime geçmek için ne gerekir?', 'Kat malikleri kurulunda KMK m.34\'teki çoğunlukla karar alınması ve şirketle yazılı sözleşme yapılması. Mevcut yönetimden demirbaş ve hesap devri tutanakla yapılır.'],
      ['Aidatını ödemeyen komşum için ne yapabiliriz?', 'Önce yazılı hatırlatma ve ihtar, ardından KMK m.20 çerçevesinde icra takibi veya dava yolu. Süreç borçlunun itirazına göre değişir; avukat desteği önerilir.'],
    ],
    tags: ['kadıköy', 'site yönetimi', 'apartman yönetimi', 'moda', 'caddebostan'],
  },
  {
    slug: 'atasehir', name: 'Ataşehir', side: 'Anadolu', loc: "Ataşehir'de",
    lead: "Ataşehir, İstanbul Finans Merkezi'ne ev sahipliği yapan, yüksek katlı rezidansların ve büyük kapalı sitelerin yoğunlaştığı bir ilçedir. Konut ve ofis çoğu zaman aynı bölgede, hatta aynı kompleksin içinde yer alır. Bu yapı, bütçenin kalem kalem izlenmesini ve teknik bakımın planlı yürütülmesini zorunlu kılar.",
    segments: [
      { h: 'Yüksek katlı rezidanslarda teknik işletme', p: "Çok katlı yapılarda asansör, jeneratör, yangın algılama ve iklimlendirme sistemleri bütçenin önemli bir bölümünü oluşturur. Bu sistemlerin periyodik bakımı yasal muayene takvimine ve üretici önerilerine göre planlanmalı, her bakım yazılı raporla kat maliklerine sunulmalıdır. Bakım sözleşmesinin kapsamı (parça dahil mi, acil çağrı dahil mi) önceden netleştirilmelidir." },
      { h: 'Büyük kapalı sitelerde aidat ve şeffaflık', p: "Yüzlerce bağımsız bölümü olan sitelerde aidat tahsilatı ve gecikmiş borçların takibi tek başına bir iş yüküdür. Dijital kayıt, aylık gelir-gider tablosu ve belgelerin yönetim kurulunun denetimine açık olması hem tartışmayı azaltır hem de genel kurulda hesap vermeyi kolaylaştırır." },
    ],
    rows: [
      ['Barbaros', 'Konut ve ofis karışık, kurumsal kiracı profili', 'Ofis-konut ortak gider ayrımı, teknik bakım'],
      ['Batı Ataşehir', 'Büyük ölçekli kapalı siteler', 'Geniş ortak alan, havuz, güvenlik'],
      ['Küçükbakkalköy', 'Orta-üst segment siteler', 'Aidat düzeni, teknik bakım servisleri'],
      ['İçerenköy', 'Villa ve site karışımı', 'Güvenlik ve akıllı bina sistemleri'],
      ['Ferhatpaşa', 'Orta ölçekli toplu konutlar', 'Düzenli bakım, enerji verimliliği, aidat şeffaflığı'],
    ],
    focus: { h: 'Ofis ve konutun birlikte bulunduğu projeler', p: "Karma kullanımlı projelerde konut ve ticari bölümlerin giderleri farklı işleyebilir: ofis katlarının asansör kullanımı, çalışma saatleri ve güvenlik ihtiyacı konuttan ayrışır. Yönetim planında bu ayrımın yazılı olması, sonradan çıkabilecek paylaşım uyuşmazlıklarını önler. Birden fazla yapıdan oluşan komplekslerde 7579 sayılı Kanun'la değişen m.70 kapsamında yönetim planı değişikliği için üçte iki çoğunluk aranır." },
    faq: [
      ['Ataşehir\'de rezidans yönetim şirketi seçerken neye bakmalı?', 'Teknik sistemlerin (asansör, jeneratör, yangın) bakım takvimine, raporlama sıklığına ve acil müdahale süresinin yazılı olup olmadığına. Sözleşmede kapsam kalem kalem yazılmalıdır.'],
      ['Ofis ve konut aynı komplekste ise aidat nasıl bölünür?', 'Yönetim planında aksi yazmıyorsa KMK\'daki genel paylaşım kuralı uygulanır. Karma projelerde plan değişikliği için hukuk danışmanından görüş alınması önerilir.'],
    ],
    tags: ['ataşehir', 'site yönetimi', 'rezidans yönetimi', 'finans merkezi'],
  },
  {
    slug: 'uskudar', name: 'Üsküdar', side: 'Anadolu', loc: "Üsküdar'da",
    lead: "Boğaz yamaçları, yalılar ve tarihi doku Üsküdar'a özgü bir konut yapısı kazandırır: Altunizade'de plaza ve rezidans, Acıbadem'de köklü aile siteleri, Çengelköy ve Kandilli'de Boğaz'a bakan yamaç yapıları, Kuzguncuk'ta tarihi dokunun içinde küçük apartmanlar. Eğimli arazi, nem ve eski yapı stoğu yönetimde ayrı bir dikkat gerektirir.",
    segments: [
      { h: 'Eğimli arazide teknik altyapı', p: "Yamaçtaki sitelerde hidrofor basıncı, drenaj ve istinat yapıları sıradan sitelerden daha fazla izlenmelidir. Boğaz'a yakın yapılarda nem ve tuzlu hava metal aksamda korozyonu hızlandırabilir; cephe, balkon korkulukları ve asansör aksamı için periyodik kontrol planı yapmak uzun vadede onarım maliyetini düşürür." },
      { h: 'Tarihi doku ve butik binalarda yönetim', p: "Kuzguncuk ve Kandilli gibi bölgelerde az daireli ve eski binalar çoğunluktadır. Böyle yapılarda cephe veya çatı kararlarında koruma mevzuatının getirdiği izin süreçleri devreye girebilir; karar almadan önce ilgili belediye ve koruma kurulu şartlarının araştırılması gerekir." },
    ],
    rows: [
      ['Acıbadem', 'Köklü aile siteleri, merkezi konum', 'Teknik bakım, düzenli aidat'],
      ['Altunizade', 'Plaza ve rezidans karışımı', 'Enerji verimliliği, güvenlik'],
      ['Kuzguncuk', 'Tarihi doku, butik apartmanlar', 'Koruma şartları, bina bakımı'],
      ['Çengelköy', 'Sahil hattı ve yamaç siteleri', 'Peyzaj, havuz, çevre güvenliği'],
      ['Kısıklı ve Kandilli', 'Villa ve yalı dokusu, koru komşuluğu', 'Bahçe bakımı, güvenlik'],
    ],
    focus: { h: 'Büyük onarımlarda karar nisabı', p: "Çatı, cephe veya istinat duvarı gibi büyük onarımlarda kararın hangi çoğunlukla alınacağı yapının niteliğine ve yönetim planına bağlıdır. Genel kural olarak yönetim planı değişikliği için KMK m.28/3 uyarınca beşte dört oy gerekir; birden fazla yapıdan oluşan toplu yapılarda 7579 sayılı Kanun'la değişen m.70 uyarınca üçte iki aranır. Kararı almadan önce gündem maddesinin hukuken doğru yazıldığından emin olun." },
    faq: [
      ['Yamaçtaki sitelerde en sık ne ihmal edilir?', 'Drenaj ve istinat yapılarının düzenli kontrolü; arıza oluşana kadar bütçeye girmeyebilir. İşletme projesinde periyodik kontrol için kalem ayırmak faydalıdır.'],
      ['Tarihi binada cephe boyatmak için izin gerekir mi?', 'Bina koruma altındaysa cephe müdahaleleri için ilgili kurul ve belediyeden izin gerekebilir. İşe başlamadan önce yetkili kurumdan teyit alın.'],
    ],
    tags: ['üsküdar', 'site yönetimi', 'apartman yönetimi', 'çengelköy', 'altunizade'],
  },
  {
    slug: 'maltepe', name: 'Maltepe', side: 'Anadolu', loc: "Maltepe'de",
    lead: "Maltepe, sahil dolgu alanı, Dragos ve Süreyyapaşa sırtlarındaki projeleriyle Anadolu Yakası'nın hızla gelişen konut aksıdır. Küçükyalı'dan Dragos'a uzanan hatta deniz etkisi, rüzgâr ve geniş sosyal alanlar yönetim bütçesini şekillendirir; Cevizli ve Altayçeşme'de ise daha çok yoğun aile siteleri ve yüksek katlı karma yapılar öne çıkar.",
    segments: [
      { h: 'Sahil hattında deniz etkisi', p: "Sahile yakın yapılarda tuzlu nem asansör, kapı, korkuluk ve dış cephe aksamında korozyonu hızlandırabilir. Bu yapılarda bakım takvimi, boya ve koruyucu işlemleri önceden planlamak; asansör ve elektrik panolarında periyodik temizlik ve kontrolü sözleşmeye yazmak yararlıdır." },
      { h: 'Kentsel dönüşümle yenilenen binalar', p: "Bağlarbaşı gibi bölgelerde yeni teslim edilen binalarda ilk yönetim kurulumu belirleyicidir: yönetim planının tapuya uygun olması, devir teslim tutanakları, garanti kapsamındaki ekipmanın listesi ve ilk işletme projesinin hazırlanması yeni sitelerin ilk yılında bütçeyi dengede tutar." },
    ],
    rows: [
      ['Küçükyalı', 'Sahil şeridi, butik siteler', 'Peyzaj, deniz etkisi bakımı'],
      ['Cevizli', 'E-5 aksında yüksek katlı karma yapılar', 'Güvenlik, asansör, ticari-konut gider ayrımı'],
      ['Altayçeşme', 'Aile siteleri', 'Düzenli bütçe, asansör bakımı'],
      ['Bağlarbaşı', 'Kentsel dönüşümle yenilenen apartmanlar', 'İlk yönetim kurulumu, aidat takibi'],
      ['Dragos', 'Villa ve sahil konutları', 'Güvenlik, özel peyzaj'],
    ],
    focus: { h: 'Yeni teslim edilen sitede ilk yıl', p: "İlk yıl işletme projesi 7579 sayılı Kanun'la değişen KMK m.37 kapsamında kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç üç ay içinde geçici proje hazırlar. Devir teslimde müteahhitten teslim alınan belgeler (as-built projeler, garanti belgeleri, sayaç kayıtları) bir listeyle kayda geçirilmelidir." },
    faq: [
      ['Yeni siteyi müteahhitten devralırken ne istenmeli?', 'Yönetim planı, onaylı projeler, ekipman garanti belgeleri, sayaç ve abonelik kayıtları ve ortak alanların tutanaklı teslimi. Eksikler tutanağa şerh düşülerek yazılmalıdır.'],
      ['Sahil sitelerinde asansör bakımı sıklığı nasıl belirlenir?', 'Yasal periyodik muayeneye ek olarak bakım firmasının önerisi ve cihaz yaşına göre. Sözleşmede aylık bakım ve arıza müdahalesi ayrı yazılmalıdır.'],
    ],
    tags: ['maltepe', 'site yönetimi', 'apartman yönetimi', 'dragos', 'küçükyalı'],
  },
  {
    slug: 'kartal', name: 'Kartal', side: 'Anadolu', loc: "Kartal'da",
    lead: "Kartal, kentsel dönüşümün yoğun yaşandığı ilçelerden biridir: eski apartman stokunun bir bölümü yerini yeni sitelere bırakmakta, sahil ve metro hattı çevresinde büyük projeler yükselmektedir. Soğanlık ve Uğur Mumcu'da planlı toplu konutlar, Yakacık ve Orhantepe'de daha sakin aile bölgeleri bulunur.",
    segments: [
      { h: 'Dönüşüm sonrası yeni yönetimler', p: "Dönüşümle teslim edilen binalarda maliklerin çoğu ilk kez ortak bir yönetim içinde yer alır. Kat malikleri kurulunun toplanması, yöneticinin seçilmesi, yönetim planının tapuya şerhi ve ilk yıl bütçesinin hazırlanması kısa sürede yapılmalıdır; aksi halde ortak giderler plansız toplanır ve tartışma kaçınılmaz olur." },
      { h: 'Büyük sitelerde aidat disiplini', p: "Yüzlerce daireli sitelerde birkaç malikin geciken borcu bile nakit akışını bozabilir. KMK m.20 uyarınca gider ve avans payını ödemeyen kat malikinden aylık yüzde beş gecikme tazminatı istenebilir; yönetici veya diğer malikler dava veya icra yoluna başvurabilir. Hatırlatma, ihtar ve takip adımlarının yazılı bir prosedüre bağlanması sürecin kişiselleşmesini önler." },
    ],
    rows: [
      ['Soğanlık', 'Metro çevresinde büyük siteler', 'Aidat optimizasyonu, ortak alan bakımı'],
      ['Yakacık', 'Orman ve deniz manzaralı siteler', 'Peyzaj, çevre güvenliği'],
      ['Cevizli', 'Karma ticaret ve rezidans', 'Ticari-konut gider ayrımı, teknik bakım'],
      ['Uğur Mumcu', 'Planlı toplu konut', 'Geniş ortak alan, aidat tahsilatı'],
      ['Orhantepe', 'Sahil bandı, deniz manzaralı binalar', 'Asansör, cephe ve korozyon bakımı'],
    ],
    focus: { h: 'Yönetim planı ve toplu yapılar', p: "Birden fazla yapıdan oluşan toplu yapılarda yönetim planı değişikliği için 7579 sayılı Kanun'la değişen KMK m.70 uyarınca üçte iki oy aranır; tek yapılarda ise m.28/3 uyarınca beşte dört. Kartal'daki büyük projelerde hangi hükmün uygulanacağı sitenin tapu ve plan yapısına göre belirlenir." },
    faq: [
      ['Dönüşümle yeni teslim alınan binada ilk adım nedir?', 'Kat malikleri kurulunu toplayıp yönetici seçmek, yönetim planını kontrol etmek ve ilk yıl işletme projesini hazırlamak. Devir teslim tutanakları saklanmalıdır.'],
      ['Gecikme tazminatı otomatik işler mi?', 'KMK m.20 aylık yüzde beş gecikme tazminatını öngörür; uygulama için yönetimin talep etmesi ve gerekirse hukuki yola başvurması gerekir. Somut durum için avukata danışılmalıdır.'],
    ],
    tags: ['kartal', 'site yönetimi', 'apartman yönetimi', 'kentsel dönüşüm', 'soğanlık'],
  },
  {
    slug: 'umraniye', name: 'Ümraniye', side: 'Anadolu', loc: "Ümraniye'de",
    lead: "Ümraniye, İstanbul Finans Merkezi'ne komşu konumu, metro hatları ve çok bloklu büyük siteleriyle Anadolu Yakası'nın nüfusu en yüksek ilçelerinden biridir. Çakmak, Atatürk ve İnkılap mahallelerinde yoğun konut stoku; Finanskent çevresinde ise kule ve rezidans projeleri öne çıkar. Ölçek büyüdükçe bütçe disiplini ve düzenli raporlama önem kazanır.",
    segments: [
      { h: 'Çok bloklu sitelerde ölçek sorunu', p: "Birden fazla bloktan oluşan sitelerde ortak gider kalemleri (güvenlik, temizlik, peyzaj, otopark) bloklar arasında paylaşılır; blok bazlı giderler ise ayrıca izlenmelidir. Gider tablosunda hangi kalemin tüm siteyi, hangisinin yalnızca tek bloğu ilgilendirdiğini ayırmak, itirazları baştan önler." },
      { h: 'Otopark ve giriş kontrolü', p: "Yoğun nüfuslu sitelerde otopark düzeni ve ziyaretçi girişi en çok şikâyet konusudur. Kural ve ücretlendirme yönetim planında ve genel kurul kararında yazılı olmalı; güvenlik hizmeti alınıyorsa 5188 sayılı Kanun kapsamında izinli ve lisanslı personelle yürütülmelidir." },
    ],
    rows: [
      ['Çakmak', 'Metro çevresinde çok bloklu siteler', 'Blok bazlı gider ayrımı, şeffaf aidat'],
      ['Atatürk', 'Merkezi, yoğun konut stoku', 'Asansör denetimi, teknik bakım'],
      ['Tepeüstü', 'AVM aksında karma yapılar', 'Güvenlik, otopark'],
      ['İnkılap', 'Kentsel dönüşümle yapılan siteler', 'İlk yönetim kurulumu, otopark kontrolü'],
      ['Finanskent', 'Finans merkezi çevresinde kule ve rezidanslar', 'Kurumsal standartta teknik işletme'],
    ],
    focus: { h: 'Genel kurulda katılım ve karar', p: "Büyük sitelerde genel kurul toplantı yeter sayısı ve karar sayısı sık sorun olur. KMK m.34'e göre yönetici, kat maliklerinin hem sayı hem arsa payı bakımından çoğunluğuyla seçilir. Toplantıya katılamayan malikler için vekâlet düzenini ve çağrı usulünü önceden planlamak, kararların sonradan iptal edilme riskini azaltır." },
    faq: [
      ['Ümraniye\'de çok bloklu sitede gider paylaşımı nasıl yapılır?', 'Yönetim planında aksi yazmıyorsa genel kural uygulanır. Blok bazlı kalemleri ayrı izlemek ve işletme projesinde göstermek uyuşmazlığı azaltır.'],
      ['Otopark ücreti genel kurul kararıyla belirlenebilir mi?', 'Yönetim planı ve kat malikleri kurulu kararı çerçevesinde belirlenebilir. Uygulamanın hukuka uygunluğu için yönetim planınızı kontrol edin.'],
    ],
    tags: ['ümraniye', 'site yönetimi', 'apartman yönetimi', 'finanskent'],
  },
  {
    slug: 'besiktas', name: 'Beşiktaş', side: 'Avrupa', loc: "Beşiktaş'ta",
    lead: "Beşiktaş; Etiler, Levent, Bebek, Ortaköy ve Ulus gibi birbirinden çok farklı yerleşimlerden oluşur. Boğaz kıyısındaki tarihi yalı ve butik binalardan Levent'in kurumsal kulelerine, Etiler'in rezidanslarından Ulus'un bahçeli sitelerine uzanan bu çeşitlilik, tek tip bir yönetim yaklaşımının işe yaramadığını gösterir.",
    segments: [
      { h: 'Boğaz hattı ve tarihi binalar', p: "Bebek, Ortaköy ve Arnavutköy çevresinde eski ve az daireli yapılar çoğunluktadır. Eğimli arazi, nem ve tarihi doku, cephe ve çatı kararlarında dikkat gerektirir; koruma altındaki binalarda müdahale öncesi ilgili kurum izinleri araştırılmalıdır." },
      { h: 'Rezidans ve kule yönetimi: Etiler ve Levent', p: "Yüksek değerli mülklerde kat malikleri hizmet kalitesini, raporlamayı ve harcama izlenebilirliğini yakından takip eder. Concierge, güvenlik, temizlik ve teknik bakım kalemlerini açık bir hizmet tanımı ve ölçülebilir göstergelerle sözleşmeye bağlamak, bütçe tartışmalarını somut verilere taşır." },
    ],
    rows: [
      ['Etiler', 'Rezidanslar ve prestijli siteler', 'Güvenlik, concierge, ortak alan standardı'],
      ['Levent', 'Kurumsal kuleler ve rezidanslar', 'Enerji, teknik bakım, kurumsal kiracı hizmetleri'],
      ['Bebek', 'Boğaz kıyısı, tarihi ve butik binalar', 'Koruma şartları, nem ve cephe bakımı'],
      ['Ortaköy', 'Karma kullanım, yoğun ziyaretçi', 'Güvenlik, ortak alan temizliği'],
      ['Ulus', 'Bahçeli siteler ve villa alanları', 'Peyzaj, havuz, güvenlik'],
    ],
    focus: { h: 'Yüksek aidatlı sitelerde şeffaflık', p: "Aidat tutarı yükseldikçe maliklerin gider kalemlerini sorgulaması doğaldır. KMK m.37 uyarınca işletme projesi kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç üç ay içinde geçici proje hazırlar ve mevcut projesi olan sitelerde geçici proje bedeli bir önceki yılın yeniden değerleme oranını aşamaz. Bu çerçevenin gider planına yansıtılması yönetimi güçlendirir." },
    faq: [
      ['Lüks rezidansta yönetim şirketinden ne beklenmeli?', 'Kalem kalem hizmet tanımı, aylık gelir-gider raporu, bakım takvimi ve yazılı acil müdahale hedefi. Beklentiler sözleşmeye yazılmalıdır.'],
      ['Yalı veya tarihi binada ortak bakım nasıl planlanır?', 'Koruma şartlarına uygun uzman teklifleriyle, işletme projesinde ayrı bir bakım kalemi oluşturarak. Büyük kararlar için nisaplar hukuk danışmanıyla kontrol edilmelidir.'],
    ],
    tags: ['beşiktaş', 'site yönetimi', 'rezidans yönetimi', 'etiler', 'levent'],
  },
  {
    slug: 'sisli', name: 'Şişli', side: 'Avrupa', loc: "Şişli'de",
    lead: "Şişli, iş dünyası ile konutun iç içe geçtiği bir ilçedir. Mecidiyeköy'de plazalar ve ofis rezidansları, Nişantaşı ve Teşvikiye'de eski ve prestijli apartmanlar, Fulya ve Bomonti'de yeni rezidans projeleri bulunur. Ticari yoğunluk güvenlik, otopark ve ziyaretçi yönetimini konut sitelerinden farklı bir noktaya taşır.",
    segments: [
      { h: 'Plaza-rezidans karma binalar', p: "Aynı yapıda ofis ve konut bulunduğunda giriş-çıkış düzeni, ziyaretçi kontrolü ve çalışma saatleri dışı kullanım ayrı kurallara bağlanmalıdır. Ortak giderlerin konut ve ticari bölümler arasındaki dağılımı yönetim planında açıkça yazılmalı; asansör, güvenlik ve temizlik gibi kalemlerde kullanım yoğunluğu farkı tartışma konusu olabilir." },
      { h: 'Nişantaşı ve Teşvikiye: eski prestijli apartmanlar', p: "Değerli ama eski yapılarda asansör yenileme, çatı ve cephe işleri sık gündeme gelir. Bu işler pahalı olduğundan keşif, birden fazla teklif ve yazılı genel kurul kararıyla ilerlemek, bütçeyi korur." },
    ],
    rows: [
      ['Mecidiyeköy', 'Plazalar ve ofis rezidansları', 'Bina otomasyonu, ziyaretçi kontrolü'],
      ['Nişantaşı', 'Prestijli eski apartmanlar, butik rezidanslar', 'Değer koruyucu bakım, ortak alan standardı'],
      ['Fulya', 'Yeni rezidans ve karma projeler', 'Ticari-konut gider ayrımı'],
      ['Bomonti', 'Dönüşüm sonrası rezidanslar', 'İlk işletme projesi, teknik bakım'],
      ['Esentepe', 'Ofis kuleleri ve çevre siteler', 'Enerji, güvenlik'],
    ],
    focus: { h: 'Karma yapıda yönetim planı', p: "Konut ve ticari bölümlerin birlikte bulunduğu binalarda yönetim planının kapsamlı olması önem taşır. Plan değişikliği tek yapıda KMK m.28/3 uyarınca beşte dört; birden fazla yapıdan oluşan toplu yapılarda 7579 sayılı Kanun'la değişen m.70 uyarınca üçte iki çoğunlukla yapılır. Hangi hükmün uygulanacağını tapu ve proje yapısı belirler." },
    faq: [
      ['Plaza ve rezidansta güvenlik hizmeti nasıl alınmalı?', 'Hizmet 5188 sayılı Kanun kapsamında izinli ve lisanslı personelle verilmeli; sözleşmede vardiya, devriye ve raporlama yazılı olmalıdır.'],
      ['Eski apartmanda asansör yenilemesi için hangi karar gerekir?', 'Karar nisabı yönetim planına ve işin niteliğine bağlıdır. Gündem maddesini yazarken hukuk danışmanından görüş almak yararlıdır.'],
    ],
    tags: ['şişli', 'site yönetimi', 'plaza yönetimi', 'nişantaşı', 'mecidiyeköy'],
  },
  {
    slug: 'sariyer', name: 'Sarıyer', side: 'Avrupa', loc: "Sarıyer'de",
    lead: "Sarıyer; Maslak'ın kurumsal kulelerinden Zekeriyaköy'ün orman çevresindeki villa sitelerine, Tarabya ve Yeniköy'ün Boğaz yapılarından İstinye'nin rezidanslarına uzanan çok geniş bir yelpazeye sahiptir. İlçenin büyük bölümü yeşil alanla çevrili olduğu için peyzaj, havuz ve çevre güvenliği öne çıkar.",
    segments: [
      { h: 'Orman çevresindeki villa siteleri', p: "Zekeriyaköy ve Bahçeköy gibi bölgelerde geniş bahçeli, düşük yoğunluklu sitelerde peyzaj, sulama, havuz ve çevre güvenliği bütçenin ana kalemleridir. Mevsime bağlı işleri (havuz sezonu, budama, sulama) bütçeye yıla yayarak planlamak ani aidat artışlarını önler." },
      { h: 'Maslak ve kurumsal yapılar', p: "Yüksek katlı ve karma kullanımlı yapılarda teknik sistemlerin envanteri tutulmalı, bakım takvimi yazılı olmalıdır. Kurumsal kiracıların bulunduğu binalarda raporlama ve hizmet seviyesi beklentisi daha yüksektir; bu nedenle hizmet tanımı ölçülebilir olmalıdır." },
    ],
    rows: [
      ['Maslak', 'Kurumsal kuleler ve rezidanslar', 'Enerji verimliliği, teknik işletme'],
      ['Tarabya ve Yeniköy', 'Boğaz kıyısı, yalı ve butik konutlar', 'Nem ve cephe bakımı, koruma şartları'],
      ['İstinye', 'Rezidanslar, AVM çevresi', 'Güvenlik, ortak alan standardı'],
      ['Zekeriyaköy', 'Orman çevresinde villa siteleri', 'Peyzaj, havuz, çevre güvenliği'],
      ['Bahçeköy', 'Orman komşuluğunda konutlar', 'Peyzaj, güvenlik devriyesi'],
    ],
    focus: { h: 'Elektrik, su ve doğal gaz abonelikleri', p: "Sarıyer Avrupa Yakası'nda olduğundan elektrik dağıtımı BEDAŞ, su ve kanalizasyon İSKİ, doğal gaz İGDAŞ üzerinden yürür. Müstakil villa sitelerinde ortak alan sayaçlarının (aydınlatma, sulama, havuz) abonelik sahibi ve tarifesi ayrıca kontrol edilmelidir; yönetim devrinde bu kayıtların güncel yönetici adına geçmesi ve eski borç durumunun tutanakla ortaya konması gerekir." },
    faq: [
      ['Villa sitelerinde aidat neye göre hesaplanır?', 'Yönetim planında aksi yazmıyorsa genel kural uygulanır; geniş bahçe, havuz ve güvenlik kalemleri işletme projesinde ayrı gösterilmelidir.'],
      ['Havuz bakımı yıl boyu bütçeye alınmalı mı?', 'Sezonluk işlerin yıla yayılması bütçe dengesi için önerilir; kış bakımı ve sezon açılışı ayrı kalemler olarak yazılabilir.'],
    ],
    tags: ['sarıyer', 'site yönetimi', 'villa sitesi yönetimi', 'maslak', 'zekeriyaköy'],
  },
  {
    slug: 'bakirkoy', name: 'Bakırköy', side: 'Avrupa', loc: "Bakırköy'de",
    lead: "Bakırköy; Ataköy'ün planlı sahil kuleleri ve etapları, Florya'nın bahçeli konutları, Yeşilköy'ün sahil dokusu ve Şenlikköy'ün modern sitelerinden oluşan, köklü ve planlı bir yerleşimdir. Marmara kıyısına yakın olması deniz etkisine bağlı bakım ihtiyaçlarını, eski sitelerin çokluğu ise yenileme kararlarını gündeme getirir.",
    segments: [
      { h: 'Ataköy: etaplı büyük yerleşim', p: "Etap bazlı planlanan yerleşimlerde her etabın kendi yönetimi ve bazı ortak alanları olabilir. Hangi giderin etap, hangisinin bina bazında olduğu net olmalı; ortak alan kullanımına ilişkin kurallar yönetim planında yer almalıdır." },
      { h: 'Deniz kıyısında bakım: Yeşilköy ve Florya', p: "Deniz tuzu ve nem; asansör, kapı ve cephe aksamında korozyonu hızlandırabilir. Periyodik kontroller ve koruyucu bakım, ani arıza maliyetini düşürür. Bahçeli sitelerde havuz hijyeni ve peyzaj bakımı mevsime göre planlanmalıdır." },
    ],
    rows: [
      ['Ataköy', 'Sahil kuleleri ve planlı etaplar', 'Etap bazlı gider ayrımı, teknik işletme'],
      ['Florya', 'Müstakil ve bahçeli konutlar', 'Güvenlik, peyzaj, havuz'],
      ['Yeşilköy', 'Sahil dokusu, butik apartmanlar', 'Nem ve korozyon bakımı'],
      ['Şenlikköy', 'Modern siteler', 'Asansör bakımı, sosyal tesis işletmesi'],
      ['Yeşilyurt', 'Sakin sahil yerleşimi', 'Temizlik, güvenlik düzeni'],
    ],
    focus: { h: 'Eski sitelerde yenileme kararı', p: "Yaşı ilerlemiş sitelerde asansör, çatı veya ortak tesisat yenilemesi için bütçe yetersiz kalabilir. Bu durumda yenilemeyi etaplara bölmek, birden fazla teklif almak ve kararı genel kurulda yazılı gündemle almak yöntemdir. Gecikmiş aidat varsa KMK m.20 uyarınca aylık yüzde beş gecikme tazminatı ve icra yolu gündeme gelebilir; somut durum için avukata danışılmalıdır." },
    faq: [
      ['Etaplı sitede ortak gider nasıl paylaşılır?', 'Yönetim planı ve etap sınırlarına göre; hangi kalemlerin etap, hangilerinin bina bazlı olduğu işletme projesinde ayrı gösterilmelidir.'],
      ['Deniz kenarındaki binada asansör ne sıklıkla kontrol edilmeli?', 'Yasal periyodik muayeneye ek olarak bakım firmasının önerdiği sıklıkta; aylık bakım ve arıza müdahalesi sözleşmede ayrı yazılmalıdır.'],
    ],
    tags: ['bakırköy', 'site yönetimi', 'apartman yönetimi', 'ataköy', 'florya'],
  },
  {
    slug: 'basaksehir', name: 'Başakşehir', side: 'Avrupa', loc: "Başakşehir'de",
    lead: "Başakşehir; Bahçeşehir ve Başakşehir etaplarındaki planlı toplu konut projeleriyle İstanbul'un en büyük site yerleşimlerinden biridir. Binlerce bağımsız bölümden oluşan siteler, göletler ve geniş ortak alanlar yönetimde ölçek sorununu öne çıkarır: bütçe büyüktür, hata payı küçüktür.",
    segments: [
      { h: 'Binlerce dairelik sitelerde yönetim', p: "Büyük yerleşimlerde yönetim tek kişinin işi olmaktan çıkar: muhasebe, teknik bakım, güvenlik, temizlik ve peyzaj ayrı birimlerce yürütülür. İşler arasındaki koordinasyonun yazılı prosedürlerle tanımlanması, aylık raporların standart formatta sunulması ve harcama belgelerinin kat maliklerine açık olması güveni artırır." },
      { h: 'Göletli ve geniş yeşil alanlı siteler', p: "Bahçeşehir'deki göletli ve yeşil alanı geniş sitelerde peyzaj, sulama ve gölet bakımı büyük bütçe kalemleridir. Bu kalemlerin yıllık plana göre yazılması ve mevsimsel dalgalanmaların işletme projesinde gösterilmesi gerekir." },
    ],
    rows: [
      ['Bahçeşehir', 'Göletli, yeşil alanı geniş siteler', 'Peyzaj, sosyal tesis işletmesi'],
      ['Şahintepe', 'Orta ölçekli karma konutlar', 'Aidat takibi, teknik bakım'],
      ['Güvercintepe', 'Modern bloklar ve sosyal donatılı yapılar', 'Güvenlik, temizlik'],
    ],
    focus: { h: 'Toplu yapılarda yönetim planı: m.70', p: "Birden fazla yapıdan oluşan toplu yapılarda yönetim planı değişikliği için 7579 sayılı Kanun'la (22 Mayıs 2026 tarihli ve 33261 sayılı Resmî Gazete) değişen KMK m.70 uyarınca üçte iki oy aranır. Başakşehir'deki büyük sitelerde plan değişikliği gündeme gelmeden önce hangi hükmün uygulandığını tapu ve proje yapısına göre doğrulamak gerekir. Ayrıntılar için KMK 2026 değişiklikleri sayfasına bakabilirsiniz." },
    faq: [
      ['Binlerce daireli sitede aidat takibi nasıl yapılır?', 'Dijital kayıt, aylık borç listesi ve yazılı hatırlatma/ihtar prosedürüyle. Gecikmeler için KMK m.20 çerçevesinde hukuki yol izlenir.'],
      ['Toplu yapıda yönetici seçimi nasıl olur?', 'KMK m.34 uyarınca kat maliklerinin sayı ve arsa payı bakımından çoğunluğuyla; toplu yapılarda yapı yapısına göre ek usuller için yönetim planına bakılmalıdır.'],
    ],
    tags: ['başakşehir', 'site yönetimi', 'toplu yapı yönetimi', 'bahçeşehir'],
  },
  {
    slug: 'beylikduzu', name: 'Beylikdüzü', side: 'Avrupa', loc: "Beylikdüzü'nde",
    lead: "Beylikdüzü, geniş bulvarları ve çok sayıda büyük sitesiyle planlı kentleşmenin örneklerinden biridir. Adnan Kahveci ve Barış'ta yoğun site stoku, Yakuplu ve Gürpınar'da deniz komşuluğu, Cumhuriyet Mahallesi'nde park çevresindeki aile siteleri öne çıkar. Sosyal tesisli siteler, açık otoparklar ve rüzgâra açık yüksek bloklar yönetimin gündemini belirler.",
    segments: [
      { h: 'Sosyal tesisli büyük siteler', p: "Havuz, spor salonu, çocuk alanı gibi sosyal donatıları olan sitelerde kullanım kuralları, çalışma saatleri ve bakım giderleri açık yazılmalıdır. Bu tesislerin işletme gideri aidata nasıl yansıyacaksa işletme projesinde ayrı kalem olarak gösterilmelidir." },
      { h: 'Rüzgâra açık bloklar ve deniz komşuluğu', p: "Gürpınar ve Yakuplu gibi sahile yakın bölgelerde rüzgâr ve nem; cephe, balkon ve çatı kaplamalarında yıpranmaya yol açabilir. Düzenli cephe ve çatı kontrolünün bütçelenmesi, ani ve pahalı onarımları engeller." },
    ],
    rows: [
      ['Adnan Kahveci', 'Yoğun nüfuslu, çok sayıda site', 'Şeffaf aidat, ortak alan bakımı'],
      ['Barış', 'Ulaşım aksında büyük siteler', 'Güvenlik, otopark'],
      ['Yakuplu', 'Marina çevresi, villa ve sitelerin karışımı', 'Güvenlik, peyzaj'],
      ['Gürpınar', 'Sahil hattı, rüzgâra açık yapılar', 'Cephe ve nem bakımı'],
      ['Cumhuriyet', 'Park çevresinde aile siteleri', 'Peyzaj bakımı, ortak alan düzeni'],
    ],
    focus: { h: 'Elektrik, su ve doğal gaz abonelikleri', p: "Beylikdüzü Avrupa Yakası'nda olduğundan elektrik dağıtımı BEDAŞ, su ve kanalizasyon İSKİ, doğal gaz İGDAŞ üzerinden yürür. Yeni teslim edilen sitelerde ortak alan sayaçlarının abonelik sahibi müteahhit olabilir; yönetim kurulunca devir alınması ve ilk dönem faturalarının tutanakla netleştirilmesi gerekir." },
    faq: [
      ['Sosyal tesis giderleri aidata nasıl yansıtılır?', 'İşletme projesinde sosyal tesis kalemleri ayrı gösterilir; paylaşım yönetim planına göre yapılır.'],
      ['Yeni sitede sayaç aboneliği kimin adına olmalı?', 'Devir sonrası ortak alan sayaçları site yönetimi adına kayıtlı olmalıdır; müteahhitle ilk dönem fatura ve borç durumu tutanakla netleştirilmelidir.'],
    ],
    tags: ['beylikdüzü', 'site yönetimi', 'apartman yönetimi', 'adnan kahveci', 'yakuplu'],
  },
];

/** İlçeye özgü ek bölümler: yıllık bakım takvimi, ek konu başlıkları ve ilçeye özel seçim sorusu. */
const EXTRAS: Record<string, { segments: Segment[]; calendar: string[]; question: string }> = {
  kadikoy: {
    segments: [
      { h: 'Kadıköy\'de komşuluk ilişkisi ve toplantı kültürü', p: "Kadıköy'de özellikle eski apartmanlarda kat malikleri birbirini uzun yıllardır tanır; bu, kararların hızlı alınmasını kolaylaştırdığı kadar kayıt tutmayı ihmal etmeye de yol açar. Sözlü anlaşmalar, el yazısı defterler ve fotoğraflanmış fişler zamanla kaybolur. Karar defteri, toplantı çağrısı ve gider belgelerinin düzenli arşivlenmesi, yönetici değiştiğinde süreci kesintisiz sürdürmenin en ucuz yoludur." },
      { h: 'Kiracılı daireler ve yönetim bildirimleri', p: "Üniversite ve iş merkezlerine yakınlık nedeniyle Kadıköy'de kiracı oranı yüksek binalar çoktur. Aidat ve ortak gider sorumluluğu kat malikine aittir; kiracıyla iletişim ise sözleşmeye göre değişir. Duyuruların hem malike hem fiilen oturan kişiye ulaşması için güncel bir iletişim listesi tutmak toplantı katılımını artırır." },
    ],
    calendar: ['Ocak-Şubat: yıllık işletme projesi ve genel kurul hazırlığı', 'Nisan-Mayıs: çatı, oluk ve cephe kontrolü (yağış sezonu sonrası)', 'Haziran: havuzlu sitelerde sezon açılışı ve hijyen kontrolü', 'Eylül-Ekim: kalorifer/kazan bakımı ve yakıt sistemi hazırlığı'],
    question: 'Eski binalarda asansör, çatı ve tesisat yenilemeleri için bütçeyi yıllara yayan bir bakım planı sunuluyor mu?',
  },
  atasehir: {
    segments: [
      { h: 'Kurumsal kiracı ve ziyaretçi trafiği', p: "Ofis ve konutun yakın olduğu bölgelerde ziyaretçi, kurye ve servis trafiği konut sitelerinden çok daha yüksektir. Girişte kimlik ve randevu denetimi, kargo teslim noktası ve otopark kotası gibi kurallar yönetim planı ya da kurul kararıyla yazıya geçirilmezse güvenlik görevlisi her gün sözlü kararlarla çalışmak zorunda kalır." },
      { h: 'Enerji giderlerinin izlenmesi', p: "Yüksek katlı binalarda ortak alan elektriği, asansör, aydınlatma ve iklimlendirme bütçenin önemli kısmıdır. Aylık tüketimin önceki yılın aynı ayıyla kıyaslanması ve olağan dışı artışların nedeninin araştırılması, küçük kaçakların büyük faturaya dönüşmesini önler." },
    ],
    calendar: ['Ocak: işletme projesi ve genel kurul gündemi', 'Mart: jeneratör ve UPS yük testi, yangın sistemi kontrolü', 'Mayıs: iklimlendirme sezon hazırlığı', 'Ekim: asansör periyodik muayene takvimi ve kış hazırlığı'],
    question: 'Ofis ve konut bölümleri için ayrı gider takibi ve raporlama yapılıyor mu?',
  },
  uskudar: {
    segments: [
      { h: 'Nem, rutubet ve bodrum katlar', p: "Yamaç ve Boğaz yakınındaki binalarda bodrum ve zemin katlarda rutubet sık görülen bir şikâyettir. Su yalıtımı, drenaj hattı ve sığınak/otopark havalandırması yılda en az bir kez gözle kontrol edilmeli; tespit edilen sorunlar fotoğraf ve tarihle kayda geçirilmelidir. Erken müdahale, kapsamlı tadilat kararını genel kurula taşımadan önce çoğu zaman maliyeti düşürür." },
      { h: 'Konsiyerj ve girişte karşılama hizmeti', p: "Boğaz'a bakan butik sitelerde karşılama, paket teslimi ve misafir yönlendirmesi gibi hizmetler talep edilebilir. Bu hizmetin güvenlik görevinden farklı bir iş tanımı olduğu, sözleşmede ayrı yazılmalı ve bütçede ayrı kalem olarak gösterilmelidir." },
    ],
    calendar: ['Şubat: istinat duvarı, drenaj ve su yalıtımı gözle kontrol', 'Nisan: hidrofor ve pompa bakımı', 'Haziran: bahçe ve havuz sezonu hazırlığı', 'Kasım: çatı, oluk ve yağmur giderleri temizliği'],
    question: 'Eğimli arazi, drenaj ve nem kontrolleri bakım takvimine yazılı olarak giriyor mu?',
  },
  maltepe: {
    segments: [
      { h: 'Rüzgâr ve cephe güvenliği', p: "Sahil ve tepe konumundaki yüksek yapılarda rüzgâr; çatı kaplaması, cephe elemanları, tabela ve balkon eşyaları için risk oluşturabilir. Fırtına öncesi balkon eşyaları için duyuru yapılması ve cephe elemanlarının periyodik gözle kontrolü hem can hem mal güvenliği açısından basit ama etkili önlemlerdir." },
      { h: 'Sosyal tesislerin işletilmesi', p: "Geniş kapalı sitelerde spor salonu, havuz ve çocuk alanı gibi tesislerin kullanım saatleri, kuralları ve bakım giderleri açık yazılmalıdır. Tesisi az kullanan malikler ile çok kullananlar arasında gider paylaşımı tartışması sıktır; yönetim planı ve kurul kararı bu noktada belirleyicidir." },
    ],
    calendar: ['Ocak: işletme projesi ve geçici proje takibi', 'Mart: cephe ve balkon korkulukları kontrolü', 'Mayıs: havuz ve sosyal tesis sezon hazırlığı', 'Ekim: asansör bakımı ve kış öncesi çatı/oluk kontrolü'],
    question: 'Sahil ve rüzgâr etkisine yönelik cephe ve asansör kontrolleri sözleşmede ayrı kalem olarak yer alıyor mu?',
  },
  kartal: {
    segments: [
      { h: 'Devir teslim belgeleri neden önemlidir?', p: "Yeni yapılarda teslim sonrası çıkan eksikler ve ortak alan arızaları, müteahhit sorumluluğu ile yönetim sorumluluğu arasındaki sınırın bulanıklaşmasına yol açar. Teslim tutanağı, eksik listesi, ekipman garanti belgeleri ve proje arşivinin düzenli saklanması hem hak kaybını önler hem de ileride yönetim değişse bile sürekliliği sağlar." },
      { h: 'Metro çevresindeki yoğunlaşma', p: "Soğanlık ve metro çevresindeki yeni projelerde nüfus yoğunluğu otopark, çöp toplama, asansör kullanımı ve ortak alan temizliği giderlerini artırır. Kullanım yoğunluğuna göre temizlik ve teknik bakım sıklığının ayarlanması gerekir." },
    ],
    calendar: ['Ocak-Şubat: ilk yıl veya yeni dönem işletme projesi', 'Nisan: garanti kapsamındaki ekipman kontrol listesi', 'Eylül: sahil bandındaki yapılarda cephe ve korozyon kontrolü', 'Kasım: kazan, kalorifer ve yangın ekipmanı bakımı'],
    question: 'Yeni teslim edilen sitelerde devir teslim ve garanti takibini kim, nasıl yürütüyor?',
  },
  umraniye: {
    segments: [
      { h: 'Kule ve rezidanslarda kurumsal beklenti', p: "Finanskent çevresindeki kule ve rezidans projelerinde kat malikleri ve kiracılar yönetimden kurumsal düzeyde raporlama bekler. Arıza kaydı, müdahale süresi ve bakım geçmişinin sistemli tutulması, hem şikâyet yönetimini hem de genel kurulda hesap vermeyi kolaylaştırır." },
      { h: 'Büyük sitelerde şikâyet ve talep yönetimi', p: "Yüzlerce daireli sitelerde arıza ve talep bildirimi için tek bir kanal (telefon, uygulama veya yazılı form) belirlemek ve her talebe kayıt numarası vermek gerekir. Kimin ne zaman ne bildirdiğinin kayıtlı olması, sorunların takipsiz kalmasını önler." },
    ],
    calendar: ['Ocak: yıllık bütçe ve genel kurul hazırlığı', 'Mart: otopark ve zemin kat su baskını kontrolü', 'Mayıs: iklimlendirme ve havalandırma bakımı', 'Ekim: yangın sistemleri ve tahliye tatbikatı planı'],
    question: 'Talepler için tek kanallı, kayıt numaralı ve raporlanabilir bir takip sistemi var mı?',
  },
  besiktas: {
    segments: [
      { h: 'Yüksek değerli mülklerde sigorta ve risk', p: "Değeri yüksek binalarda zorunlu deprem sigortasının (DASK) yanı sıra yapı ve sorumluluk sigortalarının kapsamı da gözden geçirilmelidir. Poliçe teminatlarının yıllık olarak kontrol edilmesi, hasar anında kapsam tartışmasını önler." },
      { h: 'Etkinlik ve yoğun ziyaretçi dönemleri', p: "Ortaköy ve Bebek gibi turistik bölgelerde hafta sonu ve yaz dönemlerinde ziyaretçi yoğunluğu artar. Giriş kontrolü, çöp toplama ve ortak alan temizliği bu dönemlere göre planlanmalıdır." },
    ],
    calendar: ['Ocak: poliçe ve sözleşme yenileme takvimi', 'Mart: Boğaz hattında cephe ve balkon kontrolü', 'Mayıs: peyzaj ve havuz sezon açılışı', 'Ekim: asansör ve jeneratör periyodik kontrolleri'],
    question: 'Sigorta poliçeleri ve sözleşme yenilemeleri için yıllık bir takvim sunuluyor mu?',
  },
  sisli: {
    segments: [
      { h: 'Ticari yoğunlukta çöp, yük ve servis girişleri', p: "Plaza ve ofis çevresinde yük, kurye ve servis araçları için ayrı giriş saatleri ve noktaları tanımlanması, konut sakinlerinin günlük yaşamını rahatlatır. Atık toplama saatleri ve ayrıştırma kuralları da yazılı olmalıdır." },
      { h: 'Gürültü ve komşuluk uyuşmazlıkları', p: "Konut ve işyerinin iç içe olduğu binalarda gürültü, çalışma saatleri ve ortak alan kullanımı uyuşmazlıkları sık görülür. Yönetim planındaki kullanım kuralları ve gerekirse kurul kararıyla belirlenen saat sınırları, şikâyetlerin kişiselleşmesini engeller." },
    ],
    calendar: ['Ocak: işletme projesi ve genel kurul', 'Mart: merkezi iklimlendirme ve bina otomasyonu bakımı', 'Mayıs: yangın algılama ve tahliye sistemi testi', 'Ekim: asansör periyodik kontrolleri ve jeneratör testi'],
    question: 'Ticari ve konut bölümleri için ayrı kullanım kuralları ve gider kalemleri tanımlı mı?',
  },
  sariyer: {
    segments: [
      { h: 'Orman komşuluğu ve doğa kaynaklı riskler', p: "Orman ve vadi komşuluğu olan sitelerde kuru ağaç ve dal temizliği, yangın güvenliği ve yaban hayvanı kaynaklı sorunlar yönetimin gündemine girer. Mevsime göre budama ve çevre temizliği planı hem güvenliği hem peyzaj bakımını destekler." },
      { h: 'Havuz ve sulama sistemlerinin mevsimsel yönetimi', p: "Havuz sezonu açılışı, kış kapatma, sulama sisteminin donmaya karşı boşaltılması gibi işler yılın belirli zamanlarında yoğunlaşır. Bu işlerin takvimle bütçeye yayılması ve yüklenici sözleşmelerinde zamanlamanın yazılı olması önemlidir." },
    ],
    calendar: ['Şubat: kuru dal, ağaç ve yangın güvenliği kontrolü', 'Nisan: sulama sistemi devreye alma, havuz sezon hazırlığı', 'Eylül: havuz kış kapatma planı', 'Kasım: yağmur giderleri, oluk ve yol temizliği'],
    question: 'Mevsimsel işler (budama, havuz, sulama) için takvimli ve ayrı kalemli bir plan sunuluyor mu?',
  },
  bakirkoy: {
    segments: [
      { h: 'Yenileme bütçesini etaplandırma', p: "Yaşı ilerlemiş sitelerde yenileme ihtiyaçlarını bir arada yapmak aidatı aniden yükseltir. İhtiyaçları aciliyet sırasına koyup yıllara yaymak, kat maliklerinin ödeme gücünü korur. Her iş için keşif, en az iki teklif ve yazılı karar yöntemi izlenmelidir." },
      { h: 'Sahil rüzgârı ve tuzlu hava', p: "Marmara kıyısına yakın yapılarda tuzlu hava metal aksamı ve elektrik panolarını etkiler. Panolar, kapı kilitleri ve dış cephe metal elemanlarının düzenli kontrolü ve gerektiğinde koruyucu boyası arızaları önler." },
    ],
    calendar: ['Ocak: bütçe ve yenileme planı', 'Nisan: cephe, balkon ve çatı kontrolü', 'Haziran: havuz ve sosyal alan sezonu', 'Ekim: asansör, kazan ve elektrik pano bakımı'],
    question: 'Büyük yenileme işleri için etaplı bütçe ve çoklu teklif usulü uygulanıyor mu?',
  },
  basaksehir: {
    segments: [
      { h: 'Okul, park ve sosyal alan yoğunluğu', p: "Aile yaşamının ağırlıkta olduğu sitelerde çocuk alanları, park, okul servisleri ve otopark kullanımı günlük konulardır. Ortak alan kullanım kuralları ve oyun alanı güvenlik kontrolleri düzenli yapılmalıdır." },
      { h: 'Merkezi sistemler ve enerji', p: "Büyük yerleşimlerde merkezi ısıtma, hidrofor ve sulama sistemleri ölçeklendikçe arızanın etkisi de büyür. Yedek ekipman, bakım sözleşmesi ve arıza durumunda iletişim planı önceden belirlenmelidir." },
    ],
    calendar: ['Ocak: bütçe ve genel kurul hazırlığı', 'Mart: oyun alanı ve park güvenlik kontrolü', 'Mayıs: peyzaj sulama ve gölet bakımı', 'Ekim: merkezi ısıtma ve kazan bakımı'],
    question: 'Büyük ölçekli sitelerde birimler arası (muhasebe, teknik, güvenlik) koordinasyon nasıl sağlanıyor?',
  },
  beylikduzu: {
    segments: [
      { h: 'Otopark, trafik ve giriş çıkış düzeni', p: "Binlerce dairelik sitelerde sabah ve akşam saatlerinde giriş çıkış yoğunluğu oluşur. Plaka tanıma, ziyaretçi kartı ve geçici park uygulamaları kurulabilir; ancak bunların kişisel verilerin korunması mevzuatına uygun işletilmesi gerekir." },
      { h: 'Yaşam Vadisi ve park çevresi siteleri', p: "Park komşuluğu olan sitelerde peyzaj ve sulama bakımı, çevre temizliği ve güvenlik devriyesi planlanırken ortak parkın belediye alanı olduğu unutulmamalı; site sınırı ve sorumluluk alanı net tanımlanmalıdır." },
    ],
    calendar: ['Ocak: işletme projesi ve bütçe', 'Mart: cephe, çatı ve balkon korkulukları kontrolü', 'Mayıs: havuz ve sosyal tesis sezon açılışı', 'Ekim: asansör bakımı, kazan ve kış hazırlığı'],
    question: 'Giriş çıkış ve otopark uygulamaları kişisel veri mevzuatına uygun şekilde kuruluyor mu?',
  },
};

const IMAGE ='https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop';
const EXCLUDED_REF = /Çocuk ve Gençlik Merkezi/;

function build(s: Spec): Post {
  const emergency = s.side === 'Anadolu' ? FACTS.emergencyResponse.anatolian : FACTS.emergencyResponse.european;
  const utilities = s.side === 'Anadolu'
    ? `${s.name} Anadolu Yakası'nda olduğundan elektrik dağıtımı AYEDAŞ, su ve kanalizasyon İSKİ, doğal gaz İGDAŞ üzerinden yürür.`
    : `${s.name} Avrupa Yakası'nda olduğundan elektrik dağıtımı BEDAŞ, su ve kanalizasyon İSKİ, doğal gaz İGDAŞ üzerinden yürür.`;
  const x = EXTRAS[s.slug];
  const refs = REAL_REFERENCES.filter((r) => r.district === s.name && !EXCLUDED_REF.test(r.name)).slice(0, 3).map((r) => r.name);
  const refText = refs.length
    ? `Referans listemizde ${s.loc} ${refs.join(', ')} gibi kurumlar bulunur; tam liste Referanslar sayfasındadır.`
    : `Referans listemizin tamamı Referanslar sayfasındadır.`;
  const title = `${s.loc} Site ve Apartman Yönetimi Rehberi (2026)`;
  const description = `${s.loc} site ve apartman yönetimi: mahalle farkları, KMK süreçleri, 7579 sayılı Kanun'la değişenler ve yönetim şirketi seçerken sorulacak sorular.`;
  const tldr = `${s.loc} konut yapısı mahalleden mahalleye değişir; yönetim ihtiyacı da buna göre farklılaşır. Genel kurul, işletme projesi ve aidat takibi KMK'ya göre yürür; 7579 sayılı Kanun işletme projesi ve toplu yapı nisaplarını değiştirdi.`;

  const content: PostBlock[] = [
    { type: 'h2', text: `${s.loc} yönetim ihtiyacı neden mahalleden mahalleye değişir?` },
    { type: 'p', text: s.lead },
    { type: 'p', text: `Bu rehber, ${s.loc} site veya apartman yönetimiyle ilgilenen kat malikleri ve yöneticiler için mahalle bazlı farkları ve Kat Mülkiyeti Kanunu (KMK) çerçevesindeki adımları özetler.` },
    { type: 'h2', text: 'Mahalle mahalle: ne öne çıkar?' },
    { type: 'table', headers: ['Mahalle', 'Tipik yapı', 'Yönetimde öne çıkan konular'], rows: s.rows },
    { type: 'p', text: 'Bu tablo genel bir çerçevedir; her bina için gerçek ihtiyaç, yönetim planı ve bina yaşı gibi verilere bakılarak belirlenmelidir.' },
    ...[...s.segments, ...x.segments].flatMap((g): PostBlock[] => [{ type: 'h2', text: g.h }, { type: 'p', text: g.p }]),
    { type: 'h2', text: `${s.name} için örnek yıllık yönetim takvimi` },
    { type: 'p', text: 'Aşağıdaki takvim genel bir örnektir; gerçek plan binanın yaşı, sistemleri ve yönetim planına göre hazırlanmalıdır.' },
    { type: 'ul', items: x.calendar },
    { type: 'h2', text: `${s.loc} sık karşılaşılan durumlar ve yanıtları` },
    ...(DISTRICT_SCENARIOS[s.slug] ?? []).flatMap(([q, a]): PostBlock[] => [{ type: 'h3', text: q }, { type: 'p', text: a }]),
    { type: 'h2', text: s.focus.h },
    { type: 'p', text: s.focus.p },
    { type: 'h2', text: 'Genel kurul, işletme projesi ve aidat: adımlar' },
    {
      type: 'ol',
      items: [
        "Yönetici seçimi. KMK m.34'e göre yönetici, kat maliklerinin hem sayı hem de arsa payı bakımından çoğunluğuyla seçilir; profesyonel bir yönetim şirketiyle sözleşme yapılması da bu kararla mümkündür.",
        "İşletme projesi. KMK m.37 gereği her yıl gider tahmini hazırlanır. 7579 sayılı Kanun (22 Mayıs 2026 tarihli ve 33261 sayılı Resmî Gazete) bu maddeyi değiştirdi: proje kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç üç ay içinde geçici proje hazırlar. Ayrıntılar için KMK 2026 değişiklikleri sayfasına bakın.",
        'Aidat ve avans. Gider ve avans payını ödemeyen kat maliki için KMK m.20 uyarınca aylık yüzde beş gecikme tazminatı işler; yönetici veya diğer kat malikleri dava açabilir ya da icra takibi yapabilir.',
        'Yönetim planı değişikliği. Tek yapılarda KMK m.28/3 uyarınca beşte dört; birden fazla yapıdan oluşan toplu yapılarda m.70 uyarınca üçte iki oy aranır.',
      ],
    },
    { type: 'cta', text: 'Aidat paylaşım kuralını kendi sitenizde denemek ister misiniz?', href: '/hesaplayici', label: 'Aidat paylaşım hesaplayıcısı' },
    { type: 'h2', text: `${s.name}'de elektrik, su ve doğal gaz: abonelik ve devir` },
    { type: 'p', text: `${utilities} Yönetim devrinde ortak alan sayaçlarının abonelik sahibi ve tarifesi kontrol edilmeli, eski borç ve alacak durumu tutanakla ortaya konmalıdır.` },
    { type: 'h2', text: 'Yönetim şirketi seçerken sorulacaklar' },
    {
      type: 'ul',
      items: [
        'Sözleşme kalem kalem hizmet kapsamını ve fiyatı içeriyor mu?',
        'Aylık gelir-gider raporu ve harcama belgeleri kat maliklerine açık mı?',
        `Acil teknik müdahale için yazılı bir süre hedefi var mı? (Alo Yönetim'in yazılı SLA kapsamındaki hedefi ${s.side} Yakası'nda ${emergency} olarak belirlenmiştir; süre sözleşmedeki hükümlere bağlıdır.)`,
        'Güvenlik hizmeti 5188 sayılı Kanun kapsamında izinli ve lisanslı personelle mi veriliyor?',
        x.question,
        'Sözleşmeden çıkış ve devir-teslim koşulları yazılı mı?',
      ],
    },
    { type: 'h2', text: `${s.loc} Alo Yönetim` },
    { type: 'p', text: `Alo Yönetim'in genel merkezi Osmanağa, Kadıköy'dedir ve ${FACTS.foundingYear}'dan beri faaliyet gösterir. ${refText}` },
    { type: 'cta', text: `Siteniz için ${s.name} site yönetimi hizmetini inceleyebilir, ücretsiz keşif teklifi isteyebilirsiniz.`, href: `/bolgeler/${s.slug}/site-yonetimi`, label: `${s.name} site yönetimi` },
    { type: 'h2', text: 'Sık sorulan sorular' },
    ...s.faq.flatMap(([q, a]): PostBlock[] => [{ type: 'h3', text: q }, { type: 'p', text: a }]),
    { type: 'quote', text: 'Bu yazı genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.' },
  ];

  return {
    slug: `${s.slug}-site-yonetimi-rehberi-2026`,
    title, description,
    category: 'yonetim',
    tags: s.tags,
    author: 'alo-yonetim',
    datePublished: '2026-10-14T09:00:00.000Z',
    dateModified: '2026-10-14T09:00:00.000Z',
    image: IMAGE,
    pillar: `/bolgeler/${s.slug}/site-yonetimi`,
    tldr,
    content,
  };
}

export const DISTRICT_GUIDES: Post[] = SPECS.map(build);

/** En/ru/ar çevirisi henüz yapılmamış (yalnızca Türkçe) yazılar; bu sürümler noindex kalır. */
export const TR_ONLY_BLOG_SLUGS: readonly string[] = DISTRICT_GUIDES.map((p) => p.slug);

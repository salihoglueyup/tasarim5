/**
 * Sözlük terimleri için ayrıntılı açıklamalar (yalnızca Türkçe terim sayfalarında gösterilir).
 * Anahtar: termToSlug(term). Yalnızca doğrulanabilir hukuki/teknik bilgi; oran, vaka ve garanti ifadesi içermez.
 */
export interface TermDetail {
  explain: string[];
  tips?: string[];
  faq?: [string, string][];
}

export const TERM_DETAILS: Record<string, TermDetail> = {
  aidat: {
    explain: [
      "Aidat, kat malikinin ortak giderlere yaptığı düzenli katkıdır. Elektrik, su, asansör bakımı, temizlik, güvenlik, personel ücretleri ve küçük onarımlar gibi giderler yıllık işletme projesinde gösterilir; her bağımsız bölüme düşen pay aylık avans olarak toplanır.",
      "Paylaşım kuralı KMK m.20'de belirlenmiştir: yönetim planında aksi yazmıyorsa kapıcı, kaloriferci, bahçıvan ve bekçi giderlerine tüm kat malikleri eşit, diğer ortak giderlere arsa payı oranında katılır. Aidat kullanıma değil mülkiyete bağlıdır; daire boş olsa da malik öder.",
    ],
    tips: [
      'Aidat tutarı işletme projesindeki kalemlere dayanmalı ve kat maliklerine yazılı bildirilmelidir.',
      'Gecikmede KMK m.20 uyarınca aylık yüzde beş gecikme tazminatı işler.',
      'Kiracı, ödemekle yükümlü olduğu kira miktarı kadar malikle birlikte sorumlu olabilir (KMK m.22).',
    ],
    faq: [
      ['Aidat kimin sorumluluğundadır?', 'Asıl borçlu kat malikidir. Kiracı, kira miktarı kadar müteselsilen sorumludur; ayrıntı için yönetim planına ve kira sözleşmesine bakın.'],
      ['Aidat artışı nasıl belirlenir?', 'Yönetici işletme projesini hazırlar, kat malikleri kurulu onaylar. 7579 sayılı Kanun sonrası mevcut projesi olan sitelerde geçici proje bedeli bir önceki yılın yeniden değerleme oranını aşamaz.'],
    ],
  },
  'kat-mulkiyeti-kanunu-kmk': {
    explain: [
      "634 sayılı Kat Mülkiyeti Kanunu (KMK), bir yapının bağımsız bölümlerinin ayrı ayrı mülkiyete konu olmasını ve ortak yerlerin yönetimini düzenler. Kat irtifakı ve kat mülkiyeti kurulması, yönetim planı, kat malikleri kurulu, yönetici ve denetçi, ortak giderler ve bunlara katılım kuralları bu kanunda yer alır.",
      "Kanun, 22 Mayıs 2026 tarihli 7579 sayılı Kanun'la değişmiştir: işletme projesinin kat malikleri kurulunda onaylanması ve geçici proje usulü (m.35, 37) ile toplu yapılarda yönetim planı değişikliği için üçte iki çoğunluk (m.70) düzenlenmiştir.",
    ],
    tips: [
      'Yönetim planı kanunun tamamlayıcı hükümlerinden farklı kurallar koyabilir; önce planınıza bakın.',
      'Kanun maddelerinin güncel metni için Resmî Gazete veya mevzuat.gov.tr esas alınmalıdır.',
    ],
    faq: [
      ['KMK hangi yapılara uygulanır?', 'Kat irtifakı veya kat mülkiyeti kurulmuş, birden fazla bağımsız bölümü olan yapılara ve toplu yapılara uygulanır.'],
      ['7579 sayılı Kanun neyi değiştirdi?', 'KMK m.35, 37 ve 70 değişti: işletme projesinin onay usulü, geçici proje ve toplu yapılarda yönetim planı çoğunluğu düzenlendi.'],
    ],
  },
  'kmk-madde-20-genel-giderlere-katilma-aidat-borcu': {
    explain: [
      "KMK m.20, kat maliklerinin ortak giderlere ve avans paylarına nasıl katılacağını düzenler. Kural olarak ortak yerlerin bakım, koruma ve onarım giderleri ile yönetici ücreti arsa payı oranında; kapıcı, kaloriferci, bahçıvan ve bekçi gibi hizmetlilerin giderleri eşit oranda paylaşılır. Yönetim planı farklı bir ölçü belirleyebilir.",
      "Maddenin ikinci fıkrası gecikme için aylık yüzde beş tazminat öngörür. Gider veya avans payını ödemeyen kat maliki hakkında yönetici ya da diğer kat malikleri dava açabilir veya icra takibi başlatabilir.",
    ],
    tips: [
      'Kat maliki ortak yerlerden yararlanmaktan vazgeçerek aidat ödemeyi reddedemez.',
      'Takip öncesi işletme projesi, karar defteri ve borç dökümü hazır olmalıdır.',
    ],
    faq: [
      ['Gecikme tazminatı genel kurul kararıyla kaldırılabilir mi?', 'Gecikme tazminatı kanunda düzenlenmiştir; vazgeçme veya indirim kararlarının sonuçları için hukuk danışmanından görüş alınması önerilir.'],
      ['Aidat hangi oranda paylaşılır?', 'Yönetim planında aksi yazmıyorsa hizmetli giderlerinde eşit, diğer ortak giderlerde arsa payı oranında.'],
    ],
  },
  'gecici-isletme-projesi-kmk-m37': {
    explain: [
      "Kat malikleri kurulunca kabul edilmiş bir işletme projesi yoksa yönetici gecikmeksizin geçici bir işletme projesi hazırlar. 7579 sayılı Kanun'a göre bu projenin en geç üç ay içinde kat malikleri kurulunda aynen veya değiştirilerek onaylanması gerekir.",
      "Mevcut bir işletme projesi varsa geçici projedeki bedel, bir önceki yıla ilişkin yeniden değerleme oranından fazla olamaz. Bu nedenle yönetici, hem toplantı takvimini hem de bildirim kayıtlarını düzenli tutmalıdır.",
    ],
    tips: [
      'Geçici projeyi maliklere bildirdiğinizi ispatlayacak kayıt (imza, taahhütlü posta) saklayın.',
      'Üç aylık süreyi kurul toplantı takvimine göre geriye doğru planlayın.',
    ],
    faq: [
      ['Geçici proje ne kadar süre geçerlidir?', 'Kurulda onaylanmak üzere en geç üç ay içinde sunulmalıdır; onaydan sonra işletme projesi olarak uygulanır.'],
      ['Geçici projede artışın üst sınırı var mı?', 'Mevcut projesi olan sitelerde bir önceki yılın yeniden değerleme oranı üst sınırdır.'],
    ],
  },
  'yeniden-degerleme-orani-aidat-artis-siniri': {
    explain: [
      "Yeniden değerleme oranı, vergi mevzuatında her yıl ilan edilen ve çeşitli parasal sınırları güncelleyen orandır. 7579 sayılı Kanun'la KMK m.37'de, mevcut işletme projesi olan sitelerde geçici projedeki bedelin bir önceki yıla ilişkin yeniden değerleme oranından fazla artırılamayacağı hükmü getirilmiştir.",
      "Oran her yıl değiştiği için aidat artışını hesaplarken yılın ilan edilmiş güncel oranı resmî duyurudan doğrulanmalıdır. Sitemizdeki hesaplayıcı örnek bir hesaplama sunar; kesin uygulama için hukuk danışmanına başvurun.",
    ],
    tips: [
      'Oranı eski bir yazıdan değil, güncel resmî duyurudan teyit edin.',
      'Artışın hangi dayanakla yapıldığını kurul kararına yazın.',
    ],
    faq: [
      ['Üst sınır tüm artışlar için geçerli mi?', 'Düzenleme, mevcut işletme projesi olan sitelerde geçici projedeki bedeli sınırlar; kurulca onaylanan projelere uygulanışı için hukuki görüş alın.'],
    ],
  },
  'toplu-yapi-kmk-m66-70': {
    explain: [
      "Toplu yapı, birden fazla yapıdan oluşan ve ortak bir yönetim planıyla yönetilen yerleşimdir. Bloklar kendi kat malikleri kurullarını oluşturur; ortak tesisler (güvenlik, peyzaj, havuz, otopark vb.) toplu yapı yönetimince yürütülür.",
      "7579 sayılı Kanun'la KMK m.70'te, toplu yapılarda yönetim planı değişikliği için gereken çoğunluk beşte dörtten üçte ikiye indirilmiştir. Planın bu orana aykırı hükümlerinin uygulanmayacağı da belirtilmiştir.",
    ],
    tips: [
      'Sitenizin toplu yapı olup olmadığını tapu ve proje yapısından doğrulayın.',
      'Blok ve toplu yapı giderlerini işletme projesinde ayrı gösterin.',
    ],
    faq: [
      ['Toplu yapıda plan değişikliği için kaç oy gerekir?', 'KMK m.70 uyarınca üçte iki; tek yapılarda ise KMK m.28/3 uyarınca beşte dört aranır.'],
    ],
  },
  'kmk-madde-34-site-yoneticisinin-atanmasi-secimi': {
    explain: [
      "KMK m.34, yöneticinin kat malikleri kurulunca seçilmesini düzenler. Yönetici, kat maliklerinin hem sayı hem de arsa payı bakımından çoğunluğuyla seçilir; yönetici kat maliki olmak zorunda değildir, bir yönetim şirketi de seçilebilir.",
      "Yönetici, kurul kararlarını uygular, ortak yerlerin bakımını yürütür, işletme projesini hazırlar ve hesap verir. Görevden alma ve değişimde hesap, defter, belge ve anahtarların tutanakla devri gerekir.",
    ],
    tips: [
      'Yönetim şirketiyle çalışılacaksa hizmet kapsamı ve raporlama yazılı sözleşmeye bağlanmalıdır.',
      'Seçim kararı karar defterine nisap bilgileriyle birlikte işlenmelidir.',
    ],
    faq: [
      ['Yönetici dışarıdan biri olabilir mi?', 'Evet. Yönetici kat maliki olmayan bir kişi veya yönetim şirketi de olabilir.'],
    ],
  },
  demirbas: {
    explain: [
      "Demirbaş, ortak alanda kullanılan ve uzun süre dayanan eşyalardır: jeneratör, hidrofor, bahçe ekipmanı, asansör kabini aksamı gibi. Demirbaşların envanteri tutulmalı ve yönetici değiştiğinde tutanakla devredilmelidir.",
      "Demirbaş alımı ve yenileme giderleri, olağan işletme giderlerinden ayrı değerlendirilir. Büyük alımlar için keşif, birden fazla teklif ve kurul kararı önerilir.",
    ],
    tips: [
      'Envanteri yılda en az bir kez sayıp tutanakla güncelleyin.',
      'Demirbaş yenileme giderlerini işletme projesinde ayrı kalem olarak gösterin.',
    ],
    faq: [
      ['Demirbaş giderini kiracı öder mi?', 'Olağan işletme giderleri kira kadar kiracıyı da bağlayabilir; demirbaş ve ana gayrimenkulün yenilenmesine ilişkin giderler malike aittir.'],
    ],
  },
  'isletme-projesi': {
    explain: [
      "İşletme projesi, sitenin yıllık tahmini gelir ve giderlerini ve her bağımsız bölüme düşen avans payını gösteren bütçe belgesidir (KMK m.37). Personel, enerji, bakım sözleşmeleri, sigorta ve beklenen küçük onarımlar kalem kalem yazılır.",
      "7579 sayılı Kanun'dan sonra işletme projesi kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç üç ay içinde onaylanacak geçici proje hazırlar. Onay ve bildirimin ispatı, aidat tahsilatında önemlidir.",
    ],
    tips: [
      'Önceki yılın fiili giderlerini ve sözleşme artışlarını baz alın.',
      'Büyük yenilemeleri olağan aidattan ayrı gösterin.',
      'Bütçe aşılırsa ek proje hazırlayın.',
    ],
    faq: [
      ['İşletme projesini kim hazırlar?', 'Yönetici (veya görevli yönetim şirketi) hazırlar; onay yetkisi kat malikleri kuruluna aittir.'],
      ['Yıl içinde bütçe yetmezse ne yapılır?', 'Gerekçeli bir ek işletme projesi hazırlanıp kurula sunulur.'],
    ],
  },
  '5188-sayili-kanun': {
    explain: [
      "5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun, özel güvenlik şirketlerinin izinlerini, güvenlik görevlilerinin eğitimini, kimlik kartlarını ve yetkilerini düzenler. Sitelerde güvenlik hizmeti bu kanun kapsamında izinli yapılar ve kimlik kartı olan personelle verilmelidir.",
      "Güvenlik görevlisinin yetkileri kanunla sınırlıdır: kimlik sorma, belirli şartlarda arama ve yakalama gibi. Yetki aşımı hukuki sorumluluk doğurabilir; görev tanımı dışında temizlik gibi işlerde çalıştırılması da sorun yaratır.",
    ],
    tips: [
      'Şirketin faaliyet izni ve personelin kimlik kartı geçerliliğini sözleşme öncesi doğrulayın.',
      'Kamera kayıtlarında kişisel verilerin korunması ilkelerine uyun.',
    ],
    faq: [
      ['Güvenlik görevlisi arama yapabilir mi?', 'Kanundaki şartlar ve sınırlar içinde; genel kolluk yetkisi yoktur. Somut durum için hukuk danışmanına başvurun.'],
    ],
  },
  'kat-malikleri-kurulu': {
    explain: [
      "Kat malikleri kurulu, bir yapının veya sitenin bağımsız bölüm maliklerinden oluşan karar organıdır. Yönetici ve denetçi seçimi, işletme projesinin onayı ve ortak yerlerle ilgili önemli kararlar kurulda alınır.",
      "Olağan toplantı yılda bir kez yapılır; gerektiğinde olağanüstü toplantı çağrılabilir. Çağrının yazılı yapılması, gündemin açık yazılması ve karar defterine eksiksiz işlenmesi kararların geçerliliği için önemlidir.",
    ],
    tips: [
      'Toplantı çağrısını ve katılımcı listesini (hazirun cetveli) saklayın.',
      'Vekâletle katılım kuralları için yönetim planına bakın.',
    ],
    faq: [
      ['Karar çoğunluğu nasıl aranır?', 'Kural olarak ilk toplantıda sayı ve arsa payı bakımından çoğunluk; yetersizse ikinci toplantıda katılanların çoğunluğu. Bazı kararlarda daha yüksek nisap aranır.'],
    ],
  },
  'yonetim-plani': {
    explain: [
      "Yönetim planı, ana gayrimenkulün yönetim biçimini, kullanma kurallarını ve ücretleri düzenleyen; tüm kat maliklerini ve sonradan edinenleri bağlayan belgedir (KMK m.28). Tapu siciline şerh edilir.",
      "Tek yapılarda planın değiştirilmesi için kat maliklerinin beşte dördü gerekir (m.28/3); toplu yapılarda 7579 sayılı Kanun'la değişen m.70 uyarınca üçte iki aranır. Kanuna aykırı hükümler uygulanmaz.",
    ],
    tips: [
      'Otopark, ortak alan kullanımı ve gider paylaşım ölçüsünü planda açıkça yazın.',
      'Plan değişikliklerini kiracılara da duyurun; plan onları da bağlar.',
    ],
    faq: [
      ['Yönetim planı kiracıyı bağlar mı?', 'Evet, kiracılar da plandaki kullanım kurallarına uymak zorundadır.'],
    ],
  },
  'ortak-alan': {
    explain: [
      "Ortak alanlar; giriş, merdiven, asansör, çatı, bahçe, otopark, sığınak ve sosyal tesisler gibi bütün kat maliklerinin yararlandığı yerlerdir. Bakım, onarım ve işletme giderleri ortak gider olarak paylaşılır.",
      "Ortak alanların kullanımı yönetim planı ve kurul kararlarıyla düzenlenir. Otopark tahsisi veya bir alanın üçüncü kişilere kiralanması gibi konularda karar nisapları ve hukuki sonuçlar için danışmanlık alınmalıdır.",
    ],
    tips: [
      'Ortak alan kullanım kurallarını yazılı duyurun.',
      'Ortak alanlardaki değişiklikleri kurul kararı ve gerekirse izinle yapın.',
    ],
    faq: [
      ['Ortak alan giderlerinden kaçınılabilir mi?', 'Ortak yerlerden yararlanmamak, giderlere katılma yükümlülüğünü kaldırmaz.'],
    ],
  },
  'kompanzasyon-reaktif-guc': {
    explain: [
      "Kompanzasyon, elektrik tesisatında reaktif gücün kondansatör grupları ile dengelenmesidir. Reaktif güç belirli sınırı aşarsa dağıtım şirketi ek bedel yansıtabilir. Düzenli kompanzasyon takibi bu riski azaltmaya yardımcı olur.",
      "Büyük sitelerde ve plazalarda kondansatör kademelerinin periyodik kontrolü, panoların temizliği ve sayaç verilerinin izlenmesi bakım programına eklenir. Sınır değerleri ve uygulama güncel mevzuata göre değişebilir.",
    ],
    tips: [
      'Reaktif oranlarını aylık fatura ve sayaç verilerinden izleyin.',
      'Pano bakımını yetkili elektrik mühendisliği ile yaptırın.',
    ],
    faq: [
      ['Reaktif ceza her sitede olur mu?', 'Hayır; abonelik türüne ve tüketim profiline bağlıdır. Fatura ve sayaç verilerinizi inceleyin.'],
    ],
  },
  denetci: {
    explain: [
      "Denetçi, yöneticinin faaliyetlerini ve hesaplarını denetleyen kişidir. Kasa ve banka hesaplarını, gelir-gider belgelerini ve karar defterini inceleyip raporunu kat malikleri kuruluna sunar.",
      "Denetçinin belgelere ve banka hareketlerine düzenli erişebilmesi şeffaf yönetimin temelidir. Yönetim planı denetçinin seçimi, görev süresi ve ücretini düzenleyebilir.",
    ],
    tips: [
      'Denetim raporunu genel kurul gündemine alın.',
      'Denetçi ile yönetici arasında çıkar çatışması olmamasına dikkat edin.',
    ],
    faq: [
      ['Denetçi kat maliki olmak zorunda mı?', 'Yönetim planı ve kurul kararına bağlıdır; planınıza bakın.'],
    ],
  },
  'ozel-guvenlik-izni-ogi': {
    explain: [
      "Özel güvenlik izni, 5188 sayılı Kanun kapsamında bir tesiste özel güvenlik hizmeti verilebilmesi için ilgili idareden alınan izindir. Başvuru dosyasında genellikle kurul kararı, tesisin bilgileri, güvenlik noktalarını gösteren plan ve sigorta gibi belgeler yer alır.",
      "Gereken izinler ve usuller zaman içinde değişebileceğinden başvurudan önce ilgili valilik biriminden güncel şartlar teyit edilmelidir. İzinsiz çalıştırma idari yaptırımlara yol açabilir.",
    ],
    tips: [
      'Başvuru dosyasını kat malikleri kurulu kararıyla başlatın.',
      'Personel sayısı ve vardiya değişikliklerinde izin kapsamını güncelleyin.',
    ],
    faq: [
      ['İzin başvurusunu kim yapar?', 'Genellikle yönetici veya görevli yönetim şirketi; karar kat malikleri kuruluna aittir.'],
    ],
  },
  'hizmet-seviyesi-taahhudu-sla': {
    explain: [
      "Hizmet seviyesi anlaşması (SLA), bir hizmet sağlayıcının hangi hizmeti hangi kalite ve sürede vereceğini yazılı olarak tanımlar. Tesis yönetiminde acil müdahale süresi, raporlama sıklığı ve arıza kayıtlarının tutulması gibi göstergeler SLA'ya bağlanır.",
      "Alo Yönetim'in yazılı SLA kapsamındaki acil müdahale hedefi Anadolu Yakası'nda 30 dakika, Avrupa Yakası'nda 1 saattir; süre ve kapsam sözleşme hükümlerine bağlıdır.",
    ],
    tips: [
      'SLA hedefini ölçüm yöntemiyle birlikte sözleşmeye yazın.',
      'Hedef aşıldığında uygulanacak yaptırımı belirleyin.',
    ],
    faq: [
      ['SLA ile garanti aynı şey midir?', 'Hayır. SLA bir hedef ve ölçüm çerçevesidir; sonuçlar sözleşmedeki koşullara bağlıdır.'],
    ],
  },
  'mali-ibra': {
    explain: [
      "Mali ibra, kat malikleri kurulunun yöneticinin belirli bir dönemdeki hesap ve faaliyetlerini inceleyip onaylayarak onu sorumluluktan kurtarmasıdır. Genellikle olağan genel kurulda denetçi raporu ve gelir-gider tablosu üzerinden oylanır.",
      "İbra edilmeyen yönetici hakkında somut olaya göre hesap uyuşmazlığı veya tazminat süreçleri gündeme gelebilir. İbra kararının gerekçesi karar defterine açık yazılmalıdır.",
    ],
    tips: [
      'İbra oylamasından önce belgeleri maliklerin incelemesine açın.',
      'Yönetici değişiminde devir tutanağı ibrayı kolaylaştırır.',
    ],
    faq: [
      ['İbra edilmemek ne anlama gelir?', 'Hesapların kabul edilmediği anlamına gelir; sonuçları durumun niteliğine göre değişir ve hukuki danışmanlık gerektirebilir.'],
    ],
  },
  'arsa-payi': {
    explain: [
      "Arsa payı, bir bağımsız bölümün ana taşınmazın arsası üzerindeki pay oranıdır ve tapuda yazılıdır. Ortak giderlerin paylaşımı, oy hakkı çoğunluğu ve bazı karar nisapları arsa payına göre hesaplanır.",
      "Yönetim planında farklı bir gider ölçüsü belirlenmedikçe kapıcı gibi hizmetli giderleri eşit, diğer ortak giderler arsa payı oranında paylaşılır (KMK m.20). Yönetici ve bazı kararlar için hem kişi sayısı hem arsa payı çoğunluğu aranır.",
    ],
    tips: [
      'Arsa paylarınızı tapu kaydından doğrulayın.',
      'Aidat paylaşım hesaplayıcısıyla örnek dağılımı görebilirsiniz.',
    ],
    faq: [
      ['Arsa payı değiştirilebilir mi?', 'Arsa paylarının değiştirilmesi tapu ve kanun şartlarına bağlıdır; hukuki danışmanlık gerektirir.'],
    ],
  },
  'kat-irtifaki': {
    explain: [
      "Kat irtifakı, henüz tamamlanmamış bir yapıda bağımsız bölümler üzerinde kurulan ve ileride kat mülkiyetine dönüşecek irtifak hakkıdır. Tapuda arsa üzerine kat irtifakı kurulur ve yapı tamamlanıp iskân alındıktan sonra kat mülkiyetine geçilir.",
      "Kat irtifakı döneminde de yönetim planı ve ortak yönetim kuralları geçerli olabilir. Teslimde iskân ve tapu işlemlerinin tamamlandığından emin olunmalıdır.",
    ],
    tips: [
      'Kat mülkiyetine geçiş için iskân (yapı kullanma izin belgesi) alınmış olmalıdır.',
      'Teslim sırasında eksik ve kusur listesi tutanakla yapılmalıdır.',
    ],
    faq: [
      ['Kat irtifakı ile kat mülkiyeti arasındaki fark nedir?', 'Kat irtifakı tamamlanmamış yapı için kurulur; kat mülkiyeti yapı tamamlanıp iskân alındıktan sonra kurulan tam mülkiyettir.'],
    ],
  },
  'gecikme-tazminati-5-yasal-faiz': {
    explain: [
      "KMK m.20/2, gider veya avans payını ödemeyen kat malikine gecikilen süre için aylık yüzde beş gecikme tazminatı öngörür. Bu tazminat yasal faizden bağımsız ve kanundan doğan bir yükümlülüktür.",
      "Tahsilat için yönetim, hatırlatma, ihtar ve icra takibi adımlarını yazılı bir prosedüre bağlamalıdır. Tazminatın hesaplanması ve takibe konulması ayrıntıları için hukuk danışmanından destek alınmalıdır.",
    ],
    tips: [
      'Gecikme başlangıç tarihini aidat vade tarihine göre belirleyin.',
      'Borç dökümünü ay ay hazırlayın.',
    ],
    faq: [
      ['Gecikme tazminatı aylık mı yıllık mı?', 'Kanun aylık yüzde beş olarak düzenlemiştir.'],
    ],
  },
  'olagan-ve-olaganustu-genel-kurul': {
    explain: [
      "Olağan genel kurul, kat malikleri kurulunun yılda bir kez yönetim planında belirtilen zamanda yaptığı toplantıdır; yönetici raporu, denetçi raporu, ibra ve işletme projesi bu toplantıda görüşülür. Olağanüstü genel kurul ise acil veya önemli konular için çağrılır.",
      "Çağrı yazılı yapılmalı, gündem açık yazılmalı ve toplantı yeter sayısı ile karar sayısı karar defterine işlenmelidir. Çağrı ve katılım kayıtlarının saklanması sonradan itirazları azaltır.",
    ],
    tips: [
      'Toplantı tarihini ve gündemi önceden yazılı duyurun.',
      'Vekâletnameleri ve hazirun cetvelini dosyalayın.',
    ],
    faq: [
      ['Olağanüstü toplantıyı kim çağırır?', 'Yönetici veya kanun ve yönetim planındaki şartları sağlayan kat malikleri çağırabilir; ayrıntılar için KMK ve planınıza bakın.'],
    ],
  },
  'hazirun-cetveli': {
    explain: [
      "Hazirun cetveli, genel kurula katılan kat maliklerinin (asaleten veya vekâleten) bağımsız bölüm numarası, arsa payı ve imzalarını gösteren yoklama listesidir. Toplantı yeter sayısının ve karar çoğunluğunun hesaplanmasında temel belgedir.",
      "Cetvel toplantı başında düzenlenir, divan tarafından imzalanır ve karar defterine eklenir. Vekâlet yoluyla katılımda vekâletnamelerin cetvele eklenmesi gerekir.",
    ],
    tips: [
      'Cetveli toplantıdan önce hazırlayın, geç gelenleri kayda geçirin.',
      'Hem kişi sayısı hem arsa payı oranını ayrı sütunlarda gösterin.',
    ],
    faq: [
      ['Hazirun cetveli neden önemlidir?', 'Toplantının geçerli olup olmadığını ve kararların hangi çoğunlukla alındığını gösteren delildir.'],
    ],
  },
  'ilamsiz-icra-takibi-aidat-borcu': {
    explain: [
      "İlamsız icra takibi, mahkeme kararı olmadan UYAP üzerinden alacaklının başlattığı takip yoludur. Aidat borcunda yönetici, onaylı işletme projesi, karar defteri ve borç dökümü ile takip başlatır; borçluya ödeme emri tebliğ edilir.",
      "Süresinde itiraz edilmezse takip kesinleşir ve haciz aşamasına geçilir; itiraz edilirse takip durur ve itirazın iptali davası gündeme gelir. Belge eksikliği süreci uzatabileceğinden takipten önce dosyanın eksiksiz hazırlanması önemlidir.",
    ],
    tips: [
      'Tebligat adresini ve borç tutarını önceden doğrulayın.',
      'Süreleri avukatla birlikte planlayın.',
    ],
    faq: [
      ['Takip için avukat şart mı?', 'Yönetici de takip başlatabilir; itiraz ve dava aşamalarında avukat desteği önerilir.'],
    ],
  },
  'yesil-etiket-asansor': {
    explain: [
      "Asansörler yetkili muayene kuruluşlarınca periyodik olarak kontrol edilir ve sonuç etiketle gösterilir. Yeşil etiket asansörün muayene sonucunda uygun bulunduğunu gösterir; mavi ve sarı etiket giderilmesi gereken kusurları, kırmızı etiket ise asansörün kullanılmaması gerektiğini ifade eder.",
      "Etiket sonuçları ve kusur giderme süreleri yönetmelikte belirlenmiştir. Bakım sözleşmesinde muayene sorumluluğu ve revizyon süreçleri açıkça yazılmalıdır.",
    ],
    tips: [
      'Kırmızı etiketli asansörü çalıştırmayın.',
      'Muayene raporlarını ve bakım formlarını tarih sırasıyla saklayın.',
    ],
    faq: [
      ['Etiket ne sıklıkla yenilenir?', 'Muayene sıklığı mevzuatla belirlenir; güncel yönetmelik hükümlerine ve muayene raporundaki tarihe bakın.'],
    ],
  },
};

/**
 * İlçe rehberleri için "sık karşılaşılan durumlar" bölümü: ilçenin yapı tipine özgü 4'er senaryo.
 * Yanıtlar KMK'nın genel hükümlerine dayanır; somut durum için yönetim planı ve hukuk danışmanı esas alınmalıdır.
 */
export const DISTRICT_SCENARIOS: Record<string, [string, string][]> = {
  kadikoy: [
    ['Moda\'daki 8 daireli eski apartmanda asansör yenileme kararı çıkmıyor; ne yapılabilir?', 'Önce iki-üç firmadan keşif ve kalem kalem teklif alın, bütçeyi aylık avansa yayan bir ödeme planı çıkarın ve gündemi yönetim planındaki nisaba göre yazılı olarak kurula taşıyın. Karar nisabı konusunda hukuk danışmanından görüş almak toplantıyı boşa çıkarmaz.'],
    ['Bostancı\'daki binada zemin kat dükkânlar asansör giderine katılmıyor; bu doğru mu?', 'Yönetim planı gider paylaşımını arsa payı, bağımsız bölüm sayısı veya kullanım biçimine göre farklı belirleyebilir. Planda açık hüküm yoksa KMK\'nın genel kuralı uygulanır; uyuşmazlıkta planın ilgili maddesi ve tapu kayıtları incelenmelidir.'],
    ['Caddebostan\'daki sitede havuz ve otopark giderleri bütçeyi şişiriyor; nasıl şeffaflaştırılır?', 'İşletme projesinde havuz, otopark, güvenlik ve temizlik kalemlerini ayrı gösterin, aylık gerçekleşen-bütçe tablosunu maliklere sunun ve büyük alımlarda en az üç teklif toplayın.'],
    ['Kiracısı çok olan binada duyurular ulaşmıyor; toplantı yeter sayısı sağlanamıyor. Çözüm nedir?', 'Güncel malik iletişim listesi tutun, çağrıyı yazılı ve ispatlanabilir yolla yapın, vekâlet usulünü planda netleştirin. Çağrı kayıtları sonradan itirazlara karşı korur.'],
  ],
  atasehir: [
    ['Ofis ve konutun bulunduğu karma projede asansör ve güvenlik gideri nasıl paylaşılır?', 'Yönetim planında ticari ve konut bölümleri için ayrı kullanım ve gider paylaşım kuralları yoksa tartışma çıkar. Plan değişikliği için tek yapıda beşte dört, toplu yapıda üçte iki oy aranır; öncesinde hukuk görüşü alın.'],
    ['Yüksek katlı rezidansta jeneratör ve yangın sistemi bakım kayıtları neden önemli?', 'Bu sistemlerin periyodik test ve bakım kayıtları, hem arıza anında müdahale hızını hem de olası bir uyuşmazlıkta yönetimin özenini gösteren belgedir. Tarihli ve imzalı rapor düzeni kurun.'],
    ['Büyük sitede yüzlerce daire için aidat takibi nasıl düzenli tutulur?', 'Dijital kayıt, aylık borç listesi ve yazılı hatırlatma/ihtar prosedürü kullanın; gecikme için KMK m.20 çerçevesinde hukuki yolu önceden belirlenmiş adımlara bağlayın.'],
    ['Ziyaretçi ve kurye trafiği güvenlik görevlisini zorluyor; ne yapılmalı?', 'Giriş kuralları, kargo teslim noktası ve otopark kotası kurul kararı veya yönetim planıyla yazılı hâle getirilmeli; kişisel verilerin korunması ilkelerine uygun kayıt tutulmalıdır.'],
  ],
  uskudar: [
    ['Boğaz yamacındaki sitede istinat duvarı ve drenaj kontrolü ne sıklıkla yapılmalı?', 'En az yılda bir görsel kontrol, yağış sezonu öncesi ve sonrasında ek inceleme önerilir. Tespitler fotoğraf ve tarihle kaydedilmeli, büyük onarımlar için keşif ve çoklu teklif alınmalıdır.'],
    ['Kuzguncuk\'taki tarihi binada cephe boyatmak için izin gerekir mi?', 'Bina koruma altındaysa cephe ve çatı müdahalelerinde ilgili belediye ve koruma kurulundan izin gerekebilir. İşe başlamadan önce yetkili kurumdan yazılı teyit alın.'],
    ['Altunizade\'de plaza-rezidans karma binada enerji giderleri nasıl izlenir?', 'Alt sayaçlarla konut ve ticari bölüm tüketimini ayırın, aylık tüketimi önceki yılın aynı ayıyla karşılaştırın ve olağan dışı artışları araştırın.'],
    ['Çengelköy\'deki villa sitesinde peyzaj ve havuz bakımı bütçesi nasıl planlanır?', 'Mevsimsel işleri (budama, sulama, havuz açılış-kapanış) takvime yayın ve işletme projesinde ayrı kalem gösterin; böylece ani aidat artışı gündeme gelmez.'],
  ],
  maltepe: [
    ['Sahil hattındaki binada asansör ve kapılarda paslanma hızlanıyor; ne yapılmalı?', 'Tuzlu havanın etkisini azaltmak için periyodik temizlik ve koruyucu boya işlerini bakım takvimine ekleyin, asansör ve panoların kontrolünü bakım sözleşmesinde ayrı kalem yapın.'],
    ['Yeni teslim edilen sitede müteahhitten hangi belgeler istenmeli?', 'Yönetim planı, onaylı projeler, iskân, ekipman garanti belgeleri, sayaç ve abonelik kayıtları ve ortak alanların tutanaklı teslimi istenmeli; eksikler tutanağa şerh düşülmelidir.'],
    ['Süreyyapaşa\'daki yüksek binada rüzgâr kaynaklı riskler için ne yapılır?', 'Fırtına öncesi balkon eşyaları için duyuru yapın, cephe elemanlarını ve çatı kaplamasını periyodik olarak gözle kontrol edin ve tespitleri kayda alın.'],
    ['Sosyal tesisli sitede spor salonunu az kullananlar gider paylaşımına itiraz ediyor; çözüm?', 'Tesis işletme giderlerini işletme projesinde ayrı kalem gösterin; paylaşım yönetim planı ve kurul kararıyla belirlenir. Plan değişikliği gerekiyorsa uygun nisapla karar alınmalıdır.'],
  ],
  kartal: [
    ['Kentsel dönüşümle yapılan yeni sitede ilk yönetim nasıl kurulur?', 'Kat malikleri kurulunu toplayıp yönetici ve denetçi seçin, yönetim planını kontrol edin, devir teslim belgelerini tutanakla alın ve ilk işletme projesini hazırlayın. Onaylı proje yoksa yönetici en geç üç ay içinde geçici proje hazırlar.'],
    ['Soğanlık\'taki büyük sitede borç biriktiren malikler yüzünden nakit akışı bozuluyor; ne yapılır?', 'Yazılı hatırlatma ve ihtar adımlarını prosedüre bağlayın; KMK m.20 uyarınca gecikme tazminatı ve icra takibi yolunu gecikmeden işletin. Süreç için avukat desteği alın.'],
    ['Orhantepe\'de sahile yakın binada cephe bakımı ne zaman yapılmalı?', 'Her yıl ilkbahar ve sonbaharda görsel kontrol yapın, korozyon ve çatlak tespitlerini kayda alın ve onarımı etaplayarak bütçeleyin.'],
    ['Yeni teslim sitede garanti kapsamındaki arızalar nasıl takip edilir?', 'Ekipman listesi ve garanti sürelerini bir tabloda tutun, arızaları yazılı ve ispatlanabilir yolla müteahhide bildirin ve süreleri takvime işleyin.'],
  ],
  umraniye: [
    ['Çok bloklu sitede bir bloğun asansör gideri ortak gidere nasıl yansıtılır?', 'Giderleri blok bazlı ve tüm siteyi ilgilendiren olarak ayırın; hangi kalemin hangi ölçüyle paylaşıldığını işletme projesinde gösterin. Yönetim planında yazan paylaşım ölçüsü esastır.'],
    ['Finanskent çevresindeki rezidansta kiracılar için şikâyet yönetimi nasıl kurulur?', 'Tek kanallı (telefon, uygulama veya form), kayıt numaralı bir talep sistemi kurun; kapanış sürelerini aylık raporlayın.'],
    ['İnkılap\'taki yeni sitede otopark kuralları kavgaya yol açıyor; ne yapılır?', 'Otopark kullanımı ve ücretlendirme yönetim planı ve kurul kararıyla yazılı belirlenmeli, ziyaretçi park kuralları duyurulmalıdır.'],
    ['Büyük sitede genel kurul yeter sayısı sağlanamıyor; ne yapılır?', 'Çağrıyı yazılı yapın, vekâlet usulünü planda netleştirin ve ikinci toplantı koşulları için hukuki dayanağı önceden doğrulayın.'],
  ],
  besiktas: [
    ['Bebek\'teki yalı tipi binada ortak onarım kararı nasıl alınır?', 'Koruma şartlarına uygun uzman teklifleriyle keşif yapın, işi etaplayın ve kararı nisaba uygun, yazılı gündemle alın. Koruma altındaysa izinleri önceden araştırın.'],
    ['Etiler\'deki rezidansta concierge ve güvenlik giderleri nasıl denetlenir?', 'Hizmet tanımını ölçülebilir göstergelerle yazın (yanıt süresi, vardiya, raporlama), aylık raporu denetçiye sunun ve yıllık sakin memnuniyet anketi uygulayın.'],
    ['Ortaköy\'de yoğun ziyaretçi nedeniyle çöp ve temizlik sorunu büyüyor; çözüm?', 'Hafta sonu ve yaz dönemleri için ayrı temizlik ve çöp toplama planı hazırlayın, kapalı çöp alanı ve ek vardiya ihtiyacını bütçeye yansıtın.'],
    ['Yüksek aidatlı sitede gider kalemlerine itirazlar artıyor; ne yapılır?', 'İşletme projesini kalem kalem hazırlayın, kurulda onaylatın ve geçici proje bedelinin yeniden değerleme oranı sınırına uygunluğunu kontrol edin.'],
  ],
  sisli: [
    ['Plaza-rezidans karma binada gürültü ve çalışma saatleri şikâyet yaratıyor; ne yapılır?', 'Yönetim planına veya kurul kararına saat sınırlarını yazın; ticari bölüm kullanım kurallarını yazılı duyurun ve ihlalde izlenecek adımları belirleyin.'],
    ['Nişantaşı\'ndaki eski apartmanda asansör yenilemesi pahalı çıktı; nasıl planlanır?', 'Keşif ve çoklu teklif alın, ödemeyi aylık avansa yayın ve kararı yazılı gündemle kurula götürün.'],
    ['Mecidiyeköy\'de ziyaretçi trafiği yüksek binada giriş kontrolü nasıl yapılır?', 'Randevu veya kimlik kaydı kuralını yazılı belirleyin, kayıtları kişisel veri ilkelerine uygun saklayın ve ziyaretçi yoğunluğuna göre vardiyayı planlayın.'],
    ['Yeni rezidansta konut ve ofis giderlerinin ayrı izlenmesi gerekir mi?', 'Kullanım yoğunluğu farklı olduğundan genellikle önerilir; yönetim planında ayrım yoksa plan değişikliği için uygun nisapla karar alınmalıdır.'],
  ],
  sariyer: [
    ['Zekeriyaköy\'deki villa sitesinde orman yangın riskine karşı ne yapılmalı?', 'Kuru dal ve çalı temizliği için mevsimsel takvim oluşturun, tahliye ve su kaynağı erişimini planlayın, çevre güvenlik devriyesinde yangın kontrolünü ekleyin.'],
    ['Maslak\'taki kuleyle ilgili enerji giderleri nasıl izlenir?', 'Alt sayaçlar ve aylık tüketim karşılaştırmasıyla olağan dışı artışları tespit edin, enerji etüdünü yatırım öncesi yaptırın.'],
    ['Tarabya\'daki Boğaz yapısında nem ve cephe sorunları için ne yapılır?', 'Yılda bir cephe ve çatı kontrolü yapın, nem tespitlerini kayda alın ve onarımı koruma şartlarına uygun uzmanlarla planlayın.'],
    ['Villa sitelerinde ortak sayaçlar (aydınlatma, sulama, havuz) nasıl yönetilir?', 'Abonelik sahibini ve tarifeyi kontrol edin, yönetim devrinde kayıtları tutanakla güncel yönetici adına geçirin.'],
  ],
  bakirkoy: [
    ['Ataköy\'deki etaplı sitede ortak gider hangi etaba yazılır?', 'Yönetim planı ve etap sınırlarına göre kalemler ayrılmalı; etap bazlı ve tüm yerleşimi ilgilendiren giderler işletme projesinde ayrı gösterilmelidir.'],
    ['Yeşilköy\'de deniz kıyısına yakın binada elektrik panolarında korozyon sorunu; ne yapılır?', 'Panoların düzenli temizliği ve kontrolü, koruyucu bakım ve gerekirse yenileme bütçesi planlayın; işlemleri yetkili elektrik mühendisliğiyle yapın.'],
    ['Florya\'daki bahçeli sitede havuz ve peyzaj giderleri ne zaman bütçelenir?', 'Havuz sezonu, budama ve sulama dönemlerini yıla yayarak işletme projesinde ayrı kalemlerle gösterin.'],
    ['Eski sitede yenileme ihtiyaçları birikti; aidatı birden artırmadan nasıl çözülür?', 'İhtiyaçları aciliyet sırasına koyup yıllara yayın, her iş için keşif ve çoklu teklif alın, kararı yazılı gündemle kurulda alın.'],
  ],
  basaksehir: [
    ['Binlerce dairelik sitede aidat takibi için hangi düzen kurulmalı?', 'Dijital kayıt, aylık borç listesi ve yazılı hatırlatma/ihtar prosedürü kurun; gecikme tazminatı ve icra yolunu önceden belirlenmiş adımlara bağlayın.'],
    ['Göletli sitede peyzaj ve gölet bakımı aidata nasıl yansıtılır?', 'Peyzaj, sulama ve gölet bakımını işletme projesinde ayrı kalem gösterin; mevsimsel giderleri yıla yayın.'],
    ['Toplu yapıda yönetim planı değiştirmek istiyoruz; kaç oy gerekir?', 'Birden fazla yapıdan oluşan toplu yapılarda KMK m.70 uyarınca üçte iki; tek yapılarda beşte dört. Sitenizin toplu yapı olup olmadığını tapu ve proje yapısından doğrulayın.'],
    ['Merkezi ısıtma ve hidrofor sistemlerinde arıza riski nasıl azaltılır?', 'Yedek ekipman ve bakım sözleşmesi planlayın, arıza durumunda iletişim zincirini yazılı belirleyin ve periyodik testleri kayda alın.'],
  ],
  beylikduzu: [
    ['Binlerce dairelik sitede otopark ve giriş çıkış düzeni nasıl kurulur?', 'Ziyaretçi kartı, geçici park ve plaka tanıma uygulamalarını kurul kararıyla belirleyin; kişisel veri ilkelerine uygun kayıt ve saklama süreleri belirleyin.'],
    ['Sosyal tesisli sitede havuz ve spor salonu giderleri nasıl paylaştırılır?', 'İşletme projesinde tesis giderlerini ayrı kalemle gösterin ve paylaşım ölçüsünü yönetim planıyla netleştirin.'],
    ['Gürpınar\'daki rüzgâra açık blokta cephe ve çatı kontrolü ne zaman yapılır?', 'Fırtına sezonu öncesi ve sonrası görsel kontrol yapın, tespitleri kayda alın ve onarımları etaplayın.'],
    ['Yeni teslim sitede sayaç aboneliği müteahhit adına kalmış; ne yapılır?', 'Abonelikleri site yönetimi adına devralın, ilk dönem fatura ve borç durumunu tutanakla müteahhitle netleştirin.'],
  ],
};

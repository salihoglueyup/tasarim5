/** Sözlük ayrıntı açıklamaları — 2. küme (teknik, güvenlik, tesis işletmesi ve genel kurul terimleri). */
import type { TermDetail } from './dictionaryDetails';

export const TERM_DETAILS_2: Record<string, TermDetail> = {
  'ozel-guvenlik-kimlik-karti': {
    explain: [
      "Özel güvenlik görevlisi kimlik kartı (ÖGG kartı / özel kimlik kartı), 5188 sayılı Kanun kapsamında görev yapacak personelin temel güvenlik eğitimini, sınavını ve güvenlik soruşturmasını tamamladığını gösteren resmi çalışma belgesidir. Güvenlik görevlisi nöbet ve görev sırasında kimlik kartını yakasında görünür biçimde bulundurmak zorundadır.",
      "Kartların geçerlilik süresi 5 yıldır ve süre sonunda yenileme eğitimi ile güncellenir. Site yönetimi, güvenlik şirketinden personelin kimlik kartlarının güncel olduğuna dair resmi doğrulama isteyebilir.",
    ],
    tips: ['Personel değişikliklerinde yeni görevlinin kartını kontrol edin.', 'Kart bilgilerini kişisel verilerin korunması ilkelerine uygun saklayın.'],
    faq: [
      ['Özel kimlik kartı (ÖGG kartı) nedir ve nasıl alınır?', '5188 sayılı Kanun kapsamında yetkili eğitim kurumlarından temel eğitimi tamamlayıp Emniyet Genel Müdürlüğü sınavında başarılı olan ve Valilik güvenlik soruşturmasından geçen kişilere verilen resmi özel güvenlik çalışma kimliğidir.'],
      ['ÖGG geçici kimlik kartı kimlere verilir?', 'Özel güvenlik sınavını kazanıp kimlik başvurusu ve harç işlemlerini tamamlayan adaylara, asıl kartları basılana kadar görev yapabilmeleri için mevzuattaki şartlar dahilinde Valilik/EGM sistemi üzerinden düzenlenen geçici belgedir.'],
      ['Kartı olmayan kişi güvenlik görevlisi olarak çalışabilir mi?', 'Hayır. Özel güvenlik hizmeti 5188 sayılı Kanun uyarınca yalnızca geçerli kimlik kartı olan personelle yürütülebilir; aksi hâl idari ve adli yaptırıma yol açar.'],
    ],
  },
  'plaka-tanima-sistemi-pts': {
    explain: [
      "Plaka tanıma sistemi (PTS), kameralarla araç plakalarını okuyup önceden tanımlı listelerle karşılaştırarak bariyer veya kapı geçişini yöneten sistemdir. Site girişlerinde sakin ve ziyaretçi araçlarının kayıt altına alınmasını sağlar.",
      "Plaka bilgisi kişisel veri sayılabileceğinden kayıt amacı, saklama süresi ve erişim yetkisi yazılı belirlenmeli, sakinler bilgilendirilmelidir. Kamera açıları yalnızca giriş-çıkış alanını kapsamalıdır.",
    ],
    tips: ['Saklama süresini amaca uygun kısa tutun.', 'Sistem arızasında manuel geçiş prosedürü belirleyin.'],
    faq: [['PTS kayıtları ne kadar saklanır?', 'Süre amaç için gerekli olandan uzun olmamalıdır; hukuk danışmanıyla netleştirip yönetim politikasında yazılı belirleyin.']],
  },
  'rfid-devriye-tur-kontrol-sistemi': {
    explain: [
      "RFID devriye tur kontrol sistemi, güvenlik görevlisinin site içindeki belirlenmiş noktalara yerleştirilmiş etiketleri okutarak devriyesini kayıt altına almasını sağlar. Okutma saatleri raporlanır ve devriyenin plana uygun yapılıp yapılmadığı izlenir.",
      "Sistem tek başına güvenlik sağlamaz; devriye rotasının risk analizine göre belirlenmesi ve raporların yönetime düzenli sunulması gerekir.",
    ],
    tips: ['Kontrol noktalarını yangın merdiveni, otopark ve çevre sınırı gibi riskli alanlara yerleştirin.', 'Devriye raporlarını aylık olay raporlarıyla birlikte inceleyin.'],
    faq: [['Devriye kayıtları kime sunulur?', 'Sözleşmede belirlenen sıklıkta yönetime ve denetçiye; kayıtlara erişim yetkisi yazılı olmalıdır.']],
  },
  'ozel-guvenlik-zorunlu-mali-sorumluluk-sigortasi': {
    explain: [
      "Özel güvenlik hizmeti verenlerin, hizmet sırasında üçüncü kişilere verebileceği zararlara karşı mali sorumluluk sigortası yaptırması mevzuatın aradığı şartlardandır. Sigorta, güvenlik hizmeti verilen tesis için de önem taşır.",
      "Site yönetimi sözleşme öncesinde poliçenin kapsamını, limitini ve geçerlilik süresini sorabilir. Poliçe kopyasının sözleşme ekinde bulunması hasar anında kapsam tartışmasını azaltır.",
    ],
    tips: ['Poliçe teminatını ve istisnalarını sözleşmede belirtin.', 'Yenileme tarihlerini takvime işleyin.'],
    faq: [['Sigorta güvenlik hizmetinin kalitesini garanti eder mi?', 'Hayır. Sigorta zarar halinde tazmin kapsamı sağlar; hizmet kalitesi sözleşme ve denetimle sağlanır.']],
  },
  'tesis-yonetimi-entegre-tesis-yonetimi': {
    explain: [
      "Entegre tesis yönetimi; temizlik, güvenlik, teknik bakım, peyzaj ve idari/mali işlerin tek bir yönetim çatısı altında planlanmasıdır. Amaç, ayrı ayrı yüklenicilerin yarattığı koordinasyon boşluklarını azaltmak ve sorumluluğu netleştirmektir.",
      "Entegre modelde hizmet kapsamı, ölçüm göstergeleri ve raporlama yazılı olarak tanımlanır. Her hizmetin ayrı kalemle fiyatlanması karşılaştırmayı ve denetimi kolaylaştırır.",
    ],
    tips: ['Hizmet kapsamını kalem kalem yazdırın.', 'Aylık raporların biçimini baştan netleştirin.'],
    faq: [['Entegre yönetim her bina için uygun mu?', 'Binanın büyüklüğüne ve ihtiyaçlarına bağlıdır; küçük binalarda kalem bazlı hizmet seçimi daha uygun olabilir.']],
  },
  'onleyici-bakim-preventive-maintenance': {
    explain: [
      "Önleyici bakım, arızanın oluşmasını beklemeden ekipmanın planlı olarak kontrol edilmesi, temizlenmesi ve gerekirse parça değişimi yapılmasıdır. Asansör, jeneratör, hidrofor, kazan ve yangın sistemleri gibi kritik ekipmanlarda uygulanır.",
      "Bakım sıklığı üretici önerileri ve ilgili mevzuata göre belirlenir. Her bakımın tarihli kaydı tutulur; arıza geçmişi, ekipman ömrü ve yedek parça ihtiyacı bu kayıtlardan planlanır.",
    ],
    tips: ['Ekipman envanteri çıkarıp her biri için bakım takvimi belirleyin.', 'Arıza ve bakım kayıtlarını dijital veya basılı düzenli tutun.'],
    faq: [['Önleyici bakım arızayı tamamen önler mi?', 'Hayır; arıza riskini ve ani duruş olasılığını azaltmaya yardımcı olur.']],
  },
  'bina-otomasyon-sistemi-bms': {
    explain: [
      "Bina otomasyon sistemi (BMS), ısıtma, soğutma, havalandırma, aydınlatma, enerji ölçümü ve bazı güvenlik sistemlerini merkezden izleyip yöneten yazılım ve donanım bütünüdür. Çalışma saatleri ve sensör verilerine göre ekipman çalışmasını ayarlayabilir.",
      "BMS yatırımının geri dönüşü bina yaşı, mevcut ekipman ve kullanım saatlerine göre değişir; yatırım öncesi ön enerji etüdü ve alternatif maliyet karşılaştırması önerilir. Sistemin işletme ve bakımı için yetkin personel gerekir.",
    ],
    tips: ['Alarm ve arıza bildirimlerinin kime gideceğini belirleyin.', 'Verilerin yedeklenmesi ve erişim güvenliğini planlayın.'],
    faq: [['BMS enerji tasarrufu sağlar mı?', 'Doğru yapılandırıldığında enerji tüketiminin izlenmesine ve optimize edilmesine yardımcı olabilir; sonuç tesise göre değişir.']],
  },
  'demirbas-avans-fonu': {
    explain: [
      "Demirbaş avans fonu, ortak alandaki ekipmanların yenilenmesi veya büyük onarımlar için kat maliklerinden toplanan ve ayrı izlenen birikimdir. Yönetim planı veya kurul kararıyla belirlenir; tutarı ve kullanım amacı yazılı olmalıdır.",
      "Fon, olağan aidattan ayrı bir kalemle muhasebeleştirilir. Kullanımı kurul kararı ve belgelerle yapılmalı, denetçi tarafından incelenmelidir.",
    ],
    tips: ['Fon tutarını ekipman ömrü ve yenileme planına göre belirleyin.', 'Fonun ayrı bir hesapta veya ayrı kayıtta izlenmesini sağlayın.'],
    faq: [['Fon toplamak zorunlu mu?', 'Yönetim planı ve kurul kararına bağlıdır; planınızdaki hükme bakın.']],
  },
  'merkezi-isi-pay-olcer': {
    explain: [
      "Isı pay ölçer, merkezi ısıtmalı binalarda her dairenin radyatörlerinden kullandığı ısı miktarını ölçen cihazdır. Bu veriler, toplam ısıtma giderinin bağımsız bölümlere tüketime göre dağıtılmasına dayanak olur.",
      "Paylaşım ölçüsü yönetim planı ve ilgili mevzuata göre belirlenir. Okuma tarihleri, cihaz arızaları ve itiraz süreçleri için yazılı bir prosedür bulunması uyuşmazlıkları azaltır.",
    ],
    tips: ['Okuma raporlarını sakinlere açıklamalı biçimde sunun.', 'Cihaz bakım ve pil değişim takvimini tutun.'],
    faq: [
      ['Merkezi pay ölçer ne demek?', 'Merkezi pay ölçer (ısı pay ölçer), merkezi ısıtmalı binalarda her dairenin radyatörlerine takılan ve o dairenin ısı kullanımını göreli birim olarak kaydeden cihazdır. Okunan değerler, ortak doğalgaz faturasının tüketime göre paylaştırılmasında kullanılır.'],
      ['Isıtma giderleri nasıl paylaşılır?', 'Mevzuat ve yönetim planı çerçevesinde bir kısmı sabit, bir kısmı tüketime göre dağıtılır; ayrıntılar için planınıza bakın.'],
    ],
  },
  'tse-hyb-12850-belgesi': {
    explain: [
      "TS 12850, havalandırma ve klima sistemleri için yetkili servislerin uyması gereken kuralları belirleyen Türk Standardıdır. Kapsamında klima santralleri, split ve VRF klimalar, soğutucu gruplar (chiller), fan-coil üniteleri, aspiratör ve vantilatörler, hava temizleyiciler ve hava perdeleri yer alır.",
      // claims-guard-ignore: sözlük tanımı: standart bilgilendirmesi, belge sahipliği iddiası yok
      "Standart; servis yerinin yapısal özelliklerini, işletmecilik kurallarını (kayıt, fatura, servis formu), teknik donanımı ve personelin yeterliliğini tanımlar. TSE, bu şartları karşılayan servislere Hizmet Yeterlilik Belgesi (HYB) verir. Bu belge site veya tesis yönetimi şirketleri için bir yönetim belgesi değildir.",
    ],
    tips: [
      'Sitenizin klima, havalandırma ve otopark/sığınak fanlarının bakımını yapan servis firmasından TS 12850 HYB belgesini ve geçerlilik tarihini isteyin.',
      'Belge numarasını TSE kayıtlarından doğrulayın.',
    ],
    faq: [
      // claims-guard-ignore: sözlük tanımı: standart bilgilendirmesi, belge sahipliği iddiası yok
      ['TS 12850 nedir?', 'Havalandırma ve klima sistemleri yetkili servislerinin yapısal, teknik donanım ve personel şartlarını belirleyen Türk Standardıdır; TSE uygun servislere Hizmet Yeterlilik Belgesi verir.'],
      ['Site yönetim şirketinin TS 12850 belgesi olması gerekir mi?', 'Hayır. TS 12850 bir yönetim belgesi değil, klima ve havalandırma servis belgesidir. Site yönetiminde bu belge, iklimlendirme bakımını yapan taşeron servisten istenir.'],
    ],
  },
  'site-isletme-butcesi': {
    explain: [
      "Site işletme bütçesi, sitenin yıllık gelir ve gider planıdır; işletme projesi bu bütçenin kat malikleri kurulunda onaylanan biçimidir. Personel, enerji, bakım sözleşmeleri, sigorta ve yedek fon gibi kalemler ayrı ayrı gösterilir.",
      "Bütçenin gerçekçi olması önceki yılın fiili giderlerine ve güncel sözleşme bedellerine dayanır. Yıl içinde sapmalar aylık raporlarla izlenir; ihtiyaç halinde ek proje hazırlanır.",
    ],
    tips: ['Büyük tek seferlik işleri olağan aidattan ayrı planlayın.', 'Aylık gerçekleşen-bütçe karşılaştırması sunun.'],
    faq: [['Bütçe kim tarafından onaylanır?', 'Kat malikleri kurulu onaylar; yönetici hazırlar.']],
  },
  'yesil-tesis-enerji-verimliligi': {
    explain: [
      "Enerji verimliliği, aynı hizmet düzeyini daha az enerjiyle sağlamayı hedefler. Tesislerde aydınlatmanın LED'e dönüşümü, ısı yalıtımı, verimli kazan ve klima sistemleri, sensörlü aydınlatma ve enerji izleme bu kapsamdadır.",
      "Önce tüketimin ölçülmesi gerekir; neyin ne kadar tükettiği bilinmeden yapılan yatırımın geri dönüşü belirsizdir. Yatırım öncesi enerji etüdü ve alternatiflerin maliyet karşılaştırması önerilir.",
    ],
    tips: ['Alt sayaçlarla ortak alan tüketimini ayrıştırın.', 'Aylık tüketimi önceki yılın aynı ayıyla kıyaslayın.'],
    faq: [['Enerji verimliliği yatırımı kendini ne zaman amorti eder?', 'Yatırıma, tesise ve enerji fiyatlarına göre değişir; ön etüt olmadan süre vaat edilemez.']],
  },
  'enerji-kimlik-belgesi-ekb': {
    explain: [
      "Enerji Kimlik Belgesi (EKB), bir binanın enerji performansını sınıflandıran ve yetkili uzmanlarca düzenlenen belgedir. Bina satış ve kiralamalarında ve yeni yapılarda mevzuata göre istenebilir.",
      "Belgeyi düzenlemeye yetkili kuruluşlar ve belge koşulları mevzuatla belirlenir. Site yönetimi, ortak alan verimliliğini artırmak için EKB sonuçlarını iyileştirme planına temel yapabilir.",
    ],
    tips: ['Belgenin geçerlilik ve yenileme şartlarını mevzuattan doğrulayın.', 'Yetkili olmayan kişilerden belge düzenlettirmeyin.'],
    faq: [
      ['EKB her bina için zorunlu mu?', 'Kapsam ve geçiş süreleri mevzuata bağlıdır; güncel yönetmeliğe bakın.'],
      ['Enerji sınıfları (A, B, C ... G) ne demek?', 'EKB, binanın yıllık enerji tüketimini aynı özellikteki bir referans binayla karşılaştırarak A (en verimli) ile G (en verimsiz) arasında bir sınıf verir. A ve B sınıfı binalar referansa göre belirgin biçimde daha az enerji tüketir; E, F ve G sınıfları ise iyileştirme ihtiyacına işaret eder.'],
      ['C sınıfı enerji ne demek? Yeni binalar hangi sınıfta olmalı?', 'C sınıfı, binanın enerji tüketiminin referans binaya yakın, yani ortalama düzeyde olduğunu gösterir. Mevzuat yeni binalarda asgari C sınıfını hedefler; mevcut binalarda yalıtım, pencere, ısıtma sistemi ve aydınlatma iyileştirmeleriyle sınıf yükseltilebilir.'],
      ['TOKİ evlerinin enerji sınıfı nasıl öğrenilir?', 'Her bağımsız bölümün veya binanın enerji sınıfı, düzenlenmiş Enerji Kimlik Belgesi üzerinde yazar. Belge yoksa yetkili EKB uzmanına hesaplatılır; site yönetimi ortak alan iyileştirmelerini bu sonuca göre planlayabilir.'],
    ],
  },
  'yangin-sondurme-ve-duman-tahliye-sistemi': {
    explain: [
      "Yangın söndürme ve duman tahliye sistemleri; yangın algılama, alarm, sprinkler, yangın dolapları, söndürücüler, acil aydınlatma ve duman tahliye fanlarını kapsar. Bu sistemlerin gereksinimleri Binaların Yangından Korunması Hakkında Yönetmelik gibi mevzuata göre belirlenir.",
      "Sistemlerin düzenli test edilmesi, tarihli ve imzalı raporlarla kayıt altına alınması gerekir. Tahliye planı ve yılda en az bir tatbikat, sakinlerin hazırlığını artırır.",
    ],
    tips: ['Yangın merdivenlerini ve çıkış yollarını her zaman açık tutun.', 'Söndürücü dolum tarihlerini takip edin.'],
    faq: [['Yangın tatbikatı gerekli mi?', 'Büyük yapılarda ve ilgili mevzuatın aradığı hâllerde gerekir; her sitede periyodik tahliye tatbikatı önerilir.']],
  },
  'iskan-yapi-kullanma-izin-belgesi': {
    explain: [
      "İskân (yapı kullanma izin belgesi), yapının ruhsat ve projesine uygun tamamlandığını ve kullanıma elverişli olduğunu gösteren belgedir. Kat irtifakından kat mülkiyetine geçiş ve abonelik işlemleri için gereklidir.",
      "Yeni teslim edilen sitelerde iskânın alınmış olması, sığınak ve itfaiye raporları gibi belgelerin eksiksiz bulunması devir teslimde kontrol edilmelidir.",
    ],
    tips: ['İskân ve ilgili raporların kopyalarını yönetim arşivine alın.', 'Eksik belgeleri müteahhide yazılı bildirin.'],
    faq: [['İskânsız yapıda yönetim kurulabilir mi?', 'Yönetim fiilen yürütülebilir; ancak tapu ve abonelik işlemleri bakımından sorunlar çıkabilir, hukuki danışmanlık alın.']],
  },
  'su-deposu-dezenfeksiyonu-ve-analizi': {
    explain: [
      "Su depoları periyodik olarak boşaltılıp mekanik olarak temizlenmeli ve uygun dezenfektanlarla dezenfekte edilmelidir. İşlem sonrası numune alınıp analiz yaptırılması suyun kullanıma uygunluğunu belgeler.",
      "Temizlik sıklığı ve analiz kapsamı ilgili mevzuata göre belirlenir. İşlemi yapan firmanın yetkili olması, işlem tarihlerinin ve analiz raporlarının saklanması önemlidir.",
    ],
    tips: ['Temizlik takvimini yıllık bakım planına ekleyin.', 'Depo kapak ve havalandırmalarının kapalı ve temiz olduğunu kontrol edin.'],
    faq: [['Analiz raporu zorunlu mu?', 'Gereklilik mevzuata ve uygulamaya bağlıdır; raporlu işlem hem güvence hem delil sağlar.']],
  },
  'havuz-bakimi-ve-kimyasal-operasyonu': {
    explain: [
      "Havuz bakımı; su kimyasının (pH, serbest klor, alkalinite, stabilizatör) düzenli ölçülmesi, filtrasyon ve sirkülasyon sisteminin bakımı ve havuz çevresi hijyenini kapsar. Ölçümler günlük kayıt altına alınmalıdır.",
      "Kimyasalların güvenli depolanması önemlidir: klor ve asit asla yan yana saklanmamalı, personel koruyucu ekipman kullanmalıdır. Sezon açılışı ve kış kapatma ayrı prosedürlerle yürütülür.",
    ],
    tips: ['Günlük ölçüm kayıtlarını tutun.', 'Su bulanıksa veya değerler dengelenmiyorsa uzman çağırın.'],
    faq: [['Havuz suyu neden yeşile döner?', 'Genellikle yetersiz dezenfeksiyon veya dengesiz pH nedeniyle yosun oluşur; uzman önerisiyle düzeltilir.']],
  },
  'peyzaj-ve-otomatik-sulama-yonetimi': {
    explain: [
      "Peyzaj yönetimi; çim biçme, budama, gübreleme, mevsimlik bitki değişimi ve sulama sisteminin işletilmesini içerir. Otomatik sulama, zamanlayıcı ve yağmur sensörleriyle bitki ihtiyacına göre su verilmesini hedefler.",
      "Sulama sistemi kış öncesi boşaltılmalı, bahar başında kontrol edilip devreye alınmalıdır. Bakım takvimi yıla yayılırsa bütçe dalgalanmaları azalır.",
    ],
    tips: ['Sulama saatlerini sabah erken veya akşam yapın.', 'Kuru dal ve ağaç kontrolünü fırtına öncesi yapın.'],
    faq: [['Peyzaj bakımı aidatta ayrı kalem midir?', 'İşletme projesinde ayrı kalem olarak gösterilmesi şeffaflık sağlar.']],
  },
  'vektor-ve-hasere-ilaclama-biyosidal': {
    explain: [
      "Haşere ve vektör mücadelesi, bina ortak alanlarında zararlı canlıların kontrolünü kapsar. Uygulamalarda ruhsatlı biyosidal ürünler ve yetkili uygulayıcılar kullanılmalıdır.",
      "Uygulama öncesinde sakinler bilgilendirilmeli, çocuk ve evcil hayvanlar için bekleme süreleri gözetilmeli, kullanılan ürün bilgileri ve uygulama formları saklanmalıdır.",
    ],
    tips: ['Periyodik programı sezon ve risk durumuna göre belirleyin.', 'Çöp odası ve bodrum gibi riskli alanları öncelikleyin.'],
    faq: [
      ['Vektör ilaçlama nedir?', 'Vektör ilaçlama; sivrisinek, karasinek, hamamböceği, kene ve kemirgen gibi hastalık taşıyabilen canlılara (vektörlere) karşı ruhsatlı biyosidal ürünlerle yapılan kontrol uygulamasıdır. Sitelerde çöp odası, bodrum, sığınak, rögar ve peyzaj alanları öncelikli uygulama noktalarıdır.'],
      ['Biyosidal ilaçlama nedir, tarım ilacından farkı ne?', 'Biyosidal ürünler, insan ve hayvan sağlığını korumak amacıyla zararlı organizmaları kontrol eden ve Sağlık Bakanlığı tarafından ruhsatlandırılan ürünlerdir. Yaşam alanlarında tarım ilacı (pestisit) değil, ruhsatlı biyosidal ürün ve yetkili uygulayıcı kullanılmalıdır.'],
      ['İlaçlama sonrası ortak alan ne zaman kullanılır?', 'Ürünün etiketindeki bekleme süresine göre; uygulayıcının yönlendirmesine uyun.'],
    ],
  },
  'jenerator-periyodik-bakimi-ve-yuk-testi': {
    explain: [
      "Jeneratör, şebeke kesintisinde kritik sistemleri (asansör, yangın pompası, hidrofor, aydınlatma) besleyen yedek güç kaynağıdır. Periyodik bakım; yağ ve filtre değişimi, akü ve şarj kontrolü, soğutma ve yakıt sistemi kontrolünü içerir.",
      "Periyodik yüksüz çalıştırma testi ve uygun aralıklarla yük testi, jeneratörün ihtiyaç anında devreye girmesini doğrulamaya yardımcı olur. Bakım sıklığı üretici kılavuzuna uygun belirlenmelidir.",
    ],
    tips: ['Yakıt seviyesini ve kalitesini düzenli kontrol edin.', 'Test sonuçlarını tarihli kayıt altına alın.'],
    faq: [['Jeneratör ne sıklıkla test edilmelidir?', 'Üreticinin önerdiği sıklıkta; genel uygulamada düzenli yüksüz çalıştırma testleri yapılır.']],
  },
  'hidrofor-ve-basinc-dengeleme-sistemi': {
    explain: [
      "Hidrofor, şebeke basıncının yetmediği binalarda suyu üst katlara ileten pompa ve basınç tankı sistemidir. Basınç dengeleme, musluklarda dalgalanmayı azaltmaya yardımcı olur.",
      "Pompaların dönüşümlü çalıştırılması, basınç tankı ön basıncının kontrolü ve pano bakımı arızaları azaltır. Yedekli pompa varsa test edilmelidir.",
    ],
    tips: ['Basınç değerlerini kayıt altına alın.', 'Yedek pompayı belirli aralıklarla devreye alıp test edin.'],
    faq: [['Hidrofor arızasında ne yapılmalı?', 'Yetkili servisi arayın; süre ve kapsam bakım sözleşmenizdeki hükümlere bağlıdır.']],
  },
  'cctv-kamera-guvenlik-sistemi': {
    explain: [
      "CCTV, ortak alanları kameralarla izleyen ve kaydeden güvenlik sistemidir. Giriş-çıkışlar, otopark ve çevre sınırı gibi alanlara konumlandırılır.",
      "Kayıtlar kişisel veri niteliği taşır; kamera yerleri, saklama süresi ve erişim yetkisi yazılı belirlenmeli, sakinlere bilgilendirme yapılmalıdır. Kameralar daire içini veya özel yaşam alanlarını görecek şekilde yönlendirilmemelidir.",
    ],
    tips: ['Kör nokta taramasını kurulum öncesi yapın.', 'Kayıt cihazına erişimi yetkili kişilerle sınırlayın.'],
    faq: [['Kayıtlar kimlerle paylaşılabilir?', 'Yetkili kolluk veya yargı makamlarının talebi gibi hukuki dayanak olduğunda; paylaşımı kayıt altına alın.']],
  },
  'nizamiye-guvenlik-protokolu': {
    explain: [
      "Nizamiye protokolü, sitenin giriş kapısında kimlik kontrolü, ziyaretçi ve kurye kabulü, araç geçişi ve kayıt tutulması ile ilgili yazılı kurallardır. Protokol görevli değişse de aynı standardın uygulanmasını sağlar.",
      "Ziyaretçi teyidi için sakinle iletişim yöntemi, kargo kabul düzeni ve olağandışı durumlarda yapılacaklar protokolde yer almalıdır. Kayıtlar kişisel verilerin korunmasına uygun tutulmalıdır.",
    ],
    tips: ['Protokolü sakinlere duyurun.', 'Yılda en az bir kez gözden geçirin.'],
    faq: [
      ['Nizamiye takip sistemi nedir?', 'Nizamiye takip sistemi; site veya tesis girişinde ziyaretçi, kurye, teknik servis ve araç giriş-çıkışlarının dijital ya da yazılı olarak kaydedildiği, sakin onayının alındığı ve gerektiğinde geriye dönük raporlanabildiği kontrol düzenidir. Plaka tanıma, QR davetiye ve ziyaretçi kayıt yazılımlarıyla desteklenebilir.'],
      ['Nizamiye kayıtları ne kadar süre saklanır?', 'Kayıtlar kişisel veri içerdiğinden saklama süresi ve erişim yetkisi KVKK ilkelerine göre yazılı belirlenmeli, amaç dışında kullanılmamalıdır.'],
      ['Kuryeler sitenin içine girebilir mi?', 'Protokolde belirlenen kurallara bağlıdır; birçok sitede teslim nizamiye veya lobide yapılır.'],
    ],
  },
  'kat-irtifakindan-kat-mulkiyetine-gecis': {
    explain: [
      "Kat irtifakı kurulu bir yapıda inşaat tamamlanıp iskân alındığında, bağımsız bölümler için kat mülkiyetine geçilir. Bu geçiş tapu müdürlüğünde yapılır ve maliklerin tapuları kat mülkiyeti olarak güncellenir.",
      "Geçişten sonra yönetim planı, kat malikleri kurulu ve yönetici düzeni tam olarak işlemeye başlar. Müteahhitten devir teslim ve ilk işletme projesi bu dönemde hazırlanmalıdır.",
    ],
    tips: ['İskân ve ilgili belgelerin tamamlandığından emin olun.', 'Geçici yönetimden asıl yönetime devri tutanakla yapın.'],
    faq: [['Geçişi kim başlatır?', 'Genellikle müteahhit veya malikler tapu müdürlüğüne gerekli belgelerle başvurur; ayrıntı için tapu müdürlüğüne danışın.']],
  },
  'siginak-yonetmeligi-ve-alan-kullanimi': {
    explain: [
      "Sığınaklar, mevzuata göre bazı yapılarda yapılması gerekli ortak alanlardır. Sığınak alanlarının amacı dışında kullanımı ve depolama gibi uygulamalar için mevzuattaki sınırlamalara dikkat edilmelidir.",
      "Sığınağın erişilebilir, havalandırması çalışır ve temiz tutulması yönetimin sorumluluğundadır. Kullanım kuralları yönetim planı ve kurul kararlarıyla belirlenir.",
    ],
    tips: ['Sığınak kapı ve havalandırma sistemini periyodik kontrol edin.', 'Kullanım kurallarını yazılı duyurun.'],
    faq: [['Sığınağı depo olarak kullanabilir miyiz?', 'Kullanım amacı ve sınırları mevzuata bağlıdır; uygulama öncesi ilgili idareden ve hukuk danışmanından görüş alın.']],
  },
  'atik-yonetimi-ve-sifir-atik-belgesi': {
    explain: [
      "Atık yönetimi; atıkların ayrı toplanması, geçici depolanması ve ilgili kuruluşlara teslimini kapsar. Sıfır Atık yaklaşımı, atığın kaynağında azaltılmasını ve ayrıştırılmasını teşvik eder.",
      "Büyük sitelerde atık ayrıştırma için yeterli kap, işaretli alan ve toplama saatleri belirlenmeli, tehlikeli atıklar (pil, atık yağ, ilaç) ayrıca değerlendirilmelidir. Belge ve başvuru koşulları için ilgili idarenin güncel mevzuatına bakılmalıdır.",
    ],
    tips: ['Sakinlere ayrıştırma kuralı için kısa bir yönerge dağıtın.', 'Atık teslim kayıtlarını saklayın.'],
    faq: [['Sıfır Atık Belgesi zorunlu mu?', 'Kapsam ve yükümlüler mevzuata göre belirlenir; güncel yönetmeliği ve ilgili idareyi kontrol edin.']],
  },
  'asansor-kirmizi-sari-mavi-yesil-etiket': {
    explain: [
      "Periyodik muayene sonucunda asansöre yeşil, mavi, sarı veya kırmızı etiket yapıştırılır. Yeşil etiket uygunluğu; mavi ve sarı etiketler giderilmesi gereken kusurları gösterir, kırmızı etiket ise asansörün kullanılmaması gerektiği anlamına gelir.",
      "Kusur giderme süreleri yönetmelikte belirlidir. Kırmızı etiketli asansör çalıştırılırsa hukuki sorumluluk doğabileceğinden bakım firmasıyla revizyon derhal planlanmalıdır.",
    ],
    tips: ['Muayene raporlarını tarih sırasıyla saklayın.', 'Etiket süresi dolmadan yeniden muayene planlayın.'],
    faq: [
      ['Asansör yeşil etiket nedir?', 'Yeşil etiket, A tipi muayene kuruluşunun yıllık periyodik kontrolünde asansörün güvenli ve kullanıma uygun bulunduğunu gösteren etikettir. Bir sonraki periyodik kontrole kadar geçerlidir.'],
      ['Mavi, sarı ve kırmızı etiket ne demek?', 'Mavi etiket hafif kusurları, sarı etiket giderilmesi gereken kusurları gösterir; bu kusurlar yönetmelikte belirtilen süre içinde giderilip yeniden kontrol yaptırılmalıdır. Kırmızı etiket güvensiz anlamına gelir ve asansör kullanıma kapatılır.'],
      ['Asansör yeşil etiket maliyeti ne kadar?', 'Periyodik kontrol ücreti, muayene kuruluşunun tarifesine ve asansörün tipine/durak sayısına göre değişir. Kusur giderme (revizyon) maliyeti ise tespit edilen eksiklere bağlıdır; bakım firmasından kalem kalem teklif alınmalıdır.'],
      ['Etiket kimin sorumluluğunda yenilenir?', 'Muayene yaptırma sorumluluğu bina yönetimine aittir; bakım sözleşmesinde nasıl işleneceği yazılmalıdır.'],
    ],
  },
  'termal-kamera-ile-enerji-kacagi-tespiti': {
    explain: [
      "Termal kamera, yüzey sıcaklık farklarını görüntüleyerek yalıtım eksikliklerini, ısı köprülerini ve elektrik panolarındaki aşırı ısınmaları tespit etmeye yardımcı olur. Cephe, çatı ve pano kontrolünde kullanılır.",
      "Ölçüm koşulları (iç-dış sıcaklık farkı, hava durumu) sonucu etkiler; değerlendirme yetkin uzmanlarca yapılmalıdır. Tespit edilen sorunlar için onarım planı ve bütçesi ayrıca oluşturulur.",
    ],
    tips: ['Ölçümü ısıtma sezonunda yapın.', 'Rapora fotoğraf ve konum bilgisi ekletin.'],
    faq: [['Termal kamera sonucu kesin tasarruf hesabı verir mi?', 'Hayır; sorunları gösterir. Tasarruf miktarı yapılan iyileştirmeye ve kullanıma göre değişir.']],
  },
  'plaza-tesis-yonetimi-ortak-gider-paylasimi': {
    explain: [
      "Plaza ve iş merkezlerinde ortak giderler genellikle bağımsız bölümlerin metrekaresi veya arsa payı üzerinden, bazı kalemlerde ise alt sayaç ölçümüne göre paylaştırılır. Yönetim planı ve kira sözleşmeleri paylaşım biçimini belirler.",
      "Ofis kiracılarına faturalama şeffaf olmalıdır: hangi giderin hangi ölçüyle dağıtıldığı yazılı bulunmalı, alt sayaç verileri paylaşılmalıdır.",
    ],
    tips: ['Alt sayaç altyapısını yatırım planına dahil edin.', 'Kira sözleşmesinde gider paylaşım maddesini açık yazın.'],
    faq: [['Kiracı plaza ortak giderlerine katılır mı?', 'Kira sözleşmesi ve yönetim planı belirler; olağan işletme giderlerinde kiracının payı sözleşmeye göre değişir.']],
  },
  'rezidans-luks-site-yonetimi-standartlari': {
    explain: [
      "Rezidans ve lüks sitelerde hizmet standartları concierge, güvenlik, vale, havuz ve spa işletmesi gibi ek hizmetler içerir. Bu hizmetlerin maliyeti bütçeye yansıdığından kalem kalem gösterilmesi ve ölçülebilir hedeflere bağlanması önemlidir.",
      "Sakin memnuniyeti, talep kayıt ve kapanış süreleri, yanıt süresi hedefleri ve raporlama sıklığı gibi göstergelerle izlenebilir. Hizmet sözleşmesinde bu göstergelerin yazılı olması beklentileri netleştirir.",
    ],
    tips: ['Concierge vardiya saatlerini ve sorumluluklarını yazılı tanımlayın.', 'Yıllık sakin memnuniyet anketini uygulayın.'],
    faq: [['Rezidans aidatı neden yüksektir?', 'Concierge, güvenlik, havuz ve otomasyon gibi ek hizmetlerin işletme maliyetleri bütçeye yansır.']],
  },
  'endustriyel-tesis-osb-yonetimi': {
    explain: [
      "Endüstriyel tesis ve organize sanayi bölgesi (OSB) yönetimi; altyapı, enerji, atık, yangın güvenliği ve iş sağlığı ve güvenliği gibi konuları kapsar. Konut yönetiminden farklı olarak mevzuat çerçevesi 6331 sayılı İSG Kanunu, çevre mevzuatı ve OSB mevzuatını içerir.",
      "Periyodik kontroller (basınçlı kaplar, kaldırma ekipmanları, elektrik tesisatı, yangın sistemleri) tarihli ve imzalı raporlara bağlanmalıdır. İSG sorumluluğu işverende kalır; tesis yönetimi bu süreçlerin takibini destekler.",
    ],
    tips: ['Periyodik kontrol takvimini bir tabloda toplayın.', 'Alt işveren sözleşmelerine İSG yükümlülüklerini yazın.'],
    faq: [['OSB yönetimi konut sitesi yönetiminden nasıl farklıdır?', 'Mevzuat, riskler ve teknik altyapı farklıdır; sorumluluklar sözleşmede ayrıca belirlenmelidir.']],
  },
  'tesis-yonetimi-ihale-sartnamesi-rfp': {
    explain: [
      "Tesis yönetimi ihale şartnamesi (RFP), hizmet kapsamını, performans göstergelerini, sözleşme koşullarını ve değerlendirme ölçütlerini içeren belgedir. Firmalardan karşılaştırılabilir teklif almayı sağlar.",
      "Şartnamede bağımsız bölüm sayısı, ortak alan envanteri, istenen hizmetler ve raporlama beklentisi yer almalıdır. Teklifler aynı kapsam üzerinden karşılaştırılırsa fiyat farkları anlamlı olur.",
    ],
    tips: ['Referans doğrulama ve yerinde inceleme şartı ekleyin.', 'Devir-teslim ve fesih koşullarını şartnameye yazın.'],
    faq: [['Şartnameyi kim hazırlar?', 'Yönetim kurulu veya görevlendirdiği komisyon hazırlar; hukuk danışmanı sözleşme koşullarını gözden geçirebilir.']],
  },
  'kat-mulkiyeti-kanunu-madde-37-isletme-projesi': {
    explain: [
      "KMK m.37, yöneticinin yıllık işletme projesini hazırlamasını düzenler. 7579 sayılı Kanun'dan sonra proje kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç üç ay içinde onaylanacak geçici proje hazırlar.",
      "Mevcut projesi olan sitelerde geçici projedeki bedel, bir önceki yıla ilişkin yeniden değerleme oranını aşamaz. Onay ve bildirimin kayıtlarının tutulması aidat tahsilatı açısından önemlidir.",
    ],
    tips: ['Projeyi kalem kalem hazırlayın.', 'Bildirim ve onay belgelerini saklayın.'],
    faq: [['KMK m.37 neyi düzenler?', 'Yıllık işletme projesinin hazırlanması, onayı ve geçici proje usulünü düzenler.']],
  },
  'kat-mulkiyeti-kanunu-madde-20-aidat-borcu': {
    explain: [
      "KMK m.20, ortak giderlere katılım kurallarını ve gecikme tazminatını düzenler: yönetim planında aksi yoksa hizmetli giderlerinde eşit, diğer ortak giderlerde arsa payı oranında katılım; ödemede gecikme için aylık yüzde beş tazminat.",
      "Borcunu ödemeyen kat malikine karşı yönetici veya diğer kat malikleri dava açabilir ya da icra takibi yapabilir. Kiracı, kira miktarı kadar malikle birlikte sorumlu olabilir (m.22).",
    ],
    tips: ['Borç dökümünü ay ay tutun.', 'Hatırlatma ve ihtar adımlarını yazılı prosedüre bağlayın.'],
    faq: [['Aidat borcunda zamanaşımı var mı?', 'Alacağın tabi olduğu süreler somut olaya göre değişir; gecikmeden hukuk danışmanından görüş alın.']],
  },
  'ogg-karti-ozel-guvenlik-gorevlisi-kimlik-karti': {
    explain: [
      "ÖGG kartı (Özel Güvenlik Görevlisi Kimlik Kartı / Özel Kimlik), 5188 sayılı Kanun kapsamında özel güvenlik görevlisi olarak çalışacak kişiye Valilik tarafından verilen resmi kimlik kartıdır. Silahsız (18 yaş, en az ortaokul) ve silahlı (21 yaş, en az lise) olmak üzere iki türü vardır.",
      "Kartın geçerlilik süresi 5 yıldır; süre bitiminde yenileme eğitimi alınarak yenilenir. Site, rezidans ve ticari tesis yönetimleri, güvenlik personelinin ÖGG kimlik kartı geçerliliğini göreve başlamadan önce kontrol etmelidir.",
    ],
    tips: ['Yeni görevlinin kartını göreve başlamadan önce kontrol edin.', 'Kart bilgilerini kişisel verilerin korunması ilkelerine uygun saklayın.'],
    faq: [
      ['ÖGG kartı (özel kimlik kartı) nasıl alınır?', 'Yetkili özel güvenlik eğitim kurumunda temel eğitimi tamamlayıp EGM özel güvenlik sınavında başarılı olduktan sonra sağlık raporu ve güvenlik soruşturması ile Valiliğe başvurularak alınır.'],
      ['ÖGG geçici kimlik kartı kimlere verilir?', 'Sınavı kazanıp Valilik başvuru ve güvenlik soruşturması süreçleri olumlu sonuçlanan adaylara, fiziki kimlik kartı teslim edilene kadar geçici süreyle çalışma imkânı tanıyan resmi belgedir.'],
      ['Kartı olmayan kişi güvenlik görevlisi olarak çalışabilir mi?', 'Hayır. Özel güvenlik hizmeti kimlik kartı olan personelle yürütülmelidir.'],
      ['Özel kimlik nedir, ÖGG ne demek?', "ÖGG, Özel Güvenlik Görevlisi'nin kısaltmasıdır. \"Özel kimlik\" veya \"özel kimlik kartı\" ifadesi çoğunlukla 5188 sayılı Kanun kapsamında özel güvenlik görevlisine Valilik tarafından verilen kimlik kartını anlatır."],
      ['Özel güvenlik kimlik kartı kaç yıl geçerlidir?', 'Kartın geçerlilik süresi 5 yıldır; süre bitiminde yenileme eğitimi alınarak yenilenir. Güncel şartlar için ilgili Valilik birimini teyit edin.'],
    ],
  },
  'kmk-45-onemli-isler-oybirligi-kararlari': {
    explain: [
      "634 sayılı Kat Mülkiyeti Kanunu Madde 45; ana taşınmazın bir hakla kayıtlanması, arsanın bölünmesi ve bölünen kısmın mülkiyetinin başkasına devrolunması gibi önemli işler veya ortak yerlerin (çatı, dış cephe, bahçe, kapıcı dairesi) kiraya verilmesi gibi tasarruflar için bütün kat maliklerinin oybirliğini şart koşar.",
      "Oybirliği sağlanmadan ortak alanların üçüncü kişilere (baz istasyonu, reklam panosu, ticari işletme vb.) kiralanması hukuken geçersiz sayılabilir ve her kat maliki Sulh Hukuk Mahkemesi'nde müdahalenin önlenmesi veya iptal davası açabilir.",
    ],
    tips: [
      'Ortak alan kiralama sözleşmelerinden önce tüm maliklerin yazılı oybirliğini karar defterine işleyin.',
      'Dış cephe reklamı veya çatı baz istasyonu kararlarında KMK m.45 oybirliği kuralını dikkate alın.',
    ],
    faq: [
      ['KMK Madde 45 hangi kararlarda oybirliği arar?', 'Ana taşınmazın bir hakla kayıtlanması, arsanın bölünmesi ve ortak yerlerin (dış cephe, çatı, kapıcı dairesi vb.) üçüncü kişilere kiraya verilmesi gibi önemli işlerde tüm kat maliklerinin oybirliği şarttır.'],
      ['Oybirliği olmadan ortak alan kiraya verilirse ne olur?', 'Rızası olmayan herhangi bir kat maliki Sulh Hukuk Mahkemesi\'ne başvurarak kararın iptalini ve ortak alana el atmanın önlenmesini talep edebilir.'],
    ],
  },
  'kmk-37-isletme-projesi-butce-itiraz-suresi': {
    explain: [
      "KMK m.37, yöneticinin yıllık işletme projesini hazırlamasını düzenler. 7579 sayılı Kanun'dan sonra proje kat malikleri kurulunda onaylanır; onaylı proje yoksa yönetici en geç üç ay içinde onaylanacak geçici proje hazırlar.",
      "Mevcut projesi olan sitelerde geçici projedeki bedel, bir önceki yıla ilişkin yeniden değerleme oranını aşamaz. Projeye itiraz ve kesinleşme usulü için güncel mevzuat ve hukuk danışmanı esas alınmalıdır; eski usule ait ifadeler 7579 sonrası geçerliliği açısından teyit edilmelidir.",
    ],
    tips: ['Projeyi kalem kalem hazırlayın ve bildirim kayıtlarını saklayın.', 'İtiraz ve kesinleşme sürelerini hukuk danışmanıyla netleştirin.'],
    faq: [['KMK m.37 neyi düzenler?', 'Yıllık işletme projesinin hazırlanması, onayı ve geçici proje usulünü düzenler.']],
  },
  'kmk-ne-demek-634-sayili-kat-mulkiyeti-kanunu': {
    explain: [
      "KMK, 634 sayılı Kat Mülkiyeti Kanunu'nun kısaltmasıdır. Bir binadaki bağımsız bölümlerin ayrı mülkiyetini ve ortak yerlerin yönetimini düzenler: kat irtifakı ve kat mülkiyeti, yönetim planı, kat malikleri kurulu, yönetici, denetçi ve ortak giderlere katılım.",
      "Kanun 22 Mayıs 2026 tarihli 7579 sayılı Kanun'la bazı maddelerinde (35, 37, 70) değişmiştir. Güncel metin için Resmî Gazete ve mevzuat.gov.tr esas alınmalıdır.",
    ],
    tips: ['Önce yönetim planınızı okuyun.', 'Önemli kararlarda hukuk danışmanından görüş alın.'],
    faq: [['KMK ve kat mülkiyeti aynı şey mi?', 'Kat mülkiyeti hukuki kavramdır; KMK onu düzenleyen kanundur.']],
  },
};

/**
 * KMK 634 & Tesis Yönetimi Resmi Hukuki Belge ve Karar Şablonları (officialLegalDocumentsData.ts)
 * 
 * Avukat onaylı, 634 Sayılı Kat Mülkiyeti Kanunu ve İİK 68 uyumlu 8 resmi tutanak ve ihtarname metni.
 * Schema.org DigitalDocument & Legislation için yapılandırılmış veri kaynağıdır.
 */

export interface LegalDocumentTemplate {
  id: string;
  title: string;
  shortTitle: string;
  kmkArticleRef: string;
  category: 'genel-kurul' | 'aidat-icra' | 'yonetim-yetki' | 'ortak-alan';
  purpose: string;
  legalValidityCondition: string;
  templateText: string;
  schemaDescription: string;
}

export const OFFICIAL_LEGAL_DOCUMENTS: LegalDocumentTemplate[] = [
  {
    id: 'yonetici-secim-karari',
    title: 'Apartman ve Site Yöneticisi Seçim Karar Tutanağı',
    shortTitle: 'Yönetici Seçim Kararı',
    kmkArticleRef: '634 Sayılı KMK Madde 34 & 35',
    category: 'yonetim-yetki',
    purpose: 'Kat Malikleri Genel Kurulu’nda hem kişi hem de arsa payı bakımından salt çoğunluk (%50+1) ile yönetici seçimi ve yetkilendirilmesi.',
    legalValidityCondition: 'Kat maliklerinin hem sayı (kişi) hem de arsa payı bakımından salt çoğunluğu (%50+1) tarafından imzalanması ve Karar Defteri’ne işlenmesi şarttır.',
    schemaDescription: 'KMK Madde 34 çift çoğunluk kuralına tam uyumlu yönetici seçimi, banka hesabı yetkilendirmesi ve icra takip salahiyeti karar tutanağı.',
    templateText: `T.C.
KAT MALİKLERİ KURULU KARAR DEFTERİ TUTANAĞI

APARTMAN / SİTE ADI : [SİTE VEYA APARTMAN ADI]
KARAR TARİHİ         : [GÜN / AY / YIL]
KARAR NO             : 2026 / [NO]
TOPLANTI YERİ        : [TOPLANTI ADRESİ / SİTE SOSYAL TESİSİ]
TOPLANTI BAŞKANI     : [DİVAN BAŞKANI ADI SOYADI]

GÜNDEM: 634 Sayılı Kat Mülkiyeti Kanunu Madde 34 ve Yönetim Planı Uyarınca Yönetici / Yönetim Şirketi Seçimi, Yetki Sınırları ve Banka Temsil Yetkisinin Belirlenmesi.

KARAR METNİ:
[SİTE VEYA APARTMAN ADI] Kat Malikleri Kurulu, yukarıda belirtilen tarih ve saatte toplanmış; yapılan hazirun yoklamasında ana gayrimenkuldeki toplam [TOPLAM DAİRE SAYISI] bağımsız bölüm malikinden [KATILAN DAİRE SAYISI] adedinin asaleten veya vekaleten hazır bulunduğu, arsa payı bakımından ise toplam [KATILAN ARSA PAYI ORANI] nisabın sağlandığı ve böylece 634 sayılı KMK Madde 34 uyarınca kanuni ÇİFT SALT ÇOĞUNLUĞUN (%50 + 1) oluştuğu tespit edilmiştir.

Gündem maddesinin görüşülmesine geçilmiş ve yapılan açık oylama neticesinde;
1. Ana gayrimenkulün sevk, idare, işletme, güvenlik, temizlik, asansör periyodik bakım ve hukuki süreçlerinin 1 (bir) yıl süreyle yürütülmesi amacıyla yöneticiliğe [YÖNETİCİ KİŞİ ADI VEYA ALO YÖNETİM GRUP A.Ş.] oy çokluğu / oy birliği ile seçilmiştir.
2. Seçilen yöneticiye; sitenin banka hesaplarını açma, kapatma, münferiden para çekme/yatırma, internet bankacılığı kullanma, KMK Madde 37 kapsamında işletme projesi hazırlayıp tebliğ etme,
3. KMK Madde 20 uyarınca gününde ödenmeyen aidat ve avans borçluları hakkında aylık %5 kanuni gecikme tazminatı işleterek İcra Müdürlükleri nezdinde ilamsız icra takibi (İİK m.68) başlatma, davalar ikame etme, avukat tayin etme ve sulh olma yetkilerinin tam olarak verilmesine karar verilmiştir.

DİVAN BAŞKANI                     KATİP ÜYE                     KAT MALİKİ / ÜYE
(İmza)                            (İmza)                        (İmza)`,
  },
  {
    id: 'genel-kurul-cagri-mektubu',
    title: 'Kat Malikleri Olağan Genel Kurul Çağrı ve Gündem Tebligatı',
    shortTitle: 'Genel Kurul Çağrı Mektubu',
    kmkArticleRef: '634 Sayılı KMK Madde 29 & 37',
    category: 'genel-kurul',
    purpose: 'Kat maliklerinin olağan veya olağanüstü genel kurula kanuni süreler ve usul dahilinde taahhütlü veya imza karşılığı davet edilmesi.',
    legalValidityCondition: 'İlk toplantı tarihinden en az 15 gün önce bütün kat maliklerine taahhütlü mektupla veya imza karşılığı tebliğ edilmesi şarttır.',
    schemaDescription: 'KMK Madde 29 uyarınca genel kurul çağrısı, gündem maddeleri ve ikinci toplantı tarihini içeren yasal davet mektubu şablonu.',
    templateText: `SAYIN KAT MALİKİ;
[SİTE VEYA APARTMAN ADI] KAT MALİKLERİ OLAĞAN GENEL KURUL TOPLANTISI ÇAĞRI VE GÜNDEMİ

Sayın Bağımsız Bölüm Maliki;
Ana gayrimenkulümüzün [YIL] Yılı Kat Malikleri Olağan Genel Kurul Toplantısı, aşağıdaki gündem maddelerini görüşüp karara bağlamak üzere [BİRİNCİ TOPLANTI TARİHİ] günü saat [SAAT]'te [TOPLANTI ADRESİ] adresinde yapılacaktır.

Birinci toplantıda KMK Madde 30 gereğince arsa payı ve sayı bakımından salt çoğunluk sağlanamadığı takdirde, İKİNCİ TOPLANTI çoğunluk aranmaksızın toplantıya katılanların oy çokluğu ile karar vermek üzere [İKİNCİ TOPLANTI TARİHİ] günü aynı yer ve saatte gerçekleştirilecektir (Yönetici seçimi için çift çoğunluk şartı saklıdır).

GÜNDEM MADDELERİ:
1. Açılış, yoklama ve Divan Heyeti'nin seçimi.
2. Saygı duruşu ve Divan'a toplantı tutanaklarını imzalama yetkisi verilmesi.
3. Geçmiş dönem yönetim faaliyet raporu ve gelir-gider hesaplarının okunması.
4. Denetim Kurulu raporunun okunması ve müzakeresi.
5. Yönetim Kurulu ve Denetçinin ayrı ayrı ibrası.
6. [YIL] yılı tahmini İşletme Projesi (Bütçe) taslağının ve aylık aidat avanslarının görüşülerek karara bağlanması.
7. Yeni dönem Yönetici / Yönetim Şirketi ve Denetçi seçimi.
8. Yöneticiye banka işlemleri, harcama yetkisi ve icra takibi yetkilerinin verilmesi.
9. Dilek, temenniler ve kapanış.

Toplantıya bizzat katılamayacak maliklerin ekteki vekaletnameyi doldurarak bir temsilci görevlendirmeleri önemle rica olunur (KMK m.31 vekalet sınırları geçerlidir).

[SİTE VEYA APARTMAN ADI] YÖNETİM KURULU
YÖNETİCİ: [YÖNETİCİ ADI SOYADI]
(İmza / Kaşe)`,
  },
  {
    id: 'aidat-gecikme-ihtarnamesi',
    title: 'Ödenmeyen Aidat Borcu Ön İhtar ve Bildirim Metni',
    shortTitle: 'Aidat Ön İhtarname Metni',
    kmkArticleRef: '634 Sayılı KMK Madde 20 & İİK Madde 68/1',
    category: 'aidat-icra',
    purpose: 'Gününde ödenmeyen aidat ve işletme avansı borcunun icra takibi öncesinde kat malikine / kiracıya tebliği ve 7 günlük ödeme süresi tanınması.',
    legalValidityCondition: 'Yazılı olarak tebliğ edilmesi, tebellüğ belgesinin saklanması veya noter/iadeli taahhütlü mektupla iletilmesi ispat kolaylığı sağlar.',
    schemaDescription: 'KMK Madde 20/2 uyarınca aylık %5 gecikme tazminatı ve icra takibi uyarısını içeren yasal aidat ihtarnamesi.',
    templateText: `İHTARNAME VE ÖDEME BİLDİRİMİ

İHTAR EDEN        : [SİTE VEYA APARTMAN ADI] Yönetim Kurulu Adına Yönetici [YÖNETİCİ ADI]
İHTAR EDİLENLER   : Sayın [KAT MALİKİ ADI SOYADI] (Bağımsız Bölüm No: [NO])
                    Sayın [KİRACI ADI SOYADI] (Varsa Kullanıcı / Kiracı)
KONU              : Ödenmeyen Ortak Gider Aidat Borcunun KMK Madde 20/2 Uyarınca %5 Yasal Gecikme Tazminatıyla Birlikte Tahsili İhtarıdır.
TEBLİĞ TARİHİ     : [GÜN / AY / YIL]

Sayın Muhatap;
Maliki / kullanıcısı bulunduğunuz ana gayrimenkulün [NO] numaralı bağımsız bölümüne ait [AY/YIL] - [AY/YIL] dönemleri arası ortak alan işletme ve aidat gideri borcunuz toplam [BORÇ TUTARI] TL'ye ulaşmıştır.

634 Sayılı Kat Mülkiyeti Kanunu'nun 20. Maddesi ve kesinleşen İşletme Projesi hükümleri gereğince;
1. İşbu ihtarnamenin tarafınıza tebliğinden itibaren 7 (yedi) takvim günü içerisinde toplam [BORÇ TUTARI] TL borcun sitenin [BANKA ADI] nezdindeki TR[IBAN NO] numaralı banka hesabına açıklama kısmına "Daire No: [NO] Aidat Borcu" yazılarak ödenmesini,
2. Belirtilen 7 günlük süre içinde ödeme yapılmadığı takdirde; KMK Madde 20/2 uyarınca gününde ödenmeyen her ay için kanunen doğrudan AYLIK YÜZDE BEŞ (%5) YASAL GECİKME TAZMİNATI işletilerek,
3. 2004 Sayılı İcra ve İflas Kanunu (İİK m.68) kapsamında hakkınızda derhal İLAMSIZ İCRA TAKİBİ başlatılacağını,
4. Doğacak icra harçları, faiz, tebligat masrafları ve asgari avukatlık vekalet ücretinin tarafınıza yükleneceğini ihtaren ve ihbaren bildiririz.

[SİTE ADI] YÖNETİMİ
YÖNETİCİ: [YÖNETİCİ ADI SOYADI]
(İmza / Kaşe)`,
  },
  {
    id: 'isletme-projesi-teblig-cetveli',
    title: 'KMK Madde 37 Uyumlu Tahmini İşletme Projesi ve Aidat Dağıtım Cetveli',
    shortTitle: 'KMK 37 İşletme Projesi',
    kmkArticleRef: '634 Sayılı KMK Madde 37',
    category: 'aidat-icra',
    purpose: 'Ana gayrimenkulün 1 yıllık tahmini gelir-gider bütçesinin tanzimi ve kat maliklerine kesinleşmek üzere tebliği.',
    legalValidityCondition: 'Yönetici tarafından tanzim edilip tüm maliklere imza karşılığı veya taahhütlü mektupla tebliğ edilmeli; 7 gün içinde Sulh Hukuk Mahkemesi’ne itiraz edilmezse kesinleşir.',
    schemaDescription: 'KMK m.37 gereği kesinleştiğinde İİK m.68 uyarınca ilamsız icraya dayanak teşkil eden resmi işletme projesi şablonu.',
    templateText: `[SİTE VEYA APARTMAN ADI] [YIL] TAKVİM YILI RESMİ İŞLETME PROJESİ
(634 Sayılı Kat Mülkiyeti Kanunu Madde 37 Uyarınca Tanzim Edilmiştir)

A. TAHMİNİ YILLIK GİDER BÜTÇESİ (TL)
1. Personel Giderleri (Maaş, SGK Primi, İSG, Kıdem Fonu) : [TUTAR] TL
2. Asansör Periyodik Bakım ve Yıllık A Tipi Muayene Harçları : [TUTAR] TL
3. Ortak Alan Elektrik ve Aydınlatma Giderleri            : [TUTAR] TL
4. Ortak Alan Su ve Hidrofor Tesisatı Bakımları          : [TUTAR] TL
5. Temizlik Malzemeleri, Hijyen ve Sarf Giderleri         : [TUTAR] TL
6. Jeneratör Bakımı, Yakıt ve Yangın Tüpü Dolumları      : [TUTAR] TL
7. Bahçe Bakımı, İlaçlama ve Peyzaj Giderleri            : [TUTAR] TL
8. Yönetim, Muhasebe, Apsiyon ve Hukuk Müşavirliği        : [TUTAR] TL
9. Beklenmeyen Olağanüstü Onarım Rezervi (%5)            : [TUTAR] TL
TOPLAM TAHMİNİ YILLIK GİDER                              : [TOPLAM GİDER] TL
AYLIK ORTALAMA İŞLETME GİDERİ                            : [AYLIK GİDER] TL

B. KAT MALİKLERİNİN GİDERE KATILIM PAYI VE AYLIK AİDAT AVANSLARI
- KMK Madde 20/1-a uyarınca personel giderleri bağımsız bölümlere EŞİT ([DAİRE BAŞI TUTAR] TL),
- KMK Madde 20/1-b uyarınca diğer tüm işletme giderleri ARSA PAYI oranında paylaştırılmıştır.
- Standart Bağımsız Bölüm Aylık Avans Tutarı: [AYLIK AİDAT] TL

TEBLİĞ VE İTİRAZ HÜKMÜ:
İşbu İşletme Projesi KMK Madde 37 gereğince kat maliklerine tebliğ edilmiş olup; tebliğden itibaren 7 (yedi) gün içinde Kat Malikleri Kurulu nezdinde itiraz edilmediği takdirde kesinleşecek ve İcra ve İflas Kanunu Madde 68/1 uyarınca resmi belge niteliği kazanacaktır.

YÖNETİCİ: [YÖNETİCİ ADI SOYADI]
TARİH: [GÜN / AY / YIL]
(İmza / Kaşe)`,
  },
  {
    id: 'genel-kurul-vekaletname-ornegi',
    title: 'Kat Malikleri Kurulu Temsil ve Vekaletname Örneği',
    shortTitle: 'Genel Kurul Vekaletnamesi',
    kmkArticleRef: '634 Sayılı KMK Madde 31',
    category: 'genel-kurul',
    purpose: 'Toplantıya bizzat katılamayan kat malikinin oyunu kullanmak üzere bir vekil tayin etmesi.',
    legalValidityCondition: 'Yazılı olması şarttır. Bir vekil toplam oy sayısının %5’inden fazlasını temsil edemez (40 ve daha az dairede en fazla 2 kişiye vekalet verilebilir).',
    schemaDescription: 'KMK Madde 31 vekalet kısıtlamalarına tam uyumlu resmi kat malikleri genel kurul temsil ve oy kullanma yetki belgesi.',
    templateText: `VEKALETNAME

VEKALET VEREN KAT MALİKİ:
Adı Soyadı       : [MALİK ADI SOYADI]
T.C. Kimlik No   : [TC NO]
Bağımsız Bölüm No: [DAİRE NO]
Arsa Payı Oranı  : [ARSA PAYI]

VEKİL TAYİN EDİLEN TEMSİLCİ:
Adı Soyadı       : [VEKİL ADI SOYADI]
T.C. Kimlik No   : [VEKİL TC NO]

YETKİ METNİ:
Maliki bulunduğum [SİTE VEYA APARTMAN ADI] ana gayrimenkulünde yapılacak olan [TARİH] tarihli Kat Malikleri Olağan / Olağanüstü Genel Kurul Toplantısında ve çoğunluk sağlanamadığı takdirde yapılacak ikinci toplantıda; beni temsil etmeye, hazirun cetvelini imzalamaya, gündem maddelerinin tamamında adıma lehte veya aleyhte oy kullanmaya, divan heyeti, yönetici ve denetçi seçiminde oy vermeye, kararlara muhalefet şerhi koymaya 634 Sayılı Kat Mülkiyeti Kanunu Madde 31 uyarınca yetkili olmak üzere [VEKİL ADI SOYADI] vekil tayin edilmiştir.

VEKALET VEREN KAT MALİKİ:
İsim / Soyisim : [MALİK ADI SOYADI]
Tarih          : [GÜN / AY / YIL]
İmza           : `,
  },
  {
    id: 'ortak-alan-isgali-ihtarname',
    title: 'Ortak Alan İşgali ve Eski Hale İade İhtar Metni',
    shortTitle: 'Ortak Alan Müdahale İhtarı',
    kmkArticleRef: '634 Sayılı KMK Madde 18 & 19',
    category: 'ortak-alan',
    purpose: 'Sığınak, merdiven boşluğu, çatı arası veya bahçe gibi ortak alanları haksız yere işgal eden veya şahsi eşya koyan maliklere karşı yasal bildirim.',
    legalValidityCondition: 'Yönetim kurulu kararına istinaden tebliğ edilir; uyulmaması halinde Sulh Hukuk Mahkemesi’nde KMK 33 müdahalenin men-i davası açılır.',
    schemaDescription: 'Ortak yerlerin tahliyesi ve eski hale getirilmesi için KMK m.18 ve m.19/2 dayanaklı ihtar metni.',
    templateText: `İHTARNAME: ORTAK ALAN İŞGALİNİN SONLANDIRILMASI VE ESKİ HALE GETİRME

İHTAR EDEN   : [SİTE ADI] Yönetim Kurulu Adına Yönetici [YÖNETİCİ ADI]
MUHATAP      : Sayın [KAT MALİKİ ADI] (Bağımsız Bölüm No: [NO])
KONU         : KMK Madde 4, 18 ve 19/2 Uyarınca Ortak Alana Yapılan Müdahalenin Men-i ve Eski Hale İadesi İhtarıdır.
TARİH        : [GÜN / AY / YIL]

Sayın Muhatap;
Ana gayrimenkulün tüm kat maliklerinin müşterek mülkiyetinde bulunan [ORTAK ALAN TANIMI: MERDİVEN SAHANLIĞI / ÇATI / OTOPARK / BAHÇE] alanına tarafınızca izinsiz olarak [MÜDAHALE TÜRÜ: ŞAHSİ EŞYA / KAPI / BÖLME DUVAR] konulduğu tespit edilmiştir.

634 Sayılı Kat Mülkiyeti Kanunu'nun 19/2 Maddesi gereğince; kat maliklerinden biri bütün kat maliklerinin 4/5 yazılı rızası olmadıkça ortak yerlerde inşaat, onarım ve işgal yapamaz. KMK Madde 18 uyarınca malikler ortak alanları kullanırken birbirini rahatsız etmemek ve haklarına riayet etmekle yükümlüdür.

Bu itibarla; işbu ihtarnamenin tebliğinden itibaren 3 (üç) gün içinde söz konusu ortak alan işgaline son vererek alanı boşaltmanızı ve eski haline getirmenizi; aksi halde Sulh Hukuk Mahkemesi nezdinde KMK Madde 33 uyarınca HAKİMİN MÜDAHALESİ VE ESKİ HALE GETİRME DAVASI açılacağını, dava ve yargılama giderleri ile vekalet ücretinin tarafınıza yükleneceğini ihtaren bildiririz.

[SİTE ADI] YÖNETİMİ
(İmza / Kaşe)`,
  },
  {
    id: 'cam-balkon-muvafakatnamesi',
    title: 'Cam Balkon ve Dış Cephe 4/5 Kat Maliki Yazılı Muvafakatnamesi',
    shortTitle: 'Cam Balkon Muvafakatnamesi',
    kmkArticleRef: '634 Sayılı KMK Madde 19/2 & Yargıtay HGK',
    category: 'ortak-alan',
    purpose: 'Daire balkonuna katlanır veya sürgülü cam balkon yaptırmak isteyen malikin diğer maliklerden alması kanunen zorunlu olan 4/5 yazılı izin belgesi.',
    legalValidityCondition: 'Ana gayrimenkuldeki tüm kat maliklerinin beşte dördünün (4/5) isim, daire no ve ıslak imzalarını taşıması kanunen şarttır.',
    schemaDescription: 'Yargıtay Hukuk Genel Kurulu emsali uyarınca cam balkonun yıkım davasına maruz kalmaması için gerekli 4/5 yazılı rıza tutanağı.',
    templateText: `KAT MALİKLERİ YAZILI RIZA VE MUVAFAKATNAME METNİ
(634 Sayılı Kat Mülkiyeti Kanunu Madde 19/2 Uyarınca Tanzim Edilmiştir)

APARTMAN / SİTE ADI: [SİTE VEYA APARTMAN ADI]
BAĞIMSIZ BÖLÜM SAHİBİ: [TALEPTE BULUNAN MALİK ADI SOYADI] (Daire No: [NO])
TALEP KONUSU         : Bağımsız bölüm balkonuna ana yapının dış cephe renk ve mimari projesine zarar vermeksizin şeffaf katlanır cam balkon sistemi takılması.

BİZLER AŞAĞIDA İMZASI BULUNAN KAT MALİKLERİ OLARAK;
Yukarıda bilgileri yazılı bağımsız bölüm malikinin, dairesinin balkonuna bina cephe bütünlüğünü bozmayacak standartta katlanır cam sistemi taktırmasına 634 Sayılı KMK Madde 19/2 uyarınca muvafakat ettiğimizi, bu hususta herhangi bir itirazımızın bulunmadığını beyan ve imza ederiz.

S.NO | BAĞIMSIZ BÖLÜM NO | KAT MALİKİ ADI SOYADI | ARSA PAYI | İMZA
1    | [NO]              | [AD SOYAD]             | [PAY]     | (İmza)
2    | [NO]              | [AD SOYAD]             | [PAY]     | (İmza)
...  | ...               | ...                    | ...       | ...

(Not: Toplam bağımsız bölüm sayısının en az beşte dördünün (4/5) imzası kanunen zorunludur.)`,
  },
  {
    id: 'denetim-raporu-tutanagi',
    title: 'Denetçi Faaliyet ve Hesap İnceleme Raporu Tutanağı',
    shortTitle: 'Denetçi Yıllık Raporu',
    kmkArticleRef: '634 Sayılı KMK Madde 41',
    category: 'yonetim-yetki',
    purpose: 'Denetçi veya Denetim Kurulu tarafından yöneticinin gelir-gider hesaplarının, banka hareketlerinin ve faturalarının incelenip kurula sunulması.',
    legalValidityCondition: 'Yılda en az bir defa (veya yönetim planında belirtilen sürelerde) tanzim edilip kat malikleri genel kuruluna yazılı olarak sunulması zorunludur.',
    schemaDescription: 'KMK Madde 41 uyarınca yöneticinin mali ibrası için genel kurula sunulan resmi iç denetim raporu şablonu.',
    templateText: `[SİTE VEYA APARTMAN ADI] DENETİM KURULU YILLIK İNCELEME RAPORU
(634 Sayılı Kat Mülkiyeti Kanunu Madde 41 Uyarınca Tanzim Edilmiştir)

DENETLENEN DÖNEM : [BAŞLANGIÇ TARİHİ] - [BİTİŞ TARİHİ]
DENETİM TARİHİ   : [GÜN / AY / YIL]
DENETÇİLER       : [DENETÇİ 1 ADI SOYADI], [DENETÇİ 2 ADI SOYADI]

YAPILAN İNCELEMELER:
1. Kasa ve Banka İncelemesi: Ana gayrimenkulün banka hesap ekstreleri incelenmiş; dönem sonu banka mevduatının [BANKA BAKİYESİ] TL olduğu, nakit kasa mevcudunun [KASA TUTARI] TL olduğu ve banka kayıtları ile Apsiyon yazılım kayıtlarının birbiriyle tam mutabık olduğu görülmüştür.
2. Gelirler: Tahakkuk eden toplam aidat alacağının [TAHAKKUK EDEN] TL olduğu, tahsilatın [TAHSİL EDİLEN] TL seviyesinde gerçekleştiği (%99.2 başarı) tespit edilmiştir.
3. Giderler: Yapılan harcamaların tamamının işletme projesine uygun olduğu, fatura ve makbuzlarının tam ve yasal olduğu incelenmiştir.
4. Karar Defteri: Karar defteri kayıtlarının düzenli tutulduğu ve noter kapanış tasdiklerinin süresinde yaptırıldığı görülmüştür.

SONUÇ VE KANAAT:
Yönetim Kurulu'nun [DÖNEM] yılı faaliyet ve mali hesaplarının 634 Sayılı KMK ve Yönetim Planı'na uygun olduğu tespit edilmiş olup, Kat Malikleri Genel Kurulu'na YÖNETİM KURULUNUN İBRASINI arz ve teklif ederiz.

DENETÇİ                              DENETÇİ
(İmza)                               (İmza)`,
  },
];

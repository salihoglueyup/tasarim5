/**
 * Kat Malikleri ve Yöneticiler İçin KMK Hukuki İhtarname & Tutanak Şablon Kütüphanesi
 * (kmkLegalNoticesTemplatesData.ts)
 * 
 * Google Schema.org DigitalDocument ve Legislation standartlarında;
 * Sitelerde ve apartmanlarda en sık ihtiyaç duyulan 8 yasal ihtarname, tutanak,
 * vekaletname ve devir teslim şablonu.
 */

export interface LegalNoticeTemplateItem {
  id: string;
  title: string;
  category: 'Aidat & İcra' | 'Komşuluk & Mimari' | 'Genel Kurul & Vekalet' | 'Yönetim & Devir Teslim';
  statutoryArticle: string;
  targetRecipient: string;
  dispatchMethod: 'Noter İhtarnamesi' | 'İadeli Taahhütlü Mektup' | 'İmzalı Tebellüğ Tutanağı' | 'Karar Defteri Tescili';
  summary: string;
  templateContent: string;
  practicalUsageNotes: string[];
  aloYonetimLegalAssurance: string;
}

export const KMK_LEGAL_NOTICES_TEMPLATES: LegalNoticeTemplateItem[] = [
  {
    id: 'ihtar-kmk-20-aidat-avans-borcu',
    title: 'KMK Madde 20 Aidat ve Avans Borcu Noter İhtarnamesi',
    category: 'Aidat & İcra',
    statutoryArticle: '634 Sayılı KMK Madde 20, 37; İİK Madde 68',
    targetRecipient: 'Aidat veya Demirbaş Avansı Borcunu Ödemeyen Kat Maliki / Kiracı',
    dispatchMethod: 'Noter İhtarnamesi',
    summary: 'Ödenmeyen aidat ve demirbaş borçlarına aylık %5 yasal gecikme tazminatı işletilmesi ve 7 gün içinde ödenmemesi halinde doğrudan ilamsız icra takibi başlatılacağına dair resmi ihtarname metni.',
    templateContent: `İHTARNAME

KEŞİDECİ (İHTAR EDEN) : [Site / Apartman Adı] Kat Malikleri Kurulu Adına
                        Yönetici: [Yönetici Adı Soyadı / Yönetim Şirketi Unvanı]
                        Adres: [Site Yönetim Ofisi Adresi]

VEKİLİ               : Av. [Avukat Adı Soyadı] - [Baro Sicil No]

MUHATAP (İHTAR OLUNAN): [Borçlu Kat Maliki / Kiracı Adı Soyadı] - TCKN: [TC Kimlik No]
                        Bağımsız Bölüm: [Blok No / Daire No]
                        Adres: [Muhatabın Tebligat Adresi]

KONU                 : 634 Sayılı Kat Mülkiyeti Kanunu'nun 20. maddesi uyarınca ödenmeyen [Yıl / Aylar] dönemi ortak gider (aidat) ve demirbaş avansı asıl alacağı ile aylık %5 yasal gecikme tazminatının tahsili ihtarıdır.

AÇIKLAMALAR          :
1. Muhatap, yukarıda belirtilen ana taşınmazdaki [Blok/Kat/No] numaralı bağımsız bölümün kat maliki / fiili kullanıcısıdır.
2. Kat Malikleri Genel Kurulu tarafından kabul edilen ve kesinleşen İşletme Projesi gereğince bağımsız bölümünüze tahakkuk eden ortak gider (aidat) ve demirbaş avans borçlarınız vadesinde ödenmemiştir.
3. [Aylar ve Yıl] dönemine ait ödenmemiş aidat asıl alacağı toplam [Tutar] TL'dir.
4. KMK m.20/2 hükmü uyarınca; "Gider ve avans payının tamamını ödemeyen kat maliki ödemede geciktiği günler için aylık yüzde beş hesabıyla gecikme tazminatı ödemekle yükümlüdür."

NETİCE VE TALEP      :
Yukarıda izah olunan nedenlerle; toplam [Tutar] TL asıl alacak ile ödeme tarihine kadar işleyecek aylık %5 gecikme tazminatı, noter masrafı ve vekalet ücretinin işbu ihtarnamenin tebliğinden itibaren 7 (YEDİ) GÜN İÇİNDE [Banka Adı - IBAN Numarası] hesabına ödenmesini; aksi takdirde hakkınızda İcra İflas Kanunu uyarınca ilamsız icra takibi başlatılacağını, taşınmazınıza kanuni ipotek (KMK m.22) tesis edileceğini, icra masrafları ile avukatlık vekalet ücretinin tarafınıza yükleneceğini ihtaren bildiririz.

İHTAR EDEN YÖNETİM KURULU ADINA
[İmza / Kaşe]`,
    practicalUsageNotes: [
      'İhtarnamenin noter kanalıyla keşide edilmesi, borçlunun "haberim yoktu" itirazını kesin olarak çürütür.',
      'Tebliğ şerhinin bir örneği icra takip talebine eklenerek borçlunun itirazı halinde İİK m.68 uyarınca itirazın kesin kaldırılması sağlanır.',
      'Kiracıya gönderilecekse, KMK m.22 uyarınca kira borcu miktarını aşamayacağı hususu göz önünde bulundurulmalıdır.'
    ],
    aloYonetimLegalAssurance: 'Alo Yönetim anlaşmalı hukuk bürosu aracılığıyla hazırlanan ihtarnameler, geciken borçların %84 oranında icraya intikal etmeden 7 gün içinde tahsil edilmesini sağlar.'
  },
  {
    id: 'ihtar-kmk-19-mimari-aykirilik-cam-balkon',
    title: 'KMK Madde 19 Mimari Aykırılık & İzinsiz Cam Balkon/Çatı İhtarnamesi',
    category: 'Komşuluk & Mimari',
    statutoryArticle: '634 Sayılı KMK Madde 19/2; İmar Kanunu',
    targetRecipient: 'Ortak Alana Müdahale Eden veya İzinsiz Mimari Tadilat Yapan Kat Maliki',
    dispatchMethod: 'Noter İhtarnamesi',
    summary: 'Kat maliklerinin 4/5 yazılı rızası olmaksızın dış cephede renk değişikliği, balkon kapatma, ortak sahanlık işgali veya çatı tadilatı yapan malike eski hale iade ihtarı.',
    templateContent: `İHTARNAME

KEŞİDECİ : [Site / Apartman Adı] Kat Malikleri Kurulu Adına Yönetici [Ad Soyad]
MUHATAP  : [Daire No Maliki Ad Soyad] - [Bağımsız Bölüm Bilgisi]
KONU     : 634 Sayılı KMK Madde 19 uyarınca onaylı mimari projeye aykırı imalatın 15 gün içinde kaldırılarak eski hale getirilmesi ihtarıdır.

AÇIKLAMALAR :
1. Ana taşınmazın belediyede tasdikli mimari projesine ve KMK Madde 19/2 hükmüne göre; "Kat maliklerinden biri, bütün kat maliklerinin beşte dördünün yazılı rızası olmadıkça ana gayrimenkulün ortak yerlerinde inşaat, onarım ve tesisler, değişik renkte dış badana veya boya yaptıramaz."
2. Tarafınızca bağımsız bölümünüzde yapılan incelemede; Kat Malikleri Kurulu'nun 4/5 yazılı rızası bulunmaksızın [Balkonun katlanır/füme camla kapatıldığı / Dış cepheye izinsiz klima dış ünitesi asıldığı / Ortak koridora ayakkabılık/dolap sabitlendiği / Çatı terasına izinsiz sundurma yapıldığı] tespit edilmiştir.
3. Yargıtay 20. Hukuk Dairesi'nin yerleşik içtihatları uyarınca, 4/5 yazılı rıza olmaksızın yapılan bu tür imalatlar mimari projeye aykırılık teşkil etmekte olup eski hale iadesi zorunludur.

NETİCE VE TALEP :
İşbu ihtarnamenin tebliğinden itibaren 15 (ON BEŞ) GÜN İÇİNDE projeye aykırı söz konusu imalatın tarafınızca sökülerek ortak mahalin/dış cephenin eski mimari haline getirilmesini; aksi takdirde Sulh Hukuk Mahkemesi'nde "Müdahalenin Men'i ve Eski Hale İade Davası" ikame edileceğini, yargılama ve avukatlık giderlerinin tarafınıza yükletileceğini ihtaren bildiririz.

YÖNETİCİ / YÖNETİM KURULU
[İmza / Tarih]`,
    practicalUsageNotes: [
      'İhtar öncesinde yönetici ve en az bir kat maliki/güvenlik şefi ile birlikte fotoğraflı durum tespit tutanağı düzenlenmelidir.',
      'Yargıtay içtihadına göre açılır-kapanır cam balkonlar dahi 4/5 yazılı rıza yoksa yıktırılmaktadır.',
      '15 günlük sürenin dolmasının ardından dava açılmadan önce 7445 sayılı kanun uyarınca Zorunlu Arabuluculuk başvurusu yapılmalıdır.'
    ],
    aloYonetimLegalAssurance: 'Alo Yönetim teknik heyeti, sitedeki tüm bağımsız bölümlerin mimari projeye uygunluğunu periyodik tarar ve bina değer kaybını önler.'
  },
  {
    id: 'tutanak-kmk-18-gurultu-komnsuluk-ihlali',
    title: 'KMK Madde 18 Komşuluk Hukuku ve Gürültü/Huzur İhlali Tespit Tutanağı',
    category: 'Komşuluk & Mimari',
    statutoryArticle: '634 Sayılı KMK Madde 18, 25; Türk Medeni Kanunu Madde 737',
    targetRecipient: 'Site Sakinleri, Güvenlik Amiri ve Yönetim Dosyası',
    dispatchMethod: 'İmzalı Tebellüğ Tutanağı',
    summary: 'Gece veya gündüz saatlerinde sürekli gürültü yapan, evcil hayvan kurallarına uymayan veya komşuları rahatsız eden sakinler hakkında zabıta ve mahkeme delili niteliğinde tutanak.',
    templateContent: `KOMŞULUK HUKUKU VE HUZUR İHLALİ TESPİT TUTANAĞI

TUTANAK TARİHİ VE SAATİ : [Gün / Ay / Yıl - Saat: Örn: 23:45]
OLAY YERİ               : [Site Adı], [Blok No], [Kat No], [Daire No]

İHLALDE BULUNAN         : [Şikayet Edilen Sakin / Kiracı Adı Soyadı]
ŞİKAYETÇİ SAKİNLER      : [Daire No ve İsimler - Gizli tutulabilir]

OLAYIN ÖZETİ VE TESPİTLER :
Yukarıda belirtilen tarih ve saatte, [Daire No]'da ikamet eden muhatabın bağımsız bölümünden bina sakinlerinin dinlenme saatlerinde aşırı yüksek sesle [Müzik çalındığı / Yüksek sesli tartışma ve bağırma olduğu / Matkap ve tadilat gürültüsü yapıldığı / Ortak havalandırma şaftına rahatsız edici duman/koku salındığı] tespit edilmiştir.

Güvenlik personeli ve bina görevlisi tarafından saat [23:50]'de daire zili çalınarak sözlü uyarıda bulunulmuş; ancak [Gürültünün devam ettiği / Kapının açılmadığı / Uyarıya agresif yanıt verildiği] görülmüştür.

HUKUKİ DAYANAK :
634 Sayılı Kat Mülkiyeti Kanunu Madde 18: "Kat malikleri, gerek bağımsız bölümlerini, gerek eklentileri ve ortak yerleri kullanırken doğruluk kaidelerine uymak, özellikle birbirini rahatsız etmemek, birbirinin haklarını çiğnememek ve yönetim planı hükümlerine uymakla, karşılıklı olarak yükümlüdürler."
Tekerrürü halinde KMK Madde 25 uyarınca "Bağımsız Bölüm Mülkiyetinin Devri Mecburiyeti" davası ikame edilebilecektir.

İşbu tutanak mahallinde 3 nüsha olarak tanzim edilmiş ve imza altına alınmıştır.

GÜVENLİK AMİRİ        BİNA GÖREVLİSİ        KOMŞU SAKİN (ŞAHİT)       YÖNETİCİ
[İmza]               [İmza]                [İmza]                   [İmza]`,
    practicalUsageNotes: [
      'Gürültü ihlallerinde en az 2 personelin veya 1 komşunun imzası hukuki delil gücünü katlar.',
      'Sürekli tekrarlanan ihlallerde bu tutanaklarla birlikte İlçe Emniyet Müdürlüğü / Zabıta Kabahatler Kanunu m.36 cezası için çağrılabilir.',
      'KMK 25 davasında mahkemeye sunulacak en kıymetli delil zincirini bu tutanaklar oluşturur.'
    ],
    aloYonetimLegalAssurance: 'Alo Yönetim 5188 güvenlik ekipleri, gürültü ihbarlarına 10 dakika içinde intikal ederek dijital ses desibel ölçüm kayıtlarıyla tutanak tutar.'
  },
  {
    id: 'mektup-kmk-29-genel-kurul-cagri-gundem',
    title: 'KMK Madde 29 Kat Malikleri Olağan/Olağanüstü Genel Kurul Çağrı ve Gündem Mektubu',
    category: 'Genel Kurul & Vekalet',
    statutoryArticle: '634 Sayılı KMK Madde 29, 30; Tebligat Kanunu',
    targetRecipient: 'Tüm Asil Kat Malikleri',
    dispatchMethod: 'İadeli Taahhütlü Mektup',
    summary: 'Genel kurul toplantısının geçerli olabilmesi için ilk toplantıdan en az 15 gün önce tüm kat maliklerine taahhütlü mektupla veya imza karşılığı iletilmesi zorunlu çağrı metni.',
    templateContent: `KAT MALİKLERİ KURULU OLAĞAN GENEL KURUL ÇAĞRISI VE TOPLANTI GÜNDEMİ

SAYIN KAT MALİKİ,
[Site / Apartman Adı] Kat Malikleri Kurulu [Yıl] Yılı Olağan Genel Kurul Toplantısı, aşağıdaki gündem maddelerini görüşüp karara bağlamak üzere toplanacaktır.

1. TOPLANTI TARİHİ VE SAATİ : [Tarih, Örn: 15 Ocak 2026 Pazar, Saat: 11:00]
TOPLANTI YERİ              : [Site Sosyal Tesisi / Toplantı Salonu Adresi]

YETER SAYI SAĞLANAMAZSA:
2. TOPLANTI TARİHİ VE SAATİ : [Tarih, Örn: 22 Ocak 2026 Pazar, Saat: 11:00]
TOPLANTI YERİ              : [Aynı Adres]

ÖNEMLİ NOT:
KMK Madde 30 uyarınca birinci toplantıda kat maliklerinin sayı ve arsa payı bakımından salt çoğunluğu (%50+1) aranacaktır. Çoğunluk sağlanamadığı takdirde ikinci toplantı, toplantıya katılanların oy çokluğuyla karar verecektir (Yönetici seçimi için KMK 34 gereği ikinci toplantıda da çift çoğunluk şarttır).

TOPLANTI GÜNDEMİ:
1. Açılış, yoklama ve Divan Heyeti'nin (Başkan ve Yazman) seçimi.
2. Divan Heyetine toplantı tutanaklarını imzalama yetkisinin verilmesi.
3. [Geçmiş Yıl] Yönetim Kurulu Faaliyet Raporu ile Gelir-Gider Kesin Hesabının okunması.
4. [Geçmiş Yıl] Denetim Kurulu Raporu'nun okunması ve müzakeresi.
5. Yönetim ve Denetim Kurullarının ayrı ayrı ibrası (aklanması).
6. Yeni dönem Yönetici / Yönetim Şirketi ve Denetçilerin seçimi.
7. [Gelecek Yıl] Tahmini İşletme Projesinin (Aidat ve Demirbaş Bütçesi) görüşülmesi ve karara bağlanması.
8. Ortak alan teknik bakım, asansör yenileme ve 5188 güvenlik hizmet alımı hususlarının görüşülmesi.
9. Dilek ve temenniler, kapanış.

Toplantıya bizzat katılamayacak maliklerin ekteki Vekaletname Formunu doldurarak vekil tayin etmeleri rica olunur (KMK m.31 uyarınca bir kişi oy sayısının %5'inden fazlasını vekaleten kullanamaz; 40 ve daha az daireli binalarda en fazla 2 vekalet alınabilir).

SİTE YÖNETİM KURULU ADINA
[Yönetici Adı Soyadı / İmza]`,
    practicalUsageNotes: [
      'Toplantı çağrısının toplantı tarihinden EN AZ 15 GÜN ÖNCE kat maliklerinin eline geçmiş olması yasal zorunluluktur.',
      'Tebligat yapılmayan tek bir malikin açacağı dava ile Genel Kurul kararları mahkemece iptal edilebilir.',
      'Yönetim planında toplantı ayı belirtilmişse o aya uyulmalı, aksi halde KMK m.29 gereği Ocak ayında yapılmalıdır.'
    ],
    aloYonetimLegalAssurance: 'Alo Yönetim, Genel Kurul çağrılarını barkodlu PTT iadeli taahhütlü ve Apsiyon üzerinden SMS/E-posta ile çift kanallı yasal güvenceyle tebliğ eder.'
  },
  {
    id: 'cetvel-kmk-30-hazirun-katilim-listesi',
    title: 'KMK Madde 30 Genel Kurul Resmi Hazirun (Katılım) Cetveli Şablonu',
    category: 'Genel Kurul & Vekalet',
    statutoryArticle: '634 Sayılı KMK Madde 30, 31, 32',
    targetRecipient: 'Divan Başkanlığı ve Noter Karar Defteri Eki',
    dispatchMethod: 'Karar Defteri Tescili',
    summary: 'Genel Kurul toplantı yeter sayısının ve karar nisaplarının hesaplanmasında mahkemelerce aranan resmi imza ve arsa payı katılım cetveli.',
    templateContent: `[SİTE / APARTMAN ADI] KAT MALİKLERİ GENEL KURUL TOPLANTISI
RESMİ HAZİRUN (YOKLAMA) CETVELİ

TOPLANTI TARİHİ: [Gün / Ay / Yıl]   TOPLANTI TÜRÜ: [ ] 1. Toplantı  [ ] 2. Toplantı
TOPLAM BAĞIMSIZ BÖLÜM: [Örn: 80]    TOPLAM ARSA PAYI: [Örn: 10.000]

S.No | Blok/Daire | Kat Maliki Adı Soyadı | Arsa Payı | Katılım Türü (Asil / Vekil) | Vekilin Adı Soyadı | İmza
-----+-----------+-----------------------+-----------+-----------------------------+--------------------+------
1    | A Blok D.1| Ahmet Yılmaz          | 120/10000 | Asil                        | -                  | [İmza]
2    | A Blok D.2| Mehmet Kaya           | 130/10000 | Vekaleten                   | Ali Demir          | [İmza]
3    | A Blok D.3| Ayşe Çelik            | 115/10000 | Asil                        | -                  | [İmza]
4    | B Blok D.4| [Firma Unvanı]        | 250/10000 | Yetkili Temsilci            | Veli Şen (İmza Sirk)| [İmza]

TOPLANTI YETER SAYISI TESPİT TUTANAĞI:
İşbu toplantıda hazır bulunan kat maliki sayısı: [Hazır Malik Sayısı]
Hazır bulunanların temsil ettiği toplam arsa payı: [Hazır Arsa Payı] / [Toplam Arsa Payı]
Toplantı Yeter Sayısı Şartı: [ ] SAĞLANDI  [ ] SAĞLANAMADI

DİVAN BAŞKANI        KATİP / YAZMAN        OY SAYIM GÖREVLİSİ
[İmza]               [İmza]                [İmza]`,
    practicalUsageNotes: [
      'Toplantı başlamadan önce hazirun cetveli eksiksiz imzalatılmalı ve divan başkanı tarafından sayı ve arsa payı hesaplanarak açılış yapılmalıdır.',
      'Vekaleten oy kullananların vekaletnameleri cetvelin arkasına zımbalanmalı ve karar defteriyle birlikte 10 yıl saklanmalıdır.'
    ],
    aloYonetimLegalAssurance: 'Alo Yönetim divan katipleri, dijital barkod okuma ve anlık arsa payı hesaplama yazılımı kullanarak karar iptal riskini sıfırlar.'
  },
  {
    id: 'vekalet-kmk-31-oy-kullanma-yetki-belgesi',
    title: 'KMK Madde 31 Genel Kurul Oy Kullanma Yetki Belgesi (Vekaletname)',
    category: 'Genel Kurul & Vekalet',
    statutoryArticle: '634 Sayılı KMK Madde 31',
    targetRecipient: 'Toplantı Divan Heyeti',
    dispatchMethod: 'İmzalı Tebellüğ Tutanağı',
    summary: 'Kat malikinin toplantıya bizzat katılamadığı hallerde eşi, çocuğu veya üçüncü bir kişiyi resmi olarak vekil tayin edebileceği noter onayı gerektirmeyen adi yazılı vekaletname.',
    templateContent: `VEKALETNAME (TEMSİL BELGESİ)

[SİTE / APARTMAN ADI] KAT MALİKLERİ KURULU DİVAN BAŞKANLIĞI'NA

Maliki bulunduğum [Site / Apartman Adı] ana gayrimenkulü dahilindeki [Blok No], [Kat No], [Bağımsız Bölüm / Daire No] numaralı taşınmazıma ilişkin olarak;

[Tarih] günü saat [Saat]'de [Toplantı Yeri] adresinde yapılacak olan [Olağan / Olağanüstü] Kat Malikleri Genel Kurul Toplantısında ve yeterli çoğunluk sağlanamadığı takdirde [İkinci Toplantı Tarihi] tarihinde yapılacak ikinci toplantıda;

Beni temsil etmeye, gündemdeki maddelerin görüşülmesinde lehte veya aleyhte oy kullanmaya, divan heyetini seçmeye, yeni yönetim ve denetim kurullarını belirlemeye, işletme projesini onaylamaya, kararlara muhalefet şerhi koymaya ve tutanakları imzalamaya mezun ve yetkili olmak üzere;

[Vekilin Adı Soyadı] - TCKN: [TC Kimlik No]
Adres: [Vekilin Adresi]
Telefon: [Vekil Telefon No]

tarafımdan vekil olarak tayin edilmiştir.

VEKALET VEREN KAT MALİKİ:
Adı Soyadı : [Kat Maliki Adı Soyadı]
TCKN       : [TC Kimlik No]
İmza       : [Islak İmza]
Tarih      : [Gün / Ay / Yıl]

YASAL SINIRLAMALAR (KMK Madde 31):
- Bir kişi, oy sayısının yüzde beşinden fazlasını kullanmak üzere vekil tayin edilemez.
- Kırk ve daha az sayıdaki mülklerde bir kimse en çok iki kişiye vekalet edebilir.`,
    practicalUsageNotes: [
      'Site genel kurullarında vekaletnamenin noter tasdikli olması ZORUNLU DEĞİLDİR; ıslak imzalı adi yazılı vekaletname kanunen tam geçerlidir.',
      'Kiracının malik adına oy kullanabilmesi için mutlaka bu belgenin kat malikince imzalanmış olması gerekir.',
      '%5 kuralına dikkat edilmelidir; örneğin 100 bağımsız bölümlü bir sitede bir kişi kendi oyu hariç en fazla 5 vekalet oyu kullanabilir.'
    ],
    aloYonetimLegalAssurance: 'Alo Yönetim divan heyeti, toplantı girişinde vekalet limitlerini KVKK uyumlu dijital kimlik denetimiyle inceler ve usulsüz oy kullanımını önler.'
  },
  {
    id: 'karar-kmk-32-karar-defteri-yazim-sablonu',
    title: 'KMK Madde 32 Noter Onaylı Karar Defteri Yazım ve İbra Şablonu',
    category: 'Yönetim & Devir Teslim',
    statutoryArticle: '634 Sayılı KMK Madde 32, 36; Noterlik Kanunu',
    targetRecipient: 'Noter Tasdikli Karar Defteri',
    dispatchMethod: 'Karar Defteri Tescili',
    summary: 'Genel kurulda alınan kararların iptal davasına konu olmaması için noter onaylı resmi Karar Defteri sayfasına hatasız işlenmesi gereken şablon.',
    templateContent: `KARAR NO: [Örn: 2026/01]
KARAR TARİHİ: [Gün / Ay / Yıl]

[Site / Apartman Adı] Kat Malikleri Kurulu [Olağan / Olağanüstü] Genel Kurul Toplantısı [Adres] adresinde yapılmış ve aşağıdaki kararlar alınmıştır:

GÜNDEM MADDESİ 1: Divan Başkanlığına [Ad Soyad], Katipliğe [Ad Soyad] oy birliğiyle seçilmiştir.
GÜNDEM MADDESİ 2: [Geçmiş Yıl] Yönetim Kurulu faaliyet raporu ve kesin hesap bilançosu okunmuş; Yönetim Kurulu üyeleri [Ad Soyad] oy çokluğuyla ibra edilmiştir (Kabul: [Sayı], Ret: [Sayı]).
GÜNDEM MADDESİ 3: Denetim Kurulu raporu okunmuş ve Denetçi [Ad Soyad] oy çokluğuyla ibra edilmiştir.
GÜNDEM MADDESİ 4: Yeni dönem Yönetici seçimine geçilmiş; kat maliklerinin hem sayı ([Sayı]) hem de arsa payı ([Arsa Payı]/10000) çoğunluğuyla 1 yıl süreyle [Alo Yönetim Tesis Hizmetleri A.Ş. / Yönetici Ad Soyad] yönetici olarak seçilmiştir.
GÜNDEM MADDESİ 5: [Gelecek Yıl] İşletme Projesi görüşülmüş; aylık bağımsız bölüm aidatlarının [Tutar] TL olmasına, ödemelerin her ayın en geç [Gün]. gününe kadar yapılmasına, geciken ödemelere aylık %5 yasal gecikme tazminatı işletilmesine oy çokluğuyla karar verilmiştir.
GÜNDEM MADDESİ 6: Yöneticiye banka hesaplarını açma, kapatma, çift imza ile fon transferi yapma, aidat borçluları hakkında icra takibi başlatma ve avukat vekaletnamesi verme yetkisi verilmiştir.

MUHALEFET ŞERHLERİ:
[Varsa aleyhte oy kullanan maliklerin muhalefet gerekçeleri buraya yazılır].

DİVAN BAŞKANI        KATİP / YAZMAN        YENİ SEÇİLEN YÖNETİCİ
[İmza]               [İmza]                [İmza]`,
    practicalUsageNotes: [
      'KMK Madde 32 gereği karar defterine yazılan kararlar divan ve hazır bulunan maliklerce imzalanmalıdır.',
      'Aleyhte oy kullanan malikin "muhalifim" şerhi koyup imza atması, ileride iptal davası açabilmesi için kanuni ön şarttır.',
      'Karar defterinin her takvim yılının bitiminden başlayarak 1 ay içinde (Ocak ayı sonuna kadar) notere kapanış tasdiki yaptırılması şarttır (KMK m.36).'
    ],
    aloYonetimLegalAssurance: 'Alo Yönetim, divan kararlarını aynı gün noter tasdikli deftere aktarır, taranmış suretini 24 saatte tüm maliklerin Apsiyon mobil uygulamasına yükler.'
  },
  {
    id: 'protokol-kmk-35-yonetici-devir-teslim-ibra',
    title: 'KMK Madde 35 Eski Yönetici Kasa, Evrak ve Banka Devir Teslim Protokolü',
    category: 'Yönetim & Devir Teslim',
    statutoryArticle: '634 Sayılı KMK Madde 35, 38, 39; Türk Ceza Kanunu Madde 155',
    targetRecipient: 'Eski Yönetici ve Yeni Yönetim Kurulu',
    dispatchMethod: 'İmzalı Tebellüğ Tutanağı',
    summary: 'Yönetim değişikliğinde eski yöneticiden karar defteri, banka hesapları, nakit kasa, faturalar, personel özlük dosyaları ve asansör ruhsatlarının eksiksiz devralındığını belgeleyen bağlayıcı protokol.',
    templateContent: `YÖNETİM DEVİR TESLİM VE MUTABAKAT PROTOKOLÜ

TARİH: [Gün / Ay / Yıl]
TESLİM EDEN (ESKİ YÖNETİCİ) : [Eski Yönetici Adı Soyadı / Unvanı] - TCKN: [TC No]
TESLİM ALAN (YENİ YÖNETİCİ) : [Yeni Yönetici / Alo Yönetim Yetkilisi] - TCKN: [TC No]

[Site Adı] Kat Malikleri Kurulu'nun [Tarih] tarihli toplantısında alınan karar uyarınca yöneticilik görevi devredilmiş olup aşağıdaki kıymet ve belgeler eksiksiz devredilmiştir:

1. RESMİ DEFTERLER VE EVRAKLAR:
[ ] Noter Onaylı Karar Defteri ([Sayfa Sayısı] Sayfa)
[ ] Noter Onaylı İşletme Defteri / Yevmiye Defteri
[ ] Kat Malikleri ve Sakinleri Güncel İletişim Listesi
[ ] SGK Personel Özlük Dosyaları ([Adet] Personel)
[ ] Belediyeden Onaylı Mimari, Statik ve Elektrik Projeleri
[ ] Asansör Tescil Belgeleri ve A Tipi Yeşil Muayene Raporları

2. BANKA VE FİNANSAL KIYMETLER:
[ ] [Banka Adı] Vadesiz TL Hesabı Bakiyesi: [Tutar] TL
[ ] [Banka Adı] Demirbaş / Fon Vadeli Hesap Bakiyesi: [Tutar] TL
[ ] Elden Teslim Edilen Nakit Kasa Mevcudu: [Tutar] TL
[ ] Ödenmemiş Tedarikçi / Fatura Borçları Listesi: [Tutar] TL
[ ] Kat Malikleri Aidat Borç Dökümü ve İcra Dosyaları Listesi

3. FİZİKİ DEMİRBAŞLAR VE ANAHTARLAR:
[ ] Trafo, Jeneratör, Kazan Dairesi, Asansör Makine Dairesi Anahtarları
[ ] CCTV Güvenlik Kamera Şifreleri ve NVR Cihazı
[ ] Ortak Depo El Aletleri ve Bahçe Bakım Makineleri

BEYAN VE İBRA:
Teslim eden eski yönetici, görevi süresince site adına yapılan tüm gelir ve giderlerin gerçeğe uygun olduğunu, gizli borç bulunmadığını beyan eder. Teslim alan taraf evrakları inceleyerek teslim almıştır.

TESLİM EDEN (ESKİ YÖNETİCİ)              TESLİM ALAN (YENİ YÖNETİCİ)
[İsim / İmza]                            [İsim / Kaşe / İmza]`,
    practicalUsageNotes: [
      'Devir teslim protokolü olmadan görevi devralmak, yeni yönetimi eski dönemin şaibeli borçları ve kayıp evrakları karşısında savunmasız bırakır.',
      'Eski yöneticinin defter ve parayı teslimden kaçınması halinde TCK m.155 "Güveni Kötüye Kullanma" suçu kapsamında savcılık şikayeti hakkı doğar.',
      'Banka devri için bu protokolün noter onaylı karar defteri suretiyle birlikte banka şubesine ibrazı gereklidir.'
    ],
    aloYonetimLegalAssurance: 'Alo Yönetim mali müfettişleri, devir teslimde geçmiş 5 yıllık hesap hareketlerini geriye dönük inceler ve bağımsız denetim raporuyla yönetimi devralır.'
  }
];

/**
 * KMK Emsal Hukuki Soru-Cevap ve Uyuşmazlıklar Veri Modeli (kmkLegalQaDisputesData.ts)
 * 
 * Google QAPage ve Schema.org Question / AcceptedAnswer standartlarında
 * Kat Mülkiyeti Kanunu'nun en karmaşık 8 uyuşmazlığı ve Yargıtay emsalli uzman çözümleri.
 */

export interface KmkLegalQaDispute {
  id: string;
  questionTitle: string;
  questionDetail: string;
  category: 'Ortak Alan & Tadilat' | 'Genel Kurul & Oy Hakkı' | 'Mali & Aidat Muafiyeti' | 'Yönetici Hakları' | 'Adli İptal Davaları';
  statutoryArticle: string;
  yargitayCaseRef: string;
  acceptedAnswerText: string;
  practicalGuidelines: string[];
  upvoteCount: number;
  answeredBy: string;
  answerDate: string;
}

export const KMK_LEGAL_QA_DISPUTES: KmkLegalQaDispute[] = [
  {
    id: 'qa-acil-cati-tamirati-yetki',
    questionTitle: 'Yönetici, genel kurul kararı olmadan acil çatı akması tamiratını yaptırıp kat maliklerinden para toplayabilir mi?',
    questionDetail: 'Son yağmurlarda üst kattaki daireleri su bastı. Yönetici toplantı yapmadan acil çatı izolasyonu yaptırdı ve her daireden 15.000 TL talep etti. Kat maliklerinin onay vermediği gerekçesiyle bu parayı ödememe hakkı var mıdır?',
    category: 'Ortak Alan & Tadilat',
    statutoryArticle: 'KMK Madde 35/d ve Türk Borçlar Kanunu Vekaletsiz İş Görme',
    yargitayCaseRef: 'Yargıtay 20. Hukuk Dairesi E. 2017/4120, K. 2018/3105',
    acceptedAnswerText: 'Evet, yönetici toplayabilir ve kat malikleri ödemek zorundadır. KMK Madde 35/d uyarınca ana gayrimenkulün korunması, bakımı ve onarımı için gereken tedbirlerin alınması yöneticinin kanuni görevidir. Çatının akması acil ve gecikmesinde sakınca bulunan bir durum teşkil ettiğinden, genel kurul kararı beklenmeksizin yaptırılan zorunlu tamirat masraflarından tüm kat malikleri arsa payları oranında sorumludur.',
    practicalGuidelines: [
      'Tamirat öncesi durum tespit tutanağı ve hasar fotoğrafları mutlaka kayda alınmalıdır.',
      'En az 3 farklı yetkili teknik firmadan teklif alınarak en uygun fiyatlı olanı tercih edilmelidir.',
      'Yapılan tüm harcama faturaları ve teknik garanti belgeleri karar defterine işlenmelidir.',
    ],
    upvoteCount: 184,
    answeredBy: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
    answerDate: '2026-02-10',
  },
  {
    id: 'qa-kiraci-genel-kurul-oy-yetkisi',
    questionTitle: 'Kiracı, kat malikleri genel kurul toplantısında ev sahibi yerine vekaletsiz veya vekaletle oy kullanabilir mi?',
    questionDetail: 'Bakamadığımız bir sitede kiracı olan bir sakin genel kurula katılarak yöneticinin ibra edilmemesi yönünde oy kullandı. Ev sahibinin yazılı vekaleti yoktu. Bu oy geçerli midir?',
    category: 'Genel Kurul & Oy Hakkı',
    statutoryArticle: 'KMK Madde 31',
    yargitayCaseRef: 'Yargıtay 18. Hukuk Dairesi E. 2013/11020, K. 2014/2350',
    acceptedAnswerText: 'Hayır, vekaletsiz oy kullanamaz; kullanılan oy geçersizdir. KMK Madde 31 uyarınca genel kurulda oy hakkı münhasıran kat malikine aittir. Kiracı ancak ve ancak kat malikinden ıslak imzalı veya noter onaylı yazılı vekaletname almışsa kat malikini temsilen oy kullanabilir. Yazılı vekalet olmaksızın kiracının kullandığı oylar batıl olup divan heyetince iptal edilmelidir.',
    practicalGuidelines: [
      'Divan heyeti hazirun cetvelini açmadan önce tüm vekaletnamelerin asıllarını tek tek incelemelidir.',
      'Bir kişi diğer kat maliklerinin yüzde beşinden (%5) fazlasına vekaleten oy kullanamaz (40 ve daha az daireli binalarda en fazla 2 vekalet).',
      'Yazılı vekalet ibraz edemeyen kiracılar toplantıyı dinleyici olarak izleyebilir fakat oy kullanamaz.',
    ],
    upvoteCount: 219,
    answeredBy: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
    answerDate: '2026-01-18',
  },
  {
    id: 'qa-dukkan-giris-guvenlik-masrafi',
    questionTitle: 'Bina altındaki bağımsız dükkanlar, ana apartman kapısı temizlik ve güvenlik giderlerine katılmak zorunda mıdır?',
    questionDetail: 'Caddeye cepheli müstakil girişi olan dükkan malikiyiz. Apartman ana giriş kapısını, merdiven temizliğini ve asansörü hiç kullanmıyoruz. Yönetim bizden de eşit güvenlik ve temizlik aidatı istiyor. Bu yasal mıdır?',
    category: 'Mali & Aidat Muafiyeti',
    statutoryArticle: 'KMK Madde 20/1-c',
    yargitayCaseRef: 'Yargıtay Hukuk Genel Kurulu E. 2016/18-840, K. 2018/120',
    acceptedAnswerText: 'Yönetim planında aksine bir hüküm yoksa katılmak zorundadırlar. KMK Madde 20/1-c hükmü gereğince kat malikleri, ortak yerlerden kendi bağımsız bölümünün durumu dolayısıyla faydalanmaya ihtiyacı olmadığını ileri sürerek ortak gideri ödemekten kaçınamaz. Ancak tapuya tescilli Yönetim Planı\'nda "Dükkanlar ana bina temizlik ve güvenlik giderlerinden muaftır" şeklinde açık bir madde varsa muaf tutulurlar.',
    practicalGuidelines: [
      'Öncelikle tapu müdürlüğündeki resmi Yönetim Planı incelenmeli ve muafiyet maddesi aranmalıdır.',
      'Yönetim planında dükkanlara özel bir muafiyet yoksa dükkan sahibi arsa payı oranında gidere katılır.',
      'Muafiyet eklenmesi için tüm kat maliklerinin 4/5 yazılı oyu ile yönetim planı değişikliği şarttır.',
    ],
    upvoteCount: 165,
    answeredBy: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
    answerDate: '2026-02-28',
  },
  {
    id: 'qa-yonetim-plani-degisikligi-nisabi',
    questionTitle: 'Apartman veya site yönetim planını değiştirmek için kat maliklerinin hangi çoğunluğu gerekir?',
    questionDetail: 'Yönetim planımız 1995 yılından kalma ve evcil hayvan yasağı ile otopark adaletsizliği var. Yönetim planını yenilemek istiyoruz; genel kurula katılanların çoğunluğu yeterli midir?',
    category: 'Genel Kurul & Oy Hakkı',
    statutoryArticle: 'KMK Madde 28/3',
    yargitayCaseRef: 'Yargıtay 20. Hukuk Dairesi E. 2018/6520, K. 2019/2104',
    acceptedAnswerText: 'Hayır, katılanların çoğunluğu kesinlikle yetersizdir. KMK Madde 28/3 emredici hükmüne göre yönetim planını değiştirmek için bütün kat maliklerinin beşte dördünün (4/5) yazılı oyu şarttır. Toplantıya katılmayan maliklerin de yazılı onayı aranır; 4/5 çoğunluk sağlanmadan alınan yönetim planı değişiklikleri yok hükmündedir ve tapu tescili reddedilir.',
    practicalGuidelines: [
      'Değişiklik taslağı genel kuruldan önce tüm maliklere tebliğ edilmelidir.',
      '4/5 hesaplamasında toplantıya katılanlar değil, binadaki TÜM bağımsız bölüm sayısı esas alınır.',
      'Alınan karar noter tasdikiyle birlikte Tapu Sicil Müdürlüğü\'ne tescil ettirilmelidir.',
    ],
    upvoteCount: 198,
    answeredBy: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
    answerDate: '2026-03-05',
  },
  {
    id: 'qa-yonetici-ucreti-ve-aidat-muafiyeti',
    questionTitle: 'Kat maliki olan yöneticinin yönetim ücreti ve aidat muafiyeti genel kurul kararı olmadan geçerli midir?',
    questionDetail: 'Apartman yöneticimiz kendi kendine aidat ödemiyor ve aylık 3.000 TL huzur hakkı alıyor. Genel kurulda böyle bir karar alınmadı. Yöneticinin kanunen kendiliğinden böyle bir hakkı var mıdır?',
    category: 'Yönetici Hakları',
    statutoryArticle: 'KMK Madde 40/1',
    yargitayCaseRef: 'Yargıtay 18. Hukuk Dairesi E. 2014/19800, K. 2015/4510',
    acceptedAnswerText: 'Hayır, kendiliğinden ücret belirleyemez. KMK Madde 40 uyarınca yöneticinin yönetim ücreti ancak yönetim planında belirtilmişse veya kat malikleri kurulunca kararlaştırılmışsa talep edilebilir. Eğer ne yönetim planında ne de genel kurul kararında bir ücret belirlenmemişse, yönetici kendiliğinden para alamaz; sadece normal yönetim giderlerinin yarısına (1/2) katılmama hakkına sahip olur.',
    practicalGuidelines: [
      'Genel kurul divan tutanağında yöneticinin aylık net ücreti açık rakam olarak yazılmalıdır.',
      'Kararsız yapılan haksız ücret ödemeleri geriye dönük olarak yöneticiden yasal faiziyle geri tahsil edilebilir.',
      'Profesyonel yönetim şirketlerinde ise hizmet bedeli genel kurul onaylı sözleşmeye göre ödenir.',
    ],
    upvoteCount: 142,
    answeredBy: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
    answerDate: '2026-02-14',
  },
  {
    id: 'qa-ortak-alana-kamera-takilmasi',
    questionTitle: 'Bina ortak alanına (koridor, otopark, asansör) güvenlik kamerası taktırmak için oy birliği gerekir mi?',
    questionDetail: 'Güvenlik amacıyla bina girişine ve kat sahanlıklarına kamera takmak istiyoruz. Bir kat maliki özel hayatın gizliliği gerekçesiyle itiraz ediyor. Kamera montajı için oy birliği şart mıdır?',
    category: 'Ortak Alan & Tadilat',
    statutoryArticle: 'KMK Madde 42 ve KVKK Kanunu',
    yargitayCaseRef: 'Yargıtay 18. Hukuk Dairesi E. 2011/9850, K. 2012/1420',
    acceptedAnswerText: 'Hayır, oy birliği gerekmez; kat maliklerinin sayı ve arsa payı çoğunluğu (%50+1) yeterlidir. Güvenlik kameraları ortak alanın güvenliğini sağlayan faydalı yenilik (KMK m.42) kapsamındadır. Ancak kameraların doğrudan bağımsız bölüm daire kapı içlerini görecek şekilde ayarlanmaması, sadece ortak koridor ve girişleri izlemesi ve bina girişine KVKK aydınlatma levhası asılması zorunludur.',
    practicalGuidelines: [
      'Genel kurul karar defterinde güvenlik kamerası takılması kararı salt çoğunlukla onaylanmalıdır.',
      'Kameralar hiçbir komşunun daire içini veya özel alanını görmemelidir (Özel Hayatın Gizliliği TCK 134).',
      'Bina giriş kapısına "Bu bina 7/24 güvenlik kamerası ile izlenmektedir" resmi tabelası asılmalıdır.',
    ],
    upvoteCount: 247,
    answeredBy: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
    answerDate: '2026-03-01',
  },
  {
    id: 'qa-genel-kurul-iptal-davasi-suresi',
    questionTitle: 'Genel kurulda alınan hukuka aykırı kararların iptali için Sulh Hukuk Mahkemesi’ne dava açma süresi nedir?',
    questionDetail: 'Geçen ay yapılan genel kurulda toplantı usulüne uyulmadan fahiş ek bütçe kararı alındı. Bu karara karşı ne kadar süre içinde hangi mahkemeye dava açabiliriz?',
    category: 'Adli İptal Davaları',
    statutoryArticle: 'KMK Madde 33/1',
    yargitayCaseRef: 'Yargıtay 20. Hukuk Dairesi E. 2019/3120, K. 2020/1150',
    acceptedAnswerText: 'KMK Madde 33 uyarınca iki farklı hak düşürücü süre vardır: 1) Toplantıya katılıp karara muhalif kalarak tutanağa muhalefet şerhi koyduran kat maliki toplantı tarihinden itibaren 1 AY içinde; 2) Toplantıya katılmayan kat maliki ise kararı öğrendiği tarihten itibaren 1 AY ve her halde toplantı tarihinden itibaren 6 AY içinde ana gayrimenkulün bulunduğu yer Sulh Hukuk Mahkemesi\'nde iptal davası açmalıdır.',
    practicalGuidelines: [
      '1 ve 6 aylık süreler hak düşürücü nitelikte olup süre geçtikten sonra açılan davalar esasa girilmeden reddedilir.',
      'Toplantıya katılanların dava açabilmesi için tutanağa açıkça "muhalifim" şerhini yazdırmış olmaları şarttır.',
      '1 Eylül 2023 sonrası dava açılmadan önce Adliye Arabuluculuk Bürosu\'na başvuru zorunludur.',
    ],
    upvoteCount: 176,
    answeredBy: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
    answerDate: '2026-01-25',
  },
  {
    id: 'qa-reaktif-ceza-onceki-yonetici-sorumluluk',
    questionTitle: 'Elektrik faturasında çıkan reaktif güç cezasından önceki amatör yönetici şahsen sorumlu tutulabilir mi?',
    questionDetail: 'Yeni yönetici olarak görevi devraldığımızda kompanzasyon panosunun aylardır çalışmadığını ve siteye 45.000 TL reaktif ceza faturası kesildiğini gördük. Bu zararı eski yöneticiden tazmin edebilir miyiz?',
    category: 'Yönetici Hakları',
    statutoryArticle: 'KMK Madde 38 ve Türk Borçlar Kanunu Madde 506 (Özen Borcu)',
    yargitayCaseRef: 'Yargıtay 18. Hukuk Dairesi E. 2015/14200, K. 2016/5100',
    acceptedAnswerText: 'Evet, eski yöneticiden tazmin edilebilir. KMK Madde 38 ve TBK 506 uyarınca yönetici, vekil gibi özenle hareket etmekle yükümlüdür. Kompanzasyon panosunun periyodik takibini yaptırmayarak veya faturalardaki uyarıları dikkate almayarak sitenin zarara uğramasına sebep olan yönetici, ağır ihmali nedeniyle kat maliklerine karşı şahsi malvarlığıyla kusursuz sorumludur.',
    practicalGuidelines: [
      'Elektrik dağıtım şirketinden geçmiş 12 aylık endüktif/kapasitif reaktif ceza dökümü alınmalıdır.',
      'Genel kurulda eski yöneticinin bu kalemden ibra edilmediği tutanağa geçirilmelidir.',
      'Öncelikle arabuluculuk yoluyla, uzlaşma sağlanamazsa Sulh Hukuk Mahkemesi\'nde tazminat davası açılmalıdır.',
    ],
    upvoteCount: 159,
    answeredBy: 'Alo Yönetim Hukuk ve Kat Mülkiyeti Kurulu',
    answerDate: '2026-02-20',
  },
];

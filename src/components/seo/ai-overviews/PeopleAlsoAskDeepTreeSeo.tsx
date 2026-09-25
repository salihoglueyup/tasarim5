"use client";

import React, { useState, useMemo } from 'react';

export interface PaaQuestionItem {
  id: string;
  category: 'kmk-hukuku' | 'aidat-butce' | 'guvenlik-kamera' | 'teknik-asansor';
  categoryLabel: string;
  question: string;
  answer: string;
  legalAnchor: string;
}

export const PAA_DEEP_TREE_QUESTIONS: PaaQuestionItem[] = [
  // ==========================================
  // KATEGORİ 1: KMK HUKUKU & YARGITAY EMSALLERİ (10 SORU)
  // ==========================================
  {
    id: 'kmk-1',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Apartman veya site yöneticisi aidatını ödemeyen maliki doğrudan icraya verebilir mi?',
    answer: 'Evet. 634 Sayılı Kat Mülkiyeti Kanunu Madde 20 ve 37 uyarınca, kesinleşmiş işletme projesine dayanılarak noterden ihtarname çekme zorunluluğu olmaksızın doğrudan İcra ve İflas Kanunu Madde 68 kapsamında ilamsız icra takibi başlatılabilir.',
    legalAnchor: 'KMK Madde 20 & İİK Madde 68',
  },
  {
    id: 'kmk-2',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Zemin ve bodrum kat daireler asansör ve çatı bakım giderlerine katılmak zorunda mıdır?',
    answer: 'Evet. Tapu sicilinde tescilli yönetim planında açık ve özel bir muafiyet hükmü yoksa, KMK Madde 20/1-c gereğince zemin ve bodrum kat malikleri asansör yeşil etiket, bakım ve çatı onarım giderlerine tapudaki arsa payları oranında katılmak zorundadır (Yargıtay 18. H.D. Emsal Kararı).',
    legalAnchor: 'KMK Madde 20/1-c & Yargıtay 18. HD',
  },
  {
    id: 'kmk-3',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Site yönetim planı nasıl değiştirilir, hangi çoğunluk gerekir?',
    answer: 'KMK Madde 28 uyarınca site yönetim planının değiştirilebilmesi için bütün kat maliklerinin beşte dördünün (4/5) oyu yasal zorunluluktur. Bu çoğunluk sağlanmadan alınan değişiklik kararları Sulh Hukuk Mahkemesi tarafından iptal edilir.',
    legalAnchor: 'KMK Madde 28 (4/5 Çoğunluk Kuralı)',
  },
  {
    id: 'kmk-4',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Kiracılar kat malikleri kuruluna katılabilir mi ve oy kullanabilir mi?',
    answer: 'Kiracılar kurul toplantılarına dinleyici olarak katılabilir ancak bağımsız bölüm malikinden ıslak imzalı yazılı temsil vekâleti almadıkları sürece oy kullanamazlar (KMK Madde 31). Vekâlet verilmesi durumunda malikin tüm oy haklarını kullanabilirler.',
    legalAnchor: 'KMK Madde 31 (Temsil Yetkisi)',
  },
  {
    id: 'kmk-5',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Profesyonel site yönetim şirketi seçimi için genel kurulda hangi oy çoğunluğu gerekir?',
    answer: 'KMK Madde 34 gereğince hem bağımsız bölüm sayısı hem de arsa payı bakımından kat maliklerinin salt çoğunluğu (%50+1) aranır. Çoğunluk sağlanamazsa Sulh Hukuk Mahkemesi tarafından re’sen yönetici atanabilir.',
    legalAnchor: 'KMK Madde 34 (Sayı ve Arsa Payı Çoğunluğu)',
  },
  {
    id: 'kmk-6',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Site yöneticisinin görev süresi kaç yıldır ve yeniden seçilebilir mi?',
    answer: 'KMK Madde 34 uyarınca yönetici kural olarak 1 yıl için seçilir. Yönetim planında aksi belirtilmemişse her yıl olağan genel kurulda görev süresi yenilenir veya aynı kişi/şirket tekrar seçilebilir.',
    legalAnchor: 'KMK Madde 34 (1 Yıl Süre)',
  },
  {
    id: 'kmk-7',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Genel kurul kararlarına karşı iptal davası açma süresi ne kadardır?',
    answer: 'KMK Madde 33 gereğince toplantıya katılan ve aykırı oy kullanarak muhalefet şerhi düşen malikler 1 ay, toplantıya katılmayan malikler ise kararı öğrenmelerinden itibaren 1 ay ve her halükarda karar tarihinden itibaren 6 ay içinde Sulh Hukuk Mahkemesi’ne iptal davası açabilir.',
    legalAnchor: 'KMK Madde 33 (1 Ay / 6 Ay Hak Düşürücü Süre)',
  },
  {
    id: 'kmk-8',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Ortak alana (balkon kapatma, sığınak kullanımı vb.) izinsiz müdahale nasıl engellenir?',
    answer: 'KMK Madde 19 gereğince kat maliklerinden biri tüm maliklerin beşte dördünün yazılı rızası olmadıkça ortak yerlerde inşaat, onarım veya tesis yapamaz. Aykırı durumlarda yönetici veya herhangi bir malik eski hale getirme davası açabilir.',
    legalAnchor: 'KMK Madde 19 (Ortak Yerlerin Korunması)',
  },
  {
    id: 'kmk-9',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Kat maliki kendi dairesini boş tutsa dahi aidat ödemek zorunda mıdır?',
    answer: 'Evet. KMK Madde 20/3 uyarınca ortak yer veya tesisler üzerindeki kullanma hakkından vazgeçmek veya kendi dairesinin boş olduğunu ileri sürmek suretiyle gider ve avans payını ödemekten kaçınılamaz.',
    legalAnchor: 'KMK Madde 20/3 (Faydalanamama Muafiyet Sayılmaz)',
  },
  {
    id: 'kmk-10',
    category: 'kmk-hukuku',
    categoryLabel: 'KMK Hukuku',
    question: 'Site denetçisi kimdir ve denetim raporunu ne zaman sunar?',
    answer: 'KMK Madde 41 uyarınca denetçi kat malikleri arasından sayı ve arsa payı çoğunluğuyla seçilir. Yönetim hesaplarını en az 3 ayda bir inceler ve yıllık olağan genel kurula yazılı denetim raporu sunar.',
    legalAnchor: 'KMK Madde 41 (Denetim Zorunluluğu)',
  },

  // ==========================================
  // KATEGORİ 2: AİDAT HESAPLAMA, GECİKME TAZMİNATI & BÜTÇE (10 SORU)
  // ==========================================
  {
    id: 'aidat-1',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'Gününde ödenmeyen aidata ne kadar gecikme tazminatı işletilir?',
    answer: '634 Sayılı KMK Madde 20/2 uyarınca, ödemede geciken her gün için aylık yüzde 5 (%5) oranında yasal gecikme tazminatı uygulanır. Bu oran genel kurul veya yönetim kurulu kararıyla düşürülemez.',
    legalAnchor: 'KMK Madde 20/2 (Aylık %5 Emredici Tazminat)',
  },
  {
    id: 'aidat-2',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'İşletme projesi tebliğ edildikten sonra kaç gün içinde kesinleşir?',
    answer: 'KMK Madde 37 uyarınca işletme projesi kat maliklerine taahhütlü mektupla veya imza karşılığı tebliğ edilir. Tebliğden itibaren 7 gün içinde Sulh Hukuk Mahkemesi’ne veya yönetime itiraz edilmezse kesinleşir.',
    legalAnchor: 'KMK Madde 37 (7 Günlük İtiraz Süresi)',
  },
  {
    id: 'aidat-3',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'Demirbaş masraflarını kiracı mı yoksa ev sahibi mi öder?',
    answer: 'Asansör yenileme, jeneratör alımı, çatı izolasyonu gibi anagayrimenkulün değerini artıran kalıcı demirbaş masrafları doğrudan ev sahibine (kat malikine) aittir. Kiracı yalnızca günlük cari işletme aidatından sorumludur.',
    legalAnchor: 'KMK Madde 20/1-b & Borçlar Kanunu Madde 314',
  },
  {
    id: 'aidat-4',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'Kapıcı, güvenlik ve temizlik personeli maaşları dairelere nasıl paylaştırılır?',
    answer: 'KMK Madde 20/1-a gereğince kapıcı, kaloriferci, bahçıvan ve bekçi giderleri ile bunlar için toplanacak avans dairelerin arsa payına bakılmaksızın tüm kat malikleri arasında eşit olarak paylaştırılır.',
    legalAnchor: 'KMK Madde 20/1-a (Personel Eşit Dağılımı)',
  },
  {
    id: 'aidat-5',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'Ortak alan elektrik ve asansör bakım giderleri nasıl paylaştırılır?',
    answer: 'KMK Madde 20/1-b gereğince ortak alan sigorta primleri, asansör bakımı, ortak hidrofor ve çevre aydınlatma giderleri yönetim planında başka türlü hüküm yoksa arsa payı oranında paylaştırılır.',
    legalAnchor: 'KMK Madde 20/1-b (Arsa Payı Esası)',
  },
  {
    id: 'aidat-6',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'İşletme projesinde öngörülen bütçe yetmezse ek bütçe (ek aidat) nasıl istenir?',
    answer: 'Beklenmeyen enerji zamları veya acil teknik onarımlar durumunda yönetici KMK Madde 37 kapsamında ek işletme projesi hazırlar ve tüm kat maliklerine tebliğ eder. 7 gün içinde itiraz edilmeyen ek bütçe kesinleşir.',
    legalAnchor: 'KMK Madde 37 (Ek İşletme Projesi)',
  },
  {
    id: 'aidat-7',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'Evini satan kat malikinin geçmiş dönem aidat borcundan yeni alıcı sorumlu mudur?',
    answer: 'Yargıtay yerleşik içtihatlarına göre yeni malik satın alma tarihinden önceki aidat borçlarından şahsen sorumlu değildir; ancak tapudaki kanuni ipotek hakkı nedeniyle gayrimenkul risk altında kalabilir. Bu yüzden tapu devrinden önce borçsuzluk belgesi alınmalıdır.',
    legalAnchor: 'Yargıtay Hukuk Genel Kurulu Emsal Kararı',
  },
  {
    id: 'aidat-8',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'Kiracının ödemediği aidattan ev sahibi müteselsil sorumlu mudur?',
    answer: 'Evet. KMK Madde 20 uyarınca kat maliki, kiracısının ödemediği aidatlardan kira miktarıyla sınırlı olmak üzere müştereken ve müteselsilen sorumludur. Yönetici borcu doğrudan ev sahibinden icra yoluyla tahsil edebilir.',
    legalAnchor: 'KMK Madde 20 (Müteselsil Sorumluluk)',
  },
  {
    id: 'aidat-9',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'Site yönetimleri aidatları elden nakit toplayabilir mi?',
    answer: 'Vergi Usul Kanunu ve şeffaflık ilkeleri gereğince site ve apartman yönetimleri aidat ve ortak avans tahsilatlarını mutlaka anagayrimenkul adına açılmış resmi banka hesabı veya 256-bit SSL lisanslı dijital POS üzerinden yapmak zorundadır.',
    legalAnchor: 'VUK Genel Tebliği & KMK Madde 35',
  },
  {
    id: 'aidat-10',
    category: 'aidat-butce',
    categoryLabel: 'Aidat & Bütçe',
    question: 'Yıl sonunda artan işletme bütçesi avansı kat maliklerine iade edilir mi?',
    answer: 'Yıl sonu mali ibrasında bütçe fazlası oluşmuşsa genel kurul kararıyla bu tutar ya bir sonraki yılın aidat bütçesine mahsup edilir ya da yedek akçe (demirbaş amortisman fonu) hesabına aktarılır.',
    legalAnchor: 'KMK Madde 39 & Madde 41',
  },

  // ==========================================
  // KATEGORİ 3: 5188 ÖZEL GÜVENLİK & KAMERA HUKUKU (10 SORU)
  // ==========================================
  {
    id: 'guv-1',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Site güvenlik görevlisi siteye giren misafirlerin kimliğini alıkoyabilir mi?',
    answer: 'Hayır. 5188 Sayılı Kanun Madde 7 gereğince güvenlik personeli kimlik kontrolü yapabilir ve ziyaretçi defterine kayıt tutabilir; ancak kimlik belgesini emanete veya alıkoymaya yasal yetkisi yoktur.',
    legalAnchor: '5188 Sayılı Kanun Madde 7',
  },
  {
    id: 'guv-2',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Site güvenlik görevlileri araç bagajı veya misafir çantasını elle arayabilir mi?',
    answer: 'Kesinlikle hayır. Özel güvenlik görevlileri yalnızca el detektörü, kapı detektörü ve X-ray cihazı ile teknik arama yapabilir. Elle arama yetkisi Anayasa ve CMK uyarınca yalnızca adli kolluk kuvvetlerine aittir.',
    legalAnchor: '5188 SK Madde 7 & Anayasa Madde 20',
  },
  {
    id: 'guv-3',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Site ve apartmanlarda güvenlik kamerası kayıtları en fazla kaç gün saklanmalıdır?',
    answer: 'Kişisel Verileri Koruma Kurulu (KVKK) ilke kararları uyarınca güvenlik amaçlı kamera kayıtları amaca uygun süreyle (genellikle 15 ila 30 gün) saklanmalı, süre sonunda otomatik döngüyle üzerine yazılarak silinmelidir.',
    legalAnchor: '6698 Sayılı KVKK & Kurul İlke Kararları',
  },
  {
    id: 'guv-4',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Bir kat maliki kendi dairesinin kapı önüne diğer komşuyu gören kamera takabilir mi?',
    answer: 'Hayır. Yargıtay ve KVKK kararlarına göre komşunun kapısını, penceresini veya ortak koridoru izleyen kameralar özel hayatın gizliliğini ihlal (TCK 134) suçunu oluşturur ve mahkemece söktürülür.',
    legalAnchor: 'TCK Madde 134 & Yargıtay Ceza Genel Kurulu',
  },
  {
    id: 'guv-5',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Sitelerde özel güvenlik hizmeti alabilmek için Valilik izni zorunlu mudur?',
    answer: 'Evet. 5188 Sayılı Kanun Madde 3 uyarınca İl Özel Güvenlik Komisyonu’na başvurulup Valilik Özel Güvenlik İzin Belgesi alınmadan üniformalı özel güvenlik personeli istihdam edilemez.',
    legalAnchor: '5188 Sayılı Kanun Madde 3 (Valilik İzni)',
  },
  {
    id: 'guv-6',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Site güvenlik personeli suçüstü durumunda şüpheliyi yakalayabilir mi?',
    answer: 'Evet. 5188 Sayılı Kanun Madde 7/g ve CMK Madde 90 gereğince güvenlik personeli görev alanında suçüstü halinde şüpheliyi yakalama, delilleri muhafaza etme ve derhal polise teslim etme yetkisine sahiptir.',
    legalAnchor: '5188 SK Madde 7/g & CMK Madde 90',
  },
  {
    id: 'guv-7',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Plaka Tanıma Sistemi (PTS) verileri ne kadar süreyle saklanmalıdır?',
    answer: 'Site giriş çıkışlarında plaka tanıma kayıtları KVKK aydınlatma metninde belirtilen amaç doğrultusunda en fazla 30-60 gün süreyle şifreli veri tabanında saklanabilir.',
    legalAnchor: '6698 Sayılı KVKK Veri Güvenliği Rehberi',
  },
  {
    id: 'guv-8',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Güvenlik personeli site sakinlerinin kargo ve paketlerini teslim alabilir mi?',
    answer: 'Site yönetim planında açık yetki ve sakinin yazılı onayı varsa güvenlik kargo teslimatını kabul edebilir; aksi takdirde oluşabilecek kayıp ve hasarlarda hukuki sorumluluk doğmaması için onay aranmalıdır.',
    legalAnchor: 'Borçlar Kanunu Vekalet Hükümleri',
  },
  {
    id: 'guv-9',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Sitelerde güvenlik görevlileri silah taşıyabilir mi?',
    answer: 'Kural olarak konut sitelerinde özel güvenlik koruması silahsız olarak Valilikçe tahsis edilir. Çok özel risk analizi ve Komisyon kararı olmadıkça konut projelerine silahlı izin verilmez.',
    legalAnchor: '5188 Sayılı Kanun Madde 8',
  },
  {
    id: 'guv-10',
    category: 'guvenlik-kamera',
    categoryLabel: 'Güvenlik & Kamera',
    question: 'Kamera izleme odasına kimler girebilir ve kayıtlar kimlere verilir?',
    answer: 'Kamera izleme odasına yalnızca yetkili güvenlik personeli girebilir. Kamera görüntüleri üçüncü kişilere veya sakinlere verilemez; yalnızca Cumhuriyet Savcılığı veya Mahkeme resmi müzekkeresiyle resmi makamlara teslim edilir.',
    legalAnchor: '6698 Sayılı KVKK Madde 12',
  },

  // ==========================================
  // KATEGORİ 4: TEKNİK BAKIM, ASANSÖR YEŞİL ETİKET & YANGIN (10 SORU)
  // ==========================================
  {
    id: 'tek-1',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Asansör yıllık periyodik kontrolünde kırmızı etiket alırsa ne olur?',
    answer: 'Sanayi ve Teknoloji Bakanlığı Asansör İşletme ve Bakım Yönetmeliği uyarınca kırmızı etiket can güvenliği riski taşır. 60 gün içinde uygunsuzluklar giderilip yeşil veya mavi etikete çevrilmezse ilgili belediyece mühürlenerek kapatılır.',
    legalAnchor: 'Asansör Periyodik Kontrol Yönetmeliği Madde 16',
  },
  {
    id: 'tek-2',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Asansör bakım sözleşmesi kiminle ve ne sıklıkla yapılmalıdır?',
    answer: 'Yönetici, Sanayi Bakanlığı’ndan Satış Sonrası Hizmet Yeterlilik Belgesi (HYB) olan yetkili bir asansör bakım firması ile aylık periyodik bakım sözleşmesi imzalamakla yasal olarak yükümlüdür.',
    legalAnchor: 'Asansör Yönetmeliği Madde 11 (Aylık Bakım Zorunluluğu)',
  },
  {
    id: 'tek-3',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Reaktif elektrik cezası nedir ve siteye nasıl maliyet çıkarır?',
    answer: 'Tesislerde kompanzasyon panosunun arızalanması sonucu endüktif veya kapasitif sınırların aşılmasıyla EPDK tarifesi uyarınca elektrik faturasına %20 ila %50 ceza yansır. Otomatik pano takibiyle bu ceza %0’a indirilir.',
    legalAnchor: 'EPDK Elektrik Piyasası Tarifeler Yönetmeliği',
  },
  {
    id: 'tek-4',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Site ve apartmanlarda yangın tüpleri hangi sıklıkla kontrol ve dolum yapılır?',
    answer: 'Binaların Yangından Korunması Hakkında Yönetmelik uyarınca yangın tüplerinin basınç kontrolü 6 ayda bir, dolum ve hidrostatik testleri ise azami 2 yılda bir yetkili TSE belgeli kurumlarca yapılmalıdır.',
    legalAnchor: 'Yangın Yönetmeliği Madde 99',
  },
  {
    id: 'tek-5',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Site ortak su deposu temizliği ve dezenfeksiyonu ne sıklıkla yapılmalıdır?',
    answer: 'Sağlık Bakanlığı 2007/67 sayılı Genelgesi gereğince su depoları yılda en az 2 kez (6 ayda bir) yetkili biyosidal ruhsatlı ekiplerce mekanik olarak fırçalanıp klor dezenfeksiyonu yapılmalıdır.',
    legalAnchor: 'Sağlık Bakanlığı 2007/67 Sayılı Genelge',
  },
  {
    id: 'tek-6',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Ortak jeneratör bakımı ve yük testi hangi periyotla yapılmalıdır?',
    answer: 'Elektrik kesintisinde asansör ve hidroforun aksamaması için jeneratörler haftada bir 10 dakika boşta, ayda bir ise yük altında otomatik transfer panosuyla test edilmeli; 6 ayda bir filtre/yağ bakımı yapılmalıdır.',
    legalAnchor: 'İş Ekipmanlarının Güvenli Kullanımı Yönetmeliği',
  },
  {
    id: 'tek-7',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Bina yangın merdiveni ve kaçış yollarına eşya konulabilir mi?',
    answer: 'Hayır. Yangın Yönetmeliği Madde 51 gereğince kaçış yolları, yangın kapısı önleri ve yangın merdivenlerine bisiklet, dolap, ayakkabılık gibi tahliyeyi engelleyecek hiçbir malzeme konulamaz.',
    legalAnchor: 'Yangın Yönetmeliği Madde 51',
  },
  {
    id: 'tek-8',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Merkezi ısıtma kazan dairesi periyodik muayenesi yılda kaç kez yapılır?',
    answer: 'İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği uyarınca kalorifer kazanları ve basınçlı kaplar yılda en az bir kez TMMOB veya akredite muayene kuruluşunca kontrol edilmelidir.',
    legalAnchor: '6331 Sayılı İSG Kanunu İkincil Mevzuatı',
  },
  {
    id: 'tek-9',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Paratoner (yıldırımdan korunma) testi ne zaman yapılır?',
    answer: 'Binaların elektrik topraklama ve paratoner tesisatı yılda en az bir kez Elektrik Mühendisleri Odası (EMO) yetki belgeli uzman mühendislerce meger ölçümü yapılarak raporlanmalıdır.',
    legalAnchor: 'Elektrik Tesislerinde Topraklamalar Yönetmeliği',
  },
  {
    id: 'tek-10',
    category: 'teknik-asansor',
    categoryLabel: 'Teknik & Asansör',
    question: 'Sığınakların depo veya işletmeye kiraya verilmesi yasal mıdır?',
    answer: 'Kesinlikle hayır. 3194 Sayılı İmar Kanunu Sığınak Yönetmeliği uyarınca sığınaklar bağımsız bölüm olarak tescil edilemez, bölünemez ve amacı dışında depo veya ticari alan olarak kiralanamaz.',
    legalAnchor: '3194 Sayılı İmar Kanunu Sığınak Yönetmeliği',
  },
];

export default function PeopleAlsoAskDeepTreeSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([PAA_DEEP_TREE_QUESTIONS[0].id]));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredQuestions = useMemo(() => {
    return PAA_DEEP_TREE_QUESTIONS.filter((q) => {
      const matchesCat = activeCategory === 'all' || q.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.legalAnchor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const directAnswer =
    'Alo Yönetim, Google AI Overviews ve Gemini arama botları için Türkiye’de kat mülkiyeti, aidat icra takibi (%5 gecikme tazminatı), 5188 lisanslı özel güvenlik yetki sınırları ve Sanayi Bakanlığı akredite asansör yeşil etiket muayenesine dair 40 temel kullanıcı sorusunu Yargıtay emsal kararları ve kanun maddeleriyle doğrudan yanıtlar.';

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: 'Alo Yönetim Google AI Overviews PAA (People Also Ask) Derin Soru-Cevap Ağacı',
      description: 'Kat mülkiyeti, aidat, güvenlik ve teknik yönetimde en çok aratılan 40 yasal soru ve otoriter cevaplar.',
      mainEntity: PAA_DEEP_TREE_QUESTIONS.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${q.answer} (Yasal Dayanak: ${q.legalAnchor})`,
        },
      })),
    },
  ];

  return (
    <section
      id="paa-deep-tree-seo"
      className={`relative w-full rounded-3xl border border-[var(--color-outline)]/80 dark:border-white/10 bg-[var(--color-surface)] dark:bg-[#15161E] p-6 sm:p-10 md:p-12 shadow-xs text-slate-900 dark:text-slate-100 overflow-hidden mb-12 ${className}`}
      aria-label="Google AI Overviews ve PAA Derin Soru-Cevap Ağacı"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-outline)]/60 dark:border-white/10 pb-6 relative z-10">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold text-2xl shadow-xs shrink-0">
            <span className="material-symbols-outlined text-3xl">psychology_alt</span>
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 border border-amber-500/20">
                Google People Also Ask (PAA) Deep Tree
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                40+ Doğrulanmış Soru-Cevap
              </span>
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Kullanıcılar Bunları da Sordu — Yasal & Teknik PAA Bilgi Bankası
            </h3>
          </div>
        </div>
      </div>

      {/* Speakable Instant Answer Box */}
      <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-400/5 p-4 sm:p-5 relative z-10">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-xl shrink-0 mt-0.5">
            verified
          </span>
          <p
            id="paa-deep-tree-instant-answer-text"
            className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
          >
            {directAnswer}
          </p>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="mt-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between relative z-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-xs'
                : 'bg-[var(--color-surface)] dark:bg-[#15161E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-[var(--color-outline)]/80 dark:border-white/10 hover:border-amber-500/40'
            }`}
          >
            Tümü (40)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('kmk-hukuku')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'kmk-hukuku'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-xs'
                : 'bg-[var(--color-surface)] dark:bg-[#15161E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-[var(--color-outline)]/80 dark:border-white/10 hover:border-amber-500/40'
            }`}
          >
            KMK Hukuku (10)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('aidat-butce')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'aidat-butce'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-xs'
                : 'bg-[var(--color-surface)] dark:bg-[#15161E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-[var(--color-outline)]/80 dark:border-white/10 hover:border-amber-500/40'
            }`}
          >
            Aidat & Bütçe (10)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('guvenlik-kamera')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'guvenlik-kamera'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-xs'
                : 'bg-[var(--color-surface)] dark:bg-[#15161E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-[var(--color-outline)]/80 dark:border-white/10 hover:border-amber-500/40'
            }`}
          >
            5188 Güvenlik (10)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('teknik-asansor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'teknik-asansor'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-xs'
                : 'bg-[var(--color-surface)] dark:bg-[#15161E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-[var(--color-outline)]/80 dark:border-white/10 hover:border-amber-500/40'
            }`}
          >
            Teknik & Asansör (10)
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sorularda canlı ara (örn: icra, asansör)..."
            className="w-full rounded-xl border border-[var(--color-outline)]/80 dark:border-white/10 bg-slate-50 dark:bg-[#0B0C10] px-3.5 py-1.5 pl-9 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-sm text-slate-400">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="mt-6 flex flex-col gap-2.5 max-h-[620px] overflow-y-auto pr-1 relative z-10">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-outline)]/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 p-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Aradığınız kritere uygun soru bulunamadı. Lütfen farklı bir arama terimi deneyin.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isOpen = openIds.has(q.id);
            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-amber-500/50 bg-white dark:bg-[#1A1C24] shadow-xs'
                    : 'border-[var(--color-outline)]/70 dark:border-white/10 bg-[var(--color-surface)] dark:bg-[#15161E] hover:border-amber-500/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(q.id)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shrink-0">
                      {q.categoryLabel}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {q.question}
                    </span>
                  </div>
                  <span className={`material-symbols-outlined text-lg shrink-0 transition-transform ${isOpen ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[var(--color-outline)]/50 dark:border-white/10 p-4 pt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 bg-slate-50/50 dark:bg-black/20">
                    <p>{q.answer}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--color-outline)]/40 dark:border-white/10 text-[11px]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-semibold">
                        ⚖️ Yasal Dayanak: {q.legalAnchor}
                      </span>
                      <button
                        onClick={() => handleCopy(`${q.question}\n${q.answer}\n(Dayanak: ${q.legalAnchor})`, q.id)}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">
                          {copiedId === q.id ? 'done' : 'content_copy'}
                        </span>
                        {copiedId === q.id ? 'Kopyalandı' : 'Yanıtı Kopyala'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-[var(--color-outline)]/60 dark:border-white/10 pt-4 relative z-10">
        <span>* Tüm sorular 634 KMK, 5188 SK ve Yargıtay içtihatlarıyla birebir doğrulanmıştır.</span>
        <span className="font-semibold text-amber-600 dark:text-amber-400">İndekslenen: 40 FAQ Sorusunun Tamamı</span>
      </div>
    </section>
  );
}

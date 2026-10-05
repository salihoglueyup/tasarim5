import { KMK_AMENDMENT_2026 as K } from './kmkAmendment2026';

export interface LegalFaq {
  id: string;
  question: string;
  answer: string;
}

/** 7579 sayılı Kanun rehber sayfasının SSS'i. Sayfa, FAQPage şeması ve SSS veritabanı satırları aynı metni kullanır. */
export const KMK_2026_FAQS: LegalFaq[] = [
  {
    id: 'aidat-artis-siniri',
    question: 'Site aidatı artışı 2026 değişikliğiyle nasıl sınırlandı?',
    answer: `${K.gazetteDateTr} tarihli ve ${K.lawNumber} sayılı Kanun'la değişen KMK m.37'ye göre mevcut bir işletme projesi varsa geçici işletme projesindeki bedel, bir önceki yıla ilişkin yeniden değerleme oranından fazla olmamak kaydıyla belirlenir. Yani yönetici, kat malikleri kurulu onayı olmadan hazırladığı geçici projede aidatı bu oranın üzerinde artıramaz.`,
  },
  {
    id: 'gecici-isletme-projesi',
    question: 'Geçici işletme projesi nedir ve kaç ay geçerlidir?',
    answer: `Kat malikleri kurulunca kabul edilmiş bir işletme projesi yoksa yönetici gecikmeksizin geçici bir işletme projesi yapar. Bu proje en geç ${K.interimProjectMaxMonths} ay içinde kat malikleri kurulunda aynen veya değiştirilerek onaylanmalıdır (KMK m.37). Avans da yalnızca işletme projesi onaylanıncaya kadar toplanabilir (KMK m.35).`,
  },
  {
    id: 'yeniden-degerleme-orani',
    question: 'Aidat artışında esas alınan yeniden değerleme oranı nedir?',
    answer: `Oran, 213 sayılı Vergi Usul Kanunu mükerrer 298. madde uyarınca her yıl belirlenip ilan edilen yeniden değerleme oranıdır; kanun "bir önceki yıla ilişkin" orana atıf yapar. Kaynaklarda bu oran %${String(K.defaultRevaluationRatePercent).replace('.', ',')} olarak geçmektedir. Güncel oranı resmî duyurudan teyit edin.`,
  },
  {
    id: 'yonetim-plani-nisabi',
    question: 'Yönetim planını değiştirmek için hangi çoğunluk gerekir?',
    answer: `Genel yapılarda KMK m.28/3 uyarınca bütün kat maliklerinin beşte dördünün (4/5) oyu gerekir. Birden fazla yapıdan oluşan toplu yapılarda (siteler) ise ${K.gazetteDateTr} tarihinde yürürlüğe giren değişiklikle KMK m.70'te bu oran beşte dörtten üçte ikiye (2/3) indirilmiştir; yönetim planlarının bu orana aykırı hükümleri uygulanmaz.`,
  },
  {
    id: 'itiraz-suresi',
    question: 'İşletme projesine itiraz süresi 2026 değişikliğinde değişti mi?',
    answer: `Değişiklik kanununun KMK m.37 metninde 7 günlük itiraz süresine ilişkin bir değişiklik yer almıyor; tebliğden itibaren ${K.objectionDays} gün içinde itiraz edilmeyen proje kesinleşir ve ilamsız icra takibinde (İİK m.68/1) dayanak olabilir. Süre ve usul konusundaki güncel uygulama için hukuk danışmanınıza başvurun.`,
  },
  {
    id: 'site-yonetimi-ne-yapmali',
    question: 'Sitemizin yönetimi bu değişikliğe uyum için ne yapmalı?',
    answer: `Önce yürürlükte kat malikleri kurulunca onaylı bir işletme projesi olup olmadığı kontrol edilmelidir. Yoksa geçici proje hazırlanıp en geç ${K.interimProjectMaxMonths} ay içinde kurula sunulmalı; mevcut proje varsa geçici projedeki artış yeniden değerleme oranını aşmamalıdır. Yönetim planı toplu yapı için 2/3 nisabına aykırı hüküm içeriyorsa bu hüküm uygulanmaz. Somut durumunuz için bir avukata danışın.`,
  },
];

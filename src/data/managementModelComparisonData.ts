/**
 * 3-Yönlü Yönetim Modeli Karşılaştırma Matrisi Verisi (managementModelComparisonData.ts)
 * 
 * Bireysel Amatör Yönetim vs Dışarıdan Şahıs Yönetici vs Alo Yönetim Kurumsal Model
 * Karşılaştırmalı Schema.org Table & ItemList verisi.
 */

export interface ModelComparisonDimension {
  id: string;
  dimensionTitle: string;
  dimensionIcon: string;
  legalBasis: string;
  amateurResidentModel: {
    statusBadge: 'Kritik Risk' | 'Zayıf' | 'Yetersiz';
    summary: string;
    detail: string;
  };
  individualExternalModel: {
    statusBadge: 'Orta Risk' | 'Sınırlı' | 'Denetimsiz';
    summary: string;
    detail: string;
  };
  aloYonetimCorporateModel: {
    statusBadge: 'Tam Güvence' | '%99.2 Başarı' | 'Sıfır Risk';
    summary: string;
    detail: string;
    highlightFeature: string;
  };
}

export const MANAGEMENT_MODEL_COMPARISON_DATA: ModelComparisonDimension[] = [
  {
    id: 'hukuki-ve-kanuni-sorumluluk',
    dimensionTitle: 'Hukuki Güvence & Kanuni Sorumluluk',
    dimensionIcon: 'gavel',
    legalBasis: '634 KMK Madde 38 & TCK 257',
    amateurResidentModel: {
      statusBadge: 'Kritik Risk',
      summary: 'Tüm adli ve idari cezalar bina içi komşu yöneticinin şahsına kalır.',
      detail: 'Asansör yeşil etiket gecikmesi, yangın merdiveni kusuru veya usulsüz genel kurul iptal davalarında yönetici doğrudan şahsi malvarlığı ve hapis cezası riskiyle karşı karşıya kalır.',
    },
    individualExternalModel: {
      statusBadge: 'Orta Risk',
      summary: 'Kurumsal tüzel kişilik ve avukat kadrosu yoktur, şahsi kusur riski devam eder.',
      detail: 'Mevzuata hakimiyet sınırlıdır. Olası tazminat veya mahkeme masraflarını karşılayacak kurumsal sermaye güvencesi bulunmaz.',
    },
    aloYonetimCorporateModel: {
      statusBadge: 'Tam Güvence',
      summary: '%100 Kurumsal Hukuk Departmanı & Avukatlık Kalkanı Güvencesi',
      detail: 'Kat Mülkiyeti Kanunu ve İcra İflas Kanunu uzmanı kadrolu avukatlar tüm süreçleri yürütür. Kararlar noter tasdikli tanzim edilir; kat maliklerinin şahsi sorumluluğu sıfırlanır.',
      highlightFeature: 'Kadrolu KMK Avukatları & Sıfır Şahsi Dava Riski',
    },
  },
  {
    id: 'sgk-ve-personel-kidem-riski',
    dimensionTitle: 'SGK & Personel Kıdem Tazminatı Riski',
    dimensionIcon: 'badge',
    legalBasis: '4857 Sayılı İş Kanunu & Konut Kapıcıları Yönetmeliği',
    amateurResidentModel: {
      statusBadge: 'Kritik Risk',
      summary: 'Emeklilik veya fesih anında kat maliklerine sürpriz toplu tazminat yükü biner.',
      detail: 'Bina görevlisi kıdem fonu biriktirilmediği için görevli ayrıldığında on binlerce liralık tazminat o günkü kat maliklerinin dairesine haciz riski olarak yansır.',
    },
    individualExternalModel: {
      statusBadge: 'Orta Risk',
      summary: 'Kıdem fonu işletilmez, SGK cezası riski bina maliklerinin üzerinde kalır.',
      detail: 'Fazla mesai, yıllık izin defteri ve bordro imzaları eksik tutulduğunda İş Mahkemesi’nde açılan davaları kat malikleri finanse etmek zorunda kalır.',
    },
    aloYonetimCorporateModel: {
      statusBadge: 'Sıfır Risk',
      summary: 'Aylık Amortisman Kıdem Fonu veya Doğrudan Firma Bordrosunda İstihdam',
      detail: 'Tüm personelin SGK, İSG, sağlık taraması ve kıdem fonu Alo Yönetim kurumsal garantisinde yönetilir. Kat malikleri hiçbir zaman sürpriz toplu tazminat ödemez.',
      highlightFeature: 'Aylık Kıdem Fonu Karşılığı & Sıfır Sürpriz Maliyet',
    },
  },
  {
    id: 'aidat-tahsilati-ve-icra-disiplini',
    dimensionTitle: 'Aidat Tahsilat Oranı & İcra Disiplini',
    dimensionIcon: 'payments',
    legalBasis: '634 KMK Madde 20/2 & İİK Madde 68/1',
    amateurResidentModel: {
      statusBadge: 'Zayıf',
      summary: '%60 - 70 ortalama tahsilat; komşuluk hatırı nedeniyle borçlar birikir.',
      detail: 'Komşusuna icra takibi yapamayan amatör yöneticiler yüzünden sitenin elektriği kesilir, asansör bakımları aksar ve düzenli ödeyen sakinler mağdur olur.',
    },
    individualExternalModel: {
      statusBadge: 'Sınırlı',
      summary: '%80 - 85 tahsilat; avukata intikal gecikir, takip manuel yürür.',
      detail: 'Otomasyonsuz SMS veya telefon hatırlatmaları yetersiz kalır; ilamsız icra süreçleri aylar sürdüğü için nakit akışı bozulur.',
    },
    aloYonetimCorporateModel: {
      statusBadge: '%99.2 Başarı',
      summary: '%99.2 Belgelenmiş Yıllık Aidat Tahsilat Oranı & Otomatik İcra Motoru',
      detail: 'Apsiyon entegreli otomatik SMS/WhatsApp hatırlatmaları, KMK m.20 aylık %5 kanuni gecikme tazminatı ve 7 günü aşan borçlarda derhal İİK 68 ilamsız icra takibiyle kasa disiplini korunur.',
      highlightFeature: '%99.2 Tahsilat Başarısı & Kesintisiz Nakit Akışı',
    },
  },
  {
    id: 'acil-teknik-mudahale-sla',
    dimensionTitle: '7/24 Acil Teknik Müdahale & SLA Taahhüdü',
    dimensionIcon: 'handyman',
    legalBasis: 'ISO 41001:2018 Tesis Yönetimi SLA Standartları',
    amateurResidentModel: {
      statusBadge: 'Yetersiz',
      summary: 'Gece veya hafta sonu usta arama telaşı; günlerce süren kesintiler.',
      detail: 'Hidrofor patladığında veya asansör arızalandığında amatör yönetici piyasadan rastgele usta arar; fahiş fiyatlar ödenir ve iş garantisi olmaz.',
    },
    individualExternalModel: {
      statusBadge: 'Sınırlı',
      summary: 'Teknik kadrosu yoktur, taşeron ustalara bağımlıdır.',
      detail: 'Müdahale süreleri belirsizdir. 7/24 nöbetçi mobil teknik ekibi bulunmadığı için krizler saatlerce çözümsüz kalır.',
    },
    aloYonetimCorporateModel: {
      statusBadge: 'Tam Güvence',
      summary: 'İstanbul 39 İlçede 45 Dakikada Garantili Acil Müdahale SLA Güvencesi',
      detail: 'Alo Yönetim’in kendi gezici mobil acil müdahale filosu asansörde kalma, ana vana patlaması ve yangın panosu krizlerine azami 45 dakikada sahada müdahale eder.',
      highlightFeature: '45 Dakika Sözleşmeli Acil Teknik Müdahale SLA',
    },
  },
  {
    id: 'mali-seffaflik-ve-dijital-denetim',
    dimensionTitle: 'Mali Şeffaflık & Dijital Banka Denetimi',
    dimensionIcon: 'visibility',
    legalBasis: 'KMK Madde 37 & Türk Ticaret Kanunu',
    amateurResidentModel: {
      statusBadge: 'Kritik Risk',
      summary: 'Elle tutulan defterler, kaybolan fişler ve suistimal şüpheleri.',
      detail: 'Kasa hesabı ile banka hesabı birbirini tutmaz. Genel kurullarda şeffaflık olmadığı için komşular arasında sert kavgalar ve güvensizlik doğar.',
    },
    individualExternalModel: {
      statusBadge: 'Denetimsiz',
      summary: 'Basit Excel tabloları, canlı banka entegrasyonu bulunmaz.',
      detail: 'Sakinler anlık banka bakiyesini veya harcama faturalarını dijital olarak göremez; hesaplar sadece yılda bir genel kurulda açıklanır.',
    },
    aloYonetimCorporateModel: {
      statusBadge: 'Tam Güvence',
      summary: 'Apsiyon Altyapısıyla 7/24 Canlı Mobil Banka & Fatura Şeffaflığı',
      detail: 'Her kat maliki mobil uygulamadan sitenin anlık banka bakiyesini, yapılan her harcamanın faturasını ve denetçi raporlarını saniye saniye izler. Sıfır nakit, sıfır şüphe.',
      highlightFeature: '7/24 Canlı Dijital Banka ve Fatura Şeffaflığı',
    },
  },
  {
    id: 'satin-alma-gucu-ve-butce-tasarrufu',
    dimensionTitle: 'Toplu Satın Alma Gücü & Bütçe Tasarrufu',
    dimensionIcon: 'savings',
    legalBasis: 'Ölçek Ekonomisi & ISO 41001 Bütçe Optimizasyonu',
    amateurResidentModel: {
      statusBadge: 'Yetersiz',
      summary: 'Bireysel perakende fiyatlarla en pahalı teklifleri ödeme zorunluluğu.',
      detail: 'Tek bir bina olarak pazarlık gücü yoktur. Asansör bakımından temizlik kimyasalına ve jeneratör yakıtına kadar her kalem piyasa tavanından satın alınır.',
    },
    individualExternalModel: {
      statusBadge: 'Sınırlı',
      summary: 'Düşük portföy hacmi nedeniyle kurumsal indirim alamaz.',
      detail: 'Tedarikçilere hacimli iş sağlayamadığı için standart perakende fiyatlara yakın maliyetlerle çalışır.',
    },
    aloYonetimCorporateModel: {
      statusBadge: '%99.2 Başarı',
      summary: 'Yüzlerce Sitenin Birleşik Gücüyle İşletme Projelerinde %25-33 Net Tasarruf',
      detail: 'Toplu satın alma ihaleleri, reaktif ceza sıfırlama, asansör yedek parça kurumsal iskontoları ile aidat bütçeleri doğrudan %25-33 arasında optimize edilir.',
      highlightFeature: 'Ortalama %25 - %33 Bütçe Tasarrufu Garantisi',
    },
  },
];

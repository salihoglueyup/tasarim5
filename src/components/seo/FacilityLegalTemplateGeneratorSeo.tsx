"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export type FacilityTemplateType = 'tesis_yonetimi_karar' | 'isletme_projesi_teblig' | 'aidat_gecikme_ihtar' | 'devir_teslim_protokol';

export default function FacilityLegalTemplateGeneratorSeo() {
  const [selectedTemplate, setSelectedTemplate] = useState<FacilityTemplateType>('tesis_yonetimi_karar');
  const [siteName, setSiteName] = useState('Palmiye Konutları Sitesi');
  const [managerName, setManagerName] = useState('Mehmet Özkan');
  const [unitCount, setUnitCount] = useState('120');
  const [cityDistrict, setCityDistrict] = useState('Kadıköy / İstanbul');
  const [annualBudget, setAnnualBudget] = useState('2.400.000');
  const [monthlyDues, setMonthlyDues] = useState('2.500');
  const [isCopied, setIsCopied] = useState(false);

  const generateText = () => {
    const today = new Date().toLocaleDateString('tr-TR');

    switch (selectedTemplate) {
      case 'tesis_yonetimi_karar':
        return `T.C.
KAT MALİKLERİ KURULU KARAR DEFTERİ METNİ

APARTMAN / SİTE ADI : ${siteName || '[SİTE ADI]'}
KARAR TARİHİ         : ${today}
KARAR NO             : 2026/01
DİVAN BAŞKANI        : ${managerName || '[YÖNETİCİ ADI]'}
BAĞIMSIZ BÖLÜM ADEDİ : ${unitCount || '100'} Bağımsız Bölüm
ADRES                : ${cityDistrict || 'Kadıköy / İstanbul'}

GÜNDEM: 634 Sayılı Kat Mülkiyeti Kanunu Uyarınca Sitemizin Yönetim, Güvenlik, Temizlik ve Teknik Bakım Hizmetlerinin Profesyonel Tesis Yönetim Kuruluşuna Devredilmesi.

KARAR METNİ:
${siteName || '[SİTE ADI]'} Kat Malikleri Olağan / Olağanüstü Genel Kurulu ${today} tarihinde toplanmış olup; sitenin ortak alanlarının korunması, düzenli ve şeffaf bütçe yönetimi ile 7/24 kesintisiz teknik-güvenlik operasyonlarının sağlanması amacıyla aşağıdaki kararlar alınmıştır:

1. 634 Sayılı Kat Mülkiyeti Kanunu'nun 34. ve 35. maddeleri uyarınca, sitemizin idari, mali, güvenlik ve teknik yönetim yetkisinin 1 (bir) yıl süreyle kurumsal yönetim kuruluşu olan ALO YÖNETİM TESİS YÖNETİMİ A.Ş.'ye devredilmesine,
2. İmzalanacak olan Entegre Tesis Yönetim Hizmet Sözleşmesi'ni kat malikleri adına akdetmek üzere Divan Başkanı ve Denetim Kurulu üyelerine tam yetki verilmesine,
3. KMK m.37 uyarınca hazırlanacak resmi İşletme Projesinin Alo Yönetim tarafından tebliğ edilerek aidatların kurumsal dijital yazılım ve banka POS sistemi üzerinden tahsil edilmesine oy çokluğu / oy birliği ile karar verilmiştir.

DİVAN BAŞKANI                    DENETÇİ                             KAT MALİKİ
(İmza)                           (İmza)                              (İmza)`;

      case 'isletme_projesi_teblig':
        return `${siteName || '[SİTE ADI]'} SİTESİ 2026 DÖNEMİ İŞLETME PROJESİ TEBLİĞ MEKTUBU

Sayın Kat Maliki / Bağımsız Bölüm Sakini,
Tarih: ${today}
Bağımsız Bölüm No: [DAİRE NO]

634 Sayılı Kat Mülkiyeti Kanunu'nun 37. maddesi gereğince sitemizin 2026 takvim yılına ait tahmini Gelir ve Giderlerini içeren Resmi İşletme Projesi yönetimimizce hazırlanarak aşağıda bilgilerinize sunulmuştur:

1. YILLIK TAHMİNİ ORTAK GİDER TOPLAMI : ${annualBudget || '2.400.000'} TL
- 5188 Özel Güvenlik ve Danışma Giderleri : %38
- TSE 13811 Hijyen Temizliği & Kimyasallar : %22
- Asansör, Jeneratör & Teknik Bakım       : %20
- Ortak Elektrik, Su ve Doğalgaz         : %15
- Yönetim, Hukuk, İSG & Yazılım Gideri   : %5

2. BAĞIMSIZ BÖLÜMÜNÜZE DÜŞEN AYLIK AİDAT AVANSI: ${monthlyDues || '2.500'} TL

YASAL BİLGİLENDİRME (KMK Madde 37/2):
İşbu işletme projesine tebliğ tarihinden itibaren 7 (yedi) gün içinde itiraz edilmediği takdirde proje kesinleşir. Kesinleşen işletme projeleri ve aidat avansları, İcra ve İflas Kanunu'nun 68. maddesinin 1. fıkrasında belirtilen resmi belge hükmündedir.

${siteName || '[SİTE ADI]'} SİTESİ YÖNETİMİ
Alo Yönetim Tesis Yönetimi A.Ş. (Yetkili Tesis Yöneticisi)`;

      case 'aidat_gecikme_ihtar':
        return `İHTARNAME

İHTAR EDEN : ${siteName || '[SİTE ADI]'} Kat Malikleri Yöneticiliği
VEKİLİ     : Alo Yönetim Hukuk & İcra Departmanı
MUHATAP    : [KAT MALİKİ VEYA KİRACI ADI SOYADI]
ADRES      : ${siteName || '[SİTE ADI]'}, Daire No: [DAİRE NO], ${cityDistrict || 'İstanbul'}
TEBLİĞ TARİHİ: ${today}

KONU: Ödenmeyen Ortak Alan Aidat ve İşletme Avansı Borçlarının KMK m.20/c Uyarınca Aylık %5 Yasal Gecikme Tazminatı ile Birlikte Ödenmesi Talebidir.

AÇIKLAMALAR:
Sitemizin [DAİRE NO] numaralı bağımsız bölümüne ait geçmiş dönem ortak alan aidat ve avans borcunuz toplam [BORÇ TUTARI] TL'ye ulaşmış olup, tüm şifahi ve SMS hatırlatmalarımıza rağmen vadesinde ödenmemiştir.

634 Sayılı Kat Mülkiyeti Kanunu Madde 20/c hükmü uyarınca;
"Gider veya avans payını ödemeyen kat maliki hakkında, diğer kat maliklerinden her biri veya yönetici tarafından icra takibi yapılabilir, dava açılabilir ve gecikilen günler için aylık yüzde beş (%5) hesabıyla gecikme tazminatı ödemekle yükümlüdür."

İşbu ihtarnamenin tarafınıza tebliğinden itibaren 3 (üç) gün içinde toplam borcunuzu sitemizin resmi banka IBAN hesabına ödemenizi; aksi halde KMK m.20 ve İİK hükümleri uyarınca icra takibi başlatılacağını, avukatlık vekalet ücreti, faiz ve tüm icra masraflarının tarafınıza tahmil edileceğini ihtaren bildiririz.

İHTAR EDEN
${siteName || '[SİTE ADI]'} Sitesi Yönetimi Adına
Alo Yönetim Tesis Yönetimi A.Ş.`;

      case 'devir_teslim_protokol':
        return `${siteName || '[SİTE ADI]'} SİTESİ YÖNETİMİ DEVİR-TESLİM VE DEMİRBAŞ SAYIM PROTOKOLÜ

DEVİR TARİHİ: ${today}
DEVREDEN    : ${managerName || '[ESKİ YÖNETİCİ ADI]'} (Eski Yönetici)
DEVRALAN    : ALO YÖNETİM TESİS YÖNETİMİ A.Ş. (Yetkili Tesis Yöneticisi)
LOKASYON    : ${cityDistrict || 'İstanbul'} (${unitCount || '100'} Bağımsız Bölüm)

Aşağıda belirtilen tüm idari, mali, teknik ve fiziki evrak ve demirbaşlar eksiksiz olarak incelenmiş ve tutanakla teslim alınmıştır:

1. MALİ KAYITLAR:
- Banka Hesap Bakiyesi    : [BANKA BAKİYESİ] TL
- Kasa Nakit Tutarı       : [KASA TUTARI] TL
- Kat Malikleri Cari Borç Döküm Listesi ve Banka Ekstreleri teslim edilmiştir.

2. RESMİ VE HUKUKİ EVRAKLAR:
- Noter Onaylı Kat Malikleri Karar Defteri (Son Sayfa: [SAYFA NO])
- Noter Onaylı İşletme Defteri ve Gelir-Gider Makbuz Koçanları
- SGK İşyeri Dosyası, Personel Özlük Dosyaları ve Varsa Devam Eden Dava Evrakları

3. TEKNİK CİHAZLAR VE DEMİRBAŞLAR:
- Asansör Yeşil Etiket Muayene Raporları ve Bakım Sözleşmeleri
- Jeneratör, Hidrofor, Yangın Sistemi Bakım Karneleri ve Trafo Onayları
- Sığınak, Çatı, Kazan Dairesi, Trafo ve Sayaç Odası Anahtar Takımları
- 4K CCTV Kamera Şifreleri ve Plaka Tanıma Sistemi (PTS) Yönetici Kodları

İşbu 3 nüsha protokol taraflarca okunmuş, doğruluğu teyit edilerek imza altına alınmıştır.

DEVREDEN (Eski Yönetim)              DEVRALAN (Alo Yönetim A.Ş.)
İsim: ${managerName || '[ESKİ YÖNETİCİ ADI]'}      İsim: [ALO YÖNETİM TEMSİLCİSİ]
İmza:                                İmza / Kaşe:`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownload = () => {
    const text = generateText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedTemplate}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'KMK 634 & Tesis Yönetimi Hukuki Karar ve Tebliğ Şablonu Oluşturma Rehberi',
    description: 'Site ve apartman yöneticileri için Kat Mülkiyeti Kanunu uyumlu yönetim kurulu kararı, işletme bütçesi tebliği ve aidat ihtarname metni üretici.',
    step: [
      { '@type': 'HowToStep', name: 'Şablon Türünü Seçin', text: 'Tesis yönetim kararı, işletme projesi tebliği, aidat ihtarnamesi veya devir teslim protokolünü seçin.' },
      { '@type': 'HowToStep', name: 'Site ve Yönetici Bilgilerini Girin', text: 'Site adı, yönetici ismi, daire adedi ve bütçe tutarını yazın.' },
      { '@type': 'HowToStep', name: 'Hukuki Belgeyi Kopyalayın veya İndirin', text: 'Noter ve KMK uyumlu metni karar defterine işleyin ya da tebliğ edin.' }
    ]
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2.5rem] p-6 sm:p-12 shadow-sm">
      <JsonLd data={schemaData} />

      {/* Başlık */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[var(--color-outline)]/60">
        <div>
          <span className="text-xs font-black text-slate-900 dark:text-slate-200 bg-slate-900/5 dark:bg-white/10 border border-slate-900/10 dark:border-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-3">
            Hukuki Belge & Şablon Motoru
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
            KMK 634 Tesis Yönetimi Karar & Tebliğ Şablon Jeneratörü
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-2 max-w-2xl">
            Siteniz için yasal geçerliliğe sahip yönetim yetkilendirme kararı, KMK m.37 işletme bütçesi tebliği, yasal %5 faizli aidat ihtarnamesi ve devir-teslim tutanağını anında oluşturun.
          </p>
        </div>

        {/* Butonlar */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-5 py-3 rounded-xl bg-[var(--color-primary)] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm shrink-0"
          >
            <span className="material-symbols-outlined text-sm">{isCopied ? 'check' : 'content_copy'}</span>
            {isCopied ? 'Kopyalandı!' : 'Metni Kopyala'}
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-3 rounded-xl border border-[var(--color-outline)] hover:bg-[var(--color-surface-variant)] text-[var(--color-primary)] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            TXT İndir
          </button>
        </div>
      </div>

      {/* Şablon Seçici Sekmeler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-8">
        {[
          { id: 'tesis_yonetimi_karar', title: '1. Yönetim Yetki Kararı', desc: 'KMK m.34 Karar Defteri' },
          { id: 'isletme_projesi_teblig', title: '2. İşletme Bütçesi Tebliği', desc: 'KMK m.37 Yıllık Avans' },
          { id: 'aidat_gecikme_ihtar', title: '3. Aidat İhtarnamesi', desc: 'KMK m.20 %5 Yasal Faizli' },
          { id: 'devir_teslim_protokol', title: '4. Devir Teslim Tutanağı', desc: 'Demirbaş ve Kasa Sayımı' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTemplate(tab.id as FacilityTemplateType)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedTemplate === tab.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-sm font-bold'
                : 'bg-[var(--color-surface-variant)] border-[var(--color-outline)]/80 text-[var(--color-primary)] hover:border-slate-400'
            }`}
          >
            <div className="text-sm font-bold">{tab.title}</div>
            <div className={`text-xs mt-1 ${selectedTemplate === tab.id ? 'text-slate-300 dark:text-slate-700' : 'text-[var(--color-secondary)]'}`}>{tab.desc}</div>
          </button>
        ))}
      </div>

      {/* Form Alanları & Canlı Önizleme */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="flex flex-col gap-4 p-6 bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 rounded-2xl">
          <h4 className="text-sm font-extrabold text-[var(--color-primary)] uppercase tracking-wider mb-2">
            Belge Değişkenleri
          </h4>

          <div>
            <label className="text-xs font-bold text-[var(--color-secondary)] block mb-1">Site / Apartman Adı</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-[var(--color-primary)] text-sm focus:outline-none focus:border-slate-500"
              placeholder="Örn: Akasya Konutları"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--color-secondary)] block mb-1">Yönetici / Divan Başkanı</label>
            <input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-[var(--color-primary)] text-sm focus:outline-none focus:border-slate-500"
              placeholder="Örn: Ahmet Yılmaz"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--color-secondary)] block mb-1">Bağımsız Bölüm (Daire) Sayısı</label>
            <input
              type="text"
              value={unitCount}
              onChange={(e) => setUnitCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-[var(--color-primary)] text-sm focus:outline-none focus:border-slate-500"
              placeholder="Örn: 120"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--color-secondary)] block mb-1">İlçe / Şehir</label>
            <input
              type="text"
              value={cityDistrict}
              onChange={(e) => setCityDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-[var(--color-primary)] text-sm focus:outline-none focus:border-slate-500"
              placeholder="Örn: Kadıköy / İstanbul"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--color-secondary)] block mb-1">Yıllık Tahmini Bütçe (TL)</label>
            <input
              type="text"
              value={annualBudget}
              onChange={(e) => setAnnualBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-[var(--color-primary)] text-sm focus:outline-none focus:border-slate-500"
              placeholder="Örn: 2.400.000"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--color-secondary)] block mb-1">Daire Başı Aylık Aidat (TL)</label>
            <input
              type="text"
              value={monthlyDues}
              onChange={(e) => setMonthlyDues(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-[var(--color-primary)] text-sm focus:outline-none focus:border-slate-500"
              placeholder="Örn: 2.500"
            />
          </div>
        </div>

        {/* Canlı Önizleme */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-secondary)]">Canlı Hukuki Metin Önizlemesi</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">gavel</span>
              634 Sayılı KMK Uyumlu
            </span>
          </div>

          <pre className="flex-1 p-6 rounded-2xl bg-[var(--color-surface-variant)] text-[var(--color-primary)] font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap border border-[var(--color-outline)]/70 shadow-xs">
            {generateText()}
          </pre>
        </div>
      </div>
    </div>
  );
}

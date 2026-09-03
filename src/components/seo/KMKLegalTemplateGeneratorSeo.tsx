"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export type TemplateType = 'yonetici_karar' | 'aidat_ihtar' | 'vekaletname' | 'ortak_alan_ihtar';

export default function KMKLegalTemplateGeneratorSeo() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('yonetici_karar');
  const [siteName, setSiteName] = useState('Güneş Sitesi');
  const [managerName, setManagerName] = useState('Ahmet Yılmaz');
  const [debtAmount, setDebtAmount] = useState('4.500');
  const [unitNo, setUnitNo] = useState('14');
  const [ownerName, setOwnerName] = useState('Mehmet Demir');
  const [isCopied, setIsCopied] = useState(false);

  // Generate dynamic legal text based on template
  const generateText = () => {
    const today = new Date().toLocaleDateString('tr-TR');

    switch (selectedTemplate) {
      case 'yonetici_karar':
        return `T.C.
KAT MALİKLERİ KURULU KARAR DEFTERİ METNİ

APARTMAN / SİTE ADI : ${siteName || '[SİTE ADI]'}
KARAR TARİHİ         : ${today}
KARAR NO             : 2026/01
TOPLANTI BAŞKANI     : ${managerName || '[YÖNETİCİ ADI]'}

GÜNDEM: 634 Sayılı Kat Mülkiyeti Kanunu Madde 34 Uyarınca Yönetici Seçimi ve Yetki Devri.

KARAR METNİ:
${siteName || '[SİTE ADI]'} Kat Malikleri Kurulu, ${today} tarihinde toplanmış olup; hem sayı (kişi) hem de arsa payı bakımından yasal salt çoğunluk sağlanmıştır. 

Yapılan açık oylama neticesinde; 634 sayılı Kat Mülkiyeti Kanunu'nun 34. ve 35. maddeleri gereğince, ana gayrimenkulün 1 (bir) yıl süreyle sevk, idare ve tesis yönetimi işlemlerini yürütmek üzere ${managerName || '[YÖNETİCİ / ŞİRKET ADI]'} yönetici olarak seçilmiştir.

Yöneticiye; ortak hesap açma/kapama, aidat ve avans tahsilatı yapma, Kat Mülkiyeti Kanunu Madde 20 uyarınca borçlular hakkında icra takibi başlatma, periyodik teknik bakım (asansör, hidrofor, yangın) sözleşmelerini imzalama ve personellerin SGK bildirgelerini yapma hususunda tam yetki verilmesine oy çokluğu/oy birliği ile karar verilmiştir.

DİVAN BAŞKANI                    KAT MALİKİ / ÜYE                    KAT MALİKİ / ÜYE
(İmza)                           (İmza)                              (İmza)`;

      case 'aidat_ihtar':
        return `İHTARNAME

İHTAR EDEN        : ${siteName || '[SİTE ADI]'} Yönetimi Adına Yönetici ${managerName || '[YÖNETİCİ ADI]'}
MUHATAP           : Sayın ${ownerName || '[KAT MALİKİ / KİRACI ADI]'} (Daire No: ${unitNo || '[NO]'})
KONU              : Ödenmeyen Ortak Gider ve Aidat Borcunun KMK Madde 20 Uyarınca İhtarıdır.
TEBLİĞ TARİHİ     : ${today}

Sayın Muhatap;
Maliki / kullanıcısı bulunduğunuz ${siteName || '[SİTE ADI]'} ${unitNo || '[NO]'} numaralı bağımsız bölüme ait geçmiş dönem aidat ve ortak alan işletme gideri borcunuz toplam ${debtAmount || '0'} TL'ye ulaşmıştır.

634 Sayılı Kat Mülkiyeti Kanunu'nun 20. Maddesi ve ana gayrimenkulün İşletme Projesi gereğince; işbu ihtarnamenin tebliğinden itibaren 7 (yedi) gün içerisinde anılan ${debtAmount || '0'} TL borcun site banka hesabına ödenmesini,

Aksi takdirde, KMK Madde 20/2 uyarınca aylık %5 yasal gecikme tazminatı ile birlikte, 2004 sayılı İcra ve İflas Kanunu hükümleri uyarınca aleyhinize İCRA TAKİBİ başlatılacağını, yargılama gideri ve avukatlık vekalet ücretinin tarafınıza yükleneceğini ihtaren bildiririz.

${siteName || '[SİTE ADI]'} YÖNETİMİ
(İmza)`;

      case 'vekaletname':
        return `KAT MALİKLERİ KURULU TEMSİL VEKALETNAMESİ

VEKALET VEREN (KAT MALİKİ):
Adı Soyadı : ${ownerName || '[KAT MALİKİ ADI]'}
Bağımsız Bölüm No : ${unitNo || '[DAİRE NO]'}
Arsa Payı Oranı : ... / 1000

VEKİL TAYİN EDİLEN:
Adı Soyadı : ${managerName || '[VEKİL ADI]'}
T.C. Kimlik No : .........................

METİN:
${siteName || '[SİTE ADI]'} Kat Malikleri Kurulu'nun ${today} tarihinde veya çoğunluk sağlanamaması halinde yapılacak ikinci toplantısında; adıma kayıtlı bağımsız bölümü arsa payım oranında temsil etmeye, gündemdeki maddeleri görüşmeye, oy kullanmaya ve karar defterini adıma imzalamaya ${managerName || '[VEKİL ADI]'}'i 634 Sayılı Kat Mülkiyeti Kanunu Madde 31 uyarınca vekil tayin ettim.

TARİH : ${today}
VEKALET VEREN İMZA :`;

      case 'ortak_alan_ihtar':
        return `ORTAK ALAN KULLANIMI VE DÜZEN İHTARI

İHTAR EDEN : ${siteName || '[SİTE ADI]'} Yönetimi
MUHATAP    : ${unitNo || '[DAİRE NO]'} Nolu Bağımsız Bölüm Sakini Sayın ${ownerName || '[SAKİN ADI]'}
TARİH      : ${today}

KONU: Kat Mülkiyeti Kanunu Madde 18 Uyarınca Doğruluk, Huzur ve Ortak Alan Kurallarına Uyum İhtarı.

Sayın Sakin;
Sitemiz Yönetim Planı ve 634 Sayılı KMK Madde 18 gereğince: "Kat malikleri gerek bağımsız bölümlerini, gerek eklentileri ve ortak yerleri kullanırken doğruluk kaidelerine uymak, özellikle birbirini rahatsız etmemek ve birbirinin haklarını çiğnememekle karşılıklı olarak yükümlüdürler."

Bina ortak alanlarına (koridor, merdiven boşluğu, yangın çıkışı) şahsi eşya bırakılmaması, gece saatlerinde yüksek gürültü yapılmaması hususunda gerekli hassasiyeti göstermenizi, aksi halde yasal yaptırımların uygulanacağını saygıyla bildiririz.

${siteName || '[SİTE ADI]'} YÖNETİM KURULU`;
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generateText());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generateText()], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${siteName.replace(/\s+/g, '_')}_${selectedTemplate}_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: 'KMK 634 Resmi Karar Defteri ve İhtarname Şablonu Jeneratörü',
    description: 'Site yöneticileri ve kat malikleri için yasal uyumlu karar defteri, aidat ihtarnamesi ve genel kurul vekaletname şablonları.',
    encodingFormat: 'text/plain',
    provider: {
      '@type': 'Organization',
      name: 'Alo Yönetim Hukuk Danışmanlığı'
    }
  };

  return (
    <div className="my-12 bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">gavel</span>
              Resmi KMK 634 Hukuki Şablon Jeneratörü
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
            Apartman Karar & İhtarname Metni Hazırlayıcı
          </h3>
          <p className="text-sm text-[var(--color-secondary)] font-light mt-1">
            Bilgileri girin, Kat Mülkiyeti Kanunu ve Noter standartlarında resmi şablonu saniyeler içinde oluşturun.
          </p>
        </div>

        {/* Template Type Selector */}
        <div className="flex flex-wrap bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 shrink-0 gap-1">
          <button
            onClick={() => setSelectedTemplate('yonetici_karar')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTemplate === 'yonetici_karar'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Yönetici Kararı
          </button>
          <button
            onClick={() => setSelectedTemplate('aidat_ihtar')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTemplate === 'aidat_ihtar'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Aidat İhtarı
          </button>
          <button
            onClick={() => setSelectedTemplate('vekaletname')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTemplate === 'vekaletname'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Vekaletname
          </button>
          <button
            onClick={() => setSelectedTemplate('ortak_alan_ihtar')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTemplate === 'ortak_alan_ihtar'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
            }`}
          >
            Düzen İhtarı
          </button>
        </div>
      </div>

      {/* Grid: Inputs and Generated Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Parameters */}
        <div className="lg:col-span-5 space-y-4 bg-gray-50/60 dark:bg-white/5 p-6 rounded-3xl border border-gray-200 dark:border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
            Şablon Değişkenleri
          </span>

          <div>
            <label className="block text-xs font-bold text-[var(--color-secondary)] mb-1">
              Apartman / Site Adı
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/15 rounded-xl py-2.5 px-3.5 text-sm text-[var(--color-primary)] focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-secondary)] mb-1">
              Yönetici / Başkan Adı
            </label>
            <input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/15 rounded-xl py-2.5 px-3.5 text-sm text-[var(--color-primary)] focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {selectedTemplate !== 'yonetici_karar' && (
            <>
              <div>
                <label className="block text-xs font-bold text-[var(--color-secondary)] mb-1">
                  Kat Maliki / Sakin Adı
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/15 rounded-xl py-2.5 px-3.5 text-sm text-[var(--color-primary)] focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--color-secondary)] mb-1">
                  Daire / Bağımsız Bölüm No
                </label>
                <input
                  type="text"
                  value={unitNo}
                  onChange={(e) => setUnitNo(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/15 rounded-xl py-2.5 px-3.5 text-sm text-[var(--color-primary)] focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </>
          )}

          {selectedTemplate === 'aidat_ihtar' && (
            <div>
              <label className="block text-xs font-bold text-[var(--color-secondary)] mb-1">
                Geciken Toplam Borç Tutarı (TL)
              </label>
              <input
                type="text"
                value={debtAmount}
                onChange={(e) => setDebtAmount(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/15 rounded-xl py-2.5 px-3.5 text-sm text-[var(--color-primary)] focus:outline-none focus:border-indigo-500 font-bold text-rose-500"
              />
            </div>
          )}

          <div className="pt-2 text-[11px] text-[var(--color-secondary)]">
            * Hazırlanan metinler 634 sayılı KMK'ya ve Yargıtay Hukuk Genel Kurulu yerleşik içtihatlarına uygundur.
          </div>
        </div>

        {/* Generated Preview Box */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--color-primary)] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-indigo-500" aria-hidden="true">description</span>
              Canlı Metin Önizlemesi
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  {isCopied ? 'check' : 'content_copy'}
                </span>
                <span>{isCopied ? 'Kopyalandı!' : 'Metni Kopyala'}</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="px-3.5 py-1.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-[var(--color-primary)] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                title="TXT olarak indir"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">download</span>
                <span>İndir</span>
              </button>
            </div>
          </div>

          <pre className="p-6 bg-slate-950 text-slate-200 rounded-3xl font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap border border-white/10 max-h-[380px] select-all shadow-inner">
            {generateText()}
          </pre>
        </div>
      </div>
    </div>
  );
}

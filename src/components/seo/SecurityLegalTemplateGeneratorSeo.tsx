"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export type SecurityTemplateType = 'guvenlik_karar' | 'valilik_dilekce' | 'kvkk_aydinlatma' | 'gorev_talimati';

export default function SecurityLegalTemplateGeneratorSeo() {
  const [selectedTemplate, setSelectedTemplate] = useState<SecurityTemplateType>('guvenlik_karar');
  const [siteName, setSiteName] = useState('Akasya Konutları Sitesi');
  const [managerName, setManagerName] = useState('Ahmet Yılmaz');
  const [guardCount, setGuardCount] = useState('4');
  const [blockCount, setBlockCount] = useState('3');
  const [cityDistrict, setCityDistrict] = useState('Kadıköy / İstanbul');
  const [isCopied, setIsCopied] = useState(false);

  const generateText = () => {
    const today = new Date().toLocaleDateString('tr-TR');

    switch (selectedTemplate) {
      case 'guvenlik_karar':
        return `T.C.
KAT MALİKLERİ KURULU KARAR DEFTERİ METNİ

APARTMAN / SİTE ADI : ${siteName || '[SİTE ADI]'}
KARAR TARİHİ         : ${today}
KARAR NO             : 2026/02
TOPLANTI BAŞKANI     : ${managerName || '[YÖNETİCİ ADI]'}
BAĞIMSIZ BÖLÜM ADEDİ : ${blockCount || '1'} Blok / [DAİRE SAYISI] Bağımsız Bölüm

GÜNDEM: 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun Uyarınca Site Bünyesinde Özel Güvenlik İstihdam Edilmesi ve Valilik Başvurusu Yapılması.

KARAR METNİ:
${siteName || '[SİTE ADI]'} Kat Malikleri Genel Kurulu ${today} tarihinde toplanmış olup; site ortak alanları, sakinleri, otopark ve nizamiyesinin 7/24 can ve mal emniyetinin sağlanması amacıyla aşağıdaki kararlar alınmıştır:

1. 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun kapsamında, sitemizde ${guardCount || '4'} (dört) kişilik silahsız özel güvenlik personeli kadrosu tahsis edilmesine,
2. İl Özel Güvenlik Komisyonu ve T.C. Valiliği'ne Özel Güvenlik İzni (ÖGİ) almak üzere gerekli tüm yasal ruhsat, harç ve müracaat işlemlerini yürütmek üzere Site Yöneticisi ${managerName || '[YÖNETİCİ ADI]'} yetkili kılınmasına,
3. Valilik izin onayına müteakip, 5188 faaliyet izin belgeli kurumsal bir özel güvenlik şirketi ile hizmet sözleşmesi akdedilmesine,
4. İlgili özel güvenlik maliyetlerinin Kat Mülkiyeti Kanunu Madde 20/1-a uyarınca tüm kat maliklerine eşit olarak paylaştırılmasına oy çokluğu / oy birliği ile karar verilmiştir.

DİVAN BAŞKANI                    YÖNETİM KURULU ÜYESİ                DENETÇİ
(İmza)                           (İmza)                              (İmza)`;

      case 'valilik_dilekce':
        return `T.C.
${cityDistrict ? cityDistrict.split('/')[1]?.trim().toUpperCase() || 'İSTANBUL' : 'İSTANBUL'} VALİLİĞİ
İl Özel Güvenlik Komisyonu Başkanlığı'na

TALEP EDEN KURUM : ${siteName || '[SİTE ADI]'} Kat Malikleri Yönetim Kurulu
ADRES            : ${cityDistrict || '[İLÇE / İL]'}
TEMSİLCİ         : Yönetici ${managerName || '[YÖNETİCİ ADI]'} (T.C. Kimlik No: [TC NO])
İLETİŞİM         : [TELEFON NO] / [E-POSTA]
KONU             : 5188 Sayılı Kanun Kapsamında Özel Güvenlik İzni (ÖGİ) Talebidir.

AÇIKLAMALAR:
${cityDistrict || '[İLÇE / İL]'} adresinde kain ${siteName || '[SİTE ADI]'}, ${blockCount || '1'} blok ve [DAİRE SAYISI] bağımsız bölümden müteşekkil bir yaşam alanıdır. 

Sitemizde can ve mal güvenliğinin sağlanması, giriş-çıkışların 7/24 kontrol altında tutulması amacıyla, Kat Malikleri Kurulumuzun ${today} tarihli ve 2026/02 sayılı kararı gereğince; 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun hükümleri uyarınca ${guardCount || '4'} personel ile silahsız özel güvenlik hizmeti ifa edilmesi kararlaştırılmıştır.

Bu kapsamda; sitemize "Özel Güvenlik İzni (ÖGİ)" verilmesi ve komisyonunuzca gerekli incelemenin yapılarak izin belgesinin tanzim edilmesi hususunu saygılarımla arz ve talep ederim.

${today}
${siteName || '[SİTE ADI]'} Yönetimi Adına
Yönetici: ${managerName || '[YÖNETİCİ ADI]'}
(İmza ve Kaşe)

EKLER:
1. Kat Malikleri Kurulu Güvenlik Karar Defteri Sureti
2. Site Yönetim Planı Sureti ve Tapu Kaydı
3. Yönetici Yetki Belgesi ve İmza Sirküleri
4. Vaziyet Planı ve Kroki`;

      case 'kvkk_aydinlatma':
        return `6698 SAYILI KVKK UYARINCA
GÜVENLİK KAMERALARI VE ZİYARETÇİ KAYIT AYDINLATMA METNİ

VERİ SORUMLUSU: ${siteName || '[SİTE ADI]'} Kat Malikleri Yönetim Kurulu
ADRES         : ${cityDistrict || '[İLÇE / İL]'}

1. KİŞİSEL VERİLERİN İŞLENME AMACI
${siteName || '[SİTE ADI]'} bünyesinde ortak alanlar, bina girişleri, otopark ve çevre sınırlarında kurulu 4K IP kamera sistemleri ile 24 saat kesintisiz görüntü kaydı yapılmaktadır. Bu kayıtlar; bina güvenliğinin temini, hırsızlık ve izinsiz girişlerin önlenmesi ve 5188 sayılı Kanun gerekliliklerinin ifası amacıyla işlenmektedir.

2. KAYITLARIN SAKLANMA SÜRESİ VE GİZLİLİK
Güvenlik kamerası kayıtları doğrudan şifreli sunucuda tutulmakta olup, yasal azami saklama süresi olan 30 (otuz) gün sonunda otomatik olarak üzerine yazılarak imha edilmektedir. Kayıtlar yetkili adli merciler (Cumhuriyet Başsavcılığı, Mahkemeler, Emniyet) haricinde hiçbir üçüncü şahıs ile paylaşılmaz. Ses kaydı kesinlikle alınmamaktadır.

3. İLGİLİ KİŞİNİN HAKLARI
KVKK'nın 11. maddesi uyarınca veri sahipleri, ${siteName || '[SİTE ADI]'} Yönetimi'ne yazılı müracaat ederek kayıtların işlenip işlenmediğini öğrenme hakkına sahiptir.

${siteName || '[SİTE ADI]'} YÖNETİM KURULU`;

      case 'gorev_talimati':
        return `T.C.
5188 SAYILI KANUN UYUMLU NİZAMİYE ÖZEL GÜVENLİK GÖREV TALİMATNAMESİ

PROJE ADI: ${siteName || '[SİTE ADI]'}
LOKASYON : ${cityDistrict || '[İLÇE / İL]'}
PERSONEL : 5188 Kimlik Kartlı Özel Güvenlik Görevlileri

TEMEL NÖBET VE GÜVENLİK ESASLARI:
1. KİMLİK KONTROLÜ: 5188 Sayılı Kanun Madde 7 uyarınca siteye giriş yapmak isteyen tüm misafir, kargo ve servis personeline kimlik sorulur, sakin teyidi alınmadan içeriye araç ve yaya girişi yaptırılmaz.
2. PLAKA TANIMA SİSTEMİ (PTS): Yabancı ve misafir araçlar PTS sistemine kaydedilir; site sakini adına tahsisli olmayan yabancı araçların ortak kapalı otoparka park etmesi engellenir.
3. SAATLİK RFID DEVRİYE: Gece 22:00 - 06:00 saatleri arasında her saat başı yangın merdivenleri, sığınak, jeneratör dairesi ve çevre duvarı elektronik tur kalemi ile taranır.
4. ACİL DURUM VE MÜDAHALE: Yangın, deprem veya hırsızlık hadisesinde derhal 112 Acil Çağrı Merkezi aranır; şüpheli 5188 Madde 7 uyarınca muhafaza altına alınarak genel kolluğa teslim edilir.

YÜRÜRLÜK: İşbu talimatname ${today} tarihinde onaylanarak nizamiyede tebliğ edilmiştir.

SİTE YÖNETİMİ                        GÜVENLİK AMİRİ
(İmza)                               (İmza)`;

      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generateText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const templatesInfo = [
    {
      id: 'guvenlik_karar' as SecurityTemplateType,
      title: 'Site Güvenlik Karar Şablonu',
      subtitle: 'KMK m.32 & 5188 m.3 Uyumlu Karar Defteri Metni',
      badge: 'Resmi Karar Defteri'
    },
    {
      id: 'valilik_dilekce' as SecurityTemplateType,
      title: 'Valilik ÖGİ Başvuru Dilekçesi',
      subtitle: 'İl Özel Güvenlik Komisyonu Ruhsat Talebi',
      badge: 'Resmi Müracaat'
    },
    {
      id: 'kvkk_aydinlatma' as SecurityTemplateType,
      title: 'KVKK Kamera Aydınlatma Metni',
      subtitle: '6698 Sayılı Kanun Uyumlu Tesis İlanı',
      badge: 'Yasal Zorunluluk'
    },
    {
      id: 'gorev_talimati' as SecurityTemplateType,
      title: 'Nizamiye Görev Talimatnamesi',
      subtitle: '5188 Madde 7 Uyarınca Güvenlik Protokolü',
      badge: 'Operasyonel Standart'
    }
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '5188 Yasal Dilekçe ve Karar Defteri Şablonu Oluşturucu',
    operatingSystem: 'All',
    applicationCategory: 'BusinessApplication',
    description: 'Site ve apartman yöneticileri için 5188 sayılı Kanun uyumlu Valilik güvenlik izni başvuru dilekçesi, karar defteri metni ve KVKK kamera aydınlatma şablonu jeneratörü.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY'
    }
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
      <JsonLd data={schemaData} />
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--color-outline)]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-sm">gavel</span>
            5188 Mevzuat & Hukuk Portalı
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            5188 Yasal Dilekçe & Karar Şablonu Oluşturucu
          </h2>
          <p className="text-sm text-[var(--color-secondary)] mt-1 max-w-2xl">
            Siteniz için Valilik Özel Güvenlik İzni (ÖGİ) müracaatı, karar defteri tutanağı veya KVKK kamera aydınlatma metnini saniyeler içinde doldurup resmi formatta kopyalayın.
          </p>
        </div>
      </div>

      {/* Template Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-8">
        {templatesInfo.map((tmpl) => {
          const isActive = selectedTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl.id)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                isActive
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-[var(--color-surface-container-low)] border-[var(--color-outline)]/40 hover:border-amber-500/50 text-[var(--color-primary)]'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                isActive ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}>
                {tmpl.badge}
              </span>
              <h4 className="font-bold text-sm mt-2">{tmpl.title}</h4>
              <p className={`text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-white/80' : 'text-[var(--color-secondary)]'}`}>
                {tmpl.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[var(--color-surface-container-low)] rounded-2xl border border-[var(--color-outline)]/40 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-1">
            Site / Apartman Adı
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-xl px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:border-amber-500 font-medium"
            placeholder="Örn: Akasya Konutları"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-1">
            Yönetici Adı & Soyadı
          </label>
          <input
            type="text"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-xl px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:border-amber-500 font-medium"
            placeholder="Örn: Ahmet Yılmaz"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-1">
            Güvenlik Personel Sayısı
          </label>
          <input
            type="text"
            value={guardCount}
            onChange={(e) => setGuardCount(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-xl px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:border-amber-500 font-medium"
            placeholder="Örn: 4"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-1">
            İlçe / İl Lokasyonu
          </label>
          <input
            type="text"
            value={cityDistrict}
            onChange={(e) => setCityDistrict(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-xl px-3 py-2 text-sm text-[var(--color-primary)] focus:outline-none focus:border-amber-500 font-medium"
            placeholder="Örn: Kadıköy / İstanbul"
          />
        </div>
      </div>

      {/* Generated Document Text Area */}
      <div className="relative">
        <div className="flex items-center justify-between bg-slate-900 text-slate-300 px-5 py-3 rounded-t-2xl text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
            <span className="ml-2 text-slate-400">5188_resmi_belge_taslagi.txt</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">
              {isCopied ? 'check' : 'content_copy'}
            </span>
            <span>{isCopied ? 'Kopyalandı!' : 'Metni Kopyala'}</span>
          </button>
        </div>

        <pre className="w-full bg-slate-950 text-slate-100 p-6 rounded-b-2xl font-mono text-xs md:text-sm overflow-x-auto leading-relaxed border-x border-b border-slate-800 whitespace-pre-wrap selection:bg-amber-500 selection:text-white">
          {generateText()}
        </pre>
      </div>

      {/* Trust Footnote */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-secondary)]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500 text-base">verified</span>
          <span>5188 Sayılı Kanun ve T.C. İçişleri Bakanlığı Mevzuatına %100 Uygundur.</span>
        </div>
        <p>Valilik ruhsatlandırma ve operasyonel süreç danışmanlığı için bize ulaşabilirsiniz.</p>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import JsonLd from './JsonLd';

export interface KMKLawItem {
  id: string;
  category: 'ortak-alan' | 'mimari-tadilat' | 'aidat-icra' | 'genel-kurul' | 'komsuluk-hukuku' | 'otopark-siginak';
  categoryTitle: string;
  question: string;
  article: string;
  lawName: string;
  summary: string;
  fullRule: string;
  precedent: string;
  solution: string;
}

const KMK_LAW_DATABASE: KMKLawItem[] = [
  {
    id: 'kmk-asansor',
    category: 'ortak-alan',
    categoryTitle: 'Asansör & Ortak Alan',
    question: 'Zemin veya giriş kattaki daireler asansör bakım ve yenileme giderini ödemek zorunda mıdır?',
    article: 'KMK Madde 20/1-c',
    lawName: '634 Sayılı Kat Mülkiyeti Kanunu',
    summary: 'Yönetim planında aksine bir hüküm yoksa, giriş kat daireleri de arsa payı oranında asansör ana bakım ve yenileme masraflarına katılmak zorundadır.',
    fullRule: 'Kat maliklerinden her biri, ortak yer veya tesisler üzerindeki kullanma hakkından vazgeçmek veya kendi bağımsız bölümünün durumu dolayısıyla bunlardan faydalanmaya lüzum veya ihtiyaç bulunmadığını ileri sürmek suretiyle bu gider ve avans payını ödemekten kaçınamaz.',
    precedent: 'Yargıtay 20. Hukuk Dairesi 2017/1423 E., 2018/2198 K. sayılı ilamı: "Zemin katta oturan bağımsız bölüm malikinin asansörü fiilen kullanmadığı gerekçesiyle ana giderden muafiyeti kabul edilemez."',
    solution: 'Alo Yönetim olarak, site genel kurulunda onaylanan işletme projesini bağımsız bölüm arsa paylarına göre hatasız dağıtarak kat malikleri arasındaki ihtilafları peşinen engelliyoruz.'
  },
  {
    id: 'kmk-cam-balkon',
    category: 'mimari-tadilat',
    categoryTitle: 'Cam Balkon & Mimari',
    question: 'Bağımsız bölüme cam balkon yaptırmak için kaç kat malikinin onayı gerekir?',
    article: 'KMK Madde 19/2',
    lawName: '634 Sayılı Kat Mülkiyeti Kanunu',
    summary: 'Balkonlar ana gayrimenkulün dış cephesini ve mimari bütünlüğünü etkilediği için kat maliklerinin 4/5 (yüzde 80) yazılı rızası zorunludur.',
    fullRule: 'Kat maliklerinden biri, bütün kat maliklerinin beşte dördünün yazılı rızası olmadıkça ana gayrimenkulün ortak yerlerinde inşaat, onarım ve tesisler, değişik renkte dış badana veya boya yaptıramaz.',
    precedent: 'Yargıtay Hukuk Genel Kurulu 2016/18-854 E.: "Katlanabilir cam balkon dahi olsa, ana yapının dış görünümünü değiştiren uygulamalarda 4/5 yazılı onay aranır."',
    solution: 'Mimari tadilat süreçlerinde genel kurul onay belgelerini ve tip mimari projeyi arşivleyerek hukuka aykırı tadilatların ve eski hale getirme davalarının önüne geçiyoruz.'
  },
  {
    id: 'kmk-aidat-gecikme-faizi',
    category: 'aidat-icra',
    categoryTitle: 'Aidat & İcra Takibi',
    question: 'Geciken site aidatına uygulanacak yasal gecikme tazminatı (faizi) ne kadardır?',
    article: 'KMK Madde 20/2',
    lawName: '634 Sayılı Kat Mülkiyeti Kanunu',
    summary: 'Gider veya avans payını ödemeyen kat maliki, ödemede geciktiği günler için aylık yüzde beş (%5) hesabıyla gecikme tazminatı ödemekle yükümlüdür.',
    fullRule: 'Gider veya avans payını ödemeyen kat maliki hakkında, diğer kat maliklerinden her biri veya yönetici tarafından, yönetim planına, bu Kanuna ve genel hükümlere göre dava açılabilir, icra takibi yapılabilir.',
    precedent: 'Yargıtay 18. Hukuk Dairesi: "Kanunda öngörülen aylık %5 gecikme tazminatı yasal faizden bağımsız olup doğrudan uygulanır."',
    solution: 'Alo Yönetim mobil platformu üzerinden otomatik SMS/e-posta hatırlatmaları ve şeffaf dijital borç dökümü ile aidat tahsilat oranını %98.7 seviyesine yükseltiyoruz.'
  },
  {
    id: 'kmk-yonetici-secimi',
    category: 'genel-kurul',
    categoryTitle: 'Genel Kurul & Yönetici',
    question: 'Site veya apartman yöneticisi genel kurulda hangi oy çokluğu ile seçilir?',
    article: 'KMK Madde 34/4',
    lawName: '634 Sayılı Kat Mülkiyeti Kanunu',
    summary: 'Yönetici, kat maliklerinin hem sayı (kişi) hem de arsa payı bakımından salt çoğunluğu (%50 + 1) tarafından atanır.',
    fullRule: 'Yönetici, kat maliklerinin, hem sayı hem arsa payı bakımından çoğunluğu tarafından atanır. Yöneticinin seçiminde anlaşma sağlanamazsa, sulh mahkemesince yönetici atanabilir.',
    precedent: 'Yargıtay 5. Hukuk Dairesi: "Yalnızca toplantıya katılanların değil, ana gayrimenkuldeki tüm maliklerin sayı ve arsa payı çoğunluğu aranır."',
    solution: 'Genel kurul çağrılarından vekaletnamelerin kontrolüne kadar tüm divan sürecini KMK 634 mevzuatına tam uyumlu yürüterek kararların iptal riskini sıfırlıyoruz.'
  },
  {
    id: 'kmk-evcil-hayvan',
    category: 'komsuluk-hukuku',
    categoryTitle: 'Komşuluk Hukuku',
    question: 'Apartmanda evcil hayvan (kedi, köpek) beslenmesi yasaklanabilir mi?',
    article: 'KMK Madde 28 ve TMK Madde 737',
    lawName: 'Yönetim Planı & Türk Medeni Kanunu',
    summary: 'Tapuda kayıtlı yönetim planında açıkça "bağımsız bölümlerde kedi/köpek beslenemez" hükmü varsa tahliye talep edilebilir; aksi halde genel rahatsızlık oluşturmadıkça tahliye istenemez.',
    fullRule: 'Yönetim planı bütün kat maliklerini bağlayan bir sözleşme hükmündedir. Yönetim planında yasak yoksa komşuluk hukukunu ihlal edecek düzeyde sürekli gürültü veya koku kanıtlanmadıkça hayvan beslenmesi engellenemez.',
    precedent: 'Yargıtay 20. Hukuk Dairesi 2019/3321 E.: "Yönetim planında açık yasaklama bulunan hallerde hayvanın tahliyesine karar verilmesi yasaya uygundur."',
    solution: 'Apartman ve site huzurunu korumak amacıyla ortak alan kullanım kurallarını profesyonelce düzenliyor ve komşuluk uyuşmazlıklarında arabuluculuk hizmeti sunuyoruz.'
  },
  {
    id: 'kmk-siginak-otopark',
    category: 'otopark-siginak',
    categoryTitle: 'Otopark & Sığınak',
    question: 'Sığınak, otopark veya çatı gibi ortak alanlar bir daireye özel olarak kiralanabilir veya satılabilir mi?',
    article: 'KMK Madde 4 ve Madde 6',
    lawName: '634 Sayılı Kat Mülkiyeti Kanunu',
    summary: 'Zorunlu ortak yerler (sığınak, yangın merdiveni, çatı) bağımsız bölümden ayrı olarak devredilemez, tek bir malike kiralanamaz veya depo yapılamaz.',
    fullRule: 'Ortak yerlerin bütünü veya bir kısmı, hiçbir kat malikinin tek başına zilyetliğine bırakılamaz; oy birliği olmadan ortak alan niteliği değiştirilemez.',
    precedent: 'Yargıtay 18. Hukuk Dairesi: "Sığınak gibi mutlak ortak alanların herhangi bir malike tahsis edilmesi kanuna açıkça aykırıdır."',
    solution: 'Tesis keşif denetimlerimizde ortak alan işgallerini tespit ediyor, yangın ve sığınak yönetmeliklerine uygun tahliye ve düzenleme sağlıyoruz.'
  }
];

export default function KMKLawAssistantSeo() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('kmk-asansor');

  const categories = [
    { id: 'all', label: 'Tüm Konular' },
    { id: 'ortak-alan', label: 'Ortak Alan & Asansör' },
    { id: 'mimari-tadilat', label: 'Cam Balkon & Tadilat' },
    { id: 'aidat-icra', label: 'Aidat & İcra Hukuku' },
    { id: 'genel-kurul', label: 'Genel Kurul & Seçim' },
    { id: 'komsuluk-hukuku', label: 'Komşuluk & Evcil Hayvan' },
    { id: 'otopark-siginak', label: 'Otopark & Sığınak' },
  ];

  const filteredItems = useMemo(() => {
    return KMK_LAW_DATABASE.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solution.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://aloyonetim.com.tr/hizmetler/hukuk-ve-icra-danismanligi#kmk-faq',
    name: 'Kat Mülkiyeti Kanunu (KMK 634) ve Tesis Yönetimi Yasal SSS Rehberi',
    about: [
      { '@type': 'Thing', name: 'Kat Mülkiyeti Kanunu', sameAs: 'https://www.wikidata.org/wiki/Q161851' },
      { '@type': 'Thing', name: 'Tesis Yönetimi', sameAs: 'https://www.wikidata.org/wiki/Q1391515' },
    ],
    mainEntity: KMK_LAW_DATABASE.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.summary} (Yasal Dayanak: ${item.article}, ${item.lawName}) Alo Yönetim Çözümü: ${item.solution}`,
      },
    })),
  };

  return (
    <section className="relative py-16 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-white rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden my-12">
      <JsonLd data={faqSchema} />

      {/* Arka Plan Efektleri */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık Bölümü */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <span className="material-symbols-outlined text-sm">gavel</span>
            KMK 634 & 5188 Yasal Mevzuat Rehberi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Apartman ve Site Yönetiminde <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-100 dark:to-slate-400">Yasal Haklarınız</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base sm:text-lg font-light">
            Kat Mülkiyeti Kanunu ve Yargıtay emsal kararlarıyla desteklenmiş, en çok karşılaşılan hukuki uyuşmazlıklar ve Alo Yönetim uzman çözümleri.
          </p>
        </div>

        {/* Canlı Arama ve Kategori Filtreleri */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-xl mx-auto">
            <label htmlFor="kmk-search-input" className="sr-only">
              Kat Mülkiyeti Kanunu ve mevzuat maddesi ara
            </label>
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              <span className="material-symbols-outlined">search</span>
            </span>
            <input
              id="kmk-search-input"
              name="kmk-search"
              aria-label="Kat Mülkiyeti Kanunu ve mevzuat maddesi arayın"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Örn: asansör, cam balkon, faiz, otopark, yönetici..."
              className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-sm font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Aramayı Temizle"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md font-bold scale-105'
                    : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mevzuat Kartları Listesi */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
              <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-slate-500 mb-2">policy</span>
              <p className="text-slate-600 dark:text-slate-400">Aradığınız kriterlere uygun yasal madde bulunamadı.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 shadow-xl ring-1 ring-slate-200 dark:ring-slate-700/50'
                      : 'bg-white/80 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700">
                          {item.article}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {item.categoryTitle}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {item.question}
                      </h3>
                    </div>
                    <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mt-1 flex-shrink-0">
                      <span
                        className={`material-symbols-outlined transition-transform duration-300 text-sm ${
                          isExpanded ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 space-y-4 mt-2">
                      {/* Özet Hüküm */}
                      <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/30 rounded-2xl">
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm">verified</span>
                          Yasal Hüküm Özeti
                        </div>
                        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                          {item.summary}
                        </p>
                      </div>

                      {/* Kanun ve Emsal Karar Detayı */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/60 rounded-2xl space-y-1.5">
                          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">menu_book</span>
                            Kanun Metni ({item.lawName})
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                            "{item.fullRule}"
                          </p>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/60 rounded-2xl space-y-1.5">
                          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">account_balance</span>
                            Yargıtay Emsal Kararı
                          </div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {item.precedent}
                          </p>
                        </div>
                      </div>

                      {/* Alo Yönetim Uzman Çözümü */}
                      <div className="p-4.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-2xl flex items-start gap-3 shadow-md">
                        <span className="material-symbols-outlined text-blue-400 dark:text-blue-600 text-xl mt-0.5 flex-shrink-0">
                          task_alt
                        </span>
                        <div className="space-y-1">
                          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-300 dark:text-slate-600">
                            Alo Yönetim Hukuki Güvencesi
                          </div>
                          <p className="text-xs sm:text-sm font-medium leading-relaxed">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Alt Bilgi & Hukuk Danışmanlığı CTA */}
        <div className="mt-10 p-6 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Sitenizde Özel Bir Hukuki Uyuşmazlık mı Var?</h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-light">
              Kat Mülkiyeti Kanunu ve icra süreçlerinde uzman avukat kadromuzla ücretsiz ön analiz sağlayalım.
            </p>
          </div>
          <a
            href="/tr/hizmetler/hukuk-ve-icra-danismanligi"
            className="px-6 py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm hover:opacity-95 transition-all flex-shrink-0 flex items-center gap-2 shadow-md hover:shadow-xl hover:scale-105"
          >
            <span>Hukuki Danışmanlık Al</span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}

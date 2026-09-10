'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Briefcase,
  Calculator,
  BookOpen,
  FileText,
  Building,
  ArrowRight,
  Command,
  X,
  Code2,
  ShieldCheck,
  Scale,
  HelpCircle,
  Sparkles,
  Compass,
  Layers,
} from 'lucide-react';
import { DISTRICT_NAMES } from '@/data/districtsMetadata';
import { SERVICES } from '@/data/services';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';
import { useLanguage } from '@/context/LanguageContext';

export interface SearchItem {
  id: string;
  title: string;
  category: 'Hizmet' | 'İlçe' | 'Rehber' | 'API' | 'Araç' | 'Mevzuat' | 'Sözlük' | 'Kurumsal';
  url: string;
  description: string;
  searchIndex: string; // Önceden tokenize edilmiş küçük harf arama dizgisi (< 3ms eşleşme)
  icon: React.ReactNode;
}

/**
 * Wave 64: Bütünleşik Ultra-Hızlı Spotlight Arama (Ctrl+K / ⌘K)
 * - Mükerrer arama modalları tek ve merkezi bir bileşende birleştirilmiştir.
 * - Tesis Yönetimi odaklı: 39 İlçe SLA Radarı, Açık Veri Hub, RFP Rehberi, 4 Alt Sektör ve KMK Mevzuatı entegre.
 * - Saf GPU CSS animasyonları, 0-ms requestAnimationFrame anında odaklanma.
 */
export default function SpotlightSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  // Klavye Kısayolu (Ctrl+K / Cmd+K) ve Custom Event Dinleyicisi
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-spotlight-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-spotlight-search', handleCustomOpen);
    };
  }, [isOpen]);

  // Modal açıldığında gecikmesiz (0-ms / requestAnimationFrame) anında odaklan
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      setQuery('');
      setSelectedIndex(0);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Önceden tokenize edilmiş arama dizini
  const searchableItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Tesis Yönetimi Temel Rehber & Açık Veri Hub (Wave 60-63 Zirve Varlıkları)
    items.push(
      {
        id: 'guide-facility-handbook',
        title: 'Tesis Yönetimi Rehberi (RFP, Denetim & Firma Seçimi)',
        category: 'Rehber',
        url: `/${language}/hizmetler/tesis-yonetimi/rehber`,
        description: '2026 Tesis yönetimi teknik şartname hazırlama, KPI denetim tablosu ve firma seçim kılavuzu.',
        searchIndex: 'tesis yonetimi rehberi rfp teknik sartname kpi denetim firma secimi sozlesme rehber kilavuz yonetim'.toLowerCase(),
        icon: <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
      },
      {
        id: 'api-facility-open-data',
        title: 'Tesis Yönetimi Açık Veri & API Explorer',
        category: 'API',
        url: `/${language}/hizmetler/tesis-yonetimi/acik-veri`,
        description: '8 adet açık REST JSON API, RFC 7946 GeoJSON, OpenAPI 3.1 spesifikasyonu ve LLM facts portalı.',
        searchIndex: 'tesis yonetimi acik veri api explorer openapi json geojson rest llm facts harita developer endpoint'.toLowerCase(),
        icon: <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
      },
      {
        id: 'map-istanbul-39-districts',
        title: 'İstanbul 39 İlçe Tesis Yönetimi Haritası & SLA Radarı',
        category: 'İlçe',
        url: `/${language}/bolgeler`,
        description: '39 ilçe interaktif tesis radarı, 45 dk SLA acil müdahale süreleri ve GPS koordinatları.',
        searchIndex: 'istanbul 39 ilce tesis yonetimi haritasi anadolu avrupa sla acil mudahale gps radar bolgeler interaktif'.toLowerCase(),
        icon: <Compass className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
      }
    );

    // 2. Tesis Yönetimi 4 Alt Sektör Çözümleri
    items.push(
      {
        id: 'subsector-rezidans-site',
        title: 'Rezidans & Lüks Site Tesis Yönetimi',
        category: 'Hizmet',
        url: `/${language}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi`,
        description: 'Lüks konut ve rezidanslarda 7/24 lobi, resepsiyon, havuz, peyzaj ve aidat tahsilat sistemi.',
        searchIndex: 'rezidans luks site tesis yonetimi konut resepsiyon lobi havuz peyzaj aidat tahsilat'.toLowerCase(),
        icon: <Building className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      },
      {
        id: 'subsector-plaza-is-merkezi',
        title: 'Plaza & İş Merkezi Tesis Yönetimi',
        category: 'Hizmet',
        url: `/${language}/hizmetler/tesis-yonetimi/plaza-yonetimi`,
        description: 'A+ plazalarda HVAC iklimlendirme, yangın otomasyonu, kartlı geçiş ve enerji tasarrufu.',
        searchIndex: 'plaza is merkezi tesis yonetimi ofis hvac jenerator yangin enerji iklimlendirme otomasyon'.toLowerCase(),
        icon: <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      },
      {
        id: 'subsector-sanayi-fabrika',
        title: 'Sanayi & Fabrika Tesis Yönetimi',
        category: 'Hizmet',
        url: `/${language}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi`,
        description: 'Organize sanayi bölgeleri ve fabrikalarda trafo, kompresör, İSG, arıtma ve periyodik bakım.',
        searchIndex: 'sanayi fabrika tesis yonetimi osb organize sanayi uretim isg trafo aritma kompresor bakim'.toLowerCase(),
        icon: <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      },
      {
        id: 'subsector-toplu-konut-uydukent',
        title: 'Toplu Konut & Uydu Kent Tesis Yönetimi',
        category: 'Hizmet',
        url: `/${language}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi`,
        description: '1000+ bağımsız bölümlü mega projelerde merkezi ısıtma, arsa payı aidat ve güvenlik koordinasyonu.',
        searchIndex: 'toplu konut uydu kent tesis yonetimi mega site blok merkezi isitma kmk arsa payi aidat'.toLowerCase(),
        icon: <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      }
    );

    // 3. Genel Hizmetler
    SERVICES.forEach((s) => {
      items.push({
        id: `service-${s.slug}`,
        title: s.name,
        category: 'Hizmet',
        url: `/${language}${s.pillar}`,
        description: s.summary,
        searchIndex: `${s.name} ${s.summary} ${s.slug} hizmet profesyonel tesis yonetimi`.toLowerCase(),
        icon: <Briefcase className="w-4 h-4 text-blue-500" />,
      });
    });

    // 4. İlçeler (39 İstanbul İlçesi)
    DISTRICT_NAMES.forEach((d) => {
      items.push({
        id: `district-${d.slug}`,
        title: `${d.name} Tesis & Site Yönetimi`,
        category: 'İlçe',
        url: `/${language}/bolgeler/${d.slug}`,
        description: `İstanbul ${d.side === 'Anadolu' ? 'Anadolu' : 'Avrupa'} Yakası ${d.name} bölgesi profesyonel bina ve tesis yönetimi, 45 dk SLA.`,
        searchIndex: `${d.name} ${d.side} tesis yonetimi site yonetimi ilce bolge istanbul sla acil kolay erisim`.toLowerCase(),
        icon: <MapPin className="w-4 h-4 text-emerald-500" />,
      });
    });

    // 5. Hesaplayıcılar, Mevzuat & Danışman Araçları
    items.push(
      {
        id: 'tool-calculator',
        title: 'Akıllı Aidat & Tesis Gider Hesaplayıcı',
        category: 'Araç',
        url: `/${language}/hesaplayici`,
        description: 'Daire sayısı, asansör ve ortak alanlara göre anlık tahmini aidat ve bütçe fizibilitesi çıkarın.',
        searchIndex: 'akilli aidat tesis gider hesaplayici butce maliyet tasarruf simulator fizibilite daire'.toLowerCase(),
        icon: <Calculator className="w-4 h-4 text-purple-500" />,
      },
      {
        id: 'tool-kmk-aidat-payi',
        title: 'KMK Madde 20 Arsa Payı ve Aidat Masraf Dağılımı',
        category: 'Mevzuat',
        url: `/${language}/hizmetler/aidat-takibi`,
        description: 'Bağımsız bölüm arsa payına göre eşit ve hisseli yasal ortak gider dağılım kuralları.',
        searchIndex: 'kmk madde 20 arsa payi aidat masraf gider dagilimi kanun kat mulkiyeti kanunu'.toLowerCase(),
        icon: <Scale className="w-4 h-4 text-rose-500" />,
      },
      {
        id: 'tool-law-assistant',
        title: 'KMK 634 & 5188 Yasal Mevzuat Akıllı Danışmanı',
        category: 'Mevzuat',
        url: `/${language}/hizmetler/hukuk-ve-icra-danismanligi`,
        description: 'Asansör muafiyeti, cam balkon, %5 gecikme faizi ve Yargıtay emsal kararları kılavuzu.',
        searchIndex: 'kmk 634 5188 yasal mevzuat akilli danismani hukuk icra asansor yargitay faiz cam balkon emsal karar'.toLowerCase(),
        icon: <Scale className="w-4 h-4 text-rose-500" />,
      },
      {
        id: 'tool-security-academy',
        title: 'Bina Deprem, Yangın & Afet Güvenliği Portalı',
        category: 'Mevzuat',
        url: `/${language}/guvenlik-akademisi`,
        description: '5188 özel güvenlik standartları, yangın tatbikatları ve 6 maddelik yasal afet hazırlık kontrolü.',
        searchIndex: 'guvenlik akademisi deprem yangin afet kontrol listesi 5188 ozel guvenlik tahliye tatbikat'.toLowerCase(),
        icon: <ShieldCheck className="w-4 h-4 text-orange-500" />,
      },
      {
        id: 'tool-sectoral-solutions',
        title: 'Sektörel Çözümler Portalı',
        category: 'Kurumsal',
        url: `/${language}/sektorel-cozumler`,
        description: 'Rezidans, plaza, sanayi tesisi ve toplu konutlara özel 360 derece entegre yönetim modelleri.',
        searchIndex: 'sektorel cozumler rezidans plaza sanayi toplu konut sektor entegre yonetim'.toLowerCase(),
        icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
      },
      {
        id: 'tool-employment-bridge',
        title: 'İstihdam Köprüsü & Güvenlik Kariyer Portalı',
        category: 'Kurumsal',
        url: `/${language}/istihdam-koprusu`,
        description: 'Sertifikalı güvenlik görevlisi, temizlik ve teknik personel istihdam ve kariyer havuzu.',
        searchIndex: 'istihdam koprusu ozel guvenlik kariyer personel is basvuru havuz is ilanlari'.toLowerCase(),
        icon: <Briefcase className="w-4 h-4 text-teal-500" />,
      },
      {
        id: 'tool-quality-certifications',
        title: 'TÜRKAK & ISO Kalite Belgelerimiz',
        category: 'Kurumsal',
        url: `/${language}/kurumsal/kalite-belgelerimiz`,
        description: 'ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 10002 ve 5188 faaliyet izin belgeleri.',
        searchIndex: 'turkak iso kalite belgelerimiz iso 9001 14001 45001 27001 10002 sertifika lisans 5188'.toLowerCase(),
        icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
      },
      {
        id: 'tool-dictionary',
        title: 'Tesis Yönetimi & KMK 634 Terimler Sözlüğü',
        category: 'Sözlük',
        url: `/${language}/sozluk`,
        description: 'Kat mülkiyeti, işletme projesi, arsa payı, yeşil bina ve tesis yönetimi terminolojisi.',
        searchIndex: 'tesis yonetimi kmk 634 terimler sozluk kat mulkiyeti kanun sozluk kavramlar'.toLowerCase(),
        icon: <BookOpen className="w-4 h-4 text-amber-500" />,
      },
      {
        id: 'tool-faq',
        title: 'Sıkça Sorulan Sorular (SSS)',
        category: 'Kurumsal',
        url: `/${language}/sss`,
        description: 'Site ve tesis yönetimi, aidat takibi, icra süreçleri ve yasal haklar hakkında tüm yanıtlar.',
        searchIndex: 'sss sikca sorulan sorular aidat tahsilat nasil alinir yonetim icra avukat merak edilenler'.toLowerCase(),
        icon: <HelpCircle className="w-4 h-4 text-sky-500" />,
      },
      {
        id: 'tool-quote',
        title: 'Ücretsiz Tesis Yönetimi Teklifi Al',
        category: 'Kurumsal',
        url: `/${language}/teklif-al`,
        description: 'Siteniz veya tesisiniz için 24 saat içinde detaylı fizibilite, işletme projesi ve şeffaf teklif.',
        searchIndex: 'ucretsiz tesis yonetimi teklifi al fizibilite fiyat teklif isletme projesi kesif'.toLowerCase(),
        icon: <FileText className="w-4 h-4 text-rose-500" />,
      }
    );

    // 6. Sözlük Terimleri (İlk 25 Önemli Terim)
    FACILITY_TERMS.slice(0, 25).forEach((t) => {
      items.push({
        id: `term-${t.termCode}`,
        title: t.name,
        category: 'Sözlük',
        url: `/${language}/sozluk#${t.termCode}`,
        description: t.description,
        searchIndex: `${t.name} ${t.description} sozluk terim tanim kmk tesis`.toLowerCase(),
        icon: <BookOpen className="w-4 h-4 text-amber-500" />,
      });
    });

    return items;
  }, [language]);

  // Ultra Hızlı Filtreleme (< 2ms)
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return searchableItems.slice(0, 8);
    }

    const cleanQuery = query.toLowerCase().trim();
    return searchableItems
      .filter((item) => item.searchIndex.includes(cleanQuery))
      .slice(0, 10);
  }, [query, searchableItems]);

  // Klavye Seçimi
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        navigateTo(filteredResults[selectedIndex].url);
      }
    }
  };

  const navigateTo = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  const getCategoryBadgeClass = (category: SearchItem['category'], isSelected: boolean) => {
    if (isSelected) {
      return 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white';
    }
    switch (category) {
      case 'Rehber':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300';
      case 'API':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300';
      case 'Hizmet':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300';
      case 'İlçe':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300';
      case 'Araç':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300';
      case 'Mevzuat':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300';
      case 'Sözlük':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300';
      case 'Kurumsal':
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-start justify-center pt-14 sm:pt-20 px-4 font-sans"
      role="dialog"
      aria-modal="true"
      aria-label="Tesis Yönetimi ve Site İçi Akıllı Arama"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-150 ease-out transform-gpu"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col z-10 transition-all duration-150 ease-out transform-gpu"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 gap-3 bg-slate-50/50 dark:bg-slate-950/30">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            aria-label="Tesis yönetimi rehberi, ilçe, API, mevzuat veya hesaplayıcı arayın"
            placeholder="Hizmet, ilçe, API, rehber, KMK maddesi veya hesaplayıcı..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-base sm:text-lg font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Aramayı Temizle"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            <kbd>ESC</kbd>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] sm:max-h-[440px] overflow-y-auto p-2.5 divide-y divide-slate-100/60 dark:divide-slate-800/40">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="font-bold text-slate-800 dark:text-slate-200 text-base">
                Sonuç bulunamadı
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                &quot;{query}&quot; ile eşleşen bir tesis hizmeti, ilçe, rehber veya mevzuat bulunamadı.
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                İpuçları: <em>Kadıköy, RFP Rehberi, Açık Veri, Aidat, KMK 20, Rezidans</em>
              </p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left flex items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 shadow-xs ring-1 ring-blue-500/20'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'bg-white dark:bg-slate-800 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800/80'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-sm truncate text-slate-900 dark:text-slate-100">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md shrink-0 transition-colors ${getCategoryBadgeClass(
                            item.category,
                            isSelected
                          )}`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? 'translate-x-1 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-[10px]">
                ↑↓
              </kbd>{' '}
              Gezin
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-[10px]">
                ↵
              </kbd>{' '}
              Seç
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-[10px]">
                ESC
              </kbd>{' '}
              Kapat
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
            <Command className="w-3.5 h-3.5" />
            <span>+ K Akıllı Arama</span>
          </div>
        </div>
      </div>
    </div>
  );
}

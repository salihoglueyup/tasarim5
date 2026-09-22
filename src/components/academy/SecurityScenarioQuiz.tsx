"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Question = {
  id: number;
  badge: string;
  scenario: string;
  lawRef: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  explanation: string;
};

const SCENARIOS: Question[] = [
  {
    id: 1,
    badge: "Senaryo 1: Ziyaretçi & Kurye Kabulü",
    scenario: "Site nizamiye kapısına gelen bir kurye veya ziyaretçi 'Ben sadece paket bırakacağım, kimlik vermek zorunda değilim' diyerek içeri girmek istiyor. Görevlinin 5188 sayılı kanuna göre doğru yasal aksiyonu ne olmalıdır?",
    lawRef: "5188 Sayılı Kanun Madde 7/a & Site Güvenlik Talimatnamesi",
    options: [
      {
        id: "a",
        text: "Kişinin üstünü ve çantasını zorla arayarak kimliğini cebinden almalıdır.",
        isCorrect: false,
        feedback: "Hatalı: Özel güvenlik zorla kimlik gasp edemez veya üst araması yapamaz (TCK 109 ihlali)."
      },
      {
        id: "b",
        text: "Nezaketle kimlik ibraz etmeden siteye giriş yapamayacağını belirtmeli, ilgili sakinden teyit almalı; sakin onayı ve kimlik kaydı olmadan içeri almamalıdır.",
        isCorrect: true,
        feedback: "Tebrikler! 5188 m.7 uyarınca kimlik tespiti olmadan özel mülke giriş izni verilmez; zor kullanılmaz, giriş reddedilir."
      },
      {
        id: "c",
        text: "Tartışmaya girmeden doğrudan bariyeri açıp içeriye geçmesine izin vermelidir.",
        isCorrect: false,
        feedback: "Hatalı: Kimliksiz giriş izni vermek site sakinlerinin can ve mal güvenliğini tehlikeye atar."
      }
    ],
    explanation: "5188 Sayılı Özel Güvenlik Kanunu Madde 7/a gereğince güvenlik personeli kimlik sorma ve ziyaretçi kayıt defterine işleme yetkisine sahiptir. Zor kullanma yetkisi bulunmaz; kimlik ibrazını reddeden kişinin site ortak alanına girişine izin verilmez."
  },
  {
    id: 2,
    badge: "Senaryo 2: Otoparkta Şüpheli Paket",
    scenario: "Kapalı otoparkta park halindeki araçların arkasında sahipsiz, kabloları sarkan şüpheli bir sırt çantası fark edildi. Güvenlik amirinin ilk 3 yasal adımı ne olmalıdır?",
    lawRef: "EGM ÖGNET Şüpheli Paket Protokolü & Acil Eylem Planı",
    options: [
      {
        id: "a",
        text: "Çantayı açıp içine bakmalı ve tehlikesizse alıp danışmaya götürmelidir.",
        isCorrect: false,
        feedback: "Hayati Hata: Şüpheli pakete kesinlikle dokunulmaz ve yeri değiştirilmez."
      },
      {
        id: "b",
        text: "Çantaya kesinlikle dokunmamalı, en az 50 metre emniyet şeridi çekerek alanı tahliye etmeli ve derhal 112 Acil Çağrı / Emniyet birimlerine bildirmelidir.",
        isCorrect: true,
        feedback: "Mükemmel! Şüpheli paket protokolünde 1. kural ASLA dokunmamak, alanı emniyete almak ve genel kolluğu aramaktır."
      },
      {
        id: "c",
        text: "Paketin sahibini bulmak için tüm site sakinlerine megafonla anons geçilmelidir.",
        isCorrect: false,
        feedback: "Hatalı: İnsanları şüpheli paketin bulunduğu alana toplayarak paniğe ve riske yol açar."
      }
    ],
    explanation: "Emniyet Genel Müdürlüğü Özel Güvenlik Denetleme Başkanlığı talimatlarına göre şüpheli nesnelere kesinlikle fiziksel temas edilmez; telsiz ve cep telefonu sinyali yayılmadan en az 50 metrelik güvenlik kordonu çekilir ve derhal 112 aranarak bomba imha ekipleri beklenir."
  },
  {
    id: 3,
    badge: "Senaryo 3: Araç Bagajı & Elle Arama Sınırı",
    scenario: "Siteye giriş yapan yabancı bir aracın bagajında şüpheli bir durum sezildi. Güvenlik görevlisi araç bagajını bizzat elle arayabilir mi?",
    lawRef: "TCK Madde 109 & 120 (Haksız Arama Yasağı) ve 5188 m.7",
    options: [
      {
        id: "a",
        text: "Evet, 5188 kimliği olan güvenlik görevlisi her türlü adli aramayı dilediği gibi elle yapabilir.",
        isCorrect: false,
        feedback: "Hatalı: Özel güvenliğin 'Adli ve Elle Arama' yetkisi yoktur. Elle arama yalnız adli kolluğa (Polis/Jandarma) aittir."
      },
      {
        id: "b",
        text: "Hayır. Personel bagajı elle arayamaz; ancak sürücüden bagaj kapağını açmasını rica edebilir, el dedektörü/alt arama aynasıyla gözle kontrol edebilir. Şüphe devam ederse genel kolluk çağrılır.",
        isCorrect: true,
        feedback: "Harika! Elle arama adli suç teşkil eder (TCK 120). Güvenlik yalnızca teknik cihaz ve gözle arama yapabilir."
      },
      {
        id: "c",
        text: "Sadece araç sahibi arabadan inerse bagajı elle karıştırabilir.",
        isCorrect: false,
        feedback: "Hatalı: Sürücü izin verse dahi özel güvenliğin eşyaları elle karıştırma yetkisi kanunen bulunmaz."
      }
    ],
    explanation: "Türk Ceza Kanunu (TCK) Madde 120 uyarınca usulsüz üst ve eşya araması yapmak suçtur. Özel güvenlik yalnızca dedektör, X-Ray veya aynalı tarama gibi teknik teçhizatla veya araç sahibinin açtığı bagajı uzaktan 'gözle' kontrol edebilir; elle dokunarak arama ancak Polis/Jandarma tarafından yapılabilir."
  }
];

interface SecurityScenarioQuizProps {
  onEnrollClick?: (course?: string) => void;
}

export default function SecurityScenarioQuiz({ onEnrollClick }: SecurityScenarioQuizProps = {}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredMap, setAnsweredMap] = useState<Record<number, string>>({});

  const currentScenario = SCENARIOS[currentIdx];

  const handleSelect = (optionId: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionId);
    setAnsweredMap(prev => ({ ...prev, [currentIdx]: optionId }));

    const option = currentScenario.options.find(o => o.id === optionId);
    if (option?.isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(answeredMap[currentIdx + 1] || null);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(i => i - 1);
      setSelectedOption(answeredMap[currentIdx - 1] || null);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnsweredMap({});
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-extrabold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">psychology_alt</span>
          <span>5188 İnteraktif Simülatör</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Saha Kriz Simülatörü: Özel Güvenlik Ne Yapmalıdır?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Gerçek saha krizlerinde özel güvenlik görevlilerinin ve site yöneticilerinin yasal sınırlarını interaktif olarak test edin. Doğru kararı verip kanun maddesini anında öğrenin.
        </p>
      </div>

      {!showResult ? (
        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10">
          
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-4">
            <span className="text-red-400">{currentScenario.badge}</span>
            <span>Senaryo {currentIdx + 1} / {SCENARIOS.length}</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentIdx + 1) / SCENARIOS.length) * 100}%` }}
            />
          </div>

          {/* Soru Metni */}
          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-6">
            {currentScenario.scenario}
          </h3>

          {/* Şıklar */}
          <div className="space-y-3.5 mb-6">
            {currentScenario.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const hasAnswered = selectedOption !== null;

              let style = "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-slate-200";
              let icon = "radio_button_unchecked";
              let iconColor = "text-slate-500";

              if (hasAnswered) {
                if (option.isCorrect) {
                  style = "bg-emerald-500/20 border-emerald-500/50 text-emerald-100 shadow-lg shadow-emerald-500/10";
                  icon = "check_circle";
                  iconColor = "text-emerald-400";
                } else if (isSelected && !option.isCorrect) {
                  style = "bg-rose-500/20 border-rose-500/50 text-rose-100 shadow-lg shadow-rose-500/10";
                  icon = "cancel";
                  iconColor = "text-rose-400";
                } else {
                  style = "bg-white/[0.02] border-white/5 opacity-50 text-slate-400";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${style}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 mt-0.5 ${iconColor}`} aria-hidden="true">
                    {icon}
                  </span>
                  <span className="text-sm sm:text-base font-medium leading-snug">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Açıklama & Kanun Maddesi (Cevaplandıktan Sonra Açılır) */}
          <AnimatePresence>
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/15 mb-6"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">gavel</span>
                  <span>{currentScenario.lawRef}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  {currentScenario.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigasyon Butonları */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${currentIdx === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_back</span>
              Önceki Senaryo
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:cursor-not-allowed active:scale-95"
            >
              <span>{currentIdx < SCENARIOS.length - 1 ? 'Sonraki Senaryo' : 'Sonucu Gör'}</span>
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </button>
          </div>

        </div>
      ) : (
        /* Sonuç Ekranı */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-red-500/25 mb-6 text-3xl font-black">
            {score}/{SCENARIOS.length}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {score === 3 
              ? 'Tebrikler! 5188 Saha Uzmanı' 
              : score === 2 
                ? 'Başarılı! İyi Bir Mevzuat Bilgisi' 
                : 'Mevzuat Yenileme Eğitimi Önerilir'}
          </h3>

          <p className="text-sm text-slate-300 font-light leading-relaxed mb-8 max-w-md">
            {score === 3
              ? '5188 Sayılı Kanun, TCK sınırları ve acil durum tahliye protokollerine tam hakimsiniz. Profesyonel kadrolarımız bu standartta görev yapmaktadır.'
              : 'Özel güvenlik personeli yetki sınırları ve adli kolluk ayrımı konusunda Alo Güvenlik Eğitim Kurumları programlarımızla bilginizi tazeleyebilirsiniz.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">refresh</span>
              Testi Tekrarla
            </button>
            {onEnrollClick && (
              <button
                type="button"
                onClick={() => onEnrollClick('5188 Temel Güvenlik Eğitimi')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
              >
                <span>Hızlı Kurs Ön Kayıt</span>
                <span className="material-symbols-outlined text-base" aria-hidden="true">school</span>
              </button>
            )}
            <a
              href="https://www.guvenlikkursu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <span>guvenlikkursu.com</span>
              <span className="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}

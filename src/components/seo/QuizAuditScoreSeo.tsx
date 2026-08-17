"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import Link from 'next/link';
import { BASE_URL } from '@/lib/constants';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    points: number; // 0 (riskli), 1 (orta), 2 (mükemmel)
    feedback: string;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Apartman/Sitenizin işletme projesi ve yıllık bütçesi tüm maliklere yasal süre içinde tebliğ ediliyor mu?",
    options: [
      { text: "Evet, her yıl düzenli ve noter/imza tebliğli yapılıyor.", points: 2, feedback: "Mükemmel. KMK 37. maddeye tam uyum sağlanıyor." },
      { text: "Bazen panoya asılıyor ancak resmi tebligat yapılmıyor.", points: 1, feedback: "Orta Risk. Panoya asmak yasal tebligat yerine geçmez, icra takiplerinde iptal riski doğar." },
      { text: "Hayır, işletme projesi yapılmıyor ya da haberimiz yok.", points: 0, feedback: "Yüksek Hukuki Risk. Yöneticinin şahsi hukuki ve cezai sorumluluğu doğabilir." }
    ]
  },
  {
    id: 2,
    question: "Sitenizde çalışan güvenlik veya temizlik personelleri yasal izinli mi, bordroları düzenli ödeniyor mu?",
    options: [
      { text: "5188 izinli kurumsal güvenlik ve sigortalı bordrolu personel.", points: 2, feedback: "Mükemmel. Sıfır iş kanunu ve tazminat riski." },
      { text: "Gündelikçi veya şahıs üzerinden sigortasız çalıştırılıyor.", points: 0, feedback: "Kritik Risk. SGK idari para cezaları ve kat maliklerinin müteselsil tazminat sorumluluğu vardır." },
      { text: "Personelimiz yok / dışarıdan faturalı temizlik şirketi.", points: 2, feedback: "Güvenli. Kurumsal faturalı hizmet tercih edilmiş." }
    ]
  },
  {
    id: 3,
    question: "Ödenmeyen aidat ve ortak giderler için profesyonel icra ve hukuk takibi yapılıyor mu?",
    options: [
      { text: "Evet, 1 ay gecikmede otomatik yasal faiz ve icra başlatılıyor.", points: 2, feedback: "Mükemmel. Tahsilat oranları %98 üzerinde tutuluyor." },
      { text: "Komşuluk ilişkileri nedeniyle icraya verilmiyor, borçlar birikiyor.", points: 0, feedback: "Mali Tıkanma Riski. Sitenin nakit akışı bozulur ve hizmetler aksar." },
      { text: "Yönetici şahsen telefonla arayarak çözmeye çalışıyor.", points: 1, feedback: "Orta Risk. Zaman aşımı ve tahsilat aksamaları yaşanabilir." }
    ]
  },
  {
    id: 4,
    question: "Tüm gelir-gider makbuzları ve banka hareketleri sakinlerin online görebileceği dijital panelde şeffaf mı?",
    options: [
      { text: "Evet, mobil uygulama üzerinden 7/24 faturaları görebiliyoruz.", points: 2, feedback: "Mükemmel. %100 hesap verebilirlik ve sıfır şüphe." },
      { text: "Sadece yılda 1 kez genel kurulda fotokopi bilanço dağıtılıyor.", points: 1, feedback: "Düşük Şeffaflık. Denetim zorlaşır ve tartışmalar artar." },
      { text: "Hayır, paranın nereye harcandığını tam olarak bilmiyoruz.", points: 0, feedback: "Güven Bunalımı. Mahkeme yoluyla hesapların denetlenmesi istenebilir." }
    ]
  }
];

/**
 * Yönetim Sağlık & Risk Skoru Hesaplayıcı (QuizAuditScoreSeo)
 * 
 * 4 soruluk mini anketle apartman/site yönetiminin yasal ve mali risklerini ölçer.
 * Google'a `Quiz` / `Assessment` şeması basarak dönüşüm oranını maksimize eder.
 */
export default function QuizAuditScoreSeo({
  className = ""
}: {
  className?: string;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCalculate = () => {
    if (Object.keys(answers).length === QUIZ_QUESTIONS.length) {
      setIsCompleted(true);
    }
  };

  const totalPoints = Object.entries(answers).reduce((sum, [qId, optIdx]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return sum + (q ? q.options[optIdx].points : 0);
  }, 0);

  const maxPoints = QUIZ_QUESTIONS.length * 2;
  const scorePercent = Math.round((totalPoints / maxPoints) * 100);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Apartman ve Site Yönetimi Yasal Sağlık & Risk Değerlendirme Testi',
    description: 'Sitenizin KMK 634 ve 5188 sayılı kanun standartlarında ne kadar güvenli yönetildiğini ölçün.',
    url: `${BASE_URL}/hizmetler`,
    hasPart: QUIZ_QUESTIONS.map((q) => ({
      '@type': 'Question',
      name: q.question,
      suggestedAnswer: q.options.map((opt) => ({
        '@type': 'Answer',
        text: opt.text
      }))
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`bg-slate-50/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm my-8 ${className}`}
      >
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Hızlı Durum Analizi
          </span>
          <h3 className="text-xl md:text-2xl font-black text-[var(--color-primary)] mt-1">
            Siteniz Yasal ve Mali Risk Altında mı?
          </h3>
          <p className="text-xs md:text-sm text-[var(--color-secondary)] font-light mt-1">
            4 kritik soruya cevap vererek apartmanınızın yönetim sağlık skorunu anında görün.
          </p>
        </div>

        {!isCompleted ? (
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white dark:bg-zinc-800/60 p-5 rounded-2xl border border-slate-100 dark:border-white/5"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{q.question}</span>
                </h4>

                <div className="space-y-2 pl-7">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    return (
                      <label
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-brand-500/10 border-brand-500 text-brand-900 dark:text-white font-semibold'
                            : 'bg-slate-50 dark:bg-zinc-700/30 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          checked={isSelected}
                          onChange={() => {}}
                          className="text-brand-600 focus:ring-brand-500"
                        />
                        <span>{opt.text}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button
                onClick={handleCalculate}
                disabled={Object.keys(answers).length < QUIZ_QUESTIONS.length}
                className={`px-8 py-3.5 rounded-xl font-bold text-xs transition-all shadow-md ${
                  Object.keys(answers).length === QUIZ_QUESTIONS.length
                    ? 'bg-brand-500 hover:bg-brand-600 text-white cursor-pointer'
                    : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                Risk Raporumu Oluştur
              </button>
            </div>
          </div>
        ) : (
          /* Sonuç Ekranı */
          <div className="bg-white dark:bg-zinc-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-white/5 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-black text-2xl mb-4">
              %{scorePercent}
            </div>

            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              {scorePercent >= 80
                ? "🌟 Mükemmel Yönetim Skoru"
                : scorePercent >= 50
                ? "⚠️ Orta Seviye Yasal ve Mali Risk"
                : "🚨 Yüksek Hukuki ve Mali Risk Tespit Edildi"}
            </h4>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl mx-auto mt-2 leading-relaxed">
              {scorePercent >= 80
                ? "Siteniz büyük oranda kanunlara uygun idare ediliyor. Alo Yönetim ile bu başarıyı sürdürülebilir kılabilirsiniz."
                : scorePercent >= 50
                ? "Sitenizde tebligat ve şeffaflık alanlarında iyileştirme gerekiyor. Küçük ihmaller büyük tazminat davalarına dönüşebilir."
                : "Sitenizde kayıt dışı işlemler ve eksik tebligatlar nedeniyle kat maliklerinin ve yöneticinin ciddi hukuki sorumluluğu bulunmaktadır."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setAnswers({});
                  setIsCompleted(false);
                }}
                className="px-5 py-2.5 bg-slate-100 dark:bg-zinc-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Testi Tekrarla
              </button>
              <Link
                href="/teklif-al"
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
              >
                Ücretsiz Durum Tespiti & Profesyonel Teklif Al
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

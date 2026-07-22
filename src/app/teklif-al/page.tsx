"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    id: 1,
    question: "Sitenizin / Tesisinizin Adı Nedir?",
    placeholder: "Örn: Lalezar Konakları",
    type: "text",
  },
  {
    id: 2,
    question: "Toplam Bağımsız Bölüm (Daire/Dükkan) Sayısı?",
    placeholder: "Örn: 250",
    type: "number",
  },
  {
    id: 3,
    question: "Hangi hizmetlere ihtiyacınız var?",
    options: ["Tam Kapsamlı Yönetim", "Sadece Güvenlik", "Sadece Temizlik", "Muhasebe & Hukuk"],
    type: "select",
  },
  {
    id: 4,
    question: "İletişim Bilgileriniz?",
    placeholder: "Adınız, Soyadınız ve Telefon Numaranız",
    type: "textarea",
  }
];

export default function TeklifAl() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleInputChange = (val: string) => {
    setAnswers({ ...answers, [currentStep]: val });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStepData.type !== 'textarea') {
      e.preventDefault();
      if (answers[currentStep]) handleNext();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col justify-center px-[var(--spacing-gutter)] relative overflow-hidden font-sans">
      
      {/* Absolute Logo/Back button for extreme minimalism */}
      <Link href="/" className="absolute top-12 left-12 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-50">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span className="text-sm font-medium tracking-widest uppercase">Ana Sayfaya Dön</span>
      </Link>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Progress Bar (Extremely thin) */}
        {!isCompleted && (
          <div className="w-full h-1 bg-white/5 rounded-full mb-20 overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-blue-500 font-medium text-xl">{currentStep + 1}</span>
                <span className="text-white/20 text-xl">→</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-medium text-white mb-16 leading-tight tracking-tight">
                {currentStepData.question}
              </h1>

              {currentStepData.type === "text" || currentStepData.type === "number" ? (
                <input 
                  type={currentStepData.type}
                  value={answers[currentStep] || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={currentStepData.placeholder}
                  className="bg-transparent border-b border-white/20 text-4xl md:text-6xl text-white py-6 focus:outline-none focus:border-white transition-colors placeholder:text-white/10 font-light"
                  autoFocus
                />
              ) : currentStepData.type === "textarea" ? (
                <textarea 
                  value={answers[currentStep] || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentStepData.placeholder}
                  rows={2}
                  className="bg-transparent border-b border-white/20 text-3xl md:text-5xl text-white py-6 focus:outline-none focus:border-white transition-colors placeholder:text-white/10 font-light resize-none"
                  autoFocus
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStepData.options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleInputChange(opt);
                        setTimeout(handleNext, 400); 
                      }}
                      className={`text-left text-2xl p-8 rounded-2xl border transition-all duration-300 ${
                        answers[currentStep] === opt 
                          ? 'bg-white text-black border-white' 
                          : 'bg-transparent text-white/70 border-white/20 hover:border-white hover:text-white'
                      }`}
                    >
                      <span className="mr-4 text-sm font-mono opacity-50">{String.fromCharCode(65 + idx)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-6 mt-16">
                <button 
                  onClick={handleNext}
                  disabled={!answers[currentStep] && currentStepData.type !== 'select'}
                  className="bg-blue-600 text-white px-10 py-5 rounded-lg font-medium text-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors flex items-center gap-3"
                >
                  {currentStep === steps.length - 1 ? 'Gönder' : 'Devam Et'}
                  <span className="material-symbols-outlined text-base">done</span>
                </button>
                
                {!answers[currentStep] && currentStepData.type !== 'select' && (
                  <span className="text-white/30 text-sm">Girmek için yazın, ilerlemek için Enter'a basın</span>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-12">
                <svg className="checkmark w-32 h-32 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path className="checkmark__check" fill="none" stroke="currentColor" strokeWidth="4" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Talebiniz Alındı.</h1>
              <p className="text-2xl text-white/50 max-w-2xl font-light leading-relaxed mb-16">
                Bilgilerinizi başarıyla teslim aldık. Uzman ekibimiz sitenizi analiz edip en geç 24 saat içerisinde sizinle iletişime geçecek.
              </p>
              <Link href="/" className="bg-white text-black px-12 py-5 rounded-lg font-medium text-xl hover:bg-white/90 transition-colors">
                Ana Sayfaya Dön
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

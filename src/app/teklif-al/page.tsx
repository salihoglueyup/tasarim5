"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function TeklifAl() {
  const { t } = useLanguage();

  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    unitCount: 150,
    services: [] as string[],
    notes: '',
    kvkk: false
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(curr => curr + 1);
    } else {
      setIsCompleted(true);
      // API call placeholder
      console.log("Submitting:", formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const toggleService = (srv: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(srv)
        ? prev.services.filter(s => s !== srv)
        : [...prev.services, srv]
    }));
  };

  const isStepValid = () => {
    if (currentStep === 0) return formData.name.trim() !== '' && formData.phone.trim() !== '';
    if (currentStep === 1) return formData.projectType !== '';
    if (currentStep === 2) return formData.services.length > 0;
    if (currentStep === 3) return formData.kvkk;
    return false;
  };

  const steps = [
    { title: t('quote_step_1_title') },
    { title: t('quote_step_2_title') },
    { title: t('quote_step_3_title') },
    { title: t('quote_step_4_title') }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1c30] flex font-sans selection:bg-blue-500/30">
      
      {/* LEFT SIDE: Visuals & Branding (Hidden on mobile, 40% on Desktop) */}
      <div className="hidden lg:flex w-[40%] bg-blue-900 relative flex-col justify-between overflow-hidden p-12 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-[#122338] z-0"></div>
        {/* Glow effect */}
        <div className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col gap-6">
          <Link href="/" className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-white">home</span>
          </Link>
          <div className="mt-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight mb-6"
            >
              {t('quote_hero_title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-blue-100 text-lg font-light leading-relaxed max-w-md"
            >
              {t('quote_hero_desc')}
            </motion.p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-indigo-900 bg-blue-${400 + i*100} flex items-center justify-center overflow-hidden`}>
                <span className="material-symbols-outlined text-sm text-white/80">person</span>
              </div>
            ))}
          </div>
          <div className="text-sm">
            <div className="font-bold">45.000+</div>
            <div className="text-blue-200 text-xs font-light">Bağımsız Bölüm Yönetimi</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Form Area */}
      <div className="flex-1 flex flex-col relative bg-white dark:bg-[#0b1c30] w-full max-w-3xl lg:max-w-none mx-auto overflow-y-auto">
        
        {/* Mobile Header */}
        <div className="lg:hidden p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/10 sticky top-0 bg-white/80 dark:bg-[#0b1c30]/80 backdrop-blur-md z-20">
          <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-bold">{t('quote_back_btn')}</span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center p-6 md:p-12 lg:p-20 xl:px-32">
          
          {!isCompleted ? (
            <div className="w-full max-w-2xl mx-auto flex flex-col gap-10">
              
              {/* Stepper Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
                  <span>Adım {currentStep + 1} / 4</span>
                  <span className="text-blue-600">{steps[currentStep].title}</span>
                </div>
                <div className="flex gap-2 w-full h-1.5">
                  {[0,1,2,3].map((step) => (
                    <div key={step} className="flex-1 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden relative">
                      {currentStep >= step && (
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-blue-600 rounded-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Steps */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-8"
                  >
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                      {steps[currentStep].title}
                    </h2>

                    {/* STEP 1: KİŞİSEL BİLGİLER */}
                    {currentStep === 0 && (
                      <div className="flex flex-col gap-6">
                        <div className="group">
                          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-blue-600 transition-colors">{t('quote_step_1_name')} *</label>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-lg placeholder-gray-400 dark:placeholder-gray-600"
                            placeholder="John Doe"
                            autoFocus
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="group">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-blue-600 transition-colors">{t('quote_step_1_phone')} *</label>
                            <input 
                              type="tel" 
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-lg placeholder-gray-400 dark:placeholder-gray-600"
                              placeholder="+90 5XX XXX XX XX"
                            />
                          </div>
                          <div className="group">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-blue-600 transition-colors">{t('quote_step_1_email')}</label>
                            <input 
                              type="email" 
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-lg placeholder-gray-400 dark:placeholder-gray-600"
                              placeholder="ornek@sirket.com"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: PROJE DETAYLARI */}
                    {currentStep === 1 && (
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">{t('quote_step_2_type_label')} *</label>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { id: 'residence', label: t('quote_step_2_type_residence'), icon: 'apartment' },
                              { id: 'mall', label: t('quote_step_2_type_mall'), icon: 'storefront' },
                              { id: 'plaza', label: t('quote_step_2_type_plaza'), icon: 'domain' },
                              { id: 'site', label: t('quote_step_2_type_site'), icon: 'location_city' }
                            ].map(pt => (
                              <button
                                key={pt.id}
                                onClick={() => setFormData({...formData, projectType: pt.id})}
                                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                                  formData.projectType === pt.id 
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-600/10 text-blue-700 dark:text-blue-400 shadow-md scale-[1.02]' 
                                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-white/10'
                                }`}
                              >
                                <span className="material-symbols-outlined text-3xl">{pt.icon}</span>
                                <span className="font-bold text-sm text-center">{pt.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-6 bg-gray-50 dark:bg-white/5 p-8 rounded-3xl border border-gray-200 dark:border-white/10">
                          <div className="flex justify-between items-end">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">{t('quote_step_2_unit_label')}</label>
                            <span className="text-3xl font-black text-blue-600">{formData.unitCount}</span>
                          </div>
                          <input 
                            type="range" 
                            min="10" 
                            max="2000" 
                            step="10"
                            value={formData.unitCount}
                            onChange={(e) => setFormData({...formData, unitCount: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="flex justify-between text-[10px] font-medium text-gray-400">
                            <span>10</span>
                            <span>2000+</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: İHTİYAÇ DUYULAN HİZMETLER */}
                    {currentStep === 2 && (
                      <div className="flex flex-col gap-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium -mt-4">{t('quote_step_3_desc')}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { id: 'full', label: t('quote_step_3_srv_full'), icon: 'all_inclusive', color: 'blue' },
                            { id: 'sec', label: t('quote_step_3_srv_sec'), icon: 'security', color: 'purple' },
                            { id: 'clean', label: t('quote_step_3_srv_clean'), icon: 'cleaning_services', color: 'emerald' },
                            { id: 'tech', label: t('quote_step_3_srv_tech'), icon: 'engineering', color: 'orange' },
                            { id: 'land', label: t('quote_step_3_srv_landscape'), icon: 'park', color: 'green' },
                            { id: 'pool', label: t('quote_step_3_srv_pool'), icon: 'pool', color: 'cyan' },
                          ].map(srv => {
                            const isSelected = formData.services.includes(srv.id);
                            return (
                              <button
                                key={srv.id}
                                onClick={() => toggleService(srv.id)}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                                  isSelected 
                                    ? `border-${srv.color}-500 bg-${srv.color}-50 dark:bg-${srv.color}-500/10 shadow-sm scale-[1.02]` 
                                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20'
                                }`}
                              >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? `bg-${srv.color}-500 text-white` : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'}`}>
                                  <span className="material-symbols-outlined">{srv.icon}</span>
                                </div>
                                <span className={`font-bold text-sm ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                  {srv.label}
                                </span>
                                {isSelected && (
                                  <span className={`material-symbols-outlined ml-auto text-${srv.color}-500`}>check_circle</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: ONAY & NOTLAR */}
                    {currentStep === 3 && (
                      <div className="flex flex-col gap-8">
                        <div className="group">
                          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-blue-600 transition-colors">{t('quote_step_4_notes')}</label>
                          <textarea 
                            rows={4}
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-base resize-none"
                            placeholder="..."
                          />
                        </div>

                        <label className="flex items-start gap-4 cursor-pointer group bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                          <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                            <input 
                              type="checkbox" 
                              className="peer sr-only"
                              checked={formData.kvkk}
                              onChange={(e) => setFormData({...formData, kvkk: e.target.checked})}
                            />
                            <div className="w-6 h-6 border-2 border-blue-400 rounded-lg peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center">
                              <span className="material-symbols-outlined text-white text-sm opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all">check</span>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-blue-900 dark:text-blue-200 leading-relaxed">
                            {t('quote_step_4_kvkk')}
                          </span>
                        </label>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-white/10">
                <button 
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 font-bold text-sm transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  {t('quote_prev_btn')}
                </button>
                
                <button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-105 hover:shadow-blue-600/50 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {currentStep === 3 ? t('quote_submit_btn') : t('quote_next_btn')}
                  <span className="material-symbols-outlined text-[18px]">
                    {currentStep === 3 ? 'send' : 'arrow_forward'}
                  </span>
                </button>
              </div>

            </div>
          ) : (
            // Success Screen
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xl mx-auto text-center flex flex-col items-center py-20"
            >
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/10">
                <span className="material-symbols-outlined text-5xl">task_alt</span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                {t('quote_success_title')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-12">
                {t('quote_success_desc')}
              </p>
              <Link 
                href="/" 
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">home</span>
                {t('quote_home_btn')}
              </Link>
            </motion.div>
          )}
          
        </div>
      </div>
    </div>
  );
}

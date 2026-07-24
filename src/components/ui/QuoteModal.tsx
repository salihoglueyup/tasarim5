"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface QuoteModalProps {
  onClose: () => void;
}

export default function QuoteModal({ onClose }: QuoteModalProps) {
  const { t } = useLanguage();

  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    projectType: '',
    unitCount: 150,
    location: '',
    services: [] as string[],
    notes: '',
    contactTime: 'any', // morning, afternoon, evening, any
    kvkk: false
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-12 font-sans">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white dark:bg-[#0b1c30] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-gray-100/80 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-white/70 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* LEFT SIDE: Visuals & Branding (Hidden on mobile, 40% on Desktop) */}
        <div className="hidden lg:flex w-[40%] bg-[var(--color-primary)] relative flex-col justify-between overflow-hidden p-12 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D3A] via-[#1f1f2a] to-[#14141d] z-0"></div>
          {/* Glow effect */}
          <div className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-white/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <div className="mt-8">
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
                className="text-slate-300 text-lg font-light leading-relaxed max-w-md"
              >
                {t('quote_hero_desc')}
              </motion.p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#1f1f2a] bg-slate-${400 + i*100} flex items-center justify-center overflow-hidden`}>
                  <span className="material-symbols-outlined text-sm text-white/80">person</span>
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="font-bold text-white">45.000+</div>
              <div className="text-slate-300 text-xs font-light">Bağımsız Bölüm Yönetimi</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive Form Area */}
        <div className="flex-1 flex flex-col relative bg-white dark:bg-[#0b1c30] w-full h-full overflow-y-auto custom-scrollbar">
          
          <div className="flex-1 flex flex-col justify-center p-6 md:p-10 lg:p-12 xl:p-16">
            
            {!isCompleted ? (
              <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
                
                {/* Stepper Header */}
                <div className="flex flex-col gap-2 mt-8 lg:mt-0">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-4">
                    <span>Adım {currentStep + 1} / 4</span>
                    <span className="text-[var(--color-primary)] dark:text-white text-right">{steps[currentStep].title}</span>
                  </div>
                  <div className="flex gap-2 w-full h-1.5">
                    {[0,1,2,3].map((step) => (
                      <div key={step} className="flex-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden relative">
                        {currentStep >= step && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-[var(--color-primary)] dark:bg-white rounded-full"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Steps */}
                <div className="min-h-[350px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6"
                    >
                      <h2 className="text-3xl font-extrabold text-[var(--color-primary)] dark:text-white mb-2 tracking-tight">
                        {steps[currentStep].title}
                      </h2>

                      {/* STEP 1: KİŞİSEL BİLGİLER */}
                      {currentStep === 0 && (
                        <div className="flex flex-col gap-4">
                          <div className="group">
                            <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-[var(--color-primary)] dark:group-focus-within:text-white transition-colors">{t('quote_step_1_name')} *</label>
                            <input 
                              type="text" 
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] dark:focus:ring-white/50 dark:focus:border-white transition-all font-medium placeholder-slate-400 dark:placeholder-gray-600"
                              placeholder="John Doe"
                              autoFocus
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group">
                              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-[var(--color-primary)] dark:group-focus-within:text-white transition-colors">{t('quote_step_1_phone')} *</label>
                              <input 
                                type="tel" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] dark:focus:ring-white/50 dark:focus:border-white transition-all font-medium placeholder-slate-400 dark:placeholder-gray-600"
                                placeholder="+90 5XX XXX XX XX"
                              />
                            </div>
                            <div className="group">
                              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-[var(--color-primary)] dark:group-focus-within:text-white transition-colors">{t('quote_step_1_email')}</label>
                              <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] dark:focus:ring-white/50 dark:focus:border-white transition-all font-medium placeholder-slate-400 dark:placeholder-gray-600"
                                placeholder="ornek@sirket.com"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group">
                              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-[var(--color-primary)] dark:group-focus-within:text-white transition-colors">{t('quote_step_1_company')}</label>
                              <input 
                                type="text" 
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] dark:focus:ring-white/50 dark:focus:border-white transition-all font-medium placeholder-slate-400 dark:placeholder-gray-600"
                                placeholder="Alo Yönetim Plaza"
                              />
                            </div>
                            <div className="group">
                              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-[var(--color-primary)] dark:group-focus-within:text-white transition-colors">{t('quote_step_1_role')}</label>
                              <input 
                                type="text" 
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] dark:focus:ring-white/50 dark:focus:border-white transition-all font-medium placeholder-slate-400 dark:placeholder-gray-600"
                                placeholder="Yönetim Kurulu Üyesi"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 2: PROJE DETAYLARI */}
                      {currentStep === 1 && (
                        <div className="flex flex-col gap-6">
                          
                          <div className="group">
                            <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-[var(--color-primary)] dark:group-focus-within:text-white transition-colors">{t('quote_step_2_location')}</label>
                            <input 
                              type="text" 
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] dark:focus:ring-white/50 dark:focus:border-white transition-all font-medium placeholder-slate-400 dark:placeholder-gray-600"
                              placeholder="Kadıköy / İstanbul"
                            />
                          </div>

                          <div className="flex flex-col gap-3">
                            <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block">{t('quote_step_2_type_label')} *</label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { id: 'residence', label: t('quote_step_2_type_residence'), icon: 'apartment' },
                                { id: 'mall', label: t('quote_step_2_type_mall'), icon: 'storefront' },
                                { id: 'plaza', label: t('quote_step_2_type_plaza'), icon: 'domain' },
                                { id: 'site', label: t('quote_step_2_type_site'), icon: 'location_city' }
                              ].map(pt => (
                                <button
                                  key={pt.id}
                                  onClick={() => setFormData({...formData, projectType: pt.id})}
                                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                    formData.projectType === pt.id 
                                      ? 'border-[var(--color-primary)] dark:border-white bg-slate-100 dark:bg-white/10 text-[var(--color-primary)] dark:text-white shadow-sm scale-[1.02]' 
                                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/20'
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-2xl">{pt.icon}</span>
                                  <span className="font-bold text-xs text-center">{pt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-5 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
                            <div className="flex justify-between items-end">
                              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block">{t('quote_step_2_unit_label')}</label>
                              <span className="text-2xl font-black text-[var(--color-primary)] dark:text-white">{formData.unitCount}</span>
                            </div>
                            <input 
                              type="range" 
                              min="10" 
                              max="2000" 
                              step="10"
                              value={formData.unitCount}
                              onChange={(e) => setFormData({...formData, unitCount: parseInt(e.target.value)})}
                              className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)] dark:accent-white"
                            />
                            <div className="flex justify-between text-[10px] font-medium text-slate-400">
                              <span>10</span>
                              <span>2000+</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 3: İHTİYAÇ DUYULAN HİZMETLER */}
                      {currentStep === 2 && (
                        <div className="flex flex-col gap-4">
                          <p className="text-sm text-slate-500 dark:text-gray-400 font-medium -mt-2">{t('quote_step_3_desc')}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { id: 'full', label: t('quote_step_3_srv_full'), icon: 'all_inclusive' },
                              { id: 'sec', label: t('quote_step_3_srv_sec'), icon: 'security' },
                              { id: 'clean', label: t('quote_step_3_srv_clean'), icon: 'cleaning_services' },
                              { id: 'tech', label: t('quote_step_3_srv_tech'), icon: 'engineering' },
                              { id: 'land', label: t('quote_step_3_srv_landscape'), icon: 'park' },
                              { id: 'pool', label: t('quote_step_3_srv_pool'), icon: 'pool' },
                            ].map(srv => {
                              const isSelected = formData.services.includes(srv.id);
                              return (
                                <button
                                  key={srv.id}
                                  onClick={() => toggleService(srv.id)}
                                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                                    isSelected 
                                      ? `border-[var(--color-primary)] dark:border-white bg-slate-50 dark:bg-white/10 shadow-sm scale-[1.02]` 
                                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                                  }`}
                                >
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? `bg-[var(--color-primary)] dark:bg-white text-white dark:text-slate-900` : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-gray-400'}`}>
                                    <span className="material-symbols-outlined text-[20px]">{srv.icon}</span>
                                  </div>
                                  <span className={`font-bold text-xs ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-gray-300'}`}>
                                    {srv.label}
                                  </span>
                                  {isSelected && (
                                    <span className={`material-symbols-outlined ml-auto text-[18px] text-[var(--color-primary)] dark:text-white`}>check_circle</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* STEP 4: ONAY & NOTLAR */}
                      {currentStep === 3 && (
                        <div className="flex flex-col gap-6">
                          <div className="group">
                            <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-[var(--color-primary)] dark:group-focus-within:text-white transition-colors">{t('quote_step_4_contact_time')}</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {[
                                { id: 'morning', label: t('quote_step_4_time_morning') },
                                { id: 'afternoon', label: t('quote_step_4_time_afternoon') },
                                { id: 'evening', label: t('quote_step_4_time_evening') }
                              ].map(time => (
                                <button
                                  key={time.id}
                                  onClick={() => setFormData({...formData, contactTime: time.id})}
                                  className={`p-3 rounded-xl border transition-all text-xs font-bold ${
                                    formData.contactTime === time.id
                                      ? 'border-[var(--color-primary)] dark:border-white bg-[var(--color-primary)] dark:bg-white text-white dark:text-slate-900'
                                      : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:border-slate-300'
                                  }`}
                                >
                                  {time.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="group">
                            <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-[var(--color-primary)] dark:group-focus-within:text-white transition-colors">{t('quote_step_4_notes')}</label>
                            <textarea 
                              rows={3}
                              value={formData.notes}
                              onChange={(e) => setFormData({...formData, notes: e.target.value})}
                              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] dark:focus:ring-white/50 dark:focus:border-white transition-all font-medium text-sm resize-none"
                              placeholder="..."
                            />
                          </div>

                          <label className="flex items-start gap-4 cursor-pointer group bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                              <input 
                                type="checkbox" 
                                className="peer sr-only"
                                checked={formData.kvkk}
                                onChange={(e) => setFormData({...formData, kvkk: e.target.checked})}
                              />
                              <div className="w-5 h-5 border-2 border-slate-400 dark:border-gray-500 rounded-md peer-checked:bg-[var(--color-primary)] peer-checked:border-[var(--color-primary)] dark:peer-checked:bg-white dark:peer-checked:border-white transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-white dark:text-slate-900 text-[12px] opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all">check</span>
                              </div>
                            </div>
                            <span className="text-xs font-medium text-slate-700 dark:text-gray-300 leading-relaxed">
                              {t('quote_step_4_kvkk')}
                            </span>
                          </label>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 mt-auto border-t border-slate-100 dark:border-white/10">
                  <button 
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 font-bold text-sm transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-[var(--color-primary)] dark:text-gray-400 dark:hover:text-white'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    {t('quote_prev_btn')}
                  </button>
                  
                  <button 
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-[var(--color-primary)] dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[var(--color-primary)]/20 dark:shadow-white/10 hover:scale-105 hover:shadow-[var(--color-primary)]/40 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center gap-2"
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
                className="w-full max-w-lg mx-auto text-center flex flex-col items-center py-16"
              >
                <div className="w-20 h-20 bg-slate-100 dark:bg-white/10 text-[var(--color-primary)] dark:text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <span className="material-symbols-outlined text-4xl">task_alt</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {t('quote_success_title')}
                </h1>
                <p className="text-base text-slate-600 dark:text-gray-400 font-light leading-relaxed mb-10">
                  {t('quote_success_desc')}
                </p>
                <button 
                  onClick={onClose}
                  className="bg-[var(--color-primary)] dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  {t('quote_home_btn')}
                </button>
              </motion.div>
            )}
            
          </div>
        </div>
      </motion.div>
    </div>
  );
}

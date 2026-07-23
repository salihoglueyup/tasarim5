"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<'sakin' | 'yonetici'>('sakin');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 font-sans">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-full text-slate-500 dark:text-gray-300 transition-colors z-20"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Header Content */}
            <div className="pt-10 pb-6 px-8 text-center border-b border-slate-100 dark:border-white/5">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-blue-500/20">
                <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">
                  {activeTab === 'sakin' ? 'vpn_key' : 'admin_panel_settings'}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">Sisteme Giriş</h2>
              <p className="text-sm text-slate-500 dark:text-gray-400 mt-2 font-light">
                {activeTab === 'sakin' ? 'Aidat ve borç sorgulama portalı' : 'Sistem yöneticileri için operasyon portalı'}
              </p>
            </div>

            {/* Content Area */}
            <div className="p-8">
              
              {/* Tab Switcher */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-2xl mb-8 relative">
                <div 
                  className="absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-xl shadow-sm transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(${activeTab === 'sakin' ? '4px' : 'calc(100% + 4px)'})` }}
                />
                <button 
                  onClick={() => setActiveTab('sakin')}
                  className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${activeTab === 'sakin' ? 'text-blue-600 dark:text-white' : 'text-slate-500 dark:text-gray-400'}`}
                >
                  Sakin Girişi
                </button>
                <button 
                  onClick={() => setActiveTab('yonetici')}
                  className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${activeTab === 'yonetici' ? 'text-blue-600 dark:text-white' : 'text-slate-500 dark:text-gray-400'}`}
                >
                  Yönetici Portalı
                </button>
              </div>

              {/* Form Forms */}
              <AnimatePresence mode="wait">
                <motion.form 
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === 'sakin' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === 'sakin' ? 10 : -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4"
                  onSubmit={(e) => { e.preventDefault(); alert("Bu bir UI simülasyonudur. Gerçek entegrasyon CRM sisteminize bağlanarak yapılacaktır."); onClose(); }}
                >
                  
                  {activeTab === 'sakin' ? (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-widest pl-1">TC Kimlik / Telefon</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">person</span>
                          <input 
                            type="text" 
                            required
                            placeholder="Örn: 532 123 45 67" 
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between pl-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-widest">Sakin Şifresi</label>
                          <a href="#" className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">Şifremi Unuttum?</a>
                        </div>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                          <input 
                            type="password" 
                            required
                            placeholder="••••••••" 
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-widest pl-1">Yönetici Kodu</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">badge</span>
                          <input 
                            type="text" 
                            required
                            placeholder="Personel veya Yönetici Kodu" 
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-widest pl-1">Giriş Anahtarı (Şifre)</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">key</span>
                          <input 
                            type="password" 
                            required
                            placeholder="••••••••" 
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-600/25 transition-all mt-4 flex items-center justify-center gap-2"
                  >
                    Sisteme Giriş Yap
                    <span className="material-symbols-outlined text-lg">login</span>
                  </button>

                </motion.form>
              </AnimatePresence>
            </div>

            {/* Footer Area */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 text-center text-xs text-slate-500 dark:text-gray-400 font-light border-t border-slate-100 dark:border-white/5">
              <span className="flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">shield_lock</span>
                256-bit SSL ile güvenli bağlantı.
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

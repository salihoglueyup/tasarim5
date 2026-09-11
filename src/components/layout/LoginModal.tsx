"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import ApsiyonLogo from '@/components/ui/ApsiyonLogo';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'sakin' | 'yonetici'>('sakin');
  const [mounted, setMounted] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.cancelAnimationFrame(id);
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
            aria-hidden="true"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container with Focus Trap */}
          <motion.div 
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 z-10"
          >
            {/* Close Button */}
            <button 
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-full text-slate-500 dark:text-gray-300 transition-colors z-20 cursor-pointer"
              aria-label="Kapat"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">close</span>
            </button>

            {/* Header Content */}
            <div className="pt-8 pb-5 px-6 sm:px-8 text-center border-b border-slate-100 dark:border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A5DF]/10 border border-[#00A5DF]/20 text-[#00A5DF] text-xs font-bold mb-3">
                <ApsiyonLogo variant="icon" width={14} height={14} fillColor="#00A5DF" />
                <span>Apsiyon Altyapısı Güvencesiyle</span>
              </div>
              <h2 id="login-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('login_title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal max-w-sm mx-auto">
                {activeTab === 'sakin'
                  ? 'Alo Yönetim sakinleri ve kat malikleri için online aidat, arıza ve yönetim portalı'
                  : 'Site yönetim ve denetim kurulları için 7/24 şeffaf finans ve operasyon paneli'}
              </p>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8">
              
              {/* Tab Switcher */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800/60 rounded-2xl mb-6 relative">
                <div 
                  className="absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-xl shadow-sm transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(${activeTab === 'sakin' ? '4px' : 'calc(100% + 4px)'})` }}
                />
                <button 
                  type="button"
                  onClick={() => setActiveTab('sakin')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold z-10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'sakin' ? 'text-[#00A5DF] dark:text-[#00A5DF]' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">person</span>
                  <span>Sakin Girişi</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveTab('yonetici')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold z-10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'yonetici' ? 'text-[#FF9503] dark:text-[#FF9503]' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">admin_panel_settings</span>
                  <span>Yönetici Portalı</span>
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'sakin' ? (
                  <motion.div
                    key="sakin"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-4"
                  >
                    {/* 1. Birincil Doğrudan Web Girişi */}
                    <a
                      href="https://online.apsiyon.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-5 bg-gradient-to-r from-[#00A5DF] to-[#088DC0] hover:from-[#0092C7] hover:to-[#077BA8] text-white font-bold rounded-2xl shadow-lg shadow-[#00A5DF]/25 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-2xl" aria-hidden="true">open_in_browser</span>
                        </div>
                        <div className="text-left">
                          <div className="text-sm sm:text-base font-extrabold">Apsiyon Web Portalı Girişi</div>
                          <div className="text-xs text-white/80 font-normal">online.apsiyon.com üzerinden giriş</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
                    </a>

                    {/* Ayraç */}
                    <div className="relative my-1 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-white/10" />
                      </div>
                      <span className="relative bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        veya mobil uygulamayı indirin
                      </span>
                    </div>

                    {/* Mobil Mağazalar */}
                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href="https://apps.apple.com/app/apsiyon/id1115852575"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-white/10 transition-colors group cursor-pointer text-center"
                      >
                        <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white mb-1 group-hover:scale-110 transition-transform" aria-hidden="true">phone_iphone</span>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">App Store</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">iOS İndir</span>
                      </a>

                      <a
                        href="https://play.google.com/store/apps/details?id=com.apsiyon.mobile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-white/10 transition-colors group cursor-pointer text-center"
                      >
                        <span className="material-symbols-outlined text-2xl text-emerald-600 dark:text-emerald-400 mb-1 group-hover:scale-110 transition-transform" aria-hidden="true">android</span>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">Google Play</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Android İndir</span>
                      </a>

                      <a
                        href="https://appgallery.huawei.com/app/C100486001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-white/10 transition-colors group cursor-pointer text-center"
                      >
                        <span className="material-symbols-outlined text-2xl text-rose-500 mb-1 group-hover:scale-110 transition-transform" aria-hidden="true">shop</span>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">AppGallery</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Huawei İndir</span>
                      </a>
                    </div>

                    {/* Bilgilendirme Notu */}
                    <div className="p-3.5 rounded-2xl bg-[#00A5DF]/5 border border-[#00A5DF]/15 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5 mt-1">
                      <span className="material-symbols-outlined text-base text-[#00A5DF] shrink-0 mt-0.5" aria-hidden="true">info</span>
                      <span>
                        İlk kez giriş yapıyorsanız yönetim sistemimizde kayıtlı cep telefonunuzla SMS kodu alarak anında şifrenizi oluşturabilirsiniz.
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="yonetici"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-4"
                  >
                    {/* 1. Birincil Yönetici Web Girişi */}
                    <a
                      href="https://online.apsiyon.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-5 bg-gradient-to-r from-[#FF9503] to-[#EA580C] hover:from-[#F08B00] hover:to-[#DD5209] text-white font-bold rounded-2xl shadow-lg shadow-[#FF9503]/25 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-2xl" aria-hidden="true">dashboard</span>
                        </div>
                        <div className="text-left">
                          <div className="text-sm sm:text-base font-extrabold">Apsiyon Manager Web Paneli</div>
                          <div className="text-xs text-white/80 font-normal">Yönetim & Denetim Kurulu Girişi</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
                    </a>

                    {/* Ayraç */}
                    <div className="relative my-1 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-white/10" />
                      </div>
                      <span className="relative bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        veya yönetici uygulamasını indirin
                      </span>
                    </div>

                    {/* Mobil Yönetici Mağazaları */}
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="https://apps.apple.com/app/apsiyon-manager/id1453210408"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-white/10 transition-colors group cursor-pointer text-center"
                      >
                        <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white mb-1 group-hover:scale-110 transition-transform" aria-hidden="true">phone_iphone</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">Manager iOS</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">App Store</span>
                      </a>

                      <a
                        href="https://play.google.com/store/apps/details?id=com.apsiyon.manager"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-white/10 transition-colors group cursor-pointer text-center"
                      >
                        <span className="material-symbols-outlined text-2xl text-emerald-600 dark:text-emerald-400 mb-1 group-hover:scale-110 transition-transform" aria-hidden="true">android</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">Manager Android</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">Google Play</span>
                      </a>
                    </div>

                    {/* Bilgilendirme Notu */}
                    <div className="p-3.5 rounded-2xl bg-[#FF9503]/5 border border-[#FF9503]/15 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5 mt-1">
                      <span className="material-symbols-outlined text-base text-[#FF9503] shrink-0 mt-0.5" aria-hidden="true">verified_user</span>
                      <span>
                        Yetkili yönetim ve denetim kurulu üyeleri Alo Yönetim tarafından tanımlanan kurumsal kimlik bilgileriyle anlık mutabakat ve denetim yapabilir.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Portal Tanıtım Sayfası Kısayolu */}
              <div className="mt-5 text-center">
                <Link
                  href="/app"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A5DF] hover:underline"
                >
                  <span>Mobil portal özellikleri ve rehberi inceleyin</span>
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Footer Area */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 text-center text-xs text-slate-500 dark:text-gray-400 font-light border-t border-slate-100 dark:border-white/5">
              <span className="flex items-center justify-center gap-1.5 text-[11px]">
                <span className="material-symbols-outlined text-sm text-emerald-600 dark:text-emerald-400" aria-hidden="true">shield</span>
                <span>256-Bit SSL ve KVKK güvencesiyle Apsiyon altyapısı</span>
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortalModal({ isOpen, onClose }: PortalModalProps) {
  const { t } = useLanguage();
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[var(--color-surface)] rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-[var(--color-outline)]/60 overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">close</span>
            </button>

            <div className="flex flex-col gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">domain</span>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3 border border-blue-500/20">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">verified_user</span>
                  <span>Apsiyon Altyapısı Güvencesiyle</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('portal_title')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Alo Yönetim sakinleri ve kat malikleri aidat ödemelerini, arıza takiplerini ve site kararlarını 7/24 Apsiyon platformu üzerinden güvenle yönetir.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <a 
                  href="https://online.apsiyon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-3 text-center group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform" aria-hidden="true">open_in_new</span>
                  <span>Apsiyon Web Sakin Portalı ile Giriş Yap</span>
                </a>

                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[var(--color-primary)]">
                    <span className="material-symbols-outlined text-sm text-amber-500" aria-hidden="true">info</span>
                    <span>İlk Giriş & Şifre Yardımı</span>
                  </div>
                  <p className="leading-relaxed text-slate-500 dark:text-slate-400">
                    Sistem şifreniz site yönetiminize kayıtlı cep telefonunuza SMS ile iletilir. Şifrenizi bilmiyorsanız giriş ekranında <strong>&ldquo;Şifremi Unuttum&rdquo;</strong> seçeneğiyle anında yeni şifre oluşturabilirsiniz.
                  </p>
                </div>
              </div>

              {/* Mobile Apps Section */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col gap-3">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Mobil Cihazınızda 7/24 Kullanın:</span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://apps.apple.com/app/apsiyon/id1115852575"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">phone_iphone</span>
                    <span>App Store</span>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.apsiyon.mobile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-emerald-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">android</span>
                    <span>Google Play</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

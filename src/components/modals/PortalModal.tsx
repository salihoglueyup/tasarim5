"use client";

import { motion, AnimatePresence } from 'framer-motion';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortalModal({ isOpen, onClose }: PortalModalProps) {
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
            className="relative w-full max-w-lg bg-white dark:bg-[#122338] rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex flex-col gap-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">domain</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sakin & Yönetici Portalı</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sitenizin aidat ödemelerini, harcama bilançolarını ve arıza bildirimlerini yönetmek için giriş yapın.
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">T.C. Kimlik veya Daire No</label>
                  <input 
                    type="text" 
                    placeholder="12345678901"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Şifre</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transition-opacity mt-2"
                >
                  Portala Giriş Yap
                </button>
              </form>

              <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>Mobil Uygulamamız Hazır</span>
                <div className="flex gap-2">
                  <span className="font-semibold text-blue-500">App Store</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-500">Google Play</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

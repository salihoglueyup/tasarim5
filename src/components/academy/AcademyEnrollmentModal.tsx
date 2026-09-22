"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';

interface AcademyEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseName?: string;
}

const COURSE_OPTIONS = [
  "5188 Sayılı Kanun Kapsamında Temel Güvenlik Eğitimi",
  "Site Yöneticiliği ve Kriz Yönetimi Semineri",
  "Silahlı Özel Güvenlik Temel Eğitimi (120 Saat)",
  "Silahsız Özel Güvenlik Temel Eğitimi (100 Saat)",
  "5 Yılda Bir Zorunlu Yenileme Eğitimi (60 Saat)",
  "CCTV Kamera & Güvenlik Otomasyonu Uzmanlığı",
  "Yangın, Afet & Tahliye Kriz Yönetimi Sertifikasyonu"
];

export default function AcademyEnrollmentModal({
  isOpen,
  onClose,
  defaultCourseName = ""
}: AcademyEnrollmentModalProps) {
  const { status, errorKey, submit, reset } = useLeadSubmit();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(defaultCourseName || COURSE_OPTIONS[0]);
  const [notes, setNotes] = useState('');
  const [kvkk, setKvkk] = useState(false);

  useEffect(() => {
    if (defaultCourseName) {
      setSelectedCourse(defaultCourseName);
    }
  }, [defaultCourseName]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !kvkk) return;

    const ok = await submit({
      type: 'quote',
      name,
      phone,
      email: email || undefined,
      subject: `Güvenlik Akademisi Ön Kayıt — ${selectedCourse}`,
      message: `Eğitim: ${selectedCourse}. Notlar: ${notes || 'Yok'}`,
      meta: {
        egitim: selectedCourse,
        notlar: notes,
        kaynak: 'guvenlik-akademisi-on-kayit-modal',
        kvkk: true
      }
    });

    if (ok) {
      // 3 saniye sonra otomatik sıfırla veya açık bırak
    }
  };

  const handleClose = () => {
    reset();
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setKvkk(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 font-sans">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden="true"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="academy-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 z-10 p-6 sm:p-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Kapat"
              className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-full text-slate-500 dark:text-gray-300 transition-colors cursor-pointer z-20"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">close</span>
            </button>

            {status !== 'success' ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">school</span>
                    <span>Akademi Ön Başvuru</span>
                  </div>
                  <h2 id="academy-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Eğitime Ön Kayıt Yaptırın
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-normal">
                    Formu doldurun; eğitim koordinatörümüz sınav takvimi, kontenjan ve ders programı için sizinle hemen iletişime geçsin.
                  </p>
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-600 dark:text-rose-400 text-center">
                    {errorKey || 'Bir hata oluştu. Lütfen tekrar deneyiniz.'}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Adınız & Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Örn: Mehmet Öz"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        E-Posta Adresiniz
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@mail.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Başvurulan Eğitim Programı *
                    </label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                    >
                      {COURSE_OPTIONS.map((c) => (
                        <option key={c} value={c} className="dark:bg-slate-900 text-slate-900 dark:text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Ek Açıklama veya Sorularınız
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Mevcut kimlik kartı durumunuz, vardiya tercihiniz vb."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={kvkk}
                      onChange={(e) => setKvkk(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500"
                    />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      Kişisel verilerimin akademi ön kayıt ve iletişim süreçleri kapsamında işlenmesine dair aydınlatma metnini okudum, kabul ediyorum.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === 'loading' || !kvkk}
                    className="w-full mt-3 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Kaydınız Alınıyor...</span>
                      </>
                    ) : (
                      <>
                        <span>Ön Kaydı Tamamla</span>
                        <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/25 mb-4 text-3xl font-black">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                  Ön Kaydınız Alındı!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mb-6 leading-relaxed">
                  Sayın <strong>{name}</strong>, <strong>{selectedCourse}</strong> programı için talebiniz eğitim koordinatörlüğümüze ulaştı. <strong>{phone}</strong> numaranız üzerinden en kısa sürede bilgilendirme yapılacaktır.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Tamam
                </button>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

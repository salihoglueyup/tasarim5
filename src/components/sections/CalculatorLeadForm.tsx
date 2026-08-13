"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';

interface CalculatorLeadFormProps {
  serviceName: string;
  calcDetails: Record<string, any>;
  buttonText?: string;
}

export default function CalculatorLeadForm({ serviceName, calcDetails, buttonText }: CalculatorLeadFormProps) {
  const { t } = useLanguage();
  const { submit, status, errorKey } = useLeadSubmit();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const lead = {
      type: 'quote' as const,
      name,
      phone,
      subject: `${serviceName} - Hesaplama Sonucu`,
      message: `Kullanıcı hesaplama aracını kullandı.`,
      meta: calcDetails,
    };

    const success = await submit(lead, honeypot);
    if (success) {
      setTimeout(() => setIsOpen(false), 3000);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-slate-200 hover:bg-white text-slate-950 font-bold py-4 px-6 rounded-xl transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-white/10"
      >
        {buttonText || t('calc_btn_free_discovery')}
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    );
  }

  if (status === 'success') {
    return (
      <div className="w-full bg-emerald-500/20 text-emerald-300 font-bold py-4 px-6 rounded-xl text-center flex flex-col items-center gap-2">
        <span className="material-symbols-outlined text-3xl">check_circle</span>
        Talebiniz Alındı!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white/10 p-4 rounded-xl flex flex-col gap-3 backdrop-blur-md border border-white/20">
      <input 
        type="text" 
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <input
        type="text"
        placeholder="Adınız Soyadınız"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-slate-400"
        required
      />
      <input
        type="tel"
        placeholder="Telefon Numaranız"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-slate-400"
        required
      />

      {errorKey && (
        <div className="text-red-400 text-xs text-center">{t(errorKey as any) || 'Bir hata oluştu.'}</div>
      )}

      <div className="flex gap-2 mt-2">
        <button 
          type="button" 
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-transparent text-white/70 border border-white/20 py-3 rounded-lg text-sm hover:bg-white/5 transition-colors"
        >
          İptal
        </button>
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="flex-[2] bg-slate-200 text-slate-950 font-bold py-3 rounded-lg text-sm hover:bg-white transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </div>
    </form>
  );
}

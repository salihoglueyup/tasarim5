'use client';
import { useState } from 'react';
import { markLeadAsRead } from '@/app/actions/lead-actions';

export default function MarkReadButton({ id, lang, isRead }: { id: string, lang: string, isRead: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const res = await markLeadAsRead(id, !isRead, lang);
    if (res?.error) {
      alert(res.error);
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-all disabled:opacity-50 ${
        isRead 
          ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 dark:hover:bg-emerald-500/20' 
          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:bg-white/10'
      }`}
      title={isRead ? "Okunmadı Olarak İşaretle" : "Okundu Olarak İşaretle"}
    >
      <span className="material-symbols-outlined text-sm">
        {isRead ? 'mark_email_read' : 'mail'}
      </span>
    </button>
  );
}

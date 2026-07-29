'use client';
import { useState } from 'react';
import { deleteLead } from '@/app/actions/lead-actions';

export default function DeleteLeadButton({ id, lang, name }: { id: string, lang: string, name: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`"${name}" adlı kişiden gelen mesajı silmek istediğinize emin misiniz?`)) return;
    
    setLoading(true);
    const res = await deleteLead(id, lang);
    if (res?.error) {
      alert(res.error);
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 border border-transparent transition-all text-xs disabled:opacity-50"
      title="Sil"
    >
      {loading ? 'Siliniyor...' : 'Sil'}
    </button>
  );
}

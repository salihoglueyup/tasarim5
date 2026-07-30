'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteSectoralSolution } from '@/app/actions/sectoral-actions';

export default function DeleteSectoralButton({ id, lang, title }: { id: string; lang: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`"${title}" çözümünü silmek istediğinize emin misiniz?`)) return;
    
    setLoading(true);
    const res = await deleteSectoralSolution(id);
    if (!res.success) {
      alert(res.error);
      setLoading(false);
    } else {
      router.refresh();
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all text-xs disabled:opacity-50"
    >
      {loading ? 'Siliniyor...' : 'Sil'}
    </button>
  );
}

'use client';

import { useState } from 'react';
import { deleteCategory } from '@/app/actions/category-actions';

export default function DeleteCategoryButton({ id, lang, title }: { id: string; lang: string; title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`"${title}" kategorisini silmek istediğinize emin misiniz?`)) {
      setIsDeleting(true);
      const res = await deleteCategory(id, lang);
      
      if (res.error) {
        alert(res.error);
        setIsDeleting(false);
      }
      // Başarılıysa sayfa revalidate olacağı için yenilenecektir.
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-transparent hover:border-red-500/30 transition-all text-xs disabled:opacity-50"
    >
      {isDeleting ? 'Siliniyor...' : 'Sil'}
    </button>
  );
}

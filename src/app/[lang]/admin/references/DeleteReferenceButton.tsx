'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteReference } from '@/app/actions/reference-actions';

export default function DeleteReferenceButton({ id, lang, title }: { id: string, lang: string, title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`"${title}" adlı referansı silmek istediğinize emin misiniz?`)) {
      setIsDeleting(true);
      const res = await deleteReference(id);
      
      if (res.success) {
        router.refresh();
      } else {
        alert('Silme sırasında hata oluştu: ' + res.error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 border border-transparent hover:border-red-200 dark:hover:border-red-500/20 transition-all text-xs disabled:opacity-50"
    >
      {isDeleting ? 'Siliniyor...' : 'Sil'}
    </button>
  );
}

'use client';

import { useState } from 'react';
import { deletePost } from '@/app/actions/post-actions';

export default function DeletePostButton({ id, lang, title }: { id: string, lang: string, title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`"${title}" başlıklı yazıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) {
      setIsDeleting(true);
      await deletePost(id, lang);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all text-xs disabled:opacity-50"
    >
      {isDeleting ? 'Siliniyor...' : 'Sil'}
    </button>
  );
}

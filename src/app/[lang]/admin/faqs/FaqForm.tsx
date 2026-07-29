'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveFaq, deleteFaq } from '@/app/actions/faq-actions';
import TiptapEditor from '@/components/admin/TiptapEditor';

export default function FaqForm({ 
  faq, 
  existingCategories 
}: { 
  faq: any,
  existingCategories: string[]
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [question, setQuestion] = useState(faq?.question || '');
  const [answer, setAnswer] = useState(faq?.answer || '');
  const [category, setCategory] = useState(faq?.category || (existingCategories[0] || 'Genel'));
  const [customCategory, setCustomCategory] = useState('');
  const [order, setOrder] = useState(faq?.order || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const finalCategory = customCategory.trim() !== '' ? customCategory : category;

    const res = await saveFaq({
      id: faq?.id,
      question,
      answer,
      category: finalCategory,
      order: Number(order)
    });

    setIsSaving(false);
    if (res.success) {
      router.push('/admin/faqs');
      router.refresh();
    } else {
      alert('Kaydedilirken hata oluştu: ' + res.error);
    }
  };

  const handleDelete = async () => {
    if (!faq?.id) return;
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return;
    
    setIsDeleting(true);
    const res = await deleteFaq(faq.id);
    setIsDeleting(false);
    
    if (res.success) {
      router.push('/admin/faqs');
      router.refresh();
    } else {
      alert('Silinirken hata oluştu: ' + res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-white/10">
      
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Soru</label>
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          required
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
          placeholder="Örn: Aidat ödemelerini nasıl yapabilirim?"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
          <select 
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (e.target.value !== 'custom') setCustomCategory('');
            }}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
          >
            {existingCategories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="custom">+ Yeni Kategori Ekle</option>
          </select>
          {category === 'custom' && (
            <input 
              type="text" 
              value={customCategory} 
              onChange={(e) => setCustomCategory(e.target.value)} 
              required
              className="mt-2 w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
              placeholder="Yeni kategori adı"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sıra (Order)</label>
          <input 
            type="number" 
            value={order} 
            onChange={(e) => setOrder(Number(e.target.value))} 
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cevap</label>
        <div className="border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden">
          <TiptapEditor content={answer} onChange={setAnswer} />
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-white/10">
        <button 
          type="button" 
          onClick={() => router.push('/admin/faqs')}
          className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
        >
          İptal
        </button>
        <div className="flex gap-4">
          {faq?.id && (
            <button 
              type="button" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg font-medium transition-colors"
            >
              {isDeleting ? 'Siliniyor...' : 'Sil'}
            </button>
          )}
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

    </form>
  );
}

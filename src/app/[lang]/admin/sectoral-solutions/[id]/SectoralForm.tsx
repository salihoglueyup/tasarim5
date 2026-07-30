'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveSectoralSolution } from '@/app/actions/sectoral-actions';

export default function SectoralForm({ solution, lang, isNew }: any) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: solution?.title || '',
    slug: solution?.slug || '',
    description: solution?.description || '',
    icon: solution?.icon || 'apartment',
    kpiTag: solution?.kpiTag || '+150 Konut',
    features: solution?.features || '[]',
    published: solution?.published ?? true,
    order: solution?.order || 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           
      .replace(/[^\w\-]+/g, '')       
      .replace(/\-\-+/g, '-')         
      .replace(/^-+/, '')             
      .replace(/-+$/, '');            
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await saveSectoralSolution(isNew ? 'new' : solution.id.toString(), formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(`/${lang}/admin/sectoral-solutions`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2">Başlık</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3"
              placeholder="Örn: Rezidans Yönetimi"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2">URL Slug</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={e => setFormData({...formData, slug: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2">Kısa Açıklama</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">İkon (Material Symbols)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={e => setFormData({...formData, icon: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3"
              placeholder="Örn: apartment"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">KPI Etiketi</label>
            <input
              type="text"
              value={formData.kpiTag}
              onChange={e => setFormData({...formData, kpiTag: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3"
              placeholder="Örn: +150 Konut"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sıralama</label>
            <input
              type="number"
              value={formData.order}
              onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2">Özellikler (JSON Array formatında ["özellik1", "özellik2"])</label>
            <textarea
              rows={4}
              value={formData.features}
              onChange={e => setFormData({...formData, features: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 font-mono text-sm"
              placeholder='["7/24 Güvenlik", "Teknik Servis"]'
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
            <div>
              <h3 className="font-bold text-sm">Yayında</h3>
              <p className="text-xs text-slate-500">Site üzerinde gösterilsin mi?</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={e => setFormData({...formData, published: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl disabled:opacity-50"
        >
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}

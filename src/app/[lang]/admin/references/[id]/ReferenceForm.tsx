'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveReference } from '@/app/actions/reference-actions';

export default function ReferenceForm({ reference, lang, isNew }: any) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: reference?.title || '',
    slug: reference?.slug || '',
    category: reference?.category || 'Konut',
    location: reference?.location || '',
    units: reference?.units || '',
    image: reference?.image || '',
    published: reference?.published ?? true,
    order: reference?.order || 0,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        alert(result.error || 'Dosya yüklenemedi.');
      }
    } catch (err) {
      console.error(err);
      alert('Yükleme sırasında hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await saveReference(isNew ? 'new' : reference.id.toString(), formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(`/${lang}/admin/references`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6 shadow-sm dark:shadow-none">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Proje Adı</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              placeholder="Örn: Lalezar Konakları"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">URL Adresi (Slug)</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={e => setFormData({...formData, slug: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Kategori</label>
            <select
              required
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all [&>option]:bg-white dark:[&>option]:bg-[#0B0F19]"
            >
              <option value="Konut">Konut</option>
              <option value="Rezidans">Rezidans</option>
              <option value="Ticari">Ticari</option>
              <option value="Karma">Karma</option>
              <option value="Sanayi">Sanayi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Konum (Şehir/İlçe)</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              placeholder="Örn: Kadıköy, İstanbul"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Bağımsız Bölüm Sayısı</label>
            <input
              type="text"
              required
              value={formData.units}
              onChange={e => setFormData({...formData, units: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              placeholder="Örn: 240 Daire, 12 Dükkan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Sıralama</label>
            <input
              type="number"
              value={formData.order}
              onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Proje Görseli</label>
            <div className="space-y-3">
              <label className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                <span className="text-sm text-slate-500 dark:text-gray-400">
                  {uploading ? 'Yükleniyor...' : '📁 Bilgisayardan Seç / Yükle'}
                </span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 dark:text-gray-500 whitespace-nowrap">veya URL girin:</span>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  placeholder="https://..."
                  className="flex-1 bg-transparent border-b border-slate-300 dark:border-white/10 px-2 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>
            
            {formData.image && (
              <div className="mt-4 relative aspect-video w-full sm:w-1/2 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 group bg-slate-50 dark:bg-white/5">
                <img src={formData.image} alt="Proje" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, image: ''})}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={e => setFormData({...formData, published: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
            <span className="ms-3 text-sm font-medium text-slate-700 dark:text-gray-300">
              {formData.published ? 'Yayında' : 'Taslak'}
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-brand-500 text-white font-medium rounded-xl px-8 py-3 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-[#0B0F19] transition-all disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Referansı Kaydet'}
          </button>
        </div>
      </div>
    </form>
  );
}

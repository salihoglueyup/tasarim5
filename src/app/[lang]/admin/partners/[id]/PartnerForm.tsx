'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { savePartner } from '@/app/actions/partner-actions';

export default function PartnerForm({ partner, lang, isNew }: any) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    logo: partner?.logo || '',
    order: partner?.order || 0,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData(prev => ({ ...prev, logo: result.url }));
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

    const res = await savePartner(isNew ? 'new' : partner.id.toString(), formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(`/${lang}/admin/partners`);
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
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Firma Adı</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            placeholder="İş ortağı veya firma adını girin..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Firma Logosu (Opsiyonel)</label>
          <div className="space-y-3">
            <label className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <span className="text-sm text-slate-500 dark:text-gray-400">
                {uploading ? 'Yükleniyor...' : '📁 Bilgisayardan Seç / Yükle'}
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={uploading} />
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 dark:text-gray-500 whitespace-nowrap">veya URL girin:</span>
              <input
                type="text"
                value={formData.logo}
                onChange={e => setFormData({...formData, logo: e.target.value})}
                placeholder="https://..."
                className="flex-1 bg-transparent border-b border-slate-300 dark:border-white/10 px-2 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>
          
          {formData.logo && (
            <div className="mt-4 relative h-24 w-48 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 group bg-slate-50 dark:bg-white/5 p-2 flex items-center justify-center">
              <img src={formData.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
              <button 
                type="button"
                onClick={() => setFormData({...formData, logo: ''})}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Sıralama (Küçükten Büyüğe)</label>
          <input
            type="number"
            value={formData.order}
            onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
            className="w-full sm:w-32 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-white/10">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-brand-500 text-white font-medium rounded-xl px-8 py-3 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-[#0B0F19] transition-all disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'İş Ortağını Kaydet'}
          </button>
        </div>
      </div>
    </form>
  );
}

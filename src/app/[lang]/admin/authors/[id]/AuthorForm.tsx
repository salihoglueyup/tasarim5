'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveAuthor } from '@/app/actions/author-actions';

export default function AuthorForm({ author, lang, isNew }: any) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: author?.name || '',
    slug: author?.slug || '',
    bio: author?.bio || '',
    avatar: author?.avatar || '',
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: isNew ? generateSlug(name) : prev.slug
    }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData(prev => ({ ...prev, avatar: result.url }));
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

    const res = await saveAuthor(isNew ? 'new' : author.id.toString(), formData, lang);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(`/${lang}/admin/authors`);
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
        
        {/* Avatar Upload */}
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl text-slate-400 dark:text-white/50">{formData.name ? formData.name.charAt(0).toUpperCase() : '👤'}</span>
            )}
          </div>
          
          <div className="flex-1 space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">Profil Fotoğrafı (Avatar)</label>
            <label className="inline-flex items-center px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-sm">
              <span className="text-slate-700 dark:text-gray-300">
                {uploading ? 'Yükleniyor...' : '📁 Bilgisayardan Seç / Yükle'}
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
            </label>
            <div className="flex items-center space-x-2 w-full mt-2">
              <span className="text-xs text-slate-500 dark:text-gray-500 whitespace-nowrap">veya URL girin:</span>
              <input
                type="text"
                value={formData.avatar}
                onChange={e => setFormData({...formData, avatar: e.target.value})}
                placeholder="https://..."
                className="flex-1 bg-transparent border-b border-slate-300 dark:border-white/10 px-2 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-white/5">
          <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Yazar / Ekip Adı</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={handleNameChange}
            className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            placeholder="Yazar adını girin..."
          />
        </div>

        <div>
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
          <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Biyografi (Hakkında)</label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={e => setFormData({...formData, bio: e.target.value})}
            className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none"
            placeholder="Yazar hakkında kısa bir biyografi..."
          />
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-white/10">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-brand-500 text-white font-medium rounded-xl px-8 py-3 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-[#0B0F19] transition-all disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Yazarı Kaydet'}
          </button>
        </div>
      </div>
    </form>
  );
}

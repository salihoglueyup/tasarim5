'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveReference } from '@/app/actions/reference-actions';
import TiptapEditor from '@/components/admin/TiptapEditor';

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
    
    // Faz 2 alanları
    content: reference?.content || '',
    services: reference?.services || '',
    gallery: reference?.gallery || '',
    testimonialText: reference?.testimonialText || '',
    testimonialAuthor: reference?.testimonialAuthor || '',
    stats: reference?.stats || '',
    coordinates: reference?.coordinates || '',
    isSuccessStory: reference?.isSuccessStory ?? false,
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
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
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Detaylı İçerik (Opsiyonel)</label>
              <TiptapEditor 
                content={formData.content || ''} 
                onChange={(content) => setFormData({...formData, content})} 
              />
            </div>

          </div>

          <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6 shadow-sm dark:shadow-none">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Gelişmiş Başarı Hikayesi (Faz 2)</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Hizmet Kapsamı (Virgülle ayırın)</label>
              <input
                type="text"
                value={formData.services}
                onChange={e => setFormData({...formData, services: e.target.value})}
                className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                placeholder="Örn: 7/24 Güvenlik, Havuz Bakımı, Teknik Servis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Rakamlarla İstatistikler (JSON formatı)</label>
              <textarea
                rows={3}
                value={formData.stats}
                onChange={e => setFormData({...formData, stats: e.target.value})}
                className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none font-mono text-sm"
                placeholder='Örn: [{"label":"Aidat Tahsilatı", "value":"%98"}, {"label":"Tasarruf", "value":"%20"}]'
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Müşteri Yorumu (Testimonial Text)</label>
                <textarea
                  rows={2}
                  value={formData.testimonialText}
                  onChange={e => setFormData({...formData, testimonialText: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none"
                  placeholder="Örn: Sitemizin değeri arttı..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Yorum Yapan Kişi</label>
                <input
                  type="text"
                  value={formData.testimonialAuthor}
                  onChange={e => setFormData({...formData, testimonialAuthor: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  placeholder="Örn: Ahmet Y., Lalezar Konakları YKB"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Options Area */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6 shadow-sm dark:shadow-none">
            
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white font-medium">Yayın Ayarları</h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={e => setFormData({...formData, published: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-500/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-500"></div>
              </label>
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

            <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl mt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400" aria-hidden="true">star</span>
                <div>
                  <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300">Başarı Hikayesi mi?</h3>
                  <p className="text-xs text-amber-700/70 dark:text-amber-400/70">Bu proje Başarı Hikayeleri sayfasında listelenir.</p>
                </div>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isSuccessStory}
                  onChange={e => setFormData({...formData, isSuccessStory: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
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
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Sıralama</label>
              <input
                type="number"
                value={formData.order}
                onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              />
            </div>

          </div>

          <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6 shadow-sm dark:shadow-none">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Kapak Görseli</label>
            <div className="space-y-3">
              <label className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                <span className="text-sm text-slate-500 dark:text-gray-400">
                  {uploading ? 'Yükleniyor...' : '📁 Bilgisayardan Seç'}
                </span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 dark:text-gray-500">URL:</span>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="flex-1 bg-transparent border-b border-slate-300 dark:border-white/10 px-2 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>
            
            {formData.image && (
              <div className="mt-4 relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 group bg-slate-50 dark:bg-white/5">
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

          <details className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-sm group cursor-pointer overflow-hidden shadow-sm dark:shadow-none">
            <summary className="p-6 font-medium text-slate-700 dark:text-gray-300 outline-none select-none flex items-center justify-between">
              Harita & Galeri (JSON)
              <span className="text-slate-500 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300">▼</span>
            </summary>
            
            <div className="p-6 pt-0 space-y-6 border-t border-slate-100 dark:border-white/5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Galeri (Resim URL'leri virgülle ayırın)</label>
                <textarea
                  rows={3}
                  value={formData.gallery}
                  onChange={e => setFormData({...formData, gallery: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none text-xs font-mono"
                  placeholder="https://img1.jpg, https://img2.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Harita Koordinatları</label>
                <input
                  type="text"
                  value={formData.coordinates}
                  onChange={e => setFormData({...formData, coordinates: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                  placeholder="Örn: 41.0082, 28.9784"
                />
              </div>
            </div>
          </details>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-medium rounded-xl px-4 py-4 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-[#0B0F19] transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(var(--brand-500),0.3)] hover:shadow-[0_0_30px_rgba(var(--brand-500),0.5)] transform hover:-translate-y-0.5"
            >
              {loading ? 'Kaydediliyor...' : 'Projeyi Kaydet'}
            </button>
          </div>
        </div>

      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/admin/TiptapEditor';
import { savePost } from '@/app/actions/post-actions';

export default function PostForm({ post, categories, authors, lang, isNew }: any) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    description: post?.description || '',
    tldr: post?.tldr || '',
    pillar: post?.pillar || 'Alo Yönetim Rehberi',
    image: post?.image || '',
    categoryId: post?.categoryId || (categories[0]?.id || ''),
    authorId: post?.authorId || (authors[0]?.id || ''),
    published: post?.published ?? true,
    tags: post?.tags ? (typeof post.tags === 'string' ? JSON.parse(post.tags).join(', ') : post.tags.join(', ')) : '',
    content: post?.content || ''
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

    // Convert comma separated tags to array
    const tagsArray = formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t !== '');

    const res = await savePost(isNew ? 'new' : post.id.toString(), {
      ...formData,
      tags: tagsArray
    }, lang);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(`/${lang}/admin/posts`);
    }
  };

  // Kategorileri hiyerarşik (Ağaç) olarak düzenleme
  const renderCategoryOptions = () => {
    const rootCategories = categories.filter((c: any) => !c.parentId);
    const options: React.ReactNode[] = [];

    const addCategoryToOptions = (cat: any, depth = 0) => {
      const prefix = depth > 0 ? '— '.repeat(depth) : '';
      options.push(
        <option key={cat.id} value={cat.id}>
          {prefix}{cat.name}
        </option>
      );
      
      const children = categories.filter((c: any) => c.parentId === cat.id);
      children.forEach((child: any) => addCategoryToOptions(child, depth + 1));
    };

    rootCategories.forEach((root: any) => addCategoryToOptions(root));
    
    // Eğer hiyerarşi kurulamadıysa (veritabanında children/parent bağlantısı yoksa veya hepsi rootsa) normal sırala
    if (options.length === 0) {
      return categories.map((c: any) => (
        <option key={c.id} value={c.id}>{c.name}</option>
      ));
    }
    return options;
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
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Başlık</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                placeholder="Yazı başlığını girin..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Açıklama (SEO / Özet)</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none"
                placeholder="Arama sonuçlarında ve yazı kartlarında görünecek açıklama..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">İçerik</label>
              <TiptapEditor 
                content={formData.content} 
                onChange={(content) => setFormData({...formData, content})} 
              />
            </div>
          </div>
        </div>

        {/* Sidebar Options Area */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white font-medium">Yayın Ayarları</h3>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={e => setFormData({...formData, published: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-300 dark:border-gray-600 text-brand-500 focus:ring-brand-500 bg-slate-50 dark:bg-white/5"
                />
                <span className="text-slate-700 dark:text-gray-300 text-sm">Yayında</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Kategori</label>
              <select
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
                className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all [&>option]:bg-white dark:[&>option]:bg-[#0B0F19]"
              >
                {renderCategoryOptions()}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Yazar</label>
              <select
                value={formData.authorId}
                onChange={e => setFormData({...formData, authorId: e.target.value})}
                className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all [&>option]:bg-white dark:[&>option]:bg-[#0B0F19]"
              >
                {authors.map((a: any) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Kapak Görseli</label>
              <div className="space-y-3">
                <label className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <span className="text-sm text-slate-500 dark:text-gray-400">
                    {uploading ? 'Yükleniyor...' : '🖼️ Bilgisayardan Seç / Yükle'}
                  </span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 dark:text-gray-500">veya URL girin:</span>
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
                <div className="mt-4 relative h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 group">
                  <img src={formData.image} alt="Kapak" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, image: ''})}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <details className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-sm group cursor-pointer overflow-hidden shadow-sm dark:shadow-none">
            <summary className="p-6 font-medium text-slate-700 dark:text-gray-300 outline-none select-none flex items-center justify-between">
              Gelişmiş Seçenekler
              <span className="text-slate-500 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300">▼</span>
            </summary>
            
            <div className="p-6 pt-0 space-y-6 border-t border-slate-100 dark:border-white/5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">URL Adresi (Slug)</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">TLDR (Kısa Özet)</label>
                <textarea
                  rows={2}
                  value={formData.tldr}
                  onChange={e => setFormData({...formData, tldr: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Etiketler</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  placeholder="Virgülle ayırın (ör: yazılım, yönetim)"
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
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
              {loading ? 'Kaydediliyor...' : 'Yazıyı Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

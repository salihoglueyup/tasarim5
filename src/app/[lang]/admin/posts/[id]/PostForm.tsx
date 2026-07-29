'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/admin/TiptapEditor';
import { savePost } from '@/app/actions/post-actions';

export default function PostForm({ post, categories, authors, lang, isNew }: any) {
  const router = useRouter();
  
  const extractHtml = (content: any) => {
    if (!content) return '';
    try {
      const parsed = typeof content === 'string' ? JSON.parse(content) : content;
      if (Array.isArray(parsed) && parsed[0]?.type === 'html') {
        return parsed[0].body;
      }
      return typeof content === 'string' ? content : '';
    } catch (e) {
      return content;
    }
  };

  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    description: post?.description || '',
    tldr: post?.tldr || '',
    pillar: post?.pillar || 'Alo Yönetim Rehberi',
    image: post?.image || '/images/hero-poster-v5.webp',
    categoryId: post?.categoryId || (categories[0]?.id || ''),
    authorId: post?.authorId || (authors[0]?.id || ''),
    published: post?.published ?? true,
    tags: post?.tags ? (typeof post.tags === 'string' ? JSON.parse(post.tags).join(', ') : post.tags.join(', ')) : '',
    content: extractHtml(post?.content)
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Başlık</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                placeholder="Yazı başlığını girin..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Açıklama (SEO / Özet)</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none"
                placeholder="Arama sonuçlarında ve yazı kartlarında görünecek açıklama..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">İçerik</label>
              <TiptapEditor 
                content={formData.content} 
                onChange={(content) => setFormData({...formData, content})} 
              />
            </div>
          </div>
        </div>

        {/* Sidebar Options Area */}
        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">URL Adresi (Slug)</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
              <select
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all [&>option]:bg-[#0B0F19]"
              >
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Yazar</label>
              <select
                value={formData.authorId}
                onChange={e => setFormData({...formData, authorId: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all [&>option]:bg-[#0B0F19]"
              >
                {authors.map((a: any) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Durum</label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={e => setFormData({...formData, published: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 bg-white/5"
                />
                <span className="text-gray-300">Yayında</span>
              </label>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Kapak Görseli URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              />
              {formData.image && (
                <div className="mt-3 relative h-32 rounded-lg overflow-hidden border border-white/10">
                  <img src={formData.image} alt="Kapak" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">TLDR (Kısa Özet)</label>
              <textarea
                rows={2}
                value={formData.tldr}
                onChange={e => setFormData({...formData, tldr: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Etiketler</label>
              <input
                type="text"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                placeholder="Virgülle ayırın (ör: yazılım, yönetim)"
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-medium rounded-xl px-4 py-4 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-[#0B0F19] transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(var(--brand-500),0.3)] hover:shadow-[0_0_30px_rgba(var(--brand-500),0.5)] transform hover:-translate-y-0.5"
            >
              {loading ? 'Kaydediliyor...' : 'Yazıyı Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

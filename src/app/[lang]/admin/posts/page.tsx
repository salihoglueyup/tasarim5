import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeletePostButton from './DeletePostButton';

export default async function AdminPosts({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = await prisma.post.findMany({
    orderBy: { datePublished: 'desc' },
    include: {
      category: true,
      author: true,
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Blog Yazıları</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Sitedeki tüm blog yazılarını buradan yönetebilirsiniz.</p>
        </div>
        <Link 
          href={`/${lang}/admin/posts/new`}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-[0_0_15px_rgba(var(--brand-500),0.3)] hover:shadow-[0_0_25px_rgba(var(--brand-500),0.5)] transform hover:-translate-y-0.5"
        >
          <span className="mr-2">+</span> Yeni Yazı Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 bg-slate-50 dark:bg-white/[0.02]">
                <th className="p-4 font-medium">Başlık</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium">Yazar</th>
                <th className="p-4 font-medium">Durum</th>
                <th className="p-4 font-medium">Tarih</th>
                <th className="p-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{post.title}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-500 mt-1 font-mono">/{post.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 text-xs border border-slate-200 dark:border-white/10 whitespace-nowrap">
                      {post.category.name}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-gray-400 whitespace-nowrap">{post.author.name}</td>
                  <td className="p-4 whitespace-nowrap">
                    {post.published ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-xs">
                        Yayında
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-xs">
                        Taslak
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-gray-500 whitespace-nowrap">
                    {new Date(post.datePublished).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <Link 
                      href={`/${lang}/admin/posts/${post.id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-transparent hover:border-brand-200 dark:hover:border-brand-500/20 transition-all text-xs"
                    >
                      Düzenle
                    </Link>
                    <DeletePostButton id={post.id} lang={lang} title={post.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {posts.length === 0 && (
            <div className="py-16 text-center text-slate-500 dark:text-gray-500 flex flex-col items-center">
              <span className="text-4xl mb-4 opacity-50">📝</span>
              <p>Henüz hiç blog yazısı bulunmuyor.</p>
              <p className="text-sm mt-1">Sağ üstteki butondan yeni bir yazı ekleyebilirsiniz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

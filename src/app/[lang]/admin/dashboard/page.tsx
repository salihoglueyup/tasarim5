import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// This is a Server Component. We can fetch data directly from DB.
export default async function AdminDashboard({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const postsCount = await prisma.post.count();
  const categoriesCount = await prisma.category.count();
  const authorsCount = await prisma.author.count();
  const faqsCount = await prisma.faq.count();

  // Get latest 5 posts
  const latestPosts = await prisma.post.findMany({
    orderBy: { datePublished: 'desc' },
    take: 5,
    include: {
      author: true,
      category: true,
    }
  });

  // Get latest 5 faqs
  const latestFaqs = await prisma.faq.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const stats = [
    { name: 'Toplam Yazı', value: postsCount, icon: '📝', color: 'from-blue-500 to-cyan-500' },
    { name: 'S.S.S', value: faqsCount, icon: '❓', color: 'from-amber-500 to-orange-500' },
    { name: 'Kategoriler', value: categoriesCount, icon: '🏷️', color: 'from-purple-500 to-pink-500' },
    { name: 'Yazarlar', value: authorsCount, icon: '👥', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="space-y-10">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Kontrol Paneli</h1>
          <p className="text-slate-600 dark:text-gray-400">Tüm içerik ve S.S.S yönetimini bu merkezden sağlayabilirsiniz.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href={`/${lang}/admin/posts/new`} 
            className="flex items-center gap-2 bg-white dark:bg-white/[0.05] hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-500 text-slate-700 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-brand-300 dark:hover:border-brand-500 transition-all font-medium text-sm shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">edit_document</span>
            Yeni Yazı
          </Link>
          <Link 
            href={`/${lang}/admin/faqs/new`} 
            className="flex items-center gap-2 bg-white dark:bg-white/[0.05] hover:bg-accent-50 hover:text-accent-600 dark:hover:bg-accent-500 text-slate-700 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-accent-300 dark:hover:border-accent-500 transition-all font-medium text-sm shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">help</span>
            Yeni S.S.S
          </Link>
          <Link 
            href={`/${lang}/admin/authors/new`} 
            className="flex items-center gap-2 bg-white dark:bg-white/[0.05] hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500 text-slate-700 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500 transition-all font-medium text-sm shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Yeni Yazar
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none backdrop-blur-sm relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300">
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">{stat.name}</span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Split Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Latest Posts */}
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-500 dark:text-brand-400">article</span>
              Son Yazılar
            </h2>
            <Link href={`/${lang}/admin/posts`} className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">Tümü &rarr;</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 text-xs uppercase tracking-wider text-slate-400 dark:text-gray-500">
                  <th className="pb-4 font-medium">Başlık</th>
                  <th className="pb-4 font-medium">Durum</th>
                  <th className="pb-4 font-medium text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {latestPosts.map((post) => (
                  <tr key={post.id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 pr-4">
                      <div className="font-medium text-slate-900 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">{post.title}</div>
                      <div className="text-xs text-slate-500 dark:text-gray-500 mt-1">{post.category.name}</div>
                    </td>
                    <td className="py-4">
                      {post.published ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-500/20">
                          Yayında
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium border border-amber-200 dark:border-amber-500/20">
                          Taslak
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <Link href={`/${lang}/admin/posts/${post.id}`} className="text-slate-400 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {latestPosts.length === 0 && (
              <div className="py-12 text-center text-slate-500 dark:text-gray-500">
                Henüz yazı eklenmemiş.
              </div>
            )}
          </div>
        </div>

        {/* Latest FAQs */}
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-500 dark:text-accent-400">help</span>
              Son Eklenen S.S.S
            </h2>
            <Link href={`/${lang}/admin/faqs`} className="text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors">Tümü &rarr;</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 text-xs uppercase tracking-wider text-slate-400 dark:text-gray-500">
                  <th className="pb-4 font-medium">Soru</th>
                  <th className="pb-4 font-medium">Kategori</th>
                  <th className="pb-4 font-medium text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {latestFaqs.map((faq) => (
                  <tr key={faq.id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 pr-4">
                      <div className="font-medium text-slate-900 dark:text-gray-200 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-1">{faq.question}</div>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 text-xs font-medium border border-slate-200 dark:border-white/10 whitespace-nowrap">
                        {faq.category}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link href={`/${lang}/admin/faqs/${faq.id}`} className="text-slate-400 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {latestFaqs.length === 0 && (
              <div className="py-12 text-center text-slate-500 dark:text-gray-500">
                Henüz soru eklenmemiş.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

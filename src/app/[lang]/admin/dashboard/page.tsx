import { prisma } from '@/lib/prisma';

// This is a Server Component. We can fetch data directly from DB.
export default async function AdminDashboard() {
  const postsCount = await prisma.post.count();
  const categoriesCount = await prisma.category.count();
  const authorsCount = await prisma.author.count();

  // Get latest 5 posts
  const latestPosts = await prisma.post.findMany({
    orderBy: { datePublished: 'desc' },
    take: 5,
    include: {
      author: true,
      category: true,
    }
  });

  const stats = [
    { name: 'Toplam Yazı', value: postsCount, icon: '📝', color: 'from-blue-500 to-cyan-500' },
    { name: 'Kategoriler', value: categoriesCount, icon: '🏷️', color: 'from-purple-500 to-pink-500' },
    { name: 'Yazarlar', value: authorsCount, icon: '👥', color: 'from-emerald-500 to-teal-500' },
    { name: 'Okunma (Tahmini)', value: postsCount * 120, icon: '👀', color: 'from-orange-500 to-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Hoş Geldiniz</h1>
        <p className="text-gray-400">Alo Yönetim blog performansını ve içeriklerini buradan yönetebilirsiniz.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-all duration-300">
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium">{stat.name}</span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-4xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Latest Posts */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Son Eklenen Yazılar</h2>
          <button className="text-sm text-brand-400 hover:text-brand-300 transition-colors">Tümünü Gör &rarr;</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                <th className="pb-4 font-medium">Başlık</th>
                <th className="pb-4 font-medium">Kategori</th>
                <th className="pb-4 font-medium">Yazar</th>
                <th className="pb-4 font-medium">Durum</th>
                <th className="pb-4 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {latestPosts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4">
                    <div className="font-medium text-gray-200 group-hover:text-brand-400 transition-colors line-clamp-1">{post.title}</div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 text-xs border border-white/10">{post.category.name}</span>
                  </td>
                  <td className="py-4 text-gray-400">{post.author.name}</td>
                  <td className="py-4">
                    {post.published ? (
                      <span className="flex items-center text-emerald-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span> Yayında
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span> Taslak
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-gray-500">
                    {new Date(post.datePublished).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {latestPosts.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              Henüz hiç yazı eklenmemiş.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

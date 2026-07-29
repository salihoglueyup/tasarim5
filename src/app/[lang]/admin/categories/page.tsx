import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteCategoryButton from './DeleteCategoryButton';

export default async function AdminCategories({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { posts: true } },
      parent: true
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Kategoriler</h1>
          <p className="text-sm text-gray-400 mt-1">Blog kategorilerini ve alt kategorileri yönetin.</p>
        </div>
        <Link 
          href={`/${lang}/admin/categories/new`}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-[0_0_15px_rgba(var(--brand-500),0.3)] hover:shadow-[0_0_25px_rgba(var(--brand-500),0.5)] transform hover:-translate-y-0.5"
        >
          <span className="mr-2">+</span> Yeni Kategori Ekle
        </Link>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-white/[0.02]">
                <th className="p-4 font-medium">Kategori Adı</th>
                <th className="p-4 font-medium">Üst Kategori</th>
                <th className="p-4 font-medium">Yazı Sayısı</th>
                <th className="p-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="font-medium text-gray-200 group-hover:text-brand-400 transition-colors">{cat.name}</div>
                    <div className="text-xs text-gray-500 mt-1 font-mono">/{cat.slug}</div>
                  </td>
                  <td className="p-4">
                    {cat.parent ? (
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 text-xs border border-white/10 whitespace-nowrap">
                        {cat.parent.name}
                      </span>
                    ) : (
                      <span className="text-gray-500 italic text-xs">- Ana Kategori -</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-xs font-medium">
                      {cat._count.posts}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <Link 
                      href={`/${lang}/admin/categories/${cat.id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-brand-400 hover:bg-brand-500/10 border border-transparent hover:border-brand-500/20 transition-all text-xs"
                    >
                      Düzenle
                    </Link>
                    <DeleteCategoryButton id={cat.id} lang={lang} title={cat.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {categories.length === 0 && (
            <div className="py-16 text-center text-gray-500 flex flex-col items-center">
              <span className="text-4xl mb-4 opacity-50">🏷️</span>
              <p>Henüz hiç kategori bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

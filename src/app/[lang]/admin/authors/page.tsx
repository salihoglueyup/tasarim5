import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteAuthorButton from './DeleteAuthorButton';

export default async function AdminAuthors({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const authors = await prisma.author.findMany({
    include: {
      _count: { select: { posts: true } }
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Yazarlar (Ekipler)</h1>
          <p className="text-sm text-gray-400 mt-1">Blog içeriklerini üreten yazar ve ekipleri yönetin.</p>
        </div>
        <Link 
          href={`/${lang}/admin/authors/new`}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-[0_0_15px_rgba(var(--brand-500),0.3)] hover:shadow-[0_0_25px_rgba(var(--brand-500),0.5)] transform hover:-translate-y-0.5"
        >
          <span className="mr-2">+</span> Yeni Yazar Ekle
        </Link>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-white/[0.02]">
                <th className="p-4 font-medium w-16">Avatar</th>
                <th className="p-4 font-medium">Yazar / Ekip Adı</th>
                <th className="p-4 font-medium">Biyografi</th>
                <th className="p-4 font-medium">Yazı Sayısı</th>
                <th className="p-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {authors.map((author) => (
                <tr key={author.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20 flex items-center justify-center text-white font-bold">
                      {author.avatar ? (
                        <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{author.name.charAt(0)}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-200 group-hover:text-brand-400 transition-colors">{author.name}</div>
                    <div className="text-xs text-gray-500 mt-1 font-mono">/{author.slug}</div>
                  </td>
                  <td className="p-4 text-gray-400 max-w-xs truncate">
                    {author.bio || <span className="text-gray-600 italic">Biyografi yok</span>}
                  </td>
                  <td className="p-4 text-gray-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-xs font-medium">
                      {author._count.posts}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <Link 
                      href={`/${lang}/admin/authors/${author.id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-brand-400 hover:bg-brand-500/10 border border-transparent hover:border-brand-500/20 transition-all text-xs"
                    >
                      Düzenle
                    </Link>
                    <DeleteAuthorButton id={author.id} lang={lang} title={author.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {authors.length === 0 && (
            <div className="py-16 text-center text-gray-500 flex flex-col items-center">
              <span className="text-4xl mb-4 opacity-50">👥</span>
              <p>Henüz hiç yazar bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

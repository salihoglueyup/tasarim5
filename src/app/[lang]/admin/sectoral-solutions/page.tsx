import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteSectoralButton from './DeleteSectoralButton';

export default async function AdminSectoralSolutions({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const solutions = await prisma.sectoralSolution.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Sektörel Çözümler</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Sektörel çözüm paketlerini yönetin.</p>
        </div>
        <Link 
          href={`/${lang}/admin/sectoral-solutions/new`}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-[var(--color-primary)] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all shadow-md"
        >
          <span className="mr-2">+</span> Yeni Çözüm Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 bg-slate-50 dark:bg-white/[0.02]">
                <th className="p-4 font-medium w-16">Sıra</th>
                <th className="p-4 font-medium">Başlık</th>
                <th className="p-4 font-medium">Durum</th>
                <th className="p-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-white/5">
              {solutions.map((sol) => (
                <tr key={sol.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white font-medium">
                      {sol.order}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">{sol.icon}</span>
                    <div className="font-medium text-slate-900 dark:text-gray-200 group-hover:text-[var(--color-primary)] transition-colors">{sol.title}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      sol.published 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {sol.published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <Link 
                      href={`/${lang}/admin/sectoral-solutions/${sol.id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:text-[var(--color-primary)] transition-all text-xs"
                    >
                      Düzenle
                    </Link>
                    <DeleteSectoralButton id={sol.id} lang={lang} title={sol.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {solutions.length === 0 && (
            <div className="py-16 text-center text-slate-500 flex flex-col items-center">
              <span className="text-4xl mb-4 opacity-50">🏢</span>
              <p>Henüz sektörel çözüm eklenmemiş.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

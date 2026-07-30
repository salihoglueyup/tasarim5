import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminFaqsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const faqs = await prisma.faq.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">S.S.S Yönetimi</h1>
          <p className="text-sm text-slate-500">Sıkça Sorulan Soruları ekleyin, düzenleyin veya silin.</p>
        </div>
        <Link 
          href={`/${lang}/admin/faqs/new`}
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Yeni Soru Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Soru</th>
                <th className="px-6 py-4">Sıra</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      {faq.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white line-clamp-1 max-w-[300px]" title={faq.question}>
                    {faq.question}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{faq.order}</td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/${lang}/admin/faqs/${faq.id}`}
                      className="text-brand-500 hover:text-brand-600 font-medium mr-4"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Henüz soru eklenmemiş.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

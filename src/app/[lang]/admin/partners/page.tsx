import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeletePartnerButton from './DeletePartnerButton';

export default async function AdminPartners({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">İş Ortakları</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Referanslar sayfasında kayan yazıda (marquee) dönecek iş ortaklarını yönetin.</p>
        </div>
        <Link 
          href={`/${lang}/admin/partners/new`}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-[0_0_15px_rgba(var(--brand-500),0.3)] hover:shadow-[0_0_25px_rgba(var(--brand-500),0.5)] transform hover:-translate-y-0.5"
        >
          <span className="mr-2">+</span> Yeni İş Ortağı Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 bg-slate-50 dark:bg-white/[0.02]">
                <th className="p-4 font-medium w-16">Sıra</th>
                <th className="p-4 font-medium w-24">Logo</th>
                <th className="p-4 font-medium">Firma Adı</th>
                <th className="p-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-white/5">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white font-medium">
                      {partner.order}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="w-16 h-10 rounded-lg bg-slate-100 dark:bg-white/10 overflow-hidden border border-slate-200 dark:border-white/20 flex items-center justify-center p-1">
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-xs text-slate-400 font-bold">{partner.name.charAt(0)}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{partner.name}</div>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <Link 
                      href={`/${lang}/admin/partners/${partner.id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-transparent hover:border-brand-200 dark:hover:border-brand-500/20 transition-all text-xs"
                    >
                      Düzenle
                    </Link>
                    <DeletePartnerButton id={partner.id} lang={lang} title={partner.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {partners.length === 0 && (
            <div className="py-16 text-center text-slate-500 dark:text-gray-500 flex flex-col items-center">
              <span className="text-4xl mb-4 opacity-50">🤝</span>
              <p>Henüz hiç iş ortağı eklenmemiş.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

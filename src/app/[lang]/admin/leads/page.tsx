import { prisma } from '@/lib/prisma';
import DeleteLeadButton from './DeleteLeadButton';
import MarkReadButton from './MarkReadButton';
import LeadMessageModal from './LeadMessageModal'; // will create this for viewing full message

export default async function AdminLeads({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Gelen Kutusu</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Siteniz üzerinden gönderilen tüm form ve mesajlar burada listelenir.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wider text-slate-500 dark:text-gray-500 bg-slate-50 dark:bg-white/[0.02]">
                <th className="p-4 font-medium w-12 text-center">Durum</th>
                <th className="p-4 font-medium">Gönderen</th>
                <th className="p-4 font-medium">İletişim</th>
                <th className="p-4 font-medium">Tür / Konu</th>
                <th className="p-4 font-medium">Mesaj Özeti</th>
                <th className="p-4 font-medium">Tarih</th>
                <th className="p-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className={`transition-colors group ${!lead.isRead ? 'bg-brand-50/30 dark:bg-brand-500/5' : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'}`}>
                  <td className="p-4 text-center">
                    <MarkReadButton id={lead.id} lang={lang} isRead={lead.isRead} />
                  </td>
                  <td className="p-4">
                    <div className={`font-medium ${!lead.isRead ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-gray-300'}`}>
                      {lead.name || 'İsimsiz'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-xs text-slate-600 dark:text-gray-400">
                      {lead.phone && <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" aria-hidden="true">call</span> {lead.phone}</div>}
                      {lead.email && <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" aria-hidden="true">mail</span> {lead.email}</div>}
                      {!lead.phone && !lead.email && <span>Belirtilmemiş</span>}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 text-xs border border-slate-200 dark:border-white/10 uppercase tracking-wide">
                      {lead.type}
                    </span>
                    {lead.subject && <div className="text-xs text-slate-500 mt-1">{lead.subject}</div>}
                  </td>
                  <td className="p-4 max-w-xs truncate text-slate-500 dark:text-gray-400 text-xs">
                    {lead.message || '-'}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-gray-500 whitespace-nowrap text-xs">
                    {new Date(lead.createdAt).toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <LeadMessageModal lead={lead} />
                    <DeleteLeadButton id={lead.id} lang={lang} name={lead.name || 'İsimsiz'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {leads.length === 0 && (
            <div className="py-16 text-center text-slate-500 dark:text-gray-500 flex flex-col items-center">
              <span className="text-4xl mb-4 opacity-50">📬</span>
              <p>Gelen kutunuz şu an boş.</p>
              <p className="text-sm mt-1">Siteden yeni bir form doldurulduğunda burada görünecektir.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

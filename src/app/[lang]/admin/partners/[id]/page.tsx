import { prisma } from '@/lib/prisma';
import PartnerForm from './PartnerForm';
import { notFound } from 'next/navigation';

export default async function EditPartnerPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const isNew = id === 'new';

  let partner = null;

  if (!isNew) {
    partner = await prisma.partner.findUnique({
      where: { id }
    });

    if (!partner) {
      notFound();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isNew ? 'Yeni İş Ortağı Ekle' : 'İş Ortağını Düzenle'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
          {isNew ? 'Referanslar kayan yazısına eklenecek bir iş ortağı girin.' : `"${partner?.name}" adlı iş ortağını düzenliyorsunuz.`}
        </p>
      </div>

      <PartnerForm partner={partner} lang={lang} isNew={isNew} />
    </div>
  );
}

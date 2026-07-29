import { prisma } from '@/lib/prisma';
import ReferenceForm from './ReferenceForm';
import { notFound } from 'next/navigation';

export default async function EditReferencePage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const isNew = id === 'new';

  let reference = null;

  if (!isNew) {
    reference = await prisma.reference.findUnique({
      where: { id }
    });

    if (!reference) {
      notFound();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isNew ? 'Yeni Referans Ekle' : 'Referansı Düzenle'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
          {isNew ? 'Referanslar sayfanızda sergilenecek yeni bir proje oluşturun.' : `"${reference?.title}" adlı projeyi düzenliyorsunuz.`}
        </p>
      </div>

      <ReferenceForm reference={reference} lang={lang} isNew={isNew} />
    </div>
  );
}

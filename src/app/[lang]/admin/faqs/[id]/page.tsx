import { prisma } from '@/lib/prisma';
import FaqForm from '../FaqForm';
import { notFound } from 'next/navigation';

export default async function AdminFaqDetailPage({
  params,
}: {
  params: Promise<{ lang: string, id: string }>;
}) {
  const { lang, id } = await params;
  const isNew = id === 'new';
  
  let faq = null;
  if (!isNew) {
    faq = await prisma.faq.findUnique({ where: { id } });
    if (!faq) notFound();
  }

  // Kategoriler için mevcut olanları getirebiliriz veya sabit bırakabiliriz.
  const categories = await prisma.faq.groupBy({
    by: ['category'],
    orderBy: { category: 'asc' },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        {isNew ? 'Yeni Soru Ekle' : 'Soruyu Düzenle'}
      </h1>
      
      <FaqForm 
        faq={faq} 
        existingCategories={categories.map(c => c.category)} 
        lang={lang}
      />
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import CategoryForm from './CategoryForm';
import { notFound } from 'next/navigation';

export default async function EditCategoryPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const isNew = id === 'new';

  let category = null;

  if (!isNew) {
    category = await prisma.category.findUnique({
      where: { id }
    });

    if (!category) {
      notFound();
    }
  }

  // Üst kategori seçimi için mevcut kategorileri getir (kendisi hariç)
  const allCategories = await prisma.category.findMany({
    where: isNew ? undefined : { id: { not: id } },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isNew ? 'Yeni Kategori Ekle' : 'Kategoriyi Düzenle'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
          {isNew ? 'Blog yazılarınız için yeni bir kategori oluşturun.' : `"${category?.name}" kategorisini düzenliyorsunuz.`}
        </p>
      </div>

      <CategoryForm category={category} allCategories={allCategories} lang={lang} isNew={isNew} />
    </div>
  );
}

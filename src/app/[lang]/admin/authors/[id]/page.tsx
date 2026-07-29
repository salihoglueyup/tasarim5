import { prisma } from '@/lib/prisma';
import AuthorForm from './AuthorForm';
import { notFound } from 'next/navigation';

export default async function EditAuthorPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const isNew = id === 'new';

  let author = null;

  if (!isNew) {
    author = await prisma.author.findUnique({
      where: { id }
    });

    if (!author) {
      notFound();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {isNew ? 'Yeni Yazar Ekle' : 'Yazarı Düzenle'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {isNew ? 'Blog yazılarınız için yeni bir yazar profili oluşturun.' : `"${author?.name}" adlı yazarı düzenliyorsunuz.`}
        </p>
      </div>

      <AuthorForm author={author} lang={lang} isNew={isNew} />
    </div>
  );
}

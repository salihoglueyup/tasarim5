import { prisma } from '@/lib/prisma';
import PostForm from './PostForm';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const isNew = id === 'new';

  let post = null;

  if (!isNew) {
    post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      notFound();
    }
  }

  // Kategorileri ve Yazarları getir
  const categories = await prisma.category.findMany();
  const authors = await prisma.author.findMany();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {isNew ? 'Yeni Yazı Ekle' : 'Yazıyı Düzenle'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {isNew ? 'Yeni bir blog yazısı oluşturun ve yayınlayın.' : `"${post?.title}" başlıklı yazıyı düzenliyorsunuz.`}
        </p>
      </div>

      <PostForm post={post} categories={categories} authors={authors} lang={lang} isNew={isNew} />
    </div>
  );
}

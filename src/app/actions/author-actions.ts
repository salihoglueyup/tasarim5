'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { assertAdmin } from '@/lib/auth';

export async function saveAuthor(id: string, data: { name: string; slug: string; bio?: string; avatar?: string }, lang: string) {
  try {
    const session = await assertAdmin();
    if (!session) return { error: 'Yetkisiz işlem.' };

    if (id === 'new') {
      await prisma.author.create({
        data: {
          name: data.name,
          slug: data.slug,
          bio: data.bio || null,
          avatar: data.avatar || null,
        }
      });
    } else {
      await prisma.author.update({
        where: { id },
        data: {
          name: data.name,
          slug: data.slug,
          bio: data.bio || null,
          avatar: data.avatar || null,
        }
      });
    }

    revalidatePath(`/${lang}/admin/authors`);
    revalidatePath(`/${lang}/admin/posts`);
    return { success: true };
  } catch (error: any) {
    console.error('Save author error:', error);
    if (error.code === 'P2002') {
      return { error: 'Bu URL (slug) zaten başka bir yazar tarafından kullanılıyor.' };
    }
    return { error: 'Yazar kaydedilirken bir hata oluştu.' };
  }
}

export async function deleteAuthor(id: string, lang: string) {
  try {
    const session = await assertAdmin();
    if (!session) return { error: 'Yetkisiz işlem.' };

    const postsCount = await prisma.post.count({ where: { authorId: id } });
    if (postsCount > 0) {
      return { error: 'Bu yazara ait yazılar var. Önce yazıları silmeli veya başka yazara taşımalısınız.' };
    }

    await prisma.author.delete({ where: { id } });
    
    revalidatePath(`/${lang}/admin/authors`);
    revalidatePath(`/${lang}/admin/posts`);
    return { success: true };
  } catch (error) {
    console.error('Delete author error:', error);
    return { error: 'Yazar silinirken bir hata oluştu.' };
  }
}

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { assertAdmin } from '@/lib/auth';
import { logAction } from '@/lib/audit';
import { notifyIndexNow } from '@/lib/indexnow-auto';
import { z } from 'zod';

const CategorySchema = z.object({
  name: z.string().min(1, 'Kategori adı zorunludur').max(100, 'Çok uzun'),
  slug: z.string().min(1, 'URL zorunludur').max(100, 'Çok uzun'),
  description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir'),
  parentId: z.string().optional().nullable(),
});

export async function saveCategory(id: string, data: { name: string; slug: string; description: string; parentId?: string }, lang: string) {
  try {
    const session = await assertAdmin();
    if (!session) return { error: 'Yetkisiz işlem.' };

    // ZOD DOĞRULAMASI (Payload Poisoning Zırhı)
    const parsed = CategorySchema.safeParse(data);
    if (!parsed.success) {
      return { error: 'Geçersiz veri formatı gönderildi.' };
    }
    const safeData = parsed.data;

    if (id === 'new') {
      const category = await prisma.category.create({
        data: {
          name: safeData.name,
          slug: safeData.slug,
          description: safeData.description,
          parentId: safeData.parentId || null,
        }
      });
      await logAction(session.userId, 'CREATE', 'Category', category.id, safeData);
    } else {
      if (safeData.parentId === id) {
        return { error: 'Bir kategori kendisinin üst kategorisi olamaz.' };
      }

      await prisma.category.update({
        where: { id },
        data: {
          name: safeData.name,
          slug: safeData.slug,
          description: safeData.description,
          parentId: safeData.parentId || null,
        }
      });
      await logAction(session.userId, 'UPDATE', 'Category', id, safeData);
    }

    revalidatePath(`/${lang}/admin/categories`);
    revalidatePath(`/${lang}/admin/posts`);
    revalidatePath(`/${lang}/blog`);
    revalidatePath(`/${lang}/blog/kategori/${safeData.slug}`);

    notifyIndexNow([
      `/blog/kategori/${safeData.slug}`,
      '/blog',
      '/sitemap.xml'
    ]);

    return { success: true };
  } catch (error: any) {
    console.error('Save category error:', error);
    if (error.code === 'P2002') {
      return { error: 'Bu URL (slug) zaten başka bir kategori tarafından kullanılıyor.' };
    }
    return { error: 'Kategori kaydedilirken bir hata oluştu.' };
  }
}

export async function deleteCategory(id: string, lang: string) {
  try {
    const session = await assertAdmin();
    if (!session) return { error: 'Yetkisiz işlem.' };

    const postsCount = await prisma.post.count({ where: { categoryId: id } });
    if (postsCount > 0) {
      return { error: 'Bu kategoriye bağlı yazılar var. Önce yazıları silmeli veya başka kategoriye taşımalısınız.' };
    }

    const childrenCount = await prisma.category.count({ where: { parentId: id } });
    if (childrenCount > 0) {
      return { error: 'Bu kategorinin alt kategorileri var. Önce onları silmeli veya taşımalısınız.' };
    }

    const targetCat = await prisma.category.findUnique({ where: { id }, select: { slug: true } });

    await prisma.category.delete({ where: { id } });
    await logAction(session.userId, 'DELETE', 'Category', id);
    
    revalidatePath(`/${lang}/admin/categories`);
    revalidatePath(`/${lang}/admin/posts`);
    revalidatePath(`/${lang}/blog`);

    if (targetCat?.slug) {
      notifyIndexNow([
        `/blog/kategori/${targetCat.slug}`,
        '/blog',
        '/sitemap.xml'
      ]);
    }

    return { success: true };
  } catch (error) {
    console.error('Delete category error:', error);
    return { error: 'Kategori silinirken bir hata oluştu.' };
  }
}

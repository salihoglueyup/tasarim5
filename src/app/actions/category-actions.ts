'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveCategory(id: string, data: { name: string; slug: string; description: string; parentId?: string }, lang: string) {
  try {
    if (id === 'new') {
      // Create
      await prisma.category.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          parentId: data.parentId || null,
        }
      });
    } else {
      // Check if parentId is not pointing to itself
      if (data.parentId === id) {
        return { error: 'Bir kategori kendisinin üst kategorisi olamaz.' };
      }

      // Update
      await prisma.category.update({
        where: { id },
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          parentId: data.parentId || null,
        }
      });
    }

    revalidatePath(`/${lang}/admin/categories`);
    revalidatePath(`/${lang}/admin/posts`);
    return { success: true };
  } catch (error: any) {
    console.error('Save category error:', error);
    // Prisma unique constraint hatası (P2002) - slug çakışması
    if (error.code === 'P2002') {
      return { error: 'Bu URL (slug) zaten başka bir kategori tarafından kullanılıyor.' };
    }
    return { error: 'Kategori kaydedilirken bir hata oluştu.' };
  }
}

export async function deleteCategory(id: string, lang: string) {
  try {
    // Kategoriye bağlı yazı var mı kontrol et
    const postsCount = await prisma.post.count({ where: { categoryId: id } });
    if (postsCount > 0) {
      return { error: 'Bu kategoriye bağlı yazılar var. Önce yazıları silmeli veya başka kategoriye taşımalısınız.' };
    }

    // Alt kategorisi var mı kontrol et
    const childrenCount = await prisma.category.count({ where: { parentId: id } });
    if (childrenCount > 0) {
      return { error: 'Bu kategorinin alt kategorileri var. Önce onları silmeli veya taşımalısınız.' };
    }

    await prisma.category.delete({ where: { id } });
    
    revalidatePath(`/${lang}/admin/categories`);
    revalidatePath(`/${lang}/admin/posts`);
    return { success: true };
  } catch (error) {
    console.error('Delete category error:', error);
    return { error: 'Kategori silinirken bir hata oluştu.' };
  }
}

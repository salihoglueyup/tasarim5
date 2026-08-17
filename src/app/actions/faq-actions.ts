'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { assertAdmin } from '@/lib/auth';
import { notifyIndexNow } from '@/lib/indexnow-auto';

export async function saveFaq(data: {
  id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}) {
  try {
    const session = await assertAdmin();
    if (!session) return { success: false, error: 'Yetkisiz işlem.' };

    if (data.id) {
      await prisma.faq.update({
        where: { id: data.id },
        data: {
          question: data.question,
          answer: data.answer,
          category: data.category,
          order: data.order,
        },
      });
    } else {
      await prisma.faq.create({
        data: {
          question: data.question,
          answer: data.answer,
          category: data.category,
          order: data.order,
        },
      });
    }

    revalidatePath('/sss');
    revalidatePath('/admin/faqs');
    revalidatePath('/[lang]/sss', 'page');

    notifyIndexNow(['/sss', '/sitemap.xml']);

    return { success: true };
  } catch (error: any) {
    console.error('saveFaq error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteFaq(id: string) {
  try {
    const session = await assertAdmin();
    if (!session) return { success: false, error: 'Yetkisiz işlem.' };

    await prisma.faq.delete({
      where: { id },
    });
    revalidatePath('/sss');
    revalidatePath('/admin/faqs');
    revalidatePath('/[lang]/sss', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('deleteFaq error:', error);
    return { success: false, error: error.message };
  }
}

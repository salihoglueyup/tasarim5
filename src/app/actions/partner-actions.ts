'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function savePartner(id: string | 'new', data: {
  name: string;
  logo?: string;
  order: number;
}) {
  try {
    if (id !== 'new') {
      await prisma.partner.update({
        where: { id },
        data,
      });
    } else {
      await prisma.partner.create({
        data,
      });
    }

    revalidatePath('/referanslar');
    revalidatePath('/admin/partners');
    revalidatePath('/[lang]/referanslar', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('savePartner error:', error);
    return { success: false, error: error.message };
  }
}

export async function deletePartner(id: string) {
  try {
    await prisma.partner.delete({
      where: { id },
    });
    revalidatePath('/referanslar');
    revalidatePath('/admin/partners');
    revalidatePath('/[lang]/referanslar', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('deletePartner error:', error);
    return { success: false, error: error.message };
  }
}

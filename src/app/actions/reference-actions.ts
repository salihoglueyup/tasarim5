'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveReference(id: string | 'new', data: {
  title: string;
  slug: string;
  category: string;
  location: string;
  units: string;
  image?: string;
  published: boolean;
  order: number;
  content?: string | null;
  services?: string | null;
  gallery?: string | null;
  testimonialText?: string | null;
  testimonialAuthor?: string | null;
  stats?: string | null;
  coordinates?: string | null;
}) {
  try {
    if (id !== 'new') {
      await prisma.reference.update({
        where: { id },
        data,
      });
    } else {
      await prisma.reference.create({
        data,
      });
    }

    revalidatePath('/referanslar');
    revalidatePath('/admin/references');
    revalidatePath('/[lang]/referanslar', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('saveReference error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteReference(id: string) {
  try {
    await prisma.reference.delete({
      where: { id },
    });
    revalidatePath('/referanslar');
    revalidatePath('/admin/references');
    revalidatePath('/[lang]/referanslar', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('deleteReference error:', error);
    return { success: false, error: error.message };
  }
}

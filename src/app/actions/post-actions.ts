'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deletePost(id: string, lang: string) {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath(`/${lang}/admin/posts`);
    return { success: true };
  } catch (error) {
    console.error('Post deletion failed:', error);
    return { error: 'Yazı silinemedi.' };
  }
}

export async function savePost(id: string, data: any, lang: string) {
  try {
    let post;
    
    // Convert tags if they're sent as array, or keep as string
    const tagsStr = Array.isArray(data.tags) ? JSON.stringify(data.tags) : data.tags;
    // Tiptap sends content as HTML string, we'll store it as a string instead of JSON array to simplify rendering
    // since the current site expects JSON array, we can wrap it or just change the type.
    // For simplicity, we'll store the HTML string in the content field.
    const contentData = typeof data.content === 'string' ? JSON.stringify([{ type: 'html', body: data.content }]) : data.content;

    if (id === 'new') {
      post = await prisma.post.create({
        data: {
          slug: data.slug,
          title: data.title,
          description: data.description,
          content: contentData,
          image: data.image || '/images/hero-poster-v5.webp',
          pillar: data.pillar,
          tldr: data.tldr || '',
          tags: tagsStr || '[]',
          published: data.published,
          categoryId: data.categoryId,
          authorId: data.authorId,
          datePublished: new Date(),
          dateModified: new Date(),
        },
      });
    } else {
      post = await prisma.post.update({
        where: { id },
        data: {
          slug: data.slug,
          title: data.title,
          description: data.description,
          content: contentData,
          image: data.image,
          pillar: data.pillar,
          tldr: data.tldr,
          tags: tagsStr,
          published: data.published,
          categoryId: data.categoryId,
          authorId: data.authorId,
          dateModified: new Date(),
        },
      });
    }

    revalidatePath(`/${lang}/admin/posts`);
    revalidatePath(`/${lang}/blog`);
    
    return { success: true, post };
  } catch (error: any) {
    console.error('Post save failed:', error);
    if (error.code === 'P2002') {
      return { error: 'Bu slug (URL adresi) zaten kullanılıyor.' };
    }
    return { error: 'Yazı kaydedilemedi.' };
  }
}

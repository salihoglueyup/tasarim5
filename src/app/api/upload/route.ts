import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { assertAdmin } from '@/lib/auth';
import { validateUploadedFile, MIME_TO_EXT } from '@/lib/security/fileUploadValidator';

export async function POST(request: Request) {
  try {
    // 1. Yetki Kontrolü (Sadece ADMIN rolü yükleyebilir)
    const session = await assertAdmin();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Yetkisiz erişim. Sadece yöneticiler dosya yükleyebilir.' }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Dosya bulunamadı.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Faz 192: Dosya Yükleme Boyut (maks 5MB), MIME ve Magic-Byte Doğrulaması
    const validation = validateUploadedFile(file.size, file.type, buffer);
    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    // 5. Güvenli dosya adı: client'ın adı KULLANILMAZ; uzantı MIME'den türetilir.
    //    (Directory traversal / çift uzantı / HTML olarak sunulma riskini tamamen bitirir.)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = validation.extension || 'jpg';
    const filename = `${uniqueSuffix}.${ext}`;

    const path = join(process.cwd(), 'public/uploads', filename);

    await mkdir(join(process.cwd(), 'public/uploads'), { recursive: true });

    await writeFile(path, buffer);
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Dosya yüklenirken sunucu hatası oluştu.' }, { status: 500 });
  }
}

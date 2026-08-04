import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { assertAdmin } from '@/lib/auth';

// 5MB Limit
const MAX_FILE_SIZE = 5 * 1024 * 1024;
// Sadece Güvenli Görsel Formatları (SVG hariç, çünkü SVG içinde JS çalıştırılabilir)
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
// MIME -> güvenli uzantı (dosya adı client'tan alınmaz; uzantı burdan türetilir)
const MIME_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

/**
 * Magic-byte (dosya imzası) doğrulaması. Client'ın gönderdiği MIME (file.type)
 * sahtelenebilir; gerçek içerik baytları beklenen imzaya uymazsa reddedilir.
 * Yeniden adlandırılmış HTML/script yüklenip görsel gibi sunulmasını engeller.
 */
function detectImageType(buf: Buffer): 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
  if (buf.length >= 6 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return 'image/gif';
  // WEBP: "RIFF"...."WEBP"
  if (buf.length >= 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
  return null;
}

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

    // 2. Boyut Kontrolü (DoS Koruması)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'Dosya boyutu 5MB sınırını aşamaz.' }, { status: 400 });
    }

    // 3. Dosya Formatı (MIME Type) Kontrolü (RCE ve XSS Koruması)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Geçersiz dosya formatı. Sadece JPG, PNG, WEBP ve GIF yüklenebilir.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Magic-byte (dosya imzası) doğrulaması — client MIME'i sahtelenebilir.
    //    Gerçek içerik izin verilen bir görsel değilse veya bildirilen tiple uyuşmuyorsa reddet.
    const realType = detectImageType(buffer);
    if (!realType || realType !== file.type) {
      return NextResponse.json({ success: false, error: 'Dosya içeriği geçerli bir görselle uyuşmuyor.' }, { status: 400 });
    }

    // 5. Güvenli dosya adı: client'ın adı KULLANILMAZ; uzantı MIME'den türetilir.
    //    (Directory traversal / çift uzantı / HTML olarak sunulma riskini tamamen bitirir.)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = MIME_EXT[realType];
    const filename = `${uniqueSuffix}.${ext}`;

    const path = join(process.cwd(), 'public/uploads', filename);

    // Klasörün var olduğundan emin ol (varsa oluştur)
    const fs = require('fs');
    const dir = join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    await writeFile(path, buffer);
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Dosya yüklenirken sunucu hatası oluştu.' }, { status: 500 });
  }
}

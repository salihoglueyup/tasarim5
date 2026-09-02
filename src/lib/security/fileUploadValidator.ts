export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_IMAGE_MIMES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const;

export type AllowedImageMime = typeof ALLOWED_IMAGE_MIMES[number];

export const MIME_TO_EXT: Record<AllowedImageMime, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

/**
 * Magic-byte (dosya başlık imzası) denetimi
 */
export function detectMagicBytes(buf: Buffer): AllowedImageMime | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return 'image/jpeg';
  }
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return 'image/png';
  }
  if (buf.length >= 6 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
    return 'image/gif';
  }
  if (buf.length >= 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    return 'image/webp';
  }
  return null;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  extension?: string;
  detectedMime?: string;
}

/**
 * Faz 192: Dosya Yükleme Boyut ve MIME Tipi Doğrulayıcı (Maksimum 5 MB)
 */
export function validateUploadedFile(
  size: number,
  mimeType: string,
  buffer?: Buffer
): FileValidationResult {
  if (size <= 0) {
    return { valid: false, error: 'Dosya boş olamaz.' };
  }

  if (size > MAX_UPLOAD_SIZE) {
    return { valid: false, error: 'Dosya boyutu 5 MB sınırını aşamaz.' };
  }

  if (!ALLOWED_IMAGE_MIMES.includes(mimeType as AllowedImageMime)) {
    return {
      valid: false,
      error: 'Geçersiz dosya formatı. Yalnızca JPG, PNG, WEBP ve GIF dosyaları yüklenebilir.',
    };
  }

  if (buffer) {
    const magicMime = detectMagicBytes(buffer);
    if (!magicMime || magicMime !== mimeType) {
      return {
        valid: false,
        error: 'Dosya içeriği bildirilen formatla eşleşmiyor (Sahte dosya uzantısı tespiti).',
      };
    }
  }

  const extension = MIME_TO_EXT[mimeType as AllowedImageMime] || 'bin';
  return {
    valid: true,
    extension,
    detectedMime: mimeType,
  };
}

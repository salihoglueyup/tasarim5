import fs from 'fs';
import path from 'path';

export interface ImageCacheStats {
  cacheDirExists: boolean;
  totalFiles: number;
  totalSizeBytes: number;
  totalSizeFormatted: string;
}

export interface ImageCacheCleanResult extends ImageCacheStats {
  deletedFiles: number;
  freedBytes: number;
  freedFormatted: string;
}

const DEFAULT_IMAGE_CACHE_DIR = path.join(process.cwd(), '.next/cache/images');

/**
 * Faz 123: Next.js Görsel Önbelleği (Image Cache) İzleme ve Otomatik Temizleme
 */
export function inspectImageCache(cacheDir: string = DEFAULT_IMAGE_CACHE_DIR): ImageCacheStats {
  if (!fs.existsSync(cacheDir)) {
    return {
      cacheDirExists: false,
      totalFiles: 0,
      totalSizeBytes: 0,
      totalSizeFormatted: '0 B',
    };
  }

  let totalFiles = 0;
  let totalSizeBytes = 0;

  function walk(dir: string) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.isFile()) {
          totalFiles++;
          const stat = fs.statSync(fullPath);
          totalSizeBytes += stat.size;
        }
      }
    } catch {
      // Dizin erişim hatalarını yakala
    }
  }

  walk(cacheDir);

  return {
    cacheDirExists: true,
    totalFiles,
    totalSizeBytes,
    totalSizeFormatted: formatBytes(totalSizeBytes),
  };
}

export function cleanStaleImageCache(
  options: {
    cacheDir?: string;
    maxAgeDays?: number;
  } = {}
): ImageCacheCleanResult {
  const cacheDir = options.cacheDir || DEFAULT_IMAGE_CACHE_DIR;
  const maxAgeDays = options.maxAgeDays ?? 30;
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  const now = Date.now();

  const beforeStats = inspectImageCache(cacheDir);
  if (!beforeStats.cacheDirExists) {
    return {
      ...beforeStats,
      deletedFiles: 0,
      freedBytes: 0,
      freedFormatted: '0 B',
    };
  }

  let deletedFiles = 0;
  let freedBytes = 0;

  function prune(dir: string) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          prune(fullPath);
          // Boş kalan alt klasörleri temizle
          try {
            if (fs.readdirSync(fullPath).length === 0) {
              fs.rmdirSync(fullPath);
            }
          } catch {}
        } else if (entry.isFile()) {
          try {
            const stat = fs.statSync(fullPath);
            if (now - stat.mtimeMs > maxAgeMs) {
              fs.unlinkSync(fullPath);
              deletedFiles++;
              freedBytes += stat.size;
            }
          } catch {}
        }
      }
    } catch {}
  }

  prune(cacheDir);

  const afterStats = inspectImageCache(cacheDir);

  return {
    ...afterStats,
    deletedFiles,
    freedBytes,
    freedFormatted: formatBytes(freedBytes),
  };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

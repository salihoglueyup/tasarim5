import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

let isShuttingDown = false;

/**
 * Faz 197: Graceful Shutdown (SIGTERM & SIGINT Dinleyicisi)
 * Konteyner durdurulurken veya yeniden başlatılırken açıkta kalan DB ve Redis
 * bağlantılarını güvenli ve temiz bir şekilde kapatır.
 */
export function registerGracefulShutdown(): void {
  // Yalnızca sunucu tarafı Node.js ortamında dinle
  if (typeof window !== 'undefined' || !process || typeof process.on !== 'function') {
    return;
  }

  const handleShutdown = async (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`\n🛑 [Alo Yönetim] ${signal} sinyali alındı. Graceful shutdown başlatılıyor...`);

    // Zorunlu çıkış için emniyet zamanlayıcısı (5 saniye)
    const forceExitTimer = setTimeout(() => {
      console.warn('⚠️ [Alo Yönetim] Graceful shutdown zaman aşımına uğradı, zorla kapatılıyor.');
      process.exit(1);
    }, 5000);

    try {
      // 1. Prisma & PostgreSQL bağlantılarını kapat
      console.log('🔌 PostgreSQL ve Prisma bağlantıları sonlandırılıyor...');
      await prisma.$disconnect().catch((e) => console.warn('Prisma disconnect uyarısı:', e));

      // 2. Redis bağlantısını kapat
      if (redis && redis.status === 'ready') {
        console.log('🔌 Redis bağlantısı sonlandırılıyor...');
        await redis.quit().catch((e) => console.warn('Redis quit uyarısı:', e));
      }

      console.log('✅ [Alo Yönetim] Tüm kaynaklar başarıyla temizlendi. Süreç kapatılıyor.');
      clearTimeout(forceExitTimer);
      process.exit(0);
    } catch (err) {
      console.error('❌ [Alo Yönetim] Graceful shutdown sırasında hata:', err);
      clearTimeout(forceExitTimer);
      process.exit(1);
    }
  };

  // Birden fazla listener eklenmesini engelle
  if (!process.listenerCount('SIGTERM')) {
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  }
  if (!process.listenerCount('SIGINT')) {
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  }
}

// Otomatik kayıt
if (typeof window === 'undefined') {
  registerGracefulShutdown();
}

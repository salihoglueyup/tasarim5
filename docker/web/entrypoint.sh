#!/bin/sh
set -e

echo "🚀 [Alo Yönetim Web] Başlatma süreci devrede..."

# PostgreSQL bağlantısının tamamen hazır olmasını bekleyen döngü
MAX_RETRIES=20
RETRY_COUNT=0

echo "⏳ PostgreSQL veritabanının hazır olması bekleniyor..."

until node -e "
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 2000 });
pool.query('SELECT 1', (err, res) => {
  if (err) {
    process.exit(1);
  } else {
    pool.end();
    process.exit(0);
  }
});
" 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "⚠️ PostgreSQL bağlantısı zaman aşımına uğradı, sunucu başlatılıyor..."
    break
  fi
  echo "⏳ PostgreSQL hazırlanıyor ($RETRY_COUNT/$MAX_RETRIES)..."
  sleep 2
done

if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
  echo "✅ PostgreSQL bağlantısı başarıyla kuruldu!"
  echo "🔄 Veritabanı şeması doğrulanıyor (Prisma DB Push)..."
  npx prisma db push --accept-data-loss || echo "⚠️ Prisma DB Push tamamlanamadı ancak sunucu başlatılacak."
fi

echo "🌟 Next.js Production Sunucusu Başlatılıyor (Port: ${PORT:-3001})..."
exec node server.js "$@"

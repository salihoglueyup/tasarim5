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

  echo "🔍 Veritabanı içerik kontrolü yapılıyor..."
  NEED_SEED=$(node -e "
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 3000 });
    pool.query('SELECT (SELECT COUNT(*) FROM \"Post\") + (SELECT COUNT(*) FROM \"Reference\") as total', (err, res) => {
      pool.end();
      if (err || !res || !res.rows || parseInt(res.rows[0].total, 10) === 0) {
        console.log('YES');
      } else {
        console.log('NO');
      }
    });
  " 2>/dev/null || echo "YES")

  if [ "$NEED_SEED" = "YES" ]; then
    echo "🌱 [Alo Yönetim] Veritabanı boş tespit edildi, otomatik Master Seed çalıştırılıyor..."
    npx tsx prisma/seed.ts || echo "⚠️ Otomatik seed sırasında uyarı oluştu."
  else
    echo "✨ Veritabanı içerikleri mevcut, seed adımı atlandı."
  fi
fi

echo "🌟 Next.js Production Sunucusu Başlatılıyor (Port: ${PORT:-3001})..."
exec node server.js "$@"

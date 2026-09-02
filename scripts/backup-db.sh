#!/bin/bash
# ==============================================================================
# Faz 194: Alo Yönetim PostgreSQL Otomatik Veritabanı Yedekleme Betiği
# ==============================================================================

set -e

# Yapılandırma
BACKUP_DIR="${BACKUP_DIR:-/backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/aloyonetim_backup_${TIMESTAMP}.sql.gz"
RETENTION_DAYS=7

mkdir -p "${BACKUP_DIR}"

echo "📦 [Alo Yönetim] PostgreSQL Veritabanı Yedekleme Başlatılıyor..."
echo "⏰ Zaman: $(date)"

if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL ortam değişkeni bulunamadı. Yerel postgres bağlantısı deneniyor..."
  PGHOST="${PGHOST:-localhost}"
  PGPORT="${PGPORT:-5432}"
  PGUSER="${PGUSER:-postgres}"
  PGDATABASE="${PGDATABASE:-aloyonetim}"
  
  pg_dump -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" "$PGDATABASE" | gzip > "${BACKUP_FILE}"
else
  pg_dump "$DATABASE_URL" | gzip > "${BACKUP_FILE}"
fi

BACKUP_SIZE=$(ls -lh "${BACKUP_FILE}" | awk '{print $5}')
echo "✅ Yedekleme başarıyla tamamlandı: ${BACKUP_FILE} (Boyut: ${BACKUP_SIZE})"

# Eski yedeklerin temizlenmesi (7 günden eski yedekleri sil)
echo "🧹 ${RETENTION_DAYS} günden eski yedekler temizleniyor..."
find "${BACKUP_DIR}" -name "aloyonetim_backup_*.sql.gz" -mtime +${RETENTION_DAYS} -exec rm -f {} \;

echo "🎉 Yedekleme döngüsü tamamlandı."

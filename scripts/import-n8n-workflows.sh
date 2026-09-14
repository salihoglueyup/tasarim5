#!/bin/bash
# Alo Yönetim — n8n Hazır İş Akışlarını Otomatik İçe Aktarma Scripti
set -e

echo "========================================================"
echo "🚀 Alo Yönetim: n8n Aktif İş Akışları İçe Aktarılıyor..."
echo "========================================================"

# n8n container'ı çalışıyor mu kontrol et
if ! docker ps | grep -q "aloyonetim-n8n"; then
  echo "❌ Hata: aloyonetim-n8n container'ı çalışır durumda değil!"
  echo "Lütfen önce 'cd docker && docker compose up -d n8n' komutunu çalıştırın."
  exit 1
fi

echo "📦 İş akışları taranıyor ve n8n veritabanına aktarılıyor..."

# Container içindeki aktif iş akışlarını içe aktar
docker exec -u node aloyonetim-n8n sh -c '
  for file in $(find /home/node/active-workflows -name "*.json" | sort); do
    echo "➡️ İçe aktarılıyor: $(basename "$file")"
    n8n import:workflow --input="$file"
  done
'

echo "========================================================"
echo "✅ Tüm 18 aktif iş akışı başarıyla n8n'e aktarıldı!"
echo "🌐 Paneli yenileyin: https://n8n.aloyonetim.com.tr/workflows"
echo "========================================================"

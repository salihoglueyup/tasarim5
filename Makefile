# Alo Yönetim — Docker Kısayol Komutları
# Kullanım: make <komut>
#
# Örnek:
#   make up       → Servisleri başlat (yeni build olmadan)
#   make build    → Yeniden derleyerek başlat
#   make down     → Servisleri durdur
#   make logs     → Canlı logları izle
#   make restart  → Yeniden başlat (build olmadan)

COMPOSE = docker compose -f docker/docker-compose.yml --env-file .env

# ─── Temel Komutlar ───────────────────────────────────────────
up:
	$(COMPOSE) up -d

build:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart

# ─── Log & Durum ─────────────────────────────────────────────
logs:
	$(COMPOSE) logs -f

logs-web:
	$(COMPOSE) logs -f web

status:
	$(COMPOSE) ps

# ─── Veritabanı ──────────────────────────────────────────────
seed:
	npx prisma generate && npx tsx import-faqs.ts

db-push:
	npx prisma db push

# ─── Temizlik ────────────────────────────────────────────────
clean:
	$(COMPOSE) down --volumes --remove-orphans

.PHONY: up build down restart logs logs-web status seed db-push clean

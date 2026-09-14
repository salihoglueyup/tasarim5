# n8n Kimlik Bilgileri (Credentials) Yapılandırma Rehberi

Bu belge, n8n paneline (`https://n8n.aloyonetim.com.tr` veya `localhost:5678`) giriş yapıldığında oluşturulması gereken standart bağlantıları içerir.

Docker Compose iç ağında (`aloyonetim-network`) çalıştığımız için, dış IP veya domain yerine doğrudan **servis adları** kullanılır. Bu yöntem hem en yüksek performanslıdır hem de dışarıya port açma zorunluluğunu ortadan kaldırır.

---

## 1. PostgreSQL Bağlantısı

n8n Menü: **Credentials ➔ New ➔ PostgreSQL**

| Alan | Değer | Açıklama |
| :--- | :--- | :--- |
| **Credential Name** | `Alo Yönetim PostgreSQL` | İş akışlarında `postgres-cred` olarak referans verilir |
| **Host** | `postgres` | Docker Compose servis adıdır |
| **Database** | `aloyonetim` | Veritabanı adı |
| **User** | `alo_user` | Veritabanı kullanıcısı |
| **Password** | `.env` dosyasındaki `POSTGRES_PASSWORD` | PostgreSQL şifresi |
| **Port** | `5432` | Standart port |
| **SSL** | `disable` | Docker iç ağı güvenli olduğu için SSL kapalı |

---

## 2. Redis Bağlantısı

n8n Menü: **Credentials ➔ New ➔ Redis**

| Alan | Değer | Açıklama |
| :--- | :--- | :--- |
| **Credential Name** | `Alo Yönetim Redis` | İş akışlarında `redis-cred` olarak referans verilir |
| **Host** | `redis` | Docker Compose servis adıdır |
| **Port** | `6379` | Standart Redis portu |
| **Password** | `alo_redis_local_dev_2026` | `.env` dosyasındaki `REDIS_PASSWORD` |
| **Database** | `0` | Varsayılan veritabanı indisi |
| **SSL** | `false` | İç ağda SSL gerekmez |

---

## 3. E-Posta Gönderimi (SMTP / Resend)

n8n Menü: **Credentials ➔ New ➔ SMTP**

| Alan | Değer |
| :--- | :--- |
| **Credential Name** | `Alo Yönetim SMTP` |
| **Host** | `smtp.resend.com` *(veya kurumsal SMTP sunucunuz)* |
| **Port** | `465` (SSL) veya `587` (TLS) |
| **User** | `resend` *(veya kurumsal e-posta kullanıcı adı)* |
| **Password** | `.env` dosyasındaki `RESEND_API_KEY` veya SMTP şifresi |
| **SSL/TLS** | `true` |

---

## 4. Next.js Dahili HTTP İstekleri

Next.js sunucusuna n8n içinden istek atılırken hiçbir kimlik doğrulamaya gerek yoktur:
- URL: `http://web:3001/api/health`
- URL: `http://web:3001/api/seo/ping-all`
- URL: `http://web:3001/sitemap-index.xml`

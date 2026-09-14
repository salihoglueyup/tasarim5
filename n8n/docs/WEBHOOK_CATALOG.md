# n8n Webhook Endpoint & Payload Kataloğu

Next.js web uygulamamız ile n8n otomasyon motorumuz arasında haberleşmeyi sağlayan standart webhook uç noktaları:

---

## 1. Yeni Müşteri & Teklif Talebi (W3)

- **Webhook URL:** `https://n8n.aloyonetim.com.tr/webhook/yeni-talep`  
  *(Dahili: `http://n8n:5678/webhook/yeni-talep`)*
- **HTTP Yöntemi:** `POST`
- **İçerik Türü:** `application/json`
- **Örnek Gövde (Payload):**
  ```json
  {
    "type": "quote",
    "data": {
      "type": "quote",
      "name": "Ahmet Yılmaz",
      "phone": "+905321234567",
      "email": "ahmet@ornek.com",
      "service": "tesis-yonetimi",
      "district": "Kadıköy",
      "units": 120,
      "message": "120 dairelik site için yönetim ve güvenlik teklifi istiyoruz."
    }
  }
  ```

---

## 2. UptimeRobot Dış Kesinti Uyarısı (W14)

- **Webhook URL:** `https://n8n.aloyonetim.com.tr/webhook/uptimerobot-alert`
- **HTTP Yöntemi:** `POST`
- **İçerik Türü:** `application/json`
- **Örnek Gövde (Payload):**
  ```json
  {
    "monitorFriendlyName": "Alo Yönetim Canlı",
    "monitorURL": "https://aloyonetim.com.tr",
    "alertType": "Down",
    "alertDetails": "HTTP 502 Bad Gateway response received from origin"
  }
  ```

---

## 3. Sistem Kritik Hata & Çökme Bildirimi (W18)

- **Webhook URL:** `https://n8n.aloyonetim.com.tr/webhook/system-error`  
  *(Dahili: `http://n8n:5678/webhook/system-error`)*
- **HTTP Yöntemi:** `POST`
- **İçerik Türü:** `application/json`
- **Örnek Gövde (Payload):**
  ```json
  {
    "service": "aloyonetim-web",
    "route": "/api/teklif",
    "errorMessage": "PrismaClientKnownRequestError: Can't reach database server at postgres:5432",
    "severity": "CRITICAL",
    "timestamp": "2026-09-14T13:30:00Z"
  }
  ```

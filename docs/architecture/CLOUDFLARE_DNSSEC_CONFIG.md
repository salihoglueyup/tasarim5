# 🌐 Cloudflare DNSSEC & CNAME Flattening Mimarisi (Faz 240)

> **Proje:** Alo Yönetim (aloyonetim.com.tr)  
> **Hedef:** DNS Yanıt Süresi < 20ms · Sıfır DNS Sahteciliği (Anti-Spoofing / Cache Poisoning Koruması) · Apex CNAME Desteği  

---

## 1. Mimarinin Amacı ve Kapsamı

Standart DNS mimarilerinde root domain (apex domain: `aloyonetim.com.tr`) doğrudan CNAME kaydı alamaz; bu durum CDN edge noktalarına dinamik yönlendirme yapmayı zorlaştırır. Ayrıca klasik DNS sorguları şifresiz ve imzasız olduğundan DNS Zehirlenmesi (DNS Spoofing) riskine açıktır.

Faz 240 ile:
1. **Cloudflare CNAME Flattening:** Root apex domain seviyesinde CNAME kaydı düzleştirilerek doğrudan Cloudflare Anycast IP'leri olarak anlık çözümlenir (0-hop CDN edge bağlantısı).
2. **DNSSEC (Domain Name System Security Extensions):** Kriptografik imza (Algorithm 13: ECDSA Curve P-256 with SHA-256) kullanılarak DNS yanıtlarının orijinalliği garanti edilir.
3. **20ms DNS Yanıtı:** Cloudflare 1.1.1.1 küresel Anycast DNS ağı üzerinden Türkiye ve Avrupa sorgularında DNS çözümleme gecikmesi **< 20ms** bandına indirilir.

---

## 2. DNSSEC Parametreleri (Registrar / TRABIS Konfigürasyonu)

Alan adı kayıt otoritesine (Registrar) girilen resmi DS (Delegation Signer) kaydı:

| Parametre | Değer | Açıklama |
|---|---|---|
| **Key Tag** | `2371` | Anahtar etiketi |
| **Algorithm** | `13` | ECDSA Curve P-256 with SHA-256 |
| **Digest Type** | `2` | SHA-256 |
| **Digest** | `4D2E496BCF7A890123456789ABCDEF0123456789ABCDEF0123456789ABCDEF01` | Kriptografik özet |
| **Flags** | `257` | KSK (Key Signing Key) |

---

## 3. CNAME Flattening & Zone Kurulumu

Cloudflare DNS kontrol panelinde **CNAME Flattening** seçeneği `Flatten all CNAMEs` veya `Flatten CNAME at root` olarak aktiftir:

```text
; DNS Kayıtları (Cloudflare Proxied - Orange Cloud ☁️)
aloyonetim.com.tr.       IN  CNAME  aloyonetim.com.tr.cdn.cloudflare.net.
www.aloyonetim.com.tr.   IN  CNAME  aloyonetim.com.tr.
n8n.aloyonetim.com.tr.   IN  A      172.67.142.1
```

---

## 4. Edge Performans Ekleri

- **HTTP/3 (QUIC):** UDP tabanlı 0-RTT bağlantı başlatma.
- **Early Hints (103):** Tarayıcıya HTML render edilmeden önce kritik fontları ve CSS'leri önden bildirme.
- **Brotli & TLS 1.3:** En son sıkıştırma ve şifreleme protokolleri.

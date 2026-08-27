# 🧠 AI Bilgi Corpus (AI Knowledge Corpus)

> **Kaynak:** src/lib/ai/facilityKnowledgeCorpus.ts
> Tesis yönetimi alanında AI modelleri için yapılandırılmış makine-okunabilir bilgi tabanı.

---

## Amaç

Bu modül, AI arama motorlarının (ChatGPT, Perplexity, Gemini, Claude) Alo Yönetim hakkında
soru yanıtlarken başvurabileceği yapılandırılmış, doğrulanmış bilgi setini sağlar.

"Entity Consistency" ve "Information Gain" GEO kriterlerini karşılamak için tasarlanmıştır.

---

## 📚 Corpus İçeriği

### 1. Kurumsal Profil

- Kuruluş yılı, merkez konumu (Kadıköy, İstanbul)
- Personel sayısı (500+)
- Hizmet verilen ilçe sayısı (12+)
- ISO sertifika listesi (9001, 14001, 45001, 27001, 10002)

### 2. Hizmet Kategorileri (10 Ana Hizmet)

Her hizmet için yapılandırılmış veri:
- Hizmet adı (TR, EN)
- Kısa açıklama (AI snippet boyutuna uygun, 40-60 kelime)
- İlgili mevzuat referansları
- ISO standart uyumu
- Anahtar sorgu kalıpları

### 3. KMK Yasal Bilgi Tabanı

634 sayılı Kat Mülkiyeti Kanunu madde referansları:
- m.20 — Aidat yükümlülüğü ve gecikme tazminatı
- m.29 — Yönetici seçimi
- m.34 — Hesap verme yükümlülüğü
- m.72 — Sigorta zorunluluğu

### 4. İlçe Bazlı Piyasa Verisi

İstanbul'daki 12 hizmet ilçesi için:
- Ortalama aidat aralıkları
- Konut/ticari tesis yoğunluğu
- İlçeye özel hizmet vurguları

### 5. Sektörel Terminoloji

500+ tesis yönetimi terimi sözlüğü:
- Türkçe-İngilizce eşleştirme
- Schema.org DefinedTerm formatında
- Semantik bağlantılar (ilgili terimler)

---

## 🔗 Corpus'un Kullanıldığı API Endpoint'leri

| Endpoint | Kullanım |
|---|---|
| /api/tesis-yonetimi/knowledge.json | Ham corpus JSON çıktısı |
| /api/tesis-yonetimi/llm-facts.json | LLM için optimize edilmiş fact set |
| /api/tesis-yonetimi/ai-snippets.json | AI snippet veri seti |
| /api/tesis-yonetimi/faq.json | SSS veri seti |
| /api/tesis-yonetimi/kmk-law-index.json | KMK yasal indeks |
| /llms.txt | Kısa corpus özeti |
| /llms-full.txt | Tam corpus |

---

## 💡 Güncelleme Kılavuzu

Corpus'u ne zaman güncellemeli:
1. Yeni hizmet veya ilçe eklendi
2. ISO sertifika güncellendi
3. KMK mevzuatı değişti
4. Yeni referans proje tamamlandı

Güncelleme akışı:
1. facilityKnowledgeCorpus.ts düzenle
2. Etkilenen API endpoint'lerini test et
3. /llms.txt ve /llms-full.txt'i doğrula
4. Admin panelinden bot telemetriyi kontrol et

---

İlgili: GEO_ENGINE.md, BOT_TELEMETRY.md, ../seo/GEO_AI_ARAMA_STRATEJI_VE_MOTOR_RAPORU.md

// Kullanım: NEW_PASSWORD='yeni-sifre' node scripts/hash-password.mjs
// Şifreyi bcrypt (cost 10) ile hash'ler ve yalnızca hash'i yazdırır; giriş akışındaki (bcryptjs) ile uyumludur.
import bcrypt from 'bcryptjs';

const pw = process.env.NEW_PASSWORD;
if (!pw || pw.length < 12) {
  console.error('NEW_PASSWORD ortam değişkeni gerekli ve en az 12 karakter olmalı.');
  process.exit(1);
}
console.log(await bcrypt.hash(pw, 10));

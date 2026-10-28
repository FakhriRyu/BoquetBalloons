# 🌸 Pastel Bloom Atelier — Web Profile & Katalog Buket Balon

Website resmi dan katalog interaktif untuk **Pastel Bloom Atelier**, atelier kado buket balon dan bunga artistik. Dibangun menggunakan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**, diadaptasi langsung dari desain visual **Google Stitch** (`projects/653803566572066909`).

---

## ✨ Fitur Utama

1. **Hero & Brand Story**: Showcase buket balon estetik dengan floating trust badges ("Bisa Custom Nama", "PVC Tebal Anti Bocor 3-7 Hari", "Kemasan Box Aman").
2. **Keunggulan Produk**: 4 pilar kualitas atelier (Latex & PVC tebal, 100% handcrafted, free lettering & greeting card, packaging proteksi).
3. **Katalog Produk Interaktif**:
   - Filter kategori cepat: *Semua, Wisuda, Ulang Tahun, Anniversary, Opening Store*.
   - Modal detail produk (*Quick View*) dengan spesifikasi teknis dan rincian keunggulan.
   - Tombol pemesanan langsung terhubung ke WhatsApp dengan pesan terformat otomatis.
4. **Custom Order Calculator (Fitur Unggulan)**:
   - Pelanggan dapat memilih ukuran balon (18", 24", 36"), jenis balon (PVC crystal, pastel matte, chrome foil), jenis isian bunga (artificial silk, fresh flowers, preserved), serta aksesoris tambahan (LED fairy lights, boneka wisuda, pita satin).
   - Menghitung total estimasi biaya secara *real-time*.
   - Menghasilkan tautan pemesanan WhatsApp yang sudah merinci seluruh spesifikasi kustom yang dipilih.
5. **3 Langkah Pemesanan**: Alur pemesanan jelas dan mudah dipahami.
6. **Testimoni Pelanggan**: Ulasan asli pelanggan dengan bintang 5 dan momen acara.
7. **Pusat Bantuan (FAQ Accordion)**: Menjawab pertanyaan umum seputar durabilitas balon dan pengiriman sameday.
8. **Floating WhatsApp Button**: Tombol chat cepat di pojok kanan bawah dengan indikator status online aktif.
9. **SEO & Open Graph**: Dilengkapi metadata lengkap untuk tampilan pratinjau yang memikat saat tautan dibagikan ke media sosial / WhatsApp.

---

## 🚀 Menjalankan Secara Lokal

### 1. Prasyarat
* Node.js v18.18+ atau v20+ / v22+
* npm

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variable
Salin `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Sesuaikan nomor WhatsApp Anda pada baris:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```
*(Gunakan format angka internasional diawali dengan kode negara `62` tanpa tanda `+` atau spasi).*

### 4. Jalankan Server Dev
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🌐 Panduan Deployment ke Vercel

Website ini sudah dioptimalkan untuk zero-config deployment di **Vercel**.

### Cara 1: Menggunakan Vercel Dashboard (Rekomendasi)
1. Push repository ini ke akun **GitHub / GitLab / Bitbucket** Anda:
   ```bash
   git add .
   git commit -m "feat: complete Pastel Bloom bouquet catalog website"
   git remote add origin https://github.com/USERNAME/buketbalon.git
   git push -u origin main
   ```
2. Buka dashboard [vercel.com](https://vercel.com/) dan klik **"Add New Project"**.
3. Pilih repository **buketbalon**.
4. Di bagian **Environment Variables**, tambahkan:
   * Key: `NEXT_PUBLIC_WHATSAPP_NUMBER`
   * Value: `628xxxxxxxxxx` (Nomor WhatsApp Anda)
5. Klik **Deploy**! Website Anda akan aktif dalam hitungan detik.

### Cara 2: Menggunakan Vercel CLI
```bash
npm i -g vercel
vercel
```
Ikuti petunjuk di terminal untuk menghubungkan project Anda ke Vercel.

---

## 🎨 Palet Warna (Stitch Design DNA)

* **Primary**: `#a43073` (Deep Rose Pink)
* **Primary Container**: `#f472b6` (Pastel Blossom Pink)
* **Secondary**: `#00668a` (Ocean Blue)
* **Surface / Background**: `#fbf8fc` (Creamy Blush)
* **Fonts**: Epilogue (Headline) & Plus Jakarta Sans (Body)

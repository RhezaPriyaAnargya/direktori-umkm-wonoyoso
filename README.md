# 🏪 Direktori UMKM Dusun Wonoyoso

<div align="center">

**Platform digital untuk mempromosikan dan memperkenalkan UMKM lokal Dusun Wonoyoso kepada masyarakat luas.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)

</div>

---

## 📖 Deskripsi Proyek

**Direktori UMKM Wonoyoso** adalah website direktori usaha mikro, kecil, dan menengah (UMKM) berbasis web modern yang dibangun sebagai **Proker Individu KKN UPN Veteran Yogyakarta** di Dusun Wonoyoso, Desa Mojosari, Kecamatan Mojotengah, Kabupaten Wonosobo.

Website ini bertujuan untuk:
- 🌐 **Digitalisasi UMKM** — Memberikan profil digital bagi setiap pelaku usaha lokal
- 📢 **Promosi** — Memperluas jangkauan pemasaran UMKM ke masyarakat luas melalui internet
- 🗺️ **Navigasi** — Memudahkan calon pembeli menemukan lokasi UMKM melalui integrasi Google Maps
- 💬 **Konektivitas** — Menghubungkan calon pembeli langsung ke WhatsApp penjual

---

## 🛠️ Tech Stack

| Kategori              | Teknologi                    | Keterangan                                       |
| --------------------- | ---------------------------- | ------------------------------------------------ |
| **Frontend Framework**| Next.js 16 (App Router)      | Server-Side Rendering, routing berbasis file      |
| **UI Library**        | React 19                     | Komponen interaktif dengan Hooks                  |
| **Styling**           | Tailwind CSS v4              | Utility-first CSS framework                       |
| **Database**          | Supabase (PostgreSQL)        | Backend-as-a-Service untuk data UMKM & berita     |
| **Authentication**    | Supabase Auth                | Sistem login admin dengan email/password          |
| **File Storage**      | Supabase Storage             | Bucket `umkm-images` untuk foto produk            |
| **Image Processing**  | react-image-crop + heic2any  | Cropping gambar & konversi format HEIC            |
| **Analytics**         | Vercel Analytics             | Monitoring traffic dan performa website           |
| **Fonts**             | Google Fonts                 | Inter & Plus Jakarta Sans                         |
| **Deployment**        | Vercel                       | CI/CD otomatis dari GitHub                        |

---

## ✨ Fitur

### 🌍 Halaman Publik (User-Facing)

| Fitur | Deskripsi |
|-------|-----------|
| **Hero Carousel Dinamis** | Menampilkan hingga 5 UMKM secara acak setiap kali halaman dimuat |
| **Dashboard Statistik** | Total unit usaha dan jumlah kategori ditampilkan secara real-time |
| **Pencarian & Filter** | Pencarian real-time berdasarkan nama + filter berdasarkan kategori (Kuliner, Kerajinan & Jasa, Pertanian) |
| **Halaman Detail UMKM** | Profil lengkap: deskripsi, jam buka, lokasi, galeri foto, peta Google Maps |
| **Tombol WhatsApp** | CTA langsung ke chat WhatsApp penjual |
| **Media Sosial** | Tautan ke Instagram, TikTok, dan Facebook UMKM |
| **Galeri Foto** | Carousel interaktif untuk melihat foto produk |
| **UMKM Serupa** | Rekomendasi UMKM lain berdasarkan kategori yang sama |
| **Halaman Berita** | Menampilkan berita, promo, dan pengumuman terkait UMKM |
| **Responsive Design** | Tampilan optimal di desktop, tablet, dan mobile |
| **Bottom Navigation** | Navigasi bawah khusus tampilan mobile |

### 🔐 Admin Panel (CMS)

| Fitur | Deskripsi |
|-------|-----------|
| **Login Tersembunyi** | Halaman `/admin/login` tidak muncul di navigasi publik |
| **Dashboard Admin** | Ringkasan statistik + tabel daftar UMKM dengan aksi Edit & Hapus |
| **Tambah UMKM** | Form lengkap dengan upload gambar, cropping, dan multi-galeri |
| **Edit UMKM** | Form pre-filled untuk memperbarui data UMKM |
| **Hapus UMKM** | Penghapusan data permanen dengan konfirmasi |
| **Manajemen Berita** | CRUD berita/promo yang bisa dikaitkan dengan UMKM tertentu |
| **Image Cropper** | Cropping gambar langsung di browser sebelum upload |
| **Auto-Upload** | Foto otomatis di-upload ke Supabase Storage |
| **Panduan Admin** | Halaman tutorial video (YouTube embed) + langkah-langkah penggunaan |
| **Toast Notification** | Notifikasi sukses/error untuk setiap aksi |

---

## 📁 Struktur Proyek

```
direktori-umkm/
├── app/
│   ├── (public)/                # Route group halaman publik
│   │   ├── layout.js            # Layout publik (Navbar + Footer)
│   │   ├── page.js              # Homepage (Hero, Stats, Katalog)
│   │   ├── berita/
│   │   │   ├── page.js          # Daftar berita
│   │   │   └── [id]/            # Detail berita
│   │   └── umkm/
│   │       └── [id]/            # Detail UMKM (profil, peta, galeri)
│   ├── admin/
│   │   ├── layout.js            # Layout admin (sidebar navigation)
│   │   ├── page.js              # Dashboard admin
│   │   ├── login/               # Halaman login admin
│   │   ├── tambah/              # Form tambah UMKM baru
│   │   ├── edit/[id]/           # Form edit UMKM
│   │   ├── berita/              # Manajemen berita
│   │   │   ├── page.js          # Daftar berita (admin)
│   │   │   ├── tambah/          # Form tambah berita
│   │   │   └── edit/[id]/       # Form edit berita
│   │   └── panduan/             # Halaman panduan/tutorial
│   ├── layout.js                # Root layout (metadata, fonts, analytics)
│   └── globals.css              # Global styles & design tokens
│
├── components/
│   ├── Navbar.jsx               # Navigasi utama (scroll-aware)
│   ├── Footer.jsx               # Footer website
│   ├── HeroCarousel.jsx         # Hero carousel dinamis
│   ├── SearchFilter.jsx         # Komponen pencarian & filter
│   ├── UmkmCard.jsx             # Kartu UMKM untuk katalog
│   ├── ImageCarousel.jsx        # Carousel galeri foto produk
│   ├── MapEmbed.jsx             # Embed Google Maps
│   ├── ButtonWA.jsx             # Tombol hubungi WhatsApp
│   ├── KategoriUmkm.jsx         # Badge/filter kategori
│   ├── RelatedUmkm.jsx          # Rekomendasi UMKM serupa
│   ├── BeritaCard.jsx           # Kartu berita
│   ├── BottomNav.jsx            # Bottom navigation (mobile)
│   └── admin/
│       ├── UmkmForm.jsx         # Form UMKM (tambah/edit)
│       ├── BeritaForm.jsx       # Form berita (tambah/edit)
│       ├── ImageCropper.jsx     # Modal crop gambar
│       └── Toast.jsx            # Komponen notifikasi toast
│
├── lib/
│   ├── supabase.js              # Inisialisasi Supabase client
│   ├── umkm.js                  # Helper functions untuk data UMKM
│   ├── berita.js                # Helper functions untuk data berita
│   ├── cropImage.js             # Utility cropping gambar (canvas)
│   └── imageUtils.js            # Utility upload & konversi gambar
│
├── data/
│   └── umkm.json                # Data JSON awal (seed/backup)
│
├── public/
│   └── images/                  # Gambar statis lokal (legacy)
│
├── supabase-setup.sql           # SQL: Tabel UMKM + RLS policies
├── supabase-berita.sql          # SQL: Tabel Berita + RLS policies
├── supabase-storage.sql         # SQL: Storage bucket + policies
├── next.config.mjs              # Konfigurasi Next.js
├── package.json                 # Dependencies & scripts
└── .env.local                   # Environment variables (tidak di-commit)
```

---

## 🚀 Cara Menjalankan (Getting Started)

### Prasyarat

- **Node.js** v18 atau lebih baru
- **npm** (sudah termasuk saat install Node.js)
- Akun **Supabase** (gratis di [supabase.com](https://supabase.com))

### 1. Clone Repository

```bash
git clone https://github.com/<username>/direktori-umkm.git
cd direktori-umkm
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Buat project baru di [Supabase Dashboard](https://app.supabase.com)
2. Buka **SQL Editor** di Supabase, lalu jalankan SQL berikut **secara berurutan**:
   ```
   1. supabase-setup.sql     → Buat tabel UMKM + RLS policies + seed data
   2. supabase-storage.sql   → Buat storage bucket untuk gambar
   3. supabase-berita.sql    → Buat tabel berita + RLS policies
   ```
3. Buat user admin di **Authentication → Users → Invite User** (masukkan email & password)

### 4. Konfigurasi Environment Variables

Buat file `.env.local` di root project:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-kamu>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-kamu>
```

> 💡 Dapatkan ketiga nilai ini di **Supabase Dashboard → Settings → API**

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🗄️ Skema Database

### Tabel `umkm`

| Kolom          | Tipe Data     | Deskripsi                                    |
| -------------- | ------------- | -------------------------------------------- |
| `id`           | `TEXT` (PK)   | ID unik format `umkm-001`, `umkm-002`, dst. |
| `nama`         | `TEXT`         | Nama usaha                                   |
| `kategori`     | `TEXT`         | Kategori: Kuliner, Kerajinan & Jasa, Pertanian |
| `deskripsi`    | `TEXT`         | Deskripsi lengkap usaha                      |
| `foto`         | `TEXT`         | URL foto utama                               |
| `galeri`       | `TEXT[]`       | Array URL foto galeri                        |
| `jam_buka`     | `TEXT`         | Jam operasional                              |
| `lokasi`       | `TEXT`         | Alamat singkat                               |
| `wa`           | `TEXT`         | Nomor WhatsApp (format internasional)        |
| `gmaps_embed`  | `TEXT`         | URL iframe embed Google Maps                 |
| `gmaps_link`   | `TEXT`         | URL share Google Maps                        |
| `instagram`    | `TEXT`         | Username Instagram (nullable)                |
| `tiktok`       | `TEXT`         | Username TikTok (nullable)                   |
| `facebook`     | `TEXT`         | Nama halaman Facebook (nullable)             |
| `created_at`   | `TIMESTAMPTZ`  | Waktu data dibuat                            |

### Tabel `berita`

| Kolom        | Tipe Data     | Deskripsi                                   |
| ------------ | ------------- | ------------------------------------------- |
| `id`         | `UUID` (PK)   | ID unik auto-generated                      |
| `judul`      | `TEXT`         | Judul berita                                |
| `konten`     | `TEXT`         | Isi konten berita                           |
| `gambar`     | `TEXT`         | URL gambar berita (nullable)                |
| `umkm_id`    | `TEXT` (FK)    | Referensi ke UMKM terkait (nullable)        |
| `created_at` | `TIMESTAMPTZ`  | Waktu berita dibuat                         |

### Storage Bucket

| Bucket         | Akses                                         |
| -------------- | --------------------------------------------- |
| `umkm-images`  | **Public**: semua bisa lihat; **Auth**: upload/edit/hapus |

---

## 🔒 Keamanan (Row Level Security)

| Operasi       | Anonim (Publik) | Authenticated (Admin) |
| ------------- | :---: | :---: |
| **SELECT**    | ✅    | ✅    |
| **INSERT**    | ❌    | ✅    |
| **UPDATE**    | ❌    | ✅    |
| **DELETE**    | ❌    | ✅    |

- Kredensial sensitif (`SUPABASE_SERVICE_ROLE_KEY`) disimpan di `.env.local` dan **tidak pernah di-commit** ke repository.
- Halaman admin dilindungi oleh autentikasi Supabase Auth.

---

## 🌐 Deployment (Vercel)

Project ini di-deploy menggunakan **Vercel** dengan CI/CD otomatis dari GitHub.

### Langkah Deployment

1. Push repository ke GitHub
2. Import project di [Vercel Dashboard](https://vercel.com/new)
3. Set **Environment Variables** di Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy! 🚀

Setiap `git push` ke branch utama akan otomatis memicu build & deploy ulang.

---

## 📜 Perintah yang Tersedia

| Perintah          | Deskripsi                              |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Jalankan development server            |
| `npm run build`   | Build production bundle                |
| `npm run start`   | Jalankan production server             |
| `npm run lint`    | Cek kode dengan ESLint                 |

---

## 🗺️ Sitemap / Daftar Halaman

| Route                   | Deskripsi                        | Akses    |
| ----------------------- | -------------------------------- | -------- |
| `/`                     | Homepage (Hero, Statistik, Katalog UMKM) | Publik   |
| `/umkm/[id]`           | Detail profil UMKM               | Publik   |
| `/berita`               | Daftar semua berita/promo         | Publik   |
| `/berita/[id]`          | Detail berita                     | Publik   |
| `/admin/login`          | Halaman login admin               | Publik   |
| `/admin`                | Dashboard admin                   | Admin    |
| `/admin/tambah`         | Form tambah UMKM baru             | Admin    |
| `/admin/edit/[id]`      | Form edit UMKM                    | Admin    |
| `/admin/berita`         | Manajemen berita                  | Admin    |
| `/admin/berita/tambah`  | Form tambah berita                | Admin    |
| `/admin/berita/edit/[id]`| Form edit berita                 | Admin    |
| `/admin/panduan`        | Tutorial & panduan penggunaan     | Admin    |

---

## 👨‍💻 Developer

**Rheza Priya Anargya**
- NIM: 123230032
- Program: Proker Individu KKN UPN Veteran Yogyakarta
- Lokasi KKN: Dusun Wonoyoso, Desa Mojosari, Kec. Mojotengah, Kab. Wonosobo

---

## 📄 Lisensi

© 2026 Direktori UMKM Wonoyoso. Sobowomo 2026.

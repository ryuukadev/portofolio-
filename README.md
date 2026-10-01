# Portofolio I Kadek Wahyu Arta Pratama

> **Siswa RPL Kelas 11**
> Portofolio web modern, estetis, dan interaktif yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS.

## 🎯 Tentang Proyek

Situs ini adalah portofolio pribadi yang menampilkan kemampuan, proyek, dan cerita saya sebagai siswa Rekayasa Perangkat Lunak (RPL). Dibangun dengan fokus pada **desain modern**, **animasi interaktif** (squishy spring physics), dan **responsivitas penuh**.

## 🔧 Teknologi yang Digunakan

| Kategori        | Teknologi          |
|-----------------|--------------------|
| Framework       | Next.js 15 (App Router) |
| Bahasa          | TypeScript         |
| Styling         | Tailwind CSS 3     |
| Animasi         | CSS Transitions & Keyframes |
| Ikon            | Lucide Icons       |
| Tema            | Next Themes (Dark/Light) |
| Notifikasi      | Sonner             |
| Confetti        | Canvas Confetti    |

## 🎨 Fitur Unggulan

- **🌙 Mode Gelap/Terang** — dengan animasi flip yang halus
- **✨ Glassmorphism UI** — kartu transparan dengan efek blur
- **🪄 Squishy Spring Physics** — semua interaksi menggunakan CSS transitions yang halus
- **🎭 Avatar Interaktif** — berputar dan melompat saat disentuh
- **🎉 Efek Confetti** — celebrasi saat formulir kontak dikirim
- **📱 Responsif 100%** — mobile-first design yang sempurna di semua perangkat
- **🎨 Tema High-Contrast Monokrom** — hitam & putih purna, tidak ada warna

## 🏗️ Memulai

```bash
# Kloning repositori
git clone https://github.com/ryuukadev/portfolio.git

# Masuk ke direktori
cd portfolio

# Instal dependensi
npm install

# Jalankan di mode pengembangan
npm run dev

# Buka http://localhost:3000
```

## 📋 Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx       # Layout utama dengan ThemeProvider
│   ├── page.tsx         # Halaman beranda
│   ├── template.tsx     # Animasi transisi halaman
│   └── globals.css     # Gaya global + gradient mesh
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation floating
│   │   ├── BackgroundPattern.tsx # Efek latar belakang interaktif
│   │   └── Footer.tsx          # Footer dengan back-to-top
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   ├── Badge.tsx
│   │   ├── InteractiveAvatar.tsx
│   │   ├── BackToTop.tsx
│   │   └── sonner.tsx
│   └── hooks/
│       └── use-mobile.tsx       # (Opsional)
├── lib/
│   ├── data.tsx          # Data pribadi, proyek, keterampilan
│   ├── types.ts          # Interface TypeScript
│   └── utils.ts          # Utilitas (cn, springConfig)
└── types/
    └── canvas-confetti.d.ts
```

## 📄 Skema Warna

- **Latar Belakang:** Hitam purna (`bg-neutral-950`) dengan mesh radial mono
- **Aksent Utama:** Hitam / putih tinggi kontras (tanpa warna)
- **Border:** Kaca translusen (`border-white/10`, `border-black/5`)
- **Bayangan:** `shadow-xl` + tekstur hitam/putih

## 🧪 Build Produksi

```bash
npm run build
npm start
```

## 📬 Kontak

- **Email:** dewahyuwork@gmail.com
- **GitHub:** [@ryuukadev](https://github.com/ryuukadev)
- **Lokasi:** Klungkung, Bali, Indonesia

---

*Dibuat dengan ❤️ dan banyak kopi di Bali, Indonesia ☕*

# ☕ Seulawah.Co - Beachfront Cafe & Resto Landing Page

![Seulawah.Co Preview](/public/images/hero.png)

> **Website resmi & landing page interaktif Seulawah.Co** — Cafe & Resto pinggir laut terbaik di Meulaboh, Aceh Barat. Menikmati kopi khas, kuliner lezat, live music, dan pemandangan matahari terbenam (sunset) langsung di tepi pantai.

---

## 🌟 Fitur Utama

- 🌅 **Hero Section Interaktif**: Tampilan visual beachfront estetik dengan rating badge dan CTA cepat.
- 🌓 **Dark Mode & Light Mode**: Dukungan perpindahan tema gelap/terang secara mulus melalui context API.
- 📋 **Menu Katalog & Filter Kategori**: Eksplorasi menu makanan, minuman, dan cemilan favorit dengan visual menarik.
- 🛒 **Interactive Cart & Drawer**: Keranjang belanja interaktif untuk memilih menu pesanan secara real-time.
- 💬 **Order via WhatsApp**: Integrasi pemesanan dan reservasi langsung terhubung ke WhatsApp.
- 📸 **Atmosphere Gallery**: Galeri visual suasana cafe saat sore dan malam hari.
- 📍 **Lokasi & Google Maps Embed**: Petunjuk arah langsung, jam operasional, dan peta interaktif.
- ⏰ **Peak Hours Tracker**: Informasi jam ramai dan waktu terbaik untuk berkunjung.
- 📱 **Fully Responsive**: Desain optimal di semua perangkat (Desktop, Tablet, & Mobile) dengan animasi halus bertenaga **Framer Motion**.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`CartContext`, `ThemeContext`)

---

## 🚀 Memulai (Getting Started)

### Prasyarat
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 18+ disarankan)
- Git & npm / pnpm / yarn

### Instalasi & Menjalankan Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/hafisakbar/seulawah.co.git
   cd seulawah-co
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka browser dan akses `http://localhost:5173`.

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

5. **Preview hasil build produksi**:
   ```bash
   npm run preview
   ```

---

## 📁 Struktur Folder

```text
seulawah-co/
├── public/               # Asset statis publik (gambar menu, icon, hero banner)
│   ├── images/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/           # Asset internal komponen
│   ├── components/       # Komponen UI
│   │   ├── AtmosphereGallery.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── Experience.jsx
│   │   ├── FinalCTA.jsx
│   │   ├── FloatingWhatsApp.jsx
│   │   ├── Hero.jsx
│   │   ├── Location.jsx
│   │   ├── MenuHighlight.jsx
│   │   ├── Navbar.jsx
│   │   ├── PeakHours.jsx
│   │   └── SocialProof.jsx
│   ├── context/          # State management (Theme & Cart)
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── App.jsx           # Main App component
│   ├── index.css         # Styling global & Tailwind config
│   └── main.jsx          # Entry point aplikasi
├── package.json
├── tailwind.config.js
└── vite.config.js
```



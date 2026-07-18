# Gantiin

**Konverter file online, gratis, dan 100% client-side untuk Indonesia.**

Upload file → pilih format → download hasil. Tidak ada upload ke server, tidak perlu registrasi, dan tidak ada batasan pemakaian. Semua konversi terjadi langsung di browser Anda.

## Fitur

| Kategori | Fitur | Status |
|----------|-------|--------|
| **PDF** | PDF → Teks | ✅ |
| | PDF → Gambar (PNG/JPG, pilih halaman) | ✅ |
| | Merge PDF (multi-file, reorder) | ✅ |
| | Split PDF (pilih range halaman) | ✅ |
| **Gambar** | PNG ↔ JPG ↔ WebP | ✅ |
| | Resize & Kompres | ✅ |
| | HEIC → JPG/PNG | ✅ |
| | SVG → PNG/JPG | ✅ |
| | Gambar → PDF | ✅ |
| | Gambar → Teks (OCR) | ✅ |
| | Gambar → DOC (OCR ke Word) | ✅ |
| | SVG → PDF | ✅ |
| **Lainnya** | Dark mode | ✅ |
| | Drag & drop upload | ✅ |
| | Deteksi magic bytes | ✅ |
| | 100% client-side | ✅ |
| | Static export | ✅ |

## Tech Stack

| Teknologi | Keterangan |
|-----------|------------|
| Next.js 16 | App Router, static export (`output: 'export'`) |
| React 19 | Server & Client components |
| TypeScript | Strict mode |
| Tailwind CSS v4 | CSS-first, no `tailwind.config.js` |
| shadcn/ui (Base UI) | Komponen UI (`render` prop, bukan `asChild`) |
| pdfjs-dist 6 | Ekstraksi teks & render PDF (lazy load, WASM worker) |
| @cantoo/pdf-lib | Manipulasi PDF (merge/split) |
| Tesseract.js 7 | OCR (WASM, `ind+eng`) |
| docx | Generate dokumen Word (.docx) |
| JSZip | ZIP output (PDF→Gambar multi-file) |
| heic-to | HEIC → JPG (WASM lazy load) |
| Canvas API + @jsquash/webp | Konversi gambar (fallback WebP) |
| Umami | Analytics self-hosted |

## Halaman

| Route | Konten |
|-------|--------|
| `/` | Landing page |
| `/konversi` | Universal converter (semua format) |
| `/pdf` | Konversi PDF |
| `/image` | Konversi gambar |
| `/merge` | Merge PDF |
| `/dukung` | Donasi via Trakteer |

## Memulai

```bash
# Install dependencies
npm install

# Copy aset pdf.js (standard fonts)
npx tsx scripts/copy-pdf-assets.mjs

# Development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
# Build static export
npm run build

# Output di folder out/
# Deploy ke Vercel, Cloudflare Pages, atau static hosting lainnya
```

Project dikonfigurasi untuk **static export** (`output: 'export'`). Dapat di-deploy tanpa server Node.js.

## Struktur Project

```
src/
├── app/                    # Pages & layouts
│   ├── dukung/            # Donasi
│   ├── image/             # Konversi gambar
│   ├── konversi/          # Universal converter
│   ├── merge/             # Merge PDF
│   └── pdf/               # Konversi PDF
├── components/
│   ├── convert/           # UniversalConverter, ConversionOptions, dll
│   ├── landing/           # Hero, Features, SupportSection
│   ├── layout/            # Header, Footer, ThemeToggle
│   ├── upload/            # DropZone, FilePreview
│   └── ui/               # shadcn/ui components
├── hooks/                 # useFileUpload, useConversion
└── lib/
    └── conversions/       # Registry, engine, image.ts, pdf.ts
```

## Donasi

Dukung Gantiin tetap gratis: [trakteer.id/allbee/tip](https://trakteer.id/allbee/tip)

## Lisensi

[MIT](LICENSE)

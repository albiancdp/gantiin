# Katalog Konversi Gantiin

## Format Input yang Didukung

| Format | Deteksi | Input | Output | Keterangan |
|--------|---------|-------|--------|------------|
| PDF | ✅ magic bytes | ✅ pdfjs-dist v6 | ✅ teks, gambar, split, merge | Error dibedain: encrypted / corrupt / unsupported |
| PNG | ✅ magic bytes | ✅ canvas | ✅ semua format gambar + PDF + TXT + DOCX + Base64 | |
| JPEG/JPG | ✅ magic bytes | ✅ canvas | ✅ sama seperti PNG | Juga terima `.jfif` |
| WebP | ✅ magic bytes | ✅ canvas | ✅ sama seperti PNG | |
| GIF | ✅ magic bytes | ✅ canvas (frame 1) | ✅ sama seperti PNG | Hanya frame pertama untuk animasi |
| BMP | ✅ magic bytes | ✅ canvas | ✅ sama seperti PNG | |
| TIFF | ✅ magic bytes | ✅ canvas (Chrome/Safari) | ✅ semua format gambar | Firefox tidak support TIFF di `<img>` |
| HEIC/HEIF | ✅ magic bytes (`heic`/`heif`/dll) | ✅ heic-to WASM → resolveImageData | ✅ semua format gambar + PDF + TXT + DOCX + Base64 | Resize/kompres/PDF semua jalan via resolveImageData |
| SVG | ✅ MIME type | ✅ rasterisasi 2x | ✅ PNG, JPG, PDF, TXT, DOCX, Base64 | Output selalu raster |
| AVIF | ✅ magic bytes | ✅ canvas | ✅ sama seperti PNG | |
| ICO | ✅ magic bytes | ✅ canvas | ✅ sama seperti PNG | |
| TGA | ✅ magic bytes+ext | ✅ decoder custom (type 2/3/10) | ✅ sama seperti PNG | Dekoder handle uncompressed + RLE |
| PPM | ✅ magic bytes (`P6\n`) | ✅ decoder custom (P6/P5/P3/P2) | ✅ sama seperti PNG | Binary (P6/P5) dan ASCII (P3/P2) |

## Output Format — Ganti Format

| Format | Encoder | Status |
|--------|---------|--------|
| **JPEG** | Canvas `toBlob` + white fill | ✅ |
| **PNG** | Canvas `toBlob` | ✅ |
| **WebP** | Canvas `toBlob` native / `@jsquash/webp` fallback | ✅ |
| **GIF** | Manual (palette 256 + LZW) | ✅ Static only |
| **BMP** | Manual (24-bit uncompressed) | ✅ |
| **TIFF** | Manual (RGB uncompressed) | ✅ |
| **ICO** | Manual (32-bit BGRA) | ✅ |
| **TGA** | Manual (24-bit uncompressed type 2) | ✅ |
| **PPM** | Manual (P6 binary RGB) | ✅ |
| **AVIF** | `@jsquash/avif` WASM | ✅ |
| EPS | ❌ | ❌ Belum ada encoder PostScript |
| PSD | ❌ | ❌ Belum ada encoder Photoshop |
| ODD | ❌ | ❌ Tidak dikenal |
| SVG | ❌ | ❌ Raster→vektor butuh tracing |

## Pipeline per Format Input

```
INPUT → [detect] → [load] → [process] → [encode] → OUTPUT
```

### Image Raster (PNG, JPEG, WebP, GIF, BMP, TIFF, AVIF, ICO)
```
detect(magic bytes) → resolveImageData → canvas → encode(target format) → blob
```

### HEIC
```
detect(ftyp heic) → heic-to(WASM) → resolveImageData → canvas → encode → blob
```

### TGA
```
detect(bytes + ext) → decodeTGA(buffer) → ImageData → canvas → encode → blob
```
Decoder support: type 2 (uncompressed RGB), type 3 (grayscale), type 10 (RLE)

### PPM
```
detect(P6\n) → decodePPM(file) → ImageData → canvas → encode → blob
```
Support: P6 (binary RGB), P5 (binary grayscale), P3 (ASCII RGB), P2 (ASCII grayscale)

### SVG
```
detect(MIME type) → rasterize(2x canvas) → encode → blob
```

### PDF
```
detect(%PDF-) → pdfjs-dist (teks/gambar) or @cantoo/pdf-lib (split/merge) → blob
```

## Error Handling (PDF)

| Kode | Penyebab | Pesan |
|------|----------|-------|
| `PDF_ENCRYPTED` | PDF dipassword | "PDF terproteksi password tidak bisa dikonversi" |
| `PDF_CORRUPT` | Struktur PDF rusak | "File PDF rusak atau tidak valid" |
| `PDF_UNSUPPORTED` | Fitur ga didukung pdfjs | "Format PDF ini belum didukung. Coba gunakan PDF versi lain" |

## Catatan Teknis

- **resolveImageData()** — fungsi sentral yang routing TGA/PPM/HEIC ke decoder custom, sisanya ke `loadImage` standar
- **Semua converter** (`imageToCanvas`, `resizeImage`, `compressImage`, `convertImageToPdf`) pakai `resolveImageData`
- **Canvas `toBlob`** mendukung: `image/png`, `image/jpeg`, `image/webp`
- **Manual encoder** untuk GIF, BMP, TIFF, ICO, TGA, PPM — murni JS, tanpa dependensi
- **WASM encoder** untuk AVIF via `@jsquash/avif`; WebP via `@jsquash/webp` (fallback)
- **Output GIF** hanya static (1 frame) — LZW compression, palette max 256 warna
- **TGA input** tidak bisa di-render browser — pakai custom binary decoder
- **PPM input** format teks/binary sederhana — pakai custom parser
- **TIFF input** tidak didukung Firefox — Chrome/Safari bisa render via `<img>`
- **JFIF** terdeteksi sebagai JPEG (magic bytes sama) — `.jfif` ada di ACCEPT_ALL
- **HEIF brand** (`heif`, `heix`, dll) terdeteksi sebagai HEIC — sudah termasuk di `HEIC_BRANDS`
- **Tests** — 23 unit test (Vitest + happy-dom) untuk decoder, encoder, round-trip, detectFileType, registry

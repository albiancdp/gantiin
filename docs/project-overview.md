# Project Overview

## Project Name
**Gantiin** — Free File Converter

## Tagline
"Gantiin aja, gampang kok!"

## Goals
1. **Menyediakan file converter gratis** — Tanpa batasan harian, tanpa registrasi wajib
2. **Menjaga privasi user** — File diproses di browser (client-side), tidak diupload ke server
3. **Membangun komunitas** — Melalui model donation-based, menjalin hubungan dengan user
4. **Mencapai 10,000 MAU** dalam 6 bulan pertama
5. **Mendapatkan revenue Rp 5-10 juta/bulan** dari donasi dalam 6 bulan

## Target Users
- **Primary:** Indonesian consumers (usia 18-35), mahasiswa & pekerja kantoran
- **Secondary:** Freelancer, content creator, small business owner
- **Use Case:** Konversi PDF, gambar, dokumen untuk kebutuhan sehari-hari

## Scope

### In Scope
- PDF → Text/Word conversion
- Image format conversion (PNG↔JPG↔WebP, SVG→PNG/JPG)
- HEIC → JPG conversion (iPhone photos)
- PDF merge & split
- Image resize & compress
- Drag & drop upload
- Dark/Light mode
- Mobile responsive design
- Donation button (Saweria/Buy Me a Coffee)
- SEO optimized landing page

### Out of Scope
- Video conversion (terlalu besar untuk client-side)
- Audio conversion
- User accounts / authentication
- Cloud storage / file history
- Batch processing (MVP)
- API for third-party integration

## Tech Stack
- **Frontend:** Next.js 16 (App Router, static export) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + Shadcn/ui
- **State Management:** Zustand
- **Validation:** Zod
- **Conversion Engine:** Client-side (Browser APIs + WASM, lazy-loaded)
  - PDF extract/render: pdfjs-dist 6.x
  - PDF merge/split/create: @cantoo/pdf-lib
  - HEIC → JPG: heic-to (WASM)
  - Image: Canvas API + @jsquash/webp (fallback Safari)
  - Processing: Web Workers + OffscreenCanvas
- **Hosting:** Vercel (free tier)
- **Analytics:** Umami (self-hosted: umami.alltech.web.id)
- **Donation:** Saweria / Buy Me a Coffee

## Constraints
- **Budget:** Rp 0 untuk infrastructure (free tier only)
- **Timeline:** 8 minggu (MVP ready)
- **Technical:** Browser-based conversion (no server), max file 50MB
- **Regulatory:** Compliance with Indonesian data privacy (PDP Law)

## Success Criteria
| Metric | Target (6 bulan) |
|--------|------------------|
| Monthly Active Users | 10,000 |
| Conversion Rate (visitor → used) | 60% |
| Average Session Duration | > 2 menit |
| Return User Rate | > 30% |
| Donation Revenue | Rp 5-10 juta/bulan |
| Page Load Time | < 2 detik |
| Conversion Time (file) | < 5 detik (file < 10MB) |

## Brand Identity
- **Logo:** Icon "G" dengan panah konversi (→)
- **Warna:** 
  - Primary: #6366F1 (Indigo)
  - Secondary: #10B981 (Emerald)
  - Dark: #0F172A
  - Light: #FFFFFF
- **Font:** Inter (body), JetBrains Mono (code/stats)
- **Tone:** Friendly, approachable, Indonesian slang yang relatable

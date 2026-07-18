# Folder Structure

> Struktur aktual per Sprint 2.5 (19 Juli 2026).

```
convertkan/
├── .ai/                              # AI workflow framework (not deployed)
├── docs/                             # Documentation (not deployed)
├── public/
│   ├── pdfjs/standard_fonts/         # pdf.js fonts (generated postinstall, gitignored)
│   └── favicon.ico
├── scripts/
│   └── copy-pdf-assets.mjs           # postinstall: copy pdf.js assets ke public/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (fonts, ThemeProvider, Header/Footer, Toaster)
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css               # Tailwind v4 theme + brand tokens (CSS-first)
│   │   ├── error.tsx                 # Global error boundary
│   │   ├── sitemap.ts                # Generated sitemap.xml
│   │   ├── robots.ts                 # Generated robots.txt
│   │   ├── konversi/
│   │   │   └── page.tsx              # Universal converter (semua tipe file)
│   │   ├── pdf/
│   │   │   └── page.tsx              # PDF tools (allowedTypes: pdf)
│   │   ├── image/
│   │   │   └── page.tsx              # Image tools — Sprint 3 (ComingSoon)
│   │   └── merge/
│   │       └── page.tsx              # PDF merge — Sprint 4 (ComingSoon)
│   ├── components/
│   │   ├── ui/                       # shadcn/ui (Base UI)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── sonner.tsx
│   │   ├── upload/
│   │   │   ├── DropZone.tsx          # Drag & drop + click-to-browse + keyboard
│   │   │   └── FilePreview.tsx       # Preview (PDF thumbnail / image object URL)
│   │   ├── convert/
│   │   │   ├── UniversalConverter.tsx # Orchestrator: upload → opsi → konversi → hasil
│   │   │   ├── ConversionOptions.tsx  # Grid "Bisa dikonversi ke:" (dari registry)
│   │   │   ├── ConvertProgress.tsx    # Progress bar + status (aria-live)
│   │   │   └── ConvertResult.tsx      # Hasil + download + copy + reset
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── CtaSection.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Sticky header + mobile Sheet menu
│   │   │   ├── Footer.tsx            # Links + tombol donasi Saweria
│   │   │   ├── ThemeToggle.tsx       # Sun/Moon (CSS-based, tanpa setState di effect)
│   │   │   └── Container.tsx
│   │   ├── ComingSoon.tsx            # Placeholder halaman belum rilis
│   │   └── theme-provider.tsx        # next-themes wrapper
│   ├── lib/
│   │   ├── conversions/
│   │   │   ├── registry.ts           # SOURCE OF TRUTH: tipe file → opsi konversi
│   │   │   ├── engine.ts             # convertFile() routing + progress
│   │   │   ├── pdf.ts                # pdf.js lazy-load: extractTextFromPdf, renderPdfThumbnail
│   │   │   └── types.ts              # ConversionType, ConversionResultData
│   │   ├── validations.ts            # Magic bytes detection + size validation + formatFileSize
│   │   ├── errors.ts                 # AppError + pesan error Bahasa Indonesia
│   │   ├── download.ts               # downloadBlob (native <a download>) + replaceExtension
│   │   ├── constants.ts              # siteConfig, MAX_FILE_SIZE, ACCEPT_* types
│   │   └── utils.ts                  # cn()
│   └── hooks/
│       ├── useFileUpload.ts          # File selection + validasi
│       └── useConversion.ts          # Status/progress/result/error konversi
├── next.config.ts                    # output: 'export', images.unoptimized
├── components.json                   # shadcn/ui config (style base-nova)
├── package.json                      # postinstall → copy-pdf-assets.mjs
├── tsconfig.json                     # TypeScript strict
├── .gitignore                        # Termasuk /public/pdfjs (generated)
└── README.md
```

## Key Files Description

### Configuration Files
| File | Purpose |
|------|---------|
| `next.config.ts` | Static export (`output: 'export'`) |
| `src/app/globals.css` | Tailwind v4 CSS-first config + brand color tokens (tidak ada tailwind.config) |
| `tsconfig.json` | TypeScript strict mode |
| `components.json` | shadcn/ui config — style `base-nova` (Base UI, bukan Radix) |

### Source Files
| Directory | Purpose |
|-----------|---------|
| `src/app/` | Next.js App Router pages (semua static) |
| `src/components/ui/` | shadcn/ui base components |
| `src/components/upload/` | File upload components |
| `src/components/convert/` | Universal converter flow |
| `src/components/landing/` | Landing page sections |
| `src/lib/conversions/` | Core conversion logic + registry |
| `src/hooks/` | Custom React hooks |

### Belum Ada (Sprint Berikutnya)
| Directory/File | Rencana |
|----------------|---------|
| `src/lib/conversions/image.ts` | Sprint 3 — Canvas image conversion |
| `src/lib/analytics.ts` | Sprint 4 — Umami helper |
| `src/store/` | Zustand stores (jika diperlukan; theme sudah via next-themes) |
| `workers/` | Web Workers kustom (pdf.js punya worker internal sendiri) |

### Tidak Dipakai
| Item | Reason |
|------|--------|
| `prisma/`, `docker-compose.yml`, `Dockerfile` | No database, no server (static site) |
| `tailwind.config.ts` | Tailwind v4 memakai CSS-first config |
| `file-saver` | Diganti native `<a download>` |

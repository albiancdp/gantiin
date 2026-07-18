<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Gantiin — Project Context

Konverter file online, gratis, 100% client-side untuk Indonesia.

## Stack

- **Next.js 16** (static export, `output: 'export'`) + React 19 + TypeScript strict
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`)
- **shadcn/ui (Base UI)** — komposisi via `render={<Link/>}`, bukan `asChild`. Saat Button jadi link, tambah `nativeButton={false}`.
- **pdfjs-dist 6** — lazy load (`new URL(..., import.meta.url)` worker). Cleanup via `loadingTask.destroy()` (bukan `doc.destroy()`).
- **@cantoo/pdf-lib** — PDF manipulation (merge/split)
- **Tesseract.js 7** — OCR (WASM, lazy load, `ind+eng`)
- **docx** — DOCX generation (Gambar→DOC)
- **JSZip** — ZIP output (PDF→Gambar multi-file)
- **heic-to** — HEIC→JPG (WASM lazy load)
- **Canvas API + @jsquash/webp** — image conversion (fallback WebP if native unavailable)
- **Umami self-hosted** — analytics (umami.alltech.web.id)

## Key Conventions

- **UI labels in Bahasa Indonesia** — "Mulai Konversi", "Bisa dikonversi ke:", "Segera"
- **No `setState` inside `useEffect`** — lint rule `react-hooks/set-state-in-effect`. Use `useMemo` + cleanup instead.
- **Universal Converter Flow** — all pages route through `UniversalConverter.tsx` (upload → detect → pick option → convert → result)
- **Registry** (`src/lib/conversions/registry.ts`) is source of truth. Add new conversion = add entry + engine + set `implemented:true`.

## Gotchas

| Issue | Fix |
|-------|-----|
| Base UI uses `render` prop, not `asChild` | Use `render={<Link href="..."/>}` |
| Button-as-link needs `nativeButton={false}` | Pass to prevent rendering `<button>` inside `<a>` |
| pdfjs-dist v6: `doc.destroy()` doesn't exist | Use `loadingTask.destroy()` |
| `setState` in `useEffect` triggers lint error | Move to `useMemo` or event handler |
| Tailwind v4: CSS-first, no `tailwind.config.js` | Use `@theme` in CSS file |
| Tesseract.js v7: word data via `blocks: true` | `data.words` tidak ada di top-level; pakai `data.blocks[].paragraphs[].lines[].words[]` |
| docx library: `Paragraph` dan `TextRun` class | `children: ParagraphChild[]` — `TextRun`, `ImageRun` |

## Halaman Live

| Route | Konten |
|-------|--------|
| `/` | Landing page |
| `/konversi` | Universal converter (all file types) |
| `/pdf` | Konversi PDF |
| `/image` | Konversi gambar |
| `/merge` | Merge PDF |
| `/dukung` | Donasi via Trakteer |

## Completed Work

| Sprint | What |
|--------|------|
| S1 | Scaffold, theme, layout, landing page, dark mode, SEO |
| S2 | DropZone, FilePreview, validasi magic bytes, PDF→Teks, pdf.js lazy |
| S2.5 | Registry, ConversionOptions, UniversalConverter, /konversi, refactor /pdf |
| S3 | Image conversion (PNG↔JPG↔WebP, resize, compress, HEIC, SVG), ImageConfig, /image page |
| S4 | PDF merge/split (@cantoo/pdf-lib), Umami analytics, .env.example, /merge page |
| S6 | Halaman /dukung, sponsor section, navigasi donasi |
| Post-MVP | Gambar→DOC (OCR→DOCX dengan layout preservation), Gambar→Teks (OCR), Gambar→PDF, PDF→Gambar (ZIP), Split PDF (range halaman), Trakteer donation, docs update, Git SSH |

## Open Issues

- **Image→DOCX layout tidak faithful** — `docs/BUG-IMAGE-TO-DOC-LAYOUT.md`. OCR bounding box → DOCX flow-based mapping inherently limited. Suggested fix: `@turbodocx/html-to-docx` atau layout analysis model.

# Bug: Gambar → DOCX layout tidak sesuai tampilan asli

## Status

**Belum solved.** Semua approach yang dicoba belum menghasilkan DOCX yang layoutnya mirip dengan gambar input.

## Masalah

Konversi gambar dokumen (scan/foto) ke `.docx` menghasilkan Word document yang layoutnya tidak sesuai dengan tampilan asli gambar. Font size, posisi teks, alignment, dan struktur paragraf tidak akurat.

## Root Cause

DOCX adalah **flow-based format** (teks mengalir dari kiri-ke-kanan, atas-ke-bawah). Gambar adalah **fixed-layout**. Mapping dari fixed ke flow inherently tidak bisa 100% akurat tanpa informasi layout tingkat tinggi (tabel, kolom, region).

Tesseract.js OCR memberi:
- Text + bounding box (x0, y0, x1, y1) per word
- Font name (tidak selalu tersedia untuk `ind+eng`)

Yang tidak bisa diketahui:
- Apakah suatu region adalah tabel? kolom? list?
- Struktur dokumen yang sesungguhnya
- Font metrics exact (ascender/descender ratio)

## Approaches yang sudah dicoba

### Approach 1: Embed gambar mentah di DOCX (Sprint S3)

Embed gambar sebagai `ImageRun` di DOCX. Visual 100% sama karena gambarnya utuh.

**Hasil:** User reject — "oh ini masih jadi gambar ya, jadikan text lah"

### Approach 2: OCR → plain text paragraphs (pertama)

OCR extract text → tiap baris jadi paragraf. Tata letak hilang total.

**Hasil:** User reject — "styling nya kok hilang"

### Approach 3: OCR → bounding box → DOCX dengan font/posisi mapping (skrg)

Tiap word dipetakan ke `TextRun` dengan:
- Font size dari bounding box height → pt (estimasi DPI)
- Indentasi dari posisi X
- Alignment detection (left/center/right)
- Paragraph grouping dari vertical gap
- Font name dari OCR (jika ada)

**Hasil:** Masih belum sesuai tampilan asli.

## Technical Limitations

1. **DPI estimasi kasar** — `dpi = imgH / 11.69` asumsi A4, error tinggi untuk foto dokumen dengan perspective/angle
2. **DOCX tidak support absolute positioning** — semua elemen flow-based
3. **Tesseract.js `ind+eng`** — font_name sering kosong untuk bahasa campuran
4. **Tidak ada layout analysis** — tabel, kolom, list tidak terdeteksi
5. **Word spacing heuristic** — proporsional dari bounding box gap, tidak akurat untuk justified text

## Suggested Next Steps (ordered by impact)

### Short-term (improve current approach)
- [ ] **PSM tuning**: Coba `--psm 4` atau `--psm 6` untuk multi-column document
- [ ] **preserve_interword_spaces**: Enable di Tesseract config (bisa improve spacing)
- [ ] **Better DPI estimation**: Minta user input kertas (A4/Letter/F4) atau hitung dari EXIF
- [ ] **Table detection heuristic**: Deteksi grid dari bounding box alignment → render sebagai tabel DOCX

### Medium-term (library approach)
- [ ] **Coba `@turbodocx/html-to-docx`**: Convert hOCR (HTML output Tesseract) langsung ke DOCX. Library ini handle mapping HTML→DOCX termasuk styling. Langkah:
  1. `worker.recognize(file, undefined, { hocr: true })` → dapat hOCR string
  2. Parse hOCR atau mapping ke HTML yang proper
  3. `HTMLtoDOCX(html, docOptions)` → Blob
- [ ] **Coba `dom-docx/browser`**: Alternatif HTML→DOCX, pake `docx` library under the hood
- [ ] **Coba `docshift`**: Smaller bundle (240KB), pure client-side, `toDocx(html)` API

### Long-term (proper document reconstruction)
- [ ] **Layout analysis model**: ONNX model kayak PP-DocLayout (~130-213MB) untuk deteksi region (tabel, teks, gambar, heading). `ppu-doclayout` package bisa jalan di browser via `onnxruntime-web`
- [ ] **Visual LLM approach**: Pake model vision-LLM untuk memahami struktur dokumen (MinerU, Docling). Butuh WebGPU/ONNX. Terlalu berat untuk MVP
- [ ] **Hybrid**: Embed image di DOCX + overlay OCR text di layer terpisah (text box positioning). DOCX support `position: absolute` via `w:position` di OOXML tapi tidak di `docx` library

## Files terkait

| File | Role |
|------|------|
| `src/lib/conversions/image.ts` | Fungsi `convertImageToDoc()` — OCR→DOCX logic |
| `src/lib/conversions/registry.ts` | Daftar opsi konversi (termasuk `image-to-doc`) |
| `src/components/convert/UniversalConverter.tsx` | Orchestrator yang panggil `convertImageToDoc()` |

## Environment

- `tesseract.js@7.0.0` (WASM)
- `docx@9.3.0` (DOCX generation)
- Browser client-side only (no server)
- Bahasa: `ind+eng`

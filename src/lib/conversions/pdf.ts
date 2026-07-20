import { AppError } from "@/lib/errors";
import JSZip from "jszip";
import type { ConversionResultData, ProgressCallback } from "@/lib/conversions/types";

type PdfjsModule = typeof import("pdfjs-dist");

let pdfjsPromise: Promise<PdfjsModule> | null = null;

/**
 * Lazy-load pdf.js (hanya saat dibutuhkan) + konfigurasi worker.
 * Reset promise jika gagal agar bisa dicoba ulang.
 */
function loadPdfjs(): Promise<PdfjsModule> {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist")
      .then((pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        return pdfjs;
      })
      .catch((err) => {
        pdfjsPromise = null;
        throw err;
      });
  }
  return pdfjsPromise;
}

async function openPdf(file: File) {
  let pdfjs: PdfjsModule;
  try {
    pdfjs = await loadPdfjs();
  } catch {
    throw new AppError("CONVERSION_FAILED", "Gagal memuat library PDF");
  }

  const data = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({
    data,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
  });
  try {
    const doc = await loadingTask.promise;
    return { doc, loadingTask };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "PasswordException") {
        throw new AppError("PDF_ENCRYPTED");
      }
      const msg = error.message ?? "";
      if (/invalid|corrupt|broken/i.test(msg)) {
        throw new AppError("PDF_CORRUPT");
      }
      if (/version|format|missing|unsupported|unknown\s+option/i.test(msg)) {
        throw new AppError("PDF_UNSUPPORTED");
      }
    }
    throw new AppError("PDF_UNSUPPORTED");
  }
}

interface TextItemLike {
  str?: string;
  hasEOL?: boolean;
  transform?: number[];
}

/**
 * Gabungkan text items dari pdf.js menjadi teks dengan line breaks
 * yang mendekati layout asli (deteksi perubahan posisi Y + EOL marker).
 */
function textContentToText(items: TextItemLike[]): string {
  let output = "";
  let lastY: number | null = null;

  for (const item of items) {
    if (typeof item.str !== "string") continue;
    const y = item.transform?.[5];

    if (lastY !== null && y !== undefined && Math.abs(y - lastY) > 2) {
      output += "\n";
    }
    output += item.str;
    if (item.hasEOL) output += "\n";
    if (y !== undefined) lastY = y;
  }

  return output.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export interface PdfTextExtraction {
  text: string;
  pageCount: number;
}

/**
 * Ekstrak teks dari semua halaman PDF.
 */
export async function extractTextFromPdf(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<PdfTextExtraction> {
  const { doc, loadingTask } = await openPdf(file);

  try {
    const parts: string[] = [];
    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
      const page = await doc.getPage(pageNumber);
      const content = await page.getTextContent();
      parts.push(textContentToText(content.items as TextItemLike[]));
      onProgress?.(Math.round((pageNumber / doc.numPages) * 100));
    }
    return {
      text: parts.filter(Boolean).join("\n\n"),
      pageCount: doc.numPages,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("CONVERSION_FAILED");
  } finally {
    await loadingTask.destroy();
  }
}

/**
 * Render halaman pertama PDF sebagai thumbnail (data URL).
 * Mengembalikan null jika gagal (mis. PDF terenkripsi) agar UI bisa fallback.
 */
/**
 * Render halaman pertama PDF sebagai thumbnail (data URL).
 * Return `null` jika gagal agar UI bisa fallback ke icon generic.
 */
export async function renderPdfThumbnail(
  file: File,
  maxWidth = 480,
): Promise<string | null> {
  try {
    const { doc, loadingTask } = await openPdf(file);
    try {
      const page = await doc.getPage(1);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = maxWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const context = canvas.getContext("2d");
      if (!context) return null;

      await page.render({ canvas, canvasContext: context, viewport }).promise;
      return canvas.toDataURL("image/png");
    } finally {
      await loadingTask.destroy();
    }
  } catch {
    return null;
  }
}

async function loadPdfLib() {
  try {
    const mod = await import("@cantoo/pdf-lib");
    return mod.PDFDocument;
  } catch {
    throw new AppError("CONVERSION_FAILED", "Gagal memuat library PDF");
  }
}

/**
 * Merge multiple PDF files into one. Uses @cantoo/pdf-lib (lazy loaded).
 */
export async function mergePdfs(
  files: File[],
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  const PDFDocument = await loadPdfLib();
  onProgress?.(10);

  const mergedPdf = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const fileBytes = await files[i].arrayBuffer();
    let srcDoc;
    try {
      srcDoc = await PDFDocument.load(fileBytes);
    } catch (error) {
      const name = files[i].name;
      if (error instanceof Error && /encrypt|password/i.test(error.message ?? "")) {
        throw new AppError("PDF_ENCRYPTED", `${name} terproteksi password`);
      }
      throw new AppError("PDF_CORRUPT", `${name} rusak atau tidak valid`);
    }
    const pages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
    for (const page of pages) {
      mergedPdf.addPage(page);
    }
    onProgress?.(10 + Math.round(((i + 1) / files.length) * 80));
  }

  const pdfBytes = await mergedPdf.save();
  onProgress?.(100);

  const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
  const first = files[0].name.replace(/\.[^/.]+$/, "");
  const filename = `${first}-merged.pdf`;

  return {
    kind: "file",
    blob,
    filename,
    mimeType: "application/pdf",
    originalSize: files.reduce((s, f) => s + f.size, 0),
  };
}

/**
 * Split PDF — extract specific pages into a new PDF.
 * `pageRange` berupa string seperti "1-5", "1,3,5-7", atau kosong (halaman pertama).
 */
export async function splitPdf(
  file: File,
  pageRange?: string,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  const PDFDocument = await loadPdfLib();
  onProgress?.(10);

  const fileBytes = await file.arrayBuffer();
  let srcDoc;
  try {
    srcDoc = await PDFDocument.load(fileBytes);
  } catch (error) {
    if (error instanceof Error && /encrypt|password/i.test(error.message ?? "")) {
      throw new AppError("PDF_ENCRYPTED");
    }
    throw new AppError("PDF_CORRUPT");
  }
  onProgress?.(30);

  const indices = pageRange
    ? parsePageRange(pageRange, srcDoc.getPageCount()).map((p) => p - 1)
    : [0];

  const newDoc = await PDFDocument.create();
  const pages = await newDoc.copyPages(srcDoc, indices);
  for (const page of pages) {
    newDoc.addPage(page);
  }
  onProgress?.(70);

  const pdfBytes = await newDoc.save();
  onProgress?.(100);

  const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
  const base = file.name.replace(/\.[^/.]+$/, "");
  const suffix = indices.length === 1 ? `-page-${indices[0] + 1}` : "-split";
  const filename = `${base}${suffix}.pdf`;

  return {
    kind: "file",
    blob,
    filename,
    mimeType: "application/pdf",
    pageCount: indices.length,
    originalSize: file.size,
  };
}

/** Parse page range string like "1-5", "1,3,5-7" → array of page numbers (1-indexed). Defaults to all pages. */
function parsePageRange(range: string | undefined, totalPages: number): number[] {
  if (!range || !range.trim()) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  const parts = range.split(",");

  for (const part of parts) {
    const trimmed = part.trim();
    const match = trimmed.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!match) continue;

    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;

    for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
      pages.add(i);
    }
  }

  const result = [...pages].sort((a, b) => a - b);
  return result.length > 0 ? result : Array.from({ length: totalPages }, (_, i) => i + 1);
}

/**
 * Render halaman PDF sebagai gambar (PNG/JPG) dan return sebagai ZIP.
 * Render halaman PDF sebagai gambar (PNG/JPG) dan return sebagai ZIP.
 * `pageRange` bisa berupa "1-5", "1,3,5-7", atau kosong (semua halaman).
 */
export async function convertPdfToImage(
  file: File,
  format: "png" | "jpeg",
  pageRange?: string,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  const { doc, loadingTask } = await openPdf(file);
  onProgress?.(10);

  try {
    const pagesToRender = parsePageRange(pageRange, doc.numPages);
    const zip = new JSZip();
    const mimeType = format === "png" ? "image/png" : "image/jpeg";
    const ext = format === "png" ? "png" : "jpg";

    for (let idx = 0; idx < pagesToRender.length; idx++) {
      const pageNum = pagesToRender[idx];
      const page = await doc.getPage(pageNum);
      const baseViewport = page.getViewport({ scale: 1 });
      const maxDim = Math.max(baseViewport.width, baseViewport.height);
      const scale = Math.min(1.5, 4096 / maxDim);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new AppError("CONVERSION_FAILED");

      if (format === "jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      await page.render({ canvas, canvasContext: ctx, viewport }).promise;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new AppError("CONVERSION_FAILED"));
        }, mimeType, 0.92);
      });

      zip.file(`page-${pageNum}.${ext}`, blob);
      onProgress?.(10 + Math.round(((idx + 1) / pagesToRender.length) * 80));
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    onProgress?.(100);

    const filename = file.name.replace(/\.[^/.]+$/, "") + "-images.zip";

    return {
      kind: "file",
      blob: zipBlob,
      filename,
      mimeType: "application/zip",
      pageCount: pagesToRender.length,
      originalSize: file.size,
    };
  } finally {
    await loadingTask.destroy();
  }
}

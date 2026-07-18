import { AppError } from "@/lib/errors";
import { replaceExtension } from "@/lib/download";
import type {
  ConversionResultData,
  ImageConvertOptions,
  ProgressCallback,
} from "@/lib/conversions/types";

/**
 * Jalankan OCR via Tesseract.js (lazy load) untuk ekstrak teks dari gambar.
 */
async function ocrImage(file: File, onProgress?: ProgressCallback): Promise<string> {
  onProgress?.(10);
  const Tesseract = await import("tesseract.js");
  onProgress?.(20);

  const worker = await Tesseract.createWorker("ind+eng", 1, {
    logger: (m: { status: string; progress: number }) => {
      if (m.status === "recognizing text") {
        onProgress?.(20 + Math.round(m.progress * 70));
      }
    },
  });

  try {
    const { data } = await worker.recognize(file);
    onProgress?.(95);
    return data.text;
  } finally {
    await worker.terminate();
  }
}

/**
 * Ekstrak teks dari gambar via OCR.
 */
export async function extractTextFromImage(
  file: File,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(5);
  const text = await ocrImage(file, onProgress);

  if (!text.trim()) {
    throw new AppError("CONVERSION_FAILED", "Tidak ada teks yang terdeteksi di gambar");
  }

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  onProgress?.(100);

  return {
    kind: "text",
    text,
    blob,
    filename: replaceExtension(file.name, "txt"),
    mimeType: "text/plain",
    originalSize: file.size,
  };
}

/**
 * Muat File sebagai HTMLImageElement.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new AppError("CONVERSION_FAILED", "Gagal memuat gambar"));
    };
    img.src = url;
  });
}

function detectWebPSupport(): boolean {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toBlob ? canvas.toBlob(() => {}, "image/webp") !== null : false;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new AppError("CONVERSION_FAILED", "Gagal mengekspor gambar"));
      },
      format,
      quality,
    );
  });
}

function mimeFromFormat(format: string): string {
  switch (format) {
    case "png":
      return "image/png";
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    default:
      return "image/png";
  }
}

function extFromFormat(format: string): string {
  switch (format) {
    case "png":
      return "png";
    case "jpeg":
      return "jpg";
    case "webp":
      return "webp";
    default:
      return "png";
  }
}

/**
 * Konversi format gambar (PNG↔JPG↔WebP).
 */
export async function convertImageFormat(
  file: File,
  options: ImageConvertOptions,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(10);
  const img = await loadImage(file);
  onProgress?.(30);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED", "Canvas tidak tersedia");

  if (options.targetFormat === "jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  onProgress?.(60);

  const quality = options.quality ?? 0.92;
  const mimeType = mimeFromFormat(options.targetFormat);
  const blob = await canvasToBlob(canvas, mimeType, quality);
  onProgress?.(90);

  const ext = extFromFormat(options.targetFormat);
  const filename = replaceExtension(file.name, ext);

  onProgress?.(100);
  return {
    kind: "file",
    blob,
    filename,
    mimeType,
    originalSize: file.size,
  };
}

/**
 * Rasterkan SVG ke PNG/JPG.
 */
export async function convertSVG(
  file: File,
  options: ImageConvertOptions,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(10);
  const text = await file.text();
  const svgBlob = new Blob([text], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => {
      URL.revokeObjectURL(url);
      resolve(el);
    };
    el.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new AppError("CONVERSION_FAILED", "Gagal memuat SVG"));
    };
    el.src = url;
  });
  onProgress?.(40);

  const canvas = document.createElement("canvas");
  const scale = 2;
  canvas.width = img.naturalWidth * scale;
  canvas.height = img.naturalHeight * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED", "Canvas tidak tersedia");

  ctx.scale(scale, scale);
  ctx.drawImage(img, 0, 0);
  onProgress?.(70);

  const quality = options.quality ?? 0.92;
  const mimeType = mimeFromFormat(options.targetFormat);
  const blob = await canvasToBlob(canvas, mimeType, quality);
  onProgress?.(90);

  const ext = extFromFormat(options.targetFormat);
  const filename = replaceExtension(file.name, ext);

  onProgress?.(100);
  return {
    kind: "file",
    blob,
    filename,
    mimeType,
    originalSize: file.size,
  };
}

/**
 * Resize gambar ke dimensi tertentu.
 */
export async function resizeImage(
  file: File,
  options: ImageConvertOptions,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(10);
  const img = await loadImage(file);
  onProgress?.(30);

  const targetWidth = options.width ?? img.naturalWidth;
  const targetHeight = options.height ?? img.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED", "Canvas tidak tersedia");

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  onProgress?.(60);

  const targetFormat = options.targetFormat ?? "png";
  const quality = options.quality ?? 0.92;
  const mimeType = mimeFromFormat(targetFormat);
  const blob = await canvasToBlob(canvas, mimeType, quality);
  onProgress?.(90);

  const ext = extFromFormat(targetFormat);
  const filename = replaceExtension(file.name, ext);

  onProgress?.(100);
  return {
    kind: "file",
    blob,
    filename,
    mimeType,
    originalSize: file.size,
  };
}

/**
 * Kompres gambar (output tetap WebP untuk ukuran terkecil, atau format asli).
 */
export async function compressImage(
  file: File,
  quality: number,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(10);
  const img = await loadImage(file);
  onProgress?.(30);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED", "Canvas tidak tersedia");

  ctx.drawImage(img, 0, 0);
  onProgress?.(50);

  const useWebp = detectWebPSupport();
  const mimeType = useWebp ? "image/webp" : "image/jpeg";
  const blob = await canvasToBlob(canvas, mimeType, quality);
  onProgress?.(80);

  const ext = useWebp ? "webp" : "jpg";
  const filename = replaceExtension(file.name, ext);

  onProgress?.(100);
  return {
    kind: "file",
    blob,
    filename,
    mimeType,
    originalSize: file.size,
  };
}

/**
 * Konversi HEIC/HEIF ke format lain via heic-to (WASM lazy load).
 */
export async function convertHeic(
  file: File,
  options: ImageConvertOptions,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(10);

  let heicTo: typeof import("heic-to").heicTo;
  try {
    heicTo = (await import("heic-to")).heicTo;
  } catch {
    throw new AppError("CONVERSION_FAILED", "Gagal memuat library HEIC");
  }
  onProgress?.(30);

  const buffer = await file.arrayBuffer();
  const mimeType = mimeFromFormat(options.targetFormat);
  const outputBlob = await heicTo({
    blob: new Blob([buffer], { type: file.type }),
    type: mimeType as `image/${string}`,
    quality: options.quality ?? 0.92,
  });
  onProgress?.(70);

  const ext = extFromFormat(options.targetFormat);
  const filename = replaceExtension(file.name, ext);

  onProgress?.(100);
  return {
    kind: "file",
    blob: outputBlob,
    filename,
    mimeType,
    originalSize: file.size,
  };
}

/**
 * Konversi gambar ke PDF via @cantoo/pdf-lib.
 */
export async function convertImageToPdf(
  file: File,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(10);
  const img = await loadImage(file);
  onProgress?.(30);

  const { PDFDocument } = await import("@cantoo/pdf-lib");
  const doc = await PDFDocument.create();
  onProgress?.(50);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED");

  ctx.drawImage(img, 0, 0);

  const imageBytes = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new AppError("CONVERSION_FAILED"));
    }, "image/png");
  });

  const arrayBuf = await imageBytes.arrayBuffer();
  const embedded = await doc.embedPng(arrayBuf);

  const page = doc.addPage([embedded.width, embedded.height]);
  page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
  onProgress?.(70);

  const pdfBytes = await doc.save();
  onProgress?.(90);

  const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
  const filename = file.name.replace(/\.[^/.]+$/, "") + ".pdf";

  onProgress?.(100);
  return {
    kind: "file",
    blob,
    filename,
    mimeType: "application/pdf",
    originalSize: file.size,
  };
}

/**
 * Konversi gambar ke DOCX — OCR dengan layout preservation via bounding boxes.
 * Memetakan font size, alignment, indentasi, dan paragraph grouping dari OCR data.
 */
export async function convertImageToDoc(
  file: File,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(5);
  const Tesseract = await import("tesseract.js");
  onProgress?.(15);

  const worker = await Tesseract.createWorker("ind+eng", 1, {
    logger: (m: { status: string; progress: number }) => {
      if (m.status === "recognizing text") {
        onProgress?.(15 + Math.round(m.progress * 70));
      }
    },
  });

  let page: Tesseract.Page;
  try {
    const result = await worker.recognize(file, undefined, { blocks: true });
    page = result.data;
  } finally {
    await worker.terminate();
  }
  onProgress?.(85);

  if (!page.text.trim()) {
    throw new AppError("CONVERSION_FAILED", "Tidak ada teks yang terdeteksi di gambar");
  }

  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import("docx");
  type AlignmentValue = (typeof AlignmentType)[keyof typeof AlignmentType];

  // ── collect all words with their block/paragraph context ──
  type WordInfo = {
    text: string;
    bbox: Tesseract.Bbox;
    fontName?: string;
    blockIdx: number;
    paraIdx: number;
  };
  const allWords: WordInfo[] = [];
  let imgW = 0;
  let imgH = 0;

  if (page.blocks) {
    for (let bi = 0; bi < page.blocks.length; bi++) {
      const block = page.blocks[bi];
      for (let pi = 0; pi < block.paragraphs.length; pi++) {
        const p = block.paragraphs[pi];
        for (const line of p.lines) {
          for (const w of line.words) {
            allWords.push({
              text: w.text,
              bbox: w.bbox,
              fontName: w.font_name || undefined,
              blockIdx: bi,
              paraIdx: pi,
            });
            imgW = Math.max(imgW, w.bbox.x1);
            imgH = Math.max(imgH, w.bbox.y1);
          }
        }
      }
    }
  }

  if (!allWords.length) {
    throw new AppError("CONVERSION_FAILED", "Tidak ada teks yang terdeteksi di gambar");
  }

  // estimate DPI (assume ~A4 height 297mm = 11.69in)
  const dpi = imgH / 11.69;
  const pxToPt = (px: number) => Math.max(6, Math.min(72, Math.round((px / dpi) * 72)));

  // ── group words into lines ──
  type LineGroup = {
    y: number;
    words: WordInfo[];
    x0: number;
    x1: number;
    lineH: number;
  };
  const lines: LineGroup[] = [];

  const sorted = [...allWords].sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0);
  let current: LineGroup | null = null;

  for (const w of sorted) {
    const wh = w.bbox.y1 - w.bbox.y0;
    if (!current || Math.abs(w.bbox.y0 - current.y) > wh * 0.4) {
      if (current) lines.push(current);
      current = { y: w.bbox.y0, words: [w], x0: w.bbox.x0, x1: w.bbox.x1, lineH: wh };
    } else {
      current.words.push(w);
      current.x0 = Math.min(current.x0, w.bbox.x0);
      current.x1 = Math.max(current.x1, w.bbox.x1);
      current.lineH = Math.max(current.lineH, wh);
    }
  }
  if (current) lines.push(current);

  // ── determine alignment per block ──
  function detectAlignment(blockLines: LineGroup[]): AlignmentValue {
    const pageW = imgW || 612;
    const leftCount = blockLines.filter((l) => l.x0 < pageW * 0.25).length;
    const rightCount = blockLines.filter((l) => l.x1 > pageW * 0.75).length;
    const centerCount = blockLines.filter(
      (l) => l.x0 > pageW * 0.25 && l.x0 < pageW * 0.45 && l.x1 < pageW * 0.8
    ).length;

    if (blockLines.length === 0) return AlignmentType.LEFT;
    if (centerCount / blockLines.length > 0.6) return AlignmentType.CENTER;
    if (rightCount / blockLines.length > 0.4) return AlignmentType.RIGHT;
    if (leftCount / blockLines.length > 0.5) return AlignmentType.LEFT;

    const avgX0 = blockLines.reduce((s, l) => s + l.x0, 0) / blockLines.length;
    if (avgX0 > pageW * 0.35 && avgX0 < pageW * 0.65) return AlignmentType.CENTER;
    return AlignmentType.LEFT;
  }

  // ── group lines into paragraphs (by vertical gap) ──
  function groupParagraphs(lines: LineGroup[]): LineGroup[][] {
    const paras: LineGroup[][] = [];
    let currentPara: LineGroup[] = [];

    for (const line of lines) {
      const prevLine = currentPara[currentPara.length - 1];
      if (prevLine) {
        const gap = line.y - (prevLine.y + prevLine.lineH);
        const avgH = (prevLine.lineH + line.lineH) / 2;
        // new paragraph if gap > 1.5× average line height
        if (gap > avgH * 1.5) {
          if (currentPara.length) paras.push(currentPara);
          currentPara = [];
        }
      }
      currentPara.push(line);
    }
    if (currentPara.length) paras.push(currentPara);
    return paras.length ? paras : [lines];
  }

  // ── group lines by their Tesseract block ──
  const blockMap = new Map<number, LineGroup[]>();
  for (const line of lines) {
    const bi = line.words[0].blockIdx;
    if (!blockMap.has(bi)) blockMap.set(bi, []);
    blockMap.get(bi)!.push(line);
  }

  // ── build DOCX paragraphs ──
  const docParagraphs = [];

  for (const [, blockLines] of blockMap) {
    const alignment = detectAlignment(blockLines);
    const paras = groupParagraphs(blockLines);

    for (const paraLines of paras) {
      const avgFontSize = paraLines.reduce((s, l) => s + pxToPt(l.lineH), 0) / paraLines.length;
      const isHeading = paraLines.some((l) => pxToPt(l.lineH) > avgFontSize * 1.3);
      const paraFontSize = Math.max(...paraLines.map((l) => pxToPt(l.lineH)));

      const textRuns: import("docx").ParagraphChild[] = [];

      for (let li = 0; li < paraLines.length; li++) {
        const line = paraLines[li];
        const lineFontSize = pxToPt(line.lineH);
        const lineIsBold = isHeading && lineFontSize === paraFontSize;

        // calculate spacing between words based on original gaps
        const sortedWords = [...line.words].sort((a, b) => a.bbox.x0 - b.bbox.x0);
        for (let wi = 0; wi < sortedWords.length; wi++) {
          const w = sortedWords[wi];
          let wordText = w.text;
          // add proportional spacing based on original gap
          if (wi < sortedWords.length - 1) {
            const gap = sortedWords[wi + 1].bbox.x0 - w.bbox.x1;
            const wordW = w.bbox.x1 - w.bbox.x0;
            const gapChars = Math.round(gap / Math.max(1, wordW) * wordText.length);
            wordText += " ".repeat(Math.max(1, Math.min(8, gapChars)));
          }

          const wordH = w.bbox.y1 - w.bbox.y0;
          const wordFontSize = pxToPt(wordH);
          const wordIsBold = lineIsBold || (wordText.trim().length > 3 && wordText.trim() === wordText.trim().toUpperCase());

          textRuns.push(
            new TextRun({
              text: wordText,
              font: w.fontName || undefined,
              size: wordFontSize * 2,
              bold: wordIsBold,
            })
          );
        }
        // line break between lines (except last)
        if (li < paraLines.length - 1) {
          textRuns.push(new TextRun({ break: 1 }));
        }
      }

      const firstLine = paraLines[0];
      const leftIndent = Math.round((firstLine.x0 / (imgW || 612)) * 6 * 1440);

      docParagraphs.push(
        new Paragraph({
          alignment,
          indent: leftIndent > 30 ? { left: leftIndent } : undefined,
          spacing: {
            after: Math.round(pxToPt(paraLines[paraLines.length - 1].lineH) * 1.2 * 20),
            before: isHeading ? Math.round(paraFontSize * 20) : 0,
            line: isHeading ? 400 : 320,
          },
          children: textRuns,
          ...(isHeading ? { heading: HeadingLevel.HEADING_2 } : {}),
        })
      );
    }
  }

  const doc = new Document({ sections: [{ children: docParagraphs }] });

  const blob = await Packer.toBlob(doc);
  onProgress?.(95);

  const filename = file.name.replace(/\.[^/.]+$/, "") + ".docx";

  onProgress?.(100);
  return {
    kind: "file",
    blob,
    filename,
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    originalSize: file.size,
  };
}
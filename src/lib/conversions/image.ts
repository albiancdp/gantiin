import { AppError } from "@/lib/errors";
import { replaceExtension } from "@/lib/download";
import { detectFileType } from "@/lib/validations";
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

function mimeFromExt(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    bmp: "image/bmp",
    tiff: "image/tiff",
    tif: "image/tiff",
    avif: "image/avif",
    ico: "image/x-icon",
    tga: "image/x-tga",
    ppm: "image/x-portable-pixmap",
    svg: "image/svg+xml",
    heic: "image/heic",
    heif: "image/heif",
  };
  return map[ext] ?? "";
}

/**
 * Muat File sebagai HTMLImageElement.
 * Fallback MIME type dari ekstensi jika `file.type` kosong.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const mime = file.type || mimeFromExt(file.name);
    const blob = mime ? file.slice(0, file.size, mime) : file;
    const url = URL.createObjectURL(blob);
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
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "avif":
      return "image/avif";
    case "tiff":
      return "image/tiff";
    case "ico":
      return "image/x-icon";
    case "tga":
      return "image/x-tga";
    case "ppm":
      return "image/x-portable-pixmap";
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
    case "gif":
      return "gif";
    case "bmp":
      return "bmp";
    case "avif":
      return "avif";
    case "tiff":
      return "tiff";
    case "ico":
      return "ico";
    case "tga":
      return "tga";
    case "ppm":
      return "ppm";
    default:
      return "png";
  }
}

function encodeBMP(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const bytesPerPixel = 3;
  const rowSize = Math.ceil((width * bytesPerPixel) / 4) * 4;
  const pixelOffset = 54;
  const fileSize = pixelOffset + rowSize * height;

  const buffer = new ArrayBuffer(fileSize);
  const v = new DataView(buffer);

  v.setUint16(0, 0x4D42, true);
  v.setUint32(2, fileSize, true);
  v.setUint32(6, 0, true);
  v.setUint32(10, pixelOffset, true);
  v.setUint32(14, 40, true);
  v.setInt32(18, width, true);
  v.setInt32(22, -height, true);
  v.setUint16(26, 1, true);
  v.setUint16(28, 24, true);
  v.setUint32(30, 0, true);
  v.setUint32(34, 0, true);
  v.setInt32(38, 2835, true);
  v.setInt32(42, 2835, true);
  v.setUint32(46, 0, true);
  v.setUint32(50, 0, true);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const s = (y * width + x) * 4;
      const d = pixelOffset + y * rowSize + x * 3;
      v.setUint8(d, data[s + 2]);
      v.setUint8(d + 1, data[s + 1]);
      v.setUint8(d + 2, data[s]);
    }
  }

  return new Blob([buffer], { type: "image/bmp" });
}

function quantizeToPalette(imageData: ImageData): { pixels: number[]; palette: number[][] } {
  const { data, width, height } = imageData;
  const pixelCount = width * height;

  const colorMap = new Map<string, number>();
  const palette: number[][] = [];

  const quantized = Math.floor(256 / 6);
  const quantize = (v: number) => Math.round(v / quantized) * quantized;

  for (let i = 0; i < pixelCount; i++) {
    const idx = i * 4;
    const r = quantize(data[idx]);
    const g = quantize(data[idx + 1]);
    const b = quantize(data[idx + 2]);
    const key = `${r},${g},${b}`;
    if (!colorMap.has(key)) {
      colorMap.set(key, palette.length);
      palette.push([r, g, b]);
    }
  }

  while (palette.length > 256) {
    palette.pop();
  }

  const pixels: number[] = [];
  for (let i = 0; i < pixelCount; i++) {
    const idx = i * 4;
    const r = quantize(data[idx]);
    const g = quantize(data[idx + 1]);
    const b = quantize(data[idx + 2]);
    const key = `${r},${g},${b}`;
    pixels.push(colorMap.get(key) ?? 0);
  }

  return { pixels, palette };
}

function encodeGIF(imageData: ImageData): Blob {
  const { width, height } = imageData;
  const { pixels, palette } = quantizeToPalette(imageData);
  const paletteSize = palette.length;
  const colorTableSize = paletteSize < 128 ? 128 : paletteSize < 256 ? 256 : 256;
  const bitsPerPixel = colorTableSize <= 2 ? 1 : colorTableSize <= 4 ? 2 : colorTableSize <= 16 ? 4 : 8;

  const chunks: number[][] = [];

  function writeBytes(bytes: number[]) {
    chunks.push(bytes);
  }

  // Header
  writeBytes([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]); // GIF89a
  // LSD
  writeBytes([width & 0xFF, (width >> 8) & 0xFF]);
  writeBytes([height & 0xFF, (height >> 8) & 0xFF]);
  writeBytes([0xF0 | (bitsPerPixel - 1)]); // packed field
  writeBytes([0x00]); // bg color
  writeBytes([0x00]); // pixel aspect

  // Global Color Table
  for (let i = 0; i < colorTableSize; i++) {
    if (i < palette.length) {
      writeBytes(palette[i]);
    } else {
      writeBytes([0, 0, 0]);
    }
  }

  // Image Descriptor
  writeBytes([0x2C]); // image separator
  writeBytes([0x00, 0x00, 0x00, 0x00]); // left, top
  writeBytes([width & 0xFF, (width >> 8) & 0xFF]);
  writeBytes([height & 0xFF, (height >> 8) & 0xFF]);
  writeBytes([0x00]); // no local color table

  // LZW minimum code size
  const minCodeSize = Math.max(2, bitsPerPixel);
  writeBytes([minCodeSize]);

  // LZW encode
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;

  let nextCode = eoiCode + 1;
  const codeTable = new Map<string, number>();

  function resetTable() {
    codeTable.clear();
    nextCode = eoiCode + 1;
    for (let i = 0; i < clearCode; i++) {
      codeTable.set(String.fromCharCode(i), i);
    }
  }

  function writeCode(code: number, bitCount: number, bitBuf: { value: number; bits: number }, output: number[]) {
    bitBuf.value |= code << bitBuf.bits;
    bitBuf.bits += bitCount;
    while (bitBuf.bits >= 8) {
      output.push(bitBuf.value & 0xFF);
      bitBuf.value >>= 8;
      bitBuf.bits -= 8;
    }
  }

  resetTable();
  const maxBits = 12;
  let bitCount = minCodeSize + 1;
  const bitBuf = { value: 0, bits: 0 };
  const encoded: number[] = [];

  writeCode(clearCode, bitCount, bitBuf, encoded);

  let w = String.fromCharCode(pixels[0]);
  for (let i = 1; i < pixels.length; i++) {
    const k = String.fromCharCode(pixels[i]);
    const wk = w + k;
    if (codeTable.has(wk)) {
      w = wk;
    } else {
      writeCode(codeTable.get(w)!, bitCount, bitBuf, encoded);
      if (nextCode < (1 << 12)) {
        codeTable.set(wk, nextCode++);
        if (nextCode > (1 << bitCount) - 1 && bitCount < maxBits) {
          bitCount++;
        }
      }
      if (codeTable.size >= 4095) {
        writeCode(clearCode, bitCount, bitBuf, encoded);
        resetTable();
        bitCount = minCodeSize + 1;
      }
      w = k;
    }
  }
  writeCode(codeTable.get(w)!, bitCount, bitBuf, encoded);
  writeCode(eoiCode, bitCount, bitBuf, encoded);

  if (bitBuf.bits > 0) {
    encoded.push(bitBuf.value & 0xFF);
  }

  // Write sub-blocks
  for (let i = 0; i < encoded.length; i += 255) {
    const block = encoded.slice(i, i + 255);
    writeBytes([block.length, ...block]);
  }
  writeBytes([0x00]); // block terminator

  // Trailer
  writeBytes([0x3B]);

  const totalLen = chunks.reduce((s, c) => s + c.length, 0);
  const result = new Uint8Array(totalLen);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return new Blob([result], { type: "image/gif" });
}

async function encodeAVIF(imageData: ImageData, quality?: number): Promise<Blob> {
  const { encode } = await import("@jsquash/avif");
  const buffer = await encode(imageData, { quality: Math.round((quality ?? 0.92) * 100) });
  return new Blob([buffer], { type: "image/avif" });
}

function encodeICO(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const bpp = 32;
  const rowSize = Math.ceil((width * (bpp / 8)) / 4) * 4;
  const pixelDataSize = rowSize * height;
  const andMaskSize = Math.ceil(width / 8) * height;
  const bmpDataSize = 40 + pixelDataSize + andMaskSize;
  const icoSize = 6 + 16 + bmpDataSize;

  const buf = new ArrayBuffer(icoSize);
  const v = new DataView(buf);

  v.setUint16(0, 0, true); // reserved
  v.setUint16(2, 1, true); // type = icon
  v.setUint16(4, 1, true); // count

  // ICO dir entry
  const imgW = width >= 256 ? 0 : width;
  const imgH = height >= 256 ? 0 : height;
  v.setUint8(6, imgW);
  v.setUint8(7, imgH);
  v.setUint8(8, 0); // colors
  v.setUint8(9, 0); // reserved
  v.setUint16(10, 1, true); // planes
  v.setUint16(12, bpp, true); // bpp
  v.setUint32(14, bmpDataSize, true); // size
  v.setUint32(18, 22, true); // offset

  // DIB header (BGRA, top-down)
  v.setUint32(22, 40, true);
  v.setInt32(26, width, true);
  v.setInt32(30, height * 2, true); // height * 2 for AND mask
  v.setUint16(34, 1, true);
  v.setUint16(36, bpp, true);
  v.setUint32(38, 0, true);
  v.setUint32(42, 0, true);
  v.setInt32(46, 2835, true);
  v.setInt32(50, 2835, true);
  v.setUint32(54, 0, true);
  v.setUint32(58, 0, true);

  // BGRA pixel data (top-down, 32-bit)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const s = (y * width + x) * 4;
      const d = 62 + y * rowSize + x * 4;
      v.setUint8(d, data[s + 2]);
      v.setUint8(d + 1, data[s + 1]);
      v.setUint8(d + 2, data[s]);
      v.setUint8(d + 3, data[s + 3]);
    }
  }

  return new Blob([buf], { type: "image/x-icon" });
}

function encodeTGA(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const headerSize = 18;
  const pixelSize = width * height * 3;
  const buf = new ArrayBuffer(headerSize + pixelSize);
  const v = new DataView(buf);

  v.setUint8(0, 0); // ID length
  v.setUint8(1, 0); // color map type
  v.setUint8(2, 2); // image type = uncompressed RGB
  v.setUint16(3, 0, true); // color map origin
  v.setUint16(5, 0, true); // color map length
  v.setUint8(7, 0); // color map entry size
  v.setUint16(8, 0, true); // x origin
  v.setUint16(10, 0, true); // y origin
  v.setUint16(12, width, true);
  v.setUint16(14, height, true);
  v.setUint8(16, 24); // bpp
  v.setUint8(17, 0x20); // descriptor (top-left origin)

  // BGR pixel data (top-left origin per descriptor)
  for (let i = 0; i < width * height; i++) {
    const s = i * 4;
    const d = headerSize + i * 3;
    v.setUint8(d, data[s + 2]); // B
    v.setUint8(d + 1, data[s + 1]); // G
    v.setUint8(d + 2, data[s]); // R
  }

  return new Blob([buf], { type: "image/x-tga" });
}

function encodeTIFF(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const bpsValues = new Uint16Array([8, 8, 8]);
  const bpsSize = bpsValues.byteLength;
  const rowSize = width * 3;
  const pixelDataSize = rowSize * height;

  const ifdCount = 9;
  const ifdOffset = 8;
  const ifdSize = 2 + ifdCount * 12 + 4;
  const bpsOffset = ifdOffset + ifdSize;
  const pixelOffset = bpsOffset + bpsSize;

  const buf = new ArrayBuffer(pixelOffset + pixelDataSize);
  const v = new DataView(buf);

  v.setUint16(0, 0x4949, true);
  v.setUint16(2, 42, true);
  v.setUint32(4, ifdOffset, true);

  v.setUint16(ifdOffset, ifdCount, true);
  let e = ifdOffset + 2;

  function T(tag: number, type: number, count: number, value: number) {
    v.setUint16(e, tag, true);
    v.setUint16(e + 2, type, true);
    v.setUint32(e + 4, count, true);
    v.setUint32(e + 8, value, true);
    e += 12;
  }

  T(256, 3, 1, width);
  T(257, 3, 1, height);
  T(258, 3, 3, bpsOffset);
  T(259, 3, 1, 1);
  T(262, 3, 1, 2);
  T(273, 4, 1, pixelOffset);
  T(277, 3, 1, 3);
  T(278, 3, 1, height);
  T(279, 4, 1, pixelDataSize);
  v.setUint32(e, 0, true);

  const bpsView = new DataView(buf, bpsOffset);
  bpsView.setUint16(0, 8, true);
  bpsView.setUint16(2, 8, true);
  bpsView.setUint16(4, 8, true);

  for (let i = 0; i < width * height; i++) {
    const s = i * 4;
    const d = pixelOffset + i * 3;
    v.setUint8(d, data[s]);
    v.setUint8(d + 1, data[s + 1]);
    v.setUint8(d + 2, data[s + 2]);
  }

  return new Blob([buf], { type: "image/tiff" });
}

function decodeTGA(buffer: ArrayBuffer): ImageData {
  const v = new DataView(buffer);
  const idLen = v.getUint8(0);
  const imageType = v.getUint8(2);
  const width = v.getUint16(12, true);
  const height = v.getUint16(14, true);
  const bpp = v.getUint8(16);
  const descriptor = v.getUint8(17);
  const topDown = !!(descriptor & 0x20);
  const pixelStart = 18 + idLen;

  const canvas = new ArrayBuffer(width * height * 4);
  const out = new Uint8ClampedArray(canvas);

  if (imageType === 2 || imageType === 3) {
    const channels = bpp === 24 ? 3 : 4;
    const rowSize = width * channels;
    for (let y = 0; y < height; y++) {
      const srcY = topDown ? y : height - 1 - y;
      for (let x = 0; x < width; x++) {
        const s = pixelStart + srcY * rowSize + x * channels;
        const d = (y * width + x) * 4;
        if (channels === 3) {
          out[d] = v.getUint8(s + 2);
          out[d + 1] = v.getUint8(s + 1);
          out[d + 2] = v.getUint8(s);
          out[d + 3] = 255;
        } else {
          out[d] = v.getUint8(s + 2);
          out[d + 1] = v.getUint8(s + 1);
          out[d + 2] = v.getUint8(s);
          out[d + 3] = v.getUint8(s + 3);
        }
      }
    }
  } else if (imageType === 10) {
    let pos = pixelStart;
    let px = 0;
    while (px < width * height) {
      const packet = v.getUint8(pos++);
      const isRLE = packet & 0x80;
      const count = (packet & 0x7f) + 1;
      const channels = bpp === 24 ? 3 : 4;
      const pixel: number[] = [];
      if (isRLE) {
        for (let c = 0; c < channels; c++) pixel.push(v.getUint8(pos++));
        for (let i = 0; i < count && px < width * height; i++) {
          const d = px * 4;
          out[d] = pixel[2];
          out[d + 1] = pixel[1];
          out[d + 2] = pixel[0];
          out[d + 3] = channels === 4 ? pixel[3] : 255;
          px++;
        }
      } else {
        for (let i = 0; i < count && px < width * height; i++) {
          const d = px * 4;
          if (channels === 3) {
            out[d] = v.getUint8(pos + 2);
            out[d + 1] = v.getUint8(pos + 1);
            out[d + 2] = v.getUint8(pos);
            out[d + 3] = 255;
            pos += 3;
          } else {
            out[d] = v.getUint8(pos + 2);
            out[d + 1] = v.getUint8(pos + 1);
            out[d + 2] = v.getUint8(pos);
            out[d + 3] = v.getUint8(pos + 3);
            pos += 4;
          }
          px++;
        }
      }
    }
  } else {
    throw new AppError("CONVERSION_FAILED", `Format TGA tipe ${imageType} belum didukung`);
  }

  return new ImageData(out, width, height);
}

async function decodePPM(file: File): Promise<ImageData> {
  const text = await file.text();
  const lines: string[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) lines.push(trimmed);
  }

  const header = lines[0];
  const dims = lines[1].split(/\s+/).map(Number);
  const maxVal = Number(lines[2]);
  const width = dims[0];
  const height = dims[1];
  const isGrayscale = header === "P2" || header === "P5";
  const channels = maxVal > 255 ? (isGrayscale ? 2 : 6) : (isGrayscale ? 1 : 3);

  // Scan for start of pixel data after header lines (skip comments)
  let dataStart = 0;
  let headerLineCount = 0;
  for (let i = 0; i < text.length && headerLineCount < 3; i++) {
    if (text[i] === "\n") {
      const line = text.slice(dataStart, i).trim();
      if (line && !line.startsWith("#")) headerLineCount++;
      dataStart = i + 1;
    }
  }
  const rawBuffer = new Uint8Array(await file.slice(dataStart).arrayBuffer());
  const pixels = new Uint8ClampedArray(width * height * 4);

  if (header === "P6") {
    // P6 binary RGB
    for (let i = 0; i < width * height; i++) {
      const s = i * 3;
      const d = i * 4;
      pixels[d] = rawBuffer[s];
      pixels[d + 1] = rawBuffer[s + 1];
      pixels[d + 2] = rawBuffer[s + 2];
      pixels[d + 3] = 255;
    }
  } else if (header === "P5") {
    // P5 binary grayscale
    for (let i = 0; i < width * height; i++) {
      const d = i * 4;
      const v = rawBuffer[i];
      pixels[d] = v;
      pixels[d + 1] = v;
      pixels[d + 2] = v;
      pixels[d + 3] = 255;
    }
  } else {
    // P2/P3 ASCII
    const parts = text.slice(dataStart).trim().split(/\s+/).map(Number);
    for (let i = 0; i < width * height; i++) {
      const d = i * 4;
      if (isGrayscale) {
        const v = parts[i];
        pixels[d] = v;
        pixels[d + 1] = v;
        pixels[d + 2] = v;
      } else {
        pixels[d] = parts[i * 3];
        pixels[d + 1] = parts[i * 3 + 1];
        pixels[d + 2] = parts[i * 3 + 2];
      }
      pixels[d + 3] = 255;
    }
  }

  return new ImageData(pixels, width, height);
}

function encodePPM(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const header = `P6\n${width} ${height}\n255\n`;
  const enc = new TextEncoder();
  const headerBytes = enc.encode(header);
  const pixelData = new Uint8Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    const s = i * 4;
    const d = i * 3;
    pixelData[d] = data[s];
    pixelData[d + 1] = data[s + 1];
    pixelData[d + 2] = data[s + 2];
  }
  const combined = new Uint8Array(headerBytes.length + pixelData.length);
  combined.set(headerBytes);
  combined.set(pixelData, headerBytes.length);
  return new Blob([combined], { type: "image/x-portable-pixmap" });
}

async function loadBlobAsImage(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new AppError("CONVERSION_FAILED", "Gagal memuat gambar"));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function resolveImageData(file: File): Promise<ImageData> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const type = await detectFileType(file);

  if (type === "tga") {
    const buf = await file.arrayBuffer();
    const imageData = decodeTGA(buf);
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  if (type === "ppm") {
    const imageData = await decodePPM(file);
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  if (type === "heic") {
    const heicTo = (await import("heic-to")).heicTo;
    const buf = await file.arrayBuffer();
    const pngBlob = await heicTo({
      blob: new Blob([buf], { type: file.type }),
      type: "image/png",
    });
    const img = await loadBlobAsImage(pngBlob);
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  const img = await loadImage(file);
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

async function canvasToOutput(
  canvas: HTMLCanvasElement,
  format: string,
  quality: number,
): Promise<Blob> {
  if (format === "bmp" || format === "gif" || format === "avif" || format === "ico" || format === "tga" || format === "tiff" || format === "ppm") {
    const ctx = canvas.getContext("2d");
    const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
    if (format === "bmp") return encodeBMP(imageData);
    if (format === "gif") return encodeGIF(imageData);
    if (format === "avif") return encodeAVIF(imageData, quality);
    if (format === "ico") return encodeICO(imageData);
    if (format === "tga") return encodeTGA(imageData);
    if (format === "tiff") return encodeTIFF(imageData);
    if (format === "ppm") return encodePPM(imageData);
  }
  if (format === "eps" || format === "psd" || format === "svg" || format === "odd") {
    throw new AppError("CONVERSION_FAILED", `Konversi ke format ${format.toUpperCase()} belum didukung`);
  }
  return canvasToBlob(canvas, mimeFromFormat(format), quality);
}

/**
 * Muat gambar ke canvas lalu konversi ke format tujuan.
 */
async function imageToCanvas(
  file: File,
  targetFormat: string,
  quality: number,
  onProgress?: ProgressCallback,
): Promise<{ blob: Blob; canvas: HTMLCanvasElement }> {
  const imageData = await resolveImageData(file);
  onProgress?.(30);

  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED", "Canvas tidak tersedia");

  if (targetFormat === "jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.putImageData(imageData, 0, 0);
  onProgress?.(60);

  const blob = await canvasToOutput(canvas, targetFormat, quality);
  onProgress?.(90);
  return { blob, canvas };
}

/**
 * Konversi format gambar.
 * Output: PNG, JPG, WebP, GIF, BMP, AVIF.
 */
export async function convertImageFormat(
  file: File,
  options: ImageConvertOptions,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(10);
  const quality = options.quality ?? 0.92;
  const target = options.targetFormat;
  const { blob } = await imageToCanvas(file, target, quality, onProgress);

  const ext = extFromFormat(target);
  const filename = replaceExtension(file.name, ext);

  onProgress?.(100);
  return {
    kind: "file",
    blob,
    filename,
    mimeType: mimeFromFormat(target),
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
  const imageData = await resolveImageData(file);
  onProgress?.(30);

  const targetWidth = options.width ?? imageData.width;
  const targetHeight = options.height ?? imageData.height;

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED", "Canvas tidak tersedia");

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  const tempCtx = tempCanvas.getContext("2d")!;
  tempCtx.putImageData(imageData, 0, 0);
  ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
  onProgress?.(60);

  const targetFormat = options.targetFormat ?? "png";
  const quality = options.quality ?? 0.92;
  const blob = await canvasToOutput(canvas, targetFormat, quality);
  onProgress?.(90);

  const ext = extFromFormat(targetFormat);
  const filename = replaceExtension(file.name, ext);

  onProgress?.(100);
  return {
    kind: "file",
    blob,
    filename,
    mimeType: mimeFromFormat(targetFormat),
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
  const imageData = await resolveImageData(file);
  onProgress?.(30);

  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED", "Canvas tidak tersedia");

  ctx.putImageData(imageData, 0, 0);
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
 * Konversi gambar ke string Base64.
 */
export async function convertImageToBase64(
  file: File,
  onProgress?: ProgressCallback,
): Promise<ConversionResultData> {
  onProgress?.(20);
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
  }
  onProgress?.(60);
  const base64 = btoa(binary);
  const dataUri = `data:${file.type};base64,${base64}`;
  onProgress?.(80);

  const blob = new Blob([base64], { type: "text/plain;charset=utf-8" });
  onProgress?.(100);
  return {
    kind: "text",
    text: dataUri,
    blob,
    filename: file.name.replace(/\.[^/.]+$/, "") + ".txt",
    mimeType: "text/plain",
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
  const imageData = await resolveImageData(file);
  onProgress?.(30);

  const { PDFDocument } = await import("@cantoo/pdf-lib");
  const doc = await PDFDocument.create();
  onProgress?.(50);

  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new AppError("CONVERSION_FAILED");

  ctx.putImageData(imageData, 0, 0);

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
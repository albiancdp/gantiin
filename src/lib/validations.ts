import { ERROR_MESSAGES, AppError } from "@/lib/errors";
import { MAX_FILE_SIZE_BYTES } from "@/lib/constants";

export type SupportedFileType = "pdf" | "png" | "jpeg" | "webp" | "heic" | "svg" | "gif" | "bmp" | "tiff" | "avif" | "ico" | "tga" | "ppm";

/** Semua tipe file yang didukung Gantiin */
export const ALL_FILE_TYPES: SupportedFileType[] = [
  "pdf",
  "png",
  "jpeg",
  "webp",
  "heic",
  "svg",
  "gif",
  "bmp",
  "tiff",
  "avif",
  "ico",
  "tga",
  "ppm",
];

function startsWithBytes(buffer: Uint8Array, bytes: number[]): boolean {
  return bytes.every((byte, index) => buffer[index] === byte);
}

function ascii(buffer: Uint8Array, start: number, end: number): string {
  return String.fromCharCode(...buffer.slice(start, end));
}

const HEIC_BRANDS = ["heic", "heix", "heif", "hevc", "hevx", "heim", "heis", "hevm", "hevs", "mif1", "msf1"];

/**
 * Deteksi tipe file berdasarkan magic bytes (bukan sekadar ekstensi).
 */
export async function detectFileType(file: File): Promise<SupportedFileType | null> {
  const buffer = new Uint8Array(await file.slice(0, 16).arrayBuffer());

  // %PDF-
  if (startsWithBytes(buffer, [0x25, 0x50, 0x44, 0x46])) return "pdf";
  // PNG
  if (startsWithBytes(buffer, [0x89, 0x50, 0x4e, 0x47])) return "png";
  // JPEG
  if (startsWithBytes(buffer, [0xff, 0xd8, 0xff])) return "jpeg";
  // WebP: RIFF....WEBP
  if (
    startsWithBytes(buffer, [0x52, 0x49, 0x46, 0x46]) &&
    ascii(buffer, 8, 12) === "WEBP"
  ) {
    return "webp";
  }
  // HEIC/HEIF: ftyp box dengan brand HE*
  if (ascii(buffer, 4, 8) === "ftyp" && HEIC_BRANDS.includes(ascii(buffer, 8, 12))) {
    return "heic";
  }
  // GIF87a / GIF89a
  if (ascii(buffer, 0, 6) === "GIF87a" || ascii(buffer, 0, 6) === "GIF89a") return "gif";
  // BMP: "BM"
  if (startsWithBytes(buffer, [0x42, 0x4d])) return "bmp";
  // TIFF: little-endian "II" (0x49 0x49 0x2a 0x00) atau big-endian "MM" (0x4d 0x4d 0x00 0x2a)
  if (
    (ascii(buffer, 0, 2) === "II" && buffer[2] === 0x2a && buffer[3] === 0x00) ||
    (ascii(buffer, 0, 2) === "MM" && buffer[2] === 0x00 && buffer[3] === 0x2a)
  ) {
    return "tiff";
  }
  // AVIF: ftyp box dengan brand "avif"
  if (ascii(buffer, 4, 8) === "ftyp" && ascii(buffer, 8, 12) === "avif") {
    return "avif";
  }
  // ICO: reserved(2) + type(2) + count(2)
  if (startsWithBytes(buffer, [0x00, 0x00, 0x01, 0x00])) return "ico";
  // PPM P6 (binary): "P6\n" or "P6\r\n"
  if (buffer[0] === 0x50 && buffer[1] === 0x36 && (buffer[2] === 0x0a || buffer[2] === 0x0d)) return "ppm";
  // TGA: ID length + color map type + image type — no fixed magic bytes, fallback to mime/extension
  if (buffer[0] <= 128 && buffer[1] === 0 && buffer[2] === 2 && file.name.toLowerCase().endsWith(".tga")) return "tga";
  // SVG: text-based, tidak punya magic bytes — cek mime type
  if (file.type === "image/svg+xml") return "svg";

  return null;
}

export type FileValidationResult =
  | { valid: true; type: SupportedFileType }
  | { valid: false; error: string };

export async function validateFile(
  file: File,
  allowedTypes: SupportedFileType[],
  maxSizeBytes: number = MAX_FILE_SIZE_BYTES,
): Promise<FileValidationResult> {
  if (file.size > maxSizeBytes) {
    return { valid: false, error: ERROR_MESSAGES.FILE_TOO_LARGE };
  }

  const type = await detectFileType(file);
  if (!type || !allowedTypes.includes(type)) {
    return { valid: false, error: ERROR_MESSAGES.UNSUPPORTED_TYPE };
  }

  return { valid: true, type };
}

export function requireValidFile(result: FileValidationResult): SupportedFileType {
  if (!result.valid) throw new AppError("UNSUPPORTED_TYPE", result.error);
  return result.type;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

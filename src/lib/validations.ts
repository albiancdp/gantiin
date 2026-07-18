import { ERROR_MESSAGES, AppError } from "@/lib/errors";
import { MAX_FILE_SIZE_BYTES } from "@/lib/constants";

export type SupportedFileType = "pdf" | "png" | "jpeg" | "webp" | "heic" | "svg";

/** Semua tipe file yang didukung Gantiin */
export const ALL_FILE_TYPES: SupportedFileType[] = [
  "pdf",
  "png",
  "jpeg",
  "webp",
  "heic",
  "svg",
];

function startsWithBytes(buffer: Uint8Array, bytes: number[]): boolean {
  return bytes.every((byte, index) => buffer[index] === byte);
}

function ascii(buffer: Uint8Array, start: number, end: number): string {
  return String.fromCharCode(...buffer.slice(start, end));
}

const HEIC_BRANDS = ["heic", "heix", "hevc", "hevx", "heim", "heis", "hevm", "hevs", "mif1", "msf1"];

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

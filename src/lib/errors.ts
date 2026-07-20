export type AppErrorCode =
  | "FILE_TOO_LARGE"
  | "UNSUPPORTED_TYPE"
  | "PDF_ENCRYPTED"
  | "PDF_CORRUPT"
  | "PDF_UNSUPPORTED"
  | "CONVERSION_FAILED"
  | "UNKNOWN";

export const ERROR_MESSAGES: Record<AppErrorCode, string> = {
  FILE_TOO_LARGE: "File terlalu besar (maks 50MB)",
  UNSUPPORTED_TYPE: "Format file tidak didukung",
  PDF_ENCRYPTED: "PDF terproteksi password tidak bisa dikonversi",
  PDF_CORRUPT: "File PDF rusak atau tidak valid",
  PDF_UNSUPPORTED: "Format PDF ini belum didukung. Coba gunakan PDF versi lain",
  CONVERSION_FAILED: "Gagal mengkonversi file. Coba lagi atau gunakan file lain",
  UNKNOWN: "Terjadi kesalahan tak terduga. Coba lagi",
};

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message?: string,
  ) {
    super(message ?? ERROR_MESSAGES[code]);
    this.name = "AppError";
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  if (error instanceof Error) {
    if (error.name === "PasswordException") return new AppError("PDF_ENCRYPTED");
    return new AppError("CONVERSION_FAILED");
  }
  return new AppError("UNKNOWN");
}

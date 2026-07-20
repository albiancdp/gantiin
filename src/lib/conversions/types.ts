export type ConversionType =
  | "pdf-to-text"
  | "pdf-to-image"
  | "pdf-merge"
  | "pdf-split"
  | "image-convert"
  | "image-resize"
  | "image-compress"
  | "image-to-text"
  | "image-to-pdf"
  | "image-to-doc"
  | "image-to-base64"
  | "svg-convert";

export type ProgressCallback = (percent: number) => void;

export interface ImageConvertOptions {
  targetFormat: "png" | "jpeg" | "webp" | "gif" | "bmp" | "avif" | "tiff" | "ico" | "tga" | "ppm" | "eps" | "psd" | "svg" | "odd";
  quality?: number;
  width?: number;
  height?: number;
  pageRange?: string;
}

export type ConvertOptions = ImageConvertOptions;

export interface ConversionResultData {
  kind: "text" | "file";
  /** Konten teks (untuk kind = "text") */
  text?: string;
  /** Hasil konversi sebagai Blob, siap di-download */
  blob: Blob;
  /** Nama file hasil konversi */
  filename: string;
  mimeType: string;
  /** Jumlah halaman (khusus PDF) */
  pageCount?: number;
  /** Ukuran asli sebelum konversi (untuk perbandingan) */
  originalSize?: number;
}

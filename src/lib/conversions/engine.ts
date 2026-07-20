import { AppError } from "@/lib/errors";
import { replaceExtension } from "@/lib/download";
import { extractTextFromPdf, splitPdf, convertPdfToImage } from "@/lib/conversions/pdf";
import {
  convertImageFormat,
  convertSVG,
  resizeImage,
  compressImage,
  convertImageToPdf,
  convertImageToDoc,
  convertImageToBase64,
  extractTextFromImage,
} from "@/lib/conversions/image";
import type {
  ConversionResultData,
  ConversionType,
  ConvertOptions,
  ProgressCallback,
} from "@/lib/conversions/types";

/**
 * Engine utama: route konversi ke converter yang sesuai.
 * Semua proses berjalan 100% di browser.
 */
export async function convertFile(
  file: File,
  type: ConversionType,
  onProgress?: ProgressCallback,
  options?: ConvertOptions,
): Promise<ConversionResultData> {
  switch (type) {
    case "pdf-to-text": {
      onProgress?.(5);
      const { text, pageCount } = await extractTextFromPdf(file, (percent) =>
        onProgress?.(5 + Math.round(percent * 0.9)),
      );

      if (!text) {
        throw new AppError(
          "CONVERSION_FAILED",
          "Tidak ada teks yang bisa diekstrak. PDF mungkin berupa hasil scan (butuh OCR).",
        );
      }

      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      onProgress?.(100);
      return {
        kind: "text",
        text,
        blob,
        filename: replaceExtension(file.name, "txt"),
        mimeType: "text/plain",
        pageCount,
      };
    }
    case "image-convert":
      if (!options?.targetFormat) throw new AppError("CONVERSION_FAILED", "Pilih format target terlebih dahulu");
      return convertImageFormat(file, options, onProgress);
    case "image-resize":
      if (!options?.width && !options?.height) throw new AppError("CONVERSION_FAILED", "Tentukan dimensi resize");
      return resizeImage(file, options, onProgress);
    case "image-compress":
      return compressImage(file, options?.quality ?? 0.8, onProgress);
    case "svg-convert":
      if (!options?.targetFormat) throw new AppError("CONVERSION_FAILED", "Pilih format target terlebih dahulu");
      return convertSVG(file, options, onProgress);
    case "pdf-split":
      return splitPdf(file, options?.pageRange, onProgress);
    case "pdf-to-image":
      if (!options?.targetFormat || !["png", "jpeg"].includes(options.targetFormat)) {
        throw new AppError("CONVERSION_FAILED", "Pilih format PNG atau JPG");
      }
      return convertPdfToImage(file, options.targetFormat as "png" | "jpeg", options.pageRange, onProgress);
    case "image-to-pdf":
      return convertImageToPdf(file, onProgress);
    case "image-to-text":
      return extractTextFromImage(file, onProgress);
    case "image-to-doc":
      return convertImageToDoc(file, onProgress);
    case "image-to-base64":
      return convertImageToBase64(file, onProgress);
    default:
      throw new AppError("UNSUPPORTED_TYPE");
  }
}

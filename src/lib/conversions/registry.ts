import {
  Expand,
  FileOutput,
  FileText,
  Files,
  Image as ImageIcon,
  Minimize2,
  RefreshCw,
  Scissors,
  type LucideIcon,
} from "lucide-react";
import type { SupportedFileType } from "@/lib/validations";

export interface ConversionOption {
  /** ID unik opsi, dipakai engine untuk routing */
  id: string;
  title: string;
  description: string;
  /** Label output singkat, mis. ".txt", "PNG/JPG" */
  outputLabel: string;
  icon: LucideIcon;
  /** false = tampil dengan badge "Segera" (disabled) */
  implemented: boolean;
  /** true = butuh lebih dari satu file (mis. merge) → redirect ke halaman khusus */
  requiresMultiple?: boolean;
}

function imageConversionOptions(format: string): ConversionOption[] {
  return [
    {
      id: "image-convert",
      title: "Ganti Format",
      description: `Konversi ${format} ke format gambar lain`,
      outputLabel: "PNG / JPG / WebP",
      icon: RefreshCw,
      implemented: true,
    },
    {
      id: "image-resize",
      title: "Resize Gambar",
      description: "Ubah dimensi sesuai kebutuhan",
      outputLabel: "Px kustom",
      icon: Expand,
      implemented: true,
    },
    {
      id: "image-compress",
      title: "Kompres Gambar",
      description: "Perkecil ukuran file tanpa kehilangan kualitas berarti",
      outputLabel: "Ukuran lebih kecil",
      icon: Minimize2,
      implemented: true,
    },
    {
      id: "image-to-pdf",
      title: "Gambar ke PDF",
      description: `Konversi ${format} ke dokumen PDF`,
      outputLabel: ".pdf",
      icon: FileOutput,
      implemented: true,
    },
    {
      id: "image-to-text",
      title: "Gambar ke Teks",
      description: `Ekstrak teks dari ${format} dengan OCR`,
      outputLabel: ".txt",
      icon: FileText,
      implemented: true,
    },
    {
      id: "image-to-doc",
      title: "Gambar ke Dokumen",
      description: `OCR ${format} ke dokumen Word`,
      outputLabel: ".docx",
      icon: FileText,
      implemented: true,
    },
  ];
}

/**
 * Sumber kebenaran: tipe file → daftar opsi konversi yang tersedia.
 * Tambah konversi baru cukup tambah entri di sini (UI & engine mengikuti).
 */
export const CONVERSION_REGISTRY: Record<SupportedFileType, ConversionOption[]> = {
  pdf: [
    {
      id: "pdf-to-text",
      title: "PDF ke Teks",
      description: "Ekstrak semua teks dari PDF, siap copy-paste",
      outputLabel: ".txt",
      icon: FileText,
      implemented: true,
    },
    {
      id: "pdf-to-image",
      title: "PDF ke Gambar",
      description: "Ubah tiap halaman PDF menjadi gambar (PNG/JPG)",
      outputLabel: "PNG / JPG",
      icon: ImageIcon,
      implemented: true,
    },
    {
      id: "pdf-split",
      title: "Split PDF",
      description: "Ambil halaman tertentu dari PDF",
      outputLabel: ".pdf",
      icon: Scissors,
      implemented: true,
    },
    {
      id: "pdf-merge",
      title: "Merge PDF",
      description: "Gabungkan dengan PDF lainnya",
      outputLabel: ".pdf",
      icon: Files,
      implemented: true,
      requiresMultiple: true,
    },
  ],
  png: imageConversionOptions("PNG"),
  jpeg: imageConversionOptions("JPG"),
  webp: imageConversionOptions("WebP"),
  heic: [
    {
      id: "heic-convert",
      title: "HEIC ke JPG / PNG",
      description: "Konversi foto iPhone ke format universal",
      outputLabel: "JPG / PNG",
      icon: ImageIcon,
      implemented: true,
    },
    {
      id: "image-resize",
      title: "Resize Gambar",
      description: "Ubah dimensi sesuai kebutuhan",
      outputLabel: "Px kustom",
      icon: Expand,
      implemented: false,
    },
    {
      id: "image-compress",
      title: "Kompres Gambar",
      description: "Perkecil ukuran file tanpa kehilangan kualitas berarti",
      outputLabel: "Ukuran lebih kecil",
      icon: Minimize2,
      implemented: false,
    },
    {
      id: "image-to-pdf",
      title: "HEIC ke PDF",
      description: "Konversi HEIC ke dokumen PDF",
      outputLabel: ".pdf",
      icon: FileOutput,
      implemented: false,
    },
    {
      id: "image-to-text",
      title: "HEIC ke Teks",
      description: "Ekstrak teks dari HEIC dengan OCR",
      outputLabel: ".txt",
      icon: FileText,
      implemented: true,
    },
  ],
  svg: [
    {
      id: "svg-convert",
      title: "SVG ke PNG / JPG",
      description: "Rasterkan SVG menjadi gambar",
      outputLabel: "PNG / JPG",
      icon: ImageIcon,
      implemented: true,
    },
    {
      id: "image-to-pdf",
      title: "SVG ke PDF",
      description: "Konversi SVG ke dokumen PDF",
      outputLabel: ".pdf",
      icon: FileOutput,
      implemented: true,
    },
    {
      id: "image-to-text",
      title: "SVG ke Teks",
      description: "Ekstrak teks dari SVG dengan OCR",
      outputLabel: ".txt",
      icon: FileText,
      implemented: true,
    },
    {
      id: "image-to-doc",
      title: "SVG ke Dokumen",
      description: "OCR SVG ke dokumen Word",
      outputLabel: ".docx",
      icon: FileText,
      implemented: true,
    },
  ],
};

export function getConversionOptions(fileType: SupportedFileType): ConversionOption[] {
  return CONVERSION_REGISTRY[fileType] ?? [];
}

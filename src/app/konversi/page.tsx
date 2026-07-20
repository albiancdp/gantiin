import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { UniversalConverter } from "@/components/convert/UniversalConverter";
import { ALL_FILE_TYPES } from "@/lib/validations";
import { ACCEPT_ALL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Konversi File",
  description:
    "Upload file apapun dan konversi ke berbagai format. PDF, gambar, HEIC — semua diproses di browser, gratis tanpa batas.",
};

export default function KonversiPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Konversi File</h1>
        <p className="mt-3 text-muted-foreground">
          Upload file kamu, lalu pilih mau dikonversi ke apa. Gratis dan tanpa batas.
        </p>
      </div>

      <UniversalConverter
        allowedTypes={ALL_FILE_TYPES}
        accept={ACCEPT_ALL}
        dropzoneDescription="PDF, PNG, JPG, WebP, HEIC, SVG, GIF, BMP, TIFF, AVIF, ICO, TGA • Maks 50MB"
      />

      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="size-4 text-secondary" aria-hidden />
        File diproses 100% di browser — tidak pernah di-upload ke server
      </p>
    </Container>
  );
}

import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { UniversalConverter } from "@/components/convert/UniversalConverter";
import { ACCEPT_PDF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Konversi PDF",
  description:
    "Konversi PDF ke teks, gambar, split & merge — langsung di browser. Gratis, tanpa upload ke server, tanpa batas.",
};

export default function PdfPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Konversi PDF</h1>
        <p className="mt-3 text-muted-foreground">
          Upload PDF kamu dan pilih mau dikonversi ke apa — teks, gambar, split, atau merge.
        </p>
      </div>

      <UniversalConverter
        allowedTypes={["pdf"]}
        accept={ACCEPT_PDF}
        dropzoneDescription="atau klik untuk memilih file PDF • Maks 50MB"
      />

      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="size-4 text-secondary" aria-hidden />
        File diproses 100% di browser — tidak pernah di-upload ke server
      </p>
    </Container>
  );
}

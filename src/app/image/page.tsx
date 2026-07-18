import type { Metadata } from "next";
import { UniversalConverter } from "@/components/convert/UniversalConverter";

export const metadata: Metadata = {
  title: "Konversi Gambar",
  description:
    "Konversi PNG, JPG, WebP, dan HEIC langsung di browser. Gratis, tanpa upload ke server.",
};

export default function ImagePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Konversi Gambar</h1>
        <p className="text-muted-foreground">
          Upload gambar dan pilih format tujuan. Proses 100% di browser Anda.
        </p>
      </div>

      <UniversalConverter
        allowedTypes={["png", "jpeg", "webp", "heic", "svg"]}
        accept=".png,.jpg,.jpeg,.webp,.heic,.heif,.svg,image/*"
        dropzoneDescription="PNG, JPG, WebP, HEIC, SVG — maks 50MB"
      />
    </section>
  );
}

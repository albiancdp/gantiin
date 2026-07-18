import Link from "next/link";
import { ArrowRight, FileText, Files, Image as ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/layout/Container";

const features = [
  {
    icon: FileText,
    title: "PDF ke Teks",
    description:
      "Ekstrak teks dari PDF untuk tugas, jurnal, atau dokumen kantor. Tinggal copy-paste.",
    href: "/pdf",
  },
  {
    icon: ImageIcon,
    title: "Konversi Gambar",
    description:
      "PNG \u2194 JPG \u2194 WebP, HEIC dari iPhone, plus resize & kompres tanpa ribet.",
    href: "/image",
  },
  {
    icon: Files,
    title: "Merge & Split PDF",
    description:
      "Gabungkan beberapa PDF jadi satu, atau ambil halaman yang kamu butuhkan.",
    href: "/merge",
  },
];

export function Features() {
  return (
    <section id="fitur" className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Semua bisa digantiin
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tiga tools andalan untuk kebutuhan konversi harian kamu.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <span className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-6" aria-hidden />
                </span>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={feature.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Coba sekarang
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

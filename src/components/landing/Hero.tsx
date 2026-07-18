import Link from "next/link";
import {
  ArrowRight,
  Infinity as InfinityIcon,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const highlights = [
  { icon: ShieldCheck, label: "File tetap di perangkat kamu" },
  { icon: Zap, label: "Konversi < 5 detik" },
  { icon: InfinityIcon, label: "Tanpa batas harian" },
];

export function Hero() {
  return (
    <section className="border-b bg-gradient-to-b from-accent/60 to-background">
      <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground">
          <Sparkles className="size-4 text-primary" aria-hidden />
          100% Gratis &bull; Tanpa Upload &bull; Tanpa Registrasi
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Gantiin aja, <span className="text-primary">gampang kok!</span>
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Konversi PDF dan gambar langsung di browser kamu. Gratis tanpa batas, dan file kamu{" "}
          <span className="font-semibold text-foreground">
            tidak pernah meninggalkan perangkat
          </span>
          .
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" nativeButton={false} render={<Link href="/konversi" />}>
            Mulai Konversi
            <ArrowRight aria-hidden />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="#cara-kerja" />}
          >
            Lihat Cara Kerja
          </Button>
        </div>

        <ul className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-8">
          {highlights.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <item.icon className="size-4 text-secondary" aria-hidden />
              {item.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

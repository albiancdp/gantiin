import { Download, RefreshCw, Upload } from "lucide-react";
import { Container } from "@/components/layout/Container";

const steps = [
  {
    icon: Upload,
    title: "1. Upload",
    description: "Drag & drop atau pilih file dari perangkat kamu.",
  },
  {
    icon: RefreshCw,
    title: "2. Konversi",
    description: "File diproses langsung di browser dalam hitungan detik.",
  },
  {
    icon: Download,
    title: "3. Download",
    description: "Simpan hasilnya. File asli tidak ke mana-mana.",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="border-y bg-muted/40 py-16 sm:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Cara kerjanya gampang
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tiga langkah, selesai. Tanpa install, tanpa daftar.
          </p>
        </div>

        <ol className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-4 text-center">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <step.icon className="size-7" aria-hidden />
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="max-w-xs text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

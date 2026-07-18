import type { Metadata } from "next";
import { Coffee, ExternalLink, Heart, Shield, Zap, Globe, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dukung Gantiin",
  description:
    "Dukung Gantiin tetap gratis untuk semua. Donasi kamu membantu biaya server, domain, dan pengembangan fitur baru.",
};

const tiers = [
  {
    icon: Coffee,
    name: "Kopi",
    amount: "Rp20.000",
    description: "Beliin kopi developer biar makin semangat coding fitur baru.",
    benefits: ["Nama di halaman donasi", "Priority support via email"],
  },
  {
    icon: Heart,
    name: "Makan Siang",
    amount: "Rp50.000",
    description: "Traktir makan siang, cukup buat seharian coding.",
    benefits: ["Semua benefit sebelumnya", "Akses fitur beta lebih awal", "Laporan bulanan"],
  },
  {
    icon: Zap,
    name: "Traktir Tim",
    amount: "Rp100.000+",
    description: "Bantu biaya operasional bulanan Gantiin.",
    benefits: [
      "Semua benefit sebelumnya",
      "Logo/tautan di halaman sponsor",
      "Prioritas request fitur",
    ],
  },
];

const reasons = [
  {
    icon: Server,
    title: "Biaya Operasional",
    description: "Domain, hosting, dan CDN untuk pengiriman file cepat.",
  },
  {
    icon: Globe,
    title: "100% Gratis & Privat",
    description: "Kami tidak jual data. Tidak ada iklan. Semua biaya dari donasi.",
  },
  {
    icon: Shield,
    title: "Transparan",
    description: "Laporan bulanan penggunaan dana dikirim ke semua donor.",
  },
];

export default function DukungPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container className="max-w-4xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <Heart className="size-8" aria-hidden />
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dukung Gantiin
            </h1>
            <p className="mt-3 text-muted-foreground">
              Gantiin gratis dan tanpa iklan berkat dukungan komunitas. Dengan donasi kamu,
              kami bisa terus mengembangkan fitur baru dan menjaga server tetap nyala.
            </p>
          </div>

          <div className="mb-16 grid gap-3 sm:grid-cols-3">
            {reasons.map((r) => (
              <Card key={r.title} className="border-0 bg-muted/50">
                <CardHeader>
                  <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <r.icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="text-base">{r.title}</CardTitle>
                  <CardContent className="p-0 pt-1 text-sm text-muted-foreground">
                    {r.description}
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mb-16 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={
                  tier.name === "Makan Siang"
                    ? "border-primary shadow-lg"
                    : ""
                }
              >
                <CardHeader className="text-center">
                  {tier.name === "Makan Siang" && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      Populer
                    </p>
                  )}
                  <span
                    className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-xl ${
                      tier.name === "Traktir Tim"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <tier.icon className="size-6" aria-hidden />
                  </span>
                  <CardTitle>{tier.name}</CardTitle>
                  <p className="mt-1 text-3xl font-bold">{tier.amount}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 text-primary">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Pilih nominal berapapun, semua donasi sangat berarti.
            </p>
            <Button size="lg" nativeButton={false} render={
              <a href={siteConfig.donationUrl} target="_blank" rel="noopener noreferrer" />
            }>
                Donasi via Trakteer
              <ExternalLink className="size-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

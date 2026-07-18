import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Siap gantiin file kamu?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Gratis selamanya, tanpa syarat. Langsung pakai dari browser, kapan saja,
            di mana saja.
          </p>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            className="mt-8"
            render={<Link href="/konversi" />}
          >
            Mulai Sekarang — Gratis
            <ArrowRight aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}

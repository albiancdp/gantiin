import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/constants";

export function SupportSection() {
  return (
    <section className="border-t bg-muted/30 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <Heart className="size-7" aria-hidden />
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dukung Gantiin Tetap Gratis
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tidak ada iklan, tidak ada batasan pemakaian. Gantiin didanai sepenuhnya oleh
            donasi komunitas. Dukung kami agar tetap gratis untuk semua.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              nativeButton={false}
              render={
                <a href={siteConfig.donationUrl} target="_blank" rel="noopener noreferrer" />
              }
            >
              <Heart className="text-red-500" aria-hidden />
              Donasi Sekarang
            </Button>
            <Button variant="outline" nativeButton={false} render={<Link href="/dukung" />}>
              Lihat Detail
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

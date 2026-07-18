import Link from "next/link";
import { ArrowRightLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ArrowRightLeft className="size-3.5" aria-hidden />
            </span>
            <span className="font-bold tracking-tight">Gantiin</span>
          </Link>
          <p className="text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          aria-label="Navigasi footer"
        >
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.title}
            </Link>
          ))}
          <Link href="#" className="transition-colors hover:text-foreground">
            Kebijakan Privasi
          </Link>
        </nav>

        <Button
          variant="outline"
          nativeButton={false}
          render={
            <a href={siteConfig.donationUrl} target="_blank" rel="noopener noreferrer" />
          }
        >
          <Heart className="text-red-500" aria-hidden />
          Dukung Gantiin
        </Button>
      </Container>

      <div className="border-t py-4">
        <Container>
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Gantiin — Ditenagai oleh donasi komunitas. File kamu
            tidak pernah meninggalkan browser.
          </p>
        </Container>
      </div>
    </footer>
  );
}
